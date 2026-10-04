const mongoose = require('mongoose');

let isConnected = false;
let useMemoryStore = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('YOUR_MONGODB_ATLAS_CONNECTION_STRING') || uri.trim() === '') {
    console.log('ℹ️ No MONGO_URI provided in server/.env. Using In-Memory Datastore fallback.');
    useMemoryStore = true;
    isConnected = false;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    useMemoryStore = false;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    // Never print connection string or credentials in logs
    console.warn('⚠️ MongoDB Atlas connection error. Falling back to In-Memory Datastore.');
    useMemoryStore = true;
    isConnected = false;
  }
};

const isUsingMemoryStore = () => useMemoryStore;

const getDatabaseStatus = () => {
  if (isConnected && !useMemoryStore) {
    return 'MongoDB Atlas (Connected)';
  }
  return 'In-Memory Fallback (Active)';
};

module.exports = { connectDB, isUsingMemoryStore, getDatabaseStatus };
