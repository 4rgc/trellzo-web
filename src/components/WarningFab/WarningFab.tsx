import { useState } from 'react';
import WarningIcon from '../../assets/warning.svg';
import './WarningFab.scss';

export interface IWarningFabProps {
	displayOnMessage?: boolean;
	message?: string;
	display?: boolean;
	onClick?: () => void;
}

const WarningFab: React.FC<IWarningFabProps> = ({
	displayOnMessage = false,
	message,
	display,
	onClick,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const displayFab =
		(display === undefined && displayOnMessage && message) || display;

	return (
		<div
			className="warningFab"
			style={{
				display: displayFab ? 'block' : 'none',
			}}
		>
			{isOpen && (
				<div className="message-container">
					<div className="message">{message}</div>
				</div>
			)}
			<img
				className="icon"
				src={WarningIcon}
				alt="warning icon"
				onClick={onClick || (() => setIsOpen((v) => !v))}
			/>
		</div>
	);
};

export default WarningFab;
