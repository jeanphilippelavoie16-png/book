# provisoire : relève les mesures
import json, numpy as np
from PIL import Image
def motif(can, info):
    d = '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad/dos/work/'
    json.dump({k: v for k, v in info.items() if k != 'image'}, open(d + 'info.json', 'w'))
    Image.fromarray(can).save(d + 'fond-avant.png')
    return can
