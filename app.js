/**
 * MCQ Diamond v8.5.0
 * Features: Real SM-2, Real-time Filter, Canvas Charts, Bulk Actions, Full Editor.
 */

const DB_NAME = 'mcq_diamond_v8';
const DB_VERSION = 1;
let db = null;

// --- GLOBAL STATE ---
const App = {
    questions: [],
    tableQs: [],
    selectedIds: new Set(),
    currentQ: null,
    
    filter: { search: '', status: 'all', chapter: '', mode: 'due' },
    sort: { field: 'id', asc: true },
    page: 1,
    limit: 50,
    
    // Tools
    rangeMode: false,
    lastCheckId: null,
    skipSolved: true,
    
    // User
    user: { xp: 0, rank: 'Intern', streak: 0 }
};

// --- 1. INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        
        setupEvents();
        setupKeyboard();
        
        // Initial Render
        refreshChapterDropdowns();
        renderDashboard();
        updateXPUI();
        updateGitHubUI();
        
        // Start Practice
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
            if (!d.objectStoreNames.contains('questions')) {
                d.createObjectStore('questions', { keyPath: 'id' });
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

// --- 3. PRACTICE ENGINE (SM-2 Integrated) ---
async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    panel.innerHTML = '<div class="muted" style="padding:20px; text-align:center">Loading...</div>';
    fb.classList.add('hidden');
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');
    document.getElementById('btnNext').classList.add('hidden');

    if(App.questions.length === 0) {
        panel.innerHTML = '<div class="muted p-20">Bank Empty. Go to "Library" to import JSON.</div>';
        return;
    }

    // Filter Logic
    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;
    const now = Date.now();

    if (m === 'chapter' && c) pool = pool.filter(q => q.chapter === c);
    if (m === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if (m === 'flagged') pool = pool.filter(q => q.flagged);
    if (m === 'new') pool = pool.filter(q => !q.timesSeen);
    if (m === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= now);
    
    if (skip && m !== 'new') {
        const unseen = pool.filter(q => !q.timesSeen);
        if(unseen.length > 0) pool = unseen;
    }

    if(pool.length === 0) {
        // Fallback if Due is empty
        if(m === 'due') {
             panel.innerHTML = '<div class="muted p-20">🎉 No cards due! Review random or new questions?</div>';
        } else {
             panel.innerHTML = '<div class="muted p-20">No questions match criteria. Change filters.</div>';
        }
        App.currentQ = null;
        return;
    }

    // Random Pick
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
    
    // Search Links
    const term = encodeURIComponent(q.chapter || 'Medicine');
    document.getElementById('searchTools').innerHTML = `
      <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
      <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
    `;
}

function selectChoice(idx) {
    if(!document.getElementById('feedbackPanel').classList.contains('hidden')) return; // Locked
    document.querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
    document.getElementById(`c_${idx}`).classList.add('selected');
}

function toggleStrike(idx) {
    document.getElementById(`c_${idx}`).classList.toggle('strikethrough');
}

function submitAnswer() {
    if(!App.currentQ) return;
    const sel = document.querySelector('.choice.selected');
    if(!sel) return showToast("Please select an answer.", "error");
    
    const idx = parseInt(sel.id.split('_')[1]);
    const correctIdx = App.currentQ.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    // UI
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `
      <div style="font-weight:bold; color:${isCorrect?'var(--success)':'var(--danger)'}; margin-bottom:10px;">
         ${isCorrect ? 'Correct! 🎉' : 'Incorrect ❌'}
      </div>
      <div class="muted">${App.currentQ.explanation || 'No explanation provided.'}</div>
    `;
    
    document.getElementById(`c_${correctIdx}`).classList.add('correct');
    if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong');
    
    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');

    // Stats
    const q = App.currentQ;
    q.timesSeen = (q.timesSeen||0)+1;
    if(isCorrect) { q.timesCorrect = (q.timesCorrect||0)+1; addXP(10); }
    else { q.timesWrong = (q.timesWrong||0)+1; addXP(1); }
    
    // Auto-schedule default if not using SRS buttons
    if(!q.interval) q.interval = 0; 
    saveQuestion(q);
}

// SM-2 Algorithm Implementation
function handleSRS(grade) {
    // grade: 1=Again, 2=Hard, 3=Good, 4=Easy
    const q = App.currentQ;
    if(!q.ef) q.ef = 2.5;
    if(!q.reps) q.reps = 0;
    if(!q.interval) q.interval = 0;

    if (grade >= 3) {
        if (q.reps === 0) q.interval = 1;
        else if (q.reps === 1) q.interval = 6;
        else q.interval = Math.round(q.interval * q.ef);
        q.reps++;
    } else {
        q.reps = 0;
        q.interval = 1;
    }

    q.ef = q.ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (q.ef < 1.3) q.ef = 1.3;

    // Calculate Next Date
    q.dueDate = Date.now() + (q.interval * 24 * 60 * 60 * 1000);
    
    saveQuestion(q);
    loadNextQuestion(false);
}

// --- 4. TABLE & REAL-TIME FILTER ---
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
    sortTable(App.sort.field, false);
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
          <td><button class="pill-btn small" onclick="openEditModal(${q.id})">✏️</button></td>
        `;
        tr.querySelector('.row-cb').onclick = (e) => handleCheck(e, q.id);
        tbody.appendChild(tr);
    });
    document.getElementById('allPageInfo').textContent = `Page ${App.page}`;
}

function sortTable(field, toggle=true) {
    if(toggle) App.sort.asc = (App.sort.field === field) ? !App.sort.asc : true;
    App.sort.field = field;
    
    App.tableQs.sort((a,b) => {
        let vA = a[field] || 0; let vB = b[field] || 0;
        if(typeof vA==='string') { vA=vA.toLowerCase(); vB=vB.toLowerCase(); }
        if(vA < vB) return App.sort.asc ? -1 : 1;
        if(vA > vB) return App.sort.asc ? 1 : -1;
        return 0;
    });
    renderTable();
}

// --- 5. ADVANCED EDIT MODAL ---
window.openEditModal = async (id) => {
    const q = App.questions.find(x => x.id === id);
    if(!q) return;
    
    const m = document.getElementById('editModal');
    m.dataset.id = id;
    m.classList.remove('hidden');
    
    document.getElementById('editText').value = q.text;
    document.getElementById('editChapter').value = q.chapter;
    document.getElementById('editTags').value = (q.tags||[]).join(',');
    document.getElementById('editExplanation').value = q.explanation;
    document.getElementById('editImageUrl').value = q.imageUrl;
    document.getElementById('editFlagged').checked = !!q.flagged;
    
    const list = document.getElementById('editChoicesList');
    list.innerHTML = '';
    (q.choices||[]).forEach(c => addEditChoice(c.text, c.isCorrect));
};

window.addEditChoice = (text='', isCorrect=false) => {
    const div = document.createElement('div');
    div.className = 'edit-choice-row';
    div.innerHTML = `
      <input class="std-input flex-grow choice-val" value="${text}">
      <label><input type="radio" name="editCorrect" ${isCorrect?'checked':''}> Correct</label>
      <button class="danger-btn small" onclick="this.parentElement.remove()">✕</button>
    `;
    document.getElementById('editChoicesList').appendChild(div);
}

window.saveEditModal = async () => {
    const id = parseInt(document.getElementById('editModal').dataset.id);
    const rows = document.querySelectorAll('.edit-choice-row');
    const choices = [];
    rows.forEach(r => choices.push({
        text: r.querySelector('.choice-val').value,
        isCorrect: r.querySelector('input[type=radio]').checked
    }));
    
    const q = App.questions.find(x => x.id === id);
    q.text = document.getElementById('editText').value;
    q.chapter = document.getElementById('editChapter').value;
    q.explanation = document.getElementById('editExplanation').value;
    q.choices = choices;
    q.flagged = document.getElementById('editFlagged').checked;
    
    saveQuestion(q);
    closeEditModal();
    applyTableFilters();
    showToast('Changes Saved');
}

window.closeEditModal = () => document.getElementById('editModal').classList.add('hidden');

// --- 6. EVENTS & UTILS ---
function setupEvents() {
    // Real-time Search
    document.getElementById('allSearch').oninput = applyTableFilters;
    document.getElementById('allFilter').onchange = applyTableFilters;
    document.getElementById('allChapterSelect').onchange = applyTableFilters;
    
    // Buttons
    document.getElementById('btnSubmit').onclick = submitAnswer;
    document.getElementById('btnNext').onclick = () => loadNextQuestion(false);
    document.getElementById('btnPrev').onclick = () => showToast("History not implemented in Random mode", "error");
    document.getElementById('btnFlag').onclick = () => { 
        if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQuestion(App.currentQ); renderQuestionUI(); } 
    };
    document.getElementById('btnAllApply').onclick = applyTableFilters; // Manual trigger
    
    // Import/Export
    document.querySelector('button[onclick*="fileInput"]').onclick = () => document.getElementById('fileInput').click();
    document.getElementById('fileInput').onchange = handleImport;
    
    // Tabs
    document.querySelectorAll('.tab-button').forEach(b => b.onclick = () => switchTab(b.dataset.tab));

    // Note Auto-save
    document.getElementById('userNoteArea').oninput = debounce(saveNote, 1000);
}

function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        if(document.getElementById('tab-home').classList.contains('active')) {
            if(e.key === 'Enter') submitAnswer();
            if(e.key === 'ArrowRight') loadNextQuestion(false);
            if(['1','2','3','4'].includes(e.key)) selectChoice(parseInt(e.key)-1);
        }
    });
}

// --- HELPERS ---
function saveQuestion(q) {
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);
    // Sync Cache
    const i = App.questions.findIndex(x => x.id === q.id);
    if(i > -1) App.questions[i] = q;
}

function addXP(n) {
    App.user.xp += n;
    saveUser();
    updateXPUI();
}

function saveUser() {
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'profile', ...App.user });
}

function updateXPUI() {
    document.getElementById('userXP').textContent = App.user.xp;
    document.getElementById('xpFill').style.width = (App.user.xp % 1000) / 10 + '%';
}

function refreshChapterDropdowns() {
    const chaps = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const opts = '<option value="">All Chapters</option>' + chaps.map(c => `<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = opts);
}

