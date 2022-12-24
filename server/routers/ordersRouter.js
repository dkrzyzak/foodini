const express = require('express');
const crypto = require('crypto');
const { verifyTokenMiddleware } = require('../jwt');
const {
	models: { OrderModel, RestaurantModel },
} = require('../mongo');

const ordersRouter = express.Router();

ordersRouter.post('/', verifyTokenMiddleware, async (req, res) => {
	const userEmail = req.verifiedEmail;

	let id; 
	let isUnique = true;
	
	do {
		id = crypto.randomBytes(20).toString('hex');
		const orderWithGivenId = await OrderModel.findOne({ orderId: id });
		isUnique = orderWithGivenId === null;
	} while (!isUnique);

	const restaurant = await RestaurantModel.findOne({ restaurantId: req.body.restaurantId });

	const newOrder = new OrderModel({
		basket: req.body.basket,
		address: req.body.address,
		priceInfo: req.body.priceInfo,
		restaurantId: req.body.restaurantId,
		restaurantName: restaurant.fullName,
		orderId: id,
		placedAt: new Date(),
		...(userEmail ? { userEmail } : {}),
	});

	try {
		await newOrder.save();

		res.status(200).send({ id });
	} catch {
		res.status(500).end();
	}
});

ordersRouter.get('/:orderId', verifyTokenMiddleware, async (req, res) => {
	const orderId = req.params.orderId;
	const userEmail = req.verifiedEmail;

	const foundOrder = await OrderModel.findOne({ orderId });

	if (!foundOrder) {
		return res.status(404).end();
	}

	if (foundOrder.userEmail != userEmail) {
		return res.status(401).end();
	}
	
	res.status(200).send(foundOrder);
})

module.exports = ordersRouter;
