const CFG=typeof FOTO!=='undefined'?FOTO:{};
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const PASSCODE='1234';
const home=$('#home'),pass=$('#pass'),lock=$('#lock'),app=$('#app');
let entered='',unlocked=false;
const hm=d=>d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}).replace('.',':');

const SIG='<svg viewBox="0 0 19 12"><rect y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" width="3" height="12" rx=".8"/></svg>';
const WIF='<svg viewBox="0 0 17 12"><path d="M8.5 11.6l2.1-2.3a3 3 0 0 0-4.2 0zM3.6 6.4a7 7 0 0 1 9.8 0l1.3-1.4a8.9 8.9 0 0 0-12.4 0zM.5 3.4a11.2 11.2 0 0 1 16 0L17 2A12.9 12.9 0 0 0 0 2z"/></svg>';
const BAT='<svg viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2.5"/><path d="M25 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2z" opacity=".5"/></svg>';
const P={
 torch:'<path d="M9 2h6v5l-1.5 2v4h-3V9L9 7zM10.5 15h3v7h-3z" fill="#fff" stroke="none"/>',
 cam:'<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="4"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
 plane:'<path d="M21 16l-8-5V4.5a1.5 1.5 0 0 0-3 0V11l-8 5v2l8-2.5V20l-2 1.5V23l3.5-1 3.5 1v-1.5L13 20v-4.5l8 2.5z"/>',
 wifi:'<path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5h.01"/>',
 bt:'<path d="M7 7l10 10-5 4V3l5 4L7 17"/>',
 cm:'<path d="M4 5h16v11H9l-5 4z"/>',
 rp:'<path d="M4 12V9a3 3 0 0 1 3-3h11l-3-3M20 12v3a3 3 0 0 1-3 3H6l3 3"/>',
 ht:'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',
 home:'<path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/>',
 bell:'<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 xl:'<path d="M5 4l14 16M19 4L5 20" stroke-width="2.6"/>'
};
Object.assign(P,{
 usr:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 4-7 8-7s8 2 8 7z"/>',
 oc:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01" stroke-width="3"/>',
 bag:'<path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"/>',
 more:'<path d="M5 12h.01M12 12h.01M19 12h.01" stroke-width="3.6"/>',
 addf:'<circle cx="10" cy="8" r="4"/><path d="M2 20c0-4 3-6 8-6M18 9v6M15 12h6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
 chev:'<path d="M15 4l-8 8 8 8"/>',plus:'<path d="M12 5v14M5 12h14"/>',
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01"/>',
 up:'<path d="M12 19V5M5 12l7-7 7 7" stroke-width="2.6"/>',hash:'<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>'
});
const G=n=>`<svg viewBox="0 0 24 24">${P[n]}</svg>`;
const gr=(k,a,b,body)=>`<defs><linearGradient id="g-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="60" height="60" fill="url(#g-${k})"/>${body}`;
const TILES={
 wa:()=>gr('wa','#61fd7d','#25cf43','<path d="M30 14a16 16 0 0 0-13.8 24L14 46l8.2-2.1A16 16 0 1 0 30 14z" fill="none" stroke="#fff" stroke-width="3.2" stroke-linejoin="round"/><path d="M24.5 23.5c-1 1-1.2 2.7 0 4.8 1.6 2.8 3.8 4.8 6.6 6.2 1.8.9 3.2.5 4.2-.7l.9-1.2-3.5-2.2-1.4 1.1c-1.6-.7-3.7-2.8-4.4-4.3l1.1-1.2-1.7-3.6z" fill="#fff"/>'),
 pesan:()=>gr('ps','#5bf675','#0cbd2a','<ellipse cx="30" cy="28" rx="18" ry="14" fill="#fff"/><path d="M16 42c3-1.5 4.5-3.5 4.5-6l7 2z" fill="#fff"/>'),
 catatan:()=>'<rect width="60" height="60" fill="#fff"/><rect width="60" height="17" fill="#ffd60a"/><path d="M8 29h44M8 39h44M8 49h44" stroke="#e5e5ea" stroke-width="1.6"/>',
 jam:()=>'<rect width="60" height="60" fill="#000"/><circle cx="30" cy="30" r="23" fill="#fff"/><path d="M30 10v4M30 46v4M10 30h4M46 30h4" stroke="#000" stroke-width="2.4"/><path d="M30 30V17M30 30l9 5" stroke="#000" stroke-width="3" stroke-linecap="round"/><path d="M30 30L22 41" stroke="#ff9f0a" stroke-width="1.6"/>',
 setelan:()=>gr('st','#c4c6cd','#7e8087','<circle cx="30" cy="30" r="15" fill="none" stroke="#45474d" stroke-width="7" stroke-dasharray="4.7 4.7"/><circle cx="30" cy="30" r="11" fill="#45474d"/><circle cx="30" cy="30" r="4.5" fill="#a9abb2"/>'),
 cuaca:()=>gr('cc','#2a7de1','#6ec1ff','<circle cx="39" cy="22" r="9" fill="#ffd60a"/><path d="M15 44a7.5 7.5 0 0 1 1-15 11 11 0 0 1 21 2.5 6.5 6.5 0 0 1 0 12.5z" fill="#fff"/>'),
 kakao:()=>'<rect width="60" height="60" fill="#fee500"/><ellipse cx="30" cy="29" rx="19" ry="15.5" fill="#3c1e1e"/><path d="M21 41l-3 8 10-5z" fill="#3c1e1e"/><text x="30" y="33" text-anchor="middle" font-size="12.5" font-weight="800" fill="#fee500" stroke="none" font-family="-apple-system,Helvetica,Arial">TALK</text>',
 foto:()=>`<rect width="60" height="60" fill="#fff"/><g transform="translate(30 30)" style="isolation:isolate">${['#ff3b30','#ff9500','#ffcc00','#a8e05f','#34c759','#32ade6','#5856d6','#af52de'].map((c,i)=>`<ellipse cx="0" cy="-9.5" rx="7" ry="11.5" fill="${c}" fill-opacity=".8" style="mix-blend-mode:multiply" transform="rotate(${i*45})"/>`).join('')}</g>`,
 ig:()=>'<defs><linearGradient id="g-ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#fdc468"/><stop offset=".35" stop-color="#f56040"/><stop offset=".62" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect width="60" height="60" fill="url(#g-ig)"/><rect x="14" y="14" width="32" height="32" rx="9.5" fill="none" stroke="#fff" stroke-width="3.4"/><circle cx="30" cy="30" r="7.5" fill="none" stroke="#fff" stroke-width="3.4"/><circle cx="39.5" cy="20.5" r="2.2" fill="#fff" stroke="none"/>',
 kalender:()=>{const d=new Date();return `<rect width="60" height="60" fill="#fff"/><text x="30" y="17" text-anchor="middle" font-size="11" font-weight="600" fill="#ff3b30" stroke="none" font-family="-apple-system,Helvetica,Arial">${d.toLocaleDateString('id-ID',{weekday:'long'})}</text><text x="30" y="50" text-anchor="middle" font-size="33" font-weight="300" fill="#000" stroke="none" font-family="-apple-system,Helvetica,Arial">${d.getDate()}</text>`}
};
const tile=k=>`<svg viewBox="0 0 60 60">${TILES[k]()}</svg>`;
const sb=()=>`<div class="sb"><b>${hm(new Date())}</b><span>${SIG}${WIF}${BAT}</span></div>`;
const tick=()=>{const d=new Date();$('#tm').textContent=hm(d);$('#dt').textContent=d.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long'});const c=$('.clk');if(c)c.textContent=d.toLocaleTimeString('id-ID').replace(/\./g,':');$$('.sb b').forEach(e=>e.textContent=hm(d))};
const store=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(e){return ''}};

