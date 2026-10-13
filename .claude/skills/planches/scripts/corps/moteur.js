// moteur.js — les corps simples des planches : squelette, proportions, contour, ordre de peinture.
//
// Une silhouette de manuel (fiche de premiers soins, notice de montage) : un seul contour continu
// et lisse par groupe de pièces, blanc, trait ~1,5 ; le bras et la jambe du côté loin derrière, en
// gris très clair ; là où un membre proche passe devant le tronc, son contour à 0,7. Pas de boule
// aux articulations, pas de couture au col ni à la ceinture, pas de muscles, pas de visage.
//
//   corps({ x, y, pose, vue, age, echelle, cote, angles, mains, pieds, trait, objetP, objetL })
//     x, y      le point au sol sous l'appui (debout : sous les chevilles), en unités de vue ; voir appui
//     pose      un id de poses.json (ou des poses intégrées ci-dessous) ; angles surcharge la pose
//     vue       'profil' (ce fichier) ; 'face', 'dos', 'dessus' viennent de vues.js
//     age       'adulte' (homme) · 'femme' · 'enfant6' · 'enfant4' ('enfant' = 'enfant6')
//     echelle   unités de vue par mm (à 1, l'homme debout fait 1750 de haut)
//     cote      'droite' (défaut, il regarde vers +x) · 'gauche' (miroir)
//     mains     { P: 'ouverte' | 'plat' | 'prise' | 'porte' | 'pointe' | 'pince', L: … }   pieds : 'botte' (défaut) | 'nu'
//               (extremites.js : la main posée sur l'axe de l'avant-bras, le poignet plié de main − avantbras,
//               sa largeur prise sur la bande ; le pied sur l'axe de la jambe, angle = pied − jambe, les
//               orteils couchés au sol quand le pied pique ; sans extremites.js, des provisoires)
//     trait     'normal' (1,5 / 0,7) · 'fort' (1,9 / 1,0) · ou un nombre (la silhouette)
//     objetP    SVG (ou fonction g => SVG) peint devant le tronc et derrière le bras proche
//     objetL    SVG (ou fonction g => SVG) peint devant le bras loin et derrière le corps
//     objet     SVG (ou fonction g => SVG) peint devant tout (le bout d'un manche dans le poing)
//     cheveux   ignoré de profil : pas de masse de cheveux (elle faisait une tuque)
//     teteDevant  true : la tête par-dessus le bras proche (à plat ventre, bras tendus devant : d'office)
//     appui     surcharge celui de la pose : pieds · genouP · genoux · fesses · dos · ventre · cote
//               (le point le plus bas pose au sol en y) · avantbras (pendu par les avant-bras : (x, y) sous
//               les avant-bras, entre les coudes, les jambes ne cherchent pas de sol) · aucun ((x, y) = le bassin)
//     ancrer    false : ne pas poser les pieds (ou le pied du genou au sol) en pliant la jambe
//     masquer   ['brasL', 'brasP', 'jambeL', 'jambeP'] : ces membres ne se dessinent pas
//     angles.dos      courbure du dos en degrés (0 droit ; 40 à 50 : le dos rond du raté)
//     angles.hausse   les épaules haussées de tant de mm
//
// Le résultat se colle comme une chaîne et porte la géométrie, en unités de vue :
//   .poignetP .poignetL          [x, y]
//   .mainP .mainL                { x, y, angle, axe, r, objet }  le point de prise, l'axe de l'objet tenu
//                                (degrés écran), l'axe de la main, le rayon du manche, l'ordre conseillé
//   .tete                        { x, y, haut: [x, y], angle }   le centre de la tête, son sommet
//   .pieds                       { P: { cheville, talon, pointe, plante, bas }, L: … }   bas : le point le plus bas du pied
//   .boite                       { x0, y0, x1, y1 }
//   .articulations               tous les points du squelette (épaule, coude, hanche, genou…)
//   .siege                       le dessous des fesses (pour poser une chaise, une bûche) ; avec siege
//                                (mm, poses.json), le sol est mis à cette hauteur sous la fesse et les
//                                pieds le rejoignent s'ils peuvent (l'enfant sur la chaise : ils pendent)
//   .mainP.r                     le rayon du manche : prise de poses.json (diamètre, mm), sinon 32
//   .sol                         le y du sol
//
// Unités internes : mm, repère du corps x vers l'avant, y vers le bas, origine au bassin.
// L'union des pièces se fait avec Clipper (clipper.js, Angus Johnson, licence Boost, copié ici
// pour qu'aucune installation ne soit nécessaire) : union, décalage arrondi (les plis), découpe
// de lignes ouvertes (les contours intérieurs).

'use strict';

const fs = require('fs');
const path = require('path');
const CL = require('./clipper');

const NOIR = '#1A1A1A', BLANC = '#FFFFFF', GRIS = '#E6E6E6';
const RAD = Math.PI / 180;

// ─── géométrie ────────────────────────────────────────────────────────────────────────────
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const lon = a => Math.hypot(a[0], a[1]);
const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
const gau = u => [u[1], -u[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const crx = (a, b) => a[0] * b[1] - a[1] * b[0];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const tourne = (a, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]; };
// angles de pose → directions : membres 0 = vers le bas ; tronc, cou, tête 0 = vers le haut ; + = vers l'avant
const bas = a => [Math.sin(a * RAD), Math.cos(a * RAD)];
const haut = a => [Math.sin(a * RAD), -Math.cos(a * RAD)];
const aire = P => { let s = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; };

// courbe fermée lisse par des points (Catmull-Rom), échantillonnée
function lisseFerme(pts, n = 8) {
  const N = pts.length, out = [];
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  return out;
}

// un chemin SVG (d) → polygones (listes de points), courbes aplaties ; pour les contours de
// extremites.js, qui arrivent en d SVG
function aplatir(d, pas = 12) {
  const tok = String(d).match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  const polys = []; let cur = [], p = [0, 0], debut = [0, 0], cmd = null, prevC = null, prevQ = null, i = 0;
  const num = () => parseFloat(tok[i++]);
  const fin = (fermee = false) => { if (cur.length > 1) { cur.ferme = fermee; polys.push(cur); } cur = []; };
  while (i < tok.length) {
    if (/[A-Za-z]/.test(tok[i])) cmd = tok[i++];
    const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase(), o = rel ? p : [0, 0];
    if (C === 'Z') { fin(true); p = debut; prevC = prevQ = null; continue; }
    if (C === 'M') { fin(); p = add(o, [num(), num()]); debut = p; cur = [p]; cmd = rel ? 'l' : 'L'; prevC = prevQ = null; continue; }
    if (C === 'L') { p = add(o, [num(), num()]); cur.push(p); prevC = prevQ = null; }
    else if (C === 'H') { p = [rel ? p[0] + num() : num(), p[1]]; cur.push(p); prevC = prevQ = null; }
    else if (C === 'V') { p = [p[0], rel ? p[1] + num() : num()]; cur.push(p); prevC = prevQ = null; }
    else if (C === 'C' || C === 'S') {
      const c1 = C === 'C' ? add(o, [num(), num()]) : (prevC ? sub(mul(p, 2), prevC) : p);
      const c2 = add(o, [num(), num()]), e = add(o, [num(), num()]);
      for (let k = 1; k <= pas; k++) { const t = k / pas, m = 1 - t; cur.push([0, 1].map(j => m * m * m * p[j] + 3 * m * m * t * c1[j] + 3 * m * t * t * c2[j] + t * t * t * e[j])); }
      prevC = c2; prevQ = null; p = e;
    } else if (C === 'Q' || C === 'T') {
      const c = C === 'Q' ? add(o, [num(), num()]) : (prevQ ? sub(mul(p, 2), prevQ) : p);
      const e = add(o, [num(), num()]);
      for (let k = 1; k <= pas; k++) { const t = k / pas, m = 1 - t; cur.push([0, 1].map(j => m * m * p[j] + 2 * m * t * c[j] + t * t * e[j])); }
      prevQ = c; prevC = null; p = e;
    } else if (C === 'A') {
      let rx = Math.abs(num()), ry = Math.abs(num()); const phi = num() * RAD, fa = num(), fs_ = num(), e = add(o, [num(), num()]);
      const cs = Math.cos(phi), sn = Math.sin(phi);
      const dx = (p[0] - e[0]) / 2, dy = (p[1] - e[1]) / 2, x1 = cs * dx + sn * dy, y1 = -sn * dx + cs * dy;
      let L = x1 * x1 / (rx * rx) + y1 * y1 / (ry * ry); if (L > 1) { rx *= Math.sqrt(L); ry *= Math.sqrt(L); }
      let k = Math.sqrt(Math.max(0, (rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) / (rx * rx * y1 * y1 + ry * ry * x1 * x1)));
      if (fa === fs_) k = -k;
      const cx1 = k * rx * y1 / ry, cy1 = -k * ry * x1 / rx;
      const cx = cs * cx1 - sn * cy1 + (p[0] + e[0]) / 2, cy = sn * cx1 + cs * cy1 + (p[1] + e[1]) / 2;
      const ang = (u, v) => Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1]);
      const t1 = ang([1, 0], [(x1 - cx1) / rx, (y1 - cy1) / ry]);
      let dt = ang([(x1 - cx1) / rx, (y1 - cy1) / ry], [(-x1 - cx1) / rx, (-y1 - cy1) / ry]);
      if (!fs_ && dt > 0) dt -= 2 * Math.PI; if (fs_ && dt < 0) dt += 2 * Math.PI;
      const n = Math.max(4, Math.ceil(Math.abs(dt) / (Math.PI / 16)));
      for (let q = 1; q <= n; q++) { const t = t1 + dt * q / n; cur.push([cx + rx * Math.cos(t) * cs - ry * Math.sin(t) * sn, cy + rx * Math.cos(t) * sn + ry * Math.sin(t) * cs]); }
      p = e; prevC = prevQ = null;
    } else { i++; }
  }
  fin();
  return polys;
}

