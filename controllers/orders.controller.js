// Models
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

    const orders = await Order.findAll({
        where: { userId: sessionUser.id },
        include: [
            { model: Meal, include: [ { model: Restaurant } ] }
        ]
    })

    res.status(200).json({ orders });
});

const createOrder = catchAsync(async (req, res, next) => {
    const { quantity } = req.body;
    const { sessionUser } = req;
    const { meal } = req;
    const price = quantity * meal.price;

    const newOrder = await Order.create({
        mealId: meal.id,
        userId: sessionUser.id,
        restaurantId: meal.restaurantId,
        price,
        quantity
    });

    res.status(201).json({ newOrder });
});

const updateOrder = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { order } = req;

    if ( sessionUser.id !== order.userId ) {
        return next(new AppError('You do not own this order, you cannot update it', 401));
    }

    await order.update({ status: 'completed' });

    res.status(201).json({
        status: 'success',
        order
    })
});

const deleteOrder = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { order } = req;

    if ( sessionUser.id !== order.id ) {
        return next(new AppError('You do not own this order, you cannot cancell it', 401));
    }

    await order.update({ status: 'cancelled' });

    res.status(201).json({
        status: 'success',
        order
    })
});

module.exports = { 
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
};