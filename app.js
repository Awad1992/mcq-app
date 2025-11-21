/**
 * MCQ Ultra-Pro v16.1 (Enhanced Issue + Import/Export + Reset/Backup)
 */

const DB_NAME = 'mcq_pro_v15';
const DB_VERSION = 26; 
let db = null;

const App = {
    questions: [], tableQs: [], selectedIds: new Set(), currentQ: null, 
    selectedChoice: null,
    filter: { search: '', status: 'all', chapter: '' },
    sort: { field: 'id', asc: true },
    page: 1, limit: 50, rangeMode: false, lastCheckId: null, skipSolved: true,
    history: [], duplicates: [], user: { xp: 0, streak: 0 },
    lastResetBackup: null, resetTimer: null,
    backupHistory: [],
    // session tracking for Practice tab
    sessionOrder: [],          // array of question IDs in first-seen order
    sessionIndexById: {},      // map: questionId -> index in sessionOrder
    currentSeqSlot: -1         // current index inside sessionOrder
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
function safeSetText(id, val) {
    const el = document.getElementById(id);
    if(el) el.textContent = val;
}
function safeSetVal(id, val) {
    const el = document.getElementById(id);
    if(el) el.value = val;
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

function nowTs() { return Date.now(); }

// --- 1. INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        db = await initDB();
        await loadData();
        normalizeQuestions();
        loadSettings();
        setupEvents();
        refreshUI();
        
        buildFlashcardPool();
        loadNextQuestion(true);
        
        safeSetText('dbStatus', "DB: Ready");
        checkCloud();
        showToast('System v16.1 Ready 💎');
        
        safeSetText('streakCount', App.user.streak || 0);
        safeSetText('userXP', App.user.xp || 0);
        loadBackupHistoryUI();
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
        const tx = db.transaction(['questions', 'user'], 'readonly');
        tx.objectStore('questions').getAll().onsuccess = (e) => App.questions = e.target.result || [];
        tx.objectStore('user').get('stats').onsuccess = (e) => { if(e.target.result) App.user = e.target.result; };
        tx.oncomplete = resolve;
    });
}

// normalize legacy fields -> new structure
function normalizeQuestions() {
    App.questions.forEach(q => {
        if(!q.status) {
            if(q.maintenance) q.status = 'maintenance';
            else if(q.error) q.status = 'error';
            else q.status = 'none';
        }
        if(!q.importedAt) {
            // if created before import tracking, mark with 0
            q.importedAt = q.importedAt || 0;
        }
        if(q.maintenanceNote && !q.issueNote) {
            q.issueNote = q.maintenanceNote;
        }
        if(Array.isArray(q.tags)) {
            q.tags = q.tags.join(', ');
        }
    });
}

// --- 3. PRACTICE ENGINE ---
function resetSessionState() {
    App.history = [];
    App.sessionOrder = [];
    App.sessionIndexById = {};
    App.currentSeqSlot = -1;
    const hist = document.getElementById('historyList');
    if(hist) hist.innerHTML = '';
    const stats = document.getElementById('sessionStats');
    if(stats) stats.textContent = '0 Seen • 0 Correct';
}

function registerSessionPosition(qId) {
    if(App.sessionIndexById[qId] === undefined) {
        App.sessionOrder.push(qId);
        App.sessionIndexById[qId] = App.sessionOrder.length - 1; // store zero-based index
    }
    App.currentSeqSlot = App.sessionIndexById[qId];
}

function getQuestionById(id) {
    return App.questions.find(x => x.id === id);
}

function computeSessionStats() {
    let seen = 0, correct = 0;
    App.sessionOrder.forEach(id => {
        const q = getQuestionById(id);
        if(!q) return;
        if(typeof q.lastChoice === 'number') {
            seen++;
            const corIdx = (q.choices || []).findIndex(c => c.isCorrect);
            if(q.lastChoice === corIdx) correct++;
        }
    });
    const stats = document.getElementById('sessionStats');
    if(stats) stats.textContent = `${seen} Seen • ${correct} Correct`;
}

