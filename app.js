/**
 * MCQ Ultra-Pro v9.5 (Diagnostic Fix)
 * Fixes: GitHub Error Details, Settings Persistence, Nav Buttons Logic.
 */

const DB_NAME = 'mcq_pro_v9';
const DB_VERSION = 14; 
let db = null;

// --- GLOBAL STATE ---
const App = {
    questions: [],
    selectedIds: new Set(),
    currentQ: null,
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1, limit: 50,
    rangeMode: false, lastCheckId: null, skipSolved: true,
    user: { xp: 0, rank: 'Intern' },
    duplicates: []
};

// --- HELPER FUNCTIONS ---
function showToast(msg, type='success') {
    const container = document.getElementById('toastContainer');
    if(!container) return;
    const d = document.createElement('div');
    d.className = `toast`;
    d.style.background = type==='error' ? '#ef4444' : (type==='warn' ? '#f59e0b' : '#1e293b');
    d.textContent = msg;
    container.appendChild(d);
    setTimeout(() => d.remove(), 4000);
}

function bindEvent(id, event, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
}

function debounce(fn, ms) { 
    let t; return (...args) => { clearTimeout(t); t=setTimeout(()=>fn(...args),ms); }; 
}

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Load Settings FIRST to ensure UI is ready
        loadSettingsToUI();

        // 2. Start Database
        db = await initDB();
        await loadData();
        
        // 3. Setup UI Events
        setupEvents();
        refreshUI();
        
        // 4. Start App Features
        buildFlashcardPool();
        loadNextQuestion(true);
        
        console.log('System v9.5 Loaded');
    } catch (e) {
        console.error(e);
        alert("Init Error: " + e.message);
    }
});

// --- 2. DATABASE ---
function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            if (!d.objectStoreNames.contains('questions')) d.createObjectStore('questions', { keyPath: 'id' });
            if (!d.objectStoreNames.contains('user')) d.createObjectStore('user', { keyPath: 'key' });
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = (e) => reject(e.target.error);
    });
}

async function loadData() {
    return new Promise(resolve => {
        const tx = db.transaction(['questions', 'user'], 'readonly');
        tx.objectStore('questions').getAll().onsuccess = (e) => App.questions = e.target.result || [];
        tx.objectStore('user').get('profile').onsuccess = (e) => { if(e.target.result) App.user = e.target.result; };
        tx.oncomplete = resolve;
    });
}

// --- 3. SETTINGS & GITHUB (FIXED PERSISTENCE) ---
function loadSettingsToUI() {
    const t = localStorage.getItem('gh_token') || '';
    const r = localStorage.getItem('gh_repo') || '';
    const f = localStorage.getItem('gh_file') || 'mcq_backup.json';
    
    const elToken = document.getElementById('ghToken');
    const elRepo = document.getElementById('ghRepo');
    const elFile = document.getElementById('ghFile');
    
    if(elToken) elToken.value = t;
    if(elRepo) elRepo.value = r;
    if(elFile) elFile.value = f;
    
    updateSyncStatus(t && r);
}

function saveSettings() {
    const t = document.getElementById('ghToken').value.trim();
    const r = document.getElementById('ghRepo').value.trim();
    const f = document.getElementById('ghFile').value.trim();
    
    if(!t || !r) return showToast("Token & Repo required!", "error");

    localStorage.setItem('gh_token', t);
    localStorage.setItem('gh_repo', r);
    localStorage.setItem('gh_file', f);
    
    showToast('Settings Saved & Persisted ✅');
    updateSyncStatus(t && r);
}

function updateSyncStatus(connected) {
    const el = document.getElementById('syncStatus');
    if(el) {
        el.textContent = connected ? "☁️ Ready" : "☁️ Setup Needed";
        el.style.borderColor = connected ? "var(--success)" : "var(--border)";
    }
}

