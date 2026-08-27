# Architecture

Derniere mise a jour : 2026-08-27

## 1. Pile

| Element | Choix | Pourquoi |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Deploiement Vercel, routes API dans le meme depot |
| UI | React 19, TypeScript strict | — |
| Style | Tailwind CSS 4 avec `@theme` | Tokens dans le CSS, pas de fichier de config JS |
| Etat | Zustand, 3 stores | Suffisant ; pas de serveur d'etat car pas encore de vraie API |
| Animation | Motion (framer-motion) | Deja utilise pour Tilt et Reveal |
| Icones | lucide-react, un seul jeu | — |
| Police | Archivo variable (axe `wdth`), via `next/font` | Titres facon affiche |

## 2. Schema de fonctionnement

```
  navigateur
      |
      |  currentPage (Zustand)
      v
  src/app/page.tsx  ── switch ──> sections/<ecran>.tsx
                                        |
                                        |  fetch('/api/...')
                                        v
                                  app/api/*/route.ts   (donnees de demo en memoire)
                                        |
                                        v
                                  { success: true, data: [...] }
                                        |
                                        v
                    lib/rental-terms.ts  +  lib/rental-rules.ts
                    (conditions, devis)     (bornes de duree)
                                        |
                                        v
                              components/ui/terms.tsx  (affichage seul)
```

Le point important : **les regles metier sont dans `lib/`, jamais dans le JSX.**
Les composants recoivent des objets deja calcules et se contentent de les
disposer a l'ecran.

## 3. Modules metier

### `src/lib/rental-rules.ts`

Bornes et arithmetique de duree. Exporte `MIN_RENTAL_DAYS`, `MAX_RENTAL_DAYS`,
`DURATION_HINT`, `rentalDays`, `checkRentalDuration`, `formatDuration`,
`isoDatePlus`.

`checkRentalDuration` renvoie `{ ok, days, error }`. Les appelants affichent
`error` tel quel : le texte francais vit ici, pas dans les composants, pour que
les trois surfaces disent la meme chose.

### `src/lib/rental-terms.ts`

- `SUPPLIERS` : registre des loueurs. Note, nombre d'avis, carte de debit
  acceptee, politique d'annulation, politique carburant, kilometrage. Ajouter un
  loueur = une ligne, rien d'autre.
- `DEPOSIT_BY_CATEGORY` : caution et franchise par categorie de vehicule.
- `termsFor(car)` : combine les deux et renvoie un `RentalTerms` complet.
- `quoteFor(pricePerDay, days, insurancePerDay)` : **le seul calcul de total du
  projet**.
- `euro`, `mileageLabel`, `cardsLabel` : formatage.

Quand un vrai flux fournisseur arrivera, seule l'implementation de `termsFor`
change. Les composants ne bougent pas. C'est le but de la separation.

### `src/lib/locations.ts`

485 lieux couvrant toute la France : 18 regions, 101 departements, 253 villes
(prefectures, grandes villes, villes touristiques), 53 aeroports, 60 gares.

Chaque entree porte un champ `q` : une chaine normalisee (sans accents, sans
tirets) qui concatene nom, ville, departement, numero de departement et region.
C'est ce qui permet a « indre » de trouver Tours, a « 37 » de trouver
Indre-et-Loire, et a « ile de france » de trouver Roissy sans que l'utilisateur
tape le moindre accent.

`searchLocations()` classe les resultats : correspondance exacte, puis debut de
nom, puis debut de mot, puis n'importe ou. A egalite, les grandes villes et les
aeroports passent devant.

Le fichier est **genere** par `scripts/build_locations.py`. Pour ajouter des
lieux, modifier le script et regenerer, pas le TypeScript.

### `src/lib/fleet.ts`

