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

export const getRestaurantDetails = async (restaurantId: string) => {
	try {
		const { data } = await axios.get<Api.Restaurant>(`/restaurants/${restaurantId}`);

		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

interface RegisterReturnValue {
	success: boolean;
	token?: string;
	failureReason?: string;
}

export const registerNewUser = async (
	email: string,
	password: string
): Promise<RegisterReturnValue> => {
	try {
		const { status, data } = await axios.post('/auth/register', {
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

export const loginUser = async (
	email: string,
	password: string
): Promise<RegisterReturnValue> => {
	try {
		const { status, data } = await axios.post('/auth/login', {
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

export const postAddress = async (
	address: Api.Address,
	token: string
): Promise<boolean> => {
	try {
		const { status } = await axios.post('/address/', address, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return status === 200;
	} catch (e: unknown) {
		return false;
	}
};

export const getAddress = async (token: string) => {
	try {
		const { data } = await axios.get<Api.Address>('/address/', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return data;
	} catch (e: unknown) {
		return null;
	}
};

export const protectedRoute = async (token: string) => {
	console.log(token);
	try {
		const { status, data } = await axios.get('/protected', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(status);

		return data;
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.status;
		}
	}
};
