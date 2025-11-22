// MCQ Ultra-Pro V20 (clean rebuild)
// IndexedDB + SRS + Library + Flashcards + Exam + GitHub Backup

const DB_NAME = 'mcqdb_ultra_v20';
const DB_VERSION = 20;

let db = null;

// app state
let currentQuestion = null;
let currentChoices = [];
let currentMode = 'due';
let currentChapter = '';
let lastResult = null;
let lastSelectedIndex = null;
let historyStack = [];
let prefSkipSolved = true;

// library state
let allSelectedIds = new Set();
let allCurrentPage = 1;
let allTotalPages = 1;
const ALL_PAGE_SIZE = 50;
let allRangeAnchorIndex = null;

// theme
let currentTheme = 'dark';

// flashcards
let flashcardPool = [];
let flashcardIndex = -1;
let flashcardShowBack = false;

// exam
let examSession = null;
let examTimerId = null;

// practice sessions
let practiceSession = null;
const PRACTICE_SESSIONS_KEY = 'practiceSessions';

// cached chapters
let cachedChapters = [];

// DOM refs
const questionPanel = document.getElementById('questionPanel');
const feedbackPanel = document.getElementById('feedbackPanel');
const historyListEl = document.getElementById('historyList');
const modeSelect = document.getElementById('modeSelect');
const chapterBox = document.getElementById('chapterBox');
const chapterSelect = document.getElementById('chapterSelect');
const prefSkipSolvedEl = document.getElementById('prefSkipSolved');

// toast
function toast(msg){
  const c = document.getElementById('toastContainer');
  if(!c) return alert(msg);
  const t = document.createElement('div');
  t.className='toast';
  t.textContent=msg;
  c.appendChild(t);
  setTimeout(()=>t.remove(),2200);
}

// meta helpers
function saveMeta(key, value){
  if(!db) return;
  const tx=db.transaction('meta','readwrite');
  tx.objectStore('meta').put({key,value});
}
async function loadMeta(key){
  if(!db) return null;
  const tx=db.transaction('meta','readonly');
  const store=tx.objectStore('meta');
  return await new Promise(res=>{
    const req=store.get(key);
    req.onsuccess=()=>res(req.result?req.result.value:null);
    req.onerror=()=>res(null);
  });
}

// db open
function openDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=e=>{
      const udb=e.target.result;
      if(!udb.objectStoreNames.contains('questions')){
        const qs=udb.createObjectStore('questions',{keyPath:'id',autoIncrement:true});
        qs.createIndex('by_chapter','chapter',{unique:false});
      }
      if(!udb.objectStoreNames.contains('answers')){
        const as=udb.createObjectStore('answers',{keyPath:'id',autoIncrement:true});
        as.createIndex('by_question','questionId',{unique:false});
        as.createIndex('by_time','answeredAt',{unique:false});
      }
      if(!udb.objectStoreNames.contains('meta')){
        udb.createObjectStore('meta',{keyPath:'key'});
      }
    };
    req.onsuccess=e=>{
      db=e.target.result;
      resolve(db);
    };
    req.onerror=e=>reject(e.target.error);
  });
}

// helpers
function randomChoice(arr){ if(!arr.length) return null; return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
function debounce(fn,ms){let t=null; return (...args)=>{clearTimeout(t); t=setTimeout(()=>fn(...args),ms)};}
function fmtTime(iso){
  if(!iso) return '–';
  try{ const d=new Date(iso); if(isNaN(d.getTime())) return iso; return d.toLocaleString(); }catch{ return iso;}
}

// data access
async function getAllQuestions(){
  const tx=db.transaction('questions','readonly');
  const store=tx.objectStore('questions');
  return await new Promise(res=>{
    const req=store.getAll();
    req.onsuccess=e=>res(e.target.result||[]);
    req.onerror=()=>res([]);
  });
}
async function getQuestionById(id){
  const tx=db.transaction('questions','readonly');
  const store=tx.objectStore('questions');
  return await new Promise(res=>{
    const req=store.get(id);
    req.onsuccess=e=>res(e.target.result||null);
    req.onerror=()=>res(null);
  });
}

// chapters
function refreshChapterOptions(){
  if(!db) return;
  const tx=db.transaction('questions','readonly');
  const store=tx.objectStore('questions');
  const req=store.getAll();
  req.onsuccess=()=>{
    const all=req.result||[];
    const set=new Set();
    all.forEach(q=>{ const ch=(q.chapter||'').trim(); if(ch) set.add(ch);});
    cachedChapters=Array.from(set).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'}));
    const fill=sel=>{
      if(!sel) return;
      sel.innerHTML='';
      const optAll=document.createElement('option');
      optAll.value=''; optAll.textContent='All chapters';
      sel.appendChild(optAll);
      cachedChapters.forEach(ch=>{
        const o=document.createElement('option');
        o.value=ch; o.textContent=ch; sel.appendChild(o);
      });
    };
    fill(chapterSelect);
    fill(document.getElementById('allChapterSelect'));
    fill(document.getElementById('fcChapterFilter'));
    fill(document.getElementById('examChapterFilter'));
  };
}

// stats / due / weak
function isDue(q, nowIso){
  if(!q || q.active===false) return false;
  if(!q.dueAt) return true;
  return q.dueAt<=nowIso;
}
function computeWeakQuestions(all){
  return all.filter(q=>{
    const seen=q.timesSeen||0, wrong=q.timesWrong||0;
    if(seen<3) return false;
    return (wrong/seen)>=0.4;
  });
}
async function getStats(){
  const all=await getAllQuestions();
  const nowIso=new Date().toISOString();
  return {
    total:all.length,
    flagged:all.filter(q=>q.flagged).length,
    answered:all.filter(q=>(q.timesSeen||0)>0).length,
    withWrong:all.filter(q=>(q.timesWrong||0)>0).length,
    maintenance:all.filter(q=>q.maintenance).length,
    weak:computeWeakQuestions(all).length,
    due:all.filter(q=>isDue(q,nowIso)).length
  };
}
async function updateStatsBar(){
  const el=document.getElementById('statsBar');
  if(!el) return;
  const s=await getStats();
  el.innerHTML=`
    <div>Total: <strong>${s.total}</strong></div>
    <div>Answered: <strong>${s.answered}</strong></div>
    <div>Wrong ≥1: <strong>${s.withWrong}</strong></div>
    <div>Flagged: <strong>${s.flagged}</strong></div>
    <div>Maintenance: <strong>${s.maintenance}</strong></div>
    <div>Weak set: <strong>${s.weak}</strong></div>
    <div>Due now: <strong>${s.due}</strong></div>
  `;
}

// SRS
function initSpacedFields(q){
  if(!q.srEase) q.srEase=2.5;
  if(!q.srInterval) q.srInterval=0;
  if(!q.srReps) q.srReps=0;
  return q;
}
function nextSpaced(q, correct){
  q=initSpacedFields(q);
  const now=new Date();
  if(!correct){
    q.srReps=0; q.srInterval=1; q.srEase=Math.max(1.3,q.srEase-0.2);
  }else{
    q.srReps+=1;
    if(q.srReps===1) q.srInterval=1;
    else if(q.srReps===2) q.srInterval=3;
    else q.srInterval=Math.round(q.srInterval*q.srEase);
    q.srEase=Math.min(3.0,q.srEase+0.05);
  }
  const next=new Date(now.getTime()+q.srInterval*24*60*60*1000);
  q.dueAt=next.toISOString();
  return q;
}

// dup normalize
function normalizeTextForDup(t){
  if(!t) return '';
  return t.toLowerCase().replace(/\s+/g,' ').replace(/[^a-z0-9أ-يآؤئإ\s]/g,'').trim();
}

// pick question
async function buildPracticePool(){
  const all=await getAllQuestions();
  const nowIso=new Date().toISOString();
  let filtered=all.filter(q=>q && q.active!==false);

  if(currentMode==='due'){
    filtered=filtered.filter(q=>isDue(q,nowIso));
    if(!filtered.length) filtered=all.filter(q=>q.active!==false);
  }else if(currentMode==='new'){
    filtered=filtered.filter(q=>!(q.timesSeen>0));
  }else if(currentMode==='wrong'){
    filtered=filtered.filter(q=>(q.timesWrong||0)>0);
  }else if(currentMode==='maintain'){
    filtered=filtered.filter(q=>q.maintenance);
  }else if(currentMode==='flagged'){
    filtered=filtered.filter(q=>q.flagged);
  }else if(currentMode==='chapter'){
    const chap=(currentChapter||'').toLowerCase();
    if(chap) filtered=filtered.filter(q=>(q.chapter||'').toLowerCase()===chap);
  }

  if(prefSkipSolved && currentMode!=='new'){
    const unsolved=filtered.filter(q=>!(q.timesSeen>0));
    if(unsolved.length) filtered=unsolved;
  }

  filtered.sort((a,b)=>{
    const ad=a.dueAt||'', bd=b.dueAt||'';
    if(ad&&bd&&ad!==bd) return ad.localeCompare(bd);
    const as=a.lastSeenAt||'', bs=b.lastSeenAt||'';
    if(as===bs) return (a.timesSeen||0)-(b.timesSeen||0);
    return as.localeCompare(bs);
  });

  return filtered;
}

async function startNewPracticeSession(autoStartFirst=true){
  const pool=await buildPracticePool();
  if(!pool.length){
    practiceSession=null; currentQuestion=null; renderQuestion(); return;
  }
  const ids=pool.map(q=>q.id);
  practiceSession={ id:makeSessionId(), createdAt:new Date().toISOString(), mode:currentMode,
    questionIds:ids, index:0, answeredMap:{}, correctCount:0 };
  await savePracticeSessions((await loadPracticeSessions()).slice(0,50));

  if(autoStartFirst){
    currentQuestion=pool[0];
    lastResult=null; lastSelectedIndex=null;
    if(feedbackPanel) feedbackPanel.innerHTML='';
    renderQuestion(); updateStatsBar(); updateHistoryList();
  }
}

function makeSessionId(){
  return Date.now().toString(36)+Math.random().toString(36).slice(2,7);
}
async function loadPracticeSessions(){
  const arr=await loadMeta(PRACTICE_SESSIONS_KEY);
  return Array.isArray(arr)?arr:[];
}
async function savePracticeSessions(arr){
  saveMeta(PRACTICE_SESSIONS_KEY, arr||[]);
}

// render question
function renderQuestion(){
  if(!questionPanel) return;
  if(!currentQuestion){
    questionPanel.innerHTML='<div class="muted">No questions yet. Import JSON to start.</div>';
    return;
  }
  const q=currentQuestion;
  const letters=['A','B','C','D','E','F','G'];
  currentChoices=q.choices||[];

  let html=`<div class="q-text">Q#${q.id??''} – ${q.text||''}</div>`;
  if(q.chapter || q.source || q.tags?.length || q.flagged || q.maintenance || q.pinned){
    html+=`<div class="tag-chapter">
      ${q.chapter?`<span>${q.chapter}</span>`:''}
      ${q.source?` · <span>${q.source}</span>`:''}
      ${q.tags?.length?` · <span>${q.tags.join(', ')}</span>`:''}
      ${q.pinned?` · <span class="pill pill-pin">Pin</span>`:''}
      ${q.flagged?` · <span class="pill pill-flag">Flag</span>`:''}
      ${q.maintenance?` · <span class="pill pill-maint">Maint</span>`:''}
    </div>`;
  }
  if(q.imageData || q.imageUrl){
    const src=q.imageData||q.imageUrl;
    html+=`<div class="img-preview"><a href="${src}" target="_blank" rel="noopener noreferrer">
      <img src="${src}" alt="question image"></a></div>`;
  }
  html+='<div style="margin-top:0.4rem;">';
  currentChoices.forEach((c,idx)=>{
    const letter=letters[idx]||'?';
    const checked=(idx===lastSelectedIndex)?'checked':'';
    html+=`<label class="choice">
      <input type="radio" name="choice" value="${idx}" ${checked}>
      <strong>${letter}.</strong> ${c.text||''}
    </label>`;
  });
  html+='</div>';
  questionPanel.innerHTML=html;
}

// history list
async function updateHistoryList(){
  if(!historyListEl) return;
  const tx=db.transaction(['answers','questions'],'readonly');
  const aStore=tx.objectStore('answers');
  const qStore=tx.objectStore('questions');

  const allAns=await new Promise(res=>{
    const req=aStore.getAll();
    req.onsuccess=e=>res(e.target.result||[]);
    req.onerror=()=>res([]);
  });
  allAns.sort((a,b)=>(b.answeredAt||'').localeCompare(a.answeredAt||''));
  const recent=allAns.slice(0,30);

  const qMap={};
  await Promise.all(recent.map(a=>new Promise(r=>{
    if(qMap[a.questionId]) return r();
    const rq=qStore.get(a.questionId);
    rq.onsuccess=e=>{ qMap[a.questionId]=e.target.result; r(); };
    rq.onerror=()=>r();
  })));

  let html='';
  recent.forEach(a=>{
    const q=qMap[a.questionId];
    if(!q) return;
    const label=(q.chapter||'').slice(0,16);
    html+=`<div class="history-item" data-qid="${q.id}">
      <div>${(q.text||'').slice(0,80)}${(q.text||'').length>80?'…':''}</div>
      <div class="muted">
        ${label?`<span>${label}</span>`:''}
        <span class="pill ${a.isCorrect?'pill-correct':'pill-wrong'}">${a.isCorrect?'Correct':'Wrong'}</span>
        ${q.flagged?'<span class="pill pill-flag">Flag</span>':''}
        ${q.maintenance?'<span class="pill pill-maint">Maint</span>':''}
        ${q.pinned?'<span class="pill pill-pin">Pin</span>':''}
      </div>
    </div>`;
  });
  historyListEl.innerHTML=html||'<div class="muted tiny">No history yet.</div>';
  historyListEl.querySelectorAll('.history-item').forEach(item=>{
    item.addEventListener('click', async ()=>{
      const id=parseInt(item.getAttribute('data-qid'),10);
      const q=await getQuestionById(id);
      if(!q) return;
      currentQuestion=q; lastResult=null; lastSelectedIndex=null;
      if(feedbackPanel) feedbackPanel.innerHTML='';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]')?.click();
    });
  });
}

