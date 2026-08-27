'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Settings2, Fuel, Gauge, ArrowUpRight, Loader2, Search, X, Camera,
  FileCheck2, AlertCircle, Info, MapPin, Calendar,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import {
  documentRules, validateListing, requiresControleTechnique, CRIT_AIR_LABELS,
  CERFA_CESSION, ANTS_DECLARATION_DAYS, CSA_MAX_AGE_DAYS, CT_MAX_AGE_MONTHS,
} from '@/lib/sale-rules';
import type { CarSaleListing } from '@/lib/types';

const conditionLabels: Record<string, string> = {
  excellent: 'Excellent etat',
  bon: 'Bon etat',
  correct: 'Etat correct',
};

const conditionTone: Record<string, string> = {
  excellent: 'bg-petrol-500 text-paper',
  bon: 'bg-azure-500 text-paper',
  correct: 'bg-saffron-500 text-ink',
};

const transmissionLabels: Record<string, string> = {
  manual: 'Manuelle',
  manuelle: 'Manuelle',
  automatic: 'Automatique',
  automatique: 'Automatique',
};

const MAX_PHOTOS = 8;

/** Reduit une photo cote client : une annonce n'a pas besoin de 6 Mo par image. */
function downscale(file: File, maxWidth = 1000): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('canvas'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

const emptyForm = {
  title: '', brand: '', model: '', firstRegistration: '', mileage: '', price: '',
  fuelType: 'essence', transmission: 'manuelle', color: '', doors: '5', seats: '5',
  fiscalPower: '', co2: '', critAir: '2', vin: '', plate: '',
  owners: '1', mileageGuaranteed: true, imported: false, accidented: false,
  condition: 'bon', description: '', city: '', sellerName: '', phone: '', email: '',
  controleTechniqueDate: '',
};

export default function BuySell() {
  const { setPage, setSelectedListing, showToast, saleFilters, setSaleFilters, buySellTab, setBuySellTab } = useAppStore();
  const [tab, setTabState] = useState<'acheter' | 'vendre'>(buySellTab);
  const setTab = (t: 'acheter' | 'vendre') => { setTabState(t); setBuySellTab(t); };

  /* ---------------- Acheter ---------------- */
  const [listings, setListings] = useState<CarSaleListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(saleFilters.q ?? '');
  const [maxPrice, setMaxPrice] = useState(saleFilters.maxPrice ? String(saleFilters.maxPrice) : '');
  const [fuelFilter, setFuelFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (fuelFilter) params.set('fuelType', fuelFilter);
      if (conditionFilter) params.set('condition', conditionFilter);
      const res = await fetch(`/api/sale-listings?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setListings(Array.isArray(json) ? json : (json?.data ?? []));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [q, maxPrice, fuelFilter, conditionFilter]);

  // Les filtres poses depuis le heros s'appliquent des l'arrivee sur la page.
  useEffect(() => {
    const id = setTimeout(fetchListings, 250);
    return () => clearTimeout(id);
  }, [fetchListings]);

  const resetBuy = () => {
    setQ('');
    setMaxPrice('');
    setFuelFilter('');
    setConditionFilter('');
    setSaleFilters({});
  };

  /* ---------------- Vendre ---------------- */
  const [form, setForm] = useState(emptyForm);
  const [docs, setDocs] = useState<Record<string, boolean>>({});
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const rules = documentRules(form.firstRegistration);
  const ctNeeded = requiresControleTechnique(form.firstRegistration);

  async function addPhotos(files: FileList | null) {
    if (!files) return;
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(files).slice(0, Math.max(0, room));
    const next: string[] = [];
    for (const f of picked) {
      if (!f.type.startsWith('image/')) continue;
      try { next.push(await downscale(f)); } catch { /* photo ignoree */ }
    }
    setPhotos((p) => [...p, ...next]);
    setErrors((e) => ({ ...e, photos: '' }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateListing({
      title: form.title, brand: form.brand, model: form.model,
      firstRegistration: form.firstRegistration, mileage: form.mileage, price: form.price,
      city: form.city, sellerName: form.sellerName, phone: form.phone, email: form.email,
      photos, documents: docs, controleTechniqueDate: form.controleTechniqueDate,
    });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      showToast('Il manque des informations obligatoires');
      document.getElementById('vendre-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/sale-listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          year: Number(form.firstRegistration.slice(0, 4)),
          mileage: Number(form.mileage),
          price: Number(form.price),
          doors: Number(form.doors),
          seats: Number(form.seats),
          fiscalPower: form.fiscalPower ? Number(form.fiscalPower) : undefined,
          co2: form.co2 ? Number(form.co2) : undefined,
          owners: Number(form.owners),
          images: photos,
          imageUrl: photos[0],
          location: form.city,
          sellerPhone: form.phone,
          sellerEmail: form.email,
          documents: { ...docs, controleTechniqueDate: form.controleTechniqueDate },
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('Annonce publiee');
        setForm(emptyForm);
        setDocs({});
        setPhotos([]);
        setErrors({});
        setTab('acheter');
        fetchListings();
      }
    } catch {
      showToast('Erreur lors de la publication');
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------------- styles partages ---------------- */
  const field =
    'w-full rounded-[10px] border border-ink/15 bg-paper px-3.5 py-3 text-base text-ink ' +
    'placeholder:text-ink-2/50 focus:border-petrol-500 focus:outline-none transition-[border-color] duration-200';
  const label = 'label-tight mb-2 block text-[11px] text-ink-2';

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p role="alert" className="mt-1.5 flex items-start gap-1.5 text-[13px] font-semibold text-terra-700">
        <AlertCircle size={14} className="mt-0.5 shrink-0" />
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="bg-paper-2 pb-24">
      {/* en-tete */}
      <section className="bg-petrol-700 py-12 text-paper md:py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <h1 className="font-poster text-[clamp(2.2rem,5vw,3.8rem)]">Achat &amp; Vente</h1>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-petrol-100">
            Des annonces de particuliers partout en France. Aucune commission sur la vente.
          </p>

          <div role="tablist" className="mt-8 inline-flex gap-1 rounded-[12px] bg-petrol-900/45 p-1">
            {(['acheter', 'vendre'] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`pressable rounded-[9px] px-7 py-2.5 text-[15px] font-bold transition-colors duration-200 ${
                  tab === t ? 'bg-paper text-ink' : 'text-paper/80 hover:text-paper'
                }`}
              >
                {t === 'acheter' ? 'Acheter' : 'Vendre'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ACHETER ============ */}
      {tab === 'acheter' && (
        <section className="mx-auto max-w-[1200px] px-6 pt-10 md:px-10">
          <div className="rounded-[20px] bg-paper p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <label htmlFor="q" className={label}>Marque ou modele</label>
                <div className="relative">
                  <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-petrol-500" />
                  <input
                    id="q"
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Tesla, Peugeot 208, Clio"
                    className={field + ' pl-10'}
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <label htmlFor="budget" className={label}>Budget maximum</label>
                <select id="budget" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={field}>
                  <option value="">Tous les budgets</option>
                  <option value="10000">10 000 EUR</option>
                  <option value="20000">20 000 EUR</option>
                  <option value="30000">30 000 EUR</option>
                  <option value="50000">50 000 EUR</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="carb" className={label}>Carburant</label>
                <select id="carb" value={fuelFilter} onChange={(e) => setFuelFilter(e.target.value)} className={field}>
                  <option value="">Tous</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Electrique</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="etat" className={label}>Etat</label>
                <select id="etat" value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} className={field}>
                  <option value="">Tous</option>
                  <option value="excellent">Excellent</option>
                  <option value="bon">Bon</option>
                  <option value="correct">Correct</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-4">
              <p className="text-[14px] text-ink-2">
                <span className="nums font-bold text-petrol-600">{listings.length}</span> annonce{listings.length !== 1 ? 's' : ''}
                {q.trim() ? ` pour « ${q.trim()} »` : ''}
                {maxPrice ? ` sous ${Number(maxPrice).toLocaleString('fr-FR')} EUR` : ''}
              </p>
              {(q || maxPrice || fuelFilter || conditionFilter) && (
                <button onClick={resetBuy} className="pressable flex items-center gap-1.5 rounded-full bg-ink/8 px-3 py-1.5 text-[13px] font-semibold text-ink-2 hover:bg-ink/15">
                  <X size={13} /> Effacer
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 size={26} className="animate-spin text-petrol-500" /></div>
          ) : listings.length === 0 ? (
            <div className="mt-8 rounded-[20px] bg-paper py-20 text-center">
              <p className="text-lg text-ink-2">Aucune annonce ne correspond a votre recherche.</p>
              <button onClick={resetBuy} className="pressable mt-5 rounded-[10px] bg-petrol-600 px-5 py-2.5 text-sm font-bold text-paper">
                Voir toutes les annonces
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((l) => (
                <article key={l.id} className="group flex flex-col overflow-hidden rounded-[20px] bg-paper shadow-[0_18px_40px_-28px_rgba(20,35,28,0.6)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(20,35,28,0.7)]">
                  <div className="relative h-44 overflow-hidden bg-petrol-50">
                    <img src={l.imageUrl} alt={l.title} className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]" />
                    <span className={`label-tight absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] ${conditionTone[l.condition] ?? 'bg-ink text-paper'}`}>
                      {conditionLabels[l.condition] ?? l.condition}
                    </span>
                    {(l.images?.length ?? 0) > 1 && (
                      <span className="nums label-tight absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/75 px-2.5 py-1 text-[10px] text-paper">
                        <Camera size={11} />{l.images.length}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-poster-md text-lg text-ink">{l.title}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-2">
                      <MapPin size={13} className="text-petrol-500" />{l.location}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[12px] text-ink-2">
                      <li className="flex items-center gap-1"><Calendar size={13} className="text-petrol-500" /><span className="nums">{l.year}</span></li>
                      <li className="flex items-center gap-1"><Gauge size={13} className="text-petrol-500" /><span className="nums">{l.mileage.toLocaleString('fr-FR')}</span> km</li>
                      <li className="flex items-center gap-1"><Fuel size={13} className="text-petrol-500" />{l.fuelType}</li>
                      <li className="flex items-center gap-1"><Settings2 size={13} className="text-petrol-500" />{transmissionLabels[l.transmission] ?? l.transmission}</li>
                    </ul>
                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
                      <span className="nums font-poster-md text-2xl text-petrol-600">
                        {l.price.toLocaleString('fr-FR')} EUR
                      </span>
                      <button
                        onClick={() => { setSelectedListing(l); setPage('listing-detail'); }}
                        className="pressable flex items-center gap-1.5 rounded-[10px] bg-petrol-600 px-4 py-2.5 text-sm font-bold text-paper hover:bg-petrol-700"
                      >
                        Voir <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ============ VENDRE ============ */}
      {tab === 'vendre' && (
        <section id="vendre-form" className="mx-auto max-w-[900px] px-6 pt-10 md:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. le vehicule */}
            <fieldset className="rounded-[20px] bg-paper p-6 md:p-8">
              <legend className="font-poster text-[clamp(1.5rem,3vw,2.1rem)] text-ink">1. Le vehicule</legend>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                La loi vous oblige a annoncer la marque, le modele, la date de premiere mise en
                circulation et le kilometrage reel. Un kilometrage faux engage votre responsabilite.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="titre" className={label}>Titre de l annonce</label>
                  <input id="titre" className={field} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Renault Clio 2021 — premiere main" />
                  <Err k="title" />
                </div>
                <div>
                  <label htmlFor="marque" className={label}>Marque</label>
                  <input id="marque" className={field} value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="Renault" />
                  <Err k="brand" />
                </div>
                <div>
                  <label htmlFor="modele" className={label}>Modele</label>
                  <input id="modele" className={field} value={form.model} onChange={(e) => set('model', e.target.value)} placeholder="Clio" />
                  <Err k="model" />
                </div>
                <div>
                  <label htmlFor="mec" className={label}>1re mise en circulation</label>
                  <input id="mec" type="month" className={field} value={form.firstRegistration} onChange={(e) => set('firstRegistration', e.target.value)} />
                  <Err k="firstRegistration" />
                </div>
                <div>
                  <label htmlFor="km" className={label}>Kilometrage au compteur</label>
                  <input id="km" type="number" inputMode="numeric" className={field} value={form.mileage} onChange={(e) => set('mileage', e.target.value)} placeholder="35000" />
                  <Err k="mileage" />
                </div>
                <div>
                  <label htmlFor="carbu" className={label}>Carburant</label>
                  <select id="carbu" className={field} value={form.fuelType} onChange={(e) => set('fuelType', e.target.value)}>
                    <option value="essence">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybride">Hybride</option>
                    <option value="electrique">Electrique</option>
                    <option value="gpl">GPL</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="boite" className={label}>Transmission</label>
                  <select id="boite" className={field} value={form.transmission} onChange={(e) => set('transmission', e.target.value)}>
                    <option value="manuelle">Manuelle</option>
                    <option value="automatique">Automatique</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="couleur" className={label}>Couleur</label>
                  <input id="couleur" className={field} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="Blanc" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="portes" className={label}>Portes</label>
                    <input id="portes" type="number" min={2} max={7} className={field} value={form.doors} onChange={(e) => set('doors', e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="places" className={label}>Places</label>
                    <input id="places" type="number" min={2} max={9} className={field} value={form.seats} onChange={(e) => set('seats', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cv" className={label}>Puissance fiscale (CV)</label>
                  <input id="cv" type="number" className={field} value={form.fiscalPower} onChange={(e) => set('fiscalPower', e.target.value)} placeholder="5" />
                </div>
                <div>
                  <label htmlFor="co2" className={label}>Emissions CO2 (g/km)</label>
                  <input id="co2" type="number" className={field} value={form.co2} onChange={(e) => set('co2', e.target.value)} placeholder="120" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="critair" className={label}>Vignette Crit&apos;Air</label>
                  <select id="critair" className={field} value={form.critAir} onChange={(e) => set('critAir', e.target.value)}>
                    {Object.entries(CRIT_AIR_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  <p className="mt-1.5 text-[13px] text-ink-2">
                    Determine si le vehicule peut rouler dans les zones a faibles emissions. Les acheteurs urbains regardent ce champ en premier.
                  </p>
                </div>
                <div>
                  <label htmlFor="vin" className={label}>Numero de serie (VIN)</label>
                  <input id="vin" className={field} value={form.vin} onChange={(e) => set('vin', e.target.value)} placeholder="VF1RFA00X12345678" />
                </div>
                <div>
                  <label htmlFor="plaque" className={label}>Immatriculation</label>
                  <input id="plaque" className={field} value={form.plate} onChange={(e) => set('plate', e.target.value)} placeholder="AB-123-CD" />
                  <p className="mt-1.5 text-[13px] text-ink-2">Masquee en partie dans l annonce publique.</p>
                </div>
              </div>
            </fieldset>

            {/* 2. etat et historique */}
            <fieldset className="rounded-[20px] bg-paper p-6 md:p-8">
              <legend className="font-poster text-[clamp(1.5rem,3vw,2.1rem)] text-ink">2. Etat et historique</legend>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                Cacher un sinistre ou un import, c est le vice cache. L acheteur peut annuler la
                vente jusqu a deux ans apres la livraison.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="etatv" className={label}>Etat general</label>
                  <select id="etatv" className={field} value={form.condition} onChange={(e) => set('condition', e.target.value)}>
                    <option value="excellent">Excellent</option>
                    <option value="bon">Bon</option>
                    <option value="correct">Correct</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="prop" className={label}>Nombre de proprietaires</label>
                  <input id="prop" type="number" min={1} className={field} value={form.owners} onChange={(e) => set('owners', e.target.value)} />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { k: 'mileageGuaranteed', l: 'Je garantis le kilometrage affiche', h: "Sinon l'annonce portera la mention « kilometrage non garanti », comme l'exige la DGCCRF." },
                  { k: 'imported', l: 'Vehicule importe', h: 'Un vehicule importe doit etre signale : cela change la cote et les demarches.' },
                  { k: 'accidented', l: 'Vehicule accidente ou passe en procedure VEI', h: "A declarer meme si les reparations ont ete faites." },
                ].map((c) => (
                  <label key={c.k} className="flex cursor-pointer items-start gap-3 rounded-[12px] bg-paper-2 p-4">
                    <input
                      type="checkbox"
                      checked={Boolean(form[c.k as keyof typeof form])}
                      onChange={(e) => set(c.k, e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 text-petrol-600 focus:ring-petrol-500"
                    />
                    <span>
                      <span className="block text-[15px] font-bold text-ink">{c.l}</span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-2">{c.h}</span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-5">
                <label htmlFor="desc" className={label}>Description</label>
                <textarea id="desc" rows={5} className={field} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Entretien suivi en concession, pneus neufs, distribution faite a 90 000 km..." />
              </div>
            </fieldset>

            {/* 3. photos */}
            <fieldset className="rounded-[20px] bg-paper p-6 md:p-8">
              <legend className="font-poster text-[clamp(1.5rem,3vw,2.1rem)] text-ink">3. Photos</legend>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                Trois photos minimum. Les annonces qui se vendent montrent les quatre angles de la
                carrosserie, l interieur, le compteur, et les defauts assumes.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {photos.map((src, i) => (
                  <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-[12px] bg-paper-2">
                    <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                    {i === 0 && (
                      <span className="label-tight absolute left-2 top-2 rounded-full bg-petrol-600 px-2 py-0.5 text-[9px] text-paper">
                        Principale
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                      aria-label={`Supprimer la photo ${i + 1}`}
                      className="pressable absolute right-2 top-2 rounded-full bg-ink/75 p-1.5 text-paper transition-colors duration-200 hover:bg-terra-700"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}

                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="pressable flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-ink/25 text-ink-2 transition-colors duration-200 hover:border-petrol-500 hover:text-petrol-600"
                  >
                    <Camera size={22} />
                    <span className="text-[13px] font-semibold">Ajouter</span>
                  </button>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => { addPhotos(e.target.files); e.target.value = ''; }}
              />
              <p className="nums mt-3 text-[13px] text-ink-2">{photos.length} / {MAX_PHOTOS} photos</p>
              <Err k="photos" />
            </fieldset>

            {/* 4. documents */}
            <fieldset className="rounded-[20px] bg-paper p-6 md:p-8">
              <legend className="font-poster text-[clamp(1.5rem,3vw,2.1rem)] text-ink">4. Documents obligatoires</legend>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                Sans ces papiers, l acheteur ne pourra pas faire sa carte grise et la vente tombe.
                Cochez ce que vous pouvez fournir le jour de la vente.
              </p>

              {!form.firstRegistration && (
                <p className="mt-4 flex items-start gap-2 rounded-[10px] bg-azure-300/35 px-3.5 py-3 text-[13px] text-azure-700">
                  <Info size={15} className="mt-0.5 shrink-0" />
                  Renseignez la date de 1re mise en circulation ci-dessus : elle determine si le
                  controle technique est obligatoire.
                </p>
              )}

              <div className="mt-6 space-y-3">
                {rules.map((r) => (
                  <div key={r.key}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-[12px] bg-paper-2 p-4">
                      <input
                        type="checkbox"
                        checked={Boolean(docs[r.key])}
                        onChange={(e) => { setDocs((d) => ({ ...d, [r.key]: e.target.checked })); setErrors((x) => ({ ...x, [`doc_${r.key}`]: '' })); }}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 text-petrol-600 focus:ring-petrol-500"
                      />
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[15px] font-bold text-ink">{r.label}</span>
                          <span className={`label-tight rounded-full px-2 py-0.5 text-[9px] ${r.mandatory ? 'bg-terra-500 text-paper' : 'bg-ink/10 text-ink-2'}`}>
                            {r.mandatory ? 'Obligatoire' : 'Facultatif'}
                          </span>
                        </span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-ink-2">{r.help}</span>
                      </span>
                    </label>
                    <Err k={`doc_${r.key}`} />

                    {r.key === 'controleTechnique' && docs.controleTechnique && (
                      <div className="ml-7 mt-2">
                        <label htmlFor="ctdate" className={label}>Date du controle technique</label>
                        <input id="ctdate" type="date" className={field + ' max-w-xs'} value={form.controleTechniqueDate} onChange={(e) => set('controleTechniqueDate', e.target.value)} />
                        <Err k="controleTechniqueDate" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[12px] border border-ink/12 p-5">
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <FileCheck2 size={17} className="text-petrol-500" />
                  Apres la vente, dans l ordre
                </h3>
                <ol className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink-2">
                  <li><span className="nums font-bold text-petrol-600">1.</span> Vous barrez la carte grise, vous inscrivez « Vendu le » avec la date et l heure, vous signez.</li>
                  <li><span className="nums font-bold text-petrol-600">2.</span> Vous signez les deux exemplaires du Cerfa {CERFA_CESSION} avec l acheteur, un pour chacun.</li>
                  <li><span className="nums font-bold text-petrol-600">3.</span> Vous declarez la vente en ligne sous {ANTS_DECLARATION_DAYS} jours. Passe ce delai, c est une amende.</li>
                  <li><span className="nums font-bold text-petrol-600">4.</span> Vous transmettez le code de cession a l acheteur : sans lui, il ne peut pas faire sa carte grise.</li>
                </ol>
                <p className="mt-4 border-t border-ink/12 pt-3 text-[13px] leading-relaxed text-ink-2">
                  Rappel des delais : certificat de situation administrative de moins de {CSA_MAX_AGE_DAYS} jours,
                  controle technique de moins de {CT_MAX_AGE_MONTHS} mois{ctNeeded ? '' : ' si vous en fournissez un'}.
                </p>
              </div>
            </fieldset>

            {/* 5. prix et contact */}
            <fieldset className="rounded-[20px] bg-paper p-6 md:p-8">
              <legend className="font-poster text-[clamp(1.5rem,3vw,2.1rem)] text-ink">5. Prix et contact</legend>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="prix" className={label}>Prix de vente (EUR)</label>
                  <input id="prix" type="number" inputMode="numeric" className={field} value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="11900" />
                  <Err k="price" />
                </div>
                <div>
                  <label htmlFor="ville" className={label}>Ville</label>
                  <input id="ville" className={field} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Tours" />
                  <Err k="city" />
                </div>
                <div>
                  <label htmlFor="nom" className={label}>Votre nom</label>
                  <input id="nom" className={field} value={form.sellerName} onChange={(e) => set('sellerName', e.target.value)} placeholder="Jean Dupont" />
                  <Err k="sellerName" />
                </div>
                <div>
                  <label htmlFor="tel" className={label}>Telephone</label>
                  <input id="tel" type="tel" className={field} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+33 6 XX XX XX XX" />
                  <Err k="phone" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mail" className={label}>Email</label>
                  <input id="mail" type="email" className={field} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="vous@exemple.fr" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="pressable mt-7 flex w-full items-center justify-center gap-2 rounded-[12px] bg-petrol-600 px-6 py-4 text-base font-bold text-paper transition-colors duration-200 hover:bg-petrol-700 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {submitting && <Loader2 size={18} className="animate-spin" />}
                Publier l annonce
              </button>
              <p className="mt-3 text-center text-[13px] text-ink-2">
                Annonce gratuite, aucune commission sur la vente.
              </p>
            </fieldset>
          </form>
        </section>
      )}
    </div>
  );
}
