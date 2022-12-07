import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Restaurant } from '../../api/apiModels';
import { getRestaurantDetails } from '../../api/requests';
import RestaurantMenu from './RestaurantMenu/RestaurantMenu';

interface RestaurantPageProps {}

const RestaurantPage = (props: RestaurantPageProps) => {
	const { id = '' } = useParams();
	const { data, isLoading } = useQuery<Restaurant | null>(['restaurant', id], () => getRestaurantDetails(id));
	return (
		<div>
			Strona restauracji o id = {id}
			<Link to='..' relative='path'>
				Powrót
			</Link>
			<RestaurantMenu menu={data?.menu} />
		</div>
	);
};

export default RestaurantPage;
