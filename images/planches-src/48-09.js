// Planche 48-09 — Le collet à ressort et son déclencheur (chapitre 48, § « Le collet à ressort »).
// Vue 1 : le montage vu du bord de la piste, en vue oblique : le lièvre d'Amérique de profil au fond
// de sa piste, la tête passée dans la boucle (§ 4 : la boucle laisse passer la tête ; on la voit
// autour du cou, sans chiffre) ; le bouleau plié et le piquet de notre côté, le bâtonnet en travers
// de la piste. Le lièvre vient de _animaux.js (lievre). Vue 2 : le crochet et le bâtonnet
// agrandis, là où tout se décide.
const A_ = require('./_animaux');

module.exports = (h) => {
  const blanc = (a) => a.replace('fill="none"', 'fill="#FFFFFF"');
  const neige = h.a.hachure('neige').replace(/stroke="[^"]*" stroke-width="[^"]*"/, 'stroke="none"');

  // Courbe de Bézier cubique, point et tangente.
  const bez = (P, t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]);
  };
  const tan = (P, t) => {
    const u = 1 - t;
    const d = [0, 1].map((k) => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k]));
    const n = Math.hypot(d[0], d[1]);
    return [d[0] / n, d[1] / n];
  };

  // Le repère de la vue oblique (mm) : X le long de la piste, Y en profondeur (vers le fond), Z vers
  // le haut ; l'origine au fond de la piste, au milieu, sous la boucle. On regarde du bord où le
  // collet est monté : le piquet et le bouleau sont de notre côté (Y < 0), plus bas sur la vue.
  const geo = (z) => {
    const s = 0.41, kx = -0.56, ky = 0.205, ox = 226, oy = z.h - 56;
    return {
      // YB le plan du bouleau, YP l'axe du piquet, ZB la hauteur du bâtonnet ; BORD : la neige de
      // part et d'autre de la piste, au-dessus du fond tassé ; YN le bord de la piste de notre côté,
      // YA la coupe de la neige devant. La boucle autour du cou : une goutte pendue par l'œillet
      // sur la nuque (ZH), large de 2 RY, haute de 2 RZ.
      s, oy, YB: -200, YP: -320, ZB: 272, ZH: 172, RY: 42, RZ: 50, BORD: 22, YN: -110, YA: -430,
      // t = 0 à l'œillet ; sin t < 0 : la moitié de notre côté, devant le cou
      goutte: (t, RY, RZ, ZH) => [RY * Math.sin(t) * (1 - 0.15 * Math.pow((1 + Math.cos(t)) / 2, 2)), ZH - RZ * (1 - Math.cos(t))],
      ARC: [[-560, 0], [-572, 300], [-280, 425], [0, 345]],
      P: (X, Y, Z) => [ox + s * (X + kx * Y), oy - s * (Z + ky * Y)],
    };
  };

  return {
    ref: '48-09',
    titre: 'Le collet à ressort et son déclencheur',
    desc: 'Vu du bord de la piste : un jeune bouleau plié au-dessus d’une piste de lièvre, retenu par un bâtonnet en travers de la piste, coincé sous le crochet taillé dans un piquet planté au bord ; la boucle du collet pend du bâtonnet et le lièvre, de profil, y a passé la tête : la boucle est autour de son cou. À droite, le crochet et le bâtonnet agrandis : le dessus du bâtonnet bute sous l’épaulement, son bout repose sur le pan incliné.',
    format: 'demi',
    disposition: [['monte', 'declencheur']],
    largeurs: [[3, 2]],
    vues: {
      monte: {
        titre: 'Monté, vu du bord de la piste',
        dessin: (z) => {
          // Vue oblique : la piste file de gauche à droite, la profondeur monte vers la gauche. Le
          // lièvre est de profil au fond de la piste ; la boucle, en travers de la piste, se voit de
          // biais autour de son cou ; le piquet et le bouleau sont plantés de notre côté.
          const out = [];
          const { P, s, oy, YB, YP, ZB, ZH, RY, RZ, ARC, BORD, YN, YA, goutte } = geo(z);

          // le pied d'un bois planté : la neige remonte un peu autour et le cache
          // le pied d'un bois planté : deux traits de neige qui partent de ses flancs
          const pied = (p, r) => h.path(`M ${p[0] - r} ${p[1]} Q ${p[0] - r - 5} ${p[1] + 1} ${p[0] - r - 11} ${p[1] + 3} M ${p[0] + r} ${p[1]} Q ${p[0] + r + 5} ${p[1] + 1} ${p[0] + r + 11} ${p[1] + 3}`, h.a.detail);

          // La neige : le bord de la piste au fond, le bord de notre côté, la coupe devant.
          const yFond = P(0, -YN, BORD)[1], yBord = P(0, YN, BORD)[1], yCoupe = P(0, YA, BORD)[1];
          out.push(h.ligne(4, yFond, z.l - 4, yFond, h.a.detail));
          out.push(h.rect(4, yCoupe, z.l - 8, z.h - 6 - yCoupe, neige));
          out.push(h.ligne(4, yCoupe, z.l - 4, yCoupe, h.a.arete));

          // La boucle, en travers de la piste, la tête passée : le cou est dedans, la gorge sur le bas
          // de la boucle, le haut tenu par le fil au-dessus de la nuque. La moitié derrière le cou d'abord.
          const boucle = (t0, t1) => {
            const l = [];
            for (let i = 0; i <= 40; i++) { const [Y, Z] = goutte(t0 + (t1 - t0) * i / 40, RY, RZ, ZH); l.push(P(0, Y, Z)); }
            return l;
          };
          out.push(h.chemin(boucle(0, Math.PI), h.a.arete));

          // Le lièvre d'Amérique, de profil, la tête passée dans la boucle.
          out.push(A_.lievre(h, { x: P(-18, 0, 0)[0], y: oy, echelle: s, oreilles: 18, cou: 24 }).svg);
          // le bord de la piste de notre côté passe devant ses pieds
          out.push(h.ligne(4, yBord, z.l - 4, yBord, h.a.arete));

          // La boucle de notre côté du cou, l'œillet en haut, le fil qui monte au bâtonnet.
          const devant = boucle(Math.PI, 2 * Math.PI);
          out.push(h.chemin(devant, 'fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round"'), h.chemin(devant, h.a.arete));
          const oe = P(0, 0, ZH + 2);
          out.push(h.cercle(oe[0], oe[1], 1.8, h.a.detail));
          out.push(h.ligne(oe[0], oe[1] - 1.8, oe[0], P(0, 0, ZB)[1] + 2.6, h.a.arete));
          // le point à vérifier : la boucle autour du cou, la tête passée
          const cc = P(-2, 0, ZH - RZ);
          out.push(h.controle(cc[0], cc[1], RZ * s + 3));

          // Le bâtonnet en travers de la piste, du crochet (derrière le piquet) jusqu'au-dessus de la piste.
          const b0 = P(0, 22, ZB), b1 = P(0, YP + 10, ZB);
          const u = [b1[0] - b0[0], b1[1] - b0[1]], L = Math.hypot(u[0], u[1]), n = [-u[1] / L * 2.6, u[0] / L * 2.6];
          out.push(h.chemin([[b0[0] + n[0], b0[1] + n[1]], [b1[0] + n[0], b1[1] + n[1]], [b1[0] - n[0], b1[1] - n[1]], [b0[0] - n[0], b0[1] - n[1]]], blanc(h.a.arete), true));
          out.push(h.ellipse(b0[0], b0[1], 2.2, 2.8, blanc(h.a.detail)));
          // les ligatures : le fil du collet au-dessus de la piste, la corde du bouleau
          const pc = P(ARC[3][0], YB, ZB);
          const lig = (p) => [-2, 0, 2].map((k) => `M ${p[0] + k - 1.5} ${p[1] - 4} L ${p[0] + k + 1.5} ${p[1] + 4}`).join(' ');
          out.push(h.path(lig(pc) + ' ' + lig(P(0, 0, ZB)), h.a.detail));

          // Le bouleau plié, de notre côté de la piste : tronc effilé le long d'une courbe.
          const A = ARC.map(([X, Z], i) => P(X, YB, Z + (i === 0 ? BORD : 0)));
          // la corde, du bout de l'arbre au bâtonnet
          out.push(h.ligne(A[3][0], A[3][1], pc[0], pc[1] - 2, h.a.arete));
          const larg = (t) => 13 * (1 - t) + 3 * t;
          const g = [], d = [];
          for (let i = 0; i <= 40; i++) {
            const t = i / 40, p = bez(A, t), T = tan(A, t), w = larg(t) / 2;
            g.push([p[0] + T[1] * w, p[1] - T[0] * w]);
            d.push([p[0] - T[1] * w, p[1] + T[0] * w]);
          }
          out.push(h.chemin([...g, ...d.reverse()], blanc(h.a.contour), true));
          out.push(pied(A[0], 6.5));
          // Rameaux : sur l'arc, et la cime qui dépasse la corde.
          const rameau = (b, T, ang, L) => {
            const dir = [T[0] * Math.cos(ang) - T[1] * Math.sin(ang), T[0] * Math.sin(ang) + T[1] * Math.cos(ang)];
            const m = [b[0] + dir[0] * L * 0.55, b[1] + dir[1] * L * 0.55];
            return `M ${b[0]} ${b[1]} Q ${m[0] + dir[1] * 2} ${m[1] - dir[0] * 2} ${b[0] + dir[0] * L} ${b[1] + dir[1] * L}`;
          };
          const ram = [[0.4, -0.9, 18], [0.58, -0.75, 20], [0.76, -0.7, 15]].map(([t, ang, L]) => {
            const p = bez(A, t), T = tan(A, t), w = larg(t) / 2;
            const b = [p[0] + T[1] * w, p[1] - T[0] * w];
            const f = [b[0] + (T[0] * Math.cos(ang) - T[1] * Math.sin(ang)) * L * 0.5, b[1] + (T[0] * Math.sin(ang) + T[1] * Math.cos(ang)) * L * 0.5];
            return rameau(b, T, ang, L) + ' ' + rameau(f, T, ang * 0.3, L * 0.4);
          });
          const T1 = tan(A, 1);
          [-1.1, -0.7, -0.35, 0].forEach((ang, i) => ram.push(rameau(A[3], T1, ang, [11, 15, 14, 8][i])));
          out.push(h.path(ram.join(' '), h.a.detail));
          // Le redressement, au déclenchement.
          out.push(h.fleche(`M ${A[3][0] - 6} ${A[3][1] - 12} C ${A[3][0] - 10} ${A[3][1] - 26} ${A[3][0] - 22} ${A[3][1] - 34} ${A[3][0] - 36} ${A[3][1] - 36}`));

          // Le piquet, de notre côté de la piste : un rondin, la face de droite à l'ombre. Le crochet
          // est taillé dans la face qui regarde la piste, derrière : le détail est à droite.
          const rP = 24, haut = 345;
          const c0 = P(0, YP, BORD), c1 = P(0, YP, haut);
          const xg = c0[0] - rP * s, xd = c0[0] + rP * s, ey = rP * s * 0.45;
          const piquet = `M ${xg} ${c1[1]} L ${xg} ${c0[1]} A ${rP * s} ${ey} 0 0 0 ${xd} ${c0[1]} L ${xd} ${c1[1]} A ${rP * s} ${ey} 0 0 0 ${xg} ${c1[1]} Z`;
          out.push(h.path(piquet, h.a.blanc));
          out.push(h.path(`M ${c0[0] + rP * s * 0.35} ${c1[1] + ey * 0.9} L ${c0[0] + rP * s * 0.35} ${c0[1] + ey * 0.95} A ${rP * s} ${ey} 0 0 0 ${xd} ${c0[1]} L ${xd} ${c1[1]} Z`, h.a.ombre));
          out.push(h.path(piquet, h.a.contour));
          out.push(h.ellipse(c1[0], c1[1], rP * s, ey, h.a.detail));
          out.push(pied([c0[0], c0[1] + ey * 0.6], rP * s - 0.4));

          return out.join('\n');
        },
        renvois: (z) => {
          const { P, YB, YP, ZH, RY, RZ, ARC, BORD, goutte } = geo(z);
          const A = ARC.map(([X, Z], i) => P(X, YB, Z + (i === 0 ? BORD : 0)));
          const t = 0.18, p = bez(A, t), T = tan(A, t), w = (13 * (1 - t) + 3 * t) / 2;
          const cible = [p[0] + T[1] * w, p[1] - T[0] * w];
          const piq = P(24, YP, 190), bo = P(0, ...goutte(1.6 * Math.PI, RY, RZ, ZH));
          return [
            { n: 1, rond: [16, cible[1] - 26], cible },
            { n: 2, rond: [z.l - 18, piq[1] - 10], cible: [piq[0] + 1, piq[1]] },
            { n: 5, rond: [bo[0] - 36, bo[1] - 40], cible: bo },
          ].map((r, i) => ({ ...r, texte: ['jeune bouleau plié vers la piste', 'piquet fiché à côté de la piste', 'boucle du collet, autour du cou'][i] }));
        },
      },
      declencheur: {
        titre: 'Le déclencheur, de près',
        dessin: (z) => {
          const byd = 110, e = 12, D = 62, x0 = 135, x1 = 185, xs = 162;   // épaulement : de x0 à xs, à byd - e
          const pente = (y) => xs - (xs - x0) * (y - (byd - e)) / D;
          const bout = pente(byd + e);
          const bas = z.h - 12;
          const out = [];

          // La corde, torse, qui tire vers le haut.
          out.push(h.ligne(57.5, 6, 57.5, byd - e, h.a.detail));
          out.push(h.ligne(62.5, 6, 62.5, byd - e, h.a.detail));
          const tors = [];
          for (let y = 10; y < byd - e - 4; y += 8) tors.push(`M 57.5 ${y + 5} C 59 ${y + 3} 61 ${y + 1.5} 62.5 ${y}`);
          out.push(h.path(tors.join(' '), h.a.detail));
          out.push(h.fleche(`M 36 ${byd - 40} L 36 ${byd - 95}`));

          // Le bâtonnet, cassé à gauche : il continue au-dessus de la piste.
          const baton = [[bout, byd - e], [14, byd - e], [8, byd - 6], [16, byd], [8, byd + 6], [14, byd + e], [bout, byd + e]];
          out.push(h.chemin(baton, h.a.blanc, true));
          // le dessous du bâtonnet, à l'ombre
          out.push(h.chemin([[10, byd + 4.5], [bout, byd + 4.5], [bout, byd + e], [14, byd + e], [8, byd + 6]], h.a.ombre, true));
          out.push(h.chemin(baton, h.a.contour, true));
          out.push(h.ligne(26, byd - 3, bout - 8, byd - 3, h.a.detail));
          out.push(h.ligne(20, byd + 6, bout - 30, byd + 6, h.a.detail));
          // La ligature de la corde.
          out.push(h.path([0, 1, 2].map((i) => `M ${52 + i * 7} ${byd - e - 2} L ${57 + i * 7} ${byd + e + 2}`).join(' '), h.a.arete));

          // Le piquet et son crochet : épaulement à plat, pan incliné dessous.
          const piquet = [[x0, 26], [x0 + 5, 20], [x1 - 5, 20], [x1, 26], [x1, bas], [172, bas - 5], [160, bas + 4], [147, bas - 4], [x0, bas + 1],
            [x0, byd - e + D], [xs, byd - e], [x0, byd - e]];
          out.push(h.chemin(piquet, h.a.blanc, true));
          // la face de droite du piquet, à l'ombre
          out.push(h.chemin([[171, 20], [x1 - 5, 20], [x1, 26], [x1, bas], [172, bas - 5]], h.a.ombre, true));
          out.push(h.chemin(piquet, h.a.contour, true));
          // Fil du bois.
          const sous = (x) => byd - e + (xs - x) / (xs - x0) * D;
          [[148, 30, byd - e - 6], [148, sous(148) + 6, bas - 10], [160, 30, byd - e - 6], [160, sous(160) + 6, bas - 10], [174, 30, bas - 10]].forEach(([x, y1, y2]) => {
            out.push(h.path(`M ${x} ${y1} C ${x - 2} ${(2 * y1 + y2) / 3} ${x + 2} ${(y1 + 2 * y2) / 3} ${x} ${y2}`, h.a.detail));
          });

          // le point qui décide, et qui gèle : le bâtonnet sous l'épaulement, son bout sur le pan
          out.push(h.controle((xs + bout) / 2, byd, 19));

          return out.join('\n');
        },
        renvois: (z) => [
          { n: 3, rond: [104, 186], cible: [143, 142], texte: "crochet taillé dans le piquet" },
          { n: 4, rond: [36, 170], cible: [42, 122], texte: "bâtonnet en travers, porte la tension" },
        ],
      },
    },
  };
};
