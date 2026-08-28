'use client';

import { Reveal } from '@/components/motion/tilt';
import { useDict } from '@/lib/i18n';

const style = [
  { tilt: '-2.2deg', card: 'bg-paper border border-ink/10' },
  { tilt: '1.6deg', card: 'bg-paper border border-ink/10' },
  { tilt: '-1.1deg', card: 'bg-paper border border-ink/10' },
];

export default function Testimonials() {
  const d = useDict();
  const testimonials = d.testimonials.items.map((t, i) => ({ ...t, ...style[i] }));

  return (
    <section className="relative overflow-hidden bg-paper-2 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-paper/70" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-petrol-50/60" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <h2 className="font-poster max-w-[14ch] text-[clamp(2rem,4.6vw,3.6rem)] text-ink">
            {d.testimonials.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className={i === 1 ? 'md:mt-10' : ''}>
              <figure
                className={`h-full rounded-[20px] ${t.card} p-7 shadow-[0_26px_50px_-26px_rgba(20,35,28,0.55)] transition-transform duration-300 hover:!rotate-0`}
                style={{ transform: `rotate(${t.tilt})` }}
              >
                <div className="mb-5 flex gap-1" aria-label={d.testimonials.starsLabel}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="text-saffron-700" aria-hidden>&#9733;</span>
                  ))}
                </div>
                <blockquote className="text-[17px] leading-relaxed text-ink">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-ink/20 pt-4">
                  <span className="block font-bold text-ink">{t.name}</span>
                  <span className="block text-sm text-ink-2">{t.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
