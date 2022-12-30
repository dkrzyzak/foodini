import styled from 'styled-components';

export const ProfilePageWrapper = styled.main`
	width: 80%;
	margin: 20px auto;

	@media (min-width: 768px) {
		width: 60%;
	}

	@media (min-width: 1200px) {
		width: 50%;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	h1 {
		margin: 0;
	}
`;

export const StatisticsContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	margin-bottom: 40px;

	.ui.statistic {
		margin: 0 !important;
	}
`;
