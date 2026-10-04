const { getOrGenerateDestination, searchAllDestinations } = require('../services/destinationService');

// @desc    Get all destinations with global search & filter
// @route   GET /api/destinations
exports.getDestinations = async (req, res) => {
  try {
    const { search, filter } = req.query;
    const destinations = searchAllDestinations(search, filter);

    const list = destinations.map(d => ({
      id: d.id,
      name: d.name,
      country: d.country,
      isInternational: d.isInternational,
      type: d.type,
      state: d.state,
      tagline: d.tagline,
      description: d.description,
      coverImage: d.coverImage,
      placesCount: (d.places && d.places.length) || 6,
      hotelRate: d.hotelRate,
      foodRate: d.foodRate,
      transportRate: d.transportRate,
      coordinates: d.coordinates
    }));

    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single destination with places, stays, food & weather (Supports ANY world destination)
// @route   GET /api/destinations/:id
exports.getDestinationById = async (req, res) => {
  try {
    const dest = await getOrGenerateDestination(req.params.id);
    if (!dest) {
      return res.status(404).json({ success: false, message: 'Invalid destination' });
    }
    return res.json({ success: true, data: dest });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recommended places for any destination with search & filter (FR4)
// @route   GET /api/destinations/:id/places
exports.getPlaces = async (req, res) => {
  try {
    const dest = await getOrGenerateDestination(req.params.id);
    if (!dest || !dest.places) {
      return res.status(404).json({ success: false, message: 'Places not found for destination' });
    }

    const { search, category } = req.query;
    let results = [...dest.places];

    if (category && category !== 'All') {
      results = results.filter(p =>
        (p.category && p.category.toLowerCase() === category.toLowerCase()) ||
        (p.tags && p.tags.map(t => t.toLowerCase()).includes(category.toLowerCase()))
      );
    }

    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return res.json({
      success: true,
      count: results.length,
      destinationName: dest.name,
      data: results
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
