import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import mainImage from '../../assets/main-bg.jpg';

export const MainPageWrapper = styled.div`
	width: 100%;
	height: calc(100vh - 100px); /* minus navbar */
	background: url('${mainImage}');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const HeroWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: -10%;
	background: ${({ theme }) => theme.colors.transparentDark};
	padding: 30px 20px;
	border-radius: 5px;
	width: 100%;

	@media (min-width: 768px) {
		width: 90%;
		padding: 50px 40px;
	}
`;

export const H1 = styled.h1`
	margin: 0 0 10px;
	color: white;
	font-size: 20px;

	@media (min-width: 768px) {
		font-size: 40px;
	}
`;

export const H2 = styled.h2`
	margin: 0 0 20px;
	color: white;
	font-size: 16px;

	@media (min-width: 768px) {
		font-size: 26px;
	}
`;

export const FromWrapper = styled.div`
	font-size: 16px;

	input {
		width: 160px;
	}

	@media (min-width: 320px) {
		input {
			width: 50%;
		}
	}

	@media (min-width: 768px) {
		font-size: 20px;

		button {
			font-size: 18px !important;
		}
	}
`;

export const InputWrapper = styled(Input)``;
