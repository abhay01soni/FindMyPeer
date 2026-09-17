'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Star, 
  Calendar, 
  SlidersHorizontal, 
  ArrowUpRight, 
  Sparkles, 
  X, 
  Briefcase, 
  Terminal, 
  ChevronDown, 
  Layers, 
  Grid, 
  List,
  Clock,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DiscoveryAdvisor {
  id: string;
  name: string;
  handle: string;
  avatarSeed: string;
  initials: string;
  currentRole: string;
  company: string;
  category: string;
  subcategories: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  hourlyRateINR: number;
  availableSlot: string;
  isTopRated?: boolean;
  isVerified: boolean;
  bio: string;
  outcomes: string[];
  socialProof: string;
}

const DISCOVERY_ADVISORS: DiscoveryAdvisor[] = [
  {
    id: 'arjun-kapoor',
    name: 'Arjun Kapoor',
    handle: '@arjun_pm',
    avatarSeed: 'arjun-kapoor',
    initials: 'AK',
    currentRole: 'Staff Product Manager',
    company: 'Ex-Google',
    category: 'Product & Startup',
    subcategories: ['0 to 1 PMF', 'B2B SaaS', 'Pricing Strategy'],
    experienceYears: 9,
    rating: 5.0,
    reviewCount: 38,
    sessionsCompleted: 142,
    hourlyRateINR: 2999,
    availableSlot: 'Tomorrow, 4:00 PM',
    isTopRated: true,
    isVerified: true,
    bio: 'Led core search infrastructure products at Google. Helped 14+ early-stage startups navigate initial product validation and user retention strategies.',
    outcomes: ['B2B SaaS PMF Validation', '0 to 1 Product Strategy Roadmaps', 'PRD & Feature Prioritization Teardown'],
    socialProof: '14+ Seed stage founders advised',
  },
  {
    id: 'rhea-sharma',
    name: 'Rhea Sharma',
    handle: '@rhea_dist',
    avatarSeed: 'rhea-sharma',
    initials: 'RS',
    currentRole: 'Lead Distributed Systems Architect',
    company: 'Razorpay',
    category: 'Technology & Engineering',
    subcategories: ['Microservices', 'High-Throughput', 'System Design'],
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 42,
    sessionsCompleted: 186,
    hourlyRateINR: 3499,
    availableSlot: 'Today, 7:30 PM',
    isTopRated: true,
    isVerified: true,
    bio: 'Architected high-frequency payment gateways scaling to 50k+ TPS. Specializes in system design mock interviews and architecture sanity reviews.',
    outcomes: ['System Architecture Audits', 'High-Throughput Payments Scaling', 'Staff Engineer Career Roadmaps'],
    socialProof: 'Scaled systems to 50k TPS',
  },
  {
    id: 'vikram-sengupta',
    name: 'Vikram Sengupta',
    handle: '@vikram_vc',
    avatarSeed: 'vikram-sengupta',
    initials: 'VS',
    currentRole: 'Series A Founder (Exited $12M)',
    company: 'Angel Investor',
    category: 'Fundraising & Strategy',
    subcategories: ['Pitch Decks', 'Term Sheets', 'Valuation Math'],
    experienceYears: 12,
    rating: 5.0,
    reviewCount: 29,
    sessionsCompleted: 98,
    hourlyRateINR: 4999,
    availableSlot: 'Thursday, 6:00 PM',
    isTopRated: true,
    isVerified: true,
    bio: 'Built and exited an enterprise compliance startup. Raised from top tier VCs in US & India. Direct feedback on deck, narrative, and valuation math.',
    outcomes: ['Pitch Deck Line-by-Line Teardown', 'Term Sheet Negotiation Tactics', 'Investor Pitch Simulator'],
    socialProof: '$12M Exit & 8 Angel Investments',
  },
  {
    id: 'deepika-nair',
    name: 'Deepika Nair',
    handle: '@deepika_talent',
    avatarSeed: 'deepika-nair',
    initials: 'DN',
    currentRole: 'Director of Talent & Org',
    company: 'Ex-McKinsey / Swiggy',
    category: 'Career & Executive',
    subcategories: ['Salary Negotiation', 'Executive PM/EM', 'Leadership'],
    experienceYears: 10,
    rating: 4.95,
    reviewCount: 51,
    sessionsCompleted: 215,
    hourlyRateINR: 2499,
    availableSlot: 'Friday, 5:00 PM',
    isTopRated: true,
    isVerified: true,
    bio: 'Hired 300+ product and engineering leaders. Teaches candidates how to position their story, demand market-rate equity, and land top 1% offers.',
    outcomes: ['Executive Resume Teardown', 'Compensation Negotiation Strategy', 'Behavioral Leadership Rounds'],
    socialProof: '300+ Tech & Product Leaders Hired',
  },
  {
    id: 'sameer-chen',
    name: 'Sameer Chen',
    handle: '@sameer_cloud',
    avatarSeed: 'sameer-chen',
    initials: 'SC',
    currentRole: 'Principal Cloud Architect',
    company: 'AWS Ex-Lead',
    category: 'Cloud & DevOps',
    subcategories: ['AWS FinOps', 'Kubernetes', 'Disaster Recovery'],
    experienceYears: 11,
    rating: 5.0,
    reviewCount: 34,
    sessionsCompleted: 110,
    hourlyRateINR: 3999,
    availableSlot: 'Saturday, 11:00 AM',
    isTopRated: true,
    isVerified: true,
    bio: 'Helps scale-stage tech startups slash monthly AWS/GCP bills by 40-60% without sacrificing reliability or performance.',
    outcomes: ['AWS/GCP Cloud Cost Optimization (FinOps)', 'Kubernetes & CI/CD Audits', 'Disaster Recovery Systems'],
    socialProof: 'Saved $450k+ across client AWS bills',
  },
  {
    id: 'neha-verma',
    name: 'Neha Verma',
    handle: '@neha_legal',
    avatarSeed: 'neha-verma',
    initials: 'NV',
    currentRole: 'Founding Partner & Legal Counsel',
    company: 'Startup Legal Advisors',
    category: 'Finance & Compliance',
    subcategories: ['ESOP Pool', 'Cross-Border Tax', 'Cap Table'],
    experienceYears: 7,
    rating: 4.9,
    reviewCount: 24,
    sessionsCompleted: 76,
    hourlyRateINR: 2799,
    availableSlot: 'Tomorrow, 2:00 PM',
    isTopRated: false,
    isVerified: true,
    bio: 'Advised over 60 Indian startups on Angel Tax compliance, cross-border entity structures, ESOP grant letters, and VC due diligence.',
    outcomes: ['MCA & Tax Compliance (India)', 'ESOP Pool Structuring', 'Cap Table Hygiene & Due Diligence'],
    socialProof: '60+ Startups Advised on Entity Structuring',
  },
  {
    id: 'aditya-joshi',
    name: 'Aditya Joshi',
    handle: '@aditya_ai',
    avatarSeed: 'aditya-joshi',
    initials: 'AJ',
    currentRole: 'Staff AI Research Engineer',
    company: 'Ex-Meta AI',
    category: 'Technology & Engineering',
    subcategories: ['LLM Fine-tuning', 'RAG Architecture', 'Vector DBs'],
    experienceYears: 6,
    rating: 4.98,
    reviewCount: 31,
    sessionsCompleted: 88,
    hourlyRateINR: 4200,
    availableSlot: 'Wednesday, 8:00 PM',
    isTopRated: true,
    isVerified: true,
    bio: 'Built proprietary enterprise retrieval-augmented generation pipelines for Fortune 500 workflows. Specializes in production LLM evaluations.',
    outcomes: ['Production LLM Pipeline Audits', 'RAG Quality & Latency Optimization', 'AI Engineering Mock Interviews'],
    socialProof: 'Meta AI Contributor & 3 Research Papers',
  },
  {
    id: 'priya-deshmukh',
    name: 'Priya Deshmukh',
    handle: '@priya_growth',
    avatarSeed: 'priya-deshmukh',
    initials: 'PD',
    currentRole: 'VP of Growth & Retention',
    company: 'Ex-Zomato',
    category: 'Product & Startup',
    subcategories: ['Product-Led Growth', 'CAC/LTV Optimization', 'Viral Loops'],
    experienceYears: 8,
    rating: 4.92,
    reviewCount: 45,
    sessionsCompleted: 160,
    hourlyRateINR: 3200,
    availableSlot: 'Friday, 3:30 PM',
    isTopRated: true,
    isVerified: true,
    bio: 'Scaled consumer growth engines from 200k to 5M monthly active transacting users. Deep tactical experience with onboarding drop-offs and reactivation.',
    outcomes: ['Onboarding Funnel Teardowns', 'Referral & Viral Loop Architecture', 'Growth Experimentation Frameworks'],
    socialProof: '5M+ MAU Growth Scaled',
  }
];

