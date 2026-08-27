'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, ShieldAlert, CreditCard, Info } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useDict, useFormat, useLocale, fmt } from '@/lib/i18n';
import type { InsurancePlan } from '@/lib/types';

const explainerIcons = [ShieldAlert, Lock, CreditCard, Info];

export default function InsurancePage() {
  const d = useDict();
  const f = useFormat();
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
    <div className="bg-paper-2 pb-24">
      <section className="relative overflow-hidden bg-azure-700 py-16 text-paper md:py-24">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-16 h-[24rem] w-[24rem] rounded-full bg-azure-500/45" />
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
          <button
            onClick={() => setPage('home')}
            className="pressable mb-7 flex items-center gap-2 text-[15px] font-semibold text-paper/80 transition-colors duration-200 hover:text-paper"
          >
            <ArrowLeft size={18} />
            {d.insurancePage.back}
          </button>
          <h1 className="font-poster max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.2rem)]">
            {d.insurancePage.title}
          </h1>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-paper/85">{d.insurancePage.sub}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {d.insurancePage.explainers.map((e, i) => {
            const Icon = explainerIcons[i];
            return (
              <article key={e.title} className="rounded-[20px] bg-paper p-7">
                <Icon size={22} className="text-azure-500" />
                <h2 className="font-poster-md mt-4 text-xl text-ink">{e.title}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{e.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-8 md:px-10">
        <h2 className="font-poster text-[clamp(1.8rem,3.6vw,2.8rem)] text-ink">{d.insurancePage.formulasTitle}</h2>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{d.insurancePage.formulasSub}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.id} className="flex flex-col rounded-[20px] border border-ink/12 bg-paper p-7">
              <h3 className="font-poster-md text-2xl text-ink">{(locale === 'en' && plan.nameEn) || plan.name}</h3>
              <p className="mt-1 text-[14px] text-ink-2">{(locale === 'en' && plan.descriptionEn) || plan.description}</p>
              <p className="nums mt-5 font-poster text-3xl text-azure-700">
                {f.euro(plan.dailyPrice)}<span className="text-base font-medium text-ink-2">{d.common.perDay}</span>
              </p>
              <p className="nums mt-1 text-[13px] text-ink-2">
                {fmt(d.insurancePage.perWeek, { price: f.euro(plan.dailyPrice * 7) })}
              </p>
              <ul className="mt-5 space-y-2">
                {((locale === 'en' && plan.coverageEn) || plan.coverage).map((c: string) => (
                  <li key={c} className="flex items-start gap-2 text-[14px] text-ink-2">
                    <ShieldCheck size={15} className="mt-0.5 shrink-0 text-azure-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-[70ch] rounded-[16px] border border-ink/12 bg-paper p-5 text-[14px] leading-relaxed text-ink-2">
          {d.insurancePage.legal}
        </p>
      </section>
    </div>
  );
}
