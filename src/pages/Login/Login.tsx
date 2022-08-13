import { useEffect, useState } from 'react';
import './Login.scss';
import Button from '../../components/Button/Button';
import useTrellzoAPI from '../../hooks/useTrellzoAPI/useTrellzoAPI';
import APIRequestParams from '../../util/APIParams';
import { useNavigate } from 'react-router-dom';

const defaultRequestParams = new APIRequestParams('post');
defaultRequestParams.setRoute('/login');

const Login: React.FC = () => {
	const [loginData, loginError, login, changeParams] = useTrellzoAPI(
		new APIRequestParams()
	);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

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
			navigate('/boards');
		}
	}, [loginData, navigate]);

	useEffect(() => {
		if (loginError) {
			console.error(loginError);
			console.error(loginError.message);
		}
	}, [loginError]);

	return (
		<div className="login-container">
			<h1 className="app-logo">trellzo</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					autoComplete="email"
					type="email"
					name="email"
					className="email-input"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					tabIndex={1}
				/>
				<input
					autoComplete="current-password"
					type="password"
					name="password"
					className="password-input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					tabIndex={2}
				/>
				<Button kind="primary" onClick={onLoginClick}>
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;
