// MCQ Study App Ultra-Pro v5.1
// Based on original v4.3.2 code provided by user.
// Added features: GitHub Fix (UTF-8), Focus Mode, Notes, Strikethrough, Smart Search, Guess Mode.

const DB_NAME = 'mcqdb_ultra_v41';
const DB_VERSION = 3;

let db = null;

// --- 1. HELPER FUNCTIONS (DEFINED FIRST TO PREVENT ERRORS) ---
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randomChoice(arr) {
  if (!arr.length) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function encodeBase64(str) {
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(binString);
}

function decodeBase64(str) {
  const binString = atob(str);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
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

// --- 2. APP STATE ---
let currentQuestion = null;
let currentChoices = [];
let currentMode = 'due';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;
let historyStack = [];

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

// DOM Elements
const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterFilterEl = document.getElementById('chapterFilter');
const prefSkipSolvedEl = document.getElementById('prefSkipSolved');
const relatedBox = document.getElementById('relatedBox');
const themeSelect = document.getElementById('themeSelect');
const resetBtn = document.getElementById('btnResetProgress');

// Builder Cache
let builderPreviewCache = [];


// --- 3. INITIALIZATION & EVENTS ---

async function loadPracticePrefs() {
  try {
    const val = await loadMeta('prefSkipSolved');
    if (typeof val === 'boolean') {
      prefSkipSolved = val;
    }
    const cb = document.getElementById('prefSkipSolved');
    if (cb) {
      cb.checked = !!prefSkipSolved;
    }
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

if (resetBtn) {
  resetBtn.addEventListener('click', async () => {
    const scopeEl = document.getElementById('resetScope');
    const scope = scopeEl ? scopeEl.value : 'all';
    await resetProgress(scope);
  });
}

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
    } else if (tab === 'home') {
      refreshChapterOptions();
    }
  });
});

// Subnav
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

// Builder Buttons
document.getElementById('btnBuilderMakePrompt')?.addEventListener('click', makeBuilderPrompt);
document.getElementById('btnBuilderPreview')?.addEventListener('click', builderPreviewFromJson);
document.getElementById('btnBuilderImportSelected')?.addEventListener('click', builderImportSelected);

// Theme
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
    refreshChapterOptions();
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

// Focus Mode Logic
const btnFocusMode = document.getElementById('btnFocusMode');
const btnExitFocus = document.getElementById('btnExitFocus');
if(btnFocusMode) {
  btnFocusMode.addEventListener('click', () => {
    document.body.classList.add('focus-mode');
  });
}
if(btnExitFocus) {
  btnExitFocus.addEventListener('click', () => {
    document.body.classList.remove('focus-mode');
  });
}

// Notes Logic
const userNoteArea = document.getElementById('userNoteArea');
if (userNoteArea) {
  userNoteArea.addEventListener('input', debounce(saveCurrentNote, 1000));
}

// Force Update Logic
const btnForceUpdate = document.getElementById('btnForceUpdate');
if (btnForceUpdate) {
  btnForceUpdate.addEventListener('click', async () => {
    if (!confirm('Update App? This will clear cache and reload.')) return;
    btnForceUpdate.textContent = 'Updating...';
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }
    window.location.reload(true);
  });
}


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


// --- PRACTICE LOGIC ---

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