function renderSessionHistory() {
    const cont = document.getElementById('historyList');
    if(!cont) return;
    cont.innerHTML = '';
    App.sessionOrder.forEach((id, idx) => {
        const q = getQuestionById(id);
        if(!q) return;
        const item = document.createElement('div');
        let stateClass = 'state-unseen';
        if(typeof q.lastChoice === 'number') {
            const corIdx = (q.choices || []).findIndex(c => c.isCorrect);
            if(q.lastChoice === corIdx) stateClass = 'state-correct';
            else stateClass = 'state-wrong';
        }
        let markers = '';
        if(q.flagged) markers += ' 🚩';
        if(q.status === 'maintenance') markers += ' 🔧';
        if(q.status === 'error') markers += ' ⛔';
        const isActive = (idx === App.currentSeqSlot);
        item.className = `hist-item ${stateClass}${isActive ? ' active' : ''}`;
        item.textContent = `${idx+1}. #${q.id}${markers}`;
        item.title = (q.text || '').slice(0, 120);
        item.onclick = () => {
            App.currentQ = q;
            App.currentSeqSlot = idx;
            renderQ();
        };
        cont.appendChild(item);
    });
    computeSessionStats();
}

function loadNextQuestion(reset) {
    if(reset) resetSessionState();
    if(App.currentQ && !reset) App.history.push(App.currentQ);

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
        if(m === 'maintain' && q.status !== 'maintenance') return false;
        if(m === 'flagged' && !q.flagged) return false;
        if(m === 'new' && q.timesSeen > 0) return false;
        if(skip && m!=='new' && m!=='maintain' && m!=='wrong' && q.timesSeen > 0) return false;
        return true;
    });

    const panel = document.getElementById('questionPanel');
    if(!panel) return;

    if(pool.length === 0) {
        panel.innerHTML = '<div style="padding:20px; text-align:center; color:#888;">No questions found.<br>Try "Refresh" or change filters.</div>';
        return;
    }

    const rand = Math.floor(Math.random() * pool.length);
    App.currentQ = pool[rand];
    registerSessionPosition(App.currentQ.id);
    renderQ();
}

function renderQ() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    if(!q || !panel) return;

    const fbPanel = document.getElementById('feedbackPanel');
    const srsBox = document.getElementById('srsButtons');
    const maintBox = document.getElementById('maintBox');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnNext = document.getElementById('btnNext');

    if(maintBox) maintBox.classList.add('hidden');

    const btnFlag = document.getElementById('btnFlag');
    if(btnFlag) {
        btnFlag.textContent = q.flagged ? "Flagged 🚩" : "Flag ⚐";
        btnFlag.style.color = q.flagged ? "red" : "";
    }
    safeSetVal('userNoteArea', q.userNotes || "");

    let h = `<div style="font-weight:500; font-size:1.1rem; margin-bottom:15px;">[#${q.id}] ${q.text}</div>`;
    if(q.imageUrl) h += `<img src="${q.imageUrl}" style="max-width:100%; margin-bottom:10px; border-radius:8px;">`;

    (q.choices || []).forEach((c, i) => {
        h += `<div class="choice" id="c_${i}" onclick="selectChoice(${i})">
          <b>${String.fromCharCode(65+i)}.</b> ${c.text}
        </div>`;
    });
    panel.innerHTML = h;

    // default: hide feedback + SRS, show Submit + Next
    if(fbPanel) {
        fbPanel.classList.add('hidden');
        fbPanel.innerHTML = "";
    }
    if(srsBox) srsBox.classList.add('hidden');
    if(btnSubmit) btnSubmit.classList.remove('hidden');
    if(btnNext) btnNext.classList.remove('hidden'); // always show Next as skip

    App.selectedChoice = null;

    // if question was already answered in this session, restore its state
    if(typeof q.lastChoice === 'number') {
        App.selectedChoice = q.lastChoice;
        showFeedback(q.lastChoice, q);
    }

    renderSessionHistory();
}

window.selectChoice = function(idx) {
    const fbVisible = !document.getElementById('feedbackPanel').classList.contains('hidden');
    if(fbVisible) return;
    document.querySelectorAll('.choice').forEach(e => {
        e.classList.remove('selected');
    });
    const el = document.getElementById('c_'+idx);
    if(el) {
        el.classList.add('selected');
    }
    App.selectedChoice = idx;
};

