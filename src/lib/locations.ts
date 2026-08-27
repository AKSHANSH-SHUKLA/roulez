/**
 * Toute la France — lieux de prise en charge.
 *
 * Genere : ne pas editer a la main, editer scripts/build_locations.py puis regenerer.
 * Contient les 101 departements, les 18 regions, les prefectures, les grandes villes
 * et villes touristiques, les aeroports et les principales gares.
 *
 * `q` est la chaine de recherche normalisee (sans accents, sans tirets) : elle
 * contient le nom, la ville, le departement, son numero et la region, pour qu'une
 * recherche "indre" trouve Tours et "37" trouve Indre-et-Loire.
 */

export type FrLocationType = 'airport' | 'city' | 'train_station' | 'department' | 'region';

export interface FrLocation {
  id: string;
  name: string;
  city: string;
  type: FrLocationType;
  department: string;
  region: string;
  /** 1 = grande metropole, 2 = ville moyenne, 3 = petite ville */
  importance: 1 | 2 | 3;
  /** chaine de recherche normalisee */
  q: string;
}

export const typeLabels: Record<FrLocationType, string> = {
  airport: 'Aeroport',
  train_station: 'Gare',
  city: 'Ville',
  department: 'Departement',
  region: 'Region',
};

/** Enleve accents, tirets et apostrophes pour comparer ce que les gens tapent vraiment. */
export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export const FR_LOCATIONS: FrLocation[] = [
{
"id": "reg-auvergne-rhone-alpes",
"name": "Auvergne-Rhone-Alpes",
"city": "Auvergne-Rhone-Alpes",
"type": "region",
"department": "",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "auvergne rhone alpes auvergne rhone alpes auvergne rhone alpes"
},
{
"id": "reg-hauts-de-france",
"name": "Hauts-de-France",
"city": "Hauts-de-France",
"type": "region",
"department": "",
"region": "Hauts-de-France",
"importance": 2,
"q": "hauts de france hauts de france hauts de france"
},
{
"id": "reg-provence-alpes-cote-d-azur",
"name": "Provence-Alpes-Cote d'Azur",
"city": "Provence-Alpes-Cote d'Azur",
"type": "region",
"department": "",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "provence alpes cote d azur provence alpes cote d azur provence alpes cote d azur"
},
{
"id": "reg-grand-est",
"name": "Grand Est",
"city": "Grand Est",
"type": "region",
"department": "",
"region": "Grand Est",
"importance": 2,
"q": "grand est grand est grand est"
},
{
"id": "reg-occitanie",
"name": "Occitanie",
"city": "Occitanie",
"type": "region",
"department": "",
"region": "Occitanie",
"importance": 2,
"q": "occitanie occitanie occitanie"
},
{
"id": "reg-normandie",
"name": "Normandie",
"city": "Normandie",
"type": "region",
"department": "",
"region": "Normandie",
"importance": 2,
"q": "normandie normandie normandie"
},
{
"id": "reg-nouvelle-aquitaine",
"name": "Nouvelle-Aquitaine",
"city": "Nouvelle-Aquitaine",
"type": "region",
"department": "",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "nouvelle aquitaine nouvelle aquitaine nouvelle aquitaine"
},
{
"id": "reg-centre-val-de-loire",
"name": "Centre-Val de Loire",
"city": "Centre-Val de Loire",
"type": "region",
"department": "",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "centre val de loire centre val de loire centre val de loire"
},
{
"id": "reg-corse",
"name": "Corse",
"city": "Corse",
"type": "region",
"department": "",
"region": "Corse",
"importance": 2,
"q": "corse corse corse"
},
{
"id": "reg-bourgogne-franche-comte",
"name": "Bourgogne-Franche-Comte",
"city": "Bourgogne-Franche-Comte",
"type": "region",
"department": "",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "bourgogne franche comte bourgogne franche comte bourgogne franche comte"
},
{
"id": "reg-bretagne",
"name": "Bretagne",
"city": "Bretagne",
"type": "region",
"department": "",
"region": "Bretagne",
"importance": 2,
"q": "bretagne bretagne bretagne"
},
{
"id": "reg-pays-de-la-loire",
"name": "Pays de la Loire",
"city": "Pays de la Loire",
"type": "region",
"department": "",
"region": "Pays de la Loire",
"importance": 2,
"q": "pays de la loire pays de la loire pays de la loire"
},
{
"id": "reg-ile-de-france",
"name": "Ile-de-France",
"city": "Ile-de-France",
"type": "region",
"department": "",
"region": "Ile-de-France",
"importance": 2,
"q": "ile de france ile de france ile de france"
},
{
"id": "reg-guadeloupe",
"name": "Guadeloupe",
"city": "Guadeloupe",
"type": "region",
"department": "",
"region": "Guadeloupe",
"importance": 2,
"q": "guadeloupe guadeloupe guadeloupe"
},
{
"id": "reg-martinique",
"name": "Martinique",
"city": "Martinique",
"type": "region",
"department": "",
"region": "Martinique",
"importance": 2,
"q": "martinique martinique martinique"
},
{
"id": "reg-guyane",
"name": "Guyane",
"city": "Guyane",
"type": "region",
"department": "",
"region": "Guyane",
"importance": 2,
"q": "guyane guyane guyane"
},
{
"id": "reg-la-reunion",
"name": "La Reunion",
"city": "La Reunion",
"type": "region",
"department": "",
"region": "La Reunion",
"importance": 2,
"q": "la reunion la reunion la reunion"
},
{
"id": "reg-mayotte",
"name": "Mayotte",
"city": "Mayotte",
"type": "region",
"department": "",
"region": "Mayotte",
"importance": 2,
"q": "mayotte mayotte mayotte"
},
{
"id": "dep-01",
"name": "Ain (01)",
"city": "Ain",
"type": "department",
"department": "01",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "ain 01 ain auvergne rhone alpes ain 01"
},
{
"id": "dep-02",
"name": "Aisne (02)",
"city": "Aisne",
"type": "department",
"department": "02",
"region": "Hauts-de-France",
"importance": 2,
"q": "aisne 02 aisne hauts de france aisne 02"
},
{
"id": "dep-03",
"name": "Allier (03)",
"city": "Allier",
"type": "department",
"department": "03",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "allier 03 allier auvergne rhone alpes allier 03"
},
{
"id": "dep-04",
"name": "Alpes-de-Haute-Provence (04)",
"city": "Alpes-de-Haute-Provence",
"type": "department",
"department": "04",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "alpes de haute provence 04 alpes de haute provence provence alpes cote d azur alpes de haute provence 04"
},
{
"id": "dep-05",
"name": "Hautes-Alpes (05)",
"city": "Hautes-Alpes",
"type": "department",
"department": "05",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "hautes alpes 05 hautes alpes provence alpes cote d azur hautes alpes 05"
},
{
"id": "dep-06",
"name": "Alpes-Maritimes (06)",
"city": "Alpes-Maritimes",
"type": "department",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "alpes maritimes 06 alpes maritimes provence alpes cote d azur alpes maritimes 06"
},
{
"id": "dep-07",
"name": "Ardeche (07)",
"city": "Ardeche",
"type": "department",
"department": "07",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "ardeche 07 ardeche auvergne rhone alpes ardeche 07"
},
{
"id": "dep-08",
"name": "Ardennes (08)",
"city": "Ardennes",
"type": "department",
"department": "08",
"region": "Grand Est",
"importance": 2,
"q": "ardennes 08 ardennes grand est ardennes 08"
},
{
"id": "dep-09",
"name": "Ariege (09)",
"city": "Ariege",
"type": "department",
"department": "09",
"region": "Occitanie",
"importance": 2,
"q": "ariege 09 ariege occitanie ariege 09"
},
{
"id": "dep-10",
"name": "Aube (10)",
"city": "Aube",
"type": "department",
"department": "10",
"region": "Grand Est",
"importance": 2,
"q": "aube 10 aube grand est aube 10"
},
{
"id": "dep-11",
"name": "Aude (11)",
"city": "Aude",
"type": "department",
"department": "11",
"region": "Occitanie",
"importance": 2,
"q": "aude 11 aude occitanie aude 11"
},
{
"id": "dep-12",
"name": "Aveyron (12)",
"city": "Aveyron",
"type": "department",
"department": "12",
"region": "Occitanie",
"importance": 2,
"q": "aveyron 12 aveyron occitanie aveyron 12"
},
{
"id": "dep-13",
"name": "Bouches-du-Rhone (13)",
"city": "Bouches-du-Rhone",
"type": "department",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "bouches du rhone 13 bouches du rhone provence alpes cote d azur bouches du rhone 13"
},
{
"id": "dep-14",
"name": "Calvados (14)",
"city": "Calvados",
"type": "department",
"department": "14",
"region": "Normandie",
"importance": 2,
"q": "calvados 14 calvados normandie calvados 14"
},
{
"id": "dep-15",
"name": "Cantal (15)",
"city": "Cantal",
"type": "department",
"department": "15",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "cantal 15 cantal auvergne rhone alpes cantal 15"
},
{
"id": "dep-16",
"name": "Charente (16)",
"city": "Charente",
"type": "department",
"department": "16",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "charente 16 charente nouvelle aquitaine charente 16"
},
{
"id": "dep-17",
"name": "Charente-Maritime (17)",
"city": "Charente-Maritime",
"type": "department",
"department": "17",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "charente maritime 17 charente maritime nouvelle aquitaine charente maritime 17"
},
{
"id": "dep-18",
"name": "Cher (18)",
"city": "Cher",
"type": "department",
"department": "18",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "cher 18 cher centre val de loire cher 18"
},
{
"id": "dep-19",
"name": "Correze (19)",
"city": "Correze",
"type": "department",
"department": "19",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "correze 19 correze nouvelle aquitaine correze 19"
},
{
"id": "dep-2a",
"name": "Corse-du-Sud (2A)",
"city": "Corse-du-Sud",
"type": "department",
"department": "2A",
"region": "Corse",
"importance": 2,
"q": "corse du sud 2a corse du sud corse corse du sud 2a"
},
{
"id": "dep-2b",
"name": "Haute-Corse (2B)",
"city": "Haute-Corse",
"type": "department",
"department": "2B",
"region": "Corse",
"importance": 2,
"q": "haute corse 2b haute corse corse haute corse 2b"
},
{
"id": "dep-21",
"name": "Cote-d'Or (21)",
"city": "Cote-d'Or",
"type": "department",
"department": "21",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "cote d or 21 cote d or bourgogne franche comte cote d or 21"
},
{
"id": "dep-22",
"name": "Cotes-d'Armor (22)",
"city": "Cotes-d'Armor",
"type": "department",
"department": "22",
"region": "Bretagne",
"importance": 2,
"q": "cotes d armor 22 cotes d armor bretagne cotes d armor 22"
},
{
"id": "dep-23",
"name": "Creuse (23)",
"city": "Creuse",
"type": "department",
"department": "23",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "creuse 23 creuse nouvelle aquitaine creuse 23"
},
{
"id": "dep-24",
"name": "Dordogne (24)",
"city": "Dordogne",
"type": "department",
"department": "24",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "dordogne 24 dordogne nouvelle aquitaine dordogne 24"
},
{
"id": "dep-25",
"name": "Doubs (25)",
"city": "Doubs",
"type": "department",
"department": "25",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "doubs 25 doubs bourgogne franche comte doubs 25"
},
{
"id": "dep-26",
"name": "Drome (26)",
"city": "Drome",
"type": "department",
"department": "26",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "drome 26 drome auvergne rhone alpes drome 26"
},
{
"id": "dep-27",
"name": "Eure (27)",
"city": "Eure",
"type": "department",
"department": "27",
"region": "Normandie",
"importance": 2,
"q": "eure 27 eure normandie eure 27"
},
{
"id": "dep-28",
"name": "Eure-et-Loir (28)",
"city": "Eure-et-Loir",
"type": "department",
"department": "28",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "eure et loir 28 eure et loir centre val de loire eure et loir 28"
},
{
"id": "dep-29",
"name": "Finistere (29)",
"city": "Finistere",
"type": "department",
"department": "29",
"region": "Bretagne",
"importance": 2,
"q": "finistere 29 finistere bretagne finistere 29"
},
{
"id": "dep-30",
"name": "Gard (30)",
"city": "Gard",
"type": "department",
"department": "30",
"region": "Occitanie",
"importance": 2,
"q": "gard 30 gard occitanie gard 30"
},
{
"id": "dep-31",
"name": "Haute-Garonne (31)",
"city": "Haute-Garonne",
"type": "department",
"department": "31",
"region": "Occitanie",
"importance": 2,
"q": "haute garonne 31 haute garonne occitanie haute garonne 31"
},
{
"id": "dep-32",
"name": "Gers (32)",
"city": "Gers",
"type": "department",
"department": "32",
"region": "Occitanie",
"importance": 2,
"q": "gers 32 gers occitanie gers 32"
},
{
"id": "dep-33",
"name": "Gironde (33)",
"city": "Gironde",
"type": "department",
"department": "33",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "gironde 33 gironde nouvelle aquitaine gironde 33"
},
{
"id": "dep-34",
"name": "Herault (34)",
"city": "Herault",
"type": "department",
"department": "34",
"region": "Occitanie",
"importance": 2,
"q": "herault 34 herault occitanie herault 34"
},
{
"id": "dep-35",
"name": "Ille-et-Vilaine (35)",
"city": "Ille-et-Vilaine",
"type": "department",
"department": "35",
"region": "Bretagne",
"importance": 2,
"q": "ille et vilaine 35 ille et vilaine bretagne ille et vilaine 35"
},
{
"id": "dep-36",
"name": "Indre (36)",
"city": "Indre",
"type": "department",
"department": "36",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "indre 36 indre centre val de loire indre 36"
},
{
"id": "dep-37",
"name": "Indre-et-Loire (37)",
"city": "Indre-et-Loire",
"type": "department",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "indre et loire 37 indre et loire centre val de loire indre et loire 37"
},
{
"id": "dep-38",
"name": "Isere (38)",
"city": "Isere",
"type": "department",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "isere 38 isere auvergne rhone alpes isere 38"
},
{
"id": "dep-39",
"name": "Jura (39)",
"city": "Jura",
"type": "department",
"department": "39",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "jura 39 jura bourgogne franche comte jura 39"
},
{
"id": "dep-40",
"name": "Landes (40)",
"city": "Landes",
"type": "department",
"department": "40",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "landes 40 landes nouvelle aquitaine landes 40"
},
{
"id": "dep-41",
"name": "Loir-et-Cher (41)",
"city": "Loir-et-Cher",
"type": "department",
"department": "41",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "loir et cher 41 loir et cher centre val de loire loir et cher 41"
},
{
"id": "dep-42",
"name": "Loire (42)",
"city": "Loire",
"type": "department",
"department": "42",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "loire 42 loire auvergne rhone alpes loire 42"
},
{
"id": "dep-43",
"name": "Haute-Loire (43)",
"city": "Haute-Loire",
"type": "department",
"department": "43",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "haute loire 43 haute loire auvergne rhone alpes haute loire 43"
},
{
"id": "dep-44",
"name": "Loire-Atlantique (44)",
"city": "Loire-Atlantique",
"type": "department",
"department": "44",
"region": "Pays de la Loire",
"importance": 2,
"q": "loire atlantique 44 loire atlantique pays de la loire loire atlantique 44"
},
{
"id": "dep-45",
"name": "Loiret (45)",
"city": "Loiret",
"type": "department",
"department": "45",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "loiret 45 loiret centre val de loire loiret 45"
},
{
"id": "dep-46",
"name": "Lot (46)",
"city": "Lot",
"type": "department",
"department": "46",
"region": "Occitanie",
"importance": 2,
"q": "lot 46 lot occitanie lot 46"
},
{
"id": "dep-47",
"name": "Lot-et-Garonne (47)",
"city": "Lot-et-Garonne",
"type": "department",
"department": "47",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "lot et garonne 47 lot et garonne nouvelle aquitaine lot et garonne 47"
},
{
"id": "dep-48",
"name": "Lozere (48)",
"city": "Lozere",
"type": "department",
"department": "48",
"region": "Occitanie",
"importance": 2,
"q": "lozere 48 lozere occitanie lozere 48"
},
{
"id": "dep-49",
"name": "Maine-et-Loire (49)",
"city": "Maine-et-Loire",
"type": "department",
"department": "49",
"region": "Pays de la Loire",
"importance": 2,
"q": "maine et loire 49 maine et loire pays de la loire maine et loire 49"
},
{
"id": "dep-50",
"name": "Manche (50)",
"city": "Manche",
"type": "department",
"department": "50",
"region": "Normandie",
"importance": 2,
"q": "manche 50 manche normandie manche 50"
},
{
"id": "dep-51",
"name": "Marne (51)",
"city": "Marne",
"type": "department",
"department": "51",
"region": "Grand Est",
"importance": 2,
"q": "marne 51 marne grand est marne 51"
},
{
"id": "dep-52",
"name": "Haute-Marne (52)",
"city": "Haute-Marne",
"type": "department",
"department": "52",
"region": "Grand Est",
"importance": 2,
"q": "haute marne 52 haute marne grand est haute marne 52"
},
{
"id": "dep-53",
"name": "Mayenne (53)",
"city": "Mayenne",
"type": "department",
"department": "53",
"region": "Pays de la Loire",
"importance": 2,
"q": "mayenne 53 mayenne pays de la loire mayenne 53"
},
{
"id": "dep-54",
"name": "Meurthe-et-Moselle (54)",
"city": "Meurthe-et-Moselle",
"type": "department",
"department": "54",
"region": "Grand Est",
"importance": 2,
"q": "meurthe et moselle 54 meurthe et moselle grand est meurthe et moselle 54"
},
{
"id": "dep-55",
"name": "Meuse (55)",
"city": "Meuse",
"type": "department",
"department": "55",
"region": "Grand Est",
"importance": 2,
"q": "meuse 55 meuse grand est meuse 55"
},
{
"id": "dep-56",
"name": "Morbihan (56)",
"city": "Morbihan",
"type": "department",
"department": "56",
"region": "Bretagne",
"importance": 2,
"q": "morbihan 56 morbihan bretagne morbihan 56"
},
{
"id": "dep-57",
"name": "Moselle (57)",
"city": "Moselle",
"type": "department",
"department": "57",
"region": "Grand Est",
"importance": 2,
"q": "moselle 57 moselle grand est moselle 57"
},
{
"id": "dep-58",
"name": "Nievre (58)",
"city": "Nievre",
"type": "department",
"department": "58",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "nievre 58 nievre bourgogne franche comte nievre 58"
},
{
"id": "dep-59",
"name": "Nord (59)",
"city": "Nord",
"type": "department",
"department": "59",
"region": "Hauts-de-France",
"importance": 2,
"q": "nord 59 nord hauts de france nord 59"
},
{
"id": "dep-60",
"name": "Oise (60)",
"city": "Oise",
"type": "department",
"department": "60",
"region": "Hauts-de-France",
"importance": 2,
"q": "oise 60 oise hauts de france oise 60"
},
{
"id": "dep-61",
"name": "Orne (61)",
"city": "Orne",
"type": "department",
"department": "61",
"region": "Normandie",
"importance": 2,
"q": "orne 61 orne normandie orne 61"
},
{
"id": "dep-62",
"name": "Pas-de-Calais (62)",
"city": "Pas-de-Calais",
"type": "department",
"department": "62",
"region": "Hauts-de-France",
"importance": 2,
"q": "pas de calais 62 pas de calais hauts de france pas de calais 62"
},
{
"id": "dep-63",
"name": "Puy-de-Dome (63)",
"city": "Puy-de-Dome",
"type": "department",
"department": "63",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "puy de dome 63 puy de dome auvergne rhone alpes puy de dome 63"
},
{
"id": "dep-64",
"name": "Pyrenees-Atlantiques (64)",
"city": "Pyrenees-Atlantiques",
"type": "department",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "pyrenees atlantiques 64 pyrenees atlantiques nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "dep-65",
"name": "Hautes-Pyrenees (65)",
"city": "Hautes-Pyrenees",
"type": "department",
"department": "65",
"region": "Occitanie",
"importance": 2,
"q": "hautes pyrenees 65 hautes pyrenees occitanie hautes pyrenees 65"
},
{
"id": "dep-66",
"name": "Pyrenees-Orientales (66)",
"city": "Pyrenees-Orientales",
"type": "department",
"department": "66",
"region": "Occitanie",
"importance": 2,
"q": "pyrenees orientales 66 pyrenees orientales occitanie pyrenees orientales 66"
},
{
"id": "dep-67",
"name": "Bas-Rhin (67)",
"city": "Bas-Rhin",
"type": "department",
"department": "67",
"region": "Grand Est",
"importance": 2,
"q": "bas rhin 67 bas rhin grand est bas rhin 67"
},
{
"id": "dep-68",
"name": "Haut-Rhin (68)",
"city": "Haut-Rhin",
"type": "department",
"department": "68",
"region": "Grand Est",
"importance": 2,
"q": "haut rhin 68 haut rhin grand est haut rhin 68"
},
{
"id": "dep-69",
"name": "Rhone (69)",
"city": "Rhone",
"type": "department",
"department": "69",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "rhone 69 rhone auvergne rhone alpes rhone 69"
},
{
"id": "dep-70",
"name": "Haute-Saone (70)",
"city": "Haute-Saone",
"type": "department",
"department": "70",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "haute saone 70 haute saone bourgogne franche comte haute saone 70"
},
{
"id": "dep-71",
"name": "Saone-et-Loire (71)",
"city": "Saone-et-Loire",
"type": "department",
"department": "71",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "saone et loire 71 saone et loire bourgogne franche comte saone et loire 71"
},
{
"id": "dep-72",
"name": "Sarthe (72)",
"city": "Sarthe",
"type": "department",
"department": "72",
"region": "Pays de la Loire",
"importance": 2,
"q": "sarthe 72 sarthe pays de la loire sarthe 72"
},
{
"id": "dep-73",
"name": "Savoie (73)",
"city": "Savoie",
"type": "department",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "savoie 73 savoie auvergne rhone alpes savoie 73"
},
{
"id": "dep-74",
"name": "Haute-Savoie (74)",
"city": "Haute-Savoie",
"type": "department",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "haute savoie 74 haute savoie auvergne rhone alpes haute savoie 74"
},
{
"id": "dep-75",
"name": "Paris (75)",
"city": "Paris",
"type": "department",
"department": "75",
"region": "Ile-de-France",
"importance": 2,
"q": "paris 75 paris ile de france paris 75"
},
{
"id": "dep-76",
"name": "Seine-Maritime (76)",
"city": "Seine-Maritime",
"type": "department",
"department": "76",
"region": "Normandie",
"importance": 2,
"q": "seine maritime 76 seine maritime normandie seine maritime 76"
},
{
"id": "dep-77",
"name": "Seine-et-Marne (77)",
"city": "Seine-et-Marne",
"type": "department",
"department": "77",
"region": "Ile-de-France",
"importance": 2,
"q": "seine et marne 77 seine et marne ile de france seine et marne 77"
},
{
"id": "dep-78",
"name": "Yvelines (78)",
"city": "Yvelines",
"type": "department",
"department": "78",
"region": "Ile-de-France",
"importance": 2,
"q": "yvelines 78 yvelines ile de france yvelines 78"
},
{
"id": "dep-79",
"name": "Deux-Sevres (79)",
"city": "Deux-Sevres",
"type": "department",
"department": "79",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "deux sevres 79 deux sevres nouvelle aquitaine deux sevres 79"
},
{
"id": "dep-80",
"name": "Somme (80)",
"city": "Somme",
"type": "department",
"department": "80",
"region": "Hauts-de-France",
"importance": 2,
"q": "somme 80 somme hauts de france somme 80"
},
{
"id": "dep-81",
"name": "Tarn (81)",
"city": "Tarn",
"type": "department",
"department": "81",
"region": "Occitanie",
"importance": 2,
"q": "tarn 81 tarn occitanie tarn 81"
},
{
"id": "dep-82",
"name": "Tarn-et-Garonne (82)",
"city": "Tarn-et-Garonne",
"type": "department",
"department": "82",
"region": "Occitanie",
"importance": 2,
"q": "tarn et garonne 82 tarn et garonne occitanie tarn et garonne 82"
},
{
"id": "dep-83",
"name": "Var (83)",
"city": "Var",
"type": "department",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "var 83 var provence alpes cote d azur var 83"
},
{
"id": "dep-84",
"name": "Vaucluse (84)",
"city": "Vaucluse",
"type": "department",
"department": "84",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "vaucluse 84 vaucluse provence alpes cote d azur vaucluse 84"
},
{
"id": "dep-85",
"name": "Vendee (85)",
"city": "Vendee",
"type": "department",
"department": "85",
"region": "Pays de la Loire",
"importance": 2,
"q": "vendee 85 vendee pays de la loire vendee 85"
},
{
"id": "dep-86",
"name": "Vienne (86)",
"city": "Vienne",
"type": "department",
"department": "86",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "vienne 86 vienne nouvelle aquitaine vienne 86"
},
{
"id": "dep-87",
"name": "Haute-Vienne (87)",
"city": "Haute-Vienne",
"type": "department",
"department": "87",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "haute vienne 87 haute vienne nouvelle aquitaine haute vienne 87"
},
{
"id": "dep-88",
"name": "Vosges (88)",
"city": "Vosges",
"type": "department",
"department": "88",
"region": "Grand Est",
"importance": 2,
"q": "vosges 88 vosges grand est vosges 88"
},
{
"id": "dep-89",
"name": "Yonne (89)",
"city": "Yonne",
"type": "department",
"department": "89",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "yonne 89 yonne bourgogne franche comte yonne 89"
},
{
"id": "dep-90",
"name": "Territoire de Belfort (90)",
"city": "Territoire de Belfort",
"type": "department",
"department": "90",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "territoire de belfort 90 territoire de belfort bourgogne franche comte territoire de belfort 90"
},
{
"id": "dep-91",
"name": "Essonne (91)",
"city": "Essonne",
"type": "department",
"department": "91",
"region": "Ile-de-France",
"importance": 2,
"q": "essonne 91 essonne ile de france essonne 91"
},
{
"id": "dep-92",
"name": "Hauts-de-Seine (92)",
"city": "Hauts-de-Seine",
"type": "department",
"department": "92",
"region": "Ile-de-France",
"importance": 2,
"q": "hauts de seine 92 hauts de seine ile de france hauts de seine 92"
},
{
"id": "dep-93",
"name": "Seine-Saint-Denis (93)",
"city": "Seine-Saint-Denis",
"type": "department",
"department": "93",
"region": "Ile-de-France",
"importance": 2,
"q": "seine saint denis 93 seine saint denis ile de france seine saint denis 93"
},
{
"id": "dep-94",
"name": "Val-de-Marne (94)",
"city": "Val-de-Marne",
"type": "department",
"department": "94",
"region": "Ile-de-France",
"importance": 2,
"q": "val de marne 94 val de marne ile de france val de marne 94"
},
{
"id": "dep-95",
"name": "Val-d'Oise (95)",
"city": "Val-d'Oise",
"type": "department",
"department": "95",
"region": "Ile-de-France",
"importance": 2,
"q": "val d oise 95 val d oise ile de france val d oise 95"
},
{
"id": "dep-971",
"name": "Guadeloupe (971)",
"city": "Guadeloupe",
"type": "department",
"department": "971",
"region": "Guadeloupe",
"importance": 2,
"q": "guadeloupe 971 guadeloupe guadeloupe guadeloupe 971"
},
{
"id": "dep-972",
"name": "Martinique (972)",
"city": "Martinique",
"type": "department",
"department": "972",
"region": "Martinique",
"importance": 2,
"q": "martinique 972 martinique martinique martinique 972"
},
{
"id": "dep-973",
"name": "Guyane (973)",
"city": "Guyane",
"type": "department",
"department": "973",
"region": "Guyane",
"importance": 2,
"q": "guyane 973 guyane guyane guyane 973"
},
{
"id": "dep-974",
"name": "La Reunion (974)",
"city": "La Reunion",
"type": "department",
"department": "974",
"region": "La Reunion",
"importance": 2,
"q": "la reunion 974 la reunion la reunion la reunion 974"
},
{
"id": "dep-976",
"name": "Mayotte (976)",
"city": "Mayotte",
"type": "department",
"department": "976",
"region": "Mayotte",
"importance": 2,
"q": "mayotte 976 mayotte mayotte mayotte 976"
},
{
"id": "cit-bourg-en-bresse",
"name": "Bourg-en-Bresse",
"city": "Bourg-en-Bresse",
"type": "city",
"department": "01",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "bourg en bresse bourg en bresse auvergne rhone alpes ain 01"
},
{
"id": "cit-laon",
"name": "Laon",
"city": "Laon",
"type": "city",
"department": "02",
"region": "Hauts-de-France",
"importance": 2,
"q": "laon laon hauts de france aisne 02"
},
{
"id": "cit-moulins",
"name": "Moulins",
"city": "Moulins",
"type": "city",
"department": "03",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "moulins moulins auvergne rhone alpes allier 03"
},
{
"id": "cit-digne-les-bains",
"name": "Digne-les-Bains",
"city": "Digne-les-Bains",
"type": "city",
"department": "04",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "digne les bains digne les bains provence alpes cote d azur alpes de haute provence 04"
},
{
"id": "cit-gap",
"name": "Gap",
"city": "Gap",
"type": "city",
"department": "05",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "gap gap provence alpes cote d azur hautes alpes 05"
},
{
"id": "cit-nice",
"name": "Nice",
"city": "Nice",
"type": "city",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "nice nice provence alpes cote d azur alpes maritimes 06"
},
{
"id": "cit-privas",
"name": "Privas",
"city": "Privas",
"type": "city",
"department": "07",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "privas privas auvergne rhone alpes ardeche 07"
},
{
"id": "cit-charleville-mezieres",
"name": "Charleville-Mezieres",
"city": "Charleville-Mezieres",
"type": "city",
"department": "08",
"region": "Grand Est",
"importance": 2,
"q": "charleville mezieres charleville mezieres grand est ardennes 08"
},
{
"id": "cit-foix",
"name": "Foix",
"city": "Foix",
"type": "city",
"department": "09",
"region": "Occitanie",
"importance": 2,
"q": "foix foix occitanie ariege 09"
},
{
"id": "cit-troyes",
"name": "Troyes",
"city": "Troyes",
"type": "city",
"department": "10",
"region": "Grand Est",
"importance": 2,
"q": "troyes troyes grand est aube 10"
},
{
"id": "cit-carcassonne",
"name": "Carcassonne",
"city": "Carcassonne",
"type": "city",
"department": "11",
"region": "Occitanie",
"importance": 1,
"q": "carcassonne carcassonne occitanie aude 11"
},
{
"id": "cit-rodez",
"name": "Rodez",
"city": "Rodez",
"type": "city",
"department": "12",
"region": "Occitanie",
"importance": 2,
"q": "rodez rodez occitanie aveyron 12"
},
{
"id": "cit-marseille",
"name": "Marseille",
"city": "Marseille",
"type": "city",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "marseille marseille provence alpes cote d azur bouches du rhone 13"
},
{
"id": "cit-caen",
"name": "Caen",
"city": "Caen",
"type": "city",
"department": "14",
"region": "Normandie",
"importance": 1,
"q": "caen caen normandie calvados 14"
},
{
"id": "cit-aurillac",
"name": "Aurillac",
"city": "Aurillac",
"type": "city",
"department": "15",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "aurillac aurillac auvergne rhone alpes cantal 15"
},
{
"id": "cit-angouleme",
"name": "Angouleme",
"city": "Angouleme",
"type": "city",
"department": "16",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "angouleme angouleme nouvelle aquitaine charente 16"
},
{
"id": "cit-la-rochelle",
"name": "La Rochelle",
"city": "La Rochelle",
"type": "city",
"department": "17",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "la rochelle la rochelle nouvelle aquitaine charente maritime 17"
},
{
"id": "cit-bourges",
"name": "Bourges",
"city": "Bourges",
"type": "city",
"department": "18",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "bourges bourges centre val de loire cher 18"
},
{
"id": "cit-tulle",
"name": "Tulle",
"city": "Tulle",
"type": "city",
"department": "19",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "tulle tulle nouvelle aquitaine correze 19"
},
{
"id": "cit-ajaccio",
"name": "Ajaccio",
"city": "Ajaccio",
"type": "city",
"department": "2A",
"region": "Corse",
"importance": 1,
"q": "ajaccio ajaccio corse corse du sud 2a"
},
{
"id": "cit-bastia",
"name": "Bastia",
"city": "Bastia",
"type": "city",
"department": "2B",
"region": "Corse",
"importance": 1,
"q": "bastia bastia corse haute corse 2b"
},
{
"id": "cit-dijon",
"name": "Dijon",
"city": "Dijon",
"type": "city",
"department": "21",
"region": "Bourgogne-Franche-Comte",
"importance": 1,
"q": "dijon dijon bourgogne franche comte cote d or 21"
},
{
"id": "cit-saint-brieuc",
"name": "Saint-Brieuc",
"city": "Saint-Brieuc",
"type": "city",
"department": "22",
"region": "Bretagne",
"importance": 2,
"q": "saint brieuc saint brieuc bretagne cotes d armor 22"
},
{
"id": "cit-gueret",
"name": "Gueret",
"city": "Gueret",
"type": "city",
"department": "23",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "gueret gueret nouvelle aquitaine creuse 23"
},
{
"id": "cit-perigueux",
"name": "Perigueux",
"city": "Perigueux",
"type": "city",
"department": "24",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "perigueux perigueux nouvelle aquitaine dordogne 24"
},
{
"id": "cit-besancon",
"name": "Besancon",
"city": "Besancon",
"type": "city",
"department": "25",
"region": "Bourgogne-Franche-Comte",
"importance": 1,
"q": "besancon besancon bourgogne franche comte doubs 25"
},
{
"id": "cit-valence",
"name": "Valence",
"city": "Valence",
"type": "city",
"department": "26",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "valence valence auvergne rhone alpes drome 26"
},
{
"id": "cit-evreux",
"name": "Evreux",
"city": "Evreux",
"type": "city",
"department": "27",
"region": "Normandie",
"importance": 2,
"q": "evreux evreux normandie eure 27"
},
{
"id": "cit-chartres",
"name": "Chartres",
"city": "Chartres",
"type": "city",
"department": "28",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "chartres chartres centre val de loire eure et loir 28"
},
{
"id": "cit-quimper",
"name": "Quimper",
"city": "Quimper",
"type": "city",
"department": "29",
"region": "Bretagne",
"importance": 2,
"q": "quimper quimper bretagne finistere 29"
},
{
"id": "cit-nimes",
"name": "Nimes",
"city": "Nimes",
"type": "city",
"department": "30",
"region": "Occitanie",
"importance": 1,
"q": "nimes nimes occitanie gard 30"
},
{
"id": "cit-toulouse",
"name": "Toulouse",
"city": "Toulouse",
"type": "city",
"department": "31",
"region": "Occitanie",
"importance": 1,
"q": "toulouse toulouse occitanie haute garonne 31"
},
{
"id": "cit-auch",
"name": "Auch",
"city": "Auch",
"type": "city",
"department": "32",
"region": "Occitanie",
"importance": 2,
"q": "auch auch occitanie gers 32"
},
{
"id": "cit-bordeaux",
"name": "Bordeaux",
"city": "Bordeaux",
"type": "city",
"department": "33",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "bordeaux bordeaux nouvelle aquitaine gironde 33"
},
{
"id": "cit-montpellier",
"name": "Montpellier",
"city": "Montpellier",
"type": "city",
"department": "34",
"region": "Occitanie",
"importance": 1,
"q": "montpellier montpellier occitanie herault 34"
},
{
"id": "cit-rennes",
"name": "Rennes",
"city": "Rennes",
"type": "city",
"department": "35",
"region": "Bretagne",
"importance": 1,
"q": "rennes rennes bretagne ille et vilaine 35"
},
{
"id": "cit-chateauroux",
"name": "Chateauroux",
"city": "Chateauroux",
"type": "city",
"department": "36",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "chateauroux chateauroux centre val de loire indre 36"
},
{
"id": "cit-tours",
"name": "Tours",
"city": "Tours",
"type": "city",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 1,
"q": "tours tours centre val de loire indre et loire 37"
},
{
"id": "cit-grenoble",
"name": "Grenoble",
"city": "Grenoble",
"type": "city",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "grenoble grenoble auvergne rhone alpes isere 38"
},
{
"id": "cit-lons-le-saunier",
"name": "Lons-le-Saunier",
"city": "Lons-le-Saunier",
"type": "city",
"department": "39",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "lons le saunier lons le saunier bourgogne franche comte jura 39"
},
{
"id": "cit-mont-de-marsan",
"name": "Mont-de-Marsan",
"city": "Mont-de-Marsan",
"type": "city",
"department": "40",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "mont de marsan mont de marsan nouvelle aquitaine landes 40"
},
{
"id": "cit-blois",
"name": "Blois",
"city": "Blois",
"type": "city",
"department": "41",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "blois blois centre val de loire loir et cher 41"
},
{
"id": "cit-saint-etienne",
"name": "Saint-Etienne",
"city": "Saint-Etienne",
"type": "city",
"department": "42",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "saint etienne saint etienne auvergne rhone alpes loire 42"
},
{
"id": "cit-le-puy-en-velay",
"name": "Le Puy-en-Velay",
"city": "Le Puy-en-Velay",
"type": "city",
"department": "43",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "le puy en velay le puy en velay auvergne rhone alpes haute loire 43"
},
{
"id": "cit-nantes",
"name": "Nantes",
"city": "Nantes",
"type": "city",
"department": "44",
"region": "Pays de la Loire",
"importance": 1,
"q": "nantes nantes pays de la loire loire atlantique 44"
},
{
"id": "cit-orleans",
"name": "Orleans",
"city": "Orleans",
"type": "city",
"department": "45",
"region": "Centre-Val de Loire",
"importance": 1,
"q": "orleans orleans centre val de loire loiret 45"
},
{
"id": "cit-cahors",
"name": "Cahors",
"city": "Cahors",
"type": "city",
"department": "46",
"region": "Occitanie",
"importance": 2,
"q": "cahors cahors occitanie lot 46"
},
{
"id": "cit-agen",
"name": "Agen",
"city": "Agen",
"type": "city",
"department": "47",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "agen agen nouvelle aquitaine lot et garonne 47"
},
{
"id": "cit-mende",
"name": "Mende",
"city": "Mende",
"type": "city",
"department": "48",
"region": "Occitanie",
"importance": 2,
"q": "mende mende occitanie lozere 48"
},
{
"id": "cit-angers",
"name": "Angers",
"city": "Angers",
"type": "city",
"department": "49",
"region": "Pays de la Loire",
"importance": 1,
"q": "angers angers pays de la loire maine et loire 49"
},
{
"id": "cit-saint-lo",
"name": "Saint-Lo",
"city": "Saint-Lo",
"type": "city",
"department": "50",
"region": "Normandie",
"importance": 2,
"q": "saint lo saint lo normandie manche 50"
},
{
"id": "cit-chalons-en-champagne",
"name": "Chalons-en-Champagne",
"city": "Chalons-en-Champagne",
"type": "city",
"department": "51",
"region": "Grand Est",
"importance": 2,
"q": "chalons en champagne chalons en champagne grand est marne 51"
},
{
"id": "cit-chaumont",
"name": "Chaumont",
"city": "Chaumont",
"type": "city",
"department": "52",
"region": "Grand Est",
"importance": 2,
"q": "chaumont chaumont grand est haute marne 52"
},
{
"id": "cit-laval",
"name": "Laval",
"city": "Laval",
"type": "city",
"department": "53",
"region": "Pays de la Loire",
"importance": 2,
"q": "laval laval pays de la loire mayenne 53"
},
{
"id": "cit-nancy",
"name": "Nancy",
"city": "Nancy",
"type": "city",
"department": "54",
"region": "Grand Est",
"importance": 1,
"q": "nancy nancy grand est meurthe et moselle 54"
},
{
"id": "cit-bar-le-duc",
"name": "Bar-le-Duc",
"city": "Bar-le-Duc",
"type": "city",
"department": "55",
"region": "Grand Est",
"importance": 2,
"q": "bar le duc bar le duc grand est meuse 55"
},
{
"id": "cit-vannes",
"name": "Vannes",
"city": "Vannes",
"type": "city",
"department": "56",
"region": "Bretagne",
"importance": 2,
"q": "vannes vannes bretagne morbihan 56"
},
{
"id": "cit-metz",
"name": "Metz",
"city": "Metz",
"type": "city",
"department": "57",
"region": "Grand Est",
"importance": 1,
"q": "metz metz grand est moselle 57"
},
{
"id": "cit-nevers",
"name": "Nevers",
"city": "Nevers",
"type": "city",
"department": "58",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "nevers nevers bourgogne franche comte nievre 58"
},
{
"id": "cit-lille",
"name": "Lille",
"city": "Lille",
"type": "city",
"department": "59",
"region": "Hauts-de-France",
"importance": 1,
"q": "lille lille hauts de france nord 59"
},
{
"id": "cit-beauvais",
"name": "Beauvais",
"city": "Beauvais",
"type": "city",
"department": "60",
"region": "Hauts-de-France",
"importance": 2,
"q": "beauvais beauvais hauts de france oise 60"
},
{
"id": "cit-alencon",
"name": "Alencon",
"city": "Alencon",
"type": "city",
"department": "61",
"region": "Normandie",
"importance": 2,
"q": "alencon alencon normandie orne 61"
},
{
"id": "cit-arras",
"name": "Arras",
"city": "Arras",
"type": "city",
"department": "62",
"region": "Hauts-de-France",
"importance": 2,
"q": "arras arras hauts de france pas de calais 62"
},
{
"id": "cit-clermont-ferrand",
"name": "Clermont-Ferrand",
"city": "Clermont-Ferrand",
"type": "city",
"department": "63",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "clermont ferrand clermont ferrand auvergne rhone alpes puy de dome 63"
},
{
"id": "cit-pau",
"name": "Pau",
"city": "Pau",
"type": "city",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "pau pau nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "cit-tarbes",
"name": "Tarbes",
"city": "Tarbes",
"type": "city",
"department": "65",
"region": "Occitanie",
"importance": 2,
"q": "tarbes tarbes occitanie hautes pyrenees 65"
},
{
"id": "cit-perpignan",
"name": "Perpignan",
"city": "Perpignan",
"type": "city",
"department": "66",
"region": "Occitanie",
"importance": 1,
"q": "perpignan perpignan occitanie pyrenees orientales 66"
},
{
"id": "cit-strasbourg",
"name": "Strasbourg",
"city": "Strasbourg",
"type": "city",
"department": "67",
"region": "Grand Est",
"importance": 1,
"q": "strasbourg strasbourg grand est bas rhin 67"
},
{
"id": "cit-colmar",
"name": "Colmar",
"city": "Colmar",
"type": "city",
"department": "68",
"region": "Grand Est",
"importance": 1,
"q": "colmar colmar grand est haut rhin 68"
},
{
"id": "cit-lyon",
"name": "Lyon",
"city": "Lyon",
"type": "city",
"department": "69",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "lyon lyon auvergne rhone alpes rhone 69"
},
{
"id": "cit-vesoul",
"name": "Vesoul",
"city": "Vesoul",
"type": "city",
"department": "70",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "vesoul vesoul bourgogne franche comte haute saone 70"
},
{
"id": "cit-macon",
"name": "Macon",
"city": "Macon",
"type": "city",
"department": "71",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "macon macon bourgogne franche comte saone et loire 71"
},
{
"id": "cit-le-mans",
"name": "Le Mans",
"city": "Le Mans",
"type": "city",
"department": "72",
"region": "Pays de la Loire",
"importance": 1,
"q": "le mans le mans pays de la loire sarthe 72"
},
{
"id": "cit-chambery",
"name": "Chambery",
"city": "Chambery",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "chambery chambery auvergne rhone alpes savoie 73"
},
{
"id": "cit-annecy",
"name": "Annecy",
"city": "Annecy",
"type": "city",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "annecy annecy auvergne rhone alpes haute savoie 74"
},
{
"id": "cit-paris",
"name": "Paris",
"city": "Paris",
"type": "city",
"department": "75",
"region": "Ile-de-France",
"importance": 1,
"q": "paris paris ile de france paris 75"
},
{
"id": "cit-rouen",
"name": "Rouen",
"city": "Rouen",
"type": "city",
"department": "76",
"region": "Normandie",
"importance": 1,
"q": "rouen rouen normandie seine maritime 76"
},
{
"id": "cit-melun",
"name": "Melun",
"city": "Melun",
"type": "city",
"department": "77",
"region": "Ile-de-France",
"importance": 2,
"q": "melun melun ile de france seine et marne 77"
},
{
"id": "cit-versailles",
"name": "Versailles",
"city": "Versailles",
"type": "city",
"department": "78",
"region": "Ile-de-France",
"importance": 1,
"q": "versailles versailles ile de france yvelines 78"
},
{
"id": "cit-niort",
"name": "Niort",
"city": "Niort",
"type": "city",
"department": "79",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "niort niort nouvelle aquitaine deux sevres 79"
},
{
"id": "cit-amiens",
"name": "Amiens",
"city": "Amiens",
"type": "city",
"department": "80",
"region": "Hauts-de-France",
"importance": 1,
"q": "amiens amiens hauts de france somme 80"
},
{
"id": "cit-albi",
"name": "Albi",
"city": "Albi",
"type": "city",
"department": "81",
"region": "Occitanie",
"importance": 2,
"q": "albi albi occitanie tarn 81"
},
{
"id": "cit-montauban",
"name": "Montauban",
"city": "Montauban",
"type": "city",
"department": "82",
"region": "Occitanie",
"importance": 2,
"q": "montauban montauban occitanie tarn et garonne 82"
},
{
"id": "cit-toulon",
"name": "Toulon",
"city": "Toulon",
"type": "city",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "toulon toulon provence alpes cote d azur var 83"
},
{
"id": "cit-avignon",
"name": "Avignon",
"city": "Avignon",
"type": "city",
"department": "84",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "avignon avignon provence alpes cote d azur vaucluse 84"
},
{
"id": "cit-la-roche-sur-yon",
"name": "La Roche-sur-Yon",
"city": "La Roche-sur-Yon",
"type": "city",
"department": "85",
"region": "Pays de la Loire",
"importance": 2,
"q": "la roche sur yon la roche sur yon pays de la loire vendee 85"
},
{
"id": "cit-poitiers",
"name": "Poitiers",
"city": "Poitiers",
"type": "city",
"department": "86",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "poitiers poitiers nouvelle aquitaine vienne 86"
},
{
"id": "cit-limoges",
"name": "Limoges",
"city": "Limoges",
"type": "city",
"department": "87",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "limoges limoges nouvelle aquitaine haute vienne 87"
},
{
"id": "cit-epinal",
"name": "Epinal",
"city": "Epinal",
"type": "city",
"department": "88",
"region": "Grand Est",
"importance": 2,
"q": "epinal epinal grand est vosges 88"
},
{
"id": "cit-auxerre",
"name": "Auxerre",
"city": "Auxerre",
"type": "city",
"department": "89",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "auxerre auxerre bourgogne franche comte yonne 89"
},
{
"id": "cit-belfort",
"name": "Belfort",
"city": "Belfort",
"type": "city",
"department": "90",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "belfort belfort bourgogne franche comte territoire de belfort 90"
},
{
"id": "cit-evry-courcouronnes",
"name": "Evry-Courcouronnes",
"city": "Evry-Courcouronnes",
"type": "city",
"department": "91",
"region": "Ile-de-France",
"importance": 2,
"q": "evry courcouronnes evry courcouronnes ile de france essonne 91"
},
{
"id": "cit-nanterre",
"name": "Nanterre",
"city": "Nanterre",
"type": "city",
"department": "92",
"region": "Ile-de-France",
"importance": 2,
"q": "nanterre nanterre ile de france hauts de seine 92"
},
{
"id": "cit-bobigny",
"name": "Bobigny",
"city": "Bobigny",
"type": "city",
"department": "93",
"region": "Ile-de-France",
"importance": 2,
"q": "bobigny bobigny ile de france seine saint denis 93"
},
{
"id": "cit-creteil",
"name": "Creteil",
"city": "Creteil",
"type": "city",
"department": "94",
"region": "Ile-de-France",
"importance": 2,
"q": "creteil creteil ile de france val de marne 94"
},
{
"id": "cit-cergy",
"name": "Cergy",
"city": "Cergy",
"type": "city",
"department": "95",
"region": "Ile-de-France",
"importance": 2,
"q": "cergy cergy ile de france val d oise 95"
},
{
"id": "cit-basse-terre",
"name": "Basse-Terre",
"city": "Basse-Terre",
"type": "city",
"department": "971",
"region": "Guadeloupe",
"importance": 2,
"q": "basse terre basse terre guadeloupe guadeloupe 971"
},
{
"id": "cit-fort-de-france",
"name": "Fort-de-France",
"city": "Fort-de-France",
"type": "city",
"department": "972",
"region": "Martinique",
"importance": 2,
"q": "fort de france fort de france martinique martinique 972"
},
{
"id": "cit-cayenne",
"name": "Cayenne",
"city": "Cayenne",
"type": "city",
"department": "973",
"region": "Guyane",
"importance": 2,
"q": "cayenne cayenne guyane guyane 973"
},
{
"id": "cit-saint-denis",
"name": "Saint-Denis",
"city": "Saint-Denis",
"type": "city",
"department": "974",
"region": "La Reunion",
"importance": 2,
"q": "saint denis saint denis la reunion la reunion 974"
},
{
"id": "cit-mamoudzou",
"name": "Mamoudzou",
"city": "Mamoudzou",
"type": "city",
"department": "976",
"region": "Mayotte",
"importance": 2,
"q": "mamoudzou mamoudzou mayotte mayotte 976"
},
{
"id": "cit-le-havre",
"name": "Le Havre",
"city": "Le Havre",
"type": "city",
"department": "76",
"region": "Normandie",
"importance": 1,
"q": "le havre le havre normandie seine maritime 76"
},
{
"id": "cit-reims",
"name": "Reims",
"city": "Reims",
"type": "city",
"department": "51",
"region": "Grand Est",
"importance": 1,
"q": "reims reims grand est marne 51"
},
{
"id": "cit-villeurbanne",
"name": "Villeurbanne",
"city": "Villeurbanne",
"type": "city",
"department": "69",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "villeurbanne villeurbanne auvergne rhone alpes rhone 69"
},
{
"id": "cit-aix-en-provence",
"name": "Aix-en-Provence",
"city": "Aix-en-Provence",
"type": "city",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "aix en provence aix en provence provence alpes cote d azur bouches du rhone 13"
},
{
"id": "cit-brest",
"name": "Brest",
"city": "Brest",
"type": "city",
"department": "29",
"region": "Bretagne",
"importance": 1,
"q": "brest brest bretagne finistere 29"
},
{
"id": "cit-mulhouse",
"name": "Mulhouse",
"city": "Mulhouse",
"type": "city",
"department": "68",
"region": "Grand Est",
"importance": 1,
"q": "mulhouse mulhouse grand est haut rhin 68"
},
{
"id": "cit-argenteuil",
"name": "Argenteuil",
"city": "Argenteuil",
"type": "city",
"department": "95",
"region": "Ile-de-France",
"importance": 3,
"q": "argenteuil argenteuil ile de france val d oise 95"
},
{
"id": "cit-montreuil",
"name": "Montreuil",
"city": "Montreuil",
"type": "city",
"department": "93",
"region": "Ile-de-France",
"importance": 3,
"q": "montreuil montreuil ile de france seine saint denis 93"
},
{
"id": "cit-roubaix",
"name": "Roubaix",
"city": "Roubaix",
"type": "city",
"department": "59",
"region": "Hauts-de-France",
"importance": 2,
"q": "roubaix roubaix hauts de france nord 59"
},
{
"id": "cit-tourcoing",
"name": "Tourcoing",
"city": "Tourcoing",
"type": "city",
"department": "59",
"region": "Hauts-de-France",
"importance": 2,
"q": "tourcoing tourcoing hauts de france nord 59"
},
{
"id": "cit-dunkerque",
"name": "Dunkerque",
"city": "Dunkerque",
"type": "city",
"department": "59",
"region": "Hauts-de-France",
"importance": 2,
"q": "dunkerque dunkerque hauts de france nord 59"
},
{
"id": "cit-calais",
"name": "Calais",
"city": "Calais",
"type": "city",
"department": "62",
"region": "Hauts-de-France",
"importance": 2,
"q": "calais calais hauts de france pas de calais 62"
},
{
"id": "cit-boulogne-sur-mer",
"name": "Boulogne-sur-Mer",
"city": "Boulogne-sur-Mer",
"type": "city",
"department": "62",
"region": "Hauts-de-France",
"importance": 3,
"q": "boulogne sur mer boulogne sur mer hauts de france pas de calais 62"
},
{
"id": "cit-beziers",
"name": "Beziers",
"city": "Beziers",
"type": "city",
"department": "34",
"region": "Occitanie",
"importance": 2,
"q": "beziers beziers occitanie herault 34"
},
{
"id": "cit-sete",
"name": "Sete",
"city": "Sete",
"type": "city",
"department": "34",
"region": "Occitanie",
"importance": 3,
"q": "sete sete occitanie herault 34"
},
{
"id": "cit-narbonne",
"name": "Narbonne",
"city": "Narbonne",
"type": "city",
"department": "11",
"region": "Occitanie",
"importance": 2,
"q": "narbonne narbonne occitanie aude 11"
},
{
"id": "cit-cannes",
"name": "Cannes",
"city": "Cannes",
"type": "city",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "cannes cannes provence alpes cote d azur alpes maritimes 06"
},
{
"id": "cit-antibes",
"name": "Antibes",
"city": "Antibes",
"type": "city",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "antibes antibes provence alpes cote d azur alpes maritimes 06"
},
{
"id": "cit-menton",
"name": "Menton",
"city": "Menton",
"type": "city",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "menton menton provence alpes cote d azur alpes maritimes 06"
},
{
"id": "cit-grasse",
"name": "Grasse",
"city": "Grasse",
"type": "city",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 3,
"q": "grasse grasse provence alpes cote d azur alpes maritimes 06"
},
{
"id": "cit-saint-tropez",
"name": "Saint-Tropez",
"city": "Saint-Tropez",
"type": "city",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "saint tropez saint tropez provence alpes cote d azur var 83"
},
{
"id": "cit-hyeres",
"name": "Hyeres",
"city": "Hyeres",
"type": "city",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 3,
"q": "hyeres hyeres provence alpes cote d azur var 83"
},
{
"id": "cit-frejus",
"name": "Frejus",
"city": "Frejus",
"type": "city",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 3,
"q": "frejus frejus provence alpes cote d azur var 83"
},
{
"id": "cit-saint-raphael",
"name": "Saint-Raphael",
"city": "Saint-Raphael",
"type": "city",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 3,
"q": "saint raphael saint raphael provence alpes cote d azur var 83"
},
{
"id": "cit-saint-nazaire",
"name": "Saint-Nazaire",
"city": "Saint-Nazaire",
"type": "city",
"department": "44",
"region": "Pays de la Loire",
"importance": 2,
"q": "saint nazaire saint nazaire pays de la loire loire atlantique 44"
},
{
"id": "cit-lorient",
"name": "Lorient",
"city": "Lorient",
"type": "city",
"department": "56",
"region": "Bretagne",
"importance": 2,
"q": "lorient lorient bretagne morbihan 56"
},
{
"id": "cit-concarneau",
"name": "Concarneau",
"city": "Concarneau",
"type": "city",
"department": "29",
"region": "Bretagne",
"importance": 3,
"q": "concarneau concarneau bretagne finistere 29"
},
{
"id": "cit-douarnenez",
"name": "Douarnenez",
"city": "Douarnenez",
"type": "city",
"department": "29",
"region": "Bretagne",
"importance": 3,
"q": "douarnenez douarnenez bretagne finistere 29"
},
{
"id": "cit-saint-malo",
"name": "Saint-Malo",
"city": "Saint-Malo",
"type": "city",
"department": "35",
"region": "Bretagne",
"importance": 1,
"q": "saint malo saint malo bretagne ille et vilaine 35"
},
{
"id": "cit-dinard",
"name": "Dinard",
"city": "Dinard",
"type": "city",
"department": "35",
"region": "Bretagne",
"importance": 2,
"q": "dinard dinard bretagne ille et vilaine 35"
},
{
"id": "cit-dinan",
"name": "Dinan",
"city": "Dinan",
"type": "city",
"department": "22",
"region": "Bretagne",
"importance": 3,
"q": "dinan dinan bretagne cotes d armor 22"
},
{
"id": "cit-perros-guirec",
"name": "Perros-Guirec",
"city": "Perros-Guirec",
"type": "city",
"department": "22",
"region": "Bretagne",
"importance": 3,
"q": "perros guirec perros guirec bretagne cotes d armor 22"
},
{
"id": "cit-carnac",
"name": "Carnac",
"city": "Carnac",
"type": "city",
"department": "56",
"region": "Bretagne",
"importance": 3,
"q": "carnac carnac bretagne morbihan 56"
},
{
"id": "cit-quiberon",
"name": "Quiberon",
"city": "Quiberon",
"type": "city",
"department": "56",
"region": "Bretagne",
"importance": 3,
"q": "quiberon quiberon bretagne morbihan 56"
},
{
"id": "cit-la-baule-escoublac",
"name": "La Baule-Escoublac",
"city": "La Baule-Escoublac",
"type": "city",
"department": "44",
"region": "Pays de la Loire",
"importance": 2,
"q": "la baule escoublac la baule escoublac pays de la loire loire atlantique 44"
},
{
"id": "cit-les-sables-d-olonne",
"name": "Les Sables-d'Olonne",
"city": "Les Sables-d'Olonne",
"type": "city",
"department": "85",
"region": "Pays de la Loire",
"importance": 2,
"q": "les sables d olonne les sables d olonne pays de la loire vendee 85"
},
{
"id": "cit-royan",
"name": "Royan",
"city": "Royan",
"type": "city",
"department": "17",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "royan royan nouvelle aquitaine charente maritime 17"
},
{
"id": "cit-saintes",
"name": "Saintes",
"city": "Saintes",
"type": "city",
"department": "17",
"region": "Nouvelle-Aquitaine",
"importance": 3,
"q": "saintes saintes nouvelle aquitaine charente maritime 17"
},
{
"id": "cit-rochefort",
"name": "Rochefort",
"city": "Rochefort",
"type": "city",
"department": "17",
"region": "Nouvelle-Aquitaine",
"importance": 3,
"q": "rochefort rochefort nouvelle aquitaine charente maritime 17"
},
{
"id": "cit-cognac",
"name": "Cognac",
"city": "Cognac",
"type": "city",
"department": "16",
"region": "Nouvelle-Aquitaine",
"importance": 3,
"q": "cognac cognac nouvelle aquitaine charente 16"
},
{
"id": "cit-arcachon",
"name": "Arcachon",
"city": "Arcachon",
"type": "city",
"department": "33",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "arcachon arcachon nouvelle aquitaine gironde 33"
},
{
"id": "cit-biarritz",
"name": "Biarritz",
"city": "Biarritz",
"type": "city",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "biarritz biarritz nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "cit-bayonne",
"name": "Bayonne",
"city": "Bayonne",
"type": "city",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "bayonne bayonne nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "cit-saint-jean-de-luz",
"name": "Saint-Jean-de-Luz",
"city": "Saint-Jean-de-Luz",
"type": "city",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "saint jean de luz saint jean de luz nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "cit-hendaye",
"name": "Hendaye",
"city": "Hendaye",
"type": "city",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 3,
"q": "hendaye hendaye nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "cit-sarlat-la-caneda",
"name": "Sarlat-la-Caneda",
"city": "Sarlat-la-Caneda",
"type": "city",
"department": "24",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "sarlat la caneda sarlat la caneda nouvelle aquitaine dordogne 24"
},
{
"id": "cit-bergerac",
"name": "Bergerac",
"city": "Bergerac",
"type": "city",
"department": "24",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "bergerac bergerac nouvelle aquitaine dordogne 24"
},
{
"id": "cit-rocamadour",
"name": "Rocamadour",
"city": "Rocamadour",
"type": "city",
"department": "46",
"region": "Occitanie",
"importance": 3,
"q": "rocamadour rocamadour occitanie lot 46"
},
{
"id": "cit-cordes-sur-ciel",
"name": "Cordes-sur-Ciel",
"city": "Cordes-sur-Ciel",
"type": "city",
"department": "81",
"region": "Occitanie",
"importance": 3,
"q": "cordes sur ciel cordes sur ciel occitanie tarn 81"
},
{
"id": "cit-lourdes",
"name": "Lourdes",
"city": "Lourdes",
"type": "city",
"department": "65",
"region": "Occitanie",
"importance": 2,
"q": "lourdes lourdes occitanie hautes pyrenees 65"
},
{
"id": "cit-cauterets",
"name": "Cauterets",
"city": "Cauterets",
"type": "city",
"department": "65",
"region": "Occitanie",
"importance": 3,
"q": "cauterets cauterets occitanie hautes pyrenees 65"
},
{
"id": "cit-collioure",
"name": "Collioure",
"city": "Collioure",
"type": "city",
"department": "66",
"region": "Occitanie",
"importance": 3,
"q": "collioure collioure occitanie pyrenees orientales 66"
},
{
"id": "cit-font-romeu",
"name": "Font-Romeu",
"city": "Font-Romeu",
"type": "city",
"department": "66",
"region": "Occitanie",
"importance": 3,
"q": "font romeu font romeu occitanie pyrenees orientales 66"
},
{
"id": "cit-uzes",
"name": "Uzes",
"city": "Uzes",
"type": "city",
"department": "30",
"region": "Occitanie",
"importance": 2,
"q": "uzes uzes occitanie gard 30"
},
{
"id": "cit-arles",
"name": "Arles",
"city": "Arles",
"type": "city",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "arles arles provence alpes cote d azur bouches du rhone 13"
},
{
"id": "cit-cassis",
"name": "Cassis",
"city": "Cassis",
"type": "city",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "cassis cassis provence alpes cote d azur bouches du rhone 13"
},
{
"id": "cit-salon-de-provence",
"name": "Salon-de-Provence",
"city": "Salon-de-Provence",
"type": "city",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 3,
"q": "salon de provence salon de provence provence alpes cote d azur bouches du rhone 13"
},
{
"id": "cit-gordes",
"name": "Gordes",
"city": "Gordes",
"type": "city",
"department": "84",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 3,
"q": "gordes gordes provence alpes cote d azur vaucluse 84"
},
{
"id": "cit-l-isle-sur-la-sorgue",
"name": "L'Isle-sur-la-Sorgue",
"city": "L'Isle-sur-la-Sorgue",
"type": "city",
"department": "84",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 3,
"q": "l isle sur la sorgue l isle sur la sorgue provence alpes cote d azur vaucluse 84"
},
{
"id": "cit-orange",
"name": "Orange",
"city": "Orange",
"type": "city",
"department": "84",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "orange orange provence alpes cote d azur vaucluse 84"
},
{
"id": "cit-chamonix-mont-blanc",
"name": "Chamonix-Mont-Blanc",
"city": "Chamonix-Mont-Blanc",
"type": "city",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "chamonix mont blanc chamonix mont blanc auvergne rhone alpes haute savoie 74"
},
{
"id": "cit-megeve",
"name": "Megeve",
"city": "Megeve",
"type": "city",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "megeve megeve auvergne rhone alpes haute savoie 74"
},
{
"id": "cit-evian-les-bains",
"name": "Evian-les-Bains",
"city": "Evian-les-Bains",
"type": "city",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "evian les bains evian les bains auvergne rhone alpes haute savoie 74"
},
{
"id": "cit-thonon-les-bains",
"name": "Thonon-les-Bains",
"city": "Thonon-les-Bains",
"type": "city",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "thonon les bains thonon les bains auvergne rhone alpes haute savoie 74"
},
{
"id": "cit-morzine",
"name": "Morzine",
"city": "Morzine",
"type": "city",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "morzine morzine auvergne rhone alpes haute savoie 74"
},
{
"id": "cit-courchevel",
"name": "Courchevel",
"city": "Courchevel",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "courchevel courchevel auvergne rhone alpes savoie 73"
},
{
"id": "cit-val-d-isere",
"name": "Val-d'Isere",
"city": "Val-d'Isere",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "val d isere val d isere auvergne rhone alpes savoie 73"
},
{
"id": "cit-tignes",
"name": "Tignes",
"city": "Tignes",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "tignes tignes auvergne rhone alpes savoie 73"
},
{
"id": "cit-meribel",
"name": "Meribel",
"city": "Meribel",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "meribel meribel auvergne rhone alpes savoie 73"
},
{
"id": "cit-aix-les-bains",
"name": "Aix-les-Bains",
"city": "Aix-les-Bains",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "aix les bains aix les bains auvergne rhone alpes savoie 73"
},
{
"id": "cit-albertville",
"name": "Albertville",
"city": "Albertville",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "albertville albertville auvergne rhone alpes savoie 73"
},
{
"id": "cit-l-alpe-d-huez",
"name": "L'Alpe d'Huez",
"city": "L'Alpe d'Huez",
"type": "city",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "l alpe d huez l alpe d huez auvergne rhone alpes isere 38"
},
{
"id": "cit-les-deux-alpes",
"name": "Les Deux Alpes",
"city": "Les Deux Alpes",
"type": "city",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "les deux alpes les deux alpes auvergne rhone alpes isere 38"
},
{
"id": "cit-vienne",
"name": "Vienne",
"city": "Vienne",
"type": "city",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "vienne vienne auvergne rhone alpes isere 38"
},
{
"id": "cit-bourgoin-jallieu",
"name": "Bourgoin-Jallieu",
"city": "Bourgoin-Jallieu",
"type": "city",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "bourgoin jallieu bourgoin jallieu auvergne rhone alpes isere 38"
},
{
"id": "cit-vichy",
"name": "Vichy",
"city": "Vichy",
"type": "city",
"department": "03",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "vichy vichy auvergne rhone alpes allier 03"
},
{
"id": "cit-beaune",
"name": "Beaune",
"city": "Beaune",
"type": "city",
"department": "21",
"region": "Bourgogne-Franche-Comte",
"importance": 2,
"q": "beaune beaune bourgogne franche comte cote d or 21"
},
{
"id": "cit-chablis",
"name": "Chablis",
"city": "Chablis",
"type": "city",
"department": "89",
"region": "Bourgogne-Franche-Comte",
"importance": 3,
"q": "chablis chablis bourgogne franche comte yonne 89"
},
{
"id": "cit-vezelay",
"name": "Vezelay",
"city": "Vezelay",
"type": "city",
"department": "89",
"region": "Bourgogne-Franche-Comte",
"importance": 3,
"q": "vezelay vezelay bourgogne franche comte yonne 89"
},
{
"id": "cit-cluny",
"name": "Cluny",
"city": "Cluny",
"type": "city",
"department": "71",
"region": "Bourgogne-Franche-Comte",
"importance": 3,
"q": "cluny cluny bourgogne franche comte saone et loire 71"
},
{
"id": "cit-le-touquet-paris-plage",
"name": "Le Touquet-Paris-Plage",
"city": "Le Touquet-Paris-Plage",
"type": "city",
"department": "62",
"region": "Hauts-de-France",
"importance": 2,
"q": "le touquet paris plage le touquet paris plage hauts de france pas de calais 62"
},
{
"id": "cit-amboise",
"name": "Amboise",
"city": "Amboise",
"type": "city",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "amboise amboise centre val de loire indre et loire 37"
},
{
"id": "cit-chenonceaux",
"name": "Chenonceaux",
"city": "Chenonceaux",
"type": "city",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 3,
"q": "chenonceaux chenonceaux centre val de loire indre et loire 37"
},
{
"id": "cit-chinon",
"name": "Chinon",
"city": "Chinon",
"type": "city",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 3,
"q": "chinon chinon centre val de loire indre et loire 37"
},
{
"id": "cit-loches",
"name": "Loches",
"city": "Loches",
"type": "city",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 3,
"q": "loches loches centre val de loire indre et loire 37"
},
{
"id": "cit-azay-le-rideau",
"name": "Azay-le-Rideau",
"city": "Azay-le-Rideau",
"type": "city",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 3,
"q": "azay le rideau azay le rideau centre val de loire indre et loire 37"
},
{
"id": "cit-villandry",
"name": "Villandry",
"city": "Villandry",
"type": "city",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 3,
"q": "villandry villandry centre val de loire indre et loire 37"
},
{
"id": "cit-chambord",
"name": "Chambord",
"city": "Chambord",
"type": "city",
"department": "41",
"region": "Centre-Val de Loire",
"importance": 3,
"q": "chambord chambord centre val de loire loir et cher 41"
},
{
"id": "cit-cheverny",
"name": "Cheverny",
"city": "Cheverny",
"type": "city",
"department": "41",
"region": "Centre-Val de Loire",
"importance": 3,
"q": "cheverny cheverny centre val de loire loir et cher 41"
},
{
"id": "cit-saumur",
"name": "Saumur",
"city": "Saumur",
"type": "city",
"department": "49",
"region": "Pays de la Loire",
"importance": 2,
"q": "saumur saumur pays de la loire maine et loire 49"
},
{
"id": "cit-cholet",
"name": "Cholet",
"city": "Cholet",
"type": "city",
"department": "49",
"region": "Pays de la Loire",
"importance": 3,
"q": "cholet cholet pays de la loire maine et loire 49"
},
{
"id": "cit-fontainebleau",
"name": "Fontainebleau",
"city": "Fontainebleau",
"type": "city",
"department": "77",
"region": "Ile-de-France",
"importance": 2,
"q": "fontainebleau fontainebleau ile de france seine et marne 77"
},
{
"id": "cit-provins",
"name": "Provins",
"city": "Provins",
"type": "city",
"department": "77",
"region": "Ile-de-France",
"importance": 3,
"q": "provins provins ile de france seine et marne 77"
},
{
"id": "cit-meaux",
"name": "Meaux",
"city": "Meaux",
"type": "city",
"department": "77",
"region": "Ile-de-France",
"importance": 3,
"q": "meaux meaux ile de france seine et marne 77"
},
{
"id": "cit-chantilly",
"name": "Chantilly",
"city": "Chantilly",
"type": "city",
"department": "60",
"region": "Hauts-de-France",
"importance": 2,
"q": "chantilly chantilly hauts de france oise 60"
},
{
"id": "cit-compiegne",
"name": "Compiegne",
"city": "Compiegne",
"type": "city",
"department": "60",
"region": "Hauts-de-France",
"importance": 3,
"q": "compiegne compiegne hauts de france oise 60"
},
{
"id": "cit-senlis",
"name": "Senlis",
"city": "Senlis",
"type": "city",
"department": "60",
"region": "Hauts-de-France",
"importance": 3,
"q": "senlis senlis hauts de france oise 60"
},
{
"id": "cit-giverny",
"name": "Giverny",
"city": "Giverny",
"type": "city",
"department": "27",
"region": "Normandie",
"importance": 3,
"q": "giverny giverny normandie eure 27"
},
{
"id": "cit-le-mont-saint-michel",
"name": "Le Mont-Saint-Michel",
"city": "Le Mont-Saint-Michel",
"type": "city",
"department": "50",
"region": "Normandie",
"importance": 3,
"q": "le mont saint michel le mont saint michel normandie manche 50"
},
{
"id": "cit-bayeux",
"name": "Bayeux",
"city": "Bayeux",
"type": "city",
"department": "14",
"region": "Normandie",
"importance": 2,
"q": "bayeux bayeux normandie calvados 14"
},
{
"id": "cit-deauville",
"name": "Deauville",
"city": "Deauville",
"type": "city",
"department": "14",
"region": "Normandie",
"importance": 1,
"q": "deauville deauville normandie calvados 14"
},
{
"id": "cit-trouville-sur-mer",
"name": "Trouville-sur-Mer",
"city": "Trouville-sur-Mer",
"type": "city",
"department": "14",
"region": "Normandie",
"importance": 3,
"q": "trouville sur mer trouville sur mer normandie calvados 14"
},
{
"id": "cit-cabourg",
"name": "Cabourg",
"city": "Cabourg",
"type": "city",
"department": "14",
"region": "Normandie",
"importance": 3,
"q": "cabourg cabourg normandie calvados 14"
},
{
"id": "cit-honfleur",
"name": "Honfleur",
"city": "Honfleur",
"type": "city",
"department": "14",
"region": "Normandie",
"importance": 2,
"q": "honfleur honfleur normandie calvados 14"
},
{
"id": "cit-etretat",
"name": "Etretat",
"city": "Etretat",
"type": "city",
"department": "76",
"region": "Normandie",
"importance": 2,
"q": "etretat etretat normandie seine maritime 76"
},
{
"id": "cit-fecamp",
"name": "Fecamp",
"city": "Fecamp",
"type": "city",
"department": "76",
"region": "Normandie",
"importance": 3,
"q": "fecamp fecamp normandie seine maritime 76"
},
{
"id": "cit-dieppe",
"name": "Dieppe",
"city": "Dieppe",
"type": "city",
"department": "76",
"region": "Normandie",
"importance": 3,
"q": "dieppe dieppe normandie seine maritime 76"
},
{
"id": "cit-cherbourg-en-cotentin",
"name": "Cherbourg-en-Cotentin",
"city": "Cherbourg-en-Cotentin",
"type": "city",
"department": "50",
"region": "Normandie",
"importance": 2,
"q": "cherbourg en cotentin cherbourg en cotentin normandie manche 50"
},
{
"id": "cit-granville",
"name": "Granville",
"city": "Granville",
"type": "city",
"department": "50",
"region": "Normandie",
"importance": 3,
"q": "granville granville normandie manche 50"
},
{
"id": "cit-riquewihr",
"name": "Riquewihr",
"city": "Riquewihr",
"type": "city",
"department": "68",
"region": "Grand Est",
"importance": 3,
"q": "riquewihr riquewihr grand est haut rhin 68"
},
{
"id": "cit-obernai",
"name": "Obernai",
"city": "Obernai",
"type": "city",
"department": "67",
"region": "Grand Est",
"importance": 3,
"q": "obernai obernai grand est bas rhin 67"
},
{
"id": "cit-haguenau",
"name": "Haguenau",
"city": "Haguenau",
"type": "city",
"department": "67",
"region": "Grand Est",
"importance": 3,
"q": "haguenau haguenau grand est bas rhin 67"
},
{
"id": "cit-selestat",
"name": "Selestat",
"city": "Selestat",
"type": "city",
"department": "67",
"region": "Grand Est",
"importance": 3,
"q": "selestat selestat grand est bas rhin 67"
},
{
"id": "cit-epernay",
"name": "Epernay",
"city": "Epernay",
"type": "city",
"department": "51",
"region": "Grand Est",
"importance": 2,
"q": "epernay epernay grand est marne 51"
},
{
"id": "cit-verdun",
"name": "Verdun",
"city": "Verdun",
"type": "city",
"department": "55",
"region": "Grand Est",
"importance": 3,
"q": "verdun verdun grand est meuse 55"
},
{
"id": "cit-gerardmer",
"name": "Gerardmer",
"city": "Gerardmer",
"type": "city",
"department": "88",
"region": "Grand Est",
"importance": 2,
"q": "gerardmer gerardmer grand est vosges 88"
},
{
"id": "cit-montbeliard",
"name": "Montbeliard",
"city": "Montbeliard",
"type": "city",
"department": "25",
"region": "Bourgogne-Franche-Comte",
"importance": 3,
"q": "montbeliard montbeliard bourgogne franche comte doubs 25"
},
{
"id": "cit-dole",
"name": "Dole",
"city": "Dole",
"type": "city",
"department": "39",
"region": "Bourgogne-Franche-Comte",
"importance": 3,
"q": "dole dole bourgogne franche comte jura 39"
},
{
"id": "cit-ornans",
"name": "Ornans",
"city": "Ornans",
"type": "city",
"department": "25",
"region": "Bourgogne-Franche-Comte",
"importance": 3,
"q": "ornans ornans bourgogne franche comte doubs 25"
},
{
"id": "cit-saint-malo-de-guersac",
"name": "Saint-Malo-de-Guersac",
"city": "Saint-Malo-de-Guersac",
"type": "city",
"department": "44",
"region": "Pays de la Loire",
"importance": 3,
"q": "saint malo de guersac saint malo de guersac pays de la loire loire atlantique 44"
},
{
"id": "cit-roanne",
"name": "Roanne",
"city": "Roanne",
"type": "city",
"department": "42",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "roanne roanne auvergne rhone alpes loire 42"
},
{
"id": "cit-annonay",
"name": "Annonay",
"city": "Annonay",
"type": "city",
"department": "07",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "annonay annonay auvergne rhone alpes ardeche 07"
},
{
"id": "cit-montelimar",
"name": "Montelimar",
"city": "Montelimar",
"type": "city",
"department": "26",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "montelimar montelimar auvergne rhone alpes drome 26"
},
{
"id": "cit-aubenas",
"name": "Aubenas",
"city": "Aubenas",
"type": "city",
"department": "07",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "aubenas aubenas auvergne rhone alpes ardeche 07"
},
{
"id": "cit-millau",
"name": "Millau",
"city": "Millau",
"type": "city",
"department": "12",
"region": "Occitanie",
"importance": 2,
"q": "millau millau occitanie aveyron 12"
},
{
"id": "cit-figeac",
"name": "Figeac",
"city": "Figeac",
"type": "city",
"department": "46",
"region": "Occitanie",
"importance": 3,
"q": "figeac figeac occitanie lot 46"
},
{
"id": "cit-villefranche-sur-saone",
"name": "Villefranche-sur-Saone",
"city": "Villefranche-sur-Saone",
"type": "city",
"department": "69",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "villefranche sur saone villefranche sur saone auvergne rhone alpes rhone 69"
},
{
"id": "cit-bourg-saint-maurice",
"name": "Bourg-Saint-Maurice",
"city": "Bourg-Saint-Maurice",
"type": "city",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 3,
"q": "bourg saint maurice bourg saint maurice auvergne rhone alpes savoie 73"
},
{
"id": "cit-porto-vecchio",
"name": "Porto-Vecchio",
"city": "Porto-Vecchio",
"type": "city",
"department": "2A",
"region": "Corse",
"importance": 2,
"q": "porto vecchio porto vecchio corse corse du sud 2a"
},
{
"id": "cit-bonifacio",
"name": "Bonifacio",
"city": "Bonifacio",
"type": "city",
"department": "2A",
"region": "Corse",
"importance": 2,
"q": "bonifacio bonifacio corse corse du sud 2a"
},
{
"id": "cit-calvi",
"name": "Calvi",
"city": "Calvi",
"type": "city",
"department": "2B",
"region": "Corse",
"importance": 2,
"q": "calvi calvi corse haute corse 2b"
},
{
"id": "cit-corte",
"name": "Corte",
"city": "Corte",
"type": "city",
"department": "2B",
"region": "Corse",
"importance": 2,
"q": "corte corte corse haute corse 2b"
},
{
"id": "cit-ile-rousse",
"name": "Ile-Rousse",
"city": "Ile-Rousse",
"type": "city",
"department": "2B",
"region": "Corse",
"importance": 2,
"q": "ile rousse ile rousse corse haute corse 2b"
},
{
"id": "cit-pointe-a-pitre",
"name": "Pointe-a-Pitre",
"city": "Pointe-a-Pitre",
"type": "city",
"department": "971",
"region": "Guadeloupe",
"importance": 2,
"q": "pointe a pitre pointe a pitre guadeloupe guadeloupe 971"
},
{
"id": "cit-saint-francois",
"name": "Saint-Francois",
"city": "Saint-Francois",
"type": "city",
"department": "971",
"region": "Guadeloupe",
"importance": 3,
"q": "saint francois saint francois guadeloupe guadeloupe 971"
},
{
"id": "cit-les-trois-ilets",
"name": "Les Trois-Ilets",
"city": "Les Trois-Ilets",
"type": "city",
"department": "972",
"region": "Martinique",
"importance": 3,
"q": "les trois ilets les trois ilets martinique martinique 972"
},
{
"id": "cit-sainte-anne",
"name": "Sainte-Anne",
"city": "Sainte-Anne",
"type": "city",
"department": "971",
"region": "Guadeloupe",
"importance": 3,
"q": "sainte anne sainte anne guadeloupe guadeloupe 971"
},
{
"id": "cit-saint-pierre",
"name": "Saint-Pierre",
"city": "Saint-Pierre",
"type": "city",
"department": "974",
"region": "La Reunion",
"importance": 3,
"q": "saint pierre saint pierre la reunion la reunion 974"
},
{
"id": "cit-saint-gilles-les-bains",
"name": "Saint-Gilles-les-Bains",
"city": "Saint-Gilles-les-Bains",
"type": "city",
"department": "974",
"region": "La Reunion",
"importance": 3,
"q": "saint gilles les bains saint gilles les bains la reunion la reunion 974"
},
{
"id": "cit-kourou",
"name": "Kourou",
"city": "Kourou",
"type": "city",
"department": "973",
"region": "Guyane",
"importance": 3,
"q": "kourou kourou guyane guyane 973"
},
{
"id": "cit-rambouillet",
"name": "Rambouillet",
"city": "Rambouillet",
"type": "city",
"department": "78",
"region": "Ile-de-France",
"importance": 3,
"q": "rambouillet rambouillet ile de france yvelines 78"
},
{
"id": "cit-saint-germain-en-laye",
"name": "Saint-Germain-en-Laye",
"city": "Saint-Germain-en-Laye",
"type": "city",
"department": "78",
"region": "Ile-de-France",
"importance": 3,
"q": "saint germain en laye saint germain en laye ile de france yvelines 78"
},
{
"id": "cit-vincennes",
"name": "Vincennes",
"city": "Vincennes",
"type": "city",
"department": "94",
"region": "Ile-de-France",
"importance": 3,
"q": "vincennes vincennes ile de france val de marne 94"
},
{
"id": "cit-neuilly-sur-seine",
"name": "Neuilly-sur-Seine",
"city": "Neuilly-sur-Seine",
"type": "city",
"department": "92",
"region": "Ile-de-France",
"importance": 3,
"q": "neuilly sur seine neuilly sur seine ile de france hauts de seine 92"
},
{
"id": "cit-boulogne-billancourt",
"name": "Boulogne-Billancourt",
"city": "Boulogne-Billancourt",
"type": "city",
"department": "92",
"region": "Ile-de-France",
"importance": 2,
"q": "boulogne billancourt boulogne billancourt ile de france hauts de seine 92"
},
{
"id": "cit-levallois-perret",
"name": "Levallois-Perret",
"city": "Levallois-Perret",
"type": "city",
"department": "92",
"region": "Ile-de-France",
"importance": 3,
"q": "levallois perret levallois perret ile de france hauts de seine 92"
},
{
"id": "cit-issy-les-moulineaux",
"name": "Issy-les-Moulineaux",
"city": "Issy-les-Moulineaux",
"type": "city",
"department": "92",
"region": "Ile-de-France",
"importance": 3,
"q": "issy les moulineaux issy les moulineaux ile de france hauts de seine 92"
},
{
"id": "cit-disneyland-paris-marne-la-vallee",
"name": "Disneyland Paris - Marne-la-Vallee",
"city": "Disneyland Paris - Marne-la-Vallee",
"type": "city",
"department": "77",
"region": "Ile-de-France",
"importance": 2,
"q": "disneyland paris marne la vallee disneyland paris marne la vallee ile de france seine et marne 77"
},
{
"id": "cit-roissy-en-france",
"name": "Roissy-en-France",
"city": "Roissy-en-France",
"type": "city",
"department": "95",
"region": "Ile-de-France",
"importance": 3,
"q": "roissy en france roissy en france ile de france val d oise 95"
},
{
"id": "cit-orly",
"name": "Orly",
"city": "Orly",
"type": "city",
"department": "94",
"region": "Ile-de-France",
"importance": 3,
"q": "orly orly ile de france val de marne 94"
},
{
"id": "cit-massy",
"name": "Massy",
"city": "Massy",
"type": "city",
"department": "91",
"region": "Ile-de-France",
"importance": 3,
"q": "massy massy ile de france essonne 91"
},
{
"id": "cit-la-defense",
"name": "La Defense",
"city": "La Defense",
"type": "city",
"department": "92",
"region": "Ile-de-France",
"importance": 2,
"q": "la defense la defense ile de france hauts de seine 92"
},
{
"id": "air-aeroport-paris-charles-de-gaulle",
"name": "Aeroport Paris-Charles de Gaulle",
"city": "Paris",
"type": "airport",
"department": "95",
"region": "Ile-de-France",
"importance": 1,
"q": "aeroport paris charles de gaulle paris ile de france val d oise 95"
},
{
"id": "air-aeroport-paris-orly",
"name": "Aeroport Paris-Orly",
"city": "Paris",
"type": "airport",
"department": "94",
"region": "Ile-de-France",
"importance": 1,
"q": "aeroport paris orly paris ile de france val de marne 94"
},
{
"id": "air-aeroport-paris-beauvais",
"name": "Aeroport Paris-Beauvais",
"city": "Beauvais",
"type": "airport",
"department": "60",
"region": "Hauts-de-France",
"importance": 2,
"q": "aeroport paris beauvais beauvais hauts de france oise 60"
},
{
"id": "air-aeroport-lyon-saint-exupery",
"name": "Aeroport Lyon-Saint-Exupery",
"city": "Lyon",
"type": "airport",
"department": "69",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "aeroport lyon saint exupery lyon auvergne rhone alpes rhone 69"
},
{
"id": "air-aeroport-marseille-provence",
"name": "Aeroport Marseille-Provence",
"city": "Marseille",
"type": "airport",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "aeroport marseille provence marseille provence alpes cote d azur bouches du rhone 13"
},
{
"id": "air-aeroport-nice-cote-d-azur",
"name": "Aeroport Nice Cote d'Azur",
"city": "Nice",
"type": "airport",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "aeroport nice cote d azur nice provence alpes cote d azur alpes maritimes 06"
},
{
"id": "air-aeroport-toulouse-blagnac",
"name": "Aeroport Toulouse-Blagnac",
"city": "Toulouse",
"type": "airport",
"department": "31",
"region": "Occitanie",
"importance": 1,
"q": "aeroport toulouse blagnac toulouse occitanie haute garonne 31"
},
{
"id": "air-aeroport-bordeaux-merignac",
"name": "Aeroport Bordeaux-Merignac",
"city": "Bordeaux",
"type": "airport",
"department": "33",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "aeroport bordeaux merignac bordeaux nouvelle aquitaine gironde 33"
},
{
"id": "air-aeroport-nantes-atlantique",
"name": "Aeroport Nantes-Atlantique",
"city": "Nantes",
"type": "airport",
"department": "44",
"region": "Pays de la Loire",
"importance": 1,
"q": "aeroport nantes atlantique nantes pays de la loire loire atlantique 44"
},
{
"id": "air-aeroport-montpellier-mediterranee",
"name": "Aeroport Montpellier-Mediterranee",
"city": "Montpellier",
"type": "airport",
"department": "34",
"region": "Occitanie",
"importance": 1,
"q": "aeroport montpellier mediterranee montpellier occitanie herault 34"
},
{
"id": "air-aeroport-lille-lesquin",
"name": "Aeroport Lille-Lesquin",
"city": "Lille",
"type": "airport",
"department": "59",
"region": "Hauts-de-France",
"importance": 1,
"q": "aeroport lille lesquin lille hauts de france nord 59"
},
{
"id": "air-aeroport-strasbourg-entzheim",
"name": "Aeroport Strasbourg-Entzheim",
"city": "Strasbourg",
"type": "airport",
"department": "67",
"region": "Grand Est",
"importance": 1,
"q": "aeroport strasbourg entzheim strasbourg grand est bas rhin 67"
},
{
"id": "air-euroairport-bale-mulhouse",
"name": "EuroAirport Bale-Mulhouse",
"city": "Mulhouse",
"type": "airport",
"department": "68",
"region": "Grand Est",
"importance": 1,
"q": "euroairport bale mulhouse mulhouse grand est haut rhin 68"
},
{
"id": "air-aeroport-rennes-saint-jacques",
"name": "Aeroport Rennes-Saint-Jacques",
"city": "Rennes",
"type": "airport",
"department": "35",
"region": "Bretagne",
"importance": 1,
"q": "aeroport rennes saint jacques rennes bretagne ille et vilaine 35"
},
{
"id": "air-aeroport-brest-bretagne",
"name": "Aeroport Brest-Bretagne",
"city": "Brest",
"type": "airport",
"department": "29",
"region": "Bretagne",
"importance": 1,
"q": "aeroport brest bretagne brest bretagne finistere 29"
},
{
"id": "air-aeroport-biarritz-pays-basque",
"name": "Aeroport Biarritz-Pays Basque",
"city": "Biarritz",
"type": "airport",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "aeroport biarritz pays basque biarritz nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "air-aeroport-pau-pyrenees",
"name": "Aeroport Pau-Pyrenees",
"city": "Pau",
"type": "airport",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "aeroport pau pyrenees pau nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "air-aeroport-bastia-poretta",
"name": "Aeroport Bastia-Poretta",
"city": "Bastia",
"type": "airport",
"department": "2B",
"region": "Corse",
"importance": 1,
"q": "aeroport bastia poretta bastia corse haute corse 2b"
},
{
"id": "air-aeroport-ajaccio-napoleon-bonaparte",
"name": "Aeroport Ajaccio Napoleon-Bonaparte",
"city": "Ajaccio",
"type": "airport",
"department": "2A",
"region": "Corse",
"importance": 1,
"q": "aeroport ajaccio napoleon bonaparte ajaccio corse corse du sud 2a"
},
{
"id": "air-aeroport-figari-sud-corse",
"name": "Aeroport Figari Sud-Corse",
"city": "Figari",
"type": "airport",
"department": "2A",
"region": "Corse",
"importance": 2,
"q": "aeroport figari sud corse figari corse corse du sud 2a"
},
{
"id": "air-aeroport-calvi-sainte-catherine",
"name": "Aeroport Calvi-Sainte-Catherine",
"city": "Calvi",
"type": "airport",
"department": "2B",
"region": "Corse",
"importance": 2,
"q": "aeroport calvi sainte catherine calvi corse haute corse 2b"
},
{
"id": "air-aeroport-toulon-hyeres",
"name": "Aeroport Toulon-Hyeres",
"city": "Toulon",
"type": "airport",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "aeroport toulon hyeres toulon provence alpes cote d azur var 83"
},
{
"id": "air-aeroport-perpignan-rivesaltes",
"name": "Aeroport Perpignan-Rivesaltes",
"city": "Perpignan",
"type": "airport",
"department": "66",
"region": "Occitanie",
"importance": 1,
"q": "aeroport perpignan rivesaltes perpignan occitanie pyrenees orientales 66"
},
{
"id": "air-aeroport-carcassonne-sud-de-france",
"name": "Aeroport Carcassonne-Sud de France",
"city": "Carcassonne",
"type": "airport",
"department": "11",
"region": "Occitanie",
"importance": 1,
"q": "aeroport carcassonne sud de france carcassonne occitanie aude 11"
},
{
"id": "air-aeroport-beziers-cap-d-agde",
"name": "Aeroport Beziers-Cap d'Agde",
"city": "Beziers",
"type": "airport",
"department": "34",
"region": "Occitanie",
"importance": 2,
"q": "aeroport beziers cap d agde beziers occitanie herault 34"
},
{
"id": "air-aeroport-nimes-ales-camargue",
"name": "Aeroport Nimes-Ales-Camargue",
"city": "Nimes",
"type": "airport",
"department": "30",
"region": "Occitanie",
"importance": 1,
"q": "aeroport nimes ales camargue nimes occitanie gard 30"
},
{
"id": "air-aeroport-avignon-provence",
"name": "Aeroport Avignon-Provence",
"city": "Avignon",
"type": "airport",
"department": "84",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "aeroport avignon provence avignon provence alpes cote d azur vaucluse 84"
},
{
"id": "air-aeroport-clermont-ferrand-auvergne",
"name": "Aeroport Clermont-Ferrand-Auvergne",
"city": "Clermont-Ferrand",
"type": "airport",
"department": "63",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "aeroport clermont ferrand auvergne clermont ferrand auvergne rhone alpes puy de dome 63"
},
{
"id": "air-aeroport-grenoble-alpes-isere",
"name": "Aeroport Grenoble-Alpes-Isere",
"city": "Grenoble",
"type": "airport",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "aeroport grenoble alpes isere grenoble auvergne rhone alpes isere 38"
},
{
"id": "air-aeroport-chambery-savoie",
"name": "Aeroport Chambery-Savoie",
"city": "Chambery",
"type": "airport",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "aeroport chambery savoie chambery auvergne rhone alpes savoie 73"
},
{
"id": "air-aeroport-annecy-mont-blanc",
"name": "Aeroport Annecy-Mont-Blanc",
"city": "Annecy",
"type": "airport",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "aeroport annecy mont blanc annecy auvergne rhone alpes haute savoie 74"
},
{
"id": "air-aeroport-limoges-bellegarde",
"name": "Aeroport Limoges-Bellegarde",
"city": "Limoges",
"type": "airport",
"department": "87",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "aeroport limoges bellegarde limoges nouvelle aquitaine haute vienne 87"
},
{
"id": "air-aeroport-poitiers-biard",
"name": "Aeroport Poitiers-Biard",
"city": "Poitiers",
"type": "airport",
"department": "86",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "aeroport poitiers biard poitiers nouvelle aquitaine vienne 86"
},
{
"id": "air-aeroport-tours-val-de-loire",
"name": "Aeroport Tours Val de Loire",
"city": "Tours",
"type": "airport",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 1,
"q": "aeroport tours val de loire tours centre val de loire indre et loire 37"
},
{
"id": "air-aeroport-la-rochelle-ile-de-re",
"name": "Aeroport La Rochelle-Ile de Re",
"city": "La Rochelle",
"type": "airport",
"department": "17",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "aeroport la rochelle ile de re la rochelle nouvelle aquitaine charente maritime 17"
},
{
"id": "air-aeroport-angers-loire",
"name": "Aeroport Angers-Loire",
"city": "Angers",
"type": "airport",
"department": "49",
"region": "Pays de la Loire",
"importance": 1,
"q": "aeroport angers loire angers pays de la loire maine et loire 49"
},
{
"id": "air-aeroport-le-havre-octeville",
"name": "Aeroport Le Havre-Octeville",
"city": "Le Havre",
"type": "airport",
"department": "76",
"region": "Normandie",
"importance": 1,
"q": "aeroport le havre octeville le havre normandie seine maritime 76"
},
{
"id": "air-aeroport-deauville-normandie",
"name": "Aeroport Deauville-Normandie",
"city": "Deauville",
"type": "airport",
"department": "14",
"region": "Normandie",
"importance": 1,
"q": "aeroport deauville normandie deauville normandie calvados 14"
},
{
"id": "air-aeroport-caen-carpiquet",
"name": "Aeroport Caen-Carpiquet",
"city": "Caen",
"type": "airport",
"department": "14",
"region": "Normandie",
"importance": 1,
"q": "aeroport caen carpiquet caen normandie calvados 14"
},
{
"id": "air-aeroport-rouen-vallee-de-seine",
"name": "Aeroport Rouen-Vallee de Seine",
"city": "Rouen",
"type": "airport",
"department": "76",
"region": "Normandie",
"importance": 1,
"q": "aeroport rouen vallee de seine rouen normandie seine maritime 76"
},
{
"id": "air-aeroport-dijon-bourgogne",
"name": "Aeroport Dijon-Bourgogne",
"city": "Dijon",
"type": "airport",
"department": "21",
"region": "Bourgogne-Franche-Comte",
"importance": 1,
"q": "aeroport dijon bourgogne dijon bourgogne franche comte cote d or 21"
},
{
"id": "air-aeroport-metz-nancy-lorraine",
"name": "Aeroport Metz-Nancy-Lorraine",
"city": "Metz",
"type": "airport",
"department": "57",
"region": "Grand Est",
"importance": 1,
"q": "aeroport metz nancy lorraine metz grand est moselle 57"
},
{
"id": "air-aeroport-lorient-bretagne-sud",
"name": "Aeroport Lorient-Bretagne Sud",
"city": "Lorient",
"type": "airport",
"department": "56",
"region": "Bretagne",
"importance": 2,
"q": "aeroport lorient bretagne sud lorient bretagne morbihan 56"
},
{
"id": "air-aeroport-quimper-cornouaille",
"name": "Aeroport Quimper-Cornouaille",
"city": "Quimper",
"type": "airport",
"department": "29",
"region": "Bretagne",
"importance": 2,
"q": "aeroport quimper cornouaille quimper bretagne finistere 29"
},
{
"id": "air-aeroport-dinard-pleurtuit-saint-malo",
"name": "Aeroport Dinard-Pleurtuit-Saint-Malo",
"city": "Dinard",
"type": "airport",
"department": "35",
"region": "Bretagne",
"importance": 2,
"q": "aeroport dinard pleurtuit saint malo dinard bretagne ille et vilaine 35"
},
{
"id": "air-aeroport-bergerac-dordogne",
"name": "Aeroport Bergerac-Dordogne",
"city": "Bergerac",
"type": "airport",
"department": "24",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "aeroport bergerac dordogne bergerac nouvelle aquitaine dordogne 24"
},
{
"id": "air-aeroport-tarbes-lourdes-pyrenees",
"name": "Aeroport Tarbes-Lourdes-Pyrenees",
"city": "Lourdes",
"type": "airport",
"department": "65",
"region": "Occitanie",
"importance": 2,
"q": "aeroport tarbes lourdes pyrenees lourdes occitanie hautes pyrenees 65"
},
{
"id": "air-aeroport-paris-le-bourget",
"name": "Aeroport Paris-Le Bourget",
"city": "Le Bourget",
"type": "airport",
"department": "93",
"region": "Ile-de-France",
"importance": 2,
"q": "aeroport paris le bourget le bourget ile de france seine saint denis 93"
},
{
"id": "air-aeroport-pointe-a-pitre-le-raizet",
"name": "Aeroport Pointe-a-Pitre Le Raizet",
"city": "Pointe-a-Pitre",
"type": "airport",
"department": "971",
"region": "Guadeloupe",
"importance": 2,
"q": "aeroport pointe a pitre le raizet pointe a pitre guadeloupe guadeloupe 971"
},
{
"id": "air-aeroport-martinique-aime-cesaire",
"name": "Aeroport Martinique Aime Cesaire",
"city": "Fort-de-France",
"type": "airport",
"department": "972",
"region": "Martinique",
"importance": 2,
"q": "aeroport martinique aime cesaire fort de france martinique martinique 972"
},
{
"id": "air-aeroport-cayenne-felix-eboue",
"name": "Aeroport Cayenne-Felix Eboue",
"city": "Cayenne",
"type": "airport",
"department": "973",
"region": "Guyane",
"importance": 2,
"q": "aeroport cayenne felix eboue cayenne guyane guyane 973"
},
{
"id": "air-aeroport-la-reunion-roland-garros",
"name": "Aeroport La Reunion Roland Garros",
"city": "Saint-Denis",
"type": "airport",
"department": "974",
"region": "La Reunion",
"importance": 2,
"q": "aeroport la reunion roland garros saint denis la reunion la reunion 974"
},
{
"id": "air-aeroport-dzaoudzi-pamandzi",
"name": "Aeroport Dzaoudzi-Pamandzi",
"city": "Mamoudzou",
"type": "airport",
"department": "976",
"region": "Mayotte",
"importance": 2,
"q": "aeroport dzaoudzi pamandzi mamoudzou mayotte mayotte 976"
},
{
"id": "gar-gare-de-paris-nord",
"name": "Gare de Paris-Nord",
"city": "Paris",
"type": "train_station",
"department": "75",
"region": "Ile-de-France",
"importance": 1,
"q": "gare de paris nord paris ile de france paris 75"
},
{
"id": "gar-gare-de-paris-lyon",
"name": "Gare de Paris-Lyon",
"city": "Paris",
"type": "train_station",
"department": "75",
"region": "Ile-de-France",
"importance": 1,
"q": "gare de paris lyon paris ile de france paris 75"
},
{
"id": "gar-gare-montparnasse",
"name": "Gare Montparnasse",
"city": "Paris",
"type": "train_station",
"department": "75",
"region": "Ile-de-France",
"importance": 1,
"q": "gare montparnasse paris ile de france paris 75"
},
{
"id": "gar-gare-de-l-est",
"name": "Gare de l'Est",
"city": "Paris",
"type": "train_station",
"department": "75",
"region": "Ile-de-France",
"importance": 1,
"q": "gare de l est paris ile de france paris 75"
},
{
"id": "gar-gare-saint-lazare",
"name": "Gare Saint-Lazare",
"city": "Paris",
"type": "train_station",
"department": "75",
"region": "Ile-de-France",
"importance": 1,
"q": "gare saint lazare paris ile de france paris 75"
},
{
"id": "gar-gare-d-austerlitz",
"name": "Gare d'Austerlitz",
"city": "Paris",
"type": "train_station",
"department": "75",
"region": "Ile-de-France",
"importance": 1,
"q": "gare d austerlitz paris ile de france paris 75"
},
{
"id": "gar-gare-de-lyon-part-dieu",
"name": "Gare de Lyon Part-Dieu",
"city": "Lyon",
"type": "train_station",
"department": "69",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "gare de lyon part dieu lyon auvergne rhone alpes rhone 69"
},
{
"id": "gar-gare-de-lyon-perrache",
"name": "Gare de Lyon-Perrache",
"city": "Lyon",
"type": "train_station",
"department": "69",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "gare de lyon perrache lyon auvergne rhone alpes rhone 69"
},
{
"id": "gar-gare-de-marseille-saint-charles",
"name": "Gare de Marseille Saint-Charles",
"city": "Marseille",
"type": "train_station",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "gare de marseille saint charles marseille provence alpes cote d azur bouches du rhone 13"
},
{
"id": "gar-gare-de-lille-europe",
"name": "Gare de Lille-Europe",
"city": "Lille",
"type": "train_station",
"department": "59",
"region": "Hauts-de-France",
"importance": 1,
"q": "gare de lille europe lille hauts de france nord 59"
},
{
"id": "gar-gare-de-lille-flandres",
"name": "Gare de Lille-Flandres",
"city": "Lille",
"type": "train_station",
"department": "59",
"region": "Hauts-de-France",
"importance": 1,
"q": "gare de lille flandres lille hauts de france nord 59"
},
{
"id": "gar-gare-de-bordeaux-saint-jean",
"name": "Gare de Bordeaux Saint-Jean",
"city": "Bordeaux",
"type": "train_station",
"department": "33",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "gare de bordeaux saint jean bordeaux nouvelle aquitaine gironde 33"
},
{
"id": "gar-gare-de-nantes",
"name": "Gare de Nantes",
"city": "Nantes",
"type": "train_station",
"department": "44",
"region": "Pays de la Loire",
"importance": 1,
"q": "gare de nantes nantes pays de la loire loire atlantique 44"
},
{
"id": "gar-gare-de-rennes",
"name": "Gare de Rennes",
"city": "Rennes",
"type": "train_station",
"department": "35",
"region": "Bretagne",
"importance": 1,
"q": "gare de rennes rennes bretagne ille et vilaine 35"
},
{
"id": "gar-gare-de-strasbourg",
"name": "Gare de Strasbourg",
"city": "Strasbourg",
"type": "train_station",
"department": "67",
"region": "Grand Est",
"importance": 1,
"q": "gare de strasbourg strasbourg grand est bas rhin 67"
},
{
"id": "gar-gare-de-montpellier-saint-roch",
"name": "Gare de Montpellier Saint-Roch",
"city": "Montpellier",
"type": "train_station",
"department": "34",
"region": "Occitanie",
"importance": 1,
"q": "gare de montpellier saint roch montpellier occitanie herault 34"
},
{
"id": "gar-gare-de-toulouse-matabiau",
"name": "Gare de Toulouse-Matabiau",
"city": "Toulouse",
"type": "train_station",
"department": "31",
"region": "Occitanie",
"importance": 1,
"q": "gare de toulouse matabiau toulouse occitanie haute garonne 31"
},
{
"id": "gar-gare-de-nice-ville",
"name": "Gare de Nice-Ville",
"city": "Nice",
"type": "train_station",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "gare de nice ville nice provence alpes cote d azur alpes maritimes 06"
},
{
"id": "gar-gare-d-avignon-tgv",
"name": "Gare d'Avignon TGV",
"city": "Avignon",
"type": "train_station",
"department": "84",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "gare d avignon tgv avignon provence alpes cote d azur vaucluse 84"
},
{
"id": "gar-gare-d-aix-en-provence-tgv",
"name": "Gare d'Aix-en-Provence TGV",
"city": "Aix-en-Provence",
"type": "train_station",
"department": "13",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "gare d aix en provence tgv aix en provence provence alpes cote d azur bouches du rhone 13"
},
{
"id": "gar-gare-de-valence-tgv",
"name": "Gare de Valence TGV",
"city": "Valence",
"type": "train_station",
"department": "26",
"region": "Auvergne-Rhone-Alpes",
"importance": 2,
"q": "gare de valence tgv valence auvergne rhone alpes drome 26"
},
{
"id": "gar-gare-du-mans",
"name": "Gare du Mans",
"city": "Le Mans",
"type": "train_station",
"department": "72",
"region": "Pays de la Loire",
"importance": 1,
"q": "gare du mans le mans pays de la loire sarthe 72"
},
{
"id": "gar-gare-de-tours",
"name": "Gare de Tours",
"city": "Tours",
"type": "train_station",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 1,
"q": "gare de tours tours centre val de loire indre et loire 37"
},
{
"id": "gar-gare-de-saint-pierre-des-corps",
"name": "Gare de Saint-Pierre-des-Corps",
"city": "Tours",
"type": "train_station",
"department": "37",
"region": "Centre-Val de Loire",
"importance": 1,
"q": "gare de saint pierre des corps tours centre val de loire indre et loire 37"
},
{
"id": "gar-gare-d-angers-saint-laud",
"name": "Gare d'Angers Saint-Laud",
"city": "Angers",
"type": "train_station",
"department": "49",
"region": "Pays de la Loire",
"importance": 1,
"q": "gare d angers saint laud angers pays de la loire maine et loire 49"
},
{
"id": "gar-gare-de-poitiers",
"name": "Gare de Poitiers",
"city": "Poitiers",
"type": "train_station",
"department": "86",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "gare de poitiers poitiers nouvelle aquitaine vienne 86"
},
{
"id": "gar-gare-de-dijon-ville",
"name": "Gare de Dijon-Ville",
"city": "Dijon",
"type": "train_station",
"department": "21",
"region": "Bourgogne-Franche-Comte",
"importance": 1,
"q": "gare de dijon ville dijon bourgogne franche comte cote d or 21"
},
{
"id": "gar-gare-de-besancon-franche-comte-tgv",
"name": "Gare de Besancon Franche-Comte TGV",
"city": "Besancon",
"type": "train_station",
"department": "25",
"region": "Bourgogne-Franche-Comte",
"importance": 1,
"q": "gare de besancon franche comte tgv besancon bourgogne franche comte doubs 25"
},
{
"id": "gar-gare-de-reims",
"name": "Gare de Reims",
"city": "Reims",
"type": "train_station",
"department": "51",
"region": "Grand Est",
"importance": 1,
"q": "gare de reims reims grand est marne 51"
},
{
"id": "gar-gare-de-metz-ville",
"name": "Gare de Metz-Ville",
"city": "Metz",
"type": "train_station",
"department": "57",
"region": "Grand Est",
"importance": 1,
"q": "gare de metz ville metz grand est moselle 57"
},
{
"id": "gar-gare-de-nancy-ville",
"name": "Gare de Nancy-Ville",
"city": "Nancy",
"type": "train_station",
"department": "54",
"region": "Grand Est",
"importance": 1,
"q": "gare de nancy ville nancy grand est meurthe et moselle 54"
},
{
"id": "gar-gare-de-mulhouse-ville",
"name": "Gare de Mulhouse-Ville",
"city": "Mulhouse",
"type": "train_station",
"department": "68",
"region": "Grand Est",
"importance": 1,
"q": "gare de mulhouse ville mulhouse grand est haut rhin 68"
},
{
"id": "gar-gare-de-grenoble",
"name": "Gare de Grenoble",
"city": "Grenoble",
"type": "train_station",
"department": "38",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "gare de grenoble grenoble auvergne rhone alpes isere 38"
},
{
"id": "gar-gare-de-chambery-challes-les-eaux",
"name": "Gare de Chambery-Challes-les-Eaux",
"city": "Chambery",
"type": "train_station",
"department": "73",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "gare de chambery challes les eaux chambery auvergne rhone alpes savoie 73"
},
{
"id": "gar-gare-d-annecy",
"name": "Gare d'Annecy",
"city": "Annecy",
"type": "train_station",
"department": "74",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "gare d annecy annecy auvergne rhone alpes haute savoie 74"
},
{
"id": "gar-gare-de-perpignan",
"name": "Gare de Perpignan",
"city": "Perpignan",
"type": "train_station",
"department": "66",
"region": "Occitanie",
"importance": 1,
"q": "gare de perpignan perpignan occitanie pyrenees orientales 66"
},
{
"id": "gar-gare-de-narbonne",
"name": "Gare de Narbonne",
"city": "Narbonne",
"type": "train_station",
"department": "11",
"region": "Occitanie",
"importance": 2,
"q": "gare de narbonne narbonne occitanie aude 11"
},
{
"id": "gar-gare-de-rouen-rive-droite",
"name": "Gare de Rouen-Rive-Droite",
"city": "Rouen",
"type": "train_station",
"department": "76",
"region": "Normandie",
"importance": 1,
"q": "gare de rouen rive droite rouen normandie seine maritime 76"
},
{
"id": "gar-gare-d-amiens",
"name": "Gare d'Amiens",
"city": "Amiens",
"type": "train_station",
"department": "80",
"region": "Hauts-de-France",
"importance": 1,
"q": "gare d amiens amiens hauts de france somme 80"
},
{
"id": "gar-gare-de-clermont-ferrand",
"name": "Gare de Clermont-Ferrand",
"city": "Clermont-Ferrand",
"type": "train_station",
"department": "63",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "gare de clermont ferrand clermont ferrand auvergne rhone alpes puy de dome 63"
},
{
"id": "gar-gare-de-limoges-benedictins",
"name": "Gare de Limoges-Benedictins",
"city": "Limoges",
"type": "train_station",
"department": "87",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "gare de limoges benedictins limoges nouvelle aquitaine haute vienne 87"
},
{
"id": "gar-gare-de-brest",
"name": "Gare de Brest",
"city": "Brest",
"type": "train_station",
"department": "29",
"region": "Bretagne",
"importance": 1,
"q": "gare de brest brest bretagne finistere 29"
},
{
"id": "gar-gare-de-quimper",
"name": "Gare de Quimper",
"city": "Quimper",
"type": "train_station",
"department": "29",
"region": "Bretagne",
"importance": 2,
"q": "gare de quimper quimper bretagne finistere 29"
},
{
"id": "gar-gare-de-vannes",
"name": "Gare de Vannes",
"city": "Vannes",
"type": "train_station",
"department": "56",
"region": "Bretagne",
"importance": 2,
"q": "gare de vannes vannes bretagne morbihan 56"
},
{
"id": "gar-gare-de-lorient",
"name": "Gare de Lorient",
"city": "Lorient",
"type": "train_station",
"department": "56",
"region": "Bretagne",
"importance": 2,
"q": "gare de lorient lorient bretagne morbihan 56"
},
{
"id": "gar-gare-de-la-rochelle",
"name": "Gare de La Rochelle",
"city": "La Rochelle",
"type": "train_station",
"department": "17",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "gare de la rochelle la rochelle nouvelle aquitaine charente maritime 17"
},
{
"id": "gar-gare-de-biarritz",
"name": "Gare de Biarritz",
"city": "Biarritz",
"type": "train_station",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "gare de biarritz biarritz nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "gar-gare-de-bayonne",
"name": "Gare de Bayonne",
"city": "Bayonne",
"type": "train_station",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 1,
"q": "gare de bayonne bayonne nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "gar-gare-de-pau",
"name": "Gare de Pau",
"city": "Pau",
"type": "train_station",
"department": "64",
"region": "Nouvelle-Aquitaine",
"importance": 2,
"q": "gare de pau pau nouvelle aquitaine pyrenees atlantiques 64"
},
{
"id": "gar-gare-de-nimes",
"name": "Gare de Nimes",
"city": "Nimes",
"type": "train_station",
"department": "30",
"region": "Occitanie",
"importance": 1,
"q": "gare de nimes nimes occitanie gard 30"
},
{
"id": "gar-gare-d-orleans",
"name": "Gare d'Orleans",
"city": "Orleans",
"type": "train_station",
"department": "45",
"region": "Centre-Val de Loire",
"importance": 1,
"q": "gare d orleans orleans centre val de loire loiret 45"
},
{
"id": "gar-gare-de-blois-chambord",
"name": "Gare de Blois-Chambord",
"city": "Blois",
"type": "train_station",
"department": "41",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "gare de blois chambord blois centre val de loire loir et cher 41"
},
{
"id": "gar-gare-de-bourges",
"name": "Gare de Bourges",
"city": "Bourges",
"type": "train_station",
"department": "18",
"region": "Centre-Val de Loire",
"importance": 2,
"q": "gare de bourges bourges centre val de loire cher 18"
},
{
"id": "gar-gare-de-caen",
"name": "Gare de Caen",
"city": "Caen",
"type": "train_station",
"department": "14",
"region": "Normandie",
"importance": 1,
"q": "gare de caen caen normandie calvados 14"
},
{
"id": "gar-gare-de-tourcoing",
"name": "Gare de Tourcoing",
"city": "Tourcoing",
"type": "train_station",
"department": "59",
"region": "Hauts-de-France",
"importance": 2,
"q": "gare de tourcoing tourcoing hauts de france nord 59"
},
{
"id": "gar-gare-de-saint-etienne-chateaucreux",
"name": "Gare de Saint-Etienne Chateaucreux",
"city": "Saint-Etienne",
"type": "train_station",
"department": "42",
"region": "Auvergne-Rhone-Alpes",
"importance": 1,
"q": "gare de saint etienne chateaucreux saint etienne auvergne rhone alpes loire 42"
},
{
"id": "gar-gare-de-toulon",
"name": "Gare de Toulon",
"city": "Toulon",
"type": "train_station",
"department": "83",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "gare de toulon toulon provence alpes cote d azur var 83"
},
{
"id": "gar-gare-de-cannes",
"name": "Gare de Cannes",
"city": "Cannes",
"type": "train_station",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 1,
"q": "gare de cannes cannes provence alpes cote d azur alpes maritimes 06"
},
{
"id": "gar-gare-d-antibes",
"name": "Gare d'Antibes",
"city": "Antibes",
"type": "train_station",
"department": "06",
"region": "Provence-Alpes-Cote d'Azur",
"importance": 2,
"q": "gare d antibes antibes provence alpes cote d azur alpes maritimes 06"
},
{
"id": "gar-gare-de-marne-la-vallee-chessy",
"name": "Gare de Marne-la-Vallee Chessy",
"city": "Marne-la-Vallee",
"type": "train_station",
"department": "77",
"region": "Ile-de-France",
"importance": 2,
"q": "gare de marne la vallee chessy marne la vallee ile de france seine et marne 77"
}
];

