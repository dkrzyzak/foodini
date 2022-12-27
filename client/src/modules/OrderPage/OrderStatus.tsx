import React from 'react';
import { Icon, Step } from 'semantic-ui-react';
import { OrderStatus } from '../../api/apiModels';

interface OrderStatusProps {
	orderStatus: OrderStatus;
}

const enumerateStatus = (status: OrderStatus): number => {
	if (!status) return -1;

	if (status === 'received') return 0;

	if (status === 'in progress') return 1;

	if (status === 'in delivery') return 2;

	return 3;
};

const OrderStatusSteps = ({ orderStatus }: OrderStatusProps) => {
	const enumeratedStatus = enumerateStatus(orderStatus);

	return (
		<div>
			<Step.Group vertical>
				<Step completed>
					<Icon name='payment' />
					<Step.Content>
						<Step.Title>Opłacono</Step.Title>
						{enumeratedStatus === 0 && (
							<Step.Description>Płatność została zaksięgowana</Step.Description>
						)}
					</Step.Content>
				</Step>

				<Step
					active={enumeratedStatus === 1}
					disabled={enumeratedStatus < 1}
					completed={enumeratedStatus > 1}
				>
					<Icon name='utensils' />
					<Step.Content>
						<Step.Title>W trakcie przygotowania</Step.Title>
						{enumeratedStatus === 1 && (
							<Step.Description>
								Restauracja przygotowuje zamówione przez ciebie potrawy
							</Step.Description>
						)}
					</Step.Content>
				</Step>

				<Step
					active={enumeratedStatus === 2}
					disabled={enumeratedStatus < 2}
					completed={enumeratedStatus > 2}
				>
					<Icon name='shipping fast' />
					<Step.Content>
						<Step.Title>W trakcie dostawy</Step.Title>
						{enumeratedStatus === 2 && (
							<Step.Description>
								Dostawca już jedzie z zamówieniem na wskazany adres
							</Step.Description>
						)}
					</Step.Content>
				</Step>

				<Step disabled={enumeratedStatus < 3} completed={enumeratedStatus === 3}>
					<Icon name='clipboard check' />
					<Step.Content>
						<Step.Title>Dostarczono</Step.Title>
						{enumeratedStatus === 3 && (
							<Step.Description>Smacznego!</Step.Description>
						)}
					</Step.Content>
				</Step>
			</Step.Group>
		</div>
	);
};

export default OrderStatusSteps;
