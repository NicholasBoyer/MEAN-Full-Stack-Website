/* Contact router */

const express = require('express');
const router = express.Router();
const ctrlContact = require('../controllers/ctrlContact');

/* GET home page. */
router.get('/', ctrlContact.contact);

module.exports = router;