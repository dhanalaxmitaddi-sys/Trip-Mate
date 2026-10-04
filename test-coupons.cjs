/**
 * Automated Verification Script for TripMate Offers / Coupons
 */
const assert = require('assert');
const { validateCoupon, COUPONS } = require('./server/services/couponService');
const plannerService = require('./server/services/plannerService');

console.log('=== RUNNING TRIPMATE COUPON SYSTEM TESTS ===\n');

// 1. Verify coupon catalog
console.log('1. Checking COUPONS catalog...');
const firstTripCoupon = COUPONS.find(c => c.code === 'FIRSTTRIP350');
const weekendCoupon = COUPONS.find(c => c.code === 'WEEKEND500');

assert(firstTripCoupon, 'FIRSTTRIP350 must exist in COUPONS');
assert.strictEqual(firstTripCoupon.amount, 350, 'FIRSTTRIP350 amount must be 350');
assert.strictEqual(firstTripCoupon.minBudget, 8000, 'FIRSTTRIP350 minBudget must be 8000');
assert.strictEqual(firstTripCoupon.firstTripOnly, true, 'FIRSTTRIP350 must be firstTripOnly');

assert(weekendCoupon, 'WEEKEND500 must exist in COUPONS');
assert.strictEqual(weekendCoupon.amount, 500, 'WEEKEND500 amount must be 500');
assert.strictEqual(weekendCoupon.minBudget, 12000, 'WEEKEND500 minBudget must be 12000');
assert.strictEqual(weekendCoupon.minDays, 3, 'WEEKEND500 minDays must be 3');
assert.strictEqual(weekendCoupon.maxDays, 5, 'WEEKEND500 maxDays must be 5');
console.log('✔ Coupon definitions verified.\n');

// 2. Test FIRSTTRIP350 validation
console.log('2. Testing FIRSTTRIP350 validation...');

// 2a. Under minimum budget (e.g. ₹5,000 < ₹8,000)
const tripLowBudget = {
  id: 'trip-test-1',
  budget: 5000,
  daysCount: 3,
  currencySymbol: '₹'
};
const resLowBudget = validateCoupon('FIRSTTRIP350', tripLowBudget, [tripLowBudget]);
assert.strictEqual(resLowBudget.valid, false, 'FIRSTTRIP350 must fail when budget < ₹8,000');
assert.strictEqual(resLowBudget.reason, 'Minimum trip budget is ₹8,000', `Expected "Minimum trip budget is ₹8,000", got "${resLowBudget.reason}"`);
console.log(`✔ Low budget rejected with exact message: "${resLowBudget.reason}"`);

// 2b. Valid budget (e.g. ₹10,000) on first trip
const tripValidBudget = {
  id: 'trip-test-1',
  budget: 10000,
  daysCount: 3,
  currencySymbol: '₹'
};
const resValidFirst = validateCoupon('FIRSTTRIP350', tripValidBudget, [tripValidBudget]);
assert.strictEqual(resValidFirst.valid, true, 'FIRSTTRIP350 must be valid on first trip with sufficient budget');
assert.strictEqual(resValidFirst.coupon.discount, 350, 'FIRSTTRIP350 discount must be 350');
console.log(`✔ FIRSTTRIP350 applied successfully: discount = ₹${resValidFirst.coupon.discount}`);

// 2c. Duplicate application prevention
const tripWithFirstCoupon = {
  ...tripValidBudget,
  coupon: resValidFirst.coupon
};
const resDuplicateFirst = validateCoupon('FIRSTTRIP350', tripWithFirstCoupon, [tripWithFirstCoupon]);
assert.strictEqual(resDuplicateFirst.valid, false, 'Cannot apply FIRSTTRIP350 twice');
assert.strictEqual(resDuplicateFirst.reason, 'Coupon "FIRSTTRIP350" is already applied to this trip.');
console.log(`✔ Duplicate application rejected: "${resDuplicateFirst.reason}"`);

// 2d. Not first trip (user already has a prior booked trip)
const tripSecond = {
  id: 'trip-test-2',
  budget: 15000,
  daysCount: 3,
  createdAt: '2026-10-02T15:00:00Z',
  currencySymbol: '₹'
};
const priorBookedTrip = {
  id: 'trip-test-1',
  budget: 10000,
  createdAt: '2026-10-01T10:00:00Z',
  status: 'Completed',
  booking: { status: 'Booked' }
};
const resNotFirst = validateCoupon('FIRSTTRIP350', tripSecond, [priorBookedTrip, tripSecond]);
assert.strictEqual(resNotFirst.valid, false, 'FIRSTTRIP350 must fail if user has prior trips');
assert.strictEqual(resNotFirst.reason, 'FIRSTTRIP350 is valid only for your first trip on TripMate.');
console.log(`✔ First-trip restriction enforced: "${resNotFirst.reason}"\n`);

// 3. Test WEEKEND500 validation
console.log('3. Testing WEEKEND500 validation...');

