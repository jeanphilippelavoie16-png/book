// Petite planche « en plus » du ch. 12 : le corps mort (étape 13). Une colonne (format quart, 340 × 413), posée dans
// l'encadré « En plus » vert pâle, pas dans la procédure : le nom ne commence pas par « 12-0 » et le rendu va dans
// images/extras/, que le moteur ne fouille pas.
//
// Le texte (étape 13) : creuser un trou dans la neige, attacher le cordon à une perche ou à une bille d'environ 1 m,
// la coucher au fond du trou, puis remplir le trou de neige bien tassée ; en peu de temps, la neige gèle et tient la
// tente. Source : FM 31-70, ch. 3, l. 139 (sources/12-fm31-70-amarrage-feu-de-billes-lit-de-branches.md).
//
// Deux vues, à la même échelle, dans l'ordre des gestes :
//   avant de remplir, vu de dessus : le trou ouvert, la perche couchée au fond, en travers du cordon, le cordon
//     noué au milieu qui part vers la tente (vers le haut de la vue) ; la seule cote, « environ 1 m », sur la perche ;
//   rempli et tassé, en coupe, dans l'axe du cordon (la tente à droite) : la perche vue par le bout au fond du trou,
//     le cordon qui remonte dans la neige tassée jusqu'au bord du trou, puis en biais vers la tente ; la flèche rouge
//     du geste : tasser la neige dans le trou.
// Le cordon est noué au milieu et la perche couchée en travers de lui : c'est de la géométrie (la perche tire à plat
// contre la neige, sans pivoter) ; 12-01b montre déjà le corps mort « couché en travers du tirant ».
// Aucune autre dimension n'est dans le chapitre ni dans la source : la taille du trou, sa profondeur et l'angle du
// cordon sont des proportions, sans cote.
//
// Les deux neiges : la neige en place en points espacés (motif « neige ») ; la neige tassée qui remplit le trou en
// points serrés (motif « neige-tassee », défini ici : le composeur n'a pas de motif pour la neige tassée).

