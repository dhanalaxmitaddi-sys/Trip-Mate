import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useUI } from '../context/UIContext';
import {
  destinations,
  domesticDestinations,
  internationalDestinations,
  demoOffers
} from '../data/destinations';
import {
  Compass,
  MapPin,
  Calendar,
  Wallet,
  ArrowRight,
  Sparkles,
  Plane,
  Tag,
  Star,
  Hotel,
  UtensilsCrossed,
  ShieldCheck,
  Search,
  CheckCircle,
  Copy,
  Plus
} from 'lucide-react';

export const Home = () => {
  const { currentTrip, trips, setCurrentTrip } = useTrip();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { showSuccess } = useUI();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [userLocation, setUserLocation] = useState('Mumbai, India');
  const [detectingLocation, setDetectingLocation] = useState(false);

  const detectLocation = () => {
    setDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation('Detected Location (GPS)');
          setDetectingLocation(false);
          showSuccess('Located current position via GPS!');
        },
        () => {
          setUserLocation('Mumbai, India');
          setDetectingLocation(false);
        },
        { timeout: 6000 }
      );
    } else {
      setDetectingLocation(false);
    }
  };

  // Search filtering in Hero
  const searchResults = destinations.filter((d) => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    return (
      d.name.toLowerCase().includes(query) ||
      d.country.toLowerCase().includes(query) ||
      d.type.toLowerCase().includes(query) ||
      d.tagline.toLowerCase().includes(query)
    );
  });

  const popularPlaces = destinations.filter(d => 
    ['goa', 'paris', 'dubai', 'hyderabad', 'bali', 'tokyo'].includes(d.id)
  );

  const budgetPlaces = destinations.filter(d => d.hotelRate <= 3000).slice(0, 4);

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showSuccess(`Promo coupon "${code}" copied! You can apply it on the Budget page.`);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const handleQuickPlan = (destId) => {
    navigate(`/plan?destination=${destId}`);
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in font-sans">
      
      {/* 1. Hero Section (Requirement 13: Shows animated background clearly) */}
      <section className="relative overflow-hidden text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Soft atmospheric blue/cyan glow allowing moving clouds, route, and dots to show clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/8 via-cyan-400/5 to-transparent pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[250px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-blue-100 text-blue-700 text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>TripMate • Autonomous AI & Rule-Based Travel Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Plan Smart. Travel Easy. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500">
              Enjoy More.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            "Your trip. Your budget. Your way." Personalized day-by-day itineraries, dynamic expense tracking, and curated domestic & international destinations.
          </p>

          {/* Current Location Badge (Requirement 19) */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Current Location: <strong className="text-slate-900">{userLocation}</strong></span>
            <button
              type="button"
              onClick={detectLocation}
              disabled={detectingLocation}
              className="px-2.5 py-0.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[10px] text-blue-700 font-bold border border-blue-200 transition-colors cursor-pointer"
            >
              {detectingLocation ? 'Locating...' : 'Detect GPS'}
            </button>
          </div>

          {/* Quick Destination Search with Live Match Count */}
          <div className="max-w-xl mx-auto pt-1 relative">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any destination (e.g. Goa, Paris, Dubai, Hyderabad, Manali)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-slate-900 placeholder-slate-400 text-sm font-medium shadow-xl border border-slate-200/80 focus:outline-hidden focus:ring-4 focus:ring-blue-500/25"
              />
            </div>

            {/* Quick Live Search Results Dropdown */}
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 text-left max-h-72 overflow-y-auto animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                  <span>Search Matches</span>
                  <span className="text-blue-600 font-extrabold">{searchResults.length} places found</span>
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => handleQuickPlan(dest.id)}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dest.coverImage}
                          alt={dest.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold text-xs text-slate-900">{dest.name}</div>
                          <div className="text-[11px] text-slate-500">{dest.country} • {dest.tagline}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                        Plan Trip
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No destinations matched "{searchQuery}". Try "Goa", "Paris", or "Dubai".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Primary Call-to-Action Buttons (Requirement 11) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              to="/plan"
              id="hero-btn-plan-trip"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white font-bold text-sm shadow-xl shadow-blue-600/25 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('planMyTripBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/explore"
              id="hero-btn-explore"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] font-bold text-sm active:scale-[0.98] border border-sky-200/80 shadow-xs transition-all"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>{t('exploreDestinationsBtn')}</span>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-slate-600">
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>100% Free AI / Fallback</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Single Source Truth</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Dynamic Budgeting</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span>1-Click PDF Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recently Viewed & Saved Trips Section (Requirement 19: Recently viewed/saved trips) */}
      {trips && trips.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Your Saved & Active Trips
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                {trips.length} Saved
              </span>
            </div>
            <Link
              to="/trips"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              <span>Manage in My Trips</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.slice(0, 3).map((trip) => {
              const isCurrent = currentTrip && (currentTrip._id === trip._id || currentTrip.id === trip.id);
              return (
                <div
                  key={trip._id || trip.id}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-3 ${
                    isCurrent
                      ? 'bg-gradient-to-br from-sky-900 via-blue-900 to-slate-900 text-white border-sky-700 shadow-md'
                      : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                          isCurrent ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {isCurrent ? 'Active Trip' : (trip.status || 'Upcoming')}
                        </span>
                        {trip.booking?.status === 'Booked' && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-500 text-white">
                            Booked
                          </span>
                        )}
                      </div>
                      <h4 className={`text-lg font-black mt-1 ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                        {trip.destinationName}
                      </h4>
                      <p className={`text-xs ${isCurrent ? 'text-sky-200' : 'text-slate-500'}`}>
                        {trip.startDate} to {trip.endDate} • {trip.daysCount || trip.days?.length || 3} Days
                      </p>
                    </div>

                    <div className="text-right">
                      <div className={`text-[10px] uppercase font-semibold ${isCurrent ? 'text-sky-300' : 'text-slate-400'}`}>
                        Target Budget
                      </div>
                      <div className={`text-sm font-black ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                        {trip.currencySymbol || '₹'}{(trip.budget || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between gap-2 border-slate-100/20">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTrip(trip);
                        navigate('/plan');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-xs'
                          : 'bg-sky-50 hover:bg-sky-100 text-sky-700'
                      }`}
                    >
                      View Itinerary
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTrip(trip);
                        navigate('/budget');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      Budget Graph
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Top Trending Getaways
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('popularDestinations')}
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
          >
            <span>View all 19 destinations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPlaces.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                    dest.isInternational ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {dest.isInternational ? 'International' : 'Domestic (India)'}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-xs">
                  From ₹{dest.hotelRate?.toLocaleString()}/night
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">{dest.name}</h3>
                    <span className="text-xs text-slate-500 font-medium">{dest.country}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {dest.tagline}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {dest.places?.length || 3} key attractions
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickPlan(dest.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <span>Plan Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Domestic Trips Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Explore India
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('domesticTitle')}
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {domesticDestinations.length} Domestic Cities
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {domesticDestinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => handleQuickPlan(dest.id)}
              className="text-left group bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-emerald-500 hover:shadow-md transition-all"
            >
              <div className="h-28 rounded-xl overflow-hidden mb-2.5">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h4 className="font-bold text-xs text-slate-900 truncate">{dest.name}</h4>
              <p className="text-[10px] text-slate-500 truncate">{dest.state}</p>
              <div className="mt-1.5 text-[10px] font-bold text-emerald-700">
                ₹{dest.hotelRate?.toLocaleString()}/night
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. International Destinations Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Global Journeys
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('internationalTitle')}
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {internationalDestinations.length} World Cities
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {internationalDestinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => handleQuickPlan(dest.id)}
              className="text-left group bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-indigo-500 hover:shadow-md transition-all"
            >
              <div className="h-28 rounded-xl overflow-hidden mb-2.5">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h4 className="font-bold text-xs text-slate-900 truncate">{dest.name}</h4>
              <p className="text-[10px] text-slate-500 truncate">{dest.country}</p>
              <div className="mt-1.5 flex items-center justify-between text-[10px]">
                <span className="font-bold text-indigo-700">{dest.currency} ({dest.currencySymbol})</span>
                <span className="text-slate-400">Passport Req.</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Budget-Friendly Trips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Pocket Friendly Escapes
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('budgetFriendlyTrips')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {budgetPlaces.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-4 space-y-3 shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={dest.coverImage}
                alt={dest.name}
                className="w-full h-36 rounded-2xl object-cover"
              />
              <div>
                <h4 className="font-black text-sm text-slate-900">{dest.name}</h4>
                <p className="text-[11px] text-slate-500">{dest.country}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-between text-xs">
                <span className="text-teal-800 font-semibold">Stay from:</span>
                <span className="font-black text-teal-900">₹{dest.hotelRate}/night</span>
              </div>
              <button
                type="button"
                onClick={() => handleQuickPlan(dest.id)}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Plan on Budget
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Special Demo Offers & Coupons (Requirement 26) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Discounts & Perks
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('specialOffers')}
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">Demo Coupons</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoOffers.map((offer) => (
            <div
              key={offer.code}
              className="p-4 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
                    {offer.discount}
                  </span>
                  <Tag className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 pt-1">{offer.code}</h4>
                <p className="text-[11px] text-slate-600">{offer.description}</p>
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium">{offer.validity}</span>
                <button
                  type="button"
                  onClick={() => handleCopyCoupon(offer.code)}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedCode === offer.code ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Local Food & Recommended Stays Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Local Gastronomy Box */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <h3 className="font-black text-slate-900 text-base">{t('localFood')}</h3>
              </div>
              <Link to="/explore" className="text-xs font-bold text-sky-600 hover:text-sky-700">
                Explore More
              </Link>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Hyderabadi Dum Biryani & Mirchi Ka Salan</div>
                  <div className="text-[11px] text-slate-500">Hyderabad • Paradise / Bawarchi</div>
                </div>
                <span className="font-extrabold text-orange-600">₹350 - ₹600</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">CTR Crispy Butter Benne Dosa & Filter Kaapi</div>
                  <div className="text-[11px] text-slate-500">Bengaluru • Malleshwaram</div>
                </div>
                <span className="font-extrabold text-orange-600">₹90 - ₹160</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Goan Prawn Balchão & Fresh Fish Curry</div>
                  <div className="text-[11px] text-slate-500">Goa • Fisherman's Wharf</div>
                </div>
                <span className="font-extrabold text-orange-600">₹380 - ₹600</span>
              </div>
            </div>
          </div>

          {/* Recommended Stays Box */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Hotel className="w-4 h-4" />
                </div>
                <h3 className="font-black text-slate-900 text-base">{t('recommendedStays')}</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">Demo Booking</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Taj Falaknuma Palace</div>
                  <div className="text-[11px] text-slate-500">Hyderabad • Royal Palace Suites</div>
                </div>
                <span className="font-extrabold text-sky-700">₹28,000/night</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">The Leela Palace Bengaluru</div>
                  <div className="text-[11px] text-slate-500">Bengaluru • Art-Deco Pool & Gardens</div>
                </div>
                <span className="font-extrabold text-sky-700">₹16,000/night</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Santana Beach Resort Candolim</div>
                  <div className="text-[11px] text-slate-500">Goa • Direct Beach Access</div>
                </div>
                <span className="font-extrabold text-sky-700">₹3,800/night</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
