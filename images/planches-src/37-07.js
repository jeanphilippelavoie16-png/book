'use strict';
// Planche 37-07 — Trois étirements du soir. Chapitre 37, étape 62 (et 63 pour la manière).
//
// Tout vient de l'étape 62 : l'arrière de la cuisse (assis sur le banc, une jambe allongée, le
// tronc penché en avant à partir des hanches, le dos droit) ; l'avant de la cuisse (debout, une
// main au mur, l'autre attrape la cheville et amène le talon vers la fesse, genoux côte à côte) ;
// le bas du dos (couché sur le dos, les bras ramènent les deux genoux vers la poitrine). Aucune
// cote : ce sont des gestes, rien ne se construit. La hauteur du banc et la place du mur ne sont
// qu'un dessin.
//
// Historique : d'abord des personnages de formes.js prolongés au chargement (postures prêtées,
// bras en deux morceaux, mains posées) ; reprise JP du 12 octobre (« pas de main ») : les mains
// du geste dessinées.
//
// Lot 3 (13 octobre) : les trois personnages passent au corps simple de profil (ischios,
// quadriceps, couche-genoux-poitrine ; pieds nus, trait fort : le corps est le sujet de chaque
// vue). L'ancienne source rechargeait formes.js à la main et ne se composait plus. Le banc se met à
// la hauteur du siège de la pose, le mur contre la paume. Rouge : la flèche du geste de chaque vue
// (le tronc qui bascule à partir des hanches, le talon vers la fesse, les genoux vers la poitrine).
module.exports = (h) => {
  const F = h.formes, A = h.a;
  const E = 0.235;                                   // unités de vue par mm, les trois vues
  const f1 = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const plus = (a, b) => [a[0] + b[0], a[1] + b[1]], fois = (a, k) => [a[0] * k, a[1] * k];
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const borne = (z, p) => [f1(Math.max(14, Math.min(z.l - 14, p[0]))), f1(Math.max(14, Math.min(z.h - 14, p[1])))];
  const BLANC = `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`;
  // un arc de centre C, de rayon r, de l'angle a0 à a1 (degrés écran)
  const arc = (C, r, a0, a1, n = 24) => {
    const out = [];
    for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * RAD; out.push([C[0] + r * Math.cos(a), C[1] + r * Math.sin(a)]); }
    return 'M' + out.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');
  };
  const angleDe = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) / RAD;
  // les y où une verticale x coupe les contours d'un corps simple
  const coupesX = (svg, x) => {
    const ys = [];
    for (const m of String(svg).matchAll(/ d="([^"]+)"/g)) {
      const n = m[1].match(/-?\d+(\.\d+)?/g).map(Number);
      for (let i = 0; i + 3 < n.length; i += 2) {
        const [x0, y0, x1, y1] = [n[i], n[i + 1], n[i + 2], n[i + 3]];
        if (x0 !== x1 && (x0 - x) * (x1 - x) <= 0) ys.push(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
    }
    return ys;
  };
  const memo = {};
  const corps = (cle, o) => memo[cle] || (memo[cle] = F.corps(Object.assign({ echelle: E, trait: 'fort', pieds: 'nu' }, o)));

  // ── 1. L'arrière de la cuisse : assis en long sur le banc, la jambe proche allongée dessus ──
  // La jambe de la pose est à l'horizontale, au-dessus du dessous des fesses : penchée de 4° vers
  // le bas, le mollet et le talon se posent sur le banc ; les bras, recalés (Nelder-Mead sur
  // corps(), lot 3), mettent les poings sur le bas du tibia. Le dessus du banc : le dessous des
  // fesses, lu sur le corps sans la jambe loin ni les bras (le .siege du moteur tient compte de la
  // cuisse loin, qui descend : il tombe 27 mm trop bas).
  const JAMBE = { cuisseP: 86, jambeP: 86, brasP: 18.1, avantbrasP: 84.3, brasL: 13.2, avantbrasL: 84.5 };
  const geoIschios = z => {
    const y0 = z.h - 8;
    const c0 = corps('i0-' + z.l, { x: 0, y: y0, pose: 'ischios', angles: JAMBE });
    // centré : des fesses (le siège) au bout du pied
    const x = (z.l - (c0.boite.x1 - c0.siege[0])) / 2 - c0.siege[0] + 10;
    const c = corps('i-' + z.l, { x, y: y0, pose: 'ischios', angles: JAMBE });
    const H = c.articulations.hancheP;
    const seul = corps('is-' + z.l, { x: H[0], y: H[1], appui: 'aucun', pose: 'ischios', angles: JAMBE, masquer: ['jambeL', 'brasP', 'brasL'] });
    const banc = Math.max(...coupesX(seul, H[0]));
    return { y0, c, banc };
  };
  // ── 2. L'avant de la cuisse : debout, la main proche à plat au mur ──
  const geoQuad = z => {
    const y0 = z.h - 8;
    const c0 = corps('q0-' + z.l, { x: 0, y: y0, pose: 'quadriceps' });
    const ep = 75 * E, mur = z.l - 10 - ep;          // la face du mur
    const x = mur - 1.5 - c0.mainP.x;                // la paume contre le mur
    const c = corps('q-' + z.l, { x, y: y0, pose: 'quadriceps' });
    return { y0, c, mur, ep };
  };
  // ── 3. Le bas du dos : couché sur le dos, les genoux ramenés sur la poitrine ──
  const geoDos = z => {
    const y0 = z.h - 8;
    const c0 = corps('d0-' + z.l, { x: 0, y: y0, pose: 'couche-genoux-poitrine' });
    const x = (z.l - (c0.boite.x1 - c0.boite.x0)) / 2 - c0.boite.x0;
    const c = corps('d-' + z.l, { x, y: y0, pose: 'couche-genoux-poitrine' });
    return { y0, c };
  };

  return {
    ref: '37-07',
    titre: 'Trois étirements du soir, muscles chauds',
    desc: 'Trois personnages de profil, en corps simples. Assis en long sur un banc, une jambe allongée dessus, l’autre pied au sol, le tronc penché en avant d’un bloc à partir des hanches, le dos droit, les mains vers la cheville ; une flèche rouge pour le tronc qui bascule. Debout face au mur, une main à plat au mur, l’autre main tient la cheville et amène le talon vers la fesse, les genoux côte à côte ; une flèche rouge pour le talon. Couché sur le dos, les deux genoux ramenés sur la poitrine, les mains sur les tibias ; une flèche rouge pour les genoux.',
    format: 'pleine',
    disposition: [['ischios', 'quadriceps'], ['dos']],
    hauteurs: [2.35, 1],
    largeurs: [[1.18, 1]],
    vues: {
      ischios: {
        titre: 'L’arrière de la cuisse',
        dessin: z => {
          const { y0, c, banc } = geoIschios(z), J = c.articulations, out = [];
          out.push(h.ligne(6, y0, z.l - 6, y0, A.arete));
          out.push(String(c));
          // le banc, par-dessus : son flanc cache la jambe loin qui passe derrière lui
          const top = banc, ep = 42 * E, g = c.siege[0] - 300 * E, d = Math.min(z.l - 8, c.boite.x1 + 40 * E);
          out.push(h.rect(g, top, d - g, ep, BLANC));
          for (const t of [0.36, 0.68]) out.push(h.ligne(g + 40 * E, top + ep * t, d - 60 * E, top + ep * t, A.fin));
          for (const xp of [g + 50 * E, d - 120 * E]) out.push(h.rect(xp, top + ep, 70 * E, y0 - top - ep, BLANC));
          // le geste : le tronc qui bascule d'un bloc à partir des hanches
          const H = J.hancheP, a1 = angleDe(H, J.cou);
          out.push(h.geste(arc(H, Math.hypot(J.cou[0] - H[0], J.cou[1] - H[1]) + 70 * E, a1 - 42, a1 - 6)));
          return out.join('\n');
        },
        renvois: z => {
          const { c } = geoIschios(z), J = c.articulations;
          // le dessous du mollet, posé sur le banc (le dessus est sous les bras et le tronc)
          const xt = J.genouP[0] + 0.3 * (J.chevilleP[0] - J.genouP[0]), ya = J.genouP[1] + 0.3 * (J.chevilleP[1] - J.genouP[1]);
          const tibia = [xt, Math.max(...coupesX(c, xt).filter(y => y > ya && y < ya + 80 * E))];
          // le milieu du dos : du milieu du tronc, vers l'arrière jusqu'au contour
          const m = fois(plus(J.bassin, J.cou), 0.5), u = uni([J.cou[0] - J.bassin[0], J.cou[1] - J.bassin[1]]), n = [u[1], -u[0]];
          const dos = plus(m, fois(n, 108 * E));
          return [
            { n: 1, rond: borne(z, [tibia[0] + 40, tibia[1] + 40]), cible: tibia, texte: 'une jambe allongée sur le banc' },
            { n: 2, rond: borne(z, [J.hancheP[0] - 50, J.hancheP[1] - 16]), cible: J.hancheP, texte: 'penché à partir des hanches' },
            { n: 3, rond: borne(z, [dos[0] - 52, dos[1] - 26]), cible: dos, texte: 'le dos reste droit' },
          ];
        },
      },
      quadriceps: {
        titre: 'L’avant de la cuisse',
        dessin: z => {
          const { y0, c, mur, ep } = geoQuad(z), J = c.articulations, out = [];
          out.push(h.ligne(6, y0, mur, y0, A.arete));
          // le mur, vu en coupe
          out.push(h.rect(mur, 4, ep, y0 - 4, A.hachure('bois')));
          out.push(h.ligne(mur, 4, mur, y0, A.arete));
          out.push(String(c));
          // le geste : le talon amené vers la fesse, la jambe qui tourne autour du genou
          const K = J.genouL, a = angleDe(K, J.chevilleL);
          out.push(h.geste(arc(K, Math.hypot(J.chevilleL[0] - K[0], J.chevilleL[1] - K[1]) + 70 * E, a - 34, a - 10)));
          return out.join('\n');
        },
        renvois: z => {
          const { c } = geoQuad(z), J = c.articulations;
          const talon = c.pieds.L.talon, genoux = plus(J.genouP, [40 * E + 6, 0]);
          return [
            { n: 4, rond: borne(z, [c.mainP.x - 52, c.mainP.y - 44]), cible: [c.mainP.x - 3, c.mainP.y], texte: 'une main au mur' },
            { n: 5, rond: borne(z, [c.mainL.x + 52, c.mainL.y + 44]), cible: [c.mainL.x, c.mainL.y], texte: 'l’autre main attrape la cheville' },
            { n: 6, rond: borne(z, [talon[0] - 26, talon[1] - 34]), cible: talon, texte: 'le talon vers la fesse' },
            { n: 7, rond: borne(z, [genoux[0] + 44, genoux[1] + 30]), cible: genoux, texte: 'genoux côte à côte' },
          ];
        },
      },
      dos: {
        titre: 'Le bas du dos',
        dessin: z => {
          const { y0, c } = geoDos(z), J = c.articulations, out = [];
          out.push(h.ligne(6, y0, z.l - 6, y0, A.arete));
          out.push(String(c));
          // le geste : les genoux ramenés vers la poitrine, la cuisse qui tourne autour de la hanche
          const H = J.hancheP, a = angleDe(H, J.genouP);
          out.push(h.geste(arc(H, Math.hypot(J.genouP[0] - H[0], J.genouP[1] - H[1]) + 110 * E, a + 40, a - 4)));
          return out.join('\n');
        },
        renvois: z => {
          const { c } = geoDos(z), J = c.articulations;
          const genou = plus(J.genouP, [-30 * E, -52 * E]);
          return [
            { n: 8, rond: borne(z, [genou[0] - 74, genou[1] + 44]), cible: genou, texte: 'les deux genoux vers la poitrine' },
            { n: 9, rond: borne(z, [c.mainP.x + 60, c.mainP.y - 20]), cible: [c.mainP.x, c.mainP.y], texte: 'ramenés avec les bras' },
          ];
        },
      },
    },
  };
};
