import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Icon, Message } from 'semantic-ui-react';
import { useBasket } from '../../contexts/useBasket';
import { priceFormat } from '../../utils/helpers';
import * as P from './parts';

interface BasketProps {}

const getRestaurantIdFromPathName = (pathname: string) => {
	return pathname.replace('/restauracje/', '');
};

const Basket = (props: BasketProps) => {
	// prettier-ignore
	const { getBasketValue, isBasketEmpty, minimalOrderAmount, basketRestaurantId } = useBasket();
	const { pathname } = useLocation();

	if (isBasketEmpty()) {
		return null;
	}

	if (basketRestaurantId !== getRestaurantIdFromPathName(pathname)) {
		return null;
	}

	const currentBasketValue = getBasketValue();
	const areMinimalRequirementsMet = currentBasketValue >= minimalOrderAmount;

	return (
		<P.BasketWrapper areMinimalRequirementsMet={areMinimalRequirementsMet}>
			{areMinimalRequirementsMet ? (
				<Button
					icon
					labelPosition='left'
					size='big'
					positive
					as={Link}
					to='/checkout'
				>
					<Icon name='cart' />
					Kontynuuj ({priceFormat(currentBasketValue)})
				</Button>
			) : (
				<div>
					<Message warning size='mini'>
						<Message.Header>
							Nie spełniono minimalnej kwoty zamówienia
						</Message.Header>
						<p>
							Brakuje jeszcze{' '}
							{priceFormat(minimalOrderAmount - currentBasketValue)}
						</p>
					</Message>
				</div>
			)}
		</P.BasketWrapper>
	);
};

export default Basket;
