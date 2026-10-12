'use strict';
// Planche 37-07 — Trois étirements du soir. Chapitre 37, étape 62 (et 63 pour la manière).
//
// Tout vient de l'étape 62 : l'arrière de la cuisse (assis sur le banc, une jambe allongée, le
// tronc penché en avant à partir des hanches, le dos droit) ; l'avant de la cuisse (debout, une
// main au mur, l'autre attrape la cheville et amène le talon vers la fesse, genoux côte à côte) ;
// le bas du dos (couché sur le dos, les bras ramènent les deux genoux vers la poitrine). Aucune
// cote : ce sont des gestes, rien ne se construit. La hauteur du banc et du mur n'est qu'un
// dessin.
//
// Les personnages viennent de formes.js. Il n'a que debout, accroupi, genoux et genou : on lui
// prête trois postures au chargement, sans toucher au fichier (même méthode que 24-02), et
// quelques réglages que la posture porte elle-même : un dos redressé (troncDos), l'angle du cou,
// un visage sans bosses, des jambes repliées en deux pièces, et une retouche des pièces (retirer
// le bras loin, poser un bras dessiné à part). Repère d'une posture : mm, sol en y = 0, regard
// vers +x.
//
// Passe qualité (28 septembre) : dos droit en bloc à 45° sur le banc, le bras loin retiré (il
// faisait un triangle sous le bras) ; le bras qui tient la cheville s'arrête au poignet, caché
// derrière la cheville ; le personnage couché refait : dos à plat, tête au sol, cuisses contre
// le ventre, tibias à peu près à plat, un bras en deux morceaux et une main fermée sur les tibias.
const fs = require('fs'), path = require('path');

const RAD = Math.PI / 180;
const tourne = (p, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
const plus = (a, b) => [a[0] + b[0], a[1] + b[1]], moins = (a, b) => [a[0] - b[0], a[1] - b[1]], fois = (a, k) => [a[0] * k, a[1] * k];
const dir = deg => [Math.cos(deg * RAD), Math.sin(deg * RAD)];
const uni = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
const angle = a => Math.atan2(a[1], a[0]) / RAD;
// une ligne droite échantillonnée : Catmull-Rom la garde droite entre ses points du milieu
const droite = (a, b, ts) => ts.map(t => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);

// Le genou entre la hanche H et la cheville A (cuisse 440, jambe 430) ; choix : garde la solution voulue.
function genou(H, A, choix, L1 = 440, L2 = 430) {
  const d = Math.min(Math.hypot(A[0] - H[0], A[1] - H[1]), L1 + L2 - 0.5), u = uni(moins(A, H));
  const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d), hh = Math.sqrt(Math.max(0, L1 * L1 - a * a));
  const b = plus(H, fois(u, a)), n = [-u[1], u[0]];
  const k1 = plus(b, fois(n, hh)), k2 = moins(b, fois(n, hh));
  return choix(k1, k2) ? k1 : k2;
}
// Les largeurs du bras de formes.js (bras, avant-bras), lues au chargement.
let BRAS = null, OUTILS = null;
// un bras en deux morceaux, de l'épaule S au bout B, le coude en E ; fin : 'rond' ou 'ouvert'
function brasDeux(S, E, B, fin, bout = null) {
  const dos = [BRAS.dos[0], [BRAS.dos[1][0], bout ? bout[0] : BRAS.dos[1][1]]];
  const ventre = [BRAS.ventre[0], [BRAS.ventre[1][0], bout ? bout[1] : BRAS.ventre[1][1]]];
  return OUTILS.tube({ pts: [S, E, B], sens: -1, dos, ventre, coussin: BRAS.coussin.slice(0, 2), bout: fin, baseRonde: true });
}
// une pièce passée d'un repère à l'autre
const bouge = (pc, f) => {
  const m = cmds => cmds.map(c => [c[0], ...c.slice(1).map(f)]);
  return { ...pc, remp: pc.remp ? m(pc.remp) : pc.remp, trait: pc.trait.map(m), det: (pc.det || []).map(m) };
};

