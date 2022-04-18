import { useEffect, useState, FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import useTrellzoAPI from './hooks/useTrellzoAPI/useTrellzoAPI';
import APIRequestParams from './util/APIParams';

const defaultRequestParams = new APIRequestParams('post');
defaultRequestParams.setRoute('/login');

const App: FC = () => {
	const [loginData, loginError, login, changeParams] = useTrellzoAPI(
		new APIRequestParams()
	);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onLoginClick = () => {
		const newParams = new APIRequestParams('post');
		newParams.setBodyParams([
			['email', email],
			['password', password],
		]);
		newParams.setRoute('/auth/login');
		changeParams(newParams);
		login();
	};

	useEffect(() => {
		if (loginData) {
			console.log(loginData);
		}
	}, [loginData]);

	useEffect(() => {
		if (loginError) {
			console.error(loginError);
			console.error(loginError.message);
		}
	}, [loginError]);

	return (
		<div className="App">
			<div className="login-container">
				<h1 className="app-logo">trellzo</h1>
				<input
					type="email"
					name="email"
					className="email-input"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="password"
					name="password"
					className="password-input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<Button kind="primary" onClick={onLoginClick}>
					Login
				</Button>
			</div>
		</div>
	);
};

export default App;
