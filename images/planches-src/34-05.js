// Planche 34-05 — L'onguent de bourgeons de peuplier baumier (ch. 34, étape 2, étape 29, §8 point 6,
// « Peser sans balance : le fléau à bras égaux » ; séchage : ch. 33, §5-C).
//
// Ce que le chapitre dit, et rien d'autre :
//   Le bourgeon : brun-orangé, très résineux, il colle aux doigts et sent le baume. Cueilli au
//   printemps, avant l'ouverture, sur une branche qu'on atteint. Séché à l'ombre comme au ch. 33
//   (claie, une seule couche, sans se toucher, courant d'air) ; sec quand il casse net. Écrasé.
//   1 part de bourgeons pour 3 parts de gras, en poids, au fléau à bras égaux : pivot au milieu
//   exact, plateaux (d'écorce) à la même distance du milieu, tare en ajoutant un caillou au plateau
//   léger, jamais en déplaçant une attache ; une part de bourgeons, puis trois pesées de gras égales
//   à elle. Chauffer doucement sans laisser fumer, filtrer au linge chaud, couler en pot. Jamais de
//   bourgeon frais dans le gras (botulisme).
//
// Aucune cote : rien ne se construit ici à une mesure donnée (le « jusqu'à 25 mm » du bourgeon sert à
// le reconnaître, pas à le fabriquer). Le pilon et le bol, les pierres et les braises, la casserole
// et le pot sont des choix de dessin pour « écraser », « chauffer doucement » et « couler » : ce
// qu'on trouve partout. Le filtrage se fait directement dans le pot : le linge chaud noué sur son
// col, la casserole versée dedans. Les mains sont le modèle calqué s11 (poing fermé).
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const P = p => `${f(p[0])} ${f(p[1])}`;
  const RAD = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const dir = deg => [Math.cos(deg * RAD), Math.sin(deg * RAD)];
  const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const blanc = (ep = 1.4) => `fill="${B}" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const noir = (ep = 0.7) => `fill="${N}" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round"`;

  // ─── mains simples : la boîte d'une vue, et l'angle qui met l'axe de la prise sur `axe` (degrés à l'écran)
  // avec l'avant-bras du côté de `vers`
  const BORD = z => ({ x0: 0, y0: 0, x1: z.l, y1: z.h });
  const poser = (o, axe, vers) => {
    const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } });
    delete base.objet;
    const e0 = h.formes.mainSimple(base);
    let best = null;
    for (const k of [0, 180]) {
      const a = axe - e0.prise.angle + k, e = h.formes.mainSimple(Object.assign({}, base, { angle: a }));
      const d = [e.coude[0] - e.poignet[0], e.coude[1] - e.poignet[1]], w = [vers[0] - e.poignet[0], vers[1] - e.poignet[1]];
      const c = (d[0] * w[0] + d[1] * w[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(w[0], w[1])) || 1);
      if (!best || c > best.c) best = { a, c };
    }
    return best.a;
  };

  // Un hasard qui redonne toujours le même dessin.
  const hasard = graine => { let s = graine; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

  // Une courbe douce par des points (Catmull-Rom), ouverte ou fermée.
  const lisse = (pts, ferme = false, debut = true) => {
    const n = pts.length, g = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = debut ? `M${P(pts[0])}` : '';
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${P(c1)} ${P(c2)} ${P(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // ─── le bourgeon ─────────────────────────────────────────────────────────────────────
  // Un fuseau pointu : base (b), angle de l'axe, longueur, demi-largeur maxi, courbure (+ : vers la
  // droite du sens de marche). Rend le contour et les arêtes des écailles.
  const PROFIL = [[0, 0.5], [0.1, 0.8], [0.3, 1], [0.55, 0.84], [0.78, 0.5], [0.92, 0.2], [1, 0]];
  const bourgeon = (b, angle, L, hw, { courbe = 0, ecailles = true, ep = 1.4, de = 0, a = 1 } = {}) => {
    const u = dir(angle), n = [-u[1], u[0]];                 // n : à droite du sens de marche
    const axe = t => add(add(b, mul(u, t * L)), mul(n, courbe * t * t * L * 0.12));
    const larg = t => {
      for (let i = 1; i < PROFIL.length; i++) if (t <= PROFIL[i][0]) {
        const [t0, w0] = PROFIL[i - 1], [t1, w1] = PROFIL[i]; return hw * (w0 + (w1 - w0) * (t - t0) / (t1 - t0));
      }
      return 0;
    };
    const ts = []; for (let i = 0; i <= 10; i++) ts.push(de + (a - de) * i / 10);
    const g = ts.map(t => add(axe(t), mul(n, -larg(t))));
    const d = ts.map(t => add(axe(t), mul(n, larg(t))));
    let chemin;
    if (a >= 1) chemin = lisse(g.slice(0, -1).concat([axe(1)])) + ' ' + lisse([axe(1)].concat(d.slice(0, -1).reverse()), false, false).replace(/^ /, '') + (de > 0 ? ' Z' : ` Q${P(sub(axe(0), mul(u, hw * 0.5)))} ${P(g[0])} Z`);
    else chemin = lisse(g) + ` L${P(d[d.length - 1])}` + lisse(d.slice().reverse(), false, false) + ' Z';
    const out = [h.path(chemin, blanc(ep))];
    if (ecailles) {
      const e1 = [0.08, 0.3, 0.55, 0.8].filter(t => t > de && t < a).map(t => add(axe(t), mul(n, larg(t) * 0.35)));
      const e2 = [0.04, 0.22, 0.42].filter(t => t > de && t < a).map(t => add(axe(t), mul(n, -larg(t) * 0.45)));
      if (e1.length > 1) out.push(h.path(lisse(e1), h.a.fin));
      if (e2.length > 1) out.push(h.path(lisse(e2), h.a.fin));
    }
    return out.join('\n');
  };

  // Des débris de bourgeons écrasés : petits éclats anguleux dans une zone (test d'appartenance).
  const debris = (x0, y0, x1, y1, dedans, nb, graine, taille = 2.6) => {
    const r = hasard(graine), out = [];
    for (let k = 0, essais = 0; k < nb && essais < nb * 30; essais++) {
      const c = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)];
      if (!dedans(c)) continue;
      const m = 3 + Math.floor(r() * 2), a0 = r() * 360, pts = [];
      for (let i = 0; i < m; i++) pts.push(add(c, mul(dir(a0 + i * 360 / m + r() * 30), taille * (0.6 + r() * 0.6))));
      out.push(h.chemin(pts, r() < 0.35 ? noir(0.5) : blanc(0.5), true)); k++;
    }
    return out.join('\n');
  };

  // Un morceau de gras : une motte arrondie à base plate, avec la trace de la cuillère.
  const gras = (cx, yb, l, ht, cache = false) => {
    const pts = [[-0.5, 0], [-0.49, -0.45], [-0.36, -0.86], [-0.05, -1], [0.3, -0.92], [0.48, -0.55], [0.5, 0]]
      .map(([a, b]) => [cx + a * l, yb + b * ht]);
    const at = cache ? `fill="none" stroke="${N}" stroke-width="0.7" stroke-dasharray="3 2.5" stroke-linejoin="round"` : blanc(1.4);
    const out = [h.path(lisse(pts) + ' Z', at)];
    if (!cache) out.push(h.path(`M${P([cx - l * 0.28, yb - ht * 0.62])} Q${P([cx - l * 0.05, yb - ht * 0.42])} ${P([cx + l * 0.24, yb - ht * 0.7])}`, h.a.fin));
    return out.join('\n');
  };

  // ─── 1. Cueillir ─────────────────────────────────────────────────────────────────────
  const A0 = [14, 138], A1 = [104, 66];
  const uT = uni(sub(A1, A0)), nT = [-uT[1], uT[0]];          // nT : côté bas-droit du rameau
  const angT = Math.atan2(uT[1], uT[0]) / RAD;
  const LT = Math.hypot(A1[0] - A0[0], A1[1] - A0[1]);
  const hwT = s => 6.5 - 1.6 * s;                              // demi-épaisseur du rameau, s de 0 à 1
  const bordT = (s, cote) => add(add(A0, mul(uT, s * LT)), mul(nT, cote * hwT(s)));
  const terminal = { base: add(A1, mul(dir(angT + 14), 7)), angle: angT + 14 };

  const cueillir = () => {
    const out = [];
    // le rameau, cassé net au pied (zigzag), coupé propre au bout où était le bourgeon
    const haut = [0, 0.25, 0.5, 0.75, 1].map(s => bordT(s, -1));
    const bas = [1, 0.75, 0.5, 0.25, 0].map(s => bordT(s, 1));
    const zig = [bordT(0, 1), add(A0, add(mul(uT, -3), mul(nT, 2.5))), add(A0, add(mul(uT, 2), mul(nT, -1))), add(A0, add(mul(uT, -2), mul(nT, -4))), bordT(0, -1)];
    out.push(h.path(lisse(haut) + ` L${P(bordT(1, 1))}` + lisse(bas, false, false) + zig.slice(1).map(p => ` L${P(p)}`).join('') + ' Z', blanc(1.4)));
    // la cicatrice du bourgeon cueilli, au bout du rameau
    out.push(h.path(lisse(Array.from({ length: 8 }, (_, i) => add(sub(A1, mul(uT, 0.6)), add(mul(uT, 1.6 * Math.cos(i * 45 * RAD)), mul(nT, 3.4 * Math.sin(i * 45 * RAD))))), true), h.a.fin));
    // deux bourgeons latéraux, collés au rameau, et la cicatrice de feuille sous chacun
    [[0.36, -1], [0.7, 1]].forEach(([s, cote]) => {
      const pied = bordT(s, cote * 0.7);
      const ang = angT + cote * 24;
      out.push(bourgeon(pied, ang, 25, 4.4, { courbe: -cote * 1.2 }));
      const c = bordT(s - 0.07, cote * 0.55), v = mul(nT, cote);
      out.push(h.path(`M${P(add(c, mul(uT, -3.6)))} Q${P(add(c, mul(v, 2.4)))} ${P(add(c, mul(uT, 3.6)))}`, h.a.detail));
    });
    // le bourgeon du bout, détaché, et le geste : on le plie vers le bas jusqu'à ce qu'il casse
    out.push(bourgeon(terminal.base, terminal.angle, 50, 6.6, { courbe: 0.6 }));
    const Cc = A1, r = 36, a0 = terminal.angle + 22, a1 = terminal.angle + 50;
    out.push(h.geste(`M${P(add(Cc, mul(dir(a0), r)))} A${r} ${r} 0 0 1 ${P(add(Cc, mul(dir(a1), r)))}`));
    return out.join('\n');
  };

  // ─── 2. Sécher ───────────────────────────────────────────────────────────────────────
  const FL = [16, 88], FR = [128, 88], OB = [36, -28];
  const surClaie = (j, k) => add(add(FL, mul(sub(FR, FL), j)), mul(OB, k));
  const baton = (a, b, w = 4.6) => {
    const u = uni(sub(b, a)), n = [-u[1] * w / 2, u[0] * w / 2];
    return h.path(`M${P(add(a, n))} L${P(add(b, n))} A${f(w / 2)} ${f(w / 2)} 0 0 1 ${P(sub(b, n))} L${P(sub(a, n))} A${f(w / 2)} ${f(w / 2)} 0 0 1 ${P(add(a, n))} Z`, blanc(1.4));
  };
  const buche = (avant, r) => {
    const u = uni(OB), n = [-u[1] * r, u[0] * r], arr = add(avant, mul(OB, 0.95));
    return [
      h.path(`M${P(add(avant, n))} L${P(add(arr, n))} L${P(sub(arr, n))} L${P(sub(avant, n))} Z`, blanc(1.4)),
      h.cercle(avant[0], avant[1], r, blanc(1.4)),
      h.cercle(avant[0], avant[1], r * 0.55, h.a.fin),
      h.cercle(avant[0], avant[1], r * 0.18, h.a.fin),
    ].join('\n');
  };
  const secher = () => {
    const out = [];
    // deux bûches sous la claie : l'air passe dessous aussi
    out.push(buche([30, 100], 8.5), buche([114, 100], 8.5));
    // le cadre, derrière d'abord
    const ext = (a, b, k) => { const u = uni(sub(b, a)); return [sub(a, mul(u, k)), add(b, mul(u, k))]; };
    out.push(baton(...ext(surClaie(0, 1), surClaie(1, 1), 7)));
    out.push(baton(...ext(surClaie(0, 0), surClaie(0, 1), 6)), baton(...ext(surClaie(1, 0), surClaie(1, 1), 6)));
    // le fond ajouré : les brins croisés
    // (motif : des brins horizontaux, et des brins en profondeur, penchés comme le côté de la claie)
    const biais = f(Math.atan2(OB[0], -OB[1]) / RAD * -1);
    out.push(`<defs><pattern id="p3405-claie" width="8.6" height="4.7" patternUnits="userSpaceOnUse" patternTransform="translate(${FL[0]} ${FL[1]}) skewX(${biais})"><line x1="0" y1="0" x2="8.6" y2="0" stroke="${N}" stroke-width="0.5"/><line x1="0" y1="0" x2="0" y2="4.7" stroke="${N}" stroke-width="0.5"/></pattern></defs>`);
    out.push(h.chemin([surClaie(0, 0), surClaie(1, 0), surClaie(1, 1), surClaie(0, 1)], `fill="url(#p3405-claie)" stroke="none"`, true));
    // les bourgeons, une seule couche, sans se toucher
    const r = hasard(11);
    [[0.1, 0.72], [0.3, 0.8], [0.52, 0.74], [0.73, 0.82], [0.9, 0.7], [0.16, 0.3], [0.38, 0.36], [0.6, 0.28], [0.82, 0.34]]
      .forEach(([j, k]) => {
        const c = surClaie(j + (r() - 0.5) * 0.04, k + (r() - 0.5) * 0.08), a = -30 + r() * 120;
        out.push(bourgeon(sub(c, mul(dir(a), 6.5)), a, 13, 2.9, { ecailles: false }));
      });
    out.push(baton(...ext(surClaie(0, 0), surClaie(1, 0), 7)));
    // l'air qui passe
    out.push(h.fleche(`M20 38 C45 30 70 44 100 34`, h.a.cache));
    // le bourgeon sec, cassé net en deux
    const b0 = [120, 132], L = 44, ang = 0, casse = add(b0, mul(dir(ang), L * 0.5));
    // chaque moitié tourne autour du point de cassure : le V d'une chose qui a cassé en pliant
    const moitie = (rot, dec, o) => {
      const base = add(casse, tourne(sub(add(b0, mul(dir(ang), dec)), casse), rot));
      return bourgeon(base, ang + rot, L, 6, o);
    };
    out.push(moitie(-22, -2.6, { a: 0.49 }), moitie(22, 2.6, { de: 0.51 }));
    return out.join('\n');
  };

  // ─── 3. Écraser ──────────────────────────────────────────────────────────────────────
  const BOL = { cx: 90, y: 100, rx: 60, ry: 11 };
  const pilonX = 100;
  const ecraser = z => {
    const out = [];
    const { cx, y, rx, ry } = BOL;
    // le bol de bois, vu de côté
    out.push(h.path(`M${cx - rx} ${y} C${cx - rx + 2} ${y + 30} ${cx - 34} ${y + 40} ${cx - 26} ${y + 40} L${cx + 26} ${y + 40} C${cx + 34} ${y + 40} ${cx + rx - 2} ${y + 30} ${cx + rx} ${y} Z`, blanc(2.4)));
    out.push(h.ellipse(cx, y, rx, ry, blanc(1.4)));
    out.push(h.ellipse(cx, y + 1.5, rx - 5, ry - 2.5, h.a.detail));
    // les bourgeons secs, écrasés au fond
    const dans = p => ((p[0] - cx) / (rx - 9)) ** 2 + ((p[1] - y - 3) / (ry - 4.5)) ** 2 < 1;
    out.push(debris(cx - rx, y - ry, cx + rx, y + ry, dans, 34, 5, 2.4));
    // le pilon : un bout de branche, plus gros du bas
    const haut = 12, bas = y + 3;
    const pilon = [h.path(`M${pilonX - 6} ${haut + 4} Q${pilonX - 6} ${haut} ${pilonX} ${haut} Q${pilonX + 6} ${haut} ${pilonX + 6} ${haut + 4} L${pilonX + 8.5} ${bas - 6} Q${pilonX + 8.5} ${bas} ${pilonX} ${bas} Q${pilonX - 8.5} ${bas} ${pilonX - 8.5} ${bas - 6} Z`, blanc(1.4)),
      h.ligne(pilonX - 2, haut + 10, pilonX - 3, 40, h.a.fin), h.ligne(pilonX + 3, 70, pilonX + 4, 88, h.a.fin)].join('\n');
    // la main gauche (mains simples), côté paume, serre le pilon : il entre par le haut du poing et ressort
    // en bas ; l'avant-bras part à gauche et sort du cadre
    const yP = 50, dP = 2 * (6 + 2.5 * (yP - haut - 4) / (bas - haut - 10));    // le diamètre du pilon au poing
    const oP = { x: pilonX, y: yP, pose: 'prise-manche', vue: 'paume', cote: 'gauche', echelle: 0.5, diametre: dP / 0.5 };
    const vP = [-200, yP + 8];
    const mP = h.formes.mainSimple({ ...oP, angle: poser(oP, 90, vP), avantbras: { vers: vP, bord: BORD(z), longueur: 'bord' } });
    out.push(mP.couches.main, mP.couches.masque, pilon, mP.couches.devant);
    // le coup, vers le bas
    out.push(h.geste(`M${pilonX + 40} 24 L${pilonX + 40} 66`));
    return out.join('\n');
  };

  // ─── 4. Peser ────────────────────────────────────────────────────────────────────────
  const CX = 200, YB = 44, BRAS = 122;                        // pivot, hauteur de la baguette, demi-bras
  const plateau = { y: 112, rx: 40, ry: 7 };
  const XG = CX - BRAS, XD = CX + BRAS;
  const cordeFine = pts => h.formes.corde(pts, { ep: 2.4, debut: 'fixe', fin: 'fixe', trait: 'detail' });
  const peser = () => {
    const out = [];
    // la perche d'où pend le fléau
    out.push(h.path(`M${CX - 70} 6 L${CX + 70} 5 L${CX + 72} 10 L${CX + 69} 15 L${CX - 70} 16 L${CX - 68} 11 Z`, blanc(1.4)));
    out.push(h.ligne(CX - 50, 9, CX - 20, 9.5, h.a.fin), h.ligne(CX + 18, 12, CX + 52, 11.5, h.a.fin));
    // la corde de suspension, au milieu exact
    out.push(cordeFine([[CX - 1, YB - 5], [CX - 4, 17], [CX - 5, 9], [CX, 2.5], [CX + 5, 9], [CX + 4, 17], [CX + 1, YB - 5]]));
    // les attaches des plateaux : trois fils, de l'encoche au bord de l'écorce
    for (const x of [XG, XD]) {
      out.push(h.ligne(x, YB + 2, x, plateau.y - plateau.ry, h.a.detail));
      out.push(h.ligne(x, YB + 2, x - plateau.rx + 2, plateau.y, h.a.detail));
      out.push(h.ligne(x, YB + 2, x + plateau.rx - 2, plateau.y, h.a.detail));
    }
    // la baguette, horizontale : à l'équilibre
    out.push(h.path(`M${XG - 16} ${YB - 3.5} L${XD + 16} ${YB - 3.5} Q${XD + 19} ${YB} ${XD + 16} ${YB + 3.5} L${XG - 16} ${YB + 3.5} Q${XG - 19} ${YB} ${XG - 16} ${YB - 3.5} Z`, blanc(2.4)));
    out.push(h.ligne(XG + 20, YB - 0.5, CX - 30, YB + 0.5, h.a.fin), h.ligne(CX + 34, YB, XD - 24, YB - 0.5, h.a.fin));
    // les encoches, et les nœuds qui y serrent la corde
    for (const x of [XG, CX, XD]) {
      out.push(h.path(`M${x - 2.4} ${YB - 3.5} L${x} ${YB - 1} L${x + 2.4} ${YB - 3.5}`, h.a.detail));
      out.push(h.rect(x - 2.2, YB - 4.5, 4.4, 9, `${noir(0.5)} rx="1.2"`));
    }
    // les plateaux d'écorce
    for (const x of [XG, XD]) {
      out.push(h.path(`M${x - plateau.rx} ${plateau.y} C${x - plateau.rx + 6} ${plateau.y + 14} ${x + plateau.rx - 6} ${plateau.y + 14} ${x + plateau.rx} ${plateau.y}`, blanc(1.4)));
      out.push(h.ellipse(x, plateau.y, plateau.rx, plateau.ry, blanc(1.4)));
      for (const k of [-0.5, 0, 0.45]) out.push(h.ligne(x + k * plateau.rx - 4, plateau.y + 7 + Math.abs(k) * -2, x + k * plateau.rx + 4, plateau.y + 7 + Math.abs(k) * -2, h.a.fin));
    }
    // à gauche : une part de bourgeons écrasés
    const tas = [[XG - 26, plateau.y + 1], [XG - 20, plateau.y - 7], [XG - 8, plateau.y - 14], [XG + 4, plateau.y - 15], [XG + 15, plateau.y - 9], [XG + 25, plateau.y + 1]];
    out.push(h.path(lisse(tas) + ' Z', blanc(1.4)));
    const dansTas = p => p[1] > plateau.y - 13 + Math.abs(p[0] - XG + 2) ** 2 / 55 && p[1] < plateau.y;
    out.push(debris(XG - 26, plateau.y - 16, XG + 26, plateau.y, dansTas, 26, 9, 2.1));
    // à droite : le caillou de tare, et le gras pesé contre les bourgeons
    out.push(h.path(lisse([[XD + 16, plateau.y + 2], [XD + 17, plateau.y - 5], [XD + 24, plateau.y - 9], [XD + 32, plateau.y - 6], [XD + 34, plateau.y + 1]]) + ' Z', h.a.hachure('pierre', 'arete')));
    out.push(gras(XD - 6, plateau.y + 1, 36, 20));
    // les trois pesées de gras : deux déjà faites, la troisième va les rejoindre
    const sol = 138, x0 = 430;
    out.push(h.path(`M${x0 - 28} ${sol} L${x0 + 142} ${sol} L${x0 + 142} ${sol + 6} L${x0 - 28} ${sol + 6} Z`, h.a.hachure('bois', 'arete')));
    out.push(gras(x0, sol, 36, 20), gras(x0 + 50, sol, 36, 20), gras(x0 + 100, sol, 36, 20, true));
    out.push(h.fleche(`M${XD + 36} ${plateau.y - 12} C${XD + 80} ${plateau.y - 40} ${x0 + 90} ${plateau.y - 36} ${x0 + 99} ${sol - 26}`));
    // le point à vérifier : la corde au milieu exact de la baguette
    out.push(h.controle(CX, YB - 3, 9));
    return out.join('\n');
  };

  // ─── 5. Chauffer ─────────────────────────────────────────────────────────────────────
  const chauffer = () => {
    const out = [];
    const sol = 152;
    out.push(h.path(`M8 ${sol} L254 ${sol} L254 ${sol + 7} L8 ${sol + 7} Z`, h.a.hachure('terre', 'aucun')), h.ligne(8, sol, 254, sol, h.a.arete));
    // les braises, puis les deux pierres de devant
    const r = hasard(3);
    for (let i = 0; i < 17; i++) {
      const c = [97 + (i % 9) * 8.2 + r() * 3, sol - 5 - Math.floor(i / 9) * 7 - r() * 2];
      const pts = []; const m = 4 + Math.floor(r() * 3), a0 = r() * 90;
      for (let k = 0; k < m; k++) pts.push(add(c, mul(dir(a0 + k * 360 / m + r() * 25), 3.6 + r() * 1.8)));
      out.push(h.chemin(pts, i % 3 === 0 ? noir(0.7) : blanc(0.7), true));
      if (i % 3 !== 0) out.push(h.ligne(c[0] - 1.8, c[1] + 0.6, c[0] + 1.4, c[1] - 0.8, h.a.fin));
    }
    out.push(h.path(lisse([[46, sol], [48, sol - 24], [66, sol - 36], [88, sol - 32], [98, sol - 12], [96, sol]]) + ' Z', h.a.hachure('pierre', 'arete')));
    out.push(h.path(lisse([[164, sol], [162, sol - 16], [174, sol - 34], [198, sol - 36], [214, sol - 22], [216, sol]]) + ' Z', h.a.hachure('pierre', 'arete')));
    // la chaleur qui monte, sans flamme
    for (const x of [112, 131, 150]) out.push(h.fleche(`M${x} ${sol - 18} q-3 -3 0 -6 q3 -3 0 -6`, h.a.cache));
    // le chaudron posé sur les pierres, et son anse
    const cx = 131, yh = 62, yb = sol - 34, rx = 58;
    const corpsC = `M${cx - rx} ${yh} C${cx - rx - 4} ${yh + 30} ${cx - rx + 2} ${yb} ${cx - rx + 18} ${yb} L${cx + rx - 18} ${yb} C${cx + rx - 2} ${yb} ${cx + rx + 4} ${yh + 30} ${cx + rx} ${yh} Z`;
    out.push(h.path(corpsC, h.a.blanc));
    // la face de droite du chaudron, à l'ombre
    out.push(`<clipPath id="ombre-p3405"><rect x="${cx + rx * 0.42}" y="${yh}" width="${rx}" height="${yb - yh + 2}"/></clipPath>`);
    out.push(`<g clip-path="url(#ombre-p3405)">${h.path(corpsC, h.a.ombre)}</g>`);
    out.push(h.path(corpsC, h.a.contour));
    out.push(h.ellipse(cx, yh, rx, 9, blanc(1.4)));
    // le gras fondu, les bourgeons dedans
    out.push(h.ellipse(cx, yh + 3, rx - 6, 5.5, h.a.detail));
    const dans = p => ((p[0] - cx) / (rx - 12)) ** 2 + ((p[1] - yh - 3) / 4) ** 2 < 1;
    out.push(debris(cx - rx, yh - 3, cx + rx, yh + 8, dans, 18, 21, 2));
    // les deux oreilles du chaudron
    for (const k of [-1, 1]) out.push(h.path(`M${cx + k * (rx + 1)} ${yh + 8} q${k * 9} 1 ${k * 9} 7 q0 6 ${-k * 8} 6`, h.a.arete));
    // la cuillère de bois, appuyée au bord
    out.push(h.path(`M${cx + 20} ${yh + 2} L${cx + 84} ${yh - 44} L${cx + 87} ${yh - 40} L${cx + 24} ${yh + 5} Z`, blanc(1.4)));
    return out.join('\n');
  };

  // ─── 6. Filtrer, couler ──────────────────────────────────────────────────────────────
  const JX = 104, JR = 44, JH = 102, JB = 158, EPM = 4;       // le pot, en coupe
  const SAC = 128;                                             // le fond du linge, dans le col
  const TILT = -25;
  const casseLocal = { l: 30, h: 16 };
  const bec = [JX - 2, 64];
  const centreCass = sub(bec, tourne([-casseLocal.l - 3, -casseLocal.h - 1], TILT));
  const C = p => add(centreCass, tourne(p, TILT));
  const filtrer = z => {
    const out = [];
    // le pot en coupe : parois et fond pleins
    out.push(h.path(`M${JX - JR} ${JH} L${JX - JR} ${JB - 4} Q${JX - JR} ${JB} ${JX - JR + 4} ${JB} L${JX + JR - 4} ${JB} Q${JX + JR} ${JB} ${JX + JR} ${JB - 4} L${JX + JR} ${JH} L${JX + JR - EPM} ${JH} L${JX + JR - EPM} ${JB - EPM - 2} L${JX - JR + EPM} ${JB - EPM - 2} L${JX - JR + EPM} ${JH} Z`, h.a.plein));
    // l'onguent filtré, liquide au fond du pot
    const niv = 140;
    out.push(h.rect(JX - JR + EPM, niv, 2 * (JR - EPM), JB - EPM - 2 - niv, h.a.hachure('eau', 'aucun')));
    out.push(h.ligne(JX - JR + EPM, niv, JX + JR - EPM, niv, h.a.detail));
    // les gouttes qui passent le linge
    for (const [x, y] of [[JX - 3, SAC + 2], [JX + 1, SAC + 6]]) out.push(h.path(`M${x} ${y} q-2.6 3.6 0 5.2 q2.6 -1.6 0 -5.2 Z`, h.a.plein));
    // le linge : posé sur le col, creusé dedans, les pans rabattus dehors et noués
    const demi = [[-JR - 6, JH + 27], [-JR - 2.4, JH + 16], [-JR - 1.8, JH + 7], [-JR - 1, JH + 0.5], [-JR + 1.5, JH - 1.6], [-JR + 6, JH - 0.6], [-JR + 14, JH + 5], [-18, SAC - 9]];
    const linge = demi.map(([x, y]) => [JX + x, y]).concat([[JX, SAC]], demi.slice().reverse().map(([x, y]) => [JX - x, y]));
    out.push(h.path(lisse(linge), h.a.contour));
    out.push(h.path(lisse(linge), `fill="none" stroke="${B}" stroke-width="0.7" stroke-linejoin="round" stroke-linecap="round"`));
    // la corde qui serre le linge sous le rebord, vue en coupe de chaque côté
    out.push(h.cercle(JX - JR - 5, JH + 11, 2.4, h.a.plein), h.cercle(JX + JR + 5, JH + 11, 2.4, h.a.plein));
    // les débris qui restent dans le linge
    const fond = x => SAC - 24 * ((x - JX) / 34) ** 2;
    const dansSac = p => Math.abs(p[0] - JX) < 21 && p[1] < fond(p[0]) - 3 && p[1] > fond(p[0]) - 10;
    out.push(debris(JX - 22, JH, JX + 22, SAC, dansSac, 16, 31, 2.2));
    // le filet de gras qui tombe du bec dans le linge
    out.push(h.path(`M${bec[0] - 1.6} ${bec[1] + 1} C${bec[0] - 3} ${bec[1] + 20} ${JX - 1.5} ${SAC - 40} ${JX - 1.5} ${SAC - 12} L${JX + 1.5} ${SAC - 12} C${JX + 1.5} ${SAC - 40} ${bec[0] + 1} ${bec[1] + 18} ${bec[0] + 1.8} ${bec[1] + 1} Z`, blanc(0.7)));
    // la casserole, penchée ; son manche, et la main qui le tient
    const { l, h: hc } = casseLocal;
    const corps = [[-l, -hc], [-l - 3, -hc - 1.5], [-l, -hc + 2], [-l + 1, hc - 5], [-l + 5, hc], [l - 5, hc], [l - 1, hc - 5], [l, -hc], [l + 2, -hc - 1.5]].map(C);
    out.push(h.path(`M${P(corps[0])} L${P(corps[1])} L${P(corps[2])} L${P(corps[3])} Q${P(C([-l, hc]))} ${P(corps[4])} L${P(corps[5])} Q${P(C([l, hc]))} ${P(corps[6])} L${P(corps[7])} L${P(corps[8])} Z`, blanc(2.4)));
    out.push(h.ligne(...C([-l + 1, -hc + 4]), ...C([l - 1, -hc + 4]), h.a.detail));
    const m0 = C([l, -hc + 7]), m1 = C([l + 56, -hc + 7]);
    const prise = C([l + 32, -hc + 7]);
    const manche = [C([l, -hc + 4]), C([l + 58, -hc + 5]), C([l + 60, -hc + 7]), C([l + 58, -hc + 9]), C([l, -hc + 10])];
    const objet = h.path(`M${P(manche[0])} L${P(manche[1])} Q${P(manche[2])} ${P(manche[3])} L${P(manche[4])} Z`, blanc(1.4));
    // la main gauche (mains simples) serre le manche : il entre d'un côté du poing et son bout ressort de
    // l'autre ; l'avant-bras descend à droite et sort du cadre
    const d = uni(sub(m1, m0));
    const oF = { x: prise[0], y: prise[1], pose: 'prise-manche', vue: 'paume', cote: 'gauche', echelle: 0.5, diametre: 6 / 0.5 };
    const vF = [prise[0] + 120, z.h + 200];
    const mF = h.formes.mainSimple({ ...oF, angle: poser(oF, Math.atan2(d[1], d[0]) / RAD, vF), avantbras: { vers: vF, bord: BORD(z), longueur: 'bord' } });
    out.push(mF.couches.main, mF.couches.masque, objet, mF.couches.devant);
    return out.join('\n');
  };

  return {
    ref: '34-05',
    titre: 'L’onguent de bourgeons de peuplier baumier',
    desc: 'En six vues : le bourgeon fermé détaché du rameau ; les bourgeons séchés à l’ombre sur une claie, puis cassés net ; écrasés au pilon dans un bol ; pesés au fléau à bras égaux, une part de bourgeons contre trois pesées de gras ; chauffés doucement dans le chaudron sur des braises ; filtrés au linge chaud noué sur le pot, les débris restant dans le linge. L’encadré danger : jamais de bourgeon frais dans le gras.',
    format: 'pleine',
    disposition: [['cueillir', 'secher', 'ecraser'], ['peser'], ['chauffer', 'filtrer']],
    hauteurs: [1, 1, 1.1],
    largeurs: [[1, 1, 1], [1], [1, 1.2]],
    vues: {
      cueillir: {
        titre: 'Cueillir fermé, au printemps', dessin: cueillir,
        renvois: () => [{ n: 1, rond: [150, 14], cible: add(terminal.base, mul(dir(terminal.angle), 26)), texte: 'fermé, collant, sent le baume' }],
      },
      secher: {
        titre: 'Sécher à l’ombre', dessin: secher,
        renvois: () => [
          { n: 2, rond: [166, 30], cible: surClaie(0.73, 0.82), texte: 'une couche, sans se toucher' },
          { n: 3, rond: [96, 124], cible: [141, 127], texte: 'sec : il casse net' },
        ],
      },
      ecraser: {
        titre: 'Écraser', dessin: ecraser,
        renvois: () => [{ n: 4, rond: [168, 128], cible: [BOL.cx + 30, BOL.y + 3], texte: 'bourgeons secs seulement' }],
      },
      peser: {
        titre: 'Peser 1 pour 3, au fléau à bras égaux', dessin: peser,
        renvois: () => [
          { n: 5, rond: [CX + 40, 26], cible: [CX + 1, 26], texte: 'suspendu au milieu exact' },
          { n: 6, rond: [XD + 34, 20], cible: [XD + 1, YB - 3], texte: 'attaches à égale distance' },
          { n: 7, rond: [XD + 58, 128], cible: [XD + 26, plateau.y - 3], texte: 'tare : un caillou ajouté' },
          { n: 8, rond: [XG - 58, 84], cible: [XG - 12, plateau.y - 8], texte: 'une part de bourgeons' },
          { n: 9, rond: [560, 100], cible: [530, 124], texte: 'trois pesées de gras égales' },
        ],
      },
      chauffer: {
        titre: 'Chauffer doucement', dessin: chauffer,
        renvois: () => [{ n: 10, rond: [236, 126], cible: [150, 144], texte: 'feu doux, sans fumée' }],
      },
      filtrer: {
        titre: 'Filtrer au linge chaud, couler en pot', dessin: filtrer,
        renvois: () => [
          { n: 11, rond: [24, 100], cible: [JX - JR - 5, JH + 11], texte: 'linge chaud, noué sur le pot' },
          { n: 12, rond: [24, 140], cible: [JX - 11, SAC - 9], texte: 'les débris restent au linge' },
        ],
      },
    },
    danger: 'Jamais de bourgeon frais dans le gras : il y apporte l’eau et les spores du sol, et le gras sans air fait le milieu du botulisme. Le botulisme ne change ni l’odeur, ni le goût, ni l’apparence.',
  };
};
