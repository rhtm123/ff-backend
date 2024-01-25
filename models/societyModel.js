const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  builderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Builder', required: true },
  name: { type: String, required: true },
  formationDate: { type: Date },
  registrationNumber: {type:String},
  address: {
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    PIN: { type: String }
  },
  rera: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Society = mongoose.model("Society", societySchema);

module.exports = Society;