// --- GITHUB CLOUD LOGIC (DIAGNOSTIC) ---
function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
function deb64(s) { return decodeURIComponent(escape(atob(s))); }

async function cloudUpload() {
    const t = localStorage.getItem('gh_token');
    const r = localStorage.getItem('gh_repo');
    const f = localStorage.getItem('gh_file');
    
    if(!t || !r) return alert("Please go to Settings and enter your GitHub Token & Repo.");

    showToast("Uploading...", "warn");

    try {
        const content = b64(JSON.stringify(App.questions));
        const url = `https://api.github.com/repos/${r}/contents/${f}`;
        
        // 1. Check if file exists to get SHA (required for update)
        let sha = null;
        try { 
            const check = await fetch(url, {headers:{Authorization:`token ${t}`}});
            if(check.ok) {
                const json = await check.json();
                sha = json.sha;
            }
        } catch(e) { console.warn("SHA Check error", e); }

        // 2. Upload
        const body = {
            message: "MCQ Backup " + new Date().toISOString(),
            content: content
        };
        if(sha) body.sha = sha;

        const res = await fetch(url, {
            method: 'PUT',
            headers: { Authorization: `token ${t}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if(!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        
        showToast('Upload Successful! ✅');

    } catch(e) { 
        alert(`Upload Failed:\n${e.message}\n\nCheck Token permissions (needs 'repo' scope).`);
    }
}

async function cloudDownload() {
    const t = localStorage.getItem('gh_token');
    const r = localStorage.getItem('gh_repo');
    const f = localStorage.getItem('gh_file');
    
    if(!t || !r) return alert("Please go to Settings and enter your GitHub Token & Repo.");
    
    showToast("Downloading...", "warn");

    try {
        const url = `https://api.github.com/repos/${r}/contents/${f}`;
        const res = await fetch(url, {headers:{Authorization:`token ${t}`}});
        
        if(res.status === 404) throw new Error("File not found in repo. Please UPLOAD first to create it.");
        if(res.status === 401) throw new Error("Invalid Token. Check Settings.");
        if(!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        
        const json = await res.json();
        const data = JSON.parse(deb64(json.content));
        
        // Smart Merge
        const tx = db.transaction('questions','readwrite');
        let count = 0;
        data.forEach(q => {
            tx.objectStore('questions').put(q);
            count++;
        });
        
        tx.oncomplete = () => { 
            loadData(); 
            refreshUI(); 
            showToast(`Downloaded & Merged ${count} questions! ✅`);
            loadNextQuestion(true);
        };
    } catch(e) { 
        alert(`Download Failed:\n${e.message}`);
    }
}


// --- 4. PRACTICE ENGINE ---
async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    
    if(panel) panel.innerHTML = '<div class="muted" style="padding:20px; text-align:center">Loading...</div>';
    if(fb) fb.classList.add('hidden');
    
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');
    document.getElementById('btnNext').classList.add('hidden'); // HIDE Next until answer

    if (App.questions.length === 0) {
        if(panel) panel.innerHTML = '<div class="muted" style="text-align:center">Bank Empty. Import JSON.</div>';
        return;
    }

    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;

    // Filter Logic
    if (m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
    if (m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if (m === 'flagged') pool = pool.filter(q => q.flagged);
    if (m === 'maintain') pool = pool.filter(q => q.maintenance);
    if (m === 'new') pool = pool.filter(q => !q.timesSeen);
    if (m === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= Date.now());

    if (skip && m !== 'new' && m !== 'maintain') {
        const unseen = pool.filter(q => !q.timesSeen);
        if (unseen.length > 0) pool = unseen;
    }

    if (pool.length === 0) {
        if(panel) panel.innerHTML = '<div class="muted" style="text-align:center">No questions match filters.</div>';
        App.currentQ = null;
        return;
    }

    // Random Pick
    App.currentQ = pool[Math.floor(Math.random() * pool.length)];
    renderQuestionUI();
}

function renderQuestionUI() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    const note = document.getElementById('userNoteArea');
    const flagBtn = document.getElementById('btnFlag');
    
    if(flagBtn) {
        flagBtn.textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
        flagBtn.style.color = q.flagged ? "#ef4444" : "";
    }
    if(note) note.value = q.userNotes || "";
    document.getElementById('guessCheck').checked = false;
    
    let h = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    
    h += `<div class="choices-list">`;
    (q.choices || []).forEach((c, i) => {
        h += `
        <div class="choice-container">
           <div class="choice" id="c_${i}" onclick="selectChoice(${i})">
              <strong>${String.fromCharCode(65+i)}.</strong> ${c.text}
           </div>
           <button class="btn-strike" onclick="toggleStrike(${i})">✕</button>
        </div>`;
    });
    h += `</div>`;
    
    if(panel) panel.innerHTML = h;
    
    // Search Links
    const term = encodeURIComponent(q.chapter || 'Medicine');
    const tools = document.getElementById('searchTools');
    if(tools) {
        tools.innerHTML = `
          <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
          <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
        `;
    }
}

function submitAnswer() {
    if(!App.currentQ) return;
    const sel = document.querySelector('.choice.selected');
    if(!sel) return showToast("Select an answer", "error");
    
    const idx = parseInt(sel.id.split('_')[1]);
    const correctIdx = App.currentQ.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `
      <div style="font-weight:bold; color:${isCorrect?'#10b981':'#ef4444'}; margin-bottom:10px;">
         ${isCorrect ? 'Correct! 🎉' : 'Wrong ❌'}
      </div>
      <div class="muted">${App.currentQ.explanation || 'No explanation.'}</div>
    `;
    
    document.getElementById(`c_${correctIdx}`).classList.add('correct');
    if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong');
    
    // HIDE Submit, SHOW Next & SRS
    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    
    // Stats
    const q = App.currentQ;
    q.timesSeen = (q.timesSeen||0)+1;
    if(isCorrect) q.timesCorrect = (q.timesCorrect||0)+1;
    else q.timesWrong = (q.timesWrong||0)+1;
    
    if(!q.dueDate) q.dueDate = Date.now(); 
    saveQuestion(q);
}

function handleSRS(grade) {
    const q = App.currentQ;
    let days = 1;
    if(grade===4) days=7; if(grade===3) days=4; if(grade===2) days=2;
    q.dueDate = Date.now() + (days * 24 * 60 * 60 * 1000);
    saveQuestion(q);
    loadNextQuestion(false);
}

function saveNote() {
    if(App.currentQ) { 
        App.currentQ.userNotes = document.getElementById('userNoteArea').value; 
        saveQuestion(App.currentQ); 
        document.getElementById('saveNoteStatus').textContent = "Saved ✓"; 
    }
}

// --- 5. EVENTS ---
function setupEvents() {
    // Navigation
    document.querySelectorAll('.tab-button').forEach(b => 
        b.addEventListener('click', () => switchTab(b.dataset.tab)));
    
    // Practice
    bindEvent('btnSubmit', 'click', submitAnswer);
    bindEvent('btnNext', 'click', () => loadNextQuestion(false));
    bindEvent('btnPrev', 'click', () => showToast("History prev not active", "error"));
    bindEvent('btnFlag', 'click', () => { if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQuestion(App.currentQ); renderQuestionUI(); }});
    bindEvent('btnMaintain', 'click', toggleMaintenance);
    bindEvent('btnSaveMaint', 'click', saveMaintenanceNote);
    bindEvent('btnSaveNoteManual', 'click', saveNote);
    
    bindEvent('modeSelect', 'change', () => {
        const m = document.getElementById('modeSelect').value;
        document.getElementById('chapterBox').style.display = (m==='chapter') ? 'block' : 'none';
        loadNextQuestion(true);
    });
    bindEvent('chapterSelect', 'change', () => loadNextQuestion(true));
    
    // SRS
    bindEvent('btnSrsAgain', 'click', () => handleSRS(1));
    bindEvent('btnSrsHard', 'click', () => handleSRS(2));
    bindEvent('btnSrsGood', 'click', () => handleSRS(3));
    bindEvent('btnSrsEasy', 'click', () => handleSRS(4));

    // Library / Table
    bindEvent('btnAllApply', 'click', applyTableFilters);
    bindEvent('allSelectAll', 'click', toggleSelectAll);
    bindEvent('btnScanDup', 'click', scanDuplicates);
    bindEvent('btnFixDup', 'click', fixDuplicates);
    
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => sortTable(th.dataset.key));
    });
    
    bindEvent('allPrevPage', 'click', () => { if(App.page>1){App.page--; renderTable();} });
    bindEvent('allNextPage', 'click', () => { App.page++; renderTable(); });

    // Import/Export
    bindEvent('btnImportTrigger', 'click', () => document.getElementById('fileInput').click());
    bindEvent('fileInput', 'change', handleImport);
    bindEvent('btnExportTrigger', 'click', handleExport);
    
    // Settings
    bindEvent('btnSaveGh', 'click', saveSettings);
    bindEvent('btnCloudUpload', 'click', cloudUpload);
    bindEvent('btnCloudDownload', 'click', cloudDownload);
    bindEvent('btnResetProgress', 'click', resetProgress);
    bindEvent('btnFactoryReset', 'click', () => { if(confirm("WIPE DB?")) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }});
    
    // Flashcards
    bindEvent('btnFcShuffle', 'click', buildFlashcardPool);
    bindEvent('btnFcShow', 'click', () => { 
        document.getElementById('fcBack').classList.remove('hidden');
        document.getElementById('fcGrading').classList.remove('hidden');
    });
    bindEvent('btnFcGradeAgain', 'click', () => nextFlashcard(false));
    bindEvent('btnFcGradeGood', 'click', () => nextFlashcard(true));

    // Exam
    bindEvent('btnStartExam', 'click', startExam);
    bindEvent('btnExamNext', 'click', () => examMove(1));
    bindEvent('btnExamPrev', 'click', () => examMove(-1));
    bindEvent('btnExamFinish', 'click', finishExam);
    bindEvent('btnExamClose', 'click', () => { document.getElementById('examResults').classList.add('hidden'); switchTab('home'); });

    // Notes Auto-save
    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 1000));
}

