import Card from '../Card';
import PartialNote from '../../types/PartialNote';
import './NoteCard.scss';
import { DateTime, Duration } from 'luxon';
import humanizeDuration from 'humanize-duration';
import { Draggable } from '@hello-pangea/dnd';

export type NoteCardProps = {
	note: PartialNote;
	index: number;
};

const NoteCardContent: React.FC<{
	description: string;
	startDate?: string;
	dueDate?: string;
}> = ({ description, dueDate }) => {
	let dueComponent;

	if (dueDate) {
		const daysUntilDue = DateTime.fromISO(dueDate)
			.startOf('day')
			.diff(DateTime.now().startOf('day'))
			.as('days');
		const msecUntilDue = Duration.fromDurationLike({
			days: daysUntilDue,
		}).toMillis();

		const humanizedDaysUntilDue = humanizeDuration(msecUntilDue, {
			units: ['d'],
			round: true,
		});

		if (daysUntilDue > 3) {
			dueComponent = (
				<>
					due in{' '}
					<span className="due-far">{humanizedDaysUntilDue}</span>
				</>
			);
		} else if (daysUntilDue > 1) {
			dueComponent = (
				<>
					due in{' '}
					<span className="due-soon">{humanizedDaysUntilDue}</span>
				</>
			);
		} else if (daysUntilDue >= 0) {
			dueComponent = (
				<>
					due{' '}
					<span className="due-very-soon">
						{daysUntilDue === 1 ? 'tomorrow' : 'today'}
					</span>
				</>
			);
		} else {
			dueComponent = (
				<span className="due-past">
					{humanizedDaysUntilDue} past due
				</span>
			);
		}
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
			<div className="note-card-description card-content-text">
				{description}
			</div>
			{dueComponent && <div className="due">{dueComponent}</div>}
		</div>
	);
};

const NoteCard: React.FC<NoteCardProps> = ({ note, index }) => (
	<Draggable draggableId={note._id} index={index}>
		{(provided) => {
			return (
				<Card
					title={note.name}
					content={
						<NoteCardContent
							description={note.description}
							startDate={note.startDate}
							dueDate={note.dueDate}
						/>
					}
					isImageDisabled
					size={'sm'}
					className="note"
					provided={provided}
					innerRef={provided.innerRef}
				/>
			);
		}}
	</Draggable>
);

export default NoteCard;
