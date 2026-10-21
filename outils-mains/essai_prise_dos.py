import sys, numpy as np, time
sys.path.insert(0, '/home/user/book/outils-mains')
from main3d import *
t0 = time.time()
R = 16.0; C = np.array([84., 2, -33]); AXE = unit([0.28, 1, 0])
ang = ajuster_doigts(C, AXE, R); print(ang, time.time()-t0)
J = {D['nom']: doigt_joints(D, ang[D['nom']]) for D in DOIGTS}
cible = J['index'][2] + np.array([0, 0, 0]) + 0.5*(J['majeur'][2]-J['index'][2])   # sur la 2e phalange, entre index et majeur
# la cible : contre la face externe (côté dos-distal) de la 2e phalange de l'index
M = J['majeur']; mid = (M[1]+M[2])/2; q = mid - C; out = unit(q - (q@AXE)*AXE)
cible = mid + out*(9 + 8.5)   # la pulpe du pouce posée sur la face externe de la 2e phalange du majeur
print('cible', cible)
# le pouce fait le tour du manche par le côté de l'index, puis se couche en travers des 2es phalanges de l'index et du majeur
cible = np.array([106., 12, -67]); cible_ip = np.array([90., 37, -57])
pp = ajuster_pouce(J, C, AXE, R, cible, cible_ip=cible_ip); print('pouce', pp, time.time()-t0)
J = finir(J, pp)
import pickle; pickle.dump(J, open('/tmp/claude-0/J.pkl', 'wb'))
