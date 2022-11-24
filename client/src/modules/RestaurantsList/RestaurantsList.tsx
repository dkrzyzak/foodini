import React, { useEffect, useState } from 'react';
import { Restaurant } from '../../utils/apiModels';
import { getRestaurants } from '../../utils/requests';

interface RestaurantsListProps {}

const RestaurantsList = (props: RestaurantsListProps) => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>();

	const getRestaurantsData = async () => {
		const data = await getRestaurants('location');
		const dataWithImportedImages = await Promise.all(
			data.map(async (restaurant) => {
				const imageSrc = await import(`../../assets/restaurant-images/${restaurant.imageName}`);

				return {
					...restaurant,
					imageName: imageSrc.default as string,
				};
			})
		);

		setRestaurants(dataWithImportedImages);
	};

	useEffect(() => {
		console.log('siema na stronie restauracje');
		getRestaurantsData();
	}, []);

	return (
		<div>
			<h1>cipa cyce</h1>
			{restaurants?.map((restaurant) => (
				<React.Fragment key={restaurant.restaurantId}>
					<span>{restaurant.fullName}</span>
					<img src={restaurant.imageName} alt='sraka' />
				</React.Fragment>
			))}
		</div>
	);
};

export default RestaurantsList;
