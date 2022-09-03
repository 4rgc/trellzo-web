import { FC, Reducer, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import WarningFab from '../../components/WarningFab';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import ListType from '../../types/List';
import APIRequestParams from '../../util/APIParams';
import './Board.scss';
import BoardType from '../../types/Board';
import diffObjectArrays from '../../util/diffObjectArrays';
import NotesList from '../../components/NotesList';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';

const initialLists: ListType[] = [];

enum ActionTypes {
	LIST_UPDATE,
	LIST_CREATE,
	LIST_DELETE,
}

type Action =
	| { type: ActionTypes.LIST_UPDATE; data: ListType[] }
	| { type: ActionTypes.LIST_CREATE; data: ListType[] }
	| { type: ActionTypes.LIST_DELETE; data: ListType[] };

const listsReducer: Reducer<ListType[], Action> = (
	state: ListType[],
	action
) => {
	switch (action.type) {
		case ActionTypes.LIST_UPDATE:
			return state.map((stateList) => {
				const updatedList = action.data.find(
					(b) => b._id === stateList._id
				);
				if (updatedList) return updatedList;
				else return stateList;
			});
		case ActionTypes.LIST_CREATE:
			return [...state, ...action.data];
		case ActionTypes.LIST_DELETE:
			return state.filter(
				(stateList) =>
					!action.data.find((list) => stateList._id === list._id)
			);
		default:
			throw new Error();
	}
};

const Board: FC = () => {
	const { id } = useParams();

	const [lists, dispatch] = useReducer(listsReducer, initialLists);
	const [boardData, boardError, reload, setParams] = useTrellzoAPI<{
		board: BoardType;
	}>(new APIRequestParams('get'));
	const [listsOrder, setListsOrder] = useState<BoardType['listsOrder']>([]);

	const onDragEnd: OnDragEndResponder = (result) => {
		const { source, destination } = result;

		//TODO: compare and change state
	};

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

		const { added, removed, changed } = diffObjectArrays(
			lists,
			boardData.board.lists
		);

		if (added.length > 0)
			dispatch({
				type: ActionTypes.LIST_CREATE,
				data: added,
			});
		if (removed.length > 0)
			dispatch({
				type: ActionTypes.LIST_DELETE,
				data: removed,
			});
		if (changed.length > 0) {
			dispatch({ type: ActionTypes.LIST_UPDATE, data: changed });
		}
	}, [boardData?.board.lists, lists]);

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
				<WarningFab displayOnMessage message={boardError?.message} />
			</DragDropContext>
		</div>
	);
};

export default Board;
