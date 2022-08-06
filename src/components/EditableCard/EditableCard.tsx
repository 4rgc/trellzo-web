import Card from '../Card';
import TextInput from '../TextInput';
import './EditableCard.scss';

interface IEditableCardProps {
	bodyPlaceholder?: string;
	bodyValue?: string;
	onBodyChange?: (text: string) => void;
}

type EditableCardPropsWithoutTitle = IEditableCardProps & {
	hasTitleField?: false;
};
type EditableCardPropsWithTitle = IEditableCardProps & {
	hasTitleField: true;
	titlePlaceholder?: string;
	titleValue?: string;
	onTitleChange?: (text: string) => void;
};

export type EditableCardProps = Omit<
	React.ComponentProps<typeof Card>,
	| 'isImageDisabled'
	| 'imageUrl'
	| 'content'
	| 'title'
	| 'onClick'
	| 'isDisabled'
> &
	(EditableCardPropsWithTitle | EditableCardPropsWithoutTitle);

const EditableCard: React.FC<EditableCardProps> = (props) => {
	const { bodyPlaceholder, bodyValue, onBodyChange, ...otherProps } = props;

	let bodyRows = 14;
	if (props.size === 'sm') {
		bodyRows = 3;
	} else if (props.size === 'md') {
		if (props.hasTitleField) bodyRows = 12;
		else bodyRows = 14;
	} else if (props.size === 'lg') {
		if (props.hasTitleField) bodyRows = 24;
		else bodyRows = 26;
	}

	return (
		<Card
			{...otherProps}
			isImageDisabled={true}
			isDisabled={false}
			className="editable-card"
		>
			{props.hasTitleField && props.size !== 'sm' && (
				<TextInput
					className="title"
					variant="single"
					value={props.titleValue}
					placeholder={props.titlePlaceholder}
					onChange={props.onTitleChange}
				/>
			)}
			<TextInput
				variant="multi"
				value={bodyValue}
				placeholder={bodyPlaceholder}
				onChange={onBodyChange}
				rows={bodyRows}
			/>
		</Card>
	);
};

export default EditableCard;
