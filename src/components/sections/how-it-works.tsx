'use client';

import { Reveal } from '@/components/motion/tilt';

const steps = [
  {
    n: '01',
    title: 'Recherchez',
    description:
      'Entrez votre lieu de prise en charge, les dates de location et vos preferences. Notre moteur parcourt les offres de tous nos partenaires en un instant.',
  },
  {
    n: '02',
    title: 'Comparez',
    description:
      "Comparez les prix, les vehicules et les conditions cote a cote. Filtrez par categorie, transmission ou fournisseur pour trouver l'offre ideale.",
  },
  {
    n: '03',
    title: 'Reservez',
    description:
      'Une fois votre choix fait, reservez en quelques clics. Vous recevrez une confirmation immediate par email avec tous les details de votre location.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-terra-500 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-terra-700/45" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-saffron-500/30" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <h2 className="font-poster max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] text-paper">
            Trois etapes, rien de plus
          </h2>
        </Reveal>

        <div className="mt-16 space-y-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.09}>
              <div
                className="group grid grid-cols-1 items-start gap-6 border-t border-paper/20 py-9 md:grid-cols-12 md:gap-10"
                style={{ marginLeft: `calc(${i} * 5%)` }}
              >
                <span className="nums font-poster col-span-2 text-[clamp(2.4rem,5vw,4rem)] leading-none text-paper transition-colors duration-300 group-hover:text-saffron-300">
                  {s.n}
                </span>
                <h3 className="font-poster-md col-span-3 text-2xl text-paper md:text-3xl">{s.title}</h3>
                <p className="col-span-7 max-w-[62ch] text-[15px] leading-relaxed text-paper/85">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
