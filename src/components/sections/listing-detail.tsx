'use client';

import { useState } from 'react';
import {
  ArrowLeft, Gauge, Fuel, Settings2, Calendar, Users, DoorOpen, Palette,
  Mail, Phone, MapPin, ShieldCheck, AlertTriangle, FileCheck2, Leaf, Hash,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { documentRules, CRIT_AIR_LABELS, CERFA_CESSION } from '@/lib/sale-rules';

const conditionLabels: Record<string, string> = {
  excellent: 'Excellent etat',
  bon: 'Bon etat',
  correct: 'Etat correct',
};

const transmissionLabels: Record<string, string> = {
  manual: 'Manuelle', manuelle: 'Manuelle',
  automatic: 'Automatique', automatique: 'Automatique',
};

/** On n'affiche jamais la plaque en entier dans une annonce publique. */
function maskPlate(plate?: string): string | null {
  if (!plate) return null;
  const p = plate.toUpperCase().replace(/\s/g, '');
  return p.length < 5 ? p : `${p.slice(0, 2)}-•••-${p.slice(-2)}`;
}

export default function ListingDetail() {
  const { selectedListing, setPage } = useAppStore();
  const [active, setActive] = useState(0);

  if (!selectedListing) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-lg text-ink-2">Aucune annonce selectionnee.</p>
        <button onClick={() => setPage('buy-sell')} className="pressable mt-5 rounded-[10px] bg-petrol-600 px-5 py-2.5 text-sm font-bold text-paper">
          Retour aux annonces
        </button>
      </div>
    );
  }

  const l = selectedListing;
  const gallery = l.images?.length ? l.images : [l.imageUrl];
  const rules = documentRules(l.firstRegistration ?? String(l.year));
  const provided = l.documents;

  const specs = [
    { icon: Calendar, label: 'Mise en circulation', value: l.firstRegistration ?? String(l.year) },
    { icon: Gauge, label: 'Kilometrage', value: `${l.mileage.toLocaleString('fr-FR')} km` },
    { icon: Fuel, label: 'Carburant', value: l.fuelType },
    { icon: Settings2, label: 'Transmission', value: transmissionLabels[l.transmission] ?? l.transmission },
    { icon: DoorOpen, label: 'Portes', value: l.doors ? String(l.doors) : '—' },
    { icon: Users, label: 'Places', value: l.seats ? String(l.seats) : '—' },
    { icon: Palette, label: 'Couleur', value: l.color || '—' },
    { icon: Users, label: 'Proprietaires', value: l.owners ? String(l.owners) : '—' },
    { icon: Leaf, label: 'CO2', value: l.co2 ? `${l.co2} g/km` : '—' },
    { icon: Hash, label: 'Puissance fiscale', value: l.fiscalPower ? `${l.fiscalPower} CV` : '—' },
  ];

  const flags = [
    l.mileageGuaranteed === false && { tone: 'warn', text: 'Kilometrage non garanti par le vendeur' },
    l.imported && { tone: 'warn', text: 'Vehicule importe' },
    l.accidented && { tone: 'warn', text: 'Vehicule accidente ou passe en procedure VEI' },
  ].filter(Boolean) as { tone: string; text: string }[];

  return (
    <div className="bg-paper-2 pb-24">
      <div className="mx-auto max-w-[1200px] px-6 pt-8 md:px-10">
        <button
          onClick={() => setPage('buy-sell')}
          className="pressable mb-7 flex items-center gap-2 text-[15px] font-semibold text-ink-2 transition-colors duration-200 hover:text-petrol-600"
        >
          <ArrowLeft size={18} />
          Retour aux annonces
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* galerie */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-petrol-50">
              <img src={gallery[active]} alt={`${l.title} — photo ${active + 1}`} className="h-full w-full object-cover" />
              <span className="label-tight absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[10px] text-ink">
                {conditionLabels[l.condition] ?? l.condition}
              </span>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Photo ${i + 1}`}
                    className={`pressable aspect-[4/3] overflow-hidden rounded-[10px] transition-opacity duration-200 ${i === active ? 'ring-2 ring-petrol-600' : 'opacity-65 hover:opacity-100'}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* identite */}
          <div>
            <h1 className="font-poster text-[clamp(1.9rem,3.8vw,2.9rem)] text-ink">{l.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-ink-2">
              <span className="flex items-center gap-1.5"><MapPin size={15} className="text-petrol-500" />{l.location}</span>
              <span>{l.brand} {l.model}</span>
              {maskPlate(l.plate) && <span className="nums">{maskPlate(l.plate)}</span>}
            </p>

            <p className="nums mt-5 font-poster text-[clamp(2.2rem,4.5vw,3.2rem)] text-petrol-600">
              {l.price.toLocaleString('fr-FR')} EUR
            </p>

            {l.critAir && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-azure-300/45 px-3.5 py-1.5 text-[13px] font-semibold text-azure-700">
                <Leaf size={14} />
                {CRIT_AIR_LABELS[l.critAir] ?? `Crit'Air ${l.critAir}`}
              </p>
            )}

            {flags.length > 0 && (
              <ul className="mt-4 space-y-2">
                {flags.map((f) => (
                  <li key={f.text} className="flex items-start gap-2 rounded-[10px] bg-saffron-300/50 px-3.5 py-2.5 text-[14px] font-semibold text-ink">
                    <AlertTriangle size={15} className="mt-0.5 shrink-0 text-terra-700" />
                    {f.text}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="rounded-[12px] bg-paper p-3">
                  <s.icon size={16} className="mb-1 text-petrol-500" />
                  <p className="text-[11px] text-ink-2">{s.label}</p>
                  <p className="nums text-[14px] font-bold text-ink">{s.value}</p>
                </div>
              ))}
            </div>

            {l.vin && (
              <p className="nums mt-4 text-[13px] text-ink-2">
                Numero de serie (VIN) : <span className="font-semibold text-ink">{l.vin}</span>
              </p>
            )}
          </div>
        </div>

        {l.description && (
          <section className="mt-12">
            <h2 className="font-poster text-[clamp(1.5rem,3vw,2.2rem)] text-ink">Description du vendeur</h2>
            <p className="mt-4 max-w-[70ch] whitespace-pre-line text-[16px] leading-relaxed text-ink-2">{l.description}</p>
          </section>
        )}

        {/* documents */}
        <section className="mt-12">
          <h2 className="font-poster text-[clamp(1.5rem,3vw,2.2rem)] text-ink">Documents de la vente</h2>
          <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-ink-2">
            Ce que le vendeur declare pouvoir fournir. Sans ces papiers, vous ne pourrez pas faire
            votre carte grise.
          </p>

          <ul className="mt-6 divide-y divide-ink/10 rounded-[16px] border border-ink/12 bg-paper">
            {rules.map((r) => {
              const ok = provided ? Boolean(provided[r.key as keyof typeof provided]) : r.mandatory;
              return (
                <li key={r.key} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-start sm:gap-4">
                  <span className="flex items-center gap-2 sm:w-[22rem] sm:shrink-0">
                    {ok
                      ? <ShieldCheck size={16} className="shrink-0 text-petrol-500" />
                      : <AlertTriangle size={16} className="shrink-0 text-terra-500" />}
                    <span className="text-[14px] font-bold text-ink">{r.label}</span>
                  </span>
                  <span className="flex-1">
                    <span className={`block text-[15px] font-semibold ${ok ? 'text-petrol-700' : 'text-terra-700'}`}>
                      {ok ? 'Fourni par le vendeur' : r.mandatory ? 'Non fourni — bloquant' : 'Non fourni'}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-2">{r.help}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 flex items-start gap-2 rounded-[12px] border border-ink/12 bg-paper p-4 text-[13px] leading-relaxed text-ink-2">
            <FileCheck2 size={15} className="mt-0.5 shrink-0 text-petrol-500" />
            Le jour de la vente : le vendeur barre et signe la carte grise, vous signez chacun un
            exemplaire du Cerfa {CERFA_CESSION}, puis il vous transmet le code de cession obtenu
            apres sa declaration en ligne. Verifiez aussi l historique gratuit du vehicule sur
            HistoVec avant de payer.
          </p>
        </section>

        {/* vendeur */}
        <section className="mt-12 rounded-[20px] bg-petrol-700 p-6 text-paper md:p-8">
          <h2 className="font-poster text-[clamp(1.5rem,3vw,2.2rem)]">Contacter le vendeur</h2>
          <p className="mt-2 text-[15px] text-petrol-100">
            {l.sellerName} &middot; {l.location}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {l.sellerPhone && (
              <a href={`tel:${l.sellerPhone.replace(/\s/g, '')}`} className="pressable flex items-center gap-2 rounded-[12px] bg-saffron-500 px-6 py-3.5 text-[15px] font-bold text-ink transition-colors duration-200 hover:bg-saffron-300">
                <Phone size={17} />
                {l.sellerPhone}
              </a>
            )}
            {l.sellerEmail && (
              <a href={`mailto:${l.sellerEmail}`} className="pressable flex items-center gap-2 rounded-[12px] border border-paper/35 px-6 py-3.5 text-[15px] font-bold text-paper transition-colors duration-200 hover:bg-paper/10">
                <Mail size={17} />
                Envoyer un email
              </a>
            )}
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-petrol-100">
            Roulez met en relation et ne participe pas a la transaction. Ne versez jamais d acompte
            avant d avoir vu le vehicule et verifie les documents.
          </p>
        </section>
      </div>
    </div>
  );
}