// submit + feedback
async function submitAnswer(){
  if(!currentQuestion) return;
  const radios=document.querySelectorAll('input[name="choice"]');
  let selectedIdx=null;
  radios.forEach(r=>{ if(r.checked) selectedIdx=parseInt(r.value,10); });
  if(selectedIdx===null){ toast('اختر إجابة أولاً.'); return; }

  lastSelectedIndex=selectedIdx;
  const correctIdx=(currentQuestion.choices||[]).findIndex(c=>c.isCorrect);
  const isCorrect=(selectedIdx===correctIdx);

  const now=new Date().toISOString();
  saveMeta('lastActivityAt', now);

  const tx=db.transaction(['questions','answers'],'readwrite');
  const qStore=tx.objectStore('questions');
  const aStore=tx.objectStore('answers');

  const q=Object.assign({}, currentQuestion);
  q.timesSeen=(q.timesSeen||0)+1;
  q.timesCorrect=(q.timesCorrect||0)+(isCorrect?1:0);
  q.timesWrong=(q.timesWrong||0)+(!isCorrect?1:0);
  q.lastSeenAt=now;
  nextSpaced(q, isCorrect);
  qStore.put(q);

  aStore.add({questionId:q.id, answeredAt:now, selectedIndex:selectedIdx, isCorrect});

  tx.oncomplete=async ()=>{
    currentQuestion=q;
    lastResult=isCorrect;
    showFeedback(correctIdx, selectedIdx, q.explanation);
    updateStatsBar(); updateHistoryList(); refreshBackupLabels();
  };
}

function showFeedback(correctIdx, selectedIdx, explanation){
  const letters=['A','B','C','D','E','F','G'];
  const choices=currentChoices||[];

  document.querySelectorAll('.choice').forEach((el,idx)=>{
    el.classList.remove('correct','wrong');
    if(idx===correctIdx) el.classList.add('correct');
    if(idx===selectedIdx && idx!==correctIdx) el.classList.add('wrong');
  });

  let html='<div style="margin-top:0.3rem;">';
  html+= lastResult
    ? '<div style="color:#2e7d32; font-weight:700;">Correct ✅</div>'
    : '<div style="color:#c62828; font-weight:700;">Wrong ❌</div>';

  if(correctIdx>=0 && choices[correctIdx]){
    html+=`<div class="muted" style="margin-top:0.25rem;">
      Correct answer: <strong>${letters[correctIdx]}.</strong> ${choices[correctIdx].text||''}
    </div>`;
  }
  if(explanation){
    html+=`<div class="muted" style="margin-top:0.25rem;">
      <strong>Explanation:</strong> ${explanation}
    </div>`;
  }
  html+='</div>';

  if(feedbackPanel){
    feedbackPanel.innerHTML=html;
    feedbackPanel.classList.remove('hidden');
  }
}

// go prev / next within pool
async function loadNextQuestion(){
  const pool=await buildPracticePool();
  if(!pool.length){ currentQuestion=null; renderQuestion(); return; }

  // if using session order, step forward
  let idx=pool.findIndex(x=>x.id===currentQuestion?.id);
  idx = (idx<0)?0:Math.min(idx+1,pool.length-1);
  currentQuestion=pool[idx];
  lastResult=null; lastSelectedIndex=null;
  if(feedbackPanel) feedbackPanel.innerHTML='';
  renderQuestion(); updateStatsBar(); updateHistoryList();
}

async function goPreviousQuestion(){
  const pool=await buildPracticePool();
  if(!pool.length) return;
  let idx=pool.findIndex(x=>x.id===currentQuestion?.id);
  idx = (idx<=0)?0:idx-1;
  currentQuestion=pool[idx];
  lastResult=null; lastSelectedIndex=null;
  if(feedbackPanel) feedbackPanel.innerHTML='';
  renderQuestion(); updateStatsBar(); updateHistoryList();
}

