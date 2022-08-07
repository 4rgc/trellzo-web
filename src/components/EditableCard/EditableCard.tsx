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
	titlePlaceholder?: never;
	titleValue?: never;
	onTitleChange?: never;
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
	const {
		bodyPlaceholder,
		bodyValue,
		onBodyChange,
		hasTitleField = false,
		titlePlaceholder,
		titleValue,
		onTitleChange,
		size = 'md',
		...otherProps
	} = props;

	let bodyRows = 14;
	/*istanbul ignore else */
	if (size === 'sm') {
		bodyRows = 3;
	} else if (size === 'md') {
		if (hasTitleField) bodyRows = 12;
		else bodyRows = 14;
	} else if (size === 'lg') {
		if (hasTitleField) bodyRows = 24;
		else bodyRows = 26;
	}

	return (
		<Card
			{...otherProps}
			size={size}
			isImageDisabled={true}
			isDisabled={false}
			className="editable-card"
		>
			{hasTitleField && size !== 'sm' && (
				<TextInput
					className="title"
					variant="single"
					value={titleValue}
					placeholder={titlePlaceholder}
					onChange={onTitleChange}
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
