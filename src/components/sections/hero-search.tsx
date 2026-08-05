'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';
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

  return (
    <section className="bg-gradient-to-br from-emerald-600 to-teal-700 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto font-[Inter] leading-tight">
          Trouvez votre voiture ideale en France
        </h1>
        <p className="text-white/80 text-lg mt-4 font-[Inter]">
          Comparez les prix de plus de 10 fournisseurs
        </p>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto mt-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location input */}
            <div className="relative lg:col-span-1" ref={dropdownRef}>
              <label className="block text-xs font-medium text-gray-500 mb-1 font-[Inter]">
                Lieu de prise en charge
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() => {
                    if (locations.length > 0) setShowDropdown(true);
                  }}
                  placeholder="Ville ou aeroport"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-[Inter]"
                />
              </div>

              {/* Dropdown */}
              {showDropdown && locations.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto border border-gray-100">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => selectLocation(loc)}
                      className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="text-sm font-medium text-gray-900 font-[Inter]">{loc.name}</div>
                      <div className="text-xs text-gray-500 font-[Inter]">{loc.city}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pickup date */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 font-[Inter]">
                Date de debut
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-[Inter]"
                />
              </div>
            </div>

            {/* Return date */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 font-[Inter]">
                Date de retour
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-[Inter]"
                />
              </div>
            </div>

            {/* Search button */}
            <div className="flex items-end">
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-[Inter]"
              >
                <Search size={16} />
                {loading ? 'Recherche...' : 'Rechercher'}
              </button>
            </div>
          </div>
        </div>

        {/* Popular destinations chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="text-white/70 text-sm font-[Inter] self-center mr-1">Populaire :</span>
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => handlePopularCity(city)}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/30 transition-colors font-[Inter]"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
