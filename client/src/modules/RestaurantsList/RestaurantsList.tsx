import React, { useEffect, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { Restaurant } from '../../utils/apiModels';
import { getRestaurants } from '../../utils/requests';
import { getRestaurantsDataWithImages } from './helpers';
import * as P from './parts';

interface RestaurantsListProps {}

const RestaurantsList = (props: RestaurantsListProps) => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>();

	const getRestaurantsData = async () => {
		const data = await getRestaurants('location');
		const dataWithImportedImages = await getRestaurantsDataWithImages(data);

		setRestaurants(dataWithImportedImages);
	};

	useEffect(() => {
		console.log('siema na stronie restauracje');
		getRestaurantsData();
	}, []);

	return (
		<P.RestaurantsListWrapper>
			<h1>Wybierz spośród {restaurants?.length} restauracji!</h1>
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
		</P.RestaurantsListWrapper>
	);
};

export default RestaurantsList;
