import MongoObject from './MongoObject';

type PartialBoard = {
	name: string;
	description: string;
} & MongoObject;

export default PartialBoard;
