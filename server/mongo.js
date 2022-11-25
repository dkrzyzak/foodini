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
});

const RestaurantModel = mongoose.model('restaurants', restaurantSchema);

const addRestaurant = async () => {
	const x = new RestaurantModel({
		restaurantId: 'kebab-king',
		fullName: 'Kebab King',
		rating: 3.8,
		ratingsCount: 310,
		cuisineType: ['kebab'],
		minimalOrderAmount: 25,
		deliveryPrice: 5.5,
		waitingTimeInMins: [30, 55],
		imageName: 'kebab-king.jpg',
		logoName: 'kebab-king-logo.png',
	});

	try {
		await x.save();

		console.log('utworzono restaurację', x.fullName);
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
