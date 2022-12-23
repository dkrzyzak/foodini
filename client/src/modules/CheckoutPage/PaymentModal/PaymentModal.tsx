import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dimmer, Icon, Loader, Message, Modal } from 'semantic-ui-react';
import { PostOrderData } from '../../../api/apiModels';
import { postOrder } from '../../../api/ordersRequests';
import { useAuth } from '../../../contexts/useAuth';
import { useBasket } from '../../../contexts/useBasket';
import { AddressFormValues } from '../AddressForm/constants';
import * as P from './parts';

interface PaymentModalProps {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	selectedAddress: AddressFormValues;
}

const PaymentModal = ({ isOpen, setOpen, selectedAddress }: PaymentModalProps) => {
	const [isLoading, setLoading] = useState(false);
	const [isSuccess, setSuccess] = useState(false);
	const navigate = useNavigate();
	const { basketOrderItems, getBasketValue, getBasketWithDeliveryValue, deliveryPrice } =
		useBasket();
	const { token } = useAuth();

	const performModalAnimation = async () => {
		setLoading(true);

		const orderData: PostOrderData = {
			basket: basketOrderItems,
			priceInfo: {
				basketValue: getBasketValue(),
				deliveryPrice,
				orderTotalValue: getBasketWithDeliveryValue(),
			},
			address: selectedAddress,
		};
		const { success, id } = await postOrder(orderData, token);

		setTimeout(() => {
			setLoading(false);
			setSuccess(success);
		}, 2500);

		setTimeout(() => {
			if (success) {
				navigate(`/zamowienia/${id}`);
			}
		}, 6000);
	};

	useEffect(() => {
		if (isOpen) {
			performModalAnimation();
		}
		// eslint-disable-next-line
	}, [isOpen]);

	return (
		<Modal onOpen={() => setOpen(true)} open={isOpen}>
			<Modal.Header>Przetwarzanie płatności</Modal.Header>
			<Modal.Content>
				<P.Segment basic inverted>
					{isLoading && (
						<Dimmer active>
							<Loader size='massive' content='Czekamy na odpowiedź z banku' />
						</Dimmer>
					)}

					{isSuccess && !isLoading && (
						<Message positive className='fluid'>
							<Icon name='payment' size='big' />
							<Message.Header>Płatność zakończona sukcesem</Message.Header>
							<p>
								Za chwilę zostaniesz przekierowany na stronę śledzenia zamówienia
							</p>
						</Message>
					)}
				</P.Segment>
			</Modal.Content>
		</Modal>
	);
};

export default PaymentModal;