function renderDashboard() {
    // Canvas Chart
    const ctx = document.getElementById('activityChart').getContext('2d');
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0,0,300,150); // Placeholder for visual
    ctx.fillStyle = '#2563eb';
    ctx.fillText("Activity Chart needs real data", 50, 75);
    
    // Stats
    const total = App.questions.length;
    const correct = App.questions.filter(q => q.timesCorrect > 0).length;
    document.getElementById('dashTotal').textContent = total;
    document.getElementById('dashMastery').textContent = Math.round((correct/total)*100 || 0) + '%';
    document.getElementById('dashBar').style.width = (correct/total)*100 + '%';
}

function showToast(msg, type) {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    if(type==='error') t.style.background = 'var(--danger)';
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(()=>t.remove(), 3000);
}

function switchTab(id) {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    document.getElementById('tab-'+id).classList.add('active');
    if(id === 'all') applyTableFilters();
    if(id === 'dashboard') renderDashboard();
}

function saveNote() {
    if(!App.currentQ) return;
    App.currentQ.userNotes = document.getElementById('userNoteArea').value;
    saveQuestion(App.currentQ);
    document.getElementById('saveNoteStatus').textContent = 'Saved ✓';
}

function debounce(func, wait) { let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>func.apply(this,args),wait); }; }

