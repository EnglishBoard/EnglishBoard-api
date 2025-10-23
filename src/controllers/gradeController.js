const Grade = require("../models/GradeSchema");
const Lesson = require("../models/Lesson");
const Institute = require("../models/InstituteSchema");

const getGradesByInstitute = async (req, res) => {
  try {
    const { instituteId } = req.params;
    
    const grades = await Grade.find({ institute: instituteId })
      .populate("institute", "name")
      .lean();

    if (!grades.length) {
      return res.status(404).json({ message: 'No se encontraron grados para este instituto' });
    }

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

const getGradeById = async (req, res) => {
  try {
    const { id } = req.params;

    const grade = await Grade.findById(id).populate('institute');

    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }

    res.status(200).json(grade);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGrade = async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save(); 

    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);

    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }

    Object.assign(grade, req.body);
    
    const updated = await grade.save(); 

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
  getGradesByInstitute,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};
