/**
 * MCQ Ultra-Pro v10.2 (Fully Connected System)
 * - Reactive State: Actions in one tab immediately reflect in others.
 * - Centralized Saving: No more data desync.
 */

const DB_NAME = 'mcq_ultra_v10';
const DB_VERSION = 1;
let db = null;

// --- CENTRAL STATE (The Single Source of Truth) ---
const App = {
    questions: [],       // Master List
    map: new Map(),      // Fast Lookup (ID -> Question)
    
    // Session State
    currentQ: null,
    historyStack: [],
    
    // UI State
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    pagination: { page: 1, limit: 50 },
    
    // Tools
    rangeMode: false,
    lastCheckId: null,
    selectedIds: new Set()
};

// --- 1. BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData(); // Loads DB into App.questions
        
        setupEvents();
        
        // Initial UI Sync
        refreshChapterDropdowns();
        updateDashboardUI();
        buildFlashcardPool();
        
        // Check Cloud
        const cfg = JSON.parse(localStorage.getItem('mcq_gh_config') || '{}');
        if(cfg.token) document.getElementById('syncStatus').textContent = "☁️ Linked";

        // Start Practice
        loadNextQuestion(true);
        
        // Theme
        if(localStorage.getItem('mcq_theme') === 'dark') {
            document.body.classList.add('dark');
            document.getElementById('themeSelect').value = 'dark';
        }

        console.log("System v10.2 Online: All modules connected.");
    } catch (e) {
        console.error(e);
        alert("Startup Error: " + e.message);
    }
});

// --- 2. DATABASE & SYNC ---
function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            if (!d.objectStoreNames.contains('questions')) d.createObjectStore('questions', { keyPath: 'id' });
            if (!d.objectStoreNames.contains('snapshots')) d.createObjectStore('snapshots', { keyPath: 'id', autoIncrement: true });
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
            // Map for O(1) access
            App.map.clear();
            App.questions.forEach(q => App.map.set(q.id, q));
            resolve();
        };
    });
}

// The Master Save Function (Updates Memory + DB + UI)
function saveQuestionChange(q) {
    // 1. Update Memory
    App.map.set(q.id, q);
    const idx = App.questions.findIndex(x => x.id === q.id);
    if(idx > -1) App.questions[idx] = q;
    else App.questions.push(q); // It's new

    // 2. Update Database
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);

    // 3. Update Global UI Counters (The Connection)
    updateDashboardUI(); 
}

// --- 3. PRACTICE ENGINE ---
function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    panel.innerHTML = '<div class="muted p-20">Loading...</div>';
    fb.classList.add('hidden');

    if (reset) App.historyStack = [];
    else if (App.currentQ && App.historyStack[App.historyStack.length - 1] !== App.currentQ.id) {
        App.historyStack.push(App.currentQ.id);
    }

    // Get Filtered Pool
    let pool = getFilteredPool('practice');

    if (pool.length === 0) {
        panel.innerHTML = '<div class="muted p-20">No questions match current filters. Try changing Source.</div>';
        App.currentQ = null;
        return;
    }

    // Random Select
    const rand = Math.floor(Math.random() * pool.length);
    App.currentQ = pool[rand];
    renderQuestionUI();
}

function getFilteredPool(context) {
    // Context: 'practice', 'library', 'flashcards'
    let qs = App.questions.filter(q => q.active !== false);
    
    // Read controls based on context
    let mode, chap, skipSolved = false;

    if (context === 'practice') {
        mode = document.getElementById('modeSelect').value;
        chap = document.getElementById('chapterSelect').value;
        skipSolved = document.getElementById('prefSkipSolved').checked;
    }

    // Filters
    if (mode === 'chapter' && chap) qs = qs.filter(q => q.chapter === chap);
    if (mode === 'wrong') qs = qs.filter(q => q.timesWrong > 0);
    if (mode === 'flagged') qs = qs.filter(q => q.flagged);
    if (mode === 'new') qs = qs.filter(q => !q.timesSeen);
    if (mode === 'due') {
         // Simple SRS logic: Wrong > Correct OR New
         qs = qs.filter(q => q.timesWrong >= q.timesCorrect || !q.timesSeen);
    }

    // Skip Solved Logic
    if (skipSolved && mode !== 'new' && mode !== 'wrong') {
        const unseen = qs.filter(q => !q.timesSeen);
        if (unseen.length > 0) qs = unseen; 
    }
    
    return qs;
}