// ─── 1. L'arrière de la cuisse : assis en long sur le banc ────────────────────────────────
// La jambe proche allongée sur le banc, le talon posé ; la jambe loin descend de l'autre côté du
// banc, le pied à plat au plancher (on n'en voit que la jambe, sous le banc). Le tronc penche
// d'un bloc de 45° à partir des hanches (bassin 1 : tout le tronc tourne ensemble) et son dos est
// une droite, du haut de la fesse à la base du cou ; le cou et la tête suivent la même ligne. Les
// avant-bras reposent le long de la cuisse, les mains sur le genou : le coude revient contre la
// hanche et le bras couvre le pli du ventre, sans laisser de pointe de vide sous le bras. Le bras
// loin, caché derrière le proche, est retiré.
const BANC = 450;                                  // dessus du banc, mm (dessin seulement)
const I = { lean: 45 };
I.H = [0, -(BANC + 95)];
I.A = [869, -BANC - 58];
I.K = genou(I.H, I.A, (a, b) => a[1] < b[1]);
I.Kl = [290, -520]; I.Al = [318, -85];
I.dosA = [-118, -60]; I.dosB = [-104, -480];       // la droite du dos, dans le repère du tronc
const DOS_DROIT = [[-74, 104], [-102, 58], [-121, -8], ...droite(I.dosA, I.dosB, [0, 0.12, 0.3, 0.5, 0.7, 0.88, 1]), [-88, -518], [-68, -540]];
const ISCHIOS = { H: I.H, penche: I.lean, regard: 27, cou: 53, assis: true, bassin: 1, troncDos: DOS_DROIT,
  proche: { K: I.K, A: I.A, pied: -86 }, loin: { K: I.Kl, A: I.Al, pied: 0 },
  mains: { proche: [[470, -600], [1, 0.06]], loin: [[470, -600], [1, 0.06]] }, coude: -1,
  retouche: (pieces, c) => { pieces.splice(pieces.indexOf(c.bl), 1); } };

// ─── 2. L'avant de la cuisse : debout, face au mur ────────────────────────────────────────
// Debout sur la jambe loin ; la cuisse proche verticale, son genou à côté de l'autre (de profil,
// l'un cache l'autre) ; la jambe repliée vers l'arrière, le talon vers la fesse. La jambe repliée
// se dessine en deux pièces (jambeRepliee) : le mollet passe derrière la cuisse au lieu de la
// traverser. La main loin à plat au mur. Le bras proche, tendu vers l'arrière, s'arrête au
// poignet : il passe derrière la cheville et le talon, qui cachent la main (le poignet est posé
// dans le talon, à portée d'un bras tendu, et le bout arrondi reste dans le pied).
const MUR = 575;                                   // face du mur, mm devant la hanche
const Q = { lean: 3 };
Q.H = [0, -950];
Q.K = [4, -512];
Q.u = dir(-124);                                   // la jambe repliée, 34° en arrière de la verticale
Q.A = plus(Q.K, fois(Q.u, 430));
Q.pied = 165;                                      // la plante vers le haut, les orteils vers l'arrière
Q.W = plus(Q.A, tourne([-25, 45], Q.pied));        // le poignet, caché dans le talon
Q.Wl = [MUR - 27, -1398]; Q.Dl = [0.06, -1];
const QUADRICEPS = { H: Q.H, penche: Q.lean, regard: 0, replie: true,
  proche: { K: Q.K, A: Q.A, pied: Q.pied }, loin: { K: [-4, -515], A: [-10, -85], pied: 0 },
  mains: { proche: [Q.W, [-0.4, 1]], loin: [Q.Wl, Q.Dl] }, coude: -1,
  retouche: (pieces, c) => {
    // le bras proche en deux morceaux, tendu ; posé avant la jambe proche, qui passe devant lui
    const b = brasDeux(c.S, Q.E, Q.Wr, 'rond');
    pieces.splice(pieces.indexOf(c.bpr), 1);
    pieces.splice(pieces.indexOf(c.jp[0]), 0, b);
  } };
// l'épaule proche (le tronc penché de 3°, l'épaule tourne en entier) ; le coude et le poignet
Q.S = plus(Q.H, tourne([-14, -470], Q.lean));
const brasQ = () => { const [, E, W] = OUTILS.ik2(Q.S, BRAS.L[0], BRAS.L[1], Q.W, -1); Q.E = E; Q.Wr = W; };