module.exports = (h) => {
  const A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');

  // ─── Géométrie, en mètres.
  const G = {
    Lp: 1.0,       // la perche : environ 1 m (la seule mesure du texte)
    Dp: 0.10,      // son diamètre (proportion)
    Lt: 1.2,       // le trou : un peu plus long que la perche
    Wt: 0.40,      // sa largeur
    Dt: 0.45,      // sa profondeur
    sous: 0.10,    // la neige dessinée sous le fond du trou
    theta: 30,     // l'angle du cordon au-dessus de la neige, vers la tente
  };
  const K = 128;   // pixels par mètre, dans les deux vues

  // La neige tassée : les mêmes points que la neige en place, quatre fois plus serrés.
  const DEFS = '<defs><pattern id="h-neige-tassee" width="4" height="4" patternUnits="userSpaceOnUse">'
    + '<circle cx="1" cy="1" r="0.55" fill="#1A1A1A" stroke="none"/><circle cx="3" cy="3" r="0.55" fill="#1A1A1A" stroke="none"/>'
    + '</pattern></defs>';
  const tassee = 'fill="url(#h-neige-tassee)" stroke="none"';
  const neige = A.hachure('neige', 'aucun');
  const pair = s => s.replace('fill=', 'fill-rule="evenodd" fill=');   // un champ de neige troué par le trou

  // ─── Vu de dessus : la perche couchée en long dans la vue, le cordon part vers le haut (vers la tente).
  const P = z => {
    const k = K, xc = z.l / 2;
    const yc = z.h - 62;                                   // milieu du trou ; dessous : la cote
    const lt = G.Lt * k / 2, wt = G.Wt * k / 2;            // demi-longueur, demi-largeur du trou
    const lp = G.Lp * k / 2, rp = G.Dp * k / 2;            // demi-longueur, rayon de la perche
    return { k, xc, yc, lt, wt, lp, rp };
  };

  // ─── En coupe : la perche vue par le bout ; la tente est à droite.
  const C = z => {
    const k = K;
    const ys = z.h - (G.Dt + G.sous) * k;                  // la surface de la neige
    const xc = z.l * 0.34;                                 // le milieu du trou
    const hw = G.Wt * k / 2, yb = ys + G.Dt * k;           // demi-largeur, fond du trou
    const r = G.Dp * k / 2;
    const pc = [xc, yb - r - 1.2];                         // le centre de la perche, posée au fond
    const rw = r + 2.2;                                    // les tours du cordon autour de la perche
    const lev = [xc + hw - 4, ys];                         // le cordon sort de la neige au bord du trou, côté tente
    // Le point où le cordon quitte les tours, tangent, du côté du dessus de la perche.
    const dx = lev[0] - pc[0], dy = lev[1] - pc[1], d = Math.hypot(dx, dy);
    const phi = Math.atan2(dy, dx), beta = Math.acos(rw / d);
    const tg = [pc[0] + rw * Math.cos(phi - beta), pc[1] + rw * Math.sin(phi - beta)];
    // Au-dessus de la neige : en biais vers la tente, jusqu'au bord de la vue.
    const th = G.theta * Math.PI / 180, u = [Math.cos(th), -Math.sin(th)];
    const t = Math.min((z.l - 1 - lev[0]) / u[0], (lev[1] - 1) / -u[1]);
    const fin = [lev[0] + t * u[0], lev[1] + t * u[1]];
    const xg = xc - hw * 0.38;                             // la flèche du geste : tasser, au-dessus du trou
    return { k, ys, xc, hw, yb, r, pc, rw, lev, tg, fin, u, xg };
  };

  return {
    ref: '12, en plus',
    titre: 'Le corps mort',
    fichier: 'extras/12-corps-mort.svg',
    desc: 'Le corps mort qui tient un cordon de la tente dans la neige, en deux vues. Vu de dessus, avant de remplir : un trou un peu plus long que la perche, creusé dans la neige ; au fond, une perche d’environ 1 m couchée en travers du cordon ; le cordon est noué au milieu de la perche et part vers la tente. En coupe, une fois rempli : la perche vue par le bout, au fond du trou ; le trou rempli de neige bien tassée jusqu’à la surface ; le cordon remonte dans la neige tassée jusqu’au bord du trou, du côté de la tente, puis en biais au-dessus de la neige vers la tente. Une flèche rouge, vers le bas, sur le trou : tasser la neige.',
    format: 'quart',
    disposition: [['plan'], ['coupe']],
    hauteurs: [131, 145],
    vues: {
      plan: {
        titre: 'Avant de remplir, vu de dessus',
        dessin: z => {
          const { xc, yc, lt, wt, lp, rp } = P(z), out = [];
          // La neige autour du trou, puis le trou : le fond, plus loin de l'œil, en gris. Les points s'arrêtent autour du
          // texte de la cote, pour qu'on le lise.
          const yq = yc + wt + 13, wq = h.largeur('environ 1 m', 12) / 2 + 4;
          out.push(h.path(`M 0 0 H ${z.l} V ${z.h} H 0 Z M ${f(xc - lt)} ${f(yc - wt)} V ${f(yc + wt)} H ${f(xc + lt)} V ${f(yc - wt)} Z `
            + `M ${f(xc - wq)} ${f(yq + 3)} V ${f(yq + 20)} H ${f(xc + wq)} V ${f(yq + 3)} Z`, pair(neige)));
          out.push(h.rect(xc - lt, yc - wt, 2 * lt, 2 * wt, A.loin));
          out.push(h.rect(xc - lt, yc - wt, 2 * lt, 2 * wt, A.arete));
          // La perche, couchée au fond, en travers du cordon : ronde, sa face du bas à l'ombre.
          out.push(h.rect(xc - lp, yc - rp, 2 * lp, 2 * rp, blanc(A.contour)));
          out.push(h.rect(xc - lp + 1.2, yc + rp * 0.2, 2 * lp - 2.4, rp * 0.8 - 1.2, A.ombre));
          out.push(h.rect(xc - lp, yc - rp, 2 * lp, 2 * rp, A.contour));
          // Le nœud au milieu : deux tours serrés en travers de la perche, et le cordon qui part vers la tente.
          for (const dxk of [-3.2, 3.2]) out.push(h.ligne(xc + dxk - 2.6, yc + rp, xc + dxk + 2.6, yc - rp, A.arete));
          out.push(h.path(`M ${f(xc + 5.8)} ${f(yc - rp)} C ${f(xc + 6.8)} ${f(yc - rp - 4)} ${f(xc + 4)} ${f(yc - rp - 6)} ${f(xc + 4)} ${f(yc - rp - 12)} L ${f(xc + 4)} 0`, A.arete));
          // La cote : la longueur de la perche, sous le trou, avec ses lignes d'attache.
          for (const s of [-1, 1]) out.push(h.ligne(xc + s * lp, yc + rp + 2.5, xc + s * lp, yq + 4, A.fin));
          out.push(h.cote(xc - lp, yq, xc + lp, yq, 'environ 1 m', { cote: 'dessous' }));
          return out.join('\n');
        },
        renvois: z => {
          const { xc, yc, rp } = P(z);
          return [
            { n: 1, rond: [xc + 50, 16], cible: [xc + 6.5, yc - rp - 1.5], texte: 'nouer le cordon au milieu de la perche' },
          ];
        },
      },
      coupe: {
        titre: 'Rempli et tassé, en coupe',
        dessin: z => {
          const { ys, xc, hw, yb, r, pc, rw, lev, tg, fin, xg } = C(z), out = [];
          // La neige en place, trouée par le trou ; la neige tassée qui le remplit.
          out.push(h.path(`M 0 ${f(ys)} H ${z.l} V ${z.h} H 0 Z M ${f(xc - hw)} ${f(ys)} V ${f(yb)} H ${f(xc + hw)} V ${f(ys)} Z`, pair(neige)));
          out.push(h.rect(xc - hw, ys, 2 * hw, yb - ys, tassee));
          // Les parois et le fond du trou ; la surface de la neige.
          out.push(h.chemin([[xc - hw, ys], [xc - hw, yb], [xc + hw, yb], [xc + hw, ys]], A.arete));
          out.push(h.ligne(0, ys, z.l, ys, A.arete));
          // La perche, vue par le bout : l'écorce, deux cernes.
          out.push(h.cercle(pc[0], pc[1], rw, blanc(A.arete)));
          out.push(h.cercle(pc[0], pc[1], r, blanc(A.contour)));
          out.push(h.cercle(pc[0], pc[1], r * 0.62, A.fin));
          out.push(h.cercle(pc[0], pc[1], r * 0.28, A.fin));
          // Le cordon : il quitte les tours, remonte dans la neige tassée, sort au bord du trou et file vers la tente.
          out.push(h.chemin([tg, lev, fin], A.arete));
          // Le geste : tasser la neige dans le trou.
          out.push(h.geste(`M ${f(xg)} ${f(ys - 36)} L ${f(xg)} ${f(ys - 6)}`));
          return DEFS + '\n' + out.join('\n');
        },
        renvois: z => {
          const { ys, xc, hw, pc, r, rw, xg } = C(z);
          return [
            { n: 2, rond: [xc - hw - 30, pc[1] - 2], cible: [pc[0] - rw - 0.5, pc[1]], texte: 'coucher la perche au fond du trou' },
            { n: 3, rond: [xg - 30, ys - 30], cible: [xg - 8, ys + 14], texte: 'remplir de neige bien tassée' },
          ];
        },
      },
    },
  };
};
