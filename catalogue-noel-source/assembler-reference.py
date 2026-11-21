import json, os, sys

D = "/tmp/claude-0/-home-user-book/cb220ab1-a615-5cba-b429-4b85a382651f/scratchpad/catalogue"
items = []
for f in ("lego.json", "autres.json", "lego2.json", "batir2.json", "autres2.json", "lego3.json", "batir3.json", "figurines3.json", "jeux3.json", "art4.json", "dehors4.json", "teleguides5.json", "jeux6.json", "livres6.json", "lego6.json", "teleguides7.json", "cool7.json", "dehors7.json", "batir7.json", "hotwheels7.json", "jouer7.json", "art7.json", "deuxans7.json", "deuxans-moteur.json", "deuxans-educ.json", "deuxans-cool.json", "deuxans-livres.json", "deuxans-bain.json", "deuxans-peluches.json", "deuxans-musique.json", "deuxans-art.json", "deuxans-vehicules.json", "deuxans-role.json", "papa.json", "deuxans-qc-livres.json", "deuxans-qc-apprendre.json", "deuxans-qc-beaux.json", "grands-cool.json", "grands-teleguides.json", "papa2.json", "papa3.json", "retro.json", "grands-qualite.json", "grands-billes.json", "grands-magie.json"):
    p = os.path.join(D, f)
    if os.path.exists(p):
        items += json.load(open(p))
REMAP = {"construction": "batir", "hot-wheels-piste": "autos", "paw-patrol-chase": "jouer", "hoot-owl-hoot": "jeux",
         "argile-dinos": "art", "walkie-talkies": "dehors", "crazy-carpet": "dehors", "playmobil-chantier": "figurines", "brio-dinos": "jouer"}
GROS_OK = {"bruder-pelle", "magna-tiles-62", "lego-11045", "lego-11203"}
NOUVEAUX_LEGO6 = {i["id"] for i in json.load(open(os.path.join(D, "lego6.json")))} if os.path.exists(os.path.join(D, "lego6.json")) else set()
NOUVEAUX_LEGO = {i["id"] for i in json.load(open(os.path.join(D, "lego3.json")))}
RETIRER = {"bruder-pelle", "b-bruder-bouteur", "b-bruder-chariot", "c-bruder-chargeuse", "c-bruder-compacteur", "c-bruder-john-deere",
           "c-bruder-motoneige", "c-bruder-massey", "b-green-recyclage", "b-green-benne", "c-green-pompier", "c-battat-betonniere",
           "b-john-deere-chargeur", "b-dickie-volvo-3", "c-dickie-pompier-volvo", "c-dickie-transporteur-chantier", "c-dickie-micro-chantier",
           "c-btoys-mini-monstres", "lego-42200", "lego-42219", "b-driven-transporteur", "cat-mini-machines"}
BOIS = {"coco-blocs-bois", "b-coco-pelleteuse", "o-trousse-docteur", "c-boite-outils-bois", "c-playstix", "c-cubes-village",
        "c-coco-depanneuse", "c-transporteur-voitures-bois", "c-brio-train-depart", "f-janod-fruits-legumes", "f-boutique-glaces",
        "f-veterinaire-chien", "g-domino-betes", "a4-perles-chat", "d4-outils-jardin", "t5-train-brio"}
CHEAP_RC = {"b-dickie-grue", "b-pompiers-a-construire", "b-driven-depanneuse-rc", "c-monster-jam-rc", "c-cybertruck-rc",
            "t5-yacht-sea-cruiser", "t5-kotaro-amphibien", "t5-pompier-visseuse", "t5-police-visseuse", "t5-chantier-visseuse",
            "t5-micro-benne", "t5-ford-puma", "t5-duo-course", "t5-drift-tornade", "t5-aston-hot-wheels", "t5-requin-volant",
            "t5-avion-koo", "t5-octobot", "t5-robo-blast", "t5-dilophosaure", "t5-entraine-dino", "t5-mygale", "t5-gecko",
            "t5-chien-jiggo", "t5-autos-choc-dinos", "t5-abeille-beatrice", "t5-bolide-debutant", "t5-orignal-moto", "t5-motodrift"}
