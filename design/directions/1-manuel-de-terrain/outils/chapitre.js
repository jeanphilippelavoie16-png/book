
/* =====================================================================
   Moteur de chapitre (build_chapitre.py). Les fonctions au-dessus
   (OVER, splitPara, splitTable, noteZone, syncNotes) sont celles de
   interieur.tpl.html, recopiées à la construction. Ici : les pages se
   créent à la volée, trois histoires se suivent (texte courant, encadré
   danger, variante d'urgence), les planches pleine page prennent la page
   qui suit leur mention, la double page d'un logigramme la première page de
   gauche qui suit son ancre, les demi-planches et les photos flottent au
   premier endroit où elles tiennent, jamais au milieu d'un paragraphe.
   La série des premières minutes (marqueur {.orange}, build_chapitre.py) est
   une histoire de plus (genre « o ») coulée entre deux morceaux du texte
   courant ou de la variante d'urgence, dans l'ordre de C.flux.
   ===================================================================== */
const C = JSON.parse(document.getElementById('meta').textContent);
const BOOK = document.getElementById('book');
const WARN = [];
const PAGES = [];
let P = null;                 // page courante
let pendingPlates = [];       // planches pleine page qui attendent la fin de la page courante
let pendingSpreads = [];      // doubles pages (logigramme) qui attendent la prochaine page de gauche
let pendingOr = [];           // planches appelées dans la série orange : la page d'en face, ou la suivante
let orTop = [];               // demi-pages de l'orange qui ouvrent la prochaine page de texte
let EXTRAS = [];              // encadrés « En plus » (section En plus du chapitre) : ils remplissent les trous des pages
const DSVG = '<svg viewBox="0 0 34 30" aria-hidden="true"><path d="M17 1.5 L32.5 28.5 H1.5 Z" fill="#fff"/><path d="M15.2 10 H18.8 L18.1 20.5 H15.9 Z" fill="#9B2C1E"/><rect x="15.4" y="22.3" width="3.2" height="3.2" fill="#9B2C1E"/></svg>';
const PT = 96/72;

