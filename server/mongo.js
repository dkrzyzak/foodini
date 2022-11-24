const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.pluralize(null);
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('połączono z bazą danych');
	})
	.catch(console.log);

const db = mongoose.connection;

const userSchema = new Schema({
	email: String,
	password: String,
	created: { type: Date, default: Date.now },
	pointsCount: Number,
});

const UserModel = mongoose.model('users', userSchema);

const restaurantSchema = new Schema({
	restaurantId: String,
	fullName: String,
	rating: Number,
	ratesCount: Number,
	cuisineType: {
		type: [String],
		enum: ['polska', 'włoska', 'desery', 'pizza', 'kebab', 'sushi', 'amerykańska', 'indyjska'],
	},
	minimalOrderAmount: Number,
	deliveryPrice: Number,
	waitingTimeInMins: [Number],
	imageName: String,
});

const RestaurantModel = mongoose.model('restaurants', restaurantSchema);

const addRestaurant = async () => {
	const x = new RestaurantModel({
		restaurantId: 'apetyt-bistro',
		fullName: 'Apetyt Bistro',
		rating: 4.8,
		ratingsCount: 9950,
		cuisineType: ['włoska', 'polska'],
		minimalOrderAmount: 79,
		deliveryPrice: 0,
		waitingTimeInMins: [30, 55],
		imageName: 'apetyt-bistro.jpg',
	});

	try {
		await x.save();
		console.log('utworzono restaurację');
	} catch (e) {
		console.log(e);
	}
};

// addRestaurant();

module.exports = {
	db,
	models: {
		UserModel,
		RestaurantModel,
	},
};
