import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface RestaurantPageProps {}

const RestaurantPage = (props: RestaurantPageProps) => {
	const { id } = useParams();
	return (
		<div>
			Strona restauracji o id = {id}
			<Link to='..' relative='path'>
				Powrót
			</Link>
		</div>
	);
};

export default RestaurantPage;
