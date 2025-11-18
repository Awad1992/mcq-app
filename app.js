
// MCQ Study App Ultra-Pro v4.1
// IndexedDB + spaced repetition + weak-spot engine + dashboard + flashcards + exam sim

const DB_NAME = 'mcqdb_ultra_v41';
const DB_VERSION = 3;

let db = null;

let currentQuestion = null;
let currentChoices = [];
let currentMode = 'due';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;
let historyStack = [];

// ALL tab selection & pagination state
let allSelectedIds = new Set();
let allCurrentPage = 1;
let allTotalPages = 1;
const ALL_PAGE_SIZE = 50;
let allRangeAnchorIndex = null;
let lastActivityAt = null;
let currentTheme = 'light';

// Spaced repetition / flashcards
let flashcardPool = [];
let flashcardIndex = -1;
let flashcardShowBack = false;

// Exam simulation
let examSession = null;
let examTimerId = null;

const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterFilterEl = document.getElementById('chapterFilter');
const relatedBox = document.getElementById('relatedBox');
const themeSelect = document.getElementById('themeSelect');

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
    } else if (tab === 'dashboard') {
      renderDashboard();
    }
  });
});

// All tab subview toggle (bank vs builder)
(function () {
  const bankView = document.getElementById('allViewBank');
  const builderView = document.getElementById('allViewBuilder');
  const subnavBtns = document.querySelectorAll('.subnav-btn');
  subnavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-allview');
      subnavBtns.forEach(b => b.classList.remove('subnav-btn-active'));
      btn.classList.add('subnav-btn-active');
      if (target === 'builder') {
        if (bankView) bankView.style.display = 'none';
        if (builderView) builderView.style.display = 'block';
      } else {
        if (bankView) bankView.style.display = 'block';
        if (builderView) builderView.style.display = 'none';
      }
    });
  });
})();

// Builder helpers: prompt + preview + import
let builderPreviewCache = [];

function makeBuilderPrompt() {
  const src = (document.getElementById('builderSourceText')?.value || '').trim();
  const num = parseInt(document.getElementById('builderNumQuestions')?.value || '0', 10) || 10;
  const outEl = document.getElementById('builderPromptOut');
  if (!outEl) return;
  if (!src) {
    outEl.value = 'Paste source text first.';
    return;
  }
  const corePrompt = `You are an expert ICU / Internal Medicine board-exam question generator. Use ONLY the following source text (any language) to create ${num} difficult, board-level MCQs in advanced academic English. Follow strictly this JSON schema: an array of objects with fields id (int), text, chapter, source, explanation, choices[{text,isCorrect}], tags, optional difficulty and images. Questions, choices, explanations, tags, chapter, and source MUST ALL be in ENGLISH. Do NOT add any keys outside this schema. Output ONLY a JSON array, nothing else.`;
  outEl.value = corePrompt + "\n\nSOURCE TEXT:\n\n" + src;
}

async function builderPreviewFromJson() {
  const raw = (document.getElementById('builderJsonInput')?.value || '').trim();
  const previewEl = document.getElementById('builderPreview');
  if (!previewEl) return;
  if (!raw) {
    previewEl.textContent = 'Paste JSON first.';
    return;
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('JSON must be an array of questions.');
    builderPreviewCache = data;
    let html = '<table class="q-table tiny"><thead><tr><th><input type="checkbox" id="builderSelectAll"></th><th>ID</th><th>Text</th><th>Chapter</th><th>Tags</th></tr></thead><tbody>';
    data.forEach((q, idx) => {
      const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : '';
      const txt = (q.text || '').slice(0, 120) + ((q.text || '').length > 120 ? '…' : '');
      html += `<tr>
        <td><input type="checkbox" class="builder-row-select" data-idx="${idx}" checked></td>
        <td>${q.id ?? idx + 1}</td>
        <td>${txt}</td>
        <td>${q.chapter || ''}</td>
        <td>${tagsStr}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    previewEl.innerHTML = html;
    const selAll = document.getElementById('builderSelectAll');
    if (selAll) {
      selAll.addEventListener('change', e => {
        document.querySelectorAll('.builder-row-select').forEach(ch => {
          ch.checked = e.target.checked;
        });
      });
    }
  } catch (err) {
    previewEl.textContent = 'Error: ' + err.message;
  }
}

async function builderImportSelected() {
  if (!builderPreviewCache || !builderPreviewCache.length) {
    alert('No preview data to import.');
    return;
  }
  const checks = Array.from(document.querySelectorAll('.builder-row-select'));
  const selected = checks
    .map((ch, idx) => (ch.checked ? idx : -1))
    .filter(i => i >= 0)
    .map(i => builderPreviewCache[i]);
  if (!selected.length) {
    alert('No questions selected.');
    return;
  }
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  selected.forEach((q, idx) => {
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
      active: q.active !== false,
      tags: Array.isArray(q.tags) ? q.tags : [],
      pinned: !!q.pinned,
      imageUrl: q.imageUrl || '',
      imageData: q.imageData || '',
      srEase: q.srEase || 2.5,
      srInterval: q.srInterval || 0,
      srReps: q.srReps || 0,
      dueAt: q.dueAt || null
    };
    if (q.id != null) obj.id = q.id;
    store.put(obj);
  });
  tx.oncomplete = () => {
    alert('Imported ' + selected.length + ' questions into bank.');
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

// Hook builder buttons
document.getElementById('btnBuilderMakePrompt')?.addEventListener('click', makeBuilderPrompt);
document.getElementById('btnBuilderPreview')?.addEventListener('click', builderPreviewFromJson);
document.getElementById('btnBuilderImportSelected')?.addEventListener('click', builderImportSelected);


// Theme handling
function loadTheme() {
  try {
    const t = localStorage.getItem('mcq_theme') || 'light';
    currentTheme = t;
    applyTheme();
  } catch {
    currentTheme = 'light';
    applyTheme();
  }
}
function applyTheme() {
  document.body.classList.remove('theme-light','theme-dark','theme-night','theme-calm');
  if (currentTheme === 'dark') document.body.classList.add('theme-dark');
  else if (currentTheme === 'night') document.body.classList.add('theme-night');
  else if (currentTheme === 'calm') document.body.classList.add('theme-calm');
  themeSelect.value = currentTheme;
}
themeSelect.addEventListener('change', () => {
  currentTheme = themeSelect.value || 'light';
  applyTheme();
  try { localStorage.setItem('mcq_theme', currentTheme); } catch {}
});

// Mode select
modeSelect.addEventListener('change', () => {
  currentMode = modeSelect.value;
  const chapterSelect = document.getElementById('chapterSelect');
  if (currentMode === 'chapter') {
    if (chapterSelect) chapterSelect.style.display = 'inline-block';
  } else {
    if (chapterSelect) {
      chapterSelect.style.display = 'none';
      chapterSelect.value = '';
    }
    currentChapter = '';
  }
  loadNextQuestion(true);
});
document.getElementById('chapterSelect')?.addEventListener('change', (e) => {
  const sel = e.target;
  currentChapter = (sel && sel.value ? sel.value.trim() : '');
  loadNextQuestion(true);
});

// Quick filter buttons
document.getElementById('btnQuickWrong').addEventListener('click', () => {
  currentMode = 'wrong';
  modeSelect.value = 'wrong';
  const chapterSelect = document.getElementById('chapterSelect');
  if (chapterSelect) {
    chapterSelect.style.display = 'none';
    chapterSelect.value = '';
  }
  currentChapter = '';
  loadNextQuestion(true);
});
document.getElementById('btnQuickFlagged').addEventListener('click', () => {
  currentMode = 'flagged';
  modeSelect.value = 'flagged';
  const chapterSelect = document.getElementById('chapterSelect');
  if (chapterSelect) {
    chapterSelect.style.display = 'none';
    chapterSelect.value = '';
  }
  currentChapter = '';
  loadNextQuestion(true);
});
document.getElementById('btnStartDaily').addEventListener('click', () => {
  startDailyChallenge();
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
document.getElementById('btnImportUrl')?.addEventListener('click', handleImportFromUrl);

// All questions tab controls
document.getElementById('btnAllReload').addEventListener('click', reloadAllQuestionsTable);
document.getElementById('btnAllDelete').addEventListener('click', deleteSelectedAll);
document.getElementById('btnAllDeleteDups').addEventListener('click', deleteDuplicateClusters);
document.getElementById('allSelectAll').addEventListener('change', e => {
  const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
  boxes.forEach(ch => {
    const id = parseInt(ch.getAttribute('data-id'), 10);
    ch.checked = e.target.checked;
    if (e.target.checked) {
      allSelectedIds.add(id);
    } else {
      allSelectedIds.delete(id);
    }
  });
  updateAllSelectedCount();
});
document.getElementById('allSearch').addEventListener('input', debounce(reloadAllQuestionsTable, 250));
document.getElementById('allFilter').addEventListener('change', () => { allCurrentPage = 1; reloadAllQuestionsTable(); });
document.getElementById('allSort').addEventListener('change', () => { allCurrentPage = 1; reloadAllQuestionsTable(); });
document.getElementById('rangeFrom').addEventListener('input', debounce(() => { allCurrentPage = 1; reloadAllQuestionsTable(); }, 250));
document.getElementById('rangeTo').addEventListener('input', debounce(() => { allCurrentPage = 1; reloadAllQuestionsTable(); }, 250));
document.getElementById('allChapterSelect').addEventListener('change', () => { allCurrentPage = 1; reloadAllQuestionsTable(); });
const allLastNInput = document.getElementById('allLastN');
if (allLastNInput) {
  allLastNInput.addEventListener('input', debounce(() => { allCurrentPage = 1; reloadAllQuestionsTable(); }, 250));
}
const prevBtn = document.getElementById('allPrevPage');
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (allCurrentPage > 1) {
      allCurrentPage--;
      reloadAllQuestionsTable();
    }
  });
}
const nextBtn = document.getElementById('allNextPage');
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (allCurrentPage < allTotalPages) {
      allCurrentPage++;
      reloadAllQuestionsTable();
    }
  });
}
const bulkChapBtn = document.getElementById('allBulkSetChapter');
if (bulkChapBtn) {
  bulkChapBtn.addEventListener('click', bulkSetChapterForSelected);
}
const bulkTagBtn = document.getElementById('allBulkAddTag');
if (bulkTagBtn) {
  bulkTagBtn.addEventListener('click', bulkAddTagForSelected);
}

// Backup tab controls
document.getElementById('btnBackupExport').addEventListener('click', exportFullBackup);
document.getElementById('btnBackupImport').addEventListener('click', handleBackupImport);

// Cloud sync controls
document.getElementById('btnCloudUpload').addEventListener('click', cloudUpload);
document.getElementById('btnCloudDownload').addEventListener('click', cloudDownload);
const quickBackupBtn = document.getElementById('btnBackupQuick');
if (quickBackupBtn) {
  quickBackupBtn.addEventListener('click', cloudUpload);
}

// Settings tab – GitHub
document.getElementById('btnSaveGitHub').addEventListener('click', saveGitHubConfigFromUI);
document.getElementById('btnClearGitHub').addEventListener('click', () => {
  localStorage.removeItem('mcq_github_config');
  loadGitHubConfigIntoUI();
  refreshCloudInfo();
});

// Flashcards controls
const fcSourceEl = document.getElementById('fcSource');
const fcChapterFilterEl = document.getElementById('fcChapterFilter');
const fcModeEl = document.getElementById('fcMode');
const fcFront = document.getElementById('flashcardFront');
const fcBack = document.getElementById('flashcardBack');

fcSourceEl.addEventListener('change', () => {
  if (fcSourceEl.value === 'chapter') {
    fcChapterFilterEl.style.display = 'inline-block';
  } else {
    fcChapterFilterEl.style.display = 'none';
    fcChapterFilterEl.value = '';
  }
  buildFlashcardPool();
});
fcChapterFilterEl.addEventListener('change', buildFlashcardPool);
fcModeEl.addEventListener('change', renderFlashcard);

document.getElementById('btnFcShow').addEventListener('click', () => {
  flashcardShowBack = true;
  renderFlashcard();
});
document.getElementById('btnFcAgain').addEventListener('click', async () => {
  await updateSpacedAfterFlashcard(false);
  nextFlashcard();
});
document.getElementById('btnFcGood').addEventListener('click', async () => {
  await updateSpacedAfterFlashcard(true);
  nextFlashcard();
});
document.getElementById('btnFcNext').addEventListener('click', () => {
  nextFlashcard();
});

// Exam sim controls
document.getElementById('btnStartExam').addEventListener('click', startExam);
document.getElementById('examPool').addEventListener('change', () => {
  const v = document.getElementById('examPool').value;
  const f = document.getElementById('examChapterFilter');
  f.style.display = (v === 'chapter') ? 'inline-block' : 'none';
});
document.getElementById('btnExamPrev').addEventListener('click', () => examMove(-1));
document.getElementById('btnExamNext').addEventListener('click', () => examMove(1));
document.getElementById('btnExamFinish').addEventListener('click', finishExam);

// --- IndexedDB setup ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('questions')) {
        const store = db.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by_chapter', 'chapter', { unique: false });
      } else {
        const store = req.transaction.objectStore('questions');
        // later versions: ensure fields exist logically; JS side handles defaults
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


let cachedChapters = [];

function refreshChapterOptions() {
  if (!db) return;
  try {
    const tx = db.transaction('questions', 'readonly');
    const store = tx.objectStore('questions');
    const req = store.getAll();
    req.onsuccess = () => {
      const all = req.result || [];
      const set = new Set();
      all.forEach(q => {
        const ch = (q.chapter || '').trim();
        if (ch) set.add(ch);
      });
      cachedChapters = Array.from(set).sort((a, b) => a.localeCompare(b, undefined, {numeric:true, sensitivity:'base'}));
      const practiceSel = document.getElementById('chapterSelect');
      const allSel = document.getElementById('allChapterSelect');

      function fillSelect(sel) {
        if (!sel) return;
        sel.innerHTML = '';
        const optAll = document.createElement('option');
        optAll.value = '';
        optAll.textContent = 'All chapters';
        sel.appendChild(optAll);
        cachedChapters.forEach(ch => {
          const opt = document.createElement('option');
          opt.value = ch;
          opt.textContent = ch;
          sel.appendChild(opt);
        });
      }

      fillSelect(practiceSel);
      fillSelect(allSel);
    };
  } catch (e) {
    console.error('refreshChapterOptions failed', e);
  }
}

// Helpers
function randomChoice(arr) {
  if (!arr.length) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function debounce(fn, ms) {
  let t = null;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// --- Stats ---
async function getAllQuestions() {
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  return await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
}

async function getStats() {
  const all = await getAllQuestions();
  const nowIso = new Date().toISOString();
  const dueCount = all.filter(q => isDue(q, nowIso)).length;
  const stats = {
    total: all.length,
    flagged: all.filter(q => q.flagged).length,
    answered: all.filter(q => q.timesSeen > 0).length,
    withWrong: all.filter(q => q.timesWrong > 0).length,
    maintenance: all.filter(q => q.maintenance).length,
    weak: computeWeakQuestions(all).length,
    due: dueCount
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
    <div>Weak set: <strong>${s.weak}</strong></div>
    <div>Due now: <strong>${s.due}</strong></div>
  `;
}

// --- Spaced repetition helpers ---
function isDue(q, nowIso) {
  if (!q) return false;
  if (q.active === false) return false;
  if (!q.dueAt) return true;
  try {
    return q.dueAt <= nowIso;
  } catch {
    return true;
  }
}

function initSpacedFields(q) {
  if (!q.srEase) q.srEase = 2.5;
  if (!q.srInterval) q.srInterval = 0;
  if (!q.srReps) q.srReps = 0;
  return q;
}

function nextSpaced(q, correct) {
  q = initSpacedFields(q);
  const now = new Date();
  if (!correct) {
    q.srReps = 0;
    q.srInterval = 1;
    q.srEase = Math.max(1.3, q.srEase - 0.2);
  } else {
    q.srReps += 1;
    if (q.srReps === 1) q.srInterval = 1;
    else if (q.srReps === 2) q.srInterval = 3;
    else q.srInterval = Math.round(q.srInterval * q.srEase);
    q.srEase = Math.min(3.0, q.srEase + 0.05);
  }
  const next = new Date(now.getTime() + q.srInterval * 24 * 60 * 60 * 1000);
  q.dueAt = next.toISOString();
  return q;
}

// --- Weakness engine ---
function computeWeakQuestions(all) {
  return all.filter(q => {
    const seen = q.timesSeen || 0;
    const wrong = q.timesWrong || 0;
    if (seen < 3) return false;
    const rate = wrong / seen;
    return rate >= 0.4;
  });
}

function normalizeTextForDup(t) {
  if (!t) return '';
  return t
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9أ-يآؤئإ\s]/g, '')
    .trim();
}

// --- Pick question ---
async function pickQuestion() {
  const all = await getAllQuestions();
  if (!all.length) return null;
  const nowIso = new Date().toISOString();

  let filtered = all.filter(q => q.active !== false);

  if (currentMode === 'due') {
    filtered = filtered.filter(q => isDue(q, nowIso));
    if (!filtered.length) filtered = all.filter(q => q.active !== false);
  } else if (currentMode === 'new') {
    filtered = filtered.filter(q => !q.timesSeen);
  } else if (currentMode === 'wrong') {
    filtered = filtered.filter(q => q.timesWrong > 0);
  } else if (currentMode === 'flagged') {
    filtered = filtered.filter(q => q.flagged);
  } else if (currentMode === 'weak') {
    const weak = new Set(computeWeakQuestions(all).map(q => q.id));
    filtered = filtered.filter(q => weak.has(q.id));
    if (!filtered.length) filtered = all.filter(q => q.active !== false);
  } else if (currentMode === 'chapter' && currentChapter) {
    const chap = currentChapter.toLowerCase();
    filtered = filtered.filter(q => (q.chapter || '').toLowerCase() === chap);
  }

  if (!filtered.length) filtered = all;

  filtered.sort((a, b) => {
    // In 'all' mode, prefer questions never seen before
    if (currentMode === 'all') {
      const aUnseen = !a.timesSeen;
      const bUnseen = !b.timesSeen;
      if (aUnseen !== bUnseen) {
        return aUnseen ? -1 : 1; // unseen first
      }
    }

    const ad = a.dueAt || '';
    const bd = b.dueAt || '';
    if (ad && bd && ad !== bd) return ad.localeCompare(bd);
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  const slice = filtered.slice(0, Math.min(filtered.length, 80));
  return randomChoice(slice);
}

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML = '<div class="muted">No questions yet. Import JSON to start.</div>';
    relatedBox.innerHTML = 'No related questions yet.';
    return;
  }
  const q = currentQuestion;
  const letters = ['A','B','C','D','E','F','G'];
  currentChoices = q.choices || [];

  let html = '';
  html += `<div class="q-text">Q#${q.id ?? ''} – ${q.text || ''}</div>`;
  if (q.chapter || q.source || q.maintenance || q.flagged || q.pinned || (q.tags && q.tags.length)) {
    html += '<div class="tag-chapter">';
    if (q.chapter) html += `<span>${q.chapter}</span>`;
    if (q.source) html += ` · <span>${q.source}</span>`;
    if (q.tags && q.tags.length) html += ` · <span>${q.tags.join(', ')}</span>`;
    if (q.pinned) html += ` · <span class="pill pill-pin">Pin</span>`;
    if (q.flagged) html += ` · <span class="pill pill-flag">Flag</span>`;
    if (q.maintenance) html += ` · <span class="pill pill-maint">Maint</span>`;
    html += '</div>';
  }

  if (q.imageData || q.imageUrl) {
    const src = q.imageData || q.imageUrl;
    html += `<div class="img-preview"><a href="${src}" target="_blank" rel="noopener noreferrer"><img src="${src}" alt="question image"></a></div>`;
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
  renderRelated();
}

async function renderRelated() {
  const box = relatedBox;
  if (!currentQuestion) {
    box.innerHTML = 'No related questions yet.';
    return;
  }
  const all = await getAllQuestions();
  const q = currentQuestion;
  const baseChap = (q.chapter || '').toLowerCase();
  const words = (q.text || '').toLowerCase().split(/\W+/).filter(w => w.length > 4);
  const key = new Set(words);
  const rel = [];
  all.forEach(o => {
    if (!o || o.id === q.id) return;
    if (o.active === false) return;
    let score = 0;
    if ((o.chapter || '').toLowerCase() === baseChap && baseChap) score += 2;
    const ow = (o.text || '').toLowerCase().split(/\W+/);
    ow.forEach(w => { if (key.has(w)) score += 1; });
    if (score >= 3) rel.push({ q: o, score });
  });
  rel.sort((a,b) => b.score - a.score);
  const top = rel.slice(0, 8);
  if (!top.length) {
    box.innerHTML = 'No strong concept links for this question yet.';
    return;
  }
  let html = '';
  top.forEach(r => {
    html += `<div class="related-link" data-qid="${r.q.id}">
      <span>Q#${r.q.id}</span> – ${(r.q.text || '').slice(0, 60)}${r.q.text && r.q.text.length>60 ? '…' : ''}
    </div>`;
  });
  box.innerHTML = html;
  box.querySelectorAll('.related-link').forEach(el => {
    el.addEventListener('click', async () => {
      const id = parseInt(el.getAttribute('data-qid'), 10);
      const tx = db.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const req = store.get(id);
      req.onsuccess = e => {
        const qq = e.target.result;
        if (!qq) return;
        currentQuestion = qq;
        lastResult = null;
        lastSelectedIndex = null;
        feedbackPanel.innerHTML = '';
        renderQuestion();
        document.querySelector('.tab-button[data-tab="home"]').click();
      };
    });
  });
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
  const recent = allAns.slice(0, 30);

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
        ${q.pinned ? '<span class="pill pill-pin">Pin</span>' : ''}
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

  // Load question
  const qTx = db.transaction('questions', 'readonly');
  const qStore = qTx.objectStore('questions');
  const q = await new Promise(res => {
    const req = qStore.get(prevId);
    req.onsuccess = e => res(e.target.result);
    req.onerror = () => res(null);
  });
  if (!q) return;

  // Load last answer for this question (if exists)
  let lastAns = null;
  try {
    const aTx = db.transaction('answers', 'readonly');
    const aStore = aTx.objectStore('answers');
    const idx = aStore.index('by_question');
    const answers = await new Promise(res => {
      const req = idx.getAll(prevId);
      req.onsuccess = e => res(e.target.result || []);
      req.onerror = () => res([]);
    });
    if (answers && answers.length) {
      answers.sort((a, b) => {
        const aa = a.answeredAt || '';
        const bb = b.answeredAt || '';
        return aa.localeCompare(bb);
      });
      lastAns = answers[answers.length - 1];
    }
  } catch (e) {
    lastAns = null;
  }

  currentQuestion = q;
  const choices = q.choices || [];
  const correctIdx = choices.findIndex(c => c && c.isCorrect);

  if (lastAns) {
    lastSelectedIndex = typeof lastAns.selectedIndex === 'number' ? lastAns.selectedIndex : null;
    lastResult = !!lastAns.isCorrect;
  } else {
    lastSelectedIndex = null;
    lastResult = null;
  }

  renderQuestion();

  // If we have a previous answer, show feedback state as it was
  if (lastAns && lastSelectedIndex !== null && correctIdx >= 0) {
    showFeedback(correctIdx, lastSelectedIndex, q.explanation);
  } else {
    feedbackPanel.innerHTML = '';
  }
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
  // spaced repetition
  nextSpaced(q, isCorrect);
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
      let arr = data;
      if (!Array.isArray(arr) && data.questions) {
        arr = data.questions;
      }
      if (!Array.isArray(arr)) throw new Error('JSON should be array or {questions:[]}');
      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      const normalized = normalizeImportedQuestions(arr);
      normalized.forEach(q => {
        const obj = Object.assign({}, q);
        if (obj.id == null) delete obj.id;
        store.put(obj);
      });
      tx.oncomplete = () => {
        alert('Imported ' + normalized.length + ' questions.');
        refreshChapterOptions();
        loadNextQuestion(true);
      };
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsText(file);

async function handleImportFromUrl() {
  const input = document.getElementById('fileUrlInput');
  const url = (input && input.value || '').trim();
  if (!url) {
    alert('أدخل رابط JSON أولاً.');
    return;
  }
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error('HTTP ' + resp.status + ' while fetching URL');
    }
    const data = await resp.json();
    let arr = data;
    if (!Array.isArray(arr) && data.questions) {
      arr = data.questions;
    }
    if (!Array.isArray(arr)) {
      throw new Error('JSON should be array or {questions:[]}');
    }
    const tx = db.transaction('questions', 'readwrite');
    const store = tx.objectStore('questions');
    const normalized = normalizeImportedQuestions(arr);
    normalized.forEach(q => {
      const obj = Object.assign({}, q);
      if (obj.id == null) delete obj.id;
      store.put(obj);
    });
    tx.oncomplete = () => {
      alert('Imported ' + normalized.length + ' questions from URL.');
      refreshChapterOptions();
      loadNextQuestion(true);
    };
  } catch (err) {
    alert('Error importing from URL: ' + err.message);
  }
}
}


