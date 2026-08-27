'use client';

import { Star, Ban, CreditCard, Fuel, Gauge, Lock, ShieldAlert } from 'lucide-react';
import {
  cardsLabel, euro, fuelPolicyHelp, fuelPolicyLabels, mileageLabel,
  type RentalTerms,
} from '@/lib/rental-terms';

/* Affichage des conditions commerciales. Ces composants ne calculent rien :
   ils recoivent un RentalTerms produit par src/lib/rental-terms.ts. */

export function RatingStars({ rating, reviews, compact = false }: { rating: number; reviews?: number; compact?: boolean }) {
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
        <span className="nums text-[12px] text-ink-2">({reviews.toLocaleString('fr-FR')} avis)</span>
      )}
      <span className="sr-only">Note {rating.toFixed(1)} sur 5{reviews != null ? `, ${reviews} avis` : ''}</span>
    </span>
  );
}

export function CancellationBadge({ terms, compact = false }: { terms: RentalTerms; compact?: boolean }) {
  if (!terms.freeCancellation) {
    return (
      <span className={`label-tight inline-flex items-center gap-1.5 rounded-full bg-ink/8 px-2.5 py-1 text-ink-2 ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
        <Ban size={compact ? 11 : 12} />
        Annulation payante
      </span>
    );
  }
  return (
    <span className={`label-tight inline-flex items-center gap-1.5 rounded-full bg-petrol-500 px-2.5 py-1 text-paper ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
      <Ban size={compact ? 11 : 12} />
      Annulation gratuite {terms.cancellationHours}h
    </span>
  );
}

/** Ligne compacte pour une carte de resultat. */
export function TermsRow({ terms }: { terms: RentalTerms }) {
  const items = [
    { icon: Lock, label: `Caution ${euro(terms.deposit)}` },
    { icon: ShieldAlert, label: `Franchise ${euro(terms.excess)}` },
    { icon: Fuel, label: fuelPolicyLabels[terms.fuelPolicy] },
    { icon: Gauge, label: mileageLabel(terms) },
    { icon: CreditCard, label: cardsLabel(terms) },
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
  const rows = [
    {
      icon: Lock,
      label: 'Caution',
      value: euro(terms.deposit),
      help: 'Montant bloque sur votre carte au comptoir puis libere au retour du vehicule.',
    },
    {
      icon: ShieldAlert,
      label: 'Franchise',
      value: euro(terms.excess),
      help: 'Somme qui reste a votre charge en cas de dommage. Reductible avec une assurance complementaire.',
    },
    {
      icon: Ban,
      label: 'Annulation',
      value: terms.freeCancellation ? `Gratuite jusqu a ${terms.cancellationHours}h avant` : 'Non remboursable',
      help: terms.freeCancellation
        ? 'Annulez sans frais dans ce delai, remboursement integral.'
        : 'Ce tarif ne permet pas l annulation gratuite.',
    },
    {
      icon: CreditCard,
      label: 'Moyen de paiement au comptoir',
      value: cardsLabel(terms),
      help: terms.acceptsDebitCard
        ? 'Ce loueur accepte la carte de debit pour la caution, au nom du conducteur principal.'
        : 'La caution doit etre bloquee sur une carte de credit au nom du conducteur principal. Une carte de debit sera refusee.',
    },
    {
      icon: Fuel,
      label: 'Politique carburant',
      value: fuelPolicyLabels[terms.fuelPolicy],
      help: fuelPolicyHelp[terms.fuelPolicy],
    },
    {
      icon: Gauge,
      label: 'Kilometrage',
      value: mileageLabel(terms),
      help: terms.unlimitedMileage
        ? 'Roulez autant que vous voulez, aucun surcout au kilometre.'
        : 'Au dela du forfait, chaque kilometre supplementaire est facture par le loueur.',
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
