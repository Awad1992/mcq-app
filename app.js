
// MCQ Study App v3.6
// Local-first, IndexedDB-backed, with practice + maintenance + settings.

const DB_NAME = 'mcq_app_db_v36';
const DB_VERSION = 1;
const STORE_NAME = 'questions';

let db;
let currentQuestion = null;
let currentMode = 'all';
let currentChapterFilter = '';
let history = [];
let autoBackupTimer = null;

function log(...args) {
  console.log('[MCQ]', ...args);
}

// ---------- IndexedDB helpers ----------

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (ev) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('chapter', 'chapter', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
        store.createIndex('flagged', 'flagged', { unique: false });
        store.createIndex('active', 'active', { unique: false });
      }
    };
    req.onsuccess = () => {
      db = req.result;
      resolve(db);
    };
    req.onerror = () => reject(req.error);
  });
}

function getStore(mode = 'readonly') {
  const tx = db.transaction(STORE_NAME, mode);
  return tx.objectStore(STORE_NAME);
}

function getAllQuestions() {
  return new Promise((resolve, reject) => {
    const store = getStore('readonly');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

function putQuestion(q) {
  return new Promise((resolve, reject) => {
    const store = getStore('readwrite');
    const req = store.put(q);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function deleteQuestion(id) {
  return new Promise((resolve, reject) => {
    const store = getStore('readwrite');
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ---------- UI helpers ----------

function $(id) {
  return document.getElementById(id);
}

function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function renderStats(questions) {
  const statsBar = $('statsBar');
  if (!statsBar) return;
  const total = questions.length;
  const active = questions.filter(q => q.active !== false).length;
  const flagged = questions.filter(q => q.flagged).length;
  const wrongCount = questions.filter(q => q.wrongCount && q.wrongCount > 0).length;
  statsBar.innerHTML = '';
  const make = (label, val) => {
    const div = document.createElement('div');
    div.className = 'stat-pill';
    div.textContent = `${label}: ${val}`;
    statsBar.appendChild(div);
  };
  make('Total', total);
  make('Active', active);
  make('Flagged', flagged);
  make('Ever wrong', wrongCount);
}

function renderHistory() {
  const list = $('historyList');
  if (!list) return;
  list.innerHTML = '';
  history.slice(-20).reverse().forEach(h => {
    const div = document.createElement('div');
    div.className = 'history-item ' + (h.correct ? 'correct' : 'wrong');
    div.textContent = `${h.when} · Q${h.id} · ${h.chapter || ''} · ${h.correct ? '✓' : '✗'}`;
    list.appendChild(div);
  });
}

// ---------- Practice logic ----------

async function loadNextQuestion() {
  const questions = await getAllQuestions();
  renderStats(questions);

  let pool = questions.filter(q => q.active !== false);
  if (currentMode === 'new') {
    pool = pool.filter(q => !q.seen);
  } else if (currentMode === 'wrong') {
    pool = pool.filter(q => q.wrongCount && q.wrongCount > 0);
  } else if (currentMode === 'flagged') {
    pool = pool.filter(q => q.flagged);
  } else if (currentMode === 'chapter' && currentChapterFilter.trim() !== '') {
    const target = currentChapterFilter.trim().toLowerCase();
    pool = pool.filter(q => (q.chapter || '').toLowerCase() === target);
  }

  if (!pool.length) {
    $('questionPanel').innerHTML = '<div class="muted">No questions match this mode/filter.</div>';
    $('feedbackPanel').innerHTML = '';
    currentQuestion = null;
    return;
  }

  const q = pool[Math.floor(Math.random() * pool.length)];
  currentQuestion = q;

  q.seen = true;
  q.updatedAt = q.updatedAt || new Date().toISOString();
  await putQuestion(q);

  renderQuestion(q);
  $('feedbackPanel').innerHTML = '';
}

function renderQuestion(q) {
  const panel = $('questionPanel');
  if (!panel) return;

  const chapter = q.chapter ? `<div class="muted small-text">Chapter: ${q.chapter}</div>` : '';
  const source = q.source ? `<div class="muted small-text">Source: ${q.source}</div>` : '';
  const wrongInfo = q.wrongCount ? `<div class="muted small-text">Wrong attempts: ${q.wrongCount}</div>` : '';

  let html = `
    <h2 style="font-size:1rem; margin:0 0 0.4rem;">Q${q.id || ''}: ${q.text}</h2>
    ${chapter}
    ${source}
    ${wrongInfo}
    <div style="margin-top:0.4rem;">
  `;

  (q.options || q.choices || []).forEach((opt, idx) => {
    const label = typeof opt === 'string' ? opt : opt.text;
    html += `
      <label class="answer-option">
        <input type="radio" name="answer" value="${idx}">
        <span>${label}</span>
      </label>
    `;
  });

  html += '</div>';
  panel.innerHTML = html;

  const btnFlag = $('btnFlag');
  if (btnFlag) {
    btnFlag.textContent = q.flagged ? 'Unflag' : 'Flag';
  }
}

async function submitAnswer() {
  if (!currentQuestion) return;
  const radios = document.querySelectorAll('input[name="answer"]');
  let selectedIndex = -1;
  radios.forEach(r => {
    if (r.checked) selectedIndex = parseInt(r.value, 10);
  });
  if (selectedIndex === -1) {
    alert('Choose an option first.');
    return;
  }

  const q = currentQuestion;
  const opts = q.options || q.choices || [];
  const correctIndex = opts.findIndex(o => o.isCorrect);
  const correct = selectedIndex === correctIndex;

  q.totalAttempts = (q.totalAttempts || 0) + 1;
  if (!correct) {
    q.wrongCount = (q.wrongCount || 0) + 1;
  }
  q.updatedAt = new Date().toISOString();
  await putQuestion(q);

  const fb = $('feedbackPanel');
  if (fb) {
    const correctText = correct ? 'Correct ✅' : 'Wrong ❌';
    let explanation = q.explanation || '';
    if (!explanation && q.rationale) explanation = q.rationale;
    if (!explanation) explanation = 'No explanation provided in JSON.';
    fb.innerHTML = `
      <div style="font-weight:600; margin-bottom:0.25rem;">${correctText}</div>
      <div class="small-text">${explanation}</div>
      <div style="margin-top:0.4rem;" class="small-text muted">
        Correct option: ${correctIndex >= 0 ? String.fromCharCode(65 + correctIndex) : '-'}
      </div>
    `;
  }

  history.push({
    id: q.id,
    chapter: q.chapter || '',
    correct,
    when: new Date().toLocaleTimeString()
  });
  renderHistory();

  const questionPanel = $('questionPanel');
  if (questionPanel) {
    const optsEls = questionPanel.querySelectorAll('.answer-option');
    optsEls.forEach((el, idx) => {
      if (idx === correctIndex) {
        el.classList.add('correct');
      } else if (idx === selectedIndex && !correct) {
        el.classList.add('wrong');
      }
    });
  }

  const questions = await getAllQuestions();
  renderStats(questions);
}

// ---------- Tabs ----------

function setActiveTab(tabId) {
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === tabId);
  });
}

// ---------- Import / Export ----------

function normalizeQuestion(raw) {
  const now = new Date().toISOString();
  const base = {
    text: raw.text || raw.question || '',
    chapter: raw.chapter || '',
    source: raw.source || '',
    explanation: raw.explanation || raw.explain || '',
    flagged: !!raw.flagged,
    active: raw.active !== false,
    createdAt: raw.createdAt || now,
    updatedAt: raw.updatedAt || now,
    wrongCount: raw.wrongCount || 0,
    totalAttempts: raw.totalAttempts || 0
  };

  let options = raw.options || raw.choices || [];
  if (!Array.isArray(options)) options = [];
  options = options.map(o => {
    if (typeof o === 'string') return { text: o, isCorrect: false };
    return { text: o.text || '', isCorrect: !!o.isCorrect };
  });

  if (!options.some(o => o.isCorrect) && typeof raw.correctIndex === 'number') {
    options = options.map((o, idx) => ({ ...o, isCorrect: idx === raw.correctIndex }));
  }

  return { ...raw, ...base, options };
}

async function mergeQuestions(imported) {
  const storeQuestions = await getAllQuestions();
  const byId = new Map();
  storeQuestions.forEach(q => byId.set(q.id, q));

  const now = new Date().toISOString();
  let created = 0;
  let updated = 0;

  for (const raw of imported) {
    const norm = normalizeQuestion(raw);
    if (norm.id && byId.has(norm.id)) {
      const existing = byId.get(norm.id);
      const existingTime = existing.updatedAt || existing.createdAt || now;
      const newTime = norm.updatedAt || norm.createdAt || now;
      if (new Date(newTime) > new Date(existingTime)) {
        norm.id = existing.id;
        await putQuestion(norm);
        updated++;
      }
    } else {
      delete norm.id;
      const id = await putQuestion(norm);
      norm.id = id;
      created++;
    }
  }

  const questions = await getAllQuestions();
  renderStats(questions);
  alert(`Import finished. New: ${created}, Updated: ${updated}. Existing newer entries preserved.`);
}

function handleFileImport() {
  const input = $('fileInput');
  if (!input || !input.files || !input.files[0]) {
    alert('Pick a JSON file first.');
    return;
  }
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = async (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!Array.isArray(data)) {
        alert('JSON must be an array of questions.');
        return;
      }
      await mergeQuestions(data);
    } catch (e) {
      console.error(e);
      alert('Failed to parse JSON.');
    }
  };
  reader.readAsText(file);
}

async function handleUrlImport() {
  const url = $('urlInput').value.trim();
  if (!url) {
    alert('Enter a URL.');
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (!Array.isArray(data)) {
      alert('URL JSON must be an array of questions.');
      return;
    }
    await mergeQuestions(data);
  } catch (e) {
    console.error(e);
    alert('Failed to fetch/parse JSON from URL.');
  }
}

async function exportLocalBackup() {
  const questions = await getAllQuestions();
  const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  a.href = URL.createObjectURL(blob);
  a.download = `mcq-backup-${ts}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

// ---------- GitHub backup ----------

function loadSettings() {
  const raw = localStorage.getItem('mcq_settings_v36');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveSettingsToStorage(settings) {
  localStorage.setItem('mcq_settings_v36', JSON.stringify(settings));
}

function applySettingsToUI() {
  const s = loadSettings();
  $('ghTokenInput').value = s.token || '';
  $('ghRepoInput').value = s.repo || '';
  $('ghFileInput').value = s.file || 'mcq-backup.json';
  $('autoBackupCheckbox').checked = !!s.autoBackup;
  const info = s.lastBackupAt ? `Last backup: ${s.lastBackupAt}` : 'No backup yet';
  setText('lastBackupInfo', info);
}

function collectSettingsFromUI() {
  return {
    token: $('ghTokenInput').value.trim(),
    repo: $('ghRepoInput').value.trim(),
    file: $('ghFileInput').value.trim() || 'mcq-backup.json',
    autoBackup: $('autoBackupCheckbox').checked,
    lastBackupAt: loadSettings().lastBackupAt || null
  };
}

async function backupToGitHub(showAlerts = true) {
  const s = loadSettings();
  if (!s.token || !s.repo || !s.file) {
    if (showAlerts) alert('Set token, repo, and filename first in Settings.');
    return;
  }
  const [owner, repo] = s.repo.split('/');
  if (!owner || !repo) {
    if (showAlerts) alert('Repo must be in form owner/name.');
    return;
  }
  const questions = await getAllQuestions();
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(questions, null, 2))));

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(s.file)}`;

  let sha = null;
  try {
    const headRes = await fetch(url, {
      headers: { Authorization: `Bearer ${s.token}`, Accept: 'application/vnd.github+json' }
    });
    if (headRes.ok) {
      const meta = await headRes.json();
      sha = meta.sha;
    }
  } catch (e) {
    console.error('HEAD failed (non-fatal):', e);
  }

  const body = {
    message: 'MCQ backup ' + new Date().toISOString(),
    content,
    sha: sha || undefined
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${s.token}`,
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    console.error('Backup error', await res.text());
    if (showAlerts) alert('GitHub backup failed.');
    return;
  }

  const now = new Date().toISOString();
  const updated = { ...s, lastBackupAt: now };
  saveSettingsToStorage(updated);
  applySettingsToUI();
  if (showAlerts) alert('Backup completed.');
}

function setupAutoBackup() {
  if (autoBackupTimer) {
    clearInterval(autoBackupTimer);
    autoBackupTimer = null;
  }
  const s = loadSettings();
  if (s.autoBackup) {
    autoBackupTimer = setInterval(() => backupToGitHub(false), 60 * 1000);
  }
}

// ---------- Maintenance ----------

function filterQuestionsForMaintenance(all) {
  const text = $('mSearchText').value.trim().toLowerCase();
  const chapterExact = $('mChapterExact').value.trim().toLowerCase();
  const flagFilter = $('mFlagFilter').value;
  const statusFilter = $('mStatusFilter').value;

  return all.filter(q => {
    if (text && !(q.text || '').toLowerCase().includes(text)) return false;
    if (chapterExact && (q.chapter || '').toLowerCase() !== chapterExact) return false;
    if (flagFilter === 'flagged' && !q.flagged) return false;
    if (flagFilter === 'unflagged' && q.flagged) return false;
    if (statusFilter === 'active' && q.active === false) return false;
    if (statusFilter === 'inactive' && q.active !== false) return false;
    return true;
  });
}

function sortQuestionsForMaintenance(list) {
  const sortBy = $('mSortBy').value;
  const copy = [...list];
  copy.sort((a, b) => {
    if (sortBy === 'chapter') {
      return (a.chapter || '').localeCompare(b.chapter || '');
    } else if (sortBy === 'createdAt') {
      return (a.createdAt || '').localeCompare(b.createdAt || '');
    } else if (sortBy === 'updatedAt') {
      return (a.updatedAt || '').localeCompare(b.updatedAt || '');
    } else {
      return (a.id || 0) - (b.id || 0);
    }
  });
  return copy;
}

async function loadMaintenanceList() {
  const all = await getAllQuestions();
  const filtered = filterQuestionsForMaintenance(all);
  const sorted = sortQuestionsForMaintenance(filtered);

  const container = $('maintenanceList');
  if (!container) return;
  container.innerHTML = '';

  sorted.forEach(q => {
    const row = document.createElement('div');
    row.className = 'maintenance-row';

    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.dataset.id = q.id;

    const middle = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = `Q${q.id}: ${q.text}`;
    const meta = document.createElement('div');
    meta.className = 'maintenance-meta';
    meta.textContent = [
      q.chapter ? `Ch: ${q.chapter}` : '',
      q.flagged ? 'Flagged' : '',
      q.active === false ? 'Inactive' : 'Active',
      q.createdAt ? `Created: ${q.createdAt.slice(0, 10)}` : ''
    ].filter(Boolean).join(' · ');

    middle.appendChild(title);
    middle.appendChild(meta);

    const actions = document.createElement('div');
    const btnOpen = document.createElement('button');
    btnOpen.textContent = 'Open';
    btnOpen.addEventListener('click', () => {
      currentQuestion = q;
      setActiveTab('practiceTab');
      renderQuestion(q);
    });
    actions.appendChild(btnOpen);

    row.appendChild(chk);
    row.appendChild(middle);
    row.appendChild(actions);

    container.appendChild(row);
  });
}

function getSelectedIdsFromMaintenance() {
  const container = $('maintenanceList');
  if (!container) return [];
  const checks = container.querySelectorAll('input[type="checkbox"][data-id]');
  const ids = [];
  checks.forEach(c => {
    if (c.checked) ids.push(Number(c.dataset.id));
  });
  return ids;
}

async function deleteSelectedQuestions() {
  const ids = getSelectedIdsFromMaintenance();
  if (!ids.length) {
    alert('Select at least one question.');
    return;
  }
  if (!confirm(`Delete ${ids.length} selected question(s)? This cannot be undone.`)) return;
  for (const id of ids) {
    await deleteQuestion(id);
  }
  await loadMaintenanceList();
  const questions = await getAllQuestions();
  renderStats(questions);
}

async function flagSelected(flagValue) {
  const ids = getSelectedIdsFromMaintenance();
  if (!ids.length) {
    alert('Select at least one question.');
    return;
  }
  const all = await getAllQuestions();
  const byId = new Map(all.map(q => [q.id, q]));
  for (const id of ids) {
    const q = byId.get(id);
    if (!q) continue;
    q.flagged = flagValue;
    q.updatedAt = new Date().toISOString();
    await putQuestion(q);
  }
  await loadMaintenanceList();
}

function toggleSelectAllMaintenance() {
  const container = $('maintenanceList');
  if (!container) return;
  const checks = Array.from(container.querySelectorAll('input[type="checkbox"][data-id]'));
  if (!checks.length) return;
  const allChecked = checks.every(c => c.checked);
  checks.forEach(c => c.checked = !allChecked);
}

// ---------- Init ----------

async function init() {
  await openDb();
  applySettingsToUI();
  setupAutoBackup();

  $('modeSelect').addEventListener('change', ev => {
    currentMode = ev.target.value;
    $('chapterFilter').style.display = currentMode === 'chapter' ? 'inline-block' : 'none';
    loadNextQuestion();
  });

  $('chapterFilter').addEventListener('input', ev => {
    currentChapterFilter = ev.target.value;
  });

  $('btnSubmit').addEventListener('click', submitAnswer);
  $('btnNext').addEventListener('click', loadNextQuestion);
  $('btnFlag').addEventListener('click', async () => {
    if (!currentQuestion) return;
    currentQuestion.flagged = !currentQuestion.flagged;
    currentQuestion.updatedAt = new Date().toISOString();
    await putQuestion(currentQuestion);
    renderQuestion(currentQuestion);
    const questions = await getAllQuestions();
    renderStats(questions);
  });

  $('btnImport').addEventListener('click', handleFileImport);
  $('btnImportUrl').addEventListener('click', handleUrlImport);
  $('btnExportLocal').addEventListener('click', exportLocalBackup);
  $('btnBackupNow').addEventListener('click', () => backupToGitHub(true));

  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
  });

  $('btnSaveSettings').addEventListener('click', () => {
    const s = collectSettingsFromUI();
    saveSettingsToStorage(s);
    applySettingsToUI();
    setupAutoBackup();
    alert('Settings saved.');
  });

  $('btnOpenTokenPage').addEventListener('click', () => {
    window.open('https://github.com/settings/tokens', '_blank');
  });

  $('btnReloadMaintenance').addEventListener('click', loadMaintenanceList);
  $('mSearchText').addEventListener('input', loadMaintenanceList);
  $('mChapterExact').addEventListener('input', loadMaintenanceList);
  $('mFlagFilter').addEventListener('change', loadMaintenanceList);
  $('mStatusFilter').addEventListener('change', loadMaintenanceList);
  $('mSortBy').addEventListener('change', loadMaintenanceList);

  $('btnToggleSelectAll').addEventListener('click', toggleSelectAllMaintenance);
  $('btnDeleteSelected').addEventListener('click', deleteSelectedQuestions);
  $('btnFlagSelected').addEventListener('click', () => flagSelected(true));
  $('btnUnflagSelected').addEventListener('click', () => flagSelected(false));

  $('btnWipeAll').addEventListener('click', async () => {
    if (!confirm('Wipe all local questions? This cannot be undone.')) return;
    const store = getStore('readwrite');
    const req = store.clear();
    req.onsuccess = async () => {
      const questions = await getAllQuestions();
      renderStats(questions);
      $('questionPanel').innerHTML = '<div class="muted">All questions cleared.</div>';
      $('feedbackPanel').innerHTML = '';
      $('maintenanceList').innerHTML = '';
    };
  });

  const questions = await getAllQuestions();
  renderStats(questions);
  renderHistory();
  loadNextQuestion();
}

window.addEventListener('load', () => {
  init().catch(err => {
    console.error(err);
    alert('Failed to initialize app.');
  });
});