// --- 6. TABLE & LIBRARY ---
function applyTableFilters() {
    const search = document.getElementById('allSearch').value.toLowerCase();
    const type = document.getElementById('allFilter').value;
    const chap = document.getElementById('allChapterSelect').value;
    
    App.tableQs = App.questions.filter(q => {
        if(search && !q.text.toLowerCase().includes(search) && String(q.id) !== search) return false;
        if(chap && q.chapter !== chap) return false;
        if(type === 'maintain' && !q.maintenance) return false;
        if(type === 'notes' && !q.userNotes) return false;
        if(type === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
        if(type === 'flagged' && !q.flagged) return false;
        return true;
    });
    App.page = 1;
    App.selectedIds.clear();
    updateBulkUI();
    renderTable();
}

function sortTable(field) {
    App.sort.asc = (App.sort.field === field) ? !App.sort.asc : true;
    App.sort.field = field;
    
    // UI Update
    document.querySelectorAll('.sortable').forEach(th => {
        th.textContent = th.dataset.key === field 
           ? `${th.dataset.key.toUpperCase()} ${App.sort.asc ? '↑' : '↓'}`
           : `${th.dataset.key.toUpperCase()} ↕`;
    });

    App.tableQs.sort((a, b) => {
        let vA = a[field] || 0;
        let vB = b[field] || 0;
        if(typeof vA === 'string') { vA=vA.toLowerCase(); vB=vB.toLowerCase(); }
        if(vA < vB) return App.sort.asc ? -1 : 1;
        if(vA > vB) return App.sort.asc ? 1 : -1;
        return 0;
    });
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('allTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    
    if(data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">No Data</td></tr>';
        return;
    }
    
    data.forEach(q => {
        const tr = document.createElement('tr');
        const isSel = App.selectedIds.has(q.id);
        const maint = q.maintenance ? '🔧' : '';
        const dateStr = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '-';
        
        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" ${isSel?'checked':''}></td>
           <td>${q.id}</td>
           <td style="font-size:0.75rem; color:#666;">${dateStr}</td>
           <td>${q.text.substring(0,50)}...</td>
           <td>${q.chapter||'-'}</td>
           <td>${maint}</td>
           <td><button class="pill-btn small" onclick="alert('Use AI Builder to Edit')">✎</button></td>
        `;
        
        tr.querySelector('.row-cb').onclick = (e) => handleCheck(e, q.id);
        tbody.appendChild(tr);
    });
    document.getElementById('allPageInfo').textContent = App.page;
}

function handleCheck(e, id) {
    if(App.rangeMode && App.lastCheckId !== null && e.target.checked) {
        const all = App.tableQs.map(q => q.id);
        const s = all.indexOf(App.lastCheckId);
        const n = all.indexOf(id);
        if(s > -1 && n > -1) {
            const min = Math.min(s,n), max = Math.max(s,n);
            for(let i=min; i<=max; i++) App.selectedIds.add(all[i]);
        }
    } else {
        if(e.target.checked) App.selectedIds.add(id);
        else App.selectedIds.delete(id);
    }
    App.lastCheckId = id;
    updateBulkUI();
}

function toggleSelectAll(e) {
    const checked = e.target.checked;
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    data.forEach(q => {
        if(checked) App.selectedIds.add(q.id); else App.selectedIds.delete(q.id);
    });
    updateBulkUI();
    renderTable();
}

function updateBulkUI() {
    const c = App.selectedIds.size;
    const lbl = document.getElementById('selCount');
    if(lbl) lbl.textContent = `${c} Selected`;
}

// --- 7. FLASHCARDS & EXAM ---
let fcPool = [], fcIdx = 0;
function buildFlashcardPool() {
    const src = document.getElementById('fcSource').value;
    let pool = App.questions.filter(q => q.active !== false);
    if(src === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= Date.now());
    if(src === 'weak') pool = pool.filter(q => q.timesWrong > 0);
    fcPool = pool.sort(() => Math.random()-0.5);
    fcIdx = 0;
    renderFlashcard();
}

function renderFlashcard() {
    const front = document.getElementById('flashcardFront');
    const back = document.getElementById('flashcardBack');
    const grading = document.getElementById('fcGrading');
    
    if(fcPool.length === 0) { front.textContent = "No cards match filter."; return; }
    const q = fcPool[fcIdx];
    const ans = q.choices.find(c=>c.isCorrect);
    
    front.textContent = q.text;
    back.innerHTML = `<b>Answer:</b> ${ans ? ans.text : '?'}`;
    back.classList.add('hidden');
    grading.classList.add('hidden');
}

function nextFlashcard(good) {
    if(fcIdx < fcPool.length -1) fcIdx++; else fcIdx = 0;
    renderFlashcard();
}

// Exam
let examSession = null;
function startExam() {
    const count = parseInt(document.getElementById('examCount').value) || 40;
    const pool = App.questions.sort(() => Math.random()-0.5).slice(0, count);
    examSession = { qs: pool, answers: {}, index: 0 };
    document.getElementById('examInterface').classList.remove('hidden');
    renderExamQ();
}

function renderExamQ() {
    const q = examSession.qs[examSession.index];
    document.getElementById('examProgress').textContent = `Q ${examSession.index+1}/${examSession.qs.length}`;
    let h = `<div class="q-text">${q.text}</div>`;
    q.choices.forEach((c, i) => {
       h += `<label class="choice"><input type="radio" name="exAns" value="${i}"> ${c.text}</label>`;
    });
    document.getElementById('examQPanel').innerHTML = h;
}

function examMove(dir) {
    const sel = document.querySelector('input[name="exAns"]:checked');
    if(sel) examSession.answers[examSession.qs[examSession.index].id] = parseInt(sel.value);
    const next = examSession.index + dir;
    if(next >= 0 && next < examSession.qs.length) {
        examSession.index = next;
        renderExamQ();
    }
}

function finishExam() {
    examMove(0);
    let correct = 0;
    examSession.qs.forEach(q => {
       const ans = examSession.answers[q.id];
       const cor = q.choices.findIndex(c=>c.isCorrect);
       if(ans === cor) correct++;
    });
    document.getElementById('examInterface').classList.add('hidden');
    document.getElementById('examResults').classList.remove('hidden');
    document.getElementById('examScore').innerHTML = `<h2>Score: ${correct} / ${examSession.qs.length}</h2>`;
}

// --- UTILS ---
function saveQuestion(q) {
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);
}
function toggleMaintenance() { document.getElementById('maintBox').classList.toggle('hidden'); }
function saveMaintenanceNote() { 
    if(App.currentQ) { App.currentQ.maintenance = true; App.currentQ.maintenanceNote = document.getElementById('maintNote').value; saveQuestion(App.currentQ); showToast("Reported"); }
}
function selectChoice(idx) {
   if(document.getElementById('feedbackPanel').classList.contains('hidden')) {
       document.querySelectorAll('.choice').forEach(e=>e.classList.remove('selected'));
       document.getElementById(`c_${idx}`).classList.add('selected');
   }
}
function toggleStrike(idx) { document.getElementById(`c_${idx}`).classList.toggle('strikethrough'); }

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    if(id === 'all') applyTableFilters();
    if(id === 'flashcards') buildFlashcardPool();
}

function refreshUI() {
    const ch = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All Chapters</option>' + ch.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}

// Import/Export
async function handleImport() {
    const file = document.getElementById('fileInput').files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            const tx = db.transaction('questions', 'readwrite');
            json.forEach(q => {
                q.id = parseInt(String(q.id).replace(/\D/g,'')) || Date.now();
                tx.objectStore('questions').put(q);
            });
            tx.oncomplete = async () => { await loadData(); refreshUI(); showToast('Imported'); };
        } catch(err) { alert(err.message); }
    };
    reader.readAsText(file);
}

function handleExport() {
    const b = new Blob([JSON.stringify(App.questions, null, 2)], {type:'application/json'});
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href=u; a.download='MCQ_Backup.json'; a.click();
}

function scanDuplicates() {
    const map = new Map(); App.duplicates = [];
    App.questions.forEach(q => {
        const k = (q.text||"").substring(0,40).toLowerCase();
        if(map.has(k)) App.duplicates.push(q); else map.set(k, q);
    });
    document.getElementById('dupResult').textContent = `${App.duplicates.length} Dups`;
    if(App.duplicates.length > 0) document.getElementById('btnFixDup').classList.remove('hidden');
}

async function fixDuplicates() {
    const tx = db.transaction('questions','readwrite');
    App.duplicates.forEach(q => tx.objectStore('questions').delete(q.id));
    tx.oncomplete = async () => { await loadData(); scanDuplicates(); showToast('Fixed'); };
}

function resetProgress() { if(confirm("Reset stats?")) { const tx=db.transaction('questions','readwrite'); App.questions.forEach(q=>{q.timesSeen=0; q.timesWrong=0; tx.objectStore('questions').put(q)}); tx.oncomplete=()=>location.reload(); } }

// Edit Logic (Placeholder to prevent error)
window.openEdit = (id) => { alert("Use AI Builder for editing questions in this version."); }