function mkPage(kind, plate){
  const n = PAGES.length + 1, side = n % 2 ? 'recto' : 'verso';
  const el = document.createElement('section'); el.className = 'page ' + side; el.id = 'p' + C.num + '-' + n;
  if(kind !== 'open') el.innerHTML = '<div class="rh"><div class="grp"><span class="fo">' + C.num + '-' + n + '</span><span class="ch">' + C.num + ' · ' + C.title + '</span></div><span class="to">' + C.tome + '</span></div>';
  const bl = document.createElement('div'); bl.className = 'block'; el.appendChild(bl);
  if(kind === 'open') bl.innerHTML = document.getElementById('open').innerHTML;
  if(kind === 'plate'){
    // le numéro et le titre en haut de la page, en évidence (JP, 16 octobre 2026) ; le dessin prend le reste
    const tete = document.createElement('div'); tete.className = 'pl-tete';
    tete.innerHTML = '<span class="pl-num">Planche ' + plate.dataset.id + '</span>' +
      (plate.dataset.titre ? '<span class="pl-titre"></span>' : '');
    if(plate.dataset.titre) tete.querySelector('.pl-titre').textContent = plate.dataset.titre;
    const img = document.createElement('img'); img.className = 'planche avec-tete'; img.src = plate.dataset.src; img.alt = 'Planche ' + plate.dataset.id;
    bl.appendChild(tete); bl.appendChild(img);
  }
  BOOK.appendChild(el);
  const p = {el, bl, kind, n, deferred: [], plate: plate ? plate.dataset.id : null};
  PAGES.push(p); return p;
}
function orPages(){   // les planches de l'orange : pleine page sur leur propre page ; demi-page et petite en haut de la
  // page qui suit, et le texte continue dessous
  const pl = pendingOr; pendingOr = [];
  pl.forEach(b => {
    b.removeAttribute('data-orpl');
    if(b.dataset.plate === 'full'){ const pp = mkPage('plate', b); pp.story = 'o'; } else orTop.push(b);
  });
}
// les notes « En plus » (JP, 18 octobre 2026 : « des notes laissées doucement dans le texte » ; « je veux pas qu'ils
// soient cordés » ; « plus naturel, dispersé »). Une note entre dans le cadre de texte qui ferme une page, à la suite
// du texte, dans sa colonne, une seule par page ; jamais sous une série orange, un encadré ou des notes de bas de page.
// Le placement ne change rien à la suite (la page se ferme de toute façon) : pendant la mise en pages, fillExtras
// relève seulement les pages qui ont de la place et les notes qui y tiennent ; placerNotes choisit à la fin, pour que
// chaque note tombe près de l'étape dont elle parle et loin des autres. Une note sans page ne s'imprime pas
// (avertissement).
const NOTE_PLACES = [];
function fillExtras(p){
  if(!p || !EXTRAS.length || !(p.kind === 'text' || p.kind === 'open')) return false;
  const fr = p.bl.lastElementChild;
  if(!fr || !fr.classList.contains('frame') || !fr.children.length) return false;
  const bas = p.bl.getBoundingClientRect().bottom + 0.5;
  // un cadre encore ouvert remplit la page et met tout son texte à gauche : on l'équilibre sur les deux colonnes, la
  // note vient à la fin
  const ouvert = !fr.classList.contains('auto');
  if(ouvert){ fr.classList.add('auto'); if(OVER(fr)){ fr.classList.remove('auto'); return false; } }
  const tient = [];
  EXTRAS.forEach(x => { fr.appendChild(x); if(!OVER(fr) && fr.getBoundingClientRect().bottom <= bas) tient.push(x); fr.removeChild(x); });
  if(ouvert) fr.classList.remove('auto');
  if(tient.length) NOTE_PLACES.push({p, fr, ouvert, tient});
  return false;
}
function placerNotes(){
  if(!EXTRAS.length) return;
  // où en est chaque page dans la procédure : ses étapes, ou la dernière étape vue avant elle
  let vu = 0; const pos = new Map();
  PAGES.forEach(p => {
    const s = [...p.bl.querySelectorAll('.sn')].map(e => parseInt(e.textContent, 10)).filter(n => n > 0);
    pos.set(p, s.length ? s : [vu]); if(s.length) vu = Math.max(vu, ...s);
  });
  const idx = c => PAGES.indexOf(c.p);
  const renvois = x => (x.dataset.etapes || '').split(' ').filter(Boolean).map(Number);
  const choix = [];                      // [note, page]
  const ecart = c => choix.length ? Math.min(...choix.map(([, d]) => Math.abs(idx(d) - idx(c)))) : 99;
  const cout = (x, c) => {
    const e = renvois(x), g = ecart(c);
    const pres = e.length ? Math.min(...e.map(a => Math.min(...pos.get(c.p).map(s => Math.abs(a - s))))) : 12 - Math.min(g, 10);
    return pres + (g < 3 ? 60 : 0);      // deux notes ont au moins deux pages entre elles quand c'est possible
  };
  // d'abord placer le plus de notes possible, puis les mettre au meilleur endroit : chaque choix doit laisser assez de
  // pages pour les notes qui restent (couplage maximal, par chemins augmentants)
  const couplage = (notes, pris) => {
    const m = new Map();
    const essaie = (x, vu) => {
      for(const c of NOTE_PLACES){
        if(pris.has(c) || vu.has(c) || !c.tient.includes(x)) continue;
        vu.add(c); if(!m.has(c) || essaie(m.get(c), vu)){ m.set(c, x); return true; }
      }
      return false;
    };
    return notes.filter(x => essaie(x, new Set())).length;
  };
  for(;;){
    const libres = EXTRAS.filter(x => !choix.some(([n]) => n === x));
    const pris = new Set(choix.map(([, c]) => c));
    const M = couplage(libres, pris);
    if(!M) break;
    const paires = [];
    libres.forEach(x => NOTE_PLACES.forEach(c => { if(!pris.has(c) && c.tient.includes(x)) paires.push([cout(x, c), x, c]); }));
    paires.sort((a, b) => a[0] - b[0]);
    const bon = paires.find(([, x, c]) => couplage(libres.filter(n => n !== x), new Set([...pris, c])) === M - 1);
    choix.push([bon[1], bon[2]]);
  }
  choix.sort((a, b) => idx(a[1]) - idx(b[1])).forEach(([x, c]) => {
    if(c.ouvert) c.fr.classList.add('auto');
    // la note se glisse après le paragraphe de l'étape dont elle parle (ou vers le milieu du texte si elle ne renvoie à
    // rien), pas toujours au bas de la colonne ; si le texte ne tient plus, elle va à la fin
    const enf = [...c.fr.children], e = renvois(x);
    const num = el => { const t = el.querySelector('.sn'); return t ? parseInt(t.textContent, 10) : NaN; };
    let apres = null;
    if(e.length){
      const d = el => Math.min(...e.map(a => Math.abs(a - num(el))));
      enf.filter(el => !isNaN(num(el))).forEach(el => { if(!apres || d(el) < d(apres)) apres = el; });
    } else if(enf.length > 3) apres = enf[Math.floor(enf.length * 0.45)];
    if(apres && apres.nextElementSibling && /^H[1-6]$/.test(apres.tagName)) apres = apres.nextElementSibling;
    if(apres && apres !== enf[enf.length - 1]) c.fr.insertBefore(x, apres.nextElementSibling); else c.fr.appendChild(x);
    const ok = () => !OVER(c.fr) && c.fr.getBoundingClientRect().bottom <= c.p.bl.getBoundingClientRect().bottom + 0.5;
    if(!ok()){ c.fr.appendChild(x); }
    if(!ok()){ c.fr.removeChild(x); if(c.ouvert) c.fr.classList.remove('auto'); return; }
    EXTRAS.splice(EXTRAS.indexOf(x), 1);
  });
}
function nextPage(){
  fillExtras(P);
  orPages();
  const pl = pendingPlates; pendingPlates = [];
  pl.forEach(b => { const pp = mkPage('plate', b); pp.story = P.story; });
  const avant = P ? P.story : 'main';
  P = mkPage('text');
  // une double page attend et la page qui vient est à droite : elle reste blanche (la procédure ne passe pas avant le
  // logigramme) ; l'assembleur évite ce cas en choisissant le côté d'ouverture du chapitre
  if(pendingSpreads.length && P.el.classList.contains('recto')){
    // la page de droite qui attend le logigramme prend les encadrés « En plus » plutôt que de rester blanche
    // une page qui ne porte que des encadrés compte comme blanche (JP : « un encadré vert qui occupe une page tout seul,
    // c'est inutile ») : l'assembleur choisit alors le côté d'ouverture qui l'évite
    if(!fillExtras(P)){ P.blanche = true; WARN.push(P.el.id + ' : page blanche avant le logigramme'); }
    else WARN.push(P.el.id + ' : page blanche avant le logigramme, remplie d\'encadrés seulement');
    P = mkPage('text');
  }
  // une double page commence toujours sur une page de gauche : posée dès que la page qui vient est un verso ;
  // sur un recto, le texte continue et la double page attend la page suivante (jamais de page blanche au milieu)
  if(pendingSpreads.length && P.el.classList.contains('verso')){
    BOOK.removeChild(P.el); PAGES.pop();
    mkSpread(pendingSpreads.shift(), avant);
    P = mkPage('text');
  }
  return P;
}
function mkSpread(b, story){   // le SVG du logigramme (build_chapitre.py, gabarit en ligne), une moitié par page
  const svg = document.getElementById(b.dataset.tpl).content.querySelector('svg');
  [0, 585].forEach(x => {
    const p = mkPage('spread'); p.story = story; p.spread = b.dataset.id; p.or = b.dataset.or === '1';
    p.el.classList.add('spread'); p.el.dataset.spread = b.dataset.id;
    const s = svg.cloneNode(true);
    s.setAttribute('viewBox', x + ' 0 585 738'); s.setAttribute('width', '8.125in'); s.setAttribute('height', '10.25in');
    s.style.cssText = 'position:absolute;left:0;top:0';
    p.el.insertBefore(s, p.el.firstChild);     // sous le titre courant, l'onglet et le pied
  });
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
    if(first) box.innerHTML = '<h2 class="sec s8" data-n="' + C.nd + '"><span class="n">' + C.nd + '</span><span class="t">Danger</span></h2>';
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
    if(first) box.innerHTML = '<h2 class="sec s9" data-n="' + C.nv + '"><span class="n">' + C.nv + '</span><span class="t">Variante d’urgence</span><span class="sub9">Sans courant, sans matériel acheté, sans personne à appeler</span></h2>';
    box.appendChild(frame);
  }
  p.bl.appendChild(box);
  return {box, frame};
}
function pour(f, q, p){
  if(orTop.length && !f.children.length && !pendingOr.length){ q.unshift(...orTop); orTop = []; }
  while(q.length){
    const b = q.shift();
    if(b.dataset && b.dataset.orpl){ pendingOr.push(b); continue; }
    if(b.dataset && b.dataset.plate === 'full'){ pendingPlates.push(b); continue; }
    // le logigramme vient tout de suite après le Matériel, et la procédure TOUJOURS après lui (JP, 18 octobre 2026 : « c'est
    // lui qu'on veut en premier » ; puis « la procédure va toujours APRÈS le diagramme ») : la page se ferme à l'ancre ;
    // nextPage() pose la double page sur la première page de gauche. L'assembleur choisit le côté d'ouverture du
    // chapitre qui évite la page de droite laissée blanche avant la double page.
    if(b.dataset && b.dataset.plate === 'spread'){ pendingSpreads.push(b); if(f.children.length) break; continue; }
    if(pendingSpreads.length){ q.unshift(b); break; }   // le texte attend que la double page soit posée
    f.appendChild(b); syncNotes(f);
    // une figure qui saute en haut de la colonne suivante laisse un trou blanc dans la colonne d'avant (JP, 16 octobre
    // 2026 : « gros trou blanc vide ») : le paragraphe suivant passe d'abord et remplit la colonne, la figure le suit
    if(!OVER(f) && b.classList && b.classList.contains('fig') && !b.classList.contains('demi') && (+b.dataset.recule || 0) < 3 && q.length){
      const prev = b.previousElementSibling;
      if(prev){
        const rb = b.getBoundingClientRect(), rp = prev.getBoundingClientRect(), rf = f.getBoundingClientRect();
        if(rb.left > rp.left + 20 && rf.bottom - rp.bottom > 0.15 * rf.height){
          f.removeChild(b); syncNotes(f); b.dataset.recule = (+b.dataset.recule || 0) + 1;
          const nxt = q.shift(); q.unshift(b); q.unshift(nxt); continue;
        }
      }
    }
    if(!OVER(f)) continue;
    f.removeChild(b); syncNotes(f);
    if(b.classList.contains('fig')){ p.deferred.push(b); continue; }   // la figure attend, le texte continue
    let parts = null;
    if(b.tagName === 'P') parts = splitPara(b, f); else if(b.tagName === 'TABLE') parts = splitTableBal(b, f);
    // une planche pleine page attend la fin de cette page : le paragraphe ne se coupe pas de part et d'autre
    // de la planche (JP, 15 octobre 2026 : « là on l'insère pis ça coupe le texte en deux »). Il passe entier
    // après la planche, sauf s'il laisserait plus du tiers de la colonne vide.
    if(parts && (pendingPlates.length || pendingOr.length) && f.children.length && pli(parts[0], f) < 0.34 * colH(f)) parts = null;
    if(parts){ f.appendChild(parts[0]); syncNotes(f); q.unshift(parts[1]); } else q.unshift(b);
    break;
  }
  if(q.length){
    // pas de titre ni d'amorce seule en bas de page
    while(f.lastElementChild && (/^H[234]$/.test(f.lastElementChild.tagName) || f.lastElementChild.classList.contains('kh')))
      q.unshift(f.removeChild(f.lastElementChild));
    // ni un début de section coupé : un titre suivi de moins de six lignes en bas du cadre passe à la page
    // suivante avec ce qui le suit, et le cadre garde son vide (JP, 16 octobre 2026 : « laisser un vide et
    // passer à l'autre page quand c'est de même »)
    const kids = [...f.children]; let i = -1;
    for(let k = kids.length - 1; k > 0; k--) if(/^H[234]$/.test(kids[k].tagName) || kids[k].classList.contains('kh')){ i = k; break; }
    if(i > 0){
      const hb = kids[i].getBoundingClientRect().bottom;
      const bas = Math.max(hb, ...kids.slice(i + 1).map(e => e.getBoundingClientRect().bottom));
      if(bas - hb < 6 * ligne(f)){
        const der = kids[kids.length - 1];
        if(der.tagName === 'P' && q[0] && q[0].tagName === 'P' && q[0].classList.contains('cont')){   // recoller le paragraphe coupé
          const rest = q.shift(); der.appendChild(document.createTextNode(' ')); while(rest.firstChild) der.appendChild(rest.firstChild);
        }
        for(let k = kids.length - 1; k >= i; k--) q.unshift(f.removeChild(kids[k]));
      }
    }
    syncNotes(f);
  }
  if(p.deferred.length){   // après la fin du paragraphe coupé, jamais au milieu
    const k = (q[0] && q[0].classList && q[0].classList.contains('cont')) ? 1 : 0;
    q.splice(k, 0, ...p.deferred); p.deferred = [];
  }
  return q.length ? 'full' : 'done';
}
function pli(el, f){   // hauteur qu'occuperait el dans le cadre f, colonnes comprises
  f.appendChild(el); const h = Array.from(el.getClientRects()).reduce((s, r) => s + r.height, 0); f.removeChild(el); return h;
}
function ligne(f){      // interligne du texte courant, en px
  const t = f.querySelector('p') || document.querySelector('.frame p');
  return (t && parseFloat(getComputedStyle(t).lineHeight)) || 17;
}
function colH(f){ return f.getBoundingClientRect().height || P.bl.getBoundingClientRect().height; }

