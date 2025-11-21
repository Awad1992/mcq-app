/**
 * MCQ Ultra-Pro v16.1 (Enhanced Issue + Import/Export + Reset/Backup)
 */

const DB_NAME = 'mcq_pro_v15';
const DB_VERSION = 26; 
let db = null;

const App = {
    questions: [],
    tableQs: [],
    selectedIds: new Set(),
    currentQ: null,
    selectedChoice: null,
    filter: { search: '', status: 'all', chapter: '' },
    sort: { field: 'id', asc: true },
    page: 1,
    limit: 50,
    rangeMode: false,
    lastCheckId: null,
    skipSolved: true,
    history: [],
    duplicates: [],
    user: { xp: 0, streak: 0 },
    lastResetBackup: null,
    resetTimer: null,
    backupHistory: [],
    practiceSeq: [],
    seqMap: {},
    seqCounter: 0,
    seqIndex: -1
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
function loadNextQuestion(reset) {
    const m = document.getElementById('modeSelect').value;
    const box = document.getElementById('chapterBox');
    if (box) box.style.display = (m === 'chapter') ? 'block' : 'none';

    if (reset) {
        App.history = [];
        App.practiceSeq = [];
        App.seqMap = {};
        App.seqCounter = 0;
        App.seqIndex = -1;
        App.currentQ = null;
    }

    const c = document.getElementById('chapterSelect').value;
    const skip = document.getElementById('prefSkipSolved').checked;
    const panel = document.getElementById('questionPanel');
    if (!panel) return;

    // If not reset and we have forward history, move forward in sequence
    if (!reset && App.seqIndex < (App.practiceSeq.length - 1)) {
        App.seqIndex++;
        const entry = App.practiceSeq[App.seqIndex];
        const qExist = App.questions.find(x => x.id === entry.id);
        if (qExist) {
            App.currentQ = qExist;
            renderQ();
            return;
        }
    }

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

    if(pool.length === 0) {
        panel.innerHTML = '<div style="padding:20px; text-align:center; color:#888;">No questions found.<br>Try "Refresh" or change filters.</div>';
        return;
    }

    const rand = Math.floor(Math.random() * pool.length);
    const q = pool[rand];
    App.currentQ = q;

    if (!App.seqMap[q.id]) {
        App.seqCounter += 1;
        App.seqMap[q.id] = App.seqCounter;
    }
    App.practiceSeq.push({ id: q.id, seq: App.seqMap[q.id] });
    App.seqIndex = App.practiceSeq.length - 1;

    App.selectedChoice = null;
    renderQ();
}

function renderQ() {
    const q = App.currentQ;
    const panel = document.getElementById('questionPanel');
    if(!q || !panel) return;

    const fbPanel = document.getElementById('feedbackPanel');
    const srs = document.getElementById('srsButtons');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnNext = document.getElementById('btnNext');
    const maintBox = document.getElementById('maintBox');

    if(fbPanel) fbPanel.classList.add('hidden');
    if(srs) srs.classList.add('hidden');
    if(btnSubmit) btnSubmit.classList.remove('hidden');
    if(btnNext) btnNext.classList.add('hidden');
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

    // restore session state if answered
    if (q.sessionAnswered && typeof q.sessionLastChoice === 'number') {
        App.selectedChoice = q.sessionLastChoice;
        showFeedback(q.sessionLastChoice, q);
    } else {
        App.selectedChoice = null;
    }

    updateHistoryUI();
}

window.selectChoice = function(idx) {
    const fb = document.getElementById('feedbackPanel');
    if(fb && !fb.classList.contains('hidden')) return;
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
    q.sessionAnswered = true;
    q.sessionCorrect = isCorrect;
    q.sessionLastChoice = App.selectedChoice;
    q.lastSeenAt = nowTs();
    if(isCorrect) {
        q.timesCorrect = (q.timesCorrect||0)+1;
        updateXP(10);
    } else {
        q.timesWrong = (q.timesWrong||0)+1;
    }

    if(!q.dueDate) q.dueDate = nowTs();
    saveQ(q);
}

function showFeedback(idx, q) {
    const correctIdx = q.choices.findIndex(c => c.isCorrect);
    const isCorrect = (idx === correctIdx);

    const fb = document.getElementById('feedbackPanel');
    fb.classList.remove('hidden');
    fb.innerHTML = `<strong style="color:${isCorrect?'#10b981':'#ef4444'}">${isCorrect?'Correct!':'Wrong'}</strong><br>${q.explanation||''}`;

    const cEl = document.getElementById('c_'+correctIdx);
    if(cEl) cEl.classList.add('correct');

    const iEl = document.getElementById('c_'+idx);
    if(iEl && !isCorrect) iEl.classList.add('wrong');

    document.getElementById('btnSubmit').classList.add('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
}

function updateXP(amount) {
    App.user.xp = (App.user.xp || 0) + amount;
    safeSetText('userXP', App.user.xp);
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'stats', ...App.user });
}

