'use client';

import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Reveal } from '@/components/motion/tilt';
import { useDict } from '@/lib/i18n';

export default function CtaBand() {
  const d = useDict();
  const { setPage, setBuySellTab } = useAppStore();
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-petrol-50" />
        <div className="absolute -bottom-32 -left-10 h-96 w-96 rounded-full bg-paper-2" />
      </div>
      <div className="relative mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-8 px-6 md:px-10">
        <div>
          <Reveal>
            <h2 className="font-poster max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.9rem)] text-ink">
              {d.cta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-ink-2">
              {d.cta.sub}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <button
            onClick={() => { setBuySellTab('vendre'); setPage('buy-sell'); }}
            className="pressable flex items-center gap-2.5 rounded-[14px] bg-ink px-8 py-4 text-base font-bold text-paper transition-colors duration-200 hover:bg-petrol-700"
          >
            {d.cta.button}
            <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