const chats={
 wa:{Nathan:['Bro, jadi nonton nanti malam?','>Jadi dong, jam berapa?','Jam 7 ya, aku jemput 🎬'],Mama:['Jangan lupa makan ya, nak ❤️'],Kantor:['Rapat dimulai jam 9 besok.']},
 im:{Hubby:['sayang','udah pulang?']}
};
const alarms=[{t:'06:30',n:'Bangun',on:true},{t:'08:00',n:'Berangkat',on:false}];
const apps={
 wa:{n:'WhatsApp',e:'💬',c:'#25d366',r:b=>chatApp(b,'wa')},
 foto:{n:'Foto',c:'#fff',r:renderFoto,lt:1},
 ig:{n:'Instagram',c:'#d62976',r:renderIG},
 cuaca:{n:'Cuaca',e:'🌤️',c:'#3b82c4',r:renderCuaca},
 kalender:{n:'Kalender',e:'📅',c:'#fff',r:renderKal,lt:1},
 pesan:{n:'Pesan',e:'💬',c:'#34c759',r:b=>chatApp(b,'im')},
 catatan:{n:'Catatan',e:'📝',c:'#f5c542',r:renderCatatan},
 jam:{n:'Jam',e:'⏰',c:'#1c1c1e',r:renderJam},
 kakao:{n:'KakaoTalk',c:'#fee500',r:renderKakao,lt:1},
 setelan:{n:'Setelan',e:'⚙️',c:'#8e8e93',r:renderSetelan,lt:1}
};
const icon=k=>`<div class="ic" data-app="${k}"><u>${tile(k)}</u>${apps[k].n}</div>`;

