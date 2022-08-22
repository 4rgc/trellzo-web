import MongoObject from './MongoObject';

type PartialNote = {
	name: string;
	description: string;
	startDate?: string;
	dueDate?: string;
} & MongoObject;

export default PartialNote;