// --- PRACTICE HISTORY SIDEBAR ---
function updateHistoryUI() {
    const list = document.getElementById('historyList');
    if (!list) return;
    list.innerHTML = '';
    App.practiceSeq.forEach((entry, idx) => {
        const q = App.questions.find(x => x.id === entry.id);
        if (!q) return;
        const div = document.createElement('div');
        let cls = 'hist-item';
        if (idx === App.seqIndex) cls += ' hist-current';
        if (q.sessionAnswered) {
            cls += q.sessionCorrect ? ' hist-correct' : ' hist-wrong';
        } else {
            cls += ' hist-unseen';
        }
        div.className = cls;
        let badges = '';
        if (q.flagged) badges += ' 🚩';
        if (q.status === 'maintenance') badges += ' 🔧';
        if (q.status === 'error') badges += ' ⛔';
        div.textContent = entry.seq + badges;
        div.onclick = () => {
            App.seqIndex = idx;
            App.currentQ = q;
            renderQ();
        };
        list.appendChild(div);
    });
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
    bind('btnPrev', 'click', () => {
        if (App.seqIndex > 0) {
            App.seqIndex--;
            const entry = App.practiceSeq[App.seqIndex];
            const q = App.questions.find(x => x.id === entry.id);
            if (q) {
                App.currentQ = q;
                renderQ();
            }
        }
    });
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
    bind('btnResetProgress', 'click', () => { if(confirm("Reset all stats (timesSeen/timesWrong/timesCorrect)?")) { App.questions.forEach(q=>{q.timesSeen=0; q.timesWrong=0; q.timesCorrect=0; saveQ(q)}); location.reload(); } });
    bind('btnFactoryReset', 'click', () => { if(confirm("WIPE DB?")) { indexedDB.deleteDatabase(DB_NAME); location.reload(); }});

    bind('btnFcShuffle', 'click', buildFlashcardPool);
    bind('btnFcShow', 'click', () => { 
        const back = document.getElementById('fcBack');
        if(back) back.classList.remove('hidden'); 
        const grading = document.getElementById('fcGrading');
        if (grading) grading.classList.remove('hidden');
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
    bind('btnFocusMode', 'click', enterFocusMode);
    bind('btnExitFocus', 'click', exitFocusMode);

    document.querySelectorAll('.tab-button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    document.querySelectorAll('.sortable').forEach(th => { th.addEventListener('click', () => sortTable(th.dataset.key)); });

    bind('allPrevPage', 'click', () => { if(App.page>1){App.page--; renderTable();} });
    bind('allNextPage', 'click', () => { App.page++; renderTable(); });

    const note = document.getElementById('userNoteArea');
    if(note) note.addEventListener('input', debounce(saveNote, 800));

    bind('allSelectAll', 'change', (e)=>toggleSelectAll(e.target));
}

function loadSettings() {
    const t = localStorage.getItem('gh_token');
    const r = localStorage.getItem('gh_repo');
    const f = localStorage.getItem('gh_file');
    if(t) safeSetVal('ghToken', t);
    if(r) safeSetVal('ghRepo', r);
    if(f) safeSetVal('ghFile', f);
    if(t) safeSetText('syncStatus', "Cloud: Linked");
}

function refreshUI() {
    const chSet = [...new Set(App.questions.map(q=>q.chapter).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    const lists = document.querySelectorAll('.chapter-list');
    lists.forEach(sel => {
        const val = sel.value;
        sel.innerHTML = '<option value="">All Chapters</option>';
        chSet.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c;
            sel.appendChild(opt);
        });
        sel.value = val;
    });

    applyTableFilters();
    refreshDashboard();
}


function enterFocusMode() {
    document.body.classList.add('focus-mode');
    const b1 = document.getElementById('btnFocusMode');
    const b2 = document.getElementById('btnExitFocus');
    if (b1) b1.classList.add('hidden');
    if (b2) b2.classList.remove('hidden');
}
function exitFocusMode() {
    document.body.classList.remove('focus-mode');
    const b1 = document.getElementById('btnFocusMode');
    const b2 = document.getElementById('btnExitFocus');
    if (b1) b1.classList.remove('hidden');
    if (b2) b2.classList.add('hidden');
}

// --- PRACTICE HELPERS ---
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
            const store = tx.objectStore('questions');
            let maxId = App.questions.reduce((m,q)=>Math.max(m,q.id||0),0);
            const importedAt = Date.now();
            json.forEach(item => {
                if(!item.id || existingIds.has(item.id)) {
                    maxId += 1;
                    item.id = maxId;
                }
                if(!item.choices || !item.choices.length) return;
                item.status = item.status || 'none';
                item.timesSeen = item.timesSeen || 0;
                item.timesWrong = item.timesWrong || 0;
                item.timesCorrect = item.timesCorrect || 0;
                item.importedAt = importedAt;
                if(Array.isArray(item.tags)) item.tags = item.tags.join(', ');
                store.put(item);
                App.questions.push(item);
            });
            tx.oncomplete = () => {
                showToast("Import complete");
                refreshUI();
            };
        } catch(err) {
            alert("Import failed: "+err.message);
        }
    };
    r.readAsText(f);
}

