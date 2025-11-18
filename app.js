// MCQ Study App Pro v3.5
// DB + UI + backup + GitHub sync + maintenance + smarter filters + auto-backup

const DB_NAME = 'mcqdb_pro_v34';
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

// session repeat control
let allowSessionRepeats = true;
let seenSessionIds = new Set();

const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterFilterEl = document.getElementById('chapterFilter');
const allowRepeatsCheckbox = document.getElementById('allowRepeatsCheckbox');

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
    } else if (tab === 'maintenance') {
      reloadMaintenanceTable();
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
  seenSessionIds.clear();
  loadNextQuestion(true);
});

chapterFilterEl.addEventListener('change', () => {
  currentChapter = chapterFilterEl.value.trim();
  seenSessionIds.clear();
  loadNextQuestion(true);
});

// Session repeats checkbox
allowRepeatsCheckbox.addEventListener('change', () => {
  allowSessionRepeats = allowRepeatsCheckbox.checked;
  seenSessionIds.clear();
  loadNextQuestion(true);
});

// Quick filter buttons
document.getElementById('btnQuickWrong').addEventListener('click', () => {
  currentMode = 'wrong';
  modeSelect.value = 'wrong';
  chapterFilterEl.style.display = 'none';
  seenSessionIds.clear();
  loadNextQuestion(true);
});

document.getElementById('btnQuickFlagged').addEventListener('click', () => {
  currentMode = 'flagged';
  modeSelect.value = 'flagged';
  chapterFilterEl.style.display = 'none';
  seenSessionIds.clear();
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

// All questions tab controls
document.getElementById('btnAllReload').addEventListener('click', reloadAllQuestionsTable);
document.getElementById('btnAllDelete').addEventListener('click', deleteSelectedAll);
document.getElementById('btnDeleteDuplicates').addEventListener('click', deleteAllDuplicates);
document.getElementById('allSelectAll').addEventListener('change', e => {
  document.querySelectorAll('#allTableBody input[type="checkbox"]').forEach(ch => {
    ch.checked = e.target.checked;
  });
});
document.getElementById('allSearch').addEventListener('input', debounce(reloadAllQuestionsTable, 250));
document.getElementById('allFilter').addEventListener('change', reloadAllQuestionsTable);
document.getElementById('allSort').addEventListener('change', reloadAllQuestionsTable);
document.getElementById('allChapterExact').addEventListener('input', debounce(reloadAllQuestionsTable, 250));
document.getElementById('allIdFrom').addEventListener('input', debounce(reloadAllQuestionsTable, 250));
document.getElementById('allIdTo').addEventListener('input', debounce(reloadAllQuestionsTable, 250));

// Maintenance tab controls
document.getElementById('btnMaintReload').addEventListener('click', reloadMaintenanceTable);
document.getElementById('btnMaintDelete').addEventListener('click', deleteSelectedMaint);
document.getElementById('maintSelectAll').addEventListener('change', e => {
  document.querySelectorAll('#maintTableBody input[type="checkbox"]').forEach(ch => {
    ch.checked = e.target.checked;
  });
});
document.getElementById('maintFilter').addEventListener('change', reloadMaintenanceTable);
document.getElementById('maintChapterFilter').addEventListener('input', debounce(reloadMaintenanceTable, 300));

// Backup tab controls
document.getElementById('btnBackupExport').addEventListener('click', exportFullBackup);
document.getElementById('btnBackupImport').addEventListener('click', handleBackupImport);
document.getElementById('btnImportUrl').addEventListener('click', importFromUrl);
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
    <div>Maintenance: <strong>${s.maintenance}</strong></div>
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

  // session-level repeat control
  let candidates = filtered;
  if (!allowSessionRepeats) {
    const notSeen = filtered.filter(q => !seenSessionIds.has(q.id));
    if (notSeen.length) {
      candidates = notSeen;
    } else {
      // all used, reset session memory
      seenSessionIds.clear();
      candidates = filtered;
    }
  }

  candidates.sort((a, b) => {
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  const slice = candidates.slice(0, Math.min(candidates.length, 50));
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
      // mark as seen in this session for non-repeat mode
      if (!allowSessionRepeats && q.id != null) {
        seenSessionIds.add(q.id);
      }
    });
  });
}

