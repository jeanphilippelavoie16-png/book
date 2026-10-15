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
def _racine_livre():
    # Windows (le PC de JP) : le dossier d'origine ; ailleurs (session dans le nuage) : le dépôt qui contient ce fichier
    if os.name == "nt":
        return r"C:\Users\jeanp\New folder"
    d = os.path.dirname(os.path.abspath(__file__))
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, "CLAUDE.md")):
        d = os.path.dirname(d)
    return d
ROOT = _racine_livre()
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
# Lieu, option A « le trait resserré » (JP, 15 octobre 2026) : trait de 2,2 à angles vifs, fenêtres, porte, tuyau et
# épinette en aplat ; la maison à deux étages, le chalet en trois billes à bouts ronds sous son toit, Les deux = les
# deux mêmes dessins côte à côte. Le dessin remplit sa boîte (viewBox 20, 32,8 et 56 × 24) : les proportions
# 0,833 / 1,367 / 2,333 sont reprises dans couleur.css, ancrage.css (--r) et assembler-tome.py (sommaire).
ICONES = {
    "maison": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 24'><path d='M1.1 11.2L10 1.7L18.9 11.2M3.3 9L3.3 22.9L16.7 22.9L16.7 9' fill='none' stroke='#000' stroke-width='2.2' stroke-linejoin='miter' stroke-miterlimit='6' stroke-linecap='butt'/><path d='M5.6 12.8L8.7 12.8L8.7 15.8L5.6 15.8ZM11.3 12.8L14.4 12.8L14.4 15.8L11.3 15.8ZM5.6 18L8.7 18L8.7 21L5.6 21ZM11.3 18L14.4 18L14.4 23L11.3 23Z' fill='#000'/></svg>",
    "chalet": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32.8 24'><path d='M1.1 15.2L19.9 15.2M1.1 19.05L19.9 19.05M1.1 22.9L19.9 22.9' fill='none' stroke='#000' stroke-width='2.2' stroke-linecap='round'/><path d='M2.2 14.4L10.5 6.1L18.8 14.4' fill='none' stroke='#000' stroke-width='2.2' stroke-linejoin='miter' stroke-miterlimit='6' stroke-linecap='butt'/><path d='M5 3.4L6.4 3.4L6.4 11L5 11ZM4.6 3L6.8 3L6.8 4.2L4.6 4.2ZM28.1 0.4L30 6L29.05 6L31.25 12L30 12L32.8 19.4L28.95 19.4L28.95 24L27.25 24L27.25 19.4L23.4 19.4L26.2 12L24.95 12L27.15 6L26.2 6Z' fill='#000'/></svg>",
    "deux": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 24'><path d='M24.3 15.2L43.1 15.2M24.3 19.05L43.1 19.05M24.3 22.9L43.1 22.9' fill='none' stroke='#000' stroke-width='2.2' stroke-linecap='round'/><path d='M1.1 11.2L10 1.7L18.9 11.2M3.3 9L3.3 22.9L16.7 22.9L16.7 9M25.4 14.4L33.7 6.1L42 14.4' fill='none' stroke='#000' stroke-width='2.2' stroke-linejoin='miter' stroke-miterlimit='6' stroke-linecap='butt'/><path d='M5.6 12.8L8.7 12.8L8.7 15.8L5.6 15.8ZM11.3 12.8L14.4 12.8L14.4 15.8L11.3 15.8ZM5.6 18L8.7 18L8.7 21L5.6 21ZM11.3 18L14.4 18L14.4 23L11.3 23ZM28.2 3.4L29.6 3.4L29.6 11L28.2 11ZM27.8 3L30 3L30 4.2L27.8 4.2ZM51.3 0.4L53.2 6L52.25 6L54.45 12L53.2 12L56 19.4L52.15 19.4L52.15 24L50.45 24L50.45 19.4L46.6 19.4L49.4 12L48.15 12L50.35 6L49.4 6Z' fill='#000'/></svg>",
    "minuteur": f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {S}><circle cx='12' cy='13.5' r='8'/><path d='M12 13.5V8.5M9.5 2.5h5M12 2.5v3M18.4 6.8l1.4-1.4'/></svg>",
    "thermo": f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {S}><path d='M10 14.6V4.5a2 2 0 0 1 4 0v10.1a4.2 4.2 0 1 1-4 0z'/><circle cx='12' cy='18.1' r='1.9' fill='#000'/><path d='M12 16V9M17 6h2M17 9h2M17 12h2'/></svg>",
    "danger": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 22'><path d='M12 1 23.5 21H.5z' fill='#000'/><path d='M10.7 7.5h2.6l-.5 7.5h-1.6z' fill='#fff'/><rect x='10.8' y='16.4' width='2.4' height='2.4' fill='#fff'/></svg>",
}

