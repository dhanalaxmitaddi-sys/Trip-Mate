/**
 * TripMate Coupon & Promo Service
 * Single source of truth for Coupon definitions, validation, and discount calculations
 */

export const COUPONS = [
  {
    id: 'offer-1',
    code: 'TRIPMATE200',
    title: 'TripMate All-Rounder Special',
    discount: '₹200 OFF',
    amount: 200,
    category: 'Special Offer',
    description: 'Instant ₹200 savings applicable on any curated travel itinerary.',
    validity: 'Valid until Dec 31, 2026',
    expiryDate: '2026-12-31',
    minBudget: 5000,
    badgeColor: 'bg-sky-500 text-white'
  },
  {
    id: 'offer-2',
    code: 'FIRSTTRIP350',
    title: 'Welcome New Adventurer',
    discount: '₹350 OFF',
    amount: 350,
    category: 'First Trip Special',
    description: 'Exclusive welcome voucher for planning your first smart journey on TripMate.',
    validity: 'Valid for new planners (1st trip only)',
    expiryDate: '2026-12-31',
    minBudget: 8000,
    firstTripOnly: true,
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'offer-3',
    code: 'WEEKEND500',
    title: 'Weekend Escape Discount',
    discount: '₹500 OFF',
    amount: 500,
    category: 'Weekend Special',
    description: 'Flat ₹500 instant discount on 3-day and 5-day quick weekend getaways.',
    validity: 'Valid on 3 to 5 day trips',
    expiryDate: '2026-12-31',
    minBudget: 12000,
    minDays: 3,
    maxDays: 5,
    badgeColor: 'bg-indigo-600 text-white'
  },
  {
    id: 'offer-4',
    code: 'YUMMY10',
    title: 'Gastronomy & Dining Feast',
    discount: '₹500 Food Credit',
    amount: 500,
    category: 'Food Offers',
    description: 'Save on regional food trails, street food night markets & seaside cafes.',
    validity: 'Valid across all foodie spots',
    expiryDate: '2026-12-31',
    minBudget: 10000,
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'offer-5',
    code: 'EXPLORE1000',
    title: 'International Voyager Deal',
    discount: '₹1,000 OFF',
    amount: 1000,
    category: 'International Trip Special',
    description: 'Premium international flight & hotel package discount for overseas journeys.',
    validity: 'Valid on all international itineraries',
    expiryDate: '2026-12-31',
    minBudget: 25000,
    internationalOnly: true,
    badgeColor: 'bg-purple-600 text-white'
  },
  {
    id: 'offer-6',
    code: 'STAYCOMFORT',
    title: 'Luxury & Resort Stay Perks',
    discount: '₹750 OFF',
    amount: 750,
    category: 'Hotel Offers',
    description: 'Complimentary stay discount on 4-star and 5-star verified hotels and heritage stays.',
    validity: 'Valid on stays with budget above ₹18,000',
    expiryDate: '2026-12-31',
    minBudget: 18000,
    badgeColor: 'bg-sky-600 text-white'
  },
  {
    id: 'offer-7',
    code: 'TRAVELPASS',
    title: 'Chauffeur & Transit Travel Pass',
    discount: '₹400 OFF',
    amount: 400,
    category: 'Travel Offers',
    description: 'Flat ₹400 instant savings on private AC cabs, chauffeurs, and city transfers.',
    validity: 'Valid on all travel styles',
    expiryDate: '2026-12-31',
    minBudget: 10000,
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'offer-8',
    code: 'ADVENTURE150',
    title: 'Thrills & Activity Super Pass',
    discount: '₹300 OFF',
    amount: 300,
    category: 'Activity Offers',
    description: 'Instant discount on scuba diving, trekking, watersports, and landmark passes.',
    validity: 'Valid across adventure & sightseeing spots',
    expiryDate: '2026-12-31',
    minBudget: 8000,
    badgeColor: 'bg-rose-600 text-white'
  }
];

/**
 * Validate a coupon against the current Trip object and user trip history
 * @param {Object|string} couponInput Coupon object or code string
 * @param {Object} trip Current Trip object (Single Source of Truth)
 * @param {Array} allUserTrips All trips owned by current user
 * @returns {Object} { valid: boolean, reason?: string, coupon?: Object }
 */
