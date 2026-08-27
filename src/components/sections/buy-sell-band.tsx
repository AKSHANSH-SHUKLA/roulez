'use client';

import { ArrowUpRight, Gauge, FileText, Tag, Users } from 'lucide-react';
import { Reveal } from '@/components/motion/tilt';
import { useAppStore } from '@/lib/store';
import { useDict } from '@/lib/i18n';

export default function BuySellBand() {
  const d = useDict();
  const { setPage, setBuySellTab, setSaleFilters } = useAppStore();

  const panels = [
    {
      id: 'acheter',
      kicker: '01',
      ...d.buySellBand.buy,
      icons: [Gauge, FileText, Users],
      tone: 'bg-paper text-ink',
      accentText: 'text-terra-500',
      accent: 'bg-petrol-600 text-paper hover:bg-petrol-700',
    },
    {
      id: 'vendre',
      kicker: '02',
      ...d.buySellBand.sell,
      icons: [Tag, Users, FileText],
      tone: 'bg-ink text-paper',
      accentText: 'text-saffron-500',
      accent: 'bg-saffron-500 text-ink hover:bg-saffron-300',
    },
  ];

  return (
    <section id="achat-vente" className="relative overflow-hidden bg-saffron-300 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-terra-300/55" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-poster max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] text-ink">
              {d.buySellBand.title}
            </h2>
            <p className="max-w-[36ch] text-[15px] leading-relaxed text-ink-2">
              {d.buySellBand.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {panels.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div className={`flex h-full flex-col rounded-[20px] p-8 md:p-10 ${p.tone}`}>
                <span className={`nums font-poster text-4xl ${p.accentText}`}>{p.kicker}</span>
                <h3 className="font-poster mt-4 text-[clamp(1.8rem,3.2vw,2.6rem)]">{p.title}</h3>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed opacity-80">{p.body}</p>

                <ul className="mt-7 space-y-3">
                  {p.points.map((label, i) => {
                    const Icon = p.icons[i];
                    return (
                      <li key={label} className="flex items-center gap-2.5 text-[15px]">
                        <Icon size={17} className={`shrink-0 ${p.accentText}`} />
                        {label}
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => {
                    if (p.id === 'acheter') setSaleFilters({});
                    setBuySellTab(p.id === 'vendre' ? 'vendre' : 'acheter');
                    setPage('buy-sell');
                  }}
                  className={`pressable mt-9 flex w-fit items-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-bold transition-colors duration-200 ${p.accent}`}
                >
                  {p.cta}
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