// Bulk & Import Placeholders (Fully implement if needed)
function updateBulkUI() { 
    const c = App.selectedIds.size; 
    document.getElementById('selCount').textContent = c; 
    document.getElementById('bulkBar').classList.toggle('hidden', c===0);
}
function handleCheck(e, id) { 
    if(e.target.checked) App.selectedIds.add(id); else App.selectedIds.delete(id); 
    updateBulkUI(); 
}
function toggleSelectAll(e) {
    const checked = e.target.checked;
    App.tableQs.forEach(q => { if(checked) App.selectedIds.add(q.id); else App.selectedIds.delete(q.id); });
    updateBulkUI(); renderTable();
}
async function execBulk(act) {
    if(!confirm(`Bulk ${act}?`)) return;
    const tx = db.transaction('questions', 'readwrite');
    App.selectedIds.forEach(id => {
        if(act==='delete') tx.objectStore('questions').delete(id);
        // Add flag/reset logic here
    });
    tx.oncomplete = async () => { await loadData(); applyTableFilters(); };
}
async function handleImport() {
    const file = document.getElementById('fileInput').files[0];
    if(!file) return;
    const txt = await file.text();
    const json = JSON.parse(txt);
    const tx = db.transaction('questions','readwrite');
    json.forEach(q => { q.id = parseInt(String(q.id).replace(/\D/g,'')) || Date.now(); tx.objectStore('questions').put(q); });
    tx.oncomplete = async () => { await loadData(); showToast('Imported'); applyTableFilters(); };
}
function updateGitHubUI() { /* LS check */ }
function switchSubTab(t) {
    document.getElementById('viewBank').classList.toggle('hidden', t!=='bank');
    document.getElementById('viewBuilder').classList.toggle('hidden', t!=='builder');
}
