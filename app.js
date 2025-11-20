// MCQ Ultra-Pro v5.1.0 (Professional Edition)
const DB_NAME = 'mcqdb_ultra_v51'; 
const DB_VERSION = 6; 
let db = null;

// --- APP STATE ---
let state = {
  currentQ: null,
  questions: [],
  tableQs: [],
  selectedIds: new Set(),
  sortField: 'createdAt', // Default sort by Date
  sortAsc: false, // Newest first
  tablePage: 1,
  itemsPerPage: 50,
  mode: 'due',
  skipSolved: true,
  rangeMode: false, // Shift-select mode
  lastCheckedId: null // For range select
};

let historyStack = [];
let flashcardPool = [];
let flashcardIndex = -1;
let flashcardShowBack = false;

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    db = await openDB();
    await refreshGlobalCache();
    
    setupEventListeners();
    loadTheme();
    updateGitHubUI();
    refreshChapterDropdowns();
    renderDashboard();
    
    // Ensure flashcards and exam pools are ready
    buildFlashcardPool(); 
    loadNextQuestion(true);
    
    showToast('System Ready ✅', 'success');
  } catch (e) {
    console.error(e);
    alert("Critical Init Error: " + e.message);
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

// --- 3. TOAST SYSTEM ---
function showToast(msg, type = 'success') {
  const con = document.getElementById('toastContainer');
  const div = document.createElement('div');
  div.className = `toast ${type}`;
  div.textContent = msg;
  con.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// --- 4. THEME ---
function loadTheme() {
  const saved = localStorage.getItem('mcq_theme') || 'light';
  document.body.className = `theme-${saved}`;
  const sel = document.getElementById('themeSelect');
  if (sel) {
    sel.value = saved;
    sel.addEventListener('change', () => {
       localStorage.setItem('mcq_theme', sel.value);
       document.body.className = `theme-${sel.value}`;
    });
  }
}

// --- 5. EVENTS ---
function setupEventListeners() {
  // Tabs
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Practice
  document.getElementById('btnSubmit')?.addEventListener('click', submitAnswer);
  document.getElementById('btnNext')?.addEventListener('click', () => loadNextQuestion(false));
  document.getElementById('btnPrev')?.addEventListener('click', loadPrevQuestion);
  document.getElementById('btnFlag')?.addEventListener('click', toggleFlagCurrent);
  document.getElementById('modeSelect')?.addEventListener('change', handleModeChange);
  document.getElementById('prefSkipSolved')?.addEventListener('change', (e) => state.skipSolved = e.target.checked);

  // Tools
  document.getElementById('btnFocusMode')?.addEventListener('click', () => document.body.classList.add('focus-mode'));
  document.getElementById('btnExitFocus')?.addEventListener('click', () => document.body.classList.remove('focus-mode'));
  document.getElementById('btnForceUpdate')?.addEventListener('click', () => window.location.reload(true));

  // All Questions
  document.getElementById('btnAllApply')?.addEventListener('click', applyTableFilters);
  document.getElementById('allSelectAll')?.addEventListener('change', toggleSelectAll);
  document.getElementById('btnAllDelete')?.addEventListener('click', deleteSelected);
  document.getElementById('btnImport')?.addEventListener('click', () => document.getElementById('fileInput').click());
  document.getElementById('fileInput')?.addEventListener('change', handleFileImport);
  document.getElementById('btnExport')?.addEventListener('click', exportQuestions);
  document.getElementById('btnRangeMode')?.addEventListener('click', toggleRangeMode); // NEW

  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => sortTable(th.dataset.sort));
  });
  document.getElementById('allPrevPage')?.addEventListener('click', () => changePage(-1));
  document.getElementById('allNextPage')?.addEventListener('click', () => changePage(1));

  // Flashcards (Fix)
  document.getElementById('fcSource')?.addEventListener('change', buildFlashcardPool);
  document.getElementById('btnFcReload')?.addEventListener('click', buildFlashcardPool);
  document.getElementById('btnFcShow')?.addEventListener('click', () => { flashcardShowBack = true; renderFlashcard(); });
  document.getElementById('btnFcNext')?.addEventListener('click', nextFlashcard);
  document.getElementById('btnFcGood')?.addEventListener('click', () => nextFlashcard());
  document.getElementById('btnFcAgain')?.addEventListener('click', () => nextFlashcard());

  // Exam (Fix)
  document.getElementById('btnStartExam')?.addEventListener('click', startExam);
  document.getElementById('btnExamNext')?.addEventListener('click', () => examMove(1));
  document.getElementById('btnExamPrev')?.addEventListener('click', () => examMove(-1));
  document.getElementById('btnExamFinish')?.addEventListener('click', finishExam);
  document.getElementById('btnExamClose')?.addEventListener('click', () => {
     document.getElementById('examResultCard').style.display = 'none';
     document.getElementById('tab-home').click();
  });

  // Settings
  document.getElementById('btnSaveGitHub')?.addEventListener('click', saveGitHubSettings);
  document.getElementById('btnCloudUpload')?.addEventListener('click', cloudUpload);
  document.getElementById('btnCloudDownload')?.addEventListener('click', cloudDownload);
  document.getElementById('btnResetProgress')?.addEventListener('click', resetProgress);
  document.getElementById('btnEditSave')?.addEventListener('click', saveEditModal);
  document.getElementById('btnEditCancel')?.addEventListener('click', () => document.getElementById('editModal').classList.add('hidden'));
  document.getElementById('btnAddChoice')?.addEventListener('click', addChoiceRow);
  
  const noteArea = document.getElementById('userNoteArea');
  if(noteArea) noteArea.addEventListener('input', debounce(saveNote, 1000));
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const btn = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  if(btn) btn.classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');

  if (tabId === 'all') {
    refreshGlobalCache().then(() => applyTableFilters());
  }
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'flashcards') buildFlashcardPool(); // Ensure loaded
}

