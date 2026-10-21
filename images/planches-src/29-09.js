// Planche 29-09 — Le piège à glaires (ch. 29, §9, « La poire »).
// Un petit pot, un bouchon percé de deux trous, deux tubes fins et souples : le long descend
// jusqu'au fond du pot et son bout libre entre dans la bouche du bébé (100 mm au plus) ; le court
// s'arrête juste sous le bouchon et l'aide aspire par son autre bout. L'air file du bébé au pot
// puis du pot à l'aide ; les glaires, plus lourdes, tombent au fond.
// Seule mesure du chapitre : 10 cm au plus dans la bouche. Le pot et les tubes ne sont pas cotés.
//
// La charte : en coupe, l'intérieur du pot (sa paroi du fond, vue par la coupe) recule en gris loin ;
// le bouchon seul, un tronc de cône, a son flanc de droite à l'ombre sous la trame du liège. Le
// rouge : les deux tubes qu'on enfonce, et le cercle sur le bout du tube court, qui doit s'arrêter
// juste sous le bouchon. Les flèches de l'air restent noires.
module.exports = (h) => {
  const f = (v) => Math.round(v * 10) / 10;

  // Un tube souple vu de côté : son axe (['M', p] ['L', p] ['C', c1, c2, p]) échantillonné, puis
  // décalé de part et d'autre ; la forme est peinte en blanc et bordée d'un trait d'arête.
  const axe = (cmds) => {
    const pts = [];
    let p = null;
    for (const c of cmds) {
      if (c[0] === 'M') { p = c[1]; pts.push(p); continue; }
      if (c[0] === 'L') {
        const q = c[1], n = Math.max(2, Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / 6));
        for (let i = 1; i <= n; i++) pts.push([p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n]);
        p = q; continue;
      }
      const [, c1, c2, q] = c;
      for (let i = 1; i <= 30; i++) {
        const t = i / 30, u = 1 - t, k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
        pts.push([0, 1].map(j => k[0] * p[j] + k[1] * c1[j] + k[2] * c2[j] + k[3] * q[j]));
      }
      p = q;
    }
    return pts;
  };
  const tube = (cmds, ep = 7) => {
    const P = axe(cmds), r = ep / 2, g = [], d = [];
    P.forEach((p, i) => {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      g.push([p[0] + r * nx, p[1] + r * ny]); d.push([p[0] - r * nx, p[1] - r * ny]);
    });
    return h.chemin([...g, ...d.reverse()], h.a.arete.replace('fill="none"', 'fill="#FFFFFF"'), true);
  };

  // ── la coupe : repère ─────────────────────────────────────────────────────────────────
  // Y0 : le haut du col du pot. Le pot fait 96 de large et 156 de haut ; 100 mm = 160.
  const G = (z) => {
    const Y0 = z.h - 160;
    const cx = z.l - 150;
    return {
      Y0, cx,
      xL: cx - 10,                  // tube long, dans le pot
      xC: cx + 12,                  // tube court
      xt: cx - 150,                 // la descente du tube long, dehors
      finL: Y0 + 130,               // bout du tube long, près du fond
      finC: Y0 + 33,                // bout du tube court, juste sous le bouchon
      fond: Y0 + 153,               // le fond, dedans
      bout: Y0 + 156,               // le bout libre du tube long
      hautC: Y0 - 66,               // le tube court, dehors
    };
  };

  // Le verre en coupe : un U fermé, noir, le col ouvert en haut.
  const pot = (g) => {
    const { cx, Y0 } = g;
    const P = (x, y) => `${f(cx + x)} ${f(Y0 + y)}`;
    const d = [
      `M ${P(-25, 0)} L ${P(-32, 0)} L ${P(-32, 7)} L ${P(-29, 9)} L ${P(-29, 17)}`,
      `Q ${P(-48, 20)} ${P(-48, 36)} L ${P(-48, 148)} Q ${P(-48, 156)} ${P(-40, 156)}`,
      `L ${P(40, 156)} Q ${P(48, 156)} ${P(48, 148)} L ${P(48, 36)} Q ${P(48, 20)} ${P(29, 17)}`,
      `L ${P(29, 9)} L ${P(32, 7)} L ${P(32, 0)} L ${P(25, 0)} L ${P(25, 19)}`,
      `Q ${P(45, 22)} ${P(45, 39)} L ${P(45, 145)} Q ${P(45, 153)} ${P(37, 153)}`,
      `L ${P(-37, 153)} Q ${P(-45, 153)} ${P(-45, 145)} L ${P(-45, 39)} Q ${P(-45, 22)} ${P(-25, 19)} Z`,
    ].join(' ');
    return h.path(d, h.a.plein);
  };

  // Les glaires au fond : une flaque, et une goutte qui tombe du tube long.
  const glaires = (g) => {
    const { cx, Y0 } = g;
    const P = (x, y) => `${f(cx + x)} ${f(Y0 + y)}`;
    const flaque = `M ${P(-45, 145)} L ${P(45, 145)} Q ${P(45, 153)} ${P(37, 153)} L ${P(-37, 153)} Q ${P(-45, 153)} ${P(-45, 145)} Z`;
    const goutte = (x, y, r) => `M ${f(x)} ${f(y - r * 1.6)} C ${f(x + r)} ${f(y - r * 0.2)} ${f(x + r)} ${f(y + r)} ${f(x)} ${f(y + r)} C ${f(x - r)} ${f(y + r)} ${f(x - r)} ${f(y - r * 0.2)} ${f(x)} ${f(y - r * 1.6)} Z`;
    return [
      h.path(flaque, h.a.hachure('eau', 'aucun')),
      h.ligne(cx - 45, Y0 + 145, cx + 45, Y0 + 145, h.a.detail),
      h.path(goutte(g.xL, g.finL + 7, 2.6), h.a.plein),
    ].join('\n');
  };

  // Le bouchon en coupe : un tronc de cône, plus large en haut, enfoncé dans le col.
  const bouchon = (g) => {
    const { cx, Y0 } = g;
    return h.chemin([[cx - 27, Y0 - 14], [cx + 27, Y0 - 14], [cx + 22.5, Y0 + 22], [cx - 22.5, Y0 + 22]], h.a.hachure('bois', 'arete'), true);
  };

  const tubeLong = (g) => {
    const { xL, xt, Y0 } = g;
    return [['M', [xL, g.finL]], ['L', [xL, Y0 - 30]], ['C', [xL, Y0 - 78], [xt, Y0 - 78], [xt, Y0 - 30]], ['L', [xt, g.bout]]];
  };
  const tubeCourt = (g) => {
    const { xC, cx, Y0 } = g;
    return [['M', [xC, g.finC]], ['L', [xC, Y0 - 34]], ['C', [xC, Y0 - 58], [cx + 34, g.hautC], [cx + 62, g.hautC]], ['L', [cx + 132, g.hautC]]];
  };

  // ── le bouchon seul, de trois quarts ──────────────────────────────────────────────────
  const B = (z) => {
    const c = z.l / 2, yh = z.h - 92;   // centre de l'ellipse du dessus
    return { c, yh, rx: 46, ry: 14, yb: z.h - 26, rxb: 38, ryb: 11.5, t1: c - 16, t2: c + 16, ytube: z.h - 150 };
  };
  const vueBouchon = (z) => {
    const b = B(z);
    const { c, yh, rx, ry, yb, rxb, ryb } = b;
    const flanc = `M ${c - rx} ${yh} L ${c - rxb} ${yb} A ${rxb} ${ryb} 0 0 0 ${c + rxb} ${yb} L ${c + rx} ${yh} A ${rx} ${ry} 0 0 1 ${c - rx} ${yh} Z`;
    const out = [
      h.path(flanc, h.a.blanc),
      // le flanc de droite, à l'ombre, sous la trame du liège
      `<clipPath id="flanc-bouchon-2909"><path d="${flanc}" fill="#FFFFFF"/></clipPath>`,
      `<g clip-path="url(#flanc-bouchon-2909)">${h.rect(c + rx * 0.4, yh - ry, rx, yb + ryb - yh + ry + 2, h.a.ombre)}</g>`,
      h.path(flanc, h.a.hachure('neige', 'aucun')),
      h.path(`M ${c - rx} ${yh} L ${c - rxb} ${yb} A ${rxb} ${ryb} 0 0 0 ${c + rxb} ${yb} L ${c + rx} ${yh}`, h.a.contour),
      h.ellipse(c, yh, rx, ry, h.a.contour.replace('fill="none"', 'fill="#FFFFFF"')),
    ];
    // les deux trous, et chaque tube au-dessus du sien, prêt à entrer
    const ep = 11;
    for (const [x, fin] of [[b.t1, b.ytube], [b.t2, b.ytube]]) {
      out.push(h.ellipse(x, yh, ep / 2, ep / 2 * ry / rx * 1.6, h.a.plein));
      out.push(tube([['M', [x, b.ytube - 70]], ['L', [x, fin]]], ep));
      out.push(h.ligne(x, fin + 6, x, b.yh - 3, h.a.cache));
      out.push(h.path(`M ${f(x - ep / 2)} ${f(fin)} A ${ep / 2} ${f(ep / 2 * 0.45)} 0 0 0 ${f(x + ep / 2)} ${f(fin)}`, h.a.arete));
      out.push(h.ellipse(x, fin, ep / 2 - 0.7, f(ep / 2 * 0.45 - 0.4), h.a.detail));
    }
    // enfoncer : une flèche à côté de chaque tube, vers le bas
    out.push(h.geste(`M ${f(b.t1 - 20)} ${f(b.ytube - 36)} L ${f(b.t1 - 20)} ${f(b.ytube + 4)}`));
    out.push(h.geste(`M ${f(b.t2 + 20)} ${f(b.ytube - 36)} L ${f(b.t2 + 20)} ${f(b.ytube + 4)}`));
    return out.join('\n');
  };

  return {
    ref: '29-09',
    titre: 'Le piège à glaires',
    desc: 'À gauche, en coupe : un petit pot de verre fermé par un bouchon percé de deux trous. Deux tubes fins et souples traversent le bouchon. Le tube long descend presque jusqu’au fond du pot ; dehors, il remonte, passe par-dessus et redescend, et son bout entre dans la bouche du bébé, 100 millimètres au plus. Le tube court s’arrête juste sous le bouchon ; dehors, il part vers l’aide, qui aspire par son bout. L’air va du bébé au pot par le tube long, puis du pot à l’aide par le tube court ; une goutte de glaires tombe du tube long dans la flaque au fond du pot. À droite, le bouchon seul, vu de trois quarts, ses deux trous sur le dessus, et chaque tube au-dessus de son trou, dans son axe, prêt à y être enfoncé serré.',
    format: 'demi',
    disposition: [['coupe', 'bouchon']],
    largeurs: [[3, 2]],
    vues: {
      coupe: {
        titre: 'Monté, en coupe',
        dessin: z => {
          const g = G(z);
          const dedans = `M ${f(g.cx - 25)} ${f(g.Y0 + 19)} Q ${f(g.cx - 45)} ${f(g.Y0 + 22)} ${f(g.cx - 45)} ${f(g.Y0 + 39)} L ${f(g.cx - 45)} ${f(g.Y0 + 153)} L ${f(g.cx + 45)} ${f(g.Y0 + 153)} L ${f(g.cx + 45)} ${f(g.Y0 + 39)} Q ${f(g.cx + 45)} ${f(g.Y0 + 22)} ${f(g.cx + 25)} ${f(g.Y0 + 19)} Z`;
          return [
            h.path(dedans, h.a.loin),   // la paroi du fond, vue par la coupe
            pot(g),
            glaires(g),
            bouchon(g),
            tube(tubeLong(g)),
            tube(tubeCourt(g)),
            // l'air qui remonte du bout du tube long jusqu'au tube court
            h.fleche(`M ${g.cx + 1} ${f(g.finL - 4)} C ${g.cx + 10} ${f(g.Y0 + 100)} ${g.xC + 2} ${f(g.Y0 + 72)} ${g.xC} ${f(g.finC + 10)}`, h.a.cache),
            // le courant dans les tubes : monte du bébé, part vers l'aide
            h.fleche(`M ${g.xt - 16} ${f(g.Y0 + 70)} L ${g.xt - 16} ${f(g.Y0 + 20)}`),
            h.fleche(`M ${g.cx + 70} ${f(g.hautC - 14)} L ${g.cx + 120} ${f(g.hautC - 14)}`),
            h.cote(g.xt + 16, g.bout - 160, g.xt + 16, g.bout, '100 mm', { cote: 'droite' }),
            h.controle(g.xC, g.finC + 1, 11),   // le tube court s'arrête juste sous le bouchon
          ].join('\n');
        },
        renvois: z => {
          const g = G(z);
          return [
            { n: 1, rond: [g.cx + 72, g.Y0 + 110], cible: [g.cx + 48, g.Y0 + 100], texte: 'petit pot' },
            { n: 2, rond: [g.cx + 70, g.Y0 + 10], cible: [g.cx + 24, g.Y0 + 4], texte: 'bouchon traversé par les deux tubes' },
            { n: 3, rond: [g.xt - 24, g.bout - 14], cible: [g.xt - 3, g.bout - 4], texte: 'tube long, au plus 100 mm en bouche' },
            { n: 4, rond: [g.cx + 72, g.Y0 + 50], cible: [g.xC + 4, g.finC], texte: 'tube court, juste sous le bouchon' },
            { n: 5, rond: [g.cx + 132, g.hautC + 24], cible: [g.cx + 130, g.hautC + 4], texte: 'l’aide aspire par ce bout' },
            { n: 6, rond: [g.cx + 72, g.Y0 + 150], cible: [g.cx + 24, g.Y0 + 149], texte: 'les glaires tombent au fond' },
          ];
        },
      },
      bouchon: {
        titre: 'Le bouchon percé',
        dessin: vueBouchon,
        renvois: z => {
          const b = B(z);
          return [
            { n: 7, rond: [b.c + 58, b.yh - 30], cible: [b.t2 + 3, b.yh], texte: 'deux trous, serrés sur les tubes' },
            { n: 8, rond: [b.c - 58, b.ytube - 56], cible: [b.t1 - 6, b.ytube - 56], texte: 'tubes fins et souples, bouillis' },
          ];
        },
      },
    },
  };
};
