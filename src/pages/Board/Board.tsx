import { FC, Reducer, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import WarningFab from '../../components/WarningFab';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import List from '../../types/List';
import APIRequestParams from '../../util/APIParams';
import './Board.scss';
import BoardType from '../../types/Board';

const initialLists: List[] = [];

enum ActionTypes {
	LIST_UPDATE,
	LIST_CREATE,
	LIST_DELETE,
}

type Action =
	| { type: ActionTypes.LIST_UPDATE; data: List[] }
	| { type: ActionTypes.LIST_CREATE; data: List }
	| { type: ActionTypes.LIST_DELETE; data: string };

const listsReducer: Reducer<List[], Action> = (state: List[], action) => {
	switch (action.type) {
		case ActionTypes.LIST_UPDATE:
			//FIXME: sort the lists according to the order from the server
			return [
				...state.filter(
					(stateBoard) =>
						!action.data.find(
							(updatedBoard) =>
								updatedBoard._id === stateBoard._id
						)
				),
				...action.data,
			];
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

	return (
		<div className="board">
			{lists && lists.map}
			<WarningFab displayOnMessage message={boardError?.message} />
		</div>
	);
};

export default Board;