`fleetAt(cars, location)` derive la flotte disponible a un lieu, de facon
deterministe : le meme lieu renvoie toujours les memes vehicules aux memes prix.
Un aeroport coute 18 % plus cher (frais d'aeroport), une gare 8 %. Une metropole
propose tout le catalogue, une ville moyenne 65 %, une petite ville 38 %.

Ce fichier disparait le jour ou un vrai flux fournisseur donne la disponibilite
reelle. Rien d'autre ne bouge.

### `src/lib/sale-rules.ts`

Les obligations du vendeur d'un vehicule d'occasion en France, sous forme de
code plutot que de texte d'aide :

- `requiresControleTechnique(mec)` — vrai au-dela de 4 ans ;
- `controleTechniqueValid(date)` — moins de 6 mois ;
- `documentRules(mec)` — la liste des documents avec, pour chacun, s'il est
  obligatoire pour ce vehicule precis et pourquoi ;
- `validateListing(draft)` — refuse une annonce incomplete, avec un message par
  champ.

Les constantes legales (`CERFA_CESSION`, `CSA_MAX_AGE_DAYS`,
`ANTS_DECLARATION_DAYS`, `ANTS_FINE_EUR`) sont exportees et reutilisees dans le
texte de l'interface, pour qu'un changement de reglementation se fasse a un seul
endroit.

### `src/lib/store.ts`

Trois stores Zustand, volontairement separes :

- `useAppStore` : `currentPage`, `selectedCar`, `selectedListing`,
  `searchQuery`, `toast`. C'est le routeur.
- `useAuthStore` : `user`, `token`, `showAuth`. Demonstration, non persiste.
- `useBookingStore` : `filters` (lieu et dates de la recherche en cours),
  `searchResults`, `bookingDetails`.

`filters.pickupDate` / `filters.returnDate` portent la duree entre la recherche
et la fiche vehicule. La fiche s'initialise dessus, ce qui evite a
l'utilisateur de ressaisir ses dates.

## 4. Ecrans

| `currentPage` | Composant | Role |
| --- | --- | --- |
| `home` | Navbar, HeroSearch, SupplierRail, PopularDestinations, HowItWorks, FeaturedCars, BuySellBand, InsuranceBand, Testimonials, CtaBand, Footer | Accueil, trois activites visibles |
| `search` | SearchResults | Liste d'offres, filtres, tri par total |
| `car-detail` | CarDetail | Conditions, option assurance, reservation |
| `buy-sell` | BuySell | Annonces d'occasion |
| `listing-detail` | ListingDetail | Fiche annonce |
| `insurance` | InsurancePage | Explications et formules |

`HeroSearch` porte un selecteur **Louer / Acheter / Vendre** : c'est le point
d'entree unique des trois activites, pour eviter trois barres de recherche
concurrentes sur la meme page.

## 5. Routes API

Toutes en memoire, toutes au format `{ success, data }`.

| Route | Contenu |
| --- | --- |
| `GET /api/cars` | 70 vehicules de reference. `pickupLocation` (identifiant ou nom libre) derive la flotte du lieu via `fleet.ts` |
| `GET /api/destinations` | 11 villes |
| `GET /api/locations?q=` | Recherche dans les 485 lieux de France |
| `GET /api/insurance` | 3 formules |
| `GET /api/sale-listings` | Annonces d'occasion. Filtres `q` (marque ou modele, sans accents), `maxPrice`, `minPrice`, `fuelType`, `condition` |
| `POST /api/bookings` | Cree une reservation en memoire, renvoie une reference |
| `POST /api/auth` | Connexion factice |

Aucune persistance : un redemarrage du serveur efface les reservations. C'est
assume tant qu'il n'y a pas de base de donnees.

## 6. Images

Photos reelles sous licence libre (Wikimedia Commons), servies depuis
`public/cars/` et `public/destinations/`. Les credits obligatoires (CC BY-SA)
sont dans `public/image-credits.json` et affiches sur `/credits`.

Ne pas remplacer par des images generees ou des placeholders : le realisme des
photos etait une demande explicite, et les credits sont une obligation de
licence, pas une politesse.

## 7. Dette connue

1. **Pas de vraies URL.** Tout l'etat de navigation est en memoire : impossible
   de partager un lien vers une recherche, et le bouton retour du navigateur
   quitte le site. A migrer vers l'App Router en une seule fois.
2. **Ecrans restants a l'ancienne charte** : `buy-sell.tsx`,
   `listing-detail.tsx`, `auth-modal.tsx` utilisent encore `emerald-*`,
   `gray-*` et `font-[Inter]`.
3. **Aucun test automatise.** La verification se fait au navigateur, a la main.
4. **Pas de persistance ni de paiement.**
