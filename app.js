// ==== MCQ App Pro 3.0 ====

// ---------- IndexedDB ----------
const DB_NAME = "mcqdb_v3";
const DB_VERSION = 1;
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("questions")) {
        const qs = db.createObjectStore("questions", {
          keyPath: "id",
          autoIncrement: true
        });
        qs.createIndex("by_chapter", "chapter", { unique: false });
        qs.createIndex("by_tags", "tags", { unique: false, multiEntry: true });
      }
      if (!db.objectStoreNames.contains("answers")) {
        const ans = db.createObjectStore("answers", {
          keyPath: "id",
          autoIncrement: true
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

// ---------- Global UI state ----------
let currentQuestion = null;
let currentChoices = [];
let lastSelectedIndex = null;
let lastResult = null;
let currentMode = "all";
let currentChapterFilter = "";
let currentTagFilter = "";
let pdfExtractedText = "";
let perfChart = null;

// DOM refs
const questionPanel = document.getElementById("questionPanel");
const feedbackPanel = document.getElementById("feedbackPanel");
const historyListEl = document.getElementById("historyList");
const modeSelect = document.getElementById("modeSelect");
const chapterFilterInput = document.getElementById("chapterFilter");
const tagFilterInput = document.getElementById("tagFilter");
const statsBar = document.getElementById("statsBar");
const lastSyncInfo = document.getElementById("lastSyncInfo");
const offlineStatus = document.getElementById("offlineStatus");

// buttons
document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
document.getElementById("btnNext").addEventListener("click", () => {
  lastResult = null;
  feedbackPanel.innerHTML = "";
  loadNextQuestion();
});
document.getElementById("btnFlag").addEventListener("click", toggleFlag);
document.getElementById("btnDeleteQuestion").addEventListener("click", deleteCurrentQuestion);

document.getElementById("btnImport").addEventListener("click", handleImport);
document.getElementById("btnExport").addEventListener("click", handleExport);

document.getElementById("btnSaveSettings").addEventListener("click", saveSettings);
document.getElementById("btnUploadBackup").addEventListener("click", uploadBackupToGitHub);
document.getElementById("btnDownloadBackup").addEventListener("click", downloadBackupFromGitHub);

// mode / filters
modeSelect.addEventListener("change", () => {
  currentMode = modeSelect.value;
  loadNextQuestion();
});
chapterFilterInput.addEventListener("input", () => {
  currentChapterFilter = chapterFilterInput.value.trim();
  loadNextQuestion();
});
tagFilterInput.addEventListener("input", () => {
  currentTagFilter = tagFilterInput.value.trim();
  loadNextQuestion();
});

// PDF handlers
document.getElementById("btnExtractPdf").addEventListener("click", extractPdfText);
document.getElementById("btnGenerateFromPdf").addEventListener("click", generateQuestionsFromPdf);

// network indicator
window.addEventListener("online", updateOfflineChip);
window.addEventListener("offline", updateOfflineChip);

// ---------- Settings (localStorage only) ----------
const SETTINGS_KEY = "mcqapp_settings_v3";

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  let s = {
    githubToken: "",
    githubRepo: "Awad1992/mcq-data",
    autoSync: false
  };
  if (raw) {
    try {
      s = Object.assign(s, JSON.parse(raw));
    } catch (_) {}
  }
  document.getElementById("githubToken").value = s.githubToken || "";
  document.getElementById("githubRepo").value = s.githubRepo || "Awad1992/mcq-data";
  document.getElementById("autoSync").checked = !!s.autoSync;
  return s;
}

function getSettingsFromUI() {
  return {
    githubToken: document.getElementById("githubToken").value.trim(),
    githubRepo: document.getElementById("githubRepo").value.trim(),
    autoSync: document.getElementById("autoSync").checked
  };
}

function saveSettings() {
  const s = getSettingsFromUI();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  alert("Settings saved locally.");
}

// debounced autosync
let autoSyncTimer = null;
function scheduleAutoSync() {
  const s = getSettingsFromUI();
  if (!s.autoSync || !s.githubToken || !s.githubRepo) return;
  if (autoSyncTimer) clearTimeout(autoSyncTimer);
  autoSyncTimer = setTimeout(() => {
    uploadBackupToGitHub(true).catch(() => {});
  }, 2500);
}

// ---------- Question helpers ----------
function randomChoice(arr) {
  if (!arr || !arr.length) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

async function getAllQuestions() {
  const tx = db.transaction("questions", "readonly");
  const store = tx.objectStore("questions");
  return new Promise((resolve) => {
    const req = store.getAll();
    req.onsuccess = (e) => resolve(e.target.result || []);
    req.onerror = () => resolve([]);
  });
}

async function getStats() {
  const all = await getAllQuestions();
  const stats = {
    total: all.length,
    answered: all.filter((q) => q.timesSeen > 0).length,
    withWrong: all.filter((q) => q.timesWrong > 0).length,
    flagged: all.filter((q) => q.flagged).length
  };
  return stats;
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
  }

  if (currentChapterFilter) {
    const c = currentChapterFilter.toLowerCase();
    filtered = filtered.filter((q) => (q.chapter || "").toLowerCase().includes(c));
  }

  if (currentMode === "tag" || currentTagFilter) {
    const t = currentTagFilter.toLowerCase();
    if (t) {
      filtered = filtered.filter((q) =>
        (q.tags || []).some((tag) => (tag || "").toLowerCase().includes(t))
      );
    }
  }

  if (!filtered.length) filtered = all;

  // sort by lastSeen, least seen first
  filtered.sort((a, b) => {
    const as = a.lastSeenAt || "";
    const bs = b.lastSeenAt || "";
    if (as === bs) return (a.timesSeen || 0) - (b.timesSeen || 0);
    return as.localeCompare(bs);
  });

  const slice = filtered.slice(0, Math.min(filtered.length, 60));
  return randomChoice(slice);
}

function renderQuestion() {
  if (!currentQuestion) {
    questionPanel.innerHTML =
      '<div class="muted small">No questions available. استخدم Import أو مولّد الـ PDF لإضافة أسئلة.</div>';
    return;
  }
  const q = currentQuestion;
  currentChoices = q.choices || [];
  const letters = "ABCDEFG".split("");

  let html = "";
  html += `<div class="q-text"><strong>Q#${q.id || ""}</strong> – ${q.text}</div>`;

  html += `<div class="tag-row">`;
  if (q.chapter) html += `<span class="pill">${q.chapter}</span>`;
  if (q.source) html += `<span class="pill">${q.source}</span>`;
  if (q.tags && q.tags.length) {
    q.tags.slice(0, 4).forEach((t) => {
      html += `<span class="pill">${t}</span>`;
    });
  }
  if (q.flagged) html += `<span class="pill pill-flag">FLAG</span>`;
  html += `</div>`;

  html += `<div>`;
  currentChoices.forEach((c, idx) => {
    const letter = letters[idx] || "?";
    const checked = idx === lastSelectedIndex ? "checked" : "";
    html += `<label class="choice">
      <input type="radio" name="choice" value="${idx}" ${checked} />
      <strong>${letter}.</strong> <span>${c.text}</span>
    </label>`;
  });
  html += `</div>`;

  questionPanel.innerHTML = html;
}

async function updateStatsBar() {
  const s = await getStats();
  statsBar.innerHTML = `
    <div>Total: <strong>${s.total}</strong></div>
    <div>Answered: <strong>${s.answered}</strong></div>
    <div>Wrong ≥1: <strong>${s.withWrong}</strong></div>
    <div>Flagged: <strong>${s.flagged}</strong></div>
  `;
}

async function loadHistory() {
  const tx = db.transaction(["answers", "questions"], "readonly");
  const aStore = tx.objectStore("answers");
  const qStore = tx.objectStore("questions");

  const answers = await new Promise((resolve) => {
    const req = aStore.getAll();
    req.onsuccess = (e) => resolve(e.target.result || []);
    req.onerror = () => resolve([]);
  });

  answers.sort((a, b) => (b.answeredAt || "").localeCompare(a.answeredAt || ""));
  const recent = answers.slice(0, 60);

  const qCache = {};
  await Promise.all(
    recent.map(
      (a) =>
        new Promise((res) => {
          if (qCache[a.questionId]) return res();
          const r = qStore.get(a.questionId);
          r.onsuccess = (e) => {
            qCache[a.questionId] = e.target.result;
            res();
          };
          r.onerror = () => res();
        })
    )
  );

  let html = "";
  recent.forEach((a) => {
    const q = qCache[a.questionId];
    if (!q) return;
    html += `<div class="history-item" data-qid="${q.id}">
      <div>${(q.text || "").slice(0, 90)}${q.text && q.text.length > 90 ? "…" : ""}</div>
      <div class="muted small">
        ${(q.chapter || "").slice(0, 22)}
        <span class="pill ${a.isCorrect ? "pill-correct" : "pill-wrong"}">${
      a.isCorrect ? "Correct" : "Wrong"
    }</span>
        ${q.flagged ? '<span class="pill pill-flag">Flag</span>' : ""}
      </div>
    </div>`;
  });

  historyListEl.innerHTML = html || '<div class="muted small">No history yet.</div>';

  historyListEl.querySelectorAll(".history-item").forEach((item) => {
    item.addEventListener("click", async () => {
      const id = parseInt(item.getAttribute("data-qid"), 10);
      const tx2 = db.transaction("questions", "readonly");
      const store2 = tx2.objectStore("questions");
      const q = await new Promise((res) => {
        const r = store2.get(id);
        r.onsuccess = (e) => res(e.target.result);
        r.onerror = () => res(null);
      });
      if (!q) return;
      currentQuestion = q;
      lastResult = null;
      lastSelectedIndex = null;
      feedbackPanel.innerHTML = "";
      renderQuestion();
    });
  });

  updatePerformanceChart(answers);
}

async function loadNextQuestion() {
  currentQuestion = await pickQuestion();
  lastSelectedIndex = null;
  lastResult = null;
  feedbackPanel.innerHTML = "";
  renderQuestion();
  updateStatsBar();
  loadHistory();
}

// ---------- Answering ----------

async function submitAnswer() {
  if (!currentQuestion) return;

  const radios = document.querySelectorAll('input[name="choice"]');
  let selectedIdx = null;
  radios.forEach((r) => {
    if (r.checked) selectedIdx = parseInt(r.value, 10);
  });
  if (selectedIdx === null) {
    alert("اختر إجابة أولاً.");
    return;
  }
  lastSelectedIndex = selectedIdx;

  const correctIdx = (currentQuestion.choices || []).findIndex((c) => c.isCorrect);
  const isCorrect = selectedIdx === correctIdx;
  lastResult = isCorrect;

  const now = new Date().toISOString();

  const tx = db.transaction(["questions", "answers"], "readwrite");
  const qStore = tx.objectStore("questions");
  const aStore = tx.objectStore("answers");

  const q = Object.assign({}, currentQuestion);
  q.timesSeen = (q.timesSeen || 0) + 1;
  q.timesCorrect = (q.timesCorrect || 0) + (isCorrect ? 1 : 0);
  q.timesWrong = (q.timesWrong || 0) + (!isCorrect ? 1 : 0);
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
    showFeedback(correctIdx, selectedIdx, q);
    updateStatsBar();
    loadHistory();
    scheduleAutoSync();
  };
}

function showFeedback(correctIdx, selectedIdx, q) {
  const letters = "ABCDEFG".split("");
  const choices = currentChoices || [];

  document.querySelectorAll(".choice").forEach((el, idx) => {
    el.classList.remove("correct", "wrong", "show");
    if (idx === correctIdx) el.classList.add("correct", "show");
    if (idx === selectedIdx && idx !== correctIdx) el.classList.add("wrong", "show");
  });

  let html = "";
  html += `<div>`;
  html += `<div style="margin-bottom:0.25rem; font-weight:600; ${
    lastResult ? "color:#a5d6a7" : "color:#ff8a80"
  }">${lastResult ? "Correct ✅" : "Wrong ❌"}</div>`;
  if (correctIdx >= 0 && choices[correctIdx]) {
    html += `<div class="small muted">Correct answer: <strong>${letters[correctIdx]}.</strong> ${
      choices[correctIdx].text
    }</div>`;
  }
  if (q.explanation) {
    html += `<div class="small muted" style="margin-top:0.25rem;"><strong>Explanation:</strong> ${
      q.explanation
    }</div>`;
  }
  html += `</div>`;
  feedbackPanel.innerHTML = html;
}

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
    loadHistory();
    updateStatsBar();
    scheduleAutoSync();
  };
}

