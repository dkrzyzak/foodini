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