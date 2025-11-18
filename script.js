
const STORAGE_KEY = "ULTRA_PRO_MAX_V5_DB";
let state = { questions: [] };

function nowIso() { return new Date().toISOString(); }

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state.questions = raw ? (JSON.parse(raw).questions || []) : [];
  } catch {
    state.questions = [];
  }
}

function saveState(showStatus = true) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    questions: state.questions,
    savedAt: nowIso(),
  }));
  if (showStatus) {
    const el = document.getElementById("saveStatus");
    if (el) {
      el.textContent = "Saved " + new Date().toLocaleTimeString();
      setTimeout(() => el.textContent = "", 3000);
    }
  }
}

function generateNextId() {
  if (state.questions.length === 0) return "Q001";
  const nums = state.questions
    .map(q => q.id)
    .filter(id => /^Q\d+$/.test(id))
    .map(id => parseInt(id.slice(1), 10))
    .filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  const next = max + 1;
  return next < 1000 ? "Q" + String(next).padStart(3, "0") : "Q" + String(next);
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const t = document.getElementById("view-" + viewId);
  if (t) t.classList.add("active");
  if (viewId === "list") renderQuestionsTable();
}

function clearForm() {
  document.getElementById("questionForm").reset();
  document.getElementById("qId").value = "";
}

function getFormData() {
  const id = document.getElementById("qId").value.trim();
  const stem = document.getElementById("qStem").value.trim();
  const explanation = document.getElementById("qExplanation").value.trim();
  const topic = document.getElementById("qTopic").value.trim();
  const subtopic = document.getElementById("qSubtopic").value.trim();
  const difficulty = document.getElementById("qDifficulty").value || "moderate";
  const tags = document.getElementById("qTags").value.split(",").map(t => t.trim()).filter(Boolean);
  const source = document.getElementById("qSource").value.trim();
  const flagged = document.getElementById("qFlagged").checked;
  const correctOptionId = document.getElementById("correctOptionId").value || null;
  const options = Array.from(document.querySelectorAll(".optText")).map(i => ({
    id: i.dataset.optId,
    text: i.value.trim(),
  }));
  return { id, stem, explanation, topic, subtopic, difficulty, tags, source, flagged, correctOptionId, options };
}

function validateQuestion(q) {
  if (!q.stem) { alert("Question stem is required."); return false; }
  if (!q.correctOptionId) { alert("Please choose a correct option."); return false; }
  const hasText = q.options.some(o => o.id === q.correctOptionId && o.text);
  if (!hasText) { alert("Correct option must have text."); return false; }
  return true;
}

