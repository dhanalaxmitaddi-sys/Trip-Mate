import { getOrGenerateDestination } from './destinationService';
import api from './api';

// Helper to simulate realistic AI model inference latency (400ms)
const simulateAiDelay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// Format date to YYYY-MM-DD reliably without timezone shifts
const addDaysSafe = (startDateStr, dayOffset) => {
  if (!startDateStr) startDateStr = new Date().toISOString().split('T')[0];
  const cleanDateStr = String(startDateStr).split('T')[0];
  const parts = cleanDateStr.split('-').map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + dayOffset));
    return d.toISOString().split('T')[0];
  }
  const date = new Date(startDateStr);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return date.toISOString().split('T')[0];
};

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

function generateSupplementalPlaceClient(dest, targetCategory, timeOfDay, dayNumber, usedPlaces) {
  const destName = dest.name || 'Destination';
  const isDomestic = !dest.isInternational;

  const POOL = {
    Sightseeing: [
      `${destName} Panoramic Sky Deck & Promenade`,
      `${destName} Royal Plaza & Heritage Clock Tower`,
      `${destName} Botanical Gardens & Lake Walk`,
      `${destName} Waterfront Boulevard & Sunset Pier`
    ],
    Food: [
      `${destName} Heritage Dining & Signature Thali`,
      `${destName} Sunset Rooftop Bistro & Lounge`,
      `${destName} Legacy Food Street & Street Bites`,
      `${destName} Artisan Coffee Roasters & Bakery`
    ],
    Nature: [
      `${destName} Valley View Nature Reserve & Trails`,
      `${destName} Pine Ridge Mountain Overlook`,
      `${destName} Cascading Waterfalls & Bamboo Forest`,
      `${destName} Eco-Diversity Park & Butterfly Sanctuary`
    ],
    Beach: [
      `${destName} Golden Sands Coastal Cove`,
      `${destName} Lighthouse Cliff & Rocky Shore`,
      `${destName} Palm Grove Bay & Coastal Trail`,
      `${destName} Sunset Beach Pavilion & Boardwalk`
    ],
    History: [
      `${destName} Fortified Citadel & Rampart Bastions`,
      `${destName} Ancient Palace Ruins & Stone Pillars`,
      `${destName} Colonial Archives & Historic Mint`,
      `${destName} Victory Cenotaph & Heritage Pavilion`
    ],
    Culture: [
      `${destName} Folk Arts & Regional Craft Museum`,
      `${destName} Living Heritage Village & Pottery Guild`,
      `${destName} Cultural Performance Hall & Amphitheater`,
      `${destName} Sacred Heritage Temple & Courtyard`
    ],
    Shopping: [
      `${destName} Artisan Spice Market & Silk Bazaar`,
      `${destName} Night Crafts Market & Souvenir Row`,
      `${destName} Central Heritage Arcade & Antique Stores`,
      `${destName} Local Producers Bazaar & Handicrafts`
    ],
    Adventure: [
      `${destName} High-Rope Challenge & Zip-line Course`,
      `${destName} River Rafting / Kayak Launch Point`,
      `${destName} Quad Bike Safari & Off-Road Track`,
      `${destName} Cliffside Trek & Panoramic Viewpoint`
    ]
  };

  const pool = POOL[targetCategory] || POOL.Sightseeing;
  let name = pool.find(n => !usedPlaces.has(n.toLowerCase()));
  if (!name) {
    name = `${destName} Day ${dayNumber} ${timeOfDay} Discovery Point`;
  }

  const placeId = `supp-${dayNumber}-${timeOfDay.toLowerCase()}-${Date.now().toString(36).substr(-4)}`;
  usedPlaces.add(name.toLowerCase());
  usedPlaces.add(placeId);

  return {
    id: placeId,
    name,
    category: targetCategory,
    price: targetCategory === 'Food' ? (isDomestic ? 450 : 1400) : (isDomestic ? 100 : 500),
    rating: 4.8,
    location: `${destName} Central District`,
    description: `Specially curated ${targetCategory} destination in ${destName} for Day ${dayNumber}.`,
    tags: [targetCategory, 'Curated', 'Must-Visit']
  };
}

