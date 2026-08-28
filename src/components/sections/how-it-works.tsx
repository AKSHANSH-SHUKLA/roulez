'use client';

import { Reveal } from '@/components/motion/tilt';
import { useDict } from '@/lib/i18n';

export default function HowItWorks() {
  const d = useDict();
  const steps = d.howItWorks.steps.map((s, i) => ({ ...s, n: `0${i + 1}` }));

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-petrol-900/60" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-petrol-700/30" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <h2 className="font-poster max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] text-paper">
            {d.howItWorks.title}
          </h2>
        </Reveal>

        <div className="mt-16 space-y-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.09}>
              <div
                className="group grid grid-cols-1 items-start gap-6 border-t border-paper/15 py-9 md:grid-cols-12 md:gap-10"
                style={{ marginLeft: `calc(${i} * 5%)` }}
              >
                <span className="nums font-poster col-span-2 text-[clamp(2.4rem,5vw,4rem)] leading-none text-saffron-300 transition-colors duration-300 group-hover:text-saffron-500">
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
