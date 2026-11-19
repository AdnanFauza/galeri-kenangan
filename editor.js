(function(){
'use strict';
const $=s=>document.querySelector(s);
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const FONTS='https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&family=Playfair+Display:wght@500&family=Poppins:wght@300;400;600&family=Space+Grotesk:wght@500;700&family=Pacifico&family=Great+Vibes&family=Special+Elite&family=Abril+Fatface&display=swap';
const FONT_LINK='<link href="'+FONTS+'" rel="stylesheet">';
let saved=null;try{saved=JSON.parse($('#state').textContent)}catch(e){}
const root=$('#root');

const IC={
 foto:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>',
 tema:'<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 100 18c1.4 0 2-1 1.5-2.2-.6-1.4.2-2.8 1.8-2.8H18a3 3 0 003-3C21 7 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/></svg>',
 gaya:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
 buka:'<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9C9 9 7 7.5 7.5 5.8 8 4 10.5 4.5 12 9zM12 9c3 0 5-1.5 4.5-3.2C16 4 13.5 4.5 12 9z"/></svg>',
 fx:'<svg viewBox="0 0 24 24"><circle cx="7" cy="16" r="3"/><circle cx="16" cy="8" r="2"/><circle cx="17" cy="17" r="1.5"/><path d="M4 6c2-1 4 0 5 2"/></svg>',
 teks:'<svg viewBox="0 0 24 24"><path d="M5 6V4h14v2M12 4v16M9 20h6"/></svg>'
};
const SHELL='<div id="app"><div id="wrap"><div id="stage" class="stage"></div></div>'+
'<div id="pn" hidden><div id="hd"><span class="grip"><i></i><i></i><i></i></span><b>Editor</b><span><button data-w="min" aria-label="Kecilkan">–</button><button data-w="big" aria-label="Besarkan">⤢</button><button data-w="x" aria-label="Tutup">✕</button></span></div>'+
'<div id="tabs"></div><div id="tb"></div>'+
'<div id="act"><button class="btn" id="pv">▶ Coba</button><button class="btn p" id="lk">🔗 Buat link</button><button class="btn" id="dl">⬇ HTML</button></div><div id="st"></div></div></div>'+
'<button class="btn p" id="fab" hidden aria-label="Buka editor"><svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg></button>'+
'<button class="btn p" id="own" hidden>✎ Edit</button>';
root.innerHTML=SHELL;

const P={rose:{n:'Rose',bg:'#fff0f3',bg2:'#ffc2d1',ink:'#5a1e32',ac:'#e11d48'},night:{n:'Midnight',bg:'#140b24',bg2:'#3b1a6b',ink:'#f6e9ff',ac:'#ff7ab8'},pastel:{n:'Pastel',bg:'#f3f0ff',bg2:'#cfe9ff',ink:'#38406b',ac:'#8b7bff'},gold:{n:'Gold',bg:'#1c1710',bg2:'#4a3714',ink:'#f7ecd2',ac:'#e0b24a'},wine:{n:'Anggur',bg:'#2a0a14',bg2:'#6b1230',ink:'#ffe8ee',ac:'#ff5a7e'},lilac:{n:'Lilac',bg:'#f6efff',bg2:'#d9c2ff',ink:'#3a2160',ac:'#9b5cf6'},dusk:{n:'Senja',bg:'#1b1033',bg2:'#c2456b',ink:'#fff1e6',ac:'#ffb347'},sky:{n:'Langit',bg:'#eaf6ff',bg2:'#b9dcff',ink:'#14365a',ac:'#2f80ed'},clean:{n:'Clean',bg:'#ffffff',bg2:'#e8e8e8',ink:'#1f1f1f',ac:'#111111'},sunset:{n:'Sunset',bg:'#fff4ec',bg2:'#ffc9a8',ink:'#5a2a14',ac:'#f0561d'},mint:{n:'Mint',bg:'#effaf4',bg2:'#bfe8d3',ink:'#17402e',ac:'#12a06b'},ocean:{n:'Ocean',bg:'#07182b',bg2:'#0f4c75',ink:'#e6f4ff',ac:'#4cc9f0'}};
const OP=[['heart','♥','Hati','Garis hati tergambar pelan'],['letter','💌','Surat','Surat terbuka, pesan tertulis'],['gift','🎁','Kado','Kartu keluar dari kotak'],['curtain','🎭','Tirai','Tirai terbuka, pesan disorot lampu'],['web','🌐','Web','Pindah halaman situs'],['lock','📱','Ponsel','Buka layar, jelajahi aplikasi'],['chat','💬','Chat','Bubble satu per satu'],['neon','🎬','Neon','Tulisan neon menyala'],['glass','🪩','Kaca','Kartu kaca bercahaya'],['ticket','🎟','Tiket','Sobek tiket kenangan'],['polaroid','📸','Polaroid','Foto jadi pelan-pelan'],['vinyl','💿','Vinyl','Piringan hitam berputar'],['night','🌙','Malam','Langit penuh bintang'],['book','📖','Buku','Buka sampul buku'],['balon','🎈','Balon','Lepas balon ke langit'],['gembok','🔐','Gembok','Geser atau isi kode'],['tebak','💡','Tebak','Jawab pertanyaanmu']];
const D={cvs:'letter',frm:'none',stk:'',mus:'none',trn:'wipe',cvt:'Ketuk buat buka',title:'Kita',to:'',from:'',sub:'',msg:'Makasih ya udah nemenin selama ini. Aku seneng banget bisa kenal kamu.',date:'',dl:'hari bersama',font:'script',layout:'story',flt:'none',fx:'heart',ord:'first',ch1:'Hei, lagi apa?',ch2:'Aku punya sesuatu buat kamu. Bentar ya.',chr1:'Apaan?',chr2:'Mau lihat',chok:'Oke, siap-siap ya',qq:'Hari apa yang paling aku suka?',qa:'Hari ini',qb:'Hari kita ketemu',qc:'Semua hari bareng kamu',qok:'Jawabanmu bener banget.',pin:'',pinh:'Petunjuk: tanggal jadian kita',bst:'off',mot:'on',fn:'',bub:[],wp:[],apps:[],url:'https://id.wikipedia.org',level:60,sec:4,max:6,photos:[]};
const S=Object.assign({},D,saved||{});
S.t=Object.assign({bg:P.rose.bg,bg2:P.rose.bg2,ink:P.rose.ink,ac:P.rose.ac},S.t||{});
if(!Array.isArray(S.photos))S.photos=[];

function demoPhotos(){
 return [[345,25],[265,310],[200,160]].map((h,k)=>{
  const c=document.createElement('canvas');c.width=540;c.height=675;const x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,540,675);g.addColorStop(0,'hsl('+h[0]+',80%,72%)');g.addColorStop(1,'hsl('+h[1]+',70%,38%)');
  x.fillStyle=g;x.fillRect(0,0,540,675);
  x.fillStyle='#ffffff30';x.beginPath();x.arc(150+k*120,200,150,0,7);x.fill();x.beginPath();x.arc(420,520-k*60,200,0,7);x.fill();
  x.fillStyle='#ffffffd0';x.font='600 54px Poppins, sans-serif';x.textAlign='center';x.fillText('Foto '+(k+1),270,360);
  return{src:c.toDataURL('image/jpeg',.75),cap:'Ganti dengan fotomu',demo:true}})}
if(!saved)S.photos=demoPhotos();

const stage=$('#stage'),app=$('#app'),wrap=$('#wrap'),pn=$('#pn');
let editing=false,tab='foto',sel=0;
const g=GKmake(stage,app,S,{wrap,editing:()=>editing,pad:()=>editing?16:0});
const go=m=>{if(m)g.set({opened:m!=='opener',end:m==='end',play:false});else g.set({play:false});g.paint()};

/* ---------- panel ---------- */
const TABS=[['foto','Foto'],['tema','Tema'],['gaya','Gaya'],['buka','Pembuka'],['fx','Efek'],['teks','Teks']];
const ch=(k,items)=>'<div class=row>'+items.map(x=>`<button class="chip${S[k]===x[0]?' on':''}" data-k="${k}" data-v="${x[0]}">${x[1]}</button>`).join('')+'</div>';
const sl=(k,lab,a,b,u)=>`<label><span>${lab}: <b>${S[k]}</b>${u}</span><input type=range data-k="${k}" min=${a} max=${b} value=${S[k]}></label>`;
const tx=(k,lab,ml)=>`<label>${lab}<input type=text data-k="${k}" maxlength=${ml} value="${esc(S[k])}"></label>`;
const opf=()=>S.cvs==='chat'?'<small>Isi chat pembuka</small>'+tx('ch1','Pesan 1',60)+tx('ch2','Pesan 2',80)+tx('chr1','Pilihan balas 1',30)+tx('chr2','Pilihan balas 2',30)+tx('chok','Balasanmu setelah dibalas',80):S.cvs==='tebak'?'<small>Isi pertanyaan</small>'+tx('qq','Pertanyaan',80)+tx('qa','Pilihan 1',30)+tx('qb','Pilihan 2',30)+tx('qc','Pilihan 3 (boleh kosong)',30)+tx('qok','Respon setelah dipilih',60):S.cvs==='gembok'?'<small>Kode gembok</small>'+tx('pin','Kode angka, kosongkan untuk geser biasa',6)+tx('pinh','Petunjuk kode',60):'';
const mat=k=>{if(!S[k]||!S[k].length)S[k]=(k==='bub'?g.bubs():g.wps()).slice()};
const AP5=['tel','msg','cam','gal','mus','web','note','cal','set'];
const lst=(a,kk,xk,ph)=>a.map((b,k)=>`<div class=row2><input type=text data-${kk}="${k}" maxlength=300 placeholder="${ph} ${k+1}" value="${esc(b)}"><button class=chip data-${xk}="${k}">×</button></div>`).join('');
const opx=()=>S.cvs==='chat'?'<small>Bubble akhir: muncul satu per satu saat diketuk. Ketuk bubble untuk reaksi ❤️</small>'+lst(g.bubs(),'bk','bx','Bubble')+'<div class=row><button class=chip data-act=badd>＋ Bubble</button><button class=chip data-act=en>⏭ Lihat akhir</button></div>':S.cvs==='web'?'<small>Halaman web akhir: tombol “Lanjut ›” pindah halaman seperti situs sungguhan</small>'+lst(g.wps(),'wk','wx','Halaman')+'<div class=row><button class=chip data-act=wadd>＋ Halaman</button><button class=chip data-act=en>⏭ Lihat akhir</button></div>':S.cvs==='lock'?'<small>Aplikasi di ponsel (ketuk untuk nyala/mati)</small><div class=row>'+[['tel','📞 Telepon'],['msg','💬 Pesan'],['cam','📷 Kamera'],['gal','🖼 Galeri'],['mus','🎵 Musik'],['web','🌐 Web'],['note','📝 Catatan'],['cal','📅 Kalender'],['set','⚙️ Setelan']].map(a=>`<button class="chip${(S.apps&&S.apps.length?S.apps:AP5).includes(a[0])?' on':''}" data-ap="${a[0]}">${a[1]}</button>`).join('')+'</div>'+tx('url','Alamat web awal (app Web)',150)+'<div class=row><button class=chip data-act=en>⏭ Lihat akhir</button></div>':'';
function body(){let h='';
 if(tab==='foto'){
  h='<label class=drop><input type=file id=file accept="image/*" multiple hidden><b>＋ Tambah foto</b><small>pilih beberapa sekaligus</small></label>'+
  (S.photos.length?`<div class=thg>${S.photos.map((p,k)=>`<div class="th${k===sel?' on':''}${k>=S.max?' off':''}" data-s="${k}"><img src="${p.src}" alt=""><i data-x="${k}">×</i></div>`).join('')}</div><small>Seret foto untuk menukar urutan, ketuk untuk memilih.</small><div class=row><button class=chip data-act=shuf>🔀 Acak</button><button class=chip data-act=rev>⇅ Balik</button></div><label>Deskripsi di bawah foto<textarea data-k=cap rows=2 maxlength=140 placeholder="Ini saat kamu…">${esc((S.photos[sel]||{}).cap)}</textarea></label><div class=row>${['Ini saat kamu ','Hari itu kita ','Aku suka banget waktu ','Aku ingat saat '].map(x=>`<button class=chip data-cs="${x}">${x.trim()}…</button>`).join('')}</div>`:'<small>Belum ada foto. Ketuk “Tambah foto”.</small>')+
  (S.photos.some(p=>p.demo)?'<small>Foto “Contoh” hilang otomatis saat kamu menambah foto sendiri.</small>':'')+
  sl('max','Tampilkan maksimal',1,12,' foto')}
 else if(tab==='tema'){
  h='<div class=pals>'+Object.keys(P).map(k=>`<button class=pt data-p="${k}"><i style="background:linear-gradient(135deg,${P[k].bg2},${P[k].ac})"></i>${P[k].n}</button>`).join('')+'</div><div class=row>'+[['bg','Latar'],['bg2','Latar 2'],['ink','Teks'],['ac','Aksen']].map(x=>`<label>${x[1]}<input type=color data-k="t.${x[0]}" value="${S.t[x[0]]}"></label>`).join('')+'</div>'}
 else if(tab==='gaya'){
  h='<small>Tampilan</small><div class=seg>'+[['story','Story'],['scroll','Scroll'],['card','Kartu'],['grid','Kolase'],['film','Film']].map(x=>`<button class="${S.layout===x[0]?'on':''}" data-k=layout data-v="${x[0]}">${x[1]}</button>`).join('')+'</div><small>Font</small>'+ch('font',[['script','Tulisan tangan'],['hand','Catatan'],['serif','Elegan'],['sans','Modern'],['grot','Grotesk'],['pac','Pacifico'],['vib','Romantis'],['type','Mesin tik'],['bold','Tebal']])+'<small>Filter foto</small>'+ch('flt',[['none','Asli'],['warm','Hangat'],['vintage','Vintage'],['bw','Hitam putih'],['dream','Dreamy'],['cool','Sejuk'],['fade','Pudar'],['noir','Noir'],['film','Analog']])+'<small>Bingkai</small>'+ch('frm',[['none','Tanpa'],['white','Putih'],['gold','Emas'],['neon','Neon'],['rose','Aksen'],['pol','Polaroid'],['dash','Garis putus']])+'<small>Gerakan foto</small>'+ch('mot',[['on','Zoom pelan'],['off','Diam']])}
 else if(tab==='buka'){
  h='<div class=tiles>'+OP.map(o=>`<button class="tl${S.cvs===o[0]?' on':''}" data-o="${o[0]}"><span class=ic>${o[1]}</span><b>${o[2]}</b><small>↳ ${o[3]}</small></button>`).join('')+'</div><div class=row><button class=chip data-act=op>▶ Lihat pembuka</button><button class=chip data-act=en>⏭ Lihat akhir</button></div><small>Tiap pembuka punya akhir sendiri. Pesan penutupmu muncul di dalam surat, kartu kado, layar chat, dan seterusnya.</small><small>Urutan tampil</small>'+ch('ord',[['first','Surat dulu, lalu foto'],['last','Foto dulu, lalu surat']])+tx('cvt','Teks layar pembuka',40)+opf()+opx()}
 else if(tab==='fx'){
  h='<small>Efek melayang</small>'+ch('fx',[['heart','♥ Hati'],['star','★ Bintang'],['petal','🌸 Sakura'],['snow','❄ Salju'],['balloon','🎈 Balon'],['fly','🦋 Kupu-kupu'],['mail','💌 Surat'],['spark','● Kunang'],['conf','🎊 Confetti'],['rain','💧 Hujan'],['moon','🌙 Bulan'],['note','🎵 Nada'],['none','Mati']])+sl('level','Tingkat romantis',0,100,'%')+sl('sec','Lama tiap foto',2,8,' dtk')+'<small>Musik latar</small>'+ch('mus',[['none','Mati'],['box','Music box'],['soft','Lembut'],['love','Romantis']])+'<small>Stiker melayang</small>'+ch('stk',[['','Tanpa'],['💖','💖'],['🌹','🌹'],['🦋','🦋'],['⭐','⭐'],['🎀','🎀'],['🐻','🐻']])+'<small>Transisi antar foto</small>'+ch('trn',[['wipe','Sapuan'],['fd','Fade'],['none','Tanpa']])+'<small>Ledakan love saat buka & akhir</small>'+ch('bst',[['off','Mati'],['on','Nyala']])}
 else{
  h=tx('title','Judul',30)+'<div class=row>'+tx('to','Untuk siapa',30)+tx('from','Dari siapa',30)+'</div>'+tx('sub','Teks kecil (opsional)',50)+`<div class=row><label>Tanggal spesial<input type=date data-k=date value="${S.date}"></label>${tx('dl','Keterangan hitungan',20)}</div><label>Pesan penutup<textarea data-k=msg rows=4 maxlength=600>${esc(S.msg)}</textarea></label>`+tx('cvt','Teks layar pembuka',40)+tx('fn','Nama file HTML (tanpa .html)',40)+'<a class=dng href="https://sociabuzz.com/m_adnan/support" target=_blank rel="noopener noreferrer"><small>made by adnan</small><b>Suka sama editor ini? Traktir kopi</b><span>sociabuzz.com/m_adnan/support</span></a>'}
 $('#tb').innerHTML=h}
function tabs(){$('#tabs').innerHTML=TABS.map(x=>`<button data-t="${x[0]}" class="${x[0]===tab?'on':''}">${IC[x[0]]}${x[1]}</button>`).join('');body();setTimeout(clamp,0)}

pn.addEventListener('click',e=>{
 const w=e.target.closest('[data-w]');
 if(w){const v=w.dataset.w;if(v==='x'){pn.hidden=true;$('#fab').hidden=false}else pn.classList.toggle(v);setTimeout(clamp,0);return}
 const el=e.target.closest('[data-t],[data-x],[data-s],[data-p],[data-v],[data-mv],[data-o],[data-act],[data-cs],[data-bx],[data-wx],[data-ap]');if(!el)return;const d=el.dataset;
 if(d.t!==undefined){tab=d.t;tabs();if(tab==='buka')go('opener');else if(tab!=='teks')go('gallery');return}
 if(d.cs!==undefined){const ph=S.photos[sel];if(ph&&(!ph.cap||ph.demo))ph.cap=d.cs;body();go('gallery');const ta=$('#tb textarea');if(ta){ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length)}return}
 if(d.act==='shuf'||d.act==='rev'){const cur=S.photos[sel];if(d.act==='rev')S.photos.reverse();else for(let n=S.photos.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[S.photos[n],S.photos[r]]=[S.photos[r],S.photos[n]]}sel=Math.max(0,S.photos.indexOf(cur));g.set({i:sel});body();go('gallery');return}
 if(d.bx!==undefined){mat('bub');if(S.bub.length>1)S.bub.splice(+d.bx,1);body();go('end');return}
 if(d.wx!==undefined){mat('wp');if(S.wp.length>1)S.wp.splice(+d.wx,1);body();go('end');return}
 if(d.ap!==undefined){const a=(S.apps&&S.apps.length?S.apps:AP5).slice(),n=a.indexOf(d.ap);if(n>-1){if(a.length>1)a.splice(n,1)}else a.push(d.ap);S.apps=AP5.filter(x=>a.includes(x));body();go('end');return}
 if(d.act==='badd'){mat('bub');S.bub.push('Pesan baru');body();go('end');return}
 if(d.act==='wadd'){mat('wp');if(S.wp.length<6)S.wp.push('Halaman baru');body();go('end');return}
 if(d.act!==undefined){go(d.act==='op'?'opener':'end');return}
 if(d.o!==undefined){S.cvs=d.o;body();go('opener');$('#tb').scrollTop=0;return}
 if(d.mv!==undefined){const b=sel+ +d.mv;if(b>=0&&b<S.photos.length){const q=S.photos[sel];S.photos[sel]=S.photos[b];S.photos[b]=q;sel=b;g.set({i:b})}body();go('gallery');return}
 if(d.x!==undefined){S.photos.splice(+d.x,1);sel=Math.max(0,Math.min(sel,S.photos.length-1));g.set({i:sel});body();go('gallery');return}
 if(d.s!==undefined){sel=+d.s;g.set({i:sel});body();go('gallery');return}
 if(d.p){S.t=Object.assign({},P[d.p]);delete S.t.n;body();go(tab==='buka'?null:'gallery');return}
 if(d.k!==undefined){S[d.k]=d.v;
  if(d.k==='layout')g.set({i:0});
  if(d.k==='mus'){g.music(d.v!=='none'?1:0);if(d.v!=='none')setTimeout(()=>g.music(0),4000)}
  body();go(tab==='buka'?'opener':'gallery')}});
