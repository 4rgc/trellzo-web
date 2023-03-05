import {
	Routes,
	Route,
	useLocation,
	Navigate,
	useNavigate,
} from 'react-router-dom';
import './App.scss';
import Logo from './components/Logo';
import Board from './pages/Board';

import Boards from './pages/Boards';
import Login from './pages/Login';
import { useQuery } from '@tanstack/react-query';
import SignUp from './pages/SignUp';
import LoginContext from './contexts/LoginContext';
import { useEffect, useMemo, useState } from 'react';
import refresh from './api/refresh';
import getLoginData from './util/getLoginData';

let didInit = false;

const App: React.FC = () => {
	const navigate = useNavigate();
	const refreshQuery = useQuery({
		queryKey: ['refresh'],
		queryFn: refresh,
		onSuccess: () => {
			setLoginData(getLoginData());
		},
		onError: () => {
			navigate('/login');
		},
		enabled: false,
	});
	const location = useLocation();
	const [loginData, setLoginData] = useState(() => {
		const loginData = getLoginData();

		if (!loginData.isEmpty() && loginData.isExpired()) {
			refreshQuery.refetch();
		}
		return loginData;
	});
	const currentLoginContext = useMemo(
		() => ({ loginData, setLoginData }),
		[loginData]
	);

	useEffect(() => {
		if (!didInit) {
			didInit = true;
			if (loginData.isEmpty()) navigate('/login');
		}
		// Only need to run on mount.
		// Running from inside loginData state initializer function does not work,
		// since navigate wants to be run from inside a useEffect.
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);

	return (
		<LoginContext.Provider value={currentLoginContext}>
			<div className="App">
				{!['/login', '/signUp'].includes(location.pathname) && (
					<>
						<nav>
							<Logo />
							{!loginData.isEmpty() && !loginData.isExpired() && (
								<span
									style={{
										margin: 'auto 0 auto auto',
									}}
								>
									Welcome, {loginData.userName}!
								</span>
							)}
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
					<Route
						path="/"
						element={
							<Navigate
								to={
									!loginData.isEmpty() &&
									!loginData.isExpired()
										? '/boards'
										: '/login'
								}
							/>
						}
					/>
					<Route element={<Login />} path="login" />
					<Route element={<SignUp />} path="signUp" />
					<Route element={<Boards />} path="boards" />
					<Route element={<Board />} path="b/:id" />
				</Routes>
			</div>
		</LoginContext.Provider>
	);
};

export default App;
