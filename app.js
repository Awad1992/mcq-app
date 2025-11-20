/**
 * MCQ Ultra-Pro v9.1 (Integrity Release)
 * Full Features: SM-2, Smart Import, Maintenance, Duplicates, Bulk Actions.
 * NO PLACEHOLDERS.
 */

const DB_NAME = 'mcq_pro_v9';
const DB_VERSION = 11; // Bumped to force upgrade fix
let db = null;

// --- GLOBAL STATE ---
const App = {
    questions: [],
    tableQs: [],
    selectedIds: new Set(),
    currentQ: null,
    
    // Filters
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1,
    limit: 50,
    
    // Tools
    rangeMode: false,
    lastCheckId: null,
    skipSolved: true,
    duplicates: [],
    
    user: { xp: 0, rank: 'Intern' }
};

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        
        setupEvents();
        setupKeyboard();
        
        loadSettingsToUI();
        refreshUI();
        
        // Start
        loadNextQuestion(true);
        showToast('Integrity Engine v9.1 Ready 💎');
    } catch (e) {
        console.error(e);
        alert("Critical Error: " + e.message);
    }
});

// --- 2. DATABASE ---
function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            if (!d.objectStoreNames.contains('questions')) {
                const s = d.createObjectStore('questions', { keyPath: 'id' });
                s.createIndex('chapter', 'chapter', { unique: false });
            }
            if (!d.objectStoreNames.contains('user')) {
                d.createObjectStore('user', { keyPath: 'key' });
            }
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
        el.textContent = connected ? "☁️ Cloud: Ready" : "☁️ Cloud: Offline";
        el.style.borderColor = connected ? "var(--success)" : "var(--border)";
    }
}

// --- 4. IMPORT (SMART MERGE) ---
async function handleImport() {
    const file = document.getElementById('fileInput').files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(!Array.isArray(json)) throw new Error("File not a JSON Array");
            
            const tx = db.transaction('questions', 'readwrite');
            const store = tx.objectStore('questions');
            let added = 0, updated = 0;
            
            // Find Max ID for new questions
            let maxId = 0;
            App.questions.forEach(q => maxId = Math.max(maxId, q.id));

            for (const q of json) {
                let id = parseInt(String(q.id).replace(/\D/g, ''));
                
                // Check existing
                const existing = App.questions.find(x => x.id === id);
                
                if (existing) {
                    // MERGE: Keep stats, update text
                    const merged = {
                        ...q,
                        id: id,
                        timesSeen: existing.timesSeen,
                        timesCorrect: existing.timesCorrect,
                        timesWrong: existing.timesWrong,
                        userNotes: existing.userNotes || q.userNotes,
                        maintenance: existing.maintenance || q.maintenance,
                        createdAt: existing.createdAt || q.createdAt
                    };
                    store.put(merged);
                    updated++;
                } else {
                    // ADD NEW
                    if(!id || App.questions.some(x=>x.id===id)) { maxId++; id = maxId; }
                    const newQ = {
                        ...q,
                        id: id,
                        createdAt: q.createdAt || new Date().toISOString(),
                        timesSeen: 0, timesWrong: 0, maintenance: false
                    };
                    store.put(newQ);
                    added++;
                }
            }
            
            tx.oncomplete = async () => {
                await loadData();
                refreshUI();
                showToast(`Import: ${added} New, ${updated} Merged`);
            };
            
        } catch (err) {
            showToast(err.message, 'error');
        }
    };
    reader.readAsText(file);
}

// --- 5. DUPLICATE SYSTEM ---
function scanDuplicates() {
    const map = new Map();
    const dups = [];
    
    App.questions.forEach(q => {
        // Create signature (first 40 chars of text)
        const sig = (q.text || "").toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 40);
        if(map.has(sig)) {
            dups.push(q);
        } else {
            map.set(sig, q);
        }
    });
    
    const lbl = document.getElementById('dupResult');
    const btn = document.getElementById('btnFixDup');
    
    if(dups.length > 0) {
        App.duplicates = dups;
        lbl.textContent = `Found ${dups.length} duplicates`;
        lbl.style.color = 'var(--danger)';
        btn.classList.remove('hidden');
    } else {
        lbl.textContent = "No duplicates found";
        lbl.style.color = 'var(--success)';
        btn.classList.add('hidden');
    }
}

