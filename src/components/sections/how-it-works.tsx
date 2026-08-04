'use client';

import { Search, GitCompareArrows, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Search,
    title: '1. Recherchez',
    description:
      'Entrez votre lieu de prise en charge, les dates de location et vos preferences. Notre moteur de recherche parcourt les offres de tous nos partenaires en un instant.',
  },
  {
    number: 2,
    icon: GitCompareArrows,
    title: '2. Comparez',
    description:
      'Comparez les prix, les vehicules et les conditions de location cote a cote. Filtrez par categorie, transmission ou fournisseur pour trouver l\'offre ideale.',
  },
  {
    number: 3,
    icon: CheckCircle,
    title: '3. Reservez',
    description:
      'Une fois votre choix fait, reservez en quelques clics. Vous recevrez une confirmation immediate par email avec tous les details de votre location.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 font-[Inter]">Comment ca marche</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold mx-auto mb-4 flex items-center justify-center font-[Inter]">
                  {step.number}
                </div>
                <Icon size={32} className="text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-gray-900 mb-2 font-[Inter]">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-[Inter]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
