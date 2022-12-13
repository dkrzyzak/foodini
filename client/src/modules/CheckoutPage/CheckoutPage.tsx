import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { useAuth } from '../../contexts/useAuth';
import { useBasket } from '../../contexts/useBasket';
import AddressForm from './AddressForm/AddressForm';
import { AddressFormValues } from './AddressForm/constants';
import CheckoutSteps from './CheckoutSteps';
import { CheckoutStep } from './constants';
import OrderTable from './OrderTable';
import * as P from './parts';
import PaymentForm from './PaymentForm/PaymentForm';
import useAddress from './useAddress';

const CheckoutPage = () => {
	const {
		isBasketEmpty,
		minimalOrderAmount,
		getBasketValue,
		getBasketWithDeliveryValue,
		basket,
	} = useBasket();

	const { isLoggedIn, token } = useAuth();

	const navigate = useNavigate();
	const [selectedAddress, setAddress] = useState<AddressFormValues>();
	const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(CheckoutStep.Delivery);

	const { handleInitialFormValues, saveSubmittedFormValues } = useAddress(
		isLoggedIn,
		token,
		setAddress
	);

	useEffect(() => {
		handleInitialFormValues();
		// eslint-disable-next-line
	}, []);

	if (isBasketEmpty() || getBasketValue() < minimalOrderAmount) {
		return <Navigate to='/restauracje' replace />;
	}

	const onConfirmAddress = (address: AddressFormValues) => {
		setAddress(address);
		saveSubmittedFormValues(address);
		setCheckoutStep(CheckoutStep.Payment);
	};

	const onReturnToDelivery = () => {
		setCheckoutStep(CheckoutStep.Delivery);
	};

	const onPlaceOrder = () => {
		// make POST /order with basket and selectedAddress
		console.log({
			basket,
			selectedAddress,
			basketValue: getBasketWithDeliveryValue(),
		});
	};

	return (
		<P.CheckoutWrapper>
			<P.HeaderSection>
				<Header as='h1'>Zamów teraz!</Header>
				<a href='#!' onClick={() => navigate(-1)}>
					Powrót
				</a>
			</P.HeaderSection>
			<OrderTable />

			<CheckoutSteps
				checkoutStep={checkoutStep}
				onReturnToDelivery={onReturnToDelivery}
			/>

			{checkoutStep === CheckoutStep.Delivery && (
				<AddressForm
					onConfirmAddress={onConfirmAddress}
					initialAddress={selectedAddress}
				/>
			)}

			{checkoutStep === CheckoutStep.Payment && (
				<PaymentForm onPlaceOrder={onPlaceOrder} />
			)}
		</P.CheckoutWrapper>
	);
};

export default CheckoutPage;
