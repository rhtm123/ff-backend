const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  possessionDate: { type: Date },
  isLiving: { type: Boolean },
  sellDate: { type: Date },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
