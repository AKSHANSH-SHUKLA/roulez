'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Car, ArrowRight } from 'lucide-react';
import { Tilt, Reveal } from '@/components/motion/tilt';
import { useAppStore, useBookingStore } from '@/lib/store';
import { useDict, useFormat, useLocale, fmt } from '@/lib/i18n';
import type { Destination } from '@/lib/types';

const fallbackImages = ['/destinations/paris.jpg','/destinations/nice.jpg','/destinations/lyon.jpg','/destinations/bordeaux.jpg','/destinations/marseille.jpg','/destinations/toulouse.jpg','/destinations/strasbourg.jpg','/destinations/lille.jpg','/destinations/nantes.jpg','/destinations/montpellier.jpg'];

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const d = useDict();
  const f = useFormat();
  const locale = useLocale();
  const { setPage } = useAppStore();
  const { setFilters, setSearchResults } = useBookingStore();

  async function openCity(city: string) {
    setFilters({ pickupLocation: city });
    try {
      const res = await fetch(`/api/cars?pickupLocation=${encodeURIComponent(city)}`);
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data ?? []);
        setSearchResults(list);
      }
    } catch {
      // navigate anyway
    }
    setPage('search');
  }

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch('/api/destinations');
        if (res.ok) {
          const json = await res.json();
          // L'API renvoie { success, data } — on accepte aussi un tableau brut
          const list: Destination[] = Array.isArray(json) ? json : (json?.data ?? []);
          if (list.length > 0) {
            setDestinations(list);
          } else {
            throw new Error('empty destinations');
          }
        } else {
          throw new Error('bad response');
        }
      } catch {
        // fallback data
        setDestinations([
          { id: '1', name: 'Paris', imageUrl: '', carCount: 245, startingPrice: 29, description: 'La ville lumiere, avec ses monuments iconiques et ses ruelles charmantes.' },
          { id: '2', name: 'Nice', imageUrl: '', carCount: 180, startingPrice: 32, description: 'La perle de la Cote d\'Azur, entre mer et montagne.' },
          { id: '3', name: 'Lyon', imageUrl: '', carCount: 150, startingPrice: 27, description: 'Capitale de la gastronomie francaise au coeur de la region Rhone-Alpes.' },
          { id: '4', name: 'Bordeaux', imageUrl: '', carCount: 120, startingPrice: 25, description: 'Porte d\'entree du fameux vignoble bordelais.' },
          { id: '5', name: 'Marseille', imageUrl: '', carCount: 160, startingPrice: 28, description: 'La cite phoceenne, vieille port et calanques a couper le souffle.' },
          { id: '6', name: 'Toulouse', imageUrl: '', carCount: 110, startingPrice: 24, description: 'La ville rose, capitale europeenne de l\'aeronautique.' },
          { id: '7', name: 'Strasbourg', imageUrl: '', carCount: 95, startingPrice: 26, description: 'Capitale europeenne avec son quartier de la Petite France.' },
          { id: '8', name: 'Lille', imageUrl: '', carCount: 85, startingPrice: 23, description: 'Vibrante metropole du nord, entre flamand et chic francais.' },
          { id: '9', name: 'Nantes', imageUrl: '', carCount: 90, startingPrice: 25, description: 'Ville d\'art et d\'histoire sur les bords de la Loire.' },
          { id: '10', name: 'Montpellier', imageUrl: '', carCount: 100, startingPrice: 27, description: 'Cite mediterraneenne dynamique et etudiante.' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="h-10 w-72 rounded-lg bg-petrol-50" />
          <div className="mt-12 flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[26rem] w-[20rem] flex-none rounded-[20px] bg-petrol-50" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-poster max-w-[15ch] text-[clamp(2rem,4.6vw,3.6rem)] text-ink">
              {d.destinations.title}
            </h2>
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink-2">
              {d.destinations.sub}
            </p>
          </div>
        </Reveal>

        <div
          ref={containerRef}
          className="hide-scrollbar stage mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {destinations.map((dest, idx) => {
            const imageUrl = dest.imageUrl || fallbackImages[idx % fallbackImages.length];
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, transform: 'translate3d(0,26px,0)' }}
                whileInView={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: Math.min(idx, 4) * 0.07, ease: [0.23, 1, 0.32, 1] }}
                className="w-[20rem] flex-none snap-start"
              >
                <Tilt max={7} scale={1.02}>
                  <button
                    onClick={() => openCity(dest.name)}
                    className="pressable group block h-[26rem] w-full overflow-hidden rounded-[20px] text-left shadow-[0_24px_50px_-28px_rgba(20,35,28,0.75)]"
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={imageUrl}
                        alt={dest.name}
                        className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="font-poster-md text-2xl text-paper">{dest.name}</h3>
                        <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-paper/80">
                          {(locale === 'en' && dest.descriptionEn) || dest.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-paper/25 pt-3.5">
                          <span className="flex items-center gap-1.5 text-[13px] text-paper/85">
                            <Car size={14} className="text-saffron-300" />
                            <span className="nums">{f.number(dest.carCount)}</span> {d.destinations.cars}
                          </span>
                          <span className="nums flex items-center gap-1.5 text-[13px] font-bold text-saffron-300">
                            {fmt(d.destinations.from, { price: f.euro(dest.startingPrice) })}
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
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
