// Planche 85-01. La lampe à mèche flottante et sa cheminée (ch. 85, §9, « La lampe à mèche flottante, la
// plus facile à monter » et « La cheminée de verre n'est pas un ornement »).
// Le chapitre : un pot de verre ou une boîte rempli d'huile ; un flotteur percé (liège, écorce, couvercle
// troué) ; la mèche le traverse, dépasse de quelques millimètres et plonge dans l'huile ; l'assiette de tôle
// dessous. La cheminée tire : l'air chaud monte dans le tube et aspire l'air frais par le bas. Deux cheminées
// de fortune : un pot droit fendu à la ficelle brûlée puis plongé dans l'eau froide, l'arête cassée au fil
// d'une pierre ; une boîte ouverte aux deux bouts, une fenêtre en façade, l'arrière fait réflecteur.
// Ce que le chapitre ne dit pas : comment l'air entre sous une cheminée posée. La planche le tranche par le
// principe que le chapitre donne (l'air frais entre par le bas) : la cheminée se pose sur trois cailloux,
// et l'air passe dessous. L'arrivée d'air sous la flamme d'une lampe à cheminée est confirmée par
// sources/85-lampe-a-petrole-air-sous-la-cheminee.md ; les cailloux sont un choix de la planche.
// Aucune cote : le chapitre n'en donne pas (« quelques millimètres » est dit dans le renvoi).
// La charte : le verre en coupe en noir plein ; l'intérieur de la boîte, vu par la fenêtre, en gris loin ;
// l'air en flèches noires ; le rouge pour le geste (plonger, user l'arête) et le point à contrôler (la
// mèche qui dépasse à peine).

