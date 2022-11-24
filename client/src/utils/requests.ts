import * as Api from './apiModels';
import axios from 'axios';

export const getRestaurants = async (location: string) => {
	try {
		const { data } = await axios.get<Api.Restaurant[]>('/restaurants', {
			params: {
				location,
			},
		});

		return data;
	} catch (e) {
		console.log(e);
		return [];
	}
};
