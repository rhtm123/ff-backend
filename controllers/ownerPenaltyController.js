const OwnerPenalty = require('../models/ownerPenaltyModel');

const defaultPageSize = 10

// Create
const createOwnerPenalty = async (req, res) => {
    try {
      const ownerPenalty = new OwnerPenalty(req.body);
      const savedOwnerPenalty = await ownerPenalty.save();
      res.status(201).json(savedOwnerPenalty);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Read all Penalties with pagination
const getOwnerPenalties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    const totalCount = await OwnerPenalty.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const OwnerPenalties = await OwnerPenalty.find().populate(["penaltyId","ownerId"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      OwnerPenalties,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a single Penalty by ID
const getOwnerPenaltyById = async (req, res) => {
  try {
    const ownerPenalty = await OwnerPenalty.findById(req.params.id);
    if (!ownerPenalty) {
      return res.status(404).json({ message: 'OwnerPenalty not found' });
    }
    res.json(ownerPenalty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateOwnerPenalty = async (req, res) => {
try {
  const ownerPenalty = await OwnerPenalty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ownerPenalty);
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

// Delete
const deleteOwnerPenalty = async (req, res) => {
try {
  const ownerPenalty = await OwnerPenalty.findByIdAndDelete(req.params.id);
  res.json({ message: 'OwnerPenalty deleted successfully', ownerPenalty });
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

module.exports = {
createOwnerPenalty,
getOwnerPenalties,
updateOwnerPenalty,
deleteOwnerPenalty,
getOwnerPenaltyById
};


 