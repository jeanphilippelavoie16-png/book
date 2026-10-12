# Source — Les alternateurs commandés par l'ordinateur du véhicule : ce qu'ils font montés seuls, et comment les reconnaître à leur fiche

Deux documents de fabricants, deux questions : **un alternateur à régulateur commandé (LIN,
COM…) produit-il quelque chose monté seul, sans l'ordinateur du véhicule ? Et comment le
reconnaître ?**

- **Date de consultation :** 24 septembre 2026
- **Sert au chapitre :** 18b (section 9 B, « Le bon alternateur »). Lève le `[À VÉRIFIER —
  alternateurs commandés par le calculateur, et comment les reconnaître]`.

---

## 1. Freescale Semiconductor (aujourd'hui NXP), fabricant des puces de régulateurs d'alternateur

- **Document :** *AN4289, LIN Alternator Regulator Devices*, note d'application, rév. 2.0, mars 2011
- **URL :** https://www.nxp.com/docs/en/application-note/AN4289.pdf
- **Captation :** `WebFetch` (le serveur refuse `curl`, HTTP 404 au robot) ; PDF intégral
  enregistré : `sources/18b-nxp-an4289-regulateur-alternateur-lin.pdf` ; texte :
  `sources/18b-nxp-an4289-regulateur-alternateur-lin-texte.txt`

> « The LIN alternator regulator family has four operating modes: Standby mode (car parking),
> Pre-excitation mode (with LIN and no phase activity), Default mode (without LIN communication
> and with phases) and Normal mode. »

> « 3.1 Self-Start Option (Active / Not Active) [...] Self-start option allows the product to
> start the regulation whereas there is no LIN communication between the master and the slave
> (LIN wire disconnection or ECU not functional). In that case the product takes internal default
> parameters programed at Freescale production line as new reference and apply them as soon as the
> phase frequency reaches the self-start threshold. »

> « 3.2 Self-start Threshold (3000 / 4000 RPM) Two selectable values are available in the product
> indicating at which rotation speed the device will start the regulation. [...] This is present
> only when the self-start option has been activated by the fuse. »

> « 3.4 Default Regulation Voltage (From 13.5 V to 15 V with 100m V Steps) The default regulation
> voltage is used only if the LIN communication between the master and slave (LIN wire
> disconnection or ECU not functional) is lost during operation. »

> « 2. During cranking, the device detects phase signal, and the device is activated, but don't see
> any activity on LIN pin. It is taking as reference all default parameter programmed and is
> waiting phase frequency for witch it must start the regulation.
> 3. As soon as the self-start threshold speed is reached (3000 or 4000 RPM), the device starts the
> battery regulation. »

## 2. Autoelectro (remanufacturier de démarreurs et d'alternateurs), dans *Professional Motor Mechanic*

- **Document :** Tony Bhogal, directeur général d'Autoelectro, « Regulator Terminals – What Do They
  Mean? », *Professional Motor Mechanic* (revue technique des garages, Royaume-Uni),
  25 novembre 2016
- **URL :** https://pmmonline.co.uk/technical/regulator-terminals-what-they-mean/
- **Captation :** `curl`, HTTP 200, page enregistrée : `sources/18b-pmm-bornes-regulateur-alternateur.html`

> « C: (Computer Controlled) This terminal is an input signal from the ECU which controls the
> charge rate. This signal will tell the alternator when to stop/start charging. »

> « RC/SIG/RLO/PHiN: (Computer Control) This type of connection is connected to the vehicle ECU
> which allows variation of the voltage set-point (known commonly as "smart charge system"). Some
> alternators can be tested standalone while others require special equipment to fully test the
> alternator. RC and SIG connections are used on Ford, Volvo and Land Rover. The RLO connection is
> used on Toyotas. »

> « DFM/M: (Digital Field Monitor/Monitor) This type of connection is connected to the vehicle ECU.
> Every alternator brand has a different abbreviation for the DFM connection: FR (Field Return); DF
> (Digital Field); DFM (Digital Field Monitor); M (Monitor); and LI (Load Indicator), but all
> function in the same way. [...] The vehicle ECU then knows the load at any specific moment during
> the charging process. »

> « COM: (Computer Controlled) This type of connection is connected to the vehicle ECU using a data
> signal for communication. The ECU provides information about the required VSP and the alternator
> will respond with a DFM type signal. There are various type of COM connections: COM (various
> applications); BSS-1 & BSS-2 (Mercedes, Audi, BMW, VW, Mini, Rolls Royce and Renault); LIN1
> (Ford/Volvo); LIN-2 (9K6) (Ford/Volvo); LIN-2 (19K2) (Mercedes, Chrysler, Toyota, Fiat, Audi, VW,
> Porsche, Citroen and Peugeot); Infineon VDA (BMW 2012). »

> « L/D+/IND/16/15/61/R/1: (Warning Light) This type of connection is for the warning light circuit.
> This circuit must have a 12V supply on ignition which should go out when the alternator begins to
> charge. »

> « S: (Battery Sense) This type of connection is a battery sense. This connection has a direct feed
> from the battery and if the connection is not there, it will create a charging fault. »

**Captation écartée :** Genuine Parts Company, « Voltage Regulator Plug Identification »
(`sources/18b-gpc-identification-fiches-regulateurs.pdf`, enregistré) : tableau par marque dont
l'extraction texte mélange les colonnes ; non cité.

---

## Ce que le chapitre en tire

- **Corrigé :** « montés seuls, ils ne produisent ni ne régulent rien » est vrai pour une partie
  seulement. Selon le fabricant des puces, le démarrage sans ordinateur est une **option fixée en
  usine** : quand elle est active, le régulateur part seul à une tension programmée entre 13,5 et
  15 V une fois l'alternateur passé à 3 000 ou 4 000 tr/min ; quand elle ne l'est pas, il attend
  l'ordinateur. Rien ne le montre de l'extérieur : l'essai tranche.
- **Sourcé :** la fiche se lit. Témoin de charge : L, D+, IND, 15, 16, 61, R ou 1. Lecture de la
  batterie : S, à brancher sur la batterie, sinon défaut de charge. Commande par l'ordinateur :
  C, COM, LIN, BSS, RC, SIG, RLO. Les bornes DFM, FR, DF, M, LI **renseignent** l'ordinateur et ne
  commandent pas.
