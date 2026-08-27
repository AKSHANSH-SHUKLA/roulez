# -*- coding: utf-8 -*-
import json, unicodedata, io, sys

# code, nom du departement, prefecture, region
DEPTS = [
("01","Ain","Bourg-en-Bresse","Auvergne-Rhone-Alpes"),
("02","Aisne","Laon","Hauts-de-France"),
("03","Allier","Moulins","Auvergne-Rhone-Alpes"),
("04","Alpes-de-Haute-Provence","Digne-les-Bains","Provence-Alpes-Cote d'Azur"),
("05","Hautes-Alpes","Gap","Provence-Alpes-Cote d'Azur"),
("06","Alpes-Maritimes","Nice","Provence-Alpes-Cote d'Azur"),
("07","Ardeche","Privas","Auvergne-Rhone-Alpes"),
("08","Ardennes","Charleville-Mezieres","Grand Est"),
("09","Ariege","Foix","Occitanie"),
("10","Aube","Troyes","Grand Est"),
("11","Aude","Carcassonne","Occitanie"),
("12","Aveyron","Rodez","Occitanie"),
("13","Bouches-du-Rhone","Marseille","Provence-Alpes-Cote d'Azur"),
("14","Calvados","Caen","Normandie"),
("15","Cantal","Aurillac","Auvergne-Rhone-Alpes"),
("16","Charente","Angouleme","Nouvelle-Aquitaine"),
("17","Charente-Maritime","La Rochelle","Nouvelle-Aquitaine"),
("18","Cher","Bourges","Centre-Val de Loire"),
("19","Correze","Tulle","Nouvelle-Aquitaine"),
("2A","Corse-du-Sud","Ajaccio","Corse"),
("2B","Haute-Corse","Bastia","Corse"),
("21","Cote-d'Or","Dijon","Bourgogne-Franche-Comte"),
("22","Cotes-d'Armor","Saint-Brieuc","Bretagne"),
("23","Creuse","Gueret","Nouvelle-Aquitaine"),
("24","Dordogne","Perigueux","Nouvelle-Aquitaine"),
("25","Doubs","Besancon","Bourgogne-Franche-Comte"),
("26","Drome","Valence","Auvergne-Rhone-Alpes"),
("27","Eure","Evreux","Normandie"),
("28","Eure-et-Loir","Chartres","Centre-Val de Loire"),
("29","Finistere","Quimper","Bretagne"),
("30","Gard","Nimes","Occitanie"),
("31","Haute-Garonne","Toulouse","Occitanie"),
("32","Gers","Auch","Occitanie"),
("33","Gironde","Bordeaux","Nouvelle-Aquitaine"),
("34","Herault","Montpellier","Occitanie"),
("35","Ille-et-Vilaine","Rennes","Bretagne"),
("36","Indre","Chateauroux","Centre-Val de Loire"),
("37","Indre-et-Loire","Tours","Centre-Val de Loire"),
("38","Isere","Grenoble","Auvergne-Rhone-Alpes"),
("39","Jura","Lons-le-Saunier","Bourgogne-Franche-Comte"),
("40","Landes","Mont-de-Marsan","Nouvelle-Aquitaine"),
("41","Loir-et-Cher","Blois","Centre-Val de Loire"),
("42","Loire","Saint-Etienne","Auvergne-Rhone-Alpes"),
("43","Haute-Loire","Le Puy-en-Velay","Auvergne-Rhone-Alpes"),
("44","Loire-Atlantique","Nantes","Pays de la Loire"),
("45","Loiret","Orleans","Centre-Val de Loire"),
("46","Lot","Cahors","Occitanie"),
("47","Lot-et-Garonne","Agen","Nouvelle-Aquitaine"),
("48","Lozere","Mende","Occitanie"),
("49","Maine-et-Loire","Angers","Pays de la Loire"),
("50","Manche","Saint-Lo","Normandie"),
("51","Marne","Chalons-en-Champagne","Grand Est"),
("52","Haute-Marne","Chaumont","Grand Est"),
("53","Mayenne","Laval","Pays de la Loire"),
("54","Meurthe-et-Moselle","Nancy","Grand Est"),
("55","Meuse","Bar-le-Duc","Grand Est"),
("56","Morbihan","Vannes","Bretagne"),
("57","Moselle","Metz","Grand Est"),
("58","Nievre","Nevers","Bourgogne-Franche-Comte"),
("59","Nord","Lille","Hauts-de-France"),
("60","Oise","Beauvais","Hauts-de-France"),
("61","Orne","Alencon","Normandie"),
("62","Pas-de-Calais","Arras","Hauts-de-France"),
("63","Puy-de-Dome","Clermont-Ferrand","Auvergne-Rhone-Alpes"),
("64","Pyrenees-Atlantiques","Pau","Nouvelle-Aquitaine"),
("65","Hautes-Pyrenees","Tarbes","Occitanie"),
("66","Pyrenees-Orientales","Perpignan","Occitanie"),
("67","Bas-Rhin","Strasbourg","Grand Est"),
("68","Haut-Rhin","Colmar","Grand Est"),
("69","Rhone","Lyon","Auvergne-Rhone-Alpes"),
("70","Haute-Saone","Vesoul","Bourgogne-Franche-Comte"),
("71","Saone-et-Loire","Macon","Bourgogne-Franche-Comte"),
("72","Sarthe","Le Mans","Pays de la Loire"),
("73","Savoie","Chambery","Auvergne-Rhone-Alpes"),
("74","Haute-Savoie","Annecy","Auvergne-Rhone-Alpes"),
("75","Paris","Paris","Ile-de-France"),
("76","Seine-Maritime","Rouen","Normandie"),
("77","Seine-et-Marne","Melun","Ile-de-France"),
("78","Yvelines","Versailles","Ile-de-France"),
("79","Deux-Sevres","Niort","Nouvelle-Aquitaine"),
("80","Somme","Amiens","Hauts-de-France"),
("81","Tarn","Albi","Occitanie"),
("82","Tarn-et-Garonne","Montauban","Occitanie"),
("83","Var","Toulon","Provence-Alpes-Cote d'Azur"),
("84","Vaucluse","Avignon","Provence-Alpes-Cote d'Azur"),
("85","Vendee","La Roche-sur-Yon","Pays de la Loire"),
("86","Vienne","Poitiers","Nouvelle-Aquitaine"),
("87","Haute-Vienne","Limoges","Nouvelle-Aquitaine"),
("88","Vosges","Epinal","Grand Est"),
("89","Yonne","Auxerre","Bourgogne-Franche-Comte"),
("90","Territoire de Belfort","Belfort","Bourgogne-Franche-Comte"),
("91","Essonne","Evry-Courcouronnes","Ile-de-France"),
("92","Hauts-de-Seine","Nanterre","Ile-de-France"),
("93","Seine-Saint-Denis","Bobigny","Ile-de-France"),
("94","Val-de-Marne","Creteil","Ile-de-France"),
("95","Val-d'Oise","Cergy","Ile-de-France"),
("971","Guadeloupe","Basse-Terre","Guadeloupe"),
("972","Martinique","Fort-de-France","Martinique"),
("973","Guyane","Cayenne","Guyane"),
("974","La Reunion","Saint-Denis","La Reunion"),
("976","Mayotte","Mamoudzou","Mayotte"),
]