def _uri(s):
    return f'url("data:image/svg+xml,{urllib.parse.quote(s, safe=" =:/,.-")}")'

def _teinte(s, c):
    """Le SVG dans sa couleur d'impression : tout le noir (#000) devient c. Le blanc reste blanc : le « ! » du
    triangle de danger se voit (JP, 15 octobre 2026 ; sous l'ancien masque, le triangle sortait plein)."""
    return re.sub(r"#000(?![0-9A-Fa-f])", c, s)

def _jetons(texte, sel):
    m = re.search(re.escape(sel) + r"\{([^}]*)\}", texte)
    return dict(re.findall(r"(--[\w-]+):\s*([^;]+?)\s*(?:;|$)", m.group(1))) if m else {}

# Pictogrammes posés en image de fond, déjà teints (15 octobre 2026). Le masque CSS (mask-image teint par
# currentColor) sortait du PDF d'Edge en masques de transparence imbriqués : filet gris au bord des pictos,
# rectangle noir dans certains lecteurs. Une variante par couleur réellement imprimée, les couleurs lues dans les
# jetons du livre (interieur.tpl.html :root, couleur.css body.tN), jamais recopiées ici :
#   --i-NOM-k  noir --k (pieds de page, sommaire, pied du 00b)    --i-NOM-g  gris --k70 (bloc Lieu, case non cochée)
#   --i-NOM-w  blanc (bloc Lieu, case cochée)                      --i-NOM-ta / -tsq  couleur du tome (body.tN)
#   --i-danger-red  rouge --red
# --i-NOM (noir, sans suffixe) reste pour les études qui posent encore un masque.
LIEUX = ("maison", "chalet", "deux")
def icon_vars():
    base = ";".join(f"--i-{k}:{_uri(s)}" for k, s in ICONES.items())
    tpl = open(os.path.join(ENGINE, "interieur.tpl.html"), encoding="utf-8").read()
    rac = _jetons(tpl, ":root")
    fixes = {"k": rac["--k"], "g": rac["--k70"], "w": "#fff"}
    v = [f"--i-{k}-{suf}:{_uri(_teinte(ICONES[k], c))}" for k in LIEUX for suf, c in fixes.items()]
    rouge = _teinte(ICONES["danger"], rac["--red"])
    v.append(f"--i-danger-red:{_uri(rouge)}")
    # minuteur noir sur l'orange : bandeau de la série des premières minutes (chapitre.css), sommaire du tome
    v.append(f"--i-minuteur-k:{_uri(_teinte(ICONES['minuteur'], rac['--k']))}")
    css = "body{" + base + ";" + ";".join(v) + "}"
    coul = open(os.path.join(HERE, "couleur.css"), encoding="utf-8").read()
    for t in sorted(set(re.findall(r"body\.(t\d+)\{", coul))):
        j = _jetons(coul, f"body.{t}")
        tv = [f"--i-{k}-ta:{_uri(_teinte(ICONES[k], j['--ta']))}" for k in LIEUX]
        tv += [f"--i-{k}-tsq:{_uri(_teinte(ICONES[k], j['--tsq']))}" for k in ("minuteur", "thermo")]
        css += f"\nbody.{t}{{" + ";".join(tv) + "}"
    return css

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
