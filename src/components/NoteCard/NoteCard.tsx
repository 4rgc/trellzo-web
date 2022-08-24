import Card from '../Card';
import PartialNote from '../../types/PartialNote';
import './NoteCard.scss';

type NoteCardProps = {
	note: PartialNote;
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => (
	<Card
		title={note.name}
		content={note.description}
		isImageDisabled
		size={'sm'}
		className="note"
	/>
);

export default NoteCard;
