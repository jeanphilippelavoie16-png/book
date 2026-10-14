// 86-01a — La roue à augets sur le ruisseau (chapitre 86, section C, « Bâtir »)
// Mètres, y vers le haut. La coupe et le plan partagent l'axe des x : même échelle, alignés.
// Seules cotes tirées du chapitre : la roue d'environ un mètre. Le reste est en proportion.
//
// Le trajet de l'eau, vérifié : surface du bassin (1,55) > haut de l'entrée de la conduite
// (1,375) : l'entrée reste noyée. La conduite descend sans point haut de 1,32 à 1,22 ; sa
// sortie (dessous à 1,165) est au-dessus du haut de la roue (1,14) et plus bas que la surface
// du bassin : pas de siphon, l'eau coule seule. Le jet tombe juste passé le sommet, côté aval :
// les augets de droite se remplissent, la roue tourne dans le sens horaire (vue de la berge),
// les augets se vident en bas à droite, le bas de la roue (0,14) reste hors de l'eau de fuite (0).
//
// La charte : dans la roue disque avant enlevé, le disque arrière, derrière les augets, en gris
// loin ; les cruches restent blanches devant. Coupes et plan sans gris. Pas de rouge : la roue
// tourne et l'eau coule (flèches noires), et le chapitre ne nomme pas de point à contrôler ici.

const X0 = -0.15, XL = 7.4;                 // étendue en x de la coupe et du plan
const WS = 1.55, BED = 0.95;                // surface et fond du bassin
const B0 = 1.55, B1 = 1.70, BBAS = 0.78, BHAUT = 1.68;   // barrage
const GX = 1.18;                            // grille
const PE = 1.40, PS = 5.25, PR = 0.055;     // entrée et sortie de la conduite, rayon
const pa = x => 1.32 - 0.10 * (x - PE) / (PS - PE);      // axe de la conduite
const C = [5.3, 0.64], R = 0.5;             // roue
const BERGE = 0.35, FOSSE = 4.65, FOND = -0.3;
const TX = 3.7, TALUS = 4.3, PIQ = 4.5;     // talus, piquet sous la conduite
const HE = [-0.42, 1.8], HP = [-0.34, 1.78];             // étendues verticales coupe / plan
const ZE = 159, ZP = 143;                   // hauteurs des deux vues (sortie de --zones)
const echelle = z => Math.min(z.l / XL, ZE / (HE[1] - HE[0]), ZP / (HP[1] - HP[0]));

const repE = z => {
  const s = echelle(z), ox = (z.l - XL * s) / 2, oy = (z.h - (HE[1] - HE[0]) * s) / 2;
  const P = (x, y) => [ox + (x - X0) * s, oy + (HE[1] - y) * s];
  P.s = s; return P;
};
const repP = z => {
  const s = echelle(z), ox = (z.l - XL * s) / 2, oy = (z.h - (HP[1] - HP[0]) * s) / 2;
  const P = (x, y) => [ox + (x - X0) * s, oy + (y - HP[0]) * s];
  P.s = s; return P;
};
// un cadre générique : étendue [xa, xb] × [ya, yb], y vers le haut
const cadre = (z, xa, xb, ya, yb) => {
  const s = Math.min(z.l / (xb - xa), z.h / (yb - ya));
  const ox = (z.l - (xb - xa) * s) / 2 - xa * s, oy = (z.h - (yb - ya) * s) / 2 + yb * s;
  const P = (x, y) => [ox + x * s, oy - y * s];
  P.s = s; return P;
};

