import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { Button, Header, Icon, Loader, Segment } from 'semantic-ui-react';
import { getOrders } from '../../api/ordersRequests';
import { useAuth } from '../../contexts/useAuth';
import OrderSummaryView from './OrderSummary';
import * as P from './parts';

const OrdersList = () => {
	const { token, isLoggedIn } = useAuth();

	// prettier-ignore
	const { data: orders, isLoading } = useQuery(['orders', token], () => getOrders(token));

	useEffect(() => {
		document.title = 'Foodini - twoje zamówienia';
	}, []);

	if (orders === null || !isLoggedIn) {
		return <Navigate to='/' />;
	}

	if (orders === undefined || isLoading) {
		return <Loader />;
	}

	return (
		<P.OrdersListWrapper>
			<h1>Twoje zamówienia</h1>
			{orders.length > 0 ? (
				orders.map(
					({
						orderId,
						placedAt,
						orderStatus,
						restaurantId,
						restaurantName,
						orderTotalValue,
					}) => (
						<OrderSummaryView
							key={orderId}
							orderId={orderId}
							placedAt={placedAt}
							orderStatus={orderStatus}
							restaurantId={restaurantId}
							restaurantName={restaurantName}
							orderTotalValue={orderTotalValue}
						/>
					)
				)
			) : (
				<Segment placeholder>
					<Header icon>
						<Icon name='question circle outline' />
						Wygląda na to, że nie złożyłeś jeszcze żadnego zamówienia
					</Header>
					<Button as={Link} primary to='/restauracje'>
						Złóż pierwsze zamówienie!
					</Button>
				</Segment>
			)}
		</P.OrdersListWrapper>
	);
};

export default OrdersList;
