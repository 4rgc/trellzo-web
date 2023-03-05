import Cookie from 'js-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Login } from '../contexts/LoginContext';

const getLoginData = () => {
	const authToken = Cookie.get('auth');

	if (authToken) {
		const jwtObject = jwtDecode<
			JwtPayload & { userId?: string; userName?: string }
		>(authToken);
		if (jwtObject.exp) {
			return new Login(
				jwtObject.userId,
				jwtObject.userName,
				new Date(jwtObject.exp * 1000)
			);
		}
	}
	return new Login();
};

export default getLoginData;
