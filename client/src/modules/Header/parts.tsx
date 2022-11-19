import styled from 'styled-components';
import { Menu as MenuBase } from 'semantic-ui-react';

export const Wrapper = styled.header`
	background: ${({ theme }) => theme.colors.secondaryDark};
	height: 100px;
	position: sticky;
	top: 0;

	.item {
		color: white !important;
	}
`;

export const Menu = styled(MenuBase)`
	height: 80px;
	padding: 10px 6px;
`;

export const LogoMenuItem = styled(MenuBase.Item)`
	width: 100px;
	height: 60px;

	img {
		width: 100%;
		height: auto;
	}
`;
