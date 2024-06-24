/* about router */

const express = require('express');
const router = express.Router();
const ctrlNews = require('../controllers/ctrlNews');

/* GET home page. */
router.get('/', ctrlNews.news);

module.exports = router;