'use client';

import { create } from 'zustand';
import { useEffect } from 'react';
import { fr } from './fr';
import { en } from './en';
import { type Dict, type Locale, LOCALES, fmt } from './types';

export { fmt, LOCALES };
export type { Dict, Locale };

const DICTS: Record<Locale, Dict> = { fr, en };
const STORAGE_KEY = 'roulez.locale';

interface LocaleStore {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

/**
 * Le serveur rend toujours en francais : lire localStorage pendant le rendu
 * casserait l'hydratation React. `LocaleBoot` applique le choix stocke juste
 * apres le montage.
 */
export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'fr',
  setLocale: (locale) => {
    set({ locale });
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
      document.documentElement.lang = locale;
    } catch {
      // navigation privee, stockage refuse : on garde juste la langue en memoire
    }
  },
}));

export function useLocale(): Locale {
  return useLocaleStore((s) => s.locale);
}

/** Le dictionnaire courant. Typé : `d.hero.search`, pas de cle magique. */
export function useDict(): Dict {
  return DICTS[useLocaleStore((s) => s.locale)];
}

/** Version hors composant, pour les rares appels imperatifs (toasts). */
export function dictOf(locale: Locale): Dict {
  return DICTS[locale];
}

/** Monte une fois dans le layout client pour restaurer le choix de langue. */
export function LocaleBoot() {
  const setLocale = useLocaleStore((s) => s.setLocale);
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === 'fr' || stored === 'en') {
      setLocale(stored);
      return;
    }
    // Pas de choix enregistre : on suit la langue du navigateur.
    const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'fr';
    setLocale(nav.startsWith('fr') ? 'fr' : 'en');
  }, [setLocale]);
  return null;
}

/* ---------- formatage dependant de la langue ---------- */

const NUMBER_LOCALE: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB' };

export function useFormat() {
  const locale = useLocale();
  const d = useDict();
  const tag = NUMBER_LOCALE[locale];

  return {
    /** 1 250 EUR en francais, 1,250 EUR en anglais. */
    euro: (n: number) => `${Math.round(n).toLocaleString(tag)} EUR`,
    number: (n: number) => n.toLocaleString(tag),
    /** "3 jours" / "3 days", "6 mois et 2 jours" / "6 months and 2 days". */
    duration: (days: number) => {
      if (days <= 0) return '';
      if (days < 31) return `${days} ${days > 1 ? d.common.days : d.common.day}`;
      const months = Math.floor(days / 30);
      const rest = days % 30;
      const m = `${months} ${locale === 'fr' ? d.common.month : months > 1 ? 'months' : 'month'}`;
      if (rest === 0) return m;
      return `${m} ${d.common.and} ${rest} ${rest > 1 ? d.common.days : d.common.day}`;
    },
  };
}
