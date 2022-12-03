import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// PROVIDERS
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './utils/theme';
import { AuthProvider } from './contexts/AuthContext';
import { MediaContextProvider } from './utils/media';

// PAGES AND MODULES
import MainPage from './pages/MainPage';
import Header from './modules/Header';
import LoginModal from './modules/LoginModal/LoginModal';
import RestaurantsList from './modules/RestaurantsList/RestaurantsList';
import RestaurantPage from './pages/RestaurantPage';

function App() {
	return (
		<MediaContextProvider>
			<ThemeProvider theme={defaultTheme}>
				<QueryClientProvider client={new QueryClient()}>
					<AuthProvider>
						<BrowserRouter>
							<Header />
							<LoginModal />
							<Routes>
								<Route path='/' element={<MainPage />}></Route>
								<Route path='restauracje' element={<RestaurantsList />} />
								<Route path='restauracje/:id' element={<RestaurantPage />} />
							</Routes>
						</BrowserRouter>
					</AuthProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</MediaContextProvider>
	);
}

export default App;
