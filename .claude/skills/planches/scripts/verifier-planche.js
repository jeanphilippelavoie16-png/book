#!/usr/bin/env node
// Contrôle d'une planche SVG du Grand Livre du Chalet.
// Usage : node verifier-planche.js images/planche-84-09.svg [autres.svg ...]
//
// Le script attrape ce qui ne se voit qu'à l'impression. Il ne juge pas le dessin.

const fs = require('fs');

const ROUGE_DANGER = '9b2c1e';
const NOIR = '1a1a1a';
const BLANC = 'ffffff';
const GRIS = ['e6e6e6', 'cfcfcf'];   // la charte : le gris du plan loin, le gris de la face à l'ombre
const EPAISSEURS = [2.4, 1.4, 0.7, 0.5];

function verifier(chemin) {
  const s = fs.readFileSync(chemin, 'utf8');
  const dur = [], mou = [], bon = [];

  // --- cadre ---
  const vb = s.match(/viewBox\s*=\s*"([\d.\s-]+)"/);
  if (!vb) dur.push('pas de viewBox');
  let W = 0, H = 0;
  if (vb) {
    const p = vb[1].trim().split(/\s+/).map(Number);
    W = p[2]; H = p[3];
    const w = (s.match(/\bwidth\s*=\s*"(\d+(?:\.\d+)?)"/) || [])[1];
    const h = (s.match(/\bheight\s*=\s*"(\d+(?:\.\d+)?)"/) || [])[1];
    if (w && Math.abs(Number(w) - W) > 0.5)
      dur.push(`width=${w} ne correspond pas au viewBox (${W}) : toutes les épaisseurs seront faussées`);
    if (h && Math.abs(Number(h) - H) > 0.5)
      dur.push(`height=${h} ne correspond pas au viewBox (${H})`);
    const formats = { '680x826': 'pleine page', '680x413': 'demi-page', '340x413': 'quart de page',
                      '680x440': 'demi-page (ancien gabarit, tolérée)' };
    const f = formats[`${W}x${H}`];
    if (f) bon.push(`format ${f}`);
    else if (W === 680 && H === 900)
      dur.push('680 × 900 : ancien gabarit pleine page, trop haut de 9 % — la planche mord dans la marge du bas. Refais en 680 × 826');
    else mou.push(`format ${W} × ${H} hors des trois formats du livre (680×826, 680×413, 340×413)`);
  }

  // --- accessibilité et identification ---
  if (!/<title>/.test(s)) dur.push('pas de <title> : la planche ne s’annonce pas');
  if (!/<desc>/.test(s)) mou.push('pas de <desc>');
  const t = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (t && !/^Planche \d+[a-z]?-\d+[a-z]?\.\s/.test(t))
    mou.push(`titre « ${t.slice(0, 50)} » : attendu « Planche NN-NN. Titre » (un point après le numéro, aucun tiret)`);
  if (t && t !== t.charAt(0) + t.slice(1) .replace(/([A-ZÀ-Þ]{3,})/g, m => m))
    ; // casse vérifiée plus bas

  // --- bloc de styles : il disparait dans les visualiseurs qui nettoient le SVG ---
  if (/<style[\s>]/.test(s))
    dur.push('bloc <style> : les visualiseurs le retirent et la planche s’ouvre blanche. Mets les attributs sur chaque forme');
  if (/context-stroke/.test(s))
    mou.push('context-stroke sur le marqueur : pas soutenu partout, ecris la couleur en dur');

  // --- fond ---
  if (!/<rect[^>]*fill\s*=\s*"#?(FFFFFF|fff|white)"/i.test(s))
    mou.push('pas de rectangle de fond blanc : illisible en mode sombre, gris à l’impression');

  // --- couleurs ---
  const couleurs = [...new Set((s.match(/#[0-9A-Fa-f]{3,6}/g) || []).map(c => c.slice(1).toLowerCase()))]
    .map(c => c.length === 3 ? c.split('').map(x => x + x).join('') : c);
  const interdites = couleurs.filter(c => ![NOIR, BLANC, ROUGE_DANGER, ...GRIS, '3a3a3a', '000000'].includes(c));
  if (interdites.length)
    dur.push(`couleurs hors palette : ${interdites.map(c => '#' + c).join(', ')} — la charte est noir, blanc, deux gris (#E6E6E6, #CFCFCF) et le rouge #9B2C1E`);
  // Le rouge marque ce qui compte : flèche du geste, zone dangereuse, point à contrôler, encadré
  // danger. Au-delà de quelques marques, il ne désigne plus rien.
  const marquesRouges = (s.match(new RegExp('<(?:path|circle|line|rect|ellipse|polyline|polygon)\\b[^>]*stroke="#' + ROUGE_DANGER, 'gi')) || []).length;
  if (marquesRouges > 8)
    mou.push(`${marquesRouges} marques rouges : le rouge ne désigne plus rien quand il est partout (une flèche du geste, un point à contrôler, une zone par vue)`);
  if (new RegExp('<(?:path|circle|rect|ellipse|polygon)\\b[^>]*fill="#' + ROUGE_DANGER + '"(?![^>]*marker)', 'i').test(s.replace(/<marker[\s\S]*?<\/marker>/g, '')))
    mou.push('aplat rouge : le rouge se met en trait, jamais en surface');

  // --- hiérarchie des traits ---
  // Un trait blanc n'est pas un trait : c'est le liseré qui garde une cote ou une ligne de
  // rappel lisible sur une hachure. On ne le compte pas dans la hiérarchie.
  const sansLiseres = s.replace(/<marker[\s\S]*?<\/marker>/g, '').replace(/<[a-z]+\b[^>]*stroke="#(?:FFFFFF|fff)"[^>]*>/gi, '');
  const ep = [...new Set((sansLiseres.match(/stroke-width\s*:\s*([\d.]+)|stroke-width\s*=\s*"([\d.]+)"/g) || [])
    .map(m => Number(m.replace(/[^\d.]/g, ''))))].sort((a, b) => b - a);
  if (ep.length === 0) dur.push('aucune épaisseur de trait déclarée');
  else {
    if (ep.length < 3)
      dur.push(`seulement ${ep.length} épaisseur(s) (${ep.join(', ')}) : un dessin sans hiérarchie est plat. Il en faut au moins trois parmi 2,4 / 1,4 / 0,7 / 0,5`);
    else bon.push(`${ep.length} niveaux de trait : ${ep.join(', ')}`);
    const fines = ep.filter(e => e < 0.5);
    if (fines.length) dur.push(`épaisseur ${fines.join(', ')} sous 0,5 : disparaît à l’impression`);
    // 2 = filet de l'encadré danger, 1.6 = pointe de flèche : deux exceptions du barème.
    const hors = ep.filter(e => !EPAISSEURS.includes(e) && e !== 2 && e !== 1.6 && e >= 0.5);
    if (hors.length) mou.push(`épaisseurs hors barème : ${hors.join(', ')} (barème : 2,4 / 1,4 / 0,7 / 0,5)`);
  }

  // --- le piège numéro un ---
  const paths = s.match(/<path\b[^>]*>/g) || [];
  const sansFill = paths.filter(p => !/fill\s*=/.test(p) && !/class\s*=\s*"[^"]*\b(c1|c2|c3|rap|danger)\b/.test(p));
  if (sansFill.length)
    dur.push(`${sansFill.length} <path> sans fill="none" ni classe de trait : le SVG remplit en noir par défaut, ça donne une tache`);

  // --- hachures dessinées à la main : elles débordent du contour ---
  // Une hachure professionnelle est un <pattern> posé en remplissage de la forme :
  // la forme la découpe, elle ne peut pas dépasser. Des dizaines de petites lignes
  // en diagonale, chacune avec ses bouts calculés, dépassent sur tout contour irrégulier.
  // On parcourt le document en suivant les groupes découpés (<g clip-path>) : une hachure
  // hors découpe dépasse à coup sûr, une hachure découpée dépasse quand la zone de découpe
  // ne coïncide pas exactement avec le contour dessiné.
  const estDiagonale = l => {
    const g = k => Number((l.match(new RegExp(`\\b${k}="([\\d.-]+)"`)) || [])[1]);
    const ep = Number((l.match(/stroke-width="([\d.]+)"/) || [])[1]);
    if (/stroke-dasharray/.test(l)) return false;   // ligne de rappel ou arête cachée, pas une hachure
    const dx = Math.abs(g('x2') - g('x1')), dy = Math.abs(g('y2') - g('y1'));
    return ep <= 0.7 && dx > 1 && dy > 1 && Math.abs(dx - dy) < Math.max(dx, dy) * 0.35;
  };
  let hachDecoupees = 0, hachLibres = 0;
  const pile = [];
  for (const t of s.match(/<g\b[^>]*>|<\/g>|<line\b[^>]*>/g) || []) {
    if (t.startsWith('<g')) pile.push(/clip-path/.test(t));
    else if (t === '</g>') pile.pop();
    else if (estDiagonale(t)) (pile.some(Boolean) ? hachDecoupees++ : hachLibres++);
  }
  if (hachLibres >= 3)
    dur.push(`${hachLibres} hachure(s) tracée(s) hors de toute découpe : elles dépassent du contour. Pose la hachure en <pattern>, en fill de la forme qui dessine le contour`);
  else if (hachDecoupees + hachLibres > 12)
    dur.push(`${hachDecoupees + hachLibres} hachures tracées une par une : elles ne tiennent que si la découpe épouse exactement le contour, et elle ne l'épouse presque jamais. Pose la hachure en <pattern>, en fill de la forme qui dessine le contour — elle ne peut plus dépasser`);

  // --- encadrés : le texte doit tomber au milieu de sa boîte ---
  try {
    const { largeur } = require('./mesure-texte');
    // Les rectangles dessinés dans une vue composée sont en coordonnées locales : on ne
    // les compare pas au texte de la page. Les encadrés, eux, sont posés hors des vues.
    let horsVues = '', prof = 0, dansVue = 0;
    for (const m of s.split(/(<g\b[^>]*>|<\/g>)/)) {
      if (/^<g\b/.test(m)) { prof++; if (!dansVue && /data-vue=/.test(m)) dansVue = prof; continue; }
      if (m === '</g>') { if (dansVue === prof) dansVue = 0; prof--; continue; }
      if (!dansVue) horsVues += m;
    }
    const rects = [...horsVues.matchAll(/<rect\b[^>]*>/g)].map(m => {
      const r = m[0], g = k => Number((r.match(new RegExp(`\\b${k}="([\\d.-]+)"`)) || [])[1]);
      return { x: g('x'), y: g('y'), w: g('width'), h: g('height'), fond: /fill="#?(FFFFFF|fff|white)"/i.test(r) && g('x') === 0 };
    }).filter(r => !r.fond && r.w > 60 && r.h > 20 && r.w < W - 10);
    for (const r of rects) {
      const dedans = [...s.matchAll(/<text\b([^>]*)>([^<]+)</g)].map(m => {
        const a = m[1], g = k => Number((a.match(new RegExp(`\\b${k}="([\\d.-]+)"`)) || [])[1]);
        const corps = g('font-size') || 13;
        return { x: g('x'), y: g('y'), corps, w: largeur(m[2], corps), anchor: /text-anchor="middle"/.test(a) };
      }).filter(t => !t.anchor && t.x >= r.x && t.x < r.x + r.w && t.y > r.y && t.y < r.y + r.h + 4);
      if (dedans.length < 1) continue;
      const gauche = Math.min(...dedans.map(t => t.x)) - r.x;
      const droite = r.x + r.w - Math.max(...dedans.map(t => t.x + t.w));
      const hautT = Math.min(...dedans.map(t => t.y - t.corps * 0.72));
      const basT = Math.max(...dedans.map(t => t.y + t.corps * 0.22));
      const mHaut = hautT - r.y, mBas = r.y + r.h - basT;
      if (droite < 0)
        dur.push(`texte qui déborde de son encadré de ${Math.round(-droite)} unités (boîte à x=${r.x}, y=${r.y}) : compose-le avec scripts/encadre.js`);
      else if (Math.abs(mHaut - mBas) > 6)
        dur.push(`encadré à x=${r.x}, y=${r.y} : ${Math.round(mHaut)} de marge en haut, ${Math.round(mBas)} en bas — il a l'air croche. Compose-le avec scripts/encadre.js`);
      else if (droite > gauche * 2 + 24)
        dur.push(`encadré à x=${r.x}, y=${r.y} : ${Math.round(gauche)} de marge à gauche, ${Math.round(droite)} à droite de la ligne la plus longue — le texte n'occupe pas sa boîte, elle a l'air vide d'un côté. Compose-le avec scripts/encadre.js`);
    }
  } catch (e) { /* mesure-texte absent : on saute ce contrôle */ }

  // --- texte ---
  const corps = [...new Set((s.match(/font-size\s*:\s*([\d.]+)px/g) || []).map(m => Number(m.replace(/[^\d.]/g, ''))))];
  const horsCorps = corps.filter(c => c !== 13 && c !== 12);
  if (horsCorps.length) mou.push(`corps de texte hors barème : ${horsCorps.join(', ')} px (le livre n’en a que deux : 13 et 12)`);
  // un texte pivoté : sur le <text> lui-même, ou dans un groupe pivoté qui contient du texte
  // (une main calquée tournée n'en contient pas)
  const groupesTexte = (s.match(/<g\b[^>]*transform\s*=\s*"[^"]*rotate[^>]*>(?:(?!<\/g>)[\s\S])*?<text/g) || []).length;
  if (/<text\b[^>]*transform\s*=\s*"[^"]*rotate/.test(s) || groupesTexte)
    mou.push('texte pivoté : illisible sur une planche imprimée, déplace la cote plutôt');

  const textes = [...s.matchAll(/<text[^>]*>([^<]+)</g)].map(m => m[1].trim()).filter(Boolean);
  const capitales = textes.filter(x => x.length > 3 && x === x.toUpperCase() && /[A-ZÀ-Þ]/.test(x));
  if (capitales.length) mou.push(`${capitales.length} texte(s) en capitales : le livre est en casse de phrase — « ${capitales[0].slice(0, 30)} »`);

  // typographie française
  const colle = textes.filter(x => /[a-zà-ÿ][;:!?»]/.test(x));
  if (colle.length) mou.push(`${colle.length} ponctuation(s) collée(s) : le français prend une espace avant ; : ! ? et »`);

  // --- coordonnées et cadre utile ---
  if (W && H) {
    const nb = [...s.matchAll(/\b(?:x|y|cx|cy|x1|y1|x2|y2)\s*=\s*"(-?[\d.]+)"/g)].map(m => Number(m[1]));
    if (nb.some(v => v < 0)) dur.push('coordonnée négative : l’élément sort du cadre sans prévenir');
    const xs = [...s.matchAll(/\b(?:x|cx|x1|x2)\s*=\s*"([\d.]+)"/g)].map(m => Number(m[1]));
    const ys = [...s.matchAll(/\b(?:y|cy|y1|y2)\s*=\s*"([\d.]+)"/g)].map(m => Number(m[1]));
    const maxY = Math.max(0, ...ys);
    if (xs.some(v => v > W)) dur.push('un élément dépasse la largeur du viewBox');
    if (maxY > H) dur.push('un élément dépasse la hauteur du viewBox');
    else if (H - maxY > 90) mou.push(`${Math.round(H - maxY)} unités de vide en bas : réduis la hauteur du viewBox`);
    // Une planche composée par composer-planche.js dessine ses vues dans des groupes
    // translatés : leurs coordonnées sont locales, et les marges sont garanties par le
    // compositeur. Le contrôle de marge ne vaut que pour une planche dessinée à la main.
    const composee = /data-vue=/.test(s);
    const marge = Math.min(...xs.filter(v => v > 0), ...ys.filter(v => v > 0));
    if (!composee && marge < 30) mou.push(`marge de ${Math.round(marge)} unités : il en faut 40, la planche respire mal`);
  }

  // --- renvois et échelle ---
  // le cercle rouge du point à contrôler n'est pas une pastille, même de rayon 9
  const pastilles = (s.match(/<circle[^>]*r\s*=\s*"9"[^>]*>/g) || []).filter(c => !/stroke="#9B2C1E"/i.test(c));
  const renvois = pastilles.length;
  // Une construction en plusieurs vues compte six renvois par vue.
  const parVue = {};
  for (const p of pastilles) { const v = (p.match(/data-vue="([^"]+)"/) || [])[1]; if (v) parVue[v] = (parVue[v] || 0) + 1; }
  const vuesTrop = Object.entries(parVue).filter(([, k]) => k > 6);
  if (Object.keys(parVue).length) {
    if (vuesTrop.length) dur.push(`vue(s) à plus de six renvois : ${vuesTrop.map(([v, k]) => `${v} (${k})`).join(', ')}`);
    else if (renvois) bon.push(`${renvois} renvoi(s) sur ${Object.keys(parVue).length} vue(s)`);
  }
  else if (renvois > 6) dur.push(`${renvois} renvois : passé six, la légende devient un paragraphe et le lecteur doit lire un pavé pour décoder l'image. Coupe, scinde en deux planches, ou renonce`);
  else if (renvois) bon.push(`${renvois} renvoi(s) numéroté(s)`);
  // Une échelle peut être chiffrée, ou donnée par un objet connu : un pas, une main, un couteau.
  const aEchelle = /\b\d+\s*(mm|cm|m|po|pi)\b/.test(s)
    || /échelle|\bpas\b|\bmain\b|couteau|pièce de vingt|2 ?× ?4/i.test(s);
  if (!aEchelle) mou.push('aucune cote ni mention d’échelle : sans repère de taille la planche est décorative');

  // --- pied de planche ---
  if (!/Planche\s+\d+[a-z]?-\d+/.test(s)) mou.push('pas de numéro de planche dans le dessin');

  // --- légende tassée : plusieurs renvois sur une ligne, séparés par des points médians ---
  const tassees = textes.filter(x => (x.match(/(^|·\s*)\d{1,2}\s+\S/g) || []).length >= 2);
  if (tassees.length)
    dur.push(`${tassees.length} ligne(s) de légende qui tassent plusieurs renvois avec des points médians (« ${tassees[0].slice(0, 44)}… ») : un renvoi par ligne, ou deux colonnes alignées — jamais un paragraphe`);

  return { chemin, dur, mou, bon };
}

let fautes = 0;
for (const f of process.argv.slice(2)) {
  if (!fs.existsSync(f)) { console.log(`\n${f}\n  introuvable`); fautes++; continue; }
  const r = verifier(f);
  console.log(`\n${r.chemin}`);
  r.bon.forEach(x => console.log(`  ok    ${x}`));
  r.mou.forEach(x => console.log(`  tiède ${x}`));
  r.dur.forEach(x => console.log(`  DUR   ${x}`));
  if (!r.dur.length && !r.mou.length) console.log('  rien à redire');
  fautes += r.dur.length;
}
console.log();
process.exit(fautes ? 1 : 0);
