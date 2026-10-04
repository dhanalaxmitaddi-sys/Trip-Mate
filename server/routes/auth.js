const express = require('express');
const router = express.Router();
const {
  register,
  login,
  demoLogin,
  getMe,
  updateProfile,
  toggleSavePlace,
  markNotificationsRead
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/demo-login', demoLogin);
router.post('/logout', (req, res) => res.json({ success: true, message: 'Logged out successfully' }));
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/save-place', protect, toggleSavePlace);
router.post('/notifications/read', protect, markNotificationsRead);

module.exports = router;
