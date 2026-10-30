/**
 * Twilio SMS -> Claude API (Fable, effort max, recherche web) -> SMS sortant via API Twilio
 * Commandes: "ping" (test), "meteo" (aujourd'hui + demain, heure par heure),
 * "meteo 2" a "meteo 4" (un texto par journee), "meteo 5" a "meteo 7"
 * (bulletin condense, une ligne par jour), "eclipse" (un fait sur les
 * eclipses solaires par minute vers ECLIPSE_NUMERO), "eclipse stop"
 *
 * Envoi en SERIE de textos courts: le SMS satellite iPhone plafonne a 140
 * caracteres par message, et les longs SMS concatenes (segments) se perdent
 * ou arrivent en desordre sur la liaison satellite. Chaque reponse est donc
 * decoupee en textos autonomes numerotes (1/4), (2/4), etc.
 *
 * Fichier complet - remplacer tout le contenu de Code.gs
 */

var MODELE = 'claude-fable-5';
// Plafond, pas une cible: sur Fable la reflexion interne compte dans
// max_tokens. A 1024, le modele se fait couper avant d'ecrire le SMS.
var MAX_TOKENS = 16000;

// Taille max d'un texto individuel. 140 = limite du SMS satellite iPhone,
// et sous les 160 du SMS a segment unique: aucun recollage requis.
var SMS_TAILLE = 140;
// Garde-fou de cout: nombre max de textos par reponse.
var MAX_SMS = 12;
// Coupe de securite sur la reponse de Claude (10 textos x ~133 car. utiles).
var LIMITE_CARACTERES = 1300;

// 5 et non 3: une reponse de fond exige parfois de recouper plusieurs
// pistes. Les recherches coutent des fractions de cent; les textos
// satellite d'une mauvaise reponse coutent bien plus.
var MAX_RECHERCHES = 5;

// Coordonnees du chalet - tirees du lien SpotWX fourni (lat/lon dans l'URL).
// Changer de spot = changer ces deux valeurs.
var METEO_LAT = 50.08623;
var METEO_LON = -67.88246;
var METEO_TZ = 'America/Montreal';

// true = retire les accents pour rester en GSM-7 (160 car./segment, moins cher).
// false = garde les accents mais force l'encodage UCS-2 (67 car./segment).
var STRIP_ACCENTS = true;

// Faits sur les eclipses solaires: un texto par minute vers ce numero,
// par un declencheur Apps Script. Demarrer: demarrerEclipse() dans
// l'editeur, ou texter "eclipse" au numero Twilio. Arreter:
// arreterEclipse(), ou texter "eclipse stop".
var ECLIPSE_NUMERO = '+14182979261';
// false = s'arrete seul apres le dernier fait (une soixantaine de textos).
// true = recommence au premier: 1440 textos par jour, jusqu'a l'arret.
var ECLIPSE_BOUCLE = false;

function doGet(e) {
  return ContentService
    .createTextOutput('OK - serveur actif')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var texte = '';
    var expediteur = '';

    if (e && e.parameter) {
      texte = e.parameter.Body || '';
      expediteur = e.parameter.From || '';
    }

    if (!texte && e && e.postData && e.postData.contents) {
      var form = parseFormEncoded(e.postData.contents);
      texte = form.Body || '';
      expediteur = form.From || '';
    }

    Logger.log('SMS recu de ' + expediteur + ' : ' + texte);

    if (!texte || !expediteur) {
      Logger.log('Body ou From manquant');
      return reponseVide();
    }

    // Commande de test rapide - ne consomme pas de credits Claude
    if (texte.trim().toLowerCase() === 'ping') {
      envoyerSms(expediteur, 'pong - serveur actif');
      return reponseVide();
    }

    var commande = texte.trim().toLowerCase().replace(/[éèêë]/g, 'e');

    // Faits sur les eclipses. "stop" seul vient du destinataire: Twilio
    // le bloque deja et refuse toute reponse, d'ou le try. Ne pas texter
    // "stop" seul soi-meme: Twilio bloquerait aussi nos propres reponses
    // jusqu'a un "START".
    if (commande === 'eclipse') {
      demarrerEclipse();
      envoyerSms(expediteur, 'Faits eclipse: 1 texto/min vers '
        + ECLIPSE_NUMERO + '. "eclipse stop" pour arreter.');
      return reponseVide();
    }
    if (/^(eclipse\s+)?(stop|arret)$/.test(commande)) {
      arreterEclipse();
      try {
        envoyerSms(expediteur, 'Faits eclipse arretes.');
      } catch (errStop) {
        Logger.log('Confirmation eclipse non envoyee: ' + errStop.toString());
      }
      return reponseVide();
    }

    // Commande meteo, sans passer par Claude. Gratuit sauf les SMS.
    // "meteo" = 48 h heure par heure. "meteo 5" = 5 jours resumes (1 a 7).
    var cmdMeteo = commande.match(/^meteo\s*(\d)?\s*$/);
    if (cmdMeteo) {
      if (cmdMeteo[1]) {
        var nbJours = Math.max(2, Math.min(7, parseInt(cmdMeteo[1], 10)));
        if (nbJours >= 5) {
          envoyerSmsSerie(expediteur, previsionMeteoSemaine(nbJours));
        } else {
          envoyerEnOrdre(expediteur, previsionMeteoJours(nbJours));
        }
      } else {
        envoyerSmsSerie(expediteur, previsionMeteoHoraire());
      }
      return reponseVide();
    }

    var reponse = appelerClaude(texte);
    Logger.log('Reponse Claude (' + reponse.length + ' car.): ' + reponse);

    envoyerSmsSerie(expediteur, reponse);

    return reponseVide();

  } catch (err) {
    Logger.log('ERREUR doPost: ' + err.toString());

    try {
      var from = (e && e.parameter && e.parameter.From) || '';
      if (from) {
        envoyerSms(from, 'Erreur: ' + err.toString().substring(0, 130));
      }
    } catch (err2) {
      Logger.log('Echec envoi SMS erreur: ' + err2.toString());
    }

    return reponseVide();
  }
}

function reponseVide() {
  return ContentService
    .createTextOutput('<?xml version="1.0" encoding="UTF-8"?><Response></Response>')
    .setMimeType(ContentService.MimeType.XML);
}

/**
 * Envoie un message long en serie de textos courts et autonomes,
 * numerotes (1/4), (2/4)... Coupe de preference sur un saut de ligne,
 * sinon sur un espace, pour que chaque texto se lise seul.
 */
