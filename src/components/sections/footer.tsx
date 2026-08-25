'use client';

import { Car } from 'lucide-react';

const columns = [
  {
    title: 'Location',
    items: ['Rechercher une voiture', 'Destinations populaires', 'Assurance location', 'Guide de location'],
  },
  {
    title: 'Achat & Vente',
    items: ['Voitures a vendre', 'Vendre sa voiture', "Conseils d'achat", 'Financement'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-10 text-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-saffron-500">
                <Car size={19} className="text-ink" />
              </span>
              <span className="font-poster text-xl">Roulez</span>
            </div>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-paper/65">
              Comparez les prix de location de voitures en France, reservez en quelques clics
              et roulez en toute serenite.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h3 className="label-tight text-[11px] text-saffron-500">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[15px] text-paper/70 transition-colors duration-200 hover:text-paper">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h3 className="label-tight text-[11px] text-saffron-500">Infos</h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'Nous contacter', href: '#' },
                { label: 'FAQ', href: '#' },
                { label: 'Conditions generales', href: '#' },
                { label: 'Confidentialite', href: '#' },
                { label: 'Credits photos', href: '/credits' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[15px] text-paper/70 transition-colors duration-200 hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-7">
          <p className="text-sm text-paper/55">&copy; 2026 Roulez. Tous droits reserves.</p>
          <p className="text-sm text-paper/55">TVA incluse &middot; France</p>
        </div>
      </div>
    </footer>
  );
}
