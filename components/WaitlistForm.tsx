'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Send, CheckCircle2, User, Briefcase, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaitlistForm() {
  const [role, setRole] = useState<'client' | 'expert'>('client');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    experienceYears: '3-5',
    category: 'Startup & Product Advisory',
    city: '',
    consultationAreas: '',
    expectedPrice: '2500',
  });

  useEffect(() => {
    const handleSwitchRole = (e: CustomEvent<'client' | 'expert'>) => {
      setRole(e.detail);
    };
    window.addEventListener('switch-waitlist-role' as any, handleSwitchRole as any);
    return () => window.removeEventListener('switch-waitlist-role' as any, handleSwitchRole as any);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-24 bg-dark-950 border-t border-dark-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-dark-850 border border-dark-700 font-mono text-xs text-coral-400">
            <Terminal className="w-4 h-4" />
            <span>JOIN THE WAITLIST & EARLY ACCESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
            reserve your <span className="text-coral-500 font-mono">beta spot_</span>
          </h2>

          <p className="text-techGray-300 font-sans text-base max-w-xl mx-auto">
            Select your role below to request early invitation to the platform.
          </p>
        </div>

        {/* Role Toggle Switch — get.tech terminal tab style */}
        <div className="flex justify-center mb-10">
          <div className="bg-dark-900 p-1.5 rounded-lg border border-dark-700 flex items-center gap-2 font-mono text-xs w-full max-w-md">
            <button
              onClick={() => { setRole('client'); setSubmitted(false); }}
              className={`flex-1 py-3 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
                role === 'client'
                  ? 'bg-coral-500 text-dark-950 font-bold shadow-md'
                  : 'text-techGray-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <User className="w-4 h-4" />
              <span>&gt; I&apos;m looking for advice</span>
            </button>

            <button
              onClick={() => { setRole('expert'); setSubmitted(false); }}
              className={`flex-1 py-3 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
                role === 'expert'
                  ? 'bg-coral-500 text-dark-950 font-bold shadow-md'
                  : 'text-techGray-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>&gt; I&apos;m an expert</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-dark-900 border border-dark-700 p-8 sm:p-10 rounded-xl shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6 font-mono"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-coral-400 bg-dark-850 border border-dark-700 px-3 py-1 rounded">
                    STATUS 200 OK — WAITLIST CONFIRMED
                  </span>
                  <h3 className="text-2xl font-bold text-white font-sans pt-2">
                    Application Received, {formData.fullName || 'Builder'}!
                  </h3>
                  <p className="text-techGray-300 font-sans text-sm max-w-md mx-auto">
                    We have queued your application for <span className="text-coral-400 font-mono font-bold uppercase">{role}</span> onboarding. Check your inbox at <span className="text-white font-bold">{formData.email}</span> shortly.
                  </p>
                </div>

                <div className="p-4 bg-dark-850 border border-dark-800 rounded-lg max-w-sm mx-auto text-left text-xs space-y-1 text-techGray-400">
                  <div>QUEUED TIMESTAMP: {new Date().toLocaleTimeString()}</div>
                  <div>QUEUE POSITION: #148</div>
                  <div>VERIFICATION: PENDING INVITATION</div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-dark-800 hover:bg-dark-750 text-techGray-300 hover:text-white px-5 py-2.5 rounded-md border border-dark-700 text-xs"
                >
                  &lt; Submit another response
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 font-sans"
              >
                <div className="flex items-center justify-between border-b border-dark-800 pb-4 font-mono text-xs">
                  <span className="text-techGray-400">
                    FORM MODE: <span className="text-white uppercase font-bold">{role} APPLICATION</span>
                  </span>
                  <span className="text-coral-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> NO SPAM GUARANTEE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-techGray-300">
                      FULL NAME <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-techGray-300">
                      WORK OR PERSONAL EMAIL <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. vikram@startup.com"
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* LinkedIn / Website URL */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-techGray-300">
                      LINKEDIN OR PORTFOLIO URL <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      required
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-mono text-xs"
                    />
                  </div>

                  {/* City / Location */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-techGray-300">
                      CITY / LOCATION <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Bengaluru / Remote"
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-techGray-300">
                      PRIMARY EXPERTISE CATEGORY
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-sans"
                    >
                      <option value="Startup & Product Advisory">Startup & Product Advisory</option>
                      <option value="Career & Interview Coaching">Career & Interview Coaching</option>
                      <option value="Technology Mentorship">Technology Mentorship</option>
                      <option value="Finance & Compliance">Finance & Compliance</option>
                      <option value="Health, Wellness & Personal Coaching">Health, Wellness & Personal Coaching</option>
                    </select>
                  </div>

                  {/* Experience Years */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-techGray-300">
                      YEARS OF EXPERIENCE
                    </label>
                    <select
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-sans"
                    >
                      <option value="1-3">1-3 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5-8">5-8 Years</option>
                      <option value="8+">8+ Years (Senior / Leadership)</option>
                    </select>
                  </div>
                </div>

                {role === 'expert' && (
                  <div className="space-y-2 font-sans">
                    <label className="block font-mono text-xs text-techGray-300">
                      EXPECTED PRICE PER SESSION (INR ₹)
                    </label>
                    <input
                      type="number"
                      name="expectedPrice"
                      value={formData.expectedPrice}
                      onChange={handleChange}
                      placeholder="e.g. 2999"
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-mono"
                    />
                  </div>
                )}

                {/* Consultation areas / Goals */}
                <div className="space-y-2 font-sans">
                  <label className="block font-mono text-xs text-techGray-300">
                    {role === 'client' ? 'WHAT IS YOUR PRIMARY GOAL OR TOPIC?' : 'WHAT SPECIFIC OUTCOMES CAN YOU HELP WITH?'}
                  </label>
                  <textarea
                    name="consultationAreas"
                    rows={3}
                    value={formData.consultationAreas}
                    onChange={handleChange}
                    placeholder={
                      role === 'client'
                        ? 'e.g. Need pitch deck feedback for seed round or system design mock interview...'
                        : 'e.g. Scaled microservices to 1M users, prepared 50+ candidates for FAANG PM rounds...'
                    }
                    className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg px-4 py-3 text-sm focus:outline-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold py-4 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xl active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>&gt; submit_waitlist_application</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
