# Journal des decisions (ADR)

Une entree par decision structurante. Format : contexte, decision, consequence.
**Toute deviation aux invariants de `CLAUDE.md` exige une nouvelle entree ici.**

---

## ADR-001 — Navigation par etat, pas par URL

**Date** : 2026-08 · **Statut** : accepte, a revoir

**Contexte.** Le prototype a demarre sur un seul ecran avec un `switch` sur un
etat Zustand. Migrer vers l'App Router touche chaque composant.

**Decision.** On garde `currentPage` pour l'instant. La migration se fera en une
seule fois, pas ecran par ecran.

**Consequence.** Pas de lien partageable vers une recherche, pas de bouton
retour, pas de referencement des pages produit. Acceptable pour une
demonstration, bloquant avant la mise en production. Voir `docs/PROGRESS.md`.

---

## ADR-002 — Les reponses d'API sont `{ success, data }`

**Date** : 2026-08 · **Statut** : accepte

**Contexte.** Un composant faisait `setDestinations(await res.json())` alors que
la route renvoyait un objet enveloppe. Resultat : `destinations.map is not a
function`, page blanche en production, y compris en navigation privee.
TypeScript n'a rien vu parce que `res.json()` est `any` et que l'annotation
`const data: Destination[]` etait un mensonge.

**Decision.** Format d'enveloppe uniforme, et cote client toujours
`const list = Array.isArray(json) ? json : (json?.data ?? [])`.

**Consequence.** Un peu de verbosite a chaque `fetch`, en echange d'un mode de
panne elimine.

---

## ADR-003 — Un seul module calcule les conditions et les prix

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** La caution, la franchise, la note du loueur et le total etaient
soit absents, soit codes en dur dans le JSX (une note de 4.0 en dur sur la fiche
vehicule, par exemple). Deux ecrans pouvaient afficher deux chiffres differents
pour la meme offre.

**Decision.** `src/lib/rental-terms.ts` est la seule source : registre
`SUPPLIERS`, `termsFor()`, `quoteFor()`. Les composants de
`components/ui/terms.tsx` affichent, ne calculent pas.

**Consequence.** Le branchement d'un vrai flux fournisseur ne touchera qu'un
fichier. En contrepartie, ajouter une condition commerciale demande de passer
par le type `RentalTerms` plutot que d'ajouter une ligne dans un composant.

---

## ADR-004 — Duree : 24 heures minimum, 6 mois maximum

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** Aucune borne n'existait : une location de 0 jour passait, et le
total valait 0 EUR.

**Decision.** Bornes dans `src/lib/rental-rules.ts`, validees par
`checkRentalDuration()`, appelee par toute surface qui accepte des dates.

**Consequence.** Le segment longue duree (1 a 6 mois) devient un cas de premiere
classe, ce que les comparateurs generalistes servent mal. Au-dela de 6 mois, le
produit pertinent est la location longue duree (LLD), un autre metier et un
autre cadre contractuel : hors perimetre.

---

## ADR-005 — L'assurance est une surface distincte

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** L'assurance n'existait que comme trois cartes radio au milieu du
formulaire de reservation. C'est le poste le moins compris par le client et le
plus rentable pour le loueur.

**Decision.** Section dediee sur l'accueil (`InsuranceBand`) et page dediee
(`InsurancePage`, `currentPage === 'insurance'`), qui expliquent franchise,
caution et carte de credit exigee. La fiche vehicule ne garde que le choix
d'option, avec un lien vers la page.

**Consequence.** Le tunnel de reservation reste court. L'explication est
consultable sans engager une reservation.

**Contrainte legale.** Vendre de l'assurance en son nom exige une
immatriculation ORIAS (environ 975 a 1 575 EUR la premiere annee). Les formules
sont donc presentees comme des produits des loueurs partenaires. Le texte du bas
de la page assurance le dit explicitement et ne doit pas etre retire.

---

## ADR-006 — Pas de location entre particuliers pour l'instant

**Date** : 2026-08 · **Statut** : rejete pour l'instant

**Contexte.** Idee proposee : laisser les particuliers mettre leur voiture en
location. Strategiquement solide, puisque cela contourne le blocage d'acces aux
donnees des loueurs.

**Decision.** Reporte.

**Raison.** Une police auto francaise de particulier ne couvre pas la location
remuneree, et l'assureur peut refuser la prise en charge. Deux voies legales
seulement : une police maitresse de plateforme (Getaround et Turo passent par
AXA) ou un assureur specialise (Wilov, porte par Suravenir). Les deux exigent un
contrat d'assurance d'entreprise avant la premiere mise en relation.

**Etape intermediaire retenue.** Agreger les annonces Getaround et Turo, et
ouvrir une page « Louez votre voiture » en liste d'attente pour mesurer la
demande avant d'engager des frais d'assurance.

---

## ADR-007 — Direction visuelle : affiche de voyage

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** La page d'accueil ressemblait au defaut de la categorie : carte
blanche flottante sur un degrade vert. L'oppose previsible (fond sombre plus
accent neon) est le meme defaut sous une autre forme.

**Decision.** Affiche de voyage francaise : aplats francs, formes a bord net,
titres larges, photos reelles. Tokens figes dans `docs/DESIGN-SYSTEM.md`.

**Consequence.** Les ecrans encore en `emerald-*` et `gray-*` detonnent tant
qu'ils n'ont pas ete repris. C'est de la dette identifiee, pas un choix.

---

## ADR-008 — Couvrir toute la France, pas quinze villes

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** La recherche ne connaissait que 15 lieux. Taper « tou » proposait
Toulouse mais pas **Tours** ; l'Indre-et-Loire, les chateaux de la Loire et la
quasi-totalite du pays n'existaient pas. Pour un site qui promet « toute la
France », c'est le defaut le plus visible possible.