// import/export normalize
function normalizeImportedQuestions(rawArr){
  if(!Array.isArray(rawArr)) return [];
  const letters=['A','B','C','D','E','F','G'];
  return rawArr.map((q,idx)=>{
    const baseText=q.text||q.question||q.prompt||('Question '+(idx+1));
    const chapter=q.chapter||q.chapterName||q.topic||'';
    const source=q.source||q.book||q.reference||'';
    const explanation=q.explanation||q.explain||q.rationale||'';
    let tags=[];
    if(Array.isArray(q.tags)) tags=q.tags;
    else if(typeof q.tags==='string') tags=q.tags.split(/[,;]+/).map(s=>s.trim()).filter(Boolean);

    let choices=[];
    if(Array.isArray(q.choices) && q.choices.length){
      const structured=q.choices.every(ch=>typeof ch==='object' && 'text' in ch);
      if(structured) choices=q.choices.map(ch=>({text:ch.text,isCorrect:!!ch.isCorrect}));
    }
    if(!choices.length){
      let opts=null;
      if(Array.isArray(q.options)) opts=q.options;
      else if(Array.isArray(q.answers)) opts=q.answers;
      else if(Array.isArray(q.choices)) opts=q.choices;
      if(opts && opts.length){
        let correctIdx=null;
        if(typeof q.correctIndex==='number') correctIdx=q.correctIndex;
        else if(typeof q.answerIndex==='number') correctIdx=q.answerIndex;
        else if(typeof q.correct==='number') correctIdx=q.correct;
        else if(typeof q.correct==='string'){
          const li=letters.indexOf(q.correct.toUpperCase());
          if(li>=0 && li<opts.length) correctIdx=li;
        }
        choices=opts.map((opt,i)=>({
          text: typeof opt==='string'?opt:(opt.text||String(opt)),
          isCorrect: (correctIdx!=null? i===correctIdx : !!opt.isCorrect)
        }));
        if(!choices.some(c=>c.isCorrect) && choices.length) choices[0].isCorrect=true;
      }
    }
    if(!choices.length) choices=[{text:'Option A',isCorrect:true}];

    const obj={
      text:baseText, chapter, source, explanation, choices, tags,
      timesSeen:q.timesSeen||0, timesCorrect:q.timesCorrect||0, timesWrong:q.timesWrong||0,
      lastSeenAt:q.lastSeenAt||null, createdAt:q.createdAt||new Date().toISOString(),
      flagged:!!q.flagged, maintenance:!!q.maintenance, active:q.active!==false,
      pinned:!!q.pinned, imageUrl:q.imageUrl||'', imageData:q.imageData||'',
      srEase:q.srEase||2.5, srInterval:q.srInterval||0, srReps:q.srReps||0, dueAt:q.dueAt||null
    };
    if(q.id!=null) obj.id=q.id;
    return obj;
  });
}

function handleImportFile(file){
  if(!file){ toast('اختر ملف JSON أولاً.'); return; }
  const reader=new FileReader();
  reader.onload=async e=>{
    try{
      const data=JSON.parse(e.target.result);
      let arr=data;
      if(!Array.isArray(arr) && data.questions) arr=data.questions;
      if(!Array.isArray(arr)) throw new Error('JSON should be array or {questions:[]}');
      const normalized=normalizeImportedQuestions(arr);
      const tx=db.transaction('questions','readwrite');
      const store=tx.objectStore('questions');
      normalized.forEach(q=>{
        const obj=Object.assign({},q);
        if(obj.id==null) delete obj.id;
        store.put(obj);
      });
      tx.oncomplete=()=>{
        toast('Imported '+normalized.length+' questions.');
        refreshChapterOptions();
        startNewPracticeSession(true);
        reloadAllQuestionsTable();
        buildFlashcardPool();
      };
    }catch(err){
      toast('Error: '+err.message);
    }
  };
  reader.readAsText(file);
}

async function exportQuestionsOnly(){
  const all=await getAllQuestions();
  const data=all.map(q=>({
    id:q.id, text:q.text, chapter:q.chapter, source:q.source, explanation:q.explanation,
    choices:q.choices, flagged:!!q.flagged, maintenance:!!q.maintenance, active:q.active!==false,
    timesSeen:q.timesSeen||0, timesCorrect:q.timesCorrect||0, timesWrong:q.timesWrong||0,
    lastSeenAt:q.lastSeenAt||null, createdAt:q.createdAt||null,
    tags:Array.isArray(q.tags)?q.tags:[], pinned:!!q.pinned,
    imageUrl:q.imageUrl||'', imageData:q.imageData||'',
    srEase:q.srEase||2.5, srInterval:q.srInterval||0, srReps:q.srReps||0, dueAt:q.dueAt||null
  }));
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='mcq_questions.json';
  a.click();
}

// full backup
async function buildBackupObject(){
  const questions=await getAllQuestions();
  const atx=db.transaction('answers','readonly');
  const answers=await new Promise(res=>{
    const req=atx.objectStore('answers').getAll();
    req.onsuccess=e=>res(e.target.result||[]);
    req.onerror=()=>res([]);
  });
  const metaTx=db.transaction('meta','readonly');
  const metaAll=await new Promise(res=>{
    const req=metaTx.objectStore('meta').getAll();
    req.onsuccess=e=>res(e.target.result||[]);
    req.onerror=()=>res([]);
  });
  const metaObj={}; metaAll.forEach(m=>metaObj[m.key]=m.value);
  const exportedAt=new Date().toISOString();
  return { meta:{exportedAt, appVersion:'20.0.0', totalQuestions:questions.length, totalAnswers:answers.length,
          lastActivityAt:metaObj.lastActivityAt||null}, questions, answers };
}

async function exportFullBackup(){
  const backup=await buildBackupObject();
  const exportedAt=backup.meta.exportedAt;
  saveMeta('lastBackupAt', exportedAt);
  refreshBackupLabels();
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
  const safeTs=exportedAt.replace(/[:]/g,'-');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='mcq_backup_'+safeTs+'.json';
  a.click();
}

async function importBackupObject(backup){
  let questions=[], answers=[], meta={};
  if(Array.isArray(backup)) questions=backup;
  else if(backup && backup.questions){ questions=backup.questions; answers=backup.answers||[]; meta=backup.meta||{}; }
  else throw new Error('Invalid backup format');

  const existing=await getAllQuestions();
  const byId=new Map(existing.map(q=>[q.id,q]));
  const qtx=db.transaction('questions','readwrite');
  const qs=qtx.objectStore('questions');
  questions.forEach(q=>{
    const id=q.id;
    if(id!=null && byId.has(id)){
      const local=byId.get(id);
      const merged=Object.assign({}, q, {
        timesSeen:local.timesSeen||q.timesSeen||0,
        timesCorrect:local.timesCorrect||q.timesCorrect||0,
        timesWrong:local.timesWrong||q.timesWrong||0,
        lastSeenAt:local.lastSeenAt||q.lastSeenAt||null,
        flagged:local.flagged||q.flagged||false,
        maintenance:local.maintenance||q.maintenance||false,
        active: local.active!==false,
        tags:Array.isArray(local.tags)?local.tags:(Array.isArray(q.tags)?q.tags:[]),
        pinned:!!(local.pinned||q.pinned),
        imageUrl:local.imageUrl||q.imageUrl||'',
        imageData:local.imageData||q.imageData||'',
        srEase:local.srEase||q.srEase||2.5,
        srInterval:local.srInterval||q.srInterval||0,
        srReps:local.srReps||q.srReps||0,
        dueAt:local.dueAt||q.dueAt||null
      });
      qs.put(merged);
    }else{
      const obj=Object.assign({},q);
      if(obj.id==null) delete obj.id;
      qs.put(obj);
    }
  });
  if(answers.length){
    const atx=db.transaction('answers','readwrite');
    const as=atx.objectStore('answers');
    answers.forEach(a=>{
      as.add({questionId:a.questionId, answeredAt:a.answeredAt||null, selectedIndex:a.selectedIndex, isCorrect:!!a.isCorrect});
    });
  }
  if(meta.exportedAt) saveMeta('lastBackupAt', meta.exportedAt);
}

function handleBackupImportFile(file){
  if(!file){ toast('اختر ملف backup JSON أولاً.'); return; }
  const reader=new FileReader();
  reader.onload=async e=>{
    try{
      const data=JSON.parse(e.target.result);
      await importBackupObject(data);
      toast('Backup import completed.');
      refreshChapterOptions();
      startNewPracticeSession(true);
      reloadAllQuestionsTable();
      buildFlashcardPool();
      refreshBackupLabels();
    }catch(err){
      toast('Error: '+err.message);
    }
  };
  reader.readAsText(file);
}

function refreshBackupLabels(){
  const lastActEl=document.getElementById('lastActivityLabel');
  const lastBackupEl=document.getElementById('lastBackupLabel');
  if(!lastActEl || !lastBackupEl || !db) return;
  const tx=db.transaction('meta','readonly');
  const store=tx.objectStore('meta');
  const req1=store.get('lastActivityAt');
  const req2=store.get('lastBackupAt');
  req1.onsuccess=()=> lastActEl.textContent=fmtTime(req1.result?req1.result.value:null);
  req2.onsuccess=()=> lastBackupEl.textContent=fmtTime(req2.result?req2.result.value:null);
}

