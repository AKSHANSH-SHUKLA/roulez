'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, MapPin, Calendar, ShieldCheck, Ban, Clock3 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from '@/components/motion/tilt';
import { useAppStore, useBookingStore } from '@/lib/store';
import type { Location, RentalCar } from '@/lib/types';

const popularCities = ['Paris', 'Nice', 'Lyon', 'Bordeaux', 'Marseille', 'Toulouse'];

export default function HeroSearch() {
  const [locationQuery, setLocationQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);

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
      const res = await fetch(`/api/locations?q=${encodeURIComponent(query)}`);
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
    setLocationQuery(`${loc.name} - ${loc.city}`);
    setSelectedLocation(loc.id);
    setShowDropdown(false);
  };

  const handleSearch = async (locationId?: string) => {
    const locId = locationId || selectedLocation;
    if (!locId || !pickupDate || !returnDate) return;

    setLoading(true);
    const filters = {
      pickupLocation: locId,
      pickupDate,
      returnDate,
    };
    setFilters(filters);

    try {
      const params = new URLSearchParams();
      if (locId) params.set('pickupLocation', locId);
      if (pickupDate) params.set('pickupDate', pickupDate);
      if (returnDate) params.set('returnDate', returnDate);

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

  const handlePopularCity = async (city: string) => {
    setLocationQuery(city);
    // Quick search for this city
    setLoading(true);
    const filters = {
      pickupLocation: city,
      pickupDate,
      returnDate,
    };
    setFilters(filters);

    try {
      const params = new URLSearchParams({ pickupLocation: city });
      if (pickupDate) params.set('pickupDate', pickupDate);
      if (returnDate) params.set('returnDate', returnDate);
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

  // Set default dates (tomorrow and 3 days later)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const threeDays = new Date(today);
    threeDays.setDate(threeDays.getDate() + 4);

    setPickupDate(tomorrow.toISOString().split('T')[0]);
    setReturnDate(threeDays.toISOString().split('T')[0]);
  }, []);

  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, [0, 700], [0, 120]);
  const stackY = useTransform(scrollY, [0, 700], [0, -60]);

  const field =
    'w-full rounded-[12px] border border-petrol-100 bg-paper px-3 py-3 text-base text-ink ' +
    'placeholder:text-ink-2/55 focus:outline-none focus:border-petrol-500 ' +
    'transition-[border-color] duration-200';

  return (
    <section className="relative overflow-hidden bg-petrol-700">
      {/* poster field: hard-edged shapes, no blurred blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-petrol-600" />
        <div className="absolute -bottom-56 left-1/4 h-[40rem] w-[40rem] rounded-full bg-petrol-900/70" />
        <div className="absolute right-0 top-0 h-full w-[38%] bg-petrol-600/45" />
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
          <path d="M0 120V64c220 34 420 34 620 0S1180 8 1440 52v68z" fill="#faf5ec" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-28 pt-20 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-36 lg:pt-24">
        {/* ---------- left: thesis + control ---------- */}
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, transform: 'translate3d(0,24px,0)' }}
            animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="font-poster max-w-[13ch] text-[clamp(2.6rem,6.4vw,5.1rem)] text-paper"
          >
            Toute la France en voiture
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, transform: 'translate3d(0,18px,0)' }}
            animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 max-w-[46ch] text-lg leading-relaxed text-petrol-100"
          >
            Comparez les prix de plus de 10 loueurs et réservez en quelques clics.
          </motion.p>

          {/* control panel: anchored to the column, printed onto the field */}
          <motion.div
            initial={{ opacity: 0, transform: 'translate3d(0,28px,0)' }}
            animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 max-w-2xl rounded-[20px] bg-paper p-5 shadow-[0_24px_60px_-24px_rgba(7,47,39,0.75)] md:p-6"
          >
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
                    placeholder="Paris, Nice, aéroport de Lyon"
                    className={field + ' pl-10'}
                  />
                </div>

                {showDropdown && locations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, transform: 'translate3d(0,-6px,0)' }}
                    animate={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformOrigin: 'top center' }}
                    className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-[12px] border border-petrol-100 bg-paper shadow-[0_18px_40px_-18px_rgba(7,47,39,0.5)]"
                  >
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => selectLocation(loc)}
                        className="block w-full border-b border-petrol-50 px-4 py-3 text-left last:border-0 transition-colors duration-150 hover:bg-petrol-50"
                      >
                        <span className="block text-[15px] font-semibold text-ink">{loc.name}</span>
                        <span className="block text-[13px] text-ink-2">{loc.city}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* dates */}
              <div>
                <label htmlFor="debut" className="label-tight mb-2 block text-[11px] text-ink-2">Date de début</label>
                <div className="relative">
                  <Calendar size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-petrol-500" />
                  <input id="debut" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={field + ' pl-10'} />
                </div>
              </div>
              <div>
                <label htmlFor="retour" className="label-tight mb-2 block text-[11px] text-ink-2">Date de retour</label>
                <div className="relative">
                  <Calendar size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-petrol-500" />
                  <input id="retour" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={field + ' pl-10'} />
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSearch()}
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
            </div>
          </motion.div>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-petrol-100">
            <li className="flex items-center gap-2"><ShieldCheck size={17} className="text-saffron-300" />Assurance incluse</li>
            <li className="flex items-center gap-2"><Ban size={17} className="text-saffron-300" />Annulation gratuite</li>
            <li className="flex items-center gap-2"><Clock3 size={17} className="text-saffron-300" />Assistance 24/7</li>
          </ul>
        </div>

        {/* ---------- right: poster stack, depth on pointer ---------- */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <motion.div aria-hidden style={{ y: sunY }} className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-saffron-500" />
          <motion.div style={{ y: stackY }} className="stage-far relative">
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
