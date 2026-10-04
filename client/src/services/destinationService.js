import { destinations as staticDestinations } from '../data/destinations';

// Comprehensive global knowledge base for instant high-detail previews
export const GLOBAL_KNOWLEDGE_BASE = {
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
      { name: 'Andhra Spicy Fish Fry & Royyala Pulusu', category: 'Seafood', price: '₹280 - ₹480', rating: 4.9, location: 'Sea Inn / Daspalla' },
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
    ],
    weather: [
      { month: 1, tempC: 24, condition: 'Pleasant', humidity: 60, icon: 'Sun', suggestion: 'Breezy and pleasant, ideal for beach walks and Araku excursions.' },
      { month: 2, tempC: 26, condition: 'Sunny', humidity: 62, icon: 'Sun', suggestion: 'Comfortable sunny weather, perfect for Kailasagiri hilltop visits.' },
      { month: 3, tempC: 29, condition: 'Warm', humidity: 68, icon: 'Sun', suggestion: 'Pleasant mornings; carry sunscreen for beach water sports.' },
      { month: 4, tempC: 32, condition: 'Hot & Humid', humidity: 75, icon: 'Sun', suggestion: 'Warm coastal days; explore air-conditioned submarine museums.' },
      { month: 5, tempC: 34, condition: 'Summer', humidity: 78, icon: 'Sun', suggestion: 'Stay hydrated; enjoy evening sea breeze at RK Beach.' },
      { month: 6, tempC: 31, condition: 'Monsoon Clouds', humidity: 82, icon: 'CloudRain', suggestion: 'Lush greenery across Eastern Ghats.' },
      { month: 7, tempC: 29, condition: 'Rainy', humidity: 85, icon: 'CloudRain', suggestion: 'Rainy season; Araku waterfalls in full glory.' },
      { month: 8, tempC: 29, condition: 'Showers', humidity: 84, icon: 'CloudRain', suggestion: 'Spectacular misty views from Kailasagiri.' },
      { month: 9, tempC: 30, condition: 'Pleasant', humidity: 80, icon: 'Sun', suggestion: 'Gentle breezes returning, great for outdoor touring.' },
      { month: 10, tempC: 28, condition: 'Clear Skies', humidity: 72, icon: 'Sun', suggestion: 'Start of best tourism season.' },
      { month: 11, tempC: 26, condition: 'Mild Cool', humidity: 65, icon: 'Sun', suggestion: 'Cool ocean breezes and clear waters.' },
      { month: 12, tempC: 23, condition: 'Delightful', humidity: 62, icon: 'Sun', suggestion: 'Peak winter tourism; great for beach festivals.' }
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
    ],
    weather: [
      { month: 1, tempC: -1, condition: 'Snowy', humidity: 80, icon: 'CloudSnow', suggestion: 'Winter wonderland; pack heavy woolens & thermal layers.' },
      { month: 2, tempC: 2, condition: 'Alpine Snow', humidity: 76, icon: 'CloudSnow', suggestion: 'Prime ski season in Zermatt and Jungfrau.' },
      { month: 3, tempC: 7, condition: 'Crisp Spring', humidity: 70, icon: 'Sun', suggestion: 'Fresh mountain breezes and melting lake ice.' },
      { month: 4, tempC: 11, condition: 'Mild', humidity: 65, icon: 'Sun', suggestion: 'Green valleys and blooming alpine meadows.' },
      { month: 5, tempC: 16, condition: 'Pleasant', humidity: 68, icon: 'Sun', suggestion: 'Great hiking conditions across lower trails.' },
      { month: 6, tempC: 20, condition: 'Sunny', humidity: 66, icon: 'Sun', suggestion: 'Delightful summer weather for lake steamers.' },
      { month: 7, tempC: 23, condition: 'Warm', humidity: 64, icon: 'Sun', suggestion: 'Peak summer hiking, paragliding and festivals.' },
      { month: 8, tempC: 22, condition: 'Pleasant', humidity: 67, icon: 'Sun', suggestion: 'Warm days and cool mountain nights.' },
      { month: 9, tempC: 17, condition: 'Autumn Gold', humidity: 72, icon: 'Sun', suggestion: 'Golden autumn leaves across the vineyards.' },
      { month: 10, tempC: 11, condition: 'Crisp', humidity: 78, icon: 'Sun', suggestion: 'Cozy fondue evenings and crisp clear air.' },
      { month: 11, tempC: 4, condition: 'Chilly', humidity: 82, icon: 'CloudFog', suggestion: 'Early snowfalls on high peaks.' },
      { month: 12, tempC: 0, condition: 'Festive Snow', humidity: 85, icon: 'CloudSnow', suggestion: 'Christmas markets in Zurich and Lucerne.' }
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
      }
    ],
    foods: [
      { name: 'Famous Queenstown Fergburger (Gourmet Beef Burger)', category: 'Non-Veg', price: 'NZ$ 15 - NZ$ 24', rating: 4.9, location: 'Shotover St, Queenstown' },
      { name: 'Traditional Maori Hāngī Feast', category: 'Non-Veg', price: 'NZ$ 45 - NZ$ 75', rating: 4.8, location: 'Te Puia, Rotorua' },
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
      { name: 'Queenstown Shotover River Canyon Jet Boat', cost: 6500, duration: '2 hours' }
    ],
    weather: [
      { month: 1, tempC: 22, condition: 'Warm Summer', humidity: 60, icon: 'Sun', suggestion: 'Peak summer; long daylight hours for outdoor adventures.' },
      { month: 2, tempC: 22, condition: 'Sunny', humidity: 62, icon: 'Sun', suggestion: 'Ideal for swimming in bay waters and alpine hikes.' },
      { month: 3, tempC: 19, condition: 'Pleasant Autumn', humidity: 65, icon: 'Sun', suggestion: 'Golden autumn leaves across Queenstown and Arrowtown.' },
      { month: 4, tempC: 15, condition: 'Crisp', humidity: 70, icon: 'Sun', suggestion: 'Cool mornings; beautiful clear hiking conditions.' },
      { month: 5, tempC: 12, condition: 'Cool', humidity: 75, icon: 'Sun', suggestion: 'Snow begins appearing on southern mountain peaks.' },
      { month: 6, tempC: 9, condition: 'Winter Chill', humidity: 80, icon: 'CloudSnow', suggestion: 'Start of Queenstown winter ski festival.' },
      { month: 7, tempC: 8, condition: 'Snow Season', humidity: 82, icon: 'CloudSnow', suggestion: 'Powder snow on Coronet Peak and Remarkables.' },
      { month: 8, tempC: 10, condition: 'Winter Sun', humidity: 78, icon: 'CloudSnow', suggestion: 'Great skiing and cozy fireside pub evenings.' },
      { month: 9, tempC: 13, condition: 'Spring Thaw', humidity: 72, icon: 'Sun', suggestion: 'Spring blossoms and rushing waterfall cascades.' },
      { month: 10, tempC: 16, condition: 'Breezy Spring', humidity: 68, icon: 'Sun', suggestion: 'Lupins blooming around Lake Tekapo.' },
      { month: 11, tempC: 18, condition: 'Mild', humidity: 64, icon: 'Sun', suggestion: 'Long sunny afternoons returning.' },
      { month: 12, tempC: 20, condition: 'Summer Begins', humidity: 60, icon: 'Sun', suggestion: 'Kiwi summer holidays and beach barbecues.' }
    ]
  }
};

