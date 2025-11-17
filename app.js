// MCQ App Pro 2.0 – Offline + GitHub Cloud Sync
// ----------------------------------------------------
// IndexedDB + local history + GitHub backup.json
// ----------------------------------------------------

const DB_NAME = 'mcqdb_v2';
const DB_VERSION = 1;
let db = null;

// UI state
let currentQuestion = null;
let currentChoices = [];
let currentMode = 'all';
let currentChapter = '';
let lastSelectedIndex = null;
let lastResult = null;
let lastUndo = null; // {questionBefore, answerId}

// Cloud settings
let cloudSettings = {
  token: '',
  repo: '',
  autoSync: false,
  autoBackupMinutes: 60,
  autoPullMinutes: 10
};

let autoBackupTimer = null;
let autoPullTimer = null;
let debounceUploadTimer = null;

// Shorthands
const $ = (id) => document.getElementById(id);

// --- Init -------------------------------------------------------------

openDB().then(() => {
  loadSettingsFromLocal();
  wireUI();
  updateCloudStatusLine();
  updateStatsBar();
  loadHistory();
  loadNextQuestion();
  setupAutoTimers();
}).catch(err => {
  console.error(err);
  alert('Error opening local database: ' + err);
});

// --- IndexedDB --------------------------------------------------------

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains('questions')) {
        const qs = db.createObjectStore('questions', {
          keyPath: 'id',
          autoIncrement: true
        });
        qs.createIndex('by_chapter', 'chapter', { unique: false });
      }

      if (!db.objectStoreNames.contains('answers')) {
        const as = db.createObjectStore('answers', {
          keyPath: 'id',
          autoIncrement: true
        });
        as.createIndex('by_question', 'questionId', { unique: false });
        as.createIndex('by_time', 'answeredAt', { unique: false });
      }
    };

    req.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

// --- Helpers ----------------------------------------------------------

