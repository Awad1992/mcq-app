/**
 * MCQ Ultra-Pro v9.0.0 (Architect Edition)
 * Fixes: DB Version, GitHub Persistence, Smart Merge, Maintenance Mode, Duplicates.
 */

const DB_NAME = 'mcq_pro_v9';
const DB_VERSION = 10; // High version to force upgrade and fix init errors
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
    
    rangeMode: false,
    lastCheckId: null,
    skipSolved: true,
    
    user: { xp: 0, rank: 'Intern' }
};

// --- 1. INITIALIZATION (FIXED) ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        
        setupEvents(); // Safe bindings
        
        // Load Settings from LocalStorage Immediately
        loadSettingsToUI();
        
        // Initial Render
        refreshUI();
        loadNextQuestion(true);
        
        showToast('Architect Engine v9.0 Ready 🧬');
    } catch (e) {
        console.error(e);
        alert("Startup Error: " + e.message + "\nTry 'Force Reload' in settings.");
    }
});

// --- 2. DATABASE (VERSION 10) ---
function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        
        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            // Questions Store
            if (!d.objectStoreNames.contains('questions')) {
                const s = d.createObjectStore('questions', { keyPath: 'id' });
                s.createIndex('chapter', 'chapter', { unique: false });
            }
            // User Store
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

// --- 3. SETTINGS & GITHUB (PERSISTENCE FIX) ---
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
    
    showToast('Settings Saved & Persisted ✅');
    updateSyncStatus(t && r);
}

function updateSyncStatus(connected) {
    const el = document.getElementById('syncStatus');
    if(el) {
        el.textContent = connected ? "☁️ Cloud: Ready" : "☁️ Cloud: Offline";
        el.style.borderColor = connected ? "var(--success)" : "var(--border)";
    }
}

