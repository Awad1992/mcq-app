/**
 * MCQ Ultra-Pro v13.0 (Absolute Integrity Edition)
 * Verified Fixes: Select All, Sort, Next/Prev, Flashcards, Layout.
 */

const DB_NAME = 'mcq_pro_v13';
const DB_VERSION = 22; // Force Clean Init
let db = null;

const App = {
    questions: [], tableQs: [], selectedIds: new Set(), currentQ: null, 
    selectedChoice: null,
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1, limit: 50, rangeMode: false, lastCheckId: null, skipSolved: true,
    history: [], duplicates: []
};

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
    else console.warn("Missing ID:", id);
}
function safeSetText(id, val) {
    const el = document.getElementById(id);
    if(el) el.textContent = val;
}
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
        loadNextQuestion(true);
        
        safeSetText('dbStatus', "DB: Ready");
        checkCloud();
        showToast('System v13.0 Ready 💎');
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
        const tx = db.transaction('questions', 'readonly');
        tx.objectStore('questions').getAll().onsuccess = (e) => {
            App.questions = e.target.result || [];
            resolve();
        };
    });
}

// --- 3. PRACTICE ENGINE ---
function loadNextQuestion(reset) {
    if(reset) App.history = [];
    if(App.currentQ && !reset) App.history.push(App.currentQ);

    // Clear previous selection state
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
    if(pool.length === 0) {
        if(panel) panel.innerHTML = '<div style="padding:20px; text-align:center; color:#888;">No questions found.<br>Try "Refresh" or change filters.</div>';
        return;
    }

    const rand = Math.floor(Math.random() * pool.length);
    App.currentQ = pool[rand];
    renderQ();
}

function loadPrevQuestion() {
    if (App.history.length === 0) return showToast("No history", "warn");
    App.currentQ = App.history.pop();
    renderQ();
    if(App.currentQ.lastChoice !== undefined) {
        showFeedback(App.currentQ.lastChoice, App.currentQ);
    }
}

