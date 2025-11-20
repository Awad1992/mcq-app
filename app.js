// MCQ Ultra-Pro v5.5.0 (Hybrid Engine)
const DB_NAME = 'mcqdb_ultra_v55'; 
const DB_VERSION = 6; 
let db = null;

// --- STATE ---
let state = {
  currentQ: null,
  questions: [],
  tableQs: [],
  selectedIds: new Set(),
  sortField: 'id',
  sortAsc: true,
  tablePage: 1,
  itemsPerPage: 50,
  mode: 'due',
  skipSolved: true,
  rangeMode: false,
  lastCheckedId: null
};

let historyStack = [];
let flashcardPool = [];
let flashcardIndex = -1;
let flashcardShowBack = false;
let examSession = null;

// --- 1. INIT ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    db = await openDB();
    await refreshGlobalCache();
    
    setupEvents();
    loadTheme();
    updateGitHubUI();
    refreshChapterDropdowns();
    renderDashboard();
    
    // Auto-load
    buildFlashcardPool();
    loadNextQuestion(true);
    
    showToast('System Ready 🚀');
  } catch (e) {
    console.error(e);
    alert("Error: " + e.message);
  }
});

// --- 2. DATABASE ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('questions')) {
        const s = d.createObjectStore('questions', { keyPath: 'id' });
        s.createIndex('chapter', 'chapter', { unique: false });
      }
      if (!d.objectStoreNames.contains('answers')) {
        const a = d.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        a.createIndex('qid', 'questionId', { unique: false });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function refreshGlobalCache() {
  const tx = db.transaction('questions', 'readonly');
  state.questions = await new Promise(resolve => {
    tx.objectStore('questions').getAll().onsuccess = (e) => resolve(e.target.result || []);
  });
}

// --- 3. PRACTICE ENGINE ---
async function loadNextQuestion(reset) {
  const panel = document.getElementById('questionPanel');
  const fb = document.getElementById('feedbackPanel');
  panel.innerHTML = '<div class="muted" style="padding:20px;">Loading...</div>';
  fb.style.display = 'none';

  if (reset) historyStack = [];
  else if (state.currentQ) historyStack.push(state.currentQ.id);

  if (state.questions.length === 0) await refreshGlobalCache();
  if (state.questions.length === 0) {
    panel.innerHTML = '<div class="muted">Bank empty. Import JSON in "All Questions".</div>';
    return;
  }

  let pool = state.questions.filter(q => q.active !== false);
  const mode = document.getElementById('modeSelect').value;
  const chap = document.getElementById('chapterSelect').value;

  if (mode === 'chapter' && chap) pool = pool.filter(q => q.chapter === chap);
  if (mode === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
  if (mode === 'flagged') pool = pool.filter(q => q.flagged);
  if (mode === 'new') pool = pool.filter(q => q.timesSeen === 0);
  
  if (state.skipSolved && mode !== 'new') {
    const unsolved = pool.filter(q => q.timesSeen === 0);
    if (unsolved.length > 0) pool = unsolved;
  }

  if (pool.length === 0) {
    panel.innerHTML = '<div class="muted">No questions found. Change filters.</div>';
    state.currentQ = null;
    return;
  }

  const rand = Math.floor(Math.random() * pool.length);
  state.currentQ = pool[rand];
  renderQuestionUI();
}

async function loadPrevQuestion() {
  if (historyStack.length === 0) return showToast("No history");
  const prevId = historyStack.pop();
  state.currentQ = state.questions.find(q => q.id === prevId);
  renderQuestionUI();
}

async function toggleFlagCurrent() {
  if (!state.currentQ) return;
  state.currentQ.flagged = !state.currentQ.flagged;
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(state.currentQ);
  renderQuestionUI();
  showToast(state.currentQ.flagged ? "Flagged" : "Unflagged");
}

function renderQuestionUI() {
  const q = state.currentQ;
  const panel = document.getElementById('questionPanel');
  const noteArea = document.getElementById('userNoteArea');
  const flagBtn = document.getElementById('btnFlag');

  if(flagBtn) {
    flagBtn.textContent = q.flagged ? 'Flagged 🚩' : 'Flag ⚐';
    flagBtn.style.color = q.flagged ? 'var(--danger)' : '';
  }

  let html = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
  if(q.imageUrl) html += `<div style="margin-bottom:15px;"><img src="${q.imageUrl}" style="max-width:100%; border-radius:8px;"></div>`;
  
  html += '<div style="display:flex; flex-direction:column; gap:10px;">';
  (q.choices||[]).forEach((c, i) => {
    const char = String.fromCharCode(65+i);
    html += `
    <div class="choice-container">
      <label class="choice" id="c_${i}">
        <input type="radio" name="ans" value="${i}">
        <span><strong>${char}.</strong> ${c.text}</span>
      </label>
      <button class="btn-strike" onclick="strike(${i})">✕</button>
    </div>`;
  });
  html += '</div>';
  
  panel.innerHTML = html;
  if(noteArea) noteArea.value = q.userNotes || '';
  document.getElementById('saveNoteStatus').textContent = '';
  document.getElementById('guessCheck').checked = false;

  // Search Tools
  const tools = document.getElementById('searchTools');
  if(tools) {
    const term = encodeURIComponent(q.chapter || 'Medicine');
    tools.innerHTML = `
      <a href="https://www.google.com/search?q=${term}" target="_blank" class="search-btn pill-btn">Google</a>
      <a href="https://www.uptodate.com/contents/search?search=${term}" target="_blank" class="search-btn pill-btn">UpToDate</a>
    `;
  }
}

window.strike = (i) => {
  const el = document.getElementById(`c_${i}`);
  if(el) el.classList.toggle('strikethrough');
};

async function submitAnswer() {
  if (!state.currentQ) return;
  const sel = document.querySelector('input[name="ans"]:checked');
  if (!sel) return showToast('Select an answer', 'error');
  
  const idx = parseInt(sel.value);
  const correctIdx = state.currentQ.choices.findIndex(c => c.isCorrect);
  const isCorrect = (idx === correctIdx);

  const fb = document.getElementById('feedbackPanel');
  fb.style.display = 'block';
  fb.innerHTML = `
    <div style="font-weight:bold; color:${isCorrect?'var(--success)':'var(--danger)'}; margin-bottom:10px; font-size:1.1rem;">
      ${isCorrect ? 'Correct! 🎉' : 'Wrong ❌'}
    </div>
    <div class="muted">${state.currentQ.explanation || 'No explanation.'}</div>
  `;

  document.getElementById(`c_${correctIdx}`).classList.add('correct','show');
  if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong','show');

  // Stats
  const q = state.currentQ;
  q.timesSeen = (q.timesSeen||0) + 1;
  if(isCorrect) q.timesCorrect = (q.timesCorrect||0) + 1;
  else q.timesWrong = (q.timesWrong||0) + 1;

  const tx = db.transaction(['questions', 'answers'], 'readwrite');
  tx.objectStore('questions').put(q);
  tx.objectStore('answers').add({ qid: q.id, correct: isCorrect, timestamp: new Date() });
}

async function saveNote() {
  if(!state.currentQ) return;
  state.currentQ.userNotes = document.getElementById('userNoteArea').value;
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(state.currentQ);
  document.getElementById('saveNoteStatus').textContent = 'Saved';
}

// --- 4. TABLE & RANGE SELECTION ---
function toggleRangeMode() {
  state.rangeMode = !state.rangeMode;
  const btn = document.getElementById('btnRangeMode');
  btn.classList.toggle('range-active', state.rangeMode);
  btn.textContent = state.rangeMode ? "✨ Range ON" : "✨ Range Select";
  state.lastCheckedId = null;
  showToast(state.rangeMode ? "Shift logic enabled" : "Normal selection");
}

function handleCheckbox(e, id) {
  if (state.rangeMode && state.lastCheckedId !== null && e.target.checked) {
    const allIds = state.tableQs.map(q => q.id);
    const start = allIds.indexOf(state.lastCheckedId);
    const end = allIds.indexOf(id);
    if (start > -1 && end > -1) {
      const min = Math.min(start, end);
      const max = Math.max(start, end);
      for(let i=min; i<=max; i++) state.selectedIds.add(allIds[i]);
    }
  } else {
    if(e.target.checked) state.selectedIds.add(id);
    else state.selectedIds.delete(id);
  }
  if(e.target.checked) state.lastCheckedId = id;
  updateSelCount();
  renderTablePage();
}

function applyTableFilters() {
  const search = document.getElementById('allSearch').value.toLowerCase();
  const type = document.getElementById('allFilter').value;
  const chap = document.getElementById('allChapterSelect').value;

  state.tableQs = state.questions.filter(q => {
    if (search && !q.text.toLowerCase().includes(search) && String(q.id) !== search) return false;
    if (chap && q.chapter !== chap) return false;
    if (type === 'notes' && !q.userNotes) return false;
    if (type === 'wrong' && (!q.timesWrong || q.timesWrong===0)) return false;
    if (type === 'flagged' && !q.flagged) return false;
    if (type === 'unseen' && q.timesSeen > 0) return false;
    return true;
  });

  state.tablePage = 1;
  state.selectedIds.clear();
  updateSelCount();
  sortTable(state.sortField, false);
}

function sortTable(field, toggle = true) {
  if (toggle) {
    if (state.sortField === field) state.sortAsc = !state.sortAsc;
    else { state.sortField = field; state.sortAsc = true; }
  }
  
  // Sort Logic
  state.tableQs.sort((a, b) => {
    let valA = a[field] || 0;
    let valB = b[field] || 0;
    if (typeof valA === 'string') { valA = valA.toLowerCase(); valB = valB.toLowerCase(); }
    if (valA < valB) return state.sortAsc ? -1 : 1;
    if (valA > valB) return state.sortAsc ? 1 : -1;
    return 0;
  });
  
  // Visuals
  document.querySelectorAll('th.sortable').forEach(th => {
    const base = th.dataset.sort;
    th.textContent = (base === field) ? (base.toUpperCase() + (state.sortAsc ? ' ↑' : ' ↓')) : (base.toUpperCase() + ' ↕');
  });

  renderTablePage();
}

function renderTablePage() {
  const tbody = document.getElementById('allTableBody');
  tbody.innerHTML = '';
  const start = (state.tablePage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const pageData = state.tableQs.slice(start, end);

  pageData.forEach(q => {
    const tr = document.createElement('tr');
    const isSel = state.selectedIds.has(q.id);
    const dateStr = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '-';
    
    tr.innerHTML = `
      <td><input type="checkbox" class="row-cb" ${isSel?'checked':''}></td>
      <td>${q.id}</td>
      <td class="tiny muted">${dateStr}</td>
      <td>${q.text.substring(0,50)}... ${q.userNotes?'📝':''}</td>
      <td>${q.chapter||'-'}</td>
      <td>${q.timesSeen||0}</td>
      <td>${q.timesWrong||0}</td>
      <td><button class="pill-btn" onclick="openEditModal(${q.id})">✏️</button></td>
    `;
    
    tr.querySelector('.row-cb').addEventListener('click', (e) => handleCheckbox(e, q.id));
    tbody.appendChild(tr);
  });

  document.getElementById('allPageInfo').textContent = `Page ${state.tablePage} / ${Math.ceil(state.tableQs.length/state.itemsPerPage)||1}`;
}

// --- 5. IMPORT (FIXED) ---
async function handleFileImport() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (!Array.isArray(json)) throw new Error("Not JSON Array");

      let maxId = 0;
      state.questions.forEach(q => { if (q.id > maxId) maxId = q.id; });
      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');

      for (const q of json) {
        // Logic: If ID exists or invalid, assign new
        let newId = parseInt(String(q.id).replace(/\D/g, ''));
        if (!newId || state.questions.some(x => x.id === newId)) {
             maxId++;
             newId = maxId;
        }
        const safeQ = {
          ...q, // Keep all props
          id: newId,
          createdAt: q.createdAt || new Date().toISOString(),
          timesSeen: q.timesSeen || 0,
          timesWrong: q.timesWrong || 0,
          active: true
        };
        store.put(safeQ);
      }

      tx.oncomplete = async () => {
        showToast('Import Successful!');
        await refreshGlobalCache();
        applyTableFilters();
      };
    } catch (err) { alert(err.message); }
  };
  reader.readAsText(file);
}

