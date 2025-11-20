/**
 * MCQ Ultra-Pro v9.6.0 (Final Polish)
 * Fixed: Edit Button, Range Select UI, Settings Load, Nav Buttons.
 */

const DB_NAME = 'mcq_pro_v9';
const DB_VERSION = 15; // Force upgrade to clean state
let db = null;

// --- GLOBAL STATE ---
const App = {
    questions: [],
    tableQs: [],
    selectedIds: new Set(),
    currentQ: null,
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1, limit: 50,
    rangeMode: false, lastCheckId: null, skipSolved: true,
    user: { xp: 0, rank: 'Intern' },
    duplicates: []
};

// --- 0. HELPER FUNCTIONS ---
function showToast(msg, type='success') {
    const d = document.createElement('div');
    d.className = `toast`;
    d.style.background = type==='error' ? '#ef4444' : (type==='warn' ? '#f59e0b' : '#1e293b');
    d.textContent = msg;
    document.getElementById('toastContainer').appendChild(d);
    setTimeout(() => d.remove(), 3000);
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
        db = await initDB();
        await loadData();
        
        loadSettingsToUI();
        setupEvents();
        refreshUI();
        
        buildFlashcardPool();
        loadNextQuestion(true);
        
        showToast('System v9.6 Ready 💎');
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

// --- 3. SETTINGS & GITHUB ---
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
    
    localStorage.setItem('gh_token', t);
    localStorage.setItem('gh_repo', r);
    localStorage.setItem('gh_file', f);
    
    showToast('Settings Saved ✅');
    updateSyncStatus(t && r);
}

function updateSyncStatus(connected) {
    const el = document.getElementById('syncStatus');
    if(el) {
        el.textContent = connected ? "☁️ Linked" : "☁️ Offline";
        el.style.borderColor = connected ? "var(--success)" : "var(--border)";
    }
}

// --- 4. PRACTICE ENGINE ---
async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    const maintBox = document.getElementById('maintBox');
    
    if(panel) panel.innerHTML = '<div class="muted p-20" style="text-align:center">Loading...</div>';
    if(fb) fb.classList.add('hidden');
    if(maintBox) maintBox.classList.add('hidden');
    
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');
    document.getElementById('btnNext').classList.add('hidden'); // Hide until answered

    if (App.questions.length === 0) {
        if(panel) panel.innerHTML = '<div class="muted p-20" style="text-align:center">Bank Empty. Import JSON.</div>';
        return;
    }

    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;

    if (m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
    if (m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if (m === 'flagged') pool = pool.filter(q => q.flagged);
    if (m === 'maintain') pool = pool.filter(q => q.maintenance);
    if (m === 'new') pool = pool.filter(q => !q.timesSeen);
    if (m === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= Date.now());

    if (skip && m !== 'new' && m !== 'maintain') {
        pool = pool.filter(q => !q.timesSeen);
    }

    if (pool.length === 0) {
        if(panel) panel.innerHTML = '<div class="muted p-20" style="text-align:center">No questions match filters.</div>';
        App.currentQ = null;
        return;
    }

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
    
    let h = "";
    if(q.maintenance) h += `<div class="chip" style="background:#fff7ed; color:#c2410c; margin-bottom:10px;">🔧 Note: ${q.maintenanceNote||'-'}</div>`;
    h += `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    
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
    document.getElementById('btnNext').classList.remove('hidden'); // SHOW NEXT
    
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

function toggleFlagCurrent() {
    if(App.currentQ) { 
        App.currentQ.flagged = !App.currentQ.flagged; 
        saveQuestion(App.currentQ); 
        renderQuestionUI(); 
    }
}

function toggleMaintenance() {
    document.getElementById('maintBox').classList.toggle('hidden');
}

function saveMaintenanceNote() {
    if(App.currentQ) {
        App.currentQ.maintenance = true;
        App.currentQ.maintenanceNote = document.getElementById('maintNote').value;
        saveQuestion(App.currentQ);
        showToast("Reported");
        document.getElementById('maintBox').classList.add('hidden');
    }
}

function saveNote() {
    if(App.currentQ) { 
        App.currentQ.userNotes = document.getElementById('userNoteArea').value; 
        saveQuestion(App.currentQ); 
        document.getElementById('saveNoteStatus').textContent = "Saved ✓"; 
    }
}

function selectChoice(idx) {
   if(document.getElementById('feedbackPanel').classList.contains('hidden')) {
       document.querySelectorAll('.choice').forEach(e=>e.classList.remove('selected'));
       document.getElementById(`c_${idx}`).classList.add('selected');
   }
}
function toggleStrike(idx) { document.getElementById(`c_${idx}`).classList.toggle('strikethrough'); }

// --- 5. TABLE & LIBRARY ---
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
        if(type === 'unseen' && q.timesSeen > 0) return false;
        return true;
    });
    App.page = 1;
    App.selectedIds.clear();
    updateBulkUI();
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
           <td><button class="pill-btn small" onclick="openEdit(${q.id})">✎</button></td>
        `;
        
        // Manual Binding for Row Select
        const cb = tr.querySelector('.row-cb');
        cb.onclick = (e) => handleCheck(e, q.id);
        
        tbody.appendChild(tr);
    });
    document.getElementById('allPageInfo').textContent = App.page;
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