# villes en plus des prefectures : (nom, code dept)
EXTRA_CITIES = [
("Le Havre","76"),("Reims","51"),("Villeurbanne","69"),("Aix-en-Provence","13"),("Brest","29"),
("Mulhouse","68"),("Saint-Denis","93"),("Argenteuil","95"),("Montreuil","93"),("Roubaix","59"),
("Tourcoing","59"),("Dunkerque","59"),("Calais","62"),("Boulogne-sur-Mer","62"),("Beziers","34"),
("Sete","34"),("Narbonne","11"),("Cannes","06"),("Antibes","06"),("Menton","06"),
("Grasse","06"),("Saint-Tropez","83"),("Hyeres","83"),("Frejus","83"),("Saint-Raphael","83"),
("Saint-Nazaire","44"),("Lorient","56"),("Concarneau","29"),("Douarnenez","29"),("Saint-Malo","35"),
("Dinard","35"),("Dinan","22"),("Perros-Guirec","22"),("Carnac","56"),("Quiberon","56"),
("Vannes","56"),("La Baule-Escoublac","44"),("Les Sables-d'Olonne","85"),("Royan","17"),("Saintes","17"),
("Rochefort","17"),("Cognac","16"),("Arcachon","33"),("Biarritz","64"),("Bayonne","64"),
("Saint-Jean-de-Luz","64"),("Hendaye","64"),("Sarlat-la-Caneda","24"),("Bergerac","24"),("Rocamadour","46"),
("Albi","81"),("Cordes-sur-Ciel","81"),("Foix","09"),("Lourdes","65"),("Cauterets","65"),
("Collioure","66"),("Font-Romeu","66"),("Carcassonne","11"),("Uzes","30"),("Arles","13"),
("Cassis","13"),("Salon-de-Provence","13"),("Gordes","84"),("L'Isle-sur-la-Sorgue","84"),("Orange","84"),
("Chamonix-Mont-Blanc","74"),("Megeve","74"),("Evian-les-Bains","74"),("Thonon-les-Bains","74"),("Morzine","74"),
("Courchevel","73"),("Val-d'Isere","73"),("Tignes","73"),("Meribel","73"),("Aix-les-Bains","73"),
("Albertville","73"),("L'Alpe d'Huez","38"),("Les Deux Alpes","38"),("Vienne","38"),("Bourgoin-Jallieu","38"),
("Vichy","03"),("Beaune","21"),("Chablis","89"),("Vezelay","89"),("Cluny","71"),
("Le Touquet-Paris-Plage","62"),("Amboise","37"),("Chenonceaux","37"),("Chinon","37"),("Loches","37"),
("Azay-le-Rideau","37"),("Villandry","37"),("Chambord","41"),("Cheverny","41"),("Saumur","49"),
("Cholet","49"),("Fontainebleau","77"),("Provins","77"),("Meaux","77"),("Chantilly","60"),
("Compiegne","60"),("Senlis","60"),("Giverny","27"),("Le Mont-Saint-Michel","50"),("Bayeux","14"),
("Deauville","14"),("Trouville-sur-Mer","14"),("Cabourg","14"),("Honfleur","14"),("Etretat","76"),
("Fecamp","76"),("Dieppe","76"),("Cherbourg-en-Cotentin","50"),("Granville","50"),("Riquewihr","68"),
("Obernai","67"),("Haguenau","67"),("Selestat","67"),("Epernay","51"),("Verdun","55"),
("Gerardmer","88"),("Belfort","90"),("Montbeliard","25"),("Dole","39"),("Ornans","25"),
("Saint-Malo-de-Guersac","44"),("Nevers","58"),("Roanne","42"),("Annonay","07"),("Montelimar","26"),
("Aubenas","07"),("Millau","12"),("Figeac","46"),("Villefranche-sur-Saone","69"),("Bourg-Saint-Maurice","73"),
("Porto-Vecchio","2A"),("Bonifacio","2A"),("Calvi","2B"),("Corte","2B"),("Ile-Rousse","2B"),
("Pointe-a-Pitre","971"),("Saint-Francois","971"),("Les Trois-Ilets","972"),("Sainte-Anne","971"),("Saint-Pierre","974"),
("Saint-Gilles-les-Bains","974"),("Kourou","973"),("Versailles","78"),("Rambouillet","78"),("Saint-Germain-en-Laye","78"),
("Vincennes","94"),("Neuilly-sur-Seine","92"),("Boulogne-Billancourt","92"),("Levallois-Perret","92"),("Issy-les-Moulineaux","92"),
("Disneyland Paris - Marne-la-Vallee","77"),("Roissy-en-France","95"),("Orly","94"),("Massy","91"),("La Defense","92"),
]