pn.addEventListener('input',e=>{const el=e.target;if(el.dataset.bk!==undefined){mat('bub');S.bub[+el.dataset.bk]=el.value;go('end');return}if(el.dataset.wk!==undefined){mat('wp');S.wp[+el.dataset.wk]=el.value;go('end');return}const k=el.dataset.k;if(!k)return;const v=el.type==='range'?+el.value:el.value;
 if(k==='cap'){if(S.photos[sel])S.photos[sel].cap=v}else if(k.indexOf('t.')===0)S.t[k.slice(2)]=v;else S[k]=v;
 const b=el.parentNode.querySelector('b');if(b)b.textContent=v;
 if(k==='max')document.querySelectorAll('#tb .th').forEach((t,n)=>t.classList.toggle('off',n>=S.max));
 go(k==='cvt'?'opener':k==='msg'?'end':(tab==='buka'?null:'gallery'))});
pn.addEventListener('change',e=>{if(e.target.id!=='file')return;const fs=Array.from(e.target.files);
 fs.forEach(f=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);
  if(S.photos.some(p=>p.demo))S.photos=S.photos.filter(p=>!p.demo);
  S.photos.push({src:c.toDataURL('image/jpeg',.78),cap:''});if(S.photos.length>S.max&&S.max<12)S.max=S.photos.length;sel=S.photos.length-1;g.set({i:sel});body();go('gallery')};im.src=r.result};r.readAsDataURL(f)});
 e.target.value=''});

