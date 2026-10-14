// Planche 13-40 — le ferrocérium jusqu'à la flamme, à refaire : les quatre tas triés du plus fin
// au plus gros ; le geste (pointe de la tige au bord du nid, dos du couteau immobile en travers de
// la tige, tige tirée vers soi, gerbe dans le creux) ; la boule refermée, tenue par le bas à une
// longueur d'avant-bras du visage et soufflée ; le nid en flammes glissé sous le tipi.
// Mains et tête : bibliothèque h.formes (prise/dos pour la tige et le couteau, boule/profil pour
// le nid) ; le buste qui souffle est le corps simple de profil (13 oct.). Seuls les objets sont dessinés ici.
// Aucune cote : les calibres (sous 2 cm, 2 à 5 cm, moins de 15 cm) sont des bornes de tri, pas
// des mesures de construction ; ils vont dans la légende, tels que le chapitre les donne.

module.exports = (h) => {
  const A = h.a, FM = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];

  // Courbe lisse (Catmull-Rom) passant par chaque point.
  const lisse = (pts, ferme) => {
    const n = pts.length;
    const p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
    const segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Point dans un repère local : origine o, axes a et b.
  const P = (o, a, b, s, t = 0) => [o[0] + a[0] * s + b[0] * t, o[1] + a[1] * s + b[1] * t];
  const perp = a => [-a[1], a[0]];
  // Un cylindre vu de côté, le long de a, de s0 à s1, de rayon r.
  const tronc = (o, a, s0, s1, r, at) => {
    const b = perp(a);
    return h.chemin([P(o, a, b, s0, -r), P(o, a, b, s1, -r), P(o, a, b, s1, r), P(o, a, b, s0, r)], at, true);
  };

  // ── Une touffe de fibres : contour ébouriffé, brins fins dedans, mèches qui dépassent ──
  const touffe = (cx, cy, rx, ry, graine, sol) => {
    const r = gen(graine), out = [], pts = [], n = 26;
    for (let k = 0; k < n; k++) {
      const a = k / n * 2 * Math.PI;
      const j = 0.88 + r() * 0.2;
      let x = cx + Math.cos(a) * rx * j, y = cy + Math.sin(a) * ry * j;
      if (sol !== undefined && y > sol) y = sol;
      pts.push([x, y]);
    }
    out.push(h.path(lisse(pts, true), blanc(A.arete)));
    let brins = '';
    for (let i = 0; i < Math.round(rx * ry / 28); i++) {
      const t = Math.sqrt(r()) * 0.78, a = r() * 2 * Math.PI;
      const x = cx + Math.cos(a) * rx * t, y = cy + Math.sin(a) * ry * t;
      if (sol !== undefined && y > sol - 3) continue;
      const L = 7 + r() * 9, o = (r() - 0.5) * 1.2;
      const dx = Math.cos(o) * L, dy = Math.sin(o) * L * 0.5;
      brins += `M ${f(x - dx / 2)} ${f(y - dy / 2)} Q ${f(x)} ${f(y + (r() - 0.5) * 5)} ${f(x + dx / 2)} ${f(y + dy / 2)} `;
    }
    out.push(h.path(brins, A.fin));
    let meches = '';
    pts.forEach(([x, y], k) => {
      if (k % 2 || (sol !== undefined && y >= sol - 1)) return;
      const vx = x - cx, vy = y - cy, L = Math.hypot(vx, vy) || 1;
      const e = 3 + r() * 4, tw = (r() - 0.5) * 6;
      meches += `M ${f(x)} ${f(y)} q ${f(vx / L * e + tw)} ${f(vy / L * e)} ${f(vx / L * e * 1.6 - tw)} ${f(vy / L * e * 1.6 + 1)} `;
    });
    out.push(h.path(meches, A.fin));
    return out.join('\n');
  };

  // ── Vue 1 : les quatre tas ─────────────────────────────────────────────────────────────
  const V = [0.74, -0.24];                          // fuite oblique : la longueur du bois
  const VN = (() => { const L = Math.hypot(...V); return [V[0] / L, V[1] / L]; })();
  const PN = [-VN[1], VN[0]];
  const baton = (cx, cy, r, len, bois = 'rien') => {
    const bx = cx + V[0] * len, by = cy + V[1] * len;
    const t1 = [cx + PN[0] * r, cy + PN[1] * r], t2 = [cx - PN[0] * r, cy - PN[1] * r];
    const out = [h.cercle(bx, by, r, blanc(A.detail))];
    out.push(h.chemin([t1, [t1[0] + V[0] * len, t1[1] + V[1] * len], [t2[0] + V[0] * len, t2[1] + V[1] * len], t2], A.blanc, true));
    out.push(h.ligne(t1[0], t1[1], t1[0] + V[0] * len, t1[1] + V[1] * len, r > 10 ? A.arete : A.detail));
    out.push(h.ligne(t2[0], t2[1], t2[0] + V[0] * len, t2[1] + V[1] * len, r > 10 ? A.arete : A.detail));
    if (bois === 'buche') {
      const r2 = gen(Math.round(cx * 7 + cy));
      let e = '';
      for (let i = 0; i < 9; i++) {
        const s = 0.12 + r2() * 0.8, t = (r2() - 0.5) * 1.6 * r;
        const x = cx + V[0] * len * s + PN[0] * t, y = cy + V[1] * len * s + PN[1] * t;
        const l = 8 + r2() * 10;
        e += `M ${f(x)} ${f(y)} l ${f(VN[0] * l)} ${f(VN[1] * l)} `;
      }
      out.push(h.path(e, A.fin));
    }
    return out;
  };
  const bout = (cx, cy, r, bois) => {
    const out = [h.cercle(cx, cy, r, blanc(r > 10 ? A.arete : A.detail))];
    if (bois === 'buche') {
      out.push(h.cercle(cx, cy, r - 3.2, A.detail));
      out.push(h.cercle(cx + 1, cy - 0.5, r * 0.55, A.fin), h.cercle(cx + 1.5, cy - 1, r * 0.25, A.fin));
      out.push(h.path(`M ${f(cx + 2)} ${f(cy - 1)} L ${f(cx + r * 0.3)} ${f(cy - r * 0.34)} L ${f(cx + r * 0.66)} ${f(cy - r * 0.46)}`, A.fin));
    } else if (bois === 'moyen') {
      out.push(h.cercle(cx + 0.5, cy - 0.3, r * 0.35, A.fin));
    }
    return out;
  };
  const pile = (x0, yS, r, rangs, len, bois, graine) => {
    const rnd = gen(graine), items = [];
    rangs.forEach((nb, j) => {
      const larg = nb * 2 * r;
      const xg = x0 + (rangs[0] * 2 * r - larg) / 2 + r;
      for (let i = 0; i < nb; i++) {
        const jit = bois === 'fin' ? (rnd() - 0.5) * 1.6 : 0;
        items.push({ cx: xg + i * 2 * r + jit, cy: yS - r - j * r * 1.72, r: r * (bois === 'fin' ? 0.85 + rnd() * 0.3 : 1), len: len * (0.85 + rnd() * 0.25) });
      }
    });
    const corps = [], bouts = [];
    items.forEach(it => { corps.push(...baton(it.cx, it.cy, it.r, it.len, bois)); bouts.push(...bout(it.cx, it.cy, it.r, bois)); });
    return { svg: corps.concat(bouts).join('\n'), items };
  };
  // Les quatre tas en colonne, du plus fin au plus gros, tous à la même échelle.
  const tas = z => {
    const sc = Math.min(0.8, (z.l - 40) / 217);
    const hauts = [48, 51, 61, 111].map(v => v * sc);
    const gap = (z.h - 4 - hauts.reduce((a, b) => a + b, 0)) / 4;
    const sols = [];
    let y = 0;
    hauts.forEach(hh => { y += gap + hh; sols.push(y); });
    const x0 = 6, out = [];
    const sol = (yS, l) => out.push(h.ligne(0, yS, x0 + l + 6, yS, A.arete));
    sol(sols[0], 80 * sc);
    out.push(touffe(x0 + 38 * sc, sols[0] - 20 * sc, 38 * sc, 26 * sc, 11, sols[0]));
    const fin = pile(x0, sols[1], 3.2 * sc, [7, 6, 5, 4, 3, 2], 70 * sc, 'fin', 5);
    sol(sols[1], 100 * sc); out.push(fin.svg);
    const moy = pile(x0, sols[2], 7.5 * sc, [4, 3, 2], 84 * sc, 'moyen', 7);
    sol(sols[2], 125 * sc); out.push(moy.svg);
    const gros = pile(x0, sols[3], 24 * sc, [3, 2], 90 * sc, 'buche', 9);
    sol(sols[3], 215 * sc); out.push(gros.svg);
    return { out: out.join('\n'), sols, sc, x0, fin, moy, gros };
  };

  // ── Vue 2 : le geste ───────────────────────────────────────────────────────────────────
  // La tige monte de la pointe (au bord du nid) vers le manche, à TH sur l'horizontale : u.
  // n lui est perpendiculaire, vers le bas à droite. Le couteau est couché le long de n, en
  // travers de la tige ; son dos (arête vers la pointe de la tige) appuie sur le métal.
  // Tout se mesure en mm, e = unités de vue par mm.
  // MX = −1 met la vue en miroir (le nid à droite) ; essayé, les deux avant-bras s'y croisent : on garde le sens d'origine.
  const MX = 1;
  const TH = deg(52);
  const u = [MX * Math.cos(TH), -Math.sin(TH)];
  const n = [MX * Math.sin(TH), Math.cos(TH)];
  const cap = v => Math.atan2(v[0], -v[1]) * 180 / Math.PI;   // angle compté depuis le haut, sens horaire
  const L_METAL = 125, L_MANCHE = 58, R_TIGE = 5.5, R_MANCHE = 9, D_C = 62, K0 = 16;
  const geste = z => {
    const G = z.h - 16;
    const e = Math.min(1, (G - 62) / 282);
    const nid = { w: 150 * e, H: 60 * e };
    const xT = MX > 0 ? Math.round(46 + 128 * e) : Math.round(z.l - 46 - 128 * e);
    // la pointe : au-dessus du bord du creux (le bord gauche, en miroir), à un doigt de la matière
    nid.cx = xT - MX * (0.30 * nid.w + 8 * e);
    const T = [xT, G - nid.H - 18 * e];
    const C = add(T, mul(u, D_C * e));                           // le dos du couteau sur la tige
    const Q = (s, t) => add(C, add(mul(n, s * e), mul(u, t * e)));   // repère du couteau (mm)
    const pT = add(T, mul(u, (L_METAL + L_MANCHE / 2) * e));     // le poing sur le manche de la tige
    const pK = Q(-92 - K0, 11);                                  // le poing sur le manche du couteau
    return { G, e, nid, T, C, Q, pT, pK };
  };
  const nidCreux = (cx, yG, w, H, graine) => {
    const r = gen(graine), out = [], x0 = cx - w / 2;
    const pts = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      const bosse = Math.min(1, 1.55 * Math.pow(Math.sin(Math.PI * t), 0.8));
      pts.push([x0 + w * t + (r() - 0.5) * 3, yG - H * bosse + (i && i < 16 ? (r() - 0.5) * 4 : 0)]);
    }
    out.push(h.path(lisse(pts, false) + ' Z', blanc(A.arete)));
    let brins = '';
    for (let i = 0; i < 52; i++) {
      const t = 0.08 + r() * 0.84, x = x0 + w * t;
      const top = yG - H * Math.min(1, 1.55 * Math.pow(Math.sin(Math.PI * t), 0.8));
      const y = top + 12 + r() * (yG - top - 14);
      if (y > yG - 3) continue;
      const L = 8 + r() * 10, o = (r() - 0.5) * 0.9;
      brins += `M ${f(x - Math.cos(o) * L / 2)} ${f(y - Math.sin(o) * L / 2)} Q ${f(x)} ${f(y + (r() - 0.5) * 5)} ${f(x + Math.cos(o) * L / 2)} ${f(y + Math.sin(o) * L / 2)} `;
    }
    out.push(h.path(brins, A.fin));
    let m = '';
    pts.forEach(([x, y], i) => {
      if (i === 0 || i === 16 || i % 2) return;
      const e = 3 + r() * 4;
      m += `M ${f(x)} ${f(y)} q ${f((r() - 0.5) * 6)} ${f(-e)} ${f((r() - 0.5) * 8)} ${f(-e * 1.5)} `;
    });
    out.push(h.path(m, A.fin));
    // le creux, vu un peu d'en haut : bord, fond fibreux, poudre au fond
    const cy = yG - H + 8, rx = w * 0.28, ry = 8;
    out.push(h.ellipse(cx, cy, rx, ry, blanc(A.detail)));
    out.push(h.path(`M ${f(cx - rx + 4)} ${f(cy + 1)} Q ${f(cx)} ${f(cy + ry + 3)} ${f(cx + rx - 4)} ${f(cy + 1)}`, A.fin));
    let poudre = '';
    for (let i = 0; i < 30; i++) {
      const a = r() * 2 * Math.PI, t = Math.sqrt(r()) * 0.62;
      poudre += `<circle cx="${f(cx + Math.cos(a) * rx * t)}" cy="${f(cy + 1.5 + Math.sin(a) * ry * t * 0.7)}" r="${f(0.6 + r() * 0.5)}" ${A.plein}/>`;
    }
    out.push(poudre);
    return { svg: out.join('\n'), creux: [cx, cy], rx };
  };
  // Le couteau à lame fixe, dans son repère Q(s, t) : s le long de la lame (vers la pointe),
  // t vers le tranchant ; le dos est la ligne t = 0. La garde en s = -28, le manche au-delà.
  const couteau = Q => {
    const out = [];
    // le manche : un fuseau à peine renflé, le pommeau arrondi
    const manche = [Q(-34, -1.5), Q(-70, -3), Q(-110, -3), Q(-138, -1), Q(-146, 5), Q(-146, 17), Q(-138, 23), Q(-110, 25), Q(-70, 25), Q(-34, 23.5)];
    out.push(h.path(lisse(manche, true), A.hachure('bois', 'arete')));
    // la garde
    out.push(h.chemin([Q(-34, -5), Q(-28, -5), Q(-28, 27), Q(-34, 27)], blanc(A.arete), true));
    // la lame : le dos droit jusqu'à la pointe, le tranchant qui remonte en ventre
    const lame = `M ${Q(-28, 0).map(f).join(' ')} L ${Q(46, 0).map(f).join(' ')} Q ${Q(64, 0.5).map(f).join(' ')} ${Q(76, 4).map(f).join(' ')} `
      + `C ${Q(66, 16).map(f).join(' ')} ${Q(50, 21).map(f).join(' ')} ${Q(28, 21).map(f).join(' ')} L ${Q(-28, 21).map(f).join(' ')} Z`;
    out.push(h.path(lame, blanc(A.arete)));
    // le fil du biseau
    out.push(h.path(`M ${Q(-24, 12).map(f).join(' ')} L ${Q(30, 12).map(f).join(' ')} Q ${Q(58, 11.5).map(f).join(' ')} ${Q(74, 5).map(f).join(' ')}`, A.fin));
    // le dos qui gratte : trait fort
    out.push(h.chemin([Q(-26, 0), Q(46, 0)], A.contour));
    return out.join('\n');
  };

  // ── Vue 3 : souffler ───────────────────────────────────────────────────────────────────
  // La personne en buste, de profil : le corps simple (13 oct.), coupé par le bas de la vue. La main
  // proche, paume en l'air (« porte »), tient la boule par le bas, à une longueur d'avant-bras devant
  // la bouche, à sa hauteur : bras à 55,6°, avant-bras à 172°, main à plat (90°), posés par le calcul
  // (épaule-coude 325 mm, coude-poignet 255 mm).
  const R_BOULE = 48, AVANT_BRAS = 255, COUPE = 520;
  const souffler = z => {
    const e = Math.min(0.5, (z.h - 8) / (COUPE + 150), (z.l - 30) / (126 + 104 + AVANT_BRAS + 2 * R_BOULE + 60));
    const oreille = [12 + 130 * e, z.h - 4 - COUPE * e];
    const o = { pose: 'buste-main-bouche', echelle: e, x: oreille[0] - 19 * e, y: oreille[1] + 1666 * e, mains: { P: 'porte' },
      angles: { brasP: 55.6, avantbrasP: 172, mainP: 90 } };
    const c = FM.corps(o);
    const bouche = [c.tete.x + 92 * e, c.tete.y + 56 * e];
    const R = R_BOULE * e, B = [c.mainP.x, c.mainP.y - R * 0.92];
    const y0 = B[1] - R * 0.8;
    const axe = y => B[0] + R * 0.35 + (y0 - y) * 0.18 + 5 * Math.sin((y0 - y) / 14);
    const larg = y => 1.5 + (y0 - y) * 0.16;
    const t = { bouche };
    return { e, t, B, R, y0, axe, larg, oreille, o };
  };

  // ── Vue 4 : le nid sous le tipi ────────────────────────────────────────────────────────
  const flamme = (x, yB, l, ht, pencher = 0) => {
    const d = `M ${f(x - l / 2)} ${f(yB)} C ${f(x - l / 2 - 2)} ${f(yB - ht * 0.45)} ${f(x + pencher - l * 0.2)} ${f(yB - ht * 0.7)} ${f(x + pencher)} ${f(yB - ht)} C ${f(x + pencher + l * 0.15)} ${f(yB - ht * 0.65)} ${f(x + l / 2 + 3)} ${f(yB - ht * 0.45)} ${f(x + l / 2)} ${f(yB)} Z`;
    return h.path(d, blanc(A.arete));
  };
  const tipi = z => {
    const cx = Math.round(z.l * 0.52), yB = z.h - 44, rx = Math.min(72, z.l * 0.24), ry = 18;
    const apex = [cx + 4, yB - Math.min(100, z.h - 62)];
    return { cx, yB, rx, ry, apex };
  };

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tas de bois à la flamme',
    desc: 'Quatre tas séparés, du plus fin au plus gros : l’amadou, le bois d’allumage sous 2 cm, celui de 2 à 5 cm, les bûches de moins de 15 cm. Le geste, de côté : le nid écharpé, creusé au centre, de la poudre au fond du creux ; la pointe de la tige posée au-dessus du bord du creux, à un doigt de la matière, la tige tenue dans un poing ; en travers de la tige, le dos d’un couteau à lame fixe tenu dans l’autre poing, presque d’équerre, immobile ; la tige tirée vers soi le long de son axe ; la gerbe qui part du dos du couteau et tombe dans le creux. Puis la boule refermée, tenue par le bas dans une main, à une longueur d’avant-bras du visage, soufflée en continu, la fumée qui monte. Enfin le nid en flammes glissé sous le tipi de bois fin, par l’ouverture tournée au vent, le bois de 2 à 5 cm qui attend à côté.',
    format: 'pleine',
    disposition: [['tas', 'geste'], ['souffler', 'deposer']],
    hauteurs: [1.6, 1.2],
    largeurs: [[1, 2.15], [1.45, 1]],
    vues: {
      tas: {
        titre: 'Trier avant d’allumer',
        dessin: z => tas(z).out,
        renvois: z => {
          const t = tas(z), sc = t.sc, xr = z.l - 12;
          const hautFin = t.fin.items[t.fin.items.length - 1], hautMoy = t.moy.items[t.moy.items.length - 1], hautG = t.gros.items[t.gros.items.length - 1];
          return [
            { n: 1, rond: [xr, t.sols[0] - 30 * sc], cible: [t.x0 + 64 * sc, t.sols[0] - 26 * sc], texte: 'amadou fin' },
            { n: 2, rond: [xr, t.sols[1] - 36 * sc], cible: [hautFin.cx + 40 * sc, hautFin.cy - 12 * sc], texte: 'allumage sous 2 cm' },
            { n: 3, rond: [xr, t.sols[2] - 44 * sc], cible: [hautMoy.cx + 48 * sc, hautMoy.cy - 14 * sc], texte: 'allumage de 2 à 5 cm' },
            { n: 4, rond: [xr, hautG.cy - 20 * sc], cible: [hautG.cx + 50 * sc, hautG.cy - 28 * sc], texte: 'bûches de moins de 15 cm' },
          ];
        },
      },
      geste: {
        titre: 'Tirer la tige, pas gratter',
        dessin: z => {
          const g = geste(z), { e, T, C, Q } = g, out = [];
          // le sol
          out.push(h.rect(0, g.G, z.l, 12, A.hachure('terre', 'aucun')));
          out.push(h.ligne(0, g.G, z.l, g.G, A.arete));
          // le nid, creusé, la poudre au fond du creux
          const nid = nidCreux(g.nid.cx, g.G, g.nid.w, g.nid.H, 3);
          out.push(nid.svg);
          // la gerbe : du dos du couteau, le long de la tige, jusque dans le creux
          const r = gen(21);
          let gerbe = '';
          const S = add(C, mul(u, -2 * e));
          const cibles = [-0.75, -0.45, -0.15, 0.15, 0.45, 0.75, 1.0].map(t => [nid.creux[0] + t * nid.rx * 0.85 + (r() - 0.5) * 4, nid.creux[1] + 1 + (r() - 0.5) * 3]);
          cibles.forEach(([x2, y2], i) => {
            const L = Math.hypot(x2 - S[0], y2 - S[1]);
            const ecart = (i - 3) * 5 * e;
            const c1 = add(add(S, mul(u, -L * 0.55)), mul(n, ecart - 6 * e));
            const N = 8;
            for (let k = 0; k < N; k++) {
              const t0 = 0.06 + k / N * 0.92, t1 = Math.min(1, t0 + 0.05);
              const q = t => [(1 - t) * (1 - t) * S[0] + 2 * t * (1 - t) * c1[0] + t * t * x2, (1 - t) * (1 - t) * S[1] + 2 * t * (1 - t) * c1[1] + t * t * y2];
              const p0 = q(t0), p1 = q(t1);
              gerbe += `M ${f(p0[0])} ${f(p0[1])} L ${f(p1[0])} ${f(p1[1])} `;
            }
          });
          out.push(h.path(gerbe, A.detail));
          // la tige de métal, le bout arrondi
          out.push(tronc(T, u, 0, L_METAL * e, R_TIGE * e, A.hachure('metal', 'arete')));
          const b0 = P(T, u, n, 0, -R_TIGE * e), b1 = P(T, u, n, -4 * e, 0), b2 = P(T, u, n, 0, R_TIGE * e);
          out.push(h.path(`M ${f(b0[0])} ${f(b0[1])} Q ${f(b1[0])} ${f(b1[1])} ${f(b2[0])} ${f(b2[1])}`, blanc(A.arete)));
          // l'éclat au point de contact
          let eclat = '';
          for (let i = 0; i < 7; i++) {
            const a = deg(-50 + i * 26), dir = add(mul(u, -Math.cos(a)), mul(n, Math.sin(a)));
            const r1 = 7 * e, r2 = (13 + (i % 2) * 5) * e;
            eclat += `M ${f(S[0] + dir[0] * r1)} ${f(S[1] + dir[1] * r1)} L ${f(S[0] + dir[0] * r2)} ${f(S[1] + dir[1] * r2)} `;
          }
          out.push(h.path(eclat, A.detail));
          // la tige tirée vers soi : la flèche (le geste, en rouge) prolonge le manche
          const f0 = add(T, mul(u, (L_METAL + L_MANCHE + 22) * e)), f1 = add(T, mul(u, (L_METAL + L_MANCHE + 78) * e));
          out.push(h.geste(`M ${f(f0[0])} ${f(f0[1])} L ${f(f1[0])} ${f(f1[1])}`));
          // Les deux poings (mains simples, prise-manche), vus de la paume, les doigts repliés sur les manches : la
          // main droite sur le manche de la tige, le pouce sur le bout, la tige qui sort du côté de l'auriculaire vers
          // le nid, l'avant-bras qui descend vers le genou ; la main gauche sur le manche du couteau, la lame qui sort
          // du côté du pouce, l'avant-bras qui monte. (Vus du dos, comme dans la première version, les deux poings
          // faisaient des moufles, JP 14 octobre ; de la paume, les mains changent de côté : la gauche tient le couteau
          // immobile, la droite tire la tige — le chapitre ne dit pas laquelle.) L'axe de la prise suit le manche :
          // poser donne l'angle qui met l'axe du moteur (du pouce vers l'auriculaire) sur la direction voulue.
          const ax = v => Math.atan2(v[1], v[0]) * 180 / Math.PI;
          const poser = (o, dir) => ax(dir) - FM.mainSimple({ ...o, x: 0, y: 0, angle: 0, avantbras: false }).prise.angle;
          const BORD = { x0: 0, y0: 0, x1: z.l, y1: z.h };
          const mancheTige = tronc(T, u, L_METAL * e, (L_METAL + L_MANCHE) * e, R_MANCHE * e, A.hachure('bois', 'arete'));
          const oT = { x: g.pT[0], y: g.pT[1], pose: 'prise-manche', vue: 'paume', cote: 'droite', diametre: 2 * R_MANCHE, echelle: e };
          out.push(FM.mainSimple({ ...oT, angle: poser(oT, mul(u, -1)), objet: mancheTige, avantbras: { bord: BORD, longueur: 'bord', fin: [[0, g.G - 3], [z.l, g.G - 3]] } }).svg);
          const oK = { x: g.pK[0], y: g.pK[1], pose: 'prise-manche', vue: 'paume', cote: 'gauche', diametre: 26, echelle: e };
          out.push(FM.mainSimple({ ...oK, angle: poser(oK, mul(n, -1)), objet: couteau((s, t) => Q(s - K0, t)), avantbras: { bord: BORD, longueur: 'bord' } }).svg);
          return out.join('\n');
        },
        renvois: z => {
          const g = geste(z), { e, T, C, Q } = g;
          const fl = add(T, mul(u, (L_METAL + L_MANCHE + 60) * e));
          return [
            { n: 5, rond: [MX > 0 ? 16 : z.l - 16, g.G - 36], cible: [g.nid.cx + MX * (26 - g.nid.w / 2), g.G - 20], texte: 'nid écharpé : le jour passe' },
            { n: 6, rond: [MX > 0 ? 16 : z.l - 16, g.G - 92], cible: [g.nid.cx - 10 * MX, g.G - g.nid.H + 9], texte: 'poudre fine au fond du creux' },
            { n: 7, rond: [T[0] + 24 * MX, g.G - 10], cible: [T[0] + 3 * MX, T[1] + 5], texte: 'pointe à un doigt du nid' },
            { n: 8, rond: [Q(22 - K0, 0)[0] + 34 * MX, Q(22 - K0, 0)[1] + 52], cible: Q(22 - K0, -0.5), texte: 'dos du couteau, immobile' },
            { n: 9, rond: [fl[0] + 34 * MX, fl[1] + 14], cible: [fl[0] + 5 * MX, fl[1] + 4], texte: 'tirer la tige vers soi' },
            { n: 10, rond: [MX > 0 ? 16 : z.l - 16, g.G - 142], cible: add(add(C, mul(u, -44 * e)), mul(n, -12 * e)), texte: 'la gerbe tombe dans le creux' },
          ];
        },
      },
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { e, t, B, R } = s, out = [];
          // la fumée : un filet mince qui monte et s'épaissit en montant
          const { y0, axe, larg } = s, yT = 8;
          // trois filets qui partent ensemble du haut de la boule et s'ouvrent en montant
          const filets = [-1, 0, 1].map(k => {
            const pts = [];
            for (let y = y0; y >= yT + Math.abs(k) * 10; y -= 4) {
              const m = (y0 - y) / (y0 - yT);
              pts.push([axe(y) + k * larg(y) + k * 4 * m * Math.sin((y0 - y) / 9 + k), y]);
            }
            return lisse(pts, false);
          });
          out.push(h.path(filets[0] + ' ' + filets[2], A.detail), h.path(filets[1], A.fin));
          // la boule de fibres, refermée sans serrer, posée dans la paume ; le corps coupé par le bas de
          // la vue, la boule devant tout (objet)
          const boule = touffe(B[0], B[1], R, R * 0.94, 8);
          out.push(`<clipPath id="buste-1340"><rect x="0" y="0" width="${f(z.l)}" height="${f(z.h - 4)}"/></clipPath>`);
          out.push(`<g clip-path="url(#buste-1340)">`, String(FM.corps(Object.assign({}, s.o, { objet: boule }))), '</g>');
          // le souffle, en continu, de la bouche à la boule
          const L0 = t.bouche;
          out.push(h.fleche(`M ${f(L0[0] + 10)} ${f(L0[1] - 4)} L ${f(B[0] - R * 0.42 - 5)} ${f(B[1] - R * 0.91 - 4)}`, A.cache));
          out.push(h.fleche(`M ${f(L0[0] + 10)} ${f(L0[1] + 3)} L ${f(B[0] - R * 0.71 - 6)} ${f(B[1] - R * 0.71 - 3)}`, A.cache));
          return out.join('\n');
        },
        renvois: z => {
          const s = souffler(z), { t, B, R } = s, L0 = t.bouche;
          return [
            { n: 11, rond: [B[0] + R + 30, B[1] + 4], cible: [B[0] + R * 0.4, B[1] - R * 0.2], texte: 'en boule, sans serrer' },
            { n: 12, rond: [(L0[0] + B[0] - R) / 2 - 6, L0[1] - 34], cible: [(L0[0] + B[0] - R) / 2 - 6, L0[1] - 6], texte: 'souffler en continu' },
            { n: 13, rond: [(L0[0] + B[0] - R) / 2 + 4, L0[1] + 40], cible: [(L0[0] + B[0] - R) / 2 + 4, L0[1] + 5], texte: 'à un avant-bras du visage' },
            { n: 14, rond: [B[0] + R + 40, 18], cible: [s.axe(34) + s.larg(34) + 3, 34], texte: 'fumée mince, puis épaisse' },
          ];
        },
      },
      deposer: {
        titre: 'Glisser le nid dessous',
        dessin: z => {
          const t = tipi(z), out = [];
          const { cx, yB, rx, ry, apex } = t;
          const N = 15, r = gen(13), batons = [];
          for (let i = 0; i < N; i++) {
            const phiD = (i * 360 / N + 5) % 360;
            if (phiD > 112 && phiD < 190) continue;       // l'ouverture, face au vent
            const phi = deg(phiD);
            const b = [cx + Math.cos(phi) * rx * (0.92 + r() * 0.1), yB + Math.sin(phi) * ry];
            const a = [apex[0] + (r() - 0.5) * 8, apex[1] + (r() - 0.5) * 6];
            const L = Math.hypot(a[0] - b[0], a[1] - b[1]), dir = [(a[0] - b[0]) / L, (a[1] - b[1]) / L];
            const e = 8 + r() * 12;
            batons.push({ avant: Math.sin(phi) > 0, svg: tronc(b, dir, 0, L + e, 2.3, blanc(A.detail)) });
          }
          batons.filter(b => !b.avant).forEach(b => out.push(b.svg));
          // le nid en flammes, glissé sous le bois fin par l'ouverture
          const nx = cx - 14, ny = yB + 3;
          out.push(flamme(nx + 10, ny - 6, 22, 80, -3), flamme(nx - 6, ny - 5, 22, 60, 5), flamme(nx - 20, ny - 3, 14, 38, -4));
          out.push(flamme(nx + 9, ny - 8, 9, 44, 1), flamme(nx - 6, ny - 7, 8, 28, 2));
          out.push(touffe(nx, ny, 24, 11, 17));
          batons.filter(b => b.avant).forEach(b => out.push(b.svg));
          // le geste : le nid est poussé sous le bois, par l'ouverture
          const go = [cx + Math.cos(deg(150)) * rx, yB + Math.sin(deg(150)) * ry];
          out.push(h.geste(`M ${f(go[0] - 46)} ${f(yB + 12)} L ${f(nx - 30)} ${f(yB + 10)}`));
          // le vent, qui entre par l'ouverture
          out.push(h.fleche(`M 6 ${f(go[1] - 34)} L ${f(go[0] - 14)} ${f(go[1] - 18)}`, A.cache));
          out.push(h.fleche(`M 6 ${f(go[1] - 12)} L ${f(go[0] - 14)} ${f(go[1] - 6)}`, A.cache));
          // le 2 à 5 cm, couché à côté
          const xs = cx + rx + 18;
          [[0, 0], [12, 1], [6, -10]].forEach(([dx, dy]) => out.push(...baton(xs + dx, yB + 10 + dy, 6, 34, 'moyen')));
          [[0, 0], [12, 1], [6, -10]].forEach(([dx, dy]) => out.push(...bout(xs + dx, yB + 10 + dy, 6, 'moyen')));
          return out.join('\n');
        },
        renvois: z => {
          const t = tipi(z), { cx, yB, rx, ry, apex } = t;
          const go = [cx + Math.cos(deg(150)) * rx, yB + Math.sin(deg(150)) * ry];
          return [
            { n: 15, rond: [cx + rx + 12, apex[1] + 14], cible: [cx + 30, apex[1] + 46], texte: 'tipi lâche de bois fin' },
            { n: 16, rond: [16, go[1] - 58], cible: [22, go[1] - 30], texte: 'ouverture au vent' },
            { n: 17, rond: [go[0] - 36, yB + 32], cible: [go[0] - 24, yB + 13], texte: 'nid glissé sous le bois' },
            { n: 18, rond: [cx + rx + 44, yB - 30], cible: [cx + rx + 32, yB - 2], texte: 'le 2 à 5 cm, quand ça crépite' },
          ];
        },
      },
    },
    danger: 'Danger — au-dessus d’un nid en flammes, une manche de polar fond et colle à la peau : la brûlure est profonde en une seconde. Laine et coton pour allumer.',
  };
};
