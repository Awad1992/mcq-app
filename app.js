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

// Practice session engine
let practiceSession = null; 
// {id, createdAt, mode, filters, questionIds, seqMap, index, answeredMap, correctCount}
const PRACTICE_SESSIONS_KEY = 'practiceSessions';

// Practice preferences
let prefSkipSolved = true;

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

// Cache for chapter dropdowns
let cachedChapters = [];

// --- DOM refs (defensive) ---
const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterFilterEl = document.getElementById('chapterFilter');
const prefSkipSolvedEl = document.getElementById('prefSkipSolved');
const relatedBox = document.getElementById('relatedBox');
const themeSelect = document.getElementById('themeSelect');

// Reset button
const resetBtn = document.getElementById('btnResetProgress');
if (resetBtn) {
  resetBtn.addEventListener('click', async () => {
    const scopeEl = document.getElementById('resetScope');
    const scope = scopeEl ? scopeEl.value : 'all';
    await resetProgress(scope);
  });
}

// --- Meta helpers ---
function saveMeta(key, value) {
  if (!db) return;
  const tx = db.transaction('meta', 'readwrite');
  const store = tx.objectStore('meta');
  store.put({ key, value });
}

async function loadMeta(key) {
  if (!db) return null;
  const tx = db.transaction('meta', 'readonly');
  const store = tx.objectStore('meta');
  return await new Promise(res => {
    const req = store.get(key);
    req.onsuccess = () => res(req.result ? req.result.value : null);
    req.onerror = () => res(null);
  });
}

async function loadPracticeSessions() {
  const arr = await loadMeta(PRACTICE_SESSIONS_KEY);
  return Array.isArray(arr) ? arr : [];
}
async function savePracticeSessions(arr) {
  await saveMeta(PRACTICE_SESSIONS_KEY, arr || []);
}

function makeSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,7);
}

// Load practice prefs
async function loadPracticePrefs() {
  try {
    const val = await loadMeta('prefSkipSolved');
    if (typeof val === 'boolean') prefSkipSolved = val;
    if (prefSkipSolvedEl) prefSkipSolvedEl.checked = !!prefSkipSolved;
  } catch (e) {
    console.warn('loadPracticePrefs failed', e);
  }
}
function setPrefSkipSolved(val) {
  prefSkipSolved = !!val;
  saveMeta('prefSkipSolved', prefSkipSolved);
}
if (prefSkipSolvedEl) {
  prefSkipSolvedEl.addEventListener('change', () => {
    setPrefSkipSolved(!!prefSkipSolvedEl.checked);
  });
}

// --- Tabs ---
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    btn.classList.add('active');
    const sec = document.getElementById('tab-' + tab);
    if (sec) sec.classList.add('active');

    if (tab === 'all') reloadAllQuestionsTable();
    else if (tab === 'backup') { refreshBackupLabels(); refreshCloudInfo(); }
    else if (tab === 'settings') loadGitHubConfigIntoUI();
    else if (tab === 'dashboard') renderDashboard();
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
  const corePrompt =
    `You are an expert ICU / Internal Medicine board-exam question generator. ` +
    `Use ONLY the following source text (any language) to create ${num} difficult, board-level MCQs in advanced academic English. ` +
    `Follow strictly this JSON schema: an array of objects with fields id (int), text, chapter, source, explanation, choices[{text,isCorrect}], tags, optional difficulty and images. ` +
    `Questions, choices, explanations, tags, chapter, and source MUST ALL be in ENGLISH. ` +
    `Do NOT add any keys outside this schema. Output ONLY a JSON array, nothing else.`;
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

    let html = '<table class="q-table tiny"><thead><tr>' +
      '<th><input type="checkbox" id="builderSelectAll"></th>' +
      '<th>ID</th><th>Text</th><th>Chapter</th><th>Tags</th></tr></thead><tbody>';

    data.forEach((q, idx) => {
      const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : '';
      const txtFull = (q.text || '');
      const txt = txtFull.slice(0, 120) + (txtFull.length > 120 ? '…' : '');
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

document.getElementById('btnBuilderMakePrompt')?.addEventListener('click', makeBuilderPrompt);
document.getElementById('btnBuilderPreview')?.addEventListener('click', builderPreviewFromJson);
document.getElementById('btnBuilderImportSelected')?.addEventListener('click', builderImportSelected);

// --- Theme handling ---
function loadTheme() {
  try {
    currentTheme = localStorage.getItem('mcq_theme') || 'light';
  } catch {
    currentTheme = 'light';
  }
  applyTheme();
}
function applyTheme() {
  document.body.classList.remove('theme-light','theme-dark','theme-night','theme-calm');
  if (currentTheme === 'dark') document.body.classList.add('theme-dark');
  else if (currentTheme === 'night') document.body.classList.add('theme-night');
  else if (currentTheme === 'calm') document.body.classList.add('theme-calm');
  if (themeSelect) themeSelect.value = currentTheme;
}
if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    currentTheme = themeSelect.value || 'light';
    applyTheme();
    try { localStorage.setItem('mcq_theme', currentTheme); } catch {}
  });
}

// --- Helpers ---
function randomChoice(arr) {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
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

// --- IndexedDB setup ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const udb = e.target.result;

      if (!udb.objectStoreNames.contains('questions')) {
        const store = udb.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by_chapter', 'chapter', { unique: false });
      }
      if (!udb.objectStoreNames.contains('answers')) {
        const ans = udb.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        ans.createIndex('by_question', 'questionId', { unique: false });
        ans.createIndex('by_time', 'answeredAt', { unique: false });
      }
      if (!udb.objectStoreNames.contains('meta')) {
        udb.createObjectStore('meta', { keyPath: 'key' });
      }
    };

    req.onsuccess = (e) => {
      db = e.target.result;
      hydrateLastActivity().finally(() => resolve(db));
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

async function hydrateLastActivity() {
  lastActivityAt = await loadMeta('lastActivityAt');
  refreshBackupLabels();
}

// --- Data access ---
async function getAllQuestions() {
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  return await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
    req.onerror = () => res([]);
  });
}

async function getQuestionById(id) {
  const qTx = db.transaction('questions', 'readonly');
  const qStore = qTx.objectStore('questions');
  return await new Promise(res => {
    const req = qStore.get(id);
    req.onsuccess = e => res(e.target.result || null);
    req.onerror = () => res(null);
  });
}

// --- Chapter options ---
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
      cachedChapters = Array.from(set).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      );

      const practiceSel = document.getElementById('chapterSelect');
      const allSel = document.getElementById('allChapterSelect');

      const fillSelect = (sel) => {
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
      };

      fillSelect(practiceSel);
      fillSelect(allSel);
    };
  } catch (e) {
    console.error('refreshChapterOptions failed', e);
  }
}

// --- Stats ---
function isDue(q, nowIso) {
  if (!q) return false;
  if (q.active === false) return false;
  if (!q.dueAt) return true;
  try { return q.dueAt <= nowIso; } catch { return true; }
}

function computeWeakQuestions(all) {
  return all.filter(q => {
    const seen = q.timesSeen || 0;
    const wrong = q.timesWrong || 0;
    if (seen < 3) return false;
    return (wrong / seen) >= 0.4;
  });
}

async function getStats() {
  const all = await getAllQuestions();
  const nowIso = new Date().toISOString();
  return {
    total: all.length,
    flagged: all.filter(q => q.flagged).length,
    answered: all.filter(q => q.timesSeen > 0).length,
    withWrong: all.filter(q => q.timesWrong > 0).length,
    maintenance: all.filter(q => q.maintenance).length,
    weak: computeWeakQuestions(all).length,
    due: all.filter(q => isDue(q, nowIso)).length
  };
}

async function updateStatsBar() {
  const el = document.getElementById('statsBar');
  if (!el) return;
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

// --- Spaced repetition ---
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

// --- Duplicate normalize ---
function normalizeTextForDup(t) {
  if (!t) return '';
  return t.toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9أ-يآؤئإ\s]/g, '')
    .trim();
}

