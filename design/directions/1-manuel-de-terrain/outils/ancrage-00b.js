
/* =====================================================================
   00b — acheter par priorité. Le texte coule dans le moteur de chapitre
   (chapitre.js, non modifié : pages créées à la volée, tableaux coupés
   entre les rangées avec leur en-tête répété). Ce fichier est collé APRÈS
   le moteur, dans la même fonction : la déclaration de finishPages ci-
   dessous remplace celle du moteur (en JavaScript, la dernière déclaration
   d'une fonction dans une portée gagne), le reste du moteur ne bouge pas.
   Ce qui change par rapport à un chapitre au gabarit :
     - pied de page : l'échelle des quatre paliers, et non des neuf sections ;
     - onglet de tranche à la hauteur du palier, sur chaque page où il est ;
     - « Ce qui remplace… » : la bande sombre de la variante d'urgence sur la
       tranche, sur toute la hauteur des onglets ;
     - sommaire de l'ouverture : la page où commence chaque section ;
     - les paliers 2 à 4, et « Ce qui remplace… », commencent sur une page neuve :
       une page ne porte jamais deux onglets, et l'onglet du palier 2 ne
       tombe jamais sur la fin du palier 1 (pour, ci-dessous) ;
     - une liste à cocher se coupe dès la première rangée (splitTable) : les
       rangées sont hautes, en attendre deux laissait des fonds de page vides ;
       la suite d'une suite garde sa mention « Le tableau continue… ».
   ===================================================================== */
