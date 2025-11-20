/**
 * MCQ Infinity v6.0 - The Professional Engine
 * Features: True SM-2 Algorithm, Session Wizard, Robust Library, Pro Dashboard.
 */

const DB_NAME = 'mcq_infinity_db';
const DB_VERSION = 1; // New Schema
let db = null;

// --- STATE MANAGEMENT ---
const App = {
  questions: [], // Cache
  session: {
    active: false,
    mode: 'tutor', // tutor, exam
    pool: [],
    index: 0,
    answers: {}, // { id: choiceIndex }
    startTime: null
  },
  filter: {
    search: '',
    status: 'all'
  },
  currentPage: 1,
  itemsPerPage: 20
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initDB();
    await loadCache();
    setupEvents();
    renderDashboard();
    showToast('Welcome to MCQ Infinity v6.0', 'info');
  } catch (e) {
    console.error(e);
    alert("Startup Failed: " + e.message);
  }
});

// --- DATABASE ENGINE (IndexedDB Wrapper) ---
function initDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('questions')) {
        const s = d.createObjectStore('questions', { keyPath: 'id' });
        s.createIndex('chapter', 'chapter', { unique: false });
      }
      if (!d.objectStoreNames.contains('history')) {
        const h = d.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
        h.createIndex('qid', 'questionId', { unique: false });
      }
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(); };
    req.onerror = (e) => reject(e.target.error);
  });
}

async function loadCache() {
  return new Promise(resolve => {
    const tx = db.transaction('questions', 'readonly');
    tx.objectStore('questions').getAll().onsuccess = (e) => {
      App.questions = e.target.result || [];
      updateWizardChapters();
      resolve();
    };
  });
}

// --- CORE: SM-2 ALGORITHM (The Brain) ---
function calculateSRS(q, quality) {
  // quality: 0-5 (we map user buttons to this: Again=1, Hard=3, Good=4, Easy=5)
  if (!q.srs) q.srs = { interval: 0, repetition: 0, ef: 2.5, dueDate: Date.now() };
  
  let { interval, repetition, ef } = q.srs;

  if (quality >= 3) {
    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 6;
    else interval = Math.round(interval * ef);
    repetition++;
  } else {
    repetition = 0;
    interval = 1;
  }

  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < 1.3) ef = 1.3;

  const dueDate = Date.now() + (interval * 24 * 60 * 60 * 1000);
  
  return { interval, repetition, ef, dueDate };
}

// --- NAVIGATION ---
function navigate(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.getElementById(`view-${viewId}`).classList.add('active');
  
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });

  document.getElementById('pageTitle').textContent = viewId.charAt(0).toUpperCase() + viewId.slice(1);
  
  if(viewId === 'library') renderLibrary();
  if(viewId === 'dashboard') renderDashboard();
}

// --- SESSION WIZARD ---
function openSessionWizard() {
  document.getElementById('modalWizard').classList.remove('hidden');
  updateWizardChapters();
}

function startSession() {
  const mode = document.querySelector('input[name="wizMode"]:checked').value;
  const poolType = document.getElementById('wizPool').value;
  const count = parseInt(document.getElementById('wizCount').value);
  const chapter = document.getElementById('wizChapter').value;

  // Filter Logic
  let pool = App.questions.filter(q => q.active !== false);
  
  if (chapter) pool = pool.filter(q => q.chapter === chapter);
  
  if (poolType === 'new') pool = pool.filter(q => !q.timesSeen);
  else if (poolType === 'wrong') pool = pool.filter(q => q.timesWrong > 0);
  else if (poolType === 'due') {
    const now = Date.now();
    pool = pool.filter(q => q.srs && q.srs.dueDate <= now);
  }

  if (pool.length === 0) return showToast('No questions match criteria.', 'error');

  // Randomize & Slice
  pool.sort(() => Math.random() - 0.5);
  pool = pool.slice(0, count);

  // Initialize Session
  App.session = {
    active: true,
    mode: mode,
    pool: pool,
    index: 0,
    answers: {}
  };

  document.getElementById('modalWizard').classList.add('hidden');
  navigate('session');
  renderSessionQuestion();
  document.getElementById('qModeBadge').textContent = mode.toUpperCase();
}

