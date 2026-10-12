// Planche 28-02 — rincer le nez d'un enfant de 4 ans (ch. 28, « La solution saline qu'on fabrique »).
//
// Ce que le chapitre dit, et rien de plus : couché sur le dos, la tête tournée sur le côté, 5 à
// 10 mL dans la narine du haut, à la seringue ou à la cuillère ; puis on tourne la tête de l'autre
// côté pour l'autre narine. Il se relève, crache, on lui essuie le nez. La seringue : orale,
// graduée, de 10 mL (tableau Matériel du chapitre).
//
// Les deux premières vues sont prises d'en haut, l'enfant couché en travers de la page, la tête à
// gauche : la tête tournée se voit de profil (bibliothèque). Le corps ne se dessine pas vu d'en
// haut (la bibliothèque n'a que des profils) : il est sous la couverture, remontée aux épaules,
// et c'est elle qui dit « couché ». La seringue n'est pas tenue : sa position et la flèche du
// piston suffisent (une main qui pince un piston est le point faible de la bibliothèque).
// Dernière vue : le buste de la bibliothèque, penché sur un bol posé sur la table.
//
// Aucune mesure de seringue ni de corps dans le chapitre : aucune cote.

'use strict';

module.exports = (h) => {
  const F = h.formes;
  const f = n => Math.round(n * 10) / 10;
  const NOIR = '#1A1A1A';
  const BT = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const TR = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const BLANC = 'fill="#FFFFFF" stroke="none"';
  const RAD = Math.PI / 180;

  // Catmull-Rom → Bézier : la courbe passe par chaque point
  const cr = (pts, ferme = false) => {
    const n = pts.length;
    const g = i => (ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (ferme ? ' Z' : '');
  };
  const ligneD = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
  const clip = (id, x, y, l, ht, contenu) =>
    `<clipPath id="${id}"><rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="${f(ht)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu}\n</g>`;

  // ─── la seringue orale de 10 mL ──────────────────────────────────────────────────────
  // En mm le long de l'axe, depuis le bout de l'embout : embout, épaule, corps gradué, ailettes,
  // tige du piston, poussoir. Le joint du piston est à JOINT : devant lui, la solution.
  const EMB = 8, EPA = 12, CORPS = 78, AIL = 81, JOINT = 50, TIGE = 95;
  const seringue = (P, u, s) => {
    const n = [-u[1], u[0]];
    const Q = (t, w) => [P[0] + (u[0] * t + n[0] * w) * s, P[1] + (u[1] * t + n[1] * w) * s];
    const boite = (t0, t1, w0, w1 = w0) => ligneD([Q(t0, -w0), Q(t1, -w1), Q(t1, w1), Q(t0, w0)]) + ' Z';
    const fin = JOINT + TIGE;                         // le poussoir
    const out = [];
    // la tige hors du corps, en croix : deux bords et l'arête du milieu
    out.push(h.path(boite(AIL, fin, 4.2), BT(1.4)));
    out.push(h.path(ligneD([Q(AIL, 0), Q(fin, 0)]), TR(0.5)));
    // le poussoir
    out.push(h.path(boite(fin, fin + 3.2, 11), BT(1.4)));
    // le corps : la solution devant le joint, le joint, la tige vue au travers
    out.push(h.path(ligneD([Q(EMB, -2.6), Q(EPA, -8.4), Q(CORPS, -8.4), Q(CORPS, 8.4), Q(EPA, 8.4), Q(EMB, 2.6)]) + ' Z', BT(1.4)));
    out.push(h.path(ligneD([Q(EPA + 0.8, -7.4), Q(JOINT, -7.4), Q(JOINT, 7.4), Q(EPA + 0.8, 7.4)]) + ' Z', `fill="url(#h-eau)" stroke="none"`));
    out.push(h.path(boite(JOINT, JOINT + 6, 8.4), `fill="${NOIR}" stroke="${NOIR}" stroke-width="0.7"`));
    out.push(h.path(ligneD([Q(JOINT + 6, -4.2), Q(CORPS, -4.2)]) + ' ' + ligneD([Q(JOINT + 6, 4.2), Q(CORPS, 4.2)]), TR(0.5)));
    // les ailettes, arrondies
    out.push(h.path(cr([Q(CORPS, 0), Q(CORPS - 0.4, -12), Q(CORPS + 1.5, -16.5), Q(AIL + 0.4, -12), Q(AIL, 0), Q(AIL + 0.4, 12), Q(CORPS + 1.5, 16.5), Q(CORPS - 0.4, 12)], true), BT(1.4)));
    // les graduations : dix traits d'un millilitre, un plus long à 5 et à 10
    for (let k = 0; k <= 10; k++) {
      const t = EPA + 2 + k * 6, l = k % 5 === 0 ? 6 : 3.5;
      out.push(h.path(ligneD([Q(t, -8.4), Q(t, -8.4 + l)]), TR(0.5)));
    }
    // l'embout
    out.push(h.path(boite(0, EMB, 1.9, 2.6), BT(1.4)));
    return { svg: out.join('\n'), dos: t => Q(fin + t, 0), Q };
  };

  // ─── l'enfant couché, vu d'en haut ───────────────────────────────────────────────────
  // Repère de la tête (celui de la bibliothèque) : l'oreille en 0, 0 ; le visage vers +x ; le
  // haut du crâne en y = −124 ; le cou coupé vers y = 126 (nuque) et 155 (gorge). Sur la vue, ce
  // y file vers la droite (vers les pieds) et ce x vers le bas (s = +1, le visage tourné vers le
  // bas de la page) ou vers le haut (s = −1).
  const NARINE = [109, 24];                         // l'embout entre sous le bout du nez
  const AXE = 60;                                   // la seringue part vers le menton et les pieds
  // la couverture : son bord remonté aux épaules, le revers, deux plis sur les bras
  const BORD = [[-320, 250], [-210, 204], [-130, 162], [-62, 126], [0, 130], [62, 152], [130, 184], [210, 226], [320, 266]];
  const REVERS = BORD.map(([x, y]) => [x, y + 40]);
  const PLIS = [
    [[-150, 262], [-160, 340], [-156, 460]],
    [[150, 272], [160, 350], [156, 460]],
    [[-40, 250], [-10, 330], [-30, 460]],
  ];
  const scene = (z, E, s, cx, cy, id, avecTour) => {
    const T = p => [cx + E * p[1], cy + s * E * p[0]];
    const out = [];
    // la seringue, puis la tête par-dessus : l'embout disparaît dans la narine
    const P = T(NARINE);
    const u = [Math.sin(AXE * RAD), s * Math.cos(AXE * RAD)];
    const sg = seringue(P, u, E * 0.95);
    out.push(sg.svg);
    out.push(F.tete({ x: cx, y: cy, echelle: E, angle: -90, cote: s > 0 ? 'gauche' : 'droite' }));
    // la couverture, par-dessus le cou coupé ; elle file hors de la vue
    const loin = 900;
    const couv = [];
    couv.push(h.path(cr(BORD.map(T)) + ' ' + ligneD([T([300, loin]), T([-300, loin])]).replace('M', 'L') + ' Z', BLANC));
    couv.push(h.path(cr(BORD.map(T)), TR(1.4)));
    couv.push(h.path(cr(REVERS.map(T)), TR(0.7)));
    for (const pl of PLIS) couv.push(h.path(cr(pl.map(T)), TR(0.5)));
    out.push(clip(id, 0, 0, z.l, z.h, couv.join('\n')));
    // la poussée du piston, dans l'axe, vers le nez
    const a = sg.dos(36), b = sg.dos(8);
    out.push(h.fleche(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`, h.a.arete));
    let tour = null;
    if (avecTour) {
      // on a tourné la tête sur l'axe du corps : le nez, qui regardait vers le bas de la page,
      // regarde maintenant vers le haut
      const oc = T([0, -168]), rx = 30 * E, ry = 104 * E;
      const pts = [];
      for (let k = 0; k <= 30; k++) {
        const th = (74 + k * (212 / 30)) * RAD;
        pts.push([oc[0] + Math.cos(th) * rx, oc[1] + Math.sin(th) * ry * -s]);
      }
      out.push(h.fleche(cr(pts), h.a.arete));
      // la moitié de derrière, en tireté : c'est un tour autour de l'axe du corps
      const arr = [];
      for (let k = 0; k <= 16; k++) {
        const th = (290 + k * (140 / 16)) * RAD;
        arr.push([oc[0] + Math.cos(th) * rx, oc[1] + Math.sin(th) * ry * -s]);
      }
      out.push(h.path(cr(arr), h.a.cache));
      tour = pts[15];
    }
    return { svg: out.join('\n'), T, P, sg, tour };
  };

  // ─── il crache : le buste penché sur le bol ──────────────────────────────────────────
  const BUSTE = { echelle: 0.6, angle: 12, regard: 30 };
  const crache = z => {
    const tableY = z.h - 34;
    const bord = tableY - 34, bx = z.l * 0.68;
    const m0 = F.buste({ x: 0, y: 0, ...BUSTE }).bouche;
    const mx = bx - 6, my = bord - 58;
    const b = F.buste({ x: mx - m0[0], y: my - m0[1], ...BUSTE });
    return { tableY, bord, bx, b, m: b.bouche };
  };

  return {
    ref: '28-02',
    titre: 'Rincer le nez d’un enfant de 4 ans',
    desc: 'Vu d’en haut, l’enfant couché sur le dos sous sa couverture, la tête tournée sur le côté : l’embout d’une seringue orale de 10 mL dans la narine du haut, le piston poussé vers le nez. Puis la tête tournée de l’autre côté, la seringue dans l’autre narine. Enfin l’enfant assis, penché sur un bol, qui crache.',
    format: 'pleine',
    disposition: [['un'], ['deux', 'trois']],
    hauteurs: [1.2, 1],
    largeurs: [[1], [1.3, 1]],
    vues: {
      un: {
        titre: 'Couché sur le dos, la tête tournée, vu d’en haut',
        dessin: z => scene(z, 0.9, 1, z.l * 0.3, z.h * 0.34, 'vue-un-couverture', false).svg,
        renvois: z => {
          const v = scene(z, 0.9, 1, z.l * 0.3, z.h * 0.34, 'vue-un-couverture', false);
          return [
            { n: 1, rond: [z.l * 0.12, 16], cible: v.T([-40, -60]), texte: 'sur le dos, tête tournée sur le côté' },
            { n: 2, rond: [z.l * 0.16, z.h - 16], cible: [v.P[0], v.P[1] + 1.5], texte: 'l’embout dans la narine du haut' },
            { n: 3, rond: [z.l * 0.64, z.h - 16], cible: v.sg.dos(22), texte: 'pousser 5 à 10 mL ; sinon, à la cuillère' },
          ];
        },
      },
      deux: {
        titre: 'Puis l’autre côté',
        dessin: z => scene(z, 0.55, -1, z.l * 0.36, z.h * 0.64, 'vue-deux-couverture', true).svg,
        renvois: z => {
          const v = scene(z, 0.55, -1, z.l * 0.36, z.h * 0.64, 'vue-deux-couverture', true);
          return [
            { n: 4, rond: [16, 18], cible: v.tour, texte: 'tourner la tête : l’autre narine en haut' },
          ];
        },
      },
      trois: {
        titre: 'Il se relève et crache',
        dessin: z => {
          const { tableY, bord, bx, b, m } = crache(z);
          const out = [clip('vue-trois-buste', 0, 0, z.l, z.h, b.toString())];
          // la table devant lui, et le bol dessus, sous la bouche
          const rx = 32;
          out.push(h.rect(bx - 44, tableY, z.l - (bx - 44) - 2, 10, BT(1.4)));
          out.push(h.path(`M${f(bx - rx)} ${f(bord)} C${f(bx - rx + 2)} ${f(tableY - 4)} ${f(bx - 12)} ${f(tableY)} ${f(bx)} ${f(tableY)} C${f(bx + 12)} ${f(tableY)} ${f(bx + rx - 2)} ${f(tableY - 4)} ${f(bx + rx)} ${f(bord)} Z`, BT(1.4)));
          out.push(h.ellipse(bx, bord, rx, 6, BT(1.4)));
          // ce qu'il crache tombe dans le bol
          const goutte = (x, y, r) => h.path(`M${f(x)} ${f(y - 2.4 * r)} C${f(x + 0.4 * r)} ${f(y - 1.2 * r)} ${f(x + r)} ${f(y - 0.6 * r)} ${f(x + r)} ${f(y)} A${f(r)} ${f(r)} 0 0 1 ${f(x - r)} ${f(y)} C${f(x - r)} ${f(y - 0.6 * r)} ${f(x - 0.4 * r)} ${f(y - 1.2 * r)} ${f(x)} ${f(y - 2.4 * r)} Z`, BT(0.7));
          const y0 = m[1] + 14, y1 = bord - 2;
          [0.15, 0.5, 0.85].forEach((t, i) => out.push(goutte(m[0] + 1, y0 + (y1 - y0) * t, i === 1 ? 3 : 2.6)));
          const fx = m[0] + 20;
          out.push(h.fleche(`M${f(fx)} ${f(y0 - 2)} L${f(fx)} ${f(y1 - 8)}`, h.a.detail));
          return out.join('\n');
        },
        renvois: z => {
          const { bord, m } = crache(z);
          return [
            { n: 5, rond: [z.l - 16, 18], cible: [m[0] + 1, bord - 20], texte: 'il crache ; on lui essuie le nez' },
          ];
        },
      },
    },
  };
};
