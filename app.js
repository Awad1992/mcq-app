// ===== MCQ App Pro 4.0 =====
// Single-page + Tabs + Manager + Maintenance + GitHub backup
// Data key
const STORAGE_KEY = "mcqdb_v4";

let questions = [];
let currentQuestion = null;
let currentIndex = -1;

// stack for Previous (review only)
let questionStack = [];
let stackPointer = -1;
let reviewMode = false;

// GitHub settings
let ghToken = "";
let ghRepo = "";

// DOM
const questionPanel = document.getElementById("questionPanel");
const feedbackPanel = document.getElementById("feedbackPanel");
const practiceMetaEl = document.getElementById("practiceMeta");
const statsBarEl = document.getElementById("statsBar");
const lastWrongListEl = document.getElementById("lastWrongList");
const lastFlagListEl = document.getElementById("lastFlagList");
const lastMaintListEl = document.getElementById("lastMaintList");
const manageTableBody = document.getElementById("manageTableBody");
const maintTableBody = document.getElementById("maintTableBody");

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupButtons();
  loadFromStorage();
  loadSettings();
  renderStats();
  if (questions.length > 0) {
    gotoQuestion(0, false);
  } else {
    questionPanel.innerHTML =
      '<div class="muted">No questions yet. Import JSON from Settings.</div>';
  }
  refreshSidePanels();
  renderManageTable();
  renderMaintTable();
});

// ---------- Tabs ----------
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabs = document.querySelectorAll(".tab");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabs.forEach((t) => t.classList.remove("active"));

      btn.classList.add("active");
      const id = btn.getAttribute("data-tab");
      document.getElementById(id).classList.add("active");
    });
  });
}

// ---------- Buttons ----------
function setupButtons() {
  document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
  document.getElementById("btnNext").addEventListener("click", () =>
    nextQuestion(true)
  );
  document.getElementById("btnPrev").addEventListener("click", previousQuestion);
  document.getElementById("btnFlag").addEventListener("click", toggleFlag);
  document.getElementById("btnMaint").addEventListener("click", toggleMaint);

  document
    .getElementById("btnApplyFilters")
    .addEventListener("click", renderManageTable);
  document
    .getElementById("btnSelectAll")
    .addEventListener("click", () => setManageSelection(true));
  document
    .getElementById("btnClearSelection")
    .addEventListener("click", () => setManageSelection(false));
  document
    .getElementById("btnDeleteSelected")
    .addEventListener("click", deleteSelectedQuestions);

  // Maintenance tab
  document
    .getElementById("btnMaintSelectAll")
    .addEventListener("click", () => setMaintSelection(true));
  document
    .getElementById("btnMaintClear")
    .addEventListener("click", () => setMaintSelection(false));
  document
    .getElementById("btnMaintRemove")
    .addEventListener("click", removeMaintFromSelected);
  document
    .getElementById("btnMaintDelete")
    .addEventListener("click", deleteMaintSelected);

  // Settings: Import/Export
  document
    .getElementById("btnImport")
    .addEventListener("click", handleImportJSON);
  document
    .getElementById("btnExport")
    .addEventListener("click", handleExportJSON);

  // Settings: GitHub
  document
    .getElementById("btnSaveSettings")
    .addEventListener("click", saveSettings);
  document
    .getElementById("btnUploadGitHub")
    .addEventListener("click", uploadGitHub);
  document
    .getElementById("btnDownloadGitHub")
    .addEventListener("click", downloadGitHub);
}