// ─── 3. Le bas du dos : couché sur le dos, les genoux à la poitrine ───────────────────────
// Le personnage se construit debout, le tronc droit, puis tourne de -90° : la tête à gauche, le
// visage vers le haut. Repère « couché » : x vers les pieds, y vers le bas, la hanche en 0 0.
// Le dos à plat (troncDos). Le cou dans l'axe du dos, la tête renversée de 15°, le menton en
// l'air : l'arrière du crâne se pose au sol et la gorge reste ouverte (tête droite, le menton
// tombait sur la poitrine et la gorge faisait une fente). Le visage d'un seul trait (visage).
// Les cuisses pliées de 148° couchent sur le ventre, les genoux au-dessus de la poitrine ; les
// tibias remontent de 16° vers les pieds, à peu près à plat. Les deux jambes en deux pièces
// (jambeRepliee) : la cuisse finit en rond par-dessus le tibia (d'un seul tube, le jarret de
// formes.js faisait une boucle). Le ventre commence sous la cuisse (troncFace sans l'aine, qui
// dépassait sur la fesse). Le bras proche : le bras le long du corps, le coude près du sol,
// l'avant-bras qui monte devant la cuisse et le mollet ; la main (prise vue du dos, formes.js)
// fermée sur le tibia juste sous le genou, les doigts passés par-dessus. Le bras loin est
// derrière le corps : retiré.
const D = { ang: -90 };
const COUCHE = p => tourne(p, D.ang), DEBOUT = l => tourne(l, -D.ang);
D.H = [0, 0];
D.pente = 16;                                      // le tibia, couché : 16° au-dessus de l'horizontale
D.K = fois(dir(-58), 440);                         // la cuisse, 148° de la verticale vers l'avant
D.tib = DEBOUT(dir(-D.pente));
D.A = plus(D.K, fois(D.tib, 430));
D.pied = angle(D.tib) - 90 + 40;                   // le pied tendu de 40°
D.decal = [-10, -16];                              // la jambe loin : un peu plus haut, vers la tête (couché)
D.lK = COUCHE(D.K); D.lA = COUCHE(D.A);
// la main sur le tibia proche, à 100 mm du genou, le trou à 14 mm sous le devant du tibia
D.devant = dir(-D.pente - 90);                     // le devant du tibia, couché (vers le haut)
D.prise = plus(plus(D.lK, fois(dir(-D.pente), 100)), fois(D.devant, 30));
D.angMain = -96;                                   // la main tournée : l'avant-bras descend vers le coude
D.coudeY = 48;                                     // le coude, couché : 48 mm sous l'axe de la hanche
D.dos = [[-74, 104], [-102, 58], [-121, -8], ...droite([-122, -80], [-122, -380], [0, 0.25, 0.5, 0.75, 1]), [-120, -430], [-104, -492], [-70, -540]];
// la main (prise, vue du dos), placée dans le repère couché : x, y le centre du tibia tenu
function mainCouchee() {
  const R = 16;
  const g = OUTILS.POSES['prise/dos'](R, { bras: 20 });
  const pre = g.trou.pente ? Math.atan(g.trou.pente) / RAD : 0;
  const c0 = tourne([g.trou.x, g.trou.y], pre);
  const T = p => plus(D.prise, tourne(moins(tourne(p, pre), c0), D.angMain));
  return { g, T, coupe: T(g.bras), poignet: T(g.poignet) };
}
const DOS = { H: D.H, penche: 0, regard: -15, cou: -2, assis: true, bassin: 0.85, troncDos: D.dos, replie: true, replieLoin: true,
  proche: { K: D.K, A: D.A, pied: D.pied },
  loin: { K: plus(D.K, DEBOUT(D.decal)), A: plus(D.A, DEBOUT(D.decal)), pied: D.pied },
  mains: { proche: [[300, -300], [0, 1]], loin: [[300, -300], [0, 1]] }, coude: -1,
  // le visage d'un seul trait, du crâne au menton : le front, un nez doux, la bouche fermée
  visage: (TH, TETE) => {
    const c = OUTILS.lisse([[-50, 60], [-77, 32], [-91, -22], [-80, -84], [-24, -124], [36, -119], [81, -86], [96, -48],
      [100, -26], [106, -8], [111, 8], [108, 21], [104, 31], [104, 46], [101, 62], [99, 78], [91, 94], [74, 101], [58, 103]])
      .map(k => [k[0], ...k.slice(1).map(TH)]);
    return { remp: [...c, ['L', TH([10, 92])], ['L', TH(TETE.nuque)], ['Z']], trait: [c],
      det: TETE.oreille.map(l => l.map(k => [k[0], ...k.slice(1).map(TH)])) };
  },
  retouche: (pieces, c) => {
    pieces.splice(pieces.indexOf(c.bl), 1);
    pieces.splice(pieces.indexOf(c.bpr), 1);
    const m = mainCouchee();
    const df = uni(moins(m.coupe, m.poignet));        // l'avant-bras, du poignet vers le coude
    const Sl = COUCHE(c.S);
    const E = plus(m.coupe, fois(df, (D.coudeY - m.coupe[1]) / df[1]));
    D.S = Sl; D.E = E; D.coupe = m.coupe;
    // l'avant-bras finit sous le bout de manche de la main, à sa largeur (33 et 34 mm)
    const bout = plus(m.coupe, fois(df, -6));
    pieces.push(brasDeux(DEBOUT(Sl), DEBOUT(E), DEBOUT(bout), 'ouvert', [33.5, 33.5]));
    for (const pc of m.g.pieces) pieces.push(bouge({ ...pc, ep: pc.ep || 0.7, epDet: pc.epDet || 0.5 }, p => DEBOUT(m.T(p))));
  } };

