const express = require('express');
const crypto = require('crypto');
const dayjs = require('dayjs');
const { verifyTokenMiddleware } = require('../jwt');
const {
	models: { OrderModel, RestaurantModel },
} = require('../mongo');

const ordersRouter = express.Router();
const MOCK_DELIVERY_TIME = process.env.MOCK_DELIVERY_TIME === 'true';

ordersRouter.post('/', verifyTokenMiddleware, async (req, res) => {
	const userEmail = req.verifiedEmail;

	let id;
	let isUnique = true;

	do {
		id = crypto.randomBytes(20).toString('hex');
		const orderWithGivenId = await OrderModel.findOne({ orderId: id });
		isUnique = orderWithGivenId === null;
	} while (!isUnique);

	const restaurant = await RestaurantModel.findOne({
		restaurantId: req.body.restaurantId,
	});

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

const getOrderStatus = (timeElapsed, estimatedDeliveryTime) => {
	if (timeElapsed < 1) {
		return 'received';
	}

	if (MOCK_DELIVERY_TIME) {
		if (timeElapsed < 2) {
			return 'in progress';
		}

		if (timeElapsed < 3) {
			return 'in delivery';
		}

		return 'finalized';
	}

	if (timeElapsed < estimatedDeliveryTime[0]) {
		return 'in progress';
	}

	if (timeElapsed < estimatedDeliveryTime[1]) {
		return 'in delivery';
	}

	return 'finalized';
};

const mapOrder = () => {};

ordersRouter.get('/', verifyTokenMiddleware, async (req, res) => {
	const userEmail = req.verifiedEmail;

	const foundOrders = await OrderModel.find({ userEmail });

	if (!foundOrders) {
		return res.status(404).end();
	}

	const ordersSummary = await Promise.all(
		foundOrders.map(async (order) => {
			const restaurant = await RestaurantModel.findOne({
				restaurantId: order.restaurantId,
			});

			const minutesElapsed = dayjs(new Date()).diff(order.placedAt, 'minutes');

			return {
				orderId: order.orderId,
				restaurantId: order.restaurantId,
				restaurantName: order.restaurantName,
				placedAt: order.placedAt,
				orderStatus: getOrderStatus(minutesElapsed, restaurant.waitingTimeInMins),
				orderTotalValue: order.priceInfo.orderTotalValue,
			};
		})
	);

	res.status(200).send(ordersSummary);
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

	const restaurant = await RestaurantModel.findOne({
		restaurantId: foundOrder.restaurantId,
	});

	const minutesElapsed = dayjs(new Date()).diff(foundOrder.placedAt, 'minutes');

	const estimatedHourOfDelivery = dayjs(foundOrder.placedAt)
		.add(MOCK_DELIVERY_TIME ? 3 : restaurant.waitingTimeInMins[1], 'minutes')
		.format('HH:mm');

	res.status(200).send({
		orderId: foundOrder.orderId,
		restaurantId: foundOrder.restaurantId,
		restaurantName: foundOrder.restaurantName,
		placedAt: foundOrder.placedAt,
		basket: foundOrder.basket,
		priceInfo: foundOrder.priceInfo,
		address: foundOrder.address,
		timeElapsedInMins: minutesElapsed,
		estimatedHourOfDelivery,
		orderStatus: getOrderStatus(minutesElapsed, restaurant.waitingTimeInMins),
	});
});

module.exports = ordersRouter;
