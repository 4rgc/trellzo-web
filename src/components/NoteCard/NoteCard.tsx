import Card from '../Card';
import PartialNote from '../../types/PartialNote';

type NoteCardProps = {
	note: PartialNote;
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => (
	<Card
		title={note.name}
		content={note.description}
		isImageDisabled
		size={'sm'}
	/>
);

export default NoteCard;
