'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-dark-700/60 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - get.tech inspired monospace branding */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="bg-dark-800 border border-dark-700 p-1.5 rounded text-coral-500 group-hover:border-coral-500/50 transition-colors">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold tracking-tight text-lg text-white group-hover:text-coral-400 transition-colors flex items-center gap-1">
                FINDMYPEER<span className="text-coral-500 animate-cursor">_</span>
              </span>
              <span className="font-mono text-[10px] text-techGray-400 -mt-1 tracking-wider uppercase">
                1:1 EXPERT DIRECTORY
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
            <button
              onClick={() => scrollToSection('niches')}
              className="text-techGray-300 hover:text-white transition-colors flex items-center gap-1 hover:translate-y-[-1px] duration-150 cursor-pointer"
            >
              <span className="text-coral-500 text-xs">/</span> niches
            </button>
            <button
              onClick={() => scrollToSection('advisors')}
              className="text-techGray-300 hover:text-white transition-colors flex items-center gap-1 hover:translate-y-[-1px] duration-150 cursor-pointer"
            >
              <span className="text-coral-500 text-xs">/</span> advisors
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-techGray-300 hover:text-white transition-colors flex items-center gap-1 hover:translate-y-[-1px] duration-150 cursor-pointer"
            >
              <span className="text-coral-500 text-xs">/</span> how_it_works
            </button>
            <button
              onClick={() => scrollToSection('trust')}
              className="text-techGray-300 hover:text-white transition-colors flex items-center gap-1 hover:translate-y-[-1px] duration-150 cursor-pointer"
            >
              <span className="text-coral-500 text-xs">/</span> trust_offer
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-techGray-300 hover:text-white transition-colors flex items-center gap-1 hover:translate-y-[-1px] duration-150 cursor-pointer"
            >
              <span className="text-coral-500 text-xs">/</span> faq
            </button>
          </nav>

          {/* Right CTA Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            
            <button
              onClick={() => scrollToSection('waitlist')}
              className="font-mono text-xs text-techGray-300 hover:text-white px-3 py-2 transition-colors cursor-pointer"
            >
              login
            </button>
            <button
              onClick={() => scrollToSection('waitlist')}
              className="group bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono text-xs font-bold px-4 py-2.5 rounded-md transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-coral-500/10 active:scale-95 cursor-pointer"
            >
              <span>&gt; join_beta</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls: Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-techGray-300 hover:text-white bg-dark-850 border border-dark-700 rounded-md cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-dark-900 border border-dark-700 rounded-lg shadow-2xl space-y-4 font-mono text-sm">
            <button
              onClick={() => scrollToSection('niches')}
              className="block w-full text-left py-2 text-techGray-300 hover:text-white border-b border-dark-800"
            >
              / niches
            </button>
            <button
              onClick={() => scrollToSection('advisors')}
              className="block w-full text-left py-2 text-techGray-300 hover:text-white border-b border-dark-800"
            >
              / advisors
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left py-2 text-techGray-300 hover:text-white border-b border-dark-800"
            >
              / how_it_works
            </button>
            <button
              onClick={() => scrollToSection('trust')}
              className="block w-full text-left py-2 text-techGray-300 hover:text-white border-b border-dark-800"
            >
              / trust_offer
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 text-techGray-300 hover:text-white border-b border-dark-800"
            >
              / faq
            </button>
            <div className="pt-2 flex flex-col gap-2">
              <div className="py-2 flex items-center justify-between border-b border-dark-800">
                <span className="text-techGray-400 text-xs uppercase">Appearance</span>
                <ThemeToggle showLabel />
              </div>
              <button
                onClick={() => scrollToSection('waitlist')}
                className="w-full bg-coral-500 hover:bg-coral-600 text-dark-950 font-bold px-4 py-3 rounded-md text-center flex items-center justify-center gap-2 mt-2"
              >
                <span>&gt; join_beta</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
