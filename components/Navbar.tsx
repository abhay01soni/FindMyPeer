'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Terminal, Menu, X, ArrowUpRight, LogIn, LogOut, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserProfileMenu from './UserProfileMenu';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, openAuthModal, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDiscoverPage = pathname === '/discover';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isDiscoverPage
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-dark-700/60 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
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
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
            <Link
              href="/discover"
              className={`transition-colors flex items-center gap-1 hover:translate-y-[-1px] duration-150 cursor-pointer relative ${
                isDiscoverPage ? 'text-coral-400 font-bold' : 'text-techGray-300 hover:text-coral-400'
              }`}
            >
              <span className="text-coral-500 text-xs">/</span> discover
              <span className="bg-coral-500/20 text-coral-400 text-[10px] px-1 py-0.2 rounded border border-coral-500/30">new</span>
            </Link>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-techGray-300 hover:text-white transition-colors flex items-center gap-1 hover:translate-y-[-1px] duration-150 cursor-pointer"
            >
              <span className="text-coral-500 text-xs">/</span> how_it_works
            </button>
          </nav>

          {/* Right CTA Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            
            {user ? (
              <UserProfileMenu />
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="font-mono text-xs text-techGray-300 hover:text-white px-3 py-2 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-coral-400" />
                <span>sign_in</span>
              </button>
            )}

            <button
              onClick={() => scrollToSection('waitlist')}
              className="group bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono text-xs font-bold px-4 py-2.5 rounded-md transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-coral-500/10 active:scale-95 cursor-pointer"
            >
              <span>&gt; join_beta</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls: Toggle + Profile / Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {user && <UserProfileMenu />}
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
            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-coral-400 hover:text-coral-300 border-b border-dark-800 font-bold"
            >
              / discover (find advisor directory)
            </Link>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left py-2 text-techGray-300 hover:text-white border-b border-dark-800"
            >
              / how_it_works
            </button>
            
            <div className="pt-2 flex flex-col gap-2">
              <div className="py-2 flex items-center justify-between border-b border-dark-800">
                <span className="text-techGray-400 text-xs uppercase">Appearance</span>
                <ThemeToggle showLabel />
              </div>

              {!user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full bg-dark-850 hover:bg-dark-800 text-coral-400 border border-dark-700 font-bold px-4 py-3 rounded-md text-center flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>&gt; sign_in (magiclink)</span>
                </button>
              ) : (
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await signOut();
                  }}
                  className="w-full bg-dark-850 hover:bg-red-500/20 text-techGray-300 hover:text-red-400 border border-dark-700 font-bold px-4 py-3 rounded-md text-center flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>&gt; sign_out</span>
                </button>
              )}

              <button
                onClick={() => scrollToSection('waitlist')}
                className="w-full bg-coral-500 hover:bg-coral-600 text-dark-950 font-bold px-4 py-3 rounded-md text-center flex items-center justify-center gap-2 mt-1"
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
