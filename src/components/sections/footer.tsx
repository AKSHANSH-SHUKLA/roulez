export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Col 1: Logo & description */}
        <div>
          <span className="text-emerald-400 font-bold text-xl font-[Inter]">Roulez</span>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 font-[Inter]">
            Comparez les prix de location de voitures en France. Trouvez la meilleure offre parmi les plus grands fournisseurs, reservez en quelques clics et roulez en toute serenite.
          </p>
        </div>

        {/* Col 2: Location */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-[Inter]">Location</h4>
          <ul className="space-y-2">
            {['Rechercher une voiture', 'Destinations populaires', 'Assurance location', 'Guide de location'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-[Inter]">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Achat & Vente */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-[Inter]">Achat & Vente</h4>
          <ul className="space-y-2">
            {['Voitures a vendre', 'Vendre sa voiture', 'Conseils d\'achat', 'Financement'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-[Inter]">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-[Inter]">Contact</h4>
          <ul className="space-y-2">
            {['Nous contacter', 'FAQ', 'Conditions generales', 'Politique de confidentialite'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-[Inter]">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 text-center">
        <p className="text-sm text-gray-500 font-[Inter]">&copy; 2026 Roulez. Tous droits reserves.</p>
      </div>
    </footer>
  );
}
