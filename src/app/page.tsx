'use client';

import { useAppStore, useAuthStore } from '@/lib/store';
import Navbar from '@/components/sections/navbar';
import HeroSearch from '@/components/sections/hero-search';
import PopularDestinations from '@/components/sections/popular-destinations';
import HowItWorks from '@/components/sections/how-it-works';
import FeaturedCars from '@/components/sections/featured-cars';
import Testimonials from '@/components/sections/testimonials';
import Footer from '@/components/sections/footer';
import SearchResults from '@/components/sections/search-results';
import CarDetail from '@/components/sections/car-detail';
import BuySell from '@/components/sections/buy-sell';
import ListingDetail from '@/components/sections/listing-detail';
import AuthModal from '@/components/sections/auth-modal';

export default function Page() {
  const { currentPage, toast } = useAppStore();
  const { showAuth } = useAuthStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Navbar />
            <HeroSearch />
            <PopularDestinations />
            <HowItWorks />
            <FeaturedCars />
            <Testimonials />
            <Footer />
          </>
        );
      case 'search':
        return (
          <>
            <Navbar />
            <SearchResults />
            <Footer />
          </>
        );
      case 'car-detail':
        return (
          <>
            <Navbar />
            <CarDetail />
            <Footer />
          </>
        );
      case 'buy-sell':
        return (
          <>
            <Navbar />
            <BuySell />
            <Footer />
          </>
        );
      case 'listing-detail':
        return (
          <>
            <Navbar />
            <ListingDetail />
            <Footer />
          </>
        );
      default:
        return (
          <>
            <Navbar />
            <HeroSearch />
            <PopularDestinations />
            <HowItWorks />
            <FeaturedCars />
            <Testimonials />
            <Footer />
          </>
        );
    }
  };

  return (
    <div key={currentPage}>
      {renderPage()}

      {/* Auth modal */}
      {showAuth && <AuthModal />}

      {/* Toast notification */}
      {toast && (
        <div className='fixed bottom-6 right-6 z-[60] bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-[fadeIn_0.3s_ease-out] font-[Inter]'>
          {toast}
        </div>
      )}
    </div>
  );
}