/* ---------- l'appel de planche : une flèche rouge qui pointe vers le dessin ---------- */
const FLECHE = '<svg viewBox="0 0 18 10" aria-hidden="true"><path d="M0 3.4 H10.2 V0 L18 5 L10.2 10 V6.6 H0 Z"/></svg>';
// le repère : un cercle vectoriel, le chiffre centré par le SVG et non par la police (JP, 18 octobre : « les chiffres
// sont tout mal placés dans les bulles »)
const CERCLE = n => { const w = String(n).length > 1 ? 26 : 20;
  return '<svg class="rep" viewBox="0 0 ' + w + ' 20" aria-label="' + n + '"><rect x=".7" y=".7" width="' + (w - 1.4) + '" height="18.6" rx="9.3" fill="#fff" stroke="#1A1A1A" stroke-width="1.2"/>'
    + '<text x="' + (w / 2) + '" y="10.6" text-anchor="middle" dominant-baseline="middle">' + n + '</text></svg>'; };
function reperes(node){   // « repère 3 », « repères 7 et 8 », « repères 1 à 3 » : le cercle numéroté des planches
  // (JP, 16 octobre 2026 : « ajoute un symbole au lieu de dire repère 1, repère 2 »)
  const RX = /\brepères?\s(\d{1,2})((?:\s?(?:,|et|à)\s\d{1,2})*)/g;
  const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {acceptNode: n =>
    (n.parentElement && n.parentElement.closest('figure, figcaption, .fig, .rep')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  const todo = []; while(w.nextNode()){ RX.lastIndex = 0; if(RX.test(w.currentNode.nodeValue)) todo.push(w.currentNode); }
  todo.forEach(tn => {
    const s = tn.nodeValue; let html = '', last = 0, m; RX.lastIndex = 0;
    const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    while((m = RX.exec(s))){
      html += esc(s.slice(last, m.index));
      let out = CERCLE(m[1]);
      (m[2].match(/(,|et|à)\s(\d{1,2})/g) || []).forEach(p => { const q = p.match(/(,|et|à)\s(\d{1,2})/); out += (q[1] === 'à' ? '<span class="rep-a">à</span>' : ' ') + CERCLE(q[2]); });
      let ouv = '';   // la parenthèse ne reste pas seule en fin de ligne
      if(html.endsWith('(')){ html = html.slice(0, -1); ouv = '('; }
      let fer = '';
      if(s[m.index + m[0].length] === ')'){ fer = ')'; }
      html += '<span class="reps">' + ouv + out + fer + '</span>'; last = m.index + m[0].length + fer.length;
    }
    html += esc(s.slice(last));
    const sp = document.createElement('span'); sp.innerHTML = html; tn.parentNode.replaceChild(sp, tn);
  });
}
function appels(node){   // « planche 11-04 » dans le texte courant, jamais dans une légende
  const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {acceptNode: n =>
    (n.parentElement && n.parentElement.closest('figure, figcaption, .fig, .appel')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  const RX = /planches?\s(\d{2,3}[-\u2011]\d{2}[a-z]?)/g, todo = [];
  while(w.nextNode()) if(RX.test(w.currentNode.nodeValue)) todo.push(w.currentNode);
  todo.forEach(tn => {
    const frag = document.createDocumentFragment(); let s = tn.nodeValue, last = 0, m; RX.lastIndex = 0;
    while((m = RX.exec(s))){
      let avant = s.slice(last, m.index), par = avant.endsWith('(');   // la parenthèse ne reste pas seule en fin de ligne
      if(par) avant = avant.slice(0, -1);
      frag.appendChild(document.createTextNode(avant));
      const sp = document.createElement('span'); sp.className = 'appel'; sp.dataset.pl = m[1].replace('\u2011', '-');
      sp.innerHTML = FLECHE + '<span>' + m[0].replace(/\s/, '\u00a0') + '</span>';
      if(par){ const nb = document.createElement('span'); nb.style.whiteSpace = 'nowrap'; nb.append('(', sp); frag.appendChild(nb); }
      else frag.appendChild(sp);
      last = m.index + m[0].length;
    }
    frag.appendChild(document.createTextNode(s.slice(last))); tn.parentNode.replaceChild(frag, tn);
  });
}
function orienteAppels(){   // après la mise en pages : la flèche pointe vers la page de la planche
  document.querySelectorAll('.appel').forEach(a => {
    const pg = a.closest('.page'); const i = PAGES.findIndex(p => p.el === pg);
    const j = PAGES.findIndex(p => p.plate === a.dataset.pl);
    if(i < 0 || j < 0){ a.classList.add('ailleurs'); return; }
    const verso = pg.classList.contains('verso');
    if(j === i + 1 && verso) a.classList.add('face');           // en face, à droite
    else if(j === i - 1 && !verso) a.classList.add('face', 'g'); // en face, à gauche
    else if(j < i) a.classList.add('g');                          // plus haut dans le chapitre
    a.title = 'Planche ' + a.dataset.pl + ', page ' + C.num + '-' + PAGES[j].n;
  });
}
function splitTableBal(tb, f){   // jamais une rangée seule en haut de la page suivante
  const parts = splitTable(tb, f); if(!parts) return null;
  const A = parts[0].tBodies[0], B = parts[1].tBodies[0];
  if(B.rows.length === 1 && A.rows.length >= 4) B.insertBefore(A.rows[A.rows.length - 1], B.firstChild);
  return parts;
}
function finish(R, kind){
  // une fin d'histoire de quelques lignes ne se partage pas entre deux colonnes : elle reste dans la première
  const court = () => { if(R.frame.getBoundingClientRect().height < 6 * ligne(R.frame)) R.frame.classList.add("une-col"); };
  if(kind === 'main'){ R.frame.classList.add('auto'); court(); return; }
  R.box.classList.add('fin'); R.frame.classList.add('auto');
  if(kind === 'd' || kind === 'o'){ const dg = R.box.querySelector(kind === 'd' ? '.danger' : '.orange'); dg.classList.remove('full'); dg.querySelector('.dcut').classList.remove('on'); }
  if(kind === 'e') court();
}
function derniereTete(p){   // détache le titre qui finit la page, s'il est seul en bas
  const frs = p.bl.querySelectorAll('.frame'); const fr = frs[frs.length - 1];
  const l = fr && fr.lastElementChild;
  if(!l || !/^H[234]$/.test(l.tagName)) return null;
  fr.removeChild(l); syncNotes(fr);
  if(!fr.children.length){ const box = fr.closest('.rg') || fr; const z = fr.nextElementSibling; if(z && z.classList.contains('fnz')) z.remove(); box.remove(); }
  return l;
}
function story(id, kind, suite){   // kind : main, o, d, e ; suite : histoire reprise après la série orange (pas de second titre)
  kind = kind || id;
  const tpl = document.getElementById('story-' + id);
  const q = Array.from(tpl.content.children).map(n => n.cloneNode(true));
  if(!q.length) return;
  q.forEach(n => { if(!(n.classList && n.classList.contains('fig'))){ appels(n); reperes(n); } });
  // une série orange qui suit une autre série : les planches de celle-ci passent avant elle, à la prochaine page
  if(kind === 'o') while(q[0] && q[0].dataset && q[0].dataset.orpl) pendingOr.push(q.shift());
  const H = P.bl.getBoundingClientRect().height;
  let first = !suite, guard = 0, porte = false;   // porte : un titre vient d'être reporté en haut de cette page
  while(q.length && guard++ < 120){
    // les demi-pages de l'orange ouvrent la page, au-dessus de ce qui vient, même une autre série orange
    if(orTop.length && P.kind === 'text' && !P.bl.children.length){
      const fo = document.createElement('div'); fo.className = 'frame'; P.bl.appendChild(fo); orTop.forEach(b => fo.appendChild(b)); orTop = [];
    }
    const fr = free(P), fresh = P.kind === 'text' && !P.bl.children.length;
    // seuils de départ : l'encadré danger et la variante d'urgence ne commencent pas dans un fond de page
    if(first && !fresh && !porte && ((kind === 'd' && fr < 2.2 * 96) || (kind === 'e' && fr < 1.8 * 96) || (kind === 'main' && fr < 1.2 * 96) || (kind === 'o' && fr < 2.0 * 96))){
      // le titre resté seul au bas de la page d'avant (« 4 Procédure » avant la série orange) suit l'encadré
      const orph = derniereTete(P); nextPage();
      if(orph){ const R0 = region(P, 'main', false); R0.frame.appendChild(orph); syncNotes(R0.frame); finish(R0, 'main'); porte = true; }
      continue;
    }
    if(suite && guard === 1 && !fresh && fr < 1.2 * 96){ nextPage(); continue; }
    // une série orange qui suit les planches d'une autre série ne se fait pas couper par elles : elle commence sur la
    // page en cours seulement si elle y tient au complet ; sinon elle commence après les planches
    if(kind === 'o' && first && !fresh && pendingOr.length){
      const sQ = q.slice(), sPl = pendingPlates.slice(), sSp = pendingSpreads.slice(), sOr = pendingOr.slice(), sOT = orTop.slice();
      const R1 = region(P, kind, true), r1 = pour(R1.frame, q, P);
      if(r1 === 'done'){ finish(R1, kind); break; }
      R1.box.remove(); const z1 = R1.frame.nextElementSibling; if(z1 && z1.classList.contains('fnz')) z1.remove();
      q.splice(0, q.length, ...sQ); pendingPlates = sPl; pendingSpreads = sSp; pendingOr = sOr; orTop = sOT;
      nextPage(); continue;
    }
    P.story = kind;
    const snapQ = q.slice(), snapPl = pendingPlates.slice(), snapSp = pendingSpreads.slice(), snapOr = pendingOr.slice(), snapOT = orTop.slice();
    const R = region(P, kind, first);
    const r = pour(R.frame, q, P);
    if(!R.frame.children.length){
      if(fresh && !pendingSpreads.length){   // rien ne tient même sur une page vide : on force, et on le signale
        WARN.push(P.el.id + ' : bloc trop grand, ' + (q[0].textContent || q[0].className).slice(0, 40));
        R.frame.appendChild(q.shift()); first = false;
        if(!q.length){ finish(R, kind); break; }
        nextPage(); continue;
      }
      R.box.remove(); const z = R.frame.nextElementSibling; if(z && z.classList.contains('fnz')) z.remove();
      q.splice(0, q.length, ...snapQ); pendingPlates = snapPl; pendingSpreads = snapSp; pendingOr = snapOr; orTop = snapOT;
      nextPage(); continue;
    }
    // l'encadré danger ne se coupe pas s'il tiendrait entier sur la page suivante
    if(kind === 'd' && first && r === 'full' && !fresh && fr < 0.62 * H){
      R.box.remove(); q.splice(0, q.length, ...snapQ); pendingPlates = snapPl; pendingSpreads = snapSp; pendingOr = snapOr; orTop = snapOT; nextPage(); continue;
    }
    first = false;
    if(r === 'done'){ finish(R, kind); break; }
    nextPage();
  }
}

/* ---------- après la coulée : pieds de page, sommaire, renvois, tranche ---------- */
function ladder(on, label, folio){
  let lis = '';
  Object.keys(C.secs).forEach(k => { lis += '<li class="' + (on.has(+k) ? 'on' + (+k === C.nd ? ' d' : '') : '') + '">' + k + '</li>'; });
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
    let label = (on.has(C.nd) && on.has(C.nv)) ? C.secs[String(C.nd)] + ' · ' + C.secs[String(C.nv)] : (C.secs[String(mx)] || '');
    if(p.plate) label += ' · Planche ' + p.plate;
    if(p.spread) label = 'Logigramme';
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
  // page qui porte la série des premières minutes : l'onglet de tranche passe à l'orange (couleur.css, .page.or),
  // et la série se voit en haut de la gouttière, livre fermé, à la même hauteur dans tout le tome
  PAGES.forEach(p => { if(p.el.querySelector('.block .orange') || (p.plate && p.story === 'o') || p.or) p.el.classList.add('or'); });
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
  { const t = document.getElementById('extras'); EXTRAS = t ? Array.from(t.content.children).map(n => n.cloneNode(true)) : []; }
  P = mkPage('open'); fitTitle();
  (C.flux || [['main'], ['d'], ['e']]).forEach(f => story(f[0], f[1], f[2]));
  fillExtras(P);
  placerNotes();
  EXTRAS.forEach(x => WARN.push('encadré « En plus » sans trou où se poser : ' + ((x.querySelector('.xtit') || {}).textContent || '')));
  orPages();
  if(orTop.length){ P = mkPage('text'); const fr = document.createElement('div'); fr.className = 'frame'; P.bl.appendChild(fr); orTop.forEach(b => fr.appendChild(b)); orTop = []; }
  if(pendingPlates.length){ const pl = pendingPlates; pendingPlates = []; pl.forEach(b => { const pp = mkPage('plate', b); pp.story = 'e'; }); }
  while(pendingSpreads.length){   // fin du chapitre : une page blanche au recto au besoin, puis la double page
    const t = mkPage('text'); t.story = 'e';
    if(t.el.classList.contains('verso')){ BOOK.removeChild(t.el); PAGES.pop(); }
    mkSpread(pendingSpreads.shift(), 'e');
  }
  finishPages(); edges(); orienteAppels(); checks();
  const st = {pages: PAGES.length, reste: 0, warn: WARN, mots: {}};
  PAGES.forEach(p => st.mots[p.n] = words(p.bl.innerText));
  document.getElementById('stats').textContent = JSON.stringify(st);
  views();
  document.documentElement.dataset.ready = '1';
});
