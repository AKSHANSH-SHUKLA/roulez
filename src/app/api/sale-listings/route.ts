import { NextRequest, NextResponse } from 'next/server';
import { CarSaleListing } from '@/lib/types';

let listings: CarSaleListing[] = [
  {
    id: 'lst-1',
    title: 'Renault Clio 2021 - Excellent etat',
    brand: 'Renault',
    model: 'Clio',
    year: 2021,
    mileage: 35000,
    price: 11900,
    fuelType: 'essence',
    transmission: 'manual',
    color: 'blanc',
    description: 'Renault Clio en excellent etat, entretien regulier, premiere main. Equipements complets avec GPS et camera de recul.',
    imageUrl: '/cars/renault-clio.jpg',
    sellerName: 'Pierre Dupont',
    sellerPhone: '+33 6 12 34 56 78',
    sellerEmail: 'pierre.dupont@email.com',
    location: 'Lyon',
    condition: 'excellent',
    createdAt: '2024-11-15T10:00:00.000Z',
  },
  {
    id: 'lst-2',
    title: 'Peugeot 3008 2022 - SUV Familial',
    brand: 'Peugeot',
    model: '3008',
    year: 2022,
    mileage: 28000,
    price: 24500,
    fuelType: 'diesel',
    transmission: 'automatic',
    color: 'noir',
    description: 'SUV familial parfait pour les longs trajets. Finition haut de gamme, toit panoramique, sieges cuir.',
    imageUrl: '/cars/peugeot-3008.jpg',
    sellerName: 'Marie Laurent',
    sellerPhone: '+33 6 23 45 67 89',
    sellerEmail: 'marie.laurent@email.com',
    location: 'Paris',
    condition: 'excellent',
    createdAt: '2024-11-10T14:30:00.000Z',
  },
  {
    id: 'lst-3',
    title: 'Citroen C3 2020 - Ville',
    brand: 'Citroen',
    model: 'C3',
    year: 2020,
    mileage: 52000,
    price: 9500,
    fuelType: 'essence',
    transmission: 'manual',
    color: 'gris',
    description: 'Citroen C3 ideal pour la ville. Compact, economique et facile a stationner.',
    imageUrl: '/cars/citroen-c3.jpg',
    sellerName: 'Jean Martin',
    sellerPhone: '+33 6 34 56 78 90',
    sellerEmail: 'jean.martin@email.com',
    location: 'Marseille',
    condition: 'bon',
    createdAt: '2024-11-08T09:15:00.000Z',
  },
  {
    id: 'lst-4',
    title: 'Volkswagen Golf 2021',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    mileage: 40000,
    price: 17500,
    fuelType: 'diesel',
    transmission: 'manual',
    color: 'blanc',
    description: 'Volkswagen Golf en tres bon etat. Confortable et fiable, ideale pour les trajets quotidiens.',
    imageUrl: '/cars/volkswagen-golf.jpg',
    sellerName: 'Sophie Bernard',
    sellerPhone: '+33 6 45 67 89 01',
    sellerEmail: 'sophie.bernard@email.com',
    location: 'Bordeaux',
    condition: 'excellent',
    createdAt: '2024-11-05T16:45:00.000Z',
  },
  {
    id: 'lst-5',
    title: 'BMW Serie 3 2019 - Premium',
    brand: 'BMW',
    model: 'Serie 3',
    year: 2019,
    mileage: 65000,
    price: 28900,
    fuelType: 'diesel',
    transmission: 'automatic',
    color: 'bleu',
    description: 'BMW Serie 3 premium avec finition M Sport. Performance et elegance reunies.',
    imageUrl: '/cars/bmw-serie-3.jpg',
    sellerName: 'Lucas Moreau',
    sellerPhone: '+33 6 56 78 90 12',
    sellerEmail: 'lucas.moreau@email.com',
    location: 'Nice',
    condition: 'bon',
    createdAt: '2024-10-28T11:20:00.000Z',
  },
  {
    id: 'lst-6',
    title: 'Dacia Duster 2022 - 4x4',
    brand: 'Dacia',
    model: 'Duster',
    year: 2022,
    mileage: 18000,
    price: 15900,
    fuelType: 'diesel',
    transmission: 'manual',
    color: 'vert',
    description: 'Dacia Duster 4x4 quasi neuf. Parfait pour les aventures hors des sentiers battus.',
    imageUrl: '/cars/dacia-duster.jpg',
    sellerName: 'Claire Petit',
    sellerPhone: '+33 6 67 89 01 23',
    sellerEmail: 'claire.petit@email.com',
    location: 'Toulouse',
    condition: 'excellent',
    createdAt: '2024-10-25T08:00:00.000Z',
  },
  {
    id: 'lst-7',
    title: 'Tesla Model 3 2023',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    mileage: 12000,
    price: 34900,
    fuelType: 'electrique',
    transmission: 'automatic',
    color: 'blanc',
    description: 'Tesla Model 3 avec autopilote. Faible kilometrage, batterie en parfait etat. Autonomie 500km.',
    imageUrl: '/cars/tesla-model-3.jpg',
    sellerName: 'Antoine Dubois',
    sellerPhone: '+33 6 78 90 12 34',
    sellerEmail: 'antoine.dubois@email.com',
    location: 'Paris',
    condition: 'excellent',
    createdAt: '2024-10-20T13:30:00.000Z',
  },
  {
    id: 'lst-8',
    title: 'Fiat 500 2019 - Petite ville',
    brand: 'Fiat',
    model: '500',
    year: 2019,
    mileage: 72000,
    price: 8900,
    fuelType: 'essence',
    transmission: 'manual',
    color: 'rouge',
    description: 'Fiat 500 iconique. Parfaite pour se garer en ville. Quelques rayures mineures mais mecanique sans probleme.',
    imageUrl: '/cars/fiat-500.jpg',
    sellerName: 'Emma Leroy',
    sellerPhone: '+33 6 89 01 23 45',
    sellerEmail: 'emma.leroy@email.com',
    location: 'Strasbourg',
    condition: 'correct',
    createdAt: '2024-10-15T17:00:00.000Z',
  },
];

function randomChars(length: number, charset: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let filtered = [...listings];

  const condition = searchParams.get('condition');
  if (condition) {
    filtered = filtered.filter((l) => l.condition.toLowerCase() === condition.toLowerCase());
  }

  const fuelType = searchParams.get('fuelType');
  if (fuelType) {
    filtered = filtered.filter((l) => l.fuelType.toLowerCase() === fuelType.toLowerCase());
  }

  const minPrice = searchParams.get('minPrice');
  if (minPrice) {
    filtered = filtered.filter((l) => l.price >= Number(minPrice));
  }

  const maxPrice = searchParams.get('maxPrice');
  if (maxPrice) {
    filtered = filtered.filter((l) => l.price <= Number(maxPrice));
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const listing: CarSaleListing = {
    id: 'lst-' + randomChars(6, '0123456789'),
    title: body.title,
    brand: body.brand,
    model: body.model,
    year: body.year,
    mileage: body.mileage,
    price: body.price,
    fuelType: body.fuelType,
    transmission: body.transmission,
    color: body.color,
    description: body.description,
    imageUrl: body.imageUrl || '/cars/renault-clio.jpg',
    sellerName: body.sellerName,
    sellerPhone: body.sellerPhone,
    sellerEmail: body.sellerEmail,
    location: body.location,
    condition: body.condition,
    createdAt: new Date().toISOString(),
  };

  listings.push(listing);

  return NextResponse.json({ success: true, data: listing });
}
