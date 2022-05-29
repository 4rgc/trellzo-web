import './Card.scss';
import { ReactComponent as Placeholder } from '../../assets/placeholder.svg';

interface ICardProps extends React.ComponentPropsWithoutRef<'div'> {
	onClick?: () => void;
	children?: React.ReactChild | React.ReactChild[];
	isDisabled?: boolean;
	imageUrl?: string;
	title?: string;
	content?: string | React.ReactElement | React.ReactElement[];
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

	return (
		<div className={`card-${size}`} onClick={onClick} {...otherProps}>
			{imageUrl ? (
				<img className="card-cover" src={imageUrl} alt="card img" />
			) : (
				<Placeholder
					fill="black"
					stroke="black"
					className="card-cover"
					preserveAspectRatio="xMinYMin slice"
				/>
			)}
			<div className="card-divider"></div>
			<div
				className={`card-container${
					typeof content !== 'string' ? '-no-text' : ''
				}`}
			>
				{children ?? (
					<>
						<h3>{title}</h3>
						<div
							className={
								typeof content === 'string'
									? 'card-content-text'
									: ''
							}
						>
							{content}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Card;