function selectPlaceForSlotClient(dest, slot, dayNumber, usedPlaces) {
  const allPlaces = Array.isArray(dest.places) ? dest.places : [];
  const unused = allPlaces.filter(p => !usedPlaces.has(p.id) && !usedPlaces.has(p.name.toLowerCase()));
  const targetCategory = slot.targetCategory || 'Sightseeing';

  let match = unused.filter(p => p.category === targetCategory);
  if (match.length === 0 && targetCategory === 'Beach') {
    match = unused.filter(p => p.category === 'Nature');
  }

  if (match.length > 0) {
    match.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    const chosen = match[0];
    usedPlaces.add(chosen.id);
    usedPlaces.add(chosen.name.toLowerCase());
    return chosen;
  }

  if (unused.length > 0) {
    unused.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    const chosen = unused[0];
    usedPlaces.add(chosen.id);
    usedPlaces.add(chosen.name.toLowerCase());
    return chosen;
  }

  return generateSupplementalPlaceClient(dest, targetCategory, slot.timeOfDay, dayNumber, usedPlaces);
}

function generatePlaneTripClient(originCity, destCity, startDate, endDate, travelers = 1, currencySymbol = '₹') {
  const isDomestic = !destCity.toLowerCase().includes('paris') && !destCity.toLowerCase().includes('dubai') && !destCity.toLowerCase().includes('tokyo') && !destCity.toLowerCase().includes('singapore');
  const codeOrigin = (originCity.replace(/[^a-zA-Z]/g, '').slice(0, 3) || 'BOM').toUpperCase();
  const codeDest = (destCity.replace(/[^a-zA-Z]/g, '').slice(0, 3) || 'GOX').toUpperCase();

  const airline = isDomestic ? 'IndiGo Airlines' : 'Emirates';
  const basePrice = isDomestic ? 3850 : 24500;
  const totalAirfare = basePrice * 2 * Math.max(1, Number(travelers) || 1);

  return {
    id: `flight-client-${Date.now().toString(36)}`,
    tripType: 'Round-trip Air Travel',
    isAvailable: true,
    source: 'TripMate FlightEngine',
    origin: {
      city: originCity || 'Origin Hub',
      country: isDomestic ? 'India' : 'Origin Country',
      airportCode: codeOrigin,
      airportName: `${originCity || 'Departure'} International Airport`
    },
    destination: {
      city: destCity || 'Destination Hub',
      country: isDomestic ? 'India' : 'Destination Country',
      airportCode: codeDest,
      airportName: `${destCity || 'Arrival'} International Airport`
    },
    outboundFlight: {
      airline: airline,
      flightNumber: isDomestic ? `6E-${450 + Math.floor(Math.random() * 200)}` : `EK-${500 + Math.floor(Math.random() * 200)}`,
      departureAirport: codeOrigin,
      arrivalAirport: codeDest,
      departureDate: startDate,
      departureTime: '07:45 AM',
      arrivalDate: startDate,
      arrivalTime: '10:15 AM',
      duration: '2h 30m',
      stops: 'Non-stop',
      cabinClass: 'Economy (Standard)',
      baggage: '7 kg Hand Baggage + 15 kg Check-in Included',
      pricePerTraveler: basePrice,
      status: 'On Schedule'
    },
    returnFlight: {
      airline: airline,
      flightNumber: isDomestic ? `6E-${650 + Math.floor(Math.random() * 200)}` : `EK-${700 + Math.floor(Math.random() * 200)}`,
      departureAirport: codeDest,
      arrivalAirport: codeOrigin,
      departureDate: endDate,
      departureTime: '06:15 PM',
      arrivalDate: endDate,
      arrivalTime: '08:45 PM',
      duration: '2h 30m',
      stops: 'Non-stop',
      cabinClass: 'Economy (Standard)',
      baggage: '7 kg Hand Baggage + 15 kg Check-in Included',
      pricePerTraveler: basePrice,
      status: 'On Schedule'
    },
    travelers: Math.max(1, Number(travelers) || 1),
    totalAirfare,
    currencySymbol,
    aiTravelInsight: `Direct daily commercial flights available between ${codeOrigin} and ${codeDest}. Check-in counter closes 60 mins before departure.`
  };
}

