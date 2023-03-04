import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import WarningFab from '../../components/WarningFab';
import './SignUp.scss';
import LoadingBar from '../../components/LoadingBar';
import { useMutation } from '@tanstack/react-query';
import register from '../../api/register';
import formatErrors from '../../util/formatErrors';

const passwordStrengthColors = ['red', 'darkorange', 'orange', 'green'];

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const registerQuery = useMutation({
		mutationKey: ['register'],
		mutationFn: register,
		onSuccess: () => {
			navigate('/boards');
		},
	});

	const error =
		registerQuery.isError &&
		formatErrors([['Register', registerQuery.error]]);

	const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
		email
	);

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

	const onSignUpClick = useCallback(() => {
		if (name && emailIsValid && passwordStrengthScore === 4)
			registerQuery.mutate({ name, email, password });
	}, [
		name,
		email,
		password,
		registerQuery,
		emailIsValid,
		passwordStrengthScore,
	]);

	return (
		<div className="signUp-container">
			<h1>Sign up for trellzo</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					autoComplete="name"
					type="name"
					name="name"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
					value={name}
					tabIndex={1}
				/>
				<input
					autoComplete="email"
					type="email"
					name="email"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					tabIndex={2}
				/>
				{!!email && !emailIsValid && (
					<div
						className="password-suggestion-message"
						style={{ color: 'red' }}
					>
						Please enter a valid email
					</div>
				)}
				<input
					autoComplete="new-password"
					type="password"
					name="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					onFocus={useCallback(() => {
						if (password === undefined) setPassword('');
					}, [password])}
					value={password}
					tabIndex={3}
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
