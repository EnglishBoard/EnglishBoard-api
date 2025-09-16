const mongoose = require('mongoose');
const moduleSchema = require('./Module');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  gradeId: {
    type: String,
    trim: true,
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
  upload_date:{
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
});

module.exports = mongoose.model('Lesson', lessonSchema);