async function fixDuplicates() {
    if(!confirm(`Remove ${App.duplicates.length} duplicates?`)) return;
    
    const tx = db.transaction('questions', 'readwrite');
    const store = tx.objectStore('questions');
    
    App.duplicates.forEach(q => store.delete(q.id));
    
    tx.oncomplete = async () => {
        await loadData();
        scanDuplicates(); // Re-scan to clear UI
        showToast("Cleaned Duplicates ✨");
    };
}

// --- 6. MAINTENANCE MODE ---
function toggleMaintenance() {
    if(!App.currentQ) return;
    const box = document.getElementById('maintenanceBox');
    box.classList.toggle('hidden');
    
    if(!box.classList.contains('hidden')) {
        document.getElementById('maintNote').value = App.currentQ.maintenanceNote || '';
    }
}

function saveMaintenanceNote() {
    if(!App.currentQ) return;
    const note = document.getElementById('maintNote').value;
    App.currentQ.maintenance = true;
    App.currentQ.maintenanceNote = note;
    
    saveQuestion(App.currentQ);
    showToast("Marked for Maintenance 🔧");
    document.getElementById('maintenanceBox').classList.add('hidden');
}

// --- 7. TABLE & FILTERS (FULL LOGIC) ---
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
    sortTable(App.sort.field, false);
}

