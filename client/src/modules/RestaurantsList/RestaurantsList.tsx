import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Dimmer, Divider, Header, Icon, Loader } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/AuthContext';
import { Restaurant } from '../../api/apiModels';
import { priceFormat } from '../../utils/helpers';
import { RestaurantsSortingOptions } from './constants';
import { getRestaurantsData } from './helpers';
import * as P from './parts';
import RestaurantsSorting from './RestaurantsSorting';
import useMockRequest from './useMockRequest';
import RestaurantInfoLabels from '../RestaurantInfoLabels/RestaurantInfoLabels';

interface RestaurantsListProps {}

// TODO: save sortBy on unmount

const RestaurantsList = (props: RestaurantsListProps) => {
	const [sortBy, setSortBy] = useState<RestaurantsSortingOptions>(RestaurantsSortingOptions.Default);
	// const { token } = useContext(AuthContext);
	// useMockRequest(token);
	const { data: restaurants, isLoading } = useQuery<Restaurant[]>(['restaurants', sortBy], getRestaurantsData(sortBy));

	return (
		<P.RestaurantsListWrapper>
			{isLoading ? (
				<Dimmer active key='0'>
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
								<Link to={restaurant.restaurantId}>
									<P.PictureSection>
										<img src={restaurant.imageName} alt={restaurant.imageName} />
										<P.LogoWrapper>
											<img src={restaurant.logoName} alt={restaurant.logoName} />
										</P.LogoWrapper>
									</P.PictureSection>
								</Link>
								<P.InfoSection>
									<h2>
										<Link to={restaurant.restaurantId}>{restaurant.fullName}</Link>
									</h2>
									<h3>{restaurant.cuisineType.join(', ')}</h3>

									<RestaurantInfoLabels
										rating={restaurant.rating}
										ratingsCount={restaurant.ratingsCount}
										waitingTimeInMins={restaurant.waitingTimeInMins}
										deliveryPrice={restaurant.deliveryPrice}
										minimalOrderAmount={restaurant.minimalOrderAmount}
									/>
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
