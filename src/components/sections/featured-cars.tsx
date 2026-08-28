'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings2, Fuel, Briefcase, ArrowUpRight } from 'lucide-react';
import { Tilt, Reveal } from '@/components/motion/tilt';
import { useAppStore, useBookingStore } from '@/lib/store';
import { useDict, useFormat } from '@/lib/i18n';
import type { RentalCar } from '@/lib/types';

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
  const d = useDict();
  const f = useFormat();
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
      <section className="bg-paper-2 py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="h-10 w-64 rounded-lg bg-petrol-50" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-[20px] bg-petrol-50" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-poster max-w-[14ch] text-[clamp(2rem,4.6vw,3.6rem)] text-ink">
              {d.featured.title}
            </h2>
            <p className="max-w-[32ch] text-[15px] leading-relaxed text-ink-2">
              {d.featured.sub}
            </p>
          </div>
        </Reveal>

        <div className="stage mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, idx) => {
            const imageUrl = car.imageUrl || fallbackImages[idx % fallbackImages.length];
            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, transform: 'translate3d(0,26px,0)' }}
                whileInView={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.58, delay: Math.min(idx, 5) * 0.07, ease: [0.23, 1, 0.32, 1] }}
              >
                <Tilt max={6} scale={1.015}>
                  <button
                    onClick={() => handleCardClick(car)}
                    className="pressable group flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-paper text-left shadow-[0_20px_44px_-28px_rgba(20,35,28,0.6)] transition-shadow duration-300 hover:shadow-[0_34px_66px_-30px_rgba(20,35,28,0.7)]"
                  >
                    <div className="relative h-48 overflow-hidden bg-petrol-50">
                      <img
                        src={imageUrl}
                        alt={car.name}
                        className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.07]"
                      />
                      <span className="label-tight absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[10px] text-ink">
                        {d.categories[car.category as keyof typeof d.categories] ?? car.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-poster-md text-xl text-ink">{car.name}</h3>
                      <p className="mt-1 text-sm text-ink-2">
                        {d.common.orSimilar} &middot; {car.supplierName}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-ink-2">
                        <li className="flex items-center gap-1.5"><Settings2 size={14} className="text-petrol-500" />{d.transmissions[car.transmission as keyof typeof d.transmissions] ?? car.transmission}</li>
                        <li className="flex items-center gap-1.5"><Fuel size={14} className="text-petrol-500" />{d.fuels[car.fuel as keyof typeof d.fuels] ?? car.fuel}</li>
                        <li className="flex items-center gap-1.5"><Briefcase size={14} className="text-petrol-500" /><span className="nums">{car.bags}</span> {d.featured.bags}</li>
                      </ul>

                      <div className="mt-auto flex items-end justify-between border-t border-ink/10 pt-5">
                        <span className="nums font-poster-md text-2xl text-petrol-600">
                          {f.euro(car.pricePerDay)}
                          <span className="ml-1 text-sm font-medium text-ink-2">{d.common.perDay}</span>
                        </span>
                        <span className="flex items-center gap-1 text-sm font-bold text-ink transition-colors duration-200 group-hover:text-petrol-600">
                          {d.common.view}
                          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
