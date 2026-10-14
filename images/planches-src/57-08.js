// Planche 57-08 — Les hameçons qu'on fait (ch. 53, « Les hameçons » ; aussi ch. 54, 82, 88)
module.exports = (h) => {
  const f = n => Math.round(n * 10) / 10;
  const pieces = a => a.join('\n');
  const NOIR = '#1A1A1A';
  // Un fil d'acier vu de côté : un trait noir large, un trait blanc par-dessus.
  // e : l'épaisseur du bord ; 2,4 quand le fil est l'objet principal, en gros (limer)
  const fil = (d, w = 3, e = 1.4) => [
    h.path(d, `fill="none" stroke="${NOIR}" stroke-width="${w + 2 * e}" stroke-linecap="round" stroke-linejoin="round"`),
    h.path(d, `fill="none" stroke="#FFFFFF" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`),
  ].join('\n');
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const P = (x, y) => `${f(x)} ${f(y)}`;

  // ─── Vue 1 : ce qui se plie en hameçon ───────────────────────────────────────────────
  const geoBouts = z => {
    const t = 16, b = z.h - 12;
    return { t, b, x: [0.13, 0.37, 0.62, 0.86].map(k => z.l * k) };
  };

  // ─── Vue 2 : plier sur la panne, rouler l'œillet ─────────────────────────────────────
  const geoPlier = z => {
    const S = z.h - 34;                    // dessus du billot
    const hx = z.l * 0.36;                 // axe de la tête de marteau
    const corpsH = 58, cou = 10, rb = 14;
    const cy = S - corpsH - cou - rb + 3;  // la panne ronde, sur son cou
    const rw = rb + 3.2;                   // rayon du fil qui l'enveloppe
    const nx = z.l * 0.78;                 // clou planté
    const ey = S - 28;                     // hauteur de l'œillet
    return { S, hx, cy, rb, rw, nx, ey, corpsH, cou };
  };

  // ─── Vue 3 : limer la pointe et la barbe ─────────────────────────────────────────────
  const geoLimer = z => {
    const y0 = 30, R = 28, w = 11, hw = 5.5;
    const xb = z.l * 0.62;                 // départ du coude
    const yL = y0 + 2 * R;                 // axe de la branche de la pointe
    const X = s => xb - s;                 // s : distance le long de la pointe, depuis le coude
    const Y = t => yL - t;                 // t : vers l'intérieur (vers la hampe)
    const pente = (hw + 0.4) / (106 - 54);
    const bordLime = s => yL + hw + 2 - (s - 54) * pente;   // la face extérieure, prolongée
    return { y0, R, w, hw, xb, yL, X, Y, bordLime };
  };

  // ─── Vue 4 : rendre la dureté ────────────────────────────────────────────────────────
  const geoTremper = z => {
    const sol = z.h - 14;
    const bx0 = z.l * 0.58, bx1 = z.l * 0.92, by = sol - 74, niv = by + 16;
    return { sol, bx0, bx1, by, niv, braise: [z.l * 0.26, sol - 40] };
  };

  // Petit hameçon fini, hampe verticale, œillet en haut ; (x, y) = haut de la hampe.
  const petitHamecon = (x, y, k = 1, w = 2.2) => {
    const R = 9 * k, L = 30 * k, p = 16 * k;
    const d = `M${P(x, y)} L ${P(x, y + L)} A ${f(R)} ${f(R)} 0 0 0 ${P(x + 2 * R, y + L)} L ${P(x + 2 * R, y + L - p)}`;
    return [fil(`M${P(x - 4 * k, y - 4 * k)} a ${f(4 * k)} ${f(4 * k)} 0 1 0 0.1 0`, w), fil(d, w),
      h.chemin([[x + 2 * R - 1.8, y + L - p + 2], [x + 2 * R - 5 * k, y + L - p + 6 * k]], h.a.arete)].join('\n');
  };

  // ─── Vue 5 : le raté ─────────────────────────────────────────────────────────────────
  const geoRate = z => {
    const x = z.l * 0.34, y = 36, L = z.h * 0.42, R = 17;
    return { x, y, L, R };
  };

  // ─── Vue 6 : la broche avalée ────────────────────────────────────────────────────────
  const geoBroche = z => {
    const ax = z.l * 0.19, ay = z.h * 0.26;       // la broche seule
    const bx = z.l * 0.19, by = z.h * 0.72;       // dans l'appât
    const cy = z.h * 0.52, fx0 = z.l * 0.47, fx1 = z.l * 0.90;   // poisson vu de dessus
    const gx = fx0 + (fx1 - fx0) * 0.70;          // la broche en travers du gosier
    return { ax, ay, bx, by, cy, fx0, fx1, gx, demi: 44 };
  };
  // Broche d'os ou de bois dur, pointue aux deux bouts, centrée en (cx, cy), à l'angle a.
  const broche = (cx, cy, demi, a, attrs) => {
    const c = Math.cos(a), s = Math.sin(a);
    const pt = (u, v) => [cx + u * c - v * s, cy + u * s + v * c];
    return h.chemin([pt(-demi, 0), pt(-demi + 16, -3.2), pt(demi - 16, -3.2), pt(demi, 0), pt(demi - 16, 3.2), pt(-demi + 16, 3.2)], attrs, true);
  };

  return {
    ref: '57-08',
    titre: 'Les hameçons qu’on fait',
    desc: 'Six vues. Ce qui se plie en hameçon : clou à finir, épingle de sûreté, rayon de roue, bout de broche. Le fil rougi au feu pour l’attendrir, refroidi, puis plié froid autour de la panne ronde d’un marteau posé sur un billot ; l’œillet roulé autour d’un clou planté dans le billot. La pointe limée à la lime à trois faces, poussée vers la pointe, avec la barbe faite d’un copeau poussé vers le coude à l’arête de la lime et relevé, et la coupe de la pointe en triangle. L’hameçon rougi au rouge sombre dans la braise, puis plongé à la pince dans une boîte d’huile. Le raté : un hameçon de broche douce qui n’a pas été retrempé, ouvert par un gros poisson, en trait plein sur sa forme d’origine en tireté. La broche avalée : un bâtonnet d’os ou de bois dur pointu aux deux bouts, ligaturé en son milieu, enfoui en long dans l’appât ; dans le poisson vu de dessus, la ligne tend et la broche pivote en travers du gosier.',
    format: 'pleine',
    disposition: [['bouts', 'plier'], ['limer', 'tremper'], ['rate', 'broche']],
    largeurs: [[2, 3], [3, 2], [1.1, 3]],
    vues: {
      // ── 1. Les bouts d'acier ──
      bouts: {
        titre: 'Ce qui se plie',
        dessin: z => {
          const { t, b, x } = geoBouts(z);
          const out = [];
          // clou à finir
          {
            const X = x[0], y1 = t + 34;
            out.push(h.chemin([[X - 2.4, y1 + 5], [X - 2.4, b - 12], [X, b], [X + 2.4, b - 12], [X + 2.4, y1 + 5]], blancArete, true));
            out.push(h.path(`M${P(X - 3.8, y1)} L ${P(X + 3.8, y1)} L ${P(X + 2.4, y1 + 5)} L ${P(X - 2.4, y1 + 5)} Z`, blancArete));
          }
          // épingle de sûreté, ouverte : ressort en bas, fermoir en haut, la pointe écartée
          {
            const X = x[1], top = t + 52, bot = b - 6;
            out.push(h.cercle(X, bot, 5, h.a.arete));
            out.push(h.cercle(X, bot, 2.4, h.a.detail));
            out.push(h.ligne(X - 4.6, bot - 2, X - 4.6, top + 10, h.a.arete));
            out.push(h.path(`M${P(X - 8, top + 16)} L ${P(X - 8, top + 4)} Q ${P(X - 8, top)} ${P(X - 3, top)} L ${P(X + 1, top)} Q ${P(X + 5, top)} ${P(X + 5, top + 5)} L ${P(X + 5, top + 12)} L ${P(X - 1, top + 16)} Z`, blancArete));
            out.push(h.ligne(X + 4.2, bot - 3, X + 20, top + 22, h.a.arete));
            out.push(h.ligne(X + 20, top + 22, X + 21.6, top + 16, h.a.arete));
          }
          // rayon de roue : tête et coude en haut, filet et écrou en bas, coupé au milieu
          {
            const X = x[2], yc = t + 6, yb1 = z.h * 0.46, yb2 = yb1 + 10, yf = b - 30;
            out.push(fil(`M${P(X, yb1)} L ${P(X, yc + 4)} Q ${P(X, yc)} ${P(X - 4, yc)} L ${P(X - 11, yc)}`, 2.2));
            out.push(h.rect(X - 15, yc - 5, 4, 10, blancArete));
            out.push(fil(`M${P(X, yb2)} L ${P(X, yf + 14)}`, 2.2));
            out.push(h.path(`M${P(X - 6, yb1 + 1)} L ${P(X - 2, yb1 - 2)} L ${P(X + 2, yb1 + 1)} L ${P(X + 6, yb1 - 2)}`, h.a.detail));
            out.push(h.path(`M${P(X - 6, yb2 + 1)} L ${P(X - 2, yb2 - 2)} L ${P(X + 2, yb2 + 1)} L ${P(X + 6, yb2 - 2)}`, h.a.detail));
            for (let y = yf; y < yf + 12; y += 2.6) out.push(h.ligne(X - 2.4, y + 1.2, X + 2.4, y - 1.2, h.a.fin));
            out.push(h.rect(X - 3.6, yf + 12, 7.2, b - yf - 12, blancArete));
            out.push(h.ligne(X - 3.6, b - 7, X + 3.6, b - 7, h.a.detail));
          }
          // bout de broche
          {
            const X = x[3];
            out.push(fil(`M${P(X - 4, t + 40)} C ${P(X + 8, t + 80)} ${P(X - 10, b - 50)} ${P(X + 3, b - 4)}`, 2.4));
          }
          return pieces(out);
        },
        renvois: z => {
          const { t, b, x } = geoBouts(z);
          const my = (t + b) / 2;
          return [
            { n: 1, rond: [x[0] + 20, t + 12], cible: [x[0] + 3, t + 36] },
            { n: 2, rond: [x[1] - 16, t + 30], cible: [x[1] - 4, t + 52] },
            { n: 3, rond: [x[2] + 20, t + 26], cible: [x[2] + 1.5, t + 50] },
            { n: 4, rond: [x[3] + 22, my + 20], cible: [x[3] + 2, my + 20] },
          ].map((r, i) => ({ ...r, texte: ['clou à finir', 'épingle de sûreté', 'rayon de roue', 'bout de broche'][i] }));
        },
      },

      // ── 2. Plier ──
      plier: {
        titre: 'Rougir, puis plier froid',
        dessin: z => {
          const { S, hx, cy, rb, rw, nx, ey, corpsH, cou } = geoPlier(z);
          const out = [];
          // billot
          out.push(h.rect(z.l * 0.06, S, z.l * 0.88, z.h - S, h.a.hachure('bois', 'arete')));
          // marteau, face sur le billot, panne ronde en haut, manche à gauche tenu à la main
          const tete = [[hx - 11, S], [hx - 9, S - 8], [hx - 9, S - corpsH], [hx + 9, S - corpsH], [hx + 9, S - 8], [hx + 11, S]];
          out.push(h.chemin(tete, h.a.blanc, true));
          // la face de droite de la tête du marteau, à l'ombre
          out.push(h.chemin([[hx + 3, S - corpsH], [hx + 9, S - corpsH], [hx + 9, S - 8], [hx + 11, S], [hx + 3.5, S]], h.a.ombre, true));
          out.push(h.chemin(tete, h.a.contour, true));
          out.push(h.chemin([[hx - 5, S - corpsH], [hx - 5, S - corpsH - cou], [hx + 5, S - corpsH - cou], [hx + 5, S - corpsH]], blancArete, true));
          out.push(h.cercle(hx, cy, rb, blancArete.replace('stroke-width="1.4"', 'stroke-width="2.4"')));
          out.push(h.rect(8, S - 40, hx - 9 - 8, 13, h.a.hachure('bois', 'arete')));
          // le fil : hampe à gauche sur le dessus de la panne, enroulé par la droite, pointe qui descend
          const a1 = 50 * Math.PI / 180;
          const E = [hx + rw * Math.cos(a1), cy + rw * Math.sin(a1)];
          out.push(fil(`M${P(hx - 78, cy - rw)} L ${P(hx, cy - rw)} A ${f(rw)} ${f(rw)} 0 0 1 ${P(E[0], E[1])}`, 3));
          // le geste : le bout continue de s'enrouler
          const rf = rw + 11, b0 = 12 * Math.PI / 180, b1 = 70 * Math.PI / 180;
          out.push(h.geste(`M${P(hx + rf * Math.cos(b0), cy + rf * Math.sin(b0))} A ${f(rf)} ${f(rf)} 0 0 1 ${P(hx + rf * Math.cos(b1), cy + rf * Math.sin(b1))}`));
          // clou planté, œillet roulé autour
          out.push(fil(`M${P(nx - 10, ey)} A 10 4 0 0 1 ${P(nx + 10, ey)}`, 2.6));
          out.push(h.chemin([[nx - 2.2, S], [nx - 2.2, S - 52], [nx + 2.2, S - 52], [nx + 2.2, S]], blancArete, true));
          out.push(h.path(`M${P(nx - 5, S - 52)} L ${P(nx + 5, S - 52)} L ${P(nx + 4, S - 56)} L ${P(nx - 4, S - 56)} Z`, blancArete));
          out.push(fil(`M${P(nx + 10, ey)} A 10 4 0 0 1 ${P(nx - 10, ey)} Q ${P(nx - 12, ey - 2)} ${P(nx - 12, ey - 6)}`, 2.6));
          out.push(fil(`M${P(nx + 10, ey)} L ${P(z.l * 0.97, ey)}`, 2.6));
          const ro = 15;
          // le geste : rouler l'œillet autour du clou
          out.push(h.geste(`M${P(nx + ro, ey + 11)} A ${ro} 5 0 0 1 ${P(nx - ro, ey + 11)}`));
          return pieces(out);
        },
        renvois: z => {
          const { S, hx, cy, rb, rw, nx, ey } = geoPlier(z);
          return [
            { n: 5, rond: [hx - 66, cy - rw + 24], cible: [hx - 58, cy - rw + 3] },
            { n: 6, rond: [hx - 44, cy + 22], cible: [hx - rb + 3, cy + 6] },
            { n: 7, rond: [nx + 32, ey - 30], cible: [nx + 9, ey - 1] },
          ].map((r, i) => ({ ...r, texte: ['rougi, refroidi, plié froid', 'la panne du marteau', 'œillet roulé sur un clou'][i] }));
        },
      },

      // ── 3. Limer ──
      limer: {
        titre: 'Limer la pointe et la barbe',
        dessin: z => {
          const { y0, R, w, hw, xb, yL, X, Y, bordLime } = geoLimer(z);
          const out = [];
          // œillet et hampe, coude
          const xo = 27, re = 11;
          out.push(fil(`M${P(xo - re, y0)} a ${re} ${re} 0 1 0 0.1 0`, w, 2.4));
          out.push(fil(`M${P(xo + re, y0)} L ${P(xb, y0)} A ${R} ${R} 0 0 1 ${P(xb, yL)} L ${P(xb - 2, yL)}`, w, 2.4));
          // la pointe, avec sa barbe : profil en (s, t)
          // face intérieure : pleine jusqu'à 60, l’entaille du copeau de 58 à 88, puis effilée
          const tIn = s => hw - (s - 62) * (hw - 0.4) / (106 - 62);
          const intr = [[0, hw], [58, hw], [58, 1], [88, tIn(88)], [106, 0.4]];
          const extr = [[106, 0.4], [54, -hw], [0, -hw]];
          const pts = [...intr, ...extr].map(([s, t]) => [X(s), Y(t)]);
          out.push(h.chemin([[X(-1), Y(hw)], ...pts.slice(1, -1), [X(-1), Y(-hw)]], 'fill="#FFFFFF" stroke="none"', true));
          out.push(h.chemin(intr.map(([s, t]) => [X(s), Y(t)]), h.a.contour));
          out.push(h.chemin(extr.map(([s, t]) => [X(s), Y(t)]), h.a.contour));
          // la barbe : un copeau poussé vers le coude, encore attaché côté pointe, relevé
          out.push(h.chemin([[88, tIn(88)], [60, hw + 0.6], [57.4, hw + 5.4]].map(([s, t]) => [X(s), Y(t)]), blancArete, true));
          out.push(h.ligne(X(88), Y(1.2), X(102), Y(0.4), h.a.detail));        // arête entre deux facettes
          // la pointe en coupe : trois facettes
          const tx = 50, ty = yL + 52, c = 10;
          out.push(h.chemin([[tx - c, ty + c * 0.58], [tx + c, ty + c * 0.58], [tx, ty - c * 1.15]], h.a.hachure('metal', 'arete'), true));
          // la lime à trois faces, couchée le long de la face extérieure
          const sT = 128, sH = -56, sQ = -68, sM = -116;
          const top = s => bordLime(s);
          const ep = s => 5 + (10 - 5) * (sT - s) / (sT - sH);
          out.push(h.chemin([[X(sT), top(sT)], [X(sH), top(sH)], [X(sH), top(sH) + ep(sH)], [X(sT), top(sT) + ep(sT)]], h.a.hachure('metal', 'arete'), true));
          out.push(h.ligne(X(sT - 4), top(sT - 4) + ep(sT - 4) * 0.5, X(sH), top(sH) + ep(sH) * 0.5, h.a.detail));
          const am = s => top(s) + ep(s) / 2;
          out.push(h.chemin([[X(sH), am(sH) - 3], [X(sQ), am(sH) - 1.5], [X(sQ), am(sH) + 1.5], [X(sH), am(sH) + 3]], blancArete, true));
          out.push(h.path(`M${P(X(sQ), am(sH) - 8)} L ${P(X(sM + 4), am(sH) - 8)} Q ${P(X(sM), am(sH) - 8)} ${P(X(sM), am(sH) - 4)} L ${P(X(sM), am(sH) + 4)} Q ${P(X(sM), am(sH) + 8)} ${P(X(sM + 4), am(sH) + 8)} L ${P(X(sQ), am(sH) + 8)} Z`, h.a.hachure('bois', 'arete')));
          // le geste : le coup de lime, poussé vers la pointe
          out.push(h.geste(`M${P(X(-24), top(-24) + 24)} L ${P(X(64), top(64) + 24)}`));
          return pieces(out);
        },
        renvois: z => {
          const { hw, yL, X, Y, y0, bordLime } = geoLimer(z);
          return [
            { n: 8, rond: [X(-36), bordLime(-36) + 36], cible: [X(-20), bordLime(-20) + 5] },
            { n: 9, rond: [X(66), y0 + 22], cible: [X(71), Y(7.4)] },
            { n: 10, rond: [50 - 32, yL + 54], cible: [50 - 7, yL + 55] },
          ].map((r, i) => ({ ...r, texte: ['lime à trois faces', 'barbe : copeau levé', 'pointe à trois facettes'][i] }));
        },
      },

      // ── 4. Tremper ──
      tremper: {
        titre: 'Rendre la dureté',
        dessin: z => {
          const { sol, bx0, bx1, by, niv, braise } = geoTremper(z);
          const out = [];
          // braise
          const bx = braise[0];
          out.push(h.path(`M${P(z.l * 0.04, sol)} Q ${P(z.l * 0.08, sol - 30)} ${P(bx - 26, sol - 34)} Q ${P(bx - 10, sol - 44)} ${P(bx + 8, sol - 38)} Q ${P(bx + 30, sol - 34)} ${P(z.l * 0.48, sol)} Z`, h.a.hachure('gravier', 'arete')));
          out.push(h.ligne(0, sol, z.l, sol, h.a.arete));
          // l'hameçon couché dans la braise
          out.push(fil(`M${P(bx - 22, sol - 30)} L ${P(bx + 4, sol - 30)} A 8 8 0 0 1 ${P(bx + 4, sol - 14)} L ${P(bx - 8, sol - 14)}`, 2.2));
          // de la braise au bain
          out.push(h.fleche(`M${P(bx + 14, sol - 56)} Q ${P((bx + bx0) / 2 + 10, 12)} ${P((bx0 + bx1) / 2 - 18, by - 40)}`));
          // boîte de conserve, huile dedans
          out.push(h.rect(bx0, niv, bx1 - bx0, sol - niv, h.a.hachure('eau', 'aucun')));
          out.push(h.chemin([[bx0, by], [bx0, sol], [bx1, sol], [bx1, by]], h.a.contour));
          for (const k of [0.33, 0.66]) out.push(h.ligne(bx0, by + (sol - by) * k, bx0 + 5, by + (sol - by) * k, h.a.detail));
          for (const k of [0.33, 0.66]) out.push(h.ligne(bx1 - 5, by + (sol - by) * k, bx1, by + (sol - by) * k, h.a.detail));
          out.push(h.ligne(bx0, niv, bx1, niv, h.a.arete));
          // la pince qui tient l'hameçon, plongé dans le bain
          const mx = (bx0 + bx1) / 2 - 8, hy = niv + 9;
          out.push(petitHamecon(mx, hy, 0.9, 2));
          out.push(h.chemin([[mx - 3, hy - 6], [mx + 6, by - 30], [mx + 30, by - 58]], h.a.contour));
          out.push(h.chemin([[mx + 3, hy - 6], [mx + 10, by - 28], [mx + 38, by - 50]], h.a.contour));
          out.push(h.cercle(mx + 8, by - 29, 2.4, h.a.plein));
          return pieces(out);
        },
        renvois: z => {
          const { sol, bx0, bx1, by, niv, braise } = geoTremper(z);
          const bx = braise[0];
          return [
            { n: 11, rond: [bx - 30, sol - 68], cible: [bx - 16, sol - 32] },
            { n: 12, rond: [bx1 - 8, by - 22], cible: [bx1 - 14, niv + 18] },
          ].map((r, i) => ({ ...r, texte: ['rouge sombre dans la braise', 'plongé dans l’huile'][i] }));
        },
      },

      // ── 5. Le raté ──
      rate: {
        titre: 'Le raté',
        dessin: z => {
          const { x, y, L, R } = geoRate(z);
          const out = [];
          const yb = y + L;
          // la forme d'origine, en tireté
          out.push(h.path(`M${P(x, yb)} A ${R} ${R} 0 0 0 ${P(x + 2 * R, yb)} L ${P(x + 2 * R, yb - 30)}`, h.a.cache));
          // la ligne, l'œillet, la hampe
          out.push(h.ligne(x, 0, x, y - 8, h.a.detail));
          out.push(fil(`M${P(x - 4, y - 4)} a 4 4 0 1 0 0.1 0`, 2.4));
          out.push(fil(`M${P(x, y)} L ${P(x, yb)} C ${P(x, yb + 26)} ${P(x + 26, yb + 34)} ${P(x + 44, yb + 44)} L ${P(x + 60, yb + 60)}`, 2.4));
          out.push(h.chemin([[x + 60, yb + 60], [x + 58, yb + 52]], h.a.arete));
          // la traction du poisson
          out.push(h.fleche(`M${P(x + 52, yb + 38)} L ${P(x + 70, yb + 56)}`));
          out.push(h.fleche(`M${P(x + 14, y + 20)} L ${P(x + 14, y - 6)}`));
          // là où ça casse : le coude ouvert
          out.push(h.controle(x + 9, yb + 18, 19));
          return pieces(out);
        },
        renvois: z => {
          const { x, y, L } = geoRate(z);
          const yb = y + L;
          return [
            { n: 13, rond: [x - 22, yb + 42], cible: [x + 6, yb + 22] },
          ].map((r, i) => ({ ...r, texte: ['pas retrempé, il s’ouvre'][i] }));
        },
      },

      // ── 6. La broche avalée ──
      broche: {
        titre: 'La broche avalée, d’os ou de bois dur',
        dessin: z => {
          const { ax, ay, bx, by, cy, fx0, fx1, gx, demi } = geoBroche(z);
          const out = [];
          // a. la broche seule, ligaturée
          out.push(broche(ax, ay, demi, 0, blancArete));
          out.push(h.ligne(ax - 26, ay - 0.8, ax - 8, ay - 1.2, h.a.fin));
          out.push(h.ligne(ax + 10, ay + 1, ax + 28, ay + 0.6, h.a.fin));
          for (let dx = -4; dx <= 4; dx += 2) out.push(h.ligne(ax + dx, ay - 4, ax + dx, ay + 4, h.a.detail));
          out.push(h.path(`M${P(ax + 4, ay - 3)} Q ${P(ax + 20, ay - 18)} ${P(ax + 44, ay - 20)} L ${P(z.l * 0.42, ay - 20)}`, h.a.detail));
          // b. enfouie en long dans l'appât
          out.push(h.path(`M${P(bx - 58, by)} Q ${P(bx - 60, by - 17)} ${P(bx - 30, by - 17)} L ${P(bx + 34, by - 15)} Q ${P(bx + 60, by - 14)} ${P(bx + 60, by)} Q ${P(bx + 60, by + 15)} ${P(bx + 30, by + 16)} L ${P(bx - 30, by + 16)} Q ${P(bx - 58, by + 16)} ${P(bx - 58, by)} Z`, blancArete));
          out.push(broche(bx, by - 1, demi, 0, h.a.cache));
          out.push(h.path(`M${P(bx + 2, by - 4)} L ${P(bx + 60, by - 4)}`, h.a.cache));
          out.push(h.ligne(bx + 60, by - 4, z.l * 0.42, by - 4, h.a.detail));
          // c. dans le poisson, vu de dessus : la ligne tend, la broche se met en travers
          const lg = fx1 - fx0;
          out.push(h.path(`M${P(fx1, cy)} C ${P(fx1 - lg * 0.06, cy - 22)} ${P(fx1 - lg * 0.3, cy - 30)} ${P(fx0 + lg * 0.34, cy - 22)} C ${P(fx0 + lg * 0.18, cy - 16)} ${P(fx0 + lg * 0.12, cy - 7)} ${P(fx0 + lg * 0.08, cy - 4)} L ${P(fx0, cy - 20)} L ${P(fx0 + lg * 0.03, cy)} L ${P(fx0, cy + 20)} L ${P(fx0 + lg * 0.08, cy + 4)} C ${P(fx0 + lg * 0.12, cy + 7)} ${P(fx0 + lg * 0.18, cy + 16)} ${P(fx0 + lg * 0.34, cy + 22)} C ${P(fx1 - lg * 0.3, cy + 30)} ${P(fx1 - lg * 0.06, cy + 22)} ${P(fx1, cy)} Z`, blancArete.replace('stroke-width="1.4"', 'stroke-width="2.4"')));
          out.push(h.cercle(fx1 - lg * 0.1, cy - 13, 2.6, h.a.plein));
          out.push(h.cercle(fx1 - lg * 0.1, cy + 13, 2.6, h.a.plein));
          // le gosier, en tireté
          out.push(h.ligne(fx1 - 2, cy - 5, gx - 34, cy - 5, h.a.cache));
          out.push(h.ligne(fx1 - 2, cy + 5, gx - 34, cy + 5, h.a.cache));
          // avant : en long ; après : en travers
          out.push(broche(gx, cy, 22, Math.PI / 2, blancArete));
          out.push(h.fleche(`M${P(gx - 18, cy - 12)} A 22 22 0 0 1 ${P(gx - 4, cy - 22)}`));
          // la ligne sort par la gueule, tirée
          out.push(h.ligne(gx + 3, cy, z.l - 4, cy, h.a.detail));
          out.push(h.fleche(`M${P(fx1 + 8, cy + 14)} L ${P(z.l - 8, cy + 14)}`));
          return pieces(out);
        },
        renvois: z => {
          const { ax, ay, bx, by, cy, gx, demi } = geoBroche(z);
          return [
            { n: 14, rond: [ax - demi - 4, ay - 24], cible: [ax - demi + 4, ay - 1] },
            { n: 15, rond: [ax - 12, ay + 26], cible: [ax - 2, ay + 4] },
            { n: 16, rond: [bx - 30, by + 38], cible: [bx - 26, by + 15] },
            { n: 17, rond: [gx + 30, cy - 38], cible: [gx + 2, cy - 16] },
          ].map((r, i) => ({ ...r, texte: ['pointu aux deux bouts', 'ligaturé au milieu', 'enfoui en long dans l’appât', 'ligne tendue : en travers'][i] }));
        },
      },
    },
  };
};
