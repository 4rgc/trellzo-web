import Card from '../Card';
import TextInput from '../TextInput';
import './EditableCard.scss';

interface IEditableCardProps {
	bodyPlaceholder?: string;
	bodyValue?: string;
	onTitleChange?: (text: string) => void;
	onBodyChange?: (text: string) => void;
}

type EditableCardPropsWithoutTitle = IEditableCardProps & {
	hasTitleField?: false;
};
type EditableCardPropsWithTitle = IEditableCardProps & {
	hasTitleField?: true;
	titlePlaceholder?: string;
	titleValue?: string;
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
		onTitleChange,
		onBodyChange,
		...otherProps
	} = props;

	return (
		<Card
			{...otherProps}
			isImageDisabled={true}
			isDisabled={false}
			className="editable-card"
		>
			{props.hasTitleField && (
				<TextInput
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
				rows={14}
			/>
		</Card>
	);
};

export default EditableCard;
