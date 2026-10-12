(function(){
  var Q = new URLSearchParams(location.search);
  function over(el){ return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1; }
  function wordStarts(root){
    var pts = [], tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = tw.nextNode())) { var re = /\S+/g, m; while ((m = re.exec(n.data))) pts.push({node:n, offset:m.index}); }
    return pts;
  }
  function cut(b, k, first){
    var c = b.cloneNode(true), p = wordStarts(c)[k], r = document.createRange();
    if (first) { r.setStart(p.node, p.offset); r.setEnd(c, c.childNodes.length); }
    else { r.setStart(c, 0); r.setEnd(p.node, p.offset); }
    r.deleteContents();
    c.classList.add(first ? 'split-a' : 'split-b');
    return c;
  }
  function trySplit(slot, b){
    var N = wordStarts(b).length, lo = 6, hi = N - 6, best = -1;
    if (hi < lo) return null;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1, a = cut(b, mid, true);
      slot.appendChild(a); var o = over(slot); slot.removeChild(a);
      if (!o) { best = mid; lo = mid + 1; } else hi = mid - 1;
    }
    if (best < 0) return null;
    if (N - best < 12) best = N - 12;   /* jamais une ligne seule en haut de colonne */
    if (best < 6) return null;
    var a1 = cut(b, best, true); slot.appendChild(a1);
    var h = a1.getBoundingClientRect().height; slot.removeChild(a1);
    if (h < 2 * 17) return null;  /* au moins deux lignes avant la coupure */
    return [a1, cut(b, best, false)];
  }
  function run(){
    var queues = {}, report = [];
    document.querySelectorAll('.src').forEach(function(s){ queues[s.dataset.flow] = Array.prototype.slice.call(s.children); });
    document.querySelectorAll('[data-slot]').forEach(function(slot){
      var q = queues[slot.dataset.slot]; if (!q) return;
      if (slot.dataset.take === 'all') { while (q.length) slot.appendChild(q.shift()); }
      else {
        while (q.length) {
          var b = q.shift(); slot.appendChild(b);
          if (!over(slot)) continue;
          slot.removeChild(b);
          if (!b.classList.contains('kwn')) { var s = trySplit(slot, b); if (s) { slot.appendChild(s[0]); q.unshift(s[1]); break; } }
          q.unshift(b); break;
        }
        while (slot.lastElementChild && slot.lastElementChild.classList.contains('kwn')) { var l = slot.lastElementChild; slot.removeChild(l); q.unshift(l); }
      }
      report.push(slot.closest('.page').id + ':' + slot.dataset.slot + ' reste=' + q.length + (over(slot) ? ' DEBORDE' : ''));
    });
    document.querySelectorAll('.frame').forEach(function(f){
      if (f.scrollHeight > f.clientHeight + 1) report.push('DEBORDE ' + f.closest('.page').id + ' +' + (f.scrollHeight - f.clientHeight) + 'px');
    });
    document.querySelectorAll('.page').forEach(function(p){
      var fr = p.querySelector('.frame'), rr = fr.getBoundingClientRect(), pr = p.getBoundingClientRect();
      report.push(p.id + ' frame top=' + ((rr.top-pr.top)/96).toFixed(3) + 'in h=' + (rr.height/96).toFixed(3) + 'in; kids=' + Array.prototype.map.call(fr.children, function(k){ return k.className.split(' ')[0] + ':' + (k.getBoundingClientRect().height/96).toFixed(2); }).join(','));
      var t = p.querySelector('.frame').innerText; report.push(p.id + ' mots=' + ((t.match(/\S+/g) || []).length));
    });
    document.body.setAttribute('data-report', report.join(' | '));
    var miss = ['Vollkorn','Vollkorn SC'].filter(function(f){ return !document.fonts.check('10pt "' + f + '"'); });
    if (miss.length) document.body.setAttribute('data-polices-manquantes', miss.join(','));
    if (Q.has('outline')) document.body.classList.add('dbgo');
    if (Q.has('debug')) { var dd = document.createElement('div'); dd.id = 'dbg'; dd.textContent = report.join(String.fromCharCode(10)); document.body.appendChild(dd); }
    if (Q.has('contact')) contact(); else if (Q.has('page')) single(Q.get('page'));
    document.body.setAttribute('data-done', '1');
  }
  function tv(id){
    var d = document.createElement('div');
    if (!id) { d.className = 'tv vide'; return d; }
    var p = document.getElementById(id);
    d.className = 'tv ' + (p.classList.contains('recto') ? 'recto' : 'verso');
    d.appendChild(p); return d;
  }
  function contact(){
    var rows = [[[null,'p67','67'],['p70','p71','70 – 71'],[null,'p5','5 · tome I']],[['p76','p77','76 – 77'],['p78','p79','78 – 79']]];
    var sheet = document.createElement('div'); sheet.className = 'sheet';
    sheet.style.zoom = Q.get('z') || '0.3';
    rows.forEach(function(r){
      var row = document.createElement('div'); row.className = 'row';
      r.forEach(function(s){
        var sp = document.createElement('div'); sp.className = 'spread';
        var pp = document.createElement('div'); pp.className = 'pp';
        pp.appendChild(tv(s[0])); pp.appendChild(tv(s[1]));
        var cap = document.createElement('div'); cap.className = 'cap'; cap.textContent = s[2];
        sp.appendChild(pp); sp.appendChild(cap); row.appendChild(sp);
      });
      sheet.appendChild(row);
    });
    document.body.classList.add('contact');
    document.body.insertBefore(sheet, document.body.firstChild);
  }
  function single(n){
    var t = tv('p' + n);
    document.querySelectorAll('body > .page, body > .src').forEach(function(e){ e.remove(); });
    document.body.classList.add('single');
    document.body.insertBefore(t, document.body.firstChild);
  }
  var loads = ['400 9.75pt Vollkorn','700 9.75pt Vollkorn','800 9.75pt Vollkorn','900 9.75pt Vollkorn','italic 400 9.75pt Vollkorn','italic 700 9.75pt Vollkorn',
               '600 9pt "Vollkorn SC"','700 9pt "Vollkorn SC"','900 9pt "Vollkorn SC"'].map(function(f){ return document.fonts.load(f, 'Aéàç'); });
  var done = false;
  function go(){ if (done) return; done = true; run(); }
  Promise.all(loads).then(function(){ return document.fonts.ready; }).then(function(){ setTimeout(go, 50); }, function(){ setTimeout(go, 50); });
  setTimeout(go, 12000);   /* filet : le texte est versé même si une police manque */
})();