// --- SESSION RUNNER ---
function renderSessionQuestion() {
  const q = App.session.pool[App.session.index];
  if (!q) return;

  document.getElementById('qText').textContent = q.text;
  document.getElementById('qTimer').textContent = `${App.session.index + 1} / ${App.session.pool.length}`;
  document.getElementById('qUserNote').value = q.notes || '';

  // Image
  const imgArea = document.getElementById('qImageArea');
  if (q.imageUrl) {
    imgArea.innerHTML = `<img src="${q.imageUrl}">`;
    imgArea.classList.remove('hidden');
  } else {
    imgArea.classList.add('hidden');
  }

  // Choices
  const cContainer = document.getElementById('qChoices');
  cContainer.innerHTML = '';
  q.choices.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'choice-box';
    div.innerHTML = `<strong>${String.fromCharCode(65+i)}.</strong> ${c.text}`;
    div.onclick = () => selectChoice(i, div);
    // Right click to strike
    div.oncontextmenu = (e) => {
      e.preventDefault();
      div.classList.toggle('strikethrough');
    };
    cContainer.appendChild(div);
  });

  // Reset UI
  document.getElementById('feedbackArea').classList.add('hidden');
  document.getElementById('srsControls').classList.add('hidden');
  document.getElementById('btnSubmit').classList.remove('hidden');
  document.getElementById('btnNext').classList.add('hidden');
}

function selectChoice(idx, el) {
  if (document.getElementById('feedbackArea').classList.contains('hidden') === false) return; // Locked
  document.querySelectorAll('.choice-box').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  App.session.selectedChoice = idx;
}

function submitAnswer() {
  if (App.session.selectedChoice === undefined) return showToast('Select an answer', 'warning');
  
  const q = App.session.pool[App.session.index];
  const selected = App.session.selectedChoice;
  const correct = q.choices.findIndex(c => c.isCorrect);
  const isCorrect = (selected === correct);

  // Visual Feedback
  const choices = document.querySelectorAll('.choice-box');
  choices[correct].classList.add('correct');
  if (!isCorrect) choices[selected].classList.add('wrong');

  // Explanation
  const fb = document.getElementById('feedbackArea');
  fb.innerHTML = `<strong>${isCorrect ? 'Correct!' : 'Incorrect'}</strong><br>${q.explanation || 'No explanation.'}`;
  fb.classList.remove('hidden');

  // Buttons logic
  document.getElementById('btnSubmit').classList.add('hidden');
  document.getElementById('btnNext').classList.remove('hidden');

  // Save Basic Stats
  q.timesSeen = (q.timesSeen || 0) + 1;
  if (isCorrect) q.timesCorrect = (q.timesCorrect || 0) + 1;
  else q.timesWrong = (q.timesWrong || 0) + 1;

  // Show SRS if in Tutor Mode
  if (App.session.mode === 'tutor') {
    document.getElementById('srsControls').classList.remove('hidden');
  } else {
    // Auto-schedule basic if exam mode
    q.srs = calculateSRS(q, isCorrect ? 4 : 1);
    saveQuestion(q);
  }
  
  // Save to history
  saveHistory(q.id, isCorrect);
}

function handleSRS(rate) {
  const q = App.session.pool[App.session.index];
  q.srs = calculateSRS(q, rate);
  saveQuestion(q);
  nextQuestion();
}

function nextQuestion() {
  if (App.session.index < App.session.pool.length - 1) {
    App.session.index++;
    App.session.selectedChoice = undefined; // Reset selection
    renderSessionQuestion();
  } else {
    finishSession();
  }
}

