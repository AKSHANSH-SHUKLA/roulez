import type { Metadata } from 'next';
import CreditsView from './credits-view';

export const metadata: Metadata = {
  title: 'Crédits photos — Roulez',
  description:
    'Crédits et licences des photographies de véhicules et de destinations utilisées sur Roulez.',
};

export default function CreditsPage() {
  return <CreditsView />;
}
