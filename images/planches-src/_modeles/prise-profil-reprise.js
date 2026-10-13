// Modèle : la main droite qui serre un manche vu par le bout, de profil côté pouce.
// Pas une planche du livre : feuille de modèle, à porter ensuite dans formes.js.
//
// dessiner(x, y, echelle) rend le SVG. (x, y) est le centre du manche ; à l'échelle 1 la main
// fait ~190 du poignet au bout du majeur, le manche a 34 de diamètre. Avant-bras vers la gauche,
// dos de la main en haut. Repère local en mm, y vers le bas.
//
// Ordre de peinture, du plus loin au plus proche : les doigts derrière l'index (escalier),
// la main et l'index, le pouce, le bout du manche (il vient vers l'œil).

function dessiner(x, y, echelle = 1) {
  const e = echelle;
  const T = d => d.replace(/(-?\d+(?:\.\d+)?)[ ,]+(-?\d+(?:\.\d+)?)/g,
    (_, a, b) => `${(+a * e + x).toFixed(2)} ${(+b * e + y).toFixed(2)}`);
  const SIL = 1.5, ART = 0.7, FIN = 0.5;
  const trait = (d, w) => `<path d="${T(d)}" fill="none" stroke="#000" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const plein = d => `<path d="${T(d)}" fill="#fff" stroke="none"/>`;
  const out = [];

  // ── 1. les doigts derrière l'index, en escalier : chaque jointure du milieu recule et descend
  //       d'un cran. Chaque trait naît sous le doigt de devant et finit sous le pouce, pour que les
  //       raccords soient cachés par les pleins peints ensuite. L'annulaire d'abord, puis le majeur ──
  const annulaire = 'M 20.8 31.6 C 21.2 34.8, 20.2 37.8, 17.8 39.2 C 15.4 40.4, 11.6 40.6, 7.6 40.8';
  out.push(plein(annulaire + ' L 7.6 34 L 20.8 29 Z'), trait(annulaire, SIL));
  const majeur = 'M 30.2 24.6 C 30.9 27.6, 30.9 30.6, 29.4 32.4 C 27.8 34.2, 25 34.7, 22 34.3 C 20.6 34.1, 19.4 34.1, 17.6 34.7';
  out.push(plein(majeur + ' L 17.6 25 Z'), trait(majeur, SIL));

  // ── 2. la main, l'avant-bras et l'index qui fait le tour du manche ──
  // le dos file droit du poignet à la tête du métacarpe, qui pointe un peu ; coin serré à la jointure ;
  // mur de la première phalange devant le manche ; vrai coin à l'articulation du milieu ; la phalange
  // du milieu repart à plat sous le manche (sous le pouce, cachée)
  const dos = 'M -128 -44.2 C -114 -43.4, -100 -41.6, -86 -41 C -60 -40.2, -24 -40.6, 0 -41 C 6 -41.2, 9.6 -42.5, 14 -42.5 C 19.2 -42.5, 23.2 -39.6, 24.8 -33.4 C 27.4 -23, 30.8 -8, 32 3 L 32 21 C 32 24.6, 30 27.4, 26.4 27.8 C 18 28.6, 6 29.4, -4 29.4';
  const dessous = 'M -89 1 C -98 1, -113 4.8, -128 12';
  out.push(plein(dos + ' C -10 30, -16 31, -22 30.6 C -40 30, -60 22, -70 14 C -77 8, -83 1, -89 1 C -98 1, -113 4.8, -128 12 Z'));
  out.push(trait(dos, SIL), trait(dessous, SIL));
  // le bord du métacarpe de l'index : il donne le volume du dos de la main
  out.push(trait('M -60 -31.6 C -38 -30, -12 -29.4, 9 -30.6', FIN));
  // l'index : la palmure à sa base (elle détache la première phalange de la main) ...
  out.push(trait('M 11.6 -12.6 C 12.4 -18, 14.2 -23.6, 18 -28.4', ART));
  // ... son bout replié contre la paume, sous le manche, ouvert du côté du pouce
  out.push(trait('M -5.4 28.7 C -10 28.2, -13 25.8, -13 22.8 C -13 20, -10.4 18.1, -6.6 17.9 C -5.6 17.8, -4.6 17.6, -3.8 17.4', ART));
  // les plis de l'articulation du milieu et de la dernière
  out.push(trait('M 29.4 21.4 C 27.6 20.4, 25.8 19, 24.4 17.2', FIN));
  out.push(trait('M -2 20 C -2.5 21.6, -2.5 23.4, -2 25', FIN));

  // ── 3. le pouce : il part du talon de la paume au poignet (la bosse du muscle), descend, casse à
  //       sa jointure de base, et se couche le long de l'index, par-dessus la phalange du milieu ──
  const pouceBas = 'M -89 1 C -83 1, -78.4 5.6, -75.2 13.6 C -72.4 21, -68.6 28.4, -63 34.4 C -56 41.6, -47 46.6, -39 49.6 C -34 51.4, -29.6 52.8, -26 52.6 C -24.6 52.5, -23.4 52.1, -22 51.6 L -3 45 C 4 42.4, 12 39, 17 36 C 19 34.6, 20.6 33.2, 21.5 32';
  const pouceHaut = ' C 25 29.4, 25.8 25.6, 23.6 23.4 C 21.4 21.4, 17.6 21.6, 14 22.6 C 8 24.4, 0 26.8, -6 28.8 C -14 31, -24 31.4, -31 30.8';
  out.push(plein(pouceBas + pouceHaut + ' C -46 26, -58 16, -66 2 L -89 -4 Z'));
  out.push(trait(pouceBas, SIL), trait('M 21.5 32' + pouceHaut, ART));
  // la palmure du pouce, prolongée : la masse du muscle entre le pouce et l'index
  out.push(trait('M -31 30.8 C -38 29, -44 26.4, -50 22.4 C -55 19, -59 14, -62 8', FIN));
  // l'ongle, vu de côté sur le dos du pouce : il naît dans la peau et finit au bout
  out.push(trait('M 9.8 38.6 C 10.4 37, 11.6 36, 13.4 35 C 16.4 33.4, 19.4 31.4, 21.6 29.4 C 23 28.2, 24.2 27, 25 25.8', ART));
  out.push(trait('M -2.6 45 C -3.4 42.6, -3.6 40.6, -3 38.6', FIN));          // le pli de la jointure

  // ── 4. le bout du manche, qui vient vers l'œil : bois de bout, deux cernes et une gerce ──
  const R = 17;
  out.push(`<circle cx="${x}" cy="${y}" r="${R * e}" fill="#fff" stroke="#000" stroke-width="${SIL}"/>`);
  for (const [r, dx, dy] of [[11.5, 1.2, 0.8], [6.5, 1.8, 1.2]])
    out.push(`<circle cx="${x + dx * e}" cy="${y + dy * e}" r="${r * e}" fill="none" stroke="#000" stroke-width="${FIN}"/>`);
  out.push(trait('M 3 1.5 L 9 -12', FIN));                              // une gerce
  return out.join('\n');
}

module.exports = (h) => ({
  ref: 'modele-prise-profil',
  titre: 'La prise de profil, le manche vu par le bout',
  desc: 'Feuille de modèle : la main droite qui serre un manche vu par le bout, du côté du pouce.',
  fichier: '_modeles-prise-profil-final.svg',
  format: 'pleine',
  disposition: [['a']],
  vues: {
    a: { dessin: z => dessiner(z.l * 0.66, z.h * 0.45, 2.9) },
  },
});
module.exports.dessiner = dessiner;
