import { DropdownItemProps } from 'semantic-ui-react';

export enum RestaurantsSortingOptions {
	Default = 'default',
	MinimalOrderAmount = 'minimalOrderAmount',
	DeliveryTime = 'deliveryTime',
	DeliveryPrice = 'deliveryPrice',
	Rating = '-rating',
	Popularity = '-ratingsCount',
}

// prettier-ignore
export const options: DropdownItemProps[] = [
	{ key: 0, text: 'Domyślnie', value: RestaurantsSortingOptions.Default },
	{ key: 1, text: 'Minimalna kwota zamówienia', value: RestaurantsSortingOptions.MinimalOrderAmount },
	{ key: 2, text: 'Czas dostawy', value: RestaurantsSortingOptions.DeliveryTime },
	{ key: 3, text: 'Cena dostawy', value: RestaurantsSortingOptions.DeliveryPrice },
	{ key: 4, text: 'Opinie', value: RestaurantsSortingOptions.Rating },
	{ key: 5, text: 'Popularność', value: RestaurantsSortingOptions.Popularity },
];

export interface RestaurantsSortingProps {
	sortBy: RestaurantsSortingOptions | undefined;
	setSortBy: (sortingOption: RestaurantsSortingOptions) => void;
}
