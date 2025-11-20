/**
 * MCQ Ultra-Pro v11.5.0 (Integrity Release)
 * Corrected: Library Table, Range Select, Refresh Buttons, Import Confirm, Maintenance Tag.
 */

const DB_NAME = 'mcq_pro_v11';
const DB_VERSION = 16; // Incremented for safety
let db = null;

// --- APP STATE ---
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
    history: []
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
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        loadSettings();
        setupEvents();
        refreshUI();
        
        buildFlashcardPool();
        loadNextQuestion(true);
        
        document.getElementById('dbStatus').textContent = "DB: Ready";
        showToast('System v11.5 Ready 💎');
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
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    
    if(reset) App.history = [];
    if(App.currentQ) App.history.push(App.currentQ);

    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;
    document.getElementById('chapterBox').style.display = (m==='chapter') ? 'block' : 'none';

    // Filtering Logic
    let pool = App.questions.filter(q => {
        if(q.active === false) return false;
        if(m === 'chapter' && c && q.chapter !== c) return false;
        if(m === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
        if(m === 'maintain' && !q.maintenance) return false;
        if(m === 'flagged' && !q.flagged) return false;
        if(m === 'new' && q.timesSeen > 0) return false;
        
        // Due (SM-2)
        if(m === 'due') {
             // Simple check: Not seen OR due date passed
             if(!q.dueDate || q.dueDate <= Date.now()) return true;
             return false;
        }
        
        if(skip && m!=='new' && m!=='maintain' && m!=='wrong' && q.timesSeen > 0) return false;
        
        return true;
    });

    if(pool.length === 0) {
        panel.innerHTML = '<div style="padding:20px; text-align:center; color:#888;">No questions match criteria.<br>Try "Refresh" or change filters.</div>';
        App.currentQ = null;
        return;
    }

    const rand = Math.floor(Math.random() * pool.length);
    App.currentQ = pool[rand];
    renderQ();
}

function renderQ() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    
    document.getElementById('feedbackPanel').classList.add('hidden');
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');
    document.getElementById('btnNext').classList.add('hidden');
    document.getElementById('maintBox').style.display = 'none';
    
    document.getElementById('btnFlag').textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
    document.getElementById('btnFlag').style.color = q.flagged ? "red" : "";
    document.getElementById('userNoteArea').value = q.userNotes || "";

    let h = `<div style="font-weight:500; font-size:1.1rem; margin-bottom:15px;">[#${q.id}] ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:10px; border-radius:8px;">`;

    q.choices.forEach((c, i) => {
        h += `<div class="choice" id="c_${i}" onclick="selectChoice(${i})">
          <b>${String.fromCharCode(65+i)}.</b> ${c.text}
        </div>`;
    });
    panel.innerHTML = h;
    
    // Search
    const term = encodeURIComponent(q.chapter || 'Medicine');
    document.getElementById('searchTools').innerHTML = `
      <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
      <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
    `;
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
    if(App.selectedChoice === undefined) return alert("Select an answer");
    const q = App.currentQ;
    const idx = App.selectedChoice;
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
    
    q.timesSeen = (q.timesSeen||0)+1;
    if(isCorrect) q.timesCorrect = (q.timesCorrect||0)+1; else q.timesWrong = (q.timesWrong||0)+1;
    
    // Auto schedule if SRS ignored
    if(!q.dueDate) q.dueDate = Date.now();
    saveQ(q);
}

