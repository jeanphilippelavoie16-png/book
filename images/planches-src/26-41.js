// Planche 26-41. Fermer une coupure : le ruban refendu, les cheveux noués (chapitre 26, section 7, « Rapprocher une
// coupure »). Composée le 15 octobre 2026 ; refaite au complet le 26 octobre 2026 aux règles du geste fin (règle 1 de
// images/recommandations-planches.md) : une étape par vue, en gros plan, la main par h.formes.mainStock.
//
// Ce que dit le chapitre, et rien de plus. Repères 1 à 4 : refendre du ruban à conduits en lanières de la largeur d'un
// doigt, les coller sur peau sèche de part et d'autre d'une coupure propre en tirant les deux bords l'un vers l'autre ;
// la lanière passe en travers de la coupure. Repères 5 et 6 : sur le cuir chevelu, une mèche de chaque côté, croisées
// par-dessus la coupure, puis nouées. La mise en garde (rien sur une plaie sale, profonde, une piqûre ou une morsure)
// est dans le texte, juste après l'appel ; la planche ne la redit pas.
//
// Les six vues, une par repère :
//   1 refendre    le morceau de ruban, une lanière à moitié déchirée en long qui s'écarte (flèche rouge : le geste).
//   2 coller      l'avant-bras vu de dessus, la coupure ouverte en travers du bras ; la lanière collée à gauche, le
//                 reste plié en l'air au-dessus de la coupure, tenu par la main de l'aidant.
//   3 tirer       la même vue : la main a tiré vers la droite (flèche rouge), les deux bords se touchent sous la lanière,
//                 la lanière est collée de l'autre côté.
//   4 en travers  trois lanières en travers de la coupure refermée.
//   5 croiser     le cuir chevelu, les cheveux écartés en raie le long de la coupure ; une mèche prise au bord de la
//                 raie de chaque côté, croisées par-dessus la coupure (celle du bas passe dessus).
//   6 nouer       le demi-nœud desserré pour qu'on suive chaque mèche : les deux mèches font chacune une boucle prise
//                 dans l'autre (celle du bas passe dessus à gauche, dessous à droite) ; tirer les deux bouts (flèches
//                 rouges) serre le nœud. Le chapitre dit « nouer » sans dire quel nœud : c'est le premier temps d'un
//                 lacet.
//
// La main : 2-06 « carte-pincee » de h.formes.mainStock, sans sa carte, en miroir (elle vient de la droite) : le pouce
// dessus, l'index replié dessous ; le bout de la lanière prend la place de la carte, sur son axe. Sa taille est réglée
// pour que le pouce soit aussi large que la lanière (« la largeur d'un doigt »). Son avant-bras sort par le bas de la
// vue. Rien n'est redessiné ni déformé.
// Les matières : le ruban à conduits en gris, avec sa trame de fils croisés qui suit la lanière, les bouts déchirés
// effilochés (les fils en long qui dépassent) et les bords refendus hérissés de petits bouts de fils en travers. Les
// cheveux en mèches : la chevelure en gris (le plan d'arrière), mèche par mèche ; les deux mèches qu'on noue en blanc,
// cernées, leurs brins dedans et leurs bouts qui s'effilent en cheveux séparés.
// Aucune cote : le geste se mesure au doigt.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const NOIR = '#1A1A1A', GRIS = '#E6E6E6';
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]], sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k], lon = p => Math.hypot(p[0], p[1]);
  const uni = p => { const l = lon(p) || 1; return [p[0] / l, p[1] / l]; };
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const tourne = (p, c, a) => { const s = Math.sin(a * RAD), k = Math.cos(a * RAD), d = sub(p, c); return [c[0] + d[0] * k - d[1] * s, c[1] + d[0] * s + d[1] * k]; };
  const hasard = g => () => { g = (g * 16807) % 2147483647; return (g - 1) / 2147483646; };
  const trait = (ep, coul = NOIR) => `fill="none" stroke="${coul}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const poly = q => q.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');
  const forme = (q, fond) => `<path d="${poly(q)} Z" fill="${fond}" stroke="none"/>`;

  // Une ligne lisse (Catmull-Rom) passant par pts, échantillonnée : points, abscisse, tangente, normale.
  const echant = (pts, pas = 1.2) => {
    const n = pts.length, Q = i => pts[Math.max(0, Math.min(n - 1, i))];
    const P = [pts[0]];
    for (let i = 0; i < n - 1; i++) {
      const p0 = Q(i - 1), p1 = Q(i), p2 = Q(i + 1), p3 = Q(i + 2);
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      const k = Math.max(2, Math.ceil(lon(sub(p2, p1)) / pas));
      for (let j = 1; j <= k; j++) {
        const t = j / k, u = 1 - t;
        P.push([u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
          u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    const S = [0];
    for (let i = 1; i < P.length; i++) S.push(S[i - 1] + lon(sub(P[i], P[i - 1])));
    const T = P.map((p, i) => uni(sub(P[Math.min(i + 1, P.length - 1)], P[Math.max(i - 1, 0)])));
    const N = T.map(t => [-t[1], t[0]]);
    return { P, S, T, N, L: S[S.length - 1] };
  };

  // ─── le ruban à conduits ────────────────────────────────────────────────────────────────────────────────────
  // La trame : des fils en long serrés et des fils en travers plus espacés, tournés avec la lanière.
  const trame = (id, ang) => {
    const cle = `${id}-${Math.round(ang)}`;
    return { id: `trame-2641-${cle}`, defs: `<defs><pattern id="trame-2641-${cle}" width="4.2" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(${f1(ang)})"><line x1="0" y1="0.6" x2="4.2" y2="0.6" stroke="${NOIR}" stroke-width="0.5"/><line x1="1" y1="0" x2="1" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern></defs>` };
  };
  // Une bande de ruban le long de pts, large de w. bouts : [début, fin] parmi 'dechire' (effiloché) · 'aucun' (la
  // bande continue ailleurs : ni trait ni fils). bords : [gauche, droite] parmi 'net' (le bord du rouleau) ·
  // 'refendu' (déchiré en long : de petits bouts de fils en travers) · 'aucun'. ang : l'angle de la trame.
  const ruban = (id, pts, w, { bouts = ['dechire', 'dechire'], bords = ['net', 'net'], ang = null, graine = 5 } = {}) => {
    const R = hasard(graine);
    const C = echant(pts, 1.5), n = C.P.length;
    const G = C.P.map((p, i) => add(p, mul(C.N[i], w / 2))), D = C.P.map((p, i) => add(p, mul(C.N[i], -w / 2)));
    const a = ang == null ? Math.atan2(C.T[0][1], C.T[0][0]) / RAD : ang;
    const tr = trame(id, a);
    // un bout déchiré : une ligne en dents irrégulières, de pa à pb, poussée vers t
    const bout = (pa, pb, t) => { const q = []; for (let i = 0; i <= 7; i++) q.push(add(lerp(pa, pb, i / 7), mul(t, i === 0 || i === 7 ? 0 : (R() - 0.35) * 2.6))); return q; };
    const tFin = C.T[n - 1], tDeb = mul(C.T[0], -1);
    const bFin = bouts[1] === 'dechire' ? bout(G[n - 1], D[n - 1], tFin) : [G[n - 1], D[n - 1]];
    const bDeb = bouts[0] === 'dechire' ? bout(D[0], G[0], tDeb) : [D[0], G[0]];
    const contour = [...G, ...bFin.slice(1, -1), ...D.slice().reverse(), ...bDeb.slice(1, -1)];
    const o = [tr.defs, forme(contour, GRIS), `<path d="${poly(contour)} Z" fill="url(#${tr.id})" stroke="none"/>`];
    const fils = [];
    // les fils en long qui dépassent d'un bout déchiré
    const effiloche = (q, t) => { for (let i = 1; i < q.length - 1; i += 1) { const p = q[i], l = 1.6 + R() * 2.2; fils.push(`M${f1(p[0])} ${f1(p[1])} L${f1(p[0] + t[0] * l)} ${f1(p[1] + t[1] * l)}`); } };
    if (bouts[1] === 'dechire') effiloche(bFin, tFin);
    if (bouts[0] === 'dechire') effiloche(bDeb, tDeb);
    // les petits bouts de fils en travers d'un bord refendu
    const herisse = (E, s) => { for (let k = 2.5; k < C.L - 2.5; k += 4.2) { let i = 0; while (i < n - 1 && C.S[i + 1] < k) i++; const p = E[i], nn = mul(C.N[i], s), l = 0.9 + R() * 1.2; fils.push(`M${f1(p[0])} ${f1(p[1])} L${f1(p[0] + nn[0] * l)} ${f1(p[1] + nn[1] * l)}`); } };
    if (bords[0] === 'refendu') herisse(G, 1);
    if (bords[1] === 'refendu') herisse(D, -1);
    if (fils.length) o.push(`<path d="${fils.join(' ')}" ${trait(0.5)}/>`);
    // les traits : les bords, puis les bouts
    if (bords[0] !== 'aucun') o.push(`<path d="${poly(G)}" ${trait(1.4)}/>`);
    if (bords[1] !== 'aucun') o.push(`<path d="${poly(D)}" ${trait(1.4)}/>`);
    if (bouts[1] === 'dechire') o.push(`<path d="${poly(bFin)}" ${trait(1.4)}/>`);
    if (bouts[0] === 'dechire') o.push(`<path d="${poly(bDeb)}" ${trait(1.4)}/>`);
    return { svg: o.join('\n'), C, G, D };
  };

  // ─── l'avant-bras, vu de dessus : une bande en travers de la vue, rompue aux deux bouts ─────────────────────
  const avantBras = (z) => {
    const x0 = 6, x1 = z.l - 6, yH = x => 10 + (x - x0) * 0.03, yB = x => z.h - 8 - (x - x0) * 0.025;
    const rupture = x => { const a = yH(x), b = yB(x), m = (a + b) / 2; return `M${f1(x)} ${f1(a)} C${f1(x + 7)} ${f1(a + (m - a) * 0.6)} ${f1(x + 7)} ${f1(m)} ${f1(x)} ${f1(m)} S${f1(x - 7)} ${f1(m + (b - m) * 0.4)} ${f1(x)} ${f1(b)}`; };
    return {
      yH, yB, cy: (yH(z.l / 2) + yB(z.l / 2)) / 2,
      svg: [`<path d="M${x0} ${f1(yH(x0))} L${x1} ${f1(yH(x1))} L${x1} ${f1(yB(x1))} L${x0} ${f1(yB(x0))} Z" fill="#FFFFFF" stroke="none"/>`,
        `<path d="M${x0} ${f1(yH(x0))} L${x1} ${f1(yH(x1))}" ${A.arete}/>`, `<path d="M${x0} ${f1(yB(x0))} L${x1} ${f1(yB(x1))}" ${A.arete}/>`,
        `<path d="${rupture(x0)}" ${A.detail}/>`, `<path d="${rupture(x1)}" ${A.detail}/>`].join('\n'),
    };
  };
  // La coupure, en travers du bras (verticale), de longueur L autour de c. ouverture(t), t de -1 (haut) à 1 (bas) :
  // la demi-largeur de la fente. Une fente ouverte : les deux bords cernés, le creux à l'ombre, le fond en trait fin.
  const fente = (c, L, ouv) => {
    const k = 24, g = [], d = [];
    for (let i = 0; i <= k; i++) { const t = -1 + 2 * i / k, y = c[1] + t * L / 2, e = ouv(t); g.push([c[0] - e, y]); d.push([c[0] + e, y]); }
    return [`<path d="${poly([...g, ...d.slice().reverse()])} Z" ${A.ombre}/>`,
      `<path d="${poly(g)}" ${A.arete}/>`, `<path d="${poly(d)}" ${A.arete}/>`,
      `<path d="M${f1(c[0])} ${f1(c[1] - L * 0.36)} L${f1(c[0])} ${f1(c[1] + L * 0.36)}" ${A.detail}/>`].join('\n');
  };
  const fenteFermee = (c, L) => {
    const q = []; for (let i = 0; i <= 12; i++) { const t = -1 + i / 6; q.push([c[0] + Math.sin(t * 2.6) * 0.8, c[1] + t * L / 2]); }
    return `<path d="${poly(q)}" ${A.arete}/>`;
  };
  // en amande : large au milieu, nulle aux bouts
  const amande = e => t => e * Math.pow(Math.max(0, 1 - t * t), 0.75);

  // ─── la main de l'aidant : 2-06 « carte-pincee », le bout de la lanière à la place de la carte ──────────────
  const W_LAN = 22;                  // la largeur d'une lanière, celle d'un doigt
  const T_MAIN = 300;                // le pouce de la main 2-06 fait environ 0,073 de la taille : 22 unités
  const mainTient = (bout) => {
    // bout : le bout de la lanière (sous le pouce) ; la carte du fichier s'étend vers la gauche depuis la main
    const m0 = F.mainStock({ id: 'carte-pincee', objet: false, miroir: true, angle: 0, taille: T_MAIN, x: 0, y: 0, ancre: 'objet' });
    const o = m0.objet;   // { x: 0, y: 0, angle: 180, longueur, largeur } : la carte part vers la gauche
    // le bout droit de la carte (sous la main) tombe sur le bout de la lanière, moins un peu pour que le pouce le couvre
    const x = bout[0] - o.longueur / 2 + 26, y = bout[1];
    return F.mainStock({ id: 'carte-pincee', objet: false, miroir: true, angle: 0, taille: T_MAIN, x, y, ancre: 'objet' });
  };
  const decoupe = (id, z, svg) => `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#${id})">\n${svg}\n</g>`;

  // ─── 1. Refendre ────────────────────────────────────────────────────────────────────────────────────────────
  // Un morceau de ruban déchiré du rouleau, à plat ; la lanière du bas déchirée en long jusqu'au milieu, qui s'écarte.
  const refendre = z => {
    const w = W_LAN, x0 = z.l * 0.1, x1 = z.l * 0.78, yT = z.h * 0.5 - 1.5 * w - 8, xd = z.l * 0.43;
    const o = [];
    // la lanière qui s'écarte : elle part du bout de la déchirure et plie vers le bas
    const yl = yT + 2.5 * w, piv = [xd, yl];
    const lib = [[xd - 4, yl], [xd + 10, yl + 0.6], [xd + 26, yl + 4.5], ...[0.35, 0.7, 1].map(t => tourne([xd + 26 + t * (x1 - xd - 22), yl + 4.5], [xd + 26, yl + 4.5], 17))];
    const L = ruban('r1', lib, w, { bouts: ['aucun', 'dechire'], bords: ['net', 'refendu'], ang: 15, graine: 7 });
    o.push(L.svg);
    // le reste du morceau : deux lanières de large à droite de la déchirure, trois à gauche
    const R = hasard(3);
    const dents = (xa, ya, yb, s) => { const q = []; for (let i = 0; i <= 9; i++) q.push([xa + (i === 0 || i === 9 ? 0 : s * (R() - 0.35) * 2.6), ya + (yb - ya) * i / 9]); return q; };
    const bD = dents(x1, yT, yT + 2 * w, 1), bG = dents(x0, yT + 3 * w, yT, -1);
    const reste = [[x0, yT], [x1, yT], ...bD.slice(1), [xd, yT + 2 * w], [xd - 4, yT + 2 * w], [xd - 4, yT + 3 * w], [x0, yT + 3 * w], ...bG.slice(1, -1)];
    const tr = trame('r0', 0);
    o.push(tr.defs, forme(reste, GRIS), `<path d="${poly(reste)} Z" fill="url(#${tr.id})" stroke="none"/>`);
    // effilochés et fils du bord refendu
    const fils = [];
    [bD, bG].forEach((q, j) => q.slice(1, -1).forEach(p => { const l = 1.6 + R() * 2.2; fils.push(`M${f1(p[0])} ${f1(p[1])} L${f1(p[0] + (j ? -l : l))} ${f1(p[1])}`); }));
    for (let x = xd + 2; x < x1 - 2; x += 4.2) { const l = 0.9 + R() * 1.2; fils.push(`M${f1(x)} ${f1(yT + 2 * w)} L${f1(x)} ${f1(yT + 2 * w + l)}`); }
    o.push(`<path d="${fils.join(' ')}" ${trait(0.5)}/>`);
    o.push(`<path d="M${f1(x0)} ${f1(yT)} L${f1(x1)} ${f1(yT)}" ${A.arete}/>`, `<path d="${poly(bD)}" ${A.arete}/>`, `<path d="${poly(bG)}" ${A.arete}/>`,
      `<path d="M${f1(x1)} ${f1(yT + 2 * w)} L${f1(xd)} ${f1(yT + 2 * w)}" ${A.arete}/>`,
      `<path d="M${f1(xd - 4)} ${f1(yT + 3 * w)} L${f1(x0)} ${f1(yT + 3 * w)}" ${A.arete}/>`);
    // le pied de la déchirure : un petit V
    o.push(`<path d="M${f1(xd + 6)} ${f1(yT + 2 * w)} L${f1(xd - 3)} ${f1(yT + 2 * w + 1.2)}" ${A.arete}/>`);
    // le geste : tirer la lanière vers le bas, dans son prolongement
    const fin = lib[lib.length - 1], t17 = [Math.cos(17 * RAD), Math.sin(17 * RAD)], n17 = [-t17[1], t17[0]];
    const a0 = add(add(fin, mul(t17, -34)), mul(n17, w / 2 + 12)), a1 = add(add(fin, mul(t17, 6)), mul(n17, w / 2 + 12));
    o.push(h.geste(`M${f1(a0[0])} ${f1(a0[1])} L${f1(a1[0])} ${f1(a1[1])}`));
    return { svg: o.join('\n'), P: { laniere: add(lib[3], mul(n17, w / 2)), fleche: lerp(a0, a1, 0.5) } };
  };

  // ─── 2 et 3. Coller d'un côté, puis tirer et coller de l'autre ──────────────────────────────────────────────
  const XC = 0.33;                   // la coupure, en fraction de la largeur de la vue
  const coller = (z, tire) => {
    const B = avantBras(z), xc = z.l * XC, ys = B.cy - 2, Lc = (B.yB(xc) - B.yH(xc)) * 0.72, cc = [xc, B.cy + 3];
    const w = W_LAN, o = [B.svg];
    const xg = xc - 64, xpli = xc - 9;
    if (!tire) {
      // la coupure ouverte ; la lanière collée à gauche jusqu'au pli, puis en l'air au-dessus de la coupure
      o.push(fente(cc, Lc, amande(5)));
      const bout = tourne([xc + 74, ys], [xpli, ys], -5);
      o.push(ruban('c2a', [bout, [xpli, ys + 0.1]], w, { bouts: ['dechire', 'aucun'], bords: ['refendu', 'net'], ang: -5, graine: 11 }).svg);
      o.push(ruban('c2b', [[xpli, ys], [xg, ys]], w, { bouts: ['aucun', 'dechire'], bords: ['refendu', 'net'], ang: 0, graine: 12 }).svg);
      o.push(`<path d="M${f1(xpli)} ${f1(ys - w / 2)} L${f1(xpli)} ${f1(ys + w / 2)}" ${A.arete}/>`);
      const m = mainTient(bout);
      o.push(String(m));
      return { svg: decoupe('vue-2641-coller', z, o.join('\n')), P: { colle: [xg + 22, ys + w / 2], fente: [xc, cc[1] + Lc * 0.36] } };
    }
    // tirée : les bords se touchent sous la lanière et s'écartent un peu plus loin
    const ouv = t => { const y = cc[1] + t * Lc / 2, d = Math.max(0, Math.abs(y - ys) - w / 2 - 2); return Math.min(2.6, d * 0.16) * Math.pow(Math.max(0, 1 - t * t), 0.6); };
    o.push(fente(cc, Lc, ouv));
    const bout = [xc + 86, ys];
    o.push(ruban('c3', [bout, [xg, ys]], w, { bouts: ['dechire', 'dechire'], bords: ['refendu', 'net'], ang: 0, graine: 13 }).svg);
    const m = mainTient(bout);
    o.push(String(m));
    // le geste : tirer vers la droite, au-dessus de la lanière
    const yf = ys - w / 2 - 22;
    o.push(h.geste(`M${f1(xc + 2)} ${f1(yf)} L${f1(xc + 44)} ${f1(yf)}`));
    return { svg: decoupe('vue-2641-tirer', z, o.join('\n')), P: { fleche: [xc + 30, yf], bords: [xc, ys + w / 2 + 8] } };
  };

  // ─── 4. En travers ──────────────────────────────────────────────────────────────────────────────────────────
  const travers = z => {
    const B = avantBras(z), xc = z.l * 0.5, w = W_LAN, ecart = 8, Lc = (B.yB(xc) - B.yH(xc)) * 0.8;
    const o = [B.svg, fenteFermee([xc, B.cy], Lc)];
    [-1, 0, 1].forEach((k, i) => {
      const y = B.cy + k * (w + ecart), d = (i - 1) * 3;
      o.push(ruban(`t${i}`, [[xc - 52 + d, y], [xc + 50 + d, y]], w, { bouts: ['dechire', 'dechire'], bords: [i === 0 ? 'net' : 'refendu', i === 2 ? 'net' : 'refendu'], ang: 0, graine: 21 + i }).svg);
    });
    return { svg: decoupe('vue-2641-travers', z, o.join('\n')), P: { fente: [xc, B.cy + w / 2 + ecart / 2] } };
  };

  // ─── les cheveux ────────────────────────────────────────────────────────────────────────────────────────────
  // Une mèche le long de pts. lmax : sa largeur ; rang : la chevelure (gris, trait fin, une raie de brins) ou la mèche
  // qu'on noue (blanche, cernée, trois brins, le bout effilé en cheveux séparés). de, a : la portion à dessiner, en
  // fraction de la longueur (pour passer une partie de la mèche par-dessus une autre).
  const meche = (pts, lmax, { nouee = false, de = 0, a = 1, graine = 1 } = {}) => {
    const C = echant(pts, 1), n = C.P.length, R = hasard(graine);
    const prof = s => {   // la largeur à la fraction s
      const racine = nouee ? 0.4 : 0.7;
      if (s < 0.14) return lmax * (racine + (1 - racine) * Math.sin(s / 0.14 * Math.PI / 2));
      if (s < (nouee ? 0.6 : 0.5)) return lmax;
      const fin = nouee ? 0.84 : 1, d0 = nouee ? 0.6 : 0.5;
      return lmax * Math.max(nouee ? 0.3 : 0, 1 - (s - d0) / (fin - d0) * (nouee ? 0.7 : 1));
    };
    const sFin = nouee ? 0.84 : 1;
    const idx = s => { let i = 0; while (i < n - 1 && C.S[i] / C.L < s) i++; return i; };
    const i0 = idx(de), i1 = idx(Math.min(a, sFin));
    const G = [], D = [];
    for (let i = i0; i <= i1; i++) { const e = prof(C.S[i] / C.L) / 2; G.push(add(C.P[i], mul(C.N[i], e))); D.push(add(C.P[i], mul(C.N[i], -e))); }
    const o = [];
    const ep = nouee ? 1.4 : 0.5;
    o.push(forme([...G, ...D.slice().reverse()], nouee ? '#FFFFFF' : GRIS));
    // les brins, dans la mèche
    const brins = nouee ? [-0.5, 0, 0.5] : [-0.25, 0.3];
    const lignes = [];
    brins.forEach((b, j) => {
      const q = [];
      const s0 = nouee ? 0.08 + j * 0.02 : 0.14 + j * 0.08, s1 = nouee ? sFin : 0.78 - j * 0.1;
      for (let i = i0; i <= i1; i++) { const s = C.S[i] / C.L; if (s < s0 || s > s1) continue; q.push(add(C.P[i], mul(C.N[i], b * prof(s) / 2))); }
      if (q.length > 1) lignes.push(poly(q));
    });
    // le bout de la mèche nouée : les brins continuent en cheveux séparés qui s'écartent un peu
    if (nouee && a >= 1) {
      const iF = n - 1, iB = idx(sFin);
      [-0.6, -0.3, 0, 0.3, 0.6].forEach((b, j) => {
        const q = [], ext = (C.L * (1 - sFin)) * [0.7, 0.95, 1, 0.82, 0.62][j];
        for (let i = iB; i <= iF; i++) { const s = (C.S[i] - C.S[iB]) / (C.L - C.S[iB] || 1); if (s * (C.L - C.S[iB]) > ext) break; q.push(add(C.P[i], mul(C.N[i], b * lmax * 0.28 / 2 * (1 + s * 1.6)))); }
        if (q.length > 1) lignes.push(poly(q));
      });
    }
    if (lignes.length) o.push(`<path d="${lignes.join(' ')}" ${trait(0.5)}/>`);
    o.push(`<path d="${poly(G)}" ${trait(ep)}/>`, `<path d="${poly(D)}" ${trait(ep)}/>`);
    // la racine : la mèche sort du cuir, refermée par un petit arc
    if (nouee && de <= 0) { const g = G[0], d = D[0], t = mul(C.T[0], -1), m = add(lerp(g, d, 0.5), mul(t, 1.6)); o.push(`<path d="M${f1(g[0])} ${f1(g[1])} Q${f1(m[0])} ${f1(m[1])} ${f1(d[0])} ${f1(d[1])}" ${trait(ep)}/>`); }
    // le bout de la mèche de la chevelure : fermé en pointe
    if (!nouee && a >= 1) { const g = G[G.length - 1], d = D[D.length - 1]; o.push(`<path d="M${f1(g[0])} ${f1(g[1])} L${f1(d[0])} ${f1(d[1])}" ${trait(ep)}/>`); }
    return { svg: o.join('\n'), C };
  };

  // Le cuir chevelu dans une loupe : la coupure en travers, les cheveux écartés en raie de part et d'autre, peignés
  // vers l'extérieur et un peu vers la gauche, mèche par mèche ; les mèches proches de la raie couchées par-dessus.
  const loupe = (z, id, interieur) => {
    const cx = z.l / 2, cy = z.h / 2, R = Math.min(z.l, z.h) / 2 - 4, u = R / 100, raie = 15 * u;
    const o = [`<clipPath id="${id}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R)}"/></clipPath>`, `<g clip-path="url(#${id})">`];
    o.push(`<rect x="${f1(cx - R)}" y="${f1(cy - R)}" width="${f1(2 * R)}" height="${f1(R - raie - 4 * u)}" fill="${GRIS}" stroke="none"/>`);
    o.push(`<rect x="${f1(cx - R)}" y="${f1(cy + raie + 4 * u)}" width="${f1(2 * R)}" height="${f1(R - raie - 4 * u)}" fill="${GRIS}" stroke="none"/>`);
    const Rh = hasard(17);
    for (const s of [-1, 1]) {
      for (let rang = 2; rang >= 0; rang--) {
        const y0 = cy + s * (raie + rang * 26 * u);
        for (let x = cx + R + 40 * u - rang * 6 * u; x > cx - R - 30 * u; x -= 17 * u) {
          const xr = x + (Rh() - 0.5) * 5 * u, L = (100 + Rh() * 25) * u, pente = 0.38 + Rh() * 0.12;
          const r = [xr, y0], d = uni([-pente, s]);
          const pts = [r, add(r, [d[0] * L * 0.22 + 1.5 * u, d[1] * L * 0.3]), add(r, [d[0] * L * 0.55 - 4 * u, d[1] * L * 0.6]), add(r, [d[0] * L - 14 * u, d[1] * L * 0.84])];
          o.push(meche(pts, (15 + Rh() * 4) * u, { graine: Math.floor(Rh() * 1e6) + 1 }).svg);
        }
      }
    }
    o.push(interieur(cx, cy, R, u, raie), '</g>', h.cercle(cx, cy, R, A.arete));
    return { cx, cy, R, u, raie, svg: o.join('\n') };
  };
  const fenteH = (cx, cy, L, ouverte) => {
    if (!ouverte) { const q = []; for (let i = 0; i <= 12; i++) { const t = -1 + i / 6; q.push([cx + t * L / 2, cy + Math.sin(t * 2.6) * 0.8]); } return `<path d="${poly(q)}" ${A.arete}/>`; }
    const k = 24, g = [], d = [];
    for (let i = 0; i <= k; i++) { const t = -1 + 2 * i / k, e = 4.5 * Math.pow(Math.max(0, 1 - t * t), 0.75); g.push([cx + t * L / 2, cy - e]); d.push([cx + t * L / 2, cy + e]); }
    return [`<path d="${poly([...g, ...d.slice().reverse()])} Z" ${A.ombre}/>`, `<path d="${poly(g)}" ${A.arete}/>`, `<path d="${poly(d)}" ${A.arete}/>`,
      `<path d="M${f1(cx - L * 0.36)} ${f1(cy)} L${f1(cx + L * 0.36)} ${f1(cy)}" ${A.detail}/>`].join('\n');
  };

  // ─── 5. Une mèche de chaque côté, croisées par-dessus la coupure ────────────────────────────────────────────
  const croiser = z => {
    const P = {};
    const L = loupe(z, 'vue-2641-croiser', (cx, cy, R, u, raie) => {
      const xr = cx - 54 * u, lm = 9 * u;
      // A part du bord du bas de la raie, monte vers la droite ; B part du bord du haut, descend vers la droite
      const ptsA = [[xr, cy + raie + 2 * u], [xr + 14 * u, cy + 6 * u], [xr + 34 * u, cy - 8 * u], [xr + 64 * u, cy - 30 * u], [xr + 96 * u, cy - 54 * u]];
      const ptsB = ptsA.map(p => [p[0], 2 * cy - p[1]]);
      const mB = meche(ptsB, lm, { nouee: true, graine: 3 }), mA = meche(ptsA, lm, { nouee: true, graine: 4 });
      P.croise = [xr + 23 * u, cy];
      P.racine = ptsA[0];
      return [fenteH(cx, cy, 120 * u, true), mB.svg, mA.svg].join('\n');
    });
    return { svg: L.svg, P, L };
  };

  // ─── 6. Nouées : le demi-nœud desserré, tirer les deux bouts ────────────────────────────────────────────────
  const nouer = z => {
    const P = {};
    const L = loupe(z, 'vue-2641-nouer', (cx, cy, R, u, raie) => {
      const lm = 9 * u, U = (x, y) => [cx + x * u, cy + y * u];
      // A : la mèche du bas. Elle monte, passe en arc au-dessus de la coupure et redescend vers la droite.
      const ptsA = [U(-54, raie / u + 2), U(-42, 8), U(-30, 0), U(-21, -14), U(-9, -25), U(0, -28), U(9, -25), U(21, -14), U(30, 0), U(37, 14), U(47, 34), U(58, 54)];
      const ptsB = ptsA.map(p => [p[0], 2 * cy - p[1]]);
      // l'ordre : A de son arc jusqu'au bout (dessous à droite), puis B en entier, puis A de la racine à son arc
      // (dessus à gauche)
      const o = [fenteH(cx, cy, 120 * u, false)];
      o.push(meche(ptsA, lm, { nouee: true, graine: 5, de: 0.4 }).svg);
      o.push(meche(ptsB, lm, { nouee: true, graine: 6 }).svg);
      o.push(meche(ptsA, lm, { nouee: true, graine: 5, a: 0.4 }).svg);
      P.noeud = U(-30, 0);
      P.bouts = [ptsA[ptsA.length - 1], ptsB[ptsB.length - 1]];
      return o.join('\n');
    });
    const { cx, cy, u } = L;
    const t = uni([11, 20]);
    const fl = (p, s) => { const a = add(p, [t[0] * 6 * u, s * t[1] * 6 * u]), b = add(p, [t[0] * 30 * u, s * t[1] * 30 * u]); return h.geste(`M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}`); };
    return { svg: [L.svg, fl(P.bouts[0], 1), fl(P.bouts[1], -1)].join('\n'), P, L };
  };

  const memo = {};
  const G = (nom, fn, z) => { const c = `${nom}-${z.l}-${z.h}`; return memo[c] || (memo[c] = fn(z)); };
  const v2 = z => G('coller', zz => coller(zz, false), z), v3 = z => G('tirer', zz => coller(zz, true), z);
  const v1 = z => G('refendre', refendre, z), v4 = z => G('travers', travers, z), v5 = z => G('croiser', croiser, z), v6 = z => G('nouer', nouer, z);

  return {
    ref: '26-41',
    titre: 'Fermer une coupure : le ruban refendu, les cheveux noués',
    desc: 'Six vues, une par geste. Un morceau de ruban à conduits gris, à la trame de fils croisés : une lanière de la largeur d’un doigt déchirée en long, qu’on écarte (flèche rouge). Un avant-bras vu de dessus, coupé en travers, la coupure ouverte : un bout de lanière collé à gauche de la coupure, le reste plié en l’air au-dessus, tenu entre le pouce et l’index. La même vue : la main a tiré la lanière vers la droite (flèche rouge), les deux bords de la coupure se touchent sous la lanière, collée de l’autre côté. Trois lanières en travers de la coupure refermée. Le cuir chevelu dans une loupe, les cheveux écartés en raie le long de la coupure : une mèche prise de chaque côté, croisées par-dessus la coupure. Les deux mèches nouées d’un demi-nœud, encore lâche pour qu’on suive chaque mèche, et les deux bouts tirés (flèches rouges) pour serrer.',
    format: 'pleine',
    disposition: [['refendre', 'coller'], ['tirer', 'travers'], ['croiser', 'nouer']],
    hauteurs: [0.9, 0.9, 1.25],
    vues: {
      refendre: {
        titre: 'Refendre le ruban',
        dessin: z => v1(z).svg,
        renvois: z => { const P = v1(z).P; return [{ n: 1, rond: [P.laniere[0] - 70, P.laniere[1] + 30], cible: P.laniere, texte: 'déchirer en long, la largeur d’un doigt' }]; },
      },
      coller: {
        titre: 'Coller d’un côté',
        dessin: z => v2(z).svg,
        renvois: z => { const P = v2(z).P; return [{ n: 2, rond: [P.colle[0] - 6, z.h - 14], cible: P.colle, texte: 'un bout collé d’un côté, sur peau sèche' }]; },
      },
      tirer: {
        titre: 'Tirer, coller de l’autre côté',
        dessin: z => v3(z).svg,
        renvois: z => { const P = v3(z).P; return [{ n: 3, rond: [P.bords[0] - 40, z.h - 14], cible: P.bords, texte: 'tirer : les deux bords se touchent' }]; },
      },
      travers: {
        titre: 'En travers de la coupure',
        dessin: z => v4(z).svg,
        renvois: z => { const P = v4(z).P; return [{ n: 4, rond: [P.fente[0] + 74, P.fente[1]], cible: P.fente, texte: 'en travers, les bords joints dessous' }]; },
      },
      croiser: {
        titre: 'Cuir chevelu : croiser deux mèches',
        dessin: z => v5(z).svg,
        renvois: z => { const P = v5(z).P, L = v5(z).L; return [{ n: 5, rond: [L.cx - L.R - 2, L.cy - L.R * 0.5], cible: P.croise, texte: 'une mèche de chaque côté, croisées dessus' }]; },
      },
      nouer: {
        titre: 'Nouer, serrer',
        dessin: z => v6(z).svg,
        renvois: z => { const P = v6(z).P, L = v6(z).L; return [{ n: 6, rond: [L.cx - L.R + 2, L.cy - L.R * 0.62], cible: P.noeud, texte: 'nouées : tirer les bouts pour serrer' }]; },
      },
    },
  };
};
