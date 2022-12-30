import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// PROVIDERS
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './utils/theme';
import { AuthProvider } from './contexts/AuthContext';
import { MediaContextProvider } from './utils/media';

// PAGES AND MODULES
import MainPage from './modules/MainPage';
import Header from './modules/Header';
import LoginModal from './modules/LoginModal/LoginModal';
import RestaurantsList from './modules/RestaurantsList/RestaurantsList';
import RestaurantPage from './modules/RestaurantPage/RestaurantPage';
import { BasketProvider } from './contexts/BasketContext';
import ScrollManager from './utils/ScrollManager';
import CheckoutPage from './modules/CheckoutPage/CheckoutPage';
import OrderPage from './modules/OrderPage/OrderPage';
import OrdersList from './modules/OrdersList/OrdersList';

function App() {
	return (
		<MediaContextProvider>
			<ThemeProvider theme={defaultTheme}>
				<QueryClientProvider client={new QueryClient()}>
					<AuthProvider>
						<BasketProvider>
							<BrowserRouter>
								<ScrollManager />
								<Header />
								<LoginModal />
								<Routes>
									<Route path='/' element={<MainPage />}></Route>
									<Route path='restauracje' element={<RestaurantsList />} />
									<Route
										path='restauracje/:restaurantId'
										element={<RestaurantPage />}
									/>
									<Route path='/checkout' element={<CheckoutPage />} />
									<Route path='/zamowienia' element={<OrdersList />} />
									<Route path='/zamowienia/:orderId' element={<OrderPage />} />
								</Routes>
							</BrowserRouter>
						</BasketProvider>
					</AuthProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</MediaContextProvider>
	);
}

export default App;