// ---------- Storage ----------
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    questions = (arr || []).map((q, idx) => normalizeQuestion(q, idx));
  } catch (e) {
    console.error("loadFromStorage error", e);
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

// ---------- Question shape ----------
function normalizeQuestion(q, idx) {
  const now = new Date().toISOString();
  // support older shapes
  let id = q.id != null ? q.id : idx + 1;
  let text = q.text || q.question || "";
  let chapter = q.chapter || "";
  let explanation = q.explanation || "";
  let choices = q.choices || [];

  // if choices is string array, convert
  if (choices.length && typeof choices[0] === "string") {
    const correctIndex =
      typeof q.correctIndex === "number" ? q.correctIndex : 0;
    choices = choices.map((t, i) => ({
      text: t,
      isCorrect: i === correctIndex,
    }));
  }

  const correctIndex = (() => {
    const idx = choices.findIndex((c) => c.isCorrect);
    return idx >= 0 ? idx : 0;
  })();

  return {
    id,
    text,
    chapter,
    source: q.source || "",
    explanation,
    choices,
    correctIndex,
    flagged: !!q.flagged,
    maintenance: !!q.maintenance,
    addedAt: q.addedAt || now,
    timesSeen: q.timesSeen || 0,
    timesCorrect: q.timesCorrect || 0,
    timesWrong: q.timesWrong || 0,
    lastSeenAt: q.lastSeenAt || null,
    lastAnsweredAt: q.lastAnsweredAt || null,
  };
}

// ---------- Stats ----------
function renderStats() {
  const total = questions.length;
  const answered = questions.filter((q) => q.timesSeen > 0).length;
  const withWrong = questions.filter((q) => q.timesWrong > 0).length;
  const flagged = questions.filter((q) => q.flagged).length;
  const maint = questions.filter((q) => q.maintenance).length;

  statsBarEl.innerHTML = `
    <div>Total: <strong>${total}</strong></div>
    <div>Answered: <strong>${answered}</strong></div>
    <div>Wrong ≥1: <strong>${withWrong}</strong></div>
    <div>Flagged: <strong>${flagged}</strong></div>
    <div>Maintenance: <strong>${maint}</strong></div>
  `;
}

// ---------- Practice view ----------
function gotoQuestion(index, pushToStack) {
  if (questions.length === 0) return;
  if (index < 0 || index >= questions.length) index = 0;

  if (pushToStack && currentIndex >= 0) {
    questionStack.push(currentIndex);
    stackPointer = questionStack.length - 1;
  }

  currentIndex = index;
  currentQuestion = questions[currentIndex];
  reviewMode = false;

  renderQuestion();
  feedbackPanel.innerHTML = "";
  renderStats();
  refreshSidePanels();
}

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML =
      '<div class="muted">No question loaded.</div>';
    practiceMetaEl.innerHTML = "";
    return;
  }

  const q = currentQuestion;
  const letters = ["A", "B", "C", "D", "E", "F"];

  let metaHtml = "";
  if (q.chapter) metaHtml += `<span>${q.chapter}</span>`;
  if (q.source) metaHtml += `<span>${q.source}</span>`;
  if (q.flagged) metaHtml += `<span class="q-tag">FLAG</span>`;
  if (q.maintenance) metaHtml += `<span class="q-tag">MAINT</span>`;
  practiceMetaEl.innerHTML = metaHtml;

  let html = `<div class="q-text">Q#${q.id} – ${q.text}</div>`;
  html += '<div style="margin-top:0.3rem;">';

  q.choices.forEach((c, idx) => {
    html += `
      <label class="choice">
        <input type="radio" name="choice" value="${idx}">
        <strong>${letters[idx] || "?"}.</strong> ${c.text}
      </label>
    `;
  });

  html += "</div>";
  questionPanel.innerHTML = html;
}

function nextQuestion(pushStack) {
  if (questions.length === 0) return;
  let idx = currentIndex + 1;
  if (idx >= questions.length) idx = 0;
  gotoQuestion(idx, pushStack);
}

function previousQuestion() {
  if (stackPointer <= 0 || questionStack.length === 0) return;
  stackPointer--;
  const prevIndex = questionStack[stackPointer];
  reviewMode = true;
  currentIndex = prevIndex;
  currentQuestion = questions[currentIndex];
  renderQuestion();
  lockChoices();
  showLastAnswerFeedback();
}

function lockChoices() {
  const labels = document.querySelectorAll(".choice");
  labels.forEach((el) => {
    el.style.pointerEvents = "none";
    el.style.opacity = "0.7";
  });
}

