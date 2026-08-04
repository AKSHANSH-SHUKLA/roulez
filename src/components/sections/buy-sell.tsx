'use client';

import { useState, useEffect, useMemo } from 'react';
import { Settings2, Fuel, Eye, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import type { CarSaleListing } from '@/lib/types';

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

export default function BuySell() {
  const { setPage, setSelectedListing, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<'acheter' | 'vendre'>('acheter');

  // Acheter state
  const [listings, setListings] = useState<CarSaleListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [conditionFilter, setConditionFilter] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // Vendre form state
  const [sellForm, setSellForm] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    fuelType: 'essence',
    transmission: 'manuelle',
    color: '',
    description: '',
    sellerName: '',
    phone: '',
    email: '',
    city: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchListings = async (condition = '', fuelType = '', min = '', max = '') => {
    setLoadingListings(true);
    try {
      const params = new URLSearchParams();
      if (condition) params.set('condition', condition);
      if (fuelType) params.set('fuelType', fuelType);
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
      const query = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`/api/sale-listings${query}`);
      if (res.ok) {
        const json = await res.json();
        setListings(json.data || []);
      }
    } catch {
      // ignore
    } finally {
      setLoadingListings(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const applyFilters = () => {
    fetchListings(conditionFilter, fuelFilter, priceMin, priceMax);
  };

  useEffect(() => {
    if (activeTab === 'acheter') {
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/sale-listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sellForm,
          year: Number(sellForm.year),
          mileage: Number(sellForm.mileage),
          price: Number(sellForm.price),
          condition: 'bon',
          imageUrl: '',
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('Annonce publiee avec succes !');
        setSellForm({
          title: '', brand: '', model: '', year: '', mileage: '', price: '',
          fuelType: 'essence', transmission: 'manuelle', color: '', description: '',
          sellerName: '', phone: '', email: '', city: '',
        });
        setActiveTab('acheter');
        fetchListings();
      }
    } catch {
      showToast('Erreur lors de la publication');
    } finally {
      setSubmitting(false);
    }
  };

  const updateSellField = (field: string, value: string) => {
    setSellForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {(['acheter', 'vendre'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-base font-semibold capitalize transition-colors font-[Inter] ${
              activeTab === tab
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'acheter' ? 'Acheter' : 'Vendre'}
          </button>
        ))}
      </div>

      {/* ACHETER TAB */}
      {activeTab === 'acheter' && (
        <>
          {/* Filters row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
            >
              <option value=''>Tous (Etat)</option>
              <option value='excellent'>Excellent</option>
              <option value='bon'>Bon</option>
              <option value='correct'>Correct</option>
            </select>
            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
            >
              <option value=''>Tous (Carburant)</option>
              <option value='essence'>Essence</option>
              <option value='diesel'>Diesel</option>
              <option value='electrique'>Electrique</option>
              <option value='hybride'>Hybride</option>
            </select>
            <input
              type="number"
              placeholder="Prix min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
            />
            <input
              type="number"
              placeholder="Prix max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
            />
            <button
              onClick={applyFilters}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors font-[Inter]"
            >
              Filtrer
            </button>
          </div>

          {loadingListings ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 rounded-xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg font-[Inter]">Aucune annonce disponible.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 font-[Inter] leading-tight flex-1 mr-2">
                        {listing.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 font-[Inter] ${
                        conditionBadgeColors[listing.condition] || 'bg-gray-100 text-gray-700'
                      }`}>
                        {conditionLabels[listing.condition] || listing.condition}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-emerald-600 mt-1 font-[Inter]">
                      {listing.price.toLocaleString('fr-FR')} EUR
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-2 font-[Inter]">
                      <span>{listing.mileage.toLocaleString('fr-FR')} km</span>
                      <span>{listing.year}</span>
                      <span className="flex items-center gap-1">
                        <Fuel size={12} />
                        {listing.fuelType.charAt(0).toUpperCase() + listing.fuelType.slice(1)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Settings2 size={12} />
                        {transmissionLabels[listing.transmission] || listing.transmission}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-[Inter]">{listing.location}</p>
                    <button
                      onClick={() => {
                        setSelectedListing(listing);
                        setPage('listing-detail');
                      }}
                      className="w-full mt-3 py-2 rounded-lg border border-emerald-600 text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 font-[Inter]"
                    >
                      <Eye size={14} />
                      Voir les details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* VENDRE TAB */}
      {activeTab === 'vendre' && (
        <form
          onSubmit={handleSellSubmit}
          className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl space-y-4"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-[Inter]">Publier une annonce</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Titre de l'annonce</label>
              <input
                type="text"
                required
                value={sellForm.title}
                onChange={(e) => updateSellField('title', e.target.value)}
                placeholder="ex: Renault Clio 2021 - Excellent etat"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Marque</label>
              <input
                type="text"
                required
                value={sellForm.brand}
                onChange={(e) => updateSellField('brand', e.target.value)}
                placeholder="Renault"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Modele</label>
              <input
                type="text"
                required
                value={sellForm.model}
                onChange={(e) => updateSellField('model', e.target.value)}
                placeholder="Clio"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Annee</label>
              <input
                type="number"
                required
                value={sellForm.year}
                onChange={(e) => updateSellField('year', e.target.value)}
                placeholder="2021"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Kilometrage</label>
              <input
                type="number"
                required
                value={sellForm.mileage}
                onChange={(e) => updateSellField('mileage', e.target.value)}
                placeholder="35000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Prix (EUR)</label>
              <input
                type="number"
                required
                value={sellForm.price}
                onChange={(e) => updateSellField('price', e.target.value)}
                placeholder="11900"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Type de carburant</label>
              <select
                value={sellForm.fuelType}
                onChange={(e) => updateSellField('fuelType', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              >
                <option value='essence'>Essence</option>
                <option value='diesel'>Diesel</option>
                <option value='electrique'>Electrique</option>
                <option value='hybride'>Hybride</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Transmission</label>
              <select
                value={sellForm.transmission}
                onChange={(e) => updateSellField('transmission', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              >
                <option value='manuelle'>Manuelle</option>
                <option value='automatic'>Automatique</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Couleur</label>
              <input
                type="text"
                value={sellForm.color}
                onChange={(e) => updateSellField('color', e.target.value)}
                placeholder="blanc"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Ville</label>
              <input
                type="text"
                required
                value={sellForm.city}
                onChange={(e) => updateSellField('city', e.target.value)}
                placeholder="Paris"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Description</label>
              <textarea
                rows={4}
                value={sellForm.description}
                onChange={(e) => updateSellField('description', e.target.value)}
                placeholder="Decrivez votre vehicule..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Votre nom</label>
              <input
                type="text"
                required
                value={sellForm.sellerName}
                onChange={(e) => updateSellField('sellerName', e.target.value)}
                placeholder="Jean Dupont"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Telephone</label>
              <input
                type="tel"
                required
                value={sellForm.phone}
                onChange={(e) => updateSellField('phone', e.target.value)}
                placeholder="+33 6 XX XX XX XX"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-[Inter]">Email</label>
              <input
                type="email"
                required
                value={sellForm.email}
                onChange={(e) => updateSellField('email', e.target.value)}
                placeholder="votre@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-[Inter]"
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            Publier l'annonce
          </button>
        </form>
      )}
    </div>
  );
}
