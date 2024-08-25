// Meals controller

const mongoose = require('mongoose');
const Meal = require('../models/travlr'); // Register model
const MealModel = mongoose.model('meals');

// GET: /meals - Lists all meals
const mealsList = async (req, res) => {
  try {
    const meals = await MealModel.find({}).exec(); // No filter, return all records

    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: 'No meals found' });
    }

    return res.status(200).json(meals);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// POST: /meals - Adds a new Meal
const mealsAddMeal = async (req, res) => {
  try {
    const newMeal = new Meal({
      image: req.body.image,
      name: req.body.name,
      description: req.body.description,
    });

    const savedMeal = await newMeal.save();
    return res.status(201).json(savedMeal); // Return new meal
  } catch (err) {
    return res.status(400).json(err); // Bad request
  }
};

// PUT: /meals/:mealId - Updates an existing Meal
const mealsUpdateMeal = async (req, res) => {
  try {
    const meal = await MealModel.findByIdAndUpdate(
      req.params.mealId,
      {
        image: req.body.image,
        name: req.body.name,
        description: req.body.description,
      },
      { new: true } // Return the updated document
    ).exec();

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    return res.status(200).json(meal);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// GET: /meals/:mealId - Find a meal by its ID
const mealsFindById = async (req, res) => {
  try {
    const meal = await MealModel.findById(req.params.mealId).exec();

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    return res.status(200).json(meal);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  mealsList,
  mealsAddMeal,
  mealsUpdateMeal,
  mealsFindById,
};
