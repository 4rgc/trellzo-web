import { FC, Reducer, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import WarningFab from '../../components/WarningFab';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import List from '../../types/List';
import APIRequestParams from '../../util/APIParams';
import './Board.scss';
import BoardType from '../../types/Board';
import Button from '../../components/Button';
import diffObjectArrays from '../../util/diffObjects';

const initialLists: List[] = [];

enum ActionTypes {
	LIST_UPDATE,
	LIST_CREATE,
	LIST_DELETE,
	ORDER_UPDATE,
}

type Action =
	| { type: ActionTypes.LIST_UPDATE; data: List[] }
	| { type: ActionTypes.LIST_CREATE; data: List[] }
	| { type: ActionTypes.LIST_DELETE; data: List[] }
	| { type: ActionTypes.ORDER_UPDATE; order: string[] };

const listsReducer: Reducer<List[], Action> = (state: List[], action) => {
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
		case ActionTypes.ORDER_UPDATE:
			return state.sort(
				(a, b) =>
					action.order.indexOf(a._id) - action.order.indexOf(b._id)
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

	useEffect(() => {
		const apiParams = new APIRequestParams('get');
		apiParams.setRoute(`/board/${id}`);

		setParams(apiParams);
		reload();
	}, [id, setParams, reload]);

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

		if (
			JSON.stringify(boardData.board.listsOrder) !==
			JSON.stringify(lists.map((l) => l._id))
		) {
			dispatch({
				type: ActionTypes.ORDER_UPDATE,
				order: boardData.board.listsOrder,
			});
		}
	}, [boardData?.board.lists, boardData?.board.listsOrder, lists]);

	return (
		<div className="board">
			<Button onClick={reload}>reload</Button>
			{lists.map((l) => (
				<div
					key={l._id}
					style={{ backgroundColor: 'grey', margin: '15px' }}
				>
					<code>{JSON.stringify(l, null, 2)}</code>
					<br />
				</div>
			))}
			<WarningFab displayOnMessage message={boardError?.message} />
		</div>
	);
};

export default Board;