function cleanKey(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Intelligent Dynamic Destination Generator for ANY global city/country
 */
export function generateDynamicDestination(query) {
  const trimmed = (query || 'Destination').trim();
  const lower = trimmed.toLowerCase();
  const slug = lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'global-destination';

  const formattedName = trimmed
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  const indianKeywords = [
    'india', 'andhra', 'telangana', 'karnataka', 'tamil', 'kerala', 'maharashtra',
    'rajasthan', 'gujarat', 'bengal', 'odisha', 'bihar', 'punjab', 'kashmir',
    'vizag', 'visakhapatnam', 'tirupati', 'vijayawada', 'warangal', 'mysore', 'coorg',
    'ooty', 'munnar', 'wayanad', 'alleppey', 'kochi', 'pondicherry', 'madurai', 'rameshwaram',
    'hampi', 'gokarna', 'pune', 'nashik', 'nagpur', 'aurangabad', 'udaipur', 'jodhpur',
    'jaisalmer', 'pushkar', 'bikaner', 'mount abu', 'rishikesh', 'haridwar', 'shimla',
    'kullu', 'dharamshala', 'dalhousie', 'spiti', 'leh', 'ladakh', 'amritsar', 'varanasi',
    'lucknow', 'agra', 'kanpur', 'patna', 'kolkata', 'darjeeling', 'gangtok', 'shillong'
  ];

  const isDomestic = indianKeywords.some(kw => lower.includes(kw));

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

  const foods = [
    { name: `${formattedName} Specialty Signature Platter`, category: 'Local Food', price: `${currencySymbol}${isDomestic ? '300 - 550' : '18 - 32'}`, rating: 4.9, location: `Central ${formattedName}` },
    { name: `${formattedName} Street Delicacies & Fresh Bites`, category: 'Street Food', price: `${currencySymbol}${isDomestic ? '60 - 140' : '6 - 12'}`, rating: 4.8, location: `Bazaar Promenade` },
    { name: `Traditional Regional Thali / Feast`, category: 'Veg', price: `${currencySymbol}${isDomestic ? '220 - 400' : '15 - 28'}`, rating: 4.7, location: `Heritage Eateries` },
    { name: `Artisan Sweet Treats & Local Brewed Coffee`, category: 'Dessert', price: `${currencySymbol}${isDomestic ? '100 - 200' : '5 - 10'}`, rating: 4.8, location: `City Bakery Quarter` }
  ];

  const stays = [
    { name: `${formattedName} Grand Palace & Luxury Resort`, type: 'Luxury', price: hotelRate * 3.5, rating: 4.9, amenities: ['Spa & Wellness', 'Panoramic Views', 'Fine Dining', 'Concierge'] },
    { name: `${formattedName} Boutique Comfort Hotel`, type: 'Mid-Range', price: hotelRate * 1.8, rating: 4.6, amenities: ['Complimentary Breakfast', 'Free High-Speed Wi-Fi', 'Central Location'] },
    { name: `${formattedName} Traveler\'s Cozy Inn & Hostel`, type: 'Budget', price: hotelRate * 0.8, rating: 4.4, amenities: ['Clean Modern Rooms', 'Tour Desk', 'Shared Lounge'] }
  ];

  const activities = [
    { name: `${formattedName} Guided Highlights & City Tour`, cost: isDomestic ? 750 : 2500, duration: '3 hours' },
    { name: `Sunset Panorama & Golden Hour Photography`, cost: isDomestic ? 100 : 500, duration: '2 hours' },
    { name: `Authentic Food Walk & Night Market Exploration`, cost: isDomestic ? 600 : 1800, duration: '2.5 hours' },
    { name: `Scenic Nature Trail / Coastal Expedition`, cost: isDomestic ? 400 : 1500, duration: 'Half Day' }
  ];

  const weather = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    tempC: destType === 'hill' ? 16 + ((i % 4) - 2) : 28 + ((i % 4) - 2),
    condition: destType === 'beach' ? 'Coastal Breeze' : 'Pleasant',
    humidity: 58,
    icon: 'Sun',
    suggestion: `Ideal travel weather in ${formattedName} with comfortable conditions for sightseeing.`
  }));

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
 * Returns any destination by ID or Query (static, global knowledge base, or dynamic)
 */
