'use client';

const testimonials = [
  {
    name: 'Marie L.',
    location: 'Paris, France',
    quote:
      "Service excellent ! J'ai trouve une voiture a un prix tres competitif a Paris. La reservation etait simple et rapide.",
  },
  {
    name: 'Pierre D.',
    location: 'Lyon, France',
    quote:
      "J'utilise Roulez a chaque voyage en France. La comparaison des prix m'a fait economiser plus de 30% sur mes locations.",
  },
  {
    name: 'Sophie M.',
    location: 'Nice, France',
    quote:
      "Interface tres intuitive. J'ai pu reserver en quelques minutes et le vehicule etait exactement comme decrit.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 font-[Inter]">
          Ce que disent nos clients
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white p-6 rounded-xl shadow-sm">
              <Stars />
              <p className="text-gray-700 italic mb-4 text-sm leading-relaxed font-[Inter]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-gray-900 font-[Inter]">{t.name}</p>
                <p className="text-sm text-gray-500 font-[Inter]">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
