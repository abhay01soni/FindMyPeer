import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import NicheGrid from '@/components/NicheGrid';
import AdvisorDiscovery from '@/components/AdvisorDiscovery';
import HowItWorks from '@/components/HowItWorks';
import TrustAndOffer from '@/components/TrustAndOffer';
import WaitlistForm from '@/components/WaitlistForm';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950 text-techGray-100 flex flex-col font-sans bg-tech-grid relative">
      <Navbar />
      <HeroSection />
      <NicheGrid />
      <AdvisorDiscovery />
      <HowItWorks />
      <TrustAndOffer />
      <WaitlistForm />
      <FaqSection />
      <Footer />
    </main>
  );
}
