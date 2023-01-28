import { QueryFunction } from '@tanstack/react-query';
import Board from '../types/Board';
import APIRequestParams from '../util/APIParams';
import { protectedRouteRequest } from './trellzoApiRequest';

const getBoard: QueryFunction<{ board: Board }> = async ({ meta }) => {
	const params = new APIRequestParams('get');
	params.setRoute(`/board/${meta?.boardId}`);

	return protectedRouteRequest(params);
};

export default getBoard;
