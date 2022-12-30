import { Restaurant } from '../../api/apiModels';
import { getRestaurants } from '../../api/restaurantsRequests';
import { RestaurantsSortingOptions } from './constants';

export const getRestaurantsDataWithImages = async (restaurants: Restaurant[]) => {
	return await Promise.all(
		restaurants.map(async (restaurant) => {
			// prettier-ignore
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

const lsRestaurantsSortingKey = 'sortRestaurantsBy';
export const getSortingFromLS = () =>
	localStorage.getItem(lsRestaurantsSortingKey) as RestaurantsSortingOptions;

export const saveSortingToLS = (newSortingOption: RestaurantsSortingOptions) =>
	localStorage.setItem(lsRestaurantsSortingKey, newSortingOption);
