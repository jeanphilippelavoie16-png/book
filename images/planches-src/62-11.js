// Planche 62-11 — la longe, en place et levée.
// Chapitre 62, tableau 5.3 (« Longe | Longissimus dorsi | … nappe dorsale de gras sur le dessus »),
// § 5.5 (« Nappe dorsale, de la croupe aux épaules | Gras ferme, en feuille ») et § 9, étape 4
// (« Un trait de couteau serré contre les apophyses de l'épine, un deuxième le long des côtes, et le
// muscle se décolle en pain sur toute sa longueur »). Documentation : suivi/62-documentation-planches.md,
// section 14 (ce qui est établi vue par vue), section 2 (conventions), section 3 (écart n° 5 : le
// grain), section 5 et « Base commune » (la carcasse commune, images/planches-src/_carcasse-orignal.js).
// Figures regardées : ellenberger-rind-t13 (squelette du bœuf vu de dessus : côtes, omoplates, ailes
// de l'ilium), ellenberger-rind-t12 (le dos vu de dessus), nmsu-cr508-fig08 (les trois traits sur
// le dos du cerf), usda-imps-coupe-5e-6e-cote (la longe sous l'omoplate), usda-imps-coupe-12e-13e
// (la forme de la section), acia-boeuf-14.
//
// Vue 1 — vu de dessus, en plongée stricte (demande de l'ancien plan 37-11) : la colonne au centre,
//   les pointes des apophyses épineuses, une longe de chaque côté, du cou au devant du bassin, entre
//   les épines et le coude des côtes (NMSU fig. 8 ; SISSON) ; les omoplates par-dessus, la longe en
//   tireté dessous (IMPS 7.3.1) ; la dernière côte et les ailes de l'ilium. Même échelle et même
//   repère en long que la vue 2 : les os se répondent d'une vue à l'autre. La LARGEUR de ce plan n'a
//   aucune source d'orignal ni de cervidé : elle est relevée sur le bœuf (ellenberger-rind-t13),
//   ramenée aux longueurs de la carcasse commune. Aucune cote.
// Vue 2 — de profil gauche, sur la carcasse commune (le module) : la longe en trame par-dessus les
//   os ; ① le trait le long des apophyses épineuses, du bassin vers le cou (NMSU cut 2, « cut forward
//   […] until you reach the base of the neck ») ; ② le trait au coude des côtes (NMSU cut 3), sans
//   flèche : aucune source ne donne son sens ; ③ le trait devant la cuisse, du flanc jusqu'à l'épine
//   (NMSU cut 1, « extend the cut all the way to the backbone ») ; la flèche de décollement, de
//   l'arrière vers l'avant (ch. 65, étape 9 ; NMSU fig. 10 « continuing forward »). La patte avant est
//   déjà levée à ce moment (ch. 62, étape 3) : l'omoplate n'est pas dessinée.
// Vue 3 — la longe sortie : un pain long, vu de trois quarts, en prisme à trois faces (SISSON :
//   « it has the form of a three-sided prism ») ; son épaisseur le long du pain reprend le contour
//   de la longe du module (le plus épais vers l'arrière de la cage, à peu près constant dans les
//   lombes : GUELPH) ; la nappe de gras sur le dessus, de la croupe aux épaules (ch. 62 § 5.5 ; IMPS
//   109A), en trame de points ; le bout arrière coupé devant la cuisse, la chair en trame ; le grain
//   en une seule famille de flèches, dans la longueur, légèrement obliques (GUELPH : « at an acute
//   angle to the vertebral column », écart n° 5). L'inclinaison vers l'avant et le bas suit les
//   attaches de SISSON (origine sur les épines et l'ilium, insertion sur les apophyses transverses
//   et les côtes ; « passes forward and downward ») : aucun angle n'est établi, il n'est pas chiffré.
//
// NON ÉTABLI, donc pas dessiné : l'épaisseur du gras (bande mince, sans mesure) ; la longueur de la
// longe ; où elle finit exactement vers le cou (le bout avant reprend l'amincissement du module et
// s'arrondit, sans détail : ni division, ni petit muscle qui s'en sépare) ;
// l'angle des fibres. La membrane argentée n'est pas dessinée : la section 14 la place « dessous »,
// le ch. 65 (étape 12) « sur sa face extérieure » ; à trancher avant de la dessiner.
const C = require('./_carcasse-orignal');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
const f1 = v => Math.round(v * 10) / 10;
const dP = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
const plein = (ep, fond = BLANC) => `fill="${fond}" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"`;
const COUTEAU = trait(1.4, ' stroke-dasharray="6 3.5"');
const CACHE = trait(0.7, ' stroke-dasharray="4 3"');
const HALO = `fill="none" stroke="${BLANC}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"`;

