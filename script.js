
// Ultra Pro Max V5 – MCQ Bank logic
// All data stored in localStorage under key ULTRA_PRO_MAX_V5_DB

const STORAGE_KEY = "ULTRA_PRO_MAX_V5_DB";

let state = {
    questions: [],
    practiceSession: null,
};

// Utility
function nowIso() {
    return new Date().toISOString();
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            state.questions = [];
            return;
        }
        const parsed = JSON.parse(raw);
        state.questions = parsed.questions || [];
    } catch (e) {
        console.error("Failed to load state", e);
        state.questions = [];
    }
}

function saveState(showStatus = true) {
    const payload = {
        questions: state.questions,
        savedAt: nowIso(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    if (showStatus) {
        const el = document.getElementById("saveStatus");
        if (el) {
            el.textContent = "Saved " + new Date().toLocaleTimeString();
            setTimeout(() => (el.textContent = ""), 3000);
        }
    }
}

// ID generation – Q001, Q002 ... Q999, then Q1000, etc.
function generateNextId() {
    if (state.questions.length === 0) return "Q001";
    const ids = state.questions
        .map(q => q.id)
        .filter(id => /^Q\d+$/.test(id))
        .map(id => parseInt(id.slice(1), 10))
        .filter(n => !isNaN(n));
    const max = ids.length ? Math.max(...ids) : 0;
    const next = max + 1;
    if (next < 1000) {
        return "Q" + String(next).padStart(3, "0");
    }
    return "Q" + String(next); // Q1000 and beyond, no padding
}

// Views
function switchView(viewId) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    const target = document.getElementById("view-" + viewId);
    if (target) target.classList.add("active");
    if (viewId === "list") renderQuestionsTable();
}

// Form helpers
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
    const tags = document.getElementById("qTags").value
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
    const source = document.getElementById("qSource").value.trim();
    const flagged = document.getElementById("qFlagged").checked;
    const correctOptionId = document.getElementById("correctOptionId").value || null;

    const options = Array.from(document.querySelectorAll(".optText")).map(input => ({
        id: input.dataset.optId,
        text: input.value.trim(),
    }));

    return {
        id,
        stem,
        explanation,
        topic,
        subtopic,
        difficulty,
        tags,
        source,
        flagged,
        correctOptionId,
        options,
    };
}

function validateQuestion(q) {
    if (!q.stem) {
        alert("Question stem is required.");
        return false;
    }
    if (!q.correctOptionId) {
        alert("Please choose a correct option.");
        return false;
    }
    const hasText = q.options.some(o => o.id === q.correctOptionId && o.text);
    if (!hasText) {
        alert("Correct option must have text.");
        return false;
    }
    return true;
}

function upsertQuestion() {
    const data = getFormData();
    let id = data.id;
    if (!id) {
        id = generateNextId();
        data.id = id;
    }
    if (!validateQuestion(data)) return;

    // Find index
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
    alert("Question saved: " + id);
    renderQuestionsTable();
}

function loadQuestionToForm(id) {
    const q = state.questions.find(q => q.id === id);
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
    (q.options || []).forEach(o => {
        map[o.id] = o.text;
    });
    document.querySelectorAll(".optText").forEach(input => {
        input.value = map[input.dataset.optId] || "";
    });
}

// Table rendering
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
    if (topic && (!q.topic || q.topic.toLowerCase().indexOf(topic) === -1)) {
        return false;
    }
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

    const lastNInput = document.getElementById("filterLastN");
    const lastN = lastNInput ? parseInt(lastNInput.value, 10) || 0 : 0;

    let filtered = state.questions.filter(applyFilters);

    // Default sort by ID ascending
    filtered.sort((a, b) => (a.id || "").localeCompare(b.id || ""));

    // If Last N added is requested -> sort by createdAt desc and slice
    if (lastN > 0) {
        filtered.sort((a, b) => {
            const aC = a.createdAt || "";
            const bC = b.createdAt || "";
            return bC.localeCompare(aC);
        });
        filtered = filtered.slice(0, lastN);
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
        tdStats.textContent = `${tOK}/${tAns}`;
        tr.appendChild(tdStats);

        const tdLast = document.createElement("td");
        tdLast.textContent = q.lastAnsweredAt ? new Date(q.lastAnsweredAt).toLocaleDateString() : "";
        tr.appendChild(tdLast);

        const tdActions = document.createElement("td");
        tdActions.className = "actions";
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => loadQuestionToForm(q.id));
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            if (!confirm("Delete question " + q.id + "?")) return;
            state.questions = state.questions.filter(x => x.id !== q.id);
            saveState();
            renderQuestionsTable();
        });
        const flagBtn = document.createElement("button");
        flagBtn.textContent = q.flagged ? "Unflag" : "Flag";
        flagBtn.addEventListener("click", () => {
            q.flagged = !q.flagged;
            saveState(false);
            renderQuestionsTable();
        });

        tdActions.appendChild(editBtn);
        tdActions.appendChild(delBtn);
        tdActions.appendChild(flagBtn);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    }
}

