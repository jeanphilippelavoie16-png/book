// prises.js — le solveur de prise des mains simples (agent 3) : les doigts qui touchent vraiment l'objet.
//
// Le moteur (moteur.js) dessine une main à partir d'une pose : des angles et un objet. Ce fichier calcule ces
// angles pour que la main TIENNE quelque chose : chaque phalange qui peut toucher l'objet le touche, le pouce
// s'enroule ou vient pincer, la paume se pose à plat sur sa surface. Il écrit aussi mains/poses.json, la liste
// des poses que les planches appellent par leur id (inventaire.md, agent 4).
//
// ═══ CE QUE LE MOTEUR APPELLE ══════════════════════════════════════════════════════════════════════════════
//
//   resoudre(pose, outils) → la pose complétée, ou null (la pose telle quelle)
//     Appelé par moteur.js avant tout le reste, avec outils = { squelette, anatomie, formes, demiAxes,
//     enrouler }. Une pose de poses.json qui porte "solveur" et "table" est relue au diamètre demandé (option
//     diametre de mainSimple) : les angles et l'objet sont interpolés entre les diamètres de la table, en
//     quelques microsecondes. Hors de la table (ou pour un âge, une inclinaison qui la font sortir), la prise
//     est recalculée sur le squelette du moteur et gardée en cache. Les surcharges de l'appel (option doigts)
//     sont respectées : un angle qui diffère de poses.json n'est pas touché.
//
// ═══ LE SOLVEUR ════════════════════════════════════════════════════════════════════════════════════════════
//
// Les obstacles sont des fonctions de distance signée (sdf) dans le repère de la main (celui du moteur : x vers
// les doigts, y vers l'auriculaire, z vers la paume, mm d'homme) : le cylindre (manche, corde, fil, bouteille),
// le plan (la surface où la main se pose), la paume (les bosses du moteur), les autres doigts (capsules). Une
// phalange touche quand la distance de son axe à l'obstacle égale sa demi-épaisseur DANS LA DIRECTION de
// l'obstacle (les quatre demi-axes du moteur : radial, ulnaire, dorsal, palmaire).
//
//   fermer        la main se referme articulation par articulation, de la base vers le bout : chacune plie
//                 jusqu'à ce que SA phalange touche, ou jusqu'à sa butée. Si seul le bout de la phalange touche,
//                 elle s'arrête là où la phalange prolongée tout droit touche : la suivante continue dans son
//                 alignement et touche à son tour. Un doigt entoure ainsi un manche au lieu de le piquer.
//   le pouce      on essaie des oppositions et des écarts (cmc), on referme mcp et ip, on garde celui qui fait le
//                 plus grand tour de l'objet en finissant posé (sur l'objet, ou sur l'index et le majeur).
//   la pince      l'index et le pouce sont cherchés ensemble : la pulpe du pouce à l'épaisseur de l'objet de
//                 celle de l'index, les deux pulpes face à face, sans que rien ne s'interpénètre.
//   le plat       chaque doigt plie au MCP jusqu'à poser sa pulpe sur le plan de la paume : la ligne de contact
//                 est droite (contact.plan : le moteur peut y aplatir la silhouette).
//
// ═══ LES PRISES (PRISES, et les poses de poses.json qui les appellent) ════════════════════════════════════
//
//   entourer   { diametre, inclinaison (° : l'axe en biais dans la paume), decollement (mm : l'objet tenu loin
//              de la paume, la main en C), pouce: 'enroule' | 'long' | 'libre' }
//   poing · pointe { tendus: ['index'…], appui } · pincer { sorte: fine | pointe | ouverte | laterale, diametre }
//   crochet { diametre, mcp } · coiffe { diametre } · plat { } · fixe (des angles donnés, rien à résoudre)
//
// ═══ LES COUCHES ══════════════════════════════════════════════════════════════════════════════════════════
//
// Le moteur décide lui-même, par la profondeur, ce qui passe devant l'objet. couches(pose, vue, outils) refait
// ce calcul de façon indépendante (par phalange, sur les axes 3D) : il sert à vérifier le moteur, et à écrire
// "devant" dans poses.json là où une vue est piégeuse. Règle de vérification qui ne doit jamais tomber : dans
// une prise, l'objet n'est jamais derrière TOUTE la main dans une vue où des doigts l'entourent (vue paume :
// les phalanges du milieu et du bout devant, la paume derrière ; vue dos : la main devant, l'objet sort des
// deux côtés du poing).
//
// ═══ DEUX MAINS ═══════════════════════════════════════════════════════════════════════════════════════════
//
//   deuxMains(mainSimple, { manche: { x0, y0, x1, y1, r }, mains: [{ t, vue, cote, pose, … }, …], objet })
//     deux mains sur un même manche : chacune posée à sa fraction t du manche, l'axe de sa prise sur l'axe du
//     manche ; l'objet peint une fois, entre les pièces de derrière et celles de devant des deux mains.
//   mainSurMain(mainSimple, { x, y, angle, echelle, cote, croise, decalage }) : deux mains à plat l'une sur
//     l'autre, vues du dessus ; celle du dessous en gris (loin), celle du dessus devant.
//
// Ligne de commande : node prises.js --ecrire  (recalcule mains/poses.json sur le squelette du moteur)
//                     node prises.js --voir id (la pose résolue, en JSON)

'use strict';

const fs = require('fs');
const path = require('path');

const RAD = Math.PI / 180;
const DOIGTS = ['index', 'majeur', 'annulaire', 'auriculaire'];

