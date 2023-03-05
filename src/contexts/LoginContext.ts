import { Dispatch, SetStateAction, createContext } from 'react';

export class Login {
	constructor(
		public userId: string = '',
		public userName: string = '',
		public expiresAt: Date = new Date(0)
	) {}

	isEmpty(): boolean {
		return this.userId === '';
	}

	isExpired(): boolean {
		return this.expiresAt < new Date();
	}
}

const LoginContext = createContext<{
	loginData: Login;
	setLoginData: Dispatch<SetStateAction<Login>>;
}>({
	loginData: new Login(),
	setLoginData: () => {},
});

export default LoginContext;
