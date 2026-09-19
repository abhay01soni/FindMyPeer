'use client';

import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Star, 
  IndianRupee, 
  Check, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface StatusBannerProps {
  hasBio: boolean;
  hasServices: boolean;
  isCalendarConnected: boolean;
  totalCompletedBookings: number;
  ratingAvg: number;
  monthlyNetEarnings: number;
  onConnectCalendar: () => void;
}

export default function StatusBanner({
  hasBio,
  hasServices,
  isCalendarConnected,
  totalCompletedBookings,
  ratingAvg,
  monthlyNetEarnings,
  onConnectCalendar,
}: StatusBannerProps) {
  const completedSteps = [hasBio, hasServices, isCalendarConnected].filter(Boolean).length;
  const isProfileComplete = completedSteps === 3;

  return (
    <div className="space-y-6">
      {/* 1. Google Calendar Required Warning Banner (If not connected) */}
      {!isCalendarConnected && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans shadow-lg">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <span>Google Calendar Not Connected</span>
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                  BOOKINGS DISABLED
                </span>
              </h3>
              <p className="text-techGray-300 text-xs sm:text-sm mt-0.5">
                Your profile cannot receive real client bookings until your Google Calendar is linked for automated Google Meet link generation and slot syncing.
              </p>
            </div>
          </div>

          <button
            onClick={onConnectCalendar}
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-dark-950 font-mono text-xs font-bold px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>&gt; Connect Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Header & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Completion Card */}
        <div className="lg:col-span-6 bg-dark-900 border border-dark-750 p-6 rounded-xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-coral-400">
              <Sparkles className="w-4 h-4" />
              <span>PROFILE COMPLETION STATUS</span>
            </div>
            <span className="font-mono text-xs text-techGray-400">
              <strong className="text-white">{completedSteps}</strong> / 3 STEPS
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden border border-dark-700">
            <div 
              className={`h-full transition-all duration-500 ${
                isProfileComplete ? 'bg-emerald-500' : 'bg-coral-500'
              }`}
              style={{ width: `${(completedSteps / 3) * 100}%` }}
            />
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
            <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
              hasBio ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-dark-850 border-dark-750 text-techGray-400'
            }`}>
              <span>1. Bio Added</span>
              {hasBio ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-techGray-500" />}
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
              hasServices ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-dark-850 border-dark-750 text-techGray-400'
            }`}>
              <span>2. Service Added</span>
              {hasServices ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-techGray-500" />}
            </div>

            <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
              isCalendarConnected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-dark-850 border-dark-750 text-techGray-400'
            }`}>
              <span>3. GCal Synced</span>
              {isCalendarConnected ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4 text-techGray-500" />}
            </div>
          </div>
        </div>

        {/* 3. Quick Stat Cards (Completed Bookings, Rating Avg, Monthly Net) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: Completed Bookings */}
          <div className="bg-dark-900 border border-dark-750 p-5 rounded-xl space-y-2 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-techGray-400 uppercase">COMPLETED CALLS</span>
              <div className="p-2 rounded bg-coral-500/10 border border-coral-500/20 text-coral-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-white">{totalCompletedBookings}</div>
              <div className="text-[11px] font-sans text-techGray-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> Total 1:1 Sessions
              </div>
            </div>
          </div>

          {/* Card 2: Rating Avg */}
          <div className="bg-dark-900 border border-dark-750 p-5 rounded-xl space-y-2 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-techGray-400 uppercase">RATING AVERAGE</span>
              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-white flex items-baseline gap-1">
                <span>{ratingAvg > 0 ? ratingAvg.toFixed(1) : '5.0'}</span>
                <span className="text-xs text-amber-400 font-normal">/ 5.0 ★</span>
              </div>
              <div className="text-[11px] font-sans text-techGray-400 mt-1">
                Client Satisfaction Score
              </div>
            </div>
          </div>

          {/* Card 3: Monthly Net Earnings */}
          <div className="bg-dark-900 border border-dark-750 p-5 rounded-xl space-y-2 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-techGray-400 uppercase">THIS MONTH NET</span>
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-white truncate">
                ₹{monthlyNetEarnings.toLocaleString()}
              </div>
              <div className="text-[11px] font-sans text-emerald-400 mt-1 flex items-center gap-1">
                <span>After 12% commission</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
