const Wing = require('../models/wingModel');

// CRUD operations for wings
const createWing = async (req, res) => {
  try {
    const wing = new Wing(req.body);
    const savedWing = await wing.save();
    res.status(201).json(savedWing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWings = async (req, res) => {
  try {
    const wings = await Wing.find();
    res.json(wings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

const updateWing = async (req, res) => {
  try {
    const wing = await Wing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(wing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
