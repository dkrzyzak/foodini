import * as Api from './apiModels';
import axios, { AxiosError } from 'axios';
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

interface RegisterReturnValue {
	success: boolean;
	token?: string;
	failureReason?: string;
}

export const registerNewUser = async (email: string, password: string): Promise<RegisterReturnValue> => {
	try {
		const { status, data } = await axios.post('/register', {
			email,
			password,
		});

		if (status === 200) {
			return {
				success: true,
				token: data.token,
			};
		}
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			const status = e.response?.status;

			if (status === 500) {
				return {
					success: false,
					failureReason: 'Błąd serwera. Spróbuj ponownie później.',
				};
			}

			if (status === 401) {
				return {
					success: false,
					failureReason: e.response?.data.reason,
				};
			}
		}
	}

	return {
		success: false,
		failureReason: 'Stało się coś dziwnego',
	};
};

export const loginUser = async (email: string, password: string): Promise<RegisterReturnValue> => {
	try {
		const { status, data } = await axios.post('/login', {
			email,
			password,
		});

		if (status === 200) {
			return {
				success: true,
				token: data.token,
			};
		}
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			if (e.response?.status === 401) {
				return {
					success: false,
					failureReason: 'Błędna nazwa użytkownika lub hasło',
				};
			}

			if (e.response?.status === 500) {
				return {
					success: false,
					failureReason: 'Wystąpił błąd serwera',
				};
			}
		}
		return {
			success: false,
			failureReason: `Nieznany błąd: ${(e as Error).message}`,
		};
	}

	return {
		success: false,
		failureReason: 'Nieznany błąd',
	};
};