**Decision.** Un jeu de 485 lieux genere par script : 18 regions, 101
departements, 253 villes, 53 aeroports, 60 gares. Recherche insensible aux
accents et aux tirets, avec classement par pertinence puis par importance.

**Consequence.** 485 lieux ne peuvent pas avoir 485 catalogues ecrits a la main.
`src/lib/fleet.ts` derive la flotte d'un lieu de facon deterministe, avec deux
effets vrais dans la realite : surcout aeroport de 18 %, et moins de choix dans
une petite ville. C'est de la demonstration, mais coherente et stable.

---

## ADR-009 — Rythme de couleurs sur l'accueil

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** La palette compte six teintes, mais les six premieres sections
n'utilisaient que vert et creme en alternance ; le bleu et la terracotta
n'apparaissaient qu'en bas de page. Resultat : une page qui parait monotone
alors que le systeme de couleurs ne l'est pas.

**Decision.** Une sequence de dix fonds documentee dans
`docs/DESIGN-SYSTEM.md`, section 4. Regle : jamais deux sections voisines dans
la meme famille, alternance sombre / clair conservee.

**Consequence.** Ajouter une section demande de choisir sa place dans la
sequence, pas seulement son contenu.

---

## ADR-010 — Les obligations legales de la vente sont dans le produit, pas dans une page d'aide

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** Le formulaire de depot d'annonce demandait onze champs et aucune
photo. Un particulier qui remplissait ce formulaire n'avait aucun moyen de
savoir qu'il lui manquait un controle technique de moins de 6 mois, un
certificat de situation de moins de 15 jours et un Cerfa en deux exemplaires.
Il publiait une annonce, trouvait un acheteur, et la vente s'arretait au moment
de signer.

**Decision.** Le formulaire porte les obligations : photos (3 minimum),
identite complete du vehicule (mise en circulation, VIN, Crit'Air, CO2,
puissance fiscale), etat et historique a declarer (kilometrage garanti, import,
sinistre), et une liste de documents ou chaque ligne indique si elle est
obligatoire **pour ce vehicule** et pourquoi. `validateListing()` refuse la
publication tant qu'il manque un document obligatoire.

L'annonce publiee affiche ensuite ce que le vendeur a declare pouvoir fournir,
et signale en rouge ce qui manque.

**Consequence.** Le formulaire est plus long qu'un formulaire de petites
annonces classique. C'est assume : une annonce qui ne peut pas aboutir a une
vente ne vaut rien, ni pour le vendeur ni pour l'acheteur. C'est aussi la
difference que Roulez peut revendiquer face a une place de marche generaliste.

**A verifier avant la mise en production.** Les regles ci-dessus refletent l'etat
du droit consulte le 27 aout 2026 (Cerfa 15776*02, declaration ANTS sous 15
jours sous peine de 135 EUR, controle technique de moins de 6 mois au-dela de 4
ans, certificat de situation de moins de 15 jours). Elles doivent etre revues
par un juriste avant toute mise en ligne commerciale.

---

## ADR-011 — Bilingue FR/EN par dictionnaire, pas par traduction automatique

**Date** : 2026-08-27 · **Statut** : accepte

**Contexte.** Le site est en francais. La traduction automatique de Chrome
cassait l'hydratation React (elle reecrit les noeuds de texte sous les pieds du
framework), ce qui avait deja mis le site hors ligne ; d'ou le `translate="no"`
pose dans `layout.tsx`. Consequence : plus personne ne pouvait lire le site dans
une autre langue, y compris son auteur.

**Decision.** Un vrai systeme bilingue interne. Deux dictionnaires typables,
`en.ts` declare `: Dict` pour que TypeScript refuse une cle manquante, un
selecteur FR/EN dans la barre de navigation, le choix conserve dans
`localStorage`, et la langue du navigateur comme valeur par defaut.

**Consequence.** `translate="no"` reste en place et n'est plus un probleme. Le
cout est reel : toute nouvelle chaine doit etre ajoutee dans deux fichiers, et
les modules de `lib/` ne peuvent plus contenir de phrases — ils renvoient des
codes. En echange, l'anglais devient un vrai marche : une part importante des
locations de vacances en France est reservee par des visiteurs etrangers.

**Non retenu.** Router par URL (`/fr/...`, `/en/...`) avec `next-intl`. C'est la
bonne cible, mais elle suppose d'abord la migration vers de vraies URL
(ADR-001) ; faire les deux en meme temps aurait double le risque.

---

## ADR-012 — Deux teintes sur l'accueil, pas six

**Date** : 2026-08-28 · **Statut** : accepte

**Contexte.** ADR-009 avait reparti six teintes sur dix sections pour casser la
monotonie vert / creme. Le probleme s'est inverse : safran vif, terracotta et
azur en aplats pleins donnaient une page bruyante la ou le produit doit inspirer
confiance sur des sommes d'argent.

**Decision.** L'accueil n'emploie plus que le vert petrol et l'encre sur papier.
Le safran devient un accent ponctuel et n'est jamais un fond. Terra et azur
quittent l'accueil ; ils restent definis pour la page assurance et les etats
d'erreur.

Egalement retire : la barre safran de 2px sur la section vehicules, qui etait un
bord colore epais sur une carte — un des reperes les plus surs d'une interface
non dessinee.

**Consequence.** Moins d'occasions de se tromper, et une page qui ressemble a un
service financier plutot qu'a une brochure. Le cout est une page moins
immediatement gaie ; c'est le bon echange pour un produit ou l'utilisateur
compare des cautions de 2 500 EUR.

**Photos du heros.** Les trois cartes postales de villes sont remplacees par
trois vehicules — berline, SUV, electrique. Le sujet du produit est la voiture,
pas la destination.
