# BCCDC + Groupe de travail national sur les aliments fermentés — Section 3.5 (fesikh) et Section 1

- **Organisme :** Environmental Health Services, **BC Centre for Disease Control**, pour le
  **Fermented Foods Working Group** (groupe national FPT, MAPAQ membre)
- **Titres exacts :** *Safety of fermented foods* — **Section 3.5 Fesikh** (poisson salé fermenté)
  et **Section 1, Introduction to fermented food safety**
- **Auteurs section 3.5 :** N. Parto, R. Shalansky · **Section 1 :** L. McIntyre, A. Trmci
- **Dates affichées :** section 1, « June 2023, Updated April 2025 » · section 3.5, 2024
- **URL section 3.5 :** https://www.bccdc.ca/resource-gallery/Documents/Educational%20Materials/EH/FPS/Food/Fermented/Fermented%20Foods%20Guideline%20-%203.5%20Fesikh.pdf
- **URL section 1 :** https://www.bccdc.ca/resource-gallery/Documents/Educational%20Materials/EH/FPS/Food/Fermented/Fermented%20Foods%20Guideline%20-%20Section%201.pdf
- **Date de consultation :** 2026-09-20
- **Capture :** de première main, `curl` puis `pdftotext -layout`, HTTP 200
- **Sert au chapitre :** 77 — Fermentation (sections 2, 3, 8, 10)

---

## Pourquoi cette section est au dossier d'un chapitre sur les légumes

Parce qu'elle donne **le mécanisme chiffré** de la seule chose qui peut tuer dans ce chapitre :
la différence entre fermenter un légume et « fermenter » du poisson ou de la viande. Un lecteur
qui vient de réussir une choucroute se demandera, l'automne suivant, si le même geste s'applique
à une truite ou à un phoque. La réponse est non, et elle tient dans un seul nombre.

---

## Extraits intégraux, section 3.5 (fesikh), relevés le 2026-09-20

### Le chiffre qui ferme la porte

Diagramme des points de contrôle du fesikh, ligne du produit fini :

> « The final Aw must be <0.97 or lower, **with pH between 6 to 6.5**. »

**C'est-à-dire que le poisson fermenté ne s'acidifie pas.** Un chou fermenté descend à pH 3,2-3,4
(section 3.1) ; le poisson fermenté reste à 6 à 6,5, c'est-à-dire **très au-dessus du seuil de
4,6** sous lequel *Clostridium botulinum* ne pousse pas. Toute la protection du procédé repose
donc sur le sel et sur le froid, et sur rien d'autre.

### Le sel exigé, et sa base de calcul

> « Critical limit: **minimum 10% coarse pickling salt (e.g. 100 g of salt for 1 kg of fish).** »

> « Use non-iodized coarse pickling salt. »

> « Layer and salt fish with 10 to 15% coarse pickling salt (w/w) »

La base est explicite et conforme à la convention du livre : **pourcentage sur le poids de la
chair**, 100 g de sel par kg de poisson.

### Le froid exigé, et le seuil de 3,3 °C

> « If packaged in reduced oxygen packaging (ROP), i.e., hermetically sealed **ensure fesikh is
> stored at 3.3°C or lower to decrease the risk of botulinum**. »

> « If final product is in aerobic packaging, ensure fesikh is stored at 4°C or lower. »

> « Fish should be fresh, received and stored refrigerated below 4°C to limit growth of pathogens
> and risk of biogenic amine formation. »

### L'étape traditionnelle que le document refuse de recommander

> « Ripening (putrefaction) for no longer than 24 hrs at 30°C »

> « **While this step is traditional when making fesikh, putrefaction is not a recommended food
> safety practice because pathogens may grow.** Critical limit: do not ripen for longer than 24
> hours. »

### L'éviscération comme barrière

> « **Gutting fish reduces botulinum risk by removing spores in the intestinal track of the
> fish.** »

> « Thorough cleaning after evisceration will reduce microbial loads of spoilage and pathogenic
> bacteria. »

### Durée de conservation en fonction du sel

> « Final fesikh salt concentration of: 10% or lower has a shelf-life of up to 2 weeks · >10% up to
> 3 months shelf-life »

> « The fermentation may occur between 3 days to several months, but is recommended to be completed
> within 15 days. Longer fermentation times will favour biogenic amine formation. »

---

## Extraits intégraux, section 1 (introduction), relevés le 2026-09-20

### Ce que font les bactéries lactiques, et sur quoi

> « Lactic acid bacteria (LAB) are a group of bacteria that microbiologists refer to as "gram
> positive, acidophilic, facultative anaerobes". This means these bacteria produce acids, in
> particular lactic acid and can grow with and without oxygen and are salt tolerant. »

> « LAB are commonly found in low numbers on many types of fresh produce, and grow rapidly with
> acid production when conditions are right. **LAB produce lactic acid as the major end product
> during the fermentation of carbohydrates**, reducing the pH of the end product to less than
> 4.6. »

> « *Lactobacillus*, *Leuconostoc*, *Pediococcus* and *Streptococcus* are the four major genera of
> LAB. »

> « During growth, LAB can also produce antimicrobial compounds such as bacteriocins that will
> inhibit other microbial growth and this is important to the safety of the ferment. »

### La phrase de classement des risques

> « Mould fermentations, from a food safety perspective, initially appear to be higher risk because
> as mould multiplies in the food substrate (e.g., soybean) the pH of the food increases. As the
> food becomes more alkaline, **it is considered to be a low-acid food with a pH>4.6 which we
> traditionally consider higher risk. Concern is amplified when the fermentation takes place at
> ambient temperatures.** »

Le raisonnement est écrit pour les moisissures, mais il porte le principe général employé par le
chapitre 77 : **c'est le pH final, et lui seul, qui classe une fermentation comme à faible ou à
haut risque** — pas la tradition, pas l'ancienneté du procédé, pas l'absence d'accident dans une
famille.

### Le classement du document lui-même

La figure 1 des deux sections classe les aliments fermentés par complexité croissante. Les
**légumes, la choucroute et le kimchi sont au bas de l'échelle** (« low », agent : LAB spontanées
ou ajoutées) ; le **saucisson fermenté est tout en haut** (« high »). Le fesikh est au milieu,
avec les fermentations spontanées à LAB et levures.

---

## Ce qu'il ne faut pas faire dire à ces pages

1. **Le fesikh n'est pas l'igunaq.** C'est un poisson salé fermenté égyptien, préparé en
   établissement inspecté, avec un minimum de 10 % de sel et une chaîne de froid. Le chapitre 77
   s'en sert pour un seul point — **le pH d'un poisson fermenté ne descend pas** — et ne transpose
   aucun autre paramètre à la viande de mammifère marin. L'igunaq est documenté ailleurs :
   `sources/77-ijch-botulinum-type-e-viande-de-phoque.md`.
2. **Aucune des deux sections ne donne de procédé domestique pour fermenter du poisson.** Le
   chapitre 77 n'en publie donc aucun, et ce refus est une décision de rédaction assumée, pas un
   oubli.
3. **La section 1 ne chiffre pas la température minimale de croissance de *C. botulinum* type E.**
   Ce 3 °C vient du document d'orientation de Santé Canada sur le poisson fumé, déjà au dossier
   sous `sources/70-sante-canada-poisson-fume-botulisme-type-e.md`.
