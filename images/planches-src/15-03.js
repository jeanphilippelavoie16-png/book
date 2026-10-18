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
  const S1 = 0.085;
  const vTirer = z => {
    const yG = 44, E = z.l - 150, D = z.l + 10;
    // la personne : ses avant-bras sur la glace, juste avant le bord
    const p = poser({ pose: DANS, cote: 'gauche', echelle: S1, visage: true, y: yG }, 'epauleP', E - 26);
    // le sauveteur, loin du trou
    const s = poser({ pose: COUCHE, cote: 'droite', echelle: S1, visage: true, y: yG }, 'x0', 6);
    const A = p.articulations;
    // le nœud, sur le dos de la personne, sous les bras ; la corde fait le tour du torse
    const ep = A.epauleP, ha = A.hancheP;
    const u = [(ha[0] - ep[0]), (ha[1] - ep[1])], L = Math.hypot(...u), t = [u[0] / L, u[1] / L], n = [-t[1], t[0]];
    const c = [ep[0] + t[0] * 18, ep[1] + t[1] * 18];          // la corde autour du torse, un peu sous l'aisselle
    const demi = 13;                                          // la demi-épaisseur du torse à cet endroit
    const tour = [[c[0] + n[0] * demi, c[1] + n[1] * demi], [c[0] - n[0] * demi, c[1] - n[1] * demi]];
    const noeud = tour[1][1] < tour[0][1] ? tour[1] : tour[0];   // le côté du dos (le plus haut)
    const mP = [s.mainP.x, s.mainP.y], mL = [s.mainL.x, s.mainL.y];
    const svg = [
      coupe(z, S1, E, D, yG),
      String(s), String(p),
      // la corde : de la queue posée derrière le sauveteur, par ses deux mains, jusqu'au nœud
      corde(lisse([[mL[0] - 40, yG - 1.6], [mL[0] - 14, yG - 2.5], [mL[0], mL[1]], [mP[0], mP[1]], [noeud[0] - 40, noeud[1] - 2], noeud]), 2.6),
      // le tour de la corde autour du torse
      corde(`M ${P(...tour[0])} L ${P(...tour[1])}`, 2.6),
      h.cercle(noeud[0], noeud[1], 2.6, blanc(h.a.arete)),
      // tirer
      h.geste(`M ${P(mP[0] + 40, mP[1] - 22)} L ${P(mP[0] - 10, mP[1] - 22)}`),
    ];
    // les jambes qui battent : deux petites flèches noires de part et d'autre des pieds
    const pd = p.pieds.P.bas || p.pieds.P.cheville;
    svg.push(h.fleche(`M ${P(pd[0] + 12, pd[1] - 2)} L ${P(pd[0] + 12, pd[1] - 16)}`, h.a.detail));
    svg.push(h.fleche(`M ${P(pd[0] + 12, pd[1] + 2)} L ${P(pd[0] + 12, pd[1] + 16)}`, h.a.detail));
    return { svg: svg.join('\n'), s, p, tour, noeud, yG, E, mP, pd };
  };

  // ── vue 2 : de près, le bidon bouché au bout de la corde, tenu avant de lancer ──
  const vBidon = z => {
    const m0 = F.mainStock({ id: 'poing-tige-face', objet: false, taille: 74, x: 0, y: 0 });
    const m = F.mainStock({ id: 'poing-tige-face', objet: false, taille: 74, x: z.l * 0.52, y: 34 });
    const o = m.objet, a = o.angle * Math.PI / 180, u = [Math.cos(a), Math.sin(a)];
    const r = o.largeur * 0.32;
    const at = (t) => [o.x + u[0] * t, o.y + u[1] * t];
    // le bidon : un bidon de plastique, sa poignée en haut, le bouchon vissé
    const bx = z.l * 0.5, bw = 46, bh = 54, by = z.h - bh - 6;
    const poigneeX = bx + 8, poigneeY = by - 2;
    const svgB = [
      // le corps du bidon, l'épaule et le goulot
      h.path(`M ${P(bx - bw / 2, by + 8)} Q ${P(bx - bw / 2, by)} ${P(bx - bw / 2 + 8, by)} L ${P(bx - 6, by)} L ${P(bx - 6, by - 4)} L ${P(bx + bw / 2 - 8, by - 4)} Q ${P(bx + bw / 2, by - 4)} ${P(bx + bw / 2, by + 6)} L ${P(bx + bw / 2, by + bh - 6)} Q ${P(bx + bw / 2, by + bh)} ${P(bx + bw / 2 - 6, by + bh)} L ${P(bx - bw / 2 + 6, by + bh)} Q ${P(bx - bw / 2, by + bh)} ${P(bx - bw / 2, by + bh - 6)} Z`, blanc(h.a.contour)),
      h.path(`M ${P(bx + bw / 2, by + 10)} L ${P(bx + bw / 2, by + bh - 8)}`, h.a.arete),
    ];
    // la corde : de la main, elle descend jusqu'à la poignée et y est nouée
    const bas = at(-o.longueur * 0.5);
    const d = lisse([at(o.longueur * 0.9), at(o.longueur * 0.3), at(0), at(-o.longueur * 0.35), [bas[0] - 6, bas[1] + 18], [poigneeX - 2, poigneeY - 10], [poigneeX, poigneeY + 2]]);
    return { svg: [svgB.join('\n'), corde(d, r * 2), String(m)].join('\n'), m, bx, by, bw, bh };
  };

  // ── vue 3 : autre façon, y aller couché en poussant le toboggan ──
  const S3 = 0.07;
  const vAutre = z => {
    const yG = 34, E = z.l - 92, D = z.l + 10;
    const p = poser({ pose: DANS, cote: 'gauche', echelle: S3, visage: true, y: yG }, 'epauleP', E - 20);
    // le toboggan : une planche mince, la tête cintrée vers le trou
    const tl = 1800 * S3, te = 3, xt1 = E - 34, xt0 = xt1 - tl;
    const tob = h.path(`M ${P(xt0, yG)} L ${P(xt1 - 10, yG)} Q ${P(xt1 + 6, yG)} ${P(xt1 + 6, yG - 10)} Q ${P(xt1 + 6, yG - 18)} ${P(xt1 - 2, yG - 18)} Q ${P(xt1 - 8, yG - 18)} ${P(xt1 - 8, yG - 12)} L ${P(xt1 - 4, yG - 12)} Q ${P(xt1 - 3, yG - 15)} ${P(xt1 - 1, yG - 15)} Q ${P(xt1 + 3, yG - 15)} ${P(xt1 + 3, yG - 10)} Q ${P(xt1 + 3, yG - te)} ${P(xt1 - 10, yG - te)} L ${P(xt0, yG - te)} Z`, blanc(h.a.arete));
    const s = poser({ pose: POUSSE, cote: 'droite', echelle: S3, visage: true, y: yG }, 'x1', xt0 + 6);
    // l'autre adulte, couché lui aussi sur la glace qui a porté, au bord gauche de la vue
    const a = poser({ pose: COUCHE, cote: 'droite', echelle: S3, visage: true, y: yG }, 'x0', 2);
    const hs = s.articulations.bassin;
    const svg = [
      coupe(z, S3, E, D, yG),
      tob,
      String(a), String(s), String(p),
      corde(lisse([[a.mainL.x - 30, yG - 1.4], [a.mainL.x, a.mainL.y], [a.mainP.x, a.mainP.y], [hs[0] - 20, yG - 3], [hs[0], hs[1] + 2]]), 2.4),
      h.cercle(hs[0], hs[1] + 2, 2.2, blanc(h.a.arete)),
      h.geste(`M ${P(s.boite.x1 - 30, yG - 24)} L ${P(s.boite.x1 + 10, yG - 24)}`),
    ];
    return { svg: svg.join('\n'), s, a, p, xt0, xt1, yG, E };
  };

  return {
    ref: '15-03',
    titre: 'Sortir quelqu’un d’autre de l’eau',
    desc: 'En coupe de profil. Le sauveteur reste couché sur la glace qui a porté, loin du trou, et lance la corde à la personne tombée à l’eau. De près, un bidon vide, bouché, noué au bout de la corde : il la fait flotter et lui donne du poids. La corde est nouée autour du corps de la personne, sous les bras ; on tire pendant qu’elle bat des jambes, à plat ventre sur le bord. Autre façon, si rien ne l’atteint : y aller couché en poussant le toboggan devant soi, attaché à une corde que tient un autre adulte resté sur la glace qui a porté.',
    format: 'demi',
    disposition: [['tirer', 'bidon'], ['autre']],
    largeurs: [[3.6, 1], [1]],
    hauteurs: [130, 112],
    vues: {
      tirer: {
        dessin: z => vTirer(z).svg,
        renvois: z => { const v = vTirer(z), A = v.s.articulations; return [
          { n: 1, rond: [A.bassin[0], v.yG + 30], cible: [A.bassin[0], v.yG - 4], texte: 'rester couché loin du trou, lancer la corde' },
          { n: 3, rond: [v.noeud[0] + 30, 12], cible: [v.noeud[0] - 2, v.noeud[1] - 3], texte: 'lui nouer la corde autour du corps, sous les bras' },
          { n: 4, rond: [v.mP[0] + 58, v.mP[1] - 22], cible: [v.mP[0] + 41, v.mP[1] - 22], texte: 'tirer pendant qu’il bat des jambes' },
        ]; },
      },
      bidon: {
        dessin: z => vBidon(z).svg,
        renvois: z => { const v = vBidon(z); return [
          { n: 2, rond: [v.bx - v.bw / 2 - 2, v.by - 20], cible: [v.bx - v.bw / 2 + 3, v.by + 8], texte: 'nouer un bidon vide et bouché au bout' },
        ]; },
      },
      autre: {
        titre: 'Autre façon, si rien ne l’atteint',
        dessin: z => vAutre(z).svg,
        renvois: z => { const v = vAutre(z); return [
          { n: 5, rond: [v.xt0 + 40, v.yG + 30], cible: [v.xt0 + 40, v.yG], texte: 'au lieu de 1 : y aller couché, attaché, en poussant le toboggan' },
        ]; },
      },
    },
  };
};
