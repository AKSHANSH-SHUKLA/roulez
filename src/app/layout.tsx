import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Roulez - Location et Achat de Voitures en France',
  description: 'Comparez les prix de location de voitures en France. Trouvez les meilleures offres chez Hertz, Europcar, Sixt et plus encore. Achetez et vendez des voitures d\'occasion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" translate="no">
      <head>
        {/* Empêche la traduction automatique de Chrome de casser l'hydratation React */}
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