function envoyerSmsSerie(destinataire, message) {
  message = String(message).trim();

  if (message.length <= SMS_TAILLE) {
    envoyerSms(destinataire, message);
    return;
  }

  var brut = SMS_TAILLE - 8; // place pour le prefixe "(10/10) "
  var morceaux = [];
  var reste = message;

  while (reste.length > 0 && morceaux.length < MAX_SMS) {
    if (reste.length <= brut) {
      morceaux.push(reste);
      reste = '';
      break;
    }
    var fenetre = reste.substring(0, brut);
    var coupe = fenetre.lastIndexOf('\n');
    if (coupe < brut * 0.5) {
      coupe = fenetre.lastIndexOf(' ');
    }
    if (coupe < brut * 0.5) {
      coupe = brut;
    }
    morceaux.push(reste.substring(0, coupe).trim());
    reste = reste.substring(coupe).trim();
  }

  if (reste.length > 0) {
    Logger.log('SERIE TRONQUEE: ' + reste.length + ' caracteres non envoyes');
  }

  var total = morceaux.length;
  var prets = [];
  for (var i = 0; i < total; i++) {
    prets.push('(' + (i + 1) + '/' + total + ') ' + morceaux[i]);
  }
  envoyerEnOrdre(destinataire, prets);
}

/**
 * Envoie une liste de textos deja prets, dans l'ordre. Chaque texto
 * voyage independamment chez le transporteur: sans attente, ils arrivent
 * en desordre. On attend que Twilio ait remis chaque message au reseau,
 * puis on laisse un ecart avant le suivant.
 */
function envoyerEnOrdre(destinataire, messages) {
  for (var i = 0; i < messages.length; i++) {
    var sidMsg = envoyerSms(destinataire, messages[i]);
    if (i < messages.length - 1) {
      attendreDepart(sidMsg, 8000);
      Utilities.sleep(2000);
    }
  }
}

/**
 * Attend que le texto ait quitte Twilio vers le reseau (statut sending/
 * sent/delivered) avant de retourner, pour preserver l'ordre d'arrivee.
 */
function attendreDepart(sidMessage, maxMs) {
  if (!sidMessage) {
    return;
  }

  var props = PropertiesService.getScriptProperties();
  var sid = props.getProperty('TWILIO_SID');
  var token = props.getProperty('TWILIO_TOKEN');

  var url = 'https://api.twilio.com/2010-04-01/Accounts/' + sid
          + '/Messages/' + sidMessage + '.json';

  var options = {
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(sid + ':' + token)
    },
    muteHttpExceptions: true
  };

  var debut = Date.now();
  while (Date.now() - debut < maxMs) {
    var res = UrlFetchApp.fetch(url, options);
    if (res.getResponseCode() === 200) {
      var statut = JSON.parse(res.getContentText()).status;
      // 'sending' ne suffit pas - un texto encore en transmission peut se
      // faire doubler par le suivant. On attend la remise au reseau.
      if (statut === 'sent' || statut === 'delivered'
          || statut === 'failed' || statut === 'undelivered') {
        return;
      }
    }
    Utilities.sleep(1000);
  }
}

/**
 * Aujourd'hui (a partir de l'heure courante) et demain, une ligne par
 * heure de jour. La nuit (20h a 5h), une heure sur quatre suffit: 20h,
 * 0h, 4h. gem_seamless = chaine GEM d'Environnement Canada: HRDPS
 * continental (2,5 km) a cet horizon - le meme modele que la page SpotWX.
 */
function previsionMeteoHoraire() {
  var url = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=' + METEO_LAT
    + '&longitude=' + METEO_LON
    + '&timezone=' + encodeURIComponent(METEO_TZ)
    + '&models=gem_seamless'
    + '&hourly=temperature_2m,precipitation,snowfall,cloud_cover,weather_code,'
    + 'wind_speed_10m,wind_gusts_10m,wind_direction_10m,pressure_msl,'
    + 'relative_humidity_2m,visibility'
    + '&daily=sunrise,sunset'
    + '&forecast_days=2';

  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) {
    throw new Error('Open-Meteo ' + res.getResponseCode() + ' - '
      + res.getContentText().substring(0, 120));
  }

  var d = JSON.parse(res.getContentText());
  var h = d.hourly;

  // Lever/coucher indexes par date, pour l'en-tete de chaque journee
  var soleil = {};
  for (var s = 0; s < d.daily.time.length; s++) {
    soleil[d.daily.time[s]] = 'Soleil ' + heureCourte(d.daily.sunrise[s])
      + '-' + heureCourte(d.daily.sunset[s]);
  }

  // Depart a l'heure courante; la fenetre couvre aujourd'hui et demain
  // au complet (forecast_days=2 = deux jours civils).
  var maintenant = Utilities.formatDate(new Date(), METEO_TZ, "yyyy-MM-dd'T'HH:00");
  var idx = h.time.indexOf(maintenant);
  if (idx < 0) {
    idx = 0;
  }
  var fin = h.time.length;

  var lignes = ['METEO CHALET AUJ+DEMAIN'];
  lignes.push('Emis ' + momentEmission());
  lignes.push('');
  lignes.push(apercuHoraire(h, idx, fin));
  var etoiles = etoilesCeSoir(h, idx);
  if (etoiles) {
    lignes.push(etoiles);
  }
  var lune = luneLeverCoucher(h.time[idx].substring(0, 10));
  if (lune) {
    lignes.push('Lune ' + lune + ' (' + lunePourcent(Date.now()) + '%)');
  }
  var datePrec = '';

  for (var i = idx; i < fin; i++) {
    var heure = parseInt(h.time[i].substring(11, 13), 10);

    // La nuit (20h a 5h), une heure sur quatre suffit: 20h, 0h, 4h.
    // La premiere ligne (conditions actuelles) est toujours gardee.
    if (i > idx && (heure >= 20 || heure < 6) && heure % 4 !== 0) {
      continue;
    }

    var date = h.time[i].substring(0, 10);
    if (date !== datePrec) {
      // Lignes vides autour des en-tetes: 1 caractere chacune, de l'air gratuit
      lignes.push('');
      lignes.push('=== ' + jourSemaine(date).toUpperCase() + ' ===');
      if (soleil[date]) {
        lignes.push(soleil[date]);
      }
      var matin = infoMatin(h, date);
      if (matin) {
        lignes.push(matin);
      }
      lignes.push('');
      datePrec = date;
    }

    var l = heure + 'h  ' + Math.round(h.temperature_2m[i]) + 'C';

    var neige = h.snowfall[i] || 0;
    var pluie = h.precipitation[i] || 0;

    // Mot d'evenement (pluie, averses, orage, brouillard...) seulement
    // quand il se passe quelque chose; le ciel calme est deja dans le %.
    var evenement = (h.weather_code[i] >= 45) ? meteoMot(h.weather_code[i]) : '';
    var quantite = '';
    if (evenement === 'brouillard' && h.visibility && h.visibility[i] != null) {
      quantite = formatVisib(h.visibility[i]);
    } else if (neige >= 0.1) {
      quantite = (Math.round(neige * 10) / 10) + 'cm';
    } else if (pluie >= 0.1) {
      quantite = (Math.round(pluie * 10) / 10) + 'mm';
    }
    if (evenement || quantite) {
      l += '  ' + (evenement + ' ' + quantite).trim();
    }

    l += '  ' + Math.round(h.cloud_cover[i]) + '%';

    l += '  ' + pointCardinal(h.wind_direction_10m[i]) + ' '
      + Math.round(h.wind_speed_10m[i]) + '/'
      + Math.round(h.wind_gusts_10m[i]);

    lignes.push(l);
  }

  return lignes.join('\n');
}