// --- 6. SETTINGS & EVENTS (BOILERPLATE) ---
function setupEvents() {
  document.querySelectorAll('.tab-button').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
  document.getElementById('btnNext').addEventListener('click', () => loadNextQuestion(false));
  document.getElementById('btnPrev').addEventListener('click', loadPrevQuestion);
  document.getElementById('btnFlag').addEventListener('click', toggleFlagCurrent);
  document.getElementById('modeSelect').addEventListener('change', handleModeChange);
  
  document.getElementById('btnAllApply').addEventListener('click', applyTableFilters);
  document.getElementById('btnRangeMode').addEventListener('click', toggleRangeMode);
  document.getElementById('btnAllDelete').addEventListener('click', deleteSelected);
  
  // Pagination
  document.getElementById('allPrevPage').addEventListener('click', () => { if(state.tablePage>1) { state.tablePage--; renderTablePage(); }});
  document.getElementById('allNextPage').addEventListener('click', () => { state.tablePage++; renderTablePage(); });
  
  // Sort headers
  document.querySelectorAll('th.sortable').forEach(th => th.addEventListener('click', () => sortTable(th.dataset.sort)));
  
  // Import/Export
  document.getElementById('btnImport').addEventListener('click', () => document.getElementById('fileInput').click());
  document.getElementById('fileInput').addEventListener('change', handleFileImport);
  document.getElementById('btnExport').addEventListener('click', exportQuestions);
  
  // Settings
  document.getElementById('btnSaveGitHub').addEventListener('click', saveGitHubSettings);
  document.getElementById('btnForceUpdate').addEventListener('click', () => window.location.reload(true));
  
  // Notes
  document.getElementById('userNoteArea').addEventListener('input', debounce(saveNote, 1000));
}

