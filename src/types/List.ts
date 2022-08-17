import Note from './Note';

type List = {
	_id: string;
	name: string;
	description: string;
	notes: Note[];
	notesOrder: string[];
	boardId: string;
};

export default List;
