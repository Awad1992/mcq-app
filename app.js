/* ==================================================
   MCQ APP PRO 2.0 — MAIN ENGINE
   ================================================== */

/* ============================
   GLOBALS
   ============================ */
const DB_NAME = "mcqdb_v3";
const DB_VERSION = 1;
let db = null;

let currentQuestion = null;
let currentChoices = [];
let currentMode = "all";
let currentChapter = "";
let lastSelectedIndex = null;
let lastResult = null;

/* HTML Elements */
const questionPanel = document.getElementById("questionPanel");
const feedbackPanel = document.getElementById("feedbackPanel");
const historyListEl = document.getElementById("historyList");
const modeSelect = document.getElementById("modeSelect");
const chapterFilter = document.getElementById("chapterFilter");

/* Sync Elements */
const tokenInput = document.getElementById("tokenInput");
const repoInput = document.getElementById("repoInput");
const btnSaveSettings = document.getElementById("btnSaveSettings");

const btnSyncUpload = document.getElementById("btnSyncUpload");
const btnSyncDownload = document.getElementById("btnSyncDownload");
const lastSyncLabel = document.getElementById("lastSyncLabel");


/* ==================================================
   SETTINGS STORAGE (LOCAL — OFFLINE)
   ================================================== */
function loadSettings() {
  tokenInput.value = localStorage.getItem("mcq_token") || "";
  repoInput.value = localStorage.getItem("mcq_repo") || "";
}

btnSaveSettings.addEventListener("click", () => {
  localStorage.setItem("mcq_token", tokenInput.value.trim());
  localStorage.setItem("mcq_repo", repoInput.value.trim());
  alert("✔ Settings saved");
});


/* ==================================================
   INDEXEDDB INIT
   ================================================== */
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      // Questions store
      if (!db.objectStoreNames.contains("questions")) {
        const store = db.createObjectStore("questions", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("by_chapter", "chapter", { unique: false });
      }

      // Answers store
      if (!db.objectStoreNames.contains("answers")) {
        const ans = db.createObjectStore("answers", {
          keyPath: "id",
          autoIncrement: true,
        });
        ans.createIndex("by_question", "questionId", { unique: false });
        ans.createIndex("by_time", "answeredAt", { unique: false });
      }
    };

    req.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };

    req.onerror = (e) => reject(e.target.error);
  });
}


/* ==================================================
   QUESTION PICKER LOGIC
   ================================================== */

function randomChoice(arr) {
  if (!arr || !arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

async function getAllQuestions() {
  const tx = db.transaction("questions", "readonly");
  const store = tx.objectStore("questions");

  return new Promise((resolve) => {
    const req = store.getAll();
    req.onsuccess = (e) => resolve(e.target.result || []);
  });
}

async function pickQuestion() {
  const all = await getAllQuestions();
  if (!all.length) return null;

  let filtered = all.filter((q) => q.active !== false);

  if (currentMode === "new") {
    filtered = filtered.filter((q) => !q.timesSeen);
  } else if (currentMode === "wrong") {
    filtered = filtered.filter((q) => q.timesWrong > 0);
  } else if (currentMode === "flagged") {
    filtered = filtered.filter((q) => q.flagged);
  } else if (currentMode === "chapter" && currentChapter) {
    filtered = filtered.filter(
      (q) => (q.chapter || "").toLowerCase() === currentChapter.toLowerCase()
    );
  }

  if (!filtered.length) filtered = all;

  // Sort by least seen → least recently seen
  filtered.sort((a, b) => {
    if ((a.lastSeenAt || "") === (b.lastSeenAt || "")) {
      return (a.timesSeen || 0) - (b.timesSeen || 0);
    }
    return (a.lastSeenAt || "").localeCompare(b.lastSeenAt || "");
  });

  const slice = filtered.slice(0, Math.min(filtered.length, 40));
  return randomChoice(slice);
}


/* ==================================================
   RENDERING QUESTION
   ================================================== */

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML = `
      <div class="muted">No questions available. استخدم Import لإضافة أسئلة.</div>
    `;
    return;
  }

  const q = currentQuestion;
  currentChoices = q.choices || [];
  const letters = ["A", "B", "C", "D", "E", "F"];

  let html = `
    <div class="q-text">Q#${q.id} — ${q.text}</div>
  `;

  // Chapter/source/flag
  if (q.chapter || q.source || q.flagged) {
    html += `<div class="tag-chapter">`;

    if (q.chapter) html += `<span>${q.chapter}</span>`;
    if (q.source) html += `<span>${q.source}</span>`;
    if (q.flagged) html += `<span class="pill pill-flag">FLAG</span>`;

    html += `</div>`;
  }

  // Choices
  html += `<div style="margin-top:0.4rem;">`;
  currentChoices.forEach((c, i) => {
    const checked = i === lastSelectedIndex ? "checked" : "";
    html += `
      <label class="choice">
        <input type="radio" name="choice" value="${i}" ${checked}>
        <strong>${letters[i]}.</strong> ${c.text}
      </label>
    `;
  });
  html += `</div>`;

  questionPanel.innerHTML = html;
}


