const mongoose = require('mongoose');
const exerciseCaseSchema = require('./ExerciseCaseSchema');

const exerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['fill-in', 'multiple-choice', 'true-false', 'matching'],
    required: true
  },
  instructions: String,
  cases: [exerciseCaseSchema]
});

module.exports = exerciseSchema;