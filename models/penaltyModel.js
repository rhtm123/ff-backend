const mongoose = require('mongoose');

const penaltySchema = new mongoose.Schema({
    societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
    name: { type: String },
    amount: { type: Number },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  });
  
  const Penalty = mongoose.model('Penalty', penaltySchema);
  
  module.exports = Penalty;