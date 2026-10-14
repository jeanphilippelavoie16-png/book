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
// Dernière vue : le pictogramme d'enfant de la bibliothèque (personnage, règle 8), assis sur un
// tabouret, penché sur un bol posé sur la table (JP, 12 octobre : le « petit bonhomme » refait).
//
// Aucune mesure de seringue ni de corps dans le chapitre : aucune cote.
//
// Lot 3 (13 octobre) : la dernière vue passe au corps simple de profil (assis-penche-bol, enfant de
// 4 ans) ; les avant-bras à plat sur la table, le bol entre eux, sous le menton. JP (13 octobre au
// soir) : les deux vues d'en haut sortent. Une seule vue de profil les remplace : l'enfant couché
// sur le dos (couche-dos, enfant de 4 ans, en grand), la seringue dans la narine ; « la tête tournée
// sur le côté » passe dans le renvoi (le moteur ne tourne pas la tête hors du plan) et une boucle au
// bout du crâne dit qu'on la tourne de l'autre côté. La planche passe en demi-page. Rouge : la
// poussée du piston, la tête qu'on tourne.

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

  // ─── couché sur le dos : le corps simple de profil, en grand (la tête et le tronc ; les jambes
  // sortent du cadre). Le moteur ne tourne pas la tête hors du plan : « la tête tournée sur le côté »
  // est dit par le renvoi, et la flèche autour de la tête montre qu'on la tourne de l'autre côté.
  // La seringue n'est pas tenue : sa position et la flèche du piston suffisent.
  const coupesXc = (svg, x) => {
    const ys = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (x0 !== x1 && (x0 - x) * (x1 - x) <= 0) ys.push(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
    }
    return ys;
  };
  const AXE_S = 38;                                  // la seringue, penchée de 38° vers les pieds
  const memoK = {};
  const geoCouche = z => {
    const cle = [z.l, z.h].join(',');
    if (memoK[cle]) return memoK[cle];
    const e = Math.min(0.62, (z.h - 40) / 330), mat = z.h - 26;
    const c0 = F.corps({ x: 0, y: mat, pose: 'couche-dos', age: 'enfant4', echelle: e });
    const c = F.corps({ x: 44 - c0.boite.x0, y: mat, pose: 'couche-dos', age: 'enfant4', echelle: e });
    const T = c.tete;
    // le bout du nez : le point le plus haut du visage ; la narine, juste dessous, côté bouche
    let nez = null;
    for (let x = T.x - 50 * e; x <= T.x + 80 * e; x += 0.5) { const ys = coupesXc(c, x); if (!ys.length) continue; const y = Math.min(...ys); if (!nez || y < nez[1]) nez = [x, y]; }
    const P = [nez[0] + 9 * e, nez[1] + 5 * e];
    const u = [Math.sin(AXE_S * RAD), -Math.cos(AXE_S * RAD)];
    const sg = seringue(P, u, e * 0.95);
    return (memoK[cle] = { e, mat, c, T, P, sg });
  };

  // ─── il crache : assis, penché sur le bol posé sur la table ──────────────────────────
  // Le corps simple de profil (assis-penche-bol, enfant de 4 ans, sur un tabouret de 244 mm) : les
  // avant-bras à plat sur la table, le bol entre eux, sous le menton. Le bol passe derrière le bras
  // proche (objetP) : on en voit le bord au-dessus de l'avant-bras. La table est mise à la hauteur
  // du dessous des avant-bras.
  const coupesX = (svg, x) => {
    const ys = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (x0 !== x1 && (x0 - x) * (x1 - x) <= 0) ys.push(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
    }
    return ys;
  };
  const ANGLES = { avantbrasP: 90, mainP: 90, avantbrasL: 90, mainL: 90 };
  const memoC = {};
  const crache = z => {
    const cle = [z.l, z.h].join(',');
    if (memoC[cle]) return memoC[cle];
    const E = Math.min(0.3, (z.h - 22) / 770), solY = z.h - 14, hx = 98 * E / 0.3;
    const c = F.corps({ x: hx, y: solY, pose: 'assis-penche-bol', age: 'enfant4', echelle: E, angles: ANGLES });
    const A = c.articulations, W = A.poignetP, K = A.coudeP;
    // le dessus de la table : le dessous de l'avant-bras proche, à mi-chemin du coude au poignet
    const xm = (K[0] + W[0]) / 2, ym = (K[1] + W[1]) / 2;
    const tableY = Math.min(...coupesX(c, xm).filter(y => y > ym)) + 0.4;
    const tx0 = K[0] - 26 * E * 3;                       // le bord de la table, sous le coude
    // le bol : sous le menton, posé sur la table
    const T = c.tete, bx = T.x + 50 * E, rx = 62 * E, prof = 72 * E, bord = tableY - prof;
    const m = [T.x + 52 * E, T.y + 70 * E];               // le bas du visage, d'où ça tombe
    return (memoC[cle] = { E, solY, hx, tableY, tx0, bx, rx, prof, bord, m, siege: c.siege });
  };
  return {
    ref: '28-02',
    titre: 'Rincer le nez d’un enfant de 4 ans',
    desc: 'De profil, l’enfant de 4 ans couché sur le dos sur un matelas, la tête tournée sur le côté : l’embout d’une seringue orale de 10 mL dans la narine du haut, le piston poussé vers le nez (flèche rouge) ; une boucle rouge au bout du crâne pour la tête qu’on tourne de l’autre côté, vers l’autre narine. Puis l’enfant assis sur un tabouret, les avant-bras à plat sur la table, penché sur un bol posé entre ses bras, qui crache.',
    format: 'demi',
    disposition: [['couche', 'trois']],
    largeurs: [[1.55, 1]],
    vues: {
      couche: {
        titre: 'Couché sur le dos, la tête tournée sur le côté',
        dessin: z => {
          const g = geoCouche(z), e = g.e, T = g.T, out = [];
          // le matelas et le plancher
          out.push(h.ligne(0, z.h - 4, z.l, z.h - 4, h.a.arete));
          out.push(h.rect(0, g.mat, z.l, z.h - 4 - g.mat, BT(1.4)));
          // l'enfant, les jambes coupées au bord de la vue
          out.push(clip('rogne-28-02-enfant', 0, 0, z.l, z.h, String(g.c)));
          // la seringue, l'embout dans la narine du haut, et la poussée du piston
          out.push(g.sg.svg);
          const a = g.sg.dos(36), b = g.sg.dos(8);
          out.push(h.geste(`M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`));
          // tourner la tête : une boucle autour de l'axe du corps, au bout du crâne (la tête roule
          // sur sa nuque, d'un côté à l'autre)
          const R = 70 * e, r = 22 * e, cx = g.c.boite.x0 - 18, cy = T.y;
          out.push(h.geste(`M${f(cx - r * 0.7)} ${f(cy - R * 0.72)} A${f(r)} ${f(R)} 0 1 1 ${f(cx - r * 0.5)} ${f(cy + R * 0.86)}`));
          return out.join('\n');
        },
        renvois: z => {
          const g = geoCouche(z), e = g.e, T = g.T;
          const R = 70 * e, r = 22 * e, cx = g.c.boite.x0 - 18;
          return [
            { n: 1, rond: [z.l - 16, g.mat - 70 * e], cible: [T.x + 230 * e, Math.min(...coupesXc(g.c, T.x + 230 * e)) + 1], texte: 'sur le dos, tête tournée sur le côté' },
            { n: 2, rond: [g.P[0] - 30, g.P[1] - 54], cible: [g.P[0] + 1, g.P[1] - 1], texte: 'l’embout dans la narine du haut' },
            { n: 3, rond: [z.l - 16, 18], cible: g.sg.dos(22), texte: 'pousser 5 à 10 mL ; sinon, à la cuillère' },
            { n: 4, rond: [14, 18], cible: [cx + r, T.y], texte: 'tourner la tête : l’autre narine en haut' },
          ];
        },
      },
      trois: {
        titre: 'Il se relève et crache',
        dessin: z => {
          const { E, solY, hx, tableY, tx0, bx, rx, prof, bord, m, siege } = crache(z);
          const out = [];
          const mm = v => v * E;
          // le sol
          out.push(h.ligne(4, solY, z.l - 4, solY, h.a.arete));
          // la table : le plateau sous les avant-bras ; un pied au loin ; elle sort de la vue à droite
          const tx1 = z.l + 4, epT = mm(30);
          out.push(h.rect(tx0 + mm(420), tableY + epT, mm(45), solY - tableY - epT, BT(1.4)));
          out.push(h.rect(tx0, tableY, tx1 - tx0, epT, BT(1.4)));
          // le tabouret sous la fesse : le dessus à la hauteur du siège de la pose
          const sy = siege[1];
          out.push(h.rect(siege[0] - mm(30), sy + mm(25), mm(36), solY - sy - mm(25), BT(1.4)));
          out.push(h.rect(siege[0] + mm(190), sy + mm(25), mm(36), solY - sy - mm(25), BT(1.4)));
          out.push(h.rect(siege[0] - mm(48), sy, mm(290), mm(25), BT(1.4)));
          // le bol, entre les avant-bras : derrière le bras proche ; sa face de droite à l'ombre
          const bol = [
            h.path(`M${f(bx - rx)} ${f(bord)} C${f(bx - rx + 2)} ${f(tableY - 4)} ${f(bx - 12)} ${f(tableY)} ${f(bx)} ${f(tableY)} C${f(bx + 12)} ${f(tableY)} ${f(bx + rx - 2)} ${f(tableY - 4)} ${f(bx + rx)} ${f(bord)} Z`, BT(1.4)),
            h.ellipse(bx, bord, rx, 4.5, BT(1.4)),
          ].join('\n');
          // l'enfant, le bol tenu entre ses bras
          out.push(F.corps({ x: hx, y: solY, pose: 'assis-penche-bol', age: 'enfant4', echelle: E, angles: ANGLES, objetP: bol }));
          // ce qu'il crache tombe dans le bol
          const goutte = (x, y, r) => h.path(`M${f(x)} ${f(y - 2.4 * r)} C${f(x + 0.4 * r)} ${f(y - 1.2 * r)} ${f(x + r)} ${f(y - 0.6 * r)} ${f(x + r)} ${f(y)} A${f(r)} ${f(r)} 0 0 1 ${f(x - r)} ${f(y)} C${f(x - r)} ${f(y - 0.6 * r)} ${f(x - 0.4 * r)} ${f(y - 1.2 * r)} ${f(x)} ${f(y - 2.4 * r)} Z`, BT(0.7));
          const y0 = m[1] + 7, y1 = bord - 2;
          [0.2, 0.8].forEach((t, i) => out.push(goutte(m[0] + 2 * t, y0 + (y1 - y0) * t, i ? 2.8 : 2.4)));
          return out.join('\n');
        },
        renvois: z => {
          const { bord, m } = crache(z);
          return [
            { n: 5, rond: [z.l - 16, 18], cible: [m[0] + 2, (m[1] + bord) / 2 + 4], texte: 'il crache ; on lui essuie le nez' },
          ];
        },
      },
    },
  };
};
