const express = require('express');
const router = express.Router();
const penaltyController = require('../controllers/penaltyController');

// router.use(authenticateToken);

// CRUD operations
router.post('/', penaltyController.createPenalty);
router.get('/', penaltyController.getPenalties);
router.get("/:id", penaltyController.getPenaltyById);
router.put('/:id', penaltyController.updatePenalty);
router.delete('/:id', penaltyController.deletePenalty);

module.exports = router;