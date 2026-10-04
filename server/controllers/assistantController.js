const chatbotService = require('../services/chatbotService');
const { memoryChat } = require('../config/memoryStore');

// @desc    Travel Assistant Chatbot endpoint (FR10)
// @route   POST /api/assistant/chat
exports.chat = async (req, res) => {
  try {
    const { message, destinationId, tripId } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    // Context summary passed to chatbot service
    const context = {
      currentDestinationId: destinationId,
      tripId
    };

    const response = chatbotService.generateAssistantReply(message, context);

    // Record to memory chat history
    const chatRecord = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString()
    };
    const replyRecord = {
      id: 'msg-rep-' + Date.now(),
      sender: 'assistant',
      text: response.reply,
      chips: response.chips,
      action: response.action,
      timestamp: new Date().toISOString()
    };

    memoryChat.push(chatRecord, replyRecord);
    if (memoryChat.length > 50) memoryChat.splice(0, memoryChat.length - 50);

    return res.json({
      success: true,
      data: replyRecord
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Chat History
// @route   GET /api/assistant/history
exports.getHistory = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: memoryChat.slice(-30)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
