'use client';

import credits from '../../../public/image-credits.json';
import { useDict } from '@/lib/i18n';

type Credit = { name: string; file: string; author: string; license: string; page: string };

const data = credits as { cars: Record<string, Credit>; destinations: Record<string, Credit> };

function Section({ title, items, labels }: { title: string; items: Record<string, Credit>; labels: { subject: string; author: string; licence: string; source: string } }) {
  const rows = Object.values(items).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section className="mb-12">
      <h2 className="font-poster-md text-2xl text-ink">
        {title} <span className="nums font-normal text-ink-2">({rows.length})</span>
      </h2>
      <div className="mt-4 overflow-x-auto rounded-[16px] border border-ink/12">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-petrol-700 text-left text-paper">
              <th className="label-tight px-4 py-3 text-[11px]">{labels.subject}</th>
              <th className="label-tight px-4 py-3 text-[11px]">{labels.author}</th>
              <th className="label-tight px-4 py-3 text-[11px]">{labels.licence}</th>
              <th className="label-tight px-4 py-3 text-[11px]">{labels.source}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.file} className="border-t border-ink/10 odd:bg-paper-2/60">
                <td className="px-4 py-2.5 font-semibold text-ink">{c.name}</td>
                <td className="px-4 py-2.5 text-ink-2">{c.author}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-ink-2">{c.license}</td>
                <td className="px-4 py-2.5">
                  <a href={c.page} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
                    Wikimedia Commons
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function CreditsView() {
  const d = useDict();
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 md:px-10">
      <a href="/" className="text-[15px] font-semibold text-petrol-600 hover:underline">
        ← {d.insurancePage.back}
      </a>
      <h1 className="font-poster mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-ink">{d.credits.title}</h1>
      <p className="mt-4 max-w-[70ch] text-[16px] leading-relaxed text-ink-2">{d.credits.sub}</p>

      <div className="mt-12">
        <Section title={d.credits.cars} items={data.cars} labels={d.credits} />
        <Section title={d.credits.destinations} items={data.destinations} labels={d.credits} />
      </div>
    </main>
  );
}
