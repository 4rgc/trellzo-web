import { useEffect } from 'react';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import PartialBoard from '../../types/PartialBoard';
import APIRequestParams from '../../util/APIParams';

const requestParams = new APIRequestParams('get');
requestParams.setRoute('/board');

const Boards = () => {
	const [response, error, reload] =
		useTrellzoAPI<{ boards: PartialBoard[] | undefined }>(requestParams);

	useEffect(() => {
		reload();
	}, [reload]);

	const boards = response && response.boards;

	return (
		<div>
			{boards && (
				<ul>
					{boards.map((b) => (
						<li key={b._id}>{b.name}</li>
					))}
				</ul>
			)}

			{error && (
				<div style={{ color: 'red', fontStyle: 'bold' }}>
					{error.message}
				</div>
			)}
		</div>
	);
};

export default Boards;