export function validateCoupon(couponInput, trip, allUserTrips = []) {
  if (!trip) {
    return {
      valid: false,
      reason: 'No active trip found. Please create or select a trip first.'
    };
  }

  const rawCode = (typeof couponInput === 'string' ? couponInput : couponInput?.code || '').trim().toUpperCase();
  const foundDef = COUPONS.find(c => c.code.toUpperCase() === rawCode);
  const coupon = foundDef || (typeof couponInput === 'object' ? couponInput : null);

  if (!coupon || !coupon.code) {
    return {
      valid: false,
      reason: `Coupon code "${rawCode || 'Unknown'}" is not valid.`
    };
  }

  const code = coupon.code.toUpperCase();
  const currencySymbol = trip.currencySymbol || '₹';

  // 1. Prevent the same coupon from being applied twice
  if (trip.coupon && trip.coupon.code && trip.coupon.code.toUpperCase() === code) {
    return {
      valid: false,
      reason: `Coupon "${code}" is already applied to this trip.`
    };
  }

  // 2. Minimum budget validation
  const tripBudget = Number(trip.budget) || 0;
  const minBudget = Number(coupon.minBudget) || 0;
  if (minBudget > 0 && tripBudget < minBudget) {
    return {
      valid: false,
      reason: `Minimum trip budget is ${currencySymbol}${minBudget.toLocaleString('en-IN')}`
    };
  }

  // 3. Trip duration validation
  const days = Number(trip.daysCount) || (trip.days && trip.days.length) || 1;
  if (coupon.minDays && days < coupon.minDays) {
    return {
      valid: false,
      reason: `${code} requires a minimum trip duration of ${coupon.minDays} days (Your trip is ${days} days).`
    };
  }
  if (coupon.maxDays && days > coupon.maxDays) {
    return {
      valid: false,
      reason: `${code} is valid only for trips up to ${coupon.maxDays} days (Your trip is ${days} days).`
    };
  }

  // 4. First-trip eligibility validation
  if (coupon.firstTripOnly) {
    const currentTripId = trip._id || trip.id;
    const sorted = [...(allUserTrips || [])].sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return timeA - timeB;
    });
    const isFirstTrip = sorted.length <= 1 || (sorted[0] && (sorted[0]._id === currentTripId || sorted[0].id === currentTripId));
    const hasPriorBookings = (allUserTrips || []).some(t => 
      (t._id || t.id) !== currentTripId && (t.status === 'Completed' || t.booking?.status === 'Booked')
    );

    if (!isFirstTrip && hasPriorBookings) {
      return {
        valid: false,
        reason: `${code} is valid only for your first trip on TripMate.`
      };
    }
  }

  // 5. Expiry status
  if (coupon.expiryDate) {
    const expDate = new Date(coupon.expiryDate);
    if (!isNaN(expDate.getTime()) && expDate < new Date()) {
      return {
        valid: false,
        reason: `Coupon "${code}" has expired on ${coupon.expiryDate}.`
      };
    }
  }

  // 6. Expiry & Used status
  if (coupon.used || (trip.coupon && trip.coupon.code?.toUpperCase() === code && trip.coupon.used)) {
    return {
      valid: false,
      reason: `Coupon "${code}" has already been used.`
    };
  }

  if (coupon.oneTimeUse && allUserTrips && Array.isArray(allUserTrips)) {
    const currentTripId = trip._id || trip.id;
    const alreadyUsed = allUserTrips.some(t =>
      (t._id || t.id) !== currentTripId &&
      t.coupon?.code?.toUpperCase() === code &&
      (t.booking?.status === 'Booked' || t.status === 'Completed')
    );
    if (alreadyUsed) {
      return {
        valid: false,
        reason: `Coupon "${code}" has already been redeemed on another booked trip.`
      };
    }
  }

  // 7. International eligibility if required
  if (coupon.internationalOnly && !trip.isInternational) {
    return {
      valid: false,
      reason: `${code} is valid only for international destinations.`
    };
  }

  const discountAmount = Number(coupon.amount) || Number(coupon.discount) || 200;

  return {
    valid: true,
    coupon: {
      code,
      discount: discountAmount,
      amount: discountAmount,
      title: coupon.title || code,
      description: coupon.description || '',
      category: coupon.category || 'Special Offer',
      appliedAt: new Date().toISOString()
    }
  };
}

export default {
  COUPONS,
  validateCoupon
};