/* seret foto untuk ubah urutan */
const tb=$('#tb');let dr=null,jd=0;
tb.addEventListener('pointerdown',e=>{const t=e.target.closest('.th');if(!t||e.target.closest('[data-x]'))return;dr={k:+t.dataset.s,t,x:e.clientX,y:e.clientY,on:0,j:-1};try{t.setPointerCapture(e.pointerId)}catch(_){}});
tb.addEventListener('pointermove',e=>{if(!dr)return;const dx=e.clientX-dr.x,dy=e.clientY-dr.y;if(!dr.on&&Math.hypot(dx,dy)>8){dr.on=1;dr.t.classList.add('dg')}if(!dr.on)return;dr.t.style.transform=`translate(${dx}px,${dy}px) scale(1.15)`;dr.j=-1;tb.querySelectorAll('.th').forEach((o,n)=>{const r=o.getBoundingClientRect(),hit=o!==dr.t&&e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom;o.classList.toggle('ov',hit);if(hit)dr.j=n})});
const dend=e=>{if(!dr)return;const d=dr;dr=null;if(!d.on)return;jd=1;setTimeout(()=>jd=0,60);d.t.classList.remove('dg');d.t.style.transform='';if(e.type==='pointerup'&&d.j>-1){const m=S.photos.splice(d.k,1)[0];S.photos.splice(d.j,0,m);sel=d.j;g.set({i:sel})}body();go('gallery')};
tb.addEventListener('pointerup',dend);tb.addEventListener('pointercancel',dend);
tb.addEventListener('click',e=>{if(jd){e.stopPropagation();jd=0}},true);
/* ketuk teks di preview untuk langsung mengedit */
stage.addEventListener('click',e=>{if(!editing||pn.hidden)return;const el=e.target.closest('.cap,h1,.msg');if(!el)return;e.stopPropagation();e.preventDefault();const f=el.closest('.cap')?['foto','textarea']:el.matches('.msg')?['teks','textarea']:['teks','input[data-k=title]'];pn.classList.remove('min');tab=f[0];tabs();if(tab==='foto')go('gallery');const x=$('#tb '+f[1]);if(x){x.focus();x.scrollIntoView({block:'nearest'})}},true);
/* geser panel */
let Dg=null;const hdr=$('#hd');
function mv(x,y){const w=pn.offsetWidth,h=pn.offsetHeight;pn.style.left=Math.max(4,Math.min(innerWidth-w-4,x))+'px';pn.style.top=Math.max(4,Math.min(innerHeight-h-4,y))+'px'}
function clamp(){mv(parseFloat(pn.style.left)||4,parseFloat(pn.style.top)||4)}
function home(){pn.classList.remove('min');mv((innerWidth-pn.offsetWidth)/2,innerHeight-pn.offsetHeight-12)}
hdr.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;const r=pn.getBoundingClientRect();Dg={x:e.clientX-r.left,y:e.clientY-r.top};hdr.setPointerCapture(e.pointerId)});
hdr.addEventListener('pointermove',e=>{if(Dg)mv(e.clientX-Dg.x,e.clientY-Dg.y)});
hdr.addEventListener('pointerup',()=>{Dg=null});
$('#fab').onclick=()=>{pn.hidden=false;$('#fab').hidden=true;clamp()};
addEventListener('resize',clamp);