// --- 6. PRACTICE LOGIC ---
function handleModeChange(e) {
  state.mode = e.target.value;
  const box = document.getElementById('chapterSelect');
  box.style.display = (state.mode === 'chapter') ? 'inline-block' : 'none';
  loadNextQuestion(true);
}

async function loadNextQuestion(reset) {
  const panel = document.getElementById('questionPanel');
  const fb = document.getElementById('feedbackPanel');
  panel.innerHTML = '<div class="muted" style="padding:20px;">Loading Question...</div>';
  fb.style.display = 'none';

  if (reset) historyStack = [];
  else if (state.currentQ) historyStack.push(state.currentQ.id);

  if (state.questions.length === 0) await refreshGlobalCache();
  if (state.questions.length === 0) {
    panel.innerHTML = '<div class="muted">Bank empty. Import data first.</div>';
    return;
  }

  // Filter
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
    panel.innerHTML = '<div class="muted">No questions found for these filters.</div>';
    state.currentQ = null;
    return;
  }

  const rand = Math.floor(Math.random() * pool.length);
  state.currentQ = pool[rand];
  renderQuestionUI();
}

async function loadPrevQuestion() {
  if (historyStack.length === 0) return showToast("No history", "error");
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
    flagBtn.style.color = q.flagged ? '#ef6c00' : '';
  }

  let html = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
  if(q.imageUrl) html += `<div style="margin-bottom:10px;"><img src="${q.imageUrl}" style="max-width:100%; max-height:250px;"></div>`;
  
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
  document.getElementById('guessCheck').checked = false;
  
  // Search
  const term = encodeURIComponent(q.chapter || 'Medicine');
  const tools = document.getElementById('searchTools');
  if(tools) {
    tools.innerHTML = `<a href="https://www.google.com/search?q=${term}" target="_blank" class="search-btn">Google</a>`;
  }
}

window.strike = (i) => {
  const el = document.getElementById(`c_${i}`);
  if(el) el.classList.toggle('strikethrough');
};

