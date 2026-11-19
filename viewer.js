(function(){
'use strict';
const F={script:"'Dancing Script',cursive",hand:"'Caveat',cursive",serif:"'Playfair Display',Georgia,serif",sans:"'Poppins',system-ui,sans-serif",grot:"'Space Grotesk','Poppins',sans-serif",pac:"'Pacifico',cursive",vib:"'Great Vibes',cursive",type:"'Special Elite',monospace",bold:"'Abril Fatface',serif"};
const FL={none:'none',warm:'sepia(.3) saturate(1.3)',vintage:'sepia(.6) contrast(.9)',bw:'grayscale(1)',dream:'brightness(1.1) contrast(.92) saturate(1.3)',cool:'saturate(.9) hue-rotate(-12deg) brightness(1.05)',fade:'contrast(.82) brightness(1.12) saturate(.8)',noir:'grayscale(1) contrast(1.35) brightness(.9)',film:'sepia(.25) contrast(1.1) saturate(1.2) hue-rotate(-8deg)'};
const FXM={heart:['♥',0],star:['★',0],petal:['🌸',1],snow:['❄',1],balloon:['🎈',0],fly:['🦋',0],mail:['💌',1],spark:['●',2],conf:['🎊',1],rain:['💧',1],moon:['🌙',2],note:['🎵',0]};
const MS={box:{w:'triangle',b:.3,g:.16,q:[[76,1],[79,1],[84,2],[83,1],[79,1],[76,2],[74,1],[77,1],[81,2],[79,1],[76,1],[72,2]]},soft:{w:'sine',b:.6,g:.1,q:[[60,2],[64,2],[67,2],[72,2],[69,2],[65,2],[62,2],[67,2]]},love:{w:'sine',b:.4,g:.13,q:[[69,1],[72,1],[76,1],[72,1],[67,1],[71,1],[74,1],[71,1],[65,1],[69,1],[72,1],[69,1],[67,1],[71,1],[74,2]]}};
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sents=t=>(String(t||'').replace(/\s+/g,' ').trim().match(/[^.!?…]+(?:[.!?…]+|$)/g)||[]).map(x=>x.trim()).filter(Boolean);

window.GKmake=function(ST,APP,S,opt){
opt=opt||{};
const wrap=opt.wrap||APP;
const isEd=()=>!!(opt.editing&&opt.editing());
let i=0,ci=0,T=0,AS=0,AC=null,MT=0,mi=0,muted=false,opened=false,play=false,forceEnd=false,pre=false,L=[],SL=[];
const q=s=>ST.querySelector(s);
let MK='',VOL=1,CAM=null,ZH=null,ZC=1,ZD=0,CTR=null,WD=null,AUD=null,CT=0,CI=0,MP=false,shots=[];
const SW={ticket:[.6,.8,.42,'↘'],lock:[0,-1,.4,''],curtain:[1,0,.35,'↔'],letter:[0,-1,.35,'↑'],gift:[0,-1,.3,'↑'],polaroid:[0,-1,.35,'↑'],vinyl:[1,0,.4,'→'],night:[1,-1,.4,'↗'],heart:[0,-1,.35,'↑'],web:[0,1,.3,'↓'],chat:[1,0,.3,'→'],neon:[0,-1,.35,'↑'],glass:[0,-1,.3,'↑'],book:[-1,0,.4,'←'],balon:[0,-1,.4,'↑'],gembok:[1,0,.55,'']};
let dg=null,dgd=0,sw0=null,swd=0,fd=1;
const man=()=>S.cvs==='chat'||S.cvs==='tebak'||(S.cvs==='gembok'&&/\d/.test(S.pin||''));
const pinOf=()=>String(S.pin||'').replace(/\D/g,'').slice(0,6);
function chatGo(cv,t){const m=cv.querySelector('.cm');cv.querySelectorAll('.rp,.cin').forEach(x=>x.remove());m.insertAdjacentHTML('beforeend',`<div class="bu me" style="--d:0s">${esc(t)}</div>`);setTimeout(()=>m.insertAdjacentHTML('beforeend','<div class="td" style="animation:none;opacity:1"><i></i><i></i><i></i></div>'),550);setTimeout(()=>{m.querySelectorAll('.td').forEach(x=>x.remove());m.insertAdjacentHTML('beforeend',`<div class="bu ac" style="--d:0s">${esc(S.chok)}</div>`)},1800);setTimeout(()=>openNow(cv),3400)}
function cAct(b,cv){const k=b.dataset.c;
 if(k==='reply')chatGo(cv,b.textContent);
 else if(k==='send'){const x=cv.querySelector('.cti'),t=x.value.trim();if(t)chatGo(cv,t);else x.focus()}
 else if(k==='pick'){b.classList.add('ok');cv.querySelectorAll('.qo').forEach(x=>{if(x!==b)x.classList.add('no');x.disabled=true});cv.querySelector('.qz').insertAdjacentHTML('beforeend',`<p class=qk>${esc(S.qok)}</p>`);setTimeout(()=>openNow(cv),1800)}
 else if(k==='key'){const pin=pinOf(),d=cv.querySelector('.dots2'),v=b.dataset.k;let e=cv.dataset.e||'';e=v==='⌫'?e.slice(0,-1):(e+v).slice(0,pin.length);cv.dataset.e=e;d.querySelectorAll('i').forEach((x,n)=>x.classList.toggle('on',n<e.length));
  if(e.length===pin.length){if(e===pin){cv.querySelector('.gk').textContent='🔓';setTimeout(()=>openNow(cv),600)}else{d.classList.add('bad');try{navigator.vibrate&&navigator.vibrate(60)}catch(_){}setTimeout(()=>{d.classList.remove('bad');cv.dataset.e='';d.querySelectorAll('i').forEach(x=>x.classList.remove('on'))},450)}}}}
ST.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches&&e.target.matches('.cti')){const b=ST.querySelector('[data-c=send]');if(b)cAct(b,q('.cv'))}});