/* ==================================================
   HISTORY RENDER
   ================================================== */

async function loadHistory() {
  const tx = db.transaction(["answers", "questions"], "readonly");
  const aStore = tx.objectStore("answers");
  const qStore = tx.objectStore("questions");

  const allAns = await new Promise((res) => {
    const req = aStore.getAll();
    req.onsuccess = (e) => res(e.target.result || []);
  });

  allAns.sort((a, b) =>
    (b.answeredAt || "").localeCompare(a.answeredAt || "")
  );

  const recent = allAns.slice(0, 40);

  const qMap = {};
  await Promise.all(
    recent.map((a) => {
      return new Promise((resolve) => {
        if (qMap[a.questionId]) return resolve();
        const req = qStore.get(a.questionId);
        req.onsuccess = (e) => {
          qMap[a.questionId] = e.target.result;
          resolve();
        };
        req.onerror = () => resolve();
      });
    })
  );

  // Build HTML
  let html = "";
  recent.forEach((a) => {
    const q = qMap[a.questionId];
    if (!q) return;

    html += `
      <div class="history-item" data-qid="${q.id}">
        <div>${(q.text || "").slice(0, 80)}${
      q.text.length > 80 ? "…" : ""
    }</div>
        <div class="muted">
          ${q.chapter ? `<span>${q.chapter}</span>` : ""}
          <span class="pill ${
            a.isCorrect ? "pill-correct" : "pill-wrong"
          }">${a.isCorrect ? "Correct" : "Wrong"}</span>
          ${q.flagged ? `<span class="pill pill-flag">Flag</span>` : ""}
        </div>
      </div>
    `;
  });

  historyListEl.innerHTML = html || `<div class="muted">No history yet</div>`;

  // Enable clicking history items
  historyListEl.querySelectorAll(".history-item").forEach((item) => {
    item.addEventListener("click", async () => {
      const id = parseInt(item.getAttribute("data-qid"));

      const tx2 = db.transaction("questions", "readonly");
      const store2 = tx2.objectStore("questions");

      const q = await new Promise((resolve) => {
        const r = store2.get(id);
        r.onsuccess = (e) => resolve(e.target.result);
        r.onerror = () => resolve(null);
      });

      if (!q) return;

      currentQuestion = q;
      lastSelectedIndex = null;
      lastResult = null;
      feedbackPanel.innerHTML = "";
      renderQuestion();
    });
  });
}


/* ==================================================
   UPDATE STATS
   ================================================== */

async function updateStatsBar() {
  const all = await getAllQuestions();
  const stats = {
    total: all.length,
    flagged: all.filter((q) => q.flagged).length,
    answered: all.filter((q) => q.timesSeen > 0).length,
    withWrong: all.filter((q) => q.timesWrong > 0).length,
  };

  const el = document.getElementById("statsBar");
  el.innerHTML = `
    <div>Total: <strong>${stats.total}</strong></div>
    <div>Answered: <strong>${stats.answered}</strong></div>
    <div>Wrong ≥1: <strong>${stats.withWrong}</strong></div>
    <div>Flagged: <strong>${stats.flagged}</strong></div>
  `;
}


/* ==================================================
   NAVIGATION AND EVENTS
   ================================================== */

modeSelect.addEventListener("change", () => {
  currentMode = modeSelect.value;

  if (currentMode === "chapter") {
    chapterFilter.style.display = "inline-block";
  } else {
    chapterFilter.style.display = "none";
    currentChapter = "";
  }
  loadNextQuestion();
});

chapterFilter.addEventListener("change", () => {
  currentChapter = chapterFilter.value.trim();
  loadNextQuestion();
});
/* ==================================================
   ANSWER SUBMISSION
   ================================================== */

