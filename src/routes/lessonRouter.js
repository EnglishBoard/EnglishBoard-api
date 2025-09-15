const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const validateLesson = require('../middlewares/validateLesson.js');

//get all classes
router.get("/", lessonController.getAllLessons);

//get lessons by grade
router.get("/grade/:gradeId", lessonController.getLessonsByGrade);

//get lesson by id
router.get("/:id", lessonController.getLessonById);

//create a new lesson
router.post("/", validateLesson, lessonController.createLesson);

//update a lesson
router.put("/:id", validateLesson, lessonController.updateLesson);

//delete a lesson
router.delete("/:id", lessonController.deleteLesson);

module.exports = router;