MULTIPIECES = {"yr-chariot-epicerie", "yr-panier-marche", "yr-planche-chop2pot", "yr-marche-frais", "yr-tacos", "yr-coffre-outils",
               "yr-ceinture-outils", "yr-the-musical", "yr-the-silicone", "yr-valise-docteur", "yr-sac-a-main", "yr-coiffure",
               "yr-accessoires-poupee", "yr-sac-a-langer", "yr-porte-bebe", "ye-gateaux-formes", "ye-cornets-arc-en-ciel", "ye-bonbons-abc",
               "ye-dinos-jumeler", "ye-sports-shapers", "ye-tortues-chiffres", "ye-max-orignal", "ye-spike", "ye-tableau-chevilles",
               "ye-bristle-blocks", "ye-vis-ecrous", "yc-b-medecin", "yc-outils-animaux", "yc-salade-bain", "yb-limonade", "yb-mousseur",
               "yb-camion-plage", "ys-dj-farmstand"}
SCRAP = {"yp-corolle-bebe-calin", "yp-corolle-mini", "yp-babyborn-cozy", "yp-smoby-poussette", "yp-kaloo-marionnette", "yp-pokemon-peluche",
         "yp-aurora-peppa", "yr-telephone-animaux", "yr-tablette-vtech", "yr-aspirateur-battat", "yr-aspirateur-fp", "yr-tasse-cafe", "yr-cellulaire",
         "ys-piano-girafe", "ys-tourne-disque", "ys-rouli-xylophone", "ys-micro-popstar", "ys-tambour-pixel", "ys-trompette-pixelz",
         "ys-tonie-lalalinos", "ys-tonie-doudou-jaguar", "yv-kidoozie-avion", "yv-kidoozie-police", "yc-peek-eggs", "ym-panier-basket",
         "yb-table-sable", "ym-licorne", "y7-multisport", "y7-ordi-tablette", "ye-vtech-bureau", "yv-tut-garage", "yv-tut-cascades", "yv-tut-tour",
         "yv-tut-police", "yv-tut-helico", "yv-tut-ambulance", "yc-tut-caserne", "yv-vtech-transporteur", "yv-vtech-train", "yv-vtech-avion",
         "yv-vtech-bulldozer", "y7-bulldozer", "yc-roultrain", "yc-photo-vtech", "yv-smoby-garage", "yv-lp-barbie", "yb-hippo", "yb-mini-bac",
         "yb-tondeuse-bulles", "yb-jet-duck", "ya-ardoise-lcd", "ye-play-doh-mallette", "ye-conector-bebe",
         # ce que les parents fournissent
         "ya-couvre-tout", "d4-casque-velo", "d4-protections", "d4-lunettes-ski"}
GENERIQUE = {"k7-cible-collante", "k7-popper", "k7-baguette-lumineuse", "k7-casque-chat", "k7-roue-gyro", "k7-stylos-glow",
             "f-caisse-enregistreuse", "p7-smoby-bbq", "p7-mallette-medicale", "p7-menottes", "p7-protection-stanley", "f-bluey-panier",
             "p7-cremerie", "p7-camion-restaurant", "d4-chauffe-mains", "d4-billes-rayons", "d4-gant-attrape", "d4-baseball", "d4-nichoir",
             "d4-maison-abeilles", "d4-corde-danser", "d4-chariot-plage", "g-bazooka-bulles", "e7-pogo", "e7-but-soccer", "e7-petanque",
             "e7-jazzminton", "e7-avion-lumineux", "e7-bonhomme-kit", "e7-arc", "e7-lanceur-disques", "a4-gouache-batons", "a4-filet-papillons",
             "a4-globe", "a4-hotel-insectes", "c-camion-ordures-metal", "c-stanley-bulldozer", "c-stanley-chargeur", "b-ceinture-stanley",
             "b-tuiles-chantier", "b-mix-match-chantier", "c-build-a-truck", "c-blocs-magnetiques", "b7-picasso-course", "b7-picasso-fusee",
             "b7-tuiles-pompier", "b7-plaque-dragon", "c-pailles-connecteurs", "b-galt-billes", "c-mosaique-visser", "h7-maker-kitz-sachet"}