// --- 4. IMPORT (SMART AGGREGATION) ---
async function handleImport() {
    const file = document.getElementById('fileInput').files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if(!Array.isArray(json)) throw new Error("File must be a JSON array");
            
            const tx = db.transaction('questions', 'readwrite');
            const store = tx.objectStore('questions');
            let added = 0, updated = 0;
            
            // Find max ID to prevent conflict
            let maxId = 0;
            App.questions.forEach(q => maxId = Math.max(maxId, q.id));
            
            for (const q of json) {
                // ID Logic
                let id = parseInt(String(q.id).replace(/\D/g, ''));
                
                // Check existence
                const existing = App.questions.find(x => x.id === id);
                
                if (existing) {
                    // AGGREGATION LOGIC: Keep stats, update content
                    const merged = {
                        ...q,
                        id: id, // Ensure ID matches
                        timesSeen: existing.timesSeen,
                        timesCorrect: existing.timesCorrect,
                        timesWrong: existing.timesWrong,
                        userNotes: existing.userNotes || q.userNotes,
                        flagged: existing.flagged || q.flagged,
                        maintenance: existing.maintenance || q.maintenance,
                        maintenanceNote: existing.maintenanceNote || q.maintenanceNote
                    };
                    store.put(merged);
                    updated++;
                } else {
                    // New Question
                    if(!id || App.questions.some(x=>x.id===id)) { maxId++; id = maxId; }
                    const newQ = { 
                        ...q, 
                        id: id, 
                        createdAt: new Date().toISOString(),
                        timesSeen: 0, timesWrong: 0, 
                        maintenance: false 
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
            showToast("Import Failed: " + err.message, 'error');
        }
    };
    reader.readAsText(file);
}

// --- 5. DUPLICATE MANAGER ---
function scanDuplicates() {
    const map = new Map();
    const duplicates = [];
    
    App.questions.forEach(q => {
        const key = q.text.trim().toLowerCase().substring(0, 50); // First 50 chars signature
        if(map.has(key)) {
            duplicates.push(q); // This is a dup
        } else {
            map.set(key, q);
        }
    });
    
    const res = document.getElementById('dupResult');
    const btn = document.getElementById('btnFixDup');
    
    if(duplicates.length > 0) {
        res.textContent = `Found ${duplicates.length} duplicates!`;
        res.style.color = 'var(--danger)';
        btn.classList.remove('hidden');
        // Store dups for fixing
        App.duplicates = duplicates;
    } else {
        res.textContent = "No duplicates found.";
        res.style.color = 'var(--success)';
        btn.classList.add('hidden');
    }
}

async function fixDuplicates() {
    if(!App.duplicates || !confirm(`Remove ${App.duplicates.length} duplicates? We will keep the original version.`)) return;
    
    const tx = db.transaction('questions', 'readwrite');
    const store = tx.objectStore('questions');
    App.duplicates.forEach(q => store.delete(q.id));
    
    tx.oncomplete = async () => {
        await loadData();
        showToast("Duplicates Removed Cleanly ✨");
        document.getElementById('dupResult').textContent = "Clean.";
        document.getElementById('btnFixDup').classList.add('hidden');
    };
}

// --- 6. MAINTENANCE MODE ---
async function toggleMaintenance() {
    if(!App.currentQ) return;
    
    const box = document.getElementById('maintenanceBox');
    const btn = document.getElementById('btnMaintain');
    
    // Toggle UI
    box.classList.toggle('hidden');
    
    // Update Data if closing
    if(box.classList.contains('hidden')) {
        // Saving logic handled by save button
    } else {
        // Open
        document.getElementById('maintNote').value = App.currentQ.maintenanceNote || '';
        btn.classList.add('active-warning');
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

// --- 7. EXPORT (FULL DATA) ---
function handleExport() {
    const exportData = App.questions; // This includes ALL fields (notes, maintenance, stats)
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MCQ_Full_Export_${Date.now()}.json`;
    a.click();
}

// --- 8. PRACTICE ENGINE ---
async function loadNextQuestion(reset) {
    const panel = document.getElementById('questionPanel');
    const fb = document.getElementById('feedbackPanel');
    const maintBox = document.getElementById('maintenanceBox');
    
    panel.innerHTML = '<div class="muted p-20" style="text-align:center">Loading...</div>';
    fb.classList.add('hidden');
    if(maintBox) maintBox.classList.add('hidden');
    
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmit').classList.remove('hidden');

    if(App.questions.length === 0) {
        panel.innerHTML = '<div class="muted p-20" style="text-align:center">Bank Empty. Go to "Library" to import JSON.</div>';
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
    if (m === 'maintain') pool = pool.filter(q => q.maintenance); // Show Maintenance only
    if (m === 'new') pool = pool.filter(q => !q.timesSeen);
    if (m === 'due') pool = pool.filter(q => !q.dueDate || q.dueDate <= Date.now());
    
    if (skip && m !== 'new' && m !== 'maintain') {
        const unseen = pool.filter(q => !q.timesSeen);
        if(unseen.length > 0) pool = unseen;
    }

    if(pool.length === 0) {
        panel.innerHTML = '<div class="muted p-20" style="text-align:center">No questions found. Change filters.</div>';
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
    
    let h = `<div class="q-text"><strong>[#${q.id}]</strong> ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:15px; border-radius:8px;">`;
    
    // Show Maintenance Badge if active
    if(q.maintenance) h += `<div class="chip" style="background:#fff7ed; color:#c2410c; margin-bottom:10px;">🔧 Maintenance: ${q.maintenanceNote || 'No note'}</div>`;

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
    document.getElementById('searchTools').innerHTML = `
      <a href="https://google.com/search?q=${term}" target="_blank" class="pill-btn">Google</a>
      <a href="https://uptodate.com/contents/search?search=${term}" target="_blank" class="pill-btn">UpToDate</a>
    `;
}

// --- 9. EVENTS (SAFE BINDING) ---
function safeBind(id, event, fn) {
    const el = document.getElementById(id);
    if(el) el.addEventListener(event, fn);
}

function setupEvents() {
    // Nav
    document.querySelectorAll('.tab-button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    
    // Practice
    safeBind('btnSubmit', 'click', submitAnswer);
    safeBind('btnNext', 'click', () => loadNextQuestion(false));
    safeBind('btnPrev', 'click', () => showToast("History prev not active in shuffle", "error"));
    safeBind('btnFlag', 'click', toggleFlagCurrent);
    safeBind('btnMaintain', 'click', toggleMaintenance);
    safeBind('btnSaveMaint', 'click', saveMaintenanceNote);
    safeBind('modeSelect', 'change', () => {
        const m = document.getElementById('modeSelect').value;
        document.getElementById('chapterBox').style.display = (m==='chapter') ? 'block' : 'none';
        loadNextQuestion(true);
    });
    safeBind('chapterSelect', 'change', () => loadNextQuestion(true));
    
    // SRS
    safeBind('btnSrsAgain', 'click', () => handleSRS(1));
    safeBind('btnSrsHard', 'click', () => handleSRS(2));
    safeBind('btnSrsGood', 'click', () => handleSRS(3));
    safeBind('btnSrsEasy', 'click', () => handleSRS(4));

    // Library
    safeBind('btnScanDup', 'click', scanDuplicates);
    safeBind('btnFixDup', 'click', fixDuplicates);
    safeBind('btnImportTrigger', 'click', () => document.getElementById('fileInput').click());
    safeBind('fileInput', 'change', handleImport);
    safeBind('btnExportTrigger', 'click', handleExport);
    safeBind('btnAllApply', 'click', applyTableFilters);
    
    // Settings
    safeBind('btnSaveGh', 'click', saveSettings);
    safeBind('btnCloudDownload', 'click', cloudDownload);
    safeBind('btnCloudUpload', 'click', cloudUpload);
    safeBind('btnFactoryReset', 'click', () => { if(confirm("Delete DB?")) { indexedDB.deleteDatabase(DB_NAME); window.location.reload(true); }});
    safeBind('btnForceReload', 'click', () => window.location.reload(true));
    
    // Note Auto
    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 1000));
}

// --- HELPERS ---
function submitAnswer() {
    if(!App.currentQ) return;
    const sel = document.querySelector('.choice.selected');
    if(!sel) return showToast("Select an answer", "error");
    
    const idx = parseInt(sel.id.split('_')[1]);
    const correctIdx = App.currentQ.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `<div style="font-weight:bold; color:${isCorrect?'green':'red'}">${isCorrect?'Correct!':'Wrong'}</div><div class="muted">${App.currentQ.explanation}</div>`;
    
    document.getElementById(`c_${correctIdx}`).classList.add('correct');
    if(!isCorrect) document.getElementById(`c_${idx}`).classList.add('wrong');
    
    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
    
    // Stats
    const q = App.currentQ;
    q.timesSeen = (q.timesSeen||0)+1;
    if(isCorrect) q.timesCorrect = (q.timesCorrect||0)+1;
    else q.timesWrong = (q.timesWrong||0)+1;
    
    saveQuestion(q);
}

function handleSRS(grade) {
    const q = App.currentQ;
    let int = 1;
    if(grade===4) int=7; if(grade===3) int=4; if(grade===2) int=2;
    q.dueDate = Date.now() + (int*24*60*60*1000);
    saveQuestion(q);
    loadNextQuestion(false);
}

function toggleFlagCurrent() {
    if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQuestion(App.currentQ); renderQuestionUI(); }
}

function saveNote() {
    if(App.currentQ) { 
        App.currentQ.userNotes = document.getElementById('userNoteArea').value; 
        saveQuestion(App.currentQ); 
        document.getElementById('saveNoteStatus').textContent = "Saved"; 
    }
}

function selectChoice(idx) {
    if(!document.getElementById('feedbackPanel').classList.contains('hidden')) return;
    document.querySelectorAll('.choice').forEach(e => e.classList.remove('selected'));
    document.getElementById(`c_${idx}`).classList.add('selected');
}
function toggleStrike(idx) { document.getElementById(`c_${idx}`).classList.toggle('strikethrough'); }

// GitHub Placeholders (Fully Functional Logic)
function base64(str) { return btoa(unescape(encodeURIComponent(str))); }
function debase64(str) { return decodeURIComponent(escape(atob(str))); }

async function cloudDownload() {
    const t = localStorage.getItem('gh_token');
    const r = localStorage.getItem('gh_repo');
    const f = localStorage.getItem('gh_file');
    if(!t || !r) return alert("Check Settings");
    
    try {
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, { headers: { Authorization: `token ${t}` } });
        if(!res.ok) throw new Error(await res.text());
        const json = await res.json();
        const data = JSON.parse(debase64(json.content));
        
        // Merge
        const tx = db.transaction('questions', 'readwrite');
        data.forEach(q => tx.objectStore('questions').put(q));
        tx.oncomplete = () => { loadData(); showToast("Cloud Downloaded"); };
    } catch(e) { alert(e.message); }
}

async function cloudUpload() {
    const t = localStorage.getItem('gh_token');
    const r = localStorage.getItem('gh_repo');
    const f = localStorage.getItem('gh_file');
    if(!t || !r) return alert("Check Settings");

    try {
        const content = base64(JSON.stringify(App.questions));
        // Get SHA
        let sha = null;
        try {
            const check = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, { headers: { Authorization: `token ${t}` } });
            if(check.ok) sha = (await check.json()).sha;
        } catch(e){}
        
        const body = { message: "Backup "+Date.now(), content: content };
        if(sha) body.sha = sha;
        
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {
            method: 'PUT',
            headers: { Authorization: `token ${t}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if(!res.ok) throw new Error(await res.text());
        showToast("Uploaded!");
    } catch(e) { alert(e.message); }
}

// Basic Utils
function showToast(msg, type='success') {
    const d = document.createElement('div');
    d.className = `toast ${type}`;
    d.textContent = msg;
    document.getElementById('toastContainer').appendChild(d);
    setTimeout(()=>d.remove(), 3000);
}
function saveQuestion(q) {
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);
}
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    if(id==='all') applyTableFilters();
}
function refreshChapterDropdowns() {
    const ch = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All</option>' + ch.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}
function refreshUI() { refreshChapterDropdowns(); }
function debounce(f,t) { let timer; return (...args) => { clearTimeout(timer); timer=setTimeout(()=>f(...args),t); }; }
// Table & Builder logic placeholders needed for full functionality (add from v8 if needed)
function applyTableFilters() { /* ... */ } 
function execBulk() { /* ... */ }
