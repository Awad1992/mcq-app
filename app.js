// MCQ Ultra-Pro v4.8.0 - Stable Core
const DB_NAME = 'mcqdb_ultra_v48'; // Bumped version to force fresh start if needed
const DB_VERSION = 4;
let db = null;

// State
let currentQ = null;
let allQs = []; // Cache for table
let sortField = 'id';
let sortAsc = true;
let selectedIds = new Set();
let tablePage = 1;
const TABLE_PAGE_SIZE = 50;

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await openDB();
    console.log("DB Opened");
    
    // Init UI
    loadTheme();
    updateGitHubStatus();
    refreshChapterDropdowns();
    
    // Render Initial Tab
    loadNextQuestion(true);
    renderDashboard();
    
    // Global Events
    setupEventListeners();
    
  } catch (e) {
    console.error("FATAL:", e);
    alert("Database failed to open. Please click 'Reload' button.");
  }
});

// --- 2. DATABASE ---
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('questions')) {
        const s = d.createObjectStore('questions', { keyPath: 'id' }); // Manual ID handling
        s.createIndex('chapter', 'chapter', { unique: false });
      }
      if (!d.objectStoreNames.contains('answers')) {
        const a = d.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        a.createIndex('qid', 'questionId', { unique: false });
      }
    };
    req.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

// --- 3. EVENT LISTENERS (The Fix for Buttons) ---
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      
      if(btn.dataset.tab === 'all') renderAllTable();
      if(btn.dataset.tab === 'dashboard') renderDashboard();
    });
  });

  // Practice Buttons
  document.getElementById('btnSubmit')?.addEventListener('click', submitAnswer);
  document.getElementById('btnNext')?.addEventListener('click', () => loadNextQuestion(false));
  document.getElementById('btnPrev')?.addEventListener('click', () => loadPrevQuestion());
  document.getElementById('btnFlag')?.addEventListener('click', toggleFlag);
  document.getElementById('modeSelect')?.addEventListener('change', (e) => {
     document.getElementById('chapterSelect').style.display = e.target.value === 'chapter' ? 'inline-block' : 'none';
     loadNextQuestion(true);
  });
  document.getElementById('chapterSelect')?.addEventListener('change', () => loadNextQuestion(true));
  document.getElementById('btnFocusMode')?.addEventListener('click', () => document.body.classList.add('focus-mode'));
  document.getElementById('btnExitFocus')?.addEventListener('click', () => document.body.classList.remove('focus-mode'));

  // Settings & Backup Buttons
  document.getElementById('btnSaveGitHub')?.addEventListener('click', saveGitHubSettings);
  document.getElementById('btnClearGitHub')?.addEventListener('click', clearGitHubSettings);
  document.getElementById('btnResetProgress')?.addEventListener('click', resetProgress);
  document.getElementById('btnBackupExport')?.addEventListener('click', exportBackup);
  document.getElementById('btnBackupImport')?.addEventListener('click', () => document.getElementById('backupFileInput').click());
  document.getElementById('backupFileInput')?.addEventListener('change', importBackupFile);
  document.getElementById('btnCloudUpload')?.addEventListener('click', uploadToGitHub);
  document.getElementById('btnCloudDownload')?.addEventListener('click', downloadFromGitHub);

  // All Questions Buttons
  document.getElementById('btnAllApply')?.addEventListener('click', renderAllTable);
  document.getElementById('btnImport')?.addEventListener('click', () => document.getElementById('fileInput').click());
  document.getElementById('fileInput')?.addEventListener('change', importNewQuestions);
  document.getElementById('btnAllDelete')?.addEventListener('click', deleteSelected);
  document.getElementById('allSelectAll')?.addEventListener('change', toggleSelectAll);
  
  // Table Headers Sorting
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => handleSort(th.dataset.sort));
  });

  // Edit Modal
  document.getElementById('btnEditSave')?.addEventListener('click', saveEdit);
  document.getElementById('btnEditCancel')?.addEventListener('click', () => document.getElementById('editModal').classList.add('hidden'));
  document.getElementById('btnForceUpdate')?.addEventListener('click', forceReload);
}

