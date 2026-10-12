// Planche 96-02 — Le trou d'essai et le premier bêchage (chapitre 96, § 3, étape 2 et étape 13).
// Le chapitre dit : sous la mousse, une mince couche noire qui porte ce qui nourrit, une couche
// grise délavée (couleur de cendre ou de sable délavé, elle peut manquer), puis une couche rouille,
// franchement plus rouge, à limite nette ; plus bas, la couleur tourne au jaune. Le trou d'essai se
// creuse jusqu'à la couche rouille ou jusqu'au refus de la pelle. Le premier labour : lever la mousse
// et le tapis de racines en plaques ; bêcher en gardant la couche noire en haut ; ameublir la couche
// du dessous à la fourche, sans la remonter. Le raté : la bêche enfoncée jusque dans le gris, la
// motte retournée met le gris par-dessus et enterre le noir.
// Aucune épaisseur de couche ni profondeur dans le chapitre : aucune cote. Les trois vues gardent les
// mêmes trames : quadrillé serré = noir, points = gris, rayures = rouille, tirets courts horizontaux en quinconce = jaune.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = (v) => Math.round(v * 10) / 10;
  const P = (pts) => pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L ');
  const blanc = (a) => a.replace('fill="none"', `fill="${B}"`);
  const poly = (pts, at) => `<path d="M ${P(pts)} Z" ${at}/>`;
  const ouvert = (pts, at) => `<path d="M ${P(pts)}" ${at}/>`;
  const FN = 'fill="url(#p9602-noire)" stroke="none"';
  const FG = 'fill="url(#p9602-grise)" stroke="none"';
  const FR = 'fill="url(#p9602-rouille)" stroke="none"';
  const FJ = 'fill="url(#p9602-jaune)" stroke="none"';
  const ligneMotif = (w) => `<path d="M ${w / 2} 0 L ${w / 2} ${w}" fill="none" stroke="${N}" stroke-width="0.5"/>`;
  const DEFS = `<defs>
<pattern id="p9602-noire" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M1.7 0 L1.7 3.4 M0 1.7 L3.4 1.7" fill="none" stroke="${N}" stroke-width="0.5"/></pattern>
<pattern id="p9602-grise" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2.5" r="0.7" fill="${N}" stroke="none"/><circle cx="6.6" cy="6.8" r="0.7" fill="${N}" stroke="none"/><circle cx="7.4" cy="1.4" r="0.5" fill="${N}" stroke="none"/></pattern>
<pattern id="p9602-rouille" width="4.6" height="4.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">${ligneMotif(4.6)}</pattern>
<pattern id="p9602-jaune" width="10" height="7" patternUnits="userSpaceOnUse"><path d="M1 1.75 L5 1.75 M6 5.25 L10 5.25 M0 5.25 L1 5.25" fill="none" stroke="${N}" stroke-width="0.6"/></pattern>
</defs>`;

  const alea = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const bez = (p0, p1, p2, n = 8) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
  });
  const pas = (xa, xb, d = 4) => { const xs = []; for (let x = xa; x < xb; x += d) xs.push(x); xs.push(xb); return xs; };
  // Une bande de sol entre deux lignes y = haut(x) et y = bas(x), de xa à xb.
  const bande = (xa, xb, haut, bas, at) => {
    const xs = pas(xa, xb);
    return poly([...xs.map((x) => [x, haut(x)]), ...xs.slice().reverse().map((x) => [x, bas(x)])], at);
  };
  const trace = (xa, xb, fn, at) => ouvert(pas(xa, xb).map((x) => [x, fn(x)]), at);

  // Le tapis de mousse en coupe : des coussins sur le dessus, des brins debout dedans.
  const mousse = (xa, xb, y0, th, rnd, bords = []) => {
    const n = Math.max(1, Math.round((xb - xa) / 5)), dx = (xb - xa) / n;
    let dessus = `M ${f(xa)} ${f(y0 - th)}`;
    for (let i = 0; i < n; i++) {
      const x = xa + i * dx;
      dessus += ` Q ${f(x + dx / 2)} ${f(y0 - th - 2.4 - rnd() * 1.4)} ${f(x + dx)} ${f(y0 - th)}`;
    }
    const out = [`<path d="${dessus} L ${f(xb)} ${f(y0)} L ${f(xa)} ${f(y0)} Z" fill="${B}" stroke="none"/>`];
    let b = '';
    for (let x = xa + 1.6; x < xb - 1; x += 3) {
      const top = y0 - th + 0.6 + rnd() * 1.4;
      b += ` M ${f(x)} ${f(y0)} L ${f(x)} ${f(top)}`;
      let s = rnd() < 0.5 ? 1 : -1;
      for (let y = y0 - 2.2; y > top + 1.2; y -= 2.4) { b += ` M ${f(x)} ${f(y)} l ${f(1.1 * s)} -1.1`; s = -s; }
    }
    out.push(`<path d="${b.trim()}" ${h.a.fin}/>`);
    out.push(`<path d="${dessus}" ${h.a.detail}/>`);
    bords.forEach((x) => out.push(ouvert([[x, y0], [x, y0 - th]], h.a.detail)));
    return out.join('\n');
  };

  // Les outils sont dessinés à l'échelle k du bêchage : lame de bêche = noir + gris.
  // La poignée en D, vue un peu de biais, au bout d'un manche qui arrive en (x, y).
  const poignee = (x, y, k) => [
    poly([[x - 2.4 * k, y], [x - 9 * k, y - 14 * k], [x - 9 * k, y - 20 * k], [x + 9 * k, y - 20 * k], [x + 9 * k, y - 14 * k], [x + 2.4 * k, y]], blanc(h.a.arete)),
    poly([[x - 1.4 * k, y - 5 * k], [x - 5.6 * k, y - 12.6 * k], [x - 5.6 * k, y - 15.6 * k], [x + 5.6 * k, y - 15.6 * k], [x + 5.6 * k, y - 12.6 * k], [x + 1.4 * k, y - 5 * k]], blanc(h.a.detail)),
  ].join('\n');
  const manche = (x, ya, yb, k) => [
    h.rect(x - 2.4 * k, yb, 4.8 * k, ya - yb, h.a.blanc),
    ouvert([[x - 2.4 * k, ya], [x - 2.4 * k, yb]], h.a.arete), ouvert([[x + 2.4 * k, ya], [x + 2.4 * k, yb]], h.a.arete),
  ].join('\n');

  // La bêche, lame vue de biais : la pointe de la lame en (x, yp).
  const beche = (x, yp, k) => {
    const LB = 50 * k, y0 = yp - LB, bw = 18 * k, out = [];
    out.push(poly([[x - bw / 2, y0], [x + bw / 2, y0], [x + bw / 2, yp - 3 * k],
      ...bez([x + bw / 2, yp - 3 * k], [x, yp + 2.4 * k], [x - bw / 2, yp - 3 * k], 8).slice(1)], blanc(h.a.arete)));
    out.push(ouvert([[x - 3.5 * k, y0], [x, y0 + 0.42 * LB], [x + 3.5 * k, y0]], h.a.detail));
    out.push(h.rect(x - bw / 2 - 2.5 * k, y0 - 3 * k, bw + 5 * k, 3 * k, blanc(h.a.detail)));   // le marchepied
    const yd = y0 - 3 * k - 20 * k;
    out.push(poly([[x - 5 * k, y0 - 3 * k], [x + 5 * k, y0 - 3 * k], [x + 2.6 * k, yd], [x - 2.6 * k, yd]], blanc(h.a.arete)));
    out.push(h.cercle(x, y0 - 9 * k, 0.9, h.a.plein), h.cercle(x, y0 - 16 * k, 0.9, h.a.plein));
    const yg = yd - 100 * k;
    out.push(manche(x, yd, yg, k), poignee(x, yg, k));
    return out.join('\n');
  };
  // La fourche à bêcher, quatre dents vues de biais : pointes des dents à yp.
  const fourche = (x, yp, k) => {
    const LD = 46 * k, y0 = yp - LD, out = [];
    [-7.5, -2.5, 2.5, 7.5].forEach((d) => {
      const dx = d * k;
      out.push(poly([[x + dx - 1.3 * k, y0], [x + dx + 1.3 * k, y0], [x + dx + 0.5 * k, yp - 2 * k], [x + dx, yp], [x + dx - 0.5 * k, yp - 2 * k]], blanc(h.a.detail)));
    });
    out.push(poly([[x - 9 * k, y0 + k], ...bez([x - 9 * k, y0 + k], [x - 9 * k, y0 - 5 * k], [x - 3 * k, y0 - 5 * k], 4).slice(1),
      [x + 3 * k, y0 - 5 * k], ...bez([x + 3 * k, y0 - 5 * k], [x + 9 * k, y0 - 5 * k], [x + 9 * k, y0 + k], 4).slice(1)], blanc(h.a.arete)));
    const yd = y0 - 24 * k;
    out.push(poly([[x - 3.6 * k, y0 - 5 * k], [x + 3.6 * k, y0 - 5 * k], [x + 2.6 * k, yd], [x - 2.6 * k, yd]], blanc(h.a.arete)));
    out.push(h.cercle(x, y0 - 12 * k, 0.9, h.a.plein));
    const yg = yd - 100 * k;
    out.push(manche(x, yd, yg, k), poignee(x, yg, k));
    return { svg: out.join('\n'), yg };
  };

  // ─── Le trou d'essai ───
  const essai = (z) => {
    const ys = 42, MO = 13, NB = 24, NG = 50;
    const g = { ys, MO, NB, NG, cx: z.l / 2, wt: 196, wb: 158, D: NB + NG + 34 };
    g.yN = (x) => ys + NB + 1.2 * Math.sin(x / 13);
    g.yR = (x) => ys + NB + NG + 2.5 * Math.sin(x / 29 + 1);
    g.yJ = (x) => ys + g.D + 30 + 7 * Math.sin(x / 37) + 3 * Math.sin(x / 11 + 2);
    g.mur = (y) => g.wt / 2 + (g.wb - g.wt) / 2 * (y - ys) / g.D;   // demi-largeur du trou à y
    return g;
  };

  // ─── Le bêchage : même sol, même échelle, bien et raté ───
  const champ = (z) => {
    const k = 1.3, NB = 16 * k, NG = 34 * k, ys = z.h - NB - NG - 34;
    const xm = 26, xs = 66, xa = xs + 15 * k, xw = xa + 46;
    const n = Math.round((z.l - 2 - xw) / 40), wk = (z.l - 2 - xw) / n;
    return { k, NB, NG, ys, xm, xs, xa, xw, n, wk, yR: (x) => ys + NB + NG + (x < xw ? 1.5 * Math.sin(x / 23 + 1) * Math.min(1, (xw - x) / 20) : 0) };
  };
  // Les mottes retournées, côte à côte : chaque motte est un quadrilatère au dessus bombé,
  // ses joints un peu penchés. couches = [[épaisseur du bas, remplissage], …] du bas vers le haut.
  const mottes = (z, c, base, couches, graine) => {
    const rnd = alea(graine), out = [], lignes = [];
    const H = couches.reduce((s, k) => s + k[0], 0);
    const joints = Array.from({ length: c.n + 1 }, (_, i) => {
      const xb = c.xw + i * c.wk, bord = i === 0 || i === c.n;
      const dt = bord ? 0 : (rnd() * 2 - 1) * 6;
      return { xb, xt: xb + dt, yt: base - H - 2 - rnd() * 1.5 };
    });
    for (let i = 0; i < c.n; i++) {
      const a = joints[i], b = joints[i + 1];
      const lerpX = (j, y) => j.xt + (j.xb - j.xt) * (y - j.yt) / (base - j.yt);
      const dome = bez([a.xt, a.yt], [(a.xt + b.xt) / 2, Math.min(a.yt, b.yt) - 5 - rnd() * 3], [b.xt, b.yt], 8);
      // Du bas vers le haut, chaque couche entre deux lignes penchées différemment dans chaque motte.
      let ya = base, yb2 = base;
      couches.forEach(([ep, at], k) => {
        const der = k === couches.length - 1;
        const tilt = (rnd() * 2 - 1) * 5;
        const na = der ? null : ya - ep + tilt, nb = der ? null : yb2 - ep - tilt;
        const bas = [[lerpX(b, yb2), yb2], [lerpX(a, ya), ya]];
        const haut = der ? dome : [[lerpX(a, na), na], [lerpX(b, nb), nb]];
        out.push(poly([...haut, ...bas], at));
        if (!der) lignes.push(ouvert(haut, h.a.fin));
        ya = na; yb2 = nb;
      });
      out.push(ouvert(dome, h.a.detail));
    }
    joints.forEach((j, i) => { if (i > 0 && i < c.n) lignes.push(ouvert([[j.xt, j.yt], [j.xb, base]], h.a.detail)); });
    return { svg: out.concat(lignes).join('\n'), joints };
  };
  // Le sol en place à gauche : mousse au bout, noir, gris, rouille ; la motte à lever en tireté.
  const enPlace = (z, c, prof, graine) => {
    const out = [], rnd = alea(graine), { ys, NB, NG } = c;
    out.push(bande(2, z.l - 2, c.yR, () => z.h - 2, FR));
    out.push(trace(2, z.l - 2, c.yR, h.a.detail));
    out.push(bande(2, c.xw, (x) => ys + NB, c.yR, FG));
    out.push(h.rect(2, ys, c.xw - 2, NB, FN));
    out.push(ouvert([[2, ys + NB], [c.xw, ys + NB]], h.a.fin));
    out.push(ouvert([[2, ys], [c.xw, ys]], h.a.arete));
    out.push(mousse(2, c.xm, ys, 11, rnd, [c.xm]));
    // La motte que la bêche va lever : de la lame jusqu'au bord du bêché.
    const trait = [[c.xa, ys], [c.xa, ys + prof], [c.xw, ys + prof]];
    out.push(ouvert(trait, `fill="none" stroke="${B}" stroke-width="3"`), ouvert(trait, h.a.cache));
    return out.join('\n');
  };

  // Le geste de la bêche : la motte soulevée et retournée sur le bêché.
  const retourne = (c) => h.fleche(`M ${f((c.xa + c.xw) / 2)} ${f(c.ys - 6)} Q ${f(c.xw + 2)} ${f(c.ys - 74)} ${f(c.xw + c.wk * 0.55)} ${f(c.ys - 13)}`);

  return {
    ref: '96-02',
    titre: 'Le trou d’essai et le premier bêchage',
    desc: 'En coupe, le trou d’essai creusé jusqu’à la couche rouille : sous la mousse, la mince couche noire, la couche grise délavée, puis la couche rouille à la limite nette ; plus bas, la couleur tourne au jaune. Chaque couche a sa trame : quadrillé serré pour le noir, points pour le gris, rayures pour la rouille, tirets courts en quinconce pour le jaune. Dessous, deux bêchages côte à côte, au même sol et à la même échelle. Bien : la mousse levée d’abord ; la bêche n’entre que dans la couche noire, la motte retournée est noire et reste en haut ; la fourche plantée à travers, basculée d’avant en arrière, ameublit le gris sans le remonter. Raté : la bêche enfoncée de toute sa lame jusque dans le gris ; la motte retournée met le gris par-dessus et enterre le noir dessous.',
    format: 'pleine',
    disposition: [['essai'], ['bien', 'rate']],
    hauteurs: [1, 1.45],
    vues: {
      essai: {
        titre: 'Le trou d’essai',
        dessin: (z) => {
          const g = essai(z), rnd = alea(7), out = [DEFS];
          const x0 = 2, x1 = z.l - 2, yb = z.h - 2;
          out.push(bande(x0, x1, g.yJ, () => yb, FJ));
          out.push(bande(x0, x1, g.yR, g.yJ, FR));
          out.push(bande(x0, x1, g.yN, g.yR, FG));
          out.push(bande(x0, x1, () => g.ys, g.yN, FN));
          out.push(trace(x0, x1, g.yN, h.a.fin));
          out.push(trace(x0, x1, g.yR, h.a.detail));
          // Le trou : vide, parois un peu évasées, fond arrondi aux coins, dans la rouille.
          const hl = g.cx - g.wt / 2, hr = g.cx + g.wt / 2, bl = g.cx - g.wb / 2, br = g.cx + g.wb / 2;
          const yf = g.ys + g.D, r = 9;
          const murs = [[hl, g.ys], [bl, yf - r], ...bez([bl, yf - r], [bl, yf], [bl + r, yf], 4).slice(1),
            [br - r, yf], ...bez([br - r, yf], [br, yf], [br, yf - r], 4).slice(1), [hr, g.ys]];
          out.push(poly(murs, h.a.blanc));
          out.push(ouvert(murs, h.a.arete));
          out.push(ouvert([[x0, g.ys], [hl, g.ys]], h.a.arete), ouvert([[hr, g.ys], [x1, g.ys]], h.a.arete));
          out.push(mousse(x0, hl, g.ys, g.MO, rnd, [hl]), mousse(hr, x1, g.ys, g.MO, rnd, [hr]));
          return out.join('\n');
        },
        renvois: (z) => {
          const g = essai(z), hl = g.cx - g.wt / 2, xr = g.cx + 34;
          const paroi = (y) => g.cx - g.mur(y);
          const yNm = g.ys + g.NB / 2, yGm = g.ys + g.NB + g.NG / 2, yRm = g.ys + g.NB + g.NG + 18;
          return [
            { n: 1, rond: [hl - 44, 12], cible: [hl - 22, g.ys - 6], texte: 'mousse et tapis de racines' },
            { n: 2, rond: [xr - 60, yNm], cible: [paroi(yNm) - 10, yNm], texte: 'couche noire, mince : ce qui nourrit' },
            { n: 3, rond: [xr - 60, yGm], cible: [paroi(yGm) - 12, yGm], texte: 'couche grise délavée ; elle peut manquer' },
            { n: 4, rond: [xr - 60, yRm], cible: [paroi(yRm) - 12, yRm], texte: 'couche rouille : on creuse jusque-là' },
            { n: 5, rond: [g.cx + 40, g.ys + g.D - 17], cible: [g.cx + 58, g.yJ(g.cx + 58) + 16], texte: 'plus bas, la couleur tourne au jaune' },
          ];
        },
      },
      bien: {
        titre: 'Bien : le noir reste en haut',
        dessin: (z) => {
          const c = champ(z), out = [];
          out.push(enPlace(z, c, c.NB, 3));
          // Une plaque de mousse levée, retournée sur le sol nu : coussins en bas, racines en l'air.
          const M = c.ys - 10.9, pq = mousse(31, 53, c.ys - 10, 8, alea(11), [31, 53]);
          out.push(`<g transform="translate(0 ${f(2 * M)}) scale(1 -1)">${pq}</g>`);
          let rac = '';
          for (let x = 33; x < 52; x += 2.6) rac += ` M ${f(x)} ${f(c.ys - 11.8)} l ${f(((x * 7) % 3) - 1.5)} -${f(2.5 + (x % 2))}`;
          out.push(`<path d="${rac.trim()}" ${h.a.fin}/>`, ouvert([[31, c.ys - 11.8], [53, c.ys - 11.8]], h.a.detail));
          // Le bêché : le gris reste en place, ameubli ; les mottes de noir retournées par-dessus.
          out.push(bande(c.xw, z.l - 2, () => c.ys + c.NB, c.yR, FG));
          const rnd = alea(17);
          for (let i = 0; i < 9; i++) {
            const x = c.xw + 8 + i * (z.l - c.xw - 16) / 8 + (rnd() * 2 - 1) * 3, y = c.ys + c.NB + 5 + rnd() * 6;
            out.push(ouvert([[x, y], [x + 2.5, y + 7], [x - 1, y + 14], [x + 2, y + 21 + rnd() * 8]], h.a.detail));
          }
          const m = mottes(z, c, c.ys + c.NB, [[c.NB, FN]], 29);
          out.push(m.svg);
          out.push(beche(c.xs, c.ys + c.NB, c.k));
          const fx = c.xw + 2.5 * c.wk, fk = fourche(fx, c.ys + c.NB + 30, c.k);
          out.push(fk.svg);
          // La fourche se bascule d'avant en arrière, sans être levée.
          const pv = [fx, c.ys + c.NB + 12], R = pv[1] - (fk.yg + 40);
          const pt = (deg) => { const a = deg * Math.PI / 180; return [pv[0] + R * Math.sin(a), pv[1] - R * Math.cos(a)]; };
          [[4, 13], [-4, -13]].forEach(([a0, a1]) => {
            const p0 = pt(a0), p1 = pt(a1);
            out.push(h.fleche(`M ${f(p0[0])} ${f(p0[1])} A ${f(R)} ${f(R)} 0 0 ${a1 > 0 ? 1 : 0} ${f(p1[0])} ${f(p1[1])}`));
          });
          // Le geste de la bêche : la motte de noir soulevée et retournée sur le bêché.
          out.push(retourne(c));
          return out.join('\n');
        },
        renvois: (z) => {
          const c = champ(z), fx = c.xw + 2.5 * c.wk;
          return [
            { n: 6, rond: [14, c.ys - 44], cible: [38, c.ys - 9], texte: 'mousse levée d’abord, en plaques' },
            { n: 7, rond: [34, c.ys - 90], cible: [c.xs - 4, c.ys + 8], texte: 'bêche enfoncée dans le noir seulement' },
            { n: 8, rond: [z.l - 12, c.ys - 50], cible: [z.l - 22, c.ys + 3], texte: 'motte retournée : le noir reste en haut' },
            { n: 9, rond: [z.l - 12, c.ys + c.NB + 20], cible: [fx + 13, c.ys + c.NB + 14], texte: 'le gris ameubli à la fourche, pas remonté' },
          ];
        },
      },
      rate: {
        titre: 'Raté : le gris remonte par-dessus',
        dessin: (z) => {
          const c = champ(z), out = [];
          out.push(enPlace(z, c, c.NB + c.NG, 5));
          // Le bêché : chaque motte retournée pose son gris par-dessus son noir.
          const m = mottes(z, c, c.ys + c.NB + c.NG, [[c.NB, FN], [c.NG, FG]], 41);
          out.push(m.svg);
          out.push(beche(c.xs, c.ys + c.NB + c.NG, c.k));
          out.push(retourne(c));
          return out.join('\n');
        },
        renvois: (z) => {
          const c = champ(z);
          return [
            { n: 10, rond: [34, c.ys - 90], cible: [c.xs - 4, c.ys + c.NB + 18], texte: 'bêche enfoncée jusque dans le gris' },
            { n: 11, rond: [z.l - 12, c.ys - 50], cible: [z.l - 40, c.ys + 6], texte: 'le gris retourné par-dessus' },
            { n: 12, rond: [z.l - 12, c.ys + c.NG + 4], cible: [z.l - 30, c.ys + c.NG + 8], texte: 'le noir enterré dessous' },
          ];
        },
      },
    },
  };
};