# aeroports : (nom, ville, code dept)
AIRPORTS = [
("Aeroport Paris-Charles de Gaulle","Paris","95"),
("Aeroport Paris-Orly","Paris","94"),
("Aeroport Paris-Beauvais","Beauvais","60"),
("Aeroport Lyon-Saint-Exupery","Lyon","69"),
("Aeroport Marseille-Provence","Marseille","13"),
("Aeroport Nice Cote d'Azur","Nice","06"),
("Aeroport Toulouse-Blagnac","Toulouse","31"),
("Aeroport Bordeaux-Merignac","Bordeaux","33"),
("Aeroport Nantes-Atlantique","Nantes","44"),
("Aeroport Montpellier-Mediterranee","Montpellier","34"),
("Aeroport Lille-Lesquin","Lille","59"),
("Aeroport Strasbourg-Entzheim","Strasbourg","67"),
("EuroAirport Bale-Mulhouse","Mulhouse","68"),
("Aeroport Rennes-Saint-Jacques","Rennes","35"),
("Aeroport Brest-Bretagne","Brest","29"),
("Aeroport Biarritz-Pays Basque","Biarritz","64"),
("Aeroport Pau-Pyrenees","Pau","64"),
("Aeroport Bastia-Poretta","Bastia","2B"),
("Aeroport Ajaccio Napoleon-Bonaparte","Ajaccio","2A"),
("Aeroport Figari Sud-Corse","Figari","2A"),
("Aeroport Calvi-Sainte-Catherine","Calvi","2B"),
("Aeroport Toulon-Hyeres","Toulon","83"),
("Aeroport Perpignan-Rivesaltes","Perpignan","66"),
("Aeroport Carcassonne-Sud de France","Carcassonne","11"),
("Aeroport Beziers-Cap d'Agde","Beziers","34"),
("Aeroport Nimes-Ales-Camargue","Nimes","30"),
("Aeroport Avignon-Provence","Avignon","84"),
("Aeroport Clermont-Ferrand-Auvergne","Clermont-Ferrand","63"),
("Aeroport Grenoble-Alpes-Isere","Grenoble","38"),
("Aeroport Chambery-Savoie","Chambery","73"),
("Aeroport Annecy-Mont-Blanc","Annecy","74"),
("Aeroport Limoges-Bellegarde","Limoges","87"),
("Aeroport Poitiers-Biard","Poitiers","86"),
("Aeroport Tours Val de Loire","Tours","37"),
("Aeroport La Rochelle-Ile de Re","La Rochelle","17"),
("Aeroport Angers-Loire","Angers","49"),
("Aeroport Le Havre-Octeville","Le Havre","76"),
("Aeroport Deauville-Normandie","Deauville","14"),
("Aeroport Caen-Carpiquet","Caen","14"),
("Aeroport Rouen-Vallee de Seine","Rouen","76"),
("Aeroport Dijon-Bourgogne","Dijon","21"),
("Aeroport Metz-Nancy-Lorraine","Metz","57"),
("Aeroport Lorient-Bretagne Sud","Lorient","56"),
("Aeroport Quimper-Cornouaille","Quimper","29"),
("Aeroport Dinard-Pleurtuit-Saint-Malo","Dinard","35"),
("Aeroport Bergerac-Dordogne","Bergerac","24"),
("Aeroport Tarbes-Lourdes-Pyrenees","Lourdes","65"),
("Aeroport Paris-Le Bourget","Le Bourget","93"),
("Aeroport Pointe-a-Pitre Le Raizet","Pointe-a-Pitre","971"),
("Aeroport Martinique Aime Cesaire","Fort-de-France","972"),
("Aeroport Cayenne-Felix Eboue","Cayenne","973"),
("Aeroport La Reunion Roland Garros","Saint-Denis","974"),
("Aeroport Dzaoudzi-Pamandzi","Mamoudzou","976"),
]

