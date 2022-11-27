import React, { useEffect, useState } from 'react';
import { Dimmer, Icon, Label, Loader } from 'semantic-ui-react';
import { Restaurant } from '../../utils/apiModels';
import { getRestaurants } from '../../utils/requests';
import { getRestaurantsDataWithImages } from './helpers';
import * as P from './parts';
import RestaurantsFilters from './RestaurantsFilters';
import RestaurantsSorting from './RestaurantsSorting';

interface RestaurantsListProps {}

const RestaurantsList = (props: RestaurantsListProps) => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>();
	const [isFetching, setIsFetching] = useState(false);

	const getRestaurantsData = async () => {
		const data = await getRestaurants('location');
		const dataWithImportedImages = await getRestaurantsDataWithImages(data);

		setTimeout(() => {
			setRestaurants(dataWithImportedImages);
			setIsFetching(false);
		}, 1000);
	};

	useEffect(() => {
		setIsFetching(true);
		getRestaurantsData();
	}, []);

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
					<h1>Wybierz spośród {restaurants?.length} restauracji!</h1>
					<RestaurantsSorting />
					<RestaurantsFilters />

					{restaurants?.map((restaurant) => (
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
									{restaurant.rating}
								</P.RatingLabel>
							</P.InfoSection>
						</P.SingleRestaurantWrapper>
					))}
				</>
			)}
		</P.RestaurantsListWrapper>
	);
};

export default RestaurantsList;
