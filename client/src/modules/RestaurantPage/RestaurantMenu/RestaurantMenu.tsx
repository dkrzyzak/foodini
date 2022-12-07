import React from 'react';
import { RestaurantMenuItem } from '../../../api/apiModels';
import { priceFormat } from '../../../utils/helpers';
import * as P from './parts';

interface RestaurantMenuProps {
	menu?: RestaurantMenuItem[];
}

const RestaurantMenu = ({ menu }: RestaurantMenuProps) => {
	if (!menu) {
		return null;
	}

	return (
		<P.RestaurantMenuWrapper>
			{menu.map(({ name, price }) => (
				<div>
					{name} - {priceFormat(price)}
				</div>
			))}
		</P.RestaurantMenuWrapper>
	);
};

export default RestaurantMenu;