function renderQuestionUI() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    
    // Update inputs
    document.getElementById('userNoteArea').value = q.userNotes || '';
    updateFlagBtnUI(q);

    // Render Text/Image
    let h = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; border-radius:8px; margin-bottom:10px;">`;
    
    // Render Choices
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
    
    // Update Search Links
    const term = encodeURIComponent(q.chapter || 'Medicine');
    document.getElementById('searchTools').innerHTML = `
      <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
      <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
    `;
}

function selectChoice(idx) {
    document.querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
    document.getElementById(`c_${idx}`).classList.add('selected');
}

function toggleStrike(idx) {
    document.getElementById(`c_${idx}`).classList.toggle('strikethrough');
}

function toggleFlagCurrent() {
    if (!App.currentQ) return;
    App.currentQ.flagged = !App.currentQ.flagged;
    saveQuestionChange(App.currentQ); // This updates Library & Dashboard instantly
    updateFlagBtnUI(App.currentQ);
    showToast(App.currentQ.flagged ? "Flagged" : "Unflagged");
}

function updateFlagBtnUI(q) {
    const btn = document.getElementById('btnFlag');
    if (q.flagged) {
        btn.textContent = "Flagged 🚩";
        btn.style.color = "var(--danger)";
    } else {
        btn.textContent = "Flag ⚐";
        btn.style.color = "";
    }
}

function submitAnswer() {
    if(!App.currentQ) return;
    const sel = document.querySelector('.choice.selected');
    if(!sel) return showToast("Select Answer", "error");
    
    const idx = parseInt(sel.id.split('_')[1]);
    const correct = App.currentQ.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correct);
    const isGuess = document.getElementById('guessCheck').checked;
    
    // Update Object
    App.currentQ.timesSeen = (App.currentQ.timesSeen || 0) + 1;
    if (isCorrect) {
        App.currentQ.timesCorrect = (App.currentQ.timesCorrect || 0) + 1;
    } else {
        App.currentQ.timesWrong = (App.currentQ.timesWrong || 0) + 1;
    }
    
    // Save immediately to connect everything
    saveQuestionChange(App.currentQ);

    // UI Feedback
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `
      <div style="font-weight:bold; color:${isCorrect?'var(--success)':'var(--danger)'}; margin-bottom:10px;">
         ${isCorrect ? 'Correct! 🎉' : 'Wrong ❌'}
      </div>
      <div class="muted">${App.currentQ.explanation || 'No explanation.'}</div>
    `;
    
    document.getElementById(`c_${correct}`).classList.add('correct');
    if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong');
    
    updateSessionStats(isCorrect);
}

function updateSessionStats(isCorrect) {
    const statBox = document.getElementById('sessionStats');
    // Parse current
    let txt = statBox.textContent;
    let c = parseInt(txt.split('Correct: ')[1]) || 0;
    let w = parseInt(txt.split('Wrong: ')[1]) || 0;
    if(isCorrect) c++; else w++;
    statBox.innerHTML = `Correct: <b style="color:green">${c}</b> | Wrong: <b style="color:red">${w}</b>`;
}

function saveNote() {
    if(!App.currentQ) return;
    App.currentQ.userNotes = document.getElementById('userNoteArea').value;
    saveQuestionChange(App.currentQ); // Connects to Library filter
    document.getElementById('saveNoteStatus').textContent = "Saved ✓";
}

function loadPrevQuestion() {
    if(App.historyStack.length === 0) return showToast("Start of Session");
    const prevId = App.historyStack.pop();
    App.currentQ = App.map.get(prevId);
    renderQuestionUI();
}

// --- 4. LIBRARY & TABLE (The Data Center) ---
function applyTableFilters() {
    // Get values
    const search = document.getElementById('allSearch').value.toLowerCase();
    const status = document.getElementById('allFilter').value;
    const chap = document.getElementById('allChapterSelect').value;
    
    // Filter Main Array
    App.tableQs = App.questions.filter(q => {
        // Search
        if (search && !q.text.toLowerCase().includes(search) && String(q.id) !== search && !q.chapter.toLowerCase().includes(search)) return false;
        // Chapter
        if (chap && q.chapter !== chap) return false;
        // Status
        if (status === 'flagged' && !q.flagged) return false;
        if (status === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
        if (status === 'notes' && (!q.userNotes || !q.userNotes.trim())) return false;
        
        return true;
    });
    
    App.pagination.page = 1;
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('allTableBody');
    tbody.innerHTML = '';
    
    // Paging
    const start = (App.pagination.page - 1) * App.pagination.limit;
    const data = App.tableQs.slice(start, start + App.pagination.limit);
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px;">No Data Found</td></tr>';
    }

    data.forEach(q => {
        const tr = document.createElement('tr');
        const isSel = App.selectedIds.has(q.id);
        
        tr.innerHTML = `
          <td><input type="checkbox" class="row-cb" ${isSel?'checked':''}></td>
          <td>${q.id}</td>
          <td>${q.text.substring(0, 50)}... ${q.userNotes ? '📝' : ''}</td>
          <td><span class="chip">${q.chapter || '-'}</span></td>
          <td style="color:${q.timesWrong > 0 ? 'red' : '#ccc'}">${q.timesWrong || 0}</td>
          <td><button class="pill-btn small" onclick="openEdit(${q.id})">✏️</button></td>
        `;
        
        // Checkbox Event
        tr.querySelector('.row-cb').onclick = (e) => handleRowCheck(e, q.id);
        tbody.appendChild(tr);
    });
    
    document.getElementById('allPageInfo').textContent = `Page ${App.pagination.page}`;
}

