const mongoose = require('mongoose');
const OwnerFamily = require('./ownerFamilyModel');

const ownerSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  // this is the main owner
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true }, 
  ownershipType: {
    type: String,
    enum: ['owner', 'co-owner'],
    default: 'owner'
  },

  possessionDate: { type: Date },
  isLiving: { type: Boolean },
  saleDate: { type: Date },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

// Define a method to remove associated OwnerFamily documents
ownerSchema.methods.removeWithFamily = async function () {
  try {
    console.log("Removing associated OwnerFamily documents");
    // Use the OwnerFamily model to delete all OwnerFamily documents with the ownerId
    await OwnerFamily.deleteMany({ ownerId: this._id });
    // Now remove the Owner
    // await this.remove();
  } catch (error) {
    throw error;
  }
};

const Owner = mongoose.model('Owner', ownerSchema);


module.exports = Owner;