function switchTab(tab) {
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.getElementById(`tab-${tab}`).classList.add('active');
  if(tab==='all') applyTableFilters();
  if(tab==='dashboard') renderDashboard();
}

function showToast(msg, type='success') {
  const div = document.createElement('div');
  div.className = `toast ${type}`;
  div.textContent = msg;
  document.getElementById('toastContainer').appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

function debounce(func, wait) {
  let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>func.apply(this,args),wait); };
}

// --- HELPERS ---
function refreshChapterDropdowns() {
  const chapters = new Set();
  state.questions.forEach(q => { if(q.chapter) chapters.add(q.chapter); });
  const selects = document.querySelectorAll('.chapter-dropdown');
  selects.forEach(s => {
     s.innerHTML = '<option value="">Select Chapter...</option>';
     Array.from(chapters).sort().forEach(c => s.innerHTML += `<option value="${c}">${c}</option>`);
  });
}

function renderDashboard() {
  const total = state.questions.length;
  const seen = state.questions.filter(q => q.timesSeen > 0).length;
  // Create visual bar
  const pct = total ? Math.round((seen/total)*100) : 0;
  const barHtml = `<div class="progress-container"><div class="progress-bar" style="width:${pct}%"></div></div>`;
  
  document.getElementById('dashOverall').innerHTML = `<h3>Progress</h3><p>${seen} / ${total} Questions</p>${barHtml}`;
}

// Placeholders for GitHub/Flashcards (Standard Logic)
function saveGitHubSettings() { showToast("Settings Saved"); }
function updateGitHubUI() { /* Check localStorage */ }
function updateSelCount() { document.getElementById('allSelectedCount').textContent = `${state.selectedIds.size} Selected`; }
function deleteSelected() { /* Delete logic */ }
function exportQuestions() { /* Blob logic */ }
function buildFlashcardPool() { /* FC logic */ }
function toggleSelectAll(e) { /* Select All logic */ document.getElementById('allSelectAll').addEventListener('change', toggleSelectAll);}
