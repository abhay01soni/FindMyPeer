'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Advisor {
  id: string;
  initials: string;
  name: string;
  credential: string;
  nicheTag: string;
  domainChip: string;
  rate: string;
  rating: string;
  reviewsCount: number;
  outcomes: string[];
  bio: string;
  availableSlot: string;
}

const FEATURED_ADVISORS: Advisor[] = [
  {
    id: 'arjun-kapoor',
    initials: 'AK',
    name: 'Arjun Kapoor',
    credential: 'Ex-Google Staff PM, 9+ yrs product leadership',
    nicheTag: 'Startup & Product',
    domainChip: 'peer.find/arjun.tech',
    rate: '₹2,999 / session',
    rating: '5.0',
    reviewsCount: 38,
    outcomes: ['B2B SaaS PMF', '0 to 1 Product Strategy', 'PRD & Feature Prioritization'],
    bio: 'Led core search infrastructure products at Google. Helped 14+ early-stage startups navigate initial product validation and user retention strategies.',
    availableSlot: 'Tomorrow, 4:00 PM IST',
  },
  {
    id: 'rhea-sharma',
    initials: 'RS',
    name: 'Rhea Sharma',
    credential: 'Tech Lead @ Razorpay, Distributed Systems Specialist',
    nicheTag: 'Tech Mentorship',
    domainChip: 'peer.find/rhea.tech',
    rate: '₹3,499 / session',
    rating: '4.9',
    reviewsCount: 42,
    outcomes: ['System Architecture Audits', 'High-Throughput Payments', 'Staff Engineer Roadmaps'],
    bio: 'Architected high-frequency payment gateways scaling to 50k+ TPS. Specializes in system design mock interviews and architecture sanity reviews.',
    availableSlot: 'Today, 7:30 PM IST',
  },
  {
    id: 'vikram-sengupta',
    initials: 'VS',
    name: 'Vikram Sengupta',
    credential: 'Series A Founder (Exited $12M), Angel Investor',
    nicheTag: 'Fundraising',
    domainChip: 'peer.find/vikram.tech',
    rate: '₹4,999 / session',
    rating: '5.0',
    reviewsCount: 29,
    outcomes: ['Pitch Deck Line-by-Line', 'Term Sheet Negotiation', 'Investor Pitch Teardowns'],
    bio: 'Built and exited an enterprise compliance startup. Raised from top tier VCs in US & India. Direct feedback on deck, narrative, and valuation math.',
    availableSlot: 'Thursday, 6:00 PM IST',
  },
  {
    id: 'deepika-nair',
    initials: 'DN',
    name: 'Deepika Nair',
    credential: 'Head of Talent @ Swiggy, Ex-McKinsey',
    nicheTag: 'Career Coaching',
    domainChip: 'peer.find/deepika.tech',
    rate: '₹2,499 / session',
    rating: '4.95',
    reviewsCount: 51,
    outcomes: ['Executive Resume Teardown', 'Compensation Negotiation', 'Behavioral Leadership Rounds'],
    bio: 'Hired 300+ product and engineering leaders. Teaches candidates how to position their story, demand market-rate equity, and land top 1% offers.',
    availableSlot: 'Friday, 5:00 PM IST',
  },
  {
    id: 'sameer-chen',
    initials: 'SC',
    name: 'Sameer Chen',
    credential: 'Principal Infra Architect @ AWS (Cloud & DevOps)',
    nicheTag: 'DevOps & Cloud',
    domainChip: 'peer.find/sameer.tech',
    rate: '₹3,999 / session',
    rating: '5.0',
    reviewsCount: 34,
    outcomes: ['AWS/GCP Cost Optimization', 'Kubernetes & CI/CD Audits', 'Disaster Recovery Systems'],
    bio: 'Helps scale-stage tech startups slash monthly AWS/GCP bills by 40-60% without sacrificing reliability or performance.',
    availableSlot: 'Saturday, 11:00 AM IST',
  },
  {
    id: 'neha-verma',
    initials: 'NV',
    name: 'Neha Verma',
    credential: 'Chartered Accountant & Startup Legal Counsel',
    nicheTag: 'Finance & Legal',
    domainChip: 'peer.find/neha.tech',
    rate: '₹2,799 / session',
    rating: '4.9',
    reviewsCount: 24,
    outcomes: ['MCA & Tax Compliance (India)', 'ESOP Pool Structuring', 'Cap Table Hygiene'],
    bio: 'Advised over 60 Indian startups on Angel Tax compliance, cross-border entity structures, ESOP grant letters, and VC due diligence.',
    availableSlot: 'Tomorrow, 2:00 PM IST',
  },
];

