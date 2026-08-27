# Roulez — Product Requirements

Derniere mise a jour : 2026-08-27

## 1. Le probleme

Louer une voiture en France se decide sur un prix affiche qui n'est pas le prix
paye. Le tarif journalier est un produit d'appel ; ce qui coute reellement de
l'argent arrive plus tard : la caution bloquee au comptoir, la franchise en cas
de rayure, le plein facture, le forfait kilometrique, la carte de debit refusee
au guichet. Les comparateurs existants affichent le prix par jour et repoussent
le reste dans les conditions generales.

Cote occasion, le meme probleme sous une autre forme : une annonce sans
historique, sans controle technique, avec un vendeur injoignable.

## 2. La proposition

Un seul site, pour la France, qui repond a trois besoins distincts :

| Activite | Promesse | Etat |
| --- | --- | --- |
| **Louer** | Comparer les loueurs avec le total, la caution et la franchise visibles **avant** de reserver | Demonstration fonctionnelle |
| **Acheter / Vendre** | Annonces d'occasion sans commission, contact direct | Demonstration fonctionnelle |
| **Assurance** | Expliquer franchise, caution et options en francais simple, sans les vendre | Demonstration fonctionnelle |

Le differenciateur n'est pas le catalogue : c'est la transparence sur les
conditions commerciales, affichee au niveau de la liste de resultats et pas
seulement au fond d'une page.

## 3. Utilisateurs

- **Le touriste ou le voyageur d'affaires** qui atterrit a Nice ou a Roissy et
  veut une voiture pour 3 a 10 jours. Sensible au total et a l'annulation.
- **Le resident sans voiture** qui loue un week-end ou un mois. Sensible au
  kilometrage et a la carte acceptee.
- **Le locataire longue duree** (1 a 6 mois) : demenagement, mission, permis
  recent. Segment mal servi par les comparateurs actuels.
- **L'acheteur / vendeur d'occasion**, qui arrive par la meme porte.

## 4. Exigences fonctionnelles

### 4.1 Location

- **F-L1** La recherche demande un lieu, une date de depart et une date de retour.
- **F-L2** La duree est de **24 heures minimum** et de **6 mois maximum**
  (182 jours). Hors bornes, la recherche est refusee avec un message explicite.
- **F-L3** Chaque offre affiche, des la liste de resultats :
  - le **prix total** pour la periode choisie, taxes comprises, et le prix par jour ;
  - la **caution** (montant bloque au comptoir) ;
  - la **franchise** (reste a charge en cas de dommage) ;
  - un badge **annulation gratuite** avec le delai, ou son absence ;
  - la **note du loueur** et le nombre d'avis ;
  - les **cartes acceptees** au comptoir (credit seul, ou credit et debit) ;
  - la **politique carburant** ;
  - le **kilometrage** (illimite ou forfait par jour).
- **F-L4** Le tri par defaut est le **total le moins cher**, pas le prix par jour.
- **F-L5** Filtres sur ces conditions : annulation gratuite, carte de debit
  acceptee, kilometrage illimite, total maximum.
- **F-L6** La fiche vehicule reprend les memes chiffres, avec une explication en
  une phrase pour chacun.
- **F-L7** La caution n'est **jamais** incluse dans le total affiche, et le dit
  explicitement.

### 4.2 Achat / Vente

- **F-A1** Liste d'annonces filtrable, fiche annonce avec contact vendeur.
- **F-A2** Depot d'annonce gratuit, sans commission.
- **F-A3** L'accueil expose l'achat et la vente comme une activite a part
  entiere, pas comme un lien de pied de page.

### 4.3 Assurance

- **F-S1** Section dediee sur l'accueil et page dediee.
- **F-S2** Explique franchise, caution, carte de credit exigee, et le doublon
  possible avec l'assurance de la carte bancaire du client.
- **F-S3** Les formules sont facultatives et clairement presentees comme des
  produits des loueurs partenaires, pas de Roulez.

## 5. Non-objectifs (pour l'instant)

- Hors de France.
- Application mobile native.
- Location entre particuliers (P2P) : etudiee, bloquee par la reglementation
  assurance. Voir `docs/DECISIONS.md`, ADR-006.
- Encaissement du paiement sur Roulez : declenche l'immatriculation Atout
  France. Voir section 6.

## 6. Contraintes legales (France)

Ces contraintes dictent des choix de produit, pas seulement des mentions legales.

- Un **comparateur pur** qui redirige vers le loueur est exempte
  d'immatriculation Atout France. Des que Roulez encaisse le paiement du
  voyageur, l'immatriculation devient obligatoire.
- **Vendre de l'assurance** en son nom exige une immatriculation ORIAS
  (courtier). D'ou F-S3 : Roulez presente les formules des loueurs, ne les vend pas.
- Le **droit de retractation de 14 jours ne s'applique pas** a la location de
  voiture (Code de la consommation, art. L221-28, 12°). L'interface ne doit pas
  le promettre.
- Un compte **Stripe France** exige SIREN/SIRET, Kbis et un IBAN francais.

## 7. Metriques

Quand le site aura du trafic reel :

- Part des recherches qui atteignent une fiche vehicule.
- Part des fiches vehicule qui atteignent une reservation.
- Taux d'usage des filtres de conditions (valide ou invalide la these du produit).
- Part des locations de plus de 30 jours (valide ou invalide le segment longue duree).

## 8. Ce qui bloque la mise en production

Le blocage n'est **pas** le paiement, c'est l'acces aux donnees fournisseurs :

- Amadeus Self-Service : arrete le 17 juillet 2026.
- API DiscoverCars : exige 50 000 visiteurs par mois.
- API Priceline : exige 5 reservations par jour.
- Hertz, Avis, Europcar, Sixt : aucune API publique.

La seule porte ouverte aujourd'hui est l'**affiliation** (Travelpayouts, Awin,
CJ). Detail dans `docs/PROGRESS.md`.
