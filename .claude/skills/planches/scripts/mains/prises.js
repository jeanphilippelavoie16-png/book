// prises.js — le solveur de prise des mains simples (agent 3) : les doigts qui touchent vraiment l'objet.
//
// Le moteur (moteur.js) dessine une main à partir d'une pose : des angles et un objet. Ce fichier calcule ces
// angles pour que la main TIENNE quelque chose : chaque phalange qui peut toucher l'objet le touche, le pouce
// se referme sur l'index ou vient en face des doigts, la paume se pose à plat sur sa surface. Il écrit aussi
// mains/poses.json, les poses que les planches appellent par leur id (les id de inventaire.md, agent 4).
//
// ═══ CE QUE LE MOTEUR APPELLE ══════════════════════════════════════════════════════════════════════════════
//
//   resoudre(pose, outils) → la pose complétée, ou null (la pose telle quelle)
//     Appelé par moteur.js avant tout le reste (outils = { squelette, anatomie, formes, demiAxes, enrouler }).
//     Une pose de poses.json qui porte "solveur" et une "table" de diamètres est relue au diamètre demandé
//     (option diametre de mainSimple) : angles et objet interpolés, < 1 ms. Les tables des poses résolues pareil
//     se mettent bout à bout (prise-manche 8–45 mm + prise-grosse 50–90 mm : une table de 8 à 90). L'âge passe
//     par le diamètre équivalent (d / kW) et l'objet mis à l'échelle. Hors de la table, on la borne (pas de
//     résolution en direct) : une femme, un enfant ne coûtent rien. Seule une pose sans table (des options de
//     solveur sur mesure) est résolue en direct (1 à 3 s, puis en cache). La clé d'une ligne de table est le
//     diamètre DEMANDÉ (pour une pince : l'écart entre les pulpes). Les angles passés par l'option doigts (ceux
//     qui diffèrent de poses.json) sont gardés tels quels. Une pose peut conseiller une rotation de vue
//     (vues.rotation, ex. prise-grosse en vue paume : [0, 45, 0]) : c'est à la planche de la passer.
//
// ═══ LE SOLVEUR ════════════════════════════════════════════════════════════════════════════════════════════
//
// Repère du moteur : x vers les doigts, y vers l'auriculaire, z vers la paume, mm d'homme. Les obstacles sont des
// distances signées : le cylindre (manche, corde, fil, bouteille), le plan (la surface où la main se pose), la
// paume (les bosses du moteur et leur enveloppe), les autres doigts (capsules). Une phalange touche quand la
// distance de son axe à l'obstacle égale sa demi-épaisseur DANS LA DIRECTION de l'obstacle (les quatre demi-axes
// du moteur). Les doigts sont calculés par la formule du moteur (couplages compris : l'écart qui s'efface avec la
// MCP, l'arche de l'annulaire et de l'auriculaire), contrôlée contre lui à chaque chargement (preparer) ; si elle
// diverge de plus de 0,05 mm, le solveur passe par squelette() lui-même. Même chose pour le pouce.
//
//   fermer      la main se referme articulation par articulation, de la base vers le bout : chacune plie jusqu'à
//               ce que SA phalange touche, ou jusqu'à sa butée (proportions.json) ; l'IPD suit l'IPP (0,67 × IPP
//               ± 15°). Si seul le bout de la phalange touche, elle s'arrête là où la phalange prolongée tout droit
//               touche. Un doigt entoure ainsi un manche au lieu de le piquer. ensemble : toutes les articulations
//               ensemble jusqu'au premier contact (la main en C).
//   entourer    la place du manche le long de la paume est CHERCHÉE (celle où le plus de phalanges touchent),
//               l'axe en biais à 25° (de l'hypothénar vers la base de l'index). Le pouce : pouceManche (ses deux
//               phalanges épousent le manche, sa pulpe se pose sur la face de l'index entre P2 et P3 : le
//               marteau) ; s'il n'y arrive pas (gros objet), pouceEnFace (sa pulpe sur l'objet côté poignet,
//               tournée vers les doigts : le C). Options pouce : 'long' (couché le long du manche), 'libre', 'face'.
//               Les MCP voisines restent à 12° au plus l'une de l'autre (proportions.json : 25 à 30°) : l'index et
//               l'auriculaire s'enroulent comme les autres au lieu de se dresser en piquet ; la phalange de base
//               peut alors s'enfoncer de quelques mm dans le manche, et les deux suivantes serrent d'autant.
//   poing, pointe  le pouce pose sa pulpe sur la moitié côté majeur de la P2 de l'index (pas de piquet) ; le
//               majeur est hors d'atteinte avec cette anatomie (testé par une chaîne 3D libre). pointe prend aussi
//               un pouce donné (pouceQ) : celui des poses pointe et appui-index, couché dans le bloc des doigts.
//               crochet : le pouce libre, allongé côté dos (un pouce vers la paume ferme un « OK » sur l'anse).
//   pincer      l'index et le pouce cherchés ensemble (grille grossière puis recherche par motifs) : les deux
//               pulpes face à face, à l'épaisseur de l'objet, rien ne s'interpénètre, et un JOUR de 3 mm entre le
//               pouce et l'index vus de profil (vue pouce) hors des pulpes : le « O » se lit. Les autres doigts : le
//               majeur suit l'index (caché derrière lui), l'annulaire et l'auriculaire presque tendus, hors du O.
//               sortes : fine · pointe · ouverte · laterale (le pouce contre le côté de l'index). L'objet est un
//               fil, sauf pour ouverte : une sphère qui remplit le jour (peau, pâte, bosse), comme pinceDessus.
//   pinceDessus la pince ouverte vue de dessus : l'index un peu plié vers la peau, le pouce écarté, les deux bouts
//               à d l'un de l'autre (la direction du jour tourne de 0 à 60° vers le poignet tant que le pouce
//               n'atteint pas) ; les trois autres à demi repliés ; la bosse, une sphère de 0,6 × d entre eux.
//   crochet · coiffe · plat (chaque doigt plie au MCP jusqu'à poser sa pulpe sur le plan : la ligne de contact
//               est droite ; contact.plan permet au moteur d'y aplatir la silhouette) · fixe (angles donnés).
// Une table de diamètres se résout de proche en proche depuis le diamètre par défaut (le pouce part du voisin) :
// pas de saut d'un diamètre à l'autre, l'interpolation reste une vraie main.
//
// ═══ LES COUCHES ══════════════════════════════════════════════════════════════════════════════════════════
//
// Le moteur décide lui-même, par la profondeur, ce qui passe devant l'objet. couches(S, pose, vue) refait ce
// calcul indépendamment (par phalange, sur les axes 3D) et controle(S, pose) vérifie, à l'écriture de poses.json,
// la règle qui ne doit jamais tomber, dans les vues dont la pose a besoin : vue paume, l'objet n'est pas derrière
// TOUTE la main (les P2 et P3 devant, la paume derrière) ; vue dos d'une prise, la paume devant l'objet. Les
// fautes s'écrivent dans la pose ("fautes"). Accord vérifié avec le .devant du moteur sur prise-manche.
//
// ═══ DEUX MAINS ═══════════════════════════════════════════════════════════════════════════════════════════
//
//   deuxMains(mainSimple, { manche: { x0, y0, x1, y1, r }, mains: [{ t, vue, cote, pose, diametre, sens, … }],
//             objet, echelle })
//     chaque main posée à la fraction t du manche, l'axe de sa prise sur l'axe du manche ; peint avec les couches
//     du moteur : les deux mains, les deux masques, le manche UNE fois, les deux devants.
//   mainSurMain(mainSimple, { x, y, angle, echelle, cote, croise, decalage })
//     deux mains à plat l'une sur l'autre, vues du dessus : celle du dessous en gris (loin), celle du dessus
//     tournée de croise (défaut 24°) et avancée de decalage (mm).
//   pincesSurLacet(mainSimple, { noeud, directions, pose, vue, echelle, objets, … })
//     deux pinces qui tirent les deux bouts d'un lacet (24-16) : chaque main dans l'axe de son lacet, sa masse
//     hors de l'angle des deux lacets, les points de pince reculés jusqu'à 12 mm de jeu (voir la fonction).
//
// ═══ LES POSES (CATALOGUE → poses.json) ═══════════════════════════════════════════════════════════════════
//
//   prise-manche (table 8–45, axe à 20°) · prise-grosse (50–90) · prise-corde (3–14) · prise-pouce-dos (18–36, en
//   sabre : axe à 58°, le pouce couché sur le dos du manche) · coupe-c (60–110) · pince-fine (0,5–10) · pince-pointe
//   (0,5–2) · pince-ouverte (15–70, de profil) · pince-ouverte-dessus (30–70, vue de dessus) · pince-laterale (1–8)
//   · poing · pointe · appui-index · deux-doigts · deux-doigts-v · crochet (8–28) · coiffe (18–34) · plat · porte ·
//   ouverte · relachee · coupe · main-sur-main. Chaque pose porte "vues" : { bonnes, aEviter, rotation?, note? }.
//
// Ligne de commande : node prises.js --ecrire [id…]   recalcule poses.json sur le squelette du moteur (≈ 1 min) ;
//                     à refaire après tout changement d'anatomie de moteur.js
//                     node prises.js --voir id         la pose résolue, en JSON

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
  // l'arche (la tête du métacarpien de l'annulaire et de l'auriculaire descend quand la MCP plie) : son amplitude
  // se lit sur le moteur, MCP à 90°, autour de l'axe du majeur
  const pm = base.points['majeur.mcp'];
  const s90 = sqf({ doigts: { annulaire: { mcp: 90 }, auriculaire: { mcp: 90 } } });
  for (const d of DOIGTS) {
    const a0 = S3(base.points[d + '.mcp'], pm), a1 = S3(s90.points[d + '.mcp'], pm);
    doigts[d].arche90 = (d === 'annulaire' || d === 'auriculaire') ? Math.atan2(a0[1] * a1[2] - a0[2] * a1[1], a0[1] * a1[1] + a0[2] * a1[2]) / RAD : 0;
    doigts[d].pivot = pm;
  }
  const S = { sqf, base, F, kW, demi, doigts, ray, an: base.an, age: o.age || 'homme', cachePouce: new Map(), cacheDoigt: new Map() };
  // la formule d'ici contre le moteur : si elles divergent (le moteur a changé), on passe par le moteur
  S.boiteNoire = false;
  let ecartMax = 0;
  for (const q of [{ ecart: 6, mcp: 30, ipp: 60, ipd: 40 }, { ecart: -4, mcp: 85, ipp: 100, ipd: 66 }, { ecart: 10, mcp: -10, ipp: 5, ipd: 0 }, { mcp: 55, ipp: 70, ipd: 47, arche: 6 }]) {
    const sq = sqf({ doigts: Object.fromEntries(DOIGTS.map(d => [d, q])) });
    for (const d of DOIGTS) {
      const P = chaineDoigt(S, d, q).P, Q = ['mcp', 'ipp', 'ipd', 'bout'].map(k => sq.points[d + '.' + k]);
      for (let i = 0; i < 4; i++) ecartMax = Math.max(ecartMax, L3(S3(P[i], Q[i])));
    }
  }
  if (ecartMax > 0.05) S.boiteNoire = true;
  S.ecartReplique = ecartMax;
  let ecartPouce = 0;
  for (const q of [{ opposition: 30, cmc: 10, mcp: 20, ip: 30 }, { opposition: 70, cmc: -20, rotation: 60, mcp: -10, ip: 70 }]) {
    const sq = sqf({ doigts: { pouce: q } }), P = chainePouce(S, q).P, Q = ['cmc', 'mcp', 'ip', 'bout'].map(k => sq.points['pouce.' + k]);
    for (let i = 0; i < 4; i++) ecartPouce = Math.max(ecartPouce, L3(S3(P[i], Q[i])));
  }
  if (ecartPouce > 0.05) S.poucenoir = true;
  S.ecartPouce = ecartPouce;
  S.paume = paumeObstacle(S);
  return S;
}
// la chaîne d'un doigt : 4 points (MCP, IPP, IPD, centre du bout) et les cadres des 3 phalanges
function chaineDoigt(S, d, q) {
  const D = S.doigts[d], Q = Object.assign({ ecart: 0, mcp: 0, ipp: 0, ipd: 0 }, q || {});
  if (S.boiteNoire) return chaineDoigtMoteur(S, d, Q);
  // les couplages du moteur : l'écart s'efface quand la MCP plie ; l'arche de l'annulaire et de l'auriculaire
  let n = D.n0.slice(), u = rot3(D.u0, [0, 0, -1], D.s * (Q.ecart || 0) * borne(1 - Math.max(0, Q.mcp) / 90, 0, 1));
  let mcp = D.mcp.slice();
  const ka = Q.arche !== undefined ? Q.arche : (D.arche90 || 0) * borne(Q.mcp / 90, 0, 1);
  if (ka) {
    const pm = D.pivot, c = Math.cos(ka * RAD), sn = Math.sin(ka * RAD), dy = mcp[1] - pm[1], dz = mcp[2] - pm[2];
    mcp = [mcp[0], pm[1] + dy * c - dz * sn, pm[2] + dy * sn + dz * c];
    u = rot3(u, [1, 0, 0], ka); n = rot3(n, [1, 0, 0], ka);
  }
  const P = [mcp], cadres = [];
  const fl = [Q.mcp, Q.ipp, Q.ipd];
  for (let k = 0; k < 3; k++) {
    const a = U3(X3(n, u));
    u = rot3(u, a, fl[k]); n = rot3(n, a, fl[k]);
    P.push(A3(P[k], M3(u, D.L[k])));
    cadres.push({ u, n: orth(n, u), r: X3(orth(n, u), u) });
  }
  return { P, cadres };
}
// le doigt par le moteur lui-même (repli quand la formule d'ici ne suit plus), mémoïsé
function chaineDoigtMoteur(S, d, Q) {
  const cle = d + ':' + ['ecart', 'mcp', 'ipp', 'ipd', 'arche'].map(k => Q[k] === undefined ? '' : Math.round(Q[k] * 20)).join(',');
  let c = S.cacheDoigt.get(cle);
  if (c) return c;
  const sq = S.sqf({ doigts: { [d]: Q } });
  c = { P: ['mcp', 'ipp', 'ipd', 'bout'].map(k => sq.points[d + '.' + k]), cadres: ['p1', 'p2', 'p3'].map(k => { const g = sq.segments[d + '.' + k]; return { u: g.u, n: g.n, r: g.r }; }) };
  if (S.cacheDoigt.size > 50000) S.cacheDoigt.clear();
  S.cacheDoigt.set(cle, c);
  return c;
}
// le pouce : le métacarpien par le moteur (sa cinématique est la sienne : opposition, cmc, rotation), mémoïsé ;
// les deux phalanges par la même formule que les doigts (contrôlée contre le moteur, voir verifier)
function chainePouce(S, q) {
  const Q = Object.assign({ opposition: 0, cmc: 0, mcp: 0, ip: 0 }, q || {});
  if (S.poucenoir) {                                     // le moteur a changé : tout le pouce par lui
    const cle = 'N' + ['opposition', 'cmc', 'rotation', 'mcp', 'ip'].map(k => Q[k] === undefined ? '' : Math.round(Q[k] * 20)).join(',');
    let c = S.cachePouce.get(cle);
    if (!c) {
      const sq = S.sqf({ doigts: { pouce: Q } });
      c = { P: ['cmc', 'mcp', 'ip', 'bout'].map(k => sq.points['pouce.' + k]), cadres: ['meta', 'p1', 'p2'].map(k => { const g = sq.segments['pouce.' + k]; return { u: g.u, n: g.n, r: g.r }; }) };
      S.cachePouce.set(cle, c);
    }
    return c;
  }
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
  if (o.ensemble) {
    // la main en C : toutes les articulations plient ensemble jusqu'au premier contact (le bout, souvent)
    const k = Object.assign({ mcp: 0.75, ipp: 1, ipd: 0.67 }, o.ensemble === true ? {} : o.ensemble);
    const qDe = t => Object.assign({}, q0, { mcp: q0.mcp + k.mcp * t, ipp: q0.ipp + k.ipp * t, ipd: q0.ipd + k.ipd * t });
    const touche = t => segments(S, d, chaineDoigt(S, d, qDe(t))).some((sg, i) => [...obstacles, ...(i ? [S.paume] : [])].some(ob => ecart(sg, ob).g < -0.05));
    let lo = 0, hi = 0;
    while (hi < 100 && !touche(hi + 2)) hi += 2;
    lo = hi; hi = Math.min(100, hi + 2);
    for (let b = 0; b < 12; b++) { const m = (lo + hi) / 2; if (touche(m)) hi = m; else lo = m; }
    return { q: qDe(lo), contacts: [] };
  }
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
// une grille grossière (le produit des listes), puis la recherche par motifs depuis les meilleurs points
function chercheGlobal(f, grilles, pas, bornes, { garder = 4, min = 0.4, iter = 250 } = {}) {
  const pts = [];
  const rec = (i, x) => {
    if (i === grilles.length) { pts.push({ x: x.slice(), f: f(x) }); return; }
    for (const v of grilles[i]) { x[i] = v; rec(i + 1, x); }
  };
  rec(0, []);
  pts.sort((a, b) => a.f - b.f);
  let best = null;
  for (const p0 of pts.slice(0, garder)) {
    const r = cherche(f, p0.x, pas, bornes, { min, iter });
    if (!best || r.f < best.f) best = r;
  }
  return best;
}
const GRILLE_POUCE = [[0, 20, 40, 60, 80, 100], [-30, -10, 10, 30, 45], [-40, 0, 40, 80, 120, 160], [-10, 15, 40, 65], [-10, 20, 50, 80]];
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
  // la pulpe peut se poser n'importe où sur la face de l'index entre le milieu de P2 et le milieu de P3 (le pouce
  // en travers de la P2, ou de l'articulation, selon ce qu'il atteint)
  const chemin = [I3(ip2.a, ip2.b, 0.35), ip2.b, I3(ip3.a, ip3.b, 0.6)];
  const rI = rayonVers(ip2, 0.8, ip2.c.n);
  const surIndex = p => { let m = Infinity; for (let i = 0; i < 2; i++) m = Math.min(m, L3(S3(p, procheSeg(p, chemin[i], chemin[i + 1]).q))); return Math.abs(m - rI - 0.3); };
  const f = x => {
    const q = qPouce(x), ch = chainePouce(S, q), ss = segments(S, 'pouce', ch);
    const g0 = ecart(ss[0], cyl).g, g1 = ecart(ss[1], cyl).g, g2 = ecart(ss[2], cyl).g;
    let pen = Math.max(0, -g0 - 1.5) + Math.max(0, -g1) + Math.max(0, -g2);
    let gd = Infinity;
    for (const ob of obstD) for (let i = 1; i < 3; i++) { const g = ecart(ss[i], ob).g; pen += Math.max(0, -g - 0.5); if (i === 2) gd = Math.min(gd, g); }
    const pp = pulpe(S, 'pouce', q, 0.75);
    const dt = surIndex(pp.p) + 0.12 * L3(S3(pp.p, cible));
    return 400 * pen * pen + 1 * Math.max(0, g1) ** 2 + 1.5 * Math.max(0, g2) ** 2 + 0.8 * dt * dt + 2 * Math.max(0, gd) ** 2 * (dt < 25 ? 1 : 0) +
      0.01 * (x[2] - 0.3 * x[0]) ** 2 + 0.02 * Math.max(0, x[4] - 60) ** 2 + 0.02 * Math.max(0, x[3] - 50) ** 2;
  };
  // une table se construit de proche en proche : on part du pouce du diamètre voisin, et on ne prend la
  // recherche globale que si elle est nettement meilleure (sinon le pouce sauterait d'un diamètre à l'autre)
  let best = null;
  if (o.depart) {
    const d = o.depart, x0 = [d.opposition, d.cmc, d.rotation !== undefined ? d.rotation : 0.3 * d.opposition, d.mcp, d.ip];
    best = cherche(f, x0, [6, 5, 8, 6, 6], BORNES_POUCE);
  }
  if (!best || best.f > 25) {
    const g = chercheGlobal(f, GRILLE_POUCE, [12, 10, 15, 12, 12], BORNES_POUCE);
    if (!best || g.f < 0.6 * best.f) best = g;
  }
  const q = qPouce(best.x);
  return { q, f: best.f, erreur: surIndex(pulpe(S, 'pouce', q, 0.75).p) };
}
// le pouce en face des doigts, de l'autre côté de l'objet (la main en C, la grosse prise) : sa pulpe sur
// l'objet, côté poignet, tournée vers les doigts ; le plus haut qu'il atteint sans rien traverser
function pouceEnFace(S, cyl, segsD, o = {}) {
  const yP = -40, t = (yP - cyl.C[1]) / (cyl.u[1] || 1), C = A3(cyl.C, M3(cyl.u, t));
  const ex = orth([-1, 0, 0], cyl.u), ez = orth([0, 0, -1], cyl.u);          // côté poignet, côté paume
  const obst = [cyl, ...obstSegments(segsD.filter(s => ['index', 'majeur'].includes(s.doigt)))];
  let best = null;
  for (const phi of [0, 20, 40, 60]) {                                       // de l'équateur vers la paume
    const n = U3(A3(M3(ex, Math.cos(phi * RAD)), M3(ez, Math.sin(phi * RAD))));
    const G = A3(C, M3(n, cyl.R + 9.5));
    const r = pouceVers(S, G, M3(n, -1), obst, { pref: { mcp: 15, ip: 15 } });
    const sc = r.erreur + phi * 0.06;
    if (!best || sc < best.sc) best = Object.assign(r, { sc, phi });
  }
  return best;
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
  const best = chercheGlobal(f, GRILLE_POUCE, [10, 8, 15, 10, 10], BORNES_POUCE);
  const q = qPouce(best.x);
  return { q, erreur: L3(S3(pulpe(S, 'pouce', q, t).p, G)) };
}
// le pouce posé sur la face extérieure de phalanges repliées (le poing, la pointe) : sa pulpe sur la phalange
// du milieu visée, sa première phalange couchée le long de l'index replié (pas dressée en piquet)
function pouceSurPhalanges(S, segsD, noms, o = {}) {
  const ss = noms.map(n => segsD.find(s => s.id === n));
  const mid = ss.map(s => I3(s.a, s.b, o.t || 0.5)).reduce((a, b) => A3(a, M3(b, 1 / ss.length)), [0, 0, 0]);
  const out = orth(U3(S3(mid, [mid[0] - 30, mid[1], 0])), U3(S3(ss[0].b, ss[0].a)));
  const G = A3(A3(mid, M3(out, rayonVers(ss[0], 0.5, out) + 0.4)), M3(ss[0].c.r, -(o.decale || 0)));
  // l'IP du pouce au bord radial du premier doigt replié (le pouce longe ce doigt, puis sa dernière phalange
  // le croise vers la phalange visée) : c'est ce qui le couche au lieu de le dresser en piquet
  const bord = segsD.find(s => s.id === (o.bord || 'index.p2'));
  const radial = bord.c.r, outB = orth(U3(S3(I3(bord.a, bord.b, 0.3), [bord.a[0] - 30, bord.a[1], 0])), U3(S3(bord.b, bord.a)));
  const Gip = A3(A3(I3(bord.a, bord.b, 0.3), M3(radial, rayonVers(bord, 0.3, radial) + 8)), M3(outB, 5));
  const obstD = obstSegments(segsD);
  const f = x => {
    const q = qPouce(x), pp = pulpe(S, 'pouce', q, 0.72), seg = segments(S, 'pouce', pp.ch);
    const err = L3(S3(pp.p, G)), face = 1 - D3(pp.n, M3(out, -1)), eip = L3(S3(pp.ch.P[2], Gip));
    let pen = 0;
    for (const ob of obstD) for (let i = 1; i < 3; i++) pen += Math.max(0, -ecart(seg[i], ob).g - 0.3);
    pen += Math.max(0, -ecart(seg[2], S.paume).g);
    return err * err + (o.poidsIP !== undefined ? o.poidsIP : 0.35) * eip * eip + 60 * face * face + 400 * pen * pen +
      0.01 * (x[2] - 0.3 * x[0]) ** 2 + 0.01 * Math.max(0, x[4] - 60) ** 2;
  };
  const best = chercheGlobal(f, GRILLE_POUCE, [10, 8, 15, 10, 10], BORNES_POUCE);
  const q = qPouce(best.x);
  return { q, erreur: L3(S3(pulpe(S, 'pouce', q, 0.72).p, G)) };
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
    const be = (o.inclinaison !== undefined ? o.inclinaison : 20) * RAD;
    const u = U3([-Math.sin(be), Math.cos(be), o.pente || 0]);
    const xm = S.an.doigts.majeur.mcp[0];
    const essai = x => {
      const H = [x, 0, Math.max(peauEn(S, x, 0), peauEn(S, x - 0.27 * 20, 20), peauEn(S, x + 0.27 * 20, -20)) + R + dec];
      const cyl = OBST.cylindre(H, u, R);
      const doigts = {};
      let touche = 0, bouts = 0;
      for (const n of DOIGTS) {
        const r = fermerDoigt(S, n, [cyl], { depart: { ecart: (o.ecarts || {})[n] || 0 }, ensemble: o.ensemble });
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
    else if (o.prec && o.prec.position !== undefined) {               // de proche en proche : près du voisin
      for (let x = o.prec.position - 6; x <= o.prec.position + 6; x += 2) { const r = essai(x); r.score -= 0.15 * Math.abs(x - o.prec.position); if (!best || r.score > best.score) best = r; }
    } else for (let x = xm - 36; x <= xm + 4; x += 4) { const r = essai(x); if (!best || r.score > best.score) best = r; }
    const { H, cyl, doigts } = best;
    // les MCP voisines ne diffèrent pas de plus de 25 à 30° (proportions.json, couplages) ; dans une prise de force
    // l'index s'enroule comme les autres : sans ça, le manche en biais le touche tôt et il se dresse en piquet au-
    // dessus des jointures (révision, R2). Il plie alors sa MCP jusqu'à ~10° du majeur, puis referme IPP et IPD.
    if (!o.ensemble && o.voisins !== false) {
      const ecartMax = o.voisins || 12;
      for (const [n, v] of [['index', 'majeur'], ['auriculaire', 'annulaire']]) {
        const mini = doigts[v].mcp - ecartMax;
        if (doigts[n].mcp < mini) {
          const q0 = Object.assign({}, doigts[n], { mcp: mini, ipp: 0, ipd: 0 });
          // la phalange de base s'enfonce un peu dans le manche (la peau et la pulpe se tassent) : les deux
          // suivantes se referment sur le manche diminué d'autant, le doigt entier serre pareil
          const p1 = segments(S, n, chaineDoigt(S, n, q0))[0];
          const enf = Math.max(0, -ecart(p1, cyl).g);
          const cylN = enf > 0 ? OBST.cylindre(cyl.C, cyl.u, Math.max(1, cyl.R - enf - 0.5)) : cyl;
          doigts[n] = fermerDoigt(S, n, [cylN], { depart: q0, actives: ['ipp', 'ipd'] }).q;
        }
      }
    }
    const segsD = segsDoigts(S, doigts);
    if (o.pouce === 'long') doigts.pouce = pouceLong(S, cyl, segsD);
    else if (o.pouce === 'libre') doigts.pouce = { opposition: 15, cmc: -5, rotation: 4, mcp: 10, ip: 10 };
    else if (o.pouce === 'tour') doigts.pouce = pouceEnroule(S, cyl, segsD);
    else if (o.pouce === 'cible') doigts.pouce = pouceAutour(S, cyl, segsD, o).q;
    else {
      // le marteau si le pouce atteint l'index par-dessus l'objet ; sinon le pouce en face des doigts (le C)
      const m = o.pouce === 'face' ? null : pouceManche(S, cyl, segsD, { depart: o.prec && o.prec.pouce });
      doigts.pouce = m && m.erreur < 9 ? m.q : pouceEnFace(S, cyl, segsD, { depart: o.prec && o.prec.pouce }).q;
    }
    const objet = { type: d <= 4 ? 'fil' : 'cylindre', diametre: d, centre: H, axe: u, longueur: o.longueur || 1200 };
    return { doigts, objet, prec: { position: H[0], pouce: doigts.pouce } };
  },
  // le poing fermé à vide : les doigts jusqu'à la paume, le pouce sur l'index et le majeur
  poing(S, o) {
    const doigts = {};
    for (const n of DOIGTS) doigts[n] = fermerDoigt(S, n, []).q;
    // le pouce n'atteint que la phalange du milieu de l'index (il en fait le tour) : sa pulpe dessus, côté majeur
    // (révision R6) sa pulpe sur la moitié côté majeur de la P2 de l'index : il la croise au lieu de rester sur le
    // côté. Le majeur est hors d'atteinte avec cette anatomie (testé par une chaîne 3D libre).
    doigts.pouce = pouceSurPhalanges(S, segsDoigts(S, doigts), ['index.p2'], { t: 0.5, decale: -5, poidsIP: 0.08 }).q;
    return { doigts, objet: null };
  },
  // des doigts tendus (l'index ; l'index et le majeur), les autres repliés ; le pouce sur le premier replié
  pointe(S, o) {
    const tendus = o.tendus || ['index'];
    const doigts = {};
    for (const n of DOIGTS) doigts[n] = tendus.includes(n) ? Object.assign({ ecart: 0, mcp: 0, ipp: 4, ipd: 2 }, (o.tendu || {})[n] || {}) : fermerDoigt(S, n, []).q;
    const replies = DOIGTS.filter(n => !tendus.includes(n));
    const segsR = segsDoigts(S, doigts, replies);
    if (o.pouceQ) doigts.pouce = o.pouceQ;
    else if (o.pouce === 'ecarte') doigts.pouce = { opposition: 10, cmc: -18, rotation: 3, mcp: 6, ip: 6 };
    else doigts.pouce = pouceSurPhalanges(S, segsR, [replies[0] + '.p2'], { t: 0.6, bord: replies[0] + '.p2' }).q;
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
    // (révision R1) l'index peu plié, les autres en cascade nette — repliés derrière, chacun un peu plus que le
    // précédent, pas fermés en poing — et un JOUR entre le pouce et l'index vu de profil : le « O » se lit
    const POSTURE = { fine: [36, 56, 0.55], pointe: [38, 62, 0.8], ouverte: [30, 26, 0.4], laterale: [55, 72, 0.6] };
    const CASCADE = {
      replies: { majeur: [50, 62, 32], annulaire: [60, 72, 38], auriculaire: [68, 80, 44] },
      // vu de profil, le « O » ne se lit que vide : le majeur suit l'index (caché derrière lui), l'annulaire et
      // l'auriculaire restent presque tendus, en cascade vers l'extérieur, hors du « O ». Pliés en poing, ils le
      // remplissent (l'auriculaire, plus court et plus bas, tombe dedans) et la pince se lit comme un poing.
      cascade: { majeur: [36, 54, 32], annulaire: [18, 24, 15], auriculaire: [10, 14, 9] },
      ouverts: { majeur: [30, 34, 14], annulaire: [38, 42, 18], auriculaire: [46, 50, 22] },
    };
    const [m0, p0, kd] = o.index || POSTURE[sorte];
    const casc = CASCADE[o.autres || (sorte === 'ouverte' ? 'ouverts' : sorte === 'laterale' ? 'replies' : 'cascade')];
    // le jour, vu de profil (vue pouce : x et z) : le pouce et l'index ne se recouvrent qu'aux pulpes
    const jour = o.jour !== undefined ? o.jour : (sorte === 'laterale' ? 0 : 3);
    const ech = (sg, t0, t1, n) => Array.from({ length: n }, (_, k) => { const t = t0 + (t1 - t0) * (n > 1 ? k / (n - 1) : 0); const p = I3(sg.a, sg.b, t); return { x: p[0], z: p[2], r: (rayonVers(sg, Math.min(t, 1), sg.c.n) + rayonVers(sg, Math.min(t, 1), M3(sg.c.n, -1))) / 2 }; });
    const chevauche = (sT, sI) => {
      if (!jour) return 0;
      const A = [...ech(sT[1], 0, 1, 5), ...ech(sT[2], 0, 0.4, 3)], B = [...ech(sI[0], 0.2, 1, 5), ...ech(sI[1], 0, 1, 4), ...ech(sI[2], 0, 0.4, 3)];
      let p = 0;
      for (const a of A) for (const b of B) { const m = a.r + b.r + jour - Math.hypot(a.x - b.x, a.z - b.z); if (m > 0) p += m * m; }
      return p;
    };
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
      const sT3 = segments(S, 'pouce', ct.ch);
      return err * err + 250 * face * face + 40 * pen + 0.02 * ((x[5] - m0) ** 2 + (x[6] - p0) ** 2) + 0.6 * chevauche(sT3, sI) +
        0.004 * ((x[3] - 15) ** 2 + (x[4] - (sorte === 'ouverte' ? 10 : 12)) ** 2) + 2 * hyp * hyp + 0.004 * (x[2] - 0.3 * x[0]) ** 2;
    };
    const g = chercheGlobal(x => f([...x, m0, p0]), GRILLE_POUCE, [10, 8, 15, 10, 10], BORNES_POUCE, { garder: 3, iter: 60 });
    const best = cherche(f, [...g.x, m0, p0], [6, 6, 8, 6, 6, 6, 6], [...BORNES_POUCE, [-10, 90], [0, 105]]);
    const x = best.x;
    const doigts = Object.assign({ index: pli(x[5], x[6], x[6] * kd) }, autres, { pouce: qPouce(x) });
    const ci = cibleIndex(doigts.index), ct = pulpeT(doigts.pouce);
    const M = I3(ci.I, ct.P, 0.5);
    const sgI = segments(S, 'index', chaineDoigt(S, 'index', doigts.index))[2];
    const w = o.fil === 'travers' ? orth(sgI.c.r, ci.n) : orth(U3(S3(sgI.b, sgI.a)), ci.n);
    // la pince ouverte ne tient pas un fil : elle tend une peau, une pâte, une bosse ; l'objet est la boule qui
    // remplit le jour entre les deux pulpes (comme pinceDessus), pas un bâton de 6 mm planté au milieu
    const objet = sorte === 'ouverte'
      ? { type: 'sphere', diametre: Math.max(6, L3(S3(ct.P, ci.I)) - 2), centre: M, axe: w }
      : { type: 'fil', diametre: Math.max(1.2, e), centre: M, axe: w, longueur: 120 };
    return { doigts, objet, contact: { type: 'pince', points: [ci.I, ct.P], normale: ci.n }, erreur: L3(S3(ct.P, A3(ci.I, M3(ci.n, e)))) };
  },
  // (révision R4) la pince ouverte VUE DE DESSUS : l'index et le pouce écartés de part et d'autre d'une bosse de
  // diamètre d, les pulpes face à face en travers de la main (le jour selon y), les bouts vers la surface ; les
  // trois autres repliés en poing, hors du chemin. Vue de dos, les deux bouts dépassent de part et d'autre.
  pinceDessus(S, o) {
    // vue de dessus : l'index plié vers la peau (son bout revient à portée du pouce), le pouce écarté à côté de lui,
    // les deux bouts à d l'un de l'autre en travers de la main, les pulpes face à face ; les trois autres à demi
    // repliés. Vue de dos, les deux bouts sortent de part et d'autre de la bosse.
    const d = o.diametre || 55;
    const doigts = {};
    // (révision R13) les trois autres à demi repliés (pas en poing : vu de dessus, un poing et un index levé ne se
    // lisent pas comme une pince) ; l'index moins plié, qui va vers la peau en avant de la main
    const A = o.autres === 'poing' ? null : (o.autres || { majeur: [40, 45, 22], annulaire: [48, 48, 24], auriculaire: [56, 50, 25] });
    for (const n of ['majeur', 'annulaire', 'auriculaire']) doigts[n] = A && A[n] ? pli(...A[n]) : fermerDoigt(S, n, []).q;
    doigts.index = pli(...(o.index || [30, 36, 20]), o.ecartIndex !== undefined ? o.ecartIndex : 4);
    const pi = pulpe(S, 'index', doigts.index, 0.85);
    const cote = [0, -1, 0];
    const I = A3(pi.c, M3(cote, rayonVers(pi.seg, 0.85, pi.seg.c.r)));
    // (révision R13) le pouce ne va pas loin devant : au-delà de ~35 mm en travers, la cible sort de sa portée. On
    // tourne la direction du jour de 0 à 60° vers le poignet (le bout du pouce un peu en retrait de celui de
    // l'index, comme sur une peau tendue) et on garde celle que le pouce atteint, la plus en travers à erreur égale
    const obst = obstSegments(segsDoigts(S, doigts));
    let r = null, u = cote;
    for (const th of (o.angles || [0, 15, 30, 45, 60])) {
      const a = th * RAD, v = [-Math.sin(a), -Math.cos(a), 0];
      const ri = pouceVers(S, A3(I, M3(v, d)), M3(v, -1), obst, { pref: { mcp: 10, ip: 10 }, t: 0.8 });
      ri.cout = ri.erreur + 0.03 * th;
      if (!r || ri.cout < r.cout) { r = ri; u = v; }
    }
    doigts.pouce = r.q;
    const P = pulpe(S, 'pouce', r.q, 0.8).p, M = I3(I, P, 0.5);
    // la bosse : 0,6 × le jour, pour que les deux bouts se voient de part et d'autre (une boule qui touche les deux
    // pulpes, vue de dessus, recouvre les deux bouts de doigts)
    return { doigts, objet: { type: 'sphere', diametre: Math.max(6, 0.6 * L3(S3(P, I))), centre: A3(M, [0, 0, 4]), axe: [0, 0, 1] },
      contact: { type: 'pince', points: [I, P], normale: u }, erreur: r.erreur };
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
    // (révision R11) le pouce LIBRE : allongé, un peu écarté, côté dos de la main. Un pouce qui monte vers la paume
    // vient fermer devant l'anse, et de profil le crochet se lit comme un « OK » autour d'une boule
    doigts.pouce = o.pouceQ || { opposition: -30, cmc: -10, rotation: 0, mcp: -5, ip: 0 };
    return { doigts, objet: { type: 'cylindre', diametre: d, centre: a, axe: u, longueur: o.longueur || 600 } };
  },
  // la paume coiffe le bout d'un bâton debout (l'axe sort de la paume), les doigts autour
  // L'objet du moteur est centré sur son centre : on le garde court (60 mm, le bout dans la paume), pour que
  // l'ancre 'prise' tombe sur la main ; la planche prolonge le bâton par g.bouts.
  coiffe(S, o) {
    const d = o.diametre || 26, R = d / 2, L = o.longueur || 60;
    const C0 = [o.position || 52, o.y || 0, peauEn(S, o.position || 52, 0)];
    const centre = A3(C0, [0, 0, L / 2]);
    const cyl = OBST.cylindre(A3(C0, [0, 0, 200]), [0, 0, 1], R, 200);
    const doigts = {};
    const ec = o.ecarts || { index: -8, majeur: 0, annulaire: -4, auriculaire: -10 };
    for (const n of DOIGTS) doigts[n] = fermerDoigt(S, n, [cyl], { depart: { ecart: ec[n] } }).q;
    const segsD = segsDoigts(S, doigts);
    doigts.pouce = pouceEnFace(S, cyl, segsD).q;
    return { doigts, objet: { type: 'cylindre', diametre: d, centre, axe: [0, 0, 1], longueur: L },
      contact: { type: 'point', points: [C0], normale: [0, 0, 1] } };
  },
  // à plat : la paume et les pulpes sur le plan de la paume (la surface du côté +z), le pouce le long de
  // l'index et couché sur le plan. o.creux : les doigts en léger creux (porte), o.ecarts : écartés.
  plat(S, o) {
    // (révision R8) le plan touche la face la plus saillante de la paume (le talon, le thénar) : les pulpes y
    // descendent ; sinon la paume dépassait la ligne des pulpes et traversait la table
    let zP = peau(S);
    for (let x = 6; x <= 86; x += 8) for (let y = -30; y <= 34; y += 8) zP = Math.max(zP, peauEn(S, x, y));
    const z0 = zP + (o.enfonce || 0);
    const plan = OBST.plan([0, 0, z0], [0, 0, -1]);
    const doigts = {};
    const ec = o.ecarts || {};
    for (const n of DOIGTS) {
      const q0 = Object.assign({ ecart: ec[n] || 0, mcp: -10, ipp: 0, ipd: 0 }, (o.depart || {})[n] || {});
      q0.ipp = Math.min(q0.ipp, 0); q0.ipd = Math.min(q0.ipd, 0);
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
    // la phalange de base reste dans le plan des pulpes : pas de « creux » qui casse la ligne (sauf o.creux)
    return { doigts, objet: o.surface ? { type: 'plan', centre: [90, 0, z0], axe: [0, 0, -1] } : null,
      contact: { type: 'plan', point: [0, 0, z0], normale: [0, 0, 1], points: pts } };
  },
  // des angles donnés tels quels (ouverte, relâchée, coupe…)
  fixe(S, o) { return { doigts: JSON.parse(JSON.stringify(o.doigts)), objet: o.objet || null, contact: o.contact || null }; },
};
// le pouce couché le long du manche, vers son bout côté pouce, la pulpe dessus (prise-pouce-dos)
function pouceLong(S, cyl, segsD) {
  // (révision R5) le pouce couché SUR le dos du manche : sa pulpe sur la génératrice loin de la paume (+z), tournée
  // vers le manche, son axe le long du manche vers le bout côté pouce ; vu de profil, il longe le bord du manche
  const vise = M3(cyl.u, -1), dessus = orth([0, 0, 1], cyl.u);
  const obstI = obstSegments(segsD.filter(s => s.doigt === 'index' || s.doigt === 'majeur'));
  const f = x => {
    const q = qPouce(x), ss = segments(S, 'pouce', chainePouce(S, q));
    const dir = U3(S3(ss[2].b, ss[1].a));
    const g1 = ecart(ss[1], cyl).g, g2 = ecart(ss[2], cyl).g, g0 = ecart(ss[0], cyl).g;
    const pp = pulpe(S, 'pouce', q, 0.7), w = S3(pp.p, cyl.C), rad = S3(w, M3(cyl.u, D3(w, cyl.u)));
    const surDos = 1 - D3(U3(rad), dessus);                              // 0 : la pulpe sur le dos du manche
    let pen = 0;
    for (const ob of obstI) for (const s of ss.slice(1)) pen += Math.max(0, -ecart(s, ob).g);
    return 30 * (1 - D3(dir, vise)) + 2 * g2 * g2 + 0.3 * g1 * g1 + 40 * Math.max(0, -g0) + 40 * Math.max(0, -g1) + 40 * Math.max(0, -g2) +
      60 * surDos * surDos + 20 * pen + 0.002 * (x[3] ** 2 + x[4] ** 2);
  };
  const best = chercheGlobal(f, GRILLE_POUCE, [10, 8, 12, 10, 10], BORNES_POUCE, { garder: 3 });
  return qPouce(best.x);
}

// ─── le catalogue : les poses de poses.json (les id de inventaire.md, agent 4) ──────────────────────────────
// prise : la fonction de PRISES ; options : ses options ; table : les diamètres où la prise est résolue d'avance
// (le moteur interpole entre eux) ; vues : celles dont les planches ont besoin, et celles à éviter (inventaire).
const D0 = (mcp, ipp, ipd, ecart = 0) => ({ ecart, mcp, ipp, ipd });
const CATALOGUE = [
  { id: 'prise-manche', prise: 'entourer', options: { diametre: 32 }, table: [8, 12, 16, 20, 25, 28, 32, 36, 40, 45],
    vues: { bonnes: ['paume', 'dos', 'pouce'], aEviter: ['auriculaire'] },
    nom: 'le poing fermé sur un manche de 8 à 45 mm : le manche entre d’un côté du poing et ressort de l’autre',
    note: 'paume : le manche derrière les doigts repliés, devant la paume, le pouce devant ; dos : le manche sort des deux côtés du poing ; pouce : le rond du manche dans le trou du poing (couper l’objet au ras de la main)' },
  { id: 'prise-grosse', prise: 'entourer', options: { diametre: 70 }, table: [50, 60, 70, 80, 90],
    vues: { bonnes: ['pouce', 'paume', 'dos'], aEviter: [], rotation: { paume: [0, 45, 0] },
      note: 'au-delà de ~65 mm (une bouteille), vue dos : la main devant la bouteille se lit ; côté paume, même tournée de 35 à 60°, la bouteille cache la main (les doigts ne font que 140° du tour). Jusqu’à ~65 mm (une boîte de 50 à 60), vue paume tournée de rotation: [0, 45, 0] pour voir les doigts passer devant' },
    nom: 'la main autour d’un cylindre de 50 à 90 mm : les doigts et le pouce ne se rejoignent pas' },
  { id: 'prise-corde', prise: 'entourer', options: { diametre: 10, inclinaison: 20 }, table: [3, 6, 8, 10, 12, 14],
    vues: { bonnes: ['paume', 'dos'], aEviter: ['pouce'] },
    nom: 'le poing serré sur une corde, une racine, un fil de 3 à 14 mm qui le traverse' },
  { id: 'prise-pouce-dos', prise: 'entourer', options: { diametre: 26, inclinaison: 58, pouce: 'long' }, table: [18, 22, 26, 30, 36],
    vues: { bonnes: ['pouce'], aEviter: ['dos', 'paume'] },
    nom: 'le poing sur un manche, le pouce allongé sur le dos du manche ou de la lame' },
  { id: 'coupe-c', prise: 'entourer', options: { diametre: 80, decollement: 16, inclinaison: 10, ensemble: true, pouce: 'face' }, table: [60, 70, 80, 90, 100, 110],
    vues: { bonnes: ['pouce', 'dos'], aEviter: ['paume'] },
    nom: 'la main en C autour d’un rond de 60 à 110 mm : le pouce d’un côté, les doigts de l’autre, la paume décollée' },
  { id: 'pince-fine', prise: 'pincer', options: { sorte: 'fine', diametre: 2 }, table: [0.5, 2, 5, 10],
    vues: { bonnes: ['pouce'], aEviter: ['paume'] },
    nom: 'la pulpe du pouce contre la pulpe de l’index ; les trois autres doigts repliés derrière, en cascade' },
  { id: 'pince-pointe', prise: 'pincer', options: { sorte: 'pointe', diametre: 0.5 }, table: [0.5, 2],
    vues: { bonnes: ['pouce'], aEviter: ['paume', 'dos'] },
    nom: 'le bout du pouce contre le bout de l’index, pour l’objet très fin' },
  { id: 'pince-ouverte', prise: 'pincer', options: { sorte: 'ouverte', diametre: 40 }, table: [15, 25, 40, 55, 70],
    vues: { bonnes: ['pouce'], aEviter: ['paume', 'dos'], note: 'vue de dessus : pince-ouverte-dessus' },
    nom: 'le pouce et l’index écartés, les pulpes posées de part et d’autre (de profil)' },
  { id: 'pince-ouverte-dessus', prise: 'pinceDessus', options: { diametre: 55 }, table: [30, 40, 55, 70],
    vues: { bonnes: ['dos'], aEviter: ['paume', 'pouce'] },
    nom: 'vue de dessus : l’index et le pouce écartés de part et d’autre d’une bosse, les bouts vers la peau' },
  { id: 'pince-laterale', prise: 'pincer', options: { sorte: 'laterale', diametre: 3 }, table: [1, 3, 8],
    vues: { bonnes: ['pouce'], aEviter: ['dos', 'paume'] },
    nom: 'la pulpe du pouce contre le côté de l’index plié (la prise d’une clé)' },
  { id: 'poing', prise: 'poing', options: {},
    vues: { bonnes: ['paume', 'pouce', 'dos'], aEviter: [] },
    nom: 'le poing fermé à vide, le pouce couché sur l’index et le majeur' },
  // (P4, agent 2) le pouce de la pointe couché en travers du majeur replié, son bout dans le bloc des doigts : posé
  // par le solveur sur la FACE de la P2 du majeur, il en dépasse de 12 mm et sort de profil comme un canon
  { id: 'pointe', prise: 'pointe', options: { appui: true, pouceQ: { opposition: 30, cmc: -20, rotation: -32.5, mcp: 55, ip: 46 } },
    vues: { bonnes: ['pouce', 'dos'], aEviter: ['paume'] },
    nom: 'l’index tendu, les autres repliés, le pouce posé sur le majeur' },
  { id: 'appui-index', prise: 'pointe', options: { appui: true, pouceQ: { opposition: 30, cmc: -20, rotation: -32.5, mcp: 55, ip: 46 }, tendu: { index: { mcp: 24, ipp: 16, ipd: -10 } } },
    vues: { bonnes: ['pouce'], aEviter: ['paume'] },
    nom: 'le bout de l’index appuie (la dernière phalange cède un peu en arrière), les autres repliés' },
  { id: 'deux-doigts', prise: 'pointe', options: { tendus: ['index', 'majeur'], pouce: 'ecarte' },
    vues: { bonnes: ['dos', 'pouce'], aEviter: ['paume'] },
    nom: 'l’index et le majeur tendus serrés, l’annulaire et l’auriculaire repliés, le pouce écarté' },
  { id: 'deux-doigts-v', prise: 'pointe', options: { tendus: ['index', 'majeur'], tendu: { index: { ecart: 14 }, majeur: { ecart: -14 } } },
    vues: { bonnes: ['paume', 'auriculaire'], aEviter: [] },
    nom: 'l’index et le majeur tendus, écartés en V ; l’annulaire et l’auriculaire repliés' },
  { id: 'crochet', prise: 'crochet', options: { diametre: 20 }, table: [8, 14, 20, 28],
    vues: { bonnes: ['pouce', 'auriculaire', 'dos'], aEviter: ['paume'] },
    nom: 'les doigts repliés en crochet aux deux dernières phalanges, la paume ouverte, le pouce libre' },
  { id: 'coiffe', prise: 'coiffe', options: { diametre: 26 }, table: [18, 26, 34],
    vues: { bonnes: ['pouce'], aEviter: ['paume', 'dos'], note: 'vue dos : le bâton est sous la paume, on ne voit qu’un poing' },
    nom: 'la paume coiffe le bout d’un bâton debout, les doigts repliés autour' },
  { id: 'plat', prise: 'plat', options: {},
    vues: { bonnes: ['pouce', 'dos'], aEviter: ['paume'] },
    nom: 'la main à plat, les doigts tendus serrés, le pouce le long de l’index ; la ligne de contact droite' },
  { id: 'porte', prise: 'plat', options: { creux: 14, pouceCmc: -8, ecarts: { index: 2, majeur: 0, annulaire: 2, auriculaire: 4 } },
    vues: { bonnes: ['paume', 'pouce'], aEviter: ['dos'] },
    nom: 'la paume en l’air, les doigts tendus en léger creux : porter, recevoir' },
  { id: 'ouverte', prise: 'fixe', options: { doigts: {
      // (moteur, M7) 10° au moins entre voisins : « écart 0 » colle les doigts jusqu'à la dernière jointure, et
      // des écarts trop proches font des palmures inégales
      index: D0(5, 7, 4, 10), majeur: D0(5, 8, 5, 0), annulaire: D0(6, 9, 5, 9), auriculaire: D0(8, 11, 6, 20),
      pouce: { opposition: 8, cmc: -10, rotation: 2, mcp: 6, ip: 8 } } },
    vues: { bonnes: ['dos', 'paume', 'pouce'], aEviter: [] },
    nom: 'la main ouverte, les doigts tendus un peu écartés' },
  { id: 'relachee', prise: 'fixe', options: { doigts: {
      // (révisions R7, R12) les MCP presque égales (≈ 20°), IPP ≤ 13°, IPD ≈ 0,5 × IPP : l'arche du métacarpe
      // descend déjà l'annulaire et l'auriculaire ; une cascade aux MCP en plus les fait sortir en marches de profil
      // (la griffe). Le pouce près de l'index (opposition 10, cmc 10) : vers la paume, il dresse une griffe de plus
      index: D0(20, 10, 5, 2), majeur: D0(20, 11, 5, 0), annulaire: D0(19, 12, 6, 1), auriculaire: D0(18, 13, 6, 3),
      pouce: { opposition: 10, cmc: 10, rotation: 4, mcp: 8, ip: 10 } } },
    vues: { bonnes: ['dos', 'paume', 'pouce'], aEviter: [] },
    nom: 'la main détendue : les doigts un peu fléchis, sans marches (la paume se creuse vers l’auriculaire), le pouce le long de l’index' },
  { id: 'coupe', prise: 'fixe', options: { doigts: {
      index: D0(22, 22, 10, -1), majeur: D0(24, 24, 12, 0), annulaire: D0(26, 26, 13, -1), auriculaire: D0(30, 28, 14, -2),
      pouce: { opposition: 22, cmc: 18, rotation: 7, mcp: 10, ip: 8 } } },
    vues: { bonnes: ['pouce', 'dos'], aEviter: [] },
    nom: 'le creux de la main, les doigts serrés : il porte du grain, de l’eau' },
  { id: 'main-sur-main', prise: 'plat', options: { creux: 6, depart: { index: { mcp: 6 }, majeur: { mcp: 6 }, annulaire: { mcp: 6 }, auriculaire: { mcp: 6 } } },
    paire: { dessous: 'plat', angle: 24, decalage: [26, 6] },
    vues: { bonnes: ['dos'], aEviter: ['paume', 'pouce', 'auriculaire'] },
    nom: 'deux mains à plat l’une sur l’autre, vues du dessus : celle du dessous en gris (mainSurMain)' },
];

// ─── les couches, recalculées ici (contrôle du moteur) ───────────────────────────────────────────────────
const VUES = {
  dos: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], paume: [[1, 0, 0], [0, -1, 0], [0, 0, -1]],
  pouce: [[1, 0, 0], [0, 0, -1], [0, 1, 0]], auriculaire: [[1, 0, 0], [0, 0, 1], [0, -1, 0]],
};
const vueDe = nom => { const M = VUES[nom]; return p => [D3(M[0], p), D3(M[1], p), D3(M[2], p)]; };
function proche2(p, a, b) {
  const ab = [b[0] - a[0], b[1] - a[1]], l2 = ab[0] * ab[0] + ab[1] * ab[1] || 1e-9;
  const t = borne(((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / l2, 0, 1);
  return { t, d: Math.hypot(p[0] - a[0] - ab[0] * t, p[1] - a[1] - ab[1] * t) };
}
// pour chaque pièce : devant (true), derrière (false) ou sans recouvrement (null), dans la vue
function couches(S, pose, vue) {
  const ob = pose.objet;
  if (!ob || ob.type === 'plan') return null;
  const V = vueDe(vue), R = ob.diametre / 2, L = (ob.longueur || 1200) / 2;
  const a = V(A3(ob.centre, M3(U3(ob.axe), -L))), b = V(A3(ob.centre, M3(U3(ob.axe), L)));
  const pieces = [];
  for (const d of DOIGTS) pieces.push(...segments(S, d, chaineDoigt(S, d, pose.doigts[d])));
  const sp = segments(S, 'pouce', chainePouce(S, pose.doigts.pouce));
  pieces.push(sp[1], sp[2]);
  pieces.push({ id: 'paume', a: [12, -2, 4], b: [Math.max(...DOIGTS.map(d => S.an.doigts[d].mcp[0])) - 6, -2, 4], ray: [[[30, 30, 12, 15]], [[30, 30, 12, 15]], [[30, 30, 12, 15]]].map(x => x[0]) });
  const res = {};
  for (const P of pieces) {
    let vote = 0, poids = 0;
    const rm = (P.ray[1][0] + P.ray[1][1]) / 2;
    for (let i = 0; i <= 10; i++) {
      const p = V(I3(P.a, P.b, i / 10)), pr = proche2(p, a, b), rec = R + rm - pr.d;
      if (rec <= 0) continue;
      const zObj = a[2] + (b[2] - a[2]) * pr.t, w = Math.min(rec, 2 * Math.min(rm, R));
      vote += w * Math.sign(zObj - p[2]); poids += w;
    }
    res[P.id] = poids > 0.5 ? vote > 0 : null;
  }
  return res;
}
// la règle qui ne tombe jamais : dans une prise, vue paume, l'objet n'est pas derrière toute la main
function controle(S, pose) {
  const fautes = [];
  if (!pose.objet || pose.objet.type === 'plan') return fautes;
  const bonnes = (pose.vues && pose.vues.bonnes) || ['paume', 'dos'];
  if (bonnes.includes('paume')) {
    const c = couches(S, pose, 'paume');
    const chev = Object.entries(c).filter(([k, v]) => v !== null && k !== 'paume');
    if (chev.length && chev.every(([, v]) => v === false)) fautes.push('vue paume : l’objet derrière toute la main');
    if (c.paume === true) fautes.push('vue paume : la paume devant l’objet');
  }
  if (bonnes.includes('dos')) {
    const cd = couches(S, pose, 'dos');
    if (cd.paume === false && pose.solveur && pose.solveur.prise === 'entourer') fautes.push('vue dos : l’objet devant la paume');
  }
  return fautes;
}

// ─── poses.json : écrire, relire, interpoler ─────────────────────────────────────────────────────────────
const r1d = q => { const o = {}; for (const k of Object.keys(q)) o[k] = typeof q[k] === 'number' ? r1(q[k]) : q[k]; return o; };
const ORDRE_POUCE = ['opposition', 'cmc', 'rotation', 'mcp', 'ip'];
function arrondirDoigts(doigts) {
  const o = {};
  for (const d of DOIGTS) o[d] = r1d({ ecart: doigts[d].ecart || 0, mcp: doigts[d].mcp, ipp: doigts[d].ipp, ipd: doigts[d].ipd });
  o.pouce = {}; for (const k of ORDRE_POUCE) if (doigts.pouce[k] !== undefined) o.pouce[k] = r1(doigts.pouce[k]);
  return o;
}
const objetJSON = ob => ob ? Object.assign({ type: ob.type, diametre: r1(ob.diametre) }, ob.centre ? { centre: r1v(ob.centre) } : {}, ob.axe ? { axe: ob.axe.map(v => Math.round(v * 1000) / 1000) } : {}, ob.longueur ? { longueur: ob.longueur } : {}) : undefined;
function resoudreSpec(S, spec, diametre) {
  const opts = Object.assign({}, spec.options || {});
  if (diametre !== undefined) opts.diametre = diametre;
  return PRISES[spec.prise](S, opts);
}
function construirePose(S, spec, journal = () => {}) {
  const t0 = Date.now();
  const r = resoudreSpec(S, spec);
  const pose = { id: spec.id, nom: spec.nom, doigts: arrondirDoigts(r.doigts), poignet: { flexion: 0, deviation: 0 } };
  if (r.objet) pose.objet = objetJSON(r.objet);
  if (r.contact) pose.contact = { type: r.contact.type, points: (r.contact.points || []).map(r1v), normale: r.contact.normale ? r.contact.normale.map(v => Math.round(v * 1000) / 1000) : undefined };
  pose.solveur = Object.assign({ prise: spec.prise }, spec.options && spec.prise !== 'fixe' ? spec.options : {});
  if (spec.table && r.objet) {
    // de proche en proche, du diamètre par défaut vers les deux bouts de la table
    // la clé d'une ligne : le diamètre DEMANDÉ (pour une pince, l'écart entre les pulpes ; l'objet dessiné peut
    // être plus épais, un fil d'au moins 1,2 mm)
    const d0 = (spec.options && spec.options.diametre) || r.objet.diametre, lignes = new Map();
    const ligne = (t, d) => ({ diametre: d, doigts: arrondirDoigts(t.doigts), objet: { centre: r1v(t.objet.centre), axe: t.objet.axe.map(v => Math.round(v * 1000) / 1000) } });
    for (const sens of [1, -1]) {
      let prec = r.prec;
      const ds = spec.table.filter(d => sens > 0 ? d >= d0 : d < d0).sort((a, b) => sens * (a - b));
      for (const d of ds) {
        if (Math.abs(d - d0) < 1e-6) { lignes.set(d, ligne(r, d)); continue; }
        const t = resoudreSpec(S, Object.assign({}, spec, { options: Object.assign({}, spec.options, { prec }) }), d);
        lignes.set(d, ligne(t, d)); prec = t.prec || prec;
      }
    }
    pose.table = spec.table.slice().sort((a, b) => a - b).map(d => lignes.get(d));
  }
  if (spec.paire) pose.paire = spec.paire;
  pose.vues = spec.vues;
  const fautes = controle(S, pose);
  if (fautes.length) pose.fautes = fautes;
  journal(`${spec.id} : ${Date.now() - t0} ms${fautes.length ? ' — ' + fautes.join(' ; ') : ''}`);
  return pose;
}
function ecrirePoses(outils, fichier = path.join(__dirname, 'poses.json'), ids = null, journal = console.log) {
  const S = preparer(outils);
  let anciennes = [];
  try { anciennes = JSON.parse(fs.readFileSync(fichier, 'utf8')).poses || []; } catch (e) { /* premier passage */ }
  const poses = CATALOGUE.map(spec => (!ids || ids.includes(spec.id)) ? construirePose(S, spec, journal) : anciennes.find(p => p.id === spec.id) || construirePose(S, spec, journal));
  const doc = {
    note: 'Poses des mains simples, écrites par prises.js (node mains/prises.js --ecrire) sur le squelette de moteur.js. ' +
      'Angles en degrés (flexion positive vers la paume) ; objet dans le repère de la main (mm d’homme). table : la prise résolue ' +
      'à d’autres diamètres, que prises.resoudre interpole quand une planche passe diametre.',
    poses,
  };
  // une pose par bloc, une clé par ligne, chaque valeur sur une ligne (lisible, comparable)
  const bloc = P => '  {\n' + Object.keys(P).map(k => {
    if (k === 'table') return `    "table": [\n${P.table.map(t => '      ' + JSON.stringify(t)).join(',\n')}\n    ]`;
    if (k === 'doigts') return `    "doigts": {\n${Object.keys(P.doigts).map(d => `      "${d}": ${JSON.stringify(P.doigts[d])}`).join(',\n')}\n    }`;
    return `    ${JSON.stringify(k)}: ${JSON.stringify(P[k])}`;
  }).join(',\n') + '\n  }';
  fs.writeFileSync(fichier, `{\n "note": ${JSON.stringify(doc.note)},\n "poses": [\n${poses.map(bloc).join(',\n')}\n ]\n}\n`);
  return doc;
}

let CACHE_POSES = null;
function posesJSON() {
  const f = path.join(__dirname, 'poses.json');
  try {
    const t = fs.statSync(f).mtimeMs;
    if (!CACHE_POSES || CACHE_POSES.t !== t) CACHE_POSES = { t, v: JSON.parse(fs.readFileSync(f, 'utf8')) };
    return CACHE_POSES.v;
  } catch (e) { return null; }
}
const CACHE_RES = new Map();
// interpolation linéaire des angles et de l'objet entre deux lignes de la table
function interpoler(table, d) {
  const T = table.slice().sort((a, b) => a.diametre - b.diametre);
  if (d <= T[0].diametre) return T[0];
  if (d >= T[T.length - 1].diametre) return T[T.length - 1];
  let i = 0; while (T[i + 1].diametre < d) i++;
  const A = T[i], B = T[i + 1], t = (d - A.diametre) / (B.diametre - A.diametre);
  const mix = (a, b) => typeof a === 'number' ? a + (b - a) * t : a;
  const doigts = {};
  for (const k of Object.keys(A.doigts)) { doigts[k] = {}; for (const j of Object.keys(A.doigts[k])) doigts[k][j] = mix(A.doigts[k][j], B.doigts[k][j]); }
  return { diametre: d, doigts, objet: { centre: A.objet.centre.map((v, j) => mix(v, B.objet.centre[j])), axe: U3(A.objet.axe.map((v, j) => mix(v, B.objet.axe[j]))) } };
}

// les tables de toutes les poses résolues pareil (même prise, mêmes options hors diamètre), mises bout à bout :
// prise-manche (8 à 45 mm) et prise-grosse (50 à 90 mm) font une seule table de 8 à 90
const CACHE_TABLES = new Map();
function tableCommune(pose, base) {
  const pj = posesJSON();
  if (!pj || !pose.solveur) return null;
  const sans = so => JSON.stringify(Object.keys(so).filter(k => k !== 'diametre' && k !== 'prec').sort().map(k => [k, so[k]]));
  const cle = sans(pose.solveur) + ':' + (CACHE_POSES && CACHE_POSES.t);
  if (CACHE_TABLES.has(cle)) return CACHE_TABLES.get(cle);
  const lignes = [];
  for (const p of pj.poses || []) if (p.table && p.solveur && sans(p.solveur) === sans(pose.solveur)) lignes.push(...p.table);
  const vus = new Set(), T = lignes.sort((a, b) => a.diametre - b.diametre).filter(l => !vus.has(l.diametre) && vus.add(l.diametre));
  const res = T.length > 1 ? T : null;
  CACHE_TABLES.set(cle, res);
  return res;
}
// l'appel du moteur (voir l'en-tête)
function resoudre(pose, outils) {
  if (!pose || !pose.solveur || !pose.objet || pose.solveur.prise === 'fixe') return null;
  const base = pose.id ? ((posesJSON() || {}).poses || []).find(p => p.id === pose.id) : null;
  const d = pose.objet.diametre;
  let age = { kL: 1, kW: 1, cle: 'homme' };
  try { age = outils.squelette({ doigts: {} }).age || age; } catch (e) { /* défaut */ }
  const enfant = Math.abs(age.kW - 1) > 1e-6 || Math.abs(age.kL - 1) > 1e-6;
  const d0 = base && base.objet ? base.objet.diametre : (pose.solveur.diametre || d);
  if (!enfant && Math.abs(d - d0) < 1e-6) return null;              // la pose telle qu'écrite
  if (!enfant && base && base.solveur && base.solveur.diametre !== undefined && Math.abs(d - base.solveur.diametre) < 1e-6) return null;
  // les angles demandés à part (option doigts de mainSimple) : ceux qui diffèrent de poses.json
  const surcharges = {};
  if (base) for (const k of Object.keys(pose.doigts || {})) for (const j of Object.keys(pose.doigts[k] || {}))
    if (base.doigts[k] && base.doigts[k][j] !== pose.doigts[k][j]) (surcharges[k] = surcharges[k] || {})[j] = pose.doigts[k][j];
  // le diamètre vu par une main d'homme ; une pince garde son écart demandé (le fil dessiné a au moins 1,2 mm)
  const dDem = (base && base.solveur && base.solveur.diametre !== undefined && Math.abs(d - d0) < 1e-6) ? base.solveur.diametre : d;
  const dEq = dDem / age.kW;
  let r = null;
  const table = tableCommune(pose, base) || (base && base.table) || pose.table;
  if (table && table.length > 1) {
    const T = table.slice().sort((a, b) => a.diametre - b.diametre);
    {
      // hors de la table : on la borne (rapide) plutôt que de résoudre en direct ; les bouts de table couvrent
      // les planches (inventaire : 8 à 90 mm pour les prises, 0,5 à 10 pour les pinces)
      const t = interpoler(T, borne(dEq, T[0].diametre, T[T.length - 1].diametre));
      r = { doigts: t.doigts, objet: { centre: [t.objet.centre[0] * age.kL, t.objet.centre[1] * age.kW, t.objet.centre[2] * age.kW], axe: t.objet.axe } };
    }
  }
  if (!r) {                                                            // hors table : on résout, et on garde
    const cle = JSON.stringify([pose.id, pose.solveur, r1(d), age.cle]);
    r = CACHE_RES.get(cle);
    if (!r) {
      const S = preparer(outils);
      const spec = { prise: pose.solveur.prise, options: Object.assign({}, pose.solveur) };
      delete spec.options.prise;
      const t = resoudreSpec(S, spec, d);
      r = { doigts: t.doigts, objet: t.objet };
      CACHE_RES.set(cle, r);
      if (CACHE_RES.size > 200) CACHE_RES.delete(CACHE_RES.keys().next().value);
    }
  }
  const doigts = JSON.parse(JSON.stringify(r.doigts));
  for (const k of Object.keys(surcharges)) doigts[k] = Object.assign({}, doigts[k], surcharges[k]);
  // un axe d'objet demandé à part (option objetPose de mainSimple : un lacet qui sort de la pince dans une autre
  // direction que le fil de la pose) : on le garde, la table ne donne que les angles et le centre
  if (base && base.objet && base.objet.axe && pose.objet.axe && pose.objet.axe.some((v, j) => Math.abs(v - base.objet.axe[j]) > 1e-3)) r = Object.assign({}, r, { objet: Object.assign({}, r.objet, { axe: pose.objet.axe }) });
  // une sphère de pince (la bosse, la pâte) garde son rapport au jour demandé (pinceDessus : 0,6 × d)
  const kS = pose.objet.type === 'sphere' && base && base.objet && base.solveur && base.solveur.diametre ? base.objet.diametre / base.solveur.diametre : 1;
  return Object.assign({}, pose, { doigts, objet: Object.assign({}, pose.objet, { centre: r.objet.centre, axe: r.objet.axe, diametre: d * kS }) });
}

// ─── deux mains ────────────────────────────────────────────────────────────────────────────────────────────
// Deux mains sur un même manche (la hache, la pelle, la plane). Chaque main est posée par mainSimple sur l'axe du
// manche : son ancre 'prise' à la fraction t du manche, son angle tel que l'axe de sa prise suive le manche. Le
// moteur rend chaque main en couches (.couches = { main, masque, devant }) ; on les peint dans l'ordre : les deux
// corps de main, les deux masques, le manche une seule fois, puis les deux devants. Le manche passe ainsi DANS
// chacun des deux poings. (Sans .couches, repli : le manche peint par la première main, et par la seconde près
// d'elle seulement, dans un clipPath.)
//   manche  { x0, y0, x1, y1, r } (unités de vue) ; mains [{ t, vue, cote, pose, diametre, sens, … }] ; objet g => SVG
function deuxMains(mainSimple, o) {
  const { manche } = o;
  const ang = Math.atan2(manche.y1 - manche.y0, manche.x1 - manche.x0) / RAD;
  const res = [], geos = [];
  const dessin = gg => (typeof o.objet === 'function' ? o.objet(Object.assign({}, gg, { manche })) : String(o.objet || ''));
  for (const m of o.mains) {
    const x = manche.x0 + (manche.x1 - manche.x0) * m.t, y = manche.y0 + (manche.y1 - manche.y0) * m.t;
    const base = Object.assign({ pose: 'prise-manche', echelle: o.echelle || 1 }, m, { x, y, ancre: 'prise' });
    delete base.t; delete base.sens;
    // l'angle de la main tel que l'axe de sa prise tombe sur le manche (dans un sens ou dans l'autre)
    const essai = mainSimple(Object.assign({}, base, { angle: 0 }));
    let a = ang - essai.prise.angle;
    if (m.sens === -1) a += 180;
    const g = mainSimple(Object.assign({}, base, { angle: a, objet: '' }));
    res.push({ g, base, a }); geos.push(g);
  }
  let svg;
  if (res.every(r => r.g.couches)) {
    const k = key => res.map(r => r.g.couches[key] || '').filter(Boolean).join('\n');
    // la géométrie passée à l'objet : celle que le moteur lui passe (la prise, plus ce qui l'accompagne) ; pas
    // Object.assign(main, prise) : le .coupe de la main (les coins de la coupe de l'avant-bras) y écrasait
    // l'absence de .prise.coupe, et l'objet se dessinait comme coupé, loin du manche
    const g0 = geos[0];
    const gObj = g0.prise ? Object.assign({}, g0.prise, { prise: g0.prise, poignet: g0.poignet, bout: g0.bout, pouce: g0.pouce, echelle: g0.echelle, vue: g0.vue, geo: g0 }) : g0;
    svg = [k('main'), k('masque'), dessin(gObj), k('devant')].filter(Boolean).join('\n');
  } else {
    const out = [];
    res.forEach((r, i) => {
      if (i === 0) out.push(String(mainSimple(Object.assign({}, r.base, { angle: r.a, objet: dessin }))));
      else {
        const b = r.g.boite, id = `deuxMains-${i}-${Math.round(b.x0)}-${Math.round(b.y0)}`;
        out.push(`<clipPath id="${id}"><rect x="${r1(b.x0 - 2)}" y="${r1(b.y0 - 2)}" width="${r1(b.x1 - b.x0 + 4)}" height="${r1(b.y1 - b.y0 + 4)}"/></clipPath>`,
          String(mainSimple(Object.assign({}, r.base, { angle: r.a, objet: gg => `<g clip-path="url(#${id})">${dessin(gg)}</g>` }))));
      }
    });
    svg = out.join('\n');
  }
  return { svg, toString() { return svg; }, mains: geos };
}
// Deux mains à plat l'une sur l'autre, vues du dessus (vue dos) : celle du dessous en gris (loin), celle du
// dessus par-dessus, tournée de `angle` et décalée de `decalage` (mm, dans le repère de la main du dessous).
//   { x, y, angle (degrés : l'axe de la main du dessous à l'écran), echelle, cote ('droite' : la droite dessous),
//     croise (degrés, défaut de poses.json), decalage [dx, dy] }
function mainSurMain(mainSimple, o) {
  const pj = (posesJSON() || {}).poses || [];
  const P = (pj.find(p => p.id === 'main-sur-main') || {}).paire || { dessous: 'plat', angle: 24, decalage: [26, 6] };
  const s = o.echelle || 1, a0 = o.angle || 0, m = o.cote === 'gauche' ? -1 : 1;
  const croise = o.croise !== undefined ? o.croise : P.angle, dec = o.decalage || P.decalage;
  const c = Math.cos(a0 * RAD), sn = Math.sin(a0 * RAD), dx = dec[0] * s, dy = m * dec[1] * s;
  // les deux avant-bras coupés à une même droite (avantbras.fin du moteur), perpendiculaire à la main du dessous, à
  // o.coupe mm (défaut 80) en arrière de son poignet : sans elle, l'avant-bras gris du dessous finissait en carte à
  // côté de celui du dessus (agent 5, tour 3). o.fin : une autre droite [[x, y], [x, y]] ; o.fin = false : sans.
  let fin = o.fin;
  if (fin === undefined) {
    const Lc = (o.coupe !== undefined ? o.coupe : 80) * s, C = [o.x - c * Lc, o.y - sn * Lc], W = 400 * s;
    fin = [[C[0] + sn * W, C[1] - c * W], [C[0] - sn * W, C[1] + c * W]];
  }
  const ab = q => { const a = Object.assign({ longueur: fin ? 200 : 90 }, (q || {}).avantbras || {}); if (fin && !a.fin) a.fin = fin; return a; };
  const dessous = mainSimple(Object.assign({}, o.dessous || {}, { avantbras: ab(o.dessous), x: o.x, y: o.y, pose: P.dessous, vue: 'dos', cote: o.cote, angle: a0, echelle: s, ancre: 'poignet', loin: true }));
  const x2 = o.x + dx * c - dy * sn, y2 = o.y + dx * sn + dy * c;
  const dessus = mainSimple(Object.assign({}, o.dessus || {}, { avantbras: ab(o.dessus), x: x2, y: y2, pose: 'main-sur-main', vue: 'dos', cote: o.cote === 'gauche' ? 'droite' : 'gauche', angle: a0 - m * croise, echelle: s, ancre: 'poignet' }));
  const svg = `${dessous}\n${dessus}`;
  return { svg, toString() { return svg; }, dessous, dessus };
}

// ─── deux pinces sur un lacet ───────────────────────────────────────────────────────────────────────────────
// Deux mains qui tirent les deux bouts d'un lacet pour serrer un nœud (24-16). Posées à la main, deux pinces à
// 60 mm l'une de l'autre se mêlent : une main de profil fait 60 à 80 mm d'épaisseur. Ici :
//   1. chaque main pince son bout, le poignet du côté opposé au nœud : la droite du poignet au point de pince suit
//      le lacet et l'avant-bras la prolonge (on tire dans l'axe de l'avant-bras ; o.aligne: 'fil' aligne plutôt
//      l'axe du fil de la pose, .prise.axe, pour une aiguille) ;
//   2. le côté de chaque main (cote 'droite' ou 'gauche', le miroir par l'axe de la main) est choisi pour que sa
//      masse (la paume, les doigts repliés) tombe HORS de l'angle des deux lacets ;
//   3. les deux points de pince reculent ensemble le long de leur lacet, depuis o.distance, jusqu'à ce que les deux
//      silhouettes (avant-bras compris) soient à o.marge l'une de l'autre.
// Conseil de mise en vue : écarter les deux lacets d'au moins 90° (chaque main tire dans sa direction : l'une
// monte, l'autre part de côté). À 36° d'écart, il faut ~2,5 longueurs de main entre le nœud et les pinces.
//   o = { noeud: [x, y], directions: [[ux, uy], [ux, uy]] (du nœud vers chaque main), distance (départ, en unités
//         de vue ; défaut 40 mm), pas (défaut 4 mm), max (défaut 400 mm), marge (défaut 12 mm), lacet (son diamètre,
//         mm, défaut 5 : la pince s'ouvre d'autant), pose ('pince-fine'),
//         vue ('pouce'), echelle, cotes (forcer ['droite', 'gauche']), et le reste pour mainSimple (age, trait,
//         avantbras : { longueur }, …) ; objets: [P => objet, P => objet] (l'objet de chaque main, selon son point de
//         pince : le lacet du nœud à P, que le moteur peint à sa profondeur entre les doigts) }
//   → { points: [P1, P2], distance (unités de vue), ecart (le jeu entre les mains), options: [o1, o2] (prêtes pour
//       mainSimple), mains: [m1, m2], svg }
// La planche tire chaque lacet du nœud jusqu'à son point de pince, puis peint les deux mains (svg).
function silhouetteDe(m) {
  const t = String(m.couches ? m.couches.main : m), i = t.indexOf(' d="');
  if (i < 0) return [];
  const d = t.slice(i + 4, t.indexOf('"', i + 4)), out = [];
  const re = /([ML])\s*(-?[\d.]+)[ ,](-?[\d.]+)/g;
  let k, n = 0;
  while ((k = re.exec(d))) { if (k[1] === 'M' && n++ > 0) break; out.push([+k[2], +k[3]]); }
  return out;
}
function jeuPolygones(A, B) {
  // le jeu entre deux polygones (négatif s'ils se recouvrent) : la plus courte distance sommet–arête, dans les
  // deux sens, et l'inclusion d'un sommet dans l'autre polygone
  const dedans = (p, Q) => { let c = false; for (let i = 0, j = Q.length - 1; i < Q.length; j = i++) {
    const a = Q[i], b = Q[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  const dSeg = (p, a, b) => { const vx = b[0] - a[0], vy = b[1] - a[1], l2 = vx * vx + vy * vy || 1;
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / l2)); return Math.hypot(p[0] - a[0] - t * vx, p[1] - a[1] - t * vy); };
  let m = Infinity;
  for (const [P, Q] of [[A, B], [B, A]]) for (const p of P) {
    if (dedans(p, Q)) return -1;
    for (let i = 0, j = Q.length - 1; i < Q.length; j = i++) m = Math.min(m, dSeg(p, Q[j], Q[i]));
  }
  return m;
}
function pincesSurLacet(mainSimple, o) {
  const s = o.echelle || 1, N = o.noeud;
  const V = o.directions.map(v => { const l = Math.hypot(v[0], v[1]); return [v[0] / l, v[1] / l]; });
  const reste = Object.assign({}, o);
  for (const k of ['noeud', 'directions', 'distance', 'pas', 'max', 'marge', 'cotes', 'objets', 'aligne', 'lacet', 'x', 'y', 'angle']) delete reste[k];
  const base = Object.assign({ pose: 'pince-fine', vue: 'pouce', ancre: 'prise' }, reste, { echelle: s });
  const rot = (p, a) => { const c = Math.cos(a), sn = Math.sin(a); return [p[0] * c - p[1] * sn, p[0] * sn + p[1] * c]; };
  const croix = (a, b) => a[0] * b[1] - a[1] * b[0];
  // l'angle et le côté de chaque main
  const regl = V.map((v, k) => {
    const autre = V[1 - k], cotes = o.cotes ? [o.cotes[k]] : ['droite', 'gauche'];
    let best = null;
    for (const cote of cotes) {
      const g0 = mainSimple(Object.assign({}, base, { cote, x: 0, y: 0, angle: 0, avantbras: false, objet: '' }));
      const ax = g0.prise.axe, w0 = g0.poignet, sil = silhouetteDe(g0);
      const c0 = sil.reduce((a, p) => [a[0] + p[0] / sil.length, a[1] + p[1] / sil.length], [0, 0]);
      for (const sens of (o.aligne === 'fil' ? [1, -1] : [0])) {
        // 'poignet' (défaut) : la droite du poignet au point de pince suit le lacet, on tire dans l'axe de
        // l'avant-bras ; 'fil' : l'axe du fil de la pose (.prise.axe) suit le lacet (pour une aiguille, une épingle)
        const t = [-v[0] * (sens || 1), -v[1] * (sens || 1)];
        const a = Math.atan2(t[1], t[0]) - (sens ? Math.atan2(ax[1], ax[0]) : Math.atan2(-w0[1], -w0[0]));
        const w = rot(w0, a), c = rot(c0, a);
        if (w[0] * v[0] + w[1] * v[1] <= 0) continue;                  // le poignet du côté du nœud : non
        const dehors = Math.sign(croix(v, c)) !== Math.sign(croix(v, autre));
        const note = (dehors ? 0 : 10) + (o.cotes ? 0 : (cote === (k ? 'gauche' : 'droite') ? 0 : 0.1));
        if (!best || note < best.note) best = { cote, angle: a / RAD, note };
      }
    }
    return best;
  });
  const opts = L => V.map((v, k) => {
    const P = [N[0] + v[0] * L, N[1] + v[1] * L];
    const ab = o.avantbras === false ? false : Object.assign({ longueur: 85, vers: [P[0] + v[0] * 2000, P[1] + v[1] * 2000] }, o.avantbras || {});
    // l'axe du fil de la pose, remis dans la direction du lacet (dans le plan de la vue) : le moteur décide alors
    // juste ce qui passe devant le lacet (le pouce le couvre à la pince) ; sans ça, son fil de 120 mm en travers
    // de la main repeint des pièces et découpe le contour là où le lacet ne passe pas
    const a = regl[k].angle * RAD, d0 = rot([-v[0], -v[1]], -a);
    if (regl[k].cote === 'gauche') d0[1] = -d0[1];
    const vue = base.vue || 'dos';
    const axe = vue === 'pouce' ? [d0[0], 0, -d0[1]] : vue === 'auriculaire' ? [d0[0], 0, d0[1]] : vue === 'paume' ? [d0[0], -d0[1], 0] : [d0[0], d0[1], 0];
    return Object.assign({ masque: false }, base, { cote: regl[k].cote, angle: regl[k].angle, x: P[0], y: P[1], avantbras: ab,
      objetPose: Object.assign({ axe, longueur: 2 * L / s, diametre: o.lacet || 5 }, base.objetPose || {}) }, o.objets ? { objet: o.objets[k](P) } : {});
  });
  const marge = (o.marge !== undefined ? o.marge : 12) * s, pas = (o.pas || 4) * s, max = (o.max || 400) * s;
  let L = (o.distance !== undefined ? o.distance : 40 * s), jeu = -1, mains = null;
  for (; L <= max; L += pas) {
    const op = opts(L);
    mains = op.map(x => mainSimple(Object.assign({}, x, { objet: '' })));
    jeu = jeuPolygones(silhouetteDe(mains[0]), silhouetteDe(mains[1]));
    if (jeu >= marge) break;
  }
  const options = opts(L);
  mains = options.map(x => mainSimple(x));
  const svg = mains.map(String).join('\n');
  return { points: options.map(x => [x.x, x.y]), distance: L, ecart: jeu, options, mains, svg, toString() { return svg; } };
}

module.exports = {
  resoudre, CATALOGUE, ecrirePoses, construirePose, couches, controle, deuxMains, mainSurMain, pincesSurLacet, interpoler,
  // la géométrie, pour les essais et le moteur
  A3, S3, M3, D3, X3, L3, U3, I3, rot3, orth, RAD, DOIGTS,
  preparer, chaineDoigt, chainePouce, segments, rayonVers, OBST, paumeObstacle, ecart, ecartMin, obstSegments,
  fermer, fermerDoigt, fermerPouce, peauEn, pulpe, cherche, chercheGlobal, pouceEnroule, pouceAutour, pouceManche, pouceEnFace, pouceVers, pouceSurPhalanges, pouceLong, PRISES, peau,
};

// ─── la ligne de commande ─────────────────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const M = require('./moteur');
  const outils = { squelette: (p, oo) => M.squelette(p, oo || {}), anatomie: M.ANATOMIE, formes: M.formes(), demiAxes: M.demiAxes, enrouler: M.enrouler };
  const arg = process.argv.slice(2);
  if (arg[0] === '--ecrire') { const ids = arg.slice(1); ecrirePoses(outils, undefined, ids.length ? ids : null); }
  else if (arg[0] === '--voir') { const S = preparer(outils); const spec = CATALOGUE.find(c => c.id === arg[1]); console.log(JSON.stringify(construirePose(S, spec), null, 1)); }
  else console.log('node prises.js --ecrire [id…] | --voir id');
}
