import Cookie from 'js-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Login } from '../contexts/LoginContext';

const getLoginData = () => {
	const authToken = Cookie.get('auth');

	if (authToken) {
		const jwtObject = jwtDecode<JwtPayload & { userId?: string }>(
			authToken
		);
		if (jwtObject.exp && jwtObject.exp * 1000 > Date.now()) {
			return new Login(jwtObject.userId, new Date(jwtObject.exp * 1000));
		}
	}
	return new Login();
};

export default getLoginData;
