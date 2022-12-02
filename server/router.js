const path = require('path');
const express = require('express');
const {
	models: { RestaurantModel, UserModel },
} = require('./mongo');
const { compareHash, hashPassword } = require('./hash');
const { createJWT, verifyTokenMiddleware } = require('./jwt');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

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

		return res
			.status(200)
			.json({
				token: userQueryResult.jwt,
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
			return res.status(401).send({ reason: 'Użytkownik z takim adresem e-mail już istnieje.' }).end();
		}

		const hashedPassword = await hashPassword(plainTextPassword);

		const userObject = {
			email,
			password: hashedPassword,
		};

		const jwt = await createJWT(userObject);

		const newUser = new UserModel({
			...userObject,
			jwt,
			pointsCount: 0,
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

router.get('/restaurants', async (req, res) => {
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

router.get('/protected', verifyTokenMiddleware, async (req, res) => {
	console.log(req.verifiedEmail);

	const user = await UserModel.findOne({ email: req.verifiedEmail });
	console.log(user);

	res.json({
		noicokurwa: 'hahahahahahahahhahaha',
	});
});

router.get('*', (req, res) => {
	res.redirect('/');
});

module.exports = router;