function normalizeImportedQuestions(rawArr) {
  if (!Array.isArray(rawArr)) return [];
  const letters = ['A','B','C','D','E','F','G'];
  return rawArr.map((q, idx) => {
    const baseText = q.text || q.question || q.prompt || ('Question ' + (idx + 1));
    let chapter = q.chapter || q.chapterName || q.topic || '';
    let source = q.source || q.book || q.reference || '';
    let explanation = q.explanation || q.explain || q.rationale || q.comment || '';

    // Normalize tags
    let tags = [];
    if (Array.isArray(q.tags)) tags = q.tags;
    else if (Array.isArray(q.categories)) tags = q.categories;
    else if (typeof q.tags === 'string') tags = q.tags.split(/[,;]+/).map(s => s.trim()).filter(Boolean);

    // Build choices
    let choices = [];
    if (Array.isArray(q.choices) && q.choices.length) {
      // If already in {text,isCorrect} form, reuse
      const looksStructured = q.choices.every(ch => typeof ch === 'object' && 'text' in ch);
      if (looksStructured) {
        choices = q.choices.map(ch => ({
          text: ch.text,
          isCorrect: !!ch.isCorrect
        }));
      }
    }
    if (!choices.length) {
      // Try options / answers as plain strings
      let opts = null;
      if (Array.isArray(q.options)) opts = q.options;
      else if (Array.isArray(q.answers)) opts = q.answers;
      else if (Array.isArray(q.choices)) opts = q.choices;
      if (opts && opts.length) {
        // Determine correct index
        let correctIdx = null;
        if (typeof q.correctIndex === 'number') correctIdx = q.correctIndex;
        else if (typeof q.answerIndex === 'number') correctIdx = q.answerIndex;
        else if (typeof q.correct === 'number') correctIdx = q.correct;
        else if (typeof q.correct === 'string') {
          const letterIdx = letters.indexOf(q.correct.toUpperCase());
          if (letterIdx >= 0 && letterIdx < opts.length) correctIdx = letterIdx;
          else {
            const byText = opts.findIndex(o => String(o).trim() === q.correct.trim());
            if (byText >= 0) correctIdx = byText;
          }
        }
        choices = opts.map((opt, i) => ({
          text: typeof opt === 'string' ? opt : (opt.text || String(opt)),
          isCorrect: (correctIdx !== null ? i === correctIdx : !!(opt.isCorrect))
        }));
        // If still no true isCorrect, default first as correct
        if (!choices.some(c => c.isCorrect) && choices.length) {
          choices[0].isCorrect = true;
        }
      }
    }

    // Fallback if still empty
    if (!choices.length) {
      choices = [{
        text: 'Option A',
        isCorrect: true
      }];
    }

    return {
      text: baseText,
      chapter,
      source,
      explanation,
      choices,
      timesSeen: q.timesSeen || 0,
      timesCorrect: q.timesCorrect || 0,
      timesWrong: q.timesWrong || 0,
      lastSeenAt: q.lastSeenAt || null,
      createdAt: q.createdAt || new Date().toISOString(),
      flagged: !!q.flagged,
      maintenance: !!q.maintenance,
      active: q.active !== false,
      tags,
      pinned: !!q.pinned,
      imageUrl: q.imageUrl || '',
      imageData: q.imageData || '',
      srEase: q.srEase || 2.5,
      srInterval: q.srInterval || 0,
      srReps: q.srReps || 0,
      dueAt: q.dueAt || null,
      id: q.id != null ? q.id : undefined
    };
  });
}

