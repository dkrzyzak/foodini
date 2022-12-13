import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import { getAddress, postAddress } from '../../api/requests';
import { useAuth } from '../../contexts/useAuth';
import { useBasket } from '../../contexts/useBasket';
import AddressForm from './AddressForm/AddressForm';
import { AddressFormValues } from './AddressForm/constants';
import CheckoutSteps from './CheckoutSteps';
import { CheckoutStep } from './constants';
import OrderTable from './OrderTable';
import * as P from './parts';
import PaymentForm from './PaymentForm/PaymentForm';

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

	const handleInitialFormValues = async () => {
		if (isLoggedIn) {
			const addressFromApi = await getAddress(token);
			if (addressFromApi) {
				setAddress(addressFromApi);
			}
		} else {
			const addressFromCookie = Cookies.get('address');
			if (addressFromCookie) {
				setAddress(JSON.parse(addressFromCookie));
			}
		}
	};

	useEffect(() => {
		handleInitialFormValues();
		// eslint-disable-next-line
	}, []);

	if (isBasketEmpty() || getBasketValue() < minimalOrderAmount) {
		return <Navigate to='/restauracje' replace />;
	}

	const onConfirmAddress = (address: AddressFormValues) => {
		setAddress(address);

		if (isLoggedIn) {
			postAddress(address, token);
		} else {
			Cookies.set('address', JSON.stringify(address));
		}
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