// ─── vecteurs 3D ────────────────────────────────────────────────────────────────────────────────────────
const A3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const S3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const M3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const D3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const X3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const L3 = a => Math.hypot(a[0], a[1], a[2]);
const U3 = a => { const l = L3(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const I3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const borne = (v, a, b) => Math.max(a, Math.min(b, v));
function rot3(v, k, deg) {
  const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD), kv = D3(k, v), kx = X3(k, v);
  return [v[0] * c + kx[0] * s + k[0] * kv * (1 - c), v[1] * c + kx[1] * s + k[1] * kv * (1 - c), v[2] * c + kx[2] * s + k[2] * kv * (1 - c)];
}
const orth = (v, u) => U3(S3(v, M3(u, D3(v, u))));
function procheSeg(p, a, b) {
  const ab = S3(b, a), l2 = D3(ab, ab) || 1e-9, t = borne(D3(S3(p, a), ab) / l2, 0, 1);
  return { t, q: A3(a, M3(ab, t)) };
}
const r1 = v => Math.round(v * 10) / 10;
const r1v = v => v.map(r1);

// ─── le squelette du moteur ─────────────────────────────────────────────────────────────────────────────
// Les doigts sont recalculés ici avec la même formule que moteur.js (le MCP, la direction de base, puis pour
// chaque phalange : axe de flexion a = n × u, rotation de u et n autour de a) : c'est ce qui rend le solveur
// rapide. Le cadre de départ vient du moteur lui-même, et le résultat est contrôlé contre lui (verifier).
// Le pouce, lui, passe toujours par le moteur : sa cinématique est la sienne.
function preparer(outils, o = {}) {
  const sqf = (p, oo) => outils.squelette(p, Object.assign({}, o.age ? { age: o.age } : {}, oo || {}));
  const base = sqf({ doigts: {} });
  const F = base.F || outils.formes;
  const kW = (base.age && base.age.kW) || 1;
  const demi = (id, t) => outils.demiAxes(F, id, t, kW);              // [radial, ulnaire, dorsal, palmaire]
  const doigts = {};
  for (const d of DOIGTS) {
    const S = base.segments[d + '.p1'];
    doigts[d] = { mcp: S.de.slice(), u0: S.u.slice(), n0: S.n.slice(), L: base.an.doigts[d].L.slice(), s: (d === 'index' || d === 'majeur') ? 1 : -1 };
  }
  // les demi-axes de chaque segment, échantillonnés (t = 0, ½, 1)
  const ray = {};
  for (const d of [...DOIGTS, 'pouce']) for (const k of (d === 'pouce' ? ['meta', 'p1', 'p2'] : ['p1', 'p2', 'p3'])) {
    const id = `${d}.${k}`;
    ray[id] = [0, 0.5, 1].map(t => demi(id, t));
  }
  const S = { sqf, base, F, kW, demi, doigts, ray, an: base.an, age: o.age || 'homme', cachePouce: new Map() };
  S.paume = paumeObstacle(S);
  return S;
}
// la chaîne d'un doigt : 4 points (MCP, IPP, IPD, centre du bout) et les cadres des 3 phalanges
function chaineDoigt(S, d, q) {
  const D = S.doigts[d], Q = Object.assign({ ecart: 0, mcp: 0, ipp: 0, ipd: 0 }, q || {});
  let n = D.n0.slice(), u = rot3(D.u0, [0, 0, -1], D.s * (Q.ecart || 0));
  const P = [D.mcp.slice()], cadres = [];
  const fl = [Q.mcp, Q.ipp, Q.ipd];
  for (let k = 0; k < 3; k++) {
    const a = U3(X3(n, u));
    u = rot3(u, a, fl[k]); n = rot3(n, a, fl[k]);
    P.push(A3(P[k], M3(u, D.L[k])));
    cadres.push({ u, n: orth(n, u), r: X3(orth(n, u), u) });
  }
  return { P, cadres };
}
// le pouce : le métacarpien par le moteur (sa cinématique est la sienne : opposition, cmc, rotation), mémoïsé ;
// les deux phalanges par la même formule que les doigts (contrôlée contre le moteur, voir verifier)
function chainePouce(S, q) {
  const Q = Object.assign({ opposition: 0, cmc: 0, mcp: 0, ip: 0 }, q || {});
  const cle = ['opposition', 'cmc', 'rotation'].map(k => Q[k] === undefined ? '' : Math.round(Q[k] * 20)).join(',');
  let m = S.cachePouce.get(cle);
  if (!m) {
    const base = { opposition: Q.opposition, cmc: Q.cmc, mcp: 0, ip: 0 };
    if (Q.rotation !== undefined) base.rotation = Q.rotation;
    const sq = S.sqf({ doigts: { pouce: base } });
    const g = sq.segments['pouce.meta'];
    m = { cmc: sq.points['pouce.cmc'], mcp: sq.points['pouce.mcp'], u: g.u, n: g.n, r: g.r, L: [l3(sq.segments['pouce.p1']), l3(sq.segments['pouce.p2'])] };
    if (S.cachePouce.size > 50000) S.cachePouce.clear();
    S.cachePouce.set(cle, m);
  }
  const P = [m.cmc, m.mcp], cadres = [{ u: m.u, n: m.n, r: m.r }];
  let u = m.u, n = m.n;
  const fl = [Q.mcp, Q.ip];
  for (let k = 0; k < 2; k++) {
    const a = U3(X3(n, u));
    u = rot3(u, a, fl[k]); n = rot3(n, a, fl[k]);
    P.push(A3(P[k + 1], M3(u, m.L[k])));
    cadres.push({ u, n: orth(n, u), r: X3(orth(n, u), u) });
  }
  return { P, cadres };
}
const l3 = g => g.L !== undefined ? g.L : L3(S3(g.a, g.de));
// les segments (capsules à section elliptique) d'une chaîne
function segments(S, d, ch) {
  const ids = d === 'pouce' ? ['meta', 'p1', 'p2'] : ['p1', 'p2', 'p3'];
  return ids.map((k, i) => ({ id: `${d}.${k}`, doigt: d, a: ch.P[i], b: ch.P[i + 1], c: ch.cadres[i], ray: S.ray[`${d}.${k}`], bout: i === 2 }));
}
// la demi-épaisseur d'un segment en t, dans la direction v (perpendiculaire à l'axe)
function rayonVers(seg, t, v) {
  const R = seg.ray, k = t <= 0.5 ? t / 0.5 : (t - 0.5) / 0.5, A = t <= 0.5 ? R[0] : R[1], B = t <= 0.5 ? R[1] : R[2];
  const h = [0, 1, 2, 3].map(i => A[i] + (B[i] - A[i]) * k);       // radial, ulnaire, dorsal, palmaire
  const vr = D3(v, seg.c.r), vn = D3(v, seg.c.n);
  const a = vr >= 0 ? h[0] : h[1], b = vn >= 0 ? h[2] : h[3];
  const l = Math.hypot(vr, vn) || 1, cr = vr / l, cn = vn / l;
  return 1 / Math.sqrt((cr / a) * (cr / a) + (cn / b) * (cn / b));
}

// ─── les obstacles : distance signée et gradient ────────────────────────────────────────────────────────
const OBST = {
  cylindre(C, u, R, demi = Infinity) {
    u = U3(u);
    return { type: 'cylindre', C, u, R, demi,
      sdf(p) {
        const v = S3(p, C), t = D3(v, u), rad = L3(S3(v, M3(u, t))) - R;
        if (!isFinite(demi)) return rad;
        const ax = Math.abs(t) - demi;
        return Math.min(Math.max(rad, ax), 0) + Math.hypot(Math.max(rad, 0), Math.max(ax, 0));
      },
      grad(p) {
        const v = S3(p, C), t = D3(v, u), w = S3(v, M3(u, t));
        if (isFinite(demi) && Math.abs(t) > demi && L3(w) < R) return M3(u, Math.sign(t));
        return U3(w);
      } };
  },
  plan(P0, n) { n = U3(n); return { type: 'plan', P0, n, sdf: p => D3(S3(p, P0), n), grad: () => n }; },
  capsule(a, b, r, nom) {
    return { type: 'capsule', a, b, r, nom, sdf: p => L3(S3(p, procheSeg(p, a, b).q)) - r, grad: p => U3(S3(p, procheSeg(p, a, b).q)) };
  },
  // un ellipsoïde aux demi-axes différents de part et d'autre (approximation de distance d'Inigo Quilez)
  bosse(c, h, nom) {
    const ax = q => [h[0], q[1] < 0 ? h[1] : h[2], q[2] < 0 ? h[3] : h[4]];
    return { type: 'bosse', c, h, nom,
      sdf(p) {
        const q = S3(p, c), r = ax(q);
        const k0 = Math.hypot(q[0] / r[0], q[1] / r[1], q[2] / r[2]), k1 = Math.hypot(q[0] / (r[0] * r[0]), q[1] / (r[1] * r[1]), q[2] / (r[2] * r[2]));
        return k1 < 1e-9 ? -Math.min(...r) : k0 * (k0 - 1) / k1;
      },
      grad(p) { const q = S3(p, c), r = ax(q); return U3([q[0] / (r[0] * r[0]), q[1] / (r[1] * r[1]), q[2] / (r[2] * r[2])]); } };
  },
  union(obs, type = 'union') {
    // une borne basse par pièce (la distance au centre moins le plus grand demi-axe) évite les calculs inutiles
    const bornes = obs.map(o => o.type === 'bosse' ? { c: o.c, r: Math.max(...o.h) } : null);
    const loin = (i, p, m) => { const b = bornes[i]; return b && L3(S3(p, b.c)) - b.r > m; };
    return { type, obs,
      sdf: p => { let m = Infinity; for (let i = 0; i < obs.length; i++) { if (loin(i, p, m)) continue; const v = obs[i].sdf(p); if (v < m) m = v; } return m; },
      grad: p => { let m = Infinity, g = [0, 0, 1]; for (let i = 0; i < obs.length; i++) { if (loin(i, p, m)) continue; const v = obs[i].sdf(p); if (v < m) { m = v; g = obs[i].grad(p); } } return g; } };
  },
};
// la paume du moteur : ses bosses (carpe, hypothénar, thénar), les têtes et les fûts des métacarpiens
function paumeObstacle(S) {
  let FM = {};
  try { FM = require('./moteur').FORMES || {}; } catch (e) { /* le moteur absent : la paume seule */ }
  const F = Object.assign({}, FM, S.F || {}), an = S.an, kW = S.kW;
  const obs = [];
  for (const b of F.paume || []) obs.push(OBST.bosse(b.c, b.h.map(v => v * kW), b.nom));
  for (const d of DOIGTS) {
    const A = an.doigts[d], th = (F.tete || {})[d], fu = F.fut;
    if (th) obs.push(OBST.bosse(A.mcp, th.map(v => v * kW), d + '.tete'));
    if (fu) for (const t of [0.3, 0.55, 0.8]) obs.push(OBST.bosse(I3(A.cmc, A.mcp, t), fu.map(v => v * kW), d + '.fut'));
  }
  // le moteur fait l'enveloppe CONVEXE des bosses : on la suit par des bosses intermédiaires entre les
  // grandes (le creux entre thénar et hypothénar est plein)
  const parNom = Object.fromEntries(obs.map(b => [b.nom, b]));
  const paires = [['thenar', 'hypothenar'], ['thenar', 'index.tete'], ['thenar', 'majeur.tete'], ['thenar', 'annulaire.tete'],
    ['hypothenar', 'majeur.tete'], ['hypothenar', 'annulaire.tete'], ['hypothenar', 'auriculaire.tete'], ['carpe', 'thenar'], ['carpe', 'hypothenar']];
  for (const [a, b] of paires) {
    const A = parNom[a], B = parNom[b];
    if (!A || !B) continue;
    for (const t of [0.25, 0.5, 0.75]) obs.push(OBST.bosse(I3(A.c, B.c, t), A.h.map((v, i) => v + (B.h[i] - v) * t), `${a}~${b}`));
  }
  if (!obs.length) obs.push(OBST.bosse([45, 2, 2], [45, 36, 40, 10, 14], 'paume'));
  return OBST.union(obs, 'paume');
}
// l'écart d'un segment à un obstacle : min sur l'axe de (distance − demi-épaisseur vers l'obstacle)
function ecart(seg, ob, n = 8) {
  let m = Infinity, ou = null, tm = 0;
  const L = L3(S3(seg.b, seg.a)), u = U3(S3(seg.b, seg.a));
  const ext = seg.bout ? 1 + (rayonVers(seg, 1, seg.c.r) * 0.6) / Math.max(L, 1) : 1;   // l'arrondi du bout
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * ext, p = A3(seg.a, M3(u, t * L));
    const s = ob.sdf(p);
    if (s > m + 25) continue;
    let g = ob.grad(p);
    let v = M3(g, -1); v = S3(v, M3(u, D3(v, u)));
    const lv = L3(v);
    let rho;
    if (lv < 0.2) rho = Math.min(...seg.ray[2].slice(0, 2)) * 0.9;     // l'obstacle dans l'axe : l'arrondi du bout
    else rho = rayonVers(seg, Math.min(1, t), M3(v, 1 / lv));
    const gap = s - rho;
    if (gap < m) { m = gap; ou = p; tm = t; }
  }
  return { g: m, p: ou, t: tm };
}
const ecartMin = (segs, ob) => Math.min(...segs.map(s => ecart(s, ob).g));
const obstSegments = segs => segs.map(s => {
  const rm = (s.ray[1][0] + s.ray[1][1] + s.ray[1][2] + s.ray[1][3]) / 4;
  return OBST.capsule(s.a, s.b, rm, s.id);
});

