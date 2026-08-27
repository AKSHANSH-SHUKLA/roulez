'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search, MapPin, Calendar, ShieldCheck, Ban, Clock3, AlertCircle, Car, Tag,
  Plane, TrainFront, Building2, Map,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt, useCalm } from '@/components/motion/tilt';
import { useAppStore, useBookingStore } from '@/lib/store';
import { checkRentalDuration, DURATION_HINT, formatDuration, isoDatePlus } from '@/lib/rental-rules';
import type { Location, RentalCar } from '@/lib/types';

const popularCities = ['Paris', 'Nice', 'Lyon', 'Bordeaux', 'Marseille', 'Toulouse'];

type Mode = 'louer' | 'acheter' | 'vendre';

const modes: { id: Mode; label: string }[] = [
  { id: 'louer', label: 'Louer' },
  { id: 'acheter', label: 'Acheter' },
  { id: 'vendre', label: 'Vendre' },
];

const headlines: Record<Mode, { title: string; sub: string }> = {
  louer: {
    title: 'Toute la France en voiture',
    sub: 'Comparez les prix de plus de 10 loueurs. Total, caution et franchise affiches avant de reserver.',
  },
  acheter: {
    title: 'Votre prochaine voiture, sans surprise',
    sub: 'Des annonces de particuliers et de professionnels partout en France, avec le kilometrage et l historique.',
  },
  vendre: {
    title: 'Vendez votre voiture au bon prix',
    sub: 'Publiez votre annonce en quelques minutes et touchez des acheteurs dans toute la France.',
  },
};