function updateBulkUI() {
    const c = App.selectedIds.size;
    const lbl = document.getElementById('selCount');
    if(lbl) lbl.textContent = `${c} Selected`;
}

function toggleRangeMode() {
    App.rangeMode = !App.rangeMode;
    const btn = document.getElementById('btnRangeMode');
    btn.classList.toggle('range-active', App.rangeMode);
    btn.textContent = App.rangeMode ? "✨ Range: ON" : "✨ Range Select";
    showToast(App.rangeMode ? "Range ON (Shift Logic)" : "Range OFF");
}

// --- 6. DUPLICATES ---
function scanDuplicates() {
    const map = new Map();
    const dups = [];
    App.questions.forEach(q => {
        const key = (q.text||"").substring(0,40).toLowerCase();
        if(map.has(key)) dups.push(q); else map.set(key, q);
    });
    App.duplicates = dups;
    document.getElementById('dupResult').textContent = `${dups.length} Dups`;
    if(dups.length>0) document.getElementById('btnFixDup').classList.remove('hidden');
}

async function fixDuplicates() {
    if(!confirm('Remove duplicates?')) return;
    const tx = db.transaction('questions','readwrite');
    App.duplicates.forEach(q => tx.objectStore('questions').delete(q.id));
    tx.oncomplete = async () => { await loadData(); scanDuplicates(); showToast('Fixed'); };
}

// --- 7. EVENTS BINDING ---
function setupEvents() {
    document.querySelectorAll('.tab-button').forEach(b => 
        b.addEventListener('click', () => switchTab(b.dataset.tab)));
    
    // Practice
    bindEvent('btnSubmit', 'click', submitAnswer);
    bindEvent('btnNext', 'click', () => loadNextQuestion(false));
    bindEvent('btnPrev', 'click', () => showToast("History prev not active", "error"));
    bindEvent('btnFlag', 'click', toggleFlagCurrent);
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

    // Library
    bindEvent('btnAllApply', 'click', applyTableFilters);
    bindEvent('allSelectAll', 'click', toggleSelectAll);
    bindEvent('btnRangeMode', 'click', toggleRangeMode);
    bindEvent('btnScanDup', 'click', scanDuplicates);
    bindEvent('btnFixDup', 'click', fixDuplicates);
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
    bindEvent('btnFcAgain', 'click', () => nextFlashcard(false));
    bindEvent('btnFcGood', 'click', () => nextFlashcard(true));

    // Exam
    bindEvent('btnStartExam', 'click', startExam);
    bindEvent('btnExamNext', 'click', () => examMove(1));
    bindEvent('btnExamPrev', 'click', () => examMove(-1));
    bindEvent('btnExamFinish', 'click', finishExam);
    bindEvent('btnExamClose', 'click', () => { document.getElementById('examResults').classList.add('hidden'); switchTab('home'); });

    // Edit Modal
    bindEvent('btnSaveEdit', 'click', saveEditModal);
    bindEvent('btnCancelEdit', 'click', closeEditModal);
    bindEvent('btnAddChoice', 'click', addEditChoice);

    // Note Auto
    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 1000));
    
    // Theme
    document.getElementById('themeToggle').onclick = () => {
        document.body.classList.toggle('dark');
    };
}

// --- 8. EDIT MODAL (FIXED) ---
window.openEdit = async (id) => {
    const q = App.questions.find(x => x.id === id);
    if(!q) return;
    
    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editModal').dataset.id = id;
    document.getElementById('editText').value = q.text || '';
    document.getElementById('editChapter').value = q.chapter || '';
    document.getElementById('editTags').value = (q.tags||[]).join(',');
    document.getElementById('editExplanation').value = q.explanation || '';
    document.getElementById('editMaint').checked = !!q.maintenance;

    const list = document.getElementById('editChoicesList');
    list.innerHTML = '';
    (q.choices||[]).forEach(c => addEditChoice(c.text, c.isCorrect));
};

