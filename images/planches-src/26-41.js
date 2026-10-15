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
  const TRAME = `<defs><pattern id="vue-trame-2641" width="3.6" height="3.6" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="3.6" y2="0" stroke="#1A1A1A" stroke-width="0.5"/><line x1="0" y1="0" x2="0" y2="3.6" stroke="#1A1A1A" stroke-width="0.5"/></pattern></defs>`;
  const RUBAN = `fill="url(#vue-trame-2641)" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`;
  // une lanière : un rectangle aux bouts déchirés, de c (centre) dans la direction ang, longueur L, largeur w
  const laniere = (c, ang, L, w, graine = 3) => {
    const R = hasard(graine), u = [Math.cos(ang * RAD), Math.sin(ang * RAD)], n = [-u[1], u[0]];
    const P = (t, s) => [c[0] + u[0] * t + n[0] * s, c[1] + u[1] * t + n[1] * s];
    const pts = [P(-L / 2, -w / 2)];
    for (let i = 1; i < 5; i++) pts.push(P(-L / 2 + (R() - 0.5) * 2.2, -w / 2 + w * i / 5));
    pts.push(P(-L / 2, w / 2), P(L / 2, w / 2));
    for (let i = 4; i > 0; i--) pts.push(P(L / 2 + (R() - 0.5) * 2.2, -w / 2 + w * i / 5));
    pts.push(P(L / 2, -w / 2));
    return h.chemin(pts, RUBAN, true);
  };

  // ─── l'avant-bras, vu de dessus, debout dans la vignette : la main en haut, coupée par le cadre ──
  // (mainSimple, à plat, vue du dos ; une main simple et nette sert à reconnaître le bras)
  const EB = 1.15;
  const bras = (z, idc) => {
    const m = F.mainSimple({ x: z.l / 2, y: 70, pose: 'plat', vue: 'dos', echelle: EB, angle: -90, ancre: 'poignet', avantbras: 'entier' });
    return { m, svg: [`<clipPath id="${idc}"><rect x="0" y="0" width="${z.l}" height="${z.h}"/></clipPath>`, `<g clip-path="url(#${idc})">`, String(m), '</g>'].join('\n') };
  };
  // la coupure, le long de l'avant-bras : ouverte (une fente en amande) ou refermée (un trait)
  const coupure = (c, L, ouverte, vertical = true) => {
    const q = (x, y) => vertical ? `${f1(c[0] + y)} ${f1(c[1] + x)}` : `${f1(c[0] + x)} ${f1(c[1] + y)}`;
    return ouverte
      ? h.path(`M${q(-L / 2, 0)} Q${q(0, -6)} ${q(L / 2, 0)} Q${q(0, 6)} ${q(-L / 2, 0)} Z`, `fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.7" stroke-linejoin="round"`)
      : h.path(`M${q(-L / 2, 0)} Q${q(0, -1)} ${q(L / 2, 0)}`, `fill="none" stroke="#1A1A1A" stroke-width="1.6" stroke-linecap="round"`);
  };

  // ─── 1. Refendre le ruban ───────────────────────────────────────────────────────────────────
  const refendre = z => {
    const o = [TRAME], P = {};
    const cx = z.l * 0.5, w = 19, L = 118;
    const y0 = z.h * 0.5 - L / 2 + 6;
    // le morceau de ruban, déchiré en trois lanières depuis le bas ; elles s'écartent un peu
    [-7, 0, 7].forEach((a, i) => {
      const x = cx + (i - 1) * (w + 2);
      const c = [x + Math.sin(a * RAD) * L * 0.5, y0 + L / 2];
      o.push(laniere(c, 90 + a, L, w, 11 + i));
    });
    // le haut encore d'un seul morceau
    o.push(h.rect(cx - 1.5 * w - 2, y0 - 30, 3 * w + 4, 34, RUBAN));
    P.laniere = [cx + w + 2 + Math.sin(7 * RAD) * L * 0.4 + w / 2 - 1, y0 + L * 0.82];
    return { svg: o.join('\n'), P };
  };

  // ─── 2. Coller d'un côté, tirer, coller de l'autre ─────────────────────────────────────────
  // La coupure est le long du bras ; la lanière se colle à gauche, se tire en travers vers la droite.
  const coller = z => {
    const o = [TRAME], P = {};
    const B = bras(z, 'vue-bras-2641-a');
    o.push(B.svg);
    const cx = z.l / 2, cy = z.h * 0.62, w = 19;
    o.push(coupure([cx, cy], 74, true));
    // la lanière : la moitié gauche collée, la moitié droite tenue en l'air, tirée vers la droite
    o.push(laniere([cx - 17, cy], 0, 32, w, 21));
    o.push(h.path(`M${f1(cx - 1)} ${f1(cy - w / 2)} C${f1(cx + 10)} ${f1(cy - w / 2 - 2)} ${f1(cx + 22)} ${f1(cy - w / 2 - 8)} ${f1(cx + 36)} ${f1(cy - w / 2 - 12)} L${f1(cx + 38)} ${f1(cy + w / 2 - 12)} C${f1(cx + 24)} ${f1(cy + w / 2 - 8)} ${f1(cx + 10)} ${f1(cy + w / 2 - 2)} ${f1(cx - 1)} ${f1(cy + w / 2)} Z`, RUBAN));
    o.push(h.geste(`M${f1(cx + 26)} ${f1(cy + w / 2 + 14)} L${f1(cx + 66)} ${f1(cy + w / 2 + 14)}`));
    P.colle = [cx - 30, cy + w / 2];
    P.tirer = [cx + 46, cy + w / 2 + 14];
    return { svg: o.join('\n'), P };
  };

  // ─── 3. En travers de la coupure ────────────────────────────────────────────────────────────
  const travers = z => {
    const o = [TRAME], P = {};
    const B = bras(z, 'vue-bras-2641-b');
    o.push(B.svg);
    const cx = z.l / 2, cy = z.h * 0.62, w = 19;
    o.push(coupure([cx, cy], 74, false));
    [-1, 0, 1].forEach((k, i) => o.push(laniere([cx, cy + k * (w + 9)], 0, 62, w, 31 + i)));
    P.laniere = [cx + 31, cy - (w + 9)];
    P.coupure = [cx, cy + (w + 9) + w / 2 + 6];
    return { svg: o.join('\n'), P };
  };

  // ─── le cuir chevelu, dans une loupe ────────────────────────────────────────────────────────
  // Les cheveux couchés de part et d'autre de la coupure, comme à une raie : ceux du haut vers le
  // haut, ceux du bas vers le bas, tous un peu vers la gauche, en courbes fines et régulières.
  const loupe = (z, idc, interieur) => {
    const cx = z.l / 2, cy = z.h / 2, R = Math.min(z.l, z.h) / 2 - 6;
    return { cx, cy, R, svg: [`<clipPath id="${idc}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R)}"/></clipPath>`,
      `<g clip-path="url(#${idc})">`, interieur(cx, cy, R), '</g>', h.cercle(cx, cy, R, A.arete)].join('\n') };
  };
  const CHEVEU = `fill="none" stroke="#1A1A1A" stroke-width="0.6" stroke-linecap="round"`;
  const cheveux = (cx, cy, R, evite) => {
    const o = [];
    for (const s of [-1, 1]) {
      for (const rang of [0, 1, 2]) {
        const y0 = cy + s * (5 + rang * 38), dec = rang * 5;
        for (let x = cx - R - 40 + dec; x < cx + R + 40; x += 8) {
          if (evite(x, y0)) continue;
          o.push(h.path(`M${f1(x)} ${f1(y0)} Q${f1(x - 6)} ${f1(y0 + s * 24)} ${f1(x - 26)} ${f1(y0 + s * 46)}`, CHEVEU));
        }
      }
    }
    return o.join('\n');
  };
  // la racine d'une mèche : les cheveux qui s'y rassemblent, en éventail
  const racine = (r, s) => [-8, -4, 0, 4, 8].map(dx =>
    h.path(`M${f1(r[0] + dx * 1.5)} ${f1(r[1] + s * 14)} Q${f1(r[0] + dx * 0.8)} ${f1(r[1] + s * 5)} ${f1(r[0] + dx * 0.25)} ${f1(r[1] - s * 1)}`, CHEVEU)).join('\n');

  // ─── 4. Une mèche de chaque côté, croisées par-dessus ──────────────────────────────────────
  const meches = z => {
    const P = {};
    const L = loupe(z, 'vue-loupe-2641-a', (cx, cy, R) => {
      const rA = [cx - 18, cy + 30], rB = [cx + 18, cy - 30];
      const evite = (x, y) => (Math.abs(x - rA[0]) < 14 && Math.sign(y - cy) > 0 && Math.abs(y - rA[1]) < 30) || (Math.abs(x - rB[0]) < 14 && Math.sign(y - cy) < 0 && Math.abs(y - rB[1]) < 30);
      return [cheveux(cx, cy, R, evite), coupure([cx, cy], 96, true, false), racine(rA, 1), racine(rB, -1),
        F.cordes([
          { pts: [rA, [cx - 6, cy + 4], [cx + 22, cy - 34], [cx + 46, cy - 58]], ep: 7, debut: 'ouvert', fin: 'libre' },
          { pts: [rB, [cx + 6, cy - 4], [cx - 22, cy + 34], [cx - 46, cy + 58]], ep: 7, debut: 'ouvert', fin: 'libre' },
        ], { trait: 'arete' })].join('\n');
    });
    P.meche = [L.cx + 22, L.cy - 34];
    return { svg: L.svg, P, L };
  };

  // ─── 5. Nouées, tirées par les bouts ────────────────────────────────────────────────────────
  // Un demi-nœud : A part du bas, B du haut ; ils tournent une fois l'un sur l'autre au-dessus de la
  // coupure, puis A repart en haut à gauche, B en bas à droite. On tire les deux bouts : le nœud
  // serre et les deux bords de la coupure se touchent.
  const noeud = z => {
    const P = {};
    const L = loupe(z, 'vue-loupe-2641-b', (cx, cy, R) => {
      const rA = [cx - 14, cy + 26], rB = [cx + 14, cy - 26];
      const evite = (x, y) => (Math.abs(x - rA[0]) < 14 && Math.sign(y - cy) > 0 && Math.abs(y - rA[1]) < 30) || (Math.abs(x - rB[0]) < 14 && Math.sign(y - cy) < 0 && Math.abs(y - rB[1]) < 30);
      return [cheveux(cx, cy, R, evite), coupure([cx, cy], 96, false, false), racine(rA, 1), racine(rB, -1),
        F.cordes([
          { pts: [rA, [cx - 2, cy + 10], [cx + 12, cy - 2], [cx + 2, cy - 15], [cx - 24, cy - 32], [cx - 62, cy - 50]], ep: 7, debut: 'ouvert', fin: 'libre' },
          { pts: [rB, [cx + 2, cy - 10], [cx - 12, cy + 2], [cx - 2, cy + 15], [cx + 24, cy + 32], [cx + 62, cy + 50]], ep: 7, debut: 'ouvert', fin: 'libre' },
        ], { trait: 'arete' })].join('\n');
    });
    const { cx, cy } = L;
    const svg = [L.svg, h.geste(`M${f1(cx - 70)} ${f1(cy - 60)} L${f1(cx - 96)} ${f1(cy - 76)}`), h.geste(`M${f1(cx + 70)} ${f1(cy + 60)} L${f1(cx + 96)} ${f1(cy + 76)}`)].join('\n');
    P.noeud = [cx + 4, cy - 2];
    return { svg, P, L };
  };

  const memo = {};
  const G = (fn, z) => { const c = `${fn.name}-${z.l}-${z.h}`; return memo[c] || (memo[c] = fn(z)); };

  return {
    ref: '26-41',
    titre: 'Fermer une coupure : le ruban refendu, les cheveux noués',
    desc: 'En haut, trois vignettes sur un avant-bras vu de dessus. Un morceau de ruban à conduits déchiré en lanières de la largeur d’un doigt. Une lanière collée sous la coupure, tirée vers le haut en travers de la coupure (flèche rouge), pour coller l’autre bout de l’autre côté. Quatre lanières en travers, la coupure refermée. En bas, deux vignettes sur le cuir chevelu : une mèche prise de chaque côté de la coupure ; les deux mèches croisées par-dessus et nouées, tirées par les bouts (flèches rouges), les bords refermés.',
    format: 'pleine',
    disposition: [['refendre', 'coller', 'travers'], ['meches', 'noeud']],
    hauteurs: [1.1, 1],
    vues: {
      refendre: {
        titre: 'Le ruban : refendre',
        dessin: z => G(refendre, z).svg,
        renvois: z => {
          const P = G(refendre, z).P;
          return [{ n: 1, rond: [P.laniere[0] + 26, P.laniere[1] - 34], cible: P.laniere, texte: 'lanières de la largeur d’un doigt' }];
        },
      },
      coller: {
        titre: 'Coller, tirer',
        dessin: z => G(coller, z).svg,
        renvois: z => {
          const P = G(coller, z).P;
          return [
            { n: 2, rond: [P.colle[0] - 14, P.colle[1] + 46], cible: [P.colle[0], P.colle[1] - 1], texte: 'collée d’un côté, sur peau sèche' },
            { n: 3, rond: [P.tirer[0] + 6, P.tirer[1] + 40], cible: [P.tirer[0], P.tirer[1] + 3], texte: 'tirer en travers, coller de l’autre côté' },
          ];
        },
      },
      travers: {
        titre: 'En travers',
        dessin: z => G(travers, z).svg,
        renvois: z => {
          const P = G(travers, z).P;
          return [{ n: 4, rond: [P.coupure[0] + 44, P.coupure[1] + 30], cible: [P.coupure[0] + 1, P.coupure[1] - 2], texte: 'les lèvres jointes sous les lanières' }];
        },
      },
      meches: {
        titre: 'Le cuir chevelu : croiser',
        dessin: z => G(meches, z).svg,
        renvois: z => {
          const P = G(meches, z).P;
          return [{ n: 5, rond: [P.meche[0] + 96, P.meche[1] - 10], cible: [P.meche[0] + 4, P.meche[1]], texte: 'une mèche de chaque côté, croisées' }];
        },
      },
      noeud: {
        titre: 'Nouer, serrer',
        dessin: z => G(noeud, z).svg,
        renvois: z => {
          const P = G(noeud, z).P;
          return [{ n: 6, rond: [P.noeud[0] + 116, P.noeud[1] - 30], cible: [P.noeud[0] + 8, P.noeud[1] - 4], texte: 'nouées, tirées par les bouts' }];
        },
      },
    },
  };
};
