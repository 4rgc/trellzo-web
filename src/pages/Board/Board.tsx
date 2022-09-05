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
	const [, updateError, updateList, setListUpdateParams] = useTrellzoAPI<{
		list: ListType;
	}>(new APIRequestParams('get'));
	const [listsOrder, setListsOrder] = useState<BoardType['listsOrder']>([]);

	const onDragEnd: OnDragEndResponder = useCallback(
		(result) => {
			const { source, destination } = result;

			if (!destination) return;

			const { droppableId: sourceListId, index: sourceIndex } = source;
			const { droppableId: destinationListId, index: destinationIndex } =
				destination;

			if (sourceListId === destinationListId) {
				if (sourceIndex === destinationIndex) return;

				const params = new APIRequestParams('post');
				params.setRoute(`/list/${id}/${sourceListId}`);
				let newNotesOrder = [
					...(lists.find((l) => l._id === sourceListId)?.notesOrder ||
						[]),
				];

				// Swap two array elements in place
				[newNotesOrder[sourceIndex], newNotesOrder[destinationIndex]] =
					[
						newNotesOrder[destinationIndex],
						newNotesOrder[sourceIndex],
					];

				params.setBodyParam('notesOrder', newNotesOrder);

				setListUpdateParams(params);
				updateList();
				reload();
			} else {
				//TODO: Implement note movement between the lists after API is updated
			}
		},
		[id, lists, setListUpdateParams, updateList, reload]
	);

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
