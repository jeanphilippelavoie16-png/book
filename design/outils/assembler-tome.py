# -*- coding: utf-8 -*-
"""Assemble un tome entier en un PDF intérieur prêt pour Blurb (livre photo « 20 × 25 cm »,
Standard Portrait 8 × 10 po, téléversé par PDF to Book).

    python design/outils/assembler-tome.py 6
    python design/outils/assembler-tome.py 6 --chapitres 102,103      (essai sur quelques chapitres)

Options :
    --recto                un chapitre ouvre toujours à droite, avec une page blanche devant au besoin
                           (par défaut depuis le 18 octobre 2026 : un chapitre peut ouvrir à gauche)
    --couverture souple|imagewrap|jaquette   type de couverture pour la tranche (défaut : souple)
    --hors-ligne           ne pas interroger le calculateur de Blurb pour la tranche
    --sans-apercus         pas de PNG de contrôle
    --refaire              ignorer le travail déjà fait (cache de livre/tome-N/travail/)
    --placements FICHIER   placements supplémentaires, priorité sur tout le reste (pour un essai)
    --sortie DOSSIER       ailleurs que livre/tome-N/ (pour un essai qui ne doit pas écraser le tome)

Sorties : livre/tome-N/interieur.pdf, livre/tome-N/rapport.md, livre/tome-N/apercus/*.png.
Crédits des images : HORS DU LIVRE (JP, 28 septembre 2026 : « enlève les pages crédit photo, garde les
backup quelque part mais pas dans le livre »). Aucune page de crédits dans interieur.pdf ni au sommaire ;
la copie du tome va dans livre/credits/tome-N-credits.md et .pdf (avec --sortie : SORTIE/credits/).
Travail : livre/tome-N/travail/ — HTML, PDF et rapport de chaque chapitre, gardés d'un appel à
l'autre (cache.json) : une coupure ne coûte que le chapitre en cours.

Chaque chapitre est monté par le moteur existant : variante.py (variante C, couleur.css) sur
build_chapitre.py (interieur.tpl.html, chapitre.css, chapitre.js). L'assembleur lui demande de poser aussi
les planches de images/a-valider/ (build_chapitre.DOSSIERS_PLANCHES : JP les relit dans les pages,
28 septembre 2026), puis travaille sur sa copie du HTML produit et y ajoute :
  - le numéro de page continu du tome, en pied, dans la marge extérieure (lu dans l'URL :
    ?off=K ; page du tome = K + page du chapitre) ; rien sur les ouvertures ; pour un chapitre dont
    les pages ne sortent pas de chapitre.js (le 00 d'ancrage.py), un script de secours le pose ;
  - le côté de la première page (?par=0 : recto ; ?par=1 : verso), pour --verso ; un chapitre à
    pages fixes ouvre toujours au recto ;
  - un rapport (#tome-rapport) : pages, avertissements du paginateur, figures posées (un logigramme en double page,
    clé « logigramme » des placements, compte comme une figure « double page » ; l'assembleur vérifie qu'il commence
    sur une page de gauche, ce que chapitre.js garantit), sections, et les pages de la
    série des premières minutes (encadré orange, marqueur {.orange} : CLAUDE.md), qui donnent la colonne orange du
    sommaire, la section « Premières minutes » du rapport et l'aperçu 05.
L'onglet de tranche à 12 pt des chapitres à trois chiffres est dans couleur.css depuis le 28 septembre 2026
(variante.py pose .chn3). Le folio de chapitre « 102-7 » du design reste tel quel.

Ordre des pages : page de titre (recto), blanche, sommaire, puis les chapitres, chacun ouvert au recto. Tome 1 :
le chapitre 00 vient avant tout, en page 1, avant la page de titre et le sommaire (il se trouve sans
chercher) ; le sommaire le mentionne quand même.

Placements : design/epreuves-livre/placements.json, puis placements-tome-N.json s'il existe (priorité,
élément par élément : planche par « id », photo par « fichier »), puis --placements. Une planche marquée
« poser »: false n'est pas posée, même à valider (34-01).

Exigences de Blurb : sources/blurb-specifications.md (page 8,125 × 10,25 po avec fond perdu en tête,
en pied et au bord extérieur ; nombre de pages pair, 20 à 440 en papier Standard ; polices incorporées).
"""
import sys, os, re, io, json, glob, time, shutil, html, base64, hashlib, contextlib, urllib.parse

def _racine_livre():
    # Windows (le PC de JP) : le dossier d'origine ; ailleurs (session dans le nuage) : le dépôt qui contient ce fichier
    if os.name == "nt":
        return r"C:\Users\jeanp\New folder"
    d = os.path.dirname(os.path.abspath(__file__))
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, "CLAUDE.md")):
        d = os.path.dirname(d)
    return d
ROOT = _racine_livre()
VAR_TOOLS = os.path.join(ROOT, "design", "variantes-couleur", "outils")
sys.path.insert(0, VAR_TOOLS)
import variante as v          # noqa: E402  (variante C : couleur.css, pictogrammes, étapes marquées)
bc = v.bc                     # build_chapitre.py : moteur, table des tomes, Edge

import pypdf                                   # noqa: E402
from pypdf.generic import RectangleObject      # noqa: E402

# ------------------------------------------------------------------ Blurb (sources/blurb-specifications.md)
PT = 72
PAGE_W, PAGE_H = 585, 738          # 8,125 × 10,25 po : « Final, exported PDF should measure »
TRIM_W, TRIM_H = 576, 720          # 8,0 × 10,0 po
BLEED = 9                          # 0,125 po, en tête, en pied et au bord extérieur seulement
SAFE_OUT = 18                      # 0,25 po : tête, pied, bord extérieur
SAFE_BIND = 36                     # 0,5 po au petit fond (tableau du calculateur ; son texte dit 0,625)
PAGES_MIN, PAGES_MAX, MULTIPLE = 20, 440, 2   # papier Standard ; « Even number of pages »
CALC_URL = "https://www.blurb.com/make/pdf_to_book/booksize_calculator"
COUVERTURES = {"souple": "softcover", "imagewrap": "lithowrap", "jaquette": "hardcover"}

EPR = os.path.join(ROOT, "design", "epreuves-livre")

def aff(n):
    """Numéro de chapitre tel qu'il s'imprime : « 7 » pour « 07 », mais « 00 » et « 00b » tels quels."""
    return str(int(n)) if n.isdigit() and int(n) > 0 else n

def natkey(n):
    m = re.match(r"(\d+)(.*)", n)
    return (int(m.group(1)), m.group(2)) if m else (9999, n)

def chapitres_du_tome(t):
    return sorted([n for n, tt in bc.TOME_DU.items() if tt == t], key=natkey)

def sha(s):
    return hashlib.sha1(s.encode("utf-8") if isinstance(s, str) else s).hexdigest()[:16]

def log(*a):
    print(*a, flush=True)

# ------------------------------------------------------------------ placements
def fusion_liste(a, b, cle):
    out = list(a or [])
    for it in b or []:
        k = it.get(cle)
        idx = next((i for i, x in enumerate(out) if k is not None and x.get(cle) == k), None)
        if idx is None:
            out.append(it)
        else:
            out[idx] = it
    return out

def placements(tome, extra=None):
    base = json.load(open(os.path.join(EPR, "placements.json"), encoding="utf-8"))
    sources = ["design/epreuves-livre/placements.json"]
    for f in [os.path.join(EPR, f"placements-tome-{tome}.json"), extra]:
        if not f or not os.path.exists(f):
            continue
        sources.append(os.path.relpath(f, ROOT).replace("\\", "/"))
        over = json.load(open(f, encoding="utf-8"))
        for ch, val in over.items():
            if ch.startswith("_") or not isinstance(val, dict):
                continue
            cur = dict(base.get(ch, {}))
            for k, x in val.items():
                if k == "planches":
                    cur[k] = fusion_liste(cur.get(k), x, "id")
                elif k == "photos":
                    cur[k] = fusion_liste(cur.get(k), x, "fichier")
                else:
                    cur[k] = x
            base[ch] = cur
    return base, sources

# ------------------------------------------------------------------ ce que l'assembleur ajoute au HTML d'un chapitre
TOME_JS = ("<script>var TOME=(function(){var q=new URLSearchParams(location.search);"
           "return {off:q.has('off')?+q.get('off'):null,par:+(q.get('par')||0)};})();</script>\n")
SIDE_OLD = "const n = PAGES.length + 1, side = n % 2 ? 'recto' : 'verso';"
SIDE_NEW = "const n = PAGES.length + 1, side = (n + TOME.par) % 2 ? 'recto' : 'verso';"
FIN_OLD = "function finishPages(){"
FIN_NEW = ("function finishPages(){\n  if(TOME.off !== null) PAGES.forEach(p => { if(p.kind === 'open') return;"
           " const f = document.createElement('div'); f.className = 'fcont'; f.textContent = TOME.off + p.n; p.el.appendChild(f); });")
# numéro de page du tome : en pied, à la hauteur de l'échelle des sections, dans la marge extérieure,
# entre le bloc (0,5 po du rognage) et la limite sûre de Blurb (0,25 po du rognage)
FCONT_CSS = """
/* assembler-tome.py : numéro de page continu du tome */
.fcont{position:absolute;top:9.52in;height:0.2in;width:0.2in;display:flex;align-items:center;
  font:600 8pt/1 var(--sans);letter-spacing:.01em;color:var(--k70);white-space:nowrap;font-variant-numeric:lining-nums tabular-nums}
.recto .fcont{left:7.565in;justify-content:flex-start}
.verso .fcont{left:0.36in;justify-content:flex-end}
"""
FOLIO_SECOURS_JS = r"""<script>
(function(){
  if(TOME.off === null) return;
  const t = setInterval(() => {
    if(document.documentElement.dataset.ready !== '1') return; clearInterval(t);
    document.querySelectorAll('.page').forEach(p => { if(!p.querySelector('.rh') || p.querySelector('.fcont')) return;
      const f = document.createElement('div'); f.className = 'fcont'; f.textContent = TOME.off + +p.id.slice(p.id.lastIndexOf('-') + 1); p.appendChild(f); });
  }, 20);
})();
</script>
"""
RAPPORT_JS = r"""<script>
(function(){
  if(location.hash !== '#tome-rapport') return;
  const t = setInterval(() => {
    if(document.documentElement.dataset.ready !== '1') return; clearInterval(t);
    const st = JSON.parse(document.getElementById('stats').textContent);
    const num = el => { const p = el.closest('.page'); return p ? +p.id.slice(p.id.lastIndexOf('-') + 1) : null; };
    const out = {pages: st.pages || document.querySelectorAll('#book > .page').length, warn: st.warn || [], mots: st.mots || {}, figs: [], secs: {}, cotes: ''};
    document.querySelectorAll('#book > .page').forEach(p => out.cotes += p.classList.contains('recto') ? 'r' : 'v');
    document.querySelectorAll('.page img.planche').forEach(i => out.figs.push({id: (i.alt || '').replace(/^Planche\s*/, ''), page: num(i), taille: 'pleine', src: i.getAttribute('src')}));
    document.querySelectorAll('.page figure.fig.pl').forEach(f => { const i = f.querySelector('img'); out.figs.push({id: f.dataset.id, page: num(f), taille: 'demi', src: i ? i.getAttribute('src') : ''}); });
    // logigramme en double page : sa première page seulement (la seconde suit)
    document.querySelectorAll('.page.spread.verso, .page.spread.recto').forEach(pg => { if(pg.previousElementSibling && pg.previousElementSibling.classList.contains('spread')) return;
      out.figs.push({id: pg.dataset.spread, page: +pg.id.slice(pg.id.lastIndexOf('-') + 1), taille: 'double', src: '', cote: pg.classList.contains('verso') ? 'v' : 'r'}); });
    document.querySelectorAll('.page figure.fig.ph img').forEach(i => { const r = i.getBoundingClientRect();
      out.figs.push({id: 'photo', src: i.getAttribute('src'), page: num(i), taille: i.closest('figure').classList.contains('demi') ? 'demi' : 'quart',
                     w: r.width / 96, h: r.height / 96, nw: i.naturalWidth, nh: i.naturalHeight}); });
    document.querySelectorAll('.page h2.sec[data-n]').forEach(h => { const n = h.dataset.n; if(!(n in out.secs)) out.secs[n] = num(h); });
    // la Danger et la variante d'urgence par leur classe : leur numéro passe de 8 et 9 à 7 et 8 (gabarit à huit sections)
    const hd = document.querySelector('.page h2.sec.s8'), hv = document.querySelector('.page h2.sec.s9');
    if(hd) out.secs.d = num(hd); if(hv) out.secs.v = num(hv);
    // la série des premières minutes (encadré orange) : ses pages, dans le chapitre
    out.orange = Array.from(new Set(Array.from(document.querySelectorAll('.page .orange')).map(num)));
    const b = btoa(unescape(encodeURIComponent(JSON.stringify(out))));
    document.body.className = '';
    document.body.innerHTML = '<pre style="font:9px/1.25 \'Courier New\',monospace;white-space:pre-wrap;word-break:break-all;margin:0.4in">@@' + b + '@@</pre>';
  }, 20);
})();
</script>
"""

