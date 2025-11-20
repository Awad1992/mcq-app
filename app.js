/**
 * MCQ Ultra-Pro v10.2.0 (Compliance Release)
 * Fixes: Table Sorting, Layout, Import Safety, Previous Button.
 */

const DB_NAME = 'mcq_pro_v10';
const DB_VERSION = 15; 
let db = null;

// --- STATE ---
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
    duplicates: [],
    history: [] 
};

// --- HELPER ---
function showToast(msg, type='success') {
    const container = document.getElementById('toastContainer');
    if(!container) return;
    const d = document.createElement('div');
    d.className = `toast`;
    d.style.background = type==='error' ? '#ef4444' : (type==='warn' ? '#f59e0b' : '#1e293b');
    d.textContent = msg;
    container.appendChild(d);
    setTimeout(() => d.remove(), 3000);
}

function bindEvent(id, event, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
}

function debounce(fn, ms) { 
    let t; return (...args) => { clearTimeout(t); t=setTimeout(()=>fn(...args),ms); }; 
}

// --- 1. BOOT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        
        loadSettingsToUI();
        setupEvents();
        refreshUI();
        
        buildFlashcardPool();
        loadNextQuestion(true);
        
        console.log('v10.2 Compliance Fix Loaded');
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

// --- 3. SETTINGS ---
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
    showToast('Saved ✅');
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
    
    if(panel) panel.innerHTML = '<div class="muted p-20" style="text-align:center">Loading...</div>';
    if(fb) fb.classList.add('hidden');
    
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');
    document.getElementById('btnNext').classList.add('hidden');

    if (App.questions.length === 0) {
        if(panel) panel.innerHTML = '<div class="muted p-20" style="text-align:center">Bank Empty.</div>';
        return;
    }

    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;

    if (m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
    if (m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if (m === 'flagged') pool = pool.filter(q => q.flagged);
    if (m === 'new') pool = pool.filter(q => !q.timesSeen);
    if (m === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= Date.now());

    if (skip && m !== 'new') {
        const unseen = pool.filter(q => !q.timesSeen);
        if (unseen.length > 0) pool = unseen;
    }

    if (pool.length === 0) {
        if(panel) panel.innerHTML = '<div class="muted p-20" style="text-align:center">No match.</div>';
        App.currentQ = null;
        return;
    }

    if (reset) App.history = [];
    if (App.currentQ) App.history.push(App.currentQ);

    App.currentQ = pool[Math.floor(Math.random() * pool.length)];
    renderQuestionUI();
}

function loadPrevQuestion() {
    if (App.history.length === 0) return showToast("No Previous Question", "warn");
    App.currentQ = App.history.pop();
    renderQuestionUI();
    
    // Restore State
    if (App.currentQ.lastChoiceIdx !== undefined) {
        const idx = App.currentQ.lastChoiceIdx;
        const correctIdx = App.currentQ.choices.findIndex(c => c.isCorrect);
        const isCorrect = (idx === correctIdx);
        
        const fb = document.getElementById('feedbackPanel');
        fb.classList.remove('hidden');
        fb.innerHTML = `<div style="font-weight:bold; color:${isCorrect?'#10b981':'#ef4444'}">${isCorrect ? 'Correct!' : 'Wrong'}</div><div class="muted">${App.currentQ.explanation}</div>`;
        
        const cEl = document.getElementById(`c_${correctIdx}`);
        const sEl = document.getElementById(`c_${idx}`);
        if(cEl) cEl.classList.add('correct');
        if(sEl && !isCorrect) sEl.classList.add('wrong');
        
        document.getElementById('btnSubmit').classList.add('hidden');
        document.getElementById('btnNext').classList.remove('hidden');
    }
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
    
    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    
    const q = App.currentQ;
    q.lastChoiceIdx = idx; // Save State
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
        
        const btn = document.getElementById('btnSaveNoteManual');
        if(btn) {
             btn.textContent = "Saved! ✅";
             setTimeout(() => btn.textContent = "💾 Save Note", 2000);
        }
    }
}

function toggleFlagCurrent() {
    if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQuestion(App.currentQ); renderQuestionUI(); }
}
function selectChoice(idx) {
   if(document.getElementById('feedbackPanel').classList.contains('hidden')) {
       document.querySelectorAll('.choice').forEach(e=>e.classList.remove('selected'));
       document.getElementById(`c_${idx}`).classList.add('selected');
   }
}
function toggleStrike(idx) { document.getElementById(`c_${idx}`).classList.toggle('strikethrough'); }