def _liste(nom):
    p = os.path.join(D, nom)
    return {l.split()[0] for l in open(p) if l.strip() and not l.startswith("#")} if os.path.exists(p) else set()
PERCEUSE = MULTIPIECES | SCRAP | GENERIQUE | _liste("livres-pas-qc.txt") | _liste("teleguides-generiques.txt") | _liste("deguisements-dehors-a-retirer.txt") | _liste("retires-divers.txt") | {"b-battat-grue", "yc-bluey-chantier", "t7-char-type-90", "d4-filet-papillons", "yc-waterworks", "yv-lp-pompiers", "yc-lp-ferme", "b7-stanley-5-outils", "yr-bureau-vtech", "lego-42199", "lego-60402", "c-hw-maker-kitz", "t5-torque-twister", "t5-rouleau-cascades", "ya-crayola-touch-lights"}
TELE = {"b-dickie-grue", "b-pompiers-a-construire", "b-driven-depanneuse-rc", "c-monster-jam-rc", "c-cybertruck-rc"}
NATUREL = {"y7-cozy-coupe": "d2-bouger", "y7-glissoire": "d2-bouger", "y7-table-eau": "d2-bain", "y7-micro-mini": "d2-bouger",
           "y7-draisienne": "d2-bouger", "y7-lp-ferme": "d2-vehicules", "y7-mega-bloks": "d2-apprendre", "y7-spinagain": "d2-apprendre",
           "y7-jardin-formes": "d2-apprendre", "y7-waterworks": "d2-bain", "y7-labo-eau": "d2-bain", "y7-lp-pompiers": "d2-vehicules",
           "y7-corn-popper": "d2-bouger", "y7-telephone": "d2-semblant", "y7-crayola-lumiere": "d2-art", "y7-tambour-poule": "d2-musique",
           "y7-xylophone": "d2-musique", "y7-tunnel": "d2-bouger", "y7-casse-tete": "d2-apprendre", "y7-jellycat-lapin": "d2-calins",
           "y7-gund-outils": "d2-semblant", "y7-placote-de": "d2-apprendre", "y7-bateau-peche": "d2-bain", "y7-bilibo": "d2-bouger",
           "y7-jelly-tracteur": "d2-apprendre", "y7-gobelets": "d2-apprendre", "y7-livre-animaux": "d2-livres",
           "yc-lp-autobus": "d2-vehicules", "yc-lp-camion-benne": "d2-vehicules", "yc-b-garage": "d2-vehicules", "yc-b-transporteur": "d2-vehicules",
           "yc-xylo-renard": "d2-musique", "yc-b-tambour": "d2-musique", "yc-micro-okidokee": "d2-musique", "yc-funkeys": "d2-semblant",
           "yc-water-lab": "d2-bain", "yc-boon-tuyaux": "d2-bain", "yc-twilight-chevreuil": "d2-calins", "yc-munchkin-etoile": "d2-bain",
           "y7-qc-placote-tour-consignes": "d2-apprendre", "y7-qc-vst-ours-noisette": "d2-calins", "y7-qc-viking-benne": "d2-vehicules", "y7-qc-b-gogo-lolo": "d2-bouger"}
