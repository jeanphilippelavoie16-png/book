// 103-40 — Le tendon et la babiche : défibrer au maillet, le poste de débourrage, sécher la
// lanière sous tension, et les deux ratés du séchage (tire-bouchon, cassante).
// Tout vient du chapitre 103 : étapes 5, 14, 19, 20, le tableau des défauts, et « Fabriquer les
// outils » (chevalet, racloir émoussé, cadre d'étirage et garrot). Aucune cote : le chapitre n'en
// donne aucune sur ces objets.
// 13 oct. : l'homme du poste est le corps simple (pose « penche-pousse », tronc 44), ses bras calculés
// par poserBras. 14 oct. : « Défibrer au maillet » prend les mains simples (mains/moteur.js) : la gauche pince
// le bout sec du tendon, le poing droit tient le manche du maillet. Rouge : la poussée du racloir, la frappe.

// L'angle d'une main simple qui met l'axe de sa prise sur axe (degrés écran) et son avant-bras vers vers [x, y].
const poser = (h, o, axe, vers) => {
  const base = Object.assign({}, o, { angle: 0, avantbras: { longueur: 100 } }); delete base.objet;
  const e0 = h.formes.mainSimple(base); let best = null;
  for (const k of [0, 180]) {
    const a = axe - e0.prise.angle + k, m = h.formes.mainSimple(Object.assign({}, base, { angle: a }));
    const d = [m.coude[0] - m.poignet[0], m.coude[1] - m.poignet[1]], v = [vers[0] - m.poignet[0], vers[1] - m.poignet[1]];
    const c = (d[0] * v[0] + d[1] * v[1]) / ((Math.hypot(d[0], d[1]) * Math.hypot(v[0], v[1])) || 1);
    if (!best || c > best.c) best = { a, c };
  }
  return best.a;
};
const MAINS_DEF = {
  pince: { pose: 'pince-laterale', vue: 'pouce', x: -392, vers: [-760, 60], rot: null },
  maillet: { pose: 'prise-manche', vue: 'paume', rot: [0, -30, 0], vers: [-420, 420] },
};

// ─── géométrie ───────────────────────────────────────────────────────────────────────
const f1 = v => Math.round(v * 10) / 10;
const D = pts => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');
const lisse = (pts, n = 8) => {
  if (pts.length < 3) return pts;
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t
        + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
};
// un hasard reproductible : la planche se recompose à l'identique
const hasard = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
const dedans = (p, poly) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
};
// une ligne de cassure (le trait ondulé qui dit « la pièce continue ») de a à b
const cassure = (a, b, amp = 2.2, n = 3) => {
  const pts = [];
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  for (let i = 0; i <= n * 8; i++) {
    const t = i / (n * 8), o = Math.sin(t * n * 2 * Math.PI) * amp;
    pts.push([a[0] + dx * t + nx * o, a[1] + dy * t + ny * o]);
  }
  return pts;
};
// un poil, un filament : un petit trait courbe (un <path>, pas une hachure)
const brin = (a, b, courbe, at) => {
  const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], dx = b[0] - a[0], dy = b[1] - a[1];
  return `<path d="M${f1(a[0])} ${f1(a[1])} Q${f1(m[0] - dy * courbe)} ${f1(m[1] + dx * courbe)} ${f1(b[0])} ${f1(b[1])}" ${at}/>`;
};

// ─── la bille du poste de débourrage (mm, y vers le haut depuis le sol) ─────────────
// Le bout haut sous le ventre, posé dans une fourche ; l'autre bout calé au sol.
const BA = [150, 930], BB = [2350, 95], BR = 95;
const bL = Math.hypot(BB[0] - BA[0], BB[1] - BA[1]);
const bd = [(BB[0] - BA[0]) / bL, (BB[1] - BA[1]) / bL], bn = [-bd[1], bd[0]];   // le long, et vers le haut
const bille = (u, v) => [BA[0] + bd[0] * u + bn[0] * v, BA[1] + bd[1] * u + bn[1] * v];
const angBille = Math.atan2(-(BB[1] - BA[1]), BB[0] - BA[0]);   // la pente, vers le bas à droite
const EPP = 14;      // l'épaisseur de la peau sur le dessus de la bille
const UR = 640;      // où travaille le racloir, le long de la bille
const UP = 1500;     // jusqu'où la peau couvre la bille
const UF = 330;      // la fourche
const XCH = -520;    // la chaudière
const reperePoste = z => {
  const s = Math.min((z.h - 8) / 1780, z.l / 2950), gy = z.h - 5, ox = z.l * 0.23;
  return { s, gy, ox, V: p => [ox + p[0] * s, gy - p[1] * s] };
};

// ─── le défibrage (mm, origine sur le dessus du billot, au point de frappe) ─────────
const repereDef = z => {
  const s = Math.min(z.l / 770, (z.h - 6) / 410);
  const ox = 4 + 560 * s, oy = 4 + 258 * s;
  return { s, V: (x, y) => [ox + x * s, oy - y * s] };
};

// ─── le détail du racloir (repère le long de la bille) ─────────────────────────────
const repereDet = z => {
  const d = [Math.cos(angBille), Math.sin(angBille)], n = [Math.sin(angBille), -Math.cos(angBille)];
  const c = [z.l * 0.44, z.h * 0.62];
  return { d, n, c, P: (u, v) => [c[0] + d[0] * u + n[0] * v, c[1] + d[1] * u + n[1] * v] };
};

