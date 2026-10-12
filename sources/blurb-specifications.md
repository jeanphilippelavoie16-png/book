# Blurb — spécifications du livre photo « 20 × 25 cm » (Standard Portrait 8 × 10 po), PDF to Book

- **Date de consultation :** 27 septembre 2026 (16 h, heure de l'Est)
- **Revérifié le 28 septembre 2026 (6 h 30) :** §3 et §5 téléchargés de nouveau, identiques à la capture
  (même taille à l'octet, mêmes dates de mise à jour : July 21, 2026 et July 09, 2026) ; le calculateur
  (§2) est interrogé par l'assembleur à chaque tome, pour son nombre de pages exact.
- **Sert à :** `design/outils/assembler-tome.py` (dimensions du PDF intérieur, pages blanches,
  vérifications), à la couverture (`design/directions/1-manuel-de-terrain/couvertures-nordique.html`,
  variable `--spine`) et à `design/choix.md` (« À régler avant l'impression »).
- **Rang :** l'imprimeur lui-même (blurb.com, support.blurb.com). Aucune autre source ne compte ici.
- **Captation :** `curl`, HTTP 200 pour chaque page ; pages enregistrées dans
  `sources/blurb-captures/` (HTML tel que reçu, plus les deux guides PDF de Blurb). Le calculateur
  de spécifications est un formulaire : il a été interrogé par POST (`book_type=standard_portrait_true8x10`,
  `paper_type=standard`, `unit_measurement=inches`, couverture et nombre de pages variables) ; trois
  réponses complètes sont enregistrées, les autres sont recopiées dans le tableau du §2.
- **Langue :** les extraits sont recopiés en anglais, tels que publiés. Les notes en français sous
  chaque extrait sont les nôtres.

---

## 1. Ce qu'il faut retenir (tiré des extraits ci-dessous, rien de mémoire)

| Exigence | Valeur | D'où |
| --- | --- | --- |
| Page du PDF intérieur, avec fond perdu | **8,125 × 10,25 po** (585 × 738 pt) | calculateur, §2 |
| Page rognée | 8,0 × 10,0 po | calculateur, §2 |
| Fond perdu des pages | 0,125 po **en tête, en pied et au bord extérieur** ; rien au petit fond (reliure) | calculateur, §2 |
| Zone sûre, tête, pied, bord extérieur | 0,25 po en dedans du rognage | calculateur, §2 ; §4 |
| Zone sûre, côté reliure | **0,5 po** (tableau du calculateur) — mais le texte de la même page dit **0,625 po** (45 pt) | calculateur, §2 — **contradiction à signaler** |
| Tolérance de coupe | jusqu'à 1/16 po sur chaque bord | guide « Understanding the Templates », §7 |
| Nombre de pages | **pair** ; 20 minimum ; **440 maximum** en papier Standard ; 240 en Premium et Mohawk | §3, §5 |
| Page 1 | page de droite seule ; 2-3 = première double page ; la dernière est une page de gauche, paire | §3 |
| Pages | une par page, pas en planches doubles ; aucune marque d'imprimeur | §3 |
| Couleur | CMJN (recommandé) ou sRVB ; pas de couleur d'accompagnement ni de « registration » | §3, §6 |
| Noir du texte et du trait | 100 % K (0C 0M 0J 100K) ; noir riche 60/50/50/100 seulement pour les grands aplats | §3, §6 |
| Polices | incorporées (sinon erreur « fonts not embedded » au contrôle) | §8 |
| PDF/X | **aucune exigence dans les pages de 2026** ; le guide de 2010 demandait PDF/X-3:2002 | §3, §7 |
| Images | 300 PPI au plus conseillés ; 150 à 300 DPI pour le guide de 2010 | §3, §7 |
| Taille des fichiers | pages : 2 Go ; couverture : 90 Mo | §3 |
| Page du logo Blurb | ajoutée à la fin, hors compte de pages et hors calcul de tranche ; retrait payant | §7, §9 |
| Dimensions approximatives | à 10 % près, le téléverseur redimensionne et **peut déformer** : viser la mesure exacte | §9 |

**Largeur de tranche : elle ne se calcule pas, elle se lit au calculateur.** Elle avance par paliers
(les mêmes 0,056 po pour 20 et 24 pages ; 0,181 po pour 60 et 80 ; 0,931 po pour 400 et 420), donc
aucune formule linéaire ne la donne. Couverture souple, papier Standard, **440 pages : 1,0 po**, et
non 0,95 po comme supposé dans `couvertures-nordique.html`. L'outil d'assemblage interroge le
calculateur pour le nombre de pages exact du tome et recopie la réponse dans son rapport.

**Largeur du PDF de couverture souple** = 2 × 8,0 + tranche + 2 × 0,125 = 16,25 po + tranche, sur
10,25 po de haut (vérifié sur les 23 lignes du tableau du §2 : 20 p → 16,306 ; 440 p → 17,25).

---

## 2. Le calculateur de spécifications

- **URL :** https://www.blurb.com/make/pdf_to_book/booksize_calculator
- **Captures :** `blurb-captures/calculateur-8x10-souple-440-standard.html`,
  `…-imagewrap-440-standard.html`, `…-jaquette-440-standard.html`, `…-souple-100-premium.html`

Réponse complète pour Standard Portrait 8 × 10, couverture souple, papier Standard, 440 pages, en
pouces (le bloc « page » est le même pour toutes les couvertures et tous les nombres de pages
interrogés) :

> Final, exported PDF should measure (w x h) | 8.125 x 10.25
> Page size / trim line (w x h) | 8.0 x 10.0
> Bleed (top, bottom, and outside edges) | 0.125
> Inset for Margins / Safe boundary (Top, Bottom, Outside Edge) | 0.25
> Inset for Margins / Safe boundary (Binding Edge) | 0.5
> Cover Specifications | Inches
> Final, exported PDF should measure (w x h) | 17.25 x 10.25
> Total Page size / trim line (w x h) | 17.0 x 10.0
> Bleed (all edges) | 0.125
> Flaps (w x h, measured from trim edge to fold) | none
> Gutter / Spine (w x h) | 1.0 x 10.25
> Inset for Margins / Safe boundary (from edge of trim) | 0.25

Texte fixe sous le résultat :

> « Bleed — The bleed measurement when added to the trim size measurement will equal the final size
> of the PDFs that are required for successful upload and printing with Blurb. Any imagery or color
> that you would like to bleed off of the edge of your book pages or cover should be extended out
> past the trim by this bleed amount. Any text or images that appear in your design between the trim
> line and the bleed line will not actually print in your final book. Please note, that while bleed
> is added to all four sides of your covers, it is only added to the top, bottom, and outside of your
> individual page layout. The inside edge is the gutter of your book. »

> « Trim — Trim size indicates where the cover or pages end and where the paper is cut to your
> specified book size. This is the finished size of your book after the bleed area has been trimmed.
> On the ImageWrap book, the trim line references where the image will be wrapped around the edge of
> the cover. »

> « Safe text boundary — The safe text area is inset from the trim line by 18 pts (.25 in, 0.6 cm) on
> all outside edges and 45 pts (.625 in, 1.587 cm) for the gutter. This indicates where you can
> insert text and images and be sure that they will not be trimmed too close to the edge or bound into
> the gutter. Any and all critical content, like text, should be kept within the safe area. »

*Note :* le tableau dit 0,5 po au petit fond, le paragraphe dit 0,625 po. La grille du livre pose le
bloc de texte à 0,5 po du petit fond : elle respecte le tableau, pas le paragraphe. Voir le rapport de
l'outil.

Règles affichées par le formulaire (texte des avertissements) :

> « Saddle pages need to be multiple of 4. » — « Papers not available over 440 pages. » — « Premium
> and Proline Papers not available over 240 pages. » — « Layflat Paper not available over 110 pages. »

*Note :* « multiple of 4 » vise la reliure piquée (magazines), pas le livre photo.

> Do : « Submit an even number of pages » ; « Make black text only 100% Black ink » ; « Rasterize
> overly complex vectors (e.g. Illustrator or CAD graphics) » ; « Create your cover last when you know
> your final page count » ; « Place images and artwork to the edge of the bleed of the document to
> allow for trim. » ; « Ensure that all text and images are placed within the safe text boundary to
> prevent content loss when the pages are trimmed » ; « Use perceptual rendering intent on all objects
> when possible ». Do not : « Use spot or registration colors as they may not print as expected ».

### Tableau relevé au calculateur le 27 septembre 2026 (8 × 10, papier Standard, en pouces)

Couverture souple (*Softcover*) : fond perdu 0,125 sur les quatre bords, pas de rabats.

| Pages | PDF de couverture (l × h) | Tranche |
| ---: | --- | ---: |
| 20 | 16,306 × 10,25 | 0,056 |
| 24 | 16,306 × 10,25 | 0,056 |
| 40 | 16,375 × 10,25 | 0,125 |
| 60 | 16,431 × 10,25 | 0,181 |
| 80 | 16,431 × 10,25 | 0,181 |
| 100 | 16,5 × 10,25 | 0,25 |
| 120 | 16,556 × 10,25 | 0,306 |
| 140 | 16,556 × 10,25 | 0,306 |
| 160 | 16,625 × 10,25 | 0,375 |
| 180 | 16,681 × 10,25 | 0,431 |
| 200 | 16,75 × 10,25 | 0,5 |
| 220 | 16,75 × 10,25 | 0,5 |
| 240 | 16,806 × 10,25 | 0,556 |
| 260 | 16,875 × 10,25 | 0,625 |
| 280 | 16,875 × 10,25 | 0,625 |
| 300 | 16,931 × 10,25 | 0,681 |
| 320 | 17,0 × 10,25 | 0,75 |
| 340 | 17,056 × 10,25 | 0,806 |
| 360 | 17,056 × 10,25 | 0,806 |
| 380 | 17,125 × 10,25 | 0,875 |
| 400 | 17,181 × 10,25 | 0,931 |
| 420 | 17,181 × 10,25 | 0,931 |
| 440 | 17,25 × 10,25 | 1,0 |

Couverture rigide ImageWrap (*Hardcover, ImageWrap*) : fond perdu 0,306 sur les quatre bords (la
toile s'enroule sur le carton), pas de rabats, hauteur du PDF 10,986.

| Pages | PDF de couverture (l × h) | Page rognée totale | Tranche |
| ---: | --- | --- | ---: |
| 20 | 17,569 × 10,986 | 16,957 × 10,374 | 0,458 |
| 100 | 17,681 × 10,986 | 17,069 × 10,374 | 0,569 |
| 200 | 17,861 × 10,986 | 17,249 × 10,374 | 0,75 |
| 300 | 18,208 × 10,986 | 17,596 × 10,374 | 1,097 |
| 400 | 18,347 × 10,986 | 17,735 × 10,374 | 1,236 |
| 440 | 18,347 × 10,986 | 17,735 × 10,374 | 1,236 |

Couverture rigide à jaquette (*Hardcover, Dust Jacket*) : fond perdu 0,125, rabats, hauteur 10,5.

| Pages | PDF de jaquette (l × h) | Rabats (l × h) | Tranche |
| ---: | --- | --- | ---: |
| 20 | 25,736 × 10,5 | 4,139 × 10,5 | 0,458 |
| 100 | 25,736 × 10,5 | 4,083 × 10,5 | 0,569 |
| 200 | 25,75 × 10,5 | 4,0 × 10,5 | 0,75 |
| 300 | 25,736 × 10,5 | 3,819 × 10,5 | 1,097 |
| 440 | 25,736 × 10,5 | 3,75 × 10,5 | 1,236 |

Papier Premium (lustré ou mat), couverture souple : 100 pages → tranche 0,306 (PDF 16,556 × 10,25) ;
240 pages → tranche 0,75 (PDF 17,0 × 10,25). Le Premium est plus épais : à 240 pages, sa tranche
est celle de 320 pages en Standard.

---

## 3. « PDF to Book specifications and checklist »

- **URL :** https://support.blurb.com/hc/en-us/articles/207792946-PDF-to-Book-specifications-and-checklist
- **Mise à jour affichée :** July 21, 2026 · **Capture :** `blurb-captures/specifications-et-checklist.html`

> « Quick checklist — Dimensions match the Blurb specifications for your book size and format. /
> Even number of pages (required for all formats). / Pages exported as individual pages, not spreads.
> / No printer marks included in the file. / Full-bleed images extend to the page edge. / 100% black
> ink only for text (no rich black for body text). / No spot or registration colors (CMYK or sRGB
> only) / Overly complex vector art rasterized. / Cover exported as a separate file (unless submitting
> a single-file PDF). / File size within the upload limit. »

> « Your PDF must match the 'Final, exported PDF' measurements in the Blurb spec tool for your chosen
> book size, format, paper type, and cover type […] For dimensions that include bleed, the spec tool
> provides the exact measurements. Don't calculate bleed yourself from the trim size — use the spec
> tool value. »

> « Page structure — Export your PDF as individual pages, not as spreads. The uploader handles the
> assembly into a two-page spread view — if you submit spreads, your upload will be flagged for a page
> dimension error. / Page 1 is a right-hand single page. / Pages 2–3 are the first two-page spread. /
> The final page is a left-hand single page with an even page number. »

> « Color — Use CMYK (recommended) or sRGB color throughout. / Use 100% black (0C, 0M, 0Y, 100K) for
> all body text and line art. / For large areas of black coverage, use rich black: 60C, 50M, 50Y,
> 100K. / Do not use spot or registration color. Blurb does not support Pantone or other spot colors. »

> « Printer marks — Do not add crop marks, registration marks, or any other printer marks to your PDF.
> Blurb adds any required marks during production. »

> « Vector art — Overly complex vector art (such as CAD drawings or intricate Illustrator files) can
> cause print failures. Rasterize any complex vector content before exporting your PDF. »

> « File size — The PDF uploader accepts pages files up to 2GB and cover files up to 90MB. […] Set all
> images to a maximum of 300 PPI. »

> « Cover file — For most uploads, your cover and pages are separate PDF files. The cover is a
> single-page document; the pages file contains all interior pages in order. »

---

## 4. « Understanding bleed and trim in your Blurb book »

- **URL :** https://support.blurb.com/hc/en-us/articles/360000087206-Understanding-bleed-and-trim-in-your-Blurb-book
- **Mise à jour affichée :** August 05, 2026 · **Capture :** `blurb-captures/fond-perdu-et-rognage.html`

> « A trim line marks the approximate cut line for your page. The word 'approximate' matters — the
> actual cut may fall slightly to either side of the trim line due to normal variation in the printing
> and binding process. »

> « Keep all important content — text, faces, logos — inside the safe area, which is typically at
> least 0.25 inches from the trim line. »

> « If the image stops at the trim line without extending into the bleed area, a white strip will
> appear along that edge in the finished book. »

---

## 5. « How many pages can my book have? »

- **URL :** https://support.blurb.com/hc/en-us/articles/7607055286541-How-many-pages-can-my-book-have
- **Mise à jour affichée :** July 09, 2026 · **Capture :** `blurb-captures/nombre-de-pages.html`

> « Pages in a Blurb book are counted the same way as any book you'd pick up off a shelf. Page 1
> appears on the right-hand side of the first sheet of paper. Page 2 is on the reverse of the same
> sheet. »

> | Format | Minimum | Maximum |
> | Photo book — Standard paper | 20 pages | 440 pages |
> | Photo book — Premium Lustre or Matte paper* | 20 pages | 240 pages |
> | Photo book — Mohawk proPhoto Pearl or Superfine Eggshell | 20 pages | 240 pages |

---

## 6. « CMYK black values »

- **URL :** https://support.blurb.com/hc/en-us/articles/207792816-CMYK-black-values
- **Mise à jour affichée :** July 21, 2026 · **Capture :** `blurb-captures/noirs-cmjn.html`

> « Large coverage areas (backgrounds, full-page fills) — Rich black: 60C, 50M, 50Y, 100K […] Black
> text and line art — Use 100% black only: 0C, 0M, 0Y, 100K — Using rich black for body text risks
> misregistration and color fringing. »

> « Reverse text on dark backgrounds — For light text on a rich black background, use minimum type
> sizes: 6pt for sans-serif / 8pt for serif, 10pt for script. »

> « Registration black (100% of all inks): never use for design. It causes print problems and will
> trigger a preflight error on upload. »

*Note :* le livre sort d'Edge en sRVB. Le noir du texte y est un noir RVB (0, 0, 0) : c'est la
conversion de Blurb qui décidera s'il devient 100 % K ou un noir composé. À juger sur une épreuve
imprimée avant de commander six tomes.

---

## 7. Guides PDF de Blurb (2010), encore servis par blurb.com

- **URL :** https://www.blurb.com/downloads/pdf_to_book/FewThingsToKnow.pdf et
  https://www.blurb.com/downloads/pdf_to_book/UnderstandTemplates.pdf
- **Date :** « all material is copyright of blurb, inc® 2010 » · **Captures :** `blurb-captures/*.pdf`
- **Rang :** plus ancien que les pages d'aide de 2026 ; ne sert que là où celles-ci se taisent.

> « The books you make with Blurb must have an even number of pages – from 20 pages to 440 pages […]
> Also, pages print double-sided. If you want printing on one side of a spread only, you need to
> include blank pages. »

> « When you export your PDF files, you need to use the PDF/X-3:2002 standard. »

> « A single page with a small Blurb logo is inserted at the end (last page) of all books printed with
> Blurb. You can specify this page to be white or black, or you can remove it entirely for an
> additional fee per book. […] You do not need to account for this extra page when designing your
> spine and it is not included in your final page count for pricing […] »

> « Images should be between 150 and 300 DPI for the best possible print production. »

> « […] because of variations in the manufacturing process, trim can fluctuate up to 1/16" on any
> edge. »

> « In the templates, this boundary is a grey box that extends to within a 1/4" [0.6 cm] of the edge
> of your book; that 1/4" [0.6 cm] space is a safety margin […] »

*Note :* la page de spécifications de 2026 ne demande plus PDF/X ; elle demande des pages aux
bonnes dimensions, des polices incorporées, CMJN ou sRVB. Edge ne produit pas de PDF/X. Si le
téléverseur refusait le fichier, c'est la première piste.

---

## 8. « PDF uploader preflight errors »

- **URL :** https://support.blurb.com/hc/en-us/articles/207792976-PDF-uploader-preflight-errors
- **Mise à jour affichée :** November 06, 2020 · **Capture :** `blurb-captures/erreurs-preflight.html`

> « Is there any important content placed close to the dotted trim line? (Keep important content at
> least 1/4 inch away from that dotted line). »

> « Error: fonts not embedded (Microsoft Word) — When a font is not embedded into a PDF file, or the
> permissions of that font do not allow for printing of the font, you will see this error. »

> « Error: registration color detected — This error occurs when you have used a color of REGISTRATION
> or ALL within your file. »

---

## 9. « How to upload a PDF to Blurb through PDF to Book » et types de couverture

- **URL :** https://support.blurb.com/hc/en-us/articles/207792796-How-to-upload-a-PDF-to-Blurb-through-PDF-to-Book
  (July 21, 2026) et https://support.blurb.com/hc/en-us/articles/47180049530637-Cover-types-for-Blurb-Photo-books
  (July 09, 2026) · **Captures :** `blurb-captures/televerser-pdf.html`, `types-de-couverture.html`

> « Cover & Pages in Separate Files — your cover is a separate PDF from your pages. This is the most
> common option. Two upload zones appear: one for the cover PDF (maximum 90MB) and one for the pages
> PDF (maximum 2GB). »

> « The uploader then detects your book size from the PDF dimensions and presents matching options
> under Your Book Size. »

> « Under Blurb Logo Page, choose whether to include the Blurb logo on the last page of your book.
> Select No Blurb Logo to remove it for an additional fee. »

> « Automatic resizing may distort your content — If your PDF dimensions are within roughly 10% of the
> correct size, the uploader will resize automatically. This resizing may slightly distort your
> content. »

> | Cover type | […] Std Portrait 8×10" […] |
> | Softcover | ✓ | Hardcover ImageWrap | ✓ | Hardcover Dust Jacket | ✓ |

> « Softcover — A flexible laminated cover with perfect binding. Your design prints on the front,
> back, and spine. No end sheets or cover flaps. » — « Hardcover ImageWrap — Your image or design is
> printed directly onto the hard cover boards, front and back. Includes end sheets. » — « Hardcover
> Dust Jacket — A linen hardcover case wrapped with a full-color laminated dust jacket, including
> front and back cover panels, spine, and two cover flaps. Includes end sheets. »

> (aperçu du téléverseur, https://support.blurb.com/hc/en-us/articles/115001494183, August 18, 2026)
> « The gutter is where two facing pages meet at the centre of a spread. The preview doesn't mark the
> gutter with a guide, but content placed too close to it may be lost in the binding […] »
