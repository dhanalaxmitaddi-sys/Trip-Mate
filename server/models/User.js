const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  profilePhoto: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  preferences: {
    travelStyle: { type: String, default: 'Balanced' },
    foodPreference: { type: String, default: 'No Preference' },
    budgetPreference: { type: String, default: 'Medium' },
    interests: [{ type: String }]
  },
  savedPlaces: [{
    id: String,
    name: String,
    destinationId: String,
    category: String,
    rating: Number,
    price: Number,
    location: String,
    image: String,
    savedAt: { type: Date, default: Date.now }
  }],
  bookingHistory: [{
    bookingId: String,
    tripId: String,
    destinationName: String,
    dates: String,
    hotelName: String,
    totalAmount: Number,
    discount: Number,
    finalAmount: Number,
    currencySymbol: { type: String, default: '₹' },
    status: { type: String, default: 'Confirmed' },
    bookedAt: { type: Date, default: Date.now }
  }],
  notifications: [{
    id: String,
    title: String,
    message: String,
    type: { type: String, default: 'info' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

