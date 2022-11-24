export type Cuisine = 'polska' | 'włoska' | 'desery' | 'pizza' | 'kebab' | 'sushi' | 'amerykańska' | 'indyjska';

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
}

export interface User {
	email: string;
	pointsCount: number;
}
