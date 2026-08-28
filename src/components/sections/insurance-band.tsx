'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/motion/tilt';
import { useAppStore } from '@/lib/store';
import { useDict, useLocale } from '@/lib/i18n';
import type { InsurancePlan } from '@/lib/types';

export default function InsuranceBand() {
  const d = useDict();
  const locale = useLocale();
  const { setPage } = useAppStore();
  const [plans, setPlans] = useState<InsurancePlan[]>([]);

  useEffect(() => {
    fetch('/api/insurance')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!json) return;
        const list: InsurancePlan[] = Array.isArray(json) ? json : (json?.data ?? []);
        setPlans(list);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="assurance" className="relative overflow-hidden bg-petrol-700 py-24 text-paper md:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-petrol-900/45" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-poster max-w-[17ch] text-[clamp(2rem,4.6vw,3.6rem)]">
              {d.insuranceBand.title}
            </h2>
            <p className="max-w-[38ch] text-[15px] leading-relaxed text-paper/80">
              {d.insuranceBand.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {(plans.length > 0 ? plans : []).map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-[20px] bg-paper p-7 text-ink">
                <h3 className="font-poster-md text-2xl">{(locale === 'en' && plan.nameEn) || plan.name}</h3>
                <p className="mt-1 text-[14px] text-ink-2">{(locale === 'en' && plan.descriptionEn) || plan.description}</p>
                <p className="nums mt-5 font-poster text-3xl text-petrol-700">
                  {plan.dailyPrice} EUR<span className="text-base font-medium text-ink-2">{d.common.perDay}</span>
                </p>
                <ul className="mt-5 space-y-2">
                  {((locale === 'en' && plan.coverageEn) || plan.coverage).map((c) => (
                    <li key={c} className="flex items-start gap-2 text-[14px] text-ink-2">
                      <ShieldCheck size={15} className="mt-0.5 shrink-0 text-petrol-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <button
          onClick={() => setPage('insurance')}
          className="pressable mt-10 flex items-center gap-2 rounded-[12px] bg-paper px-6 py-3.5 text-[15px] font-bold text-petrol-700 transition-colors duration-200 hover:bg-saffron-300 hover:text-ink"
        >
          {d.insuranceBand.cta}
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}