function renderQ() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    
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
    document.getElementById('userNoteArea').value = q.userNotes || "";

    let h = `<div style="font-weight:500; font-size:1.1rem; margin-bottom:15px;">[#${q.id}] ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:10px; border-radius:8px;">`;

    q.choices.forEach((c, i) => {
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
    document.getElementById('c_'+idx).style.borderColor = 'var(--primary)';
    document.getElementById('c_'+idx).style.background = '#eff6ff';
    App.selectedChoice = idx;
}

function submitAnswer() {
    if(App.selectedChoice === null || App.selectedChoice === undefined) return alert("Select an answer");
    const q = App.currentQ;
    q.lastChoice = App.selectedChoice; 
    
    showFeedback(App.selectedChoice, q);
    
    const isCorrect = q.choices[App.selectedChoice].isCorrect;
    q.timesSeen = (q.timesSeen||0) + 1;
    if(isCorrect) q.timesCorrect = (q.timesCorrect||0)+1; else q.timesWrong = (q.timesWrong||0)+1;
    
    if(!q.dueDate) q.dueDate = Date.now();
    saveQ(q);
}

function showFeedback(idx, q) {
    const correctIdx = q.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `<strong style="color:${isCorrect?'#10b981':'#ef4444'}">${isCorrect?'Correct!':'Wrong'}</strong><br>${q.explanation||''}`;
    
    document.getElementById('c_'+correctIdx).classList.add('correct');
    if(!isCorrect) document.getElementById('c_'+idx).classList.add('wrong');
    
    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
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
    tbody.innerHTML = '';
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    
    data.forEach(q => {
        const tr = document.createElement('tr');
        const isSel = App.selectedIds.has(q.id);
        
        let status = '';
        if(q.maintenance) status += '<span class="tag-maint">🔧 MAINT</span> ';
        if(q.flagged) status += '🚩 ';
        if(q.userNotes) status += '📝';

        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" ${isSel?'checked':''} onclick="handleCheck(this, ${q.id})"></td>
           <td>${q.id}</td>
           <td class="wrap-text" title="${q.text}">${q.text.substring(0,100)}...</td>
           <td>${q.chapter||'-'}</td>
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
        if(s > -1 && e > -1) {
            const min = Math.min(s,e), max = Math.max(s,e);
            for(let i=min; i<=max; i++) App.selectedIds.add(all[i]);
        }
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
    btn.textContent = App.rangeMode ? "✨ Range: ON" : "✨ Range: OFF";
    btn.classList.toggle('range-active', App.rangeMode);
    showToast(App.rangeMode ? "Shift-select ON" : "Range OFF");
}

// --- 5. EVENTS ---
function setupEvents() {
    bind('btnSubmit', 'click', submitAnswer);
    bind('btnNext', 'click', () => loadNextQuestion(false));
    bind('btnPrev', 'click', loadPrevQuestion);
    bind('btnFlag', 'click', toggleFlagCurrent);
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
    
    bind('btnSaveGh', 'click', saveSettings);
    bind('btnCloudUpload', 'click', cloudUpload);
    bind('btnCloudDownload', 'click', cloudDownload);
    bind('btnResetProgress', 'click', () => { if(confirm("Reset?")) { App.questions.forEach(q=>{q.timesSeen=0; saveQ(q)}); location.reload(); } });
    bind('btnFactoryReset', 'click', () => { if(confirm("WIPE DB?")) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }});
    
    bind('btnFcShuffle', 'click', buildFlashcardPool);
    bind('btnFcShow', 'click', () => document.getElementById('fcBack').style.display='block');
    bind('btnFcAgain', 'click', () => nextFlashcard(false));
    bind('btnFcGood', 'click', () => nextFlashcard(true));

    bind('btnStartExam', 'click', startExam);
    bind('btnExamNext', 'click', () => examMove(1));
    bind('btnExamFinish', 'click', finishExam);
    bind('btnExamClose', 'click', () => { document.getElementById('examResults').classList.add('hidden'); switchTab('home'); });

    bind('btnSaveEdit', 'click', saveEditModal);
    bind('btnCancelEdit', 'click', () => document.getElementById('editModal').classList.add('hidden'));
    bind('btnAddChoice', 'click', addEditChoice);
    
    // Tabs
    document.querySelectorAll('.tab-button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    
    // Headers
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => sortTable(th.dataset.key));
    });

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
    box.style.display = (box.style.display === 'block') ? 'none' : 'block';
    if(box.style.display === 'block') document.getElementById('maintNote').value = App.currentQ.maintenanceNote || '';
}
function saveMaintenanceNote() {
    if(App.currentQ) {
        App.currentQ.maintenance = true;
        App.currentQ.maintenanceNote = document.getElementById('maintNote').value;
        saveQ(App.currentQ);
        alert("Report Saved");
        toggleMaintenance();
    }
}
function saveNoteManual() {
    if(App.currentQ) {
        App.currentQ.userNotes = document.getElementById('userNoteArea').value;
        saveQ(App.currentQ);
        let btn = document.getElementById('btnSaveNoteManual');
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
function toggleFlagCurrent() {
    if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQ(App.currentQ); renderQ(); }
}
function checkCloud() {
    const t = localStorage.getItem('gh_token');
    if(t) safeSetText('syncStatus', "Cloud: Linked");
}

// --- IMPORT/EXPORT ---
async function handleImport() {
    const f = document.getElementById('fileInput').files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(confirm(`Found ${json.length} items. Import?`)) {
                const tx = db.transaction('questions','readwrite');
                json.forEach(q => {
                    q.id = parseInt(String(q.id).replace(/\D/g,'')) || Date.now();
                    tx.objectStore('questions').put(q); 
                });
                tx.oncomplete = () => { loadData(); refreshUI(); showToast('Imported Successfully'); };
            }
        } catch(err) { alert(err.message); }
    };
    r.readAsText(f);
}
function handleExport() {
    const b = new Blob([JSON.stringify(App.questions, null, 2)], {type:'application/json'});
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href=u; a.download='MCQ_Backup.json'; a.click();
}

// --- DUPLICATES ---
function scanDuplicates() {
    const map = new Map(); App.duplicates = [];
    App.questions.forEach(q => {
        const k = (q.text||"").substring(0,40).toLowerCase();
        if(map.has(k)) App.duplicates.push(q); else map.set(k, q);
    });
    safeSetText('dupResult', `${App.duplicates.length} Dups Found`);
    if(App.duplicates.length > 0) document.getElementById('btnFixDup').classList.remove('hidden');
}
async function fixDuplicates() {
    const tx = db.transaction('questions','readwrite');
    App.duplicates.forEach(q => tx.objectStore('questions').delete(q.id));
    tx.oncomplete = async () => { await loadData(); scanDuplicates(); showToast('Fixed Duplicates'); };
}