// library table + edit modal
const editModal=document.getElementById('editModal');
const editBackdrop=document.getElementById('editModalBackdrop');
const editTitleEl=document.getElementById('editModalTitle');
const editTextEl=document.getElementById('editText');
const editChapterEl=document.getElementById('editChapter');
const editTagsEl=document.getElementById('editTags');
const editExplanationEl=document.getElementById('editExplanation');
const editImageUrlEl=document.getElementById('editImageUrl');
const editImageFileEl=document.getElementById('editImageFile');
const editImagePreviewEl=document.getElementById('editImagePreview');
const editChoicesEl=document.getElementById('editChoices');
const editFlaggedEl=document.getElementById('editFlagged');
const editMaintEl=document.getElementById('editMaint');
const editPinnedEl=document.getElementById('editPinned');
const editActiveEl=document.getElementById('editActive');
const btnEditSave=document.getElementById('btnEditSave');
const btnEditCancel=document.getElementById('btnEditCancel');
const btnAddChoice=document.getElementById('btnAddChoice');

let editingQuestionId=null;

function openEditModal(q){
  if(!editModal) return;
  editingQuestionId=q?q.id:null;
  if(editTitleEl) editTitleEl.textContent=q?`Edit question #${q.id}`:'Add question';
  if(editTextEl) editTextEl.value=q?.text||'';
  if(editChapterEl) editChapterEl.value=q?.chapter||'';
  if(editTagsEl) editTagsEl.value=(q?.tags||[]).join(', ');
  if(editExplanationEl) editExplanationEl.value=q?.explanation||'';
  if(editImageUrlEl) editImageUrlEl.value=q?.imageUrl||'';
  if(editImageFileEl) editImageFileEl.value='';
  if(editImagePreviewEl){
    editImagePreviewEl.innerHTML='';
    delete editImagePreviewEl.dataset.imageData;
    if(q && (q.imageData||q.imageUrl)){
      const src=q.imageData||q.imageUrl;
      editImagePreviewEl.innerHTML=`<img src="${src}" alt="preview">`;
    }
  }
  if(editFlaggedEl) editFlaggedEl.checked=!!q?.flagged;
  if(editMaintEl) editMaintEl.checked=!!q?.maintenance;
  if(editPinnedEl) editPinnedEl.checked=!!q?.pinned;
  if(editActiveEl) editActiveEl.checked=q? q.active!==false : true;

  if(editChoicesEl){
    editChoicesEl.innerHTML='';
    const choices=(q?.choices?.length)?q.choices:[{text:'',isCorrect:true}];
    choices.forEach(c=>addChoiceRow(c.text||'', !!c.isCorrect));
  }
  editModal.classList.remove('hidden');
}
function closeEditModal(){
  if(!editModal) return;
  editModal.classList.add('hidden');
  editingQuestionId=null;
}
function addChoiceRow(text,isCorrect){
  if(!editChoicesEl) return;
  const row=document.createElement('div');
  row.className='edit-choice-row';
  row.innerHTML=`
    <input type="text" class="std-input choice-text" placeholder="Choice text" value="${text||''}">
    <label style="font-size:0.75rem;">
      <input type="radio" name="editCorrect" class="choice-correct" ${isCorrect?'checked':''}>
      Correct
    </label>
    <button class="pill-btn btn-remove-choice">✕</button>
  `;
  row.querySelector('.btn-remove-choice')?.addEventListener('click',()=>{
    if(editChoicesEl.children.length<=1) return;
    row.remove();
  });
  row.querySelector('.choice-correct')?.addEventListener('change',()=>{
    if(row.querySelector('.choice-correct').checked){
      editChoicesEl.querySelectorAll('.choice-correct').forEach(r=>{
        if(r!==row.querySelector('.choice-correct')) r.checked=false;
      });
    }
  });
  editChoicesEl.appendChild(row);
}
btnAddChoice?.addEventListener('click',()=>addChoiceRow('',false));
editImageFileEl?.addEventListener('change',()=>{
  const file=editImageFileEl.files?.[0];
  if(!file || !editImagePreviewEl) return;
  const reader=new FileReader();
  reader.onload=e=>{
    const dataUrl=e.target.result;
    editImagePreviewEl.innerHTML=`<img src="${dataUrl}" alt="preview">`;
    if(editImageUrlEl) editImageUrlEl.value='';
    editImagePreviewEl.dataset.imageData=dataUrl;
  };
  reader.readAsDataURL(file);
});
editBackdrop?.addEventListener('click',closeEditModal);
btnEditCancel?.addEventListener('click',closeEditModal);

btnEditSave?.addEventListener('click',async ()=>{
  const text=editTextEl?.value.trim();
  if(!text){ toast('Question text required.'); return; }
  const chapter=editChapterEl?.value.trim()||'';
  const tags=(editTagsEl?.value||'').split(',').map(t=>t.trim()).filter(Boolean);
  const explanation=editExplanationEl?.value.trim()||'';
  const imageUrl=editImageUrlEl?.value.trim()||'';
  const imageData=editImagePreviewEl?.dataset.imageData||'';

  const choiceRows=Array.from(editChoicesEl?.querySelectorAll('.edit-choice-row')||[]);
  if(!choiceRows.length){ toast('At least one choice is required.'); return; }
  const choices=choiceRows.map(row=>{
    const txt=row.querySelector('.choice-text')?.value.trim();
    const isCorrect=!!row.querySelector('.choice-correct')?.checked;
    return {text:txt,isCorrect};
  }).filter(c=>c.text);
  if(!choices.length){ toast('Enter at least one non-empty choice.'); return; }
  if(!choices.some(c=>c.isCorrect)) choices[0].isCorrect=true;

  const flagged=!!editFlaggedEl?.checked;
  const maintenance=!!editMaintEl?.checked;
  const pinned=!!editPinnedEl?.checked;
  const active=!!editActiveEl?.checked;

  const tx=db.transaction('questions','readwrite');
  const store=tx.objectStore('questions');

  if(editingQuestionId!=null){
    const req=store.get(editingQuestionId);
    req.onsuccess=e=>{
      const old=e.target.result||{};
      const q=Object.assign({},old,{text,chapter,explanation,tags,choices,flagged,maintenance,pinned,active,imageUrl,imageData:imageData||old.imageData||''});
      store.put(q);
    };
  }else{
    store.add({text,chapter,explanation,tags,choices,flagged,maintenance,pinned,active,createdAt:new Date().toISOString(),
      timesSeen:0,timesCorrect:0,timesWrong:0,lastSeenAt:null,imageUrl,imageData,srEase:2.5,srInterval:0,srReps:0,dueAt:null});
  }

  tx.oncomplete=()=>{
    closeEditModal();
    reloadAllQuestionsTable();
    startNewPracticeSession(true);
    refreshChapterOptions();
  };
});

