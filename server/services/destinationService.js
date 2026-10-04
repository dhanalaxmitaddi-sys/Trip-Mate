/**
 * Universal Global Destination Service (TripMate Platform)
 * Provides dynamic destination resolution, rich static data, and AI/algorithmic generation
 * for ANY country, city, or travel destination worldwide.
 */

const staticDestinations = require('../data/destinations');

// Curated database of global knowledge for instant, rich responses
const GLOBAL_KNOWLEDGE_BASE = {
  vizag: {
    id: 'vizag',
    name: 'Vizag (Visakhapatnam)',
    country: 'India',
    state: 'Andhra Pradesh',
    isInternational: false,
    currency: 'INR',
    currencySymbol: '₹',
    type: 'beach',
    tagline: 'The Jewel of the East Coast & City of Destiny',
    description: 'A picturesque coastal city nestled between the lush Eastern Ghats and the Bay of Bengal, famous for pristine beaches, scenic hilltop lookouts, and historic maritime museums.',
    coverImage: 'https://images.unsplash.com/photo-1590492484277-3e8df3fba1e6?auto=format&fit=crop&w=1200&q=80',
    hotelRate: 2600,
    foodRate: 700,
    transportRate: 650,
    coordinates: { lat: 17.6868, lng: 83.2185 },
    places: [
      {
        id: 'vizag-rk-beach',
        name: 'Ramakrishna (RK) Beach & Promenade',
        category: 'Beach',
        rating: 4.7,
        price: 0,
        location: 'Beach Road, Visakhapatnam',
        description: 'Vibrant sea-facing promenade popular for golden sunsets, refreshing coastal breezes, and street snacks.',
        tags: ['Beaches', 'Photography', 'Food'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        openingHours: '24 Hours',
        bestTimeToVisit: 'Sunrise & Sunset'
      },
      {
        id: 'vizag-sub-museum',
        name: 'INS Kursura Submarine Museum',
        category: 'History',
        rating: 4.8,
        price: 70,
        location: 'RK Beach Road',
        description: 'Real decommissioned Soviet-built submarine preserved on the sands, offering guided walkthroughs inside.',
        tags: ['History', 'Culture'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        openingHours: '14:00 - 20:30',
        bestTimeToVisit: 'Afternoon'
      },
      {
        id: 'vizag-kailasagiri',
        name: 'Kailasagiri Hilltop Park & Cable Car',
        category: 'Sightseeing',
        rating: 4.7,
        price: 150,
        location: 'Hill Top Road',
        description: 'Elevated hilltop garden with monumental Shiva-Parvati statues, ropeway cable car, and 360-degree panoramic ocean views.',
        tags: ['Nature', 'Photography', 'Adventure'],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        openingHours: '06:00 - 19:30',
        bestTimeToVisit: 'Morning & Evening'
      },
      {
        id: 'vizag-rushikonda',
        name: 'Rushikonda Beach & Water Sports',
        category: 'Adventure',
        rating: 4.6,
        price: 500,
        location: 'Rushikonda',
        description: 'Golden sand cove known as the best spot in Andhra Pradesh for speed boating, surfing, and kayaking.',
        tags: ['Adventure', 'Beaches'],
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
        openingHours: '08:00 - 18:00',
        bestTimeToVisit: 'Morning'
      },
      {
        id: 'vizag-borra-caves',
        name: 'Borra Caves & Araku Valley Day Excursion',
        category: 'Nature',
        rating: 4.9,
        price: 250,
        location: 'Ananthagiri Hills, Araku',
        description: 'Breathtaking 150-million-year-old limestone karst caves with illuminated stalactites and coffee plantations.',
        tags: ['Nature', 'Adventure', 'Photography'],
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        openingHours: '10:00 - 17:00',
        bestTimeToVisit: 'Day Tour'
      },
      {
        id: 'vizag-yarada-beach',
        name: 'Yarada Beach & Dolphin\'s Nose Lighthouse',
        category: 'Nature',
        rating: 4.8,
        price: 50,
        location: 'Gangavaram',
        description: 'Secluded pristine beach surrounded by three hills, crowned by a historic hilltop lighthouse over the cliff.',
        tags: ['Nature', 'Beaches', 'Photography'],
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
        openingHours: '09:00 - 18:00',
        bestTimeToVisit: 'Sunset'
      }
    ],
    foods: [
      { name: 'Andhra Spicy Fish Fry & Royyala Pulusu (Prawn Curry)', category: 'Seafood', price: '₹280 - ₹480', rating: 4.9, location: 'Sea Inn / Daspalla' },
      { name: 'Araku Valley Bamboo Chicken', category: 'Non-Veg', price: '₹350 - ₹550', rating: 4.8, location: 'Araku Hills Food Stalls' },
      { name: 'Gongura Mutton & Steamed Rice with Ghee', category: 'Non-Veg', price: '₹320 - ₹500', rating: 4.9, location: 'Dakshin / Kamat' },
      { name: 'Vizag Beach Road Muri Mixture & Punugulu', category: 'Street Food', price: '₹40 - ₹90', rating: 4.8, location: 'RK Beach Promenade' }
    ],
    stays: [
      { name: 'Novotel Visakhapatnam Varun Beach', type: 'Luxury', price: 9500, rating: 4.8, amenities: ['Ocean View Infinity Pool', 'Spa', 'Beachfront Balconies'] },
      { name: 'The Park Hotel Visakhapatnam', type: 'Mid-Range', price: 4800, rating: 4.6, amenities: ['Private Beach Access', 'Fine Dining', 'Poolside Bar'] },
      { name: 'Hotel Daspalla Executive Court', type: 'Budget', price: 2400, rating: 4.4, amenities: ['Central City Location', 'Free Breakfast', 'Airport Shuttle'] }
    ],
    activities: [
      { name: 'Speedboating & Sea Kayaking at Rushikonda', cost: 600, duration: '1 hour' },
      { name: 'Scenic Hillside Cable Car to Kailasagiri', cost: 150, duration: '2 hours' },
      { name: 'Scenic Vistadome Train Ride to Araku Valley', cost: 950, duration: 'Full Day' },
      { name: 'Sunset Dolphin\'s Nose Cliffside Photography', cost: 100, duration: '2 hours' }
    ]
  },

  switzerland: {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    state: 'Central Europe',
    isInternational: true,
    currency: 'CHF',
    currencySymbol: 'CHF ',
    type: 'hill',
    tagline: 'Snow-Capped Alpine Peaks, Crystal Lakes & Clockwork Charm',
    description: 'A postcard-perfect wonderland of dramatic peaks including the Matterhorn, serene turquoise alpine lakes, luxury chalets, and historic medieval towns.',
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    hotelRate: 14000,
    foodRate: 3500,
    transportRate: 3000,
    coordinates: { lat: 46.8182, lng: 8.2275 },
    places: [
      {
        id: 'swiss-jungfrau',
        name: 'Jungfraujoch - Top of Europe',
        category: 'Adventure',
        rating: 4.9,
        price: 8500,
        location: 'Bernese Oberland, Interlaken',
        description: 'Europe\'s highest railway station at 3,454m altitude, offering glacier ice palaces and panoramic views of the Aletsch Glacier.',
        tags: ['Adventure', 'Nature', 'Photography'],
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        openingHours: '08:00 - 17:00',
        bestTimeToVisit: 'Morning'
      },
      {
        id: 'swiss-matterhorn',
        name: 'Matterhorn & Zermatt Alpine Village',
        category: 'Nature',
        rating: 4.9,
        price: 4500,
        location: 'Zermatt, Valais',
        description: 'World-renowned pyramid-shaped mountain peak surrounded by car-free cobblestone alpine streets.',
        tags: ['Nature', 'Photography'],
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
        openingHours: '24 Hours',
        bestTimeToVisit: 'Sunrise & Daytime'
      },
      {
        id: 'swiss-lucerne-bridge',
        name: 'Lucerne Chapel Bridge & Lake Lucerne',
        category: 'History',
        rating: 4.8,
        price: 0,
        location: 'Lucerne',
        description: '14th-century wooden covered footbridge adorned with historic interior paintings across the Reuss River.',
        tags: ['History', 'Culture', 'Photography'],
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
        openingHours: 'Open 24 Hours',
        bestTimeToVisit: 'Afternoon'
      },
      {
        id: 'swiss-zurich-old-town',
        name: 'Zurich Altstadt (Old Town) & Lake Zurich',
        category: 'Sightseeing',
        rating: 4.7,
        price: 0,
        location: 'Zurich',
        description: 'Charming medieval lanes, Guild houses, Lake Zurich promenade, and world-class luxury shopping on Bahnhofstrasse.',
        tags: ['Culture', 'Shopping', 'History'],
        image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80',
        openingHours: 'All Day',
        bestTimeToVisit: 'Morning & Afternoon'
      },
      {
        id: 'swiss-interlaken-lake',
        name: 'Interlaken Lakes Brienz & Thun Cruise',
        category: 'Nature',
        rating: 4.8,
        price: 1800,
        location: 'Interlaken',
        description: 'Scenic paddle steamer cruise over mirror-like turquoise waters flanked by sheer mountain cliffs and waterfalls.',
        tags: ['Nature', 'Photography'],
        image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=800&q=80',
        openingHours: '09:00 - 18:00',
        bestTimeToVisit: 'Sunny Afternoon'
      }
    ],
    foods: [
      { name: 'Traditional Swiss Cheese Fondue & Crusty Bread', category: 'Veg', price: 'CHF 30 - CHF 45', rating: 4.9, location: 'Swiss Chuchi, Zurich' },
      { name: 'Crispy Swiss Rösti with Fried Egg & Herbs', category: 'Veg', price: 'CHF 22 - CHF 35', rating: 4.8, location: 'Old Swiss House, Lucerne' },
      { name: 'Handcrafted Swiss Pralines & Lindt Hot Chocolate', category: 'Dessert', price: 'CHF 8 - CHF 18', rating: 4.9, location: 'Sprüngli / Lindt Home of Chocolate' },
      { name: 'Zürcher Geschnetzeltes (Sliced Veal in Cream Sauce)', category: 'Non-Veg', price: 'CHF 35 - CHF 55', rating: 4.8, location: 'Zunfthaus zur Waag' }
    ],
    stays: [
      { name: 'Victoria-Jungfrau Grand Hotel & Spa', type: 'Luxury', price: 38000, rating: 4.9, amenities: ['Alpine Spa', 'Heated Indoor Pool', 'Mountain View Suites'] },
      { name: 'Hotel des Balances Lucerne', type: 'Mid-Range', price: 16500, rating: 4.7, amenities: ['River Balconies', 'Historic Architecture', 'Swiss Dining'] },
      { name: 'Interlaken Youth Hostel / Alpine Lodge', type: 'Budget', price: 6500, rating: 4.4, amenities: ['Clean Modern Rooms', 'Train Station Access', 'Free Wi-Fi'] }
    ],
    activities: [
      { name: 'Jungfraujoch Mountain Cogwheel Train Ride', cost: 8500, duration: '6 hours' },
      { name: 'Scenic Lake Lucerne Steamboat Cruise', cost: 1800, duration: '2.5 hours' },
      { name: 'Artisan Swiss Chocolate Making Masterclass', cost: 2200, duration: '2 hours' },
      { name: 'Interlaken Tandem Paragliding over the Alps', cost: 12000, duration: '3 hours' }
    ]
  },

  'new-zealand': {
    id: 'new-zealand',
    name: 'New Zealand',
    country: 'New Zealand',
    state: 'Oceania',
    isInternational: true,
    currency: 'NZD',
    currencySymbol: 'NZ$ ',
    type: 'nature',
    tagline: 'Pure Dramatic Landscapes, Maori Heritage & Adventure Capital',
    description: 'An ethereal land of towering fjords, snow-capped southern alps, glowing geothermal hot springs, and epic Lord of the Rings movie filming backdrops.',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    hotelRate: 11000,
    foodRate: 2800,
    transportRate: 2500,
    coordinates: { lat: -40.9006, lng: 174.8860 },
    places: [
      {
        id: 'nz-milford-sound',
        name: 'Milford Sound Fjord Cruise',
        category: 'Nature',
        rating: 4.9,
        price: 5500,
        location: 'Fiordland National Park',
        description: 'Described as the Eighth Wonder of the World; glacial carved fjord with plunging waterfalls and wildlife.',
        tags: ['Nature', 'Adventure', 'Photography'],
        image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
        openingHours: '09:00 - 17:00',
        bestTimeToVisit: 'Morning Cruise'
      },
      {
        id: 'nz-hobbiton',
        name: 'Hobbiton Movie Set Tour',
        category: 'Culture',
        rating: 4.9,
        price: 4800,
        location: 'Matamata, Waikato',
        description: 'Real Shire film set from The Lord of the Rings trilogy with 44 intact Hobbit holes and the Green Dragon Inn.',
        tags: ['Culture', 'Photography', 'History'],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        openingHours: '09:00 - 17:30',
        bestTimeToVisit: 'Morning'
      },
      {
        id: 'nz-queenstown-skyline',
        name: 'Queenstown Skyline Gondola & Luge',
        category: 'Adventure',
        rating: 4.8,
        price: 2400,
        location: 'Queenstown',
        description: 'Steepest cable car lift in the Southern Hemisphere overlooking Lake Wakatipu and the Remarkables mountain range.',
        tags: ['Adventure', 'Photography'],
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        openingHours: '09:30 - 20:00',
        bestTimeToVisit: 'Afternoon & Sunset'
      },
      {
        id: 'nz-rotorua-geothermal',
        name: 'Rotorua Te Puia Geothermal Valley & Maori Village',
        category: 'Culture',
        rating: 4.8,
        price: 3200,
        location: 'Rotorua',
        description: 'Bubbling mud pools, shooting Pohutu geyser, and authentic Maori Haka performances and Hangi feast.',
        tags: ['Culture', 'Nature', 'History'],
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
        openingHours: '08:30 - 17:00',
        bestTimeToVisit: 'Morning'
      }
    ],
    foods: [
      { name: 'Famous Queenstown Fergburger (Gourmet Beef Burger)', category: 'Non-Veg', price: 'NZ$ 15 - NZ$ 24', rating: 4.9, location: 'Shotover St, Queenstown' },
      { name: 'Traditional Maori Hāngī Feast (Earth-Oven Cooked)', category: 'Non-Veg', price: 'NZ$ 45 - NZ$ 75', rating: 4.8, location: 'Te Puia, Rotorua' },
      { name: 'New Zealand Pavlova with Kiwifruit & Cream', category: 'Dessert', price: 'NZ$ 10 - NZ$ 16', rating: 4.8, location: 'Local Cafes' },
      { name: 'Fresh Green-Lipped Mussels & Fish & Chips', category: 'Seafood', price: 'NZ$ 18 - NZ$ 32', rating: 4.9, location: 'Auckland & Coromandel' }
    ],
    stays: [
      { name: 'Matakauri Lodge Queenstown', type: 'Luxury', price: 34000, rating: 4.9, amenities: ['Private Lake Villas', 'Alpine Spa', 'Gourmet Dining'] },
      { name: 'Heritage Queenstown', type: 'Mid-Range', price: 12500, rating: 4.6, amenities: ['Indoor/Outdoor Pool', 'Cedar Spa', 'Lake Views'] },
      { name: 'JUCY Snooze Queenstown / Pod Hotel', type: 'Budget', price: 4500, rating: 4.5, amenities: ['Rooftop Pizzeria', 'Smart Pods', 'Central Town'] }
    ],
    activities: [
      { name: 'Milford Sound Nature Cruise & Fiordland Tour', cost: 5500, duration: '5 hours' },
      { name: 'Hobbiton Movie Set Guided Expedition', cost: 4800, duration: '3 hours' },
      { name: 'Queenstown Shotover River Canyon Jet Boat', cost: 6500, duration: '2 hours' },
      { name: 'Rotorua Polynesian Geothermal Spa Soak', cost: 2200, duration: '2.5 hours' }
    ]
  },

  sydney: {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    state: 'New South Wales',
    isInternational: true,
    currency: 'AUD',
    currencySymbol: 'A$ ',
    type: 'metro',
    tagline: 'Sun-Drenched Harbours, Golden Sands & Cosmopolitan Glamour',
    description: 'A dazzling world city famous for the sculptural Sydney Opera House, Harbour Bridge, world-class dining, and the iconic Bondi Beach coast.',
    coverImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    hotelRate: 12000,
    foodRate: 3000,
    transportRate: 1500,
    coordinates: { lat: -33.8688, lng: 151.2093 },
    places: [
      {
        id: 'syd-opera',
        name: 'Sydney Opera House & Forecourt',
        category: 'Culture',
        rating: 4.9,
        price: 1800,
        location: 'Bennelong Point, Sydney',
        description: 'UNESCO World Heritage masterpiece of modern 20th-century architecture overlooking the sparkling Sydney Harbour.',
        tags: ['Culture', 'History', 'Photography'],
        image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
        openingHours: '09:00 - 18:00',
        bestTimeToVisit: 'Morning & Sunset'
      },
      {
        id: 'syd-bridge',
        name: 'Sydney Harbour Bridge Walk & Pylon Lookout',
        category: 'Adventure',
        rating: 4.8,
        price: 800,
        location: 'The Rocks',
        description: 'Historic steel arch bridge nicknamed "The Coathanger" with an open pedestrian path and panoramic pylon lookout.',
        tags: ['Adventure', 'Photography', 'History'],
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
        openingHours: '24 Hours Path',
        bestTimeToVisit: 'Morning'
      },
      {
        id: 'syd-bondi',
        name: 'Bondi Beach & Bondi to Bronte Coastal Walk',
        category: 'Beach',
        rating: 4.8,
        price: 0,
        location: 'Bondi',
        description: 'Iconic curved crescent of golden sand, famous surf waves, vibrant beachfront cafes, and cliffside walking path.',
        tags: ['Beaches', 'Nature', 'Photography'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        openingHours: 'Open 24 Hours',
        bestTimeToVisit: 'Morning & Sunset'
      },
      {
        id: 'syd-taronga',
        name: 'Taronga Zoo & Harbour Ferry',
        category: 'Nature',
        rating: 4.7,
        price: 2400,
        location: 'Mosman',
        description: 'World-class harborside zoo featuring native kangaroos, koalas, and platypuses against Sydney city skyline backdrops.',
        tags: ['Nature', 'Culture'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        openingHours: '09:30 - 17:00',
        bestTimeToVisit: 'Daytime'
      }
    ],
    foods: [
      { name: 'Fresh Sydney Rock Oysters & Grilled Barramundi', category: 'Seafood', price: 'A$ 28 - A$ 48', rating: 4.9, location: 'Sydney Fish Market' },
      { name: 'Aussie Meat Pie with Mash & Gravy', category: 'Non-Veg', price: 'A$ 8 - A$ 15', rating: 4.8, location: 'Harry\'s Cafe de Wheels' },
      { name: 'Bondi Beach Acai Bowl & Flat White Coffee', category: 'Veg', price: 'A$ 12 - A$ 20', rating: 4.8, location: 'Bondi Promenade' },
      { name: 'Pork Belly & Asian Fusion Dining', category: 'Non-Veg', price: 'A$ 35 - A$ 65', rating: 4.9, location: 'Surry Hills' }
    ],
    stays: [
      { name: 'Park Hyatt Sydney', type: 'Luxury', price: 42000, rating: 4.9, amenities: ['Harbour Opera Views', 'Rooftop Pool', 'Butler Service'] },
      { name: 'The Grace Hotel Sydney', type: 'Mid-Range', price: 14000, rating: 4.6, amenities: ['Neo-Gothic Charm', 'Indoor Lap Pool', 'CBD Location'] },
      { name: 'Sydney Harbour YHA The Rocks', type: 'Budget', price: 4800, rating: 4.5, amenities: ['Rooftop Opera View', 'Historic Quarter', 'Modern Amenities'] }
    ],
    activities: [
      { name: 'Sydney Harbour Sunset Dinner Cruise', cost: 3500, duration: '2.5 hours' },
      { name: 'Bondi to Coogee Scenic Clifftop Coastal Walk', cost: 0, duration: '3 hours' },
      { name: 'Sydney Opera House Behind-the-Scenes Tour', cost: 2200, duration: '1.5 hours' },
      { name: 'Harbour Ferry to Manly Beach & Coastal Cafes', cost: 600, duration: 'Half Day' }
    ]
  }
};

/**
 * Normalizes user search input into a clean key
 */
function cleanKey(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Intelligent Destination Factory for ANY unknown location
 */
function generateDynamicDestination(query) {
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();
  const slug = lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'global-destination';

  // Capitalize properly
  const formattedName = trimmed
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  // Detect Country & Domestic vs International
  const indianKeywords = [
    'india', 'andhra', 'telangana', 'karnataka', 'tamil', 'kerala', 'maharashtra',
    'rajasthan', 'gujarat', 'bengal', 'odisha', 'bihar', 'punjab', 'kashmir',
    'vizag', 'visakhapatnam', 'tirupati', 'vijayawada', 'warangal', 'mysore', 'coorg',
    'ooty', 'munnar', 'wayanad', 'alleppey', 'kochi', 'pondicherry', 'madurai', 'rameshwaram',
    'hampi', 'gokarna', 'pune', 'nashik', 'nagpur', 'aurangabad', 'udaipur', 'jodhpur',
    'jaisalmer', 'pushkar', 'bikaner', 'mount abu', 'rishikesh', 'haridwar', 'shimla',
    'kullu', 'dharamshala', 'dalhousie', 'spiti', 'leh', 'ladakh', 'amritsar', 'varanasi',
    'lucknow', 'agra', 'kanpur', 'patna', 'kolkata', 'darjeeling', 'gangtok', 'shillong',
    'guwahati', 'bhubaneswar', 'puri', 'konark', 'ahmedabad', 'surat', 'vadodara', 'rann'
  ];

  const isDomestic = indianKeywords.some(kw => lower.includes(kw));

  // Determine destination type
  let destType = 'metro';
  if (/beach|sea|coast|island|cove|ocean|port|bay/i.test(lower)) {
    destType = 'beach';
  } else if (/mountain|hill|peak|valley|snow|alp|trek|lake/i.test(lower)) {
    destType = 'hill';
  } else if (/fort|palace|temple|heritage|ancient|historic|ruin/i.test(lower)) {
    destType = 'heritage';
  } else if (/forest|safari|wildlife|park|nature|canyon/i.test(lower)) {
    destType = 'nature';
  }

  // Curated imagery based on inferred type
  const coverImages = {
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    hill: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    heritage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    nature: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    metro: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80'
  };

  const currency = isDomestic ? 'INR' : 'USD';
  const currencySymbol = isDomestic ? '₹' : '$';
  const hotelRate = isDomestic ? 2500 : 7500;
  const foodRate = isDomestic ? 800 : 2500;
  const transportRate = isDomestic ? 750 : 1800;

  // Generate 6 specific places
  const places = [
    {
      id: `${slug}-iconic-landmark`,
      name: `${formattedName} Central Landmark & Heritage Square`,
      category: 'History',
      rating: 4.8,
      price: isDomestic ? 100 : 350,
      location: `${formattedName} Center`,
      description: `Iconic signature landmark of ${formattedName}, renowned for its historic architecture, public plaza, and lively ambiance.`,
      tags: ['History', 'Culture', 'Photography'],
      image: coverImages[destType],
      openingHours: '09:00 - 18:00',
      bestTimeToVisit: 'Morning & Sunset'
    },
    {
      id: `${slug}-viewpoint-nature`,
      name: `${formattedName} Scenic Viewpoint & Gardens`,
      category: destType === 'beach' ? 'Beach' : (destType === 'hill' ? 'Nature' : 'Sightseeing'),
      rating: 4.7,
      price: 0,
      location: `${formattedName} Heights`,
      description: `Spectacular panoramic outlook offering sweeping 360-degree vistas over ${formattedName} and natural landscapes.`,
      tags: ['Nature', 'Photography'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      openingHours: 'Open 24 Hours',
      bestTimeToVisit: 'Sunset'
    },
    {
      id: `${slug}-cultural-market`,
      name: `${formattedName} Old Town Bazaar & Artisan Market`,
      category: 'Shopping',
      rating: 4.6,
      price: 0,
      location: `Old ${formattedName}`,
      description: `Bustling traditional marketplace filled with authentic local crafts, spices, souvenir shops, and street snacks.`,
      tags: ['Shopping', 'Food', 'Culture'],
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80',
      openingHours: '10:00 - 21:00',
      bestTimeToVisit: 'Evening'
    },
    {
      id: `${slug}-food-trail`,
      name: `${formattedName} Famous Culinary Lane & Cafes`,
      category: 'Food',
      rating: 4.9,
      price: isDomestic ? 350 : 1200,
      location: `Culinary District, ${formattedName}`,
      description: `Renowned food haven where master chefs and legacy vendors serve ${formattedName}'s most acclaimed signature dishes.`,
      tags: ['Food', 'Culture'],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      openingHours: '11:00 - 23:00',
      bestTimeToVisit: 'Lunch & Dinner'
    },
    {
      id: `${slug}-adventure-activity`,
      name: `${formattedName} Outdoor Thrills & Adventure Spot`,
      category: 'Adventure',
      rating: 4.7,
      price: isDomestic ? 500 : 2500,
      location: `Adventure Hub, ${formattedName}`,
      description: `Top rated action-packed excursion point offering adrenaline activities, guided walks, and fun sports for all travelers.`,
      tags: ['Adventure', 'Nature'],
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
      openingHours: '08:00 - 17:00',
      bestTimeToVisit: 'Morning'
    },
    {
      id: `${slug}-museum-arts`,
      name: `${formattedName} Heritage Museum & Art Gallery`,
      category: 'Culture',
      rating: 4.6,
      price: isDomestic ? 80 : 450,
      location: `${formattedName} Museum Mile`,
      description: `Fascinating cultural exhibition featuring artifacts, regional history, fine art collections, and interactive galleries.`,
      tags: ['Culture', 'History'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      openingHours: '10:00 - 17:30',
      bestTimeToVisit: 'Afternoon'
    }
  ];

  // Curated Foods
  const foods = [
    { name: `${formattedName} Specialty Signature Platter`, category: 'Local Food', price: `${currencySymbol}${isDomestic ? '300 - 550' : '18 - 32'}`, rating: 4.9, location: `Central ${formattedName}` },
    { name: `${formattedName} Street Delicacies & Fresh Bites`, category: 'Street Food', price: `${currencySymbol}${isDomestic ? '60 - 140' : '6 - 12'}`, rating: 4.8, location: `Bazaar Promenade` },
    { name: `Traditional Regional Thali / Feast`, category: 'Veg', price: `${currencySymbol}${isDomestic ? '220 - 400' : '15 - 28'}`, rating: 4.7, location: `Heritage Eateries` },
    { name: `Artisan Sweet Treats & Local Brewed Coffee`, category: 'Dessert', price: `${currencySymbol}${isDomestic ? '100 - 200' : '5 - 10'}`, rating: 4.8, location: `City Bakery Quarter` }
  ];

  // Curated Stays
  const stays = [
    { name: `${formattedName} Grand Palace & Luxury Resort`, type: 'Luxury', price: hotelRate * 3.5, rating: 4.9, amenities: ['Spa & Wellness', 'Panoramic Views', 'Fine Dining', 'Concierge'] },
    { name: `${formattedName} Boutique Comfort Hotel`, type: 'Mid-Range', price: hotelRate * 1.8, rating: 4.6, amenities: ['Complimentary Breakfast', 'Free High-Speed Wi-Fi', 'Central Location'] },
    { name: `${formattedName} Traveler\'s Cozy Inn & Hostel`, type: 'Budget', price: hotelRate * 0.8, rating: 4.4, amenities: ['Clean Modern Rooms', 'Tour Desk', 'Shared Lounge'] }
  ];

  // Curated Activities
  const activities = [
    { name: `${formattedName} Guided Highlights & City Tour`, cost: isDomestic ? 750 : 2500, duration: '3 hours' },
    { name: `Sunset Panorama & Golden Hour Photography`, cost: isDomestic ? 100 : 500, duration: '2 hours' },
    { name: `Authentic Food Walk & Night Market Exploration`, cost: isDomestic ? 600 : 1800, duration: '2.5 hours' },
    { name: `Scenic Nature Trail / Coastal Expedition`, cost: isDomestic ? 400 : 1500, duration: 'Half Day' }
  ];

  // 12-Month Weather
  const weather = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    let tempC = destType === 'hill' ? 16 : 28;
    let condition = 'Pleasant';
    let icon = 'Sun';

    if (month >= 5 && month <= 8) {
      tempC += destType === 'hill' ? 4 : 5;
      condition = destType === 'beach' ? 'Warm Breeze' : 'Sunny';
    } else if (month >= 11 || month <= 2) {
      tempC -= destType === 'hill' ? 6 : 4;
      condition = 'Crisp & Cool';
    }

    return {
      month,
      tempC,
      condition,
      humidity: 55,
      icon,
      suggestion: `Ideal travel weather in ${formattedName} with comfortable conditions for sightseeing.`
    };
  });

  return {
    id: slug,
    name: formattedName,
    country: isDomestic ? 'India' : (formattedName.includes(',') ? formattedName.split(',').pop().trim() : 'Global Destination'),
    state: isDomestic ? 'India' : 'International',
    isInternational: !isDomestic,
    currency,
    currencySymbol,
    type: destType,
    tagline: `Experience the Wonders, Heritage & Flavors of ${formattedName}`,
    description: `A captivating destination celebrated for its vibrant culture, iconic sights, warm hospitality, and memorable travel experiences.`,
    coverImage: coverImages[destType],
    hotelRate,
    foodRate,
    transportRate,
    coordinates: { lat: isDomestic ? 20.5937 : 48.8566, lng: isDomestic ? 78.9629 : 2.3522 },
    places,
    foods,
    stays,
    activities,
    weather,
    packingRules: ['walking-shoes', 'sunscreen', 'camera', 'comfortable-outfits'],
    isDynamicallyGenerated: true
  };
}

/**
 * Main function: Resolves any destination query or ID to a rich Destination object.
 * NEVER returns null or 404 for valid input!
 */
async function getOrGenerateDestination(queryOrId) {
  if (!queryOrId || typeof queryOrId !== 'string') {
    return staticDestinations[0]; // fallback
  }

  const clean = cleanKey(queryOrId);

  // 1. Check existing static destinations
  const staticFound = staticDestinations.find(d => {
    return cleanKey(d.id) === clean || cleanKey(d.name) === clean || clean.includes(cleanKey(d.id));
  });
  if (staticFound) return staticFound;

  // 2. Check built-in global knowledge base (Vizag, Switzerland, New Zealand, Sydney, etc.)
  for (const [k, d] of Object.entries(GLOBAL_KNOWLEDGE_BASE)) {
    if (clean.includes(cleanKey(k)) || cleanKey(d.name).includes(clean) || clean.includes(cleanKey(d.id))) {
      return d;
    }
  }

  // 3. Fallback: Dynamically synthesize rich destination data for ANY place in the world
  return generateDynamicDestination(queryOrId);
}

/**
 * Searches destinations across static, global knowledge base, and dynamically matching queries
 */
function searchAllDestinations(searchQuery = '', filter = 'All') {
  const q = (searchQuery || '').trim().toLowerCase();
  const cleanQ = cleanKey(q);

  let combined = [...staticDestinations];

  // Add items from global knowledge base that are not already in static
  Object.values(GLOBAL_KNOWLEDGE_BASE).forEach(d => {
    if (!combined.some(c => cleanKey(c.id) === cleanKey(d.id))) {
      combined.push(d);
    }
  });

  // Filter by Domestic / International if requested
  let results = combined.filter(d => {
    if (filter === 'Domestic') return !d.isInternational;
    if (filter === 'International') return d.isInternational;
    return true;
  });

  // Apply search query
  if (q) {
    results = results.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      (d.state && d.state.toLowerCase().includes(q)) ||
      (d.tagline && d.tagline.toLowerCase().includes(q))
    );

    // If query does not match any existing item, prepend the dynamically generated destination!
    const exactMatch = results.some(d => cleanKey(d.name) === cleanQ || cleanKey(d.id) === cleanQ);
    if (!exactMatch && q.length >= 2) {
      const dynamicDest = generateDynamicDestination(searchQuery);
      results.unshift(dynamicDest);
    }
  }

  return results;
}

module.exports = {
  getOrGenerateDestination,
  searchAllDestinations,
  generateDynamicDestination,
  GLOBAL_KNOWLEDGE_BASE
};
