import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import logo from '../../assets/logos/logo-color-low.png';
import { useAuth } from '../../contexts/useAuth';
import * as P from './parts';

const Header = () => {
	const { setIsLoginModalOpen, isLoggedIn, onLogout } = useAuth();

	const onLoginClick = () => {
		setIsLoginModalOpen(true);
	};

	return (
		<P.Wrapper>
			<P.Menu secondary>
				<P.LogoMenuItem as={NavLink} to='/'>
					<img src={logo} alt='logo' />
				</P.LogoMenuItem>
				<Menu.Menu position='right'>
					<Dropdown
						icon='bars'
						text='Ustawienia'
						className='icon black'
						labeled
						button
					>
						<Dropdown.Menu>
							{isLoggedIn ? (
								<>
									<Dropdown.Item
										as={NavLink}
										to='/konto'
										icon='user circle'
										text='Moje konto'
									/>
									<Dropdown.Item
										as={NavLink}
										to='/zamowienia'
										icon='unordered list'
										text='Zamówienia'
									/>
									<Dropdown.Divider />
									<Dropdown.Item
										icon='sign-in'
										text='Wyloguj się'
										onClick={onLogout}
									/>
								</>
							) : (
								<Dropdown.Item
									icon='sign-in'
									text='Zaloguj się'
									onClick={onLoginClick}
								/>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</P.Menu>
		</P.Wrapper>
	);
};

export default Header;
