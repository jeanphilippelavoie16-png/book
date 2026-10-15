
/* =====================================================================
   Moteur de chapitre (build_chapitre.py). Les fonctions au-dessus
   (OVER, splitPara, splitTable, noteZone, syncNotes) sont celles de
   interieur.tpl.html, recopiées à la construction. Ici : les pages se
   créent à la volée, trois histoires se suivent (texte courant, encadré
   danger, variante d'urgence), les planches pleine page prennent la page
   qui suit leur mention, les demi-planches et les photos flottent au
   premier endroit où elles tiennent, jamais au milieu d'un paragraphe.
   ===================================================================== */
const C = JSON.parse(document.getElementById('meta').textContent);
const BOOK = document.getElementById('book');
const WARN = [];
const PAGES = [];
let P = null;                 // page courante
let pendingPlates = [];       // planches pleine page qui attendent la fin de la page courante
const DSVG = '<svg viewBox="0 0 34 30" aria-hidden="true"><path d="M17 1.5 L32.5 28.5 H1.5 Z" fill="#fff"/><path d="M15.2 10 H18.8 L18.1 20.5 H15.9 Z" fill="#9B2C1E"/><rect x="15.4" y="22.3" width="3.2" height="3.2" fill="#9B2C1E"/></svg>';
const PT = 96/72;

