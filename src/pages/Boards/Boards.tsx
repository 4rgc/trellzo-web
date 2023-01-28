import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import EditableCard from '../../components/EditableCard';
import GhostCard from '../../components/GhostCard';
import WarningFab from '../../components/WarningFab';
import APIRequestParams from '../../util/APIParams';
import './Boards.scss';
import useBoardsModel from './useBoardsModel';
import formatErrors, { NamedError } from '../../util/formatErrors';

const getBoardParams = new APIRequestParams('get');
getBoardParams.setRoute('/board');

const Boards = () => {
	const { boardsData, boardsQuery, createBoardMutation } = useBoardsModel();

	const { mutate: createBoard } = createBoardMutation;
	const [isBoardBeingAdded, setIsBoardBeingAdded] = useState<boolean>(false);
	const [newBoardName, setNewBoardName] = useState<string>('');
	const navigate = useNavigate();

	const onBoardCreationCancel = () => {
		setIsBoardBeingAdded(false);
		setNewBoardName('');
	};

	const onBoardCreate = () => {
		createBoard({ name: newBoardName });
		setIsBoardBeingAdded(false);
		setNewBoardName('');
	};

	const namedErrors: NamedError[] = [
		['Boards', boardsQuery.error],
		['Create board', createBoardMutation.error],
	];
	const error = formatErrors(namedErrors);

	return (
		<div className="boards">
			<div className="boards-container">
				{boardsData?.boards.map((b) => (
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

			<WarningFab displayOnMessage message={!error ? undefined : error} />
		</div>
	);
};

export default Boards;
