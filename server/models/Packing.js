const mongoose = require('mongoose');

const packingItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  group: {
    type: String,
    enum: [
      'Clothing',
      'Toiletries',
      'Documents',
      'Electronics',
      'Health and safety',
      'Activity essentials'
    ],
    required: true
  },
  label: { type: String, required: true },
  checked: { type: Boolean, default: false }
}, { _id: false });

const packingSchema = new mongoose.Schema({
  tripId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    default: 'guest'
  },
  items: [packingItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Packing || mongoose.model('Packing', packingSchema);
