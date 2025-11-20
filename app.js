// MCQ Ultra-Pro v5.0.1 (Fixed: Missing Functions)
const DB_NAME = 'mcqdb_ultra_v50';
const DB_VERSION = 5;
let db = null;

// --- APP STATE ---
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
  skipSolved: true
};

let historyStack = []; // To track previous questions

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  console.log("App Starting...");
  try {
    db = await openDB();
    console.log("DB Connected");
    
    // Load Data First
    await refreshGlobalCache();
    
    // Then Setup UI
    setupEventListeners();
    loadTheme();
    updateGitHubUI();
    refreshChapterDropdowns();
    renderDashboard();
    loadNextQuestion(true);
    
  } catch (e) {
    console.error("Critical Error:", e);
    alert("App Error: " + e.message);
  }
});

// --- 2. DATABASE ENGINE ---
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
  console.log(`Cache updated: ${state.questions.length} questions`);
}

// --- 3. EVENT LISTENERS ---
function setupEventListeners() {
  // Tabs
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Practice
  document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
  document.getElementById('btnNext').addEventListener('click', () => loadNextQuestion(false));
  
  // Fixed: Added missing functions here
  document.getElementById('btnPrev').addEventListener('click', loadPrevQuestion);
  document.getElementById('btnFlag').addEventListener('click', toggleFlagCurrent);
  
  document.getElementById('modeSelect').addEventListener('change', handleModeChange);
  document.getElementById('prefSkipSolved').addEventListener('change', (e) => state.skipSolved = e.target.checked);
  
  // Tools
  document.getElementById('btnFocusMode').addEventListener('click', () => document.body.classList.add('focus-mode'));
  document.getElementById('btnExitFocus').addEventListener('click', () => document.body.classList.remove('focus-mode'));
  document.getElementById('btnForceUpdate').addEventListener('click', forceReload);

  // All Questions Table
  document.getElementById('btnAllApply').addEventListener('click', applyTableFilters);
  document.getElementById('allSelectAll').addEventListener('change', toggleSelectAll);
  document.getElementById('btnAllDelete').addEventListener('click', deleteSelected);
  document.getElementById('btnImport').addEventListener('click', () => document.getElementById('fileInput').click());
  document.getElementById('fileInput').addEventListener('change', handleFileImport);
  document.getElementById('btnExport').addEventListener('click', exportQuestions);
  
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => sortTable(th.dataset.sort));
  });

  document.getElementById('allPrevPage').addEventListener('click', () => changePage(-1));
  document.getElementById('allNextPage').addEventListener('click', () => changePage(1));

  // Settings & Cloud
  document.getElementById('btnSaveGitHub').addEventListener('click', saveGitHubSettings);
  document.getElementById('btnClearGitHub').addEventListener('click', clearGitHubSettings);
  document.getElementById('btnCloudUpload').addEventListener('click', cloudUpload);
  document.getElementById('btnCloudDownload').addEventListener('click', cloudDownload);
  document.getElementById('btnResetProgress').addEventListener('click', resetProgress);
  
  // Edit Modal
  document.getElementById('btnEditSave').addEventListener('click', saveEditModal);
  document.getElementById('btnEditCancel').addEventListener('click', closeEditModal);
  document.getElementById('btnAddChoice').addEventListener('click', addChoiceRow);
  
  // Notes Auto-save
  document.getElementById('userNoteArea').addEventListener('input', debounce(saveNote, 1000));
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  const btn = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  if(btn) btn.classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');

  if (tabId === 'all') {
    refreshGlobalCache().then(() => applyTableFilters());
    refreshChapterDropdowns();
  }
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'home') refreshChapterDropdowns();
}

// --- 4. PRACTICE LOGIC ---
function handleModeChange(e) {
  state.mode = e.target.value;
  const chBox = document.getElementById('chapterSelect');
  chBox.style.display = (state.mode === 'chapter') ? 'inline-block' : 'none';
  loadNextQuestion(true);
}

async function loadNextQuestion(reset) {
  const panel = document.getElementById('questionPanel');
  const fb = document.getElementById('feedbackPanel');
  panel.innerHTML = '<div class="muted" style="padding:20px;">Loading...</div>';
  fb.style.display = 'none';
  fb.innerHTML = '';

  // History Logic
  if (reset) historyStack = [];
  else if (state.currentQ) historyStack.push(state.currentQ.id);

  if (state.questions.length === 0) await refreshGlobalCache();
  if (state.questions.length === 0) {
    panel.innerHTML = '<div class="muted">Bank is empty. Go to "All Questions" to import.</div>';
    return;
  }

  // Filter Logic
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
    panel.innerHTML = '<div class="muted">No questions match criteria. Try changing filters.</div>';
    state.currentQ = null;
    return;
  }

  // Random Pick
  const randIndex = Math.floor(Math.random() * pool.length);
  state.currentQ = pool[randIndex];
  
  renderQuestionUI();
}