function submitAnswer() {
    if(App.selectedChoice === null || App.selectedChoice === undefined) return alert("Select an answer");
    const q = App.currentQ;
    q.lastChoice = App.selectedChoice; 
    
    showFeedback(App.selectedChoice, q);
    
    const isCorrect = q.choices[App.selectedChoice].isCorrect;
    q.timesSeen = (q.timesSeen||0) + 1;
    q.lastSeenAt = nowTs();
    if(isCorrect) {
        q.timesCorrect = (q.timesCorrect||0)+1;
        updateXP(10);
    } else {
        q.timesWrong = (q.timesWrong||0)+1;
    }
    
    if(!q.dueDate) q.dueDate = nowTs();
    saveQ(q);
    renderSessionHistory();
}

function showFeedback(idx, q) {
    const correctIdx = q.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);
    
    const fb = document.getElementById('feedbackPanel');
    if(!fb) return;
    fb.classList.remove('hidden');
    fb.innerHTML = `<strong style="color:${isCorrect?'#10b981':'#ef4444'}">${isCorrect?'Correct!':'Wrong'}</strong><br>${q.explanation||''}`;
    
    const cEl = document.getElementById('c_'+correctIdx);
    if(cEl) cEl.classList.add('correct');
    
    const iEl = document.getElementById('c_'+idx);
    if(iEl && !isCorrect) iEl.classList.add('wrong');
    if(iEl && isCorrect) iEl.classList.add('selected');

    const btnSubmit = document.getElementById('btnSubmit');
    const btnNext = document.getElementById('btnNext');
    const srsBox = document.getElementById('srsButtons');
    if(btnSubmit) btnSubmit.classList.add('hidden');
    if(btnNext) btnNext.classList.remove('hidden');
    if(srsBox) srsBox.classList.remove('hidden');
}

function updateXP(amount) {
    App.user.xp = (App.user.xp || 0) + amount;
    safeSetText('userXP', App.user.xp);
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'stats', ...App.user });
}

// --- 4. LIBRARY TABLE ---
function applyTableFilters() {
    const txt = document.getElementById('allSearch').value.toLowerCase();
    const type = document.getElementById('allFilter').value;
    const ch = document.getElementById('allChapterSelect').value;
    const dFrom = document.getElementById('allDateFrom').value;
    const dTo = document.getElementById('allDateTo').value;
    const tFrom = document.getElementById('allTimeFrom').value;
    const tTo = document.getElementById('allTimeTo').value;

    let fromTs = null, toTs = null;
    if(dFrom) {
        const base = new Date(dFrom + 'T00:00:00');
        fromTs = base.getTime();
        if(tFrom) {
            const [h,m] = tFrom.split(':');
            base.setHours(parseInt(h||'0'), parseInt(m||'0'), 0, 0);
            fromTs = base.getTime();
        }
    }
    if(dTo) {
        const base = new Date(dTo + 'T23:59:59');
        if(tTo) {
            const [h,m] = tTo.split(':');
            base.setHours(parseInt(h||'23'), parseInt(m||'59'), 59, 999);
        }
        toTs = base.getTime();
    }
    
    App.tableQs = App.questions.filter(q => {
        if(txt && !q.text.toLowerCase().includes(txt) && String(q.id) !== txt) return false;
        if(ch && q.chapter !== ch) return false;
        if(type === 'maintain' && q.status !== 'maintenance') return false;
        if(type === 'notes' && !q.userNotes) return false;
        if(type === 'error' && q.status !== 'error') return false;
        if(type === 'flagged' && !q.flagged) return false;
        if(fromTs !== null) {
            if(!q.importedAt || q.importedAt < fromTs) return false;
        }
        if(toTs !== null) {
            if(!q.importedAt || q.importedAt > toTs) return false;
        }
        return true;
    });
    App.page = 1;
    sortCurrentTable();
    renderTable();
}