// Export questions only
async function exportQuestionsOnly() {
  const all = await getAllQuestions();
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
    createdAt: q.createdAt || null,
    tags: Array.isArray(q.tags) ? q.tags : [],
    pinned: !!q.pinned,
    imageUrl: q.imageUrl || '',
    imageData: q.imageData || '',
    srEase: q.srEase || 2.5,
    srInterval: q.srInterval || 0,
    srReps: q.srReps || 0,
    dueAt: q.dueAt || null
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
  const questions = await getAllQuestions();

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


function handleImportFromUrl() {
  const urlInput = document.getElementById('fileUrlInput');
  const url = (urlInput?.value || '').trim();
  if (!url) {
    alert('أدخل رابط JSON أولاً.');
    return;
  }
  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw new Error('HTTP status ' + resp.status);
      }
      return resp.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
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
            active: q.active !== false,
            tags: Array.isArray(q.tags) ? q.tags : [],
            pinned: !!q.pinned,
            imageUrl: q.imageUrl || '',
            imageData: q.imageData || '',
            srEase: q.srEase || 2.5,
            srInterval: q.srInterval || 0,
            srReps: q.srReps || 0,
            dueAt: q.dueAt || null
          };
          if (q.id != null) obj.id = q.id;
          store.put(obj);
        });
        tx.oncomplete = () => {
          alert('Imported ' + arr.length + ' questions from URL.');
          loadNextQuestion(true);
        };
      } catch (err) {
        alert('Error: ' + err.message);
      }
    })
    .catch(err => {
      alert('Error: ' + err.message);
    });
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

  const existing = await getAllQuestions();
  const byId = new Map();
  existing.forEach(q => byId.set(q.id, q));

  const qtx = db.transaction('questions', 'readwrite');
  const qs = qtx.objectStore('questions');

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
        active: local.active !== false,
        tags: Array.isArray(local.tags) ? local.tags : (Array.isArray(q.tags) ? q.tags : []),
        pinned: !!(local.pinned || q.pinned),
        imageUrl: local.imageUrl || q.imageUrl || '',
        imageData: local.imageData || q.imageData || '',
        srEase: local.srEase || q.srEase || 2.5,
        srInterval: local.srInterval || q.srInterval || 0,
        srReps: local.srReps || q.srReps || 0,
        dueAt: local.dueAt || q.dueAt || null
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
        active: q.active !== false,
        tags: Array.isArray(q.tags) ? q.tags : [],
        pinned: !!q.pinned,
        imageUrl: q.imageUrl || '',
        imageData: q.imageData || '',
        srEase: q.srEase || 2.5,
        srInterval: q.srInterval || 0,
        srReps: q.srReps || 0,
        dueAt: q.dueAt || null
      };
      qs.put(obj);
    }
  });

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
  const tx = db.transaction('meta', 'readonly');
  const store = tx.objectStore('meta');
  const req1 = store.get('lastActivityAt');
  const req2 = store.get('lastBackupAt');
  req1.onsuccess = () => {
    lastActEl.textContent = fmtTime(req1.result ? req1.result.value : null);
  };
  req2.onsuccess = () => {
    lastBackupEl.textContent = fmtTime(req2.result ? req2.result.value : null);
  };
}

// --- All Questions table + edit modal ---
const editModal = document.getElementById('editModal');
const editBackdrop = document.getElementById('editModalBackdrop');
const editTitleEl = document.getElementById('editModalTitle');
const editTextEl = document.getElementById('editText');
const editChapterEl = document.getElementById('editChapter');
const editSourceEl = document.getElementById('editSource');
const editTagsEl = document.getElementById('editTags');
const editExplanationEl = document.getElementById('editExplanation');
const editImageUrlEl = document.getElementById('editImageUrl');
const editImageFileEl = document.getElementById('editImageFile');
const editImagePreviewEl = document.getElementById('editImagePreview');
const editChoicesEl = document.getElementById('editChoices');
const editFlaggedEl = document.getElementById('editFlagged');
const editMaintEl = document.getElementById('editMaint');
const editPinnedEl = document.getElementById('editPinned');
const editActiveEl = document.getElementById('editActive');
const btnEditSave = document.getElementById('btnEditSave');
const btnEditCancel = document.getElementById('btnEditCancel');
const btnAddChoice = document.getElementById('btnAddChoice');

let editingQuestionId = null;

function openEditModal(q) {
  editingQuestionId = q ? q.id : null;
  editTitleEl.textContent = q ? `Edit question #${q.id}` : 'Add question';
  editTextEl.value = q?.text || '';
  editChapterEl.value = q?.chapter || '';
  editSourceEl.value = q?.source || '';
  editTagsEl.value = (q?.tags || []).join(', ');
  editExplanationEl.value = q?.explanation || '';
  editImageUrlEl.value = q?.imageUrl || '';
  editImageFileEl.value = '';
  editImagePreviewEl.innerHTML = '';
  if (q && (q.imageData || q.imageUrl)) {
    const src = q.imageData || q.imageUrl;
    editImagePreviewEl.innerHTML = `<img src="${src}" alt="preview">`;
  }
  editFlaggedEl.checked = !!q?.flagged;
  editMaintEl.checked = !!q?.maintenance;
  editPinnedEl.checked = !!q?.pinned;
  editActiveEl.checked = q ? q.active !== false : true;

  editChoicesEl.innerHTML = '';
  const choices = q?.choices && q.choices.length ? q.choices : [{ text:'', isCorrect:true }];
  choices.forEach((c, idx) => addChoiceRow(c.text || '', !!c.isCorrect));

  editModal.classList.remove('hidden');
}

function closeEditModal() {
  editModal.classList.add('hidden');
  editingQuestionId = null;
}

function addChoiceRow(text, isCorrect) {
  const row = document.createElement('div');
  row.className = 'edit-choice-row';
  row.innerHTML = `
    <input type="text" class="choice-text" placeholder="Choice text" value="${text || ''}">
    <label style="font-size:0.75rem;">
      <input type="radio" name="editCorrect" class="choice-correct" ${isCorrect ? 'checked' : ''}>
      Correct
    </label>
    <button class="pill-btn btn-remove-choice">✕</button>
  `;
  row.querySelector('.btn-remove-choice').addEventListener('click', () => {
    if (editChoicesEl.children.length <= 1) return;
    row.remove();
  });
  row.querySelector('.choice-correct').addEventListener('change', () => {
    if (row.querySelector('.choice-correct').checked) {
      editChoicesEl.querySelectorAll('.choice-correct').forEach(r => {
        if (r !== row.querySelector('.choice-correct')) r.checked = false;
      });
    }
  });
  editChoicesEl.appendChild(row);
}

btnAddChoice.addEventListener('click', () => {
  addChoiceRow('', false);
});

editImageFileEl.addEventListener('change', () => {
  const file = editImageFileEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    editImagePreviewEl.innerHTML = `<img src="${dataUrl}" alt="preview">`;
    editImageUrlEl.value = ''; // prefer local data
    editImagePreviewEl.dataset.imageData = dataUrl;
  };
  reader.readAsDataURL(file);
});

editBackdrop.addEventListener('click', closeEditModal);
btnEditCancel.addEventListener('click', closeEditModal);

btnEditSave.addEventListener('click', async () => {
  const text = editTextEl.value.trim();
  if (!text) {
    alert('Question text required.');
    return;
  }
  const chapter = editChapterEl.value.trim();
  const source = editSourceEl.value.trim();
  const tags = editTagsEl.value.split(',').map(t => t.trim()).filter(Boolean);
  const explanation = editExplanationEl.value.trim();
  const imageUrl = editImageUrlEl.value.trim();
  const imageData = editImagePreviewEl.dataset.imageData || '';

  const choiceRows = Array.from(editChoicesEl.querySelectorAll('.edit-choice-row'));
  if (!choiceRows.length) {
    alert('At least one choice is required.');
    return;
  }
  const choices = choiceRows.map(row => {
    const txt = row.querySelector('.choice-text').value.trim();
    const isCorrect = row.querySelector('.choice-correct').checked;
    return { text: txt, isCorrect };
  }).filter(c => c.text);
  if (!choices.length) {
    alert('Enter at least one non‑empty choice.');
    return;
  }
  if (!choices.some(c => c.isCorrect)) choices[0].isCorrect = true;

  const flagged = editFlaggedEl.checked;
  const maintenance = editMaintEl.checked;
  const pinned = editPinnedEl.checked;
  const active = editActiveEl.checked;

  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');

  if (editingQuestionId != null) {
    const req = store.get(editingQuestionId);
    req.onsuccess = e => {
      const old = e.target.result || {};
      const q = Object.assign({}, old, {
        text, chapter, source, explanation,
        tags, choices,
        flagged, maintenance, pinned,
        active,
        imageUrl,
        imageData: imageData || old.imageData || ''
      });
      store.put(q);
    };
  } else {
    const q = {
      text, chapter, source, explanation,
      tags, choices,
      flagged, maintenance, pinned,
      active,
      createdAt: new Date().toISOString(),
      timesSeen: 0, timesCorrect: 0, timesWrong: 0,
      lastSeenAt: null,
      imageUrl,
      imageData,
      srEase: 2.5,
      srInterval: 0,
      srReps: 0,
      dueAt: null
    };
    store.add(q);
  }

  tx.oncomplete = () => {
    closeEditModal();
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
});


async function reloadAllQuestionsTable() {
  const searchVal = document.getElementById('allSearch').value.toLowerCase().trim();
  const filter = document.getElementById('allFilter').value;
  const sortVal = document.getElementById('allSort').value;
  const tbody = document.getElementById('allTableBody');
  const rangeFrom = parseInt(document.getElementById('rangeFrom').value || '0', 10);
  const rangeTo = parseInt(document.getElementById('rangeTo').value || '0', 10);
  const lastNEl = document.getElementById('allLastN');
  const lastN = lastNEl ? parseInt(lastNEl.value || '0', 10) : 0;
  tbody.innerHTML = '';
  allRangeAnchorIndex = null;

  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));

  // duplicate clusters
  const dupMap = new Map();
  all.forEach(q => {
    const norm = normalizeTextForDup(q.text || '');
    if (!norm) return;
    if (!dupMap.has(norm)) dupMap.set(norm, []);
    dupMap.get(norm).push(q.id);
  });
  const dupSet = new Set();
  dupMap.forEach(ids => {
    if (ids.length > 1) ids.forEach(id => dupSet.add(id));
  });

  let arr = all;

  // search
  if (searchVal) {
    arr = arr.filter(q => {
      const s = (q.text || '') + ' ' + (q.chapter || '') + ' ' + (q.source || '') + ' ' + (Array.isArray(q.tags) ? q.tags.join(' ') : '');
      return s.toLowerCase().includes(searchVal);
    });
  }

  // ID range
  if (rangeFrom && rangeTo && rangeTo >= rangeFrom) {
    arr = arr.filter(q => q.id >= rangeFrom && q.id <= rangeTo);
  } else if (rangeFrom && !rangeTo) {
    arr = arr.filter(q => q.id >= rangeFrom);
  } else if (!rangeFrom && rangeTo) {
    arr = arr.filter(q => q.id <= rangeTo);
  }

  // chapter filter via dropdown (exact chapter match)
  const chapSelect = document.getElementById('allChapterSelect');
  const chapVal = chapSelect ? chapSelect.value.trim() : '';
  if (chapVal) {
    arr = arr.filter(q => (q.chapter || '').trim() === chapVal);
  }

  // filter modes
  if (filter === 'flagged') {
    arr = arr.filter(q => q.flagged);
  } else if (filter === 'wrong') {
    arr = arr.filter(q => (q.timesWrong || 0) > 0);
  } else if (filter === 'maintenance') {
    arr = arr.filter(q => q.maintenance === true);
  } else if (filter === 'inactive') {
    arr = arr.filter(q => q.active === false);
  } else if (filter === 'weak') {
    arr = arr.filter(q => weakSet.has(q.id));
  } else if (filter === 'duplicate') {
    arr = arr.filter(q => dupSet.has(q.id));
  } else if (filter === 'pinned') {
    arr = arr.filter(q => q.pinned);
  }

  // sorting
  if (sortVal === 'created_desc') {
    arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } else if (sortVal === 'created_asc') {
    arr.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  } else if (sortVal === 'chapter') {
    arr.sort((a, b) => (a.chapter || '').localeCompare(b.chapter || ''));
  } else if (sortVal === 'wrong_desc') {
    arr.sort((a, b) => (b.timesWrong || 0) - (a.timesWrong || 0));
  } else if (sortVal === 'due_asc') {
    arr.sort((a, b) => (a.dueAt || '').localeCompare(b.dueAt || ''));
  } else if (sortVal === 'text_asc') {
    arr.sort((a, b) => (a.text || '').localeCompare(b.text || ''));
  }

  // last N
  if (lastN && lastN > 0) {
    arr = arr.slice(0, lastN);
  }

  const total = arr.length;
  allTotalPages = Math.max(1, Math.ceil(total / ALL_PAGE_SIZE));
  if (allCurrentPage < 1) allCurrentPage = 1;
  if (allCurrentPage > allTotalPages) allCurrentPage = allTotalPages;

  const startIdx = (allCurrentPage - 1) * ALL_PAGE_SIZE;
  const endIdx = Math.min(startIdx + ALL_PAGE_SIZE, total);
  const pageItems = arr.slice(startIdx, endIdx);

  const pageInfoEl = document.getElementById('allPageInfo');
  if (pageInfoEl) {
    pageInfoEl.textContent = `Page ${allCurrentPage} / ${allTotalPages} (total ${total})`;
  }

  const nowIso = new Date().toISOString();

  const boxesMeta = [];

  pageItems.forEach((q, indexOnPage) => {
    const tr = document.createElement('tr');
    const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : '';
    const metaBits = [];
    if (q.flagged) metaBits.push('<span class="pill pill-flag">Flag</span>');
    if (q.maintenance) metaBits.push('<span class="pill pill-maint">Maint</span>');
    if (weakSet.has(q.id)) metaBits.push('<span class="pill pill-weak">Weak</span>');
    if (dupSet.has(q.id)) metaBits.push('<span class="pill pill-dup">Dup</span>');
    if (q.pinned) metaBits.push('<span class="pill pill-pin">Pin</span>');
    if (q.dueAt && q.dueAt <= nowIso) metaBits.push('<span class="pill pill-due">Due</span>');

    const dueLabel = q.dueAt ? fmtTime(q.dueAt) : '–';
    tr.innerHTML = `
      <td><input type="checkbox" class="row-select" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>${(q.text || '').slice(0, 120)}${q.text && q.text.length > 120 ? '…' : ''}</td>
      <td>${q.chapter || ''}</td>
      <td>${tagsStr}</td>
      <td>${metaBits.join(' ')}</td>
      <td>${q.timesSeen || 0}</td>
      <td>${q.timesWrong || 0}</td>
      <td>${dueLabel}</td>
      <td><button class="pill-btn btn-edit" data-id="${q.id}">Edit</button></td>
    `;
    const cb = tr.querySelector('.row-select');
    if (cb) {
      const id = q.id;
      if (allSelectedIds.has(id)) {
        cb.checked = true;
      }
      cb.addEventListener('change', () => {
        const rangeModeEl = document.getElementById('allRangeMode');
        const rangeMode = !!(rangeModeEl && rangeModeEl.checked);
        const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
        const thisIndex = boxes.indexOf(cb);

        if (!rangeMode || thisIndex === -1) {
          if (cb.checked) {
            allSelectedIds.add(id);
          } else {
            allSelectedIds.delete(id);
          }
          allRangeAnchorIndex = thisIndex;
          updateAllSelectedCount();
          return;
        }

        // range mode
        if (allRangeAnchorIndex == null || allRangeAnchorIndex === thisIndex) {
          // first anchor click behaves like normal
          if (cb.checked) {
            allSelectedIds.add(id);
          } else {
            allSelectedIds.delete(id);
          }
          allRangeAnchorIndex = thisIndex;
          updateAllSelectedCount();
          return;
        }

        const start = Math.min(allRangeAnchorIndex, thisIndex);
        const end = Math.max(allRangeAnchorIndex, thisIndex);

        let allAlreadySelected = true;
        for (let i = start; i <= end; i++) {
          const rowCb = boxes[i];
          if (!rowCb) continue;
          const rid = parseInt(rowCb.getAttribute('data-id'), 10);
          if (!allSelectedIds.has(rid)) {
            allAlreadySelected = false;
            break;
          }
        }

        if (allAlreadySelected) {
          // unselect whole range
          for (let i = start; i <= end; i++) {
            const rowCb = boxes[i];
            if (!rowCb) continue;
            const rid = parseInt(rowCb.getAttribute('data-id'), 10);
            rowCb.checked = false;
            allSelectedIds.delete(rid);
          }
        } else {
          // select whole range
          for (let i = start; i <= end; i++) {
            const rowCb = boxes[i];
            if (!rowCb) continue;
            const rid = parseInt(rowCb.getAttribute('data-id'), 10);
            rowCb.checked = true;
            allSelectedIds.add(rid);
          }
        }
        allRangeAnchorIndex = thisIndex;
        updateAllSelectedCount();
      });
    }

    tr.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || e.target.classList.contains('btn-edit')) return;
      const anySelected = !!document.querySelector('#allTableBody input[type="checkbox"].row-select:checked');
      if (anySelected) return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]').click();
    });
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const tx = db.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const req = store.get(id);
      req.onsuccess = ev => {
        const q = ev.target.result;
        if (!q) return;
        delete editImagePreviewEl.dataset.imageData;
        openEditModal(q);
      };
    });
  });

  updateAllSelectedCount();
}



