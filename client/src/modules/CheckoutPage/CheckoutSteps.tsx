import React from 'react';
import { Icon, Step } from 'semantic-ui-react';
import { CheckoutStep } from './constants';

interface CheckoutStepsProps {
	checkoutStep: CheckoutStep;
	onReturnToDelivery: () => void;
}

const CheckoutSteps = ({ checkoutStep, onReturnToDelivery }: CheckoutStepsProps) => {
	return (
		<Step.Group>
			<Step
				active={checkoutStep === CheckoutStep.Delivery}
				completed={checkoutStep === CheckoutStep.Payment}
				onClick={
					checkoutStep === CheckoutStep.Payment ? onReturnToDelivery : undefined
				}
			>
				<Icon name='truck' />
				<Step.Content>
					<Step.Title>Dostawa</Step.Title>
					<Step.Description>Podaj adres dostawy</Step.Description>
				</Step.Content>
			</Step>

			<Step
				active={checkoutStep === CheckoutStep.Payment}
				disabled={checkoutStep === CheckoutStep.Delivery}
			>
				<Icon name='payment' />
				<Step.Content>
					<Step.Title>Płatność</Step.Title>
					<Step.Description>Opłać zamówienie</Step.Description>
				</Step.Content>
			</Step>
		</Step.Group>
	);
};

export default CheckoutSteps;
