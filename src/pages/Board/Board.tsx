import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WarningFab from '../../components/WarningFab';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import APIRequestParams from '../../util/APIParams';

const Board: FC = () => {
	const { id } = useParams();

	const [boardData, boardError, reload, setParams] = useTrellzoAPI(
		new APIRequestParams('get')
	);

	//FIXME: Infinitely loops with 401
	useEffect(() => {
		const apiParams = new APIRequestParams('get');
		apiParams.setRoute(`/board/${id}`);

		setParams(apiParams);
		reload();
	}, [id, setParams, reload]);

	return (
		<div className="board">
			<code>{JSON.stringify(boardData && boardData.board, null, 2)}</code>
			<WarningFab displayOnMessage message={boardError?.message} />
		</div>
	);
};

export default Board;