async function loadNextQuestion(resetHistory) {
  if (resetHistory) {
    historyStack = [];
  } else if (currentQuestion && currentQuestion.id != null) {
    historyStack.push(currentQuestion.id);
    if (!allowSessionRepeats) {
      seenSessionIds.add(currentQuestion.id);
    }
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
    // mark as seen in this session
    if (!allowSessionRepeats && q.id != null) {
      seenSessionIds.add(q.id);
    }
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
      await importQuestionsArray(data);
      loadNextQuestion(true);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsText(file);
}

async function importQuestionsArray(data) {
  let arr = data;
  if (!Array.isArray(arr) && data.questions) {
    arr = data.questions;
  }
  if (!Array.isArray(arr)) throw new Error('JSON should be array or {questions:[]}');
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
    tx.oncomplete = () => {
      alert('Imported ' + arr.length + ' questions.');
      resolve();
    };
  });
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
      appVersion: window.APP_VERSION || '3.5.0',
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
      // Merge: prefer local stats
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

// Backup labels
function refreshBackupLabels() {
  const lastActEl = document.getElementById('lastActivityLabel');
  const lastBackupEl = document.getElementById('lastBackupLabel');
  const lastAutoEl = document.getElementById('lastAutoBackupLabel');
  const tx = db.transaction('meta', 'readonly');
  const store = tx.objectStore('meta');
  const req1 = store.get('lastActivityAt');
  const req2 = store.get('lastBackupAt');
  const req3 = store.get('autoBackup');

  req1.onsuccess = () => {
    lastActEl.textContent = fmtTime(req1.result ? req1.result.value : null);
  };
  req2.onsuccess = () => {
    lastBackupEl.textContent = fmtTime(req2.result ? req2.result.value : null);
  };
  req3.onsuccess = () => {
    const v = req3.result ? req3.result.value : null;
    const ts = v && v.exportedAt ? v.exportedAt : null;
    lastAutoEl.textContent = fmtTime(ts);
  };
}

// Auto-backup
async function runAutoBackup() {
  if (!db) return;
  try {
    const backup = await buildBackupObject();
    const exportedAt = backup.meta.exportedAt;
    saveMeta('autoBackup', { exportedAt, data: backup });
    refreshBackupLabels();
  } catch (e) {
    console.error('auto-backup failed', e);
  }
}

function scheduleAutoBackup() {
  runAutoBackup();
  setInterval(runAutoBackup, 60000);
}

async function restoreAutoBackup() {
  const tx = db.transaction('meta', 'readonly');
  const store = tx.objectStore('meta');
  const req = store.get('autoBackup');
  req.onsuccess = async () => {
    const rec = req.result;
    if (!rec || !rec.value || !rec.value.data) {
      alert('No auto-backup found.');
      return;
    }
    const backup = rec.value.data;
    await importBackupObject(backup);
    alert('Auto-backup restored.');
    loadNextQuestion(true);
    refreshBackupLabels();
  };
  req.onerror = () => {
    alert('Failed to read auto-backup record.');
  };
}

