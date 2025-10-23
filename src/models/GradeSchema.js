const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    unitNumber: {
      type: Number,
    },
  },
  { _id: true }
);

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
    units: {
      type: [unitSchema],
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

gradeSchema.pre('save', function (next) {
  if (this.isModified('units') || this.isNew) {
    
    this.units.forEach((unit, index) => {
      unit.unitNumber = index + 1;
    });
  }
  
  next();
});

gradeSchema.virtual("lessonCount", {
  ref: "Lesson",
  localField: "_id",
  foreignField: "gradeId",
  count: true,
});

module.exports = mongoose.model("Grade", gradeSchema);