export default function FeaturedAdvisors() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  const handleBookSlot = (adv: Advisor) => {
    setSelectedAdvisor(adv);
  };

  return (
    <section id="advisors" className="py-24 bg-dark-900 border-t border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-dark-800">
          <div>
            <div className="font-mono text-xs text-coral-500 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" /> VERIFIED ROSTER
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              featured <span className="text-coral-500 font-mono">advisors_</span>
            </h2>
            <p className="text-techGray-300 font-sans mt-3 max-w-xl text-base">
              Direct 1:1 access to experts with proven track records. No middle managers or junior consultants.
            </p>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs text-techGray-400 flex items-center gap-2">
            <span>SORTED BY VERIFIED REVIEWS</span>
            <span className="text-coral-500 font-bold">★ 4.9+ AVG</span>
          </div>
        </div>

        {/* Advisor Cards Grid - get.tech dark cards style (Image 2 & 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_ADVISORS.map((adv) => (
            <div
              key={adv.id}
              className="group bg-dark-850 border border-dark-700/80 hover:border-coral-500/50 p-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-coral-500/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header row with avatar & domain chip */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-coral-500/15 border border-coral-500/40 text-coral-400 font-mono font-bold text-lg flex items-center justify-center shrink-0">
                      {adv.initials}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-white text-lg group-hover:text-coral-400 transition-colors flex items-center gap-1.5">
                        {adv.name}
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      </h3>
                      <div className="font-mono text-xs text-techGray-400">
                        {adv.nicheTag}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-[11px] bg-dark-800 text-coral-400 px-2 py-1 rounded border border-dark-700">
                    {adv.domainChip}
                  </span>
                </div>

                {/* Credential line */}
                <p className="text-techGray-200 text-sm font-sans font-medium line-clamp-2">
                  {adv.credential}
                </p>

                {/* Outcomes / Skills list */}
                <div className="space-y-1.5 pt-2">
                  <div className="font-mono text-[11px] text-techGray-400 uppercase tracking-wider">
                    CONSULTATION AREAS:
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {adv.outcomes.map((out, i) => (
                      <span
                        key={i}
                        className="bg-dark-900 text-techGray-300 border border-dark-700 px-2 py-1 rounded text-[11px]"
                      >
                        {out}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating & Next available slot */}
                <div className="flex items-center justify-between text-xs font-mono text-techGray-400 pt-2 border-t border-dark-800">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{adv.rating}</span>
                    <span className="text-techGray-400 font-normal">({adv.reviewsCount})</span>
                  </div>
                  <div className="text-emerald-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{adv.availableSlot}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-dark-800 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-techGray-400">SESSION RATE</div>
                  <div className="font-mono font-bold text-white text-base">{adv.rate}</div>
                </div>

                <button
                  onClick={() => handleBookSlot(adv)}
                  className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono text-xs font-bold px-4 py-2.5 rounded-md transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <span>&gt; view_profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Quick View Popup for Profile */}
        <AnimatePresence>
          {selectedAdvisor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-dark-900 border border-dark-700 max-w-lg w-full p-6 rounded-xl shadow-2xl space-y-6 font-sans relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-coral-500/20 text-coral-400 font-mono font-bold text-xl flex items-center justify-center border border-coral-500/40">
                      {selectedAdvisor.initials}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        {selectedAdvisor.name}
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </h4>
                      <div className="font-mono text-xs text-coral-400">{selectedAdvisor.domainChip}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAdvisor(null)}
                    className="text-techGray-400 hover:text-white font-mono text-sm p-1"
                  >
                    [X]
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="font-mono text-xs text-techGray-400">CREDENTIALS & BACKGROUND</div>
                  <p className="text-techGray-200 text-sm leading-relaxed">{selectedAdvisor.bio}</p>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="text-techGray-400">SESSION DELIVERABLES</div>
                  <ul className="space-y-1.5 text-techGray-200">
                    {selectedAdvisor.outcomes.map((o, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-coral-500">✓</span> {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-dark-850 rounded-lg border border-dark-700 flex items-center justify-between font-mono text-xs">
                  <div>
                    <div className="text-techGray-400">SESSION RATE</div>
                    <div className="text-lg font-bold text-white">{selectedAdvisor.rate}</div>
                  </div>
                  <div>
                    <div className="text-techGray-400">NEXT SLOT</div>
                    <div className="text-emerald-400 font-bold">{selectedAdvisor.availableSlot}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedAdvisor(null);
                      const waitlist = document.getElementById('waitlist');
                      if (waitlist) waitlist.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold py-3 rounded-md text-center text-sm shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>&gt; request_slot_booking</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