document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
document.getElementById("btnNext").addEventListener("click", () => {
  lastSelectedIndex = null;
  lastResult = null;
  feedbackPanel.innerHTML = "";
  loadNextQuestion();
});
document.getElementById("btnFlag").addEventListener("click", toggleFlag);


async function submitAnswer() {
  if (!currentQuestion) return;

  const radios = document.querySelectorAll('input[name="choice"]');
  let selectedIdx = null;

  radios.forEach((r) => {
    if (r.checked) selectedIdx = parseInt(r.value);
  });

  if (selectedIdx === null) {
    alert("اختر الإجابة أولاً.");
    return;
  }

  lastSelectedIndex = selectedIdx;

  const correctIdx = (currentQuestion.choices || []).findIndex((c) => c.isCorrect);
  const isCorrect = selectedIdx === correctIdx;
  const now = new Date().toISOString();

  // Update DB
  const tx = db.transaction(["questions", "answers"], "readwrite");
  const qStore = tx.objectStore("questions");
  const aStore = tx.objectStore("answers");

  const q = Object.assign({}, currentQuestion);

  q.timesSeen = (q.timesSeen || 0) + 1;
  if (isCorrect) {
    q.timesCorrect = (q.timesCorrect || 0) + 1;
  } else {
    q.timesWrong = (q.timesWrong || 0) + 1;
  }
  q.lastSeenAt = now;

  qStore.put(q);

  aStore.add({
    questionId: q.id,
    answeredAt: now,
    selectedIndex: selectedIdx,
    isCorrect,
  });

  tx.oncomplete = () => {
    currentQuestion = q;
    lastResult = isCorrect;
    showFeedback(correctIdx, selectedIdx, q.explanation);
    updateStatsBar();
    loadHistory();
  };
}


/* ==================================================
   FEEDBACK SYSTEM
   ================================================== */

function showFeedback(correctIdx, selectedIdx, explanation) {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const choices = currentChoices;

  const choiceEls = document.querySelectorAll(".choice");
  choiceEls.forEach((el, idx) => {
    el.classList.remove("correct", "wrong", "show");

    if (idx === correctIdx) {
      el.classList.add("correct", "show");
    }

    if (idx === selectedIdx && idx !== correctIdx) {
      el.classList.add("wrong", "show");
    }
  });

  let html = "";
  if (lastResult) {
    html += `<div style="color:#4caf50; font-weight:600;">Correct ✓</div>`;
  } else {
    html += `<div style="color:#f44336; font-weight:600;">Wrong ✗</div>`;
  }

  if (choices[correctIdx]) {
    html += `
      <div class="muted" style="margin-top:0.3rem;">
        Correct answer: <strong>${letters[correctIdx]}.</strong>
        ${choices[correctIdx].text}
      </div>
    `;
  }

  if (explanation) {
    html += `
      <div class="muted" style="margin-top:0.3rem;">
        <strong>Explanation:</strong> ${explanation}
      </div>
    `;
  }

  feedbackPanel.innerHTML = html;
}


/* ==================================================
   FLAG TOGGLE
   ================================================== */

async function toggleFlag() {
  if (!currentQuestion) return;

  const tx = db.transaction("questions", "readwrite");
  const store = tx.objectStore("questions");

  const q = Object.assign({}, currentQuestion);
  q.flagged = !q.flagged;

  store.put(q);

  tx.oncomplete = () => {
    currentQuestion = q;
    renderQuestion();
    updateStatsBar();
    loadHistory();
  };
}


/* ==================================================
   IMPORT QUESTIONS (JSON)
   ================================================== */

document.getElementById("btnImport").addEventListener("click", handleImport);

function handleImport() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("اختر ملف JSON أولاً.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);

      if (!Array.isArray(data)) {
        alert("❌ الملف يجب أن يكون Array من الأسئلة.");
        return;
      }

      const tx = db.transaction("questions", "readwrite");
      const store = tx.objectStore("questions");

      data.forEach((q) => {
        const obj = {
          text: q.text,
          chapter: q.chapter || "",
          source: q.source || "",
          explanation: q.explanation || "",
          choices: q.choices || [],
          timesSeen: 0,
          timesCorrect: 0,
          timesWrong: 0,
          lastSeenAt: null,
          flagged: !!q.flagged,
          active: q.active !== false,
        };
        store.add(obj);
      });

      tx.oncomplete = () => {
        alert("✔ Imported " + data.length + " questions.");
        loadNextQuestion();
      };
    } catch (err) {
      alert("❌ Error parsing JSON: " + err.message);
    }
  };

  reader.readAsText(file);
}


