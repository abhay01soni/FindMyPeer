'use client';

import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Linkedin, 
  MapPin, 
  Camera, 
  Plus, 
  Edit3, 
  Power, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  Save, 
  Loader2, 
  X, 
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export interface ProfessionalProfileData {
  id?: string;
  user_id?: string;
  bio: string;
  credentials: string;
  linkedin_url: string;
  years_experience: number;
  city: string;
  photo_url: string;
  status: 'draft' | 'active' | 'inactive' | 'suspended';
  google_calendar_connected: boolean;
  rating_avg: number;
}

export interface ServiceRecord {
  id: string;
  professional_id?: string;
  title: string;
  duration_minutes: number;
  price_inr: number;
  description: string;
  is_active: boolean;
}

interface ProfileServicesSectionProps {
  profile: ProfessionalProfileData;
  services: ServiceRecord[];
  onSaveProfile: (updated: Partial<ProfessionalProfileData>) => Promise<boolean>;
  onAddService: (newService: Omit<ServiceRecord, 'id'>) => Promise<boolean>;
  onToggleServiceActive: (serviceId: string, currentActive: boolean) => Promise<boolean>;
  onUpdateService: (serviceId: string, updated: Partial<ServiceRecord>) => Promise<boolean>;
  onConnectCalendar: () => Promise<void>;
  isLoading?: boolean;
}

