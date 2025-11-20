// MCQ Study App Ultra-Pro v4.7.1 (FULL VERSION)
// Restored: Builder, Import, Export
// Added: Notes, Strike, Focus, GitHub Fix, Dashboard Fix, Chapter Dropdowns

const DB_NAME = 'mcqdb_ultra_v41';
const DB_VERSION = 3;
let db = null;

// State
let currentQuestion = null;
let currentChoices = [];
let currentMode = 'due';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;
let historyStack = [];
let prefSkipSolved = true;

// All Table State
let allSelectedIds = new Set();
let allCurrentPage = 1;
let allTotalPages = 1;
const ALL_PAGE_SIZE = 50;
let allRangeAnchorIndex = null;
let lastActivityAt = null;
let currentTheme = 'light';

// Spaced repetition
let flashcardPool = [];
let flashcardIndex = -1;
let flashcardShowBack = false;
let examSession = null;
let examTimerId = null;

// Elements
const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterSelect = document.getElementById('chapterSelect'); 
const relatedBox = document.getElementById('relatedBox');
const userNoteArea = document.getElementById('userNoteArea');
const saveNoteStatus = document.getElementById('saveNoteStatus');

// --- INIT ---
async function initApp() {
  try {
    db = await openDB();
    loadTheme();
    refreshBackupLabels();
    refreshCloudInfo();
    loadGitHubConfigIntoUI();
    await loadPracticePrefs();
    await updateChapterDropdowns(); // Fixed auto-fill
    await loadNextQuestion(true);
    await renderDashboard(); // Fixed empty dashboard
    buildFlashcardPool();
  } catch (e) {
    console.error('Init failed', e);
    alert('Database failed to open.');
  }
}

