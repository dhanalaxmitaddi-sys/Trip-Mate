// Complete Supported Destinations for TripMate Frontend
// Domestic: Hyderabad, Bengaluru, Goa, Delhi, Mumbai, Jaipur, Chennai, Kerala, Manali
// International: Dubai, Paris, Singapore, Bangkok, Bali, London, Tokyo, New York, Rome, Kuala Lumpur

const destinations = [
  {
    "id": "hyderabad",
    "name": "Hyderabad",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "heritage",
    "state": "Telangana",
    "tagline": "City of Pearls, Nizami Grandeur & World-Famous Biryani",
    "description": "A charismatic 400-year-old metropolis blending historic minarets, the legendary Kohinoor lore, vibrant bazaars, and high-tech Cyberabad.",
    "coverImage": "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 2400,
    "foodRate": 750,
    "transportRate": 700,
    "weather": [
      {
        "month": 1,
        "tempC": 25,
        "condition": "Pleasant",
        "humidity": 50,
        "icon": "Sun",
        "suggestion": "Crisp sunny mornings, perfect for exploring Golconda Fort."
      },
      {
        "month": 2,
        "tempC": 28,
        "condition": "Sunny",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Warm days, great for evening lake cruises at Hussain Sagar."
      },
      {
        "month": 3,
        "tempC": 33,
        "condition": "Warm",
        "humidity": 40,
        "icon": "Sun",
        "suggestion": "Warm afternoons; stay hydrated and visit Chowmahalla Palace."
      },
      {
        "month": 4,
        "tempC": 38,
        "condition": "Hot",
        "humidity": 35,
        "icon": "Sun",
        "suggestion": "Summer heat; carry sun protection and explore air-conditioned museums."
      },
      {
        "month": 5,
        "tempC": 40,
        "condition": "Very Hot",
        "humidity": 38,
        "icon": "Sun",
        "suggestion": "High temperatures; schedule outdoor activities in morning."
      },
      {
        "month": 6,
        "tempC": 32,
        "condition": "Monsoon Showers",
        "humidity": 70,
        "icon": "CloudRain",
        "suggestion": "Refreshing pre-monsoon showers and cozy cafe culture."
      },
      {
        "month": 7,
        "tempC": 29,
        "condition": "Rainy",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Cool monsoon weather; enjoy piping hot Irani Chai & Osmania biscuits."
      },
      {
        "month": 8,
        "tempC": 28,
        "condition": "Rainy",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Lush city gardens and great indoor cultural spots."
      },
      {
        "month": 9,
        "tempC": 29,
        "condition": "Pleasant",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "Gentle breezes; ideal for Ramoji Film City day tour."
      },
      {
        "month": 10,
        "tempC": 30,
        "condition": "Clear Skies",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Festive season beginnings and pleasant sightseeing."
      },
      {
        "month": 11,
        "tempC": 27,
        "condition": "Sunny",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Peak travel season with cool nights."
      },
      {
        "month": 12,
        "tempC": 24,
        "condition": "Mild Cool",
        "humidity": 52,
        "icon": "Sun",
        "suggestion": "Delightful winter weather for Old City heritage walks."
      }
    ],
    "packingRules": [
      "modest-clothing",
      "walking-shoes",
      "sunscreen",
      "sunglasses"
    ],
    "coordinates": {
      "lat": 17.385,
      "lng": 78.4867
    },
    "places": [
      {
        "id": "hyd-charminar",
        "name": "Charminar & Laad Bazaar",
        "category": "Culture",
        "rating": 4.8,
        "price": 50,
        "location": "Old City, Hyderabad",
        "description": "Iconic 1591 monument with four grand minarets, surrounded by colorful lacquer bangle stalls and pearl merchants.",
        "tags": [
          "Culture",
          "Shopping",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30",
        "bestTimeToVisit": "Morning & Sunset"
      },
      {
        "id": "hyd-golconda",
        "name": "Golconda Fort & Acoustic Echo Walk",
        "category": "History",
        "rating": 4.7,
        "price": 150,
        "location": "Ibrahim Bagh",
        "description": "Magnificent fortress renowned for its acoustic engineering, royal palaces, diamond vaults, and evening sound-and-light show.",
        "tags": [
          "History",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00",
        "bestTimeToVisit": "Late Afternoon"
      },
      {
        "id": "hyd-ramoji",
        "name": "Ramoji Film City Grand Studio",
        "category": "Adventure",
        "rating": 4.6,
        "price": 1250,
        "location": "Hayathnagar",
        "description": "Guinness World Record holding film complex with stunt shows, movie sets, gardens, and adventure rides.",
        "tags": [
          "Adventure",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30",
        "bestTimeToVisit": "Full Day"
      },
      {
        "id": "hyd-chowmahalla",
        "name": "Chowmahalla Palace & Vintage Cars",
        "category": "Culture",
        "rating": 4.7,
        "price": 100,
        "location": "Motigallu, Khilwat",
        "description": "Opulent seat of the Asaf Jahi dynasty featuring vintage Rolls Royce cars, Belgian crystal chandeliers, and lush courtyards.",
        "tags": [
          "Culture",
          "History",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "hyd-biryani-paradise",
        "name": "Authentic Hyderabadi Dum Biryani Feast",
        "category": "Food",
        "rating": 4.9,
        "price": 650,
        "location": "Banjara Hills / Abids",
        "description": "Tender slow-cooked spiced mutton layered with fragrant basmati rice, served with mirchi ka salan and dahi chutney.",
        "tags": [
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        "openingHours": "12:00 - 23:30",
        "bestTimeToVisit": "Lunch & Dinner"
      },
      {
        "id": "hyd-hussain-sagar",
        "name": "Hussain Sagar Lake & Buddha Statue Boat Ride",
        "category": "Nature",
        "rating": 4.5,
        "price": 120,
        "location": "Necklace Road",
        "description": "Heart-shaped urban lake with speedboat rides to the world's tallest monolithic Buddha statue and breezy promenade.",
        "tags": [
          "Nature",
          "Relaxed",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 22:00",
        "bestTimeToVisit": "Sunset & Evening"
      },
      {
        "id": "hyd-salar-jung",
        "name": "Salar Jung Museum & Musical Clock",
        "category": "Culture",
        "rating": 4.8,
        "price": 50,
        "location": "Darulshifa",
        "description": "One of the largest individual art collections in the world, famous for the veiled Rebecca marble and 19th-century mechanical clock.",
        "tags": [
          "Culture",
          "History",
          "Art"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "hyd-qutb-shahi",
        "name": "Qutb Shahi Tombs & Royal Gardens",
        "category": "History",
        "rating": 4.7,
        "price": 40,
        "location": "Tolichowki",
        "description": "Grand domed mausoleums blending Persian, Pashtun, and Hindu architecture set in tranquil Ibrahim Bagh landscaped gardens.",
        "tags": [
          "History",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 16:30",
        "bestTimeToVisit": "Late Afternoon"
      },
      {
        "id": "hyd-shilparamam",
        "name": "Shilparamam Arts & Crafts Village",
        "category": "Shopping",
        "rating": 4.6,
        "price": 60,
        "location": "HITEC City, Madhapur",
        "description": "Rural heritage crafts village with terracotta artisans, handloom silks, boating, and open-air ethnic performances.",
        "tags": [
          "Shopping",
          "Culture",
          "Handicrafts"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:30 - 20:30",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "hyd-birla-mandir",
        "name": "Birla Mandir & Naubat Pahad Sunset View",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 0,
        "location": "Hill Fort Road",
        "description": "Pristine white Rajasthani marble temple perched atop a 280-foot hill offering sweeping panoramic skyline views.",
        "tags": [
          "Sightseeing",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 12:00, 15:00 - 21:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "hyd-zoo-park",
        "name": "Nehru Zoological Park & Lion Safari",
        "category": "Nature",
        "rating": 4.5,
        "price": 80,
        "location": "Bahadurpura",
        "description": "Expansive 380-acre botanical and wildlife sanctuary featuring safari vans, nocturnal animal house, and serene lakes.",
        "tags": [
          "Nature",
          "Wildlife",
          "Family"
        ],
        "image": "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:30 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "hyd-nimrah-cafe",
        "name": "Nimrah Cafe Irani Chai & Osmania Biscuits",
        "category": "Food",
        "rating": 4.9,
        "price": 80,
        "location": "Charminar Road",
        "description": "Legendary heritage tea stall brewing spiced, milky Irani Chai paired with warm melt-in-the-mouth salted Osmania biscuits.",
        "tags": [
          "Food",
          "Local Street Eats",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
        "openingHours": "04:00 - 23:00",
        "bestTimeToVisit": "Morning & Late Night"
      },
      {
        "id": "hyd-durgam-cheruvu",
        "name": "Durgam Cheruvu Cable Bridge & Waterfront",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Jubilee Hills",
        "description": "Stunning illuminated suspension cable bridge over the Secret Lake, featuring a floating musical fountain and modern cafes.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Nightlife"
        ],
        "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Night"
      },
      {
        "id": "hyd-falaknuma",
        "name": "Taj Falaknuma Palace Royal Tea Walk",
        "category": "Culture",
        "rating": 4.9,
        "price": 2500,
        "location": "Engine Bowli, Falaknuma",
        "description": "Scorpion-shaped Italian marble palace 2,000 feet above the city, once home to the Nizam, featuring royal horse carriage arrivals.",
        "tags": [
          "Culture",
          "Luxury",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "15:30 - 18:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "hyd-mozamjahi",
        "name": "Mozamjahi Heritage Market & Famous Ice Cream",
        "category": "Food",
        "rating": 4.6,
        "price": 150,
        "location": "Abids",
        "description": "Granite heritage clock tower bazaar established in 1935, celebrated for handmade seasonal fruit ice creams (Mango & Sapota).",
        "tags": [
          "Food",
          "Heritage",
          "Dessert"
        ],
        "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 23:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "hyd-kbr-park",
        "name": "KBR National Park Jubilee Hills Trail",
        "category": "Nature",
        "rating": 4.7,
        "price": 40,
        "location": "Jubilee Hills",
        "description": "Pristine urban rainforest nature trail surrounded by boulder rock formations, peacocks, and lush native flora.",
        "tags": [
          "Nature",
          "Trek",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "05:30 - 09:30, 16:30 - 18:30",
        "bestTimeToVisit": "Early Morning"
      }
    ],
    "foods": [
      {
        "name": "Hyderabadi Dum Biryani",
        "category": "Non-Veg",
        "price": "₹350 - ₹600",
        "rating": 4.9,
        "location": "Paradise / Bawarchi / Shah Ghouse"
      },
      {
        "name": "Irani Chai & Osmania Biscuits",
        "category": "Veg",
        "price": "₹40 - ₹80",
        "rating": 4.8,
        "location": "Nimrah Cafe, Charminar"
      },
      {
        "name": "Haleem (Slow-cooked meat & lentils)",
        "category": "Non-Veg",
        "price": "₹250 - ₹450",
        "rating": 4.9,
        "location": "Pista House"
      },
      {
        "name": "Double Ka Meetha",
        "category": "Veg / Dessert",
        "price": "₹120 - ₹200",
        "rating": 4.7,
        "location": "Old City Bakeries"
      }
    ],
    "stays": [
      {
        "name": "Taj Falaknuma Palace",
        "type": "Luxury",
        "price": 28000,
        "rating": 4.9,
        "amenities": [
          "Royal Suites",
          "Heritage Walk",
          "Nizami Dining"
        ]
      },
      {
        "name": "ITC Kakatiya Luxury Collection",
        "type": "Mid-Range",
        "price": 6500,
        "rating": 4.7,
        "amenities": [
          "Pool",
          "Deccan Spa",
          "Free Wi-Fi"
        ]
      },
      {
        "name": "FabHotel Prime Banjara",
        "type": "Budget",
        "price": 2200,
        "rating": 4.3,
        "amenities": [
          "AC Rooms",
          "Free Breakfast",
          "Prime Location"
        ]
      }
    ]
  },
  {
    "id": "bengaluru",
    "name": "Bengaluru",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "metro",
    "state": "Karnataka",
    "tagline": "Garden City, Silicon Hub & Microbrewery Capital",
    "description": "Dynamic cosmopolitan hub known for sprawling lush parks, historic palaces, legendary filter coffee, and innovative craft breweries.",
    "coverImage": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 2600,
    "foodRate": 850,
    "transportRate": 750,
    "weather": [
      {
        "month": 1,
        "tempC": 22,
        "condition": "Pleasant",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Pleasant cool breeze, perfect for walking tours in Cubbon Park."
      },
      {
        "month": 2,
        "tempC": 25,
        "condition": "Sunny",
        "humidity": 50,
        "icon": "Sun",
        "suggestion": "Warm days, great for Lalbagh flower show."
      },
      {
        "month": 3,
        "tempC": 30,
        "condition": "Warm",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Early summer; morning walks and evening craft breweries."
      },
      {
        "month": 4,
        "tempC": 33,
        "condition": "Warm",
        "humidity": 48,
        "icon": "Sun",
        "suggestion": "Warmest month, but cooler than coastal cities."
      },
      {
        "month": 5,
        "tempC": 31,
        "condition": "Pre-monsoon Showers",
        "humidity": 62,
        "icon": "CloudRain",
        "suggestion": "Occasional refreshing evening thunderstorms."
      },
      {
        "month": 6,
        "tempC": 26,
        "condition": "Breezy Rain",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "Pleasant cloudy skies and cool rains."
      },
      {
        "month": 7,
        "tempC": 25,
        "condition": "Monsoon",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Gentle drizzle; perfect for steaming Benne Dosa & Filter Kaapi."
      },
      {
        "month": 8,
        "tempC": 25,
        "condition": "Monsoon",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Green parks and great indoor tech museums."
      },
      {
        "month": 9,
        "tempC": 26,
        "condition": "Pleasant",
        "humidity": 72,
        "icon": "CloudRain",
        "suggestion": "Clear pleasant weather for weekend palace tours."
      },
      {
        "month": 10,
        "tempC": 26,
        "condition": "Clear Skies",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Vibrant festive lights and pleasant climate."
      },
      {
        "month": 11,
        "tempC": 24,
        "condition": "Cool",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Cool evenings, great for Brigade Road shopping."
      },
      {
        "month": 12,
        "tempC": 21,
        "condition": "Chilly Nights",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Best winter weather in South India."
      }
    ],
    "packingRules": [
      "light-jacket",
      "walking-shoes",
      "umbrella",
      "casual-wear"
    ],
    "coordinates": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "places": [
      {
        "id": "blr-lalbagh",
        "name": "Lalbagh Botanical Garden & Glass House",
        "category": "Nature",
        "rating": 4.8,
        "price": 30,
        "location": "Mavalli",
        "description": "240-acre botanical haven dating to Hyder Ali, featuring London Crystal Palace-inspired glass pavilion and centuries-old trees.",
        "tags": [
          "Nature",
          "Photography",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 19:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "blr-palace",
        "name": "Bangalore Palace & Tudor Towers",
        "category": "History",
        "rating": 4.6,
        "price": 250,
        "location": "Vasanth Nagar",
        "description": "19th-century royal palace resembling England's Windsor Castle, featuring fortified towers, woodcarvings, and vintage paintings.",
        "tags": [
          "History",
          "Culture",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:30",
        "bestTimeToVisit": "Late Morning"
      },
      {
        "id": "blr-cubbon",
        "name": "Cubbon Park & Bamboo Forest Stroll",
        "category": "Nature",
        "rating": 4.7,
        "price": 0,
        "location": "Kasturba Road",
        "description": "Sprawling 300-acre green lung in central Bangalore with red Gothic libraries, walking trails, and canopy trees.",
        "tags": [
          "Nature",
          "Relaxed",
          "Walks"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 20:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "blr-vidhana",
        "name": "Vidhana Soudha & High Court View",
        "category": "Sightseeing",
        "rating": 4.6,
        "price": 0,
        "location": "Ambedkar Veedhi",
        "description": "Imposing Neo-Dravidian granite legislative assembly palace, brilliantly illuminated with golden floodlights on Sunday evenings.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Night View"
        ],
        "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "External Viewing",
        "bestTimeToVisit": "Evening Illumination"
      },
      {
        "id": "blr-dosa-vidyarthi",
        "name": "Vidyarthi Bhavan Crispy Masala Dosa",
        "category": "Food",
        "rating": 4.9,
        "price": 180,
        "location": "Gandhi Bazaar, Basavanagudi",
        "description": "Historic 1943 heritage tiffin room serving thick, golden-crispy ghee masala dosas served with unlimited coconut chutney.",
        "tags": [
          "Food",
          "Iconic",
          "Breakfast"
        ],
        "image": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:30 - 12:00, 14:00 - 20:00",
        "bestTimeToVisit": "Morning Breakfast"
      },
      {
        "id": "blr-bannerghatta",
        "name": "Bannerghatta Biological Park & Bear Safari",
        "category": "Adventure",
        "rating": 4.5,
        "price": 350,
        "location": "Bannerghatta",
        "description": "Vast conservation park with tiger & sloth bear bus safari, butterfly conservatory dome, and zoo.",
        "tags": [
          "Adventure",
          "Wildlife",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "blr-commercial-st",
        "name": "Commercial Street Silk & Artisan Bazaars",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Tasker Town, Shivajinagar",
        "description": "Vibrant shopping grid renowned for Mysore pure silks, silver trinkets, bespoke tailoring, and hot roadside snacks.",
        "tags": [
          "Shopping",
          "Culture",
          "Fashion"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:30 - 21:00",
        "bestTimeToVisit": "Afternoon & Evening"
      },
      {
        "id": "blr-tipu-palace",
        "name": "Tipu Sultan's Summer Palace & Teak Pillars",
        "category": "History",
        "rating": 4.5,
        "price": 25,
        "location": "Chamrajpet",
        "description": "Two-story 1791 teakwood summer retreat adorned with floral motifs, carved arches, and historical Mysore war artifacts.",
        "tags": [
          "History",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:30 - 17:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "blr-church-st",
        "name": "Church Street Bookstores & Cozy Cafes",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Church Street, Ashok Nagar",
        "description": "Pedestrianized cobblestone avenue buzzing with legendary Blossom Book House, indie art galleries, and craft coffee bars.",
        "tags": [
          "Culture",
          "Nightlife",
          "Walks"
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 23:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "blr-iskcon",
        "name": "ISKCON Temple Rajajinagar Grand Complex",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Hare Krishna Hill, Rajajinagar",
        "description": "Magnificent hill shrine with intricate gold-plated flagstaff, spiritual multimedia pavilions, and delicious temple prasadam.",
        "tags": [
          "Culture",
          "Architecture",
          "Spiritual"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:15 - 13:00, 16:15 - 20:30",
        "bestTimeToVisit": "Evening Aarti"
      },
      {
        "id": "blr-hal-aero",
        "name": "HAL Heritage Centre & Aerospace Aviation Park",
        "category": "Sightseeing",
        "rating": 4.6,
        "price": 80,
        "location": "Old Airport Road",
        "description": "India's premier aviation museum displaying indigenous fighter jets, helicopters, radar towers, and flight simulators.",
        "tags": [
          "Sightseeing",
          "History",
          "Family"
        ],
        "image": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 16:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "blr-toit-brew",
        "name": "Toit Indiranagar Craft Brews & Woodfire Eats",
        "category": "Food",
        "rating": 4.8,
        "price": 900,
        "location": "100ft Road, Indiranagar",
        "description": "Pioneering microbrewery with British pub vibes serving signature Tint-In-Wit Belgian ales and gourmet sourdough pizzas.",
        "tags": [
          "Food",
          "Nightlife",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "12:00 - 00:30",
        "bestTimeToVisit": "Evening & Dinner"
      },
      {
        "id": "blr-ulsoor-lake",
        "name": "Ulsoor Lake Boating & Sunset Island Walk",
        "category": "Nature",
        "rating": 4.5,
        "price": 60,
        "location": "Ulsoor, Halasuru",
        "description": "Historic 120-acre lake dotted with verdant islands, pedal boat facilities, and perimeter jogging paths under weeping figs.",
        "tags": [
          "Nature",
          "Boating",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 20:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "blr-ngma",
        "name": "National Gallery of Modern Art (NGMA)",
        "category": "Culture",
        "rating": 4.7,
        "price": 40,
        "location": "Palace Road, Vasanth Nagar",
        "description": "Colonial-era Manikyavelu heritage mansion surrounded by mirror reflection pools and modern Indian art retrospectives.",
        "tags": [
          "Culture",
          "Art",
          "Heritage"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "blr-vv-puram",
        "name": "VV Puram Thindi Beedi Street Food Trail",
        "category": "Food",
        "rating": 4.8,
        "price": 250,
        "location": "Old Brahmin Street, Sajjan Rao Circle",
        "description": "Legendary nocturnal vegetarian street culinary lane serving hot paddus, buttery congress bun, and seasonal rasgulla chaat.",
        "tags": [
          "Food",
          "Street Eats",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "18:00 - 23:30",
        "bestTimeToVisit": "Night Food Trail"
      },
      {
        "id": "blr-bull-temple",
        "name": "Bull Temple & Basavanagudi Heritage Quarter",
        "category": "Culture",
        "rating": 4.6,
        "price": 0,
        "location": "Bull Temple Road",
        "description": "Monolithic 16th-century granite Nandi bull statue carved from a single boulder, center of the annual groundnut fair.",
        "tags": [
          "Culture",
          "History",
          "Heritage"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 20:00",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Benne Masala Dosa",
        "category": "Veg",
        "price": "₹90 - ₹160",
        "rating": 4.9,
        "location": "CTR Malleshwaram"
      },
      {
        "name": "Traditional Filter Kaapi",
        "category": "Beverage",
        "price": "₹30 - ₹60",
        "rating": 4.9,
        "location": "Brahmin's Coffee Bar"
      },
      {
        "name": "Bisi Bele Bath",
        "category": "Veg",
        "price": "₹80 - ₹140",
        "rating": 4.7,
        "location": "MTR Lalbagh"
      },
      {
        "name": "Mangalorean Ghee Roast",
        "category": "Non-Veg",
        "price": "₹350 - ₹600",
        "rating": 4.8,
        "location": "Kudla / Sea Rock"
      }
    ],
    "stays": [
      {
        "name": "The Leela Palace Bengaluru",
        "type": "Luxury",
        "price": 16000,
        "rating": 4.9,
        "amenities": [
          "Art-deco Decor",
          "Outdoor Pool",
          "Spa"
        ]
      },
      {
        "name": "Taj West End Bengaluru",
        "type": "Luxury",
        "price": 14000,
        "rating": 4.8,
        "amenities": [
          "Heritage Gardens",
          "Tennis",
          "Fine Dining"
        ]
      },
      {
        "name": "Bloomrooms @ Indiranagar",
        "type": "Budget",
        "price": 2800,
        "rating": 4.4,
        "amenities": [
          "Clean Design",
          "High Speed Wi-Fi",
          "Metro Access"
        ]
      }
    ]
  },
  {
    "id": "goa",
    "name": "Goa",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "beach",
    "state": "Goa",
    "tagline": "Sun, Sand, Sea and Portuguese Heritage",
    "description": "Famous for its pristine coastline, sun-kissed beaches, lively night markets, water sports, and colonial architecture.",
    "coverImage": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 2500,
    "foodRate": 900,
    "transportRate": 800,
    "weather": [
      {
        "month": 1,
        "tempC": 28,
        "condition": "Sunny",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Pleasant beach weather. Ideal for water sports and exploring old churches."
      },
      {
        "month": 2,
        "tempC": 30,
        "condition": "Sunny",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Warm days, perfect for swimming and coastal sunset cruises."
      },
      {
        "month": 3,
        "tempC": 32,
        "condition": "Warm",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Warm afternoons; stay hydrated and enjoy beach cafes."
      },
      {
        "month": 4,
        "tempC": 33,
        "condition": "Humid",
        "humidity": 74,
        "icon": "Sun",
        "suggestion": "Hot and humid; carry sun protection and light cotton wear."
      },
      {
        "month": 5,
        "tempC": 34,
        "condition": "Hot & Humid",
        "humidity": 76,
        "icon": "Sun",
        "suggestion": "Pre-monsoon heat; visit waterfalls and air-conditioned heritage museums."
      },
      {
        "month": 6,
        "tempC": 29,
        "condition": "Monsoon Rain",
        "humidity": 88,
        "icon": "CloudRain",
        "suggestion": "Heavy showers; carry rain gear. Dudhsagar falls are magnificent."
      },
      {
        "month": 7,
        "tempC": 28,
        "condition": "Rainy",
        "humidity": 90,
        "icon": "CloudRain",
        "suggestion": "Lush green Goa; pack raincoats and non-slip sandals."
      },
      {
        "month": 8,
        "tempC": 28,
        "condition": "Rainy",
        "humidity": 88,
        "icon": "CloudRain",
        "suggestion": "Monsoon rejuvenation; explore spice plantations."
      },
      {
        "month": 9,
        "tempC": 29,
        "condition": "Scattered Showers",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Clearing skies, quieter beaches and blooming countryside."
      },
      {
        "month": 10,
        "tempC": 31,
        "condition": "Pleasant",
        "humidity": 72,
        "icon": "Sun",
        "suggestion": "Season reopening; great for flea markets and water sports."
      },
      {
        "month": 11,
        "tempC": 30,
        "condition": "Clear Skies",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Peak season begins; book beach shacks and activities early."
      },
      {
        "month": 12,
        "tempC": 29,
        "condition": "Sunny",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Festive Christmas & New Year vibes. Cool sea breezes."
      }
    ],
    "packingRules": [
      "beach",
      "sunscreen",
      "light-clothing",
      "sunglasses",
      "flip-flops",
      "swimwear"
    ],
    "coordinates": {
      "lat": 15.2993,
      "lng": 74.124
    },
    "places": [
      {
        "id": "goa-baga",
        "name": "Baga Beach Water Sports & Seaside Shacks",
        "category": "Beach",
        "rating": 4.6,
        "price": 600,
        "location": "North Goa",
        "description": "Lively beach renowned for parasailing, banana rides, buzzing seaside shacks, and vibrant sunset nightlife.",
        "tags": [
          "Beach",
          "Adventure",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Morning & Late Afternoon"
      },
      {
        "id": "goa-basilica",
        "name": "Basilica of Bom Jesus & Old Goa Heritage",
        "category": "History",
        "rating": 4.8,
        "price": 50,
        "location": "Old Goa",
        "description": "UNESCO World Heritage site holding the mortal remains of St. Francis Xavier, stunning baroque Catholic architecture.",
        "tags": [
          "History",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "goa-fort-aguada",
        "name": "Fort Aguada & Portuguese Lighthouse",
        "category": "History",
        "rating": 4.7,
        "price": 100,
        "location": "Sinquerim, Candolim",
        "description": "17th-century Portuguese fortress overlooking the vast Arabian Sea with a well-preserved lighthouse.",
        "tags": [
          "History",
          "Nature",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 17:30",
        "bestTimeToVisit": "Late Afternoon for Sunset"
      },
      {
        "id": "goa-dudhsagar",
        "name": "Dudhsagar Waterfalls & Jungle Jeep Safari",
        "category": "Nature",
        "rating": 4.9,
        "price": 900,
        "location": "Sonaulim, South Goa",
        "description": "Four-tiered milky white waterfall cascading 310 meters through the verdant Western Ghats rainforest.",
        "tags": [
          "Nature",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "goa-fontainhas",
        "name": "Fontainhas Latin Quarter Cultural Walk",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Panaji",
        "description": "Historic Portuguese quarter boasting vibrant pastel-colored colonial villas, wrought-iron balconies, and heritage cafes.",
        "tags": [
          "Culture",
          "Photography",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Morning & Late Afternoon"
      },
      {
        "id": "goa-chapora",
        "name": "Chapora Fort & Vagator Sunset Cliff",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Vagator, North Goa",
        "description": "Iconic clifftop ramparts with breathtaking panoramic vistas over the Chapora River mouth and Vagator beach coastline.",
        "tags": [
          "Sightseeing",
          "Photography",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:30",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "goa-spice-plantation",
        "name": "Sahakari Spice Farm Tour & Traditional Goan Buffet",
        "category": "Food",
        "rating": 4.8,
        "price": 500,
        "location": "Ponda, Central Goa",
        "description": "Guided aromatic plantation walk surrounded by cardamom, vanilla, and peri-peri, followed by an authentic Goan feast.",
        "tags": [
          "Food",
          "Nature",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 16:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "goa-anjuna-market",
        "name": "Anjuna Flea Market & Seaside Stalls",
        "category": "Shopping",
        "rating": 4.5,
        "price": 0,
        "location": "Anjuna Beach",
        "description": "Legendary beach bazaar packed with bohemian apparel, handcrafted silver jewelry, spices, and live acoustic music.",
        "tags": [
          "Shopping",
          "Culture",
          "Beach"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 19:00 (Wednesdays & Weekends)",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "goa-calangute-sports",
        "name": "Calangute Beach Watersports & Speedboat Trail",
        "category": "Adventure",
        "rating": 4.6,
        "price": 750,
        "location": "Calangute, North Goa",
        "description": "High-octane water adventures including jet skiing, parasailing, and bumper boat rides over azure ocean swells.",
        "tags": [
          "Adventure",
          "Beach"
        ],
        "image": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "goa-mandovi-cruise",
        "name": "Panaji Mandovi River Sunset Cruise & Folk Dance",
        "category": "Relaxed",
        "rating": 4.7,
        "price": 450,
        "location": "Santa Monica Jetty, Panaji",
        "description": "Scenic 1-hour twilight cruise along the Mandovi River featuring live Goan Dekhni and Fugdi folk dance performances.",
        "tags": [
          "Relaxed",
          "Sightseeing",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "17:30 - 20:30",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "goa-palolem",
        "name": "Palolem Beach Kayaking & Dolphin Spotting",
        "category": "Beach",
        "rating": 4.9,
        "price": 400,
        "location": "Canacona, South Goa",
        "description": "Postcard-perfect crescent bay fringed by coconut palms, calm turquoise waters perfect for sea kayaking, and beach shacks.",
        "tags": [
          "Beach",
          "Nature",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Early Morning & Sunset"
      },
      {
        "id": "goa-reis-magos",
        "name": "Reis Magos Fort & Cultural Heritage Centre",
        "category": "Culture",
        "rating": 4.6,
        "price": 50,
        "location": "Verem, Bardez",
        "description": "Carefully restored 16th-century fortress and cultural center offering heritage gun bastions and estuary panoramas.",
        "tags": [
          "Culture",
          "History",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 17:00 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "goa-mapusa-bazaar",
        "name": "Mapusa Municipal Friday Bazaar & Local Spices",
        "category": "Shopping",
        "rating": 4.5,
        "price": 0,
        "location": "Mapusa",
        "description": "Bustling traditional market filled with local Goan chouriço sausages, dried fish, feni bottles, and handmade clay pottery.",
        "tags": [
          "Shopping",
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "goa-cabo-de-rama",
        "name": "Cabo de Rama Fort & Ocean Cliff Lookout",
        "category": "Photography",
        "rating": 4.8,
        "price": 0,
        "location": "Canaguinim, South Goa",
        "description": "Wild cliffside medieval fortress with panoramic views where Rama and Sita were believed to have stayed during exile.",
        "tags": [
          "Photography",
          "Nature",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "goa-morjim",
        "name": "Morjim Beach & Olive Ridley Turtle Shore",
        "category": "Nature",
        "rating": 4.7,
        "price": 0,
        "location": "Pernem, North Goa",
        "description": "Serene, tranquil sands known as a protected nesting habitat for endangered Olive Ridley sea turtles and migratory birds.",
        "tags": [
          "Nature",
          "Beach",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunrise"
      },
      {
        "id": "goa-divar-island",
        "name": "Divar Island Ferry & Countryside Cycling",
        "category": "Relaxed",
        "rating": 4.8,
        "price": 150,
        "location": "Mandovi Estuary",
        "description": "Tranquil river island accessible only by ferry, featuring sleepy Portuguese villages, paddy fields, and hilltop churches.",
        "tags": [
          "Relaxed",
          "Culture",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 22:00",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Goan Fish Curry Rice",
        "category": "Seafood",
        "price": "₹280 - ₹450",
        "rating": 4.8,
        "location": "Ritz Classic, Panaji"
      },
      {
        "name": "Prawn Balchão",
        "category": "Seafood",
        "price": "₹380 - ₹600",
        "rating": 4.7,
        "location": "Fisherman's Wharf"
      },
      {
        "name": "Bebinca (Layered Dessert)",
        "category": "Veg / Dessert",
        "price": "₹150 - ₹250",
        "rating": 4.6,
        "location": "Local Bakeries"
      }
    ],
    "stays": [
      {
        "name": "Taj Exotica Resort & Spa",
        "type": "Luxury",
        "price": 18500,
        "rating": 4.9,
        "amenities": [
          "Private Beach",
          "Golf",
          "Ayurvedic Spa"
        ]
      },
      {
        "name": "Santana Beach Resort",
        "type": "Mid-Range",
        "price": 3800,
        "rating": 4.5,
        "amenities": [
          "Candolim Beach",
          "2 Pools",
          "Bar"
        ]
      },
      {
        "name": "Zostel Goa",
        "type": "Budget",
        "price": 1200,
        "rating": 4.4,
        "amenities": [
          "Dorm / Private",
          "Common Lounge",
          "Scooter Rental"
        ]
      }
    ]
  },
  {
    "id": "delhi",
    "name": "Delhi",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "heritage",
    "state": "Delhi NCR",
    "tagline": "Heart of India, Timeless Monuments & Street Gastronomy",
    "description": "India's capital city intertwining Mughal architectural masterpieces, British colonial boulevards, vibrant bazaars, and mouthwatering culinary traditions.",
    "coverImage": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 2800,
    "foodRate": 900,
    "transportRate": 800,
    "weather": [
      {
        "month": 1,
        "tempC": 15,
        "condition": "Cold & Foggy",
        "humidity": 75,
        "icon": "Cloud",
        "suggestion": "Crisp cold weather; pack woolens and enjoy hot jalebis in Old Delhi."
      },
      {
        "month": 2,
        "tempC": 20,
        "condition": "Pleasant",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Ideal springtime for Mughal Gardens and outdoor monument walks."
      },
      {
        "month": 3,
        "tempC": 27,
        "condition": "Warm",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Pleasant afternoons, good for Qutub Minar and Lodhi Art District."
      },
      {
        "month": 4,
        "tempC": 34,
        "condition": "Hot",
        "humidity": 32,
        "icon": "Sun",
        "suggestion": "Rising heat; stay hydrated and prefer evening heritage walks."
      },
      {
        "month": 5,
        "tempC": 40,
        "condition": "Very Hot",
        "humidity": 25,
        "icon": "Sun",
        "suggestion": "Intense peak summer; explore National Gallery of Modern Art & indoor malls."
      },
      {
        "month": 6,
        "tempC": 38,
        "condition": "Hot & Humid",
        "humidity": 48,
        "icon": "Sun",
        "suggestion": "Pre-monsoon heat; carry sun protection and sunglasses."
      },
      {
        "month": 7,
        "tempC": 32,
        "condition": "Monsoon",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "Rainy spells; pack umbrellas and rain-friendly footwear."
      },
      {
        "month": 8,
        "tempC": 31,
        "condition": "Humid Rain",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Humid monsoon; great for visiting Humayun's Tomb gardens."
      },
      {
        "month": 9,
        "tempC": 31,
        "condition": "Clear Skies",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Pleasant transitions; evening coffee at Connaught Place."
      },
      {
        "month": 10,
        "tempC": 28,
        "condition": "Pleasant",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Festive Diwali season, ideal for Dilli Haat handicraft shopping."
      },
      {
        "month": 11,
        "tempC": 22,
        "condition": "Cool",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Chilly evenings; great street food walks in Chandni Chowk."
      },
      {
        "month": 12,
        "tempC": 16,
        "condition": "Cold",
        "humidity": 72,
        "icon": "Cloud",
        "suggestion": "Winter season; pack jackets for night exploration."
      }
    ],
    "packingRules": [
      "modest-clothing",
      "walking-shoes",
      "sunscreen",
      "light-jacket"
    ],
    "coordinates": {
      "lat": 28.6139,
      "lng": 77.209
    },
    "places": [
      {
        "id": "delhi-red-fort",
        "name": "Red Fort (Lal Qila) & Mughal Grandeur",
        "category": "History",
        "rating": 4.6,
        "price": 80,
        "location": "Netaji Subhash Marg, Chandni Chowk",
        "description": "Massive 17th-century red sandstone fortress served as the main residence of Mughal emperors for nearly 200 years.",
        "tags": [
          "History",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 16:30 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "delhi-qutub-minar",
        "name": "Qutub Minar & Mehrauli Heritage Complex",
        "category": "History",
        "rating": 4.7,
        "price": 50,
        "location": "Mehrauli",
        "description": "Towering 73-meter victory minaret constructed in 1193, surrounded by ancient Afghan-era architectural ruins and iron pillar.",
        "tags": [
          "History",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 18:00",
        "bestTimeToVisit": "Early Morning or Sunset"
      },
      {
        "id": "delhi-humayun",
        "name": "Humayun's Tomb & Sunder Nursery Gardens",
        "category": "History",
        "rating": 4.8,
        "price": 100,
        "location": "Nizamuddin East",
        "description": "UNESCO World Heritage red sandstone garden tomb that inspired the Taj Mahal, alongside lush heritage nursery trails.",
        "tags": [
          "History",
          "Nature",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "delhi-india-gate",
        "name": "India Gate & Kartavya Path Grand Boulevard",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Central Secretariat",
        "description": "Iconic 42-meter triumphal war memorial arch flanked by sprawling public lawns, illuminated water fountains, and Amar Jawan Jyoti.",
        "tags": [
          "Sightseeing",
          "Relaxed",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "delhi-chandni-chowk",
        "name": "Chandni Chowk & Paranthe Wali Gali Food Trail",
        "category": "Food",
        "rating": 4.8,
        "price": 250,
        "location": "Old Delhi",
        "description": "Historic bustling Mughal lane famous for deep-fried stuffed parathas, jalebis, lassi, and authentic street gastronomy.",
        "tags": [
          "Food",
          "Culture",
          "Shopping"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 22:00",
        "bestTimeToVisit": "Lunch / Evening"
      },
      {
        "id": "delhi-lotus",
        "name": "Lotus Temple & Bahá'í Peaceful Sanctuaries",
        "category": "Culture",
        "rating": 4.6,
        "price": 0,
        "location": "Kalkaji",
        "description": "Stunning flower-like marble structure featuring 27 petals, open to people of all religions for peaceful silent meditation.",
        "tags": [
          "Culture",
          "Architecture",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "delhi-akshardham",
        "name": "Swaminarayan Akshardham Cultural Complex & Boat Ride",
        "category": "Culture",
        "rating": 4.9,
        "price": 250,
        "location": "Noida Mor, Pandav Nagar",
        "description": "Sprawling Hindu temple complex showcasing traditional stone craftsmanship, thematic cultural boat ride, and musical fountain.",
        "tags": [
          "Culture",
          "History",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 18:30 (Closed Mondays)",
        "bestTimeToVisit": "Afternoon to Evening"
      },
      {
        "id": "delhi-dilli-haat",
        "name": "Dilli Haat Crafts Bazaar & Regional Food Stalls",
        "category": "Shopping",
        "rating": 4.6,
        "price": 30,
        "location": "INA Market, Sri Aurobindo Marg",
        "description": "Open-air craft village showcasing artisan wood carvings, textiles, madhubani paintings, and food from all 28 Indian states.",
        "tags": [
          "Shopping",
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:30 - 22:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "delhi-lodhi-art",
        "name": "Lodhi Art District Murals & Historic Lodhi Garden",
        "category": "Photography",
        "rating": 4.7,
        "price": 0,
        "location": "Lodhi Colony",
        "description": "India's first open-air public art district with massive colorful street murals, paired with Sayyid & Lodi dynasty garden tombs.",
        "tags": [
          "Photography",
          "Culture",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "delhi-hauz-khas",
        "name": "Hauz Khas Medieval Fort & Lakefront Cafes",
        "category": "Relaxed",
        "rating": 4.6,
        "price": 25,
        "location": "Hauz Khas Village",
        "description": "13th-century water reservoir and Islamic madrasa ruins surrounded by trendy urban boutiques, live jazz bars, and cafes.",
        "tags": [
          "Relaxed",
          "History",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:30 - 19:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "delhi-jama-masjid",
        "name": "Jama Masjid & Karim's Old Delhi Culinary Walk",
        "category": "Culture",
        "rating": 4.8,
        "price": 50,
        "location": "Meena Bazaar, Chandni Chowk",
        "description": "India's largest congregational mosque with towering minarets, followed by royal Mughlai mutton kebabs and biryani.",
        "tags": [
          "Culture",
          "Food",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 12:00, 13:30 - 18:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "delhi-national-museum",
        "name": "National Museum of India & Harappan Antiquities",
        "category": "Culture",
        "rating": 4.7,
        "price": 50,
        "location": "Janpath, Rajpath Area",
        "description": "Treasury of 200,000 historic works spanning 5,000 years of civilization, including the famous bronze Dancing Girl.",
        "tags": [
          "Culture",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 18:00 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "delhi-connaught-place",
        "name": "Connaught Place Georgian Arcade & Underground Palika",
        "category": "Shopping",
        "rating": 4.5,
        "price": 0,
        "location": "Connaught Place",
        "description": "Colonial white-pillared circular plaza housing flagship international brands, heritage bookshops, and underground electronics markets.",
        "tags": [
          "Shopping",
          "Food",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 21:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "delhi-asola-bhatti",
        "name": "Asola Bhatti Wildlife Sanctuary & Neeli Jheel Lake",
        "category": "Nature",
        "rating": 4.7,
        "price": 100,
        "location": "Tughlakabad",
        "description": "Tranquil Aravalli forest sanctuary hosting golden jackals, nilgai, and azure hidden quarry lakes ideal for eco-treks.",
        "tags": [
          "Nature",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 15:00",
        "bestTimeToVisit": "Early Morning"
      }
    ],
    "foods": [
      {
        "name": "Old Delhi Butter Chicken",
        "category": "Non-Veg",
        "price": "₹400 - ₹750",
        "rating": 4.9,
        "location": "Moti Mahal / Karim's"
      },
      {
        "name": "Paranthe Wali Gali Assorted Parathas",
        "category": "Veg",
        "price": "₹80 - ₹150",
        "rating": 4.7,
        "location": "Chandni Chowk"
      },
      {
        "name": "Chole Bhature",
        "category": "Veg",
        "price": "₹120 - ₹220",
        "rating": 4.9,
        "location": "Sita Ram Diwan Chand"
      }
    ],
    "stays": [
      {
        "name": "The Imperial New Delhi",
        "type": "Luxury",
        "price": 17000,
        "rating": 4.9,
        "amenities": [
          "Colonial Heritage",
          "Museum",
          "Pool"
        ]
      },
      {
        "name": "Radisson Blu Marina CP",
        "type": "Mid-Range",
        "price": 6200,
        "rating": 4.5,
        "amenities": [
          "Central Location",
          "Metro Nearby",
          "Spa"
        ]
      },
      {
        "name": "Backpacker Panda Delhi",
        "type": "Budget",
        "price": 1100,
        "rating": 4.2,
        "amenities": [
          "Rooftop Cafe",
          "Lockers",
          "AC Dorms"
        ]
      }
    ]
  },
  {
    "id": "mumbai",
    "name": "Mumbai",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "metro",
    "state": "Maharashtra",
    "tagline": "City of Dreams, Marine Drive & Bollywood Energy",
    "description": "India's financial and entertainment capital pulsating with Victorian Gothic architecture, seafront promenades, and bustling street markets.",
    "coverImage": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 3500,
    "foodRate": 1000,
    "transportRate": 850,
    "weather": [
      {
        "month": 1,
        "tempC": 24,
        "condition": "Pleasant",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Best month to visit; cool breezes and sunset walks at Marine Drive."
      },
      {
        "month": 2,
        "tempC": 26,
        "condition": "Sunny",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Warm pleasant days, perfect for Kala Ghoda Art Festival."
      },
      {
        "month": 3,
        "tempC": 29,
        "condition": "Warm",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Rising humidity; evening ferry rides to Elephanta Caves."
      },
      {
        "month": 4,
        "tempC": 32,
        "condition": "Hot & Humid",
        "humidity": 72,
        "icon": "Sun",
        "suggestion": "Humid weather; dress in light breathable cottons."
      },
      {
        "month": 5,
        "tempC": 34,
        "condition": "Humid",
        "humidity": 75,
        "icon": "Sun",
        "suggestion": "Pre-monsoon heat; visit coastal cafes and seaside bistros."
      },
      {
        "month": 6,
        "tempC": 30,
        "condition": "Heavy Rains",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Monsoon arrives; dramatic waves at Bandstand. Carry sturdy rain gear."
      },
      {
        "month": 7,
        "tempC": 28,
        "condition": "Monsoon",
        "humidity": 90,
        "icon": "CloudRain",
        "suggestion": "Heavy tropical showers; pack waterproof footwear and raincoats."
      },
      {
        "month": 8,
        "tempC": 28,
        "condition": "Monsoon",
        "humidity": 88,
        "icon": "CloudRain",
        "suggestion": "Rainy days; enjoy steaming hot Vada Pav and cutting chai."
      },
      {
        "month": 9,
        "tempC": 29,
        "condition": "Humid Showers",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Ganesh Utsav celebrations bring electrifying cultural energy."
      },
      {
        "month": 10,
        "tempC": 32,
        "condition": "Sunny",
        "humidity": 70,
        "icon": "Sun",
        "suggestion": "Post-monsoon sunshine, great for heritage walking tours."
      },
      {
        "month": 11,
        "tempC": 29,
        "condition": "Pleasant",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Comfortable weather for street shopping and ferry rides."
      },
      {
        "month": 12,
        "tempC": 26,
        "condition": "Clear Skies",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Pleasant winter sea breezes across South Mumbai."
      }
    ],
    "packingRules": [
      "light-clothing",
      "walking-shoes",
      "sunglasses",
      "umbrella"
    ],
    "coordinates": {
      "lat": 19.076,
      "lng": 72.8777
    },
    "places": [
      {
        "id": "mum-gateway",
        "name": "Gateway of India & Colaba Causeway Heritage Walk",
        "category": "History",
        "rating": 4.7,
        "price": 0,
        "location": "Apollo Bunder, Colaba",
        "description": "Grand Indo-Saracenic triumphal arch overlooking Mumbai Harbour, next to the heritage Taj Mahal Palace Hotel.",
        "tags": [
          "History",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunrise & Evening"
      },
      {
        "id": "mum-marine-drive",
        "name": "Marine Drive (Queen's Necklace) Sunset Promenade",
        "category": "Relaxed",
        "rating": 4.8,
        "price": 0,
        "location": "South Mumbai",
        "description": "3.6-kilometer arc-shaped coastal boulevard offering cool sea breezes and sparkling night skyline reflections.",
        "tags": [
          "Relaxed",
          "Nature",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunset & Night"
      },
      {
        "id": "mum-elephanta",
        "name": "Elephanta Caves Island Ferry & Rock-cut Shrines",
        "category": "History",
        "rating": 4.8,
        "price": 250,
        "location": "Gharapuri Island",
        "description": "UNESCO World Heritage 5th-century basalt cave temples dedicated to Lord Shiva, reached by scenic harbor ferry.",
        "tags": [
          "History",
          "Culture",
          "Adventure"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mum-csmt",
        "name": "Chhatrapati Shivaji Maharaj Terminus (CSMT) Gothic Hall",
        "category": "History",
        "rating": 4.8,
        "price": 0,
        "location": "Fort, Mumbai",
        "description": "UNESCO World Heritage Victorian Gothic railway masterpiece with gargoyles, stone domes, and bustling commuter halls.",
        "tags": [
          "History",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Morning / Night Lights"
      },
      {
        "id": "mum-bandstand",
        "name": "Bandra Bandstand, Portuguese Fort & Mount Mary",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Bandra West",
        "description": "Celebrity seaside promenade, seaside fortress ruins, and the historic 1904 Mount Mary Basilica.",
        "tags": [
          "Sightseeing",
          "Relaxed",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "mum-juhu-beach",
        "name": "Juhu Beach Sunset & Street Food Pav Bhaji Trail",
        "category": "Food",
        "rating": 4.6,
        "price": 180,
        "location": "Juhu, Vile Parle",
        "description": "Bustling sandy shore famous for sunset strolls, airplane spotting, and piping hot butter pav bhaji and pani puri.",
        "tags": [
          "Food",
          "Beach",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "mum-haji-ali",
        "name": "Haji Ali Dargah & Worli Sea Face Promenade",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Worli Bay",
        "description": "15th-century mosque set on an offshore islet linked by a narrow stone causeway that submerges during high tides.",
        "tags": [
          "Culture",
          "History",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 22:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "mum-sanjay-gandhi",
        "name": "Sanjay Gandhi National Park & Ancient Kanheri Caves",
        "category": "Nature",
        "rating": 4.8,
        "price": 120,
        "location": "Borivali East",
        "description": "104 sq km urban wilderness hosting leopards, deer, and 109 rock-cut Buddhist caves dating from 1st century BC.",
        "tags": [
          "Nature",
          "Adventure",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mum-crawford",
        "name": "Crawford Market & Mangaldas Fabric Bazaar",
        "category": "Shopping",
        "rating": 4.5,
        "price": 0,
        "location": "Dhobi Talao, Fort",
        "description": "Lockwood Kipling-designed Victorian market hall brimming with fresh Alphonso mangoes, dry fruits, spices, and silk textiles.",
        "tags": [
          "Shopping",
          "Culture",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 20:00 (Closed Sundays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mum-kala-ghoda",
        "name": "Kala Ghoda Art Precinct & Heritage Cafes",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Kala Ghoda, Fort",
        "description": "Vibrant arts crescent housing Jehangir Art Gallery, David Sassoon Library, chic designer boutiques, and Parsi cafes.",
        "tags": [
          "Culture",
          "Photography",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 19:30",
        "bestTimeToVisit": "Morning to Afternoon"
      },
      {
        "id": "mum-sealink",
        "name": "Bandra-Worli Sea Link Panoramic Drive & Carter Road",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 100,
        "location": "Mahim Bay",
        "description": "Iconic 8-lane cable-stayed bridge spanning open sea waters, paired with trendy seaside cafes on Carter Road.",
        "tags": [
          "Sightseeing",
          "Relaxed",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Afternoon & Evening"
      },
      {
        "id": "mum-dharavi-crafts",
        "name": "Dharavi Artisan Pottery & Leather Workshop Tour",
        "category": "Culture",
        "rating": 4.8,
        "price": 600,
        "location": "Kumbharwada, Dharavi",
        "description": "Inspiring guided walkthrough of the historic potters colony and bustling micro-enterprises generating exquisite leather and pottery.",
        "tags": [
          "Culture",
          "Shopping"
        ],
        "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 16:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mum-chowpatty",
        "name": "Girgaon Chowpatty Sunset & Kulfi Tasting",
        "category": "Beach",
        "rating": 4.6,
        "price": 120,
        "location": "Marine Drive North",
        "description": "Traditional seaside sand gathering where generations have enjoyed golden sunsets and rich malai kulfi on ice.",
        "tags": [
          "Beach",
          "Food",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "mum-manori",
        "name": "Manori Island Ferry & Tranquil Beach Escape",
        "category": "Nature",
        "rating": 4.7,
        "price": 150,
        "location": "Malad West",
        "description": "Tranquil coastal fishing hamlet nicknamed \"Little Goa\" with quiet beaches, casuarina groves, and fresh seafood shacks.",
        "tags": [
          "Nature",
          "Beach",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 22:00",
        "bestTimeToVisit": "Day Excursion"
      }
    ],
    "foods": [
      {
        "name": "Bombay Vada Pav & Cutting Chai",
        "category": "Street Food",
        "price": "₹30 - ₹70",
        "rating": 4.9,
        "location": "Aram Vada Pav / Ashok"
      },
      {
        "name": "Butter Pav Bhaji",
        "category": "Veg",
        "price": "₹160 - ₹280",
        "rating": 4.8,
        "location": "Sardar Refreshments"
      },
      {
        "name": "Bombil / Bombat Duck Fry",
        "category": "Seafood",
        "price": "₹350 - ₹550",
        "rating": 4.7,
        "location": "Gajalee / Trishna"
      }
    ],
    "stays": [
      {
        "name": "The Taj Mahal Palace",
        "type": "Luxury",
        "price": 26000,
        "rating": 4.9,
        "amenities": [
          "Harbour Views",
          "Heritage Suites",
          "9 Restaurants"
        ]
      },
      {
        "name": "Trident Nariman Point",
        "type": "Luxury",
        "price": 12500,
        "rating": 4.8,
        "amenities": [
          "Marine Drive View",
          "Pool",
          "Spa"
        ]
      },
      {
        "name": "Abode Bombay Heritage Hotel",
        "type": "Mid-Range",
        "price": 5400,
        "rating": 4.6,
        "amenities": [
          "Colaba Location",
          "Boutique Design",
          "Free Wi-Fi"
        ]
      }
    ]
  },
  {
    "id": "jaipur",
    "name": "Jaipur",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "heritage",
    "state": "Rajasthan",
    "tagline": "The Pink City of Royal Forts & Vibrant Bazaars",
    "description": "Capital of Rajasthan famous for blushing terracotta palaces, hilltop fortresses, gemstone jewelry, and royal Rajasthani thalis.",
    "coverImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 2600,
    "foodRate": 800,
    "transportRate": 750,
    "weather": [
      {
        "month": 1,
        "tempC": 18,
        "condition": "Pleasant & Sunny",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Peak tourism season; wonderful sunny days and cozy evenings."
      },
      {
        "month": 2,
        "tempC": 22,
        "condition": "Sunny",
        "humidity": 40,
        "icon": "Sun",
        "suggestion": "Warm afternoons, ideal for Amer Fort elephant rides and palace walks."
      },
      {
        "month": 3,
        "tempC": 28,
        "condition": "Warm",
        "humidity": 32,
        "icon": "Sun",
        "suggestion": "Warm days, great for exploring vibrant Bapu Bazaar handicrafts."
      },
      {
        "month": 4,
        "tempC": 35,
        "condition": "Hot",
        "humidity": 25,
        "icon": "Sun",
        "suggestion": "Dry summer heat; plan fort visits in early morning hours."
      },
      {
        "month": 5,
        "tempC": 40,
        "condition": "Very Hot",
        "humidity": 22,
        "icon": "Sun",
        "suggestion": "Intense heat; stay hydrated and enjoy indoor royal museum galleries."
      },
      {
        "month": 6,
        "tempC": 38,
        "condition": "Hot",
        "humidity": 35,
        "icon": "Sun",
        "suggestion": "Pre-monsoon warm breeze, evening rooftop dinner overlooking palaces."
      },
      {
        "month": 7,
        "tempC": 32,
        "condition": "Monsoon Showers",
        "humidity": 65,
        "icon": "CloudRain",
        "suggestion": "Refreshing showers revive the Aravalli hills around Nahargarh."
      },
      {
        "month": 8,
        "tempC": 30,
        "condition": "Humid Showers",
        "humidity": 72,
        "icon": "CloudRain",
        "suggestion": "Green hills, cooler temperatures, great fort photography."
      },
      {
        "month": 9,
        "tempC": 31,
        "condition": "Pleasant",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Gentle breezes return; pleasant sunset view from Jaigarh Fort."
      },
      {
        "month": 10,
        "tempC": 29,
        "condition": "Clear Skies",
        "humidity": 48,
        "icon": "Sun",
        "suggestion": "Festive season starts; colorful puppet shows and folk dancing."
      },
      {
        "month": 11,
        "tempC": 24,
        "condition": "Sunny",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Cool pleasant climate, perfect for Chokhi Dhani cultural village."
      },
      {
        "month": 12,
        "tempC": 19,
        "condition": "Cold Evenings",
        "humidity": 48,
        "icon": "Sun",
        "suggestion": "Crisp winter chill, pack light woolens for evening strolls."
      }
    ],
    "packingRules": [
      "sun-hat",
      "sunglasses",
      "comfortable-shoes",
      "modest-attire"
    ],
    "coordinates": {
      "lat": 26.9124,
      "lng": 75.7873
    },
    "places": [
      {
        "id": "jpr-amer-fort",
        "name": "Amer Fort & Sheesh Mahal Mirror Work",
        "category": "History",
        "rating": 4.8,
        "price": 200,
        "location": "Devisinghpura, Amer",
        "description": "Opulent hilltop fort with artistic Hindu elements, intricate mirror work in Sheesh Mahal, and grand courtyards overlooking Maota Lake.",
        "tags": [
          "History",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 17:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "jpr-hawa-mahal",
        "name": "Hawa Mahal (Palace of Winds) & Pink City View",
        "category": "History",
        "rating": 4.6,
        "price": 50,
        "location": "Badi Choupad",
        "description": "Five-story pink sandstone palace featuring 953 honeycomb jharokhas built for royal women to observe street processions unseen.",
        "tags": [
          "History",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1602643163983-ed0b800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00",
        "bestTimeToVisit": "Morning Light"
      },
      {
        "id": "jpr-city-palace",
        "name": "City Palace & Royal Armoury Museum",
        "category": "History",
        "rating": 4.7,
        "price": 300,
        "location": "Tulsi Marg, Gangori Bazaar",
        "description": "Grand residence of the Maharaja of Jaipur featuring Chandra Mahal, Mubarak Mahal, and colossal sterling silver water vessels.",
        "tags": [
          "History",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "jpr-jantar-mantar",
        "name": "Jantar Mantar UNESCO Astronomical Observatory",
        "category": "Culture",
        "rating": 4.7,
        "price": 50,
        "location": "Gangori Bazaar",
        "description": "Collection of nineteen stone architectural astronomical instruments built by King Sawai Jai Singh II in 1734.",
        "tags": [
          "Culture",
          "History",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00",
        "bestTimeToVisit": "Midday"
      },
      {
        "id": "jpr-nahargarh",
        "name": "Nahargarh Fort Sunset & Panoramic City Lookout",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 50,
        "location": "Aravalli Hills",
        "description": "Hilltop fortress perched on the edge of the Aravallis, offering royal stepwells and the finest sunset city vistas in Rajasthan.",
        "tags": [
          "Sightseeing",
          "Photography",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:30",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "jpr-jaigarh",
        "name": "Jaigarh Fort & Jaivana World Cannon",
        "category": "History",
        "rating": 4.6,
        "price": 100,
        "location": "Amer",
        "description": "Mighty military garrison connected to Amer Fort via underground passages, housing the world's largest cannon on wheels.",
        "tags": [
          "History",
          "Adventure"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "jpr-jal-mahal",
        "name": "Jal Mahal (Water Palace) & Man Sagar Lake Promenade",
        "category": "Nature",
        "rating": 4.6,
        "price": 0,
        "location": "Amer Road",
        "description": "Picturesque palace seemingly floating in the middle of Man Sagar Lake, surrounded by migratory birds and evening illuminated walkways.",
        "tags": [
          "Nature",
          "Photography",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours (External)",
        "bestTimeToVisit": "Sunset & Evening"
      },
      {
        "id": "jpr-johari-bazaar",
        "name": "Johari & Bapu Bazaar Gemstone & Textile Shopping",
        "category": "Shopping",
        "rating": 4.7,
        "price": 0,
        "location": "Old Pink City",
        "description": "Famous bazaars for authentic Kundan jewelry, bandhani sarees, block-printed quilts, and mojari camel leather shoes.",
        "tags": [
          "Shopping",
          "Culture",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:30 - 20:30",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "jpr-chokhi-dhani",
        "name": "Chokhi Dhani Ethnic Rajasthani Cultural Village",
        "category": "Culture",
        "rating": 4.8,
        "price": 900,
        "location": "Tonk Road",
        "description": "Fairground village bringing Rajasthan to life with puppet shows, folk dancing, camel rides, and royal multi-course thalis.",
        "tags": [
          "Culture",
          "Food",
          "Entertainment"
        ],
        "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        "openingHours": "17:30 - 23:00",
        "bestTimeToVisit": "Night"
      },
      {
        "id": "jpr-albert-hall",
        "name": "Albert Hall Museum & Pigeon Square Garden",
        "category": "Culture",
        "rating": 4.6,
        "price": 40,
        "location": "Ram Niwas Garden",
        "description": "Oldest museum in Rajasthan showcasing Persian carpets, ivory carvings, miniature paintings, and an Egyptian mummy.",
        "tags": [
          "Culture",
          "History",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00, 19:00 - 22:00",
        "bestTimeToVisit": "Morning / Night Lights"
      },
      {
        "id": "jpr-galta-ji",
        "name": "Galta Ji (Monkey Temple) & Sacred Natural Springs",
        "category": "Nature",
        "rating": 4.6,
        "price": 0,
        "location": "Galta Gorge",
        "description": "Ancient Hindu pilgrimage pavilion built into a narrow mountain pass with sacred natural water tanks (kunds) and rhesus macaques.",
        "tags": [
          "Nature",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "05:00 - 19:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "jpr-patrika-gate",
        "name": "Patrika Gate & Jawahar Circle Musical Fountain",
        "category": "Photography",
        "rating": 4.8,
        "price": 0,
        "location": "Jawahar Circle, Malviya Nagar",
        "description": "Intricately painted archway featuring vibrant hand-painted murals depicting Rajasthan's monuments, maharajas, and battles.",
        "tags": [
          "Photography",
          "Sightseeing",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Morning Light"
      },
      {
        "id": "jpr-stepwell",
        "name": "Panna Meena Ka Kund Geometric Stepwell",
        "category": "Architecture",
        "rating": 4.7,
        "price": 0,
        "location": "Amer",
        "description": "16th-century geometric stepwell with interlocking criss-cross stone steps and recessed doorways used for ancient community gatherings.",
        "tags": [
          "Architecture",
          "Photography",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 18:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "jpr-rawat-trail",
        "name": "Rawat Misthan Bhandar Pyaaz Kachori Food Trail",
        "category": "Food",
        "rating": 4.9,
        "price": 150,
        "location": "Station Road",
        "description": "Legendary sweetshop known for crispy golden onion-stuffed pyaaz kachoris, hot mawa kachoris, and freshly prepared ghevar.",
        "tags": [
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 22:30",
        "bestTimeToVisit": "Breakfast / Snack"
      }
    ],
    "foods": [
      {
        "name": "Dal Baati Churma",
        "category": "Veg",
        "price": "₹250 - ₹500",
        "rating": 4.9,
        "location": "Laxmi Misthan Bhandar (LMB)"
      },
      {
        "name": "Laal Maas (Spicy Mutton Curry)",
        "category": "Non-Veg",
        "price": "₹450 - ₹750",
        "rating": 4.8,
        "location": "Handi Restaurant, MI Road"
      },
      {
        "name": "Pyaaz Kachori & Ghevar",
        "category": "Snack / Sweet",
        "price": "₹60 - ₹180",
        "rating": 4.9,
        "location": "Rawat Misthan Bhandar"
      }
    ],
    "stays": [
      {
        "name": "Rambagh Palace Jaipur",
        "type": "Luxury",
        "price": 32000,
        "rating": 5,
        "amenities": [
          "Former Royal Palace",
          "Peacock Gardens",
          "Polo Bar"
        ]
      },
      {
        "name": "Alsisar Haveli",
        "type": "Mid-Range",
        "price": 5800,
        "rating": 4.6,
        "amenities": [
          "Courtyard Pool",
          "Fresco Art",
          "Central Location"
        ]
      },
      {
        "name": "Hostel Karwaan",
        "type": "Budget",
        "price": 1100,
        "rating": 4.3,
        "amenities": [
          "Rooftop Cafe",
          "Rajasthani Vibe",
          "Travel Desk"
        ]
      }
    ]
  },
  {
    "id": "chennai",
    "name": "Chennai",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "beach",
    "state": "Tamil Nadu",
    "tagline": "Gateway of South India, Dravidian Temples & Marina Beach",
    "description": "Coastal cultural capital celebrated for towering Dravidian temple gopurams, classical Carnatic music, golden Marina sands, and authentic filter coffee.",
    "coverImage": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 2300,
    "foodRate": 700,
    "transportRate": 700,
    "weather": [
      {
        "month": 1,
        "tempC": 26,
        "condition": "Pleasant",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Best weather of the year; breezy evenings at Marina Beach."
      },
      {
        "month": 2,
        "tempC": 28,
        "condition": "Sunny",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Warm days, great for Mahabalipuram shore temple day trip."
      },
      {
        "month": 3,
        "tempC": 32,
        "condition": "Warm & Humid",
        "humidity": 72,
        "icon": "Sun",
        "suggestion": "Warm afternoons, visit Kapaleeshwarar Temple early morning."
      },
      {
        "month": 4,
        "tempC": 35,
        "condition": "Hot",
        "humidity": 76,
        "icon": "Sun",
        "suggestion": "Humid summer; stay hydrated and carry sun protection."
      },
      {
        "month": 5,
        "tempC": 38,
        "condition": "Very Hot",
        "humidity": 75,
        "icon": "Sun",
        "suggestion": "Peak summer; schedule sightseeing for early morning & night."
      },
      {
        "month": 6,
        "tempC": 36,
        "condition": "Hot & Breezy",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Warm sea breezes, great for evening seaside snacks."
      },
      {
        "month": 7,
        "tempC": 33,
        "condition": "Scattered Showers",
        "humidity": 70,
        "icon": "CloudRain",
        "suggestion": "Occasional clouds bring mild relief from heat."
      },
      {
        "month": 8,
        "tempC": 32,
        "condition": "Cloudy",
        "humidity": 72,
        "icon": "CloudRain",
        "suggestion": "Pleasant overcast skies for heritage museum visits."
      },
      {
        "month": 9,
        "tempC": 32,
        "condition": "Warm",
        "humidity": 74,
        "icon": "Sun",
        "suggestion": "Good weather for DakshinaChitra cultural village tour."
      },
      {
        "month": 10,
        "tempC": 30,
        "condition": "Northeast Monsoon",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Monsoon begins; carry raincoats and umbrellas."
      },
      {
        "month": 11,
        "tempC": 28,
        "condition": "Rainy",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Cool rainy days; indulge in hot rasam rice and sundal."
      },
      {
        "month": 12,
        "tempC": 26,
        "condition": "Pleasant",
        "humidity": 75,
        "icon": "Sun",
        "suggestion": "Carnatic music season fills the city with vibrant concerts."
      }
    ],
    "packingRules": [
      "cotton-wear",
      "sandals",
      "sunglasses",
      "sunscreen"
    ],
    "coordinates": {
      "lat": 13.0827,
      "lng": 80.2707
    },
    "places": [
      {
        "id": "chn-marina",
        "name": "Marina Beach & Lighthouse Panoramic View",
        "category": "Beach",
        "rating": 4.6,
        "price": 20,
        "location": "Kamarajar Salai",
        "description": "World's second longest natural urban beach with breezy promenade walks, fresh fried fish shacks, and panoramic lighthouse elevator.",
        "tags": [
          "Beach",
          "Relaxed",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours (Lighthouse 10:00 - 17:30)",
        "bestTimeToVisit": "Early Morning & Sunset"
      },
      {
        "id": "chn-kapaleeshwarar",
        "name": "Kapaleeshwarar Temple & Mylapore Heritage Trail",
        "category": "History",
        "rating": 4.8,
        "price": 0,
        "location": "Mylapore",
        "description": "7th-century Dravidian architectural marvel dedicated to Lord Shiva with an intricately sculpted rainbow gopuram and peaceful tank.",
        "tags": [
          "History",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 12:30, 16:00 - 21:30",
        "bestTimeToVisit": "Morning Puja"
      },
      {
        "id": "chn-san-thome",
        "name": "San Thome Cathedral Basilica",
        "category": "History",
        "rating": 4.7,
        "price": 0,
        "location": "Santhome High Road",
        "description": "Neo-Gothic Roman Catholic cathedral built over the tomb of St. Thomas the Apostle, one of only three in the world.",
        "tags": [
          "History",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 20:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "chn-fort-st-george",
        "name": "Fort St. George & Clive Heritage Museum",
        "category": "History",
        "rating": 4.6,
        "price": 50,
        "location": "Rajaji Salai",
        "description": "First English fortress constructed in India in 1644, housing St. Mary's Church and ancient colonial artifacts.",
        "tags": [
          "History",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00 (Closed Fridays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "chn-dakshinachitra",
        "name": "DakshinaChitra Living Cultural Heritage Museum",
        "category": "Culture",
        "rating": 4.8,
        "price": 250,
        "location": "Muttukadu, East Coast Road",
        "description": "Living history museum featuring 18 authentic transplanted heritage houses depicting South Indian art, architecture, and crafts.",
        "tags": [
          "Culture",
          "History",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 18:00 (Closed Tuesdays)",
        "bestTimeToVisit": "Day Trip"
      },
      {
        "id": "chn-besant-nagar",
        "name": "Besant Nagar (Elliot's) Beach & Seaside Cafes",
        "category": "Beach",
        "rating": 4.7,
        "price": 0,
        "location": "Besant Nagar",
        "description": "Tranquil coastal hangout with Schmidt Memorial monument, clean sands, and artisanal cafes serving filter coffee and gelatos.",
        "tags": [
          "Beach",
          "Relaxed",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "chn-guindy-park",
        "name": "Guindy National Park & Deer Sanctuary",
        "category": "Nature",
        "rating": 4.5,
        "price": 30,
        "location": "Rangeguindy",
        "description": "Protected urban green lung hosting spotted deer, blackbucks, over 130 bird species, and ancient banyan canopies.",
        "tags": [
          "Nature",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30 (Closed Tuesdays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "chn-t-nagar",
        "name": "T. Nagar Ranganathan Street Silk & Gold Bazaar",
        "category": "Shopping",
        "rating": 4.5,
        "price": 0,
        "location": "Thyagaraya Nagar",
        "description": "India's highest revenue commercial shopping hub packed with world-famous Kanchipuram silk sarees and temple jewelry stores.",
        "tags": [
          "Shopping",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 21:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "chn-mahabalipuram",
        "name": "Mahabalipuram UNESCO Shore Temple Day Trip",
        "category": "History",
        "rating": 4.9,
        "price": 300,
        "location": "Mamallapuram, ECR",
        "description": "7th-century rock-cut stone temples, monolithic Rathas, and the world's largest open-air bas-relief (Arjuna's Penance).",
        "tags": [
          "History",
          "Sightseeing",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 18:00",
        "bestTimeToVisit": "Day Excursion"
      },
      {
        "id": "chn-govt-museum",
        "name": "Government Museum & National Bronze Art Gallery",
        "category": "Culture",
        "rating": 4.6,
        "price": 50,
        "location": "Pantheon Road, Egmore",
        "description": "Second oldest museum in India celebrated for its peerless Chola bronze sculpture collection including the iconic Nataraja.",
        "tags": [
          "Culture",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 17:00 (Closed Fridays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "chn-kalakshetra",
        "name": "Kalakshetra Foundation Classical Dance & Art Centre",
        "category": "Culture",
        "rating": 4.8,
        "price": 100,
        "location": "Thiruvanmiyur",
        "description": "Revered academy of Bharatanatyam and Carnatic music set in lush natural surroundings preserving traditional guru-shishya learning.",
        "tags": [
          "Culture",
          "Art"
        ],
        "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "chn-sowcarpet-trail",
        "name": "Sowcarpet George Town North Indian Street Food Trail",
        "category": "Food",
        "rating": 4.7,
        "price": 180,
        "location": "Mint Street, George Town",
        "description": "Vibrant historic street food alley serving kachoris, jalebis, murukku sandwich, and badam milk in earthen pots.",
        "tags": [
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:00 - 22:30",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "chn-semmozhi-poonga",
        "name": "Semmozhi Poonga Botanical Garden & Bonsai Pavilion",
        "category": "Nature",
        "rating": 4.5,
        "price": 25,
        "location": "Cathedral Road",
        "description": "20-acre landscaped garden featuring exotic flora, aromatic herbal plants, vertical gardens, and illuminated duck ponds.",
        "tags": [
          "Nature",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 19:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "chn-muttukadu",
        "name": "Muttukadu Backwater Boating & Kayaking",
        "category": "Adventure",
        "rating": 4.6,
        "price": 350,
        "location": "East Coast Road",
        "description": "Scenic estuary water body where backwaters meet the sea, offering speed boats, paddle boats, and water skiing.",
        "tags": [
          "Adventure",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Mylapore Filter Coffee & Medu Vada",
        "category": "Breakfast",
        "price": "₹60 - ₹120",
        "rating": 4.9,
        "location": "Rayar's Mess"
      },
      {
        "name": "Chettinad Chicken Pepper Fry",
        "category": "Non-Veg",
        "price": "₹300 - ₹500",
        "rating": 4.8,
        "location": "Anjappar Chettinad"
      },
      {
        "name": "Marina Beach Sundal & Fish Fry",
        "category": "Street Food",
        "price": "₹40 - ₹150",
        "rating": 4.6,
        "location": "Marina Beach Stalls"
      }
    ],
    "stays": [
      {
        "name": "Taj Connemara Chennai",
        "type": "Luxury",
        "price": 11000,
        "rating": 4.8,
        "amenities": [
          "Colonial Heritage",
          "Verandah",
          "Ayurvedic Spa"
        ]
      },
      {
        "name": "The Residency Towers",
        "type": "Mid-Range",
        "price": 4900,
        "rating": 4.5,
        "amenities": [
          "T. Nagar Central",
          "Rooftop Pool",
          "Buffet"
        ]
      },
      {
        "name": "Broad Lands Guest House",
        "type": "Budget",
        "price": 1600,
        "rating": 4.1,
        "amenities": [
          "Heritage Courtyard",
          "Cozy Rooms",
          "Triplicane"
        ]
      }
    ]
  },
  {
    "id": "kerala",
    "name": "Kerala",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "nature",
    "state": "Kerala",
    "tagline": "God's Own Country, Tranquil Backwaters & Tea Hills",
    "description": "A tropical coastal paradise known for emerald backwater houseboats, misty Munnar tea plantations, Ayurvedic wellness, and spice-scented cuisine.",
    "coverImage": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 3200,
    "foodRate": 850,
    "transportRate": 850,
    "weather": [
      {
        "month": 1,
        "tempC": 28,
        "condition": "Pleasant",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Peak season; clear blue skies and calm waters for Alleppey houseboats."
      },
      {
        "month": 2,
        "tempC": 29,
        "condition": "Sunny",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Warm days, perfect for Munnar tea garden strolls."
      },
      {
        "month": 3,
        "tempC": 31,
        "condition": "Warm",
        "humidity": 72,
        "icon": "Sun",
        "suggestion": "Warm tropical weather; great for Ayurvedic rejuvenation spa sessions."
      },
      {
        "month": 4,
        "tempC": 32,
        "condition": "Humid",
        "humidity": 78,
        "icon": "Sun",
        "suggestion": "Vishu festival celebrations; pack light cottons."
      },
      {
        "month": 5,
        "tempC": 31,
        "condition": "Pre-monsoon Showers",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Occasional thundershowers; blooming rainforest waterfalls."
      },
      {
        "month": 6,
        "tempC": 27,
        "condition": "Southwest Monsoon",
        "humidity": 92,
        "icon": "CloudRain",
        "suggestion": "Heavy monsoon arrives; prime season for authentic Ayurveda."
      },
      {
        "month": 7,
        "tempC": 26,
        "condition": "Heavy Rain",
        "humidity": 94,
        "icon": "CloudRain",
        "suggestion": "Lush green countryside and roaring Athirappilly waterfalls."
      },
      {
        "month": 8,
        "tempC": 27,
        "condition": "Rainy",
        "humidity": 88,
        "icon": "CloudRain",
        "suggestion": "Nehru Trophy Snake Boat Race season on Punnamada Lake."
      },
      {
        "month": 9,
        "tempC": 28,
        "condition": "Pleasant Showers",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Grand Onam festivities, vibrant floral pookkalams."
      },
      {
        "month": 10,
        "tempC": 28,
        "condition": "Scattered Rain",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Pleasant weather returns; great for Periyar wildlife sanctuary."
      },
      {
        "month": 11,
        "tempC": 28,
        "condition": "Clear Skies",
        "humidity": 70,
        "icon": "Sun",
        "suggestion": "Wonderful climate across coastal Fort Kochi and backwaters."
      },
      {
        "month": 12,
        "tempC": 27,
        "condition": "Pleasant",
        "humidity": 66,
        "icon": "Sun",
        "suggestion": "Cochin Carnival and festive beach vibes."
      }
    ],
    "packingRules": [
      "umbrella",
      "cotton-wear",
      "mosquito-repellent",
      "sandals"
    ],
    "coordinates": {
      "lat": 9.9312,
      "lng": 76.2673
    },
    "places": [
      {
        "id": "ker-alleppey",
        "name": "Alleppey Backwater Houseboat Cruise",
        "category": "Nature",
        "rating": 4.9,
        "price": 1500,
        "location": "Punnamada, Alappuzha",
        "description": "Gliding through palm-fringed canals and tranquil lagoons on a traditional thatched-roof Kettuvallam houseboat.",
        "tags": [
          "Nature",
          "Relaxed",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:30 - 17:30",
        "bestTimeToVisit": "Day Cruise / Sunset"
      },
      {
        "id": "ker-munnar",
        "name": "Munnar Tea Plantations & Echo Point",
        "category": "Nature",
        "rating": 4.8,
        "price": 100,
        "location": "Idukki District",
        "description": "Rolling carpet of emerald tea gardens 1,600m above sea level, misty mountain trails, and rare Neelakurinji flora.",
        "tags": [
          "Nature",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ker-fort-kochi",
        "name": "Fort Kochi Chinese Fishing Nets & Pier",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Fort Kochi Beach",
        "description": "Centuries-old cantilevered Chinese fishing nets silhouetted against Arabian Sea sunsets, lined with colonial cafes.",
        "tags": [
          "Sightseeing",
          "History",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "ker-jew-town",
        "name": "Mattancherry Dutch Palace & Jewish Synagogue",
        "category": "History",
        "rating": 4.6,
        "price": 50,
        "location": "Jew Town, Mattancherry",
        "description": "1568 Paradesi Synagogue with Belgian chandeliers and hand-painted blue Cantonese willow porcelain tiles.",
        "tags": [
          "History",
          "Culture",
          "Antiques"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ker-periyar",
        "name": "Periyar Wildlife Sanctuary Lake Boat Safari",
        "category": "Adventure",
        "rating": 4.7,
        "price": 450,
        "location": "Thekkady",
        "description": "Scenic boat ride along an artificial highland reservoir observing wild elephant herds, sambar deer, and otters.",
        "tags": [
          "Adventure",
          "Wildlife",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 16:30",
        "bestTimeToVisit": "Morning Safari"
      },
      {
        "id": "ker-varkala",
        "name": "Varkala Red Cliff & Papanasam Beach",
        "category": "Beach",
        "rating": 4.8,
        "price": 0,
        "location": "Varkala Cliff Promenade",
        "description": "Dramatic geological laterite cliffs rising directly above pristine sandy beaches, lined with yoga retreats and seafood bistros.",
        "tags": [
          "Beach",
          "Relaxed",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "ker-sadhya",
        "name": "Traditional Kerala Sadhya on Banana Leaf",
        "category": "Food",
        "rating": 4.9,
        "price": 350,
        "location": "Paragon / BTH Sarovaram",
        "description": "Sumptuous vegetarian grand feast comprising 26 distinct dishes, avial, sambar, payasam, and red matta rice.",
        "tags": [
          "Food",
          "Culture",
          "Authentic"
        ],
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        "openingHours": "12:00 - 15:30",
        "bestTimeToVisit": "Lunch"
      },
      {
        "id": "ker-athirappilly",
        "name": "Athirappilly Waterfalls Rainforest Walk",
        "category": "Nature",
        "rating": 4.8,
        "price": 50,
        "location": "Chalakudy, Thrissur",
        "description": "Majestic 80-foot wide cascading waterfall often heralded as the Niagara of India, framed by Sholayar rainforests.",
        "tags": [
          "Nature",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ker-kathakali",
        "name": "Kathakali Performance & Green Room Makeup",
        "category": "Culture",
        "rating": 4.8,
        "price": 350,
        "location": "Kerala Kathakali Centre, Fort Kochi",
        "description": "Classical theatrical dance drama showcasing facial makeup transformations, mudras, and epic mythological storytelling.",
        "tags": [
          "Culture",
          "Art",
          "Nightlife"
        ],
        "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        "openingHours": "17:00 - 20:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "ker-marari",
        "name": "Marari Serene Beach & Fishermen Village",
        "category": "Beach",
        "rating": 4.7,
        "price": 0,
        "location": "Mararikulam",
        "description": "Quiet white-sand beach lined with coconut groves, thatched shacks, and authentic village boat launches.",
        "tags": [
          "Beach",
          "Nature",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Late Afternoon"
      },
      {
        "id": "ker-wayanad-caves",
        "name": "Wayanad Edakkal Prehistoric Caves Trek",
        "category": "Adventure",
        "rating": 4.6,
        "price": 80,
        "location": "Nenmeni, Wayanad",
        "description": "Neolithic rock-cut engravings and petroglyphs dated to 6,000 BCE reached via an adventurous uphill bamboo trek.",
        "tags": [
          "Adventure",
          "History",
          "Trek"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 16:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ker-spice-walk",
        "name": "Kumily Spice Plantation Aroma Trail",
        "category": "Nature",
        "rating": 4.7,
        "price": 150,
        "location": "Thekkady",
        "description": "Sensory guided tour amidst cardamom pods, black peppercorns, cinnamon barks, nutmeg trees, and natural vanilla vines.",
        "tags": [
          "Nature",
          "Shopping",
          "Educational"
        ],
        "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:30 - 17:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ker-kovalam",
        "name": "Kovalam Lighthouse Beach & Ayurvedic Spa",
        "category": "Beach",
        "rating": 4.7,
        "price": 20,
        "location": "Kovalam, Thiruvananthapuram",
        "description": "Crescent beach dominated by a striped 35-meter red-and-white stone lighthouse, famed for herbal Ayurvedic massages.",
        "tags": [
          "Beach",
          "Wellness",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00 (Lighthouse)",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "ker-kumarakom",
        "name": "Kumarakom Bird Sanctuary & Vembanad Walk",
        "category": "Nature",
        "rating": 4.6,
        "price": 100,
        "location": "Kavanattinkara",
        "description": "14-acre wetland paradise on the banks of Lake Vembanad sheltering Siberian cranes, flycatchers, and teals.",
        "tags": [
          "Nature",
          "Birding",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 18:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "ker-paragon-food",
        "name": "Calicut Paragon Malabar Dum Biryani & Seafood",
        "category": "Food",
        "rating": 4.9,
        "price": 450,
        "location": "CH Flyover / Kochi Branch",
        "description": "World-renowned restaurant celebrated for aromatic kaima rice biryani, karimeen pollichathu (pearl spot in banana leaf), and coin parottas.",
        "tags": [
          "Food",
          "Seafood",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "12:00 - 23:00",
        "bestTimeToVisit": "Dinner"
      },
      {
        "id": "ker-bekal",
        "name": "Bekal Fort Ocean Ramparts & Coastal View",
        "category": "History",
        "rating": 4.7,
        "price": 25,
        "location": "Kasaragod",
        "description": "Keyhole-shaped 1650 coastal citadel jutting into the sea with panoramic observation towers and water tanks.",
        "tags": [
          "History",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 17:30",
        "bestTimeToVisit": "Late Afternoon"
      }
    ],
    "foods": [
      {
        "name": "Kerala Sadhya on Banana Leaf",
        "category": "Veg",
        "price": "₹250 - ₹450",
        "rating": 4.9,
        "location": "Grand Hotel Kochi"
      },
      {
        "name": "Karimeen Pollichathu (Pearl Spot Fish)",
        "category": "Seafood",
        "price": "₹380 - ₹650",
        "rating": 4.9,
        "location": "Alleppey Backwater Shacks"
      },
      {
        "name": "Appam with Vegetable Stew",
        "category": "Breakfast",
        "price": "₹100 - ₹180",
        "rating": 4.8,
        "location": "Fort Kochi Cafes"
      }
    ],
    "stays": [
      {
        "name": "Kumarakom Lake Resort",
        "type": "Luxury",
        "price": 21000,
        "rating": 4.9,
        "amenities": [
          "Vembanad Lake Views",
          "Infinity Pool",
          "Ayurveda Spa"
        ]
      },
      {
        "name": "Spice Tree Munnar",
        "type": "Mid-Range",
        "price": 7500,
        "rating": 4.7,
        "amenities": [
          "Mountain Vistas",
          "Jacuzzi",
          "Tea Walks"
        ]
      },
      {
        "name": "Zostel Alleppey",
        "type": "Budget",
        "price": 1300,
        "rating": 4.4,
        "amenities": [
          "Beachfront",
          "Hammocks",
          "Kayak Rentals"
        ]
      }
    ]
  },
  {
    "id": "manali",
    "name": "Manali",
    "country": "India",
    "isInternational": false,
    "currency": "INR",
    "currencySymbol": "₹",
    "type": "hill",
    "state": "Himachal Pradesh",
    "tagline": "Himalayan Haven, Snow Peaks, Solang & Rohtang Pass",
    "description": "Nestled in the Beas River Valley, offering majestic snow-capped peaks, alpine pine forests, paragliding, skiing, and bohemian cafes.",
    "coverImage": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 2700,
    "foodRate": 850,
    "transportRate": 950,
    "weather": [
      {
        "month": 1,
        "tempC": 2,
        "condition": "Heavy Snowfall",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Sub-zero temperatures and snow blankets; pack heavy down jackets."
      },
      {
        "month": 2,
        "tempC": 5,
        "condition": "Snow & Cold",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "Winter wonderland; ideal for skiing and snowboarding in Solang."
      },
      {
        "month": 3,
        "tempC": 12,
        "condition": "Cold & Crisp",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Snow begins to thaw, pleasant crisp mountain air."
      },
      {
        "month": 4,
        "tempC": 18,
        "condition": "Pleasant",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Apple blossoms bloom across the valley; wonderful trekking weather."
      },
      {
        "month": 5,
        "tempC": 23,
        "condition": "Sunny",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Peak summer escape; Solang Valley adventure sports and paragliding."
      },
      {
        "month": 6,
        "tempC": 25,
        "condition": "Warm & Clear",
        "humidity": 50,
        "icon": "Sun",
        "suggestion": "Rohtang Pass opens for snow point tours; advance permits needed."
      },
      {
        "month": 7,
        "tempC": 21,
        "condition": "Monsoon Rains",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Mountain showers; check road condition updates before long drives."
      },
      {
        "month": 8,
        "tempC": 20,
        "condition": "Monsoon",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Lush green apple orchards; enjoy cozy wooden cafes in Old Manali."
      },
      {
        "month": 9,
        "tempC": 19,
        "condition": "Clear Skies",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Post-monsoon crystal clear views of Dhauladhar ranges."
      },
      {
        "month": 10,
        "tempC": 14,
        "condition": "Chilly",
        "humidity": 50,
        "icon": "Sun",
        "suggestion": "Crisp autumn colors, golden chinar leaves, and cool breeze."
      },
      {
        "month": 11,
        "tempC": 8,
        "condition": "Cold",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Early winter chill; night temperatures drop towards freezing."
      },
      {
        "month": 12,
        "tempC": 4,
        "condition": "Snowfall",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "White Christmas season, snowfall and bonfires."
      }
    ],
    "packingRules": [
      "thermal-innerwear",
      "heavy-jacket",
      "woolen-gloves",
      "hiking-boots"
    ],
    "coordinates": {
      "lat": 32.2432,
      "lng": 77.1892
    },
    "places": [
      {
        "id": "mnl-solang",
        "name": "Solang Valley Adventure Arena & Paragliding",
        "category": "Adventure",
        "rating": 4.8,
        "price": 800,
        "location": "Solang, Burwa",
        "description": "Renowned adventure playground offering tandem paragliding, zorbing, ATV quad biking, and winter ski slopes.",
        "tags": [
          "Adventure",
          "Nature",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00",
        "bestTimeToVisit": "Morning to Afternoon"
      },
      {
        "id": "mnl-rohtang",
        "name": "Rohtang Pass Himalayan Snow Point",
        "category": "Adventure",
        "rating": 4.9,
        "price": 550,
        "location": "Leh-Manali Highway (3,978m)",
        "description": "High mountain pass offering breathtaking panoramic views of Himalayan glaciers, snow peaks, and Pir Panjal ranges.",
        "tags": [
          "Adventure",
          "Nature",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 16:00 (Tuesday Closed)",
        "bestTimeToVisit": "Early Morning (Permit Required)"
      },
      {
        "id": "mnl-hadimba",
        "name": "Hadimba Devi Temple & Ancient Cedar Forest",
        "category": "History",
        "rating": 4.7,
        "price": 50,
        "location": "Dhungri Forest",
        "description": "Unique 16th-century four-tiered wooden pagoda temple nestled inside a dense forest of towering deodar trees.",
        "tags": [
          "History",
          "Culture",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mnl-jogini",
        "name": "Jogini Waterfall Trek & Vashisht Hot Springs",
        "category": "Nature",
        "rating": 4.8,
        "price": 0,
        "location": "Vashisht Village",
        "description": "Scenic 3 km mountain trail through pine woods leading to cascading waters and natural therapeutic sulfur springs.",
        "tags": [
          "Nature",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mnl-old-manali",
        "name": "Old Manali Bohemian Cafes & Live Music Trail",
        "category": "Food",
        "rating": 4.7,
        "price": 350,
        "location": "Old Manali Village",
        "description": "Rustic alpine quarter filled with wooden chalets, handmade woolen shops, artisan bakeries, and lively evening cafes.",
        "tags": [
          "Food",
          "Relaxed",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 23:00",
        "bestTimeToVisit": "Afternoon & Evening"
      },
      {
        "id": "mnl-atal-tunnel",
        "name": "Atal Tunnel & Sissu Valley Day Excursion",
        "category": "Sightseeing",
        "rating": 4.9,
        "price": 600,
        "location": "Lahaul Valley Highway",
        "description": "Engineering marvel tunneling under Rohtang Pass, opening into the dramatically stark, snow-dusted valleys of Lahaul.",
        "tags": [
          "Sightseeing",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Day Trip"
      },
      {
        "id": "mnl-mall-road",
        "name": "Mall Road Shopping & Tibetan Monastery",
        "category": "Shopping",
        "rating": 4.5,
        "price": 0,
        "location": "Central Manali",
        "description": "Pedestrian boulevard offering Kullu shawls, wooden handicrafts, prayer wheels, and piping hot steamed momos.",
        "tags": [
          "Shopping",
          "Culture",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 21:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "mnl-naggar-castle",
        "name": "Naggar Castle & Nicholas Roerich Art Gallery",
        "category": "Culture",
        "rating": 4.7,
        "price": 100,
        "location": "Naggar, Kullu Valley",
        "description": "Medieval wooden-stone palace overlooking the Beas River, paired with the art gallery of famous Russian master Roerich.",
        "tags": [
          "Culture",
          "History",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mnl-beas-rafting",
        "name": "Beas River White Water Rafting in Kullu",
        "category": "Adventure",
        "rating": 4.8,
        "price": 1100,
        "location": "Babeli, Kullu",
        "description": "Exhilarating 14 km white-water rafting trip through Grade II and III rapids framed by towering pine mountain peaks.",
        "tags": [
          "Adventure",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 16:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mnl-gulaba",
        "name": "Gulaba Alpine Meadows & Mountain Lookout",
        "category": "Photography",
        "rating": 4.8,
        "price": 0,
        "location": "Gulaba Village",
        "description": "Serene alpine meadows surrounded by wildflowers in summer and thick snow banks in winter, featured in Bollywood films.",
        "tags": [
          "Photography",
          "Nature",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mnl-manu-temple",
        "name": "Manu Temple & Ancient Apple Orchard Trail",
        "category": "Culture",
        "rating": 4.6,
        "price": 0,
        "location": "Old Manali",
        "description": "Sacred temple dedicated to Sage Manu (the creator according to Hindu lore), reached via stepped stone orchard paths.",
        "tags": [
          "Culture",
          "History",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 19:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "mnl-van-vihar",
        "name": "Van Vihar National Park & Deodar Lakeside",
        "category": "Relaxed",
        "rating": 4.5,
        "price": 30,
        "location": "Mall Road, Manali",
        "description": "Peaceful nature park on the banks of Beas River with soaring deodar canopies, wooden bridges, and paddle boats.",
        "tags": [
          "Relaxed",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 19:00",
        "bestTimeToVisit": "Late Afternoon"
      },
      {
        "id": "mnl-trout-trail",
        "name": "Haripur Himalayan Trout Farm & Culinary Walk",
        "category": "Food",
        "rating": 4.8,
        "price": 550,
        "location": "Haripur Village",
        "description": "Fresh cold-water trout farm tour followed by wood-fired grilled Himalayan trout seasoned with mountain herbs.",
        "tags": [
          "Food",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:00 - 20:00",
        "bestTimeToVisit": "Lunch"
      },
      {
        "id": "mnl-hampta-foothills",
        "name": "Hampta Pass Foothills Nature Trek",
        "category": "Adventure",
        "rating": 4.8,
        "price": 400,
        "location": "Prini, Manali",
        "description": "Short day-trek climbing through lush meadows, pine-clad ridges, and glacial streams with panoramic valley views.",
        "tags": [
          "Adventure",
          "Nature",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 16:00",
        "bestTimeToVisit": "Early Morning"
      }
    ],
    "foods": [
      {
        "name": "Siddu (Steamed Wheat Bread)",
        "category": "Veg / Snack",
        "price": "₹90 - ₹150",
        "rating": 4.8,
        "location": "Old Manali Street"
      },
      {
        "name": "Himachali Dham Thali",
        "category": "Veg",
        "price": "₹200 - ₹350",
        "rating": 4.7,
        "location": "Mayur Restaurant"
      },
      {
        "name": "Trout Fish Sizzler",
        "category": "Seafood",
        "price": "₹450 - ₹750",
        "rating": 4.8,
        "location": "Johnson's Cafe"
      }
    ],
    "stays": [
      {
        "name": "The Himalayan Resort & Spa",
        "type": "Luxury",
        "price": 14000,
        "rating": 4.8,
        "amenities": [
          "Gothic Castle Design",
          "Heated Pool",
          "Orchard Views"
        ]
      },
      {
        "name": "Snow Valley Resorts",
        "type": "Mid-Range",
        "price": 4200,
        "rating": 4.4,
        "amenities": [
          "Balcony Valley View",
          "Buffet",
          "Loggarh"
        ]
      },
      {
        "name": "Alt Life - Old Manali",
        "type": "Budget",
        "price": 1400,
        "rating": 4.5,
        "amenities": [
          "Riverside Vibe",
          "Fast Wi-Fi",
          "Community Bonfires"
        ]
      }
    ]
  },
  {
    "id": "dubai",
    "name": "Dubai",
    "country": "United Arab Emirates",
    "isInternational": true,
    "currency": "AED",
    "currencySymbol": "د.إ",
    "type": "metro",
    "state": "Emirate of Dubai",
    "tagline": "Futuristic Skylines, Desert Safaris & World-Class Luxury",
    "description": "An ultra-modern desert oasis boasting the world's tallest skyscraper, mega shopping malls, indoor ski resorts, and golden dune adventures.",
    "coverImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 8500,
    "foodRate": 2500,
    "transportRate": 1800,
    "weather": [
      {
        "month": 1,
        "tempC": 24,
        "condition": "Pleasant & Sunny",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Peak winter season; ideal for outdoor desert safaris and Marina walks."
      },
      {
        "month": 2,
        "tempC": 26,
        "condition": "Sunny",
        "humidity": 52,
        "icon": "Sun",
        "suggestion": "Warm pleasant beach weather and Dubai Shopping Festival."
      },
      {
        "month": 3,
        "tempC": 29,
        "condition": "Sunny",
        "humidity": 48,
        "icon": "Sun",
        "suggestion": "Warm days, perfect for rooftop pool lounging and yacht cruises."
      },
      {
        "month": 4,
        "tempC": 34,
        "condition": "Warm",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Rising temperatures; visit air-conditioned mega malls and museums."
      },
      {
        "month": 5,
        "tempC": 38,
        "condition": "Hot",
        "humidity": 42,
        "icon": "Sun",
        "suggestion": "Summer begins; enjoy evening desert stargazing and indoor attractions."
      },
      {
        "month": 6,
        "tempC": 41,
        "condition": "Very Hot",
        "humidity": 48,
        "icon": "Sun",
        "suggestion": "High heat; explore Dubai Aquarium, Ski Dubai and Burj Khalifa."
      },
      {
        "month": 7,
        "tempC": 43,
        "condition": "Very Hot",
        "humidity": 52,
        "icon": "Sun",
        "suggestion": "Peak summer; indoor entertainment and evening dining."
      },
      {
        "month": 8,
        "tempC": 42,
        "condition": "Very Hot",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Stay in air-conditioned comfort during daytime hours."
      },
      {
        "month": 9,
        "tempC": 39,
        "condition": "Hot",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Late summer transition; evening beachfront dining returns."
      },
      {
        "month": 10,
        "tempC": 35,
        "condition": "Warm",
        "humidity": 52,
        "icon": "Sun",
        "suggestion": "Cooling down; Global Village season opens."
      },
      {
        "month": 11,
        "tempC": 30,
        "condition": "Sunny",
        "humidity": 50,
        "icon": "Sun",
        "suggestion": "Terrific outdoor weather across Miracle Garden."
      },
      {
        "month": 12,
        "tempC": 26,
        "condition": "Pleasant",
        "humidity": 54,
        "icon": "Sun",
        "suggestion": "World-class New Year fireworks and lively outdoor souks."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "sunscreen",
      "sunglasses",
      "light-clothing"
    ],
    "internationalInfo": {
      "visaRequirement": "Tourist Visa / 30-day Visa on Arrival for many nationalities. Check official GDRFA portal.",
      "passportValidity": "Minimum 6 months validity required from arrival date.",
      "currency": "United Arab Emirates Dirham (AED)",
      "adapterType": "Type G (British standard three-pin)",
      "emergencyNumber": "999 (Police), 998 (Ambulance)",
      "demoNotice": "Demo recommendations are being used. Verify current official visa and entry guidelines through official government sources."
    },
    "coordinates": {
      "lat": 25.2048,
      "lng": 55.2708
    },
    "places": [
      {
        "id": "dxb-burj-khalifa",
        "name": "Burj Khalifa At The Top Observation Deck",
        "category": "Sightseeing",
        "rating": 4.9,
        "price": 3500,
        "location": "1 Sheikh Mohammed bin Rashid Blvd",
        "description": "World's tallest skyscraper soaring 828m, offering floor-to-ceiling glass observation decks over the Arabian Gulf and desert.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:30 - 23:00",
        "bestTimeToVisit": "Sunset / Night Lights"
      },
      {
        "id": "dxb-desert-safari",
        "name": "Red Dunes Desert Safari & Bedouin Camp BBQ",
        "category": "Adventure",
        "rating": 4.8,
        "price": 2200,
        "location": "Lahbab Desert",
        "description": "Thrilling 4x4 dune bashing across golden red dunes, followed by camel trekking, sandboarding, and traditional BBQ dinner.",
        "tags": [
          "Adventure",
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "15:00 - 21:30",
        "bestTimeToVisit": "Late Afternoon & Night"
      },
      {
        "id": "dxb-mall",
        "name": "The Dubai Mall, Aquarium & Dancing Fountain Show",
        "category": "Shopping",
        "rating": 4.8,
        "price": 0,
        "location": "Downtown Dubai",
        "description": "1,200+ luxury stores, Olympic-sized ice rink, giant indoor aquarium, and choreographed evening dancing water fountains.",
        "tags": [
          "Shopping",
          "Food",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 00:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "dxb-frame",
        "name": "Dubai Frame & Glass Skybridge Lookout",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 1200,
        "location": "Zabeel Park",
        "description": "150-meter-tall golden picture frame framing historic Old Dubai to the north and futuristic modern skyscrapers to the south.",
        "tags": [
          "Sightseeing",
          "Photography",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 21:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "dxb-al-fahidi",
        "name": "Al Fahidi Historical Neighbourhood & Abra River Ride",
        "category": "History",
        "rating": 4.7,
        "price": 50,
        "location": "Bur Dubai",
        "description": "Traditional wind-tower architecture quarter along Dubai Creek, reached via heritage 1-Dirham wooden abra boat rides.",
        "tags": [
          "History",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 20:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "dxb-miracle-garden",
        "name": "Dubai Miracle Garden & Floral Sculptures",
        "category": "Nature",
        "rating": 4.8,
        "price": 1800,
        "location": "Al Barsha South",
        "description": "World's largest natural flower garden featuring 150 million blooming flowers arranged into Emirates A380 planes and castles.",
        "tags": [
          "Nature",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 21:00 (Nov - Apr)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "dxb-marina-yacht",
        "name": "Dubai Marina Luxury Yacht Cruise & JBR The Walk",
        "category": "Relaxed",
        "rating": 4.8,
        "price": 2800,
        "location": "Dubai Marina",
        "description": "Glide past towering illuminated glass spires, superyachts, and the vibrant JBR beach promenade.",
        "tags": [
          "Relaxed",
          "Sightseeing",
          "Beach"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "16:00 - 21:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "dxb-palm-jumeirah",
        "name": "The View at The Palm & Pointe Waterfront",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 2400,
        "location": "Palm Tower, Palm Jumeirah",
        "description": "Panoramic 240m-high observation deck delivering 360-degree vistas of the palm-shaped archipelago and Atlantis resort.",
        "tags": [
          "Sightseeing",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 22:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "dxb-aquaventure",
        "name": "Atlantis Aquaventure Waterpark & Lost Chambers",
        "category": "Adventure",
        "rating": 4.9,
        "price": 4500,
        "location": "Atlantis The Palm",
        "description": "World's largest waterpark boasting 105 record-breaking slides, tidal rivers, and a massive underwater marine tunnel.",
        "tags": [
          "Adventure",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 18:00",
        "bestTimeToVisit": "Full Day"
      },
      {
        "id": "dxb-global-village",
        "name": "Global Village Cultural Pavilions & Street Carnival",
        "category": "Culture",
        "rating": 4.8,
        "price": 500,
        "location": "Sheikh Mohamed Bin Zayed Rd",
        "description": "Vibrant open-air multicultural festival park bringing together 90+ country cultures, artisan crafts, and global street eats.",
        "tags": [
          "Culture",
          "Shopping",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "16:00 - 00:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "dxb-museum-future",
        "name": "Museum of the Future Architectural Marvel",
        "category": "Culture",
        "rating": 4.9,
        "price": 3200,
        "location": "Sheikh Zayed Road",
        "description": "Pioneering torus-shaped building inscribed with Arabic poetry, featuring futuristic AI exhibitions and space stations.",
        "tags": [
          "Culture",
          "Architecture",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 19:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "dxb-spice-souk",
        "name": "Deira Gold Souk & Traditional Spice Bazaar",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Deira, Old Dubai",
        "description": "Historic trading alleys glistening with tons of 24k gold jewelry, saffron threads, frankincense, and exotic perfumes.",
        "tags": [
          "Shopping",
          "Culture",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 21:30",
        "bestTimeToVisit": "Late Afternoon"
      },
      {
        "id": "dxb-bluewaters",
        "name": "Bluewaters Island & Ain Dubai Seaside Walk",
        "category": "Relaxed",
        "rating": 4.7,
        "price": 0,
        "location": "Bluewaters",
        "description": "Vibrant pedestrian island community with oceanfront dining, artisan boutiques, and views of the world's largest observation wheel.",
        "tags": [
          "Relaxed",
          "Sightseeing",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunset & Evening"
      },
      {
        "id": "dxb-hatta-mountains",
        "name": "Hatta Dam Kayaking & Heritage Mountain Village",
        "category": "Nature",
        "rating": 4.8,
        "price": 1500,
        "location": "Hatta Mountains",
        "description": "Turquoise mountain reservoir framed by rugged Hajar peaks, offering calm kayaking, mountain biking, and honey bee discovery.",
        "tags": [
          "Nature",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 17:30",
        "bestTimeToVisit": "Day Tour"
      }
    ],
    "foods": [
      {
        "name": "Al Machboos (Fragrant Spiced Rice & Meat)",
        "category": "Non-Veg",
        "price": "AED 55 - 110",
        "rating": 4.8,
        "location": "Al Fanar Heritage Restaurant"
      },
      {
        "name": "Warm Shawarma & Garlic Toum",
        "category": "Street Food",
        "price": "AED 12 - 25",
        "rating": 4.9,
        "location": "Al Mallah, Dhyan"
      },
      {
        "name": "Kunafa with Rose Pistachio Syrup",
        "category": "Dessert",
        "price": "AED 30 - 55",
        "rating": 4.9,
        "location": "Firas Sweets"
      }
    ],
    "stays": [
      {
        "name": "Atlantis, The Palm",
        "type": "Luxury",
        "price": 34000,
        "rating": 4.9,
        "amenities": [
          "Aquaventure Waterpark",
          "Underwater Suites",
          "Nobu Dining"
        ]
      },
      {
        "name": "Rove Downtown Dubai",
        "type": "Mid-Range",
        "price": 7200,
        "rating": 4.7,
        "amenities": [
          "Burj Khalifa View",
          "Pool",
          "Cinema"
        ]
      },
      {
        "name": "Holiday Inn Express Dubai Airport",
        "type": "Budget",
        "price": 3900,
        "rating": 4.2,
        "amenities": [
          "Free Shuttle",
          "Buffet Breakfast",
          "Clean Rooms"
        ]
      }
    ]
  },
  {
    "id": "paris",
    "name": "Paris",
    "country": "France",
    "isInternational": true,
    "currency": "EUR",
    "currencySymbol": "€",
    "type": "heritage",
    "state": "Île-de-France",
    "tagline": "City of Light, Romantic Boulevards & Haute Cuisine",
    "description": "The global epicenter of art, fashion, gastronomy and culture, framed by the romantic Seine River, Gothic cathedrals, and world-renowned museums.",
    "coverImage": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 11500,
    "foodRate": 3500,
    "transportRate": 1600,
    "weather": [
      {
        "month": 1,
        "tempC": 5,
        "condition": "Cold & Crisp",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Chilly winter; warm up in cozy Parisian bistros with hot chocolate."
      },
      {
        "month": 2,
        "tempC": 7,
        "condition": "Chilly",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Romantic Valentine vibes, shorter queues at Louvre and Orsay."
      },
      {
        "month": 3,
        "tempC": 12,
        "condition": "Mild",
        "humidity": 70,
        "icon": "Sun",
        "suggestion": "Early spring blossoms in Tuileries and Luxembourg Gardens."
      },
      {
        "month": 4,
        "tempC": 16,
        "condition": "Spring",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Delightful spring days, outdoor cafe terraces bustling."
      },
      {
        "month": 5,
        "tempC": 20,
        "condition": "Pleasant",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Ideal weather for Seine river cruises and Montmartre walks."
      },
      {
        "month": 6,
        "tempC": 24,
        "condition": "Warm & Sunny",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Long daylight hours until 10 PM; picnic by the Eiffel Tower."
      },
      {
        "month": 7,
        "tempC": 26,
        "condition": "Sunny",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Summer festivals, Paris Plages riverside beaches."
      },
      {
        "month": 8,
        "tempC": 25,
        "condition": "Warm",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Quieter city as locals vacation; great for museum exploration."
      },
      {
        "month": 9,
        "tempC": 21,
        "condition": "Mild",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Crisp autumn air, golden foliage across Champs-Élysées."
      },
      {
        "month": 10,
        "tempC": 15,
        "condition": "Cool",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "Art exhibitions, cozy wine bars, and roasted chestnuts."
      },
      {
        "month": 11,
        "tempC": 10,
        "condition": "Cold",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Early holiday illuminations begin across department stores."
      },
      {
        "month": 12,
        "tempC": 6,
        "condition": "Festive Chill",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Christmas markets along Saint-Germain and sparkling Eiffel Tower."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "walking-shoes",
      "warm-layers",
      "umbrella"
    ],
    "internationalInfo": {
      "visaRequirement": "Schengen Visa required for non-EU travelers. Apply at least 4-6 weeks before trip.",
      "passportValidity": "Must have at least 3 months validity beyond intended departure date from Schengen zone.",
      "currency": "Euro (EUR €)",
      "adapterType": "Type C and Type E (European standard two-pin)",
      "emergencyNumber": "112 (European emergency universal number)",
      "demoNotice": "Demo recommendations are being used. Verify official Schengen visa regulations from the French consulate."
    },
    "coordinates": {
      "lat": 48.8566,
      "lng": 2.3522
    },
    "places": [
      {
        "id": "prs-eiffel",
        "name": "Eiffel Tower & Champ de Mars Summit View",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 2500,
        "location": "Champ de Mars, 7th Arrondissement",
        "description": "Gustave Eiffel's 330-meter wrought-iron masterpiece offering summit views over Paris and hourly golden sparkling illuminations.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 23:45",
        "bestTimeToVisit": "Sunset & Evening Sparkle"
      },
      {
        "id": "prs-louvre",
        "name": "Louvre Museum & Glass Pyramid",
        "category": "History",
        "rating": 4.9,
        "price": 1900,
        "location": "Rue de Rivoli, 1st Arrondissement",
        "description": "World's largest art museum housing over 35,000 treasures including the Mona Lisa, Venus de Milo, and Winged Victory.",
        "tags": [
          "History",
          "Culture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00 (Closed Tuesday)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "prs-orsay",
        "name": "Musée d'Orsay Impressionist Masterpieces",
        "category": "Culture",
        "rating": 4.8,
        "price": 1600,
        "location": "1 Rue de la Légion d'Honneur",
        "description": "Former Beaux-Arts railway station showcasing glorious works by Monet, Van Gogh, Renoir, Degas, and Cézanne.",
        "tags": [
          "Culture",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 18:00 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "prs-montmartre",
        "name": "Montmartre & Sacré-Cœur Basilica Sunset",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Montmartre, 18th Arrondissement",
        "description": "Historic bohemian hilltop quarter with cobblestone alleys, street portrait artists at Place du Tertre, and Sacré-Cœur dome.",
        "tags": [
          "Culture",
          "Photography",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 22:30",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "prs-notre-dame",
        "name": "Cathédrale Notre-Dame & Île de la Cité Stroll",
        "category": "History",
        "rating": 4.7,
        "price": 0,
        "location": "Île de la Cité, 4th Arrondissement",
        "description": "Gothic architectural icon founded in 1163, surrounded by charming flower markets and medieval Seine riverbridges.",
        "tags": [
          "History",
          "Architecture",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:45",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "prs-arc-triomphe",
        "name": "Arc de Triomphe & Champs-Élysées Luxury Avenue",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 1300,
        "location": "Place Charles de Gaulle",
        "description": "Monumental triumphal arch honoring French military victories with rooftop observation platform over 12 grand avenues.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 22:30",
        "bestTimeToVisit": "Late Afternoon"
      },
      {
        "id": "prs-seine-cruise",
        "name": "Seine River Bateaux Mouches Evening Cruise",
        "category": "Relaxed",
        "rating": 4.8,
        "price": 1500,
        "location": "Pont de l'Alma",
        "description": "Gliding under romantic illuminated stone bridges past Notre-Dame, the Louvre, and glittering Eiffel Tower.",
        "tags": [
          "Relaxed",
          "Sightseeing",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 22:30",
        "bestTimeToVisit": "Twilight / Evening"
      },
      {
        "id": "prs-versailles",
        "name": "Palace of Versailles Hall of Mirrors & Royal Gardens",
        "category": "History",
        "rating": 4.9,
        "price": 2400,
        "location": "Versailles",
        "description": "Opulent royal chateau of the Sun King Louis XIV, featuring the Hall of Mirrors, King's Grand Apartments, and fountain gardens.",
        "tags": [
          "History",
          "Architecture",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30 (Closed Mondays)",
        "bestTimeToVisit": "Day Tour"
      },
      {
        "id": "prs-sainte-chapelle",
        "name": "Sainte-Chapelle Gothic Stained Glass Marvel",
        "category": "Culture",
        "rating": 4.8,
        "price": 1150,
        "location": "10 Boulevard du Palais",
        "description": "13th-century royal chapel celebrated for 15 soaring stained-glass windows depicting 1,113 biblical scenes in jewel colors.",
        "tags": [
          "Culture",
          "History",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00",
        "bestTimeToVisit": "Morning Light"
      },
      {
        "id": "prs-latin-quarter",
        "name": "Latin Quarter Medieval Lanes & Shakespeare and Co",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "5th Arrondissement",
        "description": "Historic student quarter around Sorbonne University with quaint bookshops, jazz cellars, and Panthéon grandeur.",
        "tags": [
          "Culture",
          "Shopping",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "All Day",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "prs-marais",
        "name": "Le Marais Designer Boutiques & Jewish Bakery Trail",
        "category": "Shopping",
        "rating": 4.8,
        "price": 0,
        "location": "3rd & 4th Arrondissements",
        "description": "Chic aristocratic enclave filled with avant-garde fashion boutiques, art galleries, and famous falafel on Rue des Rosiers.",
        "tags": [
          "Shopping",
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 19:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "prs-luxembourg",
        "name": "Luxembourg Gardens & Medici Palace Fountain",
        "category": "Nature",
        "rating": 4.8,
        "price": 0,
        "location": "6th Arrondissement",
        "description": "Lush 25-hectare formal French palace gardens with tree-lined promenades, vintage sailboat basins, and Medici fountain.",
        "tags": [
          "Nature",
          "Relaxed",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:30 - 21:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "prs-bistros-walk",
        "name": "Saint-Germain Historic Cafes & Pastry Food Trail",
        "category": "Food",
        "rating": 4.9,
        "price": 650,
        "location": "Boulevard Saint-Germain",
        "description": "Iconic literary cafe trail visiting Café de Flore and Les Deux Magots with tasting of macarons, choux, and hot chocolate.",
        "tags": [
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:30 - 01:00",
        "bestTimeToVisit": "Afternoon Tea"
      },
      {
        "id": "prs-catacombs",
        "name": "Paris Catacombs Underground Labyrinth",
        "category": "Adventure",
        "rating": 4.6,
        "price": 1800,
        "location": "1 Avenue du Colonel Henri Rol-Tanguy",
        "description": "Subterranean ossuary 20 meters below Paris streets holding the remains of over six million Parisians in artistic arrangements.",
        "tags": [
          "Adventure",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:45 - 20:30 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Crispy French Butter Croissant",
        "category": "Bakery",
        "price": "€1.80 - €3.50",
        "rating": 4.9,
        "location": "Du Pain et des Idées"
      },
      {
        "name": "French Onion Soup Gratinee",
        "category": "Classic",
        "price": "€12 - €18",
        "rating": 4.8,
        "location": "Au Pied de Cochon"
      },
      {
        "name": "Artisanal Colorful Macarons",
        "category": "Dessert",
        "price": "€15 - €30 box",
        "rating": 4.9,
        "location": "Ladurée / Pierre Hermé"
      }
    ],
    "stays": [
      {
        "name": "Hôtel Plaza Athénée",
        "type": "Luxury",
        "price": 42000,
        "rating": 4.9,
        "amenities": [
          "Eiffel Tower Views",
          "Dior Spa",
          "Courtyard"
        ]
      },
      {
        "name": "CitizenM Paris Gare de Lyon",
        "type": "Mid-Range",
        "price": 9500,
        "rating": 4.6,
        "amenities": [
          "Rooftop Bar",
          "MoodPad Controls",
          "Central"
        ]
      },
      {
        "name": "Generator Paris",
        "type": "Budget",
        "price": 2800,
        "rating": 4.3,
        "amenities": [
          "Rooftop Terrace",
          "Canal Saint-Martin",
          "Bar"
        ]
      }
    ]
  },
  {
    "id": "singapore",
    "name": "Singapore",
    "country": "Singapore",
    "isInternational": true,
    "currency": "SGD",
    "currencySymbol": "S$",
    "type": "metro",
    "state": "Singapore",
    "tagline": "Lion City, Biophilic Gardens & Hawker Gastronomy",
    "description": "Futuristic city-state seamlessly blending hyper-modern architecture, lush vertical gardens, world-class street food markets, and island resorts.",
    "coverImage": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 9800,
    "foodRate": 2200,
    "transportRate": 1200,
    "weather": [
      {
        "month": 1,
        "tempC": 28,
        "condition": "Warm & Tropical",
        "humidity": 82,
        "icon": "Sun",
        "suggestion": "Pleasant northeast monsoon breeze; ideal for Gardens by the Bay."
      },
      {
        "month": 2,
        "tempC": 29,
        "condition": "Sunny",
        "humidity": 78,
        "icon": "Sun",
        "suggestion": "Driest month, great for Sentosa beach clubs and Universal Studios."
      },
      {
        "month": 3,
        "tempC": 30,
        "condition": "Warm",
        "humidity": 80,
        "icon": "Sun",
        "suggestion": "Sunny days; enjoy air-conditioned Jewel Changi waterfall."
      },
      {
        "month": 4,
        "tempC": 31,
        "condition": "Tropical",
        "humidity": 82,
        "icon": "Sun",
        "suggestion": "Short afternoon showers; evening dining along Clarke Quay."
      },
      {
        "month": 5,
        "tempC": 31,
        "condition": "Warm",
        "humidity": 83,
        "icon": "Sun",
        "suggestion": "Warm nights; rooftop cocktails at Marina Bay Sands."
      },
      {
        "month": 6,
        "tempC": 30,
        "condition": "Pleasant",
        "humidity": 80,
        "icon": "Sun",
        "suggestion": "Great Singapore Sale season and food festivals."
      },
      {
        "month": 7,
        "tempC": 30,
        "condition": "Tropical",
        "humidity": 79,
        "icon": "Sun",
        "suggestion": "Outdoor walking tours across Chinatown and Little India."
      },
      {
        "month": 8,
        "tempC": 30,
        "condition": "Warm",
        "humidity": 80,
        "icon": "Sun",
        "suggestion": "National Day parades and spectacular fireworks."
      },
      {
        "month": 9,
        "tempC": 29,
        "condition": "Warm & Humid",
        "humidity": 81,
        "icon": "Sun",
        "suggestion": "Singapore Grand Prix F1 night race excitement."
      },
      {
        "month": 10,
        "tempC": 29,
        "condition": "Showers",
        "humidity": 84,
        "icon": "CloudRain",
        "suggestion": "Afternoon tropical thundershowers; carry an umbrella."
      },
      {
        "month": 11,
        "tempC": 28,
        "condition": "Monsoon Showers",
        "humidity": 86,
        "icon": "CloudRain",
        "suggestion": "Festive Christmas light-up on Orchard Road."
      },
      {
        "month": 12,
        "tempC": 28,
        "condition": "Tropical Rain",
        "humidity": 87,
        "icon": "CloudRain",
        "suggestion": "Lush tropical green vibes, comfortable cloud cover."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "umbrella",
      "light-clothing",
      "walking-shoes"
    ],
    "internationalInfo": {
      "visaRequirement": "SG Arrival Card (electronic health declaration) mandatory within 3 days before arrival. Visa required for select passports.",
      "passportValidity": "At least 6 months validity required from arrival date.",
      "currency": "Singapore Dollar (SGD S$)",
      "adapterType": "Type G (three rectangular pins, 230V)",
      "emergencyNumber": "999 (Police), 995 (Ambulance/Fire)",
      "demoNotice": "Demo recommendations are being used. Complete the official SG Arrival Card on the ICA official portal."
    },
    "coordinates": {
      "lat": 1.3521,
      "lng": 103.8198
    },
    "places": [
      {
        "id": "sgp-gardens-bay",
        "name": "Gardens by the Bay & Supertree Grove Light Show",
        "category": "Nature",
        "rating": 4.9,
        "price": 1800,
        "location": "18 Marina Gardens Dr",
        "description": "Futuristic horticultural sanctuary featuring 16-story vertical Supertrees, Cloud Forest misty mountain, and Flower Dome.",
        "tags": [
          "Nature",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
        "openingHours": "05:00 - 02:00",
        "bestTimeToVisit": "Late Afternoon & Night"
      },
      {
        "id": "sgp-marina-sands",
        "name": "Marina Bay Sands SkyPark & Observation Deck",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 2200,
        "location": "10 Bayfront Avenue",
        "description": "World-famous 57th-floor observation deck shaped like a cruise ship, offering panoramic views of Singapore Strait and skyline.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:00 - 21:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "sgp-sentosa",
        "name": "Sentosa Island, Siloso Beach & Universal Studios",
        "category": "Adventure",
        "rating": 4.8,
        "price": 4800,
        "location": "Sentosa Island",
        "description": "Resort playground featuring movie rides, sandy beach clubs, cable cars, and the S.E.A. Aquarium.",
        "tags": [
          "Adventure",
          "Beach",
          "Entertainment"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 19:00",
        "bestTimeToVisit": "Full Day"
      },
      {
        "id": "sgp-botanic-gardens",
        "name": "Singapore Botanic Gardens & National Orchid Garden",
        "category": "Nature",
        "rating": 4.8,
        "price": 300,
        "location": "1 Cluny Rd",
        "description": "165-year-old tropical botanical garden and UNESCO World Heritage site showcasing 60,000 breathtaking orchid varieties.",
        "tags": [
          "Nature",
          "Relaxed",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "05:00 - 00:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "sgp-chinatown",
        "name": "Chinatown Heritage Trail & Buddha Tooth Relic Temple",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Chinatown",
        "description": "Tang-dynasty style Buddhist temple and heritage streets filled with traditional herbalists, tea shops, and souvenir arcades.",
        "tags": [
          "Culture",
          "History",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "sgp-little-india",
        "name": "Little India, Tekka Centre & Sri Veeramakaliamman",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Serangoon Road",
        "description": "Vibrant cultural enclave with garland makers, gold jewelers, colorful street murals, and fragrant South Indian food stalls.",
        "tags": [
          "Culture",
          "Food",
          "Shopping"
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 21:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "sgp-jewel-changi",
        "name": "Jewel Changi Rain Vortex & Shiseido Forest Valley",
        "category": "Sightseeing",
        "rating": 4.9,
        "price": 0,
        "location": "78 Airport Blvd",
        "description": "World's tallest indoor waterfall cascading 40 meters through a multi-story indoor tropical cloud forest.",
        "tags": [
          "Sightseeing",
          "Nature",
          "Shopping"
        ],
        "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Evening Light Show"
      },
      {
        "id": "sgp-clarke-quay",
        "name": "Clarke Quay Riverside Promenade & Bumboat Cruise",
        "category": "Relaxed",
        "rating": 4.7,
        "price": 1200,
        "location": "3 River Valley Rd",
        "description": "Historic trading warehouses converted into buzzing waterside restaurants, paired with a traditional river cruise.",
        "tags": [
          "Relaxed",
          "Sightseeing",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 23:00",
        "bestTimeToVisit": "Night"
      },
      {
        "id": "sgp-haji-lane",
        "name": "Kampong Glam, Haji Lane Murals & Sultan Mosque",
        "category": "Shopping",
        "rating": 4.8,
        "price": 0,
        "location": "Arab Street Enclave",
        "description": "Bohemian indie alley with vibrant graffiti murals, vintage apparel stores, middle eastern cafes, and golden dome mosque.",
        "tags": [
          "Shopping",
          "Photography",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:00 - 21:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "sgp-night-safari",
        "name": "Singapore Night Safari Open-Air Wildlife Tram",
        "category": "Adventure",
        "rating": 4.8,
        "price": 3200,
        "location": "80 Mandai Lake Rd",
        "description": "World's first nocturnal wildlife park where 900+ animals roam across 6 geographical zones under moonlight.",
        "tags": [
          "Adventure",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "19:15 - 00:00",
        "bestTimeToVisit": "Night"
      },
      {
        "id": "sgp-orchard-road",
        "name": "Orchard Road Mega Shopping Boulevard",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Orchard",
        "description": "2.2-kilometer shopping paradise lined with luxury mega malls like ION Orchard, Takashimaya, and gourmet food basements.",
        "tags": [
          "Shopping",
          "Food",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 22:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "sgp-lau-pa-sat",
        "name": "Lau Pa Sat Historic Hawker Market & Satay Street",
        "category": "Food",
        "rating": 4.8,
        "price": 450,
        "location": "18 Raffles Quay",
        "description": "Victorian cast-iron market where the street closes at sunset for open-air charcoal-grilled satay skewers and cold beer.",
        "tags": [
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Dinner / Late Night"
      },
      {
        "id": "sgp-merlion-park",
        "name": "Merlion Park & Marina Bay Waterfront Stroll",
        "category": "Photography",
        "rating": 4.7,
        "price": 0,
        "location": "1 Fullerton Rd",
        "description": "Singapore's legendary national mythical emblem spouting water into Marina Bay against the financial district skyscrapers.",
        "tags": [
          "Photography",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Morning / Night Lights"
      },
      {
        "id": "sgp-southern-ridges",
        "name": "Southern Ridges Canopy Walk & Henderson Waves",
        "category": "Nature",
        "rating": 4.7,
        "price": 0,
        "location": "Mount Faber Park",
        "description": "10 km chain of green open spaces linked by wave-like sculptural timber footbridges offering panoramic island sea views.",
        "tags": [
          "Nature",
          "Photography",
          "Adventure"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Early Morning"
      }
    ],
    "foods": [
      {
        "name": "Hainanese Chicken Rice",
        "category": "Hawker",
        "price": "S$ 5 - 10",
        "rating": 4.9,
        "location": "Tian Tian Hainanese, Maxwell"
      },
      {
        "name": "Singapore Chilli Crab with Fried Buns",
        "category": "Seafood",
        "price": "S$ 60 - 95",
        "rating": 4.8,
        "location": "Jumbo Seafood"
      },
      {
        "name": "Kaya Toast & Soft Boiled Eggs",
        "category": "Breakfast",
        "price": "S$ 4 - 7",
        "rating": 4.7,
        "location": "Ya Kun Kaya Toast"
      }
    ],
    "stays": [
      {
        "name": "Marina Bay Sands",
        "type": "Luxury",
        "price": 38000,
        "rating": 4.9,
        "amenities": [
          "World-Famous Infinity Pool",
          "SkyPark",
          "Casino"
        ]
      },
      {
        "name": "YOTEL Singapore Orchard",
        "type": "Mid-Range",
        "price": 8200,
        "rating": 4.5,
        "amenities": [
          "Smart Cabins",
          "Outdoor Pool",
          "Orchard Rd"
        ]
      },
      {
        "name": "The Pod Boutique Capsule Hotel",
        "type": "Budget",
        "price": 2900,
        "rating": 4.4,
        "amenities": [
          "Single/Double Pods",
          "Free Breakfast",
          "Arab St"
        ]
      }
    ]
  },
  {
    "id": "bangkok",
    "name": "Bangkok",
    "country": "Thailand",
    "isInternational": true,
    "currency": "THB",
    "currencySymbol": "฿",
    "type": "metro",
    "state": "Bangkok Province",
    "tagline": "City of Angels, Gilded Temples & Floating Markets",
    "description": "Vibrant capital known for ornate shrines, bustling river life, Tuk-Tuk rides, floating markets, and legendary spicy Thai street gastronomy.",
    "coverImage": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 3800,
    "foodRate": 1100,
    "transportRate": 850,
    "weather": [
      {
        "month": 1,
        "tempC": 27,
        "condition": "Pleasant & Dry",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Cool dry season; best time for Grand Palace and Wat Arun."
      },
      {
        "month": 2,
        "tempC": 29,
        "condition": "Warm & Sunny",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Great canal boat tours and Chinatown Chinese New Year."
      },
      {
        "month": 3,
        "tempC": 32,
        "condition": "Warm",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Warm weather; visit Chatuchak weekend market early morning."
      },
      {
        "month": 4,
        "tempC": 35,
        "condition": "Hot & Festive",
        "humidity": 70,
        "icon": "Sun",
        "suggestion": "Songkran Water Festival — city-wide celebrations and water fights!"
      },
      {
        "month": 5,
        "tempC": 34,
        "condition": "Hot Showers",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "Pre-monsoon showers; shop at ICONSIAM and CentralWorld."
      },
      {
        "month": 6,
        "tempC": 31,
        "condition": "Tropical Rain",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Afternoon showers; great evening night markets."
      },
      {
        "month": 7,
        "tempC": 30,
        "condition": "Rainy",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Tropical showers; enjoy relaxing Thai massage and cooking classes."
      },
      {
        "month": 8,
        "tempC": 30,
        "condition": "Rainy",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Pack umbrellas and light sandals for street food hopping."
      },
      {
        "month": 9,
        "tempC": 29,
        "condition": "Monsoon",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Wettest month; explore Bangkok Art and Culture Centre."
      },
      {
        "month": 10,
        "tempC": 29,
        "condition": "Clearing Rains",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Skies start clearing; Loy Krathong floating lantern festival."
      },
      {
        "month": 11,
        "tempC": 28,
        "condition": "Pleasant",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Cool breezes return; spectacular rooftop bars and river cruises."
      },
      {
        "month": 12,
        "tempC": 26,
        "condition": "Comfortable",
        "humidity": 64,
        "icon": "Sun",
        "suggestion": "Best climate of the year for temple hopping and walking tours."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "modest-clothing-for-temples",
      "sunscreen",
      "sandals"
    ],
    "internationalInfo": {
      "visaRequirement": "Visa on Arrival / Visa Exemption available for numerous nationalities. Check Thai Immigration Bureau.",
      "passportValidity": "Must have at least 6 months validity.",
      "currency": "Thai Baht (THB ฿)",
      "adapterType": "Type A, B, and C (220V)",
      "emergencyNumber": "1155 (Tourist Police - English speaking), 191 (General Police)",
      "demoNotice": "Demo recommendations are being used. Verify official entry guidelines from official Thai embassy sources."
    },
    "coordinates": {
      "lat": 13.7563,
      "lng": 100.5018
    },
    "places": [
      {
        "id": "bkk-grand-palace",
        "name": "Grand Palace & Emerald Buddha Temple",
        "category": "History",
        "rating": 4.8,
        "price": 500,
        "location": "Na Phra Lan Rd, Phra Borom Maha Ratchawang",
        "description": "Gilded complex of royal residences and the sacred Wat Phra Kaew housing the revered Emerald Buddha carved from jasper.",
        "tags": [
          "History",
          "Culture",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:30 - 15:30",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "bkk-wat-arun",
        "name": "Wat Arun (Temple of Dawn) Riverfront",
        "category": "Culture",
        "rating": 4.8,
        "price": 100,
        "location": "Bangkok Yai, Chao Phraya West Bank",
        "description": "Dramatic riverside Khmer-style prang spires decorated with millions of pieces of colorful Chinese porcelain mosaics.",
        "tags": [
          "Culture",
          "Photography",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "bkk-wat-pho",
        "name": "Wat Pho & Reclining Buddha Sanctuary",
        "category": "Culture",
        "rating": 4.7,
        "price": 200,
        "location": "Sanam Chai Rd, Phra Nakhon",
        "description": "Famous for the monumental 46-meter gold-plated reclining Buddha with mother-of-pearl feet, and birth place of Thai massage.",
        "tags": [
          "Culture",
          "History",
          "Wellness"
        ],
        "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "bkk-chatuchak",
        "name": "Chatuchak Weekend Market & Street Stalls",
        "category": "Shopping",
        "rating": 4.7,
        "price": 0,
        "location": "Kamphaeng Phet 2 Rd, Chatuchak",
        "description": "World's largest outdoor weekend market containing over 15,000 stalls selling vintage clothing, handcrafted ceramics, and snacks.",
        "tags": [
          "Shopping",
          "Food",
          "Vibrant"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00 (Sat-Sun)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "bkk-river-cruise",
        "name": "Chao Phraya Express Longtail Boat Cruise",
        "category": "Sightseeing",
        "rating": 4.6,
        "price": 150,
        "location": "Sathorn Pier",
        "description": "Cruising the River of Kings past glittering temples, wooden stilt houses along Thonburi canals, and luxury river hotels.",
        "tags": [
          "Sightseeing",
          "Boating",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 19:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "bkk-chinatown-food",
        "name": "Yaowarat Chinatown Night Street Food Trail",
        "category": "Food",
        "rating": 4.9,
        "price": 300,
        "location": "Yaowarat Road, Samphanthawong",
        "description": "Neon-drenched street food culinary paradise famous for toasted buns, crispy oyster omelets, crab fried rice, and dim sum.",
        "tags": [
          "Food",
          "Nightlife",
          "Street Eats"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "18:00 - 01:00",
        "bestTimeToVisit": "Night Food Trail"
      },
      {
        "id": "bkk-lumpini",
        "name": "Lumpini Park Monitor Lizards & Paddle Boating",
        "category": "Nature",
        "rating": 4.6,
        "price": 0,
        "location": "Rama IV Rd, Pathum Wan",
        "description": "Tranquil green oasis amidst skyscrapers where water monitor lizards roam freely around artificial lakes and jogging tracks.",
        "tags": [
          "Nature",
          "Wildlife",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "04:30 - 22:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "bkk-jim-thompson",
        "name": "Jim Thompson House & Tropical Silk Garden",
        "category": "Culture",
        "rating": 4.7,
        "price": 200,
        "location": "Kasemsan 2 Alley, Pathum Wan",
        "description": "Traditional Thai-style teakwood house complex surrounded by a jungle garden, housing Asian antiques and handwoven silk looms.",
        "tags": [
          "Culture",
          "History",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 18:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "bkk-iconsiam",
        "name": "ICONSIAM SookSiam Indoor Floating Market",
        "category": "Shopping",
        "rating": 4.8,
        "price": 0,
        "location": "Charoen Nakhon Rd, Khlong San",
        "description": "Futuristic luxury mega-mall featuring an air-conditioned recreation of Thailand's 77 provinces with authentic street eats.",
        "tags": [
          "Shopping",
          "Food",
          "Modern"
        ],
        "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 22:00",
        "bestTimeToVisit": "Afternoon & Evening"
      },
      {
        "id": "bkk-golden-mount",
        "name": "Wat Saket (Golden Mount) 360 Panorama",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 50,
        "location": "Pom Prap Sattru Phai",
        "description": "Sacred artificial hill crowned with a gleaming golden stupa reached via 344 spiral steps flanked by prayer bells and mist.",
        "tags": [
          "Sightseeing",
          "Culture",
          "Panoramic"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 19:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "bkk-thipsamai",
        "name": "Thip Samai Legendary Pad Thai & Fresh Juice",
        "category": "Food",
        "rating": 4.8,
        "price": 180,
        "location": "Maha Chai Rd, Samran Rat",
        "description": "Historic establishment revered since 1966 for thin egg crepe-wrapped Superb Pad Thai stir-fried over screaming charcoal woks.",
        "tags": [
          "Food",
          "Iconic",
          "Culinary"
        ],
        "image": "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "17:00 - 00:00",
        "bestTimeToVisit": "Dinner"
      },
      {
        "id": "bkk-floating-market",
        "name": "Damnoen Saduak Traditional Floating Market",
        "category": "Culture",
        "rating": 4.5,
        "price": 300,
        "location": "Ratchaburi Outskirts",
        "description": "Iconic wooden paddle boat market where local women wearing straw hats sell tropical mangoes, coconut ice cream, and noodles.",
        "tags": [
          "Culture",
          "Shopping",
          "Adventure"
        ],
        "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 12:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "bkk-lebua-skybar",
        "name": "Sky Bar at Lebua Tower High-Altitude Deck",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 800,
        "location": "Silom Rd, Bang Rak",
        "description": "One of the highest open-air rooftop bars in the world on the 64th floor offering dizzying views of Bangkok's neon skyline.",
        "tags": [
          "Sightseeing",
          "Nightlife",
          "Luxury"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "18:00 - 01:00",
        "bestTimeToVisit": "Night Skyline"
      },
      {
        "id": "bkk-asiatique",
        "name": "Asiatique The Riverfront Night Bazaar",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Charoen Krung Rd, Wat Phraya Krai",
        "description": "Open-air riverfront mall in restored colonial docks featuring an illuminated giant Ferris wheel, cabaret, and boutique shops.",
        "tags": [
          "Shopping",
          "Nightlife",
          "Entertainment"
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "17:00 - 00:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "bkk-erawan-shrine",
        "name": "Erawan Shrine & Traditional Dancers",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Ratchaprasong Intersection",
        "description": "Atmospheric street corner shrine to Phra Phrom (Brahma) enveloped in incense smoke and live performances by traditional Thai dancers.",
        "tags": [
          "Culture",
          "Spiritual",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 22:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "bkk-sea-life",
        "name": "SEA LIFE Bangkok Ocean World Aquarium",
        "category": "Adventure",
        "rating": 4.6,
        "price": 900,
        "location": "Siam Paragon B1-B2",
        "description": "One of Southeast Asia's largest underground oceanariums with a 270-degree glass tunnel, sand tiger sharks, and gentoo penguins.",
        "tags": [
          "Adventure",
          "Family",
          "Marine"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 20:00",
        "bestTimeToVisit": "Afternoon"
      }
    ],
    "foods": [
      {
        "name": "Authentic Pad Thai Goong",
        "category": "Street Food",
        "price": "฿ 80 - 150",
        "rating": 4.9,
        "location": "Thipsamai Pad Thai"
      },
      {
        "name": "Tom Yum Goong (Spicy Shrimp Soup)",
        "category": "Soup",
        "price": "฿ 120 - 220",
        "rating": 4.8,
        "location": "Raan Jay Fai"
      },
      {
        "name": "Sweet Mango Sticky Rice",
        "category": "Dessert",
        "price": "฿ 100 - 160",
        "rating": 4.9,
        "location": "Mae Varee Sweet Shop"
      }
    ],
    "stays": [
      {
        "name": "The Peninsula Bangkok",
        "type": "Luxury",
        "price": 18000,
        "rating": 4.9,
        "amenities": [
          "River Views",
          "Private Ferry",
          "Lush Pool"
        ]
      },
      {
        "name": "Amara Bangkok Hotel",
        "type": "Mid-Range",
        "price": 4500,
        "rating": 4.6,
        "amenities": [
          "Rooftop Infinity Pool",
          "Silom Location",
          "Sky Bar"
        ]
      },
      {
        "name": "Lub d Bangkok Siam",
        "type": "Budget",
        "price": 1400,
        "rating": 4.4,
        "amenities": [
          "BTS Skytrain Adjacent",
          "Modern Dorms",
          "Social Area"
        ]
      }
    ]
  },
  {
    "id": "bali",
    "name": "Bali",
    "country": "Indonesia",
    "isInternational": true,
    "currency": "IDR",
    "currencySymbol": "Rp",
    "type": "beach",
    "state": "Bali Province",
    "tagline": "Island of the Gods, Emerald Terraces & Sacred Temples",
    "description": "Tropical spiritual paradise famed for terraced rice paddies, cliffside sea temples, surf beaches, yoga sanctuaries, and rich artistic traditions.",
    "coverImage": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 4200,
    "foodRate": 1200,
    "transportRate": 900,
    "weather": [
      {
        "month": 1,
        "tempC": 28,
        "condition": "Tropical Rain",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Wet season; lush green rice fields and quieter beach clubs."
      },
      {
        "month": 2,
        "tempC": 28,
        "condition": "Showers",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Warm showers, great for Ubud yoga retreats and wellness spas."
      },
      {
        "month": 3,
        "tempC": 29,
        "condition": "Warm",
        "humidity": 80,
        "icon": "Sun",
        "suggestion": "Nyepi (Day of Silence) - unique cultural experience."
      },
      {
        "month": 4,
        "tempC": 29,
        "condition": "Sunny & Pleasant",
        "humidity": 75,
        "icon": "Sun",
        "suggestion": "Dry season starts; wonderful for surfing and temple tours."
      },
      {
        "month": 5,
        "tempC": 28,
        "condition": "Sunny",
        "humidity": 72,
        "icon": "Sun",
        "suggestion": "Crystal clear waters, great for diving around Nusa Penida."
      },
      {
        "month": 6,
        "tempC": 27,
        "condition": "Breezy & Clear",
        "humidity": 70,
        "icon": "Sun",
        "suggestion": "Cool ocean breezes; ideal trekking weather for Mount Batur."
      },
      {
        "month": 7,
        "tempC": 26,
        "condition": "Clear Skies",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Peak season; sunny days and stunning sunsets at Uluwatu."
      },
      {
        "month": 8,
        "tempC": 26,
        "condition": "Sunny",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Perfect beach weather across Seminyak and Canggu."
      },
      {
        "month": 9,
        "tempC": 27,
        "condition": "Pleasant",
        "humidity": 70,
        "icon": "Sun",
        "suggestion": "Great surfing conditions and pleasant evenings."
      },
      {
        "month": 10,
        "tempC": 28,
        "condition": "Warm",
        "humidity": 74,
        "icon": "Sun",
        "suggestion": "Warm sunny days, beginning of green season."
      },
      {
        "month": 11,
        "tempC": 28,
        "condition": "Scattered Showers",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Occasional afternoon showers; waterfalls are flowing strong."
      },
      {
        "month": 12,
        "tempC": 28,
        "condition": "Tropical Rain",
        "humidity": 84,
        "icon": "CloudRain",
        "suggestion": "Lively New Year beach celebrations across Kuta and Canggu."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "swimwear",
      "sunscreen",
      "temple-sarong",
      "flip-flops"
    ],
    "internationalInfo": {
      "visaRequirement": "e-VoA (electronic Visa on Arrival) available for 90+ countries. Valid for 30 days.",
      "passportValidity": "Must have at least 6 months validity.",
      "currency": "Indonesian Rupiah (IDR Rp)",
      "adapterType": "Type C and Type F (two round pins, 230V)",
      "emergencyNumber": "112 (General Emergency), 110 (Police)",
      "demoNotice": "Demo recommendations are being used. Verify requirements via the official Indonesian Directorate General of Immigration."
    },
    "coordinates": {
      "lat": -8.4095,
      "lng": 115.1889
    },
    "places": [
      {
        "id": "bali-uluwatu",
        "name": "Uluwatu Cliff Temple & Kecak Fire Dance",
        "category": "Culture",
        "rating": 4.9,
        "price": 150,
        "location": "Pecatu, South Kuta",
        "description": "Ancient sea temple perched on a 70-meter dramatic limestone cliff overlooking Indian Ocean surf, famed for hypnotic sunset Kecak chants.",
        "tags": [
          "Culture",
          "Sunset",
          "Performance"
        ],
        "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 19:00",
        "bestTimeToVisit": "Sunset Dance Show"
      },
      {
        "id": "bali-tegallalang",
        "name": "Tegallalang Rice Terraces & Giant Jungle Swing",
        "category": "Nature",
        "rating": 4.8,
        "price": 50,
        "location": "Ubud, Gianyar",
        "description": "Iconic emerald green tiered rice paddies utilizing the ancient Subak irrigation system, featuring soaring jungle swings.",
        "tags": [
          "Nature",
          "Adventure",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Morning Light"
      },
      {
        "id": "bali-tanah-lot",
        "name": "Tanah Lot Ocean Rock Temple at Sunset",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 60,
        "location": "Beraban, Tabanan",
        "description": "Ancient Hindu pilgrimage shrine perched atop an offshore wave-carved rock islet, accessible on foot only during low tide.",
        "tags": [
          "Sightseeing",
          "Culture",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 19:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "bali-monkey-forest",
        "name": "Sacred Monkey Forest Sanctuary Ubud",
        "category": "Nature",
        "rating": 4.6,
        "price": 80,
        "location": "Padangtegal, Ubud",
        "description": "Mystical moss-covered jungle sanctuary with sacred bathing temples and hundreds of free-roaming Balinese long-tailed macaques.",
        "tags": [
          "Nature",
          "Wildlife",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "bali-batur-trek",
        "name": "Mount Batur Sunrise Volcano Trek",
        "category": "Adventure",
        "rating": 4.8,
        "price": 650,
        "location": "Kintamani, Bangli",
        "description": "Early morning hike up an active 1,717m volcanic caldera to watch dawn break over Lake Batur while eating steam-cooked eggs.",
        "tags": [
          "Adventure",
          "Trek",
          "Sunrise"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "03:30 - 09:00 Trek",
        "bestTimeToVisit": "Dawn Sunrise"
      },
      {
        "id": "bali-seminyak-beach",
        "name": "Seminyak Beach Shacks & Sunset Loungers",
        "category": "Beach",
        "rating": 4.7,
        "price": 0,
        "location": "Seminyak, Badung",
        "description": "Golden sand beach with colorful beanbags, live acoustic guitarists, world-class beach clubs, and crashing surf breaks.",
        "tags": [
          "Beach",
          "Relaxed",
          "Nightlife"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunset & Evening"
      },
      {
        "id": "bali-jimbaran-seafood",
        "name": "Jimbaran Bay Candlelight Grilled Seafood",
        "category": "Food",
        "rating": 4.8,
        "price": 800,
        "location": "Jimbaran Beach",
        "description": "Fresh red snapper, king prawns, and calamari grilled over coconut husks with spicy sambal matah right on the wave edge.",
        "tags": [
          "Food",
          "Seafood",
          "Romantic"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "16:00 - 23:00",
        "bestTimeToVisit": "Sunset Dinner"
      },
      {
        "id": "bali-tirta-empul",
        "name": "Tirta Empul Holy Water Temple Purification",
        "category": "Culture",
        "rating": 4.8,
        "price": 50,
        "location": "Manukaya, Tampaksiring",
        "description": "10th-century water temple fed by natural springs where pilgrims undergo spiritual purification under 30 sacred stone spouts.",
        "tags": [
          "Culture",
          "Spiritual",
          "Heritage"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "bali-nusa-penida",
        "name": "Nusa Penida Kelingking 'T-Rex' Cliff Day Tour",
        "category": "Adventure",
        "rating": 4.9,
        "price": 900,
        "location": "Nusa Penida Island",
        "description": "Mind-blowing limestone headland shaped like a Tyrannosaurus Rex overlooking turquoise seas and secluded white sand beach.",
        "tags": [
          "Adventure",
          "Island",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Full Day Excursion",
        "bestTimeToVisit": "Day Tour"
      },
      {
        "id": "bali-ubud-art-market",
        "name": "Ubud Traditional Art Market & Batik Workshops",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Jalan Raya Ubud",
        "description": "Vibrant bazaar opposite the Royal Palace selling handwoven rattan bags, silk sarongs, wooden tiki statues, and paintings.",
        "tags": [
          "Shopping",
          "Culture",
          "Handicrafts"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "bali-campuhan-ridge",
        "name": "Campuhan Ridge Scenic Green Valley Walk",
        "category": "Nature",
        "rating": 4.7,
        "price": 0,
        "location": "Sayan, Ubud",
        "description": "Lush undulating ridge walk between the Sungai Cerik and Wos rivers with panoramic views of elephant grass hills and ravines.",
        "tags": [
          "Nature",
          "Trek",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 19:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "bali-tegenungan",
        "name": "Tegenungan Waterfall & Jungle River Club",
        "category": "Nature",
        "rating": 4.5,
        "price": 40,
        "location": "Kemenuh, Sukawati",
        "description": "Thundering lowland cascade surrounded by lush tropical greenery, natural wading pools, and cliffside lookouts.",
        "tags": [
          "Nature",
          "Waterfalls",
          "Swimming"
        ],
        "image": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:30 - 18:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "bali-besakih",
        "name": "Besakih Mother Temple on Mount Agung",
        "category": "History",
        "rating": 4.7,
        "price": 60,
        "location": "Besakih, Karangasem",
        "description": "Most sacred temple in Bali, a terraced complex of 23 separate temples clinging to the volcanic slope of Mount Agung.",
        "tags": [
          "History",
          "Culture",
          "Spiritual"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "bali-sanur-beach",
        "name": "Sanur Sunrise Boardwalk & Jukung Sailboats",
        "category": "Beach",
        "rating": 4.6,
        "price": 0,
        "location": "Sanur, Denpasar",
        "description": "Peaceful 5km seaside paved promenade with calm shallow waters, outrigger fishing canoes, and breezy morning breakfast cafes.",
        "tags": [
          "Beach",
          "Relaxed",
          "Sunrise"
        ],
        "image": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunrise"
      },
      {
        "id": "bali-potato-head",
        "name": "Potato Head Beach Club & Sustainable Design",
        "category": "Food",
        "rating": 4.8,
        "price": 700,
        "location": "Petitenget, Seminyak",
        "description": "Architectural masterpiece built from 50,000 antique teak shutters featuring an infinity pool bar, farm-to-table cuisine, and DJ beats.",
        "tags": [
          "Food",
          "Nightlife",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 02:00",
        "bestTimeToVisit": "Late Afternoon & Night"
      },
      {
        "id": "bali-tirta-gangga",
        "name": "Tirta Gangga Royal Water Palace & Giant Koi",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 50,
        "location": "Ababi, Karangasem",
        "description": "Former royal palace featuring stepped fountain pools, guardian demon stone statues, and stepping stones across lotus ponds.",
        "tags": [
          "Sightseeing",
          "Heritage",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 18:00",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Nasi Campur Bali (Mixed Rice Platter)",
        "category": "Local Platter",
        "price": "IDR 35,000 - 65,000",
        "rating": 4.8,
        "location": "Warung Babi Guling Ibu Oka"
      },
      {
        "name": "Satay Lilit (Minced Spiced Skewers)",
        "category": "Street Food",
        "price": "IDR 25,000 - 45,000",
        "rating": 4.7,
        "location": "Night Markets"
      },
      {
        "name": "Fresh Young Coconut & Smoothie Bowl",
        "category": "Cafe",
        "price": "IDR 40,000 - 75,000",
        "rating": 4.9,
        "location": "Ubud Organic Cafes"
      }
    ],
    "stays": [
      {
        "name": "Viceroy Bali Ubud",
        "type": "Luxury",
        "price": 26000,
        "rating": 4.9,
        "amenities": [
          "Valley Infinity Pool",
          "Private Helipad",
          "Spa"
        ]
      },
      {
        "name": "Alila Seminyak",
        "type": "Luxury",
        "price": 14000,
        "rating": 4.8,
        "amenities": [
          "Beachfront",
          "Sunsets",
          "Infinity Pools"
        ]
      },
      {
        "name": "Kuna Bali Hostel Ubud",
        "type": "Budget",
        "price": 1600,
        "rating": 4.7,
        "amenities": [
          "Boho Decor",
          "Pool",
          "Free Yoga Mats"
        ]
      }
    ]
  },
  {
    "id": "london",
    "name": "London",
    "country": "United Kingdom",
    "isInternational": true,
    "currency": "GBP",
    "currencySymbol": "£",
    "type": "heritage",
    "state": "Greater London",
    "tagline": "Royal Heritage, Big Ben, Red Buses & West End Theatre",
    "description": "Historic global capital spanning Roman heritage to royal palaces, world-class free museums, bustling West End theatres, and scenic Thames embankments.",
    "coverImage": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 12500,
    "foodRate": 3800,
    "transportRate": 1500,
    "weather": [
      {
        "month": 1,
        "tempC": 6,
        "condition": "Cold & Misty",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Chilly winter days; explore warm galleries of British Museum."
      },
      {
        "month": 2,
        "tempC": 7,
        "condition": "Cold",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Crisp mornings, cozy up in historic traditional pubs."
      },
      {
        "month": 3,
        "tempC": 11,
        "condition": "Mild",
        "humidity": 74,
        "icon": "Sun",
        "suggestion": "Daffodils bloom across Hyde Park and St. James's Park."
      },
      {
        "month": 4,
        "tempC": 14,
        "condition": "Spring",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Pleasant spring weather, ideal for Tower Bridge walks."
      },
      {
        "month": 5,
        "tempC": 18,
        "condition": "Pleasant",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Chelsea Flower Show and sunny picnics in Regent's Park."
      },
      {
        "month": 6,
        "tempC": 21,
        "condition": "Warm & Sunny",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Long daylight hours till 9:30 PM; open-air theatre."
      },
      {
        "month": 7,
        "tempC": 23,
        "condition": "Sunny",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Warm summer days; Buckingham Palace Summer Opening."
      },
      {
        "month": 8,
        "tempC": 23,
        "condition": "Warm",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Notting Hill Carnival brings vibrant Caribbean music."
      },
      {
        "month": 9,
        "tempC": 19,
        "condition": "Mild",
        "humidity": 70,
        "icon": "Sun",
        "suggestion": "Crisp autumn air, Thames path walks and museum exhibitions."
      },
      {
        "month": 10,
        "tempC": 14,
        "condition": "Cool & Crisp",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Golden autumn trees and London Film Festival."
      },
      {
        "month": 11,
        "tempC": 10,
        "condition": "Chilly",
        "humidity": 84,
        "icon": "CloudRain",
        "suggestion": "Winter Wonderland opens in Hyde Park."
      },
      {
        "month": 12,
        "tempC": 7,
        "condition": "Festive Chill",
        "humidity": 86,
        "icon": "CloudRain",
        "suggestion": "Spectacular Christmas lights on Oxford Street & Regent Street."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "umbrella",
      "walking-shoes",
      "warm-coat"
    ],
    "internationalInfo": {
      "visaRequirement": "UK Standard Visitor Visa required for non-visa exempt nationals. Apply online before travel.",
      "passportValidity": "Valid for the entire duration of your stay in the UK.",
      "currency": "British Pound Sterling (GBP £)",
      "adapterType": "Type G (three-pin UK standard, 230V)",
      "emergencyNumber": "999 or 112 (Police, Ambulance, Fire)",
      "demoNotice": "Demo recommendations are being used. Verify UK entry rules on the official gov.uk immigration portal."
    },
    "coordinates": {
      "lat": 51.5074,
      "lng": -0.1278
    },
    "places": [
      {
        "id": "ldn-tower",
        "name": "Tower of London & Crown Jewels Exhibition",
        "category": "History",
        "rating": 4.8,
        "price": 3300,
        "location": "Tower Hill, EC3N 4AB",
        "description": "Historic fortress and UNESCO palace guarded by Yeoman Warders (Beefeaters), housing the priceless British Crown Jewels and royal armory.",
        "tags": [
          "History",
          "Royalty",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ldn-big-ben",
        "name": "Big Ben & Palace of Westminster Riverside Walk",
        "category": "Sightseeing",
        "rating": 4.9,
        "price": 0,
        "location": "Westminster, SW1A 0AA",
        "description": "Neo-Gothic Victorian clock tower and parliament buildings along the Thames, stunning when viewed from Westminster Bridge.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours (External)",
        "bestTimeToVisit": "Sunset & Night Illumination"
      },
      {
        "id": "ldn-british-museum",
        "name": "British Museum & Great Court Glass Roof",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Great Russell St, Bloomsbury",
        "description": "World-class treasury of human history, art, and culture housing the Rosetta Stone, Parthenon Sculptures, and Egyptian mummies.",
        "tags": [
          "Culture",
          "History",
          "Free Entry"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00",
        "bestTimeToVisit": "Late Morning"
      },
      {
        "id": "ldn-london-eye",
        "name": "London Eye Thames Panoramic Flight",
        "category": "Sightseeing",
        "rating": 4.6,
        "price": 3500,
        "location": "Riverside Building, County Hall",
        "description": "135-meter cantilevered observation wheel giving breathtaking 360-degree vistas stretching up to 40km across London.",
        "tags": [
          "Sightseeing",
          "Panoramic",
          "Thames"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:00 - 18:00",
        "bestTimeToVisit": "Golden Hour"
      },
      {
        "id": "ldn-buckingham",
        "name": "Buckingham Palace Changing of the Guard",
        "category": "History",
        "rating": 4.6,
        "price": 0,
        "location": "Westminster, SW1A 1AA",
        "description": "Official administrative headquarters of the British monarch, famous for the King's Guard ceremonial changing ceremony and The Mall.",
        "tags": [
          "History",
          "Royalty",
          "Ceremony"
        ],
        "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:45 Ceremony (Select Days)",
        "bestTimeToVisit": "10:30 AM"
      },
      {
        "id": "ldn-borough-market",
        "name": "Borough Market Artisan Street Food & Cheeses",
        "category": "Food",
        "rating": 4.9,
        "price": 1200,
        "location": "8 Southwark St, SE1 1TL",
        "description": "London's oldest food market dating to 1014, packed with gourmet mushroom risottos, artisanal cheeses, oysters, and chocolate strawberries.",
        "tags": [
          "Food",
          "Street Eats",
          "Gourmet"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00 (Tue-Sun)",
        "bestTimeToVisit": "Lunch"
      },
      {
        "id": "ldn-westminster-abbey",
        "name": "Westminster Abbey Royal Chapels & Poets Corner",
        "category": "History",
        "rating": 4.8,
        "price": 2700,
        "location": "Dean's Yard, SW1P 3PA",
        "description": "Gothic church that has hosted 40 British coronations since 1066, royal weddings, and the tombs of monarchs and literary icons.",
        "tags": [
          "History",
          "Architecture",
          "Royalty"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 15:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ldn-covent-garden",
        "name": "Covent Garden Apple Market & Street Performers",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Covent Garden Piazza, WC2E 8RF",
        "description": "Pedestrianized Italianate piazza filled with world-class buskers, independent craft stalls, antique markets, and open-air cafes.",
        "tags": [
          "Culture",
          "Shopping",
          "Entertainment"
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 20:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "ldn-hyde-park",
        "name": "Hyde Park Serpentine Boating & Kensington Gardens",
        "category": "Nature",
        "rating": 4.7,
        "price": 0,
        "location": "Central London, W2 2UH",
        "description": "350-acre Royal Park with pedal boating on Serpentine Lake, Diana Memorial Fountain, and Kensington Palace grounds.",
        "tags": [
          "Nature",
          "Walks",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "05:00 - 00:00",
        "bestTimeToVisit": "Sunny Afternoon"
      },
      {
        "id": "ldn-sky-garden",
        "name": "Sky Garden 360 Observation Deck at 20 Fenchurch",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 0,
        "location": "1 Sky Garden Walk, EC3M 8AF",
        "description": "Enclosed glass dome on the 35th floor featuring landscaped sub-tropical public gardens, open-air terrace, and sweeping city views.",
        "tags": [
          "Sightseeing",
          "Panoramic",
          "Free Entry"
        ],
        "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 18:00 (Advance Booking)",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "ldn-afternoon-tea",
        "name": "Traditional English Afternoon Tea Experience",
        "category": "Food",
        "rating": 4.9,
        "price": 4500,
        "location": "Mayfair / Fortnum & Mason",
        "description": "Classic British tea service with warm scones, Cornish clotted cream, strawberry jam, finger sandwiches, and rare tea infusions.",
        "tags": [
          "Food",
          "Luxury",
          "Traditional"
        ],
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
        "openingHours": "13:00 - 17:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "ldn-tate-modern",
        "name": "Tate Modern & Turbine Hall Contemporary Art",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Bankside, SE1 9TG",
        "description": "Converted Bankside Power Station hosting cutting-edge modern art exhibitions by Picasso, Warhol, and Dalí with free rooftop views.",
        "tags": [
          "Culture",
          "Art",
          "Free Entry"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 18:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "ldn-camden-market",
        "name": "Camden Lock Market Vintage & Alternative Culture",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Camden Lock Place, NW1 8AF",
        "description": "Bohemian labyrinth of lock-side vintage clothes, music memorabilia, eccentric gothic fashion, and international food stalls.",
        "tags": [
          "Shopping",
          "Culture",
          "Nightlife"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 19:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "ldn-st-pauls",
        "name": "St Paul's Cathedral & Whispering Gallery Dome",
        "category": "History",
        "rating": 4.8,
        "price": 2300,
        "location": "St. Paul's Churchyard, EC4M 8AD",
        "description": "Sir Christopher Wren's 17th-century masterpiece with its recognizable dome, Whispering Gallery acoustics, and Golden Gallery panorama.",
        "tags": [
          "History",
          "Architecture",
          "Panoramic"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:30 - 16:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ldn-greenwich",
        "name": "Greenwich Royal Observatory & Prime Meridian",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 1800,
        "location": "Blackheath Ave, SE10 8XJ",
        "description": "Stand with one foot in the eastern hemisphere and one in the western across the historic Prime Meridian line (Longitude 0°).",
        "tags": [
          "Sightseeing",
          "Science",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "ldn-dishoom",
        "name": "Dishoom Bombay Cafe & House Black Daal",
        "category": "Food",
        "rating": 4.9,
        "price": 1600,
        "location": "Covent Garden / Shoreditch",
        "description": "Nostalgic Irani cafe homage famous for 24-hour slow-cooked creamy Black Daal, gunpowder potatoes, and ruby chicken curry.",
        "tags": [
          "Food",
          "Iconic",
          "Culinary"
        ],
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 23:00",
        "bestTimeToVisit": "Dinner"
      }
    ],
    "foods": [
      {
        "name": "Traditional Fish & Chips with Mushy Peas",
        "category": "Classic",
        "price": "£14 - £22",
        "rating": 4.8,
        "location": "Poppies Fish & Chips"
      },
      {
        "name": "Full English Breakfast",
        "category": "Breakfast",
        "price": "£11 - £18",
        "rating": 4.7,
        "location": "Regency Cafe"
      },
      {
        "name": "Royal Afternoon High Tea & Scones",
        "category": "Tea / Dessert",
        "price": "£35 - £65",
        "rating": 4.9,
        "location": "The Wolseley / Fortnum & Mason"
      }
    ],
    "stays": [
      {
        "name": "The Savoy London",
        "type": "Luxury",
        "price": 48000,
        "rating": 4.9,
        "amenities": [
          "Thames Views",
          "Butler Service",
          "Kaspar's"
        ]
      },
      {
        "name": "The Hoxton, Holborn",
        "type": "Mid-Range",
        "price": 14500,
        "rating": 4.6,
        "amenities": [
          "Chic Design",
          "Coffee Bar",
          "Covent Garden Near"
        ]
      },
      {
        "name": "Wombat's City Hostel London",
        "type": "Budget",
        "price": 3400,
        "rating": 4.4,
        "amenities": [
          "Wombar Lounge",
          "Ensuite Pods",
          "Near Tower Bridge"
        ]
      }
    ]
  },
  {
    "id": "tokyo",
    "name": "Tokyo",
    "country": "Japan",
    "isInternational": true,
    "currency": "JPY",
    "currencySymbol": "¥",
    "type": "metro",
    "state": "Kanto Region",
    "tagline": "Neon Metropolises, Ancient Shrines & Culinary Perfection",
    "description": "Electrifying collision of neon skyscrapers, peaceful Shinto shrines, Otaku pop culture, bullet trains, and world-leading Michelin dining.",
    "coverImage": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 10500,
    "foodRate": 2800,
    "transportRate": 1100,
    "weather": [
      {
        "month": 1,
        "tempC": 6,
        "condition": "Cold & Sunny",
        "humidity": 45,
        "icon": "Sun",
        "suggestion": "Clear crisp winter days with majestic views of Mount Fuji."
      },
      {
        "month": 2,
        "tempC": 8,
        "condition": "Crisp",
        "humidity": 48,
        "icon": "Sun",
        "suggestion": "Plum blossoms bloom at Yushima Tenjin shrine."
      },
      {
        "month": 3,
        "tempC": 13,
        "condition": "Mild",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Cherry blossom season begins in late March; hanami picnics."
      },
      {
        "month": 4,
        "tempC": 18,
        "condition": "Pleasant & Sakura",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Peak Sakura cherry blossoms across Ueno Park & Meguro River."
      },
      {
        "month": 5,
        "tempC": 22,
        "condition": "Sunny",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Terrific outdoor weather; Sanja Matsuri festival in Asakusa."
      },
      {
        "month": 6,
        "tempC": 25,
        "condition": "Rainy Season",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Tsuyu rainy season; blooming hydrangeas and indoor museums."
      },
      {
        "month": 7,
        "tempC": 29,
        "condition": "Hot & Humid",
        "humidity": 80,
        "icon": "Sun",
        "suggestion": "Sumida River fireworks festival and summer kakigori shaved ice."
      },
      {
        "month": 8,
        "tempC": 31,
        "condition": "Summer Heat",
        "humidity": 82,
        "icon": "Sun",
        "suggestion": "Stay hydrated; visit air-conditioned teamLab digital art."
      },
      {
        "month": 9,
        "tempC": 27,
        "condition": "Warm Showers",
        "humidity": 78,
        "icon": "CloudRain",
        "suggestion": "Pleasant late summer; autumn moon viewing festivals."
      },
      {
        "month": 10,
        "tempC": 21,
        "condition": "Pleasant",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Comfortable temperatures; Tokyo International Film Festival."
      },
      {
        "month": 11,
        "tempC": 15,
        "condition": "Crisp Autumn",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Golden ginkgo avenues at Meiji Jingu and maple foliage."
      },
      {
        "month": 12,
        "tempC": 9,
        "condition": "Chilly & Clear",
        "humidity": 50,
        "icon": "Sun",
        "suggestion": "Winter illuminations transform Roppongi and Shibuya."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "comfortable-walking-shoes",
      "slip-on-shoes-for-temples",
      "cash-for-transport"
    ],
    "internationalInfo": {
      "visaRequirement": "eVisa available for eligible passports or short-term tourist visa. Visit Japan Web QR code required.",
      "passportValidity": "Must be valid for period of stay.",
      "currency": "Japanese Yen (JPY ¥)",
      "adapterType": "Type A (two flat parallel prongs, 100V)",
      "emergencyNumber": "110 (Police), 119 (Ambulance/Fire)",
      "demoNotice": "Demo recommendations are being used. Register on the official Visit Japan Web portal prior to flight departure."
    },
    "coordinates": {
      "lat": 35.6762,
      "lng": 139.6503
    },
    "places": [
      {
        "id": "tky-sensoji",
        "name": "Sensō-ji Temple & Nakamise-dori Market",
        "category": "History",
        "rating": 4.8,
        "price": 0,
        "location": "Asakusa, Taito City",
        "description": "Tokyo's oldest and most sacred Buddhist temple founded in 645 AD, entered via the massive red Kaminarimon Thunder Gate.",
        "tags": [
          "History",
          "Culture",
          "Shopping"
        ],
        "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 17:00 (Grounds 24 hours)",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "tky-shibuya-crossing",
        "name": "Shibuya Scramble Crossing & Hachiko Memorial",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 0,
        "location": "Shibuya City",
        "description": "World's busiest pedestrian scramble crossing where up to 3,000 people cross simultaneously with every green light.",
        "tags": [
          "Sightseeing",
          "Photography",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Evening (Neon Lights)"
      },
      {
        "id": "tky-meiji-shrine",
        "name": "Meiji Jingu Shrine & Yoyogi Evergreen Forest",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Shibuya, near Harajuku",
        "description": "Monumental wooden Shinto torii gate leading into a peaceful 170-acre sacred forest of 120,000 donated evergreen trees.",
        "tags": [
          "Culture",
          "Nature",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Sunrise to Sunset",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "tky-shinjuku-gyoen",
        "name": "Shinjuku Gyoen National Garden & Tea House",
        "category": "Nature",
        "rating": 4.8,
        "price": 300,
        "location": "Shinjuku City",
        "description": "144-acre imperial park blending traditional Japanese landscape gardens, English lawns, and French formal flower beds.",
        "tags": [
          "Nature",
          "Relaxed",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:30 (Closed Mondays)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "tky-teamlab",
        "name": "teamLab Planets Immersive Digital Art Museum",
        "category": "Culture",
        "rating": 4.9,
        "price": 2200,
        "location": "Toyosu, Koto City",
        "description": "Museum where visitors walk barefoot through water, moving digital koi fish ponds, and infinitely sparkling crystal rooms.",
        "tags": [
          "Culture",
          "Photography",
          "Sightseeing"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 22:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "tky-tsukiji-outer",
        "name": "Tsukiji Outer Fish Market Fresh Sushi Trail",
        "category": "Food",
        "rating": 4.9,
        "price": 1200,
        "location": "Tsukiji, Chuo City",
        "description": "Vibrant culinary lanes with legacy fishmongers slicing fresh bluefin tuna, tamagoyaki omelettes, and sea urchin donburi.",
        "tags": [
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 14:00",
        "bestTimeToVisit": "Early Morning Breakfast"
      },
      {
        "id": "tky-akihabara",
        "name": "Akihabara Electric Town & Anime/Manga District",
        "category": "Shopping",
        "rating": 4.7,
        "price": 0,
        "location": "Soto-Kanda, Chiyoda",
        "description": "Global Mecca for otaku anime culture, multi-level electronics superstores, retro video game arcades, and themed cafes.",
        "tags": [
          "Shopping",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 21:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "tky-skytree",
        "name": "Tokyo Skytree & Solamachi Observation Deck",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 1900,
        "location": "Oshiage, Sumida City",
        "description": "Tallest tower in the world at 634 meters, offering panoramic vistas across the Kanto plain and Mount Fuji on clear days.",
        "tags": [
          "Sightseeing",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 21:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "tky-harajuku",
        "name": "Takeshita Street Fashion & Cat Street Cafes",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Jingumae, Shibuya",
        "description": "Epicenter of Japan's extreme teenage fashion culture, giant rainbow cotton candy, boutique streetwear, and trendy cafes.",
        "tags": [
          "Shopping",
          "Food",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:30 - 20:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "tky-ueno-park",
        "name": "Ueno Park, Tokyo National Museum & Shinobazu Pond",
        "category": "Culture",
        "rating": 4.7,
        "price": 600,
        "location": "Ueno, Taito City",
        "description": "Sprawling cultural park housing Japan's premier antiquities museum, giant panda zoo, and lotus-filled Shinobazu pond.",
        "tags": [
          "Culture",
          "Nature",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "05:00 - 23:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "tky-odaiba",
        "name": "Odaiba Seaside Park, Rainbow Bridge & Gundam Base",
        "category": "Relaxed",
        "rating": 4.7,
        "price": 0,
        "location": "Daiba, Minato City",
        "description": "Futuristic man-made bay island with a miniature Statue of Liberty, giant life-sized Unicorn Gundam robot, and sunset beach.",
        "tags": [
          "Relaxed",
          "Sightseeing",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "openingHours": "Open 24 hours",
        "bestTimeToVisit": "Sunset & Night"
      },
      {
        "id": "tky-roppongi-hills",
        "name": "Roppongi Hills Mori Art Museum & Tokyo City View",
        "category": "Photography",
        "rating": 4.8,
        "price": 1400,
        "location": "Roppongi, Minato City",
        "description": "Sky deck on the 52nd floor delivering dramatic 360-degree aerial views centered on the illuminated red Tokyo Tower.",
        "tags": [
          "Photography",
          "Sightseeing",
          "Culture"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 22:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "tky-ginza-boulevard",
        "name": "Ginza Luxury Shopping Promenade & Kabukiza Theatre",
        "category": "Shopping",
        "rating": 4.7,
        "price": 0,
        "location": "Ginza, Chuo City",
        "description": "Tokyo's most prestigious fashion and dining boulevard with historic department stores and classical Kabuki stage shows.",
        "tags": [
          "Shopping",
          "Culture",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:00 - 20:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "tky-yanaka-ginza",
        "name": "Yanaka Old Town Nostalgic Retro Walk",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Yanaka, Taito City",
        "description": "One of the few remaining districts preserved from pre-war Tokyo, featuring wooden shop houses, cats, and traditional street snacks.",
        "tags": [
          "Culture",
          "Food",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 18:00",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Rich Tonkotsu / Shoyu Ramen",
        "category": "Noodles",
        "price": "¥ 900 - 1,400",
        "rating": 4.9,
        "location": "Ichiran Shibuya / Afuri"
      },
      {
        "name": "Fresh Nigiri Sushi Platter",
        "category": "Seafood",
        "price": "¥ 2,200 - 4,500",
        "rating": 4.9,
        "location": "Tsukiji Outer Market"
      },
      {
        "name": "Crispy Takoyaki Octopus Balls",
        "category": "Street Food",
        "price": "¥ 600 - 900",
        "rating": 4.7,
        "location": "Gindaco Shibuya"
      }
    ],
    "stays": [
      {
        "name": "Park Hyatt Tokyo",
        "type": "Luxury",
        "price": 39000,
        "rating": 4.9,
        "amenities": [
          "Shinjuku Views",
          "Peak Bar",
          "Spa & Pool"
        ]
      },
      {
        "name": "Hotel Gracery Shinjuku",
        "type": "Mid-Range",
        "price": 9200,
        "rating": 4.6,
        "amenities": [
          "Godzilla Head Terrace",
          "Central Shinjuku",
          "Clean"
        ]
      },
      {
        "name": "Book And Bed Tokyo",
        "type": "Budget",
        "price": 2800,
        "rating": 4.3,
        "amenities": [
          "Sleep Inside Bookshelves",
          "Cosy Pods",
          "Cafe"
        ]
      }
    ]
  },
  {
    "id": "new-york",
    "name": "New York",
    "country": "United States",
    "isInternational": true,
    "currency": "USD",
    "currencySymbol": "$",
    "type": "metro",
    "state": "New York State",
    "tagline": "The Big Apple, Broadway Lights, Central Park & Skylines",
    "description": "The city that never sleeps, powered by legendary Broadway shows, soaring Empire State views, Central Park greenery, and cosmopolitan dining.",
    "coverImage": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 16500,
    "foodRate": 4200,
    "transportRate": 1400,
    "weather": [
      {
        "month": 1,
        "tempC": 2,
        "condition": "Freezing Cold",
        "humidity": 65,
        "icon": "CloudRain",
        "suggestion": "Cold winter; ice skating at Rockefeller Center and Central Park."
      },
      {
        "month": 2,
        "tempC": 4,
        "condition": "Cold & Snow",
        "humidity": 62,
        "icon": "CloudRain",
        "suggestion": "Winter clearance shopping and Broadway week ticket discounts."
      },
      {
        "month": 3,
        "tempC": 9,
        "condition": "Crisp",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "St. Patrick's Day parade along Fifth Avenue."
      },
      {
        "month": 4,
        "tempC": 15,
        "condition": "Pleasant Spring",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Cherry blossoms bloom in Central Park and Brooklyn Botanic Garden."
      },
      {
        "month": 5,
        "tempC": 21,
        "condition": "Warm & Sunny",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Wonderful walking weather; High Line park and rooftop dining."
      },
      {
        "month": 6,
        "tempC": 26,
        "condition": "Warm",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Outdoor summer concerts and Shakespeare in the Park."
      },
      {
        "month": 7,
        "tempC": 29,
        "condition": "Hot & Sunny",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Fourth of July fireworks over the East River."
      },
      {
        "month": 8,
        "tempC": 28,
        "condition": "Hot",
        "humidity": 66,
        "icon": "Sun",
        "suggestion": "US Open Tennis tournament and Coney Island beach boardwalk."
      },
      {
        "month": 9,
        "tempC": 24,
        "condition": "Pleasant",
        "humidity": 64,
        "icon": "Sun",
        "suggestion": "Ideal early autumn weather; Brooklyn Bridge sunset strolls."
      },
      {
        "month": 10,
        "tempC": 17,
        "condition": "Crisp Autumn",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Stunning fall foliage in Central Park and Halloween parade."
      },
      {
        "month": 11,
        "tempC": 11,
        "condition": "Chilly",
        "humidity": 65,
        "icon": "Sun",
        "suggestion": "Macy's Thanksgiving Day Parade and early holiday window displays."
      },
      {
        "month": 12,
        "tempC": 5,
        "condition": "Cold & Festive",
        "humidity": 68,
        "icon": "CloudRain",
        "suggestion": "Giant Rockefeller Center Christmas tree and Times Square NYE."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "comfortable-walking-shoes",
      "warm-coat-for-winter",
      "metrocard"
    ],
    "internationalInfo": {
      "visaRequirement": "ESTA (Visa Waiver Program) for eligible countries, or B1/B2 Tourist Visa. Apply well in advance.",
      "passportValidity": "Must have at least 6 months validity beyond intended stay.",
      "currency": "US Dollar (USD $)",
      "adapterType": "Type A and Type B (two/three prong, 120V)",
      "emergencyNumber": "911 (Police, Fire, Ambulance)",
      "demoNotice": "Demo recommendations are being used. Verify US official entry requirements via official travel.state.gov portal."
    },
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.006
    },
    "places": [
      {
        "id": "nyc-liberty",
        "name": "Statue of Liberty & Ellis Island Ferry Tour",
        "category": "History",
        "rating": 4.8,
        "price": 2400,
        "location": "New York Harbor / Battery Park",
        "description": "Iconic copper colossal statue gifted by France in 1886, paired with immigration museum walkthroughs on historic Ellis Island.",
        "tags": [
          "History",
          "Iconic",
          "Boating"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 16:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "nyc-central-park",
        "name": "Central Park Bow Bridge & Bethesda Terrace",
        "category": "Nature",
        "rating": 4.9,
        "price": 0,
        "location": "59th to 110th St, Manhattan",
        "description": "843-acre urban masterpiece designed by Olmsted, featuring rowboats on the Lake, Strawberry Fields John Lennon memorial, and Ramble trails.",
        "tags": [
          "Nature",
          "Iconic",
          "Walks"
        ],
        "image": "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:00 - 01:00",
        "bestTimeToVisit": "Sunny Afternoon"
      },
      {
        "id": "nyc-empire-state",
        "name": "Empire State Building 86th Floor Open Deck",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 4400,
        "location": "20 W 34th St, Midtown",
        "description": "Legendary 102-story Art Deco skyscraper with open-air 360-degree observation deck offering dizzying perspectives over Manhattan.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Panoramic"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 00:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "nyc-met-museum",
        "name": "Metropolitan Museum of Art (The Met) 5th Ave",
        "category": "Culture",
        "rating": 4.9,
        "price": 2800,
        "location": "1000 Fifth Avenue, Upper East Side",
        "description": "One of the world's greatest museums housing over two million works including Egyptian Temple of Dendur and European masterpieces.",
        "tags": [
          "Culture",
          "Art",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:00",
        "bestTimeToVisit": "Late Morning"
      },
      {
        "id": "nyc-times-square",
        "name": "Times Square Neon Spectacular & Broadway",
        "category": "Sightseeing",
        "rating": 4.6,
        "price": 0,
        "location": "Broadway & 7th Ave, Midtown",
        "description": "The 'Crossroads of the World' blazing with towering digital LED billboards, street buskers, red stairs, and world-famous Broadway theaters.",
        "tags": [
          "Sightseeing",
          "Nightlife",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Night"
      },
      {
        "id": "nyc-brooklyn-bridge",
        "name": "Brooklyn Bridge Iconic Sunset Walkway",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 0,
        "location": "East River Crossing",
        "description": "Pioneering 1883 hybrid cable-stayed suspension bridge with elevated pedestrian wooden promenade and skyline vistas.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunset to Dusk"
      },
      {
        "id": "nyc-highline",
        "name": "The High Line Elevated Rail Park & Chelsea Market",
        "category": "Nature",
        "rating": 4.8,
        "price": 0,
        "location": "Gansevoort St to 34th St",
        "description": "1.45-mile public park built on a historic elevated freight rail line above the streets on Manhattan's West Side, adjacent to artisan food hall.",
        "tags": [
          "Nature",
          "Food",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 22:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "nyc-911-memorial",
        "name": "9/11 Memorial Pools & One World Observatory",
        "category": "History",
        "rating": 4.9,
        "price": 3600,
        "location": "180 Greenwich St, Financial District",
        "description": "Reflecting absence waterfall pools in the footprints of the Twin Towers and the 102nd-floor observation deck of Freedom Tower.",
        "tags": [
          "History",
          "Panoramic",
          "Emotional"
        ],
        "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 20:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "nyc-grand-central",
        "name": "Grand Central Terminal & Whispering Gallery",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "89 E 42nd St, Midtown",
        "description": "Beaux-Arts transportation cathedral featuring celestial ceiling constellations, four-sided opal clock, and acoustic whispering arches.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "History"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "05:15 - 02:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "nyc-joes-pizza",
        "name": "Joe's Pizza Greenwich Village Classic Slice",
        "category": "Food",
        "rating": 4.9,
        "price": 450,
        "location": "7 Carmine St, Greenwich Village",
        "description": "Quintessential New York thin-crust fold-over pizza slice topped with sweet tomato sauce and gooey melted mozzarella since 1975.",
        "tags": [
          "Food",
          "Iconic",
          "Street Eats"
        ],
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 04:00",
        "bestTimeToVisit": "Lunch & Late Night"
      },
      {
        "id": "nyc-greenwich-jazz",
        "name": "Greenwich Village Brownstones & Blue Note Jazz",
        "category": "Culture",
        "rating": 4.8,
        "price": 1800,
        "location": "Greenwich Village, W 3rd St",
        "description": "Historic tree-lined bohemian neighborhood famous for Washington Square Park arch and intimate live jazz performances at Blue Note.",
        "tags": [
          "Culture",
          "Nightlife",
          "Music"
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "18:00 - 01:00",
        "bestTimeToVisit": "Evening Jazz"
      },
      {
        "id": "nyc-summit-vanderbilt",
        "name": "SUMMIT One Vanderbilt Mirror Immersion Deck",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 4200,
        "location": "45 E 42nd St",
        "description": "Multi-sensory observation experience 1,200 feet high with infinite mirrored reflection rooms and glass sky boxes cantilevered over Madison Ave.",
        "tags": [
          "Sightseeing",
          "Modern",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 00:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "nyc-soho-shops",
        "name": "SoHo Cast-Iron Architecture & Boutiques",
        "category": "Shopping",
        "rating": 4.7,
        "price": 0,
        "location": "Broadway, Prince & Spring St",
        "description": "Belgian cobblestone streets lined with the world's largest concentration of ornate cast-iron buildings and luxury fashion boutiques.",
        "tags": [
          "Shopping",
          "Architecture",
          "Fashion"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "11:00 - 20:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "nyc-natural-history",
        "name": "American Museum of Natural History (AMNH)",
        "category": "Culture",
        "rating": 4.8,
        "price": 2500,
        "location": "200 Central Park West",
        "description": "Immense halls featuring towering T-Rex fossil skeletons, the 94-foot blue whale model, and Hayden Planetarium space shows.",
        "tags": [
          "Culture",
          "Science",
          "Family"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 17:30",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "nyc-katz-delicatessen",
        "name": "Katz's Delicatessen Legendary Pastrami on Rye",
        "category": "Food",
        "rating": 4.8,
        "price": 2400,
        "location": "205 E Houston St, Lower East Side",
        "description": "No-frills Jewish deli carving thick-cut, house-cured pastrami and corned beef sandwiches with mustard and kosher dill pickles since 1888.",
        "tags": [
          "Food",
          "Iconic",
          "Culinary"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 23:00",
        "bestTimeToVisit": "Lunch"
      },
      {
        "id": "nyc-staten-ferry",
        "name": "Staten Island Ferry Manhattan Skyline Cruise",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Whitehall Terminal, Battery Park",
        "description": "Free 25-minute commuter boat ride across New York Harbor offering sensational panoramas of Lower Manhattan skyscrapers and Lady Liberty.",
        "tags": [
          "Sightseeing",
          "Free Entry",
          "Boating"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunset"
      }
    ],
    "foods": [
      {
        "name": "New York Classic Pepperoni Slice",
        "category": "Pizza",
        "price": "$4 - $7",
        "rating": 4.9,
        "location": "Joe's Pizza Greenwich Village"
      },
      {
        "name": "Hot Pastrami on Rye Sandwich",
        "category": "Deli",
        "price": "$24 - $32",
        "rating": 4.9,
        "location": "Katz's Delicatessen"
      },
      {
        "name": "Toasted Everything Bagel with Lox & Cream Cheese",
        "category": "Breakfast",
        "price": "$12 - $18",
        "rating": 4.8,
        "location": "Russ & Daughters"
      }
    ],
    "stays": [
      {
        "name": "The Plaza Hotel New York",
        "type": "Luxury",
        "price": 54000,
        "rating": 4.9,
        "amenities": [
          "Central Park South",
          "Palm Court",
          "Guerlain Spa"
        ]
      },
      {
        "name": "Arlo Midtown",
        "type": "Mid-Range",
        "price": 16500,
        "rating": 4.6,
        "amenities": [
          "Rooftop Lounge",
          "Near Times Square",
          "Modern Design"
        ]
      },
      {
        "name": "HI NYC Hostel",
        "type": "Budget",
        "price": 4200,
        "rating": 4.3,
        "amenities": [
          "Upper West Side",
          "Huge Garden",
          "Free Tours"
        ]
      }
    ]
  },
  {
    "id": "rome",
    "name": "Rome",
    "country": "Italy",
    "isInternational": true,
    "currency": "EUR",
    "currencySymbol": "€",
    "type": "heritage",
    "state": "Lazio Region",
    "tagline": "The Eternal City, Colosseum Glories & Vatican Marvels",
    "description": "An open-air living museum spanning 28 centuries of Western civilization, home to the Colosseum, Roman Forum, Trevi Fountain, and Vatican City.",
    "coverImage": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 11000,
    "foodRate": 3200,
    "transportRate": 1400,
    "weather": [
      {
        "month": 1,
        "tempC": 8,
        "condition": "Cool & Crisp",
        "humidity": 75,
        "icon": "Sun",
        "suggestion": "Crisp winter weather, minimal queues at Vatican and Colosseum."
      },
      {
        "month": 2,
        "tempC": 10,
        "condition": "Pleasant Chill",
        "humidity": 72,
        "icon": "Sun",
        "suggestion": "Pleasant sightseeing in afternoon sun; enjoy warm espresso."
      },
      {
        "month": 3,
        "tempC": 14,
        "condition": "Spring",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Spring awakening, blossoming bougainvillea in Trastevere."
      },
      {
        "month": 4,
        "tempC": 18,
        "condition": "Warm & Sunny",
        "humidity": 62,
        "icon": "Sun",
        "suggestion": "Rome Birthday celebrations (April 21) with historical parades."
      },
      {
        "month": 5,
        "tempC": 23,
        "condition": "Sunny",
        "humidity": 58,
        "icon": "Sun",
        "suggestion": "Glorious weather for outdoor piazzas and gelato walks."
      },
      {
        "month": 6,
        "tempC": 27,
        "condition": "Warm & Clear",
        "humidity": 55,
        "icon": "Sun",
        "suggestion": "Long sunny days; dine al fresco under vine-covered pergolas."
      },
      {
        "month": 7,
        "tempC": 31,
        "condition": "Hot & Sunny",
        "humidity": 50,
        "icon": "Sun",
        "suggestion": "Summer heat; carry water bottles (fill at historic nasone fountains)."
      },
      {
        "month": 8,
        "tempC": 31,
        "condition": "Hot",
        "humidity": 52,
        "icon": "Sun",
        "suggestion": "Ferragosto month; enjoy evening concerts at Castel Sant'Angelo."
      },
      {
        "month": 9,
        "tempC": 26,
        "condition": "Pleasant",
        "humidity": 60,
        "icon": "Sun",
        "suggestion": "Best autumn month; warm afternoons and gentle evening breezes."
      },
      {
        "month": 10,
        "tempC": 21,
        "condition": "Mild",
        "humidity": 68,
        "icon": "Sun",
        "suggestion": "Pleasant temperatures for Roman Forum and Palatine Hill hikes."
      },
      {
        "month": 11,
        "tempC": 15,
        "condition": "Cool Showers",
        "humidity": 75,
        "icon": "CloudRain",
        "suggestion": "Pack light jackets and umbrellas for museum afternoons."
      },
      {
        "month": 12,
        "tempC": 10,
        "condition": "Chilly & Festive",
        "humidity": 78,
        "icon": "Sun",
        "suggestion": "Christmas Nativity scenes in Piazza Navona and Vatican square."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "comfortable-walking-shoes",
      "modest-attire-for-churches",
      "sunglasses"
    ],
    "internationalInfo": {
      "visaRequirement": "Schengen Visa required for non-EU travelers. Apply at least 4-6 weeks before trip.",
      "passportValidity": "Must have at least 3 months validity beyond planned departure from Schengen area.",
      "currency": "Euro (EUR €)",
      "adapterType": "Type C, F, and L (European standard, 230V)",
      "emergencyNumber": "112 (Universal European Emergency Number)",
      "demoNotice": "Demo recommendations are being used. Verify official Italian Schengen regulations with the official embassy."
    },
    "coordinates": {
      "lat": 41.9028,
      "lng": 12.4964
    },
    "places": [
      {
        "id": "rom-colosseum",
        "name": "Colosseum Arena Floor & Underground Chambers",
        "category": "History",
        "rating": 4.9,
        "price": 2200,
        "location": "Piazza del Colosseo, 1",
        "description": "Flavian Amphitheatre completed in 80 AD, where 50,000 spectators once witnessed gladiator battles and wild animal spectacles.",
        "tags": [
          "History",
          "Architecture",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 16:30",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "rom-vatican",
        "name": "Vatican Museums & Sistine Chapel Frescoes",
        "category": "Culture",
        "rating": 4.9,
        "price": 2800,
        "location": "Viale Vaticano, 00165",
        "description": "Papal palace galleries culminating in Michelangelo's breathtaking ceiling and The Last Judgment in the Sistine Chapel.",
        "tags": [
          "Culture",
          "Art",
          "Royalty"
        ],
        "image": "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "rom-pantheon",
        "name": "Pantheon Ancient Roman Dome & Oculus",
        "category": "History",
        "rating": 4.8,
        "price": 500,
        "location": "Piazza della Rotonda",
        "description": "Best-preserved Roman monument featuring the world's largest unreinforced concrete dome with an open central sunlit oculus.",
        "tags": [
          "History",
          "Architecture",
          "Spiritual"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 19:00",
        "bestTimeToVisit": "Midday (Sun Beam)"
      },
      {
        "id": "rom-trevi",
        "name": "Trevi Fountain Coin Toss & Baroque Splendor",
        "category": "Sightseeing",
        "rating": 4.8,
        "price": 0,
        "location": "Piazza di Trevi",
        "description": "Monumental Baroque fountain depicting Oceanus; tradition dictates tossing a coin with your right hand over left shoulder to guarantee return to Rome.",
        "tags": [
          "Sightseeing",
          "Art",
          "Night View"
        ],
        "image": "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Late Night or Sunrise"
      },
      {
        "id": "rom-forum",
        "name": "Roman Forum & Palatine Hill Imperial Palaces",
        "category": "History",
        "rating": 4.8,
        "price": 1800,
        "location": "Via della Salara Vecchia",
        "description": "The beating civic, legal, and political heart of the ancient Roman Empire, surrounded by triumphal arches and temples.",
        "tags": [
          "History",
          "Archaeology",
          "Walks"
        ],
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 17:00",
        "bestTimeToVisit": "Late Afternoon"
      },
      {
        "id": "rom-piazza-navona",
        "name": "Piazza Navona Bernini Fountains & Open Artists",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Piazza Navona",
        "description": "Elegant elliptical square built on Stadium of Domitian, featuring Bernini's Fontana dei Quattro Fiumi and Baroque church Sant'Agnese.",
        "tags": [
          "Culture",
          "Art",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "rom-spanish-steps",
        "name": "Spanish Steps & Trinità dei Monti Vista",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Piazza di Spagna",
        "description": "Monumental 135-step stairway connecting Piazza di Spagna with Trinità dei Monti church and Keats-Shelley House.",
        "tags": [
          "Sightseeing",
          "Photography",
          "Historic"
        ],
        "image": "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "rom-trastevere-dinner",
        "name": "Trastevere Alleys & Authentic Roman Trattoria",
        "category": "Food",
        "rating": 4.9,
        "price": 1500,
        "location": "Trastevere Quarter",
        "description": "Atmospheric ivy-draped cobblestone alleys serving piping hot Cacio e Pepe, crispy Carbonara, and carafes of Castelli Romani wine.",
        "tags": [
          "Food",
          "Nightlife",
          "Authentic"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "19:00 - 00:00",
        "bestTimeToVisit": "Dinner"
      },
      {
        "id": "rom-campo-fiori",
        "name": "Campo de' Fiori Morning Farmers Market",
        "category": "Food",
        "rating": 4.6,
        "price": 0,
        "location": "Piazza Campo de' Fiori",
        "description": "Vibrant medieval square hosting bustling morning stalls with sun-ripened tomatoes, Sicilian olive oils, aged balsamic, and warm pizza bianca.",
        "tags": [
          "Food",
          "Shopping",
          "Local Culture"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 14:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "rom-borghese",
        "name": "Borghese Gallery & Villa Borghese Gardens",
        "category": "Culture",
        "rating": 4.9,
        "price": 2100,
        "location": "Piazzale Scipione Borghese, 5",
        "description": "Opulent villa museum displaying breathtaking Bernini marble sculptures (Apollo and Daphne) and Caravaggio oil paintings.",
        "tags": [
          "Culture",
          "Art",
          "Gardens"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 19:00 (Advance Booking)",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "rom-castel-santangelo",
        "name": "Castel Sant'Angelo Fortress & Tiber River View",
        "category": "History",
        "rating": 4.7,
        "price": 1400,
        "location": "Lungotevere Castello, 50",
        "description": "Emperor Hadrian's cylindrical mausoleum later converted into a papal fortress with fortified escape corridors to the Vatican.",
        "tags": [
          "History",
          "Architecture",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 19:30",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "rom-giolitti",
        "name": "Giolitti Historic Artisanal Gelateria",
        "category": "Food",
        "rating": 4.9,
        "price": 350,
        "location": "Via Uffici del Vicario, 40",
        "description": "Rome's most storied ice cream salon established in 1890, celebrated for pistachio di Bronte, dark chocolate, and panna fresca.",
        "tags": [
          "Food",
          "Dessert",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:30 - 01:00",
        "bestTimeToVisit": "Afternoon & Night"
      },
      {
        "id": "rom-appian-way",
        "name": "Appian Way Ancient Roman Cobblestone Hike",
        "category": "Adventure",
        "rating": 4.7,
        "price": 0,
        "location": "Via Appia Antica",
        "description": "Walk or cycle along the 'Queen of Long Roads' on original 2,300-year-old basalt flagstones flanked by ancient pines and catacombs.",
        "tags": [
          "Adventure",
          "History",
          "Nature"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Morning Bike Ride"
      },
      {
        "id": "rom-altare-patria",
        "name": "Altare della Patria Victor Emmanuel Monument",
        "category": "Sightseeing",
        "rating": 4.6,
        "price": 0,
        "location": "Piazza Venezia",
        "description": "Colossal white Brescian marble monument dedicated to unified Italy's first king, featuring glass elevators to Rome's highest roof panorama.",
        "tags": [
          "Sightseeing",
          "History",
          "Panoramic"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 19:30",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "rom-janiculum",
        "name": "Janiculum Hill Noon Cannon & Skyline Vista",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 0,
        "location": "Gianicolo, Trastevere",
        "description": "Promontory above western Rome offering arguably the finest sunset perspective over all the domes and campaniles in the eternal city.",
        "tags": [
          "Sightseeing",
          "Sunset",
          "Romantic"
        ],
        "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "rom-terme-caracalla",
        "name": "Baths of Caracalla Ancient Imperial Spa Ruins",
        "category": "History",
        "rating": 4.7,
        "price": 800,
        "location": "Viale delle Terme di Caracalla, 52",
        "description": "Vast remains of second-century Roman public bathhouses that once accommodated 1,600 bathers with Olympic swimming pools.",
        "tags": [
          "History",
          "Architecture",
          "Archaeology"
        ],
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 16:30",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Creamy Spaghetti Carbonara",
        "category": "Pasta",
        "price": "€11 - €16",
        "rating": 4.9,
        "location": "Trattoria Da Enzo al 29"
      },
      {
        "name": "Crispy Roman Thin-Crust Pizza",
        "category": "Pizza",
        "price": "€8 - €14",
        "rating": 4.8,
        "location": "Pizzeria da Baffetto"
      },
      {
        "name": "Artisanal Pistachio & Stracciatella Gelato",
        "category": "Dessert",
        "price": "€3.50 - €6",
        "rating": 4.9,
        "location": "Giolitti / Frigidarium"
      }
    ],
    "stays": [
      {
        "name": "Hotel de Russie",
        "type": "Luxury",
        "price": 36000,
        "rating": 4.9,
        "amenities": [
          "Secret Terraced Gardens",
          "Piazza del Popolo",
          "Spa"
        ]
      },
      {
        "name": "iQ Hotel Roma",
        "type": "Mid-Range",
        "price": 9200,
        "rating": 4.7,
        "amenities": [
          "Rooftop Cocktail Bar",
          "Near Termini",
          "Free Wi-Fi"
        ]
      },
      {
        "name": "The RomeHello Hostel",
        "type": "Budget",
        "price": 2900,
        "rating": 4.6,
        "amenities": [
          "Street Art Interiors",
          "Garden Courtyard",
          "Events"
        ]
      }
    ]
  },
  {
    "id": "kuala-lumpur",
    "name": "Kuala Lumpur",
    "country": "Malaysia",
    "isInternational": true,
    "currency": "MYR",
    "currencySymbol": "RM",
    "type": "metro",
    "state": "Federal Territory of Kuala Lumpur",
    "tagline": "Petronas Twin Towers, Limestone Shrines & Hawker Feasts",
    "description": "A multicultural metropolis where glittering modern skyscrapers rise above colonial minarets, lush rainforests, and centuries-old Hindu cave shrines.",
    "coverImage": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    "hotelRate": 4600,
    "foodRate": 1200,
    "transportRate": 900,
    "weather": [
      {
        "month": 1,
        "tempC": 28,
        "condition": "Warm & Tropical",
        "humidity": 80,
        "icon": "Sun",
        "suggestion": "Thaipusam festival brings spectacular celebrations to Batu Caves."
      },
      {
        "month": 2,
        "tempC": 29,
        "condition": "Sunny",
        "humidity": 76,
        "icon": "Sun",
        "suggestion": "Chinese New Year illuminations across Thean Hou Temple."
      },
      {
        "month": 3,
        "tempC": 30,
        "condition": "Warm",
        "humidity": 78,
        "icon": "Sun",
        "suggestion": "Great city sightseeing and shopping at Pavilion KL."
      },
      {
        "month": 4,
        "tempC": 30,
        "condition": "Tropical Showers",
        "humidity": 82,
        "icon": "CloudRain",
        "suggestion": "Short afternoon downpours; explore Aquaria KLCC."
      },
      {
        "month": 5,
        "tempC": 30,
        "condition": "Warm",
        "humidity": 81,
        "icon": "Sun",
        "suggestion": "Evening dining along Jalan Alor food street."
      },
      {
        "month": 6,
        "tempC": 29,
        "condition": "Pleasant",
        "humidity": 78,
        "icon": "Sun",
        "suggestion": "Drier month; wonderful views from Petronas skybridge."
      },
      {
        "month": 7,
        "tempC": 29,
        "condition": "Tropical",
        "humidity": 77,
        "icon": "Sun",
        "suggestion": "Great month for day trips to Genting and Cameron Highlands."
      },
      {
        "month": 8,
        "tempC": 29,
        "condition": "Warm",
        "humidity": 79,
        "icon": "Sun",
        "suggestion": "Merdeka Independence Day celebrations across Dataran Merdeka."
      },
      {
        "month": 9,
        "tempC": 28,
        "condition": "Showers",
        "humidity": 80,
        "icon": "CloudRain",
        "suggestion": "Rainforest canopy walks at KL Forest Eco Park."
      },
      {
        "month": 10,
        "tempC": 28,
        "condition": "Tropical Rain",
        "humidity": 83,
        "icon": "CloudRain",
        "suggestion": "Pack umbrellas; visit the Islamic Arts Museum Malaysia."
      },
      {
        "month": 11,
        "tempC": 27,
        "condition": "Monsoon Showers",
        "humidity": 85,
        "icon": "CloudRain",
        "suggestion": "Deepavali celebrations in Brickfields Little India."
      },
      {
        "month": 12,
        "tempC": 27,
        "condition": "Warm & Tropical",
        "humidity": 84,
        "icon": "Sun",
        "suggestion": "Year-end shopping mega sales and city festive illuminations."
      }
    ],
    "packingRules": [
      "passport",
      "universal-adapter",
      "umbrella",
      "light-cotton-wear",
      "modest-attire-for-caves"
    ],
    "internationalInfo": {
      "visaRequirement": "Malaysia Digital Arrival Card (MDAC) required within 3 days before arrival. Visa-free for many passports.",
      "passportValidity": "At least 6 months validity required from entry date.",
      "currency": "Malaysian Ringgit (MYR RM)",
      "adapterType": "Type G (UK standard three-pin, 240V)",
      "emergencyNumber": "999 (Police/Ambulance)",
      "demoNotice": "Demo recommendations are being used. Fill out the official MDAC declaration on the official immigration portal."
    },
    "coordinates": {
      "lat": 3.139,
      "lng": 101.6869
    },
    "places": [
      {
        "id": "kl-petronas",
        "name": "Petronas Twin Towers Skybridge & 86th Deck",
        "category": "Sightseeing",
        "rating": 4.9,
        "price": 1600,
        "location": "Kuala Lumpur City Centre",
        "description": "452-meter post-modern Islamic skyscrapers linked by a double-decker skybridge 170 meters in the air.",
        "tags": [
          "Sightseeing",
          "Architecture",
          "Iconic"
        ],
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 21:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "kl-batu-caves",
        "name": "Batu Caves Rainbow Steps & Murugan Statue",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Gombak, Selangor",
        "description": "Vast limestone cave temples guarded by a 140-foot golden Lord Murugan statue reached via 272 brightly painted rainbow steps.",
        "tags": [
          "Culture",
          "Adventure",
          "Spiritual"
        ],
        "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 21:00",
        "bestTimeToVisit": "Early Morning"
      },
      {
        "id": "kl-jalan-alor",
        "name": "Jalan Alor Bustling Night Food Street",
        "category": "Food",
        "rating": 4.8,
        "price": 400,
        "location": "Bukit Bintang",
        "description": "Vibrant culinary street lined with open-air plastic tables serving grilled chicken wings, spicy satay, durian, and dim sum.",
        "tags": [
          "Food",
          "Street Eats",
          "Nightlife"
        ],
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "openingHours": "17:00 - 02:00",
        "bestTimeToVisit": "Night Food Trail"
      },
      {
        "id": "kl-klcc-park",
        "name": "KLCC Park Lake Symphony Fountain Show",
        "category": "Nature",
        "rating": 4.7,
        "price": 0,
        "location": "Jalan Ampang",
        "description": "50-acre tropical green park directly beneath the Petronas Towers with nightly choreographed musical water fountains.",
        "tags": [
          "Nature",
          "Night Show",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 22:00",
        "bestTimeToVisit": "Evening Fountain Show"
      },
      {
        "id": "kl-thean-hou",
        "name": "Thean Hou Temple Six-Tier Chinese Shrine",
        "category": "Culture",
        "rating": 4.8,
        "price": 0,
        "location": "Lorong Bellamy, Robson Heights",
        "description": "Spectacular multi-tiered Chinese temple blending Buddhism, Taoism, and Confucianism adorned with thousands of red lanterns.",
        "tags": [
          "Culture",
          "Architecture",
          "Photography"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "08:00 - 22:00",
        "bestTimeToVisit": "Late Afternoon & Dusk"
      },
      {
        "id": "kl-tower",
        "name": "KL Tower Observation Deck & Sky Box",
        "category": "Sightseeing",
        "rating": 4.6,
        "price": 1200,
        "location": "Bukit Nanas",
        "description": "Telecommunications tower perched on pineapple hill with an open-air Sky Deck and glass-bottomed Sky Box protruding into thin air.",
        "tags": [
          "Sightseeing",
          "Panoramic",
          "Adventure"
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 22:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "kl-bukit-bintang",
        "name": "Bukit Bintang Pavilion Shopping & Boutiques",
        "category": "Shopping",
        "rating": 4.7,
        "price": 0,
        "location": "Bukit Bintang",
        "description": "Premier shopping and entertainment precinct packed with mega-malls, rooftop bistros, and international flagship stores.",
        "tags": [
          "Shopping",
          "Modern",
          "Fashion"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 22:00",
        "bestTimeToVisit": "Afternoon & Evening"
      },
      {
        "id": "kl-merdeka",
        "name": "Merdeka Square & Sultan Abdul Samad Moorish Hall",
        "category": "History",
        "rating": 4.6,
        "price": 0,
        "location": "City Centre",
        "description": "Birthplace of Malaysian independence featuring a 95m flagpole, cricket green, and 19th-century copper-domed colonial architecture.",
        "tags": [
          "History",
          "Architecture",
          "Heritage"
        ],
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "openingHours": "24 Hours",
        "bestTimeToVisit": "Morning or Night"
      },
      {
        "id": "kl-botanical",
        "name": "Perdana Botanical Gardens & Orchid Sanctuary",
        "category": "Nature",
        "rating": 4.6,
        "price": 0,
        "location": "Jalan Kebun Bunga",
        "description": "220-acre landscaped heritage park featuring a sunken garden, deer sanctuary, and thousands of tropical orchid varieties.",
        "tags": [
          "Nature",
          "Flowers",
          "Relaxed"
        ],
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "07:00 - 20:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "kl-central-market",
        "name": "Central Market (Pasar Seni) Cultural Souvenirs",
        "category": "Shopping",
        "rating": 4.6,
        "price": 0,
        "location": "Jalan Hang Kasturi",
        "description": "Art Deco heritage market established in 1888 showcasing Malaysian pewter, batik prints, wood carvings, and shadow puppets.",
        "tags": [
          "Shopping",
          "Culture",
          "Handicrafts"
        ],
        "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 20:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "kl-nasi-lemak",
        "name": "Village Park Restaurant Authentic Nasi Lemak",
        "category": "Food",
        "rating": 4.9,
        "price": 250,
        "location": "Damansara Utama",
        "description": "Malaysia's most acclaimed breakfast spot serving fragrant coconut rice, crispy fried spiced chicken, sambal, and roasted peanuts.",
        "tags": [
          "Food",
          "Iconic",
          "Culinary"
        ],
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        "openingHours": "06:30 - 17:30",
        "bestTimeToVisit": "Morning Breakfast"
      },
      {
        "id": "kl-islamic-arts",
        "name": "Islamic Arts Museum Southeast Asia",
        "category": "Culture",
        "rating": 4.8,
        "price": 250,
        "location": "Jalan Lembah, Tasik Perdana",
        "description": "Exquisite museum housing scale models of world mosques, intricate Quranic manuscripts, jewelry, and glazed ceramics.",
        "tags": [
          "Culture",
          "Art",
          "Architecture"
        ],
        "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:30 - 18:00",
        "bestTimeToVisit": "Morning"
      },
      {
        "id": "kl-aquaria",
        "name": "Aquaria KLCC Oceanarium Tunnel",
        "category": "Adventure",
        "rating": 4.6,
        "price": 1100,
        "location": "Concourse Level, KL Convention Centre",
        "description": "60,000-square-foot oceanarium featuring a 90-meter underwater tunnel with tiger sharks, giant stingrays, and sea turtles.",
        "tags": [
          "Adventure",
          "Marine",
          "Family"
        ],
        "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 20:00",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "id": "kl-chinatown",
        "name": "Petaling Street Chinatown Flea Market",
        "category": "Culture",
        "rating": 4.6,
        "price": 0,
        "location": "Jalan Petaling",
        "description": "Covered night bazaar under a green dragon roof selling herbal teas, roast duck, and bargain souvenirs in historic shop houses.",
        "tags": [
          "Culture",
          "Shopping",
          "Food"
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "openingHours": "10:00 - 22:00",
        "bestTimeToVisit": "Evening"
      },
      {
        "id": "kl-heli-lounge",
        "name": "Heli Lounge Bar Rooftop Helipad Sunset",
        "category": "Sightseeing",
        "rating": 4.7,
        "price": 600,
        "location": "Menara KH, Jalan Sultan Ismail",
        "description": "Fully functioning daytime helicopter landing pad transformed by evening into an unrailed 360-degree open-air cocktail terrace.",
        "tags": [
          "Sightseeing",
          "Nightlife",
          "Sunset"
        ],
        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
        "openingHours": "17:00 - 01:00",
        "bestTimeToVisit": "Sunset"
      },
      {
        "id": "kl-masjid-negara",
        "name": "National Mosque of Malaysia (Masjid Negara)",
        "category": "Culture",
        "rating": 4.7,
        "price": 0,
        "location": "Jalan Perdana",
        "description": "Striking 1965 modern Islamic structure with a 16-pointed star concrete main roof resembling an open umbrella and 73m minaret.",
        "tags": [
          "Culture",
          "Architecture",
          "Spiritual"
        ],
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "openingHours": "09:00 - 18:00 (Non-prayer times)",
        "bestTimeToVisit": "Morning"
      }
    ],
    "foods": [
      {
        "name": "Nasi Lemak with Sambal & Rendang",
        "category": "National Dish",
        "price": "RM 8 - 18",
        "rating": 4.9,
        "location": "Village Park Restaurant"
      },
      {
        "name": "Char Kway Teow with Cockles",
        "category": "Hawker",
        "price": "RM 9 - 16",
        "rating": 4.8,
        "location": "Jalan Alor Night Market"
      },
      {
        "name": "Roti Canai with Dhal & Curry",
        "category": "Breakfast",
        "price": "RM 3 - 7",
        "rating": 4.9,
        "location": "Mansion Tea Stall"
      }
    ],
    "stays": [
      {
        "name": "Mandarin Oriental Kuala Lumpur",
        "type": "Luxury",
        "price": 16000,
        "rating": 4.9,
        "amenities": [
          "Twin Towers View",
          "KLCC Park",
          "Spa"
        ]
      },
      {
        "name": "The Chow Kit - Ormond Hotel",
        "type": "Mid-Range",
        "price": 4800,
        "rating": 4.6,
        "amenities": [
          "Boutique Heritage",
          "Kitchen & Bar",
          "Central"
        ]
      },
      {
        "name": "Space Hotel @ Chinatown",
        "type": "Budget",
        "price": 1300,
        "rating": 4.3,
        "amenities": [
          "Futuristic Space Pods",
          "Petaling St Near",
          "Slide"
        ]
      }
    ]
  }
];

module.exports = destinations;