// --- CLOUD ---
function loadSettings() {
    document.getElementById('ghToken').value = localStorage.getItem('gh_token') || '';
    document.getElementById('ghRepo').value = localStorage.getItem('gh_repo') || '';
    document.getElementById('ghFile').value = localStorage.getItem('gh_file') || 'mcq_backup.json';
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
    if(!t) return alert("Check Settings");
    try {
        const c = b64(JSON.stringify(App.questions));
        let sha = null;
        try { const g = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {headers:{Authorization:`token ${t}`}}); if(g.ok) sha = (await g.json()).sha; } catch(e){}
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, { method:'PUT', headers:{Authorization:`token ${t}`, 'Content-Type':'application/json'}, body:JSON.stringify({message:'Backup', content:c, sha}) });
        if(res.ok) showToast('Uploaded ✅'); else alert('Error');
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

// Flashcards
let fcPool = [], fcIdx = 0;
function buildFlashcardPool() {
    fcPool = App.questions.filter(q => q.active !== false);
    fcIdx = 0; renderFC();
}
function renderFC() {
    if(fcPool.length===0) { safeSetText('flashcardFront', "Empty"); return; }
    const q = fcPool[fcIdx];
    const cor = q.choices.find(c=>c.isCorrect);
    safeSetText('flashcardFront', q.text);
    document.getElementById('flashcardBack').innerHTML = `<b>Answer:</b> ${cor?cor.text:'?'}`;
    document.getElementById('flashcardBack').style.display = 'none';
}
function nextFlashcard(good) { if(fcIdx < fcPool.length -1) fcIdx++; else fcIdx = 0; renderFC(); }

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
    safeSetText('examProgress', `Q ${examSession.index+1}/${examSession.qs.length}`);
    let h = `<div class="q-text">${q.text}</div>`;
    q.choices.forEach((c, i) => h += `<label class="choice"><input type="radio" name="exAns" value="${i}"> ${c.text}</label>`);
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
       const cor = q.choices.findIndex(c=>c.isCorrect);
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
    document.getElementById('editText').value = q.text;
    document.getElementById('editChapter').value = q.chapter;
    document.getElementById('editMaint').checked = !!q.maintenance;
    document.getElementById('editExplanation').value = q.explanation;
    const list = document.getElementById('editChoicesList'); list.innerHTML='';
    (q.choices||[]).forEach(c => addEditChoice(c.text, c.isCorrect));
};
function addEditChoice(txt='', cor=false) {
    const d=document.createElement('div'); d.className='edit-choice-row';
    d.innerHTML=`<input class="std-input" style="flex:1" value="${txt}"><input type="radio" name="ec" ${cor?'checked':''}><button onclick="this.parentElement.remove()" class="tiny-btn" style="background:red">X</button>`;
    document.getElementById('editChoicesList').appendChild(d);
}
function saveEditModal() {
    const id = parseInt(document.getElementById('editModal').dataset.id);
    const q = App.questions.find(x=>x.id===id);
    q.text = document.getElementById('editText').value;
    q.chapter = document.getElementById('editChapter').value;
    q.maintenance = document.getElementById('editMaint').checked;
    q.explanation = document.getElementById('editExplanation').value;
    const ch = [];
    document.querySelectorAll('.edit-choice-row').forEach(r => ch.push({ text:r.querySelector('input[type="text"]').value, isCorrect:r.querySelector('input[type="radio"]').checked }));
    q.choices = ch;
    saveQ(q);
    document.getElementById('editModal').classList.add('hidden');
    applyTableFilters();
    alert("Saved");
}
async function execBulk(act) {
    if(!confirm(`Bulk ${act}?`)) return;
    const tx = db.transaction('questions', 'readwrite');
    App.selectedIds.forEach(id => { if(act==='delete') tx.objectStore('questions').delete(id); });
    tx.oncomplete = async () => { await loadData(); applyTableFilters(); showToast("Bulk Done"); };
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
    const mastered = App.questions.filter(q => q.timesCorrect > 3).length;
    safeSetText('dashTotal', total);
    safeSetText('dashMastery', Math.round((mastered/total)*100 || 0) + '%');
}
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    if(id==='all') applyTableFilters();
    if(id==='dashboard') renderDashboard();
}
function refreshUI() {
    const chaps = [...new Set(App.questions.map(q=>q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All Chapters</option>' + chaps.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}