const path = require('path');
// 1. Load dotenv before reading any environment variables (Requirement 2)
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB, getDatabaseStatus } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Connect to Database (or In-Memory Fallback)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// 5. Health check endpoint (Requirement 5)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: getDatabaseStatus()
  });
});

// Mount Feature API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trip'));
app.use('/api/generate-trip', require('./controllers/tripController').generateTrip);
app.use('/api/generate', require('./controllers/tripController').generateTrip);
app.use('/api/destinations', require('./routes/destination'));
app.use('/api/packing', require('./routes/packing'));
app.use('/api/assistant', require('./routes/assistant'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/ai', require('./routes/ai'));

// Root endpoint info
app.get('/', (req, res) => {
  res.send('TripMind AI Backend Server is running smoothly.');
});

// Error handling middleware
app.use(errorHandler);

// 3. Port configuration & EADDRINUSE handling (Requirement 3)
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Port ${PORT} is already in use by an existing process.`);
    console.warn(`The backend is already running on http://localhost:${PORT} or another process is using this port.`);
    console.warn(`To run on another port, set PORT in server/.env (e.g., PORT=5001).`);
  } else {
    console.error('Server error:', err);
  }
});

module.exports = app;
