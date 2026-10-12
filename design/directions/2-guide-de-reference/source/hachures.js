/* Déplie les motifs <pattern> des planches en vrais traits, découpés par la forme.
   Pourquoi : à l'impression en PDF, Chromium pixellise tout remplissage par motif
   SVG en image à 72 ppp (vérifié : 8 images 504 × 612 dans l'intérieur, une par
   hachure de la planche 65-01). Une fois dépliée, la hachure reste vectorielle.
   Le fichier de planche n'est pas modifié : on travaille sur la copie en ligne. */
function deplierHachures(svg){
  const NS = 'http://www.w3.org/2000/svg';
  let n = 0;
  for (const el of [...svg.querySelectorAll('[fill^="url(#"]')]){
    const id = el.getAttribute('fill').match(/url\(#([^)]+)\)/)[1];
    const pat = svg.querySelector('#' + CSS.escape(id));
    if (!pat || pat.localName !== 'pattern') continue;
    if ((pat.getAttribute('patternUnits') || 'objectBoundingBox') !== 'userSpaceOnUse') continue;
    const w = +pat.getAttribute('width'), h = +pat.getAttribute('height');
    const px = +(pat.getAttribute('x') || 0), py = +(pat.getAttribute('y') || 0);
    const tf = pat.getAttribute('patternTransform') || '';
    const cons = pat.patternTransform.baseVal.consolidate();
    const m = cons ? cons.matrix : svg.createSVGMatrix();
    const inv = m.inverse();
    const bb = el.getBBox();
    const pts = [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]]
      .map(([x, y]) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(inv); });
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const i0 = Math.floor((Math.min(...xs) - px) / w) - 1, i1 = Math.ceil((Math.max(...xs) - px) / w) + 1;
    const j0 = Math.floor((Math.min(...ys) - py) / h) - 1, j1 = Math.ceil((Math.max(...ys) - py) / h) + 1;
    const g = document.createElementNS(NS, 'g'); if (tf) g.setAttribute('transform', tf);
    const kids = [...pat.children];
    const seule = kids.length === 1 && kids[0].localName === 'path' && /^M\s*([\d.]+)[ ,]+0\s*L\s*\1[ ,]+([\d.]+)\s*$/.exec(kids[0].getAttribute('d') || '');
    if (seule && Math.abs(+seule[2] - h) < 1e-6){
      // hachure simple : un trait vertical par tuile, on le tire d'un bout à l'autre
      const x0 = +seule[1];
      for (let i = i0; i <= i1; i++){
        const l = kids[0].cloneNode(false);
        l.setAttribute('d', `M${px + i * w + x0} ${py + j0 * h} L${px + i * w + x0} ${py + (j1 + 1) * h}`);
        g.appendChild(l);
      }
    } else {
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++){
        const t = document.createElementNS(NS, 'g');
        t.setAttribute('transform', `translate(${px + i * w} ${py + j * h})`);
        kids.forEach(k => t.appendChild(k.cloneNode(true)));
        g.appendChild(t);
      }
    }
    const cp = document.createElementNS(NS, 'clipPath');
    cp.id = `hx${n++}-${id}`;
    const forme = el.cloneNode(false);
    ['fill', 'stroke', 'stroke-width', 'transform', 'clip-path', 'id'].forEach(a => forme.removeAttribute(a));
    cp.appendChild(forme);
    const wrap = document.createElementNS(NS, 'g');
    if (el.getAttribute('transform')) wrap.setAttribute('transform', el.getAttribute('transform'));
    wrap.appendChild(cp);
    const clip = document.createElementNS(NS, 'g'); clip.setAttribute('clip-path', `url(#${cp.id})`); clip.appendChild(g);
    wrap.appendChild(clip);
    el.parentNode.insertBefore(wrap, el);
    el.setAttribute('fill', 'none');
  }
}
