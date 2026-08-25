'use client';

import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Reveal } from '@/components/motion/tilt';

export default function CtaBand() {
  const { setPage } = useAppStore();
  return (
    <section className="relative overflow-hidden bg-azure-700 py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-azure-500/60" />
        <div className="absolute -bottom-32 -left-10 h-96 w-96 rounded-full bg-petrol-700/50" />
      </div>
      <div className="relative mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-8 px-6 md:px-10">
        <div>
          <Reveal>
            <h2 className="font-poster max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.9rem)] text-paper">
              Vous vendez votre voiture ?
            </h2>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-azure-300">
              Publiez votre annonce et touchez les acheteurs de toute la France.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <button
            onClick={() => setPage('buy-sell')}
            className="pressable flex items-center gap-2.5 rounded-[14px] bg-saffron-500 px-8 py-4 text-base font-bold text-ink transition-colors duration-200 hover:bg-saffron-300"
          >
            Vendre ma voiture
            <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