function music(on){clearTimeout(MT);if(!on||(MK||S.mus)==='none'||muted||!MS[MK||S.mus])return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();const m=MS[MK||S.mus],n=m.q[mi++%m.q.length],o=AC.createOscillator(),a=AC.createGain(),t=AC.currentTime,d=n[1]*m.b;o.type=m.w;o.frequency.value=440*Math.pow(2,(n[0]-69)/12);a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(m.g*VOL,t+.03);a.gain.exponentialRampToValueAtTime(.0008,t+d*1.9);o.connect(a);a.connect(AC.destination);o.start(t);o.stop(t+d*2);MT=setTimeout(()=>music(1),d*1000)}catch(e){}}
function ovl(){return(S.stk?'<div class=stl>'+[[8,20,0],[80,32,.6],[6,64,1.2],[78,74,1.8]].map(p=>`<span style="left:${p[0]}%;top:${p[1]}%;animation-delay:-${p[2]}s">${S.stk}</span>`).join('')+'</div>':'')+(S.mus!=='none'&&opened?`<button class=mu data-a=mu>${muted?'🔇':'🔊'}</button>`:'')}
const sp=(t,d,tw,st)=>{let k=0;const step=st||(tw?.035:.05);return `<span class="sp${tw?' tw':''}">`+String(t||'').split(' ').map(w=>'<span style="white-space:nowrap">'+Array.from(w).map(c=>`<b style="animation-delay:${(d+k++*step).toFixed(2)}s">${esc(c)}</b>`).join('')+'</span>').join(' ')+'</span>'};
const wd=t=>esc(t).split(' ').map((w,k)=>`<span class=wd style="animation-delay:${(.5+k*.12).toFixed(2)}s">${w}</span>`).join(' ');
function count(el){const n=+el.dataset.n;let t0=0;if(ST.classList.contains('still')||!n)return;(function f(t){t0=t0||t;const p=Math.min(1,(t-t0)/1600);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(performance.now())}
function burst(n){if(S.bst!=='on')return;const b=document.createElement('div'),ch=(FXM[S.fx]||['♥'])[0];let h='';b.className='bsl';for(let k=0;k<n;k++){const a=k/n*6.283+k%3,r=40+(k*13)%60;h+=`<span class=bs style="--dx:${(Math.cos(a)*r).toFixed(1)}cqw;--dy:${(Math.sin(a)*r*1.3-20).toFixed(1)}cqw;--r:${(k*67)%360}deg;font-size:${4+(k*5)%7}cqw;animation-delay:${k%4*.05}s">${ch}</span>`}b.innerHTML=h;ST.appendChild(b);setTimeout(()=>b.remove(),2200)}
function cnt(){if(!S.date)return'';const d=Math.round((Date.now()-new Date(S.date))/864e5);return '<div class=cnt>'+(d>=0?`<span data-n=${d}>${d}</span> ${esc(S.dl||'hari bersama')}`:`<span data-n=${-d}>${-d}</span> hari lagi`)+'</div>'}
const DON='https://sociabuzz.com/m_adnan/support';
const toN=()=>String(S.to||'').trim(),frN=()=>String(S.from||'').trim(),who=()=>frN()||S.title;
const ft=()=>(frN()||toN())?`<div class=cnt>${frN()?'dari '+esc(frN()):''}${frN()&&toN()?' · ':''}${toN()?'untuk '+esc(toN()):''}</div> `:'';
const dnH=()=>`<button class=dnb data-i=dn>Dukung</button><div class=dnm data-i=dnx><div class=dnc data-i=dnk><button class=dnq data-i=dnx aria-label="Tutup">×</button><small>dari yang bikin</small><h3>Traktir Adnan kopi</h3><p>Gratis dan dibuat sendiri. Dukungan kecil bantu aku terus update.</p><a class=dna data-i=dnl href="${DON}" target=_blank rel="noopener noreferrer">Dukung lewat Sociabuzz</a><em>made by adnan</em></div></div>`;
const hd=()=>`<h1>${sp(S.title,.2)}</h1>`+(S.sub?`<div class=cnt>${esc(S.sub)}</div> `:'')+ft()+cnt();
const urlOf=()=>'https://'+(String(S.title||'kita').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'kita')+'.love';

/* ---------- PEMBUKA ---------- */
function cvh(){const v=S.cvs,t=sp(S.title,.3),e=esc(S.title),qq=esc(S.cvt),c=`<div class="cv k-${v}${SW[v]?'':' gen'}">`,d=new Date(),tm=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2),url=urlOf();
 if(v==='letter')return c+`<div class=env><div class=lt><b>${e}</b><small>${toN()?'untuk '+esc(toN()):'untukmu'}</small></div><div class=ef></div><div class=fl></div><i class=sl2>♥</i></div><p>${qq}</p></div>`;
 if(v==='gift')return c+`<div class=gf><div class=lid>🎀</div><div class=bx></div></div><h2>${t}</h2><p>${qq}</p></div>`;
 if(v==='curtain')return c+`<div class=cl></div><div class=cr></div><h2 class=ct>${t}</h2><p class=ct>${qq}</p></div>`;
 if(v==='web')return c+`<div class=bw><div class=bb><i></i><i></i><i></i><span class=ub><span class=ty style="--n:${url.length}">${esc(url)}</span></span></div><div class=bc><h2>${e}</h2><p>${qq}</p><div class=ld><u></u></div></div></div></div>`;
 if(v==='lock')return c+`<div class=lk>🔒</div><div class=tm>${tm}</div><div class=dt>${esc(d.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long'}))}</div><div class=nt><small>sekarang</small><b>${esc(who())}</b><span>${qq}</span></div><div class=swp>geser untuk membuka ›</div></div>`;
 if(v==='chat')return c+`<div class=cx><div class=av>${esc(Array.from(who())[0]||'♥').toUpperCase()}</div><div><b>${esc(who())}</b><small>● online</small></div></div><div class=cm><div class=bu style="--d:.3s">${esc(S.ch1)}</div><div class=bu style="--d:1.1s">${esc(S.ch2)}</div><div class=rp style="--d:2.2s"><button class=qr data-c=reply>${esc(S.chr1)}</button><button class=qr data-c=reply>${esc(S.chr2)}</button></div></div><div class=cin><input class=cti type=text maxlength=60 placeholder="Ketik balasan…"><button class=snd data-c=send>➤</button></div></div>`;
 if(v==='tebak')return c+`<div class=qz><small>jawab dulu ya</small><h2>${esc(S.qq)}</h2>${[S.qa,S.qb,S.qc].filter(x=>x).map(x=>`<button class=qo data-c=pick>${esc(x)}</button>`).join('')}</div></div>`;
 if(v==='book')return c+`<div class=bk><div class=bkb></div><div class=bkc><h2>${t}</h2><small>${qq}</small></div></div></div>`;
 if(v==='balon')return c+`<div class=bl><i>🎈</i><u></u></div><h2>${t}</h2><p>${qq}</p></div>`;
 if(v==='gembok')return c+`<div class=gk>🔒</div><h2>${t}</h2>${pinOf()?`<p>${esc(S.pinh)}</p><div class=dots2>${'<i></i>'.repeat(pinOf().length)}</div><div class=kp>${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k=>k===''?'<span></span>':`<button data-c=key data-k="${k}">${k}</button>`).join('')}</div>`:`<p>${qq}</p><div class=sl><span>geser untuk membuka</span><b>›</b></div>`}</div>`;
 if(v==='polaroid')return c+`<div class=pl><div class=plp></div><p>${e}</p></div><p>${qq}</p></div>`;
 if(v==='vinyl')return c+`<div class=vn><b>♥</b></div><h2>${t}</h2><p>${qq}</p></div>`;
 if(v==='night')return c+`<div class=mo>🌙</div><h2>${t}</h2><p>${qq}</p></div>`;
 if(v==='ticket')return c+`<div class=tk><div class=tkm><small>${frN()?'tiket dari '+esc(frN()):'satu tiket untukmu'}</small><h2>${t}</h2><p>${qq}</p></div><div class=tks>♥</div></div></div>`;
 if(v==='neon')return c+`<h2 class=nn>${e}</h2><div class=pb>▶</div><small>${qq}</small></div>`;
 if(v==='glass')return c+`<i class=ab></i><i class=ab></i><i class=ab></i><div class=gc><small>${toN()?'UNTUK '+esc(toN()).toUpperCase():'UNTUK KAMU'}</small><h2>${e}</h2><p>${qq}</p><span class=gb>Buka</span></div></div>`;
 return c+`<i class=rg></i><i class=rg style="animation-delay:1.2s"></i><div class=hb>♥</div><h2>${t}</h2><p>${qq}</p></div>`}

