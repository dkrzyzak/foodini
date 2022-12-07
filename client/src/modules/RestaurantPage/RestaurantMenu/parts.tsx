import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

export const RestaurantMenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

export const ItemWrapper = styled.div<{ hasDescription?: boolean }>`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: ${({ hasDescription }) => (hasDescription ? '120px' : '100px')};
	padding: 6px 12px;
	border: 2px solid #888;
	margin-bottom: 8px;
	border-radius: 6px;
	box-shadow: 2px 2px 2px 1px rgba(100, 100, 100, 0.2);
`;

export const LeftSideWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	h3 {
		margin-bottom: 4px;
	}

	p {
		margin-bottom: 6px;
	}
`;

export const RightSideWrapper = styled.div``;

export const ItemName = styled(Header)``;

export const ItemPrice = styled.span``;