export function getOrGenerateDestination(queryOrId) {
  if (!queryOrId || typeof queryOrId !== 'string') {
    return staticDestinations[0];
  }

  const clean = cleanKey(queryOrId);

  // 1. Static destinations
  const staticFound = staticDestinations.find(d => {
    return cleanKey(d.id) === clean || cleanKey(d.name) === clean || clean.includes(cleanKey(d.id));
  });
  if (staticFound) return staticFound;

  // 2. Global Knowledge Base
  for (const [k, d] of Object.entries(GLOBAL_KNOWLEDGE_BASE)) {
    if (clean.includes(cleanKey(k)) || cleanKey(d.name).includes(clean) || clean.includes(cleanKey(d.id))) {
      return d;
    }
  }

  // 3. Dynamic synthesis
  return generateDynamicDestination(queryOrId);
}

/**
 * Search helper across all sources
 */
export function searchAllDestinations(searchQuery = '', filter = 'All') {
  const q = (searchQuery || '').trim().toLowerCase();
  const cleanQ = cleanKey(q);

  let combined = [...staticDestinations];

  Object.values(GLOBAL_KNOWLEDGE_BASE).forEach(d => {
    if (!combined.some(c => cleanKey(c.id) === cleanKey(d.id))) {
      combined.push(d);
    }
  });

  let results = combined.filter(d => {
    if (filter === 'Domestic') return !d.isInternational;
    if (filter === 'International') return d.isInternational;
    return true;
  });

  if (q) {
    results = results.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      (d.state && d.state.toLowerCase().includes(q)) ||
      (d.tagline && d.tagline.toLowerCase().includes(q))
    );

    const exactMatch = results.some(d => cleanKey(d.name) === cleanQ || cleanKey(d.id) === cleanQ);
    if (!exactMatch && q.length >= 2) {
      const dynamicDest = generateDynamicDestination(searchQuery);
      results.unshift(dynamicDest);
    }
  }

  return results;
}

export default {
  getOrGenerateDestination,
  searchAllDestinations,
  generateDynamicDestination,
  GLOBAL_KNOWLEDGE_BASE
};
