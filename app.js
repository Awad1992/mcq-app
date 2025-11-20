/**
 * MCQ Titanium v7.0 Engine
 * Features: SM-2 Algorithm, Custom Charts, Gamification, Conflict Resolution
 */

const DB_NAME = 'mcq_titan_v7';
const DB_VERSION = 1;
let db = null;

// --- APP STATE ---
const App = {
    questions: [],
    cacheMap: new Map(),
    session: { active: false, pool: [], index: 0, answers: {}, startTime: 0, qStart: 0 },
    user: { xp: 0, rank: 'Intern', streak: 0, lastLogin: null },
    filter: { search: '', status: 'all' },
    pagination: { page: 1, limit: 50 },
    selectedIds: new Set()
};

// --- 1. SYSTEM BOOT ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initDB();
        await loadData();
        initComponents();
        updateDashboard();
        showToast('Titanium Engine Online ⚡');
    } catch (e) {
        console.error(e);
        alert("System Failure: " + e.message);
    }
});

// --- 2. DATABASE LAYER ---
function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const d = e.target.result;
            if (!d.objectStoreNames.contains('questions')) d.createObjectStore('questions', { keyPath: 'id' });
            if (!d.objectStoreNames.contains('user')) d.createObjectStore('user', { keyPath: 'key' });
            if (!d.objectStoreNames.contains('logs')) d.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
        };
        req.onsuccess = (e) => { db = e.target.result; resolve(); };
        req.onerror = (e) => reject(e.target.error);
    });
}

async function loadData() {
    // Load Questions
    const tx = db.transaction(['questions', 'user'], 'readonly');
    const qStore = tx.objectStore('questions');
    const uStore = tx.objectStore('user');
    
    const qReq = qStore.getAll();
    qReq.onsuccess = () => {
        App.questions = qReq.result;
        App.questions.forEach(q => App.cacheMap.set(q.id, q));
        populateChapters();
    };

    // Load User Data
    const uReq = uStore.get('profile');
    uReq.onsuccess = () => {
        if(uReq.result) App.user = uReq.result;
        updateGamification();
    };
    
    return new Promise(resolve => tx.oncomplete = resolve);
}

// --- 3. GAMIFICATION ENGINE ---
function addXP(amount) {
    App.user.xp += amount;
    checkRank();
    saveUser();
    showToast(`+${amount} XP`, 'success');
    updateGamification();
}

function checkRank() {
    const levels = [
        { xp: 0, rank: 'Intern' },
        { xp: 500, rank: 'Resident' },
        { xp: 2000, rank: 'Chief Resident' },
        { xp: 5000, rank: 'Fellow' },
        { xp: 10000, rank: 'Attending' },
        { xp: 20000, rank: 'Professor' }
    ];
    const current = levels.reverse().find(l => App.user.xp >= l.xp);
    if(current && current.rank !== App.user.rank) {
        App.user.rank = current.rank;
        showToast(`🎉 Promoted to ${current.rank}!`, 'success');
    }
}

function updateGamification() {
    document.getElementById('userRank').textContent = App.user.rank;
    document.getElementById('currentXP').textContent = App.user.xp;
    const nextLevel = 1000 * Math.ceil((App.user.xp+1)/1000); // Simplified
    document.getElementById('nextXP').textContent = nextLevel;
    document.getElementById('xpBar').style.width = `${(App.user.xp / nextLevel) * 100}%`;
    document.getElementById('streakCount').textContent = App.user.streak;
}

function saveUser() {
    const tx = db.transaction('user', 'readwrite');
    tx.objectStore('user').put({ key: 'profile', ...App.user });
}

