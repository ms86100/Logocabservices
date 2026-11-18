import type { Metadata } from 'next';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/sections/Hero';
import BookingWidget from '@/components/booking/BookingWidget';
import Services from '@/components/sections/Services';
import Fleet from '@/components/sections/Fleet';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import PopularRoutes from '@/components/sections/PopularRoutes';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/navigation/Footer';

export const metadata: Metadata = {
  title: 'CityCab — Premium Cab Booking & Travel Platform',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <Fleet />
        <PopularRoutes />
        <HowItWorks />
        <BookingWidget />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
