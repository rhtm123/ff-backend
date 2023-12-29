const Society = require('../models/societyModel');
const constants = require('../config/constants');

const defaultPageSize = 10


// Create
const createSociety = async (req, res) => {
  try {
    const society = new Society(req.body);
    const savedSociety = await society.save();
    res.status(201).json(savedSociety);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all societies with pagination
/**
 * Get paginated list of wings.
 * Query parameters: page, pageSize, builderId
 */
const getSocieties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    let query = {}; // Initialize an empty query object

    // Check if builderId is provided in the query parameters
    if (req.query.builderId) {
      query.builderId = req.query.builderId;
    }

    const totalCount = await Society.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const societies = await Society.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      societies,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Read a single society by ID
const getSocietyById = async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }
    res.json(society);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(society);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndDelete(req.params.id);
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }
    res.json({ message: 'Society deleted successfully', society });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSociety,
  getSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety,
};

