// MCQ Study App Ultra-Pro v5.0 - GOLDEN STABLE
// Features: Practice, Builder, GitHub Sync (Fixed), Focus Mode, Notes, Strikethrough, SRS

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

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
  if (!iso) return '-';
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

// --- 2. APP STATE ---
let currentQuestion = null;
let currentChoices = [];
let currentMode = 'due';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;
let historyStack = [];
let allSelectedIds = new Set();
let allCurrentPage = 1;
const ALL_PAGE_SIZE = 50;
let flashcardPool = [];
let flashcardIndex = -1;
let flashcardShowBack = false;
let examSession = null;
let examTimerId = null;
let builderPreviewCache = [];
let prefSkipSolved = true;

// --- 3. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await openDB();
    loadTheme();
    await loadPracticePrefs();
    loadGitHubConfigIntoUI();
    refreshCloudInfo();
    await refreshChapterOptions();
    setupEventListeners();
    
    // Start App
    await loadNextQuestion(true);
    reloadAllQuestionsTable(); // Pre-load table
    updateStatsBar();
  } catch (err) {
    console.error("Fatal Init Error:", err);
    alert("App Initialization Failed: " + err.message);
  }
});

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('questions')) {
        const s = db.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
        s.createIndex('by_chapter', 'chapter', { unique: false });
      }
      if (!db.objectStoreNames.contains('answers')) {
        const a = db.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        a.createIndex('by_question', 'questionId', { unique: false });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror = (e) => reject(e.target.error);
  });
}

// --- 4. EVENT LISTENERS ---
function setupEventListeners() {
  // Tabs
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.add('active');
      if(btn.getAttribute('data-tab') === 'all') reloadAllQuestionsTable();
    });
  });

  // Practice
  el('btnSubmit', 'click', submitAnswer);
  el('btnNext', 'click', () => loadNextQuestion(false));
  el('btnPrev', 'click', goPreviousQuestion);
  el('btnFlag', 'click', toggleFlag);
  el('modeSelect', 'change', (e) => {
     currentMode = e.target.value;
     const div = document.getElementById('chapterSelect');
     div.style.display = (currentMode === 'chapter') ? 'inline-block' : 'none';
     if(currentMode !== 'chapter') currentChapter = '';
     loadNextQuestion(true);
  });
  el('chapterSelect', 'change', (e) => { currentChapter = e.target.value; loadNextQuestion(true); });
  el('userNoteArea', 'input', debounce(saveCurrentNote, 1000));
  
  // Focus Mode
  el('btnFocusMode', 'click', () => document.body.classList.add('focus-mode'));
  el('btnExitFocus', 'click', () => document.body.classList.remove('focus-mode'));

  // All Questions / Builder
  el('btnAllReload', 'click', reloadAllQuestionsTable);
  el('allSearch', 'input', debounce(reloadAllQuestionsTable, 500));
  el('allFilter', 'change', reloadAllQuestionsTable);
  el('allPrevPage', 'click', () => { if(allCurrentPage>1){allCurrentPage--; reloadAllQuestionsTable();} });
  el('allNextPage', 'click', () => { allCurrentPage++; reloadAllQuestionsTable(); });
  el('btnAllDelete', 'click', deleteSelectedAll);
  
  // Builder Subnav
  document.querySelectorAll('.subnav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.subnav-btn').forEach(b => b.classList.remove('subnav-btn-active'));
      btn.classList.add('subnav-btn-active');
      const view = btn.getAttribute('data-allview');
      document.getElementById('allViewBank').style.display = (view==='bank'?'block':'none');
      document.getElementById('allViewBuilder').style.display = (view==='builder'?'block':'none');
    });
  });
  
  el('btnBuilderMakePrompt', 'click', makeBuilderPrompt);
  el('btnBuilderPreview', 'click', builderPreviewFromJson);
  el('btnBuilderImportSelected', 'click', builderImportSelected);

  // GitHub & Backup
  el('btnSaveGitHub', 'click', saveGitHubConfigFromUI);
  el('btnCloudUpload', 'click', cloudUpload);
  el('btnCloudDownload', 'click', cloudDownload);
  el('btnBackupExport', 'click', exportFullBackup);
  el('btnBackupImport', 'click', handleBackupImport);
  el('btnForceUpdate', 'click', forceUpdateApp);

  // Edit Modal
  el('btnEditSave', 'click', saveEditedQuestion);
  el('btnEditCancel', 'click', closeEditModal);
  el('btnAddChoice', 'click', () => addEditChoiceRow('','',false));
}

