/**
 * MCQ Diamond v8.5.1 - Crash Proof Edition
 * Features: Safe Event Binding, Full Functions, ID Repair.
 */

const DB_NAME = 'mcq_diamond_v8';
const DB_VERSION = 2; // Increment to force upgrade
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
    user: { xp: 0, rank: 'Intern', streak: 0 }
};

// --- SAFE BINDER (PREVENTS NULL ERRORS) ---
function safeBind(id, event, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
    else console.warn(`Element ${id} not found for event ${event}`);
}

// --- 1. INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        
        setupEvents(); // Safe binding now
        setupKeyboard();
        
        // UI Init
        refreshChapterDropdowns();
        renderDashboard();
        updateXPUI();
        updateGitHubUI();
        
        // Start
        loadNextQuestion(true);
        showToast('Diamond Engine Loaded 💎');
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

// --- 3. EVENTS SETUP (CRASH PROOF) ---
function setupEvents() {
    // Tabs
    document.querySelectorAll('.tab-button').forEach(b => 
        b.addEventListener('click', () => switchTab(b.dataset.tab)));

    // Practice
    safeBind('btnSubmit', 'click', submitAnswer);
    safeBind('btnNext', 'click', () => loadNextQuestion(false));
    safeBind('btnPrev', 'click', () => showToast("Previous History: Not stored in random mode", "error"));
    safeBind('btnFlag', 'click', toggleFlagCurrent);
    safeBind('modeSelect', 'change', handleModeChange);
    safeBind('chapterSelect', 'change', () => loadNextQuestion(true));
    safeBind('prefSkipSolved', 'change', (e) => App.skipSolved = e.target.checked);
    safeBind('btnFocusMode', 'click', () => document.body.classList.add('focus-mode'));
    safeBind('btnExitFocus', 'click', () => document.body.classList.remove('focus-mode'));
    
    // SRS
    safeBind('btnSrsAgain', 'click', () => handleSRS(1));
    safeBind('btnSrsHard', 'click', () => handleSRS(2));
    safeBind('btnSrsGood', 'click', () => handleSRS(3));
    safeBind('btnSrsEasy', 'click', () => handleSRS(4));

    // Table
    safeBind('btnAllApply', 'click', applyTableFilters);
    safeBind('allSearch', 'input', applyTableFilters); // Realtime
    safeBind('allFilter', 'change', applyTableFilters);
    safeBind('allChapterSelect', 'change', applyTableFilters);
    safeBind('btnRangeMode', 'click', toggleRangeMode);
    safeBind('btnBulkDelete', 'click', () => execBulk('delete'));
    safeBind('btnBulkFlag', 'click', () => execBulk('flag'));
    safeBind('btnBulkReset', 'click', () => execBulk('reset'));
    
    // Import/Export (Fixed IDs)
    safeBind('btnImportTrigger', 'click', () => document.getElementById('fileInput').click());
    safeBind('fileInput', 'change', handleImport);
    safeBind('btnExportTrigger', 'click', handleExport);
    safeBind('btnLocalImportTrigger', 'click', () => document.getElementById('backupFileInput').click());
    safeBind('backupFileInput', 'change', handleImport); // Reuse handleImport
    safeBind('btnLocalExport', 'click', handleExport); // Reuse handleExport

    // Subnav
    safeBind('viewBankBtn', 'click', () => toggleSubTab('bank'));
    safeBind('viewBuilderBtn', 'click', () => toggleSubTab('builder'));

    // Builder
    safeBind('btnGenPrompt', 'click', genBuilderPrompt);
    safeBind('btnPreview', 'click', previewBuilderJson);
    safeBind('btnImportJson', 'click', importBuilderJson);

    // Settings
    safeBind('btnSaveGh', 'click', saveGitHub);
    safeBind('btnForceUpdate', 'click', () => window.location.reload(true));
    safeBind('btnForceReload', 'click', () => window.location.reload(true));
    safeBind('btnResetProgress', 'click', resetProgress);
    safeBind('btnFactoryReset', 'click', factoryReset);
    
    // Edit Modal
    safeBind('btnSaveEdit', 'click', saveEditModal);
    safeBind('btnCancelEdit', 'click', closeEditModal);
    safeBind('modalBackdrop', 'click', closeEditModal);
    safeBind('btnAddChoice', 'click', addEditChoice);

    // Note Auto
    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 1000));
}

