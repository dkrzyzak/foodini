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
}

export interface User {
	email: string;
	pointsCount: number;
}
