/**
 * MCQ Ultra-Pro v16.1 (Final Integrity + Error/Maintenance + Resets + Backups)
 */

const DB_NAME = 'mcq_pro_v15';
const DB_VERSION = 25; 
let db = null;

const App = {
    questions: [],
    tableQs: [],
    selectedIds: new Set(),
    currentQ: null,
    selectedChoice: null,
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1,
    limit: 50,
    rangeMode: false,
    lastCheckId: null,
    skipSolved: true,
    history: [],
    duplicates: [],
    user: { xp: 0, streak: 0 },
    sessionIds: new Set()
};

let resetTimer = null;
let resetCountdownInterval = null;
let lastResetPlan = null;

// --- HELPER FUNCTIONS ---
function showToast(msg, type='success') {
    const c = document.getElementById('toastContainer');
    if(!c) return;
    const d = document.createElement('div');
    d.className = `toast`;
    d.style.background = type==='error'?'#ef4444':(type==='warn'?'#f59e0b':'#1e293b');
    d.textContent = msg;
    c.appendChild(d);
    setTimeout(()=>d.remove(), 3000);
}
function bind(id, ev, fn) { 
    const el = document.getElementById(id); 
    if(el) el.addEventListener(ev, fn); 
}
function safeSetText(id, val) {
    const el = document.getElementById(id);
    if(el) el.textContent = val;
}
function safeSetVal(id, val) {
    const el = document.getElementById(id);
    if(el) el.value = val;
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

function normalizeQuestions() {
    const now = Date.now();
    (App.questions || []).forEach(q => {
        if(!q.createdAt) q.createdAt = now;
        if(!q.importedAt) q.importedAt = q.createdAt;
        if(q.timesSeen == null) q.timesSeen = 0;
        if(q.timesCorrect == null) q.timesCorrect = 0;
        if(q.timesWrong == null) q.timesWrong = 0;
        if(q.error && q.maintenance) q.maintenance = false; // enforce mutual exclusivity
        if(q.flagged == null) q.flagged = false;
    });
}

// --- 1. INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        normalizeQuestions();
        loadSettings();
        setupEvents();
        refreshUI();
        renderBackupList();
        
        buildFlashcardPool();
        loadNextQuestion(true);
        
        safeSetText('dbStatus', "DB: Ready");
        checkCloud();
        showToast('System v16.1 Ready 💎');
        
        // Update Streak / XP
        safeSetText('streakCount', App.user.streak || 0);
        safeSetText('userXP', App.user.xp || 0);
        
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
    if(reset) App.history = [];
    if(App.currentQ && !reset) App.history.push(App.currentQ);

    App.selectedChoice = null;

    const m = document.getElementById('modeSelect').value;
    const box = document.getElementById('chapterBox');
    if(box) box.style.display = (m==='chapter')?'block':'none';
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;

    let pool = App.questions.filter(q => {
        if(q.active === false) return false;
        if(m === 'chapter' && c && q.chapter !== c) return false;
        if(m === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
        if(m === 'maintain' && !q.maintenance) return false;
        if(m === 'flagged' && !q.flagged) return false;
        if(m === 'new' && q.timesSeen > 0) return false;
        if(skip && m!=='new' && m!=='maintain' && m!=='wrong' && q.timesSeen > 0) return false;
        return true;
    });

    const panel = document.getElementById('questionPanel');
    if(!panel) return;

    if(pool.length === 0) {
        panel.innerHTML = '<div style="padding:20px; text-align:center; color:#888;">No questions found.<br>Try "Refresh" or change filters.</div>';
        return;
    }

    const rand = Math.floor(Math.random() * pool.length);
    App.currentQ = pool[rand];
    renderQ();
}

function renderQ() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    if(!panel || !q) return;
    
    document.getElementById('feedbackPanel').classList.add('hidden');
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');
    document.getElementById('btnNext').classList.add('hidden');
    document.getElementById('maintBox').classList.add('hidden');
    
    const btnFlag = document.getElementById('btnFlag');
    if(btnFlag) {
        btnFlag.textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
        btnFlag.style.color = q.flagged ? "red" : "";
    }
    safeSetVal('userNoteArea', q.userNotes || "");

    let h = `<div style="font-weight:500; font-size:1.1rem; margin-bottom:15px;">[#${q.id}] ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:10px; border-radius:8px;">`;

    (q.choices || []).forEach((c, i) => {
        h += `<div class="choice" id="c_${i}" onclick="selectChoice(${i})">
          <b>${String.fromCharCode(65+i)}.</b> ${c.text}
        </div>`;
    });
    panel.innerHTML = h;
}

