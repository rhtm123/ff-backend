const mongoose = require('mongoose');
const TenantFamily  = require("./tenantFamilyModel");

const tenantSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },

  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: false },

  agreementMonth: {type: Number,},
  policeVerified: {type: Boolean, default: false},

  agreementFile: { type: String,},
  agreementFilePublicId: { type: String,},
  policeVerificationFile: { type: String},
  policeVerificationFilePublicId: { type: String},

  moveInDate: { type: Date },
  moveOutDate: { type: Date },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

// Define a method to remove associated OwnerFamily documents
tenantSchema.methods.removeWithFamily = async function () {
  try {
    console.log("Removing associated OwnerFamily documents");
    // Use the OwnerFamily model to delete all OwnerFamily documents with the ownerId
    await TenantFamily.deleteMany({ tenantId: this._id });
    // Now remove the Owner
    // await this.remove();
  } catch (error) {
    throw error;
  }
};

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