/* ---------- simpan: link & HTML ---------- */
const BASE='html,body{height:100%;margin:0;background:#050507}#app{position:relative;height:100%;display:flex;flex-direction:column;overflow:hidden;background:#050507}#app::before{content:"";position:absolute;inset:-20%;background:radial-gradient(circle at 50% 45%,var(--sa),transparent 55%);opacity:.22;filter:blur(40px);pointer-events:none}#wrap{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center}';
const BOOT='(function(){var S=JSON.parse(document.getElementById("state").textContent);GKmake(document.getElementById("stage"),document.getElementById("app"),S,{wrap:document.getElementById("wrap")}).view("opener")})();';
const asset=async name=>{const ids={'base.css':'basecss','viewer.css':'vcss','editor.css':'edcss','viewer.js':'vjs','editor.js':'edjs'},el=document.getElementById(ids[name]);if(el)return el.textContent;const r=await fetch(name);if(!r.ok)throw new Error('Gagal memuat '+name);return r.text()};
const outState=()=>Object.assign({},S,{photos:S.photos.filter(p=>!p.demo).slice(0,S.max)});
const jsonOf=O=>JSON.stringify(O).replace(/</g,'\\u003c');
async function standalone(O){
 const css=await asset('viewer.css'),js=await asset('viewer.js');
 return '<!doctype html><html lang="id"><head><meta charset="utf-8"><title>'+esc(O.title||'Galeri Kenangan')+'</title><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'+FONT_LINK+'<style>'+css+'</style></head><body><div id="app" class="view"><div id="wrap"><div id="stage" class="stage"></div></div></div><script id="state" type="application/json">'+jsonOf(O)+'</'+'script><script>'+js+'\n'+BOOT+'</'+'script></body></html>'}
