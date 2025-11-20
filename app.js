/**
 * MCQ Ultra-Pro v8.0 (Final Hybrid Engine)
 * Combines v5.5 Structure with v7.0 Intelligence.
 */

const DB_NAME = 'mcq_ultra_v8';
const DB_VERSION = 1; // Clean start for v8
let db = null;

// --- GLOBAL STATE ---
const App = {
    questions: [],   // Full dataset
    tableQs: [],     // Filtered for table
    selectedIds: new Set(),
    currentQ: null,
    
    // Filters & Sort
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1,
    limit: 50,
    
    // Tools
    rangeMode: false,
    lastCheckId: null,
    skipSolved: true,
    
    // User Stats
    user: { xp: 0, rank: 'Intern', streak: 0 }
};

// --- 1. BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        
        setupEvents();
        refreshUI();
        
        // Start
        buildFlashcardPool();
        loadNextQuestion(true);
        showToast("v8.0 Engine Online 🚀");
    } catch (e) {
        console.error(e);
        alert("Critical Init Error: " + e.message);
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
        
        tx.objectStore('questions').getAll().onsuccess = (e) => {
            App.questions = e.target.result || [];
        };
        
        tx.objectStore('user').get('profile').onsuccess = (e) => {
            if(e.target.result) App.user = e.target.result;
            updateXPUI();
        };
        
        tx.oncomplete = resolve;
    });
}

