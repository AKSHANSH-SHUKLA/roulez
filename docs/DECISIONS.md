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
