/**
 * MCQ Legendary v6.0.1 - Final Logic
 * Includes: Bulk Actions, Smart Filters, Keyboard Support, and Robust ID handling.
 */

const DB_NAME = 'mcq_legend_db';
const DB_VERSION = 1;
let db = null;

// --- APP STATE ---
let App = {
  questions: [],    // Master Cache
  tableQs: [],      // Filtered Table Data
  selectedIds: new Set(),
  currentQ: null,
  
  // Filters
  filter: {
    mode: 'due',
    chapter: '',
    skipSolved: true,
    search: '',
    status: 'all',
    sort: 'id',
    asc: true
  },

  // Pagination
  page: 1,
  limit: 50,
  
  // Tools
  rangeMode: false,
  lastCheckId: null
};

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    db = await openDB();
    await loadCache();
    
    setupEvents();
    refreshUI();
    
    // Start
    loadNextQuestion(true);
    showToast('Legendary Engine Ready 🚀');
  } catch (e) {
    console.error(e);
    alert("Startup Error: " + e.message);
  }
});

function refreshUI() {
  refreshChapterDropdowns();
  renderDashboard();
  applyTableFilters();
  updateGitHubStatus();
  
  // Theme
  if(localStorage.getItem('mcq_theme') === 'dark') document.body.classList.add('dark');
}

// --- 2. DATABASE ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('questions')) {
        d.createObjectStore('questions', { keyPath: 'id' });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function loadCache() {
  return new Promise(resolve => {
    const tx = db.transaction('questions', 'readonly');
    tx.objectStore('questions').getAll().onsuccess = (e) => {
      App.questions = e.target.result || [];
      resolve();
    };
  });
}

// --- 3. PRACTICE ENGINE ---
// Defined explicitly to avoid errors
function handleModeChange(e) {
  App.filter.mode = e.target.value;
  const box = document.getElementById('chapterSelect');
  box.style.display = (App.filter.mode === 'chapter') ? 'inline-block' : 'none';
  loadNextQuestion(true);
}