function selectChoice(idx) {
    if(!document.getElementById('feedbackPanel').classList.contains('hidden')) return;
    document.querySelectorAll('.choice').forEach(e => {
        e.style.borderColor = 'transparent';
        e.style.background = 'var(--bg)';
    });
    const el = document.getElementById('c_'+idx);
    if(el) {
        el.style.borderColor = 'var(--primary)';
        el.style.background = '#eff6ff';
    }
    App.selectedChoice = idx;
}

function submitAnswer() {
    if(App.selectedChoice === null || App.selectedChoice === undefined) return alert("Select an answer");
    const q = App.currentQ;
    if(!q) return;
    q.lastChoice = App.selectedChoice; 
    
    showFeedback(App.selectedChoice, q);
    
    const isCorrect = q.choices[App.selectedChoice].isCorrect;
    q.timesSeen = (q.timesSeen||0) + 1;
    if(isCorrect) {
        q.timesCorrect = (q.timesCorrect||0)+1;
        updateXP(10);
    } else {
        q.timesWrong = (q.timesWrong||0)+1;
    }
    q.lastSeenAt = Date.now();
    if(!q.dueDate) q.dueDate = Date.now();
    App.sessionIds.add(q.id);
    saveQ(q);
}

function showFeedback(idx, q) {
    const correctIdx = q.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `<strong style="color:${isCorrect?'#10b981':'#ef4444'}">${isCorrect?'Correct!':'Wrong'}</strong><br>${q.explanation||''}`;
    
    const cEl = document.getElementById('c_'+correctIdx);
    if(cEl) cEl.classList.add('correct');
    
    const iEl = document.getElementById('c_'+idx);
    if(iEl && !isCorrect) iEl.classList.add('wrong');
    
    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
}

function updateXP(amount) {
    App.user.xp = (App.user.xp || 0) + amount;
    safeSetText('userXP', App.user.xp);
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'stats', ...App.user });
}

// --- 4. LIBRARY TABLE ---
function applyTableFilters() {
    const txt = document.getElementById('allSearch').value.toLowerCase();
    const type = document.getElementById('allFilter').value;
    const ch = document.getElementById('allChapterSelect').value;
    
    App.tableQs = App.questions.filter(q => {
        if(txt && !q.text.toLowerCase().includes(txt) && String(q.id) !== txt) return false;
        if(ch && q.chapter !== ch) return false;
        if(type === 'maintain' && !q.maintenance) return false;
        if(type === 'error' && !q.error) return false;
        if(type === 'notes' && !q.userNotes) return false;
        if(type === 'flagged' && !q.flagged) return false;
        return true;
    });
    App.page = 1;
    renderTable();
}

