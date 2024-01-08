const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },

  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: false },

  agreementMonth: {type: Number,},
  policeVerified: {type: Boolean, default: false},

  moveInDate: { type: Date },
  moveOutDate: { type: Date },



  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
