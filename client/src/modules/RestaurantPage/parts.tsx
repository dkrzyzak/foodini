import styled from 'styled-components';

export const RestaurantPageWrapper = styled.main`
	display: flex;
	flex-direction: column;
`;

export const HeaderImageContainer = styled.div`
	width: 100%;
	height: 200px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const RestaurantContentContainer = styled.section`
	width: 90%;
	margin: 10px auto;

	@media (min-width: 600px) {
		width: 65%;
	}

	@media (min-width: 1080px) {
		width: 45%;
	}
`;

export const RestaurantName = styled.h1`
	display: inline;
	margin-right: 6px;
`;
