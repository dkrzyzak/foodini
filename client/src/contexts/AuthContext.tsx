import React, { useState, useEffect } from 'react';
import { validateToken } from '../api/authRequests';
import {
	getJWT as getTokenFromLS,
	setJWT as setTokenInLS,
	removeJWT as removeTokenFromLS,
} from '../utils/manageJWT';

interface IAuthContext {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	isLoginModalOpen: boolean;
	setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	token: string;
	setToken: (jwt: string) => void;
	onLogout: () => void;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState('');
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const onSetToken = (jwt: string) => {
		setToken(jwt);
		setTokenInLS(jwt);
	};

	const onResetToken = () => {
		setToken('');
		removeTokenFromLS();
	};

	const onLogout = () => {
		setIsLoggedIn(false);
		onResetToken();
	};

	const validateJWT = async (jwt: string) => {
		const isValid = await validateToken(jwt);

		if (isValid) {
			onSetToken(jwt);
			setIsLoggedIn(true);
		} else {
			onLogout();
		}
	};

	useEffect(() => {
		const jwt = getTokenFromLS();

		if (jwt) {
			validateJWT(jwt);
		}
		// eslint-disable-next-line
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
