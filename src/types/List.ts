import MongoObject from './MongoObject';
import Note from './Note';

type List = {
	name: string;
	notes: Note[];
	notesOrder: string[];
	boardId: string;
} & MongoObject;

export default List;