function handleRowCheck(e, id) {
    if (App.rangeMode && App.lastCheckId !== null && e.target.checked) {
        // Range Select Logic
        const allIds = App.tableQs.map(q => q.id);
        const idx1 = allIds.indexOf(App.lastCheckId);
        const idx2 = allIds.indexOf(id);
        
        if (idx1 > -1 && idx2 > -1) {
            const min = Math.min(idx1, idx2);
            const max = Math.max(idx1, idx2);
            for(let i=min; i<=max; i++) App.selectedIds.add(allIds[i]);
        }
    } else {
        // Normal Select
        if(e.target.checked) App.selectedIds.add(id);
        else App.selectedIds.delete(id);
    }
    
    App.lastCheckId = id;
    // Don't re-render whole table (performance), just update UI count? 
    // Actually, for range select to visually update, we need to re-render checkboxes or loop DOM.
    // For safety, let's re-render.
    renderTable();
}

// --- 5. IMPORT / EXPORT ---
async function handleImport(inputId) {
    const file = document.getElementById(inputId).files[0];
    if(!file) return showToast("No file", "error");
    
    await createSnapshot("Pre-Import");
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(!Array.isArray(json)) throw new Error("Invalid JSON");
            
            let count = 0;
            // Find Max ID
            let maxId = 0;
            App.questions.forEach(q => { if(q.id > maxId) maxId = q.id; });
            
            const tx = db.transaction('questions', 'readwrite');
            const store = tx.objectStore('questions');
            
            json.forEach(q => {
                // Fix ID
                let id = parseInt(String(q.id).replace(/\D/g, ''));
                if(!id || App.map.has(id)) { maxId++; id = maxId; }
                q.id = id;
                
                store.put(q);
                count++;
            });
            
            tx.oncomplete = async () => {
                await loadData(); // Reload memory
                refreshChapterDropdowns();
                updateDashboardUI();
                applyTableFilters(); // Refresh Table
                showToast(`Imported ${count} Items`);
            };
        } catch(err) { alert(err.message); }
    };
    reader.readAsText(file);
}

