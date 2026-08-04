'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Settings2, Fuel, Users, DoorOpen, Briefcase, Wind, Star, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { useAppStore, useAuthStore, useBookingStore } from '@/lib/store';
import type { RentalCar, InsurancePlan } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  economy: 'Economique',
  compact: 'Compacte',
  suv: 'SUV',
  luxury: 'Luxe',
  van: 'Utilitaire',
  electric: 'Electrique',
};

const categoryBadgeColors: Record<string, string> = {
  economy: 'bg-blue-100 text-blue-700',
  compact: 'bg-emerald-100 text-emerald-700',
  suv: 'bg-orange-100 text-orange-700',
  luxury: 'bg-purple-100 text-purple-700',
  van: 'bg-red-100 text-red-700',
  electric: 'bg-teal-100 text-teal-700',
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
  const { user, token, setShowAuth } = useAuthStore();
  const { setBookingDetails } = useBookingStore();

  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loadingInsurance, setLoadingInsurance] = useState(true);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  useEffect(() => {
    async function fetchInsurance() {
      try {
        const res = await fetch('/api/insurance');
        if (res.ok) {
          const json = await res.json();
          setInsurancePlans(json.data || []);
          if (json.data?.length > 0) {
            setSelectedPlan(json.data[0].id);
          }
        }
      } catch {
        // ignore
      } finally {
        setLoadingInsurance(false);
      }
    }
    fetchInsurance();
  }, []);

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const selectedPlanData = insurancePlans.find((p) => p.id === selectedPlan);
  const carPriceTotal = (selectedCar?.pricePerDay || 0) * days;
  const insuranceTotal = (selectedPlanData?.dailyPrice || 0) * days;
  const grandTotal = carPriceTotal + insuranceTotal;

  if (!selectedCar) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg mb-4 font-[Inter]">Aucune voiture selectionnee.</p>
        <button
          onClick={() => setPage('search')}
          className="text-emerald-600 font-medium hover:underline font-[Inter]"
        >
          Retour a la recherche
        </button>
      </div>
    );
  }

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowAuth(true);
      return;
    }

    if (days === 0) {
      showToast('Veuillez selectionner des dates valides');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: selectedCar.id,
          pickupLocationId: selectedCar.locationId,
          returnLocationId: selectedCar.locationId,
          pickupDate: startDate,
          returnDate: endDate,
          totalPrice: grandTotal,
          customerName: formName || user.name,
          customerEmail: formEmail || user.email,
          customerPhone: formPhone,
          insurancePlanId: selectedPlan,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setBookingDetails(json.data);
        setConfirmedBooking(json.data);
        showToast(`Reservation confirmee ! Reference: ${json.data.reference}`);
      }
    } catch {
      showToast('Erreur lors de la reservation');
    } finally {
      setSubmitting(false);
    }
  };

  const car = selectedCar as RentalCar;
  const badgeColor = categoryBadgeColors[car.category] || 'bg-gray-100 text-gray-700';

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back button */}
      <button
        onClick={() => setPage('search')}
        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 font-[Inter]"
      >
        <ArrowLeft size={20} />
        Retour aux resultats
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div>
          <div className="relative rounded-xl overflow-hidden h-80">
            <img
              src={car.imageUrl}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium font-[Inter] ${badgeColor}`}>
              {categoryLabels[car.category]}
            </span>
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-[Inter]">{car.name}</h1>
          <p className="text-gray-500 mt-1 font-[Inter]">{car.supplierName}</p>

          {/* Rating stars (demo) */}
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={16}
                className={s <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1 font-[Inter]">4.0</span>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: Settings2, label: 'Transmission', value: transmissionLabels[car.transmission] },
              { icon: Fuel, label: 'Carburant', value: fuelLabels[car.fuel] },
              { icon: Users, label: 'Places', value: String(car.seats) },
              { icon: DoorOpen, label: 'Portes', value: String(car.doors) },
              { icon: Briefcase, label: 'Bagages', value: String(car.bags) },
              { icon: Wind, label: 'Climatisation', value: car.ac ? 'Oui' : 'Non' },
            ].map((spec) => (
              <div key={spec.label} className="bg-gray-50 rounded-lg p-3 text-center">
                <spec.icon size={20} className="mx-auto text-gray-500 mb-1" />
                <p className="text-xs text-gray-500 font-[Inter]">{spec.label}</p>
                <p className="text-sm font-semibold text-gray-900 font-[Inter]">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-4">
            {car.features.map((f) => (
              <span
                key={f}
                className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium font-[Inter]"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-3xl font-bold text-emerald-600 font-[Inter]">{car.pricePerDay} EUR</span>
            <span className="text-gray-500 font-[Inter]"> /jour</span>
          </div>
        </div>
      </div>

      {/* Confirmation section */}
      {confirmedBooking && (
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 size={24} className="text-emerald-600" />
            <h3 className="text-lg font-bold text-emerald-800 font-[Inter]">Reservation confirmee</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm font-[Inter]">
            <div><span className="text-gray-500">Reference :</span> <span className="font-semibold text-gray-900">{confirmedBooking.reference}</span></div>
            <div><span className="text-gray-500">Statut :</span> <span className="font-semibold text-emerald-700">{confirmedBooking.status === 'confirmed' ? 'Confirmee' : confirmedBooking.status}</span></div>
            <div><span className="text-gray-500">Voiture :</span> <span className="font-semibold text-gray-900">{car.name}</span></div>
            <div><span className="text-gray-500">Total :</span> <span className="font-semibold text-gray-900">{confirmedBooking.totalPrice} EUR</span></div>
          </div>
        </div>
      )}

      {/* Insurance section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-[Inter]">Choisissez votre assurance</h2>
        {loadingInsurance ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={24} className="animate-spin text-emerald-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {insurancePlans.map((plan) => (
              <label
                key={plan.id}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-colors ${
                  selectedPlan === plan.id
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="insurance"
                    checked={selectedPlan === plan.id}
                    onChange={() => setSelectedPlan(plan.id)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 font-[Inter]">{plan.name}</p>
                    <p className="text-xs text-gray-500 font-[Inter]">{plan.description}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-emerald-600 mb-2 font-[Inter]">{plan.dailyPrice} EUR/jour</p>
                <ul className="space-y-1">
                  {plan.coverage.map((c) => (
                    <li key={c} className="flex items-start gap-1.5 text-xs text-gray-600 font-[Inter]">
                      <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Booking form */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-[Inter]">Reserver ce vehicule</h2>
        <form onSubmit={handleBook} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Nom complet</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder={user?.name || 'Votre nom'}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Email</label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder={user?.email || 'votre@email.com'}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Telephone</label>
              <input
                type="tel"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="+33 6 XX XX XX XX"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Date de debut</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Date de fin</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
          </div>

          {/* Price summary */}
          {days > 0 && (
            <div className="bg-white rounded-lg p-4 space-y-2 font-[Inter]">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{car.name} x {days} jour{days > 1 ? 's' : ''}</span>
                <span>{carPriceTotal} EUR</span>
              </div>
              {selectedPlanData && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Assurance {selectedPlanData.name} x {days} jour{days > 1 ? 's' : ''}</span>
                  <span>{insuranceTotal} EUR</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2">
                <span>Total</span>
                <span className="text-emerald-600">{grandTotal} EUR</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-[Inter]"
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            Reserver Maintenant
          </button>
        </form>
      </div>
    </div>
  );
}
