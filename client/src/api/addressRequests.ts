import axios from 'axios';
import * as Api from './apiModels';

export const postAddress = async (
	address: Api.Address,
	token: string
): Promise<boolean> => {
	try {
		const { status } = await axios.post('/address', address, {
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
		const { data } = await axios.get<Api.Address>('/address', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return data;
	} catch (e: unknown) {
		return null;
	}
};