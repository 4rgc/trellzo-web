import { FC } from 'react';

import './LoadingBar.scss';

export interface LoadingBarProps extends React.ComponentPropsWithoutRef<'div'> {
	state?: number;
	size?: 'small' | 'large';
	color?: string;
}

const LoadingBar: FC<LoadingBarProps> = ({
	state = 0,
	size = 'small',
	color = 'green',
	className,
}) => {
	return (
		<div className={`loadbar-container loadbar-${size} ${className}`}>
			<div
				className={`loadbar-inner`}
				style={{ width: `${state}%`, backgroundColor: `${color}` }}
			/>
		</div>
	);
};

export default LoadingBar;
