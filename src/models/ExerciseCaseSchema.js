const mongoose = require('mongoose');

const exerciseCaseSchema = new mongoose.Schema({
  question: String,
  answer: mongoose.Schema.Types.Mixed,
  options: [String],
  statement: String,
  pairs: [
    {
      left: String,
      right: String
    }
  ]

});

module.exports = exerciseCaseSchema;
