const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner
} = require('../middlewares/users.middlewares');

const {
  createUserValidations,
  checkValidations
} = require('../middlewares/validations.middlewares');

// Controller
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById
} = require('../controllers/users.controller');

const router = express.Router();

// No Token needed

router.post('/signup', createUserValidations, checkValidations, createUser);

router.post('/login', login);

// Apply protectToken middleware

router.use(protectToken);

router
  .route('/:id')
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

// User orders

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);

module.exports = { usersRouter: router };