/* ---------- AKHIR (beda tiap pembuka) ---------- */
function fin(hold,intro){
 const v=S.cvs||'heart',t=esc(S.title),m=String(S.msg||''),c=cnt(),ss=sents(m).slice(0,6);
 const cl=`fin f-${v}${hold?' hold':''}`;
 const _t=toN()?'untuk '+esc(toN()):'untukmu';
 const hint=(!L.length&&isEd())?'<div class=nohint>Belum ada foto. Tambah di tab Foto.</div>':'';
 const again=l=>`<button class=again data-a=again>${l}</button>`;
 let h='';
 if(v==='letter'){
  h=`<div class="${cl}" data-lp="0"><div class=evb></div><div class=pap>${lpap(0)}</div><div class=evf></div>${again('↻ Baca lagi')}</div>`}
 else if(v==='gift'){
  h=`<div class="${cl}"><div class=rays></div><div class=gt><small>${_t}</small><h1>${sp(S.title,.3)}</h1></div><div class=card><i class=hole></i><p class=msg>${sp(m,1.6,1,.035)}</p>${c}</div><div class=gbox data-i=gf><div class=glid>🎀</div><div class=gbd></div></div>${again('↻ Buka lagi')}</div>`}
 else if(v==='curtain'){
  h=`<div class="${cl}"><div class=spot></div><div class=floor></div><div class="dr dl"></div><div class="dr drr"></div><div class=val></div><div class=bill><small>${frN()?'DARI '+esc(frN()).toUpperCase():'KHUSUS MALAM INI'}</small><h1>${sp(S.title,1.2)}</h1><i class=dv></i><p class=msg>${sp(m,1.9,1,.035)}</p>${c}${again('🎟 Putar lagi')}</div></div>`}
 else if(v==='web'){
  h=`<div class="${cl}" data-p="0" data-e="${intro?'next':'again'}"><div class=bwf><div class=bb><i></i><i></i><i></i><span class=ub>🔒 <span class=uu>${esc(urlOf().replace('https://',''))}</span></span></div><div class=lb><u></u></div><div class=pg2>${wnav(0)}<div class=wbody>${wpage(0)}</div></div></div></div>`}
 else if(v==='lock'){
  const tm=new Date(),hh=('0'+tm.getHours()).slice(-2)+':'+('0'+tm.getMinutes()).slice(-2),ds=tm.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long'}),on=appsOn(),
  pb=(k,n,lb)=>`<button class=pi data-i=ap data-k=${k} style="--d:${(.2+n*.08).toFixed(2)}s"><i style="background:${APPS[k][2]}">${APPS[k][0]}${k==='msg'?'<em>1</em>':''}</i>${lb?'<span>'+APPS[k][1]+'</span>':''}</button>`;
  h=`<div class="${cl}" data-e="${intro?'next':'again'}"><div class=phs><span>${hh}</span><span class=bt2>5G ▂▄▆ 🔋</span></div><div class=phw><div class=phc>${hh}</div><div class=phd>${ds}</div><div class=phm>${esc(S.sub||'ketuk aplikasi untuk menjelajah')}</div></div><div class=pga>${on.filter(k=>!DOCK.includes(k)).map((k,n)=>pb(k,n,1)).join('')}</div>${again('↻')}<div class=dock>${DOCK.filter(k=>on.includes(k)).map((k,n)=>pb(k,n+5,0)).join('')}</div><div class=hbar data-i=ho></div><div class=apx></div></div>`}
 else if(v==='chat'){
  const B=bubs(),all=isEd()&&!play;
  h=`<div class="${cl}" data-cn="${all?B.length+1:0}" data-e="${intro?'next':'again'}"><div class=cx><div class=av>${esc(Array.from(who())[0]||'♥').toUpperCase()}</div><div><b>${esc(who())}</b><small>● online</small></div></div><div class=ms data-i=cn>${all?B.concat(0).map((_,k)=>cb(k)).join('')+'<div class=rd style="--rd:0s">Dibaca ✓✓</div>':''}</div>${all?'':'<div class=hn2>Ketuk buat bales ›</div>'}<div class=rb><span>Ketuk ➤ untuk lanjut…</span><button class=snd data-i=cn>➤</button></div></div>`}
 else if(v==='polaroid'){
  h=`<div class="${cl}"><h1>${sp(S.title,.3)}</h1><div class=plf>${L[0]?`<img src="${L[0].src}">`:'<div class=plp></div>'}<p class=msg>${sp(m,1,1,.04)}</p></div>${c}${again('↻ Foto lagi')}</div>`}
 else if(v==='book'){
  h=`<div class="${cl}"><h1>${sp(S.title,.3)}</h1><div class=bkp><p class=msg>${sp(m,1,1,.035)}</p>${c}</div>${again('↻ Baca lagi')}</div>`}
 else if(['vinyl','night','balon','gembok','tebak'].includes(v)){
  h=`<div class="${cl}">${v==='vinyl'?'<div class=vn><b>♥</b></div><small>lagi diputar</small>':`<div class=mo>${{night:'🌙',balon:'🎈',gembok:'🔓',tebak:'🎉'}[v]}</div>`}<h1>${sp(S.title,.3)}</h1><div class=ly>${ss.map((x,k)=>`<p style="--d:${(.8+k*.9).toFixed(2)}s">${esc(x)}</p>`).join('')}</div>${c}${again(v==='vinyl'?'↻ Putar lagi':'↻ Lihat lagi')}</div>`}
 else if(v==='ticket'){
  h=`<div class="${cl}"><div class=tkt data-i=tk><small>tiket kenangan · ${L.length} foto</small><h1>${sp(S.title,.4)}</h1><p class=msg>${sp(m,1.1,1,.035)}</p>${c}<i class=bar></i></div>${again('↻ Sobek lagi')}</div>`}
 else if(v==='neon'){
  h=`<div class="${cl}"><h1 class=nn>${t}</h1>${ss.length?'<div class=tube data-i=nz>'+ss.map((s,k)=>`<p style="--d:${(.6+k*.7).toFixed(2)}s">${esc(s)}</p>`).join('')+'</div>':''}<small>— selesai —</small><button class=pb data-a=again>↻</button></div>`}
 else if(v==='glass'){
  h=`<div class="${cl}"><i class=ab></i><i class=ab></i><i class=ab></i><div class=gc><small>${toN()?'UNTUK '+esc(toN()).toUpperCase():'PESAN UNTUKMU'}</small><h2>${sp(S.title,.3)}</h2><p class=msg>${wd(m)}</p>${c}<button class=gb data-a=again>↻ Ulangi</button></div></div>`}
 else{
  const fs=m.length>80?4.7:m.length>50?5.4:6.4,sub=S.sub?`<div class=cnt>${esc(S.sub)}</div>`:'';
  h=`<div class="${cl}"><div class=ht><h1>${sp(S.title,.4)}</h1>${sub}${ft()}${c}</div><svg class=hs viewBox="0 0 100 90"><path class=hp pathLength="100" d="M50 85C10 55 0 32 14 16 27 2 45 8 50 24 55 8 73 2 86 16 100 32 90 55 50 85Z"/></svg><div class=hm><p class=msg style="font-size:${fs}cqw">${sp(m||'♥',1.4,1,.04)}</p></div>${again('↻ Ulangi')}</div>`}
 let o=h.slice(0,-6)+hint+(intro?'':dnH())+'</div>';if(intro)o=o.replace(/data-a=again/g,'data-a=next').replace(/>↻ [^<]*</g,'>Lihat foto ›<').replace(/>↻</g,'>›<');return o}

const endc=hold=>`<div class="fin f-end${hold?' hold':''}"><h1>${sp(S.title,.2)}</h1><p class=msg>Segini dulu ya.</p>${ft()}${cnt()}<button class=again data-a=again>↻ Ulangi dari awal</button>${dnH()}</div>`;
const clo=hold=>(S.ord==='last'||!L.length||(isEd()&&!play))?fin(hold):endc(hold);
/* ---------- LAYOUT ---------- */
function scr(){return `<div class=sc><div class=top2>${hd()}<p class=hint>▼ geser ke bawah</p></div>`+L.map((p,k)=>`<figure class="si s${k%3}" style="--r:${(k*37)%7-3}deg"><img src="${p.src}">${p.cap?`<figcaption>${esc(p.cap)}</figcaption>`:''}</figure>`).join('')+`<div class=fw>${clo(true)}</div></div><div class=sbar><u></u></div>`}
function initSc(c){const sc=c.querySelector('.sc'),bar=c.querySelector('.sbar u');let tch=0;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;if(el.classList.contains('si'))el.classList.add('in');if(el.classList.contains('hold')){el.classList.remove('hold');if(play)burst(18)}}),{root:sc,threshold:.35});
 sc.querySelectorAll('.si,.fin.hold').forEach(x=>io.observe(x));
 const up=()=>{bar.style.height='18%';bar.style.top=sc.scrollTop/Math.max(1,sc.scrollHeight-sc.clientHeight)*82+'%'};sc.addEventListener('scroll',up);up();
 ['pointerdown','wheel','touchstart'].forEach(n=>sc.addEventListener(n,()=>{tch=1}));
 if(play&&opened)AS=setInterval(()=>{if(!tch&&sc.scrollTop<sc.scrollHeight-sc.clientHeight-1)sc.scrollTop+=2},30)}
function place(){const n=L.length,j=i%n;ST.querySelectorAll('.cd').forEach((el,k)=>{const p=(k-j+n)%n,r=((k*47)%11-5);el.style.zIndex=n-p;el.style.opacity=p>3?0:1;el.style.transform=`translate(${p*2.5}cqw,${-p*2}cqw) rotate(${r+p*2}deg) scale(${1-p*.05})`})}

