import { NextRequest, NextResponse } from 'next/server';
import { Location } from '@/lib/types';

const locations: Location[] = [
  { id: 'loc-1', name: 'Aeroport Paris CDG', city: 'Paris', type: 'airport', address: '95700 Roissy-en-France' },
  { id: 'loc-2', name: 'Aeroport Paris Orly', city: 'Paris', type: 'airport', address: '94390 Orly' },
  { id: 'loc-3', name: 'Gare du Nord', city: 'Paris', type: 'train_station', address: '75010 Paris' },
  { id: 'loc-4', name: 'Gare de Lyon', city: 'Paris', type: 'train_station', address: '75012 Paris' },
  { id: 'loc-5', name: 'Lyon Centre', city: 'Lyon', type: 'city', address: '69002 Lyon' },
  { id: 'loc-6', name: 'Aeroport Lyon Saint-Exupery', city: 'Lyon', type: 'airport', address: '69125 Colombier-Saugnieu' },
  { id: 'loc-7', name: 'Marseille Centre', city: 'Marseille', type: 'city', address: '13001 Marseille' },
  { id: 'loc-8', name: 'Aeroport Marseille Provence', city: 'Marseille', type: 'airport', address: '13727 Marignane' },
  { id: 'loc-9', name: 'Nice Centre', city: 'Nice', type: 'city', address: '06000 Nice' },
  { id: 'loc-10', name: 'Aeroport Nice Cote d\'Azur', city: 'Nice', type: 'airport', address: '06206 Nice' },
  { id: 'loc-11', name: 'Toulouse Centre', city: 'Toulouse', type: 'city', address: '31000 Toulouse' },
  { id: 'loc-12', name: 'Aeroport Toulouse-Blagnac', city: 'Toulouse', type: 'airport', address: '31700 Blagnac' },
  { id: 'loc-13', name: 'Bordeaux Centre', city: 'Bordeaux', type: 'city', address: '33000 Bordeaux' },
  { id: 'loc-14', name: 'Aeroport Bordeaux-Merignac', city: 'Bordeaux', type: 'airport', address: '33700 Merignac' },
  { id: 'loc-15', name: 'Strasbourg Centre', city: 'Strasbourg', type: 'city', address: '67000 Strasbourg' },
];

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q');

  if (!q) {
    return NextResponse.json({ success: true, data: locations });
  }

  const query = q.toLowerCase();
  const filtered = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(query) ||
      loc.city.toLowerCase().includes(query)
  );

  return NextResponse.json({ success: true, data: filtered });
}