async function pageDoc(O){
 const [reset,vc,ec,vj,ej]=await Promise.all(['base.css','viewer.css','editor.css','viewer.js','editor.js'].map(asset));
 return '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style id="basecss">'+reset+'</style></head><body><title>Galeri Kenangan</title>'+FONT_LINK+'<style id="vcss">'+vc+'</style><style id="edcss">'+ec+'</style><div id="root"></div><script id="state" type="application/json">'+jsonOf(O)+'</'+'script><script id="vjs">'+vj+'</'+'script><script id="edjs">'+ej+'</'+'script></body></html>'}
const fname=O=>{const b=String(O.fn||'').trim().replace(/\.html?$/i,'').replace(/[\\\/:*?"<>|]+/g,'').trim();return(b||'galeri-'+slug(O))+'.html'};const slug=O=>(String(O.title||'galeri').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'galeri');
const note=m=>{$('#st').textContent=m};
async function save(O,share){const n=fname(O),f=new File([await standalone(O)],n,{type:'text/html'});
 try{if(share&&navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:O.title});note('Terkirim. Penerima tinggal membuka file-nya.');return}}catch(e){if(e&&e.name==='AbortError'){note('Dibatalkan.');return}}
 const u=URL.createObjectURL(f),a=document.createElement('a');a.href=u;a.download=n;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);note('File diunduh. Bisa dibuka langsung di browser mana pun.')}
