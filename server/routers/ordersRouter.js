const express = require('express');
const crypto = require('crypto');
const { verifyTokenMiddleware } = require('../jwt');
const {
	models: { OrderModel },
} = require('../mongo');

const ordersRouter = express.Router();

ordersRouter.post('/', verifyTokenMiddleware, async (req, res) => {
	console.log(req.verifiedEmail);
	// console.log(req.body);

	let id; 
	let isUnique = true;
	
	do {
		id = crypto.randomBytes(20).toString('hex');
		const orderWithGivenId = await OrderModel.findOne({ orderId: id });
		isUnique = orderWithGivenId === null;
	} while (!isUnique);

	const newOrder = new OrderModel({
		basket: req.body.basket,
		address: req.body.address,
		priceInfo: req.body.priceInfo,
		orderId: id,
		placedAt: new Date(),
		...(req.verifiedEmail ? { userEmail: req.verifiedEmail } : {}),
	});

	try {
		await newOrder.save();

		res.status(200).send({ id });
	} catch {
		res.status(500).end();
	}
});

ordersRouter.get('/:orderId', verifyTokenMiddleware, async (req, res) => {
	
})

module.exports = ordersRouter;
