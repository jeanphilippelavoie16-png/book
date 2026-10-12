// Planche 67-12 — La claie de graduation. Chapitre 62, « Tirer du sel du fleuve »,
// deuxième étage : le vent, l'été. Aucune dimension dans le chapitre : aucune cote.
module.exports = (h) => {
  const blanc = (t) => t.replace('fill="none"', 'fill="#ffffff"');
  const f = (n) => n.toFixed(1);
  const rng = (s) => () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

  // Un amas de branches de sapin : de courts rameaux, chacun avec ses aiguilles.
  const brosse = (x, y, l, ht, seed, pas = 11) => {
    const r = rng(seed); let d = '';
    for (let yy = y + pas / 2; yy < y + ht; yy += pas * 0.75) {
      for (let xx = x + r() * pas * 0.6; xx < x + l; xx += pas * 1.2) {
        const L = 9 + r() * 7;
        const a = (r() - 0.5) * 1.5 + (r() < 0.5 ? 0 : Math.PI);
        const ux = Math.cos(a), uy = Math.sin(a);
        const hx = Math.abs(ux) * L / 2 + 3, hy = Math.abs(uy) * L / 2 + 3;
        const cx = Math.min(Math.max(xx + (r() - 0.5) * 4, x + hx), x + l - hx);
        const cy = Math.min(Math.max(yy + (r() - 0.5) * 4, y + hy), y + ht - hy);
        const p0 = [cx - ux * L / 2, cy - uy * L / 2];
        d += `M${f(p0[0])} ${f(p0[1])} L${f(cx + ux * L / 2)} ${f(cy + uy * L / 2)} `;
        for (const t of [0.3, 0.55, 0.8]) {
          const bx = p0[0] + ux * L * t, by = p0[1] + uy * L * t;
          for (const s of [1, -1]) { const g = a + s * 0.9; d += `M${f(bx)} ${f(by)} l${f(Math.cos(g) * 3)} ${f(Math.sin(g) * 3)} `; }
        }
      }
    }
    return h.path(d, h.a.fin);
  };

  // ── Repères communs à l'élévation et au plan (même colonne, même échelle) ──────────────
  const postes = [16, 101, 186, 271];   // bord gauche de chaque poteau, largeur 8
  const pL = 8;
  const murG = 16, murD = 279;          // le mur de branches, d'un poteau de bout à l'autre
  const bout = 322;                     // l'auge et la gouttière dépassent à droite : on y puise, on y verse
  const yg = 282;                       // le sol
  const yGt = 72, yGb = 82;             // gouttière
  const yMh = 86, yMb = 221;            // le mur de branches
  const perches = [100, 140, 180];      // perches liées aux poteaux (centres)
  const yPb = 230;                      // perche basse, qui porte les traverses
  const yAh = 254;                      // dessus de l'auge

  return {
    ref: '67-12',
    titre: 'La claie de graduation',
    desc: 'Claie de graduation pour concentrer l’eau du fleuve au vent. De face : un toit sans murs sur deux rangs de poteaux ; entre les rangs, un mur de branches de sapin ou d’épinette empilées, tenu par des perches liées aux poteaux ; au faîte, une gouttière crénelée sur toute la longueur ; au pied, une auge qui court sous tout le mur et dépasse d’un bout, où l’on puise la saumure au seau pour la reverser dans la gouttière. En coupe : la gouttière en V posée sur une traverse ; la saumure déborde par les créneaux et descend de branche en branche pendant que le vent traverse le mur ; le mur porte sur des traverses posées sur les perches basses, au-dessus de l’auge de planches doublée d’une bâche. Vu de dessus : le mur en travers du vent dominant. Une branche après des semaines : couverte d’une croûte de sels de calcium, qui restent aux branches. Encadré danger : la claie concentre tout ce que l’eau contient, pas seulement le sel.',
    format: 'pleine',
    disposition: [['elevation', 'coupe'], ['plan', 'croute']],
    hauteurs: [3, 2],
    largeurs: [[5, 3], [5, 3]],
    vues: {
      // ── De face ──────────────────────────────────────────────────────────────────────
      elevation: {
        titre: 'De face, côté vent',
        dessin: z => {
          const o = [];
          // sol
          o.push(h.rect(4, yg, bout + 24, 12, h.a.hachure('terre', 'fin')));
          o.push(h.ligne(4, yg, bout + 28, yg, h.a.arete));
          // auge (derrière les poteaux du rang avant)
          o.push(h.rect(murG - 4, yAh, bout - murG + 4, yg - yAh, blanc(h.a.arete)));
          o.push(h.ligne(murG - 4, yAh + 14, bout, yAh + 14, h.a.detail));
          // lèvre de la bâche rabattue sur le bord
          o.push(h.chemin([[murG - 4, yAh + 3], [bout, yAh + 3]], h.a.fin));
          // les gouttes qui tombent du mur dans l'auge
          for (let x = murG + 14; x < murD - 6; x += 17) {
            if (postes.some(p => x > p - 4 && x < p + pL + 4)) continue;
            o.push(h.ligne(x, yPb + 7, x, yAh - 4, h.a.cache));
          }
          // le mur de branches
          o.push(brosse(murG + 2, yMh, murD - murG - 4, yMb - yMh, 7));
          // perches, puis perche basse et bouts des traverses posées dessus
          for (const y of perches) o.push(h.rect(murG - 6, y - 3, murD - murG + 12, 6, blanc(h.a.arete)));
          o.push(h.rect(murG - 6, yPb - 3, murD - murG + 12, 6, blanc(h.a.arete)));
          for (let x = murG + 12; x < murD - 4; x += 13) {
            if (postes.some(p => x > p - 4 && x < p + pL + 4)) continue;
            o.push(h.cercle(x, yMb + 3, 3, blanc(h.a.detail)));
          }
          // gouttière entre les deux rangs, derrière les poteaux du rang avant ; créneaux au-dessus du mur seulement
          const pts = [[murG - 6, yGb], [murG - 6, yGt]];
          for (let x = murG; x < murD - 6; x += 11) pts.push([x, yGt], [x, yGt + 3], [x + 4, yGt + 3], [x + 4, yGt]);
          pts.push([bout + 2, yGt], [bout + 2, yGb]);
          o.push(h.chemin(pts, blanc(h.a.arete), true));
          // poteaux, avec la ligature de chaque perche
          for (const p of postes) {
            o.push(h.rect(p, yGb - 26, pL, yg - yGb + 26, blanc(h.a.arete)));
            for (const y of [...perches, yPb]) {
              o.push(h.ligne(p - 1, y - 4, p + pL + 1, y + 1, h.a.fin), h.ligne(p - 1, y - 1, p + pL + 1, y + 4, h.a.fin));
            }
          }
          // toit : le versant vu de long, planches dans le sens de la pente
          o.push(h.rect(murG - 12, 26, murD - murG + 24, 30, blanc(h.a.arete)));
          for (let x = murG - 2; x < murD + 12; x += 10) o.push(h.ligne(x, 27, x, 55, h.a.fin));
          o.push(h.ligne(murG - 12, 56, murD + 12, 56, h.a.contour));
          // le seau : on puise au bout de l'auge, on verse au bout de la gouttière
          const rot = (cx, cy, ang, pts2) => pts2.map(([x, y]) => [cx + x * Math.cos(ang) - y * Math.sin(ang), cy + x * Math.sin(ang) + y * Math.cos(ang)]);
          const sx = 330, sy = 58, ang = -0.75;
          o.push(h.chemin(rot(sx, sy, ang, [[-12, -22], [12, -22], [9, 0], [-9, 0]]), blanc(h.a.arete), true));
          o.push(h.chemin(rot(sx, sy, ang, [[-12, -19], [12, -19]]), h.a.fin));
          o.push(h.path(`M${rot(sx, sy, ang, [[-11, -12]])[0].map(f).join(' ')} Q${rot(sx, sy, ang, [[0, 12]])[0].map(f).join(' ')} ${rot(sx, sy, ang, [[11, -12]])[0].map(f).join(' ')}`, h.a.detail));
          const lev = rot(sx, sy, ang, [[-12, -22]])[0];
          o.push(h.path(`M${f(lev[0])} ${f(lev[1])} Q${f(lev[0] - 4)} ${f(lev[1] + 6)} ${f(lev[0] - 5)} ${yGt + 1}`, h.a.cache));
          o.push(h.fleche(`M${bout - 6} ${yAh + 6} C${bout + 34} ${yAh - 10} ${bout + 38} 120 ${sx + 12} ${sy + 8}`, h.a.detail));
          return o.join('\n');
        },
        renvois: z => [
          { n: 1, rond: [60, 12], cible: [74, 40], texte: 'toit sans murs, sur poteaux' },
          { n: 2, rond: [150, 12], cible: [150, yGt + 5] , texte: 'gouttière crénelée au faîte' },
          { n: 3, rond: [48, 120], cible: [78, 122], texte: 'sapin ou épinette, en mur' },
          { n: 4, rond: [160, 118], cible: [189, 140], texte: 'perches liées aux poteaux' },
          { n: 5, rond: [300, 236], cible: [300, 266], texte: 'auge au pied, sous le mur' },
          { n: 6, rond: [312, 150], cible: [349, 177], texte: 'puisée au bout, reversée en haut' },
        ],
      },

      // ── En coupe ─────────────────────────────────────────────────────────────────────
      coupe: {
        titre: 'En coupe, en travers',
        dessin: z => {
          const o = [];
          const cx = 108;
          const pG = 73, pD = 135;            // poteaux (largeur 8)
          const bG = 87, bD = 129;            // branches entre les perches
          const eG = 34, eD = 182, yF = 26, yE = 58;
          const toit = x => x <= cx ? yE - (x - eG) * (yE - yF) / (cx - eG) : yF + (x - cx) * (yE - yF) / (eD - cx);
          // sol
          o.push(h.rect(4, yg, z.l - 8, 12, h.a.hachure('terre', 'fin')));
          o.push(h.ligne(4, yg, z.l - 4, yg, h.a.arete));
          // poteaux, vus au-delà du plan de coupe
          for (const p of [pG, pD]) o.push(h.chemin([[p, yg], [p, toit(p) + 4], [p + 8, toit(p + 8) + 4], [p + 8, yg]], blanc(h.a.arete), true));
          // entrait sous le toit
          o.push(h.rect(pG - 2, yE - 2, pD - pG + 12, 5, blanc(h.a.arete)));
          // toit coupé
          o.push(h.chemin([[eG, yE], [cx, yF], [eD, yE], [eD, yE + 4], [cx, yF + 4], [eG, yE + 4]], h.a.hachure('bois', 'arete'), true));
          // auge coupée : planches, bâche, saumure
          const aG = 82, aD = 134;
          o.push(h.rect(aG + 4, 266, aD - aG - 8, yg - 4 - 266, h.a.hachure('eau', 'fin')));
          o.push(h.ligne(aG + 4, 266, aD - 4, 266, h.a.detail));
          o.push(h.chemin([[aG, yAh], [aG + 4, yAh], [aG + 4, yg - 4], [aD - 4, yg - 4], [aD - 4, yAh], [aD, yAh], [aD, yg], [aG, yg]], h.a.hachure('bois', 'arete'), true));
          o.push(h.chemin([[aG - 1, yAh + 5], [aG - 1, yAh - 1], [aG + 5, yAh - 1], [aG + 5, yg - 5], [aD - 5, yg - 5], [aD - 5, yAh - 1], [aD + 1, yAh - 1], [aD + 1, yAh + 5]], h.a.fin));
          // gouttes qui tombent du mur
          for (const x of [93, 104, 115, 125]) o.push(h.ligne(x, yPb + 7, x, 262, h.a.cache));
          // le mur de branches
          o.push(brosse(bG, yMh, bD - bG, yMb - yMh, 21, 15));
          // la saumure qui descend de branche en branche
          // (liseré blanc dessous : sans lui, le trajet se perd dans les aiguilles)
          for (const [x0, s] of [[91, 1], [125, -1]]) {
            const p = [[x0, yGt - 3]]; let k = 0;
            for (let y = yMh + 12; y <= yMb - 8; y += 24) { p.push([x0 + s * (k % 2 ? 3 : 13), y]); k++; }
            const d = 'M' + p.map(q => q.map(f).join(' ')).join(' L');
            o.push(h.path(d, 'fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"'));
            o.push(h.fleche(d, h.a.cache));
          }
          // perches coupées, perches basses, traverse posée dessus
          for (const y of perches) for (const x of [84, 132]) o.push(h.cercle(x, y, 3, h.a.hachure('bois', 'arete')));
          o.push(h.rect(pG + 5, yMb, pD - pG + 6 - 8 + 4, 6, blanc(h.a.arete)));
          for (const x of [84, 132]) o.push(h.cercle(x, yPb, 3, h.a.hachure('bois', 'arete')));
          // traverse du haut et gouttière en V
          o.push(h.rect(pG + 5, yGb, pD - pG + 2, 4, blanc(h.a.arete)));
          o.push(h.chemin([[94, yGt - 2], [122, yGt - 2], [cx, yGb - 1]], h.a.hachure('eau', 'fin'), true));
          o.push(h.chemin([[91, yGt - 4], [cx, yGb], [125, yGt - 4]], h.a.contour));
          // le vent traverse le mur
          for (const y of [118, 172]) o.push(h.fleche(`M8 ${y} L60 ${y}`));
          for (const y of [128, 182]) o.push(h.fleche(`M${pD + 16} ${y} L${z.l - 8} ${y}`));
          return o.join('\n');
        },
        renvois: z => [
          { n: 7, rond: [34, 236], cible: [80, yMb + 3], texte: 'traverses : le mur porte dessus' },
          { n: 8, rond: [190, 222], cible: [117, 182], texte: 'goutte de branche en branche' },
          { n: 9, rond: [34, 272], cible: [83, 270], texte: 'planches doublées d’une bâche' },
        ],
      },

      // ── Vu de dessus ─────────────────────────────────────────────────────────────────
      plan: {
        titre: 'Vu de dessus, toit enlevé',
        dessin: z => {
          const o = [];
          const yH = 66, yB = 136;             // faces extérieures des poteaux
          const yi1 = yH + 8, yi2 = yB - 8;    // faces intérieures
          // bout de l'auge, où l'on puise
          o.push(h.rect(murD + 4, yi1 + 4, bout - murD - 6, yi2 - yi1 - 8, h.a.hachure('eau', 'fin')));
          o.push(h.chemin([[murD + 2, yi1], [bout, yi1], [bout, yi2], [murD + 2, yi2]], h.a.arete));
          o.push(h.chemin([[murD + 2, yi1 + 4], [bout - 4, yi1 + 4], [bout - 4, yi2 - 4], [murD + 2, yi2 - 4]], h.a.detail));
          // le mur de branches vu d'en haut
          o.push(brosse(murG + 2, yi1 + 3, murD - murG - 4, yi2 - yi1 - 6, 33, 10));
          // perches
          for (const y of [yi1, yi2 - 3]) o.push(h.rect(murG - 6, y, murD - murG + 12, 3, blanc(h.a.arete)));
          // poteaux coupés
          for (const p of postes) for (const y of [yH, yi2]) o.push(h.rect(p, y, pL, 8, h.a.plein));
          // gouttière, fond du V au milieu
          const yc = (yH + yB) / 2;
          o.push(h.rect(murG - 6, yc - 14, bout + 8 - murG, 28, blanc(h.a.arete)));
          o.push(h.ligne(murG - 6, yc, bout + 2, yc, h.a.detail));
          for (let x = murG; x < murD - 6; x += 11) for (const y of [yc - 14, yc + 11]) o.push(h.rect(x, y, 4, 3, h.a.plein));
          // le vent, en travers du mur
          for (const x of [58, 143, 228]) {
            o.push(h.fleche(`M${x} ${z.h - 6} L${x} ${yB + 12}`));
            o.push(h.fleche(`M${x} ${yH - 12} L${x} 8`));
          }
          return o.join('\n');
        },
        renvois: z => [
          { n: 10, rond: [300, 30], cible: [238, 80], texte: 'mur en travers du vent' },
        ],
      },

      // ── Détail ───────────────────────────────────────────────────────────────────────
      croute: {
        titre: 'Une branche, après des semaines',
        dessin: z => {
          const o = [];
          const A = [16, 160], B = [200, 40];
          const L = Math.hypot(B[0] - A[0], B[1] - A[1]);
          const ux = (B[0] - A[0]) / L, uy = (B[1] - A[1]) / L, nx = -uy, ny = ux;
          const P = (t, d = 0) => [A[0] + ux * t + nx * d, A[1] + uy * t + ny * d];
          // la croûte, sur la moitié basse du rameau
          const r = rng(5); const bord = [];
          for (let t = 6; t <= 118; t += 8) bord.push(P(t, 16 + r() * 7));
          for (let t = 118; t >= 6; t -= 8) bord.push(P(t, -16 - r() * 7));
          let d = `M${f(bord[0][0])} ${f(bord[0][1])} `;
          for (let i = 1; i < bord.length; i++) {
            const m = [(bord[i - 1][0] + bord[i][0]) / 2, (bord[i - 1][1] + bord[i][1]) / 2];
            d += `Q${f(bord[i - 1][0])} ${f(bord[i - 1][1])} ${f(m[0])} ${f(m[1])} `;
          }
          d += 'Z';
          // aiguilles, à plat des deux côtés
          let ai = '';
          const rn = rng(11);
          for (let t = 10; t < L - 8; t += 5.5) {
            for (const s of [1, -1]) {
              const b = P(t, s * 2.5);
              const lg = 13 + rn() * 5, av = 5 + rn() * 4;
              const m = P(t + av * 0.3, s * lg * 0.55);
              const e = P(t + av, s * lg);
              ai += `M${f(b[0])} ${f(b[1])} Q${f(m[0])} ${f(m[1])} ${f(e[0])} ${f(e[1])} `;
            }
          }
          o.push(h.path(ai, h.a.detail));
          o.push(h.path(d, h.a.blanc), h.path(d, h.a.hachure('gravier', 'detail')));
          // le rameau
          o.push(h.chemin([P(0, 3), P(L, 1.3), P(L, -1.3), P(0, -3)], blanc(h.a.arete), true));
          // gouttes pendues au bout des aiguilles du dessous, sur la partie encore propre
          for (const t of [140, 162, 184]) {
            const e = P(t + 7, 16);
            o.push(h.path(`M${f(e[0])} ${f(e[1])} q-3 6 0 8 q3 -2 0 -8 Z`, h.a.detail));
          }
          return o.join('\n');
        },
        renvois: z => [
          { n: 11, rond: [150, 170], cible: [80, 116], texte: 'croûte : sels de calcium' },
        ],
      },
    },
    danger: 'La claie concentre tout ce que l’eau contient, pas seulement le sel. Puiser au large et en eau montante, loin d’une embouchure, d’un quai, d’un émissaire ou d’un mouillage, puis filtrer sur toile serrée avant de verser.',
  };
};