const SAUT = 'h2.palier:not(.pal1), h2[data-sec="r"]';   // le palier 1 suit « Comment lire », qui n'a pas d'onglet
function pour(f, q, p){
  while(q.length){
    if(f.children.length && q[0].matches && q[0].matches(SAUT)) return 'full';   // palier : page neuve
    const b = q.shift();
    if(b.dataset && b.dataset.plate === 'full'){ pendingPlates.push(b); continue; }
    f.appendChild(b); syncNotes(f);
    if(!OVER(f)) continue;
    f.removeChild(b); syncNotes(f);
    if(b.classList.contains('fig')){ p.deferred.push(b); continue; }
    let parts = null;
    if(b.tagName === 'P') parts = splitPara(b, f); else if(b.tagName === 'TABLE') parts = splitTableBal(b, f);
    if(parts){ f.appendChild(parts[0]); syncNotes(f); q.unshift(parts[1]); } else q.unshift(b);
    break;
  }
  if(q.length){
    while(f.lastElementChild && (/^H[234]$/.test(f.lastElementChild.tagName) || f.lastElementChild.classList.contains('kh')))
      q.unshift(f.removeChild(f.lastElementChild));
    syncNotes(f);
  }
  if(p.deferred.length){
    const k = (q[0] && q[0].classList && q[0].classList.contains('cont')) ? 1 : 0;
    q.splice(k, 0, ...p.deferred); p.deferred = [];
  }
  return q.length ? 'full' : 'done';
}
function splitTable(tb, f){
  const rows = Array.from(tb.tBodies[0].rows);
  const mk = (rs, kind) => { const t = tb.cloneNode(false); const cg = tb.querySelector('colgroup'); if(cg) t.appendChild(cg.cloneNode(true));
    if(kind === 'first'){ t.classList.remove('suite'); const cap = document.createElement('caption'); cap.className = 'tsuite'; cap.textContent = 'Le tableau continue page suivante'; t.appendChild(cap); }
    t.appendChild(tb.tHead.cloneNode(true)); const b = document.createElement('tbody'); rs.forEach(r => b.appendChild(r.cloneNode(true))); t.appendChild(b);
    if(kind === 'rest') t.classList.add('suite'); return t; };
  let best = 0;
  for(let k = 1; k < rows.length; k++){ const t = mk(rows.slice(0, k), 'first'); f.appendChild(t); syncNotes(f); const ok = !OVER(f); f.removeChild(t); syncNotes(f); if(ok) best = k; else break; }
  if(best < 1) return null;
  return [mk(rows.slice(0, best), 'first'), mk(rows.slice(best), 'rest')];
}
function finishPages(){
  const S = C.sections || {};
  const PAL = ['p1', 'p2', 'p3', 'p4'];
  const lab = s => PAL.includes(s) ? 'Palier ' + s.slice(1) + ' · ' + (S[s] || '') : (S[s] || '');
  const tabTop = n => (C.tabtop + (n - 1) * C.tabpas).toFixed(3) + 'in';
  const pk = {'Maison': 'm', 'Chalet': 'c', 'Les deux': '2'}[C.lieu] || '2';
  let cur = null; const start = {};
  PAGES.forEach(p => {
    p.el.classList.add('anc', 'a0b');
    const on = new Set();
    const flow = p.el.querySelectorAll('.block .frame > *');
    const startsNew = flow.length && flow[0].matches('[data-sec]');
    if(cur && !startsNew) on.add(cur);
    p.el.querySelectorAll('.block [data-sec]').forEach(h => { const s = h.dataset.sec; on.add(s); cur = s; if(!start[s]) start[s] = p.n; });
    // onglets : chaque palier présent sur la page ; l'ouverture les porte tous (clé des onglets)
    const pals = p.kind === 'open' ? PAL : PAL.filter(s => on.has(s));
    pals.forEach(s => p.el.insertAdjacentHTML('beforeend', '<div class="ak-tab pal' + s.slice(1) + '" style="top:' + tabTop(+s.slice(1)) + '"><span>' + s.slice(1) + '</span></div>'));
    if(on.has('r')){
      // la bande sombre de la variante d'urgence : du titre de la section (ou du haut du bloc) au pied du bloc,
      // et elle s'arrête au titre de la section suivante s'il est sur la même page
      const pr = p.el.getBoundingClientRect(), br = p.el.querySelector('.block').getBoundingClientRect();
      const h = p.el.querySelector('.block [data-sec="r"]'), nx = p.el.querySelector('.block [data-sec="u"]');
      const top = h ? h.getBoundingClientRect().top : br.top, bot = nx ? nx.getBoundingClientRect().top - 8 : br.bottom;
      const e = document.createElement('div'); e.className = 'edge ak-r';
      e.style.top = (top - pr.top) + 'px'; e.style.height = (bot - top) + 'px';
      p.el.appendChild(e);
    }
    const last = [...on].pop();
    let lis = '';
    PAL.forEach(s => { lis += '<li class="pal' + s.slice(1) + (on.has(s) ? ' on' : '') + '">' + s.slice(1) + '</li>'; });
    const label = lab(last) || '';
    // « 00b » garde sa minuscule dans le titre courant, qui est en capitales
    p.el.querySelectorAll('.rh .fo, .rh .ch').forEach(e => { e.innerHTML = e.innerHTML.replace(/\b00b\b/g, '00<span class="minus">b</span>'); });
    p.el.insertAdjacentHTML('beforeend', '<div class="ft">' + (p.kind === 'open' ? '<span class="fo-ft">' + C.num + '-' + p.n + '</span>' : '')
      + '<div class="lad"><ol>' + lis + '</ol><span class="lab">' + label + '</span></div>'
      + '<span class="lieu-ft"><i class="ak ak-' + pk + '"></i>Lieu · ' + C.lieu + '</span></div>');
  });
  document.querySelectorAll('.toc li[data-s]').forEach(li => { const s = li.dataset.s; li.querySelector('.f').textContent = start[s] ? C.num + '-' + start[s] : ''; });
  PAGES.forEach((p, i) => {
    const nxt = PAGES.slice(i + 1).find(q => q.kind === 'text');
    p.el.querySelectorAll('caption.tsuite').forEach(c => { if(nxt && nxt.n !== p.n + 1) c.textContent = 'Le tableau continue page ' + C.num + '-' + nxt.n; });
  });
}
