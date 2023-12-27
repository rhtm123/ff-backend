const TenantFamily = require('../models/tenantFamilyModel');

const defaultPageSize = 10;

/**
 * Create a new tenant family.
 */
const createTenantFamily = async (req, res) => {
  try {
    const tenantFamily = new TenantFamily(req.body);
    const savedTenantFamily = await tenantFamily.save();
    res.status(201).json(savedTenantFamily);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get paginated list of tenant families.
 * Query parameters: page, pageSize
 */
const getTenantFamilies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    const totalCount = await TenantFamily.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const tenantFamilies = await TenantFamily.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      tenantFamilies,
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
 * Get a tenant family by ID.
 */
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

/**
 * Update a tenant family by ID.
 */
const updateTenantFamily = async (req, res) => {
  try {
    const tenantFamily = await TenantFamily.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tenantFamily);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a tenant family by ID.
 */
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
