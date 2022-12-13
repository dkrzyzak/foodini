import { useContext } from 'react';
import { BasketContext } from './BasketContext';

export const useBasket = () => {
	return useContext(BasketContext);
};