// --- 5. TABLE (SORTING & LAYOUT FIXED) ---
function applyTableFilters() {
    const search = document.getElementById('allSearch').value.toLowerCase();
    const type = document.getElementById('allFilter').value;
    const chap = document.getElementById('allChapterSelect').value;
    
    App.tableQs = App.questions.filter(q => {
        if(search && !q.text.toLowerCase().includes(search) && String(q.id) !== search) return false;
        if(chap && q.chapter !== chap) return false;
        if(type === 'notes' && !q.userNotes) return false;
        if(type === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
        if(type === 'flagged' && !q.flagged) return false;
        return true;
    });
    renderTable();
}

function sortTable(field) {
    App.sort.asc = (App.sort.field === field) ? !App.sort.asc : true;
    App.sort.field = field;
    
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
        
        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" ${isSel?'checked':''}></td>
           <td>${q.id}</td>
           <td>${q.text.substring(0,80)}...</td>
           <td>${q.chapter||'-'}</td>
           <td>${q.timesSeen||0}</td>
           <td>${q.timesWrong||0}</td>
           <td><button class="pill-btn small" onclick="alert('Edit functionality reserved')">✎</button></td>
        `;
        
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
    btn.textContent = App.rangeMode ? "✨ Range: ON" : "✨ Range: OFF";
}

// --- 6. EVENTS ---
function setupEvents() {
    document.querySelectorAll('.tab-button').forEach(b => 
        b.addEventListener('click', () => switchTab(b.dataset.tab)));
    
    bindEvent('btnSubmit', 'click', submitAnswer);
    bindEvent('btnNext', 'click', () => loadNextQuestion(false));
    bindEvent('btnPrev', 'click', loadPrevQuestion);
    bindEvent('btnFlag', 'click', toggleFlagCurrent);
    bindEvent('btnSaveNoteManual', 'click', saveNote);
    
    bindEvent('modeSelect', 'change', () => loadNextQuestion(true));
    bindEvent('chapterSelect', 'change', () => loadNextQuestion(true));
    
    bindEvent('btnSrsAgain', 'click', () => handleSRS(1));
    bindEvent('btnSrsHard', 'click', () => handleSRS(2));
    bindEvent('btnSrsGood', 'click', () => handleSRS(3));
    bindEvent('btnSrsEasy', 'click', () => handleSRS(4));

    bindEvent('btnAllApply', 'click', applyTableFilters);
    bindEvent('allSelectAll', 'click', toggleSelectAll);
    bindEvent('btnRangeMode', 'click', toggleRangeMode);
    
    bindEvent('allPrevPage', 'click', () => { if(App.page>1){App.page--; renderTable();} });
    bindEvent('allNextPage', 'click', () => { App.page++; renderTable(); });

    bindEvent('btnImportTrigger', 'click', () => document.getElementById('fileInput').click());
    bindEvent('fileInput', 'change', handleImport);
    bindEvent('btnExportTrigger', 'click', handleExport);
    
    bindEvent('btnSaveGh', 'click', saveSettings);
    bindEvent('btnCloudUpload', 'click', cloudUpload);
    bindEvent('btnCloudDownload', 'click', cloudDownload);
    bindEvent('btnResetProgress', 'click', resetProgress);
    bindEvent('btnFactoryReset', 'click', () => { if(confirm("WIPE DB?")) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }});
    
    bindEvent('btnFcShuffle', 'click', buildFlashcardPool);
    bindEvent('btnFcShow', 'click', () => { document.getElementById('fcBack').classList.remove('hidden'); });
    bindEvent('btnFcAgain', 'click', () => nextFlashcard(false));
    bindEvent('btnFcGood', 'click', () => nextFlashcard(true));

    bindEvent('btnStartExam', 'click', startExam);
    bindEvent('btnExamNext', 'click', () => examMove(1));
    bindEvent('btnExamPrev', 'click', () => examMove(-1));
    bindEvent('btnExamFinish', 'click', finishExam);
    bindEvent('btnExamClose', 'click', () => { document.getElementById('examResults').classList.add('hidden'); switchTab('home'); });

    bindEvent('btnRefreshStats', 'click', renderDashboard);

    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => sortTable(th.dataset.key));
    });

    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 1000));
}

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
    const h = '<option value="">All Chapters</option>' + ch.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}

// Import with Confirmation
async function handleImport() {
    const file = document.getElementById('fileInput').files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(!confirm(`Found ${json.length} items. Proceed with Import?`)) return;
            
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

function resetProgress() { if(confirm("Reset stats?")) { const tx=db.transaction('questions','readwrite'); App.questions.forEach(q=>{q.timesSeen=0; q.timesCorrect=0; q.timesWrong=0; tx.objectStore('questions').put(q)}); tx.oncomplete=()=>location.reload(); } }
function renderDashboard() { document.getElementById('dashTotal').textContent = App.questions.length; }

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