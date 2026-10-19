// _laine-acier.js — la laine d'acier fine, telle que la planche 13-10 la pose (repères 1, 2, 5, 7), et telle que la
// feuille d'essai _essai-laine-acier.js la montre (façon D, retenue).
//
// JP, 19 octobre 2026, sur la première version en petites boucles : « la laine d'acier, on dirait du poil de pubis ».
// En vrai (photos de référence : Wikimedia Commons, « Steel-wool-detail.jpg » et « Steel wool.jpg »), la laine d'acier
// fine, c'est un tampon de fibres de métal très fines, longues et presque droites, couchées en couches selon deux ou
// trois directions ; étirée en boule lâche, un nuage aéré de fils droits, avec du jour au travers.
//
// La façon retenue (D), avec les corrections du second regard du 19 octobre :
//   la silhouette : un rond (boule) ou un coussin (tampon), déformé par quelques ondes lentes ;
//   les fils longs : des bouts de fils presque droits (une ondulation de moins de 4 % de leur longueur), couchés selon
//     deux directions dominantes et une troisième discrète (0,45 rad, poids 0,1) ; dans la boule, jamais plus de
//     30° d'inclinaison, et jamais plus longs que la moitié de la largeur de la boule (de longues règles qui traversent
//     la boule se lisaient comme de la paille ou des aiguilles de pin) ;
//   les flancs : de petits fils (14 unités au plus) qui se couchent le long de la silhouette ; c'est eux, avec la
//     densité plus forte au centre et le voile, qui font la rondeur (des bâtons raides sur les flancs faisaient un nid
//     de brindilles ou du mikado) ;
//   les bouts qui dépassent : 8 unités au plus, jamais sur un fil incliné de plus de 45° ; une boule posée dans le nid
//     ne laisse rien pendre ;
//   le tampon est plus dense au milieu : aucun jour de plus de 2 unités dans sa partie centrale (une fente blanche au
//     milieu le faisait lire comme un pain fendu ou un œil) ;
//   le métal : un voile de fils gris clair sous les fils gris foncé ; quelques fils noirs du côté de l'ombre, en bas à
//     droite ; quelques fils clairs par-dessus du côté de la lumière, en haut à gauche.
//
//   const laine = require('./_laine-acier.js')(h);
//   laine(cx, cy, rx, ry, graine, { lache, posee, stats })
//     lache  0 (le tampon) à 1 (la boule lâche) ; posee : rien ne pend sous la boule (elle est dans le nid) ;
//     stats  un objet qu'on remplit pour contrôler la matière (nombre de fils, inclinaisons, longueurs, dépassements).
'use strict';

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const NOIR = '#1A1A1A', FONCE = '#3A3A3A', CLAIR = '#CFCFCF';
  const fibre = (c, ep) => `fill="none" stroke="${c}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;
  // un angle de fil ramené dans ]-π/2, π/2] (un fil n'a pas de sens)
  const plie = a => { while (a > Math.PI / 2) a -= Math.PI; while (a <= -Math.PI / 2) a += Math.PI; return a; };
  const distSeg = (p, a, b) => {
    const vx = b[0] - a[0], vy = b[1] - a[1], l2 = vx * vx + vy * vy;
    const t = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / l2)) : 0;
    return Math.hypot(p[0] - a[0] - vx * t, p[1] - a[1] - vy * t);
  };

  return (cx, cy, rx, ry, graine, { lache = 1, posee = false, stats = null } = {}) => {
    const r = gen(graine * 7919 + 13), boule = lache > 0.5;
    const forme = boule ? 2 : 3.2;
    const dirs = boule ? [-0.3, 0.22, 0.45] : [0, -0.12, 0.14], poids = boule ? [0.46, 0.44, 0.1] : [0.6, 0.2, 0.2];
    const jit = boule ? 0.15 : 0.06, amp = boule ? 0.035 : 0.02, gam = boule ? 1.5 : 0.35;
    const PENTE = boule ? 0.5 : 0.6;          // l'inclinaison d'un fil long, en radians (0,5 : 29°)
    const COURT = 14;                         // un petit fil de flanc, au plus
    const LMAX = boule ? 0.48 * 2 * rx : 0.75 * 2 * rx;   // la longueur visible d'un fil, au plus
    const ondes = [2, 3, 4, 5].map(k => [k, (boule ? 0.07 : 0.025) / (k - 1) * (0.6 + r() * 0.8), r() * 6.283]);
    const R = th => 1 + ondes.reduce((s, [k, a, p]) => s + a * Math.sin(k * th + p), 0);
    const rho = (x, y) => {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      return Math.pow(Math.pow(Math.abs(dx), forme) + Math.pow(Math.abs(dy), forme), 1 / forme) / R(Math.atan2(dy, dx));
    };
    const dedans = (x, y) => rho(x, y) <= 1;
    const corde = (p, u) => {
      const t = [0, 0];
      for (const s of [-1, 1]) { let k = 0; while (k < 4 * Math.max(rx, ry) && dedans(p[0] + u[0] * k * s, p[1] + u[1] * k * s)) k += 0.75; t[s > 0 ? 1 : 0] = k * s; }
      return t;
    };
    const tireDir = () => {
      let x = r(), i = 0;
      while (i < poids.length - 1 && x > poids[i]) { x -= poids[i]; i++; }
      return Math.max(-PENTE, Math.min(PENTE, dirs[i] + (r() - 0.5) * 2 * jit));
    };
    const tirePoint = () => {
      for (let essai = 0; essai < 600; essai++) {
        const x = cx + (r() * 2 - 1) * rx * 1.1, y = cy + (r() * 2 - 1) * ry * 1.1, q = rho(x, y);
        if (q <= 1 && r() < Math.pow(Math.sqrt(Math.max(0, 1 - q * q)), gam)) return [x, y];
      }
      return [cx, cy];
    };
    // la tangente à la silhouette au droit du point p, ramenée près de l'angle th
    const tangente = (p, th) => {
      const a = Math.atan2((p[1] - cy) / ry, (p[0] - cx) / rx);
      let tg = Math.atan2(Math.cos(a) * ry, -Math.sin(a) * rx);
      while (tg - th > Math.PI / 2) tg -= Math.PI;
      while (th - tg > Math.PI / 2) tg += Math.PI;
      return tg;
    };
    const unFil = (a, b) => {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
      const e1 = (r() - 0.5) * 2 * amp * L, e2 = (r() - 0.5) * 2 * amp * L;
      const c1 = [a[0] + u[0] * L / 3 + n[0] * e1, a[1] + u[1] * L / 3 + n[1] * e1];
      const c2 = [a[0] + u[0] * 2 * L / 3 + n[0] * e2, a[1] + u[1] * 2 * L / 3 + n[1] * e2];
      return `M ${f(a[0])} ${f(a[1])} C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(b[0])} ${f(b[1])} `;
    };
    const lDepasse = () => (boule ? 3 + r() * 5 : 2 + r() * 4) * Math.min(1, Math.max(0.7, Math.max(rx, ry) / 46));
    // un fil de longueur visible L sur la corde de la silhouette qui passe par p ; rend la longueur posée.
    // Un fil qui dépasse finit à « depasse » hors de la silhouette, et garde sa longueur L (il ne s'étire pas jusqu'au
    // bout de la corde).
    const pose = (liste, p, th, L, depasse) => {
      const u = [Math.cos(th), Math.sin(th)];
      const [t0, t1] = corde(p, u), C = t1 - t0;
      if (C < 3) return 0;
      L = Math.min(L, C, LMAX);
      let s0 = Math.max(t0, Math.min(t1 - L, (r() - 0.5) * L - L / 2)), s1 = s0 + L;
      if (depasse && Math.abs(plie(th)) <= Math.PI / 4) {
        let bas = r() < 0.5;
        if (posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) bas = !bas;
        if (posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) depasse = 0;
        if (depasse && bas) { s0 = t0 - depasse; s1 = s0 + L; }
        else if (depasse) { s1 = t1 + depasse; s0 = s1 - L; }
      } else depasse = 0;
      const a = [p[0] + u[0] * s0, p[1] + u[1] * s0], b = [p[0] + u[0] * s1, p[1] + u[1] * s1];
      liste.push({ d: unFil(a, b), a, b, th: plie(th), L, depasse });
      return L;
    };
    const aire = Math.PI * rx * ry, pDep = boule ? 0.12 : 0.07;
    const longueur = () => (boule ? 0.16 + r() * 0.32 : 0.3 + r() * 0.45) * 2 * rx;
    const remplir = (liste, encre) => {
      let tot = 0, garde = 0;
      while (tot < encre && garde++ < 4000) {
        const p = tirePoint(), q = Math.min(1, rho(p[0], p[1]));
        let th = tireDir();
        if (boule && r() < 0.85 * q * q) {
          // un petit fil de flanc, couché le long de la silhouette
          th += (tangente(p, th) - th) * 0.8 * q * q;
          th = Math.max(-1, Math.min(1, plie(th)));      // couché, jamais debout : 57° au plus
          tot += pose(liste, p, th, 6 + r() * (COURT - 6), 0);
        } else {
          if (!boule) th += (tangente(p, th) - th) * 0.25 * q * q;
          tot += pose(liste, p, th, longueur(), r() < pDep ? lDepasse() : 0);
        }
      }
    };
    // boucher les jours du milieu : tant qu'un point de la partie centrale (rho <= zone) est à plus de « seuil » du fil
    // le plus proche, on pose un fil long qui passe par lui
    const boucher = (liste, zone, seuil) => {
      const pts = [];
      for (let y = cy - ry; y <= cy + ry; y += 1) for (let x = cx - rx; x <= cx + rx; x += 1) if (rho(x, y) <= zone) pts.push([x, y]);
      const dmin = pts.map(p => liste.reduce((m, s) => Math.min(m, distSeg(p, s.a, s.b)), Infinity));
      for (let tour = 0; tour < 400; tour++) {
        let iMax = -1, vMax = seuil;
        dmin.forEach((v, i) => { if (v > vMax) { vMax = v; iMax = i; } });
        if (iMax < 0) break;
        const n0 = liste.length;
        pose(liste, pts[iMax], tireDir(), longueur(), 0);
        if (liste.length === n0) { dmin[iMax] = 0; continue; }
        const s = liste[liste.length - 1];
        pts.forEach((p, i) => { dmin[i] = Math.min(dmin[i], distSeg(p, s.a, s.b)); });
      }
    };
    const fonce = [], voile = [];
    remplir(fonce, (boule ? 0.45 : 0.8) * aire / 0.5);
    if (boule) boucher(fonce, 0.45, 3); else boucher(fonce, 0.7, 1);
    remplir(voile, (boule ? 0.35 : 0.3) * aire / 0.5);
    let dFonce = '', dNoir = '', dClair = '', dVoile = '';
    for (const s of fonce) {
      const mx = (s.a[0] + s.b[0]) / 2, my = (s.a[1] + s.b[1]) / 2;
      const lum = -((mx - cx) / rx + (my - cy) / ry) * 0.7;   // > 0 vers le haut à gauche, d'où vient la lumière
      if (lum > 0.2 && r() < 0.22) dClair += s.d;
      else if (lum < -0.25 && r() < 0.4) dNoir += s.d;
      else dFonce += s.d;
    }
    for (const s of voile) dVoile += s.d;
    if (stats) {
      const tous = [...fonce, ...voile], deg = 180 / Math.PI;
      Object.assign(stats, {
        fils: tous.length, largeur: 2 * rx,
        lmax: Math.max(...tous.map(s => s.L)),
        incl30: tous.filter(s => Math.abs(s.th) * deg > 30).length / tous.length,
        incl30long: tous.filter(s => s.L > COURT + 0.5 && Math.abs(s.th) * deg > 30.5).length,
        depmax: Math.max(0, ...tous.map(s => s.depasse)),
        depIncl: Math.max(0, ...tous.filter(s => s.depasse).map(s => Math.abs(s.th) * deg)),
      });
    }
    // le blanc sous la laine : il cache ce qui est derrière, un peu en retrait des bouts de fils
    const pts = [];
    for (let k = 0; k < 64; k++) {
      const th = k / 64 * 2 * Math.PI, c = Math.cos(th), s = Math.sin(th);
      const q = R(th) * 0.84 / Math.pow(Math.pow(Math.abs(c), forme) + Math.pow(Math.abs(s), forme), 1 / forme);
      pts.push([cx + c * rx * q, cy + s * ry * q]);
    }
    return [h.chemin(pts, h.a.blanc, true), h.path(dVoile, fibre(CLAIR, 0.5)), h.path(dFonce, fibre(FONCE, 0.5)),
      h.path(dNoir, fibre(NOIR, 0.5)), h.path(dClair, fibre(CLAIR, 0.7))].join('\n');
  };
};
