import { FC } from 'react';
import List from '../../types/List';
import Card from '../Card';
import './NotesList.scss';

export type NotesListProps = {
	list: List;
};

const NotesList: FC<NotesListProps> = ({ list }) => {
	return (
		<div className="notes-list">
			<span className="notes-list-name">{list.name}</span>
			{list.notes.length ? (
				list.notes
					.sort(
						(a, b) =>
							list.notesOrder.indexOf(a._id) -
							list.notesOrder.indexOf(b._id)
					)
					.map((n) => (
						<Card
							key={n._id}
							size="sm"
							title={n.name}
							content={n.description}
							isImageDisabled
						/>
					))
			) : (
				<span className="notes-list-empty-msg">Nothing here yet.</span>
			)}
		</div>
	);
};

export default NotesList;
