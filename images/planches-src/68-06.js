// Planche 68-06 — La caisse de sel du caveau (ch. 68, §9.4 et §9.6)
// La charte : coupe hachurée sans gris ; seule la pierre, vue au-dessus de la coupe, a sa face de
// droite à l'ombre. Un rouge : le sel entre deux morceaux, qui ne doivent pas se toucher.
module.exports = (h) => {
  // Géométrie commune au dessin et aux renvois
  const G = (z) => {
    const cx = z.l / 2;
    const sol = z.h - 12;            // plancher du caveau
    const ep = 12;                   // épaisseur des côtés
    const wIn = 394;                 // largeur intérieure
    const xi1 = cx - wIn / 2, xi2 = cx + wIn / 2;
    const xL = xi1 - ep, xR = xi2 + ep;
    const tas = 40;                  // hauteur des tasseaux
    const yBot = sol - tas;          // dessous du fond
    const yFond = yBot - 10;         // dessus des lattes
    const s = 11;                    // épaisseur de sel entre les couches
    const pe = 34;                   // épaisseur d'un morceau
    const y1b = yFond - s, y1t = y1b - pe;
    const y2b = y1t - s, y2t = y2b - pe;
    const ySel = y2t - s;            // dessus du sel
    const yPl = ySel - 10;           // dessus de la planche
    const yTop = ySel - 22;          // haut des côtés
    const tas1 = xi1 + 40, tas2 = xi2 - 40 - 24;   // tasseaux, 24 de large
    const pw = 110, pg = 16;         // morceau : largeur, écart
    const px = [0, 1, 2].map(i => xi1 + pg + i * (pw + pg));
    return { cx, sol, ep, xi1, xi2, xL, xR, tas, yBot, yFond, s, pe, y1b, y1t, y2b, y2t, ySel, yPl, yTop, tas1, tas2, pw, px };
  };

  // Courbe fermée lissée passant par des points (Catmull-Rom, tension réduite)
  const lisse = (p, k = 0.35) => {
    const n = p.length, f = (v) => v.toFixed(1);
    let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < n; i++) {
      const a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n], e = p[(i + 2) % n];
      const c1 = [b[0] + (c[0] - a[0]) * k / 2, b[1] + (c[1] - a[1]) * k / 2];
      const c2 = [c[0] - (e[0] - b[0]) * k / 2, c[1] - (e[1] - b[1]) * k / 2];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(c[0])} ${f(c[1])}`;
    }
    return d + ' Z';
  };
  // Trois découpes de morceau (largeur ≤ 110, épaisseur ≤ 34), la deuxième couche en miroir
  const FORMES = [
    [[2, 6], [40, 1], [94, 3], [108, 10], [106, 27], [70, 33], [20, 32], [0, 23]],
    [[6, 2], [58, 0], [104, 5], [110, 20], [100, 33], [40, 31], [5, 29], [0, 14]],
    [[0, 9], [30, 2], [86, 0], [104, 6], [107, 25], [80, 32], [14, 33], [2, 26]],
  ];
  const miroir = (p) => p.map(([x, y]) => [110 - x, y]);

  return {
    ref: '68-06',
    titre: 'La caisse de sel du caveau',
    desc: 'Coupe d’une caisse de bois dont le fond est fait de lattes espacées, posée sur deux tasseaux dans un plat qui recueille le liquide. Deux couches de morceaux épais d’une main, chacun noyé dans le sel sans toucher son voisin, avec du sel au fond et sur le dessus, pressés par une planche et une pierre.',
    format: 'demi',
    disposition: [['coupe']],
    vues: {
      coupe: {
        dessin: (z) => {
          const g = G(z);
          const o = [];
          // plancher du caveau
          o.push(h.rect(10, g.sol, z.l - 20, z.h - g.sol, h.a.hachure('terre', 'aucun')));
          o.push(h.ligne(10, g.sol, z.l - 10, g.sol, h.a.arete));
          // plat, plus large que la caisse, et son liquide
          const pL = g.xL - 18, pR = g.xR + 18, rim = g.sol - 20, fd = g.sol - 3;
          o.push(h.chemin([[pL + 6, g.sol - 11], [pL + 9, fd], [pR - 9, fd], [pR - 6, g.sol - 11]], h.a.hachure('eau', 'aucun'), true));
          o.push(h.ligne(pL + 6, g.sol - 11, pR - 6, g.sol - 11, h.a.detail));
          o.push(h.chemin([[pL - 3, rim], [pL + 3, rim], [pL + 11, fd], [pR - 11, fd], [pR - 3, rim], [pR + 3, rim],
            [pR - 8, g.sol], [pL + 8, g.sol]], h.a.plein, true));
          // tasseaux, debout dans le plat
          [g.tas1, g.tas2].forEach(x => o.push(h.rect(x, g.yBot, 24, fd - g.yBot, h.a.hachure('bois', 'arete'))));
          // fond : lattes espacées, vues en bout
          const n = 9, jeu = 5, lw = (g.xi2 - g.xi1 - (n - 1) * jeu) / n;
          const jour = (i) => g.xi1 + i * (lw + jeu) - jeu / 2;   // milieu du i-ème jour entre deux lattes
          // gouttes qui tombent par les jours entre les lattes (pas au-dessus d'un tasseau)
          [[jour(3), 0.55], [jour(5), 0.3], [jour(7), 0.6]].forEach(([x, f]) => {
            const y = g.yBot + 4 + f * (g.tas - 14);
            o.push(h.path(`M ${x} ${y - 3.5} Q ${x + 2.6} ${y + 0.5} ${x} ${y + 2.2} Q ${x - 2.6} ${y + 0.5} ${x} ${y - 3.5} Z`, h.a.plein));
          });
          for (let i = 0; i < n; i++) o.push(h.rect(g.xi1 + i * (lw + jeu), g.yFond, lw, 10, h.a.hachure('bois', 'arete')));
          // sel
          o.push(h.rect(g.xi1, g.ySel, g.xi2 - g.xi1, g.yFond - g.ySel, h.a.hachure('neige', 'aucun')));
          o.push(h.path(`M ${g.xi1} ${g.ySel} Q ${g.xi1 + 60} ${g.ySel - 2} ${g.cx} ${g.ySel} T ${g.xi2} ${g.ySel}`, h.a.detail));
          // morceaux, deux couches, chacun entouré de sel
          [[g.y1t, 0], [g.y2t, 1]].forEach(([y, c]) => {
            g.px.forEach((x, i) => {
              const forme = c ? miroir(FORMES[(i + 1) % 3]) : FORMES[i];
              const d = lisse(forme.map(([u, v]) => [x + u, y + v]));
              o.push(h.path(d, h.a.blanc));
              o.push(h.path(d, h.a.arete));
              // couche de gras le long d'une face, et une veine entre deux muscles
              const gy = (i + c) % 2 ? y + 7 : y + g.pe - 9;
              o.push(h.path(`M ${x + 7} ${gy} Q ${x + 55} ${gy + ((i + c) % 2 ? -2 : 2)} ${x + 102} ${gy}`, h.a.detail));
              const vx = x + 36 + 14 * i;
              o.push(h.path(`M ${vx} ${y + 3} Q ${vx + 12} ${y + 14} ${vx + 3} ${y + g.pe - 4}`, h.a.detail));
            });
          });
          // côtés de la caisse
          o.push(h.rect(g.xL, g.yTop, g.ep, g.yBot - g.yTop, h.a.hachure('bois', 'arete')));
          o.push(h.rect(g.xi2, g.yTop, g.ep, g.yBot - g.yTop, h.a.hachure('bois', 'arete')));
          // contour des côtés seulement : un trait continu sous les lattes fermerait les jours
          o.push(h.chemin([[g.xL, g.yTop], [g.xL, g.yBot], [g.xi1, g.yBot]], h.a.contour));
          o.push(h.chemin([[g.xi2, g.yBot], [g.xR, g.yBot], [g.xR, g.yTop]], h.a.contour));
          // planche sur le sel
          o.push(h.rect(g.xi1 + 3, g.yPl, g.xi2 - g.xi1 - 6, 10, h.a.hachure('bois', 'arete')));
          // pierre
          const pb = g.yPl, pc = g.cx + 10;
          const pierre = lisse([[-64, 0], [-70, -14], [-60, -30], [-34, -40], [-6, -46], [30, -41], [56, -30], [66, -12], [60, 0]]
            .map(([u, v]) => [pc + u, pb + v]), 0.3);
          o.push(h.path(pierre, h.a.blanc));
          // la face de droite de la pierre, à l'ombre : découpée par la pierre elle-même
          o.push(`<clipPath id="om-68-06-pierre">${h.path(pierre, h.a.blanc)}</clipPath>`);
          o.push(`<g clip-path="url(#om-68-06-pierre)">${h.chemin([[pc + 22, pb - 20], [pc + 56, pb - 30], [pc + 90, pb - 42], [pc + 90, pb + 2], [pc + 30, pb + 2], [pc + 30, pb]], h.a.ombre, true)}</g>`);
          o.push(h.path(pierre, h.a.arete));
          // arêtes de la pierre et un peu de grain
          o.push(h.path(`M ${pc - 60} ${pb - 30} L ${pc - 30} ${pb - 24} L ${pc - 6} ${pb - 46}`, h.a.detail));
          o.push(h.path(`M ${pc - 30} ${pb - 24} L ${pc + 22} ${pb - 20} L ${pc + 56} ${pb - 30}`, h.a.detail));
          o.push(h.path(`M ${pc + 22} ${pb - 20} L ${pc + 30} ${pb}`, h.a.detail));
          [[-48, -12], [-20, -10], [4, -6], [40, -10], [-44, -36], [8, -34], [36, -32], [-12, -32]].forEach(([u, v]) =>
            o.push(h.cercle(pc + u, pb + v, 0.8, h.a.plein)));
          // le point à vérifier : du sel entre deux morceaux, qui ne se touchent pas
          o.push(h.controle(g.px[0] + g.pw + 8, g.y2t + g.pe / 2, 13));
          return o.join('\n');
        },
        renvois: (z) => {
          const g = G(z);
          return [
            { n: 1, rond: [g.xL - 46, g.yTop + 18], cible: [g.xL - 1, g.yTop + 18], texte: 'caisse de bouleau ou de tremble' },
            { n: 2, rond: [g.cx - 84, g.yBot + 16], cible: [g.cx - 99, g.yBot + 1], texte: 'fond à lattes espacées' },
            { n: 3, rond: [g.xL - 46, g.yBot + 14], cible: [g.tas1 - 1, g.yBot + 10], texte: 'deux tasseaux dans un plat' },
            { n: 4, rond: [g.xR + 46, g.yFond - 2], cible: [g.px[2] + 40, g.yFond - 7], texte: 'lit de sel au fond' },
            { n: 5, rond: [g.xR + 46, g.y2t + 12], cible: [g.px[2] + g.pw + 1, g.y2t + 12], texte: 'morceau épais d’une main, noyé' },
            { n: 6, rond: [g.xR + 34, g.yTop - 30], cible: [g.xi2 - 40, g.yPl - 1], texte: 'planche propre, pierre lavée' },
          ];
        },
      },
    },
  };
};
