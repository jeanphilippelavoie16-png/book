#!/usr/bin/env python3
"""Mesurer le tempo d'un texte du Manuel du Nord ou d'un texte de référence, et dire quels paragraphes relire d'abord.

    python3 tempo.py FICHIER_OU_DOSSIER [...] [--par-fichier] [--json] [--signaux]

Les chiffres disent quoi relire d'abord, jamais quoi viser. On ne réécrit jamais un paragraphe pour faire baisser un
chiffre, parce qu'une passe qui remplacerait chaque deux-points par une virgule referait la même faute autrement
(plan/audit-ecriture/bases.md, section 6, d'où viennent aussi les seuils).

Ce que le script sort :

- un tableau des mesures, pour le texte entier, puis pour la prose, les étapes numérotées et les puces mesurées à
  part (une puce sous une étape compte avec les étapes) ;
- quand on mesure un seul fichier (ou avec --signaux), les paragraphes à relire d'abord, chacun avec la ligne où il
  commence, ses premiers mots et ses signaux ; puis les signaux qui valent pour une section ou pour le chapitre.

Les signaux, chacun à son niveau :

- la phrase : 40 mots et plus (on regarde si le verbe vient avant la liste) ; deux deux-points dans la phrase ;
- le paragraphe : deux phrases « fait : conséquence » de suite ; quatre phrases et plus sans aucun mot de lien ;
  dans la prose, plus d'un deux-points ;
- la section (titre ##) : plus de 10 % de phrases « fait : conséquence » ; dans la prose, plus de 15 % de phrases
  avec un deux-points (deux phrases au moins dans les deux cas) ;
- le chapitre : plus de 65 % de phrases de 10 à 30 mots ; une variation sous 0,55 ; dans la prose, moins de 6 mots
  de liaison parlés pour 1000 mots, et 1000 mots de suite sans « mais ».

Les colonnes sans seuil (mots par unité, « alors » pour 1000, parenthèses hors renvois) servent à comparer. La
monotonie, le même premier mot et l'attaque liée restent dans le JSON pour comparer avec les notes de l'audit, mais
ce ne sont pas des signaux : ils ne séparent pas le livre des textes qui sonnent bien (L5, section 5).

Le markdown est nettoyé : titres, tableaux, pictogrammes {!id}, renvois {>id}, appels et textes de note, images et
mise en forme sortent. Une étiquette en gras en tête de paragraphe (« **Ce qui arrive.** », « **Le corps.** ») sort
aussi, et le deux-points qui suit un geste ou un objet en gras (« **Montre à pile** : ») annonce, alors il ne compte
pas comme deux-points. Les heures (12:30) et les rapports (1:10) ne comptent pas comme deux-points.

--json donne les mêmes mesures en JSON, avec les clés d'avant (mots_par_phrase, liaisons_pour_1000…). Chaque
fichier mesuré seul porte aussi « parties » (prose, étapes, puces) et « signaux ».

Un autre script peut appeler `mesure(texte)`, qui mesure un texte ou un seul paragraphe, et `analyse(texte)`, qui rend
les mesures par partie et les signaux. `blocs(texte)` donne les paragraphes avec leur genre et leur ligne.
"""
import json
import os
import re
import statistics
import sys

