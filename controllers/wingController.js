const Wing = require('../models/wingModel');

const defaultPageSize = 10;

/**
 * Create a new wing.
 */
const createWing = async (req, res) => {
  try {
    const wing = new Wing(req.body);
    const savedWing = await wing.save();
    res.status(201).json(savedWing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get paginated list of wings.
 * Query parameters: page, pageSize, societyId
 */
const getWings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    let query = {}; // Initialize an empty query object

    // Check if societyId is provided in the query parameters
    if (req.query.societyId) {
      query.societyId = req.query.societyId;
    }

    const totalCount = await Wing.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const wings = await Wing.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      wings,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a wing by ID.
 */
const getWingById = async (req, res) => {
  try {
    const wing = await Wing.findById(req.params.id);
    if (!wing) {
      return res.status(404).json({ message: 'Wing not found' });
    }
    res.json(wing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update a wing by ID.
 */
const updateWing = async (req, res) => {
  try {
    const wing = await Wing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(wing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a wing by ID.
 */
const deleteWing = async (req, res) => {
  try {
    const wing = await Wing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Wing deleted successfully', wing });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWing,
  getWings,
  updateWing,
  deleteWing,
  getWingById,
};
