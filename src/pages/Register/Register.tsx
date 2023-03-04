import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import WarningFab from '../../components/WarningFab';
import './Register.scss';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const error = '';

	const onLoginClick = useCallback(() => {
		console.log('clicked');
	}, []);

	return (
		<div className="register-container">
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
				<span color="red">x</span>
				<Button kind="primary" onClick={onLoginClick}>
					Login
				</Button>
			</form>
			<WarningFab displayOnMessage message={!error ? undefined : error} />
		</div>
	);
};

export default Register;
