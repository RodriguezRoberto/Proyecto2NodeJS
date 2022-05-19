// Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const restaurantExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const restaurant = await Restaurant.findOne({
      where: { id, status: 'active' },
      include: [
        { 
          model: Review,
          required: false,
          where: { status: 'active' } 
        }
      ]
    });
  
    if (!restaurant) {
      return next(new AppError('No restaurant found with the given ID or status active', 404));
    }
  
    // Add restaurant data to the req object
    req.restaurant = restaurant;
    next();
});

const restaurantExistsForReview = catchAsync(async (req, res, next) => {
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
  restaurantExists,
  restaurantExistsForReview
};