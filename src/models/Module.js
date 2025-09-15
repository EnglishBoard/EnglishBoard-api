const mongoose = require('mongoose') 
const theoryBlockSchema = require('./TheoryBlockSchema')
const exerciseSchema = require('./ExerciseSchema')

const moduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  theory: [theoryBlockSchema],
  exercises: [exerciseSchema]
});

module.exports = moduleSchema;
