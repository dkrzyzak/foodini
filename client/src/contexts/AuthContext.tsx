import React, { useState, useEffect } from 'react';
import { getJWT as getJWTFromLS, setJWT as setJWTinLS, removeJWT as removeJWTFromLS } from '../utils/manageJWT';

interface IAuthContext {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	isLoginModalOpen: boolean;
	setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	token: string;
	setToken: (jwt: string) => void;
	onLogout: () => void;
}

// const defaultValue: IAuthContext = {
// 	isLoggedIn: false,
// 	setIsLoggedIn: () => {},
// 	isLoginModalOpen: false,
// 	setIsLoginModalOpen: () => {},
// 	token: '',
// 	setToken: () => {},
// 	onLogout: () => {},
// };

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState('');
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const onSetToken = (jwt: string) => {
		setToken(jwt);
		setJWTinLS(jwt);
	};

	const onResetToken = () => {
		setToken('');
		removeJWTFromLS();
	};

	const onLogout = () => {
		setIsLoggedIn(false);
		onResetToken();
	};

	useEffect(() => {
		const jwt = getJWTFromLS();

		if (jwt) {
			onSetToken(jwt);
			setIsLoggedIn(true);
		}
	}, []);

	const contextValue: IAuthContext = {
		isLoggedIn,
		setIsLoggedIn,
		isLoginModalOpen,
		setIsLoginModalOpen,
		token,
		setToken: onSetToken,
		onLogout,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
