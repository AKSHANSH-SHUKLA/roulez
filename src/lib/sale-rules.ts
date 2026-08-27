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

export type DocKey = 'carteGrise' | 'controleTechnique' | 'certificatSituation' | 'certificatCession' | 'carnetEntretien';

/**
 * Une regle documentaire : la cle de dictionnaire, les parametres a injecter,
 * et si elle est obligatoire POUR CE VEHICULE. Aucun texte ici — la traduction
 * vit dans src/lib/i18n.
 */
export interface DocRule {
  key: DocKey;
  /** cle du texte d'aide dans d.docs[key] */
  helpKey: 'help' | 'helpRequired' | 'helpOptional';
  params: Record<string, string | number>;
  mandatory: boolean;
}

/** La liste affichee dans le formulaire de depot d'annonce. */
export function documentRules(firstRegistration: string): DocRule[] {
  const ctNeeded = requiresControleTechnique(firstRegistration);
  return [
    { key: 'carteGrise', helpKey: 'help', params: {}, mandatory: true },
    {
      key: 'controleTechnique',
      helpKey: ctNeeded ? 'helpRequired' : 'helpOptional',
      params: { years: CT_EXEMPT_UNDER_YEARS, months: CT_MAX_AGE_MONTHS },
      mandatory: ctNeeded,
    },
    { key: 'certificatSituation', helpKey: 'help', params: { days: CSA_MAX_AGE_DAYS }, mandatory: true },
    {
      key: 'certificatCession',
      helpKey: 'help',
      params: { cerfa: CERFA_CESSION, days: ANTS_DECLARATION_DAYS, fine: `${ANTS_FINE_EUR} EUR` },
      mandatory: true,
    },
    { key: 'carnetEntretien', helpKey: 'help', params: {}, mandatory: false },
  ];
}


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

/** Code d'erreur par champ. Le message correspondant vit dans src/lib/i18n. */
export interface ListingError {
  code: string;
  params?: Record<string, string | number>;
}

/** Valide un brouillon d'annonce. Renvoie un code par champ fautif. */
export function validateListing(d: ListingDraft): Record<string, ListingError> {
  const e: Record<string, ListingError> = {};

  if (!d.title.trim()) e.title = { code: 'title' };
  if (!d.brand.trim()) e.brand = { code: 'brand' };
  if (!d.model.trim()) e.model = { code: 'model' };
  if (!d.firstRegistration) e.firstRegistration = { code: 'firstRegistration' };
  if (!d.mileage || Number(d.mileage) <= 0) e.mileage = { code: 'mileage' };
  if (!d.price || Number(d.price) <= 0) e.price = { code: 'price' };
  if (!d.city.trim()) e.city = { code: 'city' };
  if (!d.sellerName.trim()) e.sellerName = { code: 'sellerName' };
  if (!d.phone.trim() && !d.email.trim()) e.phone = { code: 'contact' };
  if (d.photos.length < 3) e.photos = { code: 'photos' };

  for (const rule of documentRules(d.firstRegistration)) {
    if (rule.mandatory && !d.documents[rule.key]) {
      e[`doc_${rule.key}`] = { code: 'docRequired', params: { doc: rule.key } };
    }
  }

  if (d.documents.controleTechnique && d.controleTechniqueDate && !controleTechniqueValid(d.controleTechniqueDate)) {
    e.controleTechniqueDate = { code: 'ctTooOld', params: { months: CT_MAX_AGE_MONTHS } };
  }

  return e;
}
