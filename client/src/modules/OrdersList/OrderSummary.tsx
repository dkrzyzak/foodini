import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import { OrderSummary } from '../../api/apiModels';
import { priceFormat } from '../../utils/helpers';
import { useRestaurantImage } from '../../utils/useRestaurantImage';
import * as P from './parts';

type OrderSummaryProps = OrderSummary;

const OrderSummaryView = ({
	orderId,
	placedAt,
	orderStatus,
	restaurantId,
	restaurantName,
	orderTotalValue,
}: OrderSummaryProps) => {
	const imageUrl = useRestaurantImage(restaurantId, 'sm', 'jpg');

	return (
		<Link to={orderId} relative='path' state={{ fromOrdersList: true }}>
			<P.OrderSummaryWrapper>
				<P.ImageWrapper>
					<img src={imageUrl} alt={restaurantName} />
				</P.ImageWrapper>
				<P.InfoWrapper>
					<h2>Zamówienie z {restaurantName}</h2>
					<h3>Złożone {dayjs(placedAt).format('DD MMMM YYYY o HH:mm')}</h3>
					<h3>Kwota zamówienia: {priceFormat(orderTotalValue)}</h3>
					{orderStatus === 'finalized' ? (
						<Label color='blue' children='zakończone' size='large' />
					) : (
						<Label color='teal' children='w trakcie' size='large' />
					)}
				</P.InfoWrapper>
			</P.OrderSummaryWrapper>
		</Link>
	);
};

export default OrderSummaryView;
