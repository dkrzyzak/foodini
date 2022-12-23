import axios from 'axios';
import * as Api from './apiModels';
import { RestaurantsSortingOptions } from '../modules/RestaurantsList/constants';

export const getRestaurants = async (sortBy?: RestaurantsSortingOptions) => {
	try {
		const { data } = await axios.get<Api.Restaurant[]>('/restaurants', {
			params: {
				sortBy,
			},
		});

		return data;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const getRestaurantDetails = async (restaurantId: string) => {
	try {
		const { data } = await axios.get<Api.Restaurant>(`/restaurants/${restaurantId}`);

		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
};