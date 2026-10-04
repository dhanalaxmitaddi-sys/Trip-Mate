const express = require('express');
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  generateMultiplePlans,
  updateTrip,
  deleteTrip,
  duplicateTrip,
  regenerateDay,
  generateTripItinerary,
  updateActivity,
  deleteActivity,
  completeTrip,
  bookTrip,
  applyCoupon,
  getTripWeather,
  getTripPlaces,
  getDynamicLocations,
  getPlaneTrip,
  enhanceDayWithHuggingFace
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllTrips);
router.post('/', protect, createTrip);
router.post('/generate-trip', protect, createTrip);
router.post('/generate', protect, createTrip);
router.post('/generate-itinerary', protect, createTrip);
router.post('/generate-plans', protect, generateMultiplePlans);
router.post('/dynamic-locations', protect, getDynamicLocations);
router.post('/plane-trip', protect, getPlaneTrip);
router.get('/:id', protect, getTripById);
router.put('/:id', protect, updateTrip);
router.delete('/:id', protect, deleteTrip);
router.post('/:id/duplicate', protect, duplicateTrip);
router.post('/:id/complete', protect, completeTrip);
router.post('/:id/book', protect, bookTrip);
router.post('/:id/apply-coupon', protect, applyCoupon);
router.post('/:id/regenerate-day', protect, regenerateDay);
router.post('/:id/huggingface-day', protect, enhanceDayWithHuggingFace);
router.post('/:id/regenerate', protect, generateTripItinerary);
router.post('/:id/generate', protect, generateTripItinerary);
router.post('/:id/generate-itinerary', protect, generateTripItinerary);
router.put('/:id/activities/:activityId', protect, updateActivity);
router.delete('/:id/activities/:activityId', protect, deleteActivity);
router.get('/:id/weather', protect, getTripWeather);
router.get('/:id/places', protect, getTripPlaces);

module.exports = router;