// --- 4. PRACTICE ENGINE ---
async function loadNextQuestion(reset) {
  const panel = document.getElementById('questionPanel');
  const fPanel = document.getElementById('feedbackPanel');
  panel.innerHTML = 'Loading...';
  fPanel.style.display = 'none';
  
  const all = await fetchAllQs();
  if (all.length === 0) {
    panel.innerHTML = '<div class="muted">Bank is empty. Import questions in "All Questions" tab.</div>';
    return;
  }

  // Filter Logic
  const mode = document.getElementById('modeSelect').value;
  const chapFilter = document.getElementById('chapterSelect').value;
  const skipSolved = document.getElementById('prefSkipSolved').checked;
  
  let pool = all;

  if (mode === 'chapter' && chapFilter) pool = pool.filter(q => q.chapter === chapFilter);
  if (mode === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
  if (mode === 'flagged') pool = pool.filter(q => q.flagged);
  if (mode === 'new') pool = pool.filter(q => q.timesSeen === 0);
  
  if (skipSolved && mode !== 'new') {
     const unsolved = pool.filter(q => q.timesSeen === 0);
     if (unsolved.length > 0) pool = unsolved;
  }

  if (pool.length === 0) {
    panel.innerHTML = '<div class="muted">No questions match current filters.</div>';
    return;
  }

  // Pick Random
  currentQ = pool[Math.floor(Math.random() * pool.length)];
  renderCurrentQ();
}

function renderCurrentQ() {
  const panel = document.getElementById('questionPanel');
  const noteArea = document.getElementById('userNoteArea');
  
  let html = `<div class="q-text"><strong>[#${currentQ.id}]</strong> ${currentQ.text}</div>`;
  if (currentQ.imageUrl) html += `<img src="${currentQ.imageUrl}" style="max-width:100%; margin-bottom:1rem;">`;
  
  html += '<div style="display:flex; flex-direction:column; gap:8px;">';
  currentQ.choices.forEach((c, i) => {
    html += `<label class="choice" id="c_${i}"><input type="radio" name="ans" value="${i}"> ${c.text} <span onclick="strike(${i}, event)" style="float:right; color:#999; font-size:12px;">(x)</span></label>`;
  });
  html += '</div>';
  
  panel.innerHTML = html;
  noteArea.value = currentQ.userNotes || '';
  noteArea.onchange = () => { currentQ.userNotes = noteArea.value; saveQ(currentQ); };
}

window.strike = (i, e) => {
  e.preventDefault();
  document.getElementById(`c_${i}`).classList.toggle('strikethrough');
};

async function submitAnswer() {
  if (!currentQ) return;
  const sel = document.querySelector('input[name="ans"]:checked');
  if (!sel) return alert('Select an answer');
  
  const choiceIdx = parseInt(sel.value);
  const correctIdx = currentQ.choices.findIndex(c => c.isCorrect);
  const isCorrect = (choiceIdx === correctIdx);
  
  const panel = document.getElementById('feedbackPanel');
  panel.innerHTML = `
    <div style="color: ${isCorrect ? 'green' : 'red'}; font-weight:bold; margin-bottom:8px;">
      ${isCorrect ? 'Correct! 🎉' : 'Wrong ❌'}
    </div>
    <div>${currentQ.explanation || 'No explanation.'}</div>
  `;
  panel.style.display = 'block';
  
  // Highlight
  document.getElementById(`c_${correctIdx}`).classList.add('correct', 'show');
  if (!isCorrect) document.getElementById(`c_${choiceIdx}`).classList.add('wrong', 'show');
  
  // Save Stats
  currentQ.timesSeen = (currentQ.timesSeen || 0) + 1;
  if (isCorrect) currentQ.timesCorrect = (currentQ.timesCorrect || 0) + 1;
  else currentQ.timesWrong = (currentQ.timesWrong || 0) + 1;
  
  await saveQ(currentQ);
  // Log Answer
  const tx = db.transaction('answers', 'readwrite');
  tx.objectStore('answers').add({
    qid: currentQ.id,
    correct: isCorrect,
    ts: new Date().toISOString()
  });
  renderDashboard();
}

// --- 5. ALL QUESTIONS TABLE (With Sorting & Selection) ---
async function renderAllTable() {
  const tbody = document.getElementById('allTableBody');
  tbody.innerHTML = '<tr><td>Loading...</td></tr>';
  
  let list = await fetchAllQs();
  
  // Filters
  const txt = document.getElementById('allSearch').value.toLowerCase();
  const filterType = document.getElementById('allFilter').value;
  const chap = document.getElementById('allChapterSelect').value;
  
  list = list.filter(q => {
    if (txt && !q.text.toLowerCase().includes(txt) && String(q.id) !== txt) return false;
    if (chap && q.chapter !== chap) return false;
    if (filterType === 'notes' && !q.userNotes) return false;
    if (filterType === 'wrong' && (!q.timesWrong || q.timesWrong < 1)) return false;
    if (filterType === 'flagged' && !q.flagged) return false;
    return true;
  });
  
  // Sorting
  list.sort((a, b) => {
    let va = a[sortField] || 0;
    let vb = b[sortField] || 0;
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortAsc ? -1 : 1;
    if (va > vb) return sortAsc ? 1 : -1;
    return 0;
  });
  
  // Pagination
  const start = (tablePage - 1) * TABLE_PAGE_SIZE;
  const paged = list.slice(start, start + TABLE_PAGE_SIZE);
  
  tbody.innerHTML = '';
  paged.forEach(q => {
    const tr = document.createElement('tr');
    const isSel = selectedIds.has(q.id);
    tr.innerHTML = `
      <td><input type="checkbox" class="row-sel" data-id="${q.id}" ${isSel ? 'checked' : ''}></td>
      <td>${q.id}</td>
      <td>${q.text.substring(0, 60)}...</td>
      <td>${q.chapter || '-'}</td>
      <td>${q.timesSeen || 0}</td>
      <td>${q.timesWrong || 0}</td>
      <td><button class="pill-btn" onclick="openEdit(${q.id})">Edit</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Re-attach row checkbox listeners
  document.querySelectorAll('.row-sel').forEach(cb => {
    cb.addEventListener('change', (e) => {
       const id = parseInt(e.target.dataset.id);
       if (e.target.checked) selectedIds.add(id);
       else selectedIds.delete(id);
       updateSelCount();
    });
  });
  
  document.getElementById('allPageInfo').textContent = `${tablePage} / ${Math.ceil(list.length/TABLE_PAGE_SIZE) || 1}`;
}

function handleSort(field) {
  if (sortField === field) sortAsc = !sortAsc;
  else { sortField = field; sortAsc = true; }
  renderAllTable();
}

function toggleSelectAll(e) {
  const checkboxes = document.querySelectorAll('.row-sel');
  checkboxes.forEach(cb => {
    cb.checked = e.target.checked;
    const id = parseInt(cb.dataset.id);
    if (e.target.checked) selectedIds.add(id);
    else selectedIds.delete(id);
  });
  updateSelCount();
}

function updateSelCount() {
  document.getElementById('allSelectedCount').textContent = `${selectedIds.size} selected`;
}

// --- 6. IMPORT / EXPORT & ID FIX ---
async function importNewQuestions() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (!Array.isArray(json)) throw new Error("File is not a JSON array");
      
      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      let count = 0;
      
      for (const q of json) {
        // Force numeric ID - Remove non-digits
        let cleanId = parseInt(String(q.id).replace(/\D/g, ''));
        if (isNaN(cleanId)) cleanId = Date.now() + Math.floor(Math.random()*1000);
        
        const safeQ = {
          id: cleanId,
          text: q.text || "No Text",
          chapter: q.chapter || "Uncategorized",
          choices: q.choices || [],
          explanation: q.explanation || "",
          timesSeen: 0, timesWrong: 0, timesCorrect: 0
        };
        store.put(safeQ);
        count++;
      }
      
      tx.oncomplete = () => {
        alert(`Imported ${count} questions successfully.`);
        refreshChapterDropdowns();
        renderAllTable();
      };
    } catch (err) {
      alert("Import Failed: " + err.message);
    }
  };
  reader.readAsText(file);
}

// --- 7. GITHUB CLOUD (STABILIZED) ---
function updateGitHubStatus() {
  const token = localStorage.getItem('gh_token');
  document.getElementById('syncStatus').textContent = token ? "Cloud: Linked" : "Cloud: Not Linked";
}

function saveGitHubSettings() {
  const t = document.getElementById('ghTokenInput').value;
  const r = document.getElementById('ghRepoInput').value;
  const f = document.getElementById('ghFileInput').value;
  
  if (!t || !r) return alert("Missing Token or Repo");
  
  localStorage.setItem('gh_token', t);
  localStorage.setItem('gh_repo', r);
  localStorage.setItem('gh_file', f);
  alert("Settings Saved!");
  updateGitHubStatus();
}

function clearGitHubSettings() {
  localStorage.removeItem('gh_token');
  localStorage.removeItem('gh_repo');
  alert("Settings Cleared");
  updateGitHubStatus();
}

async function uploadToGitHub() {
  const btn = document.getElementById('btnCloudUpload');
  btn.textContent = "Uploading...";
  
  try {
    const token = localStorage.getItem('gh_token');
    const repo = localStorage.getItem('gh_repo');
    const path = localStorage.getItem('gh_file');
    if (!token) throw new Error("Setup Settings first");

    const questions = await fetchAllQs();
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(questions)))); // UTF-8 safe base64

    // Get SHA first
    const getUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
    const getRes = await fetch(getUrl, { headers: { Authorization: `token ${token}` }});
    const getData = await getRes.json();
    const sha = getData.sha;

    // Upload
    const putRes = await fetch(getUrl, {
      method: 'PUT',
      headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Backup", content: content, sha: sha })
    });

    if (!putRes.ok) throw new Error("Upload failed");
    alert("Upload Successful!");

  } catch (e) {
    alert("Error: " + e.message);
  } finally {
    btn.textContent = "Upload ⬆";
  }
}

async function downloadFromGitHub() {
  const btn = document.getElementById('btnCloudDownload');
  btn.textContent = "Downloading...";
  
  try {
    const token = localStorage.getItem('gh_token');
    const repo = localStorage.getItem('gh_repo');
    const path = localStorage.getItem('gh_file');
    
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${token}` }
    });
    
    if (!res.ok) throw new Error("Download failed");
    const json = await res.json();
    const data = JSON.parse(decodeURIComponent(escape(atob(json.content))));
    
    // Merge logic
    const tx = db.transaction('questions', 'readwrite');
    data.forEach(q => tx.objectStore('questions').put(q));
    
    alert("Downloaded & Merged!");
    renderAllTable();
    
  } catch (e) {
    alert("Error: " + e.message);
  } finally {
    btn.textContent = "Download ⬇";
  }
}

