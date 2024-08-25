// Meals controller
const fetch = require('node-fetch'); // Ensure you have node-fetch installed or use native fetch in Node.js 18+
const mealsEndpoint = 'http://localhost:3000/api/meals';
const options = {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
};

/* GET meal view */
const meals = async function (req, res) {
    try {
        const response = await fetch(mealsEndpoint, options);
        const json = await response.json();

        let message = null;
        if (!Array.isArray(json)) {
            message = 'API lookup error';
            json = [];
        } else if (!json.length) {
            message = 'No meals exist in our database!';
        }

        res.render('meals', { title: 'Travlr Getaways', meals: json, message: message });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    meals
};
