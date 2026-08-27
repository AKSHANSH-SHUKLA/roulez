'use client';

import { Star, Ban, CreditCard, Fuel, Gauge, Lock, ShieldAlert } from 'lucide-react';
import { fuelPolicyKey, type RentalTerms } from '@/lib/rental-terms';
import { useDict, useFormat, fmt } from '@/lib/i18n';

/* Affichage des conditions commerciales. Ces composants ne calculent rien et
   ne contiennent aucun texte : tout vient de RentalTerms et du dictionnaire. */

export function RatingStars({ rating, reviews, compact = false }: { rating: number; reviews?: number; compact?: boolean }) {
  const d = useDict();
  const f = useFormat();
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-1.5">
      <span className="flex items-center gap-0.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={compact ? 12 : 14}
            className={i < full || (i === full && half) ? 'fill-saffron-500 text-saffron-500' : 'text-ink/20'}
          />
        ))}
      </span>
      <span className="nums text-[13px] font-bold text-ink">{rating.toFixed(1)}</span>
      {reviews != null && (
        <span className="nums text-[12px] text-ink-2">({f.number(reviews)} {d.common.reviews})</span>
      )}
      <span className="sr-only">
        {fmt(d.terms.ratingAria, { rating: rating.toFixed(1), count: reviews ?? 0 })}
      </span>
    </span>
  );
}

export function CancellationBadge({ terms, compact = false }: { terms: RentalTerms; compact?: boolean }) {
  const d = useDict();
  if (!terms.freeCancellation) {
    return (
      <span className={`label-tight inline-flex items-center gap-1.5 rounded-full bg-ink/8 px-2.5 py-1 text-ink-2 ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
        <Ban size={compact ? 11 : 12} />
        {d.terms.paidCancellation}
      </span>
    );
  }
  return (
    <span className={`label-tight inline-flex items-center gap-1.5 rounded-full bg-petrol-500 px-2.5 py-1 text-paper ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
      <Ban size={compact ? 11 : 12} />
      {fmt(d.terms.freeCancellation, { hours: terms.cancellationHours })}
    </span>
  );
}

/** Libelles courts, partages entre la carte de resultat et la fiche. */
export function useTermLabels(terms: RentalTerms) {
  const d = useDict();
  const f = useFormat();
  return {
    deposit: fmt(d.terms.depositShort, { amount: f.euro(terms.deposit) }),
    excess: fmt(d.terms.excessShort, { amount: f.euro(terms.excess) }),
    fuel: d.terms.fuelPolicy[fuelPolicyKey[terms.fuelPolicy]],
    fuelHelp: d.terms.fuelPolicyHelp[fuelPolicyKey[terms.fuelPolicy]],
    mileage: terms.unlimitedMileage
      ? d.terms.unlimitedMileage
      : fmt(d.terms.mileagePerDay, { km: terms.kmPerDay ?? 0 }),
    cards: terms.acceptsDebitCard ? d.terms.cardsBoth : d.terms.cardsCreditOnly,
  };
}

/** Ligne compacte pour une carte de resultat. */
export function TermsRow({ terms }: { terms: RentalTerms }) {
  const l = useTermLabels(terms);
  const items = [
    { icon: Lock, label: l.deposit },
    { icon: ShieldAlert, label: l.excess },
    { icon: Fuel, label: l.fuel },
    { icon: Gauge, label: l.mileage },
    { icon: CreditCard, label: l.cards },
  ];
  return (
    <ul className="grid grid-cols-1 gap-y-1.5 text-[12px] text-ink-2 sm:grid-cols-2 sm:gap-x-3">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-1.5">
          <it.icon size={13} className="shrink-0 text-petrol-500" />
          <span className="truncate">{it.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Bloc detaille pour la fiche vehicule. */
export function TermsTable({ terms }: { terms: RentalTerms }) {
  const d = useDict();
  const f = useFormat();
  const l = useTermLabels(terms);
  const t = d.terms.table;

  const rows = [
    { icon: Lock, label: t.deposit, value: f.euro(terms.deposit), help: t.depositHelp },
    { icon: ShieldAlert, label: t.excess, value: f.euro(terms.excess), help: t.excessHelp },
    {
      icon: Ban,
      label: t.cancellation,
      value: terms.freeCancellation ? fmt(t.cancellationFree, { hours: terms.cancellationHours }) : t.cancellationNone,
      help: terms.freeCancellation ? t.cancellationFreeHelp : t.cancellationNoneHelp,
    },
    {
      icon: CreditCard,
      label: t.payment,
      value: l.cards,
      help: terms.acceptsDebitCard ? t.paymentBothHelp : t.paymentCreditHelp,
    },
    { icon: Fuel, label: t.fuel, value: l.fuel, help: l.fuelHelp },
    {
      icon: Gauge,
      label: t.mileage,
      value: l.mileage,
      help: terms.unlimitedMileage ? t.mileageUnlimitedHelp : t.mileageLimitedHelp,
    },
  ];

  return (
    <ul className="divide-y divide-ink/10 rounded-[16px] border border-ink/12 bg-paper">
      {rows.map((r) => (
        <li key={r.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-start sm:gap-4">
          <span className="flex items-center gap-2 sm:w-[16rem] sm:shrink-0">
            <r.icon size={16} className="shrink-0 text-petrol-500" />
            <span className="text-[14px] font-bold text-ink">{r.label}</span>
          </span>
          <span className="flex-1">
            <span className="block text-[15px] font-semibold text-petrol-700">{r.value}</span>
            <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-2">{r.help}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
