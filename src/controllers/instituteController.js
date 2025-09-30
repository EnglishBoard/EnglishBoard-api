const Institute = require("../models/InstituteSchema");

// Get all institutes
const getAllInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find().select("-__v -createdAt -updatedAt")
      .populate({
        path: "grades",
        select: "-institute -__v -createdAt -updatedAt",
        populate: { path: "lessonCount" },
    });
    res.status(200).json(institutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get institute by ID
const getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id)
      .populate({
        path: "grades",
        select: "-institute -__v -createdAt -updatedAt",
        populate: { path: "lessonCount" }, // 🔹 agrega la cantidad de lecciones
      });

    if (!institute) return res.status(404).json({ message: "Institute not found" });

    res.status(200).json(institute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new institute
const createInstitute = async (req, res) => {
  try {
    const institute = new Institute(req.body);
    await institute.save();
    res.status(201).json(institute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an institute
const updateInstitute = async (req, res) => {
  try {
    const updated = await Institute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Institute not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an institute
const deleteInstitute = async (req, res) => {
  try {
    const deleted = await Institute.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Institute not found" });
    res.status(200).json({ message: "Institute deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
  deleteInstitute,
};
