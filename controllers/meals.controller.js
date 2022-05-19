// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meal.findAll({
        where: { status: 'active' },
        include: [
            { model: Restaurant }
        ]
    })

    res.status(200).json({ meals });
});

const getMealById = catchAsync(async (req, res, next) => {
    const { meal } = req;

    res.status(200).json({ meal })
});

const createMeal = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, price } = req.body;

    const newMeal = await Meal.create({
        name,
        price,
        restaurantId: restaurant.id
    });

    res.status(201).json({ newMeal });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({ name, price });

    res.status(201).json({
        status: 'success',
        meal
    });
});

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    await meal.update({ status: 'disabled' });

    res.status(201).json({
        status: 'success',
        meal
    });
});

module.exports = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal
};