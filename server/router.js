const path = require('path');
const express = require('express');
const {
	models: { UserModel },
} = require('./mongo');

const { verifyTokenMiddleware } = require('./jwt');
const {
	authRouter,
	ordersRouter,
	addressRouter,
	restaurantsRouter,
} = require('./routers');

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

rootRouter.use('/auth', authRouter);
rootRouter.use('/order', ordersRouter);
rootRouter.use('/address', addressRouter);
rootRouter.use('/restaurants', restaurantsRouter);

rootRouter.get('/protected', verifyTokenMiddleware, async (req, res) => {
	console.log(req.verifiedEmail);

	const user = await UserModel.findOne({ email: req.verifiedEmail });
	console.log(user);

	res.json({
		noicokurwa: 'hahahahahahahahhahaha',
	});
});

rootRouter.get('*', (req, res) => {
	res.redirect('/');
});

module.exports = rootRouter;
