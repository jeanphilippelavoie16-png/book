# -*- coding: utf-8 -*-
"""Étude de couleur : monte un chapitre avec le moteur du livre (build_chapitre.py, non modifié)
et pose par-dessus le CSS d'une variante (couleur.css).

    python variante.py 10 --variante A|B|C [--tome N] [--pages ouverture,procedure,urgence]
    (numéros nouveaux, six tomes ; --tome force une couleur t1 … t6 pour comparer)

-> design/variantes-couleur/NN-V.html, puis V-1-ouverture.png, V-2-procedure.png, V-3-urgence.png
   (768 × 960, facteur 2, page rognée comme les épreuves). Les pages sont retrouvées par leur
   contenu (la couleur change la hauteur de l'ouverture, donc la pagination) : voir CIBLES.
   Le rapport du paginateur (avertissements, pages trouvées) s'imprime dans le terminal.
"""
import sys, os, re, json, time, glob, shutil, urllib.parse
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = r"C:\Users\jeanp\New folder"
ENGINE = os.path.join(ROOT, "design", "directions", "1-manuel-de-terrain", "outils")
sys.path.insert(0, ENGINE)
import build_chapitre as bc

OUT = os.path.join(ROOT, "design", "variantes-couleur")

# où trouver chaque page de l'étude : (sélecteur, texte contenu ou alt)
CIBLES = {   # numéros NOUVEAUX (six tomes) : le 10 est l'ancien 13
    "10": {"procedure": ("h3.sub", "ébullition"), "urgence": ("img", "Planche 10-01")},
}
# chiffres clés en exergue (variante C) : posés après le titre dont le texte commence par « apres ».
# Chiffres et mots repris du chapitre, section 5-E, étape 12.
EXERGUES = {
    "10": [{"apres": "E — Désinfecter", "html":
        '<div class="exergue"><div class="ex-h"><i class="pk"></i>Ébullition, à gros bouillons</div>'
        '<div class="ex-r"><div class="ex-n">1<small>MIN</small></div><div class="ex-l"><b>Puits</b>, avis d’ébullition au village</div></div>'
        '<div class="ex-r"><div class="ex-n">5<small>MIN</small></div><div class="ex-l"><b>Toute eau de surface</b> : castor, rat musqué, lièvre</div></div>'
        '<div class="ex-f">On compte quand la surface roule. Un frémissement ne compte pas.</div></div>'}],
}

# pictogrammes au trait (même main que les planches : trait noir, angles francs)
S = "fill='none' stroke='#000' stroke-width='1.8' stroke-linejoin='round' stroke-linecap='square'"
ICONES = {
    "maison": f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {S}><path d='M2.5 11.5 12 3.5l9.5 8M5 9.5V21h14V9.5M10 21v-5.5h4V21M15.8 6.6V4h2.4v4.6'/></svg>",
    "chalet": f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31 24' {S}><path d='M1.5 12.5 10 5l8.5 7.5M3.5 11v10h13V11M3.5 14.5h13M3.5 18h13M25 3l-4 7h2.5L20 16h10l-3.5-6H29zM25 16v5'/></svg>",
    "deux": f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 24' {S}><path d='M1 12.5 7.5 6.5l6.5 6M2.8 11v10h9.4V11M6.2 21v-4.5h2.6V21M17.5 12.5 25 6l7.5 6.5M19.3 11v10h11.4V11M19.3 14.5h11.4M19.3 18h11.4'/></svg>",
    "minuteur": f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {S}><circle cx='12' cy='13.5' r='8'/><path d='M12 13.5V8.5M9.5 2.5h5M12 2.5v3M18.4 6.8l1.4-1.4'/></svg>",
    "thermo": f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {S}><path d='M10 14.6V4.5a2 2 0 0 1 4 0v10.1a4.2 4.2 0 1 1-4 0z'/><circle cx='12' cy='18.1' r='1.9' fill='#000'/><path d='M12 16V9M17 6h2M17 9h2M17 12h2'/></svg>",
    "danger": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 22'><path d='M12 1 23.5 21H.5z' fill='#000'/><path d='M10.7 7.5h2.6l-.5 7.5h-1.6z' fill='#fff'/><rect x='10.8' y='16.4' width='2.4' height='2.4' fill='#fff'/></svg>",
}

