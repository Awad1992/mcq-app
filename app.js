// MCQ Study App – IndexedDB engine with history, flags, modes

const DB_NAME = 'mcqdb_v2';
const DB_VERSION = 1;
let db = null;

let currentQuestion = null;
let currentChoices = [];
let currentMode = 'all';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;

const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterFilter = document.getElementById('chapterFilter');

modeSelect.addEventListener('change', () => {
  currentMode = modeSelect.value;
  if (currentMode === 'chapter') {
    chapterFilter.style.display = 'inline-block';
  } else {
    chapterFilter.style.display = 'none';
    currentChapter = '';
  }
  loadNextQuestion();
});

chapterFilter.addEventListener('change', () => {
  currentChapter = chapterFilter.value.trim();
  loadNextQuestion();
});

document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
document.getElementById('btnNext').addEventListener('click', () => {
  lastResult = null;
  feedbackPanel.innerHTML = '';
  loadNextQuestion();
});
document.getElementById('btnFlag').addEventListener('click', toggleFlag);
document.getElementById('btnImport').addEventListener('click', handleImport);
document.getElementById('btnExport').addEventListener('click', handleExport);

// --- IndexedDB init ---

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('questions')) {
        const store = db.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by_chapter', 'chapter', { unique: false });
      }
      if (!db.objectStoreNames.contains('answers')) {
        const ans = db.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        ans.createIndex('by_question', 'questionId', { unique: false });
        ans.createIndex('by_time', 'answeredAt', { unique: false });
      }
    };
    req.onsuccess = e => {
      db = e.target.result;
      resolve(db);
    };
    req.onerror = e => reject(e.target.error);
  });
}

function randomChoice(arr) {
  if (!arr.length) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

async function getStats() {
  const tx = db.transaction(['questions','answers'],'readonly');
  const qStore = tx.objectStore('questions');
  const stats = { total:0, flagged:0, withWrong:0, answered:0 };

  await new Promise(res=>{
    const req = qStore.getAll();
    req.onsuccess = e => {
      const all = e.target.result || [];
      stats.total = all.length;
      stats.flagged = all.filter(q=>q.flagged).length;
      stats.answered = all.filter(q=>q.timesSeen>0).length;
      stats.withWrong = all.filter(q=>q.timesWrong>0).length;
      res();
    };
  });

  return stats;
}

async function pickQuestion() {
  const tx = db.transaction('questions','readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res=>{
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
  if (!all.length) return null;

  let filtered = all.filter(q=>q.active !== false);

  if (currentMode === 'new') {
    filtered = filtered.filter(q=>!q.timesSeen);
  } else if (currentMode === 'wrong') {
    filtered = filtered.filter(q=>q.timesWrong>0);
  } else if (currentMode === 'flagged') {
    filtered = filtered.filter(q=>q.flagged);
  } else if (currentMode === 'chapter' && currentChapter) {
    filtered = filtered.filter(q=>(q.chapter||'').toLowerCase() === currentChapter.toLowerCase());
  }

  if (!filtered.length) filtered = all;

  // sort: least recently seen, least seen
  filtered.sort((a,b)=>{
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen||0)-(b.timesSeen||0);
    return as.localeCompare(bs);
  });

  const slice = filtered.slice(0, Math.min(filtered.length, 50));
  return randomChoice(slice);
}

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML = '<div class="muted">No questions in database yet. استخدم Import لإضافة أسئلة JSON.</div>';
    return;
  }
  const q = currentQuestion;
  const letters = ['A','B','C','D','E','F','G'];
  currentChoices = q.choices || [];

  let html = '';
  html += `<div class="q-text">Q#${q.id || ''} – ${q.text}</div>`;
  if (q.chapter || q.source) {
    html += '<div class="tag-chapter">';
    if (q.chapter) html += `<span>${q.chapter}</span>`;
    if (q.source) html += ` · <span>${q.source}</span>`;
    if (q.flagged) html += ` · <span class="pill pill-flag">FLAG</span>`;
    html += '</div>';
  }

  html += '<div style="margin-top:0.4rem;">';
  currentChoices.forEach((c, idx)=>{
    const letter = letters[idx] || '?';
    const checked = (idx === lastSelectedIndex) ? 'checked' : '';
    html += `<label class="choice">
      <input type="radio" name="choice" value="${idx}" ${checked}>
      <strong>${letter}.</strong> ${c.text}
    </label>`;
  });
  html += '</div>';

  questionPanel.innerHTML = html;
}

