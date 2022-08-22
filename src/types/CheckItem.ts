import MongoObject from './MongoObject';

type CheckItem = {
	name: string;
	checked: boolean;
} & MongoObject;

export default CheckItem;
