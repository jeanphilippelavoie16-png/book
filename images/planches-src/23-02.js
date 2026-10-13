// Planche 23-02 — retourner et gratter un boyau (chapitre 42, section 4).
module.exports = (h) => {
  // ── outils de géométrie ──────────────────────────────────────────────────────────────
  const f = n => (+n).toFixed(1);
  const D = (pts, ferme) => 'M ' + pts.map(p => f(p[0]) + ' ' + f(p[1])).join(' L ') + (ferme ? ' Z' : '');
  const bez = (a, b, c, d, n = 48) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [0, 1].map(k => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]);
  });
  const droite = (a, b, n = 24) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
  const arc = (cx, cy, r, a0, a1, n = 24) => Array.from({ length: n + 1 }, (_, i) => {
    const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const suite = (...morceaux) => morceaux.reduce((acc, m) => acc.concat(acc.length ? m.slice(1) : m), []);
  const normales = pts => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    return [-dy / L, dx / L];
  });
  // décale une ligne de centre ; r peut être une fonction de t (0 → 1)
  const decale = (pts, r) => {
    const N = normales(pts);
    return pts.map((p, i) => {
      const d = typeof r === 'function' ? r(i / (pts.length - 1)) : r;
      return [p[0] + N[i][0] * d, p[1] + N[i][1] * d];
    });
  };
  // petits traits perpendiculaires tous les `pas` : la muqueuse, velue
  const poils = (pts, sens, long, pas, attrs = h.a.detail) => {
    const N = normales(pts);
    let acc = pas / 2, out = [];
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      let s = 0;
      while (acc <= L - s) {
        s += acc; acc = pas;
        const t = s / L, x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
        const n = N[i];
        out.push(`M ${f(x)} ${f(y)} L ${f(x + n[0] * sens * long)} ${f(y + n[1] * sens * long)}`);
      }
      acc -= (L - s);
    }
    return h.path(out.join(' '), attrs);
  };
  const ovale = (cx, cy, rx, ry, deg, attrs) => h.path(D(Array.from({ length: 36 }, (_, i) => {
    const a = i / 36 * 2 * Math.PI, r = deg * Math.PI / 180, x = rx * Math.cos(a), y = ry * Math.sin(a);
    return [cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)];
  }), true), attrs);
  const FOND = h.a.blanc.match(/fill="[^"]*"/)[0];
  const plein = attrs => attrs.replace('fill="none"', FOND);

  // ── vue 1 : vider (600 × 118) ────────────────────────────────────────────────────────
  const MC_COTE = 'gauche', MC_ANGLE = -90;
  const pince = [300, 40], MAIN_ANGLE = -30;
  const plat = bez([22, 48], [110, 30], [215, 48], pince);
  const gras = bez(pince, [370, 35], [450, 49], [520, 41], 60);
  const rPlat = 1.3, rRuban = t => 3 - 1.7 * Math.pow(Math.max(0, (t - 0.8) / 0.2), 2);
  const rGras = t => { const m = Math.min(1, t / 0.14), s = m * m * (3 - 2 * m); return rPlat + s * (10 + 2 * Math.sin(t * 23)); };
  const boyauVide = () => {
    const hautP = decale(plat, t => -rRuban(t)), basP = decale(plat, rRuban);
    const hautG = decale(gras, t => -rGras(t)), basG = decale(gras, rGras);
    const contour = suite(hautP, hautG).concat(basG.slice().reverse(), basP.slice().reverse());
    const rFin = rGras(1);
    return [
      h.path(D(contour, true), plein(h.a.contour)),
      h.ellipse(520, 41, 4.5, f(rFin), plein(h.a.arete)),
    ].join('\n');
  };
  // la main pince le boyau entre la pulpe de l'index et celle du pouce, et glisse vers le bout
  // modèle s09 (le pouce et l'index qui pincent, de côté) en miroir : le boyau passe entre les deux
  // pulpes, la main derrière la partie déjà vidée, l'avant-bras qui descend à gauche
  const mainVide = z => boyauVide() + '\n' + h.formes.modele('s09', { x: pince[0], y: pince[1], ancre: [17, 66], miroir: true, angle: MAIN_ANGLE,
    echelle: 1.1, masquer: [[200, 0, 230, 125]], bras: { a: [200, 64.1], a0: [185, 63.9], b: [200, 112.1], b0: [185, 108.4], bord: z } });
  const crottes = [
    h.path('M 530 67 C 536 64 541 68 539 73 C 537 78 530 77 529 72 Z', h.a.arete),
    h.path('M 540 85 C 545 83 548 87 546 91 C 543 94 538 92 538 88 Z', h.a.arete),
    h.path('M 534 102 C 538 100 541 103 539 106 C 537 109 533 107 533 104 Z', h.a.arete),
  ].join('\n').replace(/^/, '<g transform="translate(0 -22)">') + '</g>';

  // ── vue 2 : retourner, en coupe (600 × 237) ──────────────────────────────────────────
  const y0 = 92, xP = 110, rB = 10, xB = 320, rI = 16, rE = 27;
  const baton = [
    h.path(`M 15 ${y0 - rB} L ${xB} ${y0 - rB} A ${rB} ${rB} 0 0 1 ${xB} ${y0 + rB} L 15 ${y0 + rB}`, plein(h.a.arete)),
    h.path(`M 15 ${y0 - rB} C 11 ${y0 - 4} 19 ${y0 + 4} 15 ${y0 + rB}`, h.a.arete),
    h.path(`M 28 ${y0 - 3} L 150 ${y0 - 3} M 172 ${y0 - 3} L 296 ${y0 - 3} M 44 ${y0 + 4} L 238 ${y0 + 4}`, h.a.detail),
  ].join('\n');
  // couche intérieure : déjà retournée, muqueuse dehors ; elle coiffe le bout du bâton
  const interieur = suite(droite([xP, y0 - rI], [xB, y0 - rI], 40), arc(xB, y0, rI, -90, 90, 30), droite([xB, y0 + rI], [xP, y0 + rI], 40));
  // couche extérieure : encore à l'endroit, muqueuse dedans ; elle continue en boyau vide
  const centre = suite(droite([xP, y0], [375, y0], 40), bez([375, y0], [450, y0], [505, y0 + 12], [545, y0 + 60], 50));
  const rExt = t => { const x = t * (centre.length - 1) <= 40 ? 0 : (t * (centre.length - 1) - 40) / 50; return rE - 5 * x; };
  const extHaut = decale(centre, t => -rExt(t)), extBas = decale(centre, rExt);
  const pliHaut = arc(xP, y0 - (rE + rI) / 2, (rE - rI) / 2, -90, -270, 16);
  const pliBas = arc(xP, y0 + (rE + rI) / 2, (rE - rI) / 2, 90, 270, 16);
  const cibleReste = extHaut[62];

  // ── vue 3 : gratter (346 × 194) ─────────────────────────────────────────────────────
  const c = t => [75 + 195 * t, 172 - 110 * t];                       // axe du boyau
  const tk = 0.3, yk = c(tk)[1];                                     // où racle le dos du couteau
  const bord = (t, d) => [c(t)[0] + d, c(t)[1]];
  const fil = [30, 44, 58, 70, 81, 96, 110, 124].map(x0 => {
    const a = [x0, 172], b = [x0 + 195, 62], m = [(a[0] + b[0]) / 2 + (x0 % 3 - 1) * 2, (a[1] + b[1]) / 2];
    return h.path(`M ${f(a[0])} ${a[1]} Q ${f(m[0])} ${f(m[1])} ${f(b[0])} ${b[1]}`, h.a.detail);
  }).join('\n');
  const planche = [
    h.path('M 15 172 L 135 172 L 330 62 L 210 62 Z', plein(h.a.arete)),
    fil,
    h.path('M 15 172 L 135 172 L 135 188 L 15 188 Z', plein(h.a.arete)),
    h.path('M 32 188 Q 75 168 118 188 M 46 188 Q 75 175 104 188 M 60 188 Q 75 181 90 188', h.a.detail),
    h.path('M 135 172 L 330 62 L 330 78 L 135 188 Z', plein(h.a.arete)),
    h.path('M 140 180 L 326 75', h.a.detail),
    h.path('M 15 188 L 15 172 L 210 62 L 330 62 L 330 78 L 135 188 Z', h.a.contour),
  ].join('\n');
  const aGratter = [bord(0.06, -20), bord(0.06, 20), bord(tk, 20), bord(tk, -20)];
  const gratte = [bord(tk, -20), bord(tk, 20), bord(0.94, 20), bord(0.94, -20)];
  const boyauPlat = [
    h.path(D(aGratter, true), plein(h.a.arete)),
    h.path(D(aGratter, true), h.a.hachure('neige', 'aucun')),
    h.path(D(gratte, true), h.a.fin),
    h.path(`M ${D([bord(0.06, -20), bord(0.94, -20)]).slice(2)} M ${D([bord(0.06, 20), bord(0.94, 20)]).slice(2)}`, h.a.arete),
    h.path(D([bord(0.06, -20), bord(0.06, 20)]), h.a.arete),
    h.path(D([bord(0.94, -20), bord(0.94, 20)]), h.a.arete),
  ].join('\n');
  const xs = c(tk)[0];
  const tas = h.path(`M ${f(xs - 15)} ${f(yk)} C ${f(xs - 18)} ${f(yk + 5)} ${f(xs - 12)} ${f(yk + 9)} ${f(xs - 6)} ${f(yk + 7)}`
    + ` C ${f(xs - 2)} ${f(yk + 10)} ${f(xs + 5)} ${f(yk + 10)} ${f(xs + 8)} ${f(yk + 7)}`
    + ` C ${f(xs + 13)} ${f(yk + 8)} ${f(xs + 17)} ${f(yk + 4)} ${f(xs + 15)} ${f(yk)} Z`, plein(h.a.arete));
  const xPointe = xs - 39, xTalon = xs + 49;
  const couteau = [
    h.path(`M ${f(xPointe)} ${f(yk)} L ${f(xTalon)} ${f(yk)} L ${f(xTalon)} ${f(yk - 22.5)} Q ${f(xs - 15)} ${f(yk - 22)} ${f(xPointe)} ${f(yk)} Z`, plein(h.a.arete)),
    h.path(`M ${f(xTalon + 8)} ${f(yk - 18)} L ${f(xTalon + 76)} ${f(yk - 18)} Q ${f(xTalon + 84)} ${f(yk - 9.5)} ${f(xTalon + 76)} ${f(yk - 1)} L ${f(xTalon + 8)} ${f(yk - 1)} Z`, plein(h.a.arete)),
    // le biseau, en haut : le fil est en l'air, c'est le dos qui porte sur le boyau
    h.path(`M ${f(xTalon)} ${f(yk - 18.5)} Q ${f(xs - 12)} ${f(yk - 18)} ${f(xPointe + 8)} ${f(yk)}`, h.a.fin),
    h.rect(f(xTalon), f(yk - 23.5), 8, 24.5, plein(h.a.arete)),
    h.cercle(f(xTalon + 30), f(yk - 9.5), 1.8, h.a.detail),
    h.cercle(f(xTalon + 60), f(yk - 9.5), 1.8, h.a.detail),
    h.ligne(f(xPointe), f(yk), f(xTalon), f(yk), h.a.contour),
  ].join('\n');

  // la main tient le manche par-dessus, le poing fermé, le pouce couché vers la lame
  // modèle s11 (poing fermé, vu de la paume) retourné : le manche passe dans le poing, le pouce du
  // côté de la lame, l'avant-bras qui monte et sort du cadre
  const mainCouteau = z => h.formes.modele('s11', { x: xTalon + 41, y: yk - 9.5, ancre: [68, 42], angle: 180, echelle: 0.56, masquer: [[0, 150, 140, 175]],
    bras: { a: [21.8, 150], a0: [20.8, 135], b: [76.3, 150], b0: [76.2, 135], bord: z } });
  // ── vue 4 : saler (231 × 194) ───────────────────────────────────────────────────────
  const pot = [
    h.path('M 53 72 Q 115 62 177 72 L 177 174 L 53 174 Z', h.a.hachure('gravier', 'aucun')),
    ...[[76, 92, -8], [114, 90, 6], [153, 94, -4], [95, 111, 10], [136, 113, -6], [72, 131, 4], [114, 133, -10], [156, 130, 8], [94, 153, -4], [137, 154, 6]]
      .map(([x, y, a]) => ovale(x, y + 6, 11, 3.8, a, plein(h.a.arete))),
    h.path('M 53 72 Q 115 62 177 72', h.a.arete),
    h.path('M 45 58 L 45 182 L 185 182 L 185 58 L 177 58 L 177 174 L 53 174 L 53 58 Z', h.a.hachure('metal', 'contour')),
  ].join('\n');
  // le bout sort du sel et retombe dessus, dans le pot : rien ne pend par-dessus le bord
  // (un boyau mouillé passé sur le rebord tire la saumure dehors comme une mèche)
  const queue = bez([96, 67], [102, 53], [146, 51], [166, 65.5], 30);
  const bout = [
    h.path(D(decale(queue, -3.5)), h.a.arete),
    h.path(D(decale(queue, 3.5)), h.a.arete),
    ovale(166, 65.5, 3.6, 1.7, 126, plein(h.a.arete)),   // le bout ouvert : c'est un tube
  ].join('\n');

  return {
    ref: '23-02',
    titre: 'Retourner et gratter un boyau',
    desc: 'On vide le boyau en le faisant glisser entre deux doigts ; on plie son bout sur le bout d’un bâton lisse et on pousse : le boyau passe dans le pli et se retourne, la muqueuse dehors. On la gratte au dos du couteau sur une planche mouillée jusqu’à ce que le boyau soit mince et translucide, puis on l’enterre dans le sel sec.',
    format: 'pleine',
    disposition: [['vider'], ['retourner'], ['gratter', 'saler']],
    hauteurs: [1.6, 1.8, 1.95],
    largeurs: [[1], [1], [3, 2]],
    vues: {
      vider: {
        titre: 'Vider',
        dessin: z => [mainVide(z), crottes, h.fleche('M 380 85 L 460 85')].join('\n'),
        renvois: z => [
          { n: 1, rond: [400, 118], cible: [300, 54], texte: 'deux doigts serrés qu’on fait glisser' },
        ],
      },
      retourner: {
        titre: 'Retourner, en coupe',
        dessin: z => [
          baton,
          h.path(D(interieur), h.a.contour),
          poils(interieur, -1, 3.5, 5),
          h.path(`M ${D(extHaut).slice(2)} M ${D(extBas).slice(2)}`, h.a.contour),
          poils(extHaut, 1, 3.5, 5),
          poils(extBas, -1, 3.5, 5),
          h.path(D(pliHaut), h.a.contour),
          h.path(D(pliBas), h.a.contour),
          h.path(D(arc(xB, y0, 12.8, -55, 55, 12)), h.a.detail),
          h.fleche(`M 22 ${y0 - 33} L 82 ${y0 - 33}`),
          h.fleche(`M 300 ${y0 - 49} L 205 ${y0 - 49}`),
        ].join('\n'),
        renvois: z => [
          { n: 2, rond: [362, y0], cible: [xB + rI + 1.2, y0], texte: 'bout plié, coiffé sur le bâton' },
          { n: 3, rond: [60, y0 - 58], cible: [106.1, +(y0 - 25.4).toFixed(1)], texte: 'ici le boyau se retourne' },
          { n: 4, rond: [230, y0 + 58], cible: [230, y0 + rI + 1.2], texte: 'muqueuse passée dehors' },
          { n: 5, rond: [490, y0 - 56], cible: [+f(cibleReste[0]), +f(cibleReste[1] - 1.2)], texte: 'le reste suit tout seul' },
        ],
      },
      gratter: {
        titre: 'Gratter',
        dessin: z => [planche, boyauPlat, tas, couteau, mainCouteau(z), h.fleche(`M ${f(c(0.26)[0] - 48)} ${f(c(0.26)[1])} L ${f(c(0.1)[0] - 48)} ${f(c(0.1)[1])}`)].join('\n'),
        renvois: z => [
          { n: 6, rond: [240, 168], cible: [+f(xs + 30), +f(yk + 1.2)], texte: 'dos du couteau qui racle' },
          { n: 7, rond: [40, 70], cible: [130.2, 107], texte: 'planche mouillée' },
          { n: 8, rond: [305, 26], cible: [+f(bord(0.9, 20)[0] + 0.7), +f(bord(0.9, 20)[1])], texte: 'raclé : mince et translucide' },
        ],
      },
      saler: {
        titre: 'Saler',
        dessin: z => pot,  // tout sous le sel : une couche de sel sans boyau par-dessus
        renvois: z => [
          { n: 9, rond: [26, 30], cible: [70, 69], texte: 'enterré dans le sel sec, en excès' },
        ],
      },
    },
  };
};
