import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.scss';
import Logo from './components/Logo';
import Board from './pages/Board';

import Boards from './pages/Boards';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
	const location = useLocation();

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				{location.pathname !== '/login' && (
					<>
						<nav>
							<Logo />
							<span
								style={{
									margin: 'auto 0 auto auto',
									color: 'gray',
								}}
							>
								{process.env.REACT_APP_VERSION}
							</span>
						</nav>
						<div style={{ border: '0.5px solid black' }} />
					</>
				)}
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route element={<Login />} path="login" />
					<Route element={<Boards />} path="boards" />
					<Route element={<Board />} path="b/:id" />
				</Routes>
			</div>
		</QueryClientProvider>
	);
};

export default App;
