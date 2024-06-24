// Trips controller


// TODO: May have to capitalize var names
const mongoose = require(`mongoose`);
const Trip = require(`../models/travlr`); //register model
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client

const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    //uncomment to show results of query
    //console.log(q)


    if (!q) { //database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
}

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client


const tripsAddTrip = async(req, res) => {
    getUser(req, res, async (req, res, userName) => {
        try {
            const newTrip = new Trip({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            });

            const savedTrip = await newTrip.save();

            return res.status(201).json(savedTrip); // return new trip
        } catch (err) {
            return res.status(400).json(err); // bad request
        }
    });
}

/*
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q)
        {// database returned no data
            return res
                .status(400)
                .json(err);    
        } else { // return new trip
            return res
                .status(201)
                .json(q);
        }
};
*/

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    try {
        const q = await Model
        .findOneAndUpdate(
            {'code': req.params.tripCode},
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if (!q) {
            return res.status(404).json({ message: 'Trip not found' });
          }
      
          res.status(200).json(q);
        
    } catch (err) {
        res.status(400).json(err);
    }

}

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single record
        .exec();

    //uncomment to show results of query
    //console.log(q)


    if (!q) { //database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
}

const User = mongoose.model('users');                 
const getUser = async (req, res, callback) => {
    if (req.payload && req.payload.email) {
      try {
        const user = await User.findOne({ email: req.payload.email }).exec();
        if (!user) {
          return res.status(404).json({ "message": "User not found" });
        }
        callback(req, res, user.name);
      } catch (err) {
        console.log(err);
        return res.status(404).json(err);
      }
    } else {
      return res.status(404).json({ "message": "User not found" });
    }
  };

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    getUser
}