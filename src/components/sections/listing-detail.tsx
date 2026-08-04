'use client';

import { ArrowLeft, Settings2, Fuel, MapPin, Phone, Mail, User, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const conditionBadgeColors: Record<string, string> = {
  excellent: 'bg-green-100 text-green-700',
  bon: 'bg-blue-100 text-blue-700',
  correct: 'bg-yellow-100 text-yellow-700',
};

const conditionLabels: Record<string, string> = {
  excellent: 'Excellent',
  bon: 'Bon',
  correct: 'Correct',
};

const transmissionLabels: Record<string, string> = {
  manual: 'Manuelle',
  automatic: 'Automatique',
};

const safetyTips = [
  'Rencontrez le vendeur dans un lieu public',
  'Verifiez les documents du vehicule',
  'Faites un essai routier avant l\'achat',
  'Verifiez l\'historique d\'entretien',
  'Ne envoyez jamais d\'argent avant d\'avoir vu le vehicule',
];

export default function ListingDetail() {
  const { selectedListing, setPage } = useAppStore();

  if (!selectedListing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg mb-4 font-[Inter]">Aucune annonce selectionnee.</p>
        <button
          onClick={() => setPage('buy-sell')}
          className="text-emerald-600 font-medium hover:underline font-[Inter]"
        >
          Retour a la marketplace
        </button>
      </div>
    );
  }

  const listing = selectedListing;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back button */}
      <button
        onClick={() => setPage('buy-sell')}
        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 font-[Inter]"
      >
        <ArrowLeft size={20} />
        Retour aux annonces
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="rounded-xl overflow-hidden h-96">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-[Inter]">{listing.title}</h1>
          <p className="text-3xl font-bold text-emerald-600 mt-2 font-[Inter]">
            {listing.price.toLocaleString('fr-FR')} EUR
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { label: 'Marque', value: listing.brand },
              { label: 'Modele', value: listing.model },
              { label: 'Annee', value: String(listing.year) },
              { label: 'Kilometrage', value: `${listing.mileage.toLocaleString('fr-FR')} km` },
              { label: 'Carburant', value: listing.fuelType.charAt(0).toUpperCase() + listing.fuelType.slice(1) },
              { label: 'Transmission', value: transmissionLabels[listing.transmission] || listing.transmission },
              { label: 'Couleur', value: listing.color.charAt(0).toUpperCase() + listing.color.slice(1) },
            ].map((spec) => (
              <div key={spec.label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 font-[Inter]">{spec.label}</p>
                <p className="text-sm font-semibold text-gray-900 font-[Inter]">{spec.value}</p>
              </div>
            ))}
            {/* Condition badge */}
            <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-[Inter]">Etat</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium font-[Inter] ${
                conditionBadgeColors[listing.condition] || 'bg-gray-100 text-gray-700'
              }`}>
                {conditionLabels[listing.condition] || listing.condition}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2 font-[Inter]">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-[Inter]">{listing.description}</p>
          </div>

          {/* Seller info */}
          <div className="mt-6 bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3 font-[Inter]">Informations vendeur</h3>
            <div className="space-y-2 font-[Inter]">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User size={16} className="text-gray-400" />
                {listing.sellerName}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone size={16} className="text-gray-400" />
                {listing.sellerPhone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail size={16} className="text-gray-400" />
                {listing.sellerEmail}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin size={16} className="text-gray-400" />
                {listing.location}
              </div>
            </div>
          </div>

          <button
            className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors font-[Inter]"
          >
            Contacter le Vendeur
          </button>
        </div>
      </div>

      {/* Safety tips */}
      <div className="mt-8 bg-amber-50 border border-amber-200 p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-amber-600" />
          <h3 className="text-lg font-bold text-amber-800 font-[Inter]">Conseils de securite</h3>
        </div>
        <ul className="space-y-2">
          {safetyTips.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-sm text-amber-800 font-[Inter]">
              <span className="text-amber-500 mt-0.5">&#8226;</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