function updateAllSelectedCount() {
  const el = document.getElementById('allSelectedCount');
  if (el) el.textContent = allSelectedIds.size.toString();
  const allSelectAll = document.getElementById('allSelectAll');
  const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
  if (allSelectAll && boxes.length) {
    const allOnThisPageSelected = boxes.every(cb => allSelectedIds.has(parseInt(cb.getAttribute('data-id'), 10)));
    allSelectAll.checked = allOnThisPageSelected && boxes.length > 0;
  }
}

async function bulkSetChapterForSelected() {
  if (!allSelectedIds.size) return;
  const newChap = prompt('New chapter name for selected questions:');
  if (!newChap) return;
  const ids = Array.from(allSelectedIds);
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => {
    const req = store.get(id);
    req.onsuccess = () => {
      const q = req.result;
      if (!q) return;
      q.chapter = newChap;
      store.put(q);
    };
  });
  tx.oncomplete = () => {
    reloadAllQuestionsTable();
  };
}

async function bulkAddTagForSelected() {
  if (!allSelectedIds.size) return;
  const tag = prompt('Tag to add to selected questions:');
  if (!tag) return;
  const trimmed = tag.trim();
  if (!trimmed) return;
  const ids = Array.from(allSelectedIds);
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => {
    const req = store.get(id);
    req.onsuccess = () => {
      const q = req.result;
      if (!q) return;
      if (!Array.isArray(q.tags)) q.tags = [];
      if (!q.tags.includes(trimmed)) {
        q.tags.push(trimmed);
        store.put(q);
      }
    };
  });
  tx.oncomplete = () => {
    reloadAllQuestionsTable();
  };
}

async function deleteSelectedAll() {
  const count = allSelectedIds.size;
  if (!count) return;
  if (!confirm('Delete ' + count + ' question(s)?')) return;
  const ids = Array.from(allSelectedIds);
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => store.delete(id));
  tx.oncomplete = () => {
    allSelectedIds = new Set();
    allRangeAnchorIndex = null;
    updateAllSelectedCount();
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

async function deleteDuplicateClusters() {
  const all = await getAllQuestions();
  const dupMap = new Map();
  all.forEach(q => {
    const norm = normalizeTextForDup(q.text || '');
    if (!norm) return;
    if (!dupMap.has(norm)) dupMap.set(norm, []);
    dupMap.get(norm).push(q);
  });
  const toDelete = [];
  dupMap.forEach(list => {
    if (list.length <= 1) return;
    list.sort((a,b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
    const keep = list[0];
    list.slice(1).forEach(q => toDelete.push(q.id));
  });
  if (!toDelete.length) {
    alert('No duplicate clusters found.');
    return;
  }
  if (!confirm('Delete ' + toDelete.length + ' duplicate question(s) (keeping one from each cluster)?')) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  toDelete.forEach(id => store.delete(id));
  tx.oncomplete = () => {
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

// --- Dashboard ---
async function renderDashboard() {
  const all = await getAllQuestions();
  const weak = computeWeakQuestions(all);
  const dashOverall = document.getElementById('dashOverall');
  const dashWeakChapters = document.getElementById('dashWeakChapters');
  const dashWeekly = document.getElementById('dashWeekly');

  const total = all.length;
  const answered = all.filter(q => q.timesSeen > 0).length;
  const wrong = all.reduce((s, q) => s + (q.timesWrong || 0), 0);
  const correct = all.reduce((s, q) => s + (q.timesCorrect || 0), 0);
  const wrongRate = (wrong + correct) ? (wrong / (wrong + correct) * 100) : 0;

  dashOverall.innerHTML = `
    <div class="dash-title">Overall</div>
    <div>Total questions: <strong>${total}</strong></div>
    <div>Answered at least once: <strong>${answered}</strong></div>
    <div>Weak questions: <strong>${weak.length}</strong></div>
    <div>Total correct: <strong>${correct}</strong></div>
    <div>Total wrong: <strong>${wrong}</strong> (${wrongRate.toFixed(1)}%)</div>
  `;

  const chapMap = new Map();
  weak.forEach(q => {
    const key = q.chapter || 'No chapter';
    if (!chapMap.has(key)) chapMap.set(key, []);
    chapMap.get(key).push(q);
  });
  let chapHtml = '<div class="dash-title">Weak chapters</div>';
  if (!chapMap.size) {
    chapHtml += '<div class="tiny muted">No clear weak chapters yet.</div>';
  } else {
    chapMap.forEach((list, chap) => {
      chapHtml += `<div><strong>${chap}</strong> – ${list.length} weak questions</div>`;
    });
  }
  dashWeakChapters.innerHTML = chapHtml;

  dashWeekly.innerHTML = '<div class="dash-title">Weekly activity</div><div class="tiny muted">Uses answers timestamps (simple text summary).</div>';
}

// --- Flashcards ---
async function buildFlashcardPool() {
  const src = fcSourceEl.value;
  const chap = fcChapterFilterEl.value.trim().toLowerCase();
  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));
  const nowIso = new Date().toISOString();
  let pool = all.filter(q => q.active !== false);
  if (src === 'due') {
    pool = pool.filter(q => isDue(q, nowIso));
  } else if (src === 'weak') {
    pool = pool.filter(q => weakSet.has(q.id));
  } else if (src === 'flagged') {
    pool = pool.filter(q => q.flagged);
  } else if (src === 'chapter' && chap) {
    pool = pool.filter(q => (q.chapter || '').toLowerCase() === chap);
  }
  flashcardPool = shuffle(pool);
  flashcardIndex = -1;
  nextFlashcard();
}

function currentFlashcard() {
  if (flashcardIndex < 0 || flashcardIndex >= flashcardPool.length) return null;
  return flashcardPool[flashcardIndex];
}

function renderFlashcard() {
  const q = currentFlashcard();
  if (!q) {
    fcFront.textContent = 'No cards in this pool.';
    fcBack.style.display = 'none';
    fcBack.textContent = '';
    return;
  }
  const mode = fcModeEl.value;
  const letters = ['A','B','C','D','E','F','G'];
  const correctIdx = (q.choices || []).findIndex(c => c.isCorrect);
  const correctChoice = correctIdx >= 0 ? q.choices[correctIdx] : null;

  if (mode === 'q-first') {
    fcFront.innerHTML = `Q#${q.id ?? ''} – ${q.text || ''}`;
    if (q.imageData || q.imageUrl) {
      const src = q.imageData || q.imageUrl;
      fcFront.innerHTML += `<div class="img-preview"><img src="${src}" alt="img"></div>`;
    }
    if (!flashcardShowBack) {
      fcBack.style.display = 'none';
      fcBack.innerHTML = '';
    } else {
      let back = '';
      if (correctChoice) {
        back += `<div><strong>Answer:</strong> ${letters[correctIdx]}. ${correctChoice.text || ''}</div>`;
      }
      if (q.explanation) {
        back += `<div style="margin-top:0.25rem;"><strong>Explanation:</strong> ${q.explanation}</div>`;
      }
      fcBack.innerHTML = back || 'No answer text.';
      fcBack.style.display = 'block';
    }
  } else {
    fcFront.innerHTML = '';
    if (correctChoice) {
      fcFront.innerHTML = `<div><strong>Key idea:</strong> ${correctChoice.text || ''}</div>`;
    } else {
      fcFront.innerHTML = `<div><strong>Key idea:</strong> ${q.explanation || 'No answer text.'}</div>`;
    }
    if (!flashcardShowBack) {
      fcBack.style.display = 'none';
      fcBack.innerHTML = '';
    } else {
      let back = `Q#${q.id ?? ''} – ${q.text || ''}`;
      if (q.imageData || q.imageUrl) {
        const src = q.imageData || q.imageUrl;
        back += `<div class="img-preview"><img src="${src}" alt="img"></div>`;
      }
      fcBack.innerHTML = back;
      fcBack.style.display = 'block';
    }
  }
}

function nextFlashcard() {
  if (!flashcardPool.length) {
    flashcardIndex = -1;
    flashcardShowBack = false;
    renderFlashcard();
    return;
  }
  flashcardIndex = (flashcardIndex + 1) % flashcardPool.length;
  flashcardShowBack = false;
  renderFlashcard();
}

async function updateSpacedAfterFlashcard(good) {
  const q = currentFlashcard();
  if (!q) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  const req = store.get(q.id);
  req.onsuccess = e => {
    const cur = e.target.result;
    if (!cur) return;
    nextSpaced(cur, good);
    store.put(cur);
  };
}

// --- Daily challenge ---
async function startDailyChallenge() {
  const today = new Date().toISOString().slice(0,10);
  const key = 'daily_' + today;
  let ids = [];
  try {
    const raw = localStorage.getItem('mcq_daily_ids_' + today);
    if (raw) {
      ids = JSON.parse(raw);
    }
  } catch {}

  const all = await getAllQuestions();
  if (!ids.length) {
    const weak = computeWeakQuestions(all);
    const flagged = all.filter(q => q.flagged);
    const highWrong = all.filter(q => (q.timesWrong || 0) >= 2);
    const mix = shuffle([...weak, ...flagged, ...highWrong, ...all]);
    const picked = [];
    const seen = new Set();
    for (const q of mix) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        picked.push(q.id);
      }
      if (picked.length >= 10) break;
    }
    ids = picked;
    try { localStorage.setItem('mcq_daily_ids_' + today, JSON.stringify(ids)); } catch {}
  }

  if (!ids.length) {
    alert('No questions available for daily challenge.');
    return;
  }

  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const firstReq = store.get(ids[0]);
  firstReq.onsuccess = e => {
    const q = e.target.result;
    if (!q) return;
    historyStack = [];
    currentQuestion = q;
    lastResult = null;
    lastSelectedIndex = null;
    feedbackPanel.innerHTML = '';
    renderQuestion();
    updateStatsBar();
    updateHistoryList();
  };
}

// --- Exam simulation ---
async function startExam() {
  const poolType = document.getElementById('examPool').value;
  const chap = document.getElementById('examChapterFilter').value.trim().toLowerCase();
  const count = parseInt(document.getElementById('examCount').value || '30', 10);
  const minutes = parseInt(document.getElementById('examMinutes').value || '60', 10);

  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));
  let pool = all.filter(q => q.active !== false);
  if (poolType === 'weak') {
    pool = pool.filter(q => weakSet.has(q.id));
  } else if (poolType === 'flagged') {
    pool = pool.filter(q => q.flagged);
  } else if (poolType === 'chapter' && chap) {
    pool = pool.filter(q => (q.chapter || '').toLowerCase() === chap);
  }
  pool = shuffle(pool);
  if (!pool.length) {
    alert('No questions available for this pool.');
    return;
  }
  const selected = pool.slice(0, Math.min(count, pool.length));
  examSession = {
    ids: selected.map(q => q.id),
    answers: {},
    index: 0,
    startTime: Date.now(),
    limitMs: minutes * 60 * 1000
  };
  document.getElementById('examTotalLabel').textContent = selected.length;
  document.getElementById('examActiveCard').style.display = 'block';
  document.getElementById('examResultCard').style.display = 'none';
  renderExamQuestion();
  startExamTimer();
}

async function renderExamQuestion() {
  if (!examSession) return;
  const idx = examSession.index;
  const total = examSession.ids.length;
  if (idx < 0 || idx >= total) return;
  document.getElementById('examIndexLabel').textContent = (idx + 1);
  const qid = examSession.ids[idx];
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const req = store.get(qid);
  req.onsuccess = e => {
    const q = e.target.result;
    const panel = document.getElementById('examQuestionPanel');
    if (!q) {
      panel.innerHTML = '<div class="muted">Question not found.</div>';
      return;
    }
    const letters = ['A','B','C','D','E','F','G'];
    let html = `<div class="q-text">Q#${q.id ?? ''} – ${q.text || ''}</div>`;
    if (q.chapter || q.source) {
      html += '<div class="tag-chapter">';
      if (q.chapter) html += `<span>${q.chapter}</span>`;
      if (q.source) html += ` · <span>${q.source}</span>`;
      html += '</div>';
    }
    if (q.imageData || q.imageUrl) {
      const src = q.imageData || q.imageUrl;
      html += `<div class="img-preview"><img src="${src}" alt="img"></div>`;
    }
    html += '<div style="margin-top:0.4rem;">';
    (q.choices || []).forEach((c, i) => {
      const letter = letters[i] || '?';
      const saved = examSession.answers[qid];
      const checked = saved === i ? 'checked' : '';
      html += `<label class="choice">
        <input type="radio" name="examChoice" value="${i}" ${checked}>
        <strong>${letter}.</strong> ${c.text || ''}
      </label>`;
    });
    html += '</div>';
    panel.innerHTML = html;
  };
}

function examMove(delta) {
  if (!examSession) return;
  const panel = document.getElementById('examQuestionPanel');
  const radios = panel.querySelectorAll('input[name="examChoice"]');
  let selected = null;
  radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); });
  const currentQid = examSession.ids[examSession.index];
  if (selected !== null) {
    examSession.answers[currentQid] = selected;
  }
  const nextIndex = examSession.index + delta;
  if (nextIndex < 0 || nextIndex >= examSession.ids.length) return;
  examSession.index = nextIndex;
  renderExamQuestion();
}

