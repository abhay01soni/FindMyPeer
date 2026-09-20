'use client';

import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  User, 
  Briefcase, 
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface ProfileCompletionCardProps {
  hasBio: boolean;
  hasServices: boolean;
  isCalendarConnected: boolean;
  onConnectCalendar: () => void;
  onNavigateTab: (tab: 'services') => void;
}

export default function ProfileCompletionCard({
  hasBio,
  hasServices,
  isCalendarConnected,
  onConnectCalendar,
  onNavigateTab,
}: ProfileCompletionCardProps) {
  const completedSteps = [hasBio, hasServices, isCalendarConnected].filter(Boolean).length;
  const isProfileComplete = completedSteps === 3;

  return (
    <div className="bg-dark-900 border border-dark-750 p-6 sm:p-8 rounded-xl space-y-6 shadow-2xl font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-coral-500/15 border border-coral-500/30 text-coral-400 flex items-center justify-center font-mono font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-mono">
              PROFILE COMPLETION STATUS
              {isProfileComplete && (
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              )}
            </h2>
            <p className="text-techGray-300 text-xs sm:text-sm">
              Complete all 3 onboarding steps to activate direct 1:1 client bookings and visibility on FindMyPeer discovery.
            </p>
          </div>
        </div>

        <div className="font-mono text-xs bg-dark-850 px-3.5 py-2 rounded-lg border border-dark-700 text-techGray-300 shrink-0">
          STATUS: <strong className="text-white">{completedSteps}</strong> / 3 STEPS COMPLETED
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-techGray-400">ONBOARDING PROGRESS</span>
          <span className="text-emerald-400 font-bold">{Math.round((completedSteps / 3) * 100)}%</span>
        </div>
        <div className="w-full bg-dark-800 rounded-full h-3 overflow-hidden border border-dark-700">
          <div 
            className={`h-full transition-all duration-500 ${
              isProfileComplete ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-coral-500'
            }`}
            style={{ width: `${(completedSteps / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* 3 Step Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
        
        {/* Step 1: Bio & Credentials */}
        <div className={`p-5 rounded-xl border space-y-3 transition-all ${
          hasBio ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-dark-850 border-dark-750'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <User className="w-4 h-4 text-coral-400" />
              <span>1. Bio Added</span>
            </div>
            {hasBio ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-techGray-500" />
            )}
          </div>
          <p className="text-techGray-300 font-sans text-xs">
            {hasBio ? 'Professional bio, headline, and experience details are configured.' : 'Add your professional bio, ex-company tags, and outcomes.'}
          </p>
          {!hasBio && (
            <button
              onClick={() => onNavigateTab('services')}
              className="text-coral-400 hover:text-coral-300 underline font-bold flex items-center gap-1"
            >
              <span>Edit Bio & Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Step 2: Service Offered */}
        <div className={`p-5 rounded-xl border space-y-3 transition-all ${
          hasServices ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-dark-850 border-dark-750'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Briefcase className="w-4 h-4 text-coral-400" />
              <span>2. Service Added</span>
            </div>
            {hasServices ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-techGray-500" />
            )}
          </div>
          <p className="text-techGray-300 font-sans text-xs">
            {hasServices ? 'Active 1:1 consultation session prices and duration configured.' : 'Create at least 1 active consultation service with custom pricing.'}
          </p>
          {!hasServices && (
            <button
              onClick={() => onNavigateTab('services')}
              className="text-coral-400 hover:text-coral-300 underline font-bold flex items-center gap-1"
            >
              <span>Add 1:1 Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Step 3: GCal Synced */}
        <div className={`p-5 rounded-xl border space-y-3 transition-all ${
          isCalendarConnected ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-dark-850 border-dark-750'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Calendar className="w-4 h-4 text-coral-400" />
              <span>3. GCal Synced</span>
            </div>
            {isCalendarConnected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-techGray-500" />
            )}
          </div>
          <p className="text-techGray-300 font-sans text-xs">
            {isCalendarConnected ? 'Google Calendar linked for automated Google Meet link generation.' : 'Connect Google Calendar to enable automated slot booking & Meet links.'}
          </p>
          {!isCalendarConnected && (
            <button
              onClick={onConnectCalendar}
              className="text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1"
            >
              <span>Connect GCal Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