// Trames de la planche : la longe (traits fins à 45°, celle de la carcasse commune) et le gras (points).
const trames = id => [
  `<pattern id="${id}-chair" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  `<pattern id="${id}-gras" width="4.2" height="4.2" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="${NOIR}" stroke="none"/><circle cx="3.1" cy="3.1" r="0.8" fill="${NOIR}" stroke="none"/></pattern>`,
].join('');

// interpolation linéaire dans une liste [[x, valeur], …] triée en x
const interp = (liste, x) => {
  if (x <= liste[0][0]) return liste[0][1];
  for (let i = 1; i < liste.length; i++) {
    const [xa, ya] = liste[i - 1], [xb, yb] = liste[i];
    if (x <= xb) return ya + (yb - ya) * (x - xa) / (xb - xa);
  }
  return liste[liste.length - 1][1];
};
const lisse = (pts, ferme = false, pas = 3) => C.dense(pts, pas, ferme);

// ─── Le cadre commun des vues 1 et 2 ────────────────────────────────────────────────────────
// Même échelle et même abscisse : un point du dos a le même x dans le plan et dans le profil.
const K = 0.55;
const X0 = 560, X1 = 1500;          // du bas du cou à la fesse, dans le repère U du module
const Y0 = 120, Y1 = 490;           // le profil : du garrot au-dessus du ventre (la vue coupe les pattes)

// ─── Vue 1 : le plan (x le long du corps, repère U ; s de côté, + vers le bas = côté gauche) ──
// Demi-largeur du corps, relevée sur ellenberger-rind-t13 (bœuf) et ramenée aux repères du module :
// épaules au droit de la pointe de l'épaule, cage la plus large vers la 13e côte, lombes plus
// étroites, pointe de la hanche aussi large que la cage, puis la croupe qui se referme.
const CORPS_PLAN = [[598, 49], [620, 58], [638, 86], [656, 104], [690, 116], [740, 119], [800, 122], [860, 128],
  [920, 135], [980, 137], [1030, 135], [1080, 127], [1130, 123], [1170, 128], [1200, 136], [1222, 136],
  [1250, 130], [1300, 122], [1350, 114], [1400, 106], [1440, 101], [1466, 94], [1480, 72], [1486, 38]];
// la longe (côté gauche) : bord interne contre les épines, bord externe au coude des côtes ; elle
// grossit vers l'arrière de la cage et garde sa largeur dans les lombes ; elle finit au devant de
// l'aile de l'ilium
const LONGE_PLAN = [[1200, 7], [1100, 7], [1000, 7], [900, 7], [800, 7], [700, 7], [664, 9], [654, 16], [656, 27],
  [670, 38], [697, 48], [732, 56], [772, 63], [812, 70], [862, 80], [912, 88], [962, 92], [1012, 91], [1062, 89],
  [1122, 88], [1172, 87], [1188, 84, 'c'], [1191, 60], [1195, 32], [1200, 7, 'c']];
const BORD_LONGE = [[652, 16], [670, 38], [697, 48], [732, 56], [772, 63], [812, 70], [862, 80], [912, 88],
  [962, 92], [1012, 91], [1062, 89], [1122, 88], [1190, 86]];
// l'omoplate vue de dessus : la pointe de l'épaule en avant et en dehors, le bord du cartilage en
// arrière et en dedans, près des épines (ellenberger-rind-t13, n° 1 à 5 ; même étendue en long que
// l'omoplate du module)
const OMOPLATE_PLAN = [[650, 96, 'c'], [672, 106], [700, 104], [760, 90], [820, 72], [852, 56, 'c'], [846, 42],
  [800, 36], [750, 36], [706, 40, 'c'], [690, 56], [668, 80]];
const CARTILAGE_PLAN = [[712, 48], [750, 44], [800, 44], [845, 52]];
const EPINE_OMO_PLAN = [[664, 96], [720, 80], [780, 62], [822, 50]];
// l'os coxal (côté gauche) : l'aile de l'ilium en travers, la pointe de la hanche au bout ; le corps
// de l'ilium qui file vers l'arrière ; l'ischium et la pointe de la fesse
const COXAL_PLAN = [[1193, 20], [1189, 50], [1186, 90], [1188, 112], [1196, 124, 'c'], [1210, 127], [1221, 120],
  [1228, 108], [1240, 90], [1262, 78], [1300, 72], [1334, 74], [1352, 80], [1372, 80], [1410, 82], [1440, 86],
  [1456, 90, 'c'], [1468, 84], [1470, 70], [1460, 58], [1436, 48], [1404, 42], [1372, 38], [1352, 44], [1330, 52],
  [1300, 54], [1270, 50], [1244, 44], [1222, 34], [1206, 21, 'c']];
const SACRUM_PLAN = [[1204, -22], [1260, -26], [1330, -22], [1400, -14], [1414, -7], [1414, 7], [1400, 14], [1330, 22],
  [1260, 26], [1204, 22]];

const miroir = pts => pts.map(p => [p[0], -p[1], p[2]]);

function plan(z) {
  const dx = (z.l - (X1 - X0) * K) / 2 - X0 * K;
  const ym = z.h / 2;
  const P = (x, s) => [x * K + dx, ym + s * K];
  const T = pts => pts.map(p => P(p[0], p[1]));
  return { P, T, dx, ym };
}

// une côte vue de dessus : de sa tête, contre la colonne, jusqu'au plus large de la cage
function cotePlan(i) {
  const c = C.COTES[i];
  // vue de dessus, la côte file en dehors et en arrière (ellenberger-rind-t13) : son plus large est
  // d'autant plus en arrière de sa tête qu'elle est loin dans la cage
  const xh = c.h[0], xl = xh + 25 + 60 * i / 12, sl = interp(CORPS_PLAN, xl) - 7;
  const med = lisse([[xh, 9], [xh + 0.15 * (xl - xh), 0.45 * sl], [xh + 0.55 * (xl - xh), 0.85 * sl], [xl, sl]], false, 2);
  const w = 4.5, g = [], d = [];
  med.forEach((p, k) => {
    const a = med[Math.max(0, k - 1)], b = med[Math.min(med.length - 1, k + 1)];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
    const ww = k === med.length - 1 ? w * 0.7 : w;
    g.push([p[0] + n[0] * ww, p[1] + n[1] * ww]); d.push([p[0] - n[0] * ww, p[1] - n[1] * ww]);
  });
  return { bande: g.concat(d.reverse()), med };
}

function dessinPlan(z) {
  const { P, T } = plan(z);
  const id = 'p11';
  const out = [];
  const corps = lisse([[540, -49, 'c'], ...miroir(CORPS_PLAN), [1484, 0], ...CORPS_PLAN.slice().reverse(), [540, 49, 'c']], true);
  const corpsD = dP(T(corps), true);
  const xClip = P(X0, 0)[0];
  const longes = [LONGE_PLAN, miroir(LONGE_PLAN)].map(q => T(lisse(q, true)));
  const omoplates = [OMOPLATE_PLAN, miroir(OMOPLATE_PLAN)].map(q => T(lisse(q, true)));
  out.push(`<defs>${trames(id)}<clipPath id="${id}-vue"><rect x="${f1(xClip)}" y="0" width="${f1(z.l - xClip)}" height="${z.h}"/></clipPath>`
    + omoplates.map((q, k) => `<clipPath id="${id}-omo${k}"><path d="${dP(q, true)}" fill="${BLANC}"/></clipPath>`).join('') + '</defs>');
  out.push(`<g clip-path="url(#${id}-vue)">`);
  out.push(`<path d="${corpsD}" fill="${BLANC}" stroke="none"/>`);
  // côtes, des deux côtés ; la dernière en trait appuyé. Devant les longes, sous l'épaule, les
  // premières ne se voient pas : les côtes sont coupées au droit du bout des longes.
  const xCotes = P(692, 0)[0];
  out.push(`<clipPath id="${id}-cotes"><rect x="${f1(xCotes)}" y="0" width="${f1(z.l - xCotes)}" height="${z.h}" fill="${BLANC}"/></clipPath>`);
  out.push(`<g clip-path="url(#${id}-cotes)">`);
  for (let i = 0; i < 13; i++) {
    const { bande } = cotePlan(i);
    [bande, miroir(bande)].forEach(b => out.push(`<path d="${dP(T(b), true)}" ${plein(i === 12 ? 1.4 : 0.5)}/>`));
  }
  out.push('</g>');
  // bassin : sacrum et os coxaux
  out.push(`<path d="${dP(T(lisse(SACRUM_PLAN, true)), true)}" ${plein(0.5)}/>`);
  out.push(`<path d="${dP(T([[1210, 0], [1405, 0]]), false)}" ${trait(0.5)}/>`);
  [COXAL_PLAN, miroir(COXAL_PLAN)].forEach(q => out.push(`<path d="${dP(T(lisse(q, true)), true)}" ${plein(1.4)}/>`));
  // les deux longes, en trame, par-dessus les côtes
  longes.forEach(q => out.push(`<path d="${dP(q, true)}" fill="${BLANC}" stroke="none"/>`,
    `<path d="${dP(q, true)}" fill="url(#${id}-chair)" stroke="none"/>`, `<path d="${dP(q, true)}" ${trait(1.4)}/>`));
  // la pointe des apophyses épineuses, entre les deux longes
  Object.keys(C.EPINE).filter(n => /^[TL]/.test(n)).forEach(n => {
    const [x] = C.EPINE[n];
    const [cx, cy] = P(x, 0);
    out.push(`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(8.5 * K)}" ry="${f1(2.8 * K)}" ${plein(0.7)}/>`);
  });
  // les omoplates, par-dessus l'avant des longes ; la longe continue dessous, en tireté
  omoplates.forEach((q, k) => {
    out.push(`<path d="${dP(q, true)}" ${plein(1.4)}/>`);
    out.push(`<g clip-path="url(#${id}-omo${k})"><path d="${dP(longes[k], true)}" ${CACHE}/></g>`);
    const sg = k ? miroir : (x => x);
    out.push(`<path d="${dP(T(lisse(sg(CARTILAGE_PLAN))), false)}" ${trait(0.7)}/>`);
    out.push(`<path d="${dP(T(lisse(sg(EPINE_OMO_PLAN))), false)}" ${trait(0.7)}/>`);
  });
  out.push(`<path d="${corpsD}" ${trait(2.4)}/>`);
  out.push('</g>');
  return out.join('\n');
}

