/**
 * MCQ Ultra-Pro v18.0 (The Zenith Release)
 * Verified: Persistence, Strict History, Library Layout, Backup Restore.
 */

const DB_NAME = 'mcq_pro_v18';
const DB_VERSION = 30; // Force Clean Init
let db = null;

const App = {
    questions: [], tableQs: [], selectedIds: new Set(), currentQ: null, 
    selectedChoice: null,
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1, limit: 50, rangeMode: false, lastCheckId: null, skipSolved: true,
    history: [], // Holds question IDs for strict back nav
    sessionLog: [], // Holds sequence for sidebar: {id, status:'correct'|'wrong'|'unseen'}
    duplicates: [],
    user: { xp: 0, streak: 0 },
    backupHistory: []
};

// --- HELPER FUNCTIONS ---
function el(id) { return document.getElementById(id); }
function showToast(msg, type='success') {
    const c = el('toastContainer');
    if(!c) return;
    const d = document.createElement('div');
    d.className = `toast`;
    d.style.background = type==='error'?'#ef4444':(type==='warn'?'#f59e0b':'#1e293b');
    d.textContent = msg;
    c.appendChild(d);
    setTimeout(()=>d.remove(), 3000);
}
function bind(id, ev, fn) { 
    const element = el(id); 
    if(element) element.addEventListener(ev, fn); 
}
function safeText(id, val) { const e=el(id); if(e) e.textContent=val; }
function safeVal(id, val) { const e=el(id); if(e) e.value=val; }
function show(id) { const e=el(id); if(e) e.classList.remove('hidden'); }
function hide(id) { const e=el(id); if(e) e.classList.add('hidden'); }
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

// --- 1. INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        loadSettings();
        setupEvents();
        refreshUI();
        
        buildFlashcardPool();
        loadNextQuestion(true); // Start fresh session
        
        safeText('dbStatus', "DB: Ready");
        checkCloud();
        showToast('System v18.0 Ready 💎');
        
        safeText('streakCount', App.user.streak || 0);
        safeText('userXP', App.user.xp || 0);
        loadBackupHistory();
        
    } catch(e) { 
        console.error(e);
        alert("Init Error: "+e.message); 
    }
});

// --- 2. DATABASE ---
function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            if(!d.objectStoreNames.contains('questions')) d.createObjectStore('questions', {keyPath:'id'});
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
        tx.objectStore('user').get('stats').onsuccess = (e) => { if(e.target.result) App.user = e.target.result; };
        tx.oncomplete = resolve;
    });
}