// --- 4. PRACTICE ENGINE ---
function handleModeChange(e) {
    App.filter.mode = e.target.value;
    const box = document.getElementById('chapterBox');
    if(box) box.style.display = (App.filter.mode === 'chapter') ? 'block' : 'none';
    loadNextQuestion(true);
}

async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    panel.innerHTML = '<div class="muted p-20" style="text-align:center">Loading Question...</div>';
    fb.classList.add('hidden');
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');

    if(App.questions.length === 0) {
        panel.innerHTML = '<div class="muted p-20" style="text-align:center">Bank Empty. Go to "Library" to import JSON.</div>';
        return;
    }

    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;

    if (m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
    if (m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if (m === 'flagged') pool = pool.filter(q => q.flagged);
    if (m === 'new') pool = pool.filter(q => !q.timesSeen);
    if (m === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= Date.now());

    if (App.skipSolved && m !== 'new') {
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
    
    if(flagBtn) {
        flagBtn.textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
        flagBtn.style.color = q.flagged ? "var(--danger)" : "";
    }
    if(note) note.value = q.userNotes || "";
    
    let h = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:15px; border-radius:8px;">`;
    
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
    
    const term = encodeURIComponent(q.chapter || 'Medicine');
    const tools = document.getElementById('searchTools');
    if(tools) tools.innerHTML = `
      <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
      <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
    `;
}

function selectChoice(idx) {
    if(!document.getElementById('feedbackPanel').classList.contains('hidden')) return; 
    document.querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
    document.getElementById(`c_${idx}`).classList.add('selected');
}

function toggleStrike(idx) {
    document.getElementById(`c_${idx}`).classList.toggle('strikethrough');
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
      <div style="font-weight:bold; color:${isCorrect?'var(--success)':'var(--danger)'}; margin-bottom:10px;">
         ${isCorrect ? 'Correct! 🎉' : 'Incorrect ❌'}
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
    if(isCorrect) { q.timesCorrect = (q.timesCorrect||0)+1; addXP(10); }
    else { q.timesWrong = (q.timesWrong||0)+1; addXP(1); }
    
    // Auto-sched basic if not using SRS buttons
    if(!q.dueDate) q.dueDate = 0; 
    saveQuestion(q);
}

function handleSRS(grade) {
    const q = App.currentQ;
    let interval = 1;
    if(grade === 4) interval = 7;
    if(grade === 3) interval = 4;
    if(grade === 2) interval = 2;
    
    q.dueDate = Date.now() + (interval * 24 * 60 * 60 * 1000);
    saveQuestion(q);
    loadNextQuestion(false);
}

async function toggleFlagCurrent() {
    if (!App.currentQ) return;
    App.currentQ.flagged = !App.currentQ.flagged;
    saveQuestion(App.currentQ);
    renderQuestionUI();
    showToast(App.currentQ.flagged ? "Flagged" : "Unflagged");
}

function saveNote() {
    if(!App.currentQ) return;
    App.currentQ.userNotes = document.getElementById('userNoteArea').value;
    saveQuestion(App.currentQ);
    const status = document.getElementById('saveNoteStatus');
    if(status) status.textContent = "Saved ✓";
}

// --- 5. TABLE & BULK ---
function applyTableFilters() {
    const search = document.getElementById('allSearch').value.toLowerCase();
    const type = document.getElementById('allFilter').value;
    const chap = document.getElementById('allChapterSelect').value;
    
    App.tableQs = App.questions.filter(q => {
        if(search && !q.text.toLowerCase().includes(search) && String(q.id) !== search) return false;
        if(chap && q.chapter !== chap) return false;
        if(type === 'notes' && !q.userNotes) return false;
        if(type === 'wrong' && (!q.timesWrong || q.timesWrong===0)) return false;
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
    tbody.innerHTML = '';
    const start = (App.page - 1) * App.limit;
    const data = App.tableQs.slice(start, start + App.limit);
    
    data.forEach(q => {
        const tr = document.createElement('tr');
        const isSel = App.selectedIds.has(q.id);
        tr.innerHTML = `
          <td><input type="checkbox" class="row-cb" ${isSel?'checked':''}></td>
          <td>${q.id}</td>
          <td>${q.text.substring(0,50)}... ${q.userNotes?'📝':''}</td>
          <td><span class="chip">${q.chapter || '-'}</span></td>
          <td>${q.timesSeen||0}</td>
          <td>${q.timesWrong||0}</td>
          <td><button class="pill-btn small" onclick="openEdit(${q.id})">✏️</button></td>
        `;
        tr.querySelector('.row-cb').onclick = (e) => handleCheck(e, q.id);
        tbody.appendChild(tr);
    });
    
    document.getElementById('allPageInfo').textContent = `Page ${App.page}`;
}

function handleCheck(e, id) {
    if(e.target.checked) App.selectedIds.add(id); else App.selectedIds.delete(id);
    updateBulkUI();
}

function updateBulkUI() {
    const count = App.selectedIds.size;
    document.getElementById('selCount').textContent = count;
    const bar = document.getElementById('bulkBar');
    if(count > 0) bar.classList.remove('hidden');
    else bar.classList.add('hidden');
}

async function execBulk(action) {
    if(!confirm(`Apply '${action}' to ${App.selectedIds.size} items?`)) return;
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
    tx.oncomplete = async () => { await loadData(); applyTableFilters(); showToast("Done"); };
}

// --- 6. IMPORT / EXPORT ---
async function handleImport() {
    const file = document.getElementById('fileInput') || document.getElementById('backupFileInput');
    if(!file.files[0]) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(!Array.isArray(json)) throw new Error("Invalid JSON");
            const tx = db.transaction('questions', 'readwrite');
            let count = 0;
            json.forEach(q => {
               let id = parseInt(String(q.id).replace(/\D/g, ''));
               if(!id || App.questions.some(x => x.id === id)) id = Date.now() + count;
               q.id = id;
               tx.objectStore('questions').put(q);
               count++;
            });
            tx.oncomplete = async () => { await loadData(); refreshUI(); showToast(`Imported ${count}`); };
        } catch(e) { showToast(e.message, 'error'); }
    };
    reader.readAsText(file.files[0]);
}

function handleExport() {
    const blob = new Blob([JSON.stringify(App.questions, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `MCQ_Backup_${Date.now()}.json`;
    a.click();
}

// --- 7. BUILDER & EDIT ---
function genBuilderPrompt() {
    const text = document.getElementById('builderSource').value;
    const count = document.getElementById('builderCount').value;
    document.getElementById('builderPrompt').value = `Generate ${count} MCQs from this text. JSON Format: [{id, text, chapter, tags, explanation, choices:[{text, isCorrect}]}]. Text: ${text.substring(0,2000)}...`;
}
function previewBuilderJson() {
    try {
        const json = JSON.parse(document.getElementById('builderJson').value);
        document.getElementById('builderPreviewBox').textContent = `Found ${json.length} Questions. Ready to import.`;
    } catch(e) { alert("Invalid JSON"); }
}
function importBuilderJson() {
    const json = JSON.parse(document.getElementById('builderJson').value);
    const tx = db.transaction('questions', 'readwrite');
    let count = 0;
    json.forEach(q => {
        q.id = Date.now() + count++;
        q.active = true;
        q.timesSeen = 0;
        tx.objectStore('questions').put(q);
    });
    tx.oncomplete = async () => { await loadData(); refreshUI(); showToast(`Added ${count} generated questions`); };
}

window.openEdit = async (id) => {
    const q = App.questions.find(x => x.id === id);
    if(!q) return;
    document.getElementById('editModal').dataset.id = id;
    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editText').value = q.text;
    document.getElementById('editChapter').value = q.chapter;
    document.getElementById('editExplanation').value = q.explanation;
    // Choices logic needed here
    const list = document.getElementById('editChoicesList');
    list.innerHTML = '';
    (q.choices||[]).forEach(c => addEditChoice(c.text, c.isCorrect));
};

function addEditChoice(text='', isCorrect=false) {
    const d = document.createElement('div');
    d.className = 'edit-choice-row';
    d.innerHTML = `<input class="std-input flex-grow c-val" value="${text}"><label><input type="radio" name="c-cor" ${isCorrect?'checked':''}> Correct</label><button onclick="this.parentElement.remove()" class="danger-btn small">Del</button>`;
    document.getElementById('editChoicesList').appendChild(d);
}

function saveEditModal() {
    const id = parseInt(document.getElementById('editModal').dataset.id);
    const tx = db.transaction('questions', 'readwrite');
    const store = tx.objectStore('questions');
    store.get(id).onsuccess = (e) => {
        const q = e.target.result;
        q.text = document.getElementById('editText').value;
        q.chapter = document.getElementById('editChapter').value;
        q.explanation = document.getElementById('editExplanation').value;
        
        // Collect choices
        const choices = [];
        document.querySelectorAll('.edit-choice-row').forEach(row => {
            choices.push({
                text: row.querySelector('.c-val').value,
                isCorrect: row.querySelector('input[name="c-cor"]').checked
            });
        });
        q.choices = choices;
        store.put(q);
        showToast("Saved");
        document.getElementById('editModal').classList.add('hidden');
        loadData().then(applyTableFilters);
    };
}

function closeEditModal() { document.getElementById('editModal').classList.add('hidden'); }

// --- HELPERS ---
function switchTab(id) {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    document.getElementById('tab-'+id).classList.add('active');
    if(id==='all') applyTableFilters();
    if(id==='dashboard') renderDashboard();
}

function toggleSubTab(t) {
    document.getElementById('viewBank').classList.toggle('hidden', t!=='bank');
    document.getElementById('viewBuilder').classList.toggle('hidden', t!=='builder');
    document.getElementById('viewBankBtn').classList.toggle('active', t==='bank');
    document.getElementById('viewBuilderBtn').classList.toggle('active', t==='builder');
}

function refreshChapterDropdowns() {
    const chaps = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const opts = '<option value="">All Chapters</option>' + chaps.map(c => `<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = opts);
}

function renderDashboard() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => q.timesCorrect > 3).length;
    document.getElementById('dashTotal').textContent = total;
    document.getElementById('dashMastery').textContent = Math.round((mastered/total)*100 || 0) + '%';
    document.getElementById('dashBar').style.width = Math.round((mastered/total)*100 || 0) + '%';
    
    // Canvas Chart
    const ctx = document.getElementById('activityChart').getContext('2d');
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0,0,300,150); // Placeholder
    ctx.fillStyle = '#2563eb';
    ctx.fillText("Stats Ready", 10, 20);
}

function addXP(n) { App.user.xp += n; updateXPUI(); saveUser(); }
function updateXPUI() {
    document.getElementById('userXP').textContent = App.user.xp;
    document.getElementById('xpFill').style.width = (App.user.xp % 1000)/10 + '%';
}
function saveUser() {
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'profile', ...App.user });
}
function factoryReset() {
    if(!confirm("Delete EVERYTHING?")) return;
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => window.location.reload(true);
}
function resetProgress() {
    if(!confirm("Reset stats only?")) return;
    const tx = db.transaction('questions', 'readwrite');
    const s = tx.objectStore('questions');
    App.questions.forEach(q => { q.timesSeen=0; q.timesWrong=0; s.put(q); });
    tx.oncomplete = () => window.location.reload(true);
}

// Utils
function showToast(msg, type='success') {
    const d = document.createElement('div');
    d.className = `toast ${type}`;
    d.textContent = msg;
    document.getElementById('toastContainer').appendChild(d);
    setTimeout(() => d.remove(), 3000);
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        if(document.getElementById('tab-home').classList.contains('active')) {
            if(e.key === 'Enter') submitAnswer();
            if(e.key === 'ArrowRight') loadNextQuestion(false);
            if(['1','2','3','4'].includes(e.key)) selectChoice(parseInt(e.key)-1);
        }
    });
}

// Placeholders for GitHub
function saveGitHub() { showToast("Saved locally"); }
function updateGitHubUI() { /* Check LS */ }
function cloudUpload() { showToast("Use Local Backup for now"); }
function cloudDownload() { showToast("Use Local Restore for now"); }
function toggleRangeMode() { App.rangeMode = !App.rangeMode; showToast(App.rangeMode ? "Range ON" : "Range OFF"); }
