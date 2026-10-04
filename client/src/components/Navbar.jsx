import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  MapPin,
  Calendar,
  Wallet,
  User,
  Plane,
  ChevronDown,
  LogOut,
  Bell,
  Sparkles,
  Globe,
  Check,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { trips, currentTrip, setCurrentTrip } = useTrip();
  const { t, currentLang, changeLanguage, languages } = useLanguage();
  const [tripDropdownOpen, setTripDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Main navigation (Home, Explore, Plan Trip, My Trips, Budget, Account)
  const navLinks = [
    { name: 'Home', path: '/home', icon: Compass },
    { name: 'Explore', path: '/explore', icon: MapPin },
    { name: 'Plan Trip', path: '/plan', icon: Calendar },
    { name: 'My Trips', path: '/trips', icon: Plane },
    { name: 'Budget', path: '/budget', icon: Wallet },
    { name: 'Account', path: '/account', icon: User },
  ];

  const unreadNotifs = user?.notifications?.filter(n => !n.read)?.length || 0;

  const handleTripSelect = (trip) => {
    setCurrentTrip(trip);
    setTripDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* DESKTOP & MOBILE TOP HEADER */}
      <header className="sticky top-0 z-40 w-full navbar-travel shadow-2xs font-sans transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* TripMate Brand Logo */}
            <Link to="/home" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-600/25 group-hover:scale-105 transition-transform duration-200">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  TripMate<span className="text-sky-600">.</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    Plan Smart. Travel Easy.
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                    Demo Mode
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links (ALL 7 ITEMS as per Requirement 15) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                      isActive
                        ? 'bg-sky-50 text-sky-600 font-extrabold shadow-2xs'
                        : 'text-slate-600 hover:text-sky-600 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-sky-600'}`} />
                    <span>{link.name}</span>
                    
                    {/* Small animated indicator under active link (Requirement 15) */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-600 rounded-full animate-fade-in" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Header Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Language Selector Dropdown (Desktop) */}
              <div className="relative group hidden sm:block">
                <button
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                  title="Change UI Language"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span>{languages.find((l) => l.code === currentLang)?.native || 'English'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                
                <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white shadow-xl border border-slate-100 p-1.5 hidden group-hover:block hover:block z-50 animate-fade-in">
                  <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1">
                    {t('selectLanguage')}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        currentLang === lang.code
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang.flag} {lang.name}</span>
                      <span className="text-[11px] text-slate-400 font-normal">{lang.native}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Trip Selector (Desktop) */}
              {trips.length > 0 && (
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={() => setTripDropdownOpen(!tripDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50/80 hover:bg-sky-100 text-sky-900 text-xs font-semibold border border-sky-200 transition-colors"
                    title="Switch Active Trip"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    <span className="max-w-[110px] truncate font-bold">
                      {currentTrip ? currentTrip.destinationName : 'Select Trip'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-sky-600" />
                  </button>

                  {tripDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-slate-100 p-2 z-50 animate-fade-in">
                      <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1">
                        Active Trip Context
                      </div>
                      <div className="max-h-56 overflow-y-auto space-y-1">
                        {trips.map((t) => {
                          const isSelected = currentTrip && (currentTrip._id === t._id || currentTrip.id === t.id);
                          return (
                            <button
                              key={t._id || t.id}
                              onClick={() => handleTripSelect(t)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                                isSelected
                                  ? 'bg-sky-50 text-sky-700 font-bold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="truncate">
                                <div className="font-bold">{t.destinationName}</div>
                                <div className="text-[10px] text-slate-400">{t.startDate} • {t.daysCount || 3} Days</div>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-sky-600 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notification Bell (links to /account notifications) */}
              <Link
                to="/account?tab=notifications"
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-sky-600 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                    {unreadNotifs}
                  </span>
                )}
              </Link>

              {/* User Profile Avatar / Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-sky-500/30 transition-all"
                >
                  <img
                    src={user?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover border border-sky-400"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-100 p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-xs font-black text-slate-900 truncate">{user?.name || 'Traveler'}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user?.email || 'guest@tripmate.com'}</div>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4 text-sky-600" />
                        <span>Account & Profile</span>
                      </Link>
                      <Link
                        to="/trips"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-xl transition-colors"
                      >
                        <Plane className="w-4 h-4 text-indigo-600" />
                        <span>My Saved Trips</span>
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 navbar-travel border-t border-blue-600/10 shadow-2xl lg:hidden font-sans">
        <div className="grid grid-cols-6 h-16 items-center px-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center h-full transition-all duration-200 active:scale-90 ${
                  isActive ? 'text-sky-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-sky-600' : ''}`} />
                  {link.path === '/account' && unreadNotifs > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </div>
                <span className={`text-[9px] mt-0.5 tracking-tight transition-colors duration-200 truncate ${
                  isActive ? 'font-black text-sky-600' : 'font-medium text-slate-500'
                }`}>
                  {link.name}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-0.5 animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
