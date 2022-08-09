import Card from '../Card';
import TextInput from '../TextInput';
import './EditableCard.scss';
import Button, { IButtonProps } from '../Button/Button';

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
	leftButtonProps?: IButtonProps;
	rightButtonProps?: IButtonProps;
};

type EditableCardPropsWithoutButtons = {
	hasButtons?: false;
	leftButtonProps?: never;
	rightButtonProps?: never;
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
		rightButtonProps,
		leftButtonProps,
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
			{hasButtons && (
				<div className="btn-container">
					{leftButtonProps && (
						<Button
							{...leftButtonProps}
							height="thin"
							size={rightButtonProps ? 'small' : 'medium'}
						/>
					)}
					{rightButtonProps && (
						<Button
							{...rightButtonProps}
							height="thin"
							size={leftButtonProps ? 'small' : 'medium'}
						/>
					)}
				</div>
			)}
		</Card>
	);
};

export default EditableCard;