async function updateStatsBar() {
  const stats = await getStats();
  const el = document.getElementById('statsBar');
  el.innerHTML = `
    <div>Total: <strong>${stats.total}</strong></div>
    <div>Answered: <strong>${stats.answered}</strong></div>
    <div>Wrong ≥1: <strong>${stats.withWrong}</strong></div>
    <div>Flagged: <strong>${stats.flagged}</strong></div>
  `;
}

async function loadHistory() {
  const tx = db.transaction(['answers','questions'],'readonly');
  const aStore = tx.objectStore('answers');
  const qStore = tx.objectStore('questions');

  const allAns = await new Promise(res=>{
    const req = aStore.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });

  allAns.sort((a,b)=> (b.answeredAt||'').localeCompare(a.answeredAt||''));
  const recent = allAns.slice(0,40);

  const qMap = {};
  await Promise.all(recent.map(a=>{
    return new Promise(r=>{
      if (qMap[a.questionId]) return r();
      const req = qStore.get(a.questionId);
      req.onsuccess = e => { qMap[a.questionId]=e.target.result; r(); };
      req.onerror = ()=>r();
    });
  }));

  let html = '';
  recent.forEach(a=>{
    const q = qMap[a.questionId];
    if (!q) return;
    const label = (q.chapter || '').slice(0,16);
    html += `<div class="history-item" data-qid="${q.id}">
      <div>${(q.text||'').slice(0,80)}${q.text && q.text.length>80 ? '…' : ''}</div>
      <div class="muted">
        ${label ? `<span>${label}</span>` : ''}
        <span class="pill ${a.isCorrect ? 'pill-correct':'pill-wrong'}">${a.isCorrect ? 'Correct' : 'Wrong'}</span>
        ${q.flagged ? '<span class="pill pill-flag">Flag</span>' : ''}
      </div>
    </div>`;
  });

  historyListEl.innerHTML = html || '<div class="muted">No history yet.</div>';

  historyListEl.querySelectorAll('.history-item').forEach(item=>{
    item.addEventListener('click', async () => {
      const id = parseInt(item.getAttribute('data-qid'));
      const tx2 = db.transaction('questions','readonly');
      const store2 = tx2.objectStore('questions');
      const q = await new Promise(r=>{
        const rq = store2.get(id);
        rq.onsuccess = e => r(e.target.result);
        rq.onerror = ()=>r(null);
      });
      if (!q) return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = '';
      renderQuestion();
    });
  });
}

async function loadNextQuestion() {
  currentQuestion = await pickQuestion();
  lastResult = null;
  lastSelectedIndex = null;
  feedbackPanel.innerHTML = '';
  renderQuestion();
  updateStatsBar();
  loadHistory();
}

