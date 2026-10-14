// Planche 62-14 — Les côtes et le flanc : levée de côtes et bavette.
// Chapitre 62, tableau 5.3 (« Levée de côtes | Serratus ventralis, intercostaux | Muscles minces entre
// os, collagène élevé » ; « Bavette de flanchet | Rectus abdominis, obliques | Grain très marqué,
// membranes des deux côtés ») et tableau 5.1, région 5 (le flanc). Documentation :
// suivi/62-documentation-planches.md, section 17 (ce qui est établi, vue par vue), section 2
// (conventions), section 6 (les limites du flanc) et « Base commune » (la carcasse du module
// images/planches-src/_carcasse-orignal.js). Figures regardées : usda-imps-coupe-plat-de-cotes-boeuf
// (dentelé et intercostaux entre les côtes), acia-boeuf-22 (le flanc), sisson-1914-fig304 et
// ellenberger-hirsch-t3 (i dentelé ventral, l oblique externe). Aucune cote, aucune barre d'échelle :
// on ne construit rien et aucune dimension d'orignal n'est établie.
//
// Quatre vues, deux histoires : la levée (où elle est, puis sortie), la bavette (la paroi en couches,
// puis sortie).
//
// Vue 1 — la carcasse commune, de profil gauche, os en transparence (la patte avant est déjà levée à
//   ce moment, ch. 62 § 9 étape 3 : l'omoplate n'est pas dessinée). La levée de côtes : le plat des
//   côtes sous la longe (bord bas de la longe du module, ou la tête des côtes à l'avant, où elle est
//   plus basse), de la première à la dernière côte, jusqu'à la jonction des côtes et de leurs
//   cartilages : les intercostaux s'arrêtent là (SISSON, bœuf), et la poitrine prend le sternum et
//   les cartilages jusqu'à la 8e côte (CEE-ONU 9129). La bavette : le droit de l'abdomen du module
//   (bas du ventre, jusque vers l'aine ; muscle profond, contour en tireté). Les limites du flanc
//   (lombes, hanche, contour des cartilages) en tireté fin, comme sur la 62-02 : avec la dernière
//   côte, c'est le contour de la paroi de la vue 3.
// Vue 2 — la levée sortie : les côtes de la vue 1 et la viande mince entre elles. Le bord du haut
//   suit la longe ; où scier les côtes est au ch. 65 : aucun trait de scie.
// Vue 3 — la paroi du flanc, couches écartées l'une au-dessus de l'autre (règle 5 de JP) : chaque
//   feuille a le contour du flanc de la vue 1 (région 5 du module), couchée à plat et vue d'en haut
//   en biais ; de dessus en dessous, comme on les rencontre de l'extérieur : oblique externe (fibres
//   à l'horizontale dans le flanc, SISSON), oblique interne (fibres non établies : points), droit de
//   l'abdomen (seulement dans le bas du ventre, fibres en long, quelques inscriptions en travers,
//   non comptées), transverse (fibres non établies : quadrillé) ; entre elles, les membranes, en
//   feuilles blanches à contour pointillé (la couture qu'on ouvre, section 2). La bavette sort en
//   suivant ces membranes (IMPS 193). Pas de flèche : aucune source ne donne le sens du geste le long
//   de ces coutures (même choix que le trait au coude des côtes de la 62-11).
// Vue 4 — la bavette sortie : un morceau long et plat (OQLF), le grain en long (une famille de
//   flèches), les mêmes inscriptions en travers, et les membranes des deux faces (ch. 62) en
//   pointillé, sur le dessus et au bas de la tranche. Sa forme vraie à plat n'est pas établie : un
//   ovale allongé, sans prétention.
//
// NON ÉTABLI, donc pas dessiné : le nombre d'inscriptions chez l'orignal ; où scier les côtes ; le
// sens des fibres de l'oblique interne et du transverse ; où les obliques deviennent aponévrose ;
// le sens du couteau le long des coutures ; la forme vraie de la bavette et son épaisseur ;
// l'étendue du dentelé ventral sur la levée (nommé dans la légende, pas dessiné à part).
'use strict';
const C = require('./_carcasse-orignal');

