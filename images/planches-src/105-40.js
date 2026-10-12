// Planche 105-40 — Tenir l'angle et affûter sans pierre
// Chapitre 105, §5-A (le test du marqueur, le cuir dos en premier) et §9 (le marqueur qu'on n'a
// plus, trouver l'abrasif, le cuir et la pâte). Aucune cote : le chapitre n'en donne pas pour ces
// gestes, et le seul angle chiffré (la hache) n'est pas ici.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const RAD = Math.PI / 180;
  const f1 = v => Math.round(v * 10) / 10;
  const P = p => `${f1(p[0])},${f1(p[1])}`;
  const D = (pts, ferme) => 'M' + pts.map(P).join(' L') + (ferme ? ' Z' : '');
  const cub = (a, b, c, d, n) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      out.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
        u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]]);
    }
    return out;
  };
  // courbe fermée lisse passant par chaque point (Catmull-Rom)
  const lisseFerme = pts => {
    const n = pts.length;
    let d = `M${P(pts[0])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ` C${P([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${P([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${P(p2)}`;
    }
    return d + ' Z';
  };
  const hasard = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const dans = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  // des points noirs semés dans un polygone : le grain d'une pierre, la boue, la cendre
  const semis = (poly, pas, r, graine) => {
    const al = hasard(graine), xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    let d = '';
    for (let y = Math.min(...ys); y <= Math.max(...ys); y += pas)
      for (let x = Math.min(...xs); x <= Math.max(...xs); x += pas) {
        const p = [x + (al() - 0.5) * pas * 0.9, y + (al() - 0.5) * pas * 0.9];
        if (dans(p, poly)) d += `M${f1(p[0] - r)},${f1(p[1])} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 `;
      }
    return d ? h.path(d, A.plein) : '';
  };
  const ellipsePts = (cx, cy, rx, ry, a0 = 0, a1 = 360, n = 48) => {
    const out = [];
    for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * RAD; out.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return out;
  };

  // ─── La lame vue de plat, rompue au talon : le biseau et ce qui reste dessus ────────────
  // Pointe à gauche, dos en haut, fil en bas. encre : 'tout' (biseau noirci), 'fil' (encre restée
  // sur le fil), 'epaule' (restée à l'épaule), 'rien' (biseau poli partout).
  function lameFace(x0, y0, { L = 116, H = 34, w = 13, encre = 'tout' } = {}) {
    const T = ([x, y]) => [x0 + x, y0 + y];
    const tip = [0, 0.62 * H];
    const droit = [];
    for (let i = 0; i < 24; i++) droit.push([L - i * 0.55 * L / 24, H]);
    const fil = [...droit, ...cub([0.45 * L, H], [0.22 * L, H], [0.06 * L, 0.9 * H], tip, 18)];
    const dos = [[L, 0], ...cub([0.5 * L, 0], [0.25 * L, 0], [0.08 * L, 0.3 * H], tip, 18)];
    const decale = k => fil.map((p, i) => {
      const a = fil[Math.max(0, i - 1)], b = fil[Math.min(fil.length - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const n = Math.hypot(tx, ty) || 1; tx /= n; ty /= n;
      const ww = w * k * Math.min(1, p[0] / (0.3 * L));
      return [p[0] - ty * ww, p[1] + tx * ww];
    });
    const mi = decale(0.5), ep = decale(1);
    const rupt = [];
    for (let i = 0; i <= 12; i++) { const t = i / 12; rupt.push([L + 3 * Math.sin(t * 2 * Math.PI), H - H * t]); }
    const corps = [...dos.slice(0, -1), ...fil.slice().reverse(), ...rupt.slice(1)];
    const out = [h.path(D(corps.map(T), true), A.blanc)];
    const bande = (a, b) => [...a, ...b.slice().reverse()].map(T);
    if (encre === 'tout') out.push(h.path(D(bande(fil, ep), true), A.plein));
    if (encre === 'fil') out.push(h.path(D(bande(fil, mi), true), A.plein));
    if (encre === 'epaule') out.push(h.path(D(bande(mi, ep), true), A.plein));
    // l'acier mis à nu par la pierre : des rayures en travers du biseau
    const bornes = { rien: [fil, ep], fil: [mi, ep], epaule: [fil, mi] }[encre];
    if (bornes) {
      let d = '';
      for (let i = 1; i < fil.length - 3; i += 2) d += `M${P(T(bornes[0][i]))} L${P(T(bornes[1][i]))} `;
      out.push(h.path(d, A.fin));
    }
    out.push(h.path(D(ep.map(T)), A.detail));
    out.push(h.path(D([...dos, ...fil.slice().reverse().slice(1)].map(T)), A.contour));
    out.push(h.path(D(rupt.map(T)), A.detail));
    const ou = (bord, s) => T(bord[Math.round(s * 23)]);   // s de 0 (talon) à 1 (début du ventre)
    return { svg: out.join('\n'), fil: s => ou(fil, s), mi: s => ou(mi, s), ep: s => ou(ep, s), T, L, H };
  }

  // ─── La lame en coupe sur la pierre ────────────────────────────────────────────────────
  // u le long de la lame depuis le fil, v en travers (+ : la face du dessous). phi : l'angle de
  // la lame sur la pierre. Le point le plus bas se pose sur ys.
  const B = 36, SB = 10, LR = 82, SD = 13;               // biseau, épaisseurs, longueur rompue
  const ALPHA = Math.atan(SB / B) / RAD;                    // l'angle du biseau
  function lameCoupe(xE, ys, phi) {
    const c = Math.cos(phi * RAD), s = Math.sin(phi * RAD);
    const Q0 = (u, v) => [u * c + v * s, -u * s + v * c];
    const dy = ys - Math.max(...[[0, 0], [B, SB], [LR, SD]].map(p => Q0(...p)[1]));
    const Q = (u, v) => { const q = Q0(u, v); return [xE + q[0], dy + q[1]]; };
    const rupt = [];
    for (let i = 0; i <= 12; i++) { const t = i / 12; rupt.push([LR + 3 * Math.sin(t * 2 * Math.PI), SD - 2 * SD * t]); }
    const tour = [[LR, -SD], [B, -SB], [0, 0], [B, SB], [LR, SD]].map(p => Q(...p));
    const poly = [...tour, ...rupt.slice(1).map(p => Q(...p))];
    return {
      svg: [h.path(D(poly, true), A.blanc), h.path(D(poly, true), A.hachure('metal', 'aucun')),
        h.path(D(tour), A.contour), h.path(D(rupt.map(p => Q(...p))), A.detail)].join('\n'),
      Q, fil: Q(0, 0), epaule: Q(B, SB),
    };
  }
  const pierre = (z, ys) => h.rect(4, ys, z.l - 8, 20, A.hachure('pierre', 'arete'));
  // l'arc d'une correction : un point tourné autour du pivot
  const arcFleche = (pivot, p, deg) => {
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const a = deg * i / 10 * RAD, dx = p[0] - pivot[0], dy = p[1] - pivot[1];
      pts.push([pivot[0] + dx * Math.cos(a) - dy * Math.sin(a), pivot[1] + dx * Math.sin(a) + dy * Math.cos(a)]);
    }
    return h.fleche(D(pts));
  };

  // ─── Le couteau vu de plat, en entier ou rompu au manche ───────────────────────────────
  // Repère local en mm : le talon de la lame (la mitre) en 0,0, la lame vers -x, le fil en +y.
  // k : unités de vue par mm ; ky : écrasement en travers (une lame vue en biais) ; miroir : le
  // fil passe de l'autre côté ; rompu : le manche coupé à tant de mm.
  function couteau({ x, y, angle = 0, k = 1, ky = 1, miroir = false, rompu = 0, manche = 110 }) {
    const c = Math.cos(angle * RAD), s = Math.sin(angle * RAD), sy = (miroir ? -1 : 1) * ky;
    const T = ([u, v]) => { const a = u * k, b = v * k * sy; return [x + a * c - b * s, y + a * s + b * c]; };
    const L = 120, hh = 13, hm = 12;
    const tip = [-L, 4];
    const dos = [[0, -hh], [-0.5 * L, -hh], ...cub([-0.5 * L, -hh], [-0.75 * L, -hh], [-0.93 * L, -6], tip, 16).slice(1)];
    const filDroit = [];
    for (let i = 0; i <= 12; i++) filDroit.push([-0.42 * L * i / 12, hh]);
    const fil = [...filDroit, ...cub([-0.42 * L, hh], [-0.72 * L, hh], [-0.92 * L, 12], tip, 16).slice(1)];
    const ep = fil.map((p, i) => {
      const a = fil[Math.max(0, i - 1)], b = fil[Math.min(fil.length - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const n = Math.hypot(tx, ty) || 1; tx /= n; ty /= n;
      const ww = 5 * Math.min(1, (p[0] + L) / 30);
      return [p[0] - ty * ww, p[1] + tx * ww];
    });
    const out = [];
    // le manche
    const bout = rompu || manche;
    const haut = [[0, -hm], [bout, -hm + 1]], bas = [[bout, hm - 1], [0, hm]];
    let mancheTour;
    if (rompu) {
      const r = [];
      for (let i = 0; i <= 10; i++) { const t = i / 10; r.push([bout + 2.5 * Math.sin(t * 2 * Math.PI), -hm + 1 + (2 * hm - 2) * t]); }
      mancheTour = [...haut, ...r.slice(1, -1), ...bas];
      out.push(h.path(D(mancheTour.map(T), true), A.blanc));
      out.push(h.path(D(haut.map(T)) + ' ' + D(bas.map(T)), A.arete));
      out.push(h.path(D(r.map(T)), A.detail));
    } else {
      mancheTour = [[0, -hm], [manche - 8, -hm + 1], ...cub([manche - 8, -hm + 1], [manche + 2, -hm + 1], [manche + 2, hm - 1], [manche - 8, hm - 1], 10).slice(1), [0, hm]];
      out.push(h.path(D(mancheTour.map(T), true), A.blanc));
      out.push(h.path(D(mancheTour.map(T)), A.arete));
    }
    for (const u of [34, 76]) if (u < bout - 6) out.push(h.cercle(...T([u, 0]), 1.8 * k, A.detail));
    // la mitre
    out.push(h.path(D([[0, -hm], [0, hm]].map(T)) + ' ' + D([[7, -hm], [7, hm]].map(T)), A.detail));
    // la lame
    const corps = [...dos, ...fil.slice().reverse().slice(1)];
    out.push(h.path(D(corps.map(T), true), A.blanc));
    out.push(h.path(D(ep.slice(0, -2).map(T)), A.detail));
    out.push(h.path(D(corps.map(T)), A.arete));
    return { svg: out.join('\n'), T, fil: s => T(fil[Math.round(s * 12)]), dos: s => T(dos[Math.round(s)]) };
  }

  const titreRang = { suie: 'À la suie', bas: 'Angle trop bas', juste: 'Angle juste', haut: 'Angle trop haut' };
  // les quatre vues du test : la lame vue de plat en haut, la coupe sur la pierre en bas
  const FACE_Y = 6;
  const test = (encre, phi, pivot, deg) => ({
    titre: titreRang[{ fil: 'bas', rien: 'juste', epaule: 'haut' }[encre]],
    dessin: z => {
      const ys = z.h - 26, xE = 16;
      const lc = lameCoupe(xE, ys, phi);
      const out = [lameFace(8, FACE_Y, { encre }).svg, pierre(z, ys), lc.svg];
      if (deg) {
        const pv = pivot === 'fil' ? lc.fil : lc.epaule;
        out.push(arcFleche(pv, lc.Q(LR + 12, 0), deg));
      }
      return out.join('\n');
    },
  });

  return {
    ref: '105-40',
    titre: 'Tenir l’angle et affûter sans pierre',
    desc: 'En haut, le test du marqueur : une lame vue de plat, le biseau noirci à la flamme d’une chandelle faute de marqueur, puis ce qui reste du noir après quelques passes, avec en dessous la coupe de la lame sur la pierre qui l’explique. Angle trop bas : l’épaule porte, le noir reste sur le fil. Angle juste : le biseau est à plat et le noir part partout. Angle trop haut : le fil porte, le noir reste à l’épaule. Au milieu, un couteau tenu dans la main droite sur un galet de grès mouillé, la boue grise le long du fil, poussé du talon à la pointe ; puis une tasse retournée, la lame passée sur l’anneau non émaillé de son pied. En bas, le dos d’une vieille ceinture collé à plat sur une planche, la lame tirée dos en premier, et la coupe : planche, cuir côté chair, pâte de cendre et de gras, la lame à plat sur son biseau, tirée dos en premier, loin du fil.',
    format: 'pleine',
    disposition: [['suie', 'bas', 'juste', 'haut'], ['galet', 'tasse'], ['cuir', 'cuirCoupe']],
    largeurs: [[1, 1, 1, 1], [3, 2], [5, 4]],
    hauteurs: [170, 178, 150],
    vues: {
      suie: {
        titre: titreRang.suie,
        dessin: z => {
          const lf = lameFace(8, FACE_Y, { encre: 'tout' });
          const xc = 8 + 0.52 * lf.L, yFil = FACE_Y + lf.H, yCire = yFil + 50, yBas = z.h - 6;
          const flamme = (ht, lg, y0) => `M${xc},${y0 - ht} C${xc + lg},${y0 - ht * 0.55} ${xc + lg},${y0 - 3} ${xc},${y0} C${xc - lg},${y0 - 3} ${xc - lg},${y0 - ht * 0.55} ${xc},${y0 - ht} Z`;
          return [
            // la chandelle : la cire, la mèche, la flamme qui lèche le biseau
            h.path(`M${xc - 10},${yBas} L${xc - 10},${yCire + 2} Q${xc},${yCire + 6} ${xc + 10},${yCire + 2} L${xc + 10},${yBas}`, A.arete),
            h.path(`M${xc - 10},${yCire + 2} Q${xc},${yCire - 2} ${xc + 10},${yCire + 2}`, A.detail),
            h.path(`M${xc - 10},${yCire + 14} q3,5 0,12`, A.fin),
            h.path(`M${xc},${yCire + 1} L${xc + 0.5},${yCire - 6}`, A.arete),
            h.path(flamme(yCire - 6 - yFil + 6, 7.5, yCire - 5), A.arete),
            h.path(flamme(12, 3, yCire - 6), A.detail),
            lf.svg,
          ].join('\n');
        },
        renvois: z => {
          const lf = lameFace(8, FACE_Y, {});
          return [{ n: 1, rond: [z.l - 14, FACE_Y + lf.H + 30], cible: lf.mi(0.25), texte: 'faute de marqueur, la suie' }];
        },
      },
      bas: {
        ...test('fil', ALPHA - 10, 'epaule', -12),
        renvois: z => {
          const lf = lameFace(8, FACE_Y, {}), lc = lameCoupe(16, z.h - 26, ALPHA - 10);
          return [
            { n: 2, rond: [z.l - 14, FACE_Y + lf.H + 22], cible: lf.mi(0.45).map((v, i) => v + (i ? 2.5 : 0)), texte: 'le noir reste au fil' },
            { n: 3, rond: [18, z.h - 70], cible: lc.epaule, texte: 'l’épaule porte : lever le dos' },
          ];
        },
      },
      juste: {
        ...test('rien', ALPHA, null, 0),
        renvois: z => {
          const lf = lameFace(8, FACE_Y, {}), lc = lameCoupe(16, z.h - 26, ALPHA);
          return [
            { n: 4, rond: [z.l - 14, FACE_Y + lf.H + 22], cible: lf.mi(0.45), texte: 'le noir part partout' },
            { n: 5, rond: [18, z.h - 70], cible: lc.Q(B * 0.5, SB * 0.5), texte: 'le biseau à plat sur la pierre' },
          ];
        },
      },
      haut: {
        ...test('epaule', ALPHA + 10, 'fil', 12),
        renvois: z => {
          const lf = lameFace(8, FACE_Y, {}), lc = lameCoupe(16, z.h - 26, ALPHA + 10);
          return [
            { n: 6, rond: [z.l - 14, FACE_Y + lf.H + 22], cible: lf.mi(0.45).map((v, i) => v - (i ? 2.5 : 0)), texte: 'le noir reste à l’épaule' },
            { n: 7, rond: [18, z.h - 70], cible: lc.fil, texte: 'le fil porte : baisser le dos' },
          ];
        },
      },

      galet: {
        titre: 'Sur un galet de grès mouillé',
        dessin: z => galet(z).svg,
        renvois: z => galet(z).renvois,
      },
      tasse: {
        titre: 'Sur le pied d’une tasse',
        dessin: z => tasse(z).svg,
        renvois: z => tasse(z).renvois,
      },
      cuir: {
        titre: 'Sur une vieille ceinture',
        dessin: z => cuir(z).svg,
        renvois: z => cuir(z).renvois,
      },
      cuirCoupe: {
        titre: 'En coupe',
        dessin: z => cuirCoupe(z).svg,
        renvois: z => cuirCoupe(z).renvois,
      },
    },
  };

  // ─── Le galet : vu de dessus, le couteau dans la main droite ───────────────────────────
  function galet(z) {
    const e = 0.75, xh = Math.min(z.l - 70, 262), yh = 82;
    const cx = xh - 112, cy = yh + 12;
    // tout le dessin tourne de ROT autour du centre du galet : la lame en biais sur la pierre,
    // l'avant-bras qui vient d'en bas à droite, comme on voit sa propre main droite
    const ROT = -22, TG = 4;
    const rc = Math.cos(ROT * RAD), rs = Math.sin(ROT * RAD);
    const R = ([x, y]) => [cx + (x - cx) * rc - (y - cy) * rs, cy + (x - cx) * rs + (y - cy) * rc];
    // le galet : un ovale irrégulier, un peu tourné
    const bord = [];
    const rayons = [1, 0.97, 1.02, 0.95, 0.99, 1.03, 0.96, 1.01, 0.98, 1.02, 0.97, 1];
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * RAD, r = rayons[i], t = TG * RAD;
      const px = 98 * r * Math.cos(a), py = 40 * r * Math.sin(a);
      bord.push([cx + px * Math.cos(t) - py * Math.sin(t), cy + px * Math.sin(t) + py * Math.cos(t)]);
    }
    const bordPts = [];
    for (let i = 0; i < 72; i++) {
      const a = i * 5 * RAD, k = Math.floor(i / 6), f = (i % 6) / 6, r = rayons[k] * (1 - f) + rayons[(k + 1) % 12] * f, t = TG * RAD;
      const px = 98 * r * Math.cos(a), py = 40 * r * Math.sin(a);
      bordPts.push([cx + px * Math.cos(t) - py * Math.sin(t), cy + px * Math.sin(t) + py * Math.cos(t)]);
    }
    // le rebord arrondi : un second trait fin en dedans, du côté de l'ombre
    const dedans = bordPts.slice(8, 34).map(([x, y]) => [cx + (x - cx) * 0.9, cy + (y - cy) * 0.86]);
    const kn = couteau({ x: xh - 50 * e, y: yh, k: e, miroir: true });
    // la boue grise : une traînée le long du fil, sur la pierre
    const yF = yh - 13 * e, xa = xh - 170 * e - 22, xb = xh - 50 * e - 4;
    const boueIn = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16; boueIn.push([xa + (xb - xa) * t, yF - 1.5 - 11 * Math.sin(Math.PI * t) ** 0.7 - 2 * Math.sin(9 * t)]); }
    for (let i = 16; i >= 0; i--) { const t = i / 16; boueIn.push([xa + (xb - xa) * t, yF + 3]); }
    const m = F.main({ x: xh, y: yh, pose: 'prise', vue: 'dos', angle: -90, echelle: e, diametre: 24 * e, bras: 90, objet: kn.svg });
    const svg = [`<g transform="rotate(${ROT} ${f1(cx)} ${f1(cy)})">`,
      h.path(lisseFerme(bord), A.blanc),
      semis(bordPts, 7, 0.55, 11),
      h.path(D(dedans), A.fin),
      h.path(D(boueIn, true), A.blanc),
      semis(boueIn, 2.2, 0.6, 5),
      h.path(lisseFerme(bord), A.contour),
      m,
      // du talon (près de la mitre) à la pointe, sur la pierre, en suivant le fil
      h.fleche(`M${f1(xb - 8)},${f1(yF - 10)} L${f1(xa + 70)},${f1(yF - 10)} Q${f1(xa + 20)},${f1(yF - 10)} ${f1(xa + 4)},${f1(yh - 4 * e - 4)}`),
      '</g>',
    ].join('\n');
    return {
      svg,
      renvois: [
        { n: 8, rond: [14, cy + 30], cible: R([cx - 55, cy + 18]), texte: 'grès : il raye l’acier' },
        { n: 9, rond: [14, yh - 30], cible: R([xa + 22, yF - 6]), texte: 'boue grise : ne pas la rincer' },
        { n: 10, rond: [cx - 20, 14], cible: R([xa + 100, yF - 10]), texte: 'du talon à la pointe' },
      ],
    };
  }

  // ─── La tasse retournée : l'anneau non émaillé du pied ─────────────────────────────────
  function tasse(z) {
    const cx = z.l * 0.46, cy = 78, rx = 44, ry = 17, yb = z.h - 30;
    const out = [];
    // le corps émaillé, lisse : deux reflets
    const flanc = [[cx - rx, cy], ...ellipsePts(cx, yb, rx + 4, ry, 180, 0, 24), [cx + rx, cy]];
    const corps = [...flanc, ...ellipsePts(cx, cy, rx, ry, 0, -180, 24)];
    // la table, sous la lèvre
    out.push(h.path(`M8,${f1(yb + ry)} L${f1(z.l - 8)},${f1(yb + ry)}`, A.arete));
    // l'anse retournée : l'attache large en bas, vers la table
    const anseExt = `M${f1(cx + rx + 1)},${f1(cy + 18)} C${f1(cx + rx + 16)},${f1(cy + 18)} ${f1(cx + rx + 36)},${f1(yb - 34)} ${f1(cx + rx + 3)},${f1(yb - 4)}`;
    const anseInt = `M${f1(cx + rx + 1)},${f1(cy + 25)} C${f1(cx + rx + 10)},${f1(cy + 27)} ${f1(cx + rx + 22)},${f1(yb - 34)} ${f1(cx + rx + 2)},${f1(yb - 22)}`;
    out.push(h.path(`${anseExt} L${f1(cx + rx + 2)},${f1(yb - 22)} C${f1(cx + rx + 22)},${f1(yb - 34)} ${f1(cx + rx + 10)},${f1(cy + 27)} ${f1(cx + rx + 1)},${f1(cy + 25)} Z`, A.blanc));
    out.push(h.path(anseExt, A.contour), h.path(anseInt, A.arete));
    out.push(h.path(D(corps, true), A.blanc));
    out.push(h.path(D(flanc), A.contour));
    out.push(h.path(D([[cx - rx + 9, cy + 24], [cx - rx + 8, yb - 4]]), A.fin), h.path(D([[cx - rx + 14, cy + 30], [cx - rx + 13, yb - 12]]), A.fin));
    // le fond : l'anneau non émaillé (grain) et le creux émaillé au centre
    const ext = ellipsePts(cx, cy, rx, ry, 0, 360, 60), int = ellipsePts(cx, cy, rx - 11, ry - 4.3, 0, 360, 60);
    out.push(h.path(D(ext, true), A.blanc));
    let d = '';
    const al = hasard(3);
    for (let a = 0; a < 360; a += 4.5) for (const f of [0.18, 0.5, 0.82]) {
      const aa = (a + (al() - 0.5) * 3) * RAD, ff = f + (al() - 0.5) * 0.18;
      const px = cx + (rx - 11 + 11 * ff) * Math.cos(aa), py = cy + (ry - 4.3 + 4.3 * ff) * Math.sin(aa);
      d += `M${f1(px - 0.6)},${f1(py)} a0.6,0.6 0 1 0 1.2,0 a0.6,0.6 0 1 0 -1.2,0 `;
    }
    out.push(h.path(d, A.plein));
    out.push(h.path(D(int, true), A.blanc), h.path(D(int, true), A.detail));
    // la lèvre posée sur la table : un bourrelet
    out.push(h.path(D(ellipsePts(cx, yb - 5, rx + 3.6, ry, 180, 0, 24)), A.fin));
    out.push(h.path(D(ext, true), A.contour));
    // la lame posée sur l'arrière de l'anneau, le fil vers soi
    const yFil = cy - ry * 0.55;
    const kn = couteau({ x: cx + 58, y: yFil - 13 * 0.95 * 0.55, k: 0.95, ky: 0.55, rompu: 42 });
    out.push(kn.svg);
    out.push(h.fleche(`M${f1(cx - 40)},${f1(yFil - 26)} L${f1(cx + 30)},${f1(yFil - 26)}`));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 11, rond: [16, cy + 40], cible: [cx - rx + 5, cy + 3], texte: 'pied non émaillé : grain fin' },
        { n: 12, rond: [cx + 50, yFil - 36], cible: [cx + 30, yFil - 26], texte: 'passes légères, alternées' },
      ],
    };
  }

  // ─── Le cuir : le dos d'une vieille ceinture collé sur une planche ─────────────────────
  function cuir(z) {
    const yb = 20, bh = 84, x0 = 10, x1 = z.l - 10;
    const yF = yb + bh / 2, ya = yF - 15, yc = yF + 15, xg = 18, xp = x1 - 20;
    const out = [];
    // la planche et son fil
    out.push(h.rect(x0, yb, x1 - x0, bh, A.blanc));
    let fil = '';
    const al = hasard(13);
    for (const y of [yb + 5, yb + 11, yb + 18, yb + 23, yb + bh - 22, yb + bh - 15, yb + bh - 9, yb + bh - 4]) {
      const o = (al() - 0.5) * 3;
      fil += `M${x0 + 3},${f1(y)} C${x0 + 70},${f1(y - 1.5 + o)} ${x0 + 170},${f1(y + 1.5 - o)} ${x1 - 3},${f1(y + o * 0.3)} `;
    }
    out.push(h.path(fil, A.fin));
    out.push(h.rect(x0, yb, x1 - x0, bh, A.contour));
    // la ceinture : bout coupé à gauche, bout en pointe à droite, les trous, les coutures
    const cein = [[xg, ya], [xp - 20, ya], [xp, yF], [xp - 20, yc], [xg, yc]];
    out.push(h.path(D(cein, true), A.blanc));
    const pate = [[xg + 14, ya + 2], [xp - 72, ya + 2], [xp - 72, yc - 2], [xg + 14, yc - 2]];
    out.push(semis(pate, 3.4, 0.5, 9));
    out.push(h.path(`M${xg + 4},${ya + 3.5} L${xp - 24},${ya + 3.5} L${xp - 7},${yF} L${xp - 24},${yc - 3.5} L${xg + 4},${yc - 3.5}`, `${A.fin} stroke-dasharray="3 2.2"`));
    for (const xt of [xp - 36, xp - 50, xp - 64]) out.push(h.ellipse(xt, yF, 2.4, 3.4, A.arete));
    out.push(h.path(D(cein, true), A.arete));
    // la lame en travers, le fil à gauche, tirée vers la droite : le dos passe en premier
    const bx = xg + 150, by = yb + bh + 8, k = 0.72;
    const kn = couteau({ x: bx, y: by, angle: 60, k, rompu: 40 });
    out.push(kn.svg);
    const yA = yb + 13, xA = bx + (yA - by) * Math.tan(30 * RAD) + 13 * k / Math.cos(30 * RAD) + 8;
    out.push(h.fleche(`M${f1(xA)},${yA} L${f1(xA + 52)},${yA}`));
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 13, rond: [xp - 43, yb + bh - 12], cible: [xp - 43, yF + 6], texte: 'dos de ceinture collé à plat' },
        { n: 14, rond: [xA + 74, yA], cible: [xA + 54, yA], texte: 'tirée dos en premier' },
      ],
    };
  }

  function cuirCoupe(z) {
    const yP = z.h - 32, yC = yP - 16, yA = yC - 9, x0 = 6, x1 = z.l - 6, xE = 72;
    const lc = lameCoupe(xE, yA, ALPHA);
    const xD = xE + LR * Math.cos(ALPHA * RAD) + 16;
    const out = [
      h.rect(x0, yP, x1 - x0, 26, A.hachure('bois', 'arete')),
      h.rect(x0, yC, x1 - x0, 16, A.hachure('isolant', 'arete')),
      h.rect(x0, yA, x1 - x0, 9, A.blanc),
      semis([[x0 + 1, yA + 1], [x1 - 1, yA + 1], [x1 - 1, yC - 1], [x0 + 1, yC - 1]], 2.5, 0.6, 21),
      h.rect(x0, yA, x1 - x0, 9, A.arete),
      lc.svg,
      h.fleche(`M${f1(xD)},${yA - 22} L${f1(Math.min(x1 - 6, xD + 56))},${yA - 22}`),
    ];
    return {
      svg: out.join('\n'),
      renvois: [
        { n: 15, rond: [16, yA - 24], cible: [28, yA + 4.5], texte: 'cendre tamisée et gras' },
        { n: 16, rond: [44, yA - 46], cible: [54, yC + 8], texte: 'cuir côté chair, en haut' },
      ],
    };
  }
};