async function doDl(){
 const O=outState();
 try{const d=window.claude&&claude.use?await claude.use('downloads'):null;
  if(!d){await save(O);return}
  await d.save({filename:fname(O),data:await standalone(O)});
  note('Tersimpan. File ini bisa dibuka langsung di browser mana pun.')}
 catch(e){note(e&&e.code==='declined'?'Dibatalkan.':'Gagal menyimpan: '+((e&&e.message)||'coba lagi'))}}
async function doLink(){
 const O=outState();
 try{const a=window.claude&&claude.use?await claude.use('artifact'):null;
  if(!a){await save(O,1);return}
  note('Menyimpan link…');
  await a.publish(await pageDoc(O));
  note('Link siap. Tekan Bagikan di bagian atas halaman untuk menyalin.')}
 catch(e){const c=e&&e.code;note(c==='conflict'?'Ada versi yang lebih baru, halaman dimuat ulang.':(c==='not_writer'||c==='not_granted')?'Kamu tidak punya izin mengubah halaman ini.':'Gagal menyimpan: '+((e&&e.message)||'coba lagi'))}}
$('#lk').textContent=(window.claude&&claude.use)?(saved?'🔗 Update link':'🔗 Buat link'):'📤 Bagikan';
$('#lk').onclick=doLink;$('#dl').onclick=doDl;
$('#pv').onclick=()=>{if(innerWidth<700)pn.classList.add('min');g.view('opener');setTimeout(()=>g.start(),350)};

function mode(ed){
 editing=ed;app.className=ed?'':'view';$('#fab').hidden=true;pn.hidden=!ed;
 if(ed){g.set({opened:true,end:false,play:false,i:0});tabs();home();g.fit();g.paint()}
 else g.view('opener')}
mode(!saved);
if(saved&&window.claude&&claude.use){try{claude.use('user').then(u=>{if(u&&((u.isOwner&&u.isOwner())||(u.canEdit&&u.canEdit()))){const o=$('#own');o.hidden=false;o.onclick=()=>{o.hidden=true;mode(true)}}}).catch(()=>{})}catch(e){}}
})();
