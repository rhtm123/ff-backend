const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, maxlength: 255 },
  email: { type: String },
  name: { type: String },
  password: { type: String },
  isOwner: { type: Boolean, default: false },
  isTenant: { type: Boolean, default: false },
  canAccess: { type: Boolean, default: false },
  superAccess: { type: Boolean, default: false },
  mobile: { type: String },
  dateOfBirth: { type: Date },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },

  // Foreign Key Relationship
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
