import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { OrderItemInfo } from '../../api/apiModels';
import { priceFormat } from '../../utils/helpers';

interface OrderTableProps {
	basketValue: number;
	deliveryPrice: number;
	orderTotalValue: number;
	basket: OrderItemInfo[];
}

const OrderTable = ({
	basket,
	basketValue,
	deliveryPrice,
	orderTotalValue,
}: OrderTableProps) => {
	return (
		<>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan='3'>Twoje zamówienie</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{basket.map(
						({ itemName, itemDescription, itemPrice, itemQuantity }, index) => (
							<Table.Row key={index}>
								<Table.Cell collapsing>
									<Icon name='food' /> {itemName}
								</Table.Cell>
								<Table.Cell>{itemDescription}</Table.Cell>
								<Table.Cell collapsing textAlign='right'>
									{itemQuantity} x {priceFormat(itemPrice)} ={' '}
									{priceFormat(itemQuantity * itemPrice)}
								</Table.Cell>
							</Table.Row>
						)
					)}
				</Table.Body>
			</Table>
			<Table>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Razem:</Table.Cell>
						<Table.Cell textAlign='right'>{priceFormat(basketValue)}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Koszt dostawy:</Table.Cell>
						<Table.Cell textAlign='right'>
							{deliveryPrice ? priceFormat(deliveryPrice) : 'Za darmo'}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Kwota całkowita:</Table.Cell>
						<Table.Cell textAlign='right'>
							{priceFormat(orderTotalValue)}
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</>
	);
};

export default OrderTable;