module.exports = (h) => {
  const f = v => Math.round(v * 10) / 10;
  const blanc = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const M = (P, x, y) => P(x, y).join(' ');
  const S1 = 10.4, S2 = 9.0, SV = 13;

  // repère : cm, x centré, y vers le haut, l'assiette (ou le sol) à y = 0 en bas de la vue
  const rep = (z, S, bas = 26) => (x, y) => [f(z.l / 2 + x * S), f(z.h - bas - y * S)];

  // Une flamme, base en (x, y) en cm, hauteur ht en cm.
  const flamme = (P, x, y, ht, S) => {
    const [bx, by] = P(x, y), H = ht * S, l = H * 0.3;
    const ext = `M${bx} ${by} C${f(bx - l * 1.3)} ${f(by - H * 0.15)} ${f(bx - l * 0.7)} ${f(by - H * 0.6)} ${bx} ${f(by - H)} C${f(bx + l * 0.7)} ${f(by - H * 0.6)} ${f(bx + l * 1.3)} ${f(by - H * 0.15)} ${bx} ${by} Z`;
    const hi = H * 0.42, li = l * 0.45;
    const int = `M${bx} ${f(by - 1.5)} C${f(bx - li * 1.3)} ${f(by - hi * 0.2)} ${f(bx - li * 0.6)} ${f(by - hi * 0.7)} ${bx} ${f(by - hi)} C${f(bx + li * 0.6)} ${f(by - hi * 0.7)} ${f(bx + li * 1.3)} ${f(by - hi * 0.2)} ${bx} ${f(by - 1.5)} Z`;
    return [h.path(ext, blanc(h.a.arete)), h.path(int, h.a.detail)].join('\n');
  };
  // L'assiette de tôle en coupe : un fond mince, deux rebords relevés.
  const assiette = (P, l) => h.path(`M${M(P, -l / 2 - 1.2, 1.3)} L${M(P, -l / 2, 0.3)} L${M(P, l / 2, 0.3)} L${M(P, l / 2 + 1.2, 1.3)} L${M(P, l / 2 + 1.5, 1.05)} L${M(P, l / 2 + 0.15, 0)} L${M(P, -l / 2 - 0.15, 0)} L${M(P, -l / 2 - 1.5, 1.05)} Z`, h.a.plein);
  // Un caillou en coupe, posé, centre x, largeur l, hauteur ht.
  const caillou = (P, x, y0, l, ht) => {
    const d = `M${M(P, x - l / 2, y0)} C${M(P, x - l / 2, y0 + ht * 0.8)} ${M(P, x - l * 0.2, y0 + ht)} ${M(P, x + l * 0.05, y0 + ht)} C${M(P, x + l * 0.35, y0 + ht)} ${M(P, x + l / 2, y0 + ht * 0.7)} ${M(P, x + l / 2, y0)} Z`;
    return h.path(d, h.a.hachure('pierre', 'arete'));
  };

  // La lampe en coupe : pot, huile, flotteur, mèche, flamme. Pot de largeur L, hauteur Hp, posé en y0.
  const L = 7.6, Hp = 9.2, EP = 0.35, NIV = 7.4;
  const lampe = (P, S, y0 = 0.3) => {
    const o = [];
    // l'huile
    o.push(h.chemin([P(-L / 2 + EP, y0 + EP), P(L / 2 - EP, y0 + EP), P(L / 2 - EP, y0 + NIV), P(-L / 2 + EP, y0 + NIV)], h.a.hachure('eau', 'aucun'), true));
    o.push(h.ligne(...P(-L / 2 + EP, y0 + NIV), ...P(L / 2 - EP, y0 + NIV), h.a.detail));
    // le pot de verre, coupé : le fond et les deux parois en noir plein
    o.push(h.path(`M${M(P, -L / 2, y0 + Hp)} L${M(P, -L / 2, y0 + 0.6)} Q${M(P, -L / 2, y0)} ${M(P, -L / 2 + 0.6, y0)} L${M(P, L / 2 - 0.6, y0)} Q${M(P, L / 2, y0)} ${M(P, L / 2, y0 + 0.6)} L${M(P, L / 2, y0 + Hp)} L${M(P, L / 2 - EP, y0 + Hp)} L${M(P, L / 2 - EP, y0 + EP)} L${M(P, -L / 2 + EP, y0 + EP)} L${M(P, -L / 2 + EP, y0 + Hp)} Z`, h.a.plein));
    // la mèche : plonge dans l'huile, traverse le flotteur, dépasse à peine
    const mt = y0 + NIV + 0.25 + 0.45;
    o.push(h.chemin([P(-0.17, y0 + NIV - 3.4), P(0.17, y0 + NIV - 3.4), P(0.17, mt), P(-0.17, mt)], blanc(h.a.arete), true));
    o.push(h.chemin([P(-0.17, mt - 0.22), P(0.17, mt - 0.22), P(0.17, mt), P(-0.17, mt)], h.a.plein, true));
    // le flotteur : un disque percé, à fleur d'huile
    o.push(h.chemin([P(-2.1, y0 + NIV - 0.3), P(-0.17, y0 + NIV - 0.3), P(-0.17, y0 + NIV + 0.25), P(-2.1, y0 + NIV + 0.25)], h.a.hachure('bois', 'arete'), true));
    o.push(h.chemin([P(0.17, y0 + NIV - 0.3), P(2.1, y0 + NIV - 0.3), P(2.1, y0 + NIV + 0.25), P(0.17, y0 + NIV + 0.25)], h.a.hachure('bois', 'arete'), true));
    o.push(flamme(P, 0, mt + 0.12, 2.4, S));
    return { svg: o.join('\n'), mt, haut: y0 + Hp };
  };

  // ─── Vue 1 : la mèche flottante ───
  const vueFlottante = z => {
    const P = rep(z, SV), o = [];
    o.push(assiette(P, 10.2));
    const l = lampe(P, SV);
    o.push(l.svg);
    return o.join('\n');
  };
  const renvoisFlottante = z => {
    const P = rep(z, SV), y0 = 0.3;
    const [fx, fy] = P(-1.4, y0 + NIV), [mx, my] = P(0.17, y0 + NIV + 0.55), [hx, hy] = P(2.2, y0 + 3.5), [ax, ay] = P(4.4, 0.2);
    return [
      { n: 1, rond: [Math.max(12, fx - 40), fy - 34], cible: [fx - 3, fy - 2], texte: 'flotteur percé : liège, écorce, couvercle' },
      { n: 2, rond: [Math.min(z.l - 12, mx + 52), my - 44], cible: [mx + 0.5, my - 0.5], texte: 'mèche, quelques millimètres au-dessus' },
      { n: 3, rond: [Math.min(z.l - 12, hx + 44), hy + 18], cible: [hx, hy], texte: 'huile, ou gras fondu tiède' },
      { n: 4, rond: [Math.min(z.l - 12, ax + 22), ay + 14], cible: [ax, ay + 1], texte: 'assiette de tôle dessous' },
    ];
  };

  // ─── Vue 2 : la cheminée posée sur trois cailloux ───
  const CH = 11.2, HC = 15.5, YC = 1.6;               // largeur, hauteur, dessous de la cheminée
  const vuePosee = z => {
    const P = rep(z, S1), o = [];
    o.push(assiette(P, 15));
    o.push(lampe(P, S1).svg);
    // les cailloux : la coupe passe par un des trois, à droite ; à gauche, elle passe entre deux
    o.push(caillou(P, CH / 2 - 0.2, 0.3, 1.9, YC - 0.3));
    // la cheminée : un pot sans fond, en coupe ; l'épaule et le col en haut
    for (const sg of [-1, 1]) o.push(h.path(`M${M(P, sg * CH / 2, YC)} L${M(P, sg * CH / 2, YC + HC - 3)} Q${M(P, sg * CH / 2, YC + HC - 1.5)} ${M(P, sg * 3.6, YC + HC - 1.4)} L${M(P, sg * 2.9, YC + HC - 1.4)} L${M(P, sg * 2.9, YC + HC)}`, h.a.contour));
    // l'air : entre sous le bord, monte entre le pot et la cheminée, passe à la flamme, sort en haut
    for (const s of [-1]) {
      o.push(h.fleche(`M${M(P, s * (CH / 2 + 3.2), 1.0)} L${M(P, s * (CH / 2 + 0.5), 1.0)} Q${M(P, s * (L / 2 + 0.7), 1.1)} ${M(P, s * (L / 2 + 0.7), 3.5)} L${M(P, s * (L / 2 + 0.7), 9.6)} Q${M(P, s * (L / 2 + 0.7), 11.6)} ${M(P, s * 1.6, 11.8)}`, h.a.detail));
    }
        o.push(h.fleche(`M${M(P, 0, 13.6)} L${M(P, 0, YC + HC + 2.2)}`, h.a.arete));
    return o.join('\n');
  };
  const renvoisPosee = z => {
    const P = rep(z, S1);
    const [cx, cy] = P(CH / 2 - 0.2, YC - 0.4), [ax, ay] = P(-(L / 2 + 0.7), 6.5);
    return [
      { n: 9, rond: [Math.min(z.l - 12, cx + 24), cy + 20], cible: [cx + 2, cy + 3], texte: 'trois cailloux sous le bord' },
      { n: 10, rond: [ax - 30, ay - 52], cible: [ax, ay], texte: 'l’air frais entre par le bas' },
    ];
  };

  // ─── Vue 3 : la boîte ouverte aux deux bouts, une fenêtre en façade ───
  const BL = 10.6, BH = 15;
  const vueBoite = z => {
    const P = rep(z, S1), o = [], e = 1.1;           // e : demi-hauteur de l'ellipse du bord
    o.push(assiette(P, 15));
    // les cailloux, vus de face
    for (const x of [-BL / 2 + 1, BL / 2 - 1]) o.push(h.path(`M${M(P, x - 1, 0.3)} C${M(P, x - 1, 1.5)} ${M(P, x + 1, 1.6)} ${M(P, x + 1, 0.3)} Z`, blanc(h.a.arete)));
    const yb = YC, yt = YC + BH;
    const [xl, ybb] = P(-BL / 2, yb), [xr, ytt] = P(BL / 2, yt), rx = BL / 2 * S1, ry = e * S1, [xc] = P(0, 0);
    // le corps de la boîte, l'ombre à droite
    const corps = `M${xl} ${ytt} L${xl} ${ybb} A${f(rx)} ${f(ry)} 0 0 0 ${xr} ${ybb} L${xr} ${ytt}`;
    o.push(h.path(corps + ` A${f(rx)} ${f(ry)} 0 0 1 ${xl} ${ytt} Z`, h.a.blanc));
    o.push(h.path(`M${f(xr - rx * 0.36)} ${f(ytt + ry * 0.93)} L${f(xr - rx * 0.36)} ${f(ybb + ry * 0.93)} A${f(rx)} ${f(ry)} 0 0 0 ${xr} ${ybb} L${xr} ${ytt} A${f(rx)} ${f(ry)} 0 0 1 ${f(xr - rx * 0.36)} ${f(ytt + ry * 0.93)} Z`, h.a.ombre));
    // le bord du haut, ouvert : l'intérieur au fond
    o.push(h.ellipse(xc, ytt, rx, ry, h.a.loin), h.ellipse(xc, ytt, rx, ry, h.a.arete));
    // les nervures de la boîte, coupées par la fenêtre
    const fx0 = -3.2, fx1 = 3.2, fy0 = YC + 4.4, fy1 = YC + 12.2;
    for (const y of [YC + 2.2, YC + 12.8]) o.push(h.path(`M${M(P, -BL / 2, y)} Q${M(P, 0, y - e * 0.9)} ${M(P, BL / 2, y)}`, h.a.fin));
    // la fenêtre : on y voit le fond de la boîte (gris loin), le pot et sa flamme devant
    o.push(h.chemin([P(fx0, fy0), P(fx1, fy0), P(fx1, fy1), P(fx0, fy1)], h.a.loin, true));
    // par la fenêtre : le haut du pot de la lampe (posé sur l'assiette) et sa flamme
    const jt = 0.3 + Hp;
    o.push(h.chemin([P(fx0, fy0), P(fx1, fy0), P(fx1, jt), P(fx0, jt)], h.a.blanc, true));
    o.push(h.ligne(...P(fx0, jt), ...P(fx1, jt), h.a.arete));
    o.push(h.ligne(...P(fx0, 0.3 + NIV), ...P(fx1, 0.3 + NIV), h.a.detail));
    o.push(h.path(`M${M(P, -2.3, fy0)} L${M(P, -2.3, jt - 0.5)} M${M(P, -1.7, fy0)} L${M(P, -1.7, jt - 2)}`, h.a.fin));
    o.push(flamme(P, 0, 0.3 + NIV + 0.7, 2.4, S1));
    o.push(h.chemin([P(fx0, fy0), P(fx1, fy0), P(fx1, fy1), P(fx0, fy1)], h.a.arete, true));
    o.push(h.path(corps, h.a.contour));
    o.push(h.ellipse(xc, ytt, rx, ry, h.a.contour));
    return o.join('\n');
  };
  const renvoisBoite = z => {
    const P = rep(z, S1);
    const [tx, ty] = P(-BL / 2 + 1.2, YC + BH + 0.5), [wx, wy] = P(2.9, YC + 9.5);
    return [
      { n: 11, rond: [tx - 4, ty - 36], cible: [tx, ty - 2], texte: 'boîte ouverte aux deux bouts' },
      { n: 12, rond: [Math.min(z.l - 12, wx + 52), wy - 18], cible: [wx + 0.5, wy], texte: 'fenêtre en façade, le fond renvoie' },
    ];
  };

  // ─── Vues 4 à 7 : fendre un pot droit sur la ligne ───
  // Un pot droit vu de face : col fileté, épaule, corps ; y0 : dessous ; hauteur 11,5.
  const PL = 7.6, PH = 11.5, LIGNE = 2.4;
  const potFace = (P, y0, { haut = true, bas = true, x = 0 } = {}) => {
    const o = [], r = PL / 2, Q = (a, b) => M(P, x + a, y0 + b);
    const ya = haut ? PH : LIGNE, yb = bas ? 0 : LIGNE;
    let d;
    if (haut) {
      d = `M${Q(-r, yb + (bas ? 0.7 : 0))} L${Q(-r, PH - 2.3)} Q${Q(-r, PH - 1.2)} ${Q(-r + 1.4, PH - 1.1)} L${Q(-2.4, PH - 1.1)} L${Q(-2.4, PH)} L${Q(2.4, PH)} L${Q(2.4, PH - 1.1)} L${Q(r - 1.4, PH - 1.1)} Q${Q(r, PH - 1.2)} ${Q(r, PH - 2.3)} L${Q(r, yb + (bas ? 0.7 : 0))}`;
    } else d = `M${Q(-r, yb + 0.7)} L${Q(-r, ya)} L${Q(r, ya)} L${Q(r, yb + 0.7)}`;
    d += bas ? ` Q${Q(r, 0)} ${Q(r - 0.7, 0)} L${Q(-r + 0.7, 0)} Q${Q(-r, 0)} ${Q(-r, 0.7)} Z` : ` L${Q(-r, yb)} Z`;
    if (!bas) d = d.replace(/ L[^L]*Z$/, ` L${Q(r, LIGNE)} L${Q(-r, LIGNE)} Z`);
    o.push(h.path(d, blanc(h.a.contour)));
    // les reflets du verre, le filet du col
    if (haut) {
      o.push(h.path(`M${Q(-r + 0.9, (bas ? 1.4 : LIGNE + 0.7))} L${Q(-r + 0.9, PH - 2.6)} M${Q(-r + 1.6, (bas ? 2.2 : LIGNE + 1.2))} L${Q(-r + 1.6, PH - 4)}`, h.a.fin));
      o.push(h.path(`M${Q(-2.4, PH - 0.35)} L${Q(2.4, PH - 0.6)} M${Q(-2.4, PH - 0.75)} L${Q(2.4, PH - 1.0)}`, h.a.fin));
    } else o.push(h.path(`M${Q(-r + 0.9, 1.1)} L${Q(-r + 0.9, LIGNE - 0.4)}`, h.a.fin));
    return o.join('\n');
  };
  const rep2 = z => rep(z, S2, 18);
  const vueA = z => {
    const P = rep2(z), o = [potFace(P, 0)];
    // la ficelle nouée à la ligne, qui brûle
    const r = PL / 2;
    o.push(h.path(`M${M(P, -r - 0.2, LIGNE)} Q${M(P, 0, LIGNE - 0.55)} ${M(P, r + 0.2, LIGNE)}`, h.a.contour));
    o.push(h.path(`M${M(P, r + 0.2, LIGNE)} Q${M(P, r + 1.1, LIGNE - 0.4)} ${M(P, r + 1.4, LIGNE - 1.6)} M${M(P, r + 0.2, LIGNE)} Q${M(P, r + 1.3, LIGNE + 0.1)} ${M(P, r + 1.9, LIGNE - 0.9)}`, h.a.arete));
    for (const x of [-2.4, -0.4, 1.6]) o.push(flamme(P, x, LIGNE - 0.3, 1.5, S2));
    return o.join('\n');
  };
  const vueB = z => {
    const P = rep2(z), o = [];
    // le seau d'eau froide en coupe, le pot qui y entre par le fond
    const sl = 13.4, sh = 9.6, eau = 7.6;
    o.push(h.chemin([P(-sl / 2 + 0.3, 0.3), P(sl / 2 - 0.3, 0.3), P(sl / 2 - 0.3, eau), P(-sl / 2 + 0.3, eau)], h.a.hachure('eau', 'aucun'), true));
    o.push(h.ligne(...P(-sl / 2 + 0.3, eau), ...P(sl / 2 - 0.3, eau), h.a.detail));
    o.push(h.path(`M${M(P, -sl / 2 - 0.4, sh)} L${M(P, -sl / 2, 0)} L${M(P, sl / 2, 0)} L${M(P, sl / 2 + 0.4, sh)}`, h.a.contour));
    o.push(potFace(P, 4.2));
    // le geste : plonger aussitôt
    o.push(h.geste(`M${M(P, 0, 4.2 + PH + 6.5)} L${M(P, 0, 4.2 + PH + 1.5)}`));
    return o.join('\n');
  };
  const vueC = z => {
    const P = rep2(z), o = [];
    o.push(potFace(P, 0, { haut: false }));
    o.push(potFace(P, 1.6, { bas: false }));
    o.push(h.controle(...P(PL / 2, LIGNE + 1.6), 9));
    return o.join('\n');
  };
  const vueD = z => {
    const P = rep2(z), o = [];
    // une pierre plate au sol, le tube posé dessus par l'arête, frotté en rond
    o.push(h.path(`M${M(P, -6.2, 0)} C${M(P, -6.4, 1.3)} ${M(P, -4.8, 1.9)} ${M(P, -2, 1.9)} L${M(P, 3.6, 1.8)} C${M(P, 5.8, 1.7)} ${M(P, 6.4, 1)} ${M(P, 6.2, 0)} Z`, h.a.hachure('pierre', 'arete')));
    // le tube retourné, le col en haut
    o.push(potFace(P, 1.9 - LIGNE, { bas: false }));
    o.push(h.geste(`M${M(P, -5.4, 4.6)} Q${M(P, 0, 2.4)} ${M(P, 5.4, 4.6)}`, { double: true }));
    return o.join('\n');
  };
  const renvoisA = z => { const P = rep2(z), [x, y] = P(-PL / 2 + 0.6, LIGNE - 0.3); return [{ n: 5, rond: [Math.max(12, x - 22), y + 16], cible: [x + 1, y + 2], texte: 'ficelle imbibée, nouée à la ligne' }]; };
  const renvoisB = z => { const P = rep2(z), [x, y] = P(6.9, 6); return [{ n: 6, rond: [Math.min(z.l - 12, x + 12), y + 24], cible: [x - 0.5, y + 2], texte: 'plongé aussitôt dans l’eau froide' }]; };
  const renvoisC = z => { const P = rep2(z), [x, y] = P(-PL / 2, LIGNE + 1.6); return [{ n: 7, rond: [x - 14, y + 34], cible: [x + 0.5, y + 1], texte: 'fendu net sur la ligne' }]; };
  const renvoisD = z => { const P = rep2(z), [x, y] = P(-PL / 2, 1.9); return [{ n: 8, rond: [x - 14, y - 50], cible: [x + 0.6, y - 2], texte: 'l’arête usée sur une pierre' }]; };

  return {
    ref: '85-01',
    fichier: 'planche-85-01-lampe-meche-flottante-cheminee.svg',
    titre: 'La lampe à mèche flottante et sa cheminée',
    desc: 'En coupe, un pot de verre rempli d’huile sur une assiette de tôle : un flotteur percé à fleur d’huile, la mèche qui le traverse, plonge dans l’huile et ne dépasse que de quelques millimètres. La même lampe sous un pot sans fond posé sur trois cailloux : l’air frais entre sous le bord, monte jusqu’à la flamme et sort en haut. Une boîte ouverte aux deux bouts, une fenêtre en façade, sur la même lampe. Dessous, fendre un pot droit pour en faire la cheminée : la ficelle imbibée nouée à la ligne et allumée, le pot plongé aussitôt dans l’eau froide, fendu net sur la ligne, l’arête usée sur une pierre.',
    format: 'pleine',
    disposition: [['flottante', 'posee', 'boite'], ['a', 'b', 'c', 'd']],
    hauteurs: [1.15, 1],
    vues: {
      flottante: { titre: 'La mèche flottante, en coupe', dessin: vueFlottante, renvois: renvoisFlottante },
      posee: { titre: 'La cheminée posée, en coupe', dessin: vuePosee, renvois: renvoisPosee },
      boite: { titre: 'La boîte à fenêtre', dessin: vueBoite, renvois: renvoisBoite },
      a: { titre: 'Brûler la ficelle', dessin: vueA, renvois: renvoisA },
      b: { titre: 'Plonger', dessin: vueB, renvois: renvoisB },
      c: { titre: 'Fendu', dessin: vueC, renvois: renvoisC },
      d: { titre: 'Adoucir l’arête', dessin: vueD, renvois: renvoisD },
    },
    danger: 'Un verre fêlé ailleurs que sur la ligne éclate en service, au-dessus de la flamme : il ne sert pas. Un pot renversé répand de l’huile qui brûle : l’assiette de tôle dessous, la chaudière de sable à côté.',
  };
};
