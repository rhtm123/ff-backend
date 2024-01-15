const mongoose = require('mongoose');

const ownerFamilySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },

  relation: {type: String},
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});



const OwnerFamily = mongoose.model("OwnerFamily", ownerFamilySchema);

module.exports = OwnerFamily;