function build(){
 const d=new Date();
 lock.innerHTML=`${sb()}<div id="dt"></div><div id="tm"></div>
  <div id="nt">
   <div class="nf pop"><div class="av2">${avi('hubby','H')}<u>${tile('pesan')}</u></div><div class="tx"><b>Hubby<em>sekarang</em></b><p class="two">sayang<br>udah pulang?</p></div></div>
  </div>
  <div class="lb"><i class="lbtn">${G('torch')}</i><span>Ketuk untuk membuka</span><i class="lbtn">${G('cam')}</i></div>`;
 const L=['','ABC','DEF','GHI','JKL','MNO','PQRS','TUV','WXYZ'];
 pass.innerHTML=`${sb()}<h2>Enter Passcode</h2><div id="dots"></div>
  <div id="pad">${L.map((l,i)=>`<b data-k="${i+1}">${i+1}<small>${l}</small></b>`).join('')}<b class="n"></b><b data-k="0">0<small></small></b><b class="n"></b></div>
  <div class="bt"><span>Emergency</span><span data-k="d">Delete</span></div>`;
 home.innerHTML=`${sb()}<div id="wg">
   <div class="wgt wx2"><div class="wl">Jakarta</div><div class="wt2">29°</div><div class="wb2">Berawan<br>H:32° L:25°</div></div>
   <div class="wgt cw2"><small>${d.toLocaleDateString('id-ID',{weekday:'long'}).toUpperCase()}</small><big>${d.getDate()}</big><div class="no">Tidak ada acara</div></div>
  </div>
  <div id="gr">${['wa','ig','cuaca','kalender','kakao','foto'].map(icon).join('')}</div>
  <div id="sp">${G('search')} Search</div><div id="dk">${['pesan','catatan','jam','setelan'].map(icon).join('')}</div>`;
 dots();tick();
}
const dots=()=>$('#dots').innerHTML=[0,1,2,3].map(i=>`<i class="${i<entered.length?'f':''}"></i>`).join('');
const showPass=()=>{lock.classList.add('up');pass.classList.remove('off');entered='';dots()};
const showLock=()=>{unlocked=false;closeApp();lock.classList.remove('up');pass.classList.add('off');home.classList.add('off')};
const unlock=()=>{unlocked=true;lock.classList.add('up');pass.classList.add('off');home.classList.remove('off')};
lock.onclick=showPass;
pass.onclick=e=>{
 const k=e.target.closest('[data-k]')?.dataset.k;if(k===undefined)return;
 if(k==='d')entered=entered.slice(0,-1);else if(entered.length<4)entered+=k;
 dots();
 if(entered.length===4)setTimeout(()=>{
  if(entered===PASSCODE)unlock();
  else{const d=$('#dots');d.classList.add('sh');setTimeout(()=>{d.classList.remove('sh');entered='';dots()},450)}
 },150);
};
home.onclick=e=>{const i=e.target.closest('.ic');if(i)openApp(i.dataset.app)};
$('#hb').onclick=()=>app.classList.contains('on')?closeApp():unlocked&&showLock();

function openApp(k){
 const a=apps[k];app.style.background='';app.classList.toggle('lt',!!a.lt);
 app.classList.remove('nogb');
 app.innerHTML=`${sb()}${['ig','kakao','foto'].includes(k)?`<div class="bk" id="gbk">${G('chev')}Beranda</div>`:''}<div id="ac"></div>`;
 a.r($('#ac'));app.classList.add('on');
 const g=$('#gbk');if(g)g.onclick=closeApp;
}
function closeApp(){app.classList.remove('on')}
const back=(f)=>`<div class="bk" id="bk">${G('chev')}${f||'Beranda'}</div>`;