def patch_html(h, num):
    notes = []
    # côté de la première page : seulement si les pages sont créées par chapitre.js ; sinon (pages fixes,
    # comme le 00 d'ancrage.py), le chapitre ouvre toujours au recto
    if h.count(SIDE_OLD) == 1:
        h = h.replace(SIDE_OLD, SIDE_NEW, 1)
    else:
        notes.append("recto")
    # numéro continu : à la finition des pages de chapitre.js ; sinon, par le script de secours qui attend
    # la fin de la mise en pages et le pose sur chaque page qui a un titre courant
    if h.count(FIN_OLD) == 1:
        h = h.replace(FIN_OLD, FIN_NEW, 1)
    else:
        notes.append("folio-secours")
        h = h.replace("</body>", FOLIO_SECOURS_JS + "</body>", 1)
    if 'id="book"' not in h or "dataset.ready = '1'" not in h:
        sys.exit("le HTML du chapitre n'a ni #book ni le signal de fin de mise en pages : l'assembleur est à revoir")
    h = h.replace("</style>", FCONT_CSS + "</style>", 1)
    h = h.replace('<div id="book"', TOME_JS + '<div id="book"', 1)
    h = h.replace("</body>", RAPPORT_JS + "</body>", 1)
    return h, notes

def monter_chapitre(num, work):
    """Monte le chapitre avec le moteur (variante C) dans travail/html/NN-C.html, sans toucher aux
    dossiers du design. Rend (chemin, html patché, messages du constructeur, meta)."""
    src, htm = os.path.join(work, "src"), os.path.join(work, "html")
    saved = (bc.OUTD, v.OUT, bc.REL_ROOT)
    bc.OUTD, v.OUT = src, htm
    bc.REL_ROOT = os.path.relpath(ROOT, htm).replace("\\", "/") + "/"
    del bc.WARN[:]
    bc.DOSSIERS_PLANCHES = ["validees", "a-valider"]      # JP relit les planches à valider dans les pages
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            dst = v.build(num, "C", 0)
    finally:
        bc.OUTD, v.OUT, bc.REL_ROOT = saved
    h, notes = patch_html(open(dst, encoding="utf-8").read(), num)
    open(dst, "w", encoding="utf-8").write(h)
    m = re.search(r'<script type="application/json" id="meta">(.*?)</script>', h, re.S)
    meta = json.loads(m.group(1)) if m else {}
    meta.setdefault("title", num); meta.setdefault("lieu", "Les deux")
    return dst, h, buf.getvalue(), meta, notes

# ------------------------------------------------------------------ Edge
def url(p, query="", frag=""):
    return "file:///" + p.replace("\\", "/").replace(" ", "%20") + (("?" + query) if query else "") + frag

def edge_lot(jobs, par=4, limite=300):
    """jobs : [(arguments Edge, fichier cible)]. Lance par lots, attend chaque fichier écrit et stable."""
    attente, en_cours = list(jobs), []
    while attente or en_cours:
        while attente and len(en_cours) < par:
            args, cible = attente.pop(0)
            if os.path.exists(cible):
                os.remove(cible)
            p, prof = bc.edge(args, cible)
            en_cours.append([p, prof, cible, time.time(), -1])
        time.sleep(0.6)
        for r in en_cours[:]:
            p, prof, cible, t0, avant = r
            taille = os.path.getsize(cible) if os.path.exists(cible) else 0
            fini = p.poll() is not None and taille > 0 and taille == avant
            r[4] = taille
            if fini or time.time() - t0 > limite:
                if p.poll() is None:
                    p.kill()
                time.sleep(0.3)
                shutil.rmtree(prof, ignore_errors=True)
                en_cours.remove(r)
                if not fini:
                    log("  ATTENTION : Edge n'a rien écrit à temps pour", os.path.basename(cible))

def pdf_args(page_url, cible):
    return ["--no-pdf-header-footer", "--print-to-pdf-no-header", f"--print-to-pdf={cible}", page_url]

def png_args(page_url, cible):
    return ["--force-device-scale-factor=2", "--window-size=768,960", f"--screenshot={cible}", page_url]

def lire_rapport(pdf):
    txt = "".join((pg.extract_text() or "") for pg in pypdf.PdfReader(pdf).pages)
    m = re.search(r"@@(.*?)@@", txt, re.S)
    if not m:
        return None
    try:
        return json.loads(base64.b64decode(re.sub(r"\s+", "", m.group(1))).decode("utf-8"))
    except Exception:
        return None

# ------------------------------------------------------------------ crédits (images/credits.md, registres)
def cellules(l):
    return [c.strip() for c in l.strip().strip("|").split("|")]

def registre_credits():
    """nom de fichier -> {auteur, licence, lien, sujet, origine}. credits.md d'abord (il a le lien),
    puis les fiches et les tableaux des registres images/photos/registre-*.md."""
    out = {}
    cm = os.path.join(ROOT, "images", "credits.md")
    for l in open(cm, encoding="utf-8"):
        if not l.startswith("|"):
            continue
        c = cellules(l)
        if len(c) < 8:
            continue
        for f in re.findall(r"`([^`]+\.(?:jpe?g|png|tiff?|webp))`", c[7], re.I):
            b = os.path.basename(f)
            out.setdefault(b, dict(auteur=c[4], licence=c[5], lien=c[6], sujet=c[3], origine="images/credits.md"))
    for reg in sorted(glob.glob(os.path.join(ROOT, "images", "photos", "registre-*.md"))):
        nom_reg = "images/photos/" + os.path.basename(reg)
        txt = open(reg, encoding="utf-8").read()
        # fiches : ### `fichier` puis **Auteur :**, **Licence vérifiée :**, **Page :**
        for m in re.finditer(r"^###\s+`([^`]+)`\s*$(.*?)(?=^###\s|^##\s|\Z)", txt, re.M | re.S):
            b, corps = os.path.basename(m.group(1)), m.group(2)
            def champ(*noms):
                for n in noms:
                    mm = re.search(r"\*\*" + n + r"\s*:\*\*\s*(.+)", corps)
                    if mm:
                        return mm.group(1).strip()
                return ""
            d = dict(auteur=champ("Auteur"), licence=champ("Licence vérifiée", "Licence"),
                     lien=champ("Page", "Page source", "Source"), sujet=champ("Image visée"), origine=nom_reg)
            d["lien"] = (re.findall(r"https?://\S+", d["lien"]) or [""])[0]
            if b not in out:
                out[b] = d
            else:
                for k in ("auteur", "licence", "lien"):
                    if not out[b].get(k):
                        out[b][k] = d[k]
        # tableaux : | Fichier | … | Auteur | Licence … | Page … |
        lignes = txt.splitlines()
        for i, l in enumerate(lignes):
            if not re.match(r"^\|\s*Fichier", l):
                continue
            tete = [x.lower() for x in cellules(l)]
            def col(*noms):
                return next((j for j, x in enumerate(tete) if any(x.startswith(n) for n in noms)), None)
            ja, jl, jp = col("auteur"), col("licence"), col("page", "lien")
            for l2 in lignes[i + 2:]:
                if not l2.startswith("|"):
                    break
                c = cellules(l2)
                for f in re.findall(r"`?([\w.\-]+\.(?:jpe?g|png|tiff?|webp))`?", c[0], re.I):
                    b = os.path.basename(f)
                    d = dict(auteur=c[ja] if ja is not None and ja < len(c) else "",
                             licence=c[jl] if jl is not None and jl < len(c) else "",
                             lien=(re.findall(r"https?://\S+?(?=\)|\s|$)", c[jp]) or [""])[0] if jp is not None and jp < len(c) else "",
                             sujet="", origine=nom_reg)
                    if b not in out:
                        out[b] = d
                    else:
                        for k in ("auteur", "licence", "lien"):
                            if not out[b].get(k):
                                out[b][k] = d[k]
    return out

def demandes_a_acquerir(ancien):
    """Lignes de credits.md encore « à acquérir » pour l'ancien numéro du chapitre."""
    n = 0
    for l in open(os.path.join(ROOT, "images", "credits.md"), encoding="utf-8"):
        if l.startswith("|"):
            c = cellules(l)
            if len(c) >= 8 and c[0] == ancien and "acquérir" in c[7]:
                n += 1
    return n

# ------------------------------------------------------------------ figures attendues
def planches_mentionnees(num):
    md = open(glob.glob(os.path.join(ROOT, "chapitres", f"{num}-*.md"))[0], encoding="utf-8").read()
    ids = set()
    for m in re.finditer(r"[Pp]lanches?\s+((?:\d+[a-z]?-\d+[a-z]?(?:\s*(?:,|et|à|ou)\s*)?)+)", md):
        ids.update(re.findall(r"\d+[a-z]?-\d+[a-z]?", m.group(1)))
    return sorted(i for i in ids if i.split("-")[0] == num)

def planches_validees(num):
    return sorted(re.match(rf"planche-({re.escape(num)}-\d+[a-z]?)", os.path.basename(p)).group(1)
                  for p in glob.glob(os.path.join(ROOT, "images", "validees", f"planche-{num}-*.png")))

def planches_a_valider(num):
    return sorted(re.match(rf"planche-({re.escape(num)}-\d+[a-z]?)", os.path.basename(p)).group(1)
                  for p in glob.glob(os.path.join(ROOT, "images", "a-valider", f"planche-{num}-*.png")))

# ------------------------------------------------------------------ calculateur de Blurb
def tranche_blurb(pages, couverture):
    """Interroge le calculateur de Blurb pour ce nombre de pages. Rend {page, couverture, tranche, …}
    tel qu'affiché (pouces), ou None si le site ne répond pas."""
    import urllib.request, http.cookiejar
    ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"
    for essai in range(3):
        try:
            op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
            op.addheaders = [("User-Agent", ua)]
            h = op.open(CALC_URL, timeout=60).read().decode("utf-8", "replace")
            tok = re.search(r'name="authenticity_token" type="hidden" value="([^"]*)"', h).group(1)
            data = urllib.parse.urlencode({"authenticity_token": tok, "book_type": "standard_portrait_true8x10",
                                           "cover_type": COUVERTURES[couverture], "page_count": str(pages),
                                           "paper_type_standard": "standard", "paper_type": "standard",
                                           "unit_measurement": "inches", "commit": "Get Measurements"}).encode()
            req = urllib.request.Request(CALC_URL, data=data, headers={"Referer": CALC_URL})
            r = op.open(req, timeout=60).read().decode("utf-8", "replace")
            paires = re.findall(r"<td>(.*?)</td>\s*<td class='unit-column'>(.*?)</td>", r, re.S)
            paires = [(re.sub(r"<[^>]+>", "", a).strip(), b.strip()) for a, b in paires]
            if len(paires) < 8:
                raise ValueError("réponse sans tableau")
            return dict(pages=pages, couverture=couverture, lignes=paires,
                        date=time.strftime("%Y-%m-%d %H:%M"))
        except Exception as e:
            err = e
            time.sleep(4)
    log("  calculateur de Blurb injoignable :", err)
    return None

