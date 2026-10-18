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

  // la corde nouée autour d'un torse : la bande vue de profil, un peu courbée vers les hanches, du dos au ventre ;
  // le nœud sur le dos. ep et ha : l'épaule et la hanche ; a : à combien de l'épaule ; demi : la demi-épaisseur.
  const autour = (ep, ha, a, demi, ec) => {
    const u = [ha[0] - ep[0], ha[1] - ep[1]], L = Math.hypot(...u), t = [u[0] / L, u[1] / L], n = [-t[1], t[0]];
    const c = [ep[0] + t[0] * a, ep[1] + t[1] * a];
    const b1 = [c[0] + n[0] * demi, c[1] + n[1] * demi], b2 = [c[0] - n[0] * demi, c[1] - n[1] * demi];
    const dos = b1[1] < b2[1] ? b1 : b2, ventre = dos === b1 ? b2 : b1;
    const m = [c[0] + t[0] * demi * 0.25, c[1] + t[1] * demi * 0.25];
    return { dos, ventre, svg: corde(`M ${P(...dos)} Q ${P(...m)} ${P(...ventre)}`, ec) };
  };

  // ── vue 1 : on tire ──
  // Le sauveteur est coupé par le bord gauche de la vue (ses jambes sont dehors) : la vue garde sa place pour la
  // corde, qui dit la distance entre lui et le trou.
  const S1 = 0.11;
  const vTirer = z => {
    const yG = 46, E = z.l - 124, D = z.l + 10;
    // la personne : les hanches au bord de la glace, le torse et les avant-bras sur la glace, les jambes dans l'eau
    const p = poser({ pose: DANS, cote: 'gauche', echelle: S1, visage: true, y: yG }, 'hancheP', E + 4);
    const A = p.articulations;
    const t = autour(A.epauleP, A.hancheP, 20, 12, 3);
    const noeud = t.dos;
    // le sauveteur, loin du trou, le bassin au bord gauche de la vue ; la corde passe dans ses mains (devant le
    // tronc, derrière le bras proche : la main proche la serre)
    const cordeS = gg => corde(lisse([[-30, yG - 2], [gg.mainL.x - 34, yG - 2.4], [gg.mainL.x, gg.mainL.y], [gg.mainP.x, gg.mainP.y],
      [gg.mainP.x + 46, yG - 3], [noeud[0] - 28, noeud[1] + 3], noeud]), 3);
    const s = poser({ pose: COUCHE, cote: 'droite', echelle: S1, visage: true, y: yG, objetP: cordeS }, 'bassin', 16);
    const mP = [s.mainP.x, s.mainP.y];
    const pd = p.pieds.P.bas || p.pieds.P.cheville;
    const id = 'vue1503-tirer';
    const svg = [
      `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      coupe(z, S1, E, D, yG),
      String(p),
      t.svg,
      h.cercle(noeud[0], noeud[1], 3.2, blanc(h.a.arete)),
      String(s),
      '</g>',
      // tirer
      h.geste(`M ${P(mP[0] + 60, yG - 24)} L ${P(mP[0] + 4, yG - 24)}`),
      // les jambes qui battent : deux petites flèches noires de part et d'autre des pieds
      h.fleche(`M ${P(pd[0] + 12, pd[1] - 10)} L ${P(pd[0] + 12, pd[1] - 24)}`, h.a.detail),
      h.fleche(`M ${P(pd[0] + 12, pd[1] - 4)} L ${P(pd[0] + 12, pd[1] + 10)}`, h.a.detail),
    ];
    return { svg: svg.join('\n'), s, p, noeud, yG, E, mP, pd };
  };

  // ── vue 2 : de près, le bidon bouché au bout de la corde, tenu avant de lancer ──
  // La main : poing-barre, la corde en biais dans le poing, l'avant-bras qui part vers la gauche. Le bidon (le même
  // que celui de la planche 15-02, le bec fermé de son bouchon) pend à sa poignée, penché : son centre se met sous
  // le nœud.
  const vBidon = z => {
    const m = F.mainStock({ id: 'poing-barre', objet: false, taille: 50, x: 46, y: 30 });
    const o = m.objet, a = o.angle * Math.PI / 180, u = [Math.cos(a), Math.sin(a)];
    const at = t => [o.x + u[0] * t, o.y + u[1] * t];
    const ec = 3.6;
    // le bidon, dans son repère : (x, yT) le coin haut gauche du corps ; la poignée sur le dessus, vers la droite
    const L = 44, H = 54, T = [38, 70];                        // T : le haut de la barre de la poignée, au milieu
    const px0 = 0.42 * L, px1 = 0.9 * L, xm = (px0 + px1) / 2;
    const x = T[0] - xm, yT = T[1] + 9, sol = yT + H, yb = yT - 9;
    const can = [];
    can.push(h.path(`M ${P(x + L - 6, yT + 2)} L ${P(x + L, yT + 8)} L ${P(x + L, sol)} L ${P(x + L - 6, sol)} Z`, h.a.ombre));
    can.push(h.path(`M ${P(x + 5, yT)} L ${P(x + L - 6, yT)} Q ${P(x + L, yT)} ${P(x + L, yT + 6)} L ${P(x + L, sol)} L ${P(x, sol)} L ${P(x, yT + 5)} Q ${P(x, yT)} ${P(x + 5, yT)} Z`, h.a.contour));
    can.push(h.ligne(x + L - 6, yT + 2, x + L - 6, sol, h.a.detail));
    const bx0 = x + 6, bx1 = x + L - 12, by0 = yT + 9, by1 = sol - 7;
    can.push(h.rect(bx0, by0, bx1 - bx0, by1 - by0, h.a.detail));
    can.push(h.path(`M ${P(bx0 + 3, by0 + 3)} L ${P(bx1 - 3, by1 - 3)} M ${P(bx1 - 3, by0 + 3)} L ${P(bx0 + 3, by1 - 3)}`, h.a.detail));
    // la poignée : la barre pleine et son trou
    const anse = h.path(`M ${P(x + px0, yT)} L ${P(x + px0 + 3, yb)} L ${P(x + px1 - 3, yb)} L ${P(x + px1, yT)} Z`, blanc(h.a.arete))
      + h.path(`M ${P(x + px0 + 6, yT)} L ${P(x + px0 + 7.5, yT - 5)} L ${P(x + px1 - 7.5, yT - 5)} L ${P(x + px1 - 6, yT)}`, blanc(h.a.detail));
    // le bec, penché vers la gauche, fermé de son bouchon vissé (le bouchon à l'ombre, ses stries)
    const ax = -0.423, ay = -0.906, nx = -ay, ny = ax;
    const bc = [x + 12, yT + 1], lb = 10, wb = 10;
    const Q = (s, v) => [bc[0] + ax * s + nx * v, bc[1] + ay * s + ny * v];
    const col = h.chemin([Q(0, -wb / 2), Q(lb, -wb / 2), Q(lb, wb / 2), Q(0, wb / 2)], blanc(h.a.arete), true);
    const bouchon = h.chemin([Q(lb - 1, -wb / 2 - 1.5), Q(lb + 6, -wb / 2 - 1.5), Q(lb + 6, wb / 2 + 1.5), Q(lb - 1, wb / 2 + 1.5)], h.a.ombre, true)
      + h.chemin([Q(lb - 1, -wb / 2 - 1.5), Q(lb + 6, -wb / 2 - 1.5), Q(lb + 6, wb / 2 + 1.5), Q(lb - 1, wb / 2 + 1.5)], h.a.arete, true)
      + [-3, 0, 3].map(v => h.ligne(...Q(lb, v), ...Q(lb + 5, v), h.a.detail)).join('');
    // la corde au bout : elle descend, passe derrière la barre, ressort dessous, remonte devant et fait une demi-clé
    // autour d'elle-même
    const xs = T[0] - 3;
    const brin = { ep: ec, fin: 'coupe', debut: 'coupe', pts: [
      [xs, yb - 30, 0], [xs, yb - 10, 0], [xs + 0.5, yb + 1, -2], [xs + 3, yT - 1.6, -2], [xs + 8.5, yT - 2.5, 0], [xs + 10, yb - 1, 1],
      [xs + 8, yb - 9, 1], [xs - 1, yb - 13, 2], [xs - 7, yb - 15.5, 2], [xs - 7, yb - 20, -1], [xs, yb - 22, -1], [xs + 6, yb - 19, -1],
      [xs + 9, yb - 14, 0.5], [xs + 13, yb - 6, 0.5]] };
    const nouee = F.cordes([brin], { trait: 'arete', jeu: 1.4 });
    // la barre de la poignée, repeinte par-dessus la corde là où celle-ci passe derrière
    const barre = `<clipPath id="vue1503-barre"><rect x="${xs - 4}" y="${yb - 2}" width="7.5" height="${yT - yb + 2}"/></clipPath>`
      + `<g clip-path="url(#vue1503-barre)">${anse}</g>`;
    const tilt = -14;
    const canSvg = `<g transform="rotate(${tilt} ${T[0]} ${T[1]})">\n${can.join('\n')}\n${col}\n${bouchon}\n${anse}\n${nouee}\n${barre}\n</g>`;
    // la corde du poing jusqu'au nœud, dans le repère de la vue
    const r = (q) => { const c = Math.cos(tilt * Math.PI / 180), s_ = Math.sin(tilt * Math.PI / 180), dx = q[0] - T[0], dy = q[1] - T[1]; return [T[0] + dx * c - dy * s_, T[1] + dx * s_ + dy * c]; };
    const haut = r([xs, yb - 30]);
    const dHaut = lisse([at(o.longueur * 1.1), at(o.longueur * 0.3), at(0), at(-o.longueur * 0.36), haut]);
    const dessus = F.cordes([{ ep: ec, debut: 'coupe', fin: 'coupe', pts: [at(o.longueur * 1.2), at(0), at(-o.longueur * 0.4), [haut[0], haut[1] - 1]] }], { trait: 'arete' });
    const id = 'vue1503-bidon';
    return { svg: [`<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      canSvg, dessus, String(m), '</g>'].join('\n'), m, T, x, yT, L, H, r, sol, dHaut };
  };

  // ── vue 3 : autre façon, y aller couché en poussant le toboggan ──
  const S3 = 0.075;
  const vAutre = z => {
    const yG = 30, E = z.l - 100, D = z.l + 10;
    const p = poser({ pose: DANS, cote: 'gauche', echelle: S3, visage: true, y: yG }, 'hancheP', E + 3);
    // le toboggan : une planche mince, la tête cintrée vers le trou (ligne médiane, puis la bande autour)
    const R = 9, e = 1.6, xt1 = p.boite.x0 - 6, xt0 = xt1 - 1800 * S3 + R, yc = yG - e - R;
    const mil = [[xt0, yG - e]];
    for (let k = 0; k <= 20; k++) { const a = (90 - 200 * k / 20) * Math.PI / 180; mil.push([xt1 - R + R * Math.cos(a), yc + R * Math.sin(a)]); }
    const bande = q => mil.map((m, i) => {
      const a = mil[Math.min(i + 1, mil.length - 1)], b = mil[Math.max(i - 1, 0)];
      const dx = a[0] - b[0], dy = a[1] - b[1], l = Math.hypot(dx, dy) || 1;
      return [m[0] - dy / l * q, m[1] + dx / l * q];
    });
    const tob = h.chemin([...bande(e), ...bande(-e).reverse()], blanc(h.a.arete), true);
    const s0 = poser({ pose: POUSSE, cote: 'droite', echelle: S3, visage: true, y: yG }, 'x1', xt0 + 8);
    const As = s0.articulations;
    const t = autour(As.hancheP, As.epauleP, 4, 9, 2.6);
    const nd = t.dos;
    // l'autre adulte, couché lui aussi sur la glace qui a porté, coupé par le bord gauche de la vue ; la corde passe
    // dans ses mains et va, posée sur la glace, jusqu'à la taille du sauveteur
    const cordeA = gg => corde(lisse([[-30, yG - 1.6], [gg.mainL.x - 24, yG - 2], [gg.mainL.x, gg.mainL.y], [gg.mainP.x, gg.mainP.y],
      [gg.mainP.x + 30, yG - 1.8], [nd[0] - 40, yG - 1.8], [nd[0] - 8, yG - 4], nd]), 2.6);
    const a = poser({ pose: COUCHE, cote: 'droite', echelle: S3, visage: false, y: yG, objetP: cordeA }, 'bassin', 10);
    const id = 'vue1503-autre';
    const svg = [
      `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      coupe(z, S3, E, D, yG),
      tob,
      String(p), String(s0),
      t.svg, h.cercle(nd[0], nd[1], 2.8, blanc(h.a.arete)),
      String(a),
      '</g>',
      h.geste(`M ${P(As.epauleP[0] - 4, yG - 26)} L ${P(As.epauleP[0] + 48, yG - 26)}`),
    ];
    return { svg: svg.join('\n'), s: s0, a, p, xt0, xt1, yG, E, nd };
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
          { n: 2, rond: [z.l - 12, v.yT + 34], cible: [v.r([v.x + v.L, v.yT + 34])[0] + 1, v.r([v.x + v.L, v.yT + 34])[1]], texte: 'nouer un bidon vide et bouché au bout' },
        ]; },
      },
      autre: {
        titre: 'Autre façon, si rien ne l’atteint',
        dessin: z => vAutre(z).svg,
        renvois: z => { const v = vAutre(z); return [
          { n: 5, rond: [v.xt1 - 40, v.yG + 34], cible: [v.xt1 - 40, v.yG + 1], texte: 'au lieu de 1 : pousser le toboggan, couché, attaché' },
        ]; },
      },
    },
  };
};