// library reload
async function reloadAllQuestionsTable(){
  const tbody=document.getElementById('allTableBody');
  if(!tbody) return;

  const searchVal=(document.getElementById('allSearch')?.value||'').toLowerCase().trim();
  const filter=document.getElementById('allFilter')?.value||'all';
  const chapVal=(document.getElementById('allChapterSelect')?.value||'').trim();
  const dateFrom=document.getElementById('allDateFrom')?.value||'';
  const dateTo=document.getElementById('allDateTo')?.value||'';

  tbody.innerHTML='';
  allRangeAnchorIndex=null;

  const all=await getAllQuestions();
  const weakSet=new Set(computeWeakQuestions(all).map(q=>q.id));

  const dupMap=new Map();
  all.forEach(q=>{
    const norm=normalizeTextForDup(q.text||'');
    if(!norm) return;
    if(!dupMap.has(norm)) dupMap.set(norm,[]);
    dupMap.get(norm).push(q.id);
  });
  const dupSet=new Set();
  dupMap.forEach(ids=>{ if(ids.length>1) ids.forEach(id=>dupSet.add(id)); });

  let arr=all;

  if(searchVal){
    arr=arr.filter(q=>{
      const s=(q.text||'')+' '+(q.chapter||'')+' '+(q.source||'')+' '+(Array.isArray(q.tags)?q.tags.join(' '):'');
      return s.toLowerCase().includes(searchVal);
    });
  }
  if(chapVal) arr=arr.filter(q=>(q.chapter||'').trim()===chapVal);

  if(dateFrom) arr=arr.filter(q=>(q.createdAt||'')>=dateFrom);
  if(dateTo) arr=arr.filter(q=>(q.createdAt||'')<=dateTo+'T23:59:59');

  if(filter==='flagged') arr=arr.filter(q=>q.flagged);
  else if(filter==='wrong') arr=arr.filter(q=>(q.timesWrong||0)>0);
  else if(filter==='maintain') arr=arr.filter(q=>q.maintenance);
  else if(filter==='inactive') arr=arr.filter(q=>q.active===false);
  else if(filter==='weak') arr=arr.filter(q=>weakSet.has(q.id));
  else if(filter==='duplicate') arr=arr.filter(q=>dupSet.has(q.id));
  else if(filter==='notes') arr=arr.filter(q=>(q.note||'').trim().length>0);

  arr.sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));

  const total=arr.length;
  allTotalPages=Math.max(1,Math.ceil(total/ALL_PAGE_SIZE));
  if(allCurrentPage<1) allCurrentPage=1;
  if(allCurrentPage>allTotalPages) allCurrentPage=allTotalPages;

  const startIdx=(allCurrentPage-1)*ALL_PAGE_SIZE;
  const endIdx=Math.min(startIdx+ALL_PAGE_SIZE,total);
  const pageItems=arr.slice(startIdx,endIdx);

  const pageInfoEl=document.getElementById('allPageInfo');
  if(pageInfoEl) pageInfoEl.textContent=`Page ${allCurrentPage} / ${allTotalPages} (total ${total})`;

  const nowIso=new Date().toISOString();
  pageItems.forEach(q=>{
    const tr=document.createElement('tr');
    const tagsStr=Array.isArray(q.tags)?q.tags.join(', '):'';

    const metaBits=[];
    if(q.flagged) metaBits.push('<span class="pill pill-flag">Flag</span>');
    if(q.maintenance) metaBits.push('<span class="pill pill-maint">Maint</span>');
    if(weakSet.has(q.id)) metaBits.push('<span class="pill pill-weak">Weak</span>');
    if(dupSet.has(q.id)) metaBits.push('<span class="pill pill-dup">Dup</span>');
    if(q.pinned) metaBits.push('<span class="pill pill-pin">Pin</span>');
    if(q.dueAt && q.dueAt<=nowIso) metaBits.push('<span class="pill pill-due">Due</span>');

    tr.innerHTML=`
      <td><input type="checkbox" class="row-select" data-id="${q.id}"></td>
      <td>${q.id}</td>
      <td>${fmtTime(q.createdAt)}</td>
      <td>${(q.text||'').slice(0,140)}${(q.text||'').length>140?'…':''}</td>
      <td>${q.chapter||''}</td>
      <td>${tagsStr}</td>
      <td>${(q.timesCorrect||0)}/${(q.timesSeen||0)}</td>
      <td>${metaBits.join(' ')}</td>
      <td><button class="pill-btn btn-edit" data-id="${q.id}">Edit</button></td>
    `;

    const cb=tr.querySelector('.row-select');
    if(cb){
      const id=q.id;
      if(allSelectedIds.has(id)) cb.checked=true;
      cb.addEventListener('change',()=>{
        const rangeMode=!!document.getElementById('allRangeMode')?.checked;
        const boxes=Array.from(document.querySelectorAll('#allTableBody input.row-select'));
        const thisIndex=boxes.indexOf(cb);

        if(!rangeMode || thisIndex===-1 || allRangeAnchorIndex==null){
          cb.checked?allSelectedIds.add(id):allSelectedIds.delete(id);
          allRangeAnchorIndex=thisIndex;
          updateAllSelectedCount();
          return;
        }

        const start=Math.min(allRangeAnchorIndex,thisIndex);
        const end=Math.max(allRangeAnchorIndex,thisIndex);

        let allAlreadySelected=true;
        for(let i=start;i<=end;i++){
          const rowCb=boxes[i];
          if(!rowCb) continue;
          const rid=parseInt(rowCb.getAttribute('data-id'),10);
          if(!allSelectedIds.has(rid)){ allAlreadySelected=false; break; }
        }
        for(let i=start;i<=end;i++){
          const rowCb=boxes[i];
          if(!rowCb) continue;
          const rid=parseInt(rowCb.getAttribute('data-id'),10);
          rowCb.checked=!allAlreadySelected;
          !allAlreadySelected?allSelectedIds.add(rid):allSelectedIds.delete(rid);
        }
        allRangeAnchorIndex=thisIndex;
        updateAllSelectedCount();
      });
    }

    tr.addEventListener('click',e=>{
      if(e.target.tagName.toLowerCase()==='input' || e.target.classList.contains('btn-edit')) return;
      const anySelected=!!document.querySelector('#allTableBody input.row-select:checked');
      if(anySelected) return;
      currentQuestion=q; lastResult=null; lastSelectedIndex=null;
      if(feedbackPanel) feedbackPanel.innerHTML='';
      renderQuestion();
      document.querySelector('.tab-button[data-tab="home"]')?.click();
    });

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-edit').forEach(btn=>{
    btn.addEventListener('click', async e=>{
      e.stopPropagation();
      const id=parseInt(btn.getAttribute('data-id'),10);
      const q=await getQuestionById(id);
      if(!q) return;
      openEditModal(q);
    });
  });

  updateAllSelectedCount();
}

function updateAllSelectedCount(){
  const el=document.getElementById('selCount');
  if(el) el.textContent=`${allSelectedIds.size} Selected`;

  const allSelectAll=document.getElementById('allSelectAll');
  const boxes=Array.from(document.querySelectorAll('#allTableBody input.row-select'));
  if(allSelectAll && boxes.length){
    allSelectAll.checked=boxes.every(cb=>allSelectedIds.has(parseInt(cb.getAttribute('data-id'),10)));
  }
}

async function deleteSelectedAll(){
  const count=allSelectedIds.size;
  if(!count) return;
  if(!confirm('Delete '+count+' question(s)?')) return;

  const ids=Array.from(allSelectedIds);
  const tx=db.transaction('questions','readwrite');
  const store=tx.objectStore('questions');
  ids.forEach(id=>store.delete(id));

  tx.oncomplete=()=>{
    allSelectedIds=new Set(); allRangeAnchorIndex=null;
    updateAllSelectedCount();
    reloadAllQuestionsTable();
    startNewPracticeSession(true);
    buildFlashcardPool();
  };
}

// duplicates scan
async function scanDuplicates(){
  const all=await getAllQuestions();
  const dupMap=new Map();
  all.forEach(q=>{
    const norm=normalizeTextForDup(q.text||'');
    if(!norm) return;
    if(!dupMap.has(norm)) dupMap.set(norm,[]);
    dupMap.get(norm).push(q.id);
  });
  let clusters=0, dups=0;
  dupMap.forEach(ids=>{ if(ids.length>1){ clusters++; dups+=ids.length-1; } });
  const el=document.getElementById('dupResult');
  if(el) el.textContent=`${clusters} clusters, ${dups} duplicates`;
  const btnFix=document.getElementById('btnFixDup');
  if(btnFix) btnFix.classList.toggle('hidden', dups===0);
}
async function autoFixDuplicates(){
  const all=await getAllQuestions();
  const dupMap=new Map();
  all.forEach(q=>{
    const norm=normalizeTextForDup(q.text||'');
    if(!norm) return;
    if(!dupMap.has(norm)) dupMap.set(norm,[]);
    dupMap.get(norm).push(q);
  });
  const toDelete=[];
  dupMap.forEach(list=>{
    if(list.length<=1) return;
    list.sort((a,b)=>(a.createdAt||'').localeCompare(b.createdAt||''));
    list.slice(1).forEach(q=>toDelete.push(q.id));
  });
  if(!toDelete.length) return;
  if(!confirm('Delete '+toDelete.length+' duplicate question(s)?')) return;
  const tx=db.transaction('questions','readwrite');
  const store=tx.objectStore('questions');
  toDelete.forEach(id=>store.delete(id));
  tx.oncomplete=()=>{ reloadAllQuestionsTable(); startNewPracticeSession(true); buildFlashcardPool(); scanDuplicates(); };
}

// GitHub cloud
function loadGitHubConfig(){
  try{
    const raw=localStorage.getItem('mcq_github_config_v20');
    if(!raw) return {token:'', repo:'', filename:'mcq_backup.json'};
    const obj=JSON.parse(raw);
    return {token:obj.token||'', repo:obj.repo||'', filename:obj.filename||'mcq_backup.json'};
  }catch{ return {token:'', repo:'', filename:'mcq_backup.json'}; }
}
function saveGitHubConfig(cfg){
  localStorage.setItem('mcq_github_config_v20', JSON.stringify(cfg));
}
function loadGitHubConfigIntoUI(){
  const cfg=loadGitHubConfig();
  const t=document.getElementById('ghToken');
  const r=document.getElementById('ghRepo');
  const f=document.getElementById('ghFile');
  if(t) t.value=cfg.token;
  if(r) r.value=cfg.repo;
  if(f) f.value=cfg.filename;
}
function saveGitHubConfigFromUI(){
  const token=document.getElementById('ghToken')?.value.trim()||'';
  const repo=document.getElementById('ghRepo')?.value.trim()||'';
  const filename=document.getElementById('ghFile')?.value.trim()||'mcq_backup.json';
  saveGitHubConfig({token,repo,filename});
  refreshCloudInfo();
  toast('GitHub settings saved.');
}
function refreshCloudInfo(){
  const cfg=loadGitHubConfig();
  const el=document.getElementById('cloudInfo');
  const syncStatus=document.getElementById('syncStatus');
  if(!el || !syncStatus) return;
  if(!cfg.token || !cfg.repo){
    el.textContent='Cloud sync disabled. Add token + repo in Settings.';
    syncStatus.textContent='Cloud: off';
    return;
  }
  el.textContent='Cloud ready → Repo: '+cfg.repo+' · File: '+cfg.filename;
  syncStatus.textContent='Cloud: ready';
}
function encodeBase64(str){ return btoa(unescape(encodeURIComponent(str))); }
function decodeBase64(str){ return decodeURIComponent(escape(atob(str))); }

