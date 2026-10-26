// Planche 26-08. L'attelle d'écorce moulée, et l'écharpe au pan de chemise.
// Chapitre 26, section 7, « L'attelle » (repères 1 à 11) et « L'écharpe » (repère 12) : écorce de bouleau à papier
// trempée à l'eau chaude, moulée autour du membre et laissée sécher en gouttière ; l'articulation au-dessus et celle en
// dessous ; rembourrage de linge ou de mousse sèche sur l'os ; attachée en trois points ; doigts à vérifier, desserrer
// dès qu'ils blanchissent. L'écharpe : le pan de la chemise relevé par-dessus l'avant-bras et épinglé au devant.
// Refaite le 26 octobre 2026 aux règles du tome 1 : la main est la 1-08 de la bibliothèque Adobe Stock (mainStock), sans
// sa tige, vue de côté, paume vers le bas, jamais déformée ; l'eau en bleu ; l'écorce dessinée comme de l'écorce de
// bouleau (lenticelles fines de longueurs inégales qui font le tour du membre, un œil de branche, la feuille mince qui
// s'enroule et pèle aux bouts). Le même bras attelé sert aux deux vues de côté et de devant (« Mouler » et « L'écharpe »).
// Aucun chiffre sur le dessin : le chapitre n'en donne aucun pour l'attelle improvisée.
const CAT = require('../../.claude/skills/planches/scripts/mains/stock/catalogue.json');