async function submitAnswer() {
  if (!currentQuestion) return;
  const radios = document.querySelectorAll('input[name="choice"]');
  let selectedIdx = null;
  radios.forEach(r=>{
    if (r.checked) selectedIdx = parseInt(r.value);
  });
  if (selectedIdx === null) {
    alert('اختر إجابة أولاً.');
    return;
  }
  lastSelectedIndex = selectedIdx;
  const correctIdx = (currentQuestion.choices || []).findIndex(c=>c.isCorrect);
  const isCorrect = (selectedIdx === correctIdx);

  const now = new Date().toISOString();

  const tx = db.transaction(['questions','answers'],'readwrite');
  const qStore = tx.objectStore('questions');
  const aStore = tx.objectStore('answers');

  const q = Object.assign({}, currentQuestion);
  q.timesSeen = (q.timesSeen || 0) + 1;
  q.timesCorrect = (q.timesCorrect || 0) + (isCorrect ? 1 : 0);
  q.timesWrong = (q.timesWrong || 0) + (isCorrect ? 0 : 1);
  q.lastSeenAt = now;
  qStore.put(q);

  aStore.add({
    questionId: q.id,
    answeredAt: now,
    selectedIndex: selectedIdx,
    isCorrect
  });

  tx.oncomplete = () => {
    currentQuestion = q;
    lastResult = isCorrect;
    showFeedback(correctIdx, selectedIdx, q.explanation);
    updateStatsBar();
    loadHistory();
  };
}

function showFeedback(correctIdx, selectedIdx, explanation) {
  const letters = ['A','B','C','D','E','F','G'];
  const q = currentQuestion;
  const choices = currentChoices;

  const choiceEls = document.querySelectorAll('.choice');
  choiceEls.forEach((el, idx)=>{
    el.classList.remove('correct','wrong','show');
    if (idx === correctIdx) { el.classList.add('correct','show'); }
    if (idx === selectedIdx && idx !== correctIdx) { el.classList.add('wrong','show'); }
  });

  let html = '';
  html += `<div style="margin-top:0.4rem;">`;
  if (lastResult) {
    html += `<div style="color:#a5d6a7; font-weight:600;">Correct ✅</div>`;
  } else {
    html += `<div style="color:#ff8a80; font-weight:600;">Wrong ❌</div>`;
  }
  if (correctIdx >= 0 && choices[correctIdx]) {
    html += `<div class="muted" style="margin-top:0.25rem;">Correct answer: <strong>${letters[correctIdx]}.</strong> ${choices[correctIdx].text}</div>`;
  }
  if (explanation) {
    html += `<div class="muted" style="margin-top:0.25rem;"><strong>Explanation:</strong> ${explanation}</div>`;
  }
  html += `</div>`;
  feedbackPanel.innerHTML = html;
}

async function toggleFlag() {
  if (!currentQuestion) return;
  const tx = db.transaction('questions','readwrite');
  const store = tx.objectStore('questions');
  const q = Object.assign({}, currentQuestion);
  q.flagged = !q.flagged;
  store.put(q);
  tx.oncomplete = () => {
    currentQuestion = q;
    renderQuestion();
    loadHistory();
    updateStatsBar();
  };
}

// Import / Export

function handleImport() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
    alert('اختر ملف JSON أولاً.');
    return;
  }
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('JSON should be an array of questions');
      const tx = db.transaction('questions','readwrite');
      const store = tx.objectStore('questions');
      data.forEach(q => {
        const obj = {
          text: q.text,
          chapter: q.chapter || '',
          source: q.source || '',
          explanation: q.explanation || '',
          choices: q.choices || [],
          timesSeen: 0,
          timesCorrect: 0,
          timesWrong: 0,
          lastSeenAt: null,
          flagged: !!q.flagged,
          active: q.active !== false
        };
        store.add(obj);
      });
      tx.oncomplete = () => {
        alert('Imported ' + data.length + ' questions.');
        loadNextQuestion();
      };
    } catch (err) {
      alert('Error reading JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

async function handleExport() {
  const tx = db.transaction('questions','readonly');
  const store = tx.objectStore('questions');
  const all = await new Promise(res=>{
    const req = store.getAll();
    req.onsuccess = e => res(e.target.result || []);
  });
  const data = all.map(q => ({
    id: q.id,
    text: q.text,
    chapter: q.chapter,
    source: q.source,
    explanation: q.explanation,
    choices: q.choices,
    flagged: !!q.flagged,
    active: q.active !== false
  }));
  const blob = new Blob([JSON.stringify(data,null,2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mcq_backup.json';
  a.click();
}

// Init
openDB().then(()=>{
  loadNextQuestion();
});
