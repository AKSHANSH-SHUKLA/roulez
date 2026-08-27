@AGENTS.md

# Roulez — regles de travail

Comparateur de location de voitures en France, plus achat/vente d'occasion et
une section assurance. Marche cible : la France uniquement. Langue de
l'interface : francais.

**Lisez ce fichier en entier avant de modifier quoi que ce soit.** Il existe
parce que l'architecture a deja ete refaite plusieurs fois ; ce qui suit est
fige et ne doit pas etre "ameliore" au passage d'une autre tache.

Documents lies :
- `docs/PRD.md` — ce que le produit doit faire et pour qui
- `docs/ARCHITECTURE.md` — structure du code et flux de donnees
- `docs/DESIGN-SYSTEM.md` — couleurs, typo, espacements, motion
- `docs/DECISIONS.md` — journal des decisions (ADR). Toute deviation aux regles ci-dessous exige une nouvelle entree.
- `docs/PROGRESS.md` — etat reel : fait / pas fait / prochaine etape

---

## 1. Invariants — ne pas casser

Ces regles ne se discutent pas dans le cadre d'une tache de style ou de
correction de bug. Les changer demande une entree dans `docs/DECISIONS.md`.

1. **Un seul endroit calcule un prix.** `quoteFor()` dans
   `src/lib/rental-terms.ts`. Aucun composant ne multiplie un prix par un
   nombre de jours lui-meme.
2. **Un seul endroit produit les conditions commerciales.** `termsFor()` dans
   `src/lib/rental-terms.ts` : caution, franchise, annulation, note du loueur,
   cartes acceptees, politique carburant, kilometrage. Un composant qui code en
   dur une de ces valeurs est un bug, meme s'il affiche le bon chiffre.
3. **Un seul endroit valide la duree.** `checkRentalDuration()` dans
   `src/lib/rental-rules.ts`. Minimum 24 heures, maximum 6 mois (182 jours).
   Toute surface qui accepte des dates de location appelle cette fonction.
4. **Les reponses d'API ont la forme `{ success, data }`.** Cote client,
   toujours lire avec `const list = Array.isArray(json) ? json : (json?.data ?? [])`.
   Ne jamais faire `setState(await res.json())` : c'est ce qui a mis le site
   hors ligne une fois (`destinations.map is not a function`), et TypeScript ne
   l'attrape pas parce que `res.json()` est `any`.
5. **Trois activites, trois surfaces distinctes.** Location, Achat & Vente,
   Assurance. L'assurance ne se dilue pas dans le tunnel de location : elle a sa
   propre page (`currentPage === 'insurance'`) et sa propre section sur
   l'accueil. La fiche vehicule ne garde qu'un choix d'option et un lien vers la
   page assurance.
6. **Aucun prix, aucune condition, aucune note n'est inventee dans le JSX.**
   Les donnees viennent des routes `/api/*` ou du registre `SUPPLIERS`.
7. **Palette et typo figees** — voir `docs/DESIGN-SYSTEM.md`. Pas de classes
   `emerald-*`, `gray-*`, `blue-*` ni de `font-[Inter]` : ce sont les restes de
   l'ancienne version et ils doivent disparaitre, pas se propager.
8. **Roulez est un comparateur, pas un loueur ni un courtier.** Aucun texte de
   l'interface ne doit laisser croire que Roulez assure, loue ou encaisse. Voir
   `docs/PRD.md`, section contraintes legales.

## 2. Ou vit quoi

```
src/
  app/
    api/*/route.ts       donnees de demonstration + filtres. Renvoient { success, data }.
    page.tsx             ROUTEUR. Un switch sur useAppStore().currentPage.
    layout.tsx           police, metadonnees, garde anti-traduction Chrome
    globals.css          tokens Tailwind v4 (@theme) + utilitaires maison
    error.tsx            garde-fou : un crash de composant ne blanchit pas le site
  components/
    sections/*.tsx       une section ou une page complete par fichier
    ui/terms.tsx         affichage des conditions commerciales (ne calcule rien)
    motion/tilt.tsx      primitives Tilt et Reveal
  lib/
    types.ts             modeles de donnees
    store.ts             etat global Zustand (3 stores)
    rental-rules.ts      duree : bornes, calcul, validation, formatage
    rental-terms.ts      loueurs, conditions commerciales, devis
```

## 3. Navigation

Il n'y a **pas** de routage Next par URL pour les ecrans produit. Tout passe par
`useAppStore().currentPage` et le `switch` de `src/app/page.tsx`. Valeurs
valides : `home`, `search`, `car-detail`, `buy-sell`, `listing-detail`,
`insurance`.

Ajouter un ecran = ajouter une valeur au switch **et** documenter la valeur ici.
Ne pas introduire `next/navigation` sans une entree dans `docs/DECISIONS.md` :
la migration vers de vraies URL est prevue, mais en une fois, pas ecran par
ecran (voir `docs/PROGRESS.md`).

## 4. Avant de livrer

```bash
npx tsc --noEmit          # doit passer
npx next build            # doit passer
```

Puis, sur le build de production, verifier au navigateur :
- zero erreur JS dans la console ;
- `document.documentElement.scrollWidth === clientWidth` en 1400px **et** en 390px
  (un debordement horizontal decale toute la page, c'est deja arrive avec le
  pied de page) ;
- le parcours accueil → recherche → fiche vehicule → assurance fonctionne ;
- les bornes de duree renvoient bien une erreur a 0 jour et a 200 jours.

Une capture plein page ne suffit pas a valider les sections animees : elles
apparaissent au defilement (`whileInView`). Il faut faire defiler la page avant
de capturer, sinon tout parait vide.

## 5. Style de code

- TypeScript strict, pas de `any` sauf frontiere d'API deja typee ensuite.
- Composants clients : `'use client'` en premiere ligne des fichiers de
  `components/`.
- Textes d'interface en francais. Les accents passent mal dans certaines
  chaines existantes : rester coherent avec le fichier qu'on modifie plutot que
  de melanger les deux conventions dans un meme ecran.
- Les commentaires expliquent **pourquoi**, pas **quoi**.
- Pas de dependance nouvelle sans entree dans `docs/DECISIONS.md`.

## 6. Ce qui est encore de la demonstration

A ne pas presenter comme fonctionnel : voir `docs/PROGRESS.md`. En resume, les
donnees des loueurs, les conditions commerciales et les reservations sont
simulees en memoire. Aucun paiement, aucune base de donnees, aucune API
fournisseur reelle.