function sortCurrentTable() {
    const field = App.sort.field;
    App.tableQs.sort((a,b) => {
        let valA = a[field] || 0; let valB = b[field] || 0;
        if(typeof valA==='string') { valA=valA.toLowerCase(); valB=valB.toLowerCase(); }
        return (valA < valB ? -1 : 1) * (App.sort.asc ? 1 : -1);
    });
}

function sortTable(field) {
    App.sort.asc = (App.sort.field === field) ? !App.sort.asc : true;
    App.sort.field = field;
    sortCurrentTable();
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
        if(q.status === 'maintenance') status += '<span class="tag-maint">🔧 MAINT</span> ';
        if(q.status === 'error') status += '<span class="tag-error">⛔ ERROR</span> ';
        if(q.flagged) status += '<span class="tag-flag">🚩</span> ';
        
        const userNote = q.userNotes ? (q.userNotes.length > 30 ? q.userNotes.substring(0, 30) + '...' : q.userNotes) : '-';
        const issueNote = q.issueNote ? (q.issueNote.length > 30 ? q.issueNote.substring(0, 30) + '...' : q.issueNote) : '-';

        tr.innerHTML = `
           <td><input type="checkbox" class="row-cb" ${isSel?'checked':''} onclick="handleCheck(this, ${q.id})"></td>
           <td>${q.id}</td>
           <td class="wrap-text" title="${q.text}">${q.text.substring(0,60)}...</td>
           <td>${q.chapter||'-'}</td>
           <td title="${q.userNotes || ''}">${userNote}</td>
           <td title="${q.issueNote || ''}">${issueNote}</td>
           <td>${status}</td>
           <td><button class="pill-btn tiny-btn" onclick="openEdit(${q.id})">✎</button></td>
        `;
        tbody.appendChild(tr);
    });
    safeSetText('allPageInfo', App.page);
    safeSetText('selCount', App.selectedIds.size + " Selected");
}

window.handleCheck = function(cb, id) {
    if(App.rangeMode && App.lastCheckId !== null && cb.checked) {
        const all = App.tableQs.map(q=>q.id);
        const s = all.indexOf(App.lastCheckId);
        const e = all.indexOf(id);
        const min = Math.min(s,e), max = Math.max(s,e);
        for(let i=min; i<=max; i++) App.selectedIds.add(all[i]);
    } else {
        if(cb.checked) App.selectedIds.add(id); else App.selectedIds.delete(id);
    }
    App.lastCheckId = id;
    safeSetText('selCount', App.selectedIds.size + " Selected");
    renderTable();
};

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
    if(btn) {
        btn.textContent = App.rangeMode ? "✨ Range: ON" : "✨ Range: OFF";
        btn.classList.toggle('range-active', App.rangeMode);
    }
    showToast(App.rangeMode ? "Shift-select ON" : "Range OFF");
}

// --- 5. EVENTS ---
function setupEvents() {
    bind('btnSubmit', 'click', submitAnswer);
    bind('btnNext', 'click', () => loadNextQuestion(false));
    bind('btnPrev', 'click', () => { if(App.history.length>0){ App.currentQ = App.history.pop(); registerSessionPosition(App.currentQ.id); renderQ(); }});
    bind('btnFlag', 'click', () => { if(App.currentQ) { App.currentQ.flagged = !App.currentQ.flagged; saveQ(App.currentQ); renderQ(); } });
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
    bind('btnResetDetails', 'click', openResetDialog);
    bind('btnUndoReset', 'click', undoReset);
    
    bind('btnSaveGh', 'click', saveSettings);
    bind('btnCloudUpload', 'click', cloudUpload);
    bind('btnCloudDownload', 'click', cloudDownloadLatest);
    bind('btnCloudDownloadSelected', 'click', cloudDownloadSelected);
    bind('btnResetProgress', 'click', () => { if(confirm("Reset all stats (timesSeen/timesWrong/timesCorrect)?")) { App.questions.forEach(q=>{q.timesSeen=0; q.timesWrong=0; q.timesCorrect=0; q.lastChoice=undefined; saveQ(q)}); location.reload(); } });
    bind('btnFactoryReset', 'click', () => { if(confirm("WIPE DB?")) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }});
    
    bind('btnFcShuffle', 'click', buildFlashcardPool);
    bind('btnFcShow', 'click', () => { 
        const back = document.getElementById('fcBack');
        const gradeBox = document.getElementById('fcGrading');
        if(back) back.classList.remove('hidden'); 
        if(gradeBox) gradeBox.classList.remove('hidden');
    });
    bind('btnFcAgain', 'click', () => nextFlashcard(false));
    bind('btnFcGood', 'click', () => nextFlashcard(true));

    bind('btnStartExam', 'click', startExam);
    bind('btnExamNext', 'click', () => examMove(1));
    bind('btnExamFinish', 'click', finishExam);
    bind('btnExamClose', 'click', () => { 
        document.getElementById('examResults').classList.add('hidden'); 
        switchTab('home'); 
    });

    bind('btnSaveEdit', 'click', saveEditModal);
    bind('btnCancelEdit', 'click', () => document.getElementById('editModal').classList.add('hidden'));
    bind('btnAddChoice', 'click', () => addEditChoice('', false));
    bind('themeToggle', 'click', () => document.body.classList.toggle('dark'));

    document.querySelectorAll('.tab-button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    document.querySelectorAll('.sortable').forEach(th => { th.addEventListener('click', () => sortTable(th.dataset.key)); });
    
    bind('allPrevPage', 'click', () => { if(App.page>1){App.page--; renderTable();} });
    bind('allNextPage', 'click', () => { App.page++; renderTable(); });

    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 800));
    
    bind('allSelectAll', 'change', (e)=>toggleSelectAll(e.target));
}

