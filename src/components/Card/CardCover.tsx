import { ReactComponent as Placeholder } from '../../assets/placeholder.svg';

export interface ICardCoverProps {
	src?: string;
}

const CardCover: React.FC<ICardCoverProps> = ({ src }) =>
	src ? (
		<img className="card-cover" src={src} alt="card img" />
	) : (
		<Placeholder
			fill="black"
			stroke="black"
			className="card-cover"
			preserveAspectRatio="xMinYMin slice"
		/>
	);

export default CardCover;