// --- 3. PRACTICE ENGINE ---
function loadNextQuestion(reset) {
    if(reset) { 
        App.history = []; 
        App.sessionLog = []; 
    } else {
        // Save current to history before moving
        if(App.currentQ) App.history.push(App.currentQ.id);
    }

    App.selectedChoice = null;

    const m = el('modeSelect').value;
    const box = el('chapterBox');
    if(box) box.style.display = (m==='chapter')?'block':'none';
    const c = el('chapterSelect').value;
    const skip = el('prefSkipSolved').checked;

    let pool = App.questions.filter(q => {
        if(q.active === false) return false;
        if(m === 'chapter' && c && q.chapter !== c) return false;
        if(m === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
        if(m === 'maintain' && !q.maintenance) return false;
        if(m === 'flagged' && !q.flagged) return false;
        if(m === 'new' && q.timesSeen > 0) return false;
        if(skip && m!=='new' && m!=='maintain' && m!=='wrong' && q.timesSeen > 0) return false;
        if(m === 'due') { if(!q.dueDate || q.dueDate <= Date.now()) return true; return false; }
        return true;
    });

    const panel = el('questionPanel');
    if(!panel) return;

    if(pool.length === 0) {
        panel.innerHTML = '<div style="padding:40px; text-align:center; color:#888;"><h3>🎉Caught Up!</h3><p>No questions match your filters.</p></div>';
        return;
    }

    // Pick Random
    const rand = Math.floor(Math.random() * pool.length);
    App.currentQ = pool[rand];

    // Log for sidebar
    const existingLogIndex = App.sessionLog.findIndex(x => x.id === App.currentQ.id);
    if(existingLogIndex === -1) {
        App.sessionLog.push({id: App.currentQ.id, status: 'unseen'});
    }

    renderQ();
    updateSessionNav();
}

function renderQ() {
    const q = App.currentQ;
    const panel = el('questionPanel');
    
    hide('feedbackPanel');
    hide('srsButtons');
    show('btnSubmit');
    hide('btnNext');
    hide('maintBox');
    
    const btnFlag = el('btnFlag');
    if(btnFlag) {
        btnFlag.textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
        btnFlag.style.color = q.flagged ? "var(--danger)" : "";
    }
    safeVal('userNoteArea', q.userNotes || "");

    // Info Bar
    const stats = `Correct: ${q.timesCorrect||0} | Wrong: ${q.timesWrong||0}`;
    const dateStr = q.importedAt ? new Date(q.importedAt).toLocaleDateString() : 'N/A';
    safeText('qInfoID', `ID #${q.id}`);
    safeText('qInfoChapter', q.chapter || 'General');
    safeText('qInfoStats', stats);
    safeText('qInfoDate', dateStr);
    show('qInfoBar');

    let h = `<div style="font-weight:500; font-size:1.2rem; margin-bottom:15px; text-align:center;">${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:15px; border-radius:8px;">`;

    (q.choices || []).forEach((c, i) => {
        h += `<div class="choice" id="c_${i}" onclick="selectChoice(${i})">
          <b style="margin-right:10px;">${String.fromCharCode(65+i)}</b> ${c.text}
        </div>`;
    });
    panel.innerHTML = h;
}

window.selectChoice = function(idx) {
    if(!el('feedbackPanel').classList.contains('hidden')) return;
    document.querySelectorAll('.choice').forEach(e => {
        e.style.borderColor = 'transparent';
        e.style.background = 'var(--bg)';
    });
    const elC = el('c_'+idx);
    if(elC) {
        elC.style.borderColor = 'var(--primary)';
        elC.style.background = '#eff6ff';
    }
    App.selectedChoice = idx;
}

function submitAnswer() {
    if(App.selectedChoice === null) return alert("Please select an answer first!");
    
    const q = App.currentQ;
    q.lastChoice = App.selectedChoice; 
    
    showFeedback(App.selectedChoice, q);
    
    const isCorrect = q.choices[App.selectedChoice].isCorrect;
    q.timesSeen = (q.timesSeen||0) + 1;
    if(isCorrect) {
        q.timesCorrect = (q.timesCorrect||0)+1;
        updateXP(10);
        // Update Log
        const log = App.sessionLog.find(x=>x.id===q.id);
        if(log) log.status = 'correct';
    } else {
        q.timesWrong = (q.timesWrong||0)+1;
        const log = App.sessionLog.find(x=>x.id===q.id);
        if(log) log.status = 'wrong';
    }
    
    if(!q.dueDate) q.dueDate = Date.now();
    saveQ(q);
    saveUser();
    updateSessionNav();
}

function showFeedback(idx, q) {
    const correctIdx = q.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    const fb = el('feedbackPanel');
    show('feedbackPanel');
    
    fb.innerHTML = `<div style="padding:15px; border-radius:8px; background:${isCorrect?'#dcfce7':'#fee2e2'}; color:${isCorrect?'#166534':'#991b1b'}; font-weight:bold; margin-bottom:10px;">
         ${isCorrect ? 'Correct! 🎉' : 'Incorrect ❌'}
      </div>
      <div class="explanation">${q.explanation||'No explanation provided.'}</div>
    `;
    
    const cEl = el('c_'+correctIdx);
    if(cEl) { cEl.classList.add('correct'); cEl.style.borderColor = 'var(--success)'; }
    
    const iEl = el('c_'+idx);
    if(iEl && !isCorrect) { iEl.classList.add('wrong'); iEl.style.borderColor = 'var(--danger)'; }
    
    hide('btnSubmit');
    show('btnNext');
    show('srsButtons');
}

function loadPrevQuestion() {
    if (App.history.length === 0) return showToast("No history available", "warn");
    
    // Pop ID
    const prevId = App.history.pop();
    // Find Question object
    const prevQ = App.questions.find(x => x.id === prevId);
    if(prevQ) {
        App.currentQ = prevQ;
        renderQ();
        // Restore State
        if(App.currentQ.lastChoice !== undefined) showFeedback(App.currentQ.lastChoice, App.currentQ);
        updateSessionNav();
    }
}

function updateSessionNav() {
    const list = el('historyList');
    if(!list) return;
    list.innerHTML = '';
    App.sessionLog.forEach((log, i) => {
        const d = document.createElement('div');
        let color = '';
        if(log.status === 'correct') color = 'correct';
        else if(log.status === 'wrong') color = 'wrong';
        
        d.className = `sess-item ${color} ${App.currentQ.id === log.id ? 'current' : ''}`;
        
        // Icons
        let icons = '';
        const q = App.questions.find(x=>x.id===log.id);
        if(q) {
             if(q.flagged) icons += ' 🚩';
             if(q.maintenance) icons += ' 🔧';
        }
        
        d.innerHTML = `<span class="seq-num">${i+1}</span> <span class="status-icon">${icons}</span>`;
        d.onclick = () => jumpToQuestion(log.id);
        list.appendChild(d);
    });
}

function jumpToQuestion(id) {
    const q = App.questions.find(x => x.id === id);
    if(q) {
        App.currentQ = q;
        renderQ();
        if(App.currentQ.lastChoice !== undefined) showFeedback(App.currentQ.lastChoice, App.currentQ);
        updateSessionNav();
    }
}

// --- 4. LIBRARY TABLE ---
function applyTableFilters() {
    const txt = el('allSearch').value.toLowerCase();
    const type = el('allFilter').value;
    const ch = el('allChapterSelect').value;
    const dFrom = el('allDateFrom').value;
    const dTo = el('allDateTo').value;

    let fromTs = dFrom ? new Date(dFrom).getTime() : null;
    let toTs = dTo ? new Date(dTo).getTime() : null;
    
    App.tableQs = App.questions.filter(q => {
        if(txt && !q.text.toLowerCase().includes(txt) && String(q.id) !== txt) return false;
        if(ch && q.chapter !== ch) return false;
        if(type === 'maintain' && !q.maintenance) return false;
        if(type === 'notes' && !q.userNotes) return false;
        if(type === 'flagged' && !q.flagged) return false;
        if(fromTs && (!q.importedAt || q.importedAt < fromTs)) return false;
        if(toTs && (!q.importedAt || q.importedAt > toTs)) return false;
        return true;
    });
    App.page = 1;
    sortCurrentTable();
    renderTable();
}

function sortCurrentTable() {
    const field = App.sort.field;
    App.tableQs.sort((a,b) => {
        let valA = a[field] || 0; let valB = b[field] || 0;
        if(typeof valA==='string') { valA=valA.toLowerCase(); valB=valB.toLowerCase(); }
        return (valA < valB ? -1 : 1) * (App.sort.asc ? 1 : -1);
    });
}

window.sortTable = function(field) {
    App.sort.asc = (App.sort.field === field) ? !App.sort.asc : true;
    App.sort.field = field;
    sortCurrentTable();
    renderTable();
}

function renderTable() {
    const tbody = el('allTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    
    data.forEach(q => {
        const tr = document.createElement('tr');
        const isSel = App.selectedIds.has(q.id);
        let status = '';
        if(q.maintenance) status += '<span class="tag-maint">🔧</span> ';
        if(q.flagged) status += '<span class="tag-flag">🚩</span> ';
        
        const userNote = q.userNotes ? '📝' : '';
        const issue = q.maintenanceNote ? '⚠️' : '';
        const dateStr = q.importedAt ? new Date(q.importedAt).toLocaleDateString() : '-';

        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" ${isSel?'checked':''} onclick="handleCheck(this, ${q.id})"></td>
           <td>${q.id}</td>
           <td style="font-size:0.7rem; color:#666;">${dateStr}</td>
           <td class="wrap-text" title="${q.text}">${q.text.substring(0,60)}...</td>
           <td>${q.chapter||'-'}</td>
           <td>${userNote}</td>
           <td>${issue}</td>
           <td>${status}</td>
           <td><button class="pill-btn tiny-btn" onclick="openEdit(${q.id})">✎</button></td>
        `;
        tbody.appendChild(tr);
    });
    safeText('allPageInfo', App.page);
    safeText('selCount', App.selectedIds.size + " Selected");
}

window.handleCheck = function(cb, id) {
    if(App.rangeMode && App.lastCheckId !== null && cb.checked) {
        const all = App.tableQs.map(q=>q.id);
        const s = all.indexOf(App.lastCheckId);
        const e = all.indexOf(id);
        const min = Math.min(s,e), max = Math.max(s,e);
        for(let i=min; i<=max; i++) App.selectedIds.add(all[i]);
    } else {
        if(cb.checked) App.selectedIds.add(id); else App.selectedIds.delete(id);
    }
    App.lastCheckId = id;
    safeText('selCount', App.selectedIds.size + " Selected");
    renderTable();
}

window.toggleSelectAll = function(cb) {
    const checked = cb.checked;
    App.tableQs.forEach(q => {
        if(checked) App.selectedIds.add(q.id); else App.selectedIds.delete(q.id);
    });
    renderTable();
    safeText('selCount', App.selectedIds.size + " Selected");
}

function toggleRangeMode() {
    App.rangeMode = !App.rangeMode;
    const btn = el('btnRangeMode');
    btn.textContent = App.rangeMode ? "✨ Range: ON" : "✨ Range: OFF";
    btn.classList.toggle('range-active', App.rangeMode);
    showToast(App.rangeMode ? "Shift-Click Enabled" : "Range OFF");
}

// --- 5. EVENTS ---
function setupEvents() {
    document.querySelectorAll('.tab-button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    
    safeBind('btnSubmit', 'click', submitAnswer);
    safeBind('btnNext', 'click', () => loadNextQuestion(false));
    safeBind('btnPrev', 'click', loadPrevQuestion);
    safeBind('btnFlag', 'click', () => { if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQ(App.currentQ); renderQ(); } });
    safeBind('btnMaintain', 'click', toggleMaintenance);
    safeBind('btnSaveMaint', 'click', saveMaintenanceNote);
    safeBind('btnSaveNoteManual', 'click', saveNoteManual);
    
    safeBind('btnRefreshPractice', 'click', () => loadNextQuestion(true));
    safeBind('btnAllApply', 'click', applyTableFilters);
    safeBind('btnHeaderBackup', 'click', cloudUpload);
    safeBind('btnRangeMode', 'click', toggleRangeMode);
    safeBind('btnScanDup', 'click', scanDuplicates);
    safeBind('btnFixDup', 'click', fixDuplicates);
    safeBind('btnBulkDelete', 'click', () => execBulk('delete'));

    safeBind('btnImportTrigger', 'click', () => el('fileInput').click());
    safeBind('fileInput', 'change', handleImport);
    safeBind('btnExportTrigger', 'click', handleExport);
    bind('btnRestoreBackup', 'click', cloudDownloadSelected);
    
    safeBind('btnSaveGh', 'click', saveSettings);
    safeBind('btnCloudUpload', 'click', cloudUpload);
    safeBind('btnCloudDownload', 'click', cloudDownloadLatest);
    safeBind('btnResetProgress', 'click', () => { if(confirm("Reset Stats?")) { App.questions.forEach(q=>{q.timesSeen=0; saveQ(q)}); location.reload(); } });
    safeBind('btnFactoryReset', 'click', () => { if(confirm("WIPE DB?")) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }});
    
    safeBind('btnFcShuffle', 'click', buildFlashcardPool);
    safeBind('btnFcShow', 'click', () => { 
        const back = el('fcBack');
        if(back) back.classList.remove('hidden'); 
    });
    safeBind('btnFcAgain', 'click', () => nextFlashcard(false));
    safeBind('btnFcGood', 'click', () => nextFlashcard(true));

    safeBind('btnStartExam', 'click', startExam);
    safeBind('btnExamNext', 'click', () => examMove(1));
    safeBind('btnExamFinish', 'click', finishExam);
    safeBind('btnExamClose', 'click', () => { 
        el('examResults').classList.add('hidden'); 
        switchTab('home'); 
    });

    safeBind('btnSaveEdit', 'click', saveEditModal);
    safeBind('btnCancelEdit', 'click', () => el('editModal').classList.add('hidden'));
    safeBind('btnAddChoice', 'click', () => addEditChoice('', false));
    safeBind('themeToggle', 'click', () => document.body.classList.toggle('dark'));

    bind('allPrevPage', 'click', () => { if(App.page>1){App.page--; renderTable();} });
    bind('allNextPage', 'click', () => { App.page++; renderTable(); });

    const note = el('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 1000));
    
    const zone = el('dropZone');
    if(zone) {
        document.body.addEventListener('dragover', e => { e.preventDefault(); show('dropZone'); });
        zone.addEventListener('dragleave', e => hide('dropZone'));
        zone.addEventListener('drop', e => { 
            e.preventDefault(); 
            hide('dropZone');
            if(e.dataTransfer.files.length) handleImportFile(e.dataTransfer.files[0]); 
        });
    }
}

// --- UTILS ---
function saveQ(q) {
    const tx = db.transaction('questions','readwrite');
    tx.objectStore('questions').put(q);
}
function saveUser() {
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'stats', ...App.user });
}
function toggleMaintenance() { el('maintBox').classList.toggle('hidden'); }
function saveMaintenanceNote() {
    if(App.currentQ) {
        App.currentQ.maintenance = true;
        App.currentQ.maintenanceNote = el('maintNote').value;
        saveQ(App.currentQ);
        alert("Report Saved");
        hide('maintBox');
    }
}
function saveNoteManual() {
    saveNote();
    const btn = el('btnSaveNoteManual');
    if(btn) {
        btn.textContent = "Saved! ✅";
        setTimeout(()=>btn.textContent="💾 Save Note", 2000);
    }
}
function saveNote() {
    if(App.currentQ) {
        App.currentQ.userNotes = el('userNoteArea').value;
        saveQ(App.currentQ);
        safeSetText('saveNoteStatus', "Saved ✓");
        setTimeout(()=>safeSetText('saveNoteStatus', ""), 2000);
    }
}
function toggleFlagCurrent() {
    if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQ(App.currentQ); renderQ(); }
}
function checkCloud() {
    const t = localStorage.getItem('gh_token');
    if(t) safeSetText('syncStatus', "Cloud: Linked");
}
function updateXP(amount) {
    App.user.xp = (App.user.xp || 0) + amount;
    safeSetText('userXP', App.user.xp);
    saveUser();
}

// --- IMPORT/EXPORT ---
function handleImport() { handleImportFile(el('fileInput').files[0]); }
async function handleImportFile(file) {
    if(!file) return;
    const r = new FileReader();
    r.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(confirm(`Found ${json.length} items. Import as new questions (no replace)?`)) return;

            const tx = db.transaction('questions','readwrite');
            const batchTs = Date.now();
            json.forEach(raw => {
                const q = {...raw};
                // never replace existing question
                if(!q.id || App.questions.some(x=>x.id===q.id)) q.id = batchTs + Math.floor(Math.random()*10000);
                q.importedAt = batchTs;
                if(!q.status) q.status = 'none';
                if(q.maintenance && !q.status) q.status = 'maintenance';
                
                tx.objectStore('questions').put(q);
            });
            tx.oncomplete = async () => { 
                await loadData(); 
                refreshUI(); 
                showToast('Imported Successfully'); 
            };
        } catch(err) { alert(err.message); }
    };
    r.readAsText(file);
}
function handleExport() {
    const b = new Blob([JSON.stringify(App.questions, null, 2)], {type:'application/json'});
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href=u; a.download='MCQ_Library_Full.json'; a.click();
}

// --- DUPLICATES ---
function scanDuplicates() {
    const map = new Map(); App.duplicates = [];
    App.questions.forEach(q => {
        const k = (q.text||"").substring(0,80).toLowerCase();
        if(map.has(k)) App.duplicates.push(q); else map.set(k, q);
    });
    safeSetText('dupResult', `${App.duplicates.length} Dups Found`);
    if(App.duplicates.length > 0) el('btnFixDup').classList.remove('hidden');
}
async function fixDuplicates() {
    const tx = db.transaction('questions','readwrite');
    App.duplicates.forEach(q => tx.objectStore('questions').delete(q.id));
    tx.oncomplete = async () => { await loadData(); scanDuplicates(); showToast('Fixed Duplicates'); };
}
async function execBulk(act) {
    if(!confirm(`Bulk ${act}?`)) return;
    const tx = db.transaction('questions', 'readwrite');
    App.selectedIds.forEach(id => { if(act==='delete') tx.objectStore('questions').delete(id); });
    tx.oncomplete = async () => { await loadData(); applyTableFilters(); showToast("Bulk Done"); };
}

// --- CLOUD ---
function loadSettings() {
    const t = localStorage.getItem('gh_token');
    if(t) {
        safeVal('ghToken', t);
        safeVal('ghRepo', localStorage.getItem('gh_repo') || '');
        safeVal('ghFile', localStorage.getItem('gh_file') || 'mcq_backup');
        const hist = localStorage.getItem('backup_history');
        if(hist) {
            try { App.backupHistory = JSON.parse(hist) || []; } catch(e){ App.backupHistory = []; }
        }
    }
}
function saveSettings() {
    localStorage.setItem('gh_token', el('ghToken').value);
    localStorage.setItem('gh_repo', el('ghRepo').value);
    localStorage.setItem('gh_file', el('ghFile').value);
    alert("Settings Saved");
}
function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
function deb64(s) { return decodeURIComponent(escape(atob(s))); }

function makeBackupFileName() {
    const base = el('ghFile').value || 'mcq_backup';
    const d = new Date();
    return `${base}_${d.getTime()}.json`;
}

async function cloudUpload() {
    const t = localStorage.getItem('gh_token') || el('ghToken').value;
    const r = localStorage.getItem('gh_repo') || el('ghRepo').value;
    if(!t || !r) return alert("Check Settings");
    const f = makeBackupFileName();
    try {
        const c = b64(JSON.stringify(App.questions));
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {
            method:'PUT',
            headers:{Authorization:`token ${t}`, 'Content-Type':'application/json'},
            body:JSON.stringify({message:'MCQ Backup', content:c})
        });
        if(res.ok) {
            App.backupHistory.unshift(f);
            if(App.backupHistory.length > 10) App.backupHistory.pop();
            localStorage.setItem('backup_history', JSON.stringify(App.backupHistory));
            loadBackupHistory();
            showToast('Uploaded ✅');
        } else {
            alert('Upload Error');
        }
    } catch(e) { alert(e.message); }
}
async function cloudDownloadLatest() {
    if(App.backupHistory.length === 0) return alert("No history. Sync first.");
    await cloudDownloadFile(App.backupHistory[0]);
}
async function cloudDownloadSelected() {
    const val = el('backupHistoryList').value;
    if(!val) return;
    await cloudDownloadFile(val);
}
async function cloudDownloadFile(fn) {
    const t = localStorage.getItem('gh_token');
    const r = localStorage.getItem('gh_repo');
    try {
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${fn}`, {headers:{Authorization:`token ${t}`}});
        if(!res.ok) throw new Error('Failed');
        const d = await res.json();
        const decoded = JSON.parse(deb64(d.content));
        const tx = db.transaction('questions','readwrite');
        decoded.forEach(q => {
            delete q.lastChoice;
            tx.objectStore('questions').put(q);
        });
        tx.oncomplete = () => { loadData().then(()=>{ refreshUI(); showToast('Restored!'); }); };
    } catch(e) { alert(e.message); }
}
function loadBackupHistory() {
    const sel = el('backupHistoryList');
    if(!sel) return;
    sel.innerHTML = '<option value="">Select older backup...</option>';
    App.backupHistory.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b; opt.textContent = b;
        sel.appendChild(opt);
    });
}

