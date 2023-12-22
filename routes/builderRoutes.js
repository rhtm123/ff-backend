const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builderController');

// CRUD operations
router.post('/', builderController.createBuilder);
router.get('/', builderController.getBuilders);
router.get("/:id", builderController.getBuilderById);
router.put('/:id', builderController.updateBuilder);
router.delete('/:id', builderController.deleteBuilder);

module.exports = router;