# Les mots de liaison parlés, comptés comme dans les notes de l'audit (L5) pour garder les repères comparables. « si »
# compte « si » et « s'il », jamais le « s' » de « s'endort » ; « comme » compte en tête de phrase et après « et »,
# « mais », « puis » ou « alors » (« Et comme il se répand… »), pas « comme » qui compare au milieu d'une phrase.
LIAISONS = {
    "parce que": r"\bparce qu(?:e\b|')", "car": r"\bcar\b", "donc": r"\bdonc\b", "alors": r"\balors\b",
    "comme": r"(?:^[\s«\"(]*|\b(?:et|mais|puis|alors)\s+)comme\b", "puis": r"\bpuis\b", "ensuite": r"\bensuite\b",
    "mais": r"\bmais\b", "sinon": r"\bsinon\b", "pour que": r"\bpour qu(?:e\b|')", "quand": r"\bquand\b",
    "si": r"\bsi\b|\bs'ils?\b", "et": r"\bet\b", "ce qui / ce que": r"\bce qu(?:i\b|e\b|')", "c'est": r"\bc'est\b",
}
PARLEES = ("parce que", "donc", "alors", "comme", "puis", "ensuite", "mais", "sinon", "pour que", "car")
# Les mots qui disent un rapport entre deux faits (skill ecriture, P5). Un paragraphe de quatre phrases qui n'en a
# aucun se relit.
LIENS = re.compile(
    r"\b(?:parce qu|car\b|comme\b|donc\b|alors\b|c'est pour ça qu|ce qui fait qu|quand\b|lorsqu|si\b|s'ils?\b|"
    r"sinon\b|mais\b|puis\b|ensuite\b|pour qu|pour (?:ne |n')?[a-zà-ÿ]+(?:er|ir|re|oir)\b|jusqu'à ce qu|tant qu|"
    r"dès qu|pendant qu|avant (?:de\b|d'|qu)|après\b|sauf\b|une fois\b|même si\b|sans\b|au lieu d)", re.I)
# L'attaque liée, quand la phrase commence par un mot de lien ou de temps. On la garde pour comparer, mais ce n'est
# pas un signal.
ATTAQUE = re.compile(r"^[\s«\"(]*(?:quand|si|s'ils?|puis|mais|alors|après|avant|lorsqu|et|donc|sinon|comme|ensuite|"
                     r"parce|pour qu|dès|tant|pendant|car|même si|c'est pour ça)\b", re.I)
ABREV = r"(?:ch|p|env|etc|cf|No|no|art|min|max|vol|M|Mme|Dr|St|ex|approx|av|apr|J\.-C)"
MOT = r"[\wÀ-ÿ]+(?:['-][\wÀ-ÿ]+)*"
LIEU = re.compile(r"^\*\*(?:Maison|Chalet|Les deux)\.?\*\*$")
# L'étiquette en gras en tête de paragraphe, de six mots au plus, qui commence comme un nom ou une question
ETIQUETTE = re.compile(r"^\*\*((?:Le|La|Les|L'|Un|Une|Des|Ce|Ces|Cet|Cette|Comment|Quand|Si|Où|Pourquoi|Pour|Sans|"
                       r"Avec|Autre|À|Au|Aux|En|Dans|Sur|Sous|Chez|Après|Avant|Pendant)\b[^*]{0,50}?)[.:]\*\*\s*")
PARENTHESE_RENVOI = re.compile(r"^\s*(?:ch\.|chap|chapitres?\b|étapes?\b|sections?\b|planches?\b|p\.|pages?\b|tableau|"
                               r"voir\b|plus (?:bas|haut)|ci-dessous|logigramme|→)|\b(?:ch\.\s?\d|chapitres?\s\d|"
                               r"étapes?\s\d|sections?\s\d|planches?\s\d)", re.I)
UNITES_PAR = {"po", "pi", "pouce", "pouces", "pied", "pieds", "livre", "livres", "lb", "once", "onces", "oz",
              "tasse", "tasses", "gallon", "gallons", "pinte", "pintes", "env", "environ", "soit", "verge", "verges"}


# ------------------------------------------------------------------------------------------------ le texte en blocs

class Bloc:
    """Un paragraphe du fichier : son genre (prose, etape, puce, tableau, titre, note, autre), la ligne où il
    commence, sa section (titre ##) et sa sous-section (titre ###), s'il est dans une série orange, le texte brut
    et le texte nettoyé."""
    def __init__(self, genre, ligne, section, sous_section, sous_etape=False, orange=False):
        self.genre, self.ligne, self.section, self.sous_section = genre, ligne, section, sous_section
        self.sous_etape, self.orange = sous_etape, orange
        self.lignes = []
        self.fin = ligne

    @property
    def brut(self):
        return "\n".join(self.lignes)

    @property
    def texte(self):
        return nettoie_bloc(self.brut)


