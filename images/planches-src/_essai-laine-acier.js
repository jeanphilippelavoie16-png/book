// Feuille d'essai : la matière de la laine d'acier (planche 13-10). JP, 19 octobre 2026, sur les vignettes « Préparer la
// laine » et « Toucher avec la pile de 9 V » : « la laine d'acier, on dirait du poil de pubis ». Les boucles et les
// frisettes serrées étaient le défaut.
//
// La laine d'acier fine, en vrai (photos de référence : Wikimedia Commons, « Steel-wool-detail.jpg » et « Steel wool.jpg ») :
// un tampon de fibres de métal très fines, longues et presque droites, à peine ondulées, couchées en couches selon deux
// ou trois directions dominantes, avec des bouts de fils droits qui dépassent du contour. Étirée en boule lâche : un nuage
// aéré de fils fins et droits, plus serré au centre (l'épaisseur de la boule), avec du jour au travers.
//
// Trois façons, chacune en tampon et en boule lâche à la taille de la planche, puis la boule à la loupe (× 2) :
//   A  fils droits : chaque fil est une corde de la silhouette, presque droite, dans une des directions dominantes ;
//      aucun contour, la silhouette naît des bouts des fils.
//   B  couches : des nappes de fils presque parallèles, chacune sur une partie de la boule, qui se recouvrent et se croisent.
//   C  bord en fils : un bord fait de longs fils droits tangents à la silhouette, et des fils droits croisés dedans.
// Le rendu se fait dans le scratchpad (pas dans images/) : voir le rapport de l'agent.

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const FONCE = '#3A3A3A', NOIR = '#1A1A1A', CLAIR = '#CFCFCF';
  const trait = (c, ep) => `fill="none" stroke="${c}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"`;

  // La laine d'acier. o.mode : 'droit' | 'couches' | 'bord' ; o.lache : 0 (tampon) à 1 (boule lâche).
  //   La silhouette : un rond (forme 2) ou un coussin (forme 3 à 4), déformé par quelques ondes lentes.
  //   Les fils : des bouts de fils presque droits (une ondulation de moins de 4 % de leur longueur), couchés selon deux
  //   ou trois directions dominantes ; plus nombreux là où la boule est épaisse (au centre), clairsemés au bord ; quelques
  //   bouts droits dépassent du contour.
  //   Le métal : un voile de fils gris clair (#CFCFCF) sous les fils gris foncé (#3A3A3A) ; le côté de l'ombre, en bas à
  //   droite, prend quelques fils noirs (#1A1A1A) ; quelques fils clairs passent par-dessus du côté de la lumière.
  const laineAcier = (cx, cy, rx, ry, graine, o = {}) => {
    const r = gen(graine * 7919 + 13);
    const lache = o.lache ?? 1, mode = o.mode || 'droit', forme = o.forme || (lache > 0.5 ? 2 : 3.2);
    const dirs = o.dirs || (lache > 0.5 ? [-0.24, 0.18, 0.8] : [0, -0.12, 0.14]);
    const poids = o.poids || (lache > 0.5 ? [0.45, 0.4, 0.15] : [0.6, 0.2, 0.2]);
    const jit = o.jit ?? (lache > 0.5 ? 0.12 : 0.06);
    const amp = o.ondule ?? (lache > 0.5 ? 0.035 : 0.02);
    const ondes = [2, 3, 4, 5].map(k => [k, (lache > 0.5 ? 0.07 : 0.025) / (k - 1) * (0.6 + r() * 0.8), r() * 6.283]);
    const R = th => 1 + ondes.reduce((s, [k, a, p]) => s + a * Math.sin(k * th + p), 0);
    const rho = (x, y) => {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      return Math.pow(Math.pow(Math.abs(dx), forme) + Math.pow(Math.abs(dy), forme), 1 / forme) / R(Math.atan2(dy, dx));
    };
    const dedans = (x, y) => rho(x, y) <= 1;
    const corde = (p, u, lim = dedans) => {
      const t = [0, 0];
      for (const s of [-1, 1]) { let k = 0; while (k < 4 * Math.max(rx, ry) && lim(p[0] + u[0] * k * s, p[1] + u[1] * k * s)) k += 0.75; t[s > 0 ? 1 : 0] = k * s; }
      return t;
    };
    const tireDir = () => { let x = r(), i = 0; while (i < poids.length - 1 && x > poids[i]) { x -= poids[i]; i++; } return dirs[i] + (r() - 0.5) * 2 * jit; };
    // un point dans la laine, plus souvent là où elle est épaisse ; biais vers le bas à droite pour le côté de l'ombre
    const tirePoint = (gam, lim = dedans, bx = cx, by = cy, ex = rx, ey = ry) => {
      for (let essai = 0; essai < 600; essai++) {
        const x = bx + (r() * 2 - 1) * ex * 1.1, y = by + (r() * 2 - 1) * ey * 1.1, q = rho(x, y);
        if (lim(x, y) && r() < Math.pow(Math.sqrt(Math.max(0, 1 - q * q)), gam)) return [x, y];
      }
      return [cx, cy];
    };
    const unFil = (a, b, am = amp) => {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
      const e1 = (r() - 0.5) * 2 * am * L, e2 = (r() - 0.5) * 2 * am * L;
      const c1 = [a[0] + u[0] * L / 3 + n[0] * e1, a[1] + u[1] * L / 3 + n[1] * e1];
      const c2 = [a[0] + u[0] * 2 * L / 3 + n[0] * e2, a[1] + u[1] * 2 * L / 3 + n[1] * e2];
      return `M ${f(a[0])} ${f(a[1])} C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(b[0])} ${f(b[1])} `;
    };
    const tailles = Math.max(rx, ry) / 46;
    const lDepasse = () => (lache > 0.5 ? 4 + r() * 10 : 2 + r() * 5) * tailles;
    // pose un fil de longueur visible L sur la corde qui passe par p ; renvoie sa longueur posée
    const pose = (liste, p, u, L, depasse, lim = dedans) => {
      const [t0, t1] = corde(p, u, lim), C = t1 - t0;
      if (C < 3) return 0;
      L = Math.min(L, C);
      let s0 = Math.max(t0, Math.min(t1 - L, (r() - 0.5) * L - L / 2)), s1 = s0 + L;
      if (depasse) {
        // un bout qui dépasse : vers le haut ou sur le côté quand la laine est posée (rien ne pend dans le nid)
        let bas = r() < 0.5;
        if (o.posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) bas = !bas;
        if (o.posee && p[1] + u[1] * (bas ? t0 - depasse : t1 + depasse) > cy + ry * 0.35) depasse = 0;
        if (bas) s0 = t0 - depasse; else s1 = t1 + depasse;
      }
      const a = [p[0] + u[0] * s0, p[1] + u[1] * s0], b = [p[0] + u[0] * s1, p[1] + u[1] * s1];
      liste.push([unFil(a, b), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
      return s1 - s0;
    };
    const aire = Math.PI * rx * ry;
    const gam = lache > 0.5 ? 1.5 : 0.35;
    const pDep = o.depasse ?? (lache > 0.5 ? 0.12 : 0.07);
    // longueur de fil à poser : le taux de couverture (trait de 0,5) visé, sur l'aire de la silhouette
    const encreFonce = (o.encre ?? (lache > 0.5 ? 0.55 : 0.8)) * aire / 0.5;
    const encreVoile = (o.voile ?? (lache > 0.5 ? 0.4 : 0.3)) * aire / 0.5;
    const longueur = () => (lache > 0.5 ? 0.16 + r() * 0.34 : 0.3 + r() * 0.45) * 2 * rx;

    const fonce = [], voile = [];
    const remplir = (liste, encre, lim = dedans, centre = null) => {
      let tot = 0, garde = 0;
      while (tot < encre && garde++ < 4000) {
        const p = centre ? tirePoint(gam, lim, ...centre) : tirePoint(gam, lim);
        let th = tireDir();
        if (o.enroule) {
          // vers le bord, le fil se couche le long de la silhouette (une boule, pas une galette) ; il reste droit
          const dx = (p[0] - cx) / rx, dy = (p[1] - cy) / ry, q = Math.min(1, rho(p[0], p[1]));
          let tg = Math.atan2(Math.cos(Math.atan2(dy, dx)) * ry, -Math.sin(Math.atan2(dy, dx)) * rx);
          while (tg - th > Math.PI / 2) tg -= Math.PI; while (th - tg > Math.PI / 2) tg += Math.PI;
          const w = o.enroule * q * q;
          th = th * (1 - w) + tg * w;
        }
        const u = [Math.cos(th), Math.sin(th)];
        tot += pose(liste, p, u, longueur(), r() < pDep ? lDepasse() : 0, lim);
      }
    };
    if (mode === 'couches') {
      // des couches : chaque couche est une nappe de fils presque parallèles, sur une partie de la boule ; les nappes se
      // recouvrent et se croisent
      const nC = lache > 0.5 ? 7 : 5;
      for (let i = 0; i < nC; i++) {
        const th0 = dirs[i % dirs.length] + (r() - 0.5) * jit * 2;
        const ccx = cx + (r() - 0.5) * rx * 0.7, ccy = cy + (r() - 0.5) * ry * 0.6, erx = rx * (0.55 + r() * 0.35), ery = ry * (0.45 + r() * 0.35);
        const lim = (x, y) => dedans(x, y) && Math.hypot((x - ccx) / erx, (y - ccy) / ery) <= 1;
        const sauve = [dirs.slice(), jit];
        dirs.splice(0, dirs.length, th0); poids.splice(0, poids.length, 1);
        remplir(fonce, encreFonce / nC * 1.1, lim, [ccx, ccy, erx, ery]);
        dirs.splice(0, dirs.length, ...sauve[0]);
        poids.splice(0, poids.length, ...(o.poids || (lache > 0.5 ? [0.45, 0.4, 0.15] : [0.6, 0.2, 0.2])));
      }
      remplir(voile, encreVoile);
    } else {
      remplir(fonce, mode === 'bord' ? encreFonce * 0.8 : encreFonce);
      remplir(voile, encreVoile);
      if (mode === 'bord') {
        // le bord : de longs fils droits presque tangents à la silhouette, à des rayons un peu différents
        const m = Math.round(14 + 12 * lache);
        for (let i = 0; i < m; i++) {
          const th = (i + r() * 0.8) / m * 2 * Math.PI, Rt = R(th) * (0.84 + r() * 0.14);
          const p = [cx + Math.cos(th) * rx * Rt, cy + Math.sin(th) * ry * Rt];
          const tg = [-Math.sin(th) * rx, Math.cos(th) * ry], lt = Math.hypot(...tg), u = [tg[0] / lt, tg[1] / lt];
          const L = (0.5 + r() * 0.6) * 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2) / m * 1.8;
          fonce.push([unFil([p[0] - u[0] * L / 2, p[1] - u[1] * L / 2], [p[0] + u[0] * L / 2, p[1] + u[1] * L / 2], 0.02), p[0], p[1]]);
        }
      }
    }

    // le métal : la lumière vient d'en haut à gauche
    let dFonce = '', dNoir = '', dClair = '', dVoile = '';
    for (const [d, mx, my] of fonce) {
      const lum = -((mx - cx) / rx + (my - cy) / ry) * 0.7;
      if (lum > 0.2 && r() < 0.22) dClair += d;
      else if (lum < -0.25 && r() < 0.4) dNoir += d;
      else dFonce += d;
    }
    for (const [d] of voile) dVoile += d;
    const out = [];
    if (o.fond !== false) {
      const pts = [];
      for (let k = 0; k < 64; k++) {
        const th = k / 64 * 2 * Math.PI, c = Math.cos(th), s = Math.sin(th);
        const q = R(th) * 0.84 / Math.pow(Math.pow(Math.abs(c), forme) + Math.pow(Math.abs(s), forme), 1 / forme);
        pts.push([cx + c * rx * q, cy + s * ry * q]);
      }
      out.push(h.chemin(pts, h.a.blanc, true));
    }
    if (dVoile) out.push(h.path(dVoile, trait(CLAIR, 0.5)));
    if (dFonce) out.push(h.path(dFonce, trait(FONCE, 0.5)));
    if (dNoir) out.push(h.path(dNoir, trait(NOIR, 0.5)));
    if (dClair) out.push(h.path(dClair, trait(CLAIR, 0.7)));
    return out.join('\n');
  };

  // Le nid de la planche, en plus simple : un tas d'herbe sèche, pour juger la laine posée dessus.
  const nid = (cx, yG, w, H) => {
    const r = gen(5), pts = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16, bosse = Math.min(1, 1.55 * Math.pow(Math.sin(Math.PI * t), 0.8));
      pts.push([cx - w / 2 + w * t, yG - H * bosse]);
    }
    let brins = '';
    for (let i = 0; i < Math.round(w * H / 70); i++) {
      const t = 0.08 + r() * 0.84, x = cx - w / 2 + w * t;
      const top = yG - H * Math.min(1, 1.55 * Math.pow(Math.sin(Math.PI * t), 0.8));
      const y = top + 10 + r() * (yG - top - 12);
      if (y > yG - 3) continue;
      const L = 7 + r() * 9, o = (r() - 0.5) * 0.9;
      brins += `M ${f(x - Math.cos(o) * L / 2)} ${f(y - Math.sin(o) * L / 2)} Q ${f(x)} ${f(y + (r() - 0.5) * 5)} ${f(x + Math.cos(o) * L / 2)} ${f(y + Math.sin(o) * L / 2)} `;
    }
    return [h.chemin(pts, 'fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"', true), h.path(brins, h.a.fin), h.ligne(cx - w / 2 - 10, yG, cx + w / 2 + 10, yG, h.a.arete)].join('\n');
  };

  const MODES = { A: 'droit', B: 'couches', C: 'bord', D: 'droit' };
  const vues = {};
  const disposition = [];
  for (const [lettre, mode] of Object.entries(MODES)) {
    vues[`tampon${lettre}`] = {
      titre: `${lettre}, tampon`,
      dessin: z => laineAcier(z.l / 2, z.h / 2, 38, 20, 4, { mode, lache: 0, enroule: lettre === 'D' ? 0.5 : 0 }),
    };
    vues[`boule${lettre}`] = {
      titre: `${lettre}, boule sur le nid`,
      dessin: z => [nid(z.l / 2, z.h - 6, 150, 46), laineAcier(z.l / 2, z.h - 6 - 46 - 14, 46, 30, 7, { mode, lache: 1, posee: true, enroule: lettre === 'D' ? 0.7 : 0 })].join('\n'),
    };
    vues[`loupe${lettre}`] = {
      titre: `${lettre}, la boule à la loupe`,
      dessin: z => `<clipPath id="loupe-${lettre}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath><g clip-path="url(#loupe-${lettre})"><g transform="translate(${f(z.l / 2)} ${f(z.h / 2)}) scale(2) translate(-60 -40)">${laineAcier(60, 40, 46, 30, 7, { mode, lache: 1, enroule: lettre === 'D' ? 0.7 : 0 })}</g></g>`,
    };
    disposition.push([`tampon${lettre}`, `boule${lettre}`, `loupe${lettre}`]);
  }

  return {
    ref: '13-10',
    fichier: '_essai-laine-acier.svg',
    titre: 'Essai, la laine d’acier',
    desc: 'Trois façons de dessiner la laine d’acier fine : fils droits, couches, bord en fils. Chacune en tampon et en boule lâche sur le nid, à la taille de la planche 13-10, puis la boule à la loupe.',
    format: 'pleine',
    disposition,
    largeurs: disposition.map(() => [0.8, 1, 1.3]),
    vues,
  };
};