function showLastAnswerFeedback() {
  const q = currentQuestion;
  const letters = ["A", "B", "C", "D", "E", "F"];
  const labels = document.querySelectorAll(".choice");
  labels.forEach((el, idx) => {
    el.classList.remove("correct", "wrong", "show");
    if (idx === q.correctIndex) el.classList.add("correct", "show");
    if (
      q.lastSelectedIndex != null &&
      q.lastSelectedIndex === idx &&
      idx !== q.correctIndex
    ) {
      el.classList.add("wrong", "show");
    }
  });

  let html = `<div style="margin-top:0.3rem;">`;
  if (q.lastSelectedIndex == null) {
    html += `<div class="muted">Previously viewed. No answer recorded.</div>`;
  } else {
    const isCorrect = q.lastSelectedIndex === q.correctIndex;
    html += `<div style="font-weight:600; color:${
      isCorrect ? "#16a34a" : "#dc2626"
    };">${isCorrect ? "Correct ✅" : "Wrong ❌"}</div>`;
    html += `<div class="muted" style="margin-top:0.25rem;">Correct answer: <strong>${
      letters[q.correctIndex]
    }.</strong> ${q.choices[q.correctIndex].text}</div>`;
    if (q.explanation) {
      html += `<div class="muted" style="margin-top:0.25rem;"><strong>Explanation:</strong> ${q.explanation}</div>`;
    }
  }
  html += `</div>`;
  feedbackPanel.innerHTML = html;
}

function submitAnswer() {
  if (!currentQuestion || reviewMode) return;
  const radios = document.querySelectorAll('input[name="choice"]');
  let selectedIdx = null;
  radios.forEach((r) => {
    if (r.checked) selectedIdx = parseInt(r.value);
  });
  if (selectedIdx == null) {
    alert("اختر إجابة أولاً.");
    return;
  }

  const q = currentQuestion;
  const correctIdx = q.correctIndex;
  const isCorrect = selectedIdx === correctIdx;
  const now = new Date().toISOString();

  q.timesSeen = (q.timesSeen || 0) + 1;
  if (isCorrect) {
    q.timesCorrect = (q.timesCorrect || 0) + 1;
  } else {
    q.timesWrong = (q.timesWrong || 0) + 1;
  }
  q.lastSeenAt = now;
  q.lastAnsweredAt = now;
  q.lastSelectedIndex = selectedIdx;

  questions[currentIndex] = q;
  saveToStorage();
  renderStats();

  const letters = ["A", "B", "C", "D", "E", "F"];
  const labels = document.querySelectorAll(".choice");
  labels.forEach((el, idx) => {
    el.classList.remove("correct", "wrong", "show");
    if (idx === correctIdx) el.classList.add("correct", "show");
    if (idx === selectedIdx && idx !== correctIdx)
      el.classList.add("wrong", "show");
  });

  let html = `<div style="margin-top:0.3rem;">`;
  html += `<div style="font-weight:600; color:${
    isCorrect ? "#16a34a" : "#dc2626"
  };">${isCorrect ? "Correct ✅" : "Wrong ❌"}</div>`;
  html += `<div class="muted" style="margin-top:0.25rem;">Correct answer: <strong>${
    letters[correctIdx]
  }.</strong> ${q.choices[correctIdx].text}</div>`;
  if (q.explanation) {
    html += `<div class="muted" style="margin-top:0.25rem;"><strong>Explanation:</strong> ${q.explanation}</div>`;
  }
  html += `</div>`;
  feedbackPanel.innerHTML = html;

  refreshSidePanels();
  renderManageTable();
  renderMaintTable();
}

// ---------- Flag / Maint ----------
function toggleFlag() {
  if (!currentQuestion) return;
  currentQuestion.flagged = !currentQuestion.flagged;
  questions[currentIndex] = currentQuestion;
  saveToStorage();
  renderStats();
  renderQuestion();
  refreshSidePanels();
  renderManageTable();
}

function toggleMaint() {
  if (!currentQuestion) return;
  currentQuestion.maintenance = !currentQuestion.maintenance;
  questions[currentIndex] = currentQuestion;
  saveToStorage();
  renderStats();
  renderQuestion();
  refreshSidePanels();
  renderManageTable();
  renderMaintTable();
}

// ---------- Side panels ----------
function refreshSidePanels() {
  const sortedByTime = [...questions].filter((q) => q.lastSeenAt).sort(
    (a, b) => (b.lastSeenAt || "").localeCompare(a.lastSeenAt || "")
  );

  const lastWrong = sortedByTime.filter((q) => q.timesWrong > 0).slice(0, 5);
  const lastFlag = sortedByTime.filter((q) => q.flagged).slice(0, 5);
  const lastMaint = sortedByTime.filter((q) => q.maintenance).slice(0, 5);

  renderMiniList(lastWrongListEl, lastWrong);
  renderMiniList(lastFlagListEl, lastFlag);
  renderMiniList(lastMaintListEl, lastMaint);
}