function handleExport() {
    const data = JSON.stringify(App.questions, null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().replace(/[:.]/g,'-');
    a.href = url;
    a.download = `mcq_export_${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// --- DUPLICATES ---
function scanDuplicates() {
    const seen = new Map();
    const dup = [];
    App.questions.forEach(q => {
        const key = q.text.trim().toLowerCase();
        if(seen.has(key)) {
            dup.push({ base: seen.get(key), dup: q });
        } else {
            seen.set(key, q);
        }
    });
    App.duplicates = dup;
    const out = document.getElementById('dupResult');
    if(!dup.length) {
        if(out) out.textContent = "No duplicates ✅";
        const fixBtn = document.getElementById('btnFixDup');
        if(fixBtn) fixBtn.classList.add('hidden');
    } else {
        if(out) out.textContent = `Found ${dup.length} duplicates`;
        const fixBtn = document.getElementById('btnFixDup');
        if(fixBtn) fixBtn.classList.remove('hidden');
    }
}

function fixDuplicates() {
    if(!App.duplicates.length) return;
    if(!confirm(`Auto-delete ${App.duplicates.length} duplicate questions (keeping the first copy)?`)) return;
    const toDelete = new Set(App.duplicates.map(d=>d.dup.id));
    const tx = db.transaction('questions','readwrite');
    const store = tx.objectStore('questions');
    toDelete.forEach(id => store.delete(id));

    App.questions = App.questions.filter(q => !toDelete.has(q.id));
    App.duplicates = [];
    const fixBtn = document.getElementById('btnFixDup');
    if(fixBtn) fixBtn.classList.add('hidden');
    safeSetText('dupResult', "Duplicates removed");
    refreshUI();
}

// --- BULK ---
function execBulk(action) {
    if(!App.selectedIds.size) return alert("No questions selected");
    if(action === 'delete') {
        if(!confirm(`Delete ${App.selectedIds.size} questions? This cannot be undone.`)) return;
        const tx = db.transaction('questions','readwrite');
        const store = tx.objectStore('questions');
        App.selectedIds.forEach(id => store.delete(id));
        App.questions = App.questions.filter(q => !App.selectedIds.has(q.id));
        App.selectedIds.clear();
        refreshUI();
        safeSetText('selCount', "0 Selected");
    }
}

// --- RESET DETAILS (keep core stats, wipe metadata) ---
function openResetDialog() {
    if(!App.selectedIds.size) return alert("Select questions to reset details");
    if(!confirm("Reset details (chapter/tags/status/notes/issue) for selected questions?\nStats (timesSeen/timesCorrect/etc.) will stay.")) return;

    const backup = App.questions.filter(q => App.selectedIds.has(q.id)).map(q => ({...q}));
    App.lastResetBackup = backup;
    clearTimeout(App.resetTimer);
    App.resetTimer = setTimeout(()=>{ App.lastResetBackup=null; }, 10*60*1000);

    const tx = db.transaction('questions','readwrite');
    const store = tx.objectStore('questions');
    App.questions.forEach(q => {
        if(App.selectedIds.has(q.id)) {
            q.chapter = '';
            q.tags = '';
            q.status = 'none';
            q.issueNote = '';
            q.userNotes = '';
            store.put(q);
        }
    });
    tx.oncomplete = () => {
        showToast("Details reset. You can undo within 10 minutes.");
        const btnUndo = document.getElementById('btnUndoReset');
        if(btnUndo) btnUndo.classList.remove('hidden');
        refreshUI();
    };
}

function undoReset() {
    if(!App.lastResetBackup) return alert("No recent reset to undo");
    const tx = db.transaction('questions','readwrite');
    const store = tx.objectStore('questions');
    App.lastResetBackup.forEach(orig => {
        const idx = App.questions.findIndex(q => q.id === orig.id);
        if(idx >= 0) App.questions[idx] = orig;
        store.put(orig);
    });
    tx.oncomplete = () => {
        showToast("Reset undone");
        App.lastResetBackup = null;
        const btnUndo = document.getElementById('btnUndoReset');
        if(btnUndo) btnUndo.classList.add('hidden');
        refreshUI();
    };
}

// --- GITHUB BACKUP ---
function saveSettings() {
    const t = document.getElementById('ghToken').value.trim();
    const r = document.getElementById('ghRepo').value.trim();
    const f = document.getElementById('ghFile').value.trim() || 'mcq_backup';
    localStorage.setItem('gh_token', t);
    localStorage.setItem('gh_repo', r);
    localStorage.setItem('gh_file', f);
    showToast("GitHub settings saved");
    if(t) safeSetText('syncStatus', "Cloud: Linked");
}

async function cloudUpload() {
    const token = localStorage.getItem('gh_token');
    const repo = localStorage.getItem('gh_repo');
    const baseFile = localStorage.getItem('gh_file') || 'mcq_backup';
    if(!token || !repo) return alert("Set GitHub token and repo first");

    const url = `https://api.github.com/repos/${repo}/contents/${baseFile}_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    const data = JSON.stringify(App.questions, null, 2);
    const payload = {
        message: `MCQ backup ${new Date().toISOString()}`,
        content: btoa(unescape(encodeURIComponent(data)))
    };
    safeSetText('syncStatus', "Cloud: Uploading...");
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast("Backup uploaded to GitHub");
        safeSetText('syncStatus', "Cloud: OK");
        await loadBackupHistory();
    } catch(err) {
        console.error(err);
        alert("Upload failed: "+err.message);
        safeSetText('syncStatus', "Cloud: Error");
    }
}

