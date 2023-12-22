const OwnerFamily = require('../models/ownerFamilyModel');

// CRUD operations for owner families
const createOwnerFamily = async (req, res) => {
  try {
    const ownerFamily = new OwnerFamily(req.body);
    const savedOwnerFamily = await ownerFamily.save();
    res.status(201).json(savedOwnerFamily);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOwnerFamilies = async (req, res) => {
  try {
    const ownerFamilies = await OwnerFamily.find();
    res.json(ownerFamilies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOwnerFamilyById = async (req, res) => {
  try {
    const ownerFamily = await OwnerFamily.findById(req.params.id);
    if (!ownerFamily) {
      return res.status(404).json({ message: 'OwnerFamily not found' });
    }
    res.json(ownerFamily);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOwnerFamily = async (req, res) => {
  try {
    const ownerFamily = await OwnerFamily.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ownerFamily);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOwnerFamily = async (req, res) => {
  try {
    const ownerFamily = await OwnerFamily.findByIdAndDelete(req.params.id);
    res.json({ message: 'OwnerFamily deleted successfully', ownerFamily });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOwnerFamily,
  getOwnerFamilies,
  updateOwnerFamily,
  deleteOwnerFamily,
  getOwnerFamilyById,
};
