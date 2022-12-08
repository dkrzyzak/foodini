const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.pluralize(null);
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected with database');
	})
	.catch(console.log);

const db = mongoose.connection;

const userSchema = new Schema({
	email: String,
	password: String,
	created: { type: Date, default: Date.now },
	pointsCount: Number,
	jwt: String,
});

const UserModel = mongoose.model('users', userSchema);

const restaurantSchema = new Schema({
	restaurantId: String,
	fullName: String,
	rating: Number,
	ratingsCount: Number,
	cuisineType: {
		type: [String],
		enum: ['polska', 'włoska', 'desery', 'pizza', 'kebab', 'sushi', 'ryby', 'amerykańska', 'indyjska'],
	},
	minimalOrderAmount: Number,
	deliveryPrice: Number,
	waitingTimeInMins: [Number],
	imageName: String,
	logoName: String,
	menu: [
		{
			name: String,
			price: Number,
			description: String,
		},
	],
});

const RestaurantModel = mongoose.model('restaurants', restaurantSchema);

const addMenu = async () => {
	const menu = [
		{ name: 'Chicken Burger', price: 32, description: 'pierś' },
		{ name: 'Żurek staropolski', price: 40, description: 'żurek' },
		{ name: 'Pizza Carpi', price: 38, description: 'włoskich' },
		{ name: 'Pizza Pepperoni', price: 40, description: 'sera' },
		{ name: 'Pizza Leśna', price: 45, description: 'rozmaryn' },
		{ name: 'Frytki', price: 13 },
		{ name: 'Woda 500ml', price: 5 },
		{ name: 'Sok pomarańczowy 1l', price: 7 },
	];

	const restaurantId = 'apetyt-bistro';

	try {
		await RestaurantModel.updateOne({ restaurantId }, { menu });

		console.log('dodano menu do restauracji', restaurantId);
	} catch (e) {
		console.log(e);
	}
};

// addMenu();

module.exports = {
	db,
	models: {
		UserModel,
		RestaurantModel,
	},
};
