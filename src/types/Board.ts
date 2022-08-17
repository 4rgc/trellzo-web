import List from './List';

type Board = {
	_id: string;
	name: string;
	description: string;
	lists: List[];
	listsOrder: string[];
	userIds: string[];
	//TODO: add tags
};

export default Board;
