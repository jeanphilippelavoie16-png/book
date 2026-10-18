// Planche 15-02. Siphonner sans la bouche (chapitre 15, variante d'urgence, « Tirer le carburant de là où il est »).
// Refaite depuis zéro le 18 octobre 2026 : nouveau dessin, rien de l'ancienne version.
//
// La façon principale, en haut : deux boyaux dans le goulot bourré d'un chiffon, la pompe à vélo sur le court ; l'air
// poussé dans le réservoir fait monter l'essence dans le long, qui la mène au bidon posé au sol, plus bas. En bas, après
// un filet, l'autre façon (règle 10) : sans pompe, le boyau à bille qu'on secoue ; « au lieu de 3 à 5 ».
//
// Ce que dit le texte (HEAD, chapitre 15, section 9) : le bidon « franchement plus bas que le réservoir » ; « un long qui
// descend au fond et sort vers le bidon, un court qui reste dans le ciel du réservoir. On bourre le goulot d'un chiffon
// autour des deux, et on souffle dans le court avec une pompe à vélo ou une pompe de matelas, à la main et lentement » ;
// « une bille ou un roulement laissé libre dans le bout du boyau, retenu par un clou traversé en croix : il se soulève
// quand le liquide monte et retombe quand il voudrait redescendre. On plonge et on secoue de haut en bas » ; « le
// contenant est posé au sol ».
// Sources : le bidon au sol, sources/83-cchst-garages-securite-essence.md (« Placer le contenant sur le sol ») ; le boyau
// à clapet qu'on secoue, le récipient plus bas, le siège en bas, l'élément libre au-dessus et la butée au-dessus de
// l'élément, sources/15-brevet-us4414997-siphon-clapet.html. Le texte ne nomme pas le siège ; sans lui la bille ne
// retient rien : la planche le dessine (un bout de tube plus étroit enfoncé dans le bout du boyau), d'après le brevet.
// La méthode à deux boyaux et la pompe n'ont pas de source enregistrée : la planche ne dessine que la géométrie que le
// texte décrit (le long au fond, le court hors de l'essence, le chiffon, la pompe), sans cote ni chiffre.
// Proportions dessinées, sans cote (le chapitre n'en donne pas) : baril de 205 L (57 × 88 cm), bidon de 20 L, pompe
// à vélo debout ; boyau de 16 mm intérieur et 20 mm dehors, bille de 12 mm, siège de 8 mm de trou.
//
// La main : h.formes.mainStock, « poing-barre » (1-01), l'objet du fichier enlevé (objet: false) ; le boyau est posé
// sur l'axe .objet, avant la main. Elle tient le boyau au-dessus du goulot et porte le geste de secouer.
// Le rouge : repère 5 (pousser la pompe), repère 11 (secouer, flèche double), repère 13 (la bille sur le trou, cercle).
module.exports = (h) => {
  const A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const NOIR = '#1A1A1A';

  // ─── Outils ───────────────────────────────────────────────────────────────────────────────────────
  // Une polyligne aux coins arrondis, échantillonnée (pour poser un boyau d'épaisseur constante).
  const lisser = (pts, r) => {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
      const d1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), d2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      const rr = Math.min(r, d1 / 2, d2 / 2);
      const a = [p1[0] + (p0[0] - p1[0]) * rr / d1, p1[1] + (p0[1] - p1[1]) * rr / d1];
      const b = [p1[0] + (p2[0] - p1[0]) * rr / d2, p1[1] + (p2[1] - p1[1]) * rr / d2];
      for (let k = 0; k <= 14; k++) {
        const t = k / 14;
        out.push([(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * p1[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * p1[1] + t * t * b[1]]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out.filter((p, i, t) => i === 0 || Math.hypot(p[0] - t[i - 1][0], p[1] - t[i - 1][1]) > 0.05);
  };
  // Un boyau : le contour fermé d'un tube de largeur w autour de la ligne pts (les deux bouts coupés droit).
  const boyau = (pts, w, r = 12, at = blanc(A.arete), bouts = [true, true]) => {
    const P = lisser(pts, r);
    const N = P.map((p, i) => {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy);
      return [-dy / d, dx / d];
    });
    const G = P.map((p, i) => `${f(p[0] + N[i][0] * w / 2)} ${f(p[1] + N[i][1] * w / 2)}`);
    const D = P.map((p, i) => `${f(p[0] - N[i][0] * w / 2)} ${f(p[1] - N[i][1] * w / 2)}`);
    const ferme = `M${G.join(' L')} L${[...D].reverse().join(' L')} Z`;
    if (bouts[0] && bouts[1]) return h.path(ferme, at);
    // un bout sans trait (le boyau continue dedans) : le fond blanc fermé, puis le contour ouvert de ce côté
    const fond = h.path(ferme, A.blanc);
    const trait = at.replace(/fill="[^"]*"/, 'fill="none"');
    let d;
    if (bouts[1]) d = `M${G.join(' L')} L${[...D].reverse().join(' L')}`;        // le trait passe par le bout de fin
    else if (bouts[0]) d = `M${[...G].reverse().join(' L')} L${D.join(' L')}`;   // le trait passe par le bout de début
    else d = `M${G.join(' L')} M${D.join(' L')}`;
    return fond + '\n' + h.path(d, trait);
  };
  // Le point à la distance t (0 à 1) le long d'une polyligne lissée : pour poser une flèche le long d'un boyau.
  const le_long = (pts, r) => {
    const P = lisser(pts, r);
    const cum = [0];
    for (let i = 1; i < P.length; i++) cum.push(cum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    return t => {
      const L = t * cum[cum.length - 1];
      let i = 1;
      while (i < P.length - 1 && cum[i] < L) i++;
      const u = (L - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
      return [P[i - 1][0] + u * (P[i][0] - P[i - 1][0]), P[i - 1][1] + u * (P[i][1] - P[i - 1][1])];
    };
  };

  // Les abscisses où la ligne d'un boyau croise l'horizontale y (pour couper le trait tireté du niveau).
  const croisements = (pts, r, y) => {
    const P = lisser(pts, r), xs = [];
    for (let i = 1; i < P.length; i++) {
      const [a, b] = [P[i - 1], P[i]];
      if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) xs.push(a[0] + (y - a[1]) / (b[1] - a[1]) * (b[0] - a[0]));
    }
    return xs;
  };
  // Le niveau de l'essence du baril, prolongé en tireté jusqu'au-dessus du bidon, coupé là où un boyau le croise.
  const niveau = (g, boyaux) => {
    let segs = [[g.x1 + 6, g.xJ + g.lJ + 4]];
    for (const [pts, r] of boyaux) for (const xc of croisements(pts, r, g.yN)) {
      segs = segs.flatMap(([a, b]) => (xc - 7 > a && xc + 7 < b ? [[a, xc - 7], [xc + 7, b]] : [[a, b]]));
    }
    return segs.map(([a, b]) => h.path(`M${f(a)} ${f(g.yN)} L${f(b)} ${f(g.yN)}`, A.cache)).join('\n');
  };

  // ─── La scène : le baril sur son support, le bidon au sol ─────────────────────────────────────────
  // Échelle de la scène : s unités par centimètre.
  const s = 1.65;
  const S = (z, x0 = 112) => {
    const sol = z.h - 8;
    const D = 57 * s, Hd = 88 * s;                       // le baril de 205 L
    const hB = 19 * s, hP = 4.5 * s;                     // deux blocs de béton empilés, un madrier
    const x1 = x0 + D;
    const yP = sol - 2 * hB - hP;                        // le dessus des blocs, le dessous du madrier
    const yR = yP - Hd;                                  // le haut du rebord du baril
    const yL = yR + 3, yF = yP - 3;                      // le couvercle et le fond, en retrait du rebord
    const yN = yF - 0.52 * (yF - yL);                    // le niveau de l'essence
    const xB = x0 + 0.7 * D, wB = 18;                    // la bonde (grossie pour qu'on y voie les deux boyaux)
    const xJ = z.l - 74, lJ = 35 * s, hJ = 44 * s;       // le bidon de 20 L, vu de côté
    return { sol, D, Hd, hB, hP, x0, x1, yP, yR, yL, yF, yN, xB, wB, xJ, lJ, hJ };
  };

  const support = g => {
    const o = [];
    const { x0, x1, sol, hB, hP, yP } = g;
    const lb = 19 * s;
    for (const xb of [x0 - 6, x1 + 6 - lb]) {
      for (const k of [0, 1]) o.push(h.rect(xb, sol - (k + 1) * hB, lb, hB, A.hachure('gravier', 'arete')));
    }
    // le madrier, vu de chant : deux traits de fil
    o.push(h.rect(x0 - 12, yP, x1 - x0 + 24, hP, blanc(A.arete)));
    o.push(h.path(`M${f(x0 - 4)} ${f(yP + hP * 0.45)} L${f(x0 + 40)} ${f(yP + hP * 0.45)}`, A.fin));
    o.push(h.path(`M${f(x1 - 30)} ${f(yP + hP * 0.6)} L${f(x1 + 6)} ${f(yP + hP * 0.6)}`, A.fin));
    return o.join('\n');
  };

  const baril = g => {
    const o = [];
    const { x0, x1, yR, yL, yF, yN, yP, Hd, xB, wB } = g;
    // l'essence, en coupe
    o.push(h.rect(x0, yN, x1 - x0, yF - yN, A.hachure('eau', 'aucun')));
    o.push(h.ligne(x0, yN, x1, yN, A.detail));
    // les parois coupées, avec les deux cerclages en bosse
    const rh = 3.2, cercl = [yR + Hd * 0.34, yR + Hd * 0.66];
    const paroi = (x, balayage) => {
      let d = `M${f(x)} ${f(yR)}`;
      for (const y of cercl) d += ` L${f(x)} ${f(y - rh)} A${rh} ${rh} 0 0 ${balayage} ${f(x)} ${f(y + rh)}`;
      return d + ` L${f(x)} ${f(yP)}`;
    };
    o.push(h.path(paroi(x0, 0), A.contour), h.path(paroi(x1, 1), A.contour));
    // le couvercle (ouvert à la bonde) et le fond, en retrait du rebord
    o.push(h.ligne(x0, yL, xB - wB / 2, yL, A.contour), h.ligne(xB + wB / 2, yL, x1, yL, A.contour));
    o.push(h.ligne(x0, yF, x1, yF, A.contour));
    // le collet de la bonde
    o.push(h.rect(xB - wB / 2 - 2.6, yL - 3.4, 2.6, 3.4, A.plein), h.rect(xB + wB / 2, yL - 3.4, 2.6, 3.4, A.plein));
    return o.join('\n');
  };

  // Le bidon de 20 L, vu de côté : le corps et son X embouti, la poignée, le bec en haut à gauche, ouvert.
  const bidon = g => {
    const { xJ: x, lJ: L, hJ: H, sol } = g, yT = sol - H, o = [];
    // la face à l'ombre : le côté droit (lumière en haut à gauche)
    o.push(h.path(`M${f(x + L - 6)} ${f(yT + 2)} L${f(x + L)} ${f(yT + 8)} L${f(x + L)} ${f(sol)} L${f(x + L - 6)} ${f(sol)} Z`, A.ombre));
    o.push(h.path(`M${f(x + 5)} ${f(yT)} L${f(x + L - 6)} ${f(yT)} Q${f(x + L)} ${f(yT)} ${f(x + L)} ${f(yT + 6)} L${f(x + L)} ${f(sol)} L${f(x)} ${f(sol)} L${f(x)} ${f(yT + 5)} Q${f(x)} ${f(yT)} ${f(x + 5)} ${f(yT)} Z`, A.contour));
    o.push(h.ligne(x + L - 6, yT + 2, x + L - 6, sol, A.detail));
    // le X embouti, dans son cadre
    const bx0 = x + 6, bx1 = x + L - 12, by0 = yT + 9, by1 = sol - 7;
    o.push(h.rect(bx0, by0, bx1 - bx0, by1 - by0, A.detail));
    o.push(h.path(`M${f(bx0 + 3)} ${f(by0 + 3)} L${f(bx1 - 3)} ${f(by1 - 3)} M${f(bx1 - 3)} ${f(by0 + 3)} L${f(bx0 + 3)} ${f(by1 - 3)}`, A.detail));
    // la poignée sur le dessus
    const px0 = x + L * 0.42, px1 = x + L * 0.9;
    o.push(h.path(`M${f(px0)} ${f(yT)} L${f(px0 + 3)} ${f(yT - 9)} L${f(px1 - 3)} ${f(yT - 9)} L${f(px1)} ${f(yT)}`, blanc(A.arete)));
    o.push(h.path(`M${f(px0 + 6)} ${f(yT)} L${f(px0 + 7.5)} ${f(yT - 5)} L${f(px1 - 7.5)} ${f(yT - 5)} L${f(px1 - 6)} ${f(yT)}`, A.detail));
    // le bec : un col court penché vers la gauche, ouvert
    const ax = -0.423, ay = -0.906, nx = -ay, ny = ax;      // l'axe du bec (vers le haut à gauche) et sa normale
    const bc = [x + 12, yT + 1], lb = 12, wb = 11;
    const P = (u, v) => [bc[0] + ax * u + nx * v, bc[1] + ay * u + ny * v];
    const col = [P(0, -wb / 2), P(lb, -wb / 2), P(lb, -wb / 2 - 1.5), P(lb + 3, -wb / 2 - 1.5), P(lb + 3, wb / 2 + 1.5), P(lb, wb / 2 + 1.5), P(lb, wb / 2), P(0, wb / 2)];
    const bouche = P(lb + 3, 0);
    return { svg: o.join('\n'), col: h.chemin(col, blanc(A.arete), true), bouche, axe: [ax, ay] };
  };

  // La pompe à vélo debout : le pied, le corps, la tige, la poignée en T, le tuyau qui part du bas.
  const pompe = (xc, sol) => {
    const o = [], yC = sol - 6 - 92;
    o.push(h.rect(xc - 22, sol - 5, 44, 5, blanc(A.arete)));
    o.push(h.rect(xc + 1.5, yC, 3.5, sol - 5 - yC, A.ombre));
    o.push(h.rect(xc - 5, yC, 10, sol - 5 - yC, A.contour));
    o.push(h.rect(xc - 6.5, yC - 5, 13, 5, blanc(A.arete)));
    o.push(h.rect(xc - 1.3, yC - 25, 2.6, 20, blanc(A.detail)));
    o.push(h.rect(xc - 21, yC - 31, 42, 6.5, blanc(A.contour) + ' rx="3"'));
    // le raccord du tuyau, au bas du corps
    o.push(h.rect(xc + 5, sol - 15, 5, 5, blanc(A.detail)));
    return { svg: o.join('\n'), yPoignee: yC - 31, sortie: [xc + 10, sol - 12.5] };
  };

  // ─── Vue 1 : avec une pompe à vélo ────────────────────────────────────────────────────────────────
  const wS = 6.5;                                        // le boyau, dans la scène
  const V1 = z => {
    const g = S(z);
    const { xB, yL, yF, yN, x0, sol } = g;
    const xLong = xB + 4.3, xCourt = xB - 4.3;
    const bd = bidon(g);
    // le long : du fond du baril, par la bonde, en arc, jusqu'au bec du bidon
    const mL = [bd.bouche[0] - bd.axe[0] * 8, bd.bouche[1] - bd.axe[1] * 8];   // le bout, un peu entré dans le bec
    const long = [[xLong, yF - 4], [xLong, yL - 30], [xLong + 6, yL - 46], [xLong + 40, yL - 46], [bd.bouche[0] + bd.axe[0] * 100, bd.bouche[1] + bd.axe[1] * 100], mL];
    // le court : de l'air du baril, par la bonde, par-dessus le bord, jusqu'à la pompe
    const xp = 34;
    const pp = pompe(xp, sol);
    const court = [[xCourt, yL + 9], [xCourt, yL - 22], [xCourt - 26, yL - 36], [x0 - 34, yL - 36], [x0 - 44, yL - 20], [x0 - 44, sol - 34], [x0 - 52, sol - 22]];
    const bout = court[court.length - 1];
    return { g, bd, long, court, pp, xp, bout, xLong, xCourt };
  };
  const vue1 = z => {
    const v = V1(z), { g, bd, long, court, pp, bout } = v, o = [];
    o.push(support(g), baril(g));
    // le niveau de l'essence, prolongé jusqu'au-dessus du bidon : le bidon est bien plus bas
    o.push(niveau(g, [[long, 14]]));
    o.push(bd.svg);
    // le tuyau de la pompe, du raccord jusque dans le bout du boyau court (posé avant : le boyau le cache où il entre)
    const [sx, sy] = pp.sortie, av = court[court.length - 2];
    const dl = Math.hypot(bout[0] - av[0], bout[1] - av[1]), ux = (bout[0] - av[0]) / dl, uy = (bout[1] - av[1]) / dl;
    o.push(pp.svg);
    o.push(boyau([[sx, sy], [sx + 3, sy], [bout[0] + ux * 7, bout[1] + uy * 7], [bout[0] - ux * 8, bout[1] - uy * 8]], 2.6, 4));
    o.push(boyau(long, wS, 14), boyau(court, wS, 12));
    o.push(bd.col);
    // le chiffon dans la bonde (la loupe le montre de près) et le cercle qui renvoie à la loupe
    o.push(h.path(`M${f(g.xB - 10)} ${f(g.yL - 2)} Q${f(g.xB - 14)} ${f(g.yL - 9)} ${f(g.xB - 7)} ${f(g.yL - 11)} Q${f(g.xB)} ${f(g.yL - 14)} ${f(g.xB + 7)} ${f(g.yL - 11)} Q${f(g.xB + 14)} ${f(g.yL - 9)} ${f(g.xB + 10)} ${f(g.yL - 2)} Z`, blanc(A.arete)));
    o.push(h.cercle(g.xB, g.yL - 6, 21, A.fin));
    // ce qui passe : l'air dans le court, l'essence dans le long
    const pc = le_long(court, 12), pl = le_long(long, 14);
    const fl = (pt, a, b, d) => { const p = pt(a), q = pt(b); return h.fleche(`M${f(p[0] + d[0])} ${f(p[1] + d[1])} L${f(q[0] + d[0])} ${f(q[1] + d[1])}`, A.detail); };
    o.push(fl(pc, 0.62, 0.5, [-8, 0]));
    o.push(fl(pl, 0.6, 0.72, [9, 0]));
    o.push(fl(pl, 0.86, 0.95, [9, 0]));
    // le geste : pousser la poignée, doucement
    o.push(h.geste(`M${v.xp} ${f(pp.yPoignee - 34)} L${v.xp} ${f(pp.yPoignee - 6)}`));
    return o.join('\n');
  };

  // ─── Vue 2 : le goulot, de près (dans une loupe) ──────────────────────────────────────────────────
  const k = 11;                                          // unités par centimètre dans la loupe
  const G = z => {
    const cx = z.l / 2, cy = z.h / 2 + 4, R = Math.min(z.l, z.h) / 2 - 8;
    const yL = cy - 26;                                  // le couvercle
    const xB = cx - 4, wB = 5.6 * k;                     // la bonde
    const wT = 1.5 * k;                                  // les boyaux
    const xC = xB - 0.95 * k, xLg = xB + 0.95 * k;       // le court à gauche, le long à droite
    const yBoutC = yL + 4.2 * k;                         // le bout du court, dans l'air
    return { cx, cy, R, yL, xB, wB, wT, xC, xLg, yBoutC };
  };
  // Une courbe fermée et lisse (Catmull-Rom) par des points : la masse du chiffon.
  const fermee = pts => {
    const n = pts.length, p = i => pts[(i + n) % n];
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + ' Z';
  };
  const vue2 = z => {
    const g = G(z), o = [];
    const { cx, cy, R, yL, xB, wB, wT, xC, xLg, yBoutC } = g;
    const id = 'loupe-15-02';
    o.push(`<defs><clipPath id="${id}"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}"/></clipPath></defs>`);
    o.push(`<g clip-path="url(#${id})">`);
    // le couvercle, coupé : la tôle en noir, ouverte à la bonde
    const ep = 4;
    o.push(h.rect(cx - R, yL, xB - wB / 2 - (cx - R), ep, A.plein));
    o.push(h.rect(xB + wB / 2, yL, cx + R - (xB + wB / 2), ep, A.plein));
    // le collet fileté de la bonde, coupé
    const hc = 1.6 * k, lc = 0.55 * k;
    o.push(h.rect(xB - wB / 2 - lc, yL - hc, lc, hc + ep, A.hachure('metal', 'arete')));
    o.push(h.rect(xB + wB / 2, yL - hc, lc, hc + ep, A.hachure('metal', 'arete')));
    // les deux boyaux : le long descend vers le fond, le court s'arrête juste sous le couvercle
    const court = [[xC, yBoutC], [xC, yL - 6 * k], [xC - 3 * k, cy - R - 6]];
    o.push(boyau([[xLg, cy + R + 4], [xLg, cy - R - 4]], wT, 0));
    o.push(boyau(court, wT, 2.4 * k));
    o.push(h.ellipse(xC, yBoutC, wT / 2 - 0.7, 2.8, A.detail));
    // le chiffon, bourré dans la bonde et serré autour des deux boyaux : une masse froissée qui déborde du collet
    const e = k / 7.2, P = (dx, dy) => [xB + dx * e, yL + dy * e];
    const masse = [P(-19, 8), P(-19.3, -5), P(-23, -11.5), P(-30, -12.5), P(-36.5, -8.5), P(-42, -2.6), P(-40.5, -9), P(-37.5, -15),
      P(-37, -21), P(-31, -27), P(-24, -28), P(-17, -35), P(-8, -33.5), P(-1, -40), P(7, -35.5), P(15, -38.5), P(22, -31),
      P(29, -29.5), P(35, -22), P(33, -16), P(26, -13), P(19.4, -5), P(19, 8), P(9, 12), P(-4, 10)];
    o.push(h.path(fermee(masse), blanc(A.arete)));
    // les plis
    const pli = (a, b, c) => h.path(`M${f(a[0])} ${f(a[1])} Q${f(b[0])} ${f(b[1])} ${f(c[0])} ${f(c[1])}`, A.detail);
    o.push(pli(P(-31, -18), P(-26, -24), P(-19, -24)));
    o.push(pli(P(-34, -13), P(-37, -9), P(-39.5, -5)));
    o.push(pli(P(-27, -12), P(-22, -16), P(-16, -14)));
    o.push(pli(P(-24, -29), P(-19, -27), P(-15, -31)));
    o.push(pli(P(17, -30), P(24, -27), P(28, -20)));
    o.push(pli(P(14, -16), P(20, -20), P(25, -16)));
    o.push(pli(P(-16, 2), P(-12, -3), P(-13.5, -8)));
    o.push(pli(P(15.5, 4), P(14, -2), P(16.5, -7)));
    o.push(pli(P(-4, 7), P(0, 4.5), P(4, 7.5)));
    // les boyaux sortent du chiffon par le haut (sans trait de bout : ils continuent dedans)
    o.push(boyau([[xLg, yL - 31 * e], [xLg, cy - R - 4]], wT, 0, blanc(A.arete), [false, true]));
    o.push(boyau([[xC, yL - 30 * e], ...court.slice(1)], wT, 2.4 * k, blanc(A.arete), [false, true]));
    // ce qui passe : l'air poussé descend dans le court et sort sous le couvercle ; l'essence monte dans le long
    o.push(h.fleche(`M${f(xC)} ${f(yBoutC + 7)} L${f(xC)} ${f(yBoutC + 52)}`, A.cache));
    o.push(h.fleche(`M${f(xC - 5)} ${f(yBoutC + 7)} L${f(xC - 30)} ${f(yBoutC + 42)}`, A.cache));
    const xf = xLg + wT / 2 + 8;
    o.push(h.fleche(`M${f(xf)} ${f(cy + R - 14)} L${f(xf)} ${f(yBoutC + 6)}`, A.detail));
    o.push(h.fleche(`M${f(xf)} ${f(yL - 5.2 * k)} L${f(xf)} ${f(yL - 7.2 * k)}`, A.detail));
    o.push('</g>');
    o.push(h.cercle(cx, cy, R, A.arete));
    return o.join('\n');
  };

  // ─── Vue 3 : sans pompe, le boyau à bille qu'on secoue ────────────────────────────────────────────
  const V3 = z => {
    const g = S(z, 46);
    const { xB, yL, yF, sol } = g;
    const bd = bidon(g);
    const yMain = yL - 31;
    const mL = [bd.bouche[0] - bd.axe[0] * 8, bd.bouche[1] - bd.axe[1] * 8];
    const ligne = [[xB, yF - 4], [xB, yL - 48], [xB + 6, yL - 60], [xB + 62, yL - 60], [bd.bouche[0] + bd.axe[0] * 100, bd.bouche[1] + bd.axe[1] * 100], mL];
    return { g, bd, yMain, ligne, sol };
  };
  const vue3 = z => {
    const v = V3(z), { g, bd, ligne, yMain } = v, o = [];
    o.push(support(g), baril(g));
    o.push(niveau(g, [[ligne, 14]]));
    o.push(bd.svg);
    o.push(boyau(ligne, wS, 14));
    // le bout à bille, au fond : le tube du siège un peu plus gros, la bille dedans
    o.push(h.rect(g.xB - 4, g.yF - 11, 8, 7, blanc(A.arete)));
    o.push(h.cercle(g.xB, g.yF - 13.6, 1.9, A.plein));
    o.push(bd.col);
    // la main tient le boyau au-dessus de la bonde (le boyau sur l'axe de l'objet, posé avant la main)
    const m = h.formes.mainStock({ id: 'poing-barre', x: g.xB, y: yMain, taille: 56, angle: -16, objet: false });
    o.push(m.svg);
    // le geste : secouer de haut en bas
    o.push(h.geste(`M${f(g.xB + 22)} ${f(yMain - 18)} L${f(g.xB + 22)} ${f(yMain + 16)}`, { double: true }));
    // l'essence qui arrive au bidon
    const pl = le_long(ligne, 14), p = pl(0.86), q = pl(0.95);
    o.push(h.fleche(`M${f(p[0] + 9)} ${f(p[1])} L${f(q[0] + 9)} ${f(q[1])}`, A.detail));
    return o.join('\n');
  };

  // ─── Vues 4 et 5 : le bout du boyau, en coupe, quand on plonge et quand on remonte ────────────────
  const u = 2.6;                                         // unités par millimètre
  const C = z => {
    const cx = z.l / 2, yE = z.h - 34;                   // l'axe, le bout du boyau
    const ri = 8 * u, re = 10 * u;                       // le boyau : 16 mm de trou, 20 mm dehors
    const rs = 4 * u, ls = 14 * u;                       // le siège : 8 mm de trou, 14 mm de long
    const rb = 6 * u;                                    // la bille : 12 mm
    const yS = yE - ls;                                  // le haut du siège
    const yPose = yS - Math.sqrt(rb * rb - rs * rs);     // la bille posée sur le siège
    const yClou = yPose - rb - 8 * u;                    // le clou, 8 mm au-dessus de la bille posée
    const rc = 1.5 * u;
    const yLeve = yClou + rc + rb + 0.6;                 // la bille levée contre le clou
    return { cx, yE, ri, re, rs, ls, rb, yS, yPose, yClou, rc, yLeve };
  };
  const coupe = (z, leve) => {
    const g = C(z), o = [];
    const { cx, yE, ri, re, rs, rb, yS, yPose, yClou, rc, yLeve } = g;
    const yb = leve ? yLeve : yPose, yH = 14;
    // l'essence dans le boyau : en plongeant, partout ; en remontant, au-dessus de la bille seulement
    if (leve) {
      o.push(h.rect(cx - ri, yH, 2 * ri, yS - yH, A.hachure('eau', 'aucun')));
      o.push(h.rect(cx - rs, yS, 2 * rs, yE - yS, A.hachure('eau', 'aucun')));
    } else {
      o.push(h.rect(cx - ri, yH, 2 * ri, yb - yH, A.hachure('eau', 'aucun')));
    }
    // la paroi du boyau, coupée, en noir ; le haut cassé
    for (const sg of [-1, 1]) {
      const xa = cx + sg * ri, xb = cx + sg * re;
      o.push(h.path(`M${f(xa)} ${f(yE)} L${f(xa)} ${f(yH + 3)} L${f((xa + xb) / 2)} ${f(yH)} L${f(xb)} ${f(yH + 4)} L${f(xb)} ${f(yE)} Z`, `fill="${NOIR}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"`));
    }
    // le siège : le bout de tube plus étroit, enfoncé dans le bout du boyau, coupé (métal)
    for (const sg of [-1, 1]) o.push(h.rect(sg < 0 ? cx - ri : cx + rs, yS, ri - rs, yE - yS, A.hachure('metal', 'arete')));
    // le clou, en travers, au-dessus de la bille : la tête à gauche, la pointe dehors à droite
    const xT = cx - re - 3;
    o.push(h.path(`M${f(xT)} ${f(yClou - rc)} L${f(cx + re + 6)} ${f(yClou - rc)} L${f(cx + re + 13)} ${f(yClou)} L${f(cx + re + 6)} ${f(yClou + rc)} L${f(xT)} ${f(yClou + rc)} Z`, blanc(A.arete)));
    o.push(h.rect(xT - 3.2, yClou - 4.5 * u, 3.2, 9 * u, blanc(A.arete)));
    // la bille
    o.push(h.cercle(cx, yb, rb, blanc(A.contour)));
    o.push(h.path(`M${f(cx - rb * 0.55)} ${f(yb - rb * 0.15)} A${f(rb * 0.6)} ${f(rb * 0.6)} 0 0 1 ${f(cx - rb * 0.1)} ${f(yb - rb * 0.6)}`, A.detail));
    // le mouvement du boyau, à droite : vers le bas, ou vers le haut
    const xm = cx + re + 9;
    o.push(leve ? h.fleche(`M${f(xm)} ${f(yH + 30)} L${f(xm)} ${f(yH + 66)}`, A.arete) : h.fleche(`M${f(xm)} ${f(yH + 66)} L${f(xm)} ${f(yH + 30)}`, A.arete));
    if (leve) {
      // l'essence entre par le bas, passe autour de la bille et monte
      o.push(h.fleche(`M${f(cx)} ${f(yE + 26)} L${f(cx)} ${f(yE - 6)}`, A.arete));
      for (const sg of [-1, 1]) o.push(h.fleche(`M${f(cx + sg * (rb + 2.2))} ${f(yb + rb * 0.4)} L${f(cx + sg * (rb + 2.2))} ${f(yb - rb * 0.9)}`, A.detail));
      o.push(h.fleche(`M${f(cx)} ${f(yClou - 12)} L${f(cx)} ${f(yH + 74)}`, A.arete));
    } else {
      // la bille bouche le trou : l'essence au-dessus ne redescend plus
      o.push(h.controle(cx, yS, rb + 6));
    }
    return { svg: o.join('\n'), g: { ...g, yb, xT } };
  };

  return {
    ref: '15-02',
    titre: 'Siphonner sans la bouche',
    desc: 'En haut, avec une pompe à vélo. Un baril de 205 L, en coupe, posé sur un madrier et deux piles de deux blocs de béton ; l’essence le remplit à moitié. Un bidon de 20 L posé au sol, à droite ; un trait tireté prolonge le niveau de l’essence du baril jusqu’au-dessus du bidon, qui est bien plus bas. Deux boyaux entrent par l’ouverture du baril : le long descend jusqu’au fond, ressort en arche et descend dans le bec du bidon ; le court s’arrête dans l’air, juste sous le couvercle, et va à une pompe à vélo debout au sol, à gauche, dont le tuyau entre dans son bout. Une flèche rouge pousse la poignée de la pompe vers le bas ; une flèche noire le long du boyau long montre l’essence qui coule vers le bidon. Une loupe montre l’ouverture de près : un chiffon froissé bourré dans le collet, serré autour des deux boyaux ; l’air poussé sort du bout du court ; l’essence monte dans le long. En bas, après un filet, sans pompe : le même baril et le même bidon ; un seul boyau, avec une bille au bout, au fond du baril ; une main tient le boyau au-dessus de l’ouverture, une flèche rouge double : secouer de haut en bas. Deux coupes du bout du boyau : un bout de tube plus étroit enfoncé dans le bout du boyau, une bille plus grosse que son trou posée dessus, un clou en travers au-dessus de la bille. On plonge : l’essence entre par le bas, soulève la bille contre le clou et monte. On remonte : la bille retombe sur le trou (cercle rouge) et l’essence au-dessus ne redescend plus.',
    format: 'pleine',
    disposition: [['pompe', 'goulot'], ['secouer', 'plonge', 'remonte']],
    largeurs: [[330, 248], [290, 133, 133]],
    vues: {
      pompe: {
        titre: 'Avec une pompe à vélo',
        dessin: z => {
          // règle 10 : un filet sur toute la largeur sépare la façon principale, en haut, de l'autre façon, en bas
          return h.ligne(0, z.h + 11, 600, z.h + 11, A.fin) + '\n' + vue1(z);
        },
        renvois: z => {
          const v = V1(z), { g, bd, pp, xp } = v;
          const fl6 = w => { const p = le_long(w.long, 14)(0.9); return [p[0] + 9, p[1]]; };
          return [
            { n: 1, rond: [g.xJ + g.lJ / 2 + 4, g.sol - g.hJ - 34], cible: [g.xJ + g.lJ * 0.55, g.sol - g.hJ * 0.55], texte: 'poser le bidon au sol, plus bas que l’essence' },
            { n: 2, rond: [g.x0 + 26, g.yF - 22], cible: [v.xLong - wS / 2 - 0.5, g.yF - 8], texte: 'pousser le boyau long jusqu’au fond' },
            { n: 5, rond: [14, pp.yPoignee - 52], cible: [xp - 2, pp.yPoignee - 30], texte: 'pomper doucement jusqu’à ce que ça coule' },
            { n: 6, rond: [g.xJ + g.lJ / 2 + 14, g.yN - 34], cible: fl6(v), texte: 'une fois le boyau plein, ça coule seul' },
          ];
        },
      },
      goulot: {
        titre: 'Le goulot, de près',
        dessin: vue2,
        renvois: z => {
          const g = G(z);
          return [
            { n: 3, rond: [g.cx - 78, g.yBoutC + 30], cible: [g.xC - g.wT / 2 - 0.5, g.yBoutC - 4], texte: 'garder le boyau court hors de l’essence' },
            { n: 4, rond: [g.cx + 80, g.yL - 46], cible: [g.xB + 34 * k / 7.2 - 1, g.yL - 19 * k / 7.2], texte: 'bourrer un chiffon autour des deux boyaux' },
          ];
        },
      },
      secouer: {
        titre: 'Sans pompe : le boyau à bille',
        dessin: vue3,
        renvois: z => {
          const v = V3(z), { g } = v;
          return [
            { n: 7, rond: [g.x0 + 26, g.yF - 24], cible: [g.xB - 4, g.yF - 9], texte: 'au lieu de 3 à 5 : une bille au bout' },
            { n: 11, rond: [g.xB + 42, v.yMain + 4], cible: [g.xB + 24.5, v.yMain], texte: 'secouer de haut en bas, sans arrêt' },
          ];
        },
      },
      plonge: {
        titre: 'On plonge',
        dessin: z => coupe(z, true).svg,
        renvois: z => {
          const { g } = coupe(z, true);
          return [
            { n: 8, rond: [12, g.yE - 6], cible: [g.cx - g.ri + 2, g.yE - 6], texte: 'enfoncer un tube plus étroit dans le bout' },
            { n: 9, rond: [12, g.yb + 2], cible: [g.cx - g.rb + 1, g.yb + 2], texte: 'glisser une bille plus grosse que le trou' },
            { n: 10, rond: [12, g.yClou - 34], cible: [g.xT - 1.6, g.yClou - 8], texte: 'planter un clou au-dessus de la bille' },
            { n: 12, rond: [z.l - 12, g.yE + 14], cible: [g.cx + 2, g.yE + 14], texte: 'l’essence soulève la bille et monte' },
          ];
        },
      },
      remonte: {
        titre: 'On remonte',
        dessin: z => coupe(z, false).svg,
        renvois: z => {
          const { g } = coupe(z, false);
          return [
            { n: 13, rond: [z.l - 12, g.yS + 30], cible: [g.cx + g.rb + 4, g.yS + 6], texte: 'la bille retombe et bouche le trou' },
          ];
        },
      },
    },
  };
};