// 3a. Under minimum budget (e.g. ₹9,000 < ₹12,000)
const weekendTripLowBudget = {
  id: 'trip-test-3',
  budget: 9000,
  daysCount: 4,
  currencySymbol: '₹'
};
const resWeekendLow = validateCoupon('WEEKEND500', weekendTripLowBudget, [weekendTripLowBudget]);
assert.strictEqual(resWeekendLow.valid, false, 'WEEKEND500 must fail when budget < ₹12,000');
assert.strictEqual(resWeekendLow.reason, 'Minimum trip budget is ₹12,000', `Expected "Minimum trip budget is ₹12,000", got "${resWeekendLow.reason}"`);
console.log(`✔ Low budget rejected with exact message: "${resWeekendLow.reason}"`);

// 3b. Duration < 3 days (e.g. 2 days)
const weekendTripShort = {
  id: 'trip-test-4',
  budget: 15000,
  daysCount: 2,
  currencySymbol: '₹'
};
const resWeekendShort = validateCoupon('WEEKEND500', weekendTripShort, [weekendTripShort]);
assert.strictEqual(resWeekendShort.valid, false, 'WEEKEND500 must fail when days < 3');
assert(resWeekendShort.reason.includes('minimum trip duration of 3 days'), 'Must report min 3 days constraint');
console.log(`✔ Short duration rejected: "${resWeekendShort.reason}"`);

// 3c. Duration > 5 days (e.g. 7 days)
const weekendTripLong = {
  id: 'trip-test-5',
  budget: 20000,
  daysCount: 7,
  currencySymbol: '₹'
};
const resWeekendLong = validateCoupon('WEEKEND500', weekendTripLong, [weekendTripLong]);
assert.strictEqual(resWeekendLong.valid, false, 'WEEKEND500 must fail when days > 5');
assert(resWeekendLong.reason.includes('trips up to 5 days'), 'Must report max 5 days constraint');
console.log(`✔ Long duration rejected: "${resWeekendLong.reason}"`);

// 3d. Valid weekend getaway (4 days, ₹15,000 budget)
const weekendTripValid = {
  id: 'trip-test-6',
  budget: 15000,
  daysCount: 4,
  currencySymbol: '₹'
};
const resWeekendValid = validateCoupon('WEEKEND500', weekendTripValid, [weekendTripValid]);
assert.strictEqual(resWeekendValid.valid, true, 'WEEKEND500 must succeed for 4 days, ₹15,000 budget');
assert.strictEqual(resWeekendValid.coupon.discount, 500, 'WEEKEND500 discount must be 500');
console.log(`✔ WEEKEND500 applied successfully: discount = ₹${resWeekendValid.coupon.discount}`);

// 3e. Duplicate application
const weekendTripWithCoupon = {
  ...weekendTripValid,
  coupon: resWeekendValid.coupon
};
const resWeekendDup = validateCoupon('WEEKEND500', weekendTripWithCoupon, [weekendTripWithCoupon]);
assert.strictEqual(resWeekendDup.valid, false, 'Cannot apply WEEKEND500 twice');
assert.strictEqual(resWeekendDup.reason, 'Coupon "WEEKEND500" is already applied to this trip.');
console.log(`✔ Duplicate application rejected: "${resWeekendDup.reason}"\n`);

// 4. Test Recalculation math
console.log('4. Testing Budget Recalculations...');
const sampleTrip = {
  id: 'trip-recalc',
  destinationId: 'hyderabad',
  destinationName: 'Hyderabad',
  budget: 25000,
  startDate: '2026-10-10',
  endDate: '2026-10-13',
  daysCount: 4,
  travelers: 2,
  currencySymbol: '₹',
  selectedHotel: { price: 3000 },
  selectedFood: { dailyCost: 800 },
  selectedTransport: { dailyRate: 1000 },
  coupon: {
    code: 'WEEKEND500',
    discount: 500
  },
  days: [
    { dayNumber: 1, activities: [{ cost: 200, costCategory: 'Activities' }] },
    { dayNumber: 2, activities: [{ cost: 300, costCategory: 'Activities' }] }
  ]
};

const stats = plannerService.computeBudget(sampleTrip);
console.log('Calculated Stats:', {
  subtotal: stats.subtotal,
  originalTotal: stats.originalTotal,
  discount: stats.discount,
  finalAmount: stats.finalAmount,
  remaining: stats.remaining,
  percentUsed: stats.percentUsed
});

assert(stats.originalTotal > 0, 'Original total must be calculated');
assert.strictEqual(stats.discount, 500, 'Discount must match coupon');
assert.strictEqual(stats.finalAmount, stats.originalTotal - 500, 'finalAmount must equal originalTotal - discount');
assert.strictEqual(stats.total, stats.finalAmount, 'total must equal finalAmount');
assert.strictEqual(stats.remaining, 25000 - stats.finalAmount, 'remaining must equal totalBudget - finalAmount');
assert.strictEqual(stats.percentUsed, Math.min(100, Math.round((stats.finalAmount / 25000) * 100)), 'percentUsed must be correct percentage');

console.log('✔ All 5 required recalculations verified successfully.\n');

console.log('=== ALL AUTOMATED TESTS PASSED SUCCESSFULLY! 🎉 ===');
