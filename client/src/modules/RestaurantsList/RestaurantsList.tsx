import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Dimmer, Divider, Header, Icon, Loader } from 'semantic-ui-react';
import { Restaurant } from '../../api/apiModels';
import { RestaurantsSortingOptions } from './constants';
import { getRestaurantsData, getSortingFromLS, saveSortingToLS } from './helpers';
import * as P from './parts';
import RestaurantsSorting from './RestaurantsSorting';
import RestaurantInfoLabels from '../RestaurantInfoLabels/RestaurantInfoLabels';

const RestaurantsList = () => {
	const [sortBy, setSortBy] = useState<RestaurantsSortingOptions>(
		getSortingFromLS() || RestaurantsSortingOptions.Default
	);

	const { data: restaurants, isLoading } = useQuery<Restaurant[]>(
		['restaurants', sortBy],
		getRestaurantsData(sortBy)
	);

	const onSortingOptionChange = (newValue: RestaurantsSortingOptions) => {
		setSortBy(newValue);
		saveSortingToLS(newValue);
	};

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
					<P.SelectRestaurantsHeading>
						Wybierz spośród {restaurants?.length} restauracji!
					</P.SelectRestaurantsHeading>
					<Divider horizontal>
						<Header as='h4'>
							<Icon name='sort content ascending' />
							Sortowanie
						</Header>
					</Divider>
					<RestaurantsSorting sortBy={sortBy} setSortBy={onSortingOptionChange} />

					<Divider horizontal>
						<Header as='h4'>
							<Icon name='food' />
							Restauracje
						</Header>
					</Divider>

					{restaurants?.map((restaurant) => (
						<React.Fragment key={restaurant.restaurantId}>
							<P.SingleRestaurantWrapper>
								<Link to={restaurant.restaurantId}>
									<P.PictureSection>
										<img
											src={restaurant.imageName}
											alt={restaurant.imageName}
										/>
										<P.LogoWrapper>
											<img
												src={restaurant.logoName}
												alt={restaurant.logoName}
											/>
										</P.LogoWrapper>
									</P.PictureSection>
								</Link>
								<P.InfoSection>
									<h2>
										<Link to={restaurant.restaurantId}>
											{restaurant.fullName}
										</Link>
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
						</React.Fragment>
					))}
				</>
			)}
		</P.RestaurantsListWrapper>
	);
};

export default RestaurantsList;
