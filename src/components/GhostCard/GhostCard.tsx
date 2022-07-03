import Card from '../Card';
import { ICardProps } from '../Card/Card';
import './GhostCard.scss';

export interface IGhostCardProps extends ICardProps {
	innerText?: string;
}

const GhostCard: React.FC<IGhostCardProps> = (props) => {
	const { innerText, ...otherProps } = props;

	return (
		<Card {...otherProps} className="ghost-card">
			<div className="ghost-card-text-container">
				<b className="ghost-card-text">{innerText}</b>
			</div>
		</Card>
	);
};

export default GhostCard;
