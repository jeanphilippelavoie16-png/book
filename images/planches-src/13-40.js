// Planche 13-40. Le ferrocérium, du tri du bois à la flamme. Refaite depuis zéro le 19 octobre 2026 (règle 12 :
// planche signalée, « Tabarnak, ouff », puis « les mains, l'amadou, le tipi, c'est laid en câlisse » ; pause du
// 15 octobre, point 23 ; la flèche 9 signalée au plan de match). Rien n'est repris de l'ancienne version.
// Deux vues refaites au complet le même jour, après le regard de JP sur les planches en attente (le reste approuvé :
// « LE RESTE C'EST SUPER ») :
//   « Trier en quatre tas » : « le bois pas beau, refais ça » ; le bois passe par la fonction boisDe (plus bas), qui sert
//   aussi au tas 18 de « Glisser le nid sous le tipi » ;
//   « Refermer et souffler » : « dégueulasse la main et tout, au pire fais le zoom sur une main (montre pas le visage) et
//   refais la main » ; un gros plan sur la main qui tient la boule, sans tête.
//
// Six vues, dans l'ordre des gestes du chapitre 13 (étapes 10, 13, 14, 15, 16, 17) ; les repères 1 à 18 sont ceux du
// texte, dans le même ordre :
//   trier les quatre tas (1 à 4, étape 10) ; monter le tipi (5 et 6, étape 13) ; faire le nid (7 et 8, étape 14) ;
//   faire l'étincelle (9 à 12, étape 15) ; flamber (13 à 16, étape 16) ; glisser (17 et 18, étape 17).
//
// Les mains : h.formes.mainStock seulement (brief-agent.md), aucune main dessinée, aucune main déformée ; l'avant-bras
// est prolongé jusqu'au bord de la vue par deux traits qui continuent ses bords (comme 04-41).
//   la tige       2-07 « manche-vers-bas » (le poing vu de dos, l'avant-bras qui monte), objet: false : la tige de la
//                 planche est posée dessous, sur l'axe de la prise (le manche dans le poing, le métal qui sort sous le
//                 pouce et descend vers le nid) ;
//   le couteau    2-13 « poing-cylindre » (le poing serré sur un manche court qui sort du côté du pouce), tourné pour
//                 que l'avant-bras monte et que le manche pointe vers la tige ; son cylindre est le manche du couteau,
//                 la planche ajoute la garde et la lame ;
//   la boule      2-01 « boule-dessous », sans son objet, tournée de 12° (l'avant-bras vient d'en bas à gauche) : la main
//                 tient la boule par-dessous, la paume en l'air, la boule dans le creux, les doigts devant ; la boule de
//                 la planche a le rayon de la boule du fichier, pour que les doigts la tiennent juste ; l'avant-bras est
//                 coupé par le bas de la vue. Choisie contre 8-01 « paume-en-lair » (la boule posée devant les doigts
//                 se lisait mal, c'était la main refusée) et la paire 3-03/3-04 « coupe » (deux mains pour un geste
//                 d'une main).
// Pas de tête : le gros plan sur la main la remplace (JP, 19 octobre 2026) ; le souffle entre par le bord gauche de la
// vue, la fumée monte de l'autre côté.
//
// Ce que le texte donne et que la planche montre, sans cote (aucune mesure de fabrication) : les quatre grosseurs
// (moins de 2 cm, 2 à 5 cm, moins de 15 cm), dans la légende ; « à un doigt de l'amadou » (la pointe au-dessus du
// creux, du vide entre les deux) ; « presque d'équerre » (le couteau en travers de la tige) ; « à une longueur
// d'avant-bras » reste dans la légende du repère 14 (le visage n'est plus dessiné).
//
// Le rouge : 10 (le cercle du dos du couteau sur la tige), 11 (la flèche : tirer la tige), 17 (la flèche : glisser
// le nid). Chaque rouge a son repère.

