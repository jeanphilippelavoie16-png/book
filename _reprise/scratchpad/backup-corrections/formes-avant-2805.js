// formes.js — la bibliothèque de formes des planches : mains, personnages, fil, corde et filet.
//
// Branchée dans composer-planche.js : une description y accède par h.formes. Une main, une tête,
// une corde ne se dessinent plus à main levée planche par planche : elles se construisent par
// ces fonctions, pour avoir partout les mêmes proportions et le même trait. La feuille d'essai
// images/planches-src/_formes-essai.js les montre toutes ; _formes-essai-mains.js, -corps.js et
// -fil.js les montrent en grand.
//
//   main({ x, y, pose, vue, cote, echelle, angle, diametre, bras, objet, trait, serre, inclinaison })
//   personnage({ x, y, pose, echelle, cote, angle, penche, regard, mains, prises, age, rendu, enceinte, trait })
//              le pictogramme (règle 8) : debout · penche · accroupi · assis · assis-sol · couche ·
//              genoux · genou · portage · tire ; age 'adulte' · 'enfant'
//   tete({ x, y, echelle, angle, cote, trait, age, cheveux, sourcil, cou })   age 'adulte' · 'enfant' · 'bebe'
//   buste({ x, y, echelle, angle, cote, regard, trait, age, cheveux, col, main, mainLoin, coupe })
//              main : les options d'une main() que le bras va chercher, l'avant-bras bord à bord
//   corde(pts, { ep, debut, fin, fleche, torons, passages, jeu, trait }) · cordes([brin, …], options)
//   aiguilleFilet({ x, y, longueur, angle, chargee }) · moule({ x, y, longueur, largeur, angle })
//   maille({ x, y, echelle, ep, fleche, jeu, trait })
//
// Chaque fonction rend un objet qui se colle comme une chaîne (join, gabarit `${}`) et qui porte
// la géométrie utile, en coordonnées de la vue : m.trou (où se dessine l'objet tenu), m.poignet…
// Les formes sont peintes en blanc : ce qui est dessiné avant est caché là où elles passent devant.
//
// L'objet tenu : le plus simple est de le passer par objet (du SVG), la main le peint à sa place.
// Sinon, l'ordre compte, et il suit la profondeur :
//   prise / dos, prise / paume, boule   l'objet AVANT la main (il passe derrière les doigts) ;
//   prise / profil                      le bout du manche APRÈS la main : il vient vers l'œil. La
//                                       main peint déjà le fond blanc du trou (une hachure est
//                                       transparente) ;
//   pince / profil                      par objet : il se glisse entre l'index et le pouce.
//
//   const m = h.formes.main({ x: 200, y: 180, pose: 'prise', vue: 'profil', diametre: 34 });
//   out.push(m, h.cercle(m.trou.x, m.trou.y, m.trou.r, h.a.hachure('bois', 'contour')));
//
// Le trait suit la hiérarchie du livre : la silhouette sort à ~1,5 (un 2,4 dont la forme recouvre
// la moitié intérieure), les contours intérieurs à 0,7, les ongles et les plis à 0,5.
// trait: 'fort' monte d'un cran (silhouette ~1,9, intérieur 1,4, plis 0,7).
//
// Unités internes : des millimètres d'adulte ; echelle = unités de vue par mm. À echelle 1, une
// main fait 190 du poignet au bout du majeur ; un personnage debout, 1750 (l'enfant, 1100).

'use strict';

