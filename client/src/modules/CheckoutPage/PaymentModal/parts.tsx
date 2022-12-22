import { Segment as SegmentBase } from 'semantic-ui-react';
import styled from 'styled-components';

export const Segment = styled(SegmentBase)`
	height: 200px;
	display: flex;
	flex-direction: row;
	align-items: center;

	.message {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
