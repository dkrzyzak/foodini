const express = require('express');
const { verifyTokenMiddleware } = require('../jwt');
const {
	models: { AddressModel },
} = require('../mongo');

const addressRouter = express.Router();

addressRouter.post('/', verifyTokenMiddleware, async (req, res) => {
	try {
		// updating existing one
		await AddressModel.findOneAndUpdate(
			{ userEmail: req.verifiedEmail },
			{
				...req.body,
				userEmail: req.verifiedEmail,
			},
			// or creating new one
			{ upsert: true }
		);

		res.status(200).end();
	} catch (e) {
		res.status(500).end();
	}
});

addressRouter.get('/', verifyTokenMiddleware, async (req, res) => {
	try {
		const address = await AddressModel.findOne({ userEmail: req.verifiedEmail });

		res.status(200).send({
			streetAndNr: address.streetAndNr,
			city: address.city,
			postalCode: address.postalCode,
			phoneNr: address.phoneNr,
		});
	} catch (e) {
		res.status(500).end();
	}
});

module.exports = addressRouter;