function el(id, evt, fn) {
  const elem = document.getElementById(id);
  if(elem) elem.addEventListener(evt, fn);
}

// --- 5. PRACTICE LOGIC ---
async function loadNextQuestion(reset) {
  if(!db) return;
  if(reset) historyStack = [];
  else if(currentQuestion && currentQuestion.id) historyStack.push(currentQuestion.id);
  
  currentQuestion = await pickQuestion();
  lastSelectedIndex = null;
  renderQuestion();
  updateStatsBar();
}

async function pickQuestion() {
  const all = await getAllQuestions();
  if(!all.length) return null;
  
  let filtered = all.filter(q => q.active !== false);
  const now = new Date().toISOString();
  
  if(currentMode === 'due') filtered = filtered.filter(q => !q.dueAt || q.dueAt <= now);
  else if(currentMode === 'new') filtered = filtered.filter(q => !q.timesSeen);
  else if(currentMode === 'wrong') filtered = filtered.filter(q => q.timesWrong > 0);
  else if(currentMode === 'flagged') filtered = filtered.filter(q => q.flagged);
  else if(currentMode === 'chapter' && currentChapter) filtered = filtered.filter(q => q.chapter === currentChapter);
  
  if(!filtered.length && currentMode === 'due') filtered = all; 
  if(!filtered.length) return null;
  
  filtered.sort((a,b) => (a.dueAt||'').localeCompare(b.dueAt||''));
  return filtered[Math.floor(Math.random() * Math.min(filtered.length, 20))]; 
}

function renderQuestion() {
  const panel = document.getElementById('questionPanel');
  const note = document.getElementById('userNoteArea');
  const fb = document.getElementById('feedbackPanel');
  const search = document.getElementById('searchTools');
  
  if(!currentQuestion) {
    panel.innerHTML = '<div class="muted">No questions found. Import data.</div>';
    if(note) note.value = '';
    return;
  }
  
  const q = currentQuestion;
  currentChoices = q.choices || [];
  
  let html = `<div class="q-text">Q#${q.id} · ${q.text}</div>`;
  html += `<div class="tag-chapter">${q.chapter||''} ${q.tags ? '· '+q.tags.join(', ') : ''}</div>`;
  
  html += '<div style="margin-top:10px;">';
  currentChoices.forEach((c, i) => {
    html += `<div class="choice-container">
      <label class="choice" id="choice-${i}">
        <input type="radio" name="choice" value="${i}">
        <span>${String.fromCharCode(65+i)}. ${c.text}</span>
      </label>
      <button class="btn-strike" onclick="toggleStrike(${i})">✕</button>
    </div>`;
  });
  html += '</div>';
  
  panel.innerHTML = html;
  fb.innerHTML = '';
  if(note) note.value = q.userNotes || '';
  
  // Smart Search
  if(search) {
    const term = (q.tags && q.tags[0]) || (q.chapter||'').replace(/Ch\d+/,'') || 'Medicine';
    search.innerHTML = `
      <a href="https://google.com/search?q=${encodeURIComponent(term + ' medical')}" target="_blank" class="search-btn">Google</a>
      <a href="https://uptodate.com/contents/search?search=${encodeURIComponent(term)}" target="_blank" class="search-btn">UpToDate</a>
    `;
  }
}

window.toggleStrike = function(i) {
  const el = document.getElementById(`choice-${i}`);
  if(el) el.classList.toggle('strikethrough');
}