async function cloudDownloadLatest() {
    const token = localStorage.getItem('gh_token');
    const repo = localStorage.getItem('gh_repo');
    const baseFile = localStorage.getItem('gh_file') || 'mcq_backup';
    if(!token || !repo) return alert("Set GitHub token and repo first");

    const url = `https://api.github.com/repos/${repo}/contents`;
    safeSetText('syncStatus', "Cloud: Listing...");
    try {
        const res = await fetch(url, {
            headers: { 'Authorization': `token ${token}` }
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const files = await res.json();
        const backups = files.filter(f => f.name.startsWith(baseFile+"_") && f.name.endsWith(".json"))
            .sort((a,b)=> new Date(b.git_url || b.name) - new Date(a.git_url || a.name));
        if(!backups.length) throw new Error("No backup files found");

        const latest = backups[0];
        if(!confirm(`Download and REPLACE local DB with backup:\n${latest.name}?`)) {
            safeSetText('syncStatus', "Cloud: Cancelled");
            return;
        }

        await downloadAndReplace(latest.download_url);
        safeSetText('syncStatus', "Cloud: Restored");
        showToast("DB replaced from latest backup");
    } catch(err) {
        console.error(err);
        alert("Download failed: "+err.message);
        safeSetText('syncStatus', "Cloud: Error");
    }
}

async function cloudDownloadSelected() {
    const select = document.getElementById('ghBackupList');
    const url = select.value;
    if(!url) return alert("Select a backup first");
    if(!confirm("REPLACE local DB with this backup?")) return;
    try {
        await downloadAndReplace(url);
        safeSetText('syncStatus', "Cloud: Restored");
        showToast("DB replaced from selected backup");
    } catch(err) {
        console.error(err);
        alert("Download failed: "+err.message);
        safeSetText('syncStatus', "Cloud: Error");
    }
}

async function downloadAndReplace(downloadUrl) {
    const res = await fetch(downloadUrl);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if(!Array.isArray(json)) throw new Error("Backup JSON must be an array");

    await new Promise((resolve, reject) => {
        const tx = db.transaction('questions','readwrite');
        const store = tx.objectStore('questions');
        const clearReq = store.clear();
        clearReq.onsuccess = () => {
            json.forEach(item => {
                if(!item.id || !item.choices || !item.choices.length) return;
                store.put(item);
            });
        };
        tx.oncomplete = () => resolve();
        tx.onerror = (e) => reject(e.target.error);
    });

    await loadData();
    normalizeQuestions();
    refreshUI();
}

// --- BACKUP HISTORY LIST ---
async function loadBackupHistory() {
    const token = localStorage.getItem('gh_token');
    const repo = localStorage.getItem('gh_repo');
    const baseFile = localStorage.getItem('gh_file') || 'mcq_backup';
    if(!token || !repo) return;

    const url = `https://api.github.com/repos/${repo}/contents`;
    try {
        const res = await fetch(url, {
            headers: { 'Authorization': `token ${token}` }
        });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const files = await res.json();
        const backups = files.filter(f => f.name.startsWith(baseFile+"_") && f.name.endsWith(".json"))
            .sort((a,b) => (a.name < b.name ? 1 : -1));
        App.backupHistory = backups;
        loadBackupHistoryUI();
    } catch(err) {
        console.error('Backup history load failed', err);
    }
}

function loadBackupHistoryUI() {
    const select = document.getElementById('ghBackupList');
    if(!select) return;
    select.innerHTML = '<option value="">Select older backup...</option>';
    App.backupHistory.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.download_url;
        opt.textContent = b.name;
        select.appendChild(opt);
    });
}

