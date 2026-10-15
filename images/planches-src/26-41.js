// Planche 26-41. Fermer une coupure : le ruban refendu, les cheveux noués (chapitre 26, §9, « Le
// lien qui rapproche une coupure »).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne).
// Ce que dit le chapitre, et rien de plus : du ruban à conduits refendu en lanières de la largeur
// d'un doigt, collées sur peau sèche de part et d'autre de la coupure, en tirant les lèvres l'une
// vers l'autre ; la lanière traverse la coupure. Sur le cuir chevelu : une mèche de chaque côté,
// croisées par-dessus la plaie et nouées ; les cheveux tiennent seuls. Rien de tout ça sur une plaie
// sale, profonde, perforante ou de morsure (étape 24) : c'est dit en gras dans le texte, juste à
// côté de l'appel, et la planche ne le redit pas.
// Ce que la planche dessine en principe : le nœud des mèches est un demi-nœud (les deux mèches
// tournées une fois l'une sur l'autre, comme le premier temps d'un lacet) ; le chapitre dit
// « nouer » sans dire quel nœud.
// Aucune cote : le geste se mesure au doigt (la largeur d'une lanière).
// Pas de main : la lanière se tire seule, et le renvoi dit le geste (consigne du 15 octobre : une
// main pas nette ne s'imprime pas, l'objet seul suffit souvent).
// Charte : le ruban pèse (contour), le bras est fin. Rouge : tirer la lanière en travers ; serrer
// le nœud en tirant les bouts.
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const RAD = Math.PI / 180;
  const lisse = (pts, ferme = false) => {
    const n = pts.length, P = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // hasard répétable
  const hasard = g => () => { g = (g * 16807) % 2147483647; return (g - 1) / 2147483646; };
  // la trame du ruban à conduits : un fin quadrillage, découpé par la lanière
  const TRAME = `<defs><pattern id="vue-trame-2641" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="4" y2="0" stroke="#1A1A1A" stroke-width="0.5"/><line x1="0" y1="0" x2="0" y2="4" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`;
  const RUBAN = `fill="url(#vue-trame-2641)" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round"`;
  // une lanière : un rectangle aux bouts déchirés, de c (centre) dans la direction ang, longueur L, largeur w
  const laniere = (c, ang, L, w, graine = 3) => {
    const R = hasard(graine), u = [Math.cos(ang * RAD), Math.sin(ang * RAD)], n = [-u[1], u[0]];
    const P = (t, s) => [c[0] + u[0] * t + n[0] * s, c[1] + u[1] * t + n[1] * s];
    const pts = [P(-L / 2, -w / 2)];
    for (let i = 1; i < 6; i++) pts.push(P(-L / 2 + (R() - 0.5) * 2.4, -w / 2 + w * i / 6));
    pts.push(P(-L / 2, w / 2), P(L / 2, w / 2));
    for (let i = 5; i > 0; i--) pts.push(P(L / 2 + (R() - 0.5) * 2.4, -w / 2 + w * i / 6));
    pts.push(P(L / 2, -w / 2));
    return h.chemin(pts, RUBAN, true);
  };

  // ─── le bras, vu de dessus : un bout d'avant-bras qui traverse la vignette ──────────────────
  const bras = (z, cy, demi) => {
    const o = [];
    const yH = x => cy - demi + 4 * (x / z.l), yB = x => cy + demi - 4 * (x / z.l);
    const haut = [], bas = [];
    for (let x = 0; x <= z.l + 0.1; x += z.l / 10) { haut.push([x, yH(x)]); bas.push([x, yB(x)]); }
    o.push(h.path(lisse(haut), A.arete), h.path(lisse(bas), A.arete));
    return o.join('\n');
  };
  // la coupure, le long du bras : ouverte (une fente en amande) ou refermée (un trait)
  const coupure = (c, L, ouverte) => ouverte
    ? h.path(`M${f1(c[0] - L / 2)} ${f1(c[1])} Q${f1(c[0])} ${f1(c[1] - 7)} ${f1(c[0] + L / 2)} ${f1(c[1])} Q${f1(c[0])} ${f1(c[1] + 7)} ${f1(c[0] - L / 2)} ${f1(c[1])} Z`, `fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round"`)
    : h.path(`M${f1(c[0] - L / 2)} ${f1(c[1])} Q${f1(c[0])} ${f1(c[1] - 1.2)} ${f1(c[0] + L / 2)} ${f1(c[1])}`, `fill="none" stroke="#1A1A1A" stroke-width="1.6" stroke-linecap="round"`);

  // ─── 1. Refendre le ruban ───────────────────────────────────────────────────────────────────
  const refendre = z => {
    const o = [TRAME], P = {};
    const cx = z.l * 0.5, w = 16, L = 120;
    const y0 = z.h * 0.5 - L / 2 + 10;
    // le morceau de ruban, déchiré en trois lanières depuis le bas ; elles s'écartent un peu
    const angs = [-8, 0, 8];
    angs.forEach((a, i) => {
      const x = cx + (i - 1) * (w + 1);
      const c = [x + Math.sin(a * RAD) * L * 0.25, y0 + L / 2 + 6 * Math.abs(a) / 8];
      o.push(laniere(c, 90 + a, L, w, 11 + i));
    });
    // le haut encore d'un seul morceau
    o.push(h.rect(cx - 1.5 * w - 1, y0 - 26, 3 * w + 2, 30, RUBAN));
    P.laniere = [cx + w + 1 + 4, y0 + L * 0.7];
    return { svg: o.join('\n'), P };
  };

  // ─── 2. Coller d'un côté, tirer, coller de l'autre ─────────────────────────────────────────
  const coller = z => {
    const o = [TRAME], P = {};
    const cy = z.h * 0.52, cx = z.l * 0.5, w = 16;
    o.push(bras(z, cy, 72));
    o.push(coupure([cx, cy], 96, true));
    // la lanière : collée sous la coupure, tirée vers le haut en travers, le bout encore libre
    o.push(laniere([cx, cy + 34], 90, 52, w, 21));
    const libre = [[cx - w / 2, cy + 8], [cx - w / 2 - 2, cy - 40], [cx - w / 2 - 8, cy - 78], [cx + w / 2 - 8, cy - 80], [cx + w / 2 - 2, cy - 42], [cx + w / 2, cy + 8]];
    o.push(h.path(`M${f1(libre[0][0])} ${f1(libre[0][1])} C${f1(libre[1][0])} ${f1(libre[1][1] + 20)} ${f1(libre[1][0])} ${f1(libre[1][1])} ${f1(libre[2][0])} ${f1(libre[2][1])} L${f1(libre[3][0])} ${f1(libre[3][1])} C${f1(libre[4][0])} ${f1(libre[4][1])} ${f1(libre[4][0])} ${f1(libre[4][1] + 20)} ${f1(libre[5][0])} ${f1(libre[5][1])} Z`, RUBAN));
    o.push(h.geste(`M${f1(cx + w / 2 + 16)} ${f1(cy - 12)} L${f1(cx + w / 2 + 16)} ${f1(cy - 66)}`));
    P.colle = [cx + w / 2, cy + 44];
    P.tirer = [cx + w / 2 + 16, cy - 40];
    return { svg: o.join('\n'), P };
  };

  // ─── 3. En travers de la coupure ────────────────────────────────────────────────────────────
  const travers = z => {
    const o = [TRAME], P = {};
    const cy = z.h * 0.52, cx = z.l * 0.5, w = 16;
    o.push(bras(z, cy, 72));
    o.push(coupure([cx, cy], 96, false));
    [-1.5, -0.5, 0.5, 1.5].forEach((k, i) => o.push(laniere([cx + k * (w + 10), cy], 90, 96, w, 31 + i)));
    P.laniere = [cx + 1.5 * (w + 10) + w / 2, cy - 30];
    P.coupure = [cx + 2 * (w + 10) + 4, cy];
    return { svg: o.join('\n'), P };
  };

  // ─── le cuir chevelu, en gros plan ──────────────────────────────────────────────────────────
  // Les cheveux couchés de part et d'autre de la coupure, comme à une raie : ceux du haut peignés
  // vers le haut à gauche, ceux du bas vers le bas à gauche. Chaque cheveu est une courbe fine.
  const cheveux = (z, cy, trou, graine) => {
    const R = hasard(graine), o = [];
    const id = `vue-crane-2641-${graine}`;
    o.push(`<clipPath id="${id}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${id})">`);
    for (const s of [-1, 1]) {
      for (let i = 0; i < 46; i++) {
        const x0 = -20 + R() * (z.l + 40), y0 = cy + s * (5 + R() * 6);
        if (trou(x0, y0)) continue;
        const L = 46 + R() * 50, a = (s < 0 ? -1 : 1) * (40 + R() * 22) * RAD;
        const p1 = [x0 - Math.cos(a) * L * 0.3 * s * s, y0 + Math.sin(a) * L * 0.5], p2 = [x0 - L * 0.62, y0 + s * L * 0.62 + (R() - 0.5) * 8];
        o.push(h.path(`M${f1(x0)} ${f1(y0)} Q${f1(p1[0])} ${f1(p1[1])} ${f1(p2[0])} ${f1(p2[1])}`, `fill="none" stroke="#1A1A1A" stroke-width="${R() < 0.5 ? 0.7 : 0.5}" stroke-linecap="round"`));
      }
    }
    o.push('</g>');
    return o.join('\n');
  };
  // une mèche : la bande de la mèche (cordes), et l'éventail de cheveux qui s'y rassemblent
  const racine = (r, s) => {
    const o = [];
    for (const dx of [-7, -3.5, 0, 3.5, 7]) o.push(h.path(`M${f1(r[0] + dx * 1.6)} ${f1(r[1] + s * 12)} Q${f1(r[0] + dx * 0.9)} ${f1(r[1] + s * 4)} ${f1(r[0] + dx * 0.3)} ${f1(r[1] - s * 2)}`, `fill="none" stroke="#1A1A1A" stroke-width="0.7" stroke-linecap="round"`));
    return o.join('\n');
  };

  // ─── 4. Une mèche de chaque côté ───────────────────────────────────────────────────────────
  const meches = z => {
    const o = [], P = {};
    const cx = z.l * 0.5, cy = z.h * 0.5, Lc = 110;
    const dansTrou = (x, y) => Math.abs(x - cx) < 26 && Math.abs(y - cy) < 46;
    o.push(cheveux(z, cy, dansTrou, 7));
    o.push(coupure([cx, cy], Lc, true));
    const rA = [cx - 10, cy + 30], rB = [cx + 10, cy - 30];
    o.push(racine(rA, 1), racine(rB, -1));
    o.push(F.cordes([
      { pts: [rA, [rA[0] - 6, rA[1] - 30], [rA[0] - 22, rA[1] - 58]], ep: 6, debut: 'ouvert', fin: 'libre' },
      { pts: [rB, [rB[0] + 6, rB[1] + 30], [rB[0] + 22, rB[1] + 58]], ep: 6, debut: 'ouvert', fin: 'libre' },
    ], { trait: 'arete' }));
    P.mecheA = [rA[0] - 4, rA[1] - 22];
    P.mecheB = [rB[0] + 4, rB[1] + 22];
    P.coupure = [cx + Lc / 2 - 6, cy];
    return { svg: o.join('\n'), P };
  };

  // ─── 5. Croisées par-dessus, nouées ─────────────────────────────────────────────────────────
  // Un demi-nœud : A part du bas, B du haut ; ils tournent une fois l'un sur l'autre au-dessus de la
  // coupure (deux croisements), puis A repart en haut à gauche, B en bas à droite. On tire les deux
  // bouts : le nœud serre et les deux bords se touchent.
  const noeud = z => {
    const o = [], P = {};
    const cx = z.l * 0.5, cy = z.h * 0.5, Lc = 110;
    const dansTrou = (x, y) => Math.abs(x - cx) < 22 && Math.abs(y - cy) < 40;
    o.push(cheveux(z, cy, dansTrou, 9));
    o.push(coupure([cx, cy], Lc, false));
    const rA = [cx - 8, cy + 24], rB = [cx + 8, cy - 24];
    o.push(racine(rA, 1), racine(rB, -1));
    const brinA = { pts: [rA, [cx + 9, cy + 6], [cx - 6, cy - 9], [cx - 36, cy - 44], [cx - 66, cy - 66]], ep: 6, debut: 'ouvert', fin: 'libre' };
    const brinB = { pts: [rB, [cx - 9, cy - 6], [cx + 6, cy + 9], [cx + 36, cy + 44], [cx + 66, cy + 66]], ep: 6, debut: 'ouvert', fin: 'libre' };
    o.push(F.cordes([brinA, brinB], { trait: 'arete' }));
    o.push(h.geste(`M${f1(cx - 72)} ${f1(cy - 50)} L${f1(cx - 98)} ${f1(cy - 70)}`), h.geste(`M${f1(cx + 72)} ${f1(cy + 50)} L${f1(cx + 98)} ${f1(cy + 70)}`));
    P.noeud = [cx + 2, cy - 1];
    return { svg: o.join('\n'), P };
  };

  const memo = {};
  const G = (fn, z) => { const c = `${fn.name}-${z.l}-${z.h}`; return memo[c] || (memo[c] = fn(z)); };

  return {
    ref: '26-41',
    titre: 'Fermer une coupure : le ruban refendu, les cheveux noués',
    desc: 'En haut, trois vignettes sur un avant-bras vu de dessus. Un morceau de ruban à conduits déchiré en lanières de la largeur d’un doigt. Une lanière collée sous la coupure, tirée vers le haut en travers de la coupure (flèche rouge), pour coller l’autre bout de l’autre côté. Quatre lanières en travers, la coupure refermée. En bas, deux vignettes sur le cuir chevelu : une mèche prise de chaque côté de la coupure ; les deux mèches croisées par-dessus et nouées, tirées par les bouts (flèches rouges), les bords refermés.',
    format: 'pleine',
    disposition: [['refendre', 'coller', 'travers'], ['meches', 'noeud']],
    hauteurs: [1, 1.15],
    vues: {
      refendre: {
        titre: 'Le ruban : refendre',
        dessin: z => G(refendre, z).svg,
        renvois: z => {
          const P = G(refendre, z).P;
          return [{ n: 1, rond: [P.laniere[0] + 34, P.laniere[1] - 20], cible: P.laniere, texte: 'lanières de la largeur d’un doigt' }];
        },
      },
      coller: {
        titre: 'Coller, tirer',
        dessin: z => G(coller, z).svg,
        renvois: z => {
          const P = G(coller, z).P;
          return [
            { n: 2, rond: [P.colle[0] + 36, P.colle[1] + 22], cible: P.colle, texte: 'collée d’un côté, sur peau sèche' },
            { n: 3, rond: [P.tirer[0] + 30, P.tirer[1] - 30], cible: [P.tirer[0] + 2, P.tirer[1]], texte: 'tirer en travers, coller de l’autre côté' },
          ];
        },
      },
      travers: {
        titre: 'En travers',
        dessin: z => G(travers, z).svg,
        renvois: z => {
          const P = G(travers, z).P;
          return [{ n: 4, rond: [P.coupure[0] + 6, P.coupure[1] - 74], cible: [P.laniere[0], P.laniere[1] - 14], texte: 'les lèvres jointes sous les lanières' }];
        },
      },
      meches: {
        titre: 'Le cuir chevelu : une mèche de chaque côté',
        dessin: z => G(meches, z).svg,
        renvois: z => {
          const P = G(meches, z).P;
          return [{ n: 5, rond: [P.mecheB[0] + 70, P.mecheB[1] + 40], cible: P.mecheB, texte: 'une mèche de chaque côté' }];
        },
      },
      noeud: {
        titre: 'Croisées par-dessus, nouées',
        dessin: z => G(noeud, z).svg,
        renvois: z => {
          const P = G(noeud, z).P;
          return [{ n: 6, rond: [P.noeud[0] + 80, P.noeud[1] - 40], cible: [P.noeud[0] + 6, P.noeud[1] - 4], texte: 'croisées, nouées, tirées par les bouts' }];
        },
      },
    },
  };
};
