import { useEffect } from 'react';
import { protectedRoute } from '../api/requests';

const useMockRequest = (token: string) => {
	const onMakeRequest = async () => {
		const value = await protectedRoute(token);
		console.log(value);
	};

	useEffect(() => {
		onMakeRequest();
	}, []);
};

export default useMockRequest;
