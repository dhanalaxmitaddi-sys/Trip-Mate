const destinations = require('../data/destinations');
const crypto = require('crypto');

// In-Memory store tables
const memoryUsers = [];
const memoryTrips = [];
const memoryPacking = {};
const memoryChat = [];

// Seed default demo user: demo@tripmind.ai / password123
const bcrypt = require('bcryptjs');
const demoSalt = bcrypt.genSaltSync(10);
const demoPasswordHash = bcrypt.hashSync('password123', demoSalt);

memoryUsers.push({
  _id: 'demo-user-101',
  name: 'Alex Explorer',
  email: 'demo@tripmind.ai',
  password: demoPasswordHash,
  profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  preferences: {
    travelStyle: 'Balanced',
    foodPreference: 'No Preference',
    budgetPreference: 'Medium',
    interests: ['Nature', 'Beaches', 'Food']
  },
  savedPlaces: [
    {
      id: 'hyd-charminar',
      name: 'Charminar & Laad Bazaar',
      destinationId: 'hyderabad',
      category: 'History',
      rating: 4.8,
      price: 50,
      location: 'Old City, Hyderabad',
      image: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80',
      savedAt: new Date().toISOString()
    },
    {
      id: 'goa-baga',
      name: 'Baga Beach Watersports',
      destinationId: 'goa',
      category: 'Beach',
      rating: 4.7,
      price: 800,
      location: 'North Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      savedAt: new Date().toISOString()
    }
  ],
  bookingHistory: [
    {
      bookingId: 'TM-BK-918234',
      tripId: 'demo-trip-goa-001',
      destinationName: 'Goa',
      dates: '3 Days Trip',
      hotelName: 'Taj Exotica Resort & Spa',
      totalAmount: 26500,
      discount: 500,
      finalAmount: 26000,
      currencySymbol: '₹',
      status: 'Confirmed',
      bookedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      title: 'Welcome to TripMate!',
      message: 'Your smart travel companion is ready. Start exploring or planning your next adventure.',
      type: 'info',
      read: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'notif-2',
      title: 'Coupon Available: TRIPMATE200',
      message: 'Get ₹200 off your next trip plan using coupon code TRIPMATE200.',
      type: 'promo',
      read: false,
      createdAt: new Date().toISOString()
    }
  ],
  createdAt: new Date().toISOString()
});