// ─── les augets : cruches coupées, ouverture penchée vers l'arrière du mouvement ───
const RB = 0.38, AD = 0.14, AW = 0.11;      // rayon du centre de l'auget, profondeur, largeur
const ANGLES = Array.from({ length: 12 }, (_, k) => 20 + 30 * k);
const auget = th => {
  const t = th * Math.PI / 180;
  const ur = [Math.sin(t), Math.cos(t)], tg = [Math.cos(t), -Math.sin(t)];   // horaire, y en haut
  let m = [ur[0] - tg[0], ur[1] - tg[1]];
  const l = Math.hypot(m[0], m[1]); m = [m[0] / l, m[1] / l];
  const n = [-m[1], m[0]], c = [RB * ur[0], RB * ur[1]];
  const at = (a, b) => [c[0] + a * m[0] + b * n[0], c[1] + a * m[1] + b * n[1]];
  const a0 = -AD / 2 + AW / 2, pts = [at(AD / 2, -AW / 2)];
  for (let i = 0; i <= 12; i++) {
    const f = (270 - 180 * i / 12) * Math.PI / 180;
    pts.push(at(a0 + (AW / 2) * Math.cos(f), (AW / 2) * Math.sin(f)));
  }
  pts.push(at(AD / 2, AW / 2));
  return { pts, c, bouche: at(AD / 2, 0), levres: [pts[0], pts[pts.length - 1]] };
};
const clipBas = (poly, lv) => {
  const o = [];
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length], pi = p[1] <= lv, qi = q[1] <= lv;
    if (pi) o.push(p);
    if (pi !== qi) { const t = (lv - p[1]) / (q[1] - p[1]); o.push([p[0] + t * (q[0] - p[0]), lv]); }
  }
  return o;
};

// la coupe par l'axe partage l'échelle et les hauteurs de la vue de face : même étendue
// (1,54 × 1,44 m) décalée de C, l'axe à la hauteur du moyeu, l'eau de fuite au même niveau
const AX = [-0.7, 0.84], AY = [C[1] - 0.74, C[1] + 0.7];
const cadreAxe = z => cadre(z, AX[0], AX[1], AY[0], AY[1]);
const FA = AY[0] + 0.012;                   // fond de la fosse, coupé au bas du cadre