/**
 * Ligne resume en tete du bulletin horaire: precipitations totales et leur
 * debut, rafale maximale et son moment. L'essentiel avant le detail.
 */
function apercuHoraire(h, idx, fin) {
  var totalPluie = 0;
  var totalNeige = 0;
  var rafMax = 0;
  var iRaf = idx;
  var iDebut = -1;

  for (var i = idx; i < fin; i++) {
    totalPluie += h.precipitation[i] || 0;
    totalNeige += h.snowfall[i] || 0;
    if ((h.wind_gusts_10m[i] || 0) > rafMax) {
      rafMax = h.wind_gusts_10m[i];
      iRaf = i;
    }
    if (iDebut < 0 && (h.precipitation[i] || 0) >= 0.2) {
      iDebut = i;
    }
  }

  var parties = [];
  if (totalNeige >= 0.5) {
    parties.push('neige ' + Math.round(totalNeige) + 'cm');
  }
  if (totalPluie >= 1) {
    var p = 'pluie ' + Math.round(totalPluie) + 'mm';
    if (iDebut >= 0) {
      p += ' des ' + momentCourt(h.time[iDebut]);
    }
    parties.push(p);
  }
  if (parties.length === 0) {
    parties.push('sec');
  }
  parties.push('raf max ' + Math.round(rafMax) + ' ' + momentCourt(h.time[iRaf]));

  // Tendance de pression sur 12 h: bon predicteur de mouvement du gibier
  if (h.pressure_msl) {
    var iP = Math.min(idx + 12, fin - 1);
    var delta = (h.pressure_msl[iP] || 0) - (h.pressure_msl[idx] || 0);
    var tendance = (delta > 1.5) ? 'monte' : ((delta < -1.5) ? 'descend' : 'stable');
    parties.push('pression ' + tendance);
  }

  return 'Apercu: ' + parties.join(', ');
}

// Mot court (sans accents) pour un code meteo WMO d'Open-Meteo.
function meteoMot(code) {
  if (code === 0) return 'clair';
  if (code === 1) return 'partiel';
  if (code === 2) return 'nuageux';
  if (code === 3) return 'couvert';
  if (code === 45 || code === 48) return 'brouillard';
  if (code >= 51 && code <= 55) return 'bruine';
  if (code === 56 || code === 57 || code === 66 || code === 67) return 'verglas';
  if (code >= 61 && code <= 65) return 'pluie';
  if (code >= 71 && code <= 77) return 'neige';
  if (code >= 80 && code <= 82) return 'averses';
  if (code === 85 || code === 86) return 'averses neige';
  if (code >= 95) return 'orage';
  return '';
}

// Mot du ciel selon le couvert nuageux moyen, quand rien ne tombe.
function motNuages(pct) {
  if (pct <= 25) return 'clair';
  if (pct <= 50) return 'partiel';
  if (pct <= 75) return 'nuageux';
  return 'couvert';
}

// "2026-09-01T14:00" -> "mar 14h"
function momentCourt(iso) {
  return jourSemaine(iso.substring(0, 10)).split(' ')[0].toLowerCase() + ' '
    + parseInt(iso.substring(11, 13), 10) + 'h';
}

// "lun 31 17h20" - moment d'emission du bulletin
function momentEmission() {
  return jourSemaine(
    Utilities.formatDate(new Date(), METEO_TZ, 'yyyy-MM-dd')).toLowerCase()
    + ' ' + Utilities.formatDate(new Date(), METEO_TZ, 'HH:mm').replace(':', 'h');
}

/**
 * Illumination lunaire approximative (0-100 %). Base: nouvelle lune du
 * 6 janvier 2000 18h14 UTC, mois synodique de 29,5306 jours. Precis a
 * quelques pourcents, bien assez pour la chasse et les etoiles.
 */
function lunePourcent(dateMs) {
  var synodique = 29.530588853;
  var ref = Date.UTC(2000, 0, 6, 18, 14, 0);
  var age = ((dateMs - ref) / 86400000) % synodique;
  if (age < 0) {
    age += synodique;
  }
  return Math.round((1 - Math.cos(2 * Math.PI * age / synodique)) / 2 * 100);
}

// "2026-08-31" -> "2026-09-01"
function dateApres(iso) {
  var d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + 1);
  return Utilities.formatDate(d, METEO_TZ, 'yyyy-MM-dd');
}

/**
 * Nuages moyens de la nuit qui commence le soir de dateIso (21h a 3h).
 * De la pluie dans la fenetre force un ciel considere couvert.
 * Retourne -1 si les donnees ne couvrent pas cette nuit.
 */
function nuagesNuit(h, dateIso) {
  var lendemain = dateApres(dateIso);
  var somme = 0;
  var n = 0;
  var pluie = 0;

  for (var i = 0; i < h.time.length; i++) {
    var heure = parseInt(h.time[i].substring(11, 13), 10);
    var d = h.time[i].substring(0, 10);
    if ((d === dateIso && heure >= 21) || (d === lendemain && heure <= 3)) {
      somme += h.cloud_cover[i] || 0;
      pluie += h.precipitation[i] || 0;
      n++;
    }
  }

  if (n === 0) {
    return -1;
  }
  var moy = somme / n;
  if (pluie >= 0.5) {
    moy = Math.max(moy, 90);
  }
  return Math.round(moy);
}

/**
 * Verdict etoiles pour la nuit a venir, d'apres les nuages de 21h a 3h
 * et la clarte de la lune (une pleine lune lave le ciel).
 */
function etoilesCeSoir(h, idx) {
  var nn = nuagesNuit(h, h.time[idx].substring(0, 10));
  if (nn < 0) {
    return '';
  }
  var verdict = (nn <= 25) ? 'beau' : ((nn <= 50) ? 'passable' : 'non');
  return 'Etoiles ce soir: ' + verdict + ' (nuages ' + nn + '%)';
}

/**
 * Les soirs les plus degages (nuages de nuit <= 30 %) pour les etoiles.
 */
