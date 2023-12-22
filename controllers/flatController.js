const Flat = require('../models/flatModel');

// CRUD operations for flats
const createFlat = async (req, res) => {
  try {
    const flat = new Flat(req.body);
    const savedFlat = await flat.save();
    res.status(201).json(savedFlat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.json(flats);
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
