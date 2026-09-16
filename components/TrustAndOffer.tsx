'use client';

import React from 'react';
import { ShieldCheck, ArrowUpRight, Sparkles, Check, Calendar, Users, Video } from 'lucide-react';

export default function TrustAndOffer() {
  const handleJoinOffer = () => {
    const target = document.getElementById('waitlist');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('switch-waitlist-role', { detail: 'expert' }));
    }
  };

  return (
    <section id="trust" className="py-24 bg-dark-900 border-t border-dark-800 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-coral-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Verification & Trust Standard */}
          <div className="lg:col-span-6 bg-dark-850 border border-dark-700 p-8 rounded-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-dark-800 border border-dark-700 font-mono text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% VERIFIED ADVISORS</span>
              </div>

              <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
                how we verify <span className="text-coral-500 font-mono">advisor quality_</span>
              </h2>

              <p className="text-techGray-300 font-sans text-sm sm:text-base leading-relaxed">
                Credibility on FindMyPeer is earned through rigorous proof-of-work checks. We do not accept unverified profiles or inflated titles.
              </p>

              <div className="space-y-3 font-mono text-xs pt-2">
                <div className="flex items-start gap-3 bg-dark-900 p-3.5 rounded-lg border border-dark-800">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Employment & Role Verification</div>
                    <div className="text-techGray-400 mt-0.5 font-sans">
                      Work email & LinkedIn identity cross-checks to verify actual titles at tier-1 companies.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-dark-900 p-3.5 rounded-lg border border-dark-800">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Proof-of-Work & Outcome Audits</div>
                    <div className="text-techGray-400 mt-0.5 font-sans">
                      Screening session samples or verified public contributions (Open source, YC, Patent, Exit).
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-dark-900 p-3.5 rounded-lg border border-dark-800">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Review Authenticity Guarantee</div>
                    <div className="text-techGray-400 mt-0.5 font-sans">
                      100% of reviews are tied strictly to completed, verified video consultation sessions.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dark-800 font-mono text-xs text-techGray-400 flex items-center justify-between">
              <span>ZERO INFLATED CLAIMS</span>
              <span className="text-emerald-400">STATUS: STRICT AUDIT ON</span>
            </div>
          </div>

          {/* Right: Advisor Empowerment & Dedicated Platform Tooling */}
          <div className="lg:col-span-6 bg-gradient-to-br from-dark-850 via-dark-850 to-dark-900 border-2 border-coral-500/60 p-8 rounded-xl flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl shadow-coral-500/10">
            {/* Top Ribbon */}
            <div className="absolute top-0 right-0 bg-coral-500 text-dark-950 font-mono font-bold text-[11px] px-4 py-1.5 rounded-bl-lg uppercase tracking-wider shadow-md">
              FOUNDING ADVISORS • NOW ONBOARDING
            </div>

            <div className="space-y-5 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-coral-500/10 border border-coral-500/30 font-mono text-xs text-coral-400">
                <Sparkles className="w-4 h-4 text-coral-400" />
                <span>BUILT FOR OPERATORS & ADVISORS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
                advise on your terms. <span className="text-coral-500 font-mono">zero admin overhead_</span>
              </h2>

              <p className="text-techGray-300 font-sans text-sm sm:text-base leading-relaxed">
                Focus strictly on high-leverage peer insights. FindMyPeer handles calendar sync, seeker context briefs, and private video rooms automatically.
              </p>

              <div className="grid grid-cols-2 gap-4 font-mono pt-2">
                <div className="bg-dark-900/90 p-4 rounded-lg border border-dark-700">
                  <div className="text-xs text-techGray-400 uppercase">CALENDAR CONTROL</div>
                  <div className="text-xl sm:text-2xl font-bold text-white mt-1">100% Autonomy</div>
                  <div className="text-[11px] text-emerald-400 mt-1">CUSTOM SLOTS & BUFFER</div>
                </div>

                <div className="bg-dark-900/90 p-4 rounded-lg border border-dark-700">
                  <div className="text-xs text-techGray-400 uppercase">SEEKER MATCHING</div>
                  <div className="text-xl sm:text-2xl font-bold text-coral-400 mt-1">Pre-Screened</div>
                  <div className="text-[11px] text-techGray-400 mt-1">DETAILED CONTEXT BRIEFS</div>
                </div>
              </div>

              <ul className="font-mono text-xs text-techGray-300 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <span className="text-coral-500 font-bold">&gt;</span> Automated Google Meet & calendar integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-coral-500 font-bold">&gt;</span> Pre-session agenda & problem statement collected in advance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-coral-500 font-bold">&gt;</span> Verified expert badge & public proof-of-work showcase
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs text-techGray-400">
                FOUNDING COHORT: <span className="text-white font-bold">312 / 500 APPLIED</span>
              </div>
              <button
                onClick={handleJoinOffer}
                className="w-full sm:w-auto bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono text-xs font-bold px-6 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shrink-0 active:scale-95 cursor-pointer"
              >
                <span>&gt; apply_as_advisor</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
