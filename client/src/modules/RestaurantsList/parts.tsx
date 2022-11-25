import { Label as LabelBase } from 'semantic-ui-react';
import styled from 'styled-components';

export const RestaurantsListWrapper = styled.main`
	@media (min-width: 768px) {
		width: 60%;
		margin: 0 auto;
	}
`;

export const SingleRestaurantWrapper = styled.section`
	display: flex;
	border-bottom: 2px solid gray;
	margin-bottom: 12px;
`;

export const PictureSection = styled.div`
	position: relative;
`;

export const LogoWrapper = styled.span`
	position: absolute;
	top: 20px;
	left: 20px;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 4px;
	width: 80px;
	height: 80px;
	display: flex;
	justify-content: center;
	padding: 10px;

	img {
		width: 60px;
		height: auto;
		object-fit: contain;
	}
`;

export const InfoSection = styled.div`
	padding: 10px 12px;

	h2 {
		margin-bottom: 2px;
	}

	h3 {
		margin: 0;
	}
`;

export const RatingLabel = styled(LabelBase)`
	font-size: 14px !important;
`;
