import ListType from '../../types/List';

export type ListProps = {
	list: ListType;
};

const List: React.FC<ListProps> = ({ list }) => (
	<div style={{ backgroundColor: 'grey', margin: '15px' }}>
		<code>{JSON.stringify(list, null, 2)}</code>
		<br />
	</div>
);

export default List;
