import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  Globe,
  CheckCircle2,
  Eye,
  EyeOff,
  Plane,
  ShieldCheck,
  Palmtree,
  MapPin,
  LogIn,
  UserPlus
} from 'lucide-react';

export const Login = ({ defaultMode = 'login' }) => {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(defaultMode === 'signup' || location.pathname === '/register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  useEffect(() => {
    if (location.pathname === '/register' || defaultMode === 'signup') {
      setIsSignUp(true);
    } else if (location.pathname === '/login' || defaultMode === 'login') {
      setIsSignUp(false);
    }
  }, [location.pathname, defaultMode]);

  const { login, register, demoLogin, continueAsGuest } = useAuth();
  const { showSuccess, showError } = useUI();
  const { t, currentLang, changeLanguage, languages } = useLanguage();
  const navigate = useNavigate();

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showError(t('emailLabel') + ' & ' + t('passwordLabel') + ' are required');
      return;
    }

    if (isSignUp && !name.trim()) {
      showError(t('fullNameLabel') + ' is required');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const res = await register(name, email, password);
        if (res.success) {
          showSuccess('Account created successfully! Welcome to TripMate.');
          navigate('/home');
        } else {
          showError(res.message || 'Registration failed');
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          showSuccess('Signed in successfully! Welcome back.');
          navigate('/home');
        } else {
          showError(res.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      showError('Authentication service error. You can also Continue as Guest.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Guest Access
  const handleGuestEntry = () => {
    continueAsGuest();
    showSuccess('Entered in Guest Mode! Enjoy exploring TripMate.');
    navigate('/home');
  };

  // Demo Login
  const handleDemoLogin = async () => {
    setLoading(true);
    await demoLogin();
    setLoading(false);
    showSuccess('Welcome to TripMate Demo Account!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans">
      {/* Soft atmospheric tint allowing global travel animated clouds & dots to be visible */}
      <div className="absolute inset-0 bg-sky-900/5 backdrop-blur-[1px] pointer-events-none" />

      {/* Floating Travel Badges (Animated Decor) */}
      <div className="hidden lg:flex items-center gap-2 absolute top-8 left-10 text-slate-700 text-xs font-bold px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 animate-fade-in shadow-md">
        <Palmtree className="w-4 h-4 text-emerald-600" />
        <span>19 Domestic & International Destinations</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 absolute bottom-8 left-10 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 animate-fade-in shadow-md">
        <MapPin className="w-4 h-4 text-rose-500" />
        <span>Goa • Paris • Dubai • Hyderabad • Tokyo & more</span>
      </div>

      {/* Main Authentication Card Container */}
      <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-slide-up transition-all duration-300">
        
        {/* Top Header Banner with Logo & Language Selector */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 bg-gradient-to-b from-sky-50/70 to-transparent">
          <div className="flex items-center justify-between gap-4 mb-4">
            
            {/* TripMate Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-600/30">
                <Compass className="w-7 h-7 animate-spin-slow" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  TripMate<span className="text-sky-600">.</span>
                </span>
                <p className="text-xs font-semibold text-sky-700 tracking-wide">
                  {t('brandTagline')}
                </p>
              </div>
            </div>

            {/* Language Selector Dropdown (5 Languages: EN, TE, HI, TA, KN) */}
            <div className="relative group">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs hover:border-sky-500 transition-colors">
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>{languages.find((l) => l.code === currentLang)?.native || 'English'}</span>
              </div>
              
              <select
                aria-label="Choose Language"
                value={currentLang}
                onChange={(e) => changeLanguage(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name} ({lang.native})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isSignUp ? t('createAccount') : t('welcomeBack')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isSignUp
              ? 'Join TripMate to craft custom itineraries, manage budgets and export trip PDFs.'
              : t('loginSubtitle')}
          </p>
        </div>

        <div className="p-6 sm:p-8 pt-5 space-y-5">
          {/* Requirement 2: Explicit Tabs for Login and Signup */}
          <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              id="tab-login"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                !isSignUp
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-sky-600" />
              <span>Login</span>
            </button>
            <button
              type="button"
              id="tab-signup"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                isSignUp
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-sky-600" />
              <span>Signup</span>
            </button>
          </div>

          {/* Requirement 2: 1-Click Continue as Guest & Demo Access */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/70 to-indigo-50 border border-sky-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Quick Access (No Password Needed)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-200/70 text-sky-800">
                Instant Access
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                id="btn-continue-as-guest"
                data-testid="btn-continue-as-guest"
                onClick={handleGuestEntry}
                disabled={loading}
                className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-1.5"
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Continue as Guest</span>
              </button>

              <button
                type="button"
                id="btn-demo-account"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-800 border border-slate-300 text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Demo Account</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Explore destinations, plan trips, and track budgets instantly!
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              {isSignUp ? 'Or Signup with Email' : 'Or Login with Email'}
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name for Signup */}
            {isSignUp && (
              <div className="animate-fade-in">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('fullNameLabel')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    id="input-fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Traveler"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 bg-slate-50/50"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('emailLabel')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  id="input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Password with Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  {t('passwordLabel')}
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    {t('forgotPassword')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  id="input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-auth-submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? t('signUpBtn') : t('signInBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center pt-2 text-xs text-slate-600">
            {isSignUp ? (
              <span>
                {t('alreadyAccount')}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-bold text-sky-600 hover:text-sky-700 underline underline-offset-2 ml-1"
                >
                  {t('login')}
                </button>
              </span>
            ) : (
              <span>
                Don't have a TripMate account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-bold text-sky-600 hover:text-sky-700 underline underline-offset-2 ml-1"
                >
                  {t('createAccount')}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Demo Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="max-w-sm w-full bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
            <h3 className="font-bold text-slate-900 text-base">Account Recovery & Demo Mode</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In this final-year demonstration build, you can instantly sign in using the <strong>1-Click Demo Login</strong> or <strong>Continue as Guest</strong> without needing a password.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div><strong>Default Demo Email:</strong> demo@tripmate.com</div>
              <div><strong>Default Demo Password:</strong> password123</div>
            </div>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Got it, close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
