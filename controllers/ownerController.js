const Owner = require('../models/ownerModel');
const Member = require('../models/memberModel');

const defaultPageSize = 10;

const createOwner = async (req, res) => {
  try {
    const owner = new Owner(req.body);
    const savedOwner = await owner.save();
    await savedOwner.populate(["flatId","memberId"]);
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

    let memberQuery = {}; // Initialize an empty query object for members

    // Check if search query is provided for member's name
    if (req.query.search) {
      // Add a regex search for the nested memberId.name field
      memberQuery.name = { $regex: new RegExp(req.query.search, 'i') };
    }

    if (req.query.role) {
      // Add a regex search for the nested memberId.name field
      memberQuery.role = req.query.role;
    }

    if (req.query.isCommitteeMember) {
      // Add a regex search for the nested memberId.name field
      memberQuery.isCommitteeMember = req.query.isCommitteeMember;
    }

    if (req.query.societyId) {
      memberQuery.societyId = req.query.societyId;
    }
    // Find members with the given name query
    const members = await Member.find(memberQuery);
    const memberIds = members.map(member => member._id);


    let ownerQuery = {}; // Initialize an empty query object for owners

    // Check if flatId is provided in the query parameters
    if (req.query.flatId) {
      ownerQuery.flatId = req.query.flatId;
    }

    if (req.query.memberId) {
      ownerQuery.memberId = req.query.memberId;
    }

    if (memberIds.length > 0) {
      ownerQuery.memberId = { $in: memberIds };
    }

    const totalCount = await Owner.countDocuments(ownerQuery);
    const totalPages = Math.ceil(totalCount / pageSize);

    const owners = await Owner.find(ownerQuery).populate(["flatId", "memberId"])
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
    await owner.populate(["flatId","memberId"]);

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
    await owner.populate(["flatId","memberId"]);
    res.json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (owner) {
      await owner.removeWithFamily();
    }
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
