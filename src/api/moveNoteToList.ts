import { MutationFunction } from '@tanstack/react-query';
import List from '../types/List';
import { protectedRouteRequest } from './trellzoApiRequest';
import APIRequestParams from '../util/APIParams';

const moveNoteToList: MutationFunction<
	{
		sourceList: List;
		destinationList: List;
	},
	{
		boardId: string;
		listId: string;
		otherListId: string;
		noteId: string;
		otherListIndex: number;
	}
> = ({ boardId, listId, otherListId, noteId, otherListIndex }) => {
	const params = new APIRequestParams('post');
	params.setRoute(`/list/${boardId}/${listId}/moveNoteTo/${otherListId}`);
	params.setBodyParams([
		['noteId', noteId],
		['otherListIndex', otherListIndex],
	]);

	return protectedRouteRequest(params);
};

export default moveNoteToList;
