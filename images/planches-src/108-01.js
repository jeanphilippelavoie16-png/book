// Planche 108-01 — Le clapet de cuir (chapitre 108, §9, « Le cuir remplace la courroie, le joint et le
// clapet »). Ce que dit le chapitre : un clapet mort se refait d'une languette de cuir épais fixée par un
// seul bord au-dessus de l'ouverture ; l'eau la soulève dans le sens du débit et la plaque sur l'ouverture
// dans l'autre ; c'est le clapet des vieilles pompes à bras, sans ressort ni pièce usinée.
// Trois vignettes à la même échelle : vu de dessus (la languette déborde du trou tout autour, deux clous le
// long d'un seul bord) ; en coupe, ouvert (le débit monte et soulève la languette) ; en coupe, fermé (le
// retour la plaque sur l'ouverture). Les flèches de l'eau sont noires : il n'y a pas de geste.
// La fixation par deux clous est un choix de dessin : le chapitre dit « fixée par un seul bord », pas comment.
// Aucune cote : le chapitre n'en donne aucune.
'use strict';

const f1 = v => Math.round(v * 10) / 10;

module.exports = (h) => {
  const A = h.a, NOIR = '#1A1A1A';
  const CUIR = `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`;

  // ─── en coupe : le tuyau, le siège percé, la languette ────────────────────────────────────────
  const geoC = z => {
    const cx = z.l / 2, ri = 60, ep = 13;          // demi-largeur intérieure du tuyau, épaisseur de paroi
    const yS = 132, eS = 22;                       // le dessus du siège, son épaisseur
    const rt = 22;                                 // le demi-trou
    const e = 8, x0 = cx - 40, x1 = cx + 40;       // la languette : épaisseur, bord fixé, bout libre
    const piv = [cx - 30, yS];                     // le clou : la languette plie juste après lui
    return { cx, ri, ep, yS, eS, rt, e, x0, x1, piv };
  };
  const coupe = (z, ouvert) => {
    const g = geoC(z), { cx, ri, ep, yS, eS, rt, e, x0, x1, piv } = g, out = [];
    const haut = 10, bas = z.h - 6;
    // les parois du tuyau, coupées (cassures en haut et en bas)
    for (const s of [-1, 1]) {
      const xa = cx + s * ri, xb = cx + s * (ri + ep);
      out.push(h.rect(Math.min(xa, xb), haut, ep, bas - haut, A.hachure('metal', 'arete')));
    }
    // le siège percé, coupé : deux morceaux de part et d'autre du trou
    out.push(h.rect(cx - ri, yS, ri - rt, eS, A.hachure('bois', 'contour')));
    out.push(h.rect(cx + rt, yS, ri - rt, eS, A.hachure('bois', 'contour')));
    // la languette : collée au siège jusqu'au clou, puis à plat (fermé) ou soulevée (ouvert)
    const ang = ouvert ? -34 : 0, a = ang * Math.PI / 180;
    const R = (x, y) => { const dx = x - piv[0], dy = y - piv[1]; return [piv[0] + dx * Math.cos(a) - dy * Math.sin(a), piv[1] + dx * Math.sin(a) + dy * Math.cos(a)]; };
    const lang = [[x0, yS - e], [piv[0], yS - e], R(piv[0] + 6, yS - e), R(x1, yS - e), R(x1, yS), R(piv[0] + 6, yS), [piv[0], yS], [x0, yS]];
    out.push(h.chemin(lang, CUIR, true));
    // le clou : sa tête sur le cuir, sa tige dans le siège
    const xc = x0 + 6;
    out.push(h.rect(xc - 1.6, yS - e, 3.2, eS + e - 4, A.plein));
    out.push(h.rect(xc - 6, yS - e - 3, 12, 3, A.plein));
    // l'eau : noire, elle monte (ouvert) ou elle redescend et bute sur la languette (fermé)
    if (ouvert) {
      out.push(h.fleche(`M${f1(cx)} ${f1(bas - 12)} L${f1(cx)} ${f1(yS + eS + 10)}`));
      out.push(h.fleche(`M${f1(cx + 6)} ${f1(yS - 4)} Q${f1(cx + 26)} ${f1(yS - 22)} ${f1(cx + 34)} ${f1(yS - 70)}`));
      out.push(h.fleche(`M${f1(cx - 8)} ${f1(yS - 8)} Q${f1(cx + 6)} ${f1(yS - 50)} ${f1(cx + 4)} ${f1(haut + 16)}`));
    } else {
      out.push(h.fleche(`M${f1(cx - 14)} ${f1(haut + 14)} L${f1(cx - 14)} ${f1(yS - e - 10)}`));
      out.push(h.fleche(`M${f1(cx + 18)} ${f1(haut + 14)} L${f1(cx + 18)} ${f1(yS - e - 10)}`));
    }
    return out.join('\n');
  };

  // ─── vu de dessus ────────────────────────────────────────────────────────────────────────────
  const geoP = z => {
    const cx = z.l / 2, cy = 112, ri = 60, ep = 13, rt = 22;
    const x0 = cx - 40, x1 = cx + 40, demiL = 34;   // la languette : du bord fixé au bout libre, sa demi-largeur
    return { cx, cy, ri, ep, rt, x0, x1, demiL };
  };
  const plan = z => {
    const g = geoP(z), { cx, cy, ri, ep, rt, x0, x1, demiL } = g, out = [];
    // la paroi du tuyau, coupée : un anneau hachuré
    const C = (r) => `M${f1(cx - r)} ${f1(cy)} A${r} ${r} 0 1 0 ${f1(cx + r)} ${f1(cy)} A${r} ${r} 0 1 0 ${f1(cx - r)} ${f1(cy)} Z`;
    out.push(`<path d="${C(ri + ep)} ${C(ri)}" fill-rule="evenodd" ${A.hachure('metal', 'aucun')}/>`);
    out.push(h.cercle(cx, cy, ri + ep, A.contour), h.cercle(cx, cy, ri, A.arete));
    // la languette, aux coins arrondis
    const r = 8;
    out.push(h.path(`M${f1(x0)} ${f1(cy - demiL)} L${f1(x1 - r)} ${f1(cy - demiL)} Q${f1(x1)} ${f1(cy - demiL)} ${f1(x1)} ${f1(cy - demiL + r)} L${f1(x1)} ${f1(cy + demiL - r)} Q${f1(x1)} ${f1(cy + demiL)} ${f1(x1 - r)} ${f1(cy + demiL)} L${f1(x0)} ${f1(cy + demiL)} Z`, CUIR));
    // le trou, caché sous la languette
    out.push(h.cercle(cx, cy, rt, A.cache));
    // deux clous le long du bord fixé
    [-18, 18].forEach(dy => out.push(h.cercle(x0 + 6, cy + dy, 3.2, A.plein)));
    return out.join('\n');
  };

  return {
    ref: '108-01',
    titre: 'Le clapet de cuir',
    desc: 'Trois vues d’un clapet refait en cuir. De dessus : dans un tuyau, une languette de cuir épais plus grande que le trou du siège, clouée par un seul bord. En coupe, ouvert : l’eau monte par le trou et soulève la languette, qui plie juste après les clous. En coupe, fermé : l’eau qui redescend plaque la languette sur le trou.',
    format: 'demi',
    disposition: [['plan', 'ouvert', 'ferme']],
    largeurs: [[0.85, 1, 1]],
    vues: {
      plan: {
        titre: 'Vu de dessus',
        dessin: plan,
        renvois: z => {
          const g = geoP(z);
          return [
            { n: 1, rond: [g.cx + 30, z.h - 30], cible: [g.cx + 26, g.cy + g.demiL - 1], texte: 'languette de cuir épais, débordant du trou' },
            { n: 2, rond: [16, 24], cible: [g.x0 + 6, g.cy - 18], texte: 'fixée par un seul bord' },
          ];
        },
      },
      ouvert: {
        titre: 'Le débit la soulève',
        dessin: z => coupe(z, true),
        renvois: z => {
          const g = geoC(z);
          return [
            { n: 3, rond: [z.l - 20, 30], cible: [g.x1 - 6, g.yS - 46], texte: 'le débit la soulève' },
          ];
        },
      },
      ferme: {
        titre: 'Le retour la plaque',
        dessin: z => coupe(z, false),
        renvois: z => {
          const g = geoC(z);
          return [
            { n: 4, rond: [z.l - 20, z.h - 40], cible: [g.cx + 10, g.yS], texte: 'le retour la plaque sur l’ouverture' },
          ];
        },
      },
    },
  };
};
