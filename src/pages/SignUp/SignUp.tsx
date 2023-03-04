import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import WarningFab from '../../components/WarningFab';
import './SignUp.scss';
import LoadingBar from '../../components/LoadingBar';

const passwordStrengthColors = ['red', 'darkorange', 'orange', 'green'];

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const error = '';

	const onSignUpClick = useCallback(() => {
		console.log('clicked');
	}, []);

	const passwordMinimalReqs: Record<string, [boolean, string]> = {
		min8Chars: [
			/(?=.{8,})./.test(password),
			'Password needs to be at least 8 characters long',
		],
		upperCase: [
			/(?=.*[A-Z])/.test(password),
			'Password needs to contain at least one uppercase letter',
		],
		lowerCase: [
			/(?=.*[a-z])/.test(password),
			'Password needs to contain at least one lowercase letter',
		],
		digit: [
			/(?=.*[0-9])/.test(password),
			'Password needs to contain at least one digit',
		],
	};
	const passwordStrengthScore = Object.values(passwordMinimalReqs).filter(
		(req) => req[0] === true
	).length;
	const passwordSuggestionMessage = (Object.values(passwordMinimalReqs).find(
		(req) => req[0] === false
	) || ['', 'Strong password'])[1];

	return (
		<div className="signUp-container">
			<h1>Sign up for trellzo</h1>
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
					autoComplete="new-password"
					type="password"
					name="password"
					className="password-input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					onFocus={useCallback(() => {
						if (password === undefined) setPassword('');
					}, [password])}
					value={password}
					tabIndex={2}
				/>
				{password && (
					<>
						<LoadingBar
							state={passwordStrengthScore * 25}
							className="password-strength-bar"
							color={
								passwordStrengthColors[
									passwordStrengthScore - 1
								]
							}
						/>
						<div
							className="password-suggestion-message"
							style={{
								color: passwordStrengthColors[
									passwordStrengthScore - 1
								],
							}}
						>
							{passwordSuggestionMessage}
						</div>
					</>
				)}
				<Button
					className="signUp-button"
					kind="primary"
					onClick={onSignUpClick}
				>
					sign up
				</Button>
			</form>
			<WarningFab displayOnMessage message={!error ? undefined : error} />
		</div>
	);
};

export default SignUp;
