const Trip = require('../models/Trip');
const Packing = require('../models/Packing');
const { isUsingMemoryStore } = require('../config/db');
const { memoryTrips, memoryPacking, memoryUsers, destinations } = require('../config/memoryStore');
const { getOrGenerateDestination } = require('../services/destinationService');
const plannerService = require('../services/plannerService');
const { validateCoupon } = require('../services/couponService');

// @desc    Get all trips
// @route   GET /api/trips
exports.getAllTrips = async (req, res) => {
  try {
    const userId = req.user ? (req.user.id || req.user._id) : 'guest';

    if (isUsingMemoryStore()) {
      // User A must not see User B's trips (Requirement 2 & 31)
      const userTrips = memoryTrips.filter(t => t.userId === userId || (!t.userId && userId === 'demo-user-101'));
      const trips = userTrips.map(trip => {
        const dest = destinations.find(d => d.id === trip.destinationId) || destinations[0];
        const budgetStats = plannerService.computeBudget(trip, dest);
        return {
          ...trip,
          budgetStats
        };
      });
      return res.json({ success: true, count: trips.length, data: trips });
    }

    // MongoDB flow: strictly isolate to logged-in user
    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
    const formattedTrips = trips.map(t => {
      const tripObj = t.toObject();
      const dest = destinations.find(d => d.id === tripObj.destinationId) || destinations[0];
      const budgetStats = plannerService.computeBudget(tripObj, dest);
      return { ...tripObj, budgetStats };
    });

    return res.json({ success: true, count: formattedTrips.length, data: formattedTrips });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single trip by ID
// @route   GET /api/trips/:id
exports.getTripById = async (req, res) => {
  try {
    const tripId = req.params.id;

    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => (t._id === tripId || t.id === tripId));
    } else {
      trip = await Trip.findById(tripId);
      if (trip) trip = trip.toObject();
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    const dest = destinations.find(d => d.id === trip.destinationId) || destinations[0];
    const budgetStats = plannerService.computeBudget(trip, dest);

    return res.json({
      success: true,
      data: {
        ...trip,
        destination: dest,
        budgetStats
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create / Generate new trip
// @route   POST /api/trips
exports.createTrip = async (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
      startDate,
      endDate,
      numberOfDays,
      daysCount,
      budget,
      currency = 'INR',
      currencySymbol = '₹',
      travelers = 1,
      interests = ['Nature', 'Food'],
      foodPreference = 'No Preference',
      travelStyle = 'Balanced',
      fromLocation = 'Current Location',
      selectedHotel,
      selectedFood,
      selectedTransport,
      planTheme = 'balanced'
    } = req.body;

    const queryTarget = destinationId || destinationName || 'goa';
    const dest = await getOrGenerateDestination(queryTarget);

    const targetDays = Number(numberOfDays) > 0
      ? Number(numberOfDays)
      : Number(daysCount) > 0
        ? Number(daysCount)
        : (Array.isArray(req.body.days) && req.body.days.length > 0)
          ? req.body.days.length
          : (startDate && endDate)
            ? plannerService.countDays(startDate, endDate)
            : 3;
    const numDays = Math.max(1, Math.min(14, targetDays));

    const todayStr = new Date().toISOString().split('T')[0];
    const safeStartDate = startDate ? String(startDate).split('T')[0] : todayStr;
    const calculatedEndDate = endDate ? String(endDate).split('T')[0] : plannerService.addDays(safeStartDate, numDays - 1);

    const numBudget = Number(budget) > 0 ? Number(budget) : 35000;
    const numTravelers = Number(travelers) > 0 ? Number(travelers) : 1;

    // If pre-generated plan days exist and match the requested days count, preserve them with sequential dates
    let generatedTripData;
    if (Array.isArray(req.body.days) && req.body.days.length === numDays) {
      const sequentialDays = req.body.days.map((d, idx) => ({
        ...d,
        dayNumber: idx + 1,
        date: plannerService.addDays(safeStartDate, idx)
      }));
      generatedTripData = {
        ...req.body,
        destinationId: dest.id,
        destinationName: dest.name,
        country: dest.country || 'Global Destination',
        isInternational: !!dest.isInternational,
        destinationType: dest.type,
        fromLocation: fromLocation || 'Current Location',
        startDate: safeStartDate,
        endDate: calculatedEndDate,
        numberOfDays: numDays,
        daysCount: numDays,
        budget: numBudget,
        currency: currency || dest.currency || 'INR',
        currencySymbol: currencySymbol || dest.currencySymbol || '₹',
        travelers: numTravelers,
        interests: Array.isArray(interests) && interests.length > 0 ? interests : ['Nature', 'Food'],
        foodPreference,
        travelStyle,
        days: sequentialDays,
        status: 'Upcoming'
      };
    } else {
      generatedTripData = plannerService.generateTripItinerary({
        destinationId: dest.id,
        destinationName: dest.name,
        startDate: safeStartDate,
        endDate: calculatedEndDate,
        numberOfDays: numDays,
        daysCount: numDays,
        budget: numBudget,
        currency: currency || dest.currency || 'INR',
        currencySymbol: currencySymbol || dest.currencySymbol || '₹',
        travelers: numTravelers,
        interests: Array.isArray(interests) && interests.length > 0 ? interests : ['Nature', 'Food'],
        foodPreference,
        travelStyle,
        fromLocation,
        selectedHotel,
        selectedFood,
        selectedTransport
      }, dest, planTheme);
    }

    const tripId = 'trip-' + Date.now();
    const newTrip = {
      _id: tripId,
      id: tripId,
      userId: req.user ? (req.user.id || req.user._id) : 'guest',
      ...generatedTripData,
      numberOfDays: numDays,
      daysCount: numDays,
      startDate: safeStartDate,
      endDate: calculatedEndDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Temporary console logs required by prompt
    console.log('selected numberOfDays:', numDays);
    console.log('generated itinerary length:', newTrip.days.length);
    console.log('generated day numbers:', newTrip.days.map(d => d.dayNumber));

    // Generate matching packing list
    const packingItems = plannerService.generatePackingList(newTrip, dest);
    const budgetStats = plannerService.computeBudget(newTrip, dest);
    newTrip.budgetStats = budgetStats;

    if (isUsingMemoryStore()) {
      memoryTrips.unshift(newTrip);
      memoryPacking[newTrip._id] = packingItems;
    } else {
      try {
        const dbTrip = await Trip.create({
          ...newTrip,
          _id: undefined
        });
        newTrip._id = dbTrip._id.toString();
        newTrip.id = dbTrip._id.toString();

        await Packing.create({
          tripId: newTrip._id,
          userId: newTrip.userId,
          items: packingItems
        });
      } catch (dbErr) {
        console.warn('DB save warning, saving in memory fallback:', dbErr.message);
        memoryTrips.unshift(newTrip);
        memoryPacking[newTrip._id] = packingItems;
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Trip itinerary generated successfully',
      data: {
        ...newTrip,
        destination: dest,
        budgetStats,
        packingItems
      },
      trip: {
        ...newTrip,
        destination: dest,
        budgetStats,
        packingItems
      },
      days: newTrip.days,
      itinerary: newTrip.days,
      numberOfDays: numDays
    });
  } catch (error) {
    console.error('Create trip error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update trip activities / dates / budget
// @route   PUT /api/trips/:id
exports.updateTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const updateData = req.body;

    let targetTrip;
    if (isUsingMemoryStore()) {
      targetTrip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
    } else {
      targetTrip = await Trip.findById(tripId);
      if (targetTrip) targetTrip = targetTrip.toObject();
    }

    if (!targetTrip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    // If daysCount or numberOfDays is provided or itinerary regeneration is requested, regenerate days to match exactly
    const requestedDaysCount = Number(updateData.numberOfDays || updateData.daysCount);
    const shouldRegenerateDays = (requestedDaysCount > 0 && requestedDaysCount !== (targetTrip.days?.length || 0)) || updateData.regenerateItinerary;

    let regeneratedFields = {};
    if (shouldRegenerateDays && !updateData.days) {
      const numDays = Math.max(1, Math.min(14, requestedDaysCount || targetTrip.numberOfDays || targetTrip.daysCount || 3));
      const startDate = updateData.startDate || targetTrip.startDate;
      const calculatedEndDate = plannerService.addDays(startDate, numDays - 1);
      const destForTrip = await getOrGenerateDestination(targetTrip.destinationId || targetTrip.destinationName);

      const generated = plannerService.generateTripItinerary({
        ...targetTrip,
        ...updateData,
        startDate,
        endDate: calculatedEndDate,
        numberOfDays: numDays,
        daysCount: numDays
      }, destForTrip, updateData.planTheme || targetTrip.planTheme || 'balanced');

      regeneratedFields = {
        days: generated.days,
        numberOfDays: numDays,
        daysCount: numDays,
        endDate: calculatedEndDate
      };

      // Also update packing list
      const packingItems = plannerService.generatePackingList({
        ...targetTrip,
        ...updateData,
        ...regeneratedFields
      }, destForTrip);

      if (isUsingMemoryStore()) {
        memoryPacking[tripId] = packingItems;
      } else {
        await Packing.findOneAndUpdate(
          { tripId },
          { items: packingItems, userId: targetTrip.userId },
          { upsert: true }
        );
      }
    }

    const mergedUpdate = {
      ...updateData,
      ...regeneratedFields,
      updatedAt: new Date().toISOString()
    };

    let updatedTrip;
    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      memoryTrips[idx] = {
        ...memoryTrips[idx],
        ...mergedUpdate
      };
      updatedTrip = memoryTrips[idx];
    } else {
      updatedTrip = await Trip.findByIdAndUpdate(
        tripId,
        { ...mergedUpdate, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      updatedTrip = updatedTrip.toObject();
    }

    const dest = destinations.find(d => d.id === updatedTrip.destinationId) || await getOrGenerateDestination(updatedTrip.destinationId || updatedTrip.destinationName);
    const budgetStats = plannerService.computeBudget(updatedTrip, dest);

    return res.json({
      success: true,
      message: 'Trip updated successfully',
      data: {
        ...updatedTrip,
        budgetStats
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update specific activity in trip
// @route   PUT /api/trips/:id/activities/:activityId
exports.updateActivity = async (req, res) => {
  try {
    const { id: tripId, activityId } = req.params;
    const activityUpdate = req.body;

    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
    } else {
      trip = await Trip.findById(tripId);
      if (trip) trip = trip.toObject();
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    let found = false;
    for (const day of trip.days) {
      const actIdx = day.activities.findIndex(a => a.id === activityId);
      if (actIdx !== -1) {
        day.activities[actIdx] = { ...day.activities[actIdx], ...activityUpdate };
        found = true;
        break;
      }
    }

    if (!found) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      memoryTrips[idx] = trip;
    } else {
      await Trip.findByIdAndUpdate(tripId, { days: trip.days });
    }

    const dest = destinations.find(d => d.id === trip.destinationId);
    const budgetStats = plannerService.computeBudget(trip, dest);

    return res.json({
      success: true,
      message: 'Activity updated successfully',
      data: { trip, budgetStats }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete specific activity in trip
// @route   DELETE /api/trips/:id/activities/:activityId
exports.deleteActivity = async (req, res) => {
  try {
    const { id: tripId, activityId } = req.params;

    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
    } else {
      trip = await Trip.findById(tripId);
      if (trip) trip = trip.toObject();
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    let found = false;
    for (const day of trip.days) {
      const actIdx = day.activities.findIndex(a => a.id === activityId);
      if (actIdx !== -1) {
        day.activities.splice(actIdx, 1);
        found = true;
        break;
      }
    }

    if (!found) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      memoryTrips[idx] = trip;
    } else {
      await Trip.findByIdAndUpdate(tripId, { days: trip.days });
    }

    const dest = destinations.find(d => d.id === trip.destinationId);
    const budgetStats = plannerService.computeBudget(trip, dest);

    return res.json({
      success: true,
      message: 'Activity deleted successfully',
      data: { trip, budgetStats }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Complete Trip status
// @route   POST /api/trips/:id/complete
exports.completeTrip = async (req, res) => {
  try {
    const tripId = req.params.id;

    let trip;
    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Trip not found' });
      memoryTrips[idx].status = 'Completed';
      trip = memoryTrips[idx];
    } else {
      trip = await Trip.findByIdAndUpdate(tripId, { status: 'Completed' }, { new: true });
      if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    return res.json({ success: true, message: 'Trip marked as completed', data: trip });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Duplicate Trip
// @route   POST /api/trips/:id/duplicate
exports.duplicateTrip = async (req, res) => {
  try {
    const tripId = req.params.id;

    let originalTrip;
    if (isUsingMemoryStore()) {
      originalTrip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
    } else {
      originalTrip = await Trip.findById(tripId);
      if (originalTrip) originalTrip = originalTrip.toObject();
    }

    if (!originalTrip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    const newId = 'trip-copy-' + Date.now();
    const clonedTrip = JSON.parse(JSON.stringify(originalTrip));
    clonedTrip._id = newId;
    clonedTrip.id = newId;
    clonedTrip.destinationName = `Copy of ${originalTrip.destinationName}`;
    clonedTrip.createdAt = new Date().toISOString();
    clonedTrip.updatedAt = new Date().toISOString();

    clonedTrip.days.forEach((day, dIdx) => {
      day.id = `day-${dIdx + 1}-${Date.now().toString(36).substr(-4)}`;
      day.activities.forEach((act, aIdx) => {
        act.id = `act-${dIdx + 1}-${aIdx + 1}-${Date.now().toString(36).substr(-4)}`;
      });
    });

    if (isUsingMemoryStore()) {
      memoryTrips.unshift(clonedTrip);
      if (memoryPacking[tripId]) {
        memoryPacking[newId] = JSON.parse(JSON.stringify(memoryPacking[tripId]));
      }
    } else {
      delete clonedTrip._id;
      const dbTrip = await Trip.create(clonedTrip);
      clonedTrip._id = dbTrip._id.toString();
      clonedTrip.id = dbTrip._id.toString();

      const origPacking = await Packing.findOne({ tripId });
      if (origPacking) {
        await Packing.create({
          tripId: clonedTrip._id,
          userId: clonedTrip.userId,
          items: origPacking.items
        });
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Trip duplicated successfully',
      data: clonedTrip
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete Trip
// @route   DELETE /api/trips/:id
exports.deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id;

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Trip not found' });
      }
      memoryTrips.splice(idx, 1);
      delete memoryPacking[tripId];
      return res.json({ success: true, message: 'Trip deleted successfully' });
    }

    const trip = await Trip.findByIdAndDelete(tripId);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    await Packing.deleteMany({ tripId });

    return res.json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Regenerate a single day
// @route   POST /api/trips/:id/regenerate-day
exports.regenerateDay = async (req, res) => {
  try {
    const tripId = req.params.id;
    const { dayNumber } = req.body;

    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
    } else {
      trip = await Trip.findById(tripId);
      if (trip) trip = trip.toObject();
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    const dest = destinations.find(d => d.id === trip.destinationId) || destinations[0];
    const targetDayIndex = trip.days.findIndex(d => d.dayNumber === Number(dayNumber));
    if (targetDayIndex === -1) {
      return res.status(400).json({ success: false, message: 'Day number not found in trip' });
    }

    const otherUsedIds = new Set();
    trip.days.forEach((day, idx) => {
      if (idx !== targetDayIndex) {
        day.activities.forEach(a => {
          if (a.placeId) otherUsedIds.add(a.placeId);
        });
      }
    });

    const targetDate = trip.days[targetDayIndex].date;
    const newDayPlan = plannerService.generateDayPlan(
      Number(dayNumber),
      targetDate,
      dest,
      trip,
      otherUsedIds
    );

    trip.days[targetDayIndex] = newDayPlan;

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      memoryTrips[idx] = trip;
    } else {
      await Trip.findByIdAndUpdate(tripId, { days: trip.days });
    }

    const budgetStats = plannerService.computeBudget(trip, dest);

    return res.json({
      success: true,
      message: `Day ${dayNumber} regenerated successfully`,
      data: {
        trip,
        newDayPlan,
        budgetStats
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Enhance / Regenerate a single day using Hugging Face AI
// @route   POST /api/trips/:id/huggingface-day
exports.enhanceDayWithHuggingFace = async (req, res) => {
  try {
    const tripId = req.params.id;
    const { dayNumber, token, model } = req.body;

    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
    } else {
      trip = await Trip.findById(tripId);
      if (trip) trip = trip.toObject();
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    const dest = destinations.find(d => d.id === trip.destinationId) || destinations[0];
    const targetDayIndex = trip.days.findIndex(d => d.dayNumber === Number(dayNumber));
    if (targetDayIndex === -1) {
      return res.status(400).json({ success: false, message: 'Day number not found in trip' });
    }

    const otherUsedPlaces = [];
    trip.days.forEach((day, idx) => {
      if (idx !== targetDayIndex) {
        day.activities.forEach(a => {
          if (a.name) otherUsedPlaces.push(a.name);
        });
      }
    });

    const targetDate = trip.days[targetDayIndex].date;
    const targetTheme = trip.days[targetDayIndex].themeTitle || `Day ${dayNumber} Experience`;

    const { generateHuggingFaceDayPlan } = require('../services/externalApiService');
    const customToken = token || req.headers['x-hf-token'] || process.env.HUGGINGFACE_API_TOKEN;

    const newDayPlan = await generateHuggingFaceDayPlan({
      destinationName: trip.destinationName || dest.name,
      dayNumber: Number(dayNumber),
      date: targetDate,
      themeTitle: targetTheme,
      interests: trip.interests || ['Nature', 'Food'],
      budget: trip.budget,
      travelStyle: trip.travelStyle,
      token: customToken,
      model,
      usedPlaces: otherUsedPlaces
    });

    trip.days[targetDayIndex] = newDayPlan;

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      memoryTrips[idx] = trip;
    } else {
      await Trip.findByIdAndUpdate(tripId, { days: trip.days });
    }

    const budgetStats = plannerService.computeBudget(trip, dest);

    return res.json({
      success: true,
      message: `Day ${dayNumber} enhanced with Hugging Face AI!`,
      data: {
        trip,
        newDayPlan,
        budgetStats
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate / Regenerate full itinerary for a trip using its selected number of days
// @route   POST /api/trips/:id/generate
exports.generateTripItinerary = async (req, res) => {
  try {
    const tripId = req.params.id;

    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => t._id === tripId || t.id === tripId);
    } else {
      trip = await Trip.findById(tripId);
      if (trip) trip = trip.toObject();
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    // If dayNumber is explicitly provided in body, delegate to regenerate single day
    if (req.body.dayNumber !== undefined && req.body.dayNumber !== null) {
      return exports.regenerateDay(req, res);
    }

    // Use the user's selected number of days from the current Trip object (or from request body if explicitly provided)
    const selectedDays = Number(req.body.numberOfDays) > 0
      ? Number(req.body.numberOfDays)
      : Number(req.body.daysCount) > 0
        ? Number(req.body.daysCount)
        : Number(trip.numberOfDays) > 0
          ? Number(trip.numberOfDays)
          : Number(trip.daysCount) > 0
            ? Number(trip.daysCount)
            : (trip.days && Array.isArray(trip.days) && trip.days.length > 0)
              ? trip.days.length
              : plannerService.countDays(trip.startDate, trip.endDate);

    const numDays = Math.max(1, Math.min(14, selectedDays));
    const startDate = req.body.startDate || trip.startDate || new Date().toISOString().split('T')[0];
    const calculatedEndDate = plannerService.addDays(startDate, numDays - 1);
    const dest = await getOrGenerateDestination(trip.destinationId || trip.destinationName);

    // Generate new itinerary with exact number of days (1 day -> Day 1 only, 3 days -> Day 1..3, etc.)
    const regenerated = plannerService.generateTripItinerary({
      ...trip,
      startDate,
      endDate: calculatedEndDate,
      numberOfDays: numDays,
      daysCount: numDays
    }, dest, req.body.planTheme || trip.planTheme || 'balanced');

    // Update trip object with exact days and dates
    const updatedTripData = {
      ...trip,
      ...regenerated,
      startDate,
      endDate: calculatedEndDate,
      numberOfDays: numDays,
      daysCount: numDays,
      days: regenerated.days,
      updatedAt: new Date().toISOString()
    };

    // Temporary console logs required by prompt
    console.log('selected numberOfDays:', numDays);
    console.log('generated itinerary length:', updatedTripData.days.length);
    console.log('generated day numbers:', updatedTripData.days.map(d => d.dayNumber));

    // Update packing list scaled for numDays
    const packingItems = plannerService.generatePackingList(updatedTripData, dest);

    // Compute updated budget
    const budgetStats = plannerService.computeBudget(updatedTripData, dest);
    updatedTripData.budgetStats = budgetStats;

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      memoryTrips[idx] = updatedTripData;
      memoryPacking[tripId] = packingItems;
    } else {
      await Trip.findByIdAndUpdate(tripId, updatedTripData);
      await Packing.findOneAndUpdate(
        { tripId },
        { items: packingItems, userId: updatedTripData.userId },
        { upsert: true }
      );
    }

    return res.json({
      success: true,
      message: `Generated exactly ${numDays}-day itinerary successfully`,
      data: {
        ...updatedTripData,
        destination: dest,
        budgetStats,
        packingItems
      }
    });
  } catch (error) {
    console.error('Error generating trip itinerary:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Demo Booking of Plan (Requirement 13)
// @route   POST /api/trips/:id/book
exports.bookTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const userId = req.user ? (req.user.id || req.user._id) : 'guest';
    const { hotel, food, transport, coupon } = req.body;

    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => (t._id === tripId || t.id === tripId));
    } else {
      trip = await Trip.findById(tripId);
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    const tripObj = trip.toObject ? trip.toObject() : trip;
    if (hotel) tripObj.selectedHotel = hotel;
    if (food) tripObj.selectedFood = food;
    if (transport) tripObj.selectedTransport = transport;
    if (coupon) tripObj.coupon = coupon;

    const dest = destinations.find(d => d.id === tripObj.destinationId) || destinations[0];
    const budgetStats = plannerService.computeBudget(tripObj, dest);

    const bookingId = `TM-BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookedAt = new Date().toISOString();
    const finalAmount = budgetStats.total;
    const discount = budgetStats.discount || 0;
    const totalAmount = (budgetStats.subtotal || budgetStats.total) + (budgetStats.totals?.Other || 0);

    const bookingRecord = {
      bookingId,
      tripId,
      destinationName: tripObj.destinationName,
      dates: `${tripObj.startDate} to ${tripObj.endDate} (${tripObj.daysCount} Days)`,
      hotelName: tripObj.selectedHotel?.name || 'Curated Accommodation',
      foodPlan: tripObj.selectedFood?.name || 'Local Dining Option',
      transport: tripObj.selectedTransport?.label || 'Chauffeur / Transit',
      totalAmount,
      discount,
      finalAmount,
      currencySymbol: tripObj.currencySymbol || '₹',
      status: 'Confirmed',
      bookedAt
    };

    tripObj.booking = {
      bookingId,
      status: 'Booked',
      bookedAt,
      totalAmount,
      discount,
      finalAmount
    };

    const notif = {
      id: `notif-${Date.now()}`,
      title: 'Trip Booked Successfully! 🎉',
      message: `Your TripMate plan to ${tripObj.destinationName} has been booked successfully! Demo Booking ID: ${bookingId}.`,
      type: 'booking',
      read: false,
      createdAt: bookedAt
    };

    if (!tripObj.notifications) tripObj.notifications = [];
    tripObj.notifications.unshift(notif);

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => t._id === tripId || t.id === tripId);
      if (idx !== -1) {
        memoryTrips[idx] = { ...memoryTrips[idx], ...tripObj, updatedAt: bookedAt };
      }
      const user = memoryUsers.find(u => u._id === userId || u.id === userId);
      if (user) {
        if (!user.bookingHistory) user.bookingHistory = [];
        user.bookingHistory.unshift(bookingRecord);
        if (!user.notifications) user.notifications = [];
        user.notifications.unshift(notif);
      }
    } else {
      trip.selectedHotel = tripObj.selectedHotel;
      trip.selectedFood = tripObj.selectedFood;
      trip.selectedTransport = tripObj.selectedTransport;
      trip.coupon = tripObj.coupon;
      trip.booking = tripObj.booking;
      trip.notifications = tripObj.notifications;
      await trip.save();

      const User = require('../models/User');
      await User.findByIdAndUpdate(userId, {
        $push: {
          bookingHistory: { $each: [bookingRecord], $position: 0 },
          notifications: { $each: [notif], $position: 0 }
        }
      });
    }

    return res.json({
      success: true,
      message: 'Your TripMate plan has been booked successfully!',
      data: {
        trip: { ...tripObj, budgetStats },
        booking: bookingRecord
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Apply coupon to trip
// @route   POST /api/trips/:id/apply-coupon
exports.applyCoupon = async (req, res) => {
  try {
    const tripId = req.params.id;
    const userId = req.user ? (req.user.id || req.user._id) : 'guest';
    const { coupon } = req.body;

    let trip;
    let allUserTrips = [];
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => (t._id === tripId || t.id === tripId));
      allUserTrips = memoryTrips.filter(t => t.userId === userId || (!t.userId && userId === 'demo-user-101'));
    } else {
      trip = await Trip.findById(tripId);
      allUserTrips = await Trip.find({ userId });
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    const tripObj = trip.toObject ? trip.toObject() : trip;
    const validation = validateCoupon(coupon, tripObj, allUserTrips);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.reason });
    }

    const validCoupon = validation.coupon;
    tripObj.coupon = validCoupon;

    const dest = destinations.find(d => d.id === tripObj.destinationId) || destinations[0];
    const budgetStats = plannerService.computeBudget(tripObj, dest);

    if (isUsingMemoryStore()) {
      const idx = memoryTrips.findIndex(t => (t._id === tripId || t.id === tripId));
      if (idx !== -1) {
        memoryTrips[idx].coupon = validCoupon;
        memoryTrips[idx].updatedAt = new Date().toISOString();
      }
    } else {
      trip.coupon = validCoupon;
      trip.updatedAt = new Date();
      await trip.save();
    }

    return res.json({
      success: true,
      message: 'Coupon applied successfully',
      data: {
        trip: { ...tripObj, coupon: validCoupon, budgetStats },
        coupon: validCoupon,
        budgetStats
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get weather for a trip's destination (Requirement 33)
// @route   GET /api/trips/:id/weather
exports.getTripWeather = async (req, res) => {
  try {
    const tripId = req.params.id;
    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => (t._id === tripId || t.id === tripId));
    } else {
      trip = await Trip.findById(tripId);
    }
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    const dest = destinations.find(d => d.id === trip.destinationId) || destinations[0];
    return res.json({ success: true, data: dest.weather || [] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get curated places for a trip's destination (Requirement 33)
// @route   GET /api/trips/:id/places
exports.getTripPlaces = async (req, res) => {
  try {
    const tripId = req.params.id;
    let trip;
    if (isUsingMemoryStore()) {
      trip = memoryTrips.find(t => (t._id === tripId || t.id === tripId));
    } else {
      trip = await Trip.findById(tripId);
    }
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    const dest = await getOrGenerateDestination(trip.destinationId);
    return res.json({ success: true, data: dest.places || [] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate multiple distinct plans (Plan A, Plan B, Plan C, Plan D) for any destination worldwide
// @route   POST /api/trips/generate-plans
exports.generateMultiplePlans = async (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
      startDate,
      endDate,
      daysCount,
      budget,
      currency,
      currencySymbol,
      travelers = 1,
      interests = ['Nature', 'Food'],
      foodPreference = 'No Preference',
      travelStyle = 'Balanced',
      fromLocation = 'Current Location'
    } = req.body;

    const queryTarget = destinationId || destinationName || 'hyderabad';
    const dest = await getOrGenerateDestination(queryTarget);

    const requestedDays = Number(req.body.numberOfDays || req.body.daysCount) || undefined;

    const plans = plannerService.generateMultiplePlans({
      destinationId: dest.id,
      destinationName: dest.name,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      numberOfDays: requestedDays,
      daysCount: requestedDays,
      budget: Number(budget) || 35000,
      currency: currency || dest.currency || 'INR',
      currencySymbol: currencySymbol || dest.currencySymbol || '₹',
      travelers: Number(travelers) || 1,
      interests,
      foodPreference,
      travelStyle,
      fromLocation
    }, dest);

    return res.json({
      success: true,
      destination: dest,
      plans
    });
  } catch (error) {
    console.error('Error generating multiple plans:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Explicit alias for backend generate-trip API
exports.generateTrip = exports.createTrip;

// @desc    Get dynamic locations using OpenStreetMap & Hugging Face
// @route   POST /api/trips/dynamic-locations
exports.getDynamicLocations = async (req, res) => {
  try {
    const { destinationName = 'Goa', categoryFilter = null, limit = 8 } = req.body;
    const { searchLocationsOSM } = require('../services/externalApiService');
    const osmPlaces = await searchLocationsOSM(destinationName, categoryFilter, limit);

    return res.json({
      success: true,
      destinationName,
      source: 'OpenStreetMap',
      count: osmPlaces.length,
      data: osmPlaces
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate plane trip flight details
// @route   POST /api/trips/plane-trip
exports.getPlaneTrip = async (req, res) => {
  try {
    const {
      fromLocation = 'Current Location',
      destinationName = 'Destination',
      startDate,
      endDate,
      travelers = 1,
      travelStyle = 'Balanced',
      currency = 'INR',
      currencySymbol = '₹'
    } = req.body;

    const { generatePlaneTrip } = require('../services/externalApiService');
    const planeTrip = await generatePlaneTrip({
      fromLocation,
      destinationName,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      travelers,
      travelStyle,
      currency,
      currencySymbol
    });

    return res.json({
      success: true,
      data: planeTrip,
      planeTrip
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