// Bulk operations
function getSelectedIds() {
    return Array.from(document.querySelectorAll(".rowSelector"))
        .filter(cb => cb.checked)
        .map(cb => cb.dataset.id);
}

function bulkDelete(ids) {
    if (!ids.length) return;
    if (!confirm("Delete " + ids.length + " selected questions?")) return;
    state.questions = state.questions.filter(q => !ids.includes(q.id));
    saveState();
    renderQuestionsTable();
}

function bulkFlag(ids, value) {
    if (!ids.length) return;
    state.questions.forEach(q => {
        if (ids.includes(q.id)) q.flagged = value;
    });
    saveState(false);
    renderQuestionsTable();
}

// Import / Export
function exportJson() {
    const payload = {
        questions: state.questions,
        exportedAt: nowIso(),
        formatVersion: 1,
    };
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
        const existingById = new Map();
        state.questions.forEach(q => existingById.set(q.id, q));
        for (const q of parsed.questions) {
            if (!q.id) continue;
            if (existingById.has(q.id)) {
                // merge / update
                const old = existingById.get(q.id);
                const merged = {
                    ...old,
                    ...q,
                    createdAt: old.createdAt || q.createdAt || nowIso(),
                    updatedAt: nowIso(),
                };
                existingById.set(q.id, merged);
            } else {
                if (!q.createdAt) q.createdAt = nowIso();
                if (!q.updatedAt) q.updatedAt = nowIso();
                if (typeof q.timesAnswered !== "number") q.timesAnswered = 0;
                if (typeof q.timesCorrect !== "number") q.timesCorrect = 0;
                existingById.set(q.id, q);
            }
        }
        state.questions = Array.from(existingById.values());
        saveState();
        renderQuestionsTable();
        alert("Import completed. Total questions: " + state.questions.length);
    } catch (e) {
        console.error(e);
        alert("Failed to parse JSON. See console for details.");
    }
}

// Practice mode
function buildPracticePool() {
    const topicFilter = document.getElementById("practiceTopicFilter").value.trim().toLowerCase();
    const flaggedOnly = document.getElementById("practiceFlaggedOnly").checked;
    let pool = state.questions.slice();
    if (topicFilter) {
        pool = pool.filter(q => (q.topic || "").toLowerCase().includes(topicFilter));
    }
    if (flaggedOnly) {
        pool = pool.filter(q => q.flagged);
    }
    return pool;
}

function startPractice() {
    const limit = parseInt(document.getElementById("practiceLimit").value, 10) || 20;
    const pool = buildPracticePool();
    if (!pool.length) {
        alert("No questions match these filters.");
        return;
    }
    // randomize & cap
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, limit);
    state.practiceSession = {
        questions: selected,
        currentIndex: 0,
    };
    document.getElementById("practiceArea").classList.remove("hidden");
    showCurrentPracticeQuestion();
}

function showCurrentPracticeQuestion() {
    const s = state.practiceSession;
    if (!s) return;
    if (s.currentIndex >= s.questions.length) {
        document.getElementById("practiceStem").textContent = "Session complete.";
        document.getElementById("practiceOptions").innerHTML = "";
        document.getElementById("practiceFeedback").textContent = "";
        document.getElementById("practiceMeta").textContent =
            `Total questions: ${s.questions.length}`;
        return;
    }
    const q = s.questions[s.currentIndex];
    document.getElementById("practiceMeta").textContent =
        `Question ${s.currentIndex + 1} of ${s.questions.length} · ID ${q.id}`;
    document.getElementById("practiceStem").textContent = q.stem;
    const optionsDiv = document.getElementById("practiceOptions");
    optionsDiv.innerHTML = "";
    (q.options || []).forEach(o => {
        if (!o.text) return;
        const btn = document.createElement("button");
        btn.textContent = `${o.id}. ${o.text}`;
        btn.addEventListener("click", () => onPracticeAnswer(q, o.id));
        optionsDiv.appendChild(btn);
    });
    document.getElementById("practiceFeedback").textContent = "";
}