def icon_vars():
    v = ";".join(f'--i-{k}:url("data:image/svg+xml,{urllib.parse.quote(s, safe=" =:/,.-")}")' for k, s in ICONES.items())
    return "body{" + v + "}"

DUR = re.compile(r"\d[\d\s\u202f,]*\s*(min|minute|heure|h\b|jour)", re.I)
def mark_steps(h):
    def one(m):
        body = m.group(1)
        strongs = " ".join(re.findall(r"<strong[^>]*>(.*?)</strong>", body))
        cls = ""
        if DUR.search(strongs): cls = " pk-t"
        elif "°C" in strongs or "°\u202fC" in strongs: cls = " pk-c"
        elif re.search(r"section 8\b|§8\b", body): cls = " pk-d"
        return f'<p class="step{cls}">{body}</p>'
    return re.sub(r'<p class="step">(.*?)</p>', one, h, flags=re.S)

RAPPORT = r"""<script>
(function(){
  if(!location.hash.startsWith('#rapport')) return;
  const CIB = JSON.parse(decodeURIComponent(location.hash.slice(9)) || '{}');
  const t = setInterval(() => {
    if(document.documentElement.dataset.ready !== '1') return; clearInterval(t);
    const out = [];
    const st = JSON.parse(document.getElementById('stats').textContent);
    out.push('pages=' + st.pages);
    Object.keys(CIB).forEach(k => {
      const [sel, txt] = CIB[k];
      const el = Array.from(document.querySelectorAll('.page ' + sel)).find(e => ((e.textContent || '') + ' ' + (e.alt || '')).toLowerCase().includes(txt.toLowerCase()));
      out.push(k + '=' + (el ? el.closest('.page').id : 'absent'));
    });
    const s9 = document.querySelector('.page h2.sec.s9'); out.push('s9=' + (s9 ? s9.closest('.page').id : 'absent'));
    st.warn.forEach(w => out.push('ATTENTION ' + w));
    document.body.innerHTML = '<pre style="font:11px monospace;white-space:pre-wrap">' + out.map(l => '@@' + l + '@@').join('\n') + '</pre>';
  }, 20);
})();
</script>
"""

def build(num, var, tome):
    # le moteur lit placements.json dans son dossier de sortie : on le lui prête le temps du montage
    src_pl = os.path.join(bc.OUTD, "placements.json")
    bc.OUTD = OUT
    tmp_pl = os.path.join(OUT, "placements.json")
    shutil.copy(src_pl, tmp_pl)
    try:
        dst = bc.build(num)
    finally:
        os.remove(tmp_pl)
    h = open(dst, encoding="utf-8").read()
    os.remove(dst)
    meta = json.loads(re.search(r'<script type="application/json" id="meta">(.*?)</script>', h, re.S).group(1))
    t = tome or bc.tome_de(num)   # plan/renumerotation.json (tomeDuNouveau), jamais le numéro
    lieu = {"Maison": "lieu-m", "Chalet": "lieu-c"}.get(meta["lieu"], "lieu-2")
    classes = {"A": "vA", "B": "vA vB", "C": "vA vB vC"}[var] + f" t{t} {lieu}"
    if len(re.sub(r"\D", "", num)) >= 3:   # onglet de tranche à 12 pt (couleur.css, .chn3)
        classes += " chn3"
    css = open(os.path.join(HERE, "couleur.css"), encoding="utf-8").read()
    chn = str(int(num)) if num.isdigit() else num
    css += "\n" + icon_vars() + "\nbody{--chnum:\"" + chn + "\"}\n"
    h = h.replace("</style>", css + "</style>", 1)
    h = h.replace('<body>\n<div id="book">', f'<body class="{classes}">\n<div id="book">', 1)
    if var in ("B", "C"):   # l'ouverture en aplat laisse le titre courir sur trois lignes à côté du chiffre
        h = h.replace("height > 2 * 1.0 * s * PT + 4", "height > 3 * 1.0 * s * PT + 4")
    if var == "C":
        h = mark_steps(h)
        for ex in EXERGUES.get(num, []):
            pat = r"[\s\u00a0\u202f]+".join(map(re.escape, ex["apres"].split()))
            m = re.search(r'(<h3 class="sub">' + pat + r'.*?</h3>)', h)
            if m:
                h = h[:m.end()] + "\n" + ex["html"] + h[m.end():]
            else:
                print("ATTENTION : exergue sans ancrage", ex["apres"])
    h = h.replace("</body>", RAPPORT + "</body>", 1)
    out = os.path.join(OUT, f"{num}-{var}" + (f"-t{tome}" if tome else "") + ".html")
    open(out, "w", encoding="utf-8").write(h)
    return out