const typeWeight: Record<FrLocationType, number> = {
  airport: 0, city: 1, train_station: 2, department: 3, region: 4,
};

/**
 * Recherche de lieu. Classement : correspondance exacte, puis debut de nom,
 * puis debut d'un mot, puis n'importe ou. A egalite, on privilegie les grandes
 * villes et les aeroports.
 */
export function searchLocations(query: string, limit = 8): FrLocation[] {
  const q = normalize(query);
  if (!q) return FR_LOCATIONS.filter((l) => l.importance === 1).slice(0, limit);

  const scored: { loc: FrLocation; score: number }[] = [];
  for (const loc of FR_LOCATIONS) {
    const name = normalize(loc.name);
    const hay = loc.q;
    let score: number;
    if (name === q) score = 0;
    else if (name.startsWith(q)) score = 1;
    else if (hay.startsWith(q)) score = 2;
    else if (hay.includes(` ${q}`)) score = 3;
    else if (hay.includes(q)) score = 4;
    else continue;
    scored.push({ loc, score: score * 100 + loc.importance * 10 + typeWeight[loc.type] });
  }

  scored.sort((a, b) => a.score - b.score || a.loc.name.localeCompare(b.loc.name));
  return scored.slice(0, limit).map((s) => s.loc);
}

export function findLocation(idOrName: string): FrLocation | null {
  if (!idOrName) return null;
  const direct = FR_LOCATIONS.find((l) => l.id === idOrName);
  if (direct) return direct;
  const q = normalize(idOrName);
  return (
    FR_LOCATIONS.find((l) => normalize(l.name) === q) ??
    FR_LOCATIONS.find((l) => normalize(l.city) === q) ??
    searchLocations(idOrName, 1)[0] ??
    null
  );
}

/** Libelle secondaire affiche sous le nom dans la liste de suggestions. */
export function locationSubtitle(loc: FrLocation): string {
  if (loc.type === 'region') return 'Region';
  if (loc.type === 'department') return loc.region;
  return `${typeLabels[loc.type]} · ${loc.region}`;
}
