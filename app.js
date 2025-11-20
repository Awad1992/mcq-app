/**
 * MCQ Ultra-Pro v9.1 (Safety & Evolution)
 */

const DB_NAME = 'mcq_ultra_v9';
const DB_VERSION = 1;
let db = null;

const App = {
    questions: [],
    selectedIds: new Set(),
    currentQ: null,
    user: { xp: 0, rank: 'Intern', streak: 0 },
    filter: { mode: 'due', search: '' },
    pagination: { page: 1, limit: 50 },
    rangeMode: false,
    lastCheckId: null
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadCache();
        setupEvents();
        refreshUI();
        buildFlashcardPool();
        loadNextQuestion(true);
        updateGitHubStatus();
        showToast("v9.1 Ready 🛡️");
    } catch (e) {
        console.error(e);
        alert("Error: " + e.message);
    }
});

function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            if (!d.objectStoreNames.contains('questions')) d.createObjectStore('questions', { keyPath: 'id' });
            if (!d.objectStoreNames.contains('snapshots')) d.createObjectStore('snapshots', { keyPath: 'id', autoIncrement: true });
            if (!d.objectStoreNames.contains('user')) d.createObjectStore('user', { keyPath: 'key' });
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = (e) => reject(e.target.error);
    });
}

async function loadCache() {
    return new Promise(resolve => {
        const tx = db.transaction(['questions', 'user'], 'readonly');
        tx.objectStore('questions').getAll().onsuccess = (e) => App.questions = e.target.result || [];
        tx.objectStore('user').get('profile').onsuccess = (e) => {
            if(e.target.result) App.user = e.target.result;
            updateXPUI();
        };
        tx.oncomplete = resolve;
    });
}

// --- TIME MACHINE ---
async function createSnapshot(label) {
    const snap = {
        date: new Date().toISOString(),
        label: label || 'Auto-Save',
        count: App.questions.length,
        data: App.questions
    };
    const tx = db.transaction('snapshots', 'readwrite');
    tx.objectStore('snapshots').add(snap);
    tx.objectStore('snapshots').getAllKeys().onsuccess = (e) => {
        const keys = e.target.result;
        if(keys.length > 10) tx.objectStore('snapshots').delete(keys[0]);
    };
    showToast(`Snapshot Saved: ${label}`);
}

async function showTimeMachine() {
    const list = document.getElementById('snapshotList');
    list.innerHTML = 'Loading...';
    document.getElementById('modalTimeMachine').classList.remove('hidden');
    
    const tx = db.transaction('snapshots', 'readonly');
    tx.objectStore('snapshots').getAll().onsuccess = (e) => {
        list.innerHTML = '';
        const snaps = e.target.result.reverse();
        if(snaps.length === 0) list.innerHTML = '<div class="tiny muted">No snapshots found.</div>';
        
        snaps.forEach(s => {
            const date = new Date(s.date).toLocaleString();
            list.innerHTML += `
            <div class="snap-item">
               <div><strong>${s.label}</strong> <br> <span class="tiny muted">${date} • ${s.count} Qs</span></div>
               <button class="pill-btn small" onclick="restoreSnapshot(${s.id})">Restore</button>
            </div>`;
        });
    };
}

async function restoreSnapshot(id) {
    if(!confirm("Restore this snapshot? Current data will be overwritten.")) return;
    const tx = db.transaction(['snapshots', 'questions'], 'readwrite');
    tx.objectStore('snapshots').get(id).onsuccess = (e) => {
        const snap = e.target.result;
        const qStore = tx.objectStore('questions');
        qStore.clear();
        snap.data.forEach(q => qStore.put(q));
    };
    tx.oncomplete = async () => {
        await loadCache();
        refreshUI();
        closeModal('modalTimeMachine');
        showToast("Restored Successfully!");
    };
}

// --- IMPORT & AUTO-FIX ---
async function handleSmartImport() {
    const file = document.getElementById('fileInput').files[0];
    if(!file) return;
    
    await createSnapshot("Pre-Import");
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(!Array.isArray(json)) throw new Error("Not a JSON Array");
            
            const tx = db.transaction('questions', 'readwrite');
            const store = tx.objectStore('questions');
            let count = 0;
            
            let maxId = 0;
            App.questions.forEach(q => { if(q.id > maxId) maxId = q.id; });

            json.forEach(raw => {
                let q = { ...raw };
                let cleanId = parseInt(String(q.id).replace(/\D/g, ''));
                if(!cleanId || App.questions.some(x=>x.id===cleanId)) {
                    maxId++; cleanId = maxId;
                }
                q.id = cleanId;
                if(!q.text && q.question) q.text = q.question;
                if(!q.explanation && q.rationale) q.explanation = q.rationale;
                if(!q.choices && q.answers) q.choices = q.answers;
                if(!q.choices) q.choices = [];
                if(q.timesSeen === undefined) q.timesSeen = 0;
                
                store.put(q);
                count++;
            });
            
            tx.oncomplete = async () => {
                await loadCache();
                refreshUI();
                showToast(`Imported ${count} questions`);
            };
        } catch(err) { alert(err.message); }
    };
    reader.readAsText(file);
}

