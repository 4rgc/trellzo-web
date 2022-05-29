import './Card.scss';
import CardContents, { ICardContentsProps } from './CardContents';
import CardCover, { ICardCoverProps } from './CardCover';
import CardDivider from './CardDivider';

interface ICardProps extends React.ComponentPropsWithoutRef<'div'> {
	onClick?: () => void;
	children?: ICardContentsProps['children'];
	isDisabled?: boolean;
	imageUrl?: ICardCoverProps['src'];
	title?: ICardContentsProps['title'];
	content?: ICardContentsProps['content'];
	size?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<ICardProps> = (props) => {
	const {
		onClick,
		children,
		isDisabled = false,
		imageUrl,
		title,
		content,
		size = 'md',
		...otherProps
	} = props;

	const isActive = onClick && !isDisabled;

	return (
		<div
			className={`card-${size}${isActive ? '-clickable' : ''}`}
			onClick={onClick}
			{...otherProps}
		>
			<CardCover src={imageUrl} />
			<CardDivider />
			<CardContents content={content} title={title}>
				{children}
			</CardContents>
		</div>
	);
};

export default Card;
