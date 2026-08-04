import { create } from 'zustand';
import type { RentalCar, CarSaleListing, SearchFilters, Booking } from './types';

interface AppStore {
  currentPage: string;
  selectedCar: RentalCar | null;
  selectedListing: CarSaleListing | null;
  searchQuery: string;
  toast: string | null;
  setPage: (page: string) => void;
  setSelectedCar: (car: RentalCar | null) => void;
  setSelectedListing: (listing: CarSaleListing | null) => void;
  setSearchQuery: (q: string) => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentPage: 'home',
  selectedCar: null,
  selectedListing: null,
  searchQuery: '',
  toast: null,
  setPage: (page) => set({ currentPage: page }),
  setSelectedCar: (car) => set({ selectedCar: car }),
  setSelectedListing: (listing) => set({ selectedListing: listing }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  showToast: (msg) => {
    set({ toast: msg });
    setTimeout(() => set({ toast: null }), 3000);
  },
  hideToast: () => set({ toast: null }),
}));

interface AuthStore {
  user: { name: string; email: string } | null;
  token: string | null;
  showAuth: boolean;
  login: (user: { name: string; email: string }, token: string) => void;
  logout: () => void;
  setShowAuth: (show: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  showAuth: false,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
  setShowAuth: (show) => set({ showAuth: show }),
}));

interface BookingStore {
  filters: SearchFilters;
  searchResults: RentalCar[];
  bookingDetails: Booking | null;
  setFilters: (filters: SearchFilters) => void;
  setSearchResults: (cars: RentalCar[]) => void;
  setBookingDetails: (booking: Booking | null) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  filters: {},
  searchResults: [],
  bookingDetails: null,
  setFilters: (filters) => set({ filters }),
  setSearchResults: (cars) => set({ searchResults: cars }),
  setBookingDetails: (booking) => set({ bookingDetails: booking }),
}));
