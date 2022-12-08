import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { BasketContext } from '../../contexts/BasketContext';
import OrderTable from './OrderTable';
import * as P from './parts';

interface CheckoutPageProps {}

const CheckoutPage = (props: CheckoutPageProps) => {
	const { isBasketEmpty, minimalOrderAmount, getBasketValue } = useContext(BasketContext);
	const navigate = useNavigate();

	if (isBasketEmpty() || getBasketValue() < minimalOrderAmount) {
		return <Navigate to='/restauracje' replace />;
	}

	return (
		<P.CheckoutWrapper>
			<P.HeaderSection>
				<Header as='h1'>Zamów teraz!</Header>
				<a href='#!' onClick={() => navigate(-1)}>
					Powrót
				</a>
			</P.HeaderSection>
			<OrderTable />
		</P.CheckoutWrapper>
	);
};

export default CheckoutPage;
