const express = require('express');

const router = express.Router();
const contactController = require('../controllers/contactController.js');

//send email
router.post("/", contactController.sendEmail);

module.exports = router;
