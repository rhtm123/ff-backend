const mongoose = require('mongoose');

const builderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String },
  ffrating: { type: Number },
  contact: { type: String },
  email: { type: String },
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Builder = mongoose.model("Builder", builderSchema);


module.exports = Builder;
