const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// CRUD operations for members
router.post('/', memberController.createMember);
router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMemberById);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;
