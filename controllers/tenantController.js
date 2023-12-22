const Tenant = require('../models/tenantModel');

// CRUD operations for tenants
const createTenant = async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    const savedTenant = await tenant.save();
    res.status(201).json(savedTenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tenant deleted successfully', tenant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTenant,
  getTenants,
  updateTenant,
  deleteTenant,
  getTenantById,
};
