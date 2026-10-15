// Planche 25-41. Tirer quelqu'un d'un trou dans la glace, depuis le bord (chapitre 25, §5-D,
// étape 26 ; étape 27 pour la sortie à l'horizontale).
// Dessinée le 15 octobre 2026 (inventaire des planches, priorité moyenne). La 15-01 montre
// l'auto-sauvetage ; celle-ci montre le sauveteur.
// Ce que dit le chapitre, et rien de plus : le sauveteur ne marche pas jusqu'au trou ; il tend une
// perche, une branche, une corde, une échelle, en restant couché et en arrière du bord ; sur la
// corde, des nœuds espacés d'une brassée donnent des prises à une main qui ne serre plus, et un
// bidon bouché noué au bout la fait flotter ; à la sortie de l'eau, la personne reste à
// l'horizontale (étape 27 ; étape 25 : progresser couché, sans se relever).
// La personne dans l'eau est un enfant (corps simple enfant6), pour qu'on ne confonde pas les deux
// corps ; le chapitre dit « la personne », et le geste est le même pour un adulte.
// Cotes : aucune en mm. « Une brassée » est la seule mesure du chapitre, posée en cote entre deux
// nœuds ; sur le dessin elle vaut la taille de l'adulte (une brassée est à peu près la taille).
// Corps simples de profil (règle 8). Rouge : le geste de chaque vue (tendre, tirer).
module.exports = (h) => {
  const A = h.a, F = h.formes;
  const f1 = v => Math.round(v * 10) / 10;
  const W = at => at.replace('fill="none"', 'fill="#FFFFFF"');
  const eau = A.hachure('eau', 'aucun');

  const S = 0.11;                  // unités de vue par mm
  const EP = 9;                    // l'épaisseur de la glace, dessinée
  // la glace en coupe, le trou entre xL et xR ; yG : le dessus de la glace
  const glace = (z, yG, xL, xR) => {
    const yb = yG + EP;
    const g = [[0, yG], [xL, yG], [xL - 2, yG + 3], [xL + 2, yG + 6], [xL - 1, yb], [0, yb]];
    const d = [[z.l, yG], [xR, yG], [xR + 2, yG + 3], [xR - 2, yG + 6], [xR + 1, yb], [z.l, yb]];
    return [
      h.rect(0, yG + 3, z.l, z.h - yG - 3, eau),
      h.chemin(g, W(A.contour), true), h.chemin(d, W(A.contour), true),
      h.ligne(xL, yG + 3, xR, yG + 3, A.arete),
    ].join('\n');
  };

  // le sauveteur, à plat ventre, les bras tendus devant vers la glace, posé au bord gauche de la vue
  const ANG_S = { tronc: 90, cou: 76, tete: 58, brasP: 74, avantbrasP: 82, mainP: 86, brasL: 72, avantbrasL: 81, mainL: 86,
    cuisseP: -90, jambeP: -92, piedP: -10, cuisseL: -92, jambeL: -95, piedL: -14 };
  const sauveteur = (yG, objetP) => {
    const o = { pose: 'ventre-hisse', x: 0, y: yG, echelle: S, appui: 'ventre', angles: ANG_S, mains: { P: 'prise', L: 'prise' } };
    const x = 6 - F.corps(o).boite.x0;
    return F.corps(Object.assign(o, { x, objetP }));
  };
  // l'enfant dans l'eau, les avant-bras sur la glace, tourné vers le sauveteur ; xL : le bord du trou
  const enfantEau = (xL, yG, objetP) =>
    F.corps({ pose: 'eau-avantbras', age: 'enfant6', cote: 'gauche', x: xL - 14, y: yG, echelle: S, mains: { P: 'prise', L: 'prise' }, objetP });

  // une perche : un long cylindre
  const perche = (a, b, r = 2.6) => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1] * r, u[0] * r];
    return h.path(`M${f1(a[0] + n[0])} ${f1(a[1] + n[1])} L${f1(b[0] + n[0])} ${f1(b[1] + n[1])} A${r} ${r} 0 0 1 ${f1(b[0] - n[0])} ${f1(b[1] - n[1])} L${f1(a[0] - n[0])} ${f1(a[1] - n[1])} A${r} ${r} 0 0 1 ${f1(a[0] + n[0])} ${f1(a[1] + n[1])} Z`, W(A.contour));
  };
  // la corde : un trait plein ; ses nœuds en petites boules
  const corde = pts => h.path(pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])}`).join(' '), A.contour);
  const noeud = p => h.ellipse(p[0], p[1], 4.4, 3.6, A.plein);
  // le bidon bouché, couché sur l'eau, à moitié dedans ; c : son centre, à la ligne d'eau
  const bidon = (c) => {
    const l = 30, ht = 20, x0 = c[0] - l / 2, y0 = c[1] - ht / 2;
    return [
      h.path(`M${f1(x0 + 4)} ${f1(y0)} L${f1(x0 + l - 8)} ${f1(y0)} L${f1(x0 + l)} ${f1(y0 + 6)} L${f1(x0 + l)} ${f1(y0 + ht - 3)} Q${f1(x0 + l)} ${f1(y0 + ht)} ${f1(x0 + l - 3)} ${f1(y0 + ht)} L${f1(x0 + 3)} ${f1(y0 + ht)} Q${f1(x0)} ${f1(y0 + ht)} ${f1(x0)} ${f1(y0 + ht - 3)} L${f1(x0)} ${f1(y0 + 4)} Q${f1(x0)} ${f1(y0)} ${f1(x0 + 4)} ${f1(y0)} Z`, W(A.contour)),
      h.rect(x0 + l, y0 + 7, 5, 7, W(A.arete)),
      h.path(`M${f1(x0 + 7)} ${f1(y0)} Q${f1(x0 + 12)} ${f1(y0 - 9)} ${f1(x0 + 18)} ${f1(y0)}`, A.arete),
      h.ligne(x0 + 1, c[1] + 2, x0 + l - 1, c[1] + 2, A.detail),
    ].join('\n');
  };
  const cadre = z => ({ yG: Math.min(z.h - 108, 66), xL: z.l - 118, xR: z.l - 22 });

  // ─── 1. La perche ───────────────────────────────────────────────────────────────────────────
  const vPerche = z => {
    const { yG, xL, xR } = cadre(z);
    const s0 = sauveteur(yG, null), e0 = enfantEau(xL, yG, null);
    const a = [s0.mainP.x - 26, s0.mainP.y], b = [e0.mainP.x + 4, yG - 2.6];
    const sv = sauveteur(yG, perche(a, b));
    const en = enfantEau(xL, yG, '');
    const P = { corps: [(sv.boite.x0 + sv.boite.x1) / 2 - 20, sv.boite.y0 + 18], perche: [(a[0] + b[0]) / 2 + 20, (a[1] + b[1]) / 2 - 3], a };
    const svg = [glace(z, yG, xL, xR), String(en), String(sv),
      h.geste(`M${f1(a[0] + 70)} ${f1(yG - 24)} L${f1(a[0] + 140)} ${f1(yG - 24)}`)].join('\n');
    return { svg, P };
  };

  // ─── 2. La corde ────────────────────────────────────────────────────────────────────────────
  // Une brassée vaut à peu près la taille : 1750 mm sur le dessin. Le sauveteur tient un nœud,
  // l'enfant le suivant ; la corde continue jusqu'au bidon, qui flotte dans le trou.
  const BRASSEE = 1750 * S;
  const vCorde = z => {
    const { yG, xL, xR } = cadre(z);
    const e0 = enfantEau(xL, yG, null);
    const me = [e0.mainP.x, e0.mainP.y];
    const ks = [me[0] - BRASSEE, yG - 3.6];          // le nœud dans les mains du sauveteur
    // le sauveteur recule jusqu'à ce que ses mains tombent sur le nœud
    const base = { pose: 'ventre-hisse', x: 0, y: yG, echelle: S, appui: 'ventre', angles: ANG_S, mains: { P: 'prise', L: 'prise' } };
    const s0 = F.corps(base);
    const dx = ks[0] - s0.mainP.x;
    const bc = [xL + 62, yG + 4];
    const pts = [[ks[0] - 34, yG - 3], [ks[0], ks[1]], [me[0], me[1]], [xL + 6, yG + 1], [bc[0] - 16, bc[1] - 1]];
    // les nœuds juste devant chaque main : la main tient derrière le nœud, qui l'empêche de glisser
    const knots = [[ks[0] + 16, yG - 3.6], [me[0] - 12, yG - 3.6]];
    const objet = [corde(pts), ...knots.map(noeud)].join('\n');
    const o = { pose: 'ventre-hisse', x: dx, y: yG, echelle: S, appui: 'ventre', angles: ANG_S, mains: { P: 'prise', L: 'prise' }, objetP: objet };
    const sv = F.corps(o);
    const en = enfantEau(xL, yG, '');
    const mil = [(ks[0] + me[0]) / 2, yG - 3];
    const P = { noeud: knots[0], mil, bidon: [bc[0] + 4, bc[1] - 10] };
    const svg = [glace(z, yG, xL, xR), bidon(bc), String(en), String(sv),
      h.cote(knots[0][0], yG - 50, knots[1][0], yG - 50, 'une brassée'),
      h.geste(`M${f1(mil[0] + 36)} ${f1(yG - 22)} L${f1(mil[0] - 36)} ${f1(yG - 22)}`)].join('\n');
    return { svg, P };
  };

  // ─── 3. Sortir à plat ───────────────────────────────────────────────────────────────────────
  const ANG_E = { tronc: 90, cou: 80, tete: 66, brasP: 78, avantbrasP: 84, mainP: 88, brasL: 76, avantbrasL: 83, mainL: 88,
    cuisseP: -90, jambeP: -92, piedP: -10, cuisseL: -92, jambeL: -96, piedL: -14 };
  const vSortie = z => {
    const { xL, xR } = cadre(z), yG = Math.min(70, z.h - 30);
    const s0 = sauveteur(yG, null);
    const m = [s0.mainP.x, s0.mainP.y];
    // l'enfant à plat ventre sur la glace, les bras devant, les pieds encore au bord du trou
    const oE = { pose: 'ventre-hisse', age: 'enfant6', cote: 'gauche', x: 0, y: yG, echelle: S, appui: 'ventre', angles: ANG_E, mains: { P: 'prise', L: 'prise' } };
    const bx = F.corps(oE).boite;
    oE.x = xL + 4 - bx.x1;
    const e0 = F.corps(oE);
    const me = [e0.mainP.x, e0.mainP.y];
    const knots = [[m[0], m[1]]];
    for (let x = m[0] + BRASSEE; x < me[0] - 6; x += BRASSEE) knots.push([x, yG - 3.6]);
    knots.push([me[0], me[1]]);
    const c = [corde([[m[0] - 34, yG - 3], [m[0], m[1]], [me[0], me[1]]]), ...knots.map(noeud)].join('\n');
    const sv = sauveteur(yG, c);
    const en = F.corps(Object.assign({}, oE, { objetP: '' }));
    const P = { enfant: [(en.boite.x0 + en.boite.x1) / 2 + 6, en.boite.y0 + 5] };
    const mil = [(m[0] + me[0]) / 2, yG];
    const svg = [glace(z, yG, xL, xR), String(en), String(sv),
      h.geste(`M${f1(mil[0] + 36)} ${f1(yG - 22)} L${f1(mil[0] - 36)} ${f1(yG - 22)}`)].join('\n');
    return { svg, P };
  };

  const memo = {};
  const G = (fn, z) => { const c = `${fn.name}-${z.l}-${z.h}`; return memo[c] || (memo[c] = fn(z)); };

  return {
    ref: '25-41',
    titre: 'Tirer quelqu’un d’un trou dans la glace, depuis le bord',
    desc: 'Trois vues en coupe de la glace et de l’eau. Un enfant est dans le trou, les avant-bras sur la glace. L’adulte qui le sort est couché à plat ventre, loin du bord. 1. Il tend une perche que l’enfant agrippe. 2. Il tend une corde à nœuds, un nœud à chaque brassée, un bidon bouché noué au bout qui flotte près de l’enfant. 3. L’enfant est tiré sur la glace à plat ventre, à l’horizontale, sans se relever.',
    format: 'pleine',
    disposition: [['perche'], ['corde'], ['sortie']],
    hauteurs: [1.06, 1.06, 0.88],
    vues: {
      perche: {
        titre: '1. La perche, tendue couché',
        dessin: z => G(vPerche, z).svg,
        renvois: z => {
          const P = G(vPerche, z).P;
          return [
            { n: 1, rond: [P.corps[0] - 30, P.corps[1] - 34], cible: P.corps, texte: 'à plat ventre, loin du bord' },
            { n: 2, rond: [P.perche[0] + 60, P.perche[1] - 44], cible: P.perche, texte: 'perche, branche ou échelle' },
          ];
        },
      },
      corde: {
        titre: '2. La corde à nœuds',
        dessin: z => G(vCorde, z).svg,
        renvois: z => {
          const P = G(vCorde, z).P;
          return [
            { n: 3, rond: [P.noeud[0] - 30, P.noeud[1] - 46], cible: [P.noeud[0] - 1, P.noeud[1] - 3], texte: 'un nœud à chaque brassée' },
            { n: 4, rond: [P.bidon[0] + 40, P.bidon[1] - 30], cible: [P.bidon[0] + 6, P.bidon[1] + 2], texte: 'un bidon bouché : elle flotte' },
          ];
        },
      },
      sortie: {
        titre: '3. Sortir à plat',
        dessin: z => G(vSortie, z).svg,
        renvois: z => {
          const P = G(vSortie, z).P;
          return [
            { n: 5, rond: [P.enfant[0] + 40, P.enfant[1] - 36], cible: P.enfant, texte: 'tiré à plat ventre, sans se relever' },
          ];
        },
      },
    },
  };
};