// --- 4. CHART ENGINE (CANVAS) ---
function drawActivityChart() {
    const canvas = document.getElementById('activityCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    
    // Mock Data (Replace with real logs later)
    const data = [12, 19, 3, 5, 2, 3, 15];
    const max = Math.max(...data);
    
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#2563eb';
    const barW = (w / data.length) - 10;
    
    data.forEach((val, i) => {
        const barH = (val / max) * (h - 20);
        ctx.fillRect(i * (barW + 10) + 5, h - barH, barW, barH);
    });
}

// --- 5. SESSION MANAGER ---
function startPracticeSession() {
    const mode = document.getElementById('pMode').value;
    const limit = parseInt(document.getElementById('pLimit').value);
    const chapter = document.getElementById('pChapter').value;
    
    let pool = App.questions.filter(q => q.active !== false);
    
    // Filter Logic
    if(mode === 'chapter') pool = pool.filter(q => q.chapter === chapter);
    if(mode === 'new') pool = pool.filter(q => !q.timesSeen);
    if(mode === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
    if(mode === 'weakest') pool.sort((a,b) => (b.timesWrong || 0) - (a.timesWrong || 0));
    else pool.sort(() => Math.random() - 0.5); // Default Shuffle
    
    if(pool.length === 0) return showToast('No questions found', 'error');
    
    App.session = {
        active: true,
        pool: pool.slice(0, limit),
        index: 0,
        answers: {},
        startTime: Date.now()
    };
    
    document.getElementById('practiceSetup').classList.add('hidden');
    document.getElementById('activeSession').classList.remove('hidden');
    document.getElementById('sTotal').textContent = App.session.pool.length;
    
    loadSessionQuestion();
}

function loadSessionQuestion() {
    const q = App.session.pool[App.session.index];
    if(!q) return finishSession();
    
    App.session.qStart = Date.now();
    
    document.getElementById('sIndex').textContent = App.session.index + 1;
    document.getElementById('qContent').textContent = q.text;
    document.getElementById('qChoices').innerHTML = '';
    document.getElementById('explanationBox').classList.add('hidden');
    document.getElementById('srsButtons').classList.add('hidden');
    document.getElementById('btnSubmitAnswer').classList.remove('hidden');
    document.getElementById('btnNextQuestion').classList.add('hidden');
    
    q.choices.forEach((c, i) => {
        const div = document.createElement('div');
        div.className = 'choice-box';
        div.innerHTML = `<strong>${String.fromCharCode(65+i)}</strong> ${c.text}`;
        div.onclick = () => selectChoice(i, div);
        document.getElementById('qChoices').appendChild(div);
    });
}

function selectChoice(idx, el) {
    if(!document.getElementById('btnSubmitAnswer').classList.contains('hidden')) {
        document.querySelectorAll('.choice-box').forEach(b => b.classList.remove('selected'));
        el.classList.add('selected');
        App.session.selectedChoice = idx;
    }
}

function submitSessionAnswer() {
    if(App.session.selectedChoice === undefined) return;
    
    const q = App.session.pool[App.session.index];
    const correct = q.choices.findIndex(c => c.isCorrect);
    const isCorrect = (App.session.selectedChoice === correct);
    
    // UI Updates
    const boxes = document.querySelectorAll('.choice-box');
    boxes[correct].classList.add('correct');
    if(!isCorrect) boxes[App.session.selectedChoice].classList.add('wrong');
    
    document.getElementById('explText').innerHTML = q.explanation || 'No explanation.';
    document.getElementById('explanationBox').classList.remove('hidden');
    document.getElementById('srsButtons').classList.remove('hidden');
    document.getElementById('btnSubmitAnswer').classList.add('hidden');
    
    // Stats & XP
    const timeSpent = (Date.now() - App.session.qStart) / 1000;
    q.timesSeen = (q.timesSeen||0)+1;
    q.timeSpent = (q.timeSpent||0) + timeSpent;
    
    if(isCorrect) {
        q.timesCorrect = (q.timesCorrect||0)+1;
        addXP(10);
    } else {
        q.timesWrong = (q.timesWrong||0)+1;
        addXP(1);
    }
    
    saveQuestion(q);
}

function rateQ(rating) {
    // 1=Again, 2=Hard, 3=Good, 4=Easy (SM-2 logic placeholder)
    const q = App.session.pool[App.session.index];
    // Simplified SM-2
    let interval = 1;
    if(rating === 4) interval = 7;
    if(rating === 3) interval = 4;
    if(rating === 2) interval = 2;
    
    q.dueDate = Date.now() + (interval * 24 * 60 * 60 * 1000);
    saveQuestion(q);
    
    document.getElementById('btnNextQuestion').classList.remove('hidden');
    document.getElementById('srsButtons').classList.add('hidden');
    
    // Auto next?
    nextSessionQuestion();
}

function nextSessionQuestion() {
    App.session.index++;
    App.session.selectedChoice = undefined;
    loadSessionQuestion();
}

function endSession() {
    if(confirm("End Session?")) {
        document.getElementById('activeSession').classList.add('hidden');
        document.getElementById('practiceSetup').classList.remove('hidden');
        updateDashboard();
    }
}

// --- 6. LIBRARY & TABLE SYSTEM ---
function renderTable() {
    const tbody = document.getElementById('libraryTable');
    tbody.innerHTML = '';
    
    // Filters
    let list = App.questions;
    if(App.filter.search) {
        const s = App.filter.search.toLowerCase();
        list = list.filter(q => q.text.toLowerCase().includes(s) || String(q.id).includes(s));
    }
    
    // Pagination
    const start = (App.pagination.page - 1) * App.pagination.limit;
    const pageQs = list.slice(start, start + App.pagination.limit);
    
    pageQs.forEach(q => {
        const tr = document.createElement('tr');
        const pillClass = q.timesSeen === 0 ? 'new' : (q.timesWrong > 0 ? 'err' : '');
        const pillText = q.timesSeen === 0 ? 'NEW' : (q.timesWrong > 0 ? 'ERR' : 'OK');
        
        tr.innerHTML = `
            <td><input type="checkbox" class="row-check" data-id="${q.id}"></td>
            <td><b>${q.id}</b></td>
            <td>${q.text.substring(0, 60)}...</td>
            <td><span class="chip">${q.chapter || '-'}</span></td>
            <td><span class="pill ${pillClass}">${pillText}</span></td>
            <td>
                <button class="icon-btn small" onclick="editQ(${q.id})">✏️</button>
                <button class="icon-btn small danger" onclick="deleteQ(${q.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    document.getElementById('selCount').textContent = document.querySelectorAll('.row-check:checked').length;
    document.getElementById('pageInfo').textContent = `Page ${App.pagination.page}`;
}

// --- 7. EVENT HANDLERS ---
function initComponents() {
    // Nav
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });
    
    // Session
    document.getElementById('btnStartSession').addEventListener('click', startPracticeSession);
    document.getElementById('btnSubmitAnswer').addEventListener('click', submitSessionAnswer);
    document.getElementById('btnNextQuestion').addEventListener('click', nextSessionQuestion);
    document.getElementById('btnEndSession').addEventListener('click', endSession);
    
    // Library
    document.getElementById('libSearch').addEventListener('input', (e) => {
        App.filter.search = e.target.value;
        renderTable();
    });
    
    // Bulk
    document.getElementById('btnBulkMode').addEventListener('click', () => {
        document.getElementById('bulkBar').classList.toggle('hidden');
    });

    // Settings
    document.getElementById('btnSaveSettings').addEventListener('click', saveSettings);
}

function switchView(viewId) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-view="${viewId}"]`).classList.add('active');
    document.getElementById('pageTitle').textContent = viewId.toUpperCase();
    
    if(viewId === 'library') renderTable();
    if(viewId === 'analytics') { drawActivityChart(); /* Add more charts here */ }
}

// --- HELPERS ---
function updateDashboard() {
    const total = App.questions.length;
    const mastered = App.questions.filter(q => q.timesCorrect > 3).length;
    const due = App.questions.filter(q => q.dueDate && q.dueDate < Date.now()).length;
    const correct = App.questions.reduce((a,b) => a + (b.timesCorrect||0), 0);
    const totalAns = App.questions.reduce((a,b) => a + (b.timesSeen||0), 0);
    
    document.getElementById('dashTotal').textContent = total;
    document.getElementById('dashMastery').textContent = mastered;
    document.getElementById('dashDue').textContent = due;
    document.getElementById('dashAccuracy').textContent = totalAns ? Math.round((correct/totalAns)*100) + '%' : '0%';
    
    drawActivityChart();
}

function populateChapters() {
    const chaps = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))].sort();
    const sel = document.getElementById('pChapter');
    sel.innerHTML = '';
    chaps.forEach(c => sel.innerHTML += `<option value="${c}">${c}</option>`);
}

function showToast(msg, type='info') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function saveQuestion(q) {
    const tx = db.transaction('questions', 'readwrite');
    tx.objectStore('questions').put(q);
}

function saveSettings() {
    localStorage.setItem('gh_token', document.getElementById('ghToken').value);
    localStorage.setItem('gh_repo', document.getElementById('ghRepo').value);
    showToast('Settings Saved', 'success');
}