async function goPreviousQuestion() {
  if (!historyStack.length) return;
  const prevId = historyStack.pop();

  const qTx = db.transaction('questions', 'readonly');
  const qStore = qTx.objectStore('questions');
  const q = await new Promise(res => {
    const req = qStore.get(prevId);
    req.onsuccess = e => res(e.target.result);
    req.onerror = () => res(null);
  });
  if (!q) return;

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

  if (lastAns && lastSelectedIndex !== null && correctIdx >= 0) {
    showFeedback(correctIdx, lastSelectedIndex, q.explanation);
  } else {
    feedbackPanel.innerHTML = '';
  }
}

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

  // Guess check
  const guessCheck = document.getElementById('guessCheck');
  const isGuessing = guessCheck ? guessCheck.checked : false;

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
  
  // Spaced Repetition
  if (isGuessing && isCorrect) {
     nextSpaced(q, false); // Penalize guess
  } else {
     nextSpaced(q, isCorrect);
  }
  
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

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML = '<div class="muted">No questions yet. Import JSON to start.</div>';
    relatedBox.innerHTML = 'No related questions yet.';
    if(userNoteArea) userNoteArea.value = '';
    const st = document.getElementById('searchTools');
    if(st) st.innerHTML = '';
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
    html += `
    <div class="choice-container">
      <label class="choice" id="choice-${idx}">
        <input type="radio" name="choice" value="${idx}" ${checked}>
        <div><strong>${letter}.</strong> ${c.text || ''}</div>
      </label>
      <button class="btn-strike" onclick="toggleStrike(${idx})">✕</button>
    </div>`;
  });
  html += '</div>';

  questionPanel.innerHTML = html;

  // Notes load
  if(userNoteArea) {
    userNoteArea.value = q.userNotes || '';
    document.getElementById('saveNoteStatus').textContent = '';
  }

  // Reset Guess
  const gc = document.getElementById('guessCheck');
  if(gc) gc.checked = false;

  // Smart Search
  const searchTools = document.getElementById('searchTools');
  if(searchTools) {
    let term = (q.tags && q.tags.length) ? q.tags[0] : (q.chapter || '').replace(/Ch\d+\s*/, '');
    if(!term) term = 'Medical';
    searchTools.innerHTML = `
      <span class="tiny muted">Search:</span>
      <a href="https://www.google.com/search?q=${encodeURIComponent(term + ' medical')}" target="_blank" class="search-btn">Google</a>
      <a href="https://www.uptodate.com/contents/search?search=${encodeURIComponent(term)}" target="_blank" class="search-btn">UpToDate</a>
    `;
  }

  renderRelated();
}

// Global Strike function
window.toggleStrike = function(idx) {
  const el = document.getElementById(`choice-${idx}`);
  if(el) el.classList.toggle('strikethrough');
}

async function saveCurrentNote() {
  if (!currentQuestion || !userNoteArea) return;
  const note = userNoteArea.value;
  currentQuestion.userNotes = note;
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(currentQuestion);
  document.getElementById('saveNoteStatus').textContent = 'Saved.';
  setTimeout(() => document.getElementById('saveNoteStatus').textContent='', 1500);
}


// --- BUILDER LOGIC ---
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
      timesSeen: 0,
      timesCorrect: 0,
      timesWrong: 0,
      lastSeenAt: null,
      createdAt: new Date().toISOString(),
      flagged: !!q.flagged,
      maintenance: !!q.maintenance,
      active: q.active !== false,
      tags: Array.isArray(q.tags) ? q.tags : [],
      pinned: !!q.pinned,
      imageUrl: q.imageUrl || '',
      imageData: q.imageData || '',
      srEase: 2.5,
      srInterval: 0,
      srReps: 0,
      dueAt: null
    };
    if (q.id != null) obj.id = q.id;
    store.put(obj);
  });
  tx.oncomplete = () => {
    alert('Imported ' + selected.length + ' questions into bank.');
    refreshChapterOptions();
    reloadAllQuestionsTable();
    loadNextQuestion(true);
  };
}