function onPracticeAnswer(q, chosenId) {
    const correct = q.correctOptionId;
    q.timesAnswered = (q.timesAnswered || 0) + 1;
    if (chosenId === correct) {
        q.timesCorrect = (q.timesCorrect || 0) + 1;
    }
    q.lastAnsweredAt = nowIso();
    saveState(false);

    const fb = document.getElementById("practiceFeedback");
    if (chosenId === correct) {
        fb.textContent = "✅ Correct. " + (q.explanation || "");
    } else {
        fb.textContent = "❌ Incorrect. Correct answer: " + correct + ". " + (q.explanation || "");
    }
}

// Init
function init() {
    loadState();

    // Nav
    document.querySelectorAll("header nav button").forEach(btn => {
        btn.addEventListener("click", () => {
            const view = btn.dataset.view;
            if (view) switchView(view);
        });
    });

    // Save button
    document.getElementById("saveAllBtn").addEventListener("click", () => saveState(true));

    // Editor events
    document.getElementById("generateIdBtn").addEventListener("click", () => {
        document.getElementById("qId").value = generateNextId();
    });

    document.getElementById("questionForm").addEventListener("submit", e => {
        e.preventDefault();
        upsertQuestion();
    });

    document.getElementById("resetFormBtn").addEventListener("click", () => clearForm());

    // Filters
    ["filterSearch", "filterTopic", "filterDifficulty", "filterFlagged", "filterAnswered", "filterLastN"].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener("input", renderQuestionsTable);
        el.addEventListener("change", renderQuestionsTable);
    });

    // Master checkbox
    document.getElementById("masterCheckbox").addEventListener("change", e => {
        const checked = e.target.checked;
        document.querySelectorAll(".rowSelector").forEach(cb => (cb.checked = checked));
    });

    document.getElementById("bulkSelectAllBtn").addEventListener("click", () => {
        document.querySelectorAll(".rowSelector").forEach(cb => (cb.checked = true));
        document.getElementById("masterCheckbox").checked = true;
    });

    document.getElementById("bulkClearSelectionBtn").addEventListener("click", () => {
        document.querySelectorAll(".rowSelector").forEach(cb => (cb.checked = false));
        document.getElementById("masterCheckbox").checked = false;
    });

    document.getElementById("bulkDeleteBtn").addEventListener("click", () => {
        bulkDelete(getSelectedIds());
    });

    document.getElementById("bulkFlagBtn").addEventListener("click", () => {
        bulkFlag(getSelectedIds(), true);
    });

    document.getElementById("bulkUnflagBtn").addEventListener("click", () => {
        bulkFlag(getSelectedIds(), false);
    });

    // Export / import
    document.getElementById("exportJsonBtn").addEventListener("click", exportJson);
    document.getElementById("importJsonBtn").addEventListener("click", () => {
        const fileInput = document.getElementById("importJsonInput");
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = e => importJsonFromText(e.target.result);
            reader.readAsText(fileInput.files[0]);
        } else {
            const text = document.getElementById("rawJsonArea").value.trim();
            if (!text) {
                alert("Paste JSON into the box or choose a file.");
                return;
            }
            importJsonFromText(text);
        }
    });

    // Practice
    document.getElementById("startPracticeBtn").addEventListener("click", startPractice);
    document.getElementById("nextQuestionBtn").addEventListener("click", () => {
        if (!state.practiceSession) return;
        state.practiceSession.currentIndex++;
        showCurrentPracticeQuestion();
    });
    document.getElementById("endPracticeBtn").addEventListener("click", () => {
        state.practiceSession = null;
        document.getElementById("practiceArea").classList.add("hidden");
    });
    document.getElementById("showAnswerBtn").addEventListener("click", () => {
        if (!state.practiceSession) return;
        const q = state.practiceSession.questions[state.practiceSession.currentIndex];
        if (!q) return;
        document.getElementById("practiceFeedback").textContent =
            "Correct answer: " + q.correctOptionId + ". " + (q.explanation || "");
    });

    // Initial render
    switchView("editor");
    renderQuestionsTable();
}

document.addEventListener("DOMContentLoaded", init);
