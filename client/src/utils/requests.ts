import * as Api from './apiModels';
import axios from 'axios';
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