function randomChoice(arr) {
  if (!arr || !arr.length) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// --- Settings ---------------------------------------------------------

function loadSettingsFromLocal() {
  try {
    const raw = localStorage.getItem('mcq_settings_v2');
    if (!raw) return;

    const s = JSON.parse(raw);
    cloudSettings = Object.assign(cloudSettings, s);

    if (cloudSettings.token) $('githubToken').value = cloudSettings.token;
    if (cloudSettings.repo) $('githubRepo').value = cloudSettings.repo;
    $('autoSyncToggle').checked = !!cloudSettings.autoSync;
    $('autoBackupMinutes').value = cloudSettings.autoBackupMinutes || 60;
    $('autoPullMinutes').value = cloudSettings.autoPullMinutes || 10;
  } catch (e) {
    console.warn('Settings parse error', e);
  }
}

function saveSettingsToLocal() {
  cloudSettings.token = $('githubToken').value.trim();
  cloudSettings.repo = $('githubRepo').value.trim();
  cloudSettings.autoSync = $('autoSyncToggle').checked;
  cloudSettings.autoBackupMinutes = Math.max(
    5,
    parseInt($('autoBackupMinutes').value, 10) || 60
  );
  cloudSettings.autoPullMinutes = Math.max(
    5,
    parseInt($('autoPullMinutes').value, 10) || 10
  );

  localStorage.setItem('mcq_settings_v2', JSON.stringify(cloudSettings));
  updateCloudStatusLine();
  setupAutoTimers();
}

// --- UI wiring --------------------------------------------------------

function wireUI() {
  // Mode / filters
  $('modeSelect').addEventListener('change', () => {
    currentMode = $('modeSelect').value;
    if (currentMode === 'chapter') {
      $('chapterFilter').style.display = 'inline-block';
    } else {
      $('chapterFilter').style.display = 'none';
      currentChapter = '';
    }
    loadNextQuestion();
  });

  $('chapterFilter').addEventListener('input', () => {
    currentChapter = $('chapterFilter').value.trim();
    loadNextQuestion();
  });

  // Buttons
  $('btnSubmit').addEventListener('click', submitAnswer);
  $('btnNext').addEventListener('click', () => {
    lastResult = null;
    lastSelectedIndex = null;
    $('feedbackPanel').innerHTML = '';
    loadNextQuestion();
  });
  $('btnFlag').addEventListener('click', toggleFlag);
  $('btnImport').addEventListener('click', handleImport);
  $('btnExport').addEventListener('click', handleExport);
  $('btnSaveCloud').addEventListener('click', () => {
    saveSettingsToLocal();
    alert('Settings saved.');
  });

  // Cloud buttons
  $('btnUploadGitHub').addEventListener('click', () => uploadBackupToGitHub(true));
  $('btnDownloadGitHub').addEventListener('click', () => downloadBackupFromGitHub(true));
  $('btnUploadGitHub2').addEventListener('click', () => uploadBackupToGitHub(true));
  $('btnDownloadGitHub2').addEventListener('click', () => downloadBackupFromGitHub(true));

  // Undo / duplicate
  $('btnUndo').addEventListener('click', undoLastAnswer);
  $('btnDuplicate').addEventListener('click', duplicateCurrentQuestion);

  // Offline label
  if (navigator.onLine) {
    $('offlineStatus').textContent = 'Offline First';
  } else {
    $('offlineStatus').textContent = 'Offline (no network)';
  }
  window.addEventListener('online', () => $('offlineStatus').textContent = 'Offline First');
  window.addEventListener('offline', () => $('offlineStatus').textContent = 'Offline (no network)');
}

function updateCloudStatusLine(msgExtra) {
  const hasConfig = cloudSettings.token && cloudSettings.repo;
  let msg = hasConfig
    ? `Configured for repo ${cloudSettings.repo}. AutoSync: ${cloudSettings.autoSync ? 'ON' : 'OFF'}.`
    : 'Not configured. Fill token + repo then Save.';

  if (msgExtra) msg += ' – ' + msgExtra;
  $('cloudStatusLine').textContent = 'Status: ' + msg;
}

// --- Stats ------------------------------------------------------------

async function getStats() {
  const tx = db.transaction(['questions'], 'readonly');
  const qs = tx.objectStore('questions');

  const all = await new Promise(resolve => {
    const r = qs.getAll();
    r.onsuccess = e => resolve(e.target.result || []);
  });

  const total = all.length;
  const answered = all.filter(q => q.timesSeen > 0).length;
  const withWrong = all.filter(q => q.timesWrong > 0).length;
  const flagged = all.filter(q => q.flagged).length;
  const correctTotal = all.reduce((acc, q) => acc + (q.timesCorrect || 0), 0);
  const seenTotal = all.reduce((acc, q) => acc + (q.timesSeen || 0), 0);
  const accuracy = seenTotal ? Math.round((correctTotal / seenTotal) * 100) : 0;

  return { total, answered, withWrong, flagged, accuracy };
}

async function updateStatsBar() {
  const s = await getStats();

  $('statsBar').innerHTML = `
    <div>Total: <strong>${s.total}</strong></div>
    <div>Answered: <strong>${s.answered}</strong></div>
    <div>Wrong ≥1: <strong>${s.withWrong}</strong></div>
    <div>Flagged: <strong>${s.flagged}</strong></div>
    <div>Accuracy: <strong>${s.accuracy}%</strong></div>
  `;
}

// --- Question selection / rendering -----------------------------------

async function pickQuestion() {
  const tx = db.transaction('questions', 'readonly');
  const qs = tx.objectStore('questions');

  const all = await new Promise(resolve => {
    const r = qs.getAll();
    r.onsuccess = e => resolve(e.target.result || []);
  });

  if (!all.length) return null;

  let filtered = all.filter(q => q.active !== false);

  if (currentMode === 'new') {
    filtered = filtered.filter(q => !q.timesSeen);
  } else if (currentMode === 'wrong') {
    filtered = filtered.filter(q => q.timesWrong > 0);
  } else if (currentMode === 'flagged') {
    filtered = filtered.filter(q => q.flagged);
  } else if (currentMode === 'chapter' && currentChapter) {
    const key = currentChapter.toLowerCase();
    filtered = filtered.filter(q => (q.chapter || '').toLowerCase().includes(key));
  }

  if (!filtered.length) filtered = all;

  // Sort by lastSeen / timesSeen
  filtered.sort((a, b) => {
    const as = a.lastSeenAt || '';
    const bs = b.lastSeenAt || '';
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  const subset = filtered.slice(0, Math.min(filtered.length, 50));
  return randomChoice(subset);
}

async function loadNextQuestion() {
  currentQuestion = await pickQuestion();
  currentChoices = [];
  lastSelectedIndex = null;
  lastResult = null;
  $('feedbackPanel').innerHTML = '';

  if (!currentQuestion) {
    $('questionPanel').innerHTML =
      '<div class="muted">No questions available. استخدم Import لإضافة أسئلة JSON.</div>';
    updateStatsBar();
    loadHistory();
    return;
  }

  renderCurrentQuestion();
  updateStatsBar();
  loadHistory();
}

function renderCurrentQuestion() {
  if (!currentQuestion) return;

  const q = currentQuestion;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  currentChoices = q.choices || [];

  let html = '';
  html += `<div class="q-text">Q#${q.id || ''} – ${q.text}</div>`;

  if (q.chapter || q.source || q.flagged) {
    html += `<div class="tag-chapter">`;
    if (q.chapter) html += `<span>${q.chapter}</span>`;
    if (q.source) html += ` · <span>${q.source}</span>`;
    if (q.flagged) html += ` · <span class="pill pill-flag">FLAG</span>`;
    html += `</div>`;
  }

  html += `<div style="margin-top:0.4rem;">`;
  currentChoices.forEach((c, idx) => {
    const letter = letters[idx] || '?';
    const checked = idx === lastSelectedIndex ? 'checked' : '';
    html += `
      <label class="choice">
        <input type="radio" name="choice" value="${idx}" ${checked}>
        <strong>${letter}.</strong>&nbsp;${c.text}
      </label>`;
  });
  html += `</div>`;

  $('questionPanel').innerHTML = html;
}

// --- History ----------------------------------------------------------

async function loadHistory() {
  const tx = db.transaction(['answers', 'questions'], 'readonly');
  const as = tx.objectStore('answers');
  const qs = tx.objectStore('questions');

  const answers = await new Promise(resolve => {
    const r = as.getAll();
    r.onsuccess = e => resolve(e.target.result || []);
  });

  answers.sort((a, b) => (b.answeredAt || '').localeCompare(a.answeredAt || ''));
  const recent = answers.slice(0, 40);

  const qMap = {};
  await Promise.all(
    recent.map(a => new Promise(res => {
      if (qMap[a.questionId]) return res();
      const r = qs.get(a.questionId);
      r.onsuccess = e => {
        qMap[a.questionId] = e.target.result;
        res();
      };
      r.onerror = () => res();
    }))
  );

  if (!recent.length) {
    $('historyList').innerHTML = '<div class="muted small">No history yet.</div>';
    return;
  }

  let html = '';
  recent.forEach(a => {
    const q = qMap[a.questionId];
    if (!q) return;
    const snippet = (q.text || '').slice(0, 80) + (q.text && q.text.length > 80 ? '…' : '');
    const chap = (q.chapter || '').slice(0, 18);
    html += `
      <div class="history-item" data-qid="${q.id}">
        <div>${snippet}</div>
        <div class="muted">
          ${chap ? `<span>${chap}</span>` : ''}
          <span class="pill ${a.isCorrect ? 'pill-correct':'pill-wrong'}">
            ${a.isCorrect ? 'Correct' : 'Wrong'}
          </span>
          ${q.flagged ? '<span class="pill pill-flag">Flag</span>' : ''}
        </div>
      </div>`;
  });

  $('historyList').innerHTML = html;

  Array.from(document.querySelectorAll('.history-item')).forEach(el => {
    el.addEventListener('click', async () => {
      const id = parseInt(el.getAttribute('data-qid'), 10);
      const tx2 = db.transaction('questions', 'readonly');
      const qs2 = tx2.objectStore('questions');
      const q = await new Promise(res => {
        const r = qs2.get(id);
        r.onsuccess = e => res(e.target.result);
        r.onerror = () => res(null);
      });
      if (!q) return;
      currentQuestion = q;
      lastSelectedIndex = null;
      lastResult = null;
      $('feedbackPanel').innerHTML = '';
      renderCurrentQuestion();
    });
  });
}

// --- Answering / Undo / Flag / Duplicate ------------------------------

async function submitAnswer() {
  if (!currentQuestion) return;

  const radios = document.querySelectorAll('input[name="choice"]');
  let selectedIdx = null;
  radios.forEach(r => {
    if (r.checked) selectedIdx = parseInt(r.value, 10);
  });

  if (selectedIdx === null) {
    alert('اختر إجابة أولاً.');
    return;
  }

  lastSelectedIndex = selectedIdx;
  const choices = currentQuestion.choices || [];
  const correctIdx = choices.findIndex(c => c.isCorrect);
  const isCorrect = selectedIdx === correctIdx;
  const now = new Date().toISOString();

  const prevQ = deepClone(currentQuestion);

  const tx = db.transaction(['questions', 'answers'], 'readwrite');
  const qs = tx.objectStore('questions');
  const as = tx.objectStore('answers');

  const q = Object.assign({}, currentQuestion);
  q.timesSeen = (q.timesSeen || 0) + 1;
  q.timesCorrect = (q.timesCorrect || 0) + (isCorrect ? 1 : 0);
  q.timesWrong = (q.timesWrong || 0) + (isCorrect ? 0 : 1);
  q.lastSeenAt = now;

  qs.put(q);

  const answerRecord = {
    questionId: q.id,
    answeredAt: now,
    selectedIndex: selectedIdx,
    isCorrect
  };

  const addReq = as.add(answerRecord);
  addReq.onsuccess = (e) => {
    const answerId = e.target.result;
    lastUndo = {
      questionBefore: prevQ,
      answerId
    };
  };

  tx.oncomplete = () => {
    currentQuestion = q;
    lastResult = isCorrect;
    showFeedback(correctIdx, selectedIdx, q.explanation);
    updateStatsBar();
    loadHistory();
    triggerDebouncedUpload(); // cloud sync
  };
}

function showFeedback(correctIdx, selectedIdx, explanation) {
  const letters = ['A','B','C','D','E','F','G'];
  const choices = currentChoices;

  const choiceEls = document.querySelectorAll('.choice');
  choiceEls.forEach((el, idx) => {
    el.classList.remove('correct', 'wrong', 'show');
    if (idx === correctIdx) el.classList.add('correct', 'show');
    if (idx === selectedIdx && idx !== correctIdx) el.classList.add('wrong', 'show');
  });

  let html = '<div>';
  if (lastResult) {
    html += `<div style="color:#a5d6a7;font-weight:600;">Correct ✅</div>`;
  } else {
    html += `<div style="color:#ff8a80;font-weight:600;">Wrong ❌</div>`;
  }

  if (correctIdx >= 0 && choices[correctIdx]) {
    html += `<div class="muted" style="margin-top:0.25rem;">
      Correct answer: <strong>${letters[correctIdx]}.</strong> ${choices[correctIdx].text}
    </div>`;
  }

  if (explanation) {
    html += `<div class="muted" style="margin-top:0.25rem;">
      <strong>Explanation:</strong> ${explanation}
    </div>`;
  }

  html += '</div>';
  $('feedbackPanel').innerHTML = html;
}

async function undoLastAnswer() {
  if (!lastUndo) {
    alert('لا يوجد جواب للتراجع عنه.');
    return;
  }

  const { questionBefore, answerId } = lastUndo;

  const tx = db.transaction(['questions', 'answers'], 'readwrite');
  const qs = tx.objectStore('questions');
  const as = tx.objectStore('answers');

  if (answerId != null) as.delete(answerId);
  if (questionBefore && questionBefore.id != null) qs.put(questionBefore);

  tx.oncomplete = () => {
    currentQuestion = questionBefore;
    lastUndo = null;
    lastResult = null;
    lastSelectedIndex = null;
    $('feedbackPanel').innerHTML = '<div class="muted small">تم التراجع عن آخر إجابة.</div>';
    renderCurrentQuestion();
    updateStatsBar();
    loadHistory();
    triggerDebouncedUpload();
  };
}

async function toggleFlag() {
  if (!currentQuestion) return;

  const tx = db.transaction('questions', 'readwrite');
  const qs = tx.objectStore('questions');
  const q = Object.assign({}, currentQuestion);
  q.flagged = !q.flagged;
  qs.put(q);

  tx.oncomplete = () => {
    currentQuestion = q;
    renderCurrentQuestion();
    loadHistory();
    updateStatsBar();
    triggerDebouncedUpload();
  };
}

async function duplicateCurrentQuestion() {
  if (!currentQuestion) return;
  const src = currentQuestion;

  const tx = db.transaction('questions', 'readwrite');
  const qs = tx.objectStore('questions');

  const copy = {
    text: src.text,
    chapter: src.chapter || '',
    source: src.source || '',
    explanation: src.explanation || '',
    choices: deepClone(src.choices || []),
    flagged: false,
    active: src.active !== false,
    timesSeen: 0,
    timesCorrect: 0,
    timesWrong: 0,
    lastSeenAt: null
  };

  qs.add(copy);
  tx.oncomplete = () => {
    alert('Question duplicated.');
    updateStatsBar();
  };
}

// --- Import / Export (local JSON) ------------------------------------

function handleImport() {
  const file = $('fileInput').files[0];
  if (!file) {
    alert('اختر ملف JSON أولاً.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('JSON should be an array of questions.');

      const tx = db.transaction('questions', 'readwrite');
      const qs = tx.objectStore('questions');

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
        qs.add(obj);
      });

      tx.oncomplete = () => {
        alert('Imported ' + data.length + ' questions.');
        loadNextQuestion();
        triggerDebouncedUpload();
      };
    } catch (err) {
      alert('Error reading JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

async function handleExport() {
  const backup = await buildBackupObject();
  const blob = new Blob([JSON.stringify(backup.questions, null, 2)], {
    type: 'application/json'
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mcq_backup_questions_only.json';
  a.click();
}

// --- Cloud Sync (GitHub) ---------------------------------------------

function hasCloudConfig() {
  return !!(cloudSettings.token && cloudSettings.repo);
}

function setCloudChip(text, color) {
  const chip = $('cloudStatusChip');
  chip.textContent = 'Cloud Sync: ' + text;
  if (color === 'ok') {
    chip.style.color = '#42a5f5';
    chip.style.borderColor = '#42a5f5';
  } else if (color === 'busy') {
    chip.style.color = '#ffca28';
    chip.style.borderColor = '#ffca28';
  } else if (color === 'err') {
    chip.style.color = '#ef5350';
    chip.style.borderColor = '#ef5350';
  } else {
    chip.style.color = '#42a5f5';
    chip.style.borderColor = '#42a5f5';
  }
}

function textToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function base64ToText(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

async function buildBackupObject() {
  const tx = db.transaction(['questions', 'answers'], 'readonly');
  const qs = tx.objectStore('questions');
  const as = tx.objectStore('answers');

  const questions = await new Promise(res => {
    const r = qs.getAll();
    r.onsuccess = e => res(e.target.result || []);
  });

  const answers = await new Promise(res => {
    const r = as.getAll();
    r.onsuccess = e => res(e.target.result || []);
  });

  return {
    version: 2,
    generatedAt: new Date().toISOString(),
    questions,
    answers
  };
}

async function restoreBackupObject(obj) {
  const questions = Array.isArray(obj)
    ? obj
    : (obj && Array.isArray(obj.questions) ? obj.questions : []);
  const answers = obj && Array.isArray(obj.answers) ? obj.answers : [];

  const tx = db.transaction(['questions', 'answers'], 'readwrite');
  const qs = tx.objectStore('questions');
  const as = tx.objectStore('answers');

  qs.clear();
  as.clear();

  questions.forEach(q => qs.add(q));
  answers.forEach(a => as.add(a));

  return new Promise(res => {
    tx.oncomplete = () => res();
  });
}

async function githubGetFile() {
  if (!hasCloudConfig()) throw new Error('Cloud not configured.');
  const [owner, repo] = cloudSettings.repo.split('/');
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/backup.json`;

  const r = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${cloudSettings.token}`
    }
  });

  if (r.status === 404) return null;
  if (!r.ok) throw new Error('GitHub GET failed: ' + r.status);

  return await r.json(); // {content, sha, ...}
}

async function githubPutFile(contentText, message) {
  if (!hasCloudConfig()) throw new Error('Cloud not configured.');
  const [owner, repo] = cloudSettings.repo.split('/');
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/backup.json`;

  let sha = null;
  const existing = await githubGetFile().catch(() => null);
  if (existing && existing.sha) sha = existing.sha;

  const body = {
    message: message || 'MCQ backup update',
    content: textToBase64(contentText)
  };
  if (sha) body.sha = sha;

  const r = await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${cloudSettings.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!r.ok) throw new Error('GitHub PUT failed: ' + r.status);
  return await r.json();
}

async function uploadBackupToGitHub(showAlert) {
  if (!hasCloudConfig()) {
    if (showAlert) alert('Cloud not configured. Fill token + repo then Save.');
    return;
  }

  try {
    setCloudChip('uploading…', 'busy');
    const backupObj = await buildBackupObject();
    const json = JSON.stringify(backupObj, null, 2);
    await githubPutFile(json, 'MCQ backup upload');
    setCloudChip('ok (uploaded)', 'ok');
    updateCloudStatusLine('Last upload: ' + new Date().toLocaleString());
    if (showAlert) alert('Backup uploaded to GitHub.');
  } catch (err) {
    console.error(err);
    setCloudChip('error', 'err');
    if (showAlert) alert('Upload failed: ' + err.message);
  }
}

async function downloadBackupFromGitHub(showAlert) {
  if (!hasCloudConfig()) {
    if (showAlert) alert('Cloud not configured. Fill token + repo then Save.');
    return;
  }

  try {
    setCloudChip('downloading…', 'busy');
    const file = await githubGetFile();
    if (!file || !file.content) {
      setCloudChip('no backup', 'err');
      if (showAlert) alert('No backup.json found in repo.');
      return;
    }
    const text = base64ToText(file.content);
    const obj = JSON.parse(text);
    await restoreBackupObject(obj);
    setCloudChip('ok (downloaded)', 'ok');
    updateCloudStatusLine('Last download: ' + new Date().toLocaleString());
    if (showAlert) alert('Backup downloaded and restored.');
    loadNextQuestion();
  } catch (err) {
    console.error(err);
    setCloudChip('error', 'err');
    if (showAlert) alert('Download failed: ' + err.message);
  }
}

// Debounced upload after changes
function triggerDebouncedUpload() {
  if (!cloudSettings.autoSync || !hasCloudConfig()) return;
  if (debounceUploadTimer) clearTimeout(debounceUploadTimer);
  debounceUploadTimer = setTimeout(() => {
    uploadBackupToGitHub(false);
    debounceUploadTimer = null;
  }, 15000); // 15 seconds
}

function setupAutoTimers() {
  if (autoBackupTimer) clearInterval(autoBackupTimer);
  if (autoPullTimer) clearInterval(autoPullTimer);

  if (cloudSettings.autoSync && hasCloudConfig()) {
    const backupMs = (cloudSettings.autoBackupMinutes || 60) * 60 * 1000;
    const pullMs = (cloudSettings.autoPullMinutes || 10) * 60 * 1000;

    autoBackupTimer = setInterval(() => {
      uploadBackupToGitHub(false);
    }, backupMs);

    autoPullTimer = setInterval(() => {
      downloadBackupFromGitHub(false);
    }, pullMs);
  }
}