# gares : (nom, ville, code dept)
STATIONS = [
("Gare de Paris-Nord","Paris","75"),
("Gare de Paris-Lyon","Paris","75"),
("Gare Montparnasse","Paris","75"),
("Gare de l'Est","Paris","75"),
("Gare Saint-Lazare","Paris","75"),
("Gare d'Austerlitz","Paris","75"),
("Gare de Lyon Part-Dieu","Lyon","69"),
("Gare de Lyon-Perrache","Lyon","69"),
("Gare de Marseille Saint-Charles","Marseille","13"),
("Gare de Lille-Europe","Lille","59"),
("Gare de Lille-Flandres","Lille","59"),
("Gare de Bordeaux Saint-Jean","Bordeaux","33"),
("Gare de Nantes","Nantes","44"),
("Gare de Rennes","Rennes","35"),
("Gare de Strasbourg","Strasbourg","67"),
("Gare de Montpellier Saint-Roch","Montpellier","34"),
("Gare de Toulouse-Matabiau","Toulouse","31"),
("Gare de Nice-Ville","Nice","06"),
("Gare d'Avignon TGV","Avignon","84"),
("Gare d'Aix-en-Provence TGV","Aix-en-Provence","13"),
("Gare de Valence TGV","Valence","26"),
("Gare du Mans","Le Mans","72"),
("Gare de Tours","Tours","37"),
("Gare de Saint-Pierre-des-Corps","Tours","37"),
("Gare d'Angers Saint-Laud","Angers","49"),
("Gare de Poitiers","Poitiers","86"),
("Gare de Dijon-Ville","Dijon","21"),
("Gare de Besancon Franche-Comte TGV","Besancon","25"),
("Gare de Reims","Reims","51"),
("Gare de Metz-Ville","Metz","57"),
("Gare de Nancy-Ville","Nancy","54"),
("Gare de Mulhouse-Ville","Mulhouse","68"),
("Gare de Grenoble","Grenoble","38"),
("Gare de Chambery-Challes-les-Eaux","Chambery","73"),
("Gare d'Annecy","Annecy","74"),
("Gare de Perpignan","Perpignan","66"),
("Gare de Narbonne","Narbonne","11"),
("Gare de Rouen-Rive-Droite","Rouen","76"),
("Gare d'Amiens","Amiens","80"),
("Gare de Clermont-Ferrand","Clermont-Ferrand","63"),
("Gare de Limoges-Benedictins","Limoges","87"),
("Gare de Brest","Brest","29"),
("Gare de Quimper","Quimper","29"),
("Gare de Vannes","Vannes","56"),
("Gare de Lorient","Lorient","56"),
("Gare de La Rochelle","La Rochelle","17"),
("Gare de Biarritz","Biarritz","64"),
("Gare de Bayonne","Bayonne","64"),
("Gare de Pau","Pau","64"),
("Gare de Nimes","Nimes","30"),
("Gare d'Orleans","Orleans","45"),
("Gare de Blois-Chambord","Blois","41"),
("Gare de Bourges","Bourges","18"),
("Gare de Caen","Caen","14"),
("Gare de Tourcoing","Tourcoing","59"),
("Gare de Saint-Etienne Chateaucreux","Saint-Etienne","42"),
("Gare de Toulon","Toulon","83"),
("Gare de Cannes","Cannes","06"),
("Gare d'Antibes","Antibes","06"),
("Gare de Marne-la-Vallee Chessy","Marne-la-Vallee","77"),
]

