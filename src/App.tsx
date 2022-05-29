import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.scss';
import Logo from './components/Logo';

import Boards from './pages/Boards';
import Login from './pages/Login';

const App: React.FC = () => {
	const location = useLocation();

	return (
		<div className="App">
			{location.pathname !== '/login' && (
				<nav>
					<Logo />
				</nav>
			)}
			<Routes>
				<Route path="/" element={<Navigate to="/login" />} />
				<Route element={<Login />} path="login" />
				<Route element={<Boards />} path="boards" />
			</Routes>
		</div>
	);
};

export default App;
