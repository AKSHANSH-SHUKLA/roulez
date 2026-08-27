/**
 * Regles de duree de location — SOURCE UNIQUE.
 *
 * Toute surface qui propose une location (recherche, resultats, fiche vehicule,
 * futur tunnel de paiement) DOIT valider ses dates ici. Ne pas dupliquer ces
 * bornes ailleurs dans le code.
 */

export const MIN_RENTAL_DAYS = 1; // 24 heures
export const MAX_RENTAL_DAYS = 182; // 6 mois

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Nombre de jours entiers entre deux dates ISO (yyyy-mm-dd). */
export function rentalDays(pickup: string, ret: string): number {
  if (!pickup || !ret) return 0;
  const a = new Date(`${pickup}T00:00:00`);
  const b = new Date(`${ret}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

/** Code d'erreur, pas un message : la traduction vit dans src/lib/i18n. */
export type DurationError = 'missingDates' | 'tooShort' | 'tooLong';

export interface DurationCheck {
  ok: boolean;
  days: number;
  error: DurationError | null;
}

export function checkRentalDuration(pickup: string, ret: string): DurationCheck {
  if (!pickup || !ret) return { ok: false, days: 0, error: 'missingDates' };
  const days = rentalDays(pickup, ret);
  if (days < MIN_RENTAL_DAYS) return { ok: false, days, error: 'tooShort' };
  if (days > MAX_RENTAL_DAYS) return { ok: false, days, error: 'tooLong' };
  return { ok: true, days, error: null };
}


/** Date ISO du jour + n. Utilise pour les valeurs par defaut et les bornes des inputs. */
export function isoDatePlus(n: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}