module.exports = (h) => {
  const BL = h.a.blanc.split(' ')[0];
  const plein = t => t.replace('fill="none"', BL);   // trait + fond blanc qui cache ce qui est dessous
  const f1 = v => Math.round(v * 10) / 10;
  const pt = p => `${f1(p[0])},${f1(p[1])}`;

  // Chaque vue est dessinée dans une boîte fixe, centrée dans la zone que donne le compositeur.
  // y0, y1 : ce que la boîte contient vraiment en hauteur.
  const boite = (z, L, y0, y1) => ({ ox: Math.round((z.l - L) / 2), oy: Math.min(Math.max(Math.round(z.h / 2 - (y0 + y1) / 2), -y0), 0 - y0 + Math.round(z.h - (y1 - y0)) ) });
  const g = (o, parts) => `<g transform="translate(${o.ox},${o.oy})">\n${parts.join('\n')}\n</g>`;
  const P = (o, x, y) => [x + o.ox, y + o.oy];

  // ─── Outils de courbe ─────────────────────────────────────────────────────────────────
  // Une cubique en points ; une chaîne de cubiques [c1, c2, fin] à partir d'un point.
  const bez = (a, b, c, d, n = 16) => {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const s = i / n, u = 1 - s;
      out.push([u * u * u * a[0] + 3 * u * u * s * b[0] + 3 * u * s * s * c[0] + s * s * s * d[0],
        u * u * u * a[1] + 3 * u * u * s * b[1] + 3 * u * s * s * c[1] + s * s * s * d[1]]);
    }
    return out;
  };
  const chaine = (p0, segs) => {
    let out = [p0], p = p0;
    for (const s of segs) { out = out.concat(s.length === 1 ? [s[0]] : bez(p, s[0], s[1], s[2]).slice(1)); p = s[s.length - 1]; }
    return out;
  };
  const dChaine = (p0, segs) => `M${pt(p0)} ` + segs.map(s => s.length === 1 ? `L${pt(s[0])}` : `C${pt(s[0])} ${pt(s[1])} ${pt(s[2])}`).join(' ');
  // y d'une polyligne (x croissant ou décroissant) à l'abscisse x
  const yA = (pts, x) => {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) return a[1] + (x - a[0]) / (b[0] - a[0]) * (b[1] - a[1]);
    }
    return pts[x < pts[0][0] ? 0 : pts.length - 1][1];
  };
  // Courbe lisse (Catmull-Rom) par des points.
  const lisse = (pts, ferme = false) => {
    const n = pts.length, Q = i => ferme ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${pt(pts[0])}`;
    for (let i = 0; i < (ferme ? n : n - 1); i++) {
      const p0 = Q(i - 1), p1 = Q(i), p2 = Q(i + 1), p3 = Q(i + 2);
      d += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
    }
    return ferme ? d + ' Z' : d;
  };
  // Hasard fixe : la même planche à chaque rendu.
  const hasard = graine => { let s = graine; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

  // ─── L'écorce de bouleau ──────────────────────────────────────────────────────────────
  // Une lenticelle : une fente noire mince, effilée aux deux bouts, couchée dans le sens du tour du tronc.
  const lenticelle = (x, y, L, e, ang) => {
    const c = Math.cos(ang * Math.PI / 180), s = Math.sin(ang * Math.PI / 180);
    const R = (u, v) => [x + c * u - s * v, y + s * u + c * v];
    return `M${pt(R(-L / 2, 0))} Q${pt(R(0, -e))} ${pt(R(L / 2, 0))} Q${pt(R(0, e))} ${pt(R(-L / 2, 0))} Z`;
  };
  const lenticelles = liste => h.path(liste.map(([x, y, L, e, a]) => lenticelle(x, y, L, e, a)).join(' '), h.a.plein);
  // Un lien de tissu et son nœud (la coupe).
  const noeud = (x, y, sens) => [
    h.path(`M${x - 1},${y - 2} q${-5 * sens},-6 ${-11 * sens},-7`, h.a.arete),
    h.path(`M${x + 1},${y - 2} q${3 * sens},-8 ${9 * sens},-11`, h.a.arete),
    h.ellipse(x, y, 6, 4.5, plein(h.a.arete)),
  ].join('\n');
  // le nœud posé sur la face d'un lien, deux bouts qui pendent
  const noeudLien = (x, y) => [
    h.path(`M${x - 3},${y + 2} Q${x - 8},${y + 9} ${x - 7},${y + 17} L${x - 3},${y + 17} Q${x - 4},${y + 9} ${x + 1},${y + 3} Z`, plein(h.a.arete)),
    h.path(`M${x + 2},${y + 2} Q${x + 8},${y + 8} ${x + 12},${y + 15} L${x + 15},${y + 13} Q${x + 11},${y + 6} ${x + 5},${y} Z`, plein(h.a.arete)),
    h.path(`M${x - 7},${y + 2} Q${x - 8},${y - 5} ${x - 1},${y - 6} Q${x + 7},${y - 6} ${x + 7},${y} Q${x + 6},${y + 4} ${x},${y + 4} Q${x - 5},${y + 4} ${x - 7},${y + 2} Z`, plein(h.a.arete)),
    h.path(`M${x - 3},${y - 5} Q${x},${y - 1} ${x + 3},${y + 3}`, h.a.detail),
  ].join('\n');

  // ─── Tremper ──────────────────────────────────────────────────────────────────────────
  const T = { L: 231, y0: 80, y1: 308 };
  // les bords de la plaque, gauche et droit, en fonction de y
  const xg = y => 72 + (98 - 72) * Math.pow(Math.max(0, 213 - y) / 113, 1.15) - 2 * Math.sin(Math.PI * (213 - y) / 113);
  const xd = y => 150 + (175 - 150) * Math.pow(Math.max(0, 217 - y) / 105, 1.1) + 2 * Math.sin(Math.PI * (217 - y) / 105);
  const lentPlaque = (() => {
    const r = hasard(2608), out = [];
    for (let y = 116; y < 206; y += 7 + r() * 5) {
      const a = xg(y) + 4, b = xd(y) - 4;
      for (let x = a + r() * 10; x < b - 4; x += 8 + r() * 16) {
        const L = 4 + r() * 13, xc = Math.min(x + L / 2, b - L / 2);
        out.push([xc, y + (r() - 0.5) * 2, L, 0.85 + r() * 0.5, -3 + (xc - 120) * 0.04]);
        x += L;
      }
    }
    return out;
  })();
  const tremper = z => {
    const o = boite(z, T.L, T.y0, T.y1);
    return g(o, [
      // la marmite ; sa face de droite à l'ombre (la lumière vient d'en haut à gauche)
      h.path('M27,205 Q29,272 43,292 A72 14 0 0 0 187,292 Q201,272 203,205', plein(h.a.contour)),
      h.path('M150,221.5 Q182,216 203,205 Q201,272 187,292 Q172,302 150,304 Z', h.a.ombre),
      h.path('M27,205 Q29,272 43,292 A72 14 0 0 0 187,292 Q201,272 203,205', h.a.contour),
      // l'eau chaude, en bleu
      h.ellipse(115, 209, 81, 12, h.a.hachure('eau', 'detail')),
      h.ellipse(115, 205, 88, 18, h.a.contour),
      h.ellipse(115, 206, 83, 15.5, h.a.detail),
      // la plaque d'écorce, qui trempe ; sa peau de papier, blanche, et ses lenticelles
      h.path(`M72,213 Q70,150 98,100 Q135,96 175,112 Q152,160 150,217 Q110,219 72,213 Z`, h.a.blanc),
      lenticelles(lentPlaque),
      // le haut de la feuille s'enroule vers l'arrière : on voit l'envers, plus foncé
      h.path('M98,100 Q101,89 112,88 Q144,86 170,99 Q181,104 175,112 Q138,96 98,100 Z', plein(h.a.arete).replace(BL, 'fill="#E6E6E6"')),
      h.path('M104,95 Q138,90 166,101', h.a.fin),
      h.path('M170,99 Q178,96 181,102 Q183,108 177,110', h.a.detail),
      // la feuille est mince : un deuxième trait fin le long du bord gauche
      h.path('M75.5,211 Q74,152 100.5,103', h.a.fin),
      h.path('M72,213 Q70,150 98,100 M175,112 Q152,160 150,217', h.a.contour),
      // l'eau autour de la plaque
      h.path('M66,214 Q73,209 80,214 M141,218 Q148,213 156,218', h.a.detail),
      // la vapeur
      h.path('M34,190 C24,170 44,160 34,140 C24,120 44,110 34,90', h.a.cache),
      h.path('M56,176 C47,158 65,148 57,128 C50,112 63,102 57,88', h.a.cache),
    ]);
  };

  // ─── Le bras attelé, vu de côté (servira aussi à l'écharpe, vu de devant) ─────────────
  // La main : 6-09 de la bibliothèque (la main ouverte, les doigts serrés), retournée (miroir) et tournée d'un quart de
  // tour : la main gauche vue du dos, le pouce en haut, les doigts vers la gauche, détendue. C'est ce qu'on voit du
  // côté du bras plié, et du devant quand l'avant-bras est porté en travers du ventre. Elle n'est ni écrasée ni
  // étirée : une seule échelle, celle d'une main d'adulte au bout de cet avant-bras. L'avant-bras de la planche part de
  // son poignet (au quart du fichier, où les bords du bras sont droits) et cache le bout de bras du fichier.
  const MAIN = { id: '6-09', objet: false, miroir: true, echelle: 167 / 589, trait: 1.4, x: 118, y: 226, angle: -90, f: 0.25, axe: 'y' };
  // le contour de la main du fichier, en points ; la transformation de mainStock refaite pour placer le bras
  const contourFichier = id => {
    const t = CAT[id].chemins.find(c => c.role === 'main').d.match(/[MLCZ]|-?[\d.]+(?:e-?\d+)?/g);
    const out = []; let cur = null, i = 0, p = [0, 0];
    while (i < t.length) {
      const c = t[i++];
      if (c === 'M') { p = [+t[i++], +t[i++]]; cur = [p]; out.push(cur); }
      else if (c === 'L') { p = [+t[i++], +t[i++]]; cur.push(p); }
      else if (c === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], e = [+t[i++], +t[i++]]; cur.push(...bez(p, a, b, e, 8).slice(1)); p = e; }
    }
    return out;
  };
  // axe 'x' : le bras du fichier part vers la gauche (coupe à x = x0 + f × largeur) ; 'y' : vers le bas (y = y1 - f × hauteur)
  const placerMain = m => {
    const [bx0, by0, bx1, by1] = CAT[m.id].boite, W = bx1 - bx0, H = by1 - by0, cf = contourFichier(m.id);
    const k0 = m.axe === 'y' ? 1 : 0, v = m.axe === 'y' ? by1 - m.f * H : bx0 + m.f * W, xs = [];
    for (const sp of cf) for (let i = 0; i < sp.length - 1; i++) {
      const a = sp[i], b = sp[i + 1];
      if ((a[k0] - v) * (b[k0] - v) < 0) xs.push(a[1 - k0] + (v - a[k0]) / (b[k0] - a[k0]) * (b[1 - k0] - a[1 - k0]));
    }
    const lo = Math.min(...xs), hi = Math.max(...xs);
    const A = m.axe === 'y' ? [(lo + hi) / 2, v] : [v, (lo + hi) / 2];
    const bords = m.axe === 'y' ? [[lo, v], [hi, v]] : [[v, lo], [v, hi]];
    const k = m.echelle, sx = m.miroir ? -1 : 1, c = Math.cos(m.angle * Math.PI / 180), s = Math.sin(m.angle * Math.PI / 180);
    const Tm = ([px, py]) => { const u = sx * k * (px - A[0]), w = k * (py - A[1]); return [m.x + c * u - s * w, m.y + s * u + c * w]; };
    // le bout des doigts : le point du contour le plus loin du poignet
    let bout = cf[0][0];
    for (const sp of cf) for (const q of sp) if (m.axe === 'y' ? q[1] < bout[1] : q[0] > bout[0]) bout = q;
    const svg = h.formes.mainStock({ id: m.id, objet: false, miroir: m.miroir, echelle: k, trait: m.trait,
      ancre: [(A[0] - bx0) / W, (A[1] - by0) / H], x: m.x, y: m.y, angle: m.angle });
    const [haut, bas] = bords.map(Tm).sort((a, b) => a[1] - b[1]);
    return { svg: String(svg), haut, bas, bout: Tm(bout) };
  };
  const MAIN_B = placerMain(MAIN);
  // l'avant-bras : le bord du dessus et le bord du dessous, du poignet au pli du coude et au coude
  const AB = {
    dessus: [[160, 196], [200, 186], [232, 196]],
    dessous: [[180, 252], [250, 262], [290, 256]],
  };
  const bordDessus = chaine(MAIN_B.haut, [AB.dessus]);
  const dessus = x => yA(bordDessus, x);
  const bordDessous = chaine(MAIN_B.bas, [AB.dessous]);
  // le haut du bras : le devant (du haut au pli du coude) et l'arrière (du haut au coude)
  const HB = {
    devant: [[234, 46], [[228, 80], [226, 130], [235, 168]], [[239, 184], [237, 192], [232, 196]]],
    arriere: [[296, 46], [[301, 100], [300, 160], [297, 200]], [[298, 225], [300, 245], [290, 256]]],
  };
  const bras = chaine(HB.devant[0], HB.devant.slice(1));          // du haut vers le pli
  const brasArr = chaine(HB.arriere[0], HB.arriere.slice(1));     // du haut vers le coude
  const fondBras = [...bordDessus, ...bras.slice().reverse(), ...brasArr, ...bordDessous.slice().reverse()];

  // la gouttière d'écorce : sous l'avant-bras et derrière le haut du bras ; elle prend le poignet (sous le talon de la
  // main, jusqu'aux jointures) et le coude
  const G = {
    // le bord qui passe sur le membre, du bout du haut jusqu'au bout du poignet
    rebord: [[268, 72], [[268, 72], [268, 178], [268, 178]], [[268, 200], [262, 214], [244, 224]], [[210, 229], [140, 232], [88, 232]], [[76, 232], [68, 232], [62, 233]]],
    // le bout du poignet, coupé au couteau, puis le dessous, le coude, et l'arrière du haut du bras
    dehors: [[62, 233], [[59, 241], [58, 250], [60, 258]], [[80, 255], [100, 255], [120, 256]], [[180, 261], [250, 271], [292, 266]], [[304, 262], [308, 244], [307, 220]], [[306, 160], [305, 110], [304, 74]]],
  };
  const rebord = chaine(G.rebord[0], G.rebord.slice(1));
  const dehors = chaine(G.dehors[0], G.dehors.slice(1));
  const dessousEcorce = x => yA(dehors.filter(p => p[1] > 240), x);
  // le bout du haut, coupé un peu de travers, qui ferme la feuille
  const boutHaut = [[304, 74], [296, 71], [286, 72.5], [277, 70.5], [268, 72]];
  const ecorce = [...rebord, ...dehors.slice(1), ...boutHaut.slice(1)];
  // la feuille est mince : un trait fin à 2 du rebord, côté écorce
  const rebordFin = rebord.slice(2, -2).map((p, i, a) => {
    const q = a[Math.min(a.length - 1, i + 1)], r = a[Math.max(0, i - 1)];
    const t = [q[0] - r[0], q[1] - r[1]], n = Math.hypot(...t) || 1;
    return [p[0] + 2.2 * t[1] / n, p[1] - 2.2 * t[0] / n];
  });
  // les lenticelles font le tour du membre : debout sous l'avant-bras, couchées derrière le haut du bras, en éventail
  // autour du coude. Longueurs et écarts inégaux, parfois deux côte à côte ; plus courtes là où la gouttière tourne
  // et fuit (vers le dessous de l'avant-bras, vers l'arrière du haut du bras).
  const lentGouttiere = (() => {
    const r = hasard(26), out = [];
    for (let x = 68; x < 250; x += 4 + r() * 8) {
      const y0 = yA(rebord.filter(p => p[0] < 250), x) + 4, y1 = dessousEcorce(x) - 3;
      if (y1 - y0 < 8 || r() < 0.1) continue;
      const v = r(), L = (4 + r() * 8) * (1 - 0.55 * v * v), y = y0 + L / 2 + v * (y1 - y0 - L);
      out.push([x, y, L, 0.7 + r() * 0.55, 90 + (r() - 0.5) * 12]);
      if (r() < 0.3) out.push([x + 2.5 + r() * 2, y + (r() < 0.5 ? -1 : 1) * (L / 2 + 2 + r() * 3), 2.5 + r() * 3, 0.7, 90 + (r() - 0.5) * 12]);
    }
    for (let y = 82; y < 196; y += 6 + r() * 10) {
      const x0 = 271, x1 = 303, v = r();
      if (r() < 0.12) continue;
      const L = (5 + r() * 12) * (1 - 0.5 * v * v), xc = x0 + L / 2 + v * (x1 - x0 - L);
      out.push([xc, y, L, 0.7 + r() * 0.6, (r() - 0.5) * 8]);
      if (r() < 0.25) out.push([xc + (r() - 0.5) * 6, y + 3, 3 + r() * 4, 0.7, (r() - 0.5) * 8]);
    }
    for (const a of [18, 38, 58]) {
      const R = 28 + r() * 8;
      out.push([270 + R * Math.cos(a * Math.PI / 180), 226 + R * Math.sin(a * Math.PI / 180), 4 + r() * 5, 0.85, a + 90 + (r() - 0.5) * 10]);
    }
    return out;
  })();

  // un lien de tissu qui fait le tour de l'avant-bras et de l'écorce : bords courbés comme un anneau sur un cylindre
  const lien = (x, w) => {
    const y1 = dessus(x), y2 = dessus(x + w), yb = dessousEcorce(x + w / 2) + 3, ym = (y1 + yb) / 2;
    return [
      h.path(`M${x},${f1(y1)} L${x + w},${f1(y2)} Q${x + w - 4},${f1(ym)} ${x + w},${f1(yb)} Q${x + w / 2},${f1(yb + 3)} ${x},${f1(yb)} Q${x - 4},${f1(ym)} ${x},${f1(y1)} Z`, plein(h.a.arete)),
      h.path(`M${x + 15},${f1(y2 + 6)} Q${x + 12},${f1(ym)} ${x + 15},${f1(yb - 5)}`, h.a.detail),
      noeudLien(x + 10, f1(dessus(x + 10) + 9)),
    ].join('\n');
  };
  const LIENS = { poignet: 124, milieu: 196, w: 20 };

  // tout le bras attelé ; vueDeCote : la cassure et le rembourrage du poignet, qu'on ne voit que de côté ; sousLiens :
  // ce qui passe sous les liens (le trait de coupe)
  const brasAttele = (vueDeCote, sousLiens = '') => [
    // la main, puis le bras par-dessus le bout de bras du fichier
    MAIN_B.svg,
    h.path('M' + fondBras.map(pt).join(' L') + ' Z', h.a.blanc),
    h.path(dChaine(MAIN_B.haut, [AB.dessus]), h.a.arete),
    h.path(dChaine(MAIN_B.bas, [AB.dessous]), h.a.arete),
    h.path(dChaine(HB.devant[0], HB.devant.slice(1)), h.a.arete),
    h.path(dChaine(HB.arriere[0], HB.arriere.slice(1)), h.a.arete),
    h.path('M236,184 Q231,193 222,195', h.a.detail),
    // la manche roulée
    h.path('M226,0 C227,10 228,20 229,28 M306,0 C305,10 304,20 303,28', h.a.arete),
    h.path('M240,0 Q244,12 241,26 M290,2 Q286,14 292,26', h.a.detail),
    h.path('M229,28 Q266,22 303,28 L302,46 Q266,40 231,46 Z', plein(h.a.arete)),
    h.path('M246,31 Q250,37 247,43 M270,29 Q273,35 271,42 M290,30 Q292,37 290,44', h.a.detail),
    // la cassure, entre les deux articulations
    vueDeCote ? h.path(`M160,${f1(dessus(160) + 4)} l5,6 l-7,6 l6,6 l-5,6 l4,6`, h.a.arete) : '',
    // le rembourrage qui dépasse de la gouttière : au pli du coude, et sous le talon de la main
    h.path('M226,229 Q226,221 232,221 Q238,218 242,219 Q246,214 251,212 Q255,208 257,206 Q261,202 261,196 Q263,188 263,176 L272,176 L272,232 Z', plein(h.a.arete)),
    vueDeCote ? h.path('M66,235 Q68,229 74,229 Q80,226 86,228 Q92,226 98,228 Q104,227 108,235 Z', plein(h.a.arete)) : '',
    // la gouttière d'écorce
    h.path('M' + ecorce.map(pt).join(' L') + ' Z', h.a.blanc),
    lenticelles(lentGouttiere),
    h.path('M' + rebordFin.map(pt).join(' L'), h.a.fin),
    h.path(dChaine(G.rebord[0], G.rebord.slice(1)), h.a.arete),
    h.path(dChaine(G.dehors[0], G.dehors.slice(1)), h.a.contour),
    h.path(lisse(boutHaut), h.a.contour),
    sousLiens,
    // trois liens, hors de la cassure
    h.path('M234,96 Q231,106 234,116 L308,116 Q311,106 308,96 Z', plein(h.a.arete)),
    h.path('M250,99 Q256,106 252,113', h.a.detail),
    noeudLien(252, 104),
    lien(LIENS.poignet, LIENS.w),
    lien(LIENS.milieu, LIENS.w),
  ].filter(Boolean).join('\n');

  // ─── Mouler et attacher ───────────────────────────────────────────────────────────────
  const M = { L: 310, y0: 0, y1: 294 };
  // le trait de coupe A-A : en travers du lien du poignet, regardé vers la main
  const XA = LIENS.poignet + 10, YA = [Math.round(dessus(LIENS.poignet + 10) - 20), 274];
  const traitCoupe = () => {
    const out = [h.ligne(XA, YA[0], XA, YA[1], h.a.fin + ' stroke-dasharray="10 3 2 3"')];
    YA.forEach((y, i) => {
      const s = i ? -1 : 1;
      out.push(h.ligne(XA, y, XA, y + 7 * s, h.a.arete));
      out.push(h.ligne(XA, y, XA - 4, y, h.a.detail));
      out.push(h.path(`M${XA - 3.5},${y - 3} L${XA - 10},${y} L${XA - 3.5},${y + 3} Z`, h.a.plein));
      out.push(h.texte(XA, i ? y + 15 : y - 6, 'A', { ancre: 'middle' }));
    });
    return out.join('\n');
  };
  const mouler = z => {
    const o = boite(z, M.L, M.y0, M.y1);
    return g(o, [brasAttele(true, traitCoupe())]);
  };

  // ─── En coupe ─────────────────────────────────────────────────────────────────────────
  const C = { L: 231, y0: 56, y1: 262, cx: 115, cy: 150 };
  const E = (cx, cy, rx, ry, t) => [cx + rx * Math.cos(t * Math.PI / 180), cy + ry * Math.sin(t * Math.PI / 180)];
  const arc = (cx, cy, rx, ry, t0, t1, pas = 5) => {
    const out = [], n = Math.max(2, Math.ceil(Math.abs(t1 - t0) / pas));
    for (let i = 0; i <= n; i++) out.push(E(cx, cy, rx, ry, t0 + (t1 - t0) * i / n));
    return out;
  };
  const bandeArc = (cx, cy, a, b, t0, t1) => arc(cx, cy, b[0], b[1], t0, t1).concat(arc(cx, cy, a[0], a[1], t1, t0));
  const brasC = [60, 43], bourre = [71, 54], ecorceC = [78, 61];
  // le lien : colle à l'écorce dessous, passe tendu d'un bord de la gouttière au dessus du bras
  const lienC = (d) => arc(C.cx, C.cy, ecorceC[0] + d, ecorceC[1] + d, -15, 195).concat(arc(C.cx, C.cy, brasC[0] + 3 + d, brasC[1] + 3 + d, 225, 315));
  const coupe = z => {
    const o = boite(z, C.L, C.y0, C.y1);
    const { cx, cy } = C;
    return g(o, [
      h.chemin(bandeArc(cx, cy, brasC, bourre, -25, 205), h.a.hachure('isolant', 'arete'), true),
      h.ellipse(cx, cy, brasC[0], brasC[1], plein(h.a.contour)),
      h.ellipse(cx - 17, cy - 12, 16, 12, h.a.arete),
      h.ellipse(cx - 17, cy - 12, 8.5, 6, h.a.detail),
      h.ellipse(cx + 19, cy + 17, 11, 10, h.a.arete),
      h.ellipse(cx + 19, cy + 17, 5.5, 5, h.a.detail),
      h.chemin(bandeArc(cx, cy, bourre, ecorceC, -15, 195), h.a.plein, true),
      // le lien fait le tour complet : deux boucles fermées, le ruban blanc entre les deux
      h.path([lienC(3.5), lienC(0.5)].map(b => 'M' + b.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z').join(' '),
        plein(h.a.arete) + ' fill-rule="evenodd"'),
      noeud(cx, cy - brasC[1] - 6, 1),
      // le point à contrôler : le lien, qu'on desserre au premier blanchiment des doigts
      h.controle(cx, cy - brasC[1] - 6, 12),
    ]);
  };

  // ─── L'écharpe ────────────────────────────────────────────────────────────────────────
  // Gros plan, vu du devant du blessé : le même bras attelé (décalé de DX), l'avant-bras à l'horizontale devant le
  // ventre, la main qui sort du pan à gauche, détendue, le coude et le haut du bras à droite. Derrière, au trait
  // seulement : la patte de la chemise et ses boutons. Le pan relevé passe devant l'avant-bras, son ourlet épinglé au
  // devant de la chemise.
  const S = { L: 346, y0: 0, y1: 297 };
  const DX = 30;
  const PAN = { g: 138, d: 258, h: 186, b: 272 };    // le pan : bords gauche et droit, ourlet, pli du dessous
  const PATTE = Math.round((PAN.g + PAN.d) / 2);     // la patte de boutonnage, au milieu du devant
  const EPINGLES = [[160, 188], [236, 186]], [E1, E2] = EPINGLES, MI = (E1[0] + E2[0]) / 2;
  const epingle = (x, y) => [
    h.ligne(x - 2, y - 9, x - 2, y + 8, h.a.arete),
    h.ligne(x + 2, y - 8, x + 2, y + 8, h.a.arete),
    h.cercle(x, y + 11, 3, h.a.arete),
    h.rect(x - 3.5, y - 15, 7, 6, plein(h.a.arete)),
  ].join('\n');
  const echarpe = z => {
    const o = boite(z, S.L, S.y0, S.y1);
    return g(o, [
      // derrière : le devant de la chemise, sa patte et trois boutons
      h.path(`M${PATTE - 3},${-o.oy} L${PATTE - 3},${PAN.h} M${PATTE + 3},${-o.oy} L${PATTE + 3},${PAN.h}`, h.a.detail),
      h.cercle(PATTE, 34, 2.6, plein(h.a.arete)), h.cercle(PATTE, 84, 2.6, plein(h.a.arete)), h.cercle(PATTE, 134, 2.6, plein(h.a.arete)),
      // le bras attelé
      `<g transform="translate(${DX},0)">\n${brasAttele(false)}\n</g>`,
      // le pan relevé par-dessus l'avant-bras, en hamac : l'ourlet en haut, épinglé ; le pli dessous, au plus bas au
      // milieu ; les plis du tissu partent des épingles vers ce creux
      h.path(`M${PAN.g},${PAN.h + 2} Q${E1[0] - 10},${PAN.h - 2} ${E1[0]},${E1[1]} Q${MI},${PAN.h + 10} ${E2[0]},${E2[1]} Q${PAN.d - 8},${PAN.h - 2} ${PAN.d},${PAN.h + 1} C${PAN.d + 3},${PAN.h + 34} ${PAN.d},${PAN.b - 34} ${PAN.d - 12},${PAN.b - 10} Q${MI},${PAN.b + 16} ${PAN.g + 12},${PAN.b - 8} C${PAN.g},${PAN.b - 34} ${PAN.g - 3},${PAN.h + 34} ${PAN.g},${PAN.h + 2} Z`, plein(h.a.contour)),
      h.path(`M${PAN.g + 1},${PAN.h + 8} Q${E1[0] - 10},${PAN.h + 4} ${E1[0]},${E1[1] + 6} Q${MI},${PAN.h + 16} ${E2[0]},${E2[1] + 6} Q${PAN.d - 8},${PAN.h + 4} ${PAN.d - 1},${PAN.h + 7}`, h.a.fin),
      h.path(`M${PAN.g + 20},${PAN.b - 12} Q${MI},${PAN.b + 6} ${PAN.d - 20},${PAN.b - 14}`, h.a.detail),
      h.path(`M${E1[0] + 3},${E1[1] + 16} Q${E1[0] + 4},${PAN.h + 56} ${MI - 22},${PAN.b - 6} M${E2[0] - 3},${E2[1] + 16} Q${E2[0] - 4},${PAN.h + 56} ${MI + 22},${PAN.b - 6} M${E1[0] - 10},${PAN.h + 10} Q${PAN.g + 6},${PAN.h + 50} ${PAN.g + 16},${PAN.b - 14} M${E2[0] + 10},${PAN.h + 10} Q${PAN.d - 5},${PAN.h + 50} ${PAN.d - 18},${PAN.b - 16}`, h.a.detail),
      h.path(`M${PATTE - 3},${PAN.h + 15} Q${PATTE - 4},${PAN.h + 60} ${PATTE - 3},${PAN.b + 2} M${PATTE + 3},${PAN.h + 15} Q${PATTE + 2},${PAN.h + 60} ${PATTE + 3},${PAN.b + 2}`, h.a.detail),
      ...EPINGLES.map(([x, y]) => epingle(x, y)),
    ]);
  };

  return {
    ref: '26-08',
    titre: 'L’attelle d’écorce moulée, et l’écharpe au pan de chemise',
    desc: 'Quatre vues. Une plaque d’écorce de bouleau, blanche, aux fines lenticelles noires et au haut qui s’enroule, trempe dans une marmite d’eau chaude. Un bras plié, vu de côté : l’écorce moulée en gouttière sous l’avant-bras et derrière le haut du bras prend le coude et le poignet, le rembourrage dépasse au pli du coude et sous le talon de la main, trois liens la tiennent hors de la cassure, marquée en zigzag sur le dessus de l’avant-bras ; la main, vue de côté, paume vers le bas, les doigts libres au-delà du bout de l’écorce. Un trait de coupe A-A traverse le lien près du poignet. La coupe A-A : le bras, le rembourrage, la gouttière d’écorce durcie et le lien, qu’on desserre au premier blanchiment des doigts. L’écharpe, en gros plan, vue du devant : le même bras attelé, l’avant-bras à l’horizontale dans le pan de la chemise relevé par-dessus et épinglé au devant de la chemise en deux points ; la main détendue sort du pan à gauche, le coude et l’écorce à droite, le haut du bras monte vers l’épaule.',
    format: 'pleine',
    disposition: [['tremper', 'mouler'], ['coupe', 'echarpe']],
    largeurs: [[2, 3], [2, 3]],
    fichier: 'planche-26-08-attelle-ecorce-moulee-echarpe.svg',
    vues: {
      tremper: {
        titre: 'Tremper',
        dessin: tremper,
        renvois: z => {
          const o = boite(z, T.L, T.y0, T.y1);
          return [
            { n: 1, rond: [z.l - 16, o.oy + 60], cible: P(o, 150, 140), texte: 'plaque d’écorce de bouleau' },
            { n: 2, rond: [z.l - 16, o.oy + 158], cible: P(o, 186, 211), texte: 'eau chaude, qui l’assouplit' },
          ];
        },
      },
      mouler: {
        titre: 'Mouler et attacher',
        dessin: mouler,
        renvois: z => {
          const o = boite(z, M.L, M.y0, M.y1);
          return [
            { n: 3, rond: P(o, 150, 158), cible: P(o, 163, dessus(163) + 10), texte: 'cassure : aucun lien dessus' },
            { n: 4, rond: [z.l - 14, o.oy + 281], cible: P(o, 302, 255), texte: 'prend le coude, au-dessus' },
            { n: 5, rond: P(o, 82, 281), cible: P(o, 90, dessousEcorce(90)), texte: 'prend le poignet, en dessous' },
            { n: 6, rond: P(o, 214, 142), cible: P(o, 250, 214), texte: 'rembourré sur l’os saillant' },
            { n: 7, rond: P(o, 196, 80), cible: P(o, 244, 103), texte: 'attachée en trois points' },
            { n: 8, rond: P(o, 18, 160), cible: P(o, ...MAIN_B.bout), texte: 'doigts dehors, à vérifier' },
          ];
        },
      },
      coupe: {
        titre: 'Coupe A-A',
        dessin: coupe,
        renvois: z => {
          const o = boite(z, C.L, C.y0, C.y1);
          return [
            { n: 9, rond: P(o, 30, 252), cible: P(o, ...E(C.cx, C.cy, 74.5, 57.5, 120)), texte: 'durcie, elle épouse le bras' },
            { n: 10, rond: P(o, 18, 96), cible: P(o, ...E(C.cx, C.cy, 65.5, 48.5, 160)), texte: 'linge ou mousse sèche' },
            { n: 11, rond: [z.l - 20, o.oy + 66], cible: P(o, ...E(C.cx, C.cy, 65, 48, 300)), texte: 'desserré au blanchiment' },
          ];
        },
      },
      echarpe: {
        titre: 'L’écharpe',
        dessin: echarpe,
        renvois: z => {
          const o = boite(z, S.L, S.y0, S.y1);
          return [
            { n: 12, rond: P(o, 104, 288), cible: P(o, 176, 262), texte: 'pan relevé sur le bras' },
            { n: 13, rond: P(o, 112, 128), cible: P(o, E1[0], E1[1] - 15), texte: 'épinglé au devant' },
          ];
        },
      },
    },
  };
};
