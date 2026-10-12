
/* =====================================================================
   00 — le chapitre principal. Les pages sont composées d'avance par
   ancrage.py (une par bloc, une par « Quand il n'y a rien ») : ce script
   ne pagine pas, il AJUSTE. Sur chaque page, dans l'ordre :
     1. notes de bas de page au pied du bloc ;
     2. titre sur deux lignes au plus (trois s'il le faut, jamais plus petit
        que 28 pt) ;
     3. si la page déborde : le texte de lecture rétrécit d'abord (jusqu'à
        86 %), les amorces en gros ensuite (jusqu'à 82 %) — les gestes restent
        ce qu'il y a de plus gros sur la page ; si elle a de la place : les
        amorces grossissent jusqu'à 120 %, puis le texte jusqu'à 108 % ; sur
        la page d'un bloc (celle qu'on lit à un mètre, à la lampe frontale),
        les amorces continuent jusqu'à 140 % (24 pt) et le texte jusqu'à
        112 %, tant que chaque geste garde 8 pt d'air dessus et dessous ;
     4. l'espace qui reste se répartit entre les gestes (20 pt au plus chacun).
   Les fonctions OVER, syncNotes… viennent de interieur.tpl.html.
   ===================================================================== */
const C = JSON.parse(document.getElementById('meta').textContent);
const WARN = [];
const PT = 96/72;
const PAGES = Array.from(document.querySelectorAll('#book > .page'));

