import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import EditableCard from '../../components/EditableCard';
import GhostCard from '../../components/GhostCard';
import useTrellzoAPI from '../../hooks/useTrellzoAPI';
import PartialBoard from '../../types/PartialBoard';
import APIRequestParams from '../../util/APIParams';
import './Boards.scss';

const requestParams = new APIRequestParams('get');
requestParams.setRoute('/board');

const Boards = () => {
	const [response, error, reload] =
		useTrellzoAPI<{ boards: PartialBoard[] | undefined }>(requestParams);
	const [isBoardBeingAdded, setIsBoardBeingAdded] = useState(false);
	const [newBoardName, setNewBoardName] = useState('');
	const [newBoardDescription, setNewBoardDescription] = useState('');

	useEffect(() => {
		reload();
	}, [reload]);

	const boards = response && response.boards;
	const onBoardCreationCancel = () => {
		setIsBoardBeingAdded(false);
		setNewBoardName('');
		setNewBoardDescription('');
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
							hasTitleField
							titleValue={newBoardName}
							onTitleChange={setNewBoardName}
							titlePlaceholder="Name"
							bodyValue={newBoardDescription}
							bodyPlaceholder="Description"
							onBodyChange={setNewBoardDescription}
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
							<Button height="thin" size="small">
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
