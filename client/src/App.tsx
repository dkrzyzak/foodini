import React from 'react';
import Test from './Test';

import { ThemeProvider } from 'styled-components';
import defaultTheme from './utils/theme';
import { MediaContextProvider } from './utils/media';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './modules/Header';
import { AuthProvider } from './contexts/AuthContext';
import LoginModal from './modules/LoginModal/LoginModal';

function App() {
	return (
		<MediaContextProvider>
			<ThemeProvider theme={defaultTheme}>
				<AuthProvider>
					<BrowserRouter>
						<Header />
						<LoginModal />
						<Routes>
							<Route path='/' element={<MainPage />} />
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</ThemeProvider>
		</MediaContextProvider>
	);
}

export default App;