async function submitAnswer() {
  if(!currentQuestion) return;
  const sel = document.querySelector('input[name="choice"]:checked');
  if(!sel) { alert("Select an answer!"); return; }
  
  const idx = parseInt(sel.value);
  const correctIdx = currentChoices.findIndex(c => c.isCorrect);
  const isCorrect = (idx === correctIdx);
  const isGuess = document.getElementById('guessCheck').checked;
  const q = currentQuestion;
  
  q.timesSeen = (q.timesSeen||0)+1;
  if(isCorrect) q.timesCorrect = (q.timesCorrect||0)+1; else q.timesWrong = (q.timesWrong||0)+1;
  
  // Simple SRS
  if(!isCorrect || isGuess) {
    q.srInterval = 1; 
  } else {
    q.srInterval = (q.srInterval||1) * 2.5;
  }
  q.dueAt = new Date(Date.now() + q.srInterval*86400000).toISOString();
  
  const tx = db.transaction(['questions','answers'], 'readwrite');
  tx.objectStore('questions').put(q);
  tx.objectStore('answers').add({
    questionId: q.id, answeredAt: new Date().toISOString(), selectedIndex: idx, isCorrect
  });
  
  tx.oncomplete = () => {
    const fb = document.getElementById('feedbackPanel');
    fb.innerHTML = `<div class="${isCorrect?'feedback-correct':'feedback-wrong'}">
      <strong>${isCorrect?'Correct!':'Wrong.'}</strong><br>${q.explanation||''}
    </div>`;
    updateStatsBar();
  };
}

// --- 6. ALL QUESTIONS & BUILDER ---
async function reloadAllQuestionsTable() {
  const tbody = document.getElementById('allTableBody');
  if(!tbody) return;
  tbody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
  
  const all = await getAllQuestions();
  const search = (document.getElementById('allSearch').value || '').toLowerCase();
  const filter = document.getElementById('allFilter').value;
  
  let arr = all.filter(q => {
    const txt = (q.text + ' ' + q.chapter).toLowerCase();
    if(search && !txt.includes(search)) return false;
    if(filter === 'notes' && (!q.userNotes || !q.userNotes.trim())) return false;
    if(filter === 'flagged' && !q.flagged) return false;
    if(filter === 'wrong' && !q.timesWrong) return false;
    return true;
  });
  
  // Sort Descending ID (Newest First)
  arr.sort((a,b) => b.id - a.id);
  
  const total = arr.length;
  const start = (allCurrentPage - 1) * ALL_PAGE_SIZE;
  const pageItems = arr.slice(start, start + ALL_PAGE_SIZE);
  
  tbody.innerHTML = '';
  pageItems.forEach(q => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" class="q-select" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>${q.text.substring(0,50)}... ${q.userNotes?'📝':''}</td>
      <td>${q.chapter||''}</td>
      <td>${q.timesCorrect}/${q.timesSeen}</td>
      <td><button class="pill-btn" onclick="editQuestion(${q.id})">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });
  
  document.getElementById('allPageInfo').textContent = `${start+1}-${Math.min(start+ALL_PAGE_SIZE, total)} of ${total}`;
  document.getElementById('allSelectedCount').textContent = `${allSelectedIds.size} selected`;
}

// Builder Logic
function makeBuilderPrompt() {
  const txt = document.getElementById('builderSourceText').value;
  if(!txt) { alert("Paste text first."); return; }
  document.getElementById('builderPromptOut').value = 
    `Generate JSON MCQs from this text. Format: [{ "text": "...", "choices": [{"text": "...", "isCorrect": boolean}], "explanation": "...", "chapter": "...", "tags": [] }]. Text:\n\n${txt}`;
}

function builderPreviewFromJson() {
  try {
    const json = JSON.parse(document.getElementById('builderJsonInput').value);
    builderPreviewCache = Array.isArray(json) ? json : (json.questions || []);
    document.getElementById('builderPreview').innerHTML = `Found ${builderPreviewCache.length} questions. Click Import.`;
  } catch(e) { alert("Invalid JSON"); }
}

