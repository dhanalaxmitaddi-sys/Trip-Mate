const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Destination = require('../models/Destination');
const Trip = require('../models/Trip');
const Packing = require('../models/Packing');
const destinationsData = require('../data/destinations');

async function seedDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ No MONGO_URI found in environment.');
    process.exit(1);
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected successfully to MongoDB Atlas!\n');

    // 1. Seed Destinations
    console.log('1. Seeding Destinations to MongoDB Atlas...');
    for (const d of destinationsData) {
      await Destination.findOneAndUpdate(
        { id: d.id },
        d,
        { upsert: true, new: true }
      );
    }
    console.log(`   Seeded ${destinationsData.length} destinations (Goa, Delhi, Jaipur, Manali, Mumbai, Kerala)`);

    // 2. Seed Demo User
    console.log('\n2. Seeding Demo User...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    let demoUser = await User.findOne({ email: 'demo@tripmind.ai' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Alex Explorer',
        email: 'demo@tripmind.ai',
        password: passwordHash
      });
      console.log('   Created demo user: demo@tripmind.ai / password123');
    } else {
      console.log('   Demo user already exists: demo@tripmind.ai');
    }

    // 3. Seed Sample Trip if none exist
    console.log('\n3. Checking Sample Trips...');
    const existingTripsCount = await Trip.countDocuments();
    if (existingTripsCount === 0) {
      const sampleTrip = await Trip.create({
        userId: demoUser._id.toString(),
        destinationId: 'goa',
        destinationName: 'Goa',
        destinationType: 'beach',
        startDate: '2026-10-15',
        endDate: '2026-10-18',
        budget: 35000,
        travelers: 2,
        interests: ['Beach', 'Food', 'Adventure'],
        status: 'Upcoming',
        source: 'ai',
        days: [
          {
            id: 'day-1',
            dayNumber: 1,
            date: '2026-10-15',
            notes: 'Day 1 Exploring North Goa Beaches',
            activities: [
              {
                id: 'act-1-1',
                placeId: 'goa-baga',
                name: 'Morning Parasailing at Baga Beach',
                category: 'Beach',
                time: '09:00',
                durationMinutes: 120,
                location: 'North Goa',
                cost: 800,
                costCategory: 'Activities',
                reason: 'Top water sports hub with 4.5 rating.'
              },
              {
                id: 'act-1-2',
                placeId: 'goa-fishermans-wharf',
                name: 'Traditional Goan Lunch at The Fisherman\'s Wharf',
                category: 'Food',
                time: '13:00',
                durationMinutes: 90,
                location: 'Panaji',
                cost: 850,
                costCategory: 'Food',
                reason: 'Authentic Goan seafood curries.'
              },
              {
                id: 'act-1-3',
                placeId: 'goa-fort-aguada',
                name: 'Sunset Viewpoint at Fort Aguada & Lighthouse',
                category: 'History',
                time: '16:30',
                durationMinutes: 120,
                location: 'Sinquerim',
                cost: 100,
                costCategory: 'Activities',
                reason: '17th-century bastion with Arabian sea view.'
              }
            ]
          },
          {
            id: 'day-2',
            dayNumber: 2,
            date: '2026-10-16',
            notes: 'Day 2 Heritage & Waterfalls',
            activities: [
              {
                id: 'act-2-1',
                placeId: 'goa-basilica',
                name: 'Cultural Tour of Basilica of Bom Jesus',
                category: 'Culture',
                time: '09:30',
                durationMinutes: 90,
                location: 'Old Goa',
                cost: 50,
                costCategory: 'Activities',
                reason: 'UNESCO World Heritage baroque architecture.'
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
                reason: 'Spectacular multi-tiered cascade.'
              }
            ]
          }
        ]
      });

      console.log(`   Sample trip created: ID ${sampleTrip._id}`);

      // Seed packing for this trip
      await Packing.create({
        tripId: sampleTrip._id.toString(),
        userId: demoUser._id.toString(),
        items: [
          { id: 'p-1', group: 'Clothing', label: 'Light cotton shirts and shorts (3 sets)', checked: true },
          { id: 'p-2', group: 'Clothing', label: 'Swimwear / Beach shorts', checked: true },
          { id: 'p-3', group: 'Toiletries', label: 'Sunscreen (SPF 50) & lip balm', checked: true },
          { id: 'p-4', group: 'Documents', label: 'Government Photo ID / Passport', checked: true },
          { id: 'p-5', group: 'Electronics', label: 'Power bank & charging cables', checked: false },
          { id: 'p-6', group: 'Activity essentials', label: 'Polarized sunglasses & beach towel', checked: false }
        ]
      });
      console.log('   Sample packing list created in MongoDB Atlas.');
    } else {
      console.log(`   MongoDB Atlas already contains ${existingTripsCount} trip(s).`);
    }

    console.log('\n🎉 MongoDB Atlas Database "tripmind" is now completely connected and populated with collections:');
    console.log('   - destinations');
    console.log('   - users');
    console.log('   - trips');
    console.log('   - packings\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
