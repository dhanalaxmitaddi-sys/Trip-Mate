const express = require('express');
const router = express.Router();
const { chat, getHistory } = require('../controllers/assistantController');

router.post('/', chat);
router.post('/chat', chat);
router.get('/history', getHistory);

module.exports = router;
