'use client';

import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ADVISOR_ROSTER = [
  { initials: 'AK', name: 'Arjun Kapoor', credential: 'Ex-Google Staff PM, 9 yrs', tag: 'Product', rate: '₹2,999/session' },
  { initials: 'RS', name: 'Rhea Sharma', credential: 'Tech Lead @ Razorpay', tag: 'System Design', rate: '₹3,499/session' },
  { initials: 'VS', name: 'Vikram Sengupta', credential: 'Series A Founder (Exited)', tag: 'Fundraising', rate: '₹4,999/session' },
  { initials: 'DN', name: 'Deepika Nair', credential: 'Head of Talent @ Swiggy', tag: 'Career', rate: '₹2,499/session' },
  { initials: 'SC', name: 'Sameer Chen', credential: 'Principal Infra Eng @ AWS', tag: 'Cloud', rate: '₹3,999/session' },
  { initials: 'NV', name: 'Neha Verma', credential: 'CA & Startup Legal Advisor', tag: 'Compliance', rate: '₹2,799/session' },
  { initials: 'MK', name: 'Manish Kumar', credential: 'Ex-Meta VP Engineering', tag: 'Tech Stack', rate: '₹5,999/session' },
  { initials: 'PL', name: 'Pooja Laxman', credential: 'Growth Advisor @ YC W22', tag: 'GTM Strategy', rate: '₹3,299/session' },
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = document.getElementById('niches');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = (role: 'client' | 'expert') => {
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to select tab
      window.dispatchEvent(new CustomEvent('switch-waitlist-role', { detail: role }));
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-tech-grid">
      {/* Background radial glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-coral-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-8 text-left space-y-8">
            
            {/* Top Tag / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-dark-850 border border-dark-700 font-mono text-xs text-techGray-300"
            >
              <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
              <span className="text-white font-semibold">FINDMYPEER 1.0</span>
              <span className="text-dark-700">|</span>
              <span className="text-coral-400">1:1 EXPERT DIRECTORY</span>
            </motion.div>

            {/* Main Headline - get.tech signature layout */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-white leading-[1.1]"
            >
              nothing signals expertise like being on <span className="text-coral-500 font-mono inline-block">.peer_</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-techGray-300 max-w-2xl font-sans leading-relaxed"
            >
              No fluff. No generic advice. Just focused 1:1 consultation sessions with verified advisors who have built, scaled, and solved your exact problem.
            </motion.p>

            {/* get.tech terminal style search input bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearchSubmit}
              className="max-w-2xl bg-[#EFECE6] p-1.5 rounded-lg flex items-center shadow-xl border border-white/20 text-dark-950 font-mono"
            >
              <div className="pl-3 text-dark-950/60 flex items-center gap-2">
                <Search className="w-5 h-5 text-dark-950/80" />
                <span className="text-dark-950/40 text-xs hidden sm:inline">&lt;query:</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='"system design, pitch deck, PM interview"'
                className="w-full bg-transparent px-2 py-2.5 text-sm sm:text-base text-dark-950 placeholder:text-dark-950/50 focus:outline-none font-mono"
              />
              <span className="text-dark-950/40 text-xs hidden sm:inline pr-2">&gt;</span>
              <button
                type="submit"
                className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold px-6 py-2.5 rounded-md text-sm transition-all duration-200 flex items-center gap-2 shadow-md shrink-0 active:scale-95"
              >
                <span>&gt; search</span>
              </button>
            </motion.form>

            {/* Dual CTAs & Credibility stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => handleCtaClick('client')}
                className="bg-dark-800 hover:bg-dark-700 text-white border border-dark-700 hover:border-coral-500/50 font-mono text-sm px-5 py-3 rounded-md transition-all duration-200 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-coral-400" />
                <span>&gt; I&apos;m looking for advice</span>
              </button>
              
              <button
                onClick={() => handleCtaClick('expert')}
                className="bg-transparent hover:bg-dark-850 text-techGray-300 hover:text-white border border-dark-700 font-mono text-sm px-5 py-3 rounded-md transition-all duration-200 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>&gt; I&apos;m an expert</span>
              </button>
            </motion.div>

            {/* Trust badge note */}
            <div className="flex items-center gap-4 text-xs font-mono text-techGray-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 100% Verified Credentials
              </span>
              <span>•</span>
              <span>Direct Google Meet Link</span>
              <span>•</span>
              <span>Zero Subscription Fee</span>
            </div>

          </div>

          {/* Right side live status card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="bg-dark-900/90 border border-dark-700 p-6 rounded-xl space-y-5 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-dark-600 transition-colors">
              <div className="flex items-center justify-between border-b border-dark-800 pb-3 font-mono text-xs">
                <span className="text-techGray-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ROSTER STATUS
                </span>
                <span className="text-coral-400">ACTIVE ADVISORS</span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="bg-dark-850 p-3 rounded-lg border border-dark-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-techGray-400">ACCEPTED EXPERTS</div>
                    <div className="text-2xl font-bold text-white mt-0.5">500+</div>
                  </div>
                  <div className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">VERIFIED</div>
                </div>

                <div className="bg-dark-850 p-3 rounded-lg border border-dark-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-techGray-400">COMPLETED SESSIONS</div>
                    <div className="text-2xl font-bold text-coral-400 mt-0.5">1,420+</div>
                  </div>
                  <div className="text-xs text-techGray-400 font-mono">4.9★ RATING</div>
                </div>

                <div className="bg-dark-850 p-3 rounded-lg border border-dark-800">
                  <div className="flex items-center justify-between text-xs text-techGray-400 mb-2">
                    <span>AVG RESPONSE TIME</span>
                    <span className="text-white">&lt; 4 HOURS</span>
                  </div>
                  <div className="w-full bg-dark-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-coral-500 h-full w-[85%]" />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs font-mono text-techGray-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-coral-400 shrink-0" />
                <span>Launch slots open for first 500 verified advisors.</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Marquee ticker of active advisors — continuous motion element */}
      <div className="mt-16 md:mt-24 border-y border-dark-800 bg-dark-900/60 py-4 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...ADVISOR_ROSTER, ...ADVISOR_ROSTER].map((adv, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 bg-dark-850 border border-dark-700/80 px-4 py-2 rounded-lg font-mono text-xs hover:border-coral-500/50 transition-colors shrink-0"
            >
              <div className="w-7 h-7 rounded-full bg-coral-500/15 border border-coral-500/40 text-coral-400 flex items-center justify-center font-bold text-xs">
                {adv.initials}
              </div>
              <div>
                <div className="text-white font-sans font-semibold text-xs flex items-center gap-2">
                  <span>{adv.name}</span>
                  <span className="text-[10px] bg-dark-700 text-coral-400 px-1.5 py-0.5 rounded">
                    {adv.tag}
                  </span>
                </div>
                <div className="text-techGray-400 text-[11px]">{adv.credential}</div>
              </div>
              <div className="pl-2 border-l border-dark-700 text-techGray-300 font-bold text-xs">
                {adv.rate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
