// complaintController.js
const Complaint = require("../models/complaintModel");

// Create
const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all complaints with pagination
/**
 * Get paginated list of complaints.
 * Query parameters: page, pageSize
 */
const getComplaints = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // Set a default page size

    const totalCount = await Complaint.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const complaints = await Complaint.find()
      .populate('flatId memberId')
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      complaints,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a single complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('flatId memberId');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint deleted successfully', complaint });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  getComplaintById,
};
