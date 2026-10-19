// Planche 15-01. Sortir d'un trou dans la glace (ch. 15, étapes 3 à 6 ; matériel : les pics à glace).
// Refaite au complet le 18 octobre 2026 : les corps par h.formes.corps (de profil, visage de la bibliothèque des
// têtes), la main du gros plan par h.formes.mainStock (poing-manche-debout, objet: false, le pic posé sur son axe).
// Rien n'est dessiné à la main pour un corps, une main ou une tête. Les faits du geste :
// sources/20-minnesota-dnr-equipement-glace-pics.md, 20-wisconsin-dnr-pics-a-glace.md, 20-lakeice-pics-a-glace.md,
// 15-ny-dhses-pics-a-glace-au-cou.md, 35-croix-rouge-securite-sur-la-glace.md. Le sens de la tenue (l'angle du pic)
// n'a pas de source : le pic est dessiné droit, la pointe vers la glace.
module.exports = (h) => {
  const F = h.formes, NOIR = '#1A1A1A';
  const P = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const S = 0.12;                        // la séquence : unités de vue par mm, la même dans les quatre coupes
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const eauFond = h.a.hachure('eau', 'aucun');
  const trait = (ep) => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;

  // ── la glace en coupe : l'eau hachurée, la plaque de glace à gauche du trou (bord cassé en x = E), le niveau
  // de l'eau net dans le trou. La plaque : 9 cm d'épaisseur, 1 cm hors de l'eau.
  const EP = 90 * S, HORS = 10 * S;
  const coupe = (z, E, yG, { morceaux = [], fond = z.h } = {}) => {
    const yW = yG + HORS, yB = yG + EP;
    const bord = [[E, yG], [E + 2.5, yG + EP * 0.35], [E - 1.5, yG + EP * 0.62], [E + 1.2, yB]];
    const out = [
      h.rect(0, yW, z.l, fond - yW, eauFond),
      h.chemin([[0, yG], ...bord, [0, yB]], h.a.blanc, true),
      h.chemin([[0, yG], ...bord, [0, yB]], h.a.arete),
      h.ligne(E + 1.2, yW, z.l, yW, h.a.arete),
    ];
    for (const [mx, ml] of morceaux) {          // un morceau de la glace qui a cédé, qui flotte dans le trou
      const m = [[mx, yG + 1.5], [mx + ml * 0.55, yG], [mx + ml, yG + 1], [mx + ml + 1.5, yG + EP * 0.8], [mx + 1, yG + EP * 0.85]];
      out.push(h.chemin(m, blanc(h.a.arete), true));
    }
    return out.join('\n');
  };

  // le pic à l'échelle des corps : le manche (10 cm, Ø 3 cm) traverse le poing, le clou sort dessous ; la partie
  // plantée dans la glace en tireté
  const picCorps = (m, yG, plante) => {
    const r = 15 * S, haut = m.y - 55 * S, bas = m.y + 45 * S;
    return [
      h.path(`M ${P(m.x - r, haut)} L ${P(m.x - r, bas)} L ${P(m.x + r, bas)} L ${P(m.x + r, haut)} Z`, blanc(h.a.detail)),
      h.ligne(m.x, bas, m.x, yG, trait(1.4)),
      plante ? h.ligne(m.x, yG, m.x, yG + 20 * S, h.a.cache) : '',
    ].join('\n');
  };

  // un corps de la séquence, regardant vers la gauche (le côté d'où l'on vient) ; posé une première fois pour lire
  // sa géométrie, puis décalé pour qu'un de ses points tombe où on le veut
  const corps = (pose, o) => F.corps(Object.assign({ pose, cote: 'gauche', echelle: S, visage: false }, o));
  const dx = (pose, cle, xCible) => xCible - corps(pose, { x: 0, y: 0 }).articulations[cle][0];

  // une flèche du geste qui suit une ellipse (le tour d'un corps qui pivote ou qui roule)
  const anneau = (cx, cy, rx, ry, a0, a1) => {
    const pts = [];
    for (let k = 0; k <= 48; k++) { const a = (a0 + (a1 - a0) * k / 48) * Math.PI / 180; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return h.geste('M ' + pts.map(p => P(p[0], p[1])).join(' L '));
  };

  // ── les poses (angles de profil, avant le miroir : le corps regarde vers +x) ──
  const prises = { mains: { P: 'prise', L: 'prise' }, prise: { P: 30, L: 30 } };
  const EAU = Object.assign({ appui: 'avantbras', angles: { tronc: -4, cou: 4, tete: -4, brasP: 70, avantbrasP: 90, mainP: 92,
    brasL: 68, avantbrasL: 90, mainL: 92, cuisseP: 6, jambeP: -4, piedP: 40, cuisseL: -6, jambeL: -14, piedL: 36 } }, prises);
  const JAMBES = Object.assign({ appui: 'avantbras', angles: { tronc: 64, cou: 46, tete: 18, brasP: 34, avantbrasP: 90, mainP: 92,
    brasL: 30, avantbrasL: 90, mainL: 92, cuisseP: -66, jambeP: -74, piedP: -50, cuisseL: -80, jambeL: -88, piedL: -66 } }, prises);
  const TIRER = Object.assign({ appui: 'avantbras', angles: { tronc: 80, cou: 60, tete: 14, brasP: 60, avantbrasP: 90, mainP: 92,
    brasL: 74, avantbrasL: 90, mainL: 92, cuisseP: -85, jambeP: -83, piedP: -70, cuisseL: -87, jambeL: -86, piedL: -72 } }, prises);
  const ROULE = { appui: 'ventre', mains: { P: 'plat', L: 'plat' }, angles: { tronc: 90, cou: 84, tete: 72, brasP: -88, avantbrasP: -88,
    mainP: -88, brasL: -88, avantbrasL: -88, mainL: -88, cuisseP: -90, jambeP: -90, piedP: -80, cuisseL: -91, jambeL: -91, piedL: -80 } };

  // ── 2, 3 : dans l'eau, tourné vers le côté d'où l'on vient, les avant-bras à plat sur la glace ──
  const vEau = z => {
    const E = 88, yG = 70;
    let mP = null;
    const g = corps(EAU, { x: dx(EAU, 'epauleP', E + 120 * S), y: yG,
      objetP: gg => { mP = gg.mainP; return picCorps(gg.mainP, yG, false); }, objetL: gg => picCorps(gg.mainL, yG, false) });
    const t = g.tete, cy = t.haut[1] - 9;
    return { svg: [coupe(z, E, yG, { morceaux: [[z.l - 64, 24], [z.l - 30, 18]] }), String(g), anneau(t.haut[0], cy, 22, 6, 200, 500)].join('\n'),
      g, E, yG, mP, anneau: [t.haut[0], cy] };
  };
  // ── 5, 6 : les pics plantés près du bord, battre des jambes jusqu'à l'horizontale ──
  const vJambes = z => {
    const E = 96, yG = 92;
    let mP = null;
    const g = corps(JAMBES, { x: dx(JAMBES, 'epauleP', E + 30 * S), y: yG,
      objetP: gg => { mP = gg.mainP; return picCorps(gg.mainP, yG, true); }, objetL: gg => picCorps(gg.mainL, yG, true) });
    const pd = g.pieds.P.bas || g.pieds.P.cheville;
    return { svg: [coupe(z, E, yG), String(g),
      h.geste(`M ${P(pd[0] + 14, pd[1] - 20)} L ${P(pd[0] + 14, pd[1] + 14)}`, { double: true }),
      h.controle(mP.x, yG, 9)].join('\n'), g, E, yG, mP, pd };
  };
  // ── 7 : tirer en glissant sur le ventre, replanter plus loin ──
  const vTirer = z => {
    const E = 150, yG = 110;
    const g = corps(TIRER, { x: dx(TIRER, 'hancheP', E + 40 * S), y: yG,
      objetP: gg => picCorps(gg.mainP, yG, true), objetL: gg => picCorps(gg.mainL, yG, true) });
    const A = g.articulations, yF = yG - 47;
    return { svg: [coupe(z, E, yG), String(g),
      h.geste(`M ${P(A.hancheP[0] + 30, yF)} L ${P(A.epauleP[0] + 22, yF)}`)].join('\n'), g, E, yG, yF };
  };
  // ── 8 : vu de dessus, sorti, rouler loin du trou vers ses traces, sans se relever ──
  // Le trou en haut, plus long que le corps (l'eau, le bord cassé, des fissures qui partent du bord, deux morceaux qui
  // flottent) ; la personne couchée (le corps simple vu de dessus, pose couche-face, couché par la planche, la tête à
  // gauche ; pieds 'nu' : à cette taille, la botte vue de dessus fait un crochet) en cinq positions, la première
  // collée au bord du trou, les quatre plus anciennes en gris, la dernière en blanc. Le corps roule de côté : il avance
  // en travers de sa longueur, vers le bas, le long des traces de bottes de l'aller qui montent jusqu'au bord du trou.
  const SD = 0.052;
  const vDessus = z => {
    const corpsD = o => F.corps(Object.assign({ pose: 'couche-face', vue: 'face', echelle: SD, visage: false, pieds: 'nu' }, o));
    const g0 = corpsD({ x: 0, y: 0 });
    const b = g0.boite, bx = (b.x0 + b.x1) / 2, by = (b.y0 + b.y1) / 2, demiL = (b.y1 - b.y0) / 2, demiW = (b.x1 - b.x0) / 2;
    const cx = z.l / 2 + 22, hy = 34;
    // le trou : un peu plus long que le corps, le bord cassé en dents irrégulières
    const T = [[-66, -8], [-58, -20], [-40, -24], [-30, -19], [-12, -27], [6, -22], [22, -28], [40, -21], [56, -24], [66, -10],
      [62, 2], [68, 12], [58, 22], [38, 19], [24, 25], [6, 20], [-12, 24], [-28, 18], [-46, 23], [-60, 14], [-68, 4]]
      .map(([a, c]) => [cx - 22 + a * 1.25, hy + c]);
    const out = [];
    // les fissures qui partent du bord dans la glace
    for (const f of [[[-68, 4], [-78, 10], [-86, 6]], [[40, -21], [48, -32], [60, -38]], [[68, 12], [84, 16], [92, 26]],
      [[-58, -20], [-66, -32], [-78, -36]]])
      out.push(h.chemin(f.map(([a, c]) => [cx - 22 + a * 1.25, hy + c]), h.a.detail));
    out.push(h.chemin(T, h.a.hachure('eau', 'contour'), true));
    out.push(h.chemin([[cx - 70, hy - 10], [cx - 48, hy - 14], [cx - 44, hy + 2], [cx - 66, hy + 6]], blanc(h.a.arete), true));
    out.push(h.chemin([[cx + 18, hy - 6], [cx + 40, hy - 10], [cx + 44, hy + 6], [cx + 22, hy + 10]], blanc(h.a.arete), true));
    // cinq positions, un quart de tour chacune, la première collée au bord du trou : à plat ventre (le corps vu de
    // dos), sur le côté (vu de dessus, c'est le profil : les épaules et les hanches de côté, le bras du dessus le long du
    // corps), sur le dos (vu de face), sur l'autre côté (le profil retourné), à plat ventre. Toutes couchées par la planche, la tête à gauche.
    const DROIT = { appui: 'pieds', angles: { tronc: 0, cou: 4, tete: 0, brasP: 2, avantbrasP: 4, brasL: 0, avantbrasL: 2,
      cuisseP: 0, jambeP: 0, piedP: 90, cuisseL: 0, jambeL: 0, piedL: 90 } };
    const formes = [
      o => corpsD(Object.assign({ vue: 'dos', cheveux: false }, o)),
      o => F.corps(Object.assign({ pose: DROIT, cote: 'droite', echelle: SD, visage: false }, o)),
      o => corpsD(o),
      o => F.corps(Object.assign({ pose: DROIT, cote: 'gauche', echelle: SD, visage: false }, o)),
      o => corpsD(Object.assign({ vue: 'dos', cheveux: false }, o)),
    ];
    const poses = formes.map(f => { const q = f({ x: 0, y: 0 }).boite; return { f, cx: (q.x0 + q.x1) / 2, cy: (q.y0 + q.y1) / 2, dw: (q.x1 - q.x0) / 2 }; });
    const ys = [];
    let yy = hy + 23;
    for (const [k, q] of poses.entries()) { yy += q.dw + (k ? 5 : 0); ys.push(yy); yy += q.dw; }
    for (const [k, q] of poses.entries()) {
      const g = String(q.f({ x: cx - q.cx, y: ys[k] - q.cy }));
      const t = `<g transform="rotate(-90 ${P(cx, ys[k])})">${g}</g>`;
      out.push(k < 4 ? t.replace(/fill="#FFFFFF"/g, 'fill="#E6E6E6"') : t);
    }
    // la roulade : sur chacune des quatre premières positions, un arc rouge qui s'enroule autour du tronc
    // (l'arc passe par-dessus le corps de haut en bas : le dessus du corps part vers le bas, du côté où l'on roule)
    for (let k = 0; k < 4; k++) out.push(anneau(cx - demiL * 0.3, ys[k], 4.5, poses[k].dw + 2.5, 150, 410));
    // les traces de bottes de l'aller : semelle ovale plus large devant, talon à part, gauche et droite en quinconce,
    // dans l'axe de la roulade, du bas de la vue jusqu'au bord du trou, à gauche des têtes
    const xT = cx - demiL - 34;
    const gris = h.a.loin.replace('stroke="none"', `stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"`);
    const botte = (x, y, gauche) => {
      const semelle = `M ${P(x, y - 7)} C ${P(x + 3.6, y - 7)} ${P(x + 3.4, y - 1)} ${P(x + 2.4, y + 1.5)} C ${P(x + 1.6, y + 3)} ${P(x - 1.6, y + 3)} ${P(x - 2.4, y + 1.5)} C ${P(x - 3.4, y - 1)} ${P(x - 3.6, y - 7)} ${P(x, y - 7)} Z`;
      return `<g transform="rotate(${gauche ? -4 : 4} ${P(x, y)})">` + h.path(semelle, gris) + h.rect(x - 2.2, y + 4.2, 4.4, 3.6, gris) + '</g>';
    };
    for (let y = z.h - 10, k = 0; y > hy + 24; y -= 13, k++) out.push(botte(xT + (k % 2 ? 4 : -4), y, k % 2 === 1));
    // la flèche du geste : le long des traces, du trou vers le bas
    const xF = xT + 15;
    out.push(h.geste(`M ${P(xF, ys[0] - 4)} L ${P(xF, ys[4] + 14)}`));
    return { svg: out.join('\n'), cx, hy, ys, xF };
  };

  // ── 1 : avant d'aller sur la glace, les pics au cou, par-dessus le manteau, sur la poitrine ──
  const SB = 0.3;
  const DEBOUT = { appui: 'pieds', angles: { tronc: 0, cou: 8, tete: 0, brasP: 4, avantbrasP: 8, brasL: 0, avantbrasL: 4,
    cuisseP: 0, jambeP: 0, piedP: 90, cuisseL: 0, jambeL: 0, piedL: 90 } };
  // une corde : un trait noir et son âme blanche, qui se lit comme un cordon et pas comme une couture
  const corde = (d, ep = 3.2) => `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>\n`
    + `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${(ep - 1.4).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const vPorter = z => {
    const g0 = F.corps({ pose: DEBOUT, cote: 'gauche', echelle: SB, x: 0, y: 0, visage: false });
    const ox = z.l * 0.56 - g0.tete.x, oy = 6 - g0.tete.haut[1];
    let pic = null;
    const pics = gg => {
      const A = gg.articulations, cou = A.cou, ep = A.epauleP;
      // La paire, la pointe de l'une rentrée dans l'autre : deux manches bout à bout, debout au milieu de la poitrine,
      // juste devant elle. Le cordon fait le tour du cou et descend au bout du haut ; son autre brin passe derrière la
      // paire et entre dans le bout du bas.
      const x = ep[0] - 146 * SB, y0 = ep[1] + 96 * SB, L = 100 * SB, r = 15 * SB, e = r * 0.35;
      pic = { x, y: y0, L: 2 * L };
      const nuque = [cou[0] + 42 * SB, cou[1] - 22 * SB];
      const manche = (ya, yb) => h.path(`M ${P(x - r, ya)} L ${P(x - r, yb)} L ${P(x + r, yb)} L ${P(x + r, ya)} Z`, blanc(h.a.arete));
      const yM = y0 + L, yB = y0 + 2 * L;
      return [
        // le brin du bas descend derrière la paire, du bout du haut jusqu'au bout du bas, où il entre par-dessous
        corde(`M ${P(x + r * 0.5, y0 + 6 * SB)} L ${P(x + r * 0.5, yB - 4 * SB)} C ${P(x + r * 0.5, yB + 26 * SB)} ${P(x - r * 0.2, yB + 24 * SB)} ${P(x - r * 0.2, yB)}`, 3),
        manche(y0, yM), manche(yM, yB),
        // les deux clous, cachés : chacun entre dans le trou qui l'attend dans l'autre manche
        h.ligne(x - r * 0.45, yM - 30 * SB, x - r * 0.45, yM + 26 * SB, h.a.cache),
        h.ligne(x + r * 0.45, yM - 26 * SB, x + r * 0.45, yM + 30 * SB, h.a.cache),
        h.path(`M ${P(x - r, yB)} A ${P(r, e)} 0 0 0 ${P(x + r, yB)}`, h.a.arete),
        h.ellipse(x, y0, r, e, blanc(h.a.arete)),
        // le brin du haut : de la nuque, par-dessus l'épaule, jusqu'au bout du haut
        corde(`M ${P(...nuque)} C ${P(nuque[0] - 30 * SB, nuque[1] + 60 * SB)} ${P(x + 40 * SB, y0 - 90 * SB)} ${P(x, y0)}`, 3),
      ].join('\n');
    };
    const g = F.corps({ pose: DEBOUT, cote: 'gauche', echelle: SB, x: ox, y: oy, visage: false, objet: pics });
    const id = 'vue1501-porter';
    return { svg: [`<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`,
      `<g clip-path="url(#${id})">`, String(g), '</g>'].join('\n'), g, pic };
  };

  // ── 4 : de près, le pic dans le poing, la pointe vers la glace ──
  // La main : poing-manche-debout, retournée (la main gauche, l'avant-bras vers la droite, vers le coude) ; l'ancre est
  // un point du dessous de l'avant-bras, posé sur la glace au bord droit de la vue (l'avant-bras sort de la vue, coupé
  // par elle) ; tournée de 7° pour que le poing monte sur le pic.
  const vPoing = z => {
    const yG = z.h - 16;
    const ancre = [(5364.4 - 5362.7) / 539.9, (638.8 - 197.5) / 448.3];
    const m = F.mainStock({ id: 'poing-manche-debout', miroir: true, objet: false, taille: 140, ancre, x: z.l + 3, y: yG, angle: 7 });
    const o = m.objet, a = o.angle * Math.PI / 180, k = m.echelle;
    const u = [Math.cos(a), Math.sin(a)], n = [-u[1], u[0]];          // l'axe du manche (vers le bas), sa normale
    const at = (t, q = 0) => [o.x + u[0] * t + n[0] * q, o.y + u[1] * t + n[1] * q];
    // le manche dépasse du poing d'un peu plus d'un centimètre (le haut du poing est à 300 dans le fichier)
    const r = o.largeur / 2, t0 = (255 - 327.3) * k, t1 = (600 - 327.3) * k;
    const rotN = o.angle + 90, arriere = 0;
    // le clou : du dedans du poing jusque dans la glace ; la partie plantée, en tireté
    const tG = (yG - o.y) / u[1], rc = 3.2, tPointe = tG + 24;
    const clouVu = [at(t1, -rc), at(tG, -rc), at(tG, rc), at(t1, rc)];
    const clouCache = [at(tG, -rc), at(tPointe - 8, -rc), at(tPointe, 0), at(tPointe - 8, rc), at(tG, rc)];
    const id = 'vue1501-poing';
    return { svg: [
      h.rect(0, yG, z.l, z.h - yG, h.a.blanc), h.ligne(0, yG, z.l, yG, h.a.contour),
      `<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`,
      h.chemin([at(t0, -r), at(t1, -r), at(t1, r), at(t0, r)], blanc(h.a.contour), true),
      // le bout du manche, vu un peu de haut : l'ellipse, son bord arrière au trait du contour, le trou du cordon
      h.path(`M ${P(...at(t0, -r))} A ${P(r, r * 0.32)} ${rotN.toFixed(1)} 0 1 ${P(...at(t0, r))} A ${P(r, r * 0.32)} ${rotN.toFixed(1)} 0 1 ${P(...at(t0, -r))} Z`, blanc(h.a.arete)),
      h.path(`M ${P(...at(t0, -r))} A ${P(r, r * 0.32)} ${rotN.toFixed(1)} 0 ${arriere} ${P(...at(t0, r))}`, h.a.contour),
      h.ellipse(...at(t0, 0), 2.6, 1.2, h.a.plein),
      corde(`M ${P(...at(t0, 0))} C ${P(...at(t0 - 16, 1))} ${P(o.x + 20, at(t0 - 18, 0)[1])} ${P(o.x + 50, at(t0 - 12, 0)[1])} S ${P(o.x + 110, at(t0 + 6, 0)[1])} ${P(z.l + 4, at(t0 + 2, 0)[1])}`, 4),
      h.chemin(clouVu, blanc(h.a.contour), true),
      h.chemin(clouCache, h.a.cache),
      String(m), '</g>'].join('\n'), m, o, yG, at, tG };
  };

  return {
    ref: '15-01',
    titre: 'Sortir d’un trou dans la glace',
    desc: 'Six vues, dans l’ordre des gestes. Avant d’aller sur la glace, la paire de pics, la pointe de l’une rentrée dans l’autre, pend au cou par-dessus le manteau, au milieu de la poitrine. Dans l’eau, on se tourne vers le côté d’où l’on vient et on pose les avant-bras à plat sur la glace. De près, le pic tenu au poing, la pointe vers la glace. On plante les pics près du bord, on bat des jambes jusqu’à ce que le corps soit à l’horizontale, on tire en glissant sur le ventre et on replante plus loin. Vu de dessus, sorti, on roule loin du trou vers ses traces, sans se relever : cinq positions successives, un quart de tour chacune, la flèche vers les traces de bottes de l’aller.',
    format: 'pleine',
    disposition: [['porter', 'eau'], ['poing', 'jambes'], ['tirer', 'dessus']],
    hauteurs: [246, 170, 234],
    vues: {
      porter: {
        titre: 'Avant d’aller sur la glace',
        dessin: z => vPorter(z).svg,
        renvois: z => { const p = vPorter(z).pic; return [
          { n: 1, rond: [p.x - 15 * SB - 64, p.y + p.L * 0.42], cible: [p.x - 15 * SB - 1, p.y + p.L * 0.42], texte: 'porter les pics au cou, par-dessus le manteau' },
        ]; },
      },
      eau: {
        dessin: z => vEau(z).svg,
        renvois: z => { const v = vEau(z), A = v.g.articulations; return [
          { n: 2, rond: [v.anneau[0] + 58, 14], cible: [v.anneau[0] + 23, v.anneau[1] + 1], texte: 'se tourner vers le côté d’où l’on vient' },
          { n: 3, rond: [22, v.yG + 44], cible: [A.coudeP[0] - 14, v.yG - 1], texte: 'poser les avant-bras à plat sur la glace' },
        ]; },
      },
      poing: {
        titre: 'Le pic, de près',
        dessin: z => vPoing(z).svg,
        renvois: z => { const v = vPoing(z), c = v.at(v.tG - 8, 4); return [
          { n: 4, rond: [c[0] - 60, c[1] - 6], cible: [c[0] - 6, c[1]], texte: 'tenir le pic au poing, la pointe vers la glace' },
        ]; },
      },
      jambes: {
        dessin: z => vJambes(z).svg,
        renvois: z => { const v = vJambes(z); return [
          { n: 5, rond: [18, v.yG + 46], cible: [v.mP.x - 7, v.yG + 6], texte: 'planter les pics près du bord' },
          { n: 6, rond: [Math.min(z.l - 12, v.pd[0] + 34), Math.min(z.h - 12, v.pd[1] + 34)], cible: [v.pd[0] + 16, v.pd[1] + 12], texte: 'battre des jambes pour mettre le corps à plat' },
        ]; },
      },
      tirer: {
        dessin: z => vTirer(z).svg,
        renvois: z => { const v = vTirer(z), A = v.g.articulations; return [
          { n: 7, rond: [A.hancheP[0] + 58, v.yF], cible: [A.hancheP[0] + 32, v.yF], texte: 'tirer en glissant sur le ventre, replanter plus loin' },
        ]; },
      },
      dessus: {
        titre: 'Vu de dessus',
        dessin: z => vDessus(z).svg,
        renvois: z => { const v = vDessus(z); return [
          { n: 8, rond: [v.xF + 34, z.h - 11], cible: [v.xF + 3, v.ys[4] + 14], texte: 'rouler vers ses traces, sans se relever' },
        ]; },
      },
    },
  };
};
