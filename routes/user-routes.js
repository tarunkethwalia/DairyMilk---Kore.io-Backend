const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.post('/login', userController.login);
Router.post('/signup', userController.signup);

module.exports = Router;