const CATEGORIES = [
  'All Domains',
  'Product & Startup',
  'Technology & Engineering',
  'Career & Executive',
  'Fundraising & Strategy',
  'Cloud & DevOps',
  'Finance & Compliance'
];

export default function AdvisorDiscovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Domains');
  const [selectedExpRange, setSelectedExpRange] = useState<'all' | '3-5' | '6-8' | '8+'>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'all' | 'under-3000' | '3000-4000' | '4000+'>('all');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedAdvisor, setSelectedAdvisor] = useState<DiscoveryAdvisor | null>(null);

  // Active filter tags for the pill bar
  const activeFilters = useMemo(() => {
    const list: { id: string; label: string; clear: () => void }[] = [];
    if (searchQuery.trim()) {
      list.push({ id: 'search', label: `Keyword: "${searchQuery}"`, clear: () => setSearchQuery('') });
    }
    if (selectedCategory !== 'All Domains') {
      list.push({ id: 'cat', label: `Category: ${selectedCategory}`, clear: () => setSelectedCategory('All Domains') });
    }
    if (selectedExpRange !== 'all') {
      list.push({ id: 'exp', label: `Exp: ${selectedExpRange} yrs`, clear: () => setSelectedExpRange('all') });
    }
    if (selectedPriceRange !== 'all') {
      const priceLabels = { 'under-3000': '< ₹3k', '3000-4000': '₹3k - ₹4k', '4000+': '₹4k+' };
      list.push({ id: 'price', label: `Rate: ${priceLabels[selectedPriceRange]}`, clear: () => setSelectedPriceRange('all') });
    }
    if (onlyVerified) {
      list.push({ id: 'ver', label: 'Top Rated Only', clear: () => setOnlyVerified(false) });
    }
    return list;
  }, [searchQuery, selectedCategory, selectedExpRange, selectedPriceRange, onlyVerified]);

  // Filtered advisor list
  const filteredAdvisors = useMemo(() => {
    return DISCOVERY_ADVISORS.filter((adv) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = adv.name.toLowerCase().includes(q);
        const matchesRole = adv.currentRole.toLowerCase().includes(q);
        const matchesCompany = adv.company.toLowerCase().includes(q);
        const matchesBio = adv.bio.toLowerCase().includes(q);
        const matchesSub = adv.subcategories.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesRole && !matchesCompany && !matchesBio && !matchesSub) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All Domains' && adv.category !== selectedCategory) {
        return false;
      }

      // Experience filter
      if (selectedExpRange === '3-5' && (adv.experienceYears < 3 || adv.experienceYears > 5)) return false;
      if (selectedExpRange === '6-8' && (adv.experienceYears < 6 || adv.experienceYears > 8)) return false;
      if (selectedExpRange === '8+' && adv.experienceYears < 8) return false;

      // Price filter
      if (selectedPriceRange === 'under-3000' && adv.hourlyRateINR >= 3000) return false;
      if (selectedPriceRange === '3000-4000' && (adv.hourlyRateINR < 3000 || adv.hourlyRateINR > 4000)) return false;
      if (selectedPriceRange === '4000+' && adv.hourlyRateINR < 4000) return false;

      // Verified / Top rated filter
      if (onlyVerified && !adv.isTopRated) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, selectedExpRange, selectedPriceRange, onlyVerified]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Domains');
    setSelectedExpRange('all');
    setSelectedPriceRange('all');
    setOnlyVerified(false);
  };

  return (
    <section id="discover" className="py-24 bg-dark-950 border-t border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-dark-800 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-dark-850 border border-dark-700 font-mono text-xs text-coral-400">
              <Terminal className="w-4 h-4" />
              <span>FINDMYPEER // DISCOVERY_SEARCH_ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              discover <span className="text-coral-500 font-mono">peer advisors_</span>
            </h2>
            <p className="text-techGray-300 text-sm sm:text-base max-w-2xl font-sans">
              Search by specific domain, technical keywords, ex-companies, and proven outcomes. Direct 1:1 sessions with verified practitioners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="bg-dark-900 border border-dark-700 p-1 rounded-lg flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'table'
                    ? 'bg-dark-800 text-white font-bold border border-dark-700'
                    : 'text-techGray-400 hover:text-white'
                }`}
                title="Table Directory View"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-dark-800 text-white font-bold border border-dark-700'
                    : 'text-techGray-400 hover:text-white'
                }`}
                title="Card Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>

            <div className="font-mono text-xs px-3 py-2 bg-coral-500/10 border border-coral-500/30 text-coral-400 rounded-lg flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{filteredAdvisors.length} matches</span>
            </div>
          </div>
        </div>

        {/* Discovery Filter Controls (Inspired by Screenshot) */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-4 sm:p-6 shadow-xl mb-8 space-y-4">
          
          {/* Main Search Input & Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Keyword Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-techGray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keywords: 'Google', 'FinOps', 'PMF', 'Razorpay', 'Seed Round'..."
                className="w-full bg-dark-850 border border-dark-750 focus:border-coral-500 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none placeholder-dark-600 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-techGray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-dark-850 border border-dark-750 focus:border-coral-500 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none font-mono text-xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Rate Range Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value as any)}
                className="w-full bg-dark-850 border border-dark-750 focus:border-coral-500 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none font-mono text-xs"
              >
                <option value="all">Any Session Rate</option>
                <option value="under-3000">Under ₹3,000 / session</option>
                <option value="3000-4000">₹3,000 - ₹4,000 / session</option>
                <option value="4000+">₹4,000+ / session</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters Row: Experience & Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-dark-800 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-techGray-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> EXPERIENCE:
              </span>
              {(['all', '3-5', '6-8', '8+'] as const).map((exp) => (
                <button
                  key={exp}
                  onClick={() => setSelectedExpRange(exp)}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    selectedExpRange === exp
                      ? 'bg-coral-500/20 text-coral-400 border-coral-500/40 font-bold'
                      : 'bg-dark-850 text-techGray-400 border-dark-750 hover:text-white'
                  }`}
                >
                  {exp === 'all' ? 'All Years' : `${exp} yrs`}
                </button>
              ))}

              <button
                onClick={() => setOnlyVerified(!onlyVerified)}
                className={`ml-2 px-2.5 py-1 rounded border flex items-center gap-1 transition-colors ${
                  onlyVerified
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                    : 'bg-dark-850 text-techGray-400 border-dark-750 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Top Rated (5.0 ★)</span>
              </button>
            </div>

            {activeFilters.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-coral-400 hover:text-coral-300 underline underline-offset-4 transition-colors"
              >
                Reset all filters ({activeFilters.length})
              </button>
            )}
          </div>

          {/* Active Filter Pills (like screenshot) */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-techGray-500 text-[11px] font-mono">APPLIED:</span>
              {activeFilters.map((f) => (
                <span
                  key={f.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-dark-850 border border-dark-700 text-xs font-mono text-techGray-200"
                >
                  <span>{f.label}</span>
                  <button
                    onClick={f.clear}
                    className="hover:text-coral-400 p-0.5 rounded transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

        </div>

        {/* RESULTS: TABLE VIEW (Influencer Discovery Style) */}
        {viewMode === 'table' ? (
          <div className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-dark-950 border-b border-dark-800 font-mono text-[11px] text-techGray-400 uppercase tracking-wider">
                    <th className="py-4 px-5">ADVISOR & COMPANY</th>
                    <th className="py-4 px-4">DOMAIN & OUTCOMES</th>
                    <th className="py-4 px-4 text-center">EXPERIENCE</th>
                    <th className="py-4 px-4 text-center">RATING & SESSIONS</th>
                    <th className="py-4 px-4">NEXT SLOT</th>
                    <th className="py-4 px-4">SESSION RATE</th>
                    <th className="py-4 px-5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-800 font-sans text-sm">
                  {filteredAdvisors.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        <div className="font-mono text-sm text-techGray-400 space-y-2">
                          <div>NO ADVISORS MATCH CURRENT FILTERS</div>
                          <button
                            onClick={clearAllFilters}
                            className="text-coral-400 hover:text-coral-300 underline font-bold"
                          >
                            Reset filters to view all advisors
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAdvisors.map((adv) => (
                      <tr
                        key={adv.id}
                        className="hover:bg-dark-850/60 transition-colors group"
                      >
                        {/* Advisor info & handle */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-coral-500/15 border border-coral-500/30 text-coral-400 font-mono font-bold flex items-center justify-center shrink-0">
                              {adv.initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white group-hover:text-coral-400 transition-colors">
                                  {adv.name}
                                </span>
                                {adv.isVerified && (
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                )}
                              </div>
                              <div className="font-mono text-xs text-techGray-400 flex items-center gap-1.5">
                                <span className="text-coral-400">{adv.handle}</span>
                                <span>•</span>
                                <span className="text-techGray-300 font-medium">{adv.company}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Domain & Subcategory tags */}
                        <td className="py-4 px-4 max-w-xs">
                          <div className="space-y-1">
                            <span className="font-mono text-xs text-techGray-200 block font-medium">
                              {adv.category}
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {adv.subcategories.slice(0, 2).map((sub, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-mono bg-dark-800 text-techGray-400 px-1.5 py-0.5 rounded border border-dark-750"
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>

                        {/* Experience */}
                        <td className="py-4 px-4 text-center font-mono text-xs text-techGray-300">
                          <span className="bg-dark-800 px-2.5 py-1 rounded border border-dark-750">
                            {adv.experienceYears}+ yrs
                          </span>
                        </td>

                        {/* Rating & Sessions */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex flex-col items-center">
                            <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-400">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{adv.rating.toFixed(1)}</span>
                            </div>
                            <span className="font-mono text-[10px] text-techGray-400">
                              {adv.sessionsCompleted} calls done
                            </span>
                          </div>
                        </td>

                        {/* Next Available Slot */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{adv.availableSlot}</span>
                          </div>
                        </td>

                        {/* Session Rate */}
                        <td className="py-4 px-4">
                          <div className="font-mono">
                            <span className="font-bold text-white text-sm">
                              ₹{adv.hourlyRateINR.toLocaleString()}
                            </span>
                            <span className="text-techGray-500 text-xs"> / 1:1</span>
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => setSelectedAdvisor(adv)}
                            className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono text-xs font-bold px-3 py-2 rounded-md transition-all inline-flex items-center gap-1 shadow hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <span>&gt; book_slot</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* RESULTS: GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdvisors.map((adv) => (
              <div
                key={adv.id}
                className="bg-dark-900 border border-dark-700/80 hover:border-coral-500/50 p-6 rounded-xl transition-all duration-200 flex flex-col justify-between space-y-5 group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-coral-500/15 border border-coral-500/40 text-coral-400 font-mono font-bold text-base flex items-center justify-center">
                        {adv.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-coral-400 transition-colors flex items-center gap-1.5 text-base">
                          {adv.name}
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        </h4>
                        <div className="font-mono text-xs text-techGray-400">
                          {adv.currentRole} • <span className="text-white">{adv.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-techGray-300 text-xs line-clamp-2 font-sans">
                    {adv.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {adv.subcategories.map((sub, i) => (
                      <span
                        key={i}
                        className="bg-dark-850 text-techGray-300 border border-dark-750 px-2 py-0.5 rounded text-[11px]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-dark-800 text-techGray-400">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{adv.rating.toFixed(1)}</span>
                      <span className="text-techGray-400 font-normal">({adv.reviewCount})</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{adv.availableSlot}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-dark-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-techGray-400 block">SESSION RATE</span>
                    <span className="font-mono font-bold text-white text-base">
                      ₹{adv.hourlyRateINR.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedAdvisor(adv)}
                    className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono text-xs font-bold px-3.5 py-2 rounded-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>&gt; book_slot</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Advisor Details / Booking Modal Popup */}
        <AnimatePresence>
          {selectedAdvisor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-dark-900 border border-dark-700 max-w-lg w-full p-6 sm:p-8 rounded-xl shadow-2xl space-y-6 font-sans relative"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-coral-500/20 text-coral-400 font-mono font-bold text-xl flex items-center justify-center border border-coral-500/40">
                      {selectedAdvisor.initials}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        {selectedAdvisor.name}
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </h4>
                      <div className="font-mono text-xs text-coral-400">
                        {selectedAdvisor.currentRole} @ {selectedAdvisor.company}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAdvisor(null)}
                    className="text-techGray-400 hover:text-white font-mono text-sm p-1 rounded hover:bg-dark-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Bio & Credentials */}
                <div className="space-y-2">
                  <div className="font-mono text-xs text-techGray-400 uppercase">CREDENTIALS & BACKGROUND</div>
                  <p className="text-techGray-200 text-sm leading-relaxed">{selectedAdvisor.bio}</p>
                </div>

                {/* Session Deliverables */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-techGray-400 uppercase">1:1 CONSULTATION OUTCOMES</div>
                  <ul className="space-y-1.5 text-techGray-200">
                    {selectedAdvisor.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-coral-500 font-bold">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rate & Next slot banner */}
                <div className="p-4 bg-dark-850 rounded-lg border border-dark-700 flex items-center justify-between font-mono text-xs">
                  <div>
                    <div className="text-techGray-400">SESSION RATE</div>
                    <div className="text-lg font-bold text-white">
                      ₹{selectedAdvisor.hourlyRateINR.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-techGray-400">NEXT AVAILABLE SLOT</div>
                    <div className="text-emerald-400 font-bold">{selectedAdvisor.availableSlot}</div>
                  </div>
                </div>

                {/* Book slot action */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedAdvisor(null);
                      const waitlistEl = document.getElementById('waitlist');
                      if (waitlistEl) waitlistEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold py-3.5 rounded-lg text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>&gt; confirm_1_on_1_booking_request</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
