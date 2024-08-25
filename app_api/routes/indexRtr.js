const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});



const tripsCtlr = require('../controllers/tripsCtlr');
const mealsCtlr = require('../controllers/mealCtlr')
const authCtlr = require('../controllers/authentication');

router
    .route('/meals')
    .get(mealsCtlr.mealsList);

router
    .route('/trips')
    .get(tripsCtlr.tripsList) //GET Method routes tripList
    .post(auth, tripsCtlr.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode    
router
    .route('/trips/:tripCode')
    .get(tripsCtlr.tripsFindByCode)
    .put(auth, tripsCtlr.tripsUpdateTrip);

// Authentication
router
    .route('/login')
    .post(authCtlr.login);

router
    .route('/register')
    .post(authCtlr.register);

module.exports=router;