// --- UTILS ---
async function fetchAllQs() {
  const tx = db.transaction('questions', 'readonly');
  return new Promise(resolve => {
    tx.objectStore('questions').getAll().onsuccess = (e) => resolve(e.target.result);
  });
}

async function saveQ(q) {
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(q);
}

async function refreshChapterDropdowns() {
  const qs = await fetchAllQs();
  const chaps = [...new Set(qs.map(q => q.chapter).filter(Boolean))].sort();
  
  document.querySelectorAll('.chapter-dropdown').forEach(sel => {
    sel.innerHTML = '<option value="">All Chapters</option>';
    chaps.forEach(c => {
       sel.innerHTML += `<option value="${c}">${c}</option>`;
    });
  });
}

async function renderDashboard() {
  const qs = await fetchAllQs();
  const wrong = qs.reduce((a, b) => a + (b.timesWrong || 0), 0);
  const seen = qs.filter(q => q.timesSeen > 0).length;
  
  document.getElementById('dashOverall').innerHTML = `
    <h3>Total Qs: ${qs.length}</h3>
    <p>Answered: ${seen}</p>
    <p>Total Errors: ${wrong}</p>
  `;
}

// Edit Logic
window.openEdit = async (id) => {
  const tx = db.transaction('questions', 'readonly');
  tx.objectStore('questions').get(id).onsuccess = (e) => {
    const q = e.target.result;
    document.getElementById('editText').value = q.text;
    document.getElementById('editChapter').value = q.chapter;
    document.getElementById('editModal').classList.remove('hidden');
    // (Ideally populate choices dynamically here)
  };
};

function forceReload() {
  if(confirm("Reload app?")) window.location.reload(true);
}