function chatApp(b,kind){
 const wa=kind==='wa',data=chats[kind],R=wa?'wr':'ir';
 const list=()=>{
  b.innerHTML=back()+`<div class="big">${wa?'Chat':'Pesan'}</div>`+Object.keys(data).map(n=>`<div class="${R}" data-n="${n}">${avl(n)}<div><b>${n}</b><small>${data[n].slice(-1)[0].replace(/^>/,'')}</small></div></div>`).join('');
  $('#bk').onclick=closeApp;
  b.onclick=e=>{const r=e.target.closest('.'+R);if(r)open(r.dataset.n)};
 };
 const open=n=>{
  b.onclick=null;
  b.innerHTML=(wa?`<div class="wc"><span id="bk">‹</span>${avl(n)}<div><b>${n}</b><small>online</small></div></div>`:back('Pesan'))+`<div class="bb ${wa?'wp2':''}" id="bb"></div><div class="ib"><input id="msg" placeholder="${wa?'Ketik pesan':'iMessage'}"><b id="go">Kirim</b></div>`;
  const cls=wa?'wb':'im',draw=()=>{$('#bb').innerHTML=data[n].map(t=>`<div class="${cls} ${t[0]==='>'?'me':''}">${t.replace(/^>/,'')}</div>`).join('');$('#bb').scrollTop=9e9};
  draw();$('#bk').onclick=list;
  const send=()=>{const i=$('#msg'),v=i.value.trim();if(!v)return;data[n].push('>'+v);i.value='';draw();
   setTimeout(()=>{data[n].push(['Oke!','Siap 👍','Nanti kukabari ya'][v.length%3]);if($('#bb'))draw()},900)};
  $('#go').onclick=send;$('#msg').onkeydown=e=>e.key==='Enter'&&send();
 };
 list();
}
function renderCatatan(b){
 b.innerHTML=back()+`<div class="big">Catatan</div><textarea id="nt2" placeholder="Tulis catatan…"></textarea>`;
 const t=$('#nt2');t.value=store('vwf-note');t.oninput=()=>store('vwf-note',t.value);$('#bk').onclick=closeApp;
}
function renderJam(b){
 b.innerHTML=back()+`<div class="clk"></div><div class="big">Alarm</div>`+alarms.map((a,i)=>`<div class="ja"><div><b>${a.t}</b><small>${a.n}</small></div><span class="tg ${a.on?'on':''}" data-i="${i}"></span></div>`).join('');
 $('#bk').onclick=closeApp;tick();
 b.onclick=e=>{const t=e.target.closest('.tg');if(t){const a=alarms[t.dataset.i];a.on=!a.on;t.classList.toggle('on',a.on)}};
}
function renderSetelan(b){
 const s=[['plane','Mode Pesawat',0,'#ff9f0a'],['wifi','Wi-Fi',1,'#0a84ff'],['bt','Bluetooth',1,'#0a84ff']];
 b.innerHTML=back()+`<div class="big">Setelan</div><div class="gp">${s.map(([e,n,on,c])=>`<div class="gi"><u style="background:${c}">${G(e)}</u><span>${n}</span><i class="tg ${on?'on':''}"></i></div>`).join('')}</div><button class="btn" id="lk">Kunci sekarang</button>`;
 $('#bk').onclick=closeApp;$('#lk').onclick=showLock;
 b.onclick=e=>{const t=e.target.closest('.tg');if(t)t.classList.toggle('on')};
}
function renderKal(b){
 const d=new Date(),f=(new Date(d.getFullYear(),d.getMonth(),1).getDay()+6)%7,n=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
 b.innerHTML=back()+`<div class="big">${d.toLocaleDateString('id-ID',{month:'long',year:'numeric'})}</div><div class="cg">${['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(h=>`<i class="h">${h}</i>`).join('')}${'<i></i>'.repeat(f)}${Array.from({length:n},(_,i)=>`<i class="${i+1===d.getDate()?'td':''}">${i+1}</i>`).join('')}</div>`;
 $('#bk').onclick=closeApp;
}
function renderCuaca(b){
 b.innerHTML=back()+`<div class="wx"><h2>Jakarta</h2><big>29°</big><p>Berawan</p><p>H:32° L:25°</p></div>`;$('#bk').onclick=closeApp;
}

