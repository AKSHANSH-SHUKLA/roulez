'use client';

import { useEffect } from 'react';

/**
 * Filet de sécurité : si un composant plante, on affiche cet écran
 * au lieu de laisser toute la page devenir blanche / inutilisable.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Roulez] Erreur non gérée :', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4" aria-hidden="true">🚗</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oups, un problème est survenu
        </h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu afficher cette page. Réessayez, ou revenez à
          l&apos;accueil.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