// --- Pick question (legacy fallback uses this) ---
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
    filtered = filtered.filter(q => (q.timesWrong || 0) > 0);
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

  if (prefSkipSolved && currentMode !== 'new') {
    const unsolved = filtered.filter(q => !q.timesSeen);
    if (unsolved.length) filtered = unsolved;
  }

  if (!filtered.length) filtered = all;

  filtered.sort((a, b) => {
    const ad = a.dueAt || '';
    const bd = b.dueAt || '';
    if (ad && bd && ad !== bd) return ad.localeCompare(bd);
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  return randomChoice(filtered.slice(0, Math.min(filtered.length, 80)));
}

// --- Render question + related ---
function renderQuestion() {
  if (!questionPanel || !feedbackPanel || !relatedBox) return;

  if (!currentQuestion) {
    questionPanel.innerHTML = '<div class="muted">No questions yet. Import JSON to start.</div>';
    relatedBox.innerHTML = 'No related questions yet.';
    return;
  }

  const q = currentQuestion;
  const letters = ['A','B','C','D','E','F','G'];
  currentChoices = q.choices || [];

  let html = `<div class="q-text">Q#${q.id ?? ''} – ${q.text || ''}</div>`;

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
    html += `<div class="img-preview"><a href="${src}" target="_blank" rel="noopener noreferrer">
      <img src="${src}" alt="question image"></a></div>`;
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
  if (!relatedBox || !currentQuestion) return;
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
    (o.text || '').toLowerCase().split(/\W+/).forEach(w => { if (key.has(w)) score += 1; });
    if (score >= 3) rel.push({ q: o, score });
  });

  rel.sort((a,b) => b.score - a.score);
  const top = rel.slice(0, 8);

  if (!top.length) {
    relatedBox.innerHTML = 'No strong concept links for this question yet.';
    return;
  }

  relatedBox.innerHTML = top.map(r => `
    <div class="related-link" data-qid="${r.q.id}">
      <span>Q#${r.q.id}</span> – ${(r.q.text || '').slice(0, 60)}${(r.q.text||'').length>60?'…':''}
    </div>`).join('');

  relatedBox.querySelectorAll('.related-link').forEach(el => {
    el.addEventListener('click', async () => {
      const id = parseInt(el.getAttribute('data-qid'), 10);
      const qq = await getQuestionById(id);
      if (!qq) return;
      currentQuestion = qq;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]')?.click();
    });
  });
}

// --- History list ---
async function updateHistoryList() {
  if (!historyListEl) return;

  const tx = db.transaction(['answers','questions'], 'readonly');
  const aStore = tx.objectStore('answers');
  const qStore = tx.objectStore('questions');

  const allAns = await new Promise(res => {
    const req = aStore.getAll();
    req.onsuccess = e => res(e.target.result || []);
    req.onerror = () => res([]);
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
      <div>${(q.text || '').slice(0, 80)}${(q.text||'').length > 80 ? '…' : ''}</div>
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
      const q = await getQuestionById(id);
      if (!q) return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]')?.click();
    });
  });
}

// --- Practice pool + sessions ---
async function buildPracticePool() {
  const all = await getAllQuestions();
  const nowIso = new Date().toISOString();
  let filtered = all.filter(q => q && q.active !== false);

  if (currentMode === 'due') {
    filtered = filtered.filter(q => isDue(q, nowIso));
    if (!filtered.length) filtered = all.filter(q => q.active !== false);
  } else if (currentMode === 'new') {
    filtered = filtered.filter(q => !q.timesSeen);
  } else if (currentMode === 'wrong') {
    filtered = filtered.filter(q => (q.timesWrong || 0) > 0);
  } else if (currentMode === 'flagged') {
    filtered = filtered.filter(q => q.flagged);
  } else if (currentMode === 'weak') {
    const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));
    filtered = filtered.filter(q => weakSet.has(q.id));
    if (!filtered.length) filtered = all.filter(q => q.active !== false);
  } else if (currentMode === 'chapter') {
    const sel = document.getElementById('chapterSelect');
    let chapters = [];
    if (sel && sel.selectedOptions && sel.selectedOptions.length) {
      chapters = Array.from(sel.selectedOptions).map(o => (o.value || '').trim()).filter(Boolean);
    }
    if (!chapters.length) {
      const raw = (chapterFilterEl?.value || '').trim();
      if (raw) chapters = raw.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (chapters.length) {
      const low = chapters.map(c => c.toLowerCase());
      filtered = filtered.filter(q => low.includes((q.chapter || '').toLowerCase()));
    }
  }

  if (prefSkipSolved && currentMode !== 'new') {
    const unsolved = filtered.filter(q => !(q.timesSeen > 0));
    if (unsolved.length) filtered = unsolved;
  }

  filtered.sort((a,b) => {
    const ad = a.dueAt || '';
    const bd = b.dueAt || '';
    if (ad && bd && ad !== bd) return ad.localeCompare(bd);
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  return filtered;
}

async function startNewPracticeSession(autoStartFirst=true) {
  const pool = await buildPracticePool();
  if (!pool.length) {
    practiceSession = null;
    currentQuestion = null;
    renderQuestion();
    renderSequenceNav();
    return;
  }

  const count = Math.max(1, Math.min(parseInt(document.getElementById('practiceCount')?.value || '30',10), pool.length));
  const picked = pool.slice(0, count);
  const ids = picked.map(q => q.id);

  const seqMap = {};
  ids.forEach((id, idx) => { seqMap[id] = idx + 1; });

  practiceSession = {
    id: makeSessionId(),
    createdAt: new Date().toISOString(),
    mode: currentMode,
    filters: {
      mode: currentMode,
      chapters: picked.map(q => q.chapter || '').filter(Boolean),
      prefSkipSolved: !!prefSkipSolved
    },
    questionIds: ids,
    seqMap,
    index: 0,
    answeredMap: {},
    correctCount: 0
  };

  const sessions = await loadPracticeSessions();
  sessions.unshift({
    id: practiceSession.id,
    createdAt: practiceSession.createdAt,
    mode: practiceSession.mode,
    count: practiceSession.questionIds.length,
    answered: 0,
    correct: 0,
    filters: practiceSession.filters,
    questionIds: practiceSession.questionIds,
    answeredMap: {}
  });
  await savePracticeSessions(sessions.slice(0, 50));

  if (autoStartFirst) {
    currentQuestion = picked[0];
    lastResult = null;
    lastSelectedIndex = null;
    feedbackPanel.innerHTML = '';
    renderQuestion();
    updateStatsBar();
    updateHistoryList();
    renderSequenceNav();
  }
}

function renderSequenceNav() {
  const nav = document.getElementById('seqNav');
  if (!nav) return;

  if (!practiceSession || !practiceSession.questionIds?.length) {
    nav.innerHTML = '';
    return;
  }

  const ids = practiceSession.questionIds;
  nav.innerHTML = ids.map((id, idx) => {
    const seq = idx + 1;
    const ans = practiceSession.answeredMap[id];
    let cls = 'seq-btn';
    if (idx === practiceSession.index) cls += ' current';
    if (ans) cls += ' answered ' + (ans.isCorrect ? 'correct' : 'wrong');
    return `<button class="${cls}" data-seq="${idx}">${seq}</button>`;
  }).join('');

  nav.querySelectorAll('button.seq-btn').forEach(b => {
    b.addEventListener('click', () => {
      const targetIdx = parseInt(b.getAttribute('data-seq'),10);
      if (!Number.isFinite(targetIdx)) return;
      jumpToSessionIndex(targetIdx);
    });
  });
}

async function jumpToSessionIndex(idx) {
  if (!practiceSession) return;
  if (idx < 0 || idx >= practiceSession.questionIds.length) return;

  practiceSession.index = idx;
  const qid = practiceSession.questionIds[idx];
  const q = await getQuestionById(qid);
  if (!q) return;

  currentQuestion = q;
  const ans = practiceSession.answeredMap[qid];
  lastSelectedIndex = ans ? ans.selectedIndex : null;
  lastResult = ans ? ans.isCorrect : null;

  renderQuestion();

  if (ans && lastSelectedIndex !== null) {
    const correctIdx = (q.choices || []).findIndex(c => c.isCorrect);
    if (correctIdx >= 0) showFeedback(correctIdx, lastSelectedIndex, q.explanation);
  } else {
    feedbackPanel.innerHTML = '';
  }

  renderSequenceNav();
}

async function showSessionsModal() {
  const modal = document.getElementById('sessionsModal');
  const list = document.getElementById('sessionsList');
  if (!modal || !list) return;

  const sessions = await loadPracticeSessions();
  if (!sessions.length) {
    list.innerHTML = '<div class="muted tiny">No sessions yet.</div>';
  } else {
    list.innerHTML = sessions.map(s => {
      const created = new Date(s.createdAt).toLocaleString();
      const meta = [
        `Mode: ${s.mode}`,
        `Questions: ${s.count}`,
        `Answered: ${s.answered}`,
        `Correct: ${s.correct}`,
        `Created: ${created}`
      ].join(' • ');

      const ch = (s.filters?.chapters || []).slice(0,6).join(', ');
      const filt = ch ? `Chapters: ${ch}${(s.filters.chapters||[]).length>6?'…':''}` : '';

      return `<div class="session-item">
        <div>
          <div><b>${created}</b></div>
          <div class="session-meta">${meta}</div>
          ${filt ? `<div class="session-meta">${filt}</div>`:''}
        </div>
        <div class="session-actions">
          <button class="primary" data-action="resume" data-id="${s.id}">Resume</button>
          <button class="ghost" data-action="delete" data-id="${s.id}">Delete</button>
        </div>
      </div>`;
    }).join('');

    list.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', async () => {
        const id = b.getAttribute('data-id');
        const action = b.getAttribute('data-action');
        if (!id) return;
        if (action === 'resume') {
          await resumePracticeSession(id);
          modal.classList.add('hidden');
        } else if (action === 'delete') {
          const arr = (await loadPracticeSessions()).filter(x => x.id !== id);
          await savePracticeSessions(arr);
          await showSessionsModal();
        }
      });
    });
  }

  modal.classList.remove('hidden');
}