async function cloudUpload(){
  const cfg=loadGitHubConfig();
  if(!cfg.token || !cfg.repo){ toast('Set GitHub token + repo first.'); return; }

  const backup=await buildBackupObject();
  const contentB64=encodeBase64(JSON.stringify(backup,null,2));
  const [owner, repoName]=cfg.repo.split('/');
  if(!owner || !repoName){ toast('Repo format must be owner/name.'); return; }

  const url=`https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;
  let existingSha=null;
  try{
    const getRes=await fetch(url,{headers:{Authorization:`token ${cfg.token}`}});
    if(getRes.status===200){
      const info=await getRes.json();
      existingSha=info.sha;
    }
  }catch{}

  const body={message:'MCQ backup '+new Date().toISOString(), content:contentB64};
  if(existingSha) body.sha=existingSha;

  const res=await fetch(url,{
    method:'PUT',
    headers:{Authorization:`token ${cfg.token}`,'Content-Type':'application/json'},
    body:JSON.stringify(body)
  });
  if(!res.ok){
    const txt=await res.text();
    toast('Upload failed: '+res.status);
    console.error(txt);
    return;
  }
  saveMeta('lastBackupAt', backup.meta.exportedAt);
  refreshBackupLabels();
  toast('Backup uploaded to GitHub.');
}

async function cloudDownload(){
  const cfg=loadGitHubConfig();
  if(!cfg.token || !cfg.repo){ toast('Set GitHub token + repo first.'); return; }
  const [owner, repoName]=cfg.repo.split('/');
  if(!owner || !repoName){ toast('Repo format must be owner/name.'); return; }

  const url=`https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(cfg.filename)}`;
  const res=await fetch(url,{headers:{Authorization:`token ${cfg.token}`}});
  if(res.status===404){ toast('No backup file found in repo.'); return; }
  if(!res.ok){ toast('Download failed: '+res.status); return; }

  const info=await res.json();
  const contentStr=decodeBase64(info.content);
  let data=null;
  try{ data=JSON.parse(contentStr); }catch{ toast('Invalid JSON in backup file.'); return; }

  await importBackupObject(data);
  toast('Cloud backup downloaded & merged.');
  refreshChapterOptions();
  startNewPracticeSession(true);
  reloadAllQuestionsTable();
  buildFlashcardPool();
  refreshBackupLabels();
}

// dashboard
async function renderDashboard(){
  const all=await getAllQuestions();
  const weak=computeWeakQuestions(all);
  const dashOverall=document.getElementById('dashOverall');
  const dashWeakChapters=document.getElementById('dashWeakChapters');
  const dashWeekly=document.getElementById('dashWeekly');
  if(!dashOverall||!dashWeakChapters||!dashWeekly) return;

  const total=all.length;
  const answered=all.filter(q=>(q.timesSeen||0)>0).length;
  const wrong=all.reduce((s,q)=>s+(q.timesWrong||0),0);
  const correct=all.reduce((s,q)=>s+(q.timesCorrect||0),0);
  const wrongRate=(wrong+correct)?(wrong/(wrong+correct)*100):0;

  dashOverall.innerHTML=`
    <div>Total questions: <strong>${total}</strong></div>
    <div>Answered ≥1: <strong>${answered}</strong></div>
    <div>Weak questions: <strong>${weak.length}</strong></div>
    <div>Total correct: <strong>${correct}</strong></div>
    <div>Total wrong: <strong>${wrong}</strong> (${wrongRate.toFixed(1)}%)</div>
  `;

  const chapMap=new Map();
  weak.forEach(q=>{
    const key=q.chapter||'No chapter';
    if(!chapMap.has(key)) chapMap.set(key,[]);
    chapMap.get(key).push(q);
  });
  let chapHtml='';
  if(!chapMap.size) chapHtml='<div class="tiny muted">No clear weak chapters yet.</div>';
  else chapMap.forEach((list,chap)=>{
    chapHtml+=`<div><strong>${chap}</strong> – ${list.length} weak questions</div>`;
  });
  dashWeakChapters.innerHTML=chapHtml;
  dashWeekly.innerHTML='<div class="tiny muted">Weekly activity uses answer timestamps (simple view).</div>';
}

// flashcards
const fcSourceEl=document.getElementById('fcSource');
const fcChapterFilterEl=document.getElementById('fcChapterFilter');
const fcModeEl=document.getElementById('fcMode');
const fcFront=document.getElementById('flashcardFront');
const fcBack=document.getElementById('flashcardBack');

if(fcSourceEl){
  fcSourceEl.addEventListener('change',()=>{
    if(fcSourceEl.value==='chapter'){
      if(fcChapterFilterEl) fcChapterFilterEl.style.display='inline-block';
    }else{
      if(fcChapterFilterEl){ fcChapterFilterEl.style.display='none'; fcChapterFilterEl.value=''; }
    }
    buildFlashcardPool();
  });
}
fcChapterFilterEl?.addEventListener('change', buildFlashcardPool);
fcModeEl?.addEventListener('change', renderFlashcard);

document.getElementById('btnFcShow')?.addEventListener('click',()=>{
  flashcardShowBack=true; renderFlashcard();
});
document.getElementById('btnFcAgain')?.addEventListener('click', async ()=>{
  await updateSpacedAfterFlashcard(false); nextFlashcard();
});
document.getElementById('btnFcGood')?.addEventListener('click', async ()=>{
  await updateSpacedAfterFlashcard(true); nextFlashcard();
});
document.getElementById('btnFcNext')?.addEventListener('click', nextFlashcard);
document.getElementById('btnFcShuffle')?.addEventListener('click', buildFlashcardPool);

async function buildFlashcardPool(){
  if(!fcSourceEl) return;
  const src=fcSourceEl.value;
  const chap=(fcChapterFilterEl?.value||'').trim().toLowerCase();
  const all=await getAllQuestions();
  const weakSet=new Set(computeWeakQuestions(all).map(q=>q.id));
  const nowIso=new Date().toISOString();
  let pool=all.filter(q=>q.active!==false);

  if(src==='due') pool=pool.filter(q=>isDue(q,nowIso));
  else if(src==='weak') pool=pool.filter(q=>weakSet.has(q.id));
  else if(src==='flagged') pool=pool.filter(q=>q.flagged);
  else if(src==='chapter' && chap) pool=pool.filter(q=>(q.chapter||'').toLowerCase()===chap);

  flashcardPool=shuffle(pool);
  flashcardIndex=-1;
  nextFlashcard();
}
function currentFlashcard(){
  if(flashcardIndex<0 || flashcardIndex>=flashcardPool.length) return null;
  return flashcardPool[flashcardIndex];
}
function renderFlashcard(){
  if(!fcFront||!fcBack||!fcModeEl) return;
  const q=currentFlashcard();
  if(!q){
    fcFront.textContent='No cards in this pool.';
    fcBack.style.display='none'; fcBack.textContent='';
    document.getElementById('fcGrading')?.classList.add('hidden');
    return;
  }
  const mode=fcModeEl.value;
  const letters=['A','B','C','D','E','F','G'];
  const correctIdx=(q.choices||[]).findIndex(c=>c.isCorrect);
  const correctChoice=correctIdx>=0? q.choices[correctIdx] : null;

  if(mode==='q-first'){
    fcFront.innerHTML=`Q#${q.id??''} – ${q.text||''}`;
    if(q.imageData||q.imageUrl){
      const src=q.imageData||q.imageUrl;
      fcFront.innerHTML+=`<div class="img-preview"><img src="${src}" alt="img"></div>`;
    }
    if(!flashcardShowBack){
      fcBack.style.display='none'; fcBack.innerHTML='';
      document.getElementById('fcGrading')?.classList.add('hidden');
    }else{
      let back='';
      if(correctChoice) back+=`<div><strong>Answer:</strong> ${letters[correctIdx]}. ${correctChoice.text||''}</div>`;
      if(q.explanation) back+=`<div style="margin-top:0.25rem;"><strong>Explanation:</strong> ${q.explanation}</div>`;
      fcBack.innerHTML=back||'No answer text.';
      fcBack.style.display='block';
      document.getElementById('fcGrading')?.classList.remove('hidden');
    }
  }else{
    fcFront.innerHTML=correctChoice
      ? `<div><strong>Key idea:</strong> ${correctChoice.text||''}</div>`
      : `<div><strong>Key idea:</strong> ${q.explanation||'No answer text.'}</div>`;
    if(!flashcardShowBack){
      fcBack.style.display='none'; fcBack.innerHTML='';
      document.getElementById('fcGrading')?.classList.add('hidden');
    }else{
      let back=`Q#${q.id??''} – ${q.text||''}`;
      if(q.imageData||q.imageUrl){
        const src=q.imageData||q.imageUrl;
        back+=`<div class="img-preview"><img src="${src}" alt="img"></div>`;
      }
      fcBack.innerHTML=back;
      fcBack.style.display='block';
      document.getElementById('fcGrading')?.classList.remove('hidden');
    }
  }
}
function nextFlashcard(){
  if(!flashcardPool.length){
    flashcardIndex=-1; flashcardShowBack=false; renderFlashcard(); return;
  }
  flashcardIndex=(flashcardIndex+1)%flashcardPool.length;
  flashcardShowBack=false; renderFlashcard();
}
async function updateSpacedAfterFlashcard(good){
  const q=currentFlashcard(); if(!q) return;
  const tx=db.transaction('questions','readwrite');
  const store=tx.objectStore('questions');
  const req=store.get(q.id);
  req.onsuccess=e=>{
    const cur=e.target.result; if(!cur) return;
    nextSpaced(cur, good); store.put(cur);
  };
}

