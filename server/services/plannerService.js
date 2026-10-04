const staticDestinations = require('../data/destinations');
const { getOrGenerateDestination, GLOBAL_KNOWLEDGE_BASE } = require('./destinationService');
const { generatePlaneTripSync } = require('./externalApiService');

// Pure function to count number of days between two ISO date strings (inclusive)
function countDays(startDate, endDate) {
  if (!startDate || !endDate) return 1;
  const startStr = String(startDate).split('T')[0];
  const endStr = String(endDate).split('T')[0];
  const start = new Date(startStr + 'T00:00:00Z');
  const end = new Date(endStr + 'T00:00:00Z');
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return isNaN(diffDays) || diffDays <= 0 ? 1 : Math.min(diffDays, 14); // cap to 14 days max for safety
}

// Format date to YYYY-MM-DD reliably without timezone shifts
function addDays(startDateStr, dayOffset) {
  if (!startDateStr) {
    startDateStr = new Date().toISOString().split('T')[0];
  }
  const cleanDateStr = String(startDateStr).split('T')[0];
  const parts = cleanDateStr.split('-').map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + dayOffset));
    return d.toISOString().split('T')[0];
  }
  const date = new Date(startDateStr);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return date.toISOString().split('T')[0];
}

// Compute Budget as per Single Source of Truth
function computeBudget(trip, destinationData) {
  const days = Number(trip.numberOfDays) > 0
    ? Number(trip.numberOfDays)
    : Number(trip.daysCount) > 0
      ? Number(trip.daysCount)
      : (trip.days && Array.isArray(trip.days) && trip.days.length > 0)
        ? trip.days.length
        : countDays(trip.startDate, trip.endDate);
  const nights = Math.max(0, days - 1);
  const travelers = Math.max(1, trip.travelers || 1);
  const rooms = Math.ceil(travelers / 2);

  const dest = destinationData || staticDestinations.find(d => d.id === trip.destinationId) || staticDestinations[0];
  const hotelRate = (trip.selectedHotel && Number(trip.selectedHotel.price)) || dest.hotelRate || 2500;
  const foodRate = (trip.selectedFood && Number(trip.selectedFood.dailyCost)) || dest.foodRate || 800;
  const transportRate = (trip.selectedTransport && Number(trip.selectedTransport.dailyRate)) || dest.transportRate || 750;

  const totals = {
    Transport: Math.round(transportRate * days * Math.ceil(travelers / 4)),
    Hotel: Math.round(hotelRate * nights * rooms),
    Food: Math.round(foodRate * days * travelers),
    Activities: 0,
    Shopping: trip.interests && trip.interests.includes('Shopping') ? Math.round((trip.budget || 20000) * 0.12) : Math.round((trip.budget || 20000) * 0.05),
    Other: 0
  };

  // Add individual activity costs
  if (trip.days && Array.isArray(trip.days)) {
    trip.days.forEach(day => {
      if (day.activities && Array.isArray(day.activities)) {
        day.activities.forEach(act => {
          const cat = act.costCategory || 'Activities';
          const actCost = (Number(act.cost) || 0) * travelers;
          if (totals[cat] !== undefined) {
            totals[cat] += actCost;
          } else {
            totals.Activities += actCost;
          }
        });
      }
    });
  }

  const subtotal = totals.Transport + totals.Hotel + totals.Food + totals.Activities + totals.Shopping;
  totals.Other = Math.round(0.05 * subtotal);
  const originalTotal = subtotal + totals.Other;
  const discount = (trip.coupon && Number(trip.coupon.discount || trip.coupon.amount)) || 0;
  const grandTotal = Math.max(0, originalTotal - discount);
  const totalBudget = Number(trip.budget) || 20000;
  const remaining = totalBudget - grandTotal;
  const exceeded = grandTotal > totalBudget;
  const percentUsed = Math.min(100, Math.round((grandTotal / (totalBudget || 1)) * 100));

  return {
    totals,
    subtotal,
    originalTotal,
    discount,
    finalAmount: grandTotal,
    total: grandTotal,
    totalBudget,
    remaining,
    exceeded,
    percentUsed,
    overspendAmount: exceeded ? Math.abs(remaining) : 0,
    daysCount: days,
    nightsCount: nights,
    roomsCount: rooms,
    currencySymbol: trip.currencySymbol || dest.currencySymbol || '₹',
    currency: trip.currency || dest.currency || 'INR'
  };
}

