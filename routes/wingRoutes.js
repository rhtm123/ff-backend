const express = require('express');
const router = express.Router();
const wingController = require('../controllers/wingController');

// CRUD operations
router.post('/', wingController.createWing);
router.get('/', wingController.getWings);
router.get('/:id', wingController.getWingById);
router.put('/:id', wingController.updateWing);
router.delete('/:id', wingController.deleteWing);

module.exports = router;