// ─── la fermeture jusqu'au contact ──────────────────────────────────────────────────────────────────────
//   segs(q) → les 3 segments ; cles : les articulations dans l'ordre (le segment i est porté par cles[i])
//   lies : { ipd: { de: 'ipp', k: 0.67, tol: 15 } } — l'IPD suit l'IPP (proportions.json : « l'IPD ne plie pas
//          seule ») : pendant que l'IPP plie, l'IPD est à k × IPP et sa phalange compte ; puis l'IPD ne bouge
//          qu'à ± tol de k × IPP
function fermer({ segs, q0, cles, limites, obst, pas = 2, tol = 0.05, actives, lies = {} }) {
  const q = Object.assign({}, q0);
  const contacts = [];
  const touche = (seg, i) => {
    let pire = null;
    for (const ob of obst(i)) { const e = ecart(seg, ob); if (e.g < -tol && (!pire || e.g < pire.e.g)) pire = { ob, e }; }
    return pire;
  };
  const prolonge = (ss, i) => {
    let reste = 0; for (let j = i + 1; j < ss.length; j++) reste += L3(S3(ss[j].b, ss[j].a));
    const s = ss[i], u = U3(S3(s.b, s.a));
    return Object.assign({}, s, { b: A3(s.b, M3(u, reste)), bout: true, ray: [s.ray[0], s.ray[2], ss[ss.length - 1].ray[2]] });
  };
  cles.forEach((k, i) => {
    if (actives && !actives.includes(k)) return;
    // les bornes : celles de l'articulation, resserrées si elle suit une autre
    let bas = limites[k][0], lim = limites[k][1];
    if (lies[k]) { const L = lies[k], c = L.k * q[L.de]; bas = Math.max(bas, c - L.tol); lim = Math.min(lim, c + L.tol); if (q[k] < bas) q[k] = bas; if (q[k] > lim) q[k] = lim; }
    // une articulation qui en entraîne une autre (l'IPP et l'IPD)
    const suiveur = Object.keys(lies).find(j => lies[j].de === k && cles.includes(j));
    const iS = suiveur ? cles.indexOf(suiveur) : -1;
    const avec = th => {
      const qq = Object.assign({}, q, { [k]: th });
      if (suiveur) qq[suiveur] = borne(lies[suiveur].k * th, limites[suiveur][0], limites[suiveur][1]);
      return qq;
    };
    const segDe = (th, long) => { const ss = segs(avec(th)); return long ? prolonge(ss, i) : ss[i]; };
    const toucheTout = (th, long) => {
      const c = touche(segDe(th, long), i);
      if (c || iS < 0) return c;
      return touche(segs(avec(th))[iS], iS);
    };
    if (toucheTout(q[k], false)) {                      // un départ en contact : on ouvre d'abord
      for (let th = q[k] - pas; th >= bas - 1e-9; th -= pas) if (!toucheTout(th, false)) { q[k] = th; break; }
    }
    const balaie = long => {
      let th = q[k];
      const c0 = toucheTout(th, long);
      if (c0) return { th, c: c0 };
      while (th < lim) {
        const t1 = Math.min(lim, th + pas), c = toucheTout(t1, long);
        if (c) {
          let lo = th, hi = t1;
          for (let b = 0; b < 12; b++) { const m = (lo + hi) / 2; if (toucheTout(m, long)) hi = m; else lo = m; }
          return { th: lo, c: toucheTout(hi, long) };
        }
        th = t1;
      }
      return { th: lim, c: null };
    };
    let r = balaie(false);
    if (r.c && r.c.e.t > 0.97 && i < cles.length - 1) {  // seul le bout touche : on s'arrête au prolongement
      const r2 = balaie(true);
      if (r2.th < r.th) r = r2;
    }
    if (r.c) contacts.push({ segment: i, obstacle: r.c.ob.type, point: r.c.e.p });
    q[k] = r.th;
    if (suiveur) q[suiveur] = borne(lies[suiveur].k * r.th, limites[suiveur][0], limites[suiveur][1]);
  });
  return { q, contacts };
}
const LIM = { mcp: [-30, 90], ipp: [-5, 108], ipd: [-10, 80] };      // proportions.json, articulations
const LIM_POUCE = { mcp: [-20, 70], ip: [-25, 85] };
function fermerDoigt(S, d, obstacles, o = {}) {
  const q0 = Object.assign({ ecart: 0, mcp: 0, ipp: 0, ipd: 0 }, o.depart || {});
  return fermer({
    segs: q => segments(S, d, chaineDoigt(S, d, q)),
    q0, cles: ['mcp', 'ipp', 'ipd'], limites: Object.assign({}, LIM, o.limites || {}), actives: o.actives,
    lies: o.libre ? {} : { ipd: { de: 'ipp', k: 0.67, tol: 15 } },
    obst: i => (i === 0 ? obstacles : [...obstacles, S.paume]),
  });
}
// le pouce, opposition / cmc / rotation fixés, referme mcp et ip
function fermerPouce(S, obstacles, base, o = {}) {
  const q0 = Object.assign({ mcp: -12, ip: -15 }, base);
  const segs = q => segments(S, 'pouce', chainePouce(S, q)).slice(1);   // p1, p2 (meta : la paume)
  // la paume ne compte que pour la dernière phalange : la base de la première est dans le thénar
  const sansPaume = obstacles.filter(ob => ob !== S.paume);
  return fermer({ segs, q0, cles: ['mcp', 'ip'], limites: Object.assign({}, LIM_POUCE, o.limites || {}), obst: i => (i === 0 ? sansPaume : obstacles) });
}

