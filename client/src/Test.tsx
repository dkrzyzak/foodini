import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface TestProps {}

const StyledExample = styled.div`
	color: ${({ theme }) => theme.colors.primary};
`;

const Test = (props: TestProps) => {
	const fetchData = async () => {
		const data = await axios.get('/test');
		console.log(data.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return <StyledExample>sraken pierdaken</StyledExample>;
};

export default Test;
