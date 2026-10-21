// _laine-acier.js — la laine d'acier fine, telle que la planche 13-10 la pose (repères 1, 2, 5, 7), et telle que la
// feuille d'essai _essai-laine-acier.js la montre (façon D, retenue).
//
// JP, 19 octobre 2026, sur la première version en petites boucles : « la laine d'acier, on dirait du poil de pubis ».
// En vrai (photos de référence : Wikimedia Commons, « Steel-wool-detail.jpg » et « Steel wool.jpg »), la laine d'acier
// fine, c'est un tampon de fibres de métal très fines, longues et presque droites, couchées en couches selon deux ou
// trois directions ; étirée en boule lâche, un nuage aéré de fils droits, avec du jour au travers.
//
// La façon retenue (D), avec les corrections des deux seconds regards du 19 octobre :
//   la silhouette : un rond (boule) ou un coussin (tampon), déformé par quelques ondes lentes ;
//   les fils : des fils longs presque droits (une seule courbe à peine marquée, 2,5 % de leur longueur au plus, sans
//     inflexion), couchés selon deux directions dominantes et une troisième discrète ; dans la boule, chaque fil fait
//     entre le quart et 48 % de la largeur de la boule, penché de 30° au plus (des bouts courts et raides se lisaient
//     comme de la paille, des brindilles ou du mikado ; de longues règles qui traversaient la boule, comme des
//     aiguilles de pin) ;
//   le dessus de la boule : les fils du haut se couchent le long du galbe (30° au plus), ce qui fait le dôme ;
//   la couronne de la boule : 8 % des fils, couchés le long du galbe (35° au plus), avec une très légère courbe qui le
//     suit (une flèche de 3 % de leur longueur au plus, le creux vers le centre) ; la rondeur vient d'eux, du dôme, de
//     la densité qui baisse vers le bord et du voile gris clair ; une boule posée dans le nid n'en a pas dans le bas ;
//   les bouts : un bout de fil s'arrête, au hasard, entre 0 et 15 % de la longueur avant le contour (des fils calés sur
//     le contour faisaient un bout coupé net, comme un fagot ou une brosse) ; dans la boule, chaque fil foncé s'effile :
//     ses deux bouts passent au gris clair (environ le cinquième de la longueur de chaque côté), comme le trait d'un
//     encreur qui s'amincit (skill encrage, point 8), ce qui ôte les bouts noirs coupés net ; seuls les bouts qui
//     dépassent passent le contour, de 8 unités au plus, sur un fil couché ; une boule posée dans le nid ne laisse
//     rien pendre ;
//   le tampon : plus dense au milieu (aucun jour de plus de 2 unités dans sa partie centrale), et fermé à ses quatre
//     coins par quelques fils qui suivent l'arrondi, du dessus ou du dessous vers le bout ;
//   le métal : un voile de fils gris clair sous les fils gris foncé ; quelques fils noirs du côté de l'ombre, en bas à
//     droite ; quelques fils clairs par-dessus du côté de la lumière, en haut à gauche.
//
//   const laine = require('./_laine-acier.js')(h);
//   laine(cx, cy, rx, ry, graine, { lache, posee, stats })
//     lache  0 (le tampon) à 1 (la boule lâche) ; posee : rien ne pend sous la boule (elle est dans le nid) ;
//     stats  un objet qu'on remplit pour contrôler la matière : stats.liste donne chaque fil entier (sa longueur, sa
//            pente, sa flèche, son dépassement, sa sorte : long, couronne ou coin), avant l'effilage.
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
  // Un fil de a à b, en cubique : une seule courbe, sans inflexion. « fleche » est l'écart du milieu du fil à la droite
  // ab, du côté de la normale (un nombre négatif le met de l'autre côté). Les deux points de contrôle sont à 1/3 et 2/3,
  // décalés de e : le milieu de la courbe est alors à 0,75 e.
  const bez = (a, b, fleche) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const e = fleche / 0.75;
    return [a, [a[0] + u[0] * L / 3 + n[0] * e, a[1] + u[1] * L / 3 + n[1] * e],
      [a[0] + u[0] * 2 * L / 3 + n[0] * e, a[1] + u[1] * 2 * L / 3 + n[1] * e], b];
  };
  const dBez = q => `M ${f(q[0][0])} ${f(q[0][1])} C ${f(q[1][0])} ${f(q[1][1])} ${f(q[2][0])} ${f(q[2][1])} ${f(q[3][0])} ${f(q[3][1])} `;
  // la cubique q coupée en t (de Casteljau) : les deux morceaux, qui suivent exactement la courbe
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const coupe = (q, t) => {
    const a = lerp(q[0], q[1], t), b = lerp(q[1], q[2], t), c = lerp(q[2], q[3], t), d = lerp(a, b, t), e = lerp(b, c, t), m = lerp(d, e, t);
    return [[q[0], a, d, m], [m, e, c, q[3]]];
  };

  return (cx, cy, rx, ry, graine, { lache = 1, posee = false, stats = null } = {}) => {
    const r = gen(graine * 7919 + 13), boule = lache > 0.5;
    const forme = boule ? 2 : 3.2, W = 2 * rx;
    const dirs = boule ? [-0.3, 0.22, 0.45] : [0, -0.12, 0.14], poids = boule ? [0.46, 0.44, 0.1] : [0.6, 0.2, 0.2];
    const jit = boule ? 0.15 : 0.06;
    const PENTE = boule ? 0.5 : 0.6;          // l'inclinaison d'un fil long, au plus, en radians (0,5 : 29°)
    const PCOURONNE = 0.6;                    // l'inclinaison d'un fil de couronne, au plus (0,6 : 34°)
    const LMIN = 0.25 * W;                    // la longueur d'un fil, au moins : le quart de la largeur
    const LMAX = boule ? 0.48 * W : 0.75 * W; // et au plus
    const RETRAIT = 0.15;                     // un bout s'arrête entre 0 et 15 % de la longueur avant le contour
    const COURONNE = 0.08;                    // la part des fils de couronne, dans la boule
    const DOME = 0.9;                         // les fils du haut de la boule suivent le galbe
    const ONDE = 0.025;                       // la flèche d'un fil long, au plus, sur sa longueur
    const EFFILE = 0.18;                      // la part de chaque bout d'un fil foncé qui passe au gris clair (moyenne)
    const ondes = [2, 3, 4, 5].map(k => [k, (boule ? 0.07 : 0.025) / (k - 1) * (0.6 + r() * 0.8), r() * 6.283]);
    const R = th => 1 + ondes.reduce((s, [k, a, p]) => s + a * Math.sin(k * th + p), 0);
    const rho = (x, y) => {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      return Math.pow(Math.pow(Math.abs(dx), forme) + Math.pow(Math.abs(dy), forme), 1 / forme) / R(Math.atan2(dy, dx));
    };
    const dedans = (x, y) => rho(x, y) <= 1;
    // le point à k fois le contour, dans la direction polaire th (pour les fils qui suivent l'arrondi)
    const surContour = (th, k) => {
      const c = Math.cos(th), s = Math.sin(th);
      const q = k * R(th) / Math.pow(Math.pow(Math.abs(c), forme) + Math.pow(Math.abs(s), forme), 1 / forme);
      return [cx + c * rx * q, cy + s * ry * q];
    };
    const corde = (p, u) => {
      const t = [0, 0];
      for (const s of [-1, 1]) { let k = 0; while (k < 4 * Math.max(rx, ry) && dedans(p[0] + u[0] * k * s, p[1] + u[1] * k * s)) k += 0.5; t[s > 0 ? 1 : 0] = k * s; }
      return t;
    };
    const tireDir = () => {
      let x = r(), i = 0;
      while (i < poids.length - 1 && x > poids[i]) { x -= poids[i]; i++; }
      return Math.max(-PENTE, Math.min(PENTE, dirs[i] + (r() - 0.5) * 2 * jit));
    };
    // un point dans la laine, plus souvent là où elle est épaisse (gam : plus il est fort, plus le centre est chargé)
    const tirePoint = gam => {
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
    const lDepasse = () => (boule ? 3 + r() * 5 : 2 + r() * 4) * Math.min(1, Math.max(0.7, Math.max(rx, ry) / 46));
    // Un fil de longueur L sur la corde de la silhouette qui passe par p, dans la direction th. Chaque bout s'arrête au
    // hasard entre 0 et 15 % de L avant le contour ; si ce qui reste est plus court que LMIN, le fil n'est pas posé (pas
    // de bout court sur un flanc). Un fil qui dépasse finit à « depasse » hors de la silhouette, d'un seul bout, et
    // garde sa longueur L. Un fil de couronne bombe vers l'extérieur : son creux est tourné vers le centre.
    const pose = (liste, p, th, L, depasse, sorte) => {
      const u = [Math.cos(th), Math.sin(th)], n = [-u[1], u[0]];
      const [t0, t1] = corde(p, u);
      const a0 = t0 + r() * RETRAIT * L, a1 = t1 - r() * RETRAIT * L;
      if (a1 - a0 < LMIN) return 0;
      L = Math.min(L, a1 - a0, LMAX);
      let s0 = Math.max(a0, Math.min(a1 - L, (r() - 0.5) * L - L / 2)), s1 = s0 + L;
      if (depasse && sorte === 'long') {
        let bas = r() < 0.5;
        if (posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) bas = !bas;
        if (posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) depasse = 0;
        if (depasse && bas) { s0 = t0 - depasse; s1 = s0 + L; }
        else if (depasse) { s1 = t1 + depasse; s0 = s1 - L; }
      } else depasse = 0;
      const a = [p[0] + u[0] * s0, p[1] + u[1] * s0], b = [p[0] + u[0] * s1, p[1] + u[1] * s1];
      let fleche;
      if (sorte === 'couronne') {
        const m = [(a[0] + b[0]) / 2 - cx, (a[1] + b[1]) / 2 - cy];
        fleche = (0.012 + r() * 0.018) * L * (n[0] * m[0] + n[1] * m[1] > 0 ? 1 : -1);
      } else fleche = (r() - 0.5) * 2 * ONDE * L;
      liste.push({ q: bez(a, b, fleche), a, b, th: plie(th), L, depasse, sorte, fleche: Math.abs(fleche) });
      return L;
    };
    const aire = Math.PI * rx * ry, pDep = boule ? 0.12 : 0.07;
    const longueur = () => (boule ? LMIN + r() * (LMAX - LMIN) : (0.3 + r() * 0.45) * W);
    // les fils longs ; dans la boule, ceux du haut se couchent le long du galbe (le dôme), et ceux du bas aussi quand
    // la boule n'est pas posée
    const remplir = (liste, encre, gam) => {
      let tot = 0, garde = 0;
      while (tot < encre && garde++ < 20000) {
        const p = tirePoint(gam);
        let th = tireDir();
        if (boule && !(posee && p[1] > cy)) {
          const dy = (p[1] - cy) / ry;
          th = Math.max(-PENTE, Math.min(PENTE, th + (plie(tangente(p, th)) - th) * DOME * dy * dy));
        }
        tot += pose(liste, p, th, longueur(), r() < pDep ? lDepasse() : 0, 'long');
      }
    };
    // la couronne de la boule : des fils couchés le long du galbe, là où il penche de 35° au plus (le dessus et le
    // dessous), à q0 à q1 du contour ; une boule posée n'en a pas dans le bas, qui est dans le nid
    const couronne = (liste, nb, q0, q1) => {
      let k = 0, garde = 0;
      while (k < nb && garde++ < 4000) {
        const x = cx + (r() * 2 - 1) * rx, y = cy + (r() * 2 - 1) * ry, q = rho(x, y);
        if (q < q0 || q > q1 || (posee && y > cy + ry * 0.3)) continue;
        const tg = plie(tangente([x, y], 0));
        if (Math.abs(tg) > PCOURONNE) continue;
        if (pose(liste, [x, y], tg, LMIN + r() * (LMAX * 0.85 - LMIN), 0, 'couronne')) k++;
      }
    };
    // les quatre coins du tampon : des fils qui suivent l'arrondi, du dessus (ou du dessous) vers le bout, à 82 à 96 %
    // du contour, deux ou trois par bout ; ils ne descendent pas le long du bout (ce serait une parenthèse)
    const coinsTampon = liste => {
      for (const cote of [0, Math.PI]) {
        const m = 2 + Math.floor(r() * 2);
        for (let i = 0; i < m; i++) {
          const k = 0.82 + r() * 0.14, ouverture = 0.5 + r() * 0.3, sens = (i % 2 ? 1 : -1) * (cote ? -1 : 1);
          const debut = cote + sens * (0.8 + r() * 0.4), fin = debut - sens * ouverture;
          const pts = [];
          for (let j = 0; j <= 10; j++) pts.push(surContour(debut + (fin - debut) * j / 10, k));
          let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`, L = 0;
          for (let j = 1; j < pts.length; j++) {
            const p0 = pts[Math.max(0, j - 2)], p1 = pts[j - 1], p2 = pts[j], p3 = pts[Math.min(pts.length - 1, j + 1)];
            d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
            L += Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
          }
          liste.push({ d: d + ' ', a: pts[0], b: pts[pts.length - 1], th: 0, L, depasse: 0, sorte: 'coin', fleche: 0 });
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
        pose(liste, pts[iMax], tireDir(), longueur(), 0, 'long');
        if (liste.length === n0) { dmin[iMax] = 0; continue; }
        const s = liste[liste.length - 1];
        pts.forEach((p, i) => { dmin[i] = Math.min(dmin[i], distSeg(p, s.a, s.b)); });
      }
    };
    const fonce = [], voile = [];
    if (boule) {
      remplir(fonce, 0.42 * aire / 0.5, 1.2);
      boucher(fonce, 0.45, 3);
      couronne(fonce, Math.round(fonce.length * COURONNE / (1 - COURONNE)), 0.72, 0.94);
      remplir(voile, 0.24 * aire / 0.5, 0.3);     // le voile va plus loin vers le bord : c'est lui qui donne le rond
      couronne(voile, Math.round(voile.length * COURONNE / (1 - COURONNE)), 0.72, 0.94);
    } else {
      remplir(fonce, 0.8 * aire / 0.5, 0.35);
      boucher(fonce, 0.7, 1);
      coinsTampon(fonce);
      remplir(voile, 0.3 * aire / 0.5, 0.35);
    }
    if (stats) {
      const tous = [...fonce.map(s => ({ ...s, couche: 'fonce' })), ...voile.map(s => ({ ...s, couche: 'voile' }))];
      Object.assign(stats, {
        fils: tous.length, largeur: W,
        liste: tous.map(s => ({ L: s.L, th: s.th, depasse: s.depasse, fleche: s.fleche, couche: s.couche, sorte: s.sorte })),
      });
    }
    // le métal, la lumière venant d'en haut à gauche : quelques fils clairs du côté de la lumière, quelques fils noirs
    // du côté de l'ombre ; dans la boule, chaque fil foncé s'effile (ses deux bouts au gris clair)
    let dFonce = '', dNoir = '', dClair = '', dVoile = '';
    for (const s of fonce) {
      const mx = (s.a[0] + s.b[0]) / 2, my = (s.a[1] + s.b[1]) / 2;
      const lum = -((mx - cx) / rx + (my - cy) / ry) * 0.7;
      let d = s.d || dBez(s.q);
      if (boule && s.q) {
        const ta = EFFILE * (0.6 + r() * 0.8), tb = 1 - EFFILE * (0.6 + r() * 0.8);
        const [debut, reste] = coupe(s.q, ta), [milieu, fin] = coupe(reste, (tb - ta) / (1 - ta));
        dVoile += dBez(debut) + dBez(fin);
        d = dBez(milieu);
      }
      if (lum > 0.2 && r() < 0.22) dClair += d;
      else if (lum < -0.25 && r() < 0.4) dNoir += d;
      else dFonce += d;
    }
    for (const s of voile) dVoile += s.d || dBez(s.q);
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