async function loadNextQuestion(reset) {
  // History
  if(reset && App.currentQ) { /* Simple history could go here */ }
  
  // Filtering Logic
  let pool = App.questions.filter(q => q.active !== false);
  const m = App.filter.mode;
  const c = document.getElementById('chapterSelect').value;
  
  if(m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
  if(m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
  if(m === 'flagged') pool = pool.filter(q => q.flagged);
  if(m === 'new') pool = pool.filter(q => !q.timesSeen);
  
  if(document.getElementById('prefSkipSolved').checked && m !== 'new') {
    const unseen = pool.filter(q => !q.timesSeen);
    if(unseen.length > 0) pool = unseen;
  }

  const panel = document.getElementById('questionPanel');
  if(pool.length === 0) {
    panel.innerHTML = '<div class="muted p-20">No questions match criteria.</div>';
    App.currentQ = null;
    return;
  }

  // Random
  App.currentQ = pool[Math.floor(Math.random() * pool.length)];
  renderQuestion();
}

function renderQuestion() {
  const q = App.currentQ;
  const panel = document.getElementById('questionPanel');
  const note = document.getElementById('userNoteArea');
  const fb = document.getElementById('feedbackPanel');
  
  fb.classList.add('hidden');
  note.value = q.userNotes || '';
  
  let h = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
  if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:10px;">`;
  
  h += `<div class="choices-list">`;
  (q.choices || []).forEach((c, i) => {
     h += `
     <div class="choice-container">
        <div class="choice" id="c_${i}" onclick="selectChoice(${i})">
          <strong>${String.fromCharCode(65+i)}.</strong> ${c.text}
        </div>
        <button class="btn-strike" onclick="strikeChoice(${i})">✕</button>
     </div>`;
  });
  h += `</div>`;
  
  panel.innerHTML = h;
  
  // Search Tools
  const term = encodeURIComponent(q.chapter || 'Medicine');
  document.getElementById('searchTools').innerHTML = `
    <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
    <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
  `;
  
  document.getElementById('btnFlag').textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
}

function selectChoice(idx) {
  document.querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
  document.getElementById(`c_${idx}`).classList.add('selected');
}

function strikeChoice(idx) {
  document.getElementById(`c_${idx}`).classList.toggle('strikethrough');
}

function submitAnswer() {
  if(!App.currentQ) return;
  const selectedEl = document.querySelector('.choice.selected');
  if(!selectedEl) return showToast("Select an answer", "error");
  
  const idx = parseInt(selectedEl.id.split('_')[1]);
  const correctIdx = App.currentQ.choices.findIndex(c => c.isCorrect);
  const isCorrect = (idx === correctIdx);
  
  const fb = document.getElementById('feedbackPanel');
  fb.classList.remove('hidden');
  fb.innerHTML = `
    <div style="font-weight:bold; color:${isCorrect?'green':'red'}; margin-bottom:10px;">
      ${isCorrect ? 'Correct! 🎉' : 'Wrong ❌'}
    </div>
    <div class="muted">${App.currentQ.explanation || 'No explanation.'}</div>
  `;
  
  document.getElementById(`c_${correctIdx}`).classList.add('correct');
  if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong');
  
  // Save
  const q = App.currentQ;
  q.timesSeen = (q.timesSeen||0)+1;
  if(isCorrect) q.timesCorrect = (q.timesCorrect||0)+1;
  else q.timesWrong = (q.timesWrong||0)+1;
  
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(q);
}

function saveNote() {
  if(!App.currentQ) return;
  App.currentQ.userNotes = document.getElementById('userNoteArea').value;
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(App.currentQ);
  document.getElementById('saveNoteStatus').innerText = "Saved";
}

// --- 4. TABLE (DATA CENTER) ---
function applyTableFilters() {
  App.filter.search = document.getElementById('allSearch').value.toLowerCase();
  App.filter.status = document.getElementById('allFilter').value;
  App.filter.chapter = document.getElementById('allChapterSelect').value;
  
  App.tableQs = App.questions.filter(q => {
    if(App.filter.search && !q.text.toLowerCase().includes(App.filter.search) && String(q.id) !== App.filter.search) return false;
    if(App.filter.chapter && q.chapter !== App.filter.chapter) return false;
    if(App.filter.status === 'flagged' && !q.flagged) return false;
    if(App.filter.status === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
    if(App.filter.status === 'notes' && !q.userNotes) return false;
    return true;
  });
  
  App.page = 1;
  App.selectedIds.clear();
  updateBulkUI();
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('allTableBody');
  tbody.innerHTML = '';
  
  const start = (App.page - 1) * App.limit;
  const pageData = App.tableQs.slice(start, start + App.limit);
  
  pageData.forEach(q => {
     const tr = document.createElement('tr');
     const isSel = App.selectedIds.has(q.id);
     tr.innerHTML = `
       <td><input type="checkbox" class="row-cb" ${isSel?'checked':''}></td>
       <td>${q.id}</td>
       <td>${q.text.substring(0,50)}... ${q.userNotes?'📝':''}</td>
       <td>${q.chapter || '-'}</td>
       <td>${q.timesSeen || 0}</td>
       <td>${q.timesWrong || 0}</td>
       <td><button class="pill-btn" onclick="openEdit(${q.id})">✎</button></td>
     `;
     tr.querySelector('.row-cb').onclick = (e) => handleRowCheck(e, q.id);
     tbody.appendChild(tr);
  });
  
  document.getElementById('allPageInfo').textContent = `Page ${App.page} / ${Math.ceil(App.tableQs.length/App.limit)||1}`;
}

// Bulk Actions Logic
function handleRowCheck(e, id) {
  if (App.rangeMode && App.lastCheckId !== null && e.target.checked) {
     // Range Logic
     const allIds = App.tableQs.map(q => q.id);
     const start = allIds.indexOf(App.lastCheckId);
     const end = allIds.indexOf(id);
     if (start > -1 && end > -1) {
       const min = Math.min(start,end), max = Math.max(start,end);
       for(let i=min; i<=max; i++) App.selectedIds.add(allIds[i]);
     }
  } else {
     if(e.target.checked) App.selectedIds.add(id);
     else App.selectedIds.delete(id);
  }
  App.lastCheckId = id;
  updateBulkUI();
  renderTable();
}

function updateBulkUI() {
  const count = App.selectedIds.size;
  document.getElementById('selectedCountLabel').textContent = `${count} Selected`;
  const bar = document.getElementById('bulkActionsBar');
  if(count > 0) bar.classList.remove('hidden');
  else bar.classList.add('hidden');
}

async function bulkAction(action) {
  if(!confirm(`Apply '${action}' to ${App.selectedIds.size} questions?`)) return;
  
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  
  App.selectedIds.forEach(id => {
    if(action === 'delete') store.delete(id);
    else {
      store.get(id).onsuccess = (e) => {
        const q = e.target.result;
        if(action === 'flag') q.flagged = true;
        if(action === 'reset') { q.timesSeen=0; q.timesWrong=0; }
        store.put(q);
      };
    }
  });
  
  tx.oncomplete = async () => {
    await refreshGlobalCache();
    applyTableFilters();
    showToast("Bulk Action Complete");
  };
}

// --- 5. SETUP EVENTS ---
function setupEvents() {
  // Tabs
  document.querySelectorAll('.tab-button').forEach(b => 
    b.onclick = () => switchTab(b.dataset.tab));
    
  // Practice
  document.getElementById('modeSelect').onchange = handleModeChange;
  document.getElementById('chapterSelect').onchange = () => loadNextQuestion(true);
  document.getElementById('btnSubmit').onclick = submitAnswer;
  document.getElementById('btnNext').onclick = () => loadNextQuestion(false);
  document.getElementById('btnFlag').onclick = () => {
     if(!App.currentQ) return;
     App.currentQ.flagged = !App.currentQ.flagged;
     const tx = db.transaction('questions','readwrite');
     tx.objectStore('questions').put(App.currentQ);
     renderQuestion();
  };
  document.getElementById('btnFocusMode').onclick = () => document.body.classList.add('focus-mode');
  document.getElementById('btnExitFocus').onclick = () => document.body.classList.remove('focus-mode');
  
  // Keyboard Support
  document.addEventListener('keydown', (e) => {
     if(document.body.classList.contains('focus-mode')) {
       if(e.key === 'ArrowRight') loadNextQuestion(false);
       if(e.key === 'Enter') submitAnswer();
     }
  });

  // Table
  document.getElementById('btnAllApply').onclick = applyTableFilters;
  document.getElementById('btnRangeMode').onclick = () => {
    App.rangeMode = !App.rangeMode;
    document.getElementById('btnRangeMode').classList.toggle('range-active');
    showToast(App.rangeMode ? "Range Mode ON" : "Range Mode OFF");
  };
  document.getElementById('btnBulkDelete').onclick = () => bulkAction('delete');
  document.getElementById('btnBulkFlag').onclick = () => bulkAction('flag');
  document.getElementById('btnBulkReset').onclick = () => bulkAction('reset');
  
  // Import/Export
  document.getElementById('btnImportTrigger').onclick = () => document.getElementById('fileInput').click();
  document.getElementById('fileInput').onchange = handleImport;
  document.getElementById('btnExportTrigger').onclick = handleExport;
  
  // Subnav
  document.getElementById('viewBankBtn').onclick = () => {
     document.getElementById('allViewBank').classList.remove('hidden');
     document.getElementById('allViewBuilder').classList.add('hidden');
  };
  document.getElementById('viewBuilderBtn').onclick = () => {
     document.getElementById('allViewBank').classList.add('hidden');
     document.getElementById('allViewBuilder').classList.remove('hidden');
  };
  
  // Settings
  document.getElementById('btnSaveGh').onclick = saveGitHub;
  document.getElementById('btnForceReload').onclick = () => window.location.reload(true);
  document.getElementById('themeToggle').onclick = () => {
     const isDark = document.body.classList.toggle('dark');
     localStorage.setItem('mcq_theme', isDark ? 'dark' : 'light');
  };
  
  // Notes
  document.getElementById('userNoteArea').oninput = debounce(saveNote, 1000);
}

// --- 6. HELPERS ---
function switchTab(id) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  document.querySelector(`[data-tab="${id}"]`).classList.add('active');
  
  if(id === 'all') applyTableFilters();
  if(id === 'dashboard') renderDashboard();
}

function refreshChapterDropdowns() {
  const chaps = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
  const opts = '<option value="">All Chapters</option>' + 
               chaps.map(c => `<option value="${c}">${c}</option>`).join('');
  
  document.querySelectorAll('.chapter-list, .chapter-dropdown').forEach(s => s.innerHTML = opts);
}

function renderDashboard() {
  const total = App.questions.length;
  const seen = App.questions.filter(q => q.timesSeen).length;
  const correct = App.questions.reduce((a,b) => a + (b.timesCorrect||0), 0);
  const wrong = App.questions.reduce((a,b) => a + (b.timesWrong||0), 0);
  const mastery = (correct + wrong) ? Math.round((correct/(correct+wrong))*100) : 0;
  
  document.getElementById('dashTotal').textContent = total;
  document.getElementById('dashMastery').textContent = mastery + '%';
}

function debounce(func, wait) {
  let t; return function(...args) { clearTimeout(t); t=setTimeout(()=>func.apply(this,args),wait); };
}

function showToast(msg, type='info') {
  const d = document.createElement('div');
  d.className = 'toast';
  d.textContent = msg;
  if(type === 'error') d.style.background = '#ef4444';
  document.getElementById('toastContainer').appendChild(d);
  setTimeout(()=>d.remove(), 3000);
}

// File Ops
async function handleImport() {
  const file = document.getElementById('fileInput').files[0];
  if(!file) return;
  const text = await file.text();
  try {
    const json = JSON.parse(text);
    if(!Array.isArray(json)) throw new Error("Invalid JSON");
    
    const tx = db.transaction('questions', 'readwrite');
    let count = 0;
    json.forEach(q => {
       // Fix ID
       let id = parseInt(String(q.id).replace(/\D/g, ''));
       if(!id || App.questions.some(x=>x.id===id)) id = Date.now() + count;
       
       q.id = id;
       tx.objectStore('questions').put(q);
       count++;
    });
    tx.oncomplete = async () => {
       await refreshGlobalCache();
       showToast(`Imported ${count} Questions`);
       refreshUI();
    };
  } catch(e) { showToast("Import Failed: "+e.message, 'error'); }
}

function handleExport() {
  const blob = new Blob([JSON.stringify(App.questions, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; 
  a.download = 'mcq_backup.json';
  a.click();
}

// Placeholders for GitHub
function updateGitHubStatus() { /* ... */ }
function saveGitHub() { showToast("Saved locally"); }
