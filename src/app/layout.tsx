import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: 'Roulez - Location et Achat de Voitures en France',
  description:
    "Comparez les prix de location de voitures en France. Trouvez les meilleures offres chez Hertz, Europcar, Sixt et plus encore. Achetez et vendez des voitures d'occasion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" translate="no" className={archivo.variable}>
      <head>
        {/* Empêche la traduction automatique de Chrome de casser l'hydratation React */}
        <meta name="google" content="notranslate" />
      </head>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
