import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { RestaurantMenuItem } from '../../../api/apiModels';
import { useBasket } from '../../../contexts/useBasket';
import { priceFormat } from '../../../utils/helpers';
import * as P from './parts';

interface RestaurantMenuProps {
	menu: RestaurantMenuItem[];
	restaurantId: string;
}

const RestaurantMenu = ({ menu, restaurantId }: RestaurantMenuProps) => {
	const { addToBasket, increaseCount, decreaseCount, isInBasket } = useBasket();

	return (
		<P.RestaurantMenuWrapper>
			{menu.map(({ name, price, description }) => (
				<P.ItemWrapper hasDescription={Boolean(description)}>
					<P.LeftSideWrapper>
						<P.ItemName as='h3'>{name}</P.ItemName>
						{description && <p>{description}</p>}
						<P.ItemPrice>
							<Label tag>{priceFormat(price)}</Label>
						</P.ItemPrice>
					</P.LeftSideWrapper>
					<P.RightSideWrapper>
						{isInBasket(name, restaurantId) ? (
							<Button.Group>
								<Button icon onClick={decreaseCount(name)}>
									<Icon name='minus' />
								</Button>
								<Button.Or text={isInBasket(name, restaurantId)} />
								<Button
									icon
									onClick={increaseCount(name)}
									disabled={isInBasket(name, restaurantId) >= 5}
								>
									<Icon name='plus' />
								</Button>
							</Button.Group>
						) : (
							<Button icon onClick={addToBasket(name, restaurantId)}>
								<Icon name='cart plus' />
							</Button>
						)}
					</P.RightSideWrapper>
				</P.ItemWrapper>
			))}
		</P.RestaurantMenuWrapper>
	);
};

export default RestaurantMenu;