async function safeCloudUpload() {
    if(App.questions.length === 0) {
        alert("⛔ SAFETY LOCK: Local DB empty. Upload blocked to protect cloud data.");
        return;
    }
    const cfg = JSON.parse(localStorage.getItem('mcq_gh_config') || '{}');
    if(!cfg.token) return showToast("Settings missing", "error");
    
    showToast("Uploading...", "info");
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(App.questions))));
    const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.file}`;
    
    let sha = null;
    try {
        const c = await fetch(url, { headers: { Authorization: `token ${cfg.token}` } });
        if(c.ok) sha = (await c.json()).sha;
    } catch(e) {}

    await fetch(url, {
        method: 'PUT',
        headers: { Authorization: `token ${cfg.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "Backup " + new Date().toISOString(), content, sha })
    });
    showToast("Upload Success ✅");
}

// --- ENGINE ---
async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    panel.innerHTML = '<div class="muted p-20">Loading...</div>';
    fb.classList.add('hidden');
    
    let pool = App.questions.filter(q => q.active !== false);
    const m = document.getElementById('modeSelect').value;
    const c = document.getElementById('chapterSelect').value;
    
    if(m==='chapter' && c) pool = pool.filter(q => q.chapter === c);
    if(m==='wrong') pool = pool.filter(q => q.timesWrong > 0);
    if(m==='new') pool = pool.filter(q => !q.timesSeen);
    
    if(pool.length === 0) {
        panel.innerHTML = '<div class="muted p-20">No questions found.</div>';
        App.currentQ = null;
        return;
    }
    
    App.currentQ = pool[Math.floor(Math.random() * pool.length)];
    renderQuestionUI();
}

function renderQuestionUI() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    document.getElementById('userNoteArea').value = q.userNotes || '';
    document.getElementById('btnFlag').textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
    
    let h = `<div class="q-text" id="qTextContent"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; border-radius:8px; margin-bottom:10px;">`;
    
    h += `<div class="choices-list">`;
    (q.choices||[]).forEach((c, i) => {
        h += `<div class="choice-container"><div class="choice" id="c_${i}" onclick="selectChoice(${i})"><strong>${String.fromCharCode(65+i)}.</strong> ${c.text}</div><button class="btn-strike" onclick="toggleStrike(${i})">✕</button></div>`;
    });
    h += `</div>`;
    panel.innerHTML = h;
}

function selectChoice(idx) {
    document.querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
    document.getElementById(`c_${idx}`).classList.add('selected');
}

function submitAnswer() {
    if(!App.currentQ) return;
    const sel = document.querySelector('.choice.selected');
    if(!sel) return showToast("Select Answer", "error");
    
    const idx = parseInt(sel.id.split('_')[1]);
    const correct = App.currentQ.choices.findIndex(c=>c.isCorrect);
    const isCorrect = (idx === correct);
    
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `<div style="font-weight:bold; color:${isCorrect?'green':'red'}">${isCorrect?'Correct!':'Wrong'}</div><div class="muted">${App.currentQ.explanation||''}</div>`;
    
    document.getElementById(`c_${correct}`).classList.add('correct');
    if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong');
    
    const q = App.currentQ;
    q.timesSeen = (q.timesSeen||0)+1;
    if(isCorrect) { q.timesCorrect=(q.timesCorrect||0)+1; addXP(10); }
    else { q.timesWrong=(q.timesWrong||0)+1; addXP(1); }
    
    const tx = db.transaction('questions','readwrite');
    tx.objectStore('questions').put(q);
}

function addXP(amount) {
    App.user.xp += amount;
    updateXPUI();
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'profile', ...App.user });
}

function updateXPUI() {
    document.getElementById('currXP').textContent = App.user.xp;
    document.getElementById('xpBarFill').style.width = Math.min(100, (App.user.xp % 1000) / 10) + '%';
}

// --- EVENTS ---
function setupEvents() {
    document.querySelectorAll('.tab-button').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    document.getElementById('btnSubmit').onclick = submitAnswer;
    document.getElementById('btnNext').onclick = () => loadNextQuestion(false);
    document.getElementById('btnLocalImport').onclick = () => document.getElementById('fileInput').click();
    document.getElementById('fileInput').onchange = handleSmartImport;
    document.getElementById('btnCloudUpload').onclick = safeCloudUpload;
    document.getElementById('btnTimeMachine').onclick = showTimeMachine;
    
    document.getElementById('btnHighlight').onclick = () => document.getElementById('highlighterTools').classList.toggle('hidden');
    document.getElementById('btnSaveGh').onclick = () => {
        localStorage.setItem('mcq_gh_config', JSON.stringify({
            token: document.getElementById('ghToken').value,
            repo: document.getElementById('ghRepo').value,
            file: 'mcq_backup.json'
        }));
        showToast('Saved');
    };
}

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-'+id).classList.add('active');
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    if(id==='library') renderLibraryTable();
}

// --- HIGHLIGHTER ---
function setHighlight(color) {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.className = `highlight-${color}`;
    try { range.surroundContents(span); } catch(e) {}
}

function clearHighlights() {
    document.getElementById('qTextContent').innerHTML = App.currentQ.text;
}

// Placeholders
function refreshUI() { refreshChapterDropdowns(); updateXPUI(); }
function refreshChapterDropdowns() { /* ... */ }
function renderLibraryTable() { /* ... */ }
function buildFlashcardPool() { /* ... */ }
function updateGitHubStatus() { /* ... */ }
function showToast(msg, type='info') {
    const t = document.createElement('div'); t.className='toast'; t.textContent=msg;
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(()=>t.remove(), 3000);
}
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function toggleStrike(i) { document.getElementById(`c_${i}`).classList.toggle('strikethrough'); }
function debounce(f,w) { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>f(...a),w); }; }