def wait_file(p, proc, prof, t0, limit=150):
    while time.time() - t0 < limit:
        if os.path.exists(p) and os.path.getsize(p) > 0 and proc.poll() is not None:
            break
        time.sleep(0.4)
    time.sleep(0.4); shutil.rmtree(prof, ignore_errors=True)

def rapport(dst, cib):
    import pypdf
    pdf = os.path.join(bc.tempfile.gettempdir(), "rapport-variante.pdf")
    if os.path.exists(pdf): os.remove(pdf)
    frag = "#rapport=" + urllib.parse.quote(json.dumps(cib, ensure_ascii=False))
    p, prof = bc.edge(["--no-pdf-header-footer", f"--print-to-pdf={pdf}", bc.url(dst, frag)], pdf)
    wait_file(pdf, p, prof, time.time())
    txt = " ".join(pg.extract_text() for pg in pypdf.PdfReader(pdf).pages)
    return dict(l.split("=", 1) if "=" in l else (l, "") for l in re.findall(r"@@(.*?)@@", txt, re.S))

def shoot(dst, pid, png):
    if os.path.exists(png): os.remove(png)
    p, prof = bc.edge(["--force-device-scale-factor=2", "--window-size=768,960", f"--screenshot={png}", bc.url(dst, "#page=" + pid)], png)
    return p, prof

if __name__ == "__main__":
    a = sys.argv[1:]
    num = a[0]
    var = a[a.index("--variante") + 1].upper() if "--variante" in a else "A"
    tome = int(a[a.index("--tome") + 1]) if "--tome" in a else 0
    roles = (a[a.index("--pages") + 1] if "--pages" in a else "ouverture,procedure,urgence").split(",")
    dst = build(num, var, tome)
    print("html :", dst)
    cib = {k: v for k, v in CIBLES.get(num, {}).items() if k in roles}
    rep = rapport(dst, cib)
    for k, v in rep.items():
        print(" ", k, v)
    ids = {"ouverture": f"p{num}-1"}
    ids.update({k: rep.get(k) for k in cib})
    for extra in [r for r in roles if re.match(r"^p\d", r)]:   # page nommée directement, ex. p13-13
        ids[extra] = extra
    jobs = []
    for i, r in enumerate(roles, 1):
        pid = ids.get(r)
        if not pid or pid == "absent":
            print("ATTENTION : page introuvable pour", r); continue
        name = f"{var}-{i}-{r}.png" if not tome else f"{var}-tome{tome}-{r}.png"
        png = os.path.join(OUT, name)
        jobs.append((shoot(dst, pid, png), png, time.time()))
    for (p, prof), png, t0 in jobs:
        wait_file(png, p, prof, t0)
        print("png :", png, "<-", ids)