export default function HeroSearch() {
  const [mode, setMode] = useState<Mode>('louer');

  const [locationQuery, setLocationQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);

  // achat
  const [buyQuery, setBuyQuery] = useState('');
  const [buyBudget, setBuyBudget] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setPage } = useAppStore();
  const { setFilters, setSearchResults } = useBookingStore();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchLocations = useCallback(async (query: string) => {
    if (!query.trim()) {
      setLocations([]);
      setShowDropdown(false);
      return;
    }
    try {
      const res = await fetch(`/api/locations?q=${encodeURIComponent(query)}&limit=8`);
      if (res.ok) {
        const json = await res.json();
        // L'API renvoie { success, data } — on accepte aussi un tableau brut
        const list = Array.isArray(json) ? json : (json?.data ?? []);
        setLocations(list);
        setShowDropdown(list.length > 0);
      }
    } catch {
      // silently fail
    }
  }, []);

  const handleLocationChange = (value: string) => {
    setLocationQuery(value);
    setSelectedLocation('');

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchLocations(value);
    }, 300);
  };

  const selectLocation = (loc: Location) => {
    setLocationQuery(loc.name);
    setSelectedLocation(loc.id);
    setShowDropdown(false);
    setDateError(null);
  };

  const runSearch = async (locId: string) => {
    // Regle de duree : source unique dans src/lib/rental-rules.ts
    const check = checkRentalDuration(pickupDate, returnDate);
    if (!check.ok) {
      setDateError(check.error);
      return;
    }
    setDateError(null);

    setLoading(true);
    setFilters({
      pickupLocation: locationQuery.trim() || locId,
      pickupLocationId: locId,
      pickupDate,
      returnDate,
    });

    try {
      const params = new URLSearchParams();
      if (locId) params.set('pickupLocation', locId);
      params.set('pickupDate', pickupDate);
      params.set('returnDate', returnDate);

      const res = await fetch(`/api/cars?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        // L'API renvoie { success, data } — on accepte aussi un tableau brut
        const list: RentalCar[] = Array.isArray(json) ? json : (json?.data ?? []);
        setSearchResults(list);
        setPage('search');
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const locId = selectedLocation || locationQuery.trim();
    if (!locId) {
      setDateError('Indiquez un lieu de prise en charge.');
      return;
    }
    runSearch(locId);
  };

  const handlePopularCity = (city: string) => {
    setLocationQuery(city);
    setSelectedLocation('');
    runSearch(city);
  };

  const suggestionIcon = (type: Location['type']) => {
    if (type === 'airport') return Plane;
    if (type === 'train_station') return TrainFront;
    if (type === 'department' || type === 'region') return Map;
    return Building2;
  };

  // Dates par defaut : demain, retour 4 jours plus tard
  useEffect(() => {
    setPickupDate(isoDatePlus(1));
    setReturnDate(isoDatePlus(4));
  }, []);

  const duration = checkRentalDuration(pickupDate, returnDate);

  // Parallaxe. Les valeurs sont volontairement grandes : sur une plage de 700px
  // avec 120px de deplacement, personne ne voyait rien bouger. Le heros ne fait
  // qu'un ecran de haut, donc tout doit se jouer sur les 500 premiers pixels.
  const calm = useCalm();
  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, [0, 500], [0, 210]);
  const sunScale = useTransform(scrollY, [0, 500], [1, 1.25]);
  const stackY = useTransform(scrollY, [0, 500], [0, -130]);
  const fieldY = useTransform(scrollY, [0, 500], [0, 80]);
  const textY = useTransform(scrollY, [0, 500], [0, -45]);

  const field =
    'w-full rounded-[12px] border border-petrol-100 bg-paper px-3 py-3 text-base text-ink ' +
    'placeholder:text-ink-2/55 focus:outline-none focus:border-petrol-500 ' +
    'transition-[border-color] duration-200';

  const head = headlines[mode];

  return (
    <section className="relative overflow-hidden bg-petrol-700">
      {/* poster field: hard-edged shapes, no blurred blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div style={calm ? undefined : { y: fieldY }} className="absolute inset-0">
          <div className="absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-petrol-600" />
          <div className="absolute -bottom-56 left-1/4 h-[40rem] w-[40rem] rounded-full bg-petrol-900/70" />
        </motion.div>
        <div className="absolute right-0 top-0 h-full w-[38%] bg-petrol-600/45" />
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
          <path d="M0 120V64c220 34 420 34 620 0S1180 8 1440 52v68z" fill="#faf5ec" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-28 pt-20 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-36 lg:pt-24">
        {/* ---------- left: thesis + control ---------- */}
        <motion.div style={calm ? undefined : { y: textY }} className="lg:col-span-7">
          <h1 className="font-poster max-w-[13ch] text-[clamp(2.6rem,6.4vw,5.1rem)] text-paper">
            {head.title}
          </h1>

          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-petrol-100">
            {head.sub}
          </p>

          {/* control panel: anchored to the column, printed onto the field */}
          <motion.div
            initial={{ opacity: 0, transform: 'translate3d(0,28px,0)' }}
            animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 max-w-2xl rounded-[20px] bg-paper p-5 shadow-[0_24px_60px_-24px_rgba(7,47,39,0.75)] md:p-6"
          >
            {/* mode: louer / acheter / vendre */}
            <div role="tablist" aria-label="Que voulez-vous faire" className="mb-5 flex gap-1 rounded-[12px] bg-petrol-50 p-1">
              {modes.map((m) => (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={mode === m.id}
                  onClick={() => setMode(m.id)}
                  className={`pressable flex-1 rounded-[9px] px-4 py-2.5 text-[15px] font-bold transition-colors duration-200 ${
                    mode === m.id ? 'bg-petrol-600 text-paper' : 'text-petrol-700 hover:bg-petrol-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {mode === 'louer' && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* lieu */}
                  <div className="relative sm:col-span-2" ref={dropdownRef}>
                    <label htmlFor="lieu" className="label-tight mb-2 block text-[11px] text-ink-2">
                      Lieu de prise en charge
                    </label>
                    <div className="relative">
                      <MapPin size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-petrol-500" />
                      <input
                        id="lieu"
                        type="text"
                        value={locationQuery}
                        onChange={(e) => handleLocationChange(e.target.value)}
                        onFocus={() => { if (locations.length > 0) setShowDropdown(true); }}
                        onKeyDown={(e) => { if (e.key === 'Escape') setShowDropdown(false); }}
                        autoComplete="off"
                        role="combobox"
                        aria-expanded={showDropdown}
                        aria-controls="lieu-suggestions"
                        placeholder="Ville, aéroport, gare ou département"
                        className={field + ' pl-10'}
                      />
                    </div>

                    {showDropdown && locations.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, transform: 'translate3d(0,-6px,0)' }}
                        animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                        style={{ transformOrigin: 'top center' }}
                        id="lieu-suggestions"
                        role="listbox"
                        className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-[12px] border border-petrol-100 bg-paper shadow-[0_18px_40px_-18px_rgba(7,47,39,0.5)]"
                      >
                        {locations.map((loc) => {
                          const Icon = suggestionIcon(loc.type);
                          return (
                            <button
                              key={loc.id}
                              onClick={() => selectLocation(loc)}
                              className="flex w-full items-center gap-3 border-b border-petrol-50 px-4 py-3 text-left last:border-0 transition-colors duration-150 hover:bg-petrol-50"
                            >
                              <Icon size={16} className="shrink-0 text-petrol-500" />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[15px] font-semibold text-ink">{loc.name}</span>
                                <span className="block truncate text-[13px] text-ink-2">{loc.address}</span>
                              </span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>

                  {/* dates */}
                  <div>
                    <label htmlFor="debut" className="label-tight mb-2 block text-[11px] text-ink-2">Date de début</label>
                    <div className="relative">
                      <Calendar size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-petrol-500" />
                      <input
                        id="debut"
                        type="date"
                        value={pickupDate}
                        min={isoDatePlus(0)}
                        onChange={(e) => { setPickupDate(e.target.value); setDateError(null); }}
                        className={field + ' pl-10'}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="retour" className="label-tight mb-2 block text-[11px] text-ink-2">Date de retour</label>
                    <div className="relative">
                      <Calendar size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-petrol-500" />
                      <input
                        id="retour"
                        type="date"
                        value={returnDate}
                        min={pickupDate || isoDatePlus(1)}
                        onChange={(e) => { setReturnDate(e.target.value); setDateError(null); }}
                        className={field + ' pl-10'}
                      />
                    </div>
                  </div>
                </div>

                {/* duree : min 24h, max 6 mois */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                  <span className="flex items-center gap-1.5 text-ink-2">
                    <Clock3 size={14} className="text-petrol-500" />
                    {DURATION_HINT}
                  </span>
                  {duration.ok && (
                    <span className="nums font-semibold text-petrol-600">
                      Duree choisie : {formatDuration(duration.days)}
                    </span>
                  )}
                </div>

                {dateError && (
                  <p role="alert" className="mt-3 flex items-start gap-2 rounded-[10px] bg-terra-300/35 px-3 py-2.5 text-[13px] font-semibold text-terra-700">
                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                    {dateError}
                  </p>
                )}

                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="pressable mt-5 flex w-full items-center justify-center gap-2.5 rounded-[12px] bg-petrol-600 px-6 py-4 text-base font-bold text-paper hover:bg-petrol-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Search size={19} />
                  {loading ? 'Recherche en cours' : 'Rechercher'}
                </button>

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-petrol-50 pt-4">
                  <span className="label-tight mr-1 text-[11px] text-ink-2">Départs populaires</span>
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handlePopularCity(city)}
                      className="pressable rounded-full bg-petrol-50 px-3.5 py-1.5 text-sm font-semibold text-petrol-700 transition-colors duration-200 hover:bg-saffron-300 hover:text-ink"
                    >
                      {city}
                    </button>
                  ))}
                  <span className="w-full text-[12px] text-ink-2">
                    Toute la France : 101 départements, 250 villes, 53 aéroports et 60 gares.
                  </span>
                </div>
              </>
            )}

            {mode === 'acheter' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="modele" className="label-tight mb-2 block text-[11px] text-ink-2">Marque ou modele</label>
                  <div className="relative">
                    <Car size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-petrol-500" />
                    <input
                      id="modele"
                      type="text"
                      value={buyQuery}
                      onChange={(e) => setBuyQuery(e.target.value)}
                      placeholder="Peugeot 208, Renault Clio, Tesla"
                      className={field + ' pl-10'}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="budget" className="label-tight mb-2 block text-[11px] text-ink-2">Budget maximum</label>
                  <select id="budget" value={buyBudget} onChange={(e) => setBuyBudget(e.target.value)} className={field}>
                    <option value="">Tous les budgets</option>
                    <option value="10000">Jusqu a 10 000 EUR</option>
                    <option value="20000">Jusqu a 20 000 EUR</option>
                    <option value="30000">Jusqu a 30 000 EUR</option>
                    <option value="50000">Jusqu a 50 000 EUR</option>
                  </select>
                </div>
                <button
                  onClick={() => { useAppStore.getState().setSearchQuery(buyQuery); setPage('buy-sell'); }}
                  className="pressable sm:col-span-2 flex w-full items-center justify-center gap-2.5 rounded-[12px] bg-petrol-600 px-6 py-4 text-base font-bold text-paper hover:bg-petrol-700"
                >
                  <Search size={19} />
                  Voir les annonces
                </button>
              </div>
            )}

            {mode === 'vendre' && (
              <div className="space-y-4">
                <p className="text-[15px] leading-relaxed text-ink-2">
                  Publiez votre annonce gratuitement : photos, kilometrage, prix. Les acheteurs vous
                  contactent directement, sans commission sur la vente.
                </p>
                <ul className="grid grid-cols-1 gap-2 text-[14px] text-ink-2 sm:grid-cols-3">
                  {['Annonce gratuite', 'Zero commission', 'Visible dans toute la France'].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Tag size={14} className="text-petrol-500" />{t}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPage('buy-sell')}
                  className="pressable flex w-full items-center justify-center gap-2.5 rounded-[12px] bg-saffron-500 px-6 py-4 text-base font-bold text-ink hover:bg-saffron-700 hover:text-paper"
                >
                  <Tag size={19} />
                  Deposer mon annonce
                </button>
              </div>
            )}
          </motion.div>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-petrol-100">
            <li className="flex items-center gap-2"><ShieldCheck size={17} className="text-saffron-300" />Assurance en option</li>
            <li className="flex items-center gap-2"><Ban size={17} className="text-saffron-300" />Annulation gratuite</li>
            <li className="flex items-center gap-2"><Clock3 size={17} className="text-saffron-300" />Assistance 24/7</li>
          </ul>
        </motion.div>

        {/* ---------- right: poster stack, depth on pointer ---------- */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <motion.div
            aria-hidden
            style={calm ? undefined : { y: sunY, scale: sunScale }}
            className="absolute -right-4 -top-32 h-[24rem] w-[24rem] rounded-full bg-saffron-500"
          />
          <motion.div style={calm ? undefined : { y: stackY }} className="stage-far relative">
            <Tilt max={11} scale={1.015} className="[transform-style:preserve-3d]">
              <div className="relative h-[30rem] w-full">
                <div className="absolute right-6 top-0 h-64 w-[19rem] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-24px_rgba(7,47,39,0.8)] [transform:translateZ(70px)]">
                  <img src="/destinations/nice.jpg" alt="La baie des Anges à Nice" className="h-full w-full object-cover" />
                </div>
                <div className="absolute left-0 top-40 h-60 w-[17rem] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-24px_rgba(7,47,39,0.85)] [transform:translateZ(120px)]">
                  <img src="/destinations/paris.jpg" alt="Paris depuis le 7e arrondissement" className="h-full w-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-2 h-52 w-[15rem] overflow-hidden rounded-[20px] shadow-[0_24px_50px_-20px_rgba(7,47,39,0.8)] [transform:translateZ(30px)]">
                  <img src="/destinations/marseille.jpg" alt="Le Vieux-Port de Marseille" className="h-full w-full object-cover" />
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
