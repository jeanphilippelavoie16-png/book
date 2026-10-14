// Planche 99-10 — rajeunir la talle de bleuets. Chapitre 99, section F « La talle gérée »,
// étapes 48 à 50, encadré danger 2 et variante « La talle rajeunie sans feu ».
//
// Ce que dit le chapitre, et rien de plus :
//  - la lame d'abord : toutes les tiges coupées au ras du sol, à la faucille, à la faux ou au
//    couteau, en dormance (après la première gelée forte, ou au printemps avant le débourrement) ;
//    un chicot laissé long repousse de côté en tiges peu productives ; le rhizome vit dans l'humus ;
//  - ou le feu, au printemps : neige encore en lisière, vent léger sans rafales, une bande de
//    coupe-feu tout autour où rien ne peut brûler, allumé du côté où va le vent pour qu'il recule
//    contre lui, une partie de la talle à la fois, battoir, râteau à feu et eau en main ;
//  - deux moitiés rajeunies à tour de rôle.
// Aucune cote : rien ne se construit ici, et le chapitre ne donne ni largeur de coupe-feu ni
// taille de talle. Pas de main : le geste de la faucille, JP le connaît ; ce qui compte est la
// hauteur de coupe, et elle se voit sur le bloc de sol.
module.exports = (h) => {
  const A = h.a, BLANC = '#FFFFFF';
  const r1 = v => Math.round(v * 10) / 10;
  const pd = (pts, ferme) => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join(' ') + (ferme ? ' Z' : '');
  const seg = (a, b, at) => `<path d="M${r1(a[0])} ${r1(a[1])} L${r1(b[0])} ${r1(b[1])}" ${at}/>`;
  const point = (p, r) => `<path d="M${r1(p[0] - r)} ${r1(p[1])} a${r} ${r} 0 1 0 ${r1(2 * r)} 0 a${r} ${r} 0 1 0 ${r1(-2 * r)} 0 Z" ${A.plein}/>`;
  const alea = g => { let s = g; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const blanc = at => at.replace('fill="none"', `fill="${BLANC}"`);
  const bA = blanc(A.arete), bD = blanc(A.detail), bF = blanc(A.fin);
  const dedans = (pt, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if (((a[1] > pt[1]) !== (b[1] > pt[1])) && (pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0])) c = !c;
    }
    return c;
  };
  // la partie d'un polygone sous (bas = true) ou au-dessus de la droite y = yc
  const coupeY = (poly, yc, bas) => {
    const out = [], ins = p => bas ? p[1] >= yc : p[1] <= yc;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      if (ins(a)) out.push(a);
      if (ins(a) !== ins(b)) { const t = (yc - a[1]) / (b[1] - a[1]); out.push([a[0] + (b[0] - a[0]) * t, yc]); }
    }
    return out;
  };
  // un polygone fermé rééchantillonné à pas régulier
  const reechantillonne = (poly, pas) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / pas));
      for (let k = 0; k < n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
    }
    return out;
  };
  // décalé de d vers l'extérieur (d < 0 : vers l'intérieur), normales lissées sur cinq points
  const decale = (poly, d) => {
    const n = poly.length;
    let aire = 0;
    for (let i = 0; i < n; i++) { const a = poly[i], b = poly[(i + 1) % n]; aire += a[0] * b[1] - b[0] * a[1]; }
    const s = aire > 0 ? 1 : -1;
    return poly.map((p, i) => {
      const a = poly[(i - 3 + n) % n], b = poly[(i + 3) % n], tx = b[0] - a[0], ty = b[1] - a[1], m = Math.hypot(tx, ty) || 1;
      return [p[0] + s * ty / m * d, p[1] - s * tx / m * d];
    });
  };
  // une forme ronde irrégulière : ellipse modulée par des sinus
  const contour = (cx, cy, rx, ry, n, mods) => Array.from({ length: n }, (_, i) => {
    const a = 2 * Math.PI * i / n;
    const k = 1 + mods.reduce((s, [amp, f, ph]) => s + amp * Math.sin(f * a + ph), 0);
    return [cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a)];
  });

  // ─── Vue 1 : le plan de la clairière ─────────────────────────────────────────────────
  // Le vent vient de la gauche. La moitié du bas brûle cette année : allumée sur son bord droit
  // (où va le vent), le feu a reculé jusqu'au milieu ; derrière lui, le brûlé ; devant, les plants.
  // La moitié du haut attend son tour. Le coupe-feu fait tout le tour de la moitié qui brûle, y
  // compris entre les deux moitiés.
  const BANDE = 7;
  const geoPlan = z => {
    const W = z.l, H = z.h;
    const MODS = [[0.04, 3, 0.7], [0.025, 5, 2.1], [0.015, 8, 0.3]];
    const clair = contour(W * 0.5, H * 0.5, W * 0.5 - 24, H * 0.5 - 28, 200, MODS);
    const foret = contour(W * 0.5, H * 0.5, W * 0.5 - 16, H * 0.5 - 20, 200, MODS);
    const cx = W * 0.5, cy = H * 0.52;
    const talle = contour(cx, cy, W * 0.245, H * 0.305, 140, [[0.05, 2, 1.3], [0.035, 3, 0.2], [0.02, 6, 2.6]]);
    const yDiv = cy - 3;
    const moitieA = reechantillonne(coupeY(talle, yDiv, true), 3);
    const xFront = y => cx + 12 + 6 * Math.sin(y / 11);
    // la neige : un anneau le long de la lisière, large par endroits, mince ailleurs
    const largeurNeige = a => 24 * Math.max(0.12, 0.5 * Math.sin(3 * a + 1) + 0.3 * Math.sin(7 * a + 2.2) + 0.5);
    const neigeIn = clair.map((p, i) => {
      const a = 2 * Math.PI * i / clair.length, w = largeurNeige(a);
      const nx = Math.cos(a) / (W * 0.5), ny = Math.sin(a) / (H * 0.5), m = Math.hypot(nx, ny);
      return { p: [p[0] - nx / m * w, p[1] - ny / m * w], w };
    });
    const xr = Math.max(...moitieA.map(p => p[0])) + BANDE + 10, yo = cy + 2;
    return { W, H, clair, foret, cx, cy, talle, yDiv, moitieA, xFront, neigeIn, xr, yo };
  };

  const plan = z => {
    const g = geoPlan(z), { W, H, cx, cy, yDiv, xFront, xr, yo } = g;
    const o = [`<clipPath id="k9910-p"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath>`, '<g clip-path="url(#k9910-p)">'];
    // la neige en lisière, son bord du côté de la clairière
    const inner = g.neigeIn.map(q => q.p);
    o.push(`<path d="${pd(g.clair, true)} ${pd(inner.slice().reverse(), true)}" fill="url(#h-neige)" stroke="none" fill-rule="evenodd"/>`);
    o.push(`<path d="${pd(inner, true)}" ${A.fin}/>`);
    // la forêt : des cimes d'épinette vues de dessus
    const rr = alea(9910), cimes = [];
    for (let y = 4; y < H; y += 21) for (let x = 4; x < W; x += 22) {
      const p = [Math.min(W - 3, Math.max(3, x + (rr() - 0.5) * 12)), Math.min(H - 3, Math.max(3, y + (rr() - 0.5) * 10))], r = 10 + rr() * 4;
      if (!dedans(p, g.foret)) cimes.push({ p, r, s: rr() * 6 });
    }
    cimes.sort((a, b) => a.p[1] - b.p[1]);
    for (const c of cimes) {
      const n = 14, pts = Array.from({ length: n }, (_, i) => {
        const a = 2 * Math.PI * i / n + c.s, rad = i % 2 ? c.r * 0.7 : c.r * (0.93 + 0.07 * Math.sin(i * 1.7 + c.s));
        return [c.p[0] + rad * Math.cos(a), c.p[1] + rad * Math.sin(a)];
      });
      o.push(`<path d="${pd(pts, true)}" ${bD}/>`);
      for (let k = 0; k < 4; k++) {
        const a = c.s + k * Math.PI / 2 + 0.4;
        o.push(seg(c.p, [c.p[0] + c.r * 0.5 * Math.cos(a), c.p[1] + c.r * 0.5 * Math.sin(a)], A.fin));
      }
      o.push(point(c.p, 1.2));
    }
    o.push('</g>');

    // les plants : une touffe vue de dessus, un petit rond festonné
    const touffe = (x, y, r) => pd(Array.from({ length: 20 }, (_, i) => { const a = 2 * Math.PI * i / 20; const k = r * (1 + 0.2 * Math.cos(5 * a)); return [x + k * Math.cos(a), y + k * Math.sin(a)]; }), true);
    const rp = alea(4242), touffes = [], brule = [];
    for (let y = 4; y < H; y += 9) for (let x = 4; x < W; x += 9.5) {
      const p = [x + (rp() - 0.5) * 4.5, y + (rp() - 0.5) * 4.5];
      if (!dedans(p, g.talle)) continue;
      if (p[1] < yDiv - BANDE - 4) touffes.push(p);
      else if (p[1] > yDiv + BANDE + 3) { if (p[0] < xFront(p[1]) - 6) touffes.push(p); else if (p[0] > xFront(p[1]) + 7) brule.push(p); }
    }
    o.push(`<path d="${touffes.map(p => touffe(p[0], p[1], 2.8)).join(' ')}" ${A.fin}/>`);
    // le brûlé : les tiges noircies, un point et un bout de trait chacune, serrées
    const rb = alea(77);
    for (const p of brule) for (const [dx, dy] of [[0, 0], [4.5, 3.5]]) {
      const q = [p[0] + dx + (rb() - 0.5) * 2, p[1] + dy + (rb() - 0.5) * 2], a = rb() * Math.PI;
      if (!dedans(q, g.talle) || q[0] < xFront(q[1]) + 7 || q[1] < yDiv + BANDE + 3) continue;
      o.push(point(q, 1.25), seg([q[0] + 2 * Math.cos(a), q[1] + 2 * Math.sin(a)], [q[0] + 4.4 * Math.cos(a), q[1] + 4.4 * Math.sin(a)], A.fin));
    }
    // le bord de la moitié qui attend
    o.push(`<path d="${pd(g.talle.filter(p => p[1] < yDiv - BANDE + 1))}" ${A.detail}/>`);
    // le coupe-feu : une bande de terre nue tout autour de la moitié qui brûle
    const ext = decale(g.moitieA, BANDE), int = decale(g.moitieA, -BANDE);
    o.push(`<path d="${pd(ext, true)} ${pd(int.slice().reverse(), true)}" ${A.hachure('terre', 'aucun')} fill-rule="evenodd"/>`);
    o.push(`<path d="${pd(ext, true)}" ${A.detail}/>`, `<path d="${pd(int, true)}" ${A.detail}/>`);
    // charte : la zone qui brûle, en tireté rouge, sur le bord extérieur du coupe-feu
    o.push(`<path d="${pd(decale(g.moitieA, BANDE + 3.5), true)}" ${A.zone}/>`);
    // le front de flammes : des langues couchées vers où va le vent, sur une ligne de feu
    const yA0 = yDiv + BANDE + 6, bas = Math.max(...int.map(p => p[1])) - 4;
    const ligne = [];
    for (let y = yA0; y <= bas; y += 2) if (dedans([xFront(y), y], int)) ligne.push([xFront(y), y]);
    // une flamme : la forme habituelle, penchée vers où va le vent, la base sur la ligne de feu
    const FL = [['M', [0, 0]], ['C', [-3.5, 0], [-5.5, -3], [-4.8, -6.5]], ['C', [-4.3, -9], [-2.5, -10.5], [-2, -12]],
      ['C', [-1, -10.5], [0, -9.5], [0.6, -9.8]], ['C', [1.2, -12.5], [2.8, -14], [2.2, -17]], ['C', [5.8, -13.5], [6.2, -8], [5, -4.5]],
      ['C', [4.2, -1.5], [2.4, 0], [0, 0]]];
    const FLi = [['M', [0.8, -1.8]], ['C', [-1.6, -2.2], [-2.2, -5], [-0.4, -7.2]], ['C', [0.2, -5.8], [1.2, -6], [1.8, -8.4]], ['C', [3.6, -6], [3.6, -2.4], [0.8, -1.8]]];
    const flamme = (x, y, e, ang) => {
      const c = Math.cos(ang), sn = Math.sin(ang), T = ([u, v]) => `${r1(x + e * (u * c - v * sn))} ${r1(y + e * (u * sn + v * c))}`;
      const d = cmds => cmds.map(([k, ...pts]) => k + pts.map(T).join(' ')).join(' ') + ' Z';
      return `<path d="${d(FL)}" ${bD}/>
<path d="${d(FLi)}" ${A.fin}/>`;
    };
    const flammes = [];
    for (let i = 0, y = yA0 + 10; y <= bas + 2; y += 14, i++) {
      const xf = xFront(y);
      if (!dedans([xf, y], int)) continue;
      flammes.push(flamme(xf - 2, y, i % 2 ? 1.9 : 2.1, 0.62));
    }
    o.push(`<path d="${pd(ligne)}" ${A.arete}/>`, ...flammes);
    // le feu recule contre le vent : trois flèches vers la gauche, devant le front
    for (const y of [yDiv + 28, yDiv + 50, yDiv + 72]) {
      const xf = xFront(y) - 5, d = `M${r1(xf)} ${r1(y)} L${r1(xf - 38)} ${r1(y)}`;
      o.push(`<path d="${d}" fill="none" stroke="${BLANC}" stroke-width="6" stroke-linecap="round"/>`);
      o.push(h.fleche(d, A.arete));
    }
    // le vent : deux flèches ondulées, de la gauche
    const xv = Math.min(...g.moitieA.map(p => p[0])) - BANDE - 88;
    for (const y of [cy - 30, cy + 22]) o.push(h.fleche(`M${r1(xv)} ${r1(y)} q9 -6 18 0 t18 0 t18 0 t12 0`, A.contour));
    // les outils, prêts au bord où on allume : le seau d'eau, le battoir, le râteau à feu
    o.push(h.cercle(xr + 14, yo + 46, 11, bA), h.cercle(xr + 14, yo + 46, 8.2, A.hachure('eau', 'fin')));
    o.push(`<path d="M${r1(xr + 3)} ${r1(yo + 46)} Q${r1(xr + 14)} ${r1(yo + 30)} ${r1(xr + 25)} ${r1(yo + 46)}" ${A.detail}/>`);
    // le battoir, couché à plat : une bavette souple aux coins arrondis, plus large que longue,
    // le manche qui y entre, une rangée de rivets à la jonction ; la bavette vers la talle
    const by = yo + 12;
    o.push(h.rect(xr + 18, by - 1.8, 70, 3.6, bD));
    o.push(`<rect x="${r1(xr)}" y="${r1(by - 14)}" width="22" height="28" rx="5" ${bA}/>`);
    o.push(h.rect(xr + 12, by - 1.8, 10, 3.6, bD));
    for (let k = 0; k < 3; k++) o.push(point([xr + 16, by - 8 + k * 8], 1));
    // le râteau à feu, couché à plat : la tête en travers, ses dents vers la talle
    const ty = yo + 82;
    o.push(h.rect(xr + 8, ty - 1.8, 80, 3.6, bD));
    o.push(h.rect(xr + 2, ty - 14, 6, 28, bA));
    for (let k = 0; k < 7; k++) o.push(h.ligne(xr + 2, ty - 12 + k * 4, xr - 4, ty - 12 + k * 4, A.detail));
    return o.join('\n');
  };
  const renvoisPlan = z => {
    const g = geoPlan(z), { cx, cy, yDiv, xFront, xr, yo } = g;
    const ext = decale(g.moitieA, BANDE);
    const gauche = ext.reduce((m, p) => (p[1] > yDiv + 40 && p[0] < m[0] ? p : m), [1e9, 0]);
    let best = null;
    g.neigeIn.forEach((q, i) => { const p = g.clair[i]; if (p[0] < z.l * 0.4 && p[1] < cy - 20 && (!best || q.w > best.w)) best = { w: q.w, p: [(p[0] + q.p[0]) / 2, (p[1] + q.p[1]) / 2] }; });
    const xv = Math.min(...g.moitieA.map(p => p[0])) - BANDE - 88;
    const yF = yDiv + 60;
    return [
      { n: 1, rond: [r1(xv + 30), r1(cy - 60)], cible: [r1(xv + 27), r1(cy - 33)], texte: 'vent léger, sans rafales' },
      { n: 2, rond: [r1(xFront(yF) + 60), r1(yF + 12)], cible: [r1(xFront(yF) + 9), r1(yF)], texte: 'allumé où va le vent, recule contre lui' },
      { n: 3, rond: [r1(cx + 30), r1(cy - 48)], cible: [r1(cx + 8), r1(cy - 34)], texte: 'l’autre moitié : son tour l’an prochain' },
      { n: 4, rond: [r1(gauche[0] - 30), r1(gauche[1] + 22)], cible: [r1(gauche[0] + 5), r1(gauche[1])], texte: 'coupe-feu tout autour : rien qui brûle' },
      { n: 5, rond: [r1(best.p[0] + 36), r1(best.p[1] + 26)], cible: [r1(best.p[0]), r1(best.p[1])], texte: 'la neige encore en lisière de forêt' },
      { n: 6, rond: [r1(xr + 70), r1(yo + 46)], cible: [r1(xr + 27), r1(yo + 46)], texte: 'battoir, râteau à feu, eau, en main' },
    ];
  };

  // ─── une tige de bleuet en dormance ──────────────────────────────────────────────────
  // Nue, ramifiée, en léger zigzag d'un nœud à l'autre ; un bourgeon au bout de chaque pousse,
  // un peu plus gros (les bourgeons à fruits sont au bout des tiges), de petits le long.
  const tige = (x, y, Ht, s, e = 1) => {
    const r = alea(Math.floor(s) + 11), o = [];
    const pen = (r() - 0.5) * 0.16;
    const pts = [[x, y]];
    for (let k = 1; k <= 6; k++) { const t = k / 6; pts.push([x + pen * Ht * t + (k % 2 ? 1 : -1) * 0.9 * e, y - Ht * t]); }
    o.push(`<path d="${pd(pts)}" ${A.detail}/>`);
    const bout = pts[6];
    o.push(h.ellipse(bout[0], bout[1] - 1.3 * e, 1.1 * e, 1.8 * e, A.plein));
    const nb = 3;
    for (let b = 0; b < nb; b++) {
      const k = 2 + b, cote = (b + Math.floor(s)) % 2 ? 1 : -1;
      const base = pts[k], lg = Ht * (0.26 + r() * 0.12);
      const a = (-90 + cote * (30 + r() * 14)) * Math.PI / 180;
      const fin = [base[0] + lg * Math.cos(a), base[1] + lg * Math.sin(a)];
      const mid = [base[0] + lg * 0.5 * Math.cos(a) + cote * 1.2, base[1] + lg * 0.5 * Math.sin(a) + 1];
      o.push(`<path d="M${r1(base[0])} ${r1(base[1])} Q${r1(mid[0])} ${r1(mid[1])} ${r1(fin[0])} ${r1(fin[1])}" ${A.fin}/>`);
      o.push(h.ellipse(fin[0], fin[1] - 1 * e, 0.95 * e, 1.5 * e, A.plein));
      if (b < 2) {
        const m = [(base[0] + fin[0]) / 2, (base[1] + fin[1]) / 2], a2 = a + cote * 0.55, l2 = lg * 0.42;
        const f2 = [m[0] + l2 * Math.cos(a2), m[1] + l2 * Math.sin(a2)];
        o.push(seg(m, f2, A.fin), point(f2, 0.8 * e));
      }
      o.push(point([pts[k + 1][0] - cote * 1.1 * e, pts[k + 1][1] + 2], 0.6 * e));
    }
    return { svg: o.join('\n'), pts };
  };
  // un rhizome en coupe : un tube blanc, ondulé
  const tube = (pts, ep) => {
    const G = [], Dr = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1, nx = -dy / n, ny = dx / n;
      G.push([pts[i][0] + nx * ep / 2, pts[i][1] + ny * ep / 2]); Dr.push([pts[i][0] - nx * ep / 2, pts[i][1] - ny * ep / 2]);
    }
    return `<path d="${pd([...G, ...Dr.reverse()], true)}" ${bD}/>`;
  };

  // ─── Vue 2 : le bloc de sol, la faucille au ras du sol ───────────────────────────────
  // Vue d'en haut et de biais : u vers la droite, v en profondeur (vers le haut à droite), w vers
  // le haut. La faucille est couchée à plat juste au-dessus du sol, le manche vers la gauche, où
  // est celui qui coupe ; elle a crocheté une poignée de tiges et on la tire vers soi. À gauche,
  // c'est déjà coupé : il ne reste que la face des tiges, au ras. Les faces du bloc montrent
  // l'humus, où court le rhizome, et le sol minéral dessous.
  const U = 250, V = 100, HUM = 24, D = 42, KX = 0.42, KY = 0.72;
  const geoBloc = z => {
    const ox = Math.round((z.l - (U + V * KX)) / 2) + 4, oy = z.h - D - 4;
    return { P: (u, v, w) => [ox + u + v * KX, oy - w - v * KY] };
  };
  // la faucille : le manche le long de -u depuis la virole (FU, FV) ; la lame part dans l'axe du
  // manche et s'enroule en C vers le fond ; le tranchant est à l'intérieur du C.
  const FU = 148, FV = 22, RF = 34, W0 = 3;
  const lameAxe = t => { const a = (-90 + t * 208) * Math.PI / 180; return [FU + 4 + RF * Math.cos(a) * (1 + 0.12 * t), FV + RF + RF * Math.sin(a)]; };
  const lameLarg = t => (8 + 4 * Math.sin(Math.PI * Math.min(1, t / 0.7))) * (t > 0.6 ? Math.max(0, (1 - t) / 0.4) ** 0.8 : 1);
  const coupeLimite = v => 118 + v * 0.1;
  const tiges = (() => {
    const r = alea(7331), L = [];
    for (let v = 5; v < V - 3; v += 17) for (let u = 7; u < U - 5; u += 21) {
      const p = [u + (r() - 0.5) * 12, v + (r() - 0.5) * 8];
      const c = [p[0] - FU - 4, p[1] - FV - RF], rc = Math.hypot(c[0], c[1]);
      const dansC = rc < RF - 8 && p[0] > FU - 14;
      const sousFaucille = Math.abs(rc - RF) < 8 && p[1] > FV - 4 || (p[0] < FU + 6 && p[0] > FU - 70 && Math.abs(p[1] - FV) < 9);
      if (sousFaucille) continue;
      L.push({ u: p[0], v: p[1], coupee: !dansC && p[0] < coupeLimite(p[1]), H: 44 + r() * 16, s: Math.floor(r() * 1000) });
    }
    return L;
  })();
  const bloc = z => {
    const { P } = geoBloc(z), o = [];
    const q = (...a) => a.map(p => P(...p));
    // les faces : l'humus, puis le sol minéral
    o.push(`<path d="${pd(q([0, 0, 0], [U, 0, 0], [U, 0, -HUM], [0, 0, -HUM]), true)}" ${A.hachure('terre', 'aucun')}/>`);
    o.push(`<path d="${pd(q([0, 0, -HUM], [U, 0, -HUM], [U, 0, -D], [0, 0, -D]), true)}" ${A.hachure('gravier', 'aucun')}/>`);
    o.push(`<path d="${pd(q([U, 0, 0], [U, V, 0], [U, V, -HUM], [U, 0, -HUM]), true)}" ${A.hachure('terre', 'aucun')}/>`);
    o.push(`<path d="${pd(q([U, 0, -HUM], [U, V, -HUM], [U, V, -D], [U, 0, -D]), true)}" ${A.hachure('gravier', 'aucun')}/>`);
    o.push(`<path d="${pd(q([0, 0, -HUM], [U, 0, -HUM], [U, V, -HUM]))}" ${A.fin}/>`);
    // le rhizome en coupe sur les deux faces, et les tiges du premier rang qui en montent
    const wR = u => -11 - 3 * Math.sin(u / 23) - 1.5 * Math.sin(u / 7);
    const rz = [];
    for (let u = 0; u <= U; u += 5) rz.push(P(u, 0, wR(u)));
    o.push(tube(rz, 5));
    const rz2 = [];
    for (let v = 0; v <= V; v += 5) rz2.push(P(U, v, -12 - 3 * Math.sin(v / 19 + 1)));
    o.push(tube(rz2, 5));
    for (const t of tiges.filter(t => t.v < 9)) {
      const a = P(t.u, 0, wR(t.u) + 1.5), b = P(t.u, 0, 0);
      o.push(h.rect(a[0] - 1.3, b[1], 2.6, a[1] - b[1], bF));
    }
    // les arêtes du bloc
    o.push(`<path d="${pd(q([0, 0, 0], [U, 0, 0], [U, V, 0], [0, V, 0]), true)}" ${A.arete}/>`);
    o.push(`<path d="${pd(q([0, 0, 0], [0, 0, -D], [U, 0, -D], [U, V, -D], [U, V, 0]))}" ${A.contour}/>`);
    o.push(`<path d="${pd(q([U, 0, 0], [U, 0, -D]))}" ${A.arete}/>`);
    // la faucille : la lame en C (le tranchant dedans, son biseau en trait fin), la virole, le manche
    const G = [], Dd = [], B = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80, c = lameAxe(t), t2 = lameAxe(Math.min(1, t + 0.004)), t1 = lameAxe(Math.max(0, t - 0.004));
      const du = t2[0] - t1[0], dv = t2[1] - t1[1], n = Math.hypot(du, dv) || 1;
      const nu = dv / n, nv = -du / n;       // normale vers l'extérieur du C
      const w = lameLarg(t);
      G.push(P(c[0] + nu * w * 0.5, c[1] + nv * w * 0.5, W0));
      Dd.push(P(c[0] - nu * w * 0.5, c[1] - nv * w * 0.5, W0));
      if (t > 0.06 && t < 0.93) B.push(P(c[0] - nu * (w * 0.5 - 3), c[1] - nv * (w * 0.5 - 3), W0));
    }
    const lame = `<path d="${pd([...G, ...Dd.reverse()], true)}" ${bA}/>\n<path d="${pd(B)}" ${A.fin}/>`;
    const mH = 5.2, m0 = P(FU - 66, FV, W0 + 4), m1 = P(FU - 7, FV, W0 + 4);
    const manche = `<path d="M${r1(m1[0])} ${r1(m1[1] - mH)} L${r1(m0[0] + 3)} ${r1(m0[1] - mH)} Q${r1(m0[0] - 3)} ${r1(m0[1] - mH)} ${r1(m0[0] - 3)} ${r1(m0[1])} Q${r1(m0[0] - 3)} ${r1(m0[1] + mH)} ${r1(m0[0] + 3)} ${r1(m0[1] + mH)} L${r1(m1[0])} ${r1(m1[1] + mH)} Z" ${bA}/>`
      + seg([m0[0] + 8, m0[1] - 1.8], [m1[0] - 6, m1[1] - 1.8], A.fin) + seg([m0[0] + 16, m0[1] + 2], [m1[0] - 14, m1[1] + 2], A.fin);
    const v0 = P(FU - 8, FV, W0 + 4), v1 = P(FU + 4, FV, W0 + 4);
    const virole = `<path d="M${r1(v0[0])} ${r1(v0[1] - 6)} L${r1(v1[0])} ${r1(v1[1] - 5)} L${r1(v1[0])} ${r1(v1[1] + 5)} L${r1(v0[0])} ${r1(v0[1] + 6)} Z" ${bA}/>` + seg([v0[0] + 4, v0[1] - 5.6], [v0[0] + 4, v0[1] + 5.6], A.fin);
    // l'ordre : les tiges derrière la lame, la lame, puis les tiges devant et dans le C
    const dessineTige = t => {
      const b = P(t.u, t.v, 0);
      if (t.coupee) return h.ellipse(b[0], b[1], 2.4, 1.6, bD) + point(b, 0.6);
      return tige(b[0], b[1], t.H, t.s).svg;
    };
    const fond = FV + 2 * RF + 6;
    tiges.filter(t => t.v > fond).sort((a, b) => b.v - a.v).forEach(t => o.push(dessineTige(t)));
    o.push(lame, virole, manche);
    tiges.filter(t => t.v <= fond).sort((a, b) => b.v - a.v).forEach(t => o.push(dessineTige(t)));
    // le geste : on tire vers soi
    const f0 = P(FU - 26, FV - 13, 1), f1 = P(FU - 78, FV - 13, 1);
    o.push(`<path d="M${r1(f0[0])} ${r1(f0[1])} L${r1(f1[0])} ${r1(f1[1])}" fill="none" stroke="${BLANC}" stroke-width="6" stroke-linecap="round"/>`);
    o.push(h.geste(`M${r1(f0[0])} ${r1(f0[1])} L${r1(f1[0])} ${r1(f1[1])}`));        // charte : le geste en rouge
    return o.join('\n');
  };
  const renvoisBloc = z => {
    const { P } = geoBloc(z);
    const lm = P(FU - 36, FV, W0 + 4);
    const sb = tiges.filter(t => t.coupee && t.v > 40 && t.u < 50).sort((a, b) => a.u - b.u)[0];
    const s = P(sb.u, sb.v, 0), rz = P(24, 0, -11 - 3 * Math.sin(24 / 23) - 1.5 * Math.sin(24 / 7));
    return [
      { n: 7, rond: [r1(lm[0] + 4), r1(lm[1] - 78)], cible: [r1(lm[0]), r1(lm[1] - 4)], texte: 'faucille tirée vers soi, au ras du sol' },
      { n: 8, rond: [r1(s[0] - 2), r1(s[1] - 32)], cible: [r1(s[0]), r1(s[1] - 1)], texte: 'toutes les tiges coupées au ras du sol' },
      { n: 9, rond: [12, r1(rz[1] - 34)], cible: [r1(rz[0]), r1(rz[1])], texte: 'le rhizome vit dans l’humus' },
    ];
  };

  // ─── Vues 3 et 4 : à ras, trop haut ──────────────────────────────────────────────────
  // En coupe, à la même échelle que le bloc : le sol, l'humus et le rhizome. À ras, la vieille
  // tige ne dépasse pas le sol et la talle repart ; trop haut, le chicot repousse de côté.
  const sol = z => {
    const yg = Math.round(z.h * 0.7), yh = yg + 30, o = [];
    const yRz = x => yg + 14 + 2.5 * Math.sin(x / 17);
    o.push(h.rect(4, yg, z.l - 8, yh - yg, A.hachure('terre', 'aucun')));
    o.push(h.rect(4, yh, z.l - 8, z.h - 6 - yh, A.hachure('gravier', 'aucun')));
    o.push(h.ligne(4, yh, z.l - 4, yh, A.fin));
    const rz = [];
    for (let x = 4; x <= z.l - 4; x += 4) rz.push([x, yRz(x)]);
    o.push(tube(rz, 6));
    return { yg, yRz, svg: o.join('\n') };
  };
  const geoRas = z => {
    const s = sol(z);
    const pousses = [[z.l * 0.55, 74, 3], [z.l * 0.8, 62, 8]].map(([x, Ht, sd]) => ({ x, t: tige(x, s.yg, Ht, sd, 1.15) }));
    return { s, pousses, xc: z.l * 0.3 };
  };
  const ras = z => {
    const { s, pousses, xc } = geoRas(z), o = [s.svg];
    // la vieille tige coupée à ras : du rhizome à la surface, sa face au niveau du sol
    o.push(h.rect(xc - 2.6, s.yg, 5.2, s.yRz(xc) - s.yg, bD));
    // les pousses neuves qui montent du rhizome
    for (const p of pousses) { o.push(h.rect(p.x - 1.4, s.yg, 2.8, s.yRz(p.x) - s.yg, bF)); o.push(p.t.svg); }
    o.push(h.ligne(4, s.yg, z.l - 4, s.yg, A.contour));
    o.push(h.ellipse(xc, s.yg, 3.2, 1.5, bD), point([xc, s.yg], 0.6));
    o.push(h.controle(xc, s.yg, 10));                    // charte : le point à vérifier, la coupe à ras
    return o.join('\n');
  };
  const HC = 52;
  const geoHaut = z => {
    const s = sol(z), xc = z.l * 0.45;
    const pousses = [[s.yg - 44, 1, 30], [s.yg - 33, -1, 28], [s.yg - 19, 1, 22]].map(([y, cote, lg]) => {
      const x0 = xc + cote * 2.6, p1 = [x0 + cote * lg * 0.6, y - lg * 0.1], p2 = [x0 + cote * lg * 0.85, y - lg * 0.7];
      return { x0, y, p1, p2, milieu: [(x0 + 2 * p1[0] + p2[0]) / 4, (y + 2 * p1[1] + p2[1]) / 4] };
    });
    return { s, xc, pousses };
  };
  const haut = z => {
    const { s, xc, pousses } = geoHaut(z), o = [s.svg];
    // le chicot : la tige coupée trop haut, sa face en haut
    o.push(h.rect(xc - 2.6, s.yg - HC, 5.2, s.yRz(xc) - s.yg + HC, bD));
    o.push(h.ellipse(xc, s.yg - HC, 3.2, 1.5, bD), point([xc, s.yg - HC], 0.6));
    // les pousses de côté : grêles, courtes, qui partent du flanc et se redressent
    for (const p of pousses) o.push(`<path d="M${r1(p.x0)} ${r1(p.y)} Q${r1(p.p1[0])} ${r1(p.p1[1])} ${r1(p.p2[0])} ${r1(p.p2[1])}" ${A.fin}/>`, point(p.p2, 0.8));
    o.push(h.ligne(4, s.yg, z.l - 4, s.yg, A.contour));
    o.push(h.controle(xc, s.yg - HC, 10));               // charte : là où ça rate, la coupe trop haute
    return o.join('\n');
  };

  return {
    ref: '99-10',
    titre: 'Rajeunir la talle de bleuets : le feu ou la lame',
    desc: 'En haut, une talle de bleuets dans une clairière, vue de dessus : la moitié du bas brûle, allumée du côté où va le vent, et son front de flammes recule contre le vent ; une bande de coupe-feu en fait le tour, y compris entre les deux moitiés ; la neige reste en lisière de forêt ; le seau, le battoir et le râteau à feu attendent au bord où on a allumé ; la moitié du haut attend l’an prochain. En bas, un bloc de sol vu de biais : une faucille couchée au ras du sol, tirée vers soi, a crocheté une poignée de tiges ; derrière elle il ne reste que la face des tiges coupées ; l’humus porte le rhizome. À côté, en coupe : une tige coupée à ras, d’où la talle repart, et un chicot coupé trop haut qui repousse de côté. L’encadré danger dit quand on ne brûle pas.',
    format: 'pleine',
    disposition: [['plan'], ['coupe', 'ras', 'haut']],
    hauteurs: [5, 4],
    largeurs: [[1], [1.8, 0.66, 0.66]],
    vues: {
      plan: { titre: 'Brûler une moitié à la fois, au printemps', dessin: plan, renvois: renvoisPlan },
      coupe: { titre: 'Ou couper, en dormance', dessin: bloc, renvois: renvoisBloc },
      ras: {
        titre: 'À ras', dessin: ras,
        renvois: z => { const p = geoRas(z).pousses[0].t.pts[3]; return [{ n: 10, rond: [z.l - 14, r1(p[1] - 30)], cible: [r1(p[0] + 1), r1(p[1])], texte: 'coupée à ras, la talle repart' }]; },
      },
      haut: {
        titre: 'Trop haut', dessin: haut,
        renvois: z => { const p = geoHaut(z).pousses[0].milieu; return [{ n: 11, rond: [z.l - 14, r1(p[1] - 36)], cible: [r1(p[0]), r1(p[1])], texte: 'chicot long : repousse de côté, peu productif' }]; },
      },
    },
    danger: 'Pas de neige en lisière, un humus qui s’effrite sous le pied, un vent qui monte : on coupe à la lame, on ne brûle pas. Un feu chaud brûle l’humus, et le rhizome avec. On ne quitte pas la talle brûlée avant d’avoir passé le dos de la main au ras du sol partout où le feu est passé.',
  };
};
