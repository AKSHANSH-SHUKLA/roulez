'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings2, Fuel, Briefcase, Eye } from 'lucide-react';
import { useAppStore, useBookingStore } from '@/lib/store';
import type { RentalCar } from '@/lib/types';

const categoryBorderColor: Record<string, string> = {
  economy: 'border-l-blue-500',
  compact: 'border-l-emerald-500',
  suv: 'border-l-orange-500',
  luxury: 'border-l-purple-500',
  van: 'border-l-red-500',
  electric: 'border-l-teal-500',
};

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

const fallbackCars: RentalCar[] = [
  { id: '1', name: 'Renault Clio', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 29, imageUrl: '', supplierId: 's1', supplierName: 'Europcar', locationId: '1', features: ['GPS', 'Bluetooth'] },
  { id: '2', name: 'Peugeot 208', category: 'compact', transmission: 'automatic', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 35, imageUrl: '', supplierId: 's2', supplierName: 'Hertz', locationId: '1', features: ['GPS', 'Camera recul'] },
  { id: '3', name: 'Citroen C3 Aircross', category: 'suv', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 45, imageUrl: '', supplierId: 's3', supplierName: 'Avis', locationId: '2', features: ['GPS', 'Toit panoramique'] },
  { id: '4', name: 'BMW Serie 3', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 79, imageUrl: '', supplierId: 's1', supplierName: 'Europcar', locationId: '1', features: ['GPS', 'Sieges cuir', 'Camera'] },
  { id: '5', name: 'Renault Kangoo', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 4, bags: 4, ac: true, pricePerDay: 55, imageUrl: '', supplierId: 's4', supplierName: 'Sixt', locationId: '3', features: ['Volume important', 'GPS'] },
  { id: '6', name: 'Tesla Model 3', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 69, imageUrl: '', supplierId: 's2', supplierName: 'Hertz', locationId: '2', features: ['Autopilote', 'GPS', 'Superchargeur'] },
];

const fallbackImages = ['/cars/renault-clio.jpg','/cars/peugeot-208.jpg','/cars/citroen-c3.jpg','/cars/bmw-serie-3.jpg','/cars/renault-kangoo.jpg','/cars/tesla-model-3.jpg'];

export default function FeaturedCars() {
  const [cars, setCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const { setPage, setSelectedCar } = useAppStore();
  const { setFilters, setSearchResults } = useBookingStore();

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('/api/cars?limit=6');
        if (res.ok) {
          const json = await res.json();
          // L'API renvoie { success, data } — on accepte aussi un tableau brut
          const list: RentalCar[] = Array.isArray(json) ? json : (json?.data ?? []);
          setCars(list.length > 0 ? list : fallbackCars);
        } else {
          setCars(fallbackCars);
        }
      } catch {
        setCars(fallbackCars);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const handleCardClick = (car: RentalCar) => {
    setSelectedCar(car);
    setPage('car-detail');
  };

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 font-[Inter]">Voitures Populaires</h2>
          <p className="text-gray-500 text-center mb-10 font-[Inter]">Decouvrez nos offres les plus reservees</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 font-[Inter]">Voitures Populaires</h2>
        <p className="text-gray-500 text-center mb-10 font-[Inter]">
          Decouvrez nos offres les plus reservees
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, idx) => {
            const imageUrl = car.imageUrl || fallbackImages[idx % fallbackImages.length];
            const borderColor = categoryBorderColor[car.category] || 'border-l-gray-400';

            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => handleCardClick(car)}
                className={`bg-white rounded-xl border border-gray-200 border-l-4 ${borderColor} overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group`}
              >
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={imageUrl}
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
                  <p className="text-sm text-gray-500 mb-3 font-[Inter]">{car.supplierName}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-[Inter]">
                    <span className="flex items-center gap-1">
                      <Settings2 size={14} />
                      {transmissionLabels[car.transmission] || car.transmission}
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel size={14} />
                      {fuelLabels[car.fuel] || car.fuel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {car.bags} valises
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-emerald-600 font-[Inter]">
                      {car.pricePerDay} EUR/jour
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(car);
                    }}
                    className="w-full py-2 rounded-lg border border-emerald-600 text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 font-[Inter]"
                  >
                    <Eye size={14} />
                    Voir Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