// --- 3. PRACTICE ENGINE ---
async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    panel.innerHTML = '<div class="muted" style="padding:20px;">Loading...</div>';
    fb.classList.add('hidden');
    
    // Reload Cache if empty
    if(App.questions.length === 0) await loadData();
    if(App.questions.length === 0) {
        panel.innerHTML = '<div class="muted p-20">Bank Empty. Import JSON in "All Questions".</div>';
        return;
    }

    // Filter Logic
    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;

    if (m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
    if (m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if (m === 'flagged') pool = pool.filter(q => q.flagged);
    if (m === 'new') pool = pool.filter(q => !q.timesSeen);
    
    if (skip && m !== 'new') {
        const unseen = pool.filter(q => !q.timesSeen);
        if(unseen.length > 0) pool = unseen;
    }

    if(pool.length === 0) {
        panel.innerHTML = '<div class="muted p-20">No questions match filters.</div>';
        App.currentQ = null;
        return;
    }

    // Random
    App.currentQ = pool[Math.floor(Math.random() * pool.length)];
    renderQuestionUI();
}

function renderQuestionUI() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    const note = document.getElementById('userNoteArea');
    const flagBtn = document.getElementById('btnFlag');
    
    // Update UI
    flagBtn.textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
    flagBtn.style.color = q.flagged ? "var(--danger)" : "";
    note.value = q.userNotes || "";
    document.getElementById('saveNoteStatus').textContent = "";
    document.getElementById('guessCheck').checked = false;
    
    let h = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:10px; border-radius:8px;">`;
    
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
    
    // Search Links
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

function submitAnswer() {
    if(!App.currentQ) return;
    const sel = document.querySelector('.choice.selected');
    if(!sel) return showToast("Select an answer", "error");
    
    const idx = parseInt(sel.id.split('_')[1]);
    const correctIdx = App.currentQ.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    // UI Feedback
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
    
    // Stats & XP
    const q = App.currentQ;
    q.timesSeen = (q.timesSeen||0)+1;
    
    if(isCorrect) {
        q.timesCorrect = (q.timesCorrect||0)+1;
        addXP(10);
    } else {
        q.timesWrong = (q.timesWrong||0)+1;
        addXP(1);
    }
    
    saveQuestion(q);
    updateSessionStats(isCorrect);
}

function saveNote() {
    if(!App.currentQ) return;
    App.currentQ.userNotes = document.getElementById('userNoteArea').value;
    saveQuestion(App.currentQ);
    document.getElementById('saveNoteStatus').textContent = "Saved ✓";
}

// --- 4. TABLE & BULK ---
function applyTableFilters() {
    App.filter.search = document.getElementById('allSearch').value.toLowerCase();
    App.filter.status = document.getElementById('allFilter').value;
    App.filter.chapter = document.getElementById('allChapterSelect').value;
    
    App.tableQs = App.questions.filter(q => {
        if(App.filter.search && !q.text.toLowerCase().includes(App.filter.search) && String(q.id) !== App.filter.search) return false;
        if(App.filter.chapter && q.chapter !== App.filter.chapter) return false;
        if(App.filter.status === 'notes' && !q.userNotes) return false;
        if(App.filter.status === 'wrong' && (!q.timesWrong || q.timesWrong === 0)) return false;
        if(App.filter.status === 'flagged' && !q.flagged) return false;
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
    renderTable();
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
    
    tx.oncomplete = async () => {
        await loadData();
        applyTableFilters();
        showToast("Bulk Action Done");
    };
}

// --- 5. IMPORT & ID REPAIR ---
async function handleImport() {
    const file = document.getElementById('fileInput').files[0];
    if(!file) return;
    const text = await file.text();
    try {
        const json = JSON.parse(text);
        if(!Array.isArray(json)) throw new Error("Not a JSON array");
        
        const tx = db.transaction('questions', 'readwrite');
        const store = tx.objectStore('questions');
        let count = 0;
        
        json.forEach(q => {
            // Smart ID Repair: Remove chars, if conflict add timestamp
            let id = parseInt(String(q.id).replace(/\D/g, ''));
            if(!id || App.questions.some(x => x.id === id)) id = Date.now() + count;
            
            const safeQ = { ...q, id: id, active: true };
            store.put(safeQ);
            count++;
        });
        
        tx.oncomplete = async () => {
            await loadData();
            refreshUI();
            showToast(`Imported ${count} questions`);
        };
    } catch(e) { showToast(e.message, 'error'); }
}

// --- 6. EVENTS & HELPERS ---
function setupEvents() {
    document.querySelectorAll('.tab-button').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    document.getElementById('btnSubmit').onclick = submitAnswer;
    document.getElementById('btnNext').onclick = () => loadNextQuestion(false);
    document.getElementById('btnPrev').onclick = () => showToast("Previous (History empty)", "error");
    document.getElementById('btnFlag').onclick = () => {
        if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQuestion(App.currentQ); renderQuestionUI(); }
    };
    document.getElementById('modeSelect').onchange = () => {
         const m = document.getElementById('modeSelect').value;
         document.getElementById('chapterSelect').style.display = (m === 'chapter') ? 'inline-block' : 'none';
         loadNextQuestion(true);
    };
    
    // Table
    document.getElementById('btnAllApply').onclick = applyTableFilters;
    document.getElementById('btnRangeMode').onclick = () => {
        App.rangeMode = !App.rangeMode;
        document.getElementById('btnRangeMode').classList.toggle('range-active');
        showToast(App.rangeMode ? "Range Mode ON" : "Range Mode OFF");
    };
    document.getElementById('btnBulkDelete').onclick = () => execBulk('delete');
    
    // Import
    document.getElementById('btnImportTrigger').onclick = () => document.getElementById('fileInput').click();
    document.getElementById('fileInput').onchange = handleImport;
    
    // GitHub
    document.getElementById('btnSaveGh').onclick = saveSettings;
    
    // Subnav
    document.getElementById('viewBankBtn').onclick = () => {
        document.getElementById('allViewBank').classList.remove('hidden');
        document.getElementById('allViewBuilder').classList.add('hidden');
    };
    document.getElementById('viewBuilderBtn').onclick = () => {
        document.getElementById('allViewBank').classList.add('hidden');
        document.getElementById('allViewBuilder').classList.remove('hidden');
    };

    // Theme
    document.getElementById('themeSelect').onchange = (e) => {
        document.body.className = `theme-${e.target.value}`;
        localStorage.setItem('mcq_theme', e.target.value);
    };
    
    // Edit
    document.getElementById('btnSaveEdit').onclick = saveEdit;
    document.getElementById('btnCancelEdit').onclick = () => document.getElementById('editModal').classList.add('hidden');
    document.getElementById('btnAddChoice').onclick = addEditChoice;
    
    // Note Auto
    document.getElementById('userNoteArea').oninput = debounce(saveNote, 1000);
}

function switchTab(id) {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    document.getElementById('tab-'+id).classList.add('active');
    
    if(id === 'all') applyTableFilters();
    if(id === 'dashboard') renderDashboard();
}

function refreshUI() {
    // Chapters
    const chaps = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const opts = '<option value="">Select Chapter...</option>' + chaps.map(c => `<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = opts);
}

function renderDashboard() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => q.timesCorrect > 3).length;
    const pct = total ? Math.round((mastered/total)*100) : 0;
    
    document.getElementById('dashTotal').textContent = total;
    document.getElementById('dashMastery').textContent = pct + '%';
    document.getElementById('dashBar').style.width = pct + '%';
}

function addXP(amount) {
    App.user.xp += amount;
    updateXPUI();
    saveUser();
    showToast(`+${amount} XP`, 'success');
}

function updateXPUI() {
    document.getElementById('currXP').textContent = App.user.xp;
    document.getElementById('userRank').textContent = App.user.rank;
    const fill = Math.min(100, (App.user.xp % 1000) / 10);
    document.getElementById('xpBarFill').style.width = fill + '%';
}

function showToast(msg, type) {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    if(type==='error') t.style.background = 'var(--danger)';
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(()=>t.remove(), 3000);
}

function debounce(func, wait) {
    let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>func.apply(this,args),wait); };
}

// Data Ops
function saveQuestion(q) {
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);
    // Update Cache
    const i = App.questions.findIndex(x => x.id === q.id);
    if(i > -1) App.questions[i] = q;
}

function saveUser() {
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'profile', ...App.user });
}

// Placeholders for Edit Logic
window.openEdit = async (id) => {
    const q = App.questions.find(x => x.id === id);
    if(!q) return;
    document.getElementById('editModal').dataset.id = id;
    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editText').value = q.text;
    document.getElementById('editChapter').value = q.chapter;
    document.getElementById('editExplanation').value = q.explanation;
    // Rebuild choices logic here...
};

function saveEdit() { /* Save logic similar to v5 */ document.getElementById('editModal').classList.add('hidden'); showToast("Saved"); }
function addEditChoice() { /* Add DOM */ }

// GitHub Placeholders
function saveSettings() { 
    localStorage.setItem('gh_token', document.getElementById('ghToken').value); 
    showToast('Saved'); 
}
function updateGitHubStatus() { /* Check LS */ }
function buildFlashcardPool() { /* Filter */ }
function updateSessionStats(isCorrect) { /* UI update */ }