MAJOR = set("""Paris Marseille Lyon Toulouse Nice Nantes Montpellier Strasbourg Bordeaux Lille Rennes Toulon
Reims Saint-Etienne Le Havre Grenoble Dijon Angers Nimes Villeurbanne Clermont-Ferrand Le Mans
Aix-en-Provence Brest Tours Amiens Limoges Annecy Perpignan Besancon Metz Orleans Rouen Mulhouse
Caen Nancy Avignon Cannes Biarritz Ajaccio Bastia La Rochelle Saint-Malo Colmar Chamonix-Mont-Blanc
Deauville Poitiers Chambery Bayonne Arles Carcassonne Versailles""".split("\n"))
MAJOR = set(w.strip() for line in MAJOR for w in line.split("  ") if w.strip())
MAJOR = set("""Paris|Marseille|Lyon|Toulouse|Nice|Nantes|Montpellier|Strasbourg|Bordeaux|Lille|Rennes|Toulon|Reims|Saint-Etienne|Le Havre|Grenoble|Dijon|Angers|Nimes|Villeurbanne|Clermont-Ferrand|Le Mans|Aix-en-Provence|Brest|Tours|Amiens|Limoges|Annecy|Perpignan|Besancon|Metz|Orleans|Rouen|Mulhouse|Caen|Nancy|Avignon|Cannes|Biarritz|Ajaccio|Bastia|La Rochelle|Saint-Malo|Colmar|Chamonix-Mont-Blanc|Deauville|Poitiers|Chambery|Bayonne|Arles|Carcassonne|Versailles""".split("|"))

