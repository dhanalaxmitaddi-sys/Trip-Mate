const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, default: 0 },
  location: { type: String, default: '' },
  description: { type: String, default: '' },
  tags: [String],
  image: { type: String, default: '' },
  openingHours: { type: String, default: '' },
  bestTimeToVisit: { type: String, default: '' }
}, { _id: false });

const weatherMonthSchema = new mongoose.Schema({
  month: Number,
  tempC: Number,
  condition: String,
  humidity: Number,
  icon: String,
  suggestion: String
}, { _id: false });

const destinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  state: String,
  tagline: String,
  description: String,
  coverImage: String,
  hotelRate: Number,
  foodRate: Number,
  transportRate: Number,
  weather: [weatherMonthSchema],
  packingRules: [String],
  places: [placeSchema]
});

module.exports = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
