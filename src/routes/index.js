const express = require("express");
const app = express();

const lessonRouter = require('./lessonRouter.js');
const youtubeRouter = require('./youtubeRouter.js');
const contactRouter = require('./contactRouter.js');
const gradeRouter = require('./gradeRouter.js');
const instituteRouter = require('./instituteRouter.js');


app.use('/lesson', lessonRouter);
app.use('/youtube', youtubeRouter);
app.use('/contact', contactRouter);
app.use('/institute', instituteRouter);
app.use('/grade', gradeRouter);

module.exports = app