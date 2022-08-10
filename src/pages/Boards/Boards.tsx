import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import EditableCard from '../../components/EditableCard';
import GhostCard from '../../components/GhostCard';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import PartialBoard from '../../types/PartialBoard';
import APIRequestParams from '../../util/APIParams';
import './Boards.scss';

const getBoardParams = new APIRequestParams('get');
getBoardParams.setRoute('/board');

const Boards = () => {
	const [response, error, reload] =
		useTrellzoAPI<{ boards: PartialBoard[] | undefined }>(getBoardParams);
	const [boards_, setBoards_] = useState<PartialBoard[]>([]);
	const [isBoardBeingAdded, setIsBoardBeingAdded] = useState<boolean>(false);
	const [newBoardName, setNewBoardName] = useState<string>('');
	const [, , reloadCreate, changeCreateParams] = useTrellzoAPI<{
		boards: PartialBoard | undefined;
	}>(new APIRequestParams('get'));

	useEffect(() => {
		reload();
	}, [reload]);

	useEffect(() => {
		setBoards_((response && response.boards) || []);
	}, [response]);

	const boards = response && response.boards;
	const onBoardCreationCancel = () => {
		setIsBoardBeingAdded(false);
		setNewBoardName('');
	};

	const onBoardCreate = () => {
		const params = new APIRequestParams('post');
		params.setRoute('/board');
		params.setBodyParam('name', newBoardName);

		changeCreateParams(params);
		reloadCreate().then(() => reload());
	};

	return (
		<div className="boards">
			{boards && (
				<div className="boards-container">
					{boards.map((b) => (
						<Card
							key={b._id}
							title={b.name}
							content={b.description}
							style={{ margin: '5px' }}
						/>
					))}
					{isBoardBeingAdded ? (
						<EditableCard
							size="md"
							bodyValue={newBoardName}
							bodyPlaceholder="Name"
							onBodyChange={setNewBoardName}
							hasButtons
						>
							<Button
								height="thin"
								size="small"
								kind="secondary"
								onClick={onBoardCreationCancel}
							>
								cancel
							</Button>
							<Button
								height="thin"
								size="small"
								onClick={onBoardCreate}
							>
								create
							</Button>
						</EditableCard>
					) : (
						<GhostCard
							size="md"
							isImageDisabled
							innerText="Add a new board..."
							onClick={() => setIsBoardBeingAdded(true)}
						/>
					)}
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