function paint(){phClean();
 const t=S.t,v={'--sb':t.bg,'--sb2':t.bg2,'--si':t.ink,'--sa':t.ac,'--f':F[S.font]||F.script,'--lv':S.level/100,'--sec':S.sec+'s','--flt':FL[S.flt]||'none','--fit':S.fit==='contain'?'contain':'cover','--zm':(S.zm||100)/100};
 for(const k in v)APP.style.setProperty(k,v[k]);
 ST.className='stage fr-'+S.frm;
 L=S.photos.slice(0,S.max);SL=L.concat([{end:1}]);
 const n=Math.round(S.level/5),fm=FXM[S.fx],ch=fm&&fm[0];let h='<div class=c></div><div class=fxl>';
 if(ch)for(let k=0;k<n;k++)h+=`<i class="${fm[1]==1?'dn':fm[1]==2?'tw':''}" style="${fm[1]==2?'top:'+((k*29+7)%90)+'%;bottom:auto;':''}left:${(k*37+9)%96}%;font-size:${3+(k*7)%5}cqw;animation-duration:${7+(k*1.7)%7}s;animation-delay:-${(k*1.9)%9}s">${ch}</i>`;
 h+='</div>'+ovl();if(!opened){const a=man()?'':(SW[S.cvs]||[0,0,0,'↑'])[3];h+=cvh().replace(/<\/div>$/,(a?`<i class=swh>${a}</i>`:'')+'</div>')}
 ST.innerHTML=h;if(opened)show();else{clearTimeout(T);clearInterval(AS);ST.classList.toggle('still',isEd()&&!play)}}
function show(){
 clearTimeout(T);clearInterval(AS);
 const c=q('.c');if(!c)return;
 const m=S.layout;let h='',s=null;
 if(pre)h=fin(false,true);
 else if(forceEnd)h=clo(false);
 else if(m==='story'||!L.length){
  i=Math.min(i,SL.length-1);s=SL[i];
  if(s.end)h=clo(false);
  else{
   h='<div class=pg>'+SL.map((x,k)=>`<u class="${k<i||(k==i&&!play)?'d':k==i?'a':''}" style="animation-duration:${S.sec}s"></u>`).join('')+'</div>';
   h+=`<img class="kb${S.mot==='off'?'':' kb'+i%2}" src="${s.src}"><div class=sh></div><div class=top>${hd()}</div><div class=cap style="font-size:${(s.cap||'').length>90?4.6:(s.cap||'').length>50?5.6:7}cqw">${wd(s.cap)}</div>`+(play&&S.trn!=='none'?`<div class="wipe${S.trn==='fd'?' fd':''}"></div>`:'')}
  if(play&&opened&&!s.end)T=setTimeout(()=>{i++;show()},S.sec*1000)}
 else if(m==='scroll')h=scr();
 else if(m==='card')h=`<div class=top>${hd()}</div><div class=cards>${L.map(p=>`<figure class=cd><img src="${p.src}"><p>${esc(p.cap)}</p></figure>`).join('')}</div><div class=bt><span class=pillh>Ketuk kartunya</span></div>`;
 else if(m==='film'){const b=[];while(b.length<4)b.push(...L);const f=b.concat(b).map(p=>`<figure class=ff><img src="${p.src}"><p>${esc(p.cap)}</p></figure>`).join('');h=`<div class=top>${hd()}</div><div class=fm><div class=ft style="--n:${b.length}">${f}</div></div><div class=bt><span class=pillh>Ketuk buat lanjut</span></div>`}
 else{const r=Math.ceil(L.length/2);h=`<div class=top>${hd()}</div><div class=gr style="grid-template-columns:repeat(${L.length==1?1:2},1fr);grid-auto-rows:${Math.min(36,112/r).toFixed(1)}cqw">${L.map((p,k)=>{const d=(k*.12).toFixed(2);return `<figure class=gi style="animation-delay:${d}s,${(+d+.6)}s"><img src="${p.src}"><figcaption>${esc(p.cap)}</figcaption></figure>`}).join('')}</div><div class=bt><span class=pillh>Ketuk buat lanjut</span></div>`}
 ST.classList.toggle('still',isEd()&&!play);
 c.innerHTML=h;c.querySelectorAll('[data-n]').forEach(count);
 fitMsg(c);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>fitMsg(c));const b2=c.querySelector('.bt2');if(b2&&navigator.getBattery)navigator.getBattery().then(b=>{b2.textContent='5G ▂▄▆ 🔋'+Math.round(b.level*100)+'%'}).catch(()=>{});
 const cf=c.querySelector('.f-chat[data-cn="0"]');if(cf&&play)setTimeout(()=>{if(cf.isConnected)chatNext(cf)},900);
 if(!forceEnd&&!pre){if(m==='scroll'&&L.length)initSc(c);if(m==='card'&&L.length)place()}
 if(play&&((s&&s.end)||forceEnd))burst(18)}

const TT=['Beranda','Cerita','Kenangan','Untukmu','Penutup','Terakhir'],pt=k=>TT[Math.min(k,5)],slg=k=>k?pt(k).toLowerCase():'';
const bubs=()=>S.bub&&S.bub.length?S.bub:sents(S.msg).slice(0,8);
const wps=()=>S.wp&&S.wp.length?S.wp:(sents(S.msg).slice(0,5).length?sents(S.msg).slice(0,5):[S.msg||'♥']);
const APPS={tel:['📞','Telepon','#34c759'],msg:['💬','Pesan','#2fc96b'],cam:['📷','Kamera','#8e8e93'],gal:['🖼','Galeri','#2fb5e8'],mus:['🎵','Musik','#ff375f'],web:['🌐','Web','#4f7cff'],note:['📝','Catatan','#f5a623'],cal:['📅','Kalender','#ff5a5f'],set:['⚙️','Pengaturan','#636366']};
const DOCK=['tel','web','cam','mus'],TR=[['box','Music Box'],['soft','Lembut'],['love','Romantis']];
const appsOn=()=>(S.apps&&S.apps.length?Object.keys(APPS).filter(k=>S.apps.includes(k)):Object.keys(APPS));
const lpg=m=>{const w=String(m||'').split(/\s+/).filter(Boolean),P=[];let c='';w.forEach(x=>{if((c+' '+x).length>150&&c){P.push(c);c=x}else c=c?c+' '+x:x});if(c)P.push(c);return P.length?P:['']};
const lpap=k=>{const PG=lpg(S.msg),last=k>=PG.length-1,e1=.6+PG[k].length*.04;return `<p class=to>${sp(k?'…lanjutan':(toN()?'Untuk '+toN()+',':'Untukmu,'),.3,1,.06)}</p><p class=bd>${sp(PG[k],.9,1,.04)}</p>`+(last?`<p class=sg>${sp('— '+who(),e1+.9,1,.06)}</p>${cnt()}<i class=seal style="animation-delay:${(e1+1.8).toFixed(2)}s">♥</i>`:`<button class=nxp data-i=lp>Lembar berikutnya ›</button><small class=pgn>${k+1}/${PG.length}</small>`)};
const normU=v=>{v=String(v||'').trim();if(!v)return'';if(/^(https?:)?\/\//i.test(v))v=v.replace(/^\/\//,'https://');else if(/^[^\s\/]+\.[a-z]{2,}([\/:?#]|$)/i.test(v)||/^localhost[:\/]/i.test(v))v='https://'+v;else return 'https://id.wikipedia.org/w/index.php?search='+encodeURIComponent(v);
 const m=v.match(/^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/i);if(m)return 'https://www.youtube.com/embed/'+m[1];
 const g=v.match(/^https?:\/\/(?:www\.)?google\.[a-z.]+\/search\?(?:[^#]*&)?q=([^&#]+)/i);if(g)return 'https://id.wikipedia.org/w/index.php?search='+g[1];return v};
const BLK=/^https?:\/\/([\w-]+\.)*(google|facebook|instagram|twitter|x|tiktok|whatsapp|netflix|spotify|linkedin|github|reddit|pinterest|discord|telegram|t|bing|duckduckgo|tokopedia|shopee|gmail|outlook|live|microsoft|apple|amazon|paypal|openai|chatgpt|claude|anthropic)\.(com|co|me|org|net|ai|id|be)(\/|$|:|\?)/i;
const rd=(f,cb)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.8))};im.src=r.result};r.readAsDataURL(f)};
const cb=k=>{const B=bubs();return k<B.length?`<div class=bu style="--d:0s" data-i=rx>${esc(B[k])}</div>`:`<div class="bu ac" style="--d:0s" data-i=rx>— ${esc(who())}</div>`};
const wnav=k=>`<div class=nv><b>♥ ${esc(S.title)}</b><span>${wps().map((_,j)=>`<a class="${j==k?'on':''}" data-i=wg data-k=${j}>${pt(j)}</a>`).join('')}</span></div>`;
const wpage=k=>{const P=wps(),last=k>=P.length-1,dd=S.date?Math.round((Date.now()-new Date(S.date))/864e5):null;
 const stats=k?'':`<div class=stt><div><b>${L.length}</b><small>foto</small></div>`+(dd!==null?`<div><b data-n="${Math.abs(dd)}">${Math.abs(dd)}</b><small>${dd>=0?esc(S.dl||'hari bersama'):'hari lagi'}</small></div>`:'')+'<div><b>∞</b><small>kenangan</small></div></div>';
 return `<div class="hero wsl"><small class=bdg>● ${k?pt(k):S.sub?esc(S.sub):'Lagi online'}</small><h1>${k?pt(k):sp(S.title,.2)}</h1><p class=msg>${sp(P[k],.3,1,.03)}</p><div class=ctr><button class=cta data-i=${last?'wr':'wn'}>${last?'↻ Ulangi':'Lanjut ›'}</button><span class=cta2 data-i=wh>♥ Suka</span>${k?'':'<svg class=cur viewBox="0 0 24 24"><path d="M5 3l14 8-6 2 4 7-3 1-4-7-5 4z"/></svg>'}</div></div>${stats}<div class=wdots>${P.map((_,j)=>`<i class="${j==k?'on':''}"></i>`).join('')}</div>`};