module.exports = (h) => {
  const BL = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"');
  const BLa = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const EAU = h.a.hachure('eau', 'aucun'), TERRE = h.a.hachure('terre', 'aucun');
  const poly = (P, pts, a) => h.chemin(pts.map(q => P(...q)), a, true);
  const trait = (P, pts, a) => h.chemin(pts.map(q => P(...q)), a);
  const arc = (P, cx, cy, r, t0, t1, n = 16) => Array.from({ length: n + 1 }, (_, i) => {
    const t = (t0 + (t1 - t0) * i / n) * Math.PI / 180;
    return P(cx + r * Math.sin(t), cy + r * Math.cos(t));
  });
  const flecheArc = (pts, a = h.a.arete) => h.fleche('M' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L'), a);
  const g = x => pa(x) - PR - 0.008;        // le sol sous la conduite

  return {
    ref: '86-01a',
    titre: 'La roue à augets sur le ruisseau',
    desc: 'Roue à augets montée sur un petit ruisseau. En coupe le long de la conduite : un barrage de planches retient un petit bassin ; une grille de grillage devant l’entrée noyée de la conduite ; la conduite descend doucement le long de la berge jusqu’au-dessus de la roue, où l’eau tombe dans les augets juste passé le sommet ; la roue, d’environ un mètre, tourne dans une fosse et l’eau retourne au ruisseau par le canal de fuite. Vu de dessus : le déversoir laisse passer le reste du ruisseau, la conduite longe la berge, l’axe sort du côté de la terre. En détail : la roue disque avant enlevé, avec ses cruches coupées, ouverture penchée vers l’arrière, pleines du côté qui descend et vides en bas ; et une coupe par l’axe : deux disques de contreplaqué, cruches vissées entre eux, roulements sur poteaux de chaque côté, plateau de pédalier au bout de l’axe.',
    format: 'pleine',
    disposition: [['ensemble'], ['plan'], ['roue', 'axe']],
    hauteurs: [2.3, 2.1, 3.2],
    largeurs: [[1], [1], [1, 1]],
    vues: {
      // ── la coupe le long de la conduite ──
      ensemble: {
        titre: 'Coupe le long de la conduite',
        dessin: z => {
          const P = repE(z), o = [], XR = X0 + XL;
          const sous = [];
          for (let x = B1; x <= TX + 1e-9; x += 0.25) sous.push([x, g(x)]);
          const sol = [[X0, BED], [B0, BED], [B0, BBAS], [B1, BBAS], ...sous, [TX, g(TX)], [TALUS, BERGE], [FOSSE, BERGE], [FOSSE, FOND], [XR, FOND]];
          o.push(poly(P, [...sol, [XR, HE[0]], [X0, HE[0]]], TERRE));
          o.push(poly(P, [[X0, WS], [B0, WS], [B0, BED], [X0, BED]], EAU));
          o.push(poly(P, [[FOSSE, 0], [XR, 0], [XR, FOND], [FOSSE, FOND]], EAU));
          o.push(trait(P, sol, h.a.arete));
          o.push(trait(P, [[X0, WS], [B0, WS]], h.a.detail), trait(P, [[FOSSE, 0], [XR, 0]], h.a.detail));
          // barrage
          o.push(poly(P, [[B0, BBAS], [B1, BBAS], [B1, BHAUT], [B0, BHAUT]], h.a.hachure('bois', 'contour')));
          // grille, du fond jusqu'au-dessus de l'eau
          o.push(poly(P, [[GX - 0.02, BED], [GX + 0.02, BED], [GX + 0.02, 1.74], [GX - 0.02, 1.74]], h.a.hachure('grillage', 'detail')));
          // piquet sous la conduite
          o.push(poly(P, [[PIQ - 0.03, BERGE - 0.12], [PIQ + 0.03, BERGE - 0.12], [PIQ + 0.03, g(PIQ)], [PIQ - 0.03, g(PIQ)]], h.a.hachure('bois', 'arete')));
          // jet : il tombe juste passé le sommet, derrière le disque avant
          const [j1, j2, j3, j4] = [P(PS, pa(PS) + PR), P(PS + 0.17, pa(PS) + PR - 0.01), P(PS + 0.2, 1.02), P(PS + 0.12, 1.02)];
          const [j5, j6] = [P(PS + 0.08, pa(PS) - PR - 0.02), P(PS, pa(PS) - PR)];
          o.push(h.path(`M${j1} Q${j2} ${j3} L${j4} Q${j5} ${j6} Z`, EAU));
          o.push(h.path(`M${j1} Q${j2} ${j3}`, h.a.detail), h.path(`M${j4} Q${j5} ${j6}`, h.a.detail));
          // l'eau qui sort des augets en bas, côté aval
          for (const x of [5.42, 5.49, 5.56]) {
            const yb = C[1] - Math.sqrt(R * R - (x - C[0]) ** 2);
            o.push(h.ligne(...P(x, yb - 0.02), ...P(x, 0.02), h.a.cache));
          }
          // roue : disque avant, moyeu, axe
          o.push(h.cercle(...P(...C), R * P.s, BL));
          o.push(h.cercle(...P(...C), 0.08 * P.s, h.a.detail), h.cercle(...P(...C), 0.025 * P.s, h.a.plein));
          // conduite, pleine d'eau
          const haut = [], bas = [];
          for (let x = PE; x <= PS + 1e-9; x += (PS - PE) / 12) { haut.push([x, pa(x) + PR]); bas.push([x, pa(x) - PR]); }
          o.push(poly(P, [...haut, ...bas.slice().reverse()], h.a.blanc));
          o.push(poly(P, [...haut, ...bas.slice().reverse()], EAU));
          o.push(trait(P, haut, h.a.contour), trait(P, bas, h.a.contour));
          o.push(trait(P, [haut[0], bas[0]], h.a.detail), trait(P, [haut[haut.length - 1], bas[bas.length - 1]], h.a.detail));
          // écoulements
          o.push(h.fleche(`M${P(0.15, 1.22)} L${P(0.85, 1.22)}`));
          o.push(h.fleche(`M${P(6.25, -0.15)} L${P(6.95, -0.15)}`));
          o.push(flecheArc(arc(P, C[0], C[1], R + 0.09, 55, 112)));
          // la roue : environ un mètre
          o.push(h.cote(...P(C[0] + R + 0.38, C[1] - R), ...P(C[0] + R + 0.38, C[1] + R), '≈ 1000', { cote: 'droite' }));
          return o.join('\n');
        },
        renvois: z => {
          const P = repE(z);
          return [
            { n: 1, rond: P(2.05, 1.66), cible: P(B1 - 0.02, 1.6), texte: 'barrage de planches ou de pierres' },
            { n: 2, rond: P(0.75, 1.68), cible: P(GX, 1.68), texte: 'grille : grillage ou tôle percée' },
            { n: 3, rond: P(3.05, 1.58), cible: P(2.9, pa(2.9) + PR), texte: 'conduite : vieux tuyau de puits' },
            { n: 4, rond: P(4.75, 1.58), cible: P(PS + 0.1, 1.2), texte: 'l’eau tombe par-dessus, dans les augets' },
          ];
        },
      },

      // ── vu de dessus ──
      plan: {
        titre: 'Vu de dessus',
        dessin: z => {
          const P = repP(z), o = [], XR = X0 + XL;
          const NB = 0.95, NA = 0.62;            // berge proche : au bassin, en aval
          const DV = [0.14, 0.40];               // déversoir
          const F0 = 1.03, F1 = 1.41;            // fosse de la roue
          const canal = [[FOSSE, F0], [5.95, F0], [6.2, NA], [6.75, NA], [6.4, F1], [FOSSE, F1]];
          o.push(poly(P, [[X0, 0], [B0, 0], [B0, NB], [X0, NB]], EAU));
          o.push(poly(P, [[B1, 0], [XR, 0], [XR, NA], [B1, NA]], EAU));
          o.push(poly(P, [[B0, DV[0]], [B1, DV[0]], [B1, DV[1]], [B0, DV[1]]], EAU));
          o.push(poly(P, canal, EAU));
          // berges
          o.push(trait(P, [[X0, 0], [XR, 0]], h.a.arete));
          o.push(trait(P, [[X0, NB], [B0, NB]], h.a.arete));
          o.push(trait(P, [[B1, NA], [6.2, NA]], h.a.arete), trait(P, [[6.75, NA], [XR, NA]], h.a.arete));
          o.push(trait(P, [[6.2, NA], [5.95, F0], [FOSSE, F0], [FOSSE, F1], [6.4, F1], [6.75, NA]], h.a.arete));
          // barrage, avec son déversoir
          o.push(poly(P, [[B0, -0.06], [B1, -0.06], [B1, DV[0]], [B0, DV[0]]], h.a.hachure('bois', 'contour')));
          o.push(poly(P, [[B0, DV[1]], [B1, DV[1]], [B1, NB + 0.1], [B0, NB + 0.1]], h.a.hachure('bois', 'contour')));
          o.push(h.fleche(`M${P(0.9, 0.27)} L${P(2.5, 0.27)}`));
          o.push(h.fleche(`M${P(3.2, 0.3)} L${P(3.9, 0.3)}`));
          o.push(h.fleche(`M${P(6.0, 1.22)} L${P(6.35, 0.9)}`, h.a.detail));
          // grille : du barrage jusqu'à la berge, autour de l'entrée
          o.push(poly(P, [[GX - 0.02, NA], [B0, NA - 0.0], [B0, NA + 0.04], [GX + 0.02, NA + 0.04], [GX + 0.02, NB], [GX - 0.02, NB]], h.a.hachure('grillage', 'detail')));
          // conduite : à travers le barrage, le long de la berge, au-dessus de la roue
          const CY = 0.82, RY = 1.22;
          const axe = [[PE, CY], [3.9, CY], [4.25, CY + 0.05], [4.5, RY - 0.1], [4.7, RY], [PS, RY]];
          const decale = (pts, d) => pts.map((p, i) => {
            const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
            const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
            return [p[0] - d * dy / l, p[1] + d * dx / l];
          });
          const c1 = decale(axe, PR), c2 = decale(axe, -PR);
          o.push(poly(P, [...c1, ...c2.slice().reverse()], BLa));
          o.push(trait(P, c1, h.a.contour), trait(P, c2, h.a.contour));
          o.push(trait(P, [c1[c1.length - 1], c2[c2.length - 1]], h.a.detail));
          // roue : deux disques, les augets vus d'en haut, l'axe, les roulements, le plateau
          const D0 = 1.13, D1 = 1.31;
          for (const th of ANGLES) {
            const x = C[0] + R * Math.sin(th * Math.PI / 180) * 0.9;
            if (Math.cos(th * Math.PI / 180) > 0) o.push(h.ligne(...P(x, D0 + 0.01), ...P(x, D1 - 0.01), h.a.detail));
          }
          for (const d of [D0, D1]) o.push(poly(P, [[C[0] - R, d - 0.012], [C[0] + R, d - 0.012], [C[0] + R, d + 0.012], [C[0] - R, d + 0.012]], BL));
          o.push(poly(P, [[C[0] - 0.015, 0.93], [C[0] + 0.015, 0.93], [C[0] + 0.015, 1.72], [C[0] - 0.015, 1.72]], BLa));
          for (const yb of [0.97, 1.47]) o.push(poly(P, [[C[0] - 0.07, yb - 0.04], [C[0] + 0.07, yb - 0.04], [C[0] + 0.07, yb + 0.04], [C[0] - 0.07, yb + 0.04]], h.a.hachure('metal', 'arete')));
          o.push(poly(P, [[C[0] - 0.1, 1.655], [C[0] + 0.1, 1.655], [C[0] + 0.1, 1.675], [C[0] - 0.1, 1.675]], h.a.plein));
          return o.join('\n');
        },
        renvois: z => {
          const P = repP(z);
          return [
            { n: 5, rond: P(1.2, -0.18), cible: P(1.62, 0.25), texte: 'déversoir : le ruisseau passe encore' },
            { n: 6, rond: P(7.0, 1.3), cible: P(6.45, 1.05), texte: 'fuite : l’eau retourne au ruisseau' },
          ];
        },
      },

      // ── la roue, disque avant enlevé ──
      roue: {
        titre: 'La roue, disque avant enlevé',
        dessin: z => {
          const P = cadre(z, -0.8, 0.74, -0.74, 0.7), s = P.s, o = [];
          // eau de fuite
          o.push(poly(P, [[-0.8, -0.64], [0.74, -0.64], [0.74, -0.74], [-0.8, -0.74]], EAU));
          o.push(trait(P, [[-0.8, -0.64], [0.74, -0.64]], h.a.detail));
          // disque arrière, derrière les augets : en gris loin
          o.push(h.cercle(...P(0, 0), R * s, h.a.loin), h.cercle(...P(0, 0), R * s, h.a.contour));
          o.push(h.cercle(...P(0, 0), 0.08 * s, h.a.arete), h.cercle(...P(0, 0), 0.025 * s, h.a.plein));
          // augets : eau du côté qui descend, vides en bas et du côté qui monte
          for (const th of ANGLES) {
            const a = auget(th), ferme = a.pts;
            o.push(poly(P, ferme, h.a.blanc));
            if (th >= 20 && th <= 140) {
              const ymin = Math.min(...ferme.map(p => p[1])), lip = Math.min(a.levres[0][1], a.levres[1][1]);
              if (lip - ymin > 0.01) {
                const lv = ymin + (th < 30 ? 0.45 : 0.85) * (lip - ymin);
                const w = clipBas(ferme, lv);
                if (w.length > 2) {
                  o.push(poly(P, w, EAU));
                  const xs = w.filter(p => Math.abs(p[1] - lv) < 1e-9).map(p => p[0]);
                  if (xs.length >= 2) o.push(h.ligne(...P(Math.min(...xs), lv), ...P(Math.max(...xs), lv), h.a.detail));
                }
              }
            }
            o.push(trait(P, ferme, h.a.arete));
            o.push(trait(P, a.levres, h.a.detail));   // le bord coupé, vu de chant, devant le disque gris
            o.push(h.cercle(...P(...a.c), 1.6, h.a.plein));
          }
          // conduite qui arrive, jet dans l'auget juste passé le sommet
          const yc = pa(PS) - C[1], x1 = PS - C[0];
          o.push(poly(P, [[-0.8, yc + PR], [x1, yc + PR], [x1, yc - PR], [-0.8, yc - PR]], EAU));
          o.push(trait(P, [[-0.8, yc + PR], [x1, yc + PR]], h.a.contour), trait(P, [[-0.8, yc - PR], [x1, yc - PR]], h.a.contour));
          o.push(trait(P, [[x1, yc + PR], [x1, yc - PR]], h.a.detail));
          const ja = auget(20).bouche;
          const [k1, k2, k3, k4, k5, k6] = [P(x1, yc + PR), P(x1 + 0.14, yc + PR - 0.01), P(ja[0] + 0.05, ja[1] + 0.01), P(ja[0] - 0.03, ja[1] + 0.01), P(x1 + 0.05, yc - PR - 0.02), P(x1, yc - PR)];
          o.push(h.path(`M${k1} Q${k2} ${k3} L${k4} Q${k5} ${k6} Z`, EAU));
          o.push(h.path(`M${k1} Q${k2} ${k3}`, h.a.detail), h.path(`M${k4} Q${k5} ${k6}`, h.a.detail));
          // l'eau qui sort en bas à droite
          for (const x of [0.25, 0.31, 0.37]) o.push(h.ligne(...P(x, -0.36), ...P(x, -0.62), h.a.cache));
          // sens de rotation
          o.push(flecheArc(arc(P, 0, 0, R + 0.08, 215, 262)));
          // traits de rappel vers la coupe par l'axe, à droite (même échelle, mêmes hauteurs)
          const sA = P.s, oxA = z.l + 22 + (z.l - (AX[1] - AX[0]) * sA) / 2 - AX[0] * sA;
          for (const y of [R, 0]) {
            const [xa, ya] = P(y ? 0.3 : R + 0.03, y);
            o.push(h.ligne(xa, ya, oxA + (-0.09 - 0.03) * sA, ya, h.a.fin));
          }
          return o.join('\n');
        },
        renvois: z => {
          const P = cadre(z, -0.8, 0.74, -0.74, 0.7);
          const a7 = auget(260), a8 = auget(80);
          return [
            { n: 7, rond: P(-0.68, 0.3), cible: P(...a7.c), texte: 'cruche coupée, vissée au disque' },
            { n: 8, rond: P(0.64, 0.38), cible: P(...a8.bouche), texte: 'ouverture penchée vers l’arrière' },
            { n: 9, rond: P(0.6, -0.42), cible: P(0.37, -0.5), texte: 'l’auget se vide en bas' },
          ];
        },
      },

      // ── coupe par l'axe (on regarde vers l'aval : le ruisseau à gauche, la terre à droite) ──
      axe: {
        titre: 'Coupe par l’axe',
        dessin: z => {
          const P = cadreAxe(z), o = [];
          const W0 = 0.19;                       // murs de la fosse
          const E = 0.09, T = 0.012;             // demi-écart des disques, demi-épaisseur
          // terre, eau de fuite
          o.push(poly(P, [[-0.46, BERGE], [-W0, BERGE], [-W0, FA], [W0, FA], [W0, BERGE], [0.6, BERGE], [0.6, AY[0]], [-0.46, AY[0]]], TERRE));
          o.push(poly(P, [[-W0, 0], [W0, 0], [W0, FA], [-W0, FA]], EAU));
          o.push(trait(P, [[-0.46, BERGE], [-W0, BERGE], [-W0, FA], [W0, FA], [W0, BERGE], [0.6, BERGE]], h.a.arete));
          o.push(trait(P, [[-W0, 0], [W0, 0]], h.a.detail));
          // poteaux et roulements
          for (const zc of [-0.25, 0.25]) {
            o.push(poly(P, [[zc - 0.04, BERGE], [zc + 0.04, BERGE], [zc + 0.04, C[1] - 0.06], [zc - 0.04, C[1] - 0.06]], h.a.hachure('bois', 'arete')));
            o.push(poly(P, [[zc - 0.055, C[1] - 0.06], [zc + 0.055, C[1] - 0.06], [zc + 0.055, C[1] + 0.06], [zc - 0.055, C[1] + 0.06]], h.a.hachure('metal', 'contour')));
          }
          // disques et moyeu
          for (const d of [-E, E]) o.push(poly(P, [[d - T, C[1] - R], [d + T, C[1] - R], [d + T, C[1] + R], [d - T, C[1] + R]], h.a.hachure('bois', 'contour')));
          o.push(poly(P, [[-E + T, C[1] - 0.08], [E - T, C[1] - 0.08], [E - T, C[1] + 0.08], [-E + T, C[1] + 0.08]], h.a.hachure('bois', 'arete')));
          // augets en haut (ouverts vers le haut) et en bas (renversés), vissés par les flancs
          const F = E - T - 0.006;
          const cruche = (y0, y1) => trait(P, [[-F, y1], [-F, y0], [F, y0], [F, y1]], h.a.arete);
          o.push(cruche(C[1] + 0.3, C[1] + R - 0.02), cruche(C[1] - 0.3, C[1] - R + 0.02));
          for (const y of [C[1] + 0.36, C[1] + 0.44, C[1] - 0.36, C[1] - 0.44])
            for (const sg of [-1, 1]) o.push(h.ligne(...P(sg * (E + T + 0.015), y), ...P(sg * (F - 0.02), y), h.a.detail));
          // eau dans l'auget du haut
          o.push(poly(P, [[-F, C[1] + 0.3], [F, C[1] + 0.3], [F, C[1] + 0.4], [-F, C[1] + 0.4]], EAU));
          o.push(h.ligne(...P(-F, C[1] + 0.4), ...P(F, C[1] + 0.4), h.a.detail));
          // axe, plateau au bout, côté terre
          o.push(poly(P, [[-0.32, C[1] - 0.016], [0.5, C[1] - 0.016], [0.5, C[1] + 0.016], [-0.32, C[1] + 0.016]], BLa));
          o.push(poly(P, [[0.42, C[1] - 0.1], [0.44, C[1] - 0.1], [0.44, C[1] + 0.1], [0.42, C[1] + 0.1]], h.a.plein));
          // bout de la conduite, vu en coupe, et le jet entre les deux disques
          const yc = pa(PS);
          o.push(h.cercle(...P(0, yc), PR * P.s, h.a.hachure('eau', 'contour')));
          for (const x of [-0.02, 0.02]) o.push(h.ligne(...P(x, yc - PR - 0.01), ...P(x, C[1] + R - 0.03), h.a.cache));
          return o.join('\n');
        },
        renvois: z => {
          const P = cadreAxe(z);
          return [
            { n: 10, rond: P(-0.36, 1.05), cible: P(-0.09, 1.0), texte: 'deux disques de contreplaqué' },
            { n: 11, rond: P(0.33, 1.08), cible: P(0.28, C[1] + 0.05), texte: 'roulement sur poteau, de chaque côté' },
            { n: 12, rond: P(0.53, 0.92), cible: P(0.43, C[1] + 0.07), texte: 'plateau de pédalier : premier étage' },
          ];
        },
      },
    },
  };
};