function mkPage(kind, plate){
  const n = PAGES.length + 1, side = n % 2 ? 'recto' : 'verso';
  const el = document.createElement('section'); el.className = 'page ' + side; el.id = 'p' + C.num + '-' + n;
  if(kind !== 'open') el.innerHTML = '<div class="rh"><div class="grp"><span class="fo">' + C.num + '-' + n + '</span><span class="ch">' + C.num + ' · ' + C.title + '</span></div><span class="to">' + C.tome + '</span></div>';
  const bl = document.createElement('div'); bl.className = 'block'; el.appendChild(bl);
  if(kind === 'open') bl.innerHTML = document.getElementById('open').innerHTML;
  if(kind === 'plate'){
    const img = document.createElement('img'); img.className = 'planche'; img.src = plate.dataset.src; img.alt = 'Planche ' + plate.dataset.id;
    bl.appendChild(img);
  }
  BOOK.appendChild(el);
  const p = {el, bl, kind, n, deferred: [], plate: plate ? plate.dataset.id : null};
  PAGES.push(p); return p;
}
function nextPage(){
  const pl = pendingPlates; pendingPlates = [];
  pl.forEach(b => { const pp = mkPage('plate', b); pp.story = P.story; });
  P = mkPage('text'); return P;
}
function free(p){       // hauteur libre sous le dernier élément du bloc, en px
  const br = p.bl.getBoundingClientRect(); const last = p.bl.lastElementChild;
  return last ? br.bottom - last.getBoundingClientRect().bottom : br.height;
}
function region(p, kind, first){
  const frame = document.createElement('div'); frame.className = 'frame';
  let box = frame;
  if(kind === 'd'){
    box = document.createElement('div'); box.className = 'rg';
    if(first) box.innerHTML = '<h2 class="sec s8" data-n="8"><span class="n">8</span><span class="t">Danger</span></h2>';
    const dg = document.createElement('div'); dg.className = 'danger full'; dg.dataset.edge = 'd';
    dg.innerHTML = '<div class="dhead' + (first ? '' : ' small') + '">' + DSVG + '<span>' +
      (first ? 'Danger' + (C.dsub ? ' — <span class="sj">' + C.dsub + '</span>' : '') : 'Danger <span class="sj">(suite)</span>') + '</span></div>';
    dg.appendChild(frame);
    const cut = document.createElement('div'); cut.className = 'dcut on'; cut.textContent = 'L’encadré continue page suivante';
    dg.appendChild(cut); box.appendChild(dg);
  } else if(kind === 'o'){
    // la série des premières minutes (build_chapitre.py, marqueur {.orange}) : encadré orange, repère orange sur la tranche
    box = document.createElement('div'); box.className = 'rg';
    const og = document.createElement('div'); og.className = 'orange full'; og.dataset.edge = 'o';
    og.innerHTML = '<div class="ohead' + (first ? '' : ' small') + '"><i></i><span>Premières minutes' + (first ? '' : ' <span class="sj">(suite)</span>') + '</span></div>';
    og.appendChild(frame);
    const cut = document.createElement('div'); cut.className = 'dcut on'; cut.dataset.lab = 'La série continue page '; cut.textContent = 'La série continue page suivante';
    og.appendChild(cut); box.appendChild(og);
  } else if(kind === 'e'){
    box = document.createElement('div'); box.className = 'rg s9wrap' + (first ? '' : ' cont'); box.dataset.edge = 'k';
    if(first) box.innerHTML = '<h2 class="sec s9" data-n="9"><span class="n">9</span><span class="t">Variante d’urgence</span><span class="sub9">Sans courant, sans matériel acheté, sans personne à appeler</span></h2>';
    box.appendChild(frame);
  }
  p.bl.appendChild(box);
  return {box, frame};
}
function pour(f, q, p){
  while(q.length){
    const b = q.shift();
    if(b.dataset && b.dataset.plate === 'full'){ pendingPlates.push(b); continue; }
    f.appendChild(b); syncNotes(f);
    if(!OVER(f)) continue;
    f.removeChild(b); syncNotes(f);
    if(b.classList.contains('fig')){ p.deferred.push(b); continue; }   // la figure attend, le texte continue
    let parts = null;
    if(b.tagName === 'P') parts = splitPara(b, f); else if(b.tagName === 'TABLE') parts = splitTableBal(b, f);
    if(parts){ f.appendChild(parts[0]); syncNotes(f); q.unshift(parts[1]); } else q.unshift(b);
    break;
  }
  if(q.length){
    // pas de titre ni d'amorce seule en bas de page
    while(f.lastElementChild && (/^H[234]$/.test(f.lastElementChild.tagName) || f.lastElementChild.classList.contains('kh')))
      q.unshift(f.removeChild(f.lastElementChild));
    syncNotes(f);
  }
  if(p.deferred.length){   // après la fin du paragraphe coupé, jamais au milieu
    const k = (q[0] && q[0].classList && q[0].classList.contains('cont')) ? 1 : 0;
    q.splice(k, 0, ...p.deferred); p.deferred = [];
  }
  return q.length ? 'full' : 'done';
}
function splitTableBal(tb, f){   // jamais une rangée seule en haut de la page suivante
  const parts = splitTable(tb, f); if(!parts) return null;
  const A = parts[0].tBodies[0], B = parts[1].tBodies[0];
  if(B.rows.length === 1 && A.rows.length >= 4) B.insertBefore(A.rows[A.rows.length - 1], B.firstChild);
  return parts;
}
function finish(R, kind){
  if(kind === 'main'){ R.frame.classList.add('auto'); return; }
  R.box.classList.add('fin'); R.frame.classList.add('auto');
  if(kind === 'd' || kind === 'o'){ const dg = R.box.querySelector(kind === 'd' ? '.danger' : '.orange'); dg.classList.remove('full'); dg.querySelector('.dcut').classList.remove('on'); }
}
function story(id, kind, suite){   // kind : main, o, d, e ; suite : histoire reprise après la série orange (pas de second titre)
  kind = kind || id;
  const tpl = document.getElementById('story-' + id);
  const q = Array.from(tpl.content.children).map(n => n.cloneNode(true));
  if(!q.length) return;
  const H = P.bl.getBoundingClientRect().height;
  let first = !suite, guard = 0;
  while(q.length && guard++ < 120){
    const fr = free(P), fresh = P.kind === 'text' && !P.bl.children.length;
    // seuils de départ : l'encadré danger et la variante d'urgence ne commencent pas dans un fond de page
    if(first && !fresh && ((kind === 'd' && fr < 2.2 * 96) || (kind === 'e' && fr < 1.8 * 96) || (kind === 'main' && fr < 1.2 * 96) || (kind === 'o' && fr < 2.0 * 96))){ nextPage(); continue; }
    if(suite && guard === 1 && !fresh && fr < 1.2 * 96){ nextPage(); continue; }
    P.story = kind;
    const snapQ = q.slice(), snapPl = pendingPlates.slice();
    const R = region(P, kind, first);
    const r = pour(R.frame, q, P);
    if(!R.frame.children.length){
      if(fresh){   // rien ne tient même sur une page vide : on force, et on le signale
        WARN.push(P.el.id + ' : bloc trop grand, ' + (q[0].textContent || q[0].className).slice(0, 40));
        R.frame.appendChild(q.shift()); first = false;
        if(!q.length){ finish(R, kind); break; }
        nextPage(); continue;
      }
      R.box.remove(); const z = R.frame.nextElementSibling; if(z && z.classList.contains('fnz')) z.remove();
      q.splice(0, q.length, ...snapQ); pendingPlates = snapPl;
      nextPage(); continue;
    }
    // l'encadré danger ne se coupe pas s'il tiendrait entier sur la page suivante
    if(kind === 'd' && first && r === 'full' && !fresh && fr < 0.62 * H){
      R.box.remove(); q.splice(0, q.length, ...snapQ); pendingPlates = snapPl; nextPage(); continue;
    }
    first = false;
    if(r === 'done'){ finish(R, kind); break; }
    nextPage();
  }
}

