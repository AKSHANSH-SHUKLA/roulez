import { NextResponse } from 'next/server';
import { InsurancePlan } from '@/lib/types';

const plans: InsurancePlan[] = [
  {
    id: 'ins-1',
    name: 'Basique',
    nameEn: 'Basic',
    description: 'Protection essentielle',
    descriptionEn: 'Essential cover',
    dailyPrice: 8,
    coverage: ['Franchise reduite', 'Assurance collision de base'],
    coverageEn: ['Reduced excess', 'Basic collision cover'],
  },
  {
    id: 'ins-2',
    name: 'Standard',
    nameEn: 'Standard',
    description: 'Protection recommandee',
    descriptionEn: 'Recommended cover',
    dailyPrice: 15,
    coverage: ['Franchise reduite', 'Assurance collision', 'Protection vol', 'Assurance accidents personnels'],
    coverageEn: ['Reduced excess', 'Collision cover', 'Theft protection', 'Personal accident cover'],
  },
  {
    id: 'ins-3',
    name: 'Premium',
    nameEn: 'Premium',
    description: 'Protection totale',
    descriptionEn: 'Full cover',
    dailyPrice: 25,
    coverage: ['Franchise zero', 'Assurance tous risques', 'Protection vol', 'Assurance accidents personnels', 'Assistance route 24/7', 'Effets personnels couverts'],
    coverageEn: ['Zero excess', 'Comprehensive cover', 'Theft protection', 'Personal accident cover', '24/7 roadside assistance', 'Personal belongings covered'],
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: plans });
}
