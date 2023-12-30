const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },

  agreementMonth: {type: Number,},
  policeVerified: {type: Boolean, default: false},

  startDate: { type: Date },
  leaveDate: { type: Date },



  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