// ─── Vue 2 : le profil, sur la carcasse commune ─────────────────────────────────────────────
const place2 = z => C.placer(z, { cadre: [X0, Y0, X1, Y1], echelle: K });
const LG = C.MUSCLES.longe.pts;                       // contour de la longe du module (repère U)
const HAUT_LONGE = LG.slice(0, 15);                   // le dessus, du bassin (1214) au cou (664)
const BAS_LONGE = LG.slice(14, 29);                   // le dessous, du cou (664) au bassin (1222)
const decale = (pts, dy) => pts.map(p => [p[0], p[1] + dy]);
// ① le long des épines : le bord haut de la longe, de l'ilium au bas du cou
const TRAIT_EPINES = decale(HAUT_LONGE.filter(p => p[0] >= 676), -6);
// ② au coude des côtes : le bord bas de la longe, sur toute sa longueur
const TRAIT_COTES = decale(BAS_LONGE.filter(p => p[0] >= 690 && p[0] <= 1200), 7);
// ③ devant la cuisse : du flanc, en travers, jusqu'à l'épine, contre le devant de l'ilium
const TRAIT_CUISSE = [[1198, 452], [1200, 420], [1206, 392], [1220, 360], [1224, 336], [1219, 318]];
// le décollement : dans la longe, de l'arrière vers l'avant
const DECOLLE = [[1150, 346], [1060, 343], [970, 342], [880, 347], [800, 360]];