function loadPrevQuestion() {
    if(App.history.length === 0) return showToast("No history", "warn");
    App.currentQ = App.history.pop();
    renderQ();
    // Logic to restore previous state could go here
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
    
    // Visual Indicators
    document.querySelectorAll('.sortable').forEach(th => {
        th.textContent = th.dataset.key === field 
           ? `${th.dataset.key.toUpperCase()} ${App.sort.asc ? '↑' : '↓'}` 
           : `${th.dataset.key.toUpperCase()} ↕`;
    });

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
    
    if(data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">No Data Found</td></tr>';
        return;
    }
    
    data.forEach(q => {
        const tr = document.createElement('tr');
        
        // Maintenance Tag
        let status = '';
        if(q.maintenance) status += '<span class="tag-maint">🔧 MAINT</span> ';
        if(q.flagged) status += '🚩 ';
        if(q.userNotes) status += '📝';

        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" onclick="handleCheck(this, ${q.id})"></td>
           <td>${q.id}</td>
           <td class="wrap-text" title="${q.text}">${q.text.substring(0,100)}...</td>
           <td title="${q.chapter}">${q.chapter||'-'}</td>
           <td>${status}</td>
           <td><button class="pill-btn tiny-btn" onclick="openEdit(${q.id})">✎</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById('allPageInfo').textContent = App.page;
    document.getElementById('selCount').textContent = App.selectedIds.size + " Selected";
}

// Range Select Logic
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
    document.getElementById('selCount').textContent = App.selectedIds.size + " Selected";
    // Don't re-render whole table for speed, just update logic
}

function toggleRangeMode() {
    App.rangeMode = !App.rangeMode;
    const btn = document.getElementById('btnRangeMode');
    btn.textContent = App.rangeMode ? "Range: ON" : "Range: OFF";
    btn.classList.toggle('range-active', App.rangeMode);
    showToast(App.rangeMode ? "Shift Logic Enabled" : "Standard Select");
}

function toggleSelectAll(cb) {
    const checked = cb.checked;
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    data.forEach(q => {
        if(checked) App.selectedIds.add(q.id); else App.selectedIds.delete(q.id);
    });
    renderTable(); // Re-render to show checks
    document.getElementById('selCount').textContent = App.selectedIds.size + " Selected";
}

// --- 5. EVENTS ---
function setupEvents() {
    bind('btnSubmit', 'click', submitAnswer);
    bind('btnNext', 'click', () => loadNextQuestion(false));
    bind('btnPrev', 'click', loadPrevQuestion);
    bind('btnFlag', 'click', () => { 
        if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQ(App.currentQ); renderQ(); } 
    });
    bind('btnMaintain', 'click', toggleMaintenance);
    bind('btnSaveMaint', 'click', saveMaintenanceNote);
    bind('btnSaveNoteManual', 'click', saveNoteManual);
    
    bind('modeSelect', 'change', () => loadNextQuestion(true));
    bind('chapterSelect', 'change', () => loadNextQuestion(true));
    
    bind('btnAllApply', 'click', applyTableFilters);
    bind('btnRangeMode', 'click', toggleRangeMode);
    bind('btnScanDup', 'click', scanDuplicates);
    bind('btnFixDup', 'click', fixDuplicates);
    bind('btnBulkDelete', 'click', () => execBulk('delete'));
    
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => sortTable(th.dataset.key));
    });
    
    bind('allPrevPage', 'click', () => { if(App.page>1){App.page--; renderTable();} });
    bind('allNextPage', 'click', () => { App.page++; renderTable(); });

    bind('btnImportTrigger', 'click', () => document.getElementById('fileInput').click());
    bind('fileInput', 'change', handleImport);
    bind('btnExportTrigger', 'click', handleExport);
    
    bind('btnSaveGh', 'click', saveSettings);
    bind('btnCloudUpload', 'click', cloudUpload);
    bind('btnCloudDownload', 'click', cloudDownload);
    bind('btnHeaderBackup', 'click', cloudUpload); // Header Button
    bind('btnResetProgress', 'click', () => { if(confirm("Reset?")) { App.questions.forEach(q=>{q.timesSeen=0; saveQ(q)}); location.reload(); } });
    
    bind('btnFcShuffle', 'click', buildFlashcardPool);
    bind('btnFcShow', 'click', () => document.getElementById('fcBack').style.display='block');

    bind('btnSaveEdit', 'click', saveEditModal);
    bind('btnCancelEdit', 'click', () => document.getElementById('editModal').classList.add('hidden'));
    bind('btnAddChoice', 'click', addEditChoice);
}

// --- UTILS ---
function saveQ(q) {
    const tx = db.transaction('questions','readwrite');
    tx.objectStore('questions').put(q);
}
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    if(id==='all') applyTableFilters();
    if(id==='dashboard') document.getElementById('dashTotal').textContent = App.questions.length;
}
function refreshUI() {
    const chaps = [...new Set(App.questions.map(q=>q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All Chapters</option>' + chaps.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
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

// --- IMPORT/EXPORT (CONFIRMATION) ---
async function handleImport() {
    const f = document.getElementById('fileInput').files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(confirm(`Found ${json.length} questions. Import?`)) {
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
    document.getElementById('dupResult').textContent = `${App.duplicates.length} Duplicates Found`;
    if(App.duplicates.length > 0) document.getElementById('btnFixDup').classList.remove('hidden');
}
async function fixDuplicates() {
    const tx = db.transaction('questions','readwrite');
    App.duplicates.forEach(q => tx.objectStore('questions').delete(q.id));
    tx.oncomplete = async () => { await loadData(); scanDuplicates(); showToast('Fixed Duplicates'); };
}

// --- BULK ---
async function execBulk(act) {
    if(!confirm(`Bulk ${act} on ${App.selectedIds.size} items?`)) return;
    const tx = db.transaction('questions', 'readwrite');
    App.selectedIds.forEach(id => {
        if(act==='delete') tx.objectStore('questions').delete(id);
    });
    tx.oncomplete = async () => { await loadData(); applyTableFilters(); showToast("Bulk Action Done"); };
}

// --- EDIT MODAL ---
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
    showToast('Question Updated');
}

// --- CLOUD (MOCK) ---
// Replace with full fetch logic from v9.5 if needed, currently standard
function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
function deb64(s) { return decodeURIComponent(escape(atob(s))); }
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

// Flashcards
let fcPool = [], fcIdx = 0;
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
    document.getElementById('flashcardBack').style.display = 'none';
}
function nextFlashcard(good) {
    if(fcIdx < fcPool.length -1) fcIdx++; else fcIdx = 0;
    renderFC();
}
</script>
</body>
</html>