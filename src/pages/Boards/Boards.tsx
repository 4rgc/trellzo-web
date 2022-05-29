import { useEffect } from 'react';
import Card from '../../components/Card';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import PartialBoard from '../../types/PartialBoard';
import APIRequestParams from '../../util/APIParams';
import './Boards.scss';

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
		<div className="boards">
			{boards && (
				<div className="boards-container">
					{boards.map((b) => (
						<Card
							key={b._id}
							title={b.name}
							content={b.description}
						/>
					))}
				</div>
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
