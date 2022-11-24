import { Restaurant } from '../../utils/apiModels';

export const getRestaurantsDataWithImages = async (restaurants: Restaurant[]) => {
	return await Promise.all(
		restaurants.map(async (restaurant) => {
			const imageSrc = await import(`../../assets/restaurant-images/${restaurant.imageName}`);

			return {
				...restaurant,
				imageName: imageSrc.default as string,
			};
		})
	);
};