function meilleursSoirs(dj, hq, avecLune) {
  var bons = [];
  for (var i = 0; i < dj.time.length; i++) {
    var nn = nuagesNuit(hq, dj.time[i]);
    if (nn >= 0 && nn <= 30) {
      bons.push(jourSemaine(dj.time[i]).split(' ')[0].toLowerCase());
    }
  }

  var texte;
  if (bons.length === 0) {
    texte = 'Etoiles: aucun beau soir';
  } else {
    texte = 'Etoiles: ' + bons.slice(0, 3).join(', ');
  }
  if (avecLune) {
    texte += ' (lune ' + lunePourcent(Date.now()) + '%)';
  }
  return texte;
}

/**
 * Tendance de la pression au fil d'une journee (premier vs dernier
 * releve horaire). Pression qui descend = front qui approche, le gibier
 * bouge; qui remonte apres un front = bonnes heures aussi.
 */
function tendancePressionJour(hq, dateIso) {
  var premier = -1;
  var dernier = -1;
  for (var i = 0; i < hq.time.length; i++) {
    if (hq.time[i].substring(0, 10) === dateIso) {
      if (premier < 0) {
        premier = i;
      }
      dernier = i;
    }
  }
  if (premier < 0) {
    return 'stable';
  }
  var delta = (hq.pressure_msl[dernier] || 0) - (hq.pressure_msl[premier] || 0);
  if (delta > 1.5) {
    return 'monte';
  }
  if (delta < -1.5) {
    return 'descend';
  }
  return 'stable';
}

/**
 * Humidite moyenne du petit matin (5h a 9h) - l'odeur porte plus quand
 * c'est humide. -1 si les donnees manquent.
 */
function humiditeMatin(h, dateIso) {
  var somme = 0;
  var n = 0;
  for (var i = 0; i < h.time.length; i++) {
    if (h.time[i].substring(0, 10) === dateIso && h.relative_humidity_2m) {
      var heure = parseInt(h.time[i].substring(11, 13), 10);
      if (heure >= 5 && heure <= 9 && h.relative_humidity_2m[i] != null) {
        somme += h.relative_humidity_2m[i];
        n++;
      }
    }
  }
  return (n > 0) ? Math.round(somme / n) : -1;
}

/**
 * Visibilite minimale du petit matin (4h a 10h), en metres.
 * -1 si le modele ne fournit pas la visibilite.
 */
function visibiliteMatinMin(h, dateIso) {
  var min = -1;
  for (var i = 0; i < h.time.length; i++) {
    if (h.time[i].substring(0, 10) === dateIso && h.visibility) {
      var heure = parseInt(h.time[i].substring(11, 13), 10);
      var v = h.visibility[i];
      if (heure >= 4 && heure <= 10 && v != null) {
        if (min < 0 || v < min) {
          min = v;
        }
      }
    }
  }
  return (min < 0) ? -1 : Math.round(min);
}

// 850 -> "900m"; 12400 -> "12km"
function formatVisib(m) {
  if (m < 1000) {
    return (Math.round(m / 100) * 100) + 'm';
  }
  return Math.round(m / 1000) + 'km';
}

/**
 * Ligne du petit matin d'une journee: brouillard si la visibilite tombe
 * sous 2 km, sinon humidite moyenne de l'aube (le brouillard implique
 * deja une humidite saturee, pas besoin des deux).
 */
function infoMatin(h, dateIso) {
  var visMin = visibiliteMatinMin(h, dateIso);
  if (visMin >= 0 && visMin < 2000) {
    return 'Brouillard am ' + formatVisib(visMin);
  }
  var hum = humiditeMatin(h, dateIso);
  if (hum >= 0) {
    return 'Humidite am ' + hum + '%';
  }
  return '';
}

/**
 * Lever/coucher de lune pour une date, via l'API gratuite de met.no
 * (Open-Meteo ne fournit pas la lune). Retourne "21h40-9h12",
 * "lever 21h40", "coucher 9h12", ou '' si le service ne repond pas -
 * le bulletin sort alors sans la ligne lune, sans planter.
 */
function luneLeverCoucher(dateIso) {
  try {
    var decalage = Utilities.formatDate(
      new Date(dateIso + 'T12:00:00'), METEO_TZ, 'XXX');
    var url = 'https://api.met.no/weatherapi/sunrise/3.0/moon'
      + '?lat=' + METEO_LAT + '&lon=' + METEO_LON
      + '&date=' + dateIso + '&offset=' + encodeURIComponent(decalage);

    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) {
      return '';
    }

    var p = JSON.parse(res.getContentText()).properties;
    var lever = (p.moonrise && p.moonrise.time) ? heureCourte(p.moonrise.time) : '';
    var coucher = (p.moonset && p.moonset.time) ? heureCourte(p.moonset.time) : '';

    if (lever && coucher) {
      return lever + '-' + coucher;
    }
    if (lever) {
      return 'lever ' + lever;
    }
    if (coucher) {
      return 'coucher ' + coucher;
    }
    return '';
  } catch (err) {
    return '';
  }
}

/**
 * Donnees quotidiennes Open-Meteo pour nbJours (1 a 7).
 */
function meteoQuotidienne(nbJours) {
  var url = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=' + METEO_LAT
    + '&longitude=' + METEO_LON
    + '&timezone=' + encodeURIComponent(METEO_TZ)
    + '&models=gem_seamless'
    + '&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,'
    + 'snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,'
    + 'cloud_cover_mean,weather_code,sunrise,sunset'
    + '&hourly=cloud_cover,precipitation,pressure_msl,'
    + 'relative_humidity_2m,visibility'
    + '&forecast_days=' + nbJours;

  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) {
    throw new Error('Open-Meteo ' + res.getResponseCode() + ' - '
      + res.getContentText().substring(0, 120));
  }

  return JSON.parse(res.getContentText());
}

/**
 * Mot du ciel pour une journee, avec le garde-fou des traces: si le code
 * annonce bruine/pluie mais que le cumul est nul, on decrit les nuages.
 */
function motDuJour(dj, i, precip, neige) {
  var mot = meteoMot(dj.weather_code[i]);
  if (dj.weather_code[i] >= 51 && precip < 0.5 && neige < 0.5) {
    mot = motNuages(dj.cloud_cover_mean[i]);
  }
  return mot;
}

/**
 * "meteo 2" a "meteo 4": un texto complet et autonome par journee.
 * Retourne un tableau de blocs, un par jour.
 */