async function resumePracticeSession(id) {
  const sessions = await loadPracticeSessions();
  const s = sessions.find(x => x.id === id);
  if (!s) return;

  practiceSession = {
    id: s.id,
    createdAt: s.createdAt,
    mode: s.mode,
    filters: s.filters || {},
    questionIds: s.questionIds || [],
    seqMap: {},
    index: 0,
    answeredMap: s.answeredMap || {},
    correctCount: s.correct || 0
  };
  practiceSession.questionIds.forEach((qid, idx) => practiceSession.seqMap[qid] = idx + 1);

  currentMode = practiceSession.mode;
  if (modeSelect) modeSelect.value = currentMode;

  let firstUnanswered = practiceSession.questionIds.findIndex(qid => !practiceSession.answeredMap[qid]);
  if (firstUnanswered < 0) firstUnanswered = 0;
  await jumpToSessionIndex(firstUnanswered);
}

async function loadNextQuestion(resetHistory) {
  if (!practiceSession || !practiceSession.questionIds?.length) {
    if (resetHistory) historyStack = [];
    else if (currentQuestion?.id != null) historyStack.push(currentQuestion.id);

    currentQuestion = await pickQuestion();

    lastResult = null;
    lastSelectedIndex = null;
    feedbackPanel.innerHTML = '';

    renderQuestion();
    updateStatsBar();
    updateHistoryList();
    renderSequenceNav();
    return;
  }

  if (resetHistory) practiceSession.index = 0;
  else practiceSession.index = Math.min(practiceSession.index + 1, practiceSession.questionIds.length - 1);

  await jumpToSessionIndex(practiceSession.index);
  updateStatsBar();
  updateHistoryList();
  renderSequenceNav();
}

async function goPreviousQuestion() {
  if (practiceSession && practiceSession.questionIds?.length) {
    practiceSession.index = Math.max(0, practiceSession.index - 1);
    await jumpToSessionIndex(practiceSession.index);
    updateStatsBar();
    updateHistoryList();
    renderSequenceNav();
    return;
  }

  if (!historyStack.length) return;
  const prevId = historyStack.pop();
  const q = await getQuestionById(prevId);
  if (!q) return;

  currentQuestion = q;

  const lastAns = await getLatestAnswer(prevId);
  const correctIdx = (q.choices || []).findIndex(c => c.isCorrect);

  if (lastAns && typeof lastAns.selectedIndex === 'number') {
    lastSelectedIndex = lastAns.selectedIndex;
    lastResult = !!lastAns.isCorrect;
  } else {
    lastSelectedIndex = null;
    lastResult = null;
  }

  renderQuestion();
  if (lastAns && lastSelectedIndex !== null && correctIdx >= 0) {
    showFeedback(correctIdx, lastSelectedIndex, q.explanation);
  } else {
    feedbackPanel.innerHTML = '';
  }
  renderSequenceNav();
}

async function getLatestAnswer(questionId) {
  const tx = db.transaction('answers', 'readonly');
  const store = tx.objectStore('answers');
  const idx = store.index('by_question');
  return await new Promise(res => {
    const r = idx.getAll(questionId);
    r.onsuccess = e => {
      const list = e.target.result || [];
      list.sort((a,b) => (b.answeredAt || '').localeCompare(a.answeredAt || ''));
      res(list[0] || null);
    };
    r.onerror = () => res(null);
  });
}

// --- Submit + feedback ---
async function submitAnswer() {
  if (!currentQuestion) return;
  const radios = document.querySelectorAll('input[name="choice"]');
  let selectedIdx = null;
  radios.forEach(r => { if (r.checked) selectedIdx = parseInt(r.value, 10); });
  if (selectedIdx === null) { alert('اختر إجابة أولاً.'); return; }

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
  nextSpaced(q, isCorrect);
  qStore.put(q);

  aStore.add({ questionId: q.id, answeredAt: now, selectedIndex: selectedIdx, isCorrect });

  tx.oncomplete = async () => {
    currentQuestion = q;

    if (practiceSession && practiceSession.questionIds?.length) {
      const qid = q.id;
      const prev = practiceSession.answeredMap[qid];

      if (!prev) {
        practiceSession.answeredMap[qid] = { selectedIndex: selectedIdx, isCorrect, answeredAt: now };
        if (isCorrect) practiceSession.correctCount += 1;
      } else {
        if (prev.isCorrect !== isCorrect) {
          if (isCorrect) practiceSession.correctCount += 1;
          else practiceSession.correctCount = Math.max(0, practiceSession.correctCount - 1);
        }
        practiceSession.answeredMap[qid] = { selectedIndex: selectedIdx, isCorrect, answeredAt: now };
      }

      const sessions = await loadPracticeSessions();
      const i = sessions.findIndex(s => s.id === practiceSession.id);
      if (i >= 0) {
        sessions[i].answeredMap = practiceSession.answeredMap;
        sessions[i].answered = Object.keys(practiceSession.answeredMap).length;
        sessions[i].correct = practiceSession.correctCount;
        await savePracticeSessions(sessions);
      }
    }

    lastResult = isCorrect;
    showFeedback(correctIdx, selectedIdx, q.explanation);

    updateStatsBar();
    updateHistoryList();
    renderSequenceNav();
    refreshBackupLabels();
  };
}

function showFeedback(correctIdx, selectedIdx, explanation) {
  const letters = ['A','B','C','D','E','F','G'];
  const choices = currentChoices || [];

  document.querySelectorAll('.choice').forEach((el, idx) => {
    el.classList.remove('correct','wrong','show');
    if (idx === correctIdx) el.classList.add('correct','show');
    if (idx === selectedIdx && idx !== correctIdx) el.classList.add('wrong','show');
  });

  let html = '<div style="margin-top:0.3rem;">';
  html += lastResult
    ? '<div style="color:#2e7d32; font-weight:600;">Correct ✅</div>'
    : '<div style="color:#c62828; font-weight:600;">Wrong ❌</div>';

  if (correctIdx >= 0 && choices[correctIdx]) {
    html += `<div class="muted" style="margin-top:0.25rem;">
      Correct answer: <strong>${letters[correctIdx]}.</strong> ${choices[correctIdx].text || ''}
    </div>`;
  }
  if (explanation) {
    html += `<div class="muted" style="margin-top:0.25rem;">
      <strong>Explanation:</strong> ${explanation}
    </div>`;
  }
  html += '</div>';

  if (feedbackPanel) feedbackPanel.innerHTML = html;
}