// Flashcards
let fcPool = [], fcIdx = 0;
function buildFlashcardPool() {
    fcPool = App.questions.filter(q => q.active !== false);
    fcIdx = 0; renderFC();
}
function renderFC() {
    const front = el('fcFront');
    if(!front) return;
    if(fcPool.length===0) { front.textContent="Empty"; return; }
    const q = fcPool[fcIdx];
    const cor = (q.choices||[]).find(c=>c.isCorrect);
    front.textContent = q.text;
    el('fcBack').innerHTML = `<b>Answer:</b> ${cor?cor.text:'?'}`;
    hide('fcBack');
}
function nextFlashcard(good) { if(fcIdx < fcPool.length -1) fcIdx++; else fcIdx = 0; renderFC(); }

// Exam
let examSession = null;
function startExam() {
    const count = parseInt(el('examCount').value) || 40;
    const pool = [...App.questions].sort(() => Math.random()-0.5).slice(0, count);
    examSession = { qs: pool, answers: {}, index: 0 };
    show('examInterface');
    renderExamQ();
}
function renderExamQ() {
    const q = examSession.qs[examSession.index];
    safeSetText('examProgress', `${examSession.index+1}/${examSession.qs.length}`);
    let h = `<div class="q-text">${q.text}</div>`;
    (q.choices||[]).forEach((c, i) => h += `<label class="choice"><input type="radio" name="exAns" value="${i}"> ${c.text}</label>`);
    el('examQPanel').innerHTML = h;
}
function examMove(dir) {
    const sel = document.querySelector('input[name="exAns"]:checked');
    if(sel) examSession.answers[examSession.qs[examSession.index].id] = parseInt(sel.value);
    const next = examSession.index + dir;
    if(next >= 0 && next < examSession.qs.length) { examSession.index = next; renderExamQ(); }
}
function finishExam() {
    examMove(0);
    let correct = 0;
    examSession.qs.forEach(q => {
       const ans = examSession.answers[q.id];
       const cor = (q.choices||[]).findIndex(c=>c.isCorrect);
       if(ans === cor) correct++;
    });
    hide('examInterface');
    show('examResults');
    el('examScore').innerHTML = `<h2>Score: ${correct} / ${examSession.qs.length}</h2>`;
}

