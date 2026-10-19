# Lulu — spécifications du livre imprimé US Letter 8,5 × 11 po, couverture rigide Case Wrap

- **Date de consultation :** 19 octobre 2026
- **Sert à :** `design/outils/assembler-tome.py` (format `lulu-letter`, le défaut : dimensions du PDF intérieur,
  TrimBox, contrôle du rapport, tranche), `design/directions/1-manuel-de-terrain/outils/build_chapitre.py`
  (`FORMATS`) et la grille de `interieur.tpl.html`.
- **Choix de JP (19 octobre 2026) :** Lulu, Print Book, US Letter 8,5 × 11 po, couverture rigide Case Wrap.
  Le format Blurb 8 × 10 reste possible (`--format blurb-8x10`, `sources/blurb-specifications.md`).
- **Rang :** l'imprimeur lui-même (lulu.com, help.lulu.com, assets.lulu.com). Aucune autre source ne compte ici.
- **Captation :** `curl`, HTTP 200 pour chaque page ; pages enregistrées dans `sources/lulu-captures/` :
  - `guide-creation-livre-lulu.pdf` : *Lulu Book Creation Guide*, 25 pages, InDesign, créé le 21 janvier 2026
    (https://assets.lulu.com/media/guides/en/lulu-book-creation-guide.pdf) ; texte extrait dans
    `guide-creation-livre-lulu.txt` (pdftotext -layout) ;
  - `aide-64000255519-pdf-creation-settings.html` : page d'aide « PDF Creation Settings »
    (https://help.lulu.com/en/support/solutions/articles/64000255519) ;
  - `aide-api-64000254609-pdf-creation-settings.html` : la même page sur le portail des développeurs
    (https://help.api.lulu.com/en/support/solutions/articles/64000254609-pdf-creation-settings), mot pour mot
    la même, à la ponctuation près ;
  - `produits-lulu.html` : page « Book Sizes » (https://www.lulu.com/products), pour le nombre de pages par reliure.
- **Langue :** les extraits sont recopiés en anglais, tels que publiés. Les notes en français sous chaque extrait
  sont les nôtres.

---

## 1. Ce qu'il faut retenir (tiré des extraits ci-dessous, rien de mémoire)

| Exigence | Valeur | D'où |
| --- | --- | --- |
| Page rognée US Letter | 8,5 × 11 po (216 × 279 mm) | guide, p. 11, §3 |
| Page du PDF intérieur, avec fond perdu | **8,75 × 11,25 po** (630 × 810 pt) | guide, p. 11, §3 |
| Fond perdu | **0,125 po sur les quatre côtés**, petit fond compris (« on all sides ») | guide, p. 8 et 10, §2 ; aide, §4 |
| Marge de sûreté | **0,5 po** en dedans du rognage pour tout ce qui compte : texte, images, **numéros de page** | guide, p. 8 et 23 ; aide, §4 |
| Petit fond (gouttière) | **0,2 po au minimum** ; **recommandé pour 151 à 400 pages : 1 po** de marge intérieure totale (0,5 po ajouté à la sûreté) ; 400 à 600 pages : 1,125 po | guide, p. 9, §2 ; aide, §4 |
| Tolérance de coupe | 0,125 po vers le plat avant et le plat arrière | guide, p. 25, §5 |
| Nombre de pages, couverture rigide Case Wrap | **24 à 800** | page « Book Sizes », §6 ; guide, p. 13 (« Hardcover books require a minimum of 24 interior pages ») |
| Page 1 | page de droite ; les pages impaires à droite, les paires à gauche | aide, §4 |
| Mise en page | une page par page du PDF (pas de planches doubles), pages blanches comprises, un seul PDF | aide, §4 ; guide, p. 23 |
| Polices | toutes incorporées (ou vectorisées) | aide, §4 ; guide, p. 23 |
| Transparence | « Flatten all transparent layers and vector objects » ; le système de Lulu détecte et répare une partie de ces problèmes | aide, §4 ; guide, p. 23 et 25 |
| Images | 300 PPI (aide) ; 300 PPI au moins et 600 au plus (guide, p. 23) ; 150 PPI = le minimum pour un dessin simple (guide, p. 4) | §3, §4, §5 |
| Couleur | sRVB préféré (« Our printers prefer files created using sRGB »), CMJN accepté ; noir plein à 100 % sans autre encre ; encrage total ≤ 270 % ; éviter les teintes sous 20 % ; images noir et blanc en niveaux de gris, gamma 2,2 à 2,4 | aide, §4 ; guide, p. 5 |
| Interdits | marques de coupe ou de fond perdu ; protection par mot de passe | aide, §4 ; guide, p. 23 |
| Tranche, couverture rigide | **par tableau**, selon le nombre de pages : 335 à 360 pages → 1,063 po ; 361 à 388 → 1,125 po (tableau complet au §3) | guide, p. 14 |
| Couverture | un seul PDF (plat arrière, tranche, plat avant) ; fond perdu 0,125 po ; sûreté **0,75 po pour la Case Wrap** (aide) ou 0,5 po (guide) ; Lulu fournit le gabarit, à la taille exacte, après le téléversement de l'intérieur | aide, §4 ; guide, p. 24 |

**Ce que le moteur en fait (format `lulu-letter`).** Page de 8,75 × 11,25 po, TrimBox à 9 pt de chaque bord.
Bloc de texte à 0,5 po du rognage au bord extérieur et à 1 po au petit fond (le livre fera environ 350 pages : palier
151 à 400 du tableau). La colonne garde ses 7 po de large : la page gagne 0,5 po de large, et la marge intérieure de
1 po prend ces 0,5 po. Elle gagne en hauteur. Le titre courant, le pied de page et le numéro de page entrent dans la
zone sûre de 0,5 po (en Blurb, le pied et le numéro étaient dans la marge, entre 0,25 et 0,5 po du rognage).

**Ce qui n'est pas dans ces pages.** Aucune exigence de nombre pair, de PDF/X, ni de dimension du PDF de couverture
Case Wrap (Lulu donne le gabarit après le téléversement). Le moteur garde un nombre de pages pair par choix (la
dernière page est une page de gauche), pas par exigence de Lulu.

---

## 2. Guide de création (« Lulu Book Creation Guide », janvier 2026), anatomie du livre, p. 8 à 11

> « Total Document Size — The total dimensions of the file with bleed included. »
>
> « Safety Margin — The border between the trimmed edge and important content (e.g., text, images, page numbers) to
> prevent unintended trimming. »
>
> « Bleed Area — To give books a seamless edge, the pages are printed oversized and trimmed. This extra paper that is
> trimmed away is called 'bleed.' Lulu requires a 0.125 in/3.175 mm bleed margin for all files. »
>
> « Gutter Area — The gutter is the point where your pages meet the spine. To make books easier to read, the page
> margins in the gutter should be wider than the margins on the outer edges of the page. »
>
> « Hinge Area — The hinge area is the inside edge of a hardcover book where the cover boards and the pages are
> attached and the book bends when you open it. »

> « Gutter Additions — The gutter is simply an increased page margin on the binding side of facing pages to account
> for the portion of the page inserted and glued into the bookbinding. If your book includes over 60 pages, we
> recommend adding a gutter to your pages. Coil Bound and Saddle Stitch books do not require a gutter. »

| Page Count | Add to Inside Safety Margin* | Recommended Total Inside Margin* |
| --- | --- | --- |
| Less than 60 | 0 in or 0 mm | 0.5 in or 13 mm |
| 61 to 150 | 0.125 in or 3 mm | 0.625 in or 16 mm |
| 151 to 400 | 0.5 in or 13 mm | 1 in or 25 mm |
| 400 to 600 | 0.625 in or 16 mm | 1.125 in or 29 mm |
| Over 600 | 0.75 in or 19 mm | 1.25 in or 32 mm |

> « *Only add gutter to the page margin of side facing spine »

*Note :* « Total Inside Margin » = 0,5 po de sûreté + l'ajout. Pour un tome d'environ 350 pages : 1 po.

> « Bleed Margin — When manufacturing your book, we print the interior pages oversized. Then all the pages are trimmed
> to a uniform size. The paper trimmed away is called the 'bleed.' We print all book files with a bleed margin of
> 0.125 in/3.175 mm on all sides so we can trim the pages to a uniform size. If your file does not include graphics,
> fills, or content that extends to the edge of the page, you can prepare your file at the book's final trim size and
> our system will automatically add the 0.125 in/3.175 mm bleed. If your formatted file includes graphics, fills, or
> content that extends to the edge of the page, use the chart on page 12 to determine your interior file dimensions. »

*Note :* le livre a des aplats au bord (onglets de tranche, page de titre, bandes de section) : il se prépare
**avec** le fond perdu.

Tableau « Book Trim Sizes » (p. 11), ligne US Letter :

> | Trim Name | Trim Size | Interior File Dimensions - No Bleed | Interior File Dimensions - With Bleed |
> | US Letter | 8.5 in x 11 in / 216 mm x 279 mm | 8.5 in x 11 in / 216 mm x 279 mm | 8.75 in x 11.25 in / 222 mm x 286 mm |

## 3. Guide de création, couverture, p. 13 et 14 (tranche), et intérieur, p. 4 et 5

> « Spine Width Guide — Your spine width is based on your total page count.
> • Paperback books require a minimum of 32 interior pages.
> • Hardcover books require a minimum of 24 interior pages. »

> « Hardcover Covers — Use the table to determine the spine width. » (p. 14)

| Page Count | Spine Width (inches) | Spine Width (mm) |
| --- | --- | --- |
| 0-23 | N/A | N/A |
| 24-84 | 0.25 in | 6 mm |
| 85-140 | 0.5 in | 13 mm |
| 141-168 | 0.625 in | 16 mm |
| 169-194 | 0.688 in | 17 mm |
| 195-222 | 0.75 in | 19 mm |
| 223-250 | 0.813 in | 21 mm |
| 251-278 | 0.875 in | 22 mm |
| 279-306 | 0.938 in | 24 mm |
| 307-334 | 1 in | 25 mm |
| 335-360 | 1.063 in | 27 mm |
| 361-388 | 1.125 in | 29 mm |
| 389-416 | 1.188 in | 30 mm |
| 417-444 | 1.25 in | 32 mm |
| 445-472 | 1.313 in | 33 mm |
| 473-500 | 1.375 in | 35 mm |
| 501-528 | 1.438 in | 37 mm |
| 529-556 | 1.5 in | 38 mm |
| 557-582 | 1.563 in | 40 mm |
| 583-610 | 1.625 in | 41 mm |
| 611-638 | 1.688 in | 43 mm |
| 639-666 | 1.75 in | 44 mm |
| 667-694 | 1.813 in | 46 mm |
| 695-722 | 1.875 in | 48 mm |
| 723-750 | 1.938 in | 49 mm |
| 751-778 | 2 in | 51 mm |
| 779-799 | 2.063 in | 52 mm |
| 800 | 2.125 in | 54 mm |

Guide, p. 4 et 5 (résolution et couleur) :

> « 72 PPI — The standard resolution for most graphics when appearing digitally. 150 PPI — Minimum resolution for
> simple graphics intended for print. 300 PPI — Ideal resolution for complex or detailed graphics intended for print. »
>
> « 4. Solid blacks will print solid at 100% with no other colors added. […] TAC (total area coverage) should never
> exceed 270%. 5. Tint variation is difficult to control in light color (20% or
> less) designs. 6. Black & white images should
> have the color space set to grayscale. 7. The gamma value of a grayscale image should be between 2.2 and 2.4. » (p. 5)

## 4. Page d'aide « PDF Creation Settings » (help.lulu.com, article 64000255519)

> « Interior File Specifications & Layout — All content for the interior of your book should be in a single PDF. This
> includes the copyright page and any blank pages. »
>
> « When creating your PDF file, follow these guidelines:
> Images should be 300 ppi resolution
> All fonts should be embedded or converted to outlines
> Flatten all transparent layers and vector objects
> Your PDF should be a single-page layout
> Ensure that your page spreads are lined up properly in your source file. The first page of your print-ready PDF
> will be on the right-hand side of your book, opposite the inside of the front cover. Accordingly, odd-numbered pages
> in your file will be printed on the right side of the book, and even-numbered pages on the left.
> Size your PDF pages to match the book you're creating. Include the bleed dimensions of 0.125 in for your document.
> For example – a 6 x 9 in book requires a PDF with pages sized 6.25 x 9.25 in.
> Allow a 0.50 in Safety Margin for all content
> Allow a minimum 0.20 in Gutter margin for the inner edge of all pages
> Do NOT include trim or bleed marks in your PDF
> Do NOT use any security/password file protection »

> « Cover File Specifications & Layout — Your cover file should be a one-piece PDF that includes the back cover,
> spine, and front cover content in a single-page spread. We recommend using the template we provide during the
> publishing process that is custom-sized based on your interior file. […]
> Images must be 300 PPI resolution minimum, not exceeding 600 PPI resolution
> Vector images should be rasterized
> All fonts should be embedded or converted to outlines
> Flatten any transparent layers and vector objects
> Your PDF should be single-page layout
> Size your PDF to match the specifications provided for your book. The spine width is relative based on the number
> of pages in your book. (See Spine Width Calculator PDF)
> Include the bleed dimensions of 0.125 in and allow a minimum 0.25 in Safety Margin for all content (0.75 in for
> Hardcover Casewrap)
> Do NOT include trim or bleed marks in your PDF
> Do NOT use any security/password file protection »

> « Color Space Guidelines — Lulu's printers use sRGB and CMYK color space for all color printing.
> sRGB - Our printers prefer files created using sRGB color space and can convert this to rich CMYK. If you create
> your file using RGB color space, be sure to export with sRGB color space selected.
> CMYK - Works well for almost all printing needs. If your file was created in CMYK, we recommend keeping this color
> space when exporting. […]
> Solid blacks will print solid at 100% with no other colors added. If you do add colors to improve the richness of
> the black, TAC (total area coverage) should never exceed 270%.
> Avoid very light color builds of less than 20%. Below 20% tint variation is very difficult to control on a
> consistent basis.
> If you are printing a color book that includes black & white images, the black & white images should have the
> colorspace set to grayscale.
> The gamma of grayscale images should be between 2.2 and 2.4. »

*Note :* « Avoid very light color builds of less than 20% » vise les teintes pâles du livre (le rose pâle des étapes
de danger, la teinte pâle de l'orange `--orp`, le vert pâle des notes « En plus ») : elles peuvent varier d'un tirage
à l'autre. À juger sur l'épreuve papier.

## 5. Guide de création, préparation et épreuve, p. 23 et 25

> « Interior File Specifications — When creating your book, you must provide a single-page PDF containing all
> interior elements. This includes the title and copyright pages, as well as any blank pages you wish to include.
> Specifications: • Single page layout • Embedded images are 300 PPI resolution minimum, not exceeding 600 PPI
> resolution • All fonts are embedded • Transparent layers are flattened • Pages sized to match intended trim size:
> • Trim Size = 6 x 9 in/152.4 x 228.6 mm • Page Size = 6.25 x 9.25 in/158.75 x 234.95 mm • A minimum 0.5 in/12.7 mm
> Safety Margin • A minimum 0.2 in/2.08 mm Gutter Margin • Do NOT include trim, bleed, or margin lines • Do NOT use
> any security/password file protection »

> « File Error — Low image resolution, transparencies, and unembedded fonts are common issues that may not be obvious
> when viewing your manuscript on a screen. Our system will detect and repair many of these issues, but some may slip
> through. »
>
> « Printing Variance — Our trimming tolerance is 0.125 in/3.175 mm toward the front and back cover. Designing your
> content with sufficient margins and variance in mind will help you avoid issues with spine text alignment and
> cut-off text/images around the edges of your page. »

*Note :* le PDF d'Edge contient de la transparence (ombre douce des notes « En plus », trames de la variante C) ;
Lulu demande de l'aplatir et dit réparer une partie de ces cas. Le rapport de l'assembleur compte les pages
touchées ; à surveiller au téléversement et sur l'épreuve.

## 6. Page « Book Sizes » (lulu.com/products), reliures

> « Paperback Perfect Bound — 32-800 pages »
>
> « Paperback Saddle Stitch — 4-48 pages »
>
> « Hardcover Casewrap — 24-800 pages — Traditional hardcover binding with the cover image printed on the cover.
> Casewrap binding is most often used for textbooks and hardcover portfolios. »
>
> « Hardcover Linen Wrap with Dust Jacket — 24-800 pages »

*Note :* la page est dynamique ; ces lignes sont dans le HTML enregistré (`produits-lulu.html`, contenu du gestionnaire
de contenu), sous « Book Bindings ».
