const express = require('express');
const {
	models: { RestaurantModel },
} = require('../mongo');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', async (req, res) => {
	let { sortBy = '' } = req.query;

	try {
		const restaurantsList = await RestaurantModel.find().sort(sortBy);

		if (sortBy === 'deliveryTime') {
			restaurantsList.sort((a, b) => {
				const deliveryTimeA = a.waitingTimeInMins[0];
				const deliveryTimeB = b.waitingTimeInMins[0];

				return deliveryTimeA - deliveryTimeB;
			});
		}

		res.status(200).json(restaurantsList).end();
	} catch (e) {
		console.log(e);
		res.status(500).end();
	}
});

restaurantsRouter.get('/:id', async (req, res) => {
	let { id } = req.params;

	try {
		const restaurants = await RestaurantModel.findOne({ restaurantId: id });

		res.status(200).json(restaurants).end();
	} catch (e) {
		console.log(e);
		res.status(500).end();
	}
});

module.exports = restaurantsRouter;