export default function ProfileServicesSection({
  profile,
  services,
  onSaveProfile,
  onAddService,
  onToggleServiceActive,
  onUpdateService,
  onConnectCalendar,
  isLoading = false,
}: ProfileServicesSectionProps) {
  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfessionalProfileData>({
    bio: profile.bio || '',
    credentials: profile.credentials || '',
    linkedin_url: profile.linkedin_url || '',
    years_experience: profile.years_experience || 3,
    city: profile.city || '',
    photo_url: profile.photo_url || '',
    status: profile.status || 'active',
    google_calendar_connected: profile.google_calendar_connected || false,
    rating_avg: profile.rating_avg || 5.0,
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Add Service Modal State
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    duration_minutes: 30,
    price_inr: 2500,
    description: '',
    is_active: true,
  });
  const [isAddingService, setIsAddingService] = useState(false);

  // Edit Service State
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [isUpdatingService, setIsUpdatingService] = useState(false);

  // Cloudinary / Photo Upload simulation state
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileSaveSuccess(false);

    const success = await onSaveProfile(profileForm);
    setIsSavingProfile(false);

    if (success) {
      setProfileSaveSuccess(true);
      setTimeout(() => setProfileSaveSuccess(false), 3000);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title.trim()) return;

    setIsAddingService(true);
    const success = await onAddService(newService);
    setIsAddingService(false);

    if (success) {
      setIsAddServiceOpen(false);
      setNewService({
        title: '',
        duration_minutes: 30,
        price_inr: 2500,
        description: '',
        is_active: true,
      });
    }
  };

  const handleEditServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setIsUpdatingService(true);
    const success = await onUpdateService(editingService.id, {
      title: editingService.title,
      duration_minutes: editingService.duration_minutes,
      price_inr: editingService.price_inr,
      description: editingService.description,
    });
    setIsUpdatingService(false);

    if (success) {
      setEditingService(null);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setProfileForm((prev) => ({ ...prev, photo_url: url }));
    } catch (err) {
      console.error('Photo upload failed:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Profile Information Form */}
      <div className="bg-dark-900 border border-dark-750 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-dark-800 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-coral-400">
            <User className="w-4 h-4" />
            <span className="text-white font-bold text-sm font-sans tracking-tight">Professional Bio & Profile Setup</span>
          </div>
          <span className="font-mono text-[11px] text-techGray-400 uppercase">PUBLIC DIRECTORY DETAILS</span>
        </div>

        {profileSaveSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile settings saved successfully to Supabase!</span>
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-6">
          
          {/* Avatar / Photo Upload Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-dark-850 rounded-xl border border-dark-750">
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-xl bg-coral-500/20 border-2 border-coral-500/40 text-coral-400 font-mono font-bold text-2xl flex items-center justify-center overflow-hidden shadow-lg">
                {profileForm.photo_url ? (
                  <img src={profileForm.photo_url} alt="Profile photo" className="w-full h-full object-cover" />
                ) : (
                  <span>PRO</span>
                )}
              </div>

              <label className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-1.5 flex-1 w-full">
              <label className="block font-mono text-xs text-techGray-300">
                PROFILE PHOTO (Cloudinary Upload / URL)
              </label>
              <input
                type="text"
                value={profileForm.photo_url}
                onChange={(e) => setProfileForm({ ...profileForm, photo_url: e.target.value })}
                placeholder="https://res.cloudinary.com/demo/image/upload/v1234/avatar.jpg"
                className="w-full bg-dark-900 border border-dark-700 text-white rounded-lg px-3.5 py-2.5 text-xs font-mono focus:border-coral-500 focus:outline-none"
              />
              <p className="text-[11px] font-sans text-techGray-400">
                Paste an image URL or click avatar to upload via browser.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Credentials / Headline */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-techGray-300">
                CREDENTIALS / HEADLINE <span className="text-coral-500">*</span>
              </label>
              <input
                type="text"
                required
                value={profileForm.credentials}
                onChange={(e) => setProfileForm({ ...profileForm, credentials: e.target.value })}
                placeholder="e.g. Ex-Google Staff PM, 9+ yrs product leadership"
                className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-3 text-sm focus:border-coral-500 focus:outline-none font-sans"
              />
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-techGray-300">
                LINKEDIN PROFILE URL <span className="text-coral-500">*</span>
              </label>
              <input
                type="url"
                required
                value={profileForm.linkedin_url}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-3 text-xs font-mono focus:border-coral-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Years of Experience */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-techGray-300">
                YEARS OF EXPERIENCE
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={profileForm.years_experience}
                onChange={(e) => setProfileForm({ ...profileForm, years_experience: parseInt(e.target.value) || 0 })}
                className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-3 text-sm font-mono focus:border-coral-500 focus:outline-none"
              />
            </div>

            {/* City / Location */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-techGray-300">
                CITY / LOCATION
              </label>
              <input
                type="text"
                value={profileForm.city}
                onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                placeholder="e.g. Bengaluru, India / Remote"
                className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-3 text-sm focus:border-coral-500 focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Bio Textarea */}
          <div className="space-y-2">
            <label className="block font-mono text-xs text-techGray-300">
              EXPERT BIO & BACKGROUND <span className="text-coral-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              placeholder="Describe your domain expertise, past achievements, ex-companies, and what clients can expect from a 1:1 call with you..."
              className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-3 text-sm focus:border-coral-500 focus:outline-none font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isSavingProfile}
            className="bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-dark-950 font-mono font-bold px-6 py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            {isSavingProfile ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SAVING_PROFILE...</span>
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

      {/* 2. Google Calendar Integration Card */}
      <div className="bg-dark-900 border border-dark-750 p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
            profileForm.google_calendar_connected
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
              : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
          }`}>
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">Google Calendar Sync</h3>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                profileForm.google_calendar_connected
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {profileForm.google_calendar_connected ? 'CONNECTED ✓' : 'DISCONNECTED'}
              </span>
            </div>
            <p className="text-techGray-300 text-xs sm:text-sm mt-1">
              Automates slot availability syncing and instant Google Meet link creation upon booking confirmation.
            </p>
          </div>
        </div>

        <button
          onClick={async () => {
            await onConnectCalendar();
            setProfileForm((prev) => ({
              ...prev,
              google_calendar_connected: !prev.google_calendar_connected,
            }));
          }}
          className="w-full md:w-auto bg-dark-800 hover:bg-dark-750 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-lg border border-dark-700 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-coral-400" />
          <span>{profileForm.google_calendar_connected ? 'Reconnect Calendar Token' : 'Connect Google Calendar'}</span>
        </button>
      </div>

      {/* 3. Services Management List */}
      <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-2xl space-y-0">
        <div className="p-4 sm:px-6 bg-dark-950 border-b border-dark-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-coral-400" />
            <span className="text-white font-bold text-sm font-sans tracking-tight">Active 1:1 Consultation Services</span>
          </div>

          <button
            onClick={() => setIsAddServiceOpen(true)}
            className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all shadow cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>&gt; Add New Service</span>
          </button>
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center font-mono text-xs text-techGray-400">LOADING_SERVICES...</div>
          ) : services.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-mono">
              <div className="w-12 h-12 rounded-full bg-dark-850 border border-dark-750 flex items-center justify-center mx-auto text-techGray-500">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-white font-sans font-bold text-base">No services configured</div>
              <p className="text-techGray-400 text-xs font-sans max-w-sm mx-auto">
                Add at least one 1:1 consultation offering (e.g., 30-min System Architecture Audit or 60-min Pitch Deck Teardown) to accept bookings.
              </p>
              <button
                onClick={() => setIsAddServiceOpen(true)}
                className="bg-coral-500 text-dark-950 font-bold px-4 py-2 rounded-md text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Service</span>
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse font-sans text-sm">
              <thead>
                <tr className="bg-dark-950/60 border-b border-dark-800 font-mono text-[11px] text-techGray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">SERVICE TITLE & DESCRIPTION</th>
                  <th className="py-3.5 px-4 text-center">DURATION</th>
                  <th className="py-3.5 px-4 text-right">PRICE (INR)</th>
                  <th className="py-3.5 px-4 text-center">ACTIVE STATUS</th>
                  <th className="py-3.5 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-dark-850/50 transition-colors">
                    
                    {/* Title & Description */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-base">{svc.title}</div>
                      <p className="text-techGray-400 text-xs mt-0.5 line-clamp-2 max-w-md">
                        {svc.description || 'No detailed description added.'}
                      </p>
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-4 text-center font-mono text-xs text-techGray-300">
                      <span className="bg-dark-850 px-2.5 py-1 rounded border border-dark-750 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-coral-400" />
                        <span>{svc.duration_minutes} mins</span>
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 text-right font-mono text-white font-bold text-base">
                      ₹{svc.price_inr.toLocaleString()}
                    </td>

                    {/* Active Status Toggle */}
                    <td className="py-4 px-4 text-center font-mono text-xs">
                      <button
                        onClick={() => onToggleServiceActive(svc.id, svc.is_active)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-1 mx-auto cursor-pointer ${
                          svc.is_active
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-dark-800 text-techGray-500 border border-dark-700 hover:text-white'
                        }`}
                      >
                        <Power className="w-3 h-3" />
                        <span>{svc.is_active ? 'ACTIVE' : 'DEACTIVATED'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right font-mono text-xs">
                      <button
                        onClick={() => setEditingService(svc)}
                        className="text-techGray-300 hover:text-white bg-dark-800 border border-dark-700 px-2.5 py-1.5 rounded flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-coral-400" />
                        <span>Edit</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Service Modal */}
      <AnimatePresence>
        {isAddServiceOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-900 border border-dark-750 max-w-lg w-full p-6 rounded-xl shadow-2xl space-y-5 font-sans relative"
            >
              <div className="flex items-center justify-between border-b border-dark-800 pb-3 font-mono text-xs">
                <span className="text-coral-400 font-bold flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> ADD NEW 1:1 SERVICE OFFERING
                </span>
                <button
                  onClick={() => setIsAddServiceOpen(false)}
                  className="text-techGray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateService} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-techGray-300">
                    SERVICE TITLE <span className="text-coral-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    placeholder="e.g. System Architecture Audit & Code Sanity"
                    className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-coral-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-techGray-300">
                      DURATION (MINUTES)
                    </label>
                    <select
                      value={newService.duration_minutes}
                      onChange={(e) => setNewService({ ...newService, duration_minutes: parseInt(e.target.value) })}
                      className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-3 py-2.5 text-xs font-mono focus:border-coral-500 focus:outline-none"
                    >
                      <option value={15}>15 Mins (Quick Sync)</option>
                      <option value={30}>30 Mins (Standard 1:1)</option>
                      <option value={45}>45 Mins (Deep Dive)</option>
                      <option value={60}>60 Mins (Full Strategy)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-techGray-300">
                      PRICE (INR ₹) <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newService.price_inr}
                      onChange={(e) => setNewService({ ...newService, price_inr: parseFloat(e.target.value) || 0 })}
                      placeholder="2500"
                      className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:border-coral-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-techGray-300">
                    DESCRIPTION & OUTCOMES
                  </label>
                  <textarea
                    rows={3}
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Briefly describe what deliverables or outcomes the client will walk away with..."
                    className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-coral-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddServiceOpen(false)}
                    className="bg-dark-800 text-techGray-300 px-4 py-2 rounded-lg text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingService}
                    className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5"
                  >
                    {isAddingService ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>Add Service</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-900 border border-dark-750 max-w-lg w-full p-6 rounded-xl shadow-2xl space-y-5 font-sans relative"
            >
              <div className="flex items-center justify-between border-b border-dark-800 pb-3 font-mono text-xs">
                <span className="text-coral-400 font-bold flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4" /> EDIT SERVICE OFFERING
                </span>
                <button
                  onClick={() => setEditingService(null)}
                  className="text-techGray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleEditServiceSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-techGray-300">
                    SERVICE TITLE
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-coral-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-techGray-300">
                      DURATION (MINUTES)
                    </label>
                    <select
                      value={editingService.duration_minutes}
                      onChange={(e) => setEditingService({ ...editingService, duration_minutes: parseInt(e.target.value) })}
                      className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-3 py-2.5 text-xs font-mono focus:border-coral-500 focus:outline-none"
                    >
                      <option value={15}>15 Mins</option>
                      <option value={30}>30 Mins</option>
                      <option value={45}>45 Mins</option>
                      <option value={60}>60 Mins</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-techGray-300">
                      PRICE (INR ₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editingService.price_inr}
                      onChange={(e) => setEditingService({ ...editingService, price_inr: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:border-coral-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-techGray-300">
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full bg-dark-850 border border-dark-700 text-white rounded-lg px-4 py-2.5 text-sm focus:border-coral-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="bg-dark-800 text-techGray-300 px-4 py-2 rounded-lg text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingService}
                    className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5"
                  >
                    {isUpdatingService ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Update Service</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
