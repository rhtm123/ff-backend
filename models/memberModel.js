const mongoose = require('mongoose');

const bcrypt = require('bcrypt');


const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  username: { type: String, unique: true, maxlength: 255 },
  email: { type: String, unique: true, lowercase: true, trim: true, match: /\S+@\S+\.\S+/ },
  password: { type: String },
  isOwner: { type: Boolean, default: false },
  isTenant: { type: Boolean, default: false },
  canAccess: { type: Boolean, default: false }, // this is only for dashboard access
  superAccess: { type: Boolean, default: false }, // this is only for dashboard access
  mobile: { type: String, trim: true }, // Normalize mobile number if needed
  dateOfBirth: { type: Date },
  birthYear: { type: Number }, // Add the birthYear field
  isCommitteeMember: {type: Boolean, default: false}, 
  gender: { type: String },  // <-- Added 'gender' field
  role: { type: String, required: true, default: "member" },
  profilePic: { type: String },  // <-- Added 'profilePic' field
 


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


const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
