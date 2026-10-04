import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  Calendar,
  Wallet,
  CheckCircle,
  Clock,
  Sparkles,
  FileDown,
  ArrowRight,
  Plus,
  MapPin,
  Bot,
  ExternalLink,
  Users
} from 'lucide-react';
import pdfService from '../services/pdfService';
import { useUI } from '../context/UIContext';

export const Dashboard = () => {
  const { trips, currentTrip, setCurrentTrip, budgetStats } = useTrip();
  const { user } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();

  // FR12 Metric Computations
  const totalSavedTrips = trips.length;
  const upcomingTripsCount = trips.filter(t => t.status === 'Upcoming').length;
  const totalPlannedBudget = trips.reduce((sum, t) => sum + (Number(t.budget) || 0), 0);

  const activeTrip = currentTrip || trips[0] || null;

  const handleDownloadPDF = () => {
    if (!activeTrip) {
      showError('Please select or plan a trip first to download PDF');
      return;
    }
    const success = pdfService.exportTripPDF(activeTrip, [], budgetStats);
    if (success) {
      showSuccess('PDF itinerary downloaded successfully!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span>TripMind AI Intelligence Dashboard (FR12)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome, {user ? user.name : 'Traveler'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time itinerary progression, expense balances, and trip logistics.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-white text-xs font-bold shadow-md shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </Link>
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={!activeTrip}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors disabled:opacity-40"
          >
            <FileDown className="w-4 h-4 text-primary-600" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* FR12 Dashboard Statistic Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Total Saved Trips</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{totalSavedTrips}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Upcoming Trips</div>
            <div className="text-2xl font-black text-emerald-700 mt-0.5">{upcomingTripsCount}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Total Planned Budget</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">₹{totalPlannedBudget.toLocaleString()}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">AI Assistant</div>
            <div className="text-sm font-extrabold text-amber-700 mt-1 flex items-center gap-1">
              <span>Ready</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Trip Hero Banner (Current / Latest Trip) */}
      {activeTrip ? (
        <div className="rounded-3xl overflow-hidden glass-card border border-slate-200/80 shadow-md">
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-primary-900 via-primary-800 to-indigo-950 text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                    {activeTrip.status || 'Upcoming'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary-500/30 text-primary-200 text-xs font-medium">
                    {activeTrip.source === 'ai' ? '✨ Synthesized by TripMind AI' : 'Smart Local Plan'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {activeTrip.destinationName} Itinerary
                </h2>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-primary-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-300" />
                    <span>{activeTrip.startDate} — {activeTrip.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary-300" />
                    <span>{activeTrip.travelers} Traveler(s)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-primary-300" />
                    <span>Budget: ₹{Number(activeTrip.budget).toLocaleString()}</span>
                  </div>
                </div>

                {activeTrip.interests && activeTrip.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeTrip.interests.map(i => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px]">
                        #{i}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons on Active Trip */}
              <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTrip(activeTrip);
                    navigate(`/plan?tripId=${activeTrip._id || activeTrip.id}`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-primary-50 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Open Full Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/budget"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all text-center"
                >
                  Inspect Budget
                </Link>

                <Link
                  to="/packing"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all text-center"
                >
                  View Packing List
                </Link>
              </div>
            </div>
          </div>

          {/* Quick days strip */}
          {activeTrip.days && activeTrip.days.length > 0 && (
            <div className="p-6 bg-white border-t border-slate-100 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Itinerary Schedule Snapshot ({activeTrip.days.length} Days)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeTrip.days.slice(0, 3).map((day) => (
                  <div key={day.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Day {day.dayNumber}</span>
                      <span className="text-slate-400 font-normal">{day.date}</span>
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-1 font-medium">
                      {day.activities && day.activities[0]?.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {day.activities?.length || 0} activities scheduled
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-dashed border-slate-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Active Trips Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You don't have any trips generated yet. Let TripMind AI create a personalized itinerary with activities and budget calculation in seconds.
          </p>
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white text-xs font-bold shadow-md shadow-primary-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Trip</span>
          </Link>
        </div>
      )}

      {/* Quick Action Navigation Tiles (FR12) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Instant Navigation & Tools (FR12)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/plan"
            className="p-5 rounded-2xl glass-card group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                Plan a Trip
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                AI itinerary builder (FR1, FR2)
              </div>
            </div>
          </Link>

          <Link
            to="/trips"
            className="p-5 rounded-2xl glass-card group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Open Saved Trips
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                View & duplicate plans (FR9)
              </div>
            </div>
          </Link>

          <Link
            to="/assistant"
            className="p-5 rounded-2xl glass-card group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Ask the Assistant
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Instant travel guidance (FR10)
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="p-5 rounded-2xl glass-card group flex items-start gap-4 text-left w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Download PDF
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Export travel itinerary (FR11)
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
