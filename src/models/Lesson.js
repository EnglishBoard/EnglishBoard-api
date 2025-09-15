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
  modules: [moduleSchema]
});

module.exports = mongoose.model('Lesson', lessonSchema);
