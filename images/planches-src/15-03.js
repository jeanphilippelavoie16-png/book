// Planche 15-03. Sortir quelqu'un d'autre de l'eau (chapitre 15, étapes 8 et 9, série orange « Quelqu'un passe à
// travers la glace »). Planche neuve, 18 octobre 2026.
//
// En haut, la scène en coupe de profil : le sauveteur couché à gauche, sur la glace qui a porté ; la corde qui va
// jusqu'à la personne dans le trou, à droite, nouée autour de son corps sous les bras ; on tire pendant qu'elle bat
// des jambes, à plat ventre sur le bord. À droite, de près : le bidon bouché, noué au bout de la corde, tenu avant de
// lancer. En bas, après un filet, l'autre façon (règle 10) : y aller couché en poussant le toboggan, attaché à une
// corde que tient un autre adulte resté sur la glace qui a porté.
//
// Ce que dit le texte (copie de travail, chapitre 15, étapes 8 et 9) : « Rester sur la glace qui a porté, s'approcher
// couché s'il le faut » ; « Lui tendre ou lui lancer quelque chose : une corde, une perche… » ; « Un bidon vide, bouché
// serré et noué au bout de la corde, la fait flotter et lui donne du poids pour la lancer loin » ; « Lui faire passer
// la corde autour du corps, sous les bras, et la nouer » ; « Tirer pendant qu'il bat des jambes, en le gardant à plat
// ventre sur la glace » ; « aller le chercher couché, en poussant quelque chose devant soi : le toboggan… s'attacher à
// une corde que tient un autre adulte resté sur la glace qui a porté ».
// Sources : suivi/15-redaction.md, ligne « Sauver quelqu'un » (sources/15-mndnr-glace-sortie-sauvetage-deplacements.md,
// sources/54-mndnr-glace-blanche-double-sondage-corde.md). Aucune cote : la planche ne porte ni distance ni longueur.
//
// Les corps : h.formes.corps, de profil (le visage de la bibliothèque des têtes). La main du gros plan :
// h.formes.mainStock « poing-tige-face » (2-09), l'objet du fichier enlevé (objet: false) ; la corde est posée sur son
// axe, avant la main. Rien n'est dessiné à la main pour un corps, une main ou une tête.
module.exports = (h) => {
  const F = h.formes, NOIR = '#1A1A1A';
  const P = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const eauFond = h.a.hachure('eau', 'aucun');

  // une corde : un trait noir et son âme blanche (la même que 15-01)
  const corde = (d, ep = 3.2) => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>\n`
    + `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${(ep - 1.4).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  // une courbe lisse par des points (Catmull-Rom → Bézier)
  const lisse = pts => {
    let d = `M ${P(...pts[0])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${P(...c1)} ${P(...c2)} ${P(...p2)}`;
    }
    return d;
  };

  // ── la glace en coupe : l'eau hachurée, la plaque de glace qui a porté à gauche (bord cassé en x = E), la plaque
  // d'en face à droite (bord en x = D), le niveau de l'eau net dans le trou. La plaque : 9 cm, 1 cm hors de l'eau.
  const coupe = (z, S, E, D, yG) => {
    const EP = 90 * S, HORS = 10 * S, yW = yG + HORS, yB = yG + EP;
    const bordG = [[E, yG], [E + 2, yG + EP * 0.35], [E - 1.2, yG + EP * 0.62], [E + 1, yB]];
    const bordD = [[D, yG], [D - 1.6, yG + EP * 0.4], [D + 1.2, yG + EP * 0.7], [D - 0.8, yB]];
    return [
      h.rect(0, yW, z.l, z.h - yW, eauFond),
      h.chemin([[0, yG], ...bordG, [0, yB]], h.a.blanc, true),
      h.chemin([[0, yG], ...bordG, [0, yB]], h.a.arete),
      D < z.l ? h.chemin([[z.l, yG], ...bordD, [z.l, yB]], h.a.blanc, true) : '',
      D < z.l ? h.chemin([[z.l, yG], ...bordD, [z.l, yB]], h.a.arete) : '',
      h.ligne(E + 1, yW, Math.min(D, z.l), yW, h.a.arete),
    ].join('\n');
  };

  // un corps posé une première fois pour lire sa géométrie, puis décalé pour qu'un de ses points tombe où on le veut
  const poser = (o, cle, xCible) => {
    const g0 = F.corps(Object.assign({}, o, { x: 0, y: 0 }));
    const x0 = cle === 'x1' ? g0.boite.x1 : cle === 'x0' ? g0.boite.x0 : g0.articulations[cle][0];
    return F.corps(Object.assign({}, o, { x: xCible - x0 }));
  };

  // ── les poses (angles de profil, avant le miroir : le corps regarde vers +x) ──
  // le sauveteur couché à plat ventre, la tête levée vers le trou, les bras devant, les mains sur la corde
  const COUCHE = { appui: 'ventre', mains: { P: 'prise', L: 'prise' }, prise: { P: 14, L: 14 },
    angles: { tronc: 90, cou: 80, tete: 64, brasP: 80, avantbrasP: 86, mainP: 88, brasL: 76, avantbrasL: 82, mainL: 86,
      cuisseP: -90, jambeP: -90, piedP: -80, cuisseL: -91, jambeL: -91, piedL: -80 } };
  // le même, qui pousse le toboggan : les bras tendus, les mains posées sur le bout du toboggan
  const POUSSE = { appui: 'ventre', mains: { P: 'prise', L: 'prise' }, prise: { P: 20, L: 20 },
    angles: { tronc: 90, cou: 80, tete: 66, brasP: 84, avantbrasP: 88, mainP: 90, brasL: 82, avantbrasL: 86, mainL: 88,
      cuisseP: -90, jambeP: -90, piedP: -80, cuisseL: -91, jambeL: -91, piedL: -80 } };
  // la personne dans l'eau, à plat ventre sur le bord, les avant-bras sur la glace, les jambes qui battent
  const DANS = { appui: 'avantbras', mains: { P: 'plat', L: 'plat' },
    angles: { tronc: 80, cou: 62, tete: 30, brasP: 64, avantbrasP: 90, mainP: 92, brasL: 60, avantbrasL: 90, mainL: 92,
      cuisseP: -66, jambeP: -58, piedP: -30, cuisseL: -78, jambeL: -86, piedL: -60 } };

  // ── vue 1 : on tire ──
  // Le sauveteur est coupé par le bord gauche de la vue (ses jambes sont dehors) : la vue garde sa place pour la
  // corde, qui dit la distance entre lui et le trou.
  const S1 = 0.11;
  const vTirer = z => {
    const yG = 46, E = z.l - 96, D = z.l + 10;
    // la personne : les hanches au bord de la glace, le torse et les avant-bras sur la glace, les jambes dans l'eau
    const p = poser({ pose: DANS, cote: 'gauche', echelle: S1, visage: true, y: yG }, 'hancheP', E + 4);
    // le sauveteur, loin du trou, le bassin au bord gauche de la vue
    const s = poser({ pose: COUCHE, cote: 'droite', echelle: S1, visage: true, y: yG }, 'bassin', 16);
    const A = p.articulations;
    // la corde autour du torse, un peu sous l'aisselle ; le nœud sur le dos
    const ep = A.epauleP, ha = A.hancheP;
    const u = [ha[0] - ep[0], ha[1] - ep[1]], L = Math.hypot(...u), t = [u[0] / L, u[1] / L], n = [-t[1], t[0]];
    const c = [ep[0] + t[0] * 20, ep[1] + t[1] * 20];
    const demi = 17;
    const tour = [[c[0] + n[0] * demi, c[1] + n[1] * demi], [c[0] - n[0] * (demi - 2), c[1] - n[1] * (demi - 2)]];
    const noeud = tour[1][1] < tour[0][1] ? tour[1] : tour[0];
    const mP = [s.mainP.x, s.mainP.y], mL = [s.mainL.x, s.mainL.y];
    const pd = p.pieds.P.bas || p.pieds.P.cheville;
    const morceau = (mx, ml) => {
      const EP = 90 * S1, yv = yG;
      return h.chemin([[mx, yv + 1.5], [mx + ml * 0.55, yv], [mx + ml, yv + 1], [mx + ml + 1.5, yv + EP * 0.8], [mx + 1, yv + EP * 0.85]], blanc(h.a.arete), true);
    };
    const id = 'vue1503-tirer';
    const svg = [
      `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      coupe(z, S1, E, D, yG),
      morceau(z.l - 30, 22),
      String(s), String(p),
      // la corde : de la queue posée derrière le sauveteur, par ses deux mains, jusqu'au nœud
      corde(lisse([[-4, yG - 2], [mL[0] - 30, yG - 2.4], [mL[0], mL[1]], [mP[0], mP[1]], [mP[0] + 50, yG - 3.5], [noeud[0] - 26, noeud[1] - 1], noeud]), 3),
      // le tour de la corde autour du torse
      corde(`M ${P(...tour[0])} L ${P(...tour[1])}`, 3),
      h.cercle(noeud[0], noeud[1], 3, blanc(h.a.arete)),
      '</g>',
      // tirer
      h.geste(`M ${P(mP[0] + 54, yG - 26)} L ${P(mP[0] - 4, yG - 26)}`),
      // les jambes qui battent : deux petites flèches noires sous les pieds
      h.fleche(`M ${P(pd[0] + 14, pd[1] - 8)} L ${P(pd[0] + 14, pd[1] - 22)}`, h.a.detail),
      h.fleche(`M ${P(pd[0] + 14, pd[1] - 4)} L ${P(pd[0] + 14, pd[1] + 10)}`, h.a.detail),
    ];
    return { svg: svg.join('\n'), s, p, tour, noeud, yG, E, mP, pd };
  };

  // ── vue 2 : de près, le bidon bouché au bout de la corde, tenu avant de lancer ──
  // La main : poing-tige-face, tournée de 90° : l'avant-bras arrive du bord gauche, la corde passe dans le poing
  // presque debout et pend jusqu'au bidon.
  const vBidon = z => {
    const m = F.mainStock({ id: 'poing-tige-face', objet: false, taille: 60, x: 26, y: 30, angle: 90 });
    const o = m.objet, a = o.angle * Math.PI / 180, u = [Math.cos(a), Math.sin(a)];
    const at = t => [o.x + u[0] * t, o.y + u[1] * t];
    const ec = o.largeur * 0.62;                                   // l'épaisseur de la corde
    // le bidon de plastique, de face, un peu de trois quarts : le corps, la face de côté à l'ombre, l'épaule,
    // le goulot et son bouchon vissé à gauche, la poignée creuse à droite
    const bx = 30, by = 84, bw = 52, bh = 50, sd = 9;               // coin haut gauche du corps, largeur, hauteur, côté
    const X = bx + bw, Y = by + bh;
    const corps = h.path(`M ${P(bx, by + 6)} Q ${P(bx, by)} ${P(bx + 6, by)} L ${P(X - 4, by)} Q ${P(X, by)} ${P(X, by + 4)} L ${P(X, Y - 5)} Q ${P(X, Y)} ${P(X - 5, Y)} L ${P(bx + 5, Y)} Q ${P(bx, Y)} ${P(bx, Y - 5)} Z`, blanc(h.a.contour));
    const cote = h.path(`M ${P(X - 1, by + 2)} L ${P(X + sd, by - 3)} L ${P(X + sd, Y - 8)} Q ${P(X + sd, Y - 4)} ${P(X + sd - 3, Y - 3)} L ${P(X - 1, Y - 1)} Z`, h.a.ombre);
    const coteT = h.path(`M ${P(X - 1, by + 2)} L ${P(X + sd, by - 3)} L ${P(X + sd, Y - 8)} Q ${P(X + sd, Y - 4)} ${P(X + sd - 3, Y - 3)} L ${P(X - 1, Y - 1)}`, h.a.arete);
    // le goulot et le bouchon, à gauche sur le dessus
    const gx = bx + 12, gw = 14;
    const goulot = h.rect(gx, by - 5, gw, 5, blanc(h.a.arete));
    const bouchon = h.rect(gx - 2, by - 14, gw + 4, 9, h.a.ombre) + h.rect(gx - 2, by - 14, gw + 4, 9, h.a.arete)
      + [1, 2, 3, 4].map(k => h.ligne(gx - 2 + k * (gw + 4) / 5, by - 13, gx - 2 + k * (gw + 4) / 5, by - 6, h.a.detail)).join('');
    // la poignée : une anse pleine sur le dessus, à droite, avec son trou
    const px0 = bx + 31, px1 = X - 3, py = by - 15;
    const anse = h.path(`M ${P(px0, by)} L ${P(px0, py + 5)} Q ${P(px0, py)} ${P(px0 + 5, py)} L ${P(px1 - 5, py)} Q ${P(px1, py)} ${P(px1, py + 5)} L ${P(px1, by)} Z`, blanc(h.a.arete));
    const trou = h.path(`M ${P(px0 + 4, by)} L ${P(px0 + 4, py + 8)} Q ${P(px0 + 4, py + 5)} ${P(px0 + 7, py + 5)} L ${P(px1 - 7, py + 5)} Q ${P(px1 - 4, py + 5)} ${P(px1 - 4, py + 8)} L ${P(px1 - 4, by)}`, h.a.arete);
    // la corde : du haut de la vue, par le poing, jusqu'à l'anse ; elle passe sous la barre de l'anse et remonte
    // faire un nœud sur elle-même
    const xa = (px0 + px1) / 2;
    const bas = at(o.longueur * 0.42);
    const dCorde = lisse([at(-o.longueur * 1.2), at(-o.longueur * 0.4), at(0), bas, [xa - 2, py - 18], [xa - 1, py - 4], [xa, py + 4]]);
    const dRetour = lisse([[xa + 1, py - 1], [xa + 9, py - 6], [xa + 6, py - 15], [xa - 1, py - 16]]);
    const noeud = [xa - 1.5, py - 15];
    return { svg: [
      corps, cote, coteT, goulot, bouchon,
      corde(dCorde, ec),
      anse, trou,
      corde(dRetour, ec),
      h.ellipse(noeud[0], noeud[1], ec * 0.9, ec * 0.75, blanc(h.a.arete)),
      corde(`M ${P(noeud[0] + 2, noeud[1] + 2)} Q ${P(noeud[0] + 10, noeud[1] + 4)} ${P(noeud[0] + 12, noeud[1] + 11)}`, ec * 0.9),
      String(m)].join('\n'), m, bx, by, bw, bh, gx, gw };
  };

  // ── vue 3 : autre façon, y aller couché en poussant le toboggan ──
  const S3 = 0.075;
  const vAutre = z => {
    const yG = 30, E = z.l - 100, D = z.l + 10;
    const p = poser({ pose: DANS, cote: 'gauche', echelle: S3, visage: true, y: yG }, 'hancheP', E + 3);
    // le toboggan : une planche mince, la tête cintrée vers le trou (ligne médiane, puis la bande autour)
    const R = 9, e = 1.6, xt1 = p.boite.x0 - 6, xt0 = xt1 - 1800 * S3 + R, yc = yG - e - R;
    const mil = [[xt0, yG - e]];
    for (let k = 0; k <= 20; k++) { const a = (90 - 200 * k / 20) * Math.PI / 180; mil.push([xt1 - R + R * Math.cos(a) + 0, yc + R * Math.sin(a)]); }
    const bande = (q) => mil.map((m, i) => {
      const a = mil[Math.min(i + 1, mil.length - 1)], b = mil[Math.max(i - 1, 0)];
      const dx = a[0] - b[0], dy = a[1] - b[1], l = Math.hypot(dx, dy) || 1;
      return [m[0] - dy / l * q, m[1] + dx / l * q];
    });
    const tob = h.chemin([...bande(e), ...bande(-e).reverse()], blanc(h.a.arete), true);
    const s = poser({ pose: POUSSE, cote: 'droite', echelle: S3, visage: true, y: yG }, 'x1', xt0 + 8);
    // l'autre adulte, couché lui aussi sur la glace qui a porté, coupé par le bord gauche de la vue
    const a = poser({ pose: COUCHE, cote: 'droite', echelle: S3, visage: true, y: yG }, 'bassin', 8);
    const As = s.articulations;
    // la corde du sauveteur, nouée à la taille
    const tb = As.bassin, te = As.epauleP;
    const ut = [te[0] - tb[0], te[1] - tb[1]], Lt = Math.hypot(...ut), tt = [ut[0] / Lt, ut[1] / Lt], nt = [-tt[1], tt[0]];
    const ct = [tb[0] + tt[0] * 10, tb[1] + tt[1] * 10], dt = 11;
    const taille = [[ct[0] + nt[0] * dt, ct[1] + nt[1] * dt], [ct[0] - nt[0] * dt, ct[1] - nt[1] * dt]];
    const nd = taille[1][1] < taille[0][1] ? taille[1] : taille[0];
    const id = 'vue1503-autre';
    const svg = [
      `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      coupe(z, S3, E, D, yG),
      tob,
      String(a), String(s), String(p),
      corde(lisse([[-4, yG - 1.6], [a.mainL.x - 24, yG - 2], [a.mainL.x, a.mainL.y], [a.mainP.x, a.mainP.y], [a.mainP.x + 40, yG - 2.4], [nd[0] - 30, nd[1] - 1], nd]), 2.6),
      corde(`M ${P(...taille[0])} L ${P(...taille[1])}`, 2.6),
      h.cercle(nd[0], nd[1], 2.6, blanc(h.a.arete)),
      '</g>',
      h.geste(`M ${P(As.epauleP[0] - 6, yG - 26)} L ${P(As.epauleP[0] + 46, yG - 26)}`),
    ];
    return { svg: svg.join('\n'), s, a, p, xt0, xt1, yG, E, nd };
  };

  return {
    ref: '15-03',
    titre: 'Sortir quelqu’un d’autre de l’eau',
    desc: 'En coupe de profil. Le sauveteur reste couché sur la glace qui a porté, loin du trou, et lance la corde à la personne tombée à l’eau. De près, un bidon vide, bouché, noué au bout de la corde : il la fait flotter et lui donne du poids. La corde est nouée autour du corps de la personne, sous les bras ; on tire pendant qu’elle bat des jambes, à plat ventre sur le bord. Autre façon, si rien ne l’atteint : y aller couché en poussant le toboggan devant soi, attaché à une corde que tient un autre adulte resté sur la glace qui a porté.',
    format: 'demi',
    disposition: [['tirer', 'bidon'], ['autre']],
    largeurs: [[3.5, 1], [1]],
    hauteurs: [140, 102],
    vues: {
      tirer: {
        dessin: z => vTirer(z).svg,
        renvois: z => { const v = vTirer(z), A = v.s.articulations; return [
          { n: 1, rond: [A.epauleP[0] - 10, v.yG + 34], cible: [A.epauleP[0] - 10, v.yG + 1], texte: 'rester sur la glace qui a porté, lancer la corde' },
          { n: 3, rond: [v.noeud[0] + 30, 12], cible: [v.noeud[0] + 2, v.noeud[1] - 2], texte: 'lui nouer la corde sous les bras' },
          { n: 4, rond: [v.mP[0] + 78, v.yG - 26], cible: [v.mP[0] + 56, v.yG - 26], texte: 'tirer pendant qu’il bat des jambes' },
        ]; },
      },
      bidon: {
        dessin: z => vBidon(z).svg,
        renvois: z => { const v = vBidon(z); return [
          { n: 2, rond: [12, v.by + 26], cible: [v.bx - 1, v.by + 26], texte: 'nouer un bidon vide et bouché au bout' },
        ]; },
      },
      autre: {
        titre: 'Autre façon, si rien ne l’atteint',
        dessin: z => vAutre(z).svg,
        renvois: z => { const v = vAutre(z); return [
          { n: 5, rond: [v.xt0 + 60, v.yG + 34], cible: [v.xt0 + 60, v.yG + 1], texte: 'au lieu de 1 : pousser le toboggan, couché, attaché' },
        ]; },
      },
    },
  };
};
