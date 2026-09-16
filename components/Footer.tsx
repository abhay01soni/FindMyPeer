'use client';

import React from 'react';
import { Terminal, Github, Twitter, Linkedin, Disc as Discord } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-950 border-t border-dark-800 py-16 font-mono text-xs text-techGray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-dark-850 border border-dark-700 p-1.5 rounded text-coral-500">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-mono font-bold text-lg text-white">
                FINDMYPEER<span className="text-coral-500 animate-cursor">_</span>
              </span>
            </div>

            <p className="font-sans text-sm text-techGray-300 max-w-sm leading-relaxed">
              Book a focused 1:1 consultation session with verified advisors who have already solved your exact problem.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-dark-900 border border-dark-800 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Nav links columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">DIRECTORY</div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('niches')} className="hover:text-coral-400 transition-colors">
                    / niches
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('advisors')} className="hover:text-coral-400 transition-colors">
                    / advisors
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="hover:text-coral-400 transition-colors">
                    / how_it_works
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">TRUST & OFFER</div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('trust')} className="hover:text-coral-400 transition-colors">
                    / verified_badge
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('trust')} className="hover:text-coral-400 transition-colors">
                    / launch_offer
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('waitlist')} className="hover:text-coral-400 transition-colors">
                    / expert_onboarding
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">LEGAL & TECH</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-coral-400 transition-colors">/ privacy_policy</a></li>
                <li><a href="#" className="hover:text-coral-400 transition-colors">/ terms_of_service</a></li>
                <li><a href="#" className="hover:text-coral-400 transition-colors">/ security_audit</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom row: copyright, theme toggle & social links */}
        <div className="pt-8 border-t border-dark-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-techGray-400">
          <div>
            © 2026 FINDMYPEER INC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 pr-2 border-r border-dark-800">
              <span className="text-[11px] text-techGray-400">THEME:</span>
              <ThemeToggle />
            </div>

            <a href="#" className="p-2 rounded bg-dark-850 border border-dark-700 hover:text-coral-400 transition-colors cursor-pointer" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded bg-dark-850 border border-dark-700 hover:text-coral-400 transition-colors cursor-pointer" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded bg-dark-850 border border-dark-700 hover:text-coral-400 transition-colors cursor-pointer" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded bg-dark-850 border border-dark-700 hover:text-coral-400 transition-colors cursor-pointer" aria-label="Discord">
              <Discord className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
