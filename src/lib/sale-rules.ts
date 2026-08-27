/**
 * Vente d'un vehicule d'occasion entre particuliers en France — SOURCE UNIQUE.
 *
 * Les regles ci-dessous ne sont pas decoratives : ce sont les obligations
 * legales du vendeur. Une annonce qui ne peut pas les satisfaire ne devrait pas
 * etre publiee, parce que la vente ne pourra pas se conclure.
 *
 * References :
 *  - Certificat de cession : formulaire Cerfa 15776*02, deux exemplaires signes.
 *  - Declaration de cession en ligne (ANTS) : sous 15 jours, sinon amende
 *    forfaitaire de 135 EUR. Le vendeur remet ensuite le code de cession a
 *    l'acheteur ; ce code est valable 15 jours.
 *  - Certificat de situation administrative (non-gage) : gratuit, doit dater de
 *    moins de 15 jours le jour de la vente.
 *  - Controle technique : obligatoire pour un vehicule de plus de 4 ans, et
 *    doit dater de moins de 6 mois (2 mois en cas de contre-visite).
 *  - Obligation d'information (DGCCRF) : marque, type, modele, date de premiere
 *    mise en circulation et kilometrage reel — ou la mention "non garanti".
 */

export const CERFA_CESSION = '15776*02';
export const CT_MAX_AGE_MONTHS = 6;
export const CT_EXEMPT_UNDER_YEARS = 4;
export const CSA_MAX_AGE_DAYS = 15;
export const ANTS_DECLARATION_DAYS = 15;
export const ANTS_FINE_EUR = 135;

const MS_PER_DAY = 86_400_000;

/** Age du vehicule en annees, a partir de "yyyy-mm" ou "yyyy". */
export function vehicleAgeYears(firstRegistration: string): number {
  if (!firstRegistration) return 0;
  const [y, m] = firstRegistration.split('-');
  const year = Number(y);
  if (!year) return 0;
  const month = Number(m ?? '1') || 1;
  const d = new Date(year, month - 1, 1);
  return (Date.now() - d.getTime()) / (365.25 * MS_PER_DAY);
}

/** Un vehicule de plus de 4 ans ne peut pas etre vendu sans controle technique. */
export function requiresControleTechnique(firstRegistration: string): boolean {
  return vehicleAgeYears(firstRegistration) > CT_EXEMPT_UNDER_YEARS;
}

/** Le proces-verbal doit dater de moins de 6 mois le jour de la vente. */
export function controleTechniqueValid(ctDate: string): boolean {
  if (!ctDate) return false;
  const d = new Date(ctDate);
  if (Number.isNaN(d.getTime())) return false;
  const months = (Date.now() - d.getTime()) / (30.44 * MS_PER_DAY);
  return months >= 0 && months <= CT_MAX_AGE_MONTHS;
}

export interface DocRule {
  key: 'carteGrise' | 'controleTechnique' | 'certificatSituation' | 'certificatCession' | 'carnetEntretien';
  label: string;
  help: string;
  mandatory: boolean;
}

