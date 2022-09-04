import { Droppable } from '@hello-pangea/dnd';
import { FC } from 'react';
import List from '../../types/List';
import NoteCard from '../NoteCard';
import './NotesList.scss';

export type NotesListProps = {
	list: List;
};

const NotesList: FC<NotesListProps> = ({ list }) => {
	return (
		<Droppable droppableId={list._id}>
			{(provided) => {
				return (
					<div
						className="notes-list"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<span className="notes-list-name">{list.name}</span>
						{list.notes.length ? (
							<>
								{list.notes
									.sort(
										(a, b) =>
											list.notesOrder.indexOf(a._id) -
											list.notesOrder.indexOf(b._id)
									)
									.map((n, index) => (
										<NoteCard
											key={n._id}
											note={n}
											index={index}
										/>
									))}
								{provided.placeholder}
							</>
						) : (
							<span className="notes-list-empty-msg">
								Nothing here yet.
							</span>
						)}
					</div>
				);
			}}
		</Droppable>
	);
};

export default NotesList;