async function deleteCurrentQuestion() {
  if (!currentQuestion) return;
  if (!confirm("هل أنت متأكد من حذف هذا السؤال بالكامل؟")) return;
  const id = currentQuestion.id;
  const tx = db.transaction(["questions"], "readwrite");
  tx.objectStore("questions").delete(id);
  tx.oncomplete = () => {
    currentQuestion = null;
    renderQuestion();
    updateStatsBar();
    loadHistory();
    scheduleAutoSync();
  };
}

// ---------- Import / Export JSON ----------

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
      if (!Array.isArray(data)) throw new Error("JSON should be an array of questions");

      const tx = db.transaction("questions", "readwrite");
      const store = tx.objectStore("questions");

      data.forEach((q) => {
        const obj = {
          text: q.text,
          chapter: q.chapter || "",
          source: q.source || "",
          explanation: q.explanation || "",
          choices: q.choices || [],
          tags: q.tags || [],
          timesSeen: q.timesSeen || 0,
          timesCorrect: q.timesCorrect || 0,
          timesWrong: q.timesWrong || 0,
          lastSeenAt: q.lastSeenAt || null,
          flagged: !!q.flagged,
          active: q.active !== false
        };
        if (q.id) obj.id = q.id;
        store.put(obj);
      });

      tx.oncomplete = () => {
        alert(`Imported ${data.length} questions.`);
        loadNextQuestion();
        scheduleAutoSync();
      };
    } catch (err) {
      alert("Error reading JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

async function handleExport() {
  const all = await getAllQuestions();
  const data = all.map((q) => ({
    id: q.id,
    text: q.text,
    chapter: q.chapter,
    source: q.source,
    explanation: q.explanation,
    choices: q.choices,
    tags: q.tags || [],
    flagged: !!q.flagged,
    active: q.active !== false,
    timesSeen: q.timesSeen || 0,
    timesCorrect: q.timesCorrect || 0,
    timesWrong: q.timesWrong || 0,
    lastSeenAt: q.lastSeenAt || null
  }));

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "mcq_backup.json";
  a.click();
}

// ---------- GitHub sync (manual + auto) ----------

async function collectBackupPayload() {
  const questions = await getAllQuestions();

  // Also export answers to preserve performance curve
  const tx = db.transaction("answers", "readonly");
  const aStore = tx.objectStore("answers");
  const answers = await new Promise((resolve) => {
    const r = aStore.getAll();
    r.onsuccess = (e) => resolve(e.target.result || []);
    r.onerror = () => resolve([]);
  });

  return { version: 3, exportedAt: new Date().toISOString(), questions, answers };
}

async function uploadBackupToGitHub(silent = false) {
  const settings = getSettingsFromUI();
  if (!settings.githubToken || !settings.githubRepo) {
    if (!silent) alert("Token و Repository مطلوبان.");
    return;
  }
  const [owner, repo] = settings.githubRepo.split("/");
  const path = "backup.json";

  const payload = await collectBackupPayload();
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(payload, null, 2))));

  // get existing SHA
  let sha = null;
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${settings.githubToken}`,
    "Content-Type": "application/json"
  };

  try {
    const resGet = await fetch(baseUrl, { headers });
    if (resGet.ok) {
      const cur = await resGet.json();
      sha = cur.sha;
    }
  } catch (_) {}

  const body = {
    message: "MCQ backup update",
    content,
    sha
  };

  const resPut = await fetch(baseUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify(body)
  });

  if (!resPut.ok) {
    if (!silent) alert("GitHub upload failed. Check token / repo / permissions.");
    return;
  }

  const info = await resPut.json();
  lastSyncInfo.textContent = `Last upload: ${new Date().toLocaleString()}`;
  if (!silent) alert("Backup uploaded to GitHub.");
}

async function downloadBackupFromGitHub() {
  const settings = getSettingsFromUI();
  if (!settings.githubToken || !settings.githubRepo) {
    alert("Token و Repository مطلوبان.");
    return;
  }
  const [owner, repo] = settings.githubRepo.split("/");
  const path = "backup.json";
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${settings.githubToken}`,
    "Content-Type": "application/json"
  };

  const res = await fetch(baseUrl, { headers });
  if (!res.ok) {
    alert("Download failed. تأكد أن الملف backup.json موجود في الريبو.");
    return;
  }
  const data = await res.json();
  const decoded = decodeURIComponent(escape(atob(data.content)));
  const payload = JSON.parse(decoded);

  // Replace DB content
  const tx1 = db.transaction(["questions", "answers"], "readwrite");
  tx1.objectStore("questions").clear();
  tx1.objectStore("answers").clear();
  await new Promise((res2) => {
    tx1.oncomplete = res2;
  });

  const tx2 = db.transaction(["questions", "answers"], "readwrite");
  const qStore = tx2.objectStore("questions");
  (payload.questions || []).forEach((q) => qStore.put(q));
  const aStore = tx2.objectStore("answers");
  (payload.answers || []).forEach((a) => aStore.put(a));

  await new Promise((res3) => {
    tx2.oncomplete = res3;
  });

  lastSyncInfo.textContent = `Last download: ${new Date().toLocaleString()}`;
  alert("Backup downloaded and applied.");
  loadNextQuestion();
}