// exam
document.getElementById('btnStartExam')?.addEventListener('click', startExam);
document.getElementById('btnExamPrev')?.addEventListener('click', ()=>examMove(-1));
document.getElementById('btnExamNext')?.addEventListener('click', ()=>examMove(1));
document.getElementById('btnExamFinish')?.addEventListener('click', finishExam);

document.getElementById('examPool')?.addEventListener('change',()=>{
  const v=document.getElementById('examPool')?.value;
  const f=document.getElementById('examChapterFilter');
  if(f) f.style.display=(v==='chapter')?'inline-block':'none';
});

async function startExam(){
  const poolType=document.getElementById('examPool')?.value||'all';
  const chap=(document.getElementById('examChapterFilter')?.value||'').trim().toLowerCase();
  const count=parseInt(document.getElementById('examCount')?.value||'40',10);
  const minutes=parseInt(document.getElementById('examMinutes')?.value||'60',10);

  const all=await getAllQuestions();
  const weakSet=new Set(computeWeakQuestions(all).map(q=>q.id));
  let pool=all.filter(q=>q.active!==false);

  if(poolType==='weak') pool=pool.filter(q=>weakSet.has(q.id));
  else if(poolType==='flagged') pool=pool.filter(q=>q.flagged);
  else if(poolType==='chapter' && chap) pool=pool.filter(q=>(q.chapter||'').toLowerCase()===chap);

  pool=shuffle(pool);
  if(!pool.length){ toast('No questions available for this pool.'); return; }

  const selected=pool.slice(0, Math.min(count, pool.length));

  examSession={ ids:selected.map(q=>q.id), answers:{}, index:0, startTime:Date.now(), limitMs:minutes*60*1000 };

  document.getElementById('examTotalLabel').textContent=selected.length;
  document.getElementById('examActiveCard')?.classList.remove('hidden');
  document.getElementById('examResultCard')?.classList.add('hidden');

  await renderExamQuestion();
  startExamTimer();
}

async function renderExamQuestion(){
  if(!examSession) return;
  const idx=examSession.index;
  const total=examSession.ids.length;
  if(idx<0 || idx>=total) return;

  document.getElementById('examIndexLabel').textContent=(idx+1);

  const qid=examSession.ids[idx];
  const q=await getQuestionById(qid);
  const panel=document.getElementById('examQuestionPanel');
  if(!panel) return;
  if(!q){ panel.innerHTML='<div class="muted">Question not found.</div>'; return; }

  const letters=['A','B','C','D','E','F','G'];
  let html=`<div class="q-text">Q#${q.id??''} – ${q.text||''}</div>`;
  if(q.chapter||q.source){
    html+=`<div class="tag-chapter">
      ${q.chapter?`<span>${q.chapter}</span>`:''}
      ${q.source?` · <span>${q.source}</span>`:''}
    </div>`;
  }
  if(q.imageData||q.imageUrl){
    const src=q.imageData||q.imageUrl;
    html+=`<div class="img-preview"><img src="${src}" alt="img"></div>`;
  }
  html+='<div style="margin-top:0.4rem;">';
  (q.choices||[]).forEach((c,i)=>{
    const letter=letters[i]||'?';
    const saved=examSession.answers[qid];
    const checked=saved===i?'checked':'';
    html+=`<label class="choice">
      <input type="radio" name="examChoice" value="${i}" ${checked}>
      <strong>${letter}.</strong> ${c.text||''}
    </label>`;
  });
  html+='</div>';
  panel.innerHTML=html;
}

function examMove(delta){
  if(!examSession) return;
  const panel=document.getElementById('examQuestionPanel');
  const radios=panel?.querySelectorAll('input[name="examChoice"]')||[];
  let selected=null;
  radios.forEach(r=>{ if(r.checked) selected=parseInt(r.value,10); });
  const currentQid=examSession.ids[examSession.index];
  if(selected!=null) examSession.answers[currentQid]=selected;

  const nextIndex=examSession.index+delta;
  if(nextIndex<0 || nextIndex>=examSession.ids.length) return;
  examSession.index=nextIndex;
  renderExamQuestion();
}

async function finishExam(){
  if(!examSession) return;
  clearInterval(examTimerId); examTimerId=null;

  const panel=document.getElementById('examQuestionPanel');
  const radios=panel?.querySelectorAll('input[name="examChoice"]')||[];
  let selected=null;
  radios.forEach(r=>{ if(r.checked) selected=parseInt(r.value,10); });
  const currentQid=examSession.ids[examSession.index];
  if(selected!=null) examSession.answers[currentQid]=selected;

  const all=await getAllQuestions();
  const byId=new Map(all.map(q=>[q.id,q]));

  let correct=0, wrong=0, unanswered=0;
  const perChapter=new Map();
  examSession.ids.forEach(id=>{
    const q=byId.get(id); if(!q) return;
    const ans=examSession.answers[id];
    const correctIdx=(q.choices||[]).findIndex(c=>c.isCorrect);
    if(ans==null){ unanswered++; return; }
    const chap=q.chapter||'No chapter';
    if(!perChapter.has(chap)) perChapter.set(chap,{correct:0,wrong:0});
    if(ans===correctIdx){ correct++; perChapter.get(chap).correct++; }
    else { wrong++; perChapter.get(chap).wrong++; }
  });

  const total=examSession.ids.length;
  const score=total?(correct/total*100):0;
  const durationMs=Date.now()-examSession.startTime;
  const minutesUsed=durationMs/60000;

  const summaryEl=document.getElementById('examSummary');
  if(summaryEl){
    summaryEl.innerHTML=`
      <div>Total questions: <strong>${total}</strong></div>
      <div>Correct: <strong>${correct}</strong></div>
      <div>Wrong: <strong>${wrong}</strong></div>
      <div>Unanswered: <strong>${unanswered}</strong></div>
      <div>Score: <strong>${score.toFixed(1)}%</strong></div>
      <div>Time used: <strong>${minutesUsed.toFixed(1)} min</strong></div>
    `;
  }
  let detailHtml='<div>Per chapter:</div>';
  perChapter.forEach((v,chap)=>{
    const t=v.correct+v.wrong;
    const s=t?(v.correct/t*100):0;
    detailHtml+=`<div>${chap}: ${v.correct}/${t} correct (${s.toFixed(1)}%)</div>`;
  });
  const detailsEl=document.getElementById('examDetails');
  if(detailsEl) detailsEl.innerHTML=detailHtml;

  document.getElementById('examActiveCard')?.classList.add('hidden');
  document.getElementById('examResultCard')?.classList.remove('hidden');
  examSession=null;
}

function startExamTimer(){
  if(!examSession) return;
  if(examTimerId) clearInterval(examTimerId);
  const label=document.getElementById('examTimerLabel');
  const endTime=examSession.startTime+examSession.limitMs;
  function tick(){
    const now=Date.now();
    const remain=Math.max(0,endTime-now);
    const m=Math.floor(remain/60000);
    const s=Math.floor((remain%60000)/1000);
    if(label) label.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if(remain<=0){
      clearInterval(examTimerId); examTimerId=null;
      toast('Time is over – finishing exam.');
      finishExam();
    }
  }
  tick();
  examTimerId=setInterval(tick,1000);
}

// reset progress
async function resetProgress(scope){
  if(!db) return;
  if(!confirm('Reset progress? Keeps questions but clears practice history.')) return;
  const tx=db.transaction(['questions','answers'],'readwrite');
  const qStore=tx.objectStore('questions');
  const aStore=tx.objectStore('answers');

  const all=await new Promise(res=>{
    const req=qStore.getAll();
    req.onsuccess=e=>res(e.target.result||[]);
    req.onerror=()=>res([]);
  });
  const now=new Date().toISOString();

  for(const q of all){
    const everWrong=(q.timesWrong||0)>0;
    if(scope==='wrong' && !everWrong) continue;
    q.timesSeen=0; q.timesWrong=0; q.timesCorrect=0;
    q.lastSeenAt=null; q.dueAt=now; q.srEase=2.5; q.srInterval=0; q.srReps=0;
    qStore.put(q);

    const idx=aStore.index('by_question');
    const ansList=await new Promise(res=>{
      const r=idx.getAll(q.id);
      r.onsuccess=e=>res(e.target.result||[]);
      r.onerror=()=>res([]);
    });
    for(const a of ansList) aStore.delete(a.id);
  }
  toast('Progress reset completed.');
  startNewPracticeSession(true);
  updateStatsBar(); updateHistoryList();
}

