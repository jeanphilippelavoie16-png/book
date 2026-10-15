// Planche 77-01 — le bain de glace du poisson fumé (ch. 77, §9 « Le froid qui se prouve tout seul :
// le bain de glace » et « Le montage »).
// Le chapitre ne donne aucune dimension de la chaudière ni du seau : aucune cote. Ce qui se dessine,
// c'est ce que le chapitre rend spatial : la claie au fond du seau (le paquet hors de son jus), le
// poisson dans son papier, le seau debout dans une chaudière plus large de glace et d'eau, l'eau du
// bain plus haute que le poisson, la glace qui flotte (0 °C tant qu'il en reste), le couvercle posé.
// La charte : les parois coupées en aplat noir (tôle mince) ; la paroi d'en face de la chaudière, vue
// par-dessus l'eau, en gris loin. Le rouge : les glaçons qui flottent (ce qu'on regarde chaque jour),
// rien d'autre : le niveau de l'eau au-dessus du poisson se lit par le rappel tireté.
module.exports = (h) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const alea = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`);
  const poly = pts => 'M' + P(pts).join(' L') + ' Z';

  // Une chaudière évasée en coupe : fond à yb, bord à yt, demi-largeurs rb (fond) et rt (bord).
  // Rend la paroi gauche et la paroi droite (tôle mince, aplat noir) et le fond.
  const paroi = (cx, yt, yb, rt, rb, e) => {
    const xg = y => cx - (rb + (rt - rb) * (yb - y) / (yb - yt));
    const xd = y => 2 * cx - xg(y);
    return { xg, xd, e, cx, yt, yb };
  };
  const tole = (c) => {
    const { xg, xd, e, cx, yt, yb } = c;
    return [
      h.path(poly([[xg(yt), yt], [xg(yb), yb], [xd(yb), yb], [xd(yt), yt], [xd(yt) - e, yt], [xd(yb) - e, yb - e], [xg(yb) + e, yb - e], [xg(yt) + e, yt]]), A.plein),
      // la lèvre roulée du bord
      h.cercle(xg(yt) + e / 2, yt, e * 0.9, A.plein), h.cercle(xd(yt) - e / 2, yt, e * 0.9, A.plein),
    ].join('\n');
  };

  // Glaçons : des blocs anguleux à la surface, la plus grande part sous l'eau.
  const glacons = (x0, x1, yE, graine, k = 1) => {
    const r = alea(graine), out = [];
    let x = x0 + 2 * k;
    while (x < x1 - 10 * k) {
      const w = Math.min((14 + r() * 10) * k, x1 - x - 2 * k), hh = (13 + r() * 8) * k;
      const haut = yE - hh * (0.12 + r() * 0.08), bas = haut + hh;
      const a = (r() - 0.5) * 4 * k;
      const pts = [[x + 2 * k, haut + a], [x + w * 0.55, haut - a * 0.5], [x + w, haut + 3 * k + a], [x + w - 1.5 * k, bas - 2 * k], [x + w * 0.4, bas], [x + 1, bas - 4 * k]];
      out.push(h.path(poly(pts), blanc(A.detail)));
      // une arête de bloc, pour qu'on lise un volume
      out.push(h.ligne(x + w * 0.55, haut - a * 0.5 + 1, x + w * 0.5, bas - 3 * k, A.fin));
      x += w + (1 + r() * 3) * k;
    }
    return out.join('\n');
  };
  // un deuxième rang de glaçons, plus bas, sous les premiers
  const glacons2 = (x0, x1, y, graine, k = 1) => {
    const r = alea(graine), out = [];
    let x = x0 + 6 * k;
    while (x < x1 - 14 * k) {
      const w = Math.min((12 + r() * 8) * k, x1 - x - 4 * k), hh = (10 + r() * 6) * k, yy = y + r() * 5 * k;
      out.push(h.path(poly([[x, yy + 2 * k], [x + w * 0.6, yy], [x + w, yy + 3 * k], [x + w - 1, yy + hh], [x + 2, yy + hh - 2 * k]]), blanc(A.detail)));
      x += w + (5 + r() * 6) * k;
    }
    return out.join('\n');
  };

  // Le paquet : un poisson fumé roulé dans le papier. Le bout de la tête, gros et replié ; le bout
  // de la queue, mince, le papier tortillé. Il a la forme du poisson qu'il enveloppe.
  const paquet = (x0, x1, yt, yb) => {
    const m = (yt + yb) / 2, ht = yb - yt, L = x1 - x0;
    const xq = x1 - L * 0.16;                    // où le papier se tortille, à la queue
    const d = `M${r1(x0 + 8)} ${r1(yt + 4)} C${r1(x0 + L * 0.3)} ${r1(yt - 3)} ${r1(x0 + L * 0.6)} ${r1(yt + 2)} ${r1(xq)} ${r1(m - ht * 0.16)}`
      + ` L${r1(x1)} ${r1(m - ht * 0.36)} L${r1(x1 - 5)} ${r1(m)} L${r1(x1)} ${r1(m + ht * 0.36)} L${r1(xq)} ${r1(m + ht * 0.16)}`
      + ` C${r1(x0 + L * 0.6)} ${r1(yb + 1)} ${r1(x0 + L * 0.3)} ${r1(yb + 2)} ${r1(x0 + 8)} ${r1(yb - 3)}`
      + ` Q${r1(x0 - 3)} ${r1(m)} ${r1(x0 + 8)} ${r1(yt + 4)} Z`;
    return [
      h.path(d, blanc(A.contour)),
      // le rabat du papier, replié sur la tête
      h.path(`M${r1(x0 + 8)} ${r1(yt + 4)} Q${r1(x0 + 22)} ${r1(m)} ${r1(x0 + 9)} ${r1(yb - 3)}`, A.detail),
      // le tortillon de la queue
      h.ligne(xq, m - ht * 0.16, xq, m + ht * 0.16, A.detail),
      h.ligne(xq + 3, m - ht * 0.1, x1 - 4, m - ht * 0.26, A.fin), h.ligne(xq + 3, m + ht * 0.1, x1 - 4, m + ht * 0.26, A.fin),
      // les tours du papier autour du corps, en biais
      ...[0.3, 0.48, 0.66].map(f => h.path(`M${r1(x0 + L * f)} ${r1(yt + 1 + f * 4)} Q${r1(x0 + L * (f + 0.05))} ${r1(m)} ${r1(x0 + L * (f + 0.1))} ${r1(yb - 1 - f * 4)}`, A.fin)),
    ].join('\n');
  };

  // Toute la coupe, à l'échelle k, centrée en cx, fond posé à yb. eau : fraction de la hauteur
  // de la chaudière (le raté met l'eau à mi-hauteur du poisson).
  const montage = (cx, yb, k, { yEauVoulu } = {}) => {
    const out = [];
    const ch = paroi(cx, yb - 146 * k, yb, 146 * k, 124 * k, 3 * k);   // la chaudière
    const sh = paroi(cx, yb - 176 * k, yb - 3 * k, 76 * k, 64 * k, 2.4 * k); // le seau, posé sur le fond
    const yE = yEauVoulu != null ? yEauVoulu : yb - 128 * k;          // le niveau du bain
    // la paroi d'en face de la chaudière, vue par-dessus l'eau, en gris loin
    out.push(h.path(poly([[ch.xg(ch.yt) + ch.e, ch.yt], [ch.xd(ch.yt) - ch.e, ch.yt], [ch.xd(yE), yE], [ch.xg(yE), yE]]), A.loin));
    // l'eau du bain, entre la chaudière et le seau
    const eauG = poly([[ch.xg(yE) + ch.e, yE], [sh.xg(yE), yE], [sh.xg(sh.yb), sh.yb], [sh.xd(sh.yb), sh.yb], [sh.xd(yE), yE], [ch.xd(yE) - ch.e, yE], [ch.xd(ch.yb - ch.e) - ch.e, ch.yb - ch.e], [ch.xg(ch.yb - ch.e) + ch.e, ch.yb - ch.e]]);
    out.push(h.path(eauG, A.blanc), h.path(eauG, A.hachure('eau', 'aucun')));
    // la glace qui flotte, des deux côtés du seau
    out.push(h.ligne(ch.xg(yE) + ch.e, yE, sh.xg(yE), yE, A.detail), h.ligne(sh.xd(yE), yE, ch.xd(yE) - ch.e, yE, A.detail));
    out.push(glacons2(ch.xg(yE) + ch.e, sh.xg(yE), yE + 16 * k, 3, k), glacons2(sh.xd(yE), ch.xd(yE) - ch.e, yE + 16 * k, 8, k));
    out.push(glacons(ch.xg(yE) + ch.e, sh.xg(yE) - 1, yE, 5, k), glacons(sh.xd(yE) + 1, ch.xd(yE) - ch.e, yE, 9, k));
    out.push(tole(ch));

    // dans le seau : sa paroi d'en face, blanche (pas de gris loin dedans), le jus, la claie, le paquet
    const yF = sh.yb - sh.e;                       // dessus du fond du seau
    out.push(h.path(poly([[sh.xg(sh.yt), sh.yt], [sh.xd(sh.yt), sh.yt], [sh.xd(sh.yb), sh.yb], [sh.xg(sh.yb), sh.yb]]), A.blanc));
    const yJ = yF - 4 * k;                         // le jus
    out.push(h.path(poly([[sh.xg(yJ) + sh.e, yJ], [sh.xd(yJ) - sh.e, yJ], [sh.xd(yF) - sh.e, yF], [sh.xg(yF) + sh.e, yF]]), A.hachure('eau', 'aucun')));
    out.push(h.ligne(sh.xg(yJ) + sh.e, yJ, sh.xd(yJ) - sh.e, yJ, A.fin));
    // la claie : deux traverses en long, des bâtons en travers vus par le bout
    const rb = 3.4 * k, yC = yF - 7 * k;           // centre des bâtons en travers
    const xc0 = sh.xg(yC) + sh.e + 6 * k, xc1 = sh.xd(yC) - sh.e - 6 * k;
    out.push(h.rect(xc0 - 2 * k, yF - 3.2 * k, xc1 - xc0 + 4 * k, 3 * k, blanc(A.detail)));
    const nb = 9;
    for (let i = 0; i < nb; i++) {
      const x = xc0 + (xc1 - xc0) * i / (nb - 1);
      out.push(h.cercle(x, yC, rb, A.hachure('bois', 'detail')));
    }
    const yPb = yC - rb, yPt = yPb - 30 * k;       // le paquet posé sur la claie
    out.push(paquet(cx - 58 * k, cx + 58 * k, yPt, yPb));
    out.push(tole(sh));
    // le couvercle posé, un peu de travers, rien qui le serre
    const yl = sh.yt - 2.5 * k;
    out.push(h.path(poly([[sh.xg(sh.yt) - 6 * k, yl - 4.5 * k], [sh.xd(sh.yt) + 2 * k, yl - 6.5 * k], [sh.xd(sh.yt) + 2 * k, yl - 2.5 * k], [sh.xg(sh.yt) - 6 * k, yl - 0.5 * k]]), blanc(A.arete)));
    out.push(h.path(`M${r1(cx - 8 * k)} ${r1(yl - 5.6 * k)} Q${r1(cx)} ${r1(yl - 13 * k)} ${r1(cx + 8 * k)} ${r1(yl - 5.8 * k)}`, A.arete));
    return { out: out.join('\n'), ch, sh, yE, yPt, yPb, yC, xc0, xc1, yl };
  };

  const bon = z => {
    const k = Math.min((z.h - 20) / 182, (z.l - 90) / 300);
    const cx = z.l / 2, yb = z.h - 4;
    const m = montage(cx, yb, k);
    const svg = [m.out];
    // l'eau plus haute que le poisson : le dessus du paquet ramené en rappel jusque dans le bain
    svg.push(h.ligne(cx + 10 * k, m.yPt + 1, m.ch.xd(m.yPt) - m.ch.e - 2, m.yPt + 1, A.cache));
    svg.push(h.controle(m.ch.xd(m.yE) - 22 * k, m.yE + 2, 9));
    return {
      svg: svg.join('\n'),
      renvois: [
        { n: 1, rond: [m.ch.xg(m.yC) - 26, m.yC + 2], cible: [m.xc0 + 2, m.yC], texte: 'claie de bâtons au fond du seau' },
        { n: 2, rond: [m.ch.xg(m.yPt) - 26, m.yPt + 6], cible: [cx - 50 * k, m.yPt + 12 * k], texte: 'poisson fumé dans son papier' },
        { n: 3, rond: [m.ch.xg(m.ch.yt) - 26, m.ch.yt - 20], cible: [m.sh.xg(m.ch.yt - 20) - 1, m.ch.yt - 20], texte: 'seau debout dans une chaudière plus large' },
        { n: 4, rond: [m.sh.xd(m.sh.yt) + 40, m.yl - 4], cible: [m.sh.xd(m.sh.yt) + 1, m.yl - 5 * k], texte: 'couvercle posé, pas vissé ni serré' },
        { n: 5, rond: [m.ch.xd(m.yE) + 30, m.yE - 12], cible: [m.ch.xd(m.yE) - 30 * k, m.yE - 2], texte: 'glace et eau, recharger chaque jour' },
        { n: 6, rond: [m.ch.xd(m.yPt) + 30, m.yPt], cible: [m.ch.xd(m.yPt) - m.ch.e - 3, m.yPt], texte: 'eau du bain plus haute que le poisson' },
      ],
    };
  };

  const vue = f => ({ dessin: z => f(z).svg, renvois: z => f(z).renvois });
  return {
    ref: '77-01',
    titre: 'Le bain de glace du poisson fumé',
    desc: 'En coupe, une chaudière large remplie de glace et d’eau ; les glaçons flottent à la surface. Un seau plus petit est posé debout dedans. '
      + 'Au fond du seau, une claie de bâtons tient le paquet de poisson hors de son jus ; le poisson fumé est roulé dans du papier. '
      + 'L’eau du bain monte plus haut que le dessus du poisson. Le couvercle est posé sur le seau, sans être vissé.',
    format: 'demi',
    disposition: [['bon']],
    vues: {
      bon: { titre: 'En coupe', ...vue(bon) },
    },
  };
};
