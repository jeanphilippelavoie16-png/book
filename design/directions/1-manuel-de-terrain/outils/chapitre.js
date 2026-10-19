
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
// Une note qui ne trouve aucun trou ne se perd plus (JP, 19 octobre 2026 : le ch. 04, dense, n'en posait aucune) : la
// mise en pages recommence, et cette note entre dans le fil du texte, après la fin de l'étape qu'elle nomme (INLINE,
// ANCRES) ; la pagination pousse le texte qui suit. Une seule note par page : celle qui arrive sur une page qui en porte
// déjà une attend la page suivante (attenteNotes), où elle se glisse après la fin du paragraphe coupé.
const NOTE_PLACES = [];
let NOTES_X = [];             // les notes de la section En plus, dans l'ordre du chapitre
let ANCRES = [];              // pour chaque note, la clé (data-k) du bloc après lequel elle entre dans le fil
const INLINE = new Map();     // notes posées dans le fil : indice → clé du bloc
let attenteNotes = [];        // notes du fil qui attendent la page suivante
// une page qui a cédé sa note du fil à une planche (story) compte comme si elle en portait une
const aUneNote = p => !!p.sansNote || !!p.bl.querySelector('.extra');
const renvois = x => (x.dataset.etapes || '').split(' ').filter(Boolean).map(Number);
const estTitre = el => /^H[1-6]$/.test(el.tagName) || (el.classList && el.classList.contains('kh'));
function ancresNotes(flux){
  // chaque bloc des histoires porte sa clé (histoire:rang), gardée par les clones et par les deux moitiés d'un
  // paragraphe coupé
  const blocs = [];
  flux.forEach(([id, kind]) => { kind = kind || id; const t = document.getElementById('story-' + id); if(t) [...t.content.children].forEach((n, i) => { n.dataset.k = id + ':' + i; blocs.push({kind, el: n, id}); }); });
  const num = el => { const s = el.querySelector && el.querySelector('.sn'); return s ? parseInt(s.textContent, 10) : NaN; };
  const texte = b => (b.kind === 'main' || b.kind === 'e') && b.el.tagName === 'P' && !b.el.classList.contains('kh');
  // la fin de l'étape : ses sous-étapes, ses tableaux et ses planches, jusqu'à l'étape ou au titre suivant
  const fin = i => { let j = i; while(j + 1 < blocs.length && blocs[j + 1].id === blocs[i].id && !estTitre(blocs[j + 1].el) && isNaN(num(blocs[j + 1].el))) j++; return j; };
  const sortir = i => {   // une étape de la série orange ou d'un encadré : la note attend le texte qui suit la série
    if(texte(blocs[i])) return i;
    let k = i; while(k < blocs.length && !texte(blocs[k])) k++;
    if(k >= blocs.length){ k = i; while(k > 0 && !texte(blocs[k])) k--; }
    return k;
  };
  const rangs = NOTES_X.map(x => {
    const e = renvois(x); if(!e.length) return -1;
    for(const a of e){ const i = blocs.findIndex(b => num(b.el) === a); if(i >= 0) return i; }
    let i = -1, d0 = Infinity;     // l'étape nommée n'est pas dans le chapitre : la plus proche
    blocs.forEach((b, k) => { const n = num(b.el); if(isNaN(n)) return; const d = Math.min(...e.map(a => Math.abs(a - n))); if(d < d0){ d0 = d; i = k; } });
    return i;
  });
  // une note qui ne nomme aucune étape : si elle nomme une section (« section 7, « Remplir le congélateur arrêté » »),
  // après le premier paragraphe de cette partie de la section ; sinon, le paragraphe de la procédure (ou de la section
  // nommée) le plus loin des autres notes
  const debut = Math.max(0, blocs.findIndex(b => !isNaN(num(b.el))));
  let sc = 0; const sec = blocs.map(b => { const h = b.el.matches && b.el.matches('h2.sec[data-n]') ? b.el : null; if(h) sc = +h.dataset.n; return b.kind === 'e' ? C.nv : sc; });
  const norm = t => t.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
  rangs.forEach((r, n) => {
    if(r >= 0) return;
    const m = ((NOTES_X[n].querySelector('.xtxt') || NOTES_X[n]).textContent || '').match(/section (\d+)(?:,\s*«\s*([^»]+?)\s*»)?/);
    if(m && m[2]){
      const h = blocs.findIndex((b, k) => sec[k] === +m[1] && estTitre(b.el) && norm(b.el.textContent) === norm(m[2]));
      if(h >= 0){ let k = h; while(k < blocs.length && !texte(blocs[k])) k++; if(k < blocs.length){ rangs[n] = k; return; } }
    }
    const loin = hors => { let best = -1, g0 = -Infinity;
      blocs.forEach((b, k) => { if(hors(k) || !texte(b)) return;
        const autres = rangs.filter(x => x >= 0); const g = autres.length ? Math.min(...autres.map(x => Math.abs(x - k))) : Math.abs(k - (debut + blocs.length) / 2) * -1;
        if(g > g0){ g0 = g; best = k; } });
      return best; };
    rangs[n] = (m && loin(k => sec[k] !== +m[1]) >= 0) ? loin(k => sec[k] !== +m[1]) : loin(k => k < debut);
  });
  return rangs.map(r => r < 0 ? null : blocs[fin(sortir(r))].el.dataset.k);
}
function fillExtras(p){
  if(!p || !EXTRAS.length || !(p.kind === 'text' || p.kind === 'open')) return false;
  if(aUneNote(p)) return false;    // une seule note par page : celle du fil y est déjà
  // le dernier cadre de texte de la page, même si ses notes de bas de page le suivent
  let fr = p.bl.lastElementChild;
  if(fr && fr.classList.contains('fnz')) fr = fr.previousElementSibling;
  // la variante d'urgence a son enveloppe (titre de section, filet noir) : la note va dans son texte ; jamais dans une
  // série orange
  if(fr && fr.classList.contains('s9wrap')) fr = [...fr.children].filter(c => c.classList.contains('frame')).pop() || fr;
  if(!fr || !fr.classList.contains('frame') || !fr.children.length) return false;
  const bas = p.bl.getBoundingClientRect().bottom + 0.5;
  // un cadre encore ouvert remplit la page et met tout son texte à gauche : on l'équilibre sur les deux colonnes, la
  // note vient à la fin
  const ouvert = !fr.classList.contains('auto');
  if(ouvert){ fr.classList.add('auto'); if(OVER(fr)){ fr.classList.remove('auto'); return false; } }
  const tient = [];
  // la note, le cadre et tout ce qui suit doivent rester dans le bloc : une note dans la variante d'urgence déborde de
  // son cadre sans que le cadre le dise (JP, 18 octobre 2026 : « l'encadré vert embarque sur les chiffres en bas »)
  const dansBloc = (x, cadre, page) => {
    const b = page.bl.getBoundingClientRect().bottom + 0.5;
    const r = x.getBoundingClientRect();
    return !OVER(cadre) && r.bottom <= b && cadre.getBoundingClientRect().bottom <= b
      && [...cadre.children].every(e => e.getBoundingClientRect().bottom <= b) && page.bl.lastElementChild.getBoundingClientRect().bottom <= b;
  };
  const tientIci = x => dansBloc(x, fr, p);
  EXTRAS.forEach(x => { fr.appendChild(x); if(tientIci(x)) tient.push(x); fr.removeChild(x); });
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
  // un trou ne reçoit une note que près de son étape : sur la page de l'étape, ou à deux pages de texte au plus (les
  // planches et le logigramme ne comptent pas) ; plus loin, la note passe dans le fil du texte, après son étape (JP :
  // « près de l'étape qu'elles nomment »)
  const TX = PAGES.filter(p => p.kind === 'text' || p.kind === 'open');
  NOTE_PLACES.forEach(c => { c.tient = c.tient.filter(x => {
    const e = renvois(x); if(!e.length) return true;
    const pe = TX.map((p, i) => [...p.bl.querySelectorAll('.sn')].some(s => e.includes(+s.textContent)) ? i : -1).filter(i => i >= 0);
    return !pe.length || Math.min(...pe.map(i => Math.abs(i - TX.indexOf(c.p)))) <= 2;
  }); });
  const choix = [];                      // [note, page]
  // les notes du fil comptent dans l'écart : les notes posées dans les trous se tiennent loin d'elles aussi
  const fil = PAGES.map((p, i) => aUneNote(p) ? i : -1).filter(i => i >= 0);
  const ecart = c => (choix.length || fil.length) ? Math.min(...choix.map(([, d]) => Math.abs(idx(d) - idx(c))), ...fil.map(i => Math.abs(i - idx(c)))) : 99;
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
      // après toute l'étape : ses puces, ses tableaux et ses figures ne se séparent pas de son premier paragraphe
      if(apres) while(apres.nextElementSibling && isNaN(num(apres.nextElementSibling)) && !estTitre(apres.nextElementSibling)) apres = apres.nextElementSibling;
    } else {
      // une note qui ne nomme pas d'étape : à la fin d'une partie, juste avant un intertitre, le plus près du milieu du
      // cadre ; jamais au milieu d'une liste (ch. 10, 19 octobre 2026 : la note coupait « Ce qui ne se remplace pas »)
      const mi = enf.length * 0.45, fins = enf.map((el, i) => i).filter(i => i < enf.length - 1 && estTitre(enf[i + 1]) && !estTitre(enf[i]));
      if(fins.length) apres = enf[fins.sort((a, b) => Math.abs(a - mi) - Math.abs(b - mi))[0]];
      else if(enf.length > 3) apres = enf[Math.floor(mi)];
    }
    if(apres && apres.nextElementSibling && /^H[1-6]$/.test(apres.tagName)) apres = apres.nextElementSibling;
    if(apres && apres !== enf[enf.length - 1]) c.fr.insertBefore(x, apres.nextElementSibling); else c.fr.appendChild(x);
    const ok = () => {
      const b = c.p.bl.getBoundingClientRect().bottom + 0.5;
      return !OVER(c.fr) && x.getBoundingClientRect().bottom <= b && [...c.fr.children].every(e => e.getBoundingClientRect().bottom <= b)
        && c.p.bl.lastElementChild.getBoundingClientRect().bottom <= b;
    };
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
  const horsNotes = !!f.closest('.orange, .danger');   // jamais de note dans la série orange ni dans un encadré
  // la note du fil qui attendait : sur cette page si elle n'en porte pas, après la fin du paragraphe coupé et après les
  // figures repoussées de la page d'avant (elles passent avant la note), ou après le premier titre et son paragraphe
  if(attenteNotes.length && !horsNotes && !aUneNote(p)){
    let k = 0;
    if(q[0] && q[0].classList && q[0].classList.contains('cont')) k = 1;
    while(q[k] && q[k].classList && q[k].classList.contains('fig')) k++;
    // après un intertitre et son premier paragraphe, mais jamais dans la section suivante (titre de section h2)
    const t0 = k; while(q[k] && estTitre(q[k]) && q[k].tagName !== 'H2') k++; if(k > t0) k++;
    // la note ne coupe pas la liste d'une étape : elle vient après ses puces
    for(let n = 0; n < 10 && q[k] && q[k].tagName === 'P' && q[k].classList.contains('li') && !q[k].querySelector('.sn'); n++) k++;
    q.splice(k, 0, attenteNotes.shift());
  }
  while(q.length){
    const b = q.shift();
    if(b.dataset && b.dataset.orpl){ pendingOr.push(b); continue; }
    // une note du fil sur une page qui en porte déjà une : elle attend la page suivante
    if(b.classList && b.classList.contains('extra') && (horsNotes || aUneNote(p))){ attenteNotes.push(b); continue; }
    if(b.dataset && b.dataset.plate === 'full'){
      // deux planches pleine page appelées sur la même page : la seconde tomberait deux pages après son appel. Le
      // paragraphe qui l'appelle, et ce qui le suit, passent après la première planche, si ça ne vide pas plus de la
      // moitié d'une colonne (sinon on le signale)
      const avant = pendingPlates.length + pendingOr.filter(x => x.dataset.plate === 'full').length;
      const ap = avant && !b.dataset.repousse ? f.querySelector('.appel[data-pl="' + b.dataset.id + '"]') : null;
      if(ap){
        b.dataset.repousse = '1';
        let blk = ap; while(blk.parentElement && blk.parentElement !== f) blk = blk.parentElement;
        const suite = []; for(let e = blk; e; e = e.nextElementSibling) suite.push(e);
        const h = suite.reduce((s, e) => s + Array.from(e.getClientRects()).reduce((t, r) => t + r.height, 0), 0);
        if(blk !== f.firstElementChild && h <= 0.5 * colH(f)){
          suite.forEach(e => f.removeChild(e)); syncNotes(f);
          q.unshift(...suite, b);
          break;
        }
        WARN.push(p.el.id + ' : planches ' + pendingPlates.concat(pendingOr).map(x => x.dataset.id).concat(b.dataset.id).join(' et ') + ' appelées sur la même page');
      }
      pendingPlates.push(b); continue;
    }
    // le logigramme vient tout de suite après le Matériel, et la procédure TOUJOURS après lui (JP, 18 octobre 2026 : « c'est
    // lui qu'on veut en premier » ; puis « la procédure va toujours APRÈS le diagramme ») : la page se ferme à l'ancre ;
    // nextPage() pose la double page sur la première page de gauche. L'assembleur choisit le côté d'ouverture du
    // chapitre qui évite la page de droite laissée blanche avant la double page.
    if(b.dataset && b.dataset.plate === 'spread'){ pendingSpreads.push(b); if(f.children.length) break; continue; }
    if(pendingSpreads.length){ q.unshift(b); break; }   // le texte attend que la double page soit posée
    f.appendChild(b); syncNotes(f);
    if(b.tagName === 'TABLE' && !b.dataset.cols){ colonnes(b); syncNotes(f); }
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
    // un long tableau qui déborde de peu : ses rangées se resserrent, et il tient sur la page
    if(b.tagName === 'TABLE' && !b.classList.contains('serre') && b.tBodies[0] && b.tBodies[0].rows.length >= 6){
      b.classList.add('serre'); syncNotes(f); if(!OVER(f)) continue; b.classList.remove('serre'); syncNotes(f);
    }
    f.removeChild(b); syncNotes(f);
    if(b.classList.contains('fig')){ p.deferred.push(b); if(!p.figRepoussee) p.figRepoussee = b; continue; }   // la figure attend, le texte continue
    if(b.classList.contains('extra')){ attenteNotes.unshift(b); continue; }   // la note aussi : page suivante
    let parts = null;
    if(b.tagName === 'P') parts = coupePara(b, f); else if(b.tagName === 'TABLE') parts = splitTableBal(b, f);
    // une planche pleine page attend la fin de cette page : le paragraphe ne se coupe pas de part et d'autre
    // de la planche (JP, 15 octobre 2026 : « là on l'insère pis ça coupe le texte en deux »). Il passe entier
    // après la planche, sauf s'il laisserait plus du tiers de la colonne vide.
    if(parts && (pendingPlates.length || pendingOr.length) && f.children.length && pli(parts[0], f) < 0.34 * colH(f)) parts = null;
    if(parts){ f.appendChild(parts[0]); syncNotes(f); q.unshift(parts[1]); } else q.unshift(b);
    break;
  }
  if(q.length){
    // une ligne seule entre les deux colonnes : la fin du cadre passe à la page suivante (jamais quand la page se ferme
    // sur l'ancre du logigramme : la suite attend la double page)
    if(!pendingSpreads.length) veuvesPage(f, q);
    // pas de titre ni d'amorce seule en bas de page : ni l'intertitre en italique (« Le montage. ») ni la ligne qui
    // annonce une liste (« Au retour, dans l'ordre : »)
    const amorce = el => el.tagName === 'P' && !el.classList.contains('cont') && (
      (el.children.length === 1 && el.firstElementChild.tagName === 'EM' && el.textContent.trim() === el.firstElementChild.textContent.trim())
      || (/:\s*$/.test(el.textContent) && el.getClientRects().length && el.getBoundingClientRect().height < 1.6 * ligne(f)));
    while(f.lastElementChild && (/^H[234]$/.test(f.lastElementChild.tagName) || f.lastElementChild.classList.contains('kh') || amorce(f.lastElementChild)))
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

/* ---------- jamais une ligne seule en haut ou en bas d'une colonne ----------
   Chromium n'applique ni orphans ni widows dans les colonnes (vérifié le 19 octobre 2026 : ch. 04, page 1, « (étape
   22). » seul en haut de la colonne de droite ; ch. 10, page 6, l'étape 9 coupée une ligne à gauche, une à droite, puis
   la page suivante). JP, 18 octobre 2026 : « il y a juste une ligne, c'est pas beau ». Le moteur compte les lignes
   lui-même : à la coupure de page (coupePara) et entre les deux colonnes d'un cadre (veuves, après la mise en pages). */
function lignesCols(el, f){   // le nombre de lignes du paragraphe dans chaque colonne du cadre, débordement compris
  const fr = f.getBoundingClientRect(), cs = getComputedStyle(f);
  const n = parseInt(cs.columnCount, 10) || 1, gap = parseFloat(cs.columnGap) || 0;
  const pas = n > 1 ? (fr.width + gap) / n : Infinity, cols = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {acceptNode: t =>
    t.parentElement.closest('.pmarge, .sn') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  const r = document.createRange();
  while(w.nextNode()){
    r.selectNodeContents(w.currentNode);
    for(const x of r.getClientRects()){
      if(x.width < 0.5 || x.height < 3) continue;
      const c = Math.max(0, Math.floor((x.left + x.width / 2 - fr.left) / pas)), m = x.top + x.height / 2;
      cols[c] = cols[c] || []; if(!cols[c].some(v => Math.abs(v - m) < 6)) cols[c].push(m);
    }
  }
  return Array.from(cols, a => a ? a.length : 0);
}
function finLigne(el, f, col, rang){   // l'indice (dans stops(el)) de la dernière espace de la ligne « rang » de la colonne
  const fr = f.getBoundingClientRect(), cs = getComputedStyle(f);
  const n = parseInt(cs.columnCount, 10) || 1, gap = parseFloat(cs.columnGap) || 0;
  const pas = n > 1 ? (fr.width + gap) / n : Infinity, r = document.createRange();
  const st = stops(el), pos = st.map(([t, i]) => {   // la lettre avant l'espace : elle se voit toujours
    r.setStart(t, Math.max(0, i - 1)); r.setEnd(t, i > 0 ? i : 1);
    const x = r.getClientRects()[0]; if(!x) return null;
    return {c: Math.max(0, Math.floor((x.left + x.width / 2 - fr.left) / pas)), m: x.top + x.height / 2};
  });
  const lg = []; pos.forEach(p => { if(p && p.c === col && !lg.some(v => Math.abs(v - p.m) < 6)) lg.push(p.m); });
  lg.sort((a, b) => a - b); if(rang < 0 || rang >= lg.length) return -1;
  let j = -1; pos.forEach((p, k) => { if(p && p.c === col && Math.abs(p.m - lg[rang]) < 6) j = k; });
  return j;
}
function coupePara(b, f){   // splitPara, sans ligne seule de part et d'autre de la coupure de page
  const parts = splitPara(b, f); if(!parts) return null;
  f.appendChild(parts[0]); f.appendChild(parts[1]);
  const L0 = lignesCols(parts[0], f), L1 = lignesCols(parts[1], f);
  const c = L0.length - 1, der = L0[c] || 0, apres = L1.reduce((s, x) => s + x, 0);
  const j = (der >= 3 && apres < 2) ? finLigne(parts[0], f, c, der - 2) : -1;
  f.removeChild(parts[1]); f.removeChild(parts[0]);
  if(der < 2) return null;                  // une ligne seule au bas de la page : le paragraphe passe entier
  if(apres >= 2) return parts;
  if(j < 1) return null;                    // deux lignes, puis une seule en haut de la page suivante : il passe entier
  const st = stops(b);                      // la dernière ligne du bas de la page passe avec la suite
  return [part(b, st[j], true), part(b, st[j], false)];
}
const seule = (e, f) => { const l = lignesCols(e, f); return (l.length === 2 && l[0] && l[1] && (l[0] === 1 || l[1] === 1)) ? l : null; };
function corrigeVeuve(el, L, f, vus){   // rend la fonction qui défait la correction
  // un long paragraphe : sa dernière ligne de gauche passe à droite avec la suite ; sinon il passe entier à droite
  const j = (L[1] === 1 && L[0] >= 3) ? finLigne(el, f, 0, L[0] - 2) : -1;
  vus.add(el);
  if(j >= 1){
    const st = stops(el), a = part(el, st[j], true), z = part(el, st[j], false);
    z.style.breakBefore = 'column'; f.replaceChild(a, el); a.after(z); vus.add(a); vus.add(z); syncNotes(f);
    return () => { if(a.parentNode === f){ f.replaceChild(el, a); z.remove(); } syncNotes(f); };
  }
  el.style.breakBefore = 'column'; syncNotes(f);
  return () => { el.style.breakBefore = ''; syncNotes(f); };
}
const resteSeule = (f, vus) => [...f.children].some(e => e.tagName === 'P' && vus.has(e) && seule(e, f));
function veuvesPage(f, q){   // pendant la mise en pages, quand la page continue : la fin du cadre passe à la page suivante
  if((parseInt(getComputedStyle(f).columnCount, 10) || 1) !== 2) return;
  const vus = new Set();
  for(let it = 0; it < 4; it++){
    const el = [...f.children].find(e => e.tagName === 'P' && !vus.has(e) && seule(e, f)); if(!el) return;
    const kids = [...f.children], sQ = q.slice();
    const annule = () => { while(f.firstChild) f.removeChild(f.firstChild); kids.forEach(k => f.appendChild(k));
      q.splice(0, q.length, ...sQ); el.style.breakBefore = ''; syncNotes(f); };
    corrigeVeuve(el, seule(el, f), f, vus);
    let pousse = false;
    while(OVER(f)){   // ce qui ne tient plus passe en tête de la page suivante, recollé à sa suite s'il était coupé
      const last = f.lastElementChild;
      if(!last || vus.has(last) || !(last.tagName === 'P' || /^H[234]$/.test(last.tagName))) break;
      f.removeChild(last); pousse = true;
      if(last.tagName === 'P' && q[0] && q[0].tagName === 'P' && q[0].classList.contains('cont') && q[0].dataset.k && q[0].dataset.k === last.dataset.k){
        const m = last.cloneNode(true), rest = q.shift();
        m.appendChild(document.createTextNode(' ')); rest.childNodes.forEach(n => m.appendChild(n.cloneNode(true)));
        q.unshift(m);
      } else q.unshift(last);
      syncNotes(f);
    }
    if(OVER(f)){ annule(); continue; }
    // le bas de la colonne se remplit avec le début du paragraphe repoussé
    if(pousse && q[0] && q[0].tagName === 'P'){
      const parts = coupePara(q[0], f);
      if(parts){ q.shift(); f.appendChild(parts[0]); syncNotes(f); q.unshift(parts[1]); if(OVER(f)){ annule(); continue; } }
    }
    if(resteSeule(f, vus)) annule();
  }
}
function veuves(){   // entre les deux colonnes d'un cadre, après la mise en pages (rien ne peut plus changer de page)
  PAGES.forEach(p => {
    if(p.kind !== 'text' && p.kind !== 'open') return;
    const tient = f => {
      const b = p.bl.getBoundingClientRect().bottom + 0.5;
      return !(!f.classList.contains('auto') && OVER(f)) && f.scrollWidth <= f.clientWidth + 1
        && [...p.bl.children, ...p.bl.querySelectorAll('.frame > *')].every(e => e.getBoundingClientRect().bottom <= b);
    };
    p.bl.querySelectorAll('.frame').forEach(f => {
      if((parseInt(getComputedStyle(f).columnCount, 10) || 1) !== 2) return;
      const vus = new Set();
      for(let it = 0; it < 8; it++){
        const el = [...f.children].find(e => e.tagName === 'P' && !vus.has(e) && seule(e, f)); if(!el) break;
        const defaire = corrigeVeuve(el, seule(el, f), f, vus);
        if(!tient(f) || resteSeule(f, vus)) defaire();
      }
    });
  });
}

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
function splitTableBal(tb, f){   // jamais une ni deux rangées seules en haut de la page suivante
  // un long tableau coupé se resserre des deux côtés de la coupure : plus de rangées sur la première page
  const long = tb.tBodies[0] && tb.tBodies[0].rows.length >= 6;
  if(long) tb.classList.add('serre');
  const parts = splitTable(tb, f); if(!parts){ if(long) tb.classList.remove('serre'); return null; }
  const A = parts[0].tBodies[0], B = parts[1].tBodies[0];
  // deux rangées ou moins après la coupure : un petit tableau passe entier à la page suivante ; un grand en laisse
  // trois au moins à la suite (JP, 18 octobre 2026 : « il y a juste une ligne, c'est pas beau »)
  if(B.rows.length <= 2){
    if(A.rows.length + B.rows.length <= 6){ if(long) tb.classList.remove('serre'); return null; }
    while(B.rows.length < 3 && A.rows.length > 3) B.insertBefore(A.rows[A.rows.length - 1], B.firstChild);
  }
  return parts;
}
// la largeur des colonnes d'un tableau : celle qui le rend le moins haut (les cases du texte long s'élargissent, les
// rangées se resserrent). On part des largeurs du constructeur et on déplace la largeur d'une colonne à l'autre tant
// que le tableau baisse.
const LARGEURS = new Map();   // d'une mise en pages à l'autre (les notes du fil la font recommencer) : le même calcul
function colonnes(tb){
  tb.dataset.cols = '1';
  const cols = [...tb.querySelectorAll(':scope > colgroup > col')];
  if(cols.length < 2 || !tb.tBodies[0] || tb.tBodies[0].rows.length < 3) return;
  let w = cols.map(c => parseFloat(c.style.width) || 100 / cols.length);
  const pose = v => cols.forEach((c, i) => { c.style.width = v[i].toFixed(1) + '%'; });
  const cle = tb.dataset.k && (tb.dataset.k + '|' + Math.round(tb.getBoundingClientRect().width));
  if(cle && LARGEURS.has(cle)){ pose(LARGEURS.get(cle)); return; }
  const haut = () => tb.getBoundingClientRect().height;
  let best = haut(), pas = 4;
  for(let it = 0; it < 60 && pas >= 1; it++){
    let mieux = null;
    for(let i = 0; i < w.length; i++) for(let j = 0; j < w.length; j++){
      if(i === j || w[i] - pas < 12) continue;
      const v = w.slice(); v[i] -= pas; v[j] += pas; pose(v);
      const h = haut(); if(h < best - 0.5){ best = h; mieux = v; }
    }
    if(mieux) w = mieux; else pas /= 2;
  }
  pose(w); if(cle) LARGEURS.set(cle, w);
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
  // les notes du fil : après le bloc qui finit leur étape
  INLINE.forEach((k, i) => { const j = q.findIndex(n => n.dataset && n.dataset.k === k); if(j >= 0) q.splice(j + 1, 0, NOTES_X[i].cloneNode(true)); });
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
    const snapQ = q.slice(), snapPl = pendingPlates.slice(), snapSp = pendingSpreads.slice(), snapOr = pendingOr.slice(), snapOT = orTop.slice(), snapAt = attenteNotes.slice();
    P.figRepoussee = null;
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
    // la note du fil cède sa place à une planche : la page a dû repousser une figure appelée après la note ; la note
    // passe à la page suivante et la page se refait, pour que la figure reste près de son appel
    if(r === 'full' && P.figRepoussee && !P.sansNote){
      const x = R.frame.querySelector(':scope > .extra'), fg = snapQ.indexOf(P.figRepoussee);
      if(x && (snapAt.includes(x) || (snapQ.includes(x) && (fg < 0 || snapQ.indexOf(x) < fg)))){
        R.box.remove(); const z = R.frame.nextElementSibling; if(z && z.classList.contains('fnz')) z.remove();
        q.splice(0, q.length, ...snapQ.filter(e => e !== x)); pendingPlates = snapPl; pendingSpreads = snapSp; pendingOr = snapOr; orTop = snapOT;
        attenteNotes = [x, ...snapAt.filter(e => e !== x)];
        P.sansNote = true; P.deferred = [];
        continue;
      }
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
    // la dernière page de texte du chapitre finit où le texte finit, même suivie des planches de la fin
    const derniere = !PAGES.slice(PAGES.indexOf(p) + 1).some(q => q.kind === 'text');
    if(p.kind === 'text' && !derniere && free(p) > 0.4 * br.height) WARN.push(p.el.id + ' : page à moitié vide');
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
  const FLUX = C.flux || [['main'], ['d'], ['e']];
  { const t = document.getElementById('extras'); NOTES_X = t ? Array.from(t.content.children).map((n, i) => { const c = n.cloneNode(true); c.dataset.xi = i; return c; }) : []; }
  ANCRES = ancresNotes(FLUX);
  const mettreEnPages = () => {
    BOOK.innerHTML = ''; WARN.length = 0; PAGES.length = 0; NOTE_PLACES.length = 0; P = null;
    pendingPlates = []; pendingSpreads = []; pendingOr = []; orTop = []; attenteNotes = [];
    EXTRAS = NOTES_X.filter((x, i) => !INLINE.has(i)).map(x => x.cloneNode(true));
    P = mkPage('open'); fitTitle();
    FLUX.forEach(f => story(f[0], f[1], f[2]));
    EXTRAS.push(...attenteNotes); attenteNotes = [];   // une note du fil restée en attente à la fin : un trou, s'il y en a
    fillExtras(P);
    placerNotes();
    orPages();
    if(orTop.length){ P = mkPage('text'); const fr = document.createElement('div'); fr.className = 'frame'; P.bl.appendChild(fr); orTop.forEach(b => fr.appendChild(b)); orTop = []; }
    if(pendingPlates.length){ const pl = pendingPlates; pendingPlates = []; pl.forEach(b => { const pp = mkPage('plate', b); pp.story = 'e'; }); }
    while(pendingSpreads.length){   // fin du chapitre : une page blanche au recto au besoin, puis la double page
      const t = mkPage('text'); t.story = 'e';
      if(t.el.classList.contains('verso')){ BOOK.removeChild(t.el); PAGES.pop(); }
      mkSpread(pendingSpreads.shift(), 'e');
    }
  };
  // d'abord les trous ; chaque note qui n'en trouve pas passe dans le fil du texte, et la mise en pages recommence
  for(let passe = 0; ; passe++){
    mettreEnPages();
    const sans = EXTRAS.filter(x => !INLINE.has(+x.dataset.xi) && ANCRES[+x.dataset.xi]);
    if(!sans.length || passe > NOTES_X.length) break;
    sans.forEach(x => INLINE.set(+x.dataset.xi, ANCRES[+x.dataset.xi]));
  }
  // une note qui n'a toujours pas de page (elle attendait encore à la fin du chapitre, toutes les pages qui suivent son
  // étape portant déjà une note, ou elle ne nomme rien qui se retrouve) : elle entre dans le fil sur la page de texte
  // sans note la plus proche de son étape, après un paragraphe de cette page ; une note se pose toujours (JP, 19 octobre
  // 2026)
  const essayes = new Set();
  for(let essai = 0; EXTRAS.length && essai < 3 * NOTES_X.length; essai++){
    const x = EXTRAS[0], xi = +x.dataset.xi, k0 = INLINE.get(xi) || ANCRES[xi];
    const el0 = k0 && BOOK.querySelector('[data-k="' + k0 + '"]');
    const i0 = el0 ? PAGES.findIndex(p => p.el.contains(el0)) : Math.floor(PAGES.length / 2);
    const bloc = p => { const l = [...p.bl.querySelectorAll('.frame > p[data-k]')].filter(e => !e.closest('.orange, .danger') && !essayes.has(e.dataset.k));
      return l[Math.floor((l.length - 1) / 2)]; };   // un paragraphe du milieu de la page : la note y reste
    const cand = PAGES.map((p, i) => i).filter(i => (PAGES[i].kind === 'text' || PAGES[i].kind === 'open') && !aUneNote(PAGES[i]) && bloc(PAGES[i]))
      .sort((a, b) => Math.abs(a - i0) - Math.abs(b - i0) || a - b);
    if(!cand.length) break;
    const k = bloc(PAGES[cand[0]]).dataset.k; essayes.add(k);
    INLINE.set(xi, k); mettreEnPages();
  }
  EXTRAS.forEach(x => WARN.push('encadré « En plus » sans place où se poser : ' + ((x.querySelector('.xtit') || {}).textContent || '')));
  veuves();
  finishPages(); edges(); orienteAppels(); checks();
  // où chaque note s'est posée : page, étapes de la page, l'étape et l'intertitre qui la précèdent, dans un trou ou dans
  // le fil
  const SN = [...BOOK.querySelectorAll('.sn')], TT = [...BOOK.querySelectorAll('.block h2, .block h3, .block h4, .block .kh')];
  const avant = (l, x) => l.filter(e => e.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING).pop();
  const notesPosees = [...document.querySelectorAll('.page .extra')].map(x => { const pg = x.closest('.page'); const p = PAGES.find(q => q.el === pg);
    const sn = avant(SN, x), tt = avant(TT, x);
    return {titre: (x.querySelector('.xtit') || {}).textContent || '', page: p ? p.n : null, fil: INLINE.has(+x.dataset.xi),
            etapes: p ? [...p.bl.querySelectorAll('.sn')].map(e => +e.textContent) : [], renvoie: renvois(x),
            apres: sn ? +sn.textContent : null, sous: tt ? (tt.querySelector('.t') || tt).textContent.replace(/\s+/g, ' ').trim().slice(0, 60) : ''}; });
  const st = {pages: PAGES.length, reste: 0, warn: WARN, mots: {}, notes: notesPosees};
  PAGES.forEach(p => st.mots[p.n] = words(p.bl.innerText));
  document.getElementById('stats').textContent = JSON.stringify(st);
  views();
  document.documentElement.dataset.ready = '1';
});
