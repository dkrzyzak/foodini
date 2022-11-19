import React, { useState } from 'react';

interface IAuthContext {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	isLoginModalOpen: boolean;
	setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: IAuthContext = {
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	isLoginModalOpen: false,
	setIsLoginModalOpen: () => {},
};

const AuthContext = React.createContext<IAuthContext>(defaultValue);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const contextValue: IAuthContext = {
		isLoggedIn,
		setIsLoggedIn,
		isLoginModalOpen,
		setIsLoginModalOpen,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
