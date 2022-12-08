import React, { useState } from 'react';
import { RestaurantMenuItem } from '../api/apiModels';

interface IBasketContext {
	basket: Record<string, number>;
	basketRestaurantId: string;
	addToBasket: (itemName: string, restaurantId: string) => () => void;
	increaseCount: (itemName: string) => () => void;
	decreaseCount: (itemName: string) => () => void;
	isInBasket: (itemName: string, restaurantId: string) => number;
	isBasketEmpty: () => boolean;
	getBasketValue: () => number;
	getBasketWithDeliveryValue: () => number;
	passCurrentMenu: (menu: RestaurantMenuItem[], deliveryPrice: number, minimalOrderAmount: number) => void;
	currentMenu: MappedMenu;
	deliveryPrice: number;
	minimalOrderAmount: number;
}

type MappedMenu = Record<
	string, // name of item
	{
		price: number;
		description?: string;
	}
>;

// name, count
type Basket = Record<string, number>;

const BasketContext = React.createContext<IBasketContext>({} as IBasketContext);

const BasketProvider = ({ children }: { children: React.ReactNode }) => {
	const [basket, setBasket] = useState<Basket>({});
	const [basketRestaurantId, setBasketRestaurantId] = useState('');
	const [currentMenu, setCurrentMenu] = useState<MappedMenu>({});
	const [deliveryPrice, setDeliveryPrice] = useState(0);
	const [minimalOrderAmount, setMinimalOrderAmount] = useState(0);

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

	const passCurrentMenu = (menu: RestaurantMenuItem[], deliveryPrice: number, minimalOrderAmount: number) => {
		const mappedMenu: MappedMenu = {};

		menu.forEach(({ name, price, description }) => {
			mappedMenu[name] = {
				price,
				description,
			};
		});

		setCurrentMenu(mappedMenu);
		setDeliveryPrice(deliveryPrice);
		setMinimalOrderAmount(minimalOrderAmount);
	};

	const isBasketEmpty = () => {
		return Object.keys(basket).length === 0;
	};

	const getBasketValue = () => {
		if (isBasketEmpty()) return 0;

		return Object.entries(basket).reduce((accumulator, current) => {
			const [itemName, itemCount] = current;

			return accumulator + itemCount * currentMenu[itemName].price;
		}, 0);
	};

	const getBasketWithDeliveryValue = () => {
		return getBasketValue() + deliveryPrice;
	};

	const contextValue: IBasketContext = {
		basket,
		basketRestaurantId,
		addToBasket,
		increaseCount,
		decreaseCount,
		isInBasket,
		isBasketEmpty,
		getBasketValue,
		getBasketWithDeliveryValue,
		passCurrentMenu,
		currentMenu,
		deliveryPrice,
		minimalOrderAmount,
	};

	return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
};

export { BasketContext, BasketProvider };
