const express = require('express');
const Router = express.Router();
const companyController = require('../controllers/companyController');

Router.post('/createCompany', companyController.createCompany);
Router.post('/getCompany', companyController.getCompany);
Router.get('/checkCapacity/:companyId', companyController.checkCapacity);

module.exports = Router;