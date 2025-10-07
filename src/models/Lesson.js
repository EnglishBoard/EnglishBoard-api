const mongoose = require('mongoose');
const moduleSchema = require('./Module');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  gradeId: {
    type: mongoose.Schema.Types.ObjectId, // ahora referencia a Grade
    ref: "Grade",
    required: true
  },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  shortDescription: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  type: {
    type: String,
    enum: ['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'speaking'],
    required: true
  },
  upload_date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "upload date must be today"
    }
  },
  modules: [moduleSchema]
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
