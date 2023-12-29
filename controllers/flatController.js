const Flat = require('../models/flatModel');
const Wing = require('../models/wingModel');

const defaultPageSize = 10;

const createFlat = async (req, res) => {
  try {
    const flat = new Flat(req.body);
    const savedFlat = await flat.save();
    res.status(201).json(savedFlat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get paginated list of flats.
 * Query parameters: page, pageSize, societyId, search
 */

const getFlats = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;


    let query = {}; // Initialize an empty query object

    // Check if societyId is provided in the query parameters
    if (req.query.societyId) {
      const wings = await Wing.find({ societyId: req.query.societyId });

      // Extract wingIds from the wings
      const wingIds = wings.map((wing) => wing._id);

      // Add wingId filter to the query
      query.wingId = { $in: wingIds };
    }

    // Check if wingId is provided in the query parameters
    if (req.query.wingId) {
      query.wingId = req.query.wingId;
    }

    // Check if there's a search query
    if (req.query.search) {
      // Add a case-insensitive search for the flat name
      query.name = { $regex: new RegExp(req.query.search, 'i') };
    }

    const totalCount = await Flat.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const flats = await Flat.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      flats,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    res.json(flat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFlat = async (req, res) => {
  try {
    const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(flat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flat deleted successfully', flat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createFlat,
  getFlats,
  updateFlat,
  deleteFlat,
  getFlatById,
};
