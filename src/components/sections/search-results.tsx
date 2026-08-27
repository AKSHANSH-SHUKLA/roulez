'use client';

import { useState, useEffect, useMemo } from 'react';
import { Settings2, Fuel, Briefcase, ArrowUpRight, SlidersHorizontal, X, Users } from 'lucide-react';
import { useAppStore, useBookingStore } from '@/lib/store';
import { termsFor, quoteFor, euro, SUPPLIERS } from '@/lib/rental-terms';
import { checkRentalDuration, formatDuration, DURATION_HINT } from '@/lib/rental-rules';
import { RatingStars, CancellationBadge, TermsRow } from '@/components/ui/terms';
import type { RentalCar } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  economy: 'Economique',
  compact: 'Compacte',
  suv: 'SUV',
  luxury: 'Luxe',
  van: 'Utilitaire',
  electric: 'Electrique',
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
const supplierNames = Object.keys(SUPPLIERS);

type SortOption = 'total-asc' | 'total-desc' | 'rating-desc';

const sortLabels: Record<SortOption, string> = {
  'total-asc': 'Total le moins cher',
  'total-desc': 'Total le plus cher',
  'rating-desc': 'Meilleure note',
};

export default function SearchResults() {
  const { setSelectedCar, setPage } = useAppStore();
  const { filters, searchResults } = useBookingStore();

  const [allCars, setAllCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>('total-asc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filtres
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [transmission, setTransmission] = useState('');
  const [fuel, setFuel] = useState('');
  const [maxTotal, setMaxTotal] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [onlyFreeCancel, setOnlyFreeCancel] = useState(false);
  const [onlyDebitCard, setOnlyDebitCard] = useState(false);
  const [onlyUnlimitedKm, setOnlyUnlimitedKm] = useState(false);

  // Duree issue de la recherche. Par defaut 3 jours si l'utilisateur a atterri ici sans dates.
  const duration = checkRentalDuration(filters.pickupDate ?? '', filters.returnDate ?? '');
  const days = duration.ok ? duration.days : 3;

  useEffect(() => {
    if (searchResults.length > 0) {
      setAllCars(searchResults);
      setLoading(false);
      return;
    }
    async function fetchCars() {
      try {
        const res = await fetch('/api/cars');
        if (res.ok) {
          const json = await res.json();
          const list: RentalCar[] = Array.isArray(json) ? json : (json?.data ?? []);
          setAllCars(list);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [searchResults]);

  const offers = useMemo(() => {
    let list = allCars.map((car) => {
      const terms = termsFor(car);
      const quote = quoteFor(car.pricePerDay, days);
      return { car, terms, quote };
    });

    if (selectedCategories.length > 0) list = list.filter((o) => selectedCategories.includes(o.car.category));
    if (transmission) list = list.filter((o) => o.car.transmission === transmission);
    if (fuel) list = list.filter((o) => o.car.fuel === fuel);
    if (maxTotal) list = list.filter((o) => o.quote.total <= Number(maxTotal));
    if (selectedSuppliers.length > 0) list = list.filter((o) => selectedSuppliers.includes(o.car.supplierName));
    if (onlyFreeCancel) list = list.filter((o) => o.terms.freeCancellation);
    if (onlyDebitCard) list = list.filter((o) => o.terms.acceptsDebitCard);
    if (onlyUnlimitedKm) list = list.filter((o) => o.terms.unlimitedMileage);

    if (sort === 'total-asc') list.sort((a, b) => a.quote.total - b.quote.total);
    if (sort === 'total-desc') list.sort((a, b) => b.quote.total - a.quote.total);
    if (sort === 'rating-desc') list.sort((a, b) => b.terms.rating - a.terms.rating);

    return list;
  }, [allCars, days, selectedCategories, transmission, fuel, maxTotal, selectedSuppliers, onlyFreeCancel, onlyDebitCard, onlyUnlimitedKm, sort]);

  const toggle = (value: string, list: string[], set: (v: string[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setTransmission('');
    setFuel('');
    setMaxTotal('');
    setSelectedSuppliers([]);
    setOnlyFreeCancel(false);
    setOnlyDebitCard(false);
    setOnlyUnlimitedKm(false);
  };

  const openCar = (car: RentalCar) => {
    setSelectedCar(car);
    setPage('car-detail');
  };

  const checkbox = 'h-4 w-4 rounded border-ink/25 text-petrol-600 focus:ring-petrol-500';

  const filterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="label-tight text-[11px] text-ink-2">Conditions</h3>
        <div className="mt-3 space-y-2.5">
          {[
            { label: 'Annulation gratuite', checked: onlyFreeCancel, set: setOnlyFreeCancel },
            { label: 'Carte de debit acceptee', checked: onlyDebitCard, set: setOnlyDebitCard },
            { label: 'Kilometrage illimite', checked: onlyUnlimitedKm, set: setOnlyUnlimitedKm },
          ].map((f) => (
            <label key={f.label} className="flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" checked={f.checked} onChange={(e) => f.set(e.target.checked)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">Categorie</h3>
        <div className="mt-3 space-y-2.5">
          {categories.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggle(cat, selectedCategories, setSelectedCategories)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{categoryLabels[cat]}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">Transmission</h3>
        <div className="mt-3 space-y-2.5">
          {[{ v: '', l: 'Toutes' }, { v: 'manual', l: 'Manuelle' }, { v: 'automatic', l: 'Automatique' }].map((opt) => (
            <label key={opt.v} className="flex cursor-pointer items-center gap-2.5">
              <input type="radio" name="transmission" checked={transmission === opt.v} onChange={() => setTransmission(opt.v)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{opt.l}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">Carburant</h3>
        <div className="mt-3 space-y-2.5">
          {[{ v: '', l: 'Tous' }, { v: 'diesel', l: 'Diesel' }, { v: 'essence', l: 'Essence' }, { v: 'hybride', l: 'Hybride' }, { v: 'electrique', l: 'Electrique' }].map((opt) => (
            <label key={opt.v} className="flex cursor-pointer items-center gap-2.5">
              <input type="radio" name="fuel" checked={fuel === opt.v} onChange={() => setFuel(opt.v)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{opt.l}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="maxtotal" className="label-tight block text-[11px] text-ink-2">Total maximum ({formatDuration(days)})</label>
        <input
          id="maxtotal"
          type="number"
          inputMode="numeric"
          placeholder="ex. 400"
          value={maxTotal}
          onChange={(e) => setMaxTotal(e.target.value)}
          className="mt-3 w-full rounded-[10px] border border-ink/15 bg-paper px-3 py-2.5 text-base text-ink placeholder:text-ink-2/50 focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">Loueur</h3>
        <div className="mt-3 space-y-2.5">
          {supplierNames.map((sup) => (
            <label key={sup} className="flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" checked={selectedSuppliers.includes(sup)} onChange={() => toggle(sup, selectedSuppliers, setSelectedSuppliers)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{sup}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={resetFilters} className="pressable w-full rounded-[10px] border border-ink/20 py-2.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-ink/5">
        Reinitialiser
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[26rem] rounded-[20px] bg-petrol-50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper-2 pb-20">
      {/* bandeau recherche */}
      <div className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-6 py-7 md:px-10">
          <div>
            <h1 className="font-poster text-[clamp(1.7rem,3.4vw,2.6rem)] text-ink">
              {filters.pickupLocation ? `Location a ${filters.pickupLocation}` : 'Toutes les offres'}
            </h1>
            <p className="mt-1.5 text-[14px] text-ink-2">
              <span className="nums font-semibold text-petrol-600">{offers.length}</span> offres
              {' · '}
              <span className="nums">{formatDuration(days)}</span>
              {' · prix total taxes comprises · '}
              {DURATION_HINT}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="pressable flex items-center gap-2 rounded-[10px] border border-ink/20 px-4 py-2.5 text-sm font-bold text-ink lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filtres
            </button>
            <label className="sr-only" htmlFor="tri">Trier les offres</label>
            <select
              id="tri"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-[10px] border border-ink/20 bg-paper px-3 py-2.5 text-sm font-semibold text-ink focus:border-petrol-500 focus:outline-none"
            >
              {(Object.entries(sortLabels) as [SortOption, string][]).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-6 pt-8 md:px-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-[20px] border border-ink/12 bg-paper p-6">{filterPanel}</div>
        </aside>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/55" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-paper p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-poster-md text-xl text-ink">Filtres</h2>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Fermer les filtres" className="pressable rounded-full p-2 text-ink-2 hover:bg-ink/5">
                  <X size={20} />
                </button>
              </div>
              {filterPanel}
            </div>
          </div>
        )}

        <div className="flex-1">
          {offers.length === 0 ? (
            <div className="rounded-[20px] border border-ink/12 bg-paper py-20 text-center">
              <p className="text-lg text-ink-2">Aucune offre ne correspond a vos criteres.</p>
              <button onClick={resetFilters} className="pressable mt-5 rounded-[10px] bg-petrol-600 px-5 py-2.5 text-sm font-bold text-paper">
                Reinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {offers.map(({ car, terms, quote }) => (
                <article
                  key={car.id}
                  className="group flex flex-col overflow-hidden rounded-[20px] bg-paper shadow-[0_18px_40px_-28px_rgba(20,35,28,0.6)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(20,35,28,0.7)]"
                >
                  <div className="relative h-40 overflow-hidden bg-petrol-50">
                    <img
                      src={car.imageUrl}
                      alt={car.name}
                      className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                    />
                    <span className="label-tight absolute left-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-[10px] text-ink">
                      {categoryLabels[car.category] || car.category}
                    </span>
                    <span className="absolute right-3 top-3">
                      <CancellationBadge terms={terms} compact />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-poster-md text-lg text-ink">{car.name}</h2>
                    <p className="mt-0.5 text-[13px] text-ink-2">ou similaire &middot; {car.supplierName}</p>

                    <div className="mt-2">
                      <RatingStars rating={terms.rating} reviews={terms.reviews} compact />
                    </div>

                    <ul className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[12px] text-ink-2">
                      <li className="flex items-center gap-1"><Settings2 size={13} className="text-petrol-500" />{transmissionLabels[car.transmission]}</li>
                      <li className="flex items-center gap-1"><Fuel size={13} className="text-petrol-500" />{fuelLabels[car.fuel]}</li>
                      <li className="flex items-center gap-1"><Users size={13} className="text-petrol-500" /><span className="nums">{car.seats}</span></li>
                      <li className="flex items-center gap-1"><Briefcase size={13} className="text-petrol-500" /><span className="nums">{car.bags}</span></li>
                    </ul>

                    <div className="mt-3.5 border-t border-ink/10 pt-3.5">
                      <TermsRow terms={terms} />
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
                      <div>
                        <span className="nums block font-poster-md text-2xl text-petrol-600">{euro(quote.total)}</span>
                        <span className="nums block text-[12px] text-ink-2">
                          total {formatDuration(days)} &middot; {euro(quote.perDay)}/jour
                        </span>
                      </div>
                      <button
                        onClick={() => openCar(car)}
                        className="pressable flex shrink-0 items-center gap-1.5 rounded-[10px] bg-petrol-600 px-4 py-2.5 text-sm font-bold text-paper transition-colors duration-200 hover:bg-petrol-700"
                      >
                        Voir
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
