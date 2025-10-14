const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    instituteColor: {
      type: String,
      default: "#000000", // color por defecto
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institute", instituteSchema);
