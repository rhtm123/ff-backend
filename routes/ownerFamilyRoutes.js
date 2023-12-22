const express = require('express');
const router = express.Router();
const ownerFamilyController = require('../controllers/ownerFamilyController');

// CRUD operations
router.post('/', ownerFamilyController.createOwnerFamily);
router.get('/', ownerFamilyController.getOwnerFamilies);
router.get('/:id', ownerFamilyController.getOwnerFamilyById);
router.put('/:id', ownerFamilyController.updateOwnerFamily);
router.delete('/:id', ownerFamilyController.deleteOwnerFamily);

module.exports = router;