function upsertQuestion() {
  const data = getFormData();
  let id = data.id;
  if (!id) { id = generateNextId(); data.id = id; }
  if (!validateQuestion(data)) return;

  const idx = state.questions.findIndex(q => q.id === id);
  const baseMeta = {
    timesAnswered: 0,
    timesCorrect: 0,
    lastAnsweredAt: null,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  if (idx === -1) {
    state.questions.push({ ...baseMeta, ...data });
  } else {
    const old = state.questions[idx];
    state.questions[idx] = {
      ...old,
      ...data,
      createdAt: old.createdAt || baseMeta.createdAt,
      updatedAt: nowIso(),
    };
  }
  saveState();
  alert("Saved: " + id);
  renderQuestionsTable();
}

function loadQuestionToForm(id) {
  const q = state.questions.find(x => x.id === id);
  if (!q) return;
  switchView("editor");
  document.getElementById("qId").value = q.id || "";
  document.getElementById("qStem").value = q.stem || "";
  document.getElementById("qExplanation").value = q.explanation || "";
  document.getElementById("qTopic").value = q.topic || "";
  document.getElementById("qSubtopic").value = q.subtopic || "";
  document.getElementById("qDifficulty").value = q.difficulty || "moderate";
  document.getElementById("qTags").value = (q.tags || []).join(", ");
  document.getElementById("qSource").value = q.source || "";
  document.getElementById("qFlagged").checked = !!q.flagged;
  document.getElementById("correctOptionId").value = q.correctOptionId || "";
  const map = {};
  (q.options || []).forEach(o => map[o.id] = o.text);
  document.querySelectorAll(".optText").forEach(i => i.value = map[i.dataset.optId] || "");
}

function applyFilters(q) {
  const search = document.getElementById("filterSearch").value.toLowerCase();
  const topic = document.getElementById("filterTopic").value.toLowerCase();
  const diff = document.getElementById("filterDifficulty").value;
  const flag = document.getElementById("filterFlagged").value;
  const answered = document.getElementById("filterAnswered").value;

  if (search) {
    const blob = (q.stem + " " + (q.tags || []).join(" ") + " " + (q.topic || "")).toLowerCase();
    if (!blob.includes(search)) return false;
  }
  if (topic && (!q.topic || !q.topic.toLowerCase().includes(topic))) return false;
  if (diff && q.difficulty !== diff) return false;
  if (flag === "true" && !q.flagged) return false;
  if (flag === "false" && q.flagged) return false;

  const tAns = q.timesAnswered || 0;
  const tOK = q.timesCorrect || 0;
  if (answered === "never" && tAns > 0) return false;
  if (answered === "wrong" && !(tAns > 0 && tOK < tAns)) return false;
  if (answered === "perfect" && !(tAns > 0 && tOK === tAns)) return false;

  return true;
}

function renderQuestionsTable() {
  const tbody = document.querySelector("#questionsTable tbody");
  tbody.innerHTML = "";
  const lastNVal = parseInt(document.getElementById("filterLastN").value || "0", 10);
  let filtered = state.questions.filter(applyFilters);

  // default sort by id asc
  filtered.sort((a, b) => (a.id || "").localeCompare(b.id || ""));

  // Last N added filter using createdAt desc
  if (lastNVal > 0) {
    filtered.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    filtered = filtered.slice(0, lastNVal);
  }

  for (const q of filtered) {
    const tr = document.createElement("tr");

    const tdSel = document.createElement("td");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "rowSelector";
    cb.dataset.id = q.id;
    tdSel.appendChild(cb);
    tr.appendChild(tdSel);

    const tdId = document.createElement("td");
    tdId.textContent = q.id;
    tr.appendChild(tdId);

    const tdStem = document.createElement("td");
    tdStem.textContent = q.stem.length > 120 ? q.stem.slice(0, 117) + "..." : q.stem;
    tr.appendChild(tdStem);

    const tdTopic = document.createElement("td");
    tdTopic.textContent = q.topic || "";
    tr.appendChild(tdTopic);

    const tdDiff = document.createElement("td");
    tdDiff.textContent = q.difficulty || "";
    tr.appendChild(tdDiff);

    const tdFlag = document.createElement("td");
    tdFlag.textContent = q.flagged ? "★" : "";
    tr.appendChild(tdFlag);

    const tdStats = document.createElement("td");
    const tAns = q.timesAnswered || 0;
    const tOK = q.timesCorrect || 0;
    tdStats.textContent = tOK + "/" + tAns;
    tr.appendChild(tdStats);

    const tdLast = document.createElement("td");
    tdLast.textContent = q.lastAnsweredAt ? new Date(q.lastAnsweredAt).toLocaleDateString() : "";
    tr.appendChild(tdLast);

    const tdActions = document.createElement("td");
    tdActions.className = "actions";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => loadQuestionToForm(q.id);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      if (!confirm("Delete " + q.id + "?")) return;
      state.questions = state.questions.filter(x => x.id !== q.id);
      saveState();
      renderQuestionsTable();
    };
    const flagBtn = document.createElement("button");
    flagBtn.textContent = q.flagged ? "Unflag" : "Flag";
    flagBtn.onclick = () => {
      q.flagged = !q.flagged;
      saveState(false);
      renderQuestionsTable();
    };
    tdActions.appendChild(editBtn);
    tdActions.appendChild(delBtn);
    tdActions.appendChild(flagBtn);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  }
}

function getSelectedIds() {
  return Array.from(document.querySelectorAll(".rowSelector"))
    .filter(cb => cb.checked)
    .map(cb => cb.dataset.id);
}

