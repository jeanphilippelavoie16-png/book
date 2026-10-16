#!/usr/bin/env python3
"""Contrôle d'écriture d'un chapitre du Grand Livre du Chalet (skill ecriture).

  python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md
      → les tics qui restent : tirets, mots vides, vocabulaire d'IA, mises en relief, « village », « char »,
        et les ancres de planches introuvables.
  python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md --avant /tmp/avant.md
      → en plus, ce qui a disparu depuis l'ancienne version : chiffres, renvois, notes, figures,
        étapes, rappels de sécurité. Tout ce qui est signalé se justifie ou se remet.

Code de sortie 1 s'il reste un tiret, un mot banni, une ancre perdue ou un invariant disparu.
"""
import glob, json, os, re, sys
from collections import Counter

RACINE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
ESP = "[   ]?"

MOTS_VIDES = ["déjà", "encore", "tout", "toute", "tous", "toutes", "bien", "vraiment", "simplement",
              "exactement", "précisément", "littéralement", "en effet", "ainsi", "d'ailleurs",
              "en réalité", "justement", "carrément", "absolument"]
VOCAB_IA = ["crucial", "cruciale", "cruciaux", "essentiel", "essentielle", "essentiels", "primordial",
            "véritable", "véritables", "incontournable", "il est important de", "il convient de",
            "force est de", "en somme", "le fait de", "ce qui permet de", "au niveau de", "clé de voûte"]
BANNIS = [r"\bvillages?\b", r"\bchars?\b", r"\bBaie-Comeau\b", r"\bJP\b", r"\b4 et 6 ans\b"]
AGES = [r"\b(?:de|ont|a) [46] ans\b"]   # l'âge des enfants de JP, ou un âge qui est un fait : à juger
RELIEF = [r"\b[Cc]'est (?:le|la|les|l'|ce|cela|lui|elle|eux|là)\b[^.;:]{0,80}?\b(?:qui|que|qu')\b",
          r"\bn'est pas\b[^.;]{0,80}\bmais\b", r"\bpas\b[^.;]{0,40}\bmais\b"]
# la tournure bizarre (JP : « Ceux qui étaient dehors laissent à la porte la couche du dessus ») : le sujet
# en pronom en tête de phrase, et le complément de lieu glissé entre le verbe et son objet
TOURNURE = [r"\b(?:Ceux|Celui|Celle|Celles) qui\b",
            r"\b\w+(?:ent|er|e|ez|ons)\s+(?:à|au|aux|dans|sur|sous|devant|derrière|contre|vers)\s+(?:la|le|les|l'|un|une)\s?"
            r"[\wÀ-ÿ'-]+\s+(?:la|le|les|l'|un|une)\s?(?!plus\b|moins\b|même\b|long\b|temps\b)(?!quel)[\wÀ-ÿ'-]+",
            # la loi en formule (JP, 16 octobre 2026, ch. 13 : « Une braise devient flamme quand l'air lui arrive sans
            # arrêt, d'où le souffle continu » : « on avait dit plus de phrases de même ») : « d'où », la chose qui
            # « devient » un nom sans article, la chaleur qui « part à » faire quelque chose
            r"\bd['’]où\b",
            r"\bdevien(?:t|nent)\s+(?:flamme|feu|braise|cendre|glace|vapeur|eau|poussière)\b",
            r"\bpar(?:t|tent)\s+à\s+[\wÀ-ÿ]+er\b",
            # la chose qui pense, sait ou veut (JP, 16 octobre 2026 : « les phrases genre "la braise ne sait pas" ») :
            # un nom qui n'est pas une personne, sujet d'un verbe de l'esprit
            r"\b(?:[Ll]a|[Ll]e|[Ll]es|[Ll]')\s?(?!enfants?\b|personnes?\b|adultes?\b|bébés?\b|gens\b|famille\b|blessée?s?\b|"
            r"voisins?\b|parents?\b|mère\b|père\b|chasseurs?\b|lecteur\b|malade\b|patient\b)[a-zà-ÿ'-]+\s+(?:ne\s+|n')?"
            r"(?:sait|savent|veut|veulent|pardonne|pardonnent|aime|aiment|déteste|refuse|refusent|demande|demandent|ment|"
            r"oublie|oublient|se\s+croit|se\s+souvient|attend|attendent|décide|décident|comprend|comprennent|connaît)\b"]
