'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import type { Destination } from '@/lib/types';

const picsumSeeds = [
  'paris-dest', 'nice-dest', 'lyon-dest', 'bordeaux-dest',
  'marseille-dest', 'toulouse-dest', 'strasbourg-dest', 'lille-dest',
  'nantes-dest', 'montpellier-dest',
];

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch('/api/destinations');
        if (res.ok) {
          const data: Destination[] = await res.json();
          setDestinations(data);
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 font-[Inter]">Destinations Populaires</h2>
          <div className="flex gap-6 overflow-x-auto px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[280px] h-64 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 font-[Inter]">Destinations Populaires</h2>

        <motion.div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {destinations.map((dest, idx) => {
            const imageUrl = dest.imageUrl || `https://picsum.photos/seed/${picsumSeeds[idx % picsumSeeds.length]}/400/250`;
            return (
              <div
                key={dest.id}
                className="min-w-[280px] flex-shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer bg-white group"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 font-[Inter]">{dest.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2 font-[Inter]">{dest.description}</p>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500 font-[Inter]">
                    <span className="flex items-center gap-1">
                      <Car size={14} className="text-emerald-600" />
                      {dest.carCount} voitures
                    </span>
                    <span className="font-semibold text-emerald-600">
                      A partir de {dest.startingPrice} EUR/jour
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
