'use client';

import { useState, useEffect, useMemo } from 'react';
import { Settings2, Fuel, Briefcase, ArrowUpRight, SlidersHorizontal, X, Users } from 'lucide-react';
import { useAppStore, useBookingStore } from '@/lib/store';
import { termsFor, quoteFor, SUPPLIERS } from '@/lib/rental-terms';
import { checkRentalDuration } from '@/lib/rental-rules';
import { useDict, useFormat, fmt } from '@/lib/i18n';
import { RatingStars, CancellationBadge, TermsRow } from '@/components/ui/terms';
import type { RentalCar } from '@/lib/types';

const categories = ['economy', 'compact', 'suv', 'luxury', 'van', 'electric'] as const;
const supplierNames = Object.keys(SUPPLIERS);

type SortOption = 'total-asc' | 'total-desc' | 'rating-desc';

export default function SearchResults() {
  const d = useDict();
  const f = useFormat();
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
        const loc = filters.pickupLocationId || filters.pickupLocation || '';
        const url = loc ? `/api/cars?pickupLocation=${encodeURIComponent(loc)}` : '/api/cars';
        const res = await fetch(url);
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
  }, [searchResults, filters.pickupLocationId, filters.pickupLocation]);

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

  const sortLabels: Record<SortOption, string> = {
    'total-asc': d.search.sort.totalAsc,
    'total-desc': d.search.sort.totalDesc,
    'rating-desc': d.search.sort.ratingDesc,
  };
  const durationLabel = f.duration(days);

  const checkbox = 'h-4 w-4 rounded border-ink/25 text-petrol-600 focus:ring-petrol-500';

  const filterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="label-tight text-[11px] text-ink-2">{d.search.conditions}</h3>
        <div className="mt-3 space-y-2.5">
          {[
            { label: d.search.freeCancellation, checked: onlyFreeCancel, set: setOnlyFreeCancel },
            { label: d.search.debitAccepted, checked: onlyDebitCard, set: setOnlyDebitCard },
            { label: d.search.unlimitedMileage, checked: onlyUnlimitedKm, set: setOnlyUnlimitedKm },
          ].map((f) => (
            <label key={f.label} className="flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" checked={f.checked} onChange={(e) => f.set(e.target.checked)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">{d.search.category}</h3>
        <div className="mt-3 space-y-2.5">
          {categories.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggle(cat, selectedCategories, setSelectedCategories)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{d.categories[cat]}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">{d.search.transmission}</h3>
        <div className="mt-3 space-y-2.5">
          {[{ v: '', l: d.common.allF }, { v: 'manual', l: d.transmissions.manual }, { v: 'automatic', l: d.transmissions.automatic }].map((opt) => (
            <label key={opt.v} className="flex cursor-pointer items-center gap-2.5">
              <input type="radio" name="transmission" checked={transmission === opt.v} onChange={() => setTransmission(opt.v)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{opt.l}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">{d.search.fuel}</h3>
        <div className="mt-3 space-y-2.5">
          {[{ v: '', l: d.common.all }, { v: 'diesel', l: d.fuels.diesel }, { v: 'essence', l: d.fuels.essence }, { v: 'hybride', l: d.fuels.hybride }, { v: 'electrique', l: d.fuels.electrique }].map((opt) => (
            <label key={opt.v} className="flex cursor-pointer items-center gap-2.5">
              <input type="radio" name="fuel" checked={fuel === opt.v} onChange={() => setFuel(opt.v)} className={checkbox} />
              <span className="text-[14px] text-ink-2">{opt.l}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="maxtotal" className="label-tight block text-[11px] text-ink-2">{fmt(d.search.maxTotal, { duration: durationLabel })}</label>
        <input
          id="maxtotal"
          type="number"
          inputMode="numeric"
          placeholder={d.search.maxTotalPlaceholder}
          value={maxTotal}
          onChange={(e) => setMaxTotal(e.target.value)}
          className="mt-3 w-full rounded-[10px] border border-ink/15 bg-paper px-3 py-2.5 text-base text-ink placeholder:text-ink-2/50 focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div>
        <h3 className="label-tight text-[11px] text-ink-2">{d.search.supplier}</h3>
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
        {d.common.reset}
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
              {filters.pickupLocation ? fmt(d.search.titleAt, { city: filters.pickupLocation }) : d.search.titleAll}
            </h1>
            <p className="mt-1.5 text-[14px] text-ink-2">
              <span className="nums font-semibold text-petrol-600">{offers.length}</span> {d.search.offers}
              {' · '}
              <span className="nums">{durationLabel}</span>
              {` · ${d.search.taxIncluded} · ${d.rules.durationHint}`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="pressable flex items-center gap-2 rounded-[10px] border border-ink/20 px-4 py-2.5 text-sm font-bold text-ink lg:hidden"
            >
              <SlidersHorizontal size={16} />
              {d.search.filters}
            </button>
            <label className="sr-only" htmlFor="tri">{d.search.sortLabel}</label>
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
                <h2 className="font-poster-md text-xl text-ink">{d.search.filters}</h2>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label={d.common.close} className="pressable rounded-full p-2 text-ink-2 hover:bg-ink/5">
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
              <p className="text-lg text-ink-2">{d.search.empty}</p>
              <button onClick={resetFilters} className="pressable mt-5 rounded-[10px] bg-petrol-600 px-5 py-2.5 text-sm font-bold text-paper">
                {d.search.resetFilters}
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
                      {d.categories[car.category as keyof typeof d.categories] ?? car.category}
                    </span>
                    <span className="absolute right-3 top-3">
                      <CancellationBadge terms={terms} compact />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-poster-md text-lg text-ink">{car.name}</h2>
                    <p className="mt-0.5 text-[13px] text-ink-2">{d.common.orSimilar} &middot; {car.supplierName}</p>

                    <div className="mt-2">
                      <RatingStars rating={terms.rating} reviews={terms.reviews} compact />
                    </div>

                    <ul className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[12px] text-ink-2">
                      <li className="flex items-center gap-1"><Settings2 size={13} className="text-petrol-500" />{d.transmissions[car.transmission as keyof typeof d.transmissions] ?? car.transmission}</li>
                      <li className="flex items-center gap-1"><Fuel size={13} className="text-petrol-500" />{d.fuels[car.fuel as keyof typeof d.fuels] ?? car.fuel}</li>
                      <li className="flex items-center gap-1"><Users size={13} className="text-petrol-500" /><span className="nums">{car.seats}</span></li>
                      <li className="flex items-center gap-1"><Briefcase size={13} className="text-petrol-500" /><span className="nums">{car.bags}</span></li>
                    </ul>

                    <div className="mt-3.5 border-t border-ink/10 pt-3.5">
                      <TermsRow terms={terms} />
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
                      <div>
                        <span className="nums block font-poster-md text-2xl text-petrol-600">{f.euro(quote.total)}</span>
                        <span className="nums block text-[12px] text-ink-2">
                          {fmt(d.search.totalFor, { duration: durationLabel })} &middot; {f.euro(quote.perDay)}{d.common.perDay}
                        </span>
                      </div>
                      <button
                        onClick={() => openCar(car)}
                        className="pressable flex shrink-0 items-center gap-1.5 rounded-[10px] bg-petrol-600 px-4 py-2.5 text-sm font-bold text-paper transition-colors duration-200 hover:bg-petrol-700"
                      >
                        {d.common.view}
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