# la maxime (JP : « Une décision qui n'a pas été reprise depuis douze heures ne vaut plus » : « inutile ») :
# la règle redite comme un proverbe, en « Un X qui… ne… plus/rien/pas »
MAXIME = [r"(?:^|(?<=[.!?:]\s))(?:Un|Une)\s+(?:[\wÀ-ÿ'’-]+\s+){0,4}qui\s+[^.;:]{3,90}?\s(?:ne|n')\s?[\wÀ-ÿ'’-]+(?:\s+[\wÀ-ÿ'’-]+)?\s+(?:plus|rien|pas|jamais|personne)\b[^.]*\.",
          r"(?:^|(?<=[.!?:]\s))(?:Un|Une)\s+[^.;:]{3,50}?\s(?:ne|n')\s?[\wÀ-ÿ'’-]+\s+(?:plus|rien|jamais|personne)\s*(?:de\s+\w+)?\."]
SECURITE = {"74 °C": r"74" + ESP + "°C", "cadmium": r"cadmium", "trichinellose": r"trichin",
            "tularémie": r"tularémie", "thuyone": r"thuyone", "3 °C (botulisme E)": r"\b3" + ESP + "°C",
            "botulisme": r"botulisme", "mal de caribou": r"caribou", "génératrice": r"génératrice"}
UNITES = r"(?:°C|%|kg|mg|g|mL|L|km|cm|mm|m|h|min|s|jours?|j|heures?|minutes?|semaines?|mois|ans?|V|W|Ah|A|kW|ppm|mSv|Sv|psi|kPa|po|pi)\b"


def lignes(chemin):
    return open(chemin, encoding="utf-8").read().split("\n")


def mot(m):
    return re.compile(r"(?<![\w'’-])" + re.escape(m) + r"(?![\w-])", re.I)


def tics(L):
    out = []
    for i, l in enumerate(L, 1):
        if re.match(r"^\s*\|?\s*:?-{3,}", l):          # ligne de séparation d'un tableau
            continue
        n = l.count("—") + l.count("–")
        if n:
            out.append((i, "tiret", f"{n} × ", l))
        for b in BANNIS:
            for m in re.finditer(b, l, re.I):
                out.append((i, "banni", m.group(0), l))
        for b in AGES:
            for m in re.finditer(b, l):
                out.append((i, "age", m.group(0), l))
        for w in VOCAB_IA:
            if mot(w).search(l):
                out.append((i, "IA", w, l))
        for w in MOTS_VIDES:
            if mot(w).search(l):
                out.append((i, "vide", w, l))
        for m in re.finditer(r"§\s?\d+", l):
            out.append((i, "section", m.group(0), l))
        if not l.lstrip().startswith("|"):
            for r in TOURNURE:
                for m in re.finditer(r, l):
                    if not re.search(r"\b(?:lequel|laquelle|lesquels|lesquelles)\b", m.group(0)):
                        out.append((i, "tournure", m.group(0)[:50], l))
        for r in RELIEF:
            m = re.search(r, l)
            if m:
                out.append((i, "relief", m.group(0)[:50], l))
    return out


VIDES_NGRAM = set("le la les l un une des de du d à au aux et ou en on ne pas que qui qu ce c est se s sur dans par pour avec il elle y a".split())


def redites(L, n=6, ecart=3):
    """Suites de n mots qui reviennent dans le chapitre, à plus de `ecart` lignes l'une de l'autre."""
    vus, out = {}, []
    mots = []
    for i, l in enumerate(L, 1):
        if l.lstrip().startswith("|") or l.startswith("#") or l.startswith("[^"):
            continue
        for w in re.findall(r"[\wÀ-ÿ'’]+", l.lower()):
            mots.append((w.replace("’", "'"), i))
    for k in range(len(mots) - n + 1):
        fen = tuple(w for w, _ in mots[k:k + n])
        if sum(w not in VIDES_NGRAM for w in fen) < 3:
            continue
        ligne = mots[k][1]
        if fen in vus and ligne - vus[fen] > ecart:
            out.append((vus[fen], ligne, " ".join(fen)))
        vus.setdefault(fen, ligne)
    # une redite longue donne plusieurs fenêtres : on garde la première de chaque paire de lignes
    vu, res = set(), []
    for a, b, t in out:
        if (a, b) not in vu:
            vu.add((a, b)); res.append((a, b, t))
    return res


def norme(t):
    return re.sub(r"[\s  ]+", " ", t).strip()


def ancres(chemin, texte):
    num = os.path.basename(chemin).split("-")[0]
    perdues = []
    for f in sorted(glob.glob(os.path.join(RACINE, "design", "epreuves-livre", "placements*.json"))):
        d = json.load(open(f, encoding="utf-8"))
        e = d.get(num) or {}
        for p in (e.get("planches") or []) + (e.get("photos") or []):
            a = p.get("apres")
            if a and norme(a) not in norme(texte):
                perdues.append((os.path.basename(f), p.get("id") or p.get("fichier"), a))
    return perdues


