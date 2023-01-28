import { FC, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import WarningFab from '../../components/WarningFab';
import './Board.scss';
import NotesList from '../../components/NotesList';
import {
	DragDropContext,
	DropResult,
	OnDragEndResponder,
} from '@hello-pangea/dnd';
import { useQueryClient } from '@tanstack/react-query';
import useBoardModel from './useBoardModel';
import formatErrors, { NamedError } from '../../util/formatErrors';

const Board: FC = () => {
	const { id } = useParams();

	const queryClient = useQueryClient();

	const { boardData, boardQuery, listMutation, moveNoteToListMutation } =
		useBoardModel(id || '');
	const { refetch: refetchBoard, error: boardError } = boardQuery;
	const { mutate: updateList, error: updateListError } = listMutation;
	const { mutate: moveNoteToList, error: moveNoteToListError } =
		moveNoteToListMutation;

	const listsOrder = boardData?.board.listsOrder || [];

	const getNoteMovementDataFromDropResult = useCallback(
		(result: DropResult) => {
			const { source, destination } = result;

			if (!destination) return;

			const { droppableId: sourceListId, index: sourceIndex } = source;
			const { droppableId: destinationListId, index: destinationIndex } =
				destination;

			// Assume sourceList and destinationList exists in the context of a drag&drop
			const sourceList = boardData?.board.lists.find(
				(l) => l._id === sourceListId
			)!;
			const destinationList = boardData?.board.lists.find(
				(l) => l._id === destinationListId
			)!;

			return {
				sourceList,
				destinationList,
				sourceIndex,
				destinationIndex,
			};
		},
		[boardData?.board.lists]
	);

	const onDragEnd: OnDragEndResponder = useCallback(
		(result) => {
			if (!id) return;

			const noteDragData = getNoteMovementDataFromDropResult(result);
			if (!noteDragData) throw new Error('Note drag data was null');
			const {
				sourceList,
				destinationList,
				sourceIndex,
				destinationIndex,
			} = noteDragData;

			if (sourceList._id === destinationList._id) {
				if (sourceIndex === destinationIndex) return;

				let newNotesOrder = [...(sourceList.notesOrder || [])];

				// Swap two array elements in place
				[newNotesOrder[sourceIndex], newNotesOrder[destinationIndex]] =
					[
						newNotesOrder[destinationIndex],
						newNotesOrder[sourceIndex],
					];

				updateList({
					boardId: id,
					listId: sourceList._id,
					newList: { notesOrder: newNotesOrder },
				});
			} else {
				moveNoteToList({
					boardId: id,
					listId: sourceList._id,
					otherListId: destinationList._id,
					noteId: sourceList.notes[sourceIndex]._id,
					otherListIndex: destinationIndex,
				});
			}
		},
		[id, updateList, getNoteMovementDataFromDropResult, moveNoteToList]
	);

	useEffect(() => {
		refetchBoard();

		return () => {
			queryClient.invalidateQueries(['getBoards']);
		};
	}, [id, refetchBoard, queryClient]);

	const namedErrors: NamedError[] = [
		['Board', boardError],
		['Update', updateListError],
		['Move Note to List', moveNoteToListError],
	];
	const error = formatErrors(namedErrors);

	return (
		<div className="board">
			<DragDropContext onDragEnd={onDragEnd}>
				{structuredClone(boardData?.board.lists || [])
					.sort(
						(a, b) =>
							listsOrder.indexOf(a._id) -
							listsOrder.indexOf(b._id)
					)
					.map((l) => {
						return <NotesList key={l._id} list={l} />;
					})}
				<WarningFab
					displayOnMessage
					message={!error ? undefined : error}
				/>
			</DragDropContext>
		</div>
	);
};

export default Board;