// Rule-based place scoring helper
function scorePlace(place, selectedInterests, perActivityBudget, categoriesUsedToday = new Set(), foodPreference, planTheme = 'balanced') {
  if (!place) return 0;
  let interestMatches = 0;
  if (selectedInterests && selectedInterests.length > 0 && place.tags) {
    place.tags.forEach(tag => {
      if (selectedInterests.includes(tag)) interestMatches++;
    });
  }
  const I_p = selectedInterests && selectedInterests.length > 0 ? (interestMatches / selectedInterests.length) : 0.5;
  const R_p = (place.rating || 4.0) / 5.0;

  let B_p = 1.0;
  const budgetLimit = perActivityBudget || 1000;
  if (place.price > budgetLimit) {
    B_p = Math.max(0.1, 1.0 - ((place.price - budgetLimit) / (budgetLimit * 2)));
  }

  const D_p = (categoriesUsedToday && typeof categoriesUsedToday.has === 'function' && categoriesUsedToday.has(place.category)) ? 0.0 : 1.0;
  let score = 0.40 * I_p + 0.25 * R_p + 0.20 * B_p + 0.15 * D_p;

  if (foodPreference && foodPreference.toLowerCase().includes('veg') && place.tags && place.tags.includes('Vegetarian')) {
    score += 0.3;
  }

  if (planTheme === 'history' && (place.category === 'History' || (place.tags && (place.tags.includes('History') || place.tags.includes('Culture'))))) {
    score += 0.6;
  } else if (planTheme === 'food' && (place.category === 'Food' || (place.tags && place.tags.includes('Food')))) {
    score += 0.6;
  } else if (planTheme === 'photography' && ((place.tags && place.tags.includes('Photography')) || place.category === 'Nature' || place.category === 'Beach')) {
    score += 0.6;
  } else if (planTheme === 'city' && (place.category === 'Sightseeing' || place.category === 'Shopping' || (place.tags && place.tags.includes('Shopping')))) {
    score += 0.6;
  }

  return score;
}

// 10 Distinct Day Theme Rotations ensuring each day has a unique experience
const DAY_THEME_ROTATIONS = [
  {
    dayNumber: 1,
    themeTitle: 'City Highlights & Welcome Flavors',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Sightseeing' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Sightseeing' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Food' }
    ]
  },
  {
    dayNumber: 2,
    themeTitle: 'Nature Vistas & Cultural Heritage',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Nature' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Culture' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Sightseeing' }
    ]
  },
  {
    dayNumber: 3,
    themeTitle: 'Historic Landmarks & Artisan Bazaars',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'History' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Shopping' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Culture' }
    ]
  },
  {
    dayNumber: 4,
    themeTitle: 'Thrills, Scenic Lookouts & Adventure',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Adventure' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Sightseeing' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Nature' }
    ]
  },
  {
    dayNumber: 5,
    themeTitle: 'Waterfront Serenity & Sunset Relaxation',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Beach' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Sightseeing' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Shopping' }
    ]
  },
  {
    dayNumber: 6,
    themeTitle: 'Art, Heritage Museums & Ancient Quarters',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Culture' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'History' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Sightseeing' }
    ]
  },
  {
    dayNumber: 7,
    themeTitle: 'Hidden Gems, Botanical Parks & Local Vibes',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Nature' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Sightseeing' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Culture' }
    ]
  },
  {
    dayNumber: 8,
    themeTitle: 'Architectural Wonders & Royal Estates',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Sightseeing' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Nature' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'History' }
    ]
  },
  {
    dayNumber: 9,
    themeTitle: 'Gastronomy Trail, Night Markets & Souvenirs',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Culture' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Shopping' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Food' }
    ]
  },
  {
    dayNumber: 10,
    themeTitle: 'Panoramic Summit & Grand Farewell Gala',
    slots: [
      { time: '09:00 AM', timeOfDay: 'Morning', defaultDuration: 150, targetCategory: 'Sightseeing' },
      { time: '01:00 PM', timeOfDay: 'Afternoon', defaultDuration: 90, targetCategory: 'Food' },
      { time: '04:30 PM', timeOfDay: 'Evening', defaultDuration: 120, targetCategory: 'Shopping' },
      { time: '07:30 PM', timeOfDay: 'Night', defaultDuration: 90, targetCategory: 'Culture' }
    ]
  }
];