// ─── outils de prise ────────────────────────────────────────────────────────────────────────────────────
// la pulpe : le point de la peau côté paume, sa normale, au fil t du dernier segment
function pulpe(S, d, q, t = 0.7) {
  const ch = d === 'pouce' ? chainePouce(S, q) : chaineDoigt(S, d, q);
  const sg = segments(S, d, ch)[2];
  const u = U3(S3(sg.b, sg.a)), n = M3(sg.c.n, -1);
  const c = I3(sg.a, sg.b, t);
  return { c, n, d: u, p: A3(c, M3(n, rayonVers(sg, t, n))), r: rayonVers(sg, t, n), seg: sg, ch };
}
// recherche par motifs : coordonnée par coordonnée, le pas divisé par deux quand plus rien ne gagne
function cherche(f, x0, pas, bornes, { min = 0.4, iter = 250 } = {}) {
  let x = x0.map((v, i) => borne(v, bornes[i][0], bornes[i][1])), fx = f(x), p = pas.slice();
  for (let it = 0; it < iter; it++) {
    let mieux = false;
    for (let i = 0; i < x.length; i++) for (const s of [1, -1]) {
      const y = x.slice(); y[i] = borne(y[i] + s * p[i], bornes[i][0], bornes[i][1]);
      if (y[i] === x[i]) continue;
      const fy = f(y);
      if (fy < fx - 1e-9) { x = y; fx = fy; mieux = true; break; }
    }
    if (!mieux) { p = p.map(v => v / 2); if (p.every(v => v < min)) break; }
  }
  return { x, f: fx };
}
const pli = (mcp, ipp, ipd, ecart = 0) => ({ ecart, mcp, ipp, ipd });
const segsDoigts = (S, doigts, noms = DOIGTS) => noms.flatMap(d => segments(S, d, chaineDoigt(S, d, doigts[d])));
const qPouce = x => ({ opposition: x[0], cmc: x[1], rotation: x[2], mcp: x[3], ip: x[4] });
const BORNES_POUCE = [[-10, 100], [-30, 45], [-40, 170], [-20, 70], [-25, 85]];

