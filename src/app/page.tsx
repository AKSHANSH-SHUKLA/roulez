'use client';

import { useAppStore, useAuthStore } from '@/lib/store';
import { LocaleBoot } from '@/lib/i18n';
import Navbar from '@/components/sections/navbar';
import HeroSearch from '@/components/sections/hero-search';
import PopularDestinations from '@/components/sections/popular-destinations';
import HowItWorks from '@/components/sections/how-it-works';
import FeaturedCars from '@/components/sections/featured-cars';
import Testimonials from '@/components/sections/testimonials';
import Footer from '@/components/sections/footer';
import SupplierRail from '@/components/sections/supplier-rail';
import CtaBand from '@/components/sections/cta-band';
import SearchResults from '@/components/sections/search-results';
import CarDetail from '@/components/sections/car-detail';
import BuySell from '@/components/sections/buy-sell';
import ListingDetail from '@/components/sections/listing-detail';
import AuthModal from '@/components/sections/auth-modal';
import BuySellBand from '@/components/sections/buy-sell-band';
import InsuranceBand from '@/components/sections/insurance-band';
import InsurancePage from '@/components/sections/insurance-page';

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
            <SupplierRail />
            <PopularDestinations />
            <HowItWorks />
            <FeaturedCars />
            <BuySellBand />
            <InsuranceBand />
            <Testimonials />
            <CtaBand />
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
      case 'insurance':
        return (
          <>
            <Navbar />
            <InsurancePage />
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
            <SupplierRail />
            <PopularDestinations />
            <HowItWorks />
            <FeaturedCars />
            <BuySellBand />
            <InsuranceBand />
            <Testimonials />
            <CtaBand />
            <Footer />
          </>
        );
    }
  };

  return (
    <div key={currentPage}>
      {/* restaure la langue choisie apres l'hydratation */}
      <LocaleBoot />

      {renderPage()}

      {/* Auth modal */}
      {showAuth && <AuthModal />}

      {/* Toast notification */}
      {toast && (
        <div className='fixed bottom-6 right-6 z-[60] rounded-[12px] bg-ink px-6 py-3.5 text-sm font-bold text-paper shadow-[0_18px_40px_-18px_rgba(20,35,28,0.8)]'>
          {toast}
        </div>
      )}
    </div>
  );
}
