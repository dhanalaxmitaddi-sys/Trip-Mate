import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import {
  Tag,
  Copy,
  Check,
  Sparkles,
  Percent,
  Clock,
  ArrowRight,
  Gift,
  Building,
  UtensilsCrossed,
  Plane,
  Ticket,
  ShieldCheck,
  Compass,
  AlertCircle
} from 'lucide-react';

import { COUPONS } from '../services/couponService';

const ICON_MAP = {
  'TRIPMATE200': Sparkles,
  'FIRSTTRIP350': Gift,
  'WEEKEND500': Compass,
  'YUMMY10': UtensilsCrossed,
  'EXPLORE1000': Plane,
  'STAYCOMFORT': Building,
  'TRAVELPASS': Plane,
  'ADVENTURE150': Ticket
};

const OFFERS_DATA = COUPONS.map(c => ({
  ...c,
  icon: ICON_MAP[c.code] || Sparkles
}));

export const Offers = () => {
  const { currentTrip, applyCoupon } = useTrip();
  const { addNotification } = useAuth();
  const { showSuccess, showError, showInfo } = useUI();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedCode, setCopiedCode] = useState('');

  const categories = [
    'All',
    'Hotel Offers',
    'Food Offers',
    'Travel Offers',
    'Activity Offers',
    'First Trip Special',
    'Weekend Special',
    'International Trip Special'
  ];

  const filteredOffers = OFFERS_DATA.filter(offer => {
    if (selectedCategory === 'All') return true;
    return offer.category === selectedCategory;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showSuccess(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const handleApplyToActiveTrip = async (offer) => {
    if (!currentTrip) {
      showInfo(`Coupon "${offer.code}" selected! Let's plan a trip to apply it.`);
      navigate(`/plan`);
      return;
    }

    if (currentTrip.coupon?.code === offer.code) {
      showError(`Coupon "${offer.code}" is already applied to this trip.`);
      return;
    }

    const res = await applyCoupon(offer);
    if (res.success) {
      showSuccess(res.message || 'Coupon applied successfully');
      if (addNotification) {
        addNotification({
          title: 'Special Coupon Applied 🎉',
          message: `Saved ${currentTrip.currencySymbol || '₹'}${offer.amount} on your ${currentTrip.destinationName} plan with coupon ${offer.code}.`,
          type: 'promo'
        });
      }
    } else {
      showError(res.message || 'Failed to apply coupon.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-sky-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Percent className="w-3.5 h-3.5" />
            <span>TripMate Rewards & Savings</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Exclusive Offers & Special Coupons
          </h1>

          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
            Apply verified discount promo codes directly to your active itinerary to instantly reduce hotel, food, and activity expenses.
          </p>

          {currentTrip && (
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-sky-200">
                Active Trip: <strong className="text-white">{currentTrip.destinationName}</strong> ({currentTrip.daysCount} Days)
              </span>
              {currentTrip.coupon ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold">
                  Applied: {currentTrip.coupon.code} (-{currentTrip.currencySymbol || '₹'}{currentTrip.coupon.discount})
                </span>
              ) : (
                <span className="text-xs text-amber-300 font-medium">
                  • No coupon applied yet
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]'
                : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => {
          const Icon = offer.icon;
          const isApplied = currentTrip?.coupon?.code === offer.code;

          return (
            <div
              key={offer.id}
              className={`rounded-3xl bg-white border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
                isApplied
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="p-6 space-y-4">
                
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        {offer.category}
                      </span>
                      <h3 className="text-base font-black text-slate-900 leading-snug">
                        {offer.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-black shrink-0 ${offer.badgeColor}`}>
                    {offer.discount}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {offer.description}
                </p>

                {/* Coupon Code Pill */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-dashed border-sky-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-sky-600" />
                    <span className="font-mono font-black text-sm text-sky-950 tracking-wider">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(offer.code)}
                    className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-sky-600 transition-colors flex items-center gap-1 text-xs font-bold"
                    title="Copy code"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Requirements & Validity */}
                <div className="space-y-1.5 pt-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Min. Trip Budget: ₹{offer.minBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{offer.validity}</span>
                  </div>
                </div>

              </div>

              {/* Action Button Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                {isApplied ? (
                  <button
                    type="button"
                    disabled
                    id={`btn-coupon-applied-${offer.code}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-md shadow-emerald-600/20 cursor-default flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Applied</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    id={`btn-apply-coupon-${offer.code}`}
                    onClick={() => handleApplyToActiveTrip(offer)}
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-black shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Coupon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Offers;