// ─── Clipper : union, décalage, découpe ───────────────────────────────────────────────────
const SC = 100;                                           // unités Clipper par mm
const versCL = P => P.map(p => ({ X: Math.round(p[0] * SC), Y: Math.round(p[1] * SC) }));
const deCL = P => P.map(q => [q.X / SC, q.Y / SC]);
const positif = P => (aire(P) < 0 ? P.slice().reverse() : P);
function union(polys, regle = CL.PolyFillType.pftNonZero) {
  const c = new CL.Clipper();
  c.AddPaths(polys.filter(p => p.length > 2).map(p => versCL(positif(p))), CL.PolyType.ptSubject, true);
  const sol = new CL.Paths();
  c.Execute(CL.ClipType.ctUnion, sol, regle, regle);
  return sol;                                              // chemins Clipper
}
function unionCL(listes) {
  const c = new CL.Clipper();
  for (const l of listes) if (l && l.length) c.AddPaths(l, CL.PolyType.ptSubject, true);
  const sol = new CL.Paths();
  c.Execute(CL.ClipType.ctUnion, sol, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return sol;
}
function operation(type, a, b) {
  const c = new CL.Clipper();
  c.AddPaths(a, CL.PolyType.ptSubject, true);
  c.AddPaths(b, CL.PolyType.ptClip, true);
  const sol = new CL.Paths();
  c.Execute(type, sol, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return sol;
}
const moins = (a, b) => (b.length ? operation(CL.ClipType.ctDifference, a, b) : a);
const inter = (a, b) => operation(CL.ClipType.ctIntersection, a, b);
// les petits trous (un jour entre le bras, la cuisse et le ventre) et les miettes se bouchent
function sansMiettes(paths, aireMin = 1800) {
  return paths.filter(P => Math.abs(CL.Clipper.Area(P)) / (SC * SC) >= aireMin || CL.Clipper.Orientation(P));
}
function sansTrous(paths, aireMin = 7000) {
  return paths.filter(P => CL.Clipper.Orientation(P) || Math.abs(CL.Clipper.Area(P)) / (SC * SC) >= aireMin);
}
function decale(paths, mm) {
  if (!paths.length || !mm) return paths;
  const co = new CL.ClipperOffset(2, 0.04 * SC);
  co.AddPaths(paths, CL.JoinType.jtRound, CL.EndType.etClosedPolygon);
  const sol = new CL.Paths();
  co.Execute(sol, mm * SC);
  return sol;
}
const ferme = (p, r) => decale(decale(p, r), -r);          // arrondit les coins rentrants
const ouvre = (p, r) => decale(decale(p, -r), r);          // arrondit les coins saillants
// les bords d'une forme, découpés par une région : ce qui en tombe dedans
function bordsDans(formeCL, regionCL) {
  if (!formeCL.length || !regionCL.length) return [];
  const lignes = formeCL.map(P => P.concat([P[0]]));
  const c = new CL.Clipper();
  c.AddPaths(lignes, CL.PolyType.ptSubject, false);
  c.AddPaths(regionCL, CL.PolyType.ptClip, true);
  const arbre = new CL.PolyTree();
  c.Execute(CL.ClipType.ctIntersection, arbre, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return recoller(CL.Clipper.OpenPathsFromPolyTree(arbre).map(deCL));
}
// les morceaux séparés d'une forme, chacun avec ses trous
function composantes(paths) {
  if (!paths.length) return [];
  const c = new CL.Clipper();
  c.AddPaths(paths, CL.PolyType.ptSubject, true);
  const arbre = new CL.PolyTree();
  c.Execute(CL.ClipType.ctUnion, arbre, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  const out = [];
  const visite = n => { for (const e of n.Childs()) { if (!e.IsHole()) { out.push([e.Contour()].concat(e.Childs().map(t => t.Contour()))); for (const t of e.Childs()) visite(t); } } };
  visite(arbre);
  return out;
}
const aireCL = paths => paths.reduce((a, P) => a + CL.Clipper.Area(P), 0) / (SC * SC);
// un point (mm) est-il dans la forme ? (les trous comptent)
function dedans(paths, p) {
  const q = { X: Math.round(p[0] * SC), Y: Math.round(p[1] * SC) };
  let n = 0; for (const P of paths) if (CL.Clipper.PointInPolygon(q, P) !== 0) n++;
  return n % 2 === 1;
}
// des lignes ouvertes (listes de points, mm), découpées par une région
function lignesDans(lignes, regionCL) {
  if (!lignes.length || !regionCL.length) return [];
  const c = new CL.Clipper();
  c.AddPaths(lignes.filter(l => l.length > 1).map(versCL), CL.PolyType.ptSubject, false);
  c.AddPaths(regionCL, CL.PolyType.ptClip, true);
  const arbre = new CL.PolyTree();
  c.Execute(CL.ClipType.ctIntersection, arbre, CL.PolyFillType.pftNonZero, CL.PolyFillType.pftNonZero);
  return recoller(CL.Clipper.OpenPathsFromPolyTree(arbre).map(deCL));
}

// deux bouts qui se touchent font une seule ligne (la boucle coupée à son point de départ)
function recoller(lignes) {
  const pres = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.05;
  let L = lignes.filter(l => l.length > 1), change = true;
  while (change) {
    change = false;
    for (let i = 0; i < L.length && !change; i++) for (let j = 0; j < L.length && !change; j++) {
      if (i === j) continue;
      const a = L[i], b = L[j];
      if (pres(a[a.length - 1], b[0])) { L[i] = a.concat(b.slice(1)); L.splice(j, 1); change = true; }
      else if (pres(a[a.length - 1], b[b.length - 1])) { L[i] = a.concat(b.slice().reverse().slice(1)); L.splice(j, 1); change = true; }
    }
  }
  return L;
}
const longueur = l => { let s = 0; for (let i = 1; i < l.length; i++) s += lon(sub(l[i], l[i - 1])); return s; };
const disque = (c, r, n = 48) => Array.from({ length: n }, (_, k) => add(c, [r * Math.cos(2 * Math.PI * k / n), r * Math.sin(2 * Math.PI * k / n)]));

// Ramer-Douglas-Peucker : allège les polylignes sans changer ce qui se voit
function allege(P, tol, ferme_ = false) {
  if (P.length < 4) return P;
  if (ferme_) {                                  // une boucle : coupée en deux au point le plus loin du départ
    let im = 0, dm = -1;
    for (let i = 1; i < P.length; i++) { const d = lon(sub(P[i], P[0])); if (d > dm) { dm = d; im = i; } }
    const a = allege(P.slice(0, im + 1), tol), b = allege(P.slice(im).concat([P[0]]), tol);
    return a.concat(b.slice(1, -1));
  }
  const pts = P;
  const garde = new Uint8Array(pts.length); garde[0] = garde[pts.length - 1] = 1;
  const pile = [[0, pts.length - 1]];
  while (pile.length) {
    const [a, b] = pile.pop(); let dm = 0, im = -1;
    const A = pts[a], B = pts[b], AB = sub(B, A), L = lon(AB);
    for (let i = a + 1; i < b; i++) { const d = L > 1e-9 ? Math.abs(crx(AB, sub(pts[i], A))) / L : lon(sub(pts[i], A)); if (d > dm) { dm = d; im = i; } }
    if (dm > tol && im > 0) { garde[im] = 1; pile.push([a, im], [im, b]); }
  }
  return pts.filter((_, i) => garde[i]);
}

// ─── interpolation des largeurs : cubique monotone (pas de bosse entre deux clés) ─────────
function profil(cles) {
  const T = cles.map(c => c[0]);
  const f = j => {
    const Y = cles.map(c => c[j]), n = T.length;
    if (n === 1) return () => Y[0];
    const d = [], m = new Array(n).fill(0);
    for (let i = 0; i < n - 1; i++) d.push((Y[i + 1] - Y[i]) / ((T[i + 1] - T[i]) || 1e-9));
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
      const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { const k = 3 / Math.sqrt(s); m[i] = k * a * d[i]; m[i + 1] = k * b * d[i]; }
    }
    return t => {
      if (t <= T[0]) return Y[0];
      if (t >= T[n - 1]) return Y[n - 1];
      let i = 0; while (t > T[i + 1]) i++;
      const h = T[i + 1] - T[i], s = (t - T[i]) / h, s2 = s * s, s3 = s2 * s;
      return (2 * s3 - 3 * s2 + 1) * Y[i] + (s3 - 2 * s2 + s) * h * m[i] + (-2 * s3 + 3 * s2) * Y[i + 1] + (s3 - s2) * h * m[i + 1];
    };
  };
  const av = f(1), ar = f(2);
  return { av, ar, t0: T[0], t1: T[T.length - 1], cles };
}

// ─── proportions ──────────────────────────────────────────────────────────────────────────
// Longueurs d'os en mm (homme adulte de 1750 : hanche à 920, genou à 500, cheville à 80, épaule
// à 1410, base du cou à 1460, sommet à 1750). Les enfants : 5,5 à 6 têtes, jambes plus courtes.
// largeurs : facteur sur les profils de l'homme (tronc, membres) ; tete : facteur sur la tête.
// Si proportions.json (agent 4) existe et porte ces clés, il prime.
const PROPORTIONS = {
  adulte:  { taille: 1750, tronc: 540, epaule: 0.91, cou: 100, tete: 1, bras: 330, avantbras: 260, main: 1, cuisse: 425, jambe: 420, pied: 1, cheville: 80, largeurs: { tronc: 1, membres: 1 } },
  femme:   { taille: 1630, tronc: 500, epaule: 0.91, cou: 95, tete: 0.94, bras: 305, avantbras: 238, main: 0.9, cuisse: 400, jambe: 390, pied: 0.9, cheville: 75, largeurs: { tronc: 0.92, membres: 0.88 }, troncProfil: 'femme' },
  enfant6: { taille: 1150, tronc: 365, epaule: 0.9, cou: 62, tete: 0.86, bras: 205, avantbras: 160, main: 0.66, cuisse: 255, jambe: 255, pied: 0.66, cheville: 52, largeurs: { tronc: 0.72, membres: 0.66 }, troncProfil: 'enfant' },
  enfant4: { taille: 1030, tronc: 335, epaule: 0.9, cou: 55, tete: 0.82, bras: 182, avantbras: 142, main: 0.6, cuisse: 215, jambe: 222, pied: 0.6, cheville: 48, largeurs: { tronc: 0.68, membres: 0.62 }, troncProfil: 'enfant' },
};
PROPORTIONS.homme = PROPORTIONS.adulte;
PROPORTIONS.enfant = PROPORTIONS.enfant6;

// ─── les profils de segments, vue de profil (mm, homme adulte) ────────────────────────────
// [t, demi-largeur avant, demi-largeur arrière] ; t de 0 à 1 le long de l'os. « Avant » : le
// côté qui regarde vers +x quand le segment est dans la pose debout (le ventre, le devant de la
// cuisse et du tibia, le pli du coude). t hors de 0…1 : la forme dépasse l'os (le bas du bassin).
const SEGMENTS_PROFIL = {
  tronc: [[-0.12, 46, 50], [-0.07, 74, 78], [0.0, 92, 92], [0.07, 97, 97], [0.17, 99, 95],
    [0.29, 99, 88], [0.45, 110, 95], [0.62, 120, 104], [0.78, 112, 104], [0.9, 84, 90], [1.0, 54, 58]],
  cou: [[0, 60, 60], [0.5, 53, 56], [1, 52, 56]],
  bras: [[0, 50, 50], [0.25, 47, 47], [0.6, 43, 42], [1, 37, 38]],
  avantbras: [[0, 37, 38], [0.18, 42, 41], [0.55, 36, 34], [1, 28, 27]],
  cuisse: [[0, 84, 94], [0.2, 80, 82], [0.6, 66, 63], [0.9, 55, 52], [1, 54, 51]],
  jambe: [[0, 53, 51], [0.14, 48, 55], [0.32, 44, 58], [0.6, 37, 45], [0.88, 32, 34], [1, 32, 34]],
};
const TRONCS = {
  femme: [[-0.12, 46, 54], [-0.07, 76, 86], [0.0, 90, 102], [0.07, 93, 104], [0.17, 92, 96],
    [0.3, 88, 80], [0.45, 98, 86], [0.6, 124, 96], [0.75, 112, 98], [0.9, 82, 88], [1.0, 54, 58]],
  enfant: [[-0.12, 50, 54], [-0.07, 78, 82], [0.0, 96, 96], [0.07, 102, 98], [0.17, 108, 96],
    [0.3, 110, 90], [0.45, 112, 94], [0.62, 112, 100], [0.78, 106, 100], [0.9, 86, 88], [1.0, 58, 60]],
};
// La tête de profil, regard vers +x : origine au haut du cou (sous le crâne, à hauteur de la
// bouche), y vers le bas. Un ovoïde ; le nez et le menton à peine marqués.
const TETE_PROFIL = [
  [-4, -190], [42, -181], [76, -153], [91, -116], [94, -86], [101, -58], [96, -40], [91, -24],
  [91, -4], [86, 22], [70, 40], [44, 44], [18, 33], [-6, 14], [-40, 6], [-72, -16], [-94, -50],
  [-102, -90], [-92, -136], [-66, -170], [-36, -186],
];

// La masse des cheveux, de profil (même repère que la tête) : tout ce qui est au-dessus et en
// arrière de la ligne front → tempe → devant l'oreille → nuque. Coupée par le contour de la tête.
const CHEVEUX_PROFIL = [[86, -150], [58, -134], [26, -120], [4, -104], [-8, -80], [-22, -58], [-46, -40], [-72, -24],
  [-220, -24], [-220, -320], [220, -320], [220, -176]];

// ─── poses intégrées (si poses.json n'existe pas encore) ──────────────────────────────────
const POSES_INTEGREES = {
  debout: { appui: 'pieds', angles: { tronc: 0, cou: 12, tete: 0, brasP: 2, avantbrasP: 8, brasL: -3, avantbrasL: 4, cuisseP: 0, jambeP: 0, piedP: 90, cuisseL: 0, jambeL: 0, piedL: 90 } },
  marche: { appui: 'pieds', angles: { tronc: 3, cou: 8, tete: 0, brasP: -18, avantbrasP: -6, brasL: 20, avantbrasL: 36, cuisseP: 22, jambeP: 6, piedP: 100, cuisseL: -14, jambeL: 12, piedL: 62 } },
  'penche-dos-droit': { appui: 'pieds', angles: { tronc: 48, cou: 40, tete: 20, brasP: 18, avantbrasP: 18, brasL: 12, avantbrasL: 14, cuisseP: 52, jambeP: -16, piedP: 90, cuisseL: 52, jambeL: -16, piedL: 90 } },
  'penche-dos-rond': { appui: 'pieds', angles: { tronc: 72, dos: 46, cou: 78, tete: 62, brasP: 8, avantbrasP: 10, brasL: 4, avantbrasL: 6, cuisseP: -6, jambeP: 2, piedP: 90, cuisseL: -6, jambeL: 2, piedL: 90 } },
  accroupi: { appui: 'pieds', angles: { tronc: 50, dos: 10, cou: 40, tete: 12, brasP: 30, avantbrasP: 58, brasL: 26, avantbrasL: 54, cuisseP: 114, jambeP: -36, piedP: 90, cuisseL: 114, jambeL: -36, piedL: 90 } },
  genou: { appui: 'genouP', angles: { tronc: 4, cou: 12, tete: 0, brasP: 12, avantbrasP: 52, brasL: 22, avantbrasL: 70, cuisseP: 2, jambeP: -108, piedP: 14, cuisseL: 92, jambeL: 2, piedL: 90 } },
  genoux: { appui: 'genoux', angles: { tronc: 3, cou: 8, tete: 0, brasP: 8, avantbrasP: 30, brasL: 4, avantbrasL: 26, cuisseP: 4, jambeP: -108, piedP: 14, cuisseL: 2, jambeL: -108, piedL: 12 } },
  'assis-chaise': { appui: 'pieds', angles: { tronc: -4, cou: 12, tete: 0, brasP: 12, avantbrasP: 78, brasL: 8, avantbrasL: 74, cuisseP: 88, jambeP: 4, piedP: 92, cuisseL: 86, jambeL: -2, piedL: 88 } },
  'assis-sol': { appui: 'fesses', angles: { tronc: 8, cou: 10, tete: 0, brasP: 18, avantbrasP: 70, brasL: 14, avantbrasL: 66, cuisseP: 84, jambeP: 94, piedP: 172, cuisseL: 84, jambeL: 94, piedL: 170 } },
  'couche-dos': { appui: 'dos', angles: { tronc: -90, cou: -94, tete: -98, brasP: 88, avantbrasP: 92, brasL: 86, avantbrasL: 90, cuisseP: 90, jambeP: 90, piedP: 172, cuisseL: 88, jambeL: 90, piedL: 168 } },
  'tire-corde': { appui: 'pieds', angles: { tronc: -15, cou: -2, tete: 4, brasP: 48, avantbrasP: 88, mainP: 88, brasL: 32, avantbrasL: 96, mainL: 96, cuisseP: 30, jambeP: 26, piedP: 100, cuisseL: -6, jambeL: 22, piedL: 96 }, mains: { P: 'prise', L: 'prise' } },
  'porte-caisse': { appui: 'pieds', angles: { tronc: -6, cou: 4, tete: 0, brasP: 14, avantbrasP: 92, mainP: 96, brasL: 10, avantbrasL: 88, mainL: 92, cuisseP: 2, jambeP: 0, piedP: 90, cuisseL: -2, jambeL: 0, piedL: 90 }, mains: { P: 'porte', L: 'porte' } },
};

// lus une fois, relus seulement si le fichier a changé (date de modification)
const CACHE_JSON = new Map();
function chargerJSON(nom) {
  const f = path.join(__dirname, nom);
  try {
    if (!fs.existsSync(f)) return null;
    const t = fs.statSync(f).mtimeMs, c = CACHE_JSON.get(f);
    if (c && c.t === t) return c.v;
    const v = JSON.parse(fs.readFileSync(f, 'utf8'));
    CACHE_JSON.set(f, { t, v });
    return v;
  } catch (e) { return (CACHE_JSON.get(f) || {}).v || null; }   // fichier en cours d'écriture : le dernier bon
}
const DEJA_DIT = new Set();
function trouverPose(id) {
  const pj = chargerJSON('poses.json');
  const liste = pj && (Array.isArray(pj) ? pj : (pj.poses || Object.values(pj)));
  if (Array.isArray(liste)) {
    const p = liste.find(q => q && q.id === id && (!q.vue || q.vue === 'profil')) || liste.find(q => q && q.id === id);
    if (p) return p;
  }
  if (pj && !Array.isArray(pj) && pj[id] && pj[id].angles) return pj[id];
  if (POSES_INTEGREES[id]) return POSES_INTEGREES[id];
  if (!DEJA_DIT.has(id)) { DEJA_DIT.add(id); console.warn(`corps : pose « ${id} » inconnue (ni poses.json ni le moteur) — rendue debout`); }
  return null;
}

// ─── extrémités : celles de l'agent 2 si elles existent, sinon les provisoires ────────────
let EXT = null;
function extremites() {
  if (EXT !== null) return EXT;
  try { EXT = require('./extremites'); } catch (e) { EXT = false; }
  return EXT;
}
// main provisoire : une moufle, pouce du côté avant (−y), origine au poignet, +x vers les doigts
const MAINS_PROV = {
  ouverte: { pts: [[0, -28], [22, -34], [40, -46], [64, -58], [84, -60], [92, -52], [80, -40], [96, -40], [130, -40], [164, -34], [186, -18], [190, 0], [182, 20], [150, 36], [110, 40], [60, 38], [24, 32], [0, 28]], details: [[[46, -40], [74, -42], [86, -46]]], prise: [120, 0, 0] },
  plat: { pts: [[0, -28], [22, -34], [40, -46], [64, -58], [84, -60], [92, -52], [80, -40], [96, -40], [130, -40], [164, -34], [186, -18], [190, 0], [182, 20], [150, 36], [110, 40], [60, 38], [24, 32], [0, 28]], details: [[[46, -40], [74, -42], [86, -46]]], prise: [120, -40, 0] },
  prise: { pts: [[0, -28], [24, -38], [56, -50], [86, -52], [108, -44], [118, -22], [118, 6], [110, 30], [88, 46], [58, 46], [26, 36], [0, 28]], details: [[[52, -44], [82, -30], [100, -32]]], prise: [76, -8, 90] },
  pointe: { pts: [[0, -28], [22, -36], [44, -44], [84, -44], [120, -42], [178, -34], [186, -26], [176, -18], [118, -14], [112, 20], [92, 40], [56, 40], [24, 32], [0, 28]], details: [[[46, -38], [74, -40]]], prise: [180, -26, 0] },
};
MAINS_PROV.poing = MAINS_PROV.prise;
// botte provisoire de profil : origine à la cheville, la jambe vers −y, la pointe vers +x
const PIEDS_PROV = {
  botte: { pts: [[-34, -110], [-38, -60], [-50, -8], [-60, 40], [-62, 70], [-56, 86], [-40, 90], [60, 90], [150, 90], [196, 86], [214, 72], [214, 54], [196, 40], [150, 24], [96, 8], [56, -18], [36, -60], [32, -110]], details: [[[-60, 74], [214, 74]]], talon: [-60, 90], pointe: [214, 80] },
  nu: { pts: [[-30, -70], [-34, -30], [-44, 6], [-52, 34], [-50, 56], [-36, 66], [40, 66], [120, 68], [176, 68], [192, 60], [186, 48], [150, 36], [92, 16], [52, -6], [30, -40], [28, -70]], details: [], talon: [-50, 66], pointe: [192, 62] },
};

// une extrémité dans son repère local : { contour (points), details, prise, attache }
const CACHE_EXT = new Map();
function extremite(sorte, type, cote, opt = {}) {
  const cle = JSON.stringify([sorte, type, cote, opt]);
  if (CACHE_EXT.has(cle)) return CACHE_EXT.get(cle);
  let r = null;
  const E = extremites();
  if (E && typeof E[sorte] === 'function') {
    try {
      const x = E[sorte](type, 'profil', cote, opt);
      if (x && (x.polygone || x.contour)) {
        const polys = x.polygone && x.polygone.length ? (Array.isArray(x.polygone[0][0]) ? x.polygone : [x.polygone]) : aplatir(x.contour).filter(q => q.length > 2);
        const det = (x.details || []).flatMap(d => aplatir(d).map(q => (q.ferme ? q.concat([q[0]]) : q)));
        const ex = x.extras || {};
        const pt = v => (v ? (Array.isArray(v) ? v : [v.x, v.y]) : null);
        r = { contours: polys, details: det, prise: x.prise, attache: x.attache, objet: x.objet,
          talon: pt(ex.talon || x.talon), pointe: pt(ex.pointe || x.pointe), plante: pt(ex.plante), bout: pt(ex.bout), ext: true };
      }
    } catch (e) { if (process.env.CORPS_DEBUG) console.error('extremites.js :', e.message); }
  }
  if (!r) {
    const P = sorte === 'main' ? (MAINS_PROV[type] || MAINS_PROV.ouverte) : (PIEDS_PROV[type] || PIEDS_PROV.botte);
    r = { contours: [lisseFerme(P.pts, 6)], details: (P.details || []).map(l => l),
      prise: P.prise ? { x: P.prise[0], y: P.prise[1], angle: P.prise[2] } : null, talon: P.talon, pointe: P.pointe };
  }
  CACHE_EXT.set(cle, r);
  return r;
}

// ─── la bande : un membre en une seule pièce le long d'une polyligne d'os ─────────────────
// os : [P0, P1, …] ; profils : un profil (de profil()) par segment ; sens : +1 si « avant » est à
// gauche du sens de marche (membres qui descendent), −1 sinon (tronc et cou, qui montent).
// bouts : { debut: k, fin: k } bombé des bouts (0 = coupé net, 1 = demi-cercle).
// Rend { morceaux: [polygones], parSegment: [[polygones du segment i]] } : l'union se fait ensuite.
function bande(os, profils, { sens = 1, bouts = { debut: 1, fin: 1 }, pas = 4, axes = null } = {}) {
  const n = os.length - 1, morceaux = [], parSegment = [];
  const sec = [];                                            // sections : { p, nAv, av, ar, u }
  // les profils bout à bout, en longueur d'os : une seule courbe de largeur pour tout le membre,
  // sans cassure de pente au genou ni au coude (les deux clés de l'articulation se moyennent)
  const Ls = os.slice(0, -1).map((A, i) => lon(sub(os[i + 1], A)) || 1);
  let chaine = null;
  if (n > 1 && profils.every(p => p.cles)) {
    const cles = []; let off = 0;
    profils.forEach((p, i) => {
      for (const [t, a, b] of p.cles) {
        if (i > 0 && t < 0) continue;
        if (i < n - 1 && t > 1) continue;
        const x = off + t * Ls[i], der = cles[cles.length - 1];
        if (der && Math.abs(der[0] - x) < 1e-6) { der[1] = (der[1] + a) / 2; der[2] = (der[2] + b) / 2; }
        else cles.push([x, a, b]);
      }
      off += Ls[i];
    });
    chaine = profil(cles);
  }
  let decal = 0;
  for (let i = 0; i < n; i++) {
    const A = os[i], B = os[i + 1], L = Ls[i], u = uni(sub(B, A)), nAv = mul(gau(u), sens);
    const pr0 = profils[i], off = decal;
    const pr = chaine ? { av: t => chaine.av(off + t * L), ar: t => chaine.ar(off + t * L), t0: pr0.t0, t1: pr0.t1 } : pr0;
    decal += L;
    const t0 = i === 0 ? Math.min(0, pr.t0) : 0, t1 = i === n - 1 ? Math.max(1, pr.t1) : 1;
    const N = Math.max(6, Math.ceil(L * (t1 - t0) / pas));
    const S = [];
    for (let k = 0; k <= N; k++) {
      const t = t0 + (t1 - t0) * k / N;
      let p = add(A, mul(u, L * t)), uu = u, nn = nAv;
      if (axes && axes[i]) { const r = axes[i](t); p = r.p; uu = r.u; nn = mul(gau(r.u), sens); }
      S.push({ p, u: uu, nAv: nn, av: pr.av(t), ar: pr.ar(t) });
    }
    sec.push(S);
    const mor = [];
    for (let k = 0; k < S.length - 1; k++) {
      const a = S[k], b = S[k + 1];
      mor.push([add(a.p, mul(a.nAv, a.av)), add(b.p, mul(b.nAv, b.av)), sub(b.p, mul(b.nAv, b.ar)), sub(a.p, mul(a.nAv, a.ar))]);
    }
    parSegment.push(mor);
    morceaux.push(...mor);
  }
  // l'articulation : un éventail du côté extérieur du pli, autour du point d'os
  for (let i = 0; i < n - 1; i++) {
    const a = sec[i][sec[i].length - 1], b = sec[i + 1][0], P = os[i + 1];
    const c = crx(a.u, b.u);
    const tour = Math.atan2(c, dot(a.u, b.u)) / RAD;         // + : tourne vers la droite à l'écran
    if (Math.abs(tour) < 0.5) continue;
    // côté extérieur : celui du côté opposé au virage
    const cotAv = (mul(gau(a.u), sens)), versGauche = tour < 0;
    // le côté extérieur est à droite si le virage va vers la gauche
    const extGauche = !versGauche;
    const avEstGauche = sens > 0;
    const exterieurAvant = extGauche === avEstGauche;
    const wa = exterieurAvant ? a.av : a.ar, wb = exterieurAvant ? b.av : b.ar;
    const na = exterieurAvant ? a.nAv : mul(a.nAv, -1), nb = exterieurAvant ? b.nAv : mul(b.nAv, -1);
    const K = Math.max(3, Math.ceil(Math.abs(tour) / 5));
    const ang0 = Math.atan2(na[1], na[0]), d = Math.atan2(crx(na, nb), dot(na, nb));
    const pts = [P];
    for (let k = 0; k <= K; k++) { const t = k / K, an = ang0 + d * t, w = wa + (wb - wa) * t; pts.push(add(P, [w * Math.cos(an), w * Math.sin(an)])); }
    morceaux.push(pts);
    void cotAv;
  }
  // les bouts arrondis
  const cap = (s, dir, k) => {
    if (!k) return null;
    const rho = (s.av + s.ar) / 2, M = add(s.p, mul(s.nAv, (s.av - s.ar) / 2)), pts = [];
    for (let q = 0; q <= 16; q++) { const th = Math.PI * q / 16; pts.push(add(M, add(mul(s.nAv, rho * Math.cos(th)), mul(dir, k * rho * Math.sin(th))))); }
    return pts;
  };
  const s0 = sec[0][0], s1 = sec[n - 1][sec[n - 1].length - 1];
  const c0 = cap(s0, mul(s0.u, -1), bouts.debut), c1 = cap(s1, s1.u, bouts.fin);
  if (c0) { morceaux.push(c0); parSegment[0].push(c0); }
  if (c1) { morceaux.push(c1); parSegment[n - 1].push(c1); }
  return { morceaux, parSegment, sections: sec };
}

// ─── le squelette, vue de profil ──────────────────────────────────────────────────────────
function squelette(A, Pr) {
  const B = [0, 0];                                          // le bassin = les hanches, de profil
  const dos = A.dos || 0;
  // l'axe du tronc : un arc si le dos s'arrondit (dos = degrés de courbure totale)
  const axeTronc = t => {
    const N = 24, tt = Math.max(0, Math.min(1, t));
    let p = [0, 0];
    const ang = s => A.tronc + dos * (s - 0.5);
    for (let k = 0; k < N; k++) { const s = (k + 0.5) / N * tt; p = add(p, mul(haut(ang(s)), Pr.tronc * tt / N)); }
    if (t < 0) p = add([0, 0], mul(haut(ang(0)), Pr.tronc * t));
    if (t > 1) p = add(axeTronc(1), mul(haut(ang(1)), Pr.tronc * (t - 1)));
    return { p, u: haut(ang(Math.max(0, Math.min(1, t)))) };
  };
  const C = axeTronc(1).p;
  const ep = axeTronc(Pr.epaule), nT = mul(gau(ep.u), -1);    // nT : l'avant du tronc
  const S = add(add(ep.p, mul(nT, -8 * Pr.largeurs.tronc)), mul(ep.u, A.hausse || 0));   // l'épaule, un peu en arrière de l'axe ; hausse : haussée de tant de mm
  const Q = add(C, mul(haut(A.cou), Pr.cou));                  // le haut du cou
  const j = { bassin: B, cou: C, nuque: Q, epaule: S };
  for (const c of ['P', 'L']) {
    const E = add(S, mul(bas(A['bras' + c]), Pr.bras));
    const W = add(E, mul(bas(A['avantbras' + c]), Pr.avantbras));
    const K = add(B, mul(bas(A['cuisse' + c]), Pr.cuisse));
    const Ch = add(K, mul(bas(A['jambe' + c]), Pr.jambe));
    Object.assign(j, { ['epaule' + c]: S, ['coude' + c]: E, ['poignet' + c]: W, ['hanche' + c]: B, ['genou' + c]: K, ['cheville' + c]: Ch });
  }
  return { j, axeTronc };
}

// le pied posé : extremites.js le construit sur l'axe de la jambe (la cheville plie chez lui :
// angle = pied − jambe ; les orteils se couchent au sol quand le pied pique vers le bas) ; les
// provisoires d'ici tournent tout d'un bloc à l'angle du pied
function piedPose(A, Pr, j, c, type, seg = SEGMENTS_PROFIL, kM = Pr.largeurs.membres) {
  const ap = A['pied' + c] !== undefined ? A['pied' + c] : A['jambe' + c] + 90;
  const kp = Pr.pied;
  const fin = seg.jambe[seg.jambe.length - 1];
  const opt = { cheville: (fin[1] + fin[2]) * kM / kp, angle: Math.round((ap - A['jambe' + c]) * 2) / 2 };
  if (A._echelle) opt.echelle = Math.round(A._echelle * kp * 1000) / 1000;   // le trait de semelle : seulement assez grand
  // la pointe pique vers le sol et le pied porte (debout, à genou) : les orteils se couchent à plat
  // vers l'avant (sur la pointe, orteils repliés sous soi) ; A.orteilsP / A.orteilsL l'imposent
  const imp = A['orteils' + c];
  if (imp !== undefined) opt.orteils = imp;
  else if (Math.abs(ap) < 70 && ['pieds', 'genouP', 'genoux'].includes(A._appui)) opt.orteils = 5 * Math.round(Math.max(0, Math.min(95, 90 - ap)) / 5);
  const ef = extremite('pied', type, c, opt);
  const rot = ef.ext ? -A['jambe' + c] : 90 - ap;
  const T = p => add(j['cheville' + c], tourne(mul(p, kp), rot));
  return { polys: ef.contours.map(poly => poly.map(T)), details: (ef.details || []).map(l => l.map(T)),
    talon: ef.talon ? T(ef.talon) : null, pointe: ef.pointe ? T(ef.pointe) : null, plante: ef.plante ? T(ef.plante) : null };
}

// ─── les pièces d'un corps de profil ──────────────────────────────────────────────────────
function pieces(A, Pr, o) {
  const { j, axeTronc } = squelette(A, Pr);
  const kT = Pr.largeurs.tronc, kM = Pr.largeurs.membres;
  const echP = (cles, k) => profil(cles.map(c => [c[0], c[1] * k, c[2] * k]));
  const seg = o.segments || SEGMENTS_PROFIL;
  const tr = o.troncProfil || (Pr.troncProfil ? TRONCS[Pr.troncProfil] : seg.tronc);
  const P = {};
  // le tronc : une bande le long de l'axe (courbe si le dos s'arrondit)
  P.tronc = bande([j.bassin, j.cou], [echP(tr, kT)], { sens: -1, bouts: { debut: 0.25, fin: 0.5 }, axes: [axeTronc] });
  // le cou et la tête
  P.cou = bande([j.cou, j.nuque], [echP(seg.cou, kT)], { sens: -1, bouts: { debut: 0, fin: 0 } });
  const kH = Pr.tete;
  const tete = lisseFerme(TETE_PROFIL, 6).map(p => add(j.nuque, tourne(mul(p, kH), A.tete)));
  P.tete = { morceaux: [tete] };
  const info = { j, mains: {}, pieds: {} };
  // les membres, de chaque côté
  for (const c of ['P', 'L']) {
    const bras = bande([j['epaule' + c], j['coude' + c], j['poignet' + c]], [echP(seg.bras, kM), echP(seg.avantbras, kM)], { sens: 1, bouts: { debut: 1, fin: 0.3 } });
    const jambe = bande([j['hanche' + c], j['genou' + c], j['cheville' + c]], [echP(seg.cuisse, kM), echP(seg.jambe, kM)], { sens: 1, bouts: { debut: 1, fin: 0.3 } });
    // la main : posée sur l'axe de l'avant-bras ; le poignet plie dans extremites.js (plie)
    const tm = (o.mains && o.mains[c]) || 'ouverte';
    const am = A['main' + c] !== undefined ? A['main' + c] : A['avantbras' + c];
    const km = Pr.main;
    const largP = (seg.avantbras[seg.avantbras.length - 1][1] + seg.avantbras[seg.avantbras.length - 1][2]) * kM;
    const optM = { poignet: largP / km, plie: am - A['avantbras' + c] };
    if (o.prises && o.prises[c]) optM.diametre = o.prises[c] / km;              // le diamètre du manche (prise de poses.json)
    const em = o.sansExtremites ? { contours: [], details: [] } : extremite('main', tm, c, optM);
    const rotM = 90 - (em.ext ? A['avantbras' + c] : am);
    const TM = p => add(j['poignet' + c], tourne(mul(p, km), rotM));
    const mainPolys = em.contours.map(poly => poly.map(TM));
    const mainDet = (em.details || []).map(l => l.map(TM));
    let prise = null;
    if (em.prise) prise = { p: TM([em.prise.x, em.prise.y]), angle: (em.prise.angle || 0) + rotM, r: em.prise.r ? em.prise.r * km : null, objet: em.objet || null };
    info.mains[c] = { type: tm, prise, angle: 90 - am, poignet: j['poignet' + c], bout: em.bout ? TM(em.bout) : null };
    // le pied
    const tp = (o.pieds && (o.pieds[c] || (typeof o.pieds === 'string' ? o.pieds : null))) || 'botte';
    const pp = o.sansExtremites ? { polys: [], details: [] } : piedPose(A, Pr, j, c, tp, seg, kM);
    info.pieds[c] = { cheville: j['cheville' + c], talon: pp.talon, pointe: pp.pointe, plante: pp.plante };
    P['bras' + c] = { morceaux: bras.morceaux, parSegment: bras.parSegment, main: mainPolys, details: mainDet };
    P['jambe' + c] = { morceaux: jambe.morceaux, parSegment: jambe.parSegment, pied: pp.polys, details: pp.details };
  }
  return { P, info, axeTronc };
}

// les deux pieds au sol : le pied qui flotte (ou qui s'enfonce) de quelques centimètres se pose,
// en pliant le genou (deux os, le genou du côté où il était) ; la cheville garde son x
function ancrerPieds(A, Pr, pieds, solCible = null) {
  const basPied = B => {
    const { j } = squelette(B, Pr), r = {};
    for (const c of ['P', 'L']) {
      const pp = piedPose(B, Pr, j, c, (pieds && pieds[c]) || 'botte');
      let dy = -Infinity;
      for (const poly of pp.polys) for (const p of poly) dy = Math.max(dy, p[1] - j['cheville' + c][1]);
      r[c] = { dy, sole: j['cheville' + c][1] + dy };
    }
    return { j, r };
  };
  const { j, r: bas_ } = basPied(A);
  const sol = solCible !== null ? solCible : Math.max(bas_.P.sole, bas_.L.sole);
  for (const c of ['P', 'L']) {
    const ecart = sol - bas_[c].sole;
    if (Math.abs(ecart) < 0.5 || (solCible === null && ecart > 160)) continue;
    const H = j['hanche' + c], K0 = j['genou' + c], Tc = [j['cheville' + c][0], sol - bas_[c].dy];
    const L1 = Pr.cuisse, L2 = Pr.jambe, D = sub(Tc, H), d = lon(D);
    if (d < L1 + L2 - 0.5 && d > Math.abs(L1 - L2) + 1) {
      const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d), hh = Math.sqrt(Math.max(0, L1 * L1 - a * a));
      const M = add(H, mul(uni(D), a)), nn = gau(uni(D));
      const K1 = add(M, mul(nn, hh)), K2 = sub(M, mul(nn, hh));
      const K = lon(sub(K1, K0)) < lon(sub(K2, K0)) ? K1 : K2;
      const angle = v => Math.atan2(v[0], v[1]) / RAD;
      A['cuisse' + c] = angle(sub(K, H)); A['jambe' + c] = angle(sub(Tc, K));
      continue;
    }
    // la jambe ne va pas plus loin (tendue derrière, qui pousse) : le pied se met sur la pointe,
    // le talon se lève jusqu'à ce que les orteils touchent ; assis trop haut, le pied pend
    if (ecart <= 0 || solCible !== null) continue;
    // des deux sens (la pointe qui descend, le talon qui descend), celui qui touche le plus tôt :
    // la jambe tendue derrière se met sur la pointe, la jambe tendue devant pose le talon
    const p0 = A['pied' + c] !== undefined ? A['pied' + c] : A['jambe' + c] + 90;
    let mieux = null;
    for (const sens of [-1, 1]) {
      const f = dp => { const B = { ...A, _appui: A._appui, _echelle: A._echelle, ['pied' + c]: p0 + sens * dp }; return basPied(B).r[c].sole - sol; };
      let a = 0, b = 60, fa = f(a), fb = f(b);
      if (fa * fb > 0) continue;
      for (let k = 0; k < 12; k++) { const m = (a + b) / 2, fm = f(m); if (fa * fm <= 0) { b = m; fb = fm; } else { a = m; fa = fm; } }
      const dp = (a + b) / 2;
      if (!mieux || dp < mieux.dp) mieux = { dp, sens };
    }
    if (mieux) A['pied' + c] = p0 + mieux.sens * mieux.dp;
  }
}

// à genou : la jambe au sol pivote autour du genou jusqu'à ce que la pointe du pied touche le sol
// à la hauteur du genou (la cheville garde son pli)
function ancrerGenoux(A, Pr, pieds, cotes) {
  for (const c of cotes) {
    const j0 = A['jambe' + c], p0 = A['pied' + c] !== undefined ? A['pied' + c] : j0 + 90;
    const ecart = dj => {
      const B = { ...A, _appui: A._appui, _echelle: A._echelle, ['jambe' + c]: j0 + dj, ['pied' + c]: p0 + dj };
      const { j } = squelette(B, Pr);
      const pp = piedPose(B, Pr, j, c, (pieds && pieds[c]) || 'botte');
      let dy = -Infinity;
      for (const poly of pp.polys) for (const p of poly) dy = Math.max(dy, p[1]);
      return dy - (j['genou' + c][1] + 52 * Pr.largeurs.membres);
    };
    // la racine la plus proche de zéro : le pied trop bas, le tibia se relève ; trop haut, il s'abaisse
    const f0 = ecart(0);
    if (Math.abs(f0) < 0.5) continue;
    let a = null, b = null, fa, fb;
    for (const pasA of [6, 12, 20, 30, 45, 60]) {
      for (const d of [pasA, -pasA]) { const fd = ecart(d); if (fd * f0 <= 0) { a = 0; fa = f0; b = d; fb = fd; break; } }
      if (a !== null) break;
    }
    if (a === null) continue;
    for (let k = 0; k < 12; k++) { const m = (a + b) / 2, fm = ecart(m); if (fa * fm <= 0) { b = m; fb = fm; } else { a = m; fa = fm; } }
    const dj = (a + b) / 2;
    A['jambe' + c] = j0 + dj; A['pied' + c] = p0 + dj;
  }
}

// le dessous des fesses : le point le plus bas du tronc et du haut des cuisses, près de la hanche
function basFesse(P, j) {
  let b = null;
  const voir = polys => { for (const poly of polys) for (const p of poly) if (Math.abs(p[0] - j.bassin[0]) < 160 && (!b || p[1] > b[1])) b = p; };
  voir(P.tronc.morceaux);
  voir(P.jambeP.parSegment[0]); voir(P.jambeL.parSegment[0]);
  return b || j.bassin;
}

// ─── le rendu ─────────────────────────────────────────────────────────────────────────────
function corps(o = {}) {
  const vue = o.vue || 'profil';
  if (vue !== 'profil') {
    let V = null; try { V = require('./vues'); } catch (e) { /* pas encore */ }
    if (!V || typeof V.corps !== 'function') throw new Error(`corps() : la vue « ${vue} » vient de vues.js (agent 3), pas encore branchée`);
    return V.corps(o, module.exports);
  }
  const poseDef = typeof o.pose === 'object' && o.pose ? o.pose : (trouverPose(o.pose || 'debout') || POSES_INTEGREES.debout);
  const age = o.age || poseDef.age || 'adulte';
  const Pr = proportions(age);
  const A = Object.assign({ tronc: 0, cou: 12, tete: 0, dos: 0 }, poseDef.angles || {}, o.angles || {});
  for (const k of ['bras', 'avantbras', 'cuisse', 'jambe', 'main', 'pied']) {
    if (A[k + 'P'] === undefined && A[k] !== undefined) A[k + 'P'] = A[k];
    if (A[k + 'L'] === undefined && A[k] !== undefined) A[k + 'L'] = A[k];
    if (A[k + 'P'] === undefined && A[k + 'L'] !== undefined) A[k + 'P'] = A[k + 'L'];
    if (A[k + 'L'] === undefined && A[k + 'P'] !== undefined) A[k + 'L'] = A[k + 'P'];
  }
  for (const k of ['bras', 'avantbras', 'cuisse', 'jambe']) for (const c of ['P', 'L']) if (A[k + c] === undefined) A[k + c] = 0;
  const mains = Object.assign({ P: 'ouverte', L: 'ouverte' }, poseDef.mains || {}, o.mains || {});
  const pieds = o.pieds || poseDef.pieds || 'botte';
  const piedsO = typeof pieds === 'string' ? { P: pieds, L: pieds } : pieds;
  const appui0 = o.appui || poseDef.appui || 'pieds';
  Object.defineProperty(A, '_appui', { value: appui0, enumerable: false });
  Object.defineProperty(A, '_echelle', { value: o.echelle || 0.2, enumerable: false });
  // assis : le dessus du siège (mm sous la fesse) fixe le sol ; les pieds le rejoignent s'ils peuvent
  const siegeH = o.siege !== undefined ? o.siege : poseDef.siege;
  let solSiege = null;
  if (appui0 === 'pieds' && siegeH) {
    const p0 = pieces(A, Pr, { mains: {}, pieds: piedsO, segments: o.segments, sansExtremites: true });
    solSiege = basFesse(p0.P, p0.info.j)[1] + siegeH;
  }
  if (appui0 === 'pieds' && o.ancrer !== false) ancrerPieds(A, Pr, piedsO, solSiege);
  if ((appui0 === 'genouP' || appui0 === 'genoux') && o.ancrer !== false) ancrerGenoux(A, Pr, piedsO, appui0 === 'genoux' ? ['P', 'L'] : ['P']);
  const prises = Object.assign({}, poseDef.prise || {}, o.prise || {});           // diamètre du manche, mm
  const { P, info } = pieces(A, Pr, { mains, pieds: piedsO, segments: o.segments, prises });

  // les pièces en Clipper ; chaque membre est d'abord unifié et ses plis arrondis
  const R_PLI = 12, R_UNION = 6;
  const R_MEMBRE = o._rMembre !== undefined ? o._rMembre : 3;
  const membre = (m, rond) => {
    const u = ferme(union(m.morceaux.concat(m.main || [], m.pied || [])), R_PLI);
    // le cou-de-pied : un grand arrondi entre le tibia et la botte, près de la cheville seulement
    const v = rond ? unionCL([u, inter(ferme(u, 30 * Pr.largeurs.membres), [versCL(disque(rond, 120 * Pr.largeurs.membres))])]) : u;
    return ouvre(v, R_MEMBRE);
  };
  const tronc = ferme(union(P.tronc.morceaux.concat(P.cou.morceaux)), 4);
  const tete = union(P.tete.morceaux);
  const corpsHaut = ferme(unionCL([tronc, tete]), 20);          // sous le menton, la nuque : arrondis
  const cache = new Set(o.masquer || []);                            // masquer : ['brasL', 'jambeP', …]
  const M_ = (k, f) => (cache.has(k) ? [] : f());
  const bP = M_('brasP', () => membre(P.brasP)), jP = M_('jambeP', () => membre(P.jambeP, info.j.chevilleP));
  const bL = M_('brasL', () => membre(P.brasL)), jL = M_('jambeL', () => membre(P.jambeL, info.j.chevilleL));
  for (const k of cache) if (P[k]) P[k].details = [];

  // le corps proche : une seule forme ; l'objet proche passe entre le tronc et le bras proche
  const objetP = o.objetP, avecObjet = !!objetP;
  // la hanche : là où le tronc et la cuisse se rencontrent, un grand arrondi (fesse, pli de l'aine),
  // limité au voisinage de la hanche pour ne rien boucher ailleurs
  const R_HANCHE = 26;
  const tj = unionCL([corpsHaut, jP]);
  const hancheRonde = unionCL([tj, inter(ferme(tj, R_HANCHE), [versCL(disque(info.j.hancheP, 230 * Pr.largeurs.tronc))])]);
  // fermer (les coins rentrants) puis ouvrir un peu (les petites arêtes saillantes : pas de coin)
  const R_ARETE = o._rArete !== undefined ? o._rArete : 3.5;
  const proche = sansTrous(ouvre(ferme(unionCL(avecObjet ? [hancheRonde] : [hancheRonde, bP]), R_UNION), R_ARETE));
  const brasSeul = avecObjet ? bP : null;

  // les contours intérieurs : le bord d'un membre proche qui tombe dans ce qu'il y a derrière lui
  const E = 1.0;                                                    // retrait : la ligne s'arrête au trait du contour
  const j = info.j;
  const lignes = [];
  const zone = (c, r) => [versCL(disque(c, r))];
  const kM = Pr.largeurs.membres;
  // la jambe proche devant le tronc, sauf près de la hanche (pas de couture à la ceinture)
  lignes.push(...bordsDans(jP, moins(decale(corpsHaut, -E), zone(j.hancheP, 135 * kM))));
  // le bras proche devant le tronc, la tête et la jambe, sauf près de l'épaule. Plus le bras se
  // lève vers l'avant, plus la zone muette s'agrandit : un bras tendu devant ne barre pas la
  // poitrine de ses deux bords (la bandoulière)
  const leve = Math.max(0, Math.min(1, (A.brasP - 35) / 50));
  // la tête devant le bras proche : à plat ventre, les bras tendus devant, le bras passe le long de
  // la tête et la mangerait ; on dessine la tête par-dessus (son contour à 0,7 sur le bras)
  const aireTete = Math.abs(aireCL(tete));
  const teteDevant = o.teteDevant !== undefined ? o.teteDevant : (poseDef.teteDevant !== undefined ? poseDef.teteDevant
    : (bP.length && appui0 === 'ventre' && Math.abs(aireCL(inter(tete, bP))) > 0.15 * aireTete));
  const derriereBras = teteDevant ? unionCL([tronc, jP]) : unionCL([corpsHaut, jP]);
  const bordsBras0 = bordsDans(bP, moins(decale(derriereBras, -E), unionCL([zone(j.epauleP, (54 + 70 * leve) * kM), teteDevant ? decale(tete, 1.5) : []])));
  const bordsTete = teteDevant ? bordsDans(tete, moins(decale(bP, -E), decale(tronc, -E))) : [];
  // le pli profond (accroupi, bras replié) : le mollet contre la cuisse, l'avant-bras contre le bras
  const pli = (m, i0, i1, P0, r) => {
    const a = union(m.parSegment[i0]), b = union(m.parSegment[i1]);
    return bordsDans(b, moins(decale(a, -E), zone(P0, r)));
  };
  const angleEntre = (a, b) => Math.abs(((a - b) % 360 + 540) % 360 - 180);
  const plisJ0 = !cache.has('jambeP') && angleEntre(A.cuisseP, A.jambeP) > 100 ? pli(P.jambeP, 0, 1, j.genouP, 62 * kM) : [];
  const plisB0 = !cache.has('brasP') && angleEntre(A.brasP, A.avantbrasP) > 110 ? pli(P.brasP, 0, 1, j.coudeP, 46 * kM) : [];
  const plisJL = !cache.has('jambeL') && angleEntre(A.cuisseL, A.jambeL) > 100 ? pli(P.jambeL, 0, 1, j.genouL, 62 * kM) : [];
  const plisBL = !cache.has('brasL') && angleEntre(A.brasL, A.avantbrasL) > 110 ? pli(P.brasL, 0, 1, j.coudeL, 46 * kM) : [];
  // une ligne intérieure courte part du contour ou n'existe pas : un tiret flottant au milieu du
  // blanc (la cuisse sous la fesse, le pli du genou) se lit comme une saleté ; une longue (le bras
  // qui pend devant le corps) reste
  const rive = decale(proche, -(E + 3));
  const ancree = ls => ls.filter(l => l.length > 1 && (longueur(l) > 70 * kM || !dedans(rive, l[0]) || !dedans(rive, l[l.length - 1])));
  lignes.splice(0, lignes.length, ...ancree(lignes));
  const bordsBras = ancree(bordsBras0), plisJ = ancree(plisJ0), plisB = ancree(plisB0);
  // la main proche : son contour sur l'avant-bras ne se voit pas (union) ; ses détails, oui

  // ── le placement : le point le plus bas pose au sol ──
  const tous = unionCL([proche, bL, jL, bP]);
  let yMax = -Infinity, xMin = Infinity, xMax = -Infinity, yMin = Infinity;
  for (const Pp of tous) for (const q of Pp) { const x = q.X / SC, y = q.Y / SC; if (y > yMax) yMax = y; if (y < yMin) yMin = y; if (x < xMin) xMin = x; if (x > xMax) xMax = x; }
  if (solSiege !== null && yMax < solSiege + 5) yMax = solSiege;     // assis : le sol sous le siège, même si les pieds pendent
  const appui = appui0;
  let x0;
  if (appui === 'pieds') x0 = (j.chevilleP[0] + j.chevilleL[0]) / 2;
  else if (appui === 'genouP') x0 = j.genouP[0];
  else if (appui === 'genoux') x0 = (j.genouP[0] + j.genouL[0]) / 2;
  else if (appui === 'avantbras') {
    // pendu par les avant-bras (au bord de la glace) : (x, y) = sous les avant-bras, entre les coudes ;
    // pas de sol, les jambes pendent comme la pose les met
    let b = -Infinity;
    for (const c of ['P', 'L']) if (!cache.has('bras' + c)) for (const poly of P['bras' + c].parSegment[1]) for (const p of poly) b = Math.max(b, p[1]);
    yMax = isFinite(b) ? b : j.coudeP[1];
    x0 = (j.coudeP[0] + j.coudeL[0]) / 2;
  } else if (appui === 'aucun') { x0 = j.bassin[0]; yMax = j.bassin[1]; }  // sans appui : (x, y) = le bassin
  else x0 = j.bassin[0];
  const s = o.echelle || 0.2, m = o.cote === 'gauche' ? -1 : 1;
  const X = o.x || 0, Y = o.y || 0;
  const T = p => [X + m * s * (p[0] - x0), Y + s * (p[1] - yMax)];
  const ang = a => (m > 0 ? a : 180 - a);

  // ── les traits ──
  const tr = o.trait === 'fort' ? { sil: 1.9, int: 1.0, det: 0.7 } : (typeof o.trait === 'number' ? { sil: o.trait, int: o.trait * 0.47, det: o.trait * 0.4 } : { sil: 1.5, int: 0.7, det: 0.6 });
  const f1 = v => (Math.round(v * 100) / 100).toString();
  const tol = 0.06 / s;                                              // l'allègement, en mm, pour 0,06 de vue
  const dFerme = paths => paths.map(Pp => { const q = allege(deCL(Pp), tol, true).map(T); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z'; }).join(' ');
  const dOuvert = ls => ls.filter(l => longueur(l) > 28).map(l => { const q = allege(l, tol).map(T); return 'M' + q.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L'); }).join(' ');
  const plein = (paths, coul, ep) => paths.length ? `<path d="${dFerme(paths)}" fill="${coul}" fill-rule="nonzero" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round"/>` : '';
  const ligne = (ls, ep) => { const d = dOuvert(ls); return d ? `<path d="${d}" fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round"/>` : ''; };

  // la géométrie, en unités de vue
  const geo = {};
  const art = {}; for (const k of Object.keys(j)) art[k] = T(j[k]);
  geo.articulations = art;
  geo.poignetP = art.poignetP; geo.poignetL = art.poignetL;
  for (const c of ['P', 'L']) {
    const mi = info.mains[c];
    const pr = mi.prise ? T(mi.prise.p) : T(mi.poignet);
    geo['main' + c] = { x: pr[0], y: pr[1], angle: ang(mi.prise ? mi.prise.angle : mi.angle), axe: ang(mi.angle), type: mi.type,
      r: mi.prise && mi.prise.r ? mi.prise.r * s : null, objet: mi.prise ? mi.prise.objet : null, bout: mi.bout ? T(mi.bout) : null };
  }
  const tc = add(j.nuque, tourne(mul([0, -80], Pr.tete), A.tete)), th = add(j.nuque, tourne(mul([-4, -190], Pr.tete), A.tete));
  geo.tete = { x: T(tc)[0], y: T(tc)[1], haut: T(th), angle: ang(A.tete) };
  geo.pieds = {};
  for (const c of ['P', 'L']) {
    const pi = info.pieds[c];
    let b = null; for (const poly of P['jambe' + c].pied || []) for (const p of poly) if (!b || p[1] > b[1]) b = p;   // le point le plus bas du pied
    geo.pieds[c] = { cheville: T(pi.cheville), talon: pi.talon && T(pi.talon), pointe: pi.pointe && T(pi.pointe), plante: pi.plante && T(pi.plante), bas: b && T(b) };
  }
  const b0 = T([xMin, yMin]), b1 = T([xMax, yMax]);
  geo.boite = { x0: Math.min(b0[0], b1[0]), y0: b0[1], x1: Math.max(b0[0], b1[0]), y1: b1[1] };
  geo.sol = Y;
  // le dessous des fesses (le dessus du siège quand la pose en donne la hauteur)
  geo.siege = T(basFesse(P, j));
  if (siegeH) geo.siegeHauteur = siegeH * s;
  geo.echelle = s; geo.miroir = m < 0;

  // ── l'ordre de peinture : loin (gris), objet loin, corps proche, objet proche, bras proche ──
  const quoi = v => (typeof v === 'function' ? v(geo) : (v || ''));
  const det = (ls, ep) => ligne(ls, ep);
  const out = [`<g data-corps="${o.pose || 'pose'}">`];
  // le côté loin. Ce qui en dépasse du corps proche se dessine tel quel, la pointe comprise (la jambe
  // loin qui sort sous la fesse : un coin net, pas un chapeau). Ne se dessinent pas : un morceau tout
  // en filet (nulle part 20 mm de large : un double trait, pas une information) et un lambeau plus
  // petit qu'un poing. Le contour du membre loin se trace là où il se voit.
  const devantLoin = avecObjet ? unionCL([proche, bP]) : proche;
  const R_FILET = 10 * kM, AIRE_MIN = 7000 * kM * kM, sousProche = decale(devantLoin, -E);
  // un bout de coude ou de genou qui dépasse seul (sans la main ni le pied) : un lambeau ; la main
  // loin qui pend au repos (ouverte, bras le long du corps) et ne montre qu'un bout devant la
  // cuisse : une languette ; ni l'un ni l'autre ne se dessinent
  const filtreLoin = (f, { bout = null, repos = false } = {}) => {
    if (!f.length) return { remplir: [], bord: [], region: [] };
    const garde = [];
    for (const cp of composantes(moins(f, devantLoin))) {
      const a = Math.abs(aireCL(cp)), avecBout = bout && dedans(decale(cp, 12), bout);
      if (!avecBout && a < 12000 * kM * kM) continue;
      if (avecBout && repos && a < 25000 * kM * kM) continue;
      if (Math.abs(aireCL(cp)) < AIRE_MIN) continue;
      const coeur = ouvre(cp, R_FILET);
      if (!coeur.length) continue;
      garde.push(...cp);                         // le morceau entier : sa pointe file jusque sous le contour proche
    }
    const region = unionCL([decale(garde, 1.5), sousProche]);
    return { remplir: inter(f, region), bord: bordsDans(f, moins(decale(garde, 1.5), sousProche)), region };
  };
  const peindreLoin = (f, details, plis, opt) => {
    const r = filtreLoin(f, opt);
    if (!r.remplir.length) return;
    out.push(`<path d="${dFerme(r.remplir)}" fill="${GRIS}" stroke="none"/>`, ligne(r.bord, tr.sil),
      det(lignesDans(details, r.remplir), tr.det), ligne(lignesDans(plis, r.remplir), tr.int));
  };
  const brasAuRepos = ['ouverte', 'plat'].includes(mains.L) && Math.abs(A.brasL) <= 60 && Math.abs(A.avantbrasL) <= 60;
  peindreLoin(jL, P.jambeL.details, plisJL, { bout: j.chevilleL });
  peindreLoin(bL, P.brasL.details, plisBL, { bout: info.mains.L.prise ? info.mains.L.prise.p : j.poignetL, repos: brasAuRepos });
  if (o.objetL) out.push(quoi(o.objetL));
  // le corps proche : le blanc, les cheveux (gris, facultatifs), puis le trait par-dessus
  out.push(`<path d="${dFerme(proche)}" fill="${BLANC}" stroke="none"/>`);
  // pas de cheveux de profil (décision du 13 octobre : la masse grise fait une tuque) ; seule la vue
  // de dos garde la sienne (vues.js). CHEVEUX_PROFIL reste pour mémoire.
  out.push(`<path d="${dFerme(proche)}" fill="none" stroke="${NOIR}" stroke-width="${tr.sil}" stroke-linejoin="round"/>`);
  out.push(ligne(lignes, tr.int), ligne(plisJ, tr.int), det(P.jambeP.details, tr.det), ligne(bordsTete, tr.int));
  if (!avecObjet) out.push(ligne(bordsBras, tr.int), ligne(plisB, tr.int), det(P.brasP.details, tr.det));
  else {
    out.push(quoi(objetP));
    // le bras proche par-dessus l'objet : son bord à 1,5 hors du corps, à 0,7 sur le corps
    out.push(`<path d="${dFerme(brasSeul)}" fill="${BLANC}" stroke="none"/>`);
    const horsCorps = bordsDans(brasSeul, moins(decale(unionCL([brasSeul, proche]), 4), decale(proche, -E)));
    out.push(ligne(horsCorps, tr.sil), ligne(bordsBras, tr.int), ligne(plisB, tr.int), det(P.brasP.details, tr.det));
  }
  if (o.objet) out.push(quoi(o.objet));                              // devant tout (un manche vu par le bout)
  out.push('</g>');
  const svg = out.filter(Boolean).join('\n');
  return Object.assign({ svg, toString() { return svg; } }, geo);
}

// proportions.json (agent 4) : longueurs d'os et hauteurs par âge ; le moteur en tire son squelette.
// Ce qu'il n'y a pas (les profondeurs de profil) reste celui d'ici.
const ALIAS = { adulte: 'homme', homme: 'homme', femme: 'femme', enfant: 'enfant6', enfant6: 'enfant6', enfant4: 'enfant4' };
function proportions(age) {
  const cle = ALIAS[age] || 'homme';
  const base = PROPORTIONS[cle === 'homme' ? 'adulte' : cle];
  const pj = chargerJSON('proportions.json');
  const g = pj && pj.ages && pj.ages[(pj.alias && pj.alias[age]) || cle];
  if (!g || !g.hauteurs || !g.tete) return base;
  try {
    const h = g.hauteurs, kH = g.tete.hauteur / 234;                 // la tête d'ici : 234 du sommet au menton
    const tronc = (h.epaule - h.hanche) / base.epaule;              // jusqu'à la base du cou
    const Q = h.menton + 44 * kH;                                    // le haut du cou : 44 au-dessus du menton
    return Object.assign({}, base, {
      taille: g.taille, tronc, cou: Math.max(30, Q - (h.hanche + tronc)), tete: kH,
      bras: g.bras, avantbras: g.avantbras, main: g.main / 190, cuisse: g.cuisse, jambe: g.jambe,
      pied: (g.pied && g.pied.longueur ? g.pied.longueur : 266) / 266, cheville: g.cheville, source: 'proportions.json',
    });
  } catch (e) { return base; }
}

module.exports = {
  corps,
  pour: () => corps,                                        // formes.js : corps: require('./corps/moteur').pour(h)
  segments: { profil: SEGMENTS_PROFIL },
  tete: { profil: TETE_PROFIL },
  tronc: { profil: SEGMENTS_PROFIL.tronc },
  proportions: PROPORTIONS,
  poses: POSES_INTEGREES,
  _interne: { proportionsDe: proportions, bande, profil, squelette, pieces, union, unionCL, decale, ferme, ouvre, moins, inter, bordsDans, aplatir, lisseFerme, allege, versCL, deCL, SC, extremite },
};