async function finishExam() {
  if (!examSession) return;
  clearInterval(examTimerId);
  examTimerId = null;

  // Save last question selection
  const panel = document.getElementById('examQuestionPanel');
  const radios = panel.querySelectorAll('input[name="examChoice"]');
  let selected = null;
  radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); });
  const currentQid = examSession.ids[examSession.index];
  if (selected !== null) {
    examSession.answers[currentQid] = selected;
  }

  const all = await getAllQuestions();
  const byId = new Map();
  all.forEach(q => byId.set(q.id, q));

  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  const perChapter = new Map();

  examSession.ids.forEach(id => {
    const q = byId.get(id);
    if (!q) return;
    const ans = examSession.answers[id];
    const correctIdx = (q.choices || []).findIndex(c => c.isCorrect);
    if (ans == null) {
      unanswered++;
      return;
    }
    const chap = q.chapter || 'No chapter';
    if (!perChapter.has(chap)) perChapter.set(chap, { correct:0, wrong:0 });
    if (ans === correctIdx) {
      correct++;
      perChapter.get(chap).correct++;
    } else {
      wrong++;
      perChapter.get(chap).wrong++;
    }
  });

  const total = examSession.ids.length;
  const score = total ? (correct / total * 100) : 0;
  const durationMs = Date.now() - examSession.startTime;
  const minutesUsed = durationMs / 60000;

  const summaryEl = document.getElementById('examSummary');
  summaryEl.innerHTML = `
    <div>Total questions: <strong>${total}</strong></div>
    <div>Correct: <strong>${correct}</strong></div>
    <div>Wrong: <strong>${wrong}</strong></div>
    <div>Unanswered: <strong>${unanswered}</strong></div>
    <div>Score: <strong>${score.toFixed(1)}%</strong></div>
    <div>Time used: <strong>${minutesUsed.toFixed(1)} min</strong></div>
  `;

  let detailHtml = '<div>Per chapter:</div>';
  perChapter.forEach((v, chap) => {
    const t = v.correct + v.wrong;
    const s = t ? (v.correct / t * 100) : 0;
    detailHtml += `<div>${chap}: ${v.correct}/${t} correct (${s.toFixed(1)}%)</div>`;
  });
  document.getElementById('examDetails').innerHTML = detailHtml;

  document.getElementById('examActiveCard').style.display = 'none';
  document.getElementById('examResultCard').style.display = 'block';
  examSession = null;
}

function startExamTimer() {
  if (!examSession) return;
  if (examTimerId) clearInterval(examTimerId);
  const label = document.getElementById('examTimerLabel');
  const endTime = examSession.startTime + examSession.limitMs;
  function tick() {
    const now = Date.now();
    const remain = Math.max(0, endTime - now);
    const m = Math.floor(remain / 60000);
    const s = Math.floor((remain % 60000) / 1000);
    label.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (remain <= 0) {
      clearInterval(examTimerId);
      examTimerId = null;
      alert('Time is over – finishing exam.');
      finishExam();
    }
  }
  tick();
  examTimerId = setInterval(tick, 1000);
}

// Initial DB open
openDB().then(() => {
  loadTheme();
  refreshBackupLabels();
  refreshCloudInfo();
  loadGitHubConfigIntoUI();
  refreshChapterOptions();
  loadNextQuestion(true);
  buildFlashcardPool();
}).catch(err => {
  console.error(err);
  alert('Failed to open local database.');
});});

// All tab subview toggle (bank vs builder)
(function () {
  const bankView = document.getElementById('allViewBank');
  const builderView = document.getElementById('allViewBuilder');
  const subnavBtns = document.querySelectorAll('.subnav-btn');
  subnavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-allview');
      subnavBtns.forEach(b => b.classList.remove('subnav-btn-active'));
      btn.classList.add('subnav-btn-active');
      if (target === 'builder') {
        if (bankView) bankView.style.display = 'none';
        if (builderView) builderView.style.display = 'block';
      } else {
        if (bankView) bankView.style.display = 'block';
        if (builderView) builderView.style.display = 'none';
      }
    });
  });
})();

// Builder helpers: prompt + preview + import
let builderPreviewCache = [];

function makeBuilderPrompt() {
  const src = (document.getElementById('builderSourceText')?.value || '').trim();
  const num = parseInt(document.getElementById('builderNumQuestions')?.value || '0', 10) || 10;
  const outEl = document.getElementById('builderPromptOut');
  if (!outEl) return;
  if (!src) {
    outEl.value = 'Paste source text first.';
    return;
  }
  const corePrompt = `You are an expert ICU / Internal Medicine board-exam question generator. Use ONLY the following source text (any language) to create ${num} difficult, board-level MCQs in advanced academic English. Follow strictly this JSON schema: an array of objects with fields id (int), text, chapter, source, explanation, choices[{text,isCorrect}], tags, optional difficulty and images. Questions, choices, explanations, tags, chapter, and source MUST ALL be in ENGLISH. Do NOT add any keys outside this schema. Output ONLY a JSON array, nothing else.`;
  outEl.value = corePrompt + "\n\nSOURCE TEXT:\n\n" + src;
}

