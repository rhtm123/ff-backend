const mongoose = require('mongoose');
const Wing = require('./wingModel');

const flatSchema = new mongoose.Schema({
  wingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wing', required: true },
  name: { type: String, required: true },
  wingName: { type: String },
  floorNumber: { type: Number },

  
  occupied: { type: Boolean, default: false },
  category: { type: String},
  // Add other flat properties as needed

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

flatSchema.pre('save', async function (next) {
  try {
    // Assuming 'Wing' model is used
    const wing = await Wing.findById(this.wingId);

    if (wing) {
      this.wingName = wing.name;
    } else {
      // Handle the case when the corresponding wing is not found
      // You can throw an error, set a default value, or handle it in any way you prefer
      throw new Error('Wing not found');
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Flat = mongoose.model("Flat", flatSchema);

module.exports = Flat;
