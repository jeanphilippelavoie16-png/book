// Planche 26-04 — Le garrot improvisé. Trois temps sur la même cuisse, de profil.
// Ch. 26, étape 18 et section 9 (« Le garrot ») : une bande large nouée haut sur le membre, au-dessus
// de la plaie, jamais sur une articulation ; un bâton solide passé dans le nœud, tourné jusqu'à l'arrêt
// du saignement ; le bâton immobilisé par un deuxième lien. Aucune mesure : pas de cote.
//
// Redessin du 14 octobre : la cuisse dessinée à la main, vue de face, est devenue le corps simple de
// la bibliothèque (h.formes.corps, couché sur le dos), de profil, coupé par le bord gauche de la vue :
// le bassin sort à gauche, la jambe va jusqu'au pied nu simple de _pieds.js, qui fait lire une jambe
// couchée d'un coup d'œil. Le contour de la cuisse est lu dans le
// SVG du moteur, et la bande, le nœud, le bâton et le deuxième lien sont posés dessus. Les trois temps
// passent l'un sous l'autre, en pleine page : une cuisse couchée se lit en long.
//
// De profil, le nœud est sur le dessus de la cuisse et le bâton tourne à plat au-dessus d'elle : la
// flèche du tour est une ellipse couchée autour du nœud. Le bâton rabattu se couche le long de la
// cuisse, vers le genou, et le deuxième lien le tient par son bout.
//
// La charte : la bande et le bâton sont l'objet (contour fort) ; le deuxième lien à l'arête ; la cuisse
// au trait du corps simple. Pas de gris. Le rouge : le tour du bâton (une flèche, deux arcs d'un même
// tour), et le cercle sur la plaie qui ne saigne plus.
module.exports = (h) => {
  const { jambeEtPied } = require('./_pieds');
  const f = v => Math.round(v * 10) / 10;
  const BLANC = h.a.blanc.split(' ')[0];                       // fill="#FFFFFF"
  const plein = t => t.replace('fill="none"', BLANC);
  const NOIR = '#1A1A1A';

  // ─── la cuisse : le corps simple couché sur le dos ────────────────────────────────────
  // la jambe proche seule, le pied nu simple avec ses orteils (_pieds.js) : le corps couché se lit d'un bout à l'autre
  const OPT = { pose: 'couche-dos', masquer: ['brasP', 'brasL', 'jambeL'] };
  const PIED_OPT = { pied: 'nu', H: 70, angle: 6 };
  const J1 = jambeEtPied(h, Object.assign({ x: 0, y: 0, echelle: 1 }, OPT), Object.assign({ id: 'p2604-mm' }, PIED_OPT));
  const HX = J1.corps.articulations.hancheP[0];                 // u = 0 à la hanche, vers le genou positif
  const KU = J1.corps.articulations.genouP[0] - HX;             // le genou
  const LEVE = Math.max(0, ...J1.contour.map(p => p[1]));       // le talon du pied simple pose au sol
  const polys = J1.polys.map(q => q.map(p => [p[0] - HX, -p[1] + LEVE]));
  const coupeV = u => {
    const ys = [];
    polys.forEach(q => q.forEach((a, i) => { const b = q[(i + 1) % q.length]; if ((a[0] - u) * (b[0] - u) <= 0 && a[0] !== b[0]) ys.push(a[1] + (b[1] - a[1]) * (u - a[0]) / (b[0] - a[0])); }));
    return [Math.max(...ys), Math.min(...ys)];
  };
  const TOP = u => coupeV(u)[0], BAS = u => coupeV(u)[1];

  const UB = 100;            // le garrot, haut sur la cuisse, loin du genou
  const EB = 24;             // demi-largeur de la bande
  const UP = 330;            // la plaie, plus bas sur la cuisse
  const L2 = 230;            // le deuxième lien, vers le genou, sur le bout du bâton rabattu
  const RB = 11;             // rayon du bâton
  const LB = 300;            // longueur du bâton

  const U0 = -215, U1 = 1000;  // la vue : le bassin coupé à gauche, toute la jambe jusqu'au pied
  const geo = z => {
    const sol = z.h - 10, s = z.l / (U1 - U0);
    const X = u => (u - U0) * s, Y = hh => sol - hh * s;
    return { s, sol, X, Y, P: (u, hh) => [X(u), Y(hh)] };
  };

  // la cuisse, coupée par les bords de la vue, et le sol
  const cuisse = (z, id) => {
    const { s, sol, X, P } = geo(z);
    const c = jambeEtPied(h, Object.assign({ x: X(0), y: sol - LEVE * s, echelle: s }, OPT), Object.assign({ id: id + '-pied' }, PIED_OPT));
    return [
      h.rect(0, sol, z.l, 10, h.a.hachure('terre', 'aucun')), h.ligne(0, sol, z.l, sol, h.a.arete),
      `<clipPath id="${id}"><rect x="0" y="0" width="${f(z.l)}" height="${f(sol)}"/></clipPath>`,
      `<g clip-path="url(#${id})">\n${c}\n</g>`,
      // la rotule sous la peau : ce qui fait lire un genou
      h.chemin([[KU - 22, TOP(KU - 22) - 12], [KU - 9, TOP(KU - 9) - 7], [KU + 9, TOP(KU + 9) - 7], [KU + 22, TOP(KU + 22) - 12]].map(([u, hh]) => P(u, hh)), h.a.detail),
    ].join('\n');
  };

  // la plaie, sur le flanc de la cuisse ; le sang qui coule vers le sol
  const plaie = (z, coule) => {
    const { s, P } = geo(z);
    const hm = (TOP(UP) + BAS(UP)) / 2 - 8;
    const [x, y] = P(UP, hm), k = s;
    const out = [h.path(`M${f(x - 16 * k)} ${f(y + 3 * k)} Q${f(x)} ${f(y - 6 * k)} ${f(x + 16 * k)} ${f(y - 4 * k)} Q${f(x)} ${f(y + 4 * k)} ${f(x - 16 * k)} ${f(y + 3 * k)} Z`, h.a.plein)];
    if (coule) {
      const [, yb] = P(UP, BAS(UP));
      out.push(h.path(`M${f(x - 5 * k)} ${f(y + 3 * k)} Q${f(x - 8 * k)} ${f((y + yb) / 2)} ${f(x - 6 * k)} ${f(yb - 4)}`, h.a.detail));
      out.push(h.ellipse(x - 6 * k, yb + 3, 2.2, 3, h.a.plein));
      out.push(h.path(`M${f(x + 6 * k)} ${f(y)} Q${f(x + 9 * k)} ${f(y + 14 * k)} ${f(x + 7 * k)} ${f(y + 26 * k)}`, h.a.detail));
      out.push(h.ellipse(x + 7 * k, y + 26 * k + 4, 1.8, 2.5, h.a.plein));
    }
    return out.join('\n');
  };

  // une bande qui fait le tour de la cuisse, de u0 à u1 : on en voit le flanc, de dessus à dessous
  const bande = (z, u0, u1, trait, serre = 0, dessus = null) => {
    const { P } = geo(z);
    const pts = [];
    for (let u = u0; u <= u1 + 0.1; u += (u1 - u0) / 8) pts.push(P(u, Math.max(TOP(u) + 2 - serre, dessus ? dessus(u) : -1e9)));
    for (let u = u1; u >= u0 - 0.1; u -= (u1 - u0) / 8) pts.push(P(u, BAS(u) - 1 + serre * 0.5));
    return h.chemin(pts, plein(trait), true);
  };
  // les plis de la peau qui bourrelet de part et d'autre d'une bande serrée
  const plis = z => {
    const { P } = geo(z), out = [];
    for (const sg of [-1, 1]) for (const d of [8, 17]) {
      const u = UB + sg * (EB + d), t = TOP(u), b = BAS(u), m = (t + b) / 2;
      out.push(h.chemin([P(u - sg * 3, m + 22), P(u, m), P(u - sg * 3, m - 22)], h.a.detail));
    }
    return out.join('\n');
  };
  // un bout de bande qui pend, de p0 à p1 (points de vue), large de w, cambré de c
  const bout = (p0, p1, w, c, trait = h.a.arete) => {
    const [x0, y0] = p0, [x1, y1] = p1;
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const mx = (x0 + x1) / 2 + nx * c, my = (y0 + y1) / 2 + ny * c, k = w / 2;
    const Q = (x, y, sg) => `${f(x + nx * k * sg)} ${f(y + ny * k * sg)}`;
    return h.path(`M${Q(x0, y0, 1)} Q${Q(mx, my, 1)} ${Q(x1, y1, 1)} L${Q(x1 + ux * 2, y1 + uy * 2, -1)} Q${Q(mx, my, -1)} ${Q(x0, y0, -1)} Z`, plein(trait));
  };
  // le nœud simple sur le dessus de la cuisse, vu de côté : une bosse, deux bouts qui pendent sur le flanc
  const noeud = (z, u, k, { bouts = true, trait = h.a.contour } = {}) => {
    const { s, P } = geo(z);
    const [x, y] = P(u, TOP(u) + 2), r = 15 * k * s;
    const out = [];
    if (bouts) {
      out.push(bout([x - 3 * k * s, y + 6 * k * s], [x - 26 * k * s, y + 66 * k * s], 15 * k * s, -5 * k * s));
      out.push(bout([x + 4 * k * s, y + 6 * k * s], [x + 18 * k * s, y + 72 * k * s], 15 * k * s, 5 * k * s));
    }
    out.push(h.path(`M${f(x - r * 1.3)} ${f(y + 3)} Q${f(x - r * 1.25)} ${f(y - r * 1.1)} ${f(x)} ${f(y - r * 1.15)} Q${f(x + r * 1.25)} ${f(y - r * 1.1)} ${f(x + r * 1.3)} ${f(y + 3)} Z`, plein(trait)));
    out.push(h.path(`M${f(x - r * 0.5)} ${f(y - r * 0.9)} Q${f(x)} ${f(y - r * 0.2)} ${f(x + r * 0.55)} ${f(y - r * 0.85)}`, h.a.detail));
    return out.join('\n');
  };
  // le bâton, de (u0, h0) à (u1, h1) : les hauteurs de son axe au-dessus du sol
  const baton = (z, u0, h0, u1, h1) => {
    const { s, P } = geo(z);
    const [x0, y0] = P(u0, h0), [x1, y1] = P(u1, h1), r = RB * s;
    const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy, ny = ux;
    const Q = (a, b) => [x0 + ux * a + nx * b, y0 + uy * a + ny * b];
    const q = (a, b) => { const [x, y] = Q(a, b); return `${f(x)} ${f(y)}`; };
    const k = r * 0.55;
    return [
      h.path(`M${q(k, -r)} L${q(L - k, -r)} C${q(L + 1, -r)} ${q(L + 1, r)} ${q(L - k, r)} L${q(k, r)} C${q(-1, r)} ${q(-1, -r)} ${q(k, -r)} Z`, plein(h.a.contour)),
      h.chemin([Q(L * 0.1, -r * 0.3), Q(L * 0.38, -r * 0.3)], h.a.detail),
      h.chemin([Q(L * 0.6, r * 0.35), Q(L * 0.86, r * 0.35)], h.a.detail),
      h.ellipse(...Q(L * 0.72, -r * 0.2), 2.6, 1.6, h.a.detail),
    ].join('\n');
  };
  // le second demi-nœud, refermé par-dessus le bâton
  const boucle = (z, u, hh) => {
    const { s, P } = geo(z);
    const [x, y] = P(u, hh), r = RB * s;
    return h.path(`M${f(x - 9 * s)} ${f(y + r + 2)} Q${f(x - 13 * s)} ${f(y - r - 9 * s)} ${f(x)} ${f(y - r - 10 * s)} Q${f(x + 13 * s)} ${f(y - r - 9 * s)} ${f(x + 9 * s)} ${f(y + r + 2)} L${f(x + 3 * s)} ${f(y + r + 2)} Q${f(x + 5 * s)} ${f(y - r - 3 * s)} ${f(x)} ${f(y - r - 3.5 * s)} Q${f(x - 5 * s)} ${f(y - r - 3 * s)} ${f(x - 3 * s)} ${f(y + r + 2)} Z`, plein(h.a.contour));
  };
  const HB = () => TOP(UB) + 2 + RB + 2;                          // la hauteur de l'axe du bâton, sur le nœud
  // le bâton rabattu : de la hauteur du nœud, il descend se poser sur la cuisse vers le genou
  const hBaton = u => { const ua = UB - LB * 0.4, ub = UB + LB * 0.6, ha = HB(), hb = TOP(ub) + RB + 4; return ha + (hb - ha) * (u - ua) / (ub - ua); };
  // le nœud du deuxième lien, sur le bâton : une petite bosse et deux bouts
  const noeud2 = z => {
    const { s, P } = geo(z);
    const [x, y] = P(L2, hBaton(L2) + RB + 2), r = 9 * s;
    return [
      bout([x - 2 * s, y + 4 * s], [x - 14 * s, y + 44 * s], 9 * s, -3 * s),
      bout([x + 3 * s, y + 4 * s], [x + 12 * s, y + 48 * s], 9 * s, 3 * s),
      h.path(`M${f(x - r * 1.3)} ${f(y + 2)} Q${f(x - r * 1.2)} ${f(y - r * 1.1)} ${f(x)} ${f(y - r * 1.1)} Q${f(x + r * 1.2)} ${f(y - r * 1.1)} ${f(x + r * 1.3)} ${f(y + 2)} Z`, plein(h.a.arete)),
    ].join('\n');
  };

  return {
    ref: '26-04',
    titre: 'Le garrot improvisé',
    desc: 'Trois temps sur la même cuisse d’un blessé couché sur le dos, vue de côté : le bassin coupé à gauche, toute la jambe jusqu’au pied nu, à droite. Nouer : une bande large fait le tour de la cuisse, haut sur le membre, loin du genou, nouée d’un nœud simple sur le dessus, au-dessus de la plaie qui saigne, plus bas sur la cuisse. Tourner : un bâton passé dans le nœud, le second demi-nœud refermé par-dessus ; une flèche couchée autour du nœud dit le tour ; la peau fait des plis de part et d’autre de la bande serrée. Bloquer : le bâton rabattu le long de la cuisse, vers le genou, tenu par un deuxième lien noué autour de la cuisse sur son bout ; la plaie ne saigne plus.',
    format: 'pleine',
    disposition: [['noue'], ['tourne'], ['bloque']],
    vues: {
      noue: {
        titre: 'Nouer',
        dessin: z => [cuisse(z, 'cuisse-noue'), plaie(z, true), bande(z, UB - EB, UB + EB, h.a.contour), noeud(z, UB, 1)].join('\n'),
        renvois: z => {
          const { P } = geo(z);
          return [
            { n: 1, rond: P(UB - 105, TOP(UB) + 20), cible: P(UB - EB + 6, TOP(UB - EB) - 30), texte: 'bande large : répartit la pression' },
            { n: 2, rond: P(UB + 120, TOP(UB) + 34), cible: P(UB + 8, TOP(UB) + 14), texte: 'nœud simple, au-dessus de la plaie' },
          ];
        },
      },
      tourne: {
        titre: 'Tourner',
        dessin: z => {
          const { s, P, X } = geo(z), hb = HB(), lb = LB * 0.62;
          const [cx, cy] = P(UB, hb), rx = (LB * 0.5 + 18) * s, ry = 24 * s;
          // la flèche du tour : une ellipse couchée autour du nœud, l'arc d'arrière puis l'arc de devant
          const pt = a => [cx + rx * Math.cos(a * Math.PI / 180), cy + ry * Math.sin(a * Math.PI / 180)];
          const arc = (a0, a1) => { const [x0, y0] = pt(a0), [x1, y1] = pt(a1); return `M${f(x0)} ${f(y0)} A${f(rx)} ${f(ry)} 0 0 ${a1 > a0 ? 1 : 0} ${f(x1)} ${f(y1)}`; };
          return [
            cuisse(z, 'cuisse-tourne'), plaie(z, true), plis(z), bande(z, UB - EB, UB + EB, h.a.contour, 3),
            noeud(z, UB, 1),
            baton(z, UB - lb / 2, hb, UB + lb / 2, hb), boucle(z, UB, hb),
            h.geste(arc(200, 340)), h.geste(arc(20, 160)),
          ].join('\n');
        },
        renvois: z => {
          const { s, P } = geo(z), hb = HB(), lb = LB * 0.62;
          const [cx, cy] = P(UB, hb), rx = (LB * 0.5 + 18) * s, ry = 24 * s;
          return [
            { n: 3, rond: P(UB - 170, hb + 70), cible: P(UB - lb / 2 + 12, hb + RB * 0.6), texte: 'bâton passé dans le nœud' },
            { n: 4, rond: [cx + rx + 40, cy + ry + 14], cible: [cx + rx * Math.cos(Math.PI / 6) + 2, cy + ry * Math.sin(Math.PI / 6) + 2], texte: 'tourner jusqu’à l’arrêt du saignement' },
          ];
        },
      },
      bloque: {
        titre: 'Bloquer',
        dessin: z => {
          const { P } = geo(z), hb = HB();
          const [px, py] = P(UP, (TOP(UP) + BAS(UP)) / 2 - 8);
          const ua = UB - LB * 0.4, ub = UB + LB * 0.6, ha = hb, hb2 = hBaton(ub);
          return [
            cuisse(z, 'cuisse-bloque'), plaie(z, false), plis(z), bande(z, UB - EB, UB + EB, h.a.contour, 3),
            noeud(z, UB, 1),
            baton(z, ua, ha, ub, hb2), boucle(z, UB, hb),
            // le deuxième lien, plus étroit, autour de la cuisse et par-dessus le bout du bâton
            bande(z, L2 - 12, L2 + 12, h.a.arete, 0, u => hBaton(u) + RB + 2),
            noeud2(z),
            h.controle(px, py, 15),                                  // la plaie ne saigne plus
          ].join('\n');
        },
        renvois: z => {
          const { P } = geo(z);
          return [
            { n: 5, rond: P(L2 + 120, hBaton(L2) + 40), cible: P(L2 + 8, TOP(L2) - 30), texte: 'deuxième lien : bloque le bâton' },
          ];
        },
      },
    },
  };
};