// --- Flags ---
async function toggleFlag() {
  if (!currentQuestion) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  const q = Object.assign({}, currentQuestion);
  q.flagged = !q.flagged;
  store.put(q);
  tx.oncomplete = async () => {
    currentQuestion = q;
    renderQuestion();
    updateStatsBar();
    updateHistoryList();
    renderSequenceNav();
  };
}

async function toggleMaintenanceFlag() {
  if (!currentQuestion) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  const q = Object.assign({}, currentQuestion);
  q.maintenance = !q.maintenance;
  store.put(q);
  tx.oncomplete = async () => {
    currentQuestion = q;
    renderQuestion();
    updateStatsBar();
    updateHistoryList();
    renderSequenceNav();
  };
}

// --- Import (questions only) ---
function normalizeImportedQuestions(rawArr) {
  if (!Array.isArray(rawArr)) return [];
  const letters = ['A','B','C','D','E','F','G'];

  return rawArr.map((q, idx) => {
    const baseText = q.text || q.question || q.prompt || ('Question ' + (idx + 1));
    const chapter = q.chapter || q.chapterName || q.topic || '';
    const source = q.source || q.book || q.reference || '';
    const explanation = q.explanation || q.explain || q.rationale || q.comment || '';

    let tags = [];
    if (Array.isArray(q.tags)) tags = q.tags;
    else if (Array.isArray(q.categories)) tags = q.categories;
    else if (typeof q.tags === 'string') tags = q.tags.split(/[,;]+/).map(s => s.trim()).filter(Boolean);

    let choices = [];
    if (Array.isArray(q.choices) && q.choices.length) {
      const looksStructured = q.choices.every(ch => typeof ch === 'object' && 'text' in ch);
      if (looksStructured) {
        choices = q.choices.map(ch => ({ text: ch.text, isCorrect: !!ch.isCorrect }));
      }
    }

    if (!choices.length) {
      let opts = null;
      if (Array.isArray(q.options)) opts = q.options;
      else if (Array.isArray(q.answers)) opts = q.answers;
      else if (Array.isArray(q.choices)) opts = q.choices;

      if (opts && opts.length) {
        let correctIdx = null;
        if (typeof q.correctIndex === 'number') correctIdx = q.correctIndex;
        else if (typeof q.answerIndex === 'number') correctIdx = q.answerIndex;
        else if (typeof q.correct === 'number') correctIdx = q.correct;
        else if (typeof q.correct === 'string') {
          const li = letters.indexOf(q.correct.toUpperCase());
          if (li >= 0 && li < opts.length) correctIdx = li;
          else {
            const byText = opts.findIndex(o => String(o).trim() === q.correct.trim());
            if (byText >= 0) correctIdx = byText;
          }
        }

        choices = opts.map((opt, i) => ({
          text: typeof opt === 'string' ? opt : (opt.text || String(opt)),
          isCorrect: (correctIdx !== null ? i === correctIdx : !!opt.isCorrect)
        }));

        if (!choices.some(c => c.isCorrect) && choices.length) choices[0].isCorrect = true;
      }
    }

    if (!choices.length) {
      choices = [{ text: 'Option A', isCorrect: true }];
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

function handleImportSimple() {
  const input = document.getElementById('fileInput');
  const file = input?.files?.[0];
  if (!file) { alert('اختر ملف JSON أولاً.'); return; }

  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const data = JSON.parse(e.target.result);
      let arr = data;
      if (!Array.isArray(arr) && data.questions) arr = data.questions;
      if (!Array.isArray(arr)) throw new Error('JSON should be array or {questions:[]}');

      const normalized = normalizeImportedQuestions(arr);

      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      normalized.forEach(q => {
        const obj = Object.assign({}, q);
        if (obj.id == null) delete obj.id;
        store.put(obj);
      });

      tx.oncomplete = () => {
        alert('Imported ' + normalized.length + ' questions.');
        refreshChapterOptions();
        startNewPracticeSession(true);
      };
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsText(file);
}

async function handleImportFromUrl() {
  const input = document.getElementById('fileUrlInput');
  const url = (input?.value || '').trim();
  if (!url) { alert('أدخل رابط JSON أولاً.'); return; }

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    let arr = data;
    if (!Array.isArray(arr) && data.questions) arr = data.questions;
    if (!Array.isArray(arr)) throw new Error('JSON should be array or {questions:[]}');

    const normalized = normalizeImportedQuestions(arr);

    const tx = db.transaction('questions', 'readwrite');
    const store = tx.objectStore('questions');
    normalized.forEach(q => {
      const obj = Object.assign({}, q);
      if (obj.id == null) delete obj.id;
      store.put(obj);
    });

    tx.oncomplete = () => {
      alert('Imported ' + normalized.length + ' questions from URL.');
      refreshChapterOptions();
      startNewPracticeSession(true);
    };
  } catch (err) {
    alert('Error importing from URL: ' + err.message);
  }
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

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mcq_questions.json';
  a.click();
}

// --- Backup full ---
async function buildBackupObject() {
  const questions = await getAllQuestions();

  const atx = db.transaction('answers', 'readonly');
  const as = atx.objectStore('answers');
  const answers = await new Promise(res => {
    const req = as.getAll();
    req.onsuccess = e => res(e.target.result || []);
    req.onerror = () => res([]);
  });

  const metaTx = db.transaction('meta', 'readonly');
  const ms = metaTx.objectStore('meta');
  const metaAll = await new Promise(res => {
    const req = ms.getAll();
    req.onsuccess = e => res(e.target.result || []);
    req.onerror = () => res([]);
  });
  const metaObj = {};
  metaAll.forEach(m => { metaObj[m.key] = m.value; });

  const exportedAt = new Date().toISOString();
  return {
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
}

async function exportFullBackup() {
  const backup = await buildBackupObject();
  const exportedAt = backup.meta.exportedAt;
  saveMeta('lastBackupAt', exportedAt);
  refreshBackupLabels();

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const safeTs = exportedAt.replace(/[:]/g, '-');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mcq_backup_' + safeTs + '.json';
  a.click();
}

async function handleBackupImport() {
  const input = document.getElementById('backupFileInput');
  const file = input?.files?.[0];
  if (!file) { alert('اختر ملف backup JSON أولاً.'); return; }

  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const data = JSON.parse(e.target.result);
      await importBackupObject(data);
      alert('Backup import completed.');
      startNewPracticeSession(true);
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
  const localLastActivity = await loadMeta('lastActivityAt');

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
      const obj = Object.assign({}, q);
      if (obj.id == null) delete obj.id;
      qs.put(obj);
    }
  });

  if (answers.length) {
    const atx = db.transaction('answers', 'readwrite');
    const as = atx.objectStore('answers');
    answers.forEach(a => {
      as.add({
        questionId: a.questionId,
        answeredAt: a.answeredAt || null,
        selectedIndex: a.selectedIndex,
        isCorrect: !!a.isCorrect
      });
    });
  }

  if (backupExportedAt && (!localLastActivity || backupExportedAt > localLastActivity)) {
    saveMeta('lastActivityAt', backupExportedAt);
    lastActivityAt = backupExportedAt;
  }
  if (backupExportedAt) saveMeta('lastBackupAt', backupExportedAt);
}

// Backup labels
function refreshBackupLabels() {
  const lastActEl = document.getElementById('lastActivityLabel');
  const lastBackupEl = document.getElementById('lastBackupLabel');
  if (!lastActEl || !lastBackupEl || !db) return;

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
// (kept as-is from your version, only no duplicates + safe checks)

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
  if (!editModal) return;
  editingQuestionId = q ? q.id : null;
  if (editTitleEl) editTitleEl.textContent = q ? `Edit question #${q.id}` : 'Add question';
  if (editTextEl) editTextEl.value = q?.text || '';
  if (editChapterEl) editChapterEl.value = q?.chapter || '';
  if (editSourceEl) editSourceEl.value = q?.source || '';
  if (editTagsEl) editTagsEl.value = (q?.tags || []).join(', ');
  if (editExplanationEl) editExplanationEl.value = q?.explanation || '';
  if (editImageUrlEl) editImageUrlEl.value = q?.imageUrl || '';
  if (editImageFileEl) editImageFileEl.value = '';
  if (editImagePreviewEl) {
    editImagePreviewEl.innerHTML = '';
    delete editImagePreviewEl.dataset.imageData;
    if (q && (q.imageData || q.imageUrl)) {
      const src = q.imageData || q.imageUrl;
      editImagePreviewEl.innerHTML = `<img src="${src}" alt="preview">`;
    }
  }
  if (editFlaggedEl) editFlaggedEl.checked = !!q?.flagged;
  if (editMaintEl) editMaintEl.checked = !!q?.maintenance;
  if (editPinnedEl) editPinnedEl.checked = !!q?.pinned;
  if (editActiveEl) editActiveEl.checked = q ? q.active !== false : true;

  if (editChoicesEl) {
    editChoicesEl.innerHTML = '';
    const choices = (q?.choices && q.choices.length) ? q.choices : [{ text:'', isCorrect:true }];
    choices.forEach(c => addChoiceRow(c.text || '', !!c.isCorrect));
  }

  editModal.classList.remove('hidden');
}

function closeEditModal() {
  if (!editModal) return;
  editModal.classList.add('hidden');
  editingQuestionId = null;
}

function addChoiceRow(text, isCorrect) {
  if (!editChoicesEl) return;
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
  row.querySelector('.btn-remove-choice')?.addEventListener('click', () => {
    if (editChoicesEl.children.length <= 1) return;
    row.remove();
  });
  row.querySelector('.choice-correct')?.addEventListener('change', () => {
    if (row.querySelector('.choice-correct').checked) {
      editChoicesEl.querySelectorAll('.choice-correct').forEach(r => {
        if (r !== row.querySelector('.choice-correct')) r.checked = false;
      });
    }
  });
  editChoicesEl.appendChild(row);
}

btnAddChoice?.addEventListener('click', () => addChoiceRow('', false));

editImageFileEl?.addEventListener('change', () => {
  const file = editImageFileEl.files[0];
  if (!file || !editImagePreviewEl) return;
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    editImagePreviewEl.innerHTML = `<img src="${dataUrl}" alt="preview">`;
    if (editImageUrlEl) editImageUrlEl.value = '';
    editImagePreviewEl.dataset.imageData = dataUrl;
  };
  reader.readAsDataURL(file);
});