function previsionMeteoJours(nbJours) {
  var donnees = meteoQuotidienne(nbJours);
  var dj = donnees.daily;
  var hq = donnees.hourly;
  var blocs = [];

  for (var i = 0; i < dj.time.length; i++) {
    var precip = dj.precipitation_sum[i] || 0;
    var neige = dj.snowfall_sum[i] || 0;
    var mot = motDuJour(dj, i, precip, neige);

    var lignes = [];
    lignes.push('=== ' + jourSemaine(dj.time[i]).toUpperCase()
      + (mot ? ' - ' + mot.toUpperCase() : '') + ' ===');
    lignes.push('');

    var t = Math.round(dj.temperature_2m_min[i]) + 'C a '
      + Math.round(dj.temperature_2m_max[i]) + 'C';
    if (precip >= 0.5) {
      t += ', precip ' + Math.round(precip) + 'mm';
      if (neige >= 0.5) {
        t += ' (neige ' + Math.round(neige) + 'cm)';
      }
    } else {
      t += ', sec';
    }
    lignes.push(t);

    lignes.push('Nuages ' + Math.round(dj.cloud_cover_mean[i]) + '%');

    var matin = infoMatin(hq, dj.time[i]);
    if (matin) {
      lignes.push(matin);
    }

    lignes.push('Vent ' + pointCardinal(dj.wind_direction_10m_dominant[i]) + ' '
      + Math.round(dj.wind_speed_10m_max[i]) + ', raf '
      + Math.round(dj.wind_gusts_10m_max[i]) + ', pression '
      + tendancePressionJour(hq, dj.time[i]));

    lignes.push('Soleil ' + heureCourte(dj.sunrise[i]) + '-'
      + heureCourte(dj.sunset[i]));

    var lune = luneLeverCoucher(dj.time[i]);
    if (lune) {
      lignes.push('Lune ' + lune);
    }

    blocs.push(lignes.join('\n'));
  }

  // Les meilleurs soirs pour les etoiles, annonces dans le premier texto
  if (blocs.length > 0) {
    blocs[0] += '\n' + meilleursSoirs(dj, hq, false);
  }

  return blocs;
}

/**
 * "meteo 5" a "meteo 7": bulletin condense, une ligne par jour avec
 * l'essentiel - temperatures, ciel, precipitations, rafale max.
 */
function previsionMeteoSemaine(nbJours) {
  var donnees = meteoQuotidienne(nbJours);
  var dj = donnees.daily;
  var lignes = ['METEO ' + nbJours + 'J'];
  lignes.push('Emis ' + momentEmission());
  lignes.push(meilleursSoirs(dj, donnees.hourly, true));
  lignes.push('');

  for (var i = 0; i < dj.time.length; i++) {
    var precip = dj.precipitation_sum[i] || 0;
    var neige = dj.snowfall_sum[i] || 0;
    var mot = motDuJour(dj, i, precip, neige);

    var l = jourSemaine(dj.time[i]) + ': '
      + Math.round(dj.temperature_2m_min[i]) + ' a '
      + Math.round(dj.temperature_2m_max[i]) + 'C, ' + mot;

    if (precip >= 0.5) {
      l += ' ' + Math.round(precip) + 'mm';
      if (neige >= 0.5) {
        l += ' (' + Math.round(neige) + 'cm)';
      }
    }

    l += ', raf ' + Math.round(dj.wind_gusts_10m_max[i]);

    lignes.push(l);
    lignes.push('');
  }

  return lignes.join('\n');
}

// "2026-08-28T05:58" -> "5h58"
function heureCourte(iso) {
  return parseInt(iso.substring(11, 13), 10) + 'h' + iso.substring(14, 16);
}

function jourSemaine(iso) {
  var jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  var dte = new Date(iso + 'T12:00:00');
  return jours[dte.getDay()] + ' ' + parseInt(iso.substring(8, 10), 10);
}

function pointCardinal(deg) {
  var dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return dirs[Math.round(deg / 45) % 8];
}

/**
 * Un fait par texto, 140 caracteres au plus, sans accents (GSM-7).
 * testerEclipse() verifie les longueurs. Le premier texto se presente.
 */
