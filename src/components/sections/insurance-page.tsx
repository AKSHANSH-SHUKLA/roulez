'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, ShieldAlert, CreditCard, Info } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { euro } from '@/lib/rental-terms';
import type { InsurancePlan } from '@/lib/types';

const explainers = [
  {
    icon: ShieldAlert,
    title: 'Franchise',
    body: "C est la somme qui reste a votre charge si le vehicule est abime, meme si vous n etes pas responsable. Selon la categorie, elle va de 900 a 2 600 EUR chez nos partenaires. Une assurance complementaire la reduit ou l annule.",
  },
  {
    icon: Lock,
    title: 'Caution',
    body: "Ce n est pas un paiement. Le loueur bloque un montant sur votre carte au comptoir et le libere apres le retour du vehicule, en general sous 3 a 15 jours. La caution ne fait jamais partie du prix total affiche.",
  },
  {
    icon: CreditCard,
    title: 'Carte de credit ou de debit',
    body: "Certains loueurs exigent une carte de credit au nom du conducteur pour bloquer la caution, et refusent la carte de debit au comptoir. Nous affichons cette contrainte sur chaque offre, avant la reservation.",
  },
  {
    icon: Info,
    title: 'Avez-vous vraiment besoin d une option ?',
    body: "Si votre carte bancaire haut de gamme ou votre assurance auto personnelle couvre deja la location, l option du loueur fait doublon. Verifiez vos contrats avant de payer deux fois.",
  },
];

export default function InsurancePage() {
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
            Retour a l accueil
          </button>
          <h1 className="font-poster max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.2rem)]">
            Assurance et franchise
          </h1>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-paper/85">
            Le poste ou les loueurs gagnent le plus d argent, et celui que personne n explique.
            Voici les regles, en francais simple.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {explainers.map((e) => (
            <article key={e.title} className="rounded-[20px] bg-paper p-7">
              <e.icon size={22} className="text-azure-500" />
              <h2 className="font-poster-md mt-4 text-xl text-ink">{e.title}</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{e.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-8 md:px-10">
        <h2 className="font-poster text-[clamp(1.8rem,3.6vw,2.8rem)] text-ink">Nos formules</h2>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">
          Facultatives. Le prix est par jour de location et s ajoute au total affiche sur la fiche du vehicule.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.id} className="flex flex-col rounded-[20px] border border-ink/12 bg-paper p-7">
              <h3 className="font-poster-md text-2xl text-ink">{plan.name}</h3>
              <p className="mt-1 text-[14px] text-ink-2">{plan.description}</p>
              <p className="nums mt-5 font-poster text-3xl text-azure-700">
                {plan.dailyPrice} EUR<span className="text-base font-medium text-ink-2">/jour</span>
              </p>
              <p className="nums mt-1 text-[13px] text-ink-2">
                soit {euro(plan.dailyPrice * 7)} pour une semaine
              </p>
              <ul className="mt-5 space-y-2">
                {plan.coverage.map((c) => (
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
          Roulez est un comparateur. Les formules ci-dessus sont des produits de nos partenaires
          loueurs : nous n avons pas le statut de courtier en assurance et nous ne vendons pas
          d assurance en notre nom. Les conditions exactes figurent dans le contrat du loueur.
        </p>
      </section>
    </div>
  );
}
