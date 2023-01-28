import { MutationFunction } from '@tanstack/react-query';
import APIRequestParams from '../util/APIParams';
import List from '../types/List';
import { protectedRouteRequest } from './trellzoApiRequest';

const updateList: MutationFunction<
	{
		list: List;
	},
	{
		boardId: string;
		listId: string;
		newList: Partial<Pick<List, 'name' | 'notesOrder'>>;
	}
> = ({ boardId, listId, newList }) => {
	const params = new APIRequestParams('post');
	params.setRoute(`/list/${boardId}/${listId}`);
	params.setBodyParams(Object.entries(newList));

	return protectedRouteRequest(params);
};

export default updateList;