// ═══ Le bois, une fonction réutilisable ══════════════════════════════════════════════════════════════════
// JP, 19 octobre 2026, sur la vue « Trier en quatre tas » : « le bois pas beau, refais ça ». Ce qui faisait crayon : des
// tubes identiques, de même longueur, empilés en nid d'abeille et vus par le bout. Le bois se dessine comme du bois :
// l'écorce au trait irrégulier, des nœuds, des rameaux coupés, des bouts coupés en biais ; le bout scié avec ses cernes
// décentrés (le bois pousse plus d'un côté), une fente de séchage large à l'écorce et fine vers le cœur ; les quartiers
// fendus aux faces nettes, avec le fil du bois ; des pièces de grosseurs, de longueurs et d'angles variés. La forme de la
// corde du tome 2 (images/tomes/essais-ia/tome-2/objets-bas/corde.py) sert de modèle pour le bout et les quartiers.
//
// boisDe(h) rend les outils, en vue de trois quarts, d'un peu au-dessus (22°, comme le tipi). Repère du monde : x à
// droite, y vers nous, z en haut ; O est le point de la vue sous l'origine. La lumière vient d'en haut à gauche.
//   branche(O, s)  une branche ou un rondin, l'axe un peu courbe ; s : { c (le centre du bout qu'on voit), cap (l'angle
//                  au sol, de x vers le fond), pente, L, r, k (le rayon au bout loin, en fraction de r), biais (degrés)
//                  et biaisA, cernes, fentes, ecorce ('lisse', 'sillons', 'bouleau'), noeuds, rameaux, pointe, trait } ;
//   fendu(O, s)    une bûche droite, ronde ('rond'), en demie ('demi') ou en quartier ('quart', angle al) ; th : où
//                  est l'écorce dans la section (90 : en haut) ;
//   rouleau(O, s)  un rouleau d'écorce de bouleau (roulé, pas un cylindre plein : la spirale au bout, les lenticelles) ;
//   tasFin, tasMoyen, tasBuches (O, echelle)   les trois tas de bois de la vue 1 (et le tas 18 de la vue 6).
const boisDe = (h) => {
  const A = h.a;
  const f = v => Math.round(v * 10) / 10;
  const rad = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]], sub = (p, q) => [p[0] - q[0], p[1] - q[1]], mul = (p, k) => [p[0] * k, p[1] * k];
  const dot = (p, q) => p[0] * q[0] + p[1] * q[1], lon = p => Math.hypot(p[0], p[1]), unit = p => mul(p, 1 / (lon(p) || 1));
  const perp = p => [-p[1], p[0]];
  const add3 = (p, q) => [p[0] + q[0], p[1] + q[1], p[2] + q[2]], sub3 = (p, q) => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
  const mul3 = (p, k) => [p[0] * k, p[1] * k, p[2] * k], dot3 = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
  const cross3 = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
  const unit3 = p => mul3(p, 1 / (Math.hypot(...p) || 1));
  const gen = s => { let g = Math.max(1, Math.round(s * 7919) % 2147483646); return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const TH = 22, sT = Math.sin(rad(TH)), cT = Math.cos(rad(TH));
  const VERS_NOUS = [0, cT, sT];                     // la direction du regard, vers nous
  const LUM = unit3([-0.55, 0.45, 0.7]);             // vers la lumière : en haut à gauche, un peu devant
  const P = (O, p) => [O[0] + p[0], O[1] + p[1] * sT - p[2] * cT];
  const Pv = v => [v[0], v[1] * sT - v[2] * cT];
  const M = p => `M ${f(p[0])} ${f(p[1])}`, Lp = p => ` L ${f(p[0])} ${f(p[1])}`;
  const poly = (pts, ferme = true) => pts.map((p, i) => (i ? Lp(p) : M(p))).join('') + (ferme ? ' Z' : '');
  const lisse = (pts, ferme = false) => {
    const n = pts.length, p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = M(pts[0]);
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  const remplir = (at, c) => at.replace('fill="none"', `fill="${c}"`);
  const BLANC = '#FFFFFF', OMBRE = '#CFCFCF';
  const TRAITS = { arete: A.arete, detail: A.detail, fin: A.fin };
  let nId = 0;
  const inst = ++boisDe.n;
  const nouvelId = () => `bois${inst}-${++nId}-1340`;
  const decoupe = (d, contenu) => { const id = nouvelId(); return `<clipPath id="${id}"><path d="${d}" fill="#FFFFFF" stroke="none"/></clipPath><g clip-path="url(#${id})">${contenu}</g>`; };
  const direction = s => { const a = rad(s.cap), b = rad(s.pente || 0); return [Math.cos(b) * Math.cos(a), -Math.cos(b) * Math.sin(a), Math.sin(b)]; };
  const repere = d => { let e1 = cross3(d, [0, 0, 1]); if (Math.hypot(...e1) < 1e-6) e1 = [1, 0, 0]; e1 = unit3(e1); return [e1, cross3(e1, d)]; };
  // l'arc d'une suite fermée de points, de i à j, par le côté qui contient l'indice m
  const arc = (pts, i, j, m) => {
    const n = pts.length, av = [], ar = [];
    for (let k = i; ; k = (k + 1) % n) { av.push(k); if (k === j) break; }
    for (let k = i; ; k = (k - 1 + n) % n) { ar.push(k); if (k === j) break; }
    return (av.includes(m) ? av : ar).map(k => pts[k]);
  };

  // ── Le bout scié ─────────────────────────────────────────────────────────────────────────────────────
  // plan(x, y) : le point 3D du plan de coupe (x, y en fractions de r dans la section) ; sec : la section, une suite
  // fermée de { p, m, arc } (m : 'e' l'écorce, 'f' le bois fendu) ; coeur : le cœur dans la section.
  const bout = (O, plan, sec, s, g) => {
    const vue = q => P(O, plan(q[0], q[1]));
    const tr = TRAITS[s.trait || 'arete'];
    const contour = sec.map(q => vue(q.p));
    const out = [h.path(poly(contour), A.blanc)];
    const eb = s.r < 4 ? 0.2 : s.r < 8 ? 0.14 : 0.1;          // l'épaisseur de l'écorce, en fraction du rayon
    const dedans = sec.map(q => { const L = lon(q.p); return q.arc && L > eb * 1.5 ? mul(q.p, 1 - eb / L) : q.p; });
    const dedansD = poly(dedans.map(vue));
    // les cernes, autour d'un cœur décentré : le bois pousse plus d'un côté (le bois de compression)
    const coeur = s.coeur || [0, 0];
    const nc = s.cernes ?? (s.r > 9 ? 4 : s.r > 2.5 ? 2 : 0);
    const ea = g() * 2 * Math.PI, ex = (0.08 + g() * 0.1) * (s.forme && s.forme !== 'rond' ? 0.5 : 1);
    let cer = '';
    for (let i = 1; i <= nc; i++) {
      const fr = Math.pow(i / (nc + 0.7), 0.9) * (1 + (g() - 0.5) * 0.08) * (1 - eb), ph = [g() * 6, g() * 6];
      const o = [coeur[0] + Math.cos(ea) * ex * fr, coeur[1] + Math.sin(ea) * ex * fr];
      const pts = [];
      for (let k = 0; k < 40; k++) { const a = k / 40 * 2 * Math.PI, rr = fr * (1 + 0.05 * Math.sin(2 * a + ph[0]) + 0.03 * Math.sin(3 * a + ph[1])); pts.push(vue([o[0] + rr * Math.cos(a), o[1] + rr * Math.sin(a)])); }
      // un cerne coupé une ou deux fois, comme au crayon
      const n0 = Math.floor(g() * 40), trou = 3 + Math.floor(g() * 5), garde = pts.filter((_, k) => ((k - n0 + 40) % 40) >= trou);
      const rot = []; for (let k = 0; k < 40; k++) { const kk = (n0 + trou + k) % 40; if (((kk - n0 + 40) % 40) >= trou) rot.push(pts[kk]); }
      cer += lisse(rot.length ? rot : garde) + ' ';
    }
    if (nc) out.push(decoupe(dedansD, h.path(cer, s.r > 9 ? A.detail : A.fin)));
    // la fente de séchage : large à l'écorce, fine vers le cœur, dans l'arc d'écorce
    const arcs = sec.filter(q => q.arc);
    for (let k = 0; k < (s.fentes ?? (s.r > 9 ? 1 : 0)); k++) {
      const q = arcs[Math.floor(arcs.length * (0.2 + g() * 0.6))].p, u = unit(q), n = perp(u), L = lon(q);
      const r0 = 0.1 + g() * 0.12, w = 0.09 + g() * 0.04;
      const pts = [add(coeur, mul(u, r0)), add(mul(u, (r0 + L) / 2), mul(n, w * 0.55)), add(mul(u, L * 1.01), mul(n, w)), add(mul(u, L * 1.01), mul(n, -w)), add(mul(u, (r0 + L) / 2), mul(n, -w * 0.4))];
      out.push(h.path(poly(pts.map(vue)), A.plein));
    }
    // l'écorce du bout : la ligne entre l'écorce et le bois, et de petites entailles dans l'écorce
    let ec = '';
    for (let i = 0; i < sec.length; i++) if (sec[i].arc && sec[(i + 1) % sec.length].arc) ec += M(vue(dedans[i])) + Lp(vue(dedans[(i + 1) % sec.length]));
    if (s.r >= 2.6) out.push(h.path(ec, s.r > 6 ? A.detail : A.fin));   // sur une brindille, un second cercle ferait une paille
    if (s.r > 6) {
      let ent = '';
      arcs.forEach((q, i) => { if (i % 3 || g() < 0.4) return; const u = unit(q.p), L = lon(q.p); ent += M(vue(mul(u, L - eb * 0.25))) + Lp(vue(mul(u, L - eb * 0.8))); });
      out.push(h.path(ent, A.fin));
    }
    const c0 = vue([coeur[0] + Math.cos(ea) * ex * 0.05, coeur[1] + Math.sin(ea) * ex * 0.05]);
    out.push(h.cercle(c0[0], c0[1], s.r > 2 ? Math.max(0.6, Math.min(1.1, s.r * 0.07)) : Math.max(0.3, s.r * 0.22), A.plein));   // la moelle
    out.push(h.path(poly(contour), tr));
    return out.join('\n');
  };

  // ── La branche, ou le rondin : l'axe un peu courbe, le rayon qui varie ──────────────────────────────────
  const branche = (O, s) => {
    const g = gen(s.graine || 1), out = [];
    const d0 = s.d || direction(s), [e1, e2] = repere(d0), L = s.L, r = s.r, k = s.k ?? 0.75;
    const tr = TRAITS[s.trait || (r < 2.6 ? 'detail' : 'arete')];
    const bow = s.courbe ?? (g() - 0.5) * 0.08, ba = rad(s.courbeA ?? g() * 360);
    const bv = add3(mul3(e1, Math.cos(ba)), mul3(e2, Math.sin(ba)));
    const C = t => add3(add3(s.c, mul3(d0, L * t)), mul3(bv, L * bow * 4 * t * (1 - t)));
    const D = t => unit3(add3(mul3(d0, L), mul3(bv, L * bow * 4 * (1 - 2 * t))));
    const cadre = t => { const d = D(t), E1 = unit3(sub3(e1, mul3(d, dot3(e1, d)))); return [E1, cross3(E1, d), d]; };
    const ph = [g() * 6, g() * 6, g() * 6];
    const noeudsT = [...Array(s.noeuds || 0)].map(() => 0.18 + g() * 0.66);
    const rho = t => r * (1 + (k - 1) * t) * (1 + 0.035 * Math.sin(9 * t + ph[0]) + 0.02 * Math.sin(23 * t + ph[1])) * (1 + noeudsT.reduce((m, tk) => m + 0.12 * Math.exp(-((((t - tk) * L) / (r * 1.4)) ** 2)), 0));
    const Sx = (t, a, kk = 1) => { const [E1, E2] = cadre(t); return add3(C(t), mul3(add3(mul3(E1, Math.cos(a)), mul3(E2, Math.sin(a))), rho(t) * kk)); };
    const T = t => unit(Pv(D(t))), N = t => perp(T(t));
    // le bout qu'on voit : scié droit, ou en biais (le plan de coupe penché de biais degrés vers l'angle biaisA)
    const tb = Math.tan(rad(s.biais || 0)), ua = rad(s.biaisA ?? 0), ul = [Math.cos(ua), Math.sin(ua)];
    const [E1o, E2o] = cadre(0);
    const plan = (x, y) => add3(add3(C(0), add3(mul3(E1o, x * r), mul3(E2o, y * r))), mul3(d0, tb * r * (x * ul[0] + y * ul[1])));
    const nb = 40, bumps = [g() * 6, g() * 6];
    const sec = [...Array(nb)].map((_, i) => { const a = i / nb * 2 * Math.PI, rr = 1 + (r > 6 ? 0.025 : 0.01) * Math.sin(2 * a + bumps[0]) + (r > 6 ? 0.015 : 0) * Math.sin(3 * a + bumps[1]); return { p: [rr * Math.cos(a), rr * Math.sin(a)], m: 'e', arc: true }; });
    const capS = sec.map(q => P(O, plan(q.p[0], q.p[1])));
    const m = unit3(add3(mul3(d0, -1), mul3(add3(mul3(E1o, ul[0]), mul3(E2o, ul[1])), tb)));
    const capVu = dot3(m, VERS_NOUS) > 0.02;
    const o0 = P(O, C(0)), N0 = N(0), T0 = T(0);
    let ip = 0, im = 0, it = 0;
    capS.forEach((p, i) => { const v = dot(sub(p, o0), N0), w = dot(sub(p, o0), T0); if (v > dot(sub(capS[ip], o0), N0)) ip = i; if (v < dot(sub(capS[im], o0), N0)) im = i; if ((capVu ? w : -w) > (capVu ? 1 : -1) * dot(sub(capS[it], o0), T0)) it = i; });
    const tAx = i => dot3(sub3(plan(sec[i].p[0], sec[i].p[1]), C(0)), d0) / L;
    const ns = Math.max(16, Math.round(L / 2.5));
    const cote = (sg, i0) => { const o = [capS[i0]]; for (let j = 1; j <= ns; j++) { const t = j / ns; if (t > tAx(i0) + 0.6 / ns) o.push(add(P(O, C(t)), mul(N(t), sg * rho(t)))); } return o; };
    const sp = cote(1, ip), sm = cote(-1, im);
    // le bout loin : la moitié de la section qui dépasse ; ou une pointe cassée (une brindille)
    let loin;
    if (s.pointe) {
      const o1 = P(O, C(1)), T1 = T(1), N1 = N(1), rr = rho(1);
      loin = [add(o1, add(mul(T1, rr * 1.2), mul(N1, rr * 0.5))), add(o1, mul(T1, rr * 3.2)), add(o1, add(mul(T1, rr * 1.9), mul(N1, -rr * 0.2))), add(o1, add(mul(T1, rr * 2.4), mul(N1, -rr * 0.7)))];
    } else {
      const [E1f, E2f] = cadre(1), o1 = P(O, C(1)), N1 = N(1), T1 = T(1), rr = rho(1);
      const fs = [...Array(36)].map((_, i) => { const a = i / 36 * 2 * Math.PI; return add(o1, mul(Pv(add3(mul3(E1f, Math.cos(a)), mul3(E2f, Math.sin(a)))), rr)); });
      let jp = 0, jm = 0, jt = 0;
      fs.forEach((p, i) => { if (dot(sub(p, o1), N1) > dot(sub(fs[jp], o1), N1)) jp = i; if (dot(sub(p, o1), N1) < dot(sub(fs[jm], o1), N1)) jm = i; if (dot(sub(p, o1), T1) > dot(sub(fs[jt], o1), T1)) jt = i; });
      loin = arc(fs, jp, jm, jt).slice(1, -1);
    }
    const proche = arc(capS, im, ip, it);
    const corps = [...sp, ...loin, ...sm.slice().reverse(), ...proche.slice(1, -1)];
    const corpsD = poly(corps);
    out.push(h.path(corpsD, A.blanc));
    // l'ombre : la bande du corps tournée à l'opposé de la lumière (une face par volume)
    let tex = '';
    if (r >= 2 && s.ombre !== false) {
      const bh = [], bb = [];
      for (let j = 0; j <= ns; j++) {
        const t = j / ns, [E1, E2] = cadre(t), oc = P(O, C(t)), Nt = N(t), rr = rho(t);
        let lo = 1e9, hi = -1e9;
        for (let i = 0; i < 72; i++) {
          const a = i / 72 * 2 * Math.PI, rv = add3(mul3(E1, Math.cos(a)), mul3(E2, Math.sin(a)));
          if (dot3(rv, VERS_NOUS) <= 0 || dot3(rv, LUM) > -0.12) continue;
          const v = dot(Pv(rv), Nt) * rr; lo = Math.min(lo, v); hi = Math.max(hi, v);
        }
        if (hi > lo) { bh.push(add(oc, mul(Nt, hi + (hi > rr * 0.9 ? 2 : 0)))); bb.push(add(oc, mul(Nt, lo - (lo < -rr * 0.9 ? 2 : 0)))); }
      }
      if (bh.length > 2) tex += h.path(poly([...bh, ...bb.reverse()]), A.ombre);
    }
    // l'écorce : des sillons dans le sens du bois, ou les lenticelles du bouleau en travers, ou presque rien (jeune branche)
    const ecorce = s.ecorce || (r > 6 ? 'sillons' : 'lisse');
    const visible = (t, a) => { const [E1, E2] = cadre(t); return dot3(add3(mul3(E1, Math.cos(a)), mul3(E2, Math.sin(a))), VERS_NOUS); };
    let sil = '', len = '';
    const nEc = ecorce === 'sillons' ? Math.round(6 + r * 0.9) : ecorce === 'bouleau' ? Math.round(6 + r * 2.2) : Math.round(1 + r * 1.1);
    for (let i = 0, essais = 0; i < nEc && essais < 200; essais++) {
      const a = g() * 2 * Math.PI, t0 = 0.04 + g() * 0.8;
      if (visible(t0, a) < 0.25) continue;
      i++;
      if (ecorce === 'bouleau') {
        const da = (0.1 + g() * 0.22) * (r < 4 ? 1.5 : 1), pts = [];
        for (let q = 0; q <= 5; q++) pts.push(P(O, Sx(t0, a - da / 2 + da * q / 5, 1.01)));
        len += lisse(pts) + ' ';
      } else {
        const lt = ecorce === 'sillons' ? 0.12 + g() * 0.35 : 0.05 + g() * 0.08, pts = [];
        for (let q = 0; q <= 6; q++) { const t = Math.min(0.99, t0 + lt * q / 6); pts.push(P(O, Sx(t, a + (g() - 0.5) * 0.06, 1.0))); }
        sil += lisse(pts) + ' ';
      }
    }
    if (sil) tex += h.path(sil, A.fin);
    if (len) tex += h.path(len, r > 4 ? A.detail : A.fin);
    // les nœuds : une petite cicatrice ovale sur l'écorce, là où partait une branche
    let nd = '';
    noeudsT.forEach(tk => {
      let a = 0, best = -1; for (let i = 0; i < 12; i++) { const aa = g() * 2 * Math.PI, v = visible(tk, aa); if (v > 0.45 && v < 0.85 && g() < 0.7) { a = aa; best = v; break; } if (v > best) { best = v; a = aa; } }
      const [E1, E2, d] = cadre(tk), rv = add3(mul3(E1, Math.cos(a)), mul3(E2, Math.sin(a))), tg = add3(mul3(E1, -Math.sin(a)), mul3(E2, Math.cos(a)));
      const c = Sx(tk, a, 1.02), rr = rho(tk), ov = [], ov2 = [];
      for (let i = 0; i < 16; i++) { const b = i / 16 * 2 * Math.PI; ov.push(P(O, add3(c, add3(mul3(d, Math.cos(b) * rr * 0.42), mul3(tg, Math.sin(b) * rr * 0.3))))); ov2.push(P(O, add3(add3(c, mul3(rv, rr * 0.02)), add3(mul3(d, Math.cos(b) * rr * 0.16), mul3(tg, Math.sin(b) * rr * 0.12))))); }
      nd += h.path(lisse(ov, true), remplir(r > 4 ? A.detail : A.fin, BLANC)) + h.path(lisse(ov2, true), A.fin);
    });
    out.push(decoupe(corpsD, tex + nd));
    // le contour du corps (le bout qu'on voit a le sien)
    const devant = arc(capS, im, ip, (it + Math.round(nb / 2)) % nb).slice(1);
    if (s.ouvert) out.push(h.path(poly(capVu ? sp : [...devant, ...sp], false) + ' ' + poly(sm, false), tr));   // la base d'un rameau entre dans la branche : pas de trait
    else out.push(h.path(poly(capVu ? [...sp, ...loin, ...sm.slice().reverse()] : [...sp, ...loin, ...sm.slice().reverse(), ...devant], !capVu), tr));
    // les rameaux : de petites branches coupées qui partent en biais vers le bout loin
    for (let i = 0; i < (s.rameaux || 0); i++) {
      const tr0 = 0.25 + g() * 0.5;
      let a = 0; for (let q = 0; q < 20; q++) { a = g() * 2 * Math.PI; const v = visible(tr0, a); if (v > -0.1 && v < 0.6) break; }
      const [E1, E2, d] = cadre(tr0), rv = add3(mul3(E1, Math.cos(a)), mul3(E2, Math.sin(a)));
      const q = unit3(add3(mul3(d, Math.cos(rad(38))), mul3(rv, Math.sin(rad(38)))));
      const lr = rho(tr0) * (1.8 + g() * 1.6), base = add3(C(tr0), mul3(rv, rho(tr0) * 0.55)), bout3 = add3(base, mul3(q, lr));
      out.push(branche(O, { c: bout3, d: mul3(q, -1), L: lr, r: Math.max(0.5, rho(tr0) * 0.36), k: 1.3, courbe: 0, biais: 20, biaisA: g() * 360, ombre: false, ecorce: 'lisse', trait: 'detail', base: true, ouvert: true, noeuds: 0, rameaux: 0, graine: (s.graine || 1) * 13 + i }));
    }
    if (capVu && !s.base) out.push(bout(O, plan, sec, Object.assign({ r }, s, { fentes: s.fentes ?? (r > 9 ? 1 : 0) }), g));
    else if (capVu && s.base) out.push(h.path(poly(capS), remplir(A.fin, BLANC)) + h.path(poly(capS), tr));
    return out.join('\n');
  };

  // ── La bûche fendue (ou ronde), droite : la section poussée le long de l'axe, comme la corde ─────────────
  const section = (s, g) => {
    const ph = [g() * 6, g() * 6, g() * 6];
    const R = a => 1 + 0.025 * Math.sin(2 * a + ph[0]) + 0.018 * Math.sin(3 * a + ph[1]) + 0.01 * Math.sin(5 * a + ph[2]);
    const o = [];
    if (s.forme === 'rond') { for (let i = 0; i < 40; i++) { const a = i / 40 * 2 * Math.PI; o.push({ p: [R(a) * Math.cos(a), R(a) * Math.sin(a)], m: 'e', arc: true }); } return o; }
    const th = rad(s.th ?? 90), al = s.forme === 'demi' ? Math.PI : rad(s.al ?? 90), a0 = th - al / 2, a1 = th + al / 2;
    const n = Math.max(8, Math.round(al / rad(7)));
    for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; o.push({ p: [R(a) * Math.cos(a), R(a) * Math.sin(a)], m: 'e', arc: true }); }
    o[o.length - 1].m = 'f';
    if (s.forme === 'demi') o.push({ p: [0.02 * Math.cos(th), 0.02 * Math.sin(th)], m: 'f' });
    else [a1, a0].forEach(a => o.push({ p: [0.09 * Math.cos(a), 0.09 * Math.sin(a)], m: 'f' }));   // le cœur, émoussé
    return o;
  };
  const fendu = (O, s) => {
    const g = gen(s.graine || 1), out = [];
    const d = s.d || direction(s), [e1, e2] = repere(d), L = s.L, r = s.r, k = s.k ?? 0.97;
    const sec = s.sec || section(s, g), n = sec.length;
    const loc = (p, t) => add3(add3(s.c, mul3(d, L * t)), mul3(add3(mul3(e1, p[0]), mul3(e2, p[1])), r * (1 + (k - 1) * t)));
    const S0 = sec.map(q => P(O, loc(q.p, 0))), S1 = sec.map(q => P(O, loc(q.p, 1)));
    let ar = 0; for (let i = 0; i < n; i++) { const p = sec[i].p, q = sec[(i + 1) % n].p; ar += p[0] * q[1] - q[0] * p[1]; }
    const sg = ar > 0 ? 1 : -1;
    const nrm = sec.map((q, i) => { const p1 = q.p, p2 = sec[(i + 1) % n].p, dx = p2[0] - p1[0], dy = p2[1] - p1[1]; return unit3(add3(mul3(e1, sg * dy), mul3(e2, -sg * dx))); });
    const vu = nrm.map(v => dot3(v, VERS_NOUS) > 0.01);
    const sombre = nrm.map((v, i) => s.ombre !== false && dot3(v, LUM) < (sec[i].m === 'f' ? 0.05 : -0.08));
    // les faces vues, par suites de même teinte (pas de couture entre deux faces voisines)
    const suites = [];
    for (let i = 0; i < n; i++) {
      if (!vu[i]) continue;
      const der = suites[suites.length - 1];
      if (der && der.j === (i - 1 + n) % n && der.sombre === sombre[i]) der.j = i; else suites.push({ i, j: i, sombre: sombre[i] });
    }
    if (suites.length > 1) { const a = suites[0], b = suites[suites.length - 1]; if (a.i === 0 && b.j === n - 1 && a.sombre === b.sombre) { b.j = a.j + n; suites.shift(); } }
    const bande = ({ i, j }) => { const o = [], u = []; for (let q = i; q <= j + 1; q++) { o.push(S0[q % n]); u.push(S1[q % n]); } return [...o, ...u.reverse()]; };
    let union = '';
    suites.forEach(su => { const b = poly(bande(su)); union += b + ' '; out.push(h.path(b, su.sombre ? A.ombre : A.blanc)); });
    // la matière des faces : les sillons de l'écorce dans le sens du bois, le fil du bois sur les faces fendues
    let sil = '', fil = '', len = '';
    for (let i = 0; i < n; i++) {
      if (!vu[i]) continue;
      const p1 = sec[i].p, p2 = sec[(i + 1) % n].p;
      const tire = (u, t0, t1, ond) => { const pts = []; for (let q = 0; q <= 8; q++) { const t = t0 + (t1 - t0) * q / 8, w = ond * Math.sin(q * 1.3 + u * 9); pts.push(P(O, loc([p1[0] + (p2[0] - p1[0]) * (u + w), p1[1] + (p2[1] - p1[1]) * (u + w)], t))); } return lisse(pts); };
      if (sec[i].m === 'e' && s.ecorce === 'bouleau') {
        if (g() < 0.5) { const t0 = 0.05 + g() * 0.85; len += M(P(O, loc(p1, t0))) + Lp(P(O, loc([p1[0] + (p2[0] - p1[0]) * 1.6, p1[1] + (p2[1] - p1[1]) * 1.6], t0))) + ' '; }
      } else if (sec[i].m === 'e') {
        if (g() < 0.55) { const t0 = g() * 0.3; sil += tire(g(), t0, Math.min(1, t0 + 0.3 + g() * 0.6), 0.02) + ' '; }
      } else {
        const nf = 2 + Math.floor(lon(sub(p2, p1)) * 3);
        for (let q = 0; q < nf; q++) { const t0 = g() * 0.15; fil += tire((q + 0.3 + g() * 0.4) / nf, t0, Math.min(1, t0 + 0.4 + g() * 0.6), 0.015) + ' '; }
      }
    }
    out.push(decoupe(union, h.path(sil, A.fin) + h.path(fil, A.fin) + h.path(len, A.detail)));
    // les arêtes : le bout loin des faces vues, le contour sur les côtés, l'arête entre l'écorce et le bois fendu
    let fort = '', fin = '';
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, pv = (i - 1 + n) % n;
      if (vu[i]) fort += M(S1[i]) + Lp(S1[j]) + ' ';
      if (vu[i] !== vu[pv]) fort += M(S0[i]) + Lp(S1[i]) + ' ';
      else if (vu[i] && sec[i].m !== sec[pv].m) fin += M(S0[i]) + Lp(S1[i]) + ' ';
    }
    const tr = TRAITS[s.trait || 'arete'];
    out.push(h.path(fin, A.detail), h.path(fort, tr));
    if (dot3(mul3(d, -1), VERS_NOUS) > 0.02) out.push(bout(O, (x, y) => loc([x, y], 0), sec, Object.assign({ coeur: [0, 0] }, s), g));
    return out.join('\n');
  };

  // ── Le rouleau d'écorce de bouleau : une feuille roulée sur elle-même, pas un cylindre plein ─────────────
  // Au bout, la spirale de la feuille (deux tours et demi, le tour du dehors avec son épaisseur), le creux au milieu
  // dans l'ombre ; le long du rouleau, le bord libre de la feuille qui se soulève au bout ; les lenticelles en travers.
  const rouleau = (O, s) => {
    const out = [];
    const d = direction(s), [e1, e2] = repere(d), L = s.L, r = s.r;
    out.push(branche(O, Object.assign({}, s, { k: 1, courbe: 0, ecorce: 'bouleau', noeuds: 0, rameaux: 0, base: true, trait: 'arete', ombre: true })));
    const pl = (x, y) => P(O, add3(s.c, mul3(add3(mul3(e1, x), mul3(e2, y)), r)));
    const a0 = rad(s.bord ?? 120), tours = 1.75, n = 80, ray = t => 0.98 - 0.5 * t, ang = t => a0 + t * tours * 2 * Math.PI;
    const sp = [], sp2 = [];
    for (let i = 0; i <= n; i++) { const t = i / n, a = ang(t), rr = ray(t); sp.push(pl(rr * Math.cos(a), rr * Math.sin(a))); sp2.push(pl((rr - 0.1) * Math.cos(a), (rr - 0.1) * Math.sin(a))); }
    // le creux : le dedans du dernier tour, dans l'ombre ; il suit la spirale
    const t1 = 1 - 1 / tours, creux = sp2.filter((_, i) => i / n >= t1);
    out.push(h.path(lisse(creux, true), A.loin));
    out.push(h.path(lisse(sp), A.detail), h.path(lisse(sp2), A.fin));
    out.push(h.path(M(sp[n]) + Lp(sp2[n]), A.detail));                     // le bout de la feuille, au dedans
    // le bord libre de la feuille : une arête le long du rouleau, qui se soulève un peu au bout qu'on voit
    const bt = [...Array(9)].map((_, i) => { const t = i / 8; return P(O, add3(add3(s.c, mul3(d, L * t)), mul3(add3(mul3(e1, Math.cos(a0)), mul3(e2, Math.sin(a0))), r * (1.0 + 0.1 * (1 - t) ** 4)))); });
    out.push(h.path(lisse(bt), A.detail));
    return out.join('\n');
  };

  // ── La pile : on pose les pièces parallèles une à une, chacune descend jusqu'à toucher le sol ou une autre ──
  const croise = (a, b) => {
    const inter = (p, q, r2, s2) => { const d1 = sub(q, p), d2 = sub(s2, r2), den = d1[0] * d2[1] - d1[1] * d2[0]; if (Math.abs(den) < 1e-9) return false; const t = ((r2[0] - p[0]) * d2[1] - (r2[1] - p[1]) * d2[0]) / den, u = ((r2[0] - p[0]) * d1[1] - (r2[1] - p[1]) * d1[0]) / den; return t > 0 && t < 1 && u > 0 && u < 1; };
    const dans = (p, pts) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { if ((pts[i][1] > p[1]) !== (pts[j][1] > p[1]) && p[0] < (pts[j][0] - pts[i][0]) * (p[1] - pts[i][1]) / (pts[j][1] - pts[i][1]) + pts[i][0]) c = !c; } return c; };
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) if (inter(a[i], a[(i + 1) % a.length], b[j], b[(j + 1) % b.length])) return true;
    return dans(a[0], b) || dans(b[0], a);
  };
  // pieces : { forme, x (le long de la rangée, dans la section), r, th, al, recul (le bout plus ou moins avancé), … }
  const corde = (O, cap, pieces) => {
    const d = direction({ cap }), [e1, e2] = repere(d), poses = [];
    // la rangée va vers la droite, à l'opposé de e1 (e1 pointe à gauche quand la bûche fuit vers le fond à droite)
    pieces.forEach((p, i) => {
      const g = gen(p.graine || 100 + i), sec = section(p, g), pts = sec.map(q => [-q.p[0] * p.r, q.p[1] * p.r]);
      let y = 80;
      const touche = yy => { const m = pts.map(q => [q[0] + p.x, q[1] + yy]); return m.some(q => q[1] < 0) || poses.some(o => croise(m, o.m)); };
      while (y > -5 && !touche(y - 0.5)) y -= 0.5;
      while (y > -5 && !touche(y - 0.1)) y -= 0.1;
      poses.push({ p, sec, m: pts.map(q => [q[0] + p.x, q[1] + y]), y });
    });
    // l'ordre : du plus loin de nous au plus proche
    const vers = poses.map(o => ({ o, c: add3(add3(mul3(e1, -o.p.x), mul3(e2, o.y)), mul3(d, o.p.recul || 0)) }));
    vers.sort((a, b) => dot3(a.c, VERS_NOUS) - dot3(b.c, VERS_NOUS));
    // la pile touche le sol de la vue par son bout le plus proche
    let bas = -1e9;
    vers.forEach(({ o, c }) => o.sec.forEach(q => { bas = Math.max(bas, P([0, 0], add3(c, add3(mul3(e1, q.p[0] * o.p.r), mul3(e2, q.p[1] * o.p.r))))[1]); }));
    const O2 = [O[0], O[1] - bas];
    const haut = poses.reduce((m, o) => (Math.max(...o.m.map(q => q[1])) > Math.max(...m.m.map(q => q[1])) ? o : m));
    const ht = haut.m.reduce((m, q) => (q[1] > m[1] ? q : m));
    const dessus = add(P(O2, add3(add3(mul3(e1, -ht[0]), mul3(e2, ht[1])), mul3(d, (haut.p.recul || 0) + haut.p.L * 0.45))), [0, 0.6]);
    return Object.assign(new String(vers.map(({ o, c }) => fendu(O2, Object.assign({}, o.p, { sec: o.sec, d, c }))).join('\n')), { dessus });
  };

  // ── Les trois tas de bois (échelle e : 1 pour la vue 1) ─────────────────────────────────────────────────
  // On pose les branches une à une, dans l'ordre de la liste (le fond et le dessous d'abord) : chacune repose sur le sol
  // ou sur celles qu'elle croise, à la hauteur de leur dessus, et penche si ses appuis ne sont pas à la même hauteur.
  // s : { x, y (le bout qu'on voit, au sol), cap, L, r, k, … } ; rend les pièces prêtes pour branche().
  const empile = liste => {
    const poses = [], out = [];
    liste.forEach(s0 => {
      const s = Object.assign({}, s0), a = rad(s.cap), u2 = [Math.cos(a), -Math.sin(a)], k = s.k ?? 0.75;
      const p0 = [s.x, s.y], p1 = add(p0, mul(u2, s.L)), appuis = [[0, s.r], [1, s.r * k]];
      poses.forEach(q => {
        const d1 = sub(p1, p0), d2 = sub(q.p1, q.p0), den = d1[0] * d2[1] - d1[1] * d2[0];
        if (Math.abs(den) < 1e-6) return;
        const t = ((q.p0[0] - p0[0]) * d2[1] - (q.p0[1] - p0[1]) * d2[0]) / den, w = ((q.p0[0] - p0[0]) * d1[1] - (q.p0[1] - p0[1]) * d1[0]) / den;
        if (t < 0 || t > 1 || w < 0 || w > 1) return;
        appuis.push([t, q.z0 + (q.z1 - q.z0) * w + q.r * (1 + (q.k - 1) * w) + s.r * (1 + (k - 1) * t)]);
      });
      // la droite la plus basse qui passe au-dessus de tous les appuis, sous le milieu de la pièce
      let best = null;
      appuis.forEach(pi => appuis.forEach(pj => {
        if (pi === pj || pi[0] > 0.5 || pj[0] < 0.5) return;
        const sl = pj[0] > pi[0] ? (pj[1] - pi[1]) / (pj[0] - pi[0]) : 0, z = u => pi[1] + sl * (u - pi[0]);
        if (appuis.every(pk => z(pk[0]) >= pk[1] - 1e-6) && (!best || z(0.5) < best(0.5))) best = z;
      }));
      const z0 = best(0), z1 = best(1);
      poses.push({ p0, p1, z0, z1, r: s.r, k });
      s.c = [s.x, s.y, z0]; s.d = unit3([u2[0] * s.L, u2[1] * s.L, z1 - z0]); s.L = Math.hypot(s.L, z1 - z0);
      out.push(s);
    });
    return out;
  };
  const echelle = (s, e) => Object.assign({}, s, { x: s.x * e, y: s.y * e, L: s.L * e, r: s.r * e });
  // le bois fin, de moins de 2 cm : des brindilles et de petites branches en vrac, croisées, de grosseurs et de longueurs
  // variées ; des bouts coupés en biais, des pointes cassées, de petits rameaux
  const BRINDILLES = [
    { x: -30, y: -18, cap: 28, L: 52, r: 1.4, k: 0.5, pointe: true, biais: 40, biaisA: 200 },
    { x: -35, y: -9, cap: 21, L: 58, r: 1.8, k: 0.55, noeuds: 1, biais: 35, biaisA: 170 },
    { x: -27, y: -2, cap: 34, L: 50, r: 1.2, k: 0.5, pointe: true, rameaux: 1 },
    { x: -33, y: 4, cap: 17, L: 56, r: 1.6, k: 0.55, biais: 30, biaisA: 190 },
    { x: 19, y: 0, cap: 152, L: 50, r: 1.5, k: 0.5, pointe: true, rameaux: 1, biais: 30, biaisA: 20 },
    { x: 25, y: -7, cap: 161, L: 54, r: 1.9, k: 0.6, noeuds: 1, biais: 35, biaisA: 340 },
    { x: 12, y: 5, cap: 144, L: 44, r: 1.1, k: 0.5, pointe: true },
    { x: -22, y: 1, cap: 41, L: 50, r: 1.7, k: 0.55, biais: 40, biaisA: 210, rameaux: 1 },
    { x: -15, y: -7, cap: 25, L: 46, r: 1.3, k: 0.5, pointe: true },
    { x: -29, y: 6, cap: 31, L: 40, r: 1.0, k: 0.5, pointe: true, biais: 45, biaisA: 180 },
    { x: 16, y: 4, cap: 166, L: 42, r: 1.25, k: 0.5, pointe: true, rameaux: 1 },
    { x: -10, y: 4, cap: 52, L: 34, r: 0.9, k: 0.6, pointe: true },
    { x: 10, y: -2, cap: 150, L: 46, r: 1.4, k: 0.5, pointe: true, biais: 35, biaisA: 10 },
    { x: -24, y: -3, cap: 33, L: 44, r: 1.2, k: 0.5, pointe: true, rameaux: 1 },
    { x: 4, y: 5, cap: 140, L: 30, r: 0.9, k: 0.55, pointe: true },
  ];
  const tasFin = (O, e = 1) => empile(BRINDILLES.map(s => echelle(s, e))).map((s, i) => branche(O, Object.assign(s, { ecorce: 'lisse', courbe: s.courbe ?? 0.03 * Math.sin(i * 2.3), graine: 300 + i * 7 }))).join('\n');
  // le bois de 2 à 5 cm : des branches sciées, croisées, l'écorce, des nœuds, des rameaux coupés, du bouleau
  const BRANCHES = [
    { x: -40, y: -15, cap: 24, L: 70, r: 3.8, k: 0.78, noeuds: 1, courbe: 0.05, ecorce: 'sillons' },
    { x: -44, y: -5, cap: 30, L: 66, r: 4.4, k: 0.74, noeuds: 2, rameaux: 1, courbe: -0.04 },
    { x: -38, y: 5, cap: 20, L: 62, r: 3.2, k: 0.82, ecorce: 'bouleau', biais: 25, biaisA: 190, courbe: 0.03 },
    { x: 30, y: 4, cap: 156, L: 64, r: 3.6, k: 0.76, noeuds: 1, courbe: 0.06, ecorce: 'sillons' },
    { x: 34, y: -6, cap: 147, L: 60, r: 3.0, k: 0.8, rameaux: 1, courbe: -0.05 },
    { x: -30, y: 2, cap: 36, L: 62, r: 4.0, k: 0.78, noeuds: 1, courbe: 0.04, ecorce: 'sillons' },
    { x: -36, y: -8, cap: 26, L: 58, r: 3.3, k: 0.8, ecorce: 'bouleau', courbe: -0.03 },
    { x: 26, y: 2, cap: 161, L: 56, r: 3.4, k: 0.8, noeuds: 1, rameaux: 1, courbe: 0.05 },
  ];
  const tasMoyen = (O, e = 1) => empile(BRANCHES.map(s => echelle(s, e))).map((s, i) => branche(O, Object.assign(s, { graine: 500 + i * 11, trait: e < 0.8 ? 'detail' : 'arete' }))).join('\n');
  // les bûches de moins de 15 cm : des rondins et des quartiers, empilés comme une petite corde
  const BUCHES = [
    { forme: 'rond', x: 0, r: 12.5, recul: 0, fentes: 2 },
    { forme: 'quart', x: 25, r: 15.5, th: -62, al: 92, recul: -4 },
    { forme: 'demi', x: 49, r: 12.5, th: -96, recul: 2 },
    { forme: 'rond', x: 72, r: 11, recul: -2, ecorce: 'bouleau', fentes: 1 },
    { forme: 'quart', x: 12, r: 14, th: -118, al: 86, recul: 3 },
    { forme: 'rond', x: 38, r: 11.5, recul: -1, fentes: 1 },
    { forme: 'demi', x: 61, r: 11.5, th: -82, recul: 1 },
  ];
  const tasBuches = (O, e = 1, cap = 58) => corde(O, cap, BUCHES.map((p, i) => Object.assign({}, p, { x: p.x * e, r: p.r * e, recul: (p.recul || 0) * e, L: 52 * e, graine: 700 + i * 13 })));

  // le dessus d'une pièce, à la fraction t de sa longueur : là où aboutit la ligne de rappel d'un renvoi
  const dessusDe = (O, s, t = 0.45) => add(P(O, add3(s.c, mul3(s.d || direction(s), s.L * t))), [0, -s.r * cT + 0.4]);
  const cibleFin = (O, e = 1) => dessusDe(O, empile(BRINDILLES.map(s => echelle(s, e)))[13], 0.45);
  const cibleMoyen = (O, e = 1) => dessusDe(O, empile(BRANCHES.map(s => echelle(s, e)))[BRANCHES.length - 1], 0.45);
  return { branche, fendu, rouleau, corde, tasFin, tasMoyen, tasBuches, cibleFin, cibleMoyen, P, TH };
};
boisDe.n = 0;

