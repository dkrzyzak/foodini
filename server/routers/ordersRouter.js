const express = require('express');
const { verifyTokenMiddleware } = require('../jwt');
// const {
// 	models: { RestaurantModel },
// } = require('../mongo');

const ordersRouter = express.Router();

ordersRouter.post('/', verifyTokenMiddleware, (req, res) => {
	console.log(req.verifiedEmail);
	console.log(req.body);

	res.status(200).end();
});

module.exports = ordersRouter;
