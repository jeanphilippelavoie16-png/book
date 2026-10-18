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
  // la personne dans l'eau : la poitrine et les avant-bras sur le bord de la glace, le reste du corps dans l'eau,
  // penché ; les jambes battent
  const BORD = { appui: 'avantbras', mains: { P: 'plat', L: 'plat' },
    angles: { tronc: 40, cou: 30, tete: 8, brasP: 30, avantbrasP: 90, mainP: 92, brasL: 26, avantbrasL: 90, mainL: 92,
      cuisseP: -12, jambeP: -28, piedP: 24, cuisseL: -28, jambeL: -10, piedL: 44 } };
  // la même, qui tend les bras vers le toboggan
  const TEND = { appui: 'avantbras', mains: { P: 'ouverte', L: 'ouverte' },
    angles: { tronc: 64, cou: 52, tete: 24, brasP: 74, avantbrasP: 86, mainP: 88, brasL: 70, avantbrasL: 84, mainL: 86,
      cuisseP: -36, jambeP: -54, piedP: 10, cuisseL: -52, jambeL: -34, piedL: 30 } };

  // la boucle de corde autour d'un torse, sous les bras : vue un peu de biais, une ellipse ; la moitié de derrière
  // passe derrière le corps (objetL), la moitié de devant devant le tronc et derrière le bras proche (objetP).
  // ep, ha : l'épaule et la hanche ; a : à combien de l'épaule ; demi : la demi-épaisseur du torse ; ec : la corde
  const boucle = (ep, ha, a, demi, ec) => {
    const u = [ha[0] - ep[0], ha[1] - ep[1]], L = Math.hypot(...u), t = [u[0] / L, u[1] / L], n = [-t[1], t[0]];
    const c = [ep[0] + t[0] * a, ep[1] + t[1] * a], R = demi + ec * 0.6, w = demi * 0.42;
    const pt = th => [c[0] + n[0] * R * Math.cos(th) + t[0] * w * Math.sin(th), c[1] + n[1] * R * Math.cos(th) + t[1] * w * Math.sin(th)];
    const arc = (a0, a1) => { const q = []; for (let i = 0; i <= 24; i++) q.push(pt(a0 + (a1 - a0) * i / 24)); return q; };
    const b1 = pt(0), b2 = pt(Math.PI);
    const haut = b1[1] < b2[1] ? 0 : Math.PI;                 // le côté du dos (le plus haut)
    return { c, t, n, R, pt, haut,
      derriere: corde(lisse(arc(haut - Math.PI, haut)), ec),   // passe derrière le corps
      devant: corde(lisse(arc(haut, haut + Math.PI)), ec),     // devant le tronc
      noeud: pt(haut + 0.5) };
  };

  // ── vue 1 : on tire ──
  // Le sauveteur, coupé par le bord gauche de la vue, couché loin du trou ; entre ses mains et la personne, plus
  // d'une longueur de corps : la corde seule, tendue.
  const S1 = 0.062;
  const vTirer = z => {
    const yG = 46, E = z.l - 110, D = z.l + 10;
    const s = poser({ pose: COUCHE, cote: 'droite', echelle: S1, visage: true, y: yG }, 'bassin', 30);
    const mP = [s.mainP.x, s.mainP.y];
    // la personne : ses coudes sur la glace, juste avant le bord
    let bc = null;
    const fabrique = x => F.corps({ pose: BORD, cote: 'gauche', echelle: S1, visage: true, x, y: yG,
      objetL: gg => { bc = boucle(gg.articulations.epauleP, gg.articulations.hancheP, 11, 8.5, 2.6); return bc.derriere; },
      objetP: gg => { const b = boucle(gg.articulations.epauleP, gg.articulations.hancheP, 11, 8.5, 2.6);
        return [corde(`M ${P(mP[0], mP[1])} L ${P(...b.noeud)}`, 2.8), b.devant, h.ellipse(b.noeud[0], b.noeud[1], 3.6, 3, blanc(h.a.arete))].join('\n'); } });
    // les hanches juste passé le bord, dans l'eau
    const p0 = fabrique(0), p = fabrique(E + 10 - p0.articulations.hancheP[0]);
    const pd = p.pieds.P.bas || p.pieds.P.cheville;
    const id = 'vue1503-tirer';
    const svg = [
      `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      coupe(z, S1, E, D, yG),
      String(p), String(s),
      '</g>',
      h.geste(`M ${P(mP[0] + 70, yG - 14)} L ${P(mP[0] + 14, yG - 14)}`),
      h.fleche(`M ${P(pd[0] + 14, pd[1] - 8)} L ${P(pd[0] + 14, pd[1] - 22)}`, h.a.detail),
      h.fleche(`M ${P(pd[0] + 14, pd[1] - 4)} L ${P(pd[0] + 14, pd[1] + 10)}`, h.a.detail),
    ];
    return { svg: svg.join('\n'), s, p, bc, yG, E, mP, pd };
  };

  // ── vue 2 : de près, le bidon bouché au bout de la corde, tenu avant de lancer ──
  // La main : poing-barre, la corde en biais dans le poing, l'avant-bras qui part vers la gauche. Le bidon (le même
  // que celui de la planche 15-02, le bec fermé de son bouchon) pend à sa poignée, penché : son centre se met sous
  // le nœud.
  const vBidon = z => {
    const ec = 4.4;
    // le bidon, dans son repère (avant le miroir et la pente) : (x, yT) le coin haut gauche du corps ; la poignée sur
    // le dessus, vers la droite ; T le haut de la barre de la poignée, au milieu : c'est là que la corde est nouée
    const L = 38, H = 40, T = [42, 74];
    const px0 = 0.3 * L, px1 = 0.92 * L, xm = (px0 + px1) / 2;
    const x = T[0] - xm, yT = T[1] + 12, sol = yT + H, yb = yT - 12;
    // le bidon pend à sa poignée : retourné (la poignée à gauche du milieu), il penche jusqu'à ce que son centre
    // passe sous le nœud
    const tilt = 14;
    const rr = q => { const mx = 2 * T[0] - q[0], c = Math.cos(tilt * Math.PI / 180), sn = Math.sin(tilt * Math.PI / 180), dx = mx - T[0], dy = q[1] - T[1];
      return [T[0] + dx * c - dy * sn, T[1] + dx * sn + dy * c]; };
    const can = [];
    can.push(h.path(`M ${P(x + 5, yT)} L ${P(x + L - 6, yT)} Q ${P(x + L, yT)} ${P(x + L, yT + 6)} L ${P(x + L, sol)} L ${P(x, sol)} L ${P(x, yT + 5)} Q ${P(x, yT)} ${P(x + 5, yT)} Z`, blanc(h.a.contour)));
    can.push(h.path(`M ${P(x + 6, yT + 2)} L ${P(x, yT + 8)} L ${P(x, sol)} L ${P(x + 6, sol)} Z`, h.a.ombre));
    can.push(h.path(`M ${P(x + 5, yT)} L ${P(x + L - 6, yT)} Q ${P(x + L, yT)} ${P(x + L, yT + 6)} L ${P(x + L, sol)} L ${P(x, sol)} L ${P(x, yT + 5)} Q ${P(x, yT)} ${P(x + 5, yT)} Z`, h.a.contour));
    can.push(h.ligne(x + 6, yT + 2, x + 6, sol, h.a.detail));
    const bx0 = x + 12, bx1 = x + L - 6, by0 = yT + 8, by1 = sol - 6;
    can.push(h.rect(bx0, by0, bx1 - bx0, by1 - by0, h.a.detail));
    can.push(h.path(`M ${P(bx0 + 3, by0 + 3)} L ${P(bx1 - 3, by1 - 3)} M ${P(bx1 - 3, by0 + 3)} L ${P(bx0 + 3, by1 - 3)}`, h.a.detail));
    const anse = h.path(`M ${P(x + px0, yT)} L ${P(x + px0 + 3, yb)} L ${P(x + px1 - 3, yb)} L ${P(x + px1, yT)} Z`, blanc(h.a.arete))
      + h.path(`M ${P(x + px0 + 6, yT)} L ${P(x + px0 + 7.5, yT - 7)} L ${P(x + px1 - 7.5, yT - 7)} L ${P(x + px1 - 6, yT)}`, blanc(h.a.detail));
    // le bec, fermé de son bouchon vissé (le bouchon à l'ombre, ses stries)
    const ax = -0.423, ay = -0.906, nx = -ay, ny = ax;
    const bc = [x + 11, yT + 1], lb = 8, wb = 9;
    const Q = (u, v) => [bc[0] + ax * u + nx * v, bc[1] + ay * u + ny * v];
    const col = h.chemin([Q(0, -wb / 2), Q(lb, -wb / 2), Q(lb, wb / 2), Q(0, wb / 2)], blanc(h.a.arete), true);
    const bq = [Q(lb - 1, -wb / 2 - 1.5), Q(lb + 6, -wb / 2 - 1.5), Q(lb + 6, wb / 2 + 1.5), Q(lb - 1, wb / 2 + 1.5)];
    const bouchon = h.chemin(bq, h.a.ombre, true) + h.chemin(bq, h.a.arete, true)
      + [-3, 0, 3].map(v => h.ligne(...Q(lb, v), ...Q(lb + 5, v), h.a.detail)).join('');
    // la corde : le brin qui descend passe derrière la barre de la poignée (A), ressort dessous et remonte devant le
    // long de lui (B) ; un nœud serre les deux brins l'un contre l'autre, le bout dépasse dessous
    const xs = T[0] - 3, yk = yb - 19;
    const A = { ep: ec, debut: 'coupe', fin: 'ouvert', pts: [[xs, yb - 46], [xs, yb - 12], [xs + 0.6, yb + 2], [xs + 4, yT - 2.4]] };
    const B = { ep: ec, debut: 'ouvert', fin: 'ouvert', pts: [[xs + 4, yT - 2.4], [xs + 9.5, yT - 4], [xs + 10.5, yb - 4], [xs + 8, yk + 6], [xs + 5, yk]] };
    const nouee = F.cordes([A], { trait: 'arete' }) + F.cordes([B], { trait: 'arete' })
      + `<g transform="rotate(-8 ${xs + 3.5} ${yk})">` + h.ellipse(xs + 3.5, yk, 7.2, 9, blanc(h.a.arete))
      + h.path(`M ${P(xs - 2.5, yk - 5)} Q ${P(xs + 4, yk - 1)} ${P(xs + 9.5, yk - 6)} M ${P(xs - 3, yk + 1)} Q ${P(xs + 4, yk + 5)} ${P(xs + 10, yk + 1)}`, h.a.detail) + '</g>'
      + F.cordes([{ ep: ec * 0.9, debut: 'coupe', fin: 'libre', pts: [[xs + 9, yk + 6], [xs + 13, yk + 11], [xs + 15, yk + 17]] }], { trait: 'arete' });
    const barre = `<clipPath id="vue1503-barre"><rect x="${xs - 4.5}" y="${yb - 2}" width="8" height="${yT - yb + 2}"/></clipPath>`
      + `<g clip-path="url(#vue1503-barre)">${anse}</g>`;
    const canSvg = `<g transform="rotate(${tilt} ${T[0]} ${T[1]}) translate(${2 * T[0]} 0) scale(-1 1)">\n${can.join('\n')}\n${col}\n${bouchon}\n${anse}\n${nouee}\n${barre}\n</g>`;
    // la main : poing-barre, posée pour que son axe continue le brin qui descend au nœud
    const haut = rr([xs, yb - 46]);
    const ua = [Math.cos(-73.6 * Math.PI / 180), Math.sin(-73.6 * Math.PI / 180)];
    const cm = [haut[0] + ua[0] * 9, haut[1] + ua[1] * 9];
    const m = F.mainStock({ id: 'poing-barre', objet: false, taille: 50, x: cm[0], y: cm[1] });
    const o = m.objet, uo = [Math.cos(o.angle * Math.PI / 180), Math.sin(o.angle * Math.PI / 180)];
    const at = t => [o.x + uo[0] * t, o.y + uo[1] * t];
    const dessus = F.cordes([{ ep: ec, debut: 'coupe', fin: 'coupe', pts: [at(o.longueur * 1.3), at(o.longueur * 0.4), at(0), haut] }], { trait: 'arete' });
    const id = 'vue1503-bidon';
    return { svg: [`<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      canSvg, dessus, String(m), '</g>'].join('\n'), m, T, x, yT, L, H, rr, sol };
  };

  // ── vue 3 : autre façon, y aller couché en poussant le toboggan ──
  // De gauche à droite : l'adulte couché qui tient la corde ; la corde tendue jusqu'à la taille du sauveteur ; le
  // sauveteur couché qui pousse le toboggan, la spatule vers le trou ; le trou, la personne qui tend les bras.
  const S3 = 0.06;
  const vAutre = z => {
    const yG = 29, E = z.l - 110, D = z.l + 10;
    const p0 = F.corps({ pose: TEND, cote: 'gauche', echelle: S3, visage: true, x: 0, y: yG });
    const p = F.corps({ pose: TEND, cote: 'gauche', echelle: S3, visage: true, x: E + 6 - p0.articulations.hancheP[0], y: yG });
    // le toboggan : une planche mince, la spatule recourbée vers le trou, son bout tout près des mains de la personne
    const R = 8, e = 1.5, xt1 = p.boite.x0 - 4, xt0 = xt1 - 1600 * S3 + R, yc = yG - e - R;
    const mil = [[xt0, yG - e]];
    for (let k = 0; k <= 20; k++) { const a = (90 - 200 * k / 20) * Math.PI / 180; mil.push([xt1 - R + R * Math.cos(a), yc + R * Math.sin(a)]); }
    const bande = q => mil.map((m, i) => {
      const a = mil[Math.min(i + 1, mil.length - 1)], b = mil[Math.max(i - 1, 0)];
      const dx = a[0] - b[0], dy = a[1] - b[1], l = Math.hypot(dx, dy) || 1;
      return [m[0] - dy / l * q, m[1] + dx / l * q];
    });
    const tob = h.chemin([...bande(e), ...bande(-e).reverse()], blanc(h.a.arete), true);
    // le sauveteur : ses mains sur le bout arrière du toboggan
    const s0 = F.corps({ pose: POUSSE, cote: 'droite', echelle: S3, visage: true, x: 0, y: yG });
    const xs = xt0 + 3 - s0.mainP.x;
    let nd = null;
    const s = F.corps({ pose: POUSSE, cote: 'droite', echelle: S3, visage: true, x: xs, y: yG,
      objetL: gg => { const b = boucle(gg.articulations.hancheP, gg.articulations.epauleP, 6, 8, 2.4); nd = b; return b.derriere; },
      objetP: gg => { const b = boucle(gg.articulations.hancheP, gg.articulations.epauleP, 6, 8, 2.4); return b.devant; } });
    // l'adulte qui tient la corde, couché sur la glace qui a porté, sans visage, coupé par le bord gauche
    const a = F.corps({ pose: COUCHE, cote: 'droite', echelle: S3, visage: false, x: 0, y: yG });
    const ax = 44 - a.articulations.bassin[0];
    const ad = F.corps({ pose: COUCHE, cote: 'droite', echelle: S3, visage: false, x: ax, y: yG,
      objetP: gg => corde(`M ${P(gg.mainP.x, gg.mainP.y)} L ${P(...nd.noeud)}`, 2.4) });
    const id = 'vue1503-autre';
    const svg = [
      `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      coupe(z, S3, E, D, yG),
      String(p), tob, String(s),
      h.ellipse(nd.noeud[0], nd.noeud[1], 3, 2.6, blanc(h.a.arete)),
      String(ad),
      '</g>',
      h.geste(`M ${P(xt0 + 10, yG - 22)} L ${P(xt0 + 60, yG - 22)}`),
    ];
    return { svg: svg.join('\n'), s, p, xt0, xt1, yG, E };
  };

  return {
    ref: '15-03',
    titre: 'Sortir quelqu’un d’autre de l’eau',
    desc: 'En coupe de profil. Le sauveteur reste couché sur la glace qui a porté, loin du trou, et lance la corde à la personne tombée à l’eau. De près, un bidon vide, bouché, noué au bout de la corde : il la fait flotter et lui donne du poids. La corde est nouée autour du corps de la personne, sous les bras ; on tire pendant qu’elle bat des jambes, à plat ventre sur le bord. Autre façon, si rien ne l’atteint : y aller couché en poussant le toboggan devant soi, attaché à une corde que tient un autre adulte resté sur la glace qui a porté.',
    format: 'demi',
    disposition: [['tirer', 'bidon'], ['autre']],
    largeurs: [[3.5, 1], [1]],
    hauteurs: [135, 107],
    vues: {
      tirer: {
        dessin: z => vTirer(z).svg,
        renvois: z => { const v = vTirer(z), A = v.s.articulations; return [
          { n: 1, rond: [Math.max(16, A.epauleP[0]), v.yG + 34], cible: [Math.max(16, A.epauleP[0]), v.yG + 1], texte: 'rester sur la glace qui a porté, lancer la corde' },
          { n: 3, rond: [v.bc.noeud[0] + 34, 10], cible: [v.bc.noeud[0] + 3, v.bc.noeud[1] - 2], texte: 'lui nouer la corde sous les bras' },
          { n: 4, rond: [v.mP[0] + 42, v.yG - 36], cible: [v.mP[0] + 42, v.yG - 16], texte: 'tirer pendant qu’il bat des jambes' },
        ]; },
      },
      bidon: {
        dessin: z => vBidon(z).svg,
        renvois: z => { const v = vBidon(z); return [
          { n: 2, rond: [z.l - 12, v.yT + 22], cible: [v.rr([v.x, v.yT + 18])[0] + 1, v.rr([v.x, v.yT + 18])[1]], texte: 'nouer un bidon vide et bouché au bout' },
        ]; },
      },
      autre: {
        titre: 'Autre façon, si rien ne l’atteint',
        dessin: z => vAutre(z).svg,
        renvois: z => { const v = vAutre(z); return [
          { n: 5, rond: [v.xt0 + 56, v.yG + 30], cible: [v.xt0 + 56, v.yG + 1], texte: 'au lieu de 1 : pousser le toboggan, couché, attaché' },
        ]; },
      },
    },
  };
};