var FAITS_ECLIPSE = [
  'Faits sur les eclipses solaires, un texto par minute. Repondez STOP pour arreter.',
  'Le Soleil est 400 fois plus large que la Lune, mais aussi environ 400 fois plus loin: les deux paraissent de la meme taille dans le ciel.',
  'Une eclipse solaire ne se produit qu\'a la nouvelle lune, quand la Lune passe exactement entre la Terre et le Soleil.',
  'Pas d\'eclipse a chaque nouvelle lune: l\'orbite de la Lune penche d\'environ 5 degres, et son ombre passe le plus souvent a cote de la Terre.',
  'La Terre voit au moins 2 et au plus 5 eclipses solaires par annee. Cinq dans la meme annee: 1935, et la prochaine fois en 2206.',
  'Trois sortes: partielle (la Lune mord le Soleil), annulaire (il reste un anneau de feu) et totale (le Soleil disparait).',
  'Eclipse annulaire: la Lune est trop loin de la Terre pour couvrir tout le Soleil. Il reste un anneau brillant, trop fort pour l\'oeil nu.',
  'La Lune passe de 356 000 a 407 000 km de la Terre environ. Sa distance decide si une eclipse centrale sera totale ou annulaire.',
  'Eclipse hybride: annulaire a un bout du trajet, totale ailleurs, parce que la Terre est ronde. La derniere: 20 avril 2023, Australie.',
  'La totalite ne peut pas durer plus d\'environ 7 min 30 s. La plus longue du 21e siecle: 6 min 39 s, le 22 juillet 2009, en Asie.',
  'La plus longue totalite du 3e millenaire: 7 min 29 s, le 16 juillet 2186. Presque le maximum possible.',
  'Prochaine grande totale: 2 aout 2027, jusqu\'a 6 min 23 s pres de Louxor, en Egypte. Elle passe aussi sur l\'Espagne et l\'Afrique du Nord.',
  '12 aout 2026: eclipse totale sur le Groenland, l\'Islande et l\'Espagne, en soiree.',
  '8 avril 2024: totale sur le Mexique, les Etats-Unis et l\'Est du Canada, dont le sud du Quebec. Jusqu\'a 4 min 28 s au Mexique.',
  'L\'ombre de la Lune file d\'ouest en est sur la Terre a plus de 1 700 km/h. Pres des poles, elle va plusieurs fois plus vite.',
  'La bande de totalite fait au plus 270 km de large environ, souvent bien moins. A cote, on ne voit qu\'une eclipse partielle.',
  'Meme a 99 %, une partielle n\'a rien d\'une totale: le 1 % de Soleil qui reste suffit a garder le jour.',
  'Une eclipse totale revient au meme endroit en moyenne une fois tous les 375 ans environ.',
  'Le saros: les eclipses se repetent aux 18 ans, 11 jours et 8 heures. Les 8 heures poussent la suivante d\'un tiers de tour vers l\'ouest.',
  'Trois saros, soit 54 ans et 33 jours, ramenent une eclipse a peu pres a la meme longitude.',
  'Une serie de saros dure 12 a 15 siecles et compte 70 a 85 eclipses. Elle commence pres d\'un pole et finit pres de l\'autre.',
  'Les eclipses viennent par saisons, environ aux 173 jours. Une eclipse de Soleil a souvent une eclipse de Lune a deux semaines pres.',
  'Une eclipse de Soleil se voit sur une bande etroite. Une eclipse de Lune se voit de toute la moitie de la Terre ou il fait nuit.',
  'Vue du Quebec, la Lune entame le Soleil par la droite (l\'ouest) et le quitte par la gauche: elle avance vers l\'est dans le ciel.',
  'Une eclipse totale dure 2 a 3 heures en tout: plus d\'une heure de partielle avant la totalite, autant apres.',
  'Ne jamais fixer le Soleil partiellement eclipse sans filtre: la retine brule sans douleur. Elle n\'a pas de recepteurs de douleur.',
  'Les lunettes de soleil, meme tres foncees, ne protegent pas. Il faut un filtre solaire fait pour ca, sans trou ni egratignure.',
  'Verre de soudeur: teinte 12 au minimum, 13 ou 14 plus confortable. Pas de masque auto-assombrissant: il peut reagir trop tard.',
  'Seule la totalite se regarde a l\'oeil nu, et seulement tant qu\'elle dure. Au premier eclat de Soleil, le filtre revient.',
  'Une eclipse annulaire ne fait jamais la nuit: l\'anneau qui reste est trop brillant pour etre regarde sans filtre.',
  'Stenope: un petit trou dans un carton projette l\'image du Soleil sur une feuille. Pendant l\'eclipse, on y voit le croissant.',
  'Sous un arbre pendant l\'eclipse, les trous entre les feuilles projettent des centaines de petits croissants de Soleil au sol.',
  'Une passoire, ou les doigts croises en grille, font aussi des stenopes: chaque trou projette un petit croissant.',
  'Pendant une partielle profonde, les ombres deviennent etrangement nettes: le Soleil n\'est plus qu\'un mince croissant.',
  'Juste avant la totalite, des bandes d\'ombre ondulent parfois au sol: l\'air turbulent brouille le dernier filet de Soleil.',
  'Grains de Baily: des perles de lumiere qui passent par les vallees du relief lunaire, quelques secondes avant la totalite.',
  'La bague a diamant: le dernier grain de Baily brille comme une pierre sur un anneau. Elle revient a la fin de la totalite.',
  'La chromosphere apparait comme un mince filet rose au bord de la Lune, quelques secondes au debut et a la fin de la totalite.',
  'Pendant la totalite, des proeminences rose-rouge depassent du bord de la Lune: des jets de gaz plus grands que la Terre.',
  'La couronne, l\'atmosphere exterieure du Soleil, ne se voit a l\'oeil nu que pendant la totalite. Elle depasse le million de degres.',
  'La couronne est des centaines de fois plus chaude que la surface du Soleil, a environ 5 500 degres. Pourquoi? On le cherche encore.',
  'En totalite, il fait sombre comme au crepuscule: Venus et les etoiles brillantes sortent, et tout l\'horizon prend les couleurs du soir.',
  'La temperature baisse de quelques degres sous l\'ombre de la Lune, et le vent change souvent quand l\'air refroidit.',
  'Les animaux s\'y trompent: des oiseaux se taisent ou rentrent au nid, les grillons se mettent a chanter.',
  'L\'helium a ete repere dans le spectre du Soleil pendant l\'eclipse du 18 aout 1868, 27 ans avant d\'etre trouve sur Terre.',
  '29 mai 1919: pendant une eclipse, Eddington mesure la deviation de la lumiere des etoiles par le Soleil. Einstein avait raison.',
  'Premiere photo de la couronne: un daguerreotype du 28 juillet 1851, pris a Konigsberg, en Prusse.',
  '1715: Edmond Halley predit a 4 minutes pres l\'eclipse totale sur Londres, et publie d\'avance la premiere carte d\'une eclipse.',
  '30 juin 1973: le Concorde 001 poursuit l\'ombre de la Lune au-dessus de l\'Afrique. Les savants a bord ont 74 minutes de totalite.',
  'Selon Herodote, une eclipse a arrete une bataille entre Medes et Lydiens, le 28 mai 585 av. J.-C. Thales l\'aurait predite.',
  'Selon une legende chinoise, les astronomes Hsi et Ho auraient ete executes pour ne pas avoir prevu une eclipse.',
  'Les eclipses anciennes servent a mesurer le ralentissement de la Terre: sans lui, elles tombent au mauvais endroit dans les calculs.',
  'On connait deja les dates et les bandes des eclipses jusqu\'en l\'an 3000.',
  'Le mot eclipse vient du grec ekleipsis: abandon, disparition.',
  'La Lune s\'eloigne d\'environ 3,8 cm par annee. Dans quelques centaines de millions d\'annees, elle ne cachera plus tout le Soleil.',
  'Aucune autre lune du systeme solaire ne couvre le Soleil aussi exactement que la notre. Une coincidence de notre epoque.',
  'Depuis Mars, la lune Phobos passe devant le Soleil en une quarantaine de secondes. Le rover Perseverance l\'a filme en avril 2022.',
  'Mercure et Venus passent aussi devant le Soleil, trop petites pour l\'eclipser: un point noir. Prochain passage de Venus: decembre 2117.'
];

/**
 * Appelee chaque minute par le declencheur: envoie le fait suivant a
 * ECLIPSE_NUMERO. Le rang du prochain fait vit dans les proprietes du
 * script, d'une execution a l'autre.
 */
function envoyerFaitEclipse() {
  var props = PropertiesService.getScriptProperties();
  var rang = parseInt(props.getProperty('ECLIPSE_RANG') || '0', 10);
  if (!(rang >= 0 && rang < FAITS_ECLIPSE.length)) {
    rang = 0;
  }

  try {
    envoyerSms(ECLIPSE_NUMERO, FAITS_ECLIPSE[rang]);
  } catch (err) {
    // 21610 = le destinataire a texte STOP: Twilio refusera tous les
    // envois suivants. On arrete plutot que d'echouer chaque minute.
    if (err.toString().indexOf('21610') >= 0) {
      arreterEclipse();
      return;
    }
    throw err;
  }

  rang++;
  if (rang >= FAITS_ECLIPSE.length) {
    if (!ECLIPSE_BOUCLE) {
      arreterEclipse();
      return;
    }
    rang = 0;
  }
  props.setProperty('ECLIPSE_RANG', String(rang));
}

/**
 * Repart du premier fait, l'envoie tout de suite, puis pose le
 * declencheur aux minutes. Un seul declencheur a la fois.
 */
function demarrerEclipse() {
  arreterEclipse();
  PropertiesService.getScriptProperties().setProperty('ECLIPSE_RANG', '0');
  envoyerFaitEclipse();
  ScriptApp.newTrigger('envoyerFaitEclipse')
    .timeBased()
    .everyMinutes(1)
    .create();
}

