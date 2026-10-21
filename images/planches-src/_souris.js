// La souris des planches : la silhouette de Peromyscus leucopus d'Edwin Price (PhyloPic, CC BY 4.0),
// images/modeles/souris-peromyscus-phylopic.svg, relue et posée au trait du livre (contour blanc, œil).
const fs = require('fs'), path = require('path');
module.exports = function (h) {
  const f1 = v => Math.round(v * 10) / 10;
  const src = fs.readFileSync(path.join(__dirname, '../modeles/souris-peromyscus-phylopic.svg'), 'utf8');
  const d = src.match(/<path d="([^"]+)"/)[1];
  // le chemin de potrace en sous-chemins de commandes absolues, en points de la page source (y vers le bas)
  const tok = d.match(/[MmLlCcZz]|-?\d*\.?\d+/g);
  const sous = []; let cur = null, p = [0, 0], debut = [0, 0], i = 0, cmd = null;
  const pt = (x, y) => [x * 0.1, 1248 - y * 0.1];
  while (i < tok.length) {
    if (/[A-Za-z]/.test(tok[i])) cmd = tok[i++];
    if (cmd === 'Z' || cmd === 'z') { if (cur) cur.push(['Z']); p = debut.slice(); cmd = null; continue; }
    const n = () => Number(tok[i++]);
    if (cmd === 'M' || cmd === 'm') {
      const x = n(), y = n();
      p = cmd === 'm' ? [p[0] + x, p[1] + y] : [x, y]; debut = p.slice();
      cur = [['M', p.slice()]]; sous.push(cur); cmd = cmd === 'm' ? 'l' : 'L';
    } else if (cmd === 'L' || cmd === 'l') {
      const x = n(), y = n(); p = cmd === 'l' ? [p[0] + x, p[1] + y] : [x, y]; cur.push(['L', p.slice()]);
    } else if (cmd === 'C' || cmd === 'c') {
      const a = [n(), n()], b = [n(), n()], c = [n(), n()];
      const r = cmd === 'c' ? q => [p[0] + q[0], p[1] + q[1]] : q => q;
      const A = r(a), B = r(b), C = r(c); cur.push(['C', A, B, C]); p = C;
    } else i++;
  }
  // les sous-chemins minuscules (un point de potrace) ne se dessinent pas
  const boite = sp => { const xs = [], ys = []; for (const c of sp) for (const q of c.slice(1)) { xs.push(q[0]); ys.push(q[1]); } return xs.length ? Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) : 0; };
  const garde = sous.filter(sp => boite(sp) > 600);
  // la souris, posée : (x, y) tombe sous les pattes ; largeur : de la croupe au museau, en unités de vue
  return function souris({ x, y, largeur = 60, angle = 0, miroir = false, trait = 1.4, oeil = true } = {}) {
    const k = largeur / 1440, ancre = [800, 960], R = angle * Math.PI / 180;
    const T = q => { const s = pt(...q); let u = (s[0] - ancre[0]) * k, v = (s[1] - ancre[1]) * k; if (miroir) u = -u; return [x + u * Math.cos(R) - v * Math.sin(R), y + u * Math.sin(R) + v * Math.cos(R)]; };
    const D = garde.map(sp => sp.map(c => c[0] + c.slice(1).map(q => { const t = T(q); return `${f1(t[0])} ${f1(t[1])}`; }).join(' ')).join(' ')).join(' ');
    let s = `<path d="${D}" fill="#FFFFFF" fill-rule="evenodd" stroke="#1A1A1A" stroke-width="${trait}" stroke-linejoin="round"/>`;
    if (oeil) { const e = T([13550, 7350]); s += `\n<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="${f1(Math.max(1.1, largeur * 0.02))}" fill="#1A1A1A" stroke="none"/>`; }
    return s;
  };
};
