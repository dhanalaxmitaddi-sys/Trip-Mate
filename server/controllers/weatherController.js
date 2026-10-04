const { getOrGenerateDestination } = require('../services/destinationService');
const plannerService = require('../services/plannerService');

// @desc    Get weather forecast for destination and trip dates (FR7 - Supports ANY global destination)
// @route   GET /api/weather
exports.getWeatherForecast = async (req, res) => {
  try {
    const { destinationId, destinationName, startDate, endDate } = req.query;

    const queryTarget = destinationId || destinationName;
    if (!queryTarget) {
      return res.status(400).json({ success: false, message: 'destinationId or destinationName is required' });
    }

    const dest = await getOrGenerateDestination(queryTarget);
    if (!dest) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    const numDays = plannerService.countDays(
      startDate || new Date().toISOString().split('T')[0],
      endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
    );
    const start = startDate ? new Date(startDate) : new Date();

    const forecastDays = [];
    const weatherList = dest.weather || [];

    for (let i = 0; i < numDays; i++) {
      const dayDate = new Date(start);
      dayDate.setDate(dayDate.getDate() + i);
      const month = dayDate.getMonth() + 1; // 1-12
      const monthWeather = weatherList.find(w => w.month === month) || weatherList[0] || {
        tempC: dest.type === 'hill' ? 16 : 28,
        condition: 'Pleasant',
        humidity: 55,
        icon: 'Sun',
        suggestion: `Pleasant weather in ${dest.name}, great for sightseeing.`
      };

      // Add natural day-to-day temperature variance (+/- 1-2 degrees)
      const dayVariance = ((i % 3) - 1);
      const tempC = monthWeather.tempC + dayVariance;

      forecastDays.push({
        dayNumber: i + 1,
        date: dayDate.toISOString().split('T')[0],
        tempC,
        tempF: Math.round((tempC * 9/5) + 32),
        condition: monthWeather.condition,
        humidity: monthWeather.humidity,
        icon: monthWeather.icon || 'Sun',
        suggestion: monthWeather.suggestion
      });
    }

    return res.json({
      success: true,
      destinationName: dest.name,
      destinationType: dest.type,
      count: forecastDays.length,
      data: forecastDays
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
