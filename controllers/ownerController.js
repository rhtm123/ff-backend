const Owner = require('../models/ownerModel');

// CRUD operations for owners
const createOwner = async (req, res) => {
  try {
    const owner = new Owner(req.body);
    const savedOwner = await owner.save();
    res.status(201).json(savedOwner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Owner deleted successfully', owner });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOwner,
  getOwners,
  updateOwner,
  deleteOwner,
  getOwnerById,
};
