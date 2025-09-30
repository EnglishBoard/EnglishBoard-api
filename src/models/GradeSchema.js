const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    logo: {
      type: String,
      default: "",
    },
    gradeColor: {
      type: String,
      default: "#000000",
    },
    playlistId: {
      type: String,
      default: "",
    },
    isExam: {
      type: Boolean,
      required: true,
      default: false,
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// 🔹 Virtual para contar lecciones
gradeSchema.virtual("lessonCount", {
  ref: "Lesson",
  localField: "_id",
  foreignField: "gradeId",
  count: true, // devuelve el número de documentos
});

module.exports = mongoose.model("Grade", gradeSchema);