/* ==================================================
   EXPORT QUESTIONS
   ================================================== */

document.getElementById("btnExport").addEventListener("click", handleExport);

async function handleExport() {
  const tx = db.transaction("questions", "readonly");
  const store = tx.objectStore("questions");

  const all = await new Promise((res) => {
    const req = store.getAll();
    req.onsuccess = (e) => res(e.target.result || []);
  });

  const clean = all.map((q) => ({
    id: q.id,
    text: q.text,
    chapter: q.chapter,
    source: q.source,
    explanation: q.explanation,
    choices: q.choices,
    flagged: !!q.flagged,
    active: q.active !== false,
  }));

  const blob = new Blob([JSON.stringify(clean, null, 2)], {
    type: "application/json",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "mcq_backup.json";
  a.click();
}
/* ==================================================
   BACKUP GENERATION (IndexedDB → JSON)
   ================================================== */

async function generateBackupJSON() {
  const tx = db.transaction(["questions", "answers"], "readonly");

  const qStore = tx.objectStore("questions");
  const aStore = tx.objectStore("answers");

  const questions = await new Promise((resolve) => {
    const r = qStore.getAll();
    r.onsuccess = (e) => resolve(e.target.result || []);
  });

  const answers = await new Promise((resolve) => {
    const r = aStore.getAll();
    r.onsuccess = (e) => resolve(e.target.result || []);
  });

  return JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      questions,
      answers,
    },
    null,
    2
  );
}


/* ==================================================
   RESTORE BACKUP (JSON → IndexedDB)
   ================================================== */

async function restoreBackupJSON(jsonData) {
  const obj = JSON.parse(jsonData);

  if (!obj.questions || !obj.answers) {
    alert("❌ Invalid backup format.");
    return;
  }

  const tx = db.transaction(["questions", "answers"], "readwrite");
  const qStore = tx.objectStore("questions");
  const aStore = tx.objectStore("answers");

  // Clear DB first
  qStore.clear();
  aStore.clear();

  obj.questions.forEach((q) => qStore.add(q));
  obj.answers.forEach((a) => aStore.add(a));

  return new Promise((resolve) => {
    tx.oncomplete = () => resolve();
  });
}


/* ==================================================
   CLOUD SYNC — UPLOAD (Backup → GitHub)
   ================================================== */

btnSyncUpload.addEventListener("click", async () => {
  const token = localStorage.getItem("mcq_token");
  const repo = localStorage.getItem("mcq_repo");

  if (!token || !repo) return alert("❌ Set token & repo first.");

  const backup = await generateBackupJSON();
  const encoded = btoa(unescape(encodeURIComponent(backup)));

  const url = `https://api.github.com/repos/${repo}/contents/backup.json`;

  // Check if file exists to get SHA
  let sha = null;
  const getReq = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (getReq.status === 200) {
    const data = await getReq.json();
    sha = data.sha;
  }

  const upload = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "MCQ Backup",
      content: encoded,
      sha: sha || undefined,
    }),
  });

  if (upload.status === 201 || upload.status === 200) {
    lastSyncLabel.textContent = "Uploaded ✔";
    alert("✔ Backup uploaded to GitHub");
  } else {
    alert("❌ Upload failed");
  }
});


/* ==================================================
   CLOUD SYNC — DOWNLOAD (GitHub → Restore)
   ================================================== */

btnSyncDownload.addEventListener("click", async () => {
  const token = localStorage.getItem("mcq_token");
  const repo = localStorage.getItem("mcq_repo");

  if (!token || !repo) return alert("❌ Set token & repo first.");

  const url = `https://api.github.com/repos/${repo}/contents/backup.json`;

  const req = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (req.status !== 200) {
    alert("❌ No backup file found in GitHub");
    return;
  }

  const data = await req.json();
  const content = decodeURIComponent(escape(atob(data.content)));

  await restoreBackupJSON(content);

  lastSyncLabel.textContent = "Downloaded ✔";
  alert("✔ Backup restored from GitHub");

  loadNextQuestion();
});


/* ==================================================
   LOAD NEXT QUESTION
   ================================================== */

async function loadNextQuestion() {
  currentQuestion = await pickQuestion();
  lastSelectedIndex = null;
  lastResult = null;
  feedbackPanel.innerHTML = "";

  renderQuestion();
  updateStatsBar();
  loadHistory();
}


/* ==================================================
   INIT APP
   ================================================== */

(async function initApp() {
  loadSettings();

  await openDB();

  await loadNextQuestion();
})();
