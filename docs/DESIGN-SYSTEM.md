# Design system

Derniere mise a jour : 2026-08-27

Direction : **affiche de voyage francaise** (PLM, Riviera). Aplats de couleur
francs, formes a bord net, typographie de titre large. Pas de degrade violet,
pas de carte blanche flottante sur fond gris.

Les tokens vivent dans `src/app/globals.css`, bloc `@theme`. Tailwind les expose
en classes. **Ne pas ecrire de couleur en dur dans un composant.**

## 1. Couleurs

| Role | Token | Valeur |
| --- | --- | --- |
| Fond principal | `paper` | `#faf5ec` |
| Fond secondaire | `paper-2` | `#f3ead9` |
| Texte principal | `ink` | `#14231c` |
| Texte secondaire | `ink-2` | `#3d5148` |
| Marque, action | `petrol-500/600/700` | `#12775f` / `#0e6350` / `#0b4f41` |
| Accent, mise en avant | `saffron-300/500/700` | `#f5cd86` / `#e9a63c` / `#b8791d` |
| Alerte, erreur, temoignages | `terra-300/500/700` | `#e79b83` / `#ce5638` / `#9c3a22` |
| Assurance, bandeau secondaire | `azure-300/500/700` | `#8ec0e0` / `#2f72a8` / `#1d4d76` |

Regles :

- Une couleur = un role. L'azur appartient a l'assurance ; ne pas s'en servir
  comme couleur d'action ailleurs.
- Le petrol porte l'action principale partout. Un bouton de validation n'est
  jamais saffron sauf sur fond sombre (contraste).
- Pas de `emerald-*`, `gray-*`, `blue-*`, `slate-*` : ce sont les restes de
  l'ancienne version.
- Jamais de gris sur fond colore : derivez le texte secondaire de la teinte du
  fond (`text-paper/80` sur petrol, pas `text-gray-400`).

## 2. Typographie

Archivo variable, axe `wdth`, chargee par `next/font/google` dans `layout.tsx`.

| Usage | Classe | Note |
| --- | --- | --- |
| Titre d'affiche | `font-poster` | `wdth: 112`, interlignage serre |
| Titre secondaire | `font-poster-md` | `wdth: 108` |
| Etiquette | `label-tight` | majuscules, interlettrage ouvert, 10 a 11px |
| Chiffres | `nums` | `tabular-nums` — **obligatoire** sur tout prix, note, kilometrage |

Tailles de titre : `text-[clamp(...)]`, jamais une valeur fixe. Corps de texte
a 15 ou 16px, jamais en dessous de 12px pour une information lisible.

## 3. Formes et espacements

- Rayons : `20px` (cartes, panneaux), `12px` (champs, boutons), `10px` (petits
  boutons), `8px`. Un seul jeu, pas de valeur intermediaire improvisee.
- Sections : `py-24` sur mobile, `md:py-32` sur grand ecran.
- Conteneur : `max-w-[1400px]`, `px-6 md:px-10`.
- Elevation : ombre **ou** bordure, jamais les deux sur le meme element.

## 4. Motion

Reglages dans `globals.css` et `components/motion/tilt.tsx`.

- Courbe d'entree et de sortie : `cubic-bezier(0.23, 1, 0.32, 1)`.
- Interaction d'interface : moins de 300 ms. `pressable` fait `scale(0.97)` en
  160 ms sur `:active`.
- `Reveal` : apparition au defilement, `once: true`, 620 ms. Ne pas empiler un
  `Reveal` sur chaque element d'une liste deja animee.
- `Tilt` : inclinaison 3D au pointeur, **desactivee** hors
  `(hover: hover) and (pointer: fine)` et sous `prefers-reduced-motion`.
- Un bloc `@media (prefers-reduced-motion: reduce)` neutralise les
  deplacements. Toute nouvelle animation doit y etre couverte dans le meme
  commit, pas dans une passe ulterieure.
- Seules `transform` et `opacity` sont animees. Pas de `transition: all`.

## 5. Pieges deja rencontres

- **Debordement horizontal.** Une colonne de pied de page en `md:col-span-1`
  avec `whitespace-nowrap` a decale toute la page de 35px. Verifier
  `scrollWidth === clientWidth` en 1400px et en 390px avant de livrer.
- **Sections vides a la capture.** `whileInView` ne se declenche pas sur une
  capture plein page sans defilement. Faire defiler avant de capturer.
- **Enfant flex dimensionne par l'image.** `min-w-[280px]` sur un enfant flex
  laisse l'image imposer sa largeur intrinseque. Utiliser `w-[280px] flex-none`.
- **Traduction automatique de Chrome.** Elle cassait l'hydratation React ; d'ou
  `translate="no"` et `<meta name="google" content="notranslate">` dans
  `layout.tsx`. Ne pas les retirer.
