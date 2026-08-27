'use client';

import { useState, useEffect } from 'react';
import { Menu, X, User, Car } from 'lucide-react';
import { useAppStore, useAuthStore } from '@/lib/store';

const links = [
  { label: 'Accueil', page: 'home' },
  { label: 'Location', page: 'search' },
  { label: 'Achat & Vente', page: 'buy-sell' },
  { label: 'Assurance', page: 'insurance' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentPage, setPage } = useAppStore();
  const { user, setShowAuth } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (page: string) => {
    setPage(page);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-paper/95 shadow-[0_1px_0_rgba(20,35,28,0.12)] backdrop-blur-md' : 'bg-paper'
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        <button onClick={() => go('home')} className="pressable flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-petrol-600">
            <Car size={19} className="text-paper" />
          </span>
          <span className="font-poster text-xl text-ink">Roulez</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.page}>
              <button
                onClick={() => go(l.page)}
                className={`relative rounded-[10px] px-4 py-2 text-[15px] font-semibold transition-colors duration-200 ${
                  currentPage === l.page ? 'text-petrol-600' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {l.label}
                {currentPage === l.page && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-[3px] rounded-full bg-saffron-500" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <span className="hidden items-center gap-2 rounded-full bg-petrol-50 px-4 py-2 text-sm font-semibold text-petrol-700 md:flex">
              <User size={15} />
              {user.name}
            </span>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="pressable hidden items-center gap-2 rounded-[10px] bg-ink px-5 py-2.5 text-sm font-bold text-paper transition-colors duration-200 hover:bg-petrol-700 md:flex"
            >
              <User size={15} />
              Connexion
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="pressable flex h-11 w-11 items-center justify-center rounded-[10px] text-ink md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-6 pb-5 pt-2 md:hidden">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`block w-full rounded-[10px] px-3 py-3.5 text-left text-base font-semibold ${
                currentPage === l.page ? 'bg-petrol-50 text-petrol-700' : 'text-ink-2'
              }`}
            >
              {l.label}
            </button>
          ))}
          {user ? (
            <span className="mt-2 block rounded-[10px] bg-petrol-50 px-3 py-3.5 text-base font-semibold text-petrol-700">
              {user.name}
            </span>
          ) : (
            <button
              onClick={() => {
                setShowAuth(true);
                setOpen(false);
              }}
              className="pressable mt-3 w-full rounded-[10px] bg-ink px-3 py-3.5 text-base font-bold text-paper"
            >
              Connexion
            </button>
          )}
        </div>
      )}
    </header>
  );
}
