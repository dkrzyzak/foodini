import axios from 'axios';
import * as Api from './apiModels';

interface PostOrderReturnValue {
    success: boolean;
    id?: string;
    failureReason?: string;
}

export const postOrder = async (orderData: Api.PostOrderData, token?: string): Promise<PostOrderReturnValue> => {
	try {
		const { data } = await axios.post('/order', orderData, {
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
				x_allow_ignore_auth: true,
			},
		});

        return {
            success: true,
            id: data.id,
        }
	} catch (e: unknown) {
		return {
            success: false,
            failureReason: 'Wystąpił błąd, za utrudnienia przepraszamy :-(',
        };
	}
};



export const getOrder = async (orderId: string, token?: string): Promise<Api.Order | null | undefined> => {
	// situation when token was not yet set in Context, but it exists in LS
	// we cancel request because it will fire again in a second with proper token value
	if (!token && localStorage.getItem('jwt')) {
		return undefined;
	}

    try {
		const { data } = await axios.get<Api.Order>(`/order/${orderId}`, {
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
				x_allow_ignore_auth: true,
			},
		});

        return data;
	} catch (e: unknown) {
        return null;
	}
}