const express = require('express');
const router = express.Router();
const {
  getPackingByTrip,
  togglePackingItem,
  addPackingItem,
  deletePackingItem
} = require('../controllers/packingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:tripId', protect, getPackingByTrip);
router.post('/:tripId', protect, addPackingItem);
router.patch('/:tripId/toggle/:itemId', protect, togglePackingItem);
router.delete('/:tripId/:itemId', protect, deletePackingItem);

module.exports = router;
