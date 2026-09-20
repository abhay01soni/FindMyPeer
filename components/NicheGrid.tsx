'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SubNiche {
  id: string;
  name: string;
  description: string;
  advisorCount: number;
}

interface Niche {
  id: string;
  categoryTag: string;
  title: string;
  description: string;
  advisorCount: number;
  domainChip: string;
  colorTheme: {
    bg: string;
    border: string;
    borderExpanded: string;
    tag: string;
    accent: string;
    button: string;
  };
  subNiches: SubNiche[];
}

const NICHES_DATA: Niche[] = [
  {
    id: 'startup',
    categoryTag: 'STARTUP & PRODUCT',
    title: 'Startup & Product Advisory',
    description: 'Product-market fit validation, fundraising strategy, GTM execution, and pitch deck teardowns.',
    advisorCount: 48,
    domainChip: 'www.startup.peer',
    colorTheme: {
      bg: 'bg-gradient-to-r from-rose-950/30 via-dark-900 to-dark-900',
      border: 'border-rose-500/30 hover:border-rose-500/60 shadow-rose-500/5',
      borderExpanded: 'border-rose-500/70 shadow-2xl shadow-rose-500/10',
      tag: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      accent: 'text-rose-400',
      button: 'bg-rose-500 text-dark-950 border-rose-400',
    },
    subNiches: [
      { id: 'fundraising', name: 'Fundraising Strategy', description: 'Pitch deck review, investor positioning & cap table advice', advisorCount: 14 },
      { id: 'pmf', name: 'Product-Market Fit', description: 'User interview teardowns, retention analysis & validation', advisorCount: 12 },
      { id: 'gtm', name: 'Go-to-Market (GTM)', description: 'Launch playbook, outbound strategy & early distribution', advisorCount: 11 },
      { id: 'pitch-deck', name: 'Pitch Deck Review', description: 'Line-by-line slide critiques & story structuring', advisorCount: 11 },
    ],
  },
  {
    id: 'career',
    categoryTag: 'CAREER & INTERVIEWS',
    title: 'Career & Interview Coaching',
    description: 'Resume & LinkedIn teardowns, mock system design/PM interviews, and salary negotiation.',
    advisorCount: 62,
    domainChip: 'www.career.peer',
    colorTheme: {
      bg: 'bg-gradient-to-r from-amber-950/30 via-dark-900 to-dark-900',
      border: 'border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5',
      borderExpanded: 'border-amber-500/70 shadow-2xl shadow-amber-500/10',
      tag: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      accent: 'text-amber-400',
      button: 'bg-amber-500 text-dark-950 border-amber-400',
    },
    subNiches: [
      { id: 'resume', name: 'Resume & LinkedIn', description: 'High-impact bullet rewrites & recruiter visibility', advisorCount: 18 },
      { id: 'mock-int', name: 'Mock Interviews', description: 'System design, coding & PM mock rounds with actionable feedback', advisorCount: 20 },
      { id: 'salary', name: 'Salary Negotiation', description: 'Offer teardown, equity valuation & counter-offer scripts', advisorCount: 12 },
      { id: 'pivots', name: 'Career Pivots', description: 'Transitioning into PM, Tech Lead, or Startup roles', advisorCount: 12 },
    ],
  },
  {
    id: 'tech',
    categoryTag: 'DEV & INFRASTRUCTURE',
    title: 'Technology Mentorship',
    description: 'System design reviews, code & architecture audits, engineering leadership & tech stack decisions.',
    advisorCount: 75,
    domainChip: 'www.tech.peer',
    colorTheme: {
      bg: 'bg-gradient-to-r from-emerald-950/30 via-dark-900 to-dark-900',
      border: 'border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/5',
      borderExpanded: 'border-emerald-500/70 shadow-2xl shadow-emerald-500/10',
      tag: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      accent: 'text-emerald-400',
      button: 'bg-emerald-500 text-dark-950 border-emerald-400',
    },
    subNiches: [
      { id: 'sys-design', name: 'System Design', description: 'High-availability architecture, microservices & scale reviews', advisorCount: 22 },
      { id: 'code-review', name: 'Code Review & Security', description: 'Architecture sanity checks, code refactoring & security', advisorCount: 18 },
      { id: 'eng-growth', name: 'Engineering Career Growth', description: 'Moving from Senior to Staff/Principal Engineer', advisorCount: 19 },
      { id: 'tech-stack', name: 'Tech Stack Decisions', description: 'Database selection, cloud cost optimization & toolchain', advisorCount: 16 },
    ],
  },
  {
    id: 'finance',
    categoryTag: 'FINANCE & LEGAL',
    title: 'Finance & Compliance',
    description: 'Startup runway management, India tax & regulatory compliance, cap table legal & personal finance.',
    advisorCount: 34,
    domainChip: 'www.finance.peer',
    colorTheme: {
      bg: 'bg-gradient-to-r from-violet-950/30 via-dark-900 to-dark-900',
      border: 'border-violet-500/30 hover:border-violet-500/60 shadow-violet-500/5',
      borderExpanded: 'border-violet-500/70 shadow-2xl shadow-violet-500/10',
      tag: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
      accent: 'text-violet-400',
      button: 'bg-violet-500 text-dark-950 border-violet-400',
    },
    subNiches: [
      { id: 'runway', name: 'Startup Finance & Runway', description: 'Financial modeling, cash flow planning & burn rate', advisorCount: 9 },
      { id: 'tax-india', name: 'Tax & Compliance (India)', description: 'GST, MCA compliance, ESOP structures & Angel Tax', advisorCount: 10 },
      { id: 'cap-table', name: 'Fundraising Legal & Cap Table', description: 'SAFE notes, SHA terms, founder vesting & equity', advisorCount: 8 },
      { id: 'personal-fin', name: 'Personal Finance for Founders', description: 'Liquidity planning, tax optimization & investments', advisorCount: 7 },
    ],
  },
  {
    id: 'wellness',
    categoryTag: 'WELLNESS & MINDSET',
    title: 'Health, Wellness & Personal Coaching',
    description: 'Founder stress & burnout management, peak energy habits, fitness planning & executive coaching.',
    advisorCount: 28,
    domainChip: 'www.wellness.peer',
    colorTheme: {
      bg: 'bg-gradient-to-r from-cyan-950/30 via-dark-900 to-dark-900',
      border: 'border-cyan-500/30 hover:border-cyan-500/60 shadow-cyan-500/5',
      borderExpanded: 'border-cyan-500/70 shadow-2xl shadow-cyan-500/10',
      tag: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      accent: 'text-cyan-400',
      button: 'bg-cyan-500 text-dark-950 border-cyan-400',
    },
    subNiches: [
      { id: 'fitness', name: 'Fitness & Nutrition Planning', description: 'Sustained energy routines for high-stress executives', advisorCount: 8 },
      { id: 'burnout', name: 'Stress & Burnout', description: 'Workload boundary setting & cognitive recovery frameworks', advisorCount: 8 },
      { id: 'habits', name: 'Habit Building & Focus', description: 'Deep work protocols, sleep hygiene & daily systems', advisorCount: 6 },
      { id: 'life-coach', name: 'Life & Leadership Coaching', description: 'Personal vision, conflict resolution & decision-making', advisorCount: 6 },
    ],
  },
];