function renderMiniList(container, list) {
  if (!list.length) {
    container.innerHTML = '<div class="muted">Empty.</div>';
    return;
  }
  container.innerHTML = list
    .map(
      (q) => `
    <div class="mini-item" data-qid="${q.id}">
      ${(q.text || "").slice(0, 60)}${q.text.length > 60 ? "…" : ""}
      <span class="tag">${q.chapter || ""}</span>
    </div>
  `
    )
    .join("");

  container.querySelectorAll(".mini-item").forEach((el) => {
    el.addEventListener("click", () => {
      const qid = parseInt(el.getAttribute("data-qid"));
      const idx = questions.findIndex((q) => q.id === qid);
      if (idx >= 0) {
        gotoQuestion(idx, true);
      }
    });
  });
}

// ---------- Manage tab ----------
function getManageFiltered() {
  const textFilter = document
    .getElementById("filterText")
    .value.toLowerCase()
    .trim();
  const chapterFilter = document
    .getElementById("filterChapter")
    .value.toLowerCase()
    .trim();
  const flagFilter = document.getElementById("filterFlag").value;
  const maintFilter = document.getElementById("filterMaint").value;
  const sortBy = document.getElementById("sortBy").value;

  let arr = [...questions];

  if (textFilter) {
    arr = arr.filter((q) =>
      (q.text || "").toLowerCase().includes(textFilter)
    );
  }
  if (chapterFilter) {
    arr = arr.filter((q) =>
      (q.chapter || "").toLowerCase().includes(chapterFilter)
    );
  }
  if (flagFilter === "only") {
    arr = arr.filter((q) => q.flagged);
  } else if (flagFilter === "none") {
    arr = arr.filter((q) => !q.flagged);
  }
  if (maintFilter === "only") {
    arr = arr.filter((q) => q.maintenance);
  } else if (maintFilter === "none") {
    arr = arr.filter((q) => !q.maintenance);
  }

  arr.sort((a, b) => {
    if (sortBy === "addedDesc") {
      return (b.addedAt || "").localeCompare(a.addedAt || "");
    }
    if (sortBy === "addedAsc") {
      return (a.addedAt || "").localeCompare(b.addedAt || "");
    }
    if (sortBy === "chapterAsc") {
      return (a.chapter || "").localeCompare(b.chapter || "");
    }
    if (sortBy === "chapterDesc") {
      return (b.chapter || "").localeCompare(a.chapter || "");
    }
    if (sortBy === "wrongDesc") {
      return (b.timesWrong || 0) - (a.timesWrong || 0);
    }
    return 0;
  });

  return arr;
}

function renderManageTable() {
  const arr = getManageFiltered();
  if (!arr.length) {
    manageTableBody.innerHTML =
      '<tr><td colspan="9" class="muted">No questions.</td></tr>';
    return;
  }

  manageTableBody.innerHTML = arr
    .map(
      (q) => `
    <tr data-id="${q.id}">
      <td><input type="checkbox" class="m-select" /></td>
      <td>${q.id}</td>
      <td>${(q.text || "").slice(0, 80)}${
        q.text.length > 80 ? "…" : ""
      }</td>
      <td>${q.chapter || ""}</td>
      <td>${(q.addedAt || "").slice(0, 10)}</td>
      <td>${q.timesWrong || 0}</td>
      <td>${q.flagged ? "✓" : ""}</td>
      <td>${q.maintenance ? "✓" : ""}</td>
      <td><button class="ghost btn-open">Open</button></td>
    </tr>
  `
    )
    .join("");

  manageTableBody.querySelectorAll(".btn-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tr = btn.closest("tr");
      const id = parseInt(tr.getAttribute("data-id"));
      const idx = questions.findIndex((q) => q.id === id);
      if (idx >= 0) {
        gotoQuestion(idx, true);
        // switch to Practice tab
        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelector('[data-tab="tab-practice"]')
          .classList.add("active");
        document.getElementById("tab-practice").classList.add("active");
      }
    });
  });
}

function setManageSelection(val) {
  manageTableBody
    .querySelectorAll(".m-select")
    .forEach((c) => (c.checked = val));
}

