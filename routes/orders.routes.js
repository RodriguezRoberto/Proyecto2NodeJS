const express = require('express');

// Middlewares
const {
    orderExists,
    mealExistsForOrder
} = require('../middlewares/orders.middlewares');

const {
    protectToken,
} = require('../middlewares/users.middlewares');

const {
    createOrderValidations,
    checkValidations
} = require('../middlewares/validations.middlewares');

// Controllers
const {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orders.controller');

const router = express.Router();

// Apply protectToken middleware

router.use( protectToken );

router.get('/me', getAllOrders);
router.post('/', createOrderValidations, checkValidations, mealExistsForOrder, createOrder);
router.patch('/:id', orderExists, updateOrder);
router.delete('/:id', orderExists, deleteOrder);

module.exports = { ordersRouter: router };