function bulkDelete(ids) {
  if (!ids.length) return;
  if (!confirm("Delete " + ids.length + " questions?")) return;
  state.questions = state.questions.filter(q => !ids.includes(q.id));
  saveState();
  renderQuestionsTable();
}

function bulkFlag(ids, val) {
  if (!ids.length) return;
  state.questions.forEach(q => { if (ids.includes(q.id)) q.flagged = val; });
  saveState(false);
  renderQuestionsTable();
}

function exportJson() {
  const payload = { questions: state.questions, exportedAt: nowIso(), formatVersion: 1 };
  const json = JSON.stringify(payload, null, 2);
  document.getElementById("rawJsonArea").value = json;
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Ultra_Pro_Max_V5_Questions.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importJsonFromText(text) {
  try {
    const parsed = JSON.parse(text);
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      alert("Invalid JSON: expected { questions: [...] }");
      return;
    }
    const map = new Map();
    state.questions.forEach(q => map.set(q.id, q));
    parsed.questions.forEach(q => {
      if (!q.id) return;
      if (!q.createdAt) q.createdAt = nowIso();
      if (!q.updatedAt) q.updatedAt = nowIso();
      if (typeof q.timesAnswered !== "number") q.timesAnswered = 0;
      if (typeof q.timesCorrect !== "number") q.timesCorrect = 0;
      map.set(q.id, { ...(map.get(q.id) || {}), ...q });
    });
    state.questions = Array.from(map.values());
    saveState();
    renderQuestionsTable();
    alert("Import done. Total: " + state.questions.length);
  } catch (e) {
    console.error(e);
    alert("Failed to parse JSON.");
  }
}

function init() {
  loadState();

  document.querySelectorAll("header nav button").forEach(b => {
    b.onclick = () => switchView(b.dataset.view);
  });
  document.getElementById("saveAllBtn").onclick = () => saveState(true);
  document.getElementById("generateIdBtn").onclick = () => {
    document.getElementById("qId").value = generateNextId();
  };
  document.getElementById("questionForm").onsubmit = e => {
    e.preventDefault();
    upsertQuestion();
  };
  document.getElementById("resetFormBtn").onclick = clearForm;

  ["filterSearch","filterTopic","filterDifficulty","filterFlagged","filterAnswered","filterLastN"]
    .forEach(id => {
      const el = document.getElementById(id);
      el.oninput = renderQuestionsTable;
      el.onchange = renderQuestionsTable;
    });

  document.getElementById("masterCheckbox").onchange = e => {
    const c = e.target.checked;
    document.querySelectorAll(".rowSelector").forEach(cb => cb.checked = c);
  };
  document.getElementById("bulkSelectAllBtn").onclick = () => {
    document.querySelectorAll(".rowSelector").forEach(cb => cb.checked = true);
    document.getElementById("masterCheckbox").checked = true;
  };
  document.getElementById("bulkClearSelectionBtn").onclick = () => {
    document.querySelectorAll(".rowSelector").forEach(cb => cb.checked = false);
    document.getElementById("masterCheckbox").checked = false;
  };
  document.getElementById("bulkDeleteBtn").onclick = () => bulkDelete(getSelectedIds());
  document.getElementById("bulkFlagBtn").onclick = () => bulkFlag(getSelectedIds(), true);
  document.getElementById("bulkUnflagBtn").onclick = () => bulkFlag(getSelectedIds(), false);

  document.getElementById("exportJsonBtn").onclick = exportJson;
  document.getElementById("importJsonBtn").onclick = () => {
    const fileInput = document.getElementById("importJsonInput");
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = e => importJsonFromText(e.target.result);
      reader.readAsText(fileInput.files[0]);
    } else {
      const text = document.getElementById("rawJsonArea").value.trim();
      if (!text) {
        alert("Paste JSON or choose file.");
        return;
      }
      importJsonFromText(text);
    }
  };

  switchView("editor");
  renderQuestionsTable();
}

document.addEventListener("DOMContentLoaded", init);
