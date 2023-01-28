import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getBoard from '../../api/getBoard';
import updateList from '../../api/updateList';
import Board from '../../types/Board';
import moveNoteToList from '../../api/moveNoteToList';

const findList = (listId: string, board: Board) => {
	const list = board.lists.find((l) => l._id === listId);
	return list;
};

const useBoardModel = (boardId: string) => {
	const queryClient = useQueryClient();

	const boardQuery = useQuery({
		queryKey: ['getBoard'],
		queryFn: getBoard,
		meta: { boardId },
		refetchOnWindowFocus(query) {
			return !query.state.error;
		},
	});

	const { data: boardData } = boardQuery;

	const listMutation = useMutation({
		mutationFn: updateList,
		onMutate: async ({ listId, newList }) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ['getBoard'] });

			// Snapshot the previous value
			const previousBoard = queryClient.getQueryData(['getBoard']);

			// Optimistically update to the new value
			queryClient.setQueryData(['getBoard'], (oldBoard) => {
				const prevList = findList(
					listId,
					(oldBoard as { board: Board }).board
				);
				const optimisticList = structuredClone(prevList);
				if (optimisticList)
					optimisticList.notesOrder = newList.notesOrder || [];

				return {
					board: {
						...boardData?.board,
						lists: [
							...(boardData?.board.lists.filter(
								(l) => l._id !== listId
							) || []),
							optimisticList,
						],
					},
				};
			});

			// Return a context object with the snapshotted value
			return { previousBoard };
		},
		onError: ({ context }) => {
			queryClient.setQueryData(['getBoard'], context.previousBoard);
		},
		onSettled: (data, context) => {
			queryClient.invalidateQueries({ queryKey: ['getBoard'] });
		},
	});

	const moveNoteToListMutation = useMutation({
		mutationFn: moveNoteToList,
		onMutate: ({ listId, otherListId, noteId, otherListIndex }) => {
			// Assume sourceList and destinationList cannot be null
			// because drag & drop happened between 2 specific lists
			// Also assume boardData.board exists because drag & drop happened
			const board = boardData?.board!;
			const sourceList = findList(listId, board)!;
			const destinationList = findList(otherListId, board)!;

			let newSourceListNotes = [...(sourceList.notes || [])];
			let newSourceListNotesOrder = [...(sourceList.notesOrder || [])];

			let newDestinationListNotes = [...(destinationList.notes || [])];
			let newDestinationListNotesOrder = [
				...(destinationList.notesOrder || []),
			];

			// Assume note exists because drag & drop happened on some note
			const note = sourceList.notes.find((n) => n._id === noteId)!;

			newSourceListNotes = newSourceListNotes.filter(
				(n) => n._id !== note._id
			);
			newDestinationListNotes.splice(otherListIndex, 0, note);

			newSourceListNotesOrder = newSourceListNotesOrder.filter(
				(id) => id !== note._id
			);

			newDestinationListNotesOrder.splice(otherListIndex, 0, note._id);

			const optimisticSourceList = structuredClone(sourceList);

			const optimisticDestinationList = structuredClone(destinationList);

			optimisticSourceList.notes = newSourceListNotes;
			optimisticSourceList.notesOrder = newSourceListNotesOrder;

			optimisticDestinationList.notes = newDestinationListNotes;
			optimisticDestinationList.notesOrder = newDestinationListNotesOrder;

			queryClient.setQueryData(['getBoard'], (oldBoard) => {
				const { board } = oldBoard as { board: Board };
				return {
					board: {
						...board,
						lists: [
							...(board.lists.filter(
								(l) => l._id !== listId && l._id !== otherListId
							) || []),
							optimisticSourceList,
							optimisticDestinationList,
						],
					},
				};
			});

			return {
				sourceList: optimisticSourceList,
				destinationList: optimisticDestinationList,
			};
		},
		onSettled: () => {
			queryClient.invalidateQueries(['getBoard']);
		},
	});

	return {
		boardData,
		boardQuery,
		listMutation,
		moveNoteToListMutation,
	};
};

export default useBoardModel;
