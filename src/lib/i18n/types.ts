/**
 * Contrat des dictionnaires. Le francais fait foi : `en.ts` doit satisfaire
 * `Dict`, donc TypeScript refuse de compiler si une cle manque en anglais.
 */
import type { fr } from './fr';

export type Dict = typeof fr;
export type Locale = 'fr' | 'en';

export const LOCALES: { id: Locale; label: string; hreflang: string }[] = [
  { id: 'fr', label: 'FR', hreflang: 'fr-FR' },
  { id: 'en', label: 'EN', hreflang: 'en' },
];

/** Remplace {n}, {city}... dans une chaine du dictionnaire. */
export function fmt(template: string, params: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
}