def _sans_commentaires(t):
    # les commentaires HTML et les blocs de code sortent, mais on garde les sauts de ligne pour les numéros de ligne
    blanc = lambda m: "\n" * m.group(0).count("\n")
    t = re.sub(r"<!--.*?-->", blanc, t, flags=re.S)
    return re.sub(r"```.*?```", blanc, t, flags=re.S)


def titre_propre(t):
    t = re.sub(r"\{[.!>][^}]*\}", "", t)
    return re.sub(r"\*\*|\*|`", "", t).strip(" #")


def blocs(texte):
    """Découpe le markdown en blocs, avec la ligne où chacun commence (comptée à partir de 1)."""
    out, cur = [], None
    section = sous = ""
    orange = False              # sous un titre ### {.orange …}
    dans_etape = False          # une puce en retrait sous une étape est une sous-étape

    def ferme():
        nonlocal cur
        if cur is not None and cur.lignes:
            out.append(cur)
        cur = None

    for i, l in enumerate(_sans_commentaires(texte).split("\n"), 1):
        l = re.sub(r"^\s*>\s?", "", l) if re.match(r"^\s*>", l) else l      # une citation en retrait se lit aussi
        s = l.strip()
        if not s:
            ferme()
            continue
        m = re.match(r"^(#{1,6})\s+(.*)$", s)
        if m:
            ferme()
            niveau = len(m.group(1))
            if niveau == 2:
                section, sous, dans_etape, orange = titre_propre(m.group(2)), "", False, False
            elif niveau >= 3:
                sous, orange = titre_propre(m.group(2)), "{.orange" in m.group(2)
            b = Bloc("titre", i, section, sous)
            b.lignes.append(s)
            b.niveau = niveau
            out.append(b)
            continue
        if re.match(r"^-{3,}$|^\*{3,}$|^_{3,}$", s):
            ferme()
            dans_etape = False
            continue
        if s.startswith("|"):
            if cur is None or cur.genre != "tableau":
                ferme()
                cur = Bloc("tableau", i, section, sous)
            cur.lignes.append(s)
            cur.fin = i
            continue
        if re.match(r"^\[\^[^\]]+\]:", s):
            ferme()
            cur = Bloc("note", i, section, sous)
            cur.lignes.append(s)
            cur.fin = i
            continue
        if re.match(r"^!\[[^\]]*\]\([^)]*\)\s*$", s) or s.startswith("<"):
            ferme()
            continue
        retrait = len(l) - len(l.lstrip(" \t"))
        num = re.match(r"^\d+[.)]\s+", s)
        puce = re.match(r"^[-*+]\s+", s)
        if num:
            ferme()
            sous_etape = retrait > 0 and dans_etape
            cur = Bloc("etape", i, section, sous, sous_etape, orange)
            if not sous_etape:
                dans_etape = True
            cur.lignes.append(s)
            cur.fin = i
            continue
        if puce:
            ferme()
            if retrait > 0 and dans_etape:
                cur = Bloc("etape", i, section, sous, True, orange)
            else:
                cur = Bloc("puce", i, section, sous)
                dans_etape = False
            cur.lignes.append(s)
            cur.fin = i
            continue
        if cur is None or cur.genre in ("tableau", "titre"):
            ferme()
            if LIEU.match(s) or re.match(r"^\*Tome \d", s):
                b = Bloc("autre", i, section, sous)
                b.lignes.append(s)
                out.append(b)
                continue
            if retrait > 0 and dans_etape:
                cur = Bloc("etape", i, section, sous, True, orange)   # un alinéa de plus dans l'étape
            else:
                cur = Bloc("prose", i, section, sous)
                dans_etape = False
        cur.lignes.append(s)
        cur.fin = i
    if cur is not None and cur.lignes:
        out.append(cur)
    return out


