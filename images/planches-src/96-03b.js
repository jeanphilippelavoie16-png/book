// Planche 96-03b — Arracher une souche au câble : le chicot.
// Chapitre 96, B « Ouvrir le champ », étapes 8 et 9 : dégager au pic, trancher les racines à la hache
// tout autour ; le câble attaché haut sur le chicot. « Le chicot s'amincit vers le haut : une élingue
// passée autour remonte et saute quand il bascule […]. On la loge dans une entaille faite à la hache
// du côté opposé à la traction, qui lui fait un épaulement. »
// Vue 1 : le haut du chicot de côté, la traction part à gauche. Vue 2 : de dessus, la fosse et les
// racines tranchées tout autour. Vue 3 : coupé à la hauteur de l'élingue, vu de dessus, alignée sous la
// vue 1 (mêmes x, même échelle). Vue 4 : quand il bascule, avec et sans entaille.
// L'entaille : épaulement plat en haut, face basse en biais, le fond sous l'épaulement ; l'élingue
// passe en panier autour du fût, couchée au fond de l'entaille, et ses deux brins se rejoignent à un
// anneau couché où prend le câble. Le chapitre ne donne aucune mesure : ni hauteur de chicot, ni
// profondeur d'entaille, ni largeur de fosse. Aucune cote ; les proportions (chicot de 1,55 m, 420 mm
// de diamètre à la hauteur de l'élingue, entaille de 100 mm, fosse de 1,7 m) ne servent qu'au dessin.
// La charte : de côté, la face de droite du chicot à l'ombre (lumière en haut à gauche), entaille
// comprise, et de même quand il bascule. Pas de gris sur le plan de la fosse ni sur la coupe
// hachurée. Le rouge : l'élingue sous l'épaulement (le point à vérifier) et, sur le raté, l'élingue
// qui remonte au sommet (là où ça casse). La traction, la bascule et l'élingue qui glisse sont des
// pièces qui bougent : leurs flèches restent noires.
module.exports = (h) => {
  const F = h.formes;
  const f = v => Math.round(v * 10) / 10;
  const blanc = (t = 'arete') => h.a[t].replace('fill="none"', 'fill="#FFFFFF"');
  const D = (pts, ferme = true) => 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + (ferme ? ' Z' : '');
  const rad = a => a * Math.PI / 180;
  const trait = (a, b, at = h.a.fin) => h.path(`M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`, at);

  // ── Le chicot, en mm : X le long du câble (traction vers -X), Y la hauteur (sol 0), P en travers
  //    (positif vers le lecteur : vers le bas des vues de dessus).
  const HC = 1550;
  const r = Y => Y < 0 ? 330 : Y < 250 ? 270 + 60 * (1 - Y / 250) ** 2 : 270 - 70 * (Y - 250) / 1300;
  const NH = 1372, NB = 1202, NP = 100;           // entaille : épaulement, bas de la face en biais, fond
  const XF = r(NH) - NP;                          // le fond de l'entaille
  const ES = 25;                                  // l'épaisseur de l'élingue
  // l'élingue couchée au fond : tangente à l'épaulement et à la face en biais
  const [XS, YS] = (() => {
    const u = [r(NB) - XF, NB - NH], L = Math.hypot(...u), un = [u[0] / L, u[1] / L];
    const b = [1 + un[0], un[1]], Lb = Math.hypot(...b), phi = Math.acos(un[0]);
    const d = (ES / 2) / Math.sin(phi / 2);
    return [XF + b[0] / Lb * d, NH + b[1] / Lb * d];
  })();
  const RS = r(YS) + ES / 2;                      // rayon de l'élingue autour du fût
  const XE = -450, RA = 55;                       // l'anneau, couché
  const tgA = Math.PI - Math.acos(RS / -XE);      // où les brins quittent le fût (depuis +X)
  const aN = Math.acos(XS / RS);                  // où l'élingue entre dans l'entaille
  const pente = 0.09;                             // le câble monte vers le vindas
  const PIT_E = 850, PIT_F = 640;

  // Contour du haut du chicot, de côté, de Y0 à la coupe d'abattage, cassé en bas.
  const contour = (Y0, entaille) => {
    const Ys = [];
    for (let Y = Y0; Y < HC; Y += 30) Ys.push(Y);
    Ys.push(HC);
    const g = Ys.map(Y => [-r(Y), Y]);
    const d = [];
    let fait = false;
    Ys.slice().reverse().forEach(Y => {
      if (entaille && Y > NB && Y < NH) return;
      if (entaille && Y <= NB && !fait) { d.push([r(NH), NH], [XF, NH], [r(NB), NB]); fait = true; }
      d.push([r(Y), Y]);
    });
    const haut = [[-r(HC) + 40, HC], [-10, HC], [-10, HC + 22], [r(HC) - 12, HC + 22]];
    const w = r(Y0);
    const casse = [[w * 0.5, Y0 - 30], [w * 0.1, Y0 + 25], [-w * 0.35, Y0 - 25], [-w * 0.7, Y0 + 15]];
    return [...g, ...haut, ...d, ...casse];
  };
  // Une bande (l'élingue) le long d'une polyligne, bout rond au bout qui passe derrière le fût.
  const bande = (pts, ep, capFin) => {
    const n = pts.length, G = [], Dd = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L * ep / 2, ny = (b[0] - a[0]) / L * ep / 2;
      G.push([pts[i][0] + nx, pts[i][1] + ny]); Dd.push([pts[i][0] - nx, pts[i][1] - ny]);
    }
    let d = 'M ' + G.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ');
    d += capFin ? ` A ${f(ep / 2)} ${f(ep / 2)} 0 0 0 ${f(Dd[n - 1][0])} ${f(Dd[n - 1][1])}` : ` L ${f(Dd[n - 1][0])} ${f(Dd[n - 1][1])}`;
    d += ' L ' + Dd.slice().reverse().map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
    return h.path(d, blanc('arete'));
  };

  // La face de droite du chicot, à l'ombre : une bande découpée par le contour lui-même.
  // M : du repère du chicot (mm) à l'écran ; id : l'identifiant de la découpe.
  const ombreDroite = (Y0, entaille, M, id) => {
    const cont = D(contour(Y0, entaille).map(M));
    const Ys = [];
    for (let Y = Y0 - 80; Y <= HC + 60; Y += 30) Ys.push(Y);
    const band = [...Ys.map(Y => [0.42 * r(Math.min(Y, HC)), Y]), [700, HC + 60], [700, Y0 - 80]].map(M);
    return `<defs><clipPath id="${id}"><path d="${cont}" fill="#FFFFFF" stroke="none"/></clipPath></defs><g clip-path="url(#${id})">${h.path(D(band), h.a.ombre)}</g>`;
  };
  const chicot = (Y0, entaille, M, id) => {
    const d = D(contour(Y0, entaille).map(M));
    return [h.path(d, h.a.blanc), ombreDroite(Y0, entaille, M, id), h.path(d, h.a.contour)].join('\n');
  };

  // ─── Vue 1 : le haut du chicot, de côté ─────────────────────────────────────────────
  const Y0 = 820;
  const V1 = z => {
    const s = Math.min((z.l - 10) / 1230, (z.h - 8) / (1800 - Y0));
    return { s, x: X => 5 + (X + 700) * s, y: Y => 4 + (1800 - Y) * s };
  };
  const vue1 = z => {
    const { s, x, y } = V1(z), out = [];
    const yc = X => YS + pente * (XE - X);
    // le câble, de l'anneau vers le vindas (hors de la vue, à gauche)
    out.push(F.corde([[x(XE - RA + 5), y(YS + 4)], [x(XE - 150), y(yc(XE - 150))], [x(-700), y(yc(-700))]], { ep: 20 * s, torons: true, debut: 'ouvert', fin: 'fixe' }));
    // l'anneau, couché : vu de côté, il se voit par la tranche
    out.push(h.ellipse(x(XE), y(YS), RA * s, 16 * s, blanc('contour')));
    // le chicot, l'entaille à droite
    out.push(chicot(Y0, true, ([X, Y]) => [x(X), y(Y)], 'k9603b-om1'));
    [[-120, 900, 1500], [-10, 1000, 1420], [95, 880, 1300], [150, 950, 1200]].forEach(([X0, Ya, Yb]) =>
      out.push(h.ligne(x(X0), y(Ya), x(X0 * 0.85), y(Yb), h.a.fin)));
    // l'élingue : de l'anneau au fût, en travers de la face, puis au fond de l'entaille où elle passe derrière
    out.push(bande([[x(XE + 30), y(YS)], [x(-r(YS)), y(YS)], [x(XS), y(YS)]], ES * s, true));
    // le point à vérifier : l'élingue couchée sous l'épaulement, au fond de l'entaille
    out.push(h.controle(x(XS), y(YS), 14));
    // le sens de la traction et la bascule
    out.push(h.fleche(`M ${f(x(-520))} ${f(y(yc(-520) + 120))} L ${f(x(-680))} ${f(y(yc(-680) + 120))}`));
    const Rb = 1890, a0 = 84, a1 = 97, cx = -330, cy = -150;
    const P0 = [x(cx + Rb * Math.cos(rad(a0))), y(cy + Rb * Math.sin(rad(a0)))], P1 = [x(cx + Rb * Math.cos(rad(a1))), y(cy + Rb * Math.sin(rad(a1)))];
    out.push(h.fleche(`M ${f(P0[0])} ${f(P0[1])} A ${f(Rb * s)} ${f(Rb * s)} 0 0 0 ${f(P1[0])} ${f(P1[1])}`));
    return out.join('\n');
  };

  // ─── Vue 2 : de dessus, la fosse ────────────────────────────────────────────────────
  const RAC = [[4, 62, 4], [64, 48, -6], [122, 56, 5], [196, 60, -3], [250, 46, 7], [305, 54, -5]];
  const V2 = z => {
    const s = Math.min((z.l - 12) / 2200, (z.h - 12) / 2200), cx = z.l / 2 + 60 * s, cy = z.h / 2;
    return { s, x: X => cx + X * s, p: P => cy + P * s };
  };
  const vue2 = z => {
    const { s, x, p } = V2(z), out = [];
    out.push(h.cercle(x(0), p(0), PIT_E * s, h.a.arete), h.cercle(x(0), p(0), PIT_F * s, h.a.detail));
    for (let a = 0; a < 360; a += 10) {
      if (RAC.some(([ra]) => Math.abs(((a - ra + 540) % 360) - 180) < 9)) continue;
      if (Math.abs(((a - 180 + 540) % 360) - 180) < 12) continue;
      const L = a % 20 === 0 ? PIT_F + 25 : PIT_E - 95;
      out.push(trait([x(PIT_E * Math.cos(rad(a))), p(PIT_E * Math.sin(rad(a)))], [x(L * Math.cos(rad(a))), p(L * Math.sin(rad(a)))]));
    }
    RAC.forEach(([a, w, pli]) => {
      const dir = k => rad(a + pli * (k - 300) / 900);
      const Q = (k, e) => { const t = dir(k); return [x(k * Math.cos(t) - e * Math.sin(t)), p(k * Math.sin(t) + e * Math.cos(t))]; };
      const ep = k => w * (1 - 0.35 * (k - 300) / 900);
      out.push(h.path(D([Q(300, ep(300)), Q(450, ep(450)), Q(580, ep(580)), Q(555, -ep(555)), Q(450, -ep(450)), Q(300, -ep(300))]), blanc('arete')));
      out.push(h.path(D([Q(625, ep(625)), Q(850, ep(850)), Q(850, -ep(850)), Q(645, -ep(645))]), blanc('arete')));
      out.push(h.path(D([Q(850, ep(850)), Q(960, ep(960)), Q(1060, 0), Q(960, -ep(960)), Q(850, -ep(850))], false), h.a.cache));
    });
    out.push(h.cercle(x(0), p(0), r(-330) * s, blanc('arete')));
    out.push(h.cercle(x(0), p(0), r(HC) * s, blanc('contour')));
    out.push(h.cercle(x(0), p(0), 110 * s, h.a.fin));
    // l'élingue et le câble, à cette échelle : deux traits vers l'anneau
    const T = [RS * Math.cos(tgA), RS * Math.sin(tgA)];
    out.push(h.chemin([[x(T[0]), p(-T[1])], [x(XE), p(0)], [x(T[0]), p(T[1])]], h.a.arete));
    out.push(h.ligne(x(XE), p(0), 4, p(0), h.a.contour));
    out.push(h.cercle(x(XE), p(0), RA * s + 0.8, blanc('arete')));
    return out.join('\n');
  };

  // ─── Vue 3 : coupé à la hauteur de l'élingue, vu de dessus (sous la vue 1) ──────────
  const V3 = z => {
    const { s, x } = V1(z);
    return { s, x, p: P => z.h / 2 + P * s };
  };
  const vue3 = z => {
    const { s, x, p } = V3(z), out = [];
    const R = r(YS), xc = R - NP * (YS - NB) / (NH - NB);   // la face en biais, à cette hauteur
    const Pc = Math.sqrt(R * R - xc * xc);
    // le câble et son anneau
    out.push(F.corde([[x(XE - RA + 5), p(0)], [x(-700), p(0)]], { ep: 20 * s, torons: true, debut: 'ouvert', fin: 'fixe' }));
    // le fût coupé, l'entaille enlevée (le rond d'origine en tireté)
    out.push(h.path(`M ${f(x(xc))} ${f(p(-Pc))} A ${f(R * s)} ${f(R * s)} 0 1 0 ${f(x(xc))} ${f(p(Pc))} Z`, h.a.hachure('bois', 'contour')));
    out.push(h.path(`M ${f(x(xc))} ${f(p(-Pc))} A ${f(R * s)} ${f(R * s)} 0 0 1 ${f(x(xc))} ${f(p(Pc))}`, h.a.cache));
    out.push(h.cercle(x(0), p(0), 55 * s, blanc('detail')), h.cercle(x(0), p(0), 1.4, h.a.plein));
    // l'élingue en panier : brin, tour du fût, fond de l'entaille, tour du fût, brin
    const arc = (sg, de, a) => { const o = []; for (let k = 0; k <= 12; k++) { const t = de + (a - de) * k / 12; o.push([RS * Math.cos(t), sg * RS * Math.sin(t)]); } return o; };
    const pts = [[XE + RA - 12, -12], ...arc(-1, tgA, aN), [XS, -RS * Math.sin(aN) * 0.5], [XS, 0], [XS, RS * Math.sin(aN) * 0.5], ...arc(1, aN, tgA), [XE + RA - 12, 12]];
    out.push(bande(pts.map(([X, P]) => [x(X), p(P)]), ES * s, false));
    out.push(h.cercle(x(XE), p(0), RA * s, h.a.contour));
    // la traction
    out.push(h.fleche(`M ${f(x(-560))} ${f(p(-75))} L ${f(x(-690))} ${f(p(-75))}`));
    return out.join('\n');
  };

  // ─── Vue 4 : quand il bascule, avec et sans entaille ────────────────────────────────
  const TH = 15, PIV = [-330, -150];
  const rot = ([X, Y]) => {
    const c = Math.cos(rad(TH)), sn = Math.sin(rad(TH)), dx = X - PIV[0], dy = Y - PIV[1];
    return [PIV[0] + dx * c - dy * sn, PIV[1] + dx * sn + dy * c];
  };
  const V4 = z => {
    const s = Math.min((z.h - 24) / 2 / 800, (z.l - 10) / 1250);
    return { s, x: X => z.l - 5 - (130 - X) * s, g: [4 + 1650 * s, z.h / 2 + 8 + 1650 * s] };
  };
  const scene = (z, k, entaille) => {
    const q = V4(z), s = q.s, out = [];
    const x = q.x, y = Y => q.g[k] - Y * s;
    const V = pt => { const [X, Y] = rot(pt); return [x(X), y(Y)]; };
    const Yl = entaille ? YS : HC - 30;
    const xs = entaille ? XS : r(Yl) + ES / 2 - 6;
    const [Xg, Yg] = rot([-r(Yl), Yl]), XA = Xg - 250;
    out.push(F.corde([[x(XA - RA + 3), y(Yg)], [x(-1120), y(Yg + pente * (XA - -1120))]], { ep: 20 * s + 0.5, torons: true, debut: 'ouvert', fin: 'fixe' }));
    out.push(h.ellipse(x(XA), y(Yg), RA * s, 16 * s + 0.5, blanc('arete')));
    out.push(chicot(850, entaille, V, `k9603b-om${2 + k}`));
    if (!entaille) out.push(bande([V([-r(YS), YS]), V([r(YS), YS])], ES * s, false).replace(h.a.arete.replace('fill="none"', 'fill="#FFFFFF"'), h.a.cache));
    out.push(bande([[x(XA + 30), y(Yg)], V([-r(Yl), Yl]), V([xs, Yl])], ES * s, true));
    if (!entaille) {
      const [a0, a1] = [V([r(1250) + 90, 1250]), V([r(1530) + 90, 1530])];
      out.push(h.fleche(`M ${f(a0[0])} ${f(a0[1])} L ${f(a1[0])} ${f(a1[1])}`));
      // là où ça casse : l'élingue remontée au sommet, d'où elle saute
      out.push(h.controle(...V([r(HC - 30), HC - 30]), 12));
    }
    return out.join('\n');
  };
  const vue4 = z => scene(z, 0, true) + '\n' + scene(z, 1, false);

  return {
    ref: '96-03b',
    titre: 'Arracher une souche au câble : le chicot',
    desc: 'Le haut du chicot de côté : l’entaille faite à la hache du côté opposé au câble, épaulement plat en haut, et l’élingue couchée dessous, ses deux brins rejoignant l’anneau du câble. Dessous, la même chose coupée à la hauteur de l’élingue : l’élingue en panier autour du fût, au fond de l’entaille. De dessus, la fosse creusée au pic et les racines tranchées tout autour. Quand le chicot bascule : avec l’entaille, l’élingue tient ; sans, elle remonte le fût qui s’amincit et saute.',
    format: 'pleine',
    disposition: [['entaille', 'fosse'], ['coupe', 'bascule']],
    hauteurs: [300, 250],
    largeurs: [[3, 2], [3, 2]],
    vues: {
      entaille: {
        titre: 'Le haut du chicot, de côté',
        dessin: vue1,
        renvois: z => {
          const { x, y } = V1(z);
          return [
            { n: 1, rond: [x(470), y(1180)], cible: [x((XF + r(NB)) / 2 + 8), y((NH + NB) / 2 - 12)], texte: 'l’entaille à la hache, à l’opposé du câble' },
            { n: 2, rond: [x(470), y(1500)], cible: [x(XF + 35), y(NH)], texte: 'l’épaulement : l’élingue ne remonte pas' },
            { n: 3, rond: [x(-560), y(1650)], cible: [x(XE), y(YS + 16)], texte: 'les deux brins, à l’anneau du câble' },
          ];
        },
      },
      fosse: {
        titre: 'De dessus, la fosse',
        dessin: vue2,
        renvois: z => {
          const { x, p } = V2(z);
          const t = rad(305 - 5 * (600 - 300) / 900);
          return [
            { n: 4, rond: [x(-850), p(-980)], cible: [x(750 * Math.cos(rad(215))), p(750 * Math.sin(rad(215)))], texte: 'la fosse, creusée au pic' },
            { n: 5, rond: [x(850), p(-1000)], cible: [x(600 * Math.cos(t)), p(600 * Math.sin(t))], texte: 'chaque racine tranchée à la hache' },
          ];
        },
      },
      coupe: {
        titre: 'Coupé à la hauteur de l’élingue, vu de dessus',
        dessin: vue3,
        renvois: z => {
          const { x, p } = V3(z);
          return [
            { n: 6, rond: [x(470), p(-190)], cible: [x(XS + 8), p(-60)], texte: 'l’élingue au fond de l’entaille' },
          ];
        },
      },
      bascule: {
        titre: 'Quand il bascule',
        dessin: vue4,
        renvois: z => {
          const q = V4(z), s = q.s;
          const c1 = rot([XS, YS]), c2 = rot([r(HC - 30), HC - 30]);
          return [
            { n: 7, rond: [q.x(90), q.g[0] - 1150 * s], cible: [q.x(c1[0]) + 3, q.g[0] - c1[1] * s + 2], texte: 'avec l’entaille, l’élingue tient' },
            { n: 8, rond: [q.x(90), q.g[1] - 1150 * s], cible: [q.x(c2[0]) + 1, q.g[1] - c2[1] * s + 3], texte: 'sans entaille, elle remonte et saute' },
          ];
        },
      },
    },
  };
};