module.exports = function formes(h) {
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const f1 = v => Math.round(v * 10) / 10;
  const trait = ep => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const FOND = `fill="${BLANC}" stroke="none"`;

  // ─── géométrie ────────────────────────────────────────────────────────────────────────
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const lon = a => Math.hypot(a[0], a[1]);
  const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const gau = u => [u[1], -u[0]];                 // à gauche du sens de marche (y vers le bas)
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const crx = (a, b) => a[0] * b[1] - a[1] * b[0];
  const RAD = Math.PI / 180;
  const dirA = deg => [Math.cos(deg * RAD), Math.sin(deg * RAD)];
  const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const angleDe = (a, b) => Math.atan2(crx(a, b), dot(a, b)) / RAD;   // + : sens horaire à l'écran
  const borne = (v, a, b) => Math.max(a, Math.min(b, v));
  function inter(p, u, q, v) {
    const d = crx(u, v);
    if (Math.abs(d) < 1e-6) return null;
    return add(p, mul(u, crx(sub(q, p), v) / d));
  }
  const cubique = (a, b, c, d, t) => {
    const m = 1 - t;
    return [m * m * m * a[0] + 3 * m * m * t * b[0] + 3 * m * t * t * c[0] + t * t * t * d[0],
            m * m * m * a[1] + 3 * m * m * t * b[1] + 3 * m * t * t * c[1] + t * t * t * d[1]];
  };
  const quad = (a, c, b, t) => { const m = 1 - t; return [m * m * a[0] + 2 * m * t * c[0] + t * t * b[0], m * m * a[1] + 2 * m * t * c[1] + t * t * b[1]]; };

  // Un chemin est une liste de commandes absolues : ['M', p] ['L', p] ['Q', c, p] ['C', c1, c2, p] ['Z'].
  // Il se construit dans un repère propre (mm, ancre en 0 0) et passe par T pour aller dans la vue.
  const ser = (cmds, T) => cmds.map(c => c[0] + c.slice(1).map(p => { const q = T(p); return `${f1(q[0])} ${f1(q[1])}`; }).join(' ')).join(' ');
  function repere({ x = 0, y = 0, echelle = 1, angle = 0, miroir = false }) {
    return p => {
      const q = tourne(mul(miroir ? [-p[0], p[1]] : p, echelle), angle);
      return [x + q[0], y + q[1]];
    };
  }
  // Un résultat : se colle comme une chaîne, porte sa géométrie.
  const forme = (svg, info = {}) => Object.assign({ svg, toString() { return svg; } }, info);
  // Lissage : une suite de points devient une courbe qui passe par chacun (Catmull-Rom).
  function lisse(pts, ferme = false) {
    const n = pts.length, cmds = [['M', pts[0]]];
    const P = i => ferme ? pts[(i + n) % n] : pts[borne(i, 0, n - 1)];
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      cmds.push(['C', add(p1, mul(sub(p2, p0), 1 / 6)), sub(p2, mul(sub(p3, p1), 1 / 6)), p2]);
    }
    if (ferme) cmds.push(['Z']);
    return cmds;
  }
  const suite = (...listes) => listes.flatMap((l, i) => i ? l.slice(1) : l);   // colle des chemins bout à bout

  // ─── le tube : un doigt, un pouce, un bras, une jambe ────────────────────────────────
  // Une chaîne d'os P0…Pn. Chaque segment a sa demi-épaisseur côté dos et côté ventre, au début
  // et à la fin. Là où la chaîne plie, le côté extérieur fait une jointure arrondie (l'os qui
  // saille) et le côté intérieur un pli net : c'est ce qui sépare un doigt d'une saucisse. Le
  // ventre de chaque phalange bombe un peu (le coussinet).
  //   sens    +1 : le dos est à gauche du sens de marche ; -1 : à droite
  //   bout    'doigt' · 'rond' · 'phalange' (jointure pliée vue de dessus) · 'plat' · 'ouvert'
  //   ongle   'cote' (vu de profil) · 'dessus' (vu du dos) · null
  //   base    de combien le blanc s'enfonce sous la pièce voisine (la paume), sans trait
  //   ouvre   { dos, ventre } : le trait de chaque bord ne commence qu'à tant de mm de P0
  //           (un doigt vu du dos ne se détache de la paume qu'à la commissure)
  function tube(o) {
    const { pts, dos, ventre, sens = 1, coussin = [], bosseDos = [], bout = 'doigt', ongle = null,
      base = 0, plis = false, rides = [], baseRonde = false, ouvre = null } = o;
    const n = pts.length - 1;
    const U = [], N = [];
    for (let i = 0; i < n; i++) { const u = uni(sub(pts[i + 1], pts[i])); U.push(u); N.push(mul(gau(u), sens)); }
    function bord(s) {
      const W = s > 0 ? dos : ventre;
      const seg = [];
      for (let i = 0; i < n; i++) {
        const on = mul(N[i], s);
        seg.push({ a: add(pts[i], mul(on, W[i][0])), b: add(pts[i + 1], mul(on, W[i][1])), u: U[i], o: on,
          bom: s < 0 ? (coussin[i] || 0) : (bosseDos[i] || 0) });
      }
      const jn = [];
      for (let j = 1; j < n; j++) {
        const A = seg[j - 1], B = seg[j];
        const vers = dot(B.u, A.o);
        const K = inter(A.a, A.u, B.a, B.u);
        const lim = 2.6 * Math.max(W[j][0], W[j - 1][1], 3);
        const ok = K && lon(sub(K, pts[j])) < lim;
        if (vers > 0.03 && ok && dot(sub(K, A.a), A.u) > 1 && dot(sub(B.b, K), B.u) > 1) {
          A.b = K; B.a = K; jn.push({ t: 'pli', K, j });
        } else if (vers < -0.03 && ok) jn.push({ t: 'coude', K, j });
        else jn.push({ t: 'lisse', j });
      }
      return { seg, jn };
    }
    const D = bord(1), Vb = bord(-1);
    const ctrl = sg => add(lerp(sg.a, sg.b, 0.5), mul(sg.o, 2 * sg.bom));
    const arete = (sg, rev) => {
      const q = rev ? sg.a : sg.b;
      return sg.bom ? [['Q', ctrl(sg), q]] : [['L', q]];
    };
    const joint = (A, B, jn, rev) => {
      if (jn.t === 'pli') return [];
      const [p, up, q, uq] = rev ? [B.a, mul(B.u, -1), A.b, mul(A.u, -1)] : [A.b, A.u, B.a, B.u];
      const d = lon(sub(q, p));
      if (d < 0.3) return [['L', q]];
      if (jn.t === 'coude') {
        const k = Math.min(lon(sub(jn.K, p)), lon(sub(jn.K, q))) * 0.62;
        return [['C', add(p, mul(up, k)), sub(q, mul(uq, k)), q]];
      }
      return [['C', add(p, mul(up, d / 3)), sub(q, mul(uq, d / 3)), q]];
    };
    const L0 = lon(sub(pts[1], pts[0]));
    const tD = ouvre ? borne((ouvre.dos || 0) / L0, 0, 0.9) : 0;
    const tV = ouvre ? borne((ouvre.ventre || 0) / L0, 0, 0.9) : 0;
    // bord du dos, de la base au bout ; bord du ventre, du bout à la base
    const dosC = (t0) => {
      const s0 = D.seg[0], out = [];
      let p0 = s0.a;
      if (t0) { if (s0.bom) { const c = ctrl(s0); p0 = quad(s0.a, c, s0.b, t0); out.push(['Q', lerp(c, s0.b, t0), s0.b]); } else { p0 = lerp(s0.a, s0.b, t0); out.push(['L', s0.b]); } }
      else out.push(...arete(s0, false));
      for (let i = 1; i < n; i++) { out.push(...joint(D.seg[i - 1], D.seg[i], D.jn[i - 1], false)); out.push(...arete(D.seg[i], false)); }
      return { p0, out };
    };
    const ventreC = (t0) => {
      const out = [];
      for (let i = n - 1; i >= 1; i--) { out.push(...arete(Vb.seg[i], true)); out.push(...joint(Vb.seg[i - 1], Vb.seg[i], Vb.jn[i - 1], true)); }
      const s0 = Vb.seg[0];
      if (t0) { if (s0.bom) { const c = ctrl(s0); out.push(['Q', lerp(c, s0.b, t0), quad(s0.a, c, s0.b, t0)]); } else out.push(['L', lerp(s0.a, s0.b, t0)]); }
      else out.push(...arete(s0, true));
      return out;
    };
    // le bout
    const A = D.seg[n - 1].b, B = Vb.seg[n - 1].b, u = U[n - 1], w = lon(sub(A, B));
    const k = { doigt: [0.74, 0.6], rond: [0.67, 0.67], phalange: [0.42, 0.42] }[bout] || [0, 0];
    const cap = k[0] ? ['C', add(A, mul(u, k[0] * w)), add(B, mul(u, k[1] * w)), B] : null;
    const D0 = D.seg[0].a, V0 = Vb.seg[0].a, u0 = U[0], wb = lon(sub(D0, V0));
    const capBase = ['C', sub(V0, mul(u0, 0.67 * wb)), sub(D0, mul(u0, 0.67 * wb)), D0];
    // le trait
    const dT = dosC(tD);
    const tr = [['M', dT.p0], ...dT.out];
    if (cap) tr.push(cap); else if (bout === 'plat') tr.push(['L', B]); else tr.push(['M', B]);
    tr.push(...ventreC(tV));
    if (baseRonde) tr.push(capBase);
    // le blanc
    const dF = dosC(0);
    const re = baseRonde
      ? [['M', D0], ...dF.out, cap || ['L', B], ...ventreC(0), capBase, ['Z']]
      : [['M', sub(D0, mul(u0, base))], ['L', D0], ...dF.out, cap || ['L', B], ...ventreC(0), ['L', sub(V0, mul(u0, base))], ['Z']];
    const det = [];
    if (plis) for (const jn of Vb.jn) if (jn.t === 'pli') {
      const P = pts[jn.j], v = sub(P, jn.K), l = lon(v);
      det.push([['M', jn.K], ['L', add(jn.K, mul(uni(v), Math.min(3.2, l * 0.45)))]]);
    }
    for (const r of rides) {
      const j = r.j, P = pts[j], uu = uni(add(U[j - 1] || U[j], U[j] || U[j - 1])), nn = gau(uu);
      const hw = (dos[j] ? dos[j][0] : dos[j - 1][1]) * (r.l || 0.5);
      for (let q = 0; q < (r.n || 1); q++) {
        const c = add(P, mul(uu, (q - ((r.n || 1) - 1) / 2) * 2.2));
        det.push([['M', add(c, mul(nn, hw))], ['Q', add(c, mul(uu, 1.6)), sub(c, mul(nn, hw))]]);
      }
    }
    if (ongle) {
      const P = pts[n - 1], L = lon(sub(pts[n], P)), o1 = N[n - 1];
      const dw = s => dos[n - 1][0] + (dos[n - 1][1] - dos[n - 1][0]) * s;
      if (ongle === 'cote') {
        const N0 = add(add(P, mul(u, 0.4 * L)), mul(o1, dw(0.4)));
        const E = cubique(A, cap ? cap[1] : A, cap ? cap[2] : B, B, 0.16);
        det.push([['M', N0], ['C', add(add(P, mul(u, 0.5 * L)), mul(o1, dw(0.5) - 2.3)), add(add(P, mul(u, 0.88 * L)), mul(o1, dw(0.88) - 2.1)), E]]);
      } else {
        const hw = dw(0.7) * 0.5, s0 = 0.46 * L, s1 = 0.58 * L, s2 = 0.96 * L;
        const at = (s, t) => add(add(P, mul(u, s)), mul(o1, t));
        det.push([['M', at(s2, hw)], ['L', at(s1, hw)], ['C', at(s0, hw), at(s0, -hw), at(s1, -hw)], ['L', at(s2, -hw)]]);
      }
    }
    return { remp: re, trait: [tr], det };
  }
  // Le point d'un bord du tube à s mm de P0 le long de la chaîne (cote +1 dos, -1 ventre).
  function pointBord(pts, W, sens, cote, s) {
    let i = 0, acc = 0;
    while (i < pts.length - 2 && acc + lon(sub(pts[i + 1], pts[i])) < s) { acc += lon(sub(pts[i + 1], pts[i])); i++; }
    const L = lon(sub(pts[i + 1], pts[i])), t = borne((s - acc) / L, 0, 1);
    const nrm = mul(gau(uni(sub(pts[i + 1], pts[i]))), sens * cote);
    return add(lerp(pts[i], pts[i + 1], t), mul(nrm, W[i][0] + (W[i][1] - W[i][0]) * t));
  }

  // Peint une liste de pièces, de la plus lointaine à la plus proche.
  // Passe 1 : la silhouette, un 2,4 sous tout. Passe 2 : chaque pièce, son blanc, son trait, ses détails.
  // objet : du SVG glissé entre les pièces, à la couche `couche` (0 : derrière tout).
  function peindre(pieces, T, fort = false, objet = '', couche = 0) {
    const eI = fort ? 1.4 : 0.7, eD = fort ? 0.7 : 0.5;
    const out = [];
    if (objet && couche <= 0) out.push(objet);
    for (const p of pieces) if (p.silhouette !== false) for (const t of p.trait) out.push(`<path d="${ser(t, T)}" ${trait(2.4)}/>`);
    pieces.forEach((p, i) => {
      if (objet && couche > 0 && i === couche) out.push(objet);
      if (p.remp) out.push(`<path d="${ser(p.remp, T)}" ${p.noir ? `fill="${NOIR}" stroke="none"` : FOND}/>`);
      for (const t of p.trait) out.push(`<path d="${ser(t, T)}" ${trait(p.ep || eI)}/>`);
      for (const d of p.det || []) out.push(`<path d="${ser(d, T)}" ${trait(p.epDet || eD)}/>`);
    });
    if (objet && couche >= pieces.length) out.push(objet);
    return out.join('\n');
  }

  // ─── la main ──────────────────────────────────────────────────────────────────────────
  // Longueurs des phalanges (mm) et épaisseurs aux jointures, de la base au bout.
  const DG = {
    index:       { ph: [43, 25, 21], ep: [19, 16.2, 14.2, 12.2] },
    majeur:      { ph: [46, 28, 22], ep: [19.5, 16.8, 14.8, 12.6] },
    annulaire:   { ph: [43, 27, 21], ep: [18, 15.6, 13.8, 11.8] },
    auriculaire: { ph: [34, 20, 19], ep: [16, 13.6, 12.2, 10.6] },
  };
  const POUCE = { ph: [44, 32, 26] };
  const profilDoigt = ep => ({
    dos: [[ep[0] * 0.44, ep[1] * 0.44], [ep[1] * 0.44, ep[2] * 0.44], [ep[2] * 0.44, ep[3] * 0.44]],
    ventre: [[ep[0] * 0.56, ep[1] * 0.54], [ep[1] * 0.54, ep[2] * 0.54], [ep[2] * 0.54, ep[3] * 0.52]],
    coussin: [0.9, 0.8, 0.9],
  });
  const faceW = ep => [[ep[0] / 2, ep[1] / 2], [ep[1] / 2, ep[2] / 2], [ep[2] / 2, ep[3] / 2]];

  // La tangente qu'on prend depuis P pour s'enrouler autour d'un cercle (centre C, rayon rho).
  function tangente(P, C, rho, sens) {
    const v = sub(C, P), d = lon(v);
    if (d <= rho + 0.01) return uni(tourne(v, -90 * sens));
    return uni(tourne(v, -Math.asin(rho / d) / RAD * sens));
  }
  // Une chaîne qui s'enroule autour d'un cercle : chaque phalange tangente, flexions bornées.
  function enroule(P0, d0, C, rhos, longueurs, sens, maxi) {
    const pts = [P0]; let d = uni(d0), P = P0;
    longueurs.forEach((L, i) => {
      const t0 = tangente(P, C, rhos[i], sens);
      const f = borne(angleDe(d, t0) * sens, 0, maxi[i]);
      d = tourne(d, f * sens); P = add(P, mul(d, L)); pts.push(P);
    });
    return pts;
  }
  // Une chaîne par ses angles de flexion (degrés, dans le sens `sens`) depuis la direction d0.
  function plie(P0, d0, longueurs, flex, sens = 1) {
    const pts = [P0]; let d = uni(d0), P = P0;
    longueurs.forEach((L, i) => { d = tourne(d, flex[i] * sens); P = add(P, mul(d, L)); pts.push(P); });
    return pts;
  }
  // Deux segments dont le bout tombe sur la cible ; la jointure saille du côté `sens`.
  function ik2(P0, L1, L2, cible, sens) {
    const v = sub(cible, P0), d = borne(lon(v), Math.abs(L1 - L2) + 0.01, L1 + L2 - 0.01);
    const a = Math.acos(borne((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1)) / RAD;
    const P1 = add(P0, mul(tourne(uni(v), -a * sens), L1));
    return [P0, P1, add(P1, mul(uni(sub(cible, P1)), L2))];
  }

  const doigtProfil = (pts, ep, sens, opts = {}) => {
    const p = profilDoigt(ep);
    return tube({ pts, dos: p.dos, ventre: p.ventre, coussin: p.coussin, sens, bout: 'doigt', ongle: 'cote', base: 10, plis: true, ...opts });
  };
  const POUCE_FACE = [[12.5, 11], [11, 10.5], [10.5, 8.2]];
  const pouceFace = (pts, o = {}) => tube({ pts, sens: 1, dos: POUCE_FACE, ventre: POUCE_FACE,
    coussin: [0, -0.3, 0.3], bosseDos: [0, -0.3, 0.3], bout: 'rond', ongle: 'dessus', base: 14, ...o });
  const doigtFace = (d, pts, o = {}) => tube({ pts, dos: faceW(d.ep), ventre: faceW(d.ep), coussin: [-0.15, -0.1, 0.15], bosseDos: [-0.15, -0.1, 0.15],
    bout: 'rond', ongle: 'dessus', base: 16, ...o });
  // des détails seuls, peints par-dessus tout (jointures, plis de la paume)
  const traits = (det, ep) => ({ remp: null, trait: [], det, silhouette: false, epDet: ep });
  // les points d'une cubique de A (tangente tA) à B (tangente tB), sans B : un arc sans cassure
  const cubPts = (A, tA, B, tB, kA, kB, n = 5) => { const c1 = add(A, mul(uni(tA), kA)), c2 = sub(B, mul(uni(tB), kB));
    return Array.from({ length: n }, (_, i) => cubique(A, c1, c2, B, i / n)); };
  const arcPts = (r, a0, a1, n = 6) => Array.from({ length: n + 1 }, (_, i) => mul(dirA(a0 + (a1 - a0) * i / n), r));

  // ─── la main de profil, vue du côté du pouce ──────────────────────────────────────────
  // Une seule construction pour toutes les poses de profil. Du plus loin au plus proche :
  //   1. les autres doigts (majeur, annulaire…), derrière l'index ;
  //   2. l'avant-bras, la paume et l'index d'un seul tube : le dos de la main file du poignet à
  //      l'ongle sans cassure, la jointure saille en arrondi, le pli se creuse en dedans ;
  //   3. l'éminence du pouce (le gras de la paume), pièce à part, dessinée par ses deux bords :
  //      aDos mène au bord dos du pouce, aVentre à son bord paume ; fond referme le blanc par
  //      l'intérieur de la paume sans trait ;
  //   4. le pouce, de sa jointure de base au bout.
  const EP_POUCE = { dos: [[10, 9.3], [9.3, 7.4]], ventre: [[11, 10.2], [10.2, 8.2]] };
  function mainProfil(c) {
    const { F, W, ptsI, sensI = 1, autres = [], ptsT, sensT = -sensI, ouvreT = {}, aDos, aVentre, fond, larg,
      traitDos = true, traitVentre = true, anneau = null, index = {} } = c;
    const L = { dF: 21, vF: 22, dW: 18.5, vW: 20.5, dM: DG.index.ep[0] * 0.44, vM: 13, ...larg };
    const pieces = [];
    for (const a of autres) pieces.push(doigtProfil(a.pts, DG[a.nom].ep, sensI, { base: 24, plis: false, ...(a.o || {}) }));
    const pr = profilDoigt(DG.index.ep);
    pieces.push(tube({ pts: [F, W, ...ptsI], sens: sensI,
      dos: [[L.dF, L.dW], [L.dW, L.dM], ...pr.dos], ventre: [[L.vF, L.vW], [L.vW, L.vM], ...pr.ventre],
      coussin: [0, 0, ...(index.coussin || pr.coussin)], bout: 'doigt', ongle: 'cote', plis: index.plis !== false }));
    // l'anneau entre le pouce et l'index : un blanc sans trait, en retrait de ses bords (qui gardent
    // leur épaisseur de silhouette), qui cache les doigts de derrière
    if (anneau) pieces.push({ remp: [...lisse(anneau, true)], trait: [], det: [], silhouette: false });
    const E = EP_POUCE;
    const Td = pointBord(ptsT, E.dos, sensT, 1, ouvreT.dos || 0), Tv = pointBord(ptsT, E.ventre, sensT, -1, 0);
    const Ts = pointBord(ptsT, E.ventre, sensT, -1, ouvreT.ventre || 0);
    const Tdd = pointBord(ptsT, E.dos, sensT, 1, 0);
    const uD = uni(sub(pointBord(ptsT, E.dos, sensT, 1, (ouvreT.dos || 0) + 1), Td));
    const uV = uni(sub(pointBord(ptsT, E.ventre, sensT, -1, (ouvreT.ventre || 0) + 1), Ts));
    const lDos = lisse([...aDos, sub(Td, mul(uD, 5)), Td]);
    const lVen = lisse([...aVentre, sub(Ts, mul(uV, 5)), Ts]);
    const remp = [...lDos, ['L', Tdd], ['L', Tv], ['L', Ts],
      ...lisse([Ts, sub(Ts, mul(uV, 5)), ...aVentre.slice().reverse()]).slice(1), ...fond.map(p => ['L', p]), ['Z']];
    pieces.push({ remp, trait: [traitDos ? lDos : null, traitVentre ? lVen : null].filter(Boolean), det: [] });
    pieces.push(tube({ pts: ptsT, sens: sensT, dos: E.dos, ventre: E.ventre, coussin: [0.8, 1], bout: 'doigt', ongle: 'cote',
      base: 6, plis: true, ouvre: { dos: ouvreT.dos || 0, ventre: ouvreT.ventre || 0 } }));
    return pieces;
  }
  // la distance du centre C à la droite AB, et la normale unitaire de AB tournée vers C
  const versC = (A, B, C) => { const d = uni(sub(B, A)); let n = gau(d); if (dot(sub(C, A), n) < 0) n = mul(n, -1); return { dist: dot(sub(C, A), n), n }; };

  // ── profil : la prise, le manche vu par le bout ──
  // Le poing fermé vu du côté du pouce : le dos de la main en haut, la paume posée sur le manche,
  // l'index qui descend devant et revient dessous ; le pouce couché sous le manche, par-dessus
  // l'index, son bout contre la deuxième phalange. Le manche se voit dans l'anneau.
  function priseProfil(R, o) {
    const C = [0, 0], ep = DG.index.ep;
    const M = [(R + 14.8) * 0.84, -(R + 14.8)];
    const W = add(M, [-80, 3]), F = add(W, [-o.bras, 0]);
    const rh = (e, k) => [R + e[0] * 0.56 - 0.9 + k[0], R + e[1] * 0.54 - 0.9 + k[1], R + e[2] * 0.54 - 0.9 + k[2]];
    const ptsI = enroule(M, sub(M, W), C, rh(ep, [0, 0, 0]), DG.index.ph, 1, [100, 100, 80]);
    // le majeur, derrière : même tour, mais sa deuxième phalange passe un peu plus bas
    const ptsM = enroule(add(M, [0.5, 0.5]), sub(M, W), C, rh(DG.majeur.ep, [0, 4.5, 4.5]), DG.majeur.ph, 1, [100, 100, 80]);
    // le pouce couché sous le manche, mince ; son bout s'arrête sur la deuxième phalange de l'index
    const rT = R + 7.5, th = 128, u1 = dirA(th - 90);
    const Tm = sub(mul(dirA(th), rT), mul(u1, POUCE.ph[1] / 2));
    const ptsT = enroule(Tm, u1, C, [rT, rT - 1], [POUCE.ph[1], POUCE.ph[2] * 0.92], -1, [2, 34]);
    const Td = add(Tm, mul(gau(u1), -EP_POUCE.dos[0][0]));
    // l'éminence : un arc sans cassure, du dessous du poignet au dos du pouce
    const A0 = add(W, [-30, 20.6]), k = lon(sub(Td, A0));
    const aDos = cubPts(A0, dirA(4), Td, u1, k * 0.5, k * 0.36, 6);
    const aVentre = arcPts(R - 0.8, 242, 160, 3);
    const fond = [add(aVentre[0], [0, -5]), add(W, [8, 12]), add(A0, [0, -7])];
    const pieces = mainProfil({ F, W, ptsI, ptsT, autres: [{ nom: 'majeur', pts: ptsM, o: { ouvre: { ventre: 80, dos: 50 } } }],
      ouvreT: { ventre: 26 }, aDos, aVentre, fond });
    // le bout du manche vient vers l'œil : la main peint le fond blanc du trou, le manche se
    // dessine après elle (ou passe par objet, qui se peint par-dessus)
    pieces.push({ remp: [...lisse(arcPts(R, 0, 360, 12), true)], trait: [], det: [], silhouette: false });
    return { pieces, trou: { x: 0, y: 0, r: R }, poignet: W, bras: F, couche: 99 };
  }

  // ── profil : la boule tenue dans le « C » du pouce et des doigts ──
  // La main sous la pierre, la paume tournée vers elle, vue du côté du pouce : le pouce couché
  // dessus, l'index et le majeur passés dessous, la pierre calée dans la palmure. Le devant de la
  // pierre reste libre. serre (0 à 1,3) : de combien les doigts s'enroulent.
  function bouleProfil(R, o) {
    const C = [0, 0], ep = DG.index.ep, serre = o.serre == null ? 1 : o.serre;
    const uF = dirA(25), vn = gau(uF);            // sensI = -1 : la paume regarde la pierre
    let M = mul(dirA(112), R + 14), W = sub(M, mul(uF, 72));
    for (let i = 0; i < 3; i++) {                 // la paume tangente à la pierre
      const { dist, n } = versC(add(W, mul(vn, 20.5)), add(M, mul(vn, 13)), C);
      const d = mul(n, dist - (R + 0.4)); M = add(M, d); W = add(W, d);
    }
    const F = sub(W, mul(uF, o.bras));
    const rh = (e, k) => [R + e[0] * 0.56 + 0.3, R + e[1] * 0.54 + 0.3, R + e[2] * 0.54 + 0.3].map(r => r * k);
    const ptsI = enroule(M, uF, C, rh(ep, 1), DG.index.ph, -1, [60, 45, 30].map(a => a * serre));
    const M2 = add(M, add(mul(uF, 4), mul(vn, -4)));
    const ptsM = enroule(M2, uF, C, rh(DG.majeur.ep, 1.02), DG.majeur.ph, -1, [60, 52, 35].map(a => a * serre));
    // le pouce : son métacarpien part du poignet, côté paume ; ses phalanges se couchent sur la pierre
    const T0 = add(add(W, mul(uF, 20)), mul(vn, 13));
    const rT = R + 10.5;
    let best = null;
    for (let th = 230; th <= 290; th += 1) {
      const u1 = dirA(th + 90), Tm = sub(mul(dirA(th), rT), mul(u1, POUCE.ph[1] / 2));
      const e = Math.abs(lon(sub(Tm, T0)) - 46);
      if (!best || e < best.e) best = { e, th, u1, Tm };
    }
    const ptsT = enroule(best.Tm, best.u1, C, [rT, rT - 1], POUCE.ph.slice(1), 1, [2, 28]);
    const uMeta = uni(sub(best.Tm, T0)), nMeta = gau(uMeta);
    const A0 = add(sub(W, mul(uF, 14)), mul(vn, 20.8));
    // le col entre l'avant-bras et le pouce, en creux arrondi
    const D2 = add(add(best.Tm, mul(nMeta, 10.5)), mul(uMeta, -8));
    const kc = lon(sub(D2, A0));
    const aDos = [...cubPts(A0, uF, D2, uMeta, kc * 0.55, kc * 0.45, 5), D2];
    const { n: nP } = versC(add(W, mul(vn, 20.5)), add(M, mul(vn, 13)), C);
    const aP = Math.atan2(-nP[1], -nP[0]) / RAD;
    const aVentre = arcPts(R + 0.4, aP, (best.th > aP ? best.th : best.th + 360) - 10, 5);
    const fond = [add(aVentre[0], mul(vn, -5)), add(W, mul(vn, 12)), add(A0, mul(vn, -7))];
    const pieces = mainProfil({ F, W, ptsI, sensI: -1, autres: [{ nom: 'majeur', pts: ptsM, o: { ouvre: { dos: 26 } } }], ptsT, sensT: 1,
      ouvreT: { ventre: POUCE.ph[1] / 2 }, aDos, aVentre, fond });
    return { pieces, trou: { x: 0, y: 0, r: R }, poignet: W, bras: F };
  }

  // ── profil : la pince, le bout du pouce contre le bout de l'index ──
  // Le dos de la main en haut, l'index qui s'arrondit vers le bas, le pouce qui monte à sa
  // rencontre : l'anneau entre les deux fait reconnaître le geste. Derrière, le majeur,
  // l'annulaire et l'auriculaire repliés de plus en plus : c'est eux qui font une main et
  // pas une pince de homard. trou : le point pincé (le bout de l'index).
  function pinceProfil(o) {
    const W = [0, 0], F = [-o.bras, 0], M = [80, 2], d0 = [1, 0.03];
    const ptsI = plie(M, d0, DG.index.ph, [30, 55, 30], 1);
    const Q = ptsI[3];
    // les trois autres doigts repliés serré dans la paume : cachés derrière la palmure
    const autres = [['auriculaire', [-19, 9], [96, 105, 70]], ['annulaire', [-11, 6], [94, 105, 70]], ['majeur', [-4, 3.5], [92, 105, 70]]]
      .map(([nom, dM, flex]) => ({ nom, pts: plie(add(M, dM), d0, DG[nom].ph, flex, 1), o: { ouvre: { dos: 30 } } }));
    // le pouce : il sort du gras de la paume, plie à sa jointure et vient buter sous le bout de l'index
    const T0 = [28, 27], Tm = add(T0, mul(dirA(34), 40));
    const [, T2, T3] = ik2(Tm, POUCE.ph[1], POUCE.ph[2], add(Q, [1, 3]), -1);
    const ptsT = [Tm, T2, T3];
    const uT = uni(sub(T2, Tm));
    const Td = add(Tm, mul(gau(uT), -EP_POUCE.dos[0][0]));
    const A0 = add(W, [-30, 20.8]), k = lon(sub(Td, A0));
    const aDos = cubPts(A0, dirA(5), Td, dirA(34), k * 0.45, k * 0.3, 5);
    // la palmure, opaque, du milieu de la première phalange de l'index à celle du pouce
    const pr = profilDoigt(DG.index.ep);
    const sI = 28, sT = 14;
    const Wb = pointBord(ptsI, pr.ventre, 1, -1, sI), Ts = pointBord(ptsT, EP_POUCE.ventre, -1, -1, sT);
    // la palmure part dans le prolongement du bord de l'index et arrive dans celui du pouce : un U
    const uP = uni(sub(ptsI[1], ptsI[0])), kW = lon(sub(Ts, Wb));
    const aVentre = cubPts(Wb, mul(uP, -1), Ts, uni(sub(ptsT[1], ptsT[0])), kW * 0.75, kW * 0.6, 5);
    const creux = aVentre[3];
    const fond = [add(Wb, [-2, -7]), add(M, [0, 4]), add(W, [8, 12]), add(A0, [0, -7])];
    const LI = DG.index.ph.reduce((a, b) => a + b), LT = POUCE.ph[1] + POUCE.ph[2], r = 2.6;
    const vI = pr.ventre.map(w => w.map(v => v + r)), vT = EP_POUCE.ventre.map(w => w.map(v => v + r));
    const anneau = [];
    for (let q = sI + 3; q <= LI - 9; q += 5) anneau.push(pointBord(ptsI, vI, 1, -1, q));
    for (let q = LT - 8; q >= sT + 3; q -= 5) anneau.push(pointBord(ptsT, vT, -1, -1, q));
    const cA = anneau.reduce((a, p) => add(a, mul(p, 1 / anneau.length)), [0, 0]);
    anneau.push(add(creux, mul(uni(sub(cA, creux)), r)));
    const pieces = mainProfil({ F, W, ptsI, autres, ptsT, ouvreT: { ventre: sT }, aDos, aVentre, fond, anneau, index: { coussin: [2.2, 2, 1.8], plis: false } });
    return { pieces, trou: { x: Q[0], y: Q[1], r: 0 }, poignet: W, bras: F, couche: pieces.length - 2 };
  }

  // ── profil : la paume à plat qui appuie (la surface est la ligne y = 0) ──
  // Le poignet cassé vers le haut, le talon de la main et les doigts sur la surface, le pouce
  // couché devant, ongle en haut. Le majeur, plus long, dépasse l'index au bout.
  function appuiProfil(o) {
    const inc = o.inclinaison == null ? 50 : o.inclinaison;
    const W = [-50, -26], M = [40, -14.2];
    const F = add(W, mul(dirA(180 + inc), o.bras));
    const ptsI = [M, [82, -9.4], [106.5, -8.3], [127, -7.2]];
    const autres = [{ nom: 'majeur', pts: [[44, -15.2], [89.5, -9.9], [117, -8.8], [138.5, -7.6]] }];
    const ptsT = [[4, -10.6], [35.5, -9.6], [60.5, -8.3]];
    const uF = uni(sub(W, F)), vn = mul(gau(uF), -1);
    const A0 = add(sub(W, mul(uF, 16)), mul(vn, 24.3));
    // le bord paume : le talon qui s'écrase sur la surface, puis le dessous du pouce
    const aVentre = [A0, [-62, -6], [-48, 0], [-20, 0.2]];
    // le bord dos du pouce : il remonte le long du métacarpien jusqu'au poignet et s'y perd
    const aDos = [[-34, -20], [-18, -19.5]];
    const fond = [add(W, mul(vn, 10)), [-36, -24]];
    const pieces = mainProfil({ F, W, ptsI, autres, ptsT, sensT: 1, aDos, aVentre, fond,
      larg: { dF: 22, vF: 21, dW: 17, vW: 24, dM: 9, vM: 12.5 } });
    return { pieces, trou: { x: 0, y: 0, r: 0 }, poignet: W, bras: F };
  }

  // ── dos : la main à plat vue de dessus (doigts vers la droite, pouce en haut) ──
  // Les doigts serrés, à peine écartés, le majeur le plus long ; le pouce ouvert d'une
  // quarantaine de degrés ; la palmure du pouce en creux ; le bord de l'auriculaire qui file
  // jusqu'au poignet.
  function appuiDos(o) {
    const pieces = [], Wx = -92, cut = Wx - o.bras;
    const doigts = [['index', [0, -27.5], -2.5], ['majeur', [4.5, -8.8], -0.3], ['annulaire', [1, 9.6], 2.2], ['auriculaire', [-9, 26.8], 5.5]]
      .map(([nom, P0, a]) => ({ nom, d: { ...DG[nom], ep: DG[nom].ep.map(v => v * 1.07) }, pts: plie(P0, dirA(a), DG[nom].ph, [0, 1, 0.8], 1) }));
    const ptsP = [[Wx + 10, -21], add([Wx + 10, -21], mul(dirA(-38), 44))];
    ptsP.push(add(ptsP[1], mul(dirA(-24), POUCE.ph[1])));
    ptsP.push(add(ptsP[2], mul(dirA(-17), POUCE.ph[2])));
    const wP = [[13.5, 11.5], [11, 10.5], [10.5, 8.4]];
    const bP = s => pointBord(ptsP, wP, 1, 1, s), vP = s => pointBord(ptsP, wP, 1, -1, s);
    const wF = g => faceW(g.d.ep);
    const bI = s => pointBord(doigts[0].pts, wF(doigts[0]), 1, 1, s);
    const vA = s => pointBord(doigts[3].pts, wF(doigts[3]), 1, -1, s);
    const sW = 21;
    // le bord du pouce continue celui de l'avant-bras ; la palmure du pouce ; le bord cubital
    const haut = lisse([[cut, -30.5], [Wx - 8, -29.5], bP(0)]);
    const web1 = lisse([vP(58), [-2, -45], bI(5)]);
    const cubital = lisse([vA(8), [12, 37.5], [-20, 38.5], [-55, 35], [Wx, 30], [cut, 31.5]]);
    const webs = [];
    for (let i = 0; i < 3; i++) {
      const a = doigts[i], b = doigts[i + 1];
      const pa = pointBord(a.pts, wF(a), 1, -1, sW), pb = pointBord(b.pts, wF(b), 1, 1, sW);
      const fondW = lerp(pointBord(a.pts, wF(a), 1, -1, sW - 4), pointBord(b.pts, wF(b), 1, 1, sW - 4), 0.5);
      webs.push([['M', pa], ['Q', fondW, pb]]);
    }
    const remp = [...lisse([[cut, -30.5], [Wx - 8, -29.5], bP(0), vP(40), vP(58), [-2, -45], bI(5), [30, -30], [40, 0], [30, 30], vA(8), [12, 37.5], [-20, 38.5], [-55, 35], [Wx, 30], [cut, 31.5]]), ['Z']];
    // les têtes des métacarpiens, à peine marquées
    const nodes = doigts.slice(0, 3).map(g => { const p = g.pts[0], w = g.d.ep[0] * 0.28; return [['M', add(p, [-2, -w])], ['Q', add(p, [2.5, 0]), add(p, [-2, w])]]; });
    pieces.push({ remp, trait: [haut, web1, cubital, ...webs], det: [] });
    doigts.forEach((g, i) => pieces.push(doigtFace(g.d, g.pts, { ouvre: { dos: i === 0 ? 5 : sW, ventre: i === 3 ? 8 : sW } })));
    pieces.push(pouceFace(ptsP, { dos: wP, ventre: wP, ouvre: { dos: 0, ventre: 58 } }));
    pieces.push(traits(nodes, 0.5));
    return { pieces, trou: { x: 0, y: 0, r: 0 }, poignet: [Wx, 0], bras: [cut, 0] };
  }

  // ── dos : la prise vue du dos de la main (le manche passe derrière le poing) ──
  function priseDos(R, o) {
    const pieces = [], Wx = -88, cut = Wx - o.bras;
    const ptsP = [[-80, -17], [-40, -37], [-8, -45], [14 + 0.3 * R, -41]];
    const wD = [[11, 10], [10, 9.5], [9.5, 7.5]], wV = [[14, 10.5], [10.5, 10], [10, 8]];
    const bP = pointBord(ptsP, wD, 1, 1, 0);
    const bandes = [
      ['auriculaire', [-9, 28.5], [17 + 0.3 * R, 29]],
      ['annulaire', [0, 11], [27 + 0.3 * R, 11.5]],
      ['majeur', [3, -7.5], [31 + 0.3 * R, -7.5]],
      ['index', [0, -26.5], [27 + 0.3 * R, -26]],
    ];
    const wA = DG.auriculaire.ep[0] / 2;
    const cubital = lisse([add(bandes[0][1], [2, wA]), [-26, 37.5], [-56, 33.5], [Wx, 29], [cut, 34]]);
    const remp = [...lisse([[cut, -33], [Wx, -28], bP, [-40, -30], [-10, -36], [8, -30], [10, 0], [6, 34], add(bandes[0][1], [2, wA]), [-26, 37.5], [-56, 33.5], [Wx, 29], [cut, 34]]), ['Z']];
    pieces.push({ remp, trait: [lisse([[cut, -33], [Wx - 12, -29.5], bP]), cubital], det: [] });
    const arcs = [];
    for (const [nom, a, b] of bandes) {
      const d = DG[nom], w = d.ep[0] / 2, w1 = d.ep[1] / 2 + 0.4;
      pieces.push(tube({ pts: [a, b], dos: [[w, w1]], ventre: [[w, w1]], bout: 'phalange', base: 14, coussin: [0.4], bosseDos: [0.4],
        ouvre: nom === 'auriculaire' ? { ventre: 2 } : null }));
      arcs.push([['M', add(a, [3.5, -w * 0.5])], ['Q', add(a, [-1.2, 0]), add(a, [3.5, w * 0.5])]]);
    }
    pieces.push(tube({ pts: ptsP, sens: 1, dos: wD, ventre: wV, coussin: [0, 0.6, 0.8], bout: 'doigt', ongle: 'cote', base: 16, ouvre: { ventre: 34 } }));
    pieces.push(traits(arcs));
    return { pieces, trou: { x: 12 - 0.05 * R, y: 0, r: R, pente: -0.22 }, poignet: [Wx, 0], bras: [cut, 0] };
  }

  // ── paume : la prise vue du côté de la paume (les doigts passent devant le manche) ──
  function prisePaume(R, o) {
    const pieces = [], Wx = -92, cut = Wx - o.bras, x0 = 2, pente = 0.22;
    const ptsP = [[-78, 21], [-42, 36], [-10, 30], [R + 4, 16]];
    const vP = s => pointBord(ptsP, POUCE_FACE, 1, -1, s), bP = s => pointBord(ptsP, POUCE_FACE, 1, 1, s);
    const hautP = [[cut, -33], [Wx, -28], [-62, -33.5], [-34, -37.5], [-18, -35]];
    const remp = [...lisse([...hautP, [-10, -20], [-10, 20], bP(34), bP(12), vP(0), [Wx, 30], [cut, 35]]), ['Z']];
    // le pli du pouce : il part de la commissure et contourne l'éminence du pouce
    const pli = lisse([bP(36), [-40, 16], [-62, 12], [-80, 4]]);
    pieces.push({ remp, trait: [lisse(hautP), lisse([vP(0), [Wx, 30.5], [cut, 35]])], det: [pli] });
    const doigts = [['auriculaire', -25.5, 0.8], ['annulaire', -10.2, 0.9], ['majeur', 6.5, 1], ['index', 23.5, 0.93]];
    for (const [nom, y, k] of doigts) {
      const d = DG[nom], xP = x0 + pente * y + R + 11;
      const P1 = [xP, y], P2 = [xP - d.ph[1] * k - 2, y + 0.8], P3 = [P2[0] - d.ph[2] * 0.7, y + 2.2];
      const hw = [d.ep[1] / 2 + 0.5, d.ep[2] / 2 + 0.4, d.ep[3] / 2 + 0.2];
      const W2 = [[hw[0], hw[1]], [hw[1], hw[2]]];
      pieces.push(tube({ pts: [P1, P2, P3], dos: W2, ventre: W2, coussin: [-0.3, 0.2], bosseDos: [-0.3, 0.2], bout: 'rond', ongle: 'dessus', baseRonde: true, rides: [{ j: 1, n: 1, l: 0.45 }] }));
    }
    pieces.push(pouceFace(ptsP, { base: 18, ouvre: { dos: 36, ventre: 0 } }));
    return { pieces, trou: { x: x0, y: 0, r: R, pente }, poignet: [Wx, 0], bras: [cut, 0] };
  }

  // ═══ les mains, deuxième construction (12 octobre) ═══════════════════════════════════
  // Proportions d'une main d'adulte : paume de 96 du poignet à la jointure du majeur, majeur de
  // 94 ; les doigts s'effilent d'un tiers de la base au bout ; le pouce part du bas de la paume,
  // près du poignet. Chaque doigt est un contour lisse (pas de plis) : la jointure se lit par la
  // courbe du dos qui saille, le ventre se creuse un peu à la flexion. Peu de traits intérieurs.
  // lissage centripète : passe par chaque point sans boucle ni dépassement
  function lisseC(pts, ferme = false) {
    const n = pts.length, cmds = [['M', pts[0]]];
    const P = i => ferme ? pts[(i + n) % n] : (i < 0 ? sub(mul(pts[0], 2), pts[1]) : i > n - 1 ? sub(mul(pts[n - 1], 2), pts[n - 2]) : pts[i]);
    const fin = ferme ? n : n - 1;
    for (let i = 0; i < fin; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const d1 = Math.max(1e-3, Math.sqrt(lon(sub(p1, p0)))), d2 = Math.max(1e-3, Math.sqrt(lon(sub(p2, p1)))), d3 = Math.max(1e-3, Math.sqrt(lon(sub(p3, p2))));
      const b1 = mul(add(add(mul(p2, d1 * d1), mul(p0, -d2 * d2)), mul(p1, 2 * d1 * d1 + 3 * d1 * d2 + d2 * d2)), 1 / (3 * d1 * (d1 + d2)));
      const b2 = mul(add(add(mul(p1, d3 * d3), mul(p3, -d2 * d2)), mul(p2, 2 * d3 * d3 + 3 * d3 * d2 + d2 * d2)), 1 / (3 * d3 * (d3 + d2)));
      cmds.push(['C', b1, b2, p2]);
    }
    if (ferme) cmds.push(['Z']);
    return cmds;
  }
  const D2 = {
    index:       { ph: [41, 25, 20], w: [9.4, 8.3, 7.4, 6.5] },
    majeur:      { ph: [45, 27, 21], w: [9.7, 8.6, 7.6, 6.7] },
    annulaire:   { ph: [42, 26, 20], w: [9.2, 8.1, 7.2, 6.3] },
    auriculaire: { ph: [32, 20, 18], w: [8.2, 7.1, 6.3, 5.6] },
    pouce:       { ph: [44, 31, 25], w: [12.5, 11, 10, 8.6] },
  };
  // la chaîne d'un doigt : ses points, la dernière phalange raccourcie du rayon du bout
  function chaine2(nom, P0, d0, flex, sens = 1, k = 1) {
    const d = D2[nom], ph = d.ph.map((L, i) => (i === d.ph.length - 1 ? L - d.w[d.w.length - 1] : L) * k);
    return plie(P0, d0, ph, flex, sens);
  }
  // Un doigt : contour lisse d'une chaîne (pts) et de ses demi-largeurs (w, une par point).
  //   sens   +1 : le dos à gauche du sens de marche
  //   ouvre  { dos, ventre } : mm depuis P0 où le trait commence sur chaque bord (dessous : caché)
  //   ongle  'dessus' · 'cote' · null ; base : de combien le blanc recule sous la pièce voisine
  function doigt2(pts, w, o = {}) {
    const { sens = 1, ouvre = {}, ongle = null, base = 12, coupe = false, baseRonde = false } = o;
    const n = pts.length - 1;
    const U = []; for (let i = 0; i < n; i++) U.push(uni(sub(pts[i + 1], pts[i])));
    const S = [0]; for (let i = 0; i < n; i++) S.push(S[i] + lon(sub(pts[i + 1], pts[i])));
    const dos = [], ven = [];
    const pousse = (P, u, wd, wv, s) => { const nn = mul(gau(u), sens); dos.push({ p: add(P, mul(nn, wd)), s }); ven.push({ p: sub(P, mul(nn, wv)), s }); };
    for (let i = 0; i <= n; i++) {
      const u = i === 0 ? U[0] : i === n ? U[n - 1] : uni(add(U[i - 1], U[i]));
      let fl = 0;
      if (i > 0 && i < n) fl = borne(angleDe(U[i - 1], U[i]) * sens / 70, -1, 1.4);
      // le dos de la jointure qui saille, le ventre qui se creuse
      pousse(pts[i], u, w[i] * (1 + 0.1 * Math.max(fl, 0)), w[i] * (1 - 0.14 * Math.max(fl, 0)), S[i]);
      if (i < n) for (const t of [0.2, 0.4, 0.6, 0.8, ...[ouvre.dos, ouvre.ventre].filter(e => e > S[i] + 1 && e < S[i + 1] - 1).map(e => (e - S[i]) / (S[i + 1] - S[i]))].sort((x, y) => x - y)) {   // le coussinet bombe un peu côté ventre
        const mm = lerp(pts[i], pts[i + 1], t), wm = w[i] + (w[i + 1] - w[i]) * t;
        pousse(mm, U[i], wm, wm * (1 + 0.035), S[i] + (S[i + 1] - S[i]) * t);
      }
    }
    const c = pts[n], u = U[n - 1], nn = mul(gau(u), sens), r = w[n];
    const bout = [add(c, mul(add(mul(nn, 0.72), mul(u, 0.72)), r)), add(c, mul(u, r * 1.02)), add(c, mul(add(mul(nn, -0.72), mul(u, 0.72)), r))];
    let L = [...dos.map(q => q.p), ...bout, ...ven.slice().reverse().map(q => q.p)];
    if (baseRonde) {   // la base arrondie : une jointure pliée vue de dessus
      const c0 = pts[0], u0b = mul(U[0], -1), n0 = mul(gau(U[0]), sens), r0 = w[0];
      const cap = [add(c0, mul(add(mul(n0, -0.72), mul(u0b, 0.72)), r0)), add(c0, mul(u0b, r0 * 1.02)), add(c0, mul(add(mul(n0, 0.72), mul(u0b, 0.72)), r0))];
      L = [...L, ...cap, L[0]];
    }
    const cm = lisseC(L);
    const dern = (A, v) => { let k = 0; A.forEach((q, j) => { if (q.s <= v + 0.01) k = j; }); return k; };
    const a = dern(dos, ouvre.dos || 0);
    const iv = dern(ven, ouvre.ventre || 0);
    const b = L.length - 1 - Math.max(0, iv);
    const tr = baseRonde ? cm : [['M', L[a]], ...cm.slice(a + 1, b + 1)];
    const u0 = U[0];
    const remp = coupe || baseRonde ? [...cm, ['Z']]
      : [['M', sub(L[0], mul(u0, base))], ['L', L[0]], ...cm.slice(1), ['L', sub(L[L.length - 1], mul(u0, base))], ['Z']];
    const det = [];
    if (ongle) {
      const P = pts[n - 1], Ln = lon(sub(c, P)) + r, at = (s, t) => add(add(P, mul(u, s)), mul(nn, t));
      if (ongle === 'dessus') {
        const hw = w[n] * 0.62, s0 = Ln * 0.42, s1 = Ln * 0.56, s2 = Ln + r * 0.15 - r * 0.5;
        const sE = Ln - r * 0.62;
        det.push([['M', at(sE, hw * 0.92)], ['L', at(s1, hw)], ['C', at(s0, hw), at(s0, -hw), at(s1, -hw)], ['L', at(sE, -hw * 0.92)]]);
      } else {
        const wn = w[n - 1] * 0.8;
        det.push([['M', at(Ln * 0.38, wn)], ['Q', at(Ln * 0.5, wn * 0.45), at(Ln * 0.92, w[n] * 0.35)]]);
      }
    }
    return { remp, trait: [tr], det, _L: L };
  }
  // Une plaque (paume, avant-bras) : un contour fermé lisse, tracé seulement sur les plages données
  // (indices de points, a → b, dans l'ordre du contour).
  function plaque(pts, plages, det = []) {
    const cm = lisseC(pts, true), n = pts.length;
    const tr = plages.map(([a, b]) => { const out = [['M', pts[a % n]]]; for (let i = a; i < b; i++) out.push(cm[(i % n) + 1]); return out; });
    return { remp: cm, trait: tr, det };
  }
  // le point d'un doigt2 à s mm le long de sa chaîne, sur un bord (+1 dos, -1 ventre)
  const bord2 = (pts, w, sens, cote, s) => {
    const W = w.slice(0, -1).map((v, i) => [v, w[i + 1]]);
    return pointBord(pts, W, sens, cote, s);
  };

  // ── dos : la main à plat vue de dessus (doigts vers la droite, pouce en haut) ──
  function appuiDos2(o) {
    const Wx = -94, cut = Wx - o.bras, pieces = [];
    const g = [['index', [0, -28], -3], ['majeur', [4, -9.2], -0.5], ['annulaire', [1, 9.4], 2.5], ['auriculaire', [-9, 27], 6.5]]
      .map(([nom, P0, a]) => ({ nom, w: D2[nom].w.map(v => v * 0.96), pts: chaine2(nom, P0, dirA(a), [0, 1.5, 1]) }));
    // le pouce : il part du bas de la paume, près du poignet, ouvert d'une quarantaine de degrés
    const ptsP = plie([Wx + 14, -19], dirA(-40), [44, 31, 25 - 8.6], [0, 16, 8], 1);
    const wP = D2.pouce.w;
    const pDos = s => bord2(ptsP, wP, 1, 1, s), pVen = s => bord2(ptsP, wP, 1, -1, s);
    const iHaut = s => bord2(g[0].pts, g[0].w, 1, 1, s), aBas = s => bord2(g[3].pts, g[3].w, 1, -1, s);
    // la paume : du poignet (côté pouce) par la palmure jusqu'à l'index, puis le bord cubital
    const P = [[cut, -30], [Wx - 10, -30], pDos(0), pVen(30), pVen(52), [-14, -40], iHaut(4), [20, -28], [24, 0], [18, 26], aBas(6),
      [-20, 38.5], [-56, 36.5], [Wx, 30.5], [cut, 32]];
    pieces.push(plaque(P, [[0, 2], [4, 6], [10, 14]]));
    const sW = 24;
    g.forEach((d, i) => pieces.push(doigt2(d.pts, d.w, { ouvre: { dos: i === 0 ? 4 : sW, ventre: i === 3 ? 6 : sW }, ongle: 'dessus' })));
    pieces.push(doigt2(ptsP, wP, { ouvre: { dos: 0, ventre: 52 }, ongle: 'dessus', base: 16 }));
    // les palmures entre les doigts : un petit creux, du bord d'un doigt à celui du voisin
    const webs = [];
    for (let i = 0; i < 3; i++) {
      const a = g[i], b = g[i + 1];
      const pa = bord2(a.pts, a.w, 1, -1, sW), pb = bord2(b.pts, b.w, 1, 1, sW);
      const fw = lerp(bord2(a.pts, a.w, 1, -1, sW - 7), bord2(b.pts, b.w, 1, 1, sW - 7), 0.5);
      webs.push([['M', pa], ['Q', fw, pb]]);
    }
    pieces.push({ remp: null, trait: webs, det: [], silhouette: false });
    // les têtes des métacarpiens, à peine marquées
    const nodes = g.slice(0, 3).map(d => { const p = add(d.pts[0], [-1, 0]), w = d.w[0] * 0.3; return [['M', add(p, [-1.5, -w])], ['Q', add(p, [2, 0]), add(p, [-1.5, w])]]; });
    pieces.push(traits(nodes, 0.5));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: 0, y: 0, r: 0 }, poignet: [Wx, 0], bras: [cut, 0] };
  }

  // ── profil : la prise, le manche vu par le bout ──
  // Le poing vu du côté du pouce : le dos de la main en haut, la paume posée sur le manche, l'index
  // qui descend devant, passe dessous et revient ; le pouce couché sous le manche, par-dessus
  // l'index, son bout près de la deuxième jointure de l'index.
  const surCercle = (a0, Ls, rr, sg = 1) => { const out = [mul(dirA(a0), rr)]; let a = a0; for (const L of Ls) { a += sg * 2 * Math.asin(Math.min(0.99, L / (2 * rr))) / RAD; out.push(mul(dirA(a), rr)); } return out; };
  function priseProfil2(R, o) {
    const wI0 = D2.index.w, rc = R + wI0[1] + 0.4;
    const arc = surCercle(-60, D2.index.ph.map((L, i) => i === 2 ? L - wI0[3] - 10 : L), rc);
    const MI = arc[0];
    // la chaîne de l'index part du dos de la main : la jointure saille en arrondi
    const uDos = dirA(-3);
    const ptsI = [sub(MI, mul(uDos, 26)), ...arc], wI = [9.8, ...wI0];
    const W = [MI[0] - 92, MI[1] + 11], F = [W[0] - o.bras, W[1] + 1];
    const iDos = s => bord2(ptsI, wI, 1, 1, s);
    const dosW = [W[0], iDos(0)[1] - 0.5];
    // le majeur, derrière : sa jointure dépasse à peine sous celle de l'index
    const arcM = surCercle(-52, D2.majeur.ph.map((L, i) => i === 2 ? L - D2.majeur.w[3] : L), rc + 2.2);
    const ptsM = [sub(arcM[0], mul(uDos, 26)), ...arcM], wM = [9.8, ...D2.majeur.w];
    // le pouce, couché sous le manche
    const yT = R + wI0[1] + 3.2;
    const PIP = arc[1];
    const ptsT = [[W[0] + 22, W[1] + 15], [-R - 8, yT + 0.5], [PIP[0] - 24, yT + 1.2], [PIP[0] - 11, yT - 0.8]];
    const wT = [12.5, 10.8, 9.8, 8.6];
    const tVen = s => bord2(ptsT, wT, 1, -1, s), tDos = s => bord2(ptsT, wT, 1, 1, s);
    const P = [[F[0], dosW[1] + 1], dosW, iDos(0), iDos(26), mul(dirA(-60), R - 1),
      mul(dirA(-110), R - 1), mul(dirA(-150), R - 1), mul(dirA(-190), R - 1), tDos(40), tVen(4), [W[0] + 4, W[1] + 19.5], [F[0], W[1] + 20.5]];
    const pieces = [];
    pieces.push(plaque(P, [[0, 2], [9, 11]]));
    pieces.push(doigt2(ptsI, wI, { sens: 1, ouvre: { dos: 0, ventre: 300 }, base: 4 }));
    pieces.push(doigt2(ptsT, wT, { sens: 1, ouvre: { dos: 40, ventre: 4 }, ongle: 'cote', base: 14 }));
    pieces.push({ remp: [...lisse(arcPts(R, 0, 360, 12), true)], trait: [], det: [], silhouette: false });
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: 0, y: 0, r: R }, poignet: W, bras: F, couche: 99 };
  }

  // ── profil : la boule tenue dans le « C » du pouce et des doigts ──
  // Vue du côté du pouce : la palmure contre la pierre, le pouce couché dessus, l'index qui passe
  // dessous et remonte de l'autre côté ; le majeur, derrière, dépasse au bout. serre (0 à 1,3).
  function bouleProfil2(R, o) {
    const s = o.serre == null ? 1 : borne(o.serre, 0, 1.3);
    const wI0 = D2.index.w, r0 = R + wI0[1] + 0.4, rc = r0 * (s < 1 ? 1 + (1 - s) * 0.5 : 1);
    const a0 = 140;
    const cI = mul(dirA(a0), r0 - rc);                // moins serré : la courbe s'ouvre
    const arc = surCercle(a0, D2.index.ph.map((L, i) => (i === 2 ? L - wI0[3] : L) * (s > 1 ? 1 : 1)), rc, -1).map(p => add(p, cI));
    const MI = arc[0], uDos = dirA(11);
    const ptsI = [sub(MI, mul(uDos, 26)), ...arc], wI = [9.8, ...wI0];
    const arcM = surCercle(a0 + 2, D2.majeur.ph.map((L, i) => i === 2 ? L - D2.majeur.w[3] : L), rc + 0.6, -1).map(p => add(p, cI));
    const ptsM = [sub(arcM[0], mul(uDos, 26)), ...arcM], wM = [9.8, ...D2.majeur.w];
    const W = sub(MI, mul(uDos, 92)), F = sub(W, mul(uDos, o.bras));
    const nH = gau(uDos);                       // vers le haut : le côté du pouce
    // le pouce : il part de la base de la paume et se couche sur le haut de la pierre
    const T0 = add(add(W, mul(uDos, 16)), mul(nH, 13)), rT = R + 10.6;
    let aT = 190, e = 1e9;
    for (let a = 185; a <= 250; a += 0.5) { const q = Math.abs(lon(sub(mul(dirA(a), rT), T0)) - 46); if (q < e) { e = q; aT = a; } }
    const arcT = surCercle(aT, [31, 25 - 8.6].map(L => L), rT, 1);
    const ptsT = [T0, ...arcT], wT = [12.8, 11, 10, 8.6];
    const iDos = q => bord2(ptsI, wI, -1, 1, q), tDos = q => bord2(ptsT, wT, 1, 1, q), tVen = q => bord2(ptsT, wT, 1, -1, q);
    const aP = Math.atan2(-(tVen(46)[1]), -(tVen(46)[0]));
    const P = [add(F, mul(nH, 20)), tDos(0), tVen(46), mul(dirA(aT - 8), R - 1), mul(dirA((aT - 8 + a0) / 2), R - 1), mul(dirA(a0 + 4), R - 1),
      iDos(26), iDos(0), add(W, mul(nH, -19.5)), add(F, mul(nH, -20.5))];
    const pieces = [];
    pieces.push(doigt2(ptsM, wM, { sens: -1, ouvre: { dos: 100, ventre: 100 }, base: 4 }));
    pieces.push(plaque(P, [[0, 1], [7, 9]]));
    pieces.push(doigt2(ptsI, wI, { sens: -1, ouvre: { dos: 0, ventre: 300 }, base: 4 }));
    pieces.push(doigt2(ptsT, wT, { sens: 1, ouvre: { dos: 0, ventre: 46 }, ongle: 'cote', base: 4 }));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: 0, y: 0, r: R }, poignet: W, bras: F };
  }

  // ── profil : la pince, le bout du pouce contre le bout de l'index ──
  // Le dos de la main en haut ; l'index qui s'arrondit, le pouce qui monte à sa rencontre, pulpe
  // contre pulpe : le rond entre les deux fait le geste. Derrière, le majeur et l'annulaire
  // repliés, un peu plus à chaque doigt. trou : le point pincé.
  function pinceProfil2(o) {
    const W = [0, 0], F = [-o.bras, 0], uDos = dirA(3);
    const MI = [92, 1];
    const ptsI = [sub(MI, mul(uDos, 26)), ...chaine2('index', MI, dirA(28), [0, 52, 28])], wI = [9.8, ...D2.index.w];
    const MM = add(MI, [-4, 3]);
    const ptsM = [sub(MM, mul(uDos, 26)), ...chaine2('majeur', MM, dirA(50), [0, 95, 60])], wM = [9.8, ...D2.majeur.w];
    // le point pincé : la pulpe de l'index
    const nI = ptsI.length - 1, uI = uni(sub(ptsI[nI], ptsI[nI - 1])), vI = mul(gau(uI), -1);
    const Q = add(ptsI[nI], mul(vI, wI[nI]));
    // le pouce : de la base de la paume, il plie à sa jointure et vient pulpe contre pulpe
    const T0 = [30, 22], T1 = add(T0, mul(dirA(22), 44));
    const cible = add(Q, mul(vI, 8.6 + 0.3));
    const s1 = ik2(T1, 31, 25 - 8.6, cible, 1), s2 = ik2(T1, 31, 25 - 8.6, cible, -1);
    const [, T2, T3] = s1[1][1] < s2[1][1] ? s1 : s2;
    const ptsT = [T0, T1, T2, T3], wT = [12.5, 11, 9.8, 8.6];
    const iVen = q => bord2(ptsI, wI, 1, -1, q), tDos = q => bord2(ptsT, wT, 1, 1, q), tVen = q => bord2(ptsT, wT, 1, -1, q);
    const creux = lerp(iVen(34), tDos(40), 0.5);
    const P = [[F[0], -20], [W[0], -20.5], [44, -18], add(ptsI[0], [0, -9.8]), iVen(40), add(creux, [-4, 0]), tDos(40), tVen(0), [W[0] + 6, 19.5], [F[0], 20.5]];
    const pieces = [];
    pieces.push(plaque(P, [[0, 3], [4, 6], [7, 9]]));
    pieces.push(doigt2(ptsI, wI, { ouvre: { dos: 0, ventre: 40 }, ongle: 'cote', base: 4 }));
    pieces.push(doigt2(ptsT, wT, { ouvre: { dos: 40, ventre: 0 }, ongle: 'cote', base: 4 }));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: Q[0], y: Q[1], r: 0 }, poignet: W, bras: F, couche: pieces.length - 2 };
  }

  // ── profil : la paume à plat qui appuie (la surface est la ligne y = 0) ──
  // Le poignet cassé vers le haut, le talon de la main et les doigts sur la surface, le pouce
  // couché devant, ongle en haut. Le majeur, plus long, dépasse l'index au bout.
  function appuiProfil2(o) {
    const inc = o.inclinaison == null ? 50 : o.inclinaison;
    const W = [-50, -27], F = add(W, mul(dirA(180 + inc), o.bras));
    const uF = uni(sub(W, F)), nD = gau(uF);          // nD : le dos de l'avant-bras
    const ptsI = [[14, -17.5], [42, -14.5], [83, -10], [108, -8.6], [127.5 - 6.5, -7]], wI = [10, 9.4, 8.3, 7.4, 6.5];
    const ptsM = [[18, -17], [46, -14], [91, -9.3], [118, -8.2], [139 - 6.7, -6.8]], wM = [10, 9.7, 8.6, 7.6, 6.7];
    const ptsT = [[-34, -13], [8, -10.6], [38, -9.4], [55, -8.4]], wT = [12, 10.6, 9.4, 8.4];
    const tVen = q => bord2(ptsT, wT, 1, -1, q);
    const P = [add(F, mul(nD, 20)), add(W, mul(nD, 19)), [-6, -33], [14, -27.5], [30, -24.5], [40, -5], [-20, -0.5],
      [-46, -1.5], [-60, -8], add(W, mul(nD, -19.5)), add(F, mul(nD, -20.5))];
    const pieces = [];
    pieces.push(doigt2(ptsM, wM, { base: 4, ouvre: { dos: 105, ventre: 105 } }));
    pieces.push(plaque(P, [[0, 3], [6, 10]]));
    pieces.push(doigt2(ptsI, wI, { ouvre: { dos: 0, ventre: 0 }, ongle: 'cote', base: 4 }));
    pieces.push(doigt2(ptsT, wT, { ouvre: { dos: 44, ventre: 0 }, ongle: 'cote', base: 10 }));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: 0, y: 0, r: 0 }, poignet: W, bras: F };
  }

  // ── profil : la main relâchée qui pend (vue du côté du pouce) ──
  // Le poignet droit dans l'axe de l'avant-bras, les doigts serrés et un peu repliés en cascade
  // (l'index le moins, l'auriculaire le plus : leurs bouts dépassent sous l'index), le pouce couché
  // devant, son bout sous la première phalange de l'index. Doigts vers +x, dos de la main vers -y.
  // trou : le milieu de la paume.
  function pendProfil2(o) {
    const W = [-92, 0], F = [W[0] - o.bras, 0];
    const doigt = (nom, P0, a, fl) => ({ pts: chaine2(nom, P0, dirA(a), fl), w: D2[nom].w });
    const iI = doigt('index', [0, -3], 9, [10, 13, 8]);
    const iM = doigt('majeur', [3, -1.5], 12, [14, 15, 9]);
    const iA = doigt('annulaire', [1, 0.5], 15, [18, 17, 10]);
    const iO = doigt('auriculaire', [-5, 2.5], 19, [22, 19, 11]);
    const ptsT = plie([-78, 9], dirA(14), [44, 31, 25 - 8.6], [0, -8, -12], 1), wT = [12.8, 11, 9.8, 8.6];
    const P = [[F[0], -21], [W[0], -19.2], [-48, -16], [-6, -12.6], [8, -4], [8, 8], [-14, 16], [-60, 20], [W[0], 20.5], [F[0], 21.5]];
    const pieces = [];
    [iO, iA, iM].forEach(d => pieces.push(doigt2(d.pts, d.w, { base: 4, ouvre: { dos: 30, ventre: 20 } })));
    pieces.push(plaque(P, [[0, 3], [7, 9]]));
    pieces.push(doigt2(iI.pts, iI.w, { ouvre: { dos: 0, ventre: 12 }, ongle: 'cote', base: 6 }));
    pieces.push(doigt2(ptsT, wT, { ouvre: { dos: 30, ventre: 0 }, ongle: 'cote', base: 10 }));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: -40, y: 0, r: 0 }, poignet: W, bras: F };
  }

  // ── dos : la main relâchée qui pend, vue du dos (doigts vers la droite, pouce en haut) ──
  // Les doigts serrés côte à côte, presque parallèles ; le pouce rentré le long de l'index, un peu
  // derrière lui (côté paume), vu de côté, son bout à la hauteur de la première jointure de l'index.
  // Le bord du pouce file du poignet sans cassure. trou : le milieu du dos de la main.
  function pendDos2(o) {
    const Wx = -94, cut = Wx - o.bras, pieces = [];
    const g = [['index', [0, -26], 2.5, 0.95], ['majeur', [4, -8.7], 0.5, 0.95], ['annulaire', [1, 8.7], -1.5, 0.95], ['auriculaire', [-9, 25], -3.5, 0.95]]
      .map(([nom, P0, a, k]) => ({ nom, w: D2[nom].w.map(v => v * 0.96), pts: chaine2(nom, P0, dirA(a), [0, 2, 2], 1, k) }));
    const ptsP = plie([-80, -18.8], dirA(-16), [47, 32, 25 - 8.6], [0, 8, 6], 1);
    const wP = [12.5, 11, 9.8, 8.6];
    const iHaut = s => bord2(g[0].pts, g[0].w, 1, 1, s), aBas = s => bord2(g[3].pts, g[3].w, 1, -1, s);
    // le pouce, derrière : son bord extérieur fait la silhouette, du poignet au bout
    pieces.push(doigt2(ptsP, wP, { ouvre: { dos: 0, ventre: 62 }, ongle: 'cote', base: 3 }));
    const P = [[cut, -29], [Wx, -29.5], [-60, -32], [-30, -35.5], iHaut(2), [20, -28], [24, 0], [18, 26], aBas(6),
      [-20, 38], [-56, 36], [Wx, 30.5], [cut, 31.5]];
    pieces.push(plaque(P, [[0, 4], [8, 12]]));
    g.slice().reverse().forEach((d, j) => { const i = 3 - j; pieces.push(doigt2(d.pts, d.w, { ouvre: { dos: i === 0 ? 2 : 20, ventre: i === 3 ? 6 : 20 }, ongle: 'dessus' })); });
    const nodes = g.slice(0, 3).map(d => { const p = add(d.pts[0], [-1, 0]), w = d.w[0] * 0.3; return [['M', add(p, [-1.5, -w])], ['Q', add(p, [2, 0]), add(p, [-1.5, w])]]; });
    pieces.push(traits(nodes, 0.5));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: -40, y: 0, r: 0 }, poignet: [Wx, 0], bras: [cut, 0] };
  }

  // ── dos : la prise vue du dos de la main (le manche passe derrière le poing) ──
  // La rangée des jointures, les premières phalanges qui partent vers le manche et tournent derrière
  // lui (leur bout arrondi est la deuxième jointure) ; le pouce couché en travers, en haut.
  function priseDos2(R, o) {
    const pieces = [], Wx = -94, cut = Wx - o.bras, xh = 10;
    const bandes = [['auriculaire', [-10, 27], 16], ['annulaire', [-1, 9.4], 26], ['majeur', [3, -9.4], 30], ['index', [0, -27.6], 27]];
    const g = bandes.map(([nom, P0, L]) => { const w0 = D2[nom].w[0] * 0.98; return { nom, w: [w0, w0 * 0.96], pts: [P0, add(P0, [L + 0.4 * R, 0.4])] }; });
    // le pouce : il part de la base de la paume, côté haut, monte le long de l'index et se couche
    // sur le manche, le bout tourné vers les doigts
    const ptsP = [[Wx + 18, -20], [-44, -38], [-12, -44], [12 + 0.3 * R, -40]], wP = [12.5, 11, 10, 8.6];
    const pDos = q => bord2(ptsP, wP, 1, 1, q);
    const aBas = q => bord2(g[0].pts, g[0].w, 1, -1, q);
    const P = [[cut, -31], pDos(0), [-30, -30], [-6, -36], [10, -10], [8, 20], aBas(2), [-28, 37.5], [-60, 34.5], [Wx, 30], [cut, 32]];
    pieces.push(plaque(P, [[0, 1], [6, 10]]));
    g.forEach(d => pieces.push(doigt2(d.pts, d.w, { base: 14, ouvre: { dos: 0, ventre: 0 } })));
    const nodes = g.map(d => { const p = add(d.pts[0], [4, 0]), w = d.w[0] * 0.42; return [['M', add(p, [0, -w])], ['Q', add(p, [-4.5, 0]), add(p, [0, w])]]; });
    pieces.push(traits(nodes, 0.5));
    pieces.push(doigt2(ptsP, wP, { sens: 1, ouvre: { dos: 0, ventre: 40 }, ongle: 'dessus', base: 4 }));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: xh, y: 0, r: R }, poignet: [Wx, 0], bras: [cut, 0] };
  }

  // ── paume : la prise vue du côté de la paume (les doigts passent devant le manche) ──
  // Les doigts reviennent du côté droit du manche vers la paume, l'un sous l'autre, le majeur le
  // plus long ; le pouce part du gras de la paume et se couche en travers sur l'index.
  function prisePaume2(R, o) {
    const pieces = [], Wx = -94, cut = Wx - o.bras, xh = 4;
    const doigts = [['auriculaire', -26, 0.8], ['annulaire', -9.4, 0.95], ['majeur', 9.4, 1], ['index', 27, 0.92]];
    const g = doigts.map(([nom, y, k]) => {
      const d = D2[nom], x1 = xh + R + d.w[1] - 1;
      const P1 = [x1, y], P2 = [x1 - d.ph[1] * k - 2, y + 0.6], P3 = [P2[0] - (d.ph[2] - d.w[3]) * k, y + 1.4];
      return { nom, w: [d.w[1] + 1.2, d.w[2] + 0.2, d.w[3] - 0.4], pts: [P1, P2, P3] };
    });
    // le pouce : du gras de la paume, près du poignet, en travers sur l'index
    const ptsP = [[Wx + 18, 22], [-46, 40], [-14, 40], [8 + 0.5 * R, 32]], wP = [13, 11.2, 10, 8.8];
    const pDos = q => bord2(ptsP, wP, 1, 1, q), pVen = q => bord2(ptsP, wP, 1, -1, q);
    const P = [[cut, -32], [Wx, -30], [-60, -34], [-30, -38.5], [xh - R - 2, -33], [xh - 2, -24], [xh - 2, 20], pDos(40), pVen(0), [Wx, 31], [cut, 34]];
    // le pli du pouce : il contourne l'éminence, de la commissure vers le poignet
    const pli = lisseC([pDos(44), [-40, 18], [-62, 12], [-78, 6]]);
    pieces.push(plaque(P, [[0, 4], [8, 10]], [pli]));
    g.forEach(d => pieces.push(doigt2(d.pts, d.w, { baseRonde: true })));
    // la deuxième jointure, à droite du manche : le bout arrondi de la première phalange
    pieces.push(doigt2(ptsP, wP, { ouvre: { dos: 40, ventre: 0 }, base: 16 }));
    return { coupe: [P[0], P[P.length - 1]], pieces, trou: { x: xh, y: 0, r: R }, poignet: [Wx, 0], bras: [cut, 0] };
  }

  const POSES = {
    'prise/profil': (R, o) => priseProfil2(R, o),
    'prise/dos': (R, o) => priseDos2(R, o),
    'prise/paume': (R, o) => prisePaume2(R, o),
    'boule/profil': (R, o) => bouleProfil2(R, o),
    'pince/profil': (R, o) => pinceProfil2(o),
    'appui/profil': (R, o) => appuiProfil2(o),
    'appui/dos': (R, o) => appuiDos2(o),
    'pend/profil': (R, o) => pendProfil2(o),
    'pend/dos': (R, o) => pendDos2(o),
  };


  // main({ x, y, pose, vue, cote, echelle, angle, diametre, bras, objet, trait, serre, inclinaison })
  //   x, y      le centre de l'objet tenu (le trou) ; pince : le point pincé (le bout de l'index) ;
  //             appui : sur la surface, sous le milieu de la paume
  //   pose/vue  'prise' : 'profil' (le poing vu du côté du pouce, le manche vu par le bout)
  //                       'dos' · 'paume' (le manche vertical à angle 0, vu du dos ou de la paume)
  //             'pince' : 'profil' (le bout du pouce contre le bout de l'index, l'anneau entre les deux)
  //             'boule' : 'profil' (la pierre dans le « C » : le pouce dessus, les doigts dessous)
  //             'appui' : 'profil' (la paume à plat sur la surface y = 0) · 'dos' (vue de dessus)
  //             'pend'  : 'profil' · 'dos' (la main relâchée qui pend, doigts serrés ; x, y au milieu de la main)
  //   cote      'droite' (défaut) · 'gauche' : la même main en miroir
  //   echelle   unités de vue par mm (1 : une main de 190 du poignet au bout du majeur)
  //   angle     rotation en degrés, sens horaire, autour de (x, y)
  //   diametre  prise et boule : le diamètre de l'objet tenu, en unités de vue
  //   bras      longueur d'avant-bras dessinée, en mm (défaut 60)
  //   objet     du SVG que la main peint à sa place dans la profondeur (voir la tête du fichier)
  //   trait     'moyen' (défaut) · 'fort'
  //   serre     boule : de combien les doigts s'enroulent (1 par défaut, 0 à 1,3)
  //   inclinaison  appui / profil : l'angle de l'avant-bras sur la surface (50 par défaut)
  // Rend : trou { x, y, r, axe } (axe : le sens du manche, vers le haut à angle 0), poignet, bras.
  function main(o = {}) {
    const pose = o.pose || 'prise', vue = o.vue || 'profil', cle = `${pose}/${vue}`;
    if (!POSES[cle]) throw new Error(`main : « ${cle} » inconnue (connues : ${Object.keys(POSES).join(', ')})`);
    const e = o.echelle || 1;
    const R = o.diametre ? o.diametre / 2 / e : (pose === 'boule' ? 32 : 16);
    const g = POSES[cle](R, { bras: o.bras == null ? 60 : o.bras, jeu: o.jeu, inclinaison: o.inclinaison, serre: o.serre });
    const pre = g.trou.pente ? Math.atan(g.trou.pente) / RAD : 0;     // manche vertical à angle 0
    const c0 = tourne([g.trou.x, g.trou.y], pre);
    const Tp = repere({ x: o.x || 0, y: o.y || 0, echelle: e, angle: o.angle || 0, miroir: o.cote === 'gauche' });
    const T = p => Tp(sub(tourne(p, pre), c0));
    const svg = `<g data-forme="main-${pose}-${vue}">\n${peindre(g.pieces, T, o.trait === 'fort', o.objet || '', o.objet ? Math.min(g.couche || 0, g.pieces.length) : 0)}\n</g>`;
    const axe = tourne([0, -1], o.angle || 0);
    const pt = p => T(p).map(f1);
    return forme(svg, {
      trou: { x: o.x || 0, y: o.y || 0, r: g.trou.r ? f1(R * e) : 0, axe: axe.map(v => Math.round(v * 1000) / 1000) },
      poignet: pt(g.poignet), bras: pt(g.bras), coupe: g.coupe ? g.coupe.map(pt) : null,
    });
  }

  // ─── l'ancien personnage (silhouette réaliste, rejetée par JP : règle 8) ─────────────
  // Gardé tel quel pour les planches qui le découpent ou le retouchent par le texte de ce fichier
  // (29-08, 24-02, 24-13, 37-07, 47-01, 109-40) : personnage() lui passe la main pour une pose
  // qu'il ne connaît pas et que ces planches ajoutent à POSTURES. À refaire en pictogramme ; ne
  // pas s'en servir dans une nouvelle planche.
  // ─── les personnages ──────────────────────────────────────────────────────────────────
  // De profil, le regard vers la droite (cote 'gauche' : vers la gauche). Une silhouette au trait,
  // sans visage ni vêtement : le crâne, le nez, la bouche, le menton et l'oreille suffisent.
  // Mesures d'un adulte de 1750 mm (tête 230, tronc 545 de la hanche à la base du cou, cuisse 440,
  // jambe 430, bras 300, avant-bras 255, main 185, pied 262). Origine au sol, y vers le bas.

  // La tête, repère à l'oreille.
  const TETE = (() => {
    const crane = lisse([[-50, 60], [-77, 32], [-91, -22], [-80, -84], [-24, -124], [36, -119], [81, -86], [96, -48]]);
    const front = lisse([[96, -48], [91, -29]]);
    const nez = lisse([[91, -29], [103, -8], [119, 15], [114, 25]]);
    const bouche = lisse([[114, 25], [101, 31], [104, 44], [99, 56], [95, 67]]);
    const menton = lisse([[95, 67], [100, 84], [88, 99], [58, 103]]);
    const contour = suite(crane, front, nez, bouche, menton);
    const oreille = [[['M', [5, -27]], ['C', [-17, -35], [-23, 17], [1, 23]]], [['M', [-3, -14]], ['Q', [-11, -3], [-4, 9]]]];
    return { contour, oreille, nuque: [-50, 60], gorge: [58, 103], bouche: [104, 46], nez: [119, 15], atlas: [4, 32], oeil: [70, -32] };
  })();
  const tetePiece = (TT) => {
    const c = TETE.contour.map(k => [k[0], ...k.slice(1).map(TT)]);
    return { remp: [...c, ['L', TT([10, 92])], ['L', TT(TETE.nuque)], ['Z']], trait: [c], det: TETE.oreille.map(l => l.map(k => [k[0], ...k.slice(1).map(TT)])) };
  };
  // Le tronc, repère à la hanche (tête du fémur), le haut vers -y, le devant vers +x. Le bassin
  // (sous la taille) et la poitrine (au-dessus) tournent chacun d'un bloc ; la taille fait le lien.
  const TRONC = {
    dos: [[-74, 104], [-102, 58], [-121, -8], [-108, -92], [-92, -170], [-95, -250], [-110, -340], [-118, -420], [-100, -492], [-68, -540]],
    face: [[74, 68], [86, -24], [97, -112], [92, -200], [98, -290], [113, -372], [110, -442], [88, -505], [54, -544]],
    epaule: [-14, -470],
  };
  const JAMBE = { dos: [[76, 50], [47, 31]], ventre: [[86, 52], [53, 33]], coussin: [0, 11] };
  const BRAS = { dos: [[50, 40], [40, 25], [25, 13]], ventre: [[50, 37], [43, 26], [26, 14]], coussin: [0, 4, 1.5], L: [300, 255, 185] };
  // le pied, repère à la cheville, semelle en y = 80 quand il est à plat
  const PIED = [[70, 20], [140, 47], [187, 57], [205, 69], [196, 78], [140, 80], [70, 76], [-28, 80], [-57, 62], [-55, 26]];

  function piedPiece(A, avant, arriere, angle) {
    const P = PIED.map(p => add(A, tourne(p, angle)));
    const c = lisse([avant, ...P, arriere]);
    return { remp: [...c, ['L', A], ['Z']], trait: [c], det: [] };
  }
  function jambe(Hh, K, A, angPied, ouvre, base = 90) {
    const t = tube({ pts: [Hh, K, A], sens: 1, dos: JAMBE.dos, ventre: JAMBE.ventre, coussin: JAMBE.coussin, bout: 'ouvert', base, plis: false, ouvre });
    const u = uni(sub(A, K)), n = gau(u);
    return [t, piedPiece(A, add(A, mul(n, JAMBE.dos[1][1])), sub(A, mul(n, JAMBE.ventre[1][1])), angPied)];
  }
  function bras(S, cible, dirMain, coude) {
    const [, E, Wr] = ik2(S, BRAS.L[0], BRAS.L[1], cible, coude);
    const fin = add(Wr, mul(uni(dirMain || sub(Wr, E)), BRAS.L[2]));
    return Object.assign(tube({ pts: [S, E, Wr, fin], sens: -1, dos: BRAS.dos, ventre: BRAS.ventre, coussin: BRAS.coussin, bout: 'rond', baseRonde: true }), { fin, poignet: Wr });
  }

  // Les postures, dans le repère du personnage (sol en y = 0) : hanche H, penché du tronc (degrés
  // vers l'avant), regard (la tête, + vers le bas), jambes proche et loin (genou K, cheville A, angle
  // du pied), poignets (où ils vont, et la direction de la main), coude (+1 : le coude sort vers
  // l'arrière quand le bras descend vers l'avant).
  const POSTURES = {
    debout: { H: [0, -950], penche: 3, regard: 0,
      proche: { K: [12, -515], A: [0, -85], pied: 0 }, loin: { K: [-6, -515], A: [-34, -85], pied: 0 },
      mains: { proche: [[28, -868], [0.1, 1]], loin: [[-6, -872], [0.06, 1]] }, coude: -1 },
    accroupi: { H: [-150, -300], penche: 36, regard: 6, assis: true, bassin: 0.85,
      proche: { K: [272, -420], A: [0, -85], pied: 0 }, loin: { K: [256, -426], A: [-16, -85], pied: 0 },
      mains: { proche: [[392, -300], [0.25, 1]], loin: [[372, -312], [0.2, 1]] }, coude: -1 },
    genoux: { H: [-45, -495], penche: 18, regard: 12,
      proche: { K: [0, -58], A: [-410, -200], pied: 95 }, loin: { K: [-14, -58], A: [-424, -200], pied: 95 },
      mains: { proche: [[250, -480], [0.8, 0.6]], loin: [[232, -492], [0.8, 0.6]] }, coude: -1 },
    genou: { H: [-110, -470], penche: 6, regard: 8,
      proche: { K: [320, -515], A: [305, -85], pied: 0 }, loin: { K: [-58, -58], A: [-465, -200], pied: 95 },
      mains: { proche: [[335, -585], [0.3, 1]], loin: [[300, -575], [0.3, 1]] }, coude: -1 },
  };

  // personnage({ x, y, pose, echelle, cote, angle, penche, regard, mains, trait })
  //   x, y     le point au sol sous le personnage (debout : entre les pieds ; à genoux : sous le genou)
  //   pose     'debout' · 'accroupi' · 'genoux' (les deux genoux au sol) · 'genou' (un genou au sol)
  //   echelle  unités de vue par mm (0,2 : 355 de haut debout)
  //   penche   inclinaison du tronc en degrés vers l'avant ; regard : la tête, + vers le bas
  //   mains    { proche: [x, y], loin: [x, y] } : où poser les poignets, en coordonnées de la vue
  //            (le bras se plie tout seul ; une cible hors d'atteinte donne le bras tendu vers elle)
  // Rend : bouche, oeil, nez, hanche, mains { proche, loin } (le bout des doigts) et poignets, en
  // coordonnées de la vue.
  function personnageAncien(o = {}) {
    const P = POSTURES[o.pose || 'debout'];
    if (!P) throw new Error(`personnage : pose « ${o.pose} » inconnue (connues : ${Object.keys(POSTURES).join(', ')})`);
    const e = o.echelle || 0.2, ox = o.x || 0, oy = o.y || 0, ang = o.angle || 0, mir = o.cote === 'gauche';
    const T = repere({ x: ox, y: oy, echelle: e, angle: ang, miroir: mir });
    const Tinv = q => { let p = tourne(sub(q, [ox, oy]), -ang); p = mul(p, 1 / e); return mir ? [-p[0], p[1]] : p; };
    const lean = o.penche == null ? P.penche : o.penche, regard = o.regard == null ? P.regard : o.regard;
    // le bassin tourne du tiers, la poitrine en entier ; la taille (y de -150 à -300) fait le lien
    const kb = P.bassin || 0.35;
    const kP = y => { const t = borne((-150 - y) / 150, 0, 1); return kb + (1 - kb) * t * t * (3 - 2 * t); };
    const H = P.H, TT = p => add(H, tourne(p, lean * kP(p[1])));
    const S = TT(TRONC.epaule);
    const bp = k => {
      const cible = o.mains && o.mains[k] ? Tinv(o.mains[k]) : P.mains[k][0];
      const dir = o.mains && o.mains[k] ? null : P.mains[k][1];
      return bras(k === 'loin' ? add(S, [-8, -4]) : S, cible, dir, P.coude);
    };
    // le tronc ; assis, la fesse se prolonge sous la cuisse
    const dos = TRONC.dos.map(TT), face = TRONC.face.map(TT);
    const dosT = P.assis ? [pointBord([H, P.proche.K, P.proche.A], JAMBE.ventre, 1, -1, 0), TT([-40, 102]), ...dos.slice(1)] : dos;
    const tronc = { remp: [...lisse([...dosT, TT([-8, -556]), ...face.slice().reverse()]), ['Z']], trait: [lisse(dosT), lisse(face)], det: [] };
    // le cou et la tête
    const cou0 = TT([-6, -540]), dCou = tourne([0, -1], lean * 0.5 + 10);
    const atlas = add(cou0, mul(dCou, 84));
    const rot = lean * 0.35 + regard;
    const Et = sub(atlas, tourne(TETE.atlas, rot));
    const TH = p => add(Et, tourne(p, rot));
    const f0 = face[face.length - 1], b0 = dos[dos.length - 1], g1 = TH(TETE.gorge), n1 = TH(TETE.nuque);
    const lf = lisse([f0, lerp(f0, g1, 0.5), g1]), lb = lisse([b0, lerp(b0, n1, 0.5), n1]);
    const cou = { remp: [...lf, ['L', n1], ['L', b0], ['Z']], trait: [lf, lb], det: [] };
    const tete = tetePiece(TH);
    // les jambes : le haut de la cuisse se fond dans le bassin. Dans l'axe du tronc, ses traits
    // partent de l'aine et du pli de la fesse ; pliée vers l'avant, ils partent là où la cuisse
    // sort du tronc.
    const polyT = [...dos, TT([-8, -556]), ...face.slice().reverse()];
    const dedans = (p, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
    const sortie = (pts, W, cote) => { for (let q = 0; q < 420; q += 3) if (!dedans(pointBord(pts, W, 1, cote, q), polyT)) return q + 3; return 420; };
    const ouvJ = (Hh, L) => {
      const u = uni(sub(L.K, Hh));
      if (dot(u, tourne([0, 1], lean * kb)) > 0.7) return { dos: 70, ventre: 105 };
      const pts = [Hh, L.K, L.A];
      return { dos: sortie(pts, JAMBE.dos, 1), ventre: P.assis ? 0 : sortie(pts, JAMBE.ventre, -1) };
    };
    const Hl = add(H, [-10, 0]);
    const bJ = P.assis ? 0 : 90;
    const jp = jambe(H, P.proche.K, P.proche.A, P.proche.pied, ouvJ(H, P.proche), bJ), jl = jambe(Hl, P.loin.K, P.loin.A, P.loin.pied, ouvJ(Hl, P.loin), bJ);
    const bl = bp('loin'), bpr = bp('proche');
    const pieces = [bl, ...jl, tronc, cou, tete, ...jp, bpr];
    const svg = `<g data-forme="personnage-${o.pose || 'debout'}">\n${peindre(pieces, T, o.trait === 'fort')}\n</g>`;
    const vue = p => T(p).map(f1);
    return forme(svg, { bouche: vue(TH(TETE.bouche)), oeil: vue(TH(TETE.oeil)), nez: vue(TH(TETE.nez)), hanche: vue(H),
      mains: { proche: vue(bpr.fin), loin: vue(bl.fin) }, poignets: { proche: vue(bpr.poignet), loin: vue(bl.poignet) } });
  }

  // tete({ x, y, echelle, angle, cote, trait }) : la tête seule, de profil, repère à l'oreille, avec le
  // haut du cou coupé net.
  function teteAncienne(o = {}) {
    const e = o.echelle || 1;
    const T = repere({ x: o.x || 0, y: o.y || 0, echelle: e, angle: o.angle || 0, miroir: o.cote === 'gauche' });
    const id = p => p;
    const g = TETE.gorge, n = TETE.nuque;
    const g2 = [g[0] - 8, g[1] + 52], n2 = [n[0] + 6, n[1] + 66];
    const lg = lisse([g, [g[0] - 5, g[1] + 26], g2]), ln = lisse([n, [n[0] + 2, n[1] + 34], n2]);
    const cou = { remp: [...lg, ['L', n2], ...lisse([n2, [n[0] + 2, n[1] + 34], n]).slice(1), ['L', g], ['Z']], trait: [lg, ln], det: [] };
    const svg = `<g data-forme="tete">\n${peindre([cou, tetePiece(id)], T, o.trait === 'fort')}\n</g>`;
    return forme(svg, { bouche: T(TETE.bouche).map(f1), nez: T(TETE.nez).map(f1), oeil: T(TETE.oeil).map(f1) });
  }

  // buste({ x, y, echelle, angle, cote, regard, trait }) : tête, cou, épaules et haut du tronc, coupé
  // sous la poitrine ; repère au milieu de la coupe. Le bras proche pend, coupé avec le tronc.
  function busteAncien(o = {}) {
    const e = o.echelle || 0.5, regard = o.regard || 0;
    const T = repere({ x: o.x || 0, y: o.y || 0, echelle: e, angle: o.angle || 0, miroir: o.cote === 'gauche' });
    const coupe = -300, TT = p => [p[0], p[1] - coupe];
    const garde = l => l.filter(p => p[1] < coupe - 20);
    const dos = [[-112, coupe], ...garde(TRONC.dos)].map(TT), face = [[100, coupe], ...garde(TRONC.face)].map(TT);
    const tronc = { remp: [...lisse([...dos, TT([-8, -556]), ...face.slice().reverse()]), ['Z']], trait: [lisse(dos), lisse(face)], det: [] };
    const cou0 = TT([-6, -540]), dCou = tourne([0, -1], 10);
    const atlas = add(cou0, mul(dCou, 84));
    const Et = sub(atlas, tourne(TETE.atlas, regard));
    const TH = p => add(Et, tourne(p, regard));
    const f0 = face[face.length - 1], b0 = dos[dos.length - 1];
    const lf = lisse([f0, TH(TETE.gorge)]), lb = lisse([b0, TH(TETE.nuque)]);
    const cou = { remp: [...lf, ['L', TH(TETE.nuque)], ['L', b0], ['Z']], trait: [lf, lb], det: [] };
    // le bras qui pend, coupé au niveau de la coupe du tronc
    const S = TT(TRONC.epaule), E = [S[0] + 3, 0];
    const brasP = tube({ pts: [S, E], sens: -1, dos: [[50, 43]], ventre: [[50, 40]], bout: 'ouvert', baseRonde: true });
    const svg = `<g data-forme="buste">\n${peindre([tronc, cou, tetePiece(TH), brasP], T, o.trait === 'fort')}\n</g>`;
    return forme(svg, { bouche: T(TH(TETE.bouche)).map(f1), nez: T(TH(TETE.nez)).map(f1), oeil: T(TH(TETE.oeil)).map(f1) });
  }


  // ─── les têtes, les bustes, les personnages ───────────────────────────────────────────
  // Deux registres, jamais mélangés dans une même figure :
  //   tete, buste      le trait sobre de manuel, de profil : contour, oreille simple, œil en petit
  //                    trait, cheveux en masse. Pour un geste vu de près (souffler, tenir, regarder).
  //   personnage       le pictogramme des cartes de sécurité d'avion (règle 8) : tête ronde sans
  //                    visage, tronc et membres en bandes d'épaisseur égale, articulations nettes.
  //                    Il montre la POSITION, rien d'autre.
  // Les bras qui finissent par une main de la bibliothèque passent par brasVersMain : le coude se
  // place sur l'axe de l'avant-bras de la main, l'avant-bras rejoint le moignon de la main bord à
  // bord, sans cassure.

  // ── les têtes de profil, regard vers la droite, repère à l'oreille, en mm réels ──
  // crane : de la nuque au sourcil ; nez : du sourcil au dessous du nez ; levres : du dessous du nez
  // à la gorge. Chaque suite est lissée seule ; les jonctions sont des coins (le creux du nez, le
  // dessous du nez). cheveux : la ligne d'implantation, du front à la nuque (le dessus suit le crâne).
  const TETES = {
    adulte: {
      crane: [[-50, 64], [-74, 40], [-89, 0], [-89, -48], [-70, -94], [-31, -123], [18, -129], [60, -115], [86, -86], [96, -54], [98, -33]],
      nez: [[98, -33], [96, -24], [103, -9], [111, 5], [114, 12], [111, 17], [102, 19]],
      levres: [[102, 19], [103.5, 29], [100.5, 35.5], [102, 42], [97, 52], [100, 67], [96, 84], [80, 95], [54, 100]],
      oreille: { c: [-2, -1], h: 58 }, oeil: [80, -24], bouche: [100.5, 35.5], atlas: [6, 34],
      cheveux: { ep: 7, av: 7, ar: 1,      // av, ar : les indices du crâne où la masse commence et finit
        courts: [[90, -80], [66, -82], [44, -66], [30, -44], [22, -34], [6, -41], [-14, -40], [-28, -24], [-34, 6], [-40, 38], [-56, 52]],
        longs: { bas: [[-98, 30], [-100, 90], [-92, 150], [-74, 172], [-46, 166]],
          ligne: [[90, -80], [66, -82], [44, -66], [30, -44], [22, -34], [6, -41], [-14, -40], [-28, -24], [-34, 10], [-42, 60], [-40, 120], [-46, 166]] },
        meches: [[[60, -104], [20, -102], [-26, -84]], [[30, -118], [-14, -114], [-56, -86]]] },
      cou: { gorge: [54, 100], nuque: [-50, 64], av: [48, 148], ar: [-47, 148] },
    },
    enfant: {   // 4 à 6 ans : le crâne gros et rond, le visage petit et bas, le nez court qui retrousse
      crane: [[-46, 50], [-72, 30], [-90, -6], [-90, -56], [-68, -100], [-24, -124], [28, -124], [66, -102], [86, -68], [91, -36], [89, -16]],
      nez: [[89, -16], [88, -10], [94, 0], [99, 9], [98, 13], [91, 15]],
      levres: [[91, 15], [92.5, 22], [90, 27], [91.5, 32], [87, 39], [89, 50], [83, 62], [66, 70], [44, 73]],
      oreille: { c: [-4, 2], h: 46 }, oeil: [74, -10], bouche: [90, 27], atlas: [4, 26],
      cheveux: { ep: 7, av: 7, ar: 1,
        courts: [[84, -76], [62, -78], [42, -62], [28, -40], [20, -26], [6, -28], [-12, -28], [-26, -14], [-32, 14], [-38, 34], [-50, 42]],
        longs: { bas: [[-96, 20], [-98, 70], [-90, 118], [-72, 136], [-44, 130]],
          ligne: [[84, -76], [62, -78], [42, -62], [28, -40], [20, -26], [6, -28], [-12, -28], [-26, -14], [-32, 16], [-40, 60], [-38, 100], [-44, 130]] },
        meches: [[[54, -106], [14, -104], [-30, -86]], [[24, -120], [-18, -114], [-58, -90]]] },
      cou: { gorge: [44, 73], nuque: [-46, 50], av: [40, 108], ar: [-42, 108] },
    },
    bebe: {     // la tête ronde, le front qui bombe, le visage tassé dans le bas, presque pas de menton
      crane: [[-42, 40], [-70, 22], [-88, -12], [-86, -60], [-58, -100], [-10, -114], [38, -104], [70, -76], [84, -40], [84, -8]],
      nez: [[84, -8], [86, 2], [90, 10], [88, 15], [83, 16]],
      levres: [[83, 16], [84.5, 23], [82, 27], [83, 31.5], [79, 37], [79.5, 45], [70, 54], [46, 58]],
      oreille: { c: [-8, 6], h: 38 }, oeil: [68, 2], bouche: [82, 27], atlas: [2, 22],
      cheveux: null,
      cou: { gorge: [46, 58], nuque: [-42, 40], av: [42, 78], ar: [-40, 78] },
    },
  };
  const cmdsMap = (c, TT) => c.map(k => [k[0], ...k.slice(1).map(TT)]);
  // Décale une suite de points de d vers l'extérieur (loin du point C).
  // d : un nombre, ou une fonction (i, n) → décalage du point i sur n.
  const decale = (pts, d, C) => pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    let n = gau(uni(sub(b, a))); if (dot(n, sub(p, C)) < 0) n = mul(n, -1);
    return add(p, mul(n, typeof d === 'function' ? d(i, pts.length) : d));
  });
  // Les pièces d'une tête, dans le repère TT (tête → repère de peinture).
  //   o.age 'adulte' · 'enfant' · 'bebe' ; o.cheveux 'courts' (défaut, rien pour le bébé) · 'longs' · false
  //   o.sourcil true : un trait léger au-dessus de l'œil (adulte seulement, défaut : non)
  function tetePieces(o, TT) {
    const age = o.age || 'adulte', D = TETES[age];
    if (!D) throw new Error(`tete : âge « ${o.age} » inconnu (connus : ${Object.keys(TETES).join(', ')})`);
    const contour = suite(lisseC(D.crane), lisseC(D.nez), lisseC(D.levres));
    const C = [0, -20];
    const tete = { remp: [...cmdsMap(contour, TT), ['L', TT(add(D.cou.gorge, [-20, 30]))], ['L', TT(add(D.cou.nuque, [10, 30]))], ['Z']], trait: [cmdsMap(contour, TT)], det: [], epDet: 0.7 };
    // l'œil : un petit trait de paupière ; la bouche : la commissure, courte
    const E = D.oeil, k = age === 'adulte' ? 1 : 0.85;
    const pupille = { remp: null, trait: [], det: [], noir: true, silhouette: false };
    tete.det.push(cmdsMap([['M', add(E, [-9 * k, -1 * k])], ['Q', add(E, [-1, -7 * k]), add(E, [7 * k, 0])]], TT));
    const pu = add(E, [-1.5 * k, 0.6]), rp = 1.9 * k;       // la pupille : un point sous la paupière
    pupille.remp = cmdsMap([['M', add(pu, [rp, 0])], ['C', add(pu, [rp, rp * 1.1]), add(pu, [-rp, rp * 1.1]), add(pu, [-rp, 0])], ['C', add(pu, [-rp, -rp * 1.1]), add(pu, [rp, -rp * 1.1]), add(pu, [rp, 0])], ['Z']], TT);
    tete.det.push(cmdsMap([['M', D.bouche], ['L', add(D.bouche, [-6 * k, 0.6])]], TT));
    if (o.sourcil && age === 'adulte') tete.det.push(cmdsMap([['M', add(E, [-12, -15])], ['Q', add(E, [-2, -20]), add(E, [9, -15])]], TT));
    const pieces = [tete, pupille];
    // les cheveux : une masse simple, le dessus qui suit le crâne, la ligne d'implantation au trait
    // fin, deux mèches pour dire que c'est des cheveux
    const ch = o.cheveux == null ? (D.cheveux ? 'courts' : false) : o.cheveux;
    if (ch && D.cheveux) {
      const Hc = D.cheveux, longs = ch === 'longs';
      const lig = longs ? Hc.longs.ligne : Hc.courts;
      // l'épaisseur monte depuis la nuque et retombe au front : la masse se fond dans le crâne
      const ramp = longs ? (i, n) => Hc.ep * Math.min(1, 0.6 + (n - 1 - i) / 2) : (i, n) => Hc.ep * Math.min(1, i / 2, 0.6 + (n - 1 - i) / 2);
      let dessus = decale(D.crane.slice(Hc.ar, Hc.av + 1), ramp, C);
      if (longs) dessus = [...Hc.longs.bas.slice().reverse(), ...dessus.slice(2)];
      else dessus = dessus.slice(1).length ? [lig[lig.length - 1], ...dessus.slice(1)] : dessus;
      const bord = [...dessus, lig[0]];
      const out = lisseC(bord), inn = lisseC(lig.slice().reverse());
      const det = [cmdsMap(lisseC(lig), TT), ...Hc.meches.map(m => cmdsMap(lisseC(m), TT))];
      pieces.push({ remp: cmdsMap([...out, ...inn.slice(1), ['Z']], TT), trait: [cmdsMap(out, TT)], det, epDet: 0.7 });
    }
    // l'oreille : un « C » ouvert vers l'avant, un pli à l'intérieur ; devant les cheveux
    const { c: Oc, h: Oh } = D.oreille, r = Oh / 2;
    const ore = [add(Oc, [5, -r]), add(Oc, [-10, -r * 0.95]), add(Oc, [-r * 0.62, -r * 0.3]), add(Oc, [-r * 0.5, r * 0.45]), add(Oc, [-4, r]), add(Oc, [5, r * 0.82])];
    const oc = lisseC(ore);
    pieces.push({ remp: cmdsMap([...oc, ['Z']], TT), trait: [cmdsMap(oc, TT)], det: [cmdsMap(lisseC([add(Oc, [2, -r * 0.55]), add(Oc, [-r * 0.32, -r * 0.1]), add(Oc, [-2, r * 0.45])]), TT)], ep: 0.7, silhouette: false });
    return { pieces, D };
  }

  // tete({ x, y, echelle, angle, cote, trait, age, cheveux, sourcil, cou }) : la tête seule, de
  // profil, repère à l'oreille, le cou coupé net (cou: false : sans cou).
  // Rend : bouche, nez, oeil, menton, sommet, nuque, en coordonnées de la vue.
  function tete(o = {}) {
    const e = o.echelle || 1;
    const T = repere({ x: o.x || 0, y: o.y || 0, echelle: e, angle: o.angle || 0, miroir: o.cote === 'gauche' });
    const id = p => p;
    const { pieces, D } = tetePieces(o, id);
    const out = [];
    if (o.cou !== false) {
      const { gorge: g, nuque: n, av, ar } = D.cou;
      const lg = lisseC([g, lerp(g, av, 0.5), av]), ln = lisseC([n, lerp(n, ar, 0.5), ar]);
      out.push({ remp: [...lg, ['L', ar], ...lisseC([ar, lerp(n, ar, 0.5), n]).slice(1), ['Z']], trait: [lg, ln], det: [] });
    }
    out.push(...pieces);
    const svg = `<g data-forme="tete-${o.age || 'adulte'}">\n${peindre(out, T, o.trait === 'fort')}\n</g>`;
    const v = p => T(p).map(f1);
    const nz = D.nez.reduce((m, p) => (p[0] > m[0] ? p : m));
    return forme(svg, { bouche: v(D.bouche), nez: v(nz), oeil: v(D.oeil), menton: v(D.levres[D.levres.length - 3]),
      sommet: v(D.crane.reduce((m, p) => (p[1] < m[1] ? p : m))), nuque: v(D.cou.nuque) });
  }

  // ── le bras qui finit par une main de la bibliothèque ──
  // S : l'épaule, en coordonnées de la vue ; mo : les options de main() (x, y, pose, vue, angle…) ;
  // L1, L2 : bras et avant-bras (coude → poignet), en unités de vue ; sg : +1 regard vers la droite.
  // Le coude se pose sur l'axe de l'avant-bras de la main, à la distance L1 de l'épaule. Sans
  // angle donné, la main tourne jusqu'à ce que l'avant-bras ait sa longueur, que le coude plie dans
  // le bon sens et que le bras tombe de l'épaule sans se lever plus qu'il ne faut (appui de profil :
  // la main reste à plat, c'est l'inclinaison de l'avant-bras qui cherche).
  // Rend { m (la main), E (le coude), B (le milieu de la coupe du poignet), d (l'axe), a, b }.
  function brasVersMain(S, mo, L1, L2, sg) {
    const essai = (ang, inc) => {
      const m = main(Object.assign({}, mo, { angle: ang }, inc == null ? {} : { inclinaison: inc }));
      const [a, b] = m.coupe, B = lerp(a, b, 0.5);
      const d = uni(sub(m.poignet, m.bras)), t0 = L2 - lon(sub(m.poignet, B));
      const w = sub(B, S), wd = dot(w, d), disc = wd * wd - dot(w, w) + L1 * L1;
      let t = null, err;
      if (disc >= 0) {
        const r = [wd - Math.sqrt(disc), wd + Math.sqrt(disc)].filter(v => v > 0.4 * t0);
        if (r.length) t = r.reduce((x, y) => (Math.abs(y - t0) < Math.abs(x - t0) ? y : x));
      }
      if (t == null) { t = t0; err = 10 + Math.abs(lon(sub(sub(B, mul(d, t0)), S)) - L1) / L1; }
      else err = 1.5 * Math.abs(t - t0) / t0;
      const E = sub(B, mul(d, t));
      // le coude plie toujours du même côté : l'avant-bras tourne vers l'avant
      const pli = crx(sub(E, S), sub(B, E)) * sg;
      if (pli > 0.12 * L1 * t) err += 2 + pli / (L1 * t);
      // le bras part vers le bas et un peu vers l'avant, comme un bras qui travaille
      const pref = [sg * Math.sin(25 * RAD), Math.cos(25 * RAD)];
      err += 0.35 * Math.abs(angleDe(pref, sub(E, S))) / 90;
      // jamais le coude au-dessus de l'épaule sans raison : la main assez basse ne lève pas le coude
      const hautE = (S[1] - E[1]) / L1;
      if (hautE > 0.2) err += 1 + hautE;
      return { m, E, B, d, a, b, err, ang };
    };
    if (mo.pose === 'appui' && (mo.vue || 'profil') === 'profil' && mo.inclinaison == null) {
      let best = null;
      for (let inc = 10; inc <= 85; inc += 1) { const r = essai(mo.angle || 0, inc); if (!best || r.err < best.err) best = r; }
      if (best.err >= 10) console.warn(`formes : la main (${f1(mo.x)}, ${f1(mo.y)}) est hors d'atteinte de l'épaule : rapproche-la`);
      return best;
    }
    const avertit = r => { if (r.err >= 10) console.warn(`formes : la main (${f1(mo.x)}, ${f1(mo.y)}) est hors d'atteinte de l'épaule : rapproche-la`); return r; };
    if (mo.angle != null) return avertit(essai(mo.angle));
    let best = null;
    for (let ang = -180; ang < 180; ang += 4) { const r = essai(ang); if (!best || r.err < best.err) best = r; }
    for (let ang = best.ang - 4; ang <= best.ang + 4; ang += 0.5) { const r = essai(ang); if (r.err < best.err) best = r; }
    return avertit(best);
  }
  // Le bras d'un buste, au trait : le bras de l'épaule au coude, rond aux deux bouts ; l'avant-bras
  // par-dessus, rond au coude, le gras de l'avant-bras près du coude, ses deux bords qui finissent
  // sur ceux du moignon de la main (a, b), dans l'axe : la main le prolonge sans cassure.
  //   rS, rE : demi-largeurs du bras à l'épaule et au coude (mm)
  function brasPieces(S, E, B, a, b, rS = 50, rE = 41) {
    const haut = tube({ pts: [S, E], sens: 1, dos: [[rS, rE]], ventre: [[rS - 2, rE]], bout: 'rond', baseRonde: true });
    const d = uni(sub(B, E)), n = gau(d), L = lon(sub(B, E));
    const [ap, am] = dot(sub(a, B), n) > 0 ? [a, b] : [b, a];
    const wp = dot(sub(ap, B), n), wm = -dot(sub(am, B), n);
    const at = (s, w) => add(add(E, mul(d, s)), mul(n, w));
    const r0 = rE - 1;
    const cote = sgn => {
      const wf = sgn > 0 ? wp : wm;
      return [0.18, 0.4, 0.62, 0.82].map(f => at(f * L, sgn * (r0 + (sgn > 0 ? 3 : 1.5) * Math.sin(Math.PI * Math.min(1, f / 0.5)) * (f < 0.5 ? 1 : 0) + (wf - r0) * Math.pow(Math.max(0, (f - 0.15) / 0.85), 1.3))));
    };
    const cap = [at(0, r0), at(-r0 * 0.72, r0 * 0.72), at(-r0, 0), at(-r0 * 0.72, -r0 * 0.72), at(0, -r0)];
    const pts = [ap, ...cote(1).reverse(), ...cap, ...cote(-1), am];
    const c = lisseC(pts);
    return [haut, { remp: [...c, ['Z']], trait: [c], det: [] }];
  }

  // buste({ x, y, echelle, angle, cote, regard, trait, age, cheveux, col, main, mainLoin, coupe }) :
  // tête, cou, épaules et haut du tronc, coupé sous la poitrine ; repère au milieu de la coupe.
  //   coupe     où couper, en mm sous l'oreille (adulte : 380 sans main, 560 avec ; enfant : 260, 380)
  //   main      sans : le bras proche pend, coupé avec le tronc. Avec { x, y, pose, vue, … } (les
  //             options de main(), en coordonnées de la vue, echelle par défaut celle du buste) : le
  //             bras proche va de l'épaule à cette main, l'avant-bras rejoint son poignet. Ce qui du
  //             bras passe sous la coupe est coupé avec le tronc.
  //   mainLoin  la même chose pour le bras loin, peint derrière le tronc.
  //   col       true (défaut) : l'encolure du vêtement, un trait à la base du cou.
  // Rend : bouche, nez, oeil, epaule, coude, mains { proche, loin } (les résultats de main()).
  const BUSTE = {
    adulte: { coupe: 380, dos: [[-50, 64], [-55, 98], [-68, 130], [-92, 160], [-112, 198], [-123, 250], [-126, 310], [-124, 380]],
      face: [[54, 100], [47, 128], [45, 156], [56, 176], [84, 196], [106, 228], [117, 274], [118, 330], [114, 380]],
      epaule: [-18, 214], rS: 54, rE: 42, col: [[-60, 128], [-24, 152], [14, 170], [46, 168]], L: [300, 255] },
    enfant: { coupe: 260, dos: [[-46, 50], [-50, 74], [-60, 96], [-76, 116], [-88, 144], [-94, 180], [-94, 220], [-92, 260]],
      face: [[44, 73], [39, 92], [38, 112], [48, 126], [66, 142], [80, 166], [86, 200], [86, 260]],
      epaule: [-14, 154], rS: 38, rE: 30, col: [[-52, 92], [-20, 110], [10, 122], [38, 120]], L: [185, 165] },
  };
  let nClip = 0;
  function buste(o = {}) {
    const age = o.age === 'bebe' ? 'enfant' : (o.age || 'adulte');
    const B = Object.assign({}, BUSTE[age]);
    // la coupe : sous la poitrine ; plus bas quand un bras travaille, pour que le coude se voie
    const kc = age === 'adulte' ? 1 : 0.68;
    B.coupe = o.coupe || ((o.main || o.mainLoin) ? Math.round(560 * kc) : B.coupe);
    if (B.coupe > B.dos[B.dos.length - 1][1]) {
      const yd = B.dos[B.dos.length - 1], yf = B.face[B.face.length - 1];
      B.dos = [...B.dos, [yd[0] + 2, B.coupe]]; B.face = [...B.face, [yf[0] - 4, B.coupe]];
    }
    const e = o.echelle || 0.5, regard = o.regard || 0, mir = o.cote === 'gauche', sg = mir ? -1 : 1;
    const ox = o.x || 0, oy = o.y || 0, ang = o.angle || 0;
    const c0 = [-4, B.coupe];
    const T0 = repere({ x: ox, y: oy, echelle: e, angle: ang, miroir: mir });
    const T = p => T0(sub(p, c0));
    const Tinv = q => { let p = tourne(sub(q, [ox, oy]), -ang); p = mul(p, 1 / e); if (mir) p = [-p[0], p[1]]; return add(p, c0); };
    const D = TETES[age];
    const at = D.atlas, TH = p => add(at, tourne(sub(p, at), regard));
    const { pieces: tp } = tetePieces(Object.assign({}, o, { age }), TH);
    // le tronc : le dos et le devant, de la nuque et de la gorge jusqu'à la coupe
    const dos = [TH(B.dos[0]), ...B.dos.slice(1)], face = [TH(B.face[0]), ...B.face.slice(1)];
    const ld = lisseC(dos), lf = lisseC(face);
    const tronc = { remp: [...ld, ['L', face[face.length - 1]], ...lisseC(face.slice().reverse()).slice(1), ['Z']], trait: [ld, lf], det: [], epDet: 0.7 };
    if (o.col !== false) tronc.det.push(lisseC(B.col));
    const S = B.epaule, res = { proche: null, loin: null };
    let coude = null;
    // ce qui passe sous la coupe est coupé, comme le tronc
    const id = `buste-coupe-${++nClip}`;
    const clip = `<clipPath id="${id}"><polygon points="${[[-3000, -3000], [3000, -3000], [3000, B.coupe], [-3000, B.coupe]].map(p => T(p).map(f1).join(',')).join(' ')}"/></clipPath>`;
    const brasMain = (mo, Sb) => {
      const r = brasVersMain(T(Sb), Object.assign({ echelle: e, cote: o.cote }, mo), B.L[0] * e, B.L[1] * e, sg);
      return { pieces: brasPieces(Sb, Tinv(r.E), Tinv(r.B), Tinv(r.a), Tinv(r.b), B.rS, B.rE), r };
    };
    const fort = o.trait === 'fort';
    const peint = (lot, coupe = false) => { const s = peindre(lot, T, fort); return coupe ? `<g clip-path="url(#${id})">\n${s}\n</g>` : s; };
    const out = [`<defs>${clip}</defs>`];
    if (o.mainLoin) {
      const { pieces, r } = brasMain(o.mainLoin, add(S, [12, -8]));
      out.push(peint(pieces, true), r.m.svg); res.loin = r.m;
    }
    out.push(peint([tronc, ...tp]));
    if (o.main) {
      const { pieces, r } = brasMain(o.main, S);
      out.push(peint(pieces, true), r.m.svg); res.proche = r.m; coude = r.E.map(f1);
    } else {
      // le bras qui pend, coupé avec le tronc
      // (le bras s'amincit de l'épaule au coude ; la coupe le prend où elle passe)
      const Lb = B.L[0] * 1.15, Eb = [S[0] + Lb * 0.05, S[1] + Lb];
      out.push(peint([tube({ pts: [S, Eb], sens: 1, dos: [[B.rS, B.rE * 0.92]], ventre: [[B.rS * 0.94, B.rE * 0.92]], bout: 'ouvert', baseRonde: true })], true));
    }
    const svg = `<g data-forme="buste-${age}">\n${out.join('\n')}\n</g>`;
    const v = p => T(p).map(f1);
    return forme(svg, { bouche: v(TH(D.bouche)), nez: v(TH(D.nez.reduce((m, p) => (p[0] > m[0] ? p : m)))), oeil: v(TH(D.oeil)),
      epaule: v(S), coude, mains: res });
  }

  // ── le personnage : le pictogramme ──
  // Mesures par âge, en mm : hauteur, tête (diamètre), tronc (de la hanche à l'épaule) et son
  // épaisseur, cuisse, jambe (genou → cheville), hauteur de cheville, pied, bras, avant-bras (coude →
  // poignet), main ; bandes du bras et de la jambe. Debout, la tête fait le septième de la hauteur
  // (le cinquième et demi chez l'enfant), le bout des doigts tombe à mi-cuisse.
  const CORPS = {
    adulte: { H: 1750, tete: 245, tronc: 500, ep: 285, cuisse: 430, jambe: 420, cheville: 80, pied: 255, bras: 300, avBras: 255, main: 185, bB: 92, bJ: 122, cou: 26 },
    enfant: { H: 1100, tete: 196, tronc: 310, ep: 190, cuisse: 262, jambe: 240, cheville: 52, pied: 165, bras: 182, avBras: 160, main: 112, bB: 66, bJ: 84, cou: 18 },
  };
  // Les poses : penché du tronc t (degrés vers l'avant depuis la verticale ; -90 : couché sur le
  // dos, la tête à gauche), regard (la tête, + vers le bas) ; pour chaque jambe l'angle de la cuisse
  // et de la jambe depuis la verticale descendante (+ vers l'avant) et celui du pied (0 : à plat vers
  // l'avant, + les orteils vers le bas) ; pour chaque bras, bras et avant-bras de même. ancre : le
  // point au sol qui se pose en (x, y) — 'pieds' (entre les chevilles), 'genou' (le genou proche),
  // 'hanche' (sous la hanche).
  const POSES_P = {
    debout:   { t: 2, regard: 0, ancre: 'pieds', proche: [3, 3, 0], loin: [-3, -3, 0], bras: { proche: [5, 10], loin: [-4, 3] } },
    penche:   { t: 58, regard: 18, ancre: 'pieds', proche: [-14, 3, 0], loin: [-18, -1, 0], bras: { proche: [22, 34], loin: [12, 22] } },
    accroupi: { t: 30, regard: 10, ancre: 'pieds', proche: [104, -20, 0], loin: [100, -24, 0], bras: { proche: [38, 76], loin: [32, 70] } },
    assis:    { t: 4, regard: 6, ancre: 'hanche', proche: [90, 2, 0], loin: [86, -2, 0], bras: { proche: [14, 82], loin: [10, 76] } },
    'assis-sol': { t: 14, regard: 8, ancre: 'hanche', proche: [88, 88, -78], loin: [84, 84, -80], bras: { proche: [-35, -40], loin: [-40, -44] } },
    couche:   { t: -90, regard: 0, ancre: 'hanche', proche: [90, 90, -88], loin: [88, 88, -86], bras: { proche: [82, 86], loin: [80, 84] } },
    genoux:   { t: 8, regard: 10, ancre: 'genou', proche: [4, -90, 180], loin: [2, -90, 180], bras: { proche: [16, 34], loin: [10, 26] } },
    genou:    { t: 6, regard: 10, ancre: 'genou', proche: [86, 0, 0], loin: [2, -90, 180], bras: { proche: [22, 70], loin: [8, 30] } },
    // tire : à demi accroupi, les genoux pliés, le dos droit penché, pour tirer une charge en reculant
    tire:     { t: 40, regard: 10, ancre: 'pieds', proche: [66, -20, 0], loin: [58, -28, 0], bras: { proche: [40, 70], loin: [36, 64] } },
    portage:  { t: 16, regard: -4, ancre: 'pieds', proche: [24, 6, 0], loin: [-16, -32, 24], bras: { proche: [18, 42], loin: [-14, 6] } },
  };
  POSES_P.couché = POSES_P.couche; POSES_P['penché'] = POSES_P.penche; POSES_P['à genoux'] = POSES_P.genoux;
  const vBas = a => [Math.sin(a * RAD), Math.cos(a * RAD)];      // direction depuis la verticale descendante
  // une bande : capsule de P à Q, rayon r (quatre quarts de cercle en cubiques)
  const KC = 0.5523;
  function capsule(P, Q, r, ouvert = false) {
    const u = uni(sub(Q, P)), n = gau(u);
    const A1 = add(P, mul(n, r)), A2 = add(Q, mul(n, r)), B2 = sub(Q, mul(n, r)), B1 = sub(P, mul(n, r));
    const Qt = add(Q, mul(u, r)), Pt = sub(P, mul(u, r));
    const bout = (A, M, B, c, uu, nn) => [['C', add(A, mul(uu, KC * r)), add(M, mul(nn, KC * r)), M], ['C', sub(M, mul(nn, KC * r)), add(B, mul(uu, KC * r)), B]];
    const c = [['M', A1], ['L', A2], ...bout(A2, Qt, B2, Q, u, n), ['L', B1], ...bout(B1, Pt, A1, P, mul(u, -1), mul(n, -1))];
    return [...c, ['Z']];
  }
  const cercle = (C, r) => { const p = a => add(C, mul(dirA(a), r)), q = a => mul(dirA(a + 90), KC * r);
    return [['M', p(0)], ...[0, 90, 180, 270].map(a => ['C', add(p(a), q(a)), sub(p(a + 90), q(a + 90)), p(a + 90)]), ['Z']]; };
  // l'avant-bras qui finit sur le moignon d'une main : le coude rond, les bords droits jusqu'à a, b
  function avantBrasVers(E, r, a, b, B) {
    const d = uni(sub(B, E)), n = gau(d);
    const [ap, am] = dot(sub(a, B), n) > 0 ? [a, b] : [b, a];
    const Ep = add(E, mul(n, r)), Em = sub(E, mul(n, r)), Et = sub(E, mul(d, r));
    const md = mul(d, -1), mn = mul(n, -1);
    const tr = [['M', ap], ['L', Ep], ['C', add(Ep, mul(md, KC * r)), add(Et, mul(n, KC * r)), Et], ['C', add(Et, mul(mn, KC * r)), add(Em, mul(md, KC * r)), Em], ['L', am]];
    return { remp: [...tr, ['Z']], trait: [tr], det: [] };
  }

  // personnage({ x, y, pose, echelle, cote, angle, penche, regard, mains, prises, age, rendu,
  //              enceinte, trait })
  //   x, y      le point au sol sous le personnage : debout, penché, accroupi, portage : entre les
  //             pieds ; à genoux, un genou : sous le genou proche ; assis, assis-sol, couché : sous
  //             la hanche (assis : sur une chaise, les pieds au sol ; le siège n'est pas dessiné)
  //   pose      'debout' · 'penche' · 'accroupi' · 'assis' · 'assis-sol' · 'couche' (sur le dos) ·
  //             'genoux' (les deux genoux au sol) · 'genou' (un genou au sol) · 'portage' (penché en
  //             marche, une charge au dos : rend dos, le point où l'appuyer)
  //   echelle   unités de vue par mm (0,2 : 350 de haut debout)
  //   age       'adulte' (défaut, 1750 mm) · 'enfant' (5 ans, 1100 mm)
  //   penche    inclinaison du tronc en degrés vers l'avant ; regard : la tête, + vers le bas
  //   mains     { proche: [x, y], loin: [x, y] } : où poser les poignets, en coordonnées de la vue
  //             (le bras se plie tout seul ; hors d'atteinte, il se tend vers la cible)
  //   prises    { proche: { x, y, pose, vue, … }, loin: … } : au lieu de la moufle du pictogramme, une
  //             main de la bibliothèque (options de main(), en coordonnées de la vue, echelle par
  //             défaut celle du personnage) ; le bras va la chercher, l'avant-bras rejoint son poignet
  //   rendu     'trait' (défaut : blanc cerné) · 'plein' (aplat noir, un blanc entre les pièces)
  //   enceinte  true : un ventre arrondi simple
  // Rend : tete { x, y, r }, bouche, oeil, nez (des points sur le rond de la tête, pour placer une
  // flèche de souffle), hanche, epaules, genoux, mains { proche, loin } (le bout des doigts, ou le
  // résultat de main() pour une prise), poignets, siege (assis : sous la fesse), dos (portage).
  function personnage(o = {}) {
    const P = POSES_P[o.pose || 'debout'];
    if (!P && POSTURES[o.pose]) return personnageAncien(o);     // une pose ajoutée par une planche à l'ancienne
    if (!P) throw new Error(`personnage : pose « ${o.pose} » inconnue (connues : ${Object.keys(POSES_P).filter(k => /^[a-z-]+$/.test(k)).join(', ')})`);
    const C = CORPS[o.age === 'bebe' ? 'enfant' : (o.age || 'adulte')];
    const e = o.echelle || 0.2, ox = o.x || 0, oy = o.y || 0, ang = o.angle || 0, mir = o.cote === 'gauche', sg = mir ? -1 : 1;
    const t = o.penche == null ? P.t : o.penche, regard = o.regard == null ? P.regard : o.regard;
    const U = [Math.sin(t * RAD), -Math.cos(t * RAD)], Fw = [Math.cos(t * RAD), Math.sin(t * RAD)];
    const rB = C.bB / 2, rJ = C.bJ / 2, ep = C.ep;
    // le squelette, hanche en (0, 0)
    const H0 = [0, 0];
    const loc = (f, u) => add(H0, add(mul(Fw, f), mul(U, u)));
    const jambeS = ([a1, a2, ap], dx) => {
      const Hh = add(H0, mul(Fw, dx)), K = add(Hh, mul(vBas(a1), C.cuisse)), A = add(K, mul(vBas(a2), C.jambe));
      const f = dirA(ap), d = [-f[1], f[0]];        // d : le dessous du pied (la semelle)
      const hc = C.cheville, rp = hc / 2;
      // à genoux, le cou-de-pied à plat au sol dans l'axe de la jambe ; sinon la semelle sous la cheville
      const off = f[0] < -0.8 ? 0 : hc - rp, recul = f[0] < -0.8 ? 0.05 : 0.2;
      const talon = add(add(A, mul(d, off)), mul(f, -recul * C.pied + rp)), orteil = add(add(A, mul(d, off)), mul(f, (1 - recul) * C.pied - rp));
      return { Hh, K, A, talon, orteil, rp, sole: [add(talon, mul(d, rp)), add(orteil, mul(d, rp))] };
    };
    const jp = jambeS(P.proche, 6), jl = jambeS(P.loin, -6);
    const Sp = loc(-0.06 * ep, C.tronc), Sl = loc(-0.02 * ep, C.tronc + 8);
    // le tronc : un bloc arrondi, la fesse sous la hanche, l'épaule ronde en haut
    const v = o.enceinte ? 1 : 0, Lt = C.tronc;
    const tr = [[-0.5, 0.94], [-0.52, 0.5], [-0.5, 0.06], [-0.38, -0.26 * ep / Lt], [-0.08, -0.36 * ep / Lt], [0.24, -0.31 * ep / Lt], [0.46, -0.1 * ep / Lt],
      [0.5 + 0.12 * v, 0.12], [0.5 + 0.34 * v, 0.24], [0.5 + 0.42 * v, 0.37], [0.5 + 0.32 * v, 0.52], [0.5 + 0.08 * v, 0.64], [0.5, 0.76], [0.46, 0.97], [0.3, 1.0 + 0.12 * ep / Lt], [0, 1.0 + 0.16 * ep / Lt], [-0.3, 1.0 + 0.14 * ep / Lt], [-0.47, 1.0 + 0.05 * ep / Lt]]
      .map(([f, u]) => loc(f * ep, u * Lt));
    const tronc = { remp: lisseC(tr, true), trait: [lisseC(tr, true)], det: [] };
    // la tête : un rond, posé au-dessus du tronc avec un blanc pour le cou
    const N = loc(0.04 * ep, Lt + 0.1 * ep);
    const Ct = add(N, tourne(mul(U, C.cou + 0.06 * ep + C.tete / 2), regard));
    const Ct2 = add(Ct, mul(tourne(Fw, regard), 0.08 * ep));
    const teteP = { remp: cercle(Ct2, C.tete / 2), trait: [cercle(Ct2, C.tete / 2)], det: [] };
    // les poses donnent les bras par angles ; mains et prises en coordonnées de la vue
    let T = null, Tinv = null;
    const brasS = (k, S) => {
      const [a1, a2] = P.bras[k];
      const E = add(S, mul(vBas(a1), C.bras)), W = add(E, mul(vBas(a2), C.avBras));
      return { S, E, W, F: add(W, mul(vBas(a2), C.main * 0.9)) };
    };
    const ikBras = (S, cible) => {
      const sols = [1, -1].map(s => ik2(S, C.bras, C.avBras, cible, s));
      // le coude plie vers l'arrière : l'avant-bras tourne vers l'avant
      const bon = sols.find(([, E, W]) => crx(sub(E, S), sub(W, E)) <= 0.01) || sols[0];
      const [, E, W] = bon, d = uni(sub(W, E));
      return { S, E, W, F: add(W, mul(d, C.main * 0.9)) };
    };
    // ancrage au sol : le point le plus bas se pose sur y = 0, l'ancre en x
    const bas = [jp.sole[0], jp.sole[1], jl.sole[0], jl.sole[1], add(jp.K, [0, rJ]), add(jl.K, [0, rJ]), ...tr, add(Ct2, [0, C.tete / 2])];
    const yMax = Math.max(...bas.map(p => p[1]));
    const xA = P.ancre === 'genou' ? jp.K[0] : P.ancre === 'hanche' ? 0 : (jp.A[0] + jl.A[0]) / 2;
    const O = [xA, yMax];
    T = (() => { const R = repere({ x: ox, y: oy, echelle: e, angle: ang, miroir: mir }); return p => R(sub(p, O)); })();
    Tinv = q => { let p = tourne(sub(q, [ox, oy]), -ang); p = mul(p, 1 / e); if (mir) p = [-p[0], p[1]]; return add(p, O); };
    const bras = {}, mainsM = {};
    for (const k of ['proche', 'loin']) {
      const S = k === 'proche' ? Sp : Sl;
      if (o.prises && o.prises[k]) {
        const r = brasVersMain(T(S), Object.assign({ echelle: e, cote: o.cote }, o.prises[k]), C.bras * e, C.avBras * e, sg);
        const E = Tinv(r.E);
        bras[k] = { S, E, W: Tinv(r.m.poignet), F: Tinv(r.m.poignet), prise: r };
        mainsM[k] = r.m;
      } else if (o.mains && o.mains[k]) bras[k] = ikBras(S, Tinv(o.mains[k]));
      else bras[k] = brasS(k, S);
    }
    const piecesBras = k => {
      const b = bras[k], out = [{ remp: capsule(b.S, b.E, rB), trait: [capsule(b.S, b.E, rB)], det: [] }];
      if (b.prise) {
        const r = b.prise;
        out.push(avantBrasVers(b.E, rB * 0.94, Tinv(r.a), Tinv(r.b), Tinv(r.B)), r.m.svg);
      } else out.push({ remp: capsule(b.E, b.F, rB), trait: [capsule(b.E, b.F, rB)], det: [] });
      return out;
    };
    const piecesJambe = j => [
      { remp: capsule(j.talon, j.orteil, j.rp), trait: [capsule(j.talon, j.orteil, j.rp)], det: [] },
      { remp: capsule(j.K, j.A, rJ), trait: [capsule(j.K, j.A, rJ)], det: [] },
      { remp: capsule(j.Hh, j.K, rJ), trait: [capsule(j.Hh, j.K, rJ)], det: [] },
    ];
    // de la plus lointaine à la plus proche ; la cuisse proche passe devant le tronc, le pied
    // derrière la jambe, la jambe derrière la cuisse (le genou rond se lit)
    const jpP = piecesJambe(jp);
    const pieces = [...piecesBras('loin'), ...piecesJambe(jl), tronc, teteP, jpP[0], jpP[1], jpP[2], ...piecesBras('proche')];
    const fort = o.trait === 'fort';
    let corps;
    if (o.rendu === 'plein') {
      corps = pieces.map(p => typeof p === 'string' ? p
        : `<path d="${ser(p.remp, T)}" fill="${BLANC}" stroke="${BLANC}" stroke-width="2.4" stroke-linejoin="round"/>\n<path d="${ser(p.remp, T)}" fill="${NOIR}" stroke="none"/>`).join('\n');
    } else {
      // trait : toutes les silhouettes en 2,4 dessous, puis chaque pièce son blanc et son trait 1,4
      const out = [];
      for (const p of pieces) if (typeof p !== 'string' && p.silhouette !== false) for (const tt of p.trait) out.push(`<path d="${ser(tt, T)}" ${trait(2.4)}/>`);
      for (const p of pieces) {
        if (typeof p === 'string') { out.push(p); continue; }
        out.push(`<path d="${ser(p.remp, T)}" ${FOND}/>`);
        for (const tt of p.trait) out.push(`<path d="${ser(tt, T)}" ${trait(fort ? 2 : 1.4)}/>`);
      }
      corps = out.join('\n');
    }
    const svg = `<g data-forme="personnage-${o.pose || 'debout'}">\n${corps}\n</g>`;
    const vv = p => T(p).map(f1);
    const rT = C.tete / 2, dT = tourne(Fw, regard), uT = tourne(U, regard);
    const surTete = (f, u) => vv(add(Ct2, add(mul(dT, f * rT), mul(uT, u * rT))));
    const fin = k => (mainsM[k] || vv(bras[k].F));
    const info = { tete: { x: vv(Ct2)[0], y: vv(Ct2)[1], r: f1(rT * e) }, bouche: surTete(0.97, -0.3), nez: surTete(1, -0.05), oeil: surTete(0.72, 0.18),
      hanche: vv(H0), epaules: { proche: vv(Sp), loin: vv(Sl) }, genoux: { proche: vv(jp.K), loin: vv(jl.K) },
      mains: { proche: fin('proche'), loin: fin('loin') }, poignets: { proche: vv(bras.proche.W), loin: vv(bras.loin.W) } };
    if (o.pose === 'assis') info.siege = vv(loc(-0.05 * ep, -0.36 * ep));
    if (o.pose === 'portage') info.dos = vv(loc(-0.5 * ep, Lt * 0.7));
    return forme(svg, info);
  }

  // ─── le fil et la corde ───────────────────────────────────────────────────────────────
  // cordes(brins, options) dessine un ou plusieurs brins en bande à deux bords, avec leurs
  // croisements. Chaque brin : { pts: [[x, y, z?], …], ep, debut, fin, fleche, torons, passages }.
  //   pts      les points de passage, en coordonnées de la vue ; la courbe passe par chacun.
  //            z (facultatif) : la hauteur ; à un croisement, le brin le plus haut passe dessus.
  //   ep       épaisseur de la bande (défaut 6) ; torons : true pour la corde commise
  //   debut, fin   'libre' (bout effiloché) · 'fixe' (la corde continue : cassure) · 'coupe' · 'ouvert'
  //   fleche   { de: 0.1, a: 0.3, cote: 'gauche' | 'droite' } : le sens de marche, en fractions du brin
  //   passages sans z : ['dessus', 'dessous', …] dans l'ordre des croisements le long du brin ;
  //            sans rien, les croisements alternent.
  // options : { jeu: 2.5 (le blanc de part et d'autre du brin du dessus), trait: 'arete' | 'contour' | 'detail' }
  function echantillonne(pts3, pas) {
    const pts = pts3.map(p => [p[0], p[1]]), zs = pts3.map(p => (p[2] == null ? null : p[2]));
    const cm = lisse(pts);
    const P = [pts[0]], Z = [zs[0]];
    let prev = pts[0];
    cm.slice(1).forEach((c, k) => {
      const L = lon(sub(c[1], prev)) + lon(sub(c[2], c[1])) + lon(sub(c[3], c[2]));
      const n = Math.max(2, Math.ceil(L / pas));
      for (let i = 1; i <= n; i++) {
        const t = i / n;
        P.push(cubique(prev, c[1], c[2], c[3], t));
        Z.push(zs[k] == null || zs[k + 1] == null ? null : zs[k] + (zs[k + 1] - zs[k]) * (3 * t * t - 2 * t * t * t));
      }
      prev = c[3];
    });
    const S = [0], Tg = [], N = [];
    for (let i = 1; i < P.length; i++) S.push(S[i - 1] + lon(sub(P[i], P[i - 1])));
    for (let i = 0; i < P.length; i++) { const t = uni(sub(P[Math.min(i + 1, P.length - 1)], P[Math.max(i - 1, 0)])); Tg.push(t); N.push(gau(t)); }
    return { P, Z, S, T: Tg, N };
  }
  function segInter(a, b, c, d) {
    const r = sub(b, a), s = sub(d, c), den = crx(r, s);
    if (Math.abs(den) < 1e-9) return null;
    const t = crx(sub(c, a), s) / den, u = crx(sub(c, a), r) / den;
    return t >= 0 && t < 1 && u >= 0 && u < 1 ? [t, u] : null;
  }
  const distPoly = (p, poly) => {
    let m = Infinity;
    for (let i = 0; i < poly.length - 1; i++) {
      const a = poly[i], b = poly[i + 1], ab = sub(b, a), t = borne(dot(sub(p, a), ab) / (dot(ab, ab) || 1), 0, 1);
      m = Math.min(m, lon(sub(p, add(a, mul(ab, t)))));
    }
    return m;
  };
  function cordes(brins, opt = {}) {
    const jeu = opt.jeu == null ? 2.5 : opt.jeu;
    const ep = { contour: 2.4, arete: 1.4, detail: 0.7 }[opt.trait || 'arete'];
    const B = brins.map(b => ({ ...b, w: b.ep || 6, ...echantillonne(b.pts, Math.max(0.8, (b.ep || 6) / 5)) }));
    // les croisements
    const X = [];
    B.forEach((a, ia) => B.forEach((b, ib) => {
      if (ib < ia) return;
      for (let i = 0; i < a.P.length - 1; i++) {
        for (let j = ib === ia ? i + 2 : 0; j < b.P.length - 1; j++) {
          if (ib === ia && b.S[j] - a.S[i + 1] < 2 * a.w) continue;
          const r = segInter(a.P[i], a.P[i + 1], b.P[j], b.P[j + 1]);
          if (!r) continue;
          const sa = a.S[i] + r[0] * (a.S[i + 1] - a.S[i]), sb = b.S[j] + r[1] * (b.S[j + 1] - b.S[j]);
          if (X.some(x => x.a === ia && x.b === ib && Math.abs(x.sa - sa) < 1 && Math.abs(x.sb - sb) < 1)) continue;
          const za = a.Z[i] == null ? null : a.Z[i] + (a.Z[i + 1] - a.Z[i]) * r[0];
          const zb = b.Z[j] == null ? null : b.Z[j] + (b.Z[j + 1] - b.Z[j]) * r[1];
          X.push({ a: ia, b: ib, sa, sb, ia: i + r[0], ib: j + r[1], za, zb, dessus: null });
        }
      }
    }));
    X.forEach(x => { if (x.za != null && x.zb != null && Math.abs(x.za - x.zb) > 1e-6) x.dessus = x.za > x.zb ? 'a' : 'b'; });
    // passages déclarés, puis alternance
    B.forEach((b, k) => {
      const ev = [];
      X.forEach(x => { if (x.a === k) ev.push({ x, s: x.sa, moi: 'a' }); if (x.b === k) ev.push({ x, s: x.sb, moi: 'b' }); });
      ev.sort((p, q) => p.s - q.s);
      let dernier = null;
      ev.forEach((v, idx) => {
        const voulu = b.passages && b.passages[idx];
        if (v.x.dessus == null && voulu) v.x.dessus = voulu === 'dessus' ? v.moi : (v.moi === 'a' ? 'b' : 'a');
        if (v.x.dessus == null) v.x.dessus = dernier === 'dessus' ? (v.moi === 'a' ? 'b' : 'a') : v.moi;
        dernier = v.x.dessus === v.moi ? 'dessus' : 'dessous';
      });
    });
    // les coupes du brin du dessous : chaque bord s'arrête à `jeu` du bord du brin du dessus
    B.forEach(b => { b.coupes = []; });
    X.forEach(x => {
      const [dessus, sD, iD, dessous, iU] = x.dessus === 'a' ? [B[x.a], x.sa, x.ia, B[x.b], x.ib] : [B[x.b], x.sb, x.ib, B[x.a], x.ia];
      const loc = [];
      const rayon = 6 * (dessus.w + dessous.w) + 30;
      dessus.P.forEach((p, i) => { if (Math.abs(dessus.S[i] - sD) < rayon) loc.push(p); });
      const lim = dessus.w / 2 + jeu;
      const bordU = (i, s) => add(dessous.P[i], mul(dessous.N[i], s * dessous.w / 2));
      const cherche = (s, pas) => {
        let i = Math.round(iU);
        for (let k = 0; k < 4000; k++) {
          const j = i + pas;
          if (j < 0 || j > dessous.P.length - 1) return j < 0 ? 0 : dessous.P.length - 1;
          if (distPoly(bordU(j, s), loc) >= lim) {
            // affine entre i et j
            let lo = i, hi = j;
            for (let r = 0; r < 12; r++) {
              const m = (lo + hi) / 2, p = lerp(bordU(Math.floor(m), s), bordU(Math.ceil(m), s), m - Math.floor(m));
              if (distPoly(p, loc) >= lim) hi = m; else lo = m;
            }
            return hi;
          }
          i = j;
        }
        return i;
      };
      dessous.coupes.push({ g: [cherche(1, -1), cherche(1, 1)], d: [cherche(-1, -1), cherche(-1, 1)] });
    });
    // on fusionne les coupes qui se touchent
    B.forEach(b => {
      const c = b.coupes.map(k => ({ ...k, lo: Math.min(k.g[0], k.d[0]), hi: Math.max(k.g[1], k.d[1]) })).sort((p, q) => p.lo - q.lo);
      const f = [];
      for (const k of c) {
        const l = f[f.length - 1];
        if (l && k.lo <= l.hi + 1) { l.g = [Math.min(l.g[0], k.g[0]), Math.max(l.g[1], k.g[1])]; l.d = [Math.min(l.d[0], k.d[0]), Math.max(l.d[1], k.d[1])]; l.hi = Math.max(l.hi, k.hi); }
        else f.push({ ...k });
      }
      b.coupes = f;
    });
    // le dessin
    const out = [], det = [], fl = [];
    const pt = (b, i, s) => { const k = borne(i, 0, b.P.length - 1), a = Math.floor(k), c = Math.min(a + 1, b.P.length - 1), t = k - a;
      return lerp(add(b.P[a], mul(b.N[a], s * b.w / 2)), add(b.P[c], mul(b.N[c], s * b.w / 2)), t); };
    const run = (b, s, i0, i1) => { const q = [pt(b, i0, s)]; for (let i = Math.ceil(i0 + 1e-6); i < i1; i++) q.push(pt(b, i, s)); q.push(pt(b, i1, s)); return q; };
    const poly = q => q.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' ');
    const bouts = (b, i, sensB, style) => {
      const g = pt(b, i, 1), d = pt(b, i, -1), t = mul(b.T[borne(Math.round(i), 0, b.P.length - 1)], sensB), w = b.w, m = lerp(g, d, 0.5);
      if (style === 'coupe' || style === 'libre') out.push(`<path d="${poly([g, d])}" ${trait(ep)}/>`);
      if (style === 'libre') {
        const tr = [];
        for (const k of [-0.3, 0, 0.3]) { const a = add(m, mul(sub(g, m), k * 2)); tr.push(`M${f1(a[0])} ${f1(a[1])} L${f1(a[0] + t[0] * w * 0.85 + (g[0] - m[0]) * k)} ${f1(a[1] + t[1] * w * 0.85 + (g[1] - m[1]) * k)}`); }
        det.push(`<path d="${tr.join(' ')}" ${trait(0.7)}/>`);
      }
      if (style === 'fixe') {
        const n = sub(g, m);
        out.push(`<path d="M${f1(g[0])} ${f1(g[1])} Q${f1(m[0] + n[0] * 0.5 + t[0] * w * 0.7)} ${f1(m[1] + n[1] * 0.5 + t[1] * w * 0.7)} ${f1(m[0])} ${f1(m[1])} Q${f1(m[0] - n[0] * 0.5 - t[0] * w * 0.7)} ${f1(m[1] - n[1] * 0.5 - t[1] * w * 0.7)} ${f1(d[0])} ${f1(d[1])}" ${trait(ep)}/>`);
      }
    };
    B.forEach(b => {
      const nP = b.P.length - 1;
      const bornes = [{ g: [0, 0], d: [0, 0] }, ...b.coupes, { g: [nP, nP], d: [nP, nP] }];
      for (let k = 0; k < bornes.length - 1; k++) {
        const g0 = bornes[k].g[1], g1 = bornes[k + 1].g[0], d0 = bornes[k].d[1], d1 = bornes[k + 1].d[0];
        if (g1 - g0 < 0.5 || d1 - d0 < 0.5) continue;
        const G = run(b, 1, g0, g1), D = run(b, -1, d0, d1);
        out.push(`<path d="${poly([...G, ...D.slice().reverse()])} Z" ${FOND}/>`);
        out.push(`<path d="${poly(G)}" ${trait(ep)}/>`, `<path d="${poly(D)}" ${trait(ep)}/>`);
        if (b.torons) {
          const i0 = Math.max(g0, d0), i1 = Math.min(g1, d1), tr = [];
          for (let s = b.S[Math.ceil(i0)] + b.w * 0.7; s < b.S[Math.floor(i1)] - b.w * 0.7; s += b.w * 0.85) {
            let i = 0; while (i < nP && b.S[i + 1] < s) i++;
            const p = b.P[i], t = b.T[i], n = b.N[i], w2 = b.w / 2 - 0.6;
            const a = add(add(p, mul(n, w2)), mul(t, -b.w * 0.28)), c = add(sub(p, mul(n, w2)), mul(t, b.w * 0.28));
            tr.push(`M${f1(a[0])} ${f1(a[1])} Q${f1(p[0] + t[0] * b.w * 0.12)} ${f1(p[1] + t[1] * b.w * 0.12)} ${f1(c[0])} ${f1(c[1])}`);
          }
          if (tr.length) det.push(`<path d="${tr.join(' ')}" ${trait(0.5)}/>`);
        }
        if (k === 0) bouts(b, 0, -1, b.debut || 'coupe');
        if (k === bornes.length - 2) bouts(b, nP, 1, b.fin || 'coupe');
      }
      if (b.fleche) {
        const L = b.S[nP], s0 = (b.fleche.de ?? 0.1) * L, s1 = (b.fleche.a ?? 0.3) * L, cote = b.fleche.cote === 'droite' ? -1 : 1;
        const q = [];
        for (let i = 0; i <= nP; i++) if (b.S[i] >= s0 && b.S[i] <= s1) q.push(add(b.P[i], mul(b.N[i], cote * (b.w / 2 + 7))));
        if (q.length > 1) fl.push(h.fleche(poly(q.filter((p, i) => i % 3 === 0 || i === q.length - 1)), trait(1.4)));
      }
    });
    return forme([...out, ...det, ...fl].join('\n'), { croisements: X.map(x => ({ x: f1(B[x.a].P[Math.floor(x.ia)][0]), y: f1(B[x.a].P[Math.floor(x.ia)][1]), dessus: x.dessus === 'a' ? x.a : x.b })) });
  }
  const corde = (pts, o = {}) => cordes([{ pts, ...o }], o);

  // ─── le filet ─────────────────────────────────────────────────────────────────────────
  // aiguilleFilet({ x, y, longueur, angle, chargee }) : l'aiguille à filet, pointe vers +x à angle 0,
  // la langue dans sa fenêtre, la fourche au talon ; chargée, le fil court de la fourche à la langue.
  function aiguilleFilet(o = {}) {
    const L = o.longueur || 200, T = repere({ x: o.x || 0, y: o.y || 0, echelle: L, angle: o.angle || 0 });
    const w = 0.07;
    const corps = [['M', [0.5, 0]], ['Q', [0.44, -w * 0.95], [0.34, -w]], ['L', [-0.5, -w]], ['L', [-0.5, -0.024]], ['L', [-0.43, -0.024]],
      ['C', [-0.405, -0.024], [-0.405, 0.024], [-0.43, 0.024]], ['L', [-0.5, 0.024]], ['L', [-0.5, w]], ['L', [0.34, w]], ['Q', [0.44, w * 0.95], [0.5, 0]], ['Z']];
    const fen = [['M', [-0.06, -0.036]], ['L', [0.24, -0.036]], ['Q', [0.31, -0.03], [0.33, 0]], ['Q', [0.31, 0.03], [0.24, 0.036]], ['L', [-0.06, 0.036]],
      ['Q', [-0.08, 0.036], [-0.08, 0]], ['Q', [-0.08, -0.036], [-0.06, -0.036]], ['Z']];
    const langue = [['M', [-0.08, -0.013]], ['L', [0.2, -0.011]], ['Q', [0.245, -0.006], [0.26, 0]], ['Q', [0.245, 0.006], [0.2, 0.011]], ['L', [-0.08, 0.013]]];
    const s = [`<path d="${ser(corps, T)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>`,
      `<path d="${ser(fen, T)}" ${trait(1.4)}/>`, `<path d="${ser(langue, T)}" fill="${BLANC}" ${trait(1.4).replace('fill="none" ', '')}/>`];
    if (o.chargee !== false) {
      // le fil chargé : un fuseau de tours serrés, pris dans la fourche et autour de la langue
      const fus = [['M', [-0.43, -0.012]], ['C', [-0.3, -0.05], [0.1, -0.05], [0.235, -0.014]], ['Q', [0.25, 0], [0.235, 0.014]], ['C', [0.1, 0.05], [-0.3, 0.05], [-0.43, 0.012]], ['Z']];
      const tours = [];
      for (const k of [-0.6, -0.2, 0.2, 0.6]) tours.push(['M', [-0.4, 0.03 * k]], ['C', [-0.25, 0.062 * k], [0.08, 0.062 * k], [0.22, 0.02 * k]]);
      s.push(`<path d="${ser(fus, T)}" fill="${BLANC}" ${trait(1.4).replace('fill="none" ', '')}/>`, `<path d="${ser(tours, T)}" ${trait(0.5)}/>`);
    }
    const p = q => T(q).map(f1);
    return forme(`<g data-forme="aiguille-filet">\n${s.join('\n')}\n</g>`, { pointe: p([0.5, 0]), talon: p([-0.5, 0]), langue: p([0.26, 0]) });
  }
  // moule({ x, y, longueur, largeur, angle }) : la latte à mailles ; x, y le milieu du bord du haut.
  function moule(o = {}) {
    const L = o.longueur || 240, l = o.largeur || 40, T = repere({ x: o.x || 0, y: o.y || 0, angle: o.angle || 0 });
    const r = Math.min(6, l / 5);
    const c = [['M', [-L / 2 + r, 0]], ['L', [L / 2 - r, 0]], ['Q', [L / 2, 0], [L / 2, r]], ['L', [L / 2, l - r]], ['Q', [L / 2, l], [L / 2 - r, l]],
      ['L', [-L / 2 + r, l]], ['Q', [-L / 2, l], [-L / 2, l - r]], ['L', [-L / 2, r]], ['Q', [-L / 2, 0], [-L / 2 + r, 0]], ['Z']];
    const arr = [['M', [-L / 2 + r, 3.2]], ['L', [L / 2 - r, 3.2]]];
    const svg = `<g data-forme="moule">\n<path d="${ser(c, T)}" fill="${BLANC}" ${trait(2.4).replace('fill="none" ', '')}/>\n<path d="${ser(arr, T)}" ${trait(0.7)}/>\n</g>`;
    return forme(svg, { haut: [T([-L / 2, 0]).map(f1), T([L / 2, 0]).map(f1)] });
  }
  // maille({ x, y, echelle, ep, fleche, trait }) : le nœud de filet (nœud d'écoute) desserré, au bas
  // d'une maille. x, y : le fond de la maille du dessus, un U dont les deux brins montent vers les
  // nœuds du rang d'avant. Le fil de l'aiguille, venu d'en bas à gauche (le dormant, qui vient du
  // moule), passe DERRIÈRE le brin gauche et entre dans la maille ; il ressort DEVANT le brin droit,
  // fait le tour des deux brins par DERRIÈRE, revient DEVANT le brin gauche, passe SOUS lui-même
  // (entre son dormant et la maille) et sort DEVANT le brin droit, vers le bas à droite (le courant,
  // qui va à l'aiguille). Sept croisements, chacun dessus ou dessous comme dans le nœud réel.
  function maille(o = {}) {
    const e = o.echelle || 1, x = o.x || 0, y = o.y || 0, w = o.ep || 5;
    const P = l => l.map(p => [x + p[0] * e, y + p[1] * e, p[2]]);
    const U = P([[-44, -115, 0], [-30, -70, 0], [-18, -32, 0], [-11, -8, 0], [-5, 3, 0], [0, 6, 0], [5, 3, 0], [11, -8, 0], [18, -32, 0], [30, -70, 0], [44, -115, 0]]);
    const F = P([[-58, 118, -1], [-38, 60, -1], [-21, 10, -1], [-13, -12, -1],        // derrière le brin gauche
      [-7, -20, 1.6], [-2, -25, 2], [12, -40, 1.6], [26, -55, 1],                      // devant le brin droit
      [42, -60, 1], [50, -72, 0], [42, -82, -1], [34, -82, -1], [0, -84, -1], [-34, -82, -1],   // le tour, par derrière
      [-46, -80, -1], [-53, -66, 0], [-44, -54, 1], [-25, -52, 1],                     // devant le brin gauche
      [-12, -40, 0.7], [-2, -25, 0.5], [7, -14, 1], [12, -8, 1],                       // sous le dormant, devant le brin droit
      [22, 20, 1], [36, 68, 1], [46, 114, 1]]);
    const c = cordes([
      { pts: U, ep: w, debut: 'ouvert', fin: 'ouvert' },
      { pts: F, ep: w, debut: 'fixe', fin: 'libre', fleche: o.fleche === false ? null : { de: 0.88, a: 0.985, cote: 'droite' } },
    ], { jeu: o.jeu, trait: o.trait });
    return forme(c.svg, { fond: [x, y], croisements: c.croisements });
  }

  return { main, personnage, tete, buste, corde, cordes, aiguilleFilet, moule, maille,
    _interne: { tube, peindre, repere, lisse, ser, forme, enroule, plie, ik2, tangente, pointBord, suite, cubPts, arcPts, mainProfil, personnageAncien, brasVersMain, capsule } };
};