async function builderPreviewFromJson() {
  const raw = (document.getElementById('builderJsonInput')?.value || '').trim();
  const previewEl = document.getElementById('builderPreview');
  if (!previewEl) return;
  if (!raw) {
    previewEl.textContent = 'Paste JSON first.';
    return;
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('JSON must be an array of questions.');
    builderPreviewCache = data;
    let html = '<table class="q-table tiny"><thead><tr><th><input type="checkbox" id="builderSelectAll"></th><th>ID</th><th>Text</th><th>Chapter</th><th>Tags</th></tr></thead><tbody>';
    data.forEach((q, idx) => {
      const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : '';
      const txt = (q.text || '').slice(0, 120) + ((q.text || '').length > 120 ? '…' : '');
      html += `<tr>
        <td><input type="checkbox" class="builder-row-select" data-idx="${idx}" checked></td>
        <td>${q.id ?? idx + 1}</td>
        <td>${txt}</td>
        <td>${q.chapter || ''}</td>
        <td>${tagsStr}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    previewEl.innerHTML = html;
    const selAll = document.getElementById('builderSelectAll');
    if (selAll) {
      selAll.addEventListener('change', e => {
        document.querySelectorAll('.builder-row-select').forEach(ch => {
          ch.checked = e.target.checked;
        });
      });
    }
  } catch (err) {
    previewEl.textContent = 'Error: ' + err.message;
  }
}

async function builderImportSelected() {
  if (!builderPreviewCache || !builderPreviewCache.length) {
    alert('No preview data to import.');
    return;
  }
  const checks = Array.from(document.querySelectorAll('.builder-row-select'));
  const selected = checks
    .map((ch, idx) => (ch.checked ? idx : -1))
    .filter(i => i >= 0)
    .map(i => builderPreviewCache[i]);
  if (!selected.length) {
    alert('No questions selected.');
    return;
  }
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  selected.forEach((q, idx) => {
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
      active: q.active !== false,
      tags: Array.isArray(q.tags) ? q.tags : [],
      pinned: !!q.pinned,
      imageUrl: q.imageUrl || '',
      imageData: q.imageData || '',
      srEase: q.srEase || 2.5,
      srInterval: q.srInterval || 0,
      srReps: q.srReps || 0,
      dueAt: q.dueAt || null
    };
    if (q.id != null) obj.id = q.id;
    store.put(obj);
  });
  tx.oncomplete = () => {
    alert('Imported ' + selected.length + ' questions into bank.');
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

// Hook builder buttons
document.getElementById('btnBuilderMakePrompt')?.addEventListener('click', makeBuilderPrompt);
document.getElementById('btnBuilderPreview')?.addEventListener('click', builderPreviewFromJson);
document.getElementById('btnBuilderImportSelected')?.addEventListener('click', builderImportSelected);


// Practice controlsPro v4.1
// IndexedDB + spaced repetition + weak-spot engine + dashboard + flashcards + exam sim

const DB_NAME = 'mcqdb_ultra_v41';
const DB_VERSION = 3;

let db = null;

let currentQuestion = null;
let currentChoices = [];
let currentMode = 'due';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;
let historyStack = [];

// ALL tab selection & pagination state
let allSelectedIds = new Set();
let allCurrentPage = 1;
let allTotalPages = 1;
const ALL_PAGE_SIZE = 50;
let allRangeAnchorIndex = null;
let lastActivityAt = null;
let currentTheme = 'light';

// Spaced repetition / flashcards
let flashcardPool = [];
let flashcardIndex = -1;
let flashcardShowBack = false;

// Exam simulation
let examSession = null;
let examTimerId = null;

const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterFilterEl = document.getElementById('chapterFilter');
const relatedBox = document.getElementById('relatedBox');
const themeSelect = document.getElementById('themeSelect');

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
    } else if (tab === 'dashboard') {
      renderDashboard();
    }
  });
});

// Theme handling
function loadTheme() {
  try {
    const t = localStorage.getItem('mcq_theme') || 'light';
    currentTheme = t;
    applyTheme();
  } catch {
    currentTheme = 'light';
    applyTheme();
  }
}
function applyTheme() {
  document.body.classList.remove('theme-light','theme-dark','theme-night','theme-calm');
  if (currentTheme === 'dark') document.body.classList.add('theme-dark');
  else if (currentTheme === 'night') document.body.classList.add('theme-night');
  else if (currentTheme === 'calm') document.body.classList.add('theme-calm');
  themeSelect.value = currentTheme;
}
themeSelect.addEventListener('change', () => {
  currentTheme = themeSelect.value || 'light';
  applyTheme();
  try { localStorage.setItem('mcq_theme', currentTheme); } catch {}
});

// Mode select
modeSelect.addEventListener('change', () => {
  currentMode = modeSelect.value;
  const chapterSelect = document.getElementById('chapterSelect');
  if (currentMode === 'chapter') {
    if (chapterSelect) chapterSelect.style.display = 'inline-block';
  } else {
    if (chapterSelect) {
      chapterSelect.style.display = 'none';
      chapterSelect.value = '';
    }
    currentChapter = '';
  }
  loadNextQuestion(true);
});
document.getElementById('chapterSelect')?.addEventListener('change', (e) => {
  const sel = e.target;
  currentChapter = (sel && sel.value ? sel.value.trim() : '');
  loadNextQuestion(true);
});

// Quick filter buttons
document.getElementById('btnQuickWrong').addEventListener('click', () => {
  currentMode = 'wrong';
  modeSelect.value = 'wrong';
  const chapterSelect = document.getElementById('chapterSelect');
  if (chapterSelect) {
    chapterSelect.style.display = 'none';
    chapterSelect.value = '';
  }
  currentChapter = '';
  loadNextQuestion(true);
});
document.getElementById('btnQuickFlagged').addEventListener('click', () => {
  currentMode = 'flagged';
  modeSelect.value = 'flagged';
  const chapterSelect = document.getElementById('chapterSelect');
  if (chapterSelect) {
    chapterSelect.style.display = 'none';
    chapterSelect.value = '';
  }
  currentChapter = '';
  loadNextQuestion(true);
});
document.getElementById('btnStartDaily').addEventListener('click', () => {
  startDailyChallenge();
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
document.getElementById('btnImportUrl')?.addEventListener('click', handleImportFromUrl);

// All questions tab controls
document.getElementById('btnAllReload').addEventListener('click', reloadAllQuestionsTable);
document.getElementById('btnAllDelete').addEventListener('click', deleteSelectedAll);
document.getElementById('btnAllDeleteDups').addEventListener('click', deleteDuplicateClusters);
document.getElementById('allSelectAll').addEventListener('change', e => {
  const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
  boxes.forEach(ch => {
    const id = parseInt(ch.getAttribute('data-id'), 10);
    ch.checked = e.target.checked;
    if (e.target.checked) {
      allSelectedIds.add(id);
    } else {
      allSelectedIds.delete(id);
    }
  });
  updateAllSelectedCount();
});
document.getElementById('allSearch').addEventListener('input', debounce(reloadAllQuestionsTable, 250));
document.getElementById('allFilter').addEventListener('change', () => { allCurrentPage = 1; reloadAllQuestionsTable(); });
document.getElementById('allSort').addEventListener('change', () => { allCurrentPage = 1; reloadAllQuestionsTable(); });
document.getElementById('rangeFrom').addEventListener('input', debounce(() => { allCurrentPage = 1; reloadAllQuestionsTable(); }, 250));
document.getElementById('rangeTo').addEventListener('input', debounce(() => { allCurrentPage = 1; reloadAllQuestionsTable(); }, 250));
document.getElementById('allChapterSelect').addEventListener('change', () => { allCurrentPage = 1; reloadAllQuestionsTable(); });
const allLastNInput = document.getElementById('allLastN');
if (allLastNInput) {
  allLastNInput.addEventListener('input', debounce(() => { allCurrentPage = 1; reloadAllQuestionsTable(); }, 250));
}
const prevBtn = document.getElementById('allPrevPage');
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (allCurrentPage > 1) {
      allCurrentPage--;
      reloadAllQuestionsTable();
    }
  });
}
const nextBtn = document.getElementById('allNextPage');
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (allCurrentPage < allTotalPages) {
      allCurrentPage++;
      reloadAllQuestionsTable();
    }
  });
}
const bulkChapBtn = document.getElementById('allBulkSetChapter');
if (bulkChapBtn) {
  bulkChapBtn.addEventListener('click', bulkSetChapterForSelected);
}
const bulkTagBtn = document.getElementById('allBulkAddTag');
if (bulkTagBtn) {
  bulkTagBtn.addEventListener('click', bulkAddTagForSelected);
}

// Backup tab controls
document.getElementById('btnBackupExport').addEventListener('click', exportFullBackup);
document.getElementById('btnBackupImport').addEventListener('click', handleBackupImport);

// Cloud sync controls
document.getElementById('btnCloudUpload').addEventListener('click', cloudUpload);
document.getElementById('btnCloudDownload').addEventListener('click', cloudDownload);
const quickBackupBtn = document.getElementById('btnBackupQuick');
if (quickBackupBtn) {
  quickBackupBtn.addEventListener('click', cloudUpload);
}

// Settings tab – GitHub
document.getElementById('btnSaveGitHub').addEventListener('click', saveGitHubConfigFromUI);
document.getElementById('btnClearGitHub').addEventListener('click', () => {
  localStorage.removeItem('mcq_github_config');
  loadGitHubConfigIntoUI();
  refreshCloudInfo();
});

// Flashcards controls
const fcSourceEl = document.getElementById('fcSource');
const fcChapterFilterEl = document.getElementById('fcChapterFilter');
const fcModeEl = document.getElementById('fcMode');
const fcFront = document.getElementById('flashcardFront');
const fcBack = document.getElementById('flashcardBack');

fcSourceEl.addEventListener('change', () => {
  if (fcSourceEl.value === 'chapter') {
    fcChapterFilterEl.style.display = 'inline-block';
  } else {
    fcChapterFilterEl.style.display = 'none';
    fcChapterFilterEl.value = '';
  }
  buildFlashcardPool();
});
fcChapterFilterEl.addEventListener('change', buildFlashcardPool);
fcModeEl.addEventListener('change', renderFlashcard);

document.getElementById('btnFcShow').addEventListener('click', () => {
  flashcardShowBack = true;
  renderFlashcard();
});
document.getElementById('btnFcAgain').addEventListener('click', async () => {
  await updateSpacedAfterFlashcard(false);
  nextFlashcard();
});
document.getElementById('btnFcGood').addEventListener('click', async () => {
  await updateSpacedAfterFlashcard(true);
  nextFlashcard();
});
document.getElementById('btnFcNext').addEventListener('click', () => {
  nextFlashcard();
});

// Exam sim controls
document.getElementById('btnStartExam').addEventListener('click', startExam);
document.getElementById('examPool').addEventListener('change', () => {
  const v = document.getElementById('examPool').value;
  const f = document.getElementById('examChapterFilter');
  f.style.display = (v === 'chapter') ? 'inline-block' : 'none';
});
document.getElementById('btnExamPrev').addEventListener('click', () => examMove(-1));
document.getElementById('btnExamNext').addEventListener('click', () => examMove(1));
document.getElementById('btnExamFinish').addEventListener('click', finishExam);

// --- IndexedDB setup ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('questions')) {
        const store = db.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by_chapter', 'chapter', { unique: false });
      } else {
        const store = req.transaction.objectStore('questions');
        // later versions: ensure fields exist logically; JS side handles defaults
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

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function debounce(fn, ms) {
  let t = null;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// --- Stats ---
async function getAllQuestions() {
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  return await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
}

async function getStats() {
  const all = await getAllQuestions();
  const nowIso = new Date().toISOString();
  const dueCount = all.filter(q => isDue(q, nowIso)).length;
  const stats = {
    total: all.length,
    flagged: all.filter(q => q.flagged).length,
    answered: all.filter(q => q.timesSeen > 0).length,
    withWrong: all.filter(q => q.timesWrong > 0).length,
    maintenance: all.filter(q => q.maintenance).length,
    weak: computeWeakQuestions(all).length,
    due: dueCount
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
    <div>Weak set: <strong>${s.weak}</strong></div>
    <div>Due now: <strong>${s.due}</strong></div>
  `;
}

// --- Spaced repetition helpers ---
function isDue(q, nowIso) {
  if (!q) return false;
  if (q.active === false) return false;
  if (!q.dueAt) return true;
  try {
    return q.dueAt <= nowIso;
  } catch {
    return true;
  }
}

function initSpacedFields(q) {
  if (!q.srEase) q.srEase = 2.5;
  if (!q.srInterval) q.srInterval = 0;
  if (!q.srReps) q.srReps = 0;
  return q;
}

function nextSpaced(q, correct) {
  q = initSpacedFields(q);
  const now = new Date();
  if (!correct) {
    q.srReps = 0;
    q.srInterval = 1;
    q.srEase = Math.max(1.3, q.srEase - 0.2);
  } else {
    q.srReps += 1;
    if (q.srReps === 1) q.srInterval = 1;
    else if (q.srReps === 2) q.srInterval = 3;
    else q.srInterval = Math.round(q.srInterval * q.srEase);
    q.srEase = Math.min(3.0, q.srEase + 0.05);
  }
  const next = new Date(now.getTime() + q.srInterval * 24 * 60 * 60 * 1000);
  q.dueAt = next.toISOString();
  return q;
}

// --- Weakness engine ---
function computeWeakQuestions(all) {
  return all.filter(q => {
    const seen = q.timesSeen || 0;
    const wrong = q.timesWrong || 0;
    if (seen < 3) return false;
    const rate = wrong / seen;
    return rate >= 0.4;
  });
}

function normalizeTextForDup(t) {
  if (!t) return '';
  return t
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9أ-يآؤئإ\s]/g, '')
    .trim();
}

// --- Pick question ---
async function pickQuestion() {
  const all = await getAllQuestions();
  if (!all.length) return null;
  const nowIso = new Date().toISOString();

  let filtered = all.filter(q => q.active !== false);

  if (currentMode === 'due') {
    filtered = filtered.filter(q => isDue(q, nowIso));
    if (!filtered.length) filtered = all.filter(q => q.active !== false);
  } else if (currentMode === 'new') {
    filtered = filtered.filter(q => !q.timesSeen);
  } else if (currentMode === 'wrong') {
    filtered = filtered.filter(q => q.timesWrong > 0);
  } else if (currentMode === 'flagged') {
    filtered = filtered.filter(q => q.flagged);
  } else if (currentMode === 'weak') {
    const weak = new Set(computeWeakQuestions(all).map(q => q.id));
    filtered = filtered.filter(q => weak.has(q.id));
    if (!filtered.length) filtered = all.filter(q => q.active !== false);
  } else if (currentMode === 'chapter' && currentChapter) {
    const chap = currentChapter.toLowerCase();
    filtered = filtered.filter(q => (q.chapter || '').toLowerCase() === chap);
  }

  if (!filtered.length) filtered = all;

  filtered.sort((a, b) => {
    // In 'all' mode, prefer questions never seen before
    if (currentMode === 'all') {
      const aUnseen = !a.timesSeen;
      const bUnseen = !b.timesSeen;
      if (aUnseen !== bUnseen) {
        return aUnseen ? -1 : 1; // unseen first
      }
    }

    const ad = a.dueAt || '';
    const bd = b.dueAt || '';
    if (ad && bd && ad !== bd) return ad.localeCompare(bd);
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  const slice = filtered.slice(0, Math.min(filtered.length, 80));
  return randomChoice(slice);
}

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML = '<div class="muted">No questions yet. Import JSON to start.</div>';
    relatedBox.innerHTML = 'No related questions yet.';
    return;
  }
  const q = currentQuestion;
  const letters = ['A','B','C','D','E','F','G'];
  currentChoices = q.choices || [];

  let html = '';
  html += `<div class="q-text">Q#${q.id ?? ''} – ${q.text || ''}</div>`;
  if (q.chapter || q.source || q.maintenance || q.flagged || q.pinned || (q.tags && q.tags.length)) {
    html += '<div class="tag-chapter">';
    if (q.chapter) html += `<span>${q.chapter}</span>`;
    if (q.source) html += ` · <span>${q.source}</span>`;
    if (q.tags && q.tags.length) html += ` · <span>${q.tags.join(', ')}</span>`;
    if (q.pinned) html += ` · <span class="pill pill-pin">Pin</span>`;
    if (q.flagged) html += ` · <span class="pill pill-flag">Flag</span>`;
    if (q.maintenance) html += ` · <span class="pill pill-maint">Maint</span>`;
    html += '</div>';
  }

  if (q.imageData || q.imageUrl) {
    const src = q.imageData || q.imageUrl;
    html += `<div class="img-preview"><a href="${src}" target="_blank" rel="noopener noreferrer"><img src="${src}" alt="question image"></a></div>`;
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
  renderRelated();
}

async function renderRelated() {
  const box = relatedBox;
  if (!currentQuestion) {
    box.innerHTML = 'No related questions yet.';
    return;
  }
  const all = await getAllQuestions();
  const q = currentQuestion;
  const baseChap = (q.chapter || '').toLowerCase();
  const words = (q.text || '').toLowerCase().split(/\W+/).filter(w => w.length > 4);
  const key = new Set(words);
  const rel = [];
  all.forEach(o => {
    if (!o || o.id === q.id) return;
    if (o.active === false) return;
    let score = 0;
    if ((o.chapter || '').toLowerCase() === baseChap && baseChap) score += 2;
    const ow = (o.text || '').toLowerCase().split(/\W+/);
    ow.forEach(w => { if (key.has(w)) score += 1; });
    if (score >= 3) rel.push({ q: o, score });
  });
  rel.sort((a,b) => b.score - a.score);
  const top = rel.slice(0, 8);
  if (!top.length) {
    box.innerHTML = 'No strong concept links for this question yet.';
    return;
  }
  let html = '';
  top.forEach(r => {
    html += `<div class="related-link" data-qid="${r.q.id}">
      <span>Q#${r.q.id}</span> – ${(r.q.text || '').slice(0, 60)}${r.q.text && r.q.text.length>60 ? '…' : ''}
    </div>`;
  });
  box.innerHTML = html;
  box.querySelectorAll('.related-link').forEach(el => {
    el.addEventListener('click', async () => {
      const id = parseInt(el.getAttribute('data-qid'), 10);
      const tx = db.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const req = store.get(id);
      req.onsuccess = e => {
        const qq = e.target.result;
        if (!qq) return;
        currentQuestion = qq;
        lastResult = null;
        lastSelectedIndex = null;
        feedbackPanel.innerHTML = '';
        renderQuestion();
        document.querySelector('.tab-button[data-tab="home"]').click();
      };
    });
  });
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
  const recent = allAns.slice(0, 30);

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
        ${q.pinned ? '<span class="pill pill-pin">Pin</span>' : ''}
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

  // Load question
  const qTx = db.transaction('questions', 'readonly');
  const qStore = qTx.objectStore('questions');
  const q = await new Promise(res => {
    const req = qStore.get(prevId);
    req.onsuccess = e => res(e.target.result);
    req.onerror = () => res(null);
  });
  if (!q) return;

  // Load last answer for this question (if exists)
  let lastAns = null;
  try {
    const aTx = db.transaction('answers', 'readonly');
    const aStore = aTx.objectStore('answers');
    const idx = aStore.index('by_question');
    const answers = await new Promise(res => {
      const req = idx.getAll(prevId);
      req.onsuccess = e => res(e.target.result || []);
      req.onerror = () => res([]);
    });
    if (answers && answers.length) {
      answers.sort((a, b) => {
        const aa = a.answeredAt || '';
        const bb = b.answeredAt || '';
        return aa.localeCompare(bb);
      });
      lastAns = answers[answers.length - 1];
    }
  } catch (e) {
    lastAns = null;
  }

  currentQuestion = q;
  const choices = q.choices || [];
  const correctIdx = choices.findIndex(c => c && c.isCorrect);

  if (lastAns) {
    lastSelectedIndex = typeof lastAns.selectedIndex === 'number' ? lastAns.selectedIndex : null;
    lastResult = !!lastAns.isCorrect;
  } else {
    lastSelectedIndex = null;
    lastResult = null;
  }

  renderQuestion();

  // If we have a previous answer, show feedback state as it was
  if (lastAns && lastSelectedIndex !== null && correctIdx >= 0) {
    showFeedback(correctIdx, lastSelectedIndex, q.explanation);
  } else {
    feedbackPanel.innerHTML = '';
  }
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
  // spaced repetition
  nextSpaced(q, isCorrect);
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
      let arr = data;
      if (!Array.isArray(arr) && data.questions) {
        arr = data.questions;
      }
      if (!Array.isArray(arr)) throw new Error('JSON should be array or {questions:[]}');
      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      const normalized = normalizeImportedQuestions(arr);
      normalized.forEach(q => {
        const obj = Object.assign({}, q);
        if (obj.id == null) delete obj.id;
        store.put(obj);
      });
      tx.oncomplete = () => {
        alert('Imported ' + normalized.length + ' questions.');
        refreshChapterOptions();
        loadNextQuestion(true);
      };
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsText(file);
}


function handleImportFromUrl() {
  const urlInput = document.getElementById('fileUrlInput');
  const url = (urlInput?.value || '').trim();
  if (!url) {
    alert('أدخل رابط JSON أولاً.');
    return;
  }
  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw new Error('HTTP status ' + resp.status);
      }
      return resp.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
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
            active: q.active !== false,
            tags: Array.isArray(q.tags) ? q.tags : [],
            pinned: !!q.pinned,
            imageUrl: q.imageUrl || '',
            imageData: q.imageData || '',
            srEase: q.srEase || 2.5,
            srInterval: q.srInterval || 0,
            srReps: q.srReps || 0,
            dueAt: q.dueAt || null
          };
          if (q.id != null) obj.id = q.id;
          store.put(obj);
        });
        tx.oncomplete = () => {
          alert('Imported ' + arr.length + ' questions from URL.');
          loadNextQuestion(true);
        };
      } catch (err) {
        alert('Error: ' + err.message);
      }
    })
    .catch(err => {
      alert('Error: ' + err.message);
    });
}


// Export questions only
async function exportQuestionsOnly() {
  const all = await getAllQuestions();
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
    createdAt: q.createdAt || null,
    tags: Array.isArray(q.tags) ? q.tags : [],
    pinned: !!q.pinned,
    imageUrl: q.imageUrl || '',
    imageData: q.imageData || '',
    srEase: q.srEase || 2.5,
    srInterval: q.srInterval || 0,
    srReps: q.srReps || 0,
    dueAt: q.dueAt || null
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
  const questions = await getAllQuestions();

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


function handleImportFromUrl() {
  const urlInput = document.getElementById('fileUrlInput');
  const url = (urlInput?.value || '').trim();
  if (!url) {
    alert('أدخل رابط JSON أولاً.');
    return;
  }
  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw new Error('HTTP status ' + resp.status);
      }
      return resp.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
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
            active: q.active !== false,
            tags: Array.isArray(q.tags) ? q.tags : [],
            pinned: !!q.pinned,
            imageUrl: q.imageUrl || '',
            imageData: q.imageData || '',
            srEase: q.srEase || 2.5,
            srInterval: q.srInterval || 0,
            srReps: q.srReps || 0,
            dueAt: q.dueAt || null
          };
          if (q.id != null) obj.id = q.id;
          store.put(obj);
        });
        tx.oncomplete = () => {
          alert('Imported ' + arr.length + ' questions from URL.');
          loadNextQuestion(true);
        };
      } catch (err) {
        alert('Error: ' + err.message);
      }
    })
    .catch(err => {
      alert('Error: ' + err.message);
    });
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

  const existing = await getAllQuestions();
  const byId = new Map();
  existing.forEach(q => byId.set(q.id, q));

  const qtx = db.transaction('questions', 'readwrite');
  const qs = qtx.objectStore('questions');

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
        active: local.active !== false,
        tags: Array.isArray(local.tags) ? local.tags : (Array.isArray(q.tags) ? q.tags : []),
        pinned: !!(local.pinned || q.pinned),
        imageUrl: local.imageUrl || q.imageUrl || '',
        imageData: local.imageData || q.imageData || '',
        srEase: local.srEase || q.srEase || 2.5,
        srInterval: local.srInterval || q.srInterval || 0,
        srReps: local.srReps || q.srReps || 0,
        dueAt: local.dueAt || q.dueAt || null
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
        active: q.active !== false,
        tags: Array.isArray(q.tags) ? q.tags : [],
        pinned: !!q.pinned,
        imageUrl: q.imageUrl || '',
        imageData: q.imageData || '',
        srEase: q.srEase || 2.5,
        srInterval: q.srInterval || 0,
        srReps: q.srReps || 0,
        dueAt: q.dueAt || null
      };
      qs.put(obj);
    }
  });

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
  const tx = db.transaction('meta', 'readonly');
  const store = tx.objectStore('meta');
  const req1 = store.get('lastActivityAt');
  const req2 = store.get('lastBackupAt');
  req1.onsuccess = () => {
    lastActEl.textContent = fmtTime(req1.result ? req1.result.value : null);
  };
  req2.onsuccess = () => {
    lastBackupEl.textContent = fmtTime(req2.result ? req2.result.value : null);
  };
}

// --- All Questions table + edit modal ---
const editModal = document.getElementById('editModal');
const editBackdrop = document.getElementById('editModalBackdrop');
const editTitleEl = document.getElementById('editModalTitle');
const editTextEl = document.getElementById('editText');
const editChapterEl = document.getElementById('editChapter');
const editSourceEl = document.getElementById('editSource');
const editTagsEl = document.getElementById('editTags');
const editExplanationEl = document.getElementById('editExplanation');
const editImageUrlEl = document.getElementById('editImageUrl');
const editImageFileEl = document.getElementById('editImageFile');
const editImagePreviewEl = document.getElementById('editImagePreview');
const editChoicesEl = document.getElementById('editChoices');
const editFlaggedEl = document.getElementById('editFlagged');
const editMaintEl = document.getElementById('editMaint');
const editPinnedEl = document.getElementById('editPinned');
const editActiveEl = document.getElementById('editActive');
const btnEditSave = document.getElementById('btnEditSave');
const btnEditCancel = document.getElementById('btnEditCancel');
const btnAddChoice = document.getElementById('btnAddChoice');