module.exports = (h) => {
  const NOIR = '#1A1A1A', BLANC = '#FFFFFF';
  const f1 = v => Math.round(v * 10) / 10;
  const dD = (pts, ferme) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (ferme ? ' Z' : '');
  const trait = (ep, extra = '') => `fill="none" stroke="${NOIR}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"${extra}`;
  const halo = ep => `fill="none" stroke="${BLANC}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const POINTILLE = ' stroke-dasharray="0.1 3.4"';            // une couture qu'on ouvre : des points
  const TIRETE = ' stroke-dasharray="4 3"';                   // un muscle profond, une limite de région
  const rev = a => a.slice().reverse();
  const lisse = (pts, ferme = false, pas = 1.5) => C.dense(pts, pas, ferme);

  // ─── Les trames : une par matière, la même d'une vue à l'autre ───────────────────────────
  //   levée : traits fins à 45° (la trame « gris » du module, celle du morceau mis en valeur)
  //   bavette (droit) : traits fins à l'horizontale, serrés — le long du muscle
  //   oblique externe : tirets courts à l'horizontale, en quinconce — les fibres du flanc
  //   oblique interne : points ; transverse : quadrillé fin en biais
  // Les identifiants des découpes ne reprennent jamais ceux des motifs (id-t-…).
  const motifs = id => [
    `<pattern id="${id}-t-levee" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
    `<pattern id="${id}-t-droit" width="6" height="3" patternUnits="userSpaceOnUse"><line x1="0" y1="1.5" x2="6" y2="1.5" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
    `<pattern id="${id}-t-oe" width="10" height="5" patternUnits="userSpaceOnUse"><line x1="0.5" y1="1.2" x2="5" y2="1.2" stroke="${NOIR}" stroke-width="0.7"/><line x1="5.5" y1="3.7" x2="10" y2="3.7" stroke="${NOIR}" stroke-width="0.7"/></pattern>`,
    `<pattern id="${id}-t-oi" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.75" fill="${NOIR}" stroke="none"/><circle cx="3" cy="3" r="0.75" fill="${NOIR}" stroke="none"/></pattern>`,
    `<pattern id="${id}-t-tr" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="5" y2="0" stroke="${NOIR}" stroke-width="0.5"/><line x1="0" y1="0" x2="0" y2="5" stroke="${NOIR}" stroke-width="0.5"/></pattern>`,
  ].join('');
  const trame = (id, nom) => `fill="url(#${id}-t-${nom})" stroke="none"`;

  // ─── Géométrie commune, dans le repère U du module ────────────────────────────────────────
  const LIM = C.LIMITES;
  const J = C.COTES.map(c => c.j);                            // jonctions côte-cartilage
  const pt2 = p => [p[0], p[1]];
  // La levée de côtes : sous la longe (ou sous la tête des côtes à l'avant), la dernière côte en
  // arrière (bord arrière de la côte, limite du module), la ligne des jonctions en bas.
  const LEVEE = [
    [652, 433, 'c'], [688, 421], [713, 414], [738, 408], [763, 403], [790, 399], [840, 397], [890, 395], [940, 391],
    [986, 389, 'c'], ...LIM.derniereCote.slice(0, 5).map(pt2).map((p, i) => i === 4 ? [p[0], p[1] + 2, 'c'] : p),
    ...J.slice(0, 12).reverse().map(p => [p[0], p[1] + 2]),
    [617, 573, 'c'],
  ];
  // La bavette : le droit de l'abdomen du module.
  const DROIT = C.MUSCLES.droitAbdomen.pts.map(pt2);
  // Le flanc : région 5 derrière la dernière côte, sous les lombes, jusqu'au contour de la hanche.
  const VENTRE = C.SILHOUETTE.filter(p => p[0] > 872 && p[0] < 1230 && p[1] > 660 && p[1] < 720).map(pt2)
    .sort((a, b) => a[0] - b[0]);
  const FLANC = [
    // derrière la dernière côte, puis le long des cartilages : la limite du module, le bout de la
    // côte flottante arrondi (le flanc en fait le tour, CEE-ONU 9215)
    [992, 403, 'c'], [1003, 422], [1027, 452], [1052, 490], [1066, 512], [1069, 532], [1058, 556], [1030, 590], [986, 617],
    [936, 640], [900, 650], [871, 655, 'c'], [872, 667, 'c'], ...VENTRE, [1229, 694, 'c'],
    ...rev(LIM.hanche.slice(1, -1)).map(pt2).map((p, i, a) => i === a.length - 1 ? [p[0], p[1], 'c'] : p),
    [1100, 403],
  ];
  // le bas du ventre (le contour de la silhouette) : y en fonction de x
  const yVentre = x => {
    const v = VENTRE;
    if (x <= v[0][0]) return v[0][1];
    for (let i = 1; i < v.length; i++) if (x <= v[i][0]) return v[i - 1][1] + (v[i][1] - v[i - 1][1]) * (x - v[i - 1][0]) / (v[i][0] - v[i - 1][0]);
    return v[v.length - 1][1];
  };

  // Les côtes, comme le module les dessine (tête, jonction), pour la levée sortie.
  const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const arc = (a, b, f, n = 14) => {
    const m = lerp(a, b, 0.5), t = unit(a, b), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const c = [m[0] + t[1] * f * L * 2, m[1] - t[0] * f * L * 2];
    return Array.from({ length: n + 1 }, (_, i) => { const s = i / n; return [0, 1].map(k => (1 - s) * (1 - s) * a[k] + 2 * s * (1 - s) * c[k] + s * s * b[k]); });
  };
  const bande = (med, w0, w1 = w0) => {
    const n = med.length, g = [], d = [];
    med.forEach((p, i) => {
      const t = unit(med[Math.max(0, i - 1)], med[Math.min(n - 1, i + 1)]), w = (w0 + (w1 - w0) * i / (n - 1)) / 2;
      g.push([p[0] + t[1] * w, p[1] - t[0] * w]); d.push([p[0] - t[1] * w, p[1] + t[0] * w]);
    });
    return g.concat(d.reverse());
  };
  const COTES = C.COTES.map((c, i) => { const w = i === 0 ? 9 : 11; return bande(arc(c.h, c.j, i < 3 ? 0.03 : 0.06), w, w * 0.9); });

  // mise en place d'une boîte [x0, y0, x1, y1] dans une vue, avec de la place réservée sur les côtés
  const placeBoite = (z, boite, { gauche = 0, droite = 0, marge = 8, dx0 = 0 } = {}) => {
    const [x0, y0, x1, y1] = boite, lz = z.l - gauche - droite;
    const k = Math.min((lz - 2 * marge) / (x1 - x0), (z.h - 2 * marge) / (y1 - y0));
    const dx = dx0 + gauche + (lz - (x1 - x0) * k) / 2 - x0 * k, dy = (z.h - (y1 - y0) * k) / 2 - y0 * k;
    const T = q => [q[0] * k + dx, q[1] * k + dy];
    return { k, T };
  };

  // ═══ Vue 1 : où elles sont ══════════════════════════════════════════════════════════════════
  const CADRE_1 = [590, 140, 1285, 745];
  const place1 = z => C.placer(z, { cadre: CADRE_1 });

  // ═══ Vue 2 : la levée sortie ═══════════════════════════════════════════════════════════════
  const BOITE_LEVEE = [608, 380, 1082, 628];
  const placeLevee = z => placeBoite(z, BOITE_LEVEE, { marge: 4, gauche: 0, droite: 10 });

  // ═══ Vue 3 : la paroi du flanc, couches écartées ═══════════════════════════════════════════
  // Chaque feuille est couchée à plat, face externe en haut, le dos au fond, le ventre devant :
  // l'axe y du profil devient la profondeur (écrasée de S), le fond glisse un peu vers la droite
  // (A), et chaque feuille plus profonde descend de G et glisse de DX. Les membranes sont des
  // feuilles comme les muscles, et couvrent toute la paroi : le droit, lui, n'est que dans le bas.
  const S = 0.45, A = 0.12, G = 28, DX = 8, EP = 5;
  const proj = (q, i) => [(q[0] - 860) + A * (712 - q[1]) + i * DX, S * (q[1] - 400) + i * G];
  const COUCHES = [
    { nom: 'oe', forme: FLANC, i: 0 },
    { membrane: true, forme: FLANC, i: 1 },
    { nom: 'oi', forme: FLANC, i: 2 },
    { membrane: true, forme: FLANC, i: 3 },
    { nom: 'droit', forme: DROIT, i: 4 },
    { membrane: true, forme: FLANC, i: 5 },
    { nom: 'tr', forme: FLANC, i: 6 },
  ];
  // quelques inscriptions en travers du droit (non comptées : cinq chez le bœuf, inconnu chez l'orignal)
  const INSCRIPTIONS = [955, 1045, 1135];
  const BOITE_3 = (() => {
    const pts = COUCHES.flatMap(c => lisse(c.forme, true, 4).map(q => proj(q, c.i)));
    const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys) + EP];
  })();
  const place3 = z => placeBoite(z, BOITE_3, { gauche: 64, droite: 64 });
  // un point de la bande visible d'une feuille : entre son bord de devant et celui de la feuille d'au-dessus
  const surBande = (x, i, remonte = 0.5) => proj([x, yVentre(x) - remonte * G / S], i);

  // ═══ Vue 4 : la bavette sortie ═════════════════════════════════════════════════════════════
  // À plat, face externe en haut, l'avant à gauche. Repère local : x le long (0 à LB), y en
  // profondeur (écrasée), l'épaisseur EPB vers le bas.
  const LB = 300, LA = 22, EPB = 10;
  const demi = x => { const t = Math.min(1, Math.abs(x - LB / 2) / (LB / 2)); return LA * Math.pow(1 - Math.pow(t, 2.6), 1 / 2.6); };
  const DESSUS = (() => {
    const fond = [], devant = [];
    for (let i = 0; i <= 80; i++) { const x = LB * i / 80, w = demi(x); fond.push([x, -w]); devant.push([x, w]); }
    return [...fond, ...rev(devant).slice(1, -1)];
  })();
  const INSCR_B = [80, 152, 224];
  const BOITE_BAVETTE = [-2, -LA - 2, LB + 2, LA + EPB + 2];
  const placeBavette = z => placeBoite(z, BOITE_BAVETTE, { marge: 6, gauche: 60, droite: 60 });

  return {
    ref: '62-14',
    titre: 'Les côtes et le flanc : levée de côtes et bavette',
    desc: "Quatre vues. En haut à gauche, le tronc de la carcasse d'orignal, de profil gauche, os en transparence, l'épaule "
      + "déjà levée : la levée de côtes en trame sur le plat des côtes, de la première à la dernière, sous la longe et jusqu'à "
      + "la jonction des côtes et de leurs cartilages ; la bavette en trame dans le bas du ventre, jusque vers l'aine ; la "
      + "dernière côte, les cartilages et le sternum, la pointe de la hanche ; en tireté fin, les limites du flanc. En haut à "
      + "droite, la levée sortie : les côtes en blanc et la viande mince entre elles. Au milieu, la paroi du flanc couchée à "
      + "plat, ses couches écartées l'une au-dessus de l'autre, de l'extérieur vers la cavité : oblique externe, fibres à "
      + "l'horizontale ; une membrane ; oblique interne ; une membrane ; le droit de l'abdomen, seulement dans le bas, fibres "
      + "en long et quelques bandes tendineuses en travers ; une membrane ; le transverse. Les membranes, en pointillé, sont "
      + "les coutures que suit la lame. En bas, la bavette sortie, longue et plate, le grain en long marqué de flèches, les "
      + "bandes en travers, et les membranes en pointillé sur le dessus et au bas de la tranche.",
    format: 'pleine',
    disposition: [['ou', 'levee'], ['couches'], ['bavette']],
    hauteurs: [2.3, 2.5, 0.95],
    largeurs: [[1.6, 1], [1], [1]],
    vues: {
      // ── Vue 1 : où elles sont ────────────────────────────────────────────────────────────
      ou: {
        titre: 'Où elles sont',
        dessin: z => {
          const p = place1(z), T = q => q.map(p.T);
          const lev = T(lisse(LEVEE, true)), dro = T(lisse(DROIT, true));
          let base = C.dessiner(h, p, {
            id: 'a', loin: 'gris',
            os: ['vertebres', 'cotes', 'sternum', 'bassin'],
            osForts: ['cote13', 'sternum', 'bassin'],
          });
          // les trames des deux morceaux, glissées sous les os (juste après le fond blanc du corps)
          const marque = `fill="${BLANC}" stroke="none"/>`;
          const k = base.indexOf(marque);
          if (k < 0) throw new Error('62-14 : le fond du corps est introuvable dans le dessin du module');
          const apres = k + marque.length;
          const trames = [`<defs>${motifs('a')}</defs>`, `<g clip-path="url(#a-corps)">`,
            `<path d="${dD(lev, true)}" ${trame('a', 'levee')}/>`, `<path d="${dD(dro, true)}" ${trame('a', 'droit')}/>`, '</g>'].join('\n');
          base = base.slice(0, apres) + '\n' + trames + base.slice(apres);
          const limites = [LIM.lombes, LIM.hanche.slice(1, -1), LIM.derniereCote.slice(4)].map(l => T(lisse(l.map(pt2))));
          return [
            base,
            `<g clip-path="url(#a-corps)">`,
            ...limites.map(l => `<path d="${dD(l, false)}" ${trait(0.7, TIRETE)}/>`),
            `<path d="${dD(lev, true)}" ${trait(1.4)}/>`,
            `<path d="${dD(dro, true)}" ${trait(1.4, TIRETE)}/>`,
            '</g>',
          ].join('\n');
        },
        renvois: z => {
          const p = place1(z), yv = y => p.pt([0, y])[1];
          const G_ = 12, D_ = z.l - 12;
          return [
            { n: 1, texte: 'levée de côtes — M. serratus ventralis', rond: [G_, yv(470)], cible: p.pt([790, 505]) },
            { n: 2, texte: 'bavette de flanchet — M. rectus abdominis', rond: [D_, yv(700)], cible: p.pt([1110, 697]) },
            { n: 3, texte: 'dernière côte', rond: [D_, yv(478)], cible: p.pt([1034, 472]) },
            { n: 4, texte: 'cartilages costaux et sternum', rond: [G_, yv(655)], cible: p.pt([752, 641]) },
            { n: 5, texte: 'pointe de la hanche', rond: [D_, yv(380)], cible: p.pt('pointeHanche') },
          ];
        },
      },
      // ── Vue 2 : la levée sortie ─────────────────────────────────────────────────────────
      levee: {
        titre: 'La levée sortie',
        dessin: z => {
          const bl = placeLevee(z), T = q => q.map(bl.T);
          const lev = T(lisse(LEVEE, true));
          return [
            `<defs>${motifs('l')}<clipPath id="l-decoupe"><path d="${dD(lev, true)}" fill="${BLANC}"/></clipPath></defs>`,
            `<path d="${dD(lev, true)}" fill="${BLANC}" stroke="none"/>`,
            `<path d="${dD(lev, true)}" ${trame('l', 'levee')}/>`,
            `<g clip-path="url(#l-decoupe)">`,
            ...COTES.map(c => `<path d="${dD(T(c), true)}" fill="${BLANC}" stroke="${NOIR}" stroke-width="0.7" stroke-linejoin="round"/>`),
            '</g>',
            `<path d="${dD(lev, true)}" ${trait(2.4)}/>`,
          ].join('\n');
        },
        renvois: z => {
          const bl = placeLevee(z);
          // entre la 8e et la 9e côte, à mi-hauteur
          const mi = lerp(lerp(C.COTES[7].h, C.COTES[7].j, 0.6), lerp(C.COTES[8].h, C.COTES[8].j, 0.6), 0.5);
          const c = bl.T(mi);
          return [{ n: 6, texte: 'intercostaux — Mm. intercostales', rond: [c[0] + 40, z.h - 12], cible: c }];
        },
      },
      // ── Vue 3 : la paroi du flanc, couches écartées ─────────────────────────────────────
      couches: {
        titre: 'La paroi du flanc, couches écartées',
        dessin: z => {
          const b = place3(z);
          const out = [`<defs>${motifs('b')}</defs>`];
          rev(COUCHES).forEach(c => {
            const poly = lisse(c.forme, true, 2).map(q => b.T(proj(q, c.i)));
            if (c.membrane) {
              out.push(`<path d="${dD(poly, true)}" fill="${BLANC}" stroke="none"/>`);
              out.push(`<path d="${dD(poly, true)}" ${trait(1.4, POINTILLE)}/>`);
              return;
            }
            // la tranche : la même feuille, descendue de son épaisseur
            const e = EP * b.k, bas = poly.map(q => [q[0], q[1] + e]);
            const xs = poly.map(q => q[0]), iG = xs.indexOf(Math.min(...xs)), iD = xs.indexOf(Math.max(...xs));
            // la tranche reste blanche : trop mince pour une ombre (elle aurait l'air d'un trait doublé)
            out.push(`<path d="${dD(bas, true)}" fill="${BLANC}" stroke="none"/>`);
            out.push(`<path d="${dD(bas, true)}" ${trait(1.4)}/>`);
            out.push(`<path d="${dD(poly, true)}" fill="${BLANC}" stroke="none"/>`);
            out.push(`<path d="${dD(poly, true)}" ${trame('b', c.nom)}/>`);
            if (c.nom === 'droit') {
              out.push(`<defs><clipPath id="b-decoupe-droit"><path d="${dD(poly, true)}" fill="${BLANC}"/></clipPath></defs>`);
              out.push(`<g clip-path="url(#b-decoupe-droit)">`);
              INSCRIPTIONS.forEach(x => {
                const q = [[x - 5, 600], [x + 5, 600], [x + 5, 760], [x - 5, 760]].map(r => b.T(proj(r, c.i)));
                out.push(`<path d="${dD(q, true)}" fill="${BLANC}" stroke="none"/>`);
                out.push(`<path d="${dD([q[0], q[3]], false)} ${dD([q[1], q[2]], false)}" ${trait(0.5)}/>`);
              });
              out.push('</g>');
            }
            out.push(`<path d="${dD([poly[iG], bas[iG]], false)} ${dD([poly[iD], bas[iD]], false)}" ${trait(1.4)}/>`);
            out.push(`<path d="${dD(poly, true)}" ${trait(1.4)}/>`);
          });
          return out.join('\n');
        },
        renvois: z => {
          const b = place3(z), T = q => b.T(q);
          const G_ = 12, D_ = z.l - 12;
          return [
            { n: 7, texte: 'oblique externe — M. obliquus externus', rond: [G_, T(proj([1000, 560], 0))[1]], cible: T(proj([1040, 580], 0)) },
            { n: 8, texte: 'oblique interne — M. obliquus internus', rond: [G_, T(surBande(900, 2))[1] + 4], cible: T(surBande(940, 2)) },
            { n: 9, texte: 'membranes : la couture que suit la lame', rond: [G_, T(surBande(900, 5))[1] + 10], cible: T(surBande(930, 5)) },
            { n: 10, texte: 'droit de l’abdomen, inscriptions en travers', rond: [D_, T(proj([1150, 690], 4))[1] - 30], cible: T(proj([INSCRIPTIONS[2] - 2, 694], 4)) },
            { n: 11, texte: 'transverse — M. transversus abdominis', rond: [D_, T(surBande(1200, 6))[1] + 10], cible: T(surBande(1160, 6)) },
          ];
        },
      },
      // ── Vue 4 : la bavette sortie ────────────────────────────────────────────────────────
      bavette: {
        titre: 'La bavette sortie',
        dessin: z => {
          const bb = placeBavette(z), T = q => q.map(bb.T);
          const e = EPB * bb.k;
          const dessus = T(DESSUS), bas = dessus.map(q => [q[0], q[1] + e]);
          const xs = dessus.map(q => q[0]), iG = xs.indexOf(Math.min(...xs)), iD = xs.indexOf(Math.max(...xs));
          const out = [`<defs>${motifs('v')}<clipPath id="v-decoupe"><path d="${dD(dessus, true)}" fill="${BLANC}"/></clipPath></defs>`];
          // la tranche, puis le dessus. La charte : la tranche (face de dessous) en gris d'ombre
          out.push(`<path d="${dD(bas, true)}" ${h.a.ombre}/>`);
          // la membrane du dessous : un pointillé au bas de la tranche, sur la moitié de devant
          const dessous = [];
          for (let i = 4; i <= 76; i++) { const x = LB * i / 80; dessous.push(bb.T([x, demi(x) + EPB - 2.8])); }
          out.push(`<path d="${dD(dessous, false)}" ${trait(1.4, POINTILLE)}/>`);
          out.push(`<path d="${dD(bas, true)}" ${trait(1.4)}/>`);
          out.push(`<path d="${dD(dessus, true)}" fill="${BLANC}" stroke="none"/>`);
          out.push(`<path d="${dD(dessus, true)}" ${trame('v', 'droit')}/>`);
          out.push(`<g clip-path="url(#v-decoupe)">`);
          INSCR_B.forEach(x => {
            const q = T([[x - 4, -30], [x + 4, -30], [x + 4, 30], [x - 4, 30]]);
            out.push(`<path d="${dD(q, true)}" fill="${BLANC}" stroke="none"/>`);
            out.push(`<path d="${dD([q[0], q[3]], false)} ${dD([q[1], q[2]], false)}" ${trait(0.5)}/>`);
          });
          out.push('</g>');
          // la membrane du dessus : un pointillé en retrait du bord
          const fondR = [], devantR = [];
          for (let i = 3; i <= 77; i++) { const x = LB * i / 80, w = Math.max(0, demi(x) - 4.5); fondR.push([x, -w]); devantR.push([x, w]); }
          out.push(`<path d="${dD(T([...fondR, ...rev(devantR)]), true)}" ${trait(1.4, POINTILLE)}/>`);
          // le grain : une famille de flèches dans la longueur, entre les inscriptions
          const fl = [];
          [[20, 64], [96, 136], [168, 208], [240, 282]].forEach(([a, c]) => [-8, 8].forEach(y => fl.push(T([[c, y], [a, y]]))));
          fl.forEach(s => out.push(`<path d="${dD(s, false)}" ${halo(3.5)}/>`));
          fl.forEach(s => out.push(h.fleche(dD(s, false), trait(0.7))));
          out.push(`<path d="${dD([dessus[iG], bas[iG]], false)} ${dD([dessus[iD], bas[iD]], false)}" ${trait(2.4)}/>`);
          out.push(`<path d="${dD(dessus, true)}" ${trait(2.4)}/>`);
          return out.join('\n');
        },
        renvois: z => {
          const bb = placeBavette(z);
          return [{ n: 12, texte: 'grain de la bavette, dans la longueur', rond: [z.l - 14, bb.T([0, -10])[1]], cible: bb.T([272, -8]) }];
        },
      },
    },
  };
};
