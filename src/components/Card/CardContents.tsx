export interface ICardContentsProps {
	content?: string | React.ReactElement | React.ReactElement[];
	title?: string;
	children?: React.ReactChild | React.ReactChild[];
}

const CardContents: React.FC<ICardContentsProps> = ({
	content,
	title,
	children,
}) => (
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
						typeof content === 'string' ? 'card-content-text' : ''
					}
				>
					{content}
				</div>
			</>
		)}
	</div>
);

export default CardContents;