// ---------- Performance chart ----------

function updatePerformanceChart(answers) {
  const ctx = document.getElementById("perfChart").getContext("2d");
  if (!answers || !answers.length) {
    if (perfChart) {
      perfChart.destroy();
      perfChart = null;
    }
    return;
  }

  const byDay = {};
  answers.forEach((a) => {
    if (!a.answeredAt) return;
    const d = a.answeredAt.slice(0, 10);
    if (!byDay[d]) byDay[d] = { total: 0, correct: 0 };
    byDay[d].total += 1;
    if (a.isCorrect) byDay[d].correct += 1;
  });

  const days = Object.keys(byDay).sort();
  const ratios = days.map((d) =>
    byDay[d].total ? Math.round((byDay[d].correct / byDay[d].total) * 100) : 0
  );

  if (perfChart) perfChart.destroy();
  perfChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "% correct per day",
          data: ratios,
          tension: 0.25
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20 }
        }
      }
    }
  });
}

// ---------- PDF → MCQ generator (Mode C) ----------

async function extractPdfText() {
  const file = document.getElementById("pdfInput").files[0];
  const log = document.getElementById("pdfLog");
  if (!file) {
    alert("اختر ملف PDF أولاً.");
    return;
  }
  if (!window["pdfjsLib"]) {
    alert("pdf.js library not loaded.");
    return;
  }

  log.value = "Reading PDF...\n";
  pdfExtractedText = "";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map((it) => it.str);
    const text = strings.join(" ");
    pdfExtractedText += text + "\n";
    if (pageNum % 3 === 0 || pageNum === pdf.numPages) {
      log.value += `Page ${pageNum}/${pdf.numPages} processed.\n`;
    }
  }

  // keep a trimmed preview
  const preview = pdfExtractedText.slice(0, 1500);
  log.value += "\n=== Preview (first ~1500 chars) ===\n" + preview;
}

