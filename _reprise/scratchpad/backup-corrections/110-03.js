// 87-03 — Le chevillage à tire (ch. 87, §5.6, étapes 28-29 ; mode dégradé 20).
// Aucune cote : le décalage (2 à 3 mm), la pointe (15 à 20 mm) et le diamètre (tiers du tenon)
// sont [À VÉRIFIER] dans le chapitre. Le décalage est exagéré au dessin, et le titre le dit.

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
      // On chasse vers le bas ; le tenon part vers le fond.
      out.push(h.fleche(`M ${cr + 18} ${PT - 48} V ${PT - 14}`));
      out.push(h.fleche(`M ${RX - 18} ${RB + 20} H ${SH + 40}`));
    } else {
      const b = st.off, top = PT - 14, bot = PB + 5, tip = PB + 22;
      peg = `M ${cl + 2} ${top} H ${cr - 2} L ${cr} ${top + 2} V ${TT - 7} C ${cr} ${TT} ${cr + b} ${TT} ${cr + b} ${TT + 7} ` +
        `V ${TB - 7} C ${cr + b} ${TB} ${cr} ${TB} ${cr} ${TB + 7} V ${bot} L ${xm} ${tip} L ${cl} ${bot} ` +
        `V ${TB + 7} C ${cl} ${TB} ${cl + b} ${TB} ${cl + b} ${TB - 7} V ${TT + 7} C ${cl + b} ${TT} ${cl} ${TT} ${cl} ${TT - 7} V ${top + 2} Z`;
      out.push(h.path(peg, h.a.blanc));
      out.push(h.path(peg, h.a.contour));
      out.push(h.path(`M ${xm + 2} ${top + 6} V ${TT - 7} C ${xm + 2} ${TT} ${xm + 2 + b} ${TT} ${xm + 2 + b} ${TT + 7} V ${TB - 7} C ${xm + 2 + b} ${TB} ${xm + 2} ${TB} ${xm + 2} ${TB + 7} V ${bot - 2}`, h.a.detail));
    }
    return out.join('\n');
  }

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
          const FL = 140, FR = 254, cx = (FL + FR) / 2;
          const top = cy - 110, bot = cy + 100, RX = 540;
          const xa = 214, xb = 214 + 9;   // trou des joues (40 en retrait de la face), trou du tenon
          const o = [];
          // Poteau.
          o.push(h.ligne(FL, top, FL, bot, h.a.contour));
          o.push(h.ligne(FR, top, FR, bot, h.a.contour));
          o.push(h.path(`M ${FL} ${top} H ${cx - 10} L ${cx - 4} ${top - 7} L ${cx + 4} ${top + 7} L ${cx + 10} ${top} H ${FR}`, h.a.arete));
          o.push(h.path(`M ${FL} ${bot} H ${cx - 10} L ${cx - 4} ${bot - 7} L ${cx + 4} ${bot + 7} L ${cx + 10} ${bot} H ${FR}`, h.a.arete));
          o.push(h.path(`M 150 ${top + 8} C 147 ${cy - 50} 153 ${cy + 30} 150 ${bot - 8}`, h.a.detail));
          o.push(h.path(`M 161 ${top + 34} C 159 ${cy - 20} 163 ${cy + 40} 161 ${cy + 80}`, h.a.detail));
          // Mortaise et tenon, cachés dans le poteau.
          o.push(h.path(`M ${FR} ${cy - 60} H 170 V ${cy + 60} H ${FR}`, h.a.cache));
          o.push(h.ligne(182, cy - 60, 182, cy + 60, h.a.cache));
          // Traverse, avec un jour à l'épaulement.
          o.push(h.ligne(FR, cy - 60, FR + 4, cy - 60, h.a.arete));
          o.push(h.ligne(FR, cy + 60, FR + 4, cy + 60, h.a.arete));
          o.push(h.path(`M ${RX} ${cy - 75} H ${FR + 4} V ${cy - 60} M ${FR + 4} ${cy + 60} V ${cy + 75} H ${RX}`, h.a.contour));
          o.push(h.path(`M ${RX} ${cy - 75} V ${cy - 10} L ${RX - 8} ${cy - 3} L ${RX + 8} ${cy + 3} L ${RX} ${cy + 10} V ${cy + 75}`, h.a.arete));
          [[cy - 52, 276, 520], [cy - 20, 300, 470], [cy + 28, 268, 528], [cy + 55, 330, 500]]
            .forEach(([y, a, b]) => o.push(h.path(`M ${a} ${y} C ${a + 80} ${y - 3} ${b - 80} ${y + 3} ${b} ${y}`, h.a.detail)));
          // Axes des deux trous.
          o.push(h.ligne(xa, cy - 26, xa, cy + 26, h.a.fin));
          o.push(h.ligne(xb, cy - 26, xb, cy + 26, h.a.fin));
          // Trou des joues ; à travers, on voit le croissant du tenon et le jour du trou décalé.
          o.push(h.cercle(xa, cy, r, h.a.blanc));
          const d = (xb - xa) / 2, yy = Math.sqrt(r * r - d * d);
          o.push(h.path(`M ${xa + d} ${cy - yy} A ${r} ${r} 0 0 1 ${xa + d} ${cy + yy} A ${r} ${r} 0 0 1 ${xa + d} ${cy - yy} Z`, h.a.plein));
          o.push(h.cercle(xa, cy, r, h.a.arete));
          o.push(h.cercle(xb, cy, r, h.a.cache));
          return o.join('\n');
        },
        renvois: z => {
          const cy = z.h / 2;
          return [
            { n: 1, rond: [80, cy - 70], cible: [214 - 7.1, cy - 7.1], texte: 'trou percé à blanc dans la joue' },
            { n: 2, rond: [236, cy + 124], cible: [223 + 6, cy + 8], texte: 'trou du tenon, décalé vers l’épaulement' },
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
            { n: 5, rond: [44, cy + 128], cible: [70, cy + 20], texte: 'jeu au fond de la mortaise' },
          ];
        },
      },
    },
  };
};