def nettoie_bloc(t):
    t = t.replace("’", "'").replace(" ", " ").replace(" ", " ")
    t = re.sub(r"^\[\^[^\]]+\]:\s*", "", t)                       # texte d'une note
    t = re.sub(r"^(?:[-*+]|\d+[.)])\s+", "", t)                   # puce ou numéro d'étape
    t = re.sub(r"\s*\(\{>[\w-]+\}\)", "", t)                      # renvoi à une page de danger entre parenthèses
    t = re.sub(r"\{[!>][\w-]+\}\s*", "", t)                        # pictogrammes et renvois
    t = t.lstrip()
    m = ETIQUETTE.match(t)                                         # « **Ce qui arrive.** », « **Le corps.** »
    if m and len(mots(m.group(1))) <= 6:
        t = t[m.end():]
    t = re.sub(r"^(\*\*[^*]+\*\*)\s*:", r"\1,", t)                  # « **Montre à pile** : » annonce
    t = re.sub(r"\[\^\w+\]", "", t)                               # appels de note
    t = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", t)                    # images
    t = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", t)                 # liens
    t = re.sub(r"\*\*|__|\*|`", "", t)
    t = re.sub(r"(\d)\s?:\s?(\d)", r"\1h\2", t)                    # 12:30, 1:10
    return re.sub(r"\s+", " ", t).strip()


def nettoie(t):
    """Le texte mesurable d'un fichier, paragraphe par paragraphe (gardé pour les scripts qui s'en servaient)."""
    return "\n\n".join(b.texte for b in blocs(t) if b.genre in ("prose", "etape", "puce"))


def paragraphes(t):
    return [p for p in re.split(r"\n\s*\n", t) if p.strip()]


def phrases(par):
    p = re.sub(r"\b(" + ABREV + r")\.", r"\1§", par)
    p = re.sub(r"(\d)\.(\d)", r"\1§\2", p)
    morceaux = re.split(r"(?<=[.!?…])\s+(?=[«\"(A-ZÀ-ÖØ-Þ0-9])", p)
    return [m.replace("§", ".").strip() for m in morceaux if re.search(r"[\wÀ-ÿ]", m)]


def mots(s):
    return re.findall(MOT, s)


# ------------------------------------------------------------------------------------------------ les mesures

def fait_csq(s):
    """« fait : conséquence » : deux propositions de 4 mots et plus de part et d'autre du deux-points, la seconde
    n'étant pas une liste (au moins deux virgules, et 3 mots ou moins entre elles)."""
    for i in [m.start() for m in re.finditer(":", s)]:
        avant, apres = s[:i], s[i + 1:].split(":")[0]
        if len(mots(avant)) < 4 or len(mots(apres)) < 4:
            continue
        bouts = [b for b in re.split(r",|\bet\b|\bou\b", apres) if b.strip()]
        if len(bouts) >= 3 and statistics.mean(len(mots(b)) for b in bouts) <= 3:
            continue
        return True
    return False


def parentheses(s):
    """(toutes, hors renvois) : un renvoi, une unité ou l'impérial ne compte pas dans la seconde."""
    hors = 0
    for c in re.findall(r"\(([^()]*)\)", s):
        if PARENTHESE_RENVOI.search(c):
            continue
        lettres = [w.lower() for w in re.findall(r"[A-Za-zÀ-ÿ]{2,}", c)]
        if all(w in UNITES_PAR for w in lettres):
            continue
        hors += 1
    return s.count("("), hors


def liens(s):
    return bool(LIENS.search(s))


def unites(s):
    return [u for u in re.split(r"[,;:.!?()«»…]", s) if mots(u)]