const calH=(y,m)=>{const f=new Date(y,m,1),n=new Date(y,m+1,0).getDate(),sd=S.date?S.date.split('-').map(Number):null,td=new Date();let c='';for(let k=0;k<f.getDay();k++)c+='<i></i>';for(let d=1;d<=n;d++){const a=sd&&sd[2]===d&&sd[1]-1===m,b=td.getDate()===d&&td.getMonth()===m&&td.getFullYear()===y;c+=`<b class="${b?'td2':''}${a?' sd':''}">${d}${a?'♥':''}</b>`}
 return `<div class=cmh><button data-i=cm data-d=-1>‹</button><span>${f.toLocaleDateString('id-ID',{month:'long',year:'numeric'})}</span><button data-i=cm data-d=1>›</button></div><div class=cg><u>M</u><u>S</u><u>S</u><u>R</u><u>K</u><u>J</u><u>S</u>${c}</div>`};
const allPh=()=>L.concat(shots.map(src=>({src,cap:'📷'})));
const appHtml=k=>{const P=APPS[k],hd=`<div class=aph style="background:${P[2]}"><span data-i=ho>‹</span>${P[0]} ${P[1]}</div>`,dd=S.date?Math.round((Date.now()-new Date(S.date))/864e5):null;
 if(k==='tel')return hd+`<div class="apb tl"><div class=nm data-v="">&nbsp;</div><div class=kp2>${[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(x=>`<button data-i=dk data-k="${x}">${x}</button>`).join('')}</div><div class=cr2><button class=call data-i=cl>📞</button><button class=del data-i=dd>⌫</button></div><div class=ctc data-i=cl data-c=1><i>♥</i><span>${esc(who())}</span><small>favorit</small></div></div>`;
 if(k==='msg')return hd+`<div class=apb>${bubs().map((x,n)=>`<div class=bu style="--d:${(.3+n*.9).toFixed(2)}s">${esc(x)}</div>`).join('')}<div class="bu ac" style="--d:${(.3+bubs().length*.9).toFixed(2)}s">— ${esc(who())}</div></div><div class=cin2><input class=cti2 type=text maxlength=200 placeholder="Ketik pesan…"><button class=snd2 data-i=ms>➤</button></div>`;
 if(k==='cam')return hd+`<div class="apb cm2"><video class=vid autoplay playsinline muted></video><div class=cmm>Mengaktifkan kamera…</div><div class=fl2x></div><div class=zmb></div><label class="abt cfb">📷 Pakai kamera bawaan<input class=cmi type=file accept="image/*" capture="environment" hidden></label><div class=shr><div class=tn>${shots.length?`<img src="${shots[shots.length-1]}">`:''}</div><button class=sht data-i=sh></button><button class=flp data-i=fp>⟲</button></div></div>`;
 if(k==='gal'){const A=allPh();return hd+`<div class="apb gg">${A.length?A.map((p,n)=>`<figure data-i=zm style="--d:${(n*.06).toFixed(2)}s"><img src="${p.src}"><figcaption>${esc(p.cap)}</figcaption></figure>`).join(''):'<p class=msg>Belum ada foto.</p>'}</div>`}
 if(k==='mus')return hd+`<div class="apb ms2"><div class=disc>♥</div><div class=np>Pilih lagu</div><div class=eq><i></i><i></i><i></i><i></i><i></i></div><div class=mc><button data-i=pv>⏮</button><button class=pp data-i=pp>▶</button><button data-i=nx>⏭</button></div>${TR.map(t=>`<button class=tr data-i=tr data-k=${t[0]}>${t[1]}<span>♪</span></button>`).join('')}<label class=abt>＋ Putar lagu dari ponsel<input class=aui type=file accept="audio/*" hidden></label></div>`;
 if(k==='web'){const u=normU(S.url)||'https://id.wikipedia.org';return hd+`<div class="apb wb"><div class=ab2><input class=url type=text value="${esc(u)}"><button class=abt data-i=wgo>Buka</button></div><div class=bk2>${[['Wikipedia','https://id.wikipedia.org'],['Peta','https://www.openstreetmap.org/export/embed.html'],['Cuaca','https://wttr.in'],['YouTube','https://www.youtube.com/embed?listType=search&list=lagu+romantis'],['Google','https://www.google.com'],['Instagram','https://www.instagram.com'],['TikTok','https://www.tiktok.com']].map(x=>`<button data-i=wbk data-u="${x[1]}">${x[0]}</button>`).join('')}</div><iframe class=fr src="${esc(u)}" allow="fullscreen; autoplay; encrypted-media; picture-in-picture; clipboard-write; geolocation; microphone; camera" allowfullscreen sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-presentation allow-top-navigation-by-user-activation" referrerpolicy="no-referrer"></iframe><div class=wnote hidden></div><a class="abt ext" target=_blank rel=noopener href="${esc(u)}">↗ Buka di tab baru (kalau halaman kosong)</a></div>`}
 if(k==='note')return hd+`<div class=apb><textarea class=nt placeholder="Tulis catatanmu di sini…"></textarea>${L.filter(p=>p.cap).slice(0,5).map((p,n)=>`<label class=ck style="--d:${(.3+n*.2).toFixed(2)}s" data-i=ck><i>✓</i>${esc(p.cap)}</label>`).join('')}</div>`;
 if(k==='set'){const A=allPh().slice(0,8);return hd+`<div class="apb st"><label>🔊 Volume<input type=range min=0 max=100 value=${Math.round(VOL*100)} data-i=sv></label><label>🔇 Bisukan suara<input type=checkbox data-i=sm ${muted?'checked':''}></label><label>☀ Kecerahan<input type=range min=40 max=100 value=100 data-i=sb></label><label>🌙 Mode terang<input type=checkbox data-i=sl></label><small>Wallpaper</small><div class=wl><button data-i=wp2 data-k=-1></button>${A.map((p,n)=>`<button data-i=wp2 data-k=${n} style="background-image:url('${p.src}')"></button>`).join('')}</div><button class=abt data-i=vb>📳 Tes getar</button></div>`}
 const d=new Date();return hd+`<div class=apb><div class=cmw data-y=${d.getFullYear()} data-m=${d.getMonth()}>${calH(d.getFullYear(),d.getMonth())}</div>${dd===null?'':`<div class=big data-n="${Math.abs(dd)}">${Math.abs(dd)}</div><p class=msg>${dd>=0?esc(S.dl||'hari bersama'):'hari lagi'} ♥</p>`}</div>`};