editBackdrop?.addEventListener('click', closeEditModal);
btnEditCancel?.addEventListener('click', closeEditModal);

btnEditSave?.addEventListener('click', async () => {
  const text = editTextEl?.value.trim();
  if (!text) { alert('Question text required.'); return; }

  const chapter = editChapterEl?.value.trim() || '';
  const source = editSourceEl?.value.trim() || '';
  const tags = (editTagsEl?.value || '').split(',').map(t => t.trim()).filter(Boolean);
  const explanation = editExplanationEl?.value.trim() || '';
  const imageUrl = editImageUrlEl?.value.trim() || '';
  const imageData = editImagePreviewEl?.dataset.imageData || '';

  const choiceRows = Array.from(editChoicesEl?.querySelectorAll('.edit-choice-row') || []);
  if (!choiceRows.length) { alert('At least one choice is required.'); return; }

  const choices = choiceRows.map(row => {
    const txt = row.querySelector('.choice-text')?.value.trim();
    const isCorrect = !!row.querySelector('.choice-correct')?.checked;
    return { text: txt, isCorrect };
  }).filter(c => c.text);

  if (!choices.length) { alert('Enter at least one non-empty choice.'); return; }
  if (!choices.some(c => c.isCorrect)) choices[0].isCorrect = true;

  const flagged = !!editFlaggedEl?.checked;
  const maintenance = !!editMaintEl?.checked;
  const pinned = !!editPinnedEl?.checked;
  const active = !!editActiveEl?.checked;

  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');

  if (editingQuestionId != null) {
    const req = store.get(editingQuestionId);
    req.onsuccess = e => {
      const old = e.target.result || {};
      const q = Object.assign({}, old, {
        text, chapter, source, explanation,
        tags, choices,
        flagged, maintenance, pinned, active,
        imageUrl,
        imageData: imageData || old.imageData || ''
      });
      store.put(q);
    };
  } else {
    store.add({
      text, chapter, source, explanation,
      tags, choices,
      flagged, maintenance, pinned, active,
      createdAt: new Date().toISOString(),
      timesSeen: 0, timesCorrect: 0, timesWrong: 0,
      lastSeenAt: null,
      imageUrl, imageData,
      srEase: 2.5, srInterval: 0, srReps: 0, dueAt: null
    });
  }

  tx.oncomplete = () => {
    closeEditModal();
    reloadAllQuestionsTable();
    startNewPracticeSession(true);
  };
});

// --- All Questions table ---
async function reloadAllQuestionsTable() {
  const tbody = document.getElementById('allTableBody');
  if (!tbody) return;

  const searchVal = (document.getElementById('allSearch')?.value || '').toLowerCase().trim();
  const filter = document.getElementById('allFilter')?.value || 'all';
  const sortVal = document.getElementById('allSort')?.value || 'created_desc';
  const rangeFrom = parseInt(document.getElementById('rangeFrom')?.value || '0', 10);
  const rangeTo = parseInt(document.getElementById('rangeTo')?.value || '0', 10);
  const lastN = parseInt(document.getElementById('allLastN')?.value || '0', 10) || 0;

  tbody.innerHTML = '';
  allRangeAnchorIndex = null;

  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));

  const dupMap = new Map();
  all.forEach(q => {
    const norm = normalizeTextForDup(q.text || '');
    if (!norm) return;
    if (!dupMap.has(norm)) dupMap.set(norm, []);
    dupMap.get(norm).push(q.id);
  });
  const dupSet = new Set();
  dupMap.forEach(ids => { if (ids.length > 1) ids.forEach(id => dupSet.add(id)); });

  let arr = all;

  if (searchVal) {
    arr = arr.filter(q => {
      const s = (q.text || '') + ' ' + (q.chapter || '') + ' ' + (q.source || '') +
        ' ' + (Array.isArray(q.tags) ? q.tags.join(' ') : '');
      return s.toLowerCase().includes(searchVal);
    });
  }

  if (rangeFrom && rangeTo && rangeTo >= rangeFrom) arr = arr.filter(q => q.id >= rangeFrom && q.id <= rangeTo);
  else if (rangeFrom && !rangeTo) arr = arr.filter(q => q.id >= rangeFrom);
  else if (!rangeFrom && rangeTo) arr = arr.filter(q => q.id <= rangeTo);

  const chapVal = (document.getElementById('allChapterSelect')?.value || '').trim();
  if (chapVal) arr = arr.filter(q => (q.chapter || '').trim() === chapVal);

  if (filter === 'flagged') arr = arr.filter(q => q.flagged);
  else if (filter === 'wrong') arr = arr.filter(q => (q.timesWrong || 0) > 0);
  else if (filter === 'maintenance') arr = arr.filter(q => q.maintenance === true);
  else if (filter === 'inactive') arr = arr.filter(q => q.active === false);
  else if (filter === 'weak') arr = arr.filter(q => weakSet.has(q.id));
  else if (filter === 'duplicate') arr = arr.filter(q => dupSet.has(q.id));
  else if (filter === 'pinned') arr = arr.filter(q => q.pinned);

  if (sortVal === 'created_desc') arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  else if (sortVal === 'created_asc') arr.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  else if (sortVal === 'chapter') arr.sort((a, b) => (a.chapter || '').localeCompare(b.chapter || ''));
  else if (sortVal === 'wrong_desc') arr.sort((a, b) => (b.timesWrong || 0) - (a.timesWrong || 0));
  else if (sortVal === 'due_asc') arr.sort((a, b) => (a.dueAt || '').localeCompare(b.dueAt || ''));
  else if (sortVal === 'text_asc') arr.sort((a, b) => (a.text || '').localeCompare(b.text || ''));

  if (lastN > 0) arr = arr.slice(0, lastN);

  const total = arr.length;
  allTotalPages = Math.max(1, Math.ceil(total / ALL_PAGE_SIZE));
  if (allCurrentPage < 1) allCurrentPage = 1;
  if (allCurrentPage > allTotalPages) allCurrentPage = allTotalPages;

  const startIdx = (allCurrentPage - 1) * ALL_PAGE_SIZE;
  const endIdx = Math.min(startIdx + ALL_PAGE_SIZE, total);
  const pageItems = arr.slice(startIdx, endIdx);

  const pageInfoEl = document.getElementById('allPageInfo');
  if (pageInfoEl) pageInfoEl.textContent = `Page ${allCurrentPage} / ${allTotalPages} (total ${total})`;

  const nowIso = new Date().toISOString();

  pageItems.forEach(q => {
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
      <td>${(q.text || '').slice(0, 120)}${(q.text||'').length > 120 ? '…' : ''}</td>
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
      if (allSelectedIds.has(id)) cb.checked = true;

      cb.addEventListener('change', () => {
        const rangeMode = !!document.getElementById('allRangeMode')?.checked;
        const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
        const thisIndex = boxes.indexOf(cb);

        if (!rangeMode || thisIndex === -1 || allRangeAnchorIndex == null) {
          cb.checked ? allSelectedIds.add(id) : allSelectedIds.delete(id);
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
          if (!allSelectedIds.has(rid)) { allAlreadySelected = false; break; }
        }

        for (let i = start; i <= end; i++) {
          const rowCb = boxes[i];
          if (!rowCb) continue;
          const rid = parseInt(rowCb.getAttribute('data-id'), 10);
          rowCb.checked = !allAlreadySelected;
          !allAlreadySelected ? allSelectedIds.add(rid) : allSelectedIds.delete(rid);
        }

        allRangeAnchorIndex = thisIndex;
        updateAllSelectedCount();
      });
    }

    tr.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || e.target.classList.contains('btn-edit')) return;
      const anySelected = !!document.querySelector('#allTableBody input.row-select:checked');
      if (anySelected) return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]')?.click();
    });

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const q = await getQuestionById(id);
      if (!q) return;
      openEditModal(q);
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
    allSelectAll.checked = boxes.every(cb => allSelectedIds.has(parseInt(cb.getAttribute('data-id'), 10)));
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

  tx.oncomplete = () => reloadAllQuestionsTable();
}