// --- 6. CLOUD ---
async function cloudUpload() {
    if (App.questions.length === 0) return alert("Safety Lock: Local DB is empty.");
    const cfg = JSON.parse(localStorage.getItem('mcq_gh_config') || '{}');
    if(!cfg.token) return showToast("Configure Settings First", "error");
    
    showToast("Uploading...");
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(App.questions))));
    const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    
    try {
        // Get SHA
        let sha = null;
        try {
            const check = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
            if(check.ok) sha = (await check.json()).sha;
        } catch(e){}

        const res = await fetch(url, {
            method: 'PUT',
            headers: { Authorization: `token ${cfg.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Backup " + new Date().toISOString(), content, sha })
        });

        if(!res.ok) throw new Error(await res.text());
        showToast("Upload Successful ✅");
    } catch(e) { alert(e.message); }
}

async function cloudDownload() {
    const cfg = JSON.parse(localStorage.getItem('mcq_gh_config') || '{}');
    if(!cfg.token) return showToast("Configure Settings First", "error");
    
    showToast("Downloading...");
    try {
        const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
        const res = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
        if(!res.ok) throw new Error("File not found");
        
        const json = await res.json();
        const content = decodeURIComponent(escape(atob(json.content.replace(/\s/g, ''))));
        const data = JSON.parse(content);
        
        await createSnapshot("Pre-Cloud-Merge");
        
        const tx = db.transaction('questions', 'readwrite');
        data.forEach(q => tx.objectStore('questions').put(q));
        
        tx.oncomplete = async () => {
            await loadData();
            refreshChapterDropdowns();
            updateDashboardUI();
            applyTableFilters();
            showToast("Downloaded & Merged ✅");
        };
    } catch(e) { alert(e.message); }
}

// --- 7. SNAPSHOTS (Time Machine) ---
async function createSnapshot(name) {
    const tx = db.transaction('snapshots', 'readwrite');
    tx.objectStore('snapshots').add({
        label: name,
        date: new Date().toISOString(),
        data: App.questions
    });
    // Keep last 10
    tx.objectStore('snapshots').getAllKeys().onsuccess = (e) => {
        const keys = e.target.result;
        if(keys.length > 10) tx.objectStore('snapshots').delete(keys[0]);
    };
}

// --- EVENTS & HELPERS ---
function setupEvents() {
    // Nav
    document.querySelectorAll('.tab-button').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    document.getElementById('btnHeaderBackup').onclick = () => switchTab('backup');
    
    // Practice
    document.getElementById('btnSubmit').onclick = submitAnswer;
    document.getElementById('btnNext').onclick = () => loadNextQuestion(false);
    document.getElementById('btnPrev').onclick = loadPrevQuestion;
    document.getElementById('btnFlag').onclick = toggleFlagCurrent;
    document.getElementById('modeSelect').onchange = () => {
        const m = document.getElementById('modeSelect').value;
        document.getElementById('chapterSelect').style.display = (m === 'chapter') ? 'inline-block' : 'none';
        loadNextQuestion(true);
    };
    document.getElementById('chapterSelect').onchange = () => loadNextQuestion(true);
    
    // Library
    document.getElementById('btnAllApply').onclick = applyTableFilters;
    document.getElementById('btnLibImport').onclick = () => document.getElementById('libFileInput').click();
    document.getElementById('libFileInput').onchange = () => handleImport('libFileInput');
    document.getElementById('btnLibExport').onclick = handleExport;
    document.getElementById('btnRangeMode').onclick = () => {
        App.rangeMode = !App.rangeMode;
        document.getElementById('btnRangeMode').classList.toggle('range-active');
        showToast(App.rangeMode ? "Range ON" : "Range OFF");
    };
    
    // Backup
    document.getElementById('btnLocalImport').onclick = () => document.getElementById('backupFileInput').click();
    document.getElementById('backupFileInput').onchange = () => handleImport('backupFileInput');
    document.getElementById('btnCloudUpload').onclick = cloudUpload;
    document.getElementById('btnCloudDownload').onclick = cloudDownload;
    
    // Settings
    document.getElementById('btnSaveGh').onclick = () => {
        localStorage.setItem('mcq_gh_config', JSON.stringify({
            token: document.getElementById('ghToken').value,
            repo: document.getElementById('ghRepo').value,
            file: document.getElementById('ghFile').value
        }));
        showToast("Settings Saved");
        document.getElementById('syncStatus').textContent = "☁️ Configured";
    };
    document.getElementById('btnForceUpdate').onclick = () => window.location.reload(true);
    
    // Notes
    document.getElementById('userNoteArea').oninput = debounce(saveNote, 1000);

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if(document.getElementById('tab-home').classList.contains('active')) {
            if(e.key === 'ArrowRight') loadNextQuestion(false);
            if(e.key === 'Enter') submitAnswer();
        }
    });
}

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-'+id).classList.add('active');
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    if(id==='library') applyTableFilters(); // Force refresh
    if(id==='dashboard') updateDashboardUI();
}

// Helpers
function refreshChapterDropdowns() {
    const chaps = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const html = '<option value="">Select Chapter...</option>' + chaps.map(c => `<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = html);
}

function updateDashboardUI() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => q.timesCorrect > 3).length;
    const wrong = App.questions.filter(q => q.timesWrong > 0).length;
    
    document.getElementById('dTotal').textContent = total;
    document.getElementById('dMastery').textContent = total ? Math.round((mastered/total)*100) + '%' : '0%';
    // Also update the mini stats in sidebars if they exist
}

function showToast(msg, type='info') {
    const t = document.createElement('div'); t.className='toast'; t.textContent=msg;
    if(type==='error') t.style.background='var(--danger)';
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(()=>t.remove(),3000);
}

function handleExport() {
    const blob = new Blob([JSON.stringify(App.questions, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'mcq_export.json';
    a.click();
}

function debounce(f,w) { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>f(...a),w); }; }
function buildFlashcardPool() {} // FC placeholder
window.openEdit = function(id) { alert("Edit ID: " + id); }; // Placeholder for edit
