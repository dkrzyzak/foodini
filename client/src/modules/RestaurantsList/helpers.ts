import { Restaurant } from '../../api/apiModels';
import { getRestaurants } from '../../api/requests';
import { RestaurantsSortingOptions } from './constants';

export const getRestaurantsDataWithImages = async (restaurants: Restaurant[]) => {
	return await Promise.all(
		restaurants.map(async (restaurant) => {
			try {
				const mainImageSrc = await import(`../../assets/restaurant-images/${restaurant.imageName}`);
				const logoImageSrc = await import(`../../assets/restaurant-images/${restaurant.logoName}`);
				return {
					...restaurant,
					imageName: mainImageSrc.default as string,
					logoName: logoImageSrc.default as string,
				};
			} catch (e) {
				console.log(e);
				return restaurant;
			}
		})
	);
};

export const getRestaurantsData = (sortBy: RestaurantsSortingOptions) => async () => {
	const data = await getRestaurants(sortBy);
	const dataWithImportedImages = await getRestaurantsDataWithImages(data);

	return dataWithImportedImages;
};
