import MongoObject from './MongoObject';

type Comment = {
	userId: string;
	contents: string;
	timestamp: string;
} & MongoObject;

export default Comment;
