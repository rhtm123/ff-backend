const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  wingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wing', required: true },
  name: { type: String, required: true },
  floorNumber: { type: Number },
  
  occupied: { type: Boolean, default: false },
  category: { type: String},
  // Add other flat properties as needed

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Flat = mongoose.model('Flat', flatSchema);

module.exports = Flat;