# ------------------------------------------------------------------ pages hors chapitres (titre, sommaire, crédits)
ANNEXE_CSS = """
/* assembler-tome.py : page de titre, sommaire, crédits */
.tp-aplat{position:absolute;inset:0;background:repeating-linear-gradient(135deg,var(--tx) 0 1.1px,transparent 1.1px 5px),var(--tf)}
.tp .block{justify-content:flex-start}
.tp-head{position:relative;display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:6pt;border-bottom:3pt solid var(--tfi);
  color:var(--tfi);font:700 12pt/1 var(--sans);letter-spacing:.16em;text-transform:uppercase}
.tp-head span:last-child{font-weight:600;font-size:10pt;letter-spacing:.14em}
.tp-title{position:relative;margin:0.32in 0 0;width:4.3in;color:var(--tfi);font:700 58pt/1.02 var(--sans);text-transform:uppercase;letter-spacing:.005em;hyphens:manual}
.tp-num{position:absolute;right:-0.05in;top:0.95in;color:var(--tfn);font:700 250pt/0.72 var(--sans);letter-spacing:-.03em}
.tp-chap{position:absolute;left:0;right:0;top:3.7in;display:flex;justify-content:space-between;align-items:baseline;
  padding-top:7pt;border-top:0.75pt solid var(--tfi);color:var(--tfi);font:600 10pt/1.2 var(--sans);letter-spacing:.06em;text-transform:uppercase}
.tp-chap b{font-weight:700}
/* la frise du tome (point 30) : posée sur la page, au bas, à fond perdu d'un bord à l'autre */
.tp-frise{position:absolute;left:0;right:0;bottom:0;width:100%;height:auto;display:block}
.tp-serie{position:absolute;left:0;right:0;top:4.1in;display:flex;gap:4pt}
.tp-serie div{display:flex;flex-direction:column;gap:4pt;min-width:0}
.tp-serie i{display:block;height:0.26in;border:1.1pt solid var(--tfi);color:var(--tfi);font:700 11pt/0.24in var(--sans);font-style:normal;padding-left:5pt}
.tp-serie div.on i{background:var(--tfn);border-color:var(--tfn);color:#fff}
.tp-serie small{font:600 7pt/1.2 var(--sans);letter-spacing:.03em;text-transform:uppercase;color:var(--tfi);overflow-wrap:normal;hyphens:none}
.tp-serie div.on small{font-weight:700}

.ax-top{display:flex;justify-content:space-between;padding-bottom:5pt;border-bottom:0.75pt solid var(--ta);
  font:600 8pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase}
.ax h1{margin:14pt 0 10pt;padding-bottom:9pt;border-bottom:5pt solid var(--ta);font:700 40pt/0.95 var(--sans);text-transform:uppercase;letter-spacing:.01em}
.ax-note{margin:0 0 12pt;text-indent:0;font:500 9.2pt/12.4pt var(--sans)}
.ax-note b{font-weight:700}
table.som{font:500 10.5pt/13pt var(--sans);margin-top:4pt}
table.som td{padding-top:var(--rp,7pt);padding-bottom:var(--rp,7pt);vertical-align:middle}
/* sommaire serré (tomes de 20 à 22 chapitres) : la hauteur d'un rang, c'est surtout le carré du numéro */
table.som.serre td.ti{font-size:11pt;line-height:12pt}
table.som.serre td.no span{height:16pt;min-width:22pt;font-size:11pt;line-height:16pt}
table.som.serre td.pg{font-size:11.5pt}
table.som.serre2 td.ti{font-size:10.5pt;line-height:11.5pt}
table.som.serre2 td.no span{height:14pt;min-width:20pt;font-size:10pt;line-height:14pt}
table.som.serre2 td.pg{font-size:10.5pt}
table.som.serre2 td.s8,table.som.serre2 td.s9{font-size:9pt}
table.som td.no{width:0.62in}
table.som td.no span{display:inline-block;min-width:25pt;padding:0 3pt;height:21pt;background:var(--tsq);color:#fff;text-align:center;font:700 13pt/21pt var(--sans)}
table.som td.ti{font-weight:700;font-size:12pt}
table.som td.li{white-space:nowrap;color:var(--k70);font-size:8.6pt;letter-spacing:.06em;text-transform:uppercase}
/* pictogramme de lieu (option A, 15 octobre 2026) : 13 px (9,75 pt), image de fond déjà en noir --k (variante.py,
   icon_vars ; pas de masque : le PDF d'Edge en faisait un masque de transparence à filet gris). Tailles en px entiers :
   Edge cale l'image de fond sur le pixel CSS à l'impression, une taille fractionnaire donne des pictos de 12 ou 13 px
   d'une ligne à l'autre. La boîte a la largeur du dessin ; la marge complète jusqu'à la largeur de « Les deux »
   (30 px) pour que les mots restent alignés */
table.som td.li i{display:inline-block;width:30px;height:13px;margin-right:4pt;vertical-align:-2px;background:center/100% 100% no-repeat}
table.som td.li i.m{width:11px;margin-right:calc(4pt + 19px);background-image:var(--i-maison-k)}
table.som td.li i.c{width:18px;margin-right:calc(4pt + 12px);background-image:var(--i-chalet-k)}
table.som td.li i.d{background-image:var(--i-deux-k)}
table.som td.pg{text-align:right;font:700 13pt/1 var(--sans);width:0.55in}
table.som td.s8,table.som td.s9{text-align:right;width:0.95in;font:600 10pt/1 var(--sans)}
table.som th{white-space:nowrap}
table.som th.r{text-align:right}
table.som th .sq{display:inline-block;width:11pt;height:11pt;margin-right:3pt;background:var(--k);color:#fff;text-align:center;font:700 7.5pt/11pt var(--sans);letter-spacing:0}
table.som th .sq.d{background:var(--red)}
table.som th.s9 .sq{background:var(--t9)}
/* premières minutes (15 octobre 2026) : la page où commence la série orange, en pastille pleine, chiffre noir ;
   colonne posée seulement si un chapitre du tome a sa série. Pictogramme noir en image de fond (pas de masque),
   boîte en px entiers */
table.som.or td.s8,table.som.or td.s9{width:0.8in}
table.som td.sor{text-align:right;width:0.82in}
table.som td.sor span{display:inline-block;min-width:26pt;padding:0 4pt;background:var(--or);color:#000;text-align:center;font:700 11.5pt/17pt var(--sans)}
table.som th.sor{line-height:1.05}
table.som th .sq.o{width:15px;height:15px;vertical-align:-3px;background-color:var(--or);background-image:var(--i-minuteur-k);
  background-position:center;background-size:11px 11px;background-repeat:no-repeat}
table.som.serre td.sor span{font-size:10.5pt;line-height:15pt}
table.som.serre2 td.sor span{font-size:9.5pt;line-height:13pt;min-width:22pt}
table.som tr.cr td{border-top:1.5pt solid var(--ta)}
table.som tr.cr td.ti{font-weight:600;font-size:10.5pt}
table.cred{font-size:8pt;line-height:10.4pt}
table.cred td{padding-top:4pt;padding-bottom:4pt}
table.cred td.pg{font:700 9pt/10.4pt var(--sans);white-space:nowrap}
table.cred td.ln{font:500 7.2pt/9.4pt var(--sans);word-break:break-all;color:var(--k70)}
.page.ax::after,.page.tp::after{content:none;display:none}
.dd .block{justify-content:flex-start}
.dd-txt{margin:2.6in 0 0;text-align:center;text-indent:0;font:italic 400 21pt/1.45 var(--serif);color:var(--k)}
.dd-2{font-size:15pt}
.ax-vide{margin-top:18pt;padding:10pt 12pt;background:var(--tp);border-left:3pt solid var(--ta);font:500 10pt/13.5pt var(--sans)}
"""

ANNEXE_JS = r"""<script>
(function(){
  // sommaire : l'interligne se resserre tant que le tableau dépasse le bloc (8,5 po), puis le carré du numéro
  // et le titre rapetissent (serre, serre2)
  const fit = () => {
    const pg = document.getElementById('a-sommaire'); if(!pg) return;
    const bl = pg.querySelector('.block'), t = pg.querySelector('table.som');
    const over = () => t.getBoundingClientRect().bottom > bl.getBoundingClientRect().bottom + 0.5;
    for(const rp of [7, 6, 5, 4.5, 4, 3.5, 3]){ t.style.setProperty('--rp', rp + 'pt'); if(!over()) return; }
    t.classList.add('serre');
    for(const rp of [5, 4.5, 4, 3.5, 3, 2.5, 2]){ t.style.setProperty('--rp', rp + 'pt'); if(!over()) return; }
    t.classList.add('serre2');
    for(const rp of [3, 2.5, 2, 1.5, 1]){ t.style.setProperty('--rp', rp + 'pt'); if(!over()) return; }
  };
  const faces = ['700 12pt "IBM Plex Sans Condensed"', '600 10pt "IBM Plex Sans Condensed"', '500 10pt "IBM Plex Sans Condensed"',
                 '700 58pt "IBM Plex Sans Condensed"', '500 9pt "IBM Plex Serif"'];
  Promise.all(faces.map(f => document.fonts.load(f))).then(() => document.fonts.ready).then(() => {
    fit(); document.documentElement.dataset.ready = '1';
  });
  const h = location.hash;
  if(h.startsWith('#page=')){
    document.body.classList.add('single');
    const pg = document.getElementById(h.slice(6));
    document.querySelectorAll('.page').forEach(p => { if(p !== pg) p.style.display = 'none'; });
    if(pg){ const c = document.createElement('div'); c.className = 'trim ' + (pg.classList.contains('recto') ? 'r' : 'v'); c.appendChild(pg); document.body.insertBefore(c, document.body.firstChild); }
  }
})();
</script>
"""

def e(s):
    return html.escape(str(s), quote=True)

def il(s):
    return bc.il(s)

def pied(page_no, cote):
    return f'<div class="fcont">{page_no}</div>' if page_no else ""

def tete_html(titre_doc):
    """<head> des pages hors chapitres : gabarit, chapitre.css, couleur.css, pictogrammes, CSS de l'assembleur."""
    head_tpl = open(os.path.join(os.path.dirname(bc.__file__), "interieur.tpl.html"), encoding="utf-8").read()
    head = head_tpl[:head_tpl.index("</style>")]
    head = re.sub(r"<title>.*?</title>", f"<title>{e(titre_doc)}</title>", head)
    css = (open(os.path.join(os.path.dirname(bc.__file__), "chapitre.css"), encoding="utf-8").read()
           + open(os.path.join(VAR_TOOLS, "couleur.css"), encoding="utf-8").read()
           + "\n" + v.icon_vars() + "\n" + FCONT_CSS + ANNEXE_CSS)
    return head + css + "</style>\n</head>\n"

