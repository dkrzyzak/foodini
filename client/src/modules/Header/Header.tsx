import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import logo from '../../assets/logo-color-high.png';
import { AuthContext } from '../../contexts/AuthContext';
import * as P from './parts';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
	const { setIsLoginModalOpen } = useContext(AuthContext);

	const onLoginClick = () => {
		setIsLoginModalOpen(true);
	};

	return (
		<P.Wrapper>
			<P.Menu secondary>
				<P.LogoMenuItem as={NavLink} to='/'>
					<img src={logo} alt='logo' />
				</P.LogoMenuItem>
				{/* <Menu.Item
					name='messages'
					//  active={activeItem === 'messages'}
					//  onClick={this.handleItemClick}
				/>
				<Menu.Item
					name='friends'
					//  active={activeItem === 'friends'}
					//  onClick={this.handleItemClick}
				/> */}
				<Menu.Menu position='right'>
					<Dropdown icon='bars' text='Ustawienia' className='icon black' labeled button>
						<Dropdown.Menu>
							<Dropdown.Item icon='sign-in' text='Zaloguj się' onClick={onLoginClick} />
							<Dropdown.Divider />
							<Dropdown.Item icon='crosshairs' text='Zmień lokalizację' />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</P.Menu>
		</P.Wrapper>
	);
};

export default Header;
