import { QueryFunction } from '@tanstack/react-query';
import APIRequestParams from '../util/APIParams';
import { unprotectedRouteRequest } from './trellzoApiRequest';

const refresh: QueryFunction<null> = async () => {
	const params = new APIRequestParams('post');
	params.setRoute('/auth/refresh');

	return unprotectedRouteRequest(params);
};

export default refresh;
