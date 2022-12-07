import React, { useState } from 'react';

interface IBasketContext {
	basket: Record<string, number>;
	restaurantId: string;
	addToBasket: (itemName: string, restaurantId: string) => () => void;
	increaseCount: (itemName: string) => () => void;
	decreaseCount: (itemName: string) => () => void;
	isInBasket: (itemName: string, restaurantId: string) => number;
}

const BasketContext = React.createContext<IBasketContext>({} as IBasketContext);

const BasketProvider = ({ children }: { children: React.ReactNode }) => {
	const [basket, setBasket] = useState<Record<string, number>>({});
	const [basketRestaurantId, setBasketRestaurantId] = useState('');

	const isInBasket = (itemName: string, restaurantId: string): number => {
		if (basketRestaurantId !== restaurantId) {
			return 0;
		}

		if (!basket?.hasOwnProperty(itemName)) {
			return 0;
		}

		return basket[itemName];
	};

	const addToBasket = (itemName: string, restaurantId: string) => () => {
		if (basketRestaurantId !== restaurantId) {
			// adding item from another restaurant => clean up the basket and start over
			setBasketRestaurantId(restaurantId);
			return setBasket({
				[itemName]: 1,
			});
		}

		setBasket((prevBasket) => ({
			...prevBasket,
			[itemName]: 1,
		}));
	};

	const increaseCount = (itemName: string) => () => {
		setBasket((prevBasket) => ({
			...prevBasket,
			[itemName]: prevBasket[itemName] + 1,
		}));
	};

	const decreaseCount = (itemName: string) => () => {
		setBasket((prevBasket) => {
			if (prevBasket?.[itemName] === 1) {
				const newBasket = { ...prevBasket };
				delete newBasket[itemName];
				return newBasket;
			}

			return {
				...prevBasket,
				[itemName]: prevBasket[itemName] - 1,
			};
		});
	};

	const contextValue: IBasketContext = {
		basket,
		restaurantId: basketRestaurantId,
		addToBasket,
		increaseCount,
		decreaseCount,
		isInBasket,
	};

	return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
};

export { BasketContext, BasketProvider };