function camStartW(f,id){const w=WD,v=f.querySelector('.vid');v.classList.add('bk');if(w)w.on=!!id;camStart(f,'environment',id||undefined);if(w){WD=w;w.on=!!id}}
function stopCam(){if(CAM){CAM.getTracks().forEach(t=>t.stop());CAM=null}CTR=null;ZH=null;ZC=1;ZD=0}
function phClean(){stopCam();if(AUD){AUD.pause();AUD=null}clearTimeout(CT);clearInterval(CI);MK='';MP=false}
function phBack(f){callEnd(f);stopCam();f.classList.remove('app')}
function callEnd(f){clearTimeout(CT);clearInterval(CI);const c=f.querySelector('.cll');if(c)c.remove()}
function callStart(f,name){f.querySelector('.apx').insertAdjacentHTML('beforeend',`<div class=cll><div class=av2>♥</div><h2>${esc(name)}</h2><p class=cs>Memanggil…</p><button class=end data-i=ce>✕</button></div>`);try{navigator.vibrate&&navigator.vibrate([200,150,200])}catch(_){}
 CT=setTimeout(()=>{const p=f.querySelector('.cs');if(!p)return;let n=0;p.textContent='Tersambung 00:00';CI=setInterval(()=>{n++;p.textContent='Tersambung '+('0'+(n/60|0)).slice(-2)+':'+('0'+n%60).slice(-2)},1000)},2800)}
function zLv(){const out=[];if(ZH){[.5,1,2,3,5,10].forEach(z=>{if(z>=ZH.min-.001&&z<=ZH.max+.001)out.push(z)});if(ZH.min<1&&!out.includes(ZH.min)&&ZH.min>.2)out.unshift(+ZH.min.toFixed(1))}else[1,2,3,5].forEach(z=>out.push(z));return out}
function zRange(){return ZH?[ZH.min,Math.min(ZH.max,10)]:[1,5]}
function zSet2(f,z){const r=zRange();z=Math.max(r[0],Math.min(r[1],z));ZC=z;const v=f.querySelector('.vid');if(ZH&&CTR){ZD=0;v.style.setProperty('--z',1);CTR.applyConstraints({advanced:[{zoom:z}]}).catch(()=>{})}else{ZD=z;v.style.setProperty('--z',z)}const sm=f.querySelector('.zmb small');if(sm)sm.textContent=z.toFixed(1)+'×'+(ZH?'':' · digital');f.querySelectorAll('.zlv button[data-z]').forEach(b=>b.classList.toggle('on',Math.abs(+b.dataset.z-z)<.06))}
function zUI(f){const bar=f.querySelector('.zmb');if(!bar)return;const r=zRange(),lv=zLv();
 bar.innerHTML=`<div class=zlv>${WD?`<button data-i=zw class="${WD.on?'on':''}">0.5×</button>`:''}${lv.map(z=>`<button data-i=zc data-z=${z} class="${!(WD&&WD.on)&&Math.abs(z-ZC)<.06?'on':''}">${z}×</button>`).join('')}</div><input class=zsl type=range data-i=zs min=${r[0]} max=${r[1]} step=.05 value=${ZC}><small>${ZC.toFixed(1)}×${ZH?'':' · digital'}</small>`}
function zSet(f,z){const r=zRange();z=Math.max(r[0],Math.min(r[1],z));ZC=z;const v=f.querySelector('.vid');
 if(ZH&&CTR){ZD=0;v.style.setProperty('--z',1);CTR.applyConstraints({advanced:[{zoom:z}]}).catch(()=>{ZH=null;ZD=1;v.style.setProperty('--z',z)})}
 else{ZD=z;v.style.setProperty('--z',z)}
 zUI(f)}
function zSetup(f,st){CTR=st.getVideoTracks()[0];let cp={};try{cp=CTR.getCapabilities?CTR.getCapabilities():{}}catch(_){}
 ZH=cp.zoom&&cp.zoom.max>cp.zoom.min?{min:cp.zoom.min,max:cp.zoom.max}:null;ZC=1;ZD=0;
 if(ZH){try{ZC=Math.max(ZH.min,Math.min(ZH.max,CTR.getSettings().zoom||1))}catch(_){}}
 const v=f.querySelector('.vid');if(v)v.style.setProperty('--z',1);
 zUI(f);
 if(!(ZH&&ZH.min<1)&&navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices&&!f.querySelector('.vid.bk')===false){
  navigator.mediaDevices.enumerateDevices().then(ds=>{const w=ds.find(d=>d.kind==='videoinput'&&/ultra|0[.,]5|wide/i.test(d.label)&&!/front|user|depan/i.test(d.label));if(w&&f.isConnected&&!WD){WD={id:w.deviceId,on:false};zUI(f)}}).catch(()=>{})}}
function camStart(f,mode,dev){const v=f.querySelector('.vid'),m=f.querySelector('.cmm');stopCam();
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){m.textContent='Kamera langsung tidak tersedia di sini. Pakai tombol “kamera bawaan”.';return}
 navigator.mediaDevices.getUserMedia({video:dev?{deviceId:{exact:dev}}:{facingMode:mode}}).then(st=>{if(!v.isConnected){st.getTracks().forEach(t=>t.stop());return}CAM=st;v.srcObject=st;if(m.isConnected)m.remove();const w=WD;zSetup(f,st);if(w&&dev===w.id){WD=w;w.on=true;ZC=1;zUI(f)}else if(w&&mode==='environment')WD=w}).catch(()=>{if(m.isConnected)m.textContent='Izin kamera ditolak atau tidak tersedia. Pakai tombol “kamera bawaan” di atas.'})}
function musUI(f){const x=f.querySelector('.ms2');if(!x)return;x.querySelectorAll('.disc,.eq').forEach(e=>e.classList.toggle('pl',MP));x.querySelector('.pp').textContent=MP?'⏸':'▶';x.querySelectorAll('.tr').forEach(b=>b.classList.toggle('on',b.dataset.k===MK&&!AUD));x.querySelector('.np').textContent=AUD?(f.dataset.tn||'Lagu dari ponsel'):(MK?TR.find(t=>t[0]===MK)[1]:'Pilih lagu')}
function playTr(f,key){if(AUD){AUD.pause();AUD=null}MK=key;mi=0;MP=true;music(1);musUI(f)}
function webGo2(f,u){const i=f.querySelector('.url');u=normU(u||i.value);if(!u)return;i.value=u;const n=f.querySelector('.wnote'),fr=f.querySelector('.fr');f.querySelector('.ext').href=u;
 if(BLK.test(u)){fr.src='about:blank';n.hidden=false;n.textContent='Situs ini nggak mengizinkan dibuka di dalam halaman, jadi dibuka di tab baru.';try{window.open(u,'_blank','noopener,noreferrer')}catch(_){}return}
 n.hidden=true;fr.src=u}
ST.addEventListener('input',e=>{const t=e.target,k=t.dataset&&t.dataset.i;if(k==='sv'){VOL=t.value/100;if(AUD)AUD.volume=VOL}else if(k==='sb')t.closest('.fin').style.filter='brightness('+t.value/100+')';else if(k==='zs'){const f=t.closest('.fin');ZC=+t.value;const bt=f.querySelector('.zmb small');zSet2(f,ZC)}});
ST.addEventListener('change',e=>{const t=e.target,f=t.closest&&t.closest('.fin'),k=t.dataset&&t.dataset.i;if(!f)return;
 if(k==='sm'){muted=t.checked;if(AUD)AUD.muted=muted;if(muted)music(0);else if(MP&&!AUD)music(1)}
 else if(k==='sl')f.classList.toggle('lgt',t.checked);
 else if(t.classList.contains('cmi')&&t.files[0])rd(t.files[0],src=>{shots.push(src);const tn=f.querySelector('.tn');if(tn)tn.innerHTML=`<img src="${src}">`});
 else if(t.classList.contains('aui')&&t.files[0]){music(0);MK='';if(AUD)AUD.pause();AUD=new Audio(URL.createObjectURL(t.files[0]));AUD.loop=true;AUD.volume=VOL;AUD.muted=muted;AUD.play().catch(()=>{});MP=true;f.dataset.tn=t.files[0].name;musUI(f)}});
