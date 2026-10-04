import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { Compass, User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, demoLogin } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showError('Please fill all fields');
      return;
    }
    if (password.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      showSuccess('Registration complete! Welcome aboard.');
      navigate('/dashboard');
    } else {
      showError(res.message || 'Registration failed');
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await demoLogin();
    setLoading(false);
    showSuccess('Welcome to TripMind AI Demo account!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6 animate-slide-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-bg mx-auto flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create Your Account</h2>
          <p className="text-xs text-slate-500">
            Join TripMind AI for personalized itineraries and automated budget guidance.
          </p>
        </div>

        {/* 1-Click Demo Login Box */}
        <div className="p-3.5 rounded-2xl bg-primary-50/80 border border-primary-200 text-center space-y-2">
          <div className="text-xs font-semibold text-primary-900 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span>Fast Reviewer / Evaluator Access</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl gradient-bg text-white text-xs font-bold shadow-md shadow-primary-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            1-Click Instant Demo Login
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Or register</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password (min 6 characters)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
