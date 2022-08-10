import './Card.scss';
import CardContents, { ICardContentsProps } from './CardContents';
import CardCover, { ICardCoverProps } from './CardCover';
import CardDivider from './CardDivider';

export interface ICardProps extends React.ComponentPropsWithoutRef<'div'> {
	onClick?: () => void;
	children?: ICardContentsProps['children'];
	isDisabled?: boolean;
	imageUrl?: ICardCoverProps['src'];
	isImageDisabled?: boolean;
	title?: ICardContentsProps['title'];
	content?: ICardContentsProps['content'];
	//FIXME: make size names in component props consistent
	// Button: small, medium, large
	// Card: sm, md, lg
	// Make sure to fix that in other Card types
	size?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<ICardProps> = (props) => {
	const {
		onClick,
		children,
		isDisabled = false,
		isImageDisabled = false,
		imageUrl,
		title,
		content,
		size = 'md',
		className,
		...otherProps
	} = props;

	const isActive = onClick && !isDisabled;

	return (
		<div
			className={`card card-${size}${isActive ? ' card-clickable' : ''}${
				isImageDisabled || size === 'sm' ? ' card-noimage' : ''
			}${className ? ` ${className}` : ''}`}
			onClick={isActive ? onClick : undefined}
			{...otherProps}
		>
			{!isImageDisabled && (
				<>
					<CardCover src={imageUrl} />
					<CardDivider />
				</>
			)}
			<CardContents content={content} title={title}>
				{children}
			</CardContents>
		</div>
	);
};

export default Card;
