import React, { useState, useEffect } from 'react';
import { useTrip } from '../context/TripContext';
import { useUI } from '../context/UIContext';
import { useLanguage } from '../context/LanguageContext';
import { COUPONS } from '../services/couponService';
import BudgetChart from '../components/BudgetChart';
import EmptyState from '../components/EmptyState';
import {
  Wallet,
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Edit3,
  Check,
  Building,
  Car,
  Utensils,
  Ticket,
  ShoppingBag,
  MoreHorizontal,
  Tag,
  Copy,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export const BudgetTracker = () => {
  const { trips, currentTrip, setCurrentTrip, loading, budgetStats, computeBudgetForTrip, updateTrip, applyCoupon, removeCoupon } = useTrip();
  const { addNotification } = useAuth();
  const { showSuccess, showError } = useUI();
  const { t } = useLanguage();

  const [customBudget, setCustomBudget] = useState(currentTrip ? currentTrip.budget : 35000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  // Synchronize customBudget when currentTrip changes
  useEffect(() => {
    if (currentTrip?.budget) {
      setCustomBudget(currentTrip.budget);
    }
  }, [currentTrip?.budget]);

  // If no trip is currently active, but user has trips, select the first one automatically
  useEffect(() => {
    if (!currentTrip && trips && trips.length > 0) {
      setCurrentTrip(trips[0]);
    }
  }, [currentTrip, trips, setCurrentTrip]);

  // Loading state guard while fetching trips
  if (loading && !currentTrip) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center space-y-4 animate-fade-in font-sans">
        <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Loading your trip budget details...</p>
      </div>
    );
  }

  if (!currentTrip) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
        <EmptyState
          icon={Wallet}
          title="No Active Trip Selected"
          description="Create or select a trip to track category expense allocations, remaining balances, and budget warnings."
          actionText="Plan a Trip"
          actionLink="/plan"
        />
      </div>
    );
  }

  // Calculate dynamic stats from Single Source of Truth
  const stats = budgetStats || (computeBudgetForTrip && computeBudgetForTrip(currentTrip)) || {
    totals: { Transport: 0, Hotel: 0, Food: 0, Activities: 0, Shopping: 0, Other: 0 },
    subtotal: 0,
    originalTotal: 0,
    discount: 0,
    finalAmount: 0,
    total: 0,
    remaining: 0,
    exceeded: false,
    percentUsed: 0
  };
  const totals = stats.totals || { Transport: 0, Hotel: 0, Food: 0, Activities: 0, Shopping: 0, Other: 0 };
  
  const effectiveTotal = stats.total || 0;
  const currentBudget = Number(currentTrip.budget) || 35000;
  const remaining = stats.remaining !== undefined ? stats.remaining : (currentBudget - effectiveTotal);
  const exceeded = Boolean(stats.exceeded);
  const overspendAmount = stats.overspendAmount || (remaining < 0 ? Math.abs(remaining) : 0);
  const percentUsed = stats.percentUsed !== undefined ? stats.percentUsed : Math.min(100, Math.round((effectiveTotal / (currentBudget || 1)) * 100));
  const rawTotal = stats.originalTotal || stats.subtotal || stats.total || 1;

  const currencySymbol = currentTrip.currencySymbol || '₹';

  const handleUpdateBudget = async (e) => {
    e.preventDefault();
    const newBudgetNum = Number(customBudget);
    if (isNaN(newBudgetNum) || newBudgetNum <= 0) {
      showError('Please enter a valid positive budget number');
      return;
    }
    
    currentTrip.budget = newBudgetNum;
    if (updateTrip) {
      await updateTrip(currentTrip._id || currentTrip.id, { budget: newBudgetNum });
    }
    setIsEditingBudget(false);
    showSuccess(`Budget updated to ${currencySymbol}${newBudgetNum.toLocaleString()}`);
    if (addNotification) {
      addNotification({
        title: 'Budget Ceiling Updated 💰',
        message: `Your planned target budget for ${currentTrip.destinationName} is now ${currencySymbol}${newBudgetNum.toLocaleString()}.`,
        type: 'info'
      });
    }
  };

  const handleApplyCoupon = async (offer) => {
    if (currentTrip?.coupon?.code === offer.code) {
      showError(`Coupon "${offer.code}" is already applied to this trip.`);
      return;
    }
    const res = await applyCoupon(offer);
    if (res?.success) {
      showSuccess(res.message || 'Coupon applied successfully');
      if (addNotification) {
        addNotification({
          title: 'Special Coupon Applied 🎉',
          message: `Saved ${currencySymbol}${res.discount} on your ${currentTrip.destinationName} plan with coupon ${offer.code}.`,
          type: 'promo'
        });
      }
    } else {
      showError(res.message || 'Failed to apply coupon.');
    }
  };

  const handleRemoveCoupon = async () => {
    if (!currentTrip?.coupon) return;
    const oldCode = currentTrip.coupon.code;
    await removeCoupon();
    showSuccess(`Removed coupon "${oldCode}".`);
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Transport': return <Car className="w-4 h-4 text-sky-600" />;
      case 'Hotel': return <Building className="w-4 h-4 text-indigo-600" />;
      case 'Food': return <Utensils className="w-4 h-4 text-emerald-600" />;
      case 'Activities': return <Ticket className="w-4 h-4 text-amber-600" />;
      case 'Shopping': return <ShoppingBag className="w-4 h-4 text-rose-600" />;
      default: return <MoreHorizontal className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>TripMate Real-Time Expense & Budget Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trip Expense & Budget Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Trip: <strong className="text-slate-800">{currentTrip.destinationName}</strong> ({currentTrip.startDate} to {currentTrip.endDate}) • {currentTrip.travelers || 1} Traveler(s)
          </p>
        </div>

        {/* Header Actions: Trip Switcher & Edit Target Budget */}
        <div className="flex flex-wrap items-center gap-2">
          {trips && trips.length > 1 && (
            <div className="relative">
              <select
                value={currentTrip._id || currentTrip.id || ''}
                onChange={(e) => {
                  const found = trips.find(t => (t._id || t.id) === e.target.value);
                  if (found) setCurrentTrip(found);
                }}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs focus:ring-2 focus:ring-sky-500/20 focus:outline-hidden"
                title="Switch Trip Context"
              >
                {trips.map(t => (
                  <option key={t._id || t.id} value={t._id || t.id}>
                    📍 {t.destinationName} ({t.startDate})
                  </option>
                ))}
              </select>
            </div>
          )}

          {isEditingBudget ? (
            <form onSubmit={handleUpdateBudget} className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-2.5 top-1.5 text-xs text-slate-400 font-bold">{currencySymbol}</span>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  className="w-32 pl-6 pr-2 py-1.5 rounded-xl border border-sky-500 text-xs font-bold focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="p-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition-colors shadow-xs"
                title="Save Budget"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditingBudget(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                title="Cancel"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setCustomBudget(currentTrip.budget);
                setIsEditingBudget(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-sky-600" />
              <span>Edit Total Budget</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary 4 Metric Tiles (Total Budget, Estimated Spending, Remaining Budget, Percentage Used) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between">
            <span>{t('totalBudget')}</span>
            <Wallet className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {currencySymbol}{currentBudget.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Target allocation</div>
        </div>

        {/* Estimated Spending */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between">
            <span>{t('spentBudget')}</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {currencySymbol}{(stats.finalAmount || stats.total).toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-600 font-bold">
            {stats.discount > 0 ? `Saved ${currencySymbol}${stats.discount} with coupon (${currentTrip.coupon?.code})` : 'All categories combined'}
          </div>
        </div>

        {/* Remaining Budget */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between">
            <span>{t('remainingBudget')}</span>
            <TrendingDown className={`w-4 h-4 ${remaining < 0 ? 'text-rose-600' : 'text-emerald-600'}`} />
          </div>
          <div className={`text-2xl font-black ${remaining < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {currencySymbol}{remaining.toLocaleString()}
          </div>
          <div className="text-[11px] font-medium text-slate-500">
            {remaining < 0 ? 'Budget deficit' : 'Surplus cash remaining'}
          </div>
        </div>

        {/* Percentage Used with Progress Bar */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between">
            <span>{t('usedPercentage')}</span>
            <Percent className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {percentUsed}%
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                exceeded ? 'bg-rose-500' : percentUsed > 80 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
        </div>
      </div>

      {/* OVER-BUDGET ALERT BANNER & SMART ALTERNATIVES (Requirement 18) */}
      {exceeded && (
        <div className="p-6 rounded-3xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-4 animate-slide-up shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-200/80 text-rose-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-700" />
            </div>
            <div>
              <h3 className="text-base font-black text-rose-900">
                ⚠️ {t('budgetOverWarning')}
              </h3>
              <p className="text-xs text-rose-800 mt-0.5">
                Your estimated trip cost exceeds your set target budget by <strong>{currencySymbol}{overspendAmount.toLocaleString()}</strong>.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-rose-200/80 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              {t('cheaperAlternativesTitle')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/80 border border-rose-200 space-y-1">
                <span className="font-bold text-slate-900">1. Cheaper Activities:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {t('cheaperAlt1')}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-rose-200 space-y-1">
                <span className="font-bold text-slate-900">2. Lower-Cost Stays:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {t('cheaperAlt3')}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-rose-200 space-y-1">
                <span className="font-bold text-slate-900">3. Shared Transport:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {t('cheaperAlt2')}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-rose-700 italic pt-1">
              Note: TripMate does not automatically delete your chosen activities. You remain in complete control.
            </p>
          </div>
        </div>
      )}

      {/* Main Budget Visualizer & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Category Cards (Hotel, Food, Transportation, Activities, Shopping, Other) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Category Expense Breakdown</h2>
            <span className="text-xs text-slate-500 font-medium">Auto-calculated from trip activities</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {totals && Object.entries(totals).map(([cat, val]) => {
              const catPercent = Math.round((val / (rawTotal || 1)) * 100);
              return (
                <div
                  key={cat}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                      {getCategoryIcon(cat)}
                    </div>
                    <div>
                      <div className="font-black text-xs text-slate-900">{cat}</div>
                      <div className="text-[11px] text-slate-400">{catPercent}% of total spend</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-slate-900">
                      {currencySymbol}{val.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Chart */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="font-black text-sm text-slate-900 mb-4">Expense Proportions & Budget Tracking</h3>
            <BudgetChart budgetStats={stats} totalBudget={currentBudget} totals={totals} budget={currentBudget} currencySymbol={currencySymbol} />
          </div>
        </div>

        {/* Right Col: Promo Coupons & Cost Savings (Requirement 26) */}
        <div className="space-y-6">
          {/* Trip Budget Recalculation Summary (Requirement 4) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Budget Recalculation Summary</h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                Single Source of Truth
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Original Subtotal:</span>
                <span className="font-bold text-slate-800">{currencySymbol}{(stats.originalTotal || (stats.subtotal + (stats.totals?.Other || 0)) || stats.total).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600">Coupon Discount:</span>
                {stats.discount > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600">-{currencySymbol}{stats.discount.toLocaleString()}</span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[10px] text-rose-600 hover:text-rose-800 underline font-semibold cursor-pointer"
                      title="Remove applied coupon"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <span className="text-slate-400 font-medium">None applied</span>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
                <span>Final Amount:</span>
                <span className="text-sky-600">{currencySymbol}{(stats.finalAmount || stats.total).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>Remaining Budget:</span>
                <span className={`font-bold ${remaining < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {currencySymbol}{remaining.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>Budget Percentage:</span>
                <span className="font-bold text-slate-800">{percentUsed}%</span>
              </div>
            </div>
          </div>

          {/* Promo Coupons */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500" />
                <h3 className="font-black text-sm text-slate-900">Promo Offers & Coupons</h3>
              </div>
              {currentTrip.coupon && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  {currentTrip.coupon.code} Active
                </span>
              )}
            </div>
            
            <p className="text-xs text-slate-500">
              Apply realistic discount coupons directly to recalculate your trip budget:
            </p>

            <div className="space-y-3">
              {COUPONS.map((offer) => {
                const isApplied = currentTrip?.coupon?.code === offer.code;
                return (
                  <div
                    key={offer.code}
                    className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                      isApplied
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-slate-900 tracking-wider">
                        {offer.code}
                      </span>
                      <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {offer.discount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{offer.description}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Min: ₹{offer.minBudget.toLocaleString()}</span>
                      {isApplied ? (
                        <button
                          type="button"
                          disabled
                          id={`btn-budget-applied-${offer.code}`}
                          className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-default flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id={`btn-budget-apply-${offer.code}`}
                          onClick={() => handleApplyCoupon(offer)}
                          className="px-3 py-1 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-xs cursor-pointer transition-all active:scale-95"
                        >
                          Apply Coupon
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BudgetTracker;
