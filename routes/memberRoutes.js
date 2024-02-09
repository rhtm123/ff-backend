const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for temporary storage



// CRUD operations for members
router.post('/', memberController.createMember);
router.post('/login', memberController.loginMember);
router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMemberById);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);
router.post("/upload-image/:id", upload.single('image'), memberController.uploadImage);

module.exports = router;
