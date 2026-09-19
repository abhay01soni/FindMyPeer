'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, CheckCircle2, Loader2 } from 'lucide-react';

export interface ClientProfileData {
  full_name: string;
  email: string;
  phone: string;
}

interface ClientProfileSectionProps {
  profile: ClientProfileData;
  onSaveProfile: (updated: Partial<ClientProfileData>) => Promise<boolean>;
  isLoading?: boolean;
}

export default function ClientProfileSection({
  profile,
  onSaveProfile,
  isLoading = false,
}: ClientProfileSectionProps) {
  const [formData, setFormData] = useState<ClientProfileData>({
    full_name: profile.full_name || '',
    email: profile.email || '',
    phone: profile.phone || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFormData({
      full_name: profile.full_name || '',
      email: profile.email || '',
      phone: profile.phone || '',
    });
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const success = await onSaveProfile({
      full_name: formData.full_name,
      phone: formData.phone,
    });

    setIsSaving(false);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-dark-900 border border-dark-750 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-800 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-coral-400">
          <User className="w-4 h-4" />
          <span className="text-white font-bold text-sm font-sans tracking-tight">Client Account Details</span>
        </div>
        <span className="font-mono text-[11px] text-techGray-400 uppercase">PERSONAL PROFILE</span>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile information updated in Supabase!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block font-mono text-xs text-techGray-300">
              FULL NAME <span className="text-coral-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-techGray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="e.g. Vikram Sharma"
                className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:border-coral-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email (Read-Only) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-mono text-xs text-techGray-300">
                EMAIL ADDRESS
              </label>
              <span className="text-[10px] font-mono text-techGray-500">AUTH READ-ONLY</span>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-techGray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                readOnly
                disabled
                value={formData.email}
                className="w-full bg-dark-950 border border-dark-800 text-techGray-400 rounded-lg pl-10 pr-4 py-3 text-sm cursor-not-allowed font-mono opacity-80"
              />
            </div>
          </div>

        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block font-mono text-xs text-techGray-300">
            PHONE NUMBER (FOR SMS / WHATSAPP REMINDERS)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-techGray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg pl-10 pr-4 py-3 text-sm font-mono focus:border-coral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSaving}
          className="bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-dark-950 font-mono font-bold px-6 py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SAVING_CHANGES...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>&gt; Save Profile Changes</span>
            </>
          )}
        </button>

      </form>

    </div>
  );
}