def annexe_html(tome, chaps, plan, work):
    """Page de titre et sommaire du tome (les seules pages du livre hors chapitres)."""
    titre_t, fond, encre = bc.TOMES[tome]
    pages = []
    cote = lambda n: "recto" if n % 2 else "verso"
    # --- page de titre (page 1, recto)
    comptes = {t: len(chapitres_du_tome(t)) for t in bc.TOMES}
    serie = "".join(f'<div class="{"on" if t == tome else ""}" style="flex:{comptes[t]}"><i>{t}</i><small>{e(bc.TOMES[t][0])}</small></div>'
                    for t in sorted(bc.TOMES))
    premier, dernier = chaps[0]["num"], chaps[-1]["num"]
    nb = len(chaps)
    # la frise du tome (JP, 16 octobre 2026, plan de match point 30) : présente, sans prendre la page
    f_svg = os.path.join(ROOT, "images", "tomes", f"tome-{tome}.svg")
    frise = f'<img class="tp-frise" src="{url(f_svg)}" alt="">' if os.path.exists(f_svg) else ""
    pages.append(f'''<section class="page recto tp" id="a-titre"><div class="tp-aplat"></div>
<div class="block"><div class="tp-head"><span>Le Grand Livre du Chalet</span><span>Tome {tome}</span></div>
<h1 class="tp-title">{e(titre_t)}</h1><div class="tp-num">{tome}</div>
<div class="tp-chap"><span>Chapitres <b>{aff(premier)}</b> à <b>{aff(dernier)}</b></span><span>{nb} chapitres</span></div>
<div class="tp-serie">{serie}</div></div>{frise}</section>''')
    # --- dédicace (recto, après la page de titre ; JP, 14 octobre 2026 : « la première page, comme dans les livres »)
    pages.append(f'''<section class="page recto ax dd" id="a-dedicace"><div class="block">
<p class="dd-txt">{il(DEDICACE[0])}<br><span class="dd-2">{il(DEDICACE[1])}</span></p></div></section>''')
    # --- sommaire
    icone = {"Maison": "m", "Chalet": "c"}
    rangs = []
    avec_or = any(c["rapport"].get("orange") for c in chaps)
    # la colonne Danger part avec la section Danger (JP, 18 octobre 2026) ; elle reste tant qu'un chapitre du tome l'a
    avec_d = any("d" in c["secs"] for c in chaps)
    n_urg = 9 if avec_d else 7
    for c in chaps:
        kd = "d" if "d" in c["secs"] else "8"
        kv = "v" if "v" in c["secs"] else "9"
        s8 = c["debut"] + c["secs"][kd] - 1 if kd in c["secs"] else ""
        s9 = c["debut"] + c["secs"][kv] - 1 if kv in c["secs"] else ""
        so = c["rapport"].get("orange") or []
        sor = (f'<td class="sor">{"<span>%d</span>" % (c["debut"] + so[0] - 1) if so else ""}</td>' if avec_or else "")
        n = aff(c["num"])
        rangs.append(f'<tr><td class="no"><span>{n}</span></td><td class="ti">{il(c["titre"])}</td>'
                     f'<td class="li"><i class="{icone.get(c["lieu"], "d")}"></i>{e(c["lieu"])}</td>'
                     f'<td class="pg">{c["debut"]}</td>{sor}{f"<td class=s8>{s8}</td>" if avec_d else ""}<td class="s9">{s9}</td></tr>')
    som_no = plan["sommaire"]
    ex = chaps[-1]["num"]
    note_sommaire = il(f"Deux numéros sur chaque page. **En tête, le folio du chapitre** : {ex}-4, c'est la page 4 du "
                       f"chapitre {ex} ; chaque chapitre ouvre sur le sommaire de ses neuf sections, dans ces folios. "
                       "**En pied, la page du tome**, celle de ce sommaire. Le 8, c'est le danger ; le 9, la variante "
                       "d'urgence, celle qui se fait sans rien."
                       + (" **En orange, les premières minutes** : la page où commencent les gestes urgents, dans l'ordre "
                          "où ils se font ; la même couleur marque leurs pages sur la tranche." if avec_or else "")
                       + (" **Le chapitre 00 ouvre le livre, en page 1, devant la page de titre** : il se trouve sans chercher."
                          if chaps and chaps[0]["num"] == "00" and chaps[0]["debut"] < plan["titre"] else ""))
    pages.append(f'''<section class="page {cote(som_no)} ax" id="a-sommaire"><div class="block">
<div class="ax-top"><span>Tome {tome} · {e(titre_t)}</span><span>Le Grand Livre du Chalet</span></div>
<h1>Sommaire</h1>
<p class="ax-note">{note_sommaire}</p>
<table class="som{' or' if avec_or else ''}"><thead><tr><th>Ch.</th><th>Chapitre</th><th>Lieu</th><th class="r">Page</th>{'<th class="r sor"><span class="sq o"></span>Premières<br>minutes</th>' if avec_or else ''}{'<th class="r s8"><span class="sq d">8</span>Danger</th>' if avec_d else ''}<th class="r s9"><span class="sq">{n_urg}</span>Urgence</th></tr></thead>
<tbody>{"".join(rangs)}</tbody></table></div>{pied(som_no, cote(som_no))}</section>''')
    ids = ["a-titre", "a-dedicace", "a-sommaire"]
    if tome == 1 and "mode1" in plan:
        pages.extend(mode_emploi(tome, titre_t, plan))
        ids += ["a-mode1", "a-mode2"]
    out = (tete_html(f"Tome {tome} — pages hors chapitres — Le Grand Livre du Chalet")
           + f'<body class="vA vB vC t{tome} lieu-2">\n<div id="book">\n'
           + "\n".join(pages) + "\n</div>\n" + ANNEXE_JS + "</body>\n</html>\n")
    dst = os.path.join(work, "html", f"annexes-tome-{tome}.html")
    open(dst, "w", encoding="utf-8").write(out)
    return dst, ids

MODE_CSS = """
.md .block{display:flex;flex-direction:column}
.md h1{font-size:30pt}
.md-row{display:grid;grid-template-columns:1.85in 1fr;gap:0 16pt;padding:8.5pt 0;border-top:0.6pt solid #C9C9C9}
.md-row:first-of-type{border-top:none}
.md-spec{display:flex;flex-direction:column;align-items:flex-start;gap:5pt;font:600 8.5pt/1.2 var(--sans)}
.md-txt h2{margin:0 0 3pt;font:700 10.5pt/1.2 var(--sans);text-transform:uppercase;letter-spacing:.04em}
.md-txt p{margin:0 0 4pt;text-indent:0;font:400 9.4pt/12.6pt var(--serif)}
.md-txt p b{font-weight:700}
.md .lieu .opts{width:1.85in}
.md .lieu .opts span{font-size:7.4pt;line-height:15pt}
.md .lad li{width:13pt;height:13pt;font:600 7.5pt/12pt var(--sans);text-align:center;list-style:none;border:0.75pt solid #000}
.md .lad li.on{background:var(--tsq);border-color:var(--tsq);color:#fff}
.md .lad li.d{background:var(--red);border-color:var(--red);color:#fff}
.md-or{border:1.5pt solid var(--or);background:var(--orp);padding:5pt 6pt;width:1.8in}
.md-or .otag{font-size:15pt}
.md-q{border:1.2pt solid var(--tsq);border-radius:8pt;padding:4pt 7pt;font:700 8.5pt/1.2 var(--sans);text-align:center}
.md-a{border:1pt solid var(--tsq);background:#EEF2F4;padding:4pt 6pt;font:600 8pt/1.25 var(--sans);position:relative;width:1.7in}
.md-a i{display:block;margin-top:3pt;text-align:right;font:700 7pt/1 var(--sans);font-style:normal}
.md-a i span{background:var(--tsq);color:#fff;padding:1.5pt 4pt}
.md-oui{display:inline-block;border-radius:7pt;background:var(--tsq);color:#fff;padding:1pt 7pt;font:700 7.5pt/1.2 var(--sans)}
.md-ic{display:inline-flex;align-items:center;gap:6pt}
.md-ic i{display:inline-block;width:15pt;height:15pt;background:center/100% 100% no-repeat}
.md-ic i.t{background-image:var(--i-minuteur-tsq)} .md-ic i.c{background-image:var(--i-thermo-tsq)} .md-ic i.d{background-image:var(--i-danger-red)}
.md-tab{display:inline-block;width:20pt;height:26pt;color:#fff;font:700 11pt/26pt var(--sans);text-align:center}
.md-fn{font:400 8pt/1.2 var(--serif)} .md-fn sup{font-size:6.5pt}
.md-rep{font-size:12pt}
"""

def mode_emploi(tome, titre_t, plan):
    """Les deux pages qui expliquent comment le livre fonctionne, au début du tome 1 (JP, 16 octobre 2026 : « dans les
    premières pages, je veux une page explicative de comment le livre fonctionne : pictogrammes, chapitres,
    symboles »). Chaque spécimen est l'élément du livre lui-même, avec ses classes."""
    cote = lambda n: "recto" if n % 2 else "verso"
    fl = '<span class="appel"><svg viewBox="0 0 18 10"><path d="M0 3.4 H10.2 V0 L18 5 L10.2 10 V6.6 H0 Z"/></svg><span>planche&nbsp;13-40</span></span>'
    lad = '<div class="lad"><ol>' + "".join(
        f'<li class="{"on" if k == 4 else ""}">{k}</li>' for k in range(1, 8)) + '</ol></div>'
    rang = lambda spec, titre, txt: (f'<div class="md-row"><div class="md-spec">{spec}</div>'
                                     f'<div class="md-txt"><h2>{titre}</h2>{txt}</div></div>')
    p = lambda t: f"<p>{il(t)}</p>"
    g = [
        rang('<div class="lieu"><div class="opts"><span>Maison</span><span class="on">Chalet</span><span>Les deux</span></div></div>',
             "Le lieu",
             p("Sous le titre de chaque chapitre, la case foncée dit où il se passe. **Maison** : en ville, avec le courant, "
               "l'aqueduc et l'égout du réseau, et des voisins. **Chalet** : hors réseau, avec le bois, l'eau et le territoire. "
               "**Les deux** : le chapitre sert aux deux endroits ; ce qui change de l'un à l'autre est dit dans l'étape qui change.")),
        rang(lad + '<span>13-4</span>',
             "Les sept sections et les pages",
             p("Tous les chapitres ont les mêmes sept sections, dans le même ordre : **1** En une ligne, **2** Quand l'utiliser, "
               "**3** Matériel, **4** Procédure, **5** Points de contrôle, **6** Signes d'échec, **7** Variante d'urgence. "
               "En bas de chaque page, la case pleine dit dans quelle section on est. La **7** dit comment faire sans courant, "
               "sans matériel acheté et sans personne à appeler.")
             + p("En haut de la page, **13-4** veut dire la page 4 du chapitre 13 ; en bas, le numéro de la page dans le tome, "
                 "celui du sommaire. Dans le texte, **ch. 25** renvoie au chapitre 25, **section 7** à la section 7 du même "
                 "chapitre, **étape 12** à l'étape 12 de la procédure.")),
        rang('<div class="md-or"><h3 class="sub or"><span class="otag">10<small>min</small></span><span class="ot">Il faut un feu tout de suite</span></h3></div>',
             "Les premières minutes",
             p("Quand un chapitre a des gestes urgents, sa procédure commence par un encadré orange. **La pastille dit le temps "
               "qu'on a** pour faire la série, à partir de ce qui la déclenche. Les gestes sont dans l'ordre où on les fait, avec "
               "leur raison et ce qu'il faut savoir pour les faire. Une marque orange au bord de ces pages permet de les trouver "
               "livre fermé.")),
        rang('<div class="md-q">Il fait plus froid que −17,5 °C ?</div><span class="md-oui">Oui</span>'
             '<div class="md-a">Allumer à la pile ou à la batterie.<i><span>ch. 13, étapes 18 à 21</span></i></div>',
             "Le logigramme",
             p("Sur deux pages, juste après le Matériel : des questions auxquelles on répond **oui** ou **non**, qui mènent au "
               "geste à faire. Chaque case dit l'étape où le geste est expliqué. C'est la version courte ; l'encadré orange et "
               "la procédure donnent le détail.")),
    ]
    d = [
        rang('<span class="pl-tete" style="border:none;height:auto;margin:0"><span class="pl-num">Planche 13-40</span></span>'
             + f'<span style="font:400 9.4pt var(--serif)">… le tipi ({fl}) …</span>',
             "Les planches",
             p("Une planche montre comment faire ou fabriquer. Son numéro est en rouge en haut de la page, avec son titre. Dans "
               "le texte, la **flèche rouge** renvoie à la planche : elle pointe à droite quand la planche est en face ou plus "
               "loin, à gauche quand elle est en face ou sur la page d'avant. La planche est sur la même page que son appel, ou "
               "sur la suivante. Une **petite planche**, d'une colonne de large, se place dans le paragraphe qui en parle.")),
        rang('<span class="md-rep"><span class="reps"><svg class="rep" viewBox="0 0 20 20"><rect x=".7" y=".7" width="18.6" height="18.6" rx="9.3" fill="#fff" stroke="#1A1A1A" stroke-width="1.2"/><text x="10.0" y="10.6" text-anchor="middle" dominant-baseline="middle">3</text></svg></span></span>'
             '<span style="font:400 9.4pt var(--serif)">(planche 13-40, <span class="reps"><svg class="rep" viewBox="0 0 20 20"><rect x=".7" y=".7" width="18.6" height="18.6" rx="9.3" fill="#fff" stroke="#1A1A1A" stroke-width="1.2"/><text x="10.0" y="10.6" text-anchor="middle" dominant-baseline="middle">5</text></svg> <svg class="rep" viewBox="0 0 20 20"><rect x=".7" y=".7" width="18.6" height="18.6" rx="9.3" fill="#fff" stroke="#1A1A1A" stroke-width="1.2"/><text x="10.0" y="10.6" text-anchor="middle" dominant-baseline="middle">6</text></svg></span>)</span>',
             "Les repères",
             p("Sur la planche, chaque détail porte un numéro dans un cercle ; la légende, sous le dessin, dit ce qu'on doit y "
               "voir. Dans le texte, le même cercle renvoie au même détail : **③**, c'est le 3 de la planche.")
             + p("Ce qui est en **rouge** sur une planche est le geste (une flèche), le point à vérifier (un cercle) ou la zone "
                 "dangereuse ; il a toujours son numéro. Une vignette titrée **« Sans… »** ou **« Autre façon »** remplace une "
                 "autre vignette ; sa légende dit au lieu de quel numéro.")),
        rang('<span class="md-ic"><i class="t"></i>un temps</span><span class="md-ic"><i class="c"></i>une température</span>',
             "Les pictogrammes des étapes",
             p("Sous le numéro d'une étape : le **minuteur**, un temps à respecter ou à surveiller ; le **thermomètre**, une "
               "température à atteindre ou à vérifier.")),
        rang('<span style="display:flex;gap:6pt;align-items:flex-start;font:400 9.4pt var(--serif)">'
             '<span style="display:flex;flex-direction:column;align-items:flex-end;gap:2pt"><b style="font:700 11pt var(--sans)">12</b>'
             + il("{!generatrice}").replace('class="picto"', 'class="picto" style="width:21pt;height:21pt"') + '</span>'
             '<span>Laisser la génératrice dehors…</span></span>',
             "Les dangers",
             p("Un **carré rouge** dans la marge, à gauche d'une étape, veut dire qu'un danger se présente à cette étape. Chaque danger a "
               "le sien. L'étape dit ce qui est propre à la situation : la distance, la dose, la durée. Le danger lui-même "
               "(ce qu'il fait, comment le reconnaître, quoi faire) est expliqué une seule fois, dans **les pages des "
               "dangers** qui suivent celle-ci.")),
        rang('<span class="md-fn">… la peau prend une tache blanche<sup>1</sup> …</span>',
             "Les notes",
             p("Un signe qu'il faut savoir reconnaître (une couleur, une odeur, un son, un test) est décrit en note, en bas de "
               "la même page.")),
        rang('<span style="display:flex;gap:4pt"><span class="md-tab" style="background:var(--tsq)">13</span>'
             '<span class="md-tab" style="background:var(--or);color:#000">13</span>'
             '<span class="md-tab" style="background:var(--red)">13</span></span>',
             "Le bord des pages",
             p("Le numéro du chapitre est imprimé au bord de chaque page : livre fermé, on voit où commence chaque chapitre. "
               "Le bord est **orange** sur les pages des premières minutes.")),
    ]
    n1, n2 = plan["mode1"], plan["mode2"]
    tete = f'<div class="ax-top"><span>Tome {tome} · {e(titre_t)}</span><span>Le Grand Livre du Chalet</span></div>'
    return [
        f'<section class="page {cote(n1)} ax md" id="a-mode1"><style>{MODE_CSS}</style><div class="block">{tete}'
        f'<h1>Comment le livre fonctionne</h1>{"".join(g)}</div>{pied(n1, cote(n1))}</section>',
        f'<section class="page {cote(n2)} ax md" id="a-mode2"><div class="block">{tete}'
        f'{"".join(d)}</div>{pied(n2, cote(n2))}</section>',
    ]