def mesure_phrases(S):
    """Les mesures d'une suite de phrases nettoyées. None s'il n'y a aucune phrase."""
    L = [len(mots(s)) for s in S]
    S = [s for s, n in zip(S, L) if n > 0]
    L = [n for n in L if n > 0]
    if not L:
        return None
    nmots = sum(L)
    k1000 = 1000 / nmots
    paires = list(zip(L, L[1:]))
    mono = sum(1 for a, b in paires if abs(a - b) <= max(2, 0.2 * max(a, b))) / len(paires) if paires else 0

    def premier(s):
        m = mots(s)
        return m[0].lower() if m else ""
    debuts = list(zip(S, S[1:]))
    meme_debut = sum(1 for a, b in debuts if premier(a) and premier(a) == premier(b)) / len(debuts) if debuts else 0
    deux_points = sum(s.count(":") for s in S)
    ph_dp = sum(1 for s in S if ":" in s)
    fcsq = sum(1 for s in S if fait_csq(s))
    pv = sum(s.count(";") for s in S)
    par = [parentheses(s) for s in S]
    nunites = sum(len(unites(s)) for s in S)
    liaisons = {k: sum(len(re.findall(rx, s, re.I)) for s in S) for k, rx in LIAISONS.items()}
    parle = sum(liaisons[k] for k in PARLEES)
    moy = statistics.mean(L)
    return {
        "mots": nmots, "phrases": len(L),
        "mots_par_phrase": round(moy, 1), "mediane": statistics.median(L),
        "ecart_type": round(statistics.pstdev(L), 1),
        "variation": round(statistics.pstdev(L) / moy, 2),
        "phrases_courtes_le_6": round(100 * sum(1 for x in L if x <= 6) / len(L), 1),
        "phrases_longues_ge_30": round(100 * sum(1 for x in L if x >= 30) / len(L), 1),
        "phrases_10_a_30": round(100 * sum(1 for x in L if 10 <= x <= 30) / len(L), 1),
        "phrases_ge_40": sum(1 for x in L if x >= 40),
        "monotonie": round(100 * mono, 1),
        "meme_premier_mot": round(100 * meme_debut, 1),
        "attaque_liee": round(100 * sum(1 for s in S if ATTAQUE.search(s)) / len(L), 1),
        "deux_points_pour_1000": round(deux_points * k1000, 1),
        "phrases_avec_deux_points": round(100 * ph_dp / len(L), 1),
        "fait_deux_points_consequence": round(100 * fcsq / len(L), 1),
        "points_virgules_pour_1000": round(pv * k1000, 1),
        "parentheses_pour_1000": round(sum(a for a, _ in par) * k1000, 1),
        "parentheses_hors_renvois_pour_1000": round(sum(b for _, b in par) * k1000, 1),
        "mots_par_unite": round(nmots / nunites, 1) if nunites else 0,
        "liaisons_parlees_pour_1000": round(parle * k1000, 1),
        "mais_pour_1000": round(liaisons["mais"] * k1000, 2),
        "alors_pour_1000": round(liaisons["alors"] * k1000, 2),
        "liaisons_pour_1000": {k: round(v * k1000, 2) for k, v in liaisons.items()},
        "liaisons": liaisons,
    }


def mesure(texte):
    """Mesure un texte markdown (un fichier ou un paragraphe). None s'il n'a aucune phrase."""
    return mesure_phrases([s for b in blocs(texte) if b.genre in ("prose", "etape", "puce") for s in phrases(b.texte)])


# ------------------------------------------------------------------------------------------------ les signaux

def debut(b, n=12):
    """Les n premiers mots du paragraphe, avec leur ponctuation."""
    t = b.texte
    m = list(re.finditer(MOT, t))
    if len(m) <= n:
        return t
    return t[:m[n - 1].end()] + " …"


def virgule(x):
    return str(x).replace(".", ",")


def signaux_bloc(b, S):
    sig = []
    for s in S:
        n = len(mots(s))
        if n >= 40:
            sig.append(f"phrase de {n} mots (le verbe vient-il avant la liste ?)")
        if s.count(":") >= 2:
            sig.append(f"{s.count(':')} deux-points dans une phrase")
    for a, c in zip(S, S[1:]):
        if fait_csq(a) and fait_csq(c):
            sig.append("deux « fait : conséquence » de suite")
            break
    if len(S) >= 4 and not any(liens(s) for s in S):
        sig.append(f"{len(S)} phrases sans aucun mot de lien")
    if b.genre in ("prose", "note"):
        dp = sum(s.count(":") for s in S)
        if dp >= 2 and not any(s.count(":") >= 2 for s in S):
            sig.append(f"{dp} deux-points dans le paragraphe (un au plus)")
    return sig