// --- FLASHCARDS ---
let flashPool = [];
let flashIndex = -1;

function buildFlashcardPool() {
    const mode = document.getElementById('fcSource') ? document.getElementById('fcSource').value : 'due';
    flashPool = App.questions.filter(q => {
        if(q.active === false) return false;
        if(mode === 'due') {
            return (q.timesSeen||0) > 0 && (q.timesWrong||0) > 0;
        }
        return true;
    });
    if(!flashPool.length) {
        document.getElementById('fcFront').textContent = "No flashcards available";
        document.getElementById('fcBack').textContent = "";
        return;
    }
    shuffleArray(flashPool);
    flashIndex = 0;
    renderFlashcard();
}

function renderFlashcard() {
    if(!flashPool.length) return;
    const q = flashPool[flashIndex];
    document.getElementById('fcFront').textContent = q.text;
    const correct = (q.choices||[]).find(c => c.isCorrect);
    document.getElementById('fcBack').textContent = correct ? correct.text : '';
    document.getElementById('fcBack').classList.add('hidden');
    const grading = document.getElementById('fcGrading');
    if(grading) grading.classList.add('hidden');
}

function nextFlashcard(success) {
    if(success) {
        const q = flashPool[flashIndex];
        q.timesSeen = (q.timesSeen||0)+1;
        q.timesCorrect = (q.timesCorrect||0)+1;
        saveQ(q);
    }
    flashIndex = (flashIndex + 1) % flashPool.length;
    renderFlashcard();
}

