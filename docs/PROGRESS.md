# Etat du projet

Derniere mise a jour : 2026-08-27
Site en ligne : https://roulez.vercel.app
Depot : https://github.com/AKSHANSH-SHUKLA/roulez

Ce fichier dit la verite sur ce qui marche. Il se met a jour a chaque livraison.

## 1. En une phrase

La vitrine et le parcours de comparaison sont termines et credibles ; les
donnees, les paiements et la persistance sont simules. Environ **50 %** du
chemin vers un site exploitable, **0 EUR** depense a ce jour.

## 2. Ce qui fonctionne

| Domaine | Etat | Detail |
| --- | --- | --- |
| Accueil | Fait | Trois activites visibles : Louer, Acheter/Vendre, Assurance |
| Recherche de lieu | Fait | Toute la France : 101 departements, 18 regions, 253 villes, 53 aeroports, 60 gares. Recherche sans accents |
| Regles de duree | Fait | 24 h minimum, 6 mois maximum, message d'erreur explicite |
| Liste de resultats | Fait | Flotte et prix derives du lieu (aeroport +18 %, petite ville moins de choix), filtres, tri par **total** |
| Conditions commerciales | Fait | Total, caution, franchise, annulation, note, cartes, carburant, kilometrage — en liste **et** en fiche |
| Fiche vehicule | Fait | Conditions detaillees, option assurance, recapitulatif de prix |
| Assurance | Fait | Section d'accueil et page dediee |
| Achat / Vente | Fait | Recherche par marque/modele et budget, fiche annonce complete, depot d'annonce avec photos et documents obligatoires francais |
| Connexion | Demonstration | Aucune verification reelle, non persiste |
| Reservation | Demonstration | Enregistree en memoire, perdue au redemarrage |
| Photos | Fait | Photos reelles Wikimedia, credits sur `/credits` |
| Charte visuelle | Fait | Tous les ecrans sont passes a la charte « affiche », y compris la fenetre de connexion et la page credits |
| Langues | Fait | Francais et anglais, selecteur dans la barre de navigation, choix conserve, langue du navigateur par defaut |

## 3. Ce qui n'existe pas

- **Donnees reelles de loueurs.** Les 70 vehicules et toutes les conditions sont
  des donnees de demonstration coherentes, pas des offres reelles.
- **Paiement.** Aucun Stripe, aucun encaissement.
- **Base de donnees.** Rien n'est conserve entre deux redemarrages.
- **Comptes utilisateurs reels**, emails de confirmation, espace client.
- **Vraies URL.** Voir ADR-001. Pas de lien partageable, pas de bouton retour,
  pas de referencement des pages produit.
- **Tests automatises.**

## 4. Le vrai blocage : l'acces aux donnees

Ce n'est pas le paiement.

| Source | Etat |
| --- | --- |
| Amadeus Self-Service | Arrete le 17 juillet 2026 |
| API DiscoverCars | Exige 50 000 visiteurs par mois |
| API Priceline | Exige 5 reservations par jour |
| Hertz, Avis, Europcar, Sixt | Aucune API publique |
| **Affiliation** (Travelpayouts, Awin, CJ) | **Ouverte aujourd'hui, sans seuil** |

Consequence : le premier vrai catalogue passera par l'affiliation. Roulez
compare et redirige, le loueur encaisse. C'est aussi le montage qui evite
l'immatriculation Atout France (voir `docs/PRD.md`, section 6).

## 5. Prochaines etapes

### Maintenant (technique, sans budget)

1. **Migrer vers de vraies URL** (App Router) en une seule fois : `/recherche`,
   `/voiture/[id]`, `/occasion`, `/assurance`. Debloque le partage de lien, le
   bouton retour et le referencement.
2. **Persistance** : une base Postgres et un schema pour les reservations et les
   annonces. Sans cela, aucune reservation ne survit.
3. **Ecran de paiement** (maquette d'abord) : recapitulatif, conditions,
   moyen de paiement, avec la caution clairement hors total.

### Ensuite (demande une decision commerciale)

4. **S'inscrire a un programme d'affiliation** et remplacer les donnees de
   demonstration par un vrai flux dans `termsFor()`.
5. **Societe et compte Stripe** : SIREN/SIRET, Kbis, IBAN francais.
6. **Page « Louez votre voiture » en liste d'attente** pour mesurer la demande
   P2P avant d'engager des frais d'assurance (ADR-006).

## 6. Journal des livraisons

| Date | Livraison |
| --- | --- |
| 2026-08 | Premiere mise en ligne, 70 vehicules, 11 destinations |
| 2026-08 | Correction de la page blanche (`{ success, data }`, ADR-002) |
| 2026-08 | Remplacement des images par des photos reelles Wikimedia, page `/credits` |
| 2026-08-27 | Refonte visuelle « affiche de voyage » de l'accueil (ADR-007) |
| 2026-08-27 | Correction du debordement horizontal du pied de page, filet de securite sans JavaScript |
| 2026-08-27 | Conditions commerciales, bornes de duree, section assurance separee, selecteur Louer/Acheter/Vendre (ADR-003, 004, 005) |
| 2026-08-27 | Couverture de toute la France (485 lieux), flotte et prix par lieu, rythme de couleurs de l'accueil, parallaxe du heros rendue visible |
| 2026-08-27 | Recherche d'annonces par marque et budget, depot d'annonce avec photos et obligations legales francaises (ADR-010), refonte de la fiche annonce |
| 2026-08-27 | Site bilingue francais / anglais (ADR-011), fenetre de connexion et page credits reprises a la nouvelle charte |
| 2026-08-28 | Palette de l'accueil ramenee a deux teintes (ADR-012), photos du heros remplacees par des vehicules |