// le pouce qui s'enroule autour d'un cylindre : grille grossière d'opposition et d'écart (cmc), fermeture de
// mcp et ip, puis affinage ; on garde le plus grand tour de l'objet, le bout posé
function pouceEnroule(S, cyl, segsD, o = {}) {
  const u = cyl.u, e1 = orth([0, 0, -1], u), e2 = X3(u, e1);
  const ang = p => { const v = S3(p, cyl.C); return Math.atan2(D3(v, e2), D3(v, e1)) / RAD; };
  const tour = (a, b) => { let w = ang(b) - ang(a); while (w < -180) w += 360; while (w > 180) w -= 360; return w; };
  // le sens des doigts autour de l'objet : le pouce tourne dans l'autre sens
  const ix = segsD.filter(s => s.doigt === 'majeur');
  const sensDoigts = ix.length ? Math.sign(tour(ix[0].a, ix[2].b)) || 1 : 1;
  const obst = [cyl, ...obstSegments(segsD.filter(s => ['index', 'majeur', 'annulaire'].includes(s.doigt))), S.paume];
  const meta = q => segments(S, 'pouce', chainePouce(S, q))[0];
  const note = (opp, cmc, rot) => {
    const base = { opposition: opp, cmc, rotation: rot };
    if (ecart(meta(base), cyl).g < -2.5) return { score: -1e9 };           // le métacarpien dans l'objet
    const r = fermerPouce(S, obst, base);
    const ch = chainePouce(S, r.q);
    const w = -sensDoigts * tour(ch.P[1], ch.P[3]);
    const bout = r.contacts.some(c => c.segment === 1);
    const ss = segments(S, 'pouce', ch);
    const g = ecart(ss[2], cyl).g;
    // rien ne doit entrer dans l'objet ni dans les doigts
    let pen = Math.max(0, -ecart(ss[1], cyl).g) + Math.max(0, -g);
    for (const ob of obst.slice(1, -1)) pen += Math.max(0, -ecart(ss[1], ob).g - 1) + Math.max(0, -ecart(ss[2], ob).g - 1);
    if (pen > 1.5) return { score: -1e6 - pen };
    const score = w + (bout ? 30 : 0) - 1.5 * Math.max(0, g - 2) - 2 * Math.max(0, r.q.ip - 70) - 1.5 * Math.max(0, -r.q.mcp - 5) - 0.05 * Math.abs(rot - 0.3 * opp);
    return { score, q: r.q, w, bout };
  };
  let best = { score: -Infinity };
  for (let opp = 10; opp <= 100; opp += 18) for (let cmc = -20; cmc <= 40; cmc += 20) for (const rot of [0, 40, 80, 120, 160]) {
    const r = note(opp, cmc, rot);
    if (r.score > best.score) best = r;
  }
  if (!best.q) return { opposition: 40, cmc: 10, mcp: 20, ip: 20 };
  const f = x => -note(x[0], x[1], x[2]).score;
  const r = cherche(f, [best.q.opposition, best.q.cmc, best.q.rotation], [8, 8, 16], [[0, 100], [-30, 45], [-40, 170]], { min: 1.5, iter: 30 });
  const fin = note(r.x[0], r.x[1], r.x[2]);
  return fin.score >= best.score ? fin.q : best.q;
}
// le pouce qui referme une prise : sa pulpe sur la face extérieure de la phalange du milieu de l'index (le
// marteau : le pouce passe par-dessus le manche et vient s'appuyer sur l'index) ; si l'index est trop loin
// (gros objet), sa pulpe sur l'objet, du côté loin de la paume, le plus loin qu'il atteint
function pouceAutour(S, cyl, segsD, o = {}) {
  const obst = [cyl, ...obstSegments(segsD.filter(s => ['index', 'majeur'].includes(s.doigt)))];
  const p2 = segsD.find(s => s.id === 'index.p2');
  const vers = (t, k) => {
    const P = I3(p2.a, p2.b, t);
    const w = S3(P, cyl.C), ax = M3(cyl.u, D3(w, cyl.u)), out = U3(S3(w, ax));          // loin de l'axe
    const side = U3(M3(cyl.u, -1));                                                    // vers le pouce
    const n = U3(A3(M3(out, 1 - k), M3(side, k)));
    return { G: A3(P, M3(n, rayonVers(p2, t, n) + 0.3)), n: M3(n, -1) };
  };
  let best = null;
  for (const [t, k] of [[0.55, 0.35], [0.4, 0.45], [0.7, 0.3]]) {
    const v = vers(t, k);
    const r = pouceVers(S, v.G, v.n, obst, { pref: { mcp: 30, ip: 25 } });
    if (!best || r.erreur < best.erreur) best = r;
  }
  if (best.erreur < 6) return best;
  // trop loin : la pulpe sur l'objet, côté loin de la paume, du côté du pouce
  const yb = -38, tC = (yb - cyl.C[1]) / (cyl.u[1] || 1), Cy = A3(cyl.C, M3(cyl.u, tC));
  let meilleur = null;
  for (const a of [20, 45, 70, 95]) {
    const n = U3(rot3(orth([0, 0, 1], cyl.u), cyl.u, -a * Math.sign(cyl.u[1] || 1)));
    const G = A3(Cy, M3(n, cyl.R + 9.5));
    const r = pouceVers(S, G, M3(n, -1), obst, { pref: { mcp: 25, ip: 20 } });
    const sc = r.erreur - a * 0.08;
    if (!meilleur || sc < meilleur.sc) meilleur = Object.assign(r, { sc });
  }
  return meilleur;
}
// le pouce de la prise de force : ses deux phalanges épousent le manche (elles le touchent sans y entrer), son
// bout vient vers la phalange du milieu de l'index, posé dessus s'il l'atteint
function pouceManche(S, cyl, segsD, o = {}) {
  const obstD = obstSegments(segsD.filter(s => ['index', 'majeur', 'annulaire'].includes(s.doigt)));
  const ip2 = segsD.find(s => s.id === 'index.p2'), ip3 = segsD.find(s => s.id === 'index.p3');
  const cible = I3(ip2.a, ip2.b, 0.6);
  const f = x => {
    const q = qPouce(x), ch = chainePouce(S, q), ss = segments(S, 'pouce', ch);
    const g0 = ecart(ss[0], cyl).g, g1 = ecart(ss[1], cyl).g, g2 = ecart(ss[2], cyl).g;
    let pen = Math.max(0, -g0 - 1.5) + Math.max(0, -g1) + Math.max(0, -g2);
    let gd = Infinity;
    for (const ob of obstD) for (let i = 1; i < 3; i++) { const g = ecart(ss[i], ob).g; pen += Math.max(0, -g - 0.5); if (i === 2) gd = Math.min(gd, g); }
    const pp = pulpe(S, 'pouce', q, 0.75);
    const dt = L3(S3(pp.p, cible));
    return 400 * pen * pen + 1 * Math.max(0, g1) ** 2 + 1.5 * Math.max(0, g2) ** 2 + 0.8 * dt * dt + 2 * Math.max(0, gd) ** 2 * (dt < 25 ? 1 : 0) +
      0.01 * (x[2] - 0.3 * x[0]) ** 2 + 0.02 * Math.max(0, x[4] - 60) ** 2 + 0.02 * Math.max(0, x[3] - 50) ** 2;
  };
  let best = null;
  for (const x0 of [[30, 0, 9, 20, 20], [50, 10, 15, 30, 30], [20, -15, 6, 10, 40], [65, 20, 20, 25, 25], [40, -10, 40, 30, 20]]) {
    const r = cherche(f, x0, [12, 10, 15, 12, 12], BORNES_POUCE);
    if (!best || r.f < best.f) best = r;
  }
  const q = qPouce(best.x);
  return { q, f: best.f, erreur: L3(S3(pulpe(S, 'pouce', q, 0.75).p, cible)) };
}
// le pouce dont la pulpe vient en G, tournée vers nG (la normale de la pulpe pointe vers la surface touchée)
function pouceVers(S, G, nG, obstacles, o = {}) {
  const t = o.t || 0.7, pref = o.pref || { mcp: 20, ip: 15 };
  const f = x => {
    const q = qPouce(x), pp = pulpe(S, 'pouce', q, t);
    const err = L3(S3(pp.p, G)), face = 1 - D3(pp.n, nG);
    let pen = 0;
    const ss = segments(S, 'pouce', pp.ch);
    for (const ob of obstacles) for (let i = (ob.type === 'cylindre' ? 0 : 1); i < 3; i++) { const g = ecart(ss[i], ob).g; if (g < -0.3) pen += -g; }
    return err * err + 150 * face * face + 40 * pen + 0.004 * ((x[3] - pref.mcp) ** 2 + (x[4] - pref.ip) ** 2) + 0.004 * (x[2] - 0.3 * x[0]) ** 2;
  };
  let best = null;
  for (const x0 of o.departs || [[40, 10, 12, 20, 20], [70, 20, 21, 25, 25], [55, 0, 16, 10, 35], [85, 30, 25, 30, 20]]) {
    const r = cherche(f, x0, [10, 8, 10, 10, 10], BORNES_POUCE);
    if (!best || r.f < best.f) best = r;
  }
  const q = qPouce(best.x);
  return { q, erreur: L3(S3(pulpe(S, 'pouce', q, t).p, G)) };
}
// le pouce posé sur la face extérieure de phalanges repliées (le poing, la pointe)
function pouceSurPhalanges(S, segsD, noms, o = {}) {
  const ss = noms.map(n => segsD.find(s => s.id === n));
  const mid = ss.map(s => I3(s.a, s.b, o.t || 0.5)).reduce((a, b) => A3(a, M3(b, 1 / ss.length)), [0, 0, 0]);
  const centre = [50, mid[1], 0];
  const out = orth(U3(S3(mid, centre)), U3(S3(ss[0].b, ss[0].a)));
  const r = rayonVers(ss[0], 0.5, out);
  const G = A3(mid, M3(out, r + 0.4));
  return pouceVers(S, G, M3(out, -1), obstSegments(segsD), { pref: { mcp: 35, ip: 25 } });
}