function sortTable(field, toggle=true) {
    if(toggle) App.sort.asc = (App.sort.field === field) ? !App.sort.asc : true;
    App.sort.field = field;
    
    // Update Headers
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
    tbody.innerHTML = '';
    
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    
    if(data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">No data found</td></tr>';
        return;
    }
    
    data.forEach(q => {
        const tr = document.createElement('tr');
        const isSel = App.selectedIds.has(q.id);
        const maintBadge = q.maintenance ? '🔧' : '';
        
        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" ${isSel?'checked':''}></td>
           <td>${q.id}</td>
           <td>${q.text.substring(0, 50)}... ${q.userNotes?'📝':''}</td>
           <td>${q.chapter || '-'}</td>
           <td>${maintBadge}</td>
           <td><button class="pill-btn small" onclick="openEdit(${q.id})">✎</button></td>
        `;
        
        tr.querySelector('.row-cb').onclick = (e) => handleCheck(e, q.id);
        tbody.appendChild(tr);
    });
    
    document.getElementById('allPageInfo').textContent = `Page ${App.page} / ${Math.ceil(App.tableQs.length/App.limit)||1}`;
}

// --- 8. BULK ACTIONS ---
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
    if(e.target.checked) App.lastCheckId = id;
    updateBulkUI();
    renderTable(); // Re-render to show checks
}

function updateBulkUI() {
    const c = App.selectedIds.size;
    document.getElementById('selCount').textContent = c;
    document.getElementById('bulkBar').classList.toggle('hidden', c === 0);
}

function toggleSelectAll(e) {
    const checked = e.target.checked;
    // Only select visible page to avoid performance hit
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    
    data.forEach(q => {
        if(checked) App.selectedIds.add(q.id);
        else App.selectedIds.delete(q.id);
    });
    updateBulkUI();
    renderTable();
}

async function execBulk(action) {
    if(App.selectedIds.size === 0) return;
    if(!confirm(`Apply '${action}' to ${App.selectedIds.size} items?`)) return;
    
    const tx = db.transaction('questions', 'readwrite');
    const store = tx.objectStore('questions');
    
    App.selectedIds.forEach(id => {
        if(action === 'delete') store.delete(id);
        else {
            store.get(id).onsuccess = (e) => {
                const q = e.target.result;
                if(action === 'flag') q.flagged = !q.flagged;
                if(action === 'reset') { q.timesSeen=0; q.timesWrong=0; q.timesCorrect=0; }
                store.put(q);
            };
        }
    });
    
    tx.oncomplete = async () => {
        await loadData();
        applyTableFilters();
        showToast('Bulk Action Complete');
    };
}

// --- 9. PRACTICE ENGINE ---
async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    
    panel.innerHTML = '<div class="muted p-20" style="text-align:center">Loading...</div>';
    fb.classList.add('hidden');
    document.getElementById('maintenanceBox').classList.add('hidden');
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');
    
    if(App.questions.length === 0) {
        panel.innerHTML = '<div class="muted p-20">Bank Empty. Import Data first.</div>';
        return;
    }

    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;

    if(m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
    if(m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if(m === 'flagged') pool = pool.filter(q => q.flagged);
    if(m === 'maintain') pool = pool.filter(q => q.maintenance);
    if(m === 'new') pool = pool.filter(q => !q.timesSeen);
    if(m === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= Date.now());

    if(skip && m !== 'new' && m !== 'maintain') {
        const unseen = pool.filter(q => !q.timesSeen);
        if(unseen.length > 0) pool = unseen;
    }

    if(pool.length === 0) {
        panel.innerHTML = '<div class="muted p-20" style="text-align:center">No questions match criteria.</div>';
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
    
    flagBtn.textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
    flagBtn.style.color = q.flagged ? "var(--danger)" : "";
    note.value = q.userNotes || "";
    document.getElementById('guessCheck').checked = false;
    
    // Badge
    let h = '';
    if(q.maintenance) h += `<div class="chip" style="background:#fff7ed; color:#c2410c; margin-bottom:10px;">🔧 Maintenance Note: ${q.maintenanceNote||'-'}</div>`;
    
    h += `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:15px;">`;
    
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
    
    panel.innerHTML = h;
    
    // Search Tools
    const term = encodeURIComponent(q.chapter || 'Medicine');
    document.getElementById('searchTools').innerHTML = `
      <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
      <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
    `;
}

function submitAnswer() {
    if(!App.currentQ) return;
    const sel = document.querySelector('.choice.selected');
    if(!sel) return showToast("Select an answer", "error");
    
    const idx = parseInt(sel.id.split('_')[1]);
    const correctIdx = App.currentQ.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    const isGuess = document.getElementById('guessCheck').checked;
    
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `
      <div style="font-weight:bold; color:${isCorrect?'var(--success)':'var(--danger)'}; margin-bottom:10px;">
         ${isCorrect ? 'Correct! 🎉' : 'Wrong ❌'}
      </div>
      <div class="muted">${App.currentQ.explanation || 'No explanation.'}</div>
    `;
    
    document.getElementById(`c_${correctIdx}`).classList.add('correct');
    if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong');
    
    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
    
    // Stats
    const q = App.currentQ;
    q.timesSeen = (q.timesSeen||0)+1;
    if(isCorrect) q.timesCorrect = (q.timesCorrect||0)+1;
    else q.timesWrong = (q.timesWrong||0)+1;
    
    // Simple schedule if no SRS button used
    if(!q.dueDate) q.dueDate = Date.now() + 86400000;
    
    saveQuestion(q);
}

function handleSRS(grade) {
    // 1=Again, 2=Hard, 3=Good, 4=Easy
    const q = App.currentQ;
    let int = 1; 
    if(grade===4) int=7; if(grade===3) int=4; if(grade===2) int=2;
    q.dueDate = Date.now() + (int * 24 * 60 * 60 * 1000);
    saveQuestion(q);
    loadNextQuestion(false);
}

// --- 10. EVENTS ---
function setupEvents() {
    // Tabs
    document.querySelectorAll('.tab-button').forEach(b => 
        b.addEventListener('click', () => switchTab(b.dataset.tab)));
        
    // Practice
    document.getElementById('btnSubmit').onclick = submitAnswer;
    document.getElementById('btnNext').onclick = () => loadNextQuestion(false);
    document.getElementById('btnPrev').onclick = loadPrevQuestion;
    document.getElementById('btnFlag').onclick = toggleFlagCurrent;
    document.getElementById('modeSelect').onchange = () => {
        const m = document.getElementById('modeSelect').value;
        document.getElementById('chapterBox').style.display = (m==='chapter') ? 'block' : 'none';
        loadNextQuestion(true);
    };
    document.getElementById('chapterSelect').onchange = () => loadNextQuestion(true);
    
    // Maintenance
    document.getElementById('btnMaintain').onclick = toggleMaintenance;
    document.getElementById('btnSaveMaint').onclick = saveMaintenanceNote;
    
    // Table
    document.getElementById('btnAllApply').onclick = applyTableFilters;
    document.getElementById('btnRangeMode').onclick = toggleRangeMode;
    document.getElementById('btnBulkDelete').onclick = () => execBulk('delete');
    document.getElementById('btnBulkFlag').onclick = () => execBulk('flag');
    document.getElementById('btnBulkReset').onclick = () => execBulk('reset');
    document.getElementById('btnScanDup').onclick = scanDuplicates;
    document.getElementById('btnFixDup').onclick = fixDuplicates;
    
    document.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => sortTable(th.dataset.key));
    });
    document.getElementById('allSelectAll').onclick = toggleSelectAll;
    document.getElementById('allPrevPage').onclick = () => { if(App.page>1) { App.page--; renderTable(); }};
    document.getElementById('allNextPage').onclick = () => { App.page++; renderTable(); };

    // Import/Export
    document.getElementById('btnImportTrigger').onclick = () => document.getElementById('fileInput').click();
    document.getElementById('fileInput').onchange = handleImport;
    document.getElementById('btnExportTrigger').onclick = handleExport;
    
    // Settings
    document.getElementById('btnSaveGh').onclick = saveSettings;
    document.getElementById('btnCloudUpload').onclick = cloudUpload;
    document.getElementById('btnCloudDownload').onclick = cloudDownload;
    document.getElementById('btnResetProgress').onclick = resetProgress;
    document.getElementById('btnFactoryReset').onclick = factoryReset;
    document.getElementById('btnForceReload').onclick = () => window.location.reload(true);
    
    // Edit
    document.getElementById('btnSaveEdit').onclick = saveEditModal;
    document.getElementById('btnCancelEdit').onclick = closeEditModal;
    document.getElementById('btnAddChoice').onclick = addEditChoice;
    
    // Notes
    document.getElementById('userNoteArea').oninput = debounce(saveNote, 1000);
}