function finishSession() {
  alert("Session Complete!");
  navigate('dashboard');
}

// --- LIBRARY & BUILDER ---
function renderLibrary() {
  const tbody = document.getElementById('libraryBody');
  tbody.innerHTML = '';
  
  const start = (App.currentPage - 1) * App.itemsPerPage;
  const pageQs = App.questions.slice(start, start + App.itemsPerPage); // Add filter logic here later

  pageQs.forEach(q => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${q.id}</td>
      <td>${q.text.substring(0, 60)}...</td>
      <td><span class="tag-pill">${q.chapter || 'Gen'}</span></td>
      <td>${q.timesSeen || 0} / ${q.timesWrong || 0}</td>
      <td><button onclick="editQ(${q.id})">✏️</button></td>
    `;
    tbody.appendChild(tr);
  });
  
  document.getElementById('libCount').textContent = `${App.questions.length} Total`;
}

// --- DATA OPS ---
function saveQuestion(q) {
  const tx = db.transaction('questions', 'readwrite');
  tx.objectStore('questions').put(q);
  // Update cache in place
  const idx = App.questions.findIndex(x => x.id === q.id);
  if (idx !== -1) App.questions[idx] = q;
}

function saveHistory(qid, isCorrect) {
  const tx = db.transaction('history', 'readwrite');
  tx.objectStore('history').add({ qid, isCorrect, date: new Date() });
}

// --- DASHBOARD CHART (CSS-based) ---
function renderDashboard() {
  const total = App.questions.length;
  const seen = App.questions.filter(q => q.timesSeen > 0).length;
  const due = App.questions.filter(q => q.srs && q.srs.dueDate <= Date.now()).length;
  const mastery = seen > 0 ? Math.round((App.questions.filter(q => q.timesCorrect > q.timesWrong).length / total) * 100) : 0;

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statMastery').textContent = mastery + '%';
  document.getElementById('statDue').textContent = due;

  // Activity Chart (Mock for now, can be real)
  const chart = document.getElementById('activityChart');
  chart.innerHTML = '';
  [30, 50, 20, 80, 45, 90, 60].forEach(h => {
    const bar = document.createElement('div');
    bar.style.height = h + '%';
    bar.style.width = '10%';
    bar.style.background = 'var(--primary)';
    bar.style.borderRadius = '4px';
    chart.appendChild(bar);
  });
}

// --- EVENTS SETUP ---
function setupEvents() {
  // Nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.view));
  });
  
  document.getElementById('btnNewSession').addEventListener('click', openSessionWizard);
  document.getElementById('startWizard').addEventListener('click', startSession);
  document.getElementById('closeWizard').addEventListener('click', () => document.getElementById('modalWizard').classList.add('hidden'));

  // Session
  document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
  document.getElementById('btnNext').addEventListener('click', nextQuestion);
  document.getElementById('btnExitSession').addEventListener('click', () => navigate('dashboard'));
  
  // SRS Buttons
  document.querySelectorAll('.srs-btn').forEach(btn => {
    btn.addEventListener('click', () => handleSRS(parseInt(btn.dataset.rate)));
  });

  // Theme
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  // Note Save
  document.getElementById('qUserNote').addEventListener('input', (e) => {
    const q = App.session.pool[App.session.index];
    q.notes = e.target.value;
    saveQuestion(q);
  });
}

// --- HELPERS ---
function showToast(msg, type) {
  const box = document.getElementById('toastBox');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  if (type === 'error') t.style.borderLeft = '4px solid red';
  box.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function updateWizardChapters() {
  const chaps = [...new Set(App.questions.map(q => q.chapter).filter(Boolean))];
  const sel = document.getElementById('wizChapter');
  sel.innerHTML = '<option value="">All Chapters</option>';
  chaps.forEach(c => sel.innerHTML += `<option value="${c}">${c}</option>`);
}
