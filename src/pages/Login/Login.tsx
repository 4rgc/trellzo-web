import { useContext, useState } from 'react';
import './Login.scss';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import login from '../../api/login';
import WarningFab from '../../components/WarningFab';
import formatErrors, { NamedError } from '../../util/formatErrors';
import LoginContext from '../../contexts/LoginContext';
import getLoginData from '../../util/getLoginData';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { setLoginData } = useContext(LoginContext);

	const { mutate: sendLogin, error: loginError } = useMutation({
		mutationFn: login,
		onSuccess: () => {
			setLoginData(getLoginData());
			navigate('/boards');
		},
	});

	const onLoginClick = () => {
		sendLogin({ email, password });
	};

	const namedErrors: NamedError[] = [['Login', loginError]];
	const error = formatErrors(namedErrors);

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
			<WarningFab displayOnMessage message={!error ? undefined : error} />
		</div>
	);
};

export default Login;
