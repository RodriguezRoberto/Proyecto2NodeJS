// Models
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const orderExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const order = await Order.findOne({
      where: { id, status: 'active' }
    });
  
    if (!order) {
      return next(new AppError('No order found with the given ID or status active', 404));
    }
  
    // Add restaurant data to the req object
    req.order = order;
    next();
});

const mealExistsForOrder = catchAsync(async (req, res, next) => {
    const { mealId } = req.body;
  
    const meal = await Meal.findOne({
      where: { id: mealId, status: 'active' }
    });
  
    if (!meal) {
      return next(new AppError('No meal found with the given ID or status active', 404));
    }
  
    // Add restaurant data to the req object
    req.meal = meal;
    next();
});

module.exports = { 
    orderExists,
    mealExistsForOrder 
};