// Fixed: Added loadPrevQuestion
async function loadPrevQuestion() {
  if (historyStack.length === 0) return alert("No previous questions in this session.");
  const prevId = historyStack.pop();
  
  // Find in cache first
  let q = state.questions.find(item => item.id === prevId);
  if (q) {
      state.currentQ = q;
      renderQuestionUI();
  } else {
      // Fallback DB fetch
      const tx = db.transaction('questions', 'readonly');
      tx.objectStore('questions').get(prevId).onsuccess = (e) => {
          state.currentQ = e.target.result;
          renderQuestionUI();
      };
  }
}

// Fixed: Added toggleFlagCurrent
async function toggleFlagCurrent() {
    if (!state.currentQ) return;
    state.currentQ.flagged = !state.currentQ.flagged;
    
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(state.currentQ);
    
    // Update UI
    const btn = document.getElementById('btnFlag');
    btn.textContent = state.currentQ.flagged ? 'Flagged 🚩' : 'Flag ⚐';
    btn.style.color = state.currentQ.flagged ? '#ef6c00' : '';
    
    // Update Cache
    const idx = state.questions.findIndex(q => q.id === state.currentQ.id);
    if (idx !== -1) state.questions[idx] = state.currentQ;
}

function renderQuestionUI() {
  const q = state.currentQ;
  const panel = document.getElementById('questionPanel');
  const noteArea = document.getElementById('userNoteArea');
  const flagBtn = document.getElementById('btnFlag');
  
  // Update flag button visually
  if (flagBtn) {
      flagBtn.textContent = q.flagged ? 'Flagged 🚩' : 'Flag ⚐';
      flagBtn.style.color = q.flagged ? '#ef6c00' : '';
  }

  let html = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
  if(q.imageUrl) html += `<div style="margin-bottom:10px;"><img src="${q.imageUrl}" style="max-width:100%; max-height:200px;"></div>`;
  
  html += '<div style="display:flex; flex-direction:column; gap:10px;">';
  (q.choices || []).forEach((c, i) => {
     const letter = String.fromCharCode(65+i);
     html += `
     <div class="choice-container">
       <label class="choice" id="c_${i}">
         <input type="radio" name="ans" value="${i}">
         <span><strong>${letter}.</strong> ${c.text}</span>
       </label>
       <button class="btn-strike" onclick="strike(${i})">✕</button>
     </div>`;
  });
  html += '</div>';
  
  panel.innerHTML = html;
  noteArea.value = q.userNotes || '';
  document.getElementById('saveNoteStatus').textContent = '';
  document.getElementById('guessCheck').checked = false;
  
  // Search Tools
  const tools = document.getElementById('searchTools');
  const term = encodeURIComponent(q.chapter || 'Medicine');
  tools.innerHTML = `
    <a href="https://www.google.com/search?q=${term}" target="_blank" class="search-btn">Google</a>
    <a href="https://www.uptodate.com/contents/search?search=${term}" target="_blank" class="search-btn">UpToDate</a>
  `;
}

window.strike = (i) => {
  const el = document.getElementById(`c_${i}`);
  if(el) el.classList.toggle('strikethrough');
}