RETRO = _liste("retro-deplacer.txt")
COUPS = _liste("coups-grands.txt") | _liste("coups-1an.txt")
ok = []
vus = set()
for it in items:
    import re as _re
    cle_nom = _re.sub(r"[^a-z0-9]", "", (it.get("marque","") + it.get("nom","")).lower())
    if cle_nom in vus:
        print("DOUBLON NOM:", it["id"], file=sys.stderr); continue
    vus.add(cle_nom)
    if it["id"] in vus:
        print("DOUBLON:", it["id"], file=sys.stderr); continue
    vus.add(it["id"])
    if it["id"] in REMAP: it["categorie"] = REMAP[it["id"]]
    elif it.get("categorie") in REMAP: it["categorie"] = REMAP[it["categorie"]]
    if it["id"].startswith("lego-") and not it.get("categorie"):
        it["categorie"] = "duplo" if "DUPLO" in it.get("marque", "").upper() else "lego"
    if "coco village" in (it.get("marque") or "").lower() or "coco studio" in (it.get("marque") or "").lower():
        if it["id"].startswith(("y", "k7-", "e7-", "p7-", "r7-", "b7-")): continue
    if "green toys" in (it.get("marque") or "").lower():
        continue
    if it["id"].startswith("h7-") and "monster" in (it.get("nom","") + it.get("marque","")).lower():
        continue
    if it["id"] in RETIRER or it["id"] in BOIS or it["id"] in CHEAP_RC or it["id"] in PERCEUSE:
        continue
    if it["id"] in TELE: it["categorie"] = "teleguides"
    if it.get("categorie") == "camions": it["categorie"] = "autos"
    SOUS2 = {"y7-": "d2-coups", "yc-": "d2-coups", "ym-": "d2-bouger", "ye-": "d2-apprendre", "yl-": "d2-livres", "yb-": "d2-bain",
             "yp-": "d2-calins", "ys-": "d2-musique", "ya-": "d2-art", "yv-": "d2-vehicules", "yr-": "d2-semblant"}
    for pre, cat in SOUS2.items():
        if it["id"].startswith(pre): it["categorie"] = cat
    # les coups de cœur du tout-petit retournent dans leur rayon ; seuls ceux de la liste choisie restent en tête
    if it.get("categorie") == "d2-coups": it["categorie"] = NATUREL.get(it["id"], "d2-apprendre")
    if it["id"].startswith("yz-"): it["categorie"] = "d2-retro"
    if it["id"] in RETRO: it["categorie"] = "d2-retro" if it["categorie"].startswith("d2-") else "retro"
    if it["id"] in COUPS: it["categorie"] = "d2-coups" if it["categorie"].startswith("d2-") else "coups"
    if it.get("categorie") == "figurines":
        continue
    if it.get("categorie") == "duplo" or "DUPLO" in (it.get("marque") or "").upper():
        continue
    if it["id"].startswith("zz-"):
        pass
    elif isinstance(it.get("prix"), (int, float)) and (it["prix"] > 150 or (it["prix"] > 80 and not it["id"].startswith(("t7-", "k7-", "e7-", "b7-", "h7-", "p7-", "r7-", "k8-", "t8-", "p8-", "h8-", "r9-", "yz-", "p9-", "e9-", "b9-", "k9-", "y7-", "ym-", "ye-", "yc-", "yl-", "yb-", "yp-", "ys-", "ya-", "yv-", "yr-"))) or (it["prix"] > 50 and it["id"] not in GROS_OK and not it["id"].startswith(("c-", "f-", "g-", "a4-", "d4-", "t5-", "j6-", "l6-", "t7-", "k7-", "e7-", "b7-", "h7-", "p7-", "r7-", "k8-", "t8-", "p8-", "h8-", "r9-", "yz-", "p9-", "e9-", "b9-", "k9-", "y7-", "ym-", "ye-", "yc-", "yl-", "yb-", "yp-", "ys-", "ya-", "yv-", "yr-")) and it["id"] not in NOUVEAUX_LEGO6 and it["id"] not in NOUVEAUX_LEGO)):
        continue
    img = os.path.join(D, it.get("img", ""))
    if not os.path.isfile(img):
        print("SANS IMAGE:", it.get("id"), file=sys.stderr)
        continue
    if not isinstance(it.get("prix"), (int, float)):
        print("SANS PRIX:", it.get("id"), file=sys.stderr)
        continue
    # âges : rien de 14+ ; pas de 8+ chez les 4-6 ans sauf les téléguidés (on les pilote avec papa) ; rien de 3+ chez les 2 ans
    import re as _r
    _m = _r.search(r"(\d+)", str(it.get("age", "")))
    _a = (int(_m.group(1)) / 12 if "mois" in str(it.get("age", "")) else int(_m.group(1))) if _m else None
    _c = it.get("categorie", "")
    if _a is not None and _c != "papa":
        if _a >= 14: continue
        if not _c.startswith("d2-") and _a >= 8 and _c != "teleguides": continue
        if _c.startswith("d2-") and _a >= 3: continue
    keep = {k: it.get(k) for k in ("id", "categorie", "marque", "nom", "age", "prix", "source", "url", "img", "ageCible", "accroche")}
    ok.append(keep)