ST.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const t=e.target;if(t.matches&&t.matches('.url'))ix(t.parentNode.querySelector('[data-i=wgo]'),e);else if(t.matches&&t.matches('.cti2'))ix(t.parentNode.querySelector('[data-i=ms]'),e)});
function fitMsg(c){c.querySelectorAll('.fin .msg').forEach(m=>{const f=m.closest('.fin');if(!f||m.closest('.apx'))return;const a=f.querySelector('.gbox,.again'),lim=a?a.getBoundingClientRect().top:f.getBoundingClientRect().bottom-10;let fs=parseFloat(getComputedStyle(m).fontSize);for(let n=0;n<12&&m.getBoundingClientRect().bottom>lim-4&&fs>9;n++){fs*=.92;m.style.fontSize=fs+'px'}})}
function spark(e){const r=ST.getBoundingClientRect(),x=e&&e.clientX!=null?e.clientX-r.left:r.width/2,y=e&&e.clientX!=null?e.clientY-r.top:r.height/2,ch=(FXM[S.fx]||['♥'])[0]||'♥';let h='';for(let k=0;k<7;k++){const a=k/7*6.283+Math.random(),d=40+Math.random()*50;h+=`<span class=tpk style="left:${x}px;top:${y}px;--dx:${(Math.cos(a)*d).toFixed(0)}px;--dy:${(Math.sin(a)*d-20).toFixed(0)}px;font-size:${12+k%3*5}px">${ch}</span>`}const b=document.createElement('div');b.className='bsl';b.innerHTML=h;ST.appendChild(b);setTimeout(()=>b.remove(),900)}
function chatNext(f){const ms=f.querySelector('.ms'),n=+f.dataset.cn,tot=bubs().length+1;if(!ms||f.dataset.b==='1'||n>=tot)return;f.dataset.b='1';const hn=f.querySelector('.hn2');if(hn)hn.remove();
 ms.insertAdjacentHTML('beforeend','<div class="bu tp"><span class=dots style="position:static;animation:none;display:flex;gap:1.2cqw;padding:1.4cqw 1cqw"><i></i><i></i><i></i></span></div>');ms.scrollTop=1e5;
 setTimeout(()=>{const t=ms.querySelector('.tp');if(t)t.remove();ms.insertAdjacentHTML('beforeend',cb(n));f.dataset.cn=n+1;f.dataset.b='0';ms.scrollTop=1e5;
  if(n+1>=tot){ms.insertAdjacentHTML('beforeend','<div class=rd style="--rd:.5s">Dibaca ✓✓</div>');const b=f.querySelector('.snd');if(b){b.removeAttribute('data-i');b.dataset.a=f.dataset.e;b.textContent='↻'}}},650)}
function webGo(f,k){const P=wps();k=Math.max(0,Math.min(P.length-1,k));if(f.dataset.l==='1'||k==+f.dataset.p)return;f.dataset.l='1';f.classList.add('ld2');
 setTimeout(()=>{f.dataset.p=k;f.querySelector('.nv').outerHTML=wnav(k);const wb=f.querySelector('.wbody');wb.innerHTML=wpage(k);wb.querySelectorAll('[data-n]').forEach(count);f.querySelector('.uu').textContent=urlOf().replace('https://','')+'/'+slg(k);f.classList.remove('ld2');f.dataset.l='0'},450)}
