// Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({
        where: { status: 'active' },
        include: [
            { 
                model: Review,
                required: false,
                where: { status: 'active' }
            }
        ]
    });

    res.status(200).json({ restaurants })
});

const getRestaurantByID = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    res.status(200).json({ restaurant })
});

const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;

    const newRestaurant = await Restaurant.create({
        name,
        address,
        rating
    });

    res.status(201).json({
        status: 'success',
        newRestaurant
    })
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, address } = req.body;

    await restaurant.update({ name, address });

    res.status(201).json({
        status: 'success',
        restaurant
    });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({ status: 'disabled' });

    res.status(201).json({
        status: 'success',
        restaurant
    });
});

const createReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;
    const { restaurant } = req;
    const { sessionUser } = req;

    const newReview = await Review.create({
        userId: sessionUser.id,
        comment,
        restaurantId: restaurant.id,
        rating
    });

    res.status(201).json({
        status: 'success',
        newReview
    });
});

const updateReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const { sessionUser } = req;

    const review = await Review.findOne({
        where: { id, status: 'active' }
    })

    if ( !review ) {
        return next(new AppError('No review found with the given ID or status active', 404));
    }

    if ( review.userId !== sessionUser.id ) {
        return next(new AppError('You cannot update this review because you do not own it', 401));
    }

    await review.update({ comment, rating });

    res.status(201).json({
        status: 'success',
        review
    });
});

const deleteReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { sessionUser } = req;

    const review = await Review.findOne({
        where: { id, status: 'active' }
    })

    if ( !review ) {
        return next(new AppError('No review found with the given ID or status active', 404));
    }

    if ( review.userId !== sessionUser.id ) {
        return next(new AppError('You cannot delete this review because you do not own it', 401));
    }

    await review.update({ status: 'disabled' });

    res.status(201).json({
        status: 'success',
        review
    });
});

module.exports = {
    getAllRestaurants,
    getRestaurantByID,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview
};