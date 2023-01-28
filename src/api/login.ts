import { MutationFunction } from '@tanstack/react-query';
import { unprotectedRouteRequest } from './trellzoApiRequest';
import APIRequestParams from '../util/APIParams';

const login: MutationFunction<
	{ message: string },
	{ email: string; password: string }
> = ({ email, password }) => {
	const params = new APIRequestParams('post');
	params.setRoute('/auth/login');
	params.setBodyParam('email', email);
	params.setBodyParam('password', password);

	return unprotectedRouteRequest(params);
};

export default login;