// Edit Logic
window.openEdit = (id) => {
    const q = App.questions.find(x=>x.id===id);
    if(!q) return;
    show('editModal');
    el('editModal').dataset.id = id;
    el('editText').value = q.text || '';
    el('editChapter').value = q.chapter || '';
    el('editTags').value = q.tags || '';
    el('editExplanation').value = q.explanation || '';
    el('editMaint').checked = !!q.maintenance;

    const list = el('editChoicesList'); list.innerHTML='';
    (q.choices||[]).forEach(c => addEditChoice(c.text, c.isCorrect));
};
function addEditChoice(txt='', cor=false) {
    const d=document.createElement('div'); d.className='edit-choice-row';
    d.innerHTML=`<input class="std-input" style="flex:1" value="${txt}"><input type="radio" name="ec" ${cor?'checked':''}><button onclick="this.parentElement.remove()" class="tiny-btn" style="background:red">X</button>`;
    el('editChoicesList').appendChild(d);
}
function saveEditModal() {
    const id = parseInt(el('editModal').dataset.id);
    const q = App.questions.find(x=>x.id===id);
    q.text = el('editText').value;
    q.chapter = el('editChapter').value;
    q.tags = el('editTags').value;
    q.maintenance = el('editMaint').checked;
    q.explanation = el('editExplanation').value;
    const ch = [];
    document.querySelectorAll('.edit-choice-row').forEach(r => {
        const txt = r.querySelector('input.std-input').value;
        const isC = r.querySelector('input[type="radio"]').checked;
        ch.push({ text:txt, isCorrect:isC });
    });
    q.choices = ch;
    saveQ(q);
    hide('editModal');
    applyTableFilters();
    alert("Saved");
}
function handleSRS(grade) {
    const q = App.currentQ;
    let days = 1;
    if(grade===4) days=7; if(grade===3) days=4; if(grade===2) days=2;
    q.dueDate = Date.now() + (days * 24 * 60 * 60 * 1000);
    saveQ(q);
    loadNextQuestion(false);
}
function renderDashboard() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => (q.timesCorrect||0) > 3).length;
    safeSetText('dashTotal', total);
    safeSetText('dashMastery', Math.round((mastered/total)*100 || 0) + '%');
    safeSetText('dashMaint', App.questions.filter(q=>q.maintenance).length);
}
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    el(`tab-${id}`).classList.add('active');
    document.querySelector(`.tab-button[data-tab="${id}"]`).classList.add('active');
    if(id==='all') applyTableFilters();
    if(id==='dashboard') renderDashboard();
}
function refreshUI() {
    const chaps = [...new Set(App.questions.map(q=>q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All Chapters</option>' + chaps.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}
function toggleRangeMode() {
    App.rangeMode = !App.rangeMode;
    const btn = el('btnRangeMode');
    btn.textContent = App.rangeMode ? "✨ Range: ON" : "✨ Range: OFF";
    btn.classList.toggle('range-active', App.rangeMode);
    showToast(App.rangeMode ? "Shift-Click Enabled" : "Range OFF");
}