async function bulkAddTagForSelected() {
  if (!allSelectedIds.size) return;
  const tag = prompt('Tag to add to selected questions:');
  const trimmed = (tag || '').trim();
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

  tx.oncomplete = () => reloadAllQuestionsTable();
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
    startNewPracticeSession(true);
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
    list.slice(1).forEach(q => toDelete.push(q.id));
  });

  if (!toDelete.length) { alert('No duplicate clusters found.'); return; }
  if (!confirm('Delete ' + toDelete.length + ' duplicate question(s) (keeping one from each cluster)?')) return;

  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  toDelete.forEach(id => store.delete(id));

  tx.oncomplete = () => { reloadAllQuestionsTable(); startNewPracticeSession(true); };
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
  const t = document.getElementById('ghTokenInput');
  const r = document.getElementById('ghRepoInput');
  const f = document.getElementById('ghFileInput');
  if (t) t.value = cfg.token;
  if (r) r.value = cfg.repo;
  if (f) f.value = cfg.filename;
}
function saveGitHubConfigFromUI() {
  const token = document.getElementById('ghTokenInput')?.value.trim() || '';
  const repo = document.getElementById('ghRepoInput')?.value.trim() || 'Awad1992/mcq-data';
  const filename = document.getElementById('ghFileInput')?.value.trim() || 'mcq_backup.json';
  saveGitHubConfig({ token, repo, filename });
  refreshCloudInfo();
  alert('GitHub settings saved.');
}
function refreshCloudInfo() {
  const cfg = loadGitHubConfig();
  const el = document.getElementById('cloudInfo');
  const syncStatus = document.getElementById('syncStatus');
  if (!el || !syncStatus) return;

  if (!cfg.token || !cfg.repo) {
    el.textContent = 'Cloud sync disabled. Add token + repo in Settings.';
    syncStatus.textContent = 'No cloud sync';
    return;
  }
  el.textContent = 'Cloud ready → Repo: ' + cfg.repo + ' · File: ' + cfg.filename;
  syncStatus.textContent = 'Cloud: ready';
}
function encodeBase64(str) { return btoa(unescape(encodeURIComponent(str))); }
function decodeBase64(str) { return decodeURIComponent(escape(atob(str))); }

