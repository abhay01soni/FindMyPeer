'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Briefcase, 
  Sparkles, 
  ExternalLink,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function UserProfileMenu() {
  const { user, profile, signOut, isConfigured } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const email = user.email || profile?.email || 'user@findmypeer.io';
  const role = profile?.role || (user.user_metadata?.role as string) || 'client';
  const displayName = profile?.full_name || user.user_metadata?.full_name || email.split('@')[0];
  const initial = (displayName[0] || 'U').toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-dark-850 hover:bg-dark-800 border border-dark-700 hover:border-coral-500/50 py-1.5 px-3 rounded-lg transition-all text-xs font-mono group cursor-pointer"
        aria-label="User profile menu"
      >
        <div className="w-6 h-6 rounded bg-coral-500/20 border border-coral-500/40 text-coral-400 font-bold flex items-center justify-center text-xs">
          {initial}
        </div>
        <div className="text-left hidden sm:block max-w-[120px] truncate">
          <span className="text-white font-medium block truncate">{displayName}</span>
        </div>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase hidden md:inline-block ${
          role === 'expert'
            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            : 'bg-coral-500/15 text-coral-400 border border-coral-500/30'
        }`}>
          {role}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-techGray-400 transition-transform ${isOpen ? 'rotate-180 text-coral-400' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-dark-900 border border-dark-700 rounded-xl shadow-2xl p-4 z-50 font-sans"
          >
            {/* User Header */}
            <div className="flex items-start gap-3 pb-3 border-b border-dark-800">
              <div className="w-10 h-10 rounded-lg bg-coral-500/20 border border-coral-500/40 text-coral-400 font-bold flex items-center justify-center text-base font-mono">
                {initial}
              </div>
              <div className="overflow-hidden flex-1">
                <h4 className="text-white font-bold text-sm truncate">{displayName}</h4>
                <p className="text-techGray-400 text-xs truncate font-mono">{email}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                    role === 'expert'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-coral-500/15 text-coral-400 border border-coral-500/30'
                  }`}>
                    {role} ACCESS
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Storage Info */}
            <div className="py-2.5 my-1 font-mono text-[11px] text-techGray-400 space-y-1 bg-dark-850 px-2.5 rounded-md border border-dark-800">
              <div className="flex justify-between">
                <span>AUTH SESSION:</span>
                <span className="text-white">MAGICLINK_OTP</span>
              </div>
              <div className="flex justify-between">
                <span>STORAGE:</span>
                <span className={isConfigured ? 'text-emerald-400' : 'text-amber-400'}>
                  {isConfigured ? 'SUPABASE_PG' : 'LOCAL_SANDBOX'}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="py-2 space-y-1 font-mono text-xs">
              <a
                href="#waitlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-md text-techGray-300 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-coral-400" />
                <span>My Beta Status / Form</span>
              </a>
              <a
                href="#advisors"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-md text-techGray-300 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 text-techGray-400" />
                <span>Browse Advisors</span>
              </a>
            </div>

            {/* Sign Out Button */}
            <div className="pt-2 border-t border-dark-800">
              <button
                onClick={async () => {
                  setIsOpen(false);
                  await signOut();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-dark-800 hover:bg-red-500/20 text-techGray-300 hover:text-red-400 font-mono text-xs transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>&gt; sign_out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