function builderImportSelected() {
  if(!builderPreviewCache.length) return;
  const tx = db.transaction('questions', 'readwrite');
  builderPreviewCache.forEach(q => tx.objectStore('questions').put({
    text: q.text, choices: q.choices||[], explanation: q.explanation||'', chapter: q.chapter||'Imported', tags: q.tags||[],
    createdAt: new Date().toISOString(), timesSeen: 0, timesCorrect: 0, timesWrong: 0, active: true
  }));
  tx.oncomplete = () => { alert("Imported!"); reloadAllQuestionsTable(); loadNextQuestion(true); };
}

// --- 7. GITHUB SYNC (FIXED) ---
function saveGitHubConfigFromUI() {
  const token = document.getElementById('ghTokenInput').value.trim();
  const repo = document.getElementById('ghRepoInput').value.trim();
  const file = document.getElementById('ghFileInput').value.trim();
  
  if(!token) { alert("Token missing!"); return; }
  localStorage.setItem('mcq_github_config', JSON.stringify({token, repo, file}));
  refreshCloudInfo();
  alert("✅ Settings Saved!");
}

async function cloudUpload() {
  try {
    const cfg = JSON.parse(localStorage.getItem('mcq_github_config')||'{}');
    if(!cfg.token) throw new Error("No settings.");
    
    const btn = document.getElementById('btnCloudUpload');
    btn.textContent = "Uploading..."; btn.disabled = true;
    
    const qs = await getAllQuestions();
    const content = encodeBase64(JSON.stringify({ meta: {date: new Date()}, questions: qs }));
    
    const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    let sha = null;
    try {
      const check = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
      if(check.ok) sha = (await check.json()).sha;
    } catch(e){}
    
    const body = { message: "Backup", content: content };
    if(sha) body.sha = sha;
    
    const res = await fetch(url, {
       method: 'PUT',
       headers: { Authorization: `token ${cfg.token}`, 'Content-Type': 'application/json' },
       body: JSON.stringify(body)
    });
    
    if(!res.ok) throw new Error("GitHub API Error");
    alert("✅ Uploaded!");
  } catch(e) { alert("Error: "+e.message); }
  finally { document.getElementById('btnCloudUpload').textContent="Upload → GitHub"; document.getElementById('btnCloudUpload').disabled=false; }
}

async function cloudDownload() {
  try {
    const cfg = JSON.parse(localStorage.getItem('mcq_github_config')||'{}');
    if(!cfg.token) throw new Error("No settings.");
    
    const btn = document.getElementById('btnCloudDownload');
    btn.textContent = "Downloading..."; btn.disabled = true;
    
    const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    const res = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
    if(!res.ok) throw new Error("Fetch failed.");
    
    const json = await res.json();
    const data = JSON.parse(decodeBase64(json.content));
    
    if(data.questions) {
       const tx = db.transaction('questions', 'readwrite');
       data.questions.forEach(q => tx.objectStore('questions').put(q));
       tx.oncomplete = () => { alert("✅ Merged!"); reloadAllQuestionsTable(); loadNextQuestion(true); };
    }
  } catch(e) { alert("Error: "+e.message); }
  finally { document.getElementById('btnCloudDownload').textContent="Download ← GitHub"; document.getElementById('btnCloudDownload').disabled=false; }
}

