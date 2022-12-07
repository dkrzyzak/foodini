import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Restaurant } from '../../api/apiModels';
import { getRestaurantDetails } from '../../api/requests';
import RestaurantMenu from './RestaurantMenu/RestaurantMenu';
import * as P from './parts';
import { useHeaderImage } from './helpers';
import { Loader } from 'semantic-ui-react';
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
				<span>
					<P.RestaurantName>{restaurant.fullName}</P.RestaurantName>
					<Link to='..' relative='path'>
						Powrót
					</Link>
				</span>

				<RestaurantInfoLabels
					rating={restaurant.rating}
					ratingsCount={restaurant.ratingsCount}
					waitingTimeInMins={restaurant.waitingTimeInMins}
					deliveryPrice={restaurant.deliveryPrice}
					minimalOrderAmount={restaurant.minimalOrderAmount}
				/>

				<RestaurantMenu menu={restaurant.menu} restaurantId={restaurant.restaurantId} />
			</P.RestaurantContentContainer>
		</P.RestaurantPageWrapper>
	);
};

export default RestaurantPage;
