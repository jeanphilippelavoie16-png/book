// Planche 29-02 — Le collier des jours (chapitre 29, section 9-B).
// Ce que le chapitre donne : 32 marques sur une cordelette fermée en boucle ; la marque 1
// distincte (perle rouge, bout de cuivre, nœud triple) ; la marque 2 distincte de la 32 (perle
// plus petite, ou bout de fil qui pend du nœud) ; 2 à 7 et 20 à 32 pareilles (perles brunes,
// nœuds simples) ; 8 à 19 d'une autre sorte (perles blanches, nœuds doubles) ; la 27 distincte
// (nœud plus gros, perle plus foncée) ; un anneau qui glisse (rondelle de métal, boucle de fil de
// laiton) et avance d'une marque chaque matin ; un fil noué à la marque 1 qui porte un nœud
// d'arrêt par cycle hors plage. Aucune dimension dans le chapitre : aucune cote.
// En noir et blanc : brun = hachure, blanc = blanc, plus foncé = noir ; le cuivre = un bout de tube.
module.exports = (h) => {
  const F = h.formes;
  const NOIR = '#1A1A1A', BL = '#FFFFFF';
  const blanc = at => at.replace('fill="none"', `fill="${BL}"`);
  const noir = at => at.replace('fill="none"', `fill="${NOIR}"`);
  const f = v => Math.round(v * 100) / 100;
  // repère local : x le long de la cordelette, y en travers (matrice, pas de rotate)
  const g = (x, y, ang, inner) => {
    const c = Math.cos(ang), s = Math.sin(ang);
    return `<g transform="matrix(${f(c)} ${f(s)} ${f(-s)} ${f(c)} ${f(x)} ${f(y)})">${inner}</g>`;
  };
  const ell = (cx, cy, rx, ry) => `M${f(cx)} ${f(cy - ry)} A${f(rx)} ${f(ry)} 0 1 1 ${f(cx)} ${f(cy + ry)} A${f(rx)} ${f(ry)} 0 1 1 ${f(cx)} ${f(cy - ry)} Z`;
  const seg = (x1, y1, x2, y2, at) => `<path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" ${at}/>`;
  // une gélule (un tour de corde) centrée en (cx, cy), demi-longueur L sur la direction phi, demi-largeur w
  const gelule = (cx, cy, phi, L, w, at) => {
    const u = [Math.cos(phi), Math.sin(phi)], v = [-u[1], u[0]], q = [];
    for (let i = 0; i <= 8; i++) { const t = -Math.PI / 2 + Math.PI * i / 8; q.push([cx + u[0] * (L + w * Math.cos(t)) + v[0] * w * Math.sin(t), cy + u[1] * (L + w * Math.cos(t)) + v[1] * w * Math.sin(t)]); }
    for (let i = 0; i <= 8; i++) { const t = Math.PI / 2 + Math.PI * i / 8; q.push([cx + u[0] * (-L + w * Math.cos(t)) + v[0] * w * Math.sin(t), cy + u[1] * (-L + w * Math.cos(t)) + v[1] * w * Math.sin(t)]); }
    return `<path d="${q.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ')} Z" ${at}/>`;
  };

  // 32 marques également espacées sur une ellipse, dans le sens horaire depuis le haut
  const tour = (cx, cy, rx, ry, n = 32) => {
    const N = 3200, P = [], S = [0];
    for (let i = 0; i <= N; i++) {
      const t = -Math.PI / 2 + 2 * Math.PI * i / N;
      P.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
      if (i) S.push(S[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    }
    const L = S[N], out = [];
    let j = 0;
    for (let k = 0; k < n; k++) {
      const s = k * L / n;
      while (S[j + 1] < s) j++;
      const u = (s - S[j]) / (S[j + 1] - S[j]);
      const x = P[j][0] + u * (P[j + 1][0] - P[j][0]), y = P[j][1] + u * (P[j + 1][1] - P[j][1]);
      const ang = Math.atan2(P[j + 1][1] - P[j][1], P[j + 1][0] - P[j][0]);
      out.push({ x, y, ang, nx: Math.sin(ang), ny: -Math.cos(ang) });   // n : vers l'extérieur
    }
    return out;                                                        // out[k - 1] = marque k
  };
  const dedans = (m, d) => [m.x - m.nx * d, m.y - m.ny * d];
  const dehors = (m, d) => [m.x + m.nx * d, m.y + m.ny * d];

  // ─── les perles ───
  const brune = (x, y, r) => [h.cercle(x, y, r, h.a.blanc), h.cercle(x, y, r, h.a.hachure('bois', 'arete'))].join('');
  const blanche = (x, y, r) => h.cercle(x, y, r, blanc(h.a.arete));
  const foncee = (x, y, r) => [h.cercle(x, y, r, noir(h.a.arete)),
    h.ellipse(x - r * 0.35, y - r * 0.4, r * 0.22, r * 0.14, `fill="${BL}" stroke="none"`)].join('\n');
  // le bout de cuivre : un tube vu de trois quarts, le bout droit en face ; la cordelette sort du trou
  const tube = (x, y, ang, L, D) => {
    const a = L / 2, b = D / 2, e = D * 0.22;
    return g(x, y, ang, [
      `<path d="M${f(-a)} ${f(-b)} L${f(a)} ${f(-b)} L${f(a)} ${f(b)} L${f(-a)} ${f(b)} A${f(e)} ${f(b)} 0 0 1 ${f(-a)} ${f(-b)} Z" ${blanc(h.a.arete)}/>`,
      seg(-a + 1, -b * 0.5, a - 2, -b * 0.5, h.a.fin),
      seg(-a + 1, b * 0.62, a - 2, b * 0.62, h.a.fin),
      `<path d="${ell(a, 0, e, b)}" ${blanc(h.a.arete)}/>`,
      `<path d="${ell(a, 0, e * 0.4, b * 0.34)}" ${noir(h.a.detail)}/>`,
    ].join(''));
  };
  // la rondelle : vue presque de chant, le trou plus grand que le tube ; ep = son épaisseur
  const rondelle = (x, y, ang, R, r, ep) => {
    const ex = 0.3;
    return g(x, y, ang, [
      `<path d="M${f(-ep)} ${f(-R)} A${f(R * ex)} ${f(R)} 0 0 0 ${f(-ep)} ${f(R)} L0 ${f(R)} A${f(R * ex)} ${f(R)} 0 0 1 0 ${f(-R)} Z" ${blanc(h.a.arete)}/>`,
      `<path d="${ell(0, 0, R * ex, R)} ${ell(0, 0, r * ex, r)}" fill="${BL}" fill-rule="evenodd" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"/>`,
    ].join(''));
  };

  // ─── les nœuds serrés, vus le long de la cordelette : un renflement et ses tours de corde ───
  // n : 1 simple, 2 double, 3 triple — n + 1 tours de corde serrés en spirale ; gros : la 27,
  // deux tours plus épais. Pas de contour de perle autour : ce sont des tours de corde.
  const noeud = (x, y, ang, n, s = 1, gros = false) => {
    const tours = gros ? 2 : n + 1, b = (gros ? 5.4 : 3.7) * s, w = (gros ? 2.4 : 1.6) * s, pas = w * 1.65;
    const x0 = -pas * (tours - 1) / 2, out = [];
    for (let i = 0; i < tours; i++) out.push(gelule(x0 + i * pas, 0, Math.PI / 2 - 0.38, b - w, w, blanc(h.a.detail)));
    return g(x, y, ang, out.join(''));
  };

  // le fil des cycles hors plage, petit (vues d'ensemble) : noué à la marque 1, pend vers l'intérieur
  const filPetit = (m, dx, lg, s) => {
    const [x0, y0] = [m.x + dx, m.y];
    return [
      h.chemin([[x0, y0], [x0 - 1.5, y0 + lg * 0.45], [x0 + 1, y0 + lg]], h.a.detail),
      noeud(x0, y0 + 3.5, Math.PI / 2, 1, s),
      noeud(x0 - 0.8, y0 + lg * 0.52, Math.PI / 2, 1, s),
      noeud(x0 + 0.2, y0 + lg * 0.76, Math.PI / 2, 1, s),
    ].join('\n');
  };

  // ─── le nœud desserré : la boucle, et le bout qui s'enroule n fois autour de son brin du bas ───
  // (chaque tour passe une fois dans la boucle ; z : devant > 0, derrière < 0)
  // Tous les points sont serrés (pas de 3 à 5) : un grand écart à côté d'un petit fait boucler la
  // courbe lissée de cordes().
  const noeudLache = (x0, y0, n) => {
    const R = 10, p = 50, rb = 20;
    const xs = x0 + 44, xh0 = xs + 10, xh1 = xh0 + n * p, xe = xh1 + 10;
    const pts = [];
    const droite = (xa, xb, y, z = 0, pas = 4) => { const k = Math.max(1, Math.round(Math.abs(xb - xa) / pas)); for (let i = 1; i <= k; i++) pts.push([xa + (xb - xa) * i / k, y, z]); };
    const arc = (cx, cy, a0, a1) => { const k = 14; for (let i = 1; i <= k; i++) { const t = (a0 + (a1 - a0) * i / k) * Math.PI / 180; pts.push([cx + rb * Math.cos(t), cy + rb * Math.sin(t), 0]); } };
    pts.push([x0, y0, 0]);
    droite(x0, xe, y0);                                   // le dormant, puis le brin du bas de la boucle
    arc(xe, y0 - rb, 90, -90);                           // le tournant à droite
    droite(xe, xs - 4, y0 - 2 * rb);                     // le dessus de la boucle
    arc(xs - 4, y0 - rb, -90, -180);                     // le tournant à gauche
    const B = [[xs - 24, y0 - rb], [xs - 24, y0 + 4], [xs - 18, y0 + R], [xh0 - 4, y0 + R]];
    for (let i = 1; i <= 12; i++) {                      // il descend et passe DESSUS le dormant
      const t = i / 12, u = 1 - t;
      const x = u * u * u * B[0][0] + 3 * u * u * t * B[1][0] + 3 * u * t * t * B[2][0] + t * t * t * B[3][0];
      const y = u * u * u * B[0][1] + 3 * u * u * t * B[1][1] + 3 * u * t * t * B[2][1] + t * t * t * B[3][1];
      pts.push([x, y, Math.abs(y - y0) < 8 ? 4 : 0]);
    }
    // le bout s'enroule : derrière le brin en montant, devant en descendant, n fois
    for (let th = 0; th <= 2 * Math.PI * n + 1e-9; th += Math.PI / 12) {
      pts.push([xh0 + p * th / (2 * Math.PI), y0 + R * Math.cos(th), -R * Math.sin(th)]);
    }
    droite(xh1, xe + 40, y0 + R);                        // et ressort à droite, sous le tournant
    return pts;
  };

  // géométrie partagée entre dessin et renvois
  const geoA = z => ({ cx: z.l / 2, cy: z.h / 2 + 6, rx: z.l / 2 - 20, ry: z.h / 2 - 22 });
  const geoB = z => ({ cx: z.l / 2, cy: z.h / 2 + 6, rx: z.l / 2 - 28, ry: z.h / 2 - 24 });
  const geoC = z => {
    const xc = z.l / 2 + 12, yc = z.h * 0.3, Rc = 700, pas = 56;
    const Y = x => yc + (x - xc) * (x - xc) / (2 * Rc);
    return { xc, yc, pas, Y, xt: xc - 27, xr: xc - 6 };
  };

  return {
    ref: '29-02',
    titre: 'Le collier des jours',
    desc: 'Le collier des jours en deux versions, posé à plat : 32 perles sur une cordelette fermée (un bout de tube de cuivre pour la marque 1, une perle plus petite pour la 2, six brunes, douze blanches pour les jours fertiles, treize brunes dont la 27 noire) puis 32 nœuds (triple pour la 1, simples, doubles pour 8 à 19, un plus gros pour la 27, un bout de fil qui pend à la 2) ; en grand, la marque 1 avec sa rondelle qui avance vers la 2 et le fil des nœuds d’arrêt ; les nœuds simple, double et triple avant de serrer.',
    format: 'pleine',
    disposition: [['perles', 'detail'], ['noeuds', 'serrer']],
    largeurs: [[1.12, 1], [1.02, 1.1]],
    vues: {
      perles: {
        titre: 'Les perles, le collier posé à plat',
        dessin: z => {
          const G = geoA(z), m = tour(G.cx, G.cy, G.rx, G.ry);
          const out = [h.ellipse(G.cx, G.cy, G.rx, G.ry, h.a.arete)];
          out.push(filPetit(m[0], -11, 58, 0.5));
          m.forEach((p, i) => {
            const k = i + 1;
            if (k === 1) return;
            if (k === 2) out.push(brune(p.x, p.y, 4.6));
            else if (k === 27) out.push(foncee(p.x, p.y, 7));
            else if (k >= 8 && k <= 19) out.push(blanche(p.x, p.y, 7));
            else out.push(brune(p.x, p.y, 7));
          });
          out.push(tube(m[0].x, m[0].y, m[0].ang, 16, 8), rondelle(m[0].x - 3, m[0].y, m[0].ang, 9, 5.6, 1.6));
          return out.join('\n');
        },
        renvois: z => {
          const G = geoA(z), m = tour(G.cx, G.cy, G.rx, G.ry);
          const c = (k, d) => dedans(m[k - 1], d);
          return [
            { n: 1, rond: c(23, 44), cible: c(23, 8), texte: 'perles brunes : marques 2–7 et 20–32' },
            { n: 2, rond: c(13, 44), cible: c(13, 8), texte: 'perles blanches : marques 8–19, jours fertiles' },
            { n: 3, rond: c(27, 44), cible: c(27, 8), texte: 'marque 27 : perle plus foncée' },
          ];
        },
      },
      detail: {
        titre: 'Autour de la marque 1, en grand',
        dessin: z => {
          const { xc, yc, pas, Y, xt, xr } = geoC(z);
          const cpts = [];
          for (let x = 6; x <= z.l - 6 + 1e-9; x += (z.l - 12) / 10) cpts.push([x, Y(x), 0]);
          const out = [F.cordes([{ pts: cpts, ep: 4, debut: 'fixe', fin: 'fixe' }]).toString()];
          // le fil des cycles hors plage, noué entre la 32 et la 1 : un tour autour de la cordelette
          const yt = Y(xt);
          out.push(F.cordes([{ pts: [
            [xt + 9, yt + 26, 0], [xt + 2, yt + 12, 0], [xt + 3, yt + 3, 3], [xt + 1, yt - 6, 0],
            [xt - 4, yt - 1, -3], [xt - 5, yt + 9, 0], [xt - 1, yt + 14, 0], [xt - 4, yt + 50, 0], [xt, yt + 92, 0], [xt - 3, yt + 132, 0],
          ], ep: 2.4, debut: 'libre', fin: 'libre' }]).toString());
          out.push(noeud(xt, yt + 13, Math.PI / 2, 1, 1.05));
          out.push(noeud(xt - 1.6, yt + 70, Math.PI / 2, 1, 0.95), noeud(xt - 0.4, yt + 103, Math.PI / 2, 1, 0.95));
          // les marques 31, 32, 1, 2, 3
          [[-2, 15], [-1, 15], [1, 10], [2, 15]].forEach(([k, r]) => out.push(brune(xc + k * pas, Y(xc + k * pas), r)));
          out.push(tube(xc, yc, 0, 34, 17), rondelle(xr, yc, 0, 19, 12, 3.4));
          // l'anneau avance d'une marque chaque matin : de la 1 vers la 2
          out.push(h.fleche(`M${f(xr + 8)} ${f(yc - 30)} Q${f(xc + pas / 2)} ${f(yc - 40)} ${f(xc + pas - 4)} ${f(Y(xc + pas) - 24)}`));
          return out.join('\n');
        },
        renvois: z => {
          const { xc, yc, pas, Y, xt, xr } = geoC(z);
          return [
            { n: 4, rond: [xc + 22, yc + 56], cible: [xc + 10, yc + 6], texte: 'marque 1 : bout de cuivre' },
            { n: 5, rond: [xc + pas + 12, Y(xc + pas) + 50], cible: [xc + pas + 3, Y(xc + pas) + 7], texte: 'marque 2 : plus petite que la 32' },
            { n: 6, rond: [xr - 30, yc - 46], cible: [xr - 3, yc - 17], texte: 'rondelle : avance d’une marque chaque matin' },
            { n: 7, rond: [xt - 40, Y(xt) + 88], cible: [xt - 4, Y(xt) + 103], texte: 'nœud d’arrêt : un par cycle hors plage' },
          ];
        },
      },
      noeuds: {
        titre: 'Les nœuds, le collier posé à plat',
        dessin: z => {
          const G = geoB(z), m = tour(G.cx, G.cy, G.rx, G.ry);
          const out = [h.ellipse(G.cx, G.cy, G.rx, G.ry, h.a.arete)];
          out.push(filPetit(m[0], -14, 58, 0.5));
          // le bout de fil qui pend du nœud de la marque 2
          const m2 = m[1], [ex, ey] = dehors(m2, 17);
          out.push(F.corde([[m2.x, m2.y], [(m2.x + ex) / 2 + 1, (m2.y + ey) / 2], [ex + 4, ey + 1]], { ep: 2, debut: 'coupe', fin: 'libre' }).toString());
          m.forEach((p, i) => {
            const k = i + 1;
            if (k === 1) out.push(noeud(p.x, p.y, p.ang, 3, 1.2));
            else if (k === 27) out.push(noeud(p.x, p.y, p.ang, 1, 1.2, true));
            else if (k >= 8 && k <= 19) out.push(noeud(p.x, p.y, p.ang, 2, 1.2));
            else out.push(noeud(p.x, p.y, p.ang, 1, 1.2));
          });
          // l'anneau : une boucle de fil de laiton, les bouts tordus ensemble, sur la marque 5
          const r5 = m[4];
          out.push(g(r5.x, r5.y, r5.ang, [
            `<ellipse cx="0" cy="0" rx="2.6" ry="8.5" ${h.a.arete}/>`,
            `<path d="M0 -8.5 L1.8 -11 L-0.6 -12.6 L1.2 -15" ${h.a.detail}/>`,
          ].join('')));
          const [a1x, a1y] = dehors(m[4], 21), [a2x, a2y] = dehors(m[5], 21), [qx, qy] = dehors(m[4], 25);
          out.push(h.fleche(`M${f(a1x)} ${f(a1y)} Q${f((qx + a2x) / 2 + 2)} ${f((qy + a2y) / 2)} ${f(a2x)} ${f(a2y)}`));
          return out.join('\n');
        },
        renvois: z => {
          const G = geoB(z), m = tour(G.cx, G.cy, G.rx, G.ry);
          const c = (k, d) => dedans(m[k - 1], d);
          const [x1, y1] = c(1, 0);
          return [
            { n: 8, rond: [x1 - 30, y1 - 17], cible: [x1 - 6, y1 - 3], texte: 'marque 1 : nœud triple' },
            { n: 9, rond: [m[1].x + 30, m[1].y - 16], cible: dehors(m[1], 12), texte: 'marque 2 : bout de fil qui pend' },
            { n: 10, rond: c(14, 44), cible: c(14, 5), texte: 'nœuds doubles : 8–19 ; les autres, simples' },
            { n: 11, rond: c(27, 44), cible: c(27, 6), texte: 'marque 27 : nœud plus gros' },
            { n: 12, rond: c(5, 40), cible: c(5, 7), texte: 'anneau : boucle de fil de laiton' },
          ];
        },
      },
      serrer: {
        titre: 'Simple, double, triple, avant de serrer',
        dessin: z => {
          const x0 = 6, out = [];
          [1, 2, 3].forEach((n, i) => {
            const y0 = 56 + i * (z.h - 84) / 2;
            out.push(F.cordes([{ pts: noeudLache(x0, y0, n), ep: 5, debut: 'fixe', fin: 'libre', fleche: { de: 0.95, a: 0.998, cote: 'droite' } }]).toString());
          });
          return out.join('\n');
        },
      },
    },
  };
};