def invariants(avant, apres):
    # le texte d'un seul tenant (un nombre et son unité peuvent tomber sur deux lignes), et les renvois
    # « chapitre N » ramenés à « ch. N » pour comparer la chose et non sa forme
    def plat(t):
        t = re.sub(r"[\s\u00a0\u202f]+", " ", t)
        return re.sub(r"\bchapitres? (\d+[a-z]?)\b", r"ch. \1", t)
    avant, apres = plat(avant), plat(apres)
    def compte(rx, t):
        return Counter(norme(m) for m in re.findall(rx, t))
    rapports = []
    for nom, rx in [("chiffre avec unité", r"\d+(?:[,.]\d+)?" + ESP + UNITES),
                    ("renvoi", r"\bch\.\s?\d+[a-z]?\b|\bchapitres?\s\d+[a-z]?\b"),
                    ("note", r"\[\^[^\]]+\]"),
                    ("figure", r"!\[[^\]]*\]\([^)]*\)|\bplanche\s\d+-\d+[a-z]?\b")]:
        a, b = compte(rx, avant), compte(rx, apres)
        manque = a - b
        if manque:
            rapports.append((nom, ", ".join(f"{k} (×{v})" if v > 1 else k for k, v in sorted(manque.items()))))
    nombres_a = set(re.findall(r"\b\d+(?:[,.]\d+)?\b", avant))
    nombres_b = set(re.findall(r"\b\d+(?:[,.]\d+)?\b", apres))
    if nombres_a - nombres_b:
        rapports.append(("nombre disparu", ", ".join(sorted(nombres_a - nombres_b, key=lambda x: float(x.replace(",", "."))))))
    pas = lambda t: len(re.findall(r"(?m)^\s*\d+\.\s", t))
    if pas(apres) < pas(avant):
        rapports.append(("étapes numérotées", f"{pas(avant)} → {pas(apres)}"))
    for nom, rx in SECURITE.items():
        na, nb = len(re.findall(rx, avant, re.I)), len(re.findall(rx, apres, re.I))
        if nb < na:
            rapports.append(("sécurité", f"{nom} : {na} → {nb}"))
    return rapports


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    chemin = sys.argv[1]
    texte = open(chemin, encoding="utf-8").read()
    L = texte.split("\n")
    t = tics(L)
    grave = 0
    print(f"# Contrôle d'écriture : {chemin}\n")
    print(f"{len(texte.split())} mots, {texte.count('—') + texte.count('–')} tirets\n")
    for cat, titre in [("tiret", "Tirets"), ("banni", "Mots bannis"), ("IA", "Vocabulaire d'IA"),
                       ("age", "Âges de 4 ou 6 ans (à juger : l'âge des enfants de JP sort, un âge qui est un fait reste)"),
                       ("section", "Signes § à écrire « section N » (JP : « c'est quoi l'affaire avant le 8 »)"),
                       ("tournure", "Tournures bizarres : sujet en « ceux qui », ordre renversé (à juger, règle 11)"),
                       ("relief", "Mises en relief et oppositions (à juger)"), ("vide", "Mots vides (à juger)")]:
        x = [r for r in t if r[1] == cat]
        if not x:
            continue
        if cat in ("tiret", "banni"):
            grave += len(x)
        print(f"## {titre} ({len(x)})")
        for i, _, m, l in x[:400]:
            print(f"  l.{i} [{m.strip()}] {l.strip()[:110]}")
        print()
    plat = re.sub(r"\s+", " ", texte)
    maximes = [m.group(0) for rx in MAXIME for m in re.finditer(rx, plat)]
    if maximes:
        print(f"## Maximes : la règle redite en proverbe (à juger : elle sort ou se dit en clair) ({len(maximes)})")
        for m in maximes[:60]:
            print(f"  « {m[:140]} »")
        print()
    r = redites(L)
    if r:
        print(f"## Redites (à juger : un renvoi, ou on coupe) ({len(r)})")
        for a, b, t in r[:60]:
            print(f"  l.{a} et l.{b} : « {t} »")
        print()
    perdues = ancres(chemin, texte)
    if perdues:
        grave += len(perdues)
        print("## Ancres de planches introuvables")
        for f, i, a in perdues:
            print(f"  {i} ({f}) : « {a} »")
        print()
    if "--avant" in sys.argv:
        avant = open(sys.argv[sys.argv.index("--avant") + 1], encoding="utf-8").read()
        print(f"## Invariants : {len(avant.split())} mots avant, {len(texte.split())} après")
        r = invariants(avant, texte)
        if not r:
            print("  rien n'a disparu")
        for nom, d in r:
            grave += 1
            print(f"  {nom} : {d}")
        print()
    sys.exit(1 if grave else 0)


if __name__ == "__main__":
    main()