/* ---------- après la coulée : pieds de page, sommaire, renvois, tranche ---------- */
function ladder(on, label, folio){
  let lis = '';
  Object.keys(C.secs).forEach(k => { lis += '<li class="' + (on.has(+k) ? 'on' + (k === '8' ? ' d' : '') : '') + '">' + k + '</li>'; });
  return '<div class="ft">' + (folio ? '<span class="fo-ft">' + folio + '</span>' : '') + '<div class="lad"><ol>' + lis + '</ol><span class="lab">' + label + '</span></div><span class="lieu-ft">Lieu · ' + C.lieu + '</span></div>';
}
function finishPages(){
  let cur = 0; const start = {};
  PAGES.forEach(p => {
    const on = new Set();
    const flow = p.el.querySelectorAll('.block h2.sec[data-n], .block .frame > *');
    const startsNew = flow.length && flow[0].matches('h2.sec[data-n]');
    if(cur && !startsNew) on.add(cur);
    p.el.querySelectorAll('.block h2.sec[data-n]').forEach(h => { const n = +h.dataset.n; on.add(n); cur = n; if(!start[n]) start[n] = p.n; });
    if(!on.size && p.kind === 'open') on.add(1);
    const mx = Math.max(...on);
    let label = (on.has(8) && on.has(9)) ? C.secs['8'] + ' · ' + C.secs['9'] : (C.secs[String(mx)] || '');
    if(p.plate) label += ' · Planche ' + p.plate;
    p.el.insertAdjacentHTML('beforeend', ladder(on, label, p.kind === 'open' ? C.num + '-' + p.n : null));
    if(p.plate && p.story === 'e') p.bl.querySelector('img').dataset.edge = 'k';
    if(p.plate && p.story === 'd') p.bl.querySelector('img').dataset.edge = 'd';
    if(p.plate && p.story === 'o') p.bl.querySelector('img').dataset.edge = 'o';
  });
  document.querySelectorAll('.toc li').forEach(li => { const n = li.dataset.n; li.querySelector('.f').textContent = start[n] ? C.num + '-' + start[n] : ''; });
  // « l'encadré continue page … » et « le tableau continue page … »
  PAGES.forEach((p, i) => {
    const nxt = PAGES.slice(i + 1).find(q => q.kind === 'text');
    p.el.querySelectorAll('.dcut.on').forEach(c => { if(nxt) c.textContent = (c.dataset.lab || 'L’encadré continue page ') + C.num + '-' + nxt.n; });
    p.el.querySelectorAll('caption.tsuite').forEach(c => { if(nxt && nxt.n !== p.n + 1) c.textContent = 'Le tableau continue page ' + C.num + '-' + nxt.n; });
  });
}
function fitTitle(){
  const h = document.querySelector('.open-title h1'); if(!h) return;
  let s = 38;
  while(s > 24 && h.getBoundingClientRect().height > 2 * 1.0 * s * PT + 4){ s -= 1; h.style.fontSize = s + 'pt'; }
}
function edges(){
  document.querySelectorAll('[data-edge]').forEach(el => {
    const pg = el.closest('.page'); const pr = pg.getBoundingClientRect(); const r = el.getBoundingClientRect();
    const e = document.createElement('div'); e.className = 'edge' + (el.dataset.edge === 'd' ? ' d' : el.dataset.edge === 'o' ? ' o' : '');
    e.style.top = (r.top - pr.top) + 'px'; e.style.height = r.height + 'px'; pg.appendChild(e);
  });
}
function checks(){
  // texte qui sort de la zone utile, page presque vide
  PAGES.forEach(p => {
    const br = p.bl.getBoundingClientRect();
    p.bl.querySelectorAll('.frame').forEach(f => { if(!f.classList.contains('auto') && OVER(f)) WARN.push(p.el.id + ' : cadre qui déborde'); });
    const last = p.bl.lastElementChild;
    if(last && last.getBoundingClientRect().bottom > br.bottom + 1) WARN.push(p.el.id + ' : sort de la zone utile');
    if(p.kind === 'text' && p !== PAGES[PAGES.length - 1] && free(p) > 0.4 * br.height) WARN.push(p.el.id + ' : page à moitié vide');
  });
}
function views(){
  const h = location.hash;
  const wrap = (pg) => { const c = document.createElement('div'); c.className = 'trim ' + (pg.classList.contains('recto') ? 'r' : 'v'); c.appendChild(pg); return c; };
  if(h === '#stats'){
    const st = document.getElementById('stats'); st.style.cssText = 'display:block;position:fixed;top:0;left:0;z-index:99;background:#fff;font:15px/1.35 monospace;white-space:pre-wrap;width:760px;height:100vh;margin:0;padding:8px';
    st.textContent = st.textContent.replace(/,"/g, ',\n"');
  } else if(h.startsWith('#page=')){
    document.body.classList.add('single');
    const pg = document.getElementById(h.slice(6));
    document.querySelectorAll('.page').forEach(p => { if(p !== pg) p.style.display = 'none'; });
    if(pg) document.body.insertBefore(wrap(pg), document.body.firstChild);
  }
}
function words(t){ return t.split(/\s+/).filter(w => /[\p{L}\d]/u.test(w)).length; }
const faces = ['400 10pt "IBM Plex Serif"','600 10pt "IBM Plex Serif"','700 10pt "IBM Plex Serif"','italic 400 10pt "IBM Plex Serif"','italic 600 10pt "IBM Plex Serif"',
  '400 10pt "IBM Plex Sans Condensed"','500 10pt "IBM Plex Sans Condensed"','600 10pt "IBM Plex Sans Condensed"','700 10pt "IBM Plex Sans Condensed"','italic 600 10pt "IBM Plex Sans Condensed"'];
const imgs = Array.from(document.querySelectorAll('template')).flatMap(t => Array.from(t.content.querySelectorAll('img')).map(i => i.getAttribute('src')));
const imgLoads = imgs.map(src => new Promise(res => { const i = new Image(); i.onload = i.onerror = res; i.src = src; }));
Promise.all(faces.map(f => document.fonts.load(f, 'aéÀ§«»—'))).then(() => document.fonts.ready).then(() => Promise.all(imgLoads)).then(() => {
  P = mkPage('open'); fitTitle();
  (C.flux || [['main'], ['d'], ['e']]).forEach(f => story(f[0], f[1], f[2]));
  if(pendingPlates.length){ const pl = pendingPlates; pendingPlates = []; pl.forEach(b => { const pp = mkPage('plate', b); pp.story = 'e'; }); }
  finishPages(); edges(); checks();
  const st = {pages: PAGES.length, reste: 0, warn: WARN, mots: {}};
  PAGES.forEach(p => st.mots[p.n] = words(p.bl.innerText));
  document.getElementById('stats').textContent = JSON.stringify(st);
  views();
  document.documentElement.dataset.ready = '1';
});
