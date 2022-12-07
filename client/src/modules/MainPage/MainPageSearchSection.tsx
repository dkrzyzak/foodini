import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as P from './parts';
import { Media } from '../../utils/media';

interface MainPageSearchSectionProps {}

const MainPageSearchSection = (props: MainPageSearchSectionProps) => {
	const navigate = useNavigate();
	const [location, setLocation] = useState('');

	const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(e.target.value);
		setLocation(e.target.value);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onNextClick();
		}
	};

	const onNextClick = () => {
		if (!location) {
			return;
		}

		navigate(`/restauracje`, {
			state: {
				location,
			},
		});
	};

	return (
		<P.MainPageWrapper>
			<P.HeroWrapper>
				<P.H1>Na co masz smaka?</P.H1>
				<P.H2>Podaj adres i znajdź restaurację z dostawą w Twojej okolicy!</P.H2>
				<P.FromWrapper>
					<Media at='zero'>
						<Input
							onChange={onChangeLocation}
							size='small'
							action={{
								icon: 'arrow circle right',
								onClick: onNextClick,
							}}
							placeholder='Wpisz miasto...'
						/>
					</Media>
					<Media greaterThanOrEqual='mobile'>
						<P.InputWrapper>
							<Input
								icon={'point'}
								iconPosition={'left'}
								placeholder={'Wpisz swoje miasto...'}
								onChange={onChangeLocation}
								onKeyDown={onKeyDown}
							/>
							<Button content={<span>Dalej</span>} icon='right arrow' labelPosition='right' onClick={onNextClick} />
						</P.InputWrapper>
					</Media>
				</P.FromWrapper>
			</P.HeroWrapper>
		</P.MainPageWrapper>
	);
};

export default MainPageSearchSection;
