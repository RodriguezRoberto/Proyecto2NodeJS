// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const mealExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const meal = await Meal.findOne({
      where: { id, status: 'active' },
      include: [
        { 
          model: Restaurant
        }
      ]
    });
  
    if (!meal) {
      return next(new AppError('No meal found with the given ID or status active', 404));
    }
  
    // Add restaurant data to the req object
    req.meal = meal;
    next();
});

const restaurantExistsForMeal = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id: restaurantId, status: 'active' }
  });

  if (!restaurant) {
    return next(new AppError('No restaurant found with the given ID or status active', 404));
  }

  // Add restaurant data to the req object
  req.restaurant = restaurant;
  next();
});

module.exports = { 
  mealExists,
  restaurantExistsForMeal
};