// Synthesizes unique non-repeating supplemental places when destination attractions run out
// Synthesizes unique non-repeating supplemental places when destination attractions run out
function generateSupplementalPlace(dest, targetCategory, timeOfDay, dayNumber, usedPlaces, form, planTheme = 'balanced') {
  const destName = dest.name || 'Destination';
  const isDomestic = !dest.isInternational;
  const isHill = dest.type === 'hill';
  const isBeach = dest.type === 'beach';
  const country = (dest.country || '').toLowerCase();

  let effectiveCat = targetCategory;
  if (effectiveCat === 'Beach' && !isBeach) {
    effectiveCat = isHill ? 'Nature' : 'Sightseeing';
  }

  const isEurope = country.includes('france') || country.includes('italy') || country.includes('uk') || country.includes('united kingdom') || country.includes('switzerland') || country.includes('germany');
  const isSEAsia = country.includes('thailand') || country.includes('indonesia') || country.includes('malaysia') || country.includes('singapore');
  const isJapan = country.includes('japan');

  let customName;
  if (effectiveCat === 'Food') {
    const euroFoods = [
      `${destName} Historic Trattoria & Artisan Dining`,
      `${destName} Riverside Bistro & Seasonal Delicacies`,
      `${destName} Old Town Patisserie & Specialty Bakery`,
      `${destName} Rooftop Vineyard Lounge & Tapas`,
      `${destName} Grand Heritage Cafe & Tea House`,
      `${destName} Classical Dining & Gourmet Supper`
    ];
    const jpFoods = [
      `${destName} Traditional Ramen Alley & Gyoza`,
      `${destName} Lantern-Lit Izakaya Skewer House`,
      `${destName} Fresh Sushi & Seafood Counter`,
      `${destName} Matcha Tea House & Traditional Sweets`,
      `${destName} Soba Noodle Master Kitchen`,
      `${destName} Kaiseki Multi-Course Dining`
    ];
    const seFoods = [
      `${destName} Night Hawker Street Food Feast`,
      `${destName} Riverside Floating Bistro & Seafood`,
      `${destName} Local Satay & Noodle Heritage Stall`,
      `${destName} Tropical Fruit & Coconut Sweet Market`,
      `${destName} Heritage Spice Kitchen & Curries`,
      `${destName} Rooftop Skyline Cocktail Lounge`
    ];
    const indFoods = [
      `${destName} Heritage Dining & Signature Thali`,
      `${destName} Sunset Rooftop Bistro & Regional Specialties`,
      `${destName} Legacy Food Street & Evening Street Bites`,
      `${destName} Artisan Filter Coffee House & Sweet Mart`,
      `${destName} Royal Courtyard Tandoori Grills`,
      `${destName} Riverside Garden Cafe & Organic Eats`
    ];
    const list = isEurope ? euroFoods : isJapan ? jpFoods : isSEAsia ? seFoods : isDomestic ? indFoods : euroFoods;
    customName = list.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Culinary Discovery`;
  } else if (effectiveCat === 'Sightseeing') {
    const sights = [
      `${destName} Panoramic Sky Deck & Promenade`,
      `${destName} Royal Plaza & Heritage Clock Tower`,
      `${destName} Botanical Gardens & Lake Walk`,
      `${destName} Waterfront Boulevard & Sunset Pier`,
      `${destName} Memorial Arch & Public Amphitheater`,
      `${destName} Heritage Gateway & Royal Avenue`,
      `${destName} Central Grand Square & Fountains`
    ];
    customName = sights.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Panoramic Viewpoint`;
  } else if (effectiveCat === 'Nature') {
    const natures = isHill ? [
      `${destName} Pine Ridge Mountain Overlook`,
      `${destName} Cascading Waterfalls & Pine Trail`,
      `${destName} Alpine Valley View Nature Reserve`,
      `${destName} Highland Lake Reflection Walk`,
      `${destName} Misty Ridge Summit Panorama`
    ] : [
      `${destName} Valley View Nature Reserve & Trails`,
      `${destName} Eco-Diversity Park & Butterfly Sanctuary`,
      `${destName} Lakeside Wetland Walk & Birding Trail`,
      `${destName} Botanical Conservatory & Canopy Walk`,
      `${destName} Riverbend Green Parkway & Gardens`
    ];
    customName = natures.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Nature Trail`;
  } else if (effectiveCat === 'Beach') {
    const beaches = [
      `${destName} Golden Sands Coastal Cove`,
      `${destName} Lighthouse Cliff & Rocky Shore`,
      `${destName} Palm Grove Bay & Coastal Trail`,
      `${destName} Sunset Beach Pavilion & Boardwalk`,
      `${destName} Coral Bay Lagoon & Seaside Shacks`
    ];
    customName = beaches.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Coastal Lookout`;
  } else if (effectiveCat === 'History') {
    const histories = [
      `${destName} Fortified Citadel & Rampart Bastions`,
      `${destName} Ancient Palace Ruins & Stone Pillars`,
      `${destName} Colonial Archives & Historic Mint`,
      `${destName} Victory Cenotaph & Heritage Pavilion`,
      `${destName} Old City Ramparts & Bastion Walk`
    ];
    customName = histories.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Heritage Monument`;
  } else if (effectiveCat === 'Culture') {
    const cultures = [
      `${destName} Folk Arts & Regional Craft Museum`,
      `${destName} Living Heritage Village & Pottery Guild`,
      `${destName} Cultural Performance Hall & Amphitheater`,
      `${destName} Sacred Heritage Temple & Courtyard`,
      `${destName} Traditional Textile Guild & Artisan Looms`
    ];
    customName = cultures.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Cultural Center`;
  } else if (effectiveCat === 'Shopping') {
    const shops = [
      `${destName} Artisan Spice Market & Silk Bazaar`,
      `${destName} Night Crafts Market & Souvenir Row`,
      `${destName} Central Heritage Arcade & Antique Stores`,
      `${destName} Local Producers Bazaar & Handicrafts`,
      `${destName} Waterfront Boutique Promenade`
    ];
    customName = shops.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Local Bazaar`;
  } else {
    const adventures = [
      `${destName} High-Rope Challenge & Zip-line Course`,
      `${destName} River Rafting / Kayak Launch Point`,
      `${destName} Quad Bike Safari & Off-Road Track`,
      `${destName} Cliffside Trek & Panoramic Viewpoint`,
      `${destName} Rock Climbing & Suspension Bridge`
    ];
    customName = adventures.find(n => !usedPlaces.has(n.toLowerCase())) || `${destName} Day ${dayNumber} Adventure Trail`;
  }

  const placeId = `supp-${dayNumber}-${timeOfDay.toLowerCase()}-${Date.now().toString(36).substr(-4)}`;
  usedPlaces.add(customName.toLowerCase());
  usedPlaces.add(placeId);

  return {
    id: placeId,
    name: customName,
    category: effectiveCat,
    price: effectiveCat === 'Food' ? (isDomestic ? 450 : 1500) : (isDomestic ? 100 : 500),
    rating: 4.8,
    location: `${destName} Central District`,
    description: `Specially curated ${effectiveCat} experience in ${destName} for Day ${dayNumber}.`,
    tags: [effectiveCat, 'Curated', 'Unique Experience']
  };
}

// Selects place for a specific slot ensuring 100% non-repetition across the entire trip
function selectPlaceForSlot(dest, slot, dayNumber, usedPlaces, form, planTheme = 'balanced') {
  const allPlaces = Array.isArray(dest.places) ? dest.places : [];
  const unusedCandidates = allPlaces.filter(p => !usedPlaces.has(p.id) && !usedPlaces.has(p.name.toLowerCase()));

  const targetCategory = slot.targetCategory || 'Sightseeing';
  const calcScore = (p) => scorePlace(p, form.interests, 1000, null, form.foodPreference, planTheme);

  // 1. Try to find an unused candidate matching the target category
  let categoryMatches = unusedCandidates.filter(p => p.category === targetCategory);

  // If slot is Beach but destination is Hill, adapt category to Nature
  if (categoryMatches.length === 0 && targetCategory === 'Beach') {
    categoryMatches = unusedCandidates.filter(p => p.category === 'Nature');
  }

  if (categoryMatches.length > 0) {
    categoryMatches.sort((a, b) => calcScore(b) - calcScore(a));
    const chosen = categoryMatches[0];
    usedPlaces.add(chosen.id);
    usedPlaces.add(chosen.name.toLowerCase());
    return chosen;
  }

  // 2. If no exact category match, try any unused candidate from the destination sorted by theme score
  if (unusedCandidates.length > 0) {
    unusedCandidates.sort((a, b) => calcScore(b) - calcScore(a));
    const chosen = unusedCandidates[0];
    usedPlaces.add(chosen.id);
    usedPlaces.add(chosen.name.toLowerCase());
    return chosen;
  }

  // 3. Candidates exhausted: synthesize an authentic, non-repeating supplemental place
  return generateSupplementalPlace(dest, targetCategory, slot.timeOfDay, dayNumber, usedPlaces, form, planTheme);
}


// Generate Day Plan with 4 slots (Morning, Afternoon, Evening, Night) and distinct activities
function generateDayPlan(dayNumber, dateStr, destination, form, usedPlaces, planTheme = 'balanced') {
  const themeRotation = DAY_THEME_ROTATIONS[(dayNumber - 1) % DAY_THEME_ROTATIONS.length];
  const dayActivities = [];

  for (let i = 0; i < themeRotation.slots.length; i++) {
    const slot = themeRotation.slots[i];
    const chosen = selectPlaceForSlot(destination, slot, dayNumber, usedPlaces, form, planTheme);

    let reasonText = `Curated for Day ${dayNumber} (${themeRotation.themeTitle}) in ${destination.name}. Rated ${chosen.rating}★.`;
    if (form.interests && chosen.tags && chosen.tags.some(t => form.interests.includes(t))) {
      const matched = chosen.tags.find(t => form.interests.includes(t));
      reasonText = `Matches your preference for ${matched} & highly recommended (${chosen.rating}★).`;
    }
    if (chosen.price === 0) {
      reasonText += ' Free entry, great for keeping within budget.';
    }

    let costCat = 'Activities';
    if (chosen.category === 'Food') costCat = 'Food';
    else if (chosen.category === 'Hotel') costCat = 'Hotel';
    else if (chosen.category === 'Shopping') costCat = 'Shopping';

    dayActivities.push({
      id: `act-${dayNumber}-${i + 1}-${Date.now().toString(36).substr(-4)}`,
      placeId: chosen.id,
      name: chosen.name,
      category: chosen.category || slot.targetCategory || 'Sightseeing',
      time: slot.time,
      timeOfDay: slot.timeOfDay,
      durationMinutes: chosen.category === 'Food' ? 90 : slot.defaultDuration,
      location: chosen.location || destination.name,
      cost: chosen.price || 0,
      costCategory: costCat,
      distance: `${(1.2 + (i * 0.8)).toFixed(1)} km`,
      notes: `Suggested timing: ${slot.timeOfDay} • ${themeRotation.themeTitle}`,
      reason: reasonText
    });
  }

  return {
    id: `day-${dayNumber}-${Date.now().toString(36).substr(-4)}`,
    day: dayNumber,
    dayNumber: dayNumber,
    date: dateStr,
    themeTitle: themeRotation.themeTitle,
    notes: `Day ${dayNumber}: ${themeRotation.themeTitle} in ${destination.name}`,
    activities: dayActivities
  };
}

// Generate single full trip with EXACT number of days requested (1, 3, 5, 7, 10 days)
// Day 1 ≠ Day 2 ≠ Day 3 ≠ Day N with 100% non-repeating places & activities
function generateTripItinerary(form, destinationData = null, planTheme = 'balanced') {
  const targetId = form.destinationId || form.destinationName || 'hyderabad';
  let dest = destinationData;

  if (!dest) {
    dest = staticDestinations.find(d => d.id === targetId || d.name.toLowerCase() === targetId.toLowerCase());
    if (!dest && GLOBAL_KNOWLEDGE_BASE[targetId.toLowerCase()]) {
      dest = GLOBAL_KNOWLEDGE_BASE[targetId.toLowerCase()];
    }
  }

  // Fallback to dynamic synthesis if not found
  if (!dest) {
    const { generateDynamicDestination } = require('./destinationService');
    dest = generateDynamicDestination(targetId);
  }

  const requestedDays = Number(form.numberOfDays) > 0
    ? Number(form.numberOfDays)
    : Number(form.daysCount) > 0
      ? Number(form.daysCount)
      : (form.days && Array.isArray(form.days) && form.days.length > 0)
        ? form.days.length
        : countDays(form.startDate, form.endDate);
  const numDays = Math.max(1, Math.min(14, requestedDays));
  const calculatedEndDate = addDays(form.startDate, numDays - 1);

  // Global used places Set maintained across all days
  const usedPlaces = new Set();
  const days = [];

  // Generate EXACTLY numDays days with strictly unique places per day
  for (let d = 1; d <= numDays; d++) {
    const dayDate = addDays(form.startDate, d - 1);
    const dayPlan = generateDayPlan(d, dayDate, dest, { ...form, numberOfDays: numDays, daysCount: numDays }, usedPlaces, planTheme);
    days.push(dayPlan);
  }

  // Required console logs
  console.log('selected numberOfDays:', numDays);
  console.log('generated itinerary length:', days.length);
  console.log('generated day numbers:', days.map(d => d.dayNumber));

  // Generate realistic commercial plane trip / flight connecting origin to destination
  const planeTrip = generatePlaneTripSync({
    fromLocation: form.fromLocation || 'Current Location',
    destinationName: dest.name,
    startDate: form.startDate,
    endDate: calculatedEndDate,
    travelers: Number(form.travelers) || 1,
    travelStyle: form.travelStyle || 'Balanced',
    currency: form.currency || dest.currency || 'INR',
    currencySymbol: form.currencySymbol || dest.currencySymbol || '₹'
  });

  // Curate stay matching travel style
  const defaultStay = (dest.stays && (dest.stays.find(s => form.travelStyle === 'Luxury' ? s.type === 'Luxury' : form.travelStyle === 'Budget' ? s.type === 'Budget' : s.type === 'Mid-Range') || dest.stays[0])) || {
    name: `${dest.name} Premier Stay`,
    type: 'Comfort',
    price: dest.hotelRate || 2500,
    rating: 4.6,
    location: dest.name,
    safetyInfo: 'Verified 24/7 Security & Sanitized'
  };

  const defaultFood = (dest.foods && dest.foods[0]) ? {
    id: 'food-plan-1',
    name: dest.foods[0].name,
    category: dest.foods[0].category,
    dailyCost: dest.foodRate || 800,
    description: `Authentic regional dining at ${dest.foods[0].location || dest.name}`
  } : {
    id: 'food-plan-1',
    name: 'Curated Local Cuisine & Cafes',
    category: 'Local Favorites',
    dailyCost: dest.foodRate || 800,
    description: 'Local culinary specialties and hygienic eateries'
  };

  const defaultTransport = {
    id: 'trans-default',
    type: form.travelStyle === 'Budget' ? 'Public Transit' : 'Cab',
    label: form.travelStyle === 'Budget' ? 'Metro & Shared Transit' : 'Private AC Cab / Chauffeur',
    dailyRate: form.travelStyle === 'Budget' ? 350 : (dest.transportRate || 850)
  };

  const trip = {
    destinationId: dest.id,
    destinationName: dest.name,
    country: dest.country || 'Global Destination',
    isInternational: !!dest.isInternational,
    destinationType: dest.type,
    fromLocation: form.fromLocation || 'Current Location',
    startDate: form.startDate,
    endDate: calculatedEndDate,
    numberOfDays: numDays,
    daysCount: numDays,
    budget: Number(form.budget) || 25000,
    currency: form.currency || dest.currency || 'INR',
    currencySymbol: form.currencySymbol || dest.currencySymbol || '₹',
    travelers: Number(form.travelers) || 1,
    interests: form.interests || ['Nature', 'Food'],
    foodPreference: form.foodPreference || 'No Preference',
    travelStyle: form.travelStyle || 'Balanced',
    selectedHotel: defaultStay,
    selectedFood: defaultFood,
    selectedTransport: defaultTransport,
    coupon: null,
    booking: {
      status: 'Not Booked'
    },
    days: days,
    itinerary: days,
    planeTrip: planeTrip,
    flightDetails: planeTrip,
    status: 'Upcoming',
    source: 'rule-based',
    isDemo: true,
    planTheme: planTheme
  };

  return trip;
}

/**
 * Generates MULTIPLE SUITABLE PLANS (Plan A, Plan B, Plan C, Plan D)
 * As required:
 * Plan A – History & Heritage
 * Plan B – Food & Culture
 * Plan C – City Exploration
 * Plan D – Photography & Local Experience
 */
function generateMultiplePlans(form, destinationData = null) {
  const planVariants = [
    {
      planId: 'plan-a',
      planLetter: 'A',
      title: 'Plan A – History & Heritage',
      theme: 'history',
      badge: 'Heritage & Monuments',
      tagline: 'Deep dive into monumental architecture, ancient lore, royal quarters & iconic heritage sights.',
      focus: 'Heritage Sights, Forts, Museums & Cultural Walks'
    },
    {
      planId: 'plan-b',
      planLetter: 'B',
      title: 'Plan B – Food & Culture',
      theme: 'food',
      badge: 'Culinary & Culture',
      tagline: 'Savor legendary regional flavors, street food trails, artisan markets & atmospheric evening cafes.',
      focus: 'Authentic Street Food, Signature Dining, Night Bazaars & Tasting Walks'
    },
    {
      planId: 'plan-c',
      planLetter: 'C',
      title: 'Plan C – City Exploration',
      theme: 'city',
      badge: 'Must-See Highlights',
      tagline: 'High-energy journey through iconic central landmarks, bustling shopping streets & famous plazas.',
      focus: 'City Center, Top Panoramic Lookouts, Landmark Squares & Shopping Hubs'
    },
    {
      planId: 'plan-d',
      planLetter: 'D',
      title: 'Plan D – Photography & Local Experience',
      theme: 'photography',
      badge: 'Photography & Nature',
      tagline: 'Golden hour vantage points, tranquil scenic nature strolls, hidden gems & local neighborhood vibes.',
      focus: 'Scenic Viewpoints, Sunrise / Sunset Spots, Hidden Gems & Relaxed Pacing'
    }
  ];

  return planVariants.map(variant => {
    const trip = generateTripItinerary(form, destinationData, variant.theme);
    const budgetStats = computeBudget(trip, destinationData);
    return {
      ...variant,
      trip: {
        ...trip,
        planTitle: variant.title,
        budgetStats
      }
    };
  });
}

// Generate smart packing list tailored to destination (Domestic vs International, Beach/Hill/City)
function generatePackingList(trip, destinationData = null) {
  const dest = destinationData || staticDestinations.find(d => d.id === trip.destinationId) || staticDestinations[0];
  const days = Number(trip.numberOfDays) > 0
    ? Number(trip.numberOfDays)
    : Number(trip.daysCount) > 0
      ? Number(trip.daysCount)
      : (trip.days && Array.isArray(trip.days) && trip.days.length > 0)
        ? trip.days.length
        : countDays(trip.startDate, trip.endDate);
  const items = [];
  let idCounter = 1;

  const addItem = (group, label) => {
    items.push({
      id: `pkg-${idCounter++}`,
      group,
      label,
      checked: false
    });
  };

  // Base Documents & Identification
  if (dest.isInternational) {
    addItem('Documents', 'Official Passport (min. 6 months validity from travel date)');
    addItem('Documents', 'Visa / eVisa approval letter or Visa-on-Arrival documentation');
    addItem('Documents', 'International Travel Insurance certificate & emergency card');
    addItem('Documents', 'Return flight boarding passes & hotel booking confirmations');
    addItem('Electronics', 'Universal Travel Power Adapter (plug converter for country)');
    addItem('Currency', `${dest.currency || 'USD'} foreign currency cash & international forex card`);
  } else {
    addItem('Documents', 'Government Photo ID (Aadhaar / Voter ID / Driver License)');
    addItem('Documents', 'Train / Flight tickets and hotel reservation vouchers');
    addItem('Documents', 'Emergency medical insurance card');
  }

  // Base Electronics
  addItem('Electronics', 'Smartphone and high-speed fast charging cable');
  addItem('Electronics', '10,000mAh+ Portable Power Bank');
  addItem('Electronics', 'Earphones or travel headphones');

  // Toiletries
  addItem('Toiletries', 'Travel-size toothbrush, toothpaste & dental floss');
  addItem('Toiletries', 'Sunscreen lotion (SPF 50+) & soothing lip balm');
  addItem('Toiletries', 'Hand sanitizer gel and wet disinfectant wipes');

  // Health and safety
  addItem('Health and safety', 'Basic medical kit (painkillers, antacids, band-aids, ORS hydration)');
  addItem('Health and safety', 'Any personal prescription medicines');

  // Duration scaled clothing
  const shirtCount = Math.min(days + 1, 7);
  addItem('Clothing', `Comfortable daily casual outfits (${shirtCount} sets for ${days}-day trip)`);
  addItem('Clothing', 'Comfortable cushioned walking sneakers');
  addItem('Clothing', 'Undergarments and extra pair of cotton socks');

  // Destination Type rules
  if (dest.type === 'beach') {
    addItem('Clothing', 'Quick-dry swimsuits / board shorts & sarong');
    addItem('Clothing', 'Breathable linen shirts and flip-flops');
    addItem('Activity essentials', 'UV-protection sunglasses with neck strap');
    addItem('Activity essentials', 'Sand-free microfiber beach towel & waterproof dry pouch');
  } else if (dest.type === 'hill') {
    addItem('Clothing', 'Warm thermal innerwear (top & bottoms)');
    addItem('Clothing', 'Insulated fleece jacket or down parka');
    addItem('Activity essentials', 'Woolen beanie cap, neck muffler, and warm gloves');
    addItem('Activity essentials', 'Sturdy high-traction hiking / trekking shoes');
  } else {
    addItem('Clothing', 'Modest lightweight breathable cotton outfits for cultural sites');
    addItem('Clothing', 'Slip-on shoes convenient for entering monuments & temples');
    addItem('Activity essentials', 'Wide-brim sun hat or cotton scarf');
  }

  if (trip.interests && trip.interests.includes('Adventure')) {
    addItem('Activity essentials', 'Compact headlamp / mini torch and reusable water bottle');
  }

  return items;
}

module.exports = {
  countDays,
  addDays,
  computeBudget,
  scorePlace,
  generateDayPlan,
  generateTripItinerary,
  generateMultiplePlans,
  generatePackingList,
  DAY_THEME_ROTATIONS
};