const POSTURES = { ischios: ISCHIOS, quadriceps: QUADRICEPS, genouxPoitrine: DOS };

function formesEtirees(h) {
  let src = fs.readFileSync(path.join(__dirname, '..', '..', '.claude', 'skills', 'planches', 'scripts', 'formes.js'), 'utf8');
  const remplace = (cle, par) => {
    if (!src.includes(cle)) throw new Error(`37-07 : formes.js n’a plus « ${cle.trim()} » ; revoir les postures`);
    src = src.replace(cle, par);
  };
  remplace('const POSTURES = {', 'const POSTURES = { ...h.posturesEnPlus,');
  // la jambe repliée : cuisse et jambe en deux pièces, la jambe d'abord, la cuisse par-dessus
  remplace('  function bras(S, cible, dirMain, coude) {', `  function jambeRepliee(Hh, K, A, angPied, ouvre, base = 90) {
    const cuisse = tube({ pts: [Hh, K], sens: 1, dos: [JAMBE.dos[0]], ventre: [JAMBE.ventre[0]], coussin: [0], bout: 'rond', base, plis: false, ouvre });
    const tibia = tube({ pts: [K, A], sens: 1, dos: [JAMBE.dos[1]], ventre: [JAMBE.ventre[1]], coussin: [JAMBE.coussin[1]], bout: 'ouvert', base: 0, plis: false });
    const u = uni(sub(A, K)), n = gau(u);
    return [tibia, piedPiece(A, add(A, mul(n, JAMBE.dos[1][1])), sub(A, mul(n, JAMBE.ventre[1][1])), angPied), cuisse];
  }
  function bras(S, cible, dirMain, coude) {`);
  remplace('const jp = jambe(H, P.proche.K', 'const jp = (P.replie ? jambeRepliee : jambe)(H, P.proche.K');
  remplace('jl = jambe(Hl, P.loin.K', 'jl = (P.replieLoin ? jambeRepliee : jambe)(Hl, P.loin.K');
  // la posture porte ses réglages : dos, ventre, cou, visage, retouche des pièces
  remplace('const dos = TRONC.dos.map(TT), face = TRONC.face.map(TT);', 'const dos = (P.troncDos || TRONC.dos).map(TT), face = (P.troncFace || TRONC.face).map(TT);');
  remplace('dCou = tourne([0, -1], lean * 0.5 + 10);', 'dCou = tourne([0, -1], P.cou != null ? P.cou : lean * 0.5 + 10);');
  remplace('const tete = tetePiece(TH);', 'const tete = P.visage ? P.visage(TH, TETE) : tetePiece(TH);');
  remplace('const pieces = [bl, ...jl, tronc, cou, tete, ...jp, bpr];', 'const pieces = [bl, ...jl, tronc, cou, tete, ...jp, bpr];\n    if (P.retouche) P.retouche(pieces, { bl, jl, jp, bpr, S, H });');
  remplace('_interne: { tube,', '_interne: { BRAS, TETE, TRONC, POSES, tube,');
  const m = { exports: null };
  new Function('module', 'require', src)(m, require);
  const F = m.exports(Object.assign(Object.create(h), { posturesEnPlus: POSTURES }));
  OUTILS = F._interne; BRAS = F._interne.BRAS;
  DOS.troncFace = F._interne.TRONC.face.slice(1);    // couché, l'aine dépasserait la fesse
  brasQ();
  return F;
}

