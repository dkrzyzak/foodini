import axios, { AxiosError } from 'axios';

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
