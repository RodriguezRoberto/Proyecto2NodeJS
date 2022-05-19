const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const createUserValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRestaurantValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('address')
    .notEmpty()
    .withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
];

const createReviewValidations = [
  body('comment')
    .notEmpty()
    .withMessage('Comment cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
];

const createMealValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
];

const createOrderValidations = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity cannot be empty'),
  body('mealId')
    .notEmpty()
    .withMessage('Meal ID cannot be empty')
]

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

module.exports = {
  createUserValidations,
  createRestaurantValidations,
  createReviewValidations,
  createMealValidations,
  createOrderValidations,
  checkValidations
};
