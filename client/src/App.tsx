import React from 'react';
import logo from './assets/logo-color-high.png';
import './App.css';
import Test from './Test';

import { ThemeProvider } from 'styled-components';
import defaultTheme from './utils/theme';
import { MediaContextProvider } from './utils/media';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
	return (
		<MediaContextProvider>
			<ThemeProvider theme={defaultTheme}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<MainPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</MediaContextProvider>
	);
}

export default App;
