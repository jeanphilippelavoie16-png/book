// Planche 24-06a — La béquille de fourche, en place (chapitre 24, section 9 « La béquille de
// fourche » ; tableau des contrôles, ligne « Béquille » ; signes d'échec, « Aisselle engourdie »).
// La planche 24-06b montre la béquille elle-même et ses pièces.
// Ce que dit le chapitre, et rien de plus : la fourche part un peu sous la hauteur de la main ; les
// deux branches montent de chaque côté du bras et se referment à l'aisselle ; une traverse liée
// entre les deux branches, à l'endroit où tombe la main, sert de poignée. Longueur : la taille
// moins 40 cm jusqu'à l'appui, qui s'arrête à environ 5 cm, deux ou trois doigts, sous le creux de
// l'aisselle. Le poids va dans les mains, coudes tendus, jamais dans l'aisselle ; le haut se serre
// contre les côtes, il ne porte pas. Une béquille seule se tient sous le bras du côté sain : on
// avance la béquille et le pied blessé ensemble, puis le bon pied passe devant ; on tourne en
// pivotant sur le bon pied.
// Cotes : « taille » (le blessé debout) et « 50 mm » (sous le creux). La longueur, taille moins
// 400 mm, est cotée sur la 24-06b.
// Le blessé : le corps simple « debout-bequille » (corps/moteur.js), vu de son côté droit ; le côté
// sain est le droit, la cheville blessée la gauche (la jambe loin, soulagée). Depuis le 13 octobre
// au soir, un corps ne se montre que de profil : la vue de face sous l'aisselle est remplacée par
// un gros plan de profil sur l'aisselle, où se lisent les 50 mm.
// Géométrie de dessin, jamais imprimée (mm) : béquille de 32 au pied, branches de 22 à 20, 190
// hors tout à la poignée ; le bout posé 330 devant le pied du personnage, 300 devant l’aisselle ; rembourrage de 82 sur 80, 44 d’épais vu de
// face ; empreintes de semelle de 270 × 100, pas de 300.
// Repère de la béquille : u le long de la perche, du bout (0) vers le haut (L) ; v en travers,
// dans le plan de la fourche (+ vers l'avant du blessé).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const BLANC = '#FFFFFF';
  const blanc = at => at.replace('fill="none"', `fill="${BLANC}"`);
  const rappel = A.fin + ' stroke-dasharray="2 3"';
  const NL = String.fromCharCode(10);
  const dP = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k], nrm = a => Math.hypot(a[0], a[1]);
  const uni = a => mul(a, 1 / nrm(a));
  const tourne = (p, c, deg) => { const t = deg * Math.PI / 180, d = sub(p, c);
    return [c[0] + d[0] * Math.cos(t) - d[1] * Math.sin(t), c[1] + d[0] * Math.sin(t) + d[1] * Math.cos(t)]; };
  let nClip = 0;
  // découpe : ne garde que l'intérieur des polygones, ou tout sauf eux (hors = true, dans le cadre)
  const decoupe = (svg, polys, hors, cadre) => {
    const id = `p2406a-${++nClip}`;
    const d = (hors ? dP(cadre, true) + ' ' : '') + polys.map(p => dP(p, true)).join(' ');
    return `<clipPath id="${id}"><path d="${d}" clip-rule="evenodd" fill="none"/></clipPath>${NL}<g clip-path="url(#${id})">${NL}${svg}${NL}</g>`;
  };
  // Catmull-Rom : une suite de points lisses (ferme : la courbe se referme)
  const lisse = (P, n = 8, ferme = false) => {
    const N = P.length, g = i => ferme ? P[(i + N) % N] : P[Math.max(0, Math.min(N - 1, i))], out = [];
    for (let i = 0; i < (ferme ? N : N - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    if (!ferme) out.push(P[N - 1]);
    return out;
  };
  const miroir = pts => pts.map(p => [p[0], -p[1]]);

  // ── le blessé et la béquille en place (mm, repère du personnage : sol en y = 0, face vers +x) ──
  // Tout part du corps simple : l'épaule, le creux de l'aisselle (95 mm sous l'articulation de
  // l'épaule), la main sur la traverse. Le haut de la béquille est 50 mm sous le creux ; son axe
  // passe par la main ; le bout tombe au sol, là où cet axe le touche.
  const POSE = 'debout-bequille';
  // le pied blessé (loin) soulagé, levé du sol : on ne pose que le bon pied
  const ANGLES = { cuisseL: 16, jambeL: -36, piedL: 58 };
  const C0 = F.corps({ x: 0, y: 0, pose: POSE, echelle: 1, angles: ANGLES, ancrer: false, objetP: '<g/>' });
  const S = C0.articulations.epauleP;                    // l'épaule proche (la droite)
  const CREUX = [S[0] + 6, S[1] + 95];
  const P = [CREUX[0], CREUX[1] + 50];                   // le haut, 50 sous le creux
  const MAIN = [C0.mainP.x, C0.mainP.y];
  const T = (() => { const d = sub(MAIN, P); return [P[0] + d[0] * (-P[1]) / d[1], 0]; })();
  const L = nrm(sub(P, T));
  const ax = uni(sub(P, T)), bx = [-ax[1], ax[0]];
  const enPlace = (u, v) => add(add(T, mul(ax, u)), mul(bx, v));
  // la traverse tombe là où est la main
  const uC = (MAIN[0] - T[0]) * ax[0] + (MAIN[1] - T[1]) * ax[1], uF = uC - 170, uR = 60;

  // la béquille dans son repère (u, v)
  const bordExt = [[0, 16], [200, 15.6], [uF - 120, 14.8], [uF - 40, 15], [uF + 5, 19], [uF + 45, 34], [uF + 100, 55], [uC, 76],
    [uC + 90, 92], [uC + 220, 96], [L - 230, 86], [L - 150, 60], [L - 95, 30], [L - 60, 21], [L - 27, 20]];
  const bordInt = [[uF, 0], [uF + 30, 6], [uF + 100, 33], [uC, 54], [uC + 90, 70], [uC + 220, 74], [L - 230, 64], [L - 150, 38],
    [L - 95, 9], [L - 60, 0.5], [L - 27, 0]];
  const ext = lisse(bordExt), int = lisse(bordInt);
  const silhouette = [...miroir(ext), ...miroir(int).reverse(), ...int, ...ext.slice().reverse()];
  const coussinPts = lisse([[L - 82, -30], [L - 76, -29], [L - 70, -27], [L - 56, -38], [L - 32, -40], [L - 10, -30], [L, 0],
    [L - 10, 30], [L - 32, 40], [L - 56, 38], [L - 70, 27], [L - 76, 29], [L - 82, 30]]);

  function bequille(M, o = {}) {
    const at = o.trait || A.arete, det = A.detail;
    const Mp = pts => pts.map(p => M(p[0], p[1]));
    const out = [];
    if (o.cache) {
      out.push(h.path(dP(Mp(silhouette), true), A.cache));
      out.push(h.path(dP(Mp(coussinPts), false), A.cache));
      return out.join(NL);
    }
    out.push(h.path(dP(Mp(silhouette), true), blanc(at)));
    out.push(h.path(dP(Mp([[0, -16], [0, 16]])), at));
    // l'anneau à neige, par la tranche
    out.push(h.path(dP(Mp([[uR - 6, -80], [uR + 6, -80], [uR + 6, 80], [uR - 6, 80]]), true), blanc(at)));
    // la traverse
    out.push(h.path(dP(Mp([[uC - 11, -100], [uC + 11, -100], [uC + 11, 100], [uC - 11, 100]]), true), blanc(at)));
    // les liens de la traverse : tours croisés sur chaque branche
    for (const s of [1, -1]) {
      const vm = s * 65;
      for (const dir of [1, -1]) for (const k of [-5, 0, 5])
        out.push(String(F.corde([M(uC - 15 + k, vm - dir * 15), M(uC + 15 + k, vm + dir * 15)], { ep: 3.4, debut: 'ouvert', fin: 'ouvert', trait: 'detail' })));
    }
    // le rembourrage
    out.push(h.path(dP(Mp(coussinPts), true), blanc(at)));
    for (const du of [-1.6, 1.6]) out.push(String(F.corde([M(L - 71 + du, -27), M(L - 69 + du, 27)], { ep: 2.6, debut: 'ouvert', fin: 'ouvert', trait: 'detail' })));
    return out.join(NL);
  }

  const C = enPlace(uC, 0);

  // la scène de côté : le sol, le blessé, la béquille (pleine devant le tronc, cachée derrière le
  // bras proche, redessinée là en tireté) ; V : mm → vue ; s : unités de vue par mm
  // gros : le bras proche ne se peint pas, son contour revient en tireté par-dessus (on voit au
  // travers le haut de la béquille sous l'aisselle)
  const scene = (V, s, { gros = false } = {}) => {
    const Mb = (u, v) => V(enPlace(u, v));
    const [x0, y0] = V([0, 0]);
    const base = { x: x0, y: y0, pose: POSE, echelle: s, angles: ANGLES, ancrer: false, trait: 'fort' };
    if (!gros) return [F.corps({ ...base, objetP: bequille(Mb) }).svg, bequille(Mb, { cache: true })].join(NL);
    const bras = [...F.corps({ ...base, objetP: '<g/>' }).svg.matchAll(/<path d="([^"]+)" fill="#FFFFFF" stroke="none"\/>/g)][1][1];
    return [F.corps({ ...base, masquer: ['brasP'], objetP: bequille(Mb) }).svg,
      h.path(bras, A.cache.replace('stroke-width="0.7"', 'stroke-width="1"'))].join(NL);
  };

  // ── les empreintes (mm, vues de dessus, la marche vers le haut) ──
  const semelle = lisse([[0, 128], [30, 122], [42, 100], [44, 60], [44, 20], [48, -30], [52, -70], [50, -100], [38, -122], [15, -134],
    [-12, -135], [-36, -124], [-48, -100], [-48, -60], [-38, -15], [-32, 25], [-34, 70], [-38, 100], [-30, 122]], 6, true);

  return {
    ref: '24-06a',
    titre: 'La béquille de fourche, en place',
    desc: 'Un blessé debout, vu de côté, tient une béquille faite d’un jeune arbre fourchu sous le bras du côté sain : la perche part du sol un peu devant le pied, fourche un peu sous la main, et ses deux branches passent de chaque côté du bras avant de se rejoindre sous l’aisselle, derrière le bras (en tireté). La main serre une traverse liée entre les branches, le bras tendu. La taille du blessé est cotée. De près, de profil : le haut rembourré de la béquille, caché derrière le bras, serré contre les côtes, s’arrête 50 mm, deux ou trois doigts, sous le creux de l’aisselle. En bas, trois temps vus de dessus avec des empreintes de semelle : la béquille et le pied blessé (hachuré) avancent ensemble ; le bon pied passe devant ; on tourne en pivotant sur le bon pied.',
    format: 'pleine',
    disposition: [['place', 'aisselle'], ['pas']],
    hauteurs: [3, 1.05],
    largeurs: [[1, 0.9], [1]],
    vues: {
      // ─── le blessé debout, de côté ───
      place: (() => {
        const geo = z => {
          const s = (z.h - 14) / 1765, g = z.h - 6;
          const x0 = (z.l - 740 * s) / 2 + 150 * s;
          const V = p => [x0 + s * p[0], g + s * p[1]];
          return { s, g, x0, V };
        };
        return {
          titre: 'De côté',
          dessin: z => {
            const { s, g, V } = geo(z);
            const out = [];
            out.push(h.rect(4, g, z.l - 8, 5, A.hachure('terre', 'aucun')));
            out.push(h.ligne(4, g, z.l - 4, g, A.arete));
            out.push(scene(V, s));
            // la taille
            const xc = V([500, 0])[0], yt = V([0, -1748])[1];
            out.push(h.ligne(V([160, -1748])[0], yt, xc + 5, yt, rappel));
            out.push(h.cote(xc, g, xc, yt, 'taille', { cote: 'droite' }));
            // le cadre du gros plan
            const a = V([CREUX[0] - 150, CREUX[1] - 140]), b = V([CREUX[0] + 150, CREUX[1] + 160]);
            out.push(h.rect(a[0], a[1], b[0] - a[0], b[1] - a[1], A.fin + ' stroke-dasharray="3 2.5"'));
            return out.join(NL);
          },
          renvois: z => {
            const { V } = geo(z);
            const tr = V(enPlace(uC, -90)), coude = V(add(C0.articulations.coudeP, [26, 0])), perche = V(enPlace(330, -15));
            return [
              { n: 1, rond: [14, Math.round(coude[1]) - 40], cible: coude, texte: 'coude tendu : le poids dans les mains' },
              { n: 2, rond: [14, Math.round(tr[1])], cible: tr, texte: 'traverse-poignée : là où tombe la main' },
              { n: 3, rond: [14, Math.round(perche[1]) + 20], cible: perche, texte: 'sous le bras du côté sain' },
            ];
          },
        };
      })(),

      // ─── le gros plan de l'aisselle, de profil ───
      aisselle: (() => {
        const geo = z => {
          const s = Math.min(z.l / 300, (z.h - 10) / 300);
          const c = [z.l / 2, z.h / 2 - 10];
          const V = p => [c[0] + s * (p[0] - CREUX[0]), c[1] + s * (p[1] - CREUX[1] - 10)];
          return { s, V };
        };
        return {
          titre: 'L’aisselle, de près',
          dessin: z => {
            const { s, V } = geo(z);
            const out = [];
            out.push(`<clipPath id="p2406a-gros"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`);
            out.push(`<g clip-path="url(#p2406a-gros)">${scene(V, s, { gros: true })}</g>`);
            // le creux et le haut de la béquille : la cote, devant le bras (le bras en tireté)
            const xq = V([CREUX[0] + 120, 0])[0];
            const yc = V(CREUX)[1], yp = V(P)[1];
            out.push(h.ligne(V(CREUX)[0] - 4, yc, xq + 5, yc, rappel));
            out.push(h.ligne(V(P)[0] + 4, yp, xq + 5, yp, rappel));
            out.push(h.cote(xq, yc, xq, yp, '50 mm', { cote: 'droite' }));
            // le point à contrôler : le jour sous le creux, l'aisselle ne porte pas
            out.push(h.controle(V(CREUX)[0], (yc + yp) / 2, 0.55 * (yp - yc)));
            return out.join(NL);
          },
          renvois: z => {
            const { V } = geo(z);
            const pad = V(enPlace(L - 40, 26));
            return [
              { n: 4, rond: [14, Math.round(V(CREUX)[1]) - 30], cible: V([CREUX[0] - 30, CREUX[1] + 25]), texte: 'deux ou trois doigts sous le creux' },
              { n: 5, rond: [14, Math.round(pad[1]) + 50], cible: pad, texte: 'serré contre les côtes, sans porter' },
            ];
          },
        };
      })(),

      // ─── le pas, vu de dessus ───
      pas: (() => {
        const geo = z => {
          const s = (z.h - 12) / 890;
          const cy = z.h - 6 - 140 * s;
          const xs = [z.l * 0.15, z.l * 0.5, z.l * 0.85];
          return { s, cy, xs };
        };
        return {
          titre: 'Le pas, vu de dessus',
          dessin: z => {
            const { s, cy, xs } = geo(z);
            const out = [];
            const pied = (x0, [px, py], cote, o = {}) => {
              const ang = o.angle || 0, piv = o.pivot || [0, 0];
              const pts = semelle.map(p => [cote * p[0], p[1]]).map(p => tourne(p, piv, ang)).map(p => [x0 + s * (px + p[0]), cy + s * (py + p[1])]);
              const talon = [[-34, 58], [44, 58]].map(p => [cote * p[0], p[1]]).map(p => tourne(p, piv, ang)).map(p => [x0 + s * (px + p[0]), cy + s * (py + p[1])]);
              if (o.fantome) return [h.path(dP(pts, true), A.cache), h.path(dP(talon), A.cache)].join(NL);
              return [h.path(dP(pts, true), o.blesse ? A.hachure('bois', 'arete') : blanc(A.arete)), h.path(dP(talon), A.detail)].join(NL);
            };
            const anneau = (x0, [px, py], fantome) => {
              const c = [x0 + s * px, cy + s * py], r = 80 * s;
              if (fantome) return h.cercle(c[0], c[1], r, A.cache);
              return [h.cercle(c[0], c[1], r, blanc(A.arete)), h.ligne(c[0] - r, c[1], c[0] + r, c[1], A.fin), h.ligne(c[0], c[1] - r, c[0], c[1] + r, A.fin),
                h.cercle(c[0], c[1], 16 * s, A.hachure('bois', 'detail'))].join(NL);
            };
            const fl = (x0, a, b) => h.fleche(`M${f(x0 + s * a[0])} ${f(cy + s * a[1])} L${f(x0 + s * b[0])} ${f(cy + s * b[1])}`);
            // 1 : la béquille et le pied blessé avancent ensemble
            let x = xs[0];
            out.push(pied(x, [-75, 0], -1, { fantome: true }), anneau(x, [235, -40], true));
            out.push(pied(x, [75, 0], 1), pied(x, [-75, -300], -1, { blesse: true }), anneau(x, [235, -340]));
            // le geste : la béquille et le pied blessé avancent ensemble
            const gs = (a, b) => h.geste(`M${f(x + s * a[0])} ${f(cy + s * a[1])} L${f(x + s * b[0])} ${f(cy + s * b[1])}`);
            out.push(gs([-150, -10], [-150, -300]), gs([335, -50], [335, -330]));
            // 2 : le bon pied passe devant
            x = xs[1];
            out.push(pied(x, [75, 0], 1, { fantome: true }));
            out.push(pied(x, [-75, -300], -1, { blesse: true }), anneau(x, [235, -340]), pied(x, [75, -600], 1));
            out.push(fl(x, [75, -150], [75, -455]));
            // 3 : on tourne en pivotant sur le bon pied
            x = xs[2];
            const piv = [0, -80];
            out.push(pied(x, [-240, -300], -1, { blesse: true }), anneau(x, [190, -340]));
            out.push(pied(x, [0, -300], 1, { fantome: true }), pied(x, [0, -300], 1, { angle: 55, pivot: piv }));
            // filets entre les trois temps
            for (const xf of [(xs[0] + xs[1]) / 2, (xs[1] + xs[2]) / 2]) out.push(h.ligne(xf, cy - s * 700, xf, cy + s * 130, A.fin));
            const cp = [0, -380], r = 150;
            const arc = [];
            for (let k = 0; k <= 16; k++) { const a = (-100 + 62 * k / 16) * Math.PI / 180; arc.push([x + s * (cp[0] + r * Math.cos(a)), cy + s * (cp[1] + r * Math.sin(a))]); }
            out.push(h.fleche(dP(arc)));
            return out.join(NL);
          },
          renvois: z => {
            const { s, cy, xs } = geo(z);
            return [
              { n: 6, rond: [Math.round(xs[0] - s * 330), Math.round(cy - s * 330)], cible: [xs[0] - s * 95, cy - s * 330], texte: 'pied blessé et béquille avancent ensemble' },
              { n: 7, rond: [Math.round(xs[1] - s * 300), Math.round(cy - s * 600)], cible: [xs[1] + s * 40, cy - s * 600], texte: 'puis le bon pied passe devant' },
              { n: 8, rond: [Math.round(xs[2] - s * 120), Math.round(cy - s * 640)], cible: [xs[2] - s * 45, cy - s * 380], texte: 'on tourne en pivotant sur le bon pied' },
            ];
          },
        };
      })(),
    },
  };
};
