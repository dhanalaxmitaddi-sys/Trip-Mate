import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { useUI } from '../context/UIContext';
import {
  User,
  Mail,
  Compass,
  MapPin,
  Calendar,
  Wallet,
  Tag,
  Bell,
  LogOut,
  CheckCircle2,
  Bookmark,
  Plane,
  ShieldCheck,
  Sparkles,
  Camera,
  Trash2,
  ArrowRight,
  ExternalLink,
  Check,
  Clock,
  Ticket
} from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
];

export const Account = () => {
  const [searchParams] = useSearchParams();
  const { user, logout, updateProfile, toggleSavePlace, markNotificationsRead } = useAuth();
  const { trips, setCurrentTrip } = useTrip();
  const { showSuccess, showError, showInfo } = useUI();
  const navigate = useNavigate();

  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'profile'); // profile, preferences, saved, trips, bookings, notifications

  useEffect(() => {
    if (tabQuery) {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  // Editable Profile States
  const [name, setName] = useState(user?.name || 'Traveler');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || AVATAR_PRESETS[0]);
  const [travelStyle, setTravelStyle] = useState(user?.preferences?.travelStyle || 'Balanced');
  const [foodPreference, setFoodPreference] = useState(user?.preferences?.foodPreference || 'No Preference');
  const [budgetPreference, setBudgetPreference] = useState(user?.preferences?.budgetPreference || 'Medium');
  const [interests, setInterests] = useState(user?.preferences?.interests || ['Nature', 'Beaches', 'Food']);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const updated = await updateProfile({
      name,
      profilePhoto,
      preferences: {
        travelStyle,
        foodPreference,
        budgetPreference,
        interests
      }
    });
    setIsSaving(false);
    if (updated.success) {
      showSuccess('Profile details saved successfully!');
    } else {
      showError('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    logout();
    showInfo('Logged out successfully.');
    navigate('/login');
  };

  const handleViewTrip = (trip) => {
    setCurrentTrip(trip);
    navigate('/plan');
  };

  const allInterests = [
    'Nature', 'Beaches', 'History', 'Adventure', 'Food', 'Shopping', 'Culture', 'Photography'
  ];

  const toggleInterest = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter(i => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const completedTrips = trips.filter(t => t.status === 'Completed');
  const upcomingTrips = trips.filter(t => (t.status || 'Upcoming') === 'Upcoming');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* Account Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white shadow-xl border border-sky-800/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <img
              src={user?.profilePhoto || profilePhoto}
              alt={user?.name || 'Profile'}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-white">
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {user?.name || 'Traveler'}
              </h1>
              {user?.isGuest ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Guest Demo Mode
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  TripMate Verified
                </span>
              )}
            </div>
            <p className="text-xs text-sky-200 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{user?.email || 'traveler@tripmate.com'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'profile', label: 'Profile Details', icon: User },
          { id: 'preferences', label: 'Travel Preferences', icon: Compass },
          { id: 'saved', label: `Saved Places (${user?.savedPlaces?.length || 0})`, icon: Bookmark },
          { id: 'trips', label: `My Trips (${trips.length})`, icon: Plane },
          { id: 'bookings', label: `Booking History (${user?.bookingHistory?.length || 0})`, icon: Ticket },
          { id: 'notifications', label: `Notifications (${user?.notifications?.filter(n => !n.read).length || 0})`, icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'notifications') markNotificationsRead();
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFILE DETAILS */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-black text-slate-900">Personal Information</h2>
            <p className="text-xs text-slate-500">Update your traveler profile name and visual avatar.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-semibold text-slate-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Email is permanently linked to your account profile.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Choose Profile Avatar Preset
              </label>
              <div className="flex items-center gap-3">
                {AVATAR_PRESETS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProfilePhoto(url)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      profilePhoto === url ? 'border-sky-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-12 h-12 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: TRAVEL PREFERENCES */}
      {activeTab === 'preferences' && (
        <form onSubmit={handleSaveProfile} className="max-w-3xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-black text-slate-900">Travel Preferences</h2>
            <p className="text-xs text-slate-500">TripMate uses these preferences to tailor all your AI itinerary recommendations.</p>
          </div>

          <div className="space-y-6">
            
            {/* Travel Style */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Preferred Travel Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Budget', 'Relaxed', 'Balanced', 'Luxury', 'Adventure'].map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setTravelStyle(style)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      travelStyle === style
                        ? 'border-sky-600 bg-sky-50 text-sky-800'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Dietary & Food Preference</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['No Preference', 'Pure Vegetarian', 'Non-Vegetarian', 'Vegan', 'Local Food', 'Budget Food'].map(food => (
                  <button
                    key={food}
                    type="button"
                    onClick={() => setFoodPreference(food)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      foodPreference === food
                        ? 'border-sky-600 bg-sky-50 text-sky-800'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {food}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Typical Budget Pacing</label>
              <div className="grid grid-cols-3 gap-2">
                {['Economy / Backpacking', 'Balanced / Moderate', 'Luxury / High-End'].map(pacing => (
                  <button
                    key={pacing}
                    type="button"
                    onClick={() => setBudgetPreference(pacing)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      budgetPreference === pacing
                        ? 'border-sky-600 bg-sky-50 text-sky-800'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {pacing}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Top Favorite Interests</label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map(interest => {
                  const selected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        selected
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all"
            >
              {isSaving ? 'Saving Preferences...' : 'Save Preferences'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SAVED PLACES */}
      {activeTab === 'saved' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-black text-slate-900">Saved Places & Attractions</h2>
            <p className="text-xs text-slate-500">Places you bookmarked from Explore Places to revisit or add to itineraries.</p>
          </div>

          {user?.savedPlaces && user.savedPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.savedPlaces.map((place) => (
                <div key={place.id} className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                  {place.image && (
                    <img src={place.image} alt={place.name} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-md">
                      {place.category}
                    </span>
                    <h3 className="text-sm font-black text-slate-900">{place.name}</h3>
                    <p className="text-xs text-slate-500">{place.location}</p>
                    <div className="text-xs font-bold text-slate-700">
                      {place.price === 0 ? 'Free Entry' : `Est. ₹${place.price}`}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/explore');
                      }}
                      className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSavePlace(place)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center rounded-3xl bg-white border border-slate-200/80 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No saved places yet</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Explore destinations and click the bookmark button on any attraction or food spot to save it here.</p>
              <Link to="/explore" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold mt-2">
                <span>Explore Places</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MY TRIPS QUICK VIEW */}
      {activeTab === 'trips' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Your Saved Trips</h2>
              <p className="text-xs text-slate-500">Upcoming, Ongoing, and Completed itineraries belonging to your account.</p>
            </div>
            <Link to="/plan" className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs">
              Plan New Trip
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trips.map(trip => (
              <div key={trip._id || trip.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{trip.destinationName}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      trip.status === 'Completed' ? 'bg-slate-100 text-slate-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {trip.status || 'Upcoming'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{trip.startDate} to {trip.endDate} • {trip.daysCount} Days</p>
                  <p className="text-xs font-bold text-sky-600">Budget: {trip.currencySymbol || '₹'}{(trip.budget || 0).toLocaleString()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleViewTrip(trip)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-xs font-bold transition-colors"
                >
                  View Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BOOKING HISTORY */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-black text-slate-900">Demo Booking History</h2>
            <p className="text-xs text-slate-500">All travel plans booked through TripMate Demo Booking system.</p>
          </div>

          {user?.bookingHistory && user.bookingHistory.length > 0 ? (
            <div className="space-y-3">
              {user.bookingHistory.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                        {item.bookingId}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {item.status || 'Confirmed'}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900">{item.destinationName}</h3>
                    <p className="text-xs text-slate-500">{item.dates} • Stay: {item.hotelName}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Final Paid (Demo)</div>
                    <div className="text-lg font-black text-slate-900">{item.currencySymbol || '₹'}{item.finalAmount?.toLocaleString()}</div>
                    {item.discount > 0 && (
                      <div className="text-[11px] text-emerald-600 font-bold">Coupon Saved {item.currencySymbol || '₹'}{item.discount}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center rounded-3xl bg-white border border-slate-200/80 space-y-3">
              <Ticket className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No bookings yet</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Customize your trip and click "Book Plan" to simulate a real confirmed booking.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: NOTIFICATIONS CENTER */}
      {activeTab === 'notifications' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-black text-slate-900">Notifications Center</h2>
            <p className="text-xs text-slate-500">System updates, coupon alerts, and booking confirmations.</p>
          </div>

          {user?.notifications && user.notifications.length > 0 ? (
            <div className="space-y-3">
              {user.notifications.map((notif, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-xs font-black text-slate-900">{notif.title}</div>
                    <p className="text-xs text-slate-600">{notif.message}</p>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/80 text-xs text-slate-400">
              No notifications at this time.
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Account;
