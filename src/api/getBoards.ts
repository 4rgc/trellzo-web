import { QueryFunction } from '@tanstack/react-query';
import APIRequestParams from '../util/APIParams';
import { protectedRouteRequest } from './trellzoApiRequest';
import PartialBoard from '../types/PartialBoard';

const params = new APIRequestParams('get');
params.setRoute(`/board`);

const getBoards: QueryFunction<{ boards: PartialBoard[] }> = async () => {
	return protectedRouteRequest(params);
};

export default getBoards;
