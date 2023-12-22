const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  builderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Builder', required: true },
  name: { type: String, required: true },
  possessionDate: { type: Date },
  address: { type: String },
  rera: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Society = mongoose.model('Society', societySchema);

module.exports = Society;
