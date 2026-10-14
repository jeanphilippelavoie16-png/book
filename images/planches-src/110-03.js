// 110-03 — Le chevillage à tire (ch. 110). Aucune cote : le décalage, la pointe et le diamètre
// sont [À VÉRIFIER] dans le chapitre. Le décalage est exagéré au dessin, et le titre le dit.
// Loupe ×4 sur les deux trous dans la vue de face.

module.exports = (h) => {
  const r = 10;          // rayon de la cheville
  const xm = 110;        // axe des trous des joues, dans les coupes
  const PL = 36, PR = 150, MB = 66;   // poteau : gauche, face, fond de mortaise

  // Coupe horizontale au niveau de la cheville. st.g : jour à l'épaulement ; st.off : décalage
  // du trou du tenon ; st.cheville : 'entre' ou 'chassee'.
  function coupe(z, st) {
    const cy = z.h / 2;
    const PT = cy - 90, PB = cy + 90;          // poteau, dans le sens de la cheville
    const RT = cy - 80, RB = cy + 80;          // traverse
    const TT = cy - 30, TB = cy + 30;          // tenon
    const TE = MB + 8 + st.g, SH = PR + st.g;  // bout du tenon, épaulement
    const RX = z.l - 16;
    const cl = xm - r, cr = xm + r;            // parois des trous des joues
    const hl = xm + st.off - r, hr = xm + st.off + r;   // parois du trou du tenon
    const out = [];
    const bois = h.a.hachure('bois', 'arete');
    // Poteau coupé en travers du fil : trois morceaux, les trous des joues les séparent.
    out.push(h.path(`M ${PL} ${PT} H ${cl} V ${TT} H ${MB} V ${TB} H ${cl} V ${PB} H ${PL} Z`, bois));
    out.push(h.rect(cr, PT, PR - cr, TT - PT, bois));
    out.push(h.rect(cr, TB, PR - cr, PB - TB, bois));
    // Traverse coupée dans le fil : le trou du tenon isole le bout du tenon.
    out.push(h.rect(TE, TT, hl - TE, TB - TT, h.a.blanc));
    out.push(h.rect(TE, TT, hl - TE, TB - TT, h.a.arete));
    const rail = `M ${hr} ${TT} H ${SH} V ${RT} H ${RX} V ${cy - 10} L ${RX - 8} ${cy - 3} L ${RX + 8} ${cy + 3} L ${RX} ${cy + 10} V ${RB} H ${SH} V ${TB} H ${hr} Z`;
    out.push(h.path(rail, h.a.blanc));
    out.push(h.path(rail, h.a.arete));
    // Fil de la traverse.
    [[RT + 14, SH + 8, RX - 14], [RT + 32, SH + 34, RX - 44], [RB - 14, SH + 8, RX - 14], [RB - 31, SH + 26, RX - 60],
     [cy - 13, hr + 6, RX - 14], [cy + 13, hr + 14, RX - 30]].forEach(([y, a, b]) => out.push(h.ligne(a, y, b, y, h.a.detail)));
    [[cy - 13], [cy + 13]].forEach(([y]) => out.push(h.ligne(TE + 5, y, hl - 5, y, h.a.detail)));
    // Silhouettes, au trait fort.
    out.push(h.path(`M ${cl} ${PB} H ${PL} V ${PT} H ${cl} M ${cr} ${PT} H ${PR} V ${TT} M ${PR} ${TB} V ${PB} H ${cr}`, h.a.contour));
    out.push(h.path(`M ${RX} ${RT} H ${SH} V ${TT} H ${hr} M ${hl} ${TT} H ${TE} V ${TB} H ${hl} M ${hr} ${TB} H ${SH} V ${RB} H ${RX}`, h.a.contour));
    // La cheville.
    let peg;
    if (st.cheville === 'entre') {
      const top = PT - 50, y0 = TT - 17, yt = TT + 2;
      peg = `M ${cl + 2} ${top} H ${cr - 2} L ${cr} ${top + 2} V ${y0} L ${xm} ${yt} L ${cl} ${y0} V ${top + 2} Z`;
      out.push(h.path(peg, h.a.blanc));
      out.push(h.path(peg, h.a.contour));
      out.push(h.ligne(xm - 3, top + 8, xm - 3, y0 - 4, h.a.detail));
      out.push(h.ligne(xm + 4, top + 14, xm + 4, y0 - 10, h.a.detail));
      // On chasse vers le bas (la charte : le geste en rouge) ; le tenon part vers le fond.
      out.push(h.geste(`M ${cr + 18} ${PT - 48} V ${PT - 14}`));
      out.push(h.fleche(`M ${RX - 18} ${RB + 20} H ${SH + 40}`));
    } else {
      const b = st.off, top = PT - 14, bot = PB + 5, tip = PB + 22;
      peg = `M ${cl + 2} ${top} H ${cr - 2} L ${cr} ${top + 2} V ${TT - 7} C ${cr} ${TT} ${cr + b} ${TT} ${cr + b} ${TT + 7} ` +
        `V ${TB - 7} C ${cr + b} ${TB} ${cr} ${TB} ${cr} ${TB + 7} V ${bot} L ${xm} ${tip} L ${cl} ${bot} ` +
        `V ${TB + 7} C ${cl} ${TB} ${cl + b} ${TB} ${cl + b} ${TB - 7} V ${TT + 7} C ${cl + b} ${TT} ${cl} ${TT} ${cl} ${TT - 7} V ${top + 2} Z`;
      out.push(h.path(peg, h.a.blanc));
      out.push(h.path(peg, h.a.contour));
      out.push(h.path(`M ${xm + 2} ${top + 6} V ${TT - 7} C ${xm + 2} ${TT} ${xm + 2 + b} ${TT} ${xm + 2 + b} ${TT + 7} V ${TB - 7} C ${xm + 2 + b} ${TB} ${xm + 2} ${TB} ${xm + 2} ${TB + 7} V ${bot - 2}`, h.a.detail));
      // la charte : le point à contrôler, l'épaulement au contact du poteau, sans jour
      out.push(h.controle(PR, cy - 56, 13));
    }
    return out.join('\n');
  }

  const DX = 50, XA = 214 + DX, LX = 96;
  const mixte = 'fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-linecap="round" stroke-dasharray="7 2.5 0.1 2.5"';
  // Les deux trous à l'échelle k : trou des joues au trait plein, trou du tenon en tireté,
  // jour noir du recouvrement, croix d'axes en trait mixte qui dépasse de 6.
  function trous(xa, cy, k) {
    const R = r * k, xb = xa + 9 * k, d = (xb - xa) / 2, yy = Math.sqrt(R * R - d * d), e = R + 6, o = [];
    o.push(h.cercle(xa, cy, R, h.a.blanc));
    o.push(h.path(`M ${xa + d} ${cy - yy} A ${R} ${R} 0 0 1 ${xa + d} ${cy + yy} A ${R} ${R} 0 0 1 ${xa + d} ${cy - yy} Z`, h.a.plein));
    o.push(h.cercle(xa, cy, R, k > 1 ? h.a.contour : h.a.arete));
    o.push(h.cercle(xb, cy, R, k > 1 ? trait2 : h.a.cache));
    [xa, xb].forEach(x => { o.push(h.ligne(x - e, cy, x + e, cy, mixte)); o.push(h.ligne(x, cy - e, x, cy + e, mixte)); });
    return o.join('\n');
  }
  const trait2 = 'fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-dasharray="8 5"';

  return {
    ref: '110-03',
    titre: 'Le chevillage à tire',
    desc: 'Un poteau et une traverse assemblés à tenon et mortaise. Vu de face : le trou du tenon, en tireté, est percé plus près de l’épaulement que celui des joues. En coupe, vu de dessus : la cheville pointue entre dans le trou décalé, pousse le tenon vers le fond et tire l’épaulement contre le poteau ; chassée, elle reste cintrée dans le tenon et le joint reste serré.',
    format: 'pleine',
    disposition: [['face'], ['avant', 'apres']],
    hauteurs: [1, 1.1],
    vues: {
      face: {
        titre: 'Vu de face, avant la cheville (décalage exagéré)',
        dessin: z => {
          const cy = z.h / 2;
          const D = DX;
          const FL = 140 + D, FR = 254 + D, cx = (FL + FR) / 2;
          const top = cy - 110, bot = cy + 100, RX = 540 + D;
          const xa = XA, xb = XA + 9;   // trou des joues (40 en retrait de la face), trou du tenon
          const o = [];
          // Poteau.
          o.push(h.ligne(FL, top, FL, bot, h.a.contour));
          o.push(h.ligne(FR, top, FR, bot, h.a.contour));
          o.push(h.path(`M ${FL} ${top} H ${cx - 10} L ${cx - 4} ${top - 7} L ${cx + 4} ${top + 7} L ${cx + 10} ${top} H ${FR}`, h.a.arete));
          o.push(h.path(`M ${FL} ${bot} H ${cx - 10} L ${cx - 4} ${bot - 7} L ${cx + 4} ${bot + 7} L ${cx + 10} ${bot} H ${FR}`, h.a.arete));
          o.push(h.path(`M ${150 + D} ${top + 8} C ${147 + D} ${cy - 50} ${153 + D} ${cy + 30} ${150 + D} ${bot - 8}`, h.a.detail));
          o.push(h.path(`M ${161 + D} ${top + 34} C ${159 + D} ${cy - 20} ${163 + D} ${cy + 40} ${161 + D} ${cy + 80}`, h.a.detail));
          // Mortaise et tenon, cachés dans le poteau.
          o.push(h.path(`M ${FR} ${cy - 60} H ${170 + D} V ${cy + 60} H ${FR}`, h.a.cache));
          o.push(h.ligne(182 + D, cy - 60, 182 + D, cy + 60, h.a.cache));
          // Traverse, avec un jour à l'épaulement.
          o.push(h.ligne(FR, cy - 60, FR + 4, cy - 60, h.a.arete));
          o.push(h.ligne(FR, cy + 60, FR + 4, cy + 60, h.a.arete));
          o.push(h.path(`M ${RX} ${cy - 75} H ${FR + 4} V ${cy - 60} M ${FR + 4} ${cy + 60} V ${cy + 75} H ${RX}`, h.a.contour));
          o.push(h.path(`M ${RX} ${cy - 75} V ${cy - 10} L ${RX - 8} ${cy - 3} L ${RX + 8} ${cy + 3} L ${RX} ${cy + 10} V ${cy + 75}`, h.a.arete));
          [[cy - 52, 276, 520], [cy - 20, 300, 470], [cy + 28, 268, 528], [cy + 55, 330, 500]]
            .forEach(([y, a, b]) => o.push(h.path(`M ${a + D} ${y} C ${a + D + 80} ${y - 3} ${b + D - 80} ${y + 3} ${b + D} ${y}`, h.a.detail)));
          o.push(trous(xa, cy, 1));
          // La loupe : les deux trous grossis quatre fois, reliée aux trous par un petit cercle tireté.
          const xm2 = (xa + xb) / 2, rl = 74, k = 4;
          o.push(h.cercle(xm2, cy, 22, h.a.cache));
          const LYv = cy - 50; const ang = Math.atan2(cy - LYv, xm2 - LX);
          o.push(h.ligne(LX + rl * Math.cos(ang), LYv + rl * Math.sin(ang), xm2 - 22 * Math.cos(ang), cy - 22 * Math.sin(ang), h.a.cache));
          o.push(h.cercle(LX, LYv, rl, h.a.blanc));
          o.push(trous(LX - k * (xm2 - xa), LYv, k));
          o.push(h.cercle(LX, LYv, rl, h.a.contour));
          return o.join('\n');
        },
        renvois: z => {
          const cy = z.h / 2;
          return [
            { n: 1, rond: [16, cy - 110], cible: [LX - 18 - 40 * 0.707, cy - 50 - 40 * 0.707], texte: 'trou percé à blanc dans la joue' },
            { n: 2, rond: [150, cy + 52], cible: [LX + 18 + 40 * 0.707, cy - 50 + 40 * 0.707], texte: 'trou du tenon, décalé vers l’épaulement' },
          ];
        },
      },
      avant: {
        titre: 'En coupe, vu de dessus : la cheville entre',
        dessin: z => coupe(z, { g: 4, off: 9, cheville: 'entre' }),
        renvois: z => {
          const cy = z.h / 2;
          return [
            { n: 3, rond: [46, cy - 120], cible: [xm - r, cy - 120], texte: 'cheville pointue qui cherche le trou' },
          ];
        },
      },
      apres: {
        titre: 'Chassée : le joint se serre seul',
        dessin: z => coupe(z, { g: 0, off: 5, cheville: 'chassee' }),
        renvois: z => {
          const cy = z.h / 2;
          return [
            { n: 4, rond: [196, cy - 116], cible: [PR, cy - 76], texte: 'épaulement tiré au contact' },
            { n: 5, rond: [16, cy + 20], cible: [70, cy + 20], texte: 'jeu au fond de la mortaise' },
          ];
        },
      },
    },
  };
};
