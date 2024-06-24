/* Rooms router */

const express = require('express');
const router = express.Router();
const ctrlRooms = require('../controllers/ctrlRooms.js');

/* GET Travel page */
router.get('/', ctrlRooms.rooms);

module.exports = router;