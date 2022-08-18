import Checklist from './Checklist';
import Comment from './Comment';
import MongoObject from './MongoObject';

type Note = {
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	checklists: Checklist[];
	comments: Comment[];
	checklistsOrder: string[];
	boardId: string;
	listId: string;
	//TODO: add tags
} & MongoObject;

export default Note;
