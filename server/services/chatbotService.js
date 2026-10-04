const destinations = require('../data/destinations');

const INTENTS = [
  {
    name: 'destination',
    keywords: ['goa', 'manali', 'jaipur', 'delhi', 'mumbai', 'kerala', 'city', 'place', 'where to go', 'destination']
  },
  {
    name: 'budget',
    keywords: ['low budget', 'cheap', 'affordable', 'cost', 'expensive', 'money', 'price', 'rates', 'save']
  },
  {
    name: 'interests',
    keywords: ['beaches', 'beach', 'temple', 'temples', 'food', 'adventure', 'trek', 'nature', 'culture', 'shopping', 'history', 'wildlife']
  },
  {
    name: 'packing',
    keywords: ['pack', 'packing', 'luggage', 'carry', 'clothes', 'jacket', 'shoes', 'sunscreen', 'bag']
  },
  {
    name: 'hotels',
    keywords: ['hotel', 'stay', 'resort', 'accommodation', 'hostel', 'room', 'booking']
  },
  {
    name: 'food',
    keywords: ['food', 'restaurant', 'eat', 'cuisine', 'dishes', 'cafe', 'thali', 'dinner', 'lunch', 'breakfast']
  },
  {
    name: 'attractions',
    keywords: ['attractions', 'visit', 'see', 'sightseeing', 'places', 'must visit', 'monuments', 'fort']
  },
  {
    name: 'itinerary',
    keywords: ['plan', 'itinerary', 'days', 'schedule', 'route', 'trip', 'create trip', 'generate']
  }
];

function sanitize(text) {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
}

function detectIntent(message) {
  const clean = sanitize(message);
  const words = clean.split(/\s+/).filter(Boolean);

  let bestIntent = 'fallback';
  let bestScore = 0;

  INTENTS.forEach(intent => {
    let score = 0;
    intent.keywords.forEach(kw => {
      if (kw.includes(' ')) {
        if (clean.includes(kw)) score += 2;
      } else {
        if (words.includes(kw)) score += 1;
      }
    });
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent.name;
    }
  });

  // Extract destination entity
  let detectedDestination = null;
  const destKeys = ['goa', 'manali', 'jaipur', 'delhi', 'mumbai', 'kerala'];
  for (const dk of destKeys) {
    if (clean.includes(dk)) {
      detectedDestination = destinations.find(d => d.id === dk);
      break;
    }
  }

  return {
    intent: bestIntent,
    score: bestScore,
    destination: detectedDestination
  };
}

