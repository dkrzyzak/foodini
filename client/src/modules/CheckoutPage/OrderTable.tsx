import React, { useContext } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { BasketContext } from '../../contexts/BasketContext';
import { priceFormat } from '../../utils/helpers';

interface OrderTableProps {}

const OrderTable = (props: OrderTableProps) => {
	const { basket, currentMenu, getBasketValue, deliveryPrice, getBasketWithDeliveryValue } = useContext(BasketContext);

	return (
		<div>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan='3'>Twoje zamówienie</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{Object.entries(basket).map(([itemName, itemCount], index) => (
						<Table.Row key={index}>
							<Table.Cell collapsing>
								<Icon name='food' /> {itemName}
							</Table.Cell>
							<Table.Cell>{currentMenu[itemName]?.description}</Table.Cell>
							<Table.Cell collapsing textAlign='right'>
								{itemCount} x {priceFormat(currentMenu[itemName].price)} = {priceFormat(itemCount * currentMenu[itemName].price)}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<Table>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Razem:</Table.Cell>
						<Table.Cell textAlign='right'>{priceFormat(getBasketValue())}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Koszt dostawy:</Table.Cell>
						<Table.Cell textAlign='right'>{deliveryPrice ? priceFormat(getBasketValue()) : 'Za darmo'}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Kwota całkowita:</Table.Cell>
						<Table.Cell textAlign='right'>{priceFormat(getBasketWithDeliveryValue())}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</div>
	);
};

export default OrderTable;
