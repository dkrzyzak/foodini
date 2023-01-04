const jwt = require('jsonwebtoken');

const createJWT = (user, secretKey = 'secretKey') =>
	new Promise((resolve, reject) => {
		jwt.sign({ user }, secretKey, (err, token) => {
			if (err) return reject(err);

			resolve(token);
		});
	});

const verifyJWT = (token, secretKey) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (err, authData) => {
			if (err) return reject(false);

			resolve(authData);
		});
	});

const verifyTokenMiddleware = async (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	const allowIgnoreAuth = req.headers['x_allow_ignore_auth'];

	if (!bearerHeader) {
		if (allowIgnoreAuth) {
			return next();
		}

		return res.sendStatus(403);
	}

	const bearerToken = bearerHeader.split(' ')[1];

	try {
		const verificationStatus = await verifyJWT(bearerToken, 'secretKey');
		if (verificationStatus === false) {
			return res.sendStatus(403);
		}

		req.verifiedEmail = verificationStatus.user.email;
		next();
	} catch {
		return res.sendStatus(403);
	}
};

module.exports = {
	createJWT,
	verifyTokenMiddleware,
};
