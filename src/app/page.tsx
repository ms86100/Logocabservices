import type { Metadata } from 'next';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/sections/Hero';
import BookingWidget from '@/components/booking/BookingWidget';
import Services from '@/components/sections/Services';
import AirportTransfer from '@/components/sections/AirportTransfer';
import LocalRides from '@/components/sections/LocalRides';
import Outstation from '@/components/sections/Outstation';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import FareEstimator from '@/components/sections/FareEstimator';
import Fleet from '@/components/sections/Fleet';
import FAQ from '@/components/sections/FAQ';
import Trust from '@/components/sections/Trust';
import CorporateEnquiry from '@/components/sections/CorporateEnquiry';
import RideShare from '@/components/sections/RideShare';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/navigation/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import MobileCta from '@/components/ui/MobileCta';
import { BRAND } from '@/content/brand';

export const metadata: Metadata = {
  title: BRAND.name,
  description:
    'Bangalore airport transfers, hourly city rides, outstation journeys, self-drive and driver-on-hire. Transparent fares and real human booking assistance.',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BookingWidget />
        <Services />
        <AirportTransfer />
        <LocalRides />
        <Outstation />
        <WhyChooseUs />
        <HowItWorks />
        <FareEstimator />
        <Fleet />
        <Trust />
        <FAQ />
        <CorporateEnquiry />
        <RideShare />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileCta />
    </>
  );
}
