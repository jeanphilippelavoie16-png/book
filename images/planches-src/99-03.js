// Planche 99-03 — la meule de foin ronde (chapitre 99, Les façons d'autrefois, § G, point 60, et
// « Le séchage du foin sans bâtiment »).
// Ce que le chapitre dit, et seulement ça : meule ronde sur un lit de pierres qui laisse passer
// l'air ; un trépied de perches au centre pour l'aérer ; le cœur bien tassé ; le dessus en pente
// pour que la pluie coule ; coiffé de ce qu'on a (écorce, toile, branches serrées).
// Le chapitre ne donne aucune mesure de la meule : aucune cote. Les proportions sont en unités du
// diamètre D, les mêmes dans les quatre vues ; la coupe, la vue de face et le plan sont à la même
// échelle et alignés (même sol pour les deux du haut, même axe pour la coupe et le plan).
// Le trépied reste sous la coiffe : ses pointes ne sortent pas, pour que la pluie ne descende pas
// le long des perches dans la cheminée.

const NOIR = '#1A1A1A';
const f = (v) => v.toFixed(1);

// hasard répétable
const alea = (graine) => () => {
  graine = (graine + 0x6D2B79F5) | 0;
  let t = Math.imul(graine ^ (graine >>> 15), 1 | graine);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// une pierre : un galet arrondi, contour lissé
const pierre = (cx, cy, rx, ry, r, at, rotMax = 0.25) => {
  const n = 8, pts = [];
  const rot = (r() - 0.5) * 2 * rotMax, cr = Math.cos(rot), sr = Math.sin(rot);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 2 * Math.PI + (r() - 0.5) * 0.45;
    const k = 0.8 + r() * 0.28;
    const lx = Math.cos(a) * rx * k, ly = Math.sin(a) * ry * k;
    pts.push([cx + lx * cr - ly * sr, cy + lx * sr + ly * cr]);
  }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${f(mid(pts[n - 1], pts[0])[0])} ${f(mid(pts[n - 1], pts[0])[1])}`;
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    d += ` Q ${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`;
  }
  return `<path d="${d} Z" ${at}/>`;
};

// une perche : long rectangle aux bouts arrondis
const perche = (x1, y1, x2, y2, r, at) => {
  const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * r, ny = (x2 - x1) / L * r;
  const p = (x, y) => `${f(x)} ${f(y)}`;
  return `<path d="M ${p(x1 + nx, y1 + ny)} L ${p(x2 + nx, y2 + ny)} A ${f(r)} ${f(r)} 0 0 0 ${p(x2 - nx, y2 - ny)} L ${p(x1 - nx, y1 - ny)} A ${f(r)} ${f(r)} 0 0 0 ${p(x1 + nx, y1 + ny)} Z" ${at}/>`;
};

// ── Géométrie, en unités de D (diamètre au rebord), origine à la pointe, y vers le bas ──
const G = {
  Rb: 0.42,      // rayon au pied : le flanc rentre en bas, le rebord déborde
  Rs: 0.5,       // rayon au rebord
  Hc: 0.48,      // hauteur du dessus en pente
  Hb: 1.03,      // de la pointe au lit de pierres
  rt: 0.2,       // rayon des pieds du trépied
  yX: 0.16,      // croisement des perches sous la pointe
  bout: 0.05,    // les perches dépassent le croisement de ça
  rp: 0.016,     // rayon d'une perche
  t: 0.012,      // épaisseur d'une pièce d'écorce
  Lb: 0.1,       // longueur d'une pièce le long de la pente
  pas: 0.075,    // d'une rangée à l'autre (recouvrement Lb − pas)
  sBas: 0.72,    // bas de la première rangée, un peu passé le rebord
  sCap: 0.085,   // la pièce pliée couvre ça de chaque côté de la pointe
};
const L0 = Math.hypot(G.Rs, G.Hc);
// le flanc : droit sous le rebord, puis qui rentre en s'arrondissant jusqu'au pied
const flanc = (() => {
  const P0 = [G.Rs, G.Hc], C = [G.Rs + 0.012, G.Hc + 0.36], P2 = [G.Rb, G.Hb], out = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
    out.push([a * P0[0] + b * C[0] + c * P2[0], a * P0[1] + b * C[1] + c * P2[1]]);
  }
  return out;                                   // du rebord au pied, côté droit
})();
// le contour du foin : pied gauche, flanc, pointe, flanc, pied droit
const FOIN = [...flanc.map(([x, y]) => [-x, y]).reverse(), [0, 0], ...flanc];
const U = [-G.Rs / L0, G.Hc / L0];            // le long de la pente, côté gauche, vers le bas
const Nn = [-G.Hc / L0, -G.Rs / L0];          // normale sortante, côté gauche
// point sur la pente : s le long, o au-dessus ; cote = -1 gauche, +1 droite
const QL = (s, o) => [U[0] * s + Nn[0] * o, U[1] * s + Nn[1] * o];
const QS = (s, o, cote) => { const p = QL(s, o); return cote < 0 ? p : [-p[0], p[1]]; };

// les pièces d'écorce d'un côté, du bas vers le haut (ordre de pose et de peinture)
const pieces = () => {
  const out = [];
  let offBas = 0, i = 0;
  for (;;) {
    const sLo = G.sBas - i * G.pas;
    let sHi = sLo - G.Lb;
    if (sLo <= G.sCap * 0.6) break;
    if (sHi < 0.004) sHi = 0.004;
    out.push({ sLo, sHi, oLo: offBas });
    // la pièce suivante pose son bas sur le dessus de celle-ci
    const fr = (G.Lb - G.pas) / G.Lb;
    offBas = G.t + fr * offBas;
    i++;
  }
  return out;
};
const PIECES = pieces();
const polyPiece = (p, cote) => [QS(p.sLo, p.oLo, cote), QS(p.sHi, 0, cote), QS(p.sHi, G.t, cote), QS(p.sLo, p.oLo + G.t, cote)];
const kApex = L0 / G.Rs;                      // décalage vertical à la pointe pour une épaisseur normale
const polyCap = () => [QS(G.sCap, G.t, -1), [0, -G.t * kApex], QS(G.sCap, G.t, 1), QS(G.sCap, 2 * G.t, 1), [0, -2 * G.t * kApex], QS(G.sCap, 2 * G.t, -1)];

// trépied : pieds (coupe) et croisement
const piedA = [-G.rt, G.Hb], piedB = [G.rt / 2, G.Hb];
const croix = [0, G.yX];
const bout = (pied) => {
  const dx = croix[0] - pied[0], dy = croix[1] - pied[1], l = Math.hypot(dx, dy);
  return [croix[0] + dx / l * G.bout, croix[1] + dy / l * G.bout];
};

module.exports = (h) => {
  const S = 210;                                         // px par D, coupe · face · plan
  const cadre = (z) => {
    const cx = z.l / 2, yG = z.h - 22, yP = yG - 15, yA = yP - G.Hb * S;
    const P = (p) => [cx + p[0] * S, yA + p[1] * S];
    return { cx, yG, yP, yA, P };
  };

  // la rangée de pierres vue de face ou coupée (même graine : ce sont les mêmes pierres)
  const rangeePierres = (c, at) => {
    const r = alea(9903);
    const out = [];
    let x = c.cx - (G.Rb + 0.03) * S;
    const xFin = c.cx + (G.Rb + 0.03) * S;
    while (x < xFin - 8) {
      const w = Math.min(19 + r() * 7, xFin - x);
      const ht = 11 + r() * 4;
      out.push(pierre(x + w / 2, c.yG - ht / 2 + 1, w / 2, ht / 2, r, at));
      x += w + 3 + r() * 3;
    }
    return out.join('\n');
  };

  const sol = (z, c) => [
    h.rect(4, c.yG, z.l - 8, 14, h.a.hachure('terre', 'aucun')),
    h.ligne(4, c.yG, z.l - 4, c.yG, h.a.arete),
  ].join('\n');

  const pierreAt = `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`;
  const halo = (d) => `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>`;
  const d = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${f(p[0])} ${f(p[1])}`).join(' ');

  // ── En coupe ──
  const coupe = (z) => {
    const c = cadre(z), P = c.P;
    const foin = FOIN.map(P);
    const vide = [piedA, croix, piedB].map(P);
    const rp = G.rp * S;
    const out = [
      sol(z, c),
      rangeePierres(c, pierreAt),
      h.chemin(foin, h.a.hachure('paille', 'contour'), true),
      h.chemin(vide, `fill="#FFFFFF" stroke="none"`, true),
      // la perche de derrière, vue ; puis celle du plan de coupe, coupée
      perche(...P(piedB), ...P(bout(piedB)), rp, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`),
      perche(...P(piedA), ...P(bout(piedA)), rp, h.a.hachure('bois', 'arete')),
      h.ellipse(...P(croix), 4.5, 3.5, h.a.plein),
    ];
    // l'écorce, du bas vers le haut, puis la pièce pliée
    for (const cote of [-1, 1]) for (const p of PIECES) out.push(h.chemin(polyPiece(p, cote).map(P), h.a.plein, true));
    out.push(h.chemin(polyCap().map(P), h.a.plein, true));
    // l'air : entre sous la meule, entre les pierres, et monte dans le trépied
    const yAir = c.yG - 6;
    const xG = c.cx - (G.Rb + 0.03) * S - 3, xD = c.cx + (G.Rb + 0.03) * S + 3;
    out.push(h.fleche(`M 5 ${f(yAir)} L ${f(xG)} ${f(yAir)}`, h.a.cache));
    out.push(h.fleche(`M ${f(z.l - 5)} ${f(yAir)} L ${f(xD)} ${f(yAir)}`, h.a.cache));
    const a0 = P([-0.045, G.Hb - 0.03]), a1 = P([-0.02, 0.42]);
    out.push(h.fleche(`M ${f(a0[0])} ${f(a0[1])} L ${f(a1[0])} ${f(a1[1])}`, h.a.cache));
    // où la vue grossie est prise
    const cD = P([0, 0.2]);
    out.push(h.cercle(cD[0], cD[1], 0.27 * S, `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-dasharray="3 3"`));
    return out.join('\n');
  };

  // ── De face ──
  const face = (z) => {
    const c = cadre(z), P = c.P;
    const r = alea(4411);
    const out = [sol(z, c), rangeePierres(c, pierreAt)];
    const mur = [...flanc.map(([x, y]) => [-x, y]).reverse(), ...flanc];
    out.push(h.chemin(mur.map(P), `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`, true));
    // le foin du flanc, peigné vers le bas
    const dans = (x, y) => {
      if (y < G.Hc + 0.03 || y > G.Hb - 0.03) return false;
      let rr = G.Rb;
      for (let i = 1; i < flanc.length; i++) if (y <= flanc[i][1]) { const q = flanc[i - 1], w = flanc[i]; rr = q[0] + (w[0] - q[0]) * (y - q[1]) / (w[1] - q[1]); break; }
      return Math.abs(x) < rr - 0.035;
    };
    for (let i = 0; i < 1400 && out.length < 190; i++) {
      const x = (r() - 0.5) * 2 * G.Rs, y = G.Hc + r() * (G.Hb - G.Hc);
      if (!dans(x, y)) continue;
      const p = P([x, y]), a = (r() - 0.5) * 0.5, l = 6 + r() * 5;
      out.push(h.chemin([p, [p[0] + Math.sin(a) * l, p[1] + Math.cos(a) * l]], h.a.fin));
    }
    // la coiffe : silhouette, puis rangées d'écorce vues de face
    const pBas = PIECES[0], pHaut = PIECES[PIECES.length - 1];
    const sil = [QS(pBas.sLo, 0, -1), QS(pBas.sLo, G.t, -1), QS(G.sCap, 2 * G.t, -1), [0, -2 * G.t * kApex],
      QS(G.sCap, 2 * G.t, 1), QS(pBas.sLo, G.t, 1), QS(pBas.sLo, 0, 1)];
    out.push(h.chemin(sil.map(P), `fill="#FFFFFF" stroke="${NOIR}" stroke-width="2.4" stroke-linejoin="round"`, true));
    const bords = PIECES.map((p) => QL(p.sLo, p.oLo + G.t)).concat([QL(G.sCap, 2 * G.t)]);
    const rJ = alea(77);
    bords.forEach((b, k) => {
      const y = b[1], rx = -b[0];
      if (k > 0) {
        // bord bas de la rangée, un peu déchiré
        const pts = [];
        const n = Math.max(3, Math.round(rx * S / 8));
        for (let j = 0; j <= n; j++) pts.push(P([-rx + (2 * rx * j) / n, y + (j === 0 || j === n ? 0 : (rJ() - 0.5) * 0.008)]));
        out.push(h.chemin(pts, h.a.detail));
      }
      // joints de la rangée k, jusqu'au bord de la rangée du dessus
      if (k >= bords.length - 1) return;
      const yH = bords[k + 1][1];
      const rad = (yy) => G.Rs * Math.max(yy, 0) / G.Hc;
      const pasA = rad(y) > 0.2 ? 30 : 50;
      for (let a = -90 + (k % 2 ? pasA / 2 : pasA) ; a < 90; a += pasA) {
        if (Math.abs(a) > 78) continue;
        const sn = Math.sin(a * Math.PI / 180);
        const p1 = P([sn * rx, y]), p2 = P([sn * rad(yH), yH]);
        out.push(h.chemin([p1, p2], h.a.fin));
        // une fibre au milieu de la pièce, pour l'écorce
        const sm = Math.sin((a + pasA / 2) * Math.PI / 180);
        if (Math.abs(a + pasA / 2) < 80 && (y - yH) * S > 7) {
          const q1 = P([sm * (rx - 0.004), y - 0.012]), q2 = P([sm * rad(yH + 0.012), yH + 0.012]);
          out.push(h.chemin([q1, q2], `fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="4 3"`));
        }
      }
    });
    // la pluie : coule sur l'écorce et tombe du rebord, hors du pied
    for (const cote of [-1, 1]) {
      const A = QS(0.26, 0.032, cote), B = QS(0.68, 0.032, cote), C = QS(0.77, 0.032, cote);
      const D = [C[0], C[1] + 0.15];
      const pa = P(A), pb = P(B), pc = P(C), pd = P(D);
      out.push(h.fleche(`M ${f(pa[0])} ${f(pa[1])} L ${f(pb[0])} ${f(pb[1])} Q ${f(pc[0])} ${f(pc[1])} ${f(pd[0])} ${f(pd[1])}`, h.a.arete));
    }
    return out.join('\n');
  };

  // ── Vue de dessus, avant le foin ──
  const plan = (z) => {
    const cx = z.l / 2, cy = z.h / 2 + 4;
    const P = (p) => [cx + p[0] * S, cy + p[1] * S];
    const r = alea(310);
    const out = [];
    const sp = 19.5, Rmax = (G.Rb + 0.03) * S - 7;
    for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) {
      const x = i * sp + (j % 2 ? sp / 2 : 0) + (r() - 0.5) * 3, y = j * sp * 0.866 + (r() - 0.5) * 3;
      if (Math.hypot(x, y) > Rmax) continue;
      out.push(pierre(cx + x, cy + y, 6.8 + r() * 2.6, 5.4 + r() * 2.2, r, pierreAt, Math.PI));
    }
    // où montera le pied du foin
    out.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(G.Rb * S)}" fill="none" stroke="#FFFFFF" stroke-width="4"/>`);
    out.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(G.Rb * S)}" fill="none" stroke="${NOIR}" stroke-width="1.4" stroke-dasharray="8 4"/>`);
    // le trépied vu d'en haut : trois perches qui montent vers le centre
    const pieds = [[-G.rt, 0], [G.rt / 2, -G.rt * 0.866], [G.rt / 2, G.rt * 0.866]];
    for (const p of pieds) {
      const l = Math.hypot(p[0], p[1]);
      const e = [-p[0] / l * 0.035, -p[1] / l * 0.035];
      out.push(perche(...P(p), ...P(e), G.rp * S, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`));
    }
    out.push(h.cercle(cx, cy, 5, h.a.plein));
    // le plan de la coupe : passe par un pied et par le centre, on regarde vers le fond
    const xa = cx - G.Rb * S - 22, xb = cx + G.Rb * S + 22;
    out.push(`<line x1="${f(xa)}" y1="${f(cy)}" x2="${f(xb)}" y2="${f(cy)}" stroke="${NOIR}" stroke-width="0.7" stroke-dasharray="14 3 2 3"/>`);
    out.push(h.ligne(xa, cy, xa + 10, cy, h.a.contour), h.ligne(xb - 10, cy, xb, cy, h.a.contour));
    out.push(h.fleche(`M ${f(xa + 2)} ${f(cy)} L ${f(xa + 2)} ${f(cy - 16)}`, h.a.arete));
    out.push(h.fleche(`M ${f(xb - 2)} ${f(cy)} L ${f(xb - 2)} ${f(cy - 16)}`, h.a.arete));
    return { svg: out.join('\n'), cx, cy, P };
  };

  // ── Le sommet en coupe, grossi deux fois ──
  const Sd = 2 * S;
  const detail = (z) => {
    const cx = z.l / 2, cy = z.h / 2 + 2, R = 0.27 * Sd;
    const yA = cy - 0.2 * Sd;
    const P = (p) => [cx + p[0] * Sd, yA + p[1] * Sd];
    return { cx, cy, R, P };
  };
  const detailSvg = (z) => {
    const { cx, cy, R, P } = detail(z);
    const id = 'clip-9903-sommet';
    const out = [`<defs><clipPath id="${id}"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}"/></clipPath></defs>`, `<g clip-path="url(#${id})">`];
    out.push(h.cercle(cx, cy, R, `fill="#FFFFFF" stroke="none"`));
    out.push(h.chemin(FOIN.map(P), h.a.hachure('paille', 'contour'), true));
    out.push(h.chemin([piedA, croix, piedB].map(P), `fill="#FFFFFF" stroke="none"`, true));
    const rp = G.rp * Sd;
    // trois perches, bouts sciés net, qui se croisent à la ligature et s'arrêtent juste au-dessus
    const net = (a, b, at) => {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L * rp, ny = (b[0] - a[0]) / L * rp;
      return h.chemin([[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]], at, true);
    };
    const bord = `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`;
    const piedM = [-G.rt * 0.15, G.Hb];
    const bout2 = (pd) => { const dx = croix[0] - pd[0], dy = croix[1] - pd[1], l = Math.hypot(dx, dy); return [croix[0] + dx / l * 0.08, croix[1] + dy / l * 0.08]; };
    out.push(net(P(piedM), P(bout2(piedM)), bord));
    out.push(net(P(piedB), P(bout2(piedB)), bord));
    out.push(net(P(piedA), P(bout2(piedA)), h.a.hachure('bois', 'arete')));
    // la ligature : une corde, départ qui sort sous les tours à gauche, tours serrés qui montent,
    // arrêt qui pend à droite
    const C = h.formes, ec = 3.4, w = 0.03, n = 4, y0 = G.yX + 0.022, pas = 0.011;
    out.push(String(C.corde([P([-w - 0.03, y0 + 0.05]), P([-w - 0.008, y0 + 0.012]), P([-w, y0 + 0.004])], { ep: ec, debut: 'libre', fin: 'ouvert', trait: 'detail' }).svg));
    const tours = [];
    for (let j = 0; j < n; j++) {
      const ya = y0 - j * pas;
      tours.push({ pts: [P([-w, ya]), P([0, ya - pas * 0.45]), P([w, ya - pas * 0.9])], ep: ec, debut: 'ouvert', fin: 'ouvert' });
    }
    out.push(String(C.cordes(tours, { trait: 'detail' }).svg));
    const yf = y0 - (n - 1) * pas - pas * 0.9;
    out.push(String(C.corde([P([w, yf]), P([w + 0.012, yf + 0.03]), P([w + 0.016, yf + 0.075])], { ep: ec, debut: 'ouvert', fin: 'libre', trait: 'detail' }).svg));
    // l'écorce du bas vers le haut, puis la pièce pliée sur la pointe
    const ecorce = `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`;
    for (const cote of [-1, 1]) for (const p of PIECES) {
      out.push(h.chemin(polyPiece(p, cote).map(P), ecorce, true));
      const m1 = P(QS(p.sLo - 0.006, p.oLo + G.t / 2, cote)), m2 = P(QS(p.sHi + 0.006, G.t / 2, cote));
      if (Math.hypot(m2[0] - cx, m2[1] - cy) < R + 30)
        out.push(h.chemin([m1, m2], `fill="none" stroke="${NOIR}" stroke-width="0.5" stroke-dasharray="5 3"`));
    }
    out.push(h.chemin(polyCap().map(P), ecorce, true));
    // la pluie passe par-dessus chaque recouvrement
    const a = P(QS(0.07, 0.046, -1)), b = P(QS(0.3, 0.046, -1));
    out.push(h.fleche(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`, h.a.arete));
    out.push('</g>');
    out.push(h.cercle(cx, cy, R, h.a.detail));
    return out.join('\n');
  };

  return {
    ref: '99-03',
    titre: 'La meule de foin ronde, aérée au trépied',
    desc: 'La meule ronde en coupe, de face, vue de dessus et au sommet grossi. Un lit de pierres posé à sec laisse passer l’air sous le foin ; un trépied de perches liées au sommet, planté au centre sur les pierres, garde une cheminée vide par où l’air monte ; le foin est monté autour et tassé au cœur ; le dessus en pente est coiffé d’écorce posée du bas vers le haut, chaque pièce par-dessus celle du dessous, et une pièce pliée couvre la pointe. La pluie coule sur l’écorce et tombe du rebord, hors du pied. Le trépied reste sous la coiffe. Le chapitre ne donne aucune mesure : la planche n’a pas de cote.',
    format: 'pleine',
    disposition: [['coupe', 'face'], ['plan', 'sommet']],
    hauteurs: [1.12, 1],
    largeurs: [[1, 1], [1, 1]],
    vues: {
      coupe: {
        titre: 'En coupe',
        dessin: (z) => coupe(z),
        renvois: (z) => {
          const c = cadre(z), P = c.P;
          return [
            { n: 1, rond: [16, c.yA + 0.2 * S], cible: P(QL(0.34, G.t)) },
            { n: 2, rond: [16, c.yA + 0.62 * S], cible: P([-0.34, 0.72]) },
            { n: 3, rond: [z.l - 16, c.yA + 0.5 * S], cible: P([0.055, 0.6]) },
            { n: 4, rond: [z.l - 16, c.yA + 0.8 * S], cible: P([-0.03, 0.72]) },
            { n: 5, rond: [16, c.yG - 42], cible: [c.cx - 0.38 * S, c.yG - 8] },
          ].map((r, i) => ({ ...r, texte: [
            'coiffe d’écorce, de toile ou de branches',
            'cœur de foin bien tassé',
            'trépied de perches au centre',
            'l’air entre sous la meule et monte',
            'lit de pierres, l’air passe entre',
          ][i] }));
        },
      },
      face: {
        titre: 'De face',
        dessin: (z) => face(z),
        renvois: (z) => {
          const c = cadre(z), P = c.P;
          const C = QS(0.77, 0.032, 1);
          return [{ n: 6, rond: [z.l - 14, c.yA + 0.8 * S], cible: P([C[0] - 0.005, C[1] + 0.1]), texte: 'la pluie coule et tombe du rebord' }];
        },
      },
      plan: {
        titre: 'Vue de dessus, avant le foin',
        dessin: (z) => plan(z).svg,
        renvois: (z) => {
          const p = plan(z);
          const pB = p.P([G.rt / 2, -G.rt * 0.866]);
          const a = 3 * Math.PI / 4;
          return [
            { n: 7, rond: [z.l - 16, 18], cible: pB, texte: 'pieds du trépied sur les pierres' },
            { n: 8, rond: [16, z.h - 16], cible: [p.cx + Math.cos(a) * G.Rb * S, p.cy + Math.sin(a) * G.Rb * S], texte: 'tour du pied de la meule' },
          ];
        },
      },
      sommet: {
        titre: 'Le sommet en coupe, grossi',
        dessin: (z) => detailSvg(z),
        renvois: (z) => {
          const { cx, cy, P } = detail(z);
          return [
            { n: 9, rond: [z.l - 16, cy + 30], cible: P(QS(0.27, G.t * 1.6, 1)), texte: 'écorce du bas vers le haut, en recouvrement' },
            { n: 10, rond: [z.l - 16, 18], cible: P(QS(0.05, G.t * 1.5, 1)), texte: 'une pièce pliée par-dessus la pointe' },
            { n: 11, rond: [16, cy + 40], cible: P([-0.02, G.yX]), texte: 'les trois perches liées ensemble' },
            { n: 12, rond: [16, 18], cible: P([-0.01, 0.06]), texte: 'foin tassé par-dessus les perches' },
          ];
        },
      },
    },
  };
};
