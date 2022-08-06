const express = require('express');
const Router = express.Router();
const orderController = require('../controllers/orderController');

Router.post('/add', orderController.addOrder);
Router.put('/update/:orderId', orderController.updateOrder);
Router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = Router;