// --- All Questions table ---
async function reloadAllQuestionsTable() {
  const searchVal = document.getElementById('allSearch').value.toLowerCase().trim();
  const filter = document.getElementById('allFilter').value;
  const sortVal = document.getElementById('allSort').value;
  const chapExactVal = document.getElementById('allChapterExact').value.toLowerCase().trim();
  const idFromVal = document.getElementById('allIdFrom').value;
  const idToVal = document.getElementById('allIdTo').value;
  const tbody = document.getElementById('allTableBody');
  tbody.innerHTML = '';

  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  // duplicate detection map
  const dupMap = new Map();
  all.forEach(q => {
    const key = ((q.chapter || '') + '||' + (q.text || '')).toLowerCase().trim();
    if (!key) return;
    if (!dupMap.has(key)) dupMap.set(key, []);
    dupMap.get(key).push(q);
  });
  const dupIds = new Set();
  dupMap.forEach(list => {
    if (list.length > 1) {
      list.forEach(q => dupIds.add(q.id));
    }
  });

  let arr = all;

  if (searchVal) {
    arr = arr.filter(q => {
      const s = (q.text || '') + ' ' + (q.chapter || '') + ' ' + (q.source || '');
      return s.toLowerCase().includes(searchVal);
    });
  }

  if (chapExactVal) {
    arr = arr.filter(q => (q.chapter || '').toLowerCase().trim() === chapExactVal);
  }

  const idFrom = idFromVal ? parseInt(idFromVal, 10) : null;
  const idTo = idToVal ? parseInt(idToVal, 10) : null;
  if (idFrom != null && !isNaN(idFrom)) {
    arr = arr.filter(q => typeof q.id === 'number' && q.id >= idFrom);
  }
  if (idTo != null && !isNaN(idTo)) {
    arr = arr.filter(q => typeof q.id === 'number' && q.id <= idTo);
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
    arr = arr.filter(q => dupIds.has(q.id));
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
    const isDup = dupIds.has(q.id);
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
        ${isDup ? '<span class="pill pill-dup">Dup</span>' : ''}
      </td>
      <td>${q.timesSeen || 0}</td>
      <td>${q.timesWrong || 0}</td>
      <td>${q.lastSeenAt ? fmtTime(q.lastSeenAt) : ''}</td>
    `;
    // safer: only open question when clicking non-checkbox area, but keep selection intact
    tr.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input') return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]').click();
    });
    tbody.appendChild(tr);
  });
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

async function deleteAllDuplicates() {
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  const all = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  const dupMap = new Map();
  all.forEach(q => {
    const key = ((q.chapter || '') + '||' + (q.text || '')).toLowerCase().trim();
    if (!key) return;
    if (!dupMap.has(key)) dupMap.set(key, []);
    dupMap.get(key).push(q);
  });

  const toDelete = [];
  dupMap.forEach(list => {
    if (list.length > 1) {
      // keep first, delete others
      list.slice(1).forEach(q => {
        if (q.id != null) toDelete.push(q.id);
      });
    }
  });

  if (!toDelete.length) {
    alert('No duplicates detected.');
    return;
  }
  if (!confirm('Detected ' + toDelete.length + ' duplicate entries. Delete them (keep 1 copy per question)?')) return;

  toDelete.forEach(id => store.delete(id));
  tx.oncomplete = () => {
    alert('Duplicates cleaned.');
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

// --- Maintenance table ---
async function reloadMaintenanceTable() {
  const filter = document.getElementById('maintFilter').value;
  const chapVal = document.getElementById('maintChapterFilter').value.toLowerCase().trim();
  const tbody = document.getElementById('maintTableBody');
  tbody.innerHTML = '';

  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  let arr = all.filter(q => q.maintenance || q.flagged);
  if (filter === 'maintenance') {
    arr = arr.filter(q => q.maintenance);
  } else if (filter === 'flagged') {
    arr = arr.filter(q => q.flagged || q.maintenance);
  }

  if (chapVal) {
    arr = arr.filter(q => (q.chapter || '').toLowerCase().includes(chapVal));
  }

  arr.sort((a, b) => (b.timesWrong || 0) - (a.timesWrong || 0));

  arr.forEach(q => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>${(q.text || '').slice(0, 120)}${q.text && q.text.length > 120 ? '…' : ''}</td>
      <td>${q.chapter || ''}</td>
      <td>
        ${q.flagged ? '<span class="pill pill-flag">Flag</span>' : ''}
        ${q.maintenance ? '<span class="pill pill-maint">Maint</span>' : ''}
      </td>
      <td>${q.timesWrong || 0}</td>
    `;
    tr.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input') return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]').click();
    });
    tbody.appendChild(tr);
  });
}

async function deleteSelectedMaint() {
  const checked = Array.from(document.querySelectorAll('#maintTableBody input[type="checkbox"]:checked'));
  if (!checked.length) return;
  if (!confirm('Delete ' + checked.length + ' question(s)?')) return;
  const ids = checked.map(ch => parseInt(ch.getAttribute('data-id'), 10));
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => store.delete(id));
  tx.oncomplete = () => {
    reloadMaintenanceTable();
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

// Import from URL (questions only)
async function importFromUrl() {
  const url = document.getElementById('importUrlInput').value.trim();
  if (!url) {
    alert('Enter URL first.');
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      alert('HTTP error: ' + res.status);
      return;
    }
    const data = await res.json();
    await importQuestionsArray(data);
    loadNextQuestion(true);
  } catch (e) {
    alert('Failed to import from URL: ' + e.message);
  }
}

// Initial DB open
openDB().then(() => {
  refreshBackupLabels();
  refreshCloudInfo();
  loadGitHubConfigIntoUI();
  scheduleAutoBackup();
  loadNextQuestion(true);
}).catch(err => {
  console.error(err);
  alert('Failed to open local database.');
});