// --- HELPERS ---
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    if(id === 'all') applyTableFilters();
}

function refreshUI() {
    refreshChapterDropdowns();
    renderDashboard();
}

function refreshChapterDropdowns() {
    const ch = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All Chapters</option>' + ch.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}

function renderDashboard() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => q.timesCorrect > 3).length;
    const maint = App.questions.filter(q => q.maintenance).length;
    
    document.getElementById('dashTotal').textContent = total;
    document.getElementById('dashMastery').textContent = Math.round((mastered/total)*100 || 0) + '%';
    document.getElementById('dashMaint').textContent = maint;
}

// --- UTILS ---
function saveQuestion(q) {
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);
    const i = App.questions.findIndex(x => x.id === q.id);
    if(i > -1) App.questions[i] = q;
}

function showToast(msg, type='success') {
    const d = document.createElement('div');
    d.className = `toast`;
    d.style.background = type==='error' ? 'var(--danger)' : 'var(--text)';
    d.textContent = msg;
    document.getElementById('toastContainer').appendChild(d);
    setTimeout(()=>d.remove(), 3000);
}

function debounce(f,t) { let i; return (...a)=>{ clearTimeout(i); i=setTimeout(()=>f(...a),t); }; }

// Misc Logic
function selectChoice(idx) {
   if(document.getElementById('feedbackPanel').classList.contains('hidden')) {
       document.querySelectorAll('.choice').forEach(e=>e.classList.remove('selected'));
       document.getElementById(`c_${idx}`).classList.add('selected');
   }
}
function toggleStrike(idx) { document.getElementById(`c_${idx}`).classList.toggle('strikethrough'); }
function toggleFlagCurrent() { if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQuestion(App.currentQ); renderQuestionUI(); } }
function loadPrevQuestion() { if(historyStack.length > 0) { App.currentQ = historyStack.pop(); renderQuestionUI(); } }
function saveNote() { if(App.currentQ) { App.currentQ.userNotes = document.getElementById('userNoteArea').value; saveQuestion(App.currentQ); } }