function deleteSelectedQuestions() {
  const rows = manageTableBody.querySelectorAll("tr[data-id]");
  const selectedIds = [];
  rows.forEach((tr) => {
    const ck = tr.querySelector(".m-select");
    if (ck && ck.checked) selectedIds.push(parseInt(tr.getAttribute("data-id")));
  });
  if (!selectedIds.length) {
    alert("No questions selected.");
    return;
  }
  if (!confirm("Delete selected questions?")) return;

  questions = questions.filter((q) => !selectedIds.includes(q.id));
  saveToStorage();
  renderStats();
  renderManageTable();
  renderMaintTable();
  refreshSidePanels();
  if (questions.length === 0) {
    currentQuestion = null;
    currentIndex = -1;
    renderQuestion();
  } else {
    gotoQuestion(0, false);
  }
}

// ---------- Maintenance tab ----------
function getMaintQuestions() {
  return questions.filter((q) => q.maintenance);
}

function renderMaintTable() {
  const arr = getMaintQuestions();
  if (!arr.length) {
    maintTableBody.innerHTML =
      '<tr><td colspan="7" class="muted">No maintenance questions.</td></tr>';
    return;
  }

  maintTableBody.innerHTML = arr
    .map(
      (q) => `
    <tr data-id="${q.id}">
      <td><input type="checkbox" class="mt-select" /></td>
      <td>${q.id}</td>
      <td>${(q.text || "").slice(0, 80)}${
        q.text.length > 80 ? "…" : ""
      }</td>
      <td>${q.chapter || ""}</td>
      <td>${q.timesWrong || 0}</td>
      <td>${q.flagged ? "✓" : ""}</td>
      <td><button class="ghost btn-open">Open</button></td>
    </tr>
  `
    )
    .join("");

  maintTableBody.querySelectorAll(".btn-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tr = btn.closest("tr");
      const id = parseInt(tr.getAttribute("data-id"));
      const idx = questions.findIndex((q) => q.id === id);
      if (idx >= 0) {
        gotoQuestion(idx, true);
        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelector('[data-tab="tab-practice"]')
          .classList.add("active");
        document.getElementById("tab-practice").classList.add("active");
      }
    });
  });
}

function setMaintSelection(val) {
  maintTableBody
    .querySelectorAll(".mt-select")
    .forEach((c) => (c.checked = val));
}

function removeMaintFromSelected() {
  const rows = maintTableBody.querySelectorAll("tr[data-id]");
  const ids = [];
  rows.forEach((tr) => {
    const ck = tr.querySelector(".mt-select");
    if (ck && ck.checked) ids.push(parseInt(tr.getAttribute("data-id")));
  });
  if (!ids.length) {
    alert("No questions selected.");
    return;
  }
  questions.forEach((q) => {
    if (ids.includes(q.id)) q.maintenance = false;
  });
  saveToStorage();
  renderStats();
  renderMaintTable();
  refreshSidePanels();
  renderManageTable();
}

function deleteMaintSelected() {
  const rows = maintTableBody.querySelectorAll("tr[data-id]");
  const ids = [];
  rows.forEach((tr) => {
    const ck = tr.querySelector(".mt-select");
    if (ck && ck.checked) ids.push(parseInt(tr.getAttribute("data-id")));
  });
  if (!ids.length) {
    alert("No questions selected.");
    return;
  }
  if (!confirm("Delete selected maintenance questions?")) return;
  questions = questions.filter((q) => !ids.includes(q.id));
  saveToStorage();
  renderStats();
  renderMaintTable();
  renderManageTable();
  refreshSidePanels();
  if (questions.length === 0) {
    currentQuestion = null;
    currentIndex = -1;
    renderQuestion();
  } else {
    gotoQuestion(0, false);
  }
}

// ---------- Import / Export ----------
function handleImportJSON() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("اختر ملف JSON.");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const arr = JSON.parse(e.target.result);
      if (!Array.isArray(arr)) throw new Error("JSON must be an array");
      const now = new Date().toISOString();
      let maxId = questions.reduce((m, q) => Math.max(m, q.id || 0), 0);
      const newQs = arr.map((raw) => {
        maxId += 1;
        const base = normalizeQuestion(raw, maxId);
        base.id = maxId;
        base.addedAt = base.addedAt || now;
        return base;
      });
      questions = questions.concat(newQs);
      saveToStorage();
      renderStats();
      if (!currentQuestion && questions.length > 0) gotoQuestion(0, false);
      renderManageTable();
      renderMaintTable();
      refreshSidePanels();
      alert("Imported " + newQs.length + " questions.");
    } catch (err) {
      alert("Import error: " + err.message);
    }
  };
  reader.readAsText(file);
}

