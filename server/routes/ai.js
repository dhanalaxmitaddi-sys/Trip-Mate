const express = require('express');
const router = express.Router();
const {
  getHuggingFaceStatus,
  generateHuggingFaceDayPlan,
  chatWithHuggingFace
} = require('../services/externalApiService');
const plannerService = require('../services/plannerService');
const { getOrGenerateDestination } = require('../services/destinationService');

// @desc    Get Hugging Face integration status
// @route   GET /api/ai/huggingface/status
router.get('/huggingface/status', (req, res) => {
  try {
    const customToken = req.headers['x-hf-token'] || req.query.token;
    const status = getHuggingFaceStatus(customToken);
    return res.json({ success: true, data: status });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Generate a single day plan using Hugging Face AI
// @route   POST /api/ai/huggingface/day-plan
router.post('/huggingface/day-plan', async (req, res) => {
  try {
    const {
      destinationName = 'Goa',
      dayNumber = 1,
      date = new Date().toISOString().split('T')[0],
      themeTitle,
      interests = ['Nature', 'Food'],
      budget = 25000,
      travelStyle = 'Balanced',
      token,
      model,
      usedPlaces = []
    } = req.body;

    const customToken = token || req.headers['x-hf-token'] || process.env.HUGGINGFACE_API_TOKEN;

    const dayPlan = await generateHuggingFaceDayPlan({
      destinationName,
      dayNumber: Number(dayNumber) || 1,
      date,
      themeTitle: themeTitle || `Day ${dayNumber} Experience`,
      interests,
      budget,
      travelStyle,
      token: customToken,
      model,
      usedPlaces
    });

    return res.json({
      success: true,
      message: `Day ${dayNumber} generated with Hugging Face AI`,
      data: dayPlan
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Generate complete multi-day itinerary with Hugging Face AI
// @route   POST /api/ai/huggingface/generate-itinerary
router.post('/huggingface/generate-itinerary', async (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
      startDate = new Date().toISOString().split('T')[0],
      numberOfDays = 3,
      daysCount,
      budget = 35000,
      currency,
      currencySymbol,
      travelers = 1,
      interests = ['Nature', 'Food'],
      travelStyle = 'Balanced',
      token,
      model
    } = req.body;

    const customToken = token || req.headers['x-hf-token'] || process.env.HUGGINGFACE_API_TOKEN;
    const targetDays = Math.max(1, Math.min(14, Number(numberOfDays || daysCount || 3)));
    const queryTarget = destinationName || destinationId || 'goa';
    const dest = await getOrGenerateDestination(queryTarget);

    const generatedDays = [];
    const usedPlacesAcrossTrip = new Set();

    for (let d = 1; d <= targetDays; d++) {
      const dayDate = plannerService.addDays(startDate, d - 1);
      const themeRotation = plannerService.DAY_THEME_ROTATIONS[(d - 1) % plannerService.DAY_THEME_ROTATIONS.length];

      const dayPlan = await generateHuggingFaceDayPlan({
        destinationName: dest.name,
        dayNumber: d,
        date: dayDate,
        themeTitle: themeRotation.themeTitle,
        interests,
        budget: Number(budget) || 35000,
        travelers: Number(travelers) || 1,
        travelStyle,
        token: customToken,
        model,
        usedPlaces: Array.from(usedPlacesAcrossTrip)
      });

      // Track used places to guarantee Day 1 != Day 2 != Day 3 != Day N
      if (dayPlan.activities) {
        dayPlan.activities.forEach(a => {
          if (a.name) usedPlacesAcrossTrip.add(a.name.toLowerCase());
          if (a.placeId) usedPlacesAcrossTrip.add(a.placeId);
        });
      }

      generatedDays.push(dayPlan);
    }

    const calculatedEndDate = plannerService.addDays(startDate, targetDays - 1);

    const tripObj = {
      destinationId: dest.id,
      destinationName: dest.name,
      country: dest.country || 'Global Destination',
      isInternational: !!dest.isInternational,
      destinationType: dest.type,
      startDate,
      endDate: calculatedEndDate,
      numberOfDays: targetDays,
      daysCount: targetDays,
      budget: Number(budget) || 35000,
      currency: currency || dest.currency || 'INR',
      currencySymbol: currencySymbol || dest.currencySymbol || '₹',
      travelers: Number(travelers) || 1,
      interests,
      travelStyle,
      days: generatedDays,
      source: '🤗 Hugging Face AI',
      status: 'Upcoming'
    };

    const budgetStats = plannerService.computeBudget(tripObj, dest);
    tripObj.budgetStats = budgetStats;

    console.log('Hugging Face AI generated numberOfDays:', targetDays);
    console.log('generated itinerary length:', generatedDays.length);
    console.log('generated day numbers:', generatedDays.map(d => d.dayNumber));

    return res.json({
      success: true,
      message: `Generated ${targetDays}-day trip for ${dest.name} with Hugging Face AI!`,
      trip: tripObj,
      data: tripObj
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Chat with Hugging Face AI Travel Assistant
// @route   POST /api/ai/huggingface/chat
router.post('/huggingface/chat', async (req, res) => {
  try {
    const { message, destinationName, destinationId, tripContext, tripId, token, model } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    const customToken = token || req.headers['x-hf-token'] || process.env.HUGGINGFACE_API_TOKEN;
    const destName = destinationName || tripContext?.destinationName || tripContext?.destinationId || destinationId;
    const destId = destinationId || tripContext?.destinationId;
    const context = {
      currentDestinationName: destName,
      currentDestinationId: destId,
      tripId: tripId || tripContext?._id || tripContext?.id
    };

    const replyText = await chatWithHuggingFace(message, context, {
      token: customToken,
      model
    });

    if (replyText) {
      return res.json({
        success: true,
        source: '🤗 Hugging Face AI',
        reply: replyText,
        data: {
          id: 'msg-hf-' + Date.now(),
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Fallback to chatbotService if HF is unavailable
    const chatbotService = require('../services/chatbotService');
    const fallbackResponse = chatbotService.generateAssistantReply(message, context);
    return res.json({
      success: true,
      source: 'TripMate Smart Engine',
      reply: fallbackResponse.reply,
      data: {
        id: 'msg-rep-' + Date.now(),
        sender: 'assistant',
        text: fallbackResponse.reply,
        chips: fallbackResponse.chips,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
