import { Label as LabelBase, Dropdown as DropdownBase } from 'semantic-ui-react';
import styled from 'styled-components';

export const RestaurantsListWrapper = styled.main`
	margin-top: 20px;

	@media (min-width: 768px) {
		width: 60%;
		margin: 20px auto 0;
	}
`;

export const SelectRestaurantsHeading = styled.h1`
	padding: 2px 10px;
`;

export const SingleRestaurantWrapper = styled.section`
	display: flex;
	flex-direction: column;
	width: 70%;
	margin: 0 auto 12px;

	@media (min-width: 768px) {
		flex-direction: row;
		width: 100%;
	}
`;

export const PictureSection = styled.div`
	position: relative;
	height: 100%;

	> img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (min-width: 768px) {
		> img {
		}
	}
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

		a {
			color: black;
			:hover {
				text-decoration: underline;
			}
		}
	}

	h3 {
		margin: 0 0 6px;
		color: #777;
	}

	@media (min-width: 768px) {
		width: 40%;
	}
`;

export const RatingLabel = styled(LabelBase)`
	font-size: 14px !important;
	cursor: default;
	margin-top: 5px !important;
	margin-right: 5px;
`;

// RESTAURANTS SORTING
export const RestaurantsSortingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px 0;

	.ui.selection.dropdown .menu {
		max-height: unset;
	}
`;

export const SortBySpan = styled.span`
	margin-right: 20px;
	font-size: 20px;
`;

export const Dropdown = styled(DropdownBase)`
	width: 230px;
`;
