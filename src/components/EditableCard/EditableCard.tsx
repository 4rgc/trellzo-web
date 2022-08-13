import Card from '../Card';
import TextInput from '../TextInput';
import './EditableCard.scss';

interface IEditableCardProps {
	bodyPlaceholder?: string;
	bodyValue?: string;
	onBodyChange?: (text: string) => void;
}

type EditableCardPropsWithoutTitle = {
	hasTitleField?: false;
	titlePlaceholder?: never;
	titleValue?: never;
	onTitleChange?: never;
};
type EditableCardPropsWithTitle = {
	hasTitleField: true;
	titlePlaceholder?: string;
	titleValue?: string;
	onTitleChange?: (text: string) => void;
};

type EditableCardPropsWithButtons = {
	hasButtons: true;
	children?: React.ReactNode;
};

type EditableCardPropsWithoutButtons = {
	hasButtons?: false;
	children?: never;
};

export type EditableCardProps = Omit<
	React.ComponentProps<typeof Card>,
	| 'isImageDisabled'
	| 'imageUrl'
	| 'content'
	| 'title'
	| 'onClick'
	| 'isDisabled'
	| 'children'
> &
	IEditableCardProps &
	(EditableCardPropsWithTitle | EditableCardPropsWithoutTitle) &
	(EditableCardPropsWithButtons | EditableCardPropsWithoutButtons);

const EditableCard: React.FC<EditableCardProps> = (props) => {
	const {
		bodyPlaceholder,
		bodyValue,
		onBodyChange,
		hasTitleField = false,
		hasButtons,
		titlePlaceholder,
		titleValue,
		onTitleChange,
		size = 'md',
		children,
		...otherProps
	} = props;

	let bodyRows = 14;
	/*istanbul ignore else */
	if (size === 'sm') {
		bodyRows = 3;
		if (hasButtons) bodyRows -= 2;
	} else if (size === 'md') {
		bodyRows = 14;
		if (hasTitleField) bodyRows -= 2;
		if (hasButtons) bodyRows -= 2;
	} else if (size === 'lg') {
		bodyRows = 26;
		if (hasTitleField) bodyRows -= 2;
		if (hasButtons) bodyRows -= 2;
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
			{hasButtons && <div className="btn-container">{children}</div>}
		</Card>
	);
};

export default EditableCard;
