import Checklist from './Checklist';
import Comment from './Comment';

type Note = {
	_id: string;
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
};

export default Note;
