const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  placeId: { type: String },
  name: { type: String, required: true },
  category: { type: String, default: 'Sightseeing' },
  time: { type: String, required: true }, // e.g. "09:00"
  timeOfDay: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'Night'], default: 'Morning' },
  durationMinutes: { type: Number, default: 120 },
  location: { type: String, default: '' },
  cost: { type: Number, default: 0 },
  costCategory: {
    type: String,
    enum: ['Transport', 'Hotel', 'Food', 'Activities', 'Shopping', 'Other'],
    default: 'Activities'
  },
  distance: { type: String, default: '1.5 km' },
  notes: { type: String, default: '' },
  reason: { type: String, default: '' }
}, { _id: false });

const dayPlanSchema = new mongoose.Schema({
  id: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  date: { type: String, required: true },
  notes: { type: String, default: '' },
  activities: [activitySchema]
}, { _id: false });

const tripSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest'
  },
  destinationId: {
    type: String,
    required: [true, 'Destination ID is required']
  },
  destinationName: {
    type: String,
    required: [true, 'Destination name is required']
  },
  country: {
    type: String,
    default: 'India'
  },
  isInternational: {
    type: Boolean,
    default: false
  },
  destinationType: {
    type: String,
    default: 'city'
  },
  startDate: {
    type: String,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: String,
    required: [true, 'End date is required']
  },
  numberOfDays: {
    type: Number,
    default: 3
  },
  daysCount: {
    type: Number,
    default: 3
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [1, 'Budget must be greater than 0']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  currencySymbol: {
    type: String,
    default: '₹'
  },
  travelers: {
    type: Number,
    required: [true, 'Travelers count is required'],
    min: [1, 'At least 1 traveler is required'],
    default: 1
  },
  interests: [{
    type: String
  }],
  fromLocation: {
    type: String,
    default: 'Current Location'
  },
  foodPreference: {
    type: String,
    default: 'No Preference'
  },
  travelStyle: {
    type: String,
    default: 'Balanced'
  },
  selectedHotel: {
    id: String,
    name: String,
    roomType: String,
    price: Number,
    rating: Number,
    location: String,
    image: String,
    safetyInfo: String
  },
  selectedFood: {
    id: String,
    name: String,
    category: String,
    dailyCost: Number,
    description: String
  },
  selectedTransport: {
    id: String,
    type: { type: String, default: 'Cab' },
    label: String,
    dailyRate: Number
  },
  coupon: {
    code: String,
    discount: Number,
    appliedAt: Date
  },
  booking: {
    bookingId: String,
    status: { type: String, default: 'Not Booked' },
    bookedAt: Date,
    totalAmount: Number,
    discount: Number,
    finalAmount: Number
  },
  notifications: [{
    id: String,
    title: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }],
  days: [dayPlanSchema],
  status: {
    type: String,
    enum: ['Draft', 'Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  },
  source: {
    type: String,
    enum: ['ai', 'rule-based'],
    default: 'rule-based'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