// --- TABLE REFRESH (Updated with Notes Filter) ---
async function reloadAllQuestionsTable() {
  const tbody = document.getElementById('allTableBody');
  if(!tbody) return;
  tbody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
  
  const all = await getAllQuestions();
  const searchVal = document.getElementById('allSearch').value.toLowerCase().trim();
  const filter = document.getElementById('allFilter').value;
  const sortVal = document.getElementById('allSort').value;

  let arr = all.filter(q => {
    const txt = (q.text + ' ' + q.chapter).toLowerCase();
    if (searchVal && !txt.includes(searchVal)) return false;
    
    if (filter === 'flagged' && !q.flagged) return false;
    if (filter === 'wrong' && !q.timesWrong) return false;
    if (filter === 'notes' && (!q.userNotes || !q.userNotes.trim())) return false;
    if (filter === 'maintenance' && !q.maintenance) return false;
    
    return true;
  });

  // Sort
  arr.sort((a, b) => {
    if (sortVal === 'created_desc') return (b.id - a.id); // approx
    if (sortVal === 'text_asc') return a.text.localeCompare(b.text);
    if (sortVal === 'wrong_desc') return (b.timesWrong || 0) - (a.timesWrong || 0);
    return (b.id - a.id);
  });

  const total = arr.length;
  allTotalPages = Math.max(1, Math.ceil(total / ALL_PAGE_SIZE));
  if (allCurrentPage > allTotalPages) allCurrentPage = allTotalPages;

  const startIdx = (allCurrentPage - 1) * ALL_PAGE_SIZE;
  const endIdx = Math.min(startIdx + ALL_PAGE_SIZE, total);
  const pageItems = arr.slice(startIdx, endIdx);

  tbody.innerHTML = '';
  pageItems.forEach((q) => {
    const tr = document.createElement('tr');
    const tagsStr = Array.isArray(q.tags) ? q.tags.join(', ') : '';
    const noteIcon = q.userNotes ? '📝' : '';
    tr.innerHTML = `
      <td><input type="checkbox" class="row-select" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>${(q.text || '').slice(0, 60)}... ${noteIcon}</td>
      <td>${q.chapter || ''}</td>
      <td>${q.timesSeen || 0}</td>
      <td><button class="pill-btn btn-edit" onclick="editQuestion(${q.id})">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
  
  document.getElementById('allPageInfo').textContent = `Page ${allCurrentPage} / ${allTotalPages} (Total ${total})`;
  updateAllSelectedCount();
}

// --- GITHUB FIX (New Logic) ---
function saveGitHubConfigFromUI() {
  const token = document.getElementById('ghTokenInput').value.trim();
  const repo = document.getElementById('ghRepoInput').value.trim() || 'Awad1992/mcq-data';
  const filename = document.getElementById('ghFileInput').value.trim() || 'mcq_backup.json';

  if (!token) { alert("Token is empty!"); return; }
  
  const cfg = { token, repo, filename };
  saveGitHubConfig(cfg);
  refreshCloudInfo();
  alert("✅ Settings Saved!");
}

async function cloudUpload() {
  try {
    const cfg = loadGitHubConfig();
    if (!cfg.token) throw new Error("No settings saved.");
    const btn = document.getElementById('btnCloudUpload');
    btn.textContent = "Uploading..."; btn.disabled = true;

    const backup = await buildBackupObject();
    const contentStr = JSON.stringify(backup, null, 2);
    const contentB64 = encodeBase64(contentStr);

    const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    let sha = null;
    try {
      const check = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
      if(check.ok) sha = (await check.json()).sha;
    } catch(e) {}

    const body = { message: "Backup", content: contentB64 };
    if(sha) body.sha = sha;

    const res = await fetch(url, {
      method: 'PUT',
      headers: { Authorization: `token ${cfg.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if(!res.ok) throw new Error("GitHub API Error");
    alert("✅ Upload Success!");
  } catch(e) {
    alert("Upload Failed: " + e.message);
  } finally {
    const btn = document.getElementById('btnCloudUpload');
    btn.textContent = "Upload → GitHub"; btn.disabled = false;
  }
}

async function cloudDownload() {
  try {
    const cfg = loadGitHubConfig();
    if (!cfg.token) throw new Error("No settings saved.");
    const btn = document.getElementById('btnCloudDownload');
    btn.textContent = "Downloading..."; btn.disabled = true;

    const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    const res = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
    if(!res.ok) throw new Error("Fetch failed.");

    const json = await res.json();
    const data = JSON.parse(decodeBase64(json.content));
    await importBackupObject(data);
    alert("✅ Downloaded & Merged!");
    loadNextQuestion(true);
  } catch(e) {
    alert("Download Failed: " + e.message);
  } finally {
    const btn = document.getElementById('btnCloudDownload');
    btn.textContent = "Download ← GitHub"; btn.disabled = false;
  }
}

// --- EDIT MODAL (Restored & Globalized) ---
window.editQuestion = function(id) {
  const tx = db.transaction('questions', 'readonly');
  tx.objectStore('questions').get(id).onsuccess = e => {
    const q = e.target.result;
    if(!q) return;
    editingQuestionId = id;
    document.getElementById('editText').value = q.text;
    document.getElementById('editChapter').value = q.chapter;
    document.getElementById('editTags').value = (q.tags||[]).join(', ');
    document.getElementById('editExplanation').value = q.explanation;
    
    const div = document.getElementById('editChoices');
    div.innerHTML = '';
    (q.choices||[]).forEach(c => addChoiceRow(c.text, c.isCorrect));
    
    document.getElementById('editModal').classList.remove('hidden');
  };
}

// Initial DB open
openDB().then(() => {
  loadTheme();
  refreshBackupLabels();
  refreshCloudInfo();
  loadGitHubConfigIntoUI();
  refreshChapterOptions();
  loadPracticePrefs();
  loadNextQuestion(true);
  buildFlashcardPool();
  reloadAllQuestionsTable(); // Ensure table loads
}).catch(err => {
  console.error(err);
  alert('Failed to open local database.');
});
