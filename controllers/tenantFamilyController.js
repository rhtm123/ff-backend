const TenantFamily = require('../models/tenantFamilyModel');

// CRUD operations for tenant families
const createTenantFamily = async (req, res) => {
  try {
    const tenantFamily = new TenantFamily(req.body);
    const savedTenantFamily = await tenantFamily.save();
    res.status(201).json(savedTenantFamily);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTenantFamilies = async (req, res) => {
  try {
    const tenantFamilies = await TenantFamily.find();
    res.json(tenantFamilies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTenantFamilyById = async (req, res) => {
  try {
    const tenantFamily = await TenantFamily.findById(req.params.id);
    if (!tenantFamily) {
      return res.status(404).json({ message: 'TenantFamily not found' });
    }
    res.json(tenantFamily);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTenantFamily = async (req, res) => {
  try {
    const tenantFamily = await TenantFamily.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tenantFamily);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTenantFamily = async (req, res) => {
  try {
    const tenantFamily = await TenantFamily.findByIdAndDelete(req.params.id);
    res.json({ message: 'TenantFamily deleted successfully', tenantFamily });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTenantFamily,
  getTenantFamilies,
  updateTenantFamily,
  deleteTenantFamily,
  getTenantFamilyById,
};
