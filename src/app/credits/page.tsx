import type { Metadata } from 'next';
import credits from '../../../public/image-credits.json';

export const metadata: Metadata = {
  title: 'Crédits photos — Roulez',
  description:
    'Crédits et licences des photographies de véhicules et de destinations utilisées sur Roulez.',
};

type Credit = {
  name: string;
  file: string;
  author: string;
  license: string;
  page: string;
};

function Section({ title, items }: { title: string; items: Record<string, Credit> }) {
  const rows = Object.values(items).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {title} <span className="text-gray-400 font-normal">({rows.length})</span>
      </h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-emerald-800 text-white text-left">
              <th className="px-4 py-2.5 font-semibold">Sujet</th>
              <th className="px-4 py-2.5 font-semibold">Auteur</th>
              <th className="px-4 py-2.5 font-semibold">Licence</th>
              <th className="px-4 py-2.5 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.file} className="border-t border-gray-100 odd:bg-gray-50/60">
                <td className="px-4 py-2 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-2 text-gray-600">{c.author}</td>
                <td className="px-4 py-2 text-gray-600 whitespace-nowrap">{c.license}</td>
                <td className="px-4 py-2">
                  <a
                    href={c.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline"
                  >
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

export default function CreditsPage() {
  const data = credits as unknown as {
    cars: Record<string, Credit>;
    destinations: Record<string, Credit>;
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      <a href="/" className="text-emerald-700 hover:underline text-sm">
        ← Retour à l&apos;accueil
      </a>
      <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-3">Crédits photos</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Les photographies de véhicules et de destinations affichées sur Roulez proviennent de{' '}
        <a
          href="https://commons.wikimedia.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:underline"
        >
          Wikimedia Commons
        </a>{' '}
        et sont réutilisées sous licence libre. Chaque image est créditée ci-dessous avec son auteur,
        sa licence et un lien vers le fichier d&apos;origine. Les images sont illustratives : le
        véhicule fourni peut différer du modèle photographié.
      </p>

      <Section title="Véhicules" items={data.cars} />
      <Section title="Destinations" items={data.destinations} />

      <p className="text-xs text-gray-400 mt-10">
        Les licences CC BY et CC BY-SA exigent l&apos;attribution de l&apos;auteur et l&apos;indication
        de la licence ; les œuvres du domaine public et sous CC0 sont libres de droits.
      </p>
    </main>
  );
}