function bottomOf(el, skip){
  let b = el.getBoundingClientRect().top;
  el.querySelectorAll('*').forEach(c => { if(skip && c.closest(skip)) return; const r = c.getBoundingClientRect(); if(r.height && r.bottom > b) b = r.bottom; });
  return b;
}
function overflow(bl){
  const over = bottomOf(bl) - bl.getBoundingClientRect().bottom;
  const fr = Array.from(bl.querySelectorAll('.frame')).some(f => OVER(f));
  return fr ? Math.max(over, 1) : over;
}
function staticNotes(pg){
  const bl = pg.querySelector('.block');
  const seen = new Set();
  const calls = Array.from(bl.querySelectorAll('sup.fnr')).filter(c => NOTES[c.dataset.fn] && !seen.has(c.dataset.fn) && seen.add(c.dataset.fn));
  if(!calls.length) return;
  const z = document.createElement('div'); z.className = 'fnz one on'; z.innerHTML = '<div class="fnc" data-side="l"></div>';
  calls.forEach(c => z.firstChild.appendChild(NOTES[c.dataset.fn].cloneNode(true)));
  const host = bl.querySelector('.qr-body') || bl;
  host.appendChild(z);
}
function lines(h){ const lh = parseFloat(getComputedStyle(h).lineHeight) || parseFloat(getComputedStyle(h).fontSize); return Math.round(h.getBoundingClientRect().height / lh); }
function fitTitle(pg){
  const h = pg.querySelector('.bk-tt h1, .sr-t h2, .sx-head h1'); if(!h) return;
  let kt = 1;
  const set = v => { kt = v; pg.style.setProperty('--kt', v); };
  while(lines(h) > 2 && kt > 0.8) set(+(kt - 0.02).toFixed(2));
  if(lines(h) > 2) set(0.9);        // trois lignes, en gros, plutôt que deux en petit
}
function fit(pg){
  const bl = pg.querySelector('.block');
  let ks = 1, kl = 1;
  const set = () => { pg.style.setProperty('--ks', ks); pg.style.setProperty('--kl', kl); };
  const over = () => overflow(bl) > 0.5;
  while(over() && ks > 0.86){ ks = +(ks - 0.02).toFixed(2); set(); }
  while(over() && kl > 0.82){ kl = +(kl - 0.02).toFixed(2); set(); }
  if(over()) WARN.push(pg.id + ' : déborde de ' + (overflow(bl) / 96).toFixed(2) + ' po même réduit');
  else {
    // la place qui reste grossit d'abord les amorces, puis le texte de lecture ; sur la page d'un bloc,
    // plus gros, mais chaque geste garde son air (8 pt dessus, 8 pt dessous) pour se trouver d'un coup d'œil
    const bloc = pg.classList.contains('bloc');
    const KL = 1.4, KS = 1.12;
    const gs = bl.querySelector(':scope > ol.gestes');
    const air = bloc && gs ? gs.children.length * 16 * PT : 0;
    const serre = () => overflow(bl) > 0.5 - air;
    // grow : +2 % tant que ça tient, et le dernier pas repart seulement s'il a fait déborder
    const grow = (get, put, max, full) => { let n = 0; while(!full() && get() < max){ put(+(get() + 0.02).toFixed(2)); set(); n++; }
      if(n && full()){ put(+(get() - 0.02).toFixed(2)); set(); } };
    const K = v => { if(v === undefined) return kl; kl = v; }, S = v => { if(v === undefined) return ks; ks = v; };
    grow(K, K, 1.2, over);                          // toutes les pages : amorces à 120 %, puis texte à 108 %
    if(kl >= 1.18) grow(S, S, 1.08, over);
    if(bloc && kl >= 1.18){                         // page d'un bloc : au-delà, seulement si chaque geste garde son air
      grow(K, K, KL, serre);
      if(kl >= KL - 0.02) grow(S, S, KS, serre);
    }
    while(over() && kl > 1){ kl = +(kl - 0.02).toFixed(2); set(); }   // garde-fou
  }
  pg.dataset.k = ks + '/' + kl;
  // l'air qui reste va entre les gestes, pas au pied de la page
  const g = bl.querySelector(':scope > ol.gestes');
  if(g && !over() && !bl.querySelector('.danger.full, .s9wrap')){
    const fnz = bl.querySelector(':scope > .fnz');
    const used = bottomOf(bl, '.fnz') + (fnz ? fnz.getBoundingClientRect().height + 8 : 0);
    const free = bl.getBoundingClientRect().bottom - used;
    const gap = Math.min(free / (2 * g.children.length), 20 * PT);
    if(gap > 1){ g.style.setProperty('--gap', (gap / PT).toFixed(2) + 'pt'); if(over()) g.style.removeProperty('--gap'); }
  }
  if(!over() && pg.classList.contains('bloc')){
    const free = bl.getBoundingClientRect().bottom - bottomOf(bl);
    if(free > 0.33 * bl.getBoundingClientRect().height) WARN.push(pg.id + ' : un tiers de page vide');
  }
}
function edges(){
  document.querySelectorAll('[data-edge]').forEach(el => {
    const pg = el.closest('.page'); const pr = pg.getBoundingClientRect(); const r = el.getBoundingClientRect();
    const e = document.createElement('div'); e.className = 'edge' + (el.dataset.edge === 'd' ? ' d' : '');
    e.style.top = (r.top - pr.top) + 'px'; e.style.height = r.height + 'px'; pg.appendChild(e);
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
const faces = ['400 10pt "IBM Plex Serif"','500 10pt "IBM Plex Serif"','600 10pt "IBM Plex Serif"','700 10pt "IBM Plex Serif"','italic 400 10pt "IBM Plex Serif"','italic 500 10pt "IBM Plex Serif"','italic 700 10pt "IBM Plex Serif"',
  '400 10pt "IBM Plex Sans Condensed"','500 10pt "IBM Plex Sans Condensed"','600 10pt "IBM Plex Sans Condensed"','700 10pt "IBM Plex Sans Condensed"','italic 600 10pt "IBM Plex Sans Condensed"'];
Promise.all(faces.map(f => document.fonts.load(f, 'aéÀ§«»—'))).then(() => document.fonts.ready).then(() => {
  PAGES.forEach(pg => { staticNotes(pg); fitTitle(pg); fit(pg); });
  edges();
  const st = {pages: PAGES.length, reste: 0, warn: WARN, mots: {}, k: {}};
  PAGES.forEach((p, i) => { st.mots[i + 1] = words(p.querySelector('.block').innerText); st.k[i + 1] = p.dataset.k; });
  document.getElementById('stats').textContent = JSON.stringify(st);
  views();
  document.documentElement.dataset.ready = '1';
});
