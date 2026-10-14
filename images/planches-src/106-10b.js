// Planche 106-10b — Reprendre la lame de la sciotte.
// Chapitre 102, §9-A « Entretenir la lame » : les dents se reprennent au tiers-point et à la
// lime plate, et se ravoient — une dent sur deux de chaque côté, couchée au poinçon sur un
// billot dur, pour un trait plus large que la lame. Angles et nombre de coups : ch. 101, pas
// ici — la planche ne cote aucun angle.
//
// Ajouts pour que le geste marche, absents du texte : la lame est posée la pointe de la dent
// en porte-à-faux sur le bord du billot, et ce bord est abattu (en pente douce) pour que la dent
// s'y couche et pas plus loin. Sans porte-à-faux, le poinçon écrase la dent sur le bois sans la
// coucher.

module.exports = (h) => {
  const f = (n) => Math.round(n * 10) / 10;
  const blancArete = h.a.arete.replace('fill="none"', 'fill="#FFFFFF"');
  const tiretFin = h.a.fin + ' stroke-dasharray="3 3"';
  const R3 = Math.sqrt(3) / 2;

  const brisureV = (x, y1, y2, pas = 7, amp = 4) => {
    const pts = [];
    const n = Math.max(2, Math.round(Math.abs(y2 - y1) / pas));
    for (let i = 0; i <= n; i++) pts.push([x + (i % 2 ? amp : -amp) * (i === 0 || i === n ? 0 : 1), y1 + (y2 - y1) * i / n]);
    return pts;
  };
  const brisureH = (y, x1, x2, pas = 7, amp = 4) => {
    const pts = [];
    const n = Math.max(2, Math.round(Math.abs(x2 - x1) / pas));
    for (let i = 0; i <= n; i++) pts.push([x1 + (x2 - x1) * i / n, y + (i % 2 ? amp : -amp) * (i === 0 || i === n ? 0 : 1)]);
    return pts;
  };
  const suite = (pts) => pts.slice(1).map(p => `L${f(p[0])} ${f(p[1])}`).join(' ');

  // ── Égaliser : la lame dents en l'air, la lime plate couchée sur les pointes ──────────
  const geoEg = (z) => {
    const x0 = 22, x1 = z.l - 22;
    const yb = z.h - 22, yt = yb - 34;
    const P = 18, th = P * R3, trop = 5;
    const hautes = [9, 20];
    const yf = yt - th - trop;            // dessous de la lime : sur les dents trop hautes
    const xf0 = x0 + 96, xf1 = x1 - 150;
    return { x0, x1, yb, yt, P, th, trop, hautes, yf, xf0, xf1 };
  };

  // ── Refaire le fil : le tiers-point dans le creux, vu en bout ─────────────────────────
  const geoFil = (z) => {
    const P = 64, th = P * R3;
    const cx = Math.round(z.l / 2);
    const yt = Math.round(z.h * 0.62);     // fond des creux
    const yb = yt + 40;
    const a = 1.3 * P;                    // côté du tiers-point, en bout
    return { P, th, cx, yt, yb, a };
  };

  // ── Donner la voie : coupe en travers de la lame posée à plat sur le billot ───────────
  const geoVoie = (z) => {
    const y0 = Math.round(z.h * 0.62);     // dessus du billot
    const xe = Math.round(z.l * 0.62);     // face du billot
    const bev = 42, chute = 13;            // bord abattu
    const xd = xe - bev;                  // où la dent quitte l'appui
    const ep = 5, Lt = 56;                // épaisseur de lame, longueur de dent
    const th = Math.atan2(chute, bev);
    const xp = xd + 36;                   // poinçon
    const yp = y0 - ep + 36 * Math.tan(th);
    return { y0, xe, bev, chute, xd, ep, Lt, th, xp, yp };
  };

  // ── La voie vue sur les pointes ───────────────────────────────────────────────────────
  const geoTr = (z) => {
    const cy = Math.round(z.h / 2) - 2;
    const x0 = 22, x1 = z.l - 22, e = 3, d = 11, P = 24;
    return { cy, x0, x1, e, d, P };
  };

  return {
    ref: '106-10b',
    titre: 'Reprendre la lame de la sciotte',
    desc: 'Trois gestes sur la lame de la sciotte. En haut, égaliser : la lame dents en l’air, une lime ' +
      'plate couchée à plat sur les pointes et poussée sur la longueur ; deux dents plus hautes que les ' +
      'autres portent la lime et se font ramener au rang. Au milieu à gauche, refaire le fil : trois dents ' +
      'vues de côté, le tiers-point vu en bout, son triangle assis dans le creux entre deux dents, une ' +
      'face contre chaque dent voisine. Au milieu à droite, donner la voie : coupe en travers de la lame ' +
      'posée à plat sur un billot dur, la pointe de la dent en porte-à-faux sur le bord abattu du billot ; ' +
      'un poinçon posé sur la dent, frappé au marteau, la couche sur le bord abattu ; en tireté, la dent ' +
      'avant le coup. En bas, la lame vue sur ses pointes : une dent couchée d’un côté, la suivante de ' +
      'l’autre, et les deux lignes du trait, plus écartées que l’épaisseur de la lame.',
    format: 'pleine',
    disposition: [['egaliser'], ['fil', 'voie'], ['tranchant']],
    hauteurs: [2, 3.2, 1.4],
    largeurs: [[1], [1, 1], [1]],
    vues: {
      egaliser: {
        titre: 'Égaliser les pointes',
        dessin: (z) => {
          const { x0, x1, yb, yt, P, th, trop, hautes, yf, xf0, xf1 } = geoEg(z);
          const out = [];
          // La lame : dos, brisures, dents en l'air.
          out.push(h.ligne(x0, yb, x1, yb, h.a.contour));
          out.push(h.chemin(brisureV(x0, yt, yb), h.a.detail), h.chemin(brisureV(x1, yt, yb), h.a.detail));
          const n = Math.floor((x1 - x0) / P);
          let d = `M${x0} ${yt}`;
          for (let i = 0; i < n; i++) {
            const haut = hautes.includes(i) ? th + trop : th;
            d += ` L${f(x0 + i * P + P / 2)} ${f(yt - haut)} L${f(x0 + (i + 1) * P)} ${yt}`;
          }
          d += ` L${x1} ${yt}`;
          out.push(h.path(d, h.a.contour));
          // Le rang à atteindre, en travers des dents trop hautes.
          for (const i of hautes) {
            const xm = x0 + i * P + P / 2;
            out.push(h.ligne(xm - 7, yt - th, xm + 7, yt - th, tiretFin));
          }
          // La lime plate, couchée sur les pointes, avec sa soie et son manche.
          out.push(h.rect(xf0, yf - 12, xf1 - xf0, 12, h.a.hachure('metal', 'arete')));
          out.push(h.chemin([[xf1, yf - 10], [xf1 + 26, yf - 7], [xf1 + 26, yf - 5], [xf1, yf - 2]], h.a.arete, true));
          out.push(h.path(`M${xf1 + 26} ${yf - 14} L${xf1 + 96} ${yf - 15} Q${xf1 + 104} ${yf - 6} ${xf1 + 96} ${yf + 3} ` +
            `L${xf1 + 26} ${yf + 2} Z`, blancArete));
          // La poussée, sur la longueur.
          out.push(h.geste(`M${xf0 + 250} ${yf - 26} L${xf0 + 130} ${yf - 26}`));     // charte : le geste en rouge
          return out.join('\n');
        },
        renvois: (z) => {
          const { x0, yt, P, th, trop, hautes, yf, xf0 } = geoEg(z);
          const xm = x0 + hautes[1] * P + P / 2;
          return [
            { n: 1, rond: [xf0 + 50, yf - 40], cible: [xf0 + 60, yf - 7], texte: 'lime plate à plat sur les pointes' },
            { n: 2, rond: [xm + 40, yt + 14], cible: [xm + 3, yt - th - trop + 6], texte: 'dent trop haute, ramenée au rang' },
          ];
        },
      },

      fil: {
        titre: 'Refaire le fil',
        dessin: (z) => {
          const { P, th, cx, yt, yb, a } = geoFil(z);
          const out = [];
          const xa = cx - 2 * P, xb = cx + 2 * P;
          // La lame : trois dents entières et deux demi-dents, brisures aux bouts.
          out.push(h.ligne(xa, yb, xb, yb, h.a.contour));
          out.push(h.chemin(brisureV(xa, yt, yb), h.a.detail), h.chemin(brisureV(xb, yt, yb), h.a.detail));
          const pts = [];
          for (let k = -2; k <= 2; k++) {
            const g = cx + k * P;                            // fond de creux
            if (k > -2) pts.push([g - P / 2, yt - th]);
            pts.push([g, yt]);
          }
          out.push(h.chemin(pts, h.a.contour));
          // Le tiers-point, vu en bout : triangle pointe en bas, assis dans le creux du milieu.
          const tri = [[cx, yt], [cx - a / 2, yt - a * R3], [cx + a / 2, yt - a * R3]];
          out.push(h.chemin(tri, h.a.hachure('metal', 'contour'), true));
          return out.join('\n');
        },
        renvois: (z) => {
          const { P, th, cx, yt, a } = geoFil(z);
          return [
            { n: 3, rond: [cx - a / 2 - 18, yt - a * R3 - 20], cible: [cx - 8, yt - a * R3 + 18], texte: 'tiers-point dans le creux' },
            { n: 4, rond: [cx + 2 * P + 4, yt - th - 16], cible: [cx + P / 4 + 2, yt - th / 2 + 2], texte: 'une face sur chaque dent' },
          ];
        },
      },

      voie: {
        titre: 'Donner la voie',
        dessin: (z) => {
          const { y0, xe, bev, chute, xd, ep, Lt, th, xp, yp } = geoVoie(z);
          const out = [];
          const yBas = z.h - 12, xg = 12;
          // Le billot, coupé : dessus, bord abattu, face ; brisures à gauche et en bas.
          const bg = brisureV(xg, yBas, y0), bb = brisureH(yBas, xe, xg);
          out.push(h.path(`M${xg} ${y0} L${xd} ${y0} L${xe} ${y0 + chute} L${xe} ${yBas} ` + suite(bb) + ' ' + suite(bg) + ' Z',
            h.a.hachure('bois', 'contour')));
          // La lame à plat, dos à gauche ; la dent en porte-à-faux, couchée sur le bord abattu.
          const xk = xd - 104;
          out.push(h.rect(xk, y0 - ep, xd - xk, ep, h.a.plein));
          const c = Math.cos(th), s = Math.sin(th);
          out.push(h.chemin([[xd, y0 - ep], [xd + Lt * c, y0 - ep + Lt * s], [xd + Lt * c, y0 + Lt * s], [xd, y0]], h.a.plein, true));
          // La dent avant le coup.
          out.push(h.rect(xd, y0 - ep, Lt, ep, h.a.cache));
          // Le poinçon, pointe sur la dent, et le marteau.
          const yh = yp - 96;
          out.push(h.chemin([[xp - 2, yp], [xp + 2, yp], [xp + 6, yp - 16], [xp + 6, yh], [xp - 6, yh], [xp - 6, yp - 16]], blancArete, true));
          out.push(h.rect(xp - 26, yh - 24, 52, 24, blancArete));
          out.push(h.chemin([[xp + 26, yh - 16], [z.l - 10, yh - 20], [z.l - 10, yh - 10], [xp + 26, yh - 8]], blancArete, true));
          out.push(h.geste(`M${xp - 46} ${yh - 30} L${xp - 46} ${yh + 16}`));          // charte : le coup, en rouge
          // charte : le point à vérifier, la dent en porte-à-faux sur le bord abattu
          out.push(h.controle(xe - 4, y0 + chute / 2 + 2, 14));
          return out.join('\n');
        },
        renvois: (z) => {
          const { y0, xe, chute, xd, ep, xp, yp } = geoVoie(z);
          return [
            { n: 5, rond: [xd - 70, y0 - 44], cible: [xd - 56, y0 - ep / 2], texte: 'lame à plat sur un billot dur' },
            { n: 6, rond: [xp + 40, yp - 36], cible: [xp + 5, yp - 26], texte: 'poinçon sur la pointe' },
            { n: 7, rond: [xe + 36, y0 + 46], cible: [xe - 1, y0 + chute + 3], texte: 'bord abattu : la dent s’y couche' },
          ];
        },
      },

      tranchant: {
        titre: 'La voie, vue sur les pointes',
        dessin: (z) => {
          const { cy, x0, x1, e, d, P } = geoTr(z);
          const out = [];
          // Le trait que font les pointes, plus large que la lame.
          out.push(h.ligne(x0, cy - e - d, x1, cy - e - d, tiretFin));
          out.push(h.ligne(x0, cy + e + d, x1, cy + e + d, tiretFin));
          // La lame sur sa tranche.
          out.push(h.rect(x0, cy - e, x1 - x0, 2 * e, h.a.plein));
          // Les dents, couchées une sur deux de chaque côté.
          const n = Math.floor((x1 - x0 - 16) / P);
          const xs0 = x0 + ((x1 - x0) - n * P) / 2;
          for (let i = 0; i < n; i++) {
            const sg = i % 2 ? 1 : -1;
            const xa = xs0 + i * P;
            out.push(h.chemin([[xa + 2, cy + sg * e], [xa + P / 2, cy + sg * (e + d)], [xa + P - 2, cy + sg * e]], h.a.arete));
          }
          return out.join('\n');
        },
        renvois: (z) => {
          const { cy, x0, x1, e, d, P } = geoTr(z);
          const n = Math.floor((x1 - x0 - 16) / P);
          const xs0 = x0 + ((x1 - x0) - n * P) / 2;
          const xt = (i) => xs0 + i * P + P / 2;
          return [
            { n: 8, rond: [xt(4) - 6, cy - e - d - 26], cible: [xt(4), cy - e - d + 3], texte: 'dent couchée d’un côté' },
            { n: 9, rond: [xt(9) + 6, cy + e + d + 26], cible: [xt(9), cy + e + d - 3], texte: 'la suivante, de l’autre' },
            { n: 10, rond: [xt(18) + 10, cy - e - d - 26], cible: [xt(18) + 16, cy - e - d], texte: 'trait plus large que la lame' },
          ];
        },
      },
    },
  };
};
