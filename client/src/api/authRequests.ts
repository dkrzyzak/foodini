import axios, { AxiosError } from 'axios';
import { UserData } from './apiModels';

interface AuthReturnValue {
	success: boolean;
	token?: string;
	failureReason?: string;
}

export const registerNewUser = async (
	email: string,
	password: string
): Promise<AuthReturnValue> => {
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
): Promise<AuthReturnValue> => {
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

export const getBasicData = async (token: string): Promise<UserData | undefined> => {
	try {
		const { data } = await axios.get<UserData>('/auth/basicData', {
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		});

		return data;
	} catch {
		return undefined;
	}
};
