import Card from '../Card';
import PartialNote from '../../types/PartialNote';
import './NoteCard.scss';
import { DateTime, Duration } from 'luxon';
import humanizeDuration from 'humanize-duration';
import _ from 'lodash';

export type NoteCardProps = {
	note: PartialNote;
};

const stripTime = (d: DateTime) => {
	return Duration.fromDurationLike({
		year: d.year,
		month: d.month,
		day: d.day,
	});
};

const NoteCardContent: React.FC<{
	description: string;
	startDate?: string;
	dueDate?: string;
}> = ({ description, dueDate }) => {
	let dueComponent;

	if (dueDate) {
		const daysUntilDue =
			stripTime(DateTime.fromISO(dueDate)).days -
			stripTime(DateTime.now()).days;
		const msecUntilDue = Duration.fromDurationLike({
			days: daysUntilDue,
		}).toMillis();

		const humanizedDaysUntilDue = humanizeDuration(msecUntilDue, {
			units: ['d'],
			round: true,
		});

		if (daysUntilDue > 3) {
			dueComponent = (
				<div className="due due-text">
					due in{' '}
					<span className="due-far">{humanizedDaysUntilDue}</span>
				</div>
			);
		} else if (daysUntilDue > 1) {
			dueComponent = (
				<div className="due due-text">
					due in{' '}
					<span className="due-soon">{humanizedDaysUntilDue}</span>
				</div>
			);
		} else if (daysUntilDue === 1) {
			dueComponent = (
				<div className="due due-text">
					due <span className="due-very-soon">tomorrow</span>
				</div>
			);
		} else if (daysUntilDue === 0) {
			dueComponent = (
				<div className="due due-text">
					due <span className="due-very-soon">today</span>
				</div>
			);
		} else {
			dueComponent = (
				<div className="due due-past">
					{humanizedDaysUntilDue} past due
				</div>
			);
		}
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
			<div className="note-card-description card-content-text">
				{description}
			</div>
			{dueComponent}
		</div>
	);
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => (
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
	/>
);

export default NoteCard;