MEDIUM = set("""Troyes|Chartres|Valence|Bourges|Blois|Saumur|Vannes|Lorient|Quimper|Saint-Brieuc|Beziers|Narbonne|Antibes|Menton|Arcachon|Sarlat-la-Caneda|Bergerac|Albi|Lourdes|Beaune|Vichy|Dunkerque|Calais|Le Touquet-Paris-Plage|Amboise|Fontainebleau|Chantilly|Bayeux|Honfleur|Etretat|Cherbourg-en-Cotentin|Epernay|Gerardmer|Belfort|Nevers|Roanne|Millau|Porto-Vecchio|Bonifacio|Calvi|Pointe-a-Pitre|Fort-de-France|Cayenne|Saint-Denis|Courchevel|Val-d'Isere|Megeve|Evian-les-Bains|Les Sables-d'Olonne|Royan|Saint-Nazaire|Dinard|La Baule-Escoublac|Boulogne-Billancourt|La Defense|Disneyland Paris - Marne-la-Vallee|Saint-Tropez|Cassis|Orange|Uzes|Aix-les-Bains|Saint-Jean-de-Luz|Tarbes|Angouleme|Niort|Laval|Auxerre|Macon|Chateauroux|Agen|Montauban|Rodez|Pau|Perigueux|Cahors|Auch|Mont-de-Marsan|Evreux|Alencon|Arras|Beauvais|Laon|Charleville-Mezieres|Bar-le-Duc|Chaumont|Chalons-en-Champagne|Epinal|Vesoul|Lons-le-Saunier|Privas|Foix|Mende|Gap|Digne-les-Bains|Aurillac|Tulle|Gueret|Le Puy-en-Velay|Moulins|Bourg-en-Bresse|Saint-Lo|Melun|Bobigny|Nanterre|Creteil|Cergy|Evry-Courcouronnes|La Roche-sur-Yon|Basse-Terre|Mamoudzou|Corte|Ile-Rousse|Figari|Le Bourget|Marne-la-Vallee|Tourcoing|Roubaix""".split("|"))

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

def slug(s):
    s = strip_accents(s).lower()
    out = []
    for ch in s:
        if ch.isalnum(): out.append(ch)
        elif ch in " -'’.": out.append('-')
    r = ''.join(out)
    while '--' in r: r = r.replace('--','-')
    return r.strip('-')

dept_by_code = {c: (n, p, r) for c, n, p, r in DEPTS}

locs = []
seen = set()

def add(id_, name, city, type_, dept, region, importance):
    if id_ in seen: return
    seen.add(id_)
    locs.append({"id": id_, "name": name, "city": city, "type": type_,
                 "department": dept, "region": region, "importance": importance})

def importance_of(city):
    if city in MAJOR: return 1
    if city in MEDIUM: return 2
    return 3

# regions
regions = []
for c, n, p, r in DEPTS:
    if r not in regions: regions.append(r)
for r in regions:
    add(f"reg-{slug(r)}", r, r, "region", "", r, 2)

# departements
for c, n, p, r in DEPTS:
    add(f"dep-{c.lower()}", f"{n} ({c})", n, "department", c, r, 2)

# villes : prefectures
for c, n, p, r in DEPTS:
    add(f"cit-{slug(p)}", p, p, "city", c, r, importance_of(p))

# villes en plus
for name, c in EXTRA_CITIES:
    n, p, r = dept_by_code[c]
    add(f"cit-{slug(name)}", name, name, "city", c, r, importance_of(name))

# aeroports
for name, city, c in AIRPORTS:
    n, p, r = dept_by_code[c]
    add(f"air-{slug(name)}", name, city, "airport", c, r, 1 if importance_of(city) == 1 else 2)

# gares
for name, city, c in STATIONS:
    n, p, r = dept_by_code[c]
    add(f"gar-{slug(name)}", name, city, "train_station", c, r, 1 if importance_of(city) == 1 else 2)

# champ de recherche normalise
for l in locs:
    n, p, r = dept_by_code.get(l["department"], ("", "", l["region"]))
    hay = " ".join([l["name"], l["city"], l["region"], n, l["department"]])
    l["q"] = slug(hay).replace('-', ' ')

by_type = {}
for l in locs:
    by_type[l["type"]] = by_type.get(l["type"], 0) + 1
print(json.dumps(by_type, indent=1), "TOTAL", len(locs), file=sys.stderr)

header = '''/**
 * Toute la France — lieux de prise en charge.
 *
 * Genere : ne pas editer a la main, editer /root/gen/build_locations.py puis regenerer.
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
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export const FR_LOCATIONS: FrLocation[] = '''

body = json.dumps(locs, ensure_ascii=False, indent=0).replace('\n', '\n')
out = header + body + ";\n"

out += '''
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
'''

with io.open('/root/roulez/src/lib/locations.ts', 'w', encoding='utf-8') as f:
    f.write(out)
print("written", len(locs))