function dessinProfil(z) {
  const p = place2(z);
  const id = 'q11';
  const out = [];
  out.push(C.dessiner(h0, p, {
    id: 'v2', loin: 'gris',
    os: [...Object.keys(C.VERT).filter(n => !n.startsWith('C')), 'sacrum', 'cotes', 'bassin', 'femur'],
    osForts: ['cote13', 'bassin'],
  }));
  const longe = lisse(LG, true).map(p.T);
  out.push(`<defs>${trames(id)}</defs>`);
  out.push(`<path d="${dP(longe, true)}" fill="${BLANC}" stroke="none"/>`,
    `<path d="${dP(longe, true)}" fill="url(#${id}-chair)" stroke="none"/>`, `<path d="${dP(longe, true)}" ${trait(1.4)}/>`);
  // les trois traits du couteau
  const t1 = lisse(TRAIT_EPINES).map(p.T), t2 = lisse(TRAIT_COTES).map(p.T), t3 = lisse(TRAIT_CUISSE).map(p.T);
  [t1, t2, t3].forEach(t => out.push(`<path d="${dP(t, false)}" ${HALO}/>`));
  out.push(`<path d="${dP(t1, false)}" ${COUTEAU} marker-end="url(#fl)"/>`);
  out.push(`<path d="${dP(t2, false)}" ${COUTEAU}/>`);
  out.push(`<path d="${dP(t3, false)}" ${COUTEAU} marker-end="url(#fl)"/>`);
  // le décollement
  const dc = lisse(DECOLLE).map(p.T);
  out.push(`<path d="${dP(dc, false)}" ${HALO}/>`);
  // la charte : le geste de la vue (décoller de l'arrière vers l'avant) en rouge
  out.push(h0.geste(dP(dc, false)));
  return out.join('\n');
}