function shuffleArray(arr) {
    for(let i=arr.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
}

// --- EXAM MODE ---
let examSession = {
    active:false,
    questions:[],
    index:0,
    answers:{},
};

function startExam() {
    const ch = document.getElementById('examChapterSelect').value;
    const count = Math.max(1, parseInt(document.getElementById('examCount').value||'40',10));
    let pool = App.questions.filter(q => q.choices && q.choices.length);
    if(ch) pool = pool.filter(q => q.chapter === ch);
    if(!pool.length) return alert("No questions for exam");

    shuffleArray(pool);
    examSession.active = true;
    examSession.questions = pool.slice(0, count);
    examSession.index = 0;
    examSession.answers = {};

    document.getElementById('examInterface').classList.remove('hidden');
    document.getElementById('examResults').classList.add('hidden');
    renderExamQ();
}

function renderExamQ() {
    const q = examSession.questions[examSession.index];
    const panel = document.getElementById('examQPanel');
    if(!q || !panel) return;
    let h = `<div style="margin-bottom:10px;"><strong>Q ${examSession.index+1}/${examSession.questions.length}</strong> [ID ${q.id}]</div>`;
    h += `<div style="margin-bottom:10px;">${q.text}</div>`;
    (q.choices||[]).forEach((c,i) => {
        const key = `q${q.id}`;
        const saved = examSession.answers[key];
        const selCls = (saved === i) ? ' selected' : '';
        h += `<div class="choice${selCls}" onclick="selectExamChoice(${i})">
            <b>${String.fromCharCode(65+i)}.</b> ${c.text}
        </div>`;
    });
    panel.innerHTML = h;
    safeSetText('examProgress', examSession.index+1);
}

window.selectExamChoice = function(i) {
    const q = examSession.questions[examSession.index];
    const key = `q${q.id}`;
    examSession.answers[key] = i;
    renderExamQ();
};

function examMove(step) {
    const newIndex = examSession.index + step;
    if(newIndex < 0 || newIndex >= examSession.questions.length) return;
    examSession.index = newIndex;
    renderExamQ();
}

function finishExam() {
    const total = examSession.questions.length;
    let correct = 0;
    examSession.questions.forEach(q => {
        const key = `q${q.id}`;
        const ans = examSession.answers[key];
        if(typeof ans === 'number') {
            const cIdx = q.choices.findIndex(c => c.isCorrect);
            if(ans === cIdx) correct++;
        }
    });
    const score = Math.round((correct/total)*100);
    safeSetText('examScore', `Score: ${correct}/${total} (${score}%)`);
    document.getElementById('examResults').classList.remove('hidden');
}

// --- EDIT MODAL ---
let editQ = null;

window.openEdit = function(id) {
    editQ = App.questions.find(q => q.id === id);
    if(!editQ) return;
    safeSetVal('editText', editQ.text || '');
    safeSetVal('editChapter', editQ.chapter || '');
    safeSetVal('editTags', editQ.tags || '');
    const radios = document.querySelectorAll('input[name="editIssueType"]');
    radios.forEach(r => { r.checked = (editQ.status||'none') === r.value; });
    safeSetVal('editExplanation', editQ.explanation || '');
    safeSetVal('editIssueNote', editQ.issueNote || '');

    const list = document.getElementById('editChoicesList');
    list.innerHTML = '';
    (editQ.choices||[]).forEach((c,i) => addEditChoice(c.text, c.isCorrect, i));

    document.getElementById('editModal').classList.remove('hidden');
};

function addEditChoice(text, isCorrect, idxOverride) {
    const list = document.getElementById('editChoicesList');
    const idx = typeof idxOverride === 'number' ? idxOverride : list.children.length;
    const row = document.createElement('div');
    row.className = 'edit-choice-row';
    row.innerHTML = `
        <input class="std-input edit-choice-text" data-idx="${idx}" value="${text||''}" style="width:75%;">
        <label style="font-size:0.8rem;">
           <input type="radio" name="editCorrect" value="${idx}" ${isCorrect?'checked':''}> Correct
        </label>
        <button class="tiny-btn danger" type="button" onclick="removeEditChoice(${idx})">✕</button>
    `;
    list.appendChild(row);
}

window.removeEditChoice = function(idx) {
    const list = document.getElementById('editChoicesList');
    const rows = Array.from(list.children);
    rows.forEach(r => {
        const inp = r.querySelector('.edit-choice-text');
        if(parseInt(inp.dataset.idx,10) === idx) {
            r.remove();
        }
    });
};

function saveEditModal() {
    if(!editQ) return;
    editQ.text = document.getElementById('editText').value || editQ.text;
    editQ.chapter = document.getElementById('editChapter').value || '';
    editQ.tags = document.getElementById('editTags').value || '';
    const radios = document.querySelectorAll('input[name="editIssueType"]');
    let status = 'none';
    radios.forEach(r => { if(r.checked) status = r.value; });
    editQ.status = status;
    editQ.explanation = document.getElementById('editExplanation').value || '';
    editQ.issueNote = document.getElementById('editIssueNote').value || '';

    const list = document.getElementById('editChoicesList');
    const rows = Array.from(list.children);
    const choices = [];
    let correctIndex = -1;
    const correctRadio = document.querySelector('input[name="editCorrect"]:checked');
    if(correctRadio) correctIndex = parseInt(correctRadio.value,10);

    rows.forEach((r,i) => {
        const text = r.querySelector('.edit-choice-text').value.trim();
        if(!text) return;
        choices.push({ text, isCorrect: i === correctIndex });
    });
    if(choices.length === 0) return alert("At least one choice is required");
    if(correctIndex < 0 || correctIndex >= choices.length) {
        return alert("Select which choice is correct");
    }
    editQ.choices = choices;
    saveQ(editQ);
    document.getElementById('editModal').classList.add('hidden');
    editQ = null;
    refreshUI();
}

// --- DASHBOARD ---
function refreshDashboard() {
    const total = App.questions.length;
    const maint = App.questions.filter(q => q.status === 'maintenance' || q.status === 'error').length;
    const mastered = App.questions.filter(q => (q.timesSeen||0) >= 3 && (q.timesWrong||0) === 0).length;
    const mastery = total ? Math.round((mastered/total)*100) : 0;

    safeSetText('dashTotal', total);
    safeSetText('dashMaint', maint);
    safeSetText('dashMastery', mastery + "%");

    const days = Math.max(1, (Date.now() - (App.user.createdAt || Date.now())) / (1000*60*60*24));
    const velocity = (total / days).toFixed(1);
    safeSetText('dashVelocity', velocity + "/day");
}

// --- TAB SWITCH ---
function switchTab(name) {
    document.querySelectorAll('.tab-button').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === name);
    });
    document.querySelectorAll('.tab-content').forEach(sec => {
        sec.classList.toggle('active', sec.id === 'tab-'+name);
    });
}

// Force reload helper
document.addEventListener('click', (e) => {
    if(e.target && e.target.id === 'btnForceReload') {
        location.reload(true);
    }
});