import styled from 'styled-components';

export const BasketWrapper = styled.section<{ areMinimalRequirementsMet: boolean }>`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100px;
	z-index: 2;
	color: white;
	font-size: 20px;
	background: ${({ theme }) => theme.colors.secondaryDark};
	display: flex;
	justify-content: center;
	align-items: center;

	@media (min-width: 1080px) {
		background: transparent;
		width: 400px;
		right: 20px;
		bottom: 50px;
		left: unset;
		border-radius: 10px;
		width: ${({ areMinimalRequirementsMet }) => (areMinimalRequirementsMet ? '280px' : '400px')};
	}
`;