let editingQuestionId = null;

function openEditModal(q) {
  editingQuestionId = q ? q.id : null;
  editTitleEl.textContent = q ? `Edit question #${q.id}` : 'Add question';
  editTextEl.value = q?.text || '';
  editChapterEl.value = q?.chapter || '';
  editSourceEl.value = q?.source || '';
  editTagsEl.value = (q?.tags || []).join(', ');
  editExplanationEl.value = q?.explanation || '';
  editImageUrlEl.value = q?.imageUrl || '';
  editImageFileEl.value = '';
  editImagePreviewEl.innerHTML = '';
  if (q && (q.imageData || q.imageUrl)) {
    const src = q.imageData || q.imageUrl;
    editImagePreviewEl.innerHTML = `<img src="${src}" alt="preview">`;
  }
  editFlaggedEl.checked = !!q?.flagged;
  editMaintEl.checked = !!q?.maintenance;
  editPinnedEl.checked = !!q?.pinned;
  editActiveEl.checked = q ? q.active !== false : true;

  editChoicesEl.innerHTML = '';
  const choices = q?.choices && q.choices.length ? q.choices : [{ text:'', isCorrect:true }];
  choices.forEach((c, idx) => addChoiceRow(c.text || '', !!c.isCorrect));

  editModal.classList.remove('hidden');
}

function closeEditModal() {
  editModal.classList.add('hidden');
  editingQuestionId = null;
}

function addChoiceRow(text, isCorrect) {
  const row = document.createElement('div');
  row.className = 'edit-choice-row';
  row.innerHTML = `
    <input type="text" class="choice-text" placeholder="Choice text" value="${text || ''}">
    <label style="font-size:0.75rem;">
      <input type="radio" name="editCorrect" class="choice-correct" ${isCorrect ? 'checked' : ''}>
      Correct
    </label>
    <button class="pill-btn btn-remove-choice">✕</button>
  `;
  row.querySelector('.btn-remove-choice').addEventListener('click', () => {
    if (editChoicesEl.children.length <= 1) return;
    row.remove();
  });
  row.querySelector('.choice-correct').addEventListener('change', () => {
    if (row.querySelector('.choice-correct').checked) {
      editChoicesEl.querySelectorAll('.choice-correct').forEach(r => {
        if (r !== row.querySelector('.choice-correct')) r.checked = false;
      });
    }
  });
  editChoicesEl.appendChild(row);
}

btnAddChoice.addEventListener('click', () => {
  addChoiceRow('', false);
});

editImageFileEl.addEventListener('change', () => {
  const file = editImageFileEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    editImagePreviewEl.innerHTML = `<img src="${dataUrl}" alt="preview">`;
    editImageUrlEl.value = ''; // prefer local data
    editImagePreviewEl.dataset.imageData = dataUrl;
  };
  reader.readAsDataURL(file);
});

editBackdrop.addEventListener('click', closeEditModal);
btnEditCancel.addEventListener('click', closeEditModal);

btnEditSave.addEventListener('click', async () => {
  const text = editTextEl.value.trim();
  if (!text) {
    alert('Question text required.');
    return;
  }
  const chapter = editChapterEl.value.trim();
  const source = editSourceEl.value.trim();
  const tags = editTagsEl.value.split(',').map(t => t.trim()).filter(Boolean);
  const explanation = editExplanationEl.value.trim();
  const imageUrl = editImageUrlEl.value.trim();
  const imageData = editImagePreviewEl.dataset.imageData || '';

  const choiceRows = Array.from(editChoicesEl.querySelectorAll('.edit-choice-row'));
  if (!choiceRows.length) {
    alert('At least one choice is required.');
    return;
  }
  const choices = choiceRows.map(row => {
    const txt = row.querySelector('.choice-text').value.trim();
    const isCorrect = row.querySelector('.choice-correct').checked;
    return { text: txt, isCorrect };
  }).filter(c => c.text);
  if (!choices.length) {
    alert('Enter at least one non‑empty choice.');
    return;
  }
  if (!choices.some(c => c.isCorrect)) choices[0].isCorrect = true;

  const flagged = editFlaggedEl.checked;
  const maintenance = editMaintEl.checked;
  const pinned = editPinnedEl.checked;
  const active = editActiveEl.checked;

  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');

  if (editingQuestionId != null) {
    const req = store.get(editingQuestionId);
    req.onsuccess = e => {
      const old = e.target.result || {};
      const q = Object.assign({}, old, {
        text, chapter, source, explanation,
        tags, choices,
        flagged, maintenance, pinned,
        active,
        imageUrl,
        imageData: imageData || old.imageData || ''
      });
      store.put(q);
    };
  } else {
    const q = {
      text, chapter, source, explanation,
      tags, choices,
      flagged, maintenance, pinned,
      active,
      createdAt: new Date().toISOString(),
      timesSeen: 0, timesCorrect: 0, timesWrong: 0,
      lastSeenAt: null,
      imageUrl,
      imageData,
      srEase: 2.5,
      srInterval: 0,
      srReps: 0,
      dueAt: null
    };
    store.add(q);
  }

  tx.oncomplete = () => {
    closeEditModal();
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
});


async function reloadAllQuestionsTable() {
  const searchVal = document.getElementById('allSearch').value.toLowerCase().trim();
  const filter = document.getElementById('allFilter').value;
  const sortVal = document.getElementById('allSort').value;
  const tbody = document.getElementById('allTableBody');
  const rangeFrom = parseInt(document.getElementById('rangeFrom').value || '0', 10);
  const rangeTo = parseInt(document.getElementById('rangeTo').value || '0', 10);
  const lastNEl = document.getElementById('allLastN');
  const lastN = lastNEl ? parseInt(lastNEl.value || '0', 10) : 0;
  tbody.innerHTML = '';
  allRangeAnchorIndex = null;

  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));

  // duplicate clusters
  const dupMap = new Map();
  all.forEach(q => {
    const norm = normalizeTextForDup(q.text || '');
    if (!norm) return;
    if (!dupMap.has(norm)) dupMap.set(norm, []);
    dupMap.get(norm).push(q.id);
  });
  const dupSet = new Set();
  dupMap.forEach(ids => {
    if (ids.length > 1) ids.forEach(id => dupSet.add(id));
  });

  let arr = all;

  // search
  if (searchVal) {
    arr = arr.filter(q => {
      const s = (q.text || '') + ' ' + (q.chapter || '') + ' ' + (q.source || '') + ' ' + (Array.isArray(q.tags) ? q.tags.join(' ') : '');
      return s.toLowerCase().includes(searchVal);
    });
  }

  // ID range
  if (rangeFrom && rangeTo && rangeTo >= rangeFrom) {
    arr = arr.filter(q => q.id >= rangeFrom && q.id <= rangeTo);
  } else if (rangeFrom && !rangeTo) {
    arr = arr.filter(q => q.id >= rangeFrom);
  } else if (!rangeFrom && rangeTo) {
    arr = arr.filter(q => q.id <= rangeTo);
  }

  // chapter filter via dropdown (exact chapter match)
  const chapSelect = document.getElementById('allChapterSelect');
  const chapVal = chapSelect ? chapSelect.value.trim() : '';
  if (chapVal) {
    arr = arr.filter(q => (q.chapter || '').trim() === chapVal);
  }

  // filter modes
  if (filter === 'flagged') {
    arr = arr.filter(q => q.flagged);
  } else if (filter === 'wrong') {
    arr = arr.filter(q => (q.timesWrong || 0) > 0);
  } else if (filter === 'maintenance') {
    arr = arr.filter(q => q.maintenance === true);
  } else if (filter === 'inactive') {
    arr = arr.filter(q => q.active === false);
  } else if (filter === 'weak') {
    arr = arr.filter(q => weakSet.has(q.id));
  } else if (filter === 'duplicate') {
    arr = arr.filter(q => dupSet.has(q.id));
  } else if (filter === 'pinned') {
    arr = arr.filter(q => q.pinned);
  }

  // sorting
  if (sortVal === 'created_desc') {
    arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } else if (sortVal === 'created_asc') {
    arr.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  } else if (sortVal === 'chapter') {
    arr.sort((a, b) => (a.chapter || '').localeCompare(b.chapter || ''));
  } else if (sortVal === 'wrong_desc') {
    arr.sort((a, b) => (b.timesWrong || 0) - (a.timesWrong || 0));
  } else if (sortVal === 'due_asc') {
    arr.sort((a, b) => (a.dueAt || '').localeCompare(b.dueAt || ''));
  } else if (sortVal === 'text_asc') {
    arr.sort((a, b) => (a.text || '').localeCompare(b.text || ''));
  }

  // last N
  if (lastN && lastN > 0) {
    arr = arr.slice(0, lastN);
  }

  const total = arr.length;
  allTotalPages = Math.max(1, Math.ceil(total / ALL_PAGE_SIZE));
  if (allCurrentPage < 1) allCurrentPage = 1;
  if (allCurrentPage > allTotalPages) allCurrentPage = allTotalPages;

  const startIdx = (allCurrentPage - 1) * ALL_PAGE_SIZE;
  const endIdx = Math.min(startIdx + ALL_PAGE_SIZE, total);
  const pageItems = arr.slice(startIdx, endIdx);

  const pageInfoEl = document.getElementById('allPageInfo');
  if (pageInfoEl) {
    pageInfoEl.textContent = `Page ${allCurrentPage} / ${allTotalPages} (total ${total})`;
  }

  const nowIso = new Date().toISOString();

  const boxesMeta = [];

  pageItems.forEach((q, indexOnPage) => {
    const tr = document.createElement('tr');
    const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : '';
    const metaBits = [];
    if (q.flagged) metaBits.push('<span class="pill pill-flag">Flag</span>');
    if (q.maintenance) metaBits.push('<span class="pill pill-maint">Maint</span>');
    if (weakSet.has(q.id)) metaBits.push('<span class="pill pill-weak">Weak</span>');
    if (dupSet.has(q.id)) metaBits.push('<span class="pill pill-dup">Dup</span>');
    if (q.pinned) metaBits.push('<span class="pill pill-pin">Pin</span>');
    if (q.dueAt && q.dueAt <= nowIso) metaBits.push('<span class="pill pill-due">Due</span>');

    const dueLabel = q.dueAt ? fmtTime(q.dueAt) : '–';
    tr.innerHTML = `
      <td><input type="checkbox" class="row-select" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>${(q.text || '').slice(0, 120)}${q.text && q.text.length > 120 ? '…' : ''}</td>
      <td>${q.chapter || ''}</td>
      <td>${tagsStr}</td>
      <td>${metaBits.join(' ')}</td>
      <td>${q.timesSeen || 0}</td>
      <td>${q.timesWrong || 0}</td>
      <td>${dueLabel}</td>
      <td><button class="pill-btn btn-edit" data-id="${q.id}">Edit</button></td>
    `;
    const cb = tr.querySelector('.row-select');
    if (cb) {
      const id = q.id;
      if (allSelectedIds.has(id)) {
        cb.checked = true;
      }
      cb.addEventListener('change', () => {
        const rangeModeEl = document.getElementById('allRangeMode');
        const rangeMode = !!(rangeModeEl && rangeModeEl.checked);
        const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
        const thisIndex = boxes.indexOf(cb);

        if (!rangeMode || thisIndex === -1) {
          if (cb.checked) {
            allSelectedIds.add(id);
          } else {
            allSelectedIds.delete(id);
          }
          allRangeAnchorIndex = thisIndex;
          updateAllSelectedCount();
          return;
        }

        // range mode
        if (allRangeAnchorIndex == null || allRangeAnchorIndex === thisIndex) {
          // first anchor click behaves like normal
          if (cb.checked) {
            allSelectedIds.add(id);
          } else {
            allSelectedIds.delete(id);
          }
          allRangeAnchorIndex = thisIndex;
          updateAllSelectedCount();
          return;
        }

        const start = Math.min(allRangeAnchorIndex, thisIndex);
        const end = Math.max(allRangeAnchorIndex, thisIndex);

        let allAlreadySelected = true;
        for (let i = start; i <= end; i++) {
          const rowCb = boxes[i];
          if (!rowCb) continue;
          const rid = parseInt(rowCb.getAttribute('data-id'), 10);
          if (!allSelectedIds.has(rid)) {
            allAlreadySelected = false;
            break;
          }
        }

        if (allAlreadySelected) {
          // unselect whole range
          for (let i = start; i <= end; i++) {
            const rowCb = boxes[i];
            if (!rowCb) continue;
            const rid = parseInt(rowCb.getAttribute('data-id'), 10);
            rowCb.checked = false;
            allSelectedIds.delete(rid);
          }
        } else {
          // select whole range
          for (let i = start; i <= end; i++) {
            const rowCb = boxes[i];
            if (!rowCb) continue;
            const rid = parseInt(rowCb.getAttribute('data-id'), 10);
            rowCb.checked = true;
            allSelectedIds.add(rid);
          }
        }
        allRangeAnchorIndex = thisIndex;
        updateAllSelectedCount();
      });
    }

    tr.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || e.target.classList.contains('btn-edit')) return;
      const anySelected = !!document.querySelector('#allTableBody input[type="checkbox"].row-select:checked');
      if (anySelected) return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]').click();
    });
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const tx = db.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const req = store.get(id);
      req.onsuccess = ev => {
        const q = ev.target.result;
        if (!q) return;
        delete editImagePreviewEl.dataset.imageData;
        openEditModal(q);
      };
    });
  });

  updateAllSelectedCount();
}



function updateAllSelectedCount() {
  const el = document.getElementById('allSelectedCount');
  if (el) el.textContent = allSelectedIds.size.toString();
  const allSelectAll = document.getElementById('allSelectAll');
  const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
  if (allSelectAll && boxes.length) {
    const allOnThisPageSelected = boxes.every(cb => allSelectedIds.has(parseInt(cb.getAttribute('data-id'), 10)));
    allSelectAll.checked = allOnThisPageSelected && boxes.length > 0;
  }
}

async function bulkSetChapterForSelected() {
  if (!allSelectedIds.size) return;
  const newChap = prompt('New chapter name for selected questions:');
  if (!newChap) return;
  const ids = Array.from(allSelectedIds);
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => {
    const req = store.get(id);
    req.onsuccess = () => {
      const q = req.result;
      if (!q) return;
      q.chapter = newChap;
      store.put(q);
    };
  });
  tx.oncomplete = () => {
    reloadAllQuestionsTable();
  };
}

async function bulkAddTagForSelected() {
  if (!allSelectedIds.size) return;
  const tag = prompt('Tag to add to selected questions:');
  if (!tag) return;
  const trimmed = tag.trim();
  if (!trimmed) return;
  const ids = Array.from(allSelectedIds);
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => {
    const req = store.get(id);
    req.onsuccess = () => {
      const q = req.result;
      if (!q) return;
      if (!Array.isArray(q.tags)) q.tags = [];
      if (!q.tags.includes(trimmed)) {
        q.tags.push(trimmed);
        store.put(q);
      }
    };
  });
  tx.oncomplete = () => {
    reloadAllQuestionsTable();
  };
}

