import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import EditableCard from '../../components/EditableCard';
import GhostCard from '../../components/GhostCard';
import WarningFab from '../../components/WarningFab';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import PartialBoard from '../../types/PartialBoard';
import APIRequestParams from '../../util/APIParams';
import './Boards.scss';

const getBoardParams = new APIRequestParams('get');
getBoardParams.setRoute('/board');

const Boards = () => {
	const [response, error, reload] =
		useTrellzoAPI<{ boards: PartialBoard[] | undefined }>(getBoardParams);
	const [boards, setBoards] = useState<PartialBoard[]>([]);
	const [isBoardBeingAdded, setIsBoardBeingAdded] = useState<boolean>(false);
	const [newBoardName, setNewBoardName] = useState<string>('');
	const [, createError, createBoard, changeCreateParams] = useTrellzoAPI<{
		boards: PartialBoard | undefined;
	}>(new APIRequestParams('post'));
	const navigate = useNavigate();

	useEffect(() => {
		reload();
	}, [reload]);

	useEffect(() => {
		setBoards((response && response.boards) || []);
	}, [response]);

	const onBoardCreationCancel = () => {
		setIsBoardBeingAdded(false);
		setNewBoardName('');
	};

	const onBoardCreate = () => {
		const params = new APIRequestParams('post');
		params.setRoute('/board');
		params.setBodyParam('name', newBoardName);

		changeCreateParams(params);
		createBoard().then(() => {
			setIsBoardBeingAdded(false);
			setNewBoardName('');
			reload();
		});
	};

	return (
		<div className="boards">
			<div className="boards-container">
				{boards.map((b) => (
					<Card
						key={b._id}
						title={b.name}
						content={b.description}
						style={{ margin: '5px' }}
						onClick={() => navigate(`/b/${b._id}`)}
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

			<WarningFab displayOnMessage message={error?.message} />
			<WarningFab displayOnMessage message={createError?.message} />
		</div>
	);
};

export default Boards;