// ─── Vue 3 : la longe sortie, de trois quarts ───────────────────────────────────────────────
// Le pain est posé comme il était sur la bête : dessus en haut, avant à gauche, face externe vers
// nous. La profondeur (vers l'épine) fuit en haut à droite ; on voit la face externe et le bout
// arrière coupé.
const XA = 664, XB = 1190;                            // du bout avant au trait devant la cuisse
const yAt = (chaine, x) => interp(chaine.map(p => [p[0], p[1]]).sort((a, b) => a[0] - b[0]), x);
// épaisseur le long du pain : celle de la longe du module, constante dans les lombes (GUELPH)
const epais = x => { const xx = Math.min(x, 1140); return yAt(BAS_LONGE, xx) - yAt(HAUT_LONGE, xx); };
// largeur (de la face externe à l'épine) : celle du plan
const large = x => (interp(BORD_LONGE, x) - 7) * Math.min(1, Math.max(0, (x - XA) / 60));
// le bout avant se relève : il finit à mi-hauteur, comme la pointe de la longe du module
const releve = x => x < 720 ? 22 * Math.pow((720 - x) / (720 - XA), 2) : 0;
// la section, normée : face externe (du bas externe au haut interne), face contre l'épine, dessous
const SECTION = lisse([[0, 0.12], [0.04, 0.34], [0.12, 0.58], [0.26, 0.80], [0.45, 0.94], [0.68, 1.0], [0.88, 1.0],
  [1.0, 0.95, 'c'], [1.0, 0.06, 'c'], [0.95, 0, 'c'], [0.06, 0, 'c']], true, 0.02);
const GRAS_BAS = [0.12, 0.58];                         // limite basse de la nappe sur la face externe
const R = 0.85, A = 30 * Math.PI / 180;
const debutGras = x => Math.max(0, Math.min(1, (x - 800) / 70));   // la nappe s'amincit vers les épaules

function pain(z) {
  const S = 0.78;
  const lg = (XB - XA) * S + large(XB) * S * R * Math.cos(A);
  const ox = (z.l - lg) / 2 - 30, oy = z.h - 16;
  const proj = (x, u, v) => [ox + (x - XA) * S + u * large(x) * S * R * Math.cos(A),
    oy - (releve(x) + v * epais(x)) * S - u * large(x) * S * R * Math.sin(A)];
  return { S, proj, ox, oy };
}

