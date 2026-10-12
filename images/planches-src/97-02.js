// Planche 97-02 — Le paillasson de paille : le métier et la couture.
// Chapitre 97, « Fabriquer ce qui manque », le paillasson. Tout vient du chapitre :
// planches de champ 2 m × 10 cm à 1,33 m ; trois lignes à 33 cm ; six piquets gros comme un
// doigt qui dépassent de 4 cm ; ficelle tendue fort, bouclée en haut, non coupée en bas, le double de la
// longueur tendue sur une bobine de bois de 12 cm ; deux lits tête-bêche, pied contre une
// planche ; la couture à genoux au bas du métier : pincée grosse comme un doigt soulevée avec
// la ficelle tendue, bobine sous la ficelle, puis entre la pincée et la ficelle du dessus.
//
// Le nœud de couture (vues n1 à n3) : la ficelle de la bobine passe par-dessus la pincée, fait le
// tour de la ficelle tendue juste au-dessus (dessous, de droite à gauche), revient et passe sous
// elle-même, entre la pincée et la ficelle du dessus : une demi-clé qui serre la pincée contre la
// ficelle tendue. Les vues de près ne montrent que les pincées : le reste du lit est enlevé, et un
// jour entre deux pincées laisse voir le tour autour de la ficelle tendue. La ficelle tendue passe
// SOUS chaque pincée, cousue ou pas : elle s'arrête au bord de la bande, son axe au tireté fin.
//
// La boucle du haut : le chapitre dit « bouclée » sans nommer le nœud ; on dessine un tour du
// piquet et deux demi-clés du bout sur le dormant, qui se lisent dessus-dessous, vus de côté et,
// dans le médaillon, vus de dessus. Pas de mains dans la vue du geste : l'objet et sa flèche.
module.exports = (h) => {
  const F = h.formes, A = h.a;
  const f1 = v => Math.round(v * 10) / 10;
  const NOIR = '#1A1A1A';
  const fond = 'fill="#FFFFFF" stroke="none"';
  const blanc = `fill="#FFFFFF" stroke="${NOIR}" stroke-width="1.4" stroke-linejoin="round"`;
  const mixte = `fill="none" stroke="${NOIR}" stroke-width="0.7" stroke-dasharray="12 3 2 3" stroke-linecap="round"`;
  const poly = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const repere = (ox, oy, k) => (x, y) => [ox + x * k, oy + y * k];

  // ── une pincée de paille, vue de dessus : une bande de tiges en travers de la ligne ──
  // yc le milieu, t la demi-épaisseur (mm), taille : de combien le nœud la resserre au milieu
  function pincee(P, yc, L, taille = 0, t = 8) {
    const w = x => t - taille * Math.exp(-((x / 14) ** 2));
    const xs = []; for (let i = 0; i <= 40; i++) xs.push(-L + (2 * L * i) / 40);
    const haut = xs.map(x => P(x, yc - w(x))), bas = xs.map(x => P(x, yc + w(x)));
    const out = [h.path(poly([...haut, ...bas.slice().reverse()], true), fond),
      h.path(poly(haut), A.detail), h.path(poly(bas), A.detail)];
    // les tiges : des traits fins, coupés çà et là (une tige finit, une autre commence)
    const tiges = [[-0.62, [0.18, 0.71]], [-0.22, [0.43]], [0.2, [0.08, 0.6]], [0.6, [0.33, 0.86]]];
    for (const [f, coupes] of tiges) {
      const bornes = [0, ...coupes, 1];
      for (let i = 0; i < bornes.length - 1; i++) {
        const a = -L + 2 * L * bornes[i] + (i ? 3 : 0), b = -L + 2 * L * bornes[i + 1] - (i < bornes.length - 2 ? 3 : 0);
        const q = xs.filter(x => x >= a && x <= b);
        const pts = [P(a, yc + f * w(a)), ...q.map(x => P(x, yc + f * w(x))), P(b, yc + f * w(b))];
        out.push(h.path(poly(pts), A.fin));
      }
    }
    return out.join('\n');
  }

  // ── le nœud : la ficelle de la bobine autour de la pincée centrée en yc (mm, x = 0 : la
  // ficelle tendue). z : la hauteur, pour les croisements (la ficelle tendue est à 0).
  //   b, c, d  par-dessus la pincée, un peu à droite de la ficelle tendue (la ficelle du dessus)
  //   e, f     dans le jour au-dessus de la pincée : sous la ficelle tendue, de droite à gauche
  //   g, h     remonte à gauche, revient par-dessus la pincée
  //   i, j     passe sous la ficelle du dessus (entre elle et la pincée), sort à droite
  //   k        repart vers le haut, à droite du tour
  // Un point marqué '|' coupe la ficelle en deux brins qui se suivent : cordes ne sait pas couper
  // un brin sous lui-même quand les deux passages sont proches, alors chaque tour de nœud est un
  // brin à part, raccordé au suivant au bord haut de la pincée.
  const NOEUD = [[10, 13, 1], [7, 5, 1.2], [7, -5, 1.2], [6, -9.5, 0.8, '|'], [3.5, -14, 0], [-6, -18, -1], [-14, -14, 0.3],
    [-14, -5, 0.6], [-4, 0, 0.6], [12, 1, 0.6], [18, -8, 0.5]];
  const noeud = (yc, serre = 1, de = 0, a = NOEUD.length) =>
    NOEUD.slice(de, a).map(([x, y, z, m]) => [x * serre, yc + y, z, m]);
  const coupeBrins = w => {
    const out = [[]];
    for (const p of w) { out[out.length - 1].push(p); if (p[3] === '|') out.push([p]); }
    return out.filter(b => b.length > 1);
  };

  // une ligne de couture vue de près : pincées, ficelle tendue, ficelle de la bobine
  //   pinces : [{ yc, taille }] ; w : les points de la ficelle de la bobine (mm, avec z)
  function couture(P, k, { y0, y1, L, pinces, w, ep, wFin = 'ouvert', wDebut = 'ouvert', apres = '' }) {
    const V = ([x, y, z]) => [...P(x, y), z];
    // la ficelle tendue, là où aucune pincée ne la couvre : dessinée avec la ficelle de la bobine
    const tri = pinces.slice().sort((p, q) => q.yc - p.yc);   // du bas vers le haut
    const jours = []; let bas = y0;
    for (const p of tri) { if (bas - (p.yc + 8) > 0.5) jours.push([bas, p.yc + 8]); bas = p.yc - 8; }
    if (bas - y1 > 0.5) jours.push([bas, y1]);
    const copies = jours.map(([a, b]) => ({ pts: [[...P(0, a), 0], [...P(0, b), 0]], ep, debut: 'ouvert', fin: 'ouvert' }));
    // sous chaque pincée, cousue ou pas, la ficelle tendue est cachée sur toute la largeur de la
    // bande : elle s'arrête au bord de la pincée et son axe passe dessous au tireté fin
    const caches = pinces.map(p => { const [xa, ya] = P(0, p.yc - 8), [, yb] = P(0, p.yc + 8);
      return h.ligne(xa, ya, xa, yb, A.cache); });
    return [
      ...pinces.map(p => pincee(P, p.yc, L, p.taille)),
      ...caches,
      F.cordes([...copies, ...coupeBrins(w).map((b, i, t) => ({ pts: b.map(V), ep, debut: i ? 'ouvert' : wDebut, fin: i === t.length - 1 ? wFin : 'ouvert' }))]).toString(),
      apres,
    ].join('\n');
  }

  // ── la bobine vue de côté, couchée : deux joues et la ficelle enroulée entre elles ──
  // x0 le bout gauche, y l'axe, long la longueur (unités de vue), rJ et rF les rayons
  function bobine(x0, y, long, rJ, rF, ej) {
    const out = [];
    out.push(h.rect(x0 + ej, y - rF, long - 2 * ej, 2 * rF, blanc));
    const tours = [];
    for (let x = x0 + ej + 2.5; x < x0 + long - ej - 1; x += 2.6) tours.push(`M${f1(x)} ${f1(y - rF + 0.8)} L${f1(x - 2)} ${f1(y + rF - 0.8)}`);
    out.push(h.path(tours.join(' '), A.fin));
    out.push(h.rect(x0, y - rJ, ej, 2 * rJ, blanc), h.rect(x0 + long - ej, y - rJ, ej, 2 * rJ, blanc));
    return out.join('\n');
  }

  // ── un piquet vu de côté : la partie hors de terre, la partie en terre au tireté ──
  function piquet(P, xc, sol, k) {
    const [xa] = P(xc - 10, 0), [xb] = P(xc + 10, 0), [, yh] = P(0, sol - 40), [, ys] = P(0, sol);
    return [
      h.path(`M${f1(xa)} ${f1(ys)} L${f1(xa)} ${f1(ys + 34 * k)} L${f1((xa + xb) / 2)} ${f1(ys + 46 * k)} L${f1(xb)} ${f1(ys + 34 * k)} L${f1(xb)} ${f1(ys)}`, A.cache),
      h.rect(xa, yh, xb - xa, ys - yh, blanc),
      h.path(`M${f1(xa + (xb - xa) * 0.35)} ${f1(yh + 5)} L${f1(xa + (xb - xa) * 0.38)} ${f1(ys - 4)} M${f1(xa + (xb - xa) * 0.68)} ${f1(yh + 9)} L${f1(xa + (xb - xa) * 0.66)} ${f1(ys - 7)}`, A.fin),
    ].join('\n');
  }
  function sol(P, xa, xb, y, k) {
    const [X1, Y] = P(xa, y), [X2] = P(xb, y);
    return [h.rect(X1, Y, X2 - X1, 9 * k, h.a.hachure('terre', 'aucun')), h.ligne(X1, Y, X2, Y, A.arete)].join('\n');
  }

  // ── la boucle du haut : un tour du piquet, puis deux demi-clés du bout sur le dormant ──
  // Repère propre en mm : le centre du piquet en 0 0, la ficelle part vers +x (vers le bas du
  // métier). Le dormant file à y = -4, fait le tour du piquet (TOUR) et le bout revient à y = +8.
  // Chaque demi-clé : le bout passe SOUS le dormant (A), revient PAR-DESSUS (B), puis passe SOUS
  // lui-même (C). z : la hauteur aux croisements ; '|' coupe la ficelle en brins raccordés.
  const DORMANT = [[120, -5, 0], [62, -5, 0], [46, -5, 1], [37, -5, -1], [30, -5, 1], [21, -5, -1], [13, -7.5, 0]];
  const RT = 14.5;   // le rayon du tour : le piquet (10), un jour, la demi-épaisseur de la ficelle
  const TOUR = [[5, -13.2], ...[-90, -120, -150, 180, 150, 120, 90].map(a => [RT * Math.cos(a * Math.PI / 180), RT * Math.sin(a * Math.PI / 180)]), [6, 14]];
  // la demi-clé : A, le bout monte SOUS le dormant ; la boucle ; B, il redescend PAR-DESSUS ; C, il passe
  // sous lui-même. Les brins se raccordent ('|') sur la jambe droite, là où elle est droite.
  const BOUT = [[12, 12.5, 0], [17, 10, 0], [22.5, 6.3, 1], [27, 2, 0], [30, -5, -1], [30.2, -8.2, 0], [30.4, -11.4, 0, '|'], [30.6, -14.6, 0], [28.5, -18.2, 0],
    [23.5, -19, 0], [20.2, -15, 0], [20.3, -9.5, 0], [21, -5, 1], [21.6, 0, 0], [22.5, 6.3, -1], [24.5, 10.5, 0], [29, 12, 0], [34, 10.5, 0],
    [38.5, 6.3, 1], [43, 2, 0], [46, -5, -1], [46.2, -8.2, 0], [46.4, -11.4, 0, '|'], [46.6, -14.6, 0], [44.5, -18.2, 0], [39.5, -19, 0], [36.2, -15, 0],
    [36.3, -9.5, 0], [37, -5, 1], [37.6, 0, 0], [38.5, 6.3, -1], [40.5, 10.5, 0], [45, 12.5, 0], [55, 12.5, 0]];

  const LIGNES = [332.5, 665, 997.5];

  return {
    ref: '97-02',
    titre: 'Le paillasson de paille : le métier et la couture',
    desc: 'Le métier à paillasson vu de dessus (deux planches de champ de 2000 mm, six piquets, trois ficelles et leurs bobines), les deux bouts d’une ligne vus de côté avec, dans un médaillon, la boucle du haut vue de dessus (un tour du piquet, deux demi-clés du bout sur le dormant), la paille posée en deux lits tête-bêche vue en travers, puis la couture : la pincée soulevée avec la ficelle tendue, la bobine passée sous la ficelle, ramenée entre la pincée et la ficelle du dessus, et on tire. La ficelle tendue passe sous chaque pincée. Cotes en mm.',
    format: 'pleine',
    disposition: [['metier', 'ligne'], ['coupe'], ['geste', 'n1', 'n2', 'n3']],
    hauteurs: [2.15, 1.05, 2],
    largeurs: [[1, 1.3], [1], [1.75, 1, 1, 1]],
    vues: {
      // ─── le métier, vu de dessus : le haut en haut, on coud depuis le bas ───
      metier: {
        titre: 'Le métier, vu de dessus',
        dessin: z => {
          const s = Math.min((z.h - 36 - 8) / 2150, (z.l - 62 - 44) / 1380);
          const P = repere(62, 36, s);
          const out = [];
          // planches de champ : minces vues de dessus
          const ep = Math.max(25 * s, 4);
          out.push(h.rect(P(-25, 0)[0] - (ep - 25 * s), P(0, 0)[1], ep, 2000 * s, A.arete));
          out.push(h.rect(P(1330, 0)[0], P(0, 0)[1], ep, 2000 * s, A.arete));
          // la ligne de coupe en travers, au trait mixte, et le sens du regard (vers le haut)
          const [xc1, yc] = P(-150, 1000), [xc2] = P(1480, 1000);
          out.push(h.ligne(xc1, yc, xc2, yc, mixte));
          out.push(h.fleche(`M${f1(xc1 + 3)} ${f1(yc)} L${f1(xc1 + 3)} ${f1(yc - 13)}`, A.detail), h.fleche(`M${f1(xc2 - 3)} ${f1(yc)} L${f1(xc2 - 3)} ${f1(yc - 13)}`, A.detail));
          // ficelles, piquets, bobines
          for (const x of LIGNES) {
            const [X, Yh] = P(x, 0), [, Yb] = P(x, 2000), [, Yo] = P(x, 2085);
            out.push(h.ligne(X, Yh, X, Yb, A.arete));
            out.push(h.ligne(X, Yb, X + 8, Yo - 3, A.detail));
            out.push(bobine(X + 8 - 60 * s, Yo, 120 * s, 3.2, 2, 1.4));
            out.push(h.cercle(X, Yh, 2.8, blanc), h.cercle(X, Yb, 2.8, blanc));
          }
          // le sens de la couture : on part du bas, on monte
          const [xf, yf1] = P(830, 1820), [, yf2] = P(830, 1280);
          out.push(h.fleche(`M${f1(xf)} ${f1(yf1)} L${f1(xf)} ${f1(yf2)}`, A.arete));
          // cotes
          const xg = P(-25, 0)[0] - (ep - 25 * s) - 12;
          out.push(h.cote(xg, P(0, 0)[1], xg, P(0, 2000)[1], '2000', { cote: 'gauche' }));
          out.push(h.cote(P(0, 0)[0], P(0, 0)[1] - 16, P(1330, 0)[0], P(0, 0)[1] - 16, '1330'));
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.h - 36 - 8) / 2150, (z.l - 62 - 44) / 1380);
          const P = repere(62, 36, s);
          const xr = z.l - 14;
          return [
            { n: 1, rond: [xr, P(0, 520)[1]], cible: [P(1330, 520)[0] + 2, P(0, 520)[1]], texte: 'planche de champ : elle fixe la largeur' },
            { n: 2, rond: [xr, P(0, 0)[1] + 4], cible: [P(997.5, 0)[0] + 3, P(0, 0)[1] + 1], texte: 'six piquets : ils fixent la longueur' },
            { n: 3, rond: [xr, P(0, 1550)[1]], cible: [P(830, 1550)[0] + 2, P(0, 1550)[1]], texte: 'à genoux au bas, on coud en montant' },
          ];
        },
      },

      // ─── une ligne, de côté : le haut (bouclée) et le bas (la bobine) ───
      // En haut, la boucle vue de côté, et dans le médaillon la même, vue de dessus.
      ligne: {
        titre: 'Une ligne, de côté : le haut, puis le bas',
        dessin: z => {
          const k = Math.min((z.l - 16) / 318, (z.h - 8) / 222);
          const P = repere(8 + 12 * k, 60 * k, k);
          const D = 118;            // le sol du bas, sous celui du haut
          const ep = 3.4 * k;
          const V = ([x, y, zz]) => [...P(x, y), zz || 0];
          const out = [];
          // ── le haut : le piquet ; la ficelle passe devant sa tête et revient par derrière,
          // puis le bout fait deux demi-clés sur le dormant (la boucle penchée, pour voir les deux brins)
          out.push(sol(P, 0, 165, 0, k), piquet(P, 30, 0, k));
          const H = ([x, y, zz, m]) => [...V([30 + x, -32 + y, zz]), m];
          const dormant = [...DORMANT.slice(0, -1).map(([x, y, zz]) => [x === 120 ? 135 : x, y, zz]), [12, -5, 0], [0, 0, 0], [-10, 5, 0]];
          out.push(F.cordes([
            { pts: dormant.map(H).map(p => p.slice(0, 3)), ep, debut: 'fixe', fin: 'ouvert' },
            ...coupeBrins([[10.5, 12.5, 0], ...BOUT].map(H)).map((b, i, t) => ({ pts: b.map(p => p.slice(0, 3)), ep, debut: i ? 'ouvert' : 'ouvert', fin: i === t.length - 1 ? 'libre' : 'ouvert' })),
          ]).toString());
          out.push(h.cote(P(9, 0)[0], P(0, 0)[1], P(9, 0)[0], P(0, -40)[1], '40', { cote: 'gauche' }));
          // ── le médaillon : la même boucle vue de dessus, grossie ; le piquet vu par la tête
          const R = 56, MX = z.l - 4 - R, MY = 2 + R, m = 1.36;
          const T = ([x, y, zz, mk]) => [MX + (x - 21) * m, MY + (y + 2) * m, zz || 0, mk];
          out.push(h.cercle(MX, MY, R, `fill="#FFFFFF" stroke="${NOIR}" stroke-width="0.7"`));
          out.push(h.cercle(...T([0, 0]).slice(0, 2), 10 * m, h.a.hachure('bois')));
          const plein = [...DORMANT.map(([x, y, zz]) => [x === 120 ? 58 : x, y, zz]), ...TOUR.map(p => [...p, 0]), ...BOUT];
          out.push(F.cordes(coupeBrins(plein.map(T)).map((b, i, t) => ({ pts: b.map(p => p.slice(0, 3)), ep: 3.4 * m, debut: i ? 'ouvert' : 'fixe', fin: i === t.length - 1 ? 'libre' : 'ouvert' }))).toString());
          // ── le bas : la ficelle arrive, fait le tour du piquet sans être coupée, file à la bobine
          out.push(sol(P, 20, 310, D, k), piquet(P, 130, D, k));
          out.push(F.cordes([
            { pts: [[22, D - 26], [80, D - 26], [119.5, D - 26]].map(V), ep, debut: 'fixe', fin: 'ouvert' },
            { pts: [[139.5, D - 23], [130, D - 19.5], [120.5, D - 16]].map(V), ep, debut: 'ouvert', fin: 'ouvert' },
            { pts: [[140.5, D - 11], [150, D - 12], [165, D - 19], [182, D - 24.5], [196, D - 25]].map(V), ep, debut: 'ouvert', fin: 'ouvert' },
          ]).toString());
          const [bx, by] = P(180, D - 15);
          out.push(bobine(bx, by, 120 * k, 15 * k, 10 * k, 6 * k));
          out.push(h.cote(P(180, 0)[0], P(0, D - 40)[1], P(300, 0)[0], P(0, D - 40)[1], '120'));
          return out.join('\n');
        },
        renvois: z => {
          const k = Math.min((z.l - 16) / 318, (z.h - 8) / 222);
          const P = repere(8 + 12 * k, 60 * k, k);
          const D = 118;
          const R = 56, MX = z.l - 4 - R, MY = 2 + R, m = 1.36;
          const T = (x, y) => [MX + (x - 21) * m, MY + (y + 2) * m];
          return [
            { n: 4, rond: [MX - 14, MY + 38], cible: T(23, 8.5), texte: 'bouclée en haut : un tour, deux demi-clés' },
            { n: 5, rond: [P(92, D - 58)[0], P(0, D - 58)[1]], cible: [P(128, D - 20)[0], P(0, D - 20)[1]], texte: 'tendue fort ; en bas, sans couper' },
            { n: 6, rond: [P(196, D - 64)[0], P(0, D - 64)[1]], cible: [P(206, D - 25)[0], P(0, D - 25)[1]], texte: 'bobine : le double de la longueur tendue' },
          ];
        },
      },

      // ─── en travers : les deux planches, les ficelles au sol, les deux lits tête-bêche ───
      coupe: {
        titre: 'En travers, au trait mixte du plan : la paille tête-bêche',
        dessin: z => {
          const s = (z.l - 100) / 1380;
          const oy = z.h - 40;
          const P = repere(62, oy, s);
          const out = [];
          out.push(sol(P, -90, 1420, 0, s * 2.2));
          out.push(h.rect(...P(-25, -100), 25 * s, 100 * s, h.a.hachure('bois')), h.rect(...P(1330, -100), 25 * s, 100 * s, h.a.hachure('bois')));
          // les tiges : [y (mm), bout de la tête (mm)] ; pied contre la planche, épi au bout
          const lit = (tiges, depuis, sens) => {
            const o = [];
            for (const [y, fin] of tiges) {
              const [xa, ya] = P(depuis, y), [xb, yb] = P(fin, y + 1.5);
              const xm = (xa + xb) / 2;
              o.push(h.path(`M${f1(xa)} ${f1(ya)} Q${f1(xm)} ${f1(ya - 1.5)} ${f1(xb)} ${f1(yb)}`, A.detail));
              o.push(h.ligne(xa, ya - 2.2, xa, ya + 2.2, A.detail));                 // le pied coupé
              // l'épi : un fuseau pointu au bout, et ses barbes
              const e = 62 * s * sens, x2 = xb + e;
              o.push(h.path(`M${f1(xb)} ${f1(yb)} Q${f1(xb + e * 0.45)} ${f1(yb - 3)} ${f1(x2)} ${f1(yb)} Q${f1(xb + e * 0.45)} ${f1(yb + 3)} ${f1(xb)} ${f1(yb)} Z`, blanc.replace('1.4', '0.7')));
              o.push(h.path(`M${f1(x2)} ${f1(yb)} L${f1(x2 + 9 * sens)} ${f1(yb - 2.5)} M${f1(x2)} ${f1(yb)} L${f1(x2 + 10 * sens)} ${f1(yb + 0.5)} M${f1(xb + e * 0.5)} ${f1(yb - 2)} L${f1(xb + e * 0.5 + 8 * sens)} ${f1(yb - 5)}`, A.fin));
            }
            return o.join('\n');
          };
          out.push(lit([[-7, 1170], [-14, 1225], [-21, 1120], [-28, 1200]], 0, 1));
          out.push(lit([[-36, 170], [-43, 105], [-50, 210], [-57, 135]], 1330, -1));
          // les ficelles, au sol sous la paille
          for (const x of LIGNES) out.push(h.cercle(...P(x, -2.5), 2.3, A.plein));
          // cotes
          const yb = oy + 24;
          for (const x of LIGNES.slice(0, 2)) out.push(h.ligne(P(x, 0)[0], oy + 3, P(x, 0)[0], yb + 5, A.fin));
          out.push(h.ligne(P(997.5, 0)[0], oy + 3, P(997.5, 0)[0], yb + 5, A.fin));
          out.push(h.cote(P(332.5, 0)[0], yb, P(665, 0)[0], yb, '330', { cote: 'dessous' }));
          out.push(h.cote(P(665, 0)[0], yb, P(997.5, 0)[0], yb, '330', { cote: 'dessous' }));
          out.push(h.cote(P(-25, 0)[0] - 12, oy, P(-25, 0)[0] - 12, P(0, -100)[1], '100', { cote: 'gauche' }));
          out.push(h.cote(P(0, 0)[0], P(0, -100)[1] - 12, P(1330, 0)[0], P(0, -100)[1] - 12, '1330'));
          return out.join('\n');
        },
        renvois: z => {
          const s = (z.l - 100) / 1380, oy = z.h - 40;
          const P = repere(62, oy, s);
          return [
            { n: 7, rond: [P(150, -100)[0], P(0, -100)[1] + 2], cible: [P(40, -14)[0], P(0, -14)[1]], texte: 'premier lit, pied contre une planche' },
            { n: 8, rond: [P(1180, -100)[0], P(0, -100)[1] + 2], cible: [P(1290, -43)[0], P(0, -43)[1]], texte: 'second lit, tête-bêche sur le premier' },
          ];
        },
      },

      // ─── le geste : à genoux au bas du métier, vu d'au-dessus ───
      geste: {
        titre: 'À genoux, au bas du métier',
        dessin: z => {
          const k = Math.min(z.l / 290, z.h / 232);
          const P = repere(z.l / 2, 80 * k + (z.h - 232 * k) / 2, k);
          const ep = 3.2;
          const pinces = [{ yc: 96, taille: 3 }, { yc: 64, taille: 3 }, { yc: 32, taille: 3 }, { yc: 0, taille: 0 }];
          const w = [[14.4, 150, 0.5], ...noeud(96, 0.8), ...noeud(64, 0.8), ...noeud(32, 0.8), ...noeud(0, 1, 0, 5), [-5, -20, -1], [-10, -27, -1]];
          const out = [couture(P, k, { y0: 150, y1: -80, L: 140, pinces, w, ep })];
          // la bobine, poussée sous la ficelle tendue ; la ficelle tendue repasse par-dessus
          const [bx, by] = P(-22, -30);
          out.push(bobine(bx, by, 120 * k, 15 * k, 10 * k, 6 * k));
          out.push(F.cordes([{ pts: [P(0, -8), P(0, -52)], ep, debut: 'ouvert', fin: 'ouvert' }]).toString());
          // le geste : la bobine file sous la ficelle tendue, de droite à gauche
          out.push(h.fleche(`M${f1(P(8, -58)[0])} ${f1(P(8, -58)[1])} L${f1(P(-44, -58)[0])} ${f1(P(-44, -58)[1])}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const k = Math.min(z.l / 290, z.h / 232);
          const P = repere(z.l / 2, 80 * k + (z.h - 232 * k) / 2, k);
          return [
            { n: 9, rond: [P(-112, -44)[0], P(0, -44)[1]], cible: [P(-60, 1)[0], P(0, 1)[1]], texte: 'pincée soulevée avec la ficelle tendue' },
            { n: 10, rond: [P(-74, -60)[0], P(0, -60)[1]], cible: [P(-18, -30)[0], P(0, -30)[1]], texte: 'la bobine passe sous la ficelle tendue' },
          ];
        },
      },

      // ─── le nœud, de près : la pincée, la ficelle tendue, la ficelle de la bobine ───
      n1: {
        titre: 'Sous la ficelle',
        dessin: z => {
          const k = Math.min((z.l - 4) / 62, (z.h - 4) / 96);
          const P = repere(z.l / 2, z.h / 2, k);
          const w = [[14.4, 48, 0.5], ...noeud(32, 0.8), ...noeud(0, 1, 0, 6), [-17, -23, 0], [-25, -25, 0], [-31, -26, 0]];
          const fl = h.fleche(`M${f1(P(-10, -35)[0])} ${f1(P(-10, -35)[1])} L${f1(P(-28, -37)[0])} ${f1(P(-28, -37)[1])}`, A.arete);
          return couture(P, k, { y0: 48, y1: -48, L: 31, pinces: [{ yc: 32, taille: 3 }, { yc: 0 }], w, ep: 3.4, apres: fl });
        },
      },
      n2: {
        titre: 'Entre les deux',
        dessin: z => {
          const k = Math.min((z.l - 4) / 62, (z.h - 4) / 96);
          const P = repere(z.l / 2, z.h / 2, k);
          const w = [[14.4, 48, 0.5], ...noeud(32, 0.8), ...noeud(0, 1, 0, 10), [22, 0, 0.5], [31, -0.5, 0.5]];
          const fl = h.fleche(`M${f1(P(12, -14)[0])} ${f1(P(12, -14)[1])} L${f1(P(28, -15)[0])} ${f1(P(28, -15)[1])}`, A.arete);
          return couture(P, k, { y0: 48, y1: -48, L: 31, pinces: [{ yc: 32, taille: 3 }, { yc: 0 }], w, ep: 3.4, apres: fl });
        },
        renvois: z => {
          const k = Math.min((z.l - 4) / 62, (z.h - 4) / 96);
          const P = repere(z.l / 2, z.h / 2, k);
          return [{ n: 11, rond: [P(-22, -38)[0], P(0, -38)[1]], cible: [P(2, 0)[0], P(0, 0)[1]], texte: 'entre la pincée et la ficelle du dessus' }];
        },
      },
      n3: {
        titre: 'On serre',
        dessin: z => {
          const k = Math.min((z.l - 4) / 62, (z.h - 4) / 96);
          const P = repere(z.l / 2, z.h / 2, k);
          const w = [[14.4, 48, 0.5], ...noeud(32, 0.8), ...noeud(0, 0.8), ...noeud(-32, 1, 0, 3), [7, -43, 1.2], [7, -48, 1.2]];
          const fl = h.fleche(`M${f1(P(23, -14)[0])} ${f1(P(23, -14)[1])} L${f1(P(23, -44)[0])} ${f1(P(23, -44)[1])}`, A.arete);
          return couture(P, k, { y0: 48, y1: -48, L: 31, pinces: [{ yc: 32, taille: 3 }, { yc: 0, taille: 3 }, { yc: -32 }], w, ep: 3.4, apres: fl });
        },
        renvois: z => {
          const k = Math.min((z.l - 4) / 62, (z.h - 4) / 96);
          const P = repere(z.l / 2, z.h / 2, k);
          return [{ n: 12, rond: [P(-22, 41)[0], P(0, 41)[1]], cible: [P(-11.5, -12)[0], P(0, -12)[1]], texte: 'on tire : nœud coulant, pincée serrée' }];
        },
      },
    },
  };
};