/** La liste affichee dans le formulaire de depot d'annonce. */
export function documentRules(firstRegistration: string): DocRule[] {
  const ctNeeded = requiresControleTechnique(firstRegistration);
  return [
    {
      key: 'carteGrise',
      label: "Certificat d'immatriculation (carte grise)",
      help: "A votre nom. Le jour de la vente vous la barrez, vous inscrivez « Vendu le » avec la date et l'heure, et vous signez.",
      mandatory: true,
    },
    {
      key: 'controleTechnique',
      label: 'Proces-verbal de controle technique',
      help: ctNeeded
        ? `Obligatoire : votre vehicule a plus de ${CT_EXEMPT_UNDER_YEARS} ans. Le PV doit dater de moins de ${CT_MAX_AGE_MONTHS} mois le jour de la vente (2 mois si contre-visite).`
        : `Non obligatoire : votre vehicule a moins de ${CT_EXEMPT_UNDER_YEARS} ans. Vous pouvez tout de meme en fournir un.`,
      mandatory: ctNeeded,
    },
    {
      key: 'certificatSituation',
      label: 'Certificat de situation administrative (non-gage)',
      help: `Gratuit sur HistoVec ou l'ANTS. Il prouve que le vehicule n'est ni gage ni opposition. Il doit dater de moins de ${CSA_MAX_AGE_DAYS} jours le jour de la vente.`,
      mandatory: true,
    },
    {
      key: 'certificatCession',
      label: `Certificat de cession (Cerfa ${CERFA_CESSION})`,
      help: `Deux exemplaires, signes par vous et par l'acheteur. Vous declarez ensuite la vente en ligne sous ${ANTS_DECLARATION_DAYS} jours, sinon ${ANTS_FINE_EUR} EUR d'amende, puis vous remettez le code de cession a l'acheteur.`,
      mandatory: true,
    },
    {
      key: 'carnetEntretien',
      label: 'Carnet d entretien et factures',
      help: "Facultatif, mais c'est ce qui fait la difference a la negociation : un historique complet rassure l'acheteur.",
      mandatory: false,
    },
  ];
}

export const CRIT_AIR_LABELS: Record<string, string> = {
  '0': "Crit'Air 0 — 100 % electrique ou hydrogene",
  '1': "Crit'Air 1 — essence Euro 5/6, hybride rechargeable",
  '2': "Crit'Air 2 — essence Euro 4, diesel Euro 5/6",
  '3': "Crit'Air 3 — essence Euro 2/3, diesel Euro 4",
  '4': "Crit'Air 4 — diesel Euro 3",
  '5': "Crit'Air 5 — diesel Euro 2",
  'non-classe': 'Non classe — circulation interdite dans plusieurs ZFE',
};

export interface ListingDraft {
  title: string;
  brand: string;
  model: string;
  firstRegistration: string;
  mileage: string;
  price: string;
  city: string;
  sellerName: string;
  phone: string;
  email: string;
  photos: string[];
  documents: Record<string, boolean>;
  controleTechniqueDate: string;
}

/** Valide un brouillon d'annonce. Renvoie un message par champ fautif. */
export function validateListing(d: ListingDraft): Record<string, string> {
  const e: Record<string, string> = {};

  if (!d.title.trim()) e.title = "Donnez un titre a votre annonce.";
  if (!d.brand.trim()) e.brand = 'La marque est obligatoire.';
  if (!d.model.trim()) e.model = 'Le modele est obligatoire.';
  if (!d.firstRegistration) e.firstRegistration = 'La date de premiere mise en circulation est obligatoire.';
  if (!d.mileage || Number(d.mileage) <= 0) e.mileage = 'Indiquez le kilometrage reel du compteur.';
  if (!d.price || Number(d.price) <= 0) e.price = 'Indiquez un prix de vente.';
  if (!d.city.trim()) e.city = 'Indiquez la ville ou se trouve le vehicule.';
  if (!d.sellerName.trim()) e.sellerName = 'Votre nom est obligatoire.';
  if (!d.phone.trim() && !d.email.trim()) e.phone = 'Laissez au moins un moyen de contact, telephone ou email.';
  if (d.photos.length < 3) e.photos = 'Ajoutez au moins 3 photos : exterieur, interieur et compteur.';

  for (const rule of documentRules(d.firstRegistration)) {
    if (rule.mandatory && !d.documents[rule.key]) {
      e[`doc_${rule.key}`] = `${rule.label} : obligatoire pour conclure la vente.`;
    }
  }

  if (d.documents.controleTechnique && d.controleTechniqueDate && !controleTechniqueValid(d.controleTechniqueDate)) {
    e.controleTechniqueDate = `Ce controle technique a plus de ${CT_MAX_AGE_MONTHS} mois : il faudra le refaire avant la vente.`;
  }

  return e;
}