# ------------------------------------------------------------------ les pages des dangers
# JP, 18 octobre 2026 : « les dangers sont expliqués une fois dans le livre, dans la section qui explique les symboles et
# pictogrammes ; chaque fois qu'un danger est présent, on affiche le pictogramme ». Les pages vont dans chaque tome,
# après « Comment le livre fonctionne » (ou après le sommaire) ; un tome n'imprime que les dangers que ses chapitres
# marquent ({!id}). Le texte est dans dangers/*.md (« ## {!id} Nom », puis le corps) ; l'ordre est celui du tableau
# de plan/dangers-inventaire.md. Les pages se coupent dans Chromium (DANGERS_JS) : une première passe compte les
# pages, la seconde les imprime avec leurs folios.
DANGERS_CSS = """
.dgp .block{display:flex;flex-direction:column}
.dgp h1{font-size:30pt}
.dg-flow{flex:1 1 0;min-height:0;overflow:hidden}
.dg-intro{margin:0 0 10pt;text-indent:0;font:500 9.2pt/12.4pt var(--sans)}
.dg-intro svg.picto{height:1.4em;width:1.4em;vertical-align:-.4em}
.dg-h{display:flex;align-items:center;gap:10pt;margin:12pt 0 5pt;padding-top:8pt;border-top:0.75pt solid #1A1A1A;break-after:avoid}
.dg-flow > .dg-h:first-child{margin-top:0}
.dg-h svg.picto-g{flex:none;width:0.62in;height:0.62in}
.dg-h h2{margin:0;font:700 14pt/1.1 var(--sans);text-transform:uppercase;letter-spacing:.03em}
.dg-h h2 small{display:block;margin-top:2pt;font:600 7.5pt/1 var(--sans);letter-spacing:.08em;color:#6A6A6A}
.dg-flow > :not(.dg-h){margin-left:calc(0.62in + 10pt)}
.dg-flow p{margin:0 0 4pt;text-indent:0;font:400 9.4pt/12.6pt var(--serif)}
.dg-flow p.li{padding-left:11pt}
.dg-flow table.tcol{width:calc(100% - 0.62in - 10pt)}
"""

DANGERS_JS = r"""<script>
(function(){
  // coupe le flot des dangers en pages : un bloc à la fois ; le titre d'un danger ne reste jamais seul au bas d'une page
  const src = document.getElementById('dg-src'); if(!src) return;
  const debut = +src.dataset.debut, tete = src.dataset.tete;
  const book = document.getElementById('book');
  let n = 0, flow = null;
  const page = () => {
    const no = debut + n; n++;
    const s = document.createElement('section');
    s.className = 'page ' + (no % 2 ? 'recto' : 'verso') + ' ax dgp'; s.id = 'a-dg-' + (n - 1);
    s.innerHTML = '<div class="block">' + tete + (n === 1 ? src.dataset.h1 : '') + '<div class="dg-flow"></div></div>'
      + (debut ? '<div class="fcont">' + no + '</div>' : '');
    book.appendChild(s); flow = s.querySelector('.dg-flow');
  };
  const deborde = () => flow.scrollHeight > flow.clientHeight + 0.5;
  // coupe le paragraphe p après la dernière phrase qui tient ; rend la suite (un nouveau <p>), ou null si rien ne tient
  // (au moins deux lignes de chaque côté)
  const couper = p => {
    const html = p.innerHTML, bornes = [];
    const rx = /[.;:!?]\u202f?(?:<\/strong>)?\s(?=[A-ZÀÂÉÈÊÎÔÛÇ«<0-9])/g; let m;
    while((m = rx.exec(html))) bornes.push(m.index + m[0].length);
    const lh = parseFloat(getComputedStyle(p).lineHeight) || 16;
    for(let k = bornes.length - 1; k >= 0; k--){
      p.innerHTML = html.slice(0, bornes[k]);
      if(!deborde() && p.getBoundingClientRect().height >= 2 * lh - 1){
        const q = document.createElement('p'); q.className = p.className; q.innerHTML = html.slice(bornes[k]);
        if(q.textContent.trim().length > 60) return q;
      }
    }
    p.innerHTML = html; return null;
  };
  const go = () => {
    const blocs = Array.from(src.children); src.remove(); page();
    for(let i = 0; i < blocs.length; i++){
      const b = blocs[i];
      flow.appendChild(b);
      const seul = b.classList.contains('dg-h') && i + 1 < blocs.length;
      if(seul) flow.appendChild(blocs[i + 1]);
      if(deborde() && !seul && b.tagName === 'P' && flow.children.length > 1){
        // un paragraphe trop long pour le bas de la page se coupe entre deux phrases, plutôt que de laisser un trou
        const reste = couper(b);
        if(reste){ page(); flow.appendChild(reste); continue; }
      }
      if(deborde() && seul && blocs[i + 1].tagName === 'P' && flow.children.length > 2){
        // le titre d'un danger et le début de son premier paragraphe restent au bas de la page, le reste passe
        const reste = couper(blocs[i + 1]);
        if(reste){ page(); flow.appendChild(reste); i++; continue; }
      }
      if(deborde() && flow.children.length > (seul ? 2 : 1)){
        if(seul) blocs[i + 1].remove();
        b.remove(); page(); flow.appendChild(b); if(seul) flow.appendChild(blocs[i + 1]);
      }
      if(seul) i++;
    }
    document.documentElement.dataset.ready = '1';
  };
  document.fonts.ready.then(() => Promise.all(['700 14pt "IBM Plex Sans Condensed"', '400 9.4pt "IBM Plex Serif"'].map(f => document.fonts.load(f)))).then(go);
})();
</script>
"""

def dangers_entrees():
    """dangers/*.md -> {id: (nom, corps Markdown)} ; l'ordre canonique vient du tableau de l'inventaire."""
    entrees = {}
    for f in sorted(glob.glob(os.path.join(ROOT, "dangers", "*.md"))):
        cur = None
        for l in open(f, encoding="utf-8").read().splitlines():
            m = re.match(r"^##\s+\{!([a-z-]+)\}\s*(.+)$", l)
            if m:
                cur = m.group(1); entrees[cur] = [m.group(2).strip(), []]; continue
            if re.match(r"^#{1,2}\s", l):
                cur = None; continue
            if cur:
                entrees[cur][1].append(l)
    ordre = []
    inv = os.path.join(ROOT, "plan", "dangers-inventaire.md")
    if os.path.exists(inv):
        for m in re.finditer(r"^\|\s*\d+\s*\|\s*`([a-z-]+)`", open(inv, encoding="utf-8").read(), re.M):
            ordre += ["ours", "orignal"] if m.group(1) == "bete-qui-charge" else [m.group(1)]
    rang = {k: i for i, k in enumerate(ordre)}
    return dict(sorted(entrees.items(), key=lambda kv: rang.get(kv[0], 999)))

def dangers_du_tome(tome, chap_ids):
    """Les ids marqués {!id} dans les chapitres du tome, et le nombre de chapitres où chacun paraît."""
    vus = {}
    for num in chap_ids:
        for f in glob.glob(os.path.join(ROOT, "chapitres", f"{num}-*.md")):
            for pid in set(re.findall(r"\{!([a-z][a-z-]*)\}", open(f, encoding="utf-8").read())):
                vus.setdefault(pid, []).append(num)
    return vus

def dangers_html(tome, chap_ids, debut, work, nom="dangers"):
    """Écrit le HTML des pages des dangers du tome ; debut = folio de la première page (0 : passe de comptage)."""
    titre_t = bc.TOMES[tome][0]
    vus = dangers_du_tome(tome, chap_ids)
    ent = dangers_entrees()
    import md2blocks as mb
    blocs = []
    for pid, (nomd, corps) in ent.items():
        if pid not in vus:
            continue
        chs = ", ".join(aff(c) for c in vus[pid])
        blocs.append(f'<div class="dg-h">{mb.picto_svg(pid, "picto-g")}<h2>{il(nomd)}'
                     f'<small>{"Chapitre" if len(vus[pid]) == 1 else "Chapitres"} {chs}</small></h2></div>')
        blocs += [h for h, _ in bc.render(bc.parse(corps))]
    manquent = sorted(set(vus) - set(ent))
    if manquent:
        log("  ATTENTION : dangers marqués sans page d'explication : " + ", ".join(manquent))
    if not blocs:
        return None, 0
    tete = f'<div class="ax-top"><span>Tome {tome} · {e(titre_t)}</span><span>Le Grand Livre du Chalet</span></div>'
    h1 = ('<h1>Les dangers</h1><p class="dg-intro">' + il(
        "Dans un chapitre, ce carré rouge {!" + next(iter(k for k in ent if k in vus)) + "}, dans la marge à gauche d'une "
        "étape, veut dire qu'un danger se présente à cette étape. L'étape dit ce qui est propre à cette situation (la distance, la dose, la "
        "durée) ; le danger lui-même, ce qu'il fait au corps, comment le reconnaître et quoi faire, est expliqué ici, une "
        "seule fois.") + "</p>")
    src = (f'<div id="dg-src" data-debut="{debut}" data-tete="{e(tete)}" data-h1="{e(h1)}" style="display:none">'
           + "".join(blocs) + "</div>")
    # le flot se mesure visible : le conteneur caché ne sert qu'à porter les blocs jusqu'au script
    src = src.replace(' style="display:none"', ' style="position:absolute;left:-9999px;width:7in"')
    out = (tete_html(f"Tome {tome} — les dangers — Le Grand Livre du Chalet").replace("</style>", DANGERS_CSS + "</style>", 1)
           + f'<body class="vA vB vC t{tome} lieu-2">\n<div id="book">\n</div>\n' + src + "\n" + DANGERS_JS + "</body>\n</html>\n")
    dst = os.path.join(work, "html", f"{nom}-tome-{tome}.html")
    open(dst, "w", encoding="utf-8").write(out)
    return dst, len(vus)

