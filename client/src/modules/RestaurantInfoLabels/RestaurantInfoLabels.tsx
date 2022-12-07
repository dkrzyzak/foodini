import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { priceFormat } from '../../utils/helpers';
import { RatingLabel } from './parts';

interface RestaurantInfoLabelsProps {
	rating: number;
	ratingsCount: number;
	waitingTimeInMins: [number, number];
	deliveryPrice: number;
	minimalOrderAmount: number;
}

const RestaurantInfoLabels = ({
	rating,
	ratingsCount,
	waitingTimeInMins,
	deliveryPrice,
	minimalOrderAmount,
}: RestaurantInfoLabelsProps) => {
	return (
		<div>
			{/* <Popup
				trigger={ */}
			<RatingLabel title='Oceny'>
				<Icon name='star' />
				{rating} ({ratingsCount})
			</RatingLabel>
			{/* }
				pinned
				content='Oceny'
			/> */}

			<RatingLabel title='Czas dostawy'>
				<Icon name='clock' />
				{waitingTimeInMins[0]} - {waitingTimeInMins[1]}min
			</RatingLabel>

			<RatingLabel title='Koszt dostawy' color={deliveryPrice ? 'grey' : 'green'}>
				<Icon name='motorcycle' />
				{deliveryPrice ? priceFormat(deliveryPrice) : 'darmowa dostawa'}
			</RatingLabel>

			<RatingLabel title='Minimalna kwota zamówienia'>
				<Icon name='shopping basket' />
				Min. {priceFormat(minimalOrderAmount || 0)}
			</RatingLabel>
		</div>
	);
};

export default RestaurantInfoLabels;