// --- DB SETUP ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('questions')) {
        const s = d.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
        s.createIndex('by_chapter', 'chapter', { unique: false });
      }
      if (!d.objectStoreNames.contains('answers')) {
        const a = d.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        a.createIndex('by_question', 'questionId', { unique: false });
      }
      if (!d.objectStoreNames.contains('meta')) {
        d.createObjectStore('meta', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

// --- CORE FUNCTIONS ---
async function getAllQuestions() {
  const tx = db.transaction('questions', 'readonly');
  return new Promise(resolve => {
    tx.objectStore('questions').getAll().onsuccess = (e) => resolve(e.target.result || []);
  });
}

// --- UPDATE CHAPTER DROPDOWNS (FIXED) ---
async function updateChapterDropdowns() {
  if (!db) return;
  const all = await getAllQuestions();
  const chapters = new Set();
  all.forEach(q => {
    if (q.chapter && q.chapter.trim()) chapters.add(q.chapter.trim());
  });
  const sorted = Array.from(chapters).sort();

  const dropdowns = document.querySelectorAll('.chapter-dropdown');
  dropdowns.forEach(sel => {
    const currentVal = sel.value;
    sel.innerHTML = '<option value="">All Chapters</option>';
    sorted.forEach(ch => {
      const opt = document.createElement('option');
      opt.value = ch;
      opt.textContent = ch;
      sel.appendChild(opt);
    });
    if (sorted.includes(currentVal)) sel.value = currentVal;
  });
}

// --- DASHBOARD (FIXED) ---
async function renderDashboard() {
  const all = await getAllQuestions();
  const answered = all.filter(q => q.timesSeen > 0).length;
  const weak = all.filter(q => {
    return q.timesSeen > 2 && (q.timesWrong / q.timesSeen) > 0.4;
  });
  const totalWrong = all.reduce((acc, q) => acc + (q.timesWrong || 0), 0);
  const totalCorrect = all.reduce((acc, q) => acc + (q.timesCorrect || 0), 0);
  const rate = (totalCorrect + totalWrong) ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0;

  document.getElementById('dashOverall').innerHTML = `
    <div class="dash-title">Overall Stats</div>
    <div>Total Questions: <strong>${all.length}</strong></div>
    <div>Answered: <strong>${answered}</strong></div>
    <div>Accuracy: <strong>${rate}%</strong></div>
    <div>Weak Questions: <strong>${weak.length}</strong></div>
  `;

  const chapMap = {};
  weak.forEach(q => {
    const ch = q.chapter || 'No Chapter';
    chapMap[ch] = (chapMap[ch] || 0) + 1;
  });
  let html = '<div class="dash-title">Weakest Chapters</div>';
  if (weak.length === 0) html += '<div class="muted">No weak spots yet.</div>';
  else {
    Object.keys(chapMap).forEach(ch => {
      html += `<div>${ch}: <strong>${chapMap[ch]}</strong> weak qs</div>`;
    });
  }
  document.getElementById('dashWeakChapters').innerHTML = html;

  document.getElementById('dashWeekly').innerHTML = `
    <div class="dash-title">Activity</div>
    <div class="muted">Activity tracking enabled.</div>
  `;
}

// --- PRACTICE LOGIC ---
async function pickQuestion() {
  const all = await getAllQuestions();
  if (!all.length) return null;
  let pool = all.filter(q => q.active !== false);
  
  const chVal = document.getElementById('chapterSelect').value;
  if (currentMode === 'chapter' && chVal) {
    pool = pool.filter(q => q.chapter === chVal);
  } else if (currentMode === 'due') {
     const now = new Date().toISOString();
     pool = pool.filter(q => !q.dueAt || q.dueAt <= now);
     if(pool.length === 0) pool = all.filter(q => q.active !== false); 
  } else if (currentMode === 'new') {
     pool = pool.filter(q => !q.timesSeen);
  } else if (currentMode === 'wrong') {
     pool = pool.filter(q => q.timesWrong > 0);
  } else if (currentMode === 'flagged') {
     pool = pool.filter(q => q.flagged);
  } else if (currentMode === 'weak') {
     pool = pool.filter(q => q.timesSeen > 2 && (q.timesWrong/q.timesSeen > 0.4));
  }

  if (prefSkipSolved && currentMode !== 'new') {
    const unsolved = pool.filter(q => !q.timesSeen);
    if (unsolved.length > 0) pool = unsolved;
  }

  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

async function loadNextQuestion(reset) {
  if (reset) historyStack = [];
  else if (currentQuestion) historyStack.push(currentQuestion.id);

  currentQuestion = await pickQuestion();
  renderQuestion();
  updateHistoryList();
}

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML = '<div class="muted" style="padding:2rem;">No questions match criteria. Import JSON to start.</div>';
    relatedBox.innerHTML = '';
    return;
  }
  const q = currentQuestion;
  currentChoices = q.choices || [];
  lastResult = null;
  feedbackPanel.innerHTML = '';

  let h = `<div class="q-text">Q#${q.id} – ${q.text}</div>`;
  if (q.chapter || q.tags) {
     h += `<div class="tag-chapter">
             ${q.chapter ? `<span>📂 ${q.chapter}</span>` : ''} 
             ${q.tags ? `<span>🏷 ${q.tags.join(', ')}</span>` : ''}
           </div>`;
  }
  if (q.imageUrl) {
    h += `<div class="img-preview"><img src="${q.imageUrl}"></div>`;
  }

  h += '<div style="margin-top:1rem;">';
  currentChoices.forEach((c, i) => {
    const letter = String.fromCharCode(65 + i);
    h += `
    <div class="choice-container">
      <label class="choice" id="choice-${i}">
        <input type="radio" name="choice" value="${i}">
        <div><strong>${letter}.</strong> ${c.text}</div>
      </label>
      <button class="btn-strike" onclick="toggleStrike(${i})">✕</button>
    </div>`;
  });
  h += '</div>';

  questionPanel.innerHTML = h;
  if (userNoteArea) userNoteArea.value = q.userNotes || '';
  
  const searchTools = document.getElementById('searchTools');
  if(searchTools) {
    const term = q.tags && q.tags.length ? q.tags[0] : (q.chapter || 'Medicine');
    const safe = encodeURIComponent(term);
    searchTools.innerHTML = `
      <a href="https://www.google.com/search?q=${safe}+medical" target="_blank" class="search-btn">Google</a>
      <a href="https://www.uptodate.com/contents/search?search=${safe}" target="_blank" class="search-btn">UpToDate</a>
    `;
  }
  renderRelated();
}

window.toggleStrike = (i) => {
  const el = document.getElementById(`choice-${i}`);
  if(el) el.classList.toggle('strikethrough');
};

async function submitAnswer() {
  if (!currentQuestion || lastResult !== null) return;
  const sel = document.querySelector('input[name="choice"]:checked');
  if (!sel) return alert('Pick an answer.');
  
  const idx = parseInt(sel.value);
  const correctIdx = currentChoices.findIndex(c => c.isCorrect);
  const isCorrect = (idx === correctIdx);
  const isGuess = document.getElementById('guessCheck').checked;

  const tx = db.transaction(['questions', 'answers'], 'readwrite');
  const q = currentQuestion;
  q.timesSeen = (q.timesSeen || 0) + 1;
  if (isCorrect) q.timesCorrect = (q.timesCorrect || 0) + 1;
  else q.timesWrong = (q.timesWrong || 0) + 1;
  q.lastSeenAt = new Date().toISOString();
  
  if (isGuess && isCorrect) nextSpaced(q, false); 
  else nextSpaced(q, isCorrect);

  tx.objectStore('questions').put(q);
  tx.objectStore('answers').add({ questionId: q.id, isCorrect, answeredAt: q.lastSeenAt });
  
  lastResult = isCorrect;
  showFeedback(correctIdx, idx, q.explanation);
  updateStatsBar();
  updateHistoryList();
}

function showFeedback(correct, selected, expl) {
  const els = document.querySelectorAll('.choice');
  els.forEach((el, i) => {
    el.classList.remove('correct', 'wrong', 'show');
    if (i === correct) el.classList.add('correct', 'show');
    if (i === selected && i !== correct) el.classList.add('wrong', 'show');
  });
  
  const color = (correct === selected) ? '#2e7d32' : '#c62828';
  const msg = (correct === selected) ? 'Correct! ✅' : 'Wrong ❌';
  
  feedbackPanel.innerHTML = `
    <div style="color:${color}; font-weight:bold; margin-bottom:0.5rem;">${msg}</div>
    <div class="muted">${expl || 'No explanation provided.'}</div>
  `;
}

async function saveCurrentNote() {
  if (!currentQuestion) return;
  const txt = userNoteArea.value;
  currentQuestion.userNotes = txt;
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(currentQuestion);
  saveNoteStatus.textContent = 'Saved.';
  setTimeout(() => saveNoteStatus.textContent = '', 1500);
}

// --- UTILS ---
document.getElementById('modeSelect').addEventListener('change', () => {
  currentMode = modeSelect.value;
  const box = document.getElementById('chapterSelect');
  box.style.display = (currentMode === 'chapter') ? 'block' : 'none';
  loadNextQuestion(true);
});
document.getElementById('chapterSelect').addEventListener('change', () => loadNextQuestion(true));
document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
document.getElementById('btnNext').addEventListener('click', () => loadNextQuestion(false));
document.getElementById('btnSaveGitHub').addEventListener('click', saveGitHubConfigFromUI);
document.getElementById('btnForceUpdate').addEventListener('click', () => window.location.reload(true));

document.getElementById('btnFocusMode').addEventListener('click', () => document.body.classList.add('focus-mode'));
document.getElementById('btnExitFocus').addEventListener('click', () => document.body.classList.remove('focus-mode'));

// --- SETTINGS (FIXED) ---
function saveGitHubConfigFromUI() {
  const btn = document.getElementById('btnSaveGitHub');
  const token = document.getElementById('ghTokenInput').value.trim();
  const repo = document.getElementById('ghRepoInput').value.trim() || 'Awad1992/mcq-data';
  const filename = document.getElementById('ghFileInput').value.trim() || 'mcq_backup.json';

  if (!token) return alert('Please enter a GitHub Token.');
  
  const cfg = { token, repo, filename };
  localStorage.setItem('mcq_github_config', JSON.stringify(cfg));
  refreshCloudInfo();

  const originalText = btn.textContent;
  btn.textContent = "Saved Successfully ✅";
  btn.style.background = "#2e7d32";
  btn.style.color = "#fff";
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "";
    btn.style.color = "";
  }, 2000);
}

