const path = require('path');
const express = require('express');
const {
	models: { RestaurantModel, UserModel },
} = require('./mongo');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

router.get('/test', (req, res) => {
	res.json({ sraken: 'pierdaken' });
});

router.post('/login', async (req, res) => {
	const { password: plainTextPassword, email } = req.body;

	try {
		const userQueryResult = await UserModel.findOne({ email });
		const isAuth = await compareHash(plainTextPassword, userQueryResult.password);

		if (!isAuth) {
			return res.status(401).end();
		}

		return res.status(200).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.post('/register', (req, res) => {});

router.get('/restaurants', async (req, res) => {
	try {
		const restaurantsList = await RestaurantModel.find();
		res.status(200).json(restaurantsList).end();
	} catch (e) {
		console.log(e);
		res.status(500).end();
	}
});

router.get('*', (req, res) => {
	res.redirect('/');
});

module.exports = router;
