import { MutationFunction } from '@tanstack/react-query';
import Board from '../types/Board';
import APIRequestParams from '../util/APIParams';
import { protectedRouteRequest } from './trellzoApiRequest';

const createBoard: MutationFunction<
	{
		board: Board;
	},
	{
		name: string;
	}
> = ({ name }) => {
	const params = new APIRequestParams('post');
	params.setRoute('/board');
	params.setBodyParam('name', name);

	return protectedRouteRequest(params);
};

export default createBoard;
