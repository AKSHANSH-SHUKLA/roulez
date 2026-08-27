/**
 * Regles de duree de location — SOURCE UNIQUE.
 *
 * Toute surface qui propose une location (recherche, resultats, fiche vehicule,
 * futur tunnel de paiement) DOIT valider ses dates ici. Ne pas dupliquer ces
 * bornes ailleurs dans le code.
 */

export const MIN_RENTAL_DAYS = 1; // 24 heures
export const MAX_RENTAL_DAYS = 182; // 6 mois

export const DURATION_HINT = '24 heures minimum, 6 mois maximum';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Nombre de jours entiers entre deux dates ISO (yyyy-mm-dd). */
export function rentalDays(pickup: string, ret: string): number {
  if (!pickup || !ret) return 0;
  const a = new Date(`${pickup}T00:00:00`);
  const b = new Date(`${ret}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

export interface DurationCheck {
  ok: boolean;
  days: number;
  error: string | null;
}

export function checkRentalDuration(pickup: string, ret: string): DurationCheck {
  if (!pickup || !ret) {
    return { ok: false, days: 0, error: 'Choisissez une date de depart et une date de retour.' };
  }
  const days = rentalDays(pickup, ret);
  if (days < MIN_RENTAL_DAYS) {
    return { ok: false, days, error: 'La duree minimum est de 24 heures.' };
  }
  if (days > MAX_RENTAL_DAYS) {
    return { ok: false, days, error: 'La duree maximum est de 6 mois (182 jours).' };
  }
  return { ok: true, days, error: null };
}

/** "3 jours", "1 mois et 4 jours" — pour l'affichage du recapitulatif. */
export function formatDuration(days: number): string {
  if (days <= 0) return '';
  if (days < 31) return `${days} jour${days > 1 ? 's' : ''}`;
  const months = Math.floor(days / 30);
  const rest = days % 30;
  const m = `${months} mois`;
  return rest > 0 ? `${m} et ${rest} jour${rest > 1 ? 's' : ''}` : m;
}

/** Date ISO du jour + n. Utilise pour les valeurs par defaut et les bornes des inputs. */
export function isoDatePlus(n: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}
