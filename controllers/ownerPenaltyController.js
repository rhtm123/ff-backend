const Owner = require('../models/ownerModel');
const OwnerPenalty = require('../models/ownerPenaltyModel');
const sendEmail =  require("../utils/sendEmail");

const defaultPageSize = 10

// Create
const createOwnerPenalty = async (req, res) => {
    try {
      const ownerPenalty = new OwnerPenalty(req.body);
      const savedOwnerPenalty = await ownerPenalty.save();
      

      await savedOwnerPenalty.populate(["penaltyId","ownerId"]);
      // console.log(savedOwnerPenalty);

      res.status(201).json(savedOwnerPenalty);

      const owner  = await Owner.findById(savedOwnerPenalty.ownerId).populate(['flatId',"memberId"]);

      // console.log(owner);
      let recipientMail = owner?.memberId?.email;

      let penaltyName = savedOwnerPenalty.penaltyId.name; 
      let penaltyAmount = savedOwnerPenalty.penaltyId.amount;

      if (recipientMail){
        // console.log(recipientMail);
        sendEmail(recipientMail, penaltyName + " " + penaltyAmount, "<h1>Panalty imposed by Society Sathi</h1>")
      }

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Read all Penalties with pagination
const getOwnerPenalties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    // penaltyId, ownerId

    let query = {}; // Initialize an empty query object

    // Check if societyId is provided in the query parameters
    if (req.query.penaltyId) {
      query.penaltyId = req.query.penaltyId;
    }

    if (req.query.ownerId) {
      query.ownerId = req.query.ownerId;
    }
    

    const totalCount = await OwnerPenalty.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const ownerPenalties = await OwnerPenalty.find(query).populate(["penaltyId","ownerId"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      ownerPenalties,
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
    await ownerPenalty.populate(["penaltyId","ownerId"])

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
  await ownerPenalty.populate(["penaltyId","ownerId"])

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


 