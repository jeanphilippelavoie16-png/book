// Planche 80-40 — le baril de choucroute (ch. 80 : §5-A étapes 7 et 8 ; §9 « La bonde, le poids
// et le faux fond » et « Le contenant : chemiser, gonfler, réparer »).
// Le chapitre ne donne aucune dimension du baril, du pot ni de la tubulure : aucune cote de
// longueur. Le seul chiffre dessiné est la hauteur de saumure au-dessus du chou (au moins 3 cm).
// La bonde d'eau, le chapitre la décrit sur un couvercle de pot : elle est dessinée sur le pot
// Mason, pas sur le baril, que le chapitre laisse ouvert sous son sac de saumure.
module.exports = (h) => {
  const A = h.a;
  const r1 = n => Math.round(n * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const bA = blanc(A.arete), bC = blanc(A.contour), bD = blanc(A.detail);
  const sans = nom => A.hachure(nom, 'aucun');
  const P = pts => pts.map(p => `${r1(p[0])} ${r1(p[1])}`);
  const poly = pts => 'M' + P(pts).join(' L') + ' Z';

  // hasard reproductible
  const alea = graine => { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

  // le chou tranché et tassé : des lanières courtes, courbes, serrées, dans tous les sens
  const lanieres = (x0, y0, x1, y1, pas, long, graine) => {
    const r = alea(graine), out = [];
    for (let y = y0 + pas / 2; y < y1; y += pas * 0.62) {
      for (let x = x0 + pas / 2 + (r() - 0.5) * pas; x < x1; x += pas) {
        const px = x + (r() - 0.5) * pas * 0.7, py = y + (r() - 0.5) * pas * 0.5;
        const a = (r() - 0.5) * Math.PI * 0.9, L = long * (0.7 + r() * 0.6), b = (r() - 0.5) * L * 0.7;
        const dx = Math.cos(a) * L / 2, dy = Math.sin(a) * L / 2;
        out.push(`M${r1(px - dx)} ${r1(py - dy)} Q${r1(px - Math.sin(a) * b)} ${r1(py + Math.cos(a) * b)} ${r1(px + dx)} ${r1(py + dy)}`);
      }
    }
    return h.path(out.join(' '), A.fin);
  };
  const decoupe = (id, d, contenu) => `<clipPath id="${id}"><path fill="none" d="${d}"/></clipPath><g clip-path="url(#${id})">${contenu}</g>`;

  // une feuille de chou entière, coupée : une lame mince ondulée, la nervure en bosse
  const feuille = (xa, xb, y, ep, amp, nerv, ph) => {
    const n = Math.max(6, Math.round((xb - xa) / 10));
    const haut = [], bas = [];
    for (let i = 0; i <= n; i++) {
      const x = xa + (xb - xa) * i / n, w = Math.sin(i * 0.8 + ph) * amp;
      haut.push([x, y + w]); bas.push([x, y + w + ep]);
    }
    const d = 'M' + P(haut).join(' L') + ' L' + P(bas.reverse()).join(' L') + ' Z';
    const out = [h.path(d, bD)];
    if (nerv) {
      const i = Math.round(0.45 * n), xn = xa + (xb - xa) * i / n, w = Math.sin(i * 0.8 + ph) * amp;
      out.push(h.ellipse(xn, y + w + ep / 2, nerv * 1.5, nerv, bD));
    }
    return out.join('\n');
  };

  // le sac alimentaire plein de saumure, vu en entier : le fond qui épouse le chou, les flancs
  // plaqués à la paroi, le col ramassé et ligaturé
  const sac = (o) => {
    // o : { xg, xd (parois), yCol, yPlaque (bas du contact à la paroi), yHautPlaque, yFond, xFondG, xFondD, col, lig }
    const { xg, xd, yPlaque, yHaut, yFond, xFondG, xFondD, col, yCol } = o;
    const cx = (xg + xd) / 2;
    const d = `M${r1(cx - col)} ${r1(yCol)} `
      + `C${r1(cx - col - 4)} ${r1(yCol + (yHaut - yCol) * 0.6)} ${r1(xg + 10)} ${r1(yHaut - 6)} ${r1(xg)} ${r1(yHaut)} `
      + `L${r1(xg)} ${r1(yPlaque)} `
      + `C${r1(xg + (xFondG - xg) * 0.35)} ${r1(yPlaque + (yFond - yPlaque) * 0.35)} ${r1(xg + (xFondG - xg) * 0.65)} ${r1(yFond)} ${r1(xFondG)} ${r1(yFond)} `
      + `L${r1(xFondD)} ${r1(yFond)} `
      + `C${r1(xd - (xd - xFondD) * 0.65)} ${r1(yFond)} ${r1(xd - (xd - xFondD) * 0.35)} ${r1(yPlaque + (yFond - yPlaque) * 0.35)} ${r1(xd)} ${r1(yPlaque)} `
      + `L${r1(xd)} ${r1(yHaut)} `
      + `C${r1(xd - 10)} ${r1(yHaut - 6)} ${r1(cx + col + 4)} ${r1(yCol + (yHaut - yCol) * 0.6)} ${r1(cx + col)} ${r1(yCol)} Z`;
    return d;
  };

  // ─── Le profil du baril (vue A et vue D) ──────────────────────────────────────────────────
  const profil = (yt, yb, re, rb) => {
    const ym = (yt + yb) / 2, H2 = (yb - yt) / 2;
    return y => { const u = (y - ym) / H2; return re + (rb - re) * (1 - u * u); };
  };
  const courbe = (f, y0, y1, n = 24) => { const pts = []; for (let i = 0; i <= n; i++) { const y = y0 + (y1 - y0) * i / n; pts.push([f(y), y]); } return pts; };

  // ─── Vue A : le baril en coupe ────────────────────────────────────────────────────────────
  const baril = z => {
    const cx = z.l * 0.5, yt = 12, yb = z.h - 10, H = yb - yt;
    const rb = Math.min(z.l * 0.37, H * 0.42), re = rb * 0.84, t = 9;
    const Ro = profil(yt, yb, re, rb), Ri = y => Ro(y) - t;
    const out = [];
    const yFondH = yb - 22, eFond = 11;               // le fond, logé dans sa rainure
    const yl = yt + H * 0.44;                          // dessus des feuilles
    const yc = yl + 6;                                 // dessus du chou
    const ys = yl - 18;                                // surface de la saumure
    const xg = y => cx - Ri(y), xd = y => cx + Ri(y);

    // le fond de la paroi d'en face, vu de l'intérieur : les joints du merrain
    for (let k = -3; k <= 3; k++) {
      const s = Math.sin(k * Math.PI / 8);
      out.push(h.path('M' + P(courbe(y => cx + Ri(y) * s, yt + 1, yFondH - eFond)).join(' L'), A.fin));
    }
    // le chou tranché, tassé jusqu'au fond
    const chou = poly([...courbe(xg, yc, yFondH - eFond, 12), ...courbe(xd, yFondH - eFond, yc, 12)]);
    out.push(h.path(chou, A.blanc));
    out.push(decoupe('coupe-baril', chou, lanieres(cx - rb, yc, cx + rb, yFondH - eFond, 7, 7, 11)));
    out.push(h.path(chou, A.detail));
    // la saumure, du chou jusqu'à sa surface
    const saum = poly([...courbe(xg, ys, yc, 4), ...courbe(xd, yc, ys, 4)]);
    out.push(h.path(saum, A.blanc), h.path(saum, sans('eau')));
    out.push(h.ligne(xg(ys), ys, xd(ys), ys, A.detail));
    // le faux fond : trois feuilles entières à plat
    const lx = xd(yl) - xg(yl);
    out.push(feuille(xg(yl) + 1, xg(yl) + lx * 0.45, yl - 1, 2.2, 1.1, 0, 0.3));
    out.push(feuille(xg(yl) + lx * 0.35, xg(yl) + lx * 0.75, yl - 3, 2.2, 1.1, 0, 1.4));
    out.push(feuille(xg(yl) + lx * 0.62, xd(yl) - 1, yl - 1, 2.2, 1.1, 0, 2.2));
    // le sac de saumure
    const col = 7, yCol = ys - 62;
    const dSac = sac({ xg: xg(ys), xd: xd(ys), yPlaque: ys + 1, yHaut: ys - 38, yFond: yl - 3, xFondG: cx - lx * 0.2, xFondD: cx + lx * 0.2, col, yCol });
    out.push(h.path(dSac, bA));
    // plis du sac contre la paroi et sur le dessus
    out.push(h.path(`M${r1(xg(ys) + 8)} ${r1(ys - 30)} Q${r1(xg(ys) + 16)} ${r1(ys - 22)} ${r1(xg(ys) + 14)} ${r1(ys - 12)}`, A.fin));
    out.push(h.path(`M${r1(xd(ys) - 8)} ${r1(ys - 30)} Q${r1(xd(ys) - 16)} ${r1(ys - 22)} ${r1(xd(ys) - 14)} ${r1(ys - 12)}`, A.fin));
    out.push(h.path(`M${r1(cx - 22)} ${r1(ys - 42)} Q${r1(cx - 10)} ${r1(ys - 50)} ${r1(cx - col)} ${r1(yCol + 8)}`, A.fin));
    out.push(h.path(`M${r1(cx + 24)} ${r1(ys - 40)} Q${r1(cx + 10)} ${r1(ys - 48)} ${r1(cx + col)} ${r1(yCol + 8)}`, A.fin));
    // le col ramassé, et la ligature
    const colD = `M${r1(cx - col)} ${r1(yCol)} L${r1(cx - 5)} ${r1(yCol - 8)} L${r1(cx - 10)} ${r1(yCol - 18)} L${r1(cx - 3)} ${r1(yCol - 15)} L${r1(cx + 1)} ${r1(yCol - 21)} L${r1(cx + 4)} ${r1(yCol - 15)} L${r1(cx + 11)} ${r1(yCol - 17)} L${r1(cx + 5)} ${r1(yCol - 8)} L${r1(cx + col)} ${r1(yCol)} Z`;
    out.push(h.path(colD, bA));
    out.push(h.formes.corde([[cx - 9, yCol - 4], [cx + 9, yCol - 7]], { ep: 2.4, debut: 'coupe', fin: 'coupe' }));
    out.push(h.formes.corde([[cx - 9, yCol - 1], [cx + 9, yCol - 4]], { ep: 2.4, debut: 'coupe', fin: 'coupe' }));

    // le merrain en coupe, gauche et droite
    const douve = s => {
      const ext = courbe(y => cx + s * Ro(y), yt, yb), int = courbe(y => cx + s * Ri(y), yb, yt);
      return h.path(poly([...ext, ...int]), A.hachure('bois', 'contour'));
    };
    out.push(h.ligne(cx - Ri(yt), yt + 0.7, cx + Ri(yt), yt + 0.7, A.detail));
    out.push(douve(-1), douve(1));
    // le fond, dans sa rainure
    const f0 = yFondH - eFond;
    out.push(h.path(poly([[xg(f0) - 3, f0], [xd(f0) + 3, f0], [xd(yFondH) + 3, yFondH], [xg(yFondH) - 3, yFondH]]), A.hachure('bois', 'arete')));
    // les cercles
    const cercles = [yt + 6, yt + H * 0.24, yb - H * 0.24 - 14, yb - 20];
    cercles.forEach(y => {
      [-1, 1].forEach(s => {
        const a = courbe(yy => cx + s * Ro(yy), y, y + 14, 4), b = courbe(yy => cx + s * (Ro(yy) + 3.2), y + 14, y, 4);
        out.push(h.path(poly([...a, ...b]), A.plein));
      });
    });
    // le cadre du grossissement
    const gx0 = cx - Ro(ys) - 10, gy0 = ys - 40;
    out.push(h.rect(gx0, gy0, 86, 72, A.cache));

    return {
      svg: out.join('\n'),
      renvois: [
        { n: 1, rond: [cx - rb - 18, yt + H * 0.62], cible: [cx - Ro(yt + H * 0.62) + 4, yt + H * 0.62], texte: 'merrain gonflé à l’eau la veille' },
        { n: 2, rond: [cx + rb + 18, yt + H * 0.24 - 14], cible: [cx + Ro(yt + H * 0.24 + 7) + 2, yt + H * 0.24 + 7], texte: 'cercle' },
      ],
      zoneG: { x: gx0, y: gy0 },
    };
  };

  // ─── Vue B : le pourtour, grossi ──────────────────────────────────────────────────────────
  const pourtour = z => {
    const xw = 52, ep = 24;                         // face intérieure de la douve, épaisseur
    const ys = z.h * 0.36, yl = ys + 70, eF = 13;   // saumure, dessus des feuilles ; 70 = 30 mm
    const yc = yl + eF;
    const xr = z.l - 4;
    const cadre = `M2 2 H${r1(xr)} V${r1(z.h - 2)} H2 Z`;
    const dedans = [];
    // le chou
    dedans.push(h.rect(xw, yc, xr - xw, z.h - yc, A.blanc));
    dedans.push(lanieres(xw, yc, xr, z.h, 13, 17, 7));
    dedans.push(h.ligne(xw, yc, xr, yc, A.fin));
    // la saumure
    dedans.push(h.rect(xw, ys, xr - xw, yc - ys, A.blanc), h.rect(xw, ys, xr - xw, yc - ys, sans('eau')));
    // les feuilles entières, à plat, qui se chevauchent
    dedans.push(feuille(xw + 1, xw + 175, yl + 3, 5, 2, 3.4, 0.2));
    dedans.push(feuille(xw + 140, xr, yl + 6, 5, 2, 3.4, 1.1));
    dedans.push(feuille(xw + 210, xr, yl, 5, 2, 0, 2.6));
    // le sac : plaqué à la paroi, puis son fond qui descend se poser sur les feuilles
    const yp = ys, xf = xw + 200, yf = yl - 3;
    const dSac = `M${r1(xw)} 0 L${r1(xw)} ${r1(yp)} C${r1(xw + 50)} ${r1(ys + 8)} ${r1(xw + 130)} ${r1(yf - 2)} ${r1(xf)} ${r1(yf)} L${r1(xr + 6)} ${r1(yf)} L${r1(xr + 6)} 0 Z`;
    dedans.push(h.path(dSac, bC));
    // plis du sac contre la paroi
    dedans.push(h.path(`M${r1(xw + 150)} ${r1(yf - 30)} Q${r1(xw + 166)} ${r1(yf - 16)} ${r1(xw + 184)} ${r1(yf - 6)}`, A.fin));
    // la douve en coupe et son cercle
    dedans.push(h.rect(xw - ep, 0, ep, z.h, A.hachure('bois', 'contour')));
    dedans.push(h.rect(xw - ep - 5, z.h * 0.06, 5, 40, A.plein));

    const out = [decoupe('coupe-pourtour', cadre, dedans.join('\n')), h.path(cadre, A.fin)];
    out.push(h.ligne(xw, ys, xw + 20, ys, A.detail));
    out.push(h.rect(xw + 20, (ys + yl) / 2 - 8, 58, 17, A.blanc));
    out.push(h.cote(xw + 14, ys, xw + 14, yl, '≥ 30 mm', { cote: 'droite' }));

    return {
      svg: out.join('\n'),
      renvois: [
        { n: 3, rond: [z.l - 22, 22], cible: [xw + (z.l - xw) * 0.5, ys * 0.5], texte: 'sac plein de saumure à 5 %' },
        { n: 4, rond: [z.l - 22, ys + 12], cible: [xw + 92, ys + 48], texte: 'saumure rendue par le chou' },
        { n: 5, rond: [z.l - 22, yl + 40], cible: [z.l - 60, yl + 9], texte: 'feuilles entières : faux fond' },
        { n: 6, rond: [z.l - 22, z.h - 24], cible: [z.l - 90, z.h - 46], texte: 'chou tranché, bien tassé' },
      ],
    };
  };

  // ─── Vue C : la bonde d'eau, sur un pot ───────────────────────────────────────────────────
  const bonde = z => {
    const out = [];
    const bas = z.h - 12;
    const px0 = 26, pl = 130, pcx = px0 + pl / 2, e = 4;       // le pot Mason
    const k = Math.min(1, (z.h - 84) / 188);
    const yEp = bas - 150 * k, yCo = bas - 172 * k, yLid = bas - 188 * k;  // épaule, col, dessus du couvercle
    const cl = 46;                                             // demi-largeur du col
    const rb = 12;
    // paroi de verre : contour extérieur et intérieur
    const ext = `M${r1(pcx - cl)} ${r1(yLid + 4)} L${r1(pcx - cl)} ${r1(yCo)} C${r1(pcx - cl)} ${r1(yEp + 4)} ${r1(px0)} ${r1(yEp + 6)} ${r1(px0)} ${r1(yEp + 22)} `
      + `L${r1(px0)} ${r1(bas - rb)} Q${r1(px0)} ${r1(bas)} ${r1(px0 + rb)} ${r1(bas)} L${r1(px0 + pl - rb)} ${r1(bas)} Q${r1(px0 + pl)} ${r1(bas)} ${r1(px0 + pl)} ${r1(bas - rb)} `
      + `L${r1(px0 + pl)} ${r1(yEp + 22)} C${r1(px0 + pl)} ${r1(yEp + 6)} ${r1(pcx + cl)} ${r1(yEp + 4)} ${r1(pcx + cl)} ${r1(yCo)} L${r1(pcx + cl)} ${r1(yLid + 4)}`;
    const ix0 = px0 + e, ix1 = px0 + pl - e, ib = bas - e;
    const intD = `M${r1(pcx - cl + e)} ${r1(yLid + 4)} L${r1(pcx - cl + e)} ${r1(yCo)} C${r1(pcx - cl + e)} ${r1(yEp + 8)} ${r1(ix0)} ${r1(yEp + 10)} ${r1(ix0)} ${r1(yEp + 24)} `
      + `L${r1(ix0)} ${r1(ib - rb + 2)} Q${r1(ix0)} ${r1(ib)} ${r1(ix0 + rb - 2)} ${r1(ib)} L${r1(ix1 - rb + 2)} ${r1(ib)} Q${r1(ix1)} ${r1(ib)} ${r1(ix1)} ${r1(ib - rb + 2)} `
      + `L${r1(ix1)} ${r1(yEp + 24)} C${r1(ix1)} ${r1(yEp + 10)} ${r1(pcx + cl - e)} ${r1(yEp + 8)} ${r1(pcx + cl - e)} ${r1(yCo)} L${r1(pcx + cl - e)} ${r1(yLid + 4)}`;
    // contenu : chou, feuilles, saumure, petit sac
    const yl = bas - 92 * k, yc = yl + 4, ys = yl - 16 * k;
    const chou = `M${ix0} ${yc} H${ix1} V${r1(ib - rb + 2)} Q${r1(ix1)} ${r1(ib)} ${r1(ix1 - rb + 2)} ${r1(ib)} H${r1(ix0 + rb - 2)} Q${r1(ix0)} ${r1(ib)} ${r1(ix0)} ${r1(ib - rb + 2)} Z`;
    out.push(decoupe('coupe-pot', chou, lanieres(ix0, yc, ix1, ib, 7, 7, 5)));
    out.push(h.rect(ix0, ys, ix1 - ix0, yc - ys, A.blanc), h.rect(ix0, ys, ix1 - ix0, yc - ys, sans('eau')));
    out.push(h.ligne(ix0, ys, ix1, ys, A.detail));
    out.push(feuille(ix0 + 1, ix0 + 70, yl - 1, 2.2, 1, 0, 0.5));
    out.push(feuille(ix0 + 50, ix1 - 1, yl - 1.5, 2.2, 1, 0, 1.9));
    const lx = ix1 - ix0, sCol = 5, sYCol = ys - 36 * k;
    out.push(h.path(sac({ xg: ix0, xd: ix1, yPlaque: ys - 6 * k, yHaut: ys - 18 * k, yFond: yl - 3, xFondG: pcx - lx * 0.2, xFondD: pcx + lx * 0.2, col: sCol, yCol: sYCol }), bA));
    out.push(h.path(`M${r1(pcx - sCol)} ${r1(sYCol)} L${r1(pcx - 3)} ${r1(sYCol - 6)} L${r1(pcx - 7)} ${r1(sYCol - 12)} L${r1(pcx)} ${r1(sYCol - 10)} L${r1(pcx + 6)} ${r1(sYCol - 13)} L${r1(pcx + 3)} ${r1(sYCol - 6)} L${r1(pcx + sCol)} ${r1(sYCol)} Z`, bA));
    out.push(h.formes.corde([[pcx - 6, sYCol - 2], [pcx + 6, sYCol - 4]], { ep: 1.8, debut: 'coupe', fin: 'coupe' }));
    // le verre
    out.push(h.path(ext, A.contour), h.path(intD, A.detail));
    // le couvercle : la pastille percée et la bague vissée
    const tx = pcx + 26;                       // la tubulure traverse la pastille ici
    const tr = 3.2;                            // demi-diamètre de la tubulure
    out.push(h.rect(pcx - cl - 4, yLid, (tx - tr) - (pcx - cl - 4), 3, A.plein));
    out.push(h.rect(tx + tr, yLid, pcx + cl + 4 - (tx + tr), 3, A.plein));
    out.push(h.rect(pcx - cl - 5, yLid - 1, 5, 16, A.hachure('metal', 'arete')), h.rect(pcx + cl, yLid - 1, 5, 16, A.hachure('metal', 'arete')));
    // le petit pot d'eau
    const qx0 = z.l - 96, ql = 72, qh = 84 * k, qcx = qx0 + ql / 2, qe = 3.5;
    const yEau = bas - qh + 18 * k;
    out.push(h.rect(qx0 + qe, yEau, ql - 2 * qe, bas - qe - yEau, A.blanc), h.rect(qx0 + qe, yEau, ql - 2 * qe, bas - qe - yEau, sans('eau')));
    out.push(h.ligne(qx0 + qe, yEau, qx0 + ql - qe, yEau, A.detail));
    // la tubulure : du vide sous le couvercle, par-dessus, jusqu'au fond du petit pot
    const yBout = bas - 16;
    const arc = [[tx, yLid + 12], [tx, yLid - 14], [tx + 10, yLid - 38], [(tx + qcx) / 2, yLid - 48], [qcx - 10, yLid - 36], [qcx, yLid - 10], [qcx, bas - qh + 4], [qcx, yBout]];
    out.push(h.formes.corde(arc, { ep: 2 * tr, debut: 'ouvert', fin: 'ouvert' }));
    // le joint de suif autour de la tubulure, sur la pastille
    out.push(h.path(`M${r1(tx - tr - 11)} ${r1(yLid)} Q${r1(tx - tr - 3)} ${r1(yLid - 2)} ${r1(tx - tr)} ${r1(yLid - 9)} L${r1(tx - tr)} ${r1(yLid)} Z`, A.plein));
    out.push(h.path(`M${r1(tx + tr + 11)} ${r1(yLid)} Q${r1(tx + tr + 3)} ${r1(yLid - 2)} ${r1(tx + tr)} ${r1(yLid - 9)} L${r1(tx + tr)} ${r1(yLid)} Z`, A.plein));
    // les bulles qui sortent du bout
    [[7, 2, 3.2], [9, 12, 2.6], [7, 22, 3], [10, 31, 2.4], [8, 40, 2.6]].forEach(([dx, dy, r]) => out.push(h.cercle(qcx + dx, yBout - dy, r, bD)));
    // le petit pot, par-dessus
    out.push(h.path(`M${qx0} ${r1(bas - qh)} V${r1(bas - 6)} Q${qx0} ${bas} ${qx0 + 6} ${bas} H${qx0 + ql - 6} Q${qx0 + ql} ${bas} ${qx0 + ql} ${r1(bas - 6)} V${r1(bas - qh)}`, A.contour));
    out.push(h.path(`M${r1(qx0 + qe)} ${r1(bas - qh)} V${r1(bas - qe)} H${r1(qx0 + ql - qe)} V${r1(bas - qh)}`, A.detail));
    // le trajet du gaz, le long de la tubulure
    out.push(h.fleche(`M${r1(tx - 13)} ${r1(yLid - 12)} C${r1(tx - 13)} ${r1(yLid - 44)} ${r1(tx + 12)} ${r1(yLid - 62)} ${r1((tx + qcx) / 2 + 6)} ${r1(yLid - 62)}`, A.detail));
    out.push(h.fleche(`M${r1(tx - 1)} ${r1(sYCol - 2)} L${r1(tx - 1)} ${r1(yLid + 16)}`, A.cache));

    return {
      svg: out.join('\n'),
      renvois: [
        { n: 7, rond: [pcx - cl - 10, yLid - 26], cible: [pcx - 20, yLid + 1], texte: 'couvercle de pot percé' },
        { n: 8, rond: [pcx - 12, yLid - 40], cible: [tx - tr - 3, yLid - 3], texte: 'joint de suif ou de cire' },
        { n: 9, rond: [qcx + 34, yLid - 44], cible: [qcx - 4, yLid - 30], texte: 'tubulure d’entaille' },
        { n: 10, rond: [z.l - 14, yEau - 30], cible: [qx0 + ql - 12, yEau + 16], texte: 'petit pot d’eau : le gaz bulle' },
      ],
    };
  };

  // ─── Vue D : s'il fuit encore, chasser les cercles vers le ventre ─────────────────────────
  const chasser = z => {
    const out = [];
    const cx = z.l * 0.52, yt = 34, yb = z.h - 14, H = yb - yt;
    const rb = Math.min(z.l * 0.26, H * 0.36), re = rb * 0.84;
    const R = profil(yt, yb, re, rb);
    const ry = 9;                                  // le baril vu un peu d'en haut
    // silhouette
    const g = courbe(y => cx - R(y), yt, yb), d = courbe(y => cx + R(y), yb, yt);
    out.push(h.path(poly([...g, ...d]), bC));
    // le bas : l'arc de devant
    out.push(h.path(`M${r1(cx - re)} ${r1(yb)} A${r1(re)} ${ry} 0 0 0 ${r1(cx + re)} ${r1(yb)}`, A.contour));
    // l'ouverture du haut
    out.push(h.ellipse(cx, yt, re, ry, bC));
    out.push(h.ellipse(cx, yt, re - 6, ry - 2, A.detail));
    // les joints du merrain, côté devant
    for (let k = -3; k <= 3; k++) {
      const s = Math.sin(k * Math.PI / 8), c = Math.cos(k * Math.PI / 8);
      out.push(h.path('M' + P(courbe(y => cx + R(y) * s, yt + ry * c, yb + ry * c * 0.9, 16)).join(' L'), A.fin));
    }
    // les cercles : bande avec l'arc de devant
    const cercle = (y, hh) => {
      const r0 = R(y), r2 = R(y + hh);
      out.push(h.path(`M${r1(cx - r0 - 1)} ${r1(y)} A${r1(r0 + 1)} ${ry} 0 0 0 ${r1(cx + r0 + 1)} ${r1(y)} L${r1(cx + r2 + 1)} ${r1(y + hh)} A${r1(r2 + 1)} ${ry} 0 0 1 ${r1(cx - r2 - 1)} ${r1(y + hh)} Z`, A.hachure('metal', 'arete')));
    };
    const yq = yt + H * 0.26;                      // le cercle de quartier, du haut
    [yt + 4, yq, yb - H * 0.26 - 12, yb - 16].forEach(y => cercle(y, 12));
    // les flèches : vers le ventre
    const fl = (x, y0, y1) => out.push(h.fleche(`M${r1(x)} ${r1(y0)} L${r1(x)} ${r1(y1)}`, A.arete));
    fl(cx - R(yq) - 30, yq + 2, yq + 30);
    fl(cx + R(yq) + 30, yq + 2, yq + 30);
    fl(cx - R(yb - H * 0.26) - 30, yb - H * 0.26, yb - H * 0.26 - 28);
    fl(cx + R(yb - H * 0.26) + 30, yb - H * 0.26, yb - H * 0.26 - 28);
    // le maillet : tête en cylindre de bois, axe vertical, la face du bas posée sur l'arête du haut du cercle
    const rx = 20, rye = 6, th = 44;
    const maillet = (xm, s, at, atH) => {
      const yB = yq, yH = yq - th, ym = yq - th / 2;
      const o = [];
      // le manche rond, qui entre dans le flanc à mi-hauteur
      const x0 = xm - s * rx, x1 = xm - s * (rx + 50);
      o.push(h.path(`M${r1(x0)} ${r1(ym - 4)} L${r1(x1)} ${r1(ym - 4)} A4 4 0 0 ${s > 0 ? 0 : 1} ${r1(x1)} ${r1(ym + 4)} L${r1(x0)} ${r1(ym + 4)}`, at));
      o.push(h.path(`M${r1(xm - rx)} ${r1(yH)} L${r1(xm - rx)} ${r1(yB)} A${rx} ${rye} 0 0 0 ${r1(xm + rx)} ${r1(yB)} L${r1(xm + rx)} ${r1(yH)} Z`, atH));
      o.push(h.ellipse(xm, yH, rx, rye, at));
      return o.join('\n');
    };
    const xm = cx - R(yq) + 8;
    out.push(maillet(xm, 1, bD, blanc(A.hachure('bois', 'contour'))));
    out.push(h.fleche(`M${r1(xm - 34)} ${r1(yq - th - 30)} Q${r1(xm - 4)} ${r1(yq - th - 34)} ${r1(xm)} ${r1(yq - th - 10)}`, A.arete));
    // son coup suivant, de l'autre côté
    const xm2 = cx + R(yq) - 8;
    out.push(maillet(xm2, -1, A.cache, A.cache));

    return {
      svg: out.join('\n'),
      renvois: [
        { n: 11, rond: [xm - 62, yq - th - 26], cible: [xm - 40, yq - th / 2 - 4], texte: 'coups alternés, au maillet' },
      ],
    };
  };

  const vue = f => ({ dessin: z => f(z).svg, renvois: z => f(z).renvois });

  return {
    ref: '80-40',
    titre: 'Le baril de choucroute : le chou sous la saumure, le poids, la bonde',
    desc: 'En coupe, un baril de bois franc cerclé : le chou tranché tassé jusqu’au fond, deux ou trois feuilles entières posées à plat par-dessus, '
      + 'au moins 3 cm de saumure au-dessus du chou, et un sac alimentaire plein de saumure posé sur le tout, ses flancs plaqués contre la paroi. '
      + 'Le pourtour est grossi à côté. En bas, la bonde d’eau sur un pot Mason : une tubulure d’entaille passe par le couvercle percé, étanchée au suif, '
      + 'et plonge dans un petit pot d’eau où le gaz sort en bulles. Enfin, le baril vu de l’extérieur : on chasse les cercles vers le ventre au maillet, '
      + 'par petits coups alternés d’un côté et de l’autre.',
    format: 'pleine',
    disposition: [['baril', 'pourtour'], ['bonde', 'chasser']],
    hauteurs: [1.08, 1],
    largeurs: [[1, 1.05], [1.15, 1]],
    vues: {
      baril: { titre: 'Le baril, en coupe', ...vue(baril) },
      pourtour: { titre: 'Le pourtour, grossi', ...vue(pourtour) },
      bonde: { titre: 'La bonde d’eau, sur un pot', ...vue(bonde) },
      chasser: { titre: 'S’il fuit encore le lendemain : chasser les cercles', ...vue(chasser) },
    },
    danger: 'Danger — le sac se remplit de saumure à 5 %, jamais d’eau claire : il finit toujours par crever, et l’eau qui tombe dans le ferment dilue l’acide et fait remonter le pH.',
  };
};
