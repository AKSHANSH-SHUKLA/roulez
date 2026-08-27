'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft, Settings2, Fuel, Users, DoorOpen, Briefcase, Wind,
  CheckCircle2, ShieldCheck, Loader2, AlertCircle, Clock3,
} from 'lucide-react';
import { useAppStore, useAuthStore, useBookingStore } from '@/lib/store';
import { termsFor, quoteFor, euro } from '@/lib/rental-terms';
import { checkRentalDuration, formatDuration, DURATION_HINT, isoDatePlus } from '@/lib/rental-rules';
import { RatingStars, CancellationBadge, TermsTable } from '@/components/ui/terms';
import type { InsurancePlan, Booking } from '@/lib/types';

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

export default function CarDetail() {
  const { selectedCar, setPage, showToast } = useAppStore();
  const { user, setShowAuth } = useAuthStore();
  const { filters, setBookingDetails } = useBookingStore();

  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loadingInsurance, setLoadingInsurance] = useState(true);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [startDate, setStartDate] = useState(filters.pickupDate || isoDatePlus(1));
  const [endDate, setEndDate] = useState(filters.returnDate || isoDatePlus(4));
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchInsurance() {
      try {
        const res = await fetch('/api/insurance');
        if (res.ok) {
          const json = await res.json();
          const list: InsurancePlan[] = Array.isArray(json) ? json : (json?.data ?? []);
          setInsurancePlans(list);
        }
      } catch {
        // ignore
      } finally {
        setLoadingInsurance(false);
      }
    }
    fetchInsurance();
  }, []);

  const duration = checkRentalDuration(startDate, endDate);
  const selectedPlanData = insurancePlans.find((p) => p.id === selectedPlan);

  if (!selectedCar) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-lg text-ink-2">Aucune voiture selectionnee.</p>
        <button onClick={() => setPage('search')} className="pressable mt-5 rounded-[10px] bg-petrol-600 px-5 py-2.5 text-sm font-bold text-paper">
          Retour a la recherche
        </button>
      </div>
    );
  }

  const car = selectedCar;
  const terms = termsFor(car);
  const quote = quoteFor(car.pricePerDay, duration.ok ? duration.days : 0, selectedPlanData?.dailyPrice ?? 0);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (!duration.ok) {
      showToast(duration.error ?? 'Dates invalides');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: car.id,
          pickupLocationId: car.locationId,
          returnLocationId: car.locationId,
          pickupDate: startDate,
          returnDate: endDate,
          totalPrice: quote.total,
          customerName: formName || user.name,
          customerEmail: formEmail || user.email,
          customerPhone: formPhone,
          insurancePlanId: selectedPlan || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setBookingDetails(json.data);
        setConfirmedBooking(json.data);
        showToast(`Reservation confirmee. Reference ${json.data.reference}`);
      }
    } catch {
      showToast('Erreur lors de la reservation');
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    'w-full rounded-[10px] border border-ink/15 bg-paper px-3.5 py-3 text-base text-ink ' +
    'placeholder:text-ink-2/50 focus:border-petrol-500 focus:outline-none transition-[border-color] duration-200';

  return (
    <div className="bg-paper-2 pb-24">
      <div className="mx-auto max-w-[1200px] px-6 pt-8 md:px-10">
        <button
          onClick={() => setPage('search')}
          className="pressable mb-7 flex items-center gap-2 text-[15px] font-semibold text-ink-2 transition-colors duration-200 hover:text-petrol-600"
        >
          <ArrowLeft size={18} />
          Retour aux resultats
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative h-[22rem] overflow-hidden rounded-[20px] lg:h-full lg:min-h-[26rem]">
            <img src={car.imageUrl} alt={car.name} className="h-full w-full object-cover" />
            <span className="label-tight absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[10px] text-ink">
              {categoryLabels[car.category]}
            </span>
          </div>

          <div>
            <h1 className="font-poster text-[clamp(2rem,4vw,3rem)] text-ink">{car.name}</h1>
            <p className="mt-1 text-[15px] text-ink-2">ou similaire &middot; {car.supplierName}</p>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <RatingStars rating={terms.rating} reviews={terms.reviews} />
              <CancellationBadge terms={terms} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Settings2, label: 'Transmission', value: transmissionLabels[car.transmission] },
                { icon: Fuel, label: 'Carburant', value: fuelLabels[car.fuel] },
                { icon: Users, label: 'Places', value: String(car.seats) },
                { icon: DoorOpen, label: 'Portes', value: String(car.doors) },
                { icon: Briefcase, label: 'Bagages', value: String(car.bags) },
                { icon: Wind, label: 'Climatisation', value: car.ac ? 'Oui' : 'Non' },
              ].map((spec) => (
                <div key={spec.label} className="rounded-[12px] bg-paper p-3 text-center">
                  <spec.icon size={18} className="mx-auto mb-1 text-petrol-500" />
                  <p className="text-[11px] text-ink-2">{spec.label}</p>
                  <p className="text-[14px] font-bold text-ink">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {car.features.map((f) => (
                <span key={f} className="rounded-full bg-petrol-50 px-3 py-1 text-[12px] font-semibold text-petrol-700">{f}</span>
              ))}
            </div>

            <div className="mt-6 rounded-[16px] bg-petrol-700 p-5 text-paper">
              <p className="label-tight text-[11px] text-saffron-300">Prix total</p>
              <p className="nums mt-1 font-poster text-4xl">
                {duration.ok ? euro(quote.total) : `${euro(car.pricePerDay)}/jour`}
              </p>
              <p className="nums mt-1 text-[14px] text-petrol-100">
                {duration.ok
                  ? `${formatDuration(duration.days)} · ${euro(car.pricePerDay)}/jour${selectedPlanData ? ` · assurance ${selectedPlanData.name} incluse` : ''}`
                  : DURATION_HINT}
              </p>
            </div>
          </div>
        </div>

        {/* Conditions de location */}
        <section className="mt-14">
          <h2 className="font-poster text-[clamp(1.6rem,3vw,2.3rem)] text-ink">Conditions de location</h2>
          <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-2">
            Tout ce qui coute de l argent en plus du tarif, affiche avant la reservation et pas au comptoir.
          </p>
          <div className="mt-6">
            <TermsTable terms={terms} />
          </div>
        </section>

        {confirmedBooking && (
          <div className="mt-10 rounded-[20px] border border-petrol-500 bg-petrol-50 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-petrol-600" />
              <h2 className="font-poster-md text-xl text-petrol-700">Reservation confirmee</h2>
            </div>
            <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
              <div><dt className="inline text-ink-2">Reference : </dt><dd className="nums inline font-bold text-ink">{confirmedBooking.reference}</dd></div>
              <div><dt className="inline text-ink-2">Voiture : </dt><dd className="inline font-bold text-ink">{car.name}</dd></div>
              <div><dt className="inline text-ink-2">Duree : </dt><dd className="nums inline font-bold text-ink">{formatDuration(duration.days)}</dd></div>
              <div><dt className="inline text-ink-2">Total : </dt><dd className="nums inline font-bold text-ink">{euro(confirmedBooking.totalPrice)}</dd></div>
            </dl>
          </div>
        )}

        {/* Assurance en option */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-poster text-[clamp(1.6rem,3vw,2.3rem)] text-ink">Reduire la franchise</h2>
            <button onClick={() => setPage('insurance')} className="text-[14px] font-bold text-petrol-600 underline underline-offset-4 hover:text-petrol-700">
              Comprendre l assurance
            </button>
          </div>
          <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-2">
            Sans option, {euro(terms.excess)} restent a votre charge en cas de dommage. L assurance est
            facultative : vous pouvez reserver sans.
          </p>

          {loadingInsurance ? (
            <div className="flex justify-center py-10"><Loader2 size={22} className="animate-spin text-petrol-500" /></div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <label className={`cursor-pointer rounded-[16px] border-2 p-4 transition-colors duration-200 ${selectedPlan === '' ? 'border-petrol-600 bg-petrol-50' : 'border-ink/12 bg-paper hover:border-ink/25'}`}>
                <span className="flex items-center gap-2">
                  <input type="radio" name="insurance" checked={selectedPlan === ''} onChange={() => setSelectedPlan('')} className="text-petrol-600 focus:ring-petrol-500" />
                  <span className="font-bold text-ink">Sans assurance</span>
                </span>
                <span className="nums mt-2 block font-poster-md text-lg text-petrol-600">0 EUR</span>
                <span className="mt-2 block text-[13px] leading-relaxed text-ink-2">
                  Franchise de {euro(terms.excess)} a votre charge.
                </span>
              </label>

              {insurancePlans.map((plan) => (
                <label
                  key={plan.id}
                  className={`cursor-pointer rounded-[16px] border-2 p-4 transition-colors duration-200 ${selectedPlan === plan.id ? 'border-petrol-600 bg-petrol-50' : 'border-ink/12 bg-paper hover:border-ink/25'}`}
                >
                  <span className="flex items-center gap-2">
                    <input type="radio" name="insurance" checked={selectedPlan === plan.id} onChange={() => setSelectedPlan(plan.id)} className="text-petrol-600 focus:ring-petrol-500" />
                    <span>
                      <span className="block font-bold text-ink">{plan.name}</span>
                      <span className="block text-[12px] text-ink-2">{plan.description}</span>
                    </span>
                  </span>
                  <span className="nums mt-2 block font-poster-md text-lg text-petrol-600">{plan.dailyPrice} EUR/jour</span>
                  <ul className="mt-2 space-y-1">
                    {plan.coverage.map((c) => (
                      <li key={c} className="flex items-start gap-1.5 text-[12px] text-ink-2">
                        <ShieldCheck size={13} className="mt-0.5 shrink-0 text-petrol-500" />{c}
                      </li>
                    ))}
                  </ul>
                </label>
              ))}
            </div>
          )}
        </section>

        {/* Reservation */}
        <section className="mt-14 rounded-[20px] bg-paper p-6 md:p-8">
          <h2 className="font-poster text-[clamp(1.6rem,3vw,2.3rem)] text-ink">Reserver ce vehicule</h2>
          <p className="mt-2 flex items-center gap-2 text-[14px] text-ink-2">
            <Clock3 size={15} className="text-petrol-500" />
            {DURATION_HINT}
          </p>

          <form onSubmit={handleBook} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className="label-tight mb-2 block text-[11px] text-ink-2">Nom complet</label>
                <input id="nom" type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder={user?.name || 'Votre nom'} className={field} />
              </div>
              <div>
                <label htmlFor="mail" className="label-tight mb-2 block text-[11px] text-ink-2">Email</label>
                <input id="mail" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder={user?.email || 'vous@exemple.fr'} className={field} />
              </div>
              <div>
                <label htmlFor="tel" className="label-tight mb-2 block text-[11px] text-ink-2">Telephone</label>
                <input id="tel" type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="+33 6 XX XX XX XX" className={field} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="d1" className="label-tight mb-2 block text-[11px] text-ink-2">Depart</label>
                  <input id="d1" type="date" value={startDate} min={isoDatePlus(0)} onChange={(e) => setStartDate(e.target.value)} className={field} />
                </div>
                <div>
                  <label htmlFor="d2" className="label-tight mb-2 block text-[11px] text-ink-2">Retour</label>
                  <input id="d2" type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className={field} />
                </div>
              </div>
            </div>

            {!duration.ok && duration.error && (
              <p role="alert" className="flex items-start gap-2 rounded-[10px] bg-terra-300/35 px-3.5 py-3 text-[14px] font-semibold text-terra-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {duration.error}
              </p>
            )}

            {duration.ok && (
              <div className="rounded-[16px] bg-paper-2 p-5">
                <dl className="space-y-2 text-[15px]">
                  <div className="flex justify-between text-ink-2">
                    <dt>{car.name} &times; {formatDuration(duration.days)}</dt>
                    <dd className="nums">{euro(quote.carTotal)}</dd>
                  </div>
                  {selectedPlanData && (
                    <div className="flex justify-between text-ink-2">
                      <dt>Assurance {selectedPlanData.name} &times; {formatDuration(duration.days)}</dt>
                      <dd className="nums">{euro(quote.insuranceTotal)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-ink/12 pt-2.5 text-lg font-bold text-ink">
                    <dt>Total a payer</dt>
                    <dd className="nums text-petrol-600">{euro(quote.total)}</dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-ink/12 pt-3 text-[13px] leading-relaxed text-ink-2">
                  Caution de {euro(terms.deposit)} bloquee au comptoir puis liberee au retour.
                  Elle ne fait pas partie du total ci-dessus.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !duration.ok}
              className="pressable flex w-full items-center justify-center gap-2 rounded-[12px] bg-petrol-600 px-6 py-4 text-base font-bold text-paper transition-colors duration-200 hover:bg-petrol-700 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {submitting && <Loader2 size={18} className="animate-spin" />}
              Reserver maintenant
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
