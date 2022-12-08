import styled from 'styled-components';

export const CheckoutWrapper = styled.main`
	display: flex;
	flex-direction: column;
	padding: 20px 15px;

	@media (min-width: 768px) {
		width: 70%;
		margin: 0 auto;
	}

	@media (min-width: 1200px) {
		width: 50%;
	}
`;

export const HeaderSection = styled.div`
	display: flex;
	align-items: baseline;
	margin-bottom: 12px;
	height: 40px;

	h1 {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		margin-right: 6px !important;
	}
`;