DEDICACE = ("À Pierre-Alexis et à Louis-Charles,", "pour qu’il y ait toujours quelqu’un qui sait.")

CREDITS_PAR_PAGE = 16

def credits_html(tome, credits_lignes, total, work):
    """Crédits des images du tome, HORS DU LIVRE (JP, 28 septembre 2026) : un document à part, dans la
    grille du livre mais sans folio ni onglet, qui ne s'assemble jamais dans interieur.pdf."""
    titre_t = bc.TOMES[tome][0]
    cote = lambda n: "recto" if n % 2 else "verso"
    intro = il(f"**Ne s'imprime pas dans le livre.** Copie de sauvegarde des licences, tirée de images/credits.md et "
               f"des registres de photos à l'assemblage du {time.strftime('%Y-%m-%d')} ({total} pages). Les planches "
               "au trait du tome sont dessinées pour le livre ; les images ci-dessous viennent d'ailleurs, chacune avec "
               "son auteur, sa licence, l'adresse où on la trouve et la page du tome où elle s'imprime.")
    lots = [credits_lignes[i:i + CREDITS_PAR_PAGE] for i in range(0, len(credits_lignes), CREDITS_PAR_PAGE)] or [[]]
    pages = []
    for k, lot in enumerate(lots):
        no = k + 1
        if lot:
            corps = "".join(f'<tr><td class="pg">{r["page"]}</td><td>{e(r["chap"])}</td><td>{il(r["sujet"])}</td>'
                            f'<td>{e(r["auteur"])}</td><td>{e(r["licence"])}</td><td class="ln">{e(r["lien"])}</td></tr>' for r in lot)
            tab = (f'<table class="cred"><colgroup><col style="width:7%"><col style="width:6%"><col style="width:27%">'
                   f'<col style="width:22%"><col style="width:13%"><col style="width:25%"></colgroup>'
                   f'<thead><tr><th>Page</th><th>Ch.</th><th>Image</th><th>Auteur</th><th>Licence</th><th>Lien</th></tr></thead><tbody>{corps}</tbody></table>')
        else:
            tab = ('<div class="ax-vide">' + il("Aucune photo ni image venue d'ailleurs dans ce tome : toutes ses "
                                                 "figures sont des planches dessinées pour ce livre.") + '</div>')
        h1 = (f'<h1>Crédits des images</h1><p class="ax-note">{intro}</p>' if k == 0
              else '<h1 style="font-size:24pt">Crédits des images (suite)</h1>')
        pages.append(f'''<section class="page {cote(no)} ax" id="a-credits-{k + 1}"><div class="block">
<div class="ax-top"><span>Tome {tome} · {e(titre_t)} · hors du livre</span><span>Le Grand Livre du Chalet</span></div>
{h1}{tab}</div></section>''')
    out = (tete_html(f"Tome {tome} — crédits des images (hors du livre) — Le Grand Livre du Chalet")
           + f'<body class="vA vB vC t{tome} lieu-2">\n<div id="book">\n'
           + "\n".join(pages) + "\n</div>\n" + ANNEXE_JS + "</body>\n</html>\n")
    dst = os.path.join(work, "html", f"credits-tome-{tome}.html")
    open(dst, "w", encoding="utf-8").write(out)
    return dst, [f"a-credits-{k + 1}" for k in range(len(lots))]

def credits_md(tome, credits_lignes, credits_manques, total, pdf_nom):
    """La même copie en Markdown : fichier, page du tome, auteur, licence, lien."""
    L = [f"# Tome {tome} · {bc.TOMES[tome][0]} — crédits des images (hors du livre)\n",
         "**Ne s'imprime pas.** JP, 28 septembre 2026 : « enlève les pages crédit photo, garde les backup quelque "
         "part mais pas dans le livre ». Aucune page de crédits dans `livre/tome-%d/interieur.pdf`, rien au sommaire.\n" % tome,
         f"- **Tiré de :** `images/credits.md` et `images/photos/registre-*.md` (les registres restent la référence)",
         f"- **Par :** `design/outils/assembler-tome.py {tome}`, le {time.strftime('%Y-%m-%d %H:%M')}, tome de {total} pages",
         f"- **Même contenu, lisible à l'écran :** `{pdf_nom}`",
         "- **Page :** celle du tome où l'image s'imprime ; elle change à chaque assemblage.\n"]
    if credits_lignes:
        L.append("| Page | Ch. | Fichier | Image | Auteur | Licence | Lien |\n| ---: | --- | --- | --- | --- | --- | --- |")
        for r in credits_lignes:
            L.append(f"| {r['page']} | {r['chap']} | `{r['fichier']}` | {r['sujet'].replace('|', '/')} | {r['auteur']} | "
                     f"{r['licence']} | {r['lien']} |")
        L.append("")
    else:
        L.append("Aucune photo ni image venue d'ailleurs dans ce tome : toutes ses figures sont des planches dessinées "
                 "pour le livre.\n")
    if credits_manques:
        L.append("**Crédit introuvable dans les registres (marqué [À VÉRIFIER]) :** "
                 + "; ".join(f"ch. {n} : `{b}`" for n, b in credits_manques) + "\n")
    return "\n".join(L)

# ------------------------------------------------------------------ contrôle du PDF final
def polices(reader):
    vues, non = {}, set()
    for pg in reader.pages:
        res = pg.get("/Resources")
        fonts = res.get_object().get("/Font") if res else None
        if not fonts:
            continue
        for _, ref in fonts.get_object().items():
            f = ref.get_object()
            nom = str(f.get("/BaseFont", "?"))
            desc = f.get("/FontDescriptor")
            if desc is None and "/DescendantFonts" in f:
                desc = f["/DescendantFonts"][0].get_object().get("/FontDescriptor")
            desc = desc.get_object() if desc is not None else None
            inc = bool(desc) and any(k in desc for k in ("/FontFile", "/FontFile2", "/FontFile3"))
            if str(f.get("/Subtype")) == "/Type3":
                inc = True
            vues[nom] = inc
            if not inc:
                non.add(nom)
    return vues, non

POLICES_DU_LIVRE = ("IBMPlex", "NotoSans", "NotoSerif")   # interieur.tpl.html : Plex, et ses voisins pour les
                                                          # caractères qu'il n'a pas (28 septembre 2026)

def glyphes_de_secours(reader, pages_planche):
    """Caractères que le navigateur a dû prendre hors des polices du livre (IBM Plex, et les Noto chargées
    pour ≥, ᵉ, ⚠…), faute de glyphe. Les pages qui portent une planche sont sautées : le texte des SVG a ses propres polices (Georgia,
    Type 3), et le contrôle ne sait pas le séparer du texte courant de la même page.
    Rend {caractère: {police: [pages]}}."""
    out = {}
    for i, pg in enumerate(reader.pages):
        def vis(text, cm, tm, fd, fs, i=i):
            if not fd or not text.strip():
                return
            nom = re.sub(r"^/?[A-Z]{6}\+", "", str(fd.get("/BaseFont", "")))
            if nom.startswith(POLICES_DU_LIVRE) or i + 1 in pages_planche:
                return
            nom = nom or "Type 3 sans nom"
            for ch in text:
                if ch.strip():
                    out.setdefault(ch, {}).setdefault(nom, set()).add(i + 1)
        try:
            pg.extract_text(visitor_text=vis)
        except Exception:
            pass
    return out