// --- UTILS ---
function saveQ(q) {
    const tx = db.transaction('questions','readwrite');
    tx.objectStore('questions').put(q);
}

function toggleMaintenance() {
    const box = document.getElementById('maintBox');
    if(box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        document.getElementById('maintNote').value = App.currentQ.issueNote || '';
        const type = App.currentQ.status || 'none';
        const radios = document.querySelectorAll('input[name="maintType"]');
        radios.forEach(r => { r.checked = (r.value === type) || (type==='none' && r.value==='maintenance'); });
    } else {
        box.classList.add('hidden');
    }
}

function saveMaintenanceNote() {
    if(App.currentQ) {
        const radios = document.querySelectorAll('input[name="maintType"]');
        let status = 'none';
        radios.forEach(r => { if(r.checked) status = r.value; });
        App.currentQ.status = status;
        App.currentQ.issueNote = document.getElementById('maintNote').value || '';
        saveQ(App.currentQ);
        alert("Issue Mark Saved");
        document.getElementById('maintBox').classList.add('hidden');
        applyTableFilters();
        renderSessionHistory();
    }
}

function saveNoteManual() {
    saveNote();
    const btn = document.getElementById('btnSaveNoteManual');
    if(btn) {
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
            if(!Array.isArray(json)) throw new Error("JSON must be an array of questions");
            if(!confirm(`Found ${json.length} items. Import as new questions (no replace)?`)) return;

            const existingIds = new Set(App.questions.map(q=>q.id));
            const tx = db.transaction('questions','readwrite');
            let maxId = Math.max(0, ...Array.from(existingIds));
            const batchTs = nowTs();

            json.forEach(raw => {
                const q = {...raw};
                // never replace existing question
                if(!q.id || existingIds.has(q.id)) {
                    maxId += 1;
                    q.id = maxId;
                }
                existingIds.add(q.id);

                if(!q.importedAt || q.importedAt === 0) q.importedAt = batchTs;
                if(!q.status) q.status = 'none';
                if(q.maintenance && !q.status) q.status = 'maintenance';
                if(Array.isArray(q.tags)) q.tags = q.tags.join(', ');

                delete q.lastChoice; // clean previous-session UI-only field
                const total = (q.timesSeen || 0);
                if(total === 0) {
                    q.lastSeenAt = null;
                    q.timesCorrect = q.timesCorrect || 0;
                    q.timesWrong   = q.timesWrong   || 0;
                }
                tx.objectStore('questions').put(q);
            });
            tx.oncomplete = async () => { 
                await loadData(); 
                normalizeQuestions();
                refreshUI(); 
                showToast('Imported Successfully'); 
            };
        } catch(err) { alert(err.message); }
    };
    r.readAsText(f);
}
function handleExport() {
    const enriched = App.questions.map(q => {
        const total = (q.timesSeen || 0);
        const correct = (q.timesCorrect || 0);
        const successRate = total > 0 ? Math.round((correct/total)*100) : null;
        const copy = { ...q, successRate };
        delete copy.lastChoice; // do not export transient UI field
        return copy;
    });
    const b = new Blob([JSON.stringify(enriched, null, 2)], {type:'application/json'});
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href=u; a.download='MCQ_Library_Full.json'; a.click();
}

