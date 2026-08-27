/**
 * Disponibilite par lieu — SOURCE UNIQUE.
 *
 * Roulez couvre toute la France, mais une agence de Rocamadour n'a pas la meme
 * flotte qu'un comptoir de Roissy. Plutot que d'inventer 485 catalogues, on
 * derive la flotte d'un lieu a partir du catalogue de reference, de facon
 * DETERMINISTE : le meme lieu renvoie toujours les memes vehicules aux memes
 * prix, d'un chargement de page a l'autre.
 *
 * Deux effets, tous deux vrais dans la vraie vie :
 *  - un aeroport coute plus cher (frais d'aeroport repercutes sur le tarif) ;
 *  - une petite ville propose moins de vehicules qu'une metropole.
 *
 * Quand un vrai flux fournisseur arrivera, ce fichier disparait : il est
 * remplace par la disponibilite reelle. Rien d'autre ne bouge.
 */

import type { RentalCar } from './types';
import type { FrLocation, FrLocationType } from './locations';

/** djb2 — petit hachage stable, juste pour ordonner sans hasard. */
function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

const PRICE_MULTIPLIER: Record<FrLocationType, number> = {
  airport: 1.18,
  train_station: 1.08,
  city: 1,
  department: 0.98,
  region: 0.98,
};

/** Part du catalogue disponible selon la taille de la ville. */
const COVERAGE: Record<1 | 2 | 3, number> = { 1: 1, 2: 0.65, 3: 0.38 };

export function fleetAt(cars: RentalCar[], loc: FrLocation): RentalCar[] {
  const multiplier = PRICE_MULTIPLIER[loc.type];
  const size = Math.max(6, Math.round(cars.length * COVERAGE[loc.importance]));

  return cars
    .map((car) => ({ car, key: hash(`${car.id}|${loc.id}`) }))
    .sort((a, b) => a.key - b.key)
    .slice(0, size)
    .map(({ car }) => ({
      ...car,
      locationId: loc.id,
      pricePerDay: Math.max(15, Math.round(car.pricePerDay * multiplier)),
    }))
    .sort((a, b) => a.pricePerDay - b.pricePerDay);
}