module.exports = (h) => {
  const F = formesEtirees(h);
  const A = h.a;
  const E = 0.235;                                 // unités de vue par mm, les trois vues
  const f1 = v => Math.round(v * 10) / 10;
  // repère de vue : un point de posture (mm) → la vue
  const repere = (x, y, ang = 0) => p => { const q = tourne(fois(p, E), ang); return [f1(x + q[0]), f1(y + q[1])]; };
  const borne = (z, p) => [f1(Math.max(14, Math.min(z.l - 14, p[0]))), f1(Math.max(14, Math.min(z.h - 14, p[1])))];
  const arc = (V, C, r, a0, a1, n = 24) => {
    const out = [];
    for (let i = 0; i <= n; i++) out.push(V(plus(C, fois(dir(a0 + (a1 - a0) * i / n), r))));
    return 'M' + out.map(p => `${p[0]} ${p[1]}`).join(' L');
  };
  // le tronc penché de l'étirement 1 (bassin 1 : tout le tronc tourne de 45°)
  const TTi = p => plus(I.H, tourne(p, I.lean));

  return {
    ref: '37-07',
    titre: 'Trois étirements du soir, muscles chauds',
    desc: 'Trois personnages de profil. Assis en long sur un banc, une jambe allongée dessus, le tronc penché en avant d’un bloc à partir des hanches, le dos droit, les avant-bras le long de la cuisse et les mains sur le genou. Debout face au mur, une main au mur, l’autre bras tendu vers l’arrière tient la cheville et amène le talon vers la fesse, les genoux côte à côte. Couché sur le dos, la tête au sol, les deux cuisses repliées contre le ventre, les genoux au-dessus de la poitrine ; l’avant-bras passe devant les tibias et la main se ferme dessus, juste sous le genou.',
    format: 'pleine',
    disposition: [['ischios', 'quadriceps'], ['dos']],
    hauteurs: [2.35, 1],
    largeurs: [[1.18, 1]],
    vues: {
      ischios: {
        titre: 'L’arrière de la cuisse',
        dessin: z => {
          const x0 = z.l / 2 - 330 * E, y0 = z.h - 8;
          const V = repere(x0, y0);
          const out = [];
          out.push(h.ligne(6, y0, z.l - 6, y0, A.arete));
          out.push(F.personnage({ x: x0, y: y0, pose: 'ischios', echelle: E, trait: 'fort' }).toString());
          // le banc, par-dessus : son flanc cache tout ce qui passe sous le dessus
          const g = -300, d = 1010, ep = 42;
          const [bx0, by0] = V([g, -BANC]), [bx1, by1] = V([d, -BANC + ep]);
          out.push(h.rect(bx0, by0, bx1 - bx0, by1 - by0, `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`));
          for (const t of [0.36, 0.68]) out.push(h.ligne(V([g + 40, 0])[0], by0 + (by1 - by0) * t, V([d - 60, 0])[0], by0 + (by1 - by0) * t, A.fin));
          for (const xp of [g + 50, d - 120]) {
            const [px0, py0] = V([xp, -BANC + ep]), [px1] = V([xp + 70, 0]);
            out.push(h.rect(px0, py0, px1 - px0, y0 - py0, `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4" stroke-linejoin="round"`));
          }
          // le tronc qui bascule à partir des hanches
          out.push(h.fleche(arc(V, I.H, 810, -100, -61), A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const x0 = z.l / 2 - 330 * E, y0 = z.h - 8, V = repere(x0, y0);
          const dosPt = V(TTi(droite(I.dosA, I.dosB, [0.5])[0]));   // le milieu de la droite du dos
          const hanche = V(I.H);                          // l'articulation de la hanche, où le tronc bascule
          const tibia = V([720, -553]);                   // le dessus du tibia allongé
          return [
            { n: 1, rond: borne(z, [tibia[0] + 14, tibia[1] - 62]), cible: tibia, texte: 'une jambe allongée sur le banc' },
            { n: 2, rond: borne(z, [hanche[0] - 60, hanche[1] + 2]), cible: hanche, texte: 'penché à partir des hanches' },
            { n: 3, rond: borne(z, [dosPt[0] - 58, dosPt[1] - 14]), cible: dosPt, texte: 'le dos reste droit' },
          ];
        },
      },
      quadriceps: {
        titre: 'L’avant de la cuisse',
        dessin: z => {
          const x0 = z.l / 2 - 70 * E, y0 = z.h - 8;
          const V = repere(x0, y0);
          const out = [];
          out.push(h.ligne(6, y0, V([MUR, 0])[0], y0, A.arete));
          // le mur, vu en coupe
          const [mx0, my0t] = V([MUR, -1880]), my0 = Math.max(4, my0t), [mx1] = V([MUR + 75, 0]);
          out.push(h.rect(mx0, my0, mx1 - mx0, y0 - my0, A.hachure('bois')));
          out.push(h.ligne(mx0, my0, mx0, y0, A.arete));
          out.push(F.personnage({ x: x0, y: y0, pose: 'quadriceps', echelle: E, trait: 'fort' }).toString());
          // le talon amené vers la fesse : la jambe tourne autour du genou
          out.push(h.fleche(arc(V, Q.K, 640, -136, -122), A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const x0 = z.l / 2 - 70 * E, y0 = z.h - 8, V = repere(x0, y0);
          const mainMur = V(plus(Q.Wl, [22, -95]));
          const uB = uni(moins(Q.Wr, Q.E));
          const avantBras = V(moins(Q.Wr, fois(uB, 90)));   // l'avant-bras, là où il passe derrière la cheville
          const talon = V(plus(Q.A, tourne([-55, 26], Q.pied)));   // l'arrière du talon, tourné vers la fesse
          const genoux = V(plus(Q.K, [52, 0]));
          return [
            { n: 4, rond: borne(z, [mainMur[0] - 60, mainMur[1] - 40]), cible: [mainMur[0] - 6, mainMur[1]], texte: 'une main au mur' },
            { n: 5, rond: borne(z, [avantBras[0] - 46, avantBras[1] - 50]), cible: avantBras, texte: 'l’autre main attrape la cheville' },
            { n: 6, rond: borne(z, [talon[0] + 8, talon[1] + 50]), cible: talon, texte: 'le talon vers la fesse' },
            { n: 7, rond: borne(z, [genoux[0] + 60, genoux[1] + 20]), cible: genoux, texte: 'genoux côte à côte' },
          ];
        },
      },
      dos: {
        titre: 'Le bas du dos',
        dessin: z => {
          const g = placeDos(z);
          const out = [];
          out.push(h.ligne(6, g.sol, z.l - 6, g.sol, A.arete));
          out.push(F.personnage({ x: g.x, y: g.y, pose: 'genouxPoitrine', echelle: E, angle: D.ang, trait: 'fort' }).toString());
          // les genoux ramenés vers la poitrine : la cuisse tourne autour de la hanche, vers la tête
          out.push(h.fleche(arc(g.Vl, [0, 0], 540, -112, -146), A.arete));
          return out.join('\n');
        },
        renvois: z => {
          const g = placeDos(z);
          // le devant du genou proche : la bissectrice des devants de la cuisse et du tibia
          const uC = uni(D.lK), devantCuisse = [uC[1], -uC[0]];
          const genou = g.Vl(plus(D.lK, fois(uni(plus(devantCuisse, D.devant)), 47)));
          const main = g.Vl(plus(D.prise, fois(D.devant, 22)));
          return [
            { n: 8, rond: borne(z, [genou[0] - 42, genou[1] - 6]), cible: genou, texte: 'les deux genoux vers la poitrine' },
            { n: 9, rond: borne(z, [main[0] + 44, main[1] - 36]), cible: main, texte: 'ramenés avec les bras' },
          ];
        },
      },
    },
  };

  // Place le personnage couché : le dos (et la tête) posés sur le plancher, le tout centré.
  function placeDos(z) {
    const bas = Math.max(...D.dos.map(p => COUCHE(p)[1]));
    const gauche = -800, droite = 150;               // la tête, les orteils (mm, couché)
    const sol = z.h - 8;
    const x = z.l / 2 - ((gauche + droite) / 2) * E, y = sol - bas * E;
    const Vl = p => [f1(x + p[0] * E), f1(y + p[1] * E)];
    return { x, y, sol, Vl };
  }
};
