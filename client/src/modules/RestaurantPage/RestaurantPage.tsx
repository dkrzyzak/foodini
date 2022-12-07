import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Restaurant } from '../../api/apiModels';
import { getRestaurantDetails } from '../../api/requests';
import RestaurantMenu from './RestaurantMenu/RestaurantMenu';
import * as P from './parts';
import { useHeaderImage } from './helpers';
import { Icon, Loader } from 'semantic-ui-react';
import { priceFormat } from '../../utils/helpers';
import RestaurantInfoLabels from '../RestaurantInfoLabels/RestaurantInfoLabels';

interface RestaurantPageProps {}

const RestaurantPage = (props: RestaurantPageProps) => {
	const { id = '' } = useParams();
	const headerImageSrc = useHeaderImage(id);
	const { data: restaurant, isLoading } = useQuery<Restaurant | null>(['restaurant', id], () => getRestaurantDetails(id));

	if (isLoading || !restaurant) {
		return <Loader />;
	}

	return (
		<P.RestaurantPageWrapper>
			<P.HeaderImageContainer>
				<img src={headerImageSrc} alt={restaurant.restaurantId} />
			</P.HeaderImageContainer>
			<P.RestaurantContentContainer>
				<h1>{restaurant.fullName}</h1>

				<RestaurantInfoLabels
					rating={restaurant.rating}
					ratingsCount={restaurant.ratingsCount}
					waitingTimeInMins={restaurant.waitingTimeInMins}
					deliveryPrice={restaurant.deliveryPrice}
					minimalOrderAmount={restaurant.minimalOrderAmount}
				/>

				<Link to='..' relative='path'>
					Powrót
				</Link>
				<RestaurantMenu menu={restaurant.menu} />
			</P.RestaurantContentContainer>
		</P.RestaurantPageWrapper>
	);
};

export default RestaurantPage;
