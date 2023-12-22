const Builder = require('../models/builderModel');
const constants = require('../config/constants');

// Create
const createBuilder = async (req, res) => {
  try {
    const builder = new Builder(req.body);
    const savedBuilder = await builder.save();
    res.status(201).json(savedBuilder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all builders with pagination
const getBuilders = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || constants.defaultPageSize;
  
      const totalCount = await Builder.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);
  
      const builders = await Builder.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      res.json({
        builders,
        page,
        pageSize,
        totalCount,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Read a single builder by ID
const getBuilderById = async (req, res) => {
    try {
      const builder = await Builder.findById(req.params.id);
      if (!builder) {
        return res.status(404).json({ message: 'Builder not found' });
      }
      res.json(builder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Update
const updateBuilder = async (req, res) => {
  try {
    const builder = await Builder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(builder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteBuilder = async (req, res) => {
  try {
    const builder = await Builder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Builder deleted successfully', builder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBuilder,
  getBuilders,
  updateBuilder,
  deleteBuilder,
  getBuilderById
};