function handleExportJSON() {
  const data = questions.map((q) => ({
    id: q.id,
    chapter: q.chapter,
    text: q.text,
    source: q.source,
    explanation: q.explanation,
    choices: q.choices,
    flagged: q.flagged,
    maintenance: q.maintenance,
    addedAt: q.addedAt,
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "mcq_backup.json";
  a.click();
}

// ---------- Settings + GitHub ----------
function loadSettings() {
  try {
    const raw = localStorage.getItem("mcq_github_cfg");
    if (!raw) return;
    const cfg = JSON.parse(raw);
    ghToken = cfg.token || "";
    ghRepo = cfg.repo || "";
    document.getElementById("ghToken").value = ghToken;
    document.getElementById("ghRepo").value = ghRepo;
  } catch (e) {
    console.error(e);
  }
}

function saveSettings() {
  ghToken = document.getElementById("ghToken").value.trim();
  ghRepo = document.getElementById("ghRepo").value.trim();
  localStorage.setItem(
    "mcq_github_cfg",
    JSON.stringify({ token: ghToken, repo: ghRepo })
  );
  setSyncStatus("Settings saved locally.");
}

function setSyncStatus(msg) {
  const el = document.getElementById("syncStatus");
  if (el) el.textContent = msg || "";
}

async function uploadGitHub() {
  if (!ghToken || !ghRepo) {
    alert("Set GitHub token and repo first.");
    return;
  }
  try {
    setSyncStatus("Uploading to GitHub...");
    const [owner, repo] = ghRepo.split("/");
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/backup.json`;

    const contentStr = JSON.stringify(
      questions.map((q) => ({
        id: q.id,
        chapter: q.chapter,
        text: q.text,
        source: q.source,
        explanation: q.explanation,
        choices: q.choices,
        flagged: q.flagged,
        maintenance: q.maintenance,
        addedAt: q.addedAt,
        timesSeen: q.timesSeen,
        timesCorrect: q.timesCorrect,
        timesWrong: q.timesWrong,
        lastSeenAt: q.lastSeenAt,
        lastAnsweredAt: q.lastAnsweredAt,
      })),
      null,
      2
    );
    const contentBase64 = btoa(unescape(encodeURIComponent(contentStr)));

    // check existing
    let sha = null;
    const getResp = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${ghToken}` },
    });
    if (getResp.ok) {
      const j = await getResp.json();
      sha = j.sha;
    }

    const body = {
      message: "MCQ backup from app",
      content: contentBase64,
    };
    if (sha) body.sha = sha;

    const putResp = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ghToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!putResp.ok) {
      const txt = await putResp.text();
      throw new Error("GitHub error: " + txt);
    }
    setSyncStatus("Upload OK.");
  } catch (err) {
    console.error(err);
    setSyncStatus("Upload failed: " + err.message);
  }
}

async function downloadGitHub() {
  if (!ghToken || !ghRepo) {
    alert("Set GitHub token and repo first.");
    return;
  }
  try {
    setSyncStatus("Downloading from GitHub...");
    const [owner, repo] = ghRepo.split("/");
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/backup.json`;

    const resp = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${ghToken}` },
    });
    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error("GitHub error: " + txt);
    }
    const data = await resp.json();
    const decoded = decodeURIComponent(escape(atob(data.content)));
    const arr = JSON.parse(decoded);
    if (!Array.isArray(arr)) throw new Error("backup.json not array");

    questions = arr.map((q, idx) => normalizeQuestion(q, idx));
    saveToStorage();
    setSyncStatus("Download OK. Local DB updated.");
    renderStats();
    if (questions.length > 0) {
      gotoQuestion(0, false);
    } else {
      currentQuestion = null;
      currentIndex = -1;
      renderQuestion();
    }
    refreshSidePanels();
    renderManageTable();
    renderMaintTable();
  } catch (err) {
    console.error(err);
    setSyncStatus("Download failed: " + err.message);
  }
}
