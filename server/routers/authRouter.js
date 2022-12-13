const express = require('express');
const { compareHash, hashPassword } = require('../hash');
const { createJWT } = require('../jwt');
const {
	models: { UserModel },
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
			return res
				.status(401)
				.send({ reason: 'Użytkownik z takim adresem e-mail już istnieje.' })
				.end();
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

module.exports = router;