function generateAssistantReply(message, context = {}) {
  const { intent, destination } = detectIntent(message);
  const targetDest = destination || (context.currentDestinationId ? destinations.find(d => d.id === context.currentDestinationId) : null);

  // Suggestions chips for quick follow-ups
  const defaultChips = [
    "Plan a low-budget trip to Goa",
    "What should I pack for Manali?",
    "Show beaches in Kerala",
    "I need hotels in Jaipur",
    "Best street food in Delhi"
  ];

  switch (intent) {
    case 'destination':
      if (targetDest) {
        return {
          reply: `**${targetDest.name} (${targetDest.tagline})**\n\n${targetDest.description}\n\n• **Type:** ${targetDest.type.toUpperCase()}\n• **Average Daily Living:** ₹${targetDest.foodRate + targetDest.hotelRate / 2 + targetDest.transportRate}/day\n• **Top Highlights:** ${targetDest.places.slice(0, 3).map(p => p.name).join(', ')}.\n\nWould you like me to build a custom day-by-day itinerary for ${targetDest.name}?`,
          chips: [`Plan 3 days in ${targetDest.name}`, `What to pack for ${targetDest.name}?`, `Top food in ${targetDest.name}`],
          action: { type: 'select_destination', destinationId: targetDest.id }
        };
      }
      return {
        reply: `We currently provide comprehensive AI planning for 6 top Indian destinations: **Goa, Delhi, Jaipur, Manali, Mumbai, and Kerala**. Which one inspires your next adventure?`,
        chips: ["Explore Goa", "Explore Manali", "Explore Jaipur", "Explore Kerala"]
      };

    case 'budget':
      if (targetDest) {
        return {
          reply: `💡 **Budget Optimization Tips for ${targetDest.name}:**\n\n1. **Accommodations:** Average hotel rate is ~₹${targetDest.hotelRate}/night. Booking homestays or hostels can save up to 40%.\n2. **Free & Low-cost Attractions:** Check out ${targetDest.places.filter(p => p.price <= 100).map(p => p.name).join(', ')}.\n3. **Local Transit:** Local buses or bike rentals cost ~₹${targetDest.transportRate}/day compared to private cabs.\n\nOur system recalculates your budget in real time as you adjust activities!`,
          chips: [`Plan a low-budget trip to ${targetDest.name}`, "View budget breakdown", "Check places to visit"]
        };
      }
      return {
        reply: `TripMind AI includes a dynamic Budget Calculator! It calculates Transport, Hotels, Food, Activities, and a 5% contingency reserve, alerting you automatically if your trip exceeds your budget limit. Choose a destination to see specific rates!`,
        chips: defaultChips
      };

    case 'packing':
      if (targetDest) {
        return {
          reply: `🎒 **Smart Packing Recommendations for ${targetDest.name} (${targetDest.type}):**\n\n• **Essentials:** ${targetDest.packingRules.join(', ')}\n• **Clothing:** Breathable casuals, appropriate seasonal layers.\n• **Weather Advice:** ${targetDest.weather[new Date().getMonth()].suggestion}\n\nYou can view and customize your full checklist in the **Packing List** section!`,
          chips: [`Open Packing List for ${targetDest.name}`, `Weather in ${targetDest.name}`, `Plan trip to ${targetDest.name}`],
          action: { type: 'navigate_packing', destinationId: targetDest.id }
        };
      }
      return {
        reply: `I can generate custom packing checklists based on your destination's climate, trip duration, and planned activities! Tell me your destination (e.g. Manali, Goa, Kerala).`,
        chips: ["What should I pack for Manali?", "What should I pack for Goa?"]
      };

    case 'hotels':
      const destForHotels = targetDest || destinations[0];
      const hotelPlaces = destForHotels.places.filter(p => p.category === 'Hotel');
      return {
        reply: `🏨 **Accommodations in ${destForHotels.name}:**\n\nAverage nightly rate is around **₹${destForHotels.hotelRate}**. Top verified options:\n\n${(hotelPlaces.length > 0 ? hotelPlaces : destForHotels.places.slice(0, 2)).map(p => `• **${p.name}** (${p.location}) - Rated ${p.rating}★`).join('\n')}\n\nYou can easily add these accommodations into your daily itinerary!`,
        chips: [`Plan trip to ${destForHotels.name}`, `Budget for ${destForHotels.name}`, `Attractions in ${destForHotels.name}`]
      };

    case 'food':
      const destForFood = targetDest || destinations[0];
      const foodSpots = destForFood.places.filter(p => p.category === 'Food');
      return {
        reply: `🍽️ **Culinary & Dining Guide for ${destForFood.name}:**\n\n${foodSpots.map(f => `• **${f.name}** (${f.location}): ${f.description} (Avg ₹${f.price})`).join('\n\n')}\n\nEstimated daily food cost: ~₹${destForFood.foodRate}/person.`,
        chips: [`Visit ${destForFood.name}`, `More places in ${destForFood.name}`, "Ask another question"]
      };

    case 'attractions':
      const destForAttractions = targetDest || destinations[0];
      const topAttractions = destForAttractions.places.slice(0, 4);
      return {
        reply: `🏛️ **Top Sights & Attractions in ${destForAttractions.name}:**\n\n${topAttractions.map(p => `• **${p.name}** (${p.category}) - ${p.description} [${p.rating}★, Cost: ₹${p.price}]`).join('\n\n')}\n\nClick any place on the Explore page to view instant Google Maps directions!`,
        chips: [`Add to ${destForAttractions.name} trip`, `Hotels in ${destForAttractions.name}`, `Pack for ${destForAttractions.name}`]
      };

    case 'itinerary':
      const chosenD = targetDest ? targetDest.id : 'goa';
      return {
        reply: `🗺️ Ready to organize your dream journey! Click below to create a full multi-day day-by-day plan with smart route pacing, cost breakdowns, and weather integration for **${targetDest ? targetDest.name : 'your destination'}**.`,
        chips: ["Open Trip Planner", `Plan 3 days in ${targetDest ? targetDest.name : 'Goa'}`],
        action: { type: 'open_planner', destinationId: chosenD }
      };

    default:
      return {
        reply: `Hello traveler! I am **TripMind Assistant**, your AI travel planner.\n\nI can help you create customized itineraries, calculate travel budgets, recommend top sights & authentic local food, forecast weather, and build smart packing checklists for **Goa, Delhi, Jaipur, Manali, Mumbai, and Kerala**.\n\nHow can I help you today?`,
        chips: defaultChips
      };
  }
}

module.exports = {
  detectIntent,
  generateAssistantReply
};
