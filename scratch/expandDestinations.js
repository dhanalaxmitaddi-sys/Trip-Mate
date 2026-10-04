// Script to expand destinations with 16 authentic, category-balanced places per destination
const fs = require('fs');
const path = require('path');

const EXPANDED_PLACES = {
  hyderabad: [
    {
      id: "hyd-charminar",
      name: "Charminar & Laad Bazaar",
      category: "Culture",
      rating: 4.8,
      price: 50,
      location: "Old City, Hyderabad",
      description: "Iconic 1591 monument with four grand minarets, surrounded by colorful lacquer bangle stalls and pearl merchants.",
      tags: ["Culture", "Shopping", "Photography"],
      image: "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80",
      openingHours: "09:00 - 17:30",
      bestTimeToVisit: "Morning & Sunset"
    },
    {
      id: "hyd-golconda",
      name: "Golconda Fort & Acoustic Echo Walk",
      category: "History",
      rating: 4.7,
      price: 150,
      location: "Ibrahim Bagh",
      description: "Magnificent fortress renowned for its acoustic engineering, royal palaces, diamond vaults, and evening sound-and-light show.",
      tags: ["History", "Adventure", "Photography"],
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
      openingHours: "09:00 - 18:00",
      bestTimeToVisit: "Late Afternoon"
    },
    {
      id: "hyd-ramoji",
      name: "Ramoji Film City Grand Studio",
      category: "Adventure",
      rating: 4.6,
      price: 1250,
      location: "Hayathnagar",
      description: "Guinness World Record holding film complex with stunt shows, movie sets, gardens, and adventure rides.",
      tags: ["Adventure", "Culture", "Photography"],
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
      openingHours: "09:00 - 17:30",
      bestTimeToVisit: "Full Day"
    },
    {
      id: "hyd-chowmahalla",
      name: "Chowmahalla Palace & Vintage Cars",
      category: "Culture",
      rating: 4.7,
      price: 100,
      location: "Motigallu, Khilwat",
      description: "Opulent seat of the Asaf Jahi dynasty featuring vintage Rolls Royce cars, Belgian crystal chandeliers, and lush courtyards.",
      tags: ["Culture", "History", "Photography"],
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      openingHours: "10:00 - 17:00",
      bestTimeToVisit: "Morning"
    },
    {
      id: "hyd-biryani-paradise",
      name: "Authentic Hyderabadi Dum Biryani Feast",
      category: "Food",
      rating: 4.9,
      price: 650,
      location: "Banjara Hills / Abids",
      description: "Tender slow-cooked spiced mutton layered with fragrant basmati rice, served with mirchi ka salan and dahi chutney.",
      tags: ["Food", "Culture"],
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      openingHours: "12:00 - 23:30",
      bestTimeToVisit: "Lunch & Dinner"
    },
    {
      id: "hyd-hussain-sagar",
      name: "Hussain Sagar Lake & Buddha Statue Boat Ride",
      category: "Nature",
      rating: 4.5,
      price: 120,
      location: "Necklace Road",
      description: "Heart-shaped urban lake with speedboat rides to the world's tallest monolithic Buddha statue and breezy promenade.",
      tags: ["Nature", "Relaxed", "Photography"],
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
      openingHours: "08:00 - 22:00",
      bestTimeToVisit: "Sunset & Evening"
    },
    {
      id: "hyd-salar-jung",
      name: "Salar Jung Museum & Musical Clock",
      category: "Culture",
      rating: 4.8,
      price: 50,
      location: "Darulshifa",
      description: "One of the largest individual art collections in the world, famous for the veiled Rebecca marble and 19th-century mechanical clock.",
      tags: ["Culture", "History", "Art"],
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
      openingHours: "10:00 - 17:00",
      bestTimeToVisit: "Morning"
    },
    {
      id: "hyd-qutb-shahi",
      name: "Qutb Shahi Tombs & Royal Gardens",
      category: "History",
      rating: 4.7,
      price: 40,
      location: "Tolichowki",
      description: "Grand domed mausoleums blending Persian, Pashtun, and Hindu architecture set in tranquil Ibrahim Bagh landscaped gardens.",
      tags: ["History", "Architecture", "Photography"],
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
      openingHours: "09:30 - 16:30",
      bestTimeToVisit: "Late Afternoon"
    },
    {
      id: "hyd-shilparamam",
      name: "Shilparamam Arts & Crafts Village",
      category: "Shopping",
      rating: 4.6,
      price: 60,
      location: "HITEC City, Madhapur",
      description: "Rural heritage crafts village with terracotta artisans, handloom silks, boating, and open-air ethnic performances.",
      tags: ["Shopping", "Culture", "Handicrafts"],
      image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
      openingHours: "10:30 - 20:30",
      bestTimeToVisit: "Evening"
    },
    {
      id: "hyd-birla-mandir",
      name: "Birla Mandir & Naubat Pahad Sunset View",
      category: "Sightseeing",
      rating: 4.8,
      price: 0,
      location: "Hill Fort Road",
      description: "Pristine white Rajasthani marble temple perched atop a 280-foot hill offering sweeping panoramic skyline views.",
      tags: ["Sightseeing", "Culture", "Photography"],
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      openingHours: "07:00 - 12:00, 15:00 - 21:00",
      bestTimeToVisit: "Sunset"
    },
    {
      id: "hyd-zoo-park",
      name: "Nehru Zoological Park & Lion Safari",
      category: "Nature",
      rating: 4.5,
      price: 80,
      location: "Bahadurpura",
      description: "Expansive 380-acre botanical and wildlife sanctuary featuring safari vans, nocturnal animal house, and serene lakes.",
      tags: ["Nature", "Wildlife", "Family"],
      image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80",
      openingHours: "08:30 - 17:00",
      bestTimeToVisit: "Morning"
    },
    {
      id: "hyd-nimrah-cafe",
      name: "Nimrah Cafe Irani Chai & Osmania Biscuits",
      category: "Food",
      rating: 4.9,
      price: 80,
      location: "Charminar Road",
      description: "Legendary heritage tea stall brewing spiced, milky Irani Chai paired with warm melt-in-the-mouth salted Osmania biscuits.",
      tags: ["Food", "Local Street Eats", "Iconic"],
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
      openingHours: "04:00 - 23:00",
      bestTimeToVisit: "Morning & Late Night"
    },
    {
      id: "hyd-durgam-cheruvu",
      name: "Durgam Cheruvu Cable Bridge & Waterfront",
      category: "Sightseeing",
      rating: 4.7,
      price: 0,
      location: "Jubilee Hills",
      description: "Stunning illuminated suspension cable bridge over the Secret Lake, featuring a floating musical fountain and modern cafes.",
      tags: ["Sightseeing", "Architecture", "Nightlife"],
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
      openingHours: "24 Hours",
      bestTimeToVisit: "Night"
    },
    {
      id: "hyd-falaknuma",
      name: "Taj Falaknuma Palace Royal Tea Walk",
      category: "Culture",
      rating: 4.9,
      price: 2500,
      location: "Engine Bowli, Falaknuma",
      description: "Scorpion-shaped Italian marble palace 2,000 feet above the city, once home to the Nizam, featuring royal horse carriage arrivals.",
      tags: ["Culture", "Luxury", "History"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      openingHours: "15:30 - 18:30",
      bestTimeToVisit: "Afternoon"
    },
    {
      id: "hyd-mozamjahi",
      name: "Mozamjahi Heritage Market & Famous Ice Cream",
      category: "Food",
      rating: 4.6,
      price: 150,
      location: "Abids",
      description: "Granite heritage clock tower bazaar established in 1935, celebrated for handmade seasonal fruit ice creams (Mango & Sapota).",
      tags: ["Food", "Heritage", "Dessert"],
      image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
      openingHours: "10:00 - 23:00",
      bestTimeToVisit: "Evening"
    },
    {
      id: "hyd-kbr-park",
      name: "KBR National Park Jubilee Hills Trail",
      category: "Nature",
      rating: 4.7,
      price: 40,
      location: "Jubilee Hills",
      description: "Pristine urban rainforest nature trail surrounded by boulder rock formations, peacocks, and lush native flora.",
      tags: ["Nature", "Trek", "Relaxed"],
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      openingHours: "05:30 - 09:30, 16:30 - 18:30",
      bestTimeToVisit: "Early Morning"
    }
  ]
};

console.log('Script loaded successfully.');
