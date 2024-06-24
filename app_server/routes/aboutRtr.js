/* about router */

const express = require('express');
const router = express.Router();
const ctrlAbout = require('../controllers/ctrlAbout');

/* GET home page. */
router.get('/', ctrlAbout.about);

module.exports = router;
