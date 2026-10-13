// Planche 24-01 — Lever près, lever sans tourner. Chapitre 24, « Le dos est un levier » (section 3),
// étape 8 et le point de contrôle « Chaque lever : distance entre les mains et les chevilles ».
// De profil : la même caisse portée sur les paumes, serrée contre le ventre (bon) et à bout de bras
// (raté). Vu de dessus, pour porter la caisse de côté : les pieds tournent avec elle (bon) ; les
// pieds restent plantés et le tronc tourne sous la charge (raté).
//
// Corps simples (h.formes.corps) : debout-charge-ventre et debout-bras-tendus de profil (bras
// retouchés : mains à 250 et à 500 mm de la cheville proche), la même pose vue de dessus. D'en haut,
// les pieds sont sous le corps et la caisse : ils se dessinent en arête cachée (tireté à 1,4), ce
// qui dépasse en trait plein. La charte : la caisse est l'objet (contour 2,4, arêtes 1,4, clous),
// les jours entre ses planches à l'ombre ; les empreintes d'avant le tour en gris loin. Rouge : le
// point à contrôler du bon (la caisse contre le ventre), l'endroit où le raté casse (le bas du dos),
// la flèche du geste (le quart de tour fait avec les pieds). La flèche du tronc qui tourne, sur le
// raté, reste noire : ce n'est pas un geste à faire.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const pt = p => `${f1(p[0])} ${f1(p[1])}`;
  const RAD = Math.PI / 180;
  const tourne = (p, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };

  // le bord avant du corps (sans les bras) entre deux hauteurs : la caisse s'y appuie
  const bordAvant = (svg, y0, y1) => {
    const m = /<path d="([^"]+)" fill="#FFFFFF" stroke="none"\/>/.exec(svg);
    let x = -Infinity;
    for (const [, a, b] of m[1].matchAll(/(-?[\d.]+) (-?[\d.]+)/g)) { const y = +b; if (y >= y0 && y <= y1) x = Math.max(x, +a); }
    return x;
  };

  // ─── De profil ─────────────────────────────────────────────────────────────────────────
  const E = 0.196;                         // unités de vue par mm, la même dans les deux vues de profil
  const mm = v => v * E;
  const CL = 300, CH = 300;                // la caisse : 300 × 300 mm de côté
  const sol = (x0, x1, y) => [h.rect(x0, y, x1 - x0, 8, A.hachure('terre', 'aucun')), h.ligne(x0, y, x1, y, A.arete)].join('\n');

  // la caisse de planches, vue de côté : deux montants aux bouts, trois planches, deux jours
  // (l'intérieur, à l'ombre, se voit entre les planches)
  const caisse = (x, y, l, ht, k = E) => {
    const m = 40 * k, jeu = 16 * k, pl = (ht - 2 * jeu) / 3;
    const out = [h.rect(x, y, l, ht, A.blanc)];
    for (let i = 1; i < 3; i++) out.push(h.rect(x + m, y + i * pl + (i - 1) * jeu, l - 2 * m, jeu, A.ombre));
    for (let i = 1; i < 3; i++) {
      const yy = y + i * pl + (i - 1) * jeu;
      out.push(h.ligne(x + m, yy, x + l - m, yy, A.arete), h.ligne(x + m, yy + jeu, x + l - m, yy + jeu, A.arete));
    }
    out.push(h.ligne(x + m, y, x + m, y + ht, A.arete), h.ligne(x + l - m, y, x + l - m, y + ht, A.arete));
    for (const cx of [x + m / 2, x + l - m / 2]) for (let i = 0; i < 3; i++) out.push(h.cercle(cx, y + i * (pl + jeu) + pl / 2, 1.1, A.plein));
    out.push(h.rect(x, y, l, ht, A.contour));
    return out.join('\n');
  };

  // un homme debout porte la caisse sur ses deux paumes ; la caisse passe entre le tronc et le bras
  // proche. cle : 'ventre' (le dos de la caisse contre le ventre) ou 'poignet' (la caisse au bout des
  // mains, son dos au ras des poignets)
  const profil = (z, pose, cle, angles) => {
    const G = z.h - 12, x0 = z.l * 0.27;
    const base = { x: x0, y: G, pose, echelle: E, angles, trait: 'fort' };
    const sonde = F.corps({ ...base, objetP: '<g/>' });
    const yb = sonde.mainP.y;                                    // le fond de la caisse, sur les paumes
    const bx = cle === 'ventre' ? bordAvant(sonde.svg, yb - mm(CH), yb) - 0.6 : sonde.poignetP[0] + mm(12);
    const by = yb - mm(CH);
    const c = F.corps({ ...base, objetP: caisse(bx, by, mm(CL), mm(CH)) });
    // l'aplomb des mains : du dessous des mains au sol, pour lire leur distance aux chevilles
    const plomb = h.ligne(c.mainP.x, yb + mm(40), c.mainP.x, G - 1, A.fin + ' stroke-dasharray="3 2.5"');
    return { svg: [sol(4, z.l - 4, G), c.svg, plomb].join('\n'), G, c, bx, by, yb, art: c.articulations };
  };
  // les angles retouchés pour que les mains tombent à 250 et à 500 mm de la cheville proche (le
  // point de contrôle du chapitre) ; à bout de bras, les bras tendus, la caisse presque à la même
  // hauteur que contre le ventre : seule la distance change
  const pV = z => profil(z, 'debout-charge-ventre', 'ventre', { brasP: -3, brasL: -6 });
  const pB = z => profil(z, 'debout-bras-tendus', 'poignet', { brasP: 55, brasL: 55, avantbrasP: 62, avantbrasL: 62, mainP: 92, mainL: 92 });

  // ─── Vu de dessus ──────────────────────────────────────────────────────────────────────
  const S = 0.27;                          // unités de vue par mm, les deux vues de dessus
  const centre = z => [z.l * 0.52, z.h * 0.60];
  // la caisse vue de dessus, devant le ventre : le couvercle de trois planches, deux jours
  const caisseDessus = (c, ang) => {
    const T = p => { const q = tourne(p, ang); return [c[0] + q[0] * S, c[1] + q[1] * S]; };
    const x0 = 120, x1 = 420, w = 170, jeu = 16, pl = (2 * w - 2 * jeu) / 3;
    const out = [h.chemin([[x0, -w], [x1, -w], [x1, w], [x0, w]].map(T), A.blanc, true)];
    for (let i = 1; i < 3; i++) {
      const y = -w + i * pl + (i - 1) * jeu;
      out.push(h.chemin([[x0, y], [x1, y], [x1, y + jeu], [x0, y + jeu]].map(T), A.ombre, true));
      out.push(h.chemin([[x0, y], [x1, y]].map(T), A.arete), h.chemin([[x0, y + jeu], [x1, y + jeu]].map(T), A.arete));
    }
    out.push(h.chemin([[x0, -w], [x1, -w], [x1, w], [x0, w]].map(T), A.contour, true));
    return out.join('\n');
  };
  // l'homme vu de dessus, la caisse devant lui. Ses pieds sont sous lui : on ne les voit pas d'en
  // haut. Ils se dessinent en arête cachée (tireté à 1,4), par-dessus le corps et la caisse ; les
  // jambes, invisibles d'en haut, sont masquées.
  const POSE = 'debout-charge-ventre';
  // les pieds : d'abord pleins, sous le corps (ce qui dépasse se voit en trait plein), puis leur
  // contour en tireté par-dessus (ce qui est caché sous le corps et la caisse)
  const cache = s => s.replace(/fill="none" stroke="#1A1A1A" stroke-width="[\d.]+"([^>]*)stroke-dasharray="3 2.2"/g, 'fill="none" stroke="#1A1A1A" stroke-width="1.4"$1stroke-dasharray="4.5 3"');
  const plein = s => s.replace(/fill="none" stroke="#1A1A1A" stroke-width="[\d.]+"([^>]*) stroke-dasharray="3 2.2"/g, 'fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.5"$1');
  const homme = (c, angles = {}) => F.corps({ x: c[0], y: c[1], pose: POSE, vue: 'dessus', echelle: S, angles, masquer: ['jambeP', 'jambeL'] });
  const pieds = (c, angles = {}, extra = {}) => F.corps({ x: c[0], y: c[1], pose: POSE, vue: 'dessus', echelle: S, angles, fantome: 'pieds', ...extra });
  // les pieds d'avant le tour : deux empreintes grises au sol, là où il était (il a fait un pas en tournant)
  const empreintes = g => g.svg.replace(/fill="none"/g, `fill="#E6E6E6"`);
  const pol = (c, r, a) => { const q = tourne([r, 0], a); return [c[0] + q[0] * S, c[1] + q[1] * S]; };
  // un arc autour de c, de a0 à a1 degrés (0 = vers la droite, sens horaire à l'écran), rayon r en mm
  const arcD = (c, r, a0, a1) => { const P = []; for (let k = 0; k <= 24; k++) P.push(pol(c, r, a0 + (a1 - a0) * k / 24)); return 'M' + P.map(pt).join(' L'); };
  const ARC = [450, -150, -36], ARC_RATE = [450, -118, -36];
  const AVANT = [-330, 70];              // où il était, en mm, par rapport à où il est

  const vueBon = z => {
    const c = centre(z);
    const avant = pieds([c[0] + AVANT[0] * S, c[1] + AVANT[1] * S], {}, { angle: -90 });
    const apres = pieds(c);
    return { c, avant, apres, svg: [empreintes(avant), plein(apres.svg), homme(c).svg, caisseDessus(c, 0), cache(apres.svg), h.geste(arcD(c, ...ARC))].join('\n') };
  };
  const twist = { tourneBassin: -90, tourneTronc: 90 };
  const vueRate = z => {
    const c = centre(z);
    const g = pieds(c, twist);
    return { c, g, svg: [plein(g.svg), homme(c, twist).svg, caisseDessus(c, 0), cache(g.svg), h.fleche(arcD(c, ...ARC_RATE))].join('\n') };
  };

  return {
    ref: '24-01',
    titre: 'Lever près, lever sans tourner',
    desc: 'De profil, le même homme porte la même caisse sur ses deux paumes : serrée contre le ventre, les mains à 25 cm des chevilles, puis à bout de bras, les mains à 50 cm ; un tireté descend de ses mains au sol. Vu de dessus, ses pieds cachés sous lui en tireté : pour porter la caisse de côté, il fait un pas en tournant et ses pieds regardent où regarde la caisse, ses empreintes d’avant en gris ; le raté garde les pieds plantés et tourne le tronc d’un quart de tour sous la charge.',
    format: 'pleine',
    disposition: [['ventre', 'bras'], ['pieds', 'tronc']],
    hauteurs: [3, 2],
    vues: {
      ventre: {
        titre: 'Bon : contre le ventre',
        dessin: z => {
          const p = pV(z);
          return [p.svg, h.controle(p.bx, p.by + mm(CH) * 0.5, 13)].join('\n');
        },
        renvois: z => {
          const p = pV(z);
          return [
            { n: 1, rond: [p.bx + mm(CL) + 34, p.yb + 46], cible: [p.c.mainP.x + 6, p.yb + 3], texte: 'mains à 25 cm des chevilles' },
            { n: 2, rond: [p.art.bassin[0] - mm(330), p.G - mm(1250)], cible: [p.art.bassin[0] - mm(150), p.G - mm(1250)], texte: 'dos droit, ni cambré ni rond' },
          ];
        },
      },
      bras: {
        titre: 'Raté : à bout de bras',
        dessin: z => {
          const p = pB(z);
          return [p.svg, h.controle(p.art.bassin[0] - mm(105), p.G - mm(1060), 13)].join('\n');
        },
        renvois: z => {
          const p = pB(z);
          return [
            { n: 3, rond: [Math.min(z.l - 14, p.bx + mm(CL) + 10), p.yb + 50], cible: [p.c.mainP.x + 6, p.yb + 3], texte: 'mains à 50 cm des chevilles' },
          ];
        },
      },
      pieds: {
        titre: 'Bon : les pieds tournent',
        dessin: z => vueBon(z).svg,
        renvois: z => {
          const v = vueBon(z), c = v.c;
          return [
            { n: 4, rond: [c[0] + 40 * S, z.h - 14], cible: [c[0] + 60 * S, c[1] + 152 * S], texte: 'les pieds tournent, pas à pas' },
            { n: 5, rond: [16, z.h - 14], cible: [c[0] + (AVANT[0] - 112) * S, c[1] + (AVANT[1] + 60) * S], texte: 'les pieds avant le tour' },
          ];
        },
      },
      tronc: {
        titre: 'Raté : le tronc tourne',
        dessin: z => vueRate(z).svg,
        renvois: z => {
          const v = vueRate(z), c = v.c;
          return [
            { n: 6, rond: [c[0] - 330 * S, c[1] + 120 * S], cible: [c[0] - 118 * S, c[1] + 30 * S], texte: 'les pieds plantés' },
            { n: 7, rond: pol(c, 520, -142), cible: pol(c, ARC_RATE[0], -116), texte: 'le tronc tourne d’un quart de tour' },
          ];
        },
      },
    },
  };
};
