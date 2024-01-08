const express = require('express');
const router = express.Router();
const ownerPenaltyController = require('../controllers/ownerPenaltyController');

// router.use(authenticateToken);

// CRUD operations
router.post('/', ownerPenaltyController.createOwnerPenalty);
router.get('/', ownerPenaltyController.getOwnerPenalties);
router.get("/:id", ownerPenaltyController.getOwnerPenaltyById);
router.put('/:id', ownerPenaltyController.updateOwnerPenalty);
router.delete('/:id', ownerPenaltyController.deleteOwnerPenalty);

module.exports = router;