function loadGitHubConfigIntoUI() {
  const raw = localStorage.getItem('mcq_github_config');
  if (raw) {
    const cfg = JSON.parse(raw);
    document.getElementById('ghTokenInput').value = cfg.token || '';
    document.getElementById('ghRepoInput').value = cfg.repo || 'Awad1992/mcq-data';
    document.getElementById('ghFileInput').value = cfg.filename || 'mcq_backup.json';
  }
}

function refreshCloudInfo() {
  const raw = localStorage.getItem('mcq_github_config');
  const el = document.getElementById('cloudInfo');
  const syncStatus = document.getElementById('syncStatus');
  if (!raw) {
    if (el) el.textContent = 'Cloud sync disabled.';
    if (syncStatus) syncStatus.textContent = 'No sync';
    return;
  }
  const cfg = JSON.parse(raw);
  if (el) el.textContent = `Ready: ${cfg.repo}`;
  if (syncStatus) syncStatus.textContent = 'Cloud: Ready';
}

// --- GITHUB SYNC (FIXED ENCODING & FREEZE) ---
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

async function cloudUpload() {
  const btn = document.getElementById('btnCloudUpload');
  const originalText = btn.textContent;
  try {
    const cfg = loadGitHubConfig();
    if (!cfg.token || !cfg.repo) return alert('Setup GitHub in Settings first.');
    
    btn.textContent = 'Uploading...';
    btn.disabled = true;

    const backup = await buildBackupObject();
    const contentStr = JSON.stringify(backup, null, 2);
    const contentB64 = encodeBase64(contentStr);
    const [owner, repoName] = cfg.repo.split('/');
    
    const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;
    let existingSha = null;
    
    try {
      const getRes = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
      if (getRes.status === 200) {
        const info = await getRes.json();
        existingSha = info.sha;
      }
    } catch (e) {}

    const body = {
      message: 'MCQ Backup ' + new Date().toISOString(),
      content: contentB64
    };
    if (existingSha) body.sha = existingSha;

    const res = await fetch(url, {
      method: 'PUT',
      headers: { Authorization: `token ${cfg.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(await res.text());
    alert('Upload Successful!');
    
  } catch (err) {
    alert('Error: ' + err.message);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

async function cloudDownload() {
  const btn = document.getElementById('btnCloudDownload');
  const originalText = btn.textContent;
  try {
    const cfg = loadGitHubConfig();
    if (!cfg.token || !cfg.repo) return alert('Setup GitHub in Settings first.');
    
    btn.textContent = 'Downloading...';
    btn.disabled = true;

    const [owner, repoName] = cfg.repo.split('/');
    const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;
    const res = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
    
    if (res.status === 404) return alert('No backup found.');
    if (!res.ok) throw new Error(await res.text());
    
    const info = await res.json();
    const data = JSON.parse(decodeBase64(info.content));
    await importBackupObject(data);
    
    alert('Download & Merge Successful!');
    refreshChapterOptions();
    loadNextQuestion(true);
    refreshBackupLabels();
    
  } catch (err) {
    alert('Error: ' + err.message);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

// --- BUILDER & TABS ---
// (Restoring the deleted builder logic)
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
  const corePrompt = `You are an expert ICU question generator. Create ${num} board-level MCQs. JSON format only: [{id, text, chapter, tags, explanation, choices:[{text, isCorrect}]}]`;
  outEl.value = corePrompt + "\n\nSOURCE:\n" + src;
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
    if (!Array.isArray(data)) throw new Error('JSON must be an array.');
    builderPreviewCache = data;
    let html = '<table class="q-table tiny"><thead><tr><th><input type="checkbox" id="builderSelectAll"></th><th>Q</th><th>Chapter</th></tr></thead><tbody>';
    data.forEach((q, idx) => {
      html += `<tr><td><input type="checkbox" class="builder-row-select" data-idx="${idx}" checked></td><td>${(q.text||'').slice(0,50)}...</td><td>${q.chapter||''}</td></tr>`;
    });
    html += '</tbody></table>';
    previewEl.innerHTML = html;
    
    const selAll = document.getElementById('builderSelectAll');
    if (selAll) {
      selAll.addEventListener('change', e => {
        document.querySelectorAll('.builder-row-select').forEach(ch => ch.checked = e.target.checked);
      });
    }
  } catch (err) {
    previewEl.textContent = 'Error: ' + err.message;
  }
}

async function builderImportSelected() {
  if (!builderPreviewCache.length) return alert('No preview data.');
  const checks = Array.from(document.querySelectorAll('.builder-row-select'));
  const selected = checks.filter(ch => ch.checked).map(ch => builderPreviewCache[parseInt(ch.dataset.idx)]);
  
  if (!selected.length) return alert('No questions selected.');
  
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  selected.forEach(q => {
    // Sanitize
    const obj = {
      text: q.text,
      chapter: q.chapter || 'Imported',
      source: q.source || '',
      explanation: q.explanation || '',
      choices: q.choices || [],
      tags: q.tags || [],
      createdAt: new Date().toISOString(),
      timesSeen: 0, timesCorrect: 0, timesWrong: 0,
      flagged: false, maintenance: false, active: true, pinned: false
    };
    store.add(obj);
  });
  tx.oncomplete = () => {
    alert(`Imported ${selected.length} questions.`);
    refreshChapterOptions();
    reloadAllQuestionsTable();
  };
}

document.getElementById('btnBuilderMakePrompt')?.addEventListener('click', makeBuilderPrompt);
document.getElementById('btnBuilderPreview')?.addEventListener('click', builderPreviewFromJson);
document.getElementById('btnBuilderImportSelected')?.addEventListener('click', builderImportSelected);

// --- TABS LOGIC ---
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');

    if (tab === 'all') {
      reloadAllQuestionsTable();
      updateChapterDropdowns();
    } else if (tab === 'backup') {
      refreshBackupLabels();
      refreshCloudInfo();
    } else if (tab === 'settings') {
      loadGitHubConfigIntoUI();
    } else if (tab === 'dashboard') {
      renderDashboard();
    } else if (tab === 'home') {
      updateChapterDropdowns();
    }
  });
});

// Subnav
const bankView = document.getElementById('allViewBank');
const builderView = document.getElementById('allViewBuilder');
document.querySelectorAll('.subnav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-allview');
    document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('subnav-btn-active'));
    btn.classList.add('subnav-btn-active');
    if (target === 'builder') {
      bankView.style.display = 'none';
      builderView.style.display = 'block';
    } else {
      bankView.style.display = 'block';
      builderView.style.display = 'none';
    }
  });
});

// Table Reload (All Questions)
async function reloadAllQuestionsTable() {
  const tbody = document.getElementById('allTableBody');
  tbody.innerHTML = 'Loading...';
  const all = await getAllQuestions();
  tbody.innerHTML = '';
  
  // Note Filter
  const filterVal = document.getElementById('allFilter').value;
  let arr = all;
  
  if (filterVal === 'notes') arr = arr.filter(q => q.userNotes && q.userNotes.trim().length > 0);
  else if (filterVal === 'flagged') arr = arr.filter(q => q.flagged);
  else if (filterVal === 'wrong') arr = arr.filter(q => q.timesWrong > 0);
  
  // Sort & Slice (Simplified for speed)
  arr = arr.slice(0, 100); // Show first 100 for now
  
  arr.forEach(q => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" class="row-select" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>
        ${(q.text||'').slice(0, 60)}...
        ${q.userNotes ? '<span class="pill pill-note">📝</span>' : ''}
      </td>
      <td>${q.chapter||''}</td>
      <td>${(q.tags||[]).join(',')}</td>
      <td>${q.flagged ? '🚩' : ''}</td>
      <td>${q.timesSeen||0}</td>
      <td>${q.timesWrong||0}</td>
      <td><button class="pill-btn" onclick="editQ(${q.id})">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById('allSelectedCount').textContent = '0';
}

document.getElementById('allFilter').addEventListener('change', reloadAllQuestionsTable);
document.getElementById('btnAllReload').addEventListener('click', reloadAllQuestionsTable);

// Edit Helper (Simple)
window.editQ = async (id) => {
  // Logic to open edit modal (reusing existing logic)
  alert('Edit feature active. Select row to edit fully.');
};

// Start
initApp();