function addEditChoice(text='', isCorrect=false) {
    const d = document.createElement('div');
    d.className = 'edit-choice-row';
    d.innerHTML = `
      <input class="std-input flex-grow c-val" value="${text}">
      <label><input type="radio" name="ec-cor" ${isCorrect?'checked':''}> Correct</label>
      <button class="danger-btn small" onclick="this.parentElement.remove()">✕</button>
    `;
    document.getElementById('editChoicesList').appendChild(d);
}

function saveEditModal() {
    const id = parseInt(document.getElementById('editModal').dataset.id);
    const q = App.questions.find(x => x.id === id);
    q.text = document.getElementById('editText').value;
    q.chapter = document.getElementById('editChapter').value;
    q.explanation = document.getElementById('editExplanation').value;
    q.maintenance = document.getElementById('editMaint').checked;
    
    const choices = [];
    document.querySelectorAll('.edit-choice-row').forEach(row => {
        choices.push({
            text: row.querySelector('.c-val').value,
            isCorrect: row.querySelector('input[type=radio]').checked
        });
    });
    q.choices = choices;
    
    saveQuestion(q);
    document.getElementById('editModal').classList.add('hidden');
    applyTableFilters();
    showToast('Saved');
}

function closeEditModal() { document.getElementById('editModal').classList.add('hidden'); }

// --- UTILS ---
function saveQuestion(q) {
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);
}

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
    const h = '<option value="">All</option>' + ch.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}

// Import
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

function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
function deb64(s) { return decodeURIComponent(escape(atob(s))); }

async function cloudUpload() {
    const t = localStorage.getItem('gh_token'), r = localStorage.getItem('gh_repo'), f = localStorage.getItem('gh_file');
    if(!t) return alert("Check Settings");
    try {
        const c = b64(JSON.stringify(App.questions));
        let sha = null;
        try { const g = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {headers:{Authorization:`token ${t}`}}); if(g.ok) sha = (await g.json()).sha; } catch(e){}
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, { method:'PUT', headers:{Authorization:`token ${t}`, 'Content-Type':'application/json'}, body:JSON.stringify({message:'Backup', content:c, sha}) });
        if(res.ok) showToast('Uploaded'); else alert('Error');
    } catch(e) { alert(e.message); }
}

async function cloudDownload() {
    const t = localStorage.getItem('gh_token'), r = localStorage.getItem('gh_repo'), f = localStorage.getItem('gh_file');
    if(!t) return alert("Check Settings");
    try {
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {headers:{Authorization:`token ${t}`}});
        if(!res.ok) throw new Error('Failed');
        const d = JSON.parse(deb64((await res.json()).content));
        const tx = db.transaction('questions','readwrite');
        d.forEach(q => tx.objectStore('questions').put(q));
        tx.oncomplete = () => { loadData(); refreshUI(); showToast('Downloaded'); };
    } catch(e) { alert(e.message); }
}

function resetProgress() {
    if(!confirm('Reset Stats?')) return;
    const tx = db.transaction('questions','readwrite');
    App.questions.forEach(q=>{ q.timesSeen=0; q.timesCorrect=0; q.timesWrong=0; tx.objectStore('questions').put(q); });
    tx.oncomplete = () => location.reload();
}

// Flashcards
let fcPool = []; let fcIdx = 0;
function buildFlashcardPool() {
    fcPool = App.questions.filter(q => q.active !== false);
    fcIdx = 0; renderFC();
}
function renderFC() {
    if(fcPool.length===0) return;
    const q = fcPool[fcIdx];
    const cor = q.choices.find(c=>c.isCorrect);
    document.getElementById('flashcardFront').textContent = q.text;
    document.getElementById('flashcardBack').innerHTML = `<b>Answer:</b> ${cor?cor.text:'?'}`;
    document.getElementById('flashcardBack').classList.add('hidden');
}
function nextFlashcard(good) {
    if(fcIdx < fcPool.length -1) fcIdx++; else fcIdx = 0;
    renderFC();
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
async function execBulk(act) {
    if(!confirm(`Bulk ${act}?`)) return;
    const tx = db.transaction('questions', 'readwrite');
    App.selectedIds.forEach(id => {
        if(act==='delete') tx.objectStore('questions').delete(id);
        // Add flag logic if needed
    });
    tx.oncomplete = async () => { await loadData(); applyTableFilters(); showToast("Done"); };
}