// ─── les prises ─────────────────────────────────────────────────────────────────────────────────────────
// Chacune rend { doigts, objet (le format du moteur : type, diametre, centre, axe, longueur), contact, … }.
const peau = S => {                                   // la peau de la paume sous le majeur, en z
  const p = S.paume; let z = 0;
  for (let k = 0; k < 60; k++) { if (p.sdf([62, 0, z]) > 0) break; z += 0.5; }
  return z;
};
// la peau de la paume en (x, y) : la hauteur z où l'on sort de la paume côté paume
function peauEn(S, x, y) {
  let z = -5;
  while (z < 45 && S.paume.sdf([x, y, z]) <= 0) z += 0.5;
  return z;
}
const PRISES = {
  // entourer un cylindre de diamètre d (voir l'en-tête). L'axe est posé contre la paume (decollement : plus
  // loin, la main en C) ; sa place le long de la paume est CHERCHÉE : celle où le plus de phalanges touchent.
  entourer(S, o) {
    const d = o.diametre || 32, R = d / 2, dec = o.decollement || 0;
    const be = (o.inclinaison !== undefined ? o.inclinaison : 25) * RAD;
    const u = U3([-Math.sin(be), Math.cos(be), o.pente || 0]);
    const xm = S.an.doigts.majeur.mcp[0];
    const essai = x => {
      const H = [x, 0, Math.max(peauEn(S, x, 0), peauEn(S, x - 0.27 * 20, 20), peauEn(S, x + 0.27 * 20, -20)) + R + dec];
      const cyl = OBST.cylindre(H, u, R);
      const doigts = {};
      let touche = 0, bouts = 0;
      for (const n of DOIGTS) {
        const r = fermerDoigt(S, n, [cyl], { depart: { ecart: (o.ecarts || {})[n] || 0 } });
        doigts[n] = r.q;
        const ss = segments(S, n, chaineDoigt(S, n, r.q));
        for (const sg of ss) if (ecart(sg, cyl).g < 0.8) touche++;
        // le bout qui part dans le vide, loin de l'objet et de la paume : mauvais signe
        bouts += Math.min(ecart(ss[2], cyl).g, ecart(ss[2], S.paume).g) > 6 ? 1 : 0;
      }
      return { H, cyl, doigts, score: touche - 1.5 * bouts - 0.02 * Math.abs(x - (xm - 14 - 0.15 * R)) };
    };
    let best = null;
    if (o.position !== undefined) best = essai(o.position);
    else for (let x = xm - 36; x <= xm + 4; x += 4) { const r = essai(x); if (!best || r.score > best.score) best = r; }
    const { H, cyl, doigts } = best;
    const segsD = segsDoigts(S, doigts);
    if (o.pouce === 'long') doigts.pouce = pouceLong(S, cyl, segsD);
    else if (o.pouce === 'libre') doigts.pouce = { opposition: 15, cmc: -5, rotation: 4, mcp: 10, ip: 10 };
    else if (o.pouce === 'tour') doigts.pouce = pouceEnroule(S, cyl, segsD);
    else if (o.pouce === 'cible') doigts.pouce = pouceAutour(S, cyl, segsD, o).q;
    else doigts.pouce = pouceManche(S, cyl, segsD, o).q;
    const objet = { type: d <= 4 ? 'fil' : 'cylindre', diametre: d, centre: H, axe: u, longueur: o.longueur || 1200 };
    return { doigts, objet };
  },
  // le poing fermé à vide : les doigts jusqu'à la paume, le pouce sur l'index et le majeur
  poing(S, o) {
    const doigts = {};
    for (const n of DOIGTS) doigts[n] = fermerDoigt(S, n, []).q;
    doigts.pouce = pouceSurPhalanges(S, segsDoigts(S, doigts), ['index.p2', 'majeur.p2'], { t: 0.45 }).q;
    return { doigts, objet: null };
  },
  // des doigts tendus (l'index ; l'index et le majeur), les autres repliés ; le pouce sur le premier replié
  pointe(S, o) {
    const tendus = o.tendus || ['index'];
    const doigts = {};
    for (const n of DOIGTS) doigts[n] = tendus.includes(n) ? Object.assign({ ecart: 0, mcp: 0, ipp: 4, ipd: 2 }, (o.tendu || {})[n] || {}) : fermerDoigt(S, n, []).q;
    const replies = DOIGTS.filter(n => !tendus.includes(n));
    const segsR = segsDoigts(S, doigts, replies);
    if (o.pouce === 'ecarte') doigts.pouce = { opposition: 10, cmc: -18, rotation: 3, mcp: 6, ip: 6 };
    else doigts.pouce = pouceSurPhalanges(S, segsR, [replies[0] + '.p2'], { t: 0.5 }).q;
    let contact = null;
    if (o.appui) {
      const pp = pulpe(S, tendus[0], doigts[tendus[0]], 0.8);
      contact = { type: 'point', points: [pp.p], normale: pp.n };
    }
    return { doigts, objet: null, contact };
  },
  // la pince (voir l'en-tête) : l'index et le pouce cherchés ensemble
  pincer(S, o) {
    const sorte = o.sorte || 'fine';
    const POSTURE = { fine: [55, 50, 0.4], pointe: [50, 60, 0.85], ouverte: [30, 26, 0.4], laterale: [55, 72, 0.6] };
    const CASCADE = {
      replies: { majeur: [50, 62, 32], annulaire: [60, 72, 38], auriculaire: [68, 80, 44] },
      ouverts: { majeur: [30, 34, 14], annulaire: [38, 42, 18], auriculaire: [46, 50, 22] },
    };
    const [m0, p0, kd] = o.index || POSTURE[sorte];
    const casc = CASCADE[o.autres || (sorte === 'ouverte' ? 'ouverts' : 'replies')];
    const autres = {};
    for (const n of ['majeur', 'annulaire', 'auriculaire']) autres[n] = pli(...casc[n]);
    const e = sorte === 'ouverte' ? (o.diametre || 40) : (o.diametre !== undefined ? o.diametre : sorte === 'pointe' ? 0.5 : 2);
    const tI = sorte === 'pointe' ? 0.97 : 0.72, tP = sorte === 'pointe' ? 0.97 : 0.7;
    const cibleIndex = qi => {
      if (sorte === 'laterale') {                    // le côté de la phalange du milieu, côté pouce
        const ch = chaineDoigt(S, 'index', qi), sg = segments(S, 'index', ch)[1];
        const n = sg.c.r, c = I3(sg.a, sg.b, 0.6);
        return { I: A3(c, M3(n, rayonVers(sg, 0.6, n))), n };
      }
      const pp = pulpe(S, 'index', qi, tI);
      if (sorte === 'pointe') { const n = U3(A3(pp.n, pp.d)); return { I: A3(pp.c, M3(n, rayonVers(pp.seg, tI, n))), n }; }
      return { I: pp.p, n: pp.n };
    };
    const pulpeT = q => {
      const pp = pulpe(S, 'pouce', q, tP);
      if (sorte === 'pointe') { const n = U3(A3(pp.n, pp.d)); return { P: A3(pp.c, M3(n, rayonVers(pp.seg, tP, n))), n, ch: pp.ch }; }
      return { P: pp.p, n: pp.n, ch: pp.ch };
    };
    const obstA = obstSegments(segsDoigts(S, autres, ['majeur', 'annulaire', 'auriculaire']));
    const f = x => {
      const qi = pli(x[5], x[6], x[6] * kd), qt = qPouce(x);
      const ci = cibleIndex(qi), ct = pulpeT(qt);
      const G = A3(ci.I, M3(ci.n, e));
      const err = L3(S3(ct.P, G)), face = 1 + D3(ct.n, ci.n);
      let pen = 0;
      const sT = segments(S, 'pouce', ct.ch).slice(1), sI = segments(S, 'index', chaineDoigt(S, 'index', qi));
      for (const ob of [...obstA, ...obstSegments(sI)]) for (const s of sT) { const g = ecart(s, ob).g; if (g < -0.3) pen += -g; }
      for (const ob of obstA) for (const s of sI) { const g = ecart(s, ob).g; if (g < -0.3) pen += -g; }
      const hyp = Math.max(0, -5 - x[3]) + Math.max(0, -8 - x[4]);
      return err * err + 250 * face * face + 40 * pen + 0.01 * ((x[5] - m0) ** 2 + (x[6] - p0) ** 2) +
        0.003 * ((x[3] - 10) ** 2 + (x[4] - 12) ** 2) + 2 * hyp * hyp + 0.004 * (x[2] - 0.3 * x[0]) ** 2;
    };
    let best = null;
    for (const x0 of [[60, 10, 18, 10, 15, m0, p0], [80, 20, 24, 20, 10, m0, p0], [45, 0, 14, 5, 25, m0, p0], [70, 25, 21, 30, 30, m0, p0]]) {
      const r = cherche(f, x0, [12, 10, 10, 10, 10, 8, 8], [...BORNES_POUCE, [-10, 90], [0, 105]]);
      if (!best || r.f < best.f) best = r;
    }
    const x = best.x;
    const doigts = Object.assign({ index: pli(x[5], x[6], x[6] * kd) }, autres, { pouce: qPouce(x) });
    const ci = cibleIndex(doigts.index), ct = pulpeT(doigts.pouce);
    const M = I3(ci.I, ct.P, 0.5);
    const sgI = segments(S, 'index', chaineDoigt(S, 'index', doigts.index))[2];
    const w = o.fil === 'travers' ? orth(sgI.c.r, ci.n) : orth(U3(S3(sgI.b, sgI.a)), ci.n);
    const dia = sorte === 'ouverte' ? 6 : Math.max(1.2, e);
    const objet = { type: 'fil', diametre: dia, centre: M, axe: w, longueur: sorte === 'ouverte' ? 60 : 120 };
    return { doigts, objet, contact: { type: 'pince', points: [ci.I, ct.P], normale: ci.n }, erreur: L3(S3(ct.P, A3(ci.I, M3(ci.n, e)))) };
  },
  // le crochet : la paume ouverte, les deux dernières phalanges refermées sur une anse
  crochet(S, o) {
    const d = o.diametre || 20, R = d / 2, mcp = o.mcp !== undefined ? o.mcp : 12;
    const creux = n => {
      const ch = chaineDoigt(S, n, { mcp }), sg = segments(S, n, ch)[0];
      const u = U3(S3(sg.b, sg.a)), np = M3(sg.c.n, -1);
      return A3(A3(sg.b, M3(u, -(R * 0.35 + 4))), M3(np, rayonVers(sg, 1, np) + R + 0.5));
    };
    const a = creux('index'), b = creux('annulaire'), u = U3(S3(b, a));
    const cyl = OBST.cylindre(a, u, R);
    const doigts = {};
    for (const n of DOIGTS) doigts[n] = fermerDoigt(S, n, [cyl], { depart: { mcp }, actives: ['ipp', 'ipd'] }).q;
    doigts.pouce = o.pouceQ || { opposition: 12, cmc: -4, rotation: 4, mcp: 10, ip: 12 };
    return { doigts, objet: { type: 'cylindre', diametre: d, centre: a, axe: u, longueur: o.longueur || 600 } };
  },
  // la paume coiffe le bout d'un bâton debout (l'axe sort de la paume), les doigts autour
  coiffe(S, o) {
    const d = o.diametre || 26, R = d / 2, L = o.longueur || 400;
    const C0 = [o.position || 56, o.y || 0, peau(S)];
    const centre = A3(C0, [0, 0, L / 2]);
    const cyl = OBST.cylindre(centre, [0, 0, 1], R, L / 2);
    const doigts = {};
    for (const n of DOIGTS) doigts[n] = fermerDoigt(S, n, [cyl]).q;
    doigts.pouce = pouceEnroule(S, cyl, segsDoigts(S, doigts));
    return { doigts, objet: { type: 'cylindre', diametre: d, centre, axe: [0, 0, 1], longueur: L },
      contact: { type: 'point', points: [C0], normale: [0, 0, 1] } };
  },
  // à plat : la paume et les pulpes sur le plan de la paume (la surface du côté +z), le pouce le long de
  // l'index et couché sur le plan. o.creux : les doigts en léger creux (porte), o.ecarts : écartés.
  plat(S, o) {
    const z0 = peau(S) + (o.enfonce || 0);
    const plan = OBST.plan([0, 0, z0], [0, 0, -1]);
    const doigts = {};
    const ec = o.ecarts || {};
    for (const n of DOIGTS) {
      const q0 = Object.assign({ ecart: ec[n] || 0, mcp: -10, ipp: 0, ipd: 0 }, (o.depart || {})[n] || {});
      doigts[n] = fermerDoigt(S, n, [plan], { depart: q0, actives: ['mcp'] }).q;
      if (o.creux) Object.assign(doigts[n], { ipp: o.creux, ipd: o.creux * 0.6 });
    }
    // le pouce couché sur le plan, le long de l'index (ou écarté : o.pouceCmc)
    const cmcVise = o.pouceCmc !== undefined ? o.pouceCmc : 8;
    const f = x => {
      const q = { opposition: x[0], cmc: x[1], rotation: x[2], mcp: x[3], ip: 0 };
      const ss = segments(S, 'pouce', chainePouce(S, q));
      const g = Math.min(ecart(ss[1], plan).g, ecart(ss[2], plan).g), g0 = ecart(ss[0], plan).g;
      return g * g * 4 + 30 * Math.max(0, -g0) + 0.05 * (x[1] - cmcVise) ** 2 + 0.01 * x[3] * x[3] + 0.01 * (x[2] - 0.3 * x[0]) ** 2;
    };
    const r = cherche(f, [5, cmcVise, 2, 0], [6, 6, 6, 6], [[-20, 45], [-30, 40], [-30, 40], [-15, 25]]);
    doigts.pouce = { opposition: r.x[0], cmc: r.x[1], rotation: r.x[2], mcp: r.x[3], ip: 0 };
    const pts = DOIGTS.map(n => { const pp = pulpe(S, n, doigts[n], 0.75); return [pp.c[0], pp.c[1], z0]; });
    pts.push([16, -6, z0], [16, 18, z0], [70, -18, z0], [70, 18, z0]);
    return { doigts, objet: o.surface ? { type: 'plan', centre: [90, 0, z0], axe: [0, 0, -1] } : null,
      contact: { type: 'plan', point: [0, 0, z0], normale: [0, 0, 1], points: pts } };
  },
  // des angles donnés tels quels (ouverte, relâchée, coupe…)
  fixe(S, o) { return { doigts: JSON.parse(JSON.stringify(o.doigts)), objet: o.objet || null, contact: o.contact || null }; },
};
// le pouce couché le long du manche, vers son bout côté pouce, la pulpe dessus (prise-pouce-dos)
function pouceLong(S, cyl, segsD) {
  const vise = M3(cyl.u, -1);
  const obstI = obstSegments(segsD.filter(s => s.doigt === 'index'));
  const f = x => {
    const q = qPouce(x), ss = segments(S, 'pouce', chainePouce(S, q));
    const dir = U3(S3(ss[2].b, ss[1].a));
    const g1 = ecart(ss[1], cyl).g, g2 = ecart(ss[2], cyl).g, g0 = ecart(ss[0], cyl).g;
    let pen = 0;
    for (const ob of obstI) for (const s of ss.slice(1)) pen += Math.max(0, -ecart(s, ob).g);
    return 30 * (1 - D3(dir, vise)) + g2 * g2 + 0.3 * g1 * g1 + 40 * Math.max(0, -g0) + 40 * Math.max(0, -g1) + 20 * pen + 0.002 * (x[3] ** 2 + x[4] ** 2);
  };
  let best = null;
  for (const x0 of [[30, -10, 9, 0, 0], [50, 0, 15, 5, 0], [20, -25, 6, 0, -5]]) {
    const r = cherche(f, x0, [10, 10, 10, 10, 10], BORNES_POUCE);
    if (!best || r.f < best.f) best = r;
  }
  return qPouce(best.x);
}

module.exports = {
  // la géométrie, pour les essais et le moteur
  A3, S3, M3, D3, X3, L3, U3, I3, rot3, orth, RAD, DOIGTS,
  preparer, chaineDoigt, chainePouce, segments, rayonVers, OBST, paumeObstacle, ecart, ecartMin, obstSegments,
  fermer, fermerDoigt, fermerPouce, peauEn, pulpe, cherche, pouceEnroule, pouceAutour, pouceManche, pouceVers, pouceSurPhalanges, pouceLong, PRISES, peau,
};
