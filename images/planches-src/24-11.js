// Planche 24-11 — L'examen de la cheville (ch. 24, section 5-H, étapes 41, 44 et 45 ; note 3).
//
// Ce que le chapitre donne, et rien de plus :
//   · étape 41 : appuyer du bout du doigt le long du bord arrière des 6 derniers centimètres du
//     tibia et du péroné, jusqu'à la pointe des deux chevilles, puis sur la bosse du bord extérieur
//     du pied et sur celle du bord intérieur, devant la cheville ;
//   · note 3 : la bosse du bord extérieur est à mi-longueur du pied, là où le bord s'élargit ;
//     celle du bord intérieur, un peu en avant et en dessous de la cheville intérieure ;
//   · étape 44 : le jeu se teste assis, genou plié, pied légèrement pointé ; une main tient le bas
//     du tibia, l'autre empoigne le talon et le tire vers l'avant ; la douleur au ligament se
//     cherche dans le creux juste devant la pointe de la cheville extérieure ;
//   · étape 45 : serrer le tibia et le péroné l'un contre l'autre un peu au-dessus du milieu du
//     mollet ; la douleur de l'entorse haute se réveille en bas, devant et un peu au-dessus de la
//     cheville, côté extérieur.
// Aucune cote : on ne construit rien. Les 6 cm vivent dans la légende.
//
// Pas d'anatomie dessinée : une silhouette de jambe et de pied, les deux bosses des chevilles
// (ce qu'on voit et qu'on tâte de l'extérieur), et les endroits où appuyer en noir plein. La
// douleur qui se réveille sans qu'on appuie là est cerclée d'un tireté.
//
// Toujours le pied droit. Mesures en mm d'adulte, y vers le haut, 0 au sol sous la cheville,
// x vers les orteils.
module.exports = (h) => {
  const N = '#1A1A1A', B = '#FFFFFF';
  const f = v => Math.round(v * 10) / 10;
  const RAD = Math.PI / 180;
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const tourne = (p, deg) => { const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };

  // Catmull-Rom : une suite de points devient une courbe qui passe par chacun.
  const courbe = (pts) => {
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d;
  };
  const trait = ep => `fill="none" stroke="${N}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"`;
  const FOND = `fill="${B}" stroke="none"`;
  // Où appuyer : un trait noir épais le long d'un bord, un point noir sur une bosse.
  // Catmull-Rom échantillonnée : les points de la courbe, pour bâtir une bande pleine autour.
  const echant = (pts, n = 8) => {
    const out = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      for (let k = 1; k <= n; k++) {
        const t = k / n, m = 1 - t;
        out.push([m * m * m * p1[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t * t * t * p2[0],
                  m * m * m * p1[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t * t * t * p2[1]]);
      }
    }
    return out;
  };
  const bordNoir = (pts, ep) => {
    const q = echant(pts), r = ep / 2, g = [], d = [];
    q.forEach((p, i) => {
      const a = q[Math.max(0, i - 1)], b = q[Math.min(q.length - 1, i + 1)];
      const u = sub(b, a), l = Math.hypot(u[0], u[1]) || 1, n = [-u[1] / l * r, u[0] / l * r];
      g.push(add(p, n)); d.push(sub(p, n));
    });
    const P = x => `${f(x[0])} ${f(x[1])}`;
    return `<path d="M${P(g[0])} ${g.slice(1).map(x => 'L' + P(x)).join(' ')} A${f(r)} ${f(r)} 0 0 1 ${P(d[d.length - 1])} ${d.slice(0, -1).reverse().map(x => 'L' + P(x)).join(' ')} A${f(r)} ${f(r)} 0 0 1 ${P(g[0])} Z" ${h.a.plein}/>`;
  };
  const pointNoir = (p, r) => h.cercle(p[0], p[1], r, h.a.plein);
  // Là où la douleur se réveille sans qu'on y appuie : un tireté.
  const douleur = (p, rx, ry) => h.ellipse(p[0], p[1], rx, ry, `fill="none" stroke="${N}" stroke-width="1.4" stroke-dasharray="3.5 2.5"`);

  // Un repère de vue : origine (ox, oy) au sol sous la cheville, s unités par mm, miroir pour
  // le pied vu de l'intérieur (les orteils vers la gauche).
  const repere = (ox, oy, s, miroir = false) => p => [ox + (miroir ? -1 : 1) * s * p[0], oy - s * p[1]];

  // ─── le pied droit de profil ─────────────────────────────────────────────────────────────
  // Le contour, du haut de la jambe derrière (tendon d'Achille) au haut de la jambe devant.
  // p[2] : la part du point qui suit le pied quand il pointe (0 : jambe ; 1 : pied).
  const profil = (haut) => [
    ...(haut > 220 ? [[-66, haut, 0], [-58, 215, 0]] : [[-58, haut, 0]]),
    [-52, 165, 0], [-45, 135, 0], [-41, 108, 0], [-43, 84, 0.5],
    [-51, 62, 1], [-60, 42, 1], [-63, 26, 1], [-59, 10, 1], [-47, 1, 1], [-30, 0, 1],
    [40, 0, 1], [120, 0, 1], [172, 0.5, 1], [193, 3, 1], [203, 10, 1], [201, 19, 1], [191, 26, 1],
    [175, 32, 1], [155, 41, 1], [128, 55, 1], [98, 70, 1], [70, 83, 1], [50, 92, 0.6], [37, 104, 0.2],
    [31, 125, 0], [30, 160, 0], ...(haut > 220 ? [[31, 215, 0], [33, haut, 0]] : [[32, haut, 0]]),
  ];
  const J = [0, 85];                                  // l'axe de la cheville
  const pointe = (pts, a) => pts.map(p => p[2] ? add(J, tourne(sub(p, J), -a * p[2])) : [p[0], p[1]]);
  const piedPoint = (p, a) => add(J, tourne(sub(p, J), -a));

  // La jambe et le pied : fond blanc, silhouette forte, l'orteil et sa jointure en détail.
  const silhouette = (V, pts) => {
    const c = pts.map(V);
    return [
      `<path d="${courbe(c)} Z" ${FOND}/>`,
      `<path d="${courbe(c)}" ${trait(2.4)}/>`,
    ].join('\n');
  };
  const orteil = (V, a = 0) => {
    const P = p => V(piedPoint(p, a));
    return [
      `<path d="${courbe([P([169, 34]), P([174, 18]), P([171, 3])])}" ${trait(0.7)}/>`,          // pli de la base de l'orteil
      `<path d="${courbe([P([189, 25]), P([196, 19]), P([199, 12])])}" ${trait(0.5)}/>`,         // l'ongle
    ].join('\n');
  };
  // La bosse de la cheville : ce qu'on voit et qu'on tâte de l'extérieur, rien de ce qu'il y a dessous.
  const bosse = (V, c, rx, ry, s) => { const q = V(c); return h.ellipse(q[0], q[1], rx * s, ry * s, trait(0.7)); };

  // ─── la jambe droite de face (le côté extérieur à gauche) ────────────────────────────────
  // x vers la droite de la vue (l'intérieur de la jambe), y vers le haut, 0 au sol.
  const FACE = {
    ext: [[-60, 575], [-56, 530], [-52, 485], [-49, 450], [-51, 410], [-51, 360], [-47, 300], [-40, 240],
      [-33, 180], [-29, 135], [-28, 105], [-35, 85], [-38, 70], [-35, 58], [-38, 45], [-46, 30], [-53, 16], [-54, 5], [-52, 1]],
    int: [[62, 575], [61, 530], [57, 485], [53, 448], [59, 410], [62, 370], [57, 320], [48, 270],
      [38, 215], [32, 160], [30, 125], [30, 110], [36, 98], [38, 86], [35, 74], [38, 58], [46, 40], [54, 22], [58, 8], [57, 1]],
  };
  // les orteils vus du bout : centre, demi-largeur, hauteur ; le gros orteil du côté intérieur
  const ORTEILS = [[-44, 7, 18], [-30, 7.5, 21], [-15, 8, 23], [2, 9, 26], [31, 15, 32]];

  const jambeFace = (V) => {
    const ext = FACE.ext, int = FACE.int;
    const tour = [...ext, ...int.slice().reverse()].map(V);        // de haut gauche à haut droite par le bas
        const out = [];
    out.push(`<path d="M${tour.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')} Z" ${FOND}/>`);
    out.push(`<path d="${courbe(ext.map(V))}" ${trait(2.4)}/>`);
    out.push(`<path d="${courbe(int.map(V))}" ${trait(2.4)}/>`);
    // la semelle vue de face : un trait presque droit sous les orteils
    out.push(`<path d="${courbe([V([-52, 1]), V([-10, 0]), V([30, 0]), V([57, 1])])}" ${trait(2.4)}/>`);
    // les orteils : des arches posées sur la semelle
    ORTEILS.forEach(([x, w, ht]) => {
      out.push(`<path d="${courbe([V([x - w, 1]), V([x - w * 0.95, ht * 0.62]), V([x, ht]), V([x + w * 0.95, ht * 0.62]), V([x + w, 1])])}" ${trait(0.7)}/>`);
      const n = [V([x - w * 0.5, ht * 0.55]), V([x, ht * 0.78]), V([x + w * 0.5, ht * 0.55])];
      out.push(`<path d="${courbe(n)}" ${trait(0.5)}/>`);
    });
    // le pli de la cheville
    out.push(`<path d="${courbe([V([-22, 100]), V([0, 96]), V([22, 101])])}" ${trait(0.5)}/>`);
    // la rotule et l'arête du tibia
    out.push(`<path d="${courbe([V([-20, 490]), V([-24, 520]), V([-10, 548]), V([10, 550]), V([24, 524]), V([20, 492]), V([4, 474]), V([-12, 478]), V([-20, 490])])}" ${trait(0.7)}/>`);
    out.push(`<path d="${courbe([V([4, 452]), V([10, 380]), V([12, 300]), V([8, 220]), V([2, 150])])}" ${trait(0.5)}/>`);
    return out.join('\n');
  };

  const G = 26;   // marge au bord de la vue

  // Le tiroir : la jambe pendante vue de l'extérieur, de 300 mm au-dessus du sol jusqu'aux
  // orteils du pied pointé ; le talon empoigné par derrière, le tibia tenu par devant.
  const TALON = [-40, 30];
  // le dos de la main du talon : 55 mm en arrière de la prise, le long de l'avant-bras incliné
  const TALON_V = z => { const { V, a } = geoTiroir(z); const c = piedPoint(TALON, a); return V([c[0] - 50, c[1] - 22]); };
  const geoTiroir = z => {
    const s = (z.h - 22) / 365, a = 18;
    const V = repere(z.l * 0.52, 10 + 300 * s, s);
    return { s, V, a };
  };
  // La jambe de face : du genou au sol.
  const Y_SERRE = 330;
  const geoFace = z => {
    const s = (z.h - 22) / 580;
    return { s, V: repere(z.l / 2 - 4 * s, z.h - 10, s) };
  };
  const LEG = {
    1: 'bord arrière du péroné, 6 cm',
    2: 'bosse du bord extérieur du pied',
    3: 'bord arrière du tibia, 6 cm',
    4: 'bosse du bord intérieur du pied',
    5: 'une main tient le bas du tibia',
    6: 'l’autre tire le talon en avant',
    7: 'le creux du ligament',
    8: 'serrer tibia et péroné ensemble',
    9: 'où la douleur se réveille',
  };
  const R = (n, rond, cible) => ({ n, rond, cible, texte: LEG[n] });

  return {
    ref: '24-11',
    titre: 'L’examen de la cheville tordue',
    desc: 'En haut, la cheville droite vue de l’extérieur et de l’intérieur : les quatre endroits où l’on appuie du bout du doigt sur place, marqués en noir — le bord arrière des 6 derniers centimètres du péroné et du tibia jusqu’à la pointe de chaque cheville, la bosse du bord extérieur du pied à mi-longueur, la bosse du bord intérieur en avant et sous la cheville. En bas à gauche, le test du tiroir au quatrième ou cinquième jour : assis, pied pendant légèrement pointé, une main à plat sur le devant du bas du tibia, les doigts passés derrière, l’autre empoigne le talon et le tire vers l’avant ; le point noir marque le creux du ligament devant la pointe de la cheville extérieure. En bas à droite, l’entorse haute : la jambe vue de face, une main, passée derrière la jambe, empoigne le mollet un peu au-dessus de son milieu (on ne voit que le bout du pouce et des doigts) et serre le tibia et le péroné l’un contre l’autre ; la douleur se réveille en bas, devant et au-dessus de la cheville, côté extérieur.',
    format: 'pleine',
    disposition: [['exterieur', 'interieur'], ['tiroir', 'serrer']],
    largeurs: [[1, 1], [1.55, 1]],
    hauteurs: [0.72, 1.28],
    vues: {
      exterieur: {
        titre: 'Sur place, côté extérieur',
        dessin: z => {
          const s = Math.min((z.l - 2 * G) / 266, (z.h - 34) / 190);
          const ox = (z.l - 266 * s) / 2 + 62 * s, oy = z.h - 12;
          const V = repere(ox, oy, s);
          const out = [];
          out.push(h.ligne(ox - 80 * s, oy, ox + 225 * s, oy, h.a.fin));
          out.push(silhouette(V, profil(190)), orteil(V));
          out.push(bosse(V, [-15, 73], 11, 17, s));
          // 1 — le bord arrière du péroné, 6 cm, jusqu'à la pointe
          out.push(bordNoir([[-15, 56], [-22, 61], [-26, 72], [-25, 90], [-22, 116]].map(V), 5));
          // 2 — la bosse du bord extérieur, à mi-longueur du pied
          out.push(pointNoir(V([72, 12]), 5));
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.l - 2 * G) / 266, (z.h - 34) / 190);
          const ox = (z.l - 266 * s) / 2 + 62 * s, oy = z.h - 12;
          const V = repere(ox, oy, s);
          return [
            R(1, V([-100, 120]), V([-25, 98])),
            R(2, V([105, 120]), V([74, 15])),
          ];
        },
      },
      interieur: {
        titre: 'Sur place, côté intérieur',
        dessin: z => {
          const s = Math.min((z.l - 2 * G) / 266, (z.h - 34) / 190);
          const ox = z.l - (z.l - 266 * s) / 2 - 62 * s, oy = z.h - 12;
          const V = repere(ox, oy, s, true);
          const out = [];
          out.push(h.ligne(ox + 80 * s, oy, ox - 225 * s, oy, h.a.fin));
          out.push(silhouette(V, profil(190)), orteil(V));
          // l'arche du bord intérieur, levée au-dessus du sol
          out.push(`<path d="${courbe([[-12, 2], [20, 9], [60, 15], [100, 9], [128, 2]].map(V))}" ${trait(0.7)}/>`);
          out.push(bosse(V, [-3, 87], 13, 17, s));
          // 3 — le bord arrière du tibia, 6 cm, jusqu'à la pointe
          out.push(bordNoir([[-3, 70], [-11, 74], [-16, 86], [-15, 105], [-13, 130]].map(V), 5));
          // 4 — la bosse du bord intérieur, en avant et sous la cheville
          out.push(pointNoir(V([34, 44]), 5));
          return out.join('\n');
        },
        renvois: z => {
          const s = Math.min((z.l - 2 * G) / 266, (z.h - 34) / 190);
          const ox = z.l - (z.l - 266 * s) / 2 - 62 * s, oy = z.h - 12;
          const V = repere(ox, oy, s, true);
          return [
            R(3, V([-95, 150]), V([-15, 112])),
            R(4, V([80, 135]), V([36, 48])),
          ];
        },
      },
      tiroir: {
        titre: 'Au quatrième ou cinquième jour : le tiroir',
        dessin: z => {
          const { s, V, a } = geoTiroir(z);
          const out = [];
          // la main qui tient le bas du tibia, par devant : modèle s01 (la main ouverte, le pouce
          // écarté), l'avant-bras vers la droite ; peinte SOUS la jambe, les quatre doigts passent
          // derrière et s'y perdent ; puis le pouce seul, repeint PAR-DESSUS la jambe, couché sur
          // la face extérieure du bas du tibia (le reste du modèle masqué : il est déjà dessous)
          const tib = { x: 0, y: 0, ancre: [82, 18], angle: -10, echelle: 0.8 * s };
          { const p = V([-14, 175]); tib.x = p[0]; tib.y = p[1]; }
          out.push(h.formes.modele('s01', tib));
          out.push(silhouette(V, pointe(profil(300), a)), orteil(V, a));
          out.push(h.formes.modele('s01', { ...tib, masquer: [[0, 37, 262, 126], [170, 0, 262, 37]] }));
          out.push(bosse(V, [-15, 73], 11, 17, s));
          // le creux du ligament, juste devant la pointe de la cheville extérieure
          out.push(pointNoir(V(piedPoint([3, 58], a * 0.4)), 4.5));
          // la main qui empoigne le talon par derrière : la paume au talon, les doigts sur son côté
          const talon = V(piedPoint(TALON, a));
          // modèle s05 (les doigts repliés en coupe, le pouce dessus) retourné : l'avant-bras part en
          // bas à gauche, les doigts enroulés autour du talon
          out.push(h.formes.modele('s05', { x: talon[0], y: talon[1], ancre: [45, 45], angle: -24, miroir: true, echelle: 1.0 * s,
            masquer: [[222, 0, 240, 120]], bras: { a: [222, 39.1], a0: [200, 38.1], b: [222, 104.3], b0: [200, 100.8], bord: z } }));
          // le geste : le talon tiré vers l'avant (vers les orteils), contre la main du talon
          const f0 = V(piedPoint([-175, 92], a)), f1 = V(piedPoint([-105, 92], a));
          out.push(h.fleche(`M${f(f0[0])} ${f(f0[1])} L${f(f1[0])} ${f(f1[1])}`, h.a.contour));
          return out.join('\n');
        },
        renvois: z => {
          const { V, a } = geoTiroir(z);
          return [
            R(5, V([160, 255]), V([60, 160])),
            R(6, V([-190, 120]), [TALON_V(z)[0], TALON_V(z)[1]]),
            R(7, V([130, 90]), V(piedPoint([5, 58], a * 0.4))),
          ];
        },
      },
      serrer: {
        titre: 'L’entorse haute : serrer le mollet',
        dessin: z => {
          const { s, V } = geoFace(z);
          const out = [];
          // la main derrière la jambe, un peu au-dessus du milieu du mollet : la paume sur le mollet,
          // cachée par la jambe ; on ne voit que le bout du pouce côté extérieur et le bout des
          // quatre doigts côté intérieur
          const tip = (pts, ep) => {
            const c = courbe(pts.map(V));
            return `<path d="${c}" fill="none" stroke="${N}" stroke-width="${f(2 * ep * s + 3.2)}" stroke-linecap="round"/>` +
              `<path d="${c}" fill="none" stroke="${B}" stroke-width="${f(2 * ep * s)}" stroke-linecap="round"/>`;
          };
          out.push(tip([[-20, Y_SERRE + 12], [-58, Y_SERRE + 8], [-70, Y_SERRE + 2]], 11));
          [[42, 10], [24, 10.5], [6, 10], [-12, 8.5]].forEach(([dy, ep]) =>
            out.push(tip([[30, Y_SERRE + dy], [62, Y_SERRE + dy - 2], [72, Y_SERRE + dy - 6]], ep)));
          out.push(jambeFace(V));
          // les ongles des doigts, du côté intérieur
          [[42], [24], [6], [-12]].forEach(([dy]) => {
            const q = [V([68, Y_SERRE + dy + 1]), V([73, Y_SERRE + dy - 8])];
            out.push(`<path d="M${f(q[0][0])} ${f(q[0][1])} L${f(q[1][0])} ${f(q[1][1])}" ${trait(0.5)}/>`);
          });
          // le geste : serrer, les deux côtés l'un vers l'autre
          const yF = Y_SERRE + 15;
          const fg0 = V([-160, yF]), fg1 = V([-90, yF]);
          const fd0 = V([170, yF]), fd1 = V([95, yF]);
          out.push(h.fleche(`M${f(fg0[0])} ${f(fg0[1])} L${f(fg1[0])} ${f(fg1[1])}`, h.a.contour));
          out.push(h.fleche(`M${f(fd0[0])} ${f(fd0[1])} L${f(fd1[0])} ${f(fd1[1])}`, h.a.contour));
          // où la douleur se réveille : devant, un peu au-dessus de la cheville, côté extérieur
          const p = V([-12, 120]);
          out.push(douleur(p, 10 * s, 20 * s));
          return out.join('\n');
        },
        renvois: z => {
          const { V } = geoFace(z);
          return [
            R(8, V([110, 520]), V([70, Y_SERRE + 40])),
            R(9, V([-110, 190]), V([-20, 128])),
          ];
        },
      },
    },
    danger: 'Danger — un os qui fait mal sous le doigt à l’un des quatre endroits du haut, ou quatre pas impossibles : attelle, comme pour une fracture. Chez un enfant, dans le doute, l’attelle. Au tiroir, un ligament complètement rompu fait parfois moins mal qu’un ligament étiré.',
  };
};
