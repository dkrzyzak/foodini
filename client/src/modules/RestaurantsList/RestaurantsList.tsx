import React, { useEffect, useState } from 'react';
import { Dimmer, Divider, Header, Icon, Label, Loader } from 'semantic-ui-react';
import { Restaurant } from '../../utils/apiModels';
import { priceFormat } from '../../utils/helpers';
import { getRestaurants } from '../../utils/requests';
import { RestaurantsSortingOptions } from './constants';
import { getRestaurantsDataWithImages } from './helpers';
import * as P from './parts';
import RestaurantsFilters from './RestaurantsFilters';
import RestaurantsSorting from './RestaurantsSorting';

interface RestaurantsListProps {}

const RestaurantsList = (props: RestaurantsListProps) => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>();
	const [isFetching, setIsFetching] = useState(false);
	const [sortBy, setSortBy] = useState<RestaurantsSortingOptions>();

	const getRestaurantsData = async () => {
		const data = await getRestaurants(sortBy);
		const dataWithImportedImages = await getRestaurantsDataWithImages(data);

		setRestaurants(dataWithImportedImages);
		setIsFetching(false);
	};

	useEffect(() => {
		setIsFetching(true);
		getRestaurantsData();
	}, [sortBy]);

	return (
		<P.RestaurantsListWrapper>
			{isFetching ? (
				<Dimmer active>
					<Loader active size='massive'>
						Wczytywanie...
					</Loader>
				</Dimmer>
			) : (
				<>
					<P.SelectRestaurantsHeading>Wybierz spośród {restaurants?.length} restauracji!</P.SelectRestaurantsHeading>
					<Divider horizontal>
						<Header as='h4'>
							<Icon name='sort content ascending' />
							Sortowanie
						</Header>
					</Divider>
					<RestaurantsSorting sortBy={sortBy} setSortBy={setSortBy} />
					{/* <RestaurantsFilters /> */}

					<Divider horizontal>
						<Header as='h4'>
							<Icon name='food' />
							Restauracje
						</Header>
					</Divider>

					{restaurants?.map((restaurant) => (
						<>
							<P.SingleRestaurantWrapper key={restaurant.restaurantId}>
								<P.PictureSection>
									<img src={restaurant.imageName} alt={restaurant.imageName} />
									<P.LogoWrapper>
										<img src={restaurant.logoName} alt={restaurant.logoName} />
									</P.LogoWrapper>
								</P.PictureSection>
								<P.InfoSection>
									<h2>{restaurant.fullName}</h2>
									<h3>{restaurant.cuisineType.join(', ')}</h3>

									<P.RatingLabel>
										<Icon name='star' />
										{restaurant.rating} ({restaurant.ratingsCount})
									</P.RatingLabel>

									<P.RatingLabel>
										<Icon name='clock' />
										{restaurant.waitingTimeInMins[0]} - {restaurant.waitingTimeInMins[1]}min
									</P.RatingLabel>

									<P.RatingLabel color={restaurant.deliveryPrice ? 'gray' : 'green'}>
										<Icon name='motorcycle' />
										{restaurant.deliveryPrice ? priceFormat(restaurant.deliveryPrice) : 'darmowa dostawa'}
									</P.RatingLabel>

									<P.RatingLabel>
										<Icon name='shopping basket' />
										Min. {priceFormat(restaurant.minimalOrderAmount)}
									</P.RatingLabel>
								</P.InfoSection>
							</P.SingleRestaurantWrapper>
							<Divider />
						</>
					))}
				</>
			)}
		</P.RestaurantsListWrapper>
	);
};

export default RestaurantsList;
