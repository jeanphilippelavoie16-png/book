// Planche 106-10a — La sciotte à cadre.
// Chapitre 102, §9-A « Fabriquer la sciotte » : deux montants de bois franc de la longueur de
// l'avant-bras, traverse encochée à mi-hauteur, lame goupillée de deux clous en travers des
// pieds, corde en plusieurs tours entre les têtes, bâton-tourniquet bloqué contre la traverse.
//
// Mécanique dessinée : la traverse est le pivot. La corde qui raccourcit RAPPROCHE les têtes,
// les pieds s'ÉCARTENT et tendent la lame. (Le chapitre dit l'inverse à la ligne 486 : « écarte
// les têtes, et les pieds des montants se rapprochent » — ce qui détendrait la lame.)
//
// Ajouts nécessaires pour que le montage tienne, absents du texte : un trait de scie dans
// chaque pied pour loger la lame, une encoche au dos de chaque tête pour tenir les tours de
// corde, et l'encoche de la traverse lue comme une fourche à cheval sur le montant.

module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const blancContour = h.a.contour.replace('fill="none"', 'fill="#FFFFFF"');
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const tiretFin = h.a.fin + ' stroke-dasharray="3 3"';

  // Brisure en zigzag, verticale ou horizontale.
  const brisureV = (x, y1, y2, pas = 7, amp = 4) => {
    const pts = [];
    const n = Math.max(2, Math.round(Math.abs(y2 - y1) / pas));
    for (let i = 0; i <= n; i++) pts.push([x + (i % 2 ? amp : -amp) * (i === 0 || i === n ? 0 : 1), y1 + (y2 - y1) * i / n]);
    return pts;
  };
  const brisureH = (y, x1, x2, pas = 7, amp = 4) => {
    const pts = [];
    const n = Math.max(2, Math.round(Math.abs(x2 - x1) / pas));
    for (let i = 0; i <= n; i++) pts.push([x1 + (x2 - x1) * i / n, y + (i % 2 ? amp : -amp) * (i === 0 || i === n ? 0 : 1)]);
    return pts;
  };

  // ── De face : toute la scie ──────────────────────────────────────────────────────────
  const geoFace = (z) => {
    const w = 16;                          // largeur du montant dans le plan de la scie
    const xL = 78, xR = z.l - 150;         // faces extérieures des montants
    const yT = 46, yB = z.h - 48;          // têtes, pieds (le pied arrive au ras des dents)
    const yM = Math.round((yT + yB) / 2);  // traverse à mi-hauteur
    const yN = yT + 16;                    // encoche de la corde, au dos de la tête
    const xc = Math.round((xL + xR) / 2);  // milieu : le bâton
    const dent = 9, pas = 8, lame = 16;    // hauteur de dent, pas, largeur de lame
    const yClou = yB - 8;
    const prise = 12;                      // longueur de la fourche de la traverse sur le montant
    return { w, xL, xR, yT, yB, yM, yN, xc, dent, pas, lame, yClou, prise };
  };

  // ── Le pied, coupé en travers au clou ────────────────────────────────────────────────
  const geoPied = (z) => {
    const cx = Math.round(z.l / 2) - 6;
    const t = 64, s = 8;                   // épaisseur du montant, largeur du trait de scie
    const yB = z.h - 56, yH = 22;          // pied, haut de la vue (brisure)
    const Ks = 112, Kb = 84;               // profondeur du trait, largeur de la lame
    const yClou = yB - 40;
    return { cx, t, s, yB, yH, Ks, Kb, yClou };
  };

  // ── À mi-hauteur, de dessus ──────────────────────────────────────────────────────────
  const geoTrav = (z) => {
    const ux = 34, uw = 40, ut = 34;       // montant coupé : largeur, épaisseur
    const pr = 12, prof = 30;              // joue de la fourche, profondeur de l'encoche
    const cz = Math.round(z.h / 2) - 14;
    const xb1 = ux + uw + 70, xb2 = xb1 + 22, xfin = z.l - 18;
    const xs = Math.round((xb2 + xfin) / 2) + 4;
    const demi = ut / 2 + pr;              // demi-épaisseur de la traverse
    return { ux, uw, ut, pr, prof, cz, xb1, xb2, xfin, xs, demi };
  };

  return {
    ref: '106-10a',
    titre: 'La sciotte à cadre',
    desc: 'Une scie à cadre montée sur une lame seule. De face : deux montants de bois franc, de la ' +
      'longueur de l’avant-bras, debout de chaque côté ; une traverse horizontale à mi-hauteur entre ' +
      'eux ; la lame tendue entre les pieds, dents en bas, chaque bout logé dans un trait de scie du ' +
      'pied et tenu par un clou en travers ; en haut, une corde en plusieurs tours d’une tête à l’autre, ' +
      'logée dans une encoche au dos de chaque tête, tordue au milieu par un bâton passé dans les tours, ' +
      'dont le bout descend s’appuyer contre la traverse. Des flèches montrent les têtes qui se ' +
      'rapprochent quand la corde raccourcit, et les pieds qui s’écartent en tendant la lame : la traverse ' +
      'sert de pivot. En bas à gauche, le pied coupé en travers au clou : le trait de scie, la lame ' +
      'dedans, le clou qui traverse les deux joues et la lame. En bas à droite, vue de dessus à ' +
      'mi-hauteur : le bout de la traverse est encoché en fourche et chevauche le montant, et le bout ' +
      'du bâton s’appuie contre le devant de la traverse.',
    format: 'pleine',
    disposition: [['face'], ['pied', 'trav']],
    hauteurs: [5, 3],
    largeurs: [[1], [1, 1]],
    vues: {
      face: {
        titre: 'De face',
        dessin: (z) => {
          const g = geoFace(z);
          const { w, xL, xR, yT, yB, yM, yN, xc, dent, pas, lame, yClou, prise } = g;
          const out = [];

          // Montants, avec l'encoche de corde au dos de la tête.
          out.push(h.path(`M${xL} ${yT} L${xL + w} ${yT} L${xL + w} ${yB} L${xL} ${yB} L${xL} ${yN + 5} ` +
            `L${xL + 5} ${yN} L${xL} ${yN - 5} Z`, blancContour));
          out.push(h.path(`M${xR} ${yT} L${xR - w} ${yT} L${xR - w} ${yB} L${xR} ${yB} L${xR} ${yN + 5} ` +
            `L${xR - 5} ${yN} L${xR} ${yN - 5} Z`, blancContour));

          // Trait de scie dans chaque pied (caché), bout de lame dedans (caché), tête de clou.
          for (const [xo, sg] of [[xL, 1], [xR, -1]]) {
            const xi = xo + sg * w;
            out.push(h.ligne(xo + sg * 2, yB - lame - 6, xi, yB - lame - 6, h.a.cache));
            out.push(h.ligne(xo + sg * 3, yB - lame, xi, yB - lame, h.a.cache));
            out.push(h.ligne(xo + sg * 3, yB - lame, xo + sg * 3, yB, h.a.cache));
            out.push(h.cercle(xo + sg * w / 2, yClou, 2.6, h.a.plein));
          }

          // Traverse, fourche par-dessus le montant ; le fond de l'encoche porte sur le montant.
          out.push(h.rect(xL + w - prise, yM - 7, (xR - w + prise) - (xL + w - prise), 14, blancArete));
          out.push(h.ligne(xL + w, yM - 7, xL + w, yM + 7, h.a.cache));
          out.push(h.ligne(xR - w, yM - 7, xR - w, yM + 7, h.a.cache));

          // Lame : dos, dents en bas entre les montants.
          out.push(h.ligne(xL + w, yB - lame, xR - w, yB - lame, h.a.arete));
          const xa = xL + w + 4, xb = xR - w - 4;
          const n = Math.floor((xb - xa) / pas);
          const x0 = xa + ((xb - xa) - n * pas) / 2;
          let d = `M${xL + w} ${yB} L${f(x0)} ${yB}`;
          for (let i = 0; i < n; i++) d += ` L${f(x0 + i * pas + pas / 2)} ${yB + dent} L${f(x0 + (i + 1) * pas)} ${yB}`;
          d += ` L${xR - w} ${yB}`;
          out.push(h.path(d, h.a.arete));

          // Corde : trois tours de chaque tête vers le milieu, puis la torsade de part et d'autre du bâton.
          const xt0 = xc - 54, xt1 = xc + 54;
          for (let i = -1; i <= 1; i++) {
            out.push(h.ligne(xL + 4, yN + i * 3, xt0, yN + i * 1.5, h.a.detail));
            out.push(h.ligne(xR - 4, yN + i * 3, xt1, yN + i * 1.5, h.a.detail));
          }
          const torsade = (xa2, xb2, phase) => {
            const pts = [];
            for (let x = xa2; x <= xb2 + 0.1; x += 1.5) pts.push([x, yN + 3.2 * Math.sin((x - xa2) / 12 * 2 * Math.PI + phase)]);
            return pts;
          };
          out.push(h.chemin(torsade(xt0, xc - 5, 0), h.a.detail), h.chemin(torsade(xt0, xc - 5, Math.PI), h.a.detail));
          out.push(h.chemin(torsade(xc + 5, xt1, 0), h.a.detail), h.chemin(torsade(xc + 5, xt1, Math.PI), h.a.detail));

          // Bâton : passé dans les tours, le bout bas appuyé contre la traverse.
          const yS0 = yN - 36, yS1 = yM + 3;
          out.push(h.path(`M${xc - 4} ${yS0 + 4} Q${xc - 4} ${yS0} ${xc} ${yS0} Q${xc + 4} ${yS0} ${xc + 4} ${yS0 + 4} ` +
            `L${xc + 4} ${yS1 - 4} Q${xc + 4} ${yS1} ${xc} ${yS1} Q${xc - 4} ${yS1} ${xc - 4} ${yS1 - 4} Z`, blancArete));
          out.push(h.ligne(xc - 6, yN - 2.5, xc + 6, yN - 2.5, h.a.detail));
          out.push(h.ligne(xc - 6, yN + 1.5, xc + 6, yN + 1.5, h.a.detail));

          // Le mouvement : têtes vers l'intérieur, pieds vers l'extérieur.
          const yFh = yN + 16, yFp = yB - 44;
          out.push(h.fleche(`M${xL - 44} ${yFh} L${xL - 8} ${yFh}`));
          out.push(h.fleche(`M${xR + 44} ${yFh} L${xR + 8} ${yFh}`));
          out.push(h.fleche(`M${xL - 8} ${yFp} L${xL - 44} ${yFp}`));
          out.push(h.fleche(`M${xR + 8} ${yFp} L${xR + 44} ${yFp}`));

          // Traits de coupe : A au clou du pied gauche, B en travers du montant au-dessus de la traverse.
          const mixte = h.a.contour + ' stroke-dasharray="9 3 2 3"';
          const xA = xL + w / 2;
          out.push(h.ligne(xA, yClou - 12, xA, yClou + 14, mixte));
          out.push(h.fleche(`M${xA} ${yClou - 12} L${xA - 14} ${yClou - 12}`), h.fleche(`M${xA} ${yClou + 14} L${xA - 14} ${yClou + 14}`));
          out.push(h.texte(xA - 22, yClou + 4, 'A', { ancre: 'middle' }));
          const yBc = yM - 16;
          out.push(h.ligne(xL - 10, yBc, xL + w + 10, yBc, mixte));
          out.push(h.fleche(`M${xL - 10} ${yBc} L${xL - 10} ${yBc + 13}`), h.fleche(`M${xL + w + 10} ${yBc} L${xL + w + 10} ${yBc + 13}`));
          out.push(h.texte(xL - 22, yBc + 4, 'B', { ancre: 'middle' }));

          // Cote : le montant fait la longueur de l'avant-bras.
          const xk = xR + 62;
          out.push(h.ligne(xR + 4, yT, xk + 6, yT, h.a.fin), h.ligne(xR + 4, yB, xk + 6, yB, h.a.fin));
          out.push(h.cote(xk, yT, xk, yB, 'un avant-bras', { cote: 'droite' }));

          return out.join('\n');
        },
        renvois: (z) => {
          const { w, xL, xR, yT, yB, yM, yN, xc, yClou } = geoFace(z);
          const yU = Math.round(yT + (yB - yT) * 0.38);
          return [
            { n: 1, rond: [xL - 34, yU], cible: [xL + w / 2, yU], texte: 'montant de bois franc' },
            { n: 2, rond: [xL + 150, yM + 40], cible: [xL + 150, yM + 5], texte: 'traverse encochée, le pivot' },
            { n: 3, rond: [xL + 44, yB + 30], cible: [xL + w / 2 + 2.6, yClou], texte: 'lame goupillée au pied' },
            { n: 4, rond: [xL + 86, yT - 20], cible: [xL + 86, yN - 2], texte: 'corde en plusieurs tours' },
            { n: 5, rond: [xc + 44, yT - 20], cible: [xc + 3, yN - 26], texte: 'bâton qu’on tourne' },
            { n: 6, rond: [xR + 26, yB - 80], cible: [xR + 30, yB - 46], texte: 'pieds écartés : lame tendue' },
          ];
        },
      },

      pied: {
        titre: 'Le pied, coupé en travers au clou — A',
        dessin: (z) => {
          const { cx, t, s, yB, yH, Ks, Kb, yClou } = geoPied(z);
          const out = [];
          const xg = cx - t / 2, xd = cx + t / 2;
          const ys = yB - Ks;
          // Le bois coupé : plein en haut, deux joues de part et d'autre du trait de scie.
          const haut = brisureH(yH, xg, xd);
          const d = `M${xg} ${yB} L${xg} ${yH} ` + haut.slice(1).map(p => `L${f(p[0])} ${f(p[1])}`).join(' ') +
            ` L${xd} ${yB} L${cx + s / 2} ${yB} L${cx + s / 2} ${ys} L${cx - s / 2} ${ys} L${cx - s / 2} ${yB} Z`;
          out.push(h.path(d, h.a.hachure('bois', 'contour')));
          // La lame, vue sur la tranche : dans le trait, puis ses dents sous le pied.
          out.push(h.rect(cx - 1.5, yB - Kb, 3, Kb + 22, h.a.plein));
          // Le clou : tête à gauche, pointe qui ressort à droite.
          out.push(h.rect(xg - 10, yClou - 2, (xd + 10) - (xg - 10), 4, h.a.plein));
          out.push(h.rect(xg - 13, yClou - 8, 3.5, 16, h.a.plein));
          out.push(h.path(`M${xd + 10} ${yClou - 2} L${xd + 17} ${yClou} L${xd + 10} ${yClou + 2} Z`, h.a.plein));
          return out.join('\n');
        },
        renvois: (z) => {
          const { cx, t, yB, Ks, Kb, yClou } = geoPied(z);
          const ymid = yB - (Ks + Kb) / 2;
          return [
            { n: 7, rond: [cx + t / 2 + 44, yB - Ks - 6], cible: [cx + 2, ymid], texte: 'trait de scie dans le pied' },
            { n: 8, rond: [cx - t / 2 - 42, yClou + 44], cible: [cx - t / 2 - 12, yClou + 6], texte: 'clou à travers bois et lame' },
          ];
        },
      },

      trav: {
        titre: 'À mi-hauteur, de dessus — B',
        dessin: (z) => {
          const { ux, uw, ut, prof, cz, xb1, xb2, xfin, xs, demi } = geoTrav(z);
          const out = [];
          const xe = ux + uw - prof;              // bout de la fourche
          const xn = ux + uw;                     // fond de l'encoche = face intérieure du montant
          // Traverse, premier morceau : fourche à cheval sur le montant, brisure à droite.
          const b1 = brisureV(xb1, cz - demi, cz + demi);
          out.push(h.path(`M${xe} ${cz - demi} L${xb1} ${cz - demi} ` +
            b1.slice(1).map(p => `L${f(p[0])} ${f(p[1])}`).join(' ') +
            ` L${xe} ${cz + demi} L${xe} ${cz + ut / 2} L${xn} ${cz + ut / 2} L${xn} ${cz - ut / 2} L${xe} ${cz - ut / 2} Z`, h.a.contour));
          // Deuxième morceau, vers le milieu de la scie, entre deux brisures.
          const b2 = brisureV(xb2, cz - demi, cz + demi), b3 = brisureV(xfin, cz - demi, cz + demi);
          out.push(h.path(`M${xb2} ${cz - demi} L${xfin} ${cz - demi} ` +
            b3.slice(1).map(p => `L${f(p[0])} ${f(p[1])}`).join(' ') +
            ` L${xb2} ${cz + demi} ` + b2.slice().reverse().slice(1).map(p => `L${f(p[0])} ${f(p[1])}`).join(' ') + ' Z', h.a.contour));
          // Fil du bois de la traverse.
          for (const dy of [-demi / 2, demi / 2]) {
            out.push(h.ligne(xn + 8, cz + dy, xb1 - 10, cz + dy, h.a.fin));
            out.push(h.ligne(xb2 + 10, cz + dy + 3, xfin - 10, cz + dy + 3, h.a.fin));
          }
          // Le montant, coupé juste au-dessus de la traverse.
          out.push(h.rect(ux, cz - ut / 2, uw, ut, h.a.hachure('bois', 'contour')));
          // Le bâton, coupé au même niveau : il est descendu devant la traverse et s'y appuie.
          out.push(h.cercle(xs, cz + demi + 7, 7, h.a.hachure('bois', 'arete')));
          return out.join('\n');
        },
        renvois: (z) => {
          const { ux, uw, ut, prof, cz, xs, demi } = geoTrav(z);
          const xe = ux + uw - prof;
          return [
            { n: 9, rond: [xe + 10, cz + demi + 42], cible: [xe + prof / 2, cz + ut / 2 + 6], texte: 'fourche sur le montant' },
            { n: 10, rond: [xs + 44, cz + demi + 42], cible: [xs + 3, cz + demi + 9], texte: 'bâton appuyé sur la traverse' },
          ];
        },
      },
    },
  };
};
