// Planche 88-06 — la boîte tiède du levain (ch. 88, 5.B étape 10 ; tableau Matériel ; 5.C étape 15).
// Une glacière, une caisse de bois ou un tiroir bourré de linge de laine ; le pot au centre ;
// une bouteille d'eau chaude au toucher, pas bouillante, à côté du pot et non collée contre.
// Le pot fait deux fois le volume du levain, son couvercle se pose et ne se visse pas.
// La même boîte fait lever la pâte (bol couvert, jusqu'au double).
// Aucune cote : le chapitre ne donne aucune mesure de la boîte, du pot ni de la bouteille.
// La charte : la moitié vide du pot, vue par la coupe, en gris loin (on lit « à moitié ») ; la
// caisse de bois et le linge plié ont leur face de droite à l'ombre. Pas de gris sur la laine ni
// sur la coque coupées. Le rouge : le dernier linge qu'on pose (le geste) et, sur le raté, le
// contact de la bouteille contre le pot (l'endroit où ça casse).
module.exports = (h) => {
  const r1 = v => Math.round(v * 10) / 10;
  const pts = p => p.map(q => q.map(r1).join(',')).join(' ');
  const blanc = a => a.replace('fill="none"', h.a.blanc.split(' ')[0]);
  const ombre = a => a.replace('fill="none"', h.a.ombre.split(' ')[0]);

  // Bulles du levain et de la pâte : positions fixes, relatives au rectangle qu'elles remplissent
  const BULLES = [
    [0.12, 0.30, 2.4], [0.30, 0.18, 1.5], [0.46, 0.42, 2.8], [0.66, 0.22, 1.8], [0.84, 0.36, 2.2],
    [0.20, 0.62, 1.7], [0.40, 0.76, 2.0], [0.58, 0.60, 1.4], [0.76, 0.70, 2.6], [0.90, 0.84, 1.5],
    [0.10, 0.86, 1.6], [0.52, 0.90, 1.3], [0.28, 0.44, 1.2], [0.70, 0.46, 1.3],
  ];
  const bulles = (x, y, l, ht, s) => BULLES.map(([u, v, r]) =>
    h.cercle(x + u * l, y + v * ht, r * Math.min(1, s * 1.1), h.a.fin)).join('\n');

  const plancher = (x1, x2, G) => [
    h.rect(x1, G, x2 - x1, 7, h.a.hachure('bois', 'aucun')),
    h.ligne(x1, G, x2, G, h.a.arete),
  ].join('\n');

  // ── Le pot de verre, en coupe : levain à mi-hauteur, couvercle posé ──
  const pot = (cx, yb, s) => {
    const jw = 62 * s, jh = 86 * s, nw = jw / 2 - 6 * s, yn = yb - jh, e = 3 * s;
    const profil = off => {
      const xl = cx - jw / 2 + off, xr = cx + jw / 2 - off, b = yb - off, n = nw - off, r = 8 * s;
      return `M ${r1(cx - n)},${r1(yn)} L ${r1(cx - n)},${r1(yn + 7 * s)} C ${r1(xl)},${r1(yn + 9 * s)} ${r1(xl)},${r1(yn + 11 * s)} ${r1(xl)},${r1(yn + 18 * s)} `
        + `L ${r1(xl)},${r1(b - r)} Q ${r1(xl)},${r1(b)} ${r1(xl + r)},${r1(b)} L ${r1(xr - r)},${r1(b)} Q ${r1(xr)},${r1(b)} ${r1(xr)},${r1(b - r)} `
        + `L ${r1(xr)},${r1(yn + 18 * s)} C ${r1(xr)},${r1(yn + 11 * s)} ${r1(xr)},${r1(yn + 9 * s)} ${r1(cx + n)},${r1(yn + 7 * s)} L ${r1(cx + n)},${r1(yn)}`;
    };
    const out = [];
    out.push(h.path(profil(0) + ' Z', h.a.blanc));
    // la moitié vide, vue par la coupe : gris loin ; le levain la recouvre en blanc par en bas
    out.push(h.path(profil(e) + ' Z', h.a.loin));
    // le levain : la moitié basse du pot, surface bombée, plein de bulles
    const yl = yb - jh * 0.5, xl = cx - jw / 2 + e, xr = cx + jw / 2 - e, b = yb - e, r = 6 * s;
    const lev = `M ${r1(xl)},${r1(yl + 3 * s)} Q ${r1(cx)},${r1(yl - 5 * s)} ${r1(xr)},${r1(yl + 3 * s)} L ${r1(xr)},${r1(b - r)} Q ${r1(xr)},${r1(b)} ${r1(xr - r)},${r1(b)} L ${r1(xl + r)},${r1(b)} Q ${r1(xl)},${r1(b)} ${r1(xl)},${r1(b - r)} Z`;
    out.push(h.path(lev, h.a.blanc), h.path(lev, h.a.detail));
    out.push(bulles(xl + 3 * s, yl + 2 * s, xr - xl - 6 * s, b - yl - 6 * s, s));
    // le verre : deux traits
    out.push(h.path(profil(0), h.a.contour));
    out.push(h.path(profil(e), h.a.fin));
    // le pas de vis du goulot
    for (const d of [-1, 1]) for (const k of [1.5, 4.5]) {
      const x = cx + d * nw;
      out.push(h.ligne(x, yn + k * s, x + d * 2.5 * s, yn + (k + 1.5) * s, h.a.detail));
    }
    // le couvercle posé à plat, sans être vissé
    const lw = nw + 4 * s, lt = 4 * s;
    out.push(h.rect(cx - lw, yn - lt, 2 * lw, lt, blanc(h.a.arete)));
    return { svg: out.join('\n'), yn, lid: yn - lt, xl: cx - jw / 2, xr: cx + jw / 2, yl, jw, jh };
  };

  // ── La bouteille d'eau chaude, en coupe : pleine jusqu'à l'épaule, bouchon vissé ──
  const bouteille = (cx, yb, s) => {
    const bw = 34 * s, xl = cx - bw / 2, xr = cx + bw / 2, n = 8 * s, r = 5 * s;
    const profil = `M ${r1(cx - n)},${r1(yb - 98 * s)} L ${r1(cx - n)},${r1(yb - 90 * s)} C ${r1(cx - n)},${r1(yb - 84 * s)} ${r1(xl)},${r1(yb - 80 * s)} ${r1(xl)},${r1(yb - 72 * s)} `
      + `L ${r1(xl)},${r1(yb - r)} Q ${r1(xl)},${r1(yb)} ${r1(xl + r)},${r1(yb)} L ${r1(xr - r)},${r1(yb)} Q ${r1(xr)},${r1(yb)} ${r1(xr)},${r1(yb - r)} `
      + `L ${r1(xr)},${r1(yb - 72 * s)} C ${r1(xr)},${r1(yb - 80 * s)} ${r1(cx + n)},${r1(yb - 84 * s)} ${r1(cx + n)},${r1(yb - 90 * s)} L ${r1(cx + n)},${r1(yb - 98 * s)}`;
    const out = [];
    out.push(h.path(profil + ' Z', h.a.blanc));
    const yw = yb - 74 * s, e = 2 * s;
    out.push(h.path(`M ${r1(xl + e)},${r1(yw)} L ${r1(xl + e)},${r1(yb - r)} Q ${r1(xl + e)},${r1(yb - e)} ${r1(xl + r)},${r1(yb - e)} L ${r1(xr - r)},${r1(yb - e)} Q ${r1(xr - e)},${r1(yb - e)} ${r1(xr - e)},${r1(yb - r)} L ${r1(xr - e)},${r1(yw)} Z`, h.a.hachure('eau', 'aucun')));
    out.push(h.ligne(xl + e, yw, xr - e, yw, h.a.detail));
    out.push(h.path(profil, h.a.arete));
    // le bouchon vissé, strié
    const cw = 10 * s, ct = yb - 109 * s, ch = 11 * s;
    out.push(h.rect(cx - cw, ct, 2 * cw, ch, blanc(h.a.arete)));
    for (let i = 1; i < 5; i++) out.push(h.ligne(cx - cw + i * 2 * cw / 5, ct + 2 * s, cx - cw + i * 2 * cw / 5, ct + ch - 2 * s, h.a.fin));
    return { svg: out.join('\n'), top: ct, xl, xr, yw, bw };
  };

  // ── Le grand bol couvert d'une assiette, la pâte au fond, la ligne du double ──
  const bol = (cx, yb, s) => {
    const R = 64 * s, P = 58 * s, f = 30 * s, yt = yb - P, e = 3 * s;
    const profil = off => `M ${r1(cx - R + off)},${r1(yt)} C ${r1(cx - R + 2 * s + off)},${r1(yb - 22 * s)} ${r1(cx - 46 * s + off)},${r1(yb - off)} ${r1(cx - f)},${r1(yb - off)} `
      + `L ${r1(cx + f)},${r1(yb - off)} C ${r1(cx + 46 * s - off)},${r1(yb - off)} ${r1(cx + R - 2 * s - off)},${r1(yb - 22 * s)} ${r1(cx + R - off)},${r1(yt)}`;
    const out = [];
    out.push(h.path(profil(0) + ' Z', h.a.blanc));
    // la pâte : bombée, pleine de bulles, au tiers du bol
    const yp = yb - 22 * s;
    out.push(h.path(`M ${r1(cx - 52 * s)},${r1(yp + 3 * s)} Q ${r1(cx)},${r1(yp - 7 * s)} ${r1(cx + 52 * s)},${r1(yp + 3 * s)}`, h.a.detail));
    out.push(bulles(cx - 40 * s, yp + 1 * s, 80 * s, yb - yp - 6 * s, s));
    // jusqu'où elle doit monter : le double
    const yd = yb - 42 * s;
    out.push(h.ligne(cx - 58 * s, yd, cx + 58 * s, yd, h.a.cache));
    out.push(h.path(profil(0), h.a.contour));
    out.push(h.path(profil(e), h.a.fin));
    // le pied
    out.push(h.rect(cx - 24 * s, yb, 48 * s, 3 * s, blanc(h.a.arete)));
    // l'assiette posée par-dessus
    const aw = R + 6 * s;
    out.push(h.path(`M ${r1(cx - aw)},${r1(yt - 2 * s)} L ${r1(cx - aw + 4 * s)},${r1(yt - 6 * s)} L ${r1(cx + aw - 4 * s)},${r1(yt - 6 * s)} L ${r1(cx + aw)},${r1(yt - 2 * s)} L ${r1(cx + aw - 3 * s)},${r1(yt)} L ${r1(cx - aw + 3 * s)},${r1(yt)} Z`, blanc(h.a.arete)));
    return { svg: out.join('\n'), top: yt - 6 * s, yd, yp, R };
  };

  // ── La glacière en coupe : coque, mousse, couvercle, bourrée de laine ──
  // Retourne aussi les repères de ce qu'elle contient.
  const glaciere = (x0, G, s, garnir) => {
    const t = 12 * s, Wi = 256 * s, W = Wi + 2 * t, bas = 26 * s, haut = 24 * s, plug = 5 * s;
    const Hi = bas + 109 * s + haut;
    const yiB = G - t - 4 * s, yT = yiB - Hi - plug, xi = x0 + t, xiR = x0 + W - t, yLid = yT - 15 * s;
    const out = [];
    // la laine d'abord, tout l'intérieur
    out.push(h.rect(xi, yT + plug, Wi, yiB - yT - plug, h.a.hachure('isolant', 'aucun')));
    const c = garnir({ cx: xi + Wi / 2, yb: yiB - bas, xi, xiR, s });
    out.push(c.svg);
    // la coque : paroi de mousse entre deux peaux de plastique
    const r = 8 * s, ri = 4 * s, yB = G - 4 * s;
    const ext = `M ${r1(x0)},${r1(yT)} L ${r1(x0)},${r1(yB - r)} Q ${r1(x0)},${r1(yB)} ${r1(x0 + r)},${r1(yB)} L ${r1(x0 + W - r)},${r1(yB)} Q ${r1(x0 + W)},${r1(yB)} ${r1(x0 + W)},${r1(yB - r)} L ${r1(x0 + W)},${r1(yT)}`;
    const int = `M ${r1(xiR)},${r1(yT)} L ${r1(xiR)},${r1(yiB - ri)} Q ${r1(xiR)},${r1(yiB)} ${r1(xiR - ri)},${r1(yiB)} L ${r1(xi + ri)},${r1(yiB)} Q ${r1(xi)},${r1(yiB)} ${r1(xi)},${r1(yiB - ri)} L ${r1(xi)},${r1(yT)}`;
    out.push(h.path(`${ext} L ${int.slice(2)} Z`, h.a.hachure('neige', 'aucun')));
    out.push(h.path(int, h.a.arete));
    out.push(h.path(ext, h.a.contour));
    // les patins sous le fond
    for (const x of [x0 + 18 * s, x0 + W - 34 * s]) out.push(h.rect(x, yB, 16 * s, G - yB, blanc(h.a.arete)));
    // le couvercle : même paroi, un bouchon qui entre dans l'ouverture
    const o = 3 * s, rl = 6 * s;
    const lid = `M ${r1(x0 - o)},${r1(yT)} L ${r1(x0 - o)},${r1(yLid + rl)} Q ${r1(x0 - o)},${r1(yLid)} ${r1(x0 - o + rl)},${r1(yLid)} L ${r1(x0 + W + o - rl)},${r1(yLid)} Q ${r1(x0 + W + o)},${r1(yLid)} ${r1(x0 + W + o)},${r1(yLid + rl)} L ${r1(x0 + W + o)},${r1(yT)} `
      + `L ${r1(xiR - 1)},${r1(yT)} L ${r1(xiR - 1)},${r1(yT + plug)} L ${r1(xi + 1)},${r1(yT + plug)} L ${r1(xi + 1)},${r1(yT)} Z`;
    out.push(h.path(lid, h.a.hachure('neige', 'contour')));
    // les poignées moulées aux deux bouts
    for (const [x, d] of [[x0, -1], [x0 + W, 1]]) {
      out.push(h.path(`M ${r1(x)},${r1(yT + 14 * s)} L ${r1(x + d * 7 * s)},${r1(yT + 17 * s)} L ${r1(x + d * 7 * s)},${r1(yT + 27 * s)} L ${r1(x)},${r1(yT + 30 * s)}`, blanc(h.a.arete)));
    }
    return { svg: out.join('\n'), c, x0, W, xi, xiR, yT, yiB, yLid, G, t, bas };
  };


  // Projection oblique : p en profondeur, vers le haut à droite
  const O = (x, y, p) => [x + p * 0.5, y - p * 0.35];

  // ── La caisse de bois ouverte, en perspective, avant le dernier linge ──
  const caisse = z => {
    const q = Math.min(1.3, (z.l - 34) / 200, (z.h - 16) / 214);
    const W = 150 * q, H = 66 * q, D = 96 * q, ep = 6 * q, x0 = (z.l - W - D * 0.5) / 2 - 6, G = z.h - 10, yH = G - H;
    const out = [plancher(0, z.l, G)];
    // flanc droit et face, en planches clouées
    out.push(h.path(`M ${pts([[x0 + W, yH], O(x0 + W, yH, D), O(x0 + W, G, D), [x0 + W, G]])} Z`, ombre(h.a.contour)));
    out.push(h.rect(x0, yH, W, H, blanc(h.a.contour)));
    for (const f of [1 / 3, 2 / 3]) {
      out.push(h.ligne(x0, yH + H * f, x0 + W, yH + H * f, h.a.detail));
      out.push(h.chemin([[x0 + W, yH + H * f], O(x0 + W, yH + H * f, D)], h.a.detail));
    }
    for (const f of [1 / 6, 1 / 2, 5 / 6]) for (const x of [x0 + 6 * q, x0 + W - 6 * q]) out.push(h.cercle(x, yH + H * f, 1.3, h.a.plein));
    // l'ouverture : l'épaisseur des planches, puis la laine
    out.push(h.path(`M ${pts([[x0, yH], O(x0, yH, D), O(x0 + W, yH, D), [x0 + W, yH]])} Z`, blanc(h.a.contour)));
    const ouv = [O(x0 + ep, yH, ep), O(x0 + ep, yH, D - ep), O(x0 + W - ep, yH, D - ep), O(x0 + W - ep, yH, ep)];
    out.push(h.path(`M ${pts(ouv)} Z`, h.a.hachure('isolant', 'arete')));
    // le couvercle du pot, au centre, à ras de la laine
    const k = 0.55 * q, [cx, cy] = O(x0 + W / 2, yH, D / 2), rx = (31 + 4) * k, ry = rx * 0.36, lh = 4 * k;
    out.push(h.ellipse(cx, cy + 2, rx + 6 * q, ry + 3 * q, blanc(h.a.detail)));
    out.push(h.path(`M ${r1(cx - rx)},${r1(cy - lh)} L ${r1(cx - rx)},${r1(cy)} A ${r1(rx)} ${r1(ry)} 0 0 0 ${r1(cx + rx)},${r1(cy)} L ${r1(cx + rx)},${r1(cy - lh)} Z`, blanc(h.a.arete)));
    out.push(h.ellipse(cx, cy - lh, rx, ry, blanc(h.a.arete)));
    // la bouteille, à côté, séparée du pot par la laine : le goulot et le bouchon dépassent
    const bx = cx + (31 + 28 + 17) * k, by = cy - 2 * q, nr = 8 * k, cr = 10 * k, nh = 10 * k;
    out.push(h.ellipse(bx, by + 2, nr + 5 * q, (nr + 5 * q) * 0.36, blanc(h.a.detail)));
    out.push(h.path(`M ${r1(bx - nr)},${r1(by)} L ${r1(bx - nr)},${r1(by - nh)} L ${r1(bx + nr)},${r1(by - nh)} L ${r1(bx + nr)},${r1(by)} A ${r1(nr)} ${r1(nr * 0.36)} 0 0 1 ${r1(bx - nr)},${r1(by)} Z`, blanc(h.a.arete)));
    const ct = by - nh - 11 * k;
    out.push(h.path(`M ${r1(bx - cr)},${r1(ct)} L ${r1(bx - cr)},${r1(by - nh)} A ${r1(cr)} ${r1(cr * 0.36)} 0 0 0 ${r1(bx + cr)},${r1(by - nh)} L ${r1(bx + cr)},${r1(ct)} Z`, blanc(h.a.arete)));
    for (const f of [-0.5, 0, 0.5]) out.push(h.ligne(bx + f * cr, ct + cr * 0.36 * Math.sqrt(1 - f * f) + 1, bx + f * cr, by - nh + cr * 0.36 * Math.sqrt(1 - f * f) - 1, h.a.fin));
    out.push(h.ellipse(bx, ct, cr, cr * 0.36, blanc(h.a.arete)));
    // le dernier linge de laine, plié en quatre, mou, qui descend par-dessus
    const lw = 128 * q, ld = 76 * q, lt = 12 * q, lx = x0 + (W - lw) / 2, ly = G - 214 * q + 34 * q;
    const A = [lx, ly], B = [lx + lw, ly], C = O(lx + lw, ly, ld), Dd = O(lx, ly, ld);
    const mil = (P1, P2, dy) => [(P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2 + dy];
    const Q = (P1, P2, dy) => { const m = mil(P1, P2, dy); return `Q ${r1(m[0])},${r1(m[1])} ${r1(P2[0])},${r1(P2[1])}`; };
    const Bb = [B[0], B[1] + lt], Cb = [C[0], C[1] + lt];
    out.push(h.path(`M ${r1(B[0])},${r1(B[1])} ${Q(B, C, -2)} L ${r1(Cb[0])},${r1(Cb[1] - 3)} Q ${r1(Cb[0] + 3)},${r1(Cb[1])} ${r1(Cb[0] - 2)},${r1(Cb[1] + 1)} ${Q([Cb[0] - 2, Cb[1] + 1], Bb, 3)} Z`, ombre(h.a.arete)));
    out.push(h.path(`M ${r1(A[0])},${r1(A[1])} ${Q(A, B, -3)} ${Q(B, C, -2)} ${Q(C, Dd, -3)} ${Q(Dd, A, -2)} Z`, h.a.hachure('isolant', 'arete')));
    // la tranche avant : les plis, bombés
    const fr = `M ${r1(A[0])},${r1(A[1])} C ${r1(A[0] - 6 * q)},${r1(A[1] + 1)} ${r1(A[0] - 6 * q)},${r1(A[1] + lt)} ${r1(A[0] + 2)},${r1(A[1] + lt + 1)} `
      + `Q ${r1(lx + lw / 2)},${r1(ly + lt + 5 * q)} ${r1(Bb[0])},${r1(Bb[1])} L ${r1(B[0])},${r1(B[1])} Q ${r1(lx + lw / 2)},${r1(ly - 3)} ${r1(A[0])},${r1(A[1])} Z`;
    out.push(h.path(fr, blanc(h.a.arete)));
    for (const f of [0.35, 0.68]) {
      out.push(h.path(`M ${r1(A[0] - 3 * q)},${r1(ly + lt * f)} Q ${r1(lx + lw / 2)},${r1(ly + lt * f + 3.5 * q)} ${r1(B[0])},${r1(ly + lt * f)}`, h.a.fin));
    }
    const [fx, fy] = O(lx + lw / 2, ly + lt, ld / 2);
    // le geste : poser le dernier linge par-dessus
    out.push(h.geste(`M ${r1(fx)},${r1(fy + 12 * q)} L ${r1(fx)},${r1(cy - ry - 16 * q)}`));
    return { svg: out.join('\n'), linge: O(lx + lw * 0.72, ly - 2, ld * 0.45), q };
  };

  // Les coupes de glacière : l'échelle suit la vue
  const montage = (z, contenu) => {
    const t = 12, W0 = 256 + 2 * t;
    const s = Math.min(1.25, (z.l - 64) / W0, (z.h - 44) / 214);
    const x0 = (z.l - W0 * s) / 2, G = z.h - 10;
    const g = glaciere(x0, G, s, contenu);
    return { s, x0, G, g };
  };

  const levainBon = ({ cx, yb, s }) => {
    const p = pot(cx, yb, s), bxc = p.xr + 28 * s + 17 * s, b = bouteille(bxc, yb, s);
    return { svg: [p.svg, b.svg].join('\n'), p, b };
  };
  const pate = ({ cx, yb, s }) => {
    const B = bol(cx - 24 * s, yb, s), b = bouteille(cx - 24 * s + B.R + 26 * s + 17 * s, yb, s);
    return { svg: [B.svg, b.svg].join('\n'), B, b };
  };

  // ── Le raté, en détail : un morceau de l'intérieur de la boîte, la bouteille collée au pot ──
  const rate = z => {
    const s = Math.min(1.3, (z.l - 40) / 144, (z.h - 60) / 157);
    const gw = 96 * s, gx = (z.l - gw) / 2, yb = z.h - 16 - 22 * s;
    const x1 = gx - 24 * s, x2 = gx + gw + 24 * s, y1 = yb - 109 * s - 24 * s, y2 = yb + 22 * s;
    // le bord déchiré du morceau : une ligne de coupure irrégulière
    const bord = [];
    const pas = 9, dent = 2.2;
    const cote = (xa, ya, xb, yb2) => {
      const L = Math.hypot(xb - xa, yb2 - ya), n = Math.max(2, Math.round(L / pas));
      for (let i = 0; i < n; i++) {
        const u = i / n, sgn = i % 2 ? 1 : -1;
        const nx = -(yb2 - ya) / L, ny = (xb - xa) / L;
        bord.push([xa + u * (xb - xa) + sgn * dent * nx, ya + u * (yb2 - ya) + sgn * dent * ny]);
      }
    };
    cote(x1, y1, x2, y1); cote(x2, y1, x2, y2); cote(x2, y2, x1, y2); cote(x1, y2, x1, y1);
    const out = [];
    out.push(h.chemin(bord, h.a.hachure('isolant', 'detail'), true));
    const p = pot(gx + 31 * s, yb, s), b = bouteille(gx + 62 * s + 17 * s + 0.6, yb, s);
    out.push(p.svg, b.svg);
    // l'endroit où ça casse : la bouteille collée contre le pot
    out.push(h.controle(p.xr, yb - 30 * s, 12 * s));
    return { svg: out.join('\n'), p, b, y1, s };
  };

  return {
    ref: '88-06',
    titre: 'La boîte tiède du levain',
    desc: 'En coupe, une glacière bourrée de linge de laine : du linge dessous, autour et par-dessus ; au centre, le pot de verre à moitié plein de levain, son couvercle simplement posé ; à côté, une bouteille d’eau chaude au toucher, séparée du pot par une bonne épaisseur de laine. À côté, en détail, le raté : la bouteille collée contre le pot. En bas, la même glacière fait lever la pâte, un grand bol couvert d’une assiette, la ligne tiretée marquant le double ; et la même chose dans une caisse de bois ouverte : le couvercle du pot à ras de la laine, le goulot de la bouteille qui dépasse à côté, et le dernier linge plié qui descend par-dessus avant de fermer.',
    format: 'pleine',
    disposition: [['coupe', 'rate'], ['pate', 'caisse']],
    hauteurs: [1.1, 1],
    largeurs: [[2.1, 1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe, dans une glacière',
        dessin: z => { const m = montage(z, levainBon); return [plancher(0, z.l, m.G), m.g.svg].join('\n'); },
        renvois: z => {
          const m = montage(z, levainBon), g = m.g, p = g.c.p, b = g.c.b;
          const xg = (p.xr + b.xl) / 2, yLaine = p.yl - 6 * m.s;
          return [
            { n: 1, rond: [14, g.yiB - g.bas / 2], cible: [(g.xi + p.xl) / 2 + 20, g.yiB - g.bas / 2], texte: 'linge de laine dessous, autour et par-dessus' },
            { n: 2, rond: [14, (p.yl + p.yn) / 2 + 6], cible: [p.xl + 14, (p.yl + p.yn) / 2 + 6], texte: 'pot au centre, rempli à moitié' },
            { n: 3, rond: [14, p.lid + 2], cible: [p.xl + p.jw * 0.3, p.lid + 2], texte: 'couvercle posé, pas vissé : le gaz sort' },
            { n: 4, rond: [z.l - 14, b.yw + 34 * m.s], cible: [(b.xl + b.xr) / 2, b.yw + 34 * m.s], texte: 'eau chaude au toucher, pas bouillante' },
            { n: 5, rond: [xg, g.yLid - 24], cible: [xg, yLaine], texte: 'à côté du pot, jamais collée contre' },
          ];
        },
      },
      rate: {
        titre: 'Raté : collée contre le pot',
        dessin: z => rate(z).svg,
        renvois: z => {
          const r = rate(z), x = r.p.xr;
          return [
            { n: 6, rond: [x, r.y1 - 20], cible: [x, r.p.yl], texte: 'collée : trop chaud pour le levain' },
          ];
        },
      },
      pate: {
        titre: 'La même boîte fait lever la pâte',
        dessin: z => { const m = montage(z, pate); return [plancher(0, z.l, m.G), m.g.svg].join('\n'); },
        renvois: z => {
          const m = montage(z, pate), B = m.g.c.B;
          return [
            { n: 7, rond: [14, B.yd], cible: [m.g.xi + 36 * m.s, B.yd], texte: 'bol couvert : la pâte lève jusqu’au double' },
          ];
        },
      },
      caisse: {
        titre: 'Caisse ou tiroir, avant de fermer',
        dessin: z => caisse(z).svg,
        renvois: z => {
          const c = caisse(z);
          return [
            { n: 8, rond: [z.l - 14, Math.max(14, c.linge[1] - 12)], cible: c.linge, texte: 'un dernier linge de laine par-dessus' },
          ];
        },
      },
    },
  };
};
