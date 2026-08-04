'use client';

import { useState, useEffect, useMemo } from 'react';
import { Settings2, Fuel, Briefcase, Eye, SlidersHorizontal, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import type { RentalCar } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  economy: 'Economie',
  compact: 'Compact',
  suv: 'SUV',
  luxury: 'Luxe',
  van: 'Utilitaire',
  electric: 'Electrique',
};

const categoryBorderColor: Record<string, string> = {
  economy: 'border-l-blue-500',
  compact: 'border-l-emerald-500',
  suv: 'border-l-orange-500',
  luxury: 'border-l-purple-500',
  van: 'border-l-red-500',
  electric: 'border-l-teal-500',
};

const fuelLabels: Record<string, string> = {
  diesel: 'Diesel',
  essence: 'Essence',
  hybride: 'Hybride',
  electrique: 'Electrique',
};

const transmissionLabels: Record<string, string> = {
  manual: 'Manuelle',
  automatic: 'Automatique',
};

const categories = ['economy', 'compact', 'suv', 'luxury', 'van', 'electric'] as const;
const suppliers = ['Hertz', 'Europcar', 'Sixt', 'Avis', 'Enterprise', 'Budget'];

type SortOption = 'price-asc' | 'price-desc' | 'supplier-rating';

const sortLabels: Record<SortOption, string> = {
  'price-asc': 'Prix croissant',
  'price-desc': 'Prix decroissant',
  'supplier-rating': 'Note fournisseur',
};

export default function SearchResults() {
  const { setSelectedCar, setPage } = useAppStore();
  const [allCars, setAllCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>('price-asc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('/api/cars');
        if (res.ok) {
          const json = await res.json();
          setAllCars(json.data || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    let cars = [...allCars];

    if (selectedCategories.length > 0) {
      cars = cars.filter((c) => selectedCategories.includes(c.category));
    }
    if (transmission) {
      cars = cars.filter((c) => c.transmission === transmission);
    }
    if (fuel) {
      cars = cars.filter((c) => c.fuel === fuel);
    }
    if (minPrice) {
      cars = cars.filter((c) => c.pricePerDay >= Number(minPrice));
    }
    if (maxPrice) {
      cars = cars.filter((c) => c.pricePerDay <= Number(maxPrice));
    }
    if (selectedSuppliers.length > 0) {
      cars = cars.filter((c) => selectedSuppliers.includes(c.supplierName));
    }

    if (sort === 'price-asc') {
      cars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === 'price-desc') {
      cars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    // supplier-rating: stable sort by supplier name for demo
    if (sort === 'supplier-rating') {
      cars.sort((a, b) => a.supplierName.localeCompare(b.supplierName));
    }

    return cars;
  }, [allCars, selectedCategories, transmission, fuel, minPrice, maxPrice, selectedSuppliers, sort]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleSupplier = (sup: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(sup) ? prev.filter((s) => s !== sup) : [...prev, sup]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setTransmission('');
    setFuel('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedSuppliers([]);
  };

  const handleViewDetails = (car: RentalCar) => {
    setSelectedCar(car);
    setPage('car-detail');
  };

  const filterSidebar = (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 font-[Inter]">Filtres</h3>

      {/* Category */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 font-[Inter]">Categorie</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600 font-[Inter]">{categoryLabels[cat]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 font-[Inter]">Transmission</h4>
        <div className="space-y-2">
          {[{ v: '', l: 'Tous' }, { v: 'manual', l: 'Manuelle' }, { v: 'automatic', l: 'Automatique' }].map((opt) => (
            <label key={opt.v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="transmission"
                checked={transmission === opt.v}
                onChange={() => setTransmission(opt.v)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600 font-[Inter]">{opt.l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 font-[Inter]">Carburant</h4>
        <div className="space-y-2">
          {[{ v: '', l: 'Tous' }, { v: 'diesel', l: 'Diesel' }, { v: 'essence', l: 'Essence' }, { v: 'hybride', l: 'Hybride' }, { v: 'electrique', l: 'Electrique' }].map((opt) => (
            <label key={opt.v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="fuel"
                checked={fuel === opt.v}
                onChange={() => setFuel(opt.v)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600 font-[Inter]">{opt.l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 font-[Inter]">Prix (EUR/jour)</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
          />
          <span className="text-gray-400 text-sm">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
          />
        </div>
      </div>

      {/* Suppliers */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 font-[Inter]">Fournisseur</h4>
        <div className="space-y-2">
          {suppliers.map((sup) => (
            <label key={sup} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSuppliers.includes(sup)}
                onChange={() => toggleSupplier(sup)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600 font-[Inter]">{sup}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors font-[Inter]"
      >
        Reinitialiser
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-gray-700 font-medium font-[Inter]">
          {filteredCars.length} voiture{filteredCars.length !== 1 ? 's' : ''} trouvee{filteredCars.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 font-[Inter]"
          >
            <SlidersHorizontal size={16} />
            Filtres
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
          >
            {(Object.entries(sortLabels) as [SortOption, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20 bg-white rounded-xl border border-gray-200 p-5">
            {filterSidebar}
          </div>
        </aside>

        {/* Mobile filter overlay */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 font-[Inter]">Filtres</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              {filterSidebar}
            </div>
          </div>
        )}

        {/* Results grid */}
        <div className="flex-1">
          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg font-[Inter]">Aucune voiture ne correspond a vos criteres.</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-emerald-600 font-medium hover:underline font-[Inter]"
              >
                Reinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCars.map((car) => {
                const borderColor = categoryBorderColor[car.category] || 'border-l-gray-400';
                return (
                  <div
                    key={car.id}
                    className={`bg-white rounded-xl border border-gray-200 border-l-4 ${borderColor} overflow-hidden hover:shadow-lg transition-shadow group`}
                  >
                    <div className="h-36 w-full overflow-hidden">
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 font-[Inter]">{car.name}</h3>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-[Inter]">
                          {categoryLabels[car.category] || car.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2 font-[Inter]">{car.supplierName}</p>

                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-[Inter]">
                        <span className="flex items-center gap-1">
                          <Settings2 size={13} />
                          {transmissionLabels[car.transmission]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel size={13} />
                          {fuelLabels[car.fuel]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={13} />
                          {car.bags}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-emerald-600 font-[Inter]">
                          {car.pricePerDay} EUR/jour
                        </span>
                      </div>

                      <button
                        onClick={() => handleViewDetails(car)}
                        className="w-full py-2 rounded-lg border border-emerald-600 text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 font-[Inter]"
                      >
                        <Eye size={14} />
                        Voir Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
