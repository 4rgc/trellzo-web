import CheckItem from './CheckItem';

type Checklist = {
	_id: string;
	name: string;
	checkItems: CheckItem[];
	checkItemsOrder: string[];
};

export default Checklist;
