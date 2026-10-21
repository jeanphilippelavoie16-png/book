// Le chou tranché en tas, vu en coupe dans la cuve (planche 80-41 et sa feuille d'essai _essai-chou-tranche.js).
// Le second regard du 19 octobre sur la 80-41 : le tas fait de 200 lanières tordues en S et emmêlées se lisait comme une
// touffe de poil ou des nouilles (la même faute que la laine d'acier de la 13-10 : « une matière se reconnaît à sa vraie
// fibre »). Le chou cru tranché, en vrai (images/photos/tri/80-choucroute-jour0-salage.jpg) : des lanières fines et
// plates, en arc doux, jamais en S ; dans une cuve, elles se couchent à plat les unes sur les autres et le dessus se
// tasse presque plat.
// Ici : des arcs simples (les deux points de contrôle du même côté, comme les tranches qui tombent par la fente), couchés
// en rangs à peu près horizontaux, du fond vers le dessus ; chaque rang recouvre un peu celui d'en dessous ; le rang du
// dessus pose son bord haut sur une ligne presque plate.
//   mode 'ruban' : chaque lanière est un ruban blanc à double trait fin (comme les tranches qui tombent) ;
//   mode 'ligne' : chaque lanière est un seul trait fin.
module.exports = (h) => (o) => {
  const A = h.a;
  const r1 = v => Math.round(v * 10) / 10;
  const {
    x0, x1, yHaut, yBas, id, graine = 9, mode = 'ruban',
    l0 = 22, l1 = 38, pas = 5, bombe = [1.8, 4.6], inclin = 0.11, w0 = 2.2, w1 = 2.8, recouvre = [0.62, 0.9],
  } = o;
  let s = graine;
  const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const lan = [];
  // les rangs, du fond vers le dessus ; le dernier pose le haut de ses lanières sur yHaut
  const rangs = [];
  for (let y = yBas - 2.2; y > yHaut + pas * 0.9; y -= pas) rangs.push(y);
  rangs.push(null);
  rangs.forEach((yr, i) => {
    let x = x0 - r() * l1;
    while (x < x1 + 4) {
      const l = l0 + r() * (l1 - l0);
      const haut = yr === null;
      const a = (r() - 0.5) * 2 * (haut ? inclin * 0.4 : inclin);
      // la flèche de l'arc : au dessus, les lanières bombent vers le haut, couchées sur le tas
      const sens = haut ? -1 : (r() < 0.5 ? -1 : 1);
      const b = sens * (bombe[0] + r() * (bombe[1] - bombe[0]));
      const w = w0 + r() * (w1 - w0);
      const cx = x + l / 2;
      // le rang du dessus : le haut de la lanière (milieu de l'arc, bord du dessus) touche yHaut
      const cy = haut ? yHaut + 0.75 * Math.abs(b) + w / 2 + 0.4 + (r() - 0.5) * 0.8 : yr + (r() - 0.5) * 2.4;
      lan.push({ cx, cy, l, a, b, w });
      x += l * (recouvre[0] + r() * (recouvre[1] - recouvre[0]));
    }
  });
  const trace = ({ cx, cy, l, a, b, w }) => {
    const co = Math.cos(a), si = Math.sin(a), T = (u, v) => [r1(cx + u * co - v * si), r1(cy + u * si + v * co)];
    if (mode === 'ligne') {
      const p = [T(-l / 2, 0), T(-l / 6, b), T(l / 6, b), T(l / 2, 0)];
      return `<path d="M${p[0][0]} ${p[0][1]} C${p[1][0]} ${p[1][1]} ${p[2][0]} ${p[2][1]} ${p[3][0]} ${p[3][1]}" ${A.detail}/>`;
    }
    // un ruban : le bout coupé est franc, à peine moins large que le milieu
    const e = w / 2, eb = w * 0.36;
    const p = [T(-l / 2, -eb), T(-l / 6, b - e), T(l / 6, b - e), T(l / 2, -eb), T(l / 2, eb), T(l / 6, b + e), T(-l / 6, b + e), T(-l / 2, eb)];
    return `<path d="M${p[0][0]} ${p[0][1]} C${p[1][0]} ${p[1][1]} ${p[2][0]} ${p[2][1]} ${p[3][0]} ${p[3][1]} L${p[4][0]} ${p[4][1]} C${p[5][0]} ${p[5][1]} ${p[6][0]} ${p[6][1]} ${p[7][0]} ${p[7][1]} Z" ${A.detail.replace('fill="none"', 'fill="#FFFFFF"')}/>`;
  };
  const out = [];
  out.push(`<clipPath id="${id}"><rect x="${r1(x0)}" y="${r1(yHaut - 12)}" width="${r1(x1 - x0)}" height="${r1(yBas - yHaut + 12)}"/></clipPath>`);
  // le fond blanc du tas, sous les lanières : son bord du haut est presque plat, un peu sous le haut des lanières
  out.push(h.path(`M${r1(x0)} ${r1(yBas)} L${r1(x0)} ${r1(yHaut + 2.6)} L${r1(x1)} ${r1(yHaut + 2.6)} L${r1(x1)} ${r1(yBas)} Z`, A.blanc));
  out.push(`<g clip-path="url(#${id})">`, ...lan.map(trace), '</g>');
  return out.join('\n');
};
