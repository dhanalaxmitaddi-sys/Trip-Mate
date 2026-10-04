const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isUsingMemoryStore } = require('../config/db');
const { memoryUsers } = require('../config/memoryStore');

const JWT_SECRET = process.env.JWT_SECRET || 'tripmind_super_secret_jwt_key_2026';

// Helper to sign JWT
const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Standardize returned user profile object
const formatUser = (u) => {
  if (!u) return null;
  const user = u.toObject ? u.toObject() : u;
  return {
    id: user._id || user.id,
    _id: user._id || user.id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    preferences: user.preferences || {
      travelStyle: 'Balanced',
      foodPreference: 'No Preference',
      budgetPreference: 'Medium',
      interests: ['Nature', 'Food']
    },
    savedPlaces: user.savedPlaces || [],
    bookingHistory: user.bookingHistory || [],
    notifications: user.notifications || [],
    createdAt: user.createdAt
  };
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check memory store or MongoDB
    if (isUsingMemoryStore()) {
      const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        _id: 'user-' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        preferences: {
          travelStyle: 'Balanced',
          foodPreference: 'No Preference',
          budgetPreference: 'Medium',
          interests: ['Nature', 'Food']
        },
        savedPlaces: [],
        bookingHistory: [],
        notifications: [
          {
            id: 'notif-' + Date.now(),
            title: 'Welcome to TripMate!',
            message: `Hello ${name}, welcome aboard! Plan smart, travel easy.`,
            type: 'welcome',
            read: false,
            createdAt: new Date().toISOString()
          }
        ],
        createdAt: new Date().toISOString()
      };
      memoryUsers.push(newUser);

      const token = signToken(newUser._id);
      return res.status(201).json({
        success: true,
        message: 'Account registered successfully',
        data: {
          user: formatUser(newUser),
          token
        }
      });
    }

    // MongoDB flow
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      notifications: [
        {
          id: 'notif-' + Date.now(),
          title: 'Welcome to TripMate!',
          message: `Hello ${name}, welcome to TripMate! Your travel planner is ready.`,
          type: 'welcome',
          read: false,
          createdAt: new Date()
        }
      ]
    });

    const token = signToken(user._id);
    return res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: {
        user: formatUser(user),
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    if (isUsingMemoryStore()) {
      const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = signToken(user._id);
      return res.json({
        success: true,
        message: 'Logged in successfully',
        data: {
          user: formatUser(user),
          token
        }
      });
    }

    // MongoDB flow
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = signToken(user._id);
    return res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user: formatUser(user),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login'
    });
  }
};

// @desc    Demo 1-Click Instant Login
// @route   POST /api/auth/demo-login
exports.demoLogin = async (req, res) => {
  try {
    const demoUser = isUsingMemoryStore()
      ? memoryUsers[0]
      : (await User.findOne({ email: 'demo@tripmind.ai' })) || (await User.create({
          name: 'Alex Explorer',
          email: 'demo@tripmind.ai',
          password: 'password123',
          profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          preferences: {
            travelStyle: 'Balanced',
            foodPreference: 'No Preference',
            budgetPreference: 'Medium',
            interests: ['Nature', 'Beaches', 'Food']
          }
        }));

    const token = signToken(demoUser._id || 'demo-user-101');
    return res.json({
      success: true,
      message: 'Welcome to TripMate Demo mode',
      data: {
        user: formatUser(demoUser),
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Demo login error'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    let user;
    if (isUsingMemoryStore()) {
      user = memoryUsers.find(u => u._id === req.user.id || u.id === req.user.id) || req.user;
    } else {
      user = await User.findById(req.user.id || req.user._id);
    }

    if (!user) {
      return res.json({ success: true, data: formatUser(req.user) });
    }

    return res.json({
      success: true,
      data: formatUser(user)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update user profile & travel preferences
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, profilePhoto, preferences } = req.body;

    if (isUsingMemoryStore()) {
      const idx = memoryUsers.findIndex(u => u._id === userId || u.id === userId);
      if (idx !== -1) {
        if (name) memoryUsers[idx].name = name;
        if (profilePhoto) memoryUsers[idx].profilePhoto = profilePhoto;
        if (preferences) memoryUsers[idx].preferences = { ...memoryUsers[idx].preferences, ...preferences };
        return res.json({ success: true, message: 'Profile updated successfully', data: formatUser(memoryUsers[idx]) });
      }
      return res.json({ success: true, message: 'Profile updated locally', data: formatUser({ ...req.user, name, profilePhoto, preferences }) });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(profilePhoto && { profilePhoto }),
        ...(preferences && { preferences })
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      data: formatUser(updatedUser)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle save place for user
// @route   POST /api/auth/save-place
exports.toggleSavePlace = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const place = req.body;

    if (!place || !place.id) {
      return res.status(400).json({ success: false, message: 'Place data with id is required' });
    }

    if (isUsingMemoryStore()) {
      const user = memoryUsers.find(u => u._id === userId || u.id === userId);
      if (user) {
        if (!user.savedPlaces) user.savedPlaces = [];
        const existsIdx = user.savedPlaces.findIndex(p => p.id === place.id);
        let action = 'saved';
        if (existsIdx > -1) {
          user.savedPlaces.splice(existsIdx, 1);
          action = 'removed';
        } else {
          user.savedPlaces.push({
            id: place.id,
            name: place.name,
            destinationId: place.destinationId || '',
            category: place.category || 'Sightseeing',
            rating: place.rating || 4.5,
            price: place.price || 0,
            location: place.location || '',
            image: place.image || '',
            savedAt: new Date().toISOString()
          });
        }
        return res.json({ success: true, action, data: user.savedPlaces });
      }
      return res.json({ success: true, action: 'saved', data: [place] });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const existingIdx = user.savedPlaces.findIndex(p => p.id === place.id);
    let action = 'saved';
    if (existingIdx > -1) {
      user.savedPlaces.splice(existingIdx, 1);
      action = 'removed';
    } else {
      user.savedPlaces.push({
        id: place.id,
        name: place.name,
        destinationId: place.destinationId || '',
        category: place.category || 'Sightseeing',
        rating: place.rating || 4.5,
        price: place.price || 0,
        location: place.location || '',
        image: place.image || '',
        savedAt: new Date()
      });
    }

    await user.save();
    return res.json({ success: true, action, data: user.savedPlaces });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clear / Mark read notifications
// @route   POST /api/auth/notifications/read
exports.markNotificationsRead = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    if (isUsingMemoryStore()) {
      const user = memoryUsers.find(u => u._id === userId || u.id === userId);
      if (user && user.notifications) {
        user.notifications.forEach(n => { n.read = true; });
      }
      return res.json({ success: true, message: 'Notifications marked as read' });
    }

    const user = await User.findById(userId);
    if (user && user.notifications) {
      user.notifications.forEach(n => { n.read = true; });
      await user.save();
    }
    return res.json({ success: true, message: 'Notifications marked as read' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