function dessinSortie(z) {
  const { proj } = pain(z);
  const id = 's11';
  const GR = 6;                                          // la nappe : une bande mince, sans mesure
  const out = [`<defs>${trames(id)}</defs>`];
  const xs = []; for (let x = XA; x <= XB; x += 4) xs.push(x); if (xs[xs.length - 1] !== XB) xs.push(XB);
  // la face externe, de u,v = GRAS_BAS jusqu'à l'arête du haut : partie grasse
  const iG = SECTION.findIndex(q => q[1] >= GRAS_BAS[1]);
  const iArete = SECTION.findIndex(q => q[0] >= 0.99);  // le haut de la face contre l'épine
  const estGras = (k) => k >= iG && k <= iArete;
  // silhouette haute (gras compris) et basse, pour chaque x
  const haut = [], bas = [], limite = [];
  xs.forEach(x => {
    const g = GR * debutGras(x);
    let mh = null, mb = null;
    SECTION.forEach((q, k) => {
      const pt = proj(x, q[0], q[1]);
      const yh = pt[1] - (estGras(k) ? g : 0);
      if (!mh || yh < mh[1]) mh = [pt[0], yh];
      if (!mb || pt[1] > mb[1]) mb = pt;
    });
    haut.push(mh); bas.push(mb);
    limite.push(proj(x, GRAS_BAS[0], GRAS_BAS[1]));
  });
  // le bout arrière : la section projetée, et sa nappe de gras
  const bout = SECTION.map(q => proj(XB, q[0], q[1]));
  const boutGras = SECTION.slice(iG, iArete + 1).map(q => proj(XB, q[0], q[1]));
  const boutGrasHaut = boutGras.map(p => [p[0], p[1] - GR]);
  // le tour du pain : dessus d'avant en arrière, le bout (côté épine puis dessous), dessous d'arrière en avant
  const tourBout = SECTION.slice(iArete).map(q => proj(XB, q[0], q[1]));
  // le bout avant, arrondi : la pointe de la longe du module est un angle, un pain n'en a pas
  const k0 = xs.findIndex(x => x >= 692);
  const Bn = bas[k0], Hn = haut[k0];
  const tg = (a, b) => { const L = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; return [(a[0] - b[0]) / L, (a[1] - b[1]) / L]; };
  const tB = tg(Bn, bas[k0 + 3]), tH = tg(Hn, haut[k0 + 3]), Ln = 0.65 * Math.hypot(Bn[0] - Hn[0], Bn[1] - Hn[1]);
  const c1 = [Bn[0] + tB[0] * Ln, Bn[1] + tB[1] * Ln], c2 = [Hn[0] + tH[0] * Ln, Hn[1] + tH[1] * Ln];
  const nez = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12, m = 1 - t;
    return [0, 1].map(c => m * m * m * Bn[c] + 3 * m * m * t * c1[c] + 3 * m * t * t * c2[c] + t * t * t * Hn[c]);
  });
  const tour = [...nez, ...haut.slice(k0 + 1), [boutGrasHaut[boutGrasHaut.length - 1][0], boutGrasHaut[boutGrasHaut.length - 1][1]],
    ...tourBout, ...bas.slice(k0 + 1).reverse()];
  out.push(`<path d="${dP(tour, true)}" fill="${BLANC}" stroke="none"/>`);
  // la nappe sur la face externe : entre la limite basse et la silhouette haute
  const kG = xs.findIndex(x => debutGras(x) > 0);
  const nappe = [...limite.slice(kG), ...boutGrasHaut, ...haut.slice(kG).reverse()];
  out.push(`<path d="${dP(nappe, true)}" fill="url(#${id}-gras)" stroke="none"/>`);
  // le bout coupé : la chair en trame, le gras en points
  out.push(`<path d="${dP(bout, true)}" fill="${BLANC}" stroke="none"/>`,
    `<path d="${dP(bout, true)}" fill="url(#${id}-chair)" stroke="none"/>`);
  const bandeBout = [...boutGras, ...boutGrasHaut.slice().reverse()];
  out.push(`<path d="${dP(bandeBout, true)}" fill="${BLANC}" stroke="none"/>`,
    `<path d="${dP(bandeBout, true)}" fill="url(#${id}-gras)" stroke="none"/>`, `<path d="${dP(bandeBout, true)}" ${trait(0.7)}/>`);
  out.push(`<path d="${dP(bout, true)}" ${trait(1.4)}/>`);
  // la limite de la nappe sur la face externe
  out.push(`<path d="${dP(limite.slice(kG), false)}" ${trait(1.4)}/>`);
  // le bord avant de la feuille de gras, vers les épaules
  out.push(`<path d="${dP([limite[kG], haut[kG]], false)}" ${trait(0.7)}/>`);
  // le grain : une seule famille de flèches, dans la longueur, un peu vers l'avant et le bas
  const dir = [-Math.cos(9 * Math.PI / 180), Math.sin(9 * Math.PI / 180)], L = 16;
  const places = [[720, 0.18, 0.55], [790, 0.10, 0.45], [790, 0.40, 0.90], [880, 0.03, 0.34], [960, 0.03, 0.34],
    [1040, 0.03, 0.34], [1120, 0.03, 0.34], [710, 0.45, 0.93]];
  places.forEach(([x, u, v]) => {
    const [cx, cy] = proj(x, u, v);
    out.push(h0.fleche(`M${f1(cx - dir[0] * L / 2)} ${f1(cy - dir[1] * L / 2)} L${f1(cx + dir[0] * L / 2)} ${f1(cy + dir[1] * L / 2)}`, h0.a.detail));
  });
  out.push(`<path d="${dP(tour, true)}" ${trait(2.4)}/>`);
  return out.join('\n');
}