// --- DUPLICATES ---
function scanDuplicates() {
    const map = new Map(); App.duplicates = [];
    App.questions.forEach(q => {
        const k = (q.text||"").substring(0,80).toLowerCase();
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
async function execBulk(act) {
    if(!confirm(`Bulk ${act}?`)) return;
    const tx = db.transaction('questions', 'readwrite');
    App.selectedIds.forEach(id => { if(act==='delete') tx.objectStore('questions').delete(id); });
    tx.oncomplete = async () => { await loadData(); applyTableFilters(); showToast("Bulk Done"); };
}

// --- RESET DETAILS WITH BACKUP + UNDO ---
function openResetDialog() {
    if(App.selectedIds.size === 0) {
        if(!confirm("No questions selected.\nApply reset to ALL questions that match current filter?")) return;
    }
    const mode = prompt("Reset mode:\n1 = Last session\n2 = By chapter\n3 = Wrong questions\n4 = By tag\nEnter number:");
    if(!mode) return;
    let chapter = null, tag = null;
    if(mode === '2') chapter = prompt("Chapter name (exact match):");
    if(mode === '4') tag = prompt("Tag text (will match inside tags string):");
    
    const target = App.questions.filter(q => {
        if(App.selectedIds.size>0 && !App.selectedIds.has(q.id)) return false;
        if(mode === '1') {
            if(!q.lastSeenAt) return false;
            const d = new Date(q.lastSeenAt);
            const today = new Date();
            return d.toDateString() === today.toDateString();
        }
        if(mode === '2') return chapter && q.chapter === chapter;
        if(mode === '3') return q.timesWrong && q.timesWrong > 0;
        if(mode === '4') return tag && typeof q.tags === 'string' && q.tags.toLowerCase().includes(tag.toLowerCase());
        return true;
    });
    if(target.length === 0) { alert("No matching questions found for this reset."); return; }

    if(!confirm(`Reset details for ${target.length} questions?`)) return;

    App.lastResetBackup = JSON.parse(JSON.stringify(App.questions));
    const undoBtn = document.getElementById('btnUndoReset');
    if(undoBtn) undoBtn.classList.remove('hidden');
    showToast("Reset will apply in 5 seconds. Click 'Undo Reset' to cancel.", 'warn');

    if(App.resetTimer) clearTimeout(App.resetTimer);
    App.resetTimer = setTimeout(() => {
        target.forEach(q => {
            q.timesSeen = 0;
            q.timesWrong = 0;
            q.timesCorrect = 0;
            q.lastSeenAt = null;
            // keep notes, but clear issue marks
            q.status = 'none';
            q.issueNote = '';
            delete q.lastChoice;
        });
        const tx = db.transaction('questions','readwrite');
        target.forEach(q => tx.objectStore('questions').put(q));
        tx.oncomplete = async () => {
            App.resetTimer = null;
            if(undoBtn) undoBtn.classList.add('hidden');
            await loadData();
            normalizeQuestions();
            applyTableFilters();
            resetSessionState();
            showToast("Reset applied");
        };
    }, 5000);
}
function undoReset() {
    if(!App.resetTimer || !App.lastResetBackup) return;
    clearTimeout(App.resetTimer);
    App.resetTimer = null;
    const undoBtn = document.getElementById('btnUndoReset');
    if(undoBtn) undoBtn.classList.add('hidden');
    const tx = db.transaction('questions','readwrite');
    App.lastResetBackup.forEach(q => tx.objectStore('questions').put(q));
    tx.oncomplete = async () => {
        await loadData();
        normalizeQuestions();
        applyTableFilters();
        resetSessionState();
        showToast("Reset cancelled", 'warn');
    };
}

// --- CLOUD ---
function loadSettings() {
    const t = localStorage.getItem('gh_token');
    if(t) {
        safeSetVal('ghToken', t);
        safeSetVal('ghRepo', localStorage.getItem('gh_repo') || '');
        safeSetVal('ghFile', localStorage.getItem('gh_file') || 'mcq_backup');
        const hist = localStorage.getItem('backup_history');
        if(hist) {
            try { App.backupHistory = JSON.parse(hist) || []; } catch(e){ App.backupHistory = []; }
        }
    }
}
function saveSettings() {
    localStorage.setItem('gh_token', document.getElementById('ghToken').value);
    localStorage.setItem('gh_repo', document.getElementById('ghRepo').value);
    localStorage.setItem('gh_file', document.getElementById('ghFile').value);
    localStorage.setItem('backup_history', JSON.stringify(App.backupHistory));
    alert("Settings Saved");
}
function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
function deb64(s) { return decodeURIComponent(escape(atob(s))); }

function makeBackupFileName() {
    const base = document.getElementById('ghFile').value || 'mcq_backup';
    const d = new Date();
    const pad = (n)=>String(n).padStart(2,'0');
    const stamp = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    return `${base}_${stamp}.json`;
}

async function cloudUpload() {
    const t = localStorage.getItem('gh_token') || document.getElementById('ghToken').value;
    const r = localStorage.getItem('gh_repo') || document.getElementById('ghRepo').value;
    if(!t || !r) return alert("Check Settings");
    const f = makeBackupFileName();
    try {
        const c = b64(JSON.stringify(App.questions));
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${f}`, {
            method:'PUT',
            headers:{Authorization:`token ${t}`, 'Content-Type':'application/json'},
            body:JSON.stringify({message:'MCQ Backup', content:c})
        });
        if(res.ok) {
            App.backupHistory.unshift(f);
            App.backupHistory = App.backupHistory.slice(0,10);
            localStorage.setItem('backup_history', JSON.stringify(App.backupHistory));
            loadBackupHistoryUI();
            showToast('Uploaded ✅');
        } else {
            alert('Upload Error');
        }
    } catch(e) { alert(e.message); }
}
async function cloudDownloadLatest() {
    if(App.backupHistory.length === 0) return alert("No backup history stored.");
    const latest = App.backupHistory[0];
    await cloudDownloadFile(latest);
}
async function cloudDownloadSelected() {
    const sel = document.getElementById('ghBackupList').value;
    if(!sel) return alert("Select a backup first.");
    await cloudDownloadFile(sel);
}
async function cloudDownloadFile(fileName) {
    const t = localStorage.getItem('gh_token') || document.getElementById('ghToken').value;
    const r = localStorage.getItem('gh_repo') || document.getElementById('ghRepo').value;
    if(!t || !r) return alert("Check Settings");
    try {
        const res = await fetch(`https://api.github.com/repos/${r}/contents/${fileName}`, {headers:{Authorization:`token ${t}`}});
        if(!res.ok) throw new Error('Failed');
        const d = await res.json();
        const decoded = JSON.parse(deb64(d.content));
        const tx = db.transaction('questions','readwrite');
        decoded.forEach(q => {
            delete q.lastChoice;
            tx.objectStore('questions').put(q);
        });
        tx.oncomplete = () => { loadData().then(()=>{ normalizeQuestions(); refreshUI(); resetSessionState(); showToast('Downloaded & Applied'); }); };
    } catch(e) { alert(e.message); }
}
function loadBackupHistoryUI() {
    const sel = document.getElementById('ghBackupList');
    if(!sel) return;
    sel.innerHTML = '<option value="">Select older backup...</option>';
    App.backupHistory.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        sel.appendChild(opt);
    });
}

// Flashcards
let fcPool = [], fcIdx = 0;
function buildFlashcardPool() {
    fcPool = App.questions.filter(q => q.active !== false);
    fcIdx = 0; renderFC();
}
function renderFC() {
    const front = document.getElementById('fcFront');
    const back = document.getElementById('fcBack');
    const gradeBox = document.getElementById('fcGrading');
    if(!front || !back) return;
    if(fcPool.length===0) { 
        front.textContent="Empty"; 
        back.textContent=""; 
        back.classList.add('hidden'); 
        if(gradeBox) gradeBox.classList.add('hidden');
        return; 
    }
    const q = fcPool[fcIdx];
    const cor = (q.choices||[]).find(c=>c.isCorrect);
    front.textContent = q.text;
    back.innerHTML = `<b>Answer:</b> ${cor?cor.text:'?'}`;
    back.classList.add('hidden');
    if(gradeBox) gradeBox.classList.add('hidden');
}
function nextFlashcard(good) { 
    if(fcIdx < fcPool.length -1) fcIdx++; else fcIdx = 0; 
    renderFC(); 
}

// Exam
let examSession = null;
function startExam() {
    const count = parseInt(document.getElementById('examCount').value) || 40;
    const pool = [...App.questions].sort(() => Math.random()-0.5).slice(0, count);
    examSession = { qs: pool, answers: {}, index: 0 };
    document.getElementById('examInterface').classList.remove('hidden');
    renderExamQ();
}
function renderExamQ() {
    const q = examSession.qs[examSession.index];
    safeSetText('examProgress', `${examSession.index+1}/${examSession.qs.length}`);
    let h = `<div class="q-text">${q.text}</div>`;
    (q.choices||[]).forEach((c, i) => h += `<label class="choice"><input type="radio" name="exAns" value="${i}"> ${c.text}</label>`);
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
       const cor = (q.choices||[]).findIndex(c=>c.isCorrect);
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
    document.getElementById('editText').value = q.text || '';
    document.getElementById('editChapter').value = q.chapter || '';
    document.getElementById('editTags').value = q.tags || '';
    document.getElementById('editExplanation').value = q.explanation || '';
    document.getElementById('editIssueNote').value = q.issueNote || '';

    const type = q.status || 'none';
    document.querySelectorAll('input[name="editIssueType"]').forEach(r => {
        r.checked = (r.value === type) || (type==='none' && r.value==='none');
    });

    const list = document.getElementById('editChoicesList'); 
    list.innerHTML='';
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
    q.tags = document.getElementById('editTags').value;
    q.explanation = document.getElementById('editExplanation').value;
    q.issueNote = document.getElementById('editIssueNote').value;
    let status = 'none';
    document.querySelectorAll('input[name="editIssueType"]').forEach(r => { if(r.checked) status = r.value; });
    q.status = status;
    const ch = [];
    document.querySelectorAll('.edit-choice-row').forEach(r => {
        const txt = r.querySelector('input.std-input').value;
        const isC = r.querySelector('input[type="radio"]').checked;
        ch.push({ text:txt, isCorrect:isC });
    });
    q.choices = ch;
    saveQ(q);
    document.getElementById('editModal').classList.add('hidden');
    applyTableFilters();
    renderSessionHistory();
    alert("Saved");
}

// SRS
function handleSRS(grade) {
    const q = App.currentQ;
    let days = 1;
    if(grade===4) days=7; if(grade===3) days=4; if(grade===2) days=2;
    q.dueDate = nowTs() + (days * 24 * 60 * 60 * 1000);
    saveQ(q);
    loadNextQuestion(false);
}

// Dashboard
function renderDashboard() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => (q.timesCorrect||0) > 3).length;
    const maint = App.questions.filter(q => q.status === 'maintenance').length;
    safeSetText('dashTotal', total);
    safeSetText('dashMastery', Math.round((mastered/total)*100 || 0) + '%');
    safeSetText('dashMaint', maint);
}
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    document.querySelector(`.tab-button[data-tab="${id}"]`).classList.add('active');
    if(id==='all') applyTableFilters();
    if(id==='dashboard') renderDashboard();
}
function refreshUI() {
    const chaps = [...new Set(App.questions.map(q=>q.chapter).filter(Boolean))].sort();
    const h = '<option value="">All Chapters</option>' + chaps.map(c=>`<option value="${c}">${c}</option>`).join('');
    document.querySelectorAll('.chapter-list').forEach(s => s.innerHTML = h);
}
