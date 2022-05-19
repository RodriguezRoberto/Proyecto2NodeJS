const express = require('express');

// Middlewares
const {
    mealExists,
    restaurantExistsForMeal
} = require('../middlewares/meals.middlewares');

const {
    protectToken,
    protectAdmin
} = require('../middlewares/users.middlewares');

const {
    createMealValidations,
    checkValidations
} = require('../middlewares/validations.middlewares');

// Controllers
const {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal
} = require('../controllers/meals.controller');

const router = express.Router();

// No Token Needed

router.get('/', getAllMeals);
router.get('/:id', mealExists, getMealById);

// Apply protectToken middleware

router.use( protectToken );

router.post('/:restaurantId', restaurantExistsForMeal, createMealValidations, checkValidations, createMeal);
router.patch('/:id', protectAdmin, mealExists, updateMeal);
router.delete('/:id', protectAdmin, mealExists, deleteMeal);

module.exports = { mealsRouter: router };