const Owner = require('../models/ownerModel');

const defaultPageSize = 10;

const createOwner = async (req, res) => {
  try {
    const owner = new Owner(req.body);
    const savedOwner = await owner.save();
    await savedOwner.populate('memberId').execPopulate();
    res.status(201).json(savedOwner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all owners with pagination
/**
 * Get paginated list of owners.
 * Query parameters: page, pageSize, flatId, memberId
 */
const getOwners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;



    let query = {}; // Initialize an empty query object

    // Check if builderId is provided in the query parameters
    if (req.query.flatId) {
      query.flatId = req.query.flatId;
    }

    if (req.query.memberId) {
      query.memberId = req.query.memberId;
    }

    const totalCount = await Owner.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const owners = await Owner.find(query).populate(["flatId","memberId"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      owners,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
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
