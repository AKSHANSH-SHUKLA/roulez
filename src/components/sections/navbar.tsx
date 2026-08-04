'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useAuthStore } from '@/lib/store';

const navLinks = [
  { label: 'Accueil', page: 'home' },
  { label: 'Location', page: 'search' },
  { label: 'Achat & Vente', page: 'buy-sell' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentPage, setPage } = useAppStore();
  const { user, setShowAuth } = useAuthStore();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNav = (page: string) => {
    setPage(page);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <button
            onClick={() => handleNav('home')}
            className="text-xl font-bold text-emerald-600 font-[Inter]"
          >
            Roulez
          </button>

          {/* Center: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`text-sm font-medium transition-colors font-[Inter] ${
                  currentPage === link.page
                    ? 'text-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Auth button (desktop) */}
          <div className="hidden md:block">
            {user ? (
              <span className="text-sm font-medium text-gray-700 font-[Inter]">
                {user.name}
              </span>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors font-[Inter]"
              >
                Se Connecter
              </button>
            )}
          </div>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-700 hover:text-gray-900"
                aria-label="Fermer le menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`text-left text-base font-medium font-[Inter] ${
                    currentPage === link.page
                      ? 'text-emerald-600'
                      : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <hr className="border-gray-200" />
              {user ? (
                <span className="text-sm font-medium text-gray-700 font-[Inter]">
                  {user.name}
                </span>
              ) : (
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setMobileOpen(false);
                  }}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors font-[Inter] w-fit"
                >
                  Se Connecter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