async function cloudUpload() {
  const cfg = loadGitHubConfig();
  if (!cfg.token || !cfg.repo) { alert('Set GitHub token + repo in Settings first.'); return; }

  const backup = await buildBackupObject();
  const contentB64 = encodeBase64(JSON.stringify(backup, null, 2));

  const [owner, repoName] = cfg.repo.split('/');
  if (!owner || !repoName) { alert('Repo format must be owner/name.'); return; }

  const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;

  let existingSha = null;
  try {
    const getRes = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
    if (getRes.status === 200) {
      const info = await getRes.json();
      existingSha = info.sha;
    }
  } catch {}

  const body = { message: 'MCQ backup ' + new Date().toISOString(), content: contentB64 };
  if (existingSha) body.sha = existingSha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `token ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    alert('Upload failed: ' + res.status + ' ' + txt);
    return;
  }
  alert('Backup uploaded to GitHub.');
}

async function cloudDownload() {
  const cfg = loadGitHubConfig();
  if (!cfg.token || !cfg.repo) { alert('Set GitHub token + repo in Settings first.'); return; }

  const [owner, repoName] = cfg.repo.split('/');
  if (!owner || !repoName) { alert('Repo format must be owner/name.'); return; }

  const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;
  const res = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });

  if (res.status === 404) { alert('No backup file found in GitHub repo.'); return; }
  if (!res.ok) { alert('Download failed: ' + res.status); return; }

  const info = await res.json();
  const contentStr = decodeBase64(info.content);

  let data = null;
  try { data = JSON.parse(contentStr); }
  catch { alert('Invalid JSON in backup file.'); return; }

  await importBackupObject(data);
  alert('Cloud backup downloaded and merged.');
  startNewPracticeSession(true);
  refreshBackupLabels();
}

// --- Dashboard ---
async function renderDashboard() {
  const all = await getAllQuestions();
  const weak = computeWeakQuestions(all);

  const dashOverall = document.getElementById('dashOverall');
  const dashWeakChapters = document.getElementById('dashWeakChapters');
  const dashWeekly = document.getElementById('dashWeekly');
  if (!dashOverall || !dashWeakChapters || !dashWeekly) return;

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
  if (!chapMap.size) chapHtml += '<div class="tiny muted">No clear weak chapters yet.</div>';
  else chapMap.forEach((list, chap) => {
    chapHtml += `<div><strong>${chap}</strong> – ${list.length} weak questions</div>`;
  });

  dashWeakChapters.innerHTML = chapHtml;
  dashWeekly.innerHTML = '<div class="dash-title">Weekly activity</div><div class="tiny muted">Uses answers timestamps (simple text summary).</div>';
}

// --- Flashcards ---
const fcSourceEl = document.getElementById('fcSource');
const fcChapterFilterEl = document.getElementById('fcChapterFilter');
const fcModeEl = document.getElementById('fcMode');
const fcFront = document.getElementById('flashcardFront');
const fcBack = document.getElementById('flashcardBack');

if (fcSourceEl) {
  fcSourceEl.addEventListener('change', () => {
    if (fcSourceEl.value === 'chapter') {
      if (fcChapterFilterEl) fcChapterFilterEl.style.display = 'inline-block';
    } else {
      if (fcChapterFilterEl) { fcChapterFilterEl.style.display = 'none'; fcChapterFilterEl.value = ''; }
    }
    buildFlashcardPool();
  });
}
fcChapterFilterEl?.addEventListener('change', buildFlashcardPool);
fcModeEl?.addEventListener('change', renderFlashcard);

document.getElementById('btnFcShow')?.addEventListener('click', () => {
  flashcardShowBack = true; renderFlashcard();
});
document.getElementById('btnFcAgain')?.addEventListener('click', async () => {
  await updateSpacedAfterFlashcard(false); nextFlashcard();
});
document.getElementById('btnFcGood')?.addEventListener('click', async () => {
  await updateSpacedAfterFlashcard(true); nextFlashcard();
});
document.getElementById('btnFcNext')?.addEventListener('click', nextFlashcard);

async function buildFlashcardPool() {
  if (!fcSourceEl) return;

  const src = fcSourceEl.value;
  const chap = (fcChapterFilterEl?.value || '').trim().toLowerCase();

  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));
  const nowIso = new Date().toISOString();

  let pool = all.filter(q => q.active !== false);

  if (src === 'due') pool = pool.filter(q => isDue(q, nowIso));
  else if (src === 'weak') pool = pool.filter(q => weakSet.has(q.id));
  else if (src === 'flagged') pool = pool.filter(q => q.flagged);
  else if (src === 'chapter' && chap) pool = pool.filter(q => (q.chapter || '').toLowerCase() === chap);

  flashcardPool = shuffle(pool);
  flashcardIndex = -1;
  nextFlashcard();
}

function currentFlashcard() {
  if (flashcardIndex < 0 || flashcardIndex >= flashcardPool.length) return null;
  return flashcardPool[flashcardIndex];
}

function renderFlashcard() {
  if (!fcFront || !fcBack || !fcModeEl) return;

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
      if (correctChoice) back += `<div><strong>Answer:</strong> ${letters[correctIdx]}. ${correctChoice.text || ''}</div>`;
      if (q.explanation) back += `<div style="margin-top:0.25rem;"><strong>Explanation:</strong> ${q.explanation}</div>`;
      fcBack.innerHTML = back || 'No answer text.';
      fcBack.style.display = 'block';
    }
  } else {
    fcFront.innerHTML = correctChoice
      ? `<div><strong>Key idea:</strong> ${correctChoice.text || ''}</div>`
      : `<div><strong>Key idea:</strong> ${q.explanation || 'No answer text.'}</div>`;

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
document.getElementById('btnStartDaily')?.addEventListener('click', startDailyChallenge);

async function startDailyChallenge() {
  const today = new Date().toISOString().slice(0,10);
  let ids = [];
  try {
    const raw = localStorage.getItem('mcq_daily_ids_' + today);
    if (raw) ids = JSON.parse(raw);
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
      if (!seen.has(q.id)) { seen.add(q.id); picked.push(q.id); }
      if (picked.length >= 10) break;
    }
    ids = picked;
    try { localStorage.setItem('mcq_daily_ids_' + today, JSON.stringify(ids)); } catch {}
  }

  if (!ids.length) { alert('No questions available for daily challenge.'); return; }

  const q = await getQuestionById(ids[0]);
  if (!q) return;

  historyStack = [];
  currentQuestion = q;
  lastResult = null;
  lastSelectedIndex = null;
  feedbackPanel.innerHTML = '';

  renderQuestion();
  updateStatsBar();
  updateHistoryList();
}

// --- Exam simulation ---
document.getElementById('btnStartExam')?.addEventListener('click', startExam);
document.getElementById('btnExamPrev')?.addEventListener('click', () => examMove(-1));
document.getElementById('btnExamNext')?.addEventListener('click', () => examMove(1));
document.getElementById('btnExamFinish')?.addEventListener('click', finishExam);

document.getElementById('examPool')?.addEventListener('change', () => {
  const v = document.getElementById('examPool')?.value;
  const f = document.getElementById('examChapterFilter');
  if (f) f.style.display = (v === 'chapter') ? 'inline-block' : 'none';
});

async function startExam() {
  const poolType = document.getElementById('examPool')?.value || 'all';
  const chap = (document.getElementById('examChapterFilter')?.value || '').trim().toLowerCase();
  const count = parseInt(document.getElementById('examCount')?.value || '30', 10);
  const minutes = parseInt(document.getElementById('examMinutes')?.value || '60', 10);

  const all = await getAllQuestions();
  const weakSet = new Set(computeWeakQuestions(all).map(q => q.id));
  let pool = all.filter(q => q.active !== false);

  if (poolType === 'weak') pool = pool.filter(q => weakSet.has(q.id));
  else if (poolType === 'flagged') pool = pool.filter(q => q.flagged);
  else if (poolType === 'chapter' && chap) pool = pool.filter(q => (q.chapter || '').toLowerCase() === chap);

  pool = shuffle(pool);
  if (!pool.length) { alert('No questions available for this pool.'); return; }

  const selected = pool.slice(0, Math.min(count, pool.length));
  examSession = {
    ids: selected.map(q => q.id),
    answers: {},
    index: 0,
    startTime: Date.now(),
    limitMs: minutes * 60 * 1000
  };

  const totalEl = document.getElementById('examTotalLabel');
  if (totalEl) totalEl.textContent = selected.length;

  document.getElementById('examActiveCard')?.style?.setProperty('display','block');
  document.getElementById('examResultCard')?.style?.setProperty('display','none');

  renderExamQuestion();
  startExamTimer();
}

async function renderExamQuestion() {
  if (!examSession) return;

  const idx = examSession.index;
  const total = examSession.ids.length;
  if (idx < 0 || idx >= total) return;

  const idxEl = document.getElementById('examIndexLabel');
  if (idxEl) idxEl.textContent = (idx + 1);

  const qid = examSession.ids[idx];
  const q = await getQuestionById(qid);

  const panel = document.getElementById('examQuestionPanel');
  if (!panel) return;
  if (!q) { panel.innerHTML = '<div class="muted">Question not found.</div>'; return; }

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
}

function examMove(delta) {
  if (!examSession) return;

  const panel = document.getElementById('examQuestionPanel');
  const radios = panel?.querySelectorAll('input[name="examChoice"]') || [];
  let selected = null;
  radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); });

  const currentQid = examSession.ids[examSession.index];
  if (selected !== null) examSession.answers[currentQid] = selected;

  const nextIndex = examSession.index + delta;
  if (nextIndex < 0 || nextIndex >= examSession.ids.length) return;

  examSession.index = nextIndex;
  renderExamQuestion();
}

async function finishExam() {
  if (!examSession) return;
  clearInterval(examTimerId);
  examTimerId = null;

  const panel = document.getElementById('examQuestionPanel');
  const radios = panel?.querySelectorAll('input[name="examChoice"]') || [];
  let selected = null;
  radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); });

  const currentQid = examSession.ids[examSession.index];
  if (selected !== null) examSession.answers[currentQid] = selected;

  const all = await getAllQuestions();
  const byId = new Map(all.map(q => [q.id, q]));

  let correct = 0, wrong = 0, unanswered = 0;
  const perChapter = new Map();

  examSession.ids.forEach(id => {
    const q = byId.get(id);
    if (!q) return;
    const ans = examSession.answers[id];
    const correctIdx = (q.choices || []).findIndex(c => c.isCorrect);

    if (ans == null) { unanswered++; return; }

    const chap = q.chapter || 'No chapter';
    if (!perChapter.has(chap)) perChapter.set(chap, { correct:0, wrong:0 });

    if (ans === correctIdx) { correct++; perChapter.get(chap).correct++; }
    else { wrong++; perChapter.get(chap).wrong++; }
  });

  const total = examSession.ids.length;
  const score = total ? (correct / total * 100) : 0;
  const durationMs = Date.now() - examSession.startTime;
  const minutesUsed = durationMs / 60000;

  const summaryEl = document.getElementById('examSummary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div>Total questions: <strong>${total}</strong></div>
      <div>Correct: <strong>${correct}</strong></div>
      <div>Wrong: <strong>${wrong}</strong></div>
      <div>Unanswered: <strong>${unanswered}</strong></div>
      <div>Score: <strong>${score.toFixed(1)}%</strong></div>
      <div>Time used: <strong>${minutesUsed.toFixed(1)} min</strong></div>
    `;
  }

  let detailHtml = '<div>Per chapter:</div>';
  perChapter.forEach((v, chap) => {
    const t = v.correct + v.wrong;
    const s = t ? (v.correct / t * 100) : 0;
    detailHtml += `<div>${chap}: ${v.correct}/${t} correct (${s.toFixed(1)}%)</div>`;
  });
  const detailsEl = document.getElementById('examDetails');
  if (detailsEl) detailsEl.innerHTML = detailHtml;

  document.getElementById('examActiveCard')?.style?.setProperty('display','none');
  document.getElementById('examResultCard')?.style?.setProperty('display','block');

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
    if (label) label.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
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

