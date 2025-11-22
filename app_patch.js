
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
