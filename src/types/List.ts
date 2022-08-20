import MongoObject from './MongoObject';
import PartialNote from './PartialNote';

type List = {
	name: string;
	notes: PartialNote[];
	notesOrder: string[];
	boardId: string;
} & MongoObject;

export default List;