// --- Reset progress ---
async function resetProgress(scope) {
  if (!db) return;
  if (!confirm('Reset progress for selected questions? This keeps questions but clears your practice history.')) return;

  const tx = db.transaction(['questions','answers'], 'readwrite');
  const qStore = tx.objectStore('questions');
  const aStore = tx.objectStore('answers');

  const all = await new Promise(res => {
    const req = qStore.getAll();
    req.onsuccess = e => res(e.target.result || []);
    req.onerror = () => res([]);
  });

  const now = new Date().toISOString();

  for (const q of all) {
    const everWrong = (q.timesWrong || 0) > 0;
    if (scope === 'wrong' && !everWrong) continue;

    q.timesSeen = 0;
    q.timesWrong = 0;
    q.timesCorrect = 0;
    q.lastSeenAt = null;
    q.dueAt = now;
    q.srEase = 2.5;
    q.srInterval = 0;
    q.srReps = 0;

    qStore.put(q);

    const idx = aStore.index('by_question');
    const ansList = await new Promise(res => {
      const r = idx.getAll(q.id);
      r.onsuccess = e => res(e.target.result || []);
      r.onerror = () => res([]);
    });
    for (const a of ansList) aStore.delete(a.id);
  }

  alert('Progress reset completed.');
  historyStack = [];
  startNewPracticeSession(true);
  updateStatsBar();
  updateHistoryList();
}

// --- Wire buttons (single-bind, no duplicates) ---
document.getElementById('btnSubmit')?.addEventListener('click', submitAnswer);
document.getElementById('btnNext')?.addEventListener('click', () => {
  lastResult = null;
  if (feedbackPanel) feedbackPanel.innerHTML = '';
  loadNextQuestion(false);
});
document.getElementById('btnPrev')?.addEventListener('click', goPreviousQuestion);
document.getElementById('btnFlag')?.addEventListener('click', toggleFlag);
document.getElementById('btnMaint')?.addEventListener('click', toggleMaintenanceFlag);

document.getElementById('btnImport')?.addEventListener('click', handleImportSimple);
document.getElementById('btnExport')?.addEventListener('click', exportQuestionsOnly);
document.getElementById('btnImportUrl')?.addEventListener('click', handleImportFromUrl);

document.getElementById('btnAllReload')?.addEventListener('click', reloadAllQuestionsTable);
document.getElementById('btnAllDelete')?.addEventListener('click', deleteSelectedAll);
document.getElementById('btnAllDeleteDups')?.addEventListener('click', deleteDuplicateClusters);

document.getElementById('allSelectAll')?.addEventListener('change', e => {
  const boxes = Array.from(document.querySelectorAll('#allTableBody input.row-select'));
  boxes.forEach(ch => {
    const id = parseInt(ch.getAttribute('data-id'), 10);
    ch.checked = e.target.checked;
    e.target.checked ? allSelectedIds.add(id) : allSelectedIds.delete(id);
  });
  updateAllSelectedCount();
});

document.getElementById('allSearch')?.addEventListener('input', debounce(() => { allCurrentPage=1; reloadAllQuestionsTable(); }, 250));
document.getElementById('allFilter')?.addEventListener('change', () => { allCurrentPage=1; reloadAllQuestionsTable(); });
document.getElementById('allSort')?.addEventListener('change', () => { allCurrentPage=1; reloadAllQuestionsTable(); });
document.getElementById('rangeFrom')?.addEventListener('input', debounce(() => { allCurrentPage=1; reloadAllQuestionsTable(); }, 250));
document.getElementById('rangeTo')?.addEventListener('input', debounce(() => { allCurrentPage=1; reloadAllQuestionsTable(); }, 250));
document.getElementById('allChapterSelect')?.addEventListener('change', () => { allCurrentPage=1; reloadAllQuestionsTable(); });
document.getElementById('allLastN')?.addEventListener('input', debounce(() => { allCurrentPage=1; reloadAllQuestionsTable(); }, 250));

document.getElementById('allPrevPage')?.addEventListener('click', () => {
  if (allCurrentPage > 1) { allCurrentPage--; reloadAllQuestionsTable(); }
});
document.getElementById('allNextPage')?.addEventListener('click', () => {
  if (allCurrentPage < allTotalPages) { allCurrentPage++; reloadAllQuestionsTable(); }
});

document.getElementById('allBulkSetChapter')?.addEventListener('click', bulkSetChapterForSelected);
document.getElementById('allBulkAddTag')?.addEventListener('click', bulkAddTagForSelected);

document.getElementById('btnBackupExport')?.addEventListener('click', exportFullBackup);
document.getElementById('btnBackupImport')?.addEventListener('click', handleBackupImport);

document.getElementById('btnCloudUpload')?.addEventListener('click', cloudUpload);
document.getElementById('btnCloudDownload')?.addEventListener('click', cloudDownload);
document.getElementById('btnBackupQuick')?.addEventListener('click', cloudUpload);

document.getElementById('btnSaveGitHub')?.addEventListener('click', saveGitHubConfigFromUI);
document.getElementById('btnClearGitHub')?.addEventListener('click', () => {
  localStorage.removeItem('mcq_github_config');
  loadGitHubConfigIntoUI();
  refreshCloudInfo();
});

document.getElementById('btnNewSession')?.addEventListener('click', () => startNewPracticeSession(true));
document.getElementById('btnSessions')?.addEventListener('click', showSessionsModal);
document.getElementById('btnCloseSessions')?.addEventListener('click', () => {
  document.getElementById('sessionsModal')?.classList.add('hidden');
});

// Mode select (with multi-chapter)
modeSelect?.addEventListener('change', () => {
  currentMode = modeSelect.value;
  const chSel = document.getElementById('chapterSelect');

  if (currentMode === 'chapter') {
    if (chSel) { chSel.style.display = 'inline-block'; chSel.multiple = true; chSel.size = Math.min(8, chSel.options.length || 6); }
  } else {
    if (chSel) { chSel.style.display = 'none'; chSel.multiple = false; chSel.size = 1; chSel.value = ''; }
    currentChapter = '';
  }
  startNewPracticeSession(true);
});

document.getElementById('chapterSelect')?.addEventListener('change', (e) => {
  const sel = e.target;
  if (sel && !sel.multiple) currentChapter = (sel.value || '').trim();
  startNewPracticeSession(true);
});

// Quick buttons
document.getElementById('btnQuickWrong')?.addEventListener('click', () => {
  currentMode = 'wrong';
  if (modeSelect) modeSelect.value = 'wrong';
  const chSel = document.getElementById('chapterSelect');
  if (chSel) { chSel.style.display = 'none'; chSel.value = ''; }
  currentChapter = '';
  startNewPracticeSession(true);
});
document.getElementById('btnQuickFlagged')?.addEventListener('click', () => {
  currentMode = 'flagged';
  if (modeSelect) modeSelect.value = 'flagged';
  const chSel = document.getElementById('chapterSelect');
  if (chSel) { chSel.style.display = 'none'; chSel.value = ''; }
  currentChapter = '';
  startNewPracticeSession(true);
});

// --- Initial boot ---
openDB().then(() => {
  loadTheme();
  refreshBackupLabels();
  refreshCloudInfo();
  loadGitHubConfigIntoUI();
  refreshChapterOptions();
  loadPracticePrefs();
  startNewPracticeSession(true);
  buildFlashcardPool();
}).catch(err => {
  console.error(err);
  alert('Failed to open local database.');
});