function doA(k){if(k==='again')replay();else if(k==='next'){pre=false;i=0;ci=0;forceEnd=false;paint()}}
function ix(el,e){const k=el.dataset.i,f=el.closest('.fin');
 if(k==='cn')chatNext(f);
 else if(k==='rx'){const x=el.querySelector('.rx');if(x)x.remove();else el.insertAdjacentHTML('beforeend','<i class=rx>❤️</i>');spark(e)}
 else if(k==='wg')webGo(f,+el.dataset.k);
 else if(k==='wn')webGo(f,+f.dataset.p+1);
 else if(k==='wr')doA(f.dataset.e);
 else if(k==='wh'){el.classList.toggle('lk');el.textContent=el.classList.contains('lk')?'♥ Disukai':'♥ Suka';spark(e)}
 else if(k==='ap'){const a=el.dataset.k;f.querySelector('.apx').innerHTML=appHtml(a);f.querySelectorAll('.apx [data-n]').forEach(count);f.classList.add('app');spark(e);if(a==='cam')camStart(f,'user');if(a==='mus'){if(!MK&&!AUD&&S.mus!=='none'){MK=S.mus;MP=!muted}musUI(f)}}
 else if(k==='ho')phBack(f);
 else if(k==='zm')el.classList.toggle('zm');
 else if(k==='ck'){el.classList.toggle('dn2');spark(e)}
 else if(k==='gf'){el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');spark(e);burst(14)}
 else if(k==='nz')f.classList.toggle('off');
 else if(k==='lp'){const n=+f.dataset.lp+1,old=f.querySelector('.pap'),nw=old.cloneNode(false);nw.classList.remove('fly');nw.innerHTML=lpap(n);f.dataset.lp=n;old.classList.add('fly');old.after(nw);setTimeout(()=>old.remove(),650);spark(e)}
 else if(k==='dk'){const n=f.querySelector('.nm');n.dataset.v=(n.dataset.v+el.dataset.k).slice(0,15);n.textContent=n.dataset.v}
 else if(k==='dd'){const n=f.querySelector('.nm');n.dataset.v=n.dataset.v.slice(0,-1);n.innerHTML=n.dataset.v||'&nbsp;'}
 else if(k==='cl'){const n=f.querySelector('.nm').dataset.v;if(el.dataset.c)callStart(f,who());else if(n)callStart(f,n)}
 else if(k==='ce')callEnd(f);
 else if(k==='sh'){const v=f.querySelector('.vid');if(!v||!v.videoWidth)return;const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;const x=c.getContext('2d');if(!v.classList.contains('bk')){x.translate(c.width,0);x.scale(-1,1)}if(ZD>1){const sw=c.width/ZD,sh=c.height/ZD;x.drawImage(v,(c.width-sw)/2,(c.height-sh)/2,sw,sh,0,0,c.width,c.height)}else x.drawImage(v,0,0);const src=c.toDataURL('image/jpeg',.8);shots.push(src);f.querySelector('.tn').innerHTML=`<img src="${src}">`;const fl=f.querySelector('.fl2x');fl.classList.remove('go');void fl.offsetWidth;fl.classList.add('go');try{navigator.vibrate&&navigator.vibrate(30)}catch(_){}}
 else if(k==='fp'){const v=f.querySelector('.vid');v.classList.toggle('bk');WD=null;camStart(f,v.classList.contains('bk')?'environment':'user')}
 else if(k==='zc')zSet(f,+el.dataset.z)
 else if(k==='zw'){if(WD){const o=WD.on;if(o)WD.on=false;camStartW(f,o?null:WD.id)}}
 else if(k==='tr')playTr(f,el.dataset.k);
 else if(k==='pp'){if(MP){music(0);if(AUD)AUD.pause();MP=false}else{if(AUD)AUD.play();else{MK=MK||'love';mi=0;music(1)}MP=true}musUI(f)}
 else if(k==='pv'||k==='nx'){const ks=TR.map(t=>t[0]);playTr(f,ks[(ks.indexOf(MK)+(k==='nx'?1:ks.length-1))%ks.length])}
 else if(k==='wgo')webGo2(f);
 else if(k==='wbk')webGo2(f,el.dataset.u);
 else if(k==='ms'){const inp=f.querySelector('.cti2'),t=inp.value.trim();if(!t)return;const th=f.querySelector('.apb');inp.value='';th.insertAdjacentHTML('beforeend',`<div class="bu me" style="--d:0s">${esc(t)}</div>`);th.scrollTop=1e5;
  setTimeout(()=>{if(th.isConnected){th.insertAdjacentHTML('beforeend','<div class="bu tp"><span class=dots style="position:static;animation:none;display:flex;gap:1.2cqw;padding:1.4cqw 1cqw"><i></i><i></i><i></i></span></div>');th.scrollTop=1e5}},500);
  setTimeout(()=>{if(!th.isConnected)return;const x=th.querySelector('.tp');if(x)x.remove();const R=['Hehe','Aku juga','Makasih ya','Iya, iya','Wkwk'];th.insertAdjacentHTML('beforeend',`<div class=bu style="--d:0s">${R[Math.random()*R.length|0]}</div>`);th.scrollTop=1e5;spark(null)},1700)}
 else if(k==='cm'){const w=f.querySelector('.cmw');let y=+w.dataset.y,m=+w.dataset.m+ +el.dataset.d;if(m<0){m=11;y--}if(m>11){m=0;y++}w.dataset.y=y;w.dataset.m=m;w.innerHTML=calH(y,m)}
 else if(k==='vb'){try{navigator.vibrate&&navigator.vibrate([60,40,60])}catch(_){}spark(e)}
 else if(k==='wp2'){const n=+el.dataset.k,A=allPh();f.style.background=n<0?'':`linear-gradient(#0005,#000a),url("${A[n].src}") center/cover`}
 else if(k==='dn'){const m=f.querySelector('.dnm');if(m)m.classList.add('on')}
 else if(k==='dnx'){const m=f.querySelector('.dnm');if(m)m.classList.remove('on')}
 else if(k==='dnk'||k==='dnl'){}
 else if(k==='tk'){if(!el.querySelector('.stm'))el.insertAdjacentHTML('beforeend','<i class=stm>KENANGAN</i>');spark(e)}}

function openNow(cv){
 cv=cv||q('.cv');if(!cv||cv.classList.contains('op'))return;
 const hz=S.cvs==='heart';
 try{navigator.vibrate&&navigator.vibrate([25,70,25])}catch(e){}
 cv.classList.add('op');
 if(hz)cv.classList.add('out');else setTimeout(()=>cv.classList.add('out'),S.cvs==='letter'?1200:1000);
 mi=0;music(1);
 setTimeout(()=>{opened=true;play=true;i=0;ci=0;forceEnd=false;pre=S.ord!=='last'&&L.length>0;paint();burst(16)},hz?480:S.cvs==='letter'?1650:1500)}
function replay(){music(0);clearTimeout(T);clearInterval(AS);opened=false;play=false;forceEnd=false;pre=false;i=0;ci=0;paint()}

ST.addEventListener('click',e=>{
 const cv=q('.cv');if(cv){const b=e.target.closest('[data-c]');if(b){cAct(b,cv);return}if(!man()&&!dgd)openNow(cv);return}
 if(swd)return;
 const ixe=e.target.closest('[data-i]');if(ixe){ix(ixe,e);return}
 if(e.target.closest('.fin')&&!e.target.closest('[data-a],input,textarea,label,iframe'))spark(e);
 const a=e.target.closest('[data-a]');
 if(a){const k=a.dataset.a;if(k==='mu'){muted=!muted;a.textContent=muted?'🔇':'🔊';muted?music(0):music(1);return}if(k==='again'){replay();return}if(k==='next'){pre=false;i=0;ci=0;forceEnd=false;paint();return}}
 if(forceEnd||pre)return;
 if(S.layout==='story'&&L.length){const r=ST.getBoundingClientRect();const lf=e.clientX-r.left<r.width*.3;if(i>=SL.length-1&&!lf)return;i=lf?Math.max(0,i-1):Math.min(SL.length-1,i+1);show()}
 else if(S.layout==='card'&&L.length){const n=L.length,f=ST.querySelectorAll('.cd')[i%n];
  if(f){f.style.transform=`translate(${110*fd}cqw,-10cqw) rotate(${30*fd}deg)`;f.style.opacity=0}
  ci++;if(ci>=n)setTimeout(()=>{forceEnd=true;ci=0;show()},380);else setTimeout(()=>{i=(i+1)%n;place()},320)}
 else if((S.layout==='grid'||S.layout==='film')&&L.length){forceEnd=true;show()}});

/* ---- gestur sentuh: geser pembuka & geser foto ---- */
ST.addEventListener('pointerdown',e=>{const cv=q('.cv');if(cv){if(!man()&&cv.contains(e.target)){dg={cv,x:e.clientX,y:e.clientY,p:0,m:0};try{ST.setPointerCapture(e.pointerId)}catch(_){}}return}sw0=e.target.closest('.apx,.ms,input,textarea')?null:{x:e.clientX,y:e.clientY}});
ST.addEventListener('pointermove',e=>{if(!dg)return;const dx=e.clientX-dg.x,dy=e.clientY-dg.y;if(!dg.m&&Math.hypot(dx,dy)<10)return;dg.m=1;const d=SW[S.cvs]||[0,-1,.35],r=ST.getBoundingClientRect(),dist=(Math.abs(d[0])>Math.abs(d[1])?r.width:r.height)*d[2],v=S.cvs==='curtain'?Math.abs(dx):dx*d[0]+dy*d[1];dg.p=Math.max(0,Math.min(1,v/dist));dg.cv.classList.add('dg');dg.cv.classList.toggle('h',dg.p>.5);dg.cv.style.setProperty('--p',dg.p.toFixed(3));if(navigator.vibrate&&dg.p>.4&&!dg.v){dg.v=1;try{navigator.vibrate(15)}catch(_){}}});
const dgEnd=e=>{if(dg){const d=dg;dg=null;if(d.m){dgd=1;setTimeout(()=>dgd=0,80);d.cv.classList.remove('dg');if(e.type==='pointerup'&&d.p>.4){d.cv.style.setProperty('--p',1);void d.cv.offsetWidth;openNow(d.cv)}else{d.cv.style.setProperty('--p',0);d.cv.classList.remove('h')}}return}
 if(!sw0||e.type!=='pointerup'){sw0=null;return}const dx=e.clientX-sw0.x,dy=e.clientY-sw0.y;sw0=null;
 if(pre){if(dx<-50||dy<-60){pre=false;i=0;ci=0;forceEnd=false;paint();swd=1;setTimeout(()=>swd=0,80)}return}
 if(forceEnd||!L.length||Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.3)return;
 if(S.layout==='story'){i=dx<0?Math.min(SL.length-1,i+1):Math.max(0,i-1);show()}
 else if(S.layout==='card'){fd=dx<0?-1:1;ST.click();fd=1}else return;
 swd=1;setTimeout(()=>swd=0,80)};
let PD=0,PZ=1;const tdist=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
ST.addEventListener('touchstart',e=>{if(e.touches.length===2&&e.target.closest&&e.target.closest('.cm2')){PD=tdist(e.touches);PZ=ZC}},{passive:true});
ST.addEventListener('touchmove',e=>{if(PD&&e.touches.length===2){const f=e.target.closest('.fin');if(f){e.preventDefault();zSet2(f,PZ*tdist(e.touches)/PD)}}},{passive:false});
ST.addEventListener('touchend',()=>{PD=0});
ST.addEventListener('pointerup',dgEnd);ST.addEventListener('pointercancel',dgEnd);
function fit(){const p=opt.pad?opt.pad():0,w=wrap.clientWidth-p,h=wrap.clientHeight-p,x=Math.max(60,Math.min(w,h*9/16));ST.style.width=x+'px';ST.style.height=(x*16/9)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(wrap);else window.addEventListener('resize',fit);

return{paint,fit,bubs,wps,
 set(o){if('i' in o)i=o.i;if('opened' in o)opened=o.opened;if('play' in o)play=o.play;if('end' in o)forceEnd=o.end},
 view(m){clearTimeout(T);clearInterval(AS);music(0);forceEnd=m==='end';pre=false;opened=m!=='opener';play=false;i=0;ci=0;fit();paint()},
 start(){const cv=q('.cv');if(cv)openNow(cv)},
 music(on){mi=0;music(on)}}
};
})();
