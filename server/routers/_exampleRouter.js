const express = require('express');
const {
	models: { RestaurantModel },
} = require('../mongo');

const restaurantsRouter = express.Router();

module.exports = restaurantsRouter;
