const express = require('express');
const router = express.Router();
const flatController = require('../controllers/flatController');

// CRUD operations
router.post('/', flatController.createFlat);
router.get('/', flatController.getFlats);
router.get('/:id', flatController.getFlatById);
router.put('/:id', flatController.updateFlat);
router.delete('/:id', flatController.deleteFlat);

module.exports = router;