/* ---------- KakaoTalk ---------- */
const K={
 Nathan:{u:2,m:[['t','Bro, jadi nonton nanti malam?','7:42 PM'],['t','Aku udah pesan tiketnya','7:42 PM'],['me','Jadi dong, jam berapa?','7:44 PM',0],['t','Jam 7 ya, aku jemput','7:45 PM']]},
 Mama:{u:1,m:[['t','Jangan lupa makan ya, nak','6:10 PM']]},
 Rani:{u:0,m:[['t','Besok jadi ke kampus?','4:20 PM'],['me','Jadi, ketemu di depan ya','4:31 PM',0]]}
};
let kTab=1;
const esc=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const kav=(s,n)=>pimg(n)?`<div class="kav" style="width:${s}px;height:${s}px;background:url(${pimg(n)}) center/cover"></div>`:`<div class="kav" style="width:${s}px;height:${s}px"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="4.2"/><path d="M3.5 24c0-6 4-8.5 8.5-8.5s8.5 2.5 8.5 8.5z"/></svg></div>`;
const kunread=()=>Object.values(K).reduce((a,c)=>a+c.u,0);
function renderKakao(b){
 b.style.paddingBottom=0;app.style.background='#fff';app.classList.remove('nogb');
 const T=[['Friends','usr'],['Chats','cm'],['Open','oc'],['Shop','bag'],['More','more']];
 const head=()=>`<div class="kh"><b>${T[kTab][0]==='Open'?'Open Chat':T[kTab][0]}</b><span>${G('search')}${kTab===0?G('addf'):G('cm')}${G('gear')}</span></div>`;
 const body=()=>{
  if(kTab===0)return `<div class="krw">${kav(54,'vwf')}<div><b>VWF</b><small>Status message</small></div></div><div class="ksec">Friends ${Object.keys(K).length}</div>`+Object.keys(K).map(n=>`<div class="krw" data-n="${n}">${kav(44,n)}<div><b>${n}</b></div></div>`).join('');
  if(kTab===1)return Object.keys(K).map(n=>{const d=K[n],l=d.m[d.m.length-1];return `<div class="krw" data-n="${n}">${kav(50,n)}<div><b>${n}</b><small>${esc(l[1])}</small></div><div class="kmeta"><span>${l[2]}</span>${d.u?`<i class="kbd">${d.u}</i>`:''}</div></div>`}).join('');
  return '<div class="kem">Nothing here yet.</div>';
 };
 const draw=()=>{
  b.innerHTML=`<div class="kk">${head()}<div class="kb">${body()}</div><div class="kt">${T.map((t,i)=>`<span data-t="${i}" class="${i===kTab?'on':''}">${G(t[1])}${i===1&&kunread()?`<i class="kbd">${kunread()}</i>`:''}</span>`).join('')}</div></div>`;
 };
 draw();
 b.onclick=e=>{
  const t=e.target.closest('[data-t]');if(t){kTab=+t.dataset.t;return draw()}
  const r=e.target.closest('[data-n]');if(r)room(b,r.dataset.n);
 };
}
function room(b,n){
 const d=K[n];d.u=0;app.style.background='#b2c7d9';app.classList.add('nogb');
 b.innerHTML=`<div class="kr"><div class="krh"><span id="kb">${G('chev')}</span><b>${n}</b><span>${G('search')}${G('menu')}</span></div><div class="krb" id="krb"></div><div class="kin"><i>${G('plus')}</i><div class="kfw"><input id="km"><i>${G('smile')}</i></div><i class="ksd" id="ks">${G('hash')}</i></div></div>`;
 const draw=()=>{
  let prev='',h='<div class="kdate">Sunday, October 25, 2026</div>';
  d.m.forEach(([w,t,tm,un])=>{
   const first=prev!==w;prev=w;
   h+=w==='me'
    ?`<div class="krow me"><div class="kst">${un?'<small class="kun">1</small>':''}<small>${tm}</small></div><div class="kbub me ${first?'tl':''}">${esc(t)}</div></div>`
    :`<div class="krow">${first?kav(40,n):'<i class="ksp"></i>'}<div class="kcol">${first?`<span class="knm">${n}</span>`:''}<div class="kline"><div class="kbub ${first?'tl':''}">${esc(t)}</div><small>${tm}</small></div></div></div>`;
  });
  $('#krb').innerHTML=h;$('#krb').scrollTop=9e9;
 };
 draw();
 $('#kb').onclick=()=>{renderKakao(b)};
 $('#km').oninput=()=>{$('#ks').classList.toggle('on',!!$('#km').value.trim());$('#ks').innerHTML=G($('#km').value.trim()?'up':'hash')};
 const send=()=>{
  const i=$('#km'),v=i.value.trim();if(!v)return;
  const tm=new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
  d.m.push(['me',v,tm,1]);i.value='';i.oninput();draw();
  setTimeout(()=>{d.m.forEach(x=>{if(x[0]==='me')x[3]=0});d.m.push(['t',['Oke!','Siap','Nanti kukabari ya'][v.length%3],tm]);if($('#krb'))draw()},1100);
 };
 $('#ks').onclick=send;$('#km').onkeydown=e=>e.key==='Enter'&&send();
}

