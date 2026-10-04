const Packing = require('../models/Packing');
const Trip = require('../models/Trip');
const { isUsingMemoryStore } = require('../config/db');
const { memoryPacking, memoryTrips, destinations } = require('../config/memoryStore');
const plannerService = require('../services/plannerService');

// @desc    Get packing items for a trip (FR8)
// @route   GET /api/packing/:tripId
exports.getPackingByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    if (isUsingMemoryStore()) {
      let items = memoryPacking[tripId];
      if (!items) {
        // If not found, generate from trip
        const trip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
        if (trip) {
          items = plannerService.generatePackingList(trip);
          memoryPacking[tripId] = items;
        } else {
          items = [];
        }
      }
      return res.json({ success: true, count: items.length, data: items });
    }

    let packing = await Packing.findOne({ tripId });
    if (!packing) {
      const trip = await Trip.findById(tripId);
      if (trip) {
        const generated = plannerService.generatePackingList(trip);
        packing = await Packing.create({
          tripId,
          userId: req.user ? req.user.id : 'guest',
          items: generated
        });
      }
    }

    return res.json({
      success: true,
      count: packing ? packing.items.length : 0,
      data: packing ? packing.items : []
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle packing item checked state
// @route   PATCH /api/packing/:tripId/toggle/:itemId
exports.togglePackingItem = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;

    if (isUsingMemoryStore()) {
      const items = memoryPacking[tripId] || [];
      const item = items.find(i => i.id === itemId);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      item.checked = !item.checked;
      return res.json({ success: true, data: item });
    }

    const packing = await Packing.findOne({ tripId });
    if (!packing) {
      return res.status(404).json({ success: false, message: 'Packing list not found' });
    }

    const item = packing.items.find(i => i.id === itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.checked = !item.checked;
    await packing.save();

    return res.json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add custom packing item
// @route   POST /api/packing/:tripId
exports.addPackingItem = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { group, label } = req.body;

    if (!group || !label) {
      return res.status(400).json({ success: false, message: 'Group and label are required' });
    }

    const newItem = {
      id: 'pack-' + Date.now().toString(36),
      group,
      label,
      checked: false
    };

    if (isUsingMemoryStore()) {
      if (!memoryPacking[tripId]) memoryPacking[tripId] = [];
      memoryPacking[tripId].push(newItem);
      return res.status(201).json({ success: true, data: newItem });
    }

    let packing = await Packing.findOne({ tripId });
    if (!packing) {
      packing = new Packing({ tripId, items: [] });
    }
    packing.items.push(newItem);
    await packing.save();

    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete packing item
// @route   DELETE /api/packing/:tripId/:itemId
exports.deletePackingItem = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;

    if (isUsingMemoryStore()) {
      const items = memoryPacking[tripId] || [];
      const idx = items.findIndex(i => i.id === itemId);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      items.splice(idx, 1);
      return res.json({ success: true, message: 'Item deleted' });
    }

    const packing = await Packing.findOne({ tripId });
    if (!packing) {
      return res.status(404).json({ success: false, message: 'Packing list not found' });
    }

    packing.items = packing.items.filter(i => i.id !== itemId);
    await packing.save();

    return res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
