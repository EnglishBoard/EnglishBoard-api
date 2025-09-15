const express = require("express");
const app = express();

const lessonRouter = require('./lessonRouter.js');

app.use('/lesson', lessonRouter);

module.exports = app