/* ---------- Instagram ---------- */
Object.assign(P,{
 share:'<path d="M21 3L3 10l7 3 3 7zM10 13l11-10"/>',
 bm:'<path d="M6 3h12v18l-6-4-6 4z"/>',
 rl:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M9 3l3 6M15 3l3 6"/><path d="M10 13l5 3-5 3z"/>',
 cr:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>'
});
let iTab=0;
const IC=['#c9a7ff','#ffb0a3','#9fd3c7','#a5c4f2','#f5d28a'];
const IG=['#ff9ec4,#7a5cff','#ffd36e,#ff6b6b','#6be0c3,#3b82c4','#b993ff,#2b2d5e','#ffa36e,#c4457a','#8ee27a,#1f6f5c'];
const IU=['nathan','rani','mama','kantor','budi'];
const iav=(s,i,n)=>pimg(n)?`<div class="iav" style="width:${s}px;height:${s}px;background:url(${pimg(n)}) center/cover"></div>`:`<div class="iav" style="width:${s}px;height:${s}px;background:${IC[i%5]}"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="4.2"/><path d="M3.5 24c0-6 4-8.5 8.5-8.5s8.5 2.5 8.5 8.5z"/></svg></div>`;
const IP=[
 {u:'nathan',i:0,loc:'Jakarta',g:IG[0],l:128,cap:'Sore ini lumayan juga',c:12,t:'2 hours ago'},
 {u:'rani',i:1,loc:'Bandung',g:IG[1],l:84,cap:'Weekend akhirnya',c:5,t:'5 hours ago'},
 {u:'mama',i:2,loc:'',g:IG[2],l:203,cap:'Masak buat semua',c:21,t:'Yesterday'}
];
function renderIG(b){
 b.style.paddingBottom=0;
 const T=[['home','h'],['search',''],['cr',''],['rl',''],['',''] ];
 const tiles=n=>Array.from({length:n},(_,i)=>`<i style="background:${CFG.feed&&CFG.feed.length?`url(${cssU(CFG.feed[i%CFG.feed.length])}) center/cover`:`linear-gradient(${i*47}deg,${IG[i%6]})`}"></i>`).join('');
 const postHTML=(p,k)=>`<div class="ipo" data-k="${k}"><div class="iph">${iav(32,p.i,p.u)}<div><b>${p.u}</b>${p.loc?`<small>${p.loc}</small>`:''}</div>${G('more')}</div>
  <div class="iim" style="background:${CFG.feed&&CFG.feed.length?`url(${cssU(CFG.feed[k%CFG.feed.length])}) center/cover`:`radial-gradient(circle at 72% 30%,rgba(255,255,255,.55) 0 8%,transparent 8.5%),linear-gradient(135deg,${p.g})`}"></div>
  <div class="iac"><span class="ilk ${p.on?'on':''}">${G('ht')}</span><span>${G('cm')}</span><span>${G('share')}</span><span class="isv ${p.sv?'on':''}">${G('bm')}</span></div>
  <div class="ilt"><b>${p.l+(p.on?1:0)} likes</b></div><div class="icp"><b>${p.u}</b> ${p.cap}</div><div class="icm">View all ${p.c} comments</div><div class="itm">${p.t}</div></div>`;
 const page=()=>{
  if(iTab===0)return `<div class="ih"><span class="iw">Instagram</span><span>${G('ht')}${G('share')}</span></div><div class="ibody"><div class="ist"><div class="isi"><div class="ring0">${iav(62,4,'vwf')}<u>${G('plus')}</u></div><small>Your story</small></div>${IU.map((u,i)=>`<div class="isi"><div class="ring">${iav(56,i,IU[i])}</div><small>${u}</small></div>`).join('')}</div>${IP.map(postHTML).join('')}</div>`;
  if(iTab===1)return `<div class="ibody"><div class="isr">${G('search')} Search</div><div class="igg">${tiles(30)}</div></div>`;
  if(iTab===4)return `<div class="ih"><b style="font-size:20px">vwf_</b><span>${G('cr')}${G('menu')}</span></div><div class="ibody"><div class="ipf">${iav(82,3,'vwf')}<div class="st"><div><b>9</b><small>posts</small></div><div><b>214</b><small>followers</small></div><div><b>187</b><small>following</small></div></div></div><div class="ipb"><b>VWF</b><br>Jakarta</div><div class="ibt"><span>Edit profile</span><span>Share profile</span></div><div class="igg">${tiles(9)}</div></div>`;
  return `<div class="ibody"><div class="iem">Nothing here yet.</div></div>`;
 };
 const draw=()=>{b.innerHTML=`<div class="ig">${page()}<div class="itab">${T.map((t,i)=>`<span data-t="${i}" class="${i===iTab?'on':''} ${t[1]}">${i===4?`<div class="itp ${i===iTab?'on':''}">${iav(24,3,'vwf')}</div>`:G(t[0])}</span>`).join('')}</div></div>`};
 draw();
 const last={};
 const like=(po,k,force)=>{const p=IP[k];p.on=force?true:!p.on;po.querySelector('.ilk').classList.toggle('on',p.on);po.querySelector('.ilt b').textContent=(p.l+(p.on?1:0))+' likes'};
 b.onclick=e=>{
  const t=e.target.closest('[data-t]');if(t){iTab=+t.dataset.t;return draw()}
  const po=e.target.closest('.ipo');if(!po)return;const k=+po.dataset.k;
  if(e.target.closest('.ilk'))return like(po,k);
  if(e.target.closest('.isv')){IP[k].sv=!IP[k].sv;return po.querySelector('.isv').classList.toggle('on',IP[k].sv)}
  const im=e.target.closest('.iim');if(im){const n=Date.now();if(n-(last[k]||0)<350){like(po,k,true);const u=document.createElement('div');u.className='ibu';u.innerHTML=G('ht');im.appendChild(u);setTimeout(()=>u.remove(),750)}last[k]=n}
 };
}

