import CheckItem from './CheckItem';
import MongoObject from './MongoObject';

type Checklist = {
	name: string;
	checkItems: CheckItem[];
	checkItemsOrder: string[];
} & MongoObject;

export default Checklist;
