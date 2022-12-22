// prettier-ignore
export type Cuisine = 'polska' | 'włoska' | 'desery' | 'pizza' | 'kebab' | 'sushi' | 'ryby' | 'amerykańska' | 'indyjska';

export interface Restaurant {
	restaurantId: string;
	fullName: string;
	rating: number;
	ratingsCount: number;
	cuisineType: Cuisine[];
	minimalOrderAmount: number;
	deliveryPrice: number;
	waitingTimeInMins: [number, number]; // lower and upper bound
	imageName: string; // images would be in assets folder, we only need proper name
	logoName: string;
	menu: RestaurantMenuItem[];
}

export interface RestaurantMenuItem {
	name: string;
	price: number;
	description?: string;
}

export interface Address {
	streetAndNr: string;
	city: string;
	postalCode: string;
	phoneNr: string;
}

export interface OrderItemInfo {
	itemName: string;
	itemPrice: number;
	itemQuantity: number;
	itemDescription?: string;
}

export interface OrderPriceInfo {
	orderTotalValue: number;
	basketValue: number;
	deliveryPrice: number;
}

export interface PostOrderData {
	basket: OrderItemInfo[];
	priceInfo: OrderPriceInfo;
	address: Address;
}

export interface Order {
	id: string;
	timeOfOrder: string;
	basket: OrderItemInfo[];
	priceInfo: OrderPriceInfo;
	address: Address;
}

export interface User {
	email: string;
	pointsCount: number;
}