async function submitAnswer() {
  if (!state.currentQ) return;
  const sel = document.querySelector('input[name="ans"]:checked');
  if (!sel) return alert('Please select an answer.');
  
  const idx = parseInt(sel.value);
  const correctIdx = state.currentQ.choices.findIndex(c => c.isCorrect);
  const isCorrect = (idx === correctIdx);
  const isGuess = document.getElementById('guessCheck').checked;

  // Feedback
  const fb = document.getElementById('feedbackPanel');
  fb.style.display = 'block';
  fb.innerHTML = `
    <div style="font-weight:bold; color:${isCorrect ? 'green' : 'red'}; margin-bottom:8px;">
       ${isCorrect ? 'Correct! 🎉' : 'Wrong ❌'}
    </div>
    <div class="muted">${state.currentQ.explanation || 'No explanation provided.'}</div>
  `;
  
  document.getElementById(`c_${correctIdx}`).classList.add('correct', 'show');
  if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong', 'show');

  // Save Stats
  const q = state.currentQ;
  q.timesSeen = (q.timesSeen || 0) + 1;
  if(isCorrect) q.timesCorrect = (q.timesCorrect || 0) + 1;
  else q.timesWrong = (q.timesWrong || 0) + 1;
  
  const tx = db.transaction(['questions', 'answers'], 'readwrite');
  tx.objectStore('questions').put(q);
  tx.objectStore('answers').add({
    qid: q.id,
    correct: isCorrect,
    timestamp: new Date().toISOString()
  });
  
  // Update local cache
  const cacheIdx = state.questions.findIndex(item => item.id === q.id);
  if(cacheIdx > -1) state.questions[cacheIdx] = q;
}

async function saveNote() {
  if (!state.currentQ) return;
  state.currentQ.userNotes = document.getElementById('userNoteArea').value;
  
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(state.currentQ);
  
  const status = document.getElementById('saveNoteStatus');
  status.textContent = 'Saved.';
  setTimeout(() => status.textContent = '', 1500);
}