/* ---------- Foto (Galeri) ---------- */
Object.assign(P,{
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>'
});
const FB=new Date(),PH=Array.from({length:48},(_,i)=>{const d=new Date(FB.getFullYear(),FB.getMonth(),FB.getDate(),8+(i*7)%12,(i*13)%60);d.setDate(d.getDate()-Math.floor((47-i)*1.6));return{id:i,d,h:(i*47)%360,fav:i%9===4}});
const phBg=(p,full)=>{if(p.img)return `url(${cssU(full?p.img:p.th)}) center/${full?'contain':'cover'} no-repeat`;const h=p.h,x=20+(p.id*37)%60,y=15+(p.id*23)%35;return `radial-gradient(circle at ${x}% ${y}%,rgba(255,255,255,.75) 0 6%,transparent 6.5%),linear-gradient(to top,hsla(${(h+20)%360},35%,22%,.55) 0 30%,transparent 30.5%),linear-gradient(hsl(${h},70%,72%),hsl(${(h+40)%360},75%,55%))`};
if(CFG.galeri&&CFG.galeri.length){
 PH.length=0;
 CFG.galeri.forEach((g,i)=>{const o=typeof g==='string'?{src:g}:g;
  const d=o.date?new Date(String(o.date).replace(' ','T')):new Date(FB.getFullYear(),FB.getMonth(),FB.getDate()-Math.floor((CFG.galeri.length-1-i)*1.6),8+(i*7)%12,(i*13)%60);
  PH.push({id:i,d,img:o.src,th:o.src,fav:!!o.fav,h:0})});
 PH.sort((a,b)=>a.d-b.d);
}
let fView='all';
function renderFoto(b){
 b.style.paddingBottom=0;app.style.background='#fff';
 const lo=(d,o)=>d.toLocaleDateString('id-ID',o),cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
 const t0=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());
 const dayLabel=d=>{const n=Math.round((t0(new Date())-t0(d))/864e5);return n===0?'Hari Ini':n===1?'Kemarin':lo(d,{weekday:'long',day:'numeric',month:'long'})};
 const tm=d=>d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}).replace('.',':');
 const tl=p=>`<i data-id="${p.id}" class="${p.fav?'fv':''}" style="background:${phBg(p)}"></i>`;
 const grp=f=>{const m=new Map();PH.forEach(p=>{const k=f(p);if(!m.has(k))m.set(k,[]);m.get(k).push(p)});return [...m]};
 const draw=()=>{
  let h='';
  if(!PH.length)h='<div class="fem">Belum ada foto</div>';
  else if(fView==='all')h=`<div class="gr3">${PH.map(tl).join('')}</div>`;
  else if(fView==='day')h=grp(p=>p.d.toDateString()).map(([k,a])=>`<div class="fh">${dayLabel(a[0].d)}</div><div class="gr3">${a.map(tl).join('')}</div>`).join('');
  else{const f=fView==='month'?p=>cap(lo(p.d,{month:'long',year:'numeric'})):p=>String(p.d.getFullYear());
   h=grp(f).map(([k,a])=>`<div class="mcard" data-go="1"><div class="mc4">${a.slice(0,4).map(tl).join('')}</div><b>${k}</b></div>`).join('')}
  b.innerHTML=`<div class="fl"><div class="pt"><div class="f34">Pustaka</div><span>Pilih</span></div><div class="fbody" id="fb">${h}</div><div class="seg">${[['year','Tahun'],['month','Bulan'],['day','Hari'],['all','Semua']].map(([k,n])=>`<span data-v="${k}" class="${k===fView?'on':''}">${n}</span>`).join('')}</div></div>`;
  $('#fb').scrollTop=9e9;
 };
 const view=id=>{
  let i=PH.findIndex(p=>p.id===id);
  const o=document.createElement('div');o.className='lbx';app.appendChild(o);
  const close=()=>{o.remove();draw()};
  const show=()=>{
   const p=PH[i];
   o.innerHTML=`<div class="lbh"><span id="lb">${G('chev')}</span><div><b>${dayLabel(p.d)}</b><small>${tm(p.d)}</small></div><span>Edit</span></div><div class="lbi" id="lbi"><div class="lbp ${p.img?'rl':''}" style="background:${phBg(p,1)}"></div></div><div class="lbt"><span>${G('share')}</span><span id="lf" class="${p.fav?'on':''}">${G('ht')}</span><span>${G('info')}</span><span id="ld">${G('trash')}</span></div>`;
   $('#lb').onclick=close;
   $('#lf').onclick=()=>{p.fav=!p.fav;$('#lf').classList.toggle('on',p.fav)};
   $('#ld').onclick=()=>{PH.splice(i,1);if(!PH.length)return close();i=Math.min(i,PH.length-1);show()};
   let x0=0;const z=$('#lbi');
   z.onpointerdown=e=>{x0=e.clientX};
   z.onpointerup=e=>{const dx=e.clientX-x0;if(dx<-50&&i<PH.length-1){i++;show()}else if(dx>50&&i>0){i--;show()}};
  };
  show();
 };
 draw();
 b.onclick=e=>{
  const v=e.target.closest('[data-v]');if(v){fView=v.dataset.v;return draw()}
  if(e.target.closest('[data-go]')){fView='all';return draw()}
  const t=e.target.closest('[data-id]');if(t)view(+t.dataset.id);
 };
}

/* ---------- Aset dari config.js ---------- */
const cssU=u=>String(u).replace(/ /g,'%20').replace(/[()'"]/g,c=>'%'+c.charCodeAt(0).toString(16));
const pimg=n=>{const u=n&&(CFG.profil||{})[String(n).toLowerCase()];return u?cssU(u):null};
const avl=n=>pimg(n)?`<div class="av" style="background:url(${pimg(n)}) center/cover"></div>`:`<div class="av">${n[0]}</div>`;
const avi=(n,l)=>pimg(n)?`<i style="background:url(${pimg(n)}) center/cover"></i>`:`<i>${l}</i>`;
const applyWall=()=>document.querySelectorAll('.wp').forEach(e=>e.style.background=CFG.wallpaper?`url(${cssU(CFG.wallpaper)}) ${CFG.wallpaperPos||'center'}/cover`:'');
setInterval(tick,1000);build();applyWall();