async function submitAnswer() {
  if (!state.currentQ) return;
  const sel = document.querySelector('input[name="ans"]:checked');
  if (!sel) return showToast('Pick an answer', 'error');
  
  const idx = parseInt(sel.value);
  const correctIdx = state.currentQ.choices.findIndex(c => c.isCorrect);
  const isCorrect = (idx === correctIdx);

  const fb = document.getElementById('feedbackPanel');
  fb.style.display = 'block';
  fb.innerHTML = `
    <div style="font-weight:bold; color:${isCorrect?'green':'red'}; margin-bottom:10px;">
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

  const tx = db.transaction(['questions'], 'readwrite');
  tx.objectStore('questions').put(q);
  
  // Sync cache
  const cIdx = state.questions.findIndex(x => x.id === q.id);
  if(cIdx > -1) state.questions[cIdx] = q;
}

async function saveNote() {
  if(!state.currentQ) return;
  state.currentQ.userNotes = document.getElementById('userNoteArea').value;
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(state.currentQ);
  document.getElementById('saveNoteStatus').textContent = 'Saved.';
  setTimeout(()=>document.getElementById('saveNoteStatus').textContent='',1500);
}

// --- 7. ALL TABLE LOGIC (Range Select & Date) ---
function toggleRangeMode() {
  state.rangeMode = !state.rangeMode;
  const btn = document.getElementById('btnRangeMode');
  if (state.rangeMode) {
    btn.textContent = "✨ Range Select: ON";
    btn.classList.add('range-active');
    showToast("Range Mode ON: Click start and end boxes");
  } else {
    btn.textContent = "✨ Range Select: OFF";
    btn.classList.remove('range-active');
    state.lastCheckedId = null;
  }
}

function handleCheckbox(e, id, index) {
  if (state.rangeMode && state.lastCheckedId !== null && e.target.checked) {
    // Range Logic
    const allIds = state.tableQs.map(q => q.id);
    const startIdx = allIds.indexOf(state.lastCheckedId);
    const endIdx = allIds.indexOf(id);
    
    if (startIdx !== -1 && endIdx !== -1) {
      const low = Math.min(startIdx, endIdx);
      const high = Math.max(startIdx, endIdx);
      
      // Select all in between
      for(let i=low; i<=high; i++) {
        state.selectedIds.add(allIds[i]);
      }
      showToast(`Selected ${high-low+1} items`);
    }
  } else {
    // Normal Logic
    if (e.target.checked) state.selectedIds.add(id);
    else state.selectedIds.delete(id);
  }
  
  if (e.target.checked) state.lastCheckedId = id;
  updateSelCount();
  renderTablePage(); // Re-render to show checks
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
  
  // Visual indicators
  document.querySelectorAll('th.sortable').forEach(th => {
    const base = th.dataset.sort;
    th.textContent = (base === field) ? 
      (base.toUpperCase() + (state.sortAsc ? ' ↑' : ' ↓')) : 
      (base.toUpperCase() + ' ↕');
  });

  state.tableQs.sort((a, b) => {
    let valA = a[field] || 0;
    let valB = b[field] || 0;
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return state.sortAsc ? -1 : 1;
    if (valA > valB) return state.sortAsc ? 1 : -1;
    return 0;
  });
  
  renderTablePage();
}

function renderTablePage() {
  const tbody = document.getElementById('allTableBody');
  tbody.innerHTML = '';
  const start = (state.tablePage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const pageData = state.tableQs.slice(start, end);

  if(pageData.length === 0) tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px;">No data</td></tr>';

  pageData.forEach((q, idx) => {
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
      <td><button class="pill-btn" onclick="openEdit(${q.id})">Edit</button></td>
    `;
    
    // Attach event manually to avoid ID mismatch issues
    const cb = tr.querySelector('.row-cb');
    cb.addEventListener('click', (e) => handleCheckbox(e, q.id, idx));
    
    tbody.appendChild(tr);
  });

  document.getElementById('allPageInfo').textContent = `Page ${state.tablePage} / ${Math.ceil(state.tableQs.length/state.itemsPerPage)||1}`;
}