function pickKeyWord(words) {
  const stop = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "from",
    "this",
    "these",
    "those",
    "which",
    "were",
    "been",
    "their",
    "there",
    "when",
    "where",
    "into",
    "without",
    "within",
    "such",
    "than",
    "then",
    "over",
    "under",
    "between",
    "because",
    "while",
    "although"
  ]);
  let best = null;
  words.forEach((w) => {
    const clean = w.replace(/[^A-Za-z0-9%]/g, "");
    if (!clean || clean.length < 3) return;
    if (stop.has(clean.toLowerCase())) return;
    if (!best || clean.length > best.length) best = clean;
  });
  return best;
}

function buildDistractors(correct, poolWords) {
  const uniq = Array.from(
    new Set(
      poolWords
        .map((w) => w.replace(/[^A-Za-z0-9%]/g, ""))
        .filter((w) => w && w.toLowerCase() !== correct.toLowerCase())
    )
  );
  const shuffled = uniq.sort(() => Math.random() - 0.5);
  const distractors = shuffled.slice(0, 3);
  while (distractors.length < 3) {
    distractors.push("None of the above");
  }
  return distractors;
}

async function generateQuestionsFromPdf() {
  const log = document.getElementById("pdfLog");
  if (!pdfExtractedText) {
    alert("إعمل Extract text أولاً.");
    return;
  }
  const chapterLabel = document.getElementById("pdfChapter").value.trim() || "PDF Chapter";
  const tagsRaw = document.getElementById("pdfTags").value.trim();
  const tagList = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const count = parseInt(document.getElementById("pdfQuestionCount").value, 10) || 15;
  const preferHighYield = document.getElementById("pdfPreferHighYield").checked;

  log.value += "\n\nGenerating MCQs...\n";

  // split to sentences
  let sentences = pdfExtractedText
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25 && s.length < 260);

  if (!sentences.length) {
    alert("لم أستطع استخراج جمل مناسبة من الـ PDF.");
    return;
  }

  // bias: sentences containing numbers / vs / increase / decrease / mortality...
  if (preferHighYield) {
    const high = sentences.filter((s) =>
      /(vs\.?| versus |increase|decrease|higher|lower|mortality|incidence|pressure|volume|ml\/kg|mmhg|%)/i.test(
        s
      )
    );
    if (high.length >= 5) sentences = high;
  }

  const poolWords = pdfExtractedText.split(/\s+/);

  const questions = [];
  sentences.sort(() => Math.random() - 0.5);

  for (let i = 0; i < sentences.length && questions.length < count; i++) {
    const s = sentences[i];
    const words = s.split(/\s+/);
    const key = pickKeyWord(words);
    if (!key) continue;

    const stem = s.replace(key, "_____");
    const correct = key;
    const distractors = buildDistractors(correct, poolWords);

    // Explanation: short – why correct / others wrong
    const explanation =
      `Correct: "${correct}" fits the context of this statement. ` +
      `Other options either refer to different values/conditions or contradict the core concept in this sentence.`;

    const choices = [
      { text: correct, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    questions.push({
      text: `In the context of the chapter, which word best completes: "${stem}"?`,
      chapter: chapterLabel,
      source: "PDF auto-generated",
      explanation,
      choices,
      tags: tagList.slice(),
      timesSeen: 0,
      timesCorrect: 0,
      timesWrong: 0,
      lastSeenAt: null,
      flagged: false,
      active: true
    });
  }

  if (!questions.length) {
    alert("لم يتم توليد أي سؤال، جرّب تقليل عدد الأسئلة أو اختيار PDF آخر.");
    return;
  }

  const tx = db.transaction("questions", "readwrite");
  const store = tx.objectStore("questions");
  questions.forEach((q) => store.add(q));
  tx.oncomplete = () => {
    log.value += `Generated and stored ${questions.length} MCQs.\n`;
    alert(`Generated ${questions.length} questions from PDF.`);
    loadNextQuestion();
    scheduleAutoSync();
  };
}

// ---------- Misc ----------

function updateOfflineChip() {
  if (navigator.onLine) {
    offlineStatus.textContent = "Online (cached)";
  } else {
    offlineStatus.textContent = "Offline";
  }
}

// ---------- Init ----------

(async function init() {
  updateOfflineChip();
  loadSettings();
  await openDB();
  await loadNextQuestion();
})();
