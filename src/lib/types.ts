export interface Location {
  id: string;
  name: string;
  city: string;
  /** 'department' et 'region' couvrent toute la France, pas seulement les agences */
  type: 'airport' | 'city' | 'train_station' | 'department' | 'region';
  /** libelle secondaire affiche sous le nom : "Aeroport · Centre-Val de Loire" */
  address: string;
  region?: string;
  department?: string;
}

export interface Supplier {
  id: string;
  name: string;
  logoUrl: string;
  rating: number;
}

export interface RentalCar {
  id: string;
  name: string;
  category: 'economy' | 'compact' | 'suv' | 'luxury' | 'van' | 'electric';
  transmission: 'manual' | 'automatic';
  fuel: 'diesel' | 'essence' | 'hybride' | 'electrique';
  seats: number;
  doors: number;
  bags: number;
  ac: boolean;
  pricePerDay: number;
  imageUrl: string;
  supplierId: string;
  supplierName: string;
  locationId: string;
  features: string[];
}

export interface Booking {
  id: string;
  reference: string;
  carId: string;
  pickupLocationId: string;
  returnLocationId: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  insurancePlanId?: string;
  createdAt: string;
}

export interface CarSaleListing {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  color: string;
  description: string;
  imageUrl: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  location: string;
  condition: 'excellent' | 'bon' | 'correct';
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  imageUrl: string;
  carCount: number;
  startingPrice: number;
  description: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  dailyPrice: number;
  coverage: string[];
}

export interface SearchFilters {
  /** libelle lisible, affiche en titre de la page de resultats */
  pickupLocation?: string;
  /** identifiant du lieu, envoye a l'API */
  pickupLocationId?: string;
  pickupDate?: string;
  returnDate?: string;
  category?: string;
  transmission?: string;
  fuel?: string;
  minPrice?: number;
  maxPrice?: number;
  supplier?: string;
}
