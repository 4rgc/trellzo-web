import {
	FC,
	Reducer,
	useEffect,
	useReducer,
	useState,
	useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import WarningFab from '../../components/WarningFab';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import ListType from '../../types/List';
import APIRequestParams from '../../util/APIParams';
import './Board.scss';
import BoardType from '../../types/Board';
import diffObjectArrays from '../../util/diffObjectArrays';
import NotesList from '../../components/NotesList';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';

const initialLists: ListType[] = [];

enum ActionType {
	LIST_UPDATE,
	LIST_CREATE,
	LIST_DELETE,
	REMOTE_UPDATE,
}

type Action = { type: ActionType; data: ListType[] };

const listsUpdateHandler = (state: ListType[], data: ListType[]) =>
	state.map((stateList) => {
		const updatedList = data.find((b) => b._id === stateList._id);
		if (updatedList) return updatedList;
		else return stateList;
	});

const listsCreateHandler = (state: ListType[], data: ListType[]) => [
	...state,
	...data,
];

const listsDeleteHandler = (state: ListType[], data: ListType[]) =>
	state.filter(
		(stateList) => !data.find((list) => stateList._id === list._id)
	);

const listsAutoHandler = (state: ListType[], data: ListType[]) => {
	const { added, removed, changed } = diffObjectArrays(state, data);

	let newLists = state;
	if (added.length > 0) newLists = listsCreateHandler(newLists, added);
	if (removed.length > 0) newLists = listsDeleteHandler(newLists, removed);
	if (changed.length > 0) newLists = listsUpdateHandler(newLists, changed);

	// Bails out of reducer with current state
	// in case when remote data is same as state
	return newLists;
};

const listsReducer: Reducer<ListType[], Action> = (state, action) => {
	switch (action.type) {
		case ActionType.LIST_UPDATE:
			return listsUpdateHandler(state, action.data);
		case ActionType.LIST_CREATE:
			return listsCreateHandler(state, action.data);
		case ActionType.LIST_DELETE:
			return listsDeleteHandler(state, action.data);
		case ActionType.REMOTE_UPDATE:
			return listsAutoHandler(state, action.data);
		default:
			throw new Error();
	}
};

const Board: FC = () => {
	const { id } = useParams();

	const [lists, dispatch] = useReducer(listsReducer, initialLists);
	const [error, setError] = useState<string | undefined>('');
	const [boardData, boardError, reload, setParams] = useTrellzoAPI<{
		board: BoardType;
	}>(new APIRequestParams('get'));
	const [listResults, updateError, updateList, setListUpdateParams] =
		useTrellzoAPI<
			| {
					list: ListType;
			  }
			| {
					sourceList: ListType;
					destinationList: ListType;
			  }
		>(new APIRequestParams('get'));
	const [listsOrder, setListsOrder] = useState<BoardType['listsOrder']>([]);

	const onDragEnd: OnDragEndResponder = useCallback(
		async (result) => {
			const { source, destination } = result;

			if (!destination) return;

			const { droppableId: sourceListId, index: sourceIndex } = source;
			const { droppableId: destinationListId, index: destinationIndex } =
				destination;

			const sourceList = lists.find((l) => l._id === sourceListId);
			if (!sourceList)
				throw new Error(`list with id ${sourceListId} not found`);
			const destinationList = lists.find(
				(l) => l._id === destinationListId
			);
			if (!destinationList)
				throw new Error(`list with id ${destinationListId} not found`);

			const noteId = sourceList?.notesOrder[sourceIndex];
			if (!noteId) throw new Error(`noteId was not found in notesOrder`);

			if (sourceListId === destinationListId) {
				if (sourceIndex === destinationIndex) return;

				const params = new APIRequestParams('post');
				params.setRoute(`/list/${id}/${sourceListId}`);
				let newNotesOrder = [...(sourceList.notesOrder || [])];

				// Swap two array elements in place
				[newNotesOrder[sourceIndex], newNotesOrder[destinationIndex]] =
					[
						newNotesOrder[destinationIndex],
						newNotesOrder[sourceIndex],
					];

				params.setBodyParam('notesOrder', newNotesOrder);

				setListUpdateParams(params);

				const predictedUpdatedList = structuredClone(sourceList);
				if (predictedUpdatedList)
					predictedUpdatedList.notesOrder = newNotesOrder;

				predictedUpdatedList &&
					dispatch({
						type: ActionType.LIST_UPDATE,
						data: [predictedUpdatedList],
					});

				await updateList();
			} else {
				const params = new APIRequestParams('post');
				params.setRoute(
					`/list/${id}/${sourceListId}/moveNoteTo/${destinationListId}`
				);

				params.setBodyParams([
					['noteId', sourceList.notesOrder[sourceIndex]],
					['otherListIndex', destinationIndex],
				]);

				setListUpdateParams(params);

				let newSourceListNotes = [...sourceList.notes];
				let newSourceListNotesOrder = [...sourceList.notesOrder];

				let newDestinationListNotes = [...destinationList.notes];
				let newDestinationListNotesOrder = [
					...destinationList.notesOrder,
				];

				const note = sourceList.notes[sourceIndex];

				newSourceListNotes = newSourceListNotes.filter(
					(n) => n._id !== noteId
				);
				note &&
					newDestinationListNotes?.splice(destinationIndex, 0, note);

				newSourceListNotesOrder = newSourceListNotesOrder?.filter(
					(id) => id !== noteId
				);

				newDestinationListNotesOrder?.splice(
					destinationIndex,
					0,
					noteId
				);

				const predictedUpdatedSourceList = structuredClone(sourceList);

				const predictedUpdatedDestinationList =
					structuredClone(destinationList);

				predictedUpdatedSourceList.notes = newSourceListNotes;
				predictedUpdatedSourceList.notesOrder = newSourceListNotesOrder;

				predictedUpdatedDestinationList.notes = newDestinationListNotes;
				predictedUpdatedDestinationList.notesOrder =
					newDestinationListNotesOrder;

				predictedUpdatedSourceList &&
					predictedUpdatedDestinationList &&
					dispatch({
						type: ActionType.LIST_UPDATE,
						data: [
							predictedUpdatedSourceList,
							predictedUpdatedDestinationList,
						],
					});

				await updateList();
			}
		},
		[id, lists, setListUpdateParams, updateList]
	);

	useEffect(() => {
		if (!listResults) return;
		reload();
	}, [reload, listResults]);

	useEffect(() => {
		const apiParams = new APIRequestParams('get');
		apiParams.setRoute(`/board/${id}`);

		setParams(apiParams);
		reload();
	}, [id, setParams, reload]);

	useEffect(() => {
		if (boardData?.board.listsOrder) {
			setListsOrder(boardData.board.listsOrder);
		}
	}, [boardData]);

	useEffect(() => {
		if (!boardData?.board.lists) {
			return;
		}

		dispatch({
			type: ActionType.REMOTE_UPDATE,
			data: boardData.board.lists,
		});
	}, [boardData?.board.lists]);

	useEffect(() => {
		if (!boardError && !updateError) {
			if (error) setError(undefined);
		}

		let newError = boardError ? `Board: ${boardError.message}` : '';
		newError = updateError
			? `${newError === '' ? newError + '\n' : newError}Update: ${
					updateError.message
			  }`
			: newError;

		setError(newError);
	}, [boardError, updateError, error]);

	return (
		<div className="board">
			<DragDropContext onDragEnd={onDragEnd}>
				{lists
					.sort(
						(a, b) =>
							listsOrder.indexOf(a._id) -
							listsOrder.indexOf(b._id)
					)
					.map((l) => {
						return <NotesList key={l._id} list={l} />;
					})}
				<WarningFab displayOnMessage message={error} />
			</DragDropContext>
		</div>
	);
};

export default Board;