// --- 5. ALL QUESTIONS TABLE ---
function applyTableFilters() {
  // Get Filters
  const search = document.getElementById('allSearch').value.toLowerCase();
  const type = document.getElementById('allFilter').value;
  const chap = document.getElementById('allChapterSelect').value;

  state.tableQs = state.questions.filter(q => {
    if (search && !q.text.toLowerCase().includes(search) && String(q.id) !== search) return false;
    if (chap && q.chapter !== chap) return false;
    if (type === 'notes' && (!q.userNotes || !q.userNotes.trim())) return false;
    if (type === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
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

  // Update icons
  document.querySelectorAll('th.sortable').forEach(th => {
     const base = th.dataset.sort;
     th.textContent = base === field ? `${base.toUpperCase()} ${state.sortAsc ? '↑' : '↓'}` : `${base.toUpperCase()} ↕`;
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
  
  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">No questions found.</td></tr>';
  }

  pageData.forEach(q => {
    const tr = document.createElement('tr');
    const isSel = state.selectedIds.has(q.id);
    tr.innerHTML = `
      <td><input type="checkbox" class="row-cb" data-id="${q.id}" ${isSel ? 'checked' : ''}></td>
      <td>${q.id}</td>
      <td>
         ${q.text.substring(0, 60)}...
         ${q.userNotes ? '📝' : ''}
      </td>
      <td>${q.chapter || '-'}</td>
      <td>${q.timesSeen || 0}</td>
      <td>${q.timesWrong || 0}</td>
      <td><button class="pill-btn" onclick="openEditModal(${q.id})">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.row-cb').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      if(e.target.checked) state.selectedIds.add(id);
      else state.selectedIds.delete(id);
      updateSelCount();
    });
  });

  document.getElementById('allPageInfo').textContent = `Page ${state.tablePage} / ${Math.ceil(state.tableQs.length / state.itemsPerPage) || 1}`;
}

function changePage(delta) {
  const max = Math.ceil(state.tableQs.length / state.itemsPerPage) || 1;
  const newPage = state.tablePage + delta;
  if (newPage >= 1 && newPage <= max) {
    state.tablePage = newPage;
    renderTablePage();
  }
}

function toggleSelectAll(e) {
  const checkboxes = document.querySelectorAll('.row-cb');
  checkboxes.forEach(cb => {
    cb.checked = e.target.checked;
    const id = parseInt(cb.dataset.id);
    if (e.target.checked) state.selectedIds.add(id);
    else state.selectedIds.delete(id);
  });
  updateSelCount();
}

function updateSelCount() {
  document.getElementById('allSelectedCount').textContent = `${state.selectedIds.size} Selected`;
}

async function deleteSelected() {
  if (state.selectedIds.size === 0) return alert('No questions selected');
  if (!confirm(`Delete ${state.selectedIds.size} questions?`)) return;

  const tx = db.transaction('questions', 'readwrite');
  state.selectedIds.forEach(id => tx.objectStore('questions').delete(id));
  
  tx.oncomplete = async () => {
    await refreshGlobalCache();
    applyTableFilters(); 
    refreshChapterDropdowns();
    state.selectedIds.clear();
    updateSelCount();
    alert('Deleted successfully.');
  };
}

// --- 6. IMPORT / EXPORT ---
async function handleFileImport() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (!Array.isArray(json)) throw new Error("File must be a JSON array.");
      
      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      let count = 0;

      for (const q of json) {
        // Clean ID logic
        let cleanId = parseInt(String(q.id).replace(/\D/g, ''));
        if (!cleanId || isNaN(cleanId)) cleanId = Date.now() + Math.floor(Math.random() * 10000);

        const safeQ = {
          id: cleanId,
          text: q.text || 'No Text',
          chapter: q.chapter || 'Imported',
          tags: Array.isArray(q.tags) ? q.tags : [],
          choices: Array.isArray(q.choices) ? q.choices : [],
          explanation: q.explanation || '',
          timesSeen: 0, timesWrong: 0, timesCorrect: 0,
          flagged: false, active: true,
          userNotes: ''
        };
        store.put(safeQ);
        count++;
      }

      tx.oncomplete = async () => {
        alert(`Success! Imported ${count} questions.`);
        await refreshGlobalCache();
        applyTableFilters();
        refreshChapterDropdowns();
      };
    } catch (err) {
      alert("Import Error: " + err.message);
    }
  };
  reader.readAsText(file);
}

function exportQuestions() {
  const data = JSON.stringify(state.questions, null, 2);
  const blob = new Blob([data], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mcq_export_all.json';
  a.click();
}

// --- 7. SETTINGS & GITHUB ---
function updateGitHubUI() {
  const cfg = JSON.parse(localStorage.getItem('mcq_gh_config') || '{}');
  if(cfg.token) {
    document.getElementById('syncStatus').textContent = "Cloud: Linked ✅";
    document.getElementById('ghTokenInput').value = cfg.token;
    document.getElementById('ghRepoInput').value = cfg.repo;
    document.getElementById('ghFileInput').value = cfg.file;
  } else {
    document.getElementById('syncStatus').textContent = "Cloud: Offline";
  }
}

function saveGitHubSettings() {
  const token = document.getElementById('ghTokenInput').value.trim();
  const repo = document.getElementById('ghRepoInput').value.trim();
  const file = document.getElementById('ghFileInput').value.trim();

  if(!token || !repo) return alert('Please enter Token and Repo.');

  localStorage.setItem('mcq_gh_config', JSON.stringify({ token, repo, file }));
  alert('Settings Saved!');
  updateGitHubUI();
}

function clearGitHubSettings() {
  localStorage.removeItem('mcq_gh_config');
  alert('Settings Cleared.');
  updateGitHubUI();
  document.getElementById('ghTokenInput').value = '';
}

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}

async function cloudUpload() {
  const cfg = JSON.parse(localStorage.getItem('mcq_gh_config') || '{}');
  if (!cfg.token) return alert('Setup Settings first.');

  try {
    const content = toBase64(JSON.stringify(state.questions));
    const apiUrl = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    
    let sha = null;
    try {
      const check = await fetch(apiUrl, { headers: { Authorization: `token ${cfg.token}` } });
      if (check.ok) {
        const json = await check.json();
        sha = json.sha;
      }
    } catch (e) {}

    const body = {
      message: "MCQ Backup " + new Date().toISOString(),
      content: content
    };
    if (sha) body.sha = sha;

    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 
        Authorization: `token ${cfg.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(await res.text());
    alert('Upload Successful!');

  } catch (e) {
    alert('Upload Failed: ' + e.message);
  }
}

async function cloudDownload() {
  const cfg = JSON.parse(localStorage.getItem('mcq_gh_config') || '{}');
  if (!cfg.token) return alert('Setup Settings first.');

  try {
    const apiUrl = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    const res = await fetch(apiUrl, { headers: { Authorization: `token ${cfg.token}` } });
    
    if (res.status === 404) return alert('File not found in Repo.');
    if (!res.ok) throw new Error(await res.text());

    const json = await res.json();
    const data = JSON.parse(fromBase64(json.content));
    
    const tx = db.transaction('questions', 'readwrite');
    const store = tx.objectStore('questions');
    data.forEach(q => store.put(q));
    
    tx.oncomplete = async () => {
      await refreshGlobalCache();
      alert('Download & Merge Successful!');
      applyTableFilters();
      renderDashboard();
    };

  } catch (e) {
    alert('Download Failed: ' + e.message);
  }
}

// --- 8. HELPERS ---
async function resetProgress() {
  if(!confirm("Reset progress? This cannot be undone.")) return;
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  
  state.questions.forEach(q => {
    q.timesSeen = 0;
    q.timesCorrect = 0;
    q.timesWrong = 0;
    q.userNotes = ''; // Also clear notes? Optional.
    store.put(q);
  });
  
  tx.oncomplete = async () => {
    await refreshGlobalCache();
    alert("Progress Reset.");
    loadNextQuestion(true);
  };
}

async function refreshChapterDropdowns() {
  const chapters = new Set();
  state.questions.forEach(q => {
    if(q.chapter) chapters.add(q.chapter);
  });
  
  const selects = document.querySelectorAll('.chapter-dropdown');
  selects.forEach(sel => {
    sel.innerHTML = '<option value="">All Chapters</option>';
    Array.from(chapters).sort().forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });
  });
}

async function renderDashboard() {
  const total = state.questions.length;
  const seen = state.questions.filter(q => q.timesSeen > 0).length;
  const weak = state.questions.filter(q => q.timesWrong > 1).length;
  
  document.getElementById('dashOverall').innerHTML = `
    <h3>Overall Stats</h3>
    <p>Total Questions: <b>${total}</b></p>
    <p>Questions Attempted: <b>${seen}</b></p>
    <p>Weak Questions: <b style="color:red">${weak}</b></p>
  `;
  document.getElementById('dashWeakChapters').innerHTML = `<p class="muted">Detailed analytics coming soon.</p>`;
}

function forceReload() {
  window.location.reload(true);
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// --- 9. EDIT MODAL ---
window.openEditModal = async (id) => {
  const tx = db.transaction('questions', 'readonly');
  tx.objectStore('questions').get(id).onsuccess = (e) => {
    const q = e.target.result;
    if(!q) return;
    
    document.getElementById('editModal').dataset.id = id;
    document.getElementById('editModal').classList.remove('hidden');
    
    document.getElementById('editText').value = q.text || '';
    document.getElementById('editChapter').value = q.chapter || '';
    document.getElementById('editTags').value = (q.tags || []).join(',');
    document.getElementById('editExplanation').value = q.explanation || '';
    document.getElementById('editImageUrl').value = q.imageUrl || '';
    document.getElementById('editFlagged').checked = !!q.flagged;
    
    renderEditChoices(q.choices);
  };
};

function renderEditChoices(choices) {
  const container = document.getElementById('editChoices');
  container.innerHTML = '';
  (choices || []).forEach((c, i) => {
     const div = document.createElement('div');
     div.className = 'edit-choice-row';
     div.innerHTML = `
       <input type="text" value="${c.text}" class="ec-text">
       <label><input type="radio" name="ec-correct" ${c.isCorrect?'checked':''}> Correct</label>
       <button class="danger tiny" onclick="this.parentElement.remove()">Del</button>
     `;
     container.appendChild(div);
  });
}

function addChoiceRow() {
  const container = document.getElementById('editChoices');
  const div = document.createElement('div');
  div.className = 'edit-choice-row';
  div.innerHTML = `
    <input type="text" placeholder="New Option" class="ec-text">
    <label><input type="radio" name="ec-correct"> Correct</label>
    <button class="danger tiny" onclick="this.parentElement.remove()">Del</button>
  `;
  container.appendChild(div);
}

async function saveEditModal() {
  const id = parseInt(document.getElementById('editModal').dataset.id);
  const tx = db.transaction('questions', 'readwrite');
  
  const choiceRows = document.querySelectorAll('.edit-choice-row');
  const newChoices = [];
  choiceRows.forEach(row => {
    newChoices.push({
      text: row.querySelector('.ec-text').value,
      isCorrect: row.querySelector('input[type="radio"]').checked
    });
  });

  const store = tx.objectStore('questions');
  store.get(id).onsuccess = (e) => {
    const q = e.target.result;
    q.text = document.getElementById('editText').value;
    q.chapter = document.getElementById('editChapter').value;
    q.tags = document.getElementById('editTags').value.split(',').map(t=>t.trim());
    q.explanation = document.getElementById('editExplanation').value;
    q.imageUrl = document.getElementById('editImageUrl').value;
    q.flagged = document.getElementById('editFlagged').checked;
    q.choices = newChoices;
    
    store.put(q);
  };
  
  tx.oncomplete = async () => {
    closeEditModal();
    await refreshGlobalCache();
    applyTableFilters();
  };
}

function closeEditModal() {
  document.getElementById('editModal').classList.add('hidden');
}
