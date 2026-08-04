import { NextResponse } from 'next/server';
import { InsurancePlan } from '@/lib/types';

const plans: InsurancePlan[] = [
  {
    id: 'ins-1',
    name: 'Basique',
    description: 'Protection essentielle',
    dailyPrice: 8,
    coverage: ['Franchise reduite', 'Assurance collision de base'],
  },
  {
    id: 'ins-2',
    name: 'Standard',
    description: 'Protection recommandee',
    dailyPrice: 15,
    coverage: ['Franchise reduite', 'Assurance collision', 'Protection vol', 'Assurance accidents personnels'],
  },
  {
    id: 'ins-3',
    name: 'Premium',
    description: 'Protection totale',
    dailyPrice: 25,
    coverage: ['Franchise zero', 'Assurance tous risques', 'Protection vol', 'Assurance accidents personnels', 'Assistance route 24/7', 'Effets personnels couverts'],
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: plans });
}
