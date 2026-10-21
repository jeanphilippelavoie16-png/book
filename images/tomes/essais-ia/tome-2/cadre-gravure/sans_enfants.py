"""Effacer les deux enfants de la photo et des zones, pour que le générateur peigne un sentier vide : les enfants sont
dessinés ensuite en aplats (encres.dessiner_enfants), par-dessus la gravure.
    python3 sans_enfants.py <photo> <labels.png> <photo-sans.png> <labels-sans.png>"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.restoration import inpaint_biharmonic
import regions
from encres import dessiner_enfants, PHOTO

photo = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float) / 255
lab = np.asarray(Image.open(sys.argv[2])).astype(int)
# le masque : les silhouettes dessinées et les polygones des zones, grossis de quelques pixels
tmp = Image.new('RGB', PHOTO)
m = dessiner_enfants(tmp, 1.0)
m |= np.isin(lab, [regions.Z['enfant1'], regions.Z['enfant2']])
m = ndi.binary_dilation(m, iterations=10)
ys, xs = np.nonzero(m)
y0, y1, x0, x1 = max(ys.min() - 20, 0), min(ys.max() + 20, lab.shape[0]), max(xs.min() - 20, 0), min(xs.max() + 20, lab.shape[1])
crop = photo[y0:y1, x0:x1]
mc = m[y0:y1, x0:x1]
photo[y0:y1, x0:x1] = inpaint_biharmonic(crop, mc, channel_axis=-1)
# les zones : chaque pixel effacé prend la zone du pixel non effacé le plus proche
_, (iy, ix) = ndi.distance_transform_edt(m, return_indices=True)
lab2 = lab[iy, ix]
Image.fromarray((np.clip(photo, 0, 1) * 255).astype(np.uint8)).save(sys.argv[3])
Image.fromarray((m * 255).astype(np.uint8)).save(sys.argv[4].replace('.png', '-masque.png'))
Image.fromarray(lab2.astype(np.uint8)).save(sys.argv[4])
print('effacé', m.sum(), 'pixels')
