// MCQ Study App Ultra Pro v4.1
// DB + UI + backup + GitHub sync + maintenance-tag + auto-backup + duplicates tools

const DB_NAME = 'mcqdb_pro_v41';
const DB_VERSION = 2;

let db = null;

let currentQuestion = null;
let currentChoices = [];
let currentMode = 'all';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;
let historyStack = [];
let lastActivityAt = null;

let avoidRepeats = false;
let seenThisSession = new Set();

const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterFilterEl = document.getElementById('chapterFilter');

// Tabs
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');

    if (tab === 'all') {
      reloadAllQuestionsTable();
    } else if (tab === 'backup') {
      refreshBackupLabels();
      refreshCloudInfo();
    } else if (tab === 'settings') {
      loadGitHubConfigIntoUI();
    }
  });
});

// Mode select
modeSelect.addEventListener('change', () => {
  currentMode = modeSelect.value;
  if (currentMode === 'chapter') {
    chapterFilterEl.style.display = 'inline-block';
  } else {
    chapterFilterEl.style.display = 'none';
    currentChapter = '';
  }
  loadNextQuestion(true);
});

chapterFilterEl.addEventListener('change', () => {
  currentChapter = chapterFilterEl.value.trim();
  loadNextQuestion(true);
});

// Session options
document.getElementById('avoidRepeats').addEventListener('change', (e) => {
  avoidRepeats = e.target.checked;
  if (!avoidRepeats) {
    seenThisSession.clear();
  }
});

// Quick filter buttons
document.getElementById('btnQuickWrong').addEventListener('click', () => {
  currentMode = 'wrong';
  modeSelect.value = 'wrong';
  chapterFilterEl.style.display = 'none';
  loadNextQuestion(true);
});

document.getElementById('btnQuickFlagged').addEventListener('click', () => {
  currentMode = 'flagged';
  modeSelect.value = 'flagged';
  chapterFilterEl.style.display = 'none';
  loadNextQuestion(true);
});

// Buttons Home
document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
document.getElementById('btnNext').addEventListener('click', () => {
  lastResult = null;
  feedbackPanel.innerHTML = '';
  loadNextQuestion(false);
});
document.getElementById('btnPrev').addEventListener('click', goPreviousQuestion);
document.getElementById('btnFlag').addEventListener('click', toggleFlag);
document.getElementById('btnMaint').addEventListener('click', toggleMaintenanceFlag);

// Import / Export (home)
document.getElementById('btnImport').addEventListener('click', handleImportSimple);
document.getElementById('btnExport').addEventListener('click', exportQuestionsOnly);
document.getElementById('btnImportUrl').addEventListener('click', handleImportFromUrl);

// All questions tab controls
document.getElementById('btnAllReload').addEventListener('click', reloadAllQuestionsTable);
document.getElementById('btnAllDelete').addEventListener('click', deleteSelectedAll);
document.getElementById('btnAllSelectDup').addEventListener('click', selectAllDuplicates);
document.getElementById('btnAllDedup').addEventListener('click', autoDeduplicate);
document.getElementById('allSelectAll').addEventListener('change', e => {
  document.querySelectorAll('#allTableBody input[type="checkbox"]').forEach(ch => {
    ch.checked = e.target.checked;
  });
});
document.getElementById('allSearch').addEventListener('input', debounce(reloadAllQuestionsTable, 250));
document.getElementById('allFilter').addEventListener('change', reloadAllQuestionsTable);
document.getElementById('allSort').addEventListener('change', reloadAllQuestionsTable);
document.getElementById('allIdFrom').addEventListener('input', debounce(reloadAllQuestionsTable, 300));
document.getElementById('allIdTo').addEventListener('input', debounce(reloadAllQuestionsTable, 300));
document.getElementById('allChapterExact').addEventListener('input', debounce(reloadAllQuestionsTable, 300));
document.getElementById('allContains').addEventListener('input', debounce(reloadAllQuestionsTable, 300));

// Backup tab controls
document.getElementById('btnBackupExport').addEventListener('click', exportFullBackup);
document.getElementById('btnBackupImport').addEventListener('click', handleBackupImport);
document.getElementById('btnRestoreAutoBackup').addEventListener('click', restoreAutoBackup);

// Cloud sync controls
document.getElementById('btnCloudUpload').addEventListener('click', cloudUpload);
document.getElementById('btnCloudDownload').addEventListener('click', cloudDownload);

