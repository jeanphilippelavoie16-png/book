#!/usr/bin/env python3
"""Mesurer le tempo d'un texte du Manuel du Nord (ou d'un texte de référence).

    python3 tempo.py FICHIER_OU_DOSSIER [...] [--par-fichier] [--json]

Pour chaque texte : la longueur des phrases (moyenne, médiane, écart, variation), les phrases très courtes et
très longues, la monotonie (deux phrases qui se suivent avec presque la même longueur), les deux-points et les
points-virgules, la phrase en « fait : conséquence », les mots de liaison qui font le tempo parlé (parce que, donc,
alors, comme, puis, mais…), les parenthèses, et la phrase qui commence comme la précédente.

Le markdown est nettoyé : titres, tableaux, pictogrammes {!id}, renvois, appels de note et mise en forme sortent ;
une étape numérotée compte comme un paragraphe. Les chiffres (12:30, 1:10) ne comptent pas comme deux-points.
"""
import json
import os
import re
import statistics
import sys

LIAISONS = {
    "parce que": r"\bparce qu(?:e|')", "car": r"\bcar\b", "donc": r"\bdonc\b", "alors": r"\balors\b",
    "comme": r"(?:^|[.!?]\s+)comme\b", "puis": r"\bpuis\b", "ensuite": r"\bensuite\b", "mais": r"\bmais\b",
    "sinon": r"\bsinon\b", "pour que": r"\bpour qu(?:e|')", "quand": r"\bquand\b", "si": r"\bs(?:i\b|')(?=\s?\w)",
    "et": r"\bet\b", "ce qui / ce que": r"\bce qu(?:i|e|')", "c'est": r"\bc'est\b",
}


def nettoie(t):
    t = re.sub(r"```.*?```", " ", t, flags=re.S)
    t = re.sub(r"<!--.*?-->", " ", t, flags=re.S)
    lignes = []
    for l in t.split("\n"):
        s = l.strip()
        if not s or s.startswith("#") or s.startswith("|") or re.match(r"^-{3,}$", s) or s.startswith("[^"):
            lignes.append("")
            continue
        s = re.sub(r"^(?:[-*+]|\d+[.)])\s+", "", s)   # puce ou numéro d'étape
        s = re.sub(r"^>\s?", "", s)
        lignes.append(s)
    t = "\n".join(lignes)
    t = re.sub(r"\{[!>][\w-]+\}", "", t)            # pictogrammes et renvois
    t = re.sub(r"\[\^\w+\]", "", t)                   # appels de note
    t = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", t)        # images
    t = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", t)     # liens
    t = re.sub(r"\*\*|__|\*|`", "", t)
    t = t.replace("’", "'").replace(" ", " ").replace(" ", " ")
    t = re.sub(r"(\d)\s?:\s?(\d)", r"\1h\2", t)        # 12:30, 1:10
    return t


def paragraphes(t):
    out, cur = [], []
    for l in t.split("\n"):
        if l.strip():
            cur.append(l.strip())
        elif cur:
            out.append(" ".join(cur)); cur = []
    if cur:
        out.append(" ".join(cur))
    return out


ABREV = r"(?:ch|p|env|etc|cf|No|no|art|min|max|vol|M|Mme|Dr|St|ex|approx|av|apr|J\.-C)"


def phrases(par):
    p = re.sub(r"\b(" + ABREV + r")\.", r"\1§", par)
    p = re.sub(r"(\d)\.(\d)", r"\1§\2", p)
    morceaux = re.split(r"(?<=[.!?…])\s+(?=[«\"(A-ZÀ-ÖØ-Þ0-9])", p)
    return [m.replace("§", ".").strip() for m in morceaux if len(re.findall(r"[\wÀ-ÿ'-]+", m)) >= 1]


def mots(s):
    return re.findall(r"[\wÀ-ÿ]+(?:['-][\wÀ-ÿ]+)*", s)


