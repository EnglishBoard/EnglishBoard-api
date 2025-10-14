const express = require('express');

const router = express.Router();
const gradeController = require('../controllers/gradeController.js');
const validateGrade = require('../middlewares/validateGrade.js');

// Get grades by institute
router.get('/institute/:instituteId', gradeController.getGradesByInstitute);

// Get grade by id
router.get("/:id", gradeController.getGradeById);

// Create new grade
router.post("/", validateGrade, gradeController.createGrade);

// Update grade
router.put("/:id", validateGrade, gradeController.updateGrade);

// Delete grade
router.delete("/:id", gradeController.deleteGrade);

module.exports = router;
