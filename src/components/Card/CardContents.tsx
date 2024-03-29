export interface ICardContentsProps {
	content?: string | React.ReactNode;
	title?: string;
	children?: React.ReactNode;
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
				<h3 className="card-title">{title}</h3>
				{typeof content === 'string' ? (
					<div className={'card-content-text'}>{content}</div>
				) : (
					content
				)}
			</>
		)}
	</div>
);

export default CardContents;
