// Planche 108-02 — Le joint découpé sur la pièce (chapitre 108, §9, « Le joint se découpe sur la pièce
// elle-même » ; aussi ch. 106, « Les joints et les tuyaux »). Ce que dit le chapitre : on ne trace pas,
// on ne mesure pas ; la feuille (cuir mince, carton huilé, chambre à air, toile enduite de gomme) posée à
// plat sur la bride nettoyée ; on frappe le pourtour et chaque trou de boulon avec le rond du marteau de
// mécanicien tenu debout ; le rebord de la bride coupe la feuille à sa cote, trous compris.
// Deux vues : en coupe dans l'axe (le tuyau, sa bride, un trou de boulon), le rond du marteau (la tête
// debout, la panne ronde en bas) frappe la feuille sur l'arête de la bride ; vu de dessus, en cours : le pourtour à moitié frappé, deux trous de boulon faits,
// les deux autres encore à faire (la bride sous la feuille en caché).
// Aucune cote : le chapitre n'en donne aucune. La bride dessinée (ronde, quatre boulons) est un exemple.
'use strict';

const f1 = v => Math.round(v * 10) / 10;

module.exports = (h) => {
  const A = h.a, NOIR = '#1A1A1A';
  const BL = w => `fill="#FFFFFF" stroke="${NOIR}" stroke-width="${w}" stroke-linejoin="round"`;

  // ─── En coupe : la bride, la feuille, le marteau ───────────────────────────────────────────────
  const geoC = z => {
    const yB = 150, eB = 26;                      // le dessus de la bride, son épaisseur
    const x0 = 12, xi = 64, ep = 14;              // l'axe du tuyau, sa paroi intérieure, l'épaisseur de paroi
    const xA = z.l * 0.6;                         // l'arête extérieure de la bride
    const xT0 = xA - 58, xT1 = xA - 36;           // un trou de boulon
    const eF = 6;                                 // l'épaisseur de la feuille
    return { yB, eB, x0, xi, ep, xA, xT0, xT1, eF };
  };
  const dessinC = z => {
    const g = geoC(z), { yB, eB, x0, xi, ep, xA, xT0, xT1, eF } = g, out = [];
    const bas = z.h - 6;
    // la moitié de la pièce, coupée dans l'axe : le tuyau qui descend, la bride qui s'étale, le trou de boulon
    out.push(h.chemin([[xi, yB], [xT0, yB], [xT0, yB + eB], [xi + ep, yB + eB], [xi + ep, bas], [xi, bas]], A.hachure('metal', 'contour'), true));
    out.push(h.rect(xT1, yB, xA - xT1, eB, A.hachure('metal', 'contour')));
    const cas = []; for (let i = 0; i <= 10; i++) { const t = i / 10; cas.push([xi + ep * t, bas + Math.sin(t * 2 * Math.PI) * 1.6]); }
    out.push(h.chemin(cas, A.detail));
    // l'axe du tuyau
    out.push(h.ligne(x0, yB - 40, x0, bas, `fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="10 3 2 3"`));
    // la feuille : posée à plat, elle couvre l'ouverture et le trou, déborde de l'arête ; frappée sur l'arête, elle s'y coupe
    const xD = z.l - 24;
    out.push(h.chemin([[x0, yB - eF], [xA, yB - eF], [xA + 2, yB - eF + 3], [xA + 2, yB], [x0, yB]], BL(1.4), true));
    out.push(h.chemin([[xA + 4, yB - eF + 3], [xA + 6, yB - eF], [xD, yB - eF - 1], [xD, yB - 1], [xA + 6, yB], [xA + 4, yB + 2]], BL(1.4), true));
    // le marteau de mécanicien, la tête debout : la panne ronde en bas sur l'arête, le manche vers la droite
    const xm = xA, yb = yB - eF;                  // le bas de la boule touche la feuille sur l'arête
    const rb = 13, hT = 92, lT = 26;
    const cyb = yb - rb;
    out.push(h.path(`M${f1(xm - lT / 2)} ${f1(cyb - 4)} A${rb} ${rb} 0 0 0 ${f1(xm + lT / 2)} ${f1(cyb - 4)}`, BL(2.4)));
    const tete = [[xm - lT / 2, cyb - 4], [xm - lT / 2 + 3, cyb - 22], [xm - lT / 2, cyb - hT + 12], [xm - lT / 2 - 3, cyb - hT], [xm + lT / 2 + 3, cyb - hT], [xm + lT / 2, cyb - hT + 12], [xm + lT / 2 - 3, cyb - 22], [xm + lT / 2, cyb - 4]];
    out.push(h.chemin(tete, BL(2.4), true));
    out.push(h.path(`M${f1(xm - lT / 2)} ${f1(cyb - 4)} A${rb} ${rb} 0 0 0 ${f1(xm + lT / 2)} ${f1(cyb - 4)} Z`, A.blanc));
    out.push(h.path(`M${f1(xm - lT / 2)} ${f1(cyb - 4)} A${rb} ${rb} 0 0 0 ${f1(xm + lT / 2)} ${f1(cyb - 4)}`, A.contour));
    // le manche, qui part vers la droite au milieu de la tête
    const ym = cyb - hT * 0.55;
    out.push(h.chemin([[xm + lT / 2 - 1, ym - 8], [z.l - 6, ym - 13], [z.l - 6, ym + 5], [xm + lT / 2 - 1, ym + 8]], BL(2.4), true));
    // le geste : frapper, la tête descend sur l'arête
    out.push(h.geste(`M${f1(xm - lT / 2 - 26)} ${f1(cyb - hT + 6)} L${f1(xm - lT / 2 - 26)} ${f1(cyb - 10)}`));
    return out.join('\n');
  };

  // ─── Vu de dessus, en cours ───────────────────────────────────────────────────────────────────
  const geoP = z => {
    const cx = z.l / 2, cy = z.h / 2 + 2, R = 86, Rc = 42, rB = 9, rT = 64;   // bride, ouverture, boulons
    return { cx, cy, R, Rc, rB, rT };
  };
  const dessinP = z => {
    const g = geoP(z), { cx, cy, R, Rc, rB, rT } = g, out = [];
    // la feuille, plus grande que la bride
    const fx0 = cx - R - 26, fy0 = cy - R - 22;
    out.push(h.rect(fx0, fy0, 2 * (R + 26), 2 * (R + 22), BL(1.4)));
    // le pourtour : frappé sur la moitié droite (coupé net), encore caché sur la moitié gauche
    const arc = (r, a0, a1) => { const p = []; for (let a = a0; a <= a1 + 0.01; a += 3) p.push([cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)]); return p; };
    const D = pts => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');
    out.push(h.path(D(arc(R, -90, 90)), A.contour));
    out.push(h.path(D(arc(R, 90, 270)), A.cache));
    // l'ouverture du milieu, encore cachée
    out.push(h.cercle(cx, cy, Rc, A.cache));
    // les quatre boulons : deux faits (le cuir est parti, le trou est net), deux à faire
    [45, 135, 225, 315].forEach(a => {
      const x = cx + rT * Math.cos(a * Math.PI / 180), y = cy + rT * Math.sin(a * Math.PI / 180);
      if (a === 45 || a === 315) out.push(h.cercle(x, y, rB, BL(2.4)));
      else out.push(h.cercle(x, y, rB, A.cache));
    });
    return out.join('\n');
  };

  return {
    ref: '108-02',
    titre: 'Le joint découpé sur la pièce',
    desc: 'En coupe : une bride percée d’un trou de boulon, une feuille posée à plat dessus qui déborde de l’arête ; la tête d’un marteau de mécanicien, debout, frappe de sa panne ronde la feuille sur l’arête, qui la coupe. Vu de dessus, en cours : la feuille sur une bride ronde à quatre boulons ; la moitié du pourtour est frappée et coupée net, deux trous de boulon sont faits, le reste attend, en caché.',
    format: 'demi',
    disposition: [['coupe', 'plan']],
    largeurs: [[1.25, 1]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: dessinC,
        renvois: z => {
          const g = geoC(z);
          return [
            { n: 1, rond: [g.xi + 20, g.yB - 60], cible: [g.xi + 30, g.yB - g.eF], texte: 'la feuille à plat sur la bride propre' },
            { n: 2, rond: [g.xA - 66, g.yB - 110], cible: [g.xA - 12, g.yB - g.eF - 18], texte: 'le rond du marteau, tête debout' },
            { n: 3, rond: [g.xA + 50, g.yB + 44], cible: [g.xA + 1, g.yB + 1], texte: 'l’arête coupe la feuille à la cote' },
          ];
        },
      },
      plan: {
        titre: 'Vu de dessus, en cours',
        dessin: dessinP,
        renvois: z => {
          const g = geoP(z);
          const p = a => [g.cx + g.rT * Math.cos(a * Math.PI / 180), g.cy + g.rT * Math.sin(a * Math.PI / 180)];
          return [
            { n: 4, rond: [z.l - 16, 18], cible: [g.cx + g.R * Math.cos(-40 * Math.PI / 180), g.cy + g.R * Math.sin(-40 * Math.PI / 180)], texte: 'frapper tout le pourtour' },
            { n: 5, rond: [z.l - 16, z.h - 18], cible: [p(45)[0] + 6, p(45)[1] + 6], texte: 'puis chaque trou de boulon' },
          ];
        },
      },
    },
  };
};