const CATEGORY_TABS = [
  'ALL NICHES',
  'STARTUP & PRODUCT',
  'CAREER & INTERVIEWS',
  'DEV & INFRASTRUCTURE',
  'FINANCE & LEGAL',
  'WELLNESS & MINDSET',
];

export default function NicheGrid() {
  const [expandedId, setExpandedId] = useState<string | null>('startup');
  const [activeTab, setActiveTab] = useState<string>('ALL NICHES');

  const handleCardClick = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredNiches = NICHES_DATA.filter(niche => {
    if (activeTab === 'ALL NICHES') return true;
    return niche.categoryTag === activeTab;
  });

  return (
    <section id="niches" className="py-24 bg-dark-950 border-t border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-dark-800">
          <div>
            <div className="font-mono text-xs text-coral-500 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-4 h-4" /> CORE INTERACTIVE DIRECTORY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              explore advisory <span className="text-coral-500 font-mono">niches_</span>
            </h2>
            <p className="text-techGray-300 font-sans mt-3 max-w-xl text-base">
              Distinct color-coded advisory domains. Click any card to inspect verified sub-niches and advisor counts.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-techGray-400">
            TOTAL ADVISORS ON ROSTER: <span className="text-white font-bold text-sm">247</span>
          </div>
        </div>

        {/* Category filter sub-bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar font-mono text-xs border-b border-dark-850">
          {CATEGORY_TABS.map((tab, idx) => (
            <React.Fragment key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-coral-500/10 text-coral-400 border border-coral-500/40 font-bold'
                    : 'text-techGray-400 hover:text-white border border-transparent hover:border-dark-700'
                }`}
              >
                {tab}
              </button>
              {idx < CATEGORY_TABS.length - 1 && (
                <span className="text-dark-700 select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Color-differentiated Niche Cards Grid */}
        <div className="space-y-6">
          {filteredNiches.map((niche) => {
            const isExpanded = expandedId === niche.id;
            const theme = niche.colorTheme;

            return (
              <motion.div
                key={niche.id}
                layout
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${theme.bg} ${
                  isExpanded ? theme.borderExpanded : theme.border
                }`}
              >
                {/* Main Card Header */}
                <div
                  onClick={() => handleCardClick(niche.id)}
                  className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 select-none"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(niche.id);
                    }
                  }}
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs px-2.5 py-0.5 rounded font-bold border ${theme.tag}`}>
                        {niche.categoryTag}
                      </span>
                      <span className="font-mono text-xs text-techGray-400">
                        {niche.domainChip}
                      </span>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-sans font-bold text-white group-hover:${theme.accent} transition-colors`}>
                      {niche.title}
                    </h3>

                    <p className="text-techGray-300 text-sm sm:text-base font-sans leading-relaxed">
                      {niche.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 border-dark-800/80 pt-4 md:pt-0">
                    <div className="text-right font-mono">
                      <div className={`text-xl font-bold ${theme.accent}`}>{niche.advisorCount}</div>
                      <div className="text-[11px] text-techGray-400 uppercase">ADVISORS READY</div>
                    </div>

                    <div className={`p-2.5 rounded-lg border font-mono text-xs transition-colors ${
                      isExpanded
                        ? `${theme.button} font-bold shadow-md`
                        : 'bg-dark-800 text-techGray-300 border-dark-700'
                    }`}>
                      {isExpanded ? (
                        <div className="flex items-center gap-1.5">
                          <span>CLOSE</span>
                          <ChevronUp className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span>EXPAND</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-niches Height Expand Area */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-dark-800/80 bg-dark-950/70"
                    >
                      <div className="p-6 md:p-8 space-y-4">
                        <div className="font-mono text-xs text-techGray-400 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className={`w-3.5 h-3.5 ${theme.accent}`} />
                            SUB-NICHES IN THIS CATEGORY ({niche.subNiches.length}):
                          </span>
                          <Link href="/discover" className={`${theme.accent} font-bold hidden sm:inline hover:underline`}>
                            GO TO DISCOVER DIRECTORY &rarr;
                          </Link>
                        </div>

                        {/* Color Tinted Sub-niche Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {niche.subNiches.map((sub, idx) => (
                            <motion.div
                              key={sub.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: idx * 0.05 }}
                              className={`group p-4 bg-dark-900/90 border rounded-lg transition-all duration-200 hover:scale-[1.02] flex flex-col justify-between ${theme.border}`}
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className={`font-sans font-semibold text-white text-sm group-hover:${theme.accent} transition-colors`}>
                                    {sub.name}
                                  </span>
                                  <ArrowRight className={`w-3.5 h-3.5 text-techGray-500 group-hover:${theme.accent} group-hover:translate-x-1 transition-all`} />
                                </div>
                                <p className="text-techGray-400 text-xs font-sans leading-snug">
                                  {sub.description}
                                </p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-dark-850 flex items-center justify-between font-mono text-[11px] text-techGray-400">
                                <span>{sub.advisorCount} experts</span>
                                <Link href="/discover" className={`${theme.accent} font-bold group-hover:underline`}>
                                  explore
                                </Link>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