async function deleteSelectedAll() {
  const count = allSelectedIds.size;
  if (!count) return;
  if (!confirm('Delete ' + count + ' question(s)?')) return;
  const ids = Array.from(allSelectedIds);
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  ids.forEach(id => store.delete(id));
  tx.oncomplete = () => {
    allSelectedIds = new Set();
    allRangeAnchorIndex = null;
    updateAllSelectedCount();
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

async function deleteDuplicateClusters() {
  const all = await getAllQuestions();
  const dupMap = new Map();
  all.forEach(q => {
    const norm = normalizeTextForDup(q.text || '');
    if (!norm) return;
    if (!dupMap.has(norm)) dupMap.set(norm, []);
    dupMap.get(norm).push(q);
  });
  const toDelete = [];
  dupMap.forEach(list => {
    if (list.length <= 1) return;
    list.sort((a,b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
    const keep = list[0];
    list.slice(1).forEach(q => toDelete.push(q.id));
  });
  if (!toDelete.length) {
    alert('No duplicate clusters found.');
    return;
  }
  if (!confirm('Delete ' + toDelete.length + ' duplicate question(s) (keeping one from each cluster)?')) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  toDelete.forEach(id => store.delete(id));
  tx.oncomplete = () => {
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

// --- Dashboard ---
async function renderDashboard() {
  const all = await getAllQuestions();
  const weak = computeWeakQuestions(all);
  const dashOverall = document.getElementById('dashOverall');
  const dashWeakChapters = document.getElementById('dashWeakChapters');
  const dashWeekly = document.getElementById('dashWeekly');

  const total = all.length;
  const answered = all.filter(q => q.timesSeen > 0).length;
  const wrong = all.reduce((s, q) => s + (q.timesWrong || 0), 0);
  const correct = all.reduce((s, q) => s + (q.timesCorrect || 0), 0);
  const wrongRate = (wrong + correct) ? (wrong / (wrong + correct) * 100) : 0;

  dashOverall.innerHTML = `
    <div class="dash-title">Overall</div>
    <div>Total questions: <strong>${total}</strong></div>
    <div>Answered at least once: <strong>${answered}</strong></div>
    <div>Weak questions: <strong>${weak.length}</strong></div>
    <div>Total correct: <strong>${correct}</strong></div>
    <div>Total wrong: <strong>${wrong}</strong> (${wrongRate.toFixed(1)}%)</div>
  `;

  const chapMap = new Map();
  weak.forEach(q => {
    const key = q.chapter || 'No chapter';
    if (!chapMap.has(key)) chapMap.set(key, []);
    chapMap.get(key).push(q);
  });
  let chapHtml = '<div class="dash-title">Weak chapters</div>';
  if (!chapMap.size) {
    chapHtml += '<div class="tiny muted">No clear weak chapters yet.</div>';
  } else {
    chapMap.forEach((list, chap) => {
      chapHtml += `<div><strong>${chap}</strong> – ${list.length} weak questions</div>`;
    });
  }
  dashWeakChapters.innerHTML = chapHtml;

  dashWeekly.innerHTML = '<div class="dash-title">Weekly activity</div><div class="tiny muted">Uses answers timestamps (simple text summary).</div>';
}

// --- Flashcards ---
async function buildFlashcardPool() {
  const src = fcSourceEl.value;
  const chap = fcChapterFilterEl.value.trim().toLowerCase();
  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));
  const nowIso = new Date().toISOString();
  let pool = all.filter(q => q.active !== false);
  if (src === 'due') {
    pool = pool.filter(q => isDue(q, nowIso));
  } else if (src === 'weak') {
    pool = pool.filter(q => weakSet.has(q.id));
  } else if (src === 'flagged') {
    pool = pool.filter(q => q.flagged);
  } else if (src === 'chapter' && chap) {
    pool = pool.filter(q => (q.chapter || '').toLowerCase() === chap);
  }
  flashcardPool = shuffle(pool);
  flashcardIndex = -1;
  nextFlashcard();
}

function currentFlashcard() {
  if (flashcardIndex < 0 || flashcardIndex >= flashcardPool.length) return null;
  return flashcardPool[flashcardIndex];
}

function renderFlashcard() {
  const q = currentFlashcard();
  if (!q) {
    fcFront.textContent = 'No cards in this pool.';
    fcBack.style.display = 'none';
    fcBack.textContent = '';
    return;
  }
  const mode = fcModeEl.value;
  const letters = ['A','B','C','D','E','F','G'];
  const correctIdx = (q.choices || []).findIndex(c => c.isCorrect);
  const correctChoice = correctIdx >= 0 ? q.choices[correctIdx] : null;

  if (mode === 'q-first') {
    fcFront.innerHTML = `Q#${q.id ?? ''} – ${q.text || ''}`;
    if (q.imageData || q.imageUrl) {
      const src = q.imageData || q.imageUrl;
      fcFront.innerHTML += `<div class="img-preview"><img src="${src}" alt="img"></div>`;
    }
    if (!flashcardShowBack) {
      fcBack.style.display = 'none';
      fcBack.innerHTML = '';
    } else {
      let back = '';
      if (correctChoice) {
        back += `<div><strong>Answer:</strong> ${letters[correctIdx]}. ${correctChoice.text || ''}</div>`;
      }
      if (q.explanation) {
        back += `<div style="margin-top:0.25rem;"><strong>Explanation:</strong> ${q.explanation}</div>`;
      }
      fcBack.innerHTML = back || 'No answer text.';
      fcBack.style.display = 'block';
    }
  } else {
    fcFront.innerHTML = '';
    if (correctChoice) {
      fcFront.innerHTML = `<div><strong>Key idea:</strong> ${correctChoice.text || ''}</div>`;
    } else {
      fcFront.innerHTML = `<div><strong>Key idea:</strong> ${q.explanation || 'No answer text.'}</div>`;
    }
    if (!flashcardShowBack) {
      fcBack.style.display = 'none';
      fcBack.innerHTML = '';
    } else {
      let back = `Q#${q.id ?? ''} – ${q.text || ''}`;
      if (q.imageData || q.imageUrl) {
        const src = q.imageData || q.imageUrl;
        back += `<div class="img-preview"><img src="${src}" alt="img"></div>`;
      }
      fcBack.innerHTML = back;
      fcBack.style.display = 'block';
    }
  }
}

function nextFlashcard() {
  if (!flashcardPool.length) {
    flashcardIndex = -1;
    flashcardShowBack = false;
    renderFlashcard();
    return;
  }
  flashcardIndex = (flashcardIndex + 1) % flashcardPool.length;
  flashcardShowBack = false;
  renderFlashcard();
}

async function updateSpacedAfterFlashcard(good) {
  const q = currentFlashcard();
  if (!q) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  const req = store.get(q.id);
  req.onsuccess = e => {
    const cur = e.target.result;
    if (!cur) return;
    nextSpaced(cur, good);
    store.put(cur);
  };
}

// --- Daily challenge ---
async function startDailyChallenge() {
  const today = new Date().toISOString().slice(0,10);
  const key = 'daily_' + today;
  let ids = [];
  try {
    const raw = localStorage.getItem('mcq_daily_ids_' + today);
    if (raw) {
      ids = JSON.parse(raw);
    }
  } catch {}

  const all = await getAllQuestions();
  if (!ids.length) {
    const weak = computeWeakQuestions(all);
    const flagged = all.filter(q => q.flagged);
    const highWrong = all.filter(q => (q.timesWrong || 0) >= 2);
    const mix = shuffle([...weak, ...flagged, ...highWrong, ...all]);
    const picked = [];
    const seen = new Set();
    for (const q of mix) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        picked.push(q.id);
      }
      if (picked.length >= 10) break;
    }
    ids = picked;
    try { localStorage.setItem('mcq_daily_ids_' + today, JSON.stringify(ids)); } catch {}
  }

  if (!ids.length) {
    alert('No questions available for daily challenge.');
    return;
  }

  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const firstReq = store.get(ids[0]);
  firstReq.onsuccess = e => {
    const q = e.target.result;
    if (!q) return;
    historyStack = [];
    currentQuestion = q;
    lastResult = null;
    lastSelectedIndex = null;
    feedbackPanel.innerHTML = '';
    renderQuestion();
    updateStatsBar();
    updateHistoryList();
  };
}

// --- Exam simulation ---
async function startExam() {
  const poolType = document.getElementById('examPool').value;
  const chap = document.getElementById('examChapterFilter').value.trim().toLowerCase();
  const count = parseInt(document.getElementById('examCount').value || '30', 10);
  const minutes = parseInt(document.getElementById('examMinutes').value || '60', 10);

  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));
  let pool = all.filter(q => q.active !== false);
  if (poolType === 'weak') {
    pool = pool.filter(q => weakSet.has(q.id));
  } else if (poolType === 'flagged') {
    pool = pool.filter(q => q.flagged);
  } else if (poolType === 'chapter' && chap) {
    pool = pool.filter(q => (q.chapter || '').toLowerCase() === chap);
  }
  pool = shuffle(pool);
  if (!pool.length) {
    alert('No questions available for this pool.');
    return;
  }
  const selected = pool.slice(0, Math.min(count, pool.length));
  examSession = {
    ids: selected.map(q => q.id),
    answers: {},
    index: 0,
    startTime: Date.now(),
    limitMs: minutes * 60 * 1000
  };
  document.getElementById('examTotalLabel').textContent = selected.length;
  document.getElementById('examActiveCard').style.display = 'block';
  document.getElementById('examResultCard').style.display = 'none';
  renderExamQuestion();
  startExamTimer();
}

async function renderExamQuestion() {
  if (!examSession) return;
  const idx = examSession.index;
  const total = examSession.ids.length;
  if (idx < 0 || idx >= total) return;
  document.getElementById('examIndexLabel').textContent = (idx + 1);
  const qid = examSession.ids[idx];
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const req = store.get(qid);
  req.onsuccess = e => {
    const q = e.target.result;
    const panel = document.getElementById('examQuestionPanel');
    if (!q) {
      panel.innerHTML = '<div class="muted">Question not found.</div>';
      return;
    }
    const letters = ['A','B','C','D','E','F','G'];
    let html = `<div class="q-text">Q#${q.id ?? ''} – ${q.text || ''}</div>`;
    if (q.chapter || q.source) {
      html += '<div class="tag-chapter">';
      if (q.chapter) html += `<span>${q.chapter}</span>`;
      if (q.source) html += ` · <span>${q.source}</span>`;
      html += '</div>';
    }
    if (q.imageData || q.imageUrl) {
      const src = q.imageData || q.imageUrl;
      html += `<div class="img-preview"><img src="${src}" alt="img"></div>`;
    }
    html += '<div style="margin-top:0.4rem;">';
    (q.choices || []).forEach((c, i) => {
      const letter = letters[i] || '?';
      const saved = examSession.answers[qid];
      const checked = saved === i ? 'checked' : '';
      html += `<label class="choice">
        <input type="radio" name="examChoice" value="${i}" ${checked}>
        <strong>${letter}.</strong> ${c.text || ''}
      </label>`;
    });
    html += '</div>';
    panel.innerHTML = html;
  };
}

function examMove(delta) {
  if (!examSession) return;
  const panel = document.getElementById('examQuestionPanel');
  const radios = panel.querySelectorAll('input[name="examChoice"]');
  let selected = null;
  radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); });
  const currentQid = examSession.ids[examSession.index];
  if (selected !== null) {
    examSession.answers[currentQid] = selected;
  }
  const nextIndex = examSession.index + delta;
  if (nextIndex < 0 || nextIndex >= examSession.ids.length) return;
  examSession.index = nextIndex;
  renderExamQuestion();
}

async function finishExam() {
  if (!examSession) return;
  clearInterval(examTimerId);
  examTimerId = null;

  // Save last question selection
  const panel = document.getElementById('examQuestionPanel');
  const radios = panel.querySelectorAll('input[name="examChoice"]');
  let selected = null;
  radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); });
  const currentQid = examSession.ids[examSession.index];
  if (selected !== null) {
    examSession.answers[currentQid] = selected;
  }

  const all = await getAllQuestions();
  const byId = new Map();
  all.forEach(q => byId.set(q.id, q));

  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  const perChapter = new Map();

  examSession.ids.forEach(id => {
    const q = byId.get(id);
    if (!q) return;
    const ans = examSession.answers[id];
    const correctIdx = (q.choices || []).findIndex(c => c.isCorrect);
    if (ans == null) {
      unanswered++;
      return;
    }
    const chap = q.chapter || 'No chapter';
    if (!perChapter.has(chap)) perChapter.set(chap, { correct:0, wrong:0 });
    if (ans === correctIdx) {
      correct++;
      perChapter.get(chap).correct++;
    } else {
      wrong++;
      perChapter.get(chap).wrong++;
    }
  });

  const total = examSession.ids.length;
  const score = total ? (correct / total * 100) : 0;
  const durationMs = Date.now() - examSession.startTime;
  const minutesUsed = durationMs / 60000;

  const summaryEl = document.getElementById('examSummary');
  summaryEl.innerHTML = `
    <div>Total questions: <strong>${total}</strong></div>
    <div>Correct: <strong>${correct}</strong></div>
    <div>Wrong: <strong>${wrong}</strong></div>
    <div>Unanswered: <strong>${unanswered}</strong></div>
    <div>Score: <strong>${score.toFixed(1)}%</strong></div>
    <div>Time used: <strong>${minutesUsed.toFixed(1)} min</strong></div>
  `;

  let detailHtml = '<div>Per chapter:</div>';
  perChapter.forEach((v, chap) => {
    const t = v.correct + v.wrong;
    const s = t ? (v.correct / t * 100) : 0;
    detailHtml += `<div>${chap}: ${v.correct}/${t} correct (${s.toFixed(1)}%)</div>`;
  });
  document.getElementById('examDetails').innerHTML = detailHtml;

  document.getElementById('examActiveCard').style.display = 'none';
  document.getElementById('examResultCard').style.display = 'block';
  examSession = null;
}

function startExamTimer() {
  if (!examSession) return;
  if (examTimerId) clearInterval(examTimerId);
  const label = document.getElementById('examTimerLabel');
  const endTime = examSession.startTime + examSession.limitMs;
  function tick() {
    const now = Date.now();
    const remain = Math.max(0, endTime - now);
    const m = Math.floor(remain / 60000);
    const s = Math.floor((remain % 60000) / 1000);
    label.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (remain <= 0) {
      clearInterval(examTimerId);
      examTimerId = null;
      alert('Time is over – finishing exam.');
      finishExam();
    }
  }
  tick();
  examTimerId = setInterval(tick, 1000);
}

// Initial DB open
openDB().then(() => {
  loadTheme();
  refreshBackupLabels();
  refreshCloudInfo();
  loadGitHubConfigIntoUI();
  refreshChapterOptions();
  loadNextQuestion(true);
  buildFlashcardPool();
}).catch(err => {
  console.error(err);
  alert('Failed to open local database.');
});
