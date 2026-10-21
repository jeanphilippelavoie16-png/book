// Planche 48-08 — l'œillet et le verrou du collet (chapitre 44, §9 « L'œillet » et « Le verrou de fortune »)
module.exports = (h) => {
  const r = (n) => Math.round(n * 10) / 10;
  const blanc = h.a.arete.replace('fill="none"', 'fill="#fff"');
  const tole0 = h.a.contour.replace('fill="none"', 'fill="#fff"');
  // Un fil vu au trait : un tube (contour noir de chaque côté, âme blanche). Le fil est l'objet
  // principal : son contour pèse 2,4 ; seul le fil des petits verrous de l'essai garde 1,4.
  const fil = (d, w, cap = 'round', e = w >= 5 ? 2.4 : 1.4) => [
    h.path(d, `fill="none" stroke="#000" stroke-width="${r(w + 2 * e)}" stroke-linecap="${cap}" stroke-linejoin="round"`),
    h.path(d, `fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="round"`),
  ].join('\n');
  const pt = (cx, cy, R, deg) => [r(cx + R * Math.cos(deg * Math.PI / 180)), r(cy + R * Math.sin(deg * Math.PI / 180))];
  // La petite boucle ronde, ouverte vers le bas ; ses deux brins redescendent en xg et xd.
  const boucle = (ex, ey, Re, w, xg, xd) => {
    const yn = r(ey + Re + 1.2 * w), k = 0.45 * Re;
    const p1 = pt(ex, ey, Re, 130), p2 = pt(ex, ey, Re, 50);
    return { yn, d: `M ${xg} ${yn} C ${xg} ${r(yn - 0.5 * (yn - p1[1]))} ${r(p1[0] + 0.766 * k)} ${r(p1[1] + 0.643 * k)} ${p1[0]} ${p1[1]} `
      + `A ${Re} ${Re} 0 1 1 ${p2[0]} ${p2[1]} C ${r(p2[0] - 0.766 * k)} ${r(p2[1] + 0.643 * k)} ${xd} ${r(yn - 0.5 * (yn - p2[1]))} ${xd} ${yn}` };
  };
  // Les tours jointifs du bout libre sur le brin dormant (axe vertical en x = ex).
  const tours = (ex, y0, n, w) => Array.from({ length: n }, (_, i) =>
    fil(`M ${r(ex - w)} ${r(y0 + i * w)} L ${r(ex + w)} ${r(y0 + i * w + 0.5 * w)}`, w)).join('\n');

  // Le carré de fer-blanc à plat, vu en fuite, et la rondelle posée dans le même plan.
  // pl(u, q) : u le long du bord avant, q dans la profondeur (0 à 1 du côté).
  const plat = z => {
    const s = 64, v = [10, -44], ax = 100, ay = z.h - 30;
    const pl = (u, q) => [r(ax + u + q * v[0]), r(ay + q * v[1])];
    const rond = (c, R, n = 48) => Array.from({ length: n }, (_, i) => {
      const t = 2 * Math.PI * i / n;
      return [r(c[0] + R * Math.cos(t) + R * Math.sin(t) * v[0] / s), r(c[1] + R * Math.sin(t) * v[1] / s)];
    });
    return { s, v, ax, ay, pl, rond, arret: pl(s / 4, 0.5), passage: pl(3 * s / 4, 0.5), rondelle: [z.l - 34, 44] };
  };

  // Le verrou monté, vu dans le plan de la boucle. La tôle pliée d'équerre : la branche du haut porte le trou
  // d'arrêt, celle qui descend le trou de passage. La profondeur fuit vers le bas à droite : on voit le dessous
  // de la branche du haut et la face extérieure de celle qui descend. Le fil court à mi-profondeur de la tôle.
  // bL, bH : jusqu'où la boucle s'étend à gauche et en bas ; yHaut : où le fil part vers l'attache.
  const verrou = (Cx, Cy, k, bL, bH, yHaut) => {
    // le dessous de la branche du haut est la face à l'ombre ; trop mince pour l'ombre en petit (essai)
    const dessous = k >= 1 ? [h.a.ombre, h.a.contour] : [tole0];
    const a = 48 * k, w = r(5 * k), dx = r(16 * k), dy = r(11 * k);
    const X = x => r(x + dx / 2), Y = y => r(y + dy / 2);
    const tole = h.a.contour.replace('fill="none"', 'fill="#fff"');
    const e = w / 2 + 1.4 + 2 * k;                     // le fil plaqué sous la tôle, au ras de l'arrêt
    const xs = Cx - a / 2, yh = Cy + a / 2;            // trou d'arrêt, trou de passage
    const x0 = Cx - a - 4 * k, Lx = Cx - a - bL, By = Cy + bH, Rx = Cx - 14 * k, xb = (Lx + Rx) / 2, K = 0.55;
    const ya = Cy + e, ym = ya + 0.45 * (By - ya), ym2 = yh + 10 * k + 0.35 * (By - yh);
    const boucle = [
      `M ${X(xs)} ${Y(Cy)} Q ${X(xs)} ${Y(ya)} ${X(xs - e)} ${Y(ya)} L ${X(x0)} ${Y(ya)}`,
      `C ${X(x0 - K * (x0 - Lx))} ${Y(ya)} ${X(Lx)} ${Y(ym - K * (ym - ya))} ${X(Lx)} ${Y(ym)}`,
      `C ${X(Lx)} ${Y(ym + K * (By - ym))} ${X(xb - K * (xb - Lx))} ${Y(By)} ${X(xb)} ${Y(By)}`,
      `C ${X(xb + K * (Rx - xb))} ${Y(By)} ${X(Rx)} ${Y(ym2 + K * (By - ym2))} ${X(Rx)} ${Y(ym2)}`,
      `L ${X(Rx)} ${Y(yh + 10 * k)} Q ${X(Rx)} ${Y(yh)} ${X(Rx + 10 * k)} ${Y(yh)} L ${X(Cx + 1)} ${Y(yh)}`,
    ].join(' ');
    const xr = Cx + 18 * k;
    const court = `M ${X(Cx)} ${Y(yh)} L ${X(xr - 10 * k)} ${Y(yh)} Q ${X(xr)} ${Y(yh)} ${X(xr)} ${Y(yh - 10 * k)} L ${X(xr)} ${yHaut}`;
    const n = k < 0.75 ? 3 : 4, ex = X(xs), y0 = r(Y(Cy) - (n + 0.6) * w);
    const svg = [
      fil(`M ${ex} ${Y(Cy)} L ${ex} ${r(y0 - 0.6 * w)}`, w),        // le bout, sorti du trou d'arrêt
      tours(ex, y0, n, w),                                           // enroulé sur lui-même derrière la tôle
      ...dessous.map(at => h.chemin([[Cx - a, Cy], [Cx, Cy], [Cx + dx, Cy + dy], [Cx - a + dx, Cy + dy]], at, true)),
      h.ellipse(ex, Y(Cy), r(w / 2 + 2.6), r(2.6 * k + 0.6), h.a.plein),
      fil(boucle, w, 'butt'),                                        // plié d'équerre, la boucle, vers le trou de passage
      h.chemin([[Cx, Cy], [Cx, Cy + a], [Cx + dx, Cy + a + dy], [Cx + dx, Cy + dy]], tole, true),
      h.ellipse(X(Cx), Y(yh), r(2.4 * k + 0.4), r(w / 2 + 2.6), h.a.plein),
      fil(court, w, 'butt'),                                         // ressorti par la face extérieure
    ].join('\n');
    return { svg, a, w, ex, y0, hx: X(Cx), hy: Y(yh), xr: X(xr), yr: Y(yh - 10 * k), Cx, Cy, dx, dy };
  };

  return {
    ref: '48-08',
    titre: 'L’œillet et le verrou du collet',
    desc: 'Le bout du fil replié sur la longueur d’un doigt en petite boucle ronde, le bout libre enroulé en tours serrés et jointifs sur le brin dormant, l’autre bout passé dans la boucle pour faire le collet ; puis le verrou : un carré de fer-blanc découpé dans une conserve, percé de deux trous de part et d’autre du pli, l’un pour arrêter le bout du fil, l’autre, plus fin, pour le laisser passer ; plié d’équerre ; le bout du fil arrêté dans son trou par des tours serrés sur lui-même, du côté extérieur, l’autre extrémité entrée dans le trou de passage par la face intérieure de l’équerre et ressortie par la face extérieure, vers l’attache, pour faire la boucle. Le verrou remplace l’œillet.',
    format: 'pleine',
    disposition: [['plier', 'enrouler', 'collet'], ['ferblanc', 'monte', 'essai']],
    // la rangée du haut garde exactement sa hauteur (vues de 360) malgré la légende d'une ligne de plus
    hauteurs: [382.5, 238.5],
    largeurs: [[1, 1, 1], [190, 186, 180]],
    vues: {
      plier: {
        titre: 'Replier',
        dessin: z => {
          const w = 5, Re = 11, ex = r(z.l * 0.4), ytop = 28, ey = r(ytop + 2.4 + w / 2 + Re);
          const xg = r(ex - (w + 2.4) / 2), xd = r(ex + (w + 2.4) / 2);
          const ytail = Math.min(ytop + 175, z.h - 60);
          const b = boucle(ex, ey, Re, w, xg, xd);
          return [
            fil(`M ${xg} ${z.h - 4} L ${xg} ${b.yn}`, w),
            fil(b.d + ` L ${xd} ${ytail}`, w, 'butt'),
            h.cote(ex + 34, ytop, ex + 34, ytail, 'un doigt', { cote: 'droite' }),
          ].join('\n');
        },
        renvois: z => {
          const w = 5, Re = 11, ex = r(z.l * 0.4), ey = r(28 + 2.4 + w / 2 + Re);
          return [{ n: 1, rond: [ex - 48, ey - 14], cible: [r(ex - Re - w / 2 - 1.6), ey], texte: 'boucle ronde, ni écrasée ni large' }];
        },
      },
      enrouler: {
        titre: 'Enrouler',
        dessin: z => {
          const w = 10, Re = 22, ex = r(z.l / 2), ey = r(58 + 1.4 + w / 2 + Re);
          const b = boucle(ex, ey, Re, w, ex, ex);
          const y0 = r(b.yn - 0.6 * w), yb = z.h - 62;
          return [
            fil(`M ${ex} ${b.yn} L ${ex} ${yb}`, w),
            fil(b.d, w),
            tours(ex, y0, 5, w),
            // le geste : tirer des deux mains, l'œillet doit tenir
            h.geste(`M ${ex} ${r(ey - Re - w / 2 - 8)} L ${ex} 14`),
            h.geste(`M ${ex} ${yb + 12} L ${ex} ${z.h - 12}`),
          ].join('\n');
        },
        renvois: z => {
          const w = 10, Re = 22, ex = r(z.l / 2), ey = r(58 + 1.4 + w / 2 + Re);
          const y0 = r(ey + Re + 1.2 * w - 0.6 * w), yb = z.h - 62;
          return [
            { n: 2, rond: [ex + 60, y0 + 2 * w], cible: [r(ex + 1.5 * w + 1.6), r(y0 + 2.5 * w)], texte: 'tours serrés, jointifs, sur le dormant' },
            { n: 3, rond: [ex - 50, yb + 28], cible: [ex - 1.5, yb + 30], texte: 'tiré des deux mains, ça tient' },
          ];
        },
      },
      collet: {
        titre: 'Le collet',
        dessin: z => {
          const w = 5, Re = 11, ex = z.l - 50, ey = Math.round(z.h * 0.28);
          const b = boucle(ex, ey, Re, w, ex, ex);
          const boucleCollet = `M ${ex} ${b.yn} L ${ex} ${ey + 60} C ${ex} ${ey + 140} ${ex - 45} ${ey + 185} ${ex - 80} ${ey + 185} `
            + `C ${ex - 125} ${ey + 185} 18 ${ey + 130} 18 ${ey + 75} C 18 ${ey + 20} ${ex - 105} ${ey} ${ex - 55} ${ey} L ${z.l} ${ey}`;
          const a1 = pt(ex, ey, Re, 150), a2 = pt(ex, ey, Re, 210);
          return [
            fil(b.d, w),
            fil(boucleCollet, w),
            fil(`M ${a1[0]} ${a1[1]} A ${Re} ${Re} 0 0 1 ${a2[0]} ${a2[1]}`, w, 'butt'),
            tours(ex, r(b.yn - 0.6 * w), 5, w),
          ].join('\n');
        },
        renvois: z => {
          const w = 5, Re = 11, ex = z.l - 50, ey = Math.round(z.h * 0.28);
          return [{ n: 4, rond: [ex + 18, ey - 42], cible: [ex + Re + 16, r(ey - w / 2 - 1.6)], texte: 'l’autre bout passe dans la boucle' }];
        },
      },
      ferblanc: {
        titre: 'Le verrou',
        dessin: z => {
          const cx = 48, rx = 36, ry = 10, yt = 38, yb = Math.min(yt + 130, z.h - 36);
          const Yw1 = yt + 30, Yw2 = yt + 84, u = 22, o = 7.9, c = 12.1;
          const fenetre = `M ${cx - u} ${Yw1 + o} Q ${cx} ${Yw1 + c} ${cx + u} ${Yw1 + o} L ${cx + u} ${Yw2 + o} Q ${cx} ${Yw2 + c} ${cx - u} ${Yw2 + o} Z`;
          const T = plat(z), s = T.s;
          const A = T.pl(0, 0), B = T.pl(s, 0), C = T.pl(s, 1), D = T.pl(0, 1);
          const m1 = T.pl(s / 2, 0), m2 = T.pl(s / 2, 1);
          const nx = T.passage[0], ny = r(T.passage[1] - 2.5), nh = r(ny - 72);
          // la rondelle : son trou du centre sert d'arrêt, le trou de passage est percé près du bord
          const Rw = 22, cw = T.rondelle, pw = [r(cw[0] + 15.5), cw[1]];
          const qf = Math.sqrt(Rw * Rw - 11 * 11) / s;
          const f1 = [r(cw[0] + 11 - qf * T.v[0]), r(cw[1] - qf * T.v[1])], f2 = [r(cw[0] + 11 + qf * T.v[0]), r(cw[1] + qf * T.v[1])];
          return [
            // la conserve ouverte, fenêtre découpée dans la paroi ; la face de droite à l'ombre,
            // l'intérieur vu par l'ouverture en gris loin
            (() => {
              const x0 = cx + rx * 0.5, d0 = r(ry * Math.sqrt(1 - 0.25));
              return h.path(`M ${x0} ${r(yt + d0)} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yt} L ${cx + rx} ${yb} A ${rx} ${ry} 0 0 1 ${x0} ${r(yb + d0)} Z`, h.a.ombre);
            })(),
            h.ellipse(cx, yt, rx - 4, ry - 1.5, h.a.loin),
            h.path(`M ${cx - rx} ${yt} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yt} L ${cx + rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx - rx} ${yb} Z`, h.a.contour),
            h.path(`M ${cx - rx} ${yt} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yt}`, h.a.arete),
            h.ellipse(cx, yt, rx - 4, ry - 1.5, h.a.detail),
            h.path(`M ${cx - rx} ${yt + 18} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yt + 18}`, h.a.detail),
            h.path(`M ${cx - rx} ${yb - 16} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb - 16}`, h.a.detail),
            h.path(fenetre, h.a.hachure('metal', 'arete')),
            // le carré à plat, ligne de pli ; trou d'arrêt ordinaire, trou de passage fin
            h.chemin([A, B, C, D], h.a.contour, true),
            h.ligne(m1[0], m1[1], m2[0], m2[1], h.a.cache),
            h.chemin(T.rond(T.arret, 5), h.a.plein, true),
            h.chemin(T.rond(T.passage, 2.2), h.a.plein, true),
            // le clou fin, pointe sur le trou de passage
            h.path(`M ${nx - 1.8} ${nh + 2.5} L ${nx - 1.8} ${ny - 8} L ${nx} ${ny} L ${nx + 1.8} ${ny - 8} L ${nx + 1.8} ${nh + 2.5} Z`, blanc),
            h.path(`M ${nx - 5.5} ${nh} L ${nx - 5.5} ${nh + 2.5} A 5.5 1.8 0 0 0 ${nx + 5.5} ${nh + 2.5} L ${nx + 5.5} ${nh} Z`, blanc),
            h.ellipse(nx, nh, 5.5, 1.8, blanc),
            // la rondelle, en petit
            h.chemin(T.rond(cw, Rw), h.a.arete, true),
            h.chemin(T.rond(cw, 5), h.a.plein, true),
            h.chemin(T.rond(pw, 2.2), h.a.plein, true),
            h.ligne(f1[0], f1[1], f2[0], f2[1], h.a.cache),
          ].join('\n');
        },
        renvois: z => {
          const cx = 48, yt = 38, T = plat(z), s = T.s, pli = T.pl(s / 2, 0.1);
          return [
            { n: 5, rond: [100, 62], cible: [cx + 22.7, yt + 44], texte: 'carré découpé dans une conserve' },
            { n: 6, rond: [z.l - 10, 124], cible: [r(T.passage[0] + 2.4), r(T.passage[1] + 1.4)], texte: 'passage : à peine plus que le fil' },
            { n: 8, rond: [r(T.rondelle[0] - 34), 14], cible: [r(T.rondelle[0] - 20), r(T.rondelle[1] - 6)], texte: 'ou rondelle : arrêt au centre, trou fin au bord' },
            { n: 7, rond: [146, z.h - 11], cible: [r(pli[0] + 1.2), pli[1]], texte: 'plier d’équerre sur la ligne, pas à plat' },
          ];
        },
      },
      // L'orientation d'enfilage suit le verrou à rondelle du brevet US 4 429 484 (fig. 2 et 3) : arrêt posé sur la
      // face extérieure, les deux brins de la boucle à l'intérieur de l'équerre, le fil qui entre dans le trou de
      // passage par la face intérieure et ressort par l'extérieur vers l'attache. Provenance : suivi/44-redaction.md.
      monte: {
        titre: 'Monté',
        dessin: z => {
          const V = verrou(132, 66, 2, 22, 132, 40);
          const yc = z.h - 30, zz = [];   // arrachement : la boucle continue plus bas
          for (let x = 0; x <= z.l; x += 12) zz.push(`${x} ${yc + ((x / 12) % 2 ? 5 : -5)}`);
          return [V.svg,
            h.path(`M 0 ${yc} L ${zz.join(' L ')} L ${z.l} ${z.h + 12} L 0 ${z.h + 12} Z`, 'fill="#fff" stroke="none"'),
            h.path(`M ${zz.join(' L ')}`, h.a.detail),
            h.fleche(`M ${V.xr} 34 L ${V.xr} 8`)].join('\n');   // vers l'attache
        },
        renvois: z => {
          const V = verrou(132, 66, 2, 22, 132, 40);
          return [
            { n: 9, rond: [54, 22], cible: [r(V.ex - V.w - 4.2), r(V.y0 + V.w)], texte: 'bout arrêté dehors, tours serrés' },
            { n: 10, rond: [z.l - 12, 160], cible: [r(V.hx + 4), r(V.hy + V.w / 2 + 1.8)], texte: 'la boucle entre par l’intérieur' },
          ];
        },
      },
      essai: {
        titre: 'L’essai',
        dessin: z => {
          const A = verrou(44, 70, 0.55, 14, 84, 20), B = verrou(z.l - 34, 70, 0.55, 14, 84, 20);
          const xa = A.xr + 9, ya = A.yr - 4, xb = B.xr + 9, yb = B.yr - 4;
          return [
            A.svg, B.svg,
            h.fleche(`M ${xa} ${ya} L ${xa} ${ya - 30}`),          // la boucle se ferme : le fil file par le verrou
            h.geste(`M ${xb} ${yb - 32} L ${xb} ${yb - 3}`),       // le geste de l'essai : tirer pour rouvrir…
            h.ligne(r(B.hx + 2.5), r(B.hy - 7), r(B.hx + 2.5), r(B.hy + 7), h.a.contour),  // …et ça bute au trou de passage
            h.controle(r(B.hx + 2.5), r(B.hy), 11),                // le point qu'on vérifie sur chaque collet
          ].join('\n');
        },
        renvois: z => {
          const A = verrou(44, 70, 0.55, 14, 84, 20), B = verrou(z.l - 34, 70, 0.55, 14, 84, 20);
          const xb = B.xr + 9, yb = B.yr - 4;
          return [
            { n: 11, rond: [A.xr + 11, 128], cible: [r(A.Cx + A.dx / 2), r(A.Cy + A.a + A.dy / 2 + 1.8)], texte: 'se ferme : ça glisse' },
            { n: 12, rond: [z.l - 14, 130], cible: [r(B.hx + 2.5), r(B.hy + 7)], texte: 'rouvrir : ça bloque, sinon repasser à l’envers' },
          ];
        },
      },
    },
  };
};
