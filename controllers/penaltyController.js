const Penalty = require('../models/penaltyModel');

const defaultPageSize = 10

// Create
const createPenalty = async (req, res) => {
    try {
      const penalty = new Penalty(req.body);
      const savedPenalty = await penalty.save();
      await savedPenalty.populate(["societyId"]);

      res.status(201).json(savedPenalty);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Read all Penalties with pagination
const getPenalties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;
    let query = {}; // Initialize an empty query object


    if (req.query.societyId) {
      query.societyId = req.query.societyId;
    }

    const totalCount = await Penalty.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);




    const penalties = await Penalty.find(query).populate(["societyId"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      penalties,
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
const getPenaltyById = async (req, res) => {
  try {
    const penalty = await Penalty.findById(req.params.id);
    await penalty.populate(["societyId"]);


    if (!penalty) {
      return res.status(404).json({ message: 'Penalty not found' });
    }
    res.json(penalty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updatePenalty = async (req, res) => {
try {
  const penalty = await Penalty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  await penalty.populate(["societyId"]);


  res.json(penalty);
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

// Delete
const deletePenalty = async (req, res) => {
try {
  const penalty = await Penalty.findByIdAndDelete(req.params.id);
  res.json({ message: 'Penalty deleted successfully', penalty });
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

module.exports = {
createPenalty,
getPenalties,
updatePenalty,
deletePenalty,
getPenaltyById
};


 