def mesure(texte):
    t = nettoie(texte)
    P = paragraphes(t)
    S = [s for p in P for s in phrases(p)]
    L = [len(mots(s)) for s in S]
    L = [x for x in L if x > 0]
    nmots = sum(L)
    if len(L) < 3:
        return None
    mono = sum(1 for a, b in zip(L, L[1:]) if abs(a - b) <= max(2, 0.2 * max(a, b))) / (len(L) - 1)
    def premier(s):
        m = mots(s)
        return m[0].lower() if m else ""
    meme_debut = sum(1 for a, b in zip(S, S[1:]) if premier(a) and premier(a) == premier(b)) / (len(S) - 1)
    deux_points = sum(s.count(":") for s in S)
    ph_dp = sum(1 for s in S if ":" in s)
    # « fait : conséquence » : une phrase complète, deux-points, une autre proposition avec un verbe conjugué
    def fait_csq_(s):
        # deux propositions de 4 mots et plus de part et d'autre du deux-points, la seconde n'étant pas une liste
        # (une liste : au moins deux virgules, et 3 mots ou moins entre elles)
        for i in [m.start() for m in re.finditer(":", s)]:
            avant, apres = s[:i], s[i + 1:].split(":")[0]
            if len(mots(avant)) < 4 or len(mots(apres)) < 4:
                continue
            bouts = [b for b in re.split(r",|\bet\b|\bou\b", apres) if b.strip()]
            if len(bouts) >= 3 and statistics.mean(len(mots(b)) for b in bouts) <= 3:
                continue
            return True
        return False
    fait_csq = sum(1 for s in S if fait_csq_(s))
    pv = sum(s.count(";") for s in S)
    par_ouv = sum(s.count("(") for s in S)
    plat = " ".join(S)
    liaisons = {k: len(re.findall(rx, plat, re.I)) for k, rx in LIAISONS.items()}
    tempo_parle = sum(liaisons[k] for k in ("parce que", "donc", "alors", "comme", "puis", "ensuite", "mais",
                                            "sinon", "pour que", "car"))
    k1000 = 1000 / nmots
    return {
        "mots": nmots, "phrases": len(L),
        "mots_par_phrase": round(statistics.mean(L), 1), "mediane": statistics.median(L),
        "ecart_type": round(statistics.pstdev(L), 1),
        "variation": round(statistics.pstdev(L) / statistics.mean(L), 2),
        "phrases_courtes_le_6": round(100 * sum(1 for x in L if x <= 6) / len(L), 1),
        "phrases_longues_ge_30": round(100 * sum(1 for x in L if x >= 30) / len(L), 1),
        "monotonie": round(100 * mono, 1),
        "meme_premier_mot": round(100 * meme_debut, 1),
        "deux_points_pour_1000": round(deux_points * k1000, 1),
        "phrases_avec_deux_points": round(100 * ph_dp / len(L), 1),
        "fait_deux_points_consequence": round(100 * fait_csq / len(L), 1),
        "points_virgules_pour_1000": round(pv * k1000, 1),
        "parentheses_pour_1000": round(par_ouv * k1000, 1),
        "liaisons_parlees_pour_1000": round(tempo_parle * k1000, 1),
        "liaisons_pour_1000": {k: round(v * k1000, 2) for k, v in liaisons.items()},
    }


COLS = [("mots", "mots"), ("phrases", "phr."), ("mots_par_phrase", "m/phr"), ("variation", "var."),
        ("phrases_courtes_le_6", "≤6 %"), ("phrases_longues_ge_30", "≥30 %"), ("monotonie", "mono %"),
        ("phrases_avec_deux_points", "« : » %"), ("fait_deux_points_consequence", "fait:csq %"),
        ("points_virgules_pour_1000", ";/1000"), ("parentheses_pour_1000", "()/1000"),
        ("liaisons_parlees_pour_1000", "liais./1000"), ("meme_premier_mot", "même début %")]


def fichiers(chemins):
    for c in chemins:
        if os.path.isdir(c):
            for f in sorted(os.listdir(c)):
                if f.endswith((".md", ".txt")):
                    yield os.path.join(c, f)
        else:
            yield c


def main():
    a = [x for x in sys.argv[1:] if not x.startswith("--")]
    if not a:
        sys.exit(__doc__)
    par_fichier = "--par-fichier" in sys.argv
    res, tout = {}, []
    for f in fichiers(a):
        t = open(f, encoding="utf-8").read()
        tout.append(t)
        if par_fichier:
            m = mesure(t)
            if m:
                res[os.path.basename(f)] = m
    res["ENSEMBLE"] = mesure("\n\n".join(tout))
    if "--json" in sys.argv:
        print(json.dumps(res, ensure_ascii=False, indent=1))
        return
    print("| texte | " + " | ".join(c for _, c in COLS) + " |")
    print("| --- " * (len(COLS) + 1) + "|")
    for nom, m in res.items():
        if m:
            print(f"| {nom} | " + " | ".join(str(m[k]) for k, _ in COLS) + " |")


if __name__ == "__main__":
    main()
