import React from 'react';
import { DropdownProps } from 'semantic-ui-react';
import { options, RestaurantsSortingProps, RestaurantsSortingOptions } from './constants';
import * as P from './parts';

const RestaurantsSorting = ({ sortBy, setSortBy }: RestaurantsSortingProps) => {
	const onDropdownChange = (event: React.SyntheticEvent, data: DropdownProps) => {
		setSortBy(data.value as RestaurantsSortingOptions);
	};

	return (
		<P.RestaurantsSortingWrapper>
			<P.SortBySpan>Sortuj według</P.SortBySpan>
			<P.Dropdown clearable options={options} selection onChange={onDropdownChange} value={sortBy} />
		</P.RestaurantsSortingWrapper>
	);
};

export default RestaurantsSorting;