def analyse(texte):
    """Les mesures par partie, les blocs, et les signaux par paragraphe, par section et pour le chapitre."""
    B = [b for b in blocs(texte) if b.genre in ("prose", "etape", "puce")]
    par_bloc = [(b, phrases(b.texte)) for b in B]
    parties = {}
    for nom, genres in (("prose", ("prose",)), ("etapes", ("etape",)), ("puces", ("puce",))):
        m = mesure_phrases([s for b, S in par_bloc if b.genre in genres for s in S])
        if m:
            parties[nom] = m
    tout = mesure_phrases([s for _, S in par_bloc for s in S])
    paragraphes_ = []
    for b, S in par_bloc:
        sig = signaux_bloc(b, S)
        if sig:
            paragraphes_.append({"ligne": b.ligne, "genre": b.genre, "section": b.section, "debut": debut(b),
                                 "signaux": sig})
    sections = []
    ordre = []
    for b, S in par_bloc:
        if b.section not in ordre:
            ordre.append(b.section)
    for sec in ordre:
        Ssec = [s for b, S in par_bloc if b.section == sec for s in S]
        Sprose = [s for b, S in par_bloc if b.section == sec and b.genre == "prose" for s in S]
        nf = sum(1 for s in Ssec if fait_csq(s))
        if nf >= 2 and nf / len(Ssec) > 0.10:
            sections.append(f"{sec or 'avant la première section'} : {round(100 * nf / len(Ssec))} % de phrases "
                            f"« fait : conséquence » ({nf} sur {len(Ssec)} ; on relit au-dessus de 10 %)")
        nd = sum(1 for s in Sprose if ":" in s)
        if Sprose and nd >= 2 and nd / len(Sprose) > 0.15:
            sections.append(f"{sec or 'avant la première section'}, prose : {round(100 * nd / len(Sprose))} % de "
                            f"phrases avec un deux-points ({nd} sur {len(Sprose)} ; on relit au-dessus de 15 %)")
    chapitre = []
    if tout:
        if tout["phrases"] >= 20 and tout["phrases_10_a_30"] > 65:
            chapitre.append(f"{virgule(tout['phrases_10_a_30'])} % des phrases font de 10 à 30 mots (on relit "
                            f"au-dessus de 65 %)")
        if tout["phrases"] >= 20 and tout["variation"] < 0.55:
            chapitre.append(f"variation des longueurs à {virgule(tout['variation'])} (on relit le souffle sous 0,55)")
    p = parties.get("prose")
    if p and p["mots"] >= 500 and p["liaisons_parlees_pour_1000"] < 6:
        chapitre.append(f"prose : {virgule(p['liaisons_parlees_pour_1000'])} mots de liaison parlés pour 1000 mots "
                        f"(on relit sous 6)")
    # 1000 mots de prose de suite sans un « mais »
    suite, depart, fin_ = 0, None, None
    def ferme_suite():
        if suite >= 1000:
            chapitre.append(f"prose : {suite} mots de suite sans « mais », de la l. {depart} à la l. {fin_}")
    for b, S in par_bloc:
        if b.genre != "prose":
            continue
        for s in S:
            if re.search(r"\bmais\b", s, re.I):
                ferme_suite()
                suite, depart = 0, None
            else:
                suite += len(mots(s))
                depart = depart or b.ligne
                fin_ = b.fin
    ferme_suite()
    return {"tout": tout, "parties": parties,
            "signaux": {"paragraphes": paragraphes_, "sections": sections, "chapitre": chapitre}}


# ------------------------------------------------------------------------------------------------ la sortie

COLS = [("mots", "mots"), ("phrases", "phr."), ("mots_par_phrase", "m/phr"), ("variation", "var."),
        ("phrases_courtes_le_6", "≤6 %"), ("phrases_longues_ge_30", "≥30 %"), ("phrases_10_a_30", "10 à 30 %"),
        ("phrases_ge_40", "≥40"), ("phrases_avec_deux_points", "« : » %"),
        ("fait_deux_points_consequence", "fait:csq %"), ("points_virgules_pour_1000", ";/1000"),
        ("parentheses_pour_1000", "()/1000"), ("parentheses_hors_renvois_pour_1000", "() hors renvois/1000"),
        ("liaisons_parlees_pour_1000", "liais./1000"), ("mais_pour_1000", "mais/1000"),
        ("alors_pour_1000", "alors/1000"), ("mots_par_unite", "mots/unité")]