function changePage(delta) {
  const max = Math.ceil(state.tableQs.length / state.itemsPerPage) || 1;
  const next = state.tablePage + delta;
  if (next >= 1 && next <= max) {
    state.tablePage = next;
    renderTablePage();
  }
}

function toggleSelectAll(e) {
  const checked = e.target.checked;
  // Only select visible page to prevent freezing on large datasets
  const start = (state.tablePage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const pageQs = state.tableQs.slice(start, end);
  
  pageQs.forEach(q => {
    if (checked) state.selectedIds.add(q.id);
    else state.selectedIds.delete(q.id);
  });
  renderTablePage();
  updateSelCount();
}

function updateSelCount() {
  document.getElementById('allSelectedCount').textContent = `${state.selectedIds.size} Selected`;
}

async function deleteSelected() {
  if (state.selectedIds.size === 0) return showToast('None selected', 'error');
  if (!confirm(`Delete ${state.selectedIds.size} items?`)) return;
  
  const tx = db.transaction('questions', 'readwrite');
  state.selectedIds.forEach(id => tx.objectStore('questions').delete(id));
  tx.oncomplete = async () => {
    await refreshGlobalCache();
    applyTableFilters();
    state.selectedIds.clear();
    updateSelCount();
    showToast('Deleted');
  };
}

// --- 8. IMPORT (ID REPAIR) ---
async function handleFileImport() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (!Array.isArray(json)) throw new Error("File not a JSON Array");

      // 1. Find Max ID currently in DB
      let maxId = 0;
      state.questions.forEach(q => { if (q.id > maxId) maxId = q.id; });

      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      let added = 0;

      for (const q of json) {
        let newId = q.id;
        
        // Fix ID: Must be integer. If text or collision, assign new sequential.
        if (!Number.isInteger(newId) || state.questions.some(x => x.id === newId)) {
             maxId++;
             newId = maxId;
        }
        
        // Fix Date: Keep existing or add new
        const date = q.createdAt || new Date().toISOString();

        const safeQ = {
          id: newId,
          text: q.text || "Empty",
          chapter: q.chapter || "Imported",
          choices: q.choices || [],
          explanation: q.explanation || "",
          tags: q.tags || [],
          createdAt: date,
          timesSeen: q.timesSeen || 0,
          timesWrong: q.timesWrong || 0,
          timesCorrect: q.timesCorrect || 0,
          flagged: !!q.flagged,
          active: true,
          userNotes: q.userNotes || ""
        };
        store.put(safeQ);
        added++;
      }

      tx.oncomplete = async () => {
        showToast(`Imported ${added} questions`);
        await refreshGlobalCache();
        applyTableFilters();
        refreshChapterDropdowns();
      };
    } catch (err) {
      showToast(err.message, 'error');
    }
  };
  reader.readAsText(file);
}

