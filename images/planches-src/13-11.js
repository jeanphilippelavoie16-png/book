// Planche 13-11 (petite planche, une colonne). La lentille de glace : le disque bombé des deux côtés, poli à la
// paume nue ; puis tenu face au soleil, les mains calées sur un appui, le point de lumière sur une cible sombre.
// Le texte : section « Le soleil, sans loupe » et étapes 22 à 24.
//
// Mains : les moteurs validés seulement (brief-agent.md).
//   la paume qui polit   mainSimple 'plat', vue 'pouce' (de profil), à plat sur le disque ;
//   la main qui tient    mainSimple 'coupe-c', vue 'dos' : la main en C autour du bord du disque.
// Aucune cote : « large comme la main » se lit par la main posée dessus.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1311"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-${id}-1311)">\n${svg}\n</g>`;

  // La lentille vue par la tranche : deux arcs, plus épaisse au centre, mince au bord. c : le centre ; ax : la
  // direction du diamètre (unitaire) ; D : le diamètre ; ep : l'épaisseur au centre.
  const lentille = (c, ax, D, ep) => {
    const n = [-ax[1], ax[0]], a = add(c, mul(ax, -D / 2)), b = add(c, mul(ax, D / 2));
    const h1 = add(c, mul(n, -ep)), h2 = add(c, mul(n, ep));
    const d = `M ${f(a[0])} ${f(a[1])} Q ${f(h1[0])} ${f(h1[1])} ${f(b[0])} ${f(b[1])} Q ${f(h2[0])} ${f(h2[1])} ${f(a[0])} ${f(a[1])} Z`;
    // deux reflets courts : la glace est claire
    const r1 = [add(add(c, mul(ax, -D * 0.22)), mul(n, -ep * 0.28)), add(add(c, mul(ax, -D * 0.06)), mul(n, -ep * 0.36))];
    const r2 = [add(add(c, mul(ax, -D * 0.16)), mul(n, -ep * 0.02)), add(add(c, mul(ax, -D * 0.02)), mul(n, -ep * 0.1))];
    return [h.path(d, blanc(A.contour)), h.chemin(r1, A.detail), h.chemin(r2, A.detail)].join('\n');
  };

  // ── Vue 1 : polir ──
  const polir = z => {
    const e = 0.6, c = [z.l * 0.46, z.h - 30], D = 100 * e, ep = 9 * e;
    return { e, c, D, ep };
  };
  // ── Vue 2 : au soleil ── La lentille vue presque de face, tenue par le bord ; le soleil derrière, en haut à gauche ;
  // le cône de lumière qui se resserre jusqu'au point, sur la cible posée sur la bûche ; le bras calé sur la bûche.
  const soleil = z => {
    const e = 0.45, yA = z.h - 16;
    const L = [z.l * 0.5, 34], R = 50 * e;
    const cible = [z.l * 0.76, yA - 3];
    return { e, yA, L, R, cible };
  };

  return {
    ref: '13-11',
    titre: 'La lentille de glace',
    desc: 'Deux vues. En haut, le disque de glace vu par la tranche, plus épais au centre qu’au bord, et la paume nue posée à plat dessus, qui le frotte d’un côté puis de l’autre. En bas, le disque tenu par le bord dans une main en C, l’avant-bras posé sur une bûche couchée, face au soleil : les rayons traversent la glace et se rejoignent en un petit point sur l’amadou carbonisé posé sur la bûche, qui fume.',
    format: 'quart',
    disposition: [['polir'], ['soleil']],
    hauteurs: [0.82, 1.18],
    vues: {
      polir: {
        titre: 'Bomber à la paume',
        dessin: z => {
          const g = polir(z), out = [];
          out.push(lentille(g.c, [1, 0], g.D, g.ep));
          // la paume à plat sur le dessus du disque : posée pour que ses points de contact touchent le bombé
          const o = { x: g.c[0] + 4, y: g.c[1], pose: 'plat', vue: 'pouce', echelle: g.e, angle: 180 };
          const m0 = F.mainSimple({ ...o, avantbras: false });
          const yc = m0.boite.y1;
          o.y += (g.c[1] - g.ep * 0.98) - yc;
          out.push(String(F.mainSimple({ ...o, avantbras: { longueur: 70 } }).svg));
          // le geste : frotter d'un côté puis de l'autre
          out.push(h.geste(`M ${f(g.c[0] - 34)} ${f(g.c[1] + g.ep + 10)} L ${f(g.c[0] + 34)} ${f(g.c[1] + g.ep + 10)}`, { double: true }));
          return coupe('polir', z, out.join('\n'));
        },
        renvois: z => {
          const g = polir(z);
          return [
            { n: 1, rond: [16, g.c[1] - 4], cible: [g.c[0] - g.D / 2 + 2, g.c[1]], texte: 'mince au bord, épais au centre' },
            { n: 2, rond: [z.l - 16, g.c[1] + g.ep + 10], cible: [g.c[0] + 38, g.c[1] + g.ep + 10], texte: 'flèche : frotter à la paume nue' },
          ];
        },
      },
      soleil: {
        titre: 'Face au soleil, calé',
        dessin: z => {
          const g = soleil(z), out = [];
          // l'appui : une bûche couchée, vue de côté
          out.push(h.path(`M 0 ${f(g.yA)} L ${f(z.l)} ${f(g.yA)} L ${f(z.l)} ${f(z.h)} L 0 ${f(z.h)} Z`, A.blanc));
          out.push(h.ligne(0, g.yA, z.l, g.yA, A.contour));
          out.push(h.path(`M 6 ${f(g.yA + 6)} L 52 ${f(g.yA + 7)} M 84 ${f(g.yA + 10)} L 150 ${f(g.yA + 9)} M 190 ${f(g.yA + 5)} L 236 ${f(g.yA + 6)} M 252 ${f(g.yA + 11)} L 290 ${f(g.yA + 10)}`, A.fin));
          // les rayons du soleil, parallèles, jusqu'à la lentille
          const ray = [0.62, 0.785];
          [-0.7, 0, 0.7].forEach(s => {
            const p = [g.L[0] + s * g.R * 0.75 - g.R * 0.2, g.L[1] + s * g.R * 0.55 - g.R * 0.45], q = [p[0] - ray[0] * 60, p[1] - ray[1] * 60];
            out.push(h.fleche(`M ${f(q[0])} ${f(q[1])} L ${f(p[0] - ray[0] * 4)} ${f(p[1] - ray[1] * 4)}`, A.fin));
          });
          // le cône de lumière, des deux bords de la lentille jusqu'au point
          const tg = (s) => [g.L[0] + s * g.R * 0.7, g.L[1] - g.R * 0.66 * s];
          [[-1], [1]].forEach(([s]) => { const p = tg(s); out.push(h.ligne(p[0], p[1], g.cible[0], g.cible[1], A.detail)); });
          out.push(h.ligne(g.L[0], g.L[1] + g.R * 0.9, g.cible[0], g.cible[1], A.fin));
          // la cible : un carré d'amadou carbonisé, noir, posé sur la bûche, et le filet de fumée
          out.push(h.path(`M ${f(g.cible[0] - 12)} ${f(g.yA)} L ${f(g.cible[0] - 10)} ${f(g.yA - 4)} L ${f(g.cible[0] + 12)} ${f(g.yA - 4)} L ${f(g.cible[0] + 13)} ${f(g.yA)} Z`, A.plein));
          out.push(h.path(`M ${f(g.cible[0] + 3)} ${f(g.cible[1] - 3)} C ${f(g.cible[0] + 10)} ${f(g.cible[1] - 12)} ${f(g.cible[0] - 1)} ${f(g.cible[1] - 20)} ${f(g.cible[0] + 6)} ${f(g.cible[1] - 30)}`, A.detail));
          // la lentille dans la main en C, l'avant-bras qui descend se poser sur la bûche
          const disque = [h.ellipse(g.L[0], g.L[1], g.R, g.R * 0.92, blanc(A.contour)),
            h.path(`M ${f(g.L[0] - g.R * 0.55)} ${f(g.L[1] - g.R * 0.35)} Q ${f(g.L[0] - g.R * 0.35)} ${f(g.L[1] - g.R * 0.62)} ${f(g.L[0] - g.R * 0.05)} ${f(g.L[1] - g.R * 0.66)}`, A.detail)].join('\n');
          const o = { x: g.L[0], y: g.L[1], pose: 'coupe-c', vue: 'pouce', diametre: 100, echelle: g.e, angle: -120, cote: 'gauche' };
          out.push(String(F.mainSimple({ ...o, objet: disque, avantbras: { longueur: 300, fin: [[0, g.yA], [z.l, g.yA]] } }).svg));
          // le point à contrôler : le plus petit point de lumière, sur la cible
          out.push(h.controle(g.cible[0], g.cible[1] - 1, 6));
          return coupe('soleil', z, out.join('\n'));
        },
        renvois: z => {
          const g = soleil(z);
          return [
            { n: 3, rond: [z.l - 16, g.yA - 50], cible: [g.cible[0] + 5, g.cible[1] - 5], texte: 'cercle : le plus petit point' },
            { n: 4, rond: [z.l - 16, g.yA - 20], cible: [g.cible[0] + 11, g.yA - 2], texte: 'sur une cible sombre et sèche' },
            { n: 5, rond: [16, g.yA - 34], cible: (() => {
              const m = F.mainSimple({ x: g.L[0], y: g.L[1], pose: 'coupe-c', vue: 'pouce', diametre: 100, echelle: g.e, angle: -120, cote: 'gauche', avantbras: { longueur: 300, fin: [[0, g.yA], [z.l, g.yA]] } });
              const c = m.coupe || [[g.L[0] + 40, g.yA], [g.L[0] + 60, g.yA]];
              return [(c[0][0] + c[1][0]) / 2, g.yA - 1];
            })(), texte: 'mains calées sur un appui' },
          ];
        },
      },
    },
  };
};