// local backups list
async function renderLocalBackupsTable(){
  const el=document.getElementById('questionsBackupsTable');
  if(!el) return;
  const arr=await loadMeta('localBackupsV20') || [];
  if(!Array.isArray(arr) || !arr.length){
    el.innerHTML='<div class="muted tiny">No local backups yet.</div>';
    return;
  }
  el.innerHTML=arr.map((b,i)=>{
    return `<div class="history-item">
      <div><strong>${fmtTime(b.exportedAt)}</strong> · ${b.totalQuestions} Q</div>
      <div class="btn-row" style="margin-top:6px;">
        <button class="secondary-btn tiny-btn" data-act="restore" data-idx="${i}">Restore</button>
        <button class="danger-btn tiny-btn" data-act="delete" data-idx="${i}">Delete</button>
      </div>
    </div>`;
  }).join('');
  el.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const act=btn.getAttribute('data-act');
      const idx=parseInt(btn.getAttribute('data-idx'),10);
      const list=await loadMeta('localBackupsV20') || [];
      if(!list[idx]) return;
      if(act==='restore'){
        await importBackupObject(list[idx].data);
        toast('Local backup restored.');
        refreshChapterOptions(); startNewPracticeSession(true); reloadAllQuestionsTable(); buildFlashcardPool(); refreshBackupLabels();
      }else if(act==='delete'){
        list.splice(idx,1);
        saveMeta('localBackupsV20', list);
        renderLocalBackupsTable();
      }
    });
  });
}

async function backupNowLocal(){
  const backup=await buildBackupObject();
  const list=await loadMeta('localBackupsV20') || [];
  list.unshift({exportedAt:backup.meta.exportedAt, totalQuestions:backup.meta.totalQuestions, data:backup});
  saveMeta('localBackupsV20', list.slice(0,25));
  toast('Local backup saved.');
  renderLocalBackupsTable();
}

// tabs + persistence
function saveLastTab(tab){ try{ localStorage.setItem('mcq_last_tab_v20', tab);}catch{} }
function loadLastTab(){ try{ return localStorage.getItem('mcq_last_tab_v20')||'home';}catch{return'home';} }

document.querySelectorAll('.tab-button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const tab=btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(sec=>sec.classList.remove('active'));
    btn.classList.add('active');
    const sec=document.getElementById('tab-'+tab);
    if(sec) sec.classList.add('active');

    saveLastTab(tab);
    if(tab==='all') reloadAllQuestionsTable();
    else if(tab==='backups') renderLocalBackupsTable();
    else if(tab==='settings') loadGitHubConfigIntoUI();
    else if(tab==='dashboard') { updateStatsBar(); renderDashboard(); }
  });
});

// theme toggle
function loadTheme(){
  try{ currentTheme=localStorage.getItem('mcq_theme_v20')||'dark'; }catch{ currentTheme='dark'; }
  applyTheme();
}
function applyTheme(){
  document.body.classList.remove('theme-light');
  if(currentTheme==='light') document.body.classList.add('theme-light');
}
document.getElementById('themeToggle')?.addEventListener('click',()=>{
  currentTheme = (currentTheme==='light')?'dark':'light';
  applyTheme();
  try{ localStorage.setItem('mcq_theme_v20', currentTheme);}catch{}
});

// prefs
async function loadPracticePrefs(){
  const val=await loadMeta('prefSkipSolved');
  if(typeof val==='boolean') prefSkipSolved=val;
  if(prefSkipSolvedEl) prefSkipSolvedEl.checked=!!prefSkipSolved;
}
function setPrefSkipSolved(val){
  prefSkipSolved=!!val;
  saveMeta('prefSkipSolved', prefSkipSolved);
}
prefSkipSolvedEl?.addEventListener('change',()=>setPrefSkipSolved(prefSkipSolvedEl.checked));

// wiring
document.getElementById('btnSubmit')?.addEventListener('click', submitAnswer);
document.getElementById('btnNext')?.addEventListener('click', loadNextQuestion);
document.getElementById('btnPrev')?.addEventListener('click', goPreviousQuestion);

document.getElementById('btnRefreshPractice')?.addEventListener('click',()=>startNewPracticeSession(true));

document.getElementById('btnImportTrigger')?.addEventListener('click',()=>document.getElementById('fileInput')?.click());
document.getElementById('fileInput')?.addEventListener('change',e=>handleImportFile(e.target.files?.[0]));
document.getElementById('btnExportTrigger')?.addEventListener('click', exportQuestionsOnly);
document.getElementById('btnBulkDelete')?.addEventListener('click', deleteSelectedAll);
document.getElementById('allSelectAll')?.addEventListener('change', e=>{
  const boxes=Array.from(document.querySelectorAll('#allTableBody input.row-select'));
  boxes.forEach(ch=>{
    const id=parseInt(ch.getAttribute('data-id'),10);
    ch.checked=e.target.checked;
    e.target.checked?allSelectedIds.add(id):allSelectedIds.delete(id);
  });
  updateAllSelectedCount();
});

document.getElementById('btnAllApply')?.addEventListener('click',()=>{ allCurrentPage=1; reloadAllQuestionsTable(); });

document.getElementById('allSearch')?.addEventListener('input', debounce(()=>{allCurrentPage=1; reloadAllQuestionsTable();},250));
document.getElementById('allFilter')?.addEventListener('change', ()=>{allCurrentPage=1; reloadAllQuestionsTable();});
document.getElementById('allChapterSelect')?.addEventListener('change', ()=>{allCurrentPage=1; reloadAllQuestionsTable();});

document.getElementById('allPrevPage')?.addEventListener('click',()=>{ if(allCurrentPage>1){allCurrentPage--; reloadAllQuestionsTable();}});
document.getElementById('allNextPage')?.addEventListener('click',()=>{ if(allCurrentPage<allTotalPages){allCurrentPage++; reloadAllQuestionsTable();}});

document.getElementById('btnScanDup')?.addEventListener('click', scanDuplicates);
document.getElementById('btnFixDup')?.addEventListener('click', autoFixDuplicates);

document.getElementById('btnSaveGh')?.addEventListener('click', saveGitHubConfigFromUI);
document.getElementById('btnCloudUpload')?.addEventListener('click', cloudUpload);
document.getElementById('btnCloudDownload')?.addEventListener('click', cloudDownload);

document.getElementById('btnBackupExport')?.addEventListener('click', exportFullBackup);
document.getElementById('btnBackupImport')?.addEventListener('click', ()=>document.getElementById('backupFileInput')?.click());
document.getElementById('backupFileInput')?.addEventListener('change',e=>handleBackupImportFile(e.target.files?.[0]));
document.getElementById('btnBackupQuestionsNow')?.addEventListener('click', backupNowLocal);
document.getElementById('btnHeaderBackup')?.addEventListener('click',()=>document.querySelector('.tab-button[data-tab="backups"]')?.click());

document.getElementById('btnRefreshStats')?.addEventListener('click',()=>{ updateStatsBar(); renderDashboard(); });

document.getElementById('btnResetProgress')?.addEventListener('click', async ()=>{
  const scope=document.getElementById('resetScope')?.value||'all';
  await resetProgress(scope);
});

document.getElementById('btnFactoryReset')?.addEventListener('click', async ()=>{
  if(!confirm('Factory reset? This deletes ALL local data.')) return;
  indexedDB.deleteDatabase(DB_NAME);
  localStorage.removeItem('mcq_last_tab_v20');
  localStorage.removeItem('mcq_github_config_v20');
  localStorage.removeItem('mcq_theme_v20');
  location.reload();
});
document.getElementById('btnForceReload')?.addEventListener('click', ()=>location.reload());

// mode select UI
modeSelect?.addEventListener('change',()=>{
  currentMode=modeSelect.value||'due';
  if(currentMode==='chapter'){
    if(chapterBox) chapterBox.style.display='block';
  }else{
    if(chapterBox) chapterBox.style.display='none';
    currentChapter='';
    if(chapterSelect) chapterSelect.value='';
  }
  startNewPracticeSession(true);
});
chapterSelect?.addEventListener('change',()=>{
  currentChapter=(chapterSelect.value||'').trim();
  startNewPracticeSession(true);
});

// boot
(async function boot(){
  try{
    await openDB();
    document.getElementById('dbStatus').textContent='DB: Ready';
    loadTheme();
    refreshBackupLabels();
    refreshCloudInfo();
    loadGitHubConfigIntoUI();
    refreshChapterOptions();
    await loadPracticePrefs();
    await startNewPracticeSession(true);
    await buildFlashcardPool();

    const lastTab=loadLastTab();
    document.querySelector(`.tab-button[data-tab="${lastTab}"]`)?.click();
  }catch(err){
    console.error(err);
    document.getElementById('dbStatus').textContent='DB: Error';
    alert('Failed to open local database.');
  }
})();

/* PATCH: session pills rendering */
function renderSessionHistory(list){
  const box = document.getElementById('historyList');
  if(!box)return;
  box.innerHTML='';
  list.forEach(q=>{
    const div=document.createElement('div');
    div.className='session-pill';
    if(q.status==='correct')div.classList.add('correct');
    if(q.status==='wrong')div.classList.add('wrong');
    if(q.flagged)div.classList.add('flagged');
    div.textContent = q.seq + ' • ' + q.status;
    div.onclick=()=>loadQuestionById(q.id);
    box.appendChild(div);
  });
}