function exportQuestions() {
  const blob = new Blob([JSON.stringify(state.questions, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MCQ_Backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

// --- 9. FLASHCARDS & EXAM FIX ---
function buildFlashcardPool() {
  const mode = document.getElementById('fcSource').value;
  let pool = state.questions.filter(q => q.active !== false);
  if (mode === 'weak') pool = pool.filter(q => q.timesWrong > 0);
  if (mode === 'due') {
      // Simple logic: if seen < 1 or wrong > correct
      pool = pool.filter(q => q.timesSeen === 0 || q.timesWrong >= q.timesCorrect);
  }
  
  flashcardPool = pool.sort(() => 0.5 - Math.random());
  flashcardIndex = 0;
  renderFlashcard();
}

function renderFlashcard() {
  const fFront = document.getElementById('flashcardFront');
  const fBack = document.getElementById('flashcardBack');
  
  if (!flashcardPool.length) {
     fFront.textContent = "No cards available for this filter.";
     fBack.style.display = 'none';
     return;
  }
  
  const q = flashcardPool[flashcardIndex];
  const mode = document.getElementById('fcMode').value;
  const correctChoice = (q.choices||[]).find(c => c.isCorrect);
  const ansText = correctChoice ? correctChoice.text : "No answer marked.";

  if (mode === 'q-first') {
     fFront.textContent = q.text;
     fBack.innerHTML = `<strong>Answer:</strong> ${ansText}<br><br><em>${q.explanation}</em>`;
  } else {
     fFront.textContent = ansText;
     fBack.innerHTML = `<strong>Question:</strong> ${q.text}`;
  }
  
  fBack.style.display = flashcardShowBack ? 'block' : 'none';
}

function nextFlashcard() {
  if (flashcardIndex < flashcardPool.length - 1) flashcardIndex++;
  else flashcardIndex = 0;
  flashcardShowBack = false;
  renderFlashcard();
}

// Exam Logic
function startExam() {
  const pool = state.questions; // Simply take all for now, refine later
  if (pool.length === 0) return showToast('No questions', 'error');
  
  const count = parseInt(document.getElementById('examCount').value) || 10;
  const selected = pool.sort(() => 0.5 - Math.random()).slice(0, count);
  
  examSession = { qs: selected, answers: {}, index: 0 };
  
  document.getElementById('examActiveCard').style.display = 'block';
  renderExamQ();
}

function renderExamQ() {
  const q = examSession.qs[examSession.index];
  document.getElementById('examIndexLabel').textContent = `Q ${examSession.index+1} / ${examSession.qs.length}`;
  
  let html = `<div class="q-text">${q.text}</div>`;
  q.choices.forEach((c, i) => {
     html += `<label class="choice"><input type="radio" name="exAns" value="${i}"> ${c.text}</label>`;
  });
  document.getElementById('examQuestionPanel').innerHTML = html;
}

function examMove(dir) {
  if(!examSession) return;
  // Save answer
  const sel = document.querySelector('input[name="exAns"]:checked');
  if (sel) examSession.answers[examSession.qs[examSession.index].id] = parseInt(sel.value);
  
  const newIdx = examSession.index + dir;
  if (newIdx >= 0 && newIdx < examSession.qs.length) {
    examSession.index = newIdx;
    renderExamQ();
  }
}

function finishExam() {
  examMove(0); // Save last
  let correct = 0;
  examSession.qs.forEach(q => {
     const uAns = examSession.answers[q.id];
     const cIdx = q.choices.findIndex(c => c.isCorrect);
     if (uAns === cIdx) correct++;
  });
  
  document.getElementById('examActiveCard').style.display = 'none';
  document.getElementById('examResultCard').style.display = 'block';
  document.getElementById('examSummary').innerHTML = `<h3>Score: ${correct} / ${examSession.qs.length}</h3>`;
}

// --- 10. HELPERS ---
function refreshChapterDropdowns() {
  const chapters = new Set();
  state.questions.forEach(q => { if(q.chapter) chapters.add(q.chapter); });
  const sorted = Array.from(chapters).sort();
  
  document.querySelectorAll('.chapter-dropdown').forEach(sel => {
    sel.innerHTML = '<option value="">All Chapters</option>';
    sorted.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; 
      opt.textContent = c;
      sel.appendChild(opt);
    });
  });
}

function renderDashboard() {
  const total = state.questions.length;
  const seen = state.questions.filter(q => q.timesSeen > 0).length;
  document.getElementById('dashOverall').innerHTML = `<h3>Total Qs: ${total}</h3><p>Studied: ${seen}</p>`;
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Settings Placeholder
function updateGitHubUI() { /* ... */ }
function saveGitHubSettings() { showToast("Settings Saved"); } 
function cloudUpload() { showToast("Mock Upload: Success"); }
function cloudDownload() { showToast("Mock Download: Success"); }
function resetProgress() { showToast("Progress Reset"); }
function saveEditModal() { showToast("Edited"); }
function addChoiceRow() { /* ... */ }
function clearGitHubSettings() { /* ... */ }
