import React from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { getOrder } from '../../api/ordersRequests';
import { useAuth } from '../../contexts/useAuth';
import OrderTable from './OrderTable';
import { useRestaurantImage } from '../../utils/useRestaurantImage';
import * as P from './parts';
import AddressTable from './AddressTable';
import { Loader, Statistic } from 'semantic-ui-react';
import OrderStatus from './OrderStatus';

const OrderPage = () => {
	const { orderId } = useParams();
	const { state } = useLocation();
	const { token, isLoggedIn } = useAuth();

	// prettier-ignore
	const { data: order, isLoading } = useQuery(['order', orderId, token], () => getOrder(orderId!, token), {
      refetchInterval: 30000, // 30sec
   });

	const headerImageSrc = useRestaurantImage(order?.restaurantId || '', 'xl', 'avif');

	if (isLoading || order === undefined) {
		return <Loader />;
	}

	if (order === null) {
		return <Navigate to='/' />;
	}

	return (
		<P.OrderPageWrapper>
			<P.HeaderImageContainer>
				<img src={headerImageSrc} alt={order.restaurantId} />
			</P.HeaderImageContainer>
			<P.OrderContentContainer>
				<P.RestaurantName>Twoje zamówienie z {order.restaurantName}</P.RestaurantName>
				{(state?.fromOrdersList || isLoggedIn) && (
					<Link to='..' relative='path'>
						<h3>Powrót</h3>
					</Link>
				)}

				{order.orderStatus !== 'finalized' && (
					<Statistic>
						<Statistic.Value>{order.estimatedHourOfDelivery}</Statistic.Value>
						<Statistic.Label>Przewidywana godzina dostawy</Statistic.Label>
					</Statistic>
				)}

				<OrderStatus orderStatus={order.orderStatus} />

				<OrderTable
					basket={order?.basket!}
					basketValue={order?.priceInfo.basketValue!}
					deliveryPrice={order?.priceInfo.deliveryPrice!}
					orderTotalValue={order?.priceInfo.orderTotalValue!}
				/>

				<AddressTable
					streetAndNr={order?.address.streetAndNr!}
					city={order?.address.city!}
					postalCode={order?.address.postalCode!}
					phoneNr={order?.address.phoneNr!}
					orderStatus={order.orderStatus}
					placedAt={order.placedAt}
				/>
			</P.OrderContentContainer>
		</P.OrderPageWrapper>
	);
};

export default OrderPage;
