const dayjs = require('dayjs');
const express = require('express');
const { compareHash, hashPassword } = require('../hash');
const { createJWT, verifyTokenMiddleware } = require('../jwt');
const {
	models: { UserModel, AddressModel, OrderModel },
} = require('../mongo');

const router = express.Router();

router.post('/login', async (req, res) => {
	const { password: plainTextPassword, email } = req.body;

	try {
		const userQueryResult = await UserModel.findOne({ email });

		if (!userQueryResult) {
			return res.status(401).end();
		}

		const isAuth = await compareHash(plainTextPassword, userQueryResult.password);

		if (!isAuth) {
			return res.status(401).end();
		}

		const jwt = await createJWT({ email });

		return res
			.status(200)
			.json({
				token: jwt,
			})
			.end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.post('/register', async (req, res) => {
	const { password: plainTextPassword, email } = req.body;

	try {
		const userQueryResult = await UserModel.findOne({ email });

		if (userQueryResult) {
			return res
				.status(401)
				.send({ reason: 'Użytkownik z takim adresem e-mail już istnieje.' })
				.end();
		}

		const hashedPassword = await hashPassword(plainTextPassword);

		const jwt = await createJWT({ email });

		const newUser = new UserModel({
			email,
			password: hashedPassword,
		});

		await newUser.save();

		return res.status(200).json({
			token: jwt,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.get('/validateToken', verifyTokenMiddleware, async (req, res) => {
	// if user got to this point, that means he is verified
	res.status(200).end();
});

router.get('/basicData', verifyTokenMiddleware, async (req, res) => {
	const userEmail = req.verifiedEmail;

	const userObject = await UserModel.findOne({ email: userEmail });

	if (!userObject) {
		return res.status(404).end();
	}

	const userAddress = await AddressModel.findOne({ userEmail });
	const ordersCount = await OrderModel.countDocuments({ userEmail });
	const accountAgeInDays = dayjs(new Date()).diff(userObject.created, 'days');

	const [lastOrder] = await OrderModel.find({ userEmail })
		.sort({ placedAt: -1 })
		.limit(1);

	return res.status(200).send({
		email: userEmail,
		ordersCount,
		accountAgeInDays,
		lastOrderRestaurantName: lastOrder?.restaurantName || '',
		...(userAddress
			? {
					address: {
						streetAndNr: userAddress.streetAndNr,
						postalCode: userAddress.postalCode,
						city: userAddress.city,
						phoneNr: userAddress.phoneNr,
					},
			  }
			: {}),
	});
});

module.exports = router;