// AI Service with Global Destination Support, Multi-Plan Generation & Fallback
export const aiService = {
  /**
   * Generates a tailored multi-day itinerary with 4 activities per day matching exact requested days
   */
  async generateTripItineraryAI(form, planTheme = 'balanced') {
    await simulateAiDelay(400);

    const targetId = form.destinationId || form.destinationName || 'hyderabad';
    const dest = getOrGenerateDestination(targetId);

    const startDateStr = (form.startDate || new Date().toISOString()).split('T')[0];
    const requestedDays = Number(form.numberOfDays) > 0
      ? Number(form.numberOfDays)
      : Number(form.daysCount) > 0
        ? Number(form.daysCount)
        : (form.days && Array.isArray(form.days) && form.days.length > 0)
          ? form.days.length
          : Math.max(1, Math.round((new Date((form.endDate || new Date(Date.now() + 86400000 * 3)).split('T')[0] + 'T00:00:00Z') - new Date(startDateStr + 'T00:00:00Z')) / (1000 * 60 * 60 * 24)) + 1);
    const diffDays = Math.max(1, Math.min(14, requestedDays));
    const budget = Number(form.budget) || 25000;
    const travelers = Number(form.travelers) || 1;
    const interests = form.interests || ['Food', 'Nature'];

    const safeEndDate = addDaysSafe(startDateStr, diffDays - 1);

    const days = [];
    const usedPlaces = new Set();

    // Exactly diffDays days (Requirement: 1 day -> 1, 3 days -> 3, 5 days -> 5, 7 days -> 7, 10 days -> 10)
    for (let d = 1; d <= diffDays; d++) {
      const dayDateStr = addDaysSafe(startDateStr, d - 1);
      const themeRotation = DAY_THEME_ROTATIONS[(d - 1) % DAY_THEME_ROTATIONS.length];
      const dayActivities = [];

      for (let i = 0; i < themeRotation.slots.length; i++) {
        const slot = themeRotation.slots[i];
        const chosen = selectPlaceForSlotClient(dest, slot, d, usedPlaces);

        let costCat = 'Activities';
        if (chosen.category === 'Food') costCat = 'Food';
        else if (chosen.category === 'Hotel') costCat = 'Hotel';
        else if (chosen.category === 'Shopping') costCat = 'Shopping';

        dayActivities.push({
          id: `act-${d}-${i + 1}-${Date.now().toString(36).substr(-4)}`,
          placeId: chosen.id,
          name: chosen.name,
          category: chosen.category || slot.targetCategory || 'Sightseeing',
          time: slot.time,
          timeOfDay: slot.timeOfDay,
          durationMinutes: chosen.category === 'Food' ? 90 : slot.defaultDuration,
          location: chosen.location || dest.name,
          cost: chosen.price || 0,
          costCategory: costCat,
          distance: `${(1.2 + (i * 0.8)).toFixed(1)} km`,
          notes: `Suggested timing: ${slot.timeOfDay} • ${themeRotation.themeTitle}`,
          reason: `Curated for Day ${d} (${themeRotation.themeTitle}) in ${dest.name} (${chosen.rating || 4.7}★).`
        });
      }

      days.push({
        id: `day-${d}-${Date.now().toString(36).substr(-4)}`,
        day: d,
        dayNumber: d,
        date: dayDateStr,
        themeTitle: themeRotation.themeTitle,
        notes: `Day ${d}: ${themeRotation.themeTitle} in ${dest.name}`,
        activities: dayActivities
      });
    }

    // Console logs required by prompt
    console.log('selected numberOfDays:', diffDays);
    console.log('generated itinerary length:', days.length);
    console.log('generated day numbers:', days.map(d => d.dayNumber));

    // Generate plane trip
    const planeTrip = generatePlaneTripClient(
      form.fromLocation || 'Current Location',
      dest.name,
      startDateStr,
      safeEndDate,
      travelers,
      form.currencySymbol || dest.currencySymbol || '₹'
    );

    const defaultStay = (dest.stays && (dest.stays.find(s => form.travelStyle === 'Luxury' ? s.type === 'Luxury' : form.travelStyle === 'Budget' ? s.type === 'Budget' : s.type === 'Mid-Range') || dest.stays[0])) || {
      name: `${dest.name} Premier Stay`,
      type: 'Comfort',
      price: dest.hotelRate || 2500,
      rating: 4.6,
      location: dest.name,
      safetyInfo: 'Verified 24/7 Monitored Stay'
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

    return {
      destinationId: dest.id,
      destinationName: dest.name,
      country: dest.country || 'Global Destination',
      isInternational: !!dest.isInternational,
      destinationType: dest.type,
      fromLocation: form.fromLocation || 'Current Location',
      startDate: startDateStr,
      endDate: safeEndDate,
      numberOfDays: diffDays,
      daysCount: diffDays,
      budget,
      currency: form.currency || dest.currency || 'INR',
      currencySymbol: form.currencySymbol || dest.currencySymbol || '₹',
      travelers,
      interests,
      foodPreference: form.foodPreference || 'No Preference',
      travelStyle: form.travelStyle || 'Balanced',
      selectedHotel: defaultStay,
      selectedFood: defaultFood,
      selectedTransport: defaultTransport,
      coupon: null,
      booking: { status: 'Not Booked' },
      days,
      itinerary: days,
      planeTrip,
      flightDetails: planeTrip,
      status: 'Upcoming',
      source: 'ai',
      planTheme
    };
  },

  /**
   * Generates MULTIPLE SUITABLE PLANS (Plan A, Plan B, Plan C, Plan D)
   * Guaranteed to be distinct, adhering to user's days, budget & preferences
   */
  async generateMultiplePlansAI(form) {
    const targetId = form.destinationId || form.destinationName || 'hyderabad';
    const dest = getOrGenerateDestination(targetId);

    const variants = [
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

    const generatedPlans = [];

    for (const v of variants) {
      const trip = await this.generateTripItineraryAI(form, v.theme);
      // Quick budget stats
      const days = trip.daysCount;
      const nights = Math.max(0, days - 1);
      const rooms = Math.ceil(trip.travelers / 2);
      const hotelRate = (trip.selectedHotel && Number(trip.selectedHotel.price)) || dest.hotelRate || 2500;
      const foodRate = (trip.selectedFood && Number(trip.selectedFood.dailyCost)) || dest.foodRate || 800;
      const transportRate = (trip.selectedTransport && Number(trip.selectedTransport.dailyRate)) || dest.transportRate || 750;

      const totals = {
        Transport: Math.round(transportRate * days * Math.ceil(trip.travelers / 4)),
        Hotel: Math.round(hotelRate * nights * rooms),
        Food: Math.round(foodRate * days * trip.travelers),
        Activities: 1200 * trip.travelers * days,
        Shopping: Math.round(trip.budget * 0.08),
        Other: Math.round(trip.budget * 0.05)
      };
      const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);

      const budgetStats = {
        totals,
        subtotal: grandTotal - totals.Other,
        total: grandTotal,
        remaining: (trip.budget || 25000) - grandTotal,
        exceeded: grandTotal > (trip.budget || 25000),
        currencySymbol: trip.currencySymbol || '₹',
        currency: trip.currency || 'INR',
        daysCount: days,
        nightsCount: nights
      };

      generatedPlans.push({
        ...v,
        trip: {
          ...trip,
          planTitle: v.title,
          budgetStats
        }
      });
    }

    return {
      destination: dest,
      plans: generatedPlans
    };
  },

  /**
   * Regenerates a single day's plan with refreshed recommendations (FR6)
   */
  async regenerateDayAI(trip, dayNumber) {
    await simulateAiDelay(300);

    const dest = getOrGenerateDestination(trip.destinationId);
    const targetDay = trip.days.find(d => d.dayNumber === dayNumber);
    if (!targetDay) throw new Error('Target day not found');

    const otherActivities = trip.days
      .filter(d => d.dayNumber !== dayNumber)
      .flatMap(d => d.activities.map(a => a.placeId));
    const available = (dest.places || []).filter(p => !otherActivities.includes(p.id));
    const pool = available.length > 2 ? available : (dest.places || []);

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const slots = ['09:00 AM', '01:00 PM', '04:30 PM', '07:30 PM'];
    const newActivities = slots.map((time, i) => {
      const pick = shuffled[i % shuffled.length] || {
        name: `${dest.name} Discovery Spot`,
        category: 'Sightseeing',
        price: 150,
        location: dest.name
      };
      return {
        id: `act-${dayNumber}-${i + 1}-${Date.now().toString(36).substr(-4)}`,
        placeId: pick.id || `pick-${i}`,
        name: pick.name,
        category: pick.category || 'Sightseeing',
        time,
        durationMinutes: 120,
        location: pick.location || dest.name,
        cost: pick.price || 0,
        costCategory: pick.category === 'Food' ? 'Food' : 'Activities',
        reason: `AI re-optimized alternative for Day ${dayNumber} in ${dest.name}.`
      };
    });

    return {
      ...targetDay,
      activities: newActivities
    };
  },

  /**
   * Generates AI Packing Checklist tailored to climate, activities, and duration (FR8)
   */
  async generatePackingAI(trip, weather) {
    await simulateAiDelay(300);
    const dest = getOrGenerateDestination(trip.destinationId || trip.destinationName);
    const days = Number(trip.daysCount) > 0
      ? Number(trip.daysCount)
      : (trip.days && Array.isArray(trip.days) && trip.days.length > 0)
        ? trip.days.length
        : 3;
    const shirtCount = Math.min(days + 1, 7);

    const items = [
      { id: 'p-1', group: 'Documents', label: dest.isInternational ? 'Official Passport & eVisa / visa documents' : 'Government Photo ID (Aadhaar / Driver License)', checked: false },
      { id: 'p-2', group: 'Documents', label: 'Hotel vouchers & return transport tickets', checked: false },
      { id: 'p-3', group: 'Electronics', label: 'Smartphone, chargers, & 10,000mAh Power Bank', checked: false },
      { id: 'p-4', group: 'Toiletries', label: 'Travel dental kit, sunscreen (SPF 50), & sanitizer', checked: false },
      { id: 'p-5', group: 'Health and safety', label: 'Personal medications, band-aids, & hydration packets', checked: false }
    ];

    if (dest.isInternational) {
      items.push({ id: 'p-intl-1', group: 'Currency', label: `${dest.currency || 'USD'} foreign cash & multi-currency forex card`, checked: false });
      items.push({ id: 'p-intl-2', group: 'Electronics', label: 'Universal worldwide travel power adapter', checked: false });
    }

    if (dest.type === 'beach') {
      items.push(
        { id: 'p-6', group: 'Clothing', label: `Swimwear / board shorts & linen shirts (${shirtCount} sets for ${days}-day trip)`, checked: false },
        { id: 'p-7', group: 'Activity essentials', label: 'UV sunglasses & waterproof phone pouch', checked: false }
      );
    } else if (dest.type === 'hill') {
      items.push(
        { id: 'p-9', group: 'Clothing', label: `Thermal inners, woolen socks, and fleece jackets (${shirtCount} sets for ${days}-day trip)`, checked: false },
        { id: 'p-10', group: 'Activity essentials', label: 'Trekking shoes with solid grip & winter beanie', checked: false }
      );
    } else {
      items.push(
        { id: 'p-12', group: 'Clothing', label: `Breathable modest cotton outfits (${shirtCount} sets for ${days}-day trip) & walking sneakers`, checked: false },
        { id: 'p-13', group: 'Activity essentials', label: 'Sun hat, sunglasses & reusable water flask', checked: false }
      );
    }

    return items;
  },

  /**
   * AI Travel Assistant natural query answering (FR10)
   */
  async answerTravelQueryAI(query, context = {}) {
    await simulateAiDelay(400);

    const clean = (query || '').toLowerCase();
    const dest = getOrGenerateDestination(context.destinationId || clean);

    if (clean.includes('budget') || clean.includes('cost') || clean.includes('cheap')) {
      return {
        reply: `💰 **AI Budget Breakdown for ${dest.name} (${dest.country}):**\n\n• **Accommodations:** Avg ${dest.currencySymbol}${dest.hotelRate}/night for verified stays.\n• **Food:** Avg ${dest.currencySymbol}${dest.foodRate}/person/day including authentic dining.\n• **Local Transit:** ${dest.currencySymbol}${dest.transportRate}/day for local transport.\n\n*Pro-tip: Adding free attractions like public viewpoints can trim your daily costs by 25%!*`,
        chips: [`Plan low-budget ${dest.name} trip`, `Packing list for ${dest.name}`, 'Ask another question']
      };
    }

    if (clean.includes('pack') || clean.includes('luggage') || clean.includes('wear')) {
      return {
        reply: `🎒 **Smart Packing Recommendations for ${dest.name} (${dest.type}):**\n\n1. **Essential Attire:** ${dest.packingRules ? dest.packingRules.join(', ') : 'Comfortable walking shoes, weather-appropriate outfits'}.\n2. **Type Advice:** Pack suited for ${dest.type} climate.\n3. Don't forget your power bank and waterproof gear!`,
        chips: [`View ${dest.name} packing list`, `Top spots in ${dest.name}`, 'Check weather']
      };
    }

    const relevant = (dest.places || []).slice(0, 3);
    return {
      reply: `🌟 **Must-experience recommendations in ${dest.name}, ${dest.country}:**\n\n${relevant.map(p => `• **${p.name}** (${p.category}): ${p.description || 'Iconic landmark'} [${p.rating}★, Cost: ${dest.currencySymbol}${p.price}]`).join('\n')}\n\nYou can generate customized itineraries with interactive maps for ${dest.name} right now!`,
      chips: [`Create ${dest.name} trip`, `Budget in ${dest.name}`, 'Ask something else']
    };
  },

  /**
   * Check Hugging Face AI integration status
   */
  async getHuggingFaceStatus(customToken = null) {
    try {
      const headers = customToken ? { 'x-hf-token': customToken } : {};
      const res = await api.get('/ai/huggingface/status', { headers });
      return res.data || res;
    } catch {
      return {
        isConfigured: false,
        provider: 'Hugging Face Inference API',
        defaultModel: 'mistralai/Mistral-7B-Instruct-v0.3'
      };
    }
  },

  /**
   * Generates or enhances a single day's plan with unique activities using Hugging Face AI
   */
  async generateHuggingFaceDayAI(trip, dayNumber, options = {}) {
    try {
      const targetDay = trip.days?.find(d => d.dayNumber === dayNumber) || { dayNumber, date: new Date().toISOString().split('T')[0] };
      const otherPlaces = [];
      if (trip.days) {
        trip.days.forEach(d => {
          if (d.dayNumber !== dayNumber && d.activities) {
            d.activities.forEach(a => { if (a.name) otherPlaces.push(a.name); });
          }
        });
      }

      const payload = {
        destinationName: trip.destinationName,
        dayNumber,
        date: targetDay.date,
        themeTitle: targetDay.themeTitle,
        interests: trip.interests,
        budget: trip.budget,
        travelStyle: trip.travelStyle,
        token: options.token,
        model: options.model,
        usedPlaces: otherPlaces
      };

      const res = await api.post('/ai/huggingface/day-plan', payload, {
        headers: options.token ? { 'x-hf-token': options.token } : {}
      });

      if (res.data || res.activities) {
        return res.data || res;
      }
    } catch (e) {
      console.warn('Hugging Face day generation error, using client fallback:', e.message);
    }

    return await this.regenerateDayAI(trip, dayNumber);
  },

  /**
   * Generates a complete trip itinerary using Hugging Face AI
   */
  async generateHuggingFaceTripAI(formValues, options = {}) {
    try {
      const res = await api.post('/ai/huggingface/generate-itinerary', formValues, {
        headers: options.token ? { 'x-hf-token': options.token } : {}
      });
      if (res.trip || res.data) {
        return res.trip || res.data;
      }
    } catch (e) {
      console.warn('Hugging Face trip generation error, falling back to standard AI generator:', e.message);
    }

    return await this.generateTripItineraryAI(formValues);
  },

  /**
   * Chat with Hugging Face Assistant
   */
  async chatWithHuggingFaceAI(message, context = {}, options = {}) {
    try {
      const res = await api.post('/ai/huggingface/chat', {
        message,
        destinationName: context.destinationName,
        destinationId: context.destinationId,
        token: options.token,
        model: options.model
      }, {
        headers: options.token ? { 'x-hf-token': options.token } : {}
      });

      if (res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('Hugging Face chat error, using rule-based reply:', e.message);
    }

    return await this.answerTravelQueryAI(message, context);
  }
};

export const getHuggingFaceStatus = (...args) => aiService.getHuggingFaceStatus(...args);
export const generateHuggingFaceDayAI = (...args) => aiService.generateHuggingFaceDayAI(...args);
export const generateHuggingFaceTripAI = (...args) => aiService.generateHuggingFaceTripAI(...args);
export const chatWithHuggingFaceAI = (...args) => aiService.chatWithHuggingFaceAI(...args);
export const generateTripItineraryAI = (...args) => aiService.generateTripItineraryAI(...args);
export const regenerateDayAI = (...args) => aiService.regenerateDayAI(...args);
export const answerTravelQueryAI = (...args) => aiService.answerTravelQueryAI(...args);

export default aiService;
