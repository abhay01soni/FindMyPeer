'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: 'What is FindMyPeer, and who is it for?',
    answer:
      'FindMyPeer is a 1:1 expert consultation marketplace connecting founders, engineers, and professionals with verified advisors who have already solved their exact problems. It is designed for clients seeking fast, actionable clarity without generic fluff or subscription lock-ins.',
  },
  {
    id: 2,
    question: 'How are advisors verified on FindMyPeer?',
    answer:
      'Every advisor undergoes proof-of-work audits, employment background checks, and track-record validation (such as verified YC funding, tier-1 company roles, or code/architecture credentials) before their profile goes live.',
  },
  {
    id: 3,
    question: 'What’s Privacy Protection and how are my sessions secured?',
    answer:
      'All 1:1 sessions are end-to-end private. Meeting rooms are automatically generated via Google Meet with restricted access to only you and your advisor. We never record or distribute session audio or video.',
  },
  {
    id: 4,
    question: 'How do payments, cancellations, and refunds work?',
    answer:
      'Payments are held securely in escrow until the session is completed. If an advisor cancels or fails to show up, you receive a 100% full refund immediately.',
  },
  {
    id: 5,
    question: 'Does FindMyPeer offer monthly hosting or recurring subscriptions?',
    answer:
      'No. There are zero recurring monthly subscriptions or hidden platform platform fees for clients. You only pay transparently per booked session.',
  },
  {
    id: 6,
    question: 'How do I join as an advisor and set up my profile?',
    answer:
      'Submit your application through the Waitlist form under "I\'m an expert". Once verified, you set your own availability and schedule, connect your calendar, and receive pre-screened consultation requests.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [showAll, setShowAll] = useState(false);

  const toggleFaq = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const displayedFaqs = showAll ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 5);

  return (
    <section id="faq" className="py-24 bg-dark-900 border-t border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left column - get.tech headline styling (Image 4) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono text-xs text-coral-500 flex items-center gap-1.5 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" /> FREQUENTLY ASKED QUESTIONS
            </div>

            <h2 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-[1.15]">
              questions? <br />
              <span className="text-coral-500 font-sans">consider them answered.</span>
            </h2>

            <p className="text-techGray-300 font-sans text-base leading-relaxed">
              Everything you need to know about booking verified 1:1 consultation sessions on FindMyPeer.
            </p>

            <div className="pt-4 font-mono text-xs text-techGray-400 border-t border-dark-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">●</span> 24/7 SUPPORT AVAILABLE
              </div>
              <div>EMAIL: support@findmypeer.tech</div>
            </div>
          </div>

          {/* Right column - Accordion list (Image 4) */}
          <div className="lg:col-span-7 space-y-2">
            
            <div className="divide-y divide-dark-800 border-y border-dark-800">
              {displayedFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div key={faq.id} className="py-5 transition-colors">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between text-left group focus:outline-none"
                    >
                      <span className="text-lg font-sans font-semibold text-white group-hover:text-coral-400 transition-colors pr-4">
                        {faq.question}
                      </span>
                      <span className="p-1 rounded bg-dark-850 text-coral-500 border border-dark-700 shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-techGray-300 font-sans text-sm sm:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* get.tech terminal "> show more" button (Image 4) */}
            <div className="pt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-dark-850 hover:bg-dark-800 text-techGray-200 hover:text-white border border-dark-700 font-mono text-xs font-bold px-5 py-2.5 rounded-md transition-all flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-coral-400" />
                <span>{showAll ? '> show_less' : '> show_more'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
