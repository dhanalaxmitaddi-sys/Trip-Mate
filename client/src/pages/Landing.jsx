import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Wallet,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Bot,
  FileDown,
  Navigation,
  Sun
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { useTrip } from '../context/TripContext';

export const Landing = () => {
  const navigate = useNavigate();
  const { setCurrentTrip, trips } = useTrip();

  const handleQuickDestinationSelect = (destId) => {
    navigate(`/plan?destination=${destId}`);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200/80 text-primary-700 text-xs font-semibold shadow-2xs animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span>Autonomous AI Travel Planning • 100% Free Tier</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] animate-slide-up">
            Plan Dream Trips in Seconds with{' '}
            <span className="gradient-text">TripMind AI</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Autonomous multi-day itinerary generation, real-time budget tracking, live weather forecasts, and smart weather-adapted packing checklists — built exactly as per SRS specifications.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl gradient-bg text-white font-bold text-sm shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Generate My Trip (FR1 & FR2)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-sm shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Bot className="w-4 h-4 text-primary-600" />
              <span>Ask AI Assistant (FR10)</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>No API Keys Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Dynamic Budget Calculator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>One-Click PDF Export</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Google Maps Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Supported Destinations (SRS Appendix 9.3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">
              Top Indian Destinations
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Supported Travel Hubs
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Pre-loaded with curated attractions, verified seasonal weather patterns, and localized packing rules.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <span>Explore All Sights</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleQuickDestinationSelect(dest.id)}
              className="glass-card rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md">
                    {dest.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-xl font-black">{dest.name}</h3>
                  <p className="text-[11px] text-slate-200 truncate">{dest.tagline}</p>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500">
                    Daily living: <strong className="text-slate-800">~₹{dest.foodRate + dest.hotelRate / 2}</strong>
                  </div>
                  <span className="text-primary-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Plan Trip <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SRS Functional Architecture Showcase */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Strictly Built to Software Requirements Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each module maps directly to the SRS functional requirements (FR1 - FR12) without unnecessary decoration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">FR1 & FR2: AI Itinerary Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates a balanced 2–4 activity daily schedule with time slots, duration, cost, and reasons, backed by smart local recommendation scoring.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">FR3: Dynamic Budget Tracker</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates hotel, transport, meals, and activities in real time. Fires overspend warnings instantly if total crosses limits.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">FR4 & FR5: Places & Map Directions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Curated place directory with category filtering, search, and one-click Google Maps direction links with no paid map API keys.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">FR7 & FR8: Weather & Smart Packing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synthesizes packing checklists grouped into Clothing, Toiletries, Documents, Electronics, and Health items scaled by days and destination climate.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">FR10: Travel Assistant Chatbot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keyword-based intent scoring algorithm answering queries for destinations, packing, food, hotels, and budget optimization.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileDown className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">FR11 & FR12: PDF & Saved Trips</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                One-click complete itinerary PDF export with costs and packing lists, plus saved trip management with duplicate and delete safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl gradient-bg p-8 sm:p-12 text-white text-center space-y-4 shadow-xl shadow-primary-500/20">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Plan Your Next Adventure?
          </h2>
          <p className="text-xs sm:text-sm text-primary-100 max-w-xl mx-auto leading-relaxed">
            Create an optimized, cost-calculated itinerary in less than 3 minutes. No billing, no credit card required.
          </p>
          <div className="pt-2">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-primary-700 font-bold text-sm shadow-md hover:bg-primary-50 hover:scale-105 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Start Planning Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