// Seed an initial rich trip for the demo user
const initialTrip = {
  _id: 'demo-trip-goa-001',
  id: 'demo-trip-goa-001',
  userId: 'demo-user-101',
  destinationId: 'goa',
  destinationName: 'Goa',
  country: 'India',
  isInternational: false,
  destinationType: 'beach',
  fromLocation: 'Mumbai, India',
  startDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
  endDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
  daysCount: 3,
  budget: 35000,
  currency: 'INR',
  currencySymbol: '₹',
  travelers: 2,
  interests: ['Beaches', 'Food', 'Adventure'],
  foodPreference: 'No Preference',
  travelStyle: 'Balanced',
  selectedHotel: {
    id: 'hotel-goa-1',
    name: 'Taj Exotica Resort & Spa',
    roomType: 'Deluxe Sea View Villa',
    price: 4500,
    rating: 4.8,
    location: 'Benaulim, South Goa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    safetyInfo: '24/7 Monitored Beach Patrol & Certified Sanitization'
  },
  selectedFood: {
    id: 'food-plan-1',
    name: 'Coastal Gastronomy & Seafood Special',
    category: 'Local Seafood & Beach Shacks',
    dailyCost: 900,
    description: 'Fresh catch prawn curries, Goan poi, and beachfront dining.'
  },
  selectedTransport: {
    id: 'trans-1',
    type: 'Cab',
    label: 'Private AC Taxi & Chauffeur',
    dailyRate: 1200
  },
  coupon: {
    code: 'WEEKEND500',
    discount: 500,
    appliedAt: new Date().toISOString()
  },
  booking: {
    bookingId: 'TM-BK-918234',
    status: 'Booked',
    bookedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    totalAmount: 26500,
    discount: 500,
    finalAmount: 26000
  },
  status: 'Upcoming',
  source: 'ai',
  days: [
    {
      id: 'day-1',
      dayNumber: 1,
      date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      activities: [
        {
          id: 'act-1-1',
          placeId: 'goa-baga',
          name: 'Morning Swim & Parasailing at Baga Beach',
          category: 'Beach',
          time: '09:00',
          durationMinutes: 150,
          location: 'North Goa',
          cost: 800,
          costCategory: 'Activities',
          reason: 'Matches your Beach and Adventure interests. Renowned water sports center.'
        },
        {
          id: 'act-1-2',
          placeId: 'goa-fishermans-wharf',
          name: 'Seafood Lunch at The Fisherman\'s Wharf',
          category: 'Food',
          time: '13:00',
          durationMinutes: 90,
          location: 'Panaji Riverside',
          cost: 850,
          costCategory: 'Food',
          reason: 'Authentic Goan prawn balchão & fish curry rated 4.6 stars.'
        },
        {
          id: 'act-1-3',
          placeId: 'goa-fort-aguada',
          name: 'Sunset Vista at Fort Aguada & Lighthouse',
          category: 'History',
          time: '16:30',
          durationMinutes: 120,
          location: 'Sinquerim, Candolim',
          cost: 100,
          costCategory: 'Activities',
          reason: 'Panoramic 17th-century coastal bastion with breathtaking sunset viewpoints.'
        }
      ]
    },
    {
      id: 'day-2',
      dayNumber: 2,
      date: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
      activities: [
        {
          id: 'act-2-1',
          placeId: 'goa-basilica',
          name: 'Cultural Exploration of Basilica of Bom Jesus',
          category: 'Culture',
          time: '09:30',
          durationMinutes: 120,
          location: 'Old Goa',
          cost: 50,
          costCategory: 'Activities',
          reason: 'UNESCO World Heritage baroque architecture and sacred relics.'
        },
        {
          id: 'act-2-2',
          placeId: 'goa-dudhsagar',
          name: 'Jeep Safari to Dudhsagar Waterfalls',
          category: 'Adventure',
          time: '13:30',
          durationMinutes: 240,
          location: 'Sanguem',
          cost: 750,
          costCategory: 'Activities',
          reason: 'Thrilling forest expedition to the spectacular four-tiered cascade.'
        }
      ]
    },
    {
      id: 'day-3',
      dayNumber: 3,
      date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      activities: [
        {
          id: 'act-3-1',
          placeId: 'goa-palolem',
          name: 'Kayaking & Dolphin Spotting at Palolem Beach',
          category: 'Beach',
          time: '09:00',
          durationMinutes: 180,
          location: 'South Goa',
          cost: 400,
          costCategory: 'Activities',
          reason: 'Tranquil bay sheltered by palm groves, ideal for calm water kayaking.'
        },
        {
          id: 'act-3-2',
          placeId: 'goa-anjuna-flea',
          name: 'Shopping & Souvenirs at Anjuna Flea Market',
          category: 'Shopping',
          time: '15:30',
          durationMinutes: 150,
          location: 'Anjuna',
          cost: 500,
          costCategory: 'Shopping',
          reason: 'Vibrant local open-air bazaar featuring artisanal crafts and beachwear.'
        }
      ]
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

memoryTrips.push(initialTrip);

// Seed packing checklist for the initial trip
memoryPacking[initialTrip._id] = [
  { id: 'pack-1', group: 'Clothing', label: 'Light cotton shirts and shorts (3 sets)', checked: true },
  { id: 'pack-2', group: 'Clothing', label: 'Swimwear / Board shorts', checked: true },
  { id: 'pack-3', group: 'Clothing', label: 'Comfortable flip-flops and water shoes', checked: false },
  { id: 'pack-4', group: 'Toiletries', label: 'High SPF sunscreen & lip balm', checked: true },
  { id: 'pack-5', group: 'Toiletries', label: 'Mosquito & insect repellent', checked: false },
  { id: 'pack-6', group: 'Documents', label: 'Government Photo ID / Passport', checked: true },
  { id: 'pack-7', group: 'Documents', label: 'Hotel & travel booking vouchers', checked: false },
  { id: 'pack-8', group: 'Electronics', label: 'Power bank & phone charging cable', checked: true },
  { id: 'pack-9', group: 'Electronics', label: 'Waterproof phone pouch for beach sports', checked: false },
  { id: 'pack-10', group: 'Health and safety', label: 'Personal medication & first aid strip', checked: false },
  { id: 'pack-11', group: 'Activity essentials', label: 'Polarized sunglasses & UV protection hat', checked: true },
  { id: 'pack-12', group: 'Activity essentials', label: 'Quick-dry microfiber beach towel', checked: false }
];

module.exports = {
  memoryUsers,
  memoryTrips,
  memoryPacking,
  memoryChat,
  destinations
};
