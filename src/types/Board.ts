import List from './List';
import MongoObject from './MongoObject';

type Board = {
	name: string;
	description: string;
	lists: List[];
	listsOrder: string[];
	userIds: string[];
	//TODO: add tags
} & MongoObject;

export default Board;
