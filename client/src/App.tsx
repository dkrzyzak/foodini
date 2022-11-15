import React from 'react';
import logo from './assets/logo-color-high.png';
import './App.css';
import Test from './Test';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './utils/theme';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<div className='App'>
				<Test />
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
						Learn React
					</a>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
