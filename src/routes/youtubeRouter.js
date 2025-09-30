const express = require('express');

const router = express.Router();
const youtubeController = require('../controllers/youtubeController.js');

//get playlist all data
router.get("/playlist/:id", youtubeController.getPlaylist);


module.exports = router;
