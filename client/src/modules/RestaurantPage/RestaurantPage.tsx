import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Restaurant } from '../../api/apiModels';
import { getRestaurantDetails } from '../../api/restaurantsRequests';
import { useBasket } from '../../contexts/useBasket';
import RestaurantMenu from './RestaurantMenu/RestaurantMenu';
import * as P from './parts';
import { useRestaurantImage } from '../../utils/useRestaurantImage';
import { Button, Header, Icon, Loader, Segment } from 'semantic-ui-react';
import RestaurantInfoLabels from '../RestaurantInfoLabels/RestaurantInfoLabels';
import Basket from '../Basket/Basket';

const RestaurantPage = () => {
	const { restaurantId = '' } = useParams();
	const headerImageSrc = useRestaurantImage(restaurantId, 'xl');
	const { data: restaurant, isLoading } = useQuery<Restaurant | null>(
		['restaurant', restaurantId],
		() => getRestaurantDetails(restaurantId)
	);
	const { passCurrentMenu } = useBasket();

	useEffect(() => {
		if (restaurant?.menu.length && passCurrentMenu) {
			passCurrentMenu(
				restaurant.menu,
				restaurant.deliveryPrice,
				restaurant.minimalOrderAmount
			);
		}

		document.title = restaurant?.fullName
			? `Zamów z ${restaurant?.fullName}`
			: 'Foodini - zamów teraz';
		// eslint-disable-next-line
	}, [restaurant]);

	if (isLoading || !restaurant) {
		return <Loader />;
	}

	return (
		<>
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

					{restaurant.menu.length > 0 ? (
						<RestaurantMenu
							menu={restaurant.menu}
							restaurantId={restaurant.restaurantId}
						/>
					) : (
						<Segment placeholder>
							<Header icon>
								<Icon name='calendar times' />
								Restauracja tymczasowo zamknięta :(
							</Header>
							<Button as={Link} primary to='..' relative='path'>
								Wróć do listy restauracji
							</Button>
						</Segment>
					)}
				</P.RestaurantContentContainer>
			</P.RestaurantPageWrapper>
			<Basket />
		</>
	);
};

export default RestaurantPage;
