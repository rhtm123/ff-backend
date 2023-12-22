const mongoose = require('mongoose');

const tenantFamilySchema = new mongoose.Schema({
  flatTenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const TenantFamily = mongoose.model('TenantFamily', tenantFamilySchema);

module.exports = TenantFamily;