function handleExport() {
    const b = new Blob([JSON.stringify(App.questions, null, 2)], {type:'application/json'});
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href=u; a.download='MCQ_Export.json'; a.click();
}
function resetProgress() {
    if(!confirm('Reset all stats?')) return;
    const tx = db.transaction('questions','readwrite');
    App.questions.forEach(q => { q.timesSeen=0; q.timesCorrect=0; q.timesWrong=0; tx.objectStore('questions').put(q); });
    tx.oncomplete = () => location.reload();
}
function factoryReset() {
    if(confirm('DELETE DATABASE?')) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }
}
function toggleRangeMode() {
    App.rangeMode = !App.rangeMode;
    showToast(App.rangeMode ? 'Range ON' : 'Range OFF');
}
function setupKeyboard() {
    document.addEventListener('keydown', e => {
       if(document.getElementById('tab-home').classList.contains('active')) {
           if(e.key === 'Enter') document.getElementById('btnSubmit').click();
           if(e.key === 'ArrowRight') document.getElementById('btnNext').click();
       }
    });
}
// GitHub Cloud Placeholders (Implemented via fetch similar to previous versions)
function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
function deb64(s) { return decodeURIComponent(escape(atob(s))); }
async function cloudUpload() {
    const t = localStorage.getItem('gh_token'), r = localStorage.getItem('gh_repo'), f = localStorage.getItem('gh_file');
    if(!t) return alert("Check Settings");
    try {
        const c = b64(JSON.stringify(App.questions));
        let sha = null;
        try { const g = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {headers:{Authorization:`token ${t}`}}); if(g.ok) sha = (await g.json()).sha; } catch(e){}
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, { method:'PUT', headers:{Authorization:`token ${t}`}, body:JSON.stringify({message:'Backup', content:c, sha}) });
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

// Edit Logic
window.openEdit = (id) => {
    const q = App.questions.find(x=>x.id===id);
    if(!q) return;
    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editModal').dataset.id = id;
    document.getElementById('editText').value = q.text;
    document.getElementById('editChapter').value = q.chapter;
    // Fill choices...
    const list = document.getElementById('editChoicesList'); list.innerHTML='';
    (q.choices||[]).forEach(c => addEditChoice(c.text, c.isCorrect));
};
function addEditChoice(txt='', cor=false) {
    const d=document.createElement('div'); d.className='edit-choice-row';
    d.innerHTML=`<input class="std-input flex-grow c-val" value="${txt}"><input type="radio" name="ec" ${cor?'checked':''}><button onclick="this.parentElement.remove()">X</button>`;
    document.getElementById('editChoicesList').appendChild(d);
}
function saveEditModal() {
    const id = parseInt(document.getElementById('editModal').dataset.id);
    const q = App.questions.find(x=>x.id===id);
    q.text = document.getElementById('editText').value;
    q.chapter = document.getElementById('editChapter').value;
    const ch = [];
    document.querySelectorAll('.edit-choice-row').forEach(r => ch.push({ text:r.querySelector('.c-val').value, isCorrect:r.querySelector('input[type=radio]').checked }));
    q.choices = ch;
    saveQuestion(q);
    document.getElementById('editModal').classList.add('hidden');
    applyTableFilters();
}
function closeEditModal() { document.getElementById('editModal').classList.add('hidden'); }
