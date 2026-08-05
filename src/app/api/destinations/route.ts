import { NextResponse } from 'next/server';
import { Destination } from '@/lib/types';

const destinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Paris',
    imageUrl: '/destinations/paris.jpg',
    carCount: 22,
    startingPrice: 29,
    description: "La ville lumi\u00e8re vous attend avec ses monuments iconiques, ses mus\u00e9es mondialement connus et sa gastronomie incomparable. Explorez Paris \u00e0 votre rythme en voiture pour d\u00e9couvrir ses quartiers charmants et ses villages secrets.",
  },
  {
    id: 'dest-2',
    name: 'Nice',
    imageUrl: '/destinations/nice.jpg',
    carCount: 15,
    startingPrice: 32,
    description: "Perle de la C\u00f4te d'Azur, Nice enchante par sa promenade des Anglais, son vieux quartier color\u00e9 et ses plages de M\u00e9diterran\u00e9e. Un point de d\u00e9part id\u00e9al pour explorer les villages de l'arri\u00e8re-pays ni\u00e7ois.",
  },
  {
    id: 'dest-3',
    name: 'Lyon',
    imageUrl: '/destinations/lyon.jpg',
    carCount: 18,
    startingPrice: 27,
    description: "Capitale mondiale de la gastronomie, Lyon vous s\u00e9duira par son patrimoine historique remarquable class\u00e9 \u00e0 l'UNESCO. D\u00e9couvrez ses bouchons, ses traboules et sa presqu'\u00eele entre Rh\u00f4ne et Sa\u00f4ne.",
  },
  {
    id: 'dest-4',
    name: 'Marseille',
    imageUrl: '/destinations/marseille.jpg',
    carCount: 14,
    startingPrice: 25,
    description: "Plus ancienne ville de France, Marseille fascine par son Vieux-Port anim\u00e9, le majestueux quartier du Panier et les calanques \u00e0 couper le souffle. Une ville vibrante, authentique et gourmande.",
  },
  {
    id: 'dest-5',
    name: 'Bordeaux',
    imageUrl: '/destinations/bordeaux.jpg',
    carCount: 16,
    startingPrice: 30,
    description: "Capitale mondiale du vin, Bordeaux brille par son architecture du XVIIIe si\u00e8cle parfaitement pr\u00e9serv\u00e9e. Explorez les ch\u00e2teaux du M\u00e9doc et la r\u00e9gion des vignobles qui font la renomm\u00e9e de la ville.",
  },
  {
    id: 'dest-6',
    name: 'Strasbourg',
    imageUrl: '/destinations/strasbourg.jpg',
    carCount: 12,
    startingPrice: 28,
    description: "Carrefour de l'Europe, Strasbourg \u00e9blouit avec sa cath\u00e9drale gothique, son quartier de la Petite France et ses march\u00e9s de No\u00ebl l\u00e9gendaires. Une ville o\u00f9 culture alsacienne et influence europ\u00e9enne se m\u00ealent harmonieusement.",
  },
  {
    id: 'dest-7',
    name: 'Toulouse',
    imageUrl: '/destinations/toulouse.jpg',
    carCount: 14,
    startingPrice: 26,
    description: "La ville rose, capitale de l'a\u00e9ronautique, vous accueille avec ses briques typiques et son ambiance ensoleill\u00e9e. Profitez de la gastronomie du Sud-Ouest et explorez le canal du Midi.",
  },
  {
    id: 'dest-8',
    name: 'Nantes',
    imageUrl: '/destinations/nantes.jpg',
    carCount: 10,
    startingPrice: 25,
    description: "Ville d'art et d'histoire, Nantes surprend par ses machines g\u00e9antes, son ch\u00e2teau des ducs de Bretagne et son Estuaire riche en \u0153uvres d'art contemporain. Une destination inventive et fertile.",
  },
  {
    id: 'dest-9',
    name: 'Lille',
    imageUrl: '/destinations/lille.jpg',
    carCount: 8,
    startingPrice: 25,
    description: "Capitale des Flandres fran\u00e7aises, Lille charme par sa Grand Place, son beffroi et ses ruelles pav\u00e9es pleines de boutiques. La ville offre aussi un acc\u00e8s facile aux march\u00e9s de No\u00ebl belges et aux brasseries traditionnelles.",
  },
  {
    id: 'dest-10',
    name: "C\u00f4te d'Azur",
    imageUrl: '/destinations/cote-d-azur.jpg',
    carCount: 20,
    startingPrice: 35,
    description: "La C\u00f4te d'Azur est une destination de r\u00eave alliant glamour de la Riviera et paysages m\u00e9diterran\u00e9ens. De Saint-Tropez \u00e0 Monaco en passant par Cannes, chaque ville offre un charme unique et des vues spectaculaires.",
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: destinations });
}
