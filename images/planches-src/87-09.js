// Planche 87-09 — La serpentine sur le tuyau du poêle. Chapitre 87, « L'eau chaude, sans
// chauffe-eau » : un tuyau de cuivre enroulé autour du tuyau de poêle, raccordé en bas et en haut
// à un réservoir placé plus haut que lui ; la chaude monte, la froide redescend, pas de pompe ;
// le réservoir reste ouvert à l'air ; la serpentine ne tourne jamais à sec. Aucun chiffre dans
// le passage : aucune cote.
//
// Le trajet de l'eau, vérifié : le départ froid est pris au fond du réservoir et ne fait que
// descendre jusqu'au bas de la serpentine ; la serpentine monte à chaque tour ; le retour chaud
// part du haut de la serpentine et ne fait que monter jusqu'au réservoir, où il entre dans le
// haut de la paroi, sous le niveau de l'eau. Tout le réservoir est plus haut que le dernier tour.
// Aucun point haut où l'air resterait pris : une bulle monte toujours vers le réservoir ouvert.
module.exports = (h) => {
  const NOIR = '#1A1A1A';
  const W = t => t.replace('fill="none"', 'fill="#ffffff"');
  const f = v => Math.round(v * 10) / 10;
  // une polyligne aux coins arrondis, échantillonnée
  const echant = (pts, r) => {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i], [cx, cy] = pts[i + 1];
      const l1 = Math.hypot(bx - ax, by - ay), l2 = Math.hypot(cx - bx, cy - by);
      const r1 = Math.min(r, l1 / 2), r2 = Math.min(r, l2 / 2);
      const p1 = [bx - (bx - ax) / l1 * r1, by - (by - ay) / l1 * r1], p2 = [bx + (cx - bx) / l2 * r2, by + (cy - by) / l2 * r2];
      out.push(p1);
      for (let k = 1; k <= 8; k++) {
        const t = k / 8, u = 1 - t;
        out.push([u * u * p1[0] + 2 * u * t * bx + t * t * p2[0], u * u * p1[1] + 2 * u * t * by + t * t * p2[1]]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  };
  const decale = (pts, o) => pts.map((p, i) => {
    const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, pts.length - 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    return [f(p[0] - dy / l * o), f(p[1] + dx / l * o)];
  });
  // un tube de cuivre : deux traits parallèles, l'intérieur blanc, bouts ouverts
  const tube = (pts, w, tr = h.a.arete) => {
    const A = decale(pts, w / 2), B = decale(pts, -w / 2);
    return [h.chemin([...A, ...[...B].reverse()], h.a.blanc, true), h.chemin(A, tr), h.chemin(B, tr)].join(String.fromCharCode(10));
  };
  // L'hélice : part devant, au centre du tuyau (y0), en allant vers la gauche ; monte d'un pas
  // par tour ; finit derrière, au centre, n tours et demi plus haut, en allant vers la droite.
  // Rend les morceaux de devant et ceux de derrière séparément.
  const helice = (xp, R, y0, p, n) => {
    const pts = [], dev = [], fin = 2 * Math.PI * (n + 0.5), N = Math.ceil((n + 0.5) * 96);
    for (let i = 0; i <= N; i++) {
      const phi = fin * i / N;
      pts.push([xp - R * Math.sin(phi), y0 - p * phi / (2 * Math.PI)]);
      dev.push(Math.cos(phi) >= 0);
    }
    return { pts, dev, yFin: y0 - p * (n + 0.5) };
  };
  // la serpentine en tube : décalée d'un seul tenant (pas de cassure aux coutures), puis
  // coupée en morceaux de devant ou de derrière
  const spire = (hel, w, devant, tr = h.a.arete) => {
    const A = decale(hel.pts, w / 2), B = decale(hel.pts, -w / 2), out = [];
    let i = 0;
    while (i < hel.pts.length) {
      let j = i;
      while (j + 1 < hel.pts.length && hel.dev[j + 1] === hel.dev[i]) j++;
      if (hel.dev[i] === devant) {
        const i0 = Math.max(i - 1, 0), a = A.slice(i0, j + 2), b = B.slice(i0, j + 2);
        out.push(h.chemin([...a, ...[...b].reverse()], h.a.blanc, true), h.chemin(a, tr), h.chemin(b, tr));
      }
      i = j + 1;
    }
    return out.join(String.fromCharCode(10));
  };
  const brisure = (x0, x1, y, a = 3) => {
    const pts = [], n = 6;
    for (let i = 0; i <= n; i++) pts.push([x0 + (x1 - x0) * i / n, y + (i % 2 ? -a : a)]);
    return pts;
  };

  // ─── Le montage entier, dans un repère local, mis à l'échelle s dans la vue ─────────────
  // Repère local : plancher à y = 340, tuyau de poêle en x = 110, mur à droite en x = 468.
  const L = { g: 340, xp: 110, rp: 12, xr0: 330, xr1: 446, xw: 468 };
  L.yc0 = L.g - 110;                 // bas de la serpentine
  L.yb = L.g - 226;                  // dessus de la tablette, fond du réservoir
  L.yt = L.yb - 76;                  // bord du réservoir
  L.yw = L.yt + 12;                  // niveau de l'eau
  L.yHot = L.yb - 50;                // entrée du retour chaud, haut de la paroi, sous l'eau
  L.yCold = L.yb - 7;                // départ froid, au fond
  L.xL = L.xr0 - 26;                 // descente froide

  const scene = (z, o) => {
    const { s, ox, oy, n, d, ferme } = o, tr = ferme ? h.a.detail : h.a.arete;
    const X = x => ox + x * s, Y = y => oy + y * s, P = ([x, y]) => [X(x), Y(y)];
    const out = [];
    const g = Y(L.g), xp = X(L.xp), rp = L.rp * s, R = rp + d / 2;
    const xr0 = X(L.xr0), xr1 = X(L.xr1), xw = X(L.xw), yb = Y(L.yb), yt = Y(L.yt), yw = Y(L.yw);
    // plancher et mur de côté, en coupe
    out.push(h.rect(X(-6), g, xw - X(-6), 10 * s, h.a.hachure('bois', 'aucun')));
    out.push(h.ligne(X(-6), g, xw, g, h.a.contour));
    out.push(h.rect(xw, Y(20), 14 * s, g + 10 * s - Y(20), h.a.hachure('bois', 'arete')));
    // la tablette et son équerre, fixées au mur
    out.push(h.rect(X(L.xr0 - 12), yb, xw - X(L.xr0 - 12), 8 * s, W(h.a.arete)));
    out.push(h.rect(xw - 7 * s, yb + 8 * s, 7 * s, 64 * s, W(h.a.arete)));
    out.push(h.chemin([P([L.xw - 7, L.yb + 60]), P([L.xw - 7, L.yb + 68]), P([L.xw - 70, L.yb + 8]), P([L.xw - 60, L.yb + 8])], W(h.a.arete), true));
    // le poêle : pattes, caisse, dessus, porte, collet
    for (const x of [32 + 6, 188 - 14]) out.push(h.rect(X(x), Y(L.g - 12), 8 * s, 12 * s, W(h.a.arete)));
    out.push(h.rect(X(32), Y(L.g - 88), 156 * s, 76 * s, W(h.a.contour)));
    out.push(h.rect(X(26), Y(L.g - 94), 168 * s, 6 * s, W(h.a.arete)));
    out.push(h.rect(X(L.xp - 52), Y(L.g - 78), 76 * s, 52 * s, W(h.a.arete)));
    out.push(h.rect(X(L.xp + 14), Y(L.g - 56), 6 * s, 10 * s, W(h.a.detail)));
    out.push(h.rect(xp - rp - 3 * s, Y(L.g - 102), 2 * rp + 6 * s, 8 * s, W(h.a.arete)));
    // la serpentine : derrière, puis le tuyau, puis devant
    const hel = helice(xp, R, Y(L.yc0), (84 / (n + 0.5)) * s, n);
    out.push(spire(hel, d, false, tr));
    // retour chaud : part derrière le tuyau, en haut, et monte sans jamais redescendre
    const yF = hel.yFin;
    const chaud = [[xp, yF], [xp + R + 8 * s, yF - 2 * s], [xr0 - 16 * s, Y(L.yHot)], [xr0 + 14 * s, Y(L.yHot)]];
    out.push(tube(echant(chaud, 10 * s), d, tr));
    // le tuyau de poêle, qui passe devant ce qui est derrière lui
    out.push(h.rect(xp - rp, Y(24), 2 * rp, Y(L.g - 102) - Y(24), W(h.a.arete)));
    out.push(h.chemin(brisure(xp - rp - 3, xp + rp + 3, Y(24), 2.5 * s), h.a.detail));
    for (const y of [L.g - 250, L.g - 320]) out.push(h.ligne(xp - rp, Y(y), xp + rp, Y(y), h.a.detail));
    out.push(spire(hel, d, true, tr));
    // départ froid : pris au fond du réservoir, descend, arrive par-devant au bas de la serpentine
    const froid = [[xr0 + 4 * s, Y(L.yCold)], [X(L.xL), Y(L.yCold)], [X(L.xL), Y(L.yc0 - 8)], [xp, Y(L.yc0)]];
    out.push(tube(echant(froid, 10 * s), d, tr));
    // le réservoir
    if (!ferme) {
      out.push(h.rect(xr0, yw, xr1 - xr0, yb - yw, h.a.hachure('eau', 'aucun')));
      out.push(h.ligne(xr0, yw, xr1, yw, h.a.arete));
      out.push(h.chemin([[xr0, yt], [xr0, yb], [xr1, yb], [xr1, yt]], h.a.contour));
      out.push(h.cercle(xr0 - 2, yt, 2.2, W(h.a.arete)), h.cercle(xr1 + 2, yt, 2.2, W(h.a.arete)));
    } else {
      // fermé partout, bouchon vissé : plein ras bord, rien ne sort
      const rr = 8 * s;
      out.push(h.path(`M ${f(xr0)} ${f(yt + rr)} Q ${f(xr0)} ${f(yt)} ${f(xr0 + rr)} ${f(yt)} L ${f(xr1 - rr)} ${f(yt)} Q ${f(xr1)} ${f(yt)} ${f(xr1)} ${f(yt + rr)} L ${f(xr1)} ${f(yb)} L ${f(xr0)} ${f(yb)} Z`, h.a.hachure('eau', 'contour')));
      const xc = (xr0 + xr1) / 2;
      out.push(h.rect(xc - 9 * s, yt - 9 * s, 18 * s, 9 * s, h.a.plein));
    }
    // les raccords à travers la paroi : un écrou de chaque côté
    for (const y of [Y(L.yCold), Y(L.yHot)]) {
      const e = Math.max(4 * s, 2), hh = Math.max(12 * s, d + 3);
      out.push(h.rect(xr0 - e - 1, y - hh / 2, e, hh, W(h.a.arete)), h.rect(xr0 + 1, y - hh / 2, e, hh, W(h.a.arete)));
    }
    return { svg: out.join(String.fromCharCode(10)), X, Y, xp, rp, R, yF, xr0, xr1, yb, yt, yw, g };
  };

  const MONT = z => {
    const s = Math.min(1, (z.h - 2) / 330), largeur = (482 - 26) * s;
    return { s, ox: Math.round((z.l - largeur) / 2 - 26 * s + 10), oy: Math.round(z.h - 350 * s - 1), n: 8, d: 6, ferme: false };
  };
  const FERME = z => {
    const s = Math.min((z.l - 40) / 470, (z.h - 30) / 350);
    return { s, ox: Math.round((z.l - 456 * s) / 2 - 26 * s), oy: Math.round((z.h - 350 * s) / 2 - 2), n: 4, d: 3.6, ferme: true };
  };

  // ─── Le détail de la serpentine ──────────────────────────────────────────────────────
  const DET = z => {
    const xp = Math.round(z.l * 0.34), cy = Math.round(z.h / 2) + 2, rp = 30, d = 12, n = 4, p = 18;
    const y0 = cy + p * (n + 0.5) / 2;
    return { xp, cy, rp, d, n, p, y0, R: rp + d / 2, yF: y0 - p * (n + 0.5) };
  };

  return {
    ref: '87-09',
    titre: 'La serpentine sur le tuyau du poêle',
    desc: 'Eau chaude sans chauffe-eau et sans pompe. De face : un poêle à bois, son tuyau qui monte ; juste au-dessus du poêle, un tube de cuivre enroulé en serpentine autour du tuyau, tours serrés. À droite, plus haut que le dernier tour de la serpentine, un réservoir ouvert sur le dessus, posé sur une tablette fixée au mur, plein d’eau. Deux tubes le relient à la serpentine, chacun à travers la paroi par un raccord serré de chaque côté : le départ froid est pris au fond du réservoir, descend et arrive au bas de la serpentine ; le retour chaud part du haut de la serpentine, monte sans jamais redescendre et entre dans le haut du réservoir, sous le niveau de l’eau. Des flèches suivent l’eau : elle descend froide, chauffe en montant dans la serpentine, remonte chaude au réservoir ; la fumée monte dans le tuyau. En détail, la serpentine grossie : les tours collés au tuyau, le froid qui entre en bas par-devant, le chaud qui sort en haut par-derrière. En petit, barré : le même montage avec un réservoir fermé, bouchon vissé, sans évent. L’encadré danger dit ce qui cède quand le circuit est fermé, et pourquoi la serpentine ne chauffe jamais à sec.',
    format: 'pleine',
    disposition: [['montage'], ['serpentine', 'ferme']],
    hauteurs: [3, 2],
    largeurs: [[1], [1, 1]],
    vues: {
      // ── Le montage, de face ─────────────────────────────────────────────────────────
      montage: {
        titre: 'De face : le poêle, la serpentine, le réservoir',
        dessin: z => {
          const sc = scene(z, MONT(z));
          const { X, Y, xp, xr0 } = sc;
          const out = [sc.svg];
          // l'eau : descend froide, remonte chaude ; la fumée monte dans le tuyau
          out.push(h.fleche(`M ${f(X(L.xL) - 12)} ${f(Y(L.yb + 30))} L ${f(X(L.xL) - 12)} ${f(Y(L.yb + 78))}`));
          const a = [xp + sc.R + 30, sc.yF - 16], b = [xr0 - 60, Y(L.yHot) - 16];
          const t = 0.18, a2 = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], b2 = [a[0] + (b[0] - a[0]) * (1 - t * 2), a[1] + (b[1] - a[1]) * (1 - t * 2)];
          out.push(h.fleche(`M ${f(a2[0])} ${f(a2[1])} L ${f(b2[0])} ${f(b2[1])}`));
          out.push(h.fleche(`M ${f(xp)} ${f(Y(L.yc0 - 104))} L ${f(xp)} ${f(Y(L.yc0 - 170))}`, h.a.cache));
          return out.join(String.fromCharCode(10));
        },
        renvois: z => {
          const o = MONT(z), X = x => o.ox + x * o.s, Y = y => o.oy + y * o.s;
          const xp = X(L.xp);
          const hotMid = [(xp + X(L.xr0)) / 2, (Y(L.yc0 - 84) + Y(L.yHot)) / 2 - 2];
          return [
            { n: 1, rond: [xp - 58, Y(L.yc0 - 40)], cible: [xp - L.rp - 4, Y(L.yc0 - 40)], texte: 'tube de cuivre enroulé sur le tuyau' },
            { n: 2, rond: [hotMid[0] - 10, hotMid[1] - 36], cible: [hotMid[0] - 6, hotMid[1] - 3], texte: 'le chaud monte, entre en haut' },
            { n: 3, rond: [X(L.xL) + 34, Y(L.yb + 64)], cible: [X(L.xL) + 3, Y(L.yb + 64)], texte: 'le froid redescend, pris au fond' },
            { n: 4, rond: [X(L.xr1) - 30, Y(L.yb + 40)], cible: [X(L.xr1) - 30, Y(L.yb) + 9], texte: 'réservoir plus haut que la serpentine' },
            { n: 5, rond: [X(L.xr1) - 14, 11], cible: [X(L.xr1) - 26, Y(L.yw) + 3], texte: 'toujours plein : jamais à sec' },
            { n: 6, rond: [X(L.xr0) - 34, Y(L.yt) + 2], cible: [X(L.xr0) - 5, Y(L.yt)], texte: 'ouvert à l’air, jamais fermé' },
          ];
        },
      },
      // ── La serpentine grossie ────────────────────────────────────────────────────────
      serpentine: {
        titre: 'La serpentine, grossie',
        dessin: z => {
          const q = DET(z), out = [];
          const hel = helice(q.xp, q.R, q.y0, q.p, q.n);
          const yA = 14, yZ = z.h - 10;
          out.push(spire(hel, q.d, false));
          const sortie = [[q.xp, q.yF], [q.xp + q.R + 14, q.yF - 3], [z.l - 14, q.yF - 20]];
          out.push(tube(echant(sortie, 12), q.d));
          out.push(h.rect(q.xp - q.rp, yA, 2 * q.rp, yZ - yA, W(h.a.arete)));
          out.push(h.chemin(brisure(q.xp - q.rp - 4, q.xp + q.rp + 4, yA, 3), h.a.detail));
          out.push(h.chemin(brisure(q.xp - q.rp - 4, q.xp + q.rp + 4, yZ, 3), h.a.detail));
          out.push(spire(hel, q.d, true));
          const entree = [[z.l - 14, q.y0 - 6], [q.xp + q.R + 20, q.y0 - 1], [q.xp, q.y0]];
          out.push(tube(echant(entree, 12), q.d));
          // l'eau froide entre, la chaude sort ; la fumée monte dans le tuyau
          out.push(h.fleche(`M ${z.l - 24} ${f(q.y0 - 22)} L ${f(q.xp + q.R + 34)} ${f(q.y0 - 17)}`));
          out.push(h.fleche(`M ${f(q.xp + q.R + 40)} ${f(q.yF + 12)} L ${z.l - 30} ${f(q.yF - 4)}`));
          out.push(h.fleche(`M ${q.xp} ${f(q.yF - 18)} L ${q.xp} ${yA + 8}`, h.a.cache));
          return out.join(String.fromCharCode(10));
        },
        renvois: z => {
          const q = DET(z);
          const yMid = q.cy + 4;
          return [
            { n: 7, rond: [q.xp - q.R - 30, yMid], cible: [q.xp - q.R + 2, yMid - 6], texte: 'tours serrés, collés au tuyau' },
            { n: 8, rond: [z.l - 50, q.y0 + 26], cible: [z.l - 50, q.y0 - 1], texte: 'le froid entre par le bas' },
            { n: 9, rond: [z.l - 50, 13], cible: [z.l - 50, q.yF - 19], texte: 'le chaud sort par le haut' },
          ];
        },
      },
      // ── Raté : le circuit fermé ──────────────────────────────────────────────────────
      ferme: {
        titre: 'Raté : fermé, sans évent',
        dessin: z => {
          const sc = scene(z, FERME(z));
          const m = 10;
          return [sc.svg,
            h.ligne(m, m, z.l - m, z.h - m, h.a.contour),
            h.ligne(m, z.h - m, z.l - m, m, h.a.contour)].join(String.fromCharCode(10));
        },
        renvois: z => {
          const o = FERME(z), X = x => o.ox + x * o.s, Y = y => o.oy + y * o.s;
          const xc = (X(L.xr0) + X(L.xr1)) / 2;
          return [
            { n: 10, rond: [xc - 44, Y(L.yt) - 8], cible: [xc - 9 * o.s, Y(L.yt) - 5 * o.s], texte: 'bouchon vissé : la pression monte' },
          ];
        },
      },
    },
    danger: 'Le réservoir reste ouvert à l’air. Un circuit fermé sans évent, chauffé par un poêle qu’on ne baisse pas, monte en pression jusqu’à ce que quelque chose cède, et ce qui cède projette dans la pièce de l’eau à plus de 100 °C. Ouvert, il déborde ou il bout, c’est tout. Et la serpentine ne chauffe jamais à sec : un tube vide contre le feu se ramollit et se bouche.',
  };
};