function sortTable(field) {
    App.sort.asc = (App.sort.field === field) ? !App.sort.asc : true;
    App.sort.field = field;
    App.tableQs.sort((a,b) => {
        let valA = a[field] || 0; let valB = b[field] || 0;
        if(typeof valA==='string') { valA=valA.toLowerCase(); valB=valB.toLowerCase(); }
        return (valA < valB ? -1 : 1) * (App.sort.asc ? 1 : -1);
    });
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('allTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    
    data.forEach(q => {
        const tr = document.createElement('tr');
        const isSel = App.selectedIds.has(q.id);

        let statusParts = [];
        if(q.error) statusParts.push('<span class="tag-maint">❌ ERROR</span>');
        else if(q.maintenance) statusParts.push('<span class="tag-maint">🔧 MAINT</span>');
        if(q.flagged) statusParts.push('🚩');
        const status = statusParts.join(' ');

        const userNote = q.userNotes ? (q.userNotes.length > 30 ? q.userNotes.substring(0, 30) + '...' : q.userNotes) : '-';
        const issueFull = q.error ? (q.errorNote || '') : (q.maintenanceNote || '');
        const issuePreview = issueFull ? (issueFull.length > 30 ? issueFull.substring(0,30)+'...' : issueFull) : '-';

        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" ${isSel?'checked':''} onclick="handleCheck(this, ${q.id})"></td>
           <td>${q.id}</td>
           <td class="wrap-text" title="${q.text}">${q.text.substring(0,60)}...</td>
           <td>${q.chapter||'-'}</td>
           <td title="${q.userNotes || ''}">${userNote}</td>
           <td title="${issueFull}">${issuePreview}</td>
           <td>${status}</td>
           <td><button class="pill-btn tiny-btn" onclick="openEdit(${q.id})">✎</button></td>
        `;
        tbody.appendChild(tr);
    });
    safeSetText('allPageInfo', App.page);
    safeSetText('selCount', App.selectedIds.size + " Selected");
}

function handleCheck(cb, id) {
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
    safeSetText('selCount', App.selectedIds.size + " Selected");
    renderTable();
}

function toggleSelectAll(cb) {
    const checked = cb.checked;
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    data.forEach(q => {
        if(checked) App.selectedIds.add(q.id); else App.selectedIds.delete(q.id);
    });
    renderTable();
    safeSetText('selCount', App.selectedIds.size + " Selected");
}

function toggleRangeMode() {
    App.rangeMode = !App.rangeMode;
    const btn = document.getElementById('btnRangeMode');
    if(btn) {
        btn.textContent = App.rangeMode ? "✨ Range: ON" : "✨ Range: OFF";
        btn.classList.toggle('range-active', App.rangeMode);
    }
    showToast(App.rangeMode ? "Shift-select ON" : "Range OFF");
}

// --- 5. EVENTS ---
function setupEvents() {
    bind('btnSubmit', 'click', submitAnswer);
    bind('btnNext', 'click', () => loadNextQuestion(false));
    bind('btnPrev', 'click', () => loadNextQuestion(false));
    bind('btnFlag', 'click', () => { if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQ(App.currentQ); renderQ(); } });
    bind('btnMaintain', 'click', toggleMaintenance);
    bind('btnSaveMaint', 'click', saveMaintenanceNote);
    bind('btnSaveNoteManual', 'click', saveNoteManual);
    
    bind('btnRefreshPractice', 'click', () => loadNextQuestion(true));
    bind('btnAllApply', 'click', applyTableFilters);
    bind('btnHeaderBackup', 'click', cloudUpload);
    bind('btnRangeMode', 'click', toggleRangeMode);
    bind('btnScanDup', 'click', scanDuplicates);
    bind('btnFixDup', 'click', fixDuplicates);
    bind('btnBulkDelete', 'click', () => execBulk('delete'));

    bind('btnImportTrigger', 'click', () => document.getElementById('fileInput').click());
    bind('fileInput', 'change', handleImport);
    bind('btnExportTrigger', 'click', handleExport);

    bind('btnApplyReset', 'click', handleResetClick);
    
    bind('btnSaveGh', 'click', saveSettings);
    bind('btnCloudUpload', 'click', cloudUpload);
    bind('btnCloudDownload', 'click', cloudDownload);
    bind('btnResetProgress', 'click', () => { if(confirm("Reset ALL stats?")) { App.questions.forEach(q=>{q.timesSeen=0; q.timesCorrect=0; q.timesWrong=0; q.dueDate=null; saveQ(q)}); location.reload(); } });
    bind('btnFactoryReset', 'click', () => { if(confirm("WIPE DB?")) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }});
    bind('btnForceReload', 'click', () => location.reload());

    bind('btnCreateLocalBackup', 'click', () => createLocalBackup('manual'));
    
    bind('btnFcShuffle', 'click', buildFlashcardPool);
    bind('btnFcShow', 'click', () => { 
        const back = document.getElementById('fcBack');
        if(back) back.classList.remove('hidden');
    });
    bind('btnFcAgain', 'click', () => nextFlashcard(false));
    bind('btnFcGood', 'click', () => nextFlashcard(true));

    bind('btnStartExam', 'click', startExam);
    bind('btnExamNext', 'click', () => examMove(1));
    bind('btnExamFinish', 'click', finishExam);
    bind('btnExamClose', 'click', () => { 
        document.getElementById('examResults').classList.add('hidden'); 
        switchTab('home'); 
    });

    bind('btnSaveEdit', 'click', saveEditModal);
    bind('btnCancelEdit', 'click', () => document.getElementById('editModal').classList.add('hidden'));
    bind('btnAddChoice', 'click', () => addEditChoice());
    bind('themeToggle', 'click', () => document.body.classList.toggle('dark'));

    bind('btnRefreshStats', 'click', renderDashboard);

    const selAll = document.getElementById('allSelectAll');
    if(selAll) selAll.addEventListener('click', (e)=>toggleSelectAll(e.target));

    document.querySelectorAll('.tab-button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    document.querySelectorAll('.sortable').forEach(th => { th.addEventListener('click', () => sortTable(th.dataset.key)); });
    
    bind('allPrevPage', 'click', () => { if(App.page>1){App.page--; renderTable();} });
    bind('allNextPage', 'click', () => { App.page++; renderTable(); });

    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 1000));
}

// --- UTILS ---
function saveQ(q) {
    const tx = db.transaction('questions','readwrite');
    tx.objectStore('questions').put(q);
}

function toggleMaintenance() {
    const box = document.getElementById('maintBox');
    if(!box || !App.currentQ) return;
    if(box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        const type = App.currentQ.error ? 'error' : (App.currentQ.maintenance ? 'maint' : 'maint');
        const radios = document.querySelectorAll('input[name="maintType"]');
        radios.forEach(r => { r.checked = (r.value === type); });
        document.getElementById('maintNote').value = App.currentQ.error ? (App.currentQ.errorNote||'') : (App.currentQ.maintenanceNote || '');
    } else {
        box.classList.add('hidden');
    }
}

function saveMaintenanceNote() {
    if(!App.currentQ) return;
    const note = document.getElementById('maintNote').value.trim();
    const typeEl = document.querySelector('input[name="maintType"]:checked');
    if(!typeEl) { alert('Select Error or Maintenance'); return; }
    const t = typeEl.value;
    if(t === 'error') {
        App.currentQ.error = true;
        App.currentQ.errorNote = note;
        App.currentQ.maintenance = false;
    } else {
        App.currentQ.maintenance = true;
        App.currentQ.maintenanceNote = note;
        App.currentQ.error = false;
    }
    saveQ(App.currentQ);
    showToast('Issue saved');
    document.getElementById('maintBox').classList.add('hidden');
    renderQ();
    if(document.getElementById('tab-all').classList.contains('active')) applyTableFilters();
}

function saveNoteManual() {
    saveNote();
    const btn = document.getElementById('btnSaveNoteManual');
    if(btn) {
        btn.textContent = "Saved! ✅";
        setTimeout(()=>btn.textContent="💾 Save Note", 2000);
    }
}
function saveNote() {
    if(App.currentQ) {
        App.currentQ.userNotes = document.getElementById('userNoteArea').value;
        saveQ(App.currentQ);
        safeSetText('saveNoteStatus', "Saved ✓");
        setTimeout(()=>safeSetText('saveNoteStatus', ""), 2000);
    }
}
function checkCloud() {
    const t = localStorage.getItem('gh_token');
    if(t) safeSetText('syncStatus', "Cloud: Linked");
}

// --- IMPORT/EXPORT ---
function generateNewId(existingIds) {
    let max = 0;
    existingIds.forEach(id => {
        if(typeof id === 'number' && id > max) max = id;
    });
    let next = max > 0 ? max + 1 : Date.now();
    while(existingIds.has(next)) next++;
    existingIds.add(next);
    return next;
}

async function handleImport() {
    const f = document.getElementById('fileInput').files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(!Array.isArray(json)) throw new Error('JSON must be an array of questions');
            if(!confirm(`Found ${json.length} items. Import (merge, never replace)?`)) return;

            const existingIds = new Set(App.questions.map(q => q.id));
            const now = Date.now();
            const tx = db.transaction('questions','readwrite');

            json.forEach(raw => {
                const q = { ...raw };
                let candidateId = parseInt(String(q.id || '').replace(/\D/g,''),10);
                if(!candidateId || existingIds.has(candidateId)) {
                    candidateId = generateNewId(existingIds);
                } else {
                    existingIds.add(candidateId);
                }
                q.id = candidateId;

                if(!q.createdAt) q.createdAt = now;
                if(!q.importedAt) q.importedAt = now;
                if(q.timesSeen == null) q.timesSeen = 0;
                if(q.timesCorrect == null) q.timesCorrect = 0;
                if(q.timesWrong == null) q.timesWrong = 0;

                tx.objectStore('questions').put(q);
            });

            tx.oncomplete = async () => { 
                await loadData(); 
                normalizeQuestions();
                refreshUI(); 
                showToast('Imported Successfully (merged, no replacement)'); 
            };
        } catch(err) { alert(err.message); }
    };
    r.readAsText(f);
}
function handleExport() {
    const enriched = App.questions.map(q => {
        const copy = { ...q };
        const seen = copy.timesSeen || 0;
        const correct = copy.timesCorrect || 0;
        copy.successRate = seen ? Math.round((correct/seen)*100) : null;
        return copy;
    });
    const b = new Blob([JSON.stringify(enriched, null, 2)], {type:'application/json'});
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href=u; a.download='MCQ_Backup.json'; a.click();
    URL.revokeObjectURL(u);
}

// --- DUPLICATES ---
function scanDuplicates() {
    const map = new Map(); App.duplicates = [];
    App.questions.forEach(q => {
        const k = (q.text||"").substring(0,40).toLowerCase();
        if(map.has(k)) App.duplicates.push(q); else map.set(k, q);
    });
    safeSetText('dupResult', `${App.duplicates.length} Dups Found`);
    if(App.duplicates.length > 0) {
        const btnFix = document.getElementById('btnFixDup');
        if(btnFix) btnFix.classList.remove('hidden');
    }
}
async function fixDuplicates() {
    const tx = db.transaction('questions','readwrite');
    App.duplicates.forEach(q => tx.objectStore('questions').delete(q.id));
    tx.oncomplete = async () => { await loadData(); normalizeQuestions(); scanDuplicates(); showToast('Fixed Duplicates'); };
}
async function execBulk(act) {
    if(!confirm(`Bulk ${act}?`)) return;
    const tx = db.transaction('questions', 'readwrite');
    App.selectedIds.forEach(id => { if(act==='delete') tx.objectStore('questions').delete(id); });
    tx.oncomplete = async () => { await loadData(); normalizeQuestions(); applyTableFilters(); showToast("Bulk Done"); };
}

// --- CLOUD (GitHub) ---
function loadSettings() {
    const t = localStorage.getItem('gh_token');
    if(t) {
        safeSetVal('ghToken', t);
        safeSetVal('ghRepo', localStorage.getItem('gh_repo'));
        safeSetVal('ghFile', localStorage.getItem('gh_file') || 'mcq_backup.json');
    }
}
function saveSettings() {
    localStorage.setItem('gh_token', document.getElementById('ghToken').value);
    localStorage.setItem('gh_repo', document.getElementById('ghRepo').value);
    localStorage.setItem('gh_file', document.getElementById('ghFile').value);
    alert("Settings Saved");
}
function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
function deb64(s) { return decodeURIComponent(escape(atob(s))); }
async function cloudUpload() {
    const t = localStorage.getItem('gh_token'), r = localStorage.getItem('gh_repo'), f = localStorage.getItem('gh_file');
    if(!t || !r || !f) return alert("Check Settings");
    try {
        const c = b64(JSON.stringify(App.questions || []));
        let sha = null;
        try { 
            const g = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {headers:{Authorization:`token ${t}`}}); 
            if(g.ok) sha = (await g.json()).sha; 
        } catch(e){}
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, { 
            method:'PUT', 
            headers:{Authorization:`token ${t}`, 'Content-Type':'application/json'}, 
            body:JSON.stringify({message:'Backup', content:c, sha}) 
        });
        if(res.ok) showToast('Uploaded ✅'); else alert('GitHub Error');
    } catch(e) { alert(e.message); }
}
async function cloudDownload() {
    const t = localStorage.getItem('gh_token'), r = localStorage.getItem('gh_repo'), f = localStorage.getItem('gh_file');
    if(!t || !r || !f) return alert("Check Settings");
    try {
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {headers:{Authorization:`token ${t}`}});
        if(!res.ok) throw new Error('Failed');
        const apiObj = await res.json();
        const d = JSON.parse(deb64(apiObj.content));
        const tx = db.transaction('questions','readwrite');
        (d || []).forEach(q => tx.objectStore('questions').put(q));
        tx.oncomplete = async () => { 
            await loadData(); 
            normalizeQuestions();
            refreshUI(); 
            showToast('Downloaded'); 
        };
    } catch(e) { alert(e.message); }
}

// --- LOCAL BACKUPS (LAST 10) ---
function loadLocalBackups() {
    try {
        const raw = localStorage.getItem('mcq_local_backups_v1');
        if(!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch(e) {
        console.warn('loadLocalBackups failed', e);
        return [];
    }
}
function saveLocalBackups(arr) {
    try {
        localStorage.setItem('mcq_local_backups_v1', JSON.stringify(arr));
    } catch(e) {
        console.warn('saveLocalBackups failed', e);
    }
}
function createLocalBackup(label='manual') {
    const backups = loadLocalBackups();
    const stamp = new Date();
    const item = {
        id: stamp.getTime(),
        label,
        createdAt: stamp.toISOString(),
        questions: App.questions,
        user: App.user
    };
    backups.unshift(item);
    const trimmed = backups.slice(0,10);
    saveLocalBackups(trimmed);
    renderBackupList();
    showToast('Local backup saved');
}
function renderBackupList() {
    const listEl = document.getElementById('backupList');
    if(!listEl) return;
    const backups = loadLocalBackups();
    if(backups.length === 0) {
        listEl.innerHTML = '<div class="muted small-label">No backups yet.</div>';
        return;
    }
    let html = '';
    backups.forEach(b => {
        html += `
         <div class="backup-item">
            <div class="backup-meta">
               <div><strong>${new Date(b.createdAt).toLocaleString()}</strong></div>
               <div class="muted">${b.label || ''}</div>
            </div>
            <div class="backup-actions">
               <button class="secondary-btn tiny-btn" onclick="downloadBackup(${b.id})">Download</button>
               <button class="primary-btn tiny-btn" onclick="applyBackup(${b.id})">Apply</button>
            </div>
         </div>
        `;
    });
    listEl.innerHTML = html;
}

window.downloadBackup = (id) => {
    const backups = loadLocalBackups();
    const b = backups.find(x => x.id === id);
    if(!b) return;
    const blob = new Blob([JSON.stringify({questions:b.questions, user:b.user}, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mcq_backup_${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

window.applyBackup = (id) => {
    const backups = loadLocalBackups();
    const b = backups.find(x => x.id === id);
    if(!b) return alert('Backup not found');
    if(!confirm('Apply this backup? This will overwrite current questions and stats.')) return;
    const tx = db.transaction(['questions','user'], 'readwrite');
    const qStore = tx.objectStore('questions');
    const uStore = tx.objectStore('user');
    qStore.clear().onsuccess = () => {
        (b.questions || []).forEach(q => qStore.put(q));
    };
    uStore.put({ key: 'stats', ...(b.user || {}) });
    tx.oncomplete = async () => {
        await loadData();
        normalizeQuestions();
        refreshUI();
        renderDashboard();
        showToast('Backup applied');
    };
};

// --- RESET SYSTEM ---
function buildResetPlan() {
    const mode = document.getElementById('resetMode').value;
    const tag = (document.getElementById('resetTagInput').value || '').toLowerCase();
    let ids = [];
    if(mode === 'lastSession') {
        ids = Array.from(App.sessionIds);
    } else if(mode === 'chapter') {
        const ch = document.getElementById('allChapterSelect').value;
        ids = App.questions.filter(q => !ch || q.chapter === ch).map(q=>q.id);
    } else if(mode === 'wrongStats') {
        ids = App.questions.filter(q => (q.timesWrong||0) > 0).map(q=>q.id);
    } else if(mode === 'tag') {
        if(!tag) { alert('Type a tag text'); return null; }
        ids = App.questions.filter(q => {
            if(!q.tags) return false;
            const t = Array.isArray(q.tags) ? q.tags.join(' ').toLowerCase() : String(q.tags).toLowerCase();
            return t.includes(tag);
        }).map(q=>q.id);
    } else if(mode === 'all') {
        ids = App.questions.map(q=>q.id);
    }
    return { mode, ids };
}

function resetQuestionStatsByIds(ids) {
    const idSet = new Set(ids);
    const tx = db.transaction('questions','readwrite');
    App.questions.forEach(q => {
        if(!idSet.has(q.id)) return;
        q.timesSeen = 0;
        q.timesCorrect = 0;
        q.timesWrong = 0;
        q.dueDate = null;
        q.lastSeenAt = null;
        tx.objectStore('questions').put(q);
    });
    tx.oncomplete = () => {
        showToast(`Reset ${ids.length} questions`);
        applyTableFilters();
    };
}

function handleResetClick() {
    const statusEl = document.getElementById('resetStatus');
    const btn = document.getElementById('btnApplyReset');

    // If timer already running -> cancel
    if(resetTimer) {
        clearTimeout(resetTimer);
        resetTimer = null;
        if(resetCountdownInterval) { clearInterval(resetCountdownInterval); resetCountdownInterval = null; }
        lastResetPlan = null;
        if(statusEl) statusEl.textContent = 'Reset cancelled';
        if(btn) btn.textContent = 'Reset Details';
        return;
    }

    const plan = buildResetPlan();
    if(!plan || !plan.ids || plan.ids.length === 0) {
        alert('No questions found for this reset selection.');
        return;
    }
    if(!confirm(`Reset stats for ${plan.ids.length} questions?`)) return;

    // Backup before reset
    createLocalBackup('auto-before-reset');

    lastResetPlan = plan;
    let seconds = 5;
    if(btn) btn.textContent = `Cancel Reset (${seconds})`;
    if(statusEl) statusEl.textContent = `Reset will run in ${seconds} seconds...`;

    resetCountdownInterval = setInterval(() => {
        seconds--;
        if(seconds <= 0) {
            clearInterval(resetCountdownInterval);
            resetCountdownInterval = null;
        }
        if(btn && resetTimer) btn.textContent = seconds>0 ? `Cancel Reset (${seconds})` : 'Resetting...';
        if(statusEl && resetTimer) statusEl.textContent = seconds>0 ? `Reset will run in ${seconds} seconds...` : 'Applying reset...';
    }, 1000);

    resetTimer = setTimeout(() => {
        resetTimer = null;
        if(resetCountdownInterval) { clearInterval(resetCountdownInterval); resetCountdownInterval = null; }
        const ids = lastResetPlan ? lastResetPlan.ids : [];
        lastResetPlan = null;
        if(btn) btn.textContent = 'Reset Details';
        if(statusEl) statusEl.textContent = '';
        if(ids.length > 0) resetQuestionStatsByIds(ids);
    }, 5000);
}

// Flashcards
let fcPool = [], fcIdx = 0;
function buildFlashcardPool() {
    const srcSel = document.getElementById('fcSource');
    const mode = srcSel ? srcSel.value : 'due';
    if(mode === 'due') {
        fcPool = App.questions.filter(q => q.active !== false && (q.timesSeen||0) > 0);
    } else {
        fcPool = App.questions.filter(q => q.active !== false);
    }
    fcIdx = 0; renderFC();
}
function renderFC() {
    const front = document.getElementById('fcFront');
    const back = document.getElementById('fcBack');
    if(!front || !back) return;
    if(fcPool.length===0) { 
        front.textContent="Empty"; 
        back.textContent=""; 
        back.classList.add('hidden');
        return; 
    }
    const q = fcPool[fcIdx];
    const cor = (q.choices || []).find(c=>c.isCorrect);
    front.textContent = q.text;
    back.innerHTML = `<b>Answer:</b> ${cor?cor.text:'?'}`;
    back.classList.add('hidden');
}
function nextFlashcard(good) { 
    if(fcIdx < fcPool.length -1) fcIdx++; else fcIdx = 0; 
    renderFC(); 
}

// Exam
let examSession = null;
function startExam() {
    const count = parseInt(document.getElementById('examCount').value) || 40;
    const pool = [...App.questions].sort(() => Math.random()-0.5).slice(0, count);
    examSession = { qs: pool, answers: {}, index: 0 };
    document.getElementById('examInterface').classList.remove('hidden');
    renderExamQ();
}
function renderExamQ() {
    const q = examSession.qs[examSession.index];
    safeSetText('examProgress', `Q ${examSession.index+1}/${examSession.qs.length}`);
    let h = `<div class="q-text">${q.text}</div>`;
    (q.choices || []).forEach((c, i) => h += `<label class="choice"><input type="radio" name="exAns" value="${i}"> ${c.text}</label>`);
    document.getElementById('examQPanel').innerHTML = h;
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
       const cor = (q.choices || []).findIndex(c=>c.isCorrect);
       if(ans === cor) correct++;
    });
    document.getElementById('examInterface').classList.add('hidden');
    document.getElementById('examResults').classList.remove('hidden');
    document.getElementById('examScore').innerHTML = `<h2>Score: ${correct} / ${examSession.qs.length}</h2>`;
}

// Edit Logic
window.openEdit = (id) => {
    const q = App.questions.find(x=>x.id===id);
    if(!q) return;
    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editModal').dataset.id = id;
    document.getElementById('editText').value = q.text || '';
    document.getElementById('editChapter').value = q.chapter || '';
    document.getElementById('editTags').value = Array.isArray(q.tags) ? q.tags.join(', ') : (q.tags || '');
    document.getElementById('editMaint').checked = !!q.maintenance;
    document.getElementById('editExplanation').value = q.explanation || '';
    const list = document.getElementById('editChoicesList'); 
    list.innerHTML='';
    (q.choices||[]).forEach(c => addEditChoice(c.text, c.isCorrect));
};
function addEditChoice(txt='', cor=false) {
    const d=document.createElement('div'); 
    d.className='edit-choice-row';
    d.style.display = 'flex';
    d.style.gap = '6px';
    d.style.marginBottom = '4px';
    d.innerHTML=`
        <input class="std-input" style="flex:1" type="text" value="${txt || ''}">
        <input type="radio" name="ec" ${cor?'checked':''}>
        <button type="button" onclick="this.parentElement.remove()" class="tiny-btn" style="background:red">X</button>`;
    document.getElementById('editChoicesList').appendChild(d);
}
function saveEditModal() {
    const id = parseInt(document.getElementById('editModal').dataset.id);
    const q = App.questions.find(x=>x.id===id);
    if(!q) return;
    q.text = document.getElementById('editText').value;
    q.chapter = document.getElementById('editChapter').value;
    q.maintenance = document.getElementById('editMaint').checked;
    if(q.maintenance) q.error = false;
    q.explanation = document.getElementById('editExplanation').value;
    const tagsRaw = document.getElementById('editTags').value;
    q.tags = tagsRaw ? tagsRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];
    const ch = [];
    document.querySelectorAll('.edit-choice-row').forEach(r => {
        const txt = r.querySelector('input[type="text"]').value;
        const isCor = r.querySelector('input[type="radio"]').checked;
        ch.push({ text: txt, isCorrect: isCor });
    });
    q.choices = ch;
    saveQ(q);
    document.getElementById('editModal').classList.add('hidden');
    applyTableFilters();
    alert("Saved");
}
function handleSRS(grade) {
    const q = App.currentQ;
    if(!q) return;
    let days = 1;
    if(grade===4) days=7; if(grade===3) days=4; if(grade===2) days=2;
    q.dueDate = Date.now() + (days * 24 * 60 * 60 * 1000);
    saveQ(q);
    loadNextQuestion(false);
}
function renderDashboard() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => (q.timesCorrect || 0) > 3).length;
    const issueCount = App.questions.filter(q => q.error || q.maintenance).length;
    safeSetText('dashTotal', total);
    safeSetText('dashMastery', Math.round((mastered/Math.max(total,1))*100) + '%');
    safeSetText('dashMaint', issueCount);
}
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    document.querySelector(`.tab-button[data-tab="${id}"]`).classList.add('active');
    if(id==='all') applyTableFilters();
    if(id==='dashboard') renderDashboard();
    if(id==='settings') renderBackupList();
}
function refreshUI() {
    const chaps = [...new Set(App.questions.map(q=>q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All Chapters</option>' + chaps.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}
