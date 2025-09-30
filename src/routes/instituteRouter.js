const express = require('express');

const router = express.Router();
const instituteController = require('../controllers/instituteController.js');
const validateInstitute = require('../middlewares/validateInstitute.js');

// Get all institutes
router.get("/", instituteController.getAllInstitutes);

// Get institute by id
router.get("/:id", instituteController.getInstituteById);

// Create new institute
router.post("/", validateInstitute, instituteController.createInstitute);

// Update institute
router.put("/:id", validateInstitute, instituteController.updateInstitute);

// Delete institute
router.delete("/:id", instituteController.deleteInstitute);

module.exports = router;