NOMS_PARTIES = {"prose": "prose", "etapes": "étapes", "puces": "puces"}


def fichiers(chemins):
    for c in chemins:
        if os.path.isdir(c):
            for f in sorted(os.listdir(c)):
                if f.endswith((".md", ".txt")):
                    yield os.path.join(c, f)
        else:
            yield c


def ligne_tableau(nom, m, extra=None):
    cases = [str(m[k]).replace(".", ",") if isinstance(m[k], float) else str(m[k]) for k, _ in COLS]
    if extra is not None:
        cases.append(str(extra))
    return f"| {nom} | " + " | ".join(cases) + " |"


def affiche_signaux(nom, sig):
    P, Sx, Ch = sig["paragraphes"], sig["sections"], sig["chapitre"]
    print(f"\n## {nom} : paragraphes à relire d'abord ({len(P)})\n")
    if not P:
        print("  aucun")
    genres = {"prose": "prose", "etape": "étape", "puce": "puce", "note": "note"}
    for p in P:
        print(f"  l.{p['ligne']} ({genres.get(p['genre'], p['genre'])}, {p['section'] or 'en tête'}) "
              f"« {p['debut']} » : " + " ; ".join(p["signaux"]))
    print(f"\n## {nom} : sections et chapitre ({len(Sx) + len(Ch)})\n")
    if not Sx and not Ch:
        print("  aucun signal")
    for s in Sx + Ch:
        print(f"  {s}")


def main():
    a = [x for x in sys.argv[1:] if not x.startswith("--")]
    if not a:
        sys.exit(__doc__)
    par_fichier = "--par-fichier" in sys.argv
    liste = list(fichiers(a))
    seul = len(liste) == 1
    avec_signaux = seul or "--signaux" in sys.argv
    res, analyses, toutes = {}, {}, []
    for f in liste:
        t = open(f, encoding="utf-8").read()
        an = analyse(t)
        analyses[os.path.basename(f)] = an
        toutes.append(t)
        if par_fichier and an["tout"]:
            m = dict(an["tout"])
            m["parties"] = an["parties"]
            m["signaux"] = an["signaux"]
            res[os.path.basename(f)] = m
    # L'ensemble mesure les phrases de tous les fichiers, chaque fichier découpé à part.
    def ensemble(genres):
        S = [s for t in toutes for b in blocs(t) if b.genre in genres for s in phrases(b.texte)]
        return mesure_phrases(S)
    ens = ensemble(("prose", "etape", "puce"))
    if ens:
        ens = dict(ens)
        ens["parties"] = {k: v for k, v in (("prose", ensemble(("prose",))), ("etapes", ensemble(("etape",))),
                                            ("puces", ensemble(("puce",)))) if v}
        if seul:
            ens["signaux"] = next(iter(analyses.values()))["signaux"]
    res["ENSEMBLE"] = ens
    if "--json" in sys.argv:
        print(json.dumps(res, ensure_ascii=False, indent=1))
        return
    entete = [c for _, c in COLS] + (["¶ à relire"] if par_fichier else [])
    print("| texte | " + " | ".join(entete) + " |")
    print("| --- " * (len(entete) + 1) + "|")
    for nom, m in res.items():
        if not m:
            continue
        if nom == "ENSEMBLE":
            print(ligne_tableau(nom, m, "" if par_fichier else None))
            for k, v in m.get("parties", {}).items():
                print(ligne_tableau(f"{nom} · {NOMS_PARTIES[k]}", v, "" if par_fichier else None))
        else:
            print(ligne_tableau(nom, m, len(m["signaux"]["paragraphes"])))
    if avec_signaux:
        for nom, an in analyses.items():
            affiche_signaux(nom, an["signaux"])


if __name__ == "__main__":
    main()