# ---- planches d'images : 36 jouets par fichier, dans l'ordre des sections ----
from PIL import Image
ORDRE = ["retro", "coups", "lego", "batir", "teleguides", "autos", "cool", "jouer", "jeux", "livres", "art", "dehors",
         "d2-retro", "d2-coups", "d2-bouger", "d2-apprendre", "d2-vehicules", "d2-semblant", "d2-musique", "d2-art", "d2-bain", "d2-calins", "d2-livres", "papa"]
rang = {c: i for i, c in enumerate(ORDRE)}
import hashlib
# dans une même catégorie, un ordre mêlé mais toujours le même (pas par prix)
tri = sorted(ok, key=lambda it: (rang.get(it["categorie"], 99), hashlib.md5(("noel26" + it["id"]).encode()).hexdigest()))
ok = tri
CELL, N = 384, 6
os.makedirs(os.path.join(D, "planches"), exist_ok=True)
for f_old in os.listdir(os.path.join(D, "planches")):
    os.remove(os.path.join(D, "planches", f_old))
planches = []
for k in range(0, len(tri), N * N):
    lot = tri[k:k + N * N]
    rangs = -(-len(lot) // N)
    feuille = Image.new("RGB", (CELL * N, CELL * rangs), "white")
    nomp = "planches/p%02d.jpg" % (k // (N * N))
    for j, it in enumerate(lot):
        im = Image.open(os.path.join(D, it["img"])).convert("RGB")
        im.thumbnail((CELL - 8, CELL - 8), Image.LANCZOS)
        cx, cy = (j % N) * CELL, (j // N) * CELL
        ox, oy = cx + (CELL - im.width) // 2, cy + (CELL - im.height) // 2
        feuille.paste(im, (ox, oy))
        it["sp"] = [len(planches), ox, oy, im.width, im.height]
    feuille.save(os.path.join(D, nomp), quality=80, optimize=True, progressive=True)
    # le nom porte l'empreinte du contenu : une planche refaite a un nouveau nom, jamais une vieille copie en cache
    empreinte = hashlib.md5(open(os.path.join(D, nomp), "rb").read()).hexdigest()[:8]
    final = nomp.replace(".jpg", "-" + empreinte + ".jpg")
    os.replace(os.path.join(D, nomp), os.path.join(D, final))
    nomp = final
    planches.append(nomp)
for it in ok:
    it["img"] = planches[it["sp"][0]]
data = json.dumps(ok, ensure_ascii=False).replace("</", "<\\/")
html = open(os.path.join(D, "gabarit.html")).read().replace("/*PRODUITS*/", data)
open(os.path.join(D, "catalogue.html"), "w").write(html)
print(len(ok), "articles")
files = {p: os.path.join(D, p) for p in planches}
print(len(planches), "planches,", sum(os.path.getsize(os.path.join(D, p)) for p in planches) // 1024, "Ko")
json.dump(files, open(os.path.join(D, "files.json"), "w"), indent=0)
json.dump(ok, open(os.path.join(D, "produits.json"), "w"), ensure_ascii=False, indent=0)
