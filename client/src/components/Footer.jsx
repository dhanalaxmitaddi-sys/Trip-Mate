import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, ShieldCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm mt-auto border-t border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                TripMate<span className="text-sky-500">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {t('brandTagline')}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Free Tier • Rule-Based & AI-Ready</span>
            </div>
          </div>

          {/* Core Navigation (Requirement 4: ONLY Home, Explore, Plan Trip, My Trips, Budget) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Main Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/home" className="hover:text-white transition-colors">{t('navHome')}</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors">{t('navExplore')}</Link></li>
              <li><Link to="/plan" className="hover:text-white transition-colors">{t('navPlan')}</Link></li>
              <li><Link to="/trips" className="hover:text-white transition-colors">{t('navTrips')}</Link></li>
              <li><Link to="/budget" className="hover:text-white transition-colors">{t('navBudget')}</Link></li>
            </ul>
          </div>

          {/* Supported Destinations Preview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Top Destinations</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Goa', 'Paris', 'Dubai', 'Hyderabad', 'Bengaluru', 'Bali', 'Tokyo', 'London'].map((d) => (
                <span key={d} className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-500" /> {d}
                </span>
              ))}
            </div>
          </div>

          {/* Official Travel Verification Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Official Disclaimer</h4>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              Demo recommendations are being used. Travelers must verify current official visa guidelines, passport validity, and entry requirements through official embassy sources before traveling.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TripMate. Plan Smart. Travel Easy. Enjoy More.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for frictionless global journeys</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
