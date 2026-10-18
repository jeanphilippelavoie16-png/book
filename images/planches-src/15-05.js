// Planche 15-05 (petite planche, une colonne). Mesurer l'épaisseur de la glace au trou percé.
// Le texte : ch. 15, section 2 (« son épaisseur n'a pas été mesurée ce jour-là, au vilebrequin, à plusieurs
// endroits ») et étape 20 (« Sur la glace, mesurer avant d'engager. Percer à plusieurs endroits du trajet »),
// matériel : la tarière à glace.
//
// Une coupe, dans l'ordre des gestes : la neige pelletée jusqu'à la glace, le trou percé jusqu'à l'eau, le crochet du
// ruban pris sous le bord du dessous de la glace, le ruban tiré vers le haut, la lecture au ras du dessus de la glace.
// Sources : sources/54-mndnr-check-ice-thickness.html (Minnesota DNR, « How to check ice thickness ») : « Put the tape
// measure into the hole and hook the bottom edge of the ice before taking measurement » ; « After drilling a hole with
// the auger, measure ice thickness with a tape measure » ; sources/15-mndnr-danger-glace-mince-2017-texte.txt :
// « Shovel any snow before testing the ice for thickness and color ».
// Aucune cote : les épaisseurs à atteindre sont dans le texte (une donnée ne se dessine pas).
// L'eau monte dans le trou presque au ras du dessus : la glace flotte, à peu près les neuf dixièmes sous l'eau
// (densité de la glace, sources/09-usgs-densite-glace.md) ; dessiné à 0,9 de l'épaisseur.
//
// Main : h.formes.mainStock 'plaque-cote' (2-04), miroir, sans son objet : elle tient le boîtier du ruban par le côté,
// le pouce devant ; le boîtier est dessiné à la place de la plaque, avant la main.

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const NOIR = '#1A1A1A';

  // ── la géométrie de la coupe ──
  const geo = z => {
    const yG = Math.round(z.h * 0.53);          // le dessus de la glace
    const EP = 76;                               // l'épaisseur de la glace sur le dessin
    const yB = yG + EP;                          // le dessous de la glace
    const yW = yG + EP * 0.1;                    // l'eau dans le trou
    const NE = 16;                               // la neige sur la glace
    const xc = z.l * 0.42, R = 25;               // le trou : centre, demi-largeur
    const xg = xc - R, xd = xc + R;              // les parois du trou
    const xN1 = xg - 46, xN2 = xd + 58;          // la neige pelletée : là où elle recommence
    const xR = xg + 9;                           // le ruban descend le long de la paroi gauche
    const lame = 2;                              // la lame vue par la tranche
    const crochet = 15;                          // la longueur du crochet sous la glace
    const yBoite = yG - 72;                      // le bas du boîtier
    return { yG, EP, yB, yW, NE, xc, R, xg, xd, xN1, xN2, xR, lame, crochet, yBoite };
  };

  // la main tient le boîtier par le côté droit, le pouce devant ; le bas du boîtier tombe en yBoite, son bord gauche
  // juste à gauche de la lame
  const TAILLE = 104;
  const main = g => {
    const m0 = F.mainStock({ id: 'plaque-cote', objet: false, miroir: true, taille: TAILLE, x: 0, y: 0 });
    const o = m0.objet;
    return F.mainStock({ id: 'plaque-cote', objet: false, miroir: true, taille: TAILLE, x: g.xR - 3 + o.largeur / 2, y: g.yBoite - o.longueur / 2 });
  };

  const dessin = z => {
    const g = geo(z), out = [];
    // l'eau, sous la glace et dans le trou
    out.push(h.rect(0, g.yW, z.l, z.h - g.yW, A.hachure('eau', 'aucun')));
    out.push(h.rect(g.xg, g.yW, g.xd - g.xg, g.yB - g.yW + 1, A.hachure('eau', 'aucun')));
    // la glace, coupée : deux pans blancs de chaque côté du trou
    const pan = (x0, x1) => h.chemin([[x0, g.yG], [x1, g.yG], [x1, g.yB], [x0, g.yB]], blanc(A.contour), true);
    out.push(pan(-6, g.xg), pan(g.xd, z.l + 6));
    // le niveau de l'eau dans le trou
    out.push(h.ligne(g.xg, g.yW, g.xd, g.yW, A.arete));
    // la neige, pelletée en petits bancs de chaque côté
    const banc = (x0, x1, cote) => {
      const ht = g.NE, bosse = 9;
      const pts = cote === 'g'
        ? [[x0, g.yG], [x0, g.yG - ht], [x1 - 14, g.yG - ht - bosse], [x1 - 4, g.yG - ht + 2], [x1, g.yG]]
        : [[x0, g.yG], [x0 + 4, g.yG - ht + 2], [x0 + 14, g.yG - ht - bosse], [x1, g.yG - ht], [x1, g.yG]];
      return h.chemin(pts, A.hachure('neige', 'arete'), true);
    };
    out.push(banc(-6, g.xN1, 'g'), banc(g.xN2, z.l + 6, 'd'));
    // la coupe s'arrête au bord de la vue : la glace, l'eau et la neige continuent au-delà
    const fond = `<clipPath id="vue-1505"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>\n<g clip-path="url(#vue-1505)">\n${out.splice(0).join('\n')}\n</g>`;
    out.push(fond);

    // le ruban, vu par la tranche (le boîtier est vu de face) : la lame est un trait mince qui descend le long de la paroi
    // gauche du trou jusque sous la glace ; au bout, le crochet replié à angle droit vers la paroi passe sous le bord
    // du dessous de la glace et s'y appuie. Le crochet est un peu grossi pour se lire.
    // la lame et son crochet : une seule bande de métal mince, en L, blanche cernée
    const x0 = g.xR, ep = 4, yH = g.yB + 1.4, yBas = g.yB + 6.2, xC = x0 - g.crochet;
    out.push(h.path(`M ${f(x0 - ep / 2)} ${f(g.yBoite)} L ${f(x0 - ep / 2)} ${f(yH)} L ${f(xC)} ${f(yH)} L ${f(xC)} ${f(yBas)} L ${f(x0 + ep / 2)} ${f(yBas)} L ${f(x0 + ep / 2)} ${f(g.yBoite)} Z`, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="miter"`));

    // le boîtier du ruban, tenu par la main : la main d'abord posée pour lire l'axe de la plaque qu'elle tient, puis
    // le boîtier dessiné à la place et à la taille de cette plaque, et la main par-dessus
    const m = main(g);
    const o = m.objet, bw = o.largeur, bh = o.longueur, bx = o.x - bw / 2, by = o.y - bh / 2, rb = 9;
    out.push(h.path(`M ${f(bx)} ${f(by + bh)} L ${f(bx)} ${f(by + rb)} Q ${f(bx)} ${f(by)} ${f(bx + rb)} ${f(by)} L ${f(bx + bw - rb)} ${f(by)} Q ${f(bx + bw)} ${f(by)} ${f(bx + bw)} ${f(by + rb)} L ${f(bx + bw)} ${f(by + bh - rb)} Q ${f(bx + bw)} ${f(by + bh)} ${f(bx + bw - rb)} ${f(by + bh)} Z`, blanc(A.contour)));
    out.push(h.cercle(bx + bw * 0.42, by + bh * 0.48, bw * 0.2, A.detail));
    out.push(String(m.svg));

    // le geste : tirer le ruban vers le haut, à droite de la lame
    out.push(h.geste(`M ${f(x0 + 16)} ${f(g.yG - 22)} L ${f(x0 + 16)} ${f(g.yG - 62)}`));
    // le point à contrôler : le crochet pris sous le bord de la glace
    out.push(h.controle(x0 - g.crochet / 2 + 1, g.yB + 1.5, 11));
    // la coupe s'arrête au bord de la vue : la glace et la neige continuent au-delà
    return out.join('\n');
  };

  return {
    ref: '15-05',
    titre: 'Mesurer l’épaisseur de la glace',
    desc: 'Une coupe de la glace sur le lac. La neige est pelletée en petits bancs de chaque côté, la glace est nue autour d’un trou percé jusqu’à l’eau ; l’eau monte dans le trou presque au ras du dessus de la glace. Un ruban à mesurer descend dans le trou le long de la paroi, passe sous la glace, et son crochet est pris sous le bord du dessous de la glace. Une main tient le boîtier du ruban au-dessus du trou et tire vers le haut ; la mesure se lit au ras du dessus de la glace.',
    format: 'quart',
    disposition: [['coupe']],
    vues: {
      coupe: {
        dessin,
        renvois: z => {
          const g = geo(z);
          return [
            { n: 1, rond: [g.xN2 + 34, g.yG - g.NE - 34], cible: [g.xN2 + 12, g.yG - g.NE - 6], texte: 'pelleter la neige jusqu’à la glace' },
            { n: 2, rond: [g.xd + 40, g.yB + 30], cible: [g.xd + 1, g.yB - 10], texte: 'percer jusqu’à l’eau' },
            { n: 3, rond: [g.xg - 40, g.yB + 34], cible: [g.xR - g.crochet - 3, g.yB + 7], texte: 'crocher le bout du ruban sous la glace' },
            { n: 4, rond: [g.xR + 52, g.yG - 26], cible: [g.xR + g.lame + 15, g.yG - 40], texte: 'tirer le ruban, bien tendu' },
            { n: 5, rond: [g.xg - 44, g.yG - 30], cible: [g.xR - 1, g.yG], texte: 'lire au ras du dessus de la glace' },
          ];
        },
      },
    },
  };
};
