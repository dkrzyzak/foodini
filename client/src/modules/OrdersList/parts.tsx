import styled from 'styled-components';

export const OrdersListWrapper = styled.main`
	display: flex;
	flex-direction: column;
	gap: 15px;

	width: 90%;
	margin: 20px auto;

	@media (min-width: 800px) {
		width: 75%;
	}

	@media (min-width: 1200px) {
		width: 800px;
	}
`;

export const OrderSummaryWrapper = styled.div`
	width: 100%;
	padding: 10px 20px;
	border-radius: 4px;
	box-shadow: 1px 1px 1px 1px rgba(66, 68, 90, 1);
	display: flex;
	flex-flow: row nowrap;
	align-items: center;

	@media (min-width: 720px) {
		align-items: flex-start;
	}
`;

export const ImageWrapper = styled.div`
	width: 20vmin;
	height: 20vmin;
	min-height: 100px;
	min-width: 100px;
	max-height: 150px;
	max-width: 150px;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		clip-path: circle;
		border-radius: 50%;
	}
`;

export const InfoWrapper = styled.div`
	margin-left: 20px;

	h2 {
		margin-bottom: 5px;
	}

	h3 {
		margin: 5px 0;
	}

	@media (min-width: 800px) {
		margin-left: 32px;
	}
`;
