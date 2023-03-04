import { MutationFunction } from '@tanstack/react-query';
import APIRequestParams from '../util/APIParams';
import { unprotectedRouteRequest } from './trellzoApiRequest';

const refresh: MutationFunction<
	{ message: string },
	{ name: string; email: string; password: string }
> = async ({ name, email, password }) => {
	const params = new APIRequestParams('post');
	params.setRoute('/user/register');
	params.setBodyParam('name', name);
	params.setBodyParam('email', email);
	params.setBodyParam('password', password);

	return unprotectedRouteRequest(params);
};

export default refresh;
