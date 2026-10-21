module.exports = (h) => {
  // Le sac : demi-largeur selon t (0 = ouverture en bas, 1 = col), courbe lisse.
  const demi = (t, bas, max, col) => t < 0.45
    ? bas + (max - bas) * (1 - Math.cos(Math.PI * t / 0.45)) / 2
    : max + (col - max) * (1 - Math.cos(Math.PI * (t - 0.45) / 0.55)) / 2;

  // Une perche : quadrilatère blanc cerné, d'un pied à un point, prolongé au-delà.
  const perche = (x1, y1, x2, y2, depasse, e) => {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const nx = -uy * e / 2, ny = ux * e / 2;
    const xe = x2 + ux * depasse, ye = y2 + uy * depasse;
    const p = [[x1 + nx, y1 + ny], [xe + nx, ye + ny], [xe - nx, ye - ny], [x1 - nx, y1 - ny]];
    return [h.chemin(p, h.a.blanc, true), h.chemin(p, h.a.arete, true)].join('\n');
  };

  const geo = z => {
    const W = z.l, H = z.h, cx = W / 2;
    const ay = 34;                       // sommet du trépied
    const gy = Math.round(H * 0.76);     // surface du sol
    const pb = H - 16;                   // fond du trou
    const ty = Math.round(gy - H * 0.19);// haut du conduit
    const sb = ty + 18;                  // bas du sac, qui coiffe le conduit
    const ny = Math.round(H * 0.25);     // col du sac
    const S = sb - ny;
    const pied = W * 0.44;
    return { W, H, cx, ay, gy, pb, ty, sb, ny, S, pied, tR: 24, tr: 12, pm: 16, pf: 44 };
  };
  const hw = (g, y) => demi((g.sb - y) / g.S, 27, 62, 9);
  const jambe = (g, y) => g.pied * (y - g.ay) / (g.gy - g.ay);

  const geoB = z => {
    const R = Math.min(46, z.l * 0.26), r = R * 0.5, x = z.l * 0.42;
    return { R, r, x, yA: z.h * 0.17, yB: z.h * 0.5, yC: z.h * 0.83, W: z.l };
  };

  return {
    ref: '102-07',
    titre: 'Le sac à fumer, sans fumoir',
    desc: 'La peau chamoisée cousue en sac, pendue à un trépied de perches, ouverture en bas coiffant un conduit fait d’une bûche creusée, planté sur un trou où couvent des braises sous du bois pourri ; une galerie en pente amène l’air au niveau des braises, la fumée monte par le conduit, tourne dans le sac et sort par le col resté ouvert, que la corde du trépied tient par deux brins. À droite, la bûche vue en bout : fendue en deux, chaque moitié creusée en gouttière, puis les deux moitiés refermées en conduit. L’encadré danger rappelle que le fumage se fait dehors, à cause du monoxyde de carbone.',
    format: 'pleine',
    disposition: [['coupe', 'bout']],
    largeurs: [[5, 2]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: z => {
          const g = geo(z), { W, H, cx, ay, gy, pb, ty, sb, ny, S, tR, tr, pm, pf } = g;
          const o = [];
          // Terre et trou en cloche
          const trou = [[cx - pm, gy], [cx - pf, gy + 30], [cx - pf, pb - 6], [cx - pf + 8, pb], [cx + pf - 8, pb], [cx + pf, pb - 6], [cx + pf, gy + 30], [cx + pm, gy]];
          o.push(h.chemin([[8, gy], ...trou, [W - 8, gy], [W - 8, H - 2], [8, H - 2]], h.a.hachure('terre', 'detail'), true));
          // Prise d'air : une galerie en pente qui descend au niveau des braises (sans elle, le
          // conduit bouche le trou et le feu s'étouffe)
          const px = cx + pf, a1 = pb - 34, a2 = pb - 14, m1 = px + 80, m2 = px + 98;
          o.push(h.chemin([[px - 2, a1], [m1, gy], [m2, gy], [px - 2, a2]], h.a.blanc, true));
          o.push(h.chemin([[px, a1], [m1, gy]], h.a.arete));
          o.push(h.chemin([[px, a2], [m2, gy]], h.a.arete));
          o.push(h.chemin([[8, gy], [cx - pm, gy]], h.a.arete));
          o.push(h.chemin([[cx + pm, gy], [m1, gy]], h.a.arete));
          o.push(h.chemin([[m2, gy], [W - 8, gy]], h.a.arete));
          o.push(h.chemin(trou.slice(0, 6).concat([[px, a2]]), h.a.arete));
          o.push(h.chemin([[px, a1], ...trou.slice(6)], h.a.arete));
          o.push(h.fleche(`M ${m2 + 8} ${gy - 16} L ${px - 6} ${(a1 + a2) / 2 + 5}`, h.a.cache));
          {
            // Pointe pleine sur le tireté, tournée vers les braises
            const x0 = m2 + 8, y0 = gy - 16, x1 = px + 6, y1 = (a1 + a2) / 2 - 1;
            const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L;
            const bx = x1 - ux * 11, by = y1 - uy * 11;
            o.push(h.chemin([[x1, y1], [bx - uy * 5, by + ux * 5], [bx + uy * 5, by - ux * 5]], h.a.plein, true));
          }
          // Braises au fond
          for (let i = 0; i < 7; i++) o.push(h.ellipse(cx - 36 + i * 12, pb - 6, 5.2, 4.2, h.a.plein));
          for (let i = 0; i < 6; i++) o.push(h.ellipse(cx - 30 + i * 12, pb - 14, 5, 3.8, h.a.plein));
          // Bois pourri par-dessus
          const bouts = [
            [[cx - 40, pb - 20], [cx - 37, pb - 36], [cx - 14, pb - 38], [cx - 15, pb - 20]],
            [[cx - 12, pb - 21], [cx - 7, pb - 40], [cx + 15, pb - 37], [cx + 12, pb - 20]],
            [[cx + 15, pb - 20], [cx + 18, pb - 34], [cx + 40, pb - 33], [cx + 40, pb - 20]],
            [[cx - 22, pb - 40], [cx - 17, pb - 53], [cx + 6, pb - 51], [cx + 3, pb - 40]],
          ];
          for (const b of bouts) {
            o.push(h.chemin(b, h.a.hachure('bois'), true));
            o.push(h.chemin(b, h.a.arete, true));
          }
          // Trépied (deux perches vues de côté) et ligature
          o.push(perche(cx - g.pied, gy, cx, ay, 22, 7));
          o.push(perche(cx + g.pied, gy, cx, ay, 22, 7));
          for (let k = -1; k <= 1; k++) o.push(h.ligne(cx - 7, ay + k * 4 - 2, cx + 7, ay + k * 4 + 2, h.a.detail));
          // Corde du sommet au col : elle se fend en deux brins pris dans la ligature, le col reste ouvert
          const dc = hw(g, ny + 4) + 1;
          o.push(h.chemin([[cx - dc, ny + 3], [cx, ny - 24], [cx + dc, ny + 3]], h.a.arete));
          o.push(h.ligne(cx, ay + 6, cx, ny - 24, h.a.arete));
          // Sac : fond blanc (cache les perches), puis conduit, puis parois
          const gauche = [], droite = [];
          for (let i = 0; i <= 40; i++) {
            const y = sb - S * i / 40, d = hw(g, y);
            gauche.push([cx - d, y]); droite.push([cx + d, y]);
          }
          o.push(h.chemin([...gauche, ...droite.slice().reverse()], h.a.blanc, true));
          // charte : le dedans du sac, vu en coupe, en gris loin ; le haut du conduit reste blanc
          {
            const sac = [...gauche, ...droite.slice().reverse()].map((p, i) => `${i ? 'L' : 'M'}${Math.round(p[0] * 10) / 10} ${Math.round(p[1] * 10) / 10}`).join(' ') + ' Z';
            o.push(`<path d="${sac} M${cx - tR} ${ty} L${cx + tR} ${ty} L${cx + tR} ${sb} L${cx - tR} ${sb} Z" ${h.a.loin} fill-rule="evenodd"/>`);
          }
          // Conduit : bûche creusée, deux parois en coupe
          o.push(h.rect(cx - tR, ty, tR - tr, gy - ty, h.a.hachure('bois')));
          o.push(h.rect(cx + tr, ty, tR - tr, gy - ty, h.a.hachure('bois')));
          o.push(h.rect(cx - tR, ty, tR - tr, gy - ty, h.a.arete));
          o.push(h.rect(cx + tr, ty, tR - tr, gy - ty, h.a.arete));
          // Deux ligatures qui tiennent les moitiés refermées
          for (const yl of [ty + 36, gy - 26]) for (let k = 0; k < 3; k++) {
            o.push(h.cercle(cx - tR - 2.5, yl + k * 4, 2, h.a.plein));
            o.push(h.cercle(cx + tR + 2.5, yl + k * 4, 2, h.a.plein));
          }
          o.push(h.chemin(gauche, h.a.contour));
          o.push(h.chemin(droite, h.a.contour));
          // Coutures sur les côtés
          for (let i = 4; i <= 34; i += 3) {
            const y = sb - S * i / 40, d = hw(g, y);
            o.push(h.ligne(cx - d - 4, y, cx - d + 4, y, h.a.detail));
            o.push(h.ligne(cx + d - 4, y, cx + d + 4, y, h.a.detail));
          }
          // Col lié : la corde en coupe
          for (let k = 0; k < 3; k++) {
            const y = ny + 4 + k * 4, d = hw(g, y);
            o.push(h.cercle(cx - d - 2.5, y, 2, h.a.plein));
            o.push(h.cercle(cx + d + 2.5, y, 2, h.a.plein));
          }
          // Trajet de la fumée
          o.push(h.fleche(`M ${cx - 12} ${pb - 56} C ${cx - 20} ${gy + 6}, ${cx + 5} ${gy - 30}, ${cx - 1} ${ty - 14}`, h.a.cache));
          o.push(h.fleche(`M ${cx - 3} ${ty - 22} C ${cx - 52} ${ty - 44}, ${cx - 60} ${ny + 96}, ${cx - 20} ${ny + 56}`, h.a.cache));
          o.push(h.fleche(`M ${cx + 3} ${ty - 22} C ${cx + 52} ${ty - 44}, ${cx + 60} ${ny + 96}, ${cx + 20} ${ny + 56}`, h.a.cache));
          o.push(h.fleche(`M ${cx + 3} ${ny + 26} C ${cx + 4} ${ny + 6}, ${cx + 8} ${ny - 10}, ${cx + 26} ${ny - 28}`, h.a.cache));
          return o.join('\n');
        },
        renvois: z => {
          const g = geo(z), { cx, gy, pb, sb, tR } = g;
          const y4 = sb - g.S * 0.28;
          return [
            { n: 1, rond: [cx + 100, pb - 4], cible: [cx + 41, pb - 6], texte: 'lit de braises au fond du trou' },
            { n: 2, rond: [cx - 100, pb - 32], cible: [cx - 38, pb - 30], texte: 'bois pourri sec par-dessus' },
            { n: 3, rond: [cx - 92, gy - 52], cible: [cx - tR, gy - 52], texte: 'bûche creusée, ou tuyau de poêle' },
            { n: 4, rond: [cx - (hw(g, y4) + jambe(g, y4)) / 2 - 4, y4], cible: [cx - hw(g, y4) - 2, y4], texte: 'peau cousue en sac, côtés étanches' },
            { n: 5, rond: [cx + 88, sb + 16], cible: [cx + 28, sb + 1], texte: 'ouverture en bas, sur le conduit' },
            { n: 9, rond: [cx + g.pf + 112, gy + 30], cible: [cx + g.pf + 50, (pb - 24 + gy) / 2], texte: 'prise d’air, au niveau des braises' },
          ];
        },
      },
      bout: {
        titre: 'La bûche, en bout',
        dessin: z => {
          const { R, r, x, yA, yB, yC } = geoB(z);
          const o = [];
          // A : la bûche entière, fendue
          const disque = `M ${x + R} ${yA} A ${R} ${R} 0 1 0 ${x - R} ${yA} A ${R} ${R} 0 1 0 ${x + R} ${yA} Z`;
          o.push(h.path(disque, h.a.hachure('bois')));
          o.push(h.path(disque, h.a.contour));
          o.push(h.chemin([[x - R, yA], [x - R * 0.6, yA - 2], [x - R * 0.2, yA + 2], [x + R * 0.2, yA - 2], [x + R * 0.6, yA + 2], [x + R, yA]], h.a.arete));
          // B : une moitié, creusée en gouttière (face fendue en haut)
          const gout = `M ${x - R} ${yB} A ${R} ${R} 0 0 0 ${x + R} ${yB} L ${x + r} ${yB} A ${r} ${r} 0 0 1 ${x - r} ${yB} Z`;
          o.push(h.path(gout, h.a.hachure('bois')));
          o.push(h.path(gout, h.a.contour));
          // C : les deux moitiés refermées
          const anneau = `M ${x + R} ${yC} A ${R} ${R} 0 1 0 ${x - R} ${yC} A ${R} ${R} 0 1 0 ${x + R} ${yC} Z M ${x + r} ${yC} A ${r} ${r} 0 1 1 ${x - r} ${yC} A ${r} ${r} 0 1 1 ${x + r} ${yC} Z`;
          o.push(h.path(anneau, h.a.hachure('bois')));
          o.push(h.path(anneau, h.a.contour));
          o.push(h.ligne(x - R, yC, x - r, yC, h.a.arete));
          o.push(h.ligne(x + r, yC, x + R, yC, h.a.arete));
          return o.join('\n');
        },
        renvois: z => {
          const { R, r, x, yA, yB, yC, W } = geoB(z);
          return [
            { n: 6, rond: [W - 14, yA - 22], cible: [x + R + 1, yA], texte: 'fendre la bûche en deux' },
            { n: 7, rond: [x, yB - 34], cible: [x, yB + r - 1], texte: 'creuser chaque moitié en gouttière' },
            { n: 8, rond: [W - 14, yC - 22], cible: [x + R + 1, yC], texte: 'moitiés refermées en conduit' },
          ];
        },
      },
    },
    danger: 'Dehors, toujours. Un feu qui couve sous un abri fait du monoxyde de carbone : ni odeur ni couleur, on s’endort au lieu de sortir.',
  };
};