let h0 = null;
module.exports = (h) => {
  h0 = h;
  return {
    ref: '62-11',
    titre: 'La longe, en place et levée',
    desc: "La longe de l'orignal (Longissimus dorsi). En haut, le dos vu de dessus : la colonne au centre, "
      + "les pointes des apophyses épineuses, une longe de chaque côté, du bas du cou au devant du bassin, entre les "
      + "épines et le coude des côtes ; les omoplates couvrent l'avant des longes ; la dernière côte et les ailes de "
      + "l'ilium la bornent en arrière. Au milieu, la même carcasse de profil gauche, à la même échelle : la longe en "
      + "trame, et les trois traits qui la lèvent : le long des apophyses épineuses, du bassin vers le cou ; au coude "
      + "des côtes ; devant la cuisse, du flanc jusqu'à l'épine ; puis elle se décolle de l'arrière vers l'avant. "
      + "En bas, la longe sortie en pain long, vue de trois quarts : la nappe de gras sur le dessus, à lever pour la "
      + "fonte, le bout arrière coupé, et le grain dans la longueur, un peu oblique.",
    format: 'pleine',
    disposition: [['dessus'], ['profil'], ['sortie']],
    hauteurs: [222, 226, 151],
    vues: {
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => dessinPlan(z),
        renvois: z => {
          const { P } = plan(z);
          return [
            { n: 1, texte: 'longe, M. longissimus dorsi', rond: P(880, -154), cible: P(880, -50) },
            { n: 2, texte: 'apophyses épineuses', rond: P(1060, -154), cible: P(1070, 0) },
            { n: 3, texte: 'omoplate : la longe passe dessous', rond: P(690, -154), cible: P(760, -80) },
            { n: 4, texte: 'dernière côte', rond: P(1050, 156), cible: P(1003, 116) },
            { n: 5, texte: 'pointe de la hanche, aile de l’ilium', rond: P(1285, 156), cible: P(1203, 132) },
          ];
        },
      },
      profil: {
        titre: 'De profil gauche',
        dessin: z => dessinProfil(z),
        renvois: z => {
          const p = place2(z);
          return [
            { n: 6, texte: 'trait le long des apophyses épineuses', rond: p.pt([1060, 205]), cible: p.pt([1060, 296]) },
            { n: 7, texte: 'trait au coude des côtes', rond: p.pt([975, 462]), cible: p.pt([975, 394]) },
            { n: 8, texte: 'trait devant la cuisse', rond: p.pt([1110, 462]), cible: p.pt([1199, 440]) },
            { n: 9, texte: 'décoller de l’arrière vers l’avant', rond: p.pt([840, 462]), cible: p.pt([845, 353]) },
          ];
        },
      },
      sortie: {
        titre: 'La longe sortie',
        dessin: z => dessinSortie(z),
        renvois: z => {
          const { proj } = pain(z);
          const b = proj(XB, 0.5, 0.45);
          return [
            { n: 10, texte: 'nappe de gras, à lever pour la fonte', rond: [z.l - 26, 16], cible: proj(1100, 0.3, 0.86) },
            { n: 11, texte: 'grain, dans la longueur, un peu oblique', rond: [30, z.h - 20], cible: proj(790, 0.10, 0.45) },
            { n: 12, texte: 'bout coupé devant la cuisse', rond: [z.l - 26, z.h - 22], cible: b },
          ];
        },
      },
    },
  };
};