// ─── la planche ──────────────────────────────────────────────────────────────────────
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  // ─── les corps simples ─────────────────────────────────────────────────────────────────
  // Les bras d'un corps simple, calculés pour que chaque poing tombe sur sa cible (unités de vue),
  // l'axe de la prise donné en degrés écran (null : la prise vue par le bout, le poignet droit).
  // Le corps regarde vers +x ; pour un corps tourné vers la
  // gauche, poserBras le calcule en miroir autour de o.x et rend les mêmes angles.
  const RAD = Math.PI / 180;
  const poserBras = (o, cibles, axes, coudes = {}) => {
    const g = o.cote === 'gauche', X0 = o.x;
    const oo = Object.assign({}, o, { cote: 'droite' });
    const c = F.corps(oo), ang = Object.assign({}, o.angles || {});
    const angDe = v => Math.atan2(v[0], v[1]) / RAD, dirDe = a => [Math.sin(a * RAD), Math.cos(a * RAD)];
    for (const k of ['P', 'L']) {
      let C = cibles[k]; if (!C) continue;
      let ax = axes[k];
      if (g) { C = [2 * X0 - C[0], C[1]]; if (ax != null) ax = 180 - ax; }
      const S = c.articulations['epaule' + k], E_ = c.articulations['coude' + k], Wr = c.articulations['poignet' + k], Mn = c['main' + k];
      const lb = Math.hypot(E_[0] - S[0], E_[1] - S[1]), la = Math.hypot(Wr[0] - E_[0], Wr[1] - E_[1]);
      const hv = [Mn.x - Wr[0], Mn.y - Wr[1]], lm = Math.hypot(...hv);
      const off = angDe(hv) - angDe([Math.cos(Mn.axe * RAD), Math.sin(Mn.axe * RAD)]);
      const resoudre = main => {
        const h2 = dirDe(main + off).map(v => v * lm), W_ = [C[0] - h2[0], C[1] - h2[1]];
        const d = [W_[0] - S[0], W_[1] - S[1]], D = Math.min(Math.hypot(...d), lb + la - 0.01);
        const a0 = angDe(d), B = Math.acos(Math.max(-1, Math.min(1, (lb * lb + D * D - la * la) / (2 * lb * D)))) / RAD;
        const bras = a0 + (coudes[k] === 'avant' ? 1 : -1) * B;
        const e = [S[0] + lb * Math.sin(bras * RAD), S[1] + lb * Math.cos(bras * RAD)];
        const ab = angDe([W_[0] - e[0], W_[1] - e[1]]);
        const pli = Math.abs(((main - ab) % 360 + 540) % 360 - 180);
        return { pli, bras, ab, main };
      };
      let best = null;
      if (ax == null) {                 // la prise vue par le bout : le poignet droit, la main dans l'axe de l'avant-bras
        let main = angDe([Math.cos(Mn.axe * RAD), Math.sin(Mn.axe * RAD)]);
        for (let i = 0; i < 5; i++) { best = resoudre(main); main = best.ab; }
        best = resoudre(main);
      } else for (const main of [180 - ax, -ax, 360 - ax]) { const r = resoudre(main); if (!best || r.pli < best.pli) best = r; }
      ang['bras' + k] = best.bras; ang['avantbras' + k] = best.ab; ang['main' + k] = best.main;
    }
    return ang;
  };
  // le poing d'un corps simple, sous la forme qu'attend poignee() : sa place et l'axe de la prise
  const poingDe = (c, k) => { const m = c['main' + k]; return { trou: { x: m.x, y: m.y, axe: [Math.cos(m.angle * RAD), Math.sin(m.angle * RAD)] } }; };
  const versDeg = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) / RAD;

  return {
    ref: '103-40',
    titre: 'Défibrer le tendon, débourrer la peau, sécher la babiche',
    desc: 'Quatre gestes du chapitre de la babiche. Le poste de débourrage : une bille de bouleau écorcée, '
      + 'le bout haut posé dans une fourche et l’autre calé au sol ; la peau jetée dessus, poil vers le haut, '
      + 'bloquée par le ventre ; le racloir poussé vers le bas, dans le sens du poil, laisse derrière lui une '
      + 'bande nue ; la chaudière d’eau de rinçage attend, pleine, derrière l’homme. En détail, en coupe, le '
      + 'racloir émoussé pousse l’épiderme et le poil en plaque devant lui sans entailler la peau. Le tendon sec, '
      + 'raide, posé sur un billot et tenu par le bout, martelé au maillet de bouleau jusqu’à s’ouvrir en pinceau '
      + 'de filaments qui retombent. Les deux ratés du séchage : la lanière en tire-bouchon, et la lanière cuite, '
      + 'cornée aux bords, cassée net. Enfin la lanière tendue en va-et-vient entre deux arbres, serrée par un '
      + 'garrot : un bâton passé entre les deux brins et tourné, son bout arrêté contre un piquet court. Encadré danger : l’alcali du bain et les yeux.',
    format: 'pleine',
    disposition: [['poste', 'plaques'], ['defibrer', 'rates'], ['etirer']],
    hauteurs: [1.4, 0.9, 0.6],
    largeurs: [[1.8, 1], [1.3, 1], [1]],
    vues: {
      // ──────────────────────────────────────────────────────────────────────────────
      poste: {
        titre: 'Le poste de débourrage',
        dessin: z => {
          const { s, gy, ox, V } = reperePoste(z);
          const out = [];
          const rnd = hasard(7);
          out.push(h.ligne(2, gy, z.l - 2, gy, A.arete));

          // la chaudière d'eau, derrière l'homme : pleine, l'eau se voit par le haut
          {
            const hb = 330, rt = 150, rb = 125, ry = 34;
            const top = V([XCH, hb]);
            const c = [V([XCH - rt, hb]), V([XCH - rb, 0]), V([XCH + rb, 0]), V([XCH + rt, hb])];
            out.push(h.path(`M${f1(c[0][0])} ${f1(c[0][1])} L${f1(c[1][0])} ${f1(c[1][1])} `
              + `A${f1(rb * s)} ${f1(ry * s * 0.8)} 0 0 0 ${f1(c[2][0])} ${f1(c[2][1])} L${f1(c[3][0])} ${f1(c[3][1])} Z`, blanc(A.arete)));
            out.push(h.ellipse(top[0], top[1], rt * s, ry * s, blanc(A.arete)));
            out.push(h.ellipse(top[0], top[1] + 1, rt * s - 2.2, ry * s - 1.3, A.hachure('eau', 'aucun')));
            out.push(h.path(`M${f1(top[0] - rt * s)} ${f1(top[1])} C${f1(top[0] - rt * s * 0.9)} ${f1(top[1] - 150 * s)} `
              + `${f1(top[0] + rt * s * 0.9)} ${f1(top[1] - 150 * s)} ${f1(top[0] + rt * s)} ${f1(top[1])}`, A.detail));
          }

          // le rabat de la peau qui pend de l'autre côté de la bille : on en voit le côté chair,
          // et le poil dépasse au bord
          const haut = u => bille(u, BR + EPP);
          const bas = [];
          for (let u = UP; u >= -30; u -= 50) {
            const p = haut(u);
            bas.push([p[0] + 25 * Math.sin(u / 230), Math.max(0, p[1] - 610 + 45 * Math.sin(u / 150))]);
          }
          const rabat = [...[-30, 300, 700, 1100, UP].map(u => bille(u, 0)), [haut(UP)[0] + 30, haut(UP)[1] - 200], ...bas, [BA[0] - 30, 480], [BA[0] - 20, 800]];
          const rabatV = lisse(rabat.map(V), 4);
          out.push(h.path(D(rabatV) + ' Z', blanc(A.arete)));
          // les plis
          [[250, 0.55], [600, 0.7], [980, 0.6]].forEach(([u, k]) => {
            const x = bille(u, 0)[0] + 40;
            const b0 = bas.reduce((m, p) => (Math.abs(p[0] - x) < Math.abs(m[0] - x) ? p : m), bas[0]);
            const a = V(bille(u, -BR - 20)), b = V([b0[0], b0[1] + (bille(u, -BR)[1] - b0[1]) * (1 - k)]);
            out.push(brin(a, b, 0.06, A.fin));
          });
          // le poil qui dépasse sous le bord du rabat
          for (let i = 2; i < bas.length - 1; i++) {
            const p = V(bas[i]);
            if (bas[i][1] < 3) continue;
            for (let k = -1; k <= 1; k++) out.push(brin([p[0] + k * 2.2, p[1] - 0.5], [p[0] + k * 2.2 + 1.8, p[1] + 3.2], 0.15, A.fin));
          }

          // la fourche : un piquet fourchu planté, la bille dans l'enfourchure
          const pF = bille(UF, -BR), cr = [pF[0], pF[1] - 4];
          const fourche = sg => [V([cr[0] + sg * 16, cr[1] - 62]), V([cr[0] + sg * 84, cr[1] + 98]), V([cr[0] + sg * 52, cr[1] + 106]), V([cr[0] - sg * 6, cr[1] - 28])];
          out.push(h.path(D([V([cr[0] - 15, 0]), V([cr[0] - 17, cr[1] - 62]), V([cr[0] + 17, cr[1] - 62]), V([cr[0] + 19, 0])]) + ' Z', blanc(A.arete)));
          out.push(h.chemin(fourche(1), blanc(A.arete), true));   // la branche de derrière

          // la bille écorcée
          out.push(h.chemin([bille(-6, BR), bille(bL, BR), bille(bL, -BR), bille(-6, -BR)].map(V), blanc(A.arete), true));
          // le dessous de la bille, à l'ombre, puis le contour repassé
          out.push(h.chemin([bille(-6, -BR * 0.3), bille(bL, -BR * 0.3), bille(bL, -BR), bille(-6, -BR)].map(V), A.ombre, true),
            h.chemin([bille(-6, BR), bille(bL, BR), bille(bL, -BR), bille(-6, -BR)].map(V), A.arete, true));
          [[-0.35, 1250, 2250], [-0.6, 700, 1500], [0.05, 1650, 2200]].forEach(([k, a, b]) =>
            out.push(h.chemin([bille(a, BR * k), bille(b, BR * k)].map(V), A.fin)));
          out.push(h.chemin(fourche(-1), blanc(A.arete), true));  // la branche de devant

          // la peau sur le dessus, et la bande qui retombe du côté de l'œil : nue derrière le
          // racloir (raclée), encore couverte de poil devant
          const bande = [];
          for (let u = -22; u <= UP; u += 30) bande.push(haut(u));
          for (let u = UP; u >= -22; u -= 30) bande.push(bille(u, BR * 0.2 + 18 * Math.sin(u / 120)));
          const bandeV = [...lisse([V(bille(-22, BR * 0.2)), V(bille(-40, BR * 0.2 - 60)), V(bille(-36, BR + 10)), V(haut(-22))], 4), ...bande.map(V)];
          out.push(h.path(D(bandeV) + ' Z', blanc(A.arete)));
          const dirP = [Math.cos(angBille + 0.55), Math.sin(angBille + 0.55)];
          for (let u = UR + 15; u < UP - 15; u += 20) {
            for (let v = BR * 0.3; v < BR + EPP - 8; v += 16) {
              const p = V(bille(u + (rnd() - 0.5) * 10, v + (rnd() - 0.5) * 6)), L = 3 + rnd() * 1.4;
              if (!dedans(p, bandeV)) continue;
              out.push(brin(p, [p[0] + dirP[0] * L, p[1] + dirP[1] * L], 0.12, A.fin));
            }
          }
          for (let u = UR + 45; u < UP - 10; u += 22) {
            const p = V(haut(u)), q = V(bille(u + 45, BR + EPP + 24));
            out.push(brin(p, q, 0.1, A.fin));
          }
          // l'homme : le corps simple (pose « penche-pousse », le tronc à 44°), le devant du ventre
          // contre le bout de la bille ; les bras recalculés pour que les deux poings serrent les bouts
          // de la poignée, vue par le bout (le poing loin derrière le proche)
          const tR = haut(UR);                          // où le fil de la lame touche la peau
          const pg = V([tR[0] - 32, tR[1] + 50]);       // la poignée proche, derrière et au-dessus du fil
          const rP = 3.8, tRv = V(tR);
          const oH = { x: V([BA[0] - 10 - 195, 0])[0], y: gy, pose: 'penche-pousse', echelle: s, angles: { tronc: 44 } };
          oH.angles = poserBras(oH, { P: pg, L: [pg[0] - 0.8, pg[1] - 0.8] }, { P: null, L: null });
          // la lame du racloir, vue par le bout : le haut vers l'homme, le fil devant ; elle passe
          // devant le poing loin, derrière le poing proche, et le bout de la poignée se voit dans le poing
          const pers = F.corps(Object.assign(oH, { objetP: h.chemin([pg, tRv], A.contour),
            objet: c => h.cercle(c.mainP.x, c.mainP.y, rP, A.hachure('bois', 'arete')) }));
          out.push(String(pers));
          // le geste : la poussée, le long de la bille, dans le sens du poil
          const f0 = V(bille(UR + 90, BR + EPP + 95)), f2 = V(bille(UR + 430, BR + EPP + 95));
          out.push(h.geste(`M${f1(f0[0])} ${f1(f0[1])} L${f1(f2[0])} ${f1(f2[1])}`));
          return out.join('\n');
        },
        renvois: z => {
          const { gy, V } = reperePoste(z);
          const cb = V(bille(1850, -20)), ventre = V([BA[0] - 8, BA[1] - 10]), ch = V([XCH, 170]);
          return [
            { n: 1, rond: [z.l - 16, gy - 86], cible: cb, texte: 'bille écorcée, le bout haut dans une fourche' },
            { n: 2, rond: V([BA[0] + 165, 560]), cible: ventre, texte: 'le ventre sur le bout bloque la peau' },
            { n: 3, rond: [ch[0] + 6, gy - 118], cible: ch, texte: 'chaudière d’eau pleine avant d’ouvrir le sac' },
          ];
        },
      },

      // ──────────────────────────────────────────────────────────────────────────────
      plaques: {
        titre: 'Le racloir pousse, il ne coupe pas',
        dessin: z => {
          const out = [];
          const { d, n, P } = repereDet(z);
          const U = z.l * 0.56 / Math.cos(angBille) - 6, U0 = -z.l * 0.44 / Math.cos(angBille) + 6;
          const rnd = hasard(11);
          const eD = 10;     // le derme, gonflé par le bain
          // la bille, en coupe
          const bois = [P(U0, 0), P(U, 0), ...cassure(P(U, 0), P(U, -32), 1.4, 1).slice(1), ...cassure(P(U, -32), P(U0, -32), 2, 6).slice(1), ...cassure(P(U0, -32), P(U0, 0), 1.4, 1).slice(1)];
          out.push(h.path(D(bois) + ' Z', A.hachure('bois', 'arete')));
          // la peau, en coupe
          out.push(h.path(D([P(U0, 0), P(U, 0), ...cassure(P(U, 0), P(U, eD), 1, 1).slice(1), P(U0, eD), ...cassure(P(U0, eD), P(U0, 0), 1, 1).slice(1)]) + ' Z', blanc(A.arete)));
          // le racloir : la lame plate coupée en travers, penchée vers l'homme, le fil arrondi
          const uB = -16, ang = 50 * Math.PI / 180;
          const b = [-Math.cos(ang) * d[0] + Math.sin(ang) * n[0], -Math.cos(ang) * d[1] + Math.sin(ang) * n[1]];
          const pb = [-b[1], b[0]];
          const Lb = 42, rF = 4.3;
          const e0 = P(uB, eD + rF);
          const pt = (a, k) => [e0[0] + b[0] * a + pb[0] * k, e0[1] + b[1] * a + pb[1] * k];
          const sw = (pb[0] * b[1] - pb[1] * b[0]) > 0 ? 1 : 0;
          const lame = `M${f1(pt(0, -rF)[0])} ${f1(pt(0, -rF)[1])} L${f1(pt(Lb, -rF)[0])} ${f1(pt(Lb, -rF)[1])} L${f1(pt(Lb, rF)[0])} ${f1(pt(Lb, rF)[1])} `
            + `L${f1(pt(0, rF)[0])} ${f1(pt(0, rF)[1])} A${rF} ${rF} 0 0 ${sw} ${f1(pt(0, -rF)[0])} ${f1(pt(0, -rF)[1])} Z`;
          // la face avant de la lame, à la hauteur v
          const avant = v => { const k = (v - eD - rF) / Math.sin(ang); return uB - Math.cos(ang) * k + rF / Math.sin(ang) * 0.9; };
          // le poil encore en place, couché vers le bas de la bille
          const u1 = uB + 44;
          for (let u = u1; u < U - 3; u += 2.3) {
            const r0 = P(u, eD + 0.3), L = 13 + rnd() * 3, a = 0.36 + rnd() * 0.16;
            const q = [r0[0] + (d[0] * Math.cos(a) + n[0] * Math.sin(a)) * L, r0[1] + (d[1] * Math.cos(a) + n[1] * Math.sin(a)) * L];
            if (q[0] < z.l - 2) out.push(brin(r0, q, -0.08, A.detail));
          }
          // la plaque : l'épiderme et le poil décollés ensemble, poussés en bourrelet devant la lame
          const plaque = lisse([P(avant(eD + 1), eD + 1), P(uB + 18, eD + 2.6), P(u1 - 4, eD + 0.6), P(u1 + 6, eD + 11),
            P(uB + 30, eD + 24), P(uB + 14, eD + 31), P(avant(eD + 27), eD + 27)], 6);
          out.push(h.path(D(plaque) + ' Z', blanc(A.detail)));
          for (let k = 0; k < 70; k++) {
            const m = P(uB + rnd() * 44, eD + 2 + rnd() * 27);
            const L = 4 + rnd() * 4, a = rnd() * Math.PI;
            const p = [m[0] - Math.cos(a) * L / 2, m[1] - Math.sin(a) * L / 2], q = [m[0] + Math.cos(a) * L / 2, m[1] + Math.sin(a) * L / 2];
            if (dedans(p, plaque) && dedans(q, plaque)) out.push(brin(p, q, 0.25, A.fin));
          }
          out.push(h.path(lame, A.hachure('metal', 'arete')));
          // le sens de la poussée
          const a0 = P(uB + 34, 64), a1 = P(uB + 92, 64);
          out.push(h.fleche(`M${f1(a0[0])} ${f1(a0[1])} L${f1(a1[0])} ${f1(a1[1])}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const { P } = repereDet(z);
          return [
            { n: 4, rond: [16, z.h * 0.2], cible: P(-30, 40), texte: 'racloir émoussé, poussé dans le sens du poil' },
            { n: 5, rond: [z.l * 0.86, z.h * 0.2], cible: P(14, 26), texte: 'le poil part en plaques, sans forcer' },
          ];
        },
      },

      // ──────────────────────────────────────────────────────────────────────────────
      defibrer: {
        titre: 'Défibrer au maillet',
        dessin: z => {
          const { s, V } = repereDef(z);
          const out = [];
          const rnd = hasard(3);
          // le billot : un rond de bois debout, le dessus vu un peu d'en haut
          const bx0 = -300, bx1 = 160, bcx = (bx0 + bx1) / 2, brx = (bx1 - bx0) / 2, bry = 24, bBas = -142;
          const c0 = V(bcx, 0);
          out.push(h.path(`M${f1(V(bx0, 0)[0])} ${f1(V(bx0, 0)[1])} L${f1(V(bx0, bBas)[0])} ${f1(V(bx0, bBas)[1])} `
            + D(cassure(V(bx0, bBas), V(bx1, bBas), 1.8, 4)).replace('M', 'L') + ` L${f1(V(bx1, 0)[0])} ${f1(V(bx1, 0)[1])} `
            + `A${f1(brx * s)} ${f1(bry * s)} 0 0 1 ${f1(V(bx0, 0)[0])} ${f1(V(bx0, 0)[1])} Z`, blanc(A.arete)));
          // l'écorce : des fentes en long
          for (let x = bx0 + 28; x < bx1 - 10; x += 32 + rnd() * 16) {
            const y0 = -bry * Math.sqrt(Math.max(0, 1 - ((x - bcx) / brx) ** 2)) - 12 - rnd() * 20, y1 = bBas + 14 + rnd() * 30;
            out.push(h.path(D(lisse([V(x, y0), V(x + (rnd() - 0.5) * 10, (y0 + y1) / 2), V(x + (rnd() - 0.5) * 8, y1)], 4)), A.fin));
          }
          // le dessus et ses cernes
          out.push(h.ellipse(c0[0], c0[1], brx * s, bry * s, blanc(A.arete)));
          [0.7, 0.44, 0.2].forEach(k => out.push(h.ellipse(c0[0] + 5 * s, c0[1] + 1.5 * s, brx * s * k, bry * s * k, A.fin)));

          // le tendon : la bande sèche, raide, qui dépasse du billot ; passé le point de frappe,
          // le pinceau de filaments qui retombe par-dessus le bord
          const eT = 7;
          const nF = 13;
          for (let i = 0; i < nF; i++) {
            const k = i / (nF - 1), y0 = eT * (0.1 + 0.8 * k);
            const r = 18 + k * 36 + rnd() * 8, xb = bx1 - 4 + k * 5;
            const pts = [V(-25, y0), V(15, y0 + (k - 0.5) * 3), V(70, y0 + (k - 0.5) * 9 + (rnd() - 0.5) * 3),
              V(xb - r * 0.7, y0 + (k - 0.5) * 11), V(xb + r * 0.15, y0 - r * 0.3), V(xb + r * 0.5, -r),
              V(xb + r * 0.45 + (k - 0.5) * 30 + (rnd() - 0.5) * 8, -r - 45 - rnd() * 20),
              V(xb + r * 0.35 + (k - 0.5) * 44 + (rnd() - 0.5) * 12, -r - 80 - rnd() * 30)];
            out.push(h.path(D(lisse(pts, 6)), A.detail));
          }
          out.push(h.chemin([V(-425, 0), V(-20, 0), V(-20, eT), V(-425, eT)], blanc(A.arete), true));
          // la main gauche pince le bout sec qui dépasse du billot
          // le bout, serré entre le pouce et l'index : la pince de profil
          // modèle s09 (le pouce et l'index qui pincent, de côté), en miroir : le point pincé sur le
          // tendon, l'avant-bras qui remonte à gauche (188 px = 190 mm)
          // la main simple, pince latérale vue du côté du pouce (la prise d'une clé) : le tendon serré entre la pulpe
          // du pouce et le côté de l'index ; l'avant-bras part à gauche. La main est à l'échelle de la vue (en mm).
          const Mp = MAINS_DEF.pince, bordV = { x0: 0, y0: 0, x1: z.l, y1: z.h };
          const boutSec = h.chemin([V(-425, 0), V(-330, 0), V(-330, eT), V(-425, eT)], blanc(A.arete), true);
          const pP = V(Mp.x, eT / 2), oP = { x: pP[0], y: pP[1], pose: Mp.pose, vue: Mp.vue, cote: 'gauche', echelle: s, diametre: eT, ...(Mp.rot ? { rotation: Mp.rot } : {}) };
          const vP = V(...Mp.vers);
          out.push(F.mainSimple({ ...oP, angle: poser(h, oP, 0, vP), objet: boutSec, avantbras: { vers: vP, bord: bordV, bras: { pli: 0 } } }).svg);

          // le maillet taillé dans une bûche de bouleau, levé ; le poing droit sur le manche
          const phi = 28 * Math.PI / 180, ax = [Math.cos(phi), Math.sin(phi)], nx = [-ax[1], ax[0]];
          const Fp = [-190, 72];   // le centre du poing
          const M = (t, k) => V(Fp[0] + ax[0] * t + nx[0] * k, Fp[1] + ax[1] * t + nx[1] * k);
          const rm = 17, rt = 46;
          const tB = -92, tC = 122, tT = 136, tF = 300, re = 13;
          const rr = hasard(29);
          let mSvg = h.path(D([M(tB, -rm), M(tC, -rm), M(tT, -rt), M(tF, -rt), M(tF, rt), M(tT, rt), M(tC, rm), M(tB, rm)]) + ' Z', blanc(A.arete));
          mSvg += h.path(`M${f1(M(tB, -rm)[0])} ${f1(M(tB, -rm)[1])} Q${f1(M(tB - 12, 0)[0])} ${f1(M(tB - 12, 0)[1])} ${f1(M(tB, rm)[0])} ${f1(M(tB, rm)[1])}`, blanc(A.arete));
          // le bord de l'écorce, là où le manche a été taillé
          mSvg += h.path(D(lisse([M(tT + 3, -rt), M(tT - 6, 0), M(tT + 3, rt)], 6)), A.detail);
          // l'écorce du bouleau : les lenticelles, des fentes noires en travers
          for (let k = 0; k < 9; k++) {
            const tt = tT + 18 + rr() * (tF - tT - 40), kk = (rr() * 1.4 - 0.7) * rt, L = 9 + rr() * 9, e = 1.6 + rr() * 0.8;
            mSvg += h.path(D(lisse([M(tt, kk - L / 2), M(tt + e, kk), M(tt, kk + L / 2), M(tt - e, kk), M(tt, kk - L / 2)], 4)) + ' Z', A.plein);
          }
          // le bout de la bûche, vu un peu de face : le bois de bout et ses cernes
          const bout = k => { const q = []; for (let a = 0; a < 2 * Math.PI - 1e-9; a += Math.PI / 20) q.push(M(tF + re * k * Math.cos(a), rt * k * Math.sin(a))); return q; };
          mSvg += h.path(D(bout(1)) + ' Z', blanc(A.arete));
          mSvg += h.path(D(bout(0.62)) + ' Z', A.fin) + h.path(D(bout(0.3)) + ' Z', A.fin);
          const tr = V(Fp[0], Fp[1]);
          // modèle s11 (poing fermé), main droite (miroir) : le manche dans le poing, le pouce vers la
          // tête, l'avant-bras qui monte à gauche hors du cadre ; à la taille d'une main (113 px ≈ 95 mm),
          // le manche, plus gros que le trou du poing, passe derrière les doigts
          // le poing droit sur le manche (34 mm), côté paume : le pouce vers la tête, l'avant-bras qui monte à gauche
          // hors du cadre ; le manche entre d'un côté du poing et ressort de l'autre, la tête peinte avec lui
          const Mm = MAINS_DEF.maillet;
          const oM = { x: tr[0], y: tr[1], pose: Mm.pose, vue: Mm.vue, cote: 'droite', echelle: s, diametre: 2 * rm, ...(Mm.rot ? { rotation: Mm.rot } : {}) };
          const vM = V(...Mm.vers);
          out.push(F.mainSimple({ ...oM, angle: poser(h, oM, -28, vM), objet: mSvg, avantbras: { vers: vM, bord: { x0: 0, y0: 0, x1: z.l, y1: z.h }, bras: { pli: 0 } } }).svg);
          // la frappe : l'arc que décrit la tête
          const R = 335, arc = [];
          for (let a = 27; a >= 5; a -= 2) { const r = a * Math.PI / 180; arc.push(V(Fp[0] + R * Math.cos(r), Fp[1] + R * Math.sin(r))); }
          out.push(h.geste(D(lisse(arc, 3))));
          return out.join('\n');
        },
        renvois: z => {
          const { V } = repereDef(z);
          return [
            { n: 6, rond: [V(-300, -95)[0], z.h - 12], cible: V(-312, 3.5), texte: 'tendon sec : dur, translucide' },
            { n: 7, rond: [z.l - 14, 14], cible: V(30, 205), texte: 'maillet de bouleau, jamais de métal' },
            { n: 8, rond: [z.l - 14, z.h - 14], cible: V(196, -80), texte: 'petits coups : il s’ouvre en pinceau' },
          ];
        },
      },

      // ──────────────────────────────────────────────────────────────────────────────
      rates: {
        titre: 'Les deux ratés du séchage',
        dessin: z => {
          const out = [];
          // le tire-bouchon : une lanière séchée sans tension, enroulée sur elle-même. Peinte
          // du fond vers l'avant, segment par segment : le devant cache le derrière.
          const y1 = z.h * 0.3, x0 = 24, x1 = z.l - 24, R = 11, a = 3.7, sb = 0.62, w = 5.8;
          const tMax = (x1 - x0 - 2 * R) / a;
          const C = t => [x0 + R + a * t + R * sb * Math.sin(t), y1 - R * Math.cos(t), Math.sin(t)];
          const E = (t, k) => { const c = C(t); return [c[0] + k * w / 2, c[1]]; };
          const segs = [];
          const pas = 0.12;
          for (let t = 0; t < tMax - 1e-9; t += pas) {
            const t2 = Math.min(t + pas, tMax);
            segs.push({ z: (C(t)[2] + C(t2)[2]) / 2, q: [E(t, 1), E(t2, 1), E(t2, -1), E(t, -1)] });
          }
          segs.sort((p, q) => p.z - q.z).forEach(g => {
            out.push(h.path(D(g.q) + ' Z', 'fill="#FFFFFF" stroke="none"'));
            out.push(h.path(D([g.q[0], g.q[1]]), A.arete), h.path(D([g.q[3], g.q[2]]), A.arete));
          });
          out.push(h.path(D([E(0, 1), E(0, -1)]), A.arete), h.path(D([E(tMax, 1), E(tMax, -1)]), A.arete));

          // la cassante : cuite au séchage, cornée et translucide aux bords, cassée net
          const y2 = z.h * 0.72, wl = 12, xc = z.l * 0.5;
          const morceau = (a0, b0, rot, cx, cy, graine) => {
            const tr = q => { const dx = q[0] - cx, dy = q[1] - cy; return [cx + dx * Math.cos(rot) - dy * Math.sin(rot), cy + dx * Math.sin(rot) + dy * Math.cos(rot)]; };
            const r = [];
            r.push(h.chemin([[a0, y2 - wl / 2], [b0, y2 - wl / 2], [b0, y2 + wl / 2], [a0, y2 + wl / 2]].map(tr), blanc(A.arete), true));
            // les bords cornés : une bande claire le long de chaque rive
            r.push(h.chemin([[a0, y2 - wl / 2 + 2.6], [b0, y2 - wl / 2 + 2.6]].map(tr), A.fin));
            r.push(h.chemin([[a0, y2 + wl / 2 - 2.6], [b0, y2 + wl / 2 - 2.6]].map(tr), A.fin));
            // le corps opaque : un grain mat, que les rives cornées n'ont plus
            const rr = hasard(graine);
            for (let x = a0 + 2.5; x < b0 - 2; x += 2.6) {
              const yy = y2 + (rr() - 0.5) * (wl - 7.4), q = tr([x + (rr() - 0.5) * 1.5, yy]);
              r.push(h.cercle(q[0], q[1], 0.45, A.plein));
            }
            return r.join('\n');
          };
          out.push(morceau(24, xc - 2, 0, xc, y2, 5));
          out.push(morceau(xc + 5, z.l - 24, -7 * Math.PI / 180, xc + 5, y2 + wl / 2, 9));
          return out.join('\n');
        },
        renvois: z => [
          { n: 9, rond: [z.l * 0.5 + 10, 11], cible: [z.l * 0.5 + 2, z.h * 0.3 - 11], texte: 'tire-bouchon : remouiller et réétirer' },
          { n: 10, rond: [z.l * 0.5 + 18, z.h - 10], cible: [z.l * 0.5 + 1.5, z.h * 0.72 + 3], texte: 'bords cornés, cassure nette : cuite, jeter' },
        ],
      },

      // ──────────────────────────────────────────────────────────────────────────────
      etirer: {
        titre: 'Sécher sous tension',
        dessin: z => {
          const out = [];
          const gy = z.h - 4, yb = z.h * 0.42, rT = 13;
          const xL = 44, xR = z.l - 44, xm = z.l * 0.5;
          const rnd = hasard(19);
          out.push(h.ligne(2, gy, z.l - 2, gy, A.arete));
          // deux bouleaux
          const arbre = xc => {
            const r = [];
            r.push(h.path(`M${f1(xc - rT)} ${f1(gy)} L${f1(xc - rT + 1)} 4 ` + D(cassure([xc - rT + 1, 4], [xc + rT - 1, 4], 1.4, 2)).replace('M', 'L') + ` L${f1(xc + rT)} ${f1(gy)}`, blanc(A.arete)));
            for (let y = 10; y < gy - 6; y += 7 + rnd() * 6) {
              if (Math.abs(y - yb) < 9) continue;
              const x = xc - rT + 3 + rnd() * (2 * rT - 12), L = 3 + rnd() * 5;
              r.push(h.ligne(x, y, x + L, y, A.detail));
            }
            return r.join('\n');
          };
          out.push(arbre(xL), arbre(xR));
          // la lanière : deux brins parallèles, bien séparés, qui font chacun le tour d'un arbre
          // (le brin du haut passe devant le tronc et revient par derrière en brin du bas)
          const sep = 11, bande = (pts, w = 3.6) => h.path(D(pts), 'fill="none" stroke="#000" stroke-width="' + (w + 1.6) + '" stroke-linejoin="round"')
            + h.path(D(pts), 'fill="none" stroke="#FFF" stroke-width="' + w + '" stroke-linejoin="round"');
          const tw = 46, nX = 3;     // la longueur tordue de chaque côté du bâton, le nombre de croisements
          const brinsDroits = (x0, x1) => [-1, 1].map(sg => [[x0, yb + sg * sep], [x1, yb + sg * sep]]);
          // les tours aux arbres
          [[xL, 1], [xR, -1]].forEach(([xc, c]) => {
            const pres = xc + c * rT, loin = xc - c * rT;
            out.push(bande([[pres, yb + sep], [pres - c * 2, yb + sep]]));          // le brin du bas sort de derrière
            out.push(bande(lisse([[pres + c * 1, yb - sep], [xc, yb - sep + 5], [loin + c * 1, yb + sep - 1]], 6)));   // le haut passe devant
          });
          // les brins droits, des arbres jusqu'à la torsion
          [[xL + rT, xm - 4 - tw], [xm + 4 + tw, xR - rT]].forEach(([x0, x1]) => brinsDroits(x0, x1).forEach(q => out.push(bande(q))));
          // la torsion : de chaque côté du bâton, les deux brins tordus l'un sur l'autre
          [[xm - 4 - tw, xm - 4], [xm + 4, xm + 4 + tw]].forEach(([x0, x1], cotI) => {
            const per = (x1 - x0) / nX;
            const y = (x, sg) => {
              const t = (x - x0) / per;
              const amp = sep * (cotI === 0 ? 1 - 0.55 * (x - x0) / tw : 0.45 + 0.55 * (x - x0) / tw);
              return yb + sg * amp * Math.cos(Math.PI * t);
            };
            for (let k = 0; k < nX; k++) {
              const a0 = x0 + k * per, a1 = a0 + per;
              const seg = sg => { const q = []; for (let i = 0; i <= 10; i++) { const x = a0 + (a1 - a0) * i / 10; q.push([x, y(x, sg)]); } return q; };
              const dessus = k % 2 === 0 ? 1 : -1;
              out.push(bande(seg(-dessus)), bande(seg(dessus)));
            }
          });
          // le garrot : un bâton court passé entre les deux brins, sans toucher le sol ; son bout bas
          // arrêté contre un piquet court planté
          const sb = [xm + 9, yb + 38], st = [xm - 6, yb - 30];
          const ps = 10;   // le piquet
          out.push(h.path(`M${f1(sb[0] + 3)} ${f1(gy)} L${f1(sb[0] + 3)} ${f1(yb + 30)} L${f1(sb[0] + 3 + ps / 2)} ${f1(yb + 26)} L${f1(sb[0] + 3 + ps)} ${f1(yb + 30)} L${f1(sb[0] + 3 + ps)} ${f1(gy)} Z`, blanc(A.arete)));
          const ax = [sb[0] - st[0], sb[1] - st[1]], L = Math.hypot(ax[0], ax[1]), nb = [-ax[1] / L * 3.2, ax[0] / L * 3.2];
          out.push(h.path(D([[st[0] + nb[0], st[1] + nb[1]], [sb[0] + nb[0], sb[1] + nb[1]], [sb[0] - nb[0], sb[1] - nb[1]], [st[0] - nb[0], st[1] - nb[1]]]) + ' Z', blanc(A.arete)));
          // le brin du dessus repasse devant le bâton
          out.push(bande([[xm - 7, yb - 1.5], [xm + 7, yb + 1.5]]));
          // le sens du tour, autour de l'axe des brins
          out.push(h.fleche(`M${f1(xm - 26)} ${f1(yb - 30)} A12 26 0 0 0 ${f1(xm - 28)} ${f1(yb + 22)}`, A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const yb = z.h * 0.42;
          return [
            { n: 11, rond: [z.l * 0.27, z.h - 14], cible: [z.l * 0.27, yb + 7], texte: 'va-et-vient entre deux arbres, à l’ombre' },
            { n: 12, rond: [z.l * 0.5 + 44, z.h * 0.12], cible: [z.l * 0.5 - 3, z.h * 0.42 - 22], texte: 'garrot : un bâton tourné entre les brins' },
          ];
        },
      },
    },
    danger: 'Un alcali dissout la cornée d’un œil comme l’épiderme d’une peau. Lunettes fermées avant d’ouvrir le sac ; '
      + 'la chaudière se verse lentement sur l’œil, 30 minutes au moins.',
  };
};
