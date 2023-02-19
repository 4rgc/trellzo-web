import MongoObject from './MongoObject';

type PartialNote = {
	name: string;
	description: string;
	startDate?: string;
	dueDate?: string;
	// TODO: Add the type when implemented on the backend
	tags?: string[];
} & MongoObject;

export default PartialNote;