function arreterEclipse() {
  var declencheurs = ScriptApp.getProjectTriggers();
  for (var i = 0; i < declencheurs.length; i++) {
    if (declencheurs[i].getHandlerFunction() === 'envoyerFaitEclipse') {
      ScriptApp.deleteTrigger(declencheurs[i]);
    }
  }
}

function appelerClaude(question) {
  var cle = PropertiesService
    .getScriptProperties()
    .getProperty('ANTHROPIC_API_KEY');

  if (!cle) {
    throw new Error('ANTHROPIC_API_KEY absente');
  }

  var consigne =
      'Contexte: tu reponds par SMS a Jean-Philippe, installe dans un chalet '
    + 'hors reseau sur la Cote-Nord (Quebec). Domaines frequents: usine de '
    + 'prefabrique beton, planification, CNC, outillage, electricite '
    + '12V/solaire, propane, mecanique, vie en foret. Mais il peut poser '
    + 'n\'importe quelle question - reponds a tout.\n\n'

    + 'NIVEAU - ADAPTE-TOI A LA QUESTION:\n'
    + '- Question simple = reponse simple, en francais courant, comprehensible '
    + 'du premier coup. Pas de jargon si la question n\'en demande pas.\n'
    + '- Question technique pointue = reponse technique: valeurs chiffrees '
    + 'precises, unites exactes (AWG, A, %, Nm, PSI, kPa), normes (CSA, code '
    + 'C22.1) quand la securite ou la conformite est en jeu.\n'
    + '- Un terme technique necessaire vient toujours avec son chiffre ou une '
    + 'phrase claire qui le rend comprehensible.\n'
    + '- Pas de compliments, pas de remplissage, pas de politesses, pas de '
    + 'repetition de la question. Direct et concret.\n\n'

    + 'CONTRAINTES DE LA QUESTION - ABSOLUES:\n'
    + '- Chaque precision qu\'il donne (plateforme, appareil, version, modele, '
    + 'marque, dimension, annee) est une contrainte DURE. Une reponse qui ne '
    + 's\'applique pas exactement a sa situation est inutile et lui coute des '
    + 'textos satellite payants.\n'
    + '- INTERDIT de livrer une reponse d\'une autre plateforme, version ou '
    + 'situation avec un avertissement a la fin ("ca vient du PC, ca peut '
    + 'differer"). Si tu doutes que ta reponse s\'applique a SA situation, ne '
    + 'l\'envoie pas.\n'
    + '- Si tes recherches ne trouvent rien qui respecte la contrainte, dis-le '
    + 'en une ou deux phrases et arrete la: "Rien de verifie pour [sa '
    + 'situation]; ce qui circule vaut pour [autre chose]." Une reponse courte '
    + 'et honnete vaut mieux que six textos douteux.\n'
    + '- Avant d\'ecrire, relis la question et verifie que CHAQUE element de '
    + 'ta reponse respecte toutes ses contraintes.\n'
    + '- Une seule recommandation solide. Pas de variantes non demandees.\n\n'

    + 'RECHERCHE:\n'
    + '- Mets les contraintes dans tes requetes de recherche (plateforme, '
    + 'modele, version) et rejette les resultats qui ne les respectent pas.\n'
    + '- Utilise web_search pour tout chiffre, spec, norme, compatibilite de '
    + 'piece, prix ou actualite. Ne donne pas ces valeurs de memoire.\n'
    + '- Question de comprehension generale sans chiffre critique: tu peux '
    + 'repondre sans chercher.\n'
    + '- Deux sources pour un chiffre de securite; si contradiction, dis-le et '
    + 'donne la valeur prudente.\n\n'

    + 'SECURITE:\n'
    + '- Electricite, gaz, structure: reste conservateur et signale le point '
    + 'critique en une phrase quand il y en a un.\n'
    + '- Quand ca compte, distingue ce qui est confirme, ce qui est a valider, '
    + 'et ce qui doit etre mesure sur place.\n\n'

    + 'FORMAT SMS - IMPORTANT:\n'
    + '- Ta reponse part sur une liaison satellite, decoupee en textos de 140 '
    + 'caracteres. Phrases courtes. Information la plus importante en premier.\n'
    + '- Vise moins de 600 caracteres. Va plus long seulement si la question '
    + 'exige du detail (procedure, plusieurs valeurs). Maximum absolu '
    + LIMITE_CARACTERES + ' caracteres: au-dela, la reponse est coupee.\n'
    + '- Texte suivi seulement: aucun gras, titre, puce ou tiret de liste.\n'
    + '- Ne narre pas tes recherches. Aucune URL, aucune citation.\n'
    + '- Liste demandee = phrase avec virgules ou points-virgules.';

  var payload = {
    model: MODELE,
    max_tokens: MAX_TOKENS,
    system: consigne,
    // Effort maximal: reflexion la plus poussee, au prix de la latence.
    // Si trop de timeouts a 60 s (limite dure d'Apps Script), descendre a 'xhigh'.
    output_config: { effort: 'max' },
    // Si Fable refuse une question (rare), l'API la rejoue sur Opus
    // dans le meme appel au lieu de laisser tomber le SMS.
    fallbacks: 'default',
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: MAX_RECHERCHES
      }
    ],
    tool_choice: { type: 'auto' },
    messages: [
      { role: 'user', content: question }
    ]
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': cle,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'server-side-fallback-2026-07-01'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  var code = res.getResponseCode();
  var corps = res.getContentText();

  Logger.log('Anthropic HTTP ' + code);

  if (code !== 200) {
    throw new Error('API Claude ' + code + ' - ' + corps.substring(0, 180));
  }

  var data = JSON.parse(corps);

  // Fable peut refuser proprement (HTTP 200, stop_reason 'refusal').
  // Sans ce garde, on enverrait "Reponse vide." sans explication.
  if (data.stop_reason === 'refusal') {
    return 'Question refusee par le modele. Reformule autrement.';
  }

  var blocs = data.content || [];

  // Le modele peut chercher plusieurs fois. La vraie reponse est le texte
  // qui vient APRES le dernier resultat de recherche. On ignore le texte
  // intermediaire pour ne garder que la reponse finale.
  var dernierResultat = -1;
  for (var i = 0; i < blocs.length; i++) {
    if (blocs[i].type === 'web_search_tool_result') {
      dernierResultat = i;
    }
  }

  var sortie = '';
  for (var j = 0; j < blocs.length; j++) {
    if (blocs[j].type === 'text' && j > dernierResultat) {
      sortie += blocs[j].text;
    }
  }

  // Filet: si aucun texte apres les recherches, prend tout le texte.
  if (!sortie) {
    for (var k = 0; k < blocs.length; k++) {
      if (blocs[k].type === 'text') {
        sortie += blocs[k].text;
      }
    }
  }

  sortie = nettoyerPourSms(sortie);

  return sortie || 'Reponse vide.';
}

/**
 * Retire la mise en forme markdown residuelle, retire les accents si demande,
 * et coupe proprement a LIMITE_CARACTERES sans casser un mot en deux.
 */
