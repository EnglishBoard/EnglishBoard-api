const Grade = require("../models/GradeSchema");
const Lesson = require("../models/Lesson");
const Institute = require("../models/InstituteSchema");


// Get all grades (with lesson count)
const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate("institute", "name")
      .lean();

    // Añadir cantidad de lecciones
    const gradesWithLessons = await Promise.all(
      grades.map(async (grade) => {
        const lessonCount = await Lesson.countDocuments({ gradeId: grade._id });
        return { ...grade, lessonCount };
      })
    );

    res.status(200).json(gradesWithLessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get grade by ID
const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate("institute", "name")
      .populate("lessons", "-__v");
    if (!grade) return res.status(404).json({ message: "Grade not found" });
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new grade
const createGrade = async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save();

    // actualizar referencia en el instituto
    await Institute.findByIdAndUpdate(
      grade.institute, // ojo: minúscula
      { $push: { grades: grade._id } }
    );

    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update a grade
const updateGrade = async (req, res) => {
  try {
    const updated = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Grade not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a grade
const deleteGrade = async (req, res) => {
  try {
    const deleted = await Grade.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Grade not found" });
    res.status(200).json({ message: "Grade deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};
