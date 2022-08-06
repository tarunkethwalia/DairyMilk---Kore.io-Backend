const express = require('express');
const Router = express.Router();
const orderStatusController = require('../controllers/orderStatusController');

Router.post('/updateStatus/:orderId', orderStatusController.updateOrderStatus);

module.exports = Router;