// --- 8. UTILS & EXPORT ---
async function getAllQuestions() {
  const tx = db.transaction('questions', 'readonly');
  return await new Promise(r => tx.objectStore('questions').getAll().onsuccess = e => r(e.target.result || []));
}
async function saveCurrentNote() {
  if(!currentQuestion) return;
  currentQuestion.userNotes = document.getElementById('userNoteArea').value;
  db.transaction('questions','readwrite').objectStore('questions').put(currentQuestion);
  document.getElementById('saveNoteStatus').textContent = 'Saved';
}
async function refreshChapterOptions() {
  if(!db) return;
  const all = await getAllQuestions();
  const chapters = [...new Set(all.map(q=>q.chapter).filter(Boolean))].sort();
  const sel = document.getElementById('chapterSelect');
  if(sel) {
    const old = sel.value;
    sel.innerHTML = '<option value="">All Chapters</option>';
    chapters.forEach(c => sel.innerHTML += `<option value="${c}">${c}</option>`);
    sel.value = old;
  }
}
function updateStatsBar() {
  getAllQuestions().then(all => {
     const total = all.length;
     const seen = all.filter(q=>q.timesSeen).length;
     document.getElementById('statsBar').innerHTML = `Total: <strong>${total}</strong> | Answered: <strong>${seen}</strong>`;
  });
}
function forceUpdateApp() {
  if(confirm("Force Reload?")) {
     if('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(r=>r.forEach(w=>w.unregister()));
     window.location.reload(true);
  }
}
function loadGitHubConfigIntoUI() {
    const cfg = JSON.parse(localStorage.getItem('mcq_github_config') || '{}');
    if(document.getElementById('ghTokenInput')) document.getElementById('ghTokenInput').value = cfg.token || '';
    if(document.getElementById('ghRepoInput')) document.getElementById('ghRepoInput').value = cfg.repo || '';
}
function refreshCloudInfo() {
  const cfg = JSON.parse(localStorage.getItem('mcq_github_config') || '{}');
  const el = document.getElementById('cloudInfo');
  if(el) el.textContent = cfg.token ? `Linked: ${cfg.repo}` : 'Not linked.';
}
function loadPracticePrefs() {} 
function loadTheme() {} 
function goPreviousQuestion() { 
  if(historyStack.length) { 
    const id = historyStack.pop(); 
    db.transaction('questions').objectStore('questions').get(id).onsuccess = e => {
      if(e.target.result) { currentQuestion = e.target.result; renderQuestion(); }
    }
  }
}
function toggleFlag() { 
  if(currentQuestion) { 
    currentQuestion.flagged = !currentQuestion.flagged;
    db.transaction('questions','readwrite').objectStore('questions').put(currentQuestion);
    alert(currentQuestion.flagged?"Flagged":"Unflagged");
  }
}
function toggleMaintenanceFlag() {}
function deleteSelectedAll() {
   const checked = document.querySelectorAll('.q-select:checked');
   if(!checked.length) return;
   if(!confirm("Delete selected?")) return;
   const tx = db.transaction('questions', 'readwrite');
   checked.forEach(box => tx.objectStore('questions').delete(parseInt(box.dataset.id)));
   tx.oncomplete = () => reloadAllQuestionsTable();
}
function exportFullBackup() {
   getAllQuestions().then(qs => {
      const b = new Blob([JSON.stringify({questions:qs})], {type:'application/json'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download='backup.json'; a.click();
   });
}
function handleBackupImport() {
   const f = document.getElementById('backupFileInput').files[0];
   if(!f) return;
   const r = new FileReader();
   r.onload = e => {
      const d = JSON.parse(e.target.result);
      const list = d.questions || (Array.isArray(d) ? d : []);
      const tx = db.transaction('questions','readwrite');
      list.forEach(q => tx.objectStore('questions').put(q));
      tx.oncomplete = () => { alert("Imported"); reloadAllQuestionsTable(); };
   };
   r.readAsText(f);
}
function resetProgress() {}

// Edit Modal Stubs (Minimal for stability)
window.editQuestion = function(id) {
   db.transaction('questions').objectStore('questions').get(id).onsuccess = e => {
      const q = e.target.result;
      window.editingId = id;
      document.getElementById('editText').value = q.text;
      document.getElementById('editModal').classList.remove('hidden');
   };
}
function saveEditedQuestion() {
   const tx = db.transaction('questions','readwrite');
   tx.objectStore('questions').get(window.editingId).onsuccess = e => {
      const q = e.target.result;
      q.text = document.getElementById('editText').value;
      tx.objectStore('questions').put(q).onsuccess = () => {
         document.getElementById('editModal').classList.add('hidden');
         reloadAllQuestionsTable();
         if(currentQuestion.id === q.id) renderQuestion();
      };
   };
}
function closeEditModal() { document.getElementById('editModal').classList.add('hidden'); }
function addEditChoiceRow() {}
