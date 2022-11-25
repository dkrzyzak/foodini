import { Restaurant } from '../../utils/apiModels';

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
