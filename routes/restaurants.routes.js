const express = require('express');

// Middlewares
const {
    restaurantExists, restaurantExistsForReview
} = require('../middlewares/restaurants.middlewares');

const {
    protectToken,
    protectAdmin
} = require('../middlewares/users.middlewares');

const {
    createRestaurantValidations,
    createReviewValidations,
    checkValidations
} = require('../middlewares/validations.middlewares');

// Controllers
const {
    getAllRestaurants,
    getRestaurantByID,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/restaurants.controller');

const router = express.Router();

// No Token Needed

router.get('/', getAllRestaurants);
router.get('/:id', restaurantExists, getRestaurantByID);

// Apply protectToken middleware

router.use(protectToken);

router.post('/', createRestaurantValidations, checkValidations, createRestaurant);
router.patch('/:id', protectAdmin, restaurantExists, updateRestaurant);
router.delete('/:id', protectAdmin, restaurantExists, deleteRestaurant);

// Reviews

router.post('/:restaurantId/reviews', restaurantExistsForReview, createReviewValidations, checkValidations, createReview);
router.patch('/:restaurantId/reviews/:id', restaurantExistsForReview, updateReview);
router.delete('/:restaurantId/reviews/:id', restaurantExistsForReview, deleteReview);

module.exports = { restaurantsRouter: router };