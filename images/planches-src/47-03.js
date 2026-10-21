// Planche 47-03 — L'appelant de fortune (ch. 47, étape 32 ; ch. 54, « Quand il n'y a plus de cartouches »).
// Le premier canard pris, la tête calée droite sur un bâton fourchu planté dans la vase ; la motte
// de neige et son bout de chiffon noir (ch. 54). Aucune cote : le chapitre ne donne aucune mesure.
//
// Le montage, pour qu'il tienne pour vrai : le bâton est planté devant le poitrail, un peu penché
// vers l'oiseau ; sa fourche prend le haut du cou juste sous la tête, une branche de chaque côté.
// La tête, plus large que le cou, repose sur les deux branches et ne peut ni tomber en avant ni
// rouler de côté ; le cou repart vers le corps derrière le bâton. L'oiseau flotte, retenu par le
// cou : le bâton sert aussi d'ancre.
//
// Le canard de côté est calqué sur la cane colvert de Fuertes (pl. 12, Birds of New York, 1910 ;
// images/photos/lot5/50-01c-canard-noir-colvert-fuertes-pl12.jpg : même silhouette que le canard
// noir, qui n'y est montré qu'au repos), par _animaux.js (canard). Repère en mm, celui du canard,
// la ligne d'eau à y = 0. La tête est reprise de profil, de près (JP : mieux que de face), le même
// calque à plus grande échelle ; la fourche enjambe le cou, la branche loin en tireté derrière.
const A_ = require('./_animaux');

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = a => a.replace('fill="none"', 'fill="#FFFFFF"');
  const sansBord = a => a.replace(/stroke="[^"]*"/, 'stroke="none"');
  const tf = (s, ox, oy) => (x, y) => [ox + x * s, oy + y * s];
  const pt = p => `${f(p[0])} ${f(p[1])}`;
  let nClip = 0;
  const decoupe = (x, y, l, ht, contenu) => {
    const id = `pl4703-${++nClip}`;
    return `<clipPath id="${id}"><rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="${f(ht)}"/></clipPath>\n<g clip-path="url(#${id})">\n${contenu.join('\n')}\n</g>`;
  };

  // Segments en unités → attribut d.
  const versD = (segs, P) => segs.map(([c, ...a]) => {
    if (c === 'Z') return 'Z';
    const q = [];
    for (let i = 0; i < a.length; i += 2) q.push(pt(P(a[i], a[i + 1])));
    return `${c} ${q.join(' ')}`;
  }).join(' ');

  // Courbe lisse par des points (Catmull-Rom → Bézier), en pixels.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, g = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M ${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += ` C ${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return d + (ferme ? ' Z' : '');
  };

  // Une branche : un axe (pixels) et un rayon par point ; le premier bout taillé en pointe si
  // demandé, le dernier coupé net. Rend le contour fermé.
  const branche = (axe, rayons, pointe = false) => {
    const n = axe.length, G = [], D = [];
    for (let i = 0; i < n; i++) {
      const a = axe[Math.max(0, i - 1)], b = axe[Math.min(n - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      G.push([axe[i][0] + nx * rayons[i], axe[i][1] + ny * rayons[i]]);
      D.push([axe[i][0] - nx * rayons[i], axe[i][1] - ny * rayons[i]]);
    }
    const debut = [];
    if (pointe) {
      const a = axe[0], b = axe[1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      debut.push([a[0] - (b[0] - a[0]) / L * rayons[0] * 3, a[1] - (b[1] - a[1]) / L * rayons[0] * 3]);
    }
    return [...debut, ...G, ...D.reverse()];
  };
  // Le bout coupé d'une branche : une petite ellipse en travers de l'axe.
  const coupe = (a, b, r) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
    const q = [];
    for (let i = 0; i < 16; i++) {
      const t = i / 16 * 2 * Math.PI, c = Math.cos(t) * r, e = Math.sin(t) * r * 0.35;
      q.push([b[0] - u[1] * c + u[0] * e, b[1] + u[0] * c + u[1] * e]);
    }
    return h.path(lisse(q, true), h.a.detail);
  };

  // ── De côté : le canard calqué (_animaux.js, canard), tourné vers la gauche ──────────────
  // Repère en mm, celui du canard : x vers l'avant de la bête (le bec), y vers le haut, l'origine
  // sur la ligne d'eau sous le menton. Sur la vue, l'avant est à gauche.
  const VASE = -110, BAS = -190, FK = [5, 230];   // le fond ; le bas de la coupe ; l'enfourchure
  const geoCote = z => {
    const s = Math.min((z.l - 16) / 690, (z.h - 6) / 560);
    const ox = z.l / 2 - 160 * s, oy = z.h / 2 + 86 * s;
    return { s, ox, oy, P: (x, y) => [ox - s * x, oy - s * y] };
  };
  // le bâton : la pointe dans la vase, devant le poitrail, penché vers l'oiseau ; la fourche
  // prend le haut du cou sous la tête, une branche de chaque côté
  const AXE = [[118, -158], [112, -115], [88, -30], [60, 60], [32, 150], FK, [-25, 250], [-48, 263]];
  const LOIN = [FK, [-20, 255], [-42, 269]];

  const dessinCote = z => {
    const { s, ox, oy, P } = geoCote(z);
    const ySurf = P(0, 0)[1], yVase = P(0, VASE)[1], yBas = P(0, BAS)[1];
    const vase = [];
    for (let i = 0; i <= 40; i++) { const x = z.l * i / 40; vase.push([x, yVase + 2.2 * Math.sin(x / 23) + 1.4 * Math.sin(x / 9 + 1)]); }
    const out = [];
    out.push(h.rect(0, ySurf, z.l, yVase - ySurf + 4, sansBord(h.a.hachure('eau', 'fin'))));
    out.push(h.path(`${lisse(vase)} L ${f(z.l)} ${f(yBas)} L 0 ${f(yBas)} Z`, sansBord(h.a.hachure('terre'))));
    out.push(h.path(lisse(vase), h.a.arete));
    out.push(h.ligne(0, ySurf, z.l, ySurf, h.a.arete));
    // le canard, puis la branche de derrière en caché, puis le bâton et la branche de devant
    out.push(A_.canard(h, { x: ox, y: oy, echelle: s, cote: 'gauche' }).svg);
    const r = 8 * s;
    out.push(h.chemin(branche(LOIN.map(q => P(...q)), [r * 0.9, r * 0.75, r * 0.6]), h.a.cache, true));
    const axe = AXE.map(q => P(...q));
    out.push(h.chemin(branche(axe, [r, r, r, r, r, r * 0.95, r * 0.75, r * 0.6], true), blanc(h.a.arete), true));
    out.push(coupe(axe[6], axe[7], r * 0.6));
    return out.join('\n');
  };

  // ── De profil, de près : la tête posée sur la fourche ───────────────────────────────────
  // Le même canard calqué (_animaux.js, canard), plus grand, cadré sur la tête et le cou ; la nuque
  // sort du cadre. Même repère en mm. La branche proche passe devant le cou, au trait plein ; la
  // branche loin passe derrière : en gris loin là où elle se voit, en tireté sur le cou. De près,
  // les deux branches sont un peu plus longues et plus écartées que dans la vue de côté, pour qu'on
  // voie la fourche enjamber le cou.
  const LOIN_PRES = [FK, [-22, 261], [-52, 285]];
  const AXE_PRES = AXE.slice(0, 6).concat([[-28, 249], [-62, 266]]);
  const geoFace = z => {
    const s = (z.l - 12) / 206;
    const ox = 6 + 96 * s, oy = 40 + 358 * s;
    return { s, P: (x, y) => [ox - s * x, oy - s * y] };
  };
  const dessinFace = z => {
    const { s, P } = geoFace(z), out = [];
    const [ox, oy] = P(0, 0);
    const r = 8 * s;
    // la branche loin, derrière le cou : gris loin, puis le canard par-dessus
    const loin = branche(LOIN_PRES.map(q => P(...q)), [r * 0.95, r * 0.75, r * 0.6]);
    out.push(h.chemin(loin, sansBord(h.a.loin), true), h.chemin(loin, h.a.arete, true));
    out.push(A_.canard(h, { x: ox, y: oy, echelle: s, cote: 'gauche' }).svg);
    // … et son contour en tireté là où le cou la cache
    out.push(h.chemin(loin, h.a.cache, true));
    // le bâton et la branche proche, devant le cou : un seul contour
    const axe = AXE_PRES.map(q => P(...q));
    const Y = A_._outils.unir([branche(axe, [r, r, r, r, r, r * 0.95, r * 0.75, r * 0.6], true)]);
    Y.forEach(q => out.push(h.chemin(q, blanc(h.a.arete), true)));
    out.push(coupe(axe[6], axe[7], r * 0.6));
    return decoupe(0, 0, z.l, z.h, out);
  };

  // ── Les mottes ─────────────────────────────────────────────────────────────────────────
  const hMotte = (x, bosses) => {
    const base = -0.30 * Math.pow(Math.max(0, 1 - Math.pow((x + 0.03) / 0.47, 2)), 0.55) * (1 + 0.14 * x);
    return bosses ? base * (1 + 0.035 * Math.sin(x * 31 + 1) + 0.02 * Math.sin(x * 71)) : base;
  };
  const bordChiffon = x => -0.16 + 0.012 * Math.sin(x * 13 + 0.7) + 0.006 * Math.sin(x * 37);
  const geoMotte = z => {
    const y0 = -0.34, y1 = 0.08;
    const s = Math.min((z.l - 60) / 1.0, (z.h - 6) / (y1 - y0));
    return { s, y1, P: tf(s, z.l / 2 + 0.02 * s, (z.h - (y1 - y0) * s) / 2 - y0 * s) };
  };
  const dessinMotte = matiere => z => {
    const { y1, P } = geoMotte(z), vase = false;
    const out = [], ySol = P(0, 0)[1], yBas = P(0, y1)[1];
    const sol = [];
    for (let i = 0; i <= 30; i++) { const x = z.l * i / 30; sol.push([x, ySol + 1.4 * Math.sin(x / 19) + (vase ? 1.0 * Math.sin(x / 7) : 0)]); }
    out.push(h.path(`${lisse(sol)} L ${f(z.l)} ${f(yBas)} L 0 ${f(yBas)} Z`, sansBord(h.a.hachure(vase ? 'terre' : 'neige'))));
    out.push(h.path(lisse(sol), h.a.arete));
    const xs = []; for (let x = -0.49; x <= 0.43 + 1e-9; x += 0.02) xs.push(x);
    const dessus = [P(-0.505, 0.02), ...xs.map(x => P(x, hMotte(x, vase) + 0.012)), P(0.445, 0.02)];
    out.push(h.path(`${lisse(dessus)} Z`, h.a.blanc));
    out.push(h.path(`${lisse(dessus)} Z`, sansBord(h.a.hachure(vase ? 'terre' : 'neige'))));
    out.push(h.path(lisse(dessus), h.a.contour));
    // Le bout de chiffon noir, sur un bout de la motte seulement (le bout des ailes).
    const cx0 = 0.21, cx1 = 0.43;
    const bout = xs.filter(x => x >= cx0 && x <= cx1);
    const haut = bout.map(x => P(x, hMotte(x, false) - 0.008));
    const bas = bout.slice().reverse().map(x => P(x, hMotte(x, false) + 0.05 + 0.006 * Math.sin(x * 40)));
    out.push(h.path(`${lisse(haut)} L ${pt(P(cx1 + 0.012, 0.0))} ${bas.map(p => `L ${pt(p)}`).join(' ')} Z`, h.a.plein));
    return out.join('\n');
  };

  return {
    ref: '47-03',
    titre: 'L’appelant de fortune',
    desc: 'De côté : le premier canard pris flotte sur l’eau peu profonde ; un bâton fourchu, planté dans la vase devant le poitrail et un peu penché vers l’oiseau, prend le haut du cou dans sa fourche, une branche de chaque côté, juste sous la tête, qui repose dessus et tient droite. De près, de profil : la tête repose sur la fourche, une branche devant le cou, l’autre derrière. En bas : une motte de neige avec un bout de chiffon noir à un bout, pour l’oie des neiges.',
    format: 'pleine',
    disposition: [['cote', 'face'], ['neige']],
    largeurs: [[2.4, 1], [1]],
    hauteurs: [2.1, 1],
    vues: {
      cote: {
        titre: 'De côté',
        dessin: dessinCote,
        renvois: z => {
          const { P } = geoCote(z);
          return [
            { n: 1, rond: [z.l - 18, P(0, 190)[1]], cible: P(-330, 110), texte: 'le premier canard pris' },
            { n: 2, rond: [16, P(0, -150)[1]], cible: P(115, -135), texte: 'bâton planté dans la vase' },
          ];
        },
      },
      face: {
        titre: 'La tête, de profil, de près',
        dessin: dessinFace,
        renvois: z => {
          const { P } = geoFace(z);
          return [
            { n: 3, rond: [14, P(0, 368)[1] - 4], cible: P(-30, 330), texte: 'la tête, plus large, posée sur la fourche' },
            { n: 4, rond: [14, P(0, 190)[1]], cible: P(-9, 249), texte: 'une branche de chaque côté du cou' },
          ];
        },
      },
      neige: {
        titre: 'Motte de neige',
        dessin: dessinMotte('neige'),
        renvois: z => {
          const { P } = geoMotte(z);
          return [
            { n: 5, rond: [14, P(0, -0.26)[1]], cible: P(-0.25, -0.12), texte: 'motte de neige : le corps blanc de l’oie' },
            { n: 6, rond: [z.l - 14, P(0, -0.30)[1]], cible: P(0.33, -0.17), texte: 'bout de chiffon noir : le bout des ailes' },
          ];
        },
      },
    },
  };
};