# ------------------------------------------------------------------ programme
def main():
    a = sys.argv[1:]
    if not a or not a[0].isdigit():
        sys.exit(__doc__)
    tome = int(a[0])
    opt = lambda k: a[a.index(k) + 1] if k in a else None
    # un chapitre peut ouvrir à gauche : plus de page blanche devant une ouverture (JP, 18 octobre 2026 : « beaucoup de
    # pages vides, faut optimiser l'espace ») ; --recto remet l'ouverture toujours à droite
    verso = "--recto" not in a
    couverture = opt("--couverture") or "souple"
    extra = opt("--placements")
    if extra and not os.path.isabs(extra):
        extra = os.path.join(ROOT, extra)
    chap_ids = chapitres_du_tome(tome)
    if opt("--chapitres"):
        voulu = opt("--chapitres").split(",")
        chap_ids = [c for c in chap_ids if c in voulu]
    if not chap_ids:
        sys.exit(f"aucun chapitre pour le tome {tome}")
    sortie = opt("--sortie") or os.path.join(ROOT, "livre", f"tome-{tome}")
    if not os.path.isabs(sortie):
        sortie = os.path.join(ROOT, sortie)
    work = os.path.join(sortie, "travail")
    for d in (os.path.join(work, "src"), os.path.join(work, "html"), os.path.join(work, "pdf")):
        os.makedirs(d, exist_ok=True)
    cache_f = os.path.join(work, "cache.json")
    cache = {} if "--refaire" in a or not os.path.exists(cache_f) else json.load(open(cache_f, encoding="utf-8"))
    def garder():
        json.dump(cache, open(cache_f, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    pl, pl_sources = placements(tome, extra)
    json.dump(pl, open(os.path.join(work, "src", "placements.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    log(f"tome {tome} · {bc.TOMES[tome][0]} : {len(chap_ids)} chapitres ; placements : {', '.join(pl_sources)}")

    # 1. monter chaque chapitre (HTML), puis son rapport de pagination (Edge, en parallèle)
    chaps = []
    for num in chap_ids:
        dst, h, msgs, meta, notes = monter_chapitre(num, work)
        c = cache.setdefault(num, {})
        cle = sha(h)
        if c.get("html") != cle:
            c.clear(); c["html"] = cle
        c.update(dict(num=num, titre=meta["title"], lieu=meta["lieu"], dst=dst, notes=notes,
                      msgs=[l for l in msgs.splitlines() if l.strip()]))
        chaps.append(c)
        log(f"  {num} monté ({len(h) // 1024} Ko)" + (" — déjà paginé" if "rapport" in c else ""))
    garder()
    # Un chapitre se pagine des deux côtés (ouverture à droite, par=0 ; à gauche, par=1) : le côté change la place
    # des doubles pages et des planches en face ; le plan prend ensuite le rapport du côté où le chapitre tombe.
    cotes = ("0", "1") if verso else ("0",)
    manque = lambda c: [k for k in cotes if k not in c.get("rapports", {})]
    a_faire = [c for c in chaps if manque(c)]
    for essai in range(2):
        if not a_faire:
            break
        log(f"pagination de {len(a_faire)} chapitre(s)…")
        lot = [(c, k, os.path.join(work, "pdf", f"{c['num']}-rapport-{k}.pdf")) for c in a_faire for k in manque(c)]
        edge_lot([(pdf_args(url(c["dst"], f"par={k}", "#tome-rapport"), t), t) for c, k, t in lot])
        for c, k, t in lot:
            r = lire_rapport(t)
            if r:
                c.setdefault("rapports", {})[k] = r
                log(f"  {c['num']} ({'gauche' if k == '1' else 'droite'}) : {r['pages']} pages, {len(r['warn'])} avertissement(s)")
        garder()
        a_faire = [c for c in chaps if manque(c)]
    if a_faire:
        sys.exit("pagination impossible pour : " + ", ".join(c["num"] for c in a_faire))
    for c in chaps:
        c["rapport"] = c["rapports"]["0"]

    # 1 b. les pages des dangers : une passe pour les compter
    dg_n = 0
    dg_html, dg_nb = dangers_html(tome, chap_ids, 0, work, "dangers-compte")
    if dg_html:
        dg_cpt = os.path.join(work, "pdf", f"dangers-compte-tome-{tome}.pdf")
        edge_lot([(pdf_args(url(dg_html), dg_cpt), dg_cpt)])
        dg_n = len(pypdf.PdfReader(dg_cpt).pages) if os.path.exists(dg_cpt) else 0
        log(f"pages des dangers : {dg_nb} dangers, {dg_n} pages")

    # 2. plan du tome : titre (recto), blanche, sommaire, puis les chapitres (chacun au recto), puis les
    #    blanches de fin. Tome 1 : le chapitre 00 d'abord, en page 1, avant la page de titre (il se trouve
    #    sans chercher). Pas de crédits : ils vont hors du livre (livre/credits/), JP, 28 septembre 2026.
    credits_map = registre_credits()
    en_tete = [c for c in chaps if tome == 1 and c["num"] == "00"]
    # la dédicace en première page, avant la page de titre (JP, 15 octobre 2026)
    ordre = ([("chap", c) for c in en_tete] + [("annexe", "a-dedicace"), ("blanche", "dedicace"), ("annexe", "a-titre"), ("blanche", "titre"), ("annexe", "a-sommaire")]
             + ([("annexe", "a-mode1"), ("annexe", "a-mode2")] if tome == 1 else [])
             + [("dg", k) for k in range(dg_n)]
             + [("chap", c) for c in chaps if c not in en_tete])
    plan, seq, lignes_plan = {}, [], []
    blanches, blanches_ouv = 0, 0
    for kind, x in ordre:
        prochaine = len(seq) + 1
        if kind == "chap":
            c = x
            if (not verso or "recto" in c["notes"]) and prochaine % 2 == 0:
                seq.append(("blanche", None)); blanches += 1; blanches_ouv += 1; prochaine += 1
            c["debut"] = prochaine
            c["rapport"] = c["rapports"]["1" if prochaine % 2 == 0 and "1" in c["rapports"] else "0"]
            c["secs"] = c["rapport"]["secs"]
            for k in range(c["rapport"]["pages"]):
                seq.append(("chap", (c["num"], k)))
            n = c["rapport"]["pages"]
            lignes_plan.append((f"{prochaine}–{prochaine + n - 1}", f"ch. {c['num']} — {c['titre']}", n))
        elif kind == "blanche":
            seq.append(("blanche", None)); blanches += 1
        elif kind == "dg":
            if x == 0:
                plan["dangers"] = prochaine
                lignes_plan.append((f"{prochaine}–{prochaine + dg_n - 1}", "Les dangers", dg_n))
            seq.append(("dg", x))
        else:
            if x in ("a-titre", "a-dedicace") and prochaine % 2 == 0:     # titre et dédicace toujours à droite
                seq.append(("blanche", None)); blanches += 1; prochaine += 1
            plan[x[2:]] = prochaine
            seq.append(("annexe", x))
            lignes_plan.append((str(prochaine), {"a-titre": "Page de titre", "a-dedicace": "Dédicace", "a-sommaire": "Sommaire", "a-mode1": "Comment le livre fonctionne (1)", "a-mode2": "Comment le livre fonctionne (2)"}[x], 1))
    photos = [(c, f) for c in chaps for f in c["rapport"]["figs"] if f["id"] == "photo"]
    while len(seq) % MULTIPLE or len(seq) < PAGES_MIN:
        seq.append(("blanche", None)); blanches += 1
    total = len(seq)
    log(f"plan : {total} pages ({blanches} blanches) ; titre p. {plan['titre']}, sommaire p. {plan['sommaire']}")

    # 3. lignes de crédits (page du tome où l'image s'imprime)
    credits_lignes, credits_manques = [], []
    for c, f in photos:
        b = os.path.basename(urllib.parse.unquote(f["src"]))
        d = credits_map.get(b)
        page = c["debut"] + f["page"] - 1
        if not d or not (d.get("auteur") and d.get("licence")):
            credits_manques.append((c["num"], b))
            d = dict(auteur=(d or {}).get("auteur") or "[À VÉRIFIER]", licence=(d or {}).get("licence") or "[À VÉRIFIER]",
                     lien=(d or {}).get("lien", ""), sujet=(d or {}).get("sujet", ""))
        leg = next((p.get("legende") for p in pl.get(c["num"], {}).get("photos", [])
                    if os.path.basename(p.get("fichier", "")) == b or b.startswith(os.path.basename(p.get("fichier", "")) or "\0")), "")
        credits_lignes.append(dict(page=page, chap=c["num"], sujet=re.sub(r"\s+", " ", leg or d.get("sujet") or b)[:140],
                                   auteur=d["auteur"], licence=d["licence"], lien=d.get("lien", ""), fichier=b))
    credits_lignes.sort(key=lambda r: r["page"])
    # la copie hors du livre (Markdown tout de suite ; le PDF avec les pages hors chapitres, au point 5)
    cred_dir = os.path.join(sortie, "credits") if opt("--sortie") else os.path.join(ROOT, "livre", "credits")
    os.makedirs(cred_dir, exist_ok=True)
    cred_md = os.path.join(cred_dir, f"tome-{tome}-credits.md")
    cred_pdf = os.path.join(cred_dir, f"tome-{tome}-credits.pdf")
    rel = lambda p: os.path.relpath(p, ROOT).replace("\\", "/")
    open(cred_md, "w", encoding="utf-8").write(credits_md(tome, credits_lignes, credits_manques, total, rel(cred_pdf)))

    # 4. rendu PDF des chapitres (numéro de page continu et côté passés dans l'URL)
    jobs = []
    for c in chaps:
        off, par = c["debut"] - 1, (0 if c["debut"] % 2 else 1)
        cle = f"{c['html']}|{off}|{par}"
        c["pdf"] = os.path.join(work, "pdf", f"{c['num']}.pdf")
        c["off"], c["par"] = off, par
        if c.get("pdf_cle") == cle and os.path.exists(c["pdf"]):
            continue
        c["pdf_cle_voulue"] = cle
        jobs.append((pdf_args(url(c["dst"], f"off={off}&par={par}"), c["pdf"]), c["pdf"]))
    if jobs:
        log(f"impression de {len(jobs)} chapitre(s)…")
        edge_lot(jobs)
    for c in chaps:
        if "pdf_cle_voulue" in c:
            if os.path.exists(c["pdf"]) and os.path.getsize(c["pdf"]) > 0:
                c["pdf_cle"] = c.pop("pdf_cle_voulue")
            else:
                c.pop("pdf_cle_voulue")
    garder()

    # 5. pages hors chapitres (titre, sommaire), et la copie des crédits hors du livre
    ann, ann_ids = annexe_html(tome, chaps, plan, work)
    ann_pdf = os.path.join(work, "pdf", f"annexes-tome-{tome}.pdf")
    cred_html, cred_ids = credits_html(tome, credits_lignes, total, work)
    jobs = [(pdf_args(url(ann), ann_pdf), ann_pdf), (pdf_args(url(cred_html), cred_pdf), cred_pdf)]
    dg_pdf = os.path.join(work, "pdf", f"dangers-tome-{tome}.pdf")
    if dg_n:
        dg_final, _ = dangers_html(tome, chap_ids, plan["dangers"], work)
        jobs.append((pdf_args(url(dg_final), dg_pdf), dg_pdf))
    edge_lot(jobs)

    # 6. assemblage
    avert = []
    lecteurs = {c["num"]: pypdf.PdfReader(c["pdf"]) for c in chaps}
    ann_r = pypdf.PdfReader(ann_pdf)
    dg_r = pypdf.PdfReader(dg_pdf) if dg_n else None
    if dg_r and len(dg_r.pages) != dg_n:
        avert.append(f"pages des dangers : {len(dg_r.pages)} pages imprimées pour {dg_n} comptées")
    if len(ann_r.pages) != len(ann_ids):
        avert.append(f"pages hors chapitres : {len(ann_r.pages)} pages imprimées pour {len(ann_ids)} prévues")
    if not os.path.exists(cred_pdf):
        avert.append(f"copie des crédits hors du livre : {rel(cred_pdf)} non écrit par Edge (le .md est à jour)")
    elif len(pypdf.PdfReader(cred_pdf).pages) != len(cred_ids):
        avert.append(f"copie des crédits hors du livre : {len(pypdf.PdfReader(cred_pdf).pages)} pages pour {len(cred_ids)} prévues")
    for c in chaps:
        n = len(lecteurs[c["num"]].pages)
        if n != c["rapport"]["pages"]:
            avert.append(f"ch. {c['num']} : {n} pages imprimées, {c['rapport']['pages']} au rapport de pagination")
        # une double page (logigramme) commence sur une page de gauche, paire dans le tome
        for f in c["rapport"]["figs"]:
            if f.get("taille") == "double" and (c["debut"] + f["page"] - 1) % 2:
                avert.append(f"ch. {c['num']} : la double page {f['id']} commence à la page {c['debut'] + f['page'] - 1}, "
                             f"une page de droite")
    w = pypdf.PdfWriter()
    for i, (kind, ref) in enumerate(seq):
        if kind == "blanche":
            pg = w.add_blank_page(PAGE_W, PAGE_H)
        else:
            if kind == "annexe":
                src = ann_r.pages[ann_ids.index(ref)]
            elif kind == "dg":
                if ref >= len(dg_r.pages):
                    w.add_blank_page(PAGE_W, PAGE_H); continue
                src = dg_r.pages[ref]
            else:
                rd = lecteurs[ref[0]]
                if ref[1] >= len(rd.pages):
                    avert.append(f"ch. {ref[0]} : page {ref[1] + 1} absente du PDF ; page blanche à la place")
                    w.add_blank_page(PAGE_W, PAGE_H)
                    continue
                src = rd.pages[ref[1]]
            mb = src.mediabox
            if abs(float(mb.width) - PAGE_W) > 0.5 or abs(float(mb.height) - PAGE_H) > 0.5:
                avert.append(f"page {i + 1} : imprimée à {float(mb.width):.1f} × {float(mb.height):.1f} pt")
            pg = w.add_page(src)
        full = RectangleObject([0, 0, PAGE_W, PAGE_H])
        pg.mediabox = full; pg.cropbox = full; pg.bleedbox = full
        # recto (page impaire) : reliure à gauche, fond perdu à droite ; verso : l'inverse
        pg.trimbox = RectangleObject([0, BLEED, TRIM_W, BLEED + TRIM_H] if (i + 1) % 2 else [BLEED, BLEED, PAGE_W, BLEED + TRIM_H])
    w.add_metadata({"/Title": f"Le Grand Livre du Chalet — Tome {tome} · {bc.TOMES[tome][0]} — intérieur",
                    "/Author": "Le Grand Livre du Chalet", "/Creator": "design/outils/assembler-tome.py"})
    pdf_final = os.path.join(sortie, "interieur.pdf")
    tmp = pdf_final + ".tmp"
    with open(tmp, "wb") as f:
        w.write(f)
    os.replace(tmp, pdf_final)
    taille = os.path.getsize(pdf_final)
    log(f"pdf : {pdf_final} ({total} pages, {taille / 1e6:.1f} Mo)")

    # 7. contrôle du fichier écrit
    r = pypdf.PdfReader(pdf_final)
    tailles = {(round(float(p.mediabox.width), 2), round(float(p.mediabox.height), 2)) for p in r.pages}
    vues, non_inc = polices(r)
    trims_ok = all([round(float(x)) for x in p.trimbox] == ([0, 9, 576, 729] if (i + 1) % 2 else [9, 9, 585, 729]) for i, p in enumerate(r.pages))
    pages_planche = {c["debut"] + f["page"] - 1 for c in chaps for f in c["rapport"]["figs"] if f["id"] != "photo"}
    secours = glyphes_de_secours(r, pages_planche)
    tr = None if "--hors-ligne" in a else tranche_blurb(total, couverture)

    # 8. aperçus PNG
    apercus = []
    if "--sans-apercus" not in a:
        adir = os.path.join(sortie, "apercus"); os.makedirs(adir, exist_ok=True)
        for f in glob.glob(os.path.join(adir, "*.png")):
            os.remove(f)
        # quatre aperçus par tome : la page de titre, le sommaire, la page 1 du tome si c'est un chapitre (le 00
        # du tome 1), sinon l'ouverture du premier chapitre, et une page avec planche (pleine page, sinon demi),
        # à défaut l'encadré danger. Pas d'aperçu des crédits : ils ne sont plus dans le livre (livre/credits/).
        vues_png = [("01-page-de-titre", ann, "", "a-titre"), ("02-sommaire", ann, "", "a-sommaire")]
        c0 = chaps[0]
        q0 = f"off={c0['off']}&par={c0['par']}"
        vues_png.append((f"03-ouverture-ch{c0['num']}" + ("-page-1-du-tome" if c0["debut"] == 1 else ""), c0["dst"], q0, f"p{c0['num']}-1"))
        trouve = (next(((c, f) for c in chaps for f in c["rapport"]["figs"] if f["taille"] == "pleine"), None)
                  or next(((c, f) for c in chaps for f in c["rapport"]["figs"] if f["taille"] == "demi"), None))
        if trouve:
            c, f = trouve
            nom = "04-planche-pleine-page" if f["taille"] == "pleine" else "04-demi-planche"
            vues_png.append((f"{nom}-{f['id']}", c["dst"], f"off={c['off']}&par={c['par']}", f"p{c['num']}-{f['page']}"))
        else:
            c = next((c for c in chaps if "d" in c["secs"] or "8" in c["secs"]), c0)
            vues_png.append((f"04-danger-ch{c['num']}", c["dst"], f"off={c['off']}&par={c['par']}", f"p{c['num']}-{c['secs'].get('d', c['secs'].get('8', 1))}"))
        c = next((c for c in chaps if c["rapport"].get("orange")), None)
        if c:
            vues_png.append((f"05-premieres-minutes-ch{c['num']}", c["dst"], f"off={c['off']}&par={c['par']}", f"p{c['num']}-{c['rapport']['orange'][0]}"))
        jobs = [(png_args(url(src, q, "#page=" + pid), os.path.join(adir, nom + ".png")), os.path.join(adir, nom + ".png"))
                for nom, src, q, pid in vues_png]
        edge_lot(jobs)
        apercus = [j[1] for j in jobs if os.path.exists(j[1])]
        log(f"aperçus : {len(apercus)} PNG dans {adir}")

    # 9. rapport
    L = []
    L.append(f"# Tome {tome} · {bc.TOMES[tome][0]} — rapport d'assemblage\n")
    L.append(f"- **Produit le :** {time.strftime('%Y-%m-%d %H:%M')}, par `design/outils/assembler-tome.py {' '.join(a)}`")
    L.append(f"- **Fichier :** `livre/tome-{tome}/interieur.pdf` — {total} pages, {taille / 1e6:.1f} Mo")
    L.append(f"- **Ouvertures :** {'au recto ou au verso (--verso)' if verso else 'toujours au recto (page de droite), une page blanche devant au besoin'}")
    L.append(f"- **Placements :** {', '.join(pl_sources)}")
    L.append(f"- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)\n")
    L.append("## Pages\n")
    L.append("| Pages du tome | Contenu | Pages |\n| --- | --- | ---: |")
    for pp, lab, n in lignes_plan:
        L.append(f"| {pp} | {lab} | {n} |")
    L.append(f"| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | {blanches} |")
    L.append(f"| | **Total** | **{total}** |\n")
    L.append(f"Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `{rel(cred_md)}` et `{rel(cred_pdf)}`.\n")
    somme = sum(c["rapport"]["pages"] for c in chaps)
    if not verso:
        n_v = max(PAGES_MIN, 3 + somme)
        n_v += n_v % 2
        L.append(f"Les chapitres seuls font {somme} pages ; {blanches_ouv} blanche(s) servent à faire ouvrir chaque "
                 f"chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait {n_v} pages.\n")
    series = [(c, c["rapport"].get("orange") or []) for c in chaps]
    if any(so for _, so in series):
        L.append("## Premières minutes (série orange)\n")
        L.append("Marqueur `{.orange}` sur l'intertitre ### de la série, dans le Markdown (CLAUDE.md, « Les premières "
                 "minutes, en orange ») : encadré orange, repère orange sur la tranche, colonne orange au sommaire.\n")
        L.append("| Ch. | Pages du tome |\n| --- | --- |")
        for c, so in series:
            if so:
                L.append(f"| {c['num']} | {', '.join(str(c['debut'] + x - 1) for x in so)} |")
        L.append("")
    L.append("## Contrôle Blurb\n")
    ok = lambda b: "oui" if b else "**NON**"
    L.append("| Exigence | Valeur voulue | Ce fichier | Conforme |\n| --- | --- | --- | --- |")
    L.append(f"| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | {', '.join(f'{x} × {y} pt' for x, y in sorted(tailles))} | {ok(tailles == {(585.0, 738.0)})} |")
    L.append(f"| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | {ok(trims_ok)} |")
    L.append(f"| Nombre de pages | pair, de {PAGES_MIN} à {PAGES_MAX} (papier Standard) | {total} | {ok(total % 2 == 0 and PAGES_MIN <= total <= PAGES_MAX)} |")
    L.append(f"| Page 1 | à droite | {'ouverture du chapitre 00' if plan['titre'] > 1 else 'page de titre'} | oui |")
    L.append(f"| Polices incorporées | toutes | {len(vues)} police(s), {len(non_inc)} non incorporée(s) | {ok(not non_inc)} |")
    L.append(f"| Taille du fichier | 2 Go au plus | {taille / 1e6:.1f} Mo | {ok(taille < 2e9)} |")
    L.append("| Marques d'imprimeur | aucune | aucune | oui |")
    L.append("| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |")
    L.append("| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |")
    L.append("| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |\n")
    if non_inc:
        L.append("Polices non incorporées : " + ", ".join(sorted(non_inc)) + "\n")
    L.append("Polices du fichier : " + ", ".join(sorted({re.sub(r"^/[A-Z]{6}\+", "", x).replace("?", "Type 3 sans nom (texte des planches)") for x in vues})) + "\n")
    if secours:
        L.append("**Caractères tombés hors des polices du livre** (IBM Plex, et les Noto chargées pour ce que Plex n'a "
                 "pas) : le navigateur les a pris dans une police de secours (incorporée, donc imprimable, mais d'un autre "
                 "dessin que le texte) :\n")
        L.append("| Caractère | Unicode | Police de secours | Pages du tome |\n| --- | --- | --- | --- |")
        for ch, d in sorted(secours.items()):
            for nom, pp in sorted(d.items()):
                L.append(f"| {ch} | U+{ord(ch):04X} | {nom} | {', '.join(map(str, sorted(pp)))} |")
        L.append("")
    L.append("## Tranche et couverture\n")
    if tr:
        L.append(f"Calculateur de Blurb interrogé le {tr['date']} pour **{total} pages**, papier Standard, couverture "
                 f"**{couverture}** (`{COUVERTURES[couverture]}`), en pouces :\n")
        tranche = next((v2 for k2, v2 in tr["lignes"] if k2.startswith("Gutter / Spine")), "?")
        cov_pdf = next((v2 for k2, v2 in tr["lignes"][5:] if k2.startswith("Final")), "?")
        L.append(f"**Tranche : {tranche} po. PDF de couverture : {cov_pdf} po.**\n")
        for titre_b, bloc in (("Pages (ce PDF)", tr["lignes"][:5]), ("Couverture", tr["lignes"][5:])):
            L.append(f"| {titre_b} | Pouces |\n| --- | --- |")
            for k2, v2 in bloc:
                L.append(f"| {k2} | {v2} |")
            L.append("")
        L.append("La tranche change par paliers avec le nombre de pages : la couverture se fait **après** le dernier "
                 "assemblage, avec la mesure du jour.\n")
    else:
        L.append(f"Calculateur non interrogé ({'--hors-ligne' if '--hors-ligne' in a else 'injoignable'}). "
                 f"Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour {total} pages, prendre "
                 f"la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]\n")
    L.append("## Figures\n")
    L.append("Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : "
             "elles portent « à valider » dans la colonne des figures posées.\n")
    L.append("| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |")
    L.append("| --- | --- | --- | --- | ---: |")
    for c in chaps:
        figs = c["rapport"]["figs"]
        a_val = set(planches_a_valider(c["num"])) - set(planches_validees(c["num"]))
        poses = ", ".join(f"{f['id'] if f['id'] != 'photo' else os.path.basename(f['src'])} ({c['debut'] + f['page'] - 1}"
                          f"{', pleine' if f['taille'] == 'pleine' else ', double page' if f['taille'] == 'double' else ''}"
                          f"{', à valider' if f['id'] in a_val else ''})" for f in figs) or "—"
        valides = {f["id"] for f in figs}
        attente = [i for i in sorted(a_val) if i not in valides]     # à valider mais pas dans les pages : à regarder
        sans = [i for i in planches_mentionnees(c["num"]) if i not in valides and i not in a_val]
        ancien = bc.ANCIEN.get(c["num"], c["num"])
        L.append(f"| {c['num']} | {poses} | {', '.join(sans) or '—'} | {', '.join(attente) or '—'} | {demandes_a_acquerir(ancien)} (ancien {ancien}) |")
    L.append("")
    manq = []
    for c in chaps:
        for f in c["rapport"]["figs"]:
            if f.get("src") and not f["src"].startswith(("http", "data:")):
                p = os.path.normpath(os.path.join(os.path.dirname(c["dst"]), urllib.parse.unquote(f["src"])))
                if not os.path.exists(p):
                    manq.append(f"ch. {c['num']} : {f['src']}")
    if manq:
        L.append("**Fichiers de figure introuvables :** " + "; ".join(manq) + "\n")
    faibles = []
    for c, f in photos:
        if f.get("nw") and f.get("w"):
            ppi = f["nw"] / f["w"]
            if ppi < 150:
                faibles.append(f"{os.path.basename(f['src'])} : {ppi:.0f} PPI")
    if faibles:
        L.append("**Photos sous 150 PPI à la taille imprimée :** " + "; ".join(faibles) + "\n")
    L.append("## Crédits des images — hors du livre\n")
    L.append(f"Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `{rel(cred_md)}` et `{rel(cred_pdf)}`.\n")
    if credits_lignes:
        L.append("| Page | Ch. | Fichier | Auteur | Licence |\n| ---: | --- | --- | --- | --- |")
        for rr in credits_lignes:
            L.append(f"| {rr['page']} | {rr['chap']} | {rr['fichier']} | {rr['auteur']} | {rr['licence']} |")
        L.append("")
    else:
        L.append("Aucune photo posée dans ce tome. Les photos téléchargées sous les anciens numéros de ces chapitres "
                 "ne s'impriment pas tant qu'aucun placement ne les pose.\n")
    if credits_manques:
        L.append("**Crédit introuvable (marqué [À VÉRIFIER] dans la copie) :** " + "; ".join(f"ch. {n} : {b}" for n, b in credits_manques) + "\n")
    dispo = []
    for c in chaps:
        fichiers = bc.photos_du_chapitre(c["num"])
        poses = {os.path.basename(urllib.parse.unquote(f["src"])) for f in c["rapport"]["figs"] if f["id"] == "photo"}
        reste = [os.path.basename(x) for x in fichiers if os.path.basename(x) not in poses]
        if reste:
            dispo.append(f"- ch. {c['num']} (ancien {bc.ANCIEN.get(c['num'], c['num'])}) : " + ", ".join(
                f"`{b}`" + ("" if b in credits_map else " (sans crédit)") for b in reste))
    if dispo:
        L.append("Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :\n")
        L += dispo
        L.append("")
    L.append("## Avertissements\n")
    tous = list(avert)
    for c in chaps:
        for w_ in c["rapport"]["warn"]:
            tous.append(f"ch. {c['num']}, paginateur : {w_}")
        for m in c["msgs"]:
            if m.startswith("ATTENTION"):
                tous.append(f"ch. {c['num']}, constructeur : {m[len('ATTENTION :'):].strip()}")
    L += [f"- {x}" for x in tous] or ["- aucun"]
    L.append("")
    L.append("## À savoir avant de téléverser\n")
    L.append("- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins "
             "de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait "
             "pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois "
             "chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage "
             "de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.")
    L.append("- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), "
             "pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.")
    L.append("- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.")
    L.append("- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées "
             "à 8 × 10 po (sans fond perdu).\n")
    rap = os.path.join(sortie, "rapport.md")
    open(rap, "w", encoding="utf-8").write("\n".join(L))
    log("rapport :", rap)
    for x in tous:
        log("  ATTENTION :", x)

if __name__ == "__main__":
    main()
