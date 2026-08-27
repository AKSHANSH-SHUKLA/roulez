/**
 * Conditions commerciales d'une offre de location — SOURCE UNIQUE.
 *
 * Le prix affiche, la caution, la franchise, la politique carburant, le
 * kilometrage, l'annulation, la note du loueur et les cartes acceptees sont
 * TOUS derives ici. Aucun composant ne doit recalculer ou coder en dur une de
 * ces valeurs : sinon la fiche vehicule et la liste de resultats finissent par
 * afficher deux chiffres differents pour la meme offre.
 *
 * Donnees de demonstration pour l'instant. Quand un vrai flux fournisseur
 * arrivera (affiliation ou API), seule l'implementation de `termsFor` change ;
 * les composants restent identiques.
 */

import type { RentalCar } from './types';

export type FuelPolicy = 'plein-plein' | 'identique' | 'plein-vide';

/** Cle de dictionnaire pour chaque politique carburant. */
export const fuelPolicyKey: Record<FuelPolicy, 'fullFull' | 'same' | 'fullEmpty'> = {
  'plein-plein': 'fullFull',
  identique: 'same',
  'plein-vide': 'fullEmpty',
};

export interface SupplierProfile {
  name: string;
  rating: number;
  reviews: number;
  acceptsDebitCard: boolean;
  freeCancellation: boolean;
  cancellationHours: number;
  fuelPolicy: FuelPolicy;
  kmPerDay: number | null; // null = kilometrage illimite
}

/** Registre des loueurs. Ajouter un loueur = ajouter une ligne ici, rien d'autre. */
export const SUPPLIERS: Record<string, SupplierProfile> = {
  Hertz: { name: 'Hertz', rating: 4.3, reviews: 12480, acceptsDebitCard: false, freeCancellation: true, cancellationHours: 48, fuelPolicy: 'plein-plein', kmPerDay: null },
  Europcar: { name: 'Europcar', rating: 4.1, reviews: 9870, acceptsDebitCard: true, freeCancellation: true, cancellationHours: 48, fuelPolicy: 'plein-plein', kmPerDay: null },
  Sixt: { name: 'Sixt', rating: 4.4, reviews: 15230, acceptsDebitCard: false, freeCancellation: true, cancellationHours: 24, fuelPolicy: 'plein-plein', kmPerDay: null },
  Avis: { name: 'Avis', rating: 4.2, reviews: 8640, acceptsDebitCard: true, freeCancellation: true, cancellationHours: 48, fuelPolicy: 'plein-plein', kmPerDay: null },
  Enterprise: { name: 'Enterprise', rating: 4.6, reviews: 11090, acceptsDebitCard: true, freeCancellation: true, cancellationHours: 24, fuelPolicy: 'plein-plein', kmPerDay: null },
  Budget: { name: 'Budget', rating: 3.9, reviews: 6210, acceptsDebitCard: true, freeCancellation: false, cancellationHours: 0, fuelPolicy: 'identique', kmPerDay: 250 },
  National: { name: 'National', rating: 4.0, reviews: 4380, acceptsDebitCard: false, freeCancellation: true, cancellationHours: 48, fuelPolicy: 'plein-plein', kmPerDay: null },
  Alamo: { name: 'Alamo', rating: 4.2, reviews: 5720, acceptsDebitCard: true, freeCancellation: true, cancellationHours: 48, fuelPolicy: 'plein-plein', kmPerDay: null },
  Thrifty: { name: 'Thrifty', rating: 3.7, reviews: 3940, acceptsDebitCard: true, freeCancellation: false, cancellationHours: 0, fuelPolicy: 'plein-vide', kmPerDay: 200 },
  'Rent-A-Car': { name: 'Rent-A-Car', rating: 3.8, reviews: 7150, acceptsDebitCard: true, freeCancellation: true, cancellationHours: 24, fuelPolicy: 'identique', kmPerDay: 300 },
};

const FALLBACK_SUPPLIER: SupplierProfile = {
  name: 'Loueur partenaire', rating: 4.0, reviews: 1200, acceptsDebitCard: true,
  freeCancellation: true, cancellationHours: 48, fuelPolicy: 'plein-plein', kmPerDay: null,
};

/** Caution (bloquee sur la carte) et franchise (reste a charge en cas de dommage). */
const DEPOSIT_BY_CATEGORY: Record<string, { deposit: number; excess: number }> = {
  economy: { deposit: 800, excess: 900 },
  compact: { deposit: 1000, excess: 1100 },
  suv: { deposit: 1500, excess: 1600 },
  luxury: { deposit: 2500, excess: 2600 },
  van: { deposit: 1800, excess: 1900 },
  electric: { deposit: 1200, excess: 1300 },
};

export interface RentalTerms {
  supplier: SupplierProfile;
  deposit: number;
  excess: number;
  freeCancellation: boolean;
  cancellationHours: number;
  rating: number;
  reviews: number;
  acceptsCreditCard: boolean; // toujours vrai chez tous nos partenaires
  acceptsDebitCard: boolean;
  fuelPolicy: FuelPolicy;
  unlimitedMileage: boolean;
  kmPerDay: number | null;
}

export function supplierProfile(name: string): SupplierProfile {
  return SUPPLIERS[name] ?? FALLBACK_SUPPLIER;
}

export function termsFor(car: Pick<RentalCar, 'category' | 'supplierName'>): RentalTerms {
  const supplier = supplierProfile(car.supplierName);
  const money = DEPOSIT_BY_CATEGORY[car.category] ?? DEPOSIT_BY_CATEGORY.compact;
  return {
    supplier,
    deposit: money.deposit,
    excess: money.excess,
    freeCancellation: supplier.freeCancellation,
    cancellationHours: supplier.cancellationHours,
    rating: supplier.rating,
    reviews: supplier.reviews,
    acceptsCreditCard: true,
    acceptsDebitCard: supplier.acceptsDebitCard,
    fuelPolicy: supplier.fuelPolicy,
    unlimitedMileage: supplier.kmPerDay === null,
    kmPerDay: supplier.kmPerDay,
  };
}

export interface Quote {
  days: number;
  perDay: number;
  carTotal: number;
  insuranceTotal: number;
  total: number;
}

/** Le seul endroit ou un total de location est calcule. */
export function quoteFor(pricePerDay: number, days: number, insurancePerDay = 0): Quote {
  const d = Math.max(0, Math.floor(days));
  const carTotal = pricePerDay * d;
  const insuranceTotal = insurancePerDay * d;
  return { days: d, perDay: pricePerDay, carTotal, insuranceTotal, total: carTotal + insuranceTotal };
}
