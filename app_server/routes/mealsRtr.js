/* about router */

const express = require('express');
const router = express.Router();
const ctrlMeals = require('../controllers/ctrlMeals');

/* GET home page. */
router.get('/', ctrlMeals.meals);

module.exports = router;