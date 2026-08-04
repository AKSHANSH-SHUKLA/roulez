import { NextRequest, NextResponse } from 'next/server';
import { RentalCar } from '@/lib/types';

const cars: RentalCar[] = [
  // Economy (car-1 to car-12)
  { id: 'car-1', name: 'Renault Clio', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 29, imageUrl: 'https://picsum.photos/seed/car1/600/400', supplierId: 'sup-1', supplierName: 'Hertz', locationId: 'loc-1', features: ['Bluetooth', 'GPS'] },
  { id: 'car-2', name: 'Peugeot 208', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 32, imageUrl: 'https://picsum.photos/seed/car2/600/400', supplierId: 'sup-2', supplierName: 'Europcar', locationId: 'loc-3', features: ['Bluetooth', 'USB', 'Camera de recul'] },
  { id: 'car-3', name: 'Citroen C3', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 27, imageUrl: 'https://picsum.photos/seed/car3/600/400', supplierId: 'sup-3', supplierName: 'Sixt', locationId: 'loc-5', features: ['GPS', 'Bluetooth'] },
  { id: 'car-4', name: 'Dacia Sandero', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 1, ac: false, pricePerDay: 25, imageUrl: 'https://picsum.photos/seed/car4/600/400', supplierId: 'sup-4', supplierName: 'Avis', locationId: 'loc-7', features: ['Bluetooth'] },
  { id: 'car-5', name: 'Fiat 500', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 4, doors: 2, bags: 1, ac: true, pricePerDay: 30, imageUrl: 'https://picsum.photos/seed/car5/600/400', supplierId: 'sup-5', supplierName: 'Enterprise', locationId: 'loc-9', features: ['Bluetooth', 'USB'] },
  { id: 'car-6', name: 'Toyota Yaris', category: 'economy', transmission: 'automatic', fuel: 'hybride', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 35, imageUrl: 'https://picsum.photos/seed/car6/600/400', supplierId: 'sup-6', supplierName: 'Budget', locationId: 'loc-11', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-7', name: 'Seat Ibiza', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 28, imageUrl: 'https://picsum.photos/seed/car7/600/400', supplierId: 'sup-7', supplierName: 'National', locationId: 'loc-2', features: ['Bluetooth', 'USB'] },
  { id: 'car-8', name: 'Skoda Fabia', category: 'economy', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 31, imageUrl: 'https://picsum.photos/seed/car8/600/400', supplierId: 'sup-8', supplierName: 'Alamo', locationId: 'loc-13', features: ['GPS', 'Bluetooth'] },
  { id: 'car-9', name: 'Hyundai i20', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 33, imageUrl: 'https://picsum.photos/seed/car9/600/400', supplierId: 'sup-9', supplierName: 'Thrifty', locationId: 'loc-6', features: ['Bluetooth', 'Camera de recul'] },
  { id: 'car-10', name: 'Kia Picanto', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 4, doors: 4, bags: 1, ac: true, pricePerDay: 26, imageUrl: 'https://picsum.photos/seed/car10/600/400', supplierId: 'sup-10', supplierName: 'Rent-A-Car', locationId: 'loc-14', features: ['Bluetooth', 'USB'] },
  { id: 'car-11', name: 'Volkswagen Polo', category: 'economy', transmission: 'automatic', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 38, imageUrl: 'https://picsum.photos/seed/car11/600/400', supplierId: 'sup-1', supplierName: 'Hertz', locationId: 'loc-4', features: ['GPS', 'Bluetooth', 'Apple CarPlay'] },
  { id: 'car-12', name: 'MG ZS', category: 'economy', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 34, imageUrl: 'https://picsum.photos/seed/car12/600/400', supplierId: 'sup-2', supplierName: 'Europcar', locationId: 'loc-15', features: ['Bluetooth', 'Camera de recul'] },

  // Compact (car-13 to car-24)
  { id: 'car-13', name: 'Renault Megane', category: 'compact', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 38, imageUrl: 'https://picsum.photos/seed/car13/600/400', supplierId: 'sup-3', supplierName: 'Sixt', locationId: 'loc-1', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-14', name: 'Peugeot 308', category: 'compact', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 42, imageUrl: 'https://picsum.photos/seed/car14/600/400', supplierId: 'sup-4', supplierName: 'Avis', locationId: 'loc-5', features: ['GPS', 'Apple CarPlay', 'Siege auto chauffant'] },
  { id: 'car-15', name: 'Citroen C5 Aircross', category: 'compact', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 45, imageUrl: 'https://picsum.photos/seed/car15/600/400', supplierId: 'sup-5', supplierName: 'Enterprise', locationId: 'loc-7', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-16', name: 'Volkswagen Golf', category: 'compact', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 40, imageUrl: 'https://picsum.photos/seed/car16/600/400', supplierId: 'sup-6', supplierName: 'Budget', locationId: 'loc-9', features: ['Bluetooth', 'USB', 'Android Auto'] },
  { id: 'car-17', name: 'Toyota Corolla', category: 'compact', transmission: 'automatic', fuel: 'hybride', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 48, imageUrl: 'https://picsum.photos/seed/car17/600/400', supplierId: 'sup-7', supplierName: 'National', locationId: 'loc-11', features: ['GPS', 'Bluetooth', 'Regulateur de vitesse'] },
  { id: 'car-18', name: 'BMW Serie 1', category: 'compact', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 55, imageUrl: 'https://picsum.photos/seed/car18/600/400', supplierId: 'sup-8', supplierName: 'Alamo', locationId: 'loc-13', features: ['GPS', 'Apple CarPlay', 'Camera de recul', 'Siege auto chauffant'] },
  { id: 'car-19', name: 'Mercedes Classe A', category: 'compact', transmission: 'automatic', fuel: 'essence', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 52, imageUrl: 'https://picsum.photos/seed/car19/600/400', supplierId: 'sup-9', supplierName: 'Thrifty', locationId: 'loc-2', features: ['GPS', 'Bluetooth', 'Toit ouvrant'] },
  { id: 'car-20', name: 'Audi A3', category: 'compact', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 50, imageUrl: 'https://picsum.photos/seed/car20/600/400', supplierId: 'sup-10', supplierName: 'Rent-A-Car', locationId: 'loc-3', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-21', name: 'Hyundai i30', category: 'compact', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 36, imageUrl: 'https://picsum.photos/seed/car21/600/400', supplierId: 'sup-1', supplierName: 'Hertz', locationId: 'loc-8', features: ['Bluetooth', 'USB', 'Camera de recul'] },
  { id: 'car-22', name: 'Kia Ceed', category: 'compact', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 37, imageUrl: 'https://picsum.photos/seed/car22/600/400', supplierId: 'sup-2', supplierName: 'Europcar', locationId: 'loc-10', features: ['GPS', 'Bluetooth', 'Apple CarPlay'] },
  { id: 'car-23', name: 'Seat Leon', category: 'compact', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 41, imageUrl: 'https://picsum.photos/seed/car23/600/400', supplierId: 'sup-3', supplierName: 'Sixt', locationId: 'loc-12', features: ['GPS', 'Bluetooth', 'Regulateur de vitesse'] },
  { id: 'car-24', name: 'Skoda Octavia', category: 'compact', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 44, imageUrl: 'https://picsum.photos/seed/car24/600/400', supplierId: 'sup-4', supplierName: 'Avis', locationId: 'loc-14', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Android Auto'] },

  // SUV (car-25 to car-36)
  { id: 'car-25', name: 'Dacia Duster', category: 'suv', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 55, imageUrl: 'https://picsum.photos/seed/car25/600/400', supplierId: 'sup-5', supplierName: 'Enterprise', locationId: 'loc-1', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-26', name: 'Peugeot 3008', category: 'suv', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 65, imageUrl: 'https://picsum.photos/seed/car26/600/400', supplierId: 'sup-6', supplierName: 'Budget', locationId: 'loc-5', features: ['GPS', 'Apple CarPlay', 'Camera de recul', 'Toit ouvrant'] },
  { id: 'car-27', name: 'Renault Kadjar', category: 'suv', transmission: 'manual', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 58, imageUrl: 'https://picsum.photos/seed/car27/600/400', supplierId: 'sup-7', supplierName: 'National', locationId: 'loc-7', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-28', name: 'Citroen C5 Aircross SUV', category: 'suv', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 62, imageUrl: 'https://picsum.photos/seed/car28/600/400', supplierId: 'sup-8', supplierName: 'Alamo', locationId: 'loc-9', features: ['GPS', 'Bluetooth', 'Siege auto chauffant'] },
  { id: 'car-29', name: 'Nissan Qashqai', category: 'suv', transmission: 'manual', fuel: 'essence', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 60, imageUrl: 'https://picsum.photos/seed/car29/600/400', supplierId: 'sup-9', supplierName: 'Thrifty', locationId: 'loc-11', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Android Auto'] },
  { id: 'car-30', name: 'Hyundai Tucson', category: 'suv', transmission: 'automatic', fuel: 'hybride', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 72, imageUrl: 'https://picsum.photos/seed/car30/600/400', supplierId: 'sup-10', supplierName: 'Rent-A-Car', locationId: 'loc-13', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Regulateur de vitesse'] },
  { id: 'car-31', name: 'Toyota RAV4', category: 'suv', transmission: 'automatic', fuel: 'hybride', seats: 5, doors: 5, bags: 4, ac: true, pricePerDay: 78, imageUrl: 'https://picsum.photos/seed/car31/600/400', supplierId: 'sup-1', supplierName: 'Hertz', locationId: 'loc-2', features: ['GPS', 'Apple CarPlay', 'Camera de recul', 'Siege auto chauffant'] },
  { id: 'car-32', name: 'Volkswagen Tiguan', category: 'suv', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 70, imageUrl: 'https://picsum.photos/seed/car32/600/400', supplierId: 'sup-2', supplierName: 'Europcar', locationId: 'loc-4', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Toit ouvrant'] },
  { id: 'car-33', name: 'BMW X1', category: 'suv', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 82, imageUrl: 'https://picsum.photos/seed/car33/600/400', supplierId: 'sup-3', supplierName: 'Sixt', locationId: 'loc-6', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Siege auto chauffant'] },
  { id: 'car-34', name: 'Audi Q3', category: 'suv', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 85, imageUrl: 'https://picsum.photos/seed/car34/600/400', supplierId: 'sup-4', supplierName: 'Avis', locationId: 'loc-8', features: ['GPS', 'Bluetooth', 'Regulateur de vitesse', 'Toit ouvrant'] },
  { id: 'car-35', name: 'Kia Sportage', category: 'suv', transmission: 'automatic', fuel: 'hybride', seats: 5, doors: 5, bags: 4, ac: true, pricePerDay: 75, imageUrl: 'https://picsum.photos/seed/car35/600/400', supplierId: 'sup-5', supplierName: 'Enterprise', locationId: 'loc-10', features: ['GPS', 'Apple CarPlay', 'Camera de recul', 'Siege auto chauffant'] },
  { id: 'car-36', name: 'Volvo XC40', category: 'suv', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 90, imageUrl: 'https://picsum.photos/seed/car36/600/400', supplierId: 'sup-6', supplierName: 'Budget', locationId: 'loc-12', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Detection angle mort'] },

  // Luxury (car-37 to car-48)
  { id: 'car-37', name: 'BMW Serie 3', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 95, imageUrl: 'https://picsum.photos/seed/car37/600/400', supplierId: 'sup-7', supplierName: 'National', locationId: 'loc-1', features: ['GPS', 'Apple CarPlay', 'Siege auto chauffant', 'Regulateur de vitesse'] },
  { id: 'car-38', name: 'Mercedes Classe C', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 105, imageUrl: 'https://picsum.photos/seed/car38/600/400', supplierId: 'sup-8', supplierName: 'Alamo', locationId: 'loc-3', features: ['GPS', 'Bluetooth', 'Siege auto chauffant', 'Camera de recul'] },
  { id: 'car-39', name: 'Audi A4', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 100, imageUrl: 'https://picsum.photos/seed/car39/600/400', supplierId: 'sup-9', supplierName: 'Thrifty', locationId: 'loc-5', features: ['GPS', 'Apple CarPlay', 'Toit ouvrant', 'Siege auto chauffant'] },
  { id: 'car-40', name: 'BMW Serie 5', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 135, imageUrl: 'https://picsum.photos/seed/car40/600/400', supplierId: 'sup-10', supplierName: 'Rent-A-Car', locationId: 'loc-7', features: ['GPS', 'Bluetooth', 'Siege auto chauffant', 'Regulateur de vitesse', 'Camera de recul'] },
  { id: 'car-41', name: 'Mercedes Classe E', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 145, imageUrl: 'https://picsum.photos/seed/car41/600/400', supplierId: 'sup-1', supplierName: 'Hertz', locationId: 'loc-9', features: ['GPS', 'Apple CarPlay', 'Siege auto chauffant', 'Toit ouvrant'] },
  { id: 'car-42', name: 'Audi A6', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 140, imageUrl: 'https://picsum.photos/seed/car42/600/400', supplierId: 'sup-2', supplierName: 'Europcar', locationId: 'loc-11', features: ['GPS', 'Bluetooth', 'Regulateur de vitesse', 'Siege auto chauffant'] },
  { id: 'car-43', name: 'BMW X5', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 4, ac: true, pricePerDay: 160, imageUrl: 'https://picsum.photos/seed/car43/600/400', supplierId: 'sup-3', supplierName: 'Sixt', locationId: 'loc-13', features: ['GPS', 'Apple CarPlay', 'Siege auto chauffant', 'Camera de recul', 'Toit ouvrant'] },
  { id: 'car-44', name: 'Mercedes Classe GLC', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 4, ac: true, pricePerDay: 150, imageUrl: 'https://picsum.photos/seed/car44/600/400', supplierId: 'sup-4', supplierName: 'Avis', locationId: 'loc-15', features: ['GPS', 'Bluetooth', 'Siege auto chauffant', 'Detection angle mort'] },
  { id: 'car-45', name: 'Audi Q5', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 130, imageUrl: 'https://picsum.photos/seed/car45/600/400', supplierId: 'sup-5', supplierName: 'Enterprise', locationId: 'loc-2', features: ['GPS', 'Apple CarPlay', 'Regulateur de vitesse', 'Toit ouvrant'] },
  { id: 'car-46', name: 'Range Rover Evoque', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 155, imageUrl: 'https://picsum.photos/seed/car46/600/400', supplierId: 'sup-6', supplierName: 'Budget', locationId: 'loc-4', features: ['GPS', 'Bluetooth', 'Siege auto chauffant', 'Camera de recul'] },
  { id: 'car-47', name: 'Porsche Macan', category: 'luxury', transmission: 'automatic', fuel: 'essence', seats: 5, doors: 5, bags: 3, ac: true, pricePerDay: 175, imageUrl: 'https://picsum.photos/seed/car47/600/400', supplierId: 'sup-7', supplierName: 'National', locationId: 'loc-6', features: ['GPS', 'Apple CarPlay', 'Siege auto chauffant', 'Toit ouvrant', 'Regulateur de vitesse'] },
  { id: 'car-48', name: 'Jaguar XF', category: 'luxury', transmission: 'automatic', fuel: 'diesel', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 165, imageUrl: 'https://picsum.photos/seed/car48/600/400', supplierId: 'sup-8', supplierName: 'Alamo', locationId: 'loc-8', features: ['GPS', 'Bluetooth', 'Siege auto chauffant', 'Camera de recul'] },

  // Van (car-49 to car-60)
  { id: 'car-49', name: 'Renault Trafic', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 9, doors: 4, bags: 4, ac: true, pricePerDay: 85, imageUrl: 'https://picsum.photos/seed/car49/600/400', supplierId: 'sup-9', supplierName: 'Thrifty', locationId: 'loc-1', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-50', name: 'Mercedes Vito', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 9, doors: 4, bags: 4, ac: true, pricePerDay: 95, imageUrl: 'https://picsum.photos/seed/car50/600/400', supplierId: 'sup-10', supplierName: 'Rent-A-Car', locationId: 'loc-3', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Regulateur de vitesse'] },
  { id: 'car-51', name: 'Volkswagen Transporter', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 9, doors: 5, bags: 4, ac: true, pricePerDay: 90, imageUrl: 'https://picsum.photos/seed/car51/600/400', supplierId: 'sup-1', supplierName: 'Hertz', locationId: 'loc-5', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-52', name: 'Citroen SpaceTourer', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 9, doors: 5, bags: 4, ac: true, pricePerDay: 88, imageUrl: 'https://picsum.photos/seed/car52/600/400', supplierId: 'sup-2', supplierName: 'Europcar', locationId: 'loc-7', features: ['GPS', 'Bluetooth', 'Siege auto chauffant'] },
  { id: 'car-53', name: 'Peugeot Traveller', category: 'van', transmission: 'automatic', fuel: 'diesel', seats: 8, doors: 5, bags: 4, ac: true, pricePerDay: 92, imageUrl: 'https://picsum.photos/seed/car53/600/400', supplierId: 'sup-3', supplierName: 'Sixt', locationId: 'loc-9', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Toit ouvrant'] },
  { id: 'car-54', name: 'Ford Tourneo', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 9, doors: 5, bags: 4, ac: true, pricePerDay: 82, imageUrl: 'https://picsum.photos/seed/car54/600/400', supplierId: 'sup-4', supplierName: 'Avis', locationId: 'loc-11', features: ['GPS', 'Bluetooth'] },
  { id: 'car-55', name: 'Fiat Talento', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 9, doors: 4, bags: 4, ac: true, pricePerDay: 78, imageUrl: 'https://picsum.photos/seed/car55/600/400', supplierId: 'sup-5', supplierName: 'Enterprise', locationId: 'loc-13', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-56', name: 'Opel Vivaro', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 9, doors: 5, bags: 4, ac: true, pricePerDay: 80, imageUrl: 'https://picsum.photos/seed/car56/600/400', supplierId: 'sup-6', supplierName: 'Budget', locationId: 'loc-15', features: ['GPS', 'Bluetooth', 'Regulateur de vitesse'] },
  { id: 'car-57', name: 'Toyota Proace', category: 'van', transmission: 'automatic', fuel: 'diesel', seats: 9, doors: 5, bags: 4, ac: true, pricePerDay: 100, imageUrl: 'https://picsum.photos/seed/car57/600/400', supplierId: 'sup-7', supplierName: 'National', locationId: 'loc-2', features: ['GPS', 'Bluetooth', 'Camera de recul', 'Siege auto chauffant'] },
  { id: 'car-58', name: 'Iveco Daily', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 7, doors: 4, bags: 3, ac: true, pricePerDay: 75, imageUrl: 'https://picsum.photos/seed/car58/600/400', supplierId: 'sup-8', supplierName: 'Alamo', locationId: 'loc-4', features: ['GPS', 'Bluetooth'] },
  { id: 'car-59', name: 'Renault Kangoo', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 7, doors: 4, bags: 3, ac: true, pricePerDay: 68, imageUrl: 'https://picsum.photos/seed/car59/600/400', supplierId: 'sup-9', supplierName: 'Thrifty', locationId: 'loc-6', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-60', name: 'Dacia Dokker', category: 'van', transmission: 'manual', fuel: 'diesel', seats: 7, doors: 4, bags: 3, ac: true, pricePerDay: 65, imageUrl: 'https://picsum.photos/seed/car60/600/400', supplierId: 'sup-10', supplierName: 'Rent-A-Car', locationId: 'loc-8', features: ['GPS', 'Bluetooth'] },

  // Electric (car-61 to car-70)
  { id: 'car-61', name: 'Tesla Model 3', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 75, imageUrl: 'https://picsum.photos/seed/car61/600/400', supplierId: 'sup-1', supplierName: 'Hertz', locationId: 'loc-1', features: ['GPS', 'Bluetooth', 'Autopilote', 'Regulateur de vitesse'] },
  { id: 'car-62', name: 'Renault Zoe', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 48, imageUrl: 'https://picsum.photos/seed/car62/600/400', supplierId: 'sup-2', supplierName: 'Europcar', locationId: 'loc-3', features: ['GPS', 'Bluetooth', 'USB'] },
  { id: 'car-63', name: 'Peugeot e-208', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 2, ac: true, pricePerDay: 52, imageUrl: 'https://picsum.photos/seed/car63/600/400', supplierId: 'sup-3', supplierName: 'Sixt', locationId: 'loc-5', features: ['GPS', 'Apple CarPlay', 'Camera de recul'] },
  { id: 'car-64', name: 'Tesla Model Y', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 5, bags: 4, ac: true, pricePerDay: 80, imageUrl: 'https://picsum.photos/seed/car64/600/400', supplierId: 'sup-4', supplierName: 'Avis', locationId: 'loc-7', features: ['GPS', 'Bluetooth', 'Autopilote', 'Toit ouvrant'] },
  { id: 'car-65', name: 'Hyundai Kona Electrique', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 58, imageUrl: 'https://picsum.photos/seed/car65/600/400', supplierId: 'sup-5', supplierName: 'Enterprise', locationId: 'loc-9', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
  { id: 'car-66', name: 'Kia e-Niro', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 55, imageUrl: 'https://picsum.photos/seed/car66/600/400', supplierId: 'sup-6', supplierName: 'Budget', locationId: 'loc-11', features: ['GPS', 'Bluetooth', 'Regulateur de vitesse'] },
  { id: 'car-67', name: 'Volkswagen ID.3', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 60, imageUrl: 'https://picsum.photos/seed/car67/600/400', supplierId: 'sup-7', supplierName: 'National', locationId: 'loc-13', features: ['GPS', 'Bluetooth', 'Apple CarPlay'] },
  { id: 'car-68', name: 'BMW i3', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 4, doors: 4, bags: 2, ac: true, pricePerDay: 65, imageUrl: 'https://picsum.photos/seed/car68/600/400', supplierId: 'sup-8', supplierName: 'Alamo', locationId: 'loc-15', features: ['GPS', 'Bluetooth', 'Siege auto chauffant'] },
  { id: 'car-69', name: 'Fiat 500e', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 4, doors: 2, bags: 1, ac: true, pricePerDay: 45, imageUrl: 'https://picsum.photos/seed/car69/600/400', supplierId: 'sup-9', supplierName: 'Thrifty', locationId: 'loc-10', features: ['GPS', 'Bluetooth', 'USB'] },
  { id: 'car-70', name: 'Nissan Leaf', category: 'electric', transmission: 'automatic', fuel: 'electrique', seats: 5, doors: 4, bags: 3, ac: true, pricePerDay: 50, imageUrl: 'https://picsum.photos/seed/car70/600/400', supplierId: 'sup-10', supplierName: 'Rent-A-Car', locationId: 'loc-12', features: ['GPS', 'Bluetooth', 'Camera de recul'] },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let filtered = [...cars];

  const category = searchParams.get('category');
  if (category) {
    filtered = filtered.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  }

  const transmission = searchParams.get('transmission');
  if (transmission) {
    filtered = filtered.filter((c) => c.transmission.toLowerCase() === transmission.toLowerCase());
  }

  const fuel = searchParams.get('fuel');
  if (fuel) {
    filtered = filtered.filter((c) => c.fuel.toLowerCase() === fuel.toLowerCase());
  }

  const minPrice = searchParams.get('minPrice');
  if (minPrice) {
    filtered = filtered.filter((c) => c.pricePerDay >= Number(minPrice));
  }

  const maxPrice = searchParams.get('maxPrice');
  if (maxPrice) {
    filtered = filtered.filter((c) => c.pricePerDay <= Number(maxPrice));
  }

  const supplier = searchParams.get('supplier');
  if (supplier) {
    filtered = filtered.filter((c) => c.supplierName.toLowerCase() === supplier.toLowerCase());
  }

  const locationId = searchParams.get('locationId');
  if (locationId) {
    filtered = filtered.filter((c) => c.locationId === locationId);
  }

  const limit = searchParams.get('limit');
  if (limit) {
    filtered = filtered.slice(0, Number(limit));
  }

  return NextResponse.json({ success: true, data: filtered });
}
