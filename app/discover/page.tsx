import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdvisorDiscovery from '@/components/AdvisorDiscovery';
import { Terminal, Search, Sparkles, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover 1:1 Expert Advisors — FindMyPeer Directory',
  description: 'Search and filter verified peer advisors, founders, PMs, and engineering leaders by domain, experience, rate, and availability.',
};

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-dark-950 text-techGray-100 flex flex-col font-sans pt-20">
      <Navbar />

      {/* Main Interactive Discovery Engine Section — no hero header */}
      <div className="flex-1 py-6">
        <AdvisorDiscovery />
      </div>

      <Footer />
    </main>
  );
}
