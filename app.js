let db;
let request = indexedDB.open("mcqdb",1);

request.onupgradeneeded=e=>{
 db=e.target.result;
 db.createObjectStore("questions",{keyPath:"id",autoIncrement:true});
};

request.onsuccess=e=>{
 db=e.target.result;
 show();
};

function show(){
 let tx=db.transaction("questions","readonly");
 let st=tx.objectStore("questions");
 let out="";
 st.getAll().onsuccess=e=>{
  e.target.result.forEach(q=>{
   out+=`<p><b>${q.text}</b></p>`;
  });
  document.getElementById("list").innerHTML=out;
 };
}

function importJSON(){
 let f=document.getElementById("file").files[0];
 let r=new FileReader();
 r.onload=()=>{
  let arr=JSON.parse(r.result);
  let tx=db.transaction("questions","readwrite");
  let st=tx.objectStore("questions");
  arr.forEach(q=>st.add(q));
  tx.oncomplete=show;
 };
 r.readAsText(f);
}

function exportJSON(){
 let tx=db.transaction("questions","readonly");
 let st=tx.objectStore("questions");
 st.getAll().onsuccess=e=>{
  let data=JSON.stringify(e.target.result, null, 2);
  let blob=new Blob([data],{type:"application/json"});
  let a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="mcq_backup.json";
  a.click();
 };
}
