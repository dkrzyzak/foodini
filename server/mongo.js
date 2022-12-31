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
		enum: [
			'polska',
			'włoska',
			'desery',
			'pizza',
			'kebab',
			'sushi',
			'ryby',
			'amerykańska',
			'indyjska',
		],
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

const addressSchema = new Schema({
	userEmail: String,
	streetAndNr: String,
	city: String,
	postalCode: String,
	phoneNr: String,
});

const AddressModel = mongoose.model('addresses', addressSchema);

const orderSchema = new Schema({
	userEmail: String, // opcjonalny
	placedAt: Date,
	orderId: String,
	restaurantId: String,
	restaurantName: String,
	basket: [
		{
			itemName: String,
			itemDescription: String,
			itemQuantity: Number,
			itemPrice: Number,
		},
	],
	priceInfo: {
		basketValue: Number,
		deliveryPrice: Number,
		orderTotalValue: Number,
	},
	address: {
		streetAndNr: String,
		city: String,
		postalCode: String,
		phoneNr: String,
	},
});

const OrderModel = mongoose.model('orders', orderSchema);

module.exports = {
	db,
	models: {
		UserModel,
		OrderModel,
		AddressModel,
		RestaurantModel,
	},
};
