const Member = require('../models/memberModel');

const defaultPageSize = 10;

const jwt = require('jsonwebtoken');








// Create
const createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all members with pagination
const getMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    const totalCount = await Member.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const members = await Member.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
    //   .populate('societyId'); // Add this line to populate the society data


    res.json({
      members,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a single member by ID
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted successfully', member });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const loginMember = async (req, res) => {
  // console.log("login request")

  try {
    const { username, password } = req.body;
    // console.log(username, password);
    const member = await Member.findOne({ username });

    // console.log(member);

    if (!member) return res.status(401).json({ message: 'Invalid username or password' });

    const isPasswordValid = await member.comparePassword(password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ username: member.username, userId: member._id }, process.env.JWT_SECRET, {
      expiresIn: '30d', // Token expires in 1 hour
    });

    res.json({ token, member });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

 }
module.exports = {
  createMember,
  getMembers,
  updateMember,
  deleteMember,
  getMemberById,
  loginMember,
};