// Settings tab – GitHub
document.getElementById('btnSaveGitHub').addEventListener('click', saveGitHubConfigFromUI);
document.getElementById('btnClearGitHub').addEventListener('click', () => {
  localStorage.removeItem('mcq_github_config');
  loadGitHubConfigIntoUI();
  refreshCloudInfo();
});

// --- IndexedDB setup ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('questions')) {
        const store = db.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by_chapter', 'chapter', { unique: false });
      }
      if (!db.objectStoreNames.contains('answers')) {
        const ans = db.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        ans.createIndex('by_question', 'questionId', { unique: false });
        ans.createIndex('by_time', 'answeredAt', { unique: false });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => {
      db = e.target.result;
      loadMeta();
      resolve(db);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

function loadMeta() {
  const tx = db.transaction('meta', 'readonly');
  const store = tx.objectStore('meta');
  const req = store.get('lastActivityAt');
  req.onsuccess = () => {
    lastActivityAt = req.result ? req.result.value : null;
    refreshBackupLabels();
  };
}

// Helpers
function randomChoice(arr) {
  if (!arr.length) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function debounce(fn, ms) {
  let t = null;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function normalizeQuestionText(txt) {
  if (!txt) return '';
  return txt
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// --- Stats ---
async function getStats() {
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
  const stats = {
    total: all.length,
    flagged: all.filter(q => q.flagged).length,
    answered: all.filter(q => q.timesSeen > 0).length,
    withWrong: all.filter(q => q.timesWrong > 0).length,
    maintenance: all.filter(q => q.maintenance).length
  };
  return stats;
}

async function updateStatsBar() {
  const el = document.getElementById('statsBar');
  const s = await getStats();
  el.innerHTML = `
    <div>Total: <strong>${s.total}</strong></div>
    <div>Answered: <strong>${s.answered}</strong></div>
    <div>Wrong ≥1: <strong>${s.withWrong}</strong></div>
    <div>Flagged: <strong>${s.flagged}</strong></div>
    <div>Maintenance-tag: <strong>${s.maintenance}</strong></div>
  `;
}

// --- Pick question ---
async function pickQuestion() {
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
  if (!all.length) return null;

  let filtered = all.filter(q => q.active !== false);

  if (currentMode === 'new') {
    filtered = filtered.filter(q => !q.timesSeen);
  } else if (currentMode === 'wrong') {
    filtered = filtered.filter(q => q.timesWrong > 0);
  } else if (currentMode === 'flagged') {
    filtered = filtered.filter(q => q.flagged);
  } else if (currentMode === 'chapter' && currentChapter) {
    const chap = currentChapter.toLowerCase();
    filtered = filtered.filter(q => (q.chapter || '').toLowerCase() === chap);
  }

  if (!filtered.length) filtered = all.filter(q => q.active !== false);

  // Avoid repeats in this session if requested
  if (avoidRepeats) {
    let pool = filtered.filter(q => !seenThisSession.has(q.id));
    if (!pool.length) {
      // All used in this session → reset pool but keep seen set (user can toggle off if wants)
      pool = filtered;
    }
    filtered = pool;
  }

  filtered.sort((a, b) => {
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  const slice = filtered.slice(0, Math.min(filtered.length, 50));
  return randomChoice(slice);
}

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML = '<div class="muted">No questions yet. Import JSON to start.</div>';
    return;
  }
  const q = currentQuestion;
  const letters = ['A','B','C','D','E','F','G'];
  currentChoices = q.choices || [];

  let html = '';
  html += `<div class="q-text">Q#${q.id ?? ''} – ${q.text || ''}</div>`;
  if (q.chapter || q.source || q.maintenance || q.flagged) {
    html += '<div class="tag-chapter">';
    if (q.chapter) html += `<span>${q.chapter}</span>`;
    if (q.source) html += ` · <span>${q.source}</span>`;
    if (q.flagged) html += ` · <span class="pill pill-flag">Flag</span>`;
    if (q.maintenance) html += ` · <span class="pill pill-maint">Maint</span>`;
    html += '</div>';
  }

  html += '<div style="margin-top:0.4rem;">';
  currentChoices.forEach((c, idx) => {
    const letter = letters[idx] || '?';
    const checked = (idx === lastSelectedIndex) ? 'checked' : '';
    html += `<label class="choice">
      <input type="radio" name="choice" value="${idx}" ${checked}>
      <strong>${letter}.</strong> ${c.text || ''}
    </label>`;
  });
  html += '</div>';

  questionPanel.innerHTML = html;
}

async function updateHistoryList() {
  const tx = db.transaction(['answers','questions'], 'readonly');
  const aStore = tx.objectStore('answers');
  const qStore = tx.objectStore('questions');

  const allAns = await new Promise(res => {
    const req = aStore.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  allAns.sort((a, b) => (b.answeredAt || '').localeCompare(a.answeredAt || ''));
  const recent = allAns.slice(0, 50);

  const qMap = {};
  await Promise.all(recent.map(a => new Promise(r => {
    if (qMap[a.questionId]) return r();
    const rq = qStore.get(a.questionId);
    rq.onsuccess = e => { qMap[a.questionId] = e.target.result; r(); };
    rq.onerror = () => r();
  })));

  let html = '';
  recent.forEach(a => {
    const q = qMap[a.questionId];
    if (!q) return;
    const label = (q.chapter || '').slice(0, 16);
    html += `<div class="history-item" data-qid="${q.id}">
      <div>${(q.text || '').slice(0, 80)}${q.text && q.text.length > 80 ? '…' : ''}</div>
      <div class="muted">
        ${label ? `<span>${label}</span>` : ''}
        <span class="pill ${a.isCorrect ? 'pill-correct' : 'pill-wrong'}">${a.isCorrect ? 'Correct' : 'Wrong'}</span>
        ${q.flagged ? '<span class="pill pill-flag">Flag</span>' : ''}
        ${q.maintenance ? '<span class="pill pill-maint">Maint</span>' : ''}
      </div>
    </div>`;
  });

  historyListEl.innerHTML = html || '<div class="muted tiny">No history yet.</div>';

  historyListEl.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', async () => {
      const id = parseInt(item.getAttribute('data-qid'), 10);
      const tx2 = db.transaction('questions', 'readonly');
      const store2 = tx2.objectStore('questions');
      const q = await new Promise(r => {
        const rq = store2.get(id);
        rq.onsuccess = e => r(e.target.result);
        rq.onerror = () => r(null);
      });
      if (!q) return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]').click();
    });
  });
}

async function loadNextQuestion(resetHistory) {
  if (resetHistory) {
    historyStack = [];
    seenThisSession.clear();
  } else if (currentQuestion && currentQuestion.id != null) {
    historyStack.push(currentQuestion.id);
  }
  currentQuestion = await pickQuestion();
  lastResult = null;
  lastSelectedIndex = null;
  feedbackPanel.innerHTML = '';
  renderQuestion();
  updateStatsBar();
  updateHistoryList();
}

// Previous question
async function goPreviousQuestion() {
  if (!historyStack.length) return;
  const prevId = historyStack.pop();
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const q = await new Promise(res => {
    const req = store.get(prevId);
    req.onsuccess = e => res(e.target.result);
    req.onerror = () => res(null);
  });
  if (!q) return;
  currentQuestion = q;
  lastResult = null;
  lastSelectedIndex = null;
  feedbackPanel.innerHTML = '';
  renderQuestion();
}

// Submit answer
async function submitAnswer() {
  if (!currentQuestion) return;
  const radios = document.querySelectorAll('input[name="choice"]');
  let selectedIdx = null;
  radios.forEach(r => {
    if (r.checked) selectedIdx = parseInt(r.value, 10);
  });
  if (selectedIdx === null) {
    alert('اختر إجابة أولاً.');
    return;
  }
  lastSelectedIndex = selectedIdx;
  const correctIdx = (currentQuestion.choices || []).findIndex(c => c.isCorrect);
  const isCorrect = (selectedIdx === correctIdx);

  const now = new Date().toISOString();
  lastActivityAt = now;
  saveMeta('lastActivityAt', now);

  const tx = db.transaction(['questions','answers'], 'readwrite');
  const qStore = tx.objectStore('questions');
  const aStore = tx.objectStore('answers');

  const q = Object.assign({}, currentQuestion);
  q.timesSeen = (q.timesSeen || 0) + 1;
  q.timesCorrect = (q.timesCorrect || 0) + (isCorrect ? 1 : 0);
  q.timesWrong = (q.timesWrong || 0) + (!isCorrect ? 1 : 0);
  q.lastSeenAt = now;
  qStore.put(q);

  aStore.add({
    questionId: q.id,
    answeredAt: now,
    selectedIndex: selectedIdx,
    isCorrect
  });

  tx.oncomplete = () => {
    currentQuestion = q;
    lastResult = isCorrect;
    seenThisSession.add(q.id);
    showFeedback(correctIdx, selectedIdx, q.explanation);
    updateStatsBar();
    updateHistoryList();
    refreshBackupLabels();
  };
}

function showFeedback(correctIdx, selectedIdx, explanation) {
  const letters = ['A','B','C','D','E','F','G'];
  const choices = currentChoices;

  const choiceEls = document.querySelectorAll('.choice');
  choiceEls.forEach((el, idx) => {
    el.classList.remove('correct','wrong','show');
    if (idx === correctIdx) el.classList.add('correct','show');
    if (idx === selectedIdx && idx !== correctIdx) el.classList.add('wrong','show');
  });

  let html = '<div style="margin-top:0.3rem;">';
  if (lastResult) {
    html += '<div style="color:#2e7d32; font-weight:600;">Correct ✅</div>';
  } else {
    html += '<div style="color:#c62828; font-weight:600;">Wrong ❌</div>';
  }
  if (correctIdx >= 0 && choices[correctIdx]) {
    html += `<div class="muted" style="margin-top:0.25rem;">Correct answer: <strong>${letters[correctIdx]}.</strong> ${choices[correctIdx].text || ''}</div>`;
  }
  if (explanation) {
    html += `<div class="muted" style="margin-top:0.25rem;"><strong>Explanation:</strong> ${explanation}</div>`;
  }
  html += '</div>';
  feedbackPanel.innerHTML = html;
}

// Flags
async function toggleFlag() {
  if (!currentQuestion) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  const q = Object.assign({}, currentQuestion);
  q.flagged = !q.flagged;
  store.put(q);
  tx.oncomplete = () => {
    currentQuestion = q;
    renderQuestion();
    updateStatsBar();
    updateHistoryList();
  };
}

async function toggleMaintenanceFlag() {
  if (!currentQuestion) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  const q = Object.assign({}, currentQuestion);
  q.maintenance = !q.maintenance;
  store.put(q);
  tx.oncomplete = () => {
    currentQuestion = q;
    renderQuestion();
    updateStatsBar();
    updateHistoryList();
  };
}

// Import helpers
async function importQuestionsArray(arr) {
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  arr.forEach(q => {
    const obj = {
      text: q.text,
      chapter: q.chapter || '',
      source: q.source || '',
      explanation: q.explanation || '',
      choices: q.choices || [],
      timesSeen: q.timesSeen || 0,
      timesCorrect: q.timesCorrect || 0,
      timesWrong: q.timesWrong || 0,
      lastSeenAt: q.lastSeenAt || null,
      createdAt: q.createdAt || new Date().toISOString(),
      flagged: !!q.flagged,
      maintenance: !!q.maintenance,
      active: q.active !== false
    };
    if (q.id != null) obj.id = q.id;
    store.put(obj);
  });
  return new Promise((resolve) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

// Simple import (questions only)
function handleImportSimple() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
    alert('اختر ملف JSON أولاً.');
    return;
  }
  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const data = JSON.parse(e.target.result);
      let arr = data;
      if (!Array.isArray(arr) && data.questions) {
        arr = data.questions;
      }
      if (!Array.isArray(arr)) throw new Error('JSON should be array or {questions:[]}');
      await importQuestionsArray(arr);
      alert('Imported ' + arr.length + ' questions.');
      loadNextQuestion(true);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Import from URL
async function handleImportFromUrl() {
  const url = document.getElementById('importUrlInput').value.trim();
  if (!url) {
    alert('أدخل رابط JSON أولاً.');
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      alert('HTTP error: ' + res.status);
      return;
    }
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      alert('المحتوى ليس JSON صحيحاً.');
      return;
    }
    let arr = data;
    if (!Array.isArray(arr) && data.questions) arr = data.questions;
    if (!Array.isArray(arr)) {
      alert('JSON يجب أن يكون مصفوفة أو {questions:[...]}');
      return;
    }
    await importQuestionsArray(arr);
    alert('Imported ' + arr.length + ' questions from URL.');
    loadNextQuestion(true);
  } catch (err) {
    alert('فشل التحميل من الرابط.');
  }
}

// Export questions only
async function exportQuestionsOnly() {
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
  const data = all.map(q => ({
    id: q.id,
    text: q.text,
    chapter: q.chapter,
    source: q.source,
    explanation: q.explanation,
    choices: q.choices,
    flagged: !!q.flagged,
    maintenance: !!q.maintenance,
    active: q.active !== false,
    timesSeen: q.timesSeen || 0,
    timesCorrect: q.timesCorrect || 0,
    timesWrong: q.timesWrong || 0,
    lastSeenAt: q.lastSeenAt || null,
    createdAt: q.createdAt || null
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mcq_questions.json';
  a.click();
}

// Meta helpers
function saveMeta(key, value) {
  const tx = db.transaction('meta', 'readwrite');
  const store = tx.objectStore('meta');
  store.put({ key, value });
}

// Format time
function fmtTime(iso) {
  if (!iso) return '–';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

// --- Backup full (questions + answers + meta) ---
async function buildBackupObject() {
  const qtx = db.transaction('questions', 'readonly');
  const qs = qtx.objectStore('questions');
  const questions = await new Promise(res => {
    const req = qs.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  const atx = db.transaction('answers', 'readonly');
  const as = atx.objectStore('answers');
  const answers = await new Promise(res => {
    const req = as.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  const metaTx = db.transaction('meta', 'readonly');
  const ms = metaTx.objectStore('meta');
  const metaAll = await new Promise(res => {
    const req = ms.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
  const metaObj = {};
  metaAll.forEach(m => { metaObj[m.key] = m.value; });

  const exportedAt = new Date().toISOString();
  const backup = {
    meta: {
      exportedAt,
      appVersion: window.APP_VERSION || '4.1.0',
      totalQuestions: questions.length,
      totalAnswers: answers.length,
      lastActivityAt: metaObj.lastActivityAt || null
    },
    questions,
    answers
  };
  return backup;
}

async function exportFullBackup() {
  const backup = await buildBackupObject();
  const exportedAt = backup.meta.exportedAt;
  saveMeta('lastBackupAt', exportedAt);
  refreshBackupLabels();

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type:'application/json' });
  const safeTs = exportedAt.replace(/[:]/g, '-');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mcq_backup_' + safeTs + '.json';
  a.click();
}

// Import backup
async function handleBackupImport() {
  const file = document.getElementById('backupFileInput').files[0];
  if (!file) {
    alert('اختر ملف backup JSON أولاً.');
    return;
  }
  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const data = JSON.parse(e.target.result);
      await importBackupObject(data);
      alert('Backup import completed.');
      loadNextQuestion(true);
      refreshBackupLabels();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsText(file);
}

async function importBackupObject(backup) {
  let questions = [];
  let answers = [];
  let meta = {};
  if (Array.isArray(backup)) {
    questions = backup;
  } else if (backup && backup.questions) {
    questions = backup.questions;
    answers = backup.answers || [];
    meta = backup.meta || {};
  } else {
    throw new Error('Invalid backup format');
  }

  const backupExportedAt = meta.exportedAt || null;

  const metaTx = db.transaction('meta', 'readonly');
  const ms = metaTx.objectStore('meta');
  const lastActivityRec = await new Promise(res => {
    const req = ms.get('lastActivityAt');
    req.onsuccess = e => res(req.result?.value || null);
    req.onerror = () => res(null);
  });
  const localLastActivity = lastActivityRec || null;

  if (backupExportedAt && localLastActivity && backupExportedAt < localLastActivity) {
    const proceed = confirm(
      '⚠ Backup file seems older than your last activity.\n' +
      'Import may overwrite some older stats.\n\nContinue anyway?'
    );
    if (!proceed) return;
  }

  // Merge questions: keep local if same id; add new ones
  const qtx = db.transaction('questions', 'readwrite');
  const qs = qtx.objectStore('questions');
  const existing = await new Promise(res => {
    const req = qs.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
  const byId = new Map();
  existing.forEach(q => byId.set(q.id, q));

  questions.forEach(q => {
    const id = q.id;
    if (id != null && byId.has(id)) {
      const local = byId.get(id);
      const merged = Object.assign({}, q, {
        timesSeen: local.timesSeen || q.timesSeen || 0,
        timesCorrect: local.timesCorrect || q.timesCorrect || 0,
        timesWrong: local.timesWrong || q.timesWrong || 0,
        lastSeenAt: local.lastSeenAt || q.lastSeenAt || null,
        flagged: local.flagged || q.flagged || false,
        maintenance: local.maintenance || q.maintenance || false,
        active: local.active !== false
      });
      qs.put(merged);
    } else {
      const obj = {
        id: id,
        text: q.text,
        chapter: q.chapter || '',
        source: q.source || '',
        explanation: q.explanation || '',
        choices: q.choices || [],
        timesSeen: q.timesSeen || 0,
        timesCorrect: q.timesCorrect || 0,
        timesWrong: q.timesWrong || 0,
        lastSeenAt: q.lastSeenAt || null,
        createdAt: q.createdAt || new Date().toISOString(),
        flagged: !!q.flagged,
        maintenance: !!q.maintenance,
        active: q.active !== false
      };
      qs.put(obj);
    }
  });

  // Merge answers: just append
  if (answers.length) {
    const atx = db.transaction('answers', 'readwrite');
    const as = atx.objectStore('answers');
    answers.forEach(a => {
      const obj = {
        questionId: a.questionId,
        answeredAt: a.answeredAt || null,
        selectedIndex: a.selectedIndex,
        isCorrect: !!a.isCorrect
      };
      as.add(obj);
    });
  }

  // Update meta if backup is newer
  if (backupExportedAt && (!localLastActivity || backupExportedAt > localLastActivity)) {
    saveMeta('lastActivityAt', backupExportedAt);
    lastActivityAt = backupExportedAt;
  }
  if (backupExportedAt) {
    saveMeta('lastBackupAt', backupExportedAt);
  }
}

// Auto-backup to browser storage
async function autoBackup() {
  try {
    const backup = await buildBackupObject();
    const exportedAt = backup.meta.exportedAt;
    localStorage.setItem('mcq_auto_backup', JSON.stringify(backup));
    saveMeta('lastAutoBackupAt', exportedAt);
    refreshBackupLabels();
  } catch (e) {
    // silent
  }
}

function restoreAutoBackup() {
  const raw = localStorage.getItem('mcq_auto_backup');
  if (!raw) {
    alert('No auto-backup found in this browser.');
    return;
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    alert('Auto-backup is corrupted.');
    return;
  }
  importBackupObject(data).then(() => {
    alert('Auto-backup restored.');
    loadNextQuestion(true);
  }).catch(() => {
    alert('Failed to restore auto-backup.');
  });
}

// Backup labels
function refreshBackupLabels() {
  const lastActEl = document.getElementById('lastActivityLabel');
  const lastBackupEl = document.getElementById('lastBackupLabel');
  const lastAutoEl = document.getElementById('lastAutoBackupLabel');

  const tx = db.transaction('meta', 'readonly');
  const store = tx.objectStore('meta');
  const req1 = store.get('lastActivityAt');
  const req2 = store.get('lastBackupAt');
  const req3 = store.get('lastAutoBackupAt');

  req1.onsuccess = () => {
    lastActEl.textContent = fmtTime(req1.result ? req1.result.value : null);
  };
  req2.onsuccess = () => {
    lastBackupEl.textContent = fmtTime(req2.result ? req2.result.value : null);
  };
  req3.onsuccess = () => {
    lastAutoEl.textContent = fmtTime(req3.result ? req3.result.value : null);
  };
}

// --- All Questions table + duplicates tools ---
async function reloadAllQuestionsTable() {
  const searchVal = document.getElementById('allSearch').value.toLowerCase().trim();
  const filter = document.getElementById('allFilter').value;
  const sortVal = document.getElementById('allSort').value;
  const idFromVal = document.getElementById('allIdFrom').value.trim();
  const idToVal = document.getElementById('allIdTo').value.trim();
  const chapExact = document.getElementById('allChapterExact').value.toLowerCase().trim();
  const containsWord = document.getElementById('allContains').value.toLowerCase().trim();
  const tbody = document.getElementById('allTableBody');
  tbody.innerHTML = '';

  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  // Prepare duplicates map
  const dupMap = new Map();
  all.forEach(q => {
    const k = normalizeQuestionText(q.text);
    if (!k) return;
    if (!dupMap.has(k)) dupMap.set(k, []);
    dupMap.get(k).push(q);
  });

  let arr = all;

  if (searchVal) {
    arr = arr.filter(q => {
      const s = (q.text || '') + ' ' + (q.chapter || '') + ' ' + (q.source || '');
      return s.toLowerCase().includes(searchVal);
    });
  }

  if (filter === 'flagged') {
    arr = arr.filter(q => q.flagged);
  } else if (filter === 'wrong') {
    arr = arr.filter(q => q.timesWrong > 0);
  } else if (filter === 'maintenance') {
    arr = arr.filter(q => q.maintenance);
  } else if (filter === 'inactive') {
    arr = arr.filter(q => q.active === false);
  } else if (filter === 'duplicates') {
    arr = arr.filter(q => {
      const k = normalizeQuestionText(q.text);
      const list = dupMap.get(k) || [];
      return list.length > 1;
    });
  }

  if (idFromVal || idToVal) {
    const from = idFromVal ? parseInt(idFromVal, 10) : null;
    const to = idToVal ? parseInt(idToVal, 10) : null;
    arr = arr.filter(q => {
      if (q.id == null) return false;
      if (from != null && q.id < from) return false;
      if (to != null && q.id > to) return false;
      return true;
    });
  }

  if (chapExact) {
    arr = arr.filter(q => (q.chapter || '').toLowerCase().trim() === chapExact);
  }

  if (containsWord) {
    arr = arr.filter(q => {
      const s = ((q.text || '') + ' ' + (q.explanation || '')).toLowerCase();
      return s.includes(containsWord);
    });
  }

  if (sortVal === 'created_desc') {
    arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } else if (sortVal === 'created_asc') {
    arr.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  } else if (sortVal === 'chapter') {
    arr.sort((a, b) => (a.chapter || '').localeCompare(b.chapter || ''));
  } else if (sortVal === 'wrong_desc') {
    arr.sort((a, b) => (b.timesWrong || 0) - (a.timesWrong || 0));
  }

  arr.forEach(q => {
    const norm = normalizeQuestionText(q.text);
    const dupList = dupMap.get(norm) || [];
    const isDup = dupList.length > 1;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>${(q.text || '').slice(0, 120)}${q.text && q.text.length > 120 ? '…' : ''}</td>
      <td>${q.chapter || ''}</td>
      <td>
        ${q.flagged ? '<span class="pill pill-flag">Flag</span>' : ''}
        ${q.maintenance ? '<span class="pill pill-maint">Maint</span>' : ''}
        ${q.active === false ? '<span class="pill pill-wrong">Inactive</span>' : ''}
        ${isDup ? '<span class="pill pill-wrong">Repeated</span>' : ''}
      </td>
      <td>${q.timesSeen || 0}</td>
      <td>${q.timesWrong || 0}</td>
      <td>${q.lastSeenAt ? fmtTime(q.lastSeenAt) : ''}</td>
    `;

    tr.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input') return;
      const anySelected = document.querySelector('#allTableBody input[type="checkbox"]:checked');
      if (anySelected) {
        // keep selection, do not navigate
        return;
      }
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]').click();
    });
    tbody.appendChild(tr);
  });

  // store duplicates info on tbody dataset for selectAllDuplicates / autoDeduplicate
  tbody.dataset.dupMap = JSON.stringify(
    Array.from(dupMap.entries()).filter(([k, list]) => list.length > 1)
      .map(([k, list]) => ({ key: k, ids: list.map(q => q.id) }))
  );
}

async function deleteSelectedAll() {
  const checked = Array.from(document.querySelectorAll('#allTableBody input[type="checkbox"]:checked'));
  if (!checked.length) return;
  if (!confirm('Delete ' + checked.length + ' question(s)?')) return;
  const ids = checked.map(ch => parseInt(ch.getAttribute('data-id'), 10));
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => store.delete(id));
  tx.oncomplete = () => {
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

// Select all duplicates in current table view
function selectAllDuplicates() {
  const tbody = document.getElementById('allTableBody');
  const dupInfoRaw = tbody.dataset.dupMap || '[]';
  let dupInfo;
  try {
    dupInfo = JSON.parse(dupInfoRaw);
  } catch {
    dupInfo = [];
  }
  if (!dupInfo.length) {
    alert('No repeated questions detected.');
    return;
  }
  const dupIds = new Set();
  dupInfo.forEach(g => g.ids.forEach(id => dupIds.add(id)));
  document.querySelectorAll('#allTableBody input[type="checkbox"]').forEach(ch => {
    const id = parseInt(ch.getAttribute('data-id'), 10);
    if (dupIds.has(id)) ch.checked = true;
  });
}

// Auto-deduplicate: keep one copy per repeated group
async function autoDeduplicate() {
  const tbody = document.getElementById('allTableBody');
  const dupInfoRaw = tbody.dataset.dupMap || '[]';
  let dupInfo;
  try {
    dupInfo = JSON.parse(dupInfoRaw);
  } catch {
    dupInfo = [];
  }
  if (!dupInfo.length) {
    alert('No repeated questions to deduplicate.');
    return;
  }
  if (!confirm('Auto-delete duplicates (keep 1 per group)?')) return;

  const idsToDelete = [];
  dupInfo.forEach(g => {
    if (!g.ids || g.ids.length <= 1) return;
    const sorted = [...g.ids].sort((a, b) => a - b);
    // keep the first one (smallest id), delete the rest
    sorted.slice(1).forEach(id => idsToDelete.push(id));
  });

  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  idsToDelete.forEach(id => store.delete(id));
  tx.oncomplete = () => {
    alert('Deleted ' + idsToDelete.length + ' duplicate questions.');
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

// --- GitHub config + cloud sync ---
function loadGitHubConfig() {
  try {
    const raw = localStorage.getItem('mcq_github_config');
    if (!raw) return { token: '', repo: 'Awad1992/mcq-data', filename: 'mcq_backup.json' };
    const obj = JSON.parse(raw);
    return {
      token: obj.token || '',
      repo: obj.repo || 'Awad1992/mcq-data',
      filename: obj.filename || 'mcq_backup.json'
    };
  } catch {
    return { token: '', repo: 'Awad1992/mcq-data', filename: 'mcq_backup.json' };
  }
}

function saveGitHubConfig(cfg) {
  localStorage.setItem('mcq_github_config', JSON.stringify(cfg));
}

function loadGitHubConfigIntoUI() {
  const cfg = loadGitHubConfig();
  document.getElementById('ghTokenInput').value = cfg.token;
  document.getElementById('ghRepoInput').value = cfg.repo;
  document.getElementById('ghFileInput').value = cfg.filename;
}

function saveGitHubConfigFromUI() {
  const token = document.getElementById('ghTokenInput').value.trim();
  const repo = document.getElementById('ghRepoInput').value.trim() || 'Awad1992/mcq-data';
  const filename = document.getElementById('ghFileInput').value.trim() || 'mcq_backup.json';
  const cfg = { token, repo, filename };
  saveGitHubConfig(cfg);
  refreshCloudInfo();
  alert('GitHub settings saved.');
}

function refreshCloudInfo() {
  const cfg = loadGitHubConfig();
  const el = document.getElementById('cloudInfo');
  const syncStatus = document.getElementById('syncStatus');
  if (!cfg.token || !cfg.repo) {
    el.textContent = 'Cloud sync disabled. Add token + repo in Settings.';
    syncStatus.textContent = 'No cloud sync';
    return;
  }
  el.textContent = 'Cloud ready → Repo: ' + cfg.repo + ' · File: ' + cfg.filename;
  syncStatus.textContent = 'Cloud: ready';
}

// GitHub helper: base64
function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function decodeBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}

// Cloud upload
async function cloudUpload() {
  const cfg = loadGitHubConfig();
  if (!cfg.token || !cfg.repo) {
    alert('Set GitHub token + repo in Settings first.');
    return;
  }
  const backup = await buildBackupObject();
  const contentStr = JSON.stringify(backup, null, 2);
  const contentB64 = encodeBase64(contentStr);

  const [owner, repoName] = cfg.repo.split('/');
  if (!owner || !repoName) {
    alert('Repo format must be owner/name.');
    return;
  }
  const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;

  let existingSha = null;
  try {
    const getRes = await fetch(url, {
      headers: { Authorization: `token ${cfg.token}` }
    });
    if (getRes.status === 200) {
      const info = await getRes.json();
      existingSha = info.sha;
    }
  } catch (err) {
    console.error(err);
  }

  const body = {
    message: 'MCQ backup ' + new Date().toISOString(),
    content: contentB64
  };
  if (existingSha) body.sha = existingSha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${cfg.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    alert('Upload failed: ' + res.status + ' ' + txt);
    return;
  }
  alert('Backup uploaded to GitHub.');
}

// Cloud download
async function cloudDownload() {
  const cfg = loadGitHubConfig();
  if (!cfg.token || !cfg.repo) {
    alert('Set GitHub token + repo in Settings first.');
    return;
  }
  const [owner, repoName] = cfg.repo.split('/');
  if (!owner || !repoName) {
    alert('Repo format must be owner/name.');
    return;
  }
  const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${cfg.token}` }
  });
  if (res.status === 404) {
    alert('No backup file found in GitHub repo.');
    return;
  }
  if (!res.ok) {
    const txt = await res.text();
    alert('Download failed: ' + res.status + ' ' + txt);
    return;
  }
  const info = await res.json();
  const contentStr = decodeBase64(info.content);
  let data = null;
  try {
    data = JSON.parse(contentStr);
  } catch (err) {
    alert('Invalid JSON in backup file.');
    return;
  }
  await importBackupObject(data);
  alert('Cloud backup downloaded and merged.');
  loadNextQuestion(true);
  refreshBackupLabels();
}

// Initial DB open + auto-backup timer
openDB().then(() => {
  refreshBackupLabels();
  refreshCloudInfo();
  loadGitHubConfigIntoUI();
  loadNextQuestion(true);
  setInterval(autoBackup, 60000);
}).catch(err => {
  console.error(err);
  alert('Failed to open local database.');
});
