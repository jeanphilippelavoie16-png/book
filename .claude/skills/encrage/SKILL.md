---
name: encrage
description: La passe d'encrage d'un dessinateur professionnel sur les dessins au trait du Grand Livre du Chalet — décalques, mains, corps, têtes, planches — pour que le trait soit parfait. Utilise ce skill dès qu'un dessin est décalqué ou construit et doit être « repassé », dès que JP dit que les traits ne sont pas parfaits, tremblent, se coupent, se doublent ou font « pas pro », dès qu'on parle d'encrer, de nettoyer, de repasser, de mettre au propre un dessin, et toujours avant de montrer à JP un dessin issu d'un décalque (skill dessin-notice). Il ne décide pas quoi dessiner (skill planches) ni la forme du corps (skill dessin-notice) : il fait le trait.
---

# L'encrage — le trait d'un dessinateur professionnel

> **État, 13 octobre 2026 : la première passe est rejetée.** Le décalque du petit corps de référence
> de JP (271 px de large), repassé par ce skill, a été jugé « de pire en pire » : l'encrage lisse et
> symétrise les défauts du décalque, il ne les enlève pas. Une forme fausse au départ reste fausse, en
> plus propre. Le calque fidèle de `dessin-notice/scripts/vectoriser.py` l'a remplacé pour les
> modèles : il garde le trait du dessinateur au lieu de le refaire. Ce skill ne sert plus que sur un
> dessin construit dont la forme est déjà juste.

Un décalque donne la forme juste, mais son trait est celui de l'image source : coupé là où les
pixels s'éclaircissent, doublé là où deux bords se touchent, tremblé par l'agrandissement, avec des
ergots aux jonctions. JP le voit tout de suite : « c'est pas parfait, les traits pi toute ». Ce skill
fait ce que fait l'encreur d'un studio sur le crayonné : il repasse chaque trait pour qu'il soit
continu, franc, et qu'il ait le poids qu'il mérite.

## Ce qu'est un trait parfait

1. **Continu.** Une ligne que l'œil lit comme une seule ne se coupe pas. Deux bouts qui se font face
   à quelques unités se rejoignent par une courbe qui garde leurs deux directions.
2. **Bien joint.** Un trait qui vient buter contre un autre le touche (jonction en T), il ne s'arrête
   pas à un poil avant. Un contour fermé se ferme.
3. **Unique.** Deux traits qui suivent le même chemin n'en font qu'un : le plus long reste.
4. **Sans miettes ni ergots.** Les petits bouts qui ne décrivent rien (bruit du tracé) s'en vont.
5. **Lisse.** La courbure varie doucement ; un trait ne tremble pas, ne fait pas de bosse, ne casse
   que sur un vrai angle. (Lissage Taubin, qui ne fait pas rétrécir la forme, puis courbes de Bézier.)
6. **Symétrique quand le sujet l'est.** Un corps de face ou de dos a deux moitiés pareilles : on fait la
   moyenne de chaque trait et de son miroir, et de chaque forme et de son miroir. Les défauts d'une
   moitié disparaissent, la symétrie se voit au premier coup d'œil.
7. **Pesé.** Le contour d'une forme pèse plus que ses traits intérieurs, qui pèsent plus que les
   détails (ongle, pli). Le contour s'épaissit du côté de l'ombre (lumière en haut à gauche) et
   s'amincit du côté de la lumière : c'est ce qui donne du volume sans une ombre.
8. **Effilé.** Un trait ouvert est plein au milieu et s'effile à ses deux bouts, comme un coup de
   pinceau : la marque d'un encrage fait à la main, et la raison pour laquelle les jonctions ont
   l'air voulues.

## Comment s'en servir

```python
from encrer import Dessin, Trait, Aplat, encrer, svg      # scripts/encrer.py
from vers_dessin import traits_de, aplats_de             # scripts/vers_dessin.py : masques -> dessin
d = Dessin(aplats=aplats_de(masque_peau, ech, '#F3E3D3'), traits=traits_de(masque_trait, ech, ergot_px))
els = encrer(d, echelle=1.3, sym=axe_x_ou_None, lmin=4, djoin=6, dsnap=4, eps=2)
svg('sortie', largeur, hauteur, [(0, 0, els)])
```

- Les distances (`lmin` miettes, `djoin` coupures, `dsnap` jonctions, `eps` doublons) sont dans les
  unités du dessin : règle-les sur l'épaisseur du trait (environ 2 à 3 fois le trait pour `djoin`).
- `echelle` règle le poids du trait : un trait de contour vaut environ 1 % de la largeur de la main,
  0,35 % de la hauteur d'un corps entier.
- `sym` = l'abscisse de l'axe d'une figure de face ou de dos ; `None` pour tout le reste (une main,
  un profil, un geste).
- `scripts/encrer_modeles.py` montre la passe complète sur les modèles (mains, femme, homme).

## Avant de montrer à JP

Regarde le rendu à la taille d'impression, puis de près, et cherche :
- un trait coupé, un trait doublé, un ergot à une jonction, un contour qui ne ferme pas ;
- une bosse ou un tremblé sur une longue courbe (jambe, bras, dos) ;
- une asymétrie sur une figure de face ;
- un détail qui pèse autant qu'un contour.
Ce que tu trouves, tu le règles avant d'envoyer. Ce que tu ne sais pas régler, tu le dis à JP.
