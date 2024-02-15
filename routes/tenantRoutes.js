const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for temporary storage

// CRUD operations
router.post('/', tenantController.createTenant);
router.get('/', tenantController.getTenants);
router.get('/:id', tenantController.getTenantById);
router.put('/:id', tenantController.updateTenant);
router.delete('/:id', tenantController.deleteTenant);
router.post('/upload/:id',upload.single('file'),tenantController.uploadFile)

module.exports = router;
