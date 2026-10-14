'use strict';
// Planche 34-02 — Le peignage mouillé contre les poux. Chapitre 34, étapes 42 et 44, et
// « Venir à bout des poux sans peigne fin ».
//
// Tout ce qui est dessiné vient du chapitre : les cheveux mouillés et graissés, la mèche de la
// largeur du peigne (2 cm pour des cheveux longs), le peigne fin enfoncé au ras du cuir chevelu,
// incliné, tiré jusqu'au bout de la mèche, trempé dans l'eau chaude après chaque passage ; sans
// peigne fin, la lente vivante, près du cuir chevelu, pincée entre deux ongles et glissée jusqu'au
// bout du cheveu. Aucune cote : c'est un geste, rien ne se construit ; les 2 cm vont en légende.
//
// La tête vue de dos (le haut relevé en chignon, le bas en mèches, la mèche de travail au milieu),
// puis la racine de la même mèche en gros plan de côté, le peigne un peu de trois quarts pour qu’
// on voie ses dents. La loupe grossit la lente plus que les doigts, sinon elle ne se verrait pas.
// Mains simples et charte (14 octobre) : les deux bouts de doigts dessinés à la main sortent de la loupe, et aucune
// pince de la bibliothèque ne s'y lit ; la loupe garde le cheveu et la lente, le renvoi 7 dit la prise. La tête vue
// de dos est gardée telle quelle. Rouge : les quatre
// gestes (tirer le peigne, deux fois ; le tremper ; glisser la lente).
module.exports = (h) => {
  const A = h.a, F = h.formes, I = F._interne;
  const { lisse, ser } = I;
  const NOIR = '#1A1A1A';
  const f1 = v => Math.round(v * 10) / 10;
  const trait = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const blanc = ep => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const FOND = 'fill="#FFFFFF" stroke="none"';
  const RAD = Math.PI / 180;

  // Cadre une boîte en mm dans la zone : l'échelle s (px/mm) et P (mm → vue).
  const cadre = (z, [x1, x2], [y1, y2]) => {
    const s = Math.min(z.l / (x2 - x1), z.h / (y2 - y1));
    const ox = (z.l - (x2 - x1) * s) / 2 - x1 * s, oy = (z.h - (y2 - y1) * s) / 2 - y1 * s;
    const P = (x, y) => [ox + x * s, oy + y * s];
    return { s, P };
  };
  const courbe = (P, pts) => ser(lisse(pts.map(p => P(p[0], p[1]))), q => q);
  const poly = (P, pts, ferme = true) => 'M' + pts.map(p => P(p[0], p[1]).map(f1).join(' ')).join(' L') + (ferme ? ' Z' : '');
  const ondule = (i, k) => Math.sin(i * 2.3 + k * 1.7) * 0.5;

  // Les deux vues du haut partagent la même boîte : même échelle, racine à la même hauteur.
  const BX = [-48, 48], BY = [-36, 88];
  const decoupe = (z, P, id) => {
    const [x0, y0] = P(BX[0], BY[0]), [x1, y1] = P(BX[1], BY[1]);
    return `<clipPath id="${id}"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(x1 - x0)}" height="${f1(y1 - y0)}"/></clipPath>`;
  };

  // ─── la mèche vue de dos ──────────────────────────────────────────────────────────────
  // Racines en y = 0 ; la mèche de x = -9 à 9 ; les voisines écartées ; le haut relevé.
  const PEIGNE = { l: 22, dents: 25, dos: 8, n: 21 };   // en mm, seulement pour les proportions
  const INCL = Math.SQRT1_2;                            // le peigne incliné vu de dos : raccourci
  // Toute la tête vue de dos (enfant) : raie horizontale en y = 0, le haut relevé en chignon,
  // le bas en mèches qui pendent ; la mèche de travail au milieu, le peigne à sa racine.
  const BD = [[-95, 95], [-122, 124]];
  const MECHES = [[0, 20, 7], [-23, 20, 5], [23, 20, 5], [-44, 18, 5], [44, 18, 5], [-60, 11, 3], [60, 11, 3]];
  const meche = z => {
    const { s, P } = cadre(z, BD[0], BD[1]);
    const o = [];
    // le cou et les épaules, sous le bout des cheveux
    for (const c of [-1, 1]) {
      o.push(h.path(courbe(P, [[c * 31.5, 80], [c * 33, 92], [c * 44, 101], [c * 70, 109], [c * 95, 114]]), A.arete));
      // l'oreille, qui dépasse sur le côté
      o.push(h.path(courbe(P, [[c * 70, -14], [c * 80, -17], [c * 85, -6], [c * 83, 12], [c * 76, 27], [c * 69, 30]]), A.arete));
      o.push(h.path(courbe(P, [[c * 74, -8], [c * 79, -8], [c * 80, 6], [c * 75, 18]]), A.detail));
    }
    // le haut, relevé en chignon : les mèches montent du bord de la raie
    for (let i = 0; i < 13; i++) {
      const xr = -67 + i * 134 / 12, t = xr / 67;
      const pts = [[xr, -1.5], [xr * 1.07, -28], [xr * 0.97, -58], [xr * 0.55, -84], [xr * 0.14, -97]];
      const bord = i === 0 || i === 12;
      o.push(h.path(courbe(P, pts), bord ? A.arete : A.fin));
    }
    // le contour du crâne sous la raie, jusqu'à l'oreille
    for (const c of [-1, 1]) o.push(h.path(courbe(P, [[c * 67, -1.5], [c * 69.5, -8], [c * 70, -14]]), A.arete));
    const chignon = P(0, -103);
    o.push(h.cercle(chignon[0], chignon[1], 13 * s, blanc(1.4)));
    o.push(h.path(courbe(P, [[-9, -99], [-4, -110], [6, -109], [8, -100], [1, -95], [-3, -102], [2, -105]]), A.detail));
    // les mèches du bas : chacune serrée sur elle-même, un jour entre deux
    MECHES.forEach(([c, w, n], m) => {
      for (let j = 0; j < n; j++) {
        const xr = c + (j / (n - 1) - 0.5) * (w - 3);
        const bout = 82 - Math.abs(j - (n - 1) / 2) * 3 - (m % 2) * 2;
        const pts = [0.8, 14, 34, 56, bout].map((y, k) => [c + (xr - c) * (1 - 0.55 * y / 80) + ondule(j + m, k) * 0.5, y]);
        const bord = j === 0 || j === n - 1;
        o.push(h.path(courbe(P, pts), m === 0 ? (bord ? A.arete : A.detail) : (bord ? A.detail : A.fin)));
      }
    });
    // la flèche du geste, sur la mèche
    o.push(h.path(`M${P(0, 32).map(f1).join(' ')} L${P(0, 70).map(f1).join(' ')}`, trait(6).replace(NOIR, '#FFFFFF')));
    o.push(h.geste(`M${P(0, 32).map(f1).join(' ')} L${P(0, 72).map(f1).join(' ')}`));
    // le peigne, dents vers la racine
    const yP = 1.5, yD = yP + PEIGNE.dents * INCL, yF = yD + PEIGNE.dos * INCL, l2 = PEIGNE.l / 2, nD = 12;
    o.push(h.path(poly(P, [[-l2 + 0.6, yP - 0.3], [l2 - 0.6, yP - 0.3], [l2 - 0.6, yD], [-l2 + 0.6, yD]]), FOND));
    for (let k = 0; k < nD; k++) {
      const x = -l2 + 1 + k * (PEIGNE.l - 2) / (nD - 1);
      const bord = k === 0 || k === nD - 1;
      o.push(h.path(`M${P(x, yD).map(f1).join(' ')} L${P(x, yP).map(f1).join(' ')}`, bord ? A.arete : A.detail));
    }
    const [sx, sy] = P(-l2, yD), [ex, ey] = P(l2, yF);
    o.push(`<rect x="${f1(sx)}" y="${f1(sy)}" width="${f1(ex - sx)}" height="${f1(ey - sy)}" rx="${f1(1.2 * s)}" ${blanc(1.4)}/>`);
    return o.join('\n');
  };

  // ─── la même mèche, de côté ───────────────────────────────────────────────────────────
  // L'arrière de la tête à gauche (arc de centre (-70, 5), rayon 72), la nuque, le cou.
  const CT = [-70, 5], RT = 72;
  const surCrane = (deg, off = 0) => [CT[0] + (RT + off) * Math.cos(deg * RAD), CT[1] + (RT + off) * Math.sin(deg * RAD)];
  const angleDeY = y => Math.asin((y - CT[1]) / RT) / RAD;
  const DIR = (() => { const v = [1.17, 0.98], l = Math.hypot(v[0], v[1]); return [v[0] / l, v[1] / l]; })();
  const NRM = [-DIR[1], DIR[0]];
  // Le peigne de côté, un peu de trois quarts : la dent la plus proche touche le cuir chevelu au
  // bord de la silhouette, les autres, plus loin, touchent le crâne derrière elle.
  const LP = [NRM[0] * 0.35, NRM[1] * 0.35];
  const peigneCote = (P, pointe, attrs, fantome = false) => {
    const D = PEIGNE.dents, E = PEIGNE.dos, n = 9;
    const at = (k, a) => [pointe[0] + LP[0] * PEIGNE.l * k + DIR[0] * a, pointe[1] + LP[1] * PEIGNE.l * k + DIR[1] * a];
    const o = [];
    for (let i = n - 1; i >= 0; i--) {
      if (fantome && i > 0 && i < n - 1) continue;
      const k = i / (n - 1);
      o.push(h.path(`M${P(...at(k, 0)).map(f1).join(' ')} L${P(...at(k, D + 0.5)).map(f1).join(' ')}`, fantome ? attrs : (i === 0 ? A.arete : A.detail)));
    }
    const dos = [at(-0.04, D), at(1.04, D), at(1.04, D + E), at(-0.04, D + E)];
    o.push(h.path(poly(P, dos), fantome ? attrs : blanc(1.4)));
    return o.join('\n');
  };
  const passage = z => {
    const { s, P } = cadre(z, BX, BY);
    const o = [decoupe(z, P, 'pl3402-cote'), '<g clip-path="url(#pl3402-cote)">'];
    // la tête
    const crane = [];
    for (let a = -70; a <= 46; a += 4) crane.push(surCrane(a));
    const nuque = [surCrane(46), [-24, 62], [-27.5, 70], [-27, 80], [-25.5, 92]];
    o.push(h.path(courbe(P, [...crane, ...nuque.slice(1)]), A.contour));
    // le haut, relevé contre le crâne
    for (let i = 0; i < 5; i++) {
      const a0 = -7 - i * 8;
      const pts = [];
      for (let a = a0 - 4; a >= -76; a -= 6) pts.push(surCrane(a, 1 + (a0 - a) * 0.13 + i * 0.9 + Math.sin(a * 0.25 + i) * 0.7));
      o.push(h.path(courbe(P, [surCrane(a0), ...pts]), A.fin));
    }
    // la mèche : couchée sur la bosse du crâne, puis qui pend
    for (let i = 0; i < 7; i++) {
      const off = 0.7 + i * 0.55, r = surCrane(angleDeY(-1 + i * 0.8));
      const b = surCrane(angleDeY(6), off);
      const pts = [r, [r[0] + 0.3 + off * 0.5, r[1] + 3], b, [b[0] + 0.3, 20], [b[0] + 0.7 + ondule(i, 1) * 0.6, 40], [b[0] + 1.1 + ondule(i, 2) * 0.6, 60], [b[0] + 1.2 + (i - 3) * 0.35, 79 - (i % 3) * 2.5]];
      o.push(h.path(courbe(P, pts), A.detail));
    }
    // le trajet : le peigne à la racine, puis (tireté) au bout de la mèche
    const pointe = surCrane(angleDeY(1.2), 0.1);
    o.push(peigneCote(P, pointe));
    o.push(peigneCote(P, [1.2, 58], A.cache, true));
    o.push(h.geste(`M${P(31, 27).map(f1).join(' ')} L${P(31, 70).map(f1).join(' ')}`));
    o.push('</g>');
    return o.join('\n');
  };

  // ─── tremper le peigne ────────────────────────────────────────────────────────────────
  const tremper = z => {
    const { s, P } = cadre(z, [-62, 62], [-40, 54]);
    const o = [];
    const dedans = [[-50, 0], [-48.5, 16], [-43, 30], [-31, 40.5], [-15, 45], [0, 46]];
    const dehors = [[-52.5, 0], [-51, 17], [-45.3, 31.6], [-32.5, 43], [-15.5, 47.5], [0, 48.5]];
    const miroir = l => l.slice(0, -1).reverse().map(([x, y]) => [-x, y]);
    const inn = [...dedans, ...miroir(dedans)], out = [...dehors, ...miroir(dehors)];
    const EAU = 8;
    // l'eau : ce qui est sous la ligne d'eau, dans le bol
    const sous = inn.filter(p => p[1] > EAU);
    const xE = x => { // où la paroi coupe la ligne d'eau
      const i = dedans.findIndex(p => p[1] > EAU), a = dedans[i - 1], b = dedans[i];
      return a[0] + (b[0] - a[0]) * (EAU - a[1]) / (b[1] - a[1]);
    };
    const xe = xE();
    o.push(h.path(courbe(P, [[xe, EAU], ...sous, [-xe, EAU]]) + ' Z', A.hachure('eau', 'detail')));
    o.push(h.path(`M${P(xe, EAU).map(f1).join(' ')} L${P(-xe, EAU).map(f1).join(' ')}`, A.detail));
    // la paroi du bol, en coupe : un trait plein
    o.push(h.path(courbe(P, out) + ' ' + ser(lisse([...inn].reverse().map(p => P(p[0], p[1]))), q => q).replace(/^M/, 'L') + ' Z', A.plein));
    o.push(h.path(poly(P, [[-17, 47.2], [-18, 52], [18, 52], [17, 47.2]]), A.plein));
    // la vapeur
    for (const x of [-30, 22, 38]) {
      const pts = [];
      for (let k = 0; k <= 6; k++) pts.push([x + Math.sin(k * 1.4) * 2.2, 2 - k * 5.2]);
      o.push(h.path(courbe(P, pts), A.fin));
    }
    // le peigne, de face, dents dans l'eau
    const x0 = -9, yH = -16, l2 = PEIGNE.l / 2, yD = yH + PEIGNE.dos;
    for (let k = 0; k < PEIGNE.n; k++) {
      const x = x0 - l2 + 1 + k * (PEIGNE.l - 2) / (PEIGNE.n - 1);
      const bord = k === 0 || k === PEIGNE.n - 1;
      o.push(h.path(`M${P(x, yD).map(f1).join(' ')} L${P(x, yD + PEIGNE.dents).map(f1).join(' ')}`, bord ? A.arete : A.detail));
    }
    const [sx, sy] = P(x0 - l2, yH), [ex, ey] = P(x0 + l2, yD);
    o.push(`<rect x="${f1(sx)}" y="${f1(sy)}" width="${f1(ex - sx)}" height="${f1(ey - sy)}" rx="${f1(1.2 * s)}" ${blanc(1.4)}/>`);
    o.push(h.geste(`M${P(10, -30).map(f1).join(' ')} L${P(10, 4).map(f1).join(' ')}`));
    return o.join('\n');
  };

  // ─── sans peigne fin : aux ongles (loupe) ──────────────────────────────────────────────
  const R = 28;
  const loupe = z => {
    const s = Math.min(z.l, z.h) / (2 * R + 3);
    const cx = z.l / 2, cy = z.h / 2;
    const P = (x, y) => [cx + x * s, cy + y * s];
    const o = [`<clipPath id="pl3402-loupe"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R * s)}"/></clipPath>`, '<g clip-path="url(#pl3402-loupe)">'];
    // le cuir chevelu et d'autres cheveux
    const cuir = [[-26.8, -40], [-26.2, -18], [-26, 0], [-26.2, 18], [-26.8, 40]];
    o.push(h.path(courbe(P, cuir), A.arete));
    // le cheveu pincé
    o.push(h.path(courbe(P, [[-26, 0.45], [-14, 0.55], [4, 0.2], [24, 0.8], [40, 0.4]]), A.detail));
    // deux cheveux voisins, sans lente
    o.push(h.path(courbe(P, [[-26.4, -11], [-12, -11.6], [6, -12.4], [24, -12], [40, -13]]), A.detail));
    o.push(h.path(courbe(P, [[-26.3, 11.5], [-12, 12.2], [6, 12.6], [24, 13.4], [40, 13]]), A.detail));
    // la lente : un œuf collé au cheveu, la base vers le cuir chevelu, le couvercle au bout. Pas de main : à cette
    // échelle, aucune pince de la bibliothèque ne se lit (le « O » des doigts fait une boîte) ; le renvoi 7 dit la prise.
    const LC = [-19.6, -1.35], LR = [4.0, 1.8], LA = -7 * RAD;
    const G = (lx, ly) => [LC[0] + lx * Math.cos(LA) - ly * Math.sin(LA), LC[1] + lx * Math.sin(LA) + ly * Math.cos(LA)];
    const oeuf = [];
    for (let k = 0; k < 16; k++) { const a = k / 16 * 2 * Math.PI; oeuf.push(P(...G(LR[0] * Math.cos(a) * (1 - 0.08 * Math.sin(a)), LR[1] * Math.sin(a)))); }
    o.push(h.path(ser(lisse(oeuf, true), q => q), blanc(1.4)));
    o.push(h.path(courbe(P, [G(2.9, -1.35), G(2.4, 0), G(2.9, 1.35)]), A.detail));
    o.push(h.path(courbe(P, [G(-3.0, 1.4), G(-4.4, 1.75), [-25, 0.45]]), A.detail));
    // le geste : on glisse vers le bout du cheveu
    o.push(h.geste(`M${P(-13, -4.5).map(f1).join(' ')} L${P(15, -4.5).map(f1).join(' ')}`));
    o.push('</g>');
    o.push(h.cercle(cx, cy, R * s, A.contour));
    return o.join('\n');
  };

  // Les pastilles se placent en mm dans chaque vue : on refait le cadre.
  const pm = (z, x, y) => cadre(z, BX, BY).P(x, y);
  const pd = (z, x, y) => cadre(z, BD[0], BD[1]).P(x, y);
  const pt = (z, x, y) => cadre(z, [-62, 62], [-40, 54]).P(x, y);
  const pl = (z, x, y) => { const s = Math.min(z.l, z.h) / (2 * R + 3); return [z.l / 2 + x * s, z.h / 2 + y * s]; };

  return {
    ref: '34-02',
    titre: 'Le peignage mouillé contre les poux',
    desc: 'La mèche de la largeur du peigne vue de dos, le peigne fin enfoncé au ras du cuir chevelu, incliné, tiré jusqu’au bout de la mèche, trempé dans l’eau chaude après chaque passage ; sans peigne fin, la lente pincée entre deux ongles et glissée jusqu’au bout du cheveu.',
    format: 'pleine',
    disposition: [['meche', 'passage'], ['tremper', 'ongles']],
    hauteurs: [3, 2],
    vues: {
      meche: {
        titre: 'La mèche, vue de dos',
        dessin: meche,
        renvois: z => [
          { n: 1, rond: pd(z, -84, 66), cible: pd(z, -44, 58), texte: 'cheveux mouillés, graissés d’huile ou de gras' },
          { n: 2, rond: pd(z, 86, -40), cible: pd(z, 11.2, 12), texte: 'mèche large comme le peigne, 2 cm' },
        ],
      },
      passage: {
        titre: 'Le passage, de côté',
        dessin: passage,
        renvois: z => [
          { n: 3, rond: pm(z, 40, -8), cible: pm(z, 4, 3), texte: 'enfoncé au ras du cuir chevelu, incliné' },
          { n: 4, rond: pm(z, 42, 50), cible: pm(z, 31, 50), texte: 'tiré jusqu’au bout de la mèche' },
        ],
      },
      tremper: {
        titre: 'Après chaque passage',
        dessin: tremper,
        renvois: z => [
          { n: 5, rond: pt(z, 50, -30), cible: pt(z, 20, 22), texte: 'peigne trempé dans l’eau chaude' },
        ],
      },
      ongles: {
        titre: 'Sans peigne fin : aux ongles',
        dessin: loupe,
        renvois: z => [
          { n: 6, rond: pl(z, -32.5, 21), cible: pl(z, -22, -1.1), texte: 'lente vivante, près du cuir chevelu' },
          { n: 7, rond: pl(z, 32.5, -21), cible: pl(z, 9, -4.5), texte: 'glissée entre deux ongles jusqu’au bout' },
        ],
      },
    },
  };
};
