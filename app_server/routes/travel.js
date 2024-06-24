const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/travel');

/* GET Travel page */
router.get('/', ctrlTravel.travel);

module.exports = router;
