const mongoose = require('mongoose');

const bcrypt = require('bcrypt');


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


// Hash the password before saving
memberSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

// Compare password method
memberSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
