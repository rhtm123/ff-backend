const Tenant = require('../models/tenantModel');

const defaultPageSize = 10;

/**
 * Create a new tenant.
 */
const createTenant = async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    const savedTenant = await tenant.save();
    await savedTenant.populate('memberId');

    res.status(201).json(savedTenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get paginated list of tenants.
 * Query parameters: page, pageSize, flatId, memebrId
 */
const getTenants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    // Check if builderId is provided in the query parameters
    let query = {}; // Initialize an empty query object


    if (req.query.flatId) {
      query.flatId = req.query.flatId;
    }

    if (req.query.memberId) {
      query.memberId = req.query.memberId;
    }


    const totalCount = await Tenant.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const tenants = await Tenant.find(query).populate(["flatId","memberId"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      tenants,
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
 * Get a tenant by ID.
 */
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

/**
 * Update a tenant by ID.
 */
const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a tenant by ID.
 */
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