module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const deg = a => a * Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const lon = p => Math.hypot(p[0], p[1]);
  const unit = p => mul(p, 1 / lon(p));
  const perp = p => [-p[1], p[0]];
  const dir = a => [Math.cos(deg(a)), Math.sin(deg(a))];
  const gen = s => { let g = s; return () => (g = (g * 16807) % 2147483647) / 2147483647; };
  const BLANC = '#FFFFFF', GRIS = '#E6E6E6', OMBRE = '#CFCFCF';
  const remplir = (at, c) => at.replace('fill="none"', `fill="${c}"`);
  const M = p => `M ${f(p[0])} ${f(p[1])}`;
  const Lp = p => ` L ${f(p[0])} ${f(p[1])}`;
  const poly = (pts, ferme = true) => pts.map((p, i) => (i ? Lp(p) : M(p))).join('') + (ferme ? ' Z' : '');
  const clip = (id, d) => `<clipPath id="${id}"><path d="${d}" fill="#FFFFFF" stroke="none"/></clipPath>`;

  // Courbe lisse (Catmull-Rom) par tous les points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, p = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = M(pts[0]);
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Ce qui sort d'une vue (un avant-bras, un cou) est coupé net par son bord.
  const coupe = (id, z, svg) => `<clipPath id="vue-${id}-1340"><rect x="0" y="0" width="${z.l}" height="${z.h}" fill="#FFFFFF" stroke="none"/></clipPath>\n<g clip-path="url(#vue-${id}-1340)">\n${svg}\n</g>`;
  // un brin qui dépasse d'un contour : part un peu en dedans, sort et se courbe
  const brin = (p, o, l, s) => { const t = perp(o); return `${M(add(p, mul(o, -l * 0.3)))} Q ${f(p[0] + o[0] * l * 0.5 + t[0] * l * s * 0.5)} ${f(p[1] + o[1] * l * 0.5 + t[1] * l * s * 0.5)} ${f(p[0] + o[0] * l + t[0] * l * s)} ${f(p[1] + o[1] * l + t[1] * l * s)} `; };

  // Prolonger l'avant-bras d'une main de la bibliothèque jusqu'au bord de la vue (comme 04-41) : deux traits qui
  // continuent ses bords depuis la coupe, et un fond blanc qui couvre la coupe. La main n'est ni déformée ni
  // redessinée. coupeFichier : les deux bouts de la coupe, relevés sur le dessin de la main (le catalogue ne la
  // donne pas juste pour toutes) ; o : les mêmes options que pour mainStock.
  const CAT = require('../../.claude/skills/planches/scripts/mains/stock.js').catalogue;
  const IDS = { 'manche-vers-bas': '2-07', 'poing-cylindre': '2-13' };
  // les deux bouts de la coupe de l'avant-bras et, pour chacun, la direction du bord qui y arrive (dans le fichier)
  const COUPES = {
    '2-07': [[[3102, 842], [6, -21]], [[2945, 819], [1, -12]]],
    '2-13': [[[5869, 1392], [5, 43]], [[5688, 1401], [-14, 261]]],
  };
  const versVue = o => {
    const Mc = CAT[IDS[o.id] || o.id], [bx0, by0, bx1, by1] = Mc.boite, W = bx1 - bx0, H = by1 - by0;
    const k = o.echelle || (o.taille || 120) / Math.max(W, H), sx = o.miroir ? -1 : 1;
    const an = o.ancre || (Mc.objet ? 'objet' : 'centre');
    const A0 = Array.isArray(an) ? [bx0 + an[0] * W, by0 + an[1] * H] : an === 'objet' ? [Mc.objet.x, Mc.objet.y] : [(bx0 + bx1) / 2, (by0 + by1) / 2];
    const c = Math.cos(deg(o.angle || 0)), s = Math.sin(deg(o.angle || 0));
    return ([px, py]) => { const u = sx * k * (px - A0[0]), v = k * (py - A0[1]); return [o.x + c * u - s * v, o.y + s * u + c * v]; };
  };
  const main = (o, L = 400) => {
    const m = F.mainStock(o), T = versVue(o);
    const [[q1, d1], [q2, d2]] = COUPES[IDS[o.id] || o.id];
    const p1 = T(q1), p2 = T(q2), u1 = unit(sub(T(add(q1, mul(d1, 10))), p1)), u2 = unit(sub(T(add(q2, mul(d2, 10))), p2));
    // le fond blanc part un peu en dedans de la coupe (il la couvre), les bords continuent ceux de la main
    const a1 = add(p1, mul(u1, -3)), a2 = add(p2, mul(u2, -3)), b1 = add(p1, mul(u1, L)), b2 = add(p2, mul(u2, L));
    const trait = 'fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    return { m, svg: [String(m), h.path(poly([a1, b1, b2, a2]), A.blanc), h.path(M(a1) + Lp(b1) + ' ' + M(a2) + Lp(b2), trait)].join('\n') };
  };

  // ═══ Le bois ═══════════════════════════════════════════════════════════════════════════════════════

  // Un bâton de bois : un peu courbe, qui s'amincit, les bouts coupés en biais.
  const baton = (a, b, ra, rb, graine) => {
    const g = gen(graine), L = lon(sub(b, a)), u = unit(sub(b, a)), v = perp(u);
    const pli = (g() - 0.5) * 0.05 * L, ctl = add(mul(add(a, b), 0.5), mul(v, pli));
    const axe = t => add(add(mul(a, (1 - t) ** 2), mul(ctl, 2 * t * (1 - t))), mul(b, t * t));
    const g1 = [], g2 = [], n = 12;
    for (let i = 0; i <= n; i++) { const t = i / n, w = ra + (rb - ra) * t, p = axe(t); g1.push(add(p, mul(v, w))); g2.push(add(p, mul(v, -w))); }
    // les coupes en biais : un côté dépasse un peu l'autre
    const cb = (g() - 0.5) * 1.2, ca = (g() - 0.5) * 1.2;
    g1[n] = add(g1[n], mul(u, cb * rb)); g2[n] = add(g2[n], mul(u, -cb * rb));
    g1[0] = add(g1[0], mul(u, ca * ra)); g2[0] = add(g2[0], mul(u, -ca * ra));
    return poly([...g1, ...g2.reverse()]);
  };

  // Le tipi : des bâtons dressés en cône lâche autour d'un point, une ouverture du côté du vent.
  // Repère au sol : x à droite, y vers nous, z en haut ; vu d'un peu au-dessus (TH).
  const TH = 22, sTH = Math.sin(deg(TH)), cTH = Math.cos(deg(TH));
  const P3 = (c, x, y, z) => [c[0] + x, c[1] + y * sTH - z * cTH];
  const OUV = [96, 176];                           // l'ouverture : devant à gauche (angles au sol, y vers nous)
  const tipi = (c, R, H, graine, { dedans = '', n = 14, ep = 2.2, sol = 1.6 } = {}) => {
    const g = gen(graine), out = [];
    out.push(h.ellipse(c[0], c[1], R * sol, R * sol * sTH, A.loin));
    const libre = 360 - (OUV[1] - OUV[0]);
    const batons = [];
    for (let i = 0; i < n; i++) {
      const a = OUV[1] + libre * (i + 0.5 + (g() - 0.5) * 0.45) / n;
      const rr = R * (0.88 + g() * 0.22);
      const pied = [rr * Math.cos(deg(a)), rr * Math.sin(deg(a)), 0];
      const som = [(g() - 0.5) * R * 0.1, (g() - 0.5) * R * 0.1, H];
      const k = 1.07 + g() * 0.08;
      const haut = [pied[0] + (som[0] - pied[0]) * k, pied[1] + (som[1] - pied[1]) * k, pied[2] + (som[2] - pied[2]) * k];
      batons.push({ a, y: pied[1], pied, haut, r: ep * (0.85 + g() * 0.35), graine: graine * 31 + i * 7 });
    }
    batons.sort((p, q) => p.y - q.y);
    const dessine = b => {
      const p = P3(c, ...b.pied), q = P3(c, ...b.haut);
      const loin = b.y < -R * 0.2;
      return h.path(baton(p, q, b.r, b.r * 0.55, b.graine), remplir(loin ? A.detail : A.arete, loin ? GRIS : BLANC));
    };
    batons.filter(b => b.y < 0).forEach(b => out.push(dessine(b)));
    out.push(dedans);
    batons.filter(b => b.y >= 0).forEach(b => out.push(dessine(b)));
    const om = deg((OUV[0] + OUV[1]) / 2);
    return {
      svg: out.join('\n'),
      // le milieu de l'ouverture, à la hauteur z (k : la distance au centre, en rayons du pied)
      ouv: (z, k = 1) => P3(c, Math.cos(om) * R * k * (1 - z / H), Math.sin(om) * R * k * (1 - z / H), z),
      om, batons,
    };
  };

  // ═══ L'amadou ══════════════════════════════════════════════════════════════════════════════════════

  // Le nid : la fonction commune (images/planches-src/_communs/nid.js), que 13-10 reprend aussi (JP, 19 octobre 2026 :
  // « prends le nid qui est réussi »). La marque 1340 garde les identifiants et le SVG d'avant, au caractère près.
  const { nid } = require('./_communs/nid.js')(h, '1340');

  // La boule : le nid refermé en boule lâche, de la même matière que le nid de la vue « Faire le nid » (repères 7 et 8),
  // pas une pelote gribouillée : une silhouette bosselée ; des fibres en longs traits souples qui font le tour en biais,
  // dans un sens puis dans l'autre (les mêmes arcs, au même trait, 0,5 et 0,7) ; des jours où l'on voit au travers
  // (le gris entre quatre brins qui se croisent) ; des bouts qui dépassent du contour ; en haut, le pli où le bord du nid
  // s'est refermé sur la braise, l'intérieur du pli dans l'ombre. Elle sert aussi pour la touffe de fibres sèches du
  // tas 1 (aplatie, posée au sol, sans pli). c : le centre ; r : le rayon ; ky : l'aplatissement ; sol : le y du sol.
  const pelote = (c, r, graine, { ky = 1, fibres = 1, jours = 2, bouts = 12, pli = true, sol = null, dessus = 0.35, brinL = 1, relief = 1 } = {}) => {
    const g = gen(graine), id = `pelote-${graine}-1340`, out = [];
    const ph = graine * 1.3, tl = deg(24), st = Math.sin(tl), ct = Math.cos(tl);
    const bosse = (a, b) => 1 + relief * (Math.cos(b) * (0.05 * Math.sin(3 * a + ph) + 0.03 * Math.sin(5 * a + 2 * ph + 2 * b) + 0.012 * Math.sin(11 * a + ph)) + 0.02 * Math.sin(2 * b + ph));
    // un point de la boule : longitude a (a = π/2 : vers nous), latitude b ; vue d'un peu au-dessus (tl)
    const p3 = (a, b, k = 1) => { const rr = r * k * bosse(a, b); return [rr * Math.cos(b) * Math.cos(a), rr * Math.cos(b) * Math.sin(a), rr * Math.sin(b) * ky]; };
    const vue = p => [c[0] + p[0], c[1] + p[1] * st - p[2] * ct];
    const prof = p => p[1] * ct + p[2] * st / Math.max(ky, 0.3);
    // la silhouette : le plus loin qu'atteint la boule dans chaque direction autour du centre
    const nbin = 64, rmax = Array(nbin).fill(0);
    for (let i = 0; i < 96; i++) for (let j = 0; j <= 48; j++) {
      const o = sub(vue(p3(i / 96 * 2 * Math.PI, -Math.PI / 2 + Math.PI * j / 48)), c), a = Math.atan2(o[1], o[0]);
      const k = ((Math.round(a / (2 * Math.PI) * nbin) % nbin) + nbin) % nbin; rmax[k] = Math.max(rmax[k], lon(o));
    }
    const sil = rmax.map((rr, k) => {
      const a = k / nbin * 2 * Math.PI, rs = (rmax[(k + nbin - 1) % nbin] + 2 * rr + rmax[(k + 1) % nbin]) / 4;
      const p = [c[0] + rs * Math.cos(a), c[1] + rs * Math.sin(a)];
      return sol != null && p[1] > sol ? [p[0], sol - (p[1] - sol) * 0.04] : p;
    });
    const silD = lisse(sil, true);
    out.push(`<defs>${clip(id, silD)}</defs>`);
    out.push(h.path(silD, A.blanc));
    // une fibre : un arc sur la boule, qui fait le tour en montant ou en descendant ; on garde ce qui est de notre côté
    const fibre = (a0, a1, b0, b1, bombe = 0) => {
      const runs = [[]];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24, a = a0 + (a1 - a0) * t, b = Math.max(-1.5, Math.min(1.5, b0 + (b1 - b0) * t + bombe * Math.sin(t * Math.PI)));
        const q = p3(a, b, 1.004 + 0.02 * Math.sin(t * Math.PI));
        if (prof(q) > -0.04 * r) runs[runs.length - 1].push(vue(q)); else if (runs[runs.length - 1].length) runs.push([]);
      }
      return runs.filter(q => q.length > 3).map(q => lisse(q)).join(' ') + ' ';
    };
    let paroi = '', paroi2 = '', bord = '';
    for (let i = 0; i < Math.round(80 * fibres); i++) {
      const sens = i % 2 ? 1 : -1, a0 = -0.25 * Math.PI + g() * 1.5 * Math.PI, da = Math.PI * (0.16 + g() * 0.3);
      const b0 = -1.3 + g() * (pli ? 2.2 : 2.6), db = sens * (0.04 + g() * 0.2);
      const d = fibre(a0, a0 + da, b0, b0 + db);
      if (g() < 0.22) paroi2 += d; else paroi += d;
    }
    // le dessus : le bord du nid rabattu, des fibres qui passent par-dessus d'un côté à l'autre
    if (pli) for (let i = 0; i < Math.round(10 * fibres); i++) {
      const a0 = Math.PI * (-0.2 + g() * 1.3), da = Math.PI * (0.2 + g() * 0.3) * (g() < 0.5 ? 1 : -1), b0 = 0.95 + g() * 0.3;
      bord += fibre(a0, a0 + da, b0, b0 + (g() - 0.5) * 0.15);
    }
    out.push(`<g clip-path="url(#${id})">`);
    out.push(h.path(paroi, A.fin), h.path(paroi2, A.detail), h.path(bord, A.fin));
    // les jours : un vide entre quatre brins qui se croisent (deux dans chaque sens), où l'on voit au travers (gris)
    for (let i = 0; i < jours; i++) {
      const a = Math.PI * (0.5 + (jours > 1 ? (i / (jours - 1) - 0.5) * 0.55 : 0.12) + (g() - 0.5) * 0.06), b = -0.15 + g() * 0.4;
      const q = vue(p3(a, b)), w = r * 0.075, hh = r * 0.045;
      const d1 = unit([1, -0.42]), d2 = unit([1, 0.5]);
      const coin = (s1, s2) => {
        const n1 = perp(d1), n2 = perp(d2), p1 = add(q, mul(n1, s1)), p2 = add(q, mul(n2, s2));
        const det = d1[0] * (-d2[1]) - d1[1] * (-d2[0]), tt = ((p2[0] - p1[0]) * (-d2[1]) - (p2[1] - p1[1]) * (-d2[0])) / det;
        return add(p1, mul(d1, tt)); };
      const e = hh * 0.9;
      out.push(h.path(poly([coin(-e, -e), coin(-e, e), coin(e, e), coin(e, -e)]), A.loin));
      let br = '';
      [-e, e].forEach(o1 => { const cc = add(q, mul(perp(d1), o1)); br += M(add(cc, mul(d1, -w * 1.7))) + Lp(add(cc, mul(d1, w * 1.7))) + ' '; });
      [-e, e].forEach(o2 => { const cc = add(q, mul(perp(d2), o2)); br += M(add(cc, mul(d2, -w * 1.7))) + Lp(add(cc, mul(d2, w * 1.7))) + ' '; });
      out.push(h.path(br, A.fin));
    }
    out.push('</g>');
    // le pli : la ligne où les deux bords se rejoignent, l'intérieur du pli dans l'ombre juste derrière
    if (pli) {
      const lv = [], ld = [];
      for (let i = 0; i <= 16; i++) { const t = i / 16, a = Math.PI * (0.05 + 0.85 * t), b = 0.86 + 0.06 * Math.sin(t * Math.PI); lv.push(vue(p3(a, b, 1.0))); ld.push(vue(p3(a, b + 0.04 + 0.1 * Math.sin(t * Math.PI), 0.99))); }
      out.push(h.path(lisse([...lv, ...ld.reverse()], true), A.loin));
      out.push(h.path(lisse(lv), A.detail));
      let bt = '';
      for (let i = 0; i < 7; i++) { const p = lv[2 + Math.floor(g() * 12)]; bt += brin(p, unit([g() - 0.5, -1]), r * (0.06 + g() * 0.07), (g() - 0.5) * 1.6); }
      out.push(h.path(bt, A.fin));
    }
    // les bouts de fibres qui dépassent du contour
    let bouts_ = '';
    const hauts = sil.filter(p => p[1] < c[1] + r * dessus);
    for (let i = 0; i < bouts; i++) { const p = hauts[Math.floor(g() * hauts.length)], o = unit(sub(p, c)); bouts_ += brin(p, o, r * (0.07 + g() * 0.12) * brinL, (g() - 0.5) * 1.8); }
    out.push(h.path(bouts_, A.fin));
    out.push(h.path(silD, A.arete));
    return out.join('\n');
  };

  // Les flammes : des langues lisses, la plus haute au milieu.
  const langue = (x, yB, w, hh, pen) => {
    const P = (u, v) => `${f(x + u)} ${f(yB - v)}`;
    return `M ${P(-w / 2, 0)} C ${P(-w * 0.78, hh * 0.34)} ${P(-w * 0.06 + pen * 0.2, hh * 0.52)} ${P(-w * 0.14 + pen * 0.5, hh * 0.72)} `
      + `C ${P(-w * 0.2 + pen * 0.8, hh * 0.85)} ${P(pen * 0.9, hh * 0.94)} ${P(pen, hh)} `
      + `C ${P(pen * 0.6 + w * 0.22, hh * 0.8)} ${P(w * 0.08, hh * 0.62)} ${P(w * 0.32, hh * 0.44)} `
      + `C ${P(w * 0.58, hh * 0.28)} ${P(w * 0.64, hh * 0.1)} ${P(w / 2, 0)} Z`;
  };
  const flammes = (x, yB, W, Hf) => [
    h.path(langue(x - W * 0.26, yB, W * 0.44, Hf * 0.62, -W * 0.2), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.27, yB, W * 0.42, Hf * 0.7, W * 0.16), remplir(A.arete, BLANC)),
    h.path(langue(x, yB, W * 0.56, Hf, W * 0.1), remplir(A.arete, BLANC)),
    h.path(langue(x + W * 0.02, yB, W * 0.24, Hf * 0.5, W * 0.04), A.detail),
  ].join('\n');

  // ═══ La tige et le couteau ═════════════════════════════════════════════════════════════════════════

  // La tige de ferrocérium, de sa pointe T le long de u : le métal (diamètre dm, longueur Lm), puis le manche
  // (diamètre dp, longueur Lmo), le trou du cordon au bout. e : unités de vue par mm. P(s, t) : le point à s mm de la
  // pointe, t mm de côté.
  const TIGE = { dm: 11, Lm: 118, dp: 22, Lmo: 108 };
  const tigeDessin = (T, u, e) => {
    const { dm, Lm, dp, Lmo } = TIGE, v = perp(u), P = (s, t) => add(add(T, mul(u, s * e)), mul(v, t * e));
    const rm = dm / 2, rp = dp / 2, out = [];
    const man = [P(Lm - 4, -rp), P(Lm + Lmo - 8, -rp)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 + Math.PI * i / 8; man.push(P(Lm + Lmo - 8 + 8 * Math.cos(a), rp * Math.sin(a))); }
    man.push(P(Lm + Lmo - 8, rp), P(Lm - 4, rp));
    out.push(h.path(poly(man), remplir(A.arete, GRIS)));
    const tc = P(Lm + Lmo - 12, 0);
    out.push(h.cercle(tc[0], tc[1], 2.6 * e, remplir(A.detail, BLANC)));
    const metal = [P(Lm, -rm), P(0, -rm)];
    for (let i = 1; i < 8; i++) { const a = -Math.PI / 2 - Math.PI * i / 8; metal.push(P(rm * 0.6 * Math.cos(a), -rm * Math.sin(a) * -1)); }
    metal.push(P(0, rm), P(Lm, rm));
    out.push(h.path(poly(metal), remplir(A.arete, OMBRE)));
    out.push(h.path(M(P(4, -rm * 0.45)) + Lp(P(Lm - 2, -rm * 0.45)), 'fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"'));
    return { svg: out.join('\n'), P };
  };

  // Le couteau, dans son repère : s le long de la lame (de la garde vers la pointe), t vers le tranchant ; le dos est
  // la ligne t = 0, au trait fort. K(s, t) donne le point de la vue. Le manche est le cylindre de la main 2-13.
  const lameDessin = K => {
    const Q = (a, b) => `${f(K(a, b)[0])} ${f(K(a, b)[1])}`;
    const lameD = `${M(K(0, 0))}${Lp(K(56, 0))} Q ${Q(70, 0.5)} ${Q(81, 7)} Q ${Q(73, 18)} ${Q(50, 22)}${Lp(K(0, 22))} Z`;
    return [h.path(lameD, remplir(A.arete, BLANC)),
      h.path(`${M(K(2, 14.5))}${Lp(K(50, 14.5))} Q ${Q(68, 14)} ${Q(79, 8.5)}`, A.fin),          // le biseau
      h.path(M(K(0, 0)) + Lp(K(58, 0)), A.contour)].join('\n');                                   // le dos
  };
  const gardeDessin = K => h.path(poly([K(1, -5), K(-4, -5), K(-4, 27), K(1, 27)]), remplir(A.arete, BLANC));

  // ═══ La géométrie des vues ═════════════════════════════════════════════════════════════════════════

  // Vue 1 : les quatre tas sur le même sol, du plus fin au plus gros, en profondeur (le bois de boisDe, plus haut).
  const BOIS = boisDe(h);
  const tas = z => ({ yS: z.h - 8, x1: 33, x2: 104, x3: 186, x4: 252 });
  // le sol commun aux quatre tas : une bande gris pâle (le même gris que le sol du tipi), vue d'un peu au-dessus
  const solTas = (z, t) => {
    const y0 = t.yS - 17, y1 = Math.min(z.h - 1, t.yS + 5), ry = (y1 - y0) / 2, rx = 18;
    return h.path(`M ${f(rx)} ${f(y0)} L ${f(z.l - rx)} ${f(y0)} A ${rx} ${f(ry)} 0 0 1 ${f(z.l - rx)} ${f(y1)} L ${f(rx)} ${f(y1)} A ${rx} ${f(ry)} 0 0 1 ${f(rx)} ${f(y0)} Z`, A.loin);
  };
  // Vue 2 : le tipi seul, l'ouverture devant à gauche.
  const vueTipi = z => ({ c: [z.l * 0.58, z.h - 22], R: 50, H: Math.min(z.h - 32, 100) });
  // Vue 4 : l'étincelle. La personne est derrière le nid, face à nous ; ses deux avant-bras sortent par le haut.
  //   La tige, dans sa main gauche (à droite pour nous), descend vers le creux du nid ; la pointe s'arrête à un doigt
  //   (20 mm) au-dessus de la poudre. Le couteau, dans sa main droite, est en travers de la tige, presque d'équerre ;
  //   le dos de la lame appuie sur le métal ; la lame passe devant la tige.
  const RHO = -58;                                  // l'axe de la tige, de la pointe vers le manche
  const etincelle = z => {
    const e = 0.74;
    const n = nid(z.l * 0.42, z.h - 6, 50, 4, { jours: 2, theta: 40, fibres: 0.8 });
    const u = dir(RHO);
    const T = add(n.poudre, [2, -(n.Rf * 0.36) - 20 * e]);      // la pointe : un doigt au-dessus du tas de poudre
    const C = add(T, mul(u, 52 * e));               // le dos du couteau sur la tige, près du poing
    // la main de la tige : le centre de la prise à 165 mm de la pointe (le poing couvre de 45 mm dessous à 57 mm dessus)
    const oT = add(T, mul(u, 165 * e));
    const tT = 200 * TIGE.dp * e / 17.66;
    // le couteau : en travers de la tige, presque d'équerre ; le dos touche la tige à 34 mm de la garde
    const ak = RHO + 92, kd = dir(ak);
    let nk = perp(kd); if (nk[0] * u[0] + nk[1] * u[1] < 0) nk = mul(nk, -1);
    const sc = 34, ta = 9;                                      // ta : l'axe du manche, au-dessus du dos
    const K = (s, t) => add(C, add(mul(kd, (s - sc) * e), mul(nk, t * e)));
    const tK = 30 * e * 563 / 88.7, LK = 184.8 * tK / 563;     // la main 2-13 : le cylindre fait 30 mm
    const F = K(-2, ta);                                        // le bout libre du cylindre, sous la garde
    const oK = add(F, mul(kd, -LK / 2));
    const P = (s, t) => add(add(T, mul(u, s * e)), mul(perp(u), t * e));
    return { e, n, u, T, C, kd, ak, K, P, oT, tT, oK, tK };
  };
  // Vue 5 : le gros plan sur la main, sans tête (JP, 19 octobre 2026 : « fais le zoom sur une main, montre pas le
  // visage »). La main 2-01 « boule-dessous » tient la boule par-dessous, la paume en l'air, la boule dans le creux ; la
  // boule a le rayon de la boule du fichier (202,7 unités), pour que les doigts la tiennent juste. Le souffle entre par
  // le bord gauche ; la fumée monte de l'autre côté.
  const souffler = z => {
    const r = 44, B = [z.l * 0.49, z.h - 70];
    return { r, B, k: r / 202.7, am: 12 };
  };
  // la fumée : k = 0 le filet du milieu, -1 et 1 ceux qui s'en écartent ; elle part du haut de la boule, du côté loin du
  // souffle, et monte en s'ouvrant vers la droite
  const fumee = (s, k) => {
    const { B, r } = s, x0 = B[0] + r * 0.5, y0 = B[1] - r * 0.86, Ht = y0 - 4, t0 = k ? 0.3 : 0, pts = [];
    for (let i = 0; i <= 16; i++) { const t = t0 + (1 - t0) * i / 16; pts.push([x0 + 8 * t + 24 * t * t + k * 13 * Math.pow(t, 1.3) + (0.8 + 3.2 * t) * Math.sin(t * 10 + k), y0 - Ht * t]); }
    return lisse(pts);
  };
  // Vue 6 : le tipi, plus grand, le nid qui flambe glissé dedans par l'ouverture.
  const vueGlisser = z => ({ c: [z.l * 0.44, z.h - 30], R: 56, H: Math.min(z.h - 50, 128) });
  const tas18 = g => [g.c[0] + g.R * 1.42 + 26, g.c[1] + 12];       // le sol sous le tas de branches, à droite du tipi

  return {
    ref: '13-40',
    titre: 'Le ferrocérium, du tri du bois à la flamme',
    desc: 'Six vues dans l’ordre des gestes. Les quatre tas triés sur le même sol, du plus fin au plus gros : une touffe de fibres sèches et un rouleau d’écorce de bouleau ; des brindilles de moins de 2 cm en vrac, croisées, aux bouts coupés en biais ou cassés en pointe ; des branches sciées de 2 à 5 cm, avec leur écorce, des nœuds et des rameaux coupés ; une petite corde de bûches de moins de 15 cm, des rondins et des quartiers fendus, les bouts sciés avec leurs cernes et une fente de séchage. Le tipi de petit bois sur le sol, en cône lâche, avec une ouverture du côté d’où vient le vent. Le nid : une poignée de fibres creusée au milieu, avec des jours où l’on voit au travers et un petit tas de poudre au fond du creux. L’étincelle, vue de face : la tige tenue dans le poing gauche, la pointe à un doigt au-dessus du creux ; le couteau dans le poing droit, en travers de la tige, presque d’équerre, le dos de la lame appuyé sur le métal et tenu immobile ; la tige qu’on tire vers soi ; la gerbe qui tombe dans le creux. Puis, en gros plan sans tête, la main qui tient par-dessous le nid refermé en boule, la paume en l’air, la boule dans le creux ; le souffle arrive par la gauche, la fumée monte de l’autre côté. Enfin le nid en flammes glissé sous le tipi par l’ouverture, un tas de branches de 2 à 5 cm, le même qu’au tri, qui attend à côté.',
    format: 'pleine',
    disposition: [['tas', 'tipi'], ['nid', 'etincelle'], ['souffler', 'glisser']],
    hauteurs: [0.74, 1.58, 1.04],
    largeurs: [[1.75, 1], [0.72, 1.5], [1.12, 1]],
    vues: {
      // ── 1. Trier (étape 10) ────────────────────────────────────────────────────────────────────────────
      tas: {
        titre: 'Trier en quatre tas',
        dessin: z => {
          const t = tas(z), out = [solTas(z, t)];
          // 1. l'amadou fin : une touffe de fibres sèches (la matière du nid), un rouleau d'écorce de bouleau devant
          out.push(pelote([t.x1 - 3, t.yS - 12], 24, 3, { ky: 0.5, sol: t.yS - 1, pli: false, jours: 1, bouts: 30, fibres: 1.1, dessus: 0.2, brinL: 1.7, relief: 1.8 }));
          out.push(BOIS.rouleau([t.x1, t.yS], { c: [8, 4, 8], cap: 36, L: 22, r: 8, graine: 9 }));
          // 2. le bois fin, de moins de 2 cm : des brindilles en vrac ; 3. des branches de 2 à 5 cm ; 4. les bûches
          out.push(BOIS.tasFin([t.x2, t.yS - 2]), BOIS.tasMoyen([t.x3, t.yS - 2]), String(BOIS.tasBuches([t.x4, t.yS])));
          return out.join('\n');
        },
        renvois: z => {
          const t = tas(z), y = 12;
          const c2 = BOIS.cibleFin([t.x2, t.yS - 2]), c3 = BOIS.cibleMoyen([t.x3, t.yS - 2]), c4 = BOIS.tasBuches([t.x4, t.yS]).dessus;
          return [
            { n: 1, rond: [t.x1 - 6, y], cible: [t.x1 - 6, t.yS - 27], texte: 'l’amadou fin' },
            { n: 2, rond: [c2[0], y], cible: c2, texte: 'le bois fin, de moins de 2 cm' },
            { n: 3, rond: [c3[0], y], cible: c3, texte: 'le bois de 2 à 5 cm' },
            { n: 4, rond: [c4[0], y], cible: c4, texte: 'les bûches de moins de 15 cm' },
          ];
        },
      },
      // ── 2. Le tipi (étape 13) ──────────────────────────────────────────────────────────────────────────
      tipi: {
        titre: 'Monter le tipi',
        dessin: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21, { n: 11, ep: 2.3 });
          // le vent : deux flèches qui viennent de devant à gauche et entrent par l'ouverture, au ras du sol
          const fl = zz => { const b = t.ouv(zz, 1.08), a = t.ouv(zz, 2.6); return h.fleche(`${M(a)} L ${f(b[0])} ${f(b[1])}`, A.detail); };
          return [t.svg, fl(g.H * 0.1), fl(g.H * 0.24)].join('\n');
        },
        renvois: z => {
          const g = vueTipi(z), t = tipi(g.c, g.R, g.H, 21, { n: 11, ep: 2.3 });
          const droite = t.batons.filter(b => b.y > -g.R * 0.1).sort((p, q) => q.pied[0] - p.pied[0])[0];
          const cb = P3(g.c, droite.pied[0] * 0.62, droite.pied[1] * 0.62, g.H * 0.38);
          return [
            { n: 5, rond: [z.l - 14, g.c[1] - g.H * 0.78], cible: cb, texte: 'dresser le bois fin en cône lâche' },
            { n: 6, rond: [14, g.c[1] - g.H * 0.62], cible: t.ouv(g.H * 0.42, 0.9), texte: 'laisser une ouverture du côté du vent' },
          ];
        },
      },
      // ── 3. Le nid (étape 14) ───────────────────────────────────────────────────────────────────────────
      nid: {
        titre: 'Faire le nid',
        dessin: z => nid(z.l / 2, z.h * 0.66, z.l * 0.43, 3, { jours: 3 }).svg,
        renvois: z => {
          const n = nid(z.l / 2, z.h * 0.66, z.l * 0.43, 3, { jours: 3 });
          return [
            { n: 7, rond: [16, z.h - 14], cible: n.jours[n.jours.length - 1], texte: 'effilocher jusqu’à voir le jour au travers' },
            { n: 8, rond: [z.l - 16, 16], cible: [n.poudre[0] + 2, n.poudre[1] - 5], texte: 'mettre la poudre au fond du creux' },
          ];
        },
      },
      // ── 4. L'étincelle (étape 15) ──────────────────────────────────────────────────────────────────────
      etincelle: {
        titre: 'Tirer la tige, le couteau immobile',
        dessin: z => {
          const g = etincelle(z), { e, n, u, T, C, K } = g, out = [n.svg];
          // la gerbe : des traits qui partent du dos du couteau et tombent dans le creux, autour de la poudre
          let gerbe = '', grains = '';
          const vise = add(n.poudre, [0, -2]);
          for (let i = 0; i < 9; i++) {
            const k = (i - 4) / 4, a = Math.atan2(vise[1] - C[1], vise[0] - C[0]) + deg(k * 15);
            const L = lon(sub(vise, C)) * (0.95 + 0.08 * Math.cos(i * 2.1)), o = [Math.cos(a), Math.sin(a)];
            gerbe += M(add(C, mul(o, 9))) + Lp(add(C, mul(o, L * 0.5))) + M(add(C, mul(o, L * 0.58))) + Lp(add(C, mul(o, L * 0.78))) + ' ';
            const q = add(C, mul(o, L));
            grains += h.cercle(q[0], q[1], 1, A.plein);
          }
          // la tige, puis la main gauche par-dessus son manche
          out.push(tigeDessin(T, u, e).svg);
          out.push(main({ id: 'manche-vers-bas', x: g.oT[0], y: g.oT[1], objet: false, taille: g.tT, angle: RHO + 52.5 }).svg);
          out.push(h.path(gerbe, A.detail), grains);
          // le couteau : la main droite et son manche, la lame devant la tige, la garde
          out.push(main({ id: 'poing-cylindre', x: g.oK[0], y: g.oK[1], taille: g.tK, angle: g.ak + 180 - 24.9, objetCouleur: GRIS }).svg);
          out.push(lameDessin(K), gardeDessin(K));
          // le geste : la tige tirée vers soi, dans son axe, à côté du métal
          const g0 = add(g.P(140, 0), mul(perp(u), 56)), g1 = add(g.P(196, 0), mul(perp(u), 56));
          out.push(h.geste(`${M(g0)} L ${f(g1[0])} ${f(g1[1])}`));
          // le point à contrôler : le dos du couteau sur la tige, qui ne bouge pas
          out.push(h.controle(C[0], C[1], 8));
          return coupe('etincelle', z, out.join('\n'));
        },
        renvois: z => {
          const g = etincelle(z), { T, C, u, n, P } = g;
          const g1 = add(P(160, 0), mul(perp(u), 56));
          return [
            { n: 9, rond: [16, T[1] + 2], cible: add(T, [-4, 0.5]), texte: 'tenir la pointe à un doigt de l’amadou' },
            { n: 10, rond: [C[0] + 70, C[1] + 26], cible: add(C, mul(unit([1, 0.5]), 8)), texte: 'appuyer le dos du couteau, sans le bouger' },
            { n: 11, rond: [g1[0] + 34, g1[1] + 8], cible: g1, texte: 'tirer la tige vers soi, d’un coup' },
            { n: 12, rond: [z.l - 16, Math.min(z.h - 14, n.poudre[1] - 6)], cible: [n.poudre[0] + 9, n.poudre[1] - 2], texte: 'la gerbe doit tomber dans le creux' },
          ];
        },
      },
      // ── 5. Flamber (étape 16) ──────────────────────────────────────────────────────────────────────────
      souffler: {
        titre: 'Refermer et souffler',
        dessin: z => {
          const s = souffler(z), { B, r } = s, out = [];
          // la boule d'abord, puis la main par-dessus : les doigts passent devant la boule
          out.push(pelote(B, r, 5, { fibres: 1, jours: 2, bouts: 12, dessus: 0.05 }));
          out.push(String(F.mainStock({ id: 'boule-dessous', objet: false, ancre: 'objet', x: B[0], y: B[1], echelle: s.k, angle: s.am })));
          // le souffle : il entre par le bord gauche de la vue et va à la boule
          [-8, 4].forEach(dy => out.push(h.fleche(`M 0 ${f(B[1] + dy)} L ${f(B[0] - r - 7)} ${f(B[1] + dy * 0.6)}`, A.cache)));
          // la fumée : un filet mince au ras de la boule, qui s'ouvre en trois et s'épaissit en montant, de l'autre côté
          out.push(h.path(fumee(s, 0), A.detail), h.path(fumee(s, -1) + ' ' + fumee(s, 1), A.detail));
          return coupe('souffler', z, out.join('\n'));
        },
        renvois: z => {
          const s = souffler(z), { B, r } = s;
          const mx = (B[0] - r - 7) * 0.42;
          const x0 = B[0] + r * 0.5, y0 = B[1] - r * 0.86, Ht = y0 - 4, t = 0.62;
          const pf = [x0 + 8 * t + 24 * t * t + 13 * Math.pow(t, 1.3) + (0.8 + 3.2 * t) * Math.sin(t * 10 + 1), y0 - Ht * t];
          return [
            { n: 13, rond: [B[0] - r - 22, B[1] - r - 6], cible: add(B, mul(dir(-138), r * 0.98)), texte: 'refermer le nid en boule, sans serrer' },
            { n: 14, rond: [B[0] - r - 26, z.h - 14], cible: add(B, [-r * 0.2, r * 1.2]), texte: 'tenir par-dessous, à un avant-bras du visage' },
            { n: 15, rond: [mx, B[1] - 34], cible: [mx, B[1] - 8 + (mx / (B[0] - r - 7)) * 3.2 - 1.6], texte: 'souffler en continu, sans à-coups' },
            { n: 16, rond: [B[0] + r + 62, 26], cible: add(pf, [1.5, 0]), texte: 'la fumée passe de mince à épaisse' },
          ];
        },
      },
      // ── 6. Glisser (étape 17) ──────────────────────────────────────────────────────────────────────────
      glisser: {
        titre: 'Glisser le nid sous le tipi',
        dessin: z => {
          const g = vueGlisser(z), out = [];
          const om = deg((OUV[0] + OUV[1]) / 2);
          // le nid en flammes, poussé jusque sous le tipi, à l'entrée de l'ouverture
          const nc = P3(g.c, Math.cos(om) * g.R * 0.35, Math.sin(om) * g.R * 0.35, 0);
          const nN = nid(nc[0], nc[1], 19, 17, { jours: 0, poudre: false, theta: 30, fibres: 0.5 });
          const dedans = [flammes(nc[0] + 2, nN.haut[1] + 9, 40, g.H * 0.48), nN.svg].join('\n');
          const t = tipi(g.c, g.R, g.H, 29, { dedans, n: 13, ep: 2.6 });
          out.push(t.svg);
          // le geste : le nid entre par l'ouverture, au ras du sol
          const a = P3(g.c, Math.cos(om) * g.R * 2.45, Math.sin(om) * g.R * 2.45, 2), b = P3(g.c, Math.cos(om) * g.R * 1.0, Math.sin(om) * g.R * 1.0, 2);
          out.push(h.geste(`${M(a)} L ${f(b[0])} ${f(b[1])}`));
          // le bois de 2 à 5 cm, prêt à côté : le même tas que le repère 3, plus petit
          out.push(BOIS.tasMoyen(tas18(g), 0.7));
          return out.join('\n');
        },
        renvois: z => {
          const g = vueGlisser(z), om = deg((OUV[0] + OUV[1]) / 2);
          const a = P3(g.c, Math.cos(om) * g.R * 1.8, Math.sin(om) * g.R * 1.8, 2);
          const c18 = BOIS.cibleMoyen(tas18(g), 0.7);
          return [
            { n: 17, rond: [16, a[1] - 36], cible: [a[0], a[1] - 1.5], texte: 'glisser le nid par l’ouverture' },
            { n: 18, rond: [z.l - 16, g.c[1] - g.H * 0.5], cible: c18, texte: 'ajouter ce bois quand le bois fin crépite' },
          ];
        },
      },
    },
  };
};
// la fonction de bois, pour la feuille d'essai images/planches-src/_essai-bois.js et les planches qui en auront besoin
module.exports.bois = boisDe;
