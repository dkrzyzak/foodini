import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Input } from 'semantic-ui-react';
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
					<Menu.Item>
						<Input icon='search' placeholder='Cipa cyce...' />
					</Menu.Item>
					<Menu.Item
						onClick={onLoginClick}
						// active={activeItem === 'logout'}
						// onClick={this.handleItemClick}
					>
						Zaloguj się!
					</Menu.Item>
				</Menu.Menu>
			</P.Menu>
		</P.Wrapper>
	);
};

export default Header;
