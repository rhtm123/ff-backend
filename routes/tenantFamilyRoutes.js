const express = require('express');
const router = express.Router();
const tenantFamilyController = require('../controllers/tenantFamilyController');

// CRUD operations
router.post('/', tenantFamilyController.createTenantFamily);
router.get('/', tenantFamilyController.getTenantFamilies);
router.get('/:id', tenantFamilyController.getTenantFamilyById);
router.put('/:id', tenantFamilyController.updateTenantFamily);
router.delete('/:id', tenantFamilyController.deleteTenantFamily);

module.exports = router;
