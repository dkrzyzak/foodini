import styled from 'styled-components';
import { Menu as MenuBase } from 'semantic-ui-react';

export const Wrapper = styled.header`
	background: ${({ theme }) => theme.colors.secondaryDark};
	height: 100px;
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 20;

	.dropdown {
		color: white !important;
	}

	.menu.right {
		height: 40px;
	}
`;

export const Menu = styled(MenuBase)`
	height: 90px;
	padding: 10px 20px;
	align-items: center;
`;

export const LogoMenuItem = styled(MenuBase.Item)`
	width: 100px;
	height: 70px;

	img {
		width: 100%;
		height: auto;
	}
`;
