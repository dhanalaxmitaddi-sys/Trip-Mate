const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  getPlaces
} = require('../controllers/destinationController');

router.get('/', getDestinations);
router.get('/:id', getDestinationById);
router.get('/:id/places', getPlaces);

module.exports = router;
