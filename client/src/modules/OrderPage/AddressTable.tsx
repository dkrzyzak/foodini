import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { Table } from 'semantic-ui-react';
import { Address, OrderStatus } from '../../api/apiModels';
import { formatPhoneNr } from './helpers';

dayjs.locale('pl');

type AddressTableProps = Address & {
	orderStatus: OrderStatus;
	placedAt: Date;
};

const AddressTable = ({
	streetAndNr,
	city,
	postalCode,
	phoneNr,
	orderStatus,
	placedAt,
}: AddressTableProps) => {
	return (
		<Table celled striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan='3'>
						Zamówienie{' '}
						{orderStatus === 'finalized' ? 'dostarczyliśmy' : 'dostarczymy'} na
						adres
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Ulica i numer</Table.Cell>
					<Table.Cell>{streetAndNr}</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Miasto i kod pocztowy</Table.Cell>
					<Table.Cell>
						{postalCode} {city}
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Telefon kontaktowy</Table.Cell>
					<Table.Cell>{formatPhoneNr(phoneNr)}</Table.Cell>
				</Table.Row>
				{orderStatus === 'finalized' && (
					<Table.Row>
						<Table.Cell>Zamówienie złożono</Table.Cell>
						<Table.Cell>
							{dayjs(placedAt).locale('pl').format('D MMMM YYYY o HH:mm')}
						</Table.Cell>
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	);
};

export default AddressTable;