function nettoyerPourSms(texte) {
  var t = String(texte).trim();

  // Retire le markdown que Claude pourrait glisser malgre la consigne
  t = t.replace(/\*\*/g, '');
  t = t.replace(/\*/g, '');
  t = t.replace(/^#+\s*/gm, '');
  t = t.replace(/^[-•]\s*/gm, '');

  // Retire d'eventuels marqueurs de citation [1], [2], etc.
  t = t.replace(/\[\d+\]/g, '');

  // Compacte les sauts de ligne multiples
  t = t.replace(/\n{2,}/g, ' ');
  t = t.replace(/\n/g, ' ');
  t = t.replace(/\s{2,}/g, ' ');
  t = t.trim();

  // Retire les accents pour rester en GSM-7 (SMS moins cher)
  if (STRIP_ACCENTS) {
    t = retirerAccents(t);
  }

  if (t.length <= LIMITE_CARACTERES) {
    return t;
  }

  // Coupe au dernier espace avant la limite de securite
  var coupe = t.substring(0, LIMITE_CARACTERES - 3);
  var dernierEspace = coupe.lastIndexOf(' ');

  if (dernierEspace > LIMITE_CARACTERES * 0.7) {
    coupe = coupe.substring(0, dernierEspace);
  }

  return coupe + '...';
}

/**
 * Convertit les caracteres accentues francais vers leur equivalent ASCII.
 */
function retirerAccents(texte) {
  var map = {
    'à':'a','â':'a','ä':'a','á':'a','ã':'a','å':'a',
    'ç':'c',
    'è':'e','é':'e','ê':'e','ë':'e',
    'ì':'i','î':'i','ï':'i','í':'i',
    'ò':'o','ô':'o','ö':'o','ó':'o','õ':'o',
    'ù':'u','û':'u','ü':'u','ú':'u',
    'ÿ':'y','ñ':'n',
    'À':'A','Â':'A','Ä':'A','Á':'A','Ã':'A','Å':'A',
    'Ç':'C',
    'È':'E','É':'E','Ê':'E','Ë':'E',
    'Ì':'I','Î':'I','Ï':'I','Í':'I',
    'Ò':'O','Ô':'O','Ö':'O','Ó':'O','Õ':'O',
    'Ù':'U','Û':'U','Ü':'U','Ú':'U',
    'Ÿ':'Y','Ñ':'N',
    'œ':'oe','Œ':'OE','æ':'ae','Æ':'AE'
  };

  var sortie = '';
  for (var i = 0; i < texte.length; i++) {
    var c = texte.charAt(i);
    sortie += (map[c] !== undefined) ? map[c] : c;
  }
  return sortie;
}

/**
 * Envoi d'UN SMS via l'API REST Twilio. Pour les messages longs,
 * passer par envoyerSmsSerie.
 */
function envoyerSms(destinataire, message) {
  var props = PropertiesService.getScriptProperties();

  var sid = props.getProperty('TWILIO_SID');
  var token = props.getProperty('TWILIO_TOKEN');
  var numero = props.getProperty('TWILIO_NUMERO');

  if (!sid || !token || !numero) {
    throw new Error('TWILIO_SID, TWILIO_TOKEN ou TWILIO_NUMERO absent des proprietes');
  }

  var url = 'https://api.twilio.com/2010-04-01/Accounts/'
          + sid + '/Messages.json';

  if (message.length > 1500) {
    message = message.substring(0, 1500);
  }

  var options = {
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(sid + ':' + token)
    },
    payload: {
      To: destinataire,
      From: numero,
      Body: message
    },
    muteHttpExceptions: true
  };

  var res = UrlFetchApp.fetch(url, options);
  var code = res.getResponseCode();

  Logger.log('Twilio HTTP ' + code + ' - ' + res.getContentText().substring(0, 300));

  if (code < 200 || code >= 300) {
    throw new Error('Twilio ' + code + ' - ' + res.getContentText().substring(0, 180));
  }

  // Le SID permet a envoyerSmsSerie de suivre le statut du message
  try {
    return JSON.parse(res.getContentText()).sid || '';
  } catch (e2) {
    return '';
  }
}

function parseFormEncoded(contenu) {
  var obj = {};
  var paires = String(contenu).split('&');

  for (var i = 0; i < paires.length; i++) {
    var kv = paires[i].split('=');
    if (kv.length === 2) {
      var k = decodeURIComponent(kv[0].replace(/\+/g, ' '));
      var v = decodeURIComponent(kv[1].replace(/\+/g, ' '));
      obj[k] = v;
    }
  }

  return obj;
}

/**
 * TEST 1 - verifie l'API Claude, la recherche web et la longueur.
 */
function testerClaude() {
  var r = appelerClaude('Ampacite et chute de tension acceptable pour un run 12V de 8m qui tire 15A, quel AWG?');
  Logger.log('LONGUEUR: ' + r.length + ' caracteres');
  Logger.log('REPONSE: ' + r);
}

/**
 * TEST 2 - verifie les trois formats meteo.
 */
function testerMeteo() {
  var hh = previsionMeteoHoraire();
  Logger.log('AUJ+DEMAIN (' + hh.length + ' car.):\n' + hh);

  var jours = previsionMeteoJours(3);
  Logger.log('3 JOURS (' + jours.length + ' textos):\n' + jours.join('\n---\n'));

  var sem = previsionMeteoSemaine(7);
  Logger.log('7 JOURS (' + sem.length + ' car.):\n' + sem);
}

/**
 * TEST 3 - verifie le decoupage en serie sans rien envoyer.
 */
function testerDecoupe() {
  var faux = previsionMeteoHoraire();
  var brut = SMS_TAILLE - 8;
  var n = Math.ceil(faux.length / brut);
  Logger.log('Message de ' + faux.length + ' car. -> environ ' + n + ' textos');
}

/**
 * TEST 4 - verifie l'envoi SMS Twilio seulement.
 */
function testerSms() {
  envoyerSms('+14182973188', 'Test envoi direct depuis Apps Script');
}

/**
 * TEST 5 - verifie que chaque fait eclipse tient dans un texto, sans
 * rien envoyer.
 */
function testerEclipse() {
  var trop = 0;
  for (var i = 0; i < FAITS_ECLIPSE.length; i++) {
    if (FAITS_ECLIPSE[i].length > SMS_TAILLE
        || retirerAccents(FAITS_ECLIPSE[i]) !== FAITS_ECLIPSE[i]) {
      Logger.log('FAIT ' + i + ' (' + FAITS_ECLIPSE[i].length + ' car.): '
        + FAITS_ECLIPSE[i]);
      trop++;
    }
  }
  Logger.log(FAITS_ECLIPSE.length + ' faits, ' + trop + ' a corriger');
}
