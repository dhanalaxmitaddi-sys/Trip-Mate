import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import api from '../services/api';
import storage from '../services/storage';
import { destinations } from '../data/destinations';
import { getOrGenerateDestination } from '../services/destinationService';
import aiService from '../services/aiService';
import { useAuth } from './AuthContext';
import { validateCoupon } from '../services/couponService';

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const { user } = useAuth();
  const currentUserId = user ? (user.id || user._id || (user.email ? user.email : 'guest')) : null;

  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTripState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pure function to calculate budget dynamically as per Single Source of Truth
  const computeBudgetForTrip = useCallback((trip) => {
    if (!trip) return null;

    const dest = getOrGenerateDestination(trip.destinationId || trip.destinationName) || destinations[0];
    const hotelRate = (trip.selectedHotel && Number(trip.selectedHotel.price)) || dest.hotelRate || 2500;
    const foodRate = (trip.selectedFood && Number(trip.selectedFood.dailyCost)) || dest.foodRate || 800;
    const transportRate = (trip.selectedTransport && Number(trip.selectedTransport.dailyRate)) || dest.transportRate || 750;

    const startStr = String(trip.startDate || '').split('T')[0];
    const endStr = String(trip.endDate || '').split('T')[0];
    const start = new Date(startStr + 'T00:00:00Z');
    const end = new Date(endStr + 'T00:00:00Z');
    const diffTime = end.getTime() - start.getTime();
    const calculatedDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);
    const days = Number(trip.numberOfDays) > 0
      ? Number(trip.numberOfDays)
      : Number(trip.daysCount) > 0
        ? Number(trip.daysCount)
        : (trip.days && Array.isArray(trip.days) && trip.days.length > 0)
          ? trip.days.length
          : calculatedDays;
    const nights = Math.max(0, days - 1);
    const travelers = Math.max(1, trip.travelers || 1);
    const rooms = Math.ceil(travelers / 2);

    const totals = {
      Transport: Math.round(transportRate * days * Math.ceil(travelers / 4)),
      Hotel: Math.round(hotelRate * nights * rooms),
      Food: Math.round(foodRate * days * travelers),
      Activities: 0,
      Shopping: trip.interests && trip.interests.includes('Shopping')
        ? Math.round((Number(trip.budget) || 20000) * 0.12)
        : Math.round((Number(trip.budget) || 20000) * 0.05),
      Other: 0
    };

    if (trip.days && Array.isArray(trip.days)) {
      trip.days.forEach(day => {
        if (day.activities && Array.isArray(day.activities)) {
          day.activities.forEach(act => {
            const cat = act.costCategory || 'Activities';
            const cost = (Number(act.cost) || 0) * travelers;
            if (totals[cat] !== undefined) {
              totals[cat] += cost;
            } else {
              totals.Activities += cost;
            }
          });
        }
      });
    }

    const subtotal = totals.Transport + totals.Hotel + totals.Food + totals.Activities + totals.Shopping;
    totals.Other = Math.round(0.05 * subtotal);
    const originalTotal = subtotal + totals.Other;
    const discount = (trip.coupon && Number(trip.coupon.discount || trip.coupon.amount)) || 0;
    const finalAmount = Math.max(0, originalTotal - discount);
    const totalBudget = Number(trip.budget) || 20000;
    const remaining = totalBudget - finalAmount;
    const exceeded = finalAmount > totalBudget;
    const percentUsed = Math.min(100, Math.round((finalAmount / (totalBudget || 1)) * 100));

    return {
      totals,
      subtotal,
      originalTotal,
      discount,
      finalAmount,
      total: finalAmount,
      totalBudget,
      remaining,
      exceeded,
      percentUsed,
      overspendAmount: exceeded ? Math.abs(remaining) : 0,
      daysCount: days,
      nightsCount: nights,
      roomsCount: rooms,
      currencySymbol: trip.currencySymbol || '₹',
      currency: trip.currency || 'INR'
    };
  }, []);

  // Memoized budget of active trip
  const budgetStats = useMemo(() => {
    return computeBudgetForTrip(currentTrip);
  }, [currentTrip, computeBudgetForTrip]);

  // Load trips strictly for the current logged in user (Requirement 2: User A must not see User B's trips)
  const refreshTrips = useCallback(async () => {
    if (!currentUserId) {
      setTrips([]);
      setCurrentTripState(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get('/trips');
      const tripList = res.data?.data || res.data;
      if (tripList && Array.isArray(tripList)) {
        // Enforce user ownership check on frontend
        const userTrips = tripList.filter(t => !t.userId || t.userId === currentUserId || (currentUserId === 'demo-user-101' && t.userId === 'demo-user-101'));
        setTrips(userTrips);
        storage.saveTrips(userTrips, currentUserId);

        const savedCurrentId = storage.getCurrentTripId(currentUserId);
        const active = userTrips.find(t => t._id === savedCurrentId || t.id === savedCurrentId) || userTrips[0] || null;
        setCurrentTripState(active);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn('Backend unavailable, reading local trips from storage for user:', currentUserId);
    }

    // Fallback to localStorage strictly namespaced by current user ID
    const localTrips = storage.getTrips(currentUserId);
    const filtered = localTrips.filter(t => t.userId === currentUserId || (!t.userId && currentUserId === 'demo-user-101'));
    setTrips(filtered);
    const savedCurrentId = storage.getCurrentTripId(currentUserId);
    const active = filtered.find(t => t._id === savedCurrentId || t.id === savedCurrentId) || filtered[0] || null;
    setCurrentTripState(active);
    setLoading(false);
  }, [currentUserId]);

  useEffect(() => {
    refreshTrips();
  }, [refreshTrips]);

  const setCurrentTrip = (tripOrId) => {
    if (!tripOrId) {
      setCurrentTripState(null);
      storage.setCurrentTripId(null, currentUserId);
      return;
    }
    const tripObj = typeof tripOrId === 'string'
      ? trips.find(t => t._id === tripOrId || t.id === tripOrId)
      : tripOrId;

    setCurrentTripState(tripObj);
    if (tripObj) {
      storage.setCurrentTripId(tripObj._id || tripObj.id, currentUserId);
    }
  };

  // Update trip state helper (Single Source of Truth)
  const updateTripState = (updatedTrip) => {
    setCurrentTripState(updatedTrip);
    setTrips(prev => {
      const next = prev.map(t => (t._id === updatedTrip._id || t.id === updatedTrip.id ? updatedTrip : t));
      storage.saveTrips(next, currentUserId);
      return next;
    });
  };

  // Generate multiple distinct plans (Plan A, B, C, D)
  const generateMultiplePlans = async (formValues) => {
    const payload = {
      ...formValues,
      userId: currentUserId || 'guest'
    };

    try {
      const res = await api.post('/trips/generate-plans', payload);
      if (res.data?.success && res.data?.plans) {
        return {
          destination: res.data.destination,
          plans: res.data.plans
        };
      }
    } catch (err) {
      console.warn('Backend generate-plans unavailable, falling back to client generator:', err);
    }

    return await aiService.generateMultiplePlansAI(payload);
  };

  // Create new trip with EXACT number of days and owned by current user
  const createTrip = async (formValues) => {
    const selectedNumberOfDays = Number(formValues.numberOfDays || formValues.daysCount || 3);
    const payload = {
      ...formValues,
      numberOfDays: selectedNumberOfDays,
      daysCount: selectedNumberOfDays,
      userId: currentUserId || 'guest'
    };

    try {
      const res = await api.post('/trips', payload);
      const newTrip = res.data?.data || res.data?.trip || res.data;
      if (newTrip && newTrip.days) {
        console.log('selected numberOfDays:', selectedNumberOfDays);
        console.log('generated itinerary length:', newTrip.days.length);
        console.log('generated day numbers:', newTrip.days.map(d => d.dayNumber));
      }
      setTrips(prev => [newTrip, ...prev]);
      setCurrentTrip(newTrip);
      storage.saveTrips([newTrip, ...trips], currentUserId);
      return { success: true, data: newTrip, trip: newTrip };
    } catch (e) {
      // Offline fallback: generate locally via rule-based AI service with exact days
      console.warn('API trip creation fallback to local generator:', e);
      const generated = await aiService.generateTripItineraryAI(payload);
      const tripId = 'trip-local-' + Date.now();
      const localTrip = {
        _id: tripId,
        id: tripId,
        userId: currentUserId || 'guest',
        ...generated,
        numberOfDays: selectedNumberOfDays,
        daysCount: selectedNumberOfDays,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      if (localTrip.days) {
        console.log('selected numberOfDays:', selectedNumberOfDays);
        console.log('generated itinerary length:', localTrip.days.length);
        console.log('generated day numbers:', localTrip.days.map(d => d.dayNumber));
      }
      setTrips(prev => [localTrip, ...prev]);
      setCurrentTrip(localTrip);
      storage.saveTrips([localTrip, ...trips], currentUserId);
      return { success: true, data: localTrip, trip: localTrip };
    }
  };

  // Save and activate a pre-generated plan directly
  const createTripFromPlan = async (planTrip) => {
    const payload = {
      ...planTrip,
      userId: currentUserId || 'guest'
    };

    try {
      const res = await api.post('/trips', payload);
      const newTrip = res.data?.data || res.data;
      setTrips(prev => [newTrip, ...prev]);
      setCurrentTrip(newTrip);
      storage.saveTrips([newTrip, ...trips], currentUserId);
      return { success: true, data: newTrip };
    } catch (e) {
      const tripId = 'trip-local-' + Date.now();
      const localTrip = {
        _id: tripId,
        id: tripId,
        userId: currentUserId || 'guest',
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTrips(prev => [localTrip, ...prev]);
      setCurrentTrip(localTrip);
      storage.saveTrips([localTrip, ...trips], currentUserId);
      return { success: true, data: localTrip };
    }
  };

  // Update general trip fields
  const updateTrip = async (tripId, updatedFields) => {
    const targetId = tripId || (currentTrip && (currentTrip._id || currentTrip.id));
    if (!targetId) return;

    const baseTrip = trips.find(t => t._id === targetId || t.id === targetId) || currentTrip;
    if (!baseTrip) return;

    const updated = {
      ...baseTrip,
      ...updatedFields,
      updatedAt: new Date().toISOString()
    };

    // If daysCount changed, recalculate budgetStats
    const stats = computeBudgetForTrip(updated);
    updated.budgetStats = stats;

    updateTripState(updated);

    try {
      await api.put(`/trips/${targetId}`, updatedFields);
    } catch (err) {
      console.warn('Trip update saved locally');
    }
  };

  // Generate / Regenerate itinerary strictly matching selected days count
  const generateItinerary = async (requestedDaysCount = null, planTheme = null) => {
    if (!currentTrip) return { success: false, message: 'No active trip' };

    // Use the user's selected number of days from the current Trip object (or argument if explicitly passed)
    const targetDays = Number(requestedDaysCount) > 0
      ? Number(requestedDaysCount)
      : Number(currentTrip.numberOfDays) > 0
        ? Number(currentTrip.numberOfDays)
        : Number(currentTrip.daysCount) > 0
          ? Number(currentTrip.daysCount)
          : (currentTrip.days && Array.isArray(currentTrip.days) && currentTrip.days.length > 0)
            ? currentTrip.days.length
            : 3;

    const numDays = Math.max(1, Math.min(14, targetDays));
    const tripId = currentTrip._id || currentTrip.id;

    try {
      const res = await api.post(`/trips/${tripId}/generate`, {
        numberOfDays: numDays,
        daysCount: numDays,
        planTheme: planTheme || currentTrip.planTheme || 'balanced'
      });
      const updated = res.data?.data || res.data?.trip || res.data;
      if (updated && updated.days && Array.isArray(updated.days)) {
        console.log('selected numberOfDays:', numDays);
        console.log('generated itinerary length:', updated.days.length);
        console.log('generated day numbers:', updated.days.map(d => d.dayNumber));
        updateTripState(updated);
        return { success: true, data: updated, trip: updated };
      }
    } catch (e) {
      console.warn('Backend generate itinerary fallback to local generator:', e);
    }

    // Local fallback generator using rule-based AI engine
    const startDateStr = (currentTrip.startDate || new Date().toISOString()).split('T')[0];
    const formLike = {
      ...currentTrip,
      numberOfDays: numDays,
      daysCount: numDays,
      startDate: startDateStr
    };
    const generated = await aiService.generateTripItineraryAI(formLike, planTheme || currentTrip.planTheme || 'balanced');
    const updated = {
      ...currentTrip,
      ...generated,
      numberOfDays: numDays,
      daysCount: numDays,
      days: generated.days,
      endDate: generated.endDate,
      updatedAt: new Date().toISOString()
    };
    console.log('selected numberOfDays:', numDays);
    console.log('generated itinerary length:', updated.days.length);
    console.log('generated day numbers:', updated.days.map(d => d.dayNumber));
    const stats = computeBudgetForTrip(updated);
    updated.budgetStats = stats;
    updateTripState(updated);
    return { success: true, data: updated, trip: updated };
  };

  // Choose / Change Hotel (Requirement 8)
  const setSelectedHotel = async (hotel) => {
    if (!currentTrip) return;
    const updated = {
      ...currentTrip,
      selectedHotel: hotel,
      updatedAt: new Date().toISOString()
    };
    updateTripState(updated);
    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, { selectedHotel: hotel });
    } catch (e) {
      console.warn('Hotel selected locally');
    }
  };

  // Choose / Change Food Plan (Requirement 8)
  const setSelectedFood = async (food) => {
    if (!currentTrip) return;
    const updated = {
      ...currentTrip,
      selectedFood: food,
      updatedAt: new Date().toISOString()
    };
    updateTripState(updated);
    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, { selectedFood: food });
    } catch (e) {
      console.warn('Food plan selected locally');
    }
  };

  // Choose / Change Transport Option (Requirement 8)
  const setSelectedTransport = async (transport) => {
    if (!currentTrip) return;
    const updated = {
      ...currentTrip,
      selectedTransport: transport,
      updatedAt: new Date().toISOString()
    };
    updateTripState(updated);
    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, { selectedTransport: transport });
    } catch (e) {
      console.warn('Transport selected locally');
    }
  };

  // Apply Special Coupon (Requirement 12)
  const applyCoupon = async (couponInput) => {
    if (!currentTrip) {
      return { success: false, message: 'No active trip found. Please create or select a trip first.' };
    }

    // 1. Check current trip and 2. Validate coupon against current trip
    const validation = validateCoupon(couponInput, currentTrip, trips);
    if (!validation.valid) {
      return { success: false, message: validation.reason };
    }

    const validCoupon = validation.coupon;

    // 3. Apply discount to current Trip object
    const updated = {
      ...currentTrip,
      coupon: validCoupon,
      updatedAt: new Date().toISOString()
    };

    // 4. Recalculate: original total, discount, final amount, remaining budget, budget percentage
    const stats = computeBudgetForTrip(updated);
    updated.budgetStats = stats;

    // 5. Save the updated Trip state (Single Source of Truth)
    updateTripState(updated);

    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, { 
        coupon: validCoupon,
        budgetStats: stats
      });
    } catch (e) {
      console.warn('Coupon applied locally in Single Source of Truth state');
    }

    return { 
      success: true, 
      message: 'Coupon applied successfully', 
      discount: validCoupon.discount,
      coupon: validCoupon,
      stats
    };
  };

  // Remove coupon from active trip
  const removeCoupon = async () => {
    if (!currentTrip || !currentTrip.coupon) return;
    const updated = {
      ...currentTrip,
      coupon: null,
      updatedAt: new Date().toISOString()
    };
    const stats = computeBudgetForTrip(updated);
    updated.budgetStats = stats;
    updateTripState(updated);
    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, { coupon: null, budgetStats: stats });
    } catch (e) {}
  };

  // Demo Book Plan (Requirement 13)
  const bookTrip = async (bookingDetails = {}) => {
    if (!currentTrip) return { success: false, message: 'No active trip' };

    const bookingId = `TM-BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookedAt = new Date().toISOString();
    const stats = computeBudgetForTrip(currentTrip);

    const bookingPayload = {
      bookingId,
      hotel: currentTrip.selectedHotel,
      food: currentTrip.selectedFood,
      transport: currentTrip.selectedTransport,
      coupon: currentTrip.coupon,
      totalAmount: stats.subtotal + (stats.totals?.Other || 0),
      discount: stats.discount || 0,
      finalAmount: stats.total,
      ...bookingDetails
    };

    try {
      const res = await api.post(`/trips/${currentTrip._id || currentTrip.id}/book`, bookingPayload);
      const bookedData = res.data?.data?.trip || res.data?.trip;
      if (bookedData) {
        updateTripState(bookedData);
        return { success: true, bookingId, data: bookedData };
      }
    } catch (e) {
      console.warn('Booking confirmed in local Demo Mode');
    }

    // Local fallback demo booking
    const updated = {
      ...currentTrip,
      booking: {
        bookingId,
        status: 'Booked',
        bookedAt,
        totalAmount: stats.subtotal + (stats.totals?.Other || 0),
        discount: stats.discount || 0,
        finalAmount: stats.total
      },
      status: 'Upcoming',
      updatedAt: bookedAt
    };
    updateTripState(updated);
    return { success: true, bookingId, data: updated };
  };

  // Add activity to day
  const addActivity = async (dayNumber, activityData) => {
    if (!currentTrip) return;
    const updated = JSON.parse(JSON.stringify(currentTrip));
    const day = updated.days.find(d => d.dayNumber === dayNumber);
    if (!day) return;

    const newAct = {
      id: `act-${dayNumber}-${Date.now().toString(36)}`,
      name: activityData.name || 'New Activity',
      category: activityData.category || 'Sightseeing',
      time: activityData.time || '10:00',
      timeOfDay: activityData.timeOfDay || (activityData.time < '12:00' ? 'Morning' : activityData.time < '16:30' ? 'Afternoon' : activityData.time < '19:30' ? 'Evening' : 'Night'),
      durationMinutes: Number(activityData.durationMinutes) || 120,
      location: activityData.location || currentTrip.destinationName,
      cost: Number(activityData.cost) || 0,
      costCategory: activityData.costCategory || 'Activities',
      distance: activityData.distance || '1.5 km',
      notes: activityData.notes || '',
      reason: activityData.reason || 'Custom traveler addition'
    };

    day.activities.push(newAct);
    updateTripState(updated);

    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, updated);
    } catch (err) {
      console.warn('Saved activity locally');
    }
  };

  // Add place from Explore to active trip
  const addPlaceToTrip = async (dayNumber, place) => {
    if (!currentTrip || !place) return;
    return addActivity(dayNumber, {
      name: place.name,
      category: place.category,
      time: '11:00',
      location: place.location || currentTrip.destinationName,
      cost: place.price || 0,
      costCategory: place.category === 'Food' ? 'Food' : place.category === 'Hotel' ? 'Hotel' : 'Activities',
      reason: `Added from Explore Places • Rated ${place.rating || 4.5}★`
    });
  };

  // Edit existing activity
  const updateActivity = async (dayNumber, activityId, updatedFields) => {
    if (!currentTrip) return;
    const updated = JSON.parse(JSON.stringify(currentTrip));
    const day = updated.days.find(d => d.dayNumber === dayNumber);
    if (!day) return;

    const actIdx = day.activities.findIndex(a => a.id === activityId);
    if (actIdx === -1) return;

    day.activities[actIdx] = {
      ...day.activities[actIdx],
      ...updatedFields,
      cost: Number(updatedFields.cost) || 0
    };

    updateTripState(updated);
    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, updated);
    } catch (err) {
      console.warn('Saved activity edit locally');
    }
  };

  // Remove activity
  const removeActivity = async (dayNumber, activityId) => {
    if (!currentTrip) return null;
    const updated = JSON.parse(JSON.stringify(currentTrip));
    const day = updated.days.find(d => d.dayNumber === dayNumber);
    if (!day) return null;

    const removedItem = day.activities.find(a => a.id === activityId);
    day.activities = day.activities.filter(a => a.id !== activityId);

    updateTripState(updated);
    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, updated);
    } catch (err) {
      console.warn('Deleted activity locally');
    }
    return removedItem;
  };

  // Move activity up or down
  const moveActivity = async (dayNumber, activityId, direction) => {
    if (!currentTrip) return;
    const updated = JSON.parse(JSON.stringify(currentTrip));
    const day = updated.days.find(d => d.dayNumber === dayNumber);
    if (!day || !day.activities) return;

    const idx = day.activities.findIndex(a => a.id === activityId);
    if (idx === -1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= day.activities.length) return;

    const temp = day.activities[idx];
    day.activities[idx] = day.activities[targetIdx];
    day.activities[targetIdx] = temp;

    updateTripState(updated);
    try {
      await api.put(`/trips/${currentTrip._id || currentTrip.id}`, updated);
    } catch (err) {
      console.warn('Reordered activity locally');
    }
  };

  // Regenerate single day
  const regenerateDay = async (dayNumber) => {
    if (!currentTrip) return;
    try {
      const res = await api.post(`/trips/${currentTrip._id || currentTrip.id}/regenerate-day`, { dayNumber });
      if (res.data?.trip) {
        updateTripState(res.data.trip);
        return { success: true };
      }
    } catch (e) {
      // Local fallback
      const updated = JSON.parse(JSON.stringify(currentTrip));
      const targetDay = await aiService.regenerateDayAI(updated, dayNumber);
      const dayIdx = updated.days.findIndex(d => d.dayNumber === dayNumber);
      if (dayIdx !== -1) {
        updated.days[dayIdx] = targetDay;
        updateTripState(updated);
        return { success: true };
      }
    }
  };

  // Enhance single day with Hugging Face AI
  const enhanceDayWithHuggingFace = async (dayNumber, options = {}) => {
    if (!currentTrip) return;
    try {
      const res = await api.post(`/trips/${currentTrip._id || currentTrip.id}/huggingface-day`, {
        dayNumber,
        token: options.token,
        model: options.model
      });
      if (res.data?.trip) {
        updateTripState(res.data.trip);
        return { success: true, data: res.data.trip };
      }
    } catch (e) {
      // Local fallback with aiService
      const updated = JSON.parse(JSON.stringify(currentTrip));
      const targetDay = await aiService.generateHuggingFaceDayAI(updated, dayNumber, options);
      const dayIdx = updated.days.findIndex(d => d.dayNumber === dayNumber);
      if (dayIdx !== -1) {
        updated.days[dayIdx] = targetDay;
        updateTripState(updated);
        return { success: true, data: updated };
      }
    }
  };

  // Generate complete trip with Hugging Face AI
  const generateTripWithHuggingFace = async (formValues, options = {}) => {
    const selectedNumberOfDays = Number(formValues.numberOfDays || formValues.daysCount || 3);
    const payload = {
      ...formValues,
      numberOfDays: selectedNumberOfDays,
      daysCount: selectedNumberOfDays,
      userId: currentUserId || 'guest',
      token: options.token,
      model: options.model
    };

    try {
      const res = await api.post('/ai/huggingface/generate-itinerary', payload);
      const newTrip = res.trip || res.data;
      if (newTrip && newTrip.days) {
        setTrips(prev => [newTrip, ...prev]);
        setCurrentTrip(newTrip);
        storage.saveTrips([newTrip, ...trips], currentUserId);
        return { success: true, data: newTrip, trip: newTrip };
      }
    } catch (e) {
      console.warn('Hugging Face trip generation fallback:', e);
      return await createTrip(formValues);
    }
  };

  // Mark trip as Completed (Requirement 28)
  const completeTrip = async (tripId) => {
    const targetId = tripId || (currentTrip && (currentTrip._id || currentTrip.id));
    if (!targetId) return;

    await updateTrip(targetId, { status: 'Completed' });
  };

  // Duplicate trip
  const duplicateTrip = async (tripId) => {
    try {
      const res = await api.post(`/trips/${tripId}/duplicate`, {});
      const cloned = res.data?.data || res.data;
      setTrips(prev => [cloned, ...prev]);
      setCurrentTrip(cloned);
      return { success: true, data: cloned };
    } catch (e) {
      const original = trips.find(t => t._id === tripId || t.id === tripId);
      if (!original) return { success: false, message: 'Original trip not found' };

      const cloned = JSON.parse(JSON.stringify(original));
      const newId = 'trip-copy-' + Date.now();
      cloned._id = newId;
      cloned.id = newId;
      cloned.userId = currentUserId || 'guest';
      cloned.destinationName = `Copy of ${original.destinationName}`;
      cloned.createdAt = new Date().toISOString();

      setTrips(prev => [cloned, ...prev]);
      setCurrentTrip(cloned);
      storage.saveTrips([cloned, ...trips], currentUserId);
      return { success: true, data: cloned };
    }
  };

  // Delete trip
  const deleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);
    } catch (e) {
      console.warn('Deleted trip locally');
    }

    const filtered = trips.filter(t => t._id !== tripId && t.id !== tripId);
    setTrips(filtered);
    storage.saveTrips(filtered, currentUserId);

    if (currentTrip && (currentTrip._id === tripId || currentTrip.id === tripId)) {
      const nextActive = filtered[0] || null;
      setCurrentTrip(nextActive);
    }
    return { success: true };
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        currentTrip,
        setCurrentTrip,
        loading,
        refreshTrips,
        budgetStats,
        createTrip,
        createTripFromPlan,
        generateMultiplePlans,
        updateTrip,
        setSelectedHotel,
        setSelectedFood,
        setSelectedTransport,
        applyCoupon,
        removeCoupon,
        bookTrip,
        completeTrip,
        addActivity,
        addPlaceToTrip,
        updateActivity,
        removeActivity,
        moveActivity,
        regenerateDay,
        enhanceDayWithHuggingFace,
        generateTripWithHuggingFace,
        generateItinerary,
        duplicateTrip,
        deleteTrip,
        computeBudgetForTrip
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
