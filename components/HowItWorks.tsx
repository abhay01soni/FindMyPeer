'use client';

import React, { useState } from 'react';
import {
  User,
  Mail,
  Target,
  Bell,
  Gift,
  Star,
  ArrowRight,
  Video,
  Calendar as CalendarIcon,
} from 'lucide-react';

export default function HowItWorks() {
  const [selectedTime, setSelectedTime] = useState('11:30 AM');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistRole, setWaitlistRole] = useState('');
  const [joined, setJoined] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
    setTimeout(() => setJoined(false), 4000);
  };

  return (
    <section id="how-it-works" className="py-24 bg-dark-950 border-t border-dark-800 relative overflow-hidden">
      
      {/* Background radial glow behind framed card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating Framed Blueprint Card (Matching User Image media_1789542824978.png) */}
        <div className="bg-graph-paper rounded-[32px] sm:rounded-[40px] border border-slate-200/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden text-slate-900">
          
          {/* Handwritten Annotation - Top Left */}
          <div className="hidden xl:block absolute left-10 top-12 font-handwriting text-blue-600 text-2xl -rotate-6 select-none opacity-90">
            Real people.<br />
            Real expertise.<br />
            Real conversations.
          </div>

          {/* Handwritten Annotation - Top Right */}
          <div className="hidden xl:block absolute right-12 top-10 font-handwriting text-blue-600 text-2xl rotate-3 select-none opacity-90 text-right">
            Your questions.<br />
            Real answers.
            <svg className="w-8 h-8 text-blue-500 ml-auto mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 5C15 9 10 14 7 19M7 19H14M7 19V12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
              HOW IT WORKS
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
              Simple Booking.{' '}
              <span className="relative inline-block text-blue-600">
                Clear Answers.
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-blue-500"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9C50 3 150 2 198 8"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-lg font-sans pt-1">
              From sign up to a meaningful conversation — in a few simple steps.
            </p>
          </div>

          {/* Main 3 Cards Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch relative">

            {/* CARD 01: Join The Waitlist */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-200/50 flex flex-col justify-between relative group hover:border-blue-300 transition-all">
              
              {/* Top row */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs flex items-center justify-center">
                    01
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50/90 border border-blue-200/80 rounded-full px-3 py-1 tracking-wider uppercase">
                    TAKES 2 MINUTES
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Join The Waitlist
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Tell us whether you&apos;re a professional or a client. We&apos;ll learn your expertise, goals, and consultation needs.
                </p>
              </div>

              {/* Sub-UI Mockup inside Card 1 */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 space-y-3">
                <div className="font-bold text-slate-900 text-xs">
                  {joined ? '✓ Joined Waitlist!' : 'Join the waitlist'}
                </div>

                {joined ? (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center text-xs text-blue-700 font-medium">
                    We have queued your spot! We will contact you soon.
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-2.5">
                    <div className="bg-white border border-slate-200 px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="Your name"
                        value={waitlistName}
                        onChange={(e) => setWaitlistName(e.target.value)}
                        className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-xs"
                      />
                    </div>

                    <div className="bg-white border border-slate-200 px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-xs"
                      />
                    </div>

                    <div className="bg-white border border-slate-200 px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs">
                      <Target className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="e.g. CTO, career, marketing, AI"
                        value={waitlistRole}
                        onChange={(e) => setWaitlistRole(e.target.value)}
                        className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
                    >
                      <span>Join the waitlist</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* CARD 02: Get Early Access */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-200/50 flex flex-col justify-between relative group hover:border-blue-300 transition-all">
              
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs flex items-center justify-center">
                    02
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50/90 border border-blue-200/80 rounded-full px-3 py-1 tracking-wider uppercase">
                    CURATED ACCESS
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Get Early Access
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Selected professionals and early clients get access before the public launch, with priority for complete profiles.
                </p>
              </div>

              {/* Sub-UI Notification Cards inside Card 2 */}
              <div className="space-y-2.5">
                <div className="bg-white border border-slate-200/90 p-3 rounded-xl flex items-start gap-3 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">You&apos;re on the list!</div>
                    <div className="text-[11px] text-slate-500">We&apos;ll notify you when we launch.</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/90 p-3 rounded-xl flex items-start gap-3 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Get product updates</div>
                    <div className="text-[11px] text-slate-500">Be the first to know about new features.</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/90 p-3 rounded-xl flex items-start gap-3 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                    <Star className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Early access</div>
                    <div className="text-[11px] text-slate-500">Selected users get priority access.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 03: Book & Consult */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-200/50 flex flex-col justify-between relative group hover:border-blue-300 transition-all">
              
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs flex items-center justify-center">
                    03
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50/90 border border-blue-200/80 rounded-full px-3 py-1 tracking-wider uppercase">
                    REAL OUTCOMES
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Book &amp; Consult
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Find the right professional, choose a time slot, receive the meeting link by email, and get focused advice online.
                </p>
              </div>

              {/* Sub-UI Mockup inside Card 3 */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 space-y-3">
                
                {/* Advisor Card */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      RS
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Rahul Sharma</div>
                      <div className="text-[10px] text-slate-500">Fractional CTO • SaaS • AI</div>
                      <div className="text-[10px] text-amber-500 font-bold">★ 4.9 (84 sessions)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-xs">₹1,500</div>
                    <div className="text-[10px] text-slate-500">45 minutes</div>
                  </div>
                </div>

                {/* Time slots */}
                <div className="grid grid-cols-4 gap-1.5 text-[10px]">
                  {['10:00 AM', '11:30 AM', '2:00 PM', '5:30 PM'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-1.5 px-1 rounded font-medium text-center transition-all ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    const waitlist = document.getElementById('waitlist');
                    if (waitlist) waitlist.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
                >
                  <span>Book consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Integrations footer */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Video className="w-3 h-3 text-emerald-600" /> Google Meet
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3 text-blue-600" /> Calendar synced
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Handwritten Annotation - Bottom Left */}
          <div className="hidden xl:flex items-center gap-2 absolute left-10 bottom-8 font-handwriting text-blue-600 text-xl -rotate-3 select-none opacity-90">
            <svg className="w-6 h-6 text-blue-500 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 5C15 9 10 14 7 19M7 19H14M7 19V12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            It starts here.
          </div>

          {/* Handwritten Annotation - Bottom Right */}
          <div className="hidden xl:flex items-center gap-2 absolute right-10 bottom-8 font-handwriting text-blue-600 text-xl rotate-3 select-none opacity-90">
            Expertise on your schedule.
            <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 5C15 9 10 14 7 19M7 19H14M7 19V12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Section Footer */}
          <div className="text-center mt-14 pt-6 border-t border-slate-200/80 font-sans text-xs text-slate-500 font-medium">
            FindMyPeer &nbsp;|&nbsp; Talk to someone who knows.
          </div>

        </div>

      </div>
    </section>
  );
}
