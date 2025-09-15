const mongoose = require('mongoose');

const theoryBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'list', 'example', 'tip', 'image', 'table', 'video'],
    required: true
  },
  content: String, // For paragraph, example, tip
  items: [String], // For list
  url: String,     // For image or video
  caption: String, // For image or video
  headers: [String], // For table
  rows: [[String]]   // For table 
});